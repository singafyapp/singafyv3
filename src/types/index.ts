
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
