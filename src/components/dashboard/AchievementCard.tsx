
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Achievement } from "@/types";

interface AchievementCardProps {
  achievement: Achievement;
}

export function AchievementCard({ achievement }: AchievementCardProps) {
  return (
    <Card className="bg-spotify-darkgray border-white/5 hover-scale">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary">
            <span className="text-xl" dangerouslySetInnerHTML={{ __html: achievement.icon }} />
          </div>
          {achievement.completed && (
            <Badge className="bg-primary text-primary-foreground">Earned</Badge>
          )}
        </div>
        <CardTitle className="text-sm font-medium mt-2">{achievement.title}</CardTitle>
        <CardDescription className="text-xs text-muted-foreground">
          {achievement.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {(achievement.progress !== undefined && achievement.total !== undefined) && (
          <div className="space-y-1">
            <Progress value={(achievement.progress / achievement.total) * 100} className="h-1" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{achievement.progress} / {achievement.total}</span>
              <span>{Math.round((achievement.progress / achievement.total) * 100)}%</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
