
import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import MobileNav from "./MobileNav";
import { MusicPlayer } from "../music/MusicPlayer";
import { Song } from "@/types";
import { toast } from "@/hooks/use-toast";

export default function MainLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showMusicPlayer, setShowMusicPlayer] = useState(true);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const location = useLocation();

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };
  
  // Check for selected song in local storage
  useEffect(() => {
    const savedSongJson = localStorage.getItem('selectedSong');
    if (savedSongJson) {
      try {
        const savedSong = JSON.parse(savedSongJson);
        
        // Ensure song has a valid audio URL
        if (!savedSong.audioUrl || savedSong.audioUrl.trim() === '') {
          toast({
            title: "Audio Unavailable",
            description: "This song doesn't have audio available. Using a placeholder.",
            variant: "destructive",
          });
          
          // Assign a working preview URL as fallback
          savedSong.audioUrl = "https://p.scdn.co/mp3-preview/8ed90a239874906f1bbcf13dd0ef5037dfa3d1ef";
        }
        
        setCurrentSong(savedSong);
        console.log("Selected song loaded from localStorage:", savedSong.title);
        console.log("Audio source:", savedSong.audioUrl);
      } catch (e) {
        console.error("Error parsing song from localStorage:", e);
        localStorage.removeItem('selectedSong');
      }
    }
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen bg-spotify-black">
      {/* Sidebar - hidden on mobile */}
      <div className="hidden md:block">
        <Sidebar collapsed={sidebarCollapsed} onToggle={toggleSidebar} />
      </div>

      {/* Main Content */}
      <div 
        className={cn(
          "flex flex-col flex-1",
          sidebarCollapsed ? "md:ml-[72px]" : "md:ml-[240px]",
          showMusicPlayer ? "pb-24 md:pb-20" : "pb-16 md:pb-0"
        )}
      >
        <TopBar toggleSidebar={toggleSidebar} />
        
        {/* Content */}
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <Outlet />
        </main>
        
        {/* Mobile Navigation */}
        <MobileNav />
        
        {/* Music Player - Fixed at the bottom */}
        {showMusicPlayer && currentSong && 
          <MusicPlayer song={currentSong} />
        }
      </div>
    </div>
  );
}
