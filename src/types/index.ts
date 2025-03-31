
// Common Types
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  currentLanguage?: Language;
  streak?: number;
  xp?: number;
  level?: number;
}

export interface Language {
  id: string;
  name: string;
  code: string;
  flag: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  completed: boolean;
  progress?: number;
  total?: number;
}

export interface Song {
  id: string;
  title: string;
  artist: string;
  albumCover: string;
  duration: number;
  language: Language;
  difficulty: "beginner" | "intermediate" | "advanced";
  audioUrl?: string;
  spotifyId?: string;
  lyrics?: Lyric[];
}

export interface Lyric {
  id: string;
  songId: string;
  startTime: number;
  endTime: number;
  text: string;
  translation?: string;
  wordFocus?: WordFocus[];
}

export interface WordFocus {
  id: string;
  word: string;
  translation: string;
  definition: string;
  examples: string[];
}

export interface Progress {
  userId: string;
  lessonType: string;
  lessonId: string;
  completed: boolean;
  percentage: number;
  lastAccessed: Date;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  icon: string;
  path: string;
  progress?: number;
}

export interface LanguageOption {
  id: string;
  name: string;
  code: string;
  flag: string;
}

// Define all available languages in the app
export const availableLanguages: LanguageOption[] = [
  { id: "1", name: "Spanish", code: "es", flag: "🇪🇸" },
  { id: "2", name: "French", code: "fr", flag: "🇫🇷" },
  { id: "3", name: "German", code: "de", flag: "🇩🇪" },
  { id: "4", name: "Italian", code: "it", flag: "🇮🇹" },
  { id: "5", name: "Korean", code: "ko", flag: "🇰🇷" },
  { id: "6", name: "Japanese", code: "ja", flag: "🇯🇵" },
  { id: "7", name: "Portuguese", code: "pt", flag: "🇵🇹" },
  { id: "8", name: "Russian", code: "ru", flag: "🇷🇺" },
  { id: "9", name: "Chinese (Mandarin)", code: "zh", flag: "🇨🇳" },
  { id: "10", name: "Arabic", code: "ar", flag: "🇦🇪" },
  { id: "11", name: "Dutch", code: "nl", flag: "🇳🇱" },
  { id: "12", name: "Swedish", code: "sv", flag: "🇸🇪" }
];
