
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

export default function Songs() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<Song[]>([]);
  const [recommendedSongs, setRecommendedSongs] = useState<Song[]>([]);
  const { isAuthenticated, connect } = useSpotify();
  const navigate = useNavigate();

  // Load initial recommended songs
  useEffect(() => {
    // Sample songs data
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
        title: "Macarena",
        artist: "Los del Río",
        albumCover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=300&h=300",
        duration: 226,
        difficulty: "beginner",
        language: { id: "1", name: "Spanish", code: "es", flag: "🇪🇸" },
      },
      {
        id: "6",
        title: "Gasolina",
        artist: "Daddy Yankee",
        albumCover: "https://images.unsplash.com/photo-1593698054589-8c14bb66d2fd?auto=format&fit=crop&w=300&h=300",
        duration: 192,
        difficulty: "intermediate",
        language: { id: "1", name: "Spanish", code: "es", flag: "🇪🇸" },
      },
    ];
    
    setRecommendedSongs(sampleSongs);
  }, []);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    if (!isAuthenticated) {
      toast({
        title: "Connect to Spotify",
        description: "You need to connect to your Spotify account to search for songs",
        action: (
          <Button size="sm" onClick={connect}>
            Connect
          </Button>
        )
      });
      return;
    }
    
    setIsSearching(true);
    
    try {
      const result = await spotifyService.searchTracks(searchQuery);
      
      if (result.tracks?.items) {
        const songs: Song[] = result.tracks.items.map((track: SpotifyTrack) => ({
          id: track.id,
          title: track.name,
          artist: track.artists.map(artist => artist.name).join(", "),
          albumCover: track.album.images[0]?.url || "",
          duration: Math.floor(track.duration_ms / 1000),
          difficulty: "intermediate", // Default difficulty
          language: { id: "1", name: "Unknown", code: "un", flag: "🌐" }, // Default language
          spotifyId: track.id
        }));
        
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
            <Button onClick={handleSearch} disabled={isSearching}>
              {isSearching ? <Loader2 className="h-4 w-4 animate-spin" /> : "Search"}
            </Button>
          </div>
          
          {!isAuthenticated && (
            <p className="mt-2 text-sm text-muted-foreground flex items-center">
              <Disc3 className="h-4 w-4 mr-1" /> Connect your Spotify account to search for songs
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
