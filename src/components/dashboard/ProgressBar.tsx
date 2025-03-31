
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { LucideIcon, Flame } from "lucide-react";

interface ProgressBarProps {
  value: number;
  max: number;
  label: string;
  icon?: LucideIcon;
  highlightColor?: string;
  size?: "sm" | "md" | "lg";
}

export function ProgressBar({
  value,
  max,
  label,
  icon: Icon,
  highlightColor = "bg-primary",
  size = "md",
}) {
  const percentage = Math.round((value / max) * 100);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
          <span className="text-sm font-medium">{label}</span>
        </div>
        <Badge
          className={cn(
            "bg-white/5 hover:bg-white/10 text-foreground",
            highlightColor === "bg-primary" && "text-primary"
          )}
        >
          {value}/{max}
        </Badge>
      </div>
      <Progress
        value={percentage}
        className={cn(
          "h-2 bg-white/5",
          size === "sm" && "h-1",
          size === "lg" && "h-3"
        )}
      />
    </div>
  );
}

export function DailyStreakProgress({ days, currentStreak = 0 }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Flame className="h-5 w-5 text-orange-500" />
          <span className="font-medium">{currentStreak} Day Streak</span>
        </div>
        <Badge variant="outline" className="bg-white/5">
          {currentStreak} days
        </Badge>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => (
          <div
            key={index}
            className={cn(
              "flex flex-col items-center gap-1",
            )}
          >
            <div
              className={cn(
                "h-8 w-8 rounded-full flex items-center justify-center text-xs",
                day.completed ? "bg-primary text-primary-foreground" : "bg-white/5 text-muted-foreground",
                day.isToday && !day.completed && "ring-2 ring-primary/50",
                day.isToday && day.completed && "ring-2 ring-white/20"
              )}
            >
              {day.initial}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
