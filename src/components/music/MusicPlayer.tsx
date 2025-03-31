
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { 
  ChevronDown,
  Heart,
  ListMusic,
  MoreHorizontal,
  Pause,
  Play,
  Repeat,
  Shuffle,
  SkipBack,
  SkipForward,
  Volume2
} from "lucide-react";
import { cn } from "@/lib/utils";

interface MusicPlayerProps {
  className?: string;
  expanded?: boolean;
}

export function MusicPlayer({ className, expanded = false }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(30);
  const [volume, setVolume] = useState(70);
  const [liked, setLiked] = useState(false);

  const togglePlay = () => setIsPlaying(!isPlaying);
  const toggleLike = () => setLiked(!liked);

  const song = {
    title: "Despacito",
    artist: "Luis Fonsi ft. Daddy Yankee",
    albumCover: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=300&h=300",
    duration: 228,
    currentTime: 68,
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={cn(
      "fixed bottom-0 left-0 right-0 bg-gradient-to-t from-black to-spotify-black/95 backdrop-blur-lg border-t border-white/5 py-2 px-3 md:p-4 z-50",
      "h-20 md:h-20",
      className
    )}>
      <div className="max-w-7xl mx-auto flex items-center gap-3">
        {/* Song info */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="w-12 h-12 bg-spotify-lightgray rounded overflow-hidden hidden md:block">
            <img 
              src={song.albumCover} 
              alt={song.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="min-w-0 hidden sm:block">
            <h4 className="font-medium text-sm md:text-base truncate">{song.title}</h4>
            <p className="text-xs text-muted-foreground truncate">{song.artist}</p>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-muted-foreground hover:text-white hidden md:flex"
            onClick={toggleLike}
          >
            <Heart className={cn("h-4 w-4", liked && "fill-primary text-primary")} />
          </Button>
        </div>
        
        {/* Player controls */}
        <div className="flex flex-col items-center gap-1 flex-1 max-w-xl">
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-muted-foreground hover:text-white hidden sm:flex"
            >
              <Shuffle className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-muted-foreground hover:text-white"
            >
              <SkipBack className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-9 w-9 rounded-full bg-white text-black hover:bg-white/90 hover:scale-105 transition-transform"
              onClick={togglePlay}
            >
              {isPlaying ? (
                <Pause className="h-5 w-5" />
              ) : (
                <Play className="h-5 w-5 ml-0.5" />
              )}
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-muted-foreground hover:text-white"
            >
              <SkipForward className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-muted-foreground hover:text-white hidden sm:flex"
            >
              <Repeat className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="w-full hidden md:flex items-center gap-2">
            <span className="text-xs text-muted-foreground w-8 text-right">
              {formatTime(song.currentTime)}
            </span>
            <Slider
              value={[progress]}
              max={100}
              step={1}
              className="w-full h-1"
              onValueChange={(values) => setProgress(values[0])}
            />
            <span className="text-xs text-muted-foreground w-8">
              {formatTime(song.duration)}
            </span>
          </div>
        </div>
        
        {/* Right controls */}
        <div className="flex items-center gap-2 flex-1 justify-end">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-muted-foreground hover:text-white hidden lg:flex"
          >
            <ListMusic className="h-4 w-4" />
          </Button>
          <div className="items-center gap-1 hidden lg:flex">
            <Volume2 className="h-4 w-4 text-muted-foreground" />
            <Slider
              value={[volume]}
              max={100}
              step={1}
              className="w-24 h-1"
              onValueChange={(values) => setVolume(values[0])}
            />
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-muted-foreground hover:text-white hidden md:flex"
          >
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
