import { useState, useEffect } from "react";
import { LyricLearningCard } from "@/components/learning/LyricLearningCard";
import { RecommendedSongCard } from "@/components/dashboard/RecommendedSongCard";
import { Lyric, Song, Language, availableLanguages } from "@/types";
import { MusicIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { getFavorites } from "@/services/favorites";
import { generateLyrics } from "@/services/lyricService";
import { LanguageSelector } from "@/components/learning/LanguageSelector";
import useSpotify from "@/hooks/useSpotify";

const RELIABLE_AUDIO_URLS = {
  soundHelix: [
    "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
  ]
};

export default function LyricLearning() {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [recommendedSongs, setRecommendedSongs] = useState<Song[]>([]);
  const [lyrics, setLyrics] = useState<Lyric[]>([]);
  const [targetLanguage, setTargetLanguage] = useState<Language | null>(null);
  const { isConnected: spotifyConnected } = useSpotify();
  
  useEffect(() => {
    // Load selected song from local storage
    const savedSong = localStorage.getItem('selectedSong');
    if (savedSong) {
      try {
        const song: Song = JSON.parse(savedSong);
        
        // Set a reliable audio URL that we know works
        song.audioUrl = RELIABLE_AUDIO_URLS.soundHelix[0];
        console.log("Using reliable audio URL:", song.audioUrl);
        
        setCurrentSong(song);
        setTargetLanguage(song.language); // Set initial target language to song's language
        
        // Generate lyrics for this song
        const songLyrics = generateLyrics(song, song.language);
        setLyrics(songLyrics);
        console.log(`Generated ${songLyrics.length} lyrics for "${song.title}"`);
      } catch (error) {
        console.error("Error parsing saved song:", error);
        
        // If there's an error, use a default song for demo
        loadDefaultSong();
      }
    } else {
      // If no song is selected, use a default one for demo
      loadDefaultSong();
    }
    
    // Load recommended songs from favorites
    const favorites = getFavorites();
    if (favorites.length > 0) {
      // Ensure all favorite songs have reliable audio URLs
      const favoritesWithAudio = favorites.slice(0, 4).map((song, index) => {
        return {
          ...song,
          audioUrl: RELIABLE_AUDIO_URLS.soundHelix[index % RELIABLE_AUDIO_URLS.soundHelix.length]
        };
      });
      setRecommendedSongs(favoritesWithAudio);
    } else {
      // Sample songs if no favorites
      loadSampleSongs();
    }
  }, [spotifyConnected]);

  // Update lyrics when target language changes
  useEffect(() => {
    if (currentSong && targetLanguage) {
      const translatedLyrics = generateLyrics(currentSong, targetLanguage);
      setLyrics(translatedLyrics);
      
      // Only show toast if the language is different from the song's original language
      if (targetLanguage.id !== currentSong.language.id) {
        toast({
          title: "Language Changed",
          description: `Lyrics now translated to ${targetLanguage.name} ${targetLanguage.flag}`,
        });
      }
    }
  }, [targetLanguage, currentSong]);

  const loadDefaultSong = () => {
    const defaultSong: Song = {
      id: "1",
      title: "Despacito",
      artist: "Luis Fonsi ft. Daddy Yankee",
      albumCover: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=300&h=300",
      duration: 228,
      difficulty: "beginner",
      language: { id: "1", name: "Spanish", code: "es", flag: "🇪🇸" },
      audioUrl: RELIABLE_AUDIO_URLS.soundHelix[0]
    };
    setCurrentSong(defaultSong);
    setTargetLanguage(defaultSong.language);
    
    // Generate lyrics for default song
    const defaultLyrics = generateLyrics(defaultSong, defaultSong.language);
    setLyrics(defaultLyrics);
    
    // Save to localStorage
    localStorage.setItem('selectedSong', JSON.stringify(defaultSong));
  };

  const loadSampleSongs = () => {
    const sampleSongs: Song[] = [
      {
        id: "2",
        title: "La Vie En Rose",
        artist: "Edith Piaf",
        albumCover: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=300&h=300",
        duration: 197,
        difficulty: "intermediate",
        language: { id: "2", name: "French", code: "fr", flag: "🇫🇷" },
        audioUrl: RELIABLE_AUDIO_URLS.soundHelix[0]
      },
      {
        id: "3",
        title: "99 Luftballons",
        artist: "Nena",
        albumCover: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=300&h=300",
        duration: 232,
        difficulty: "advanced",
        language: { id: "3", name: "German", code: "de", flag: "🇩🇪" },
        audioUrl: RELIABLE_AUDIO_URLS.soundHelix[1]
      },
      {
        id: "4",
        title: "Volare",
        artist: "Domenico Modugno",
        albumCover: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=300&h=300",
        duration: 195,
        difficulty: "intermediate",
        language: { id: "4", name: "Italian", code: "it", flag: "🇮🇹" },
        audioUrl: RELIABLE_AUDIO_URLS.soundHelix[2]
      }
    ];
    setRecommendedSongs(sampleSongs);
  };

  const handleLanguageChange = (languageId: string) => {
    const newLanguage = availableLanguages.find(lang => lang.id === languageId);
    if (newLanguage) {
      setTargetLanguage(newLanguage);
    }
  };

  const handleSelectSong = (song: Song) => {
    // Always ensure the song has a reliable audio URL
    song.audioUrl = RELIABLE_AUDIO_URLS.soundHelix[Math.floor(Math.random() * RELIABLE_AUDIO_URLS.soundHelix.length)];
    console.log("Selected song with audio URL:", song.audioUrl);
    
    setCurrentSong(song);
    setTargetLanguage(song.language);
    
    // Generate lyrics for this song
    const songLyrics = generateLyrics(song, song.language);
    setLyrics(songLyrics);
    console.log(`Generated ${songLyrics.length} lyrics for "${song.title}"`);
    
    localStorage.setItem('selectedSong', JSON.stringify(song));
    
    toast({
      title: "Song Selected",
      description: `Now learning "${song.title}" by ${song.artist} in ${song.language.name}`,
    });
  };

  if (!currentSong) {
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-1">Lyric Learning</h1>
            <p className="text-muted-foreground">No song selected for learning</p>
          </div>
        </div>
        
        <div className="glass-card p-6 text-center">
          <MusicIcon className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-30" />
          <h2 className="text-xl font-medium mb-2">Select a song to start learning</h2>
          <p className="text-muted-foreground mb-6">
            Browse songs or go to your favorites to select a song for lyric learning.
          </p>
          <div className="flex justify-center gap-4">
            <Button onClick={() => window.location.href = "/songs"}>
              Browse Songs
            </Button>
            <Button variant="outline" onClick={() => window.location.href = "/favorites"}>
              My Favorites
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-1">Lyric Learning</h1>
          <p className="text-muted-foreground">Learn {currentSong?.language.name} through song lyrics</p>
        </div>
        
        {/* Language selector */}
        {targetLanguage && (
          <LanguageSelector 
            currentLanguage={targetLanguage} 
            onLanguageChange={handleLanguageChange} 
          />
        )}
      </div>
      
      {/* Current Learning */}
      <div>
        <LyricLearningCard 
          song={currentSong} 
          lyrics={lyrics} 
          targetLanguage={targetLanguage || currentSong.language}
        />
      </div>
      
      {/* More Songs For Learning */}
      <div>
        <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
          <MusicIcon className="h-5 w-5 text-primary" /> More Songs for Learning
        </h2>
        
        <div className="space-y-2">
          {recommendedSongs.map((song) => (
            <RecommendedSongCard 
              key={song.id} 
              song={song} 
              layout="horizontal" 
              onLearn={() => handleSelectSong(song)}
              showActions={true}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
