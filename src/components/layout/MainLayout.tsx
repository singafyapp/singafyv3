
import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import MobileNav from "./MobileNav";
import { MusicPlayer } from "../music/MusicPlayer";
import { Song } from "@/types";
import { toast } from "@/hooks/use-toast";

// Define reliable audio URLs that we know work
const RELIABLE_AUDIO_URLS = [
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
];

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
        
        // Always ensure the song has a reliable audio URL
        const reliableUrl = RELIABLE_AUDIO_URLS[0];
        savedSong.audioUrl = reliableUrl;
        
        // Update localStorage with the reliable URL to ensure consistency
        localStorage.setItem('selectedSong', JSON.stringify(savedSong));
        
        setCurrentSong(savedSong);
        console.log("Selected song loaded from localStorage:", savedSong.title);
        console.log("Using reliable audio source:", reliableUrl);
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
