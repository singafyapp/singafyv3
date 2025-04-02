
import { useState, useRef, useEffect } from "react";
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
import { formatTime } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

interface MusicPlayerProps {
  className?: string;
  expanded?: boolean;
  songUrl?: string;
}

export function MusicPlayer({ className, expanded = false, songUrl }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(70);
  const [liked, setLiked] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(228);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Create audio element on mount
  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.volume = volume / 100;
    
    // Load default audio if no songUrl provided
    const defaultAudio = "https://p.scdn.co/mp3-preview/8ed90a239874906f1bbcf13dd0ef5037dfa3d1ef";
    audioRef.current.src = songUrl || defaultAudio;
    
    audioRef.current.addEventListener('loadedmetadata', () => {
      if (audioRef.current) {
        setDuration(audioRef.current.duration);
      }
    });
    
    audioRef.current.addEventListener('timeupdate', updateProgress);
    audioRef.current.addEventListener('ended', handleSongEnd);
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener('timeupdate', updateProgress);
        audioRef.current.removeEventListener('ended', handleSongEnd);
      }
    };
  }, [songUrl]);
  
  // Update volume when changed
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);
  
  const updateProgress = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      setCurrentTime(current);
      setProgress((current / duration) * 100);
    }
  };
  
  const handleSongEnd = () => {
    setIsPlaying(false);
    setProgress(0);
    setCurrentTime(0);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(error => {
          console.error('Playback failed:', error);
          toast({
            title: "Playback Error",
            description: "Unable to play audio. Please try again.",
            variant: "destructive",
          });
        });
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  const handleProgressChange = (values: number[]) => {
    const newProgress = values[0];
    setProgress(newProgress);
    if (audioRef.current) {
      const newTime = (newProgress / 100) * duration;
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };
  
  const toggleLike = () => setLiked(!liked);

  const song = {
    title: "Despacito",
    artist: "Luis Fonsi ft. Daddy Yankee",
    albumCover: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=300&h=300",
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
              {formatTime(currentTime)}
            </span>
            <Slider
              value={[progress]}
              max={100}
              step={1}
              className="w-full h-1"
              onValueChange={handleProgressChange}
            />
            <span className="text-xs text-muted-foreground w-8">
              {formatTime(duration)}
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
