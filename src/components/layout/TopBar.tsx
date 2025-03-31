
import { useState } from "react";
import { Link } from "react-router-dom";
import { Bell, ChevronDown, ChevronLeft, ChevronRight, Globe, Menu, Search } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Language } from "@/types";

interface TopBarProps {
  toggleSidebar: () => void;
}

const languages: Language[] = [
  { id: "1", name: "Spanish", code: "es", flag: "🇪🇸" },
  { id: "2", name: "French", code: "fr", flag: "🇫🇷" },
  { id: "3", name: "German", code: "de", flag: "🇩🇪" },
  { id: "4", name: "Italian", code: "it", flag: "🇮🇹" },
];

export default function TopBar({ toggleSidebar }: TopBarProps) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(languages[0]);

  return (
    <header className="sticky top-0 z-30 w-full bg-spotify-black/90 backdrop-blur-sm border-b border-white/5">
      <div className="flex items-center justify-between h-16 px-4">
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleSidebar}
            className="md:flex hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="rounded-full bg-black/40">
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full bg-black/40">
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="hidden md:flex items-center relative max-w-md w-full">
          <Search className="h-4 w-4 absolute left-3 text-muted-foreground" />
          <Input 
            placeholder="Search songs, artists, lyrics..." 
            className="pl-9 bg-spotify-lightgray border-none focus-visible:ring-1 focus-visible:ring-primary"
          />
        </div>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-1 text-sm">
                <Globe className="h-4 w-4" />
                <span>{currentLanguage.flag} {currentLanguage.name}</span>
                <ChevronDown className="h-3 w-3 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-spotify-lightgray border-white/10">
              {languages.map((language) => (
                <DropdownMenuItem
                  key={language.id}
                  onClick={() => setCurrentLanguage(language)}
                  className="cursor-pointer"
                >
                  <span className="mr-2">{language.flag}</span>
                  {language.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full" />
          </Button>

          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback className="bg-spotify-lightgray">JD</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
