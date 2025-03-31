
import { LyricLearningCard } from "@/components/learning/LyricLearningCard";
import { RecommendedSongCard } from "@/components/dashboard/RecommendedSongCard";
import { Lyric, Song, WordFocus } from "@/types";
import { MusicIcon } from "lucide-react";

export default function LyricLearning() {
  // Sample data for the current song
  const currentSong: Song = {
    id: "1",
    title: "Despacito",
    artist: "Luis Fonsi ft. Daddy Yankee",
    albumCover: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=300&h=300",
    duration: 228,
    difficulty: "beginner",
    language: { id: "1", name: "Spanish", code: "es", flag: "🇪🇸" },
  };
  
  // Sample lyrics with word focus
  const lyrics: Lyric[] = [
    {
      id: "1",
      songId: "1",
      startTime: 15,
      endTime: 18,
      text: "Sí, sabes que ya llevo un rato mirándote",
      translation: "Yes, you know I've been looking at you for a while",
      wordFocus: [
        {
          id: "1",
          word: "sabes",
          translation: "you know",
          definition: "Second person singular form of 'saber' (to know)",
          examples: ["¿Sabes la respuesta?", "Sabes que te quiero."]
        },
        {
          id: "2",
          word: "mirándote",
          translation: "looking at you",
          definition: "Gerund form of 'mirar' (to look) with the attached pronoun 'te' (you)",
          examples: ["Estoy mirándote.", "Él está mirándote desde lejos."]
        }
      ]
    },
    {
      id: "2",
      songId: "1",
      startTime: 19,
      endTime: 22,
      text: "Tengo que bailar contigo hoy",
      translation: "I have to dance with you today",
      wordFocus: [
        {
          id: "3",
          word: "Tengo",
          translation: "I have",
          definition: "First person singular form of 'tener' (to have)",
          examples: ["Tengo un coche.", "Tengo que ir."]
        },
        {
          id: "4",
          word: "bailar",
          translation: "to dance",
          definition: "Verb meaning to dance or move rhythmically",
          examples: ["Me gusta bailar.", "¿Quieres bailar conmigo?"]
        },
        {
          id: "5",
          word: "contigo",
          translation: "with you",
          definition: "Preposition 'con' (with) combined with the pronoun 'tigo' (you)",
          examples: ["Quiero estar contigo.", "Voy al cine contigo."]
        }
      ]
    },
    {
      id: "3",
      songId: "1",
      startTime: 23,
      endTime: 26,
      text: "Vi que tu mirada ya estaba llamándome",
      translation: "I saw that your look was already calling me",
      wordFocus: [
        {
          id: "6",
          word: "mirada",
          translation: "look/gaze",
          definition: "A noun referring to the act of looking or the expression in someone's eyes",
          examples: ["Su mirada era intensa.", "Una mirada puede decir mucho."]
        },
        {
          id: "7",
          word: "llamándome",
          translation: "calling me",
          definition: "Gerund form of 'llamar' (to call) with the attached pronoun 'me' (me)",
          examples: ["Está llamándome por teléfono.", "Siento que estás llamándome."]
        }
      ]
    },
  ];
  
  // More sample songs
  const recommendedSongs: Song[] = [
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

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-1">Lyric Learning</h1>
          <p className="text-muted-foreground">Learn language by understanding song lyrics</p>
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
            />
          ))}
        </div>
      </div>
    </div>
  );
}
