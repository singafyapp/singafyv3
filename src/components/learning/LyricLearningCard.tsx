
import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, Info, MusicIcon, Play, Pause } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Song, Lyric, WordFocus } from "@/types";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "@/hooks/use-toast";

interface LyricLearningCardProps {
  song: Song;
  lyrics?: Lyric[];
}

export function LyricLearningCard({ song, lyrics = [] }: LyricLearningCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentLyricIndex, setCurrentLyricIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Use a state to track if audio is ready
  const [isAudioReady, setIsAudioReady] = useState(false);
  
  useEffect(() => {
    // Create audio element
    if (!audioRef.current) {
      audioRef.current = new Audio();
      
      // Set up event handlers for the audio element
      audioRef.current.addEventListener('canplaythrough', () => {
        console.log('Audio ready to play');
        setIsAudioReady(true);
      });
      
      audioRef.current.addEventListener('error', (e) => {
        console.error('Audio error:', e);
        setIsPlaying(false);
        toast({
          title: "Audio Error",
          description: "Could not load audio. Trying alternative source...",
          variant: "destructive",
        });
        
        // Try with a reliable fallback URL
        if (audioRef.current) {
          audioRef.current.src = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";
          audioRef.current.load();
        }
      });
      
      audioRef.current.addEventListener('ended', () => {
        setIsPlaying(false);
        console.log('Audio playback ended');
      });
    }
    
    // Clean up function
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        setIsPlaying(false);
        
        // Remove event listeners
        audioRef.current.removeEventListener('canplaythrough', () => {});
        audioRef.current.removeEventListener('error', () => {});
        audioRef.current.removeEventListener('ended', () => {});
      }
    };
  }, []);
  
  // Set the audio source when the song changes
  useEffect(() => {
    if (!audioRef.current) return;
    
    setIsAudioReady(false);
    
    // Use the song's audio URL or a fallback
    if (song.audioUrl && song.audioUrl.trim() !== '') {
      audioRef.current.src = song.audioUrl;
      console.log("Learning card audio source set to:", song.audioUrl);
    } else {
      // Fallback preview URL that is known to work
      audioRef.current.src = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";
      console.log("Using fallback audio source");
    }
    
    // Load the audio to check if it works
    audioRef.current.load();
    
  }, [song]);
  
  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      // Use a more reliable song sample if we're having issues
      const playPromise = audioRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            console.log("Audio playing successfully");
          })
          .catch(error => {
            console.error('Audio playback error:', error);
            
            // Try a highly reliable audio source
            audioRef.current!.src = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";
            audioRef.current!.load();
            
            // Try playing again
            audioRef.current!.play()
              .then(() => {
                setIsPlaying(true);
                console.log("Fallback audio playing successfully");
              })
              .catch(secondError => {
                console.error('Fallback also failed:', secondError);
                toast({
                  title: "Audio Playback Failed",
                  description: "Unable to play audio. Please try another song.",
                  variant: "destructive",
                });
              });
          });
      }
    }
  };

  // Change lyric based on audio time
  useEffect(() => {
    if (!isPlaying || !lyrics || lyrics.length === 0 || !audioRef.current) return;
    
    const handleTimeUpdate = () => {
      if (!audioRef.current || !lyrics) return;
      
      const currentTime = audioRef.current.currentTime;
      
      // Find the current lyric based on the audio time
      for (let i = 0; i < lyrics.length; i++) {
        if (currentTime >= lyrics[i].startTime && currentTime <= lyrics[i].endTime) {
          if (currentLyricIndex !== i) {
            setCurrentLyricIndex(i);
          }
          break;
        }
      }
    };
    
    audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
    
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
      }
    };
  }, [isPlaying, lyrics, currentLyricIndex]);

  return (
    <Card className="bg-spotify-darkgray border-white/5 overflow-hidden">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-16 h-16 rounded-md overflow-hidden">
              <img 
                src={song.albumCover} 
                alt={song.title} 
                className="w-full h-full object-cover" 
              />
            </div>
            <div>
              <CardTitle className="text-lg">{song.title}</CardTitle>
              <CardDescription className="text-sm">{song.artist}</CardDescription>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className="text-xs">
                  {song.language.flag} {song.language.name}
                </Badge>
                <Badge variant="outline" className="bg-primary/20 text-primary border-0 text-xs">
                  {song.difficulty}
                </Badge>
              </div>
            </div>
          </div>
          
          <Button 
            onClick={togglePlay}
            className="w-full flex items-center gap-2 mb-6 bg-primary hover:bg-primary/90"
            disabled={!isAudioReady && !isPlaying}
          >
            {isPlaying ? (
              <>
                Pause <Pause className="h-4 w-4" />
              </>
            ) : (
              <>
                Start Learning <Play className="h-4 w-4" />
              </>
            )}
          </Button>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Learning Progress</span>
                <span>{Math.round((currentLyricIndex / (lyrics?.length || 1)) * 100)}%</span>
              </div>
              <Progress value={Math.round((currentLyricIndex / (lyrics?.length || 1)) * 100)} className="h-2" />
            </div>
            
            <div className="bg-white/5 rounded-md p-3">
              <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                <Info className="h-4 w-4 text-primary" /> Vocabulary Focus
              </h4>
              <div className="text-sm grid gap-1">
                <div className="flex items-center gap-1">
                  <span className="text-primary">{lyrics?.reduce((count, lyric) => count + (lyric.wordFocus?.length || 0), 0) || 7}</span> new words
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-primary">4</span> expressions
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-primary">2</span> grammar structures
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-spotify-black px-6 py-8 flex flex-col">
          <h3 className="text-sm font-medium text-muted-foreground mb-3">Current Lyric</h3>
          
          <div className="flex-1 flex items-center justify-center">
            <LyricDisplay 
              lyrics={lyrics} 
              currentIndex={currentLyricIndex} 
            />
          </div>
          
          <div className="flex justify-between mt-6">
            <Button 
              variant="outline"
              disabled={currentLyricIndex === 0}
              onClick={() => setCurrentLyricIndex(Math.max(0, currentLyricIndex - 1))}
              className="border-white/10"
            >
              Previous Line
            </Button>
            <Button 
              variant="outline" 
              className="border-white/10"
              onClick={() => setCurrentLyricIndex(Math.min((lyrics?.length || 1) - 1, currentLyricIndex + 1))}
              disabled={!lyrics || currentLyricIndex >= lyrics.length - 1}
            >
              Next Line <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}

