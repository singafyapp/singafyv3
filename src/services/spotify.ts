
import { toast } from "@/hooks/use-toast";

export interface SpotifyConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
}

class SpotifyService {
  private clientId: string;
  private clientSecret: string;
  private redirectUri: string;
  private accessToken: string | null = null;
  private refreshToken: string | null = null;
  private expiresAt: number = 0;

  constructor(config: SpotifyConfig) {
    this.clientId = config.clientId;
    this.clientSecret = config.clientSecret;
    this.redirectUri = config.redirectUri;

    // Try to load tokens from localStorage
    this.loadTokensFromStorage();
  }

  private loadTokensFromStorage() {
    try {
      const tokens = JSON.parse(localStorage.getItem('spotify_tokens') || '{}');
      this.accessToken = tokens.accessToken || null;
      this.refreshToken = tokens.refreshToken || null;
      this.expiresAt = tokens.expiresAt || 0;
    } catch (error) {
      console.error("Failed to load Spotify tokens from storage:", error);
    }
  }

  private saveTokensToStorage() {
    try {
      localStorage.setItem('spotify_tokens', JSON.stringify({
        accessToken: this.accessToken,
        refreshToken: this.refreshToken,
        expiresAt: this.expiresAt
      }));
    } catch (error) {
      console.error("Failed to save Spotify tokens to storage:", error);
    }
  }

  public getAuthUrl(): string {
    const scopes = [
      'user-read-private',
      'user-read-email',
      'user-read-playback-state',
      'user-modify-playback-state',
      'playlist-read-private',
      'user-library-read'
    ];

    const params = new URLSearchParams({
      client_id: this.clientId,
      response_type: 'code',
      redirect_uri: this.redirectUri,
      scope: scopes.join(' '),
    });

    return `https://accounts.spotify.com/authorize?${params.toString()}`;
  }

  public async handleAuthCallback(code: string): Promise<boolean> {
    try {
      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + btoa(`${this.clientId}:${this.clientSecret}`)
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          code,
          redirect_uri: this.redirectUri
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get access token');
      }

      const data = await response.json();
      this.accessToken = data.access_token;
      this.refreshToken = data.refresh_token;
      this.expiresAt = Date.now() + data.expires_in * 1000;
      
      this.saveTokensToStorage();
      return true;
    } catch (error) {
      console.error('Error during Spotify authentication:', error);
      toast({
        title: "Authentication Failed",
        description: "Could not connect to Spotify. Please try again.",
        variant: "destructive",
      });
      return false;
    }
  }

  private async refreshAccessToken(): Promise<boolean> {
    if (!this.refreshToken) {
      return false;
    }

    try {
      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + btoa(`${this.clientId}:${this.clientSecret}`)
        },
        body: new URLSearchParams({
          grant_type: 'refresh_token',
          refresh_token: this.refreshToken
        })
      });

      if (!response.ok) {
        throw new Error('Failed to refresh token');
      }

      const data = await response.json();
      this.accessToken = data.access_token;
      if (data.refresh_token) {
        this.refreshToken = data.refresh_token;
      }
      this.expiresAt = Date.now() + data.expires_in * 1000;
      this.saveTokensToStorage();
      return true;
    } catch (error) {
      console.error('Error refreshing token:', error);
      return false;
    }
  }

  public isAuthenticated(): boolean {
    return Boolean(this.accessToken && this.expiresAt > Date.now());
  }

  public async getValidToken(): Promise<string | null> {
    if (!this.accessToken) {
      return null;
    }

    if (Date.now() >= this.expiresAt) {
      const success = await this.refreshAccessToken();
      if (!success) {
        return null;
      }
    }

    return this.accessToken;
  }

  public async fetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const token = await this.getValidToken();
    
    if (!token) {
      throw new Error('Not authenticated with Spotify');
    }

    const response = await fetch(`https://api.spotify.com/v1${endpoint}`, {
      ...options,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        ...options.headers
      }
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(`Spotify API Error: ${response.status} ${error.error?.message || response.statusText}`);
    }

    return response.json();
  }

  public async getUserProfile() {
    return this.fetch('/me');
  }

  public async searchTracks(query: string, limit = 10) {
    return this.fetch(`/search?q=${encodeURIComponent(query)}&type=track&limit=${limit}`);
  }

  public async getTrack(trackId: string) {
    return this.fetch(`/tracks/${trackId}`);
  }

  public logout() {
    this.accessToken = null;
    this.refreshToken = null;
    this.expiresAt = 0;
    localStorage.removeItem('spotify_tokens');
  }
}

// Create and export the singleton instance
export const spotifyService = new SpotifyService({
  clientId: '27afbc0dcc844cfa914d9acf363f5ba7',
  clientSecret: '3a098849b4314de0967ec898ffac41aa',
  redirectUri: `${window.location.origin}/settings`
});

export default spotifyService;
