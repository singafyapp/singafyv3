
import { useState, useEffect } from "react";
import { LyricLearningCard } from "@/components/learning/LyricLearningCard";
import { RecommendedSongCard } from "@/components/dashboard/RecommendedSongCard";
import { Lyric, Song, WordFocus } from "@/types";
import { MusicIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { getFavorites } from "@/services/favorites";

export default function LyricLearning() {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [recommendedSongs, setRecommendedSongs] = useState<Song[]>([]);
  const [lyrics, setLyrics] = useState<Lyric[]>([]);
  
  useEffect(() => {
    // Load selected song from local storage
    const savedSong = localStorage.getItem('selectedSong');
    if (savedSong) {
      const song: Song = JSON.parse(savedSong);
      setCurrentSong(song);
      
      // Generate lyrics for this song
      generateLyrics(song);
    } else {
      // If no song is selected, use a default one for demo
      const defaultSong: Song = {
        id: "1",
        title: "Despacito",
        artist: "Luis Fonsi ft. Daddy Yankee",
        albumCover: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=300&h=300",
        duration: 228,
        difficulty: "beginner",
        language: { id: "1", name: "Spanish", code: "es", flag: "🇪🇸" },
      };
      setCurrentSong(defaultSong);
      generateLyrics(defaultSong);
    }
    
    // Load recommended songs from favorites
    const favorites = getFavorites();
    if (favorites.length > 0) {
      setRecommendedSongs(favorites.slice(0, 4)); // Take first 4 favorites as recommendations
    } else {
      // Sample songs if no favorites
      const sampleSongs: Song[] = [
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
        }
      ];
      setRecommendedSongs(sampleSongs);
    }
  }, []);

  const generateLyrics = (song: Song) => {
    // In a real app, these lyrics would come from an API
    // Here we'll generate some mock lyrics based on the song
    const sampleLyrics: Lyric[] = [
      {
        id: "1",
        songId: song.id,
        startTime: 15,
        endTime: 18,
        text: song.language.code === "es" ? "Sí, sabes que ya llevo un rato mirándote" : 
              song.language.code === "fr" ? "Oui, tu sais que je te regarde depuis un moment" :
              song.language.code === "de" ? "Ja, du weißt, ich schaue dich schon eine Weile an" :
              "Yes, you know I've been looking at you for a while",
        translation: "Yes, you know I've been looking at you for a while",
        wordFocus: [
          {
            id: "1",
            word: song.language.code === "es" ? "sabes" : 
                  song.language.code === "fr" ? "sais" :
                  song.language.code === "de" ? "weißt" : "know",
            translation: "you know",
            definition: "To have information in your mind",
            examples: ["¿Sabes la respuesta?", "Sabes que te quiero."]
          },
          {
            id: "2",
            word: song.language.code === "es" ? "mirándote" : 
                  song.language.code === "fr" ? "regarde" :
                  song.language.code === "de" ? "schaue" : "looking",
            translation: "looking at you",
            definition: "To direct your eyes in order to see",
            examples: ["Estoy mirándote.", "Él está mirándote desde lejos."]
          }
        ]
      },
      {
        id: "2",
        songId: song.id,
        startTime: 19,
        endTime: 22,
        text: song.language.code === "es" ? "Tengo que bailar contigo hoy" : 
              song.language.code === "fr" ? "Je dois danser avec toi aujourd'hui" :
              song.language.code === "de" ? "Ich muss heute mit dir tanzen" :
              "I have to dance with you today",
        translation: "I have to dance with you today",
        wordFocus: [
          {
            id: "3",
            word: song.language.code === "es" ? "Tengo" : 
                  song.language.code === "fr" ? "dois" :
                  song.language.code === "de" ? "muss" : "have",
            translation: "I have",
            definition: "To possess, own, or hold",
            examples: ["Tengo un coche.", "Tengo que ir."]
          },
          {
            id: "4",
            word: song.language.code === "es" ? "bailar" : 
                  song.language.code === "fr" ? "danser" :
                  song.language.code === "de" ? "tanzen" : "dance",
            translation: "to dance",
            definition: "To move rhythmically to music",
            examples: ["Me gusta bailar.", "¿Quieres bailar conmigo?"]
          }
        ]
      },
      {
        id: "3",
        songId: song.id,
        startTime: 23,
        endTime: 26,
        text: song.language.code === "es" ? "Vi que tu mirada ya estaba llamándome" : 
              song.language.code === "fr" ? "J'ai vu que ton regard m'appelait déjà" :
              song.language.code === "de" ? "Ich sah, dass dein Blick mich schon rief" :
              "I saw that your look was already calling me",
        translation: "I saw that your look was already calling me",
        wordFocus: [
          {
            id: "6",
            word: song.language.code === "es" ? "mirada" : 
                  song.language.code === "fr" ? "regard" :
                  song.language.code === "de" ? "Blick" : "look",
            translation: "look/gaze",
            definition: "A particular expression in someone's eyes",
            examples: ["Su mirada era intensa.", "Una mirada puede decir mucho."]
          },
          {
            id: "7",
            word: song.language.code === "es" ? "llamándome" : 
                  song.language.code === "fr" ? "m'appelait" :
                  song.language.code === "de" ? "rief" : "calling",
            translation: "calling me",
            definition: "To cry out to someone",
            examples: ["Está llamándome por teléfono.", "Siento que estás llamándome."]
          }
        ]
      },
    ];
    
    setLyrics(sampleLyrics);
  };

  const handleSelectSong = (song: Song) => {
    setCurrentSong(song);
    generateLyrics(song);
    localStorage.setItem('selectedSong', JSON.stringify(song));
    
    toast({
      title: "Song Selected",
      description: `Now learning "${song.title}" by ${song.artist}`,
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
          <p className="text-muted-foreground">Learn {currentSong.language.name} through song lyrics</p>
        </div>
      </div>
      
      {/* Current Learning */}
      <div>
        <LyricLearningCard song={currentSong} lyrics={lyrics} />
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
            />
          ))}
        </div>
      </div>
    </div>
  );
}
