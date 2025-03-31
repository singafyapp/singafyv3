
import { RecommendedSongCard } from "@/components/dashboard/RecommendedSongCard";
import { useState, useEffect } from "react";
import { Song } from "@/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Disc3, Loader2 } from "lucide-react";
import spotifyService from "@/services/spotify";
import { useSpotify } from "@/hooks/useSpotify";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { saveFavorite, getFavorites } from "@/services/favorites";

interface SpotifyTrack {
  id: string;
  name: string;
  artists: { name: string }[];
  album: {
    name: string;
    images: { url: string }[];
  };
  duration_ms: number;
}

interface SpotifySearchResult {
  tracks?: {
    items: SpotifyTrack[];
  };
}

// Helper function to map language code to language object
function getLanguageForTrack(artistName: string): { id: string; name: string; code: string; flag: string } {
  // This is a simplified mapping - in a real app, you might want to use a more sophisticated approach
  const artistNameLower = artistName.toLowerCase();
  
  if (artistNameLower.includes('luis') || artistNameLower.includes('fonsi') || 
      artistNameLower.includes('shakira') || artistNameLower.includes('iglesias')) {
    return { id: "1", name: "Spanish", code: "es", flag: "🇪🇸" };
  } else if (artistNameLower.includes('edith') || artistNameLower.includes('piaf') || 
             artistNameLower.includes('stromae')) {
    return { id: "2", name: "French", code: "fr", flag: "🇫🇷" };
  } else if (artistNameLower.includes('rammstein') || artistNameLower.includes('nena')) {
    return { id: "3", name: "German", code: "de", flag: "🇩🇪" };
  } else if (artistNameLower.includes('bocelli') || artistNameLower.includes('pausini')) {
    return { id: "4", name: "Italian", code: "it", flag: "🇮🇹" };
  } else if (artistNameLower.includes('bts') || artistNameLower.includes('psy')) {
    return { id: "5", name: "Korean", code: "ko", flag: "🇰🇷" };
  } else if (artistNameLower.includes('utada') || artistNameLower.includes('babymetal')) {
    return { id: "6", name: "Japanese", code: "ja", flag: "🇯🇵" };
  } else if (artistNameLower.includes('amália') || artistNameLower.includes('carvalho')) {
    return { id: "7", name: "Portuguese", code: "pt", flag: "🇵🇹" };
  } else if (artistNameLower.includes('tsoi') || artistNameLower.includes('kino')) {
    return { id: "8", name: "Russian", code: "ru", flag: "🇷🇺" };
  } else {
    return { id: "0", name: "Unknown", code: "un", flag: "🌐" };
  }
}

// Helper function to determine song difficulty
function getDifficultyForTrack(track: SpotifyTrack): "beginner" | "intermediate" | "advanced" {
  // A simple algorithm to determine difficulty based on song length
  const duration = track.duration_ms / 1000;
  
  if (duration < 180) { // Less than 3 minutes
    return "beginner";
  } else if (duration < 240) { // Between 3-4 minutes
    return "intermediate";
  } else { // More than 4 minutes
    return "advanced";
  }
}

