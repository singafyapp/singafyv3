
import { AchievementCard } from "@/components/dashboard/AchievementCard";
import { ContinueLearningCard } from "@/components/dashboard/ContinueLearningCard";
import { DailyStreakProgress, ProgressBar } from "@/components/dashboard/ProgressBar";
import { RecommendedSongCard } from "@/components/dashboard/RecommendedSongCard";
import { Achievement, Module, Song } from "@/types";
import { Flame, Trophy } from "lucide-react";
import { useState } from "react";

export default function Dashboard() {
  // Sample data
  const achievements: Achievement[] = [
    {
      id: "1",
      title: "First Song Completed",
      description: "Complete your first song learning session",
      icon: "🎵",
      completed: true,
    },
    {
      id: "2",
      title: "Vocabulary Builder",
      description: "Learn 50 new words",
      icon: "📚",
      completed: false,
      progress: 32,
      total: 50,
    },
    {
      id: "3",
      title: "3-Day Streak",
      description: "Learn for 3 consecutive days",
      icon: "🔥",
      completed: true,
      progress: 3,
      total: 3,
    },
    {
      id: "4",
      title: "Music Explorer",
      description: "Listen to 10 different songs",
      icon: "🎧",
      completed: false,
      progress: 6,
      total: 10,
    },
  ];

  const modules: Module[] = [
    {
      id: "1",
      title: "Lyric Learning",
      description: "Learn language through music lyrics",
      icon: "🎵",
      path: "/lyric-learning",
      progress: 45,
    },
    {
      id: "2",
      title: "Practice Exercises",
      description: "Test your knowledge with exercises",
      icon: "📝",
      path: "/practice",
      progress: 30,
    },
    {
      id: "3",
      title: "Word Focus",
      description: "Build your vocabulary",
      icon: "📚",
      path: "/word-focus",
      progress: 20,
    },
  ];

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
    }
  ];

  const streakDays = [
    { initial: 'M', completed: true },
    { initial: 'T', completed: true },
    { initial: 'W', completed: true },
    { initial: 'T', completed: false, isToday: true },
    { initial: 'F', completed: false },
    { initial: 'S', completed: false },
    { initial: 'S', completed: false },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-1">Welcome back, Alex!</h1>
        <p className="text-muted-foreground">Continue your language learning journey through music.</p>
      </div>

      {/* Stats and Streak */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card rounded-lg p-4 space-y-4">
          <h2 className="text-lg font-medium mb-3">Daily Progress</h2>
          <DailyStreakProgress days={streakDays} currentStreak={3} />
          <div className="pt-2">
            <ProgressBar
              value={45}
              max={100}
              label="Daily XP Goal"
              icon={Trophy}
              highlightColor="bg-primary"
            />
          </div>
        </div>
        
        <div className="glass-card rounded-lg p-4 space-y-4">
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-lg font-medium">Achievements</h2>
            <span className="text-sm text-muted-foreground">3 of 12 earned</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {achievements.slice(0, 4).map((achievement) => (
              <AchievementCard key={achievement.id} achievement={achievement} />
            ))}
          </div>
        </div>
      </div>

      {/* Continue Learning */}
      <div>
        <h2 className="text-lg font-medium mb-4">Continue Learning</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {modules.map((module) => (
            <ContinueLearningCard key={module.id} module={module} />
          ))}
        </div>
      </div>
      
      {/* Recommended Songs */}
      <div>
        <h2 className="text-lg font-medium mb-4">Recommended Songs</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {songs.map((song) => (
            <RecommendedSongCard key={song.id} song={song} />
          ))}
        </div>
      </div>
    </div>
  );
}
