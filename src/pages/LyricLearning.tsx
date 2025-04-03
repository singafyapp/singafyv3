
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

export default function LyricLearning() {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [recommendedSongs, setRecommendedSongs] = useState<Song[]>([]);
  const [lyrics, setLyrics] = useState<Lyric[]>([]);
  const [targetLanguage, setTargetLanguage] = useState<Language | null>(null);
  
  useEffect(() => {
    // Load selected song from local storage
    const savedSong = localStorage.getItem('selectedSong');
    if (savedSong) {
      try {
        const song: Song = JSON.parse(savedSong);
        
        // Ensure song has a valid audio URL
        if (!song.audioUrl || song.audioUrl.trim() === '') {
          song.audioUrl = "https://p.scdn.co/mp3-preview/8ed90a239874906f1bbcf13dd0ef5037dfa3d1ef";
          console.log("Setting fallback audio URL for current song:", song.audioUrl);
        }
        
        setCurrentSong(song);
        setTargetLanguage(song.language); // Set initial target language to song's language
        
        // Generate lyrics for this song - store in variable first to prevent TS error
        const songLyrics = generateLyrics(song, targetLanguage);
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
      // Ensure all favorite songs have audio URLs
      const favoritesWithAudio = favorites.slice(0, 4).map(song => {
        if (!song.audioUrl || song.audioUrl.trim() === '') {
          return {
            ...song,
            audioUrl: "https://p.scdn.co/mp3-preview/8ed90a239874906f1bbcf13dd0ef5037dfa3d1ef"
          };
        }
        return song;
      });
      setRecommendedSongs(favoritesWithAudio);
    } else {
      // Sample songs if no favorites
      loadSampleSongs();
    }
  }, []);

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
      audioUrl: "https://p.scdn.co/mp3-preview/8ed90a239874906f1bbcf13dd0ef5037dfa3d1ef"
    };
    setCurrentSong(defaultSong);
    setTargetLanguage(defaultSong.language);
    
    // Generate lyrics for default song
    const defaultLyrics = generateLyrics(defaultSong, defaultSong.language);
    setLyrics(defaultLyrics);
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
        audioUrl: "https://p.scdn.co/mp3-preview/f7a1b8a270f310e43ced534327b198dabbf0a3bd"
      },
      {
        id: "3",
        title: "99 Luftballons",
        artist: "Nena",
        albumCover: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=300&h=300",
        duration: 232,
        difficulty: "advanced",
        language: { id: "3", name: "German", code: "de", flag: "🇩🇪" },
        audioUrl: "https://p.scdn.co/mp3-preview/3eb16018c3908c33a95edce8f79a8113ddae824e"
      },
      {
        id: "4",
        title: "Volare",
        artist: "Domenico Modugno",
        albumCover: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=300&h=300",
        duration: 195,
        difficulty: "intermediate",
        language: { id: "4", name: "Italian", code: "it", flag: "🇮🇹" },
        audioUrl: "https://p.scdn.co/mp3-preview/8ed90a239874906f1bbcf13dd0ef5037dfa3d1ef"
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
    // Ensure the song has an audio URL for demo purposes
    if (!song.audioUrl || song.audioUrl.trim() === '') {
      const sampleUrls = [
        "https://p.scdn.co/mp3-preview/8ed90a239874906f1bbcf13dd0ef5037dfa3d1ef",
        "https://p.scdn.co/mp3-preview/f7a1b8a270f310e43ced534327b198dabbf0a3bd",
        "https://p.scdn.co/mp3-preview/3eb16018c3908c33a95edce8f79a8113ddae824e"
      ];
      song.audioUrl = sampleUrls[Math.floor(Math.random() * sampleUrls.length)];
      console.log("Added audio URL to song:", song.title, song.audioUrl);
    }
    
    setCurrentSong(song);
    setTargetLanguage(song.language);
    
    // Generate lyrics for this song - store in variable first to prevent TS error
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
        
        {/* Add language selector */}
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
