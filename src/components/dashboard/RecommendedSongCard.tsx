
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Languages, PlayCircle } from "lucide-react";
import { Song } from "@/types";
import { cn } from "@/lib/utils";

interface RecommendedSongCardProps {
  song: Song;
  layout?: "horizontal" | "vertical";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
}

export function RecommendedSongCard({
  song,
  layout = "vertical",
  size = "md",
  onClick,
}: RecommendedSongCardProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-500/20 text-green-500 hover:bg-green-500/30";
      case "intermediate":
        return "bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/30";
      case "advanced":
        return "bg-red-500/20 text-red-500 hover:bg-red-500/30";
      default:
        return "bg-primary/20 text-primary hover:bg-primary/30";
    }
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  if (layout === "horizontal") {
    return (
      <div 
        onClick={onClick}
        className={cn(
          "flex items-center gap-3 p-2 rounded-md cursor-pointer hover:bg-white/5 transition",
          size === "sm" && "gap-2 p-1.5",
          size === "lg" && "gap-4 p-3"
        )}
      >
        <div className={cn(
          "relative overflow-hidden rounded-md aspect-square bg-spotify-lightgray flex-shrink-0",
          size === "sm" && "w-12 h-12",
          size === "md" && "w-16 h-16",
          size === "lg" && "w-20 h-20"
        )}>
          <img
            src={song.albumCover}
            alt={`${song.title} by ${song.artist}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity">
            <PlayCircle className="text-primary h-8 w-8" />
          </div>
        </div>
        <div className="flex-1">
          <h4 className={cn(
            "font-medium line-clamp-1",
            size === "sm" && "text-sm",
            size === "md" && "text-base",
            size === "lg" && "text-lg"
          )}>{song.title}</h4>
          <p className="text-muted-foreground line-clamp-1 text-sm">{song.artist}</p>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="outline" className="text-xs px-1.5 py-0 h-5">
              {song.language.flag}
            </Badge>
            <Badge 
              variant="outline"
              className={cn(
                "text-xs px-1.5 py-0 border-0 h-5",
                getDifficultyColor(song.difficulty)
              )}
            >
              {song.difficulty}
            </Badge>
          </div>
        </div>
        <div className="text-xs text-muted-foreground">
          {formatDuration(song.duration)}
        </div>
      </div>
    );
  }

  return (
    <Card 
      onClick={onClick}
      className="bg-spotify-darkgray border-white/5 hover-scale overflow-hidden cursor-pointer"
    >
      <div className="relative aspect-square bg-spotify-lightgray">
        <img
          src={song.albumCover}
          alt={`${song.title} by ${song.artist}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity">
          <PlayCircle className="text-primary h-12 w-12" />
        </div>
      </div>
      <CardContent className="p-3">
        <CardTitle className="text-base line-clamp-1">{song.title}</CardTitle>
        <CardDescription className="text-sm line-clamp-1 mt-0.5">{song.artist}</CardDescription>
        
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-1">
            <Badge variant="outline" className="text-xs px-1.5 py-0 h-5">
              {song.language.flag}
            </Badge>
            <Badge 
              variant="outline"
              className={cn(
                "text-xs px-1.5 py-0 border-0 h-5",
                getDifficultyColor(song.difficulty)
              )}
            >
              {song.difficulty}
            </Badge>
          </div>
          <Button variant="ghost" size="icon" className="h-7 w-7">
            <Heart className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
