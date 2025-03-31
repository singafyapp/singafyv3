
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  BookOpen,
  LayoutGrid,
  LogOut,
  Mic2,
  Music,
  Settings,
  UserCircle
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

interface NavItem {
  icon: React.ElementType;
  label: string;
  href: string;
}

const MainNavItems: NavItem[] = [
  { icon: LayoutGrid, label: "Dashboard", href: "/" },
  { icon: Music, label: "Browse Songs", href: "/songs" },
  { icon: BookOpen, label: "Lyric Learning", href: "/lyric-learning" },
  { icon: Mic2, label: "Practice", href: "/practice" },
  { icon: BarChart3, label: "Progress", href: "/progress" },
];

const BottomNavItems: NavItem[] = [
  { icon: Settings, label: "Settings", href: "/settings" },
  { icon: UserCircle, label: "Profile", href: "/profile" },
];

export default function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const location = useLocation();
  const { logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };
  
  return (
    <aside
      className={cn(
        "h-screen fixed left-0 top-0 z-40 flex flex-col bg-spotify-black border-r border-white/5 transition-all duration-300",
        collapsed ? "w-[72px]" : "w-[240px]"
      )}
    >
      <div className="flex items-center p-4 h-16">
        {!collapsed && (
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold text-gradient">Singafy</span>
          </Link>
        )}
        {collapsed && (
          <Link to="/" className="w-full flex justify-center">
            <span className="text-2xl font-bold text-primary">S</span>
          </Link>
        )}
      </div>

      <nav className="flex flex-col justify-between h-full py-6 overflow-y-auto scrollbar-hide">
        <div className="space-y-2 px-2">
          {MainNavItems.map((item) => (
            <NavItem 
              key={item.href}
              item={item}
              isActive={location.pathname === item.href}
              collapsed={collapsed}
            />
          ))}
        </div>
        
        <div className="space-y-2 px-2 mt-auto pt-6 border-t border-white/5">
          {BottomNavItems.map((item) => (
            <NavItem 
              key={item.href}
              item={item}
              isActive={location.pathname === item.href}
              collapsed={collapsed}
            />
          ))}
          <button 
            onClick={handleLogout}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors hover:bg-white/10 text-muted-foreground"
            )}
          >
            <LogOut className="h-5 w-5" />
            {!collapsed && <span className="text-sm font-medium">Logout</span>}
          </button>
        </div>
      </nav>
    </aside>
  );
}

function NavItem({ item, isActive, collapsed }: { item: NavItem; isActive: boolean; collapsed: boolean }) {
  const IconComponent = item.icon;
  
  const navItem = (
    <Link
      to={item.href}
      className={cn(
        "flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors hover:bg-white/10",
        isActive ? "bg-white/10 text-primary" : "text-muted-foreground"
      )}
    >
      <IconComponent className="h-5 w-5" />
      {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
    </Link>
  );
  
  if (collapsed) {
    return (
      <TooltipProvider>
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            {navItem}
          </TooltipTrigger>
          <TooltipContent side="right" className="bg-spotify-darkgray text-white border-white/5">
            {item.label}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }
  
  return navItem;
}
