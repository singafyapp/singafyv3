
import { useState, useEffect } from 'react';
import spotifyService from '@/services/spotify';
import { toast } from '@/hooks/use-toast';

export function useSpotify() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    checkConnection();
  }, []);

  async function checkConnection() {
    setIsLoading(true);
    try {
      // Try to get a valid token to confirm API is working
      const token = await spotifyService.getValidToken();
      setIsConnected(!!token);
    } catch (error) {
      console.error('Failed to connect to Spotify API:', error);
      setIsConnected(false);
      toast({
        title: "Spotify Connection Issue",
        description: "Could not connect to Spotify API. Some features may be limited.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return {
    isConnected,
    isLoading,
    checkConnection
  };
}

export default useSpotify;
