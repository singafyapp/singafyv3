
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
  private expiresAt: number = 0;

  constructor(config: SpotifyConfig) {
    this.clientId = config.clientId;
    this.clientSecret = config.clientSecret;
    this.redirectUri = config.redirectUri;
    
    // Get app token on initialization
    this.getClientCredentialsToken();
  }

  private async getClientCredentialsToken(): Promise<boolean> {
    try {
      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + btoa(`${this.clientId}:${this.clientSecret}`)
        },
        body: new URLSearchParams({
          grant_type: 'client_credentials'
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get access token');
      }

      const data = await response.json();
      this.accessToken = data.access_token;
      this.expiresAt = Date.now() + data.expires_in * 1000;
      
      return true;
    } catch (error) {
      console.error('Error during Spotify authentication:', error);
      toast({
        title: "Spotify API Connection Failed",
        description: "We're having trouble connecting to Spotify. Some features may be limited.",
        variant: "destructive",
      });
      return false;
    }
  }

  public isAuthenticated(): boolean {
    return Boolean(this.accessToken && this.expiresAt > Date.now());
  }

  public async getValidToken(): Promise<string | null> {
    if (!this.accessToken || Date.now() >= this.expiresAt) {
      const success = await this.getClientCredentialsToken();
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

  public async searchTracks(query: string, limit = 10) {
    return this.fetch(`/search?q=${encodeURIComponent(query)}&type=track&limit=${limit}`);
  }

  public async getTrack(trackId: string) {
    return this.fetch(`/tracks/${trackId}`);
  }
}

// Create and export the singleton instance
export const spotifyService = new SpotifyService({
  clientId: '27afbc0dcc844cfa914d9acf363f5ba7',
  clientSecret: '3a098849b4314de0967ec898ffac41aa',
  redirectUri: `${window.location.origin}/settings`
});

export default spotifyService;
