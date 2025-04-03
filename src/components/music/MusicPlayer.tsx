
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { formatTime } from "@/lib/utils";
import { Song } from "@/types";
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
import { toast } from "@/hooks/use-toast";

interface MusicPlayerProps {
  song: Song;
}

export function MusicPlayer({ song }: MusicPlayerProps) {
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
    audio.addEventListener('error', handleAudioError);
    
    // Clean up
    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadMetadata);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleAudioError);
      audio.pause();
    };
  }, []);
  
  // Update audio source when song changes
  useEffect(() => {
    if (!audioRef.current || !song || !song.audioUrl) return;
    
    console.log("Music player setting audio source:", song.audioUrl);
    
    // Reset state
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    
    // Set new source
    audioRef.current.src = song.audioUrl;
    audioRef.current.load();
    
    // Update display
    if (audioRef.current.paused) {
      setIsPlaying(false);
    }
  }, [song]);
  
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
  };
  
  const handleAudioError = (e: Event) => {
    console.error("Audio error:", e);
    toast({
      title: "Playback Error",
      description: "Could not play this song. The audio file might be unavailable.",
      variant: "destructive",
    });
    setIsPlaying(false);
  };
  
  const togglePlay = () => {
    if (!audioRef.current || !song.audioUrl) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
          console.log("Music player started playback successfully");
        })
        .catch(error => {
          console.error("Playback failed:", error);
          toast({
            title: "Playback Error",
            description: "Could not play this song. Please try again.",
            variant: "destructive",
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
        {/* Song Info */}
        <div className="hidden sm:flex items-center space-x-3 w-1/4">
          {song ? (
            <>
              <div className="w-12 h-12 bg-cover rounded-md overflow-hidden">
                <img 
                  src={song.albumCover} 
                  alt={`${song.title} cover`}
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="truncate">
                <div className="text-sm font-medium truncate">{song.title}</div>
                <div className="text-xs text-muted-foreground truncate">{song.artist}</div>
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
              disabled={!song}
            >
              <Shuffle className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-muted-foreground hover:text-white"
              disabled={!song}
            >
              <SkipBack className="h-4 w-4" />
            </Button>
            <Button 
              onClick={togglePlay} 
              disabled={!song?.audioUrl}
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
              disabled={!song}
            >
              <SkipForward className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-muted-foreground hover:text-white"
              disabled={!song}
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
              disabled={!song?.audioUrl}
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
