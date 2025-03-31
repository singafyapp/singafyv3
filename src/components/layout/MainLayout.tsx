
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { cn } from "@/lib/utils";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import MobileNav from "./MobileNav";
import { MusicPlayer } from "../music/MusicPlayer";

export default function MainLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showMusicPlayer, setShowMusicPlayer] = useState(true);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

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
        {showMusicPlayer && <MusicPlayer />}
      </div>
    </div>
  );
}