function LyricDisplay({ lyrics, currentIndex }: { lyrics: Lyric[], currentIndex: number }) {
  if (!lyrics.length) {
    return (
      <div className="text-center text-muted-foreground">
        No lyrics available
      </div>
    );
  }
  
  const currentLyric = lyrics[currentIndex];
  
  return (
    <div className="text-center space-y-4 w-full">
      <p className="text-xl font-medium leading-relaxed tracking-wide">
        {currentLyric.wordFocus && currentLyric.wordFocus.length > 0 ? (
          splitAndHighlight(currentLyric.text, currentLyric.wordFocus)
        ) : (
          currentLyric.text
        )}
      </p>
      
      {currentLyric.translation && (
        <p className="text-muted-foreground">
          {currentLyric.translation}
        </p>
      )}
    </div>
  );
}

function splitAndHighlight(text: string, wordFocus: WordFocus[]) {
  const parts = [];
  let lastIndex = 0;
  
  // Get all the words to highlight
  const wordsToHighlight = wordFocus.map(item => item.word.toLowerCase());
  
  // Split the text into words
  const words = text.split(/(\s+)/);
  
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    const isSpace = /^\s+$/.test(word);
    
    if (isSpace) {
      parts.push(<span key={`space-${i}`}>{word}</span>);
      continue;
    }
    
    // Check if this word (without punctuation) is in our focus list
    const cleanWord = word.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
    const matchingFocus = wordFocus.find(item => item.word.toLowerCase() === cleanWord);
    
    if (matchingFocus) {
      parts.push(
        <TooltipProvider key={`word-${i}`}>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="text-primary font-bold cursor-help">
                {word}
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <div className="space-y-1 max-w-xs">
                <p className="font-bold">{matchingFocus.word}</p>
                <p className="text-sm">{matchingFocus.definition}</p>
                {matchingFocus.translation && (
                  <p className="text-xs text-muted-foreground italic">
                    Translation: {matchingFocus.translation}
                  </p>
                )}
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    } else {
      parts.push(<span key={`word-${i}`}>{word}</span>);
    }
  }
  
  return parts;
}
