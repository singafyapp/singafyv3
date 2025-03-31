
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useSpotify from "@/hooks/useSpotify";
import { Music } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Settings() {
  const location = useLocation();
  const { 
    isAuthenticated, 
    isLoading, 
    userProfile, 
    connect, 
    disconnect, 
    handleAuthCallback 
  } = useSpotify();

  useEffect(() => {
    // Check if we have a code in the URL (redirected from Spotify)
    const urlParams = new URLSearchParams(location.search);
    const code = urlParams.get('code');
    
    if (code) {
      handleAuthCallback(code);
      // Remove the code from the URL to avoid processing it multiple times
      window.history.replaceState({}, document.title, location.pathname);
    }
  }, [location.search]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-1">Settings</h1>
        <p className="text-muted-foreground">Manage your account and preferences</p>
      </div>
      
      <div className="space-y-6">
        <div className="glass-card p-6 space-y-6">
          <h2 className="text-xl font-semibold">Language Preferences</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Learning Language</p>
                <p className="text-sm text-muted-foreground">Select your target language</p>
              </div>
              <Select defaultValue="spanish">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="spanish">🇪🇸 Spanish</SelectItem>
                  <SelectItem value="french">🇫🇷 French</SelectItem>
                  <SelectItem value="german">🇩🇪 German</SelectItem>
                  <SelectItem value="italian">🇮🇹 Italian</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Native Language</p>
                <p className="text-sm text-muted-foreground">Select your native language</p>
              </div>
              <Select defaultValue="english">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english">🇬🇧 English</SelectItem>
                  <SelectItem value="spanish">🇪🇸 Spanish</SelectItem>
                  <SelectItem value="french">🇫🇷 French</SelectItem>
                  <SelectItem value="german">🇩🇪 German</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        <div className="glass-card p-6 space-y-6">
          <h2 className="text-xl font-semibold">App Settings</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Daily Reminders</p>
                <p className="text-sm text-muted-foreground">Get notifications to maintain your streak</p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Music Player</p>
                <p className="text-sm text-muted-foreground">Show music player while learning</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </div>
        
        <div className="glass-card p-6 space-y-4">
          <h2 className="text-xl font-semibold">Spotify Integration</h2>
          
          {isAuthenticated && userProfile ? (
            <div>
              <div className="bg-spotify-darkgray p-4 rounded-lg mb-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    {userProfile.images && userProfile.images.length > 0 ? (
                      <AvatarImage src={userProfile.images[0].url} />
                    ) : (
                      <AvatarFallback>
                        <Music className="h-6 w-6" />
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div>
                    <p className="font-medium">{userProfile.display_name}</p>
                    <p className="text-xs text-muted-foreground">{userProfile.email}</p>
                  </div>
                </div>
              </div>
              <Button 
                variant="destructive" 
                onClick={disconnect}
              >
                Disconnect Spotify
              </Button>
            </div>
          ) : (
            <div>
              <p className="text-sm text-muted-foreground mb-4">
                Connect your Spotify account to access your playlists and favorite songs.
              </p>
              <Button 
                className="bg-green-600 hover:bg-green-700 flex items-center gap-2" 
                onClick={connect}
                disabled={isLoading}
              >
                <Music className="h-4 w-4" />
                Connect Spotify
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
