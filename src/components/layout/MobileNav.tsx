
import { useLocation, Link } from "react-router-dom";
import { BarChart3, BookOpen, Home, Music, Search } from "lucide-react";
import { cn } from "@/lib/utils";

export default function MobileNav() {
  const location = useLocation();

  const navItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: Search, label: "Search", href: "/search" },
    { icon: BookOpen, label: "Learn", href: "/lyric-learning" },
    { icon: Music, label: "Songs", href: "/songs" },
    { icon: BarChart3, label: "Progress", href: "/progress" },
  ];

  return (
    <div className="fixed bottom-0 left-0 z-40 w-full h-16 bg-spotify-black border-t border-white/5 md:hidden">
      <div className="grid grid-cols-5 h-full">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href;
          
          return (
            <Link
              key={item.href}
              to={item.href}
              className="flex flex-col items-center justify-center"
            >
              <Icon 
                className={cn(
                  "h-5 w-5 mb-1",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}
              />
              <span
                className={cn(
                  "text-xs",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
