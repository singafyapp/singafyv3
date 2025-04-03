
import { Song } from "@/types";
import { Clock, Heart, BookOpen } from "lucide-react";
import { formatTime } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface RecommendedSongCardProps {
  song: Song;
  onFavorite?: () => void;
  onLearn?: () => void;
  onPractice?: () => void;
  showActions?: boolean;
  layout?: "horizontal" | "vertical";
}

export function RecommendedSongCard({ 
  song, 
  onFavorite,
  onLearn,
  showActions = false,
  layout = "vertical"
}: RecommendedSongCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  
  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
    if (onFavorite) {
      onFavorite();
    }
  };
  
  const handleLearnClick = () => {
    // Ensure there is audio URL before learning
    if (!song.audioUrl || song.audioUrl.trim() === '') {
      const sampleUrls = [
        "https://p.scdn.co/mp3-preview/8ed90a239874906f1bbcf13dd0ef5037dfa3d1ef",
        "https://p.scdn.co/mp3-preview/f7a1b8a270f310e43ced534327b198dabbf0a3bd",
        "https://p.scdn.co/mp3-preview/3eb16018c3908c33a95edce8f79a8113ddae824e"
      ];
      song.audioUrl = sampleUrls[Math.floor(Math.random() * sampleUrls.length)];
      console.log("Added audio URL to song before learning:", song.title, song.audioUrl);
    }
    
    if (onLearn) {
      onLearn();
    }
  };
  
  const isHorizontal = layout === "horizontal";
  
  return (
    <div className={cn(
      "glass-card rounded-md overflow-hidden transition-transform duration-200 hover:scale-102",
      isHorizontal ? "flex flex-row" : "flex flex-col"
    )}>
      <div className={cn(
        "relative",
        isHorizontal ? "w-16 h-16 flex-shrink-0" : ""
      )}>
        <img
          src={song.albumCover}
          alt={`${song.title} cover`}
          className={cn(
            "object-cover",
            isHorizontal ? "w-16 h-16" : "w-full aspect-square"
          )}
        />
        <div className="absolute top-2 right-2 flex space-x-1">
          <span className="text-xs bg-black/60 backdrop-blur-sm px-2 py-1 rounded-full">
            {song.language.flag} {song.language.name}
          </span>
        </div>
        {showActions && (
          <button 
            className={cn(
              "absolute top-2 left-2 p-1.5 bg-black/60 backdrop-blur-sm rounded-full transition-all",
              isFavorite && "text-red-500"
            )}
            onClick={handleFavoriteClick}
          >
            <Heart className="h-4 w-4" fill={isFavorite ? "currentColor" : "none"} />
          </button>
        )}
      </div>
      <div className={cn(
        "p-3 flex-1 flex flex-col",
        isHorizontal && "flex-grow"
      )}>
        <h3 className="font-medium text-sm truncate" title={song.title}>
          {song.title}
        </h3>
        <p className="text-xs text-muted-foreground truncate" title={song.artist}>
          {song.artist}
        </p>
        
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/5 text-xs text-muted-foreground">
          <span className="flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            {formatTime(song.duration)}
          </span>
          <span className={cn(
            "px-1.5 py-0.5 rounded text-[10px] uppercase",
            song.difficulty === "beginner" ? "bg-green-950/50 text-green-400" :
            song.difficulty === "intermediate" ? "bg-yellow-950/50 text-yellow-400" :
            "bg-red-950/50 text-red-400"
          )}>
            {song.difficulty}
          </span>
        </div>
        
        {showActions && (
          <div className="mt-3 flex justify-end">
            <Button 
              size="sm" 
              variant="secondary" 
              className="text-xs"
              onClick={handleLearnClick}
            >
              <BookOpen className="h-4 w-4 mr-2" />
              Learn Lyrics
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
