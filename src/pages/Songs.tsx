
import { RecommendedSongCard } from "@/components/dashboard/RecommendedSongCard";
import { Song } from "@/types";

export default function Songs() {
  // Sample songs data - this would come from your API in a real app
  const songs: Song[] = [
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

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-1">Browse Songs</h1>
          <p className="text-muted-foreground">Discover songs to enhance your language learning</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {songs.map((song) => (
          <RecommendedSongCard key={song.id} song={song} />
        ))}
      </div>
    </div>
  );
}
