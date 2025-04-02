
import { useState, useEffect } from "react";
import { getFavorites, removeFavorite, isFavorite } from "@/services/favorites";
import { Song } from "@/types";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import { RecommendedSongCard } from "@/components/dashboard/RecommendedSongCard";
import { toast } from "@/hooks/use-toast";

export default function Favorites() {
  const [favoriteSongs, setFavoriteSongs] = useState<Song[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Load favorites when the component mounts
    loadFavorites();
  }, []);

  const loadFavorites = () => {
    const favorites = getFavorites();
    setFavoriteSongs(favorites);
  };

  const handleRemoveFavorite = (songId: string) => {
    try {
      removeFavorite(songId);
      // Refresh the list
      loadFavorites();
      
      toast({
        title: "Removed from favorites",
        description: "Song has been removed from your favorites",
      });
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

  const handleSongSelect = (song: Song, mode: 'learn' | 'practice') => {
    // Store the selected song in local storage for use in the learning or practice page
    localStorage.setItem('selectedSong', JSON.stringify(song));
    
    // Navigate to the appropriate page
    if (mode === 'learn') {
      navigate('/lyric-learning');
    } else {
      navigate('/practice');
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-1">Your Favorite Songs</h1>
          <p className="text-muted-foreground">
            Songs you've saved for learning and practice
          </p>
        </div>
      </div>

      {favoriteSongs.length === 0 ? (
        <div className="glass-card p-10 text-center">
          <Heart className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-30" />
          <h2 className="text-xl font-medium mb-2">No favorite songs yet</h2>
          <p className="text-muted-foreground mb-6">
            When you find songs you love, save them as favorites to quickly access them for learning.
          </p>
          <button
            onClick={() => navigate("/songs")}
            className="inline-flex items-center justify-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            Browse Songs
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {favoriteSongs.map((song) => (
            <RecommendedSongCard
              key={song.id}
              song={song}
              onFavorite={() => handleRemoveFavorite(song.id)}
              onLearn={() => handleSongSelect(song, 'learn')}
              onPractice={() => handleSongSelect(song, 'practice')}
              showActions
            />
          ))}
        </div>
      )}
    </div>
  );
}
