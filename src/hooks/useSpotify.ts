
import { useState, useEffect } from 'react';
import spotifyService from '@/services/spotify';
import { toast } from '@/hooks/use-toast';

export function useSpotify() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userProfile, setUserProfile] = useState<any>(null);

  useEffect(() => {
    checkAuthentication();
  }, []);

  async function checkAuthentication() {
    setIsLoading(true);
    const isAuth = spotifyService.isAuthenticated();
    setIsAuthenticated(isAuth);
    
    if (isAuth) {
      try {
        const profile = await spotifyService.getUserProfile();
        setUserProfile(profile);
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
      }
    }
    
    setIsLoading(false);
  }

  async function handleAuthCallback(code: string) {
    setIsLoading(true);
    try {
      const success = await spotifyService.handleAuthCallback(code);
      setIsAuthenticated(success);
      
      if (success) {
        toast({
          title: "Success!",
          description: "Your Spotify account has been connected.",
        });
        
        const profile = await spotifyService.getUserProfile();
        setUserProfile(profile);
      }
    } catch (error) {
      console.error('Error handling auth callback:', error);
      toast({
        title: "Connection Failed",
        description: "Could not connect to Spotify. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  function connect() {
    const authUrl = spotifyService.getAuthUrl();
    window.location.href = authUrl;
  }

  function disconnect() {
    spotifyService.logout();
    setIsAuthenticated(false);
    setUserProfile(null);
    toast({
      title: "Disconnected",
      description: "Your Spotify account has been disconnected.",
    });
  }

  return {
    isAuthenticated,
    isLoading,
    userProfile,
    connect,
    disconnect,
    handleAuthCallback,
  };
}

export default useSpotify;
