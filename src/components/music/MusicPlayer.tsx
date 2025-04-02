
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { formatTime } from "@/lib/utils";
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX,
  Repeat,
  Shuffle
} from "lucide-react";

interface MusicPlayerProps {
  songUrl?: string;
}

export function MusicPlayer({ songUrl }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Initialize audio element
  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;
    
    // Set up event listeners
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadMetadata);
    audio.addEventListener('ended', handleEnded);
    
    // Clean up
    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadMetadata);
      audio.removeEventListener('ended', handleEnded);
      audio.pause();
    };
  }, []);
  
  // Update audio source when songUrl changes
  useEffect(() => {
    if (audioRef.current && songUrl) {
      // Check if URL is empty or undefined
      if (songUrl.trim() === '') {
        console.error("Empty song URL provided to MusicPlayer");
        return;
      }
      
      console.log("Music player setting audio source:", songUrl);
      audioRef.current.src = songUrl;
      audioRef.current.load();
      setCurrentTime(0);
      setDuration(0);
      
      // Don't auto-play when a new song is loaded - let user decide
      setIsPlaying(false);
    }
  }, [songUrl]);
  
  // Update volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);
  
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };
  
  const handleLoadMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
      console.log("Audio metadata loaded. Duration:", audioRef.current.duration);
    }
  };
  
  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    // Could implement auto-next song functionality here
  };
  
  const togglePlay = () => {
    if (!audioRef.current || !songUrl) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      // Ensure we have the latest source
      if (songUrl !== audioRef.current.src) {
        audioRef.current.src = songUrl;
        audioRef.current.load();
      }
      
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
          console.log("Music player started playback successfully");
        })
        .catch(error => {
          console.error("Playback failed:", error);
          
          // Try with a fallback URL if original fails
          const fallbackUrl = "https://p.scdn.co/mp3-preview/8ed90a239874906f1bbcf13dd0ef5037dfa3d1ef";
          console.log("Trying with fallback URL:", fallbackUrl);
          
          audioRef.current!.src = fallbackUrl;
          audioRef.current!.load();
          audioRef.current!.play()
            .then(() => {
              setIsPlaying(true);
              console.log("Fallback playback started");
            })
            .catch(secondError => {
              console.error("Fallback playback also failed:", secondError);
            });
        });
    }
  };
  
  const handleSeek = (value: number[]) => {
    if (audioRef.current) {
      const newTime = value[0];
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };
  
  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    if (newVolume === 0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
    }
  };
  
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-spotify-darkgray border-t border-white/5 p-3 z-50">
      <div className="flex items-center justify-between max-w-screen-xl mx-auto">
        {/* Song Info - Hidden on small screens */}
        <div className="hidden sm:flex items-center space-x-3 w-1/4">
          {songUrl ? (
            <>
              <div className="w-12 h-12 bg-spotify-black rounded-md flex items-center justify-center">
                <MusicIcon className="h-6 w-6 text-primary" />
              </div>
              <div className="truncate">
                <div className="text-sm font-medium truncate">Now Playing</div>
                <div className="text-xs text-muted-foreground truncate">Language Learning</div>
              </div>
            </>
          ) : (
            <div className="text-sm text-muted-foreground">No song selected</div>
          )}
        </div>
        
        {/* Player Controls */}
        <div className="flex flex-col items-center w-full sm:w-2/4">
          <div className="flex items-center space-x-2 mb-1">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-muted-foreground hover:text-white"
              disabled={!songUrl}
            >
              <Shuffle className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-muted-foreground hover:text-white"
              disabled={!songUrl}
            >
              <SkipBack className="h-4 w-4" />
            </Button>
            <Button 
              onClick={togglePlay} 
              disabled={!songUrl}
              variant="outline" 
              size="icon" 
              className="h-8 w-8 rounded-full bg-white text-black hover:bg-white/90 hover:text-black"
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-muted-foreground hover:text-white"
              disabled={!songUrl}
            >
              <SkipForward className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-muted-foreground hover:text-white"
              disabled={!songUrl}
            >
              <Repeat className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex items-center w-full space-x-2">
            <div className="text-xs w-10 text-right">{formatTime(currentTime)}</div>
            <Slider
              value={[currentTime]}
              min={0}
              max={duration || 100}
              step={0.1}
              onValueChange={handleSeek}
              disabled={!songUrl}
              className="w-full"
            />
            <div className="text-xs w-10">{formatTime(duration)}</div>
          </div>
        </div>
        
        {/* Volume Control - Hidden on small screens */}
        <div className="hidden sm:flex items-center space-x-2 w-1/4 justify-end">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleMute}
            className="h-8 w-8 text-muted-foreground hover:text-white"
          >
            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </Button>
          <Slider
            value={[isMuted ? 0 : volume]}
            min={0}
            max={1}
            step={0.01}
            onValueChange={handleVolumeChange}
            className="w-20"
          />
        </div>
      </div>
    </div>
  );
}

function MusicIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  );
}