export default function Songs() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<Song[]>([]);
  const [recommendedSongs, setRecommendedSongs] = useState<Song[]>([]);
  const { isConnected, isLoading } = useSpotify();
  const navigate = useNavigate();

  // Load initial recommended songs
  useEffect(() => {
    // Sample songs data with expanded language options
    const sampleSongs: Song[] = [
      {
        id: "1",
        title: "Despacito",
        artist: "Luis Fonsi ft. Daddy Yankee",
        albumCover: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=300&h=300",
        duration: 228,
        difficulty: "beginner",
        language: { id: "1", name: "Spanish", code: "es", flag: "🇪🇸" },
      },
      {
        id: "2",
        title: "La Vie En Rose",
        artist: "Edith Piaf",
        albumCover: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=300&h=300",
        duration: 197,
        difficulty: "intermediate",
        language: { id: "2", name: "French", code: "fr", flag: "🇫🇷" },
      },
      {
        id: "3",
        title: "99 Luftballons",
        artist: "Nena",
        albumCover: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=300&h=300",
        duration: 232,
        difficulty: "advanced",
        language: { id: "3", name: "German", code: "de", flag: "🇩🇪" },
      },
      {
        id: "4",
        title: "Volare",
        artist: "Domenico Modugno",
        albumCover: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=300&h=300",
        duration: 195,
        difficulty: "intermediate",
        language: { id: "4", name: "Italian", code: "it", flag: "🇮🇹" },
      },
      {
        id: "5",
        title: "Gangnam Style",
        artist: "PSY",
        albumCover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=300&h=300",
        duration: 219,
        difficulty: "beginner",
        language: { id: "5", name: "Korean", code: "ko", flag: "🇰🇷" },
      },
      {
        id: "6",
        title: "Sukiyaki",
        artist: "Kyu Sakamoto",
        albumCover: "https://images.unsplash.com/photo-1593698054589-8c14bb66d2fd?auto=format&fit=crop&w=300&h=300",
        duration: 192,
        difficulty: "intermediate",
        language: { id: "6", name: "Japanese", code: "ja", flag: "🇯🇵" },
      },
      {
        id: "7",
        title: "Ai Se Eu Te Pego",
        artist: "Michel Teló",
        albumCover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=300&h=300",
        duration: 184,
        difficulty: "beginner",
        language: { id: "7", name: "Portuguese", code: "pt", flag: "🇵🇹" },
      },
      {
        id: "8",
        title: "Группа крови",
        artist: "Кино",
        albumCover: "https://images.unsplash.com/photo-1593698054589-8c14bb66d2fd?auto=format&fit=crop&w=300&h=300",
        duration: 251,
        difficulty: "advanced",
        language: { id: "8", name: "Russian", code: "ru", flag: "🇷🇺" },
      },
    ];
    
    setRecommendedSongs(sampleSongs);
  }, []);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    
    try {
      const result = await spotifyService.searchTracks(searchQuery) as SpotifySearchResult;
      
      if (result && result.tracks && result.tracks.items) {
        const songs: Song[] = result.tracks.items.map((track: SpotifyTrack) => {
          const language = getLanguageForTrack(track.artists[0]?.name || "");
          const difficulty = getDifficultyForTrack(track);
          
          return {
            id: track.id,
            title: track.name,
            artist: track.artists.map(artist => artist.name).join(", "),
            albumCover: track.album.images[0]?.url || "",
            duration: Math.floor(track.duration_ms / 1000),
            difficulty: difficulty,
            language: language,
            spotifyId: track.id
          };
        });
        
        setSearchResults(songs);
      }
    } catch (error) {
      console.error("Search error:", error);
      toast({
        title: "Search failed",
        description: "Failed to search Spotify. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSearching(false);
    }
  };

  const handleAddToFavorites = async (song: Song) => {
    try {
      await saveFavorite(song);
      toast({
        title: "Added to favorites",
        description: `${song.title} has been added to your favorites`,
      });
    } catch (error) {
      toast({
        title: "Failed to add to favorites",
        description: "Please try again later",
        variant: "destructive"
      });
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
          <h1 className="text-2xl font-bold mb-1">Browse Songs</h1>
          <p className="text-muted-foreground">Discover songs to enhance your language learning</p>
        </div>
      </div>
      
      {/* Search Bar */}
      <div className="glass-card p-6 space-y-4">
        <div className="relative">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search for songs, artists or albums..."
                className="pl-9 bg-spotify-lightgray border-none focus-visible:ring-1 focus-visible:ring-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <Button onClick={handleSearch} disabled={isSearching || isLoading}>
              {isSearching ? <Loader2 className="h-4 w-4 animate-spin" /> : "Search"}
            </Button>
          </div>
          
          {isLoading && (
            <p className="mt-2 text-sm text-muted-foreground flex items-center">
              <Disc3 className="h-4 w-4 mr-1 animate-spin" /> Connecting to Spotify API...
            </p>
          )}
        </div>
        
        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="space-y-2">
            <h2 className="text-lg font-medium">Search Results</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {searchResults.map((song) => (
                <RecommendedSongCard 
                  key={song.id} 
                  song={song} 
                  onFavorite={() => handleAddToFavorites(song)}
                  onLearn={() => handleSongSelect(song, 'learn')}
                  onPractice={() => handleSongSelect(song, 'practice')}
                  showActions
                />
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Recommended Songs */}
      <div className="space-y-2">
        <h2 className="text-lg font-medium">Recommended Songs</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {recommendedSongs.map((song) => (
            <RecommendedSongCard 
              key={song.id} 
              song={song} 
              onFavorite={() => handleAddToFavorites(song)}
              onLearn={() => handleSongSelect(song, 'learn')}
              onPractice={() => handleSongSelect(song, 'practice')}
              showActions
            />
          ))}
        </div>
      </div>
    </div>
  );
}
