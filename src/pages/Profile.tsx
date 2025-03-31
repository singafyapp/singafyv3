
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Flame, Medal, Trophy } from "lucide-react";
import { Achievement } from "@/types";

export default function Profile() {
  // Sample achievements
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
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-1">Your Profile</h1>
        <p className="text-muted-foreground">View and manage your profile details</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1">
          <div className="glass-card p-6">
            <div className="flex flex-col items-center text-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback className="text-xl">JD</AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-bold mb-1">Alex Johnson</h2>
              <p className="text-sm text-muted-foreground mb-4">Joined January 2023</p>
              <Button className="w-full">Edit Profile</Button>
            </div>
            
            <div className="mt-6 pt-6 border-t border-white/10">
              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm">Current Level</span>
                    <span className="text-sm font-bold">Level 4</span>
                  </div>
                  <Progress value={65} className="h-2" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Flame className="h-4 w-4 text-orange-500" />
                    <span className="text-sm">Current Streak</span>
                  </div>
                  <span className="text-sm font-bold">3 days</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Trophy className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm">Total XP</span>
                  </div>
                  <span className="text-sm font-bold">1,250 XP</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-span-1 md:col-span-2">
          <div className="glass-card p-6">
            <h2 className="text-xl font-semibold mb-4">Your Achievements</h2>
            <div className="space-y-4">
              {achievements.map((achievement) => (
                <Card key={achievement.id} className="p-4 bg-spotify-lightgray">
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{achievement.title}</h3>
                        {achievement.completed ? (
                          <Medal className="h-5 w-5 text-yellow-500" />
                        ) : null}
                      </div>
                      <p className="text-sm text-muted-foreground">{achievement.description}</p>
                      {achievement.progress !== undefined && achievement.total && !achievement.completed ? (
                        <div className="mt-2">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-muted-foreground">{achievement.progress}/{achievement.total}</span>
                            <span className="text-xs text-muted-foreground">{Math.round((achievement.progress / achievement.total) * 100)}%</span>
                          </div>
                          <Progress value={(achievement.progress / achievement.total) * 100} className="h-1.5" />
                        </div>
                      ) : null}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
