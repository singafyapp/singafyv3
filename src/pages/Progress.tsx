
import { BarChart3 } from "lucide-react";

export default function Progress() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-1">Your Progress</h1>
          <p className="text-muted-foreground">Track your language learning journey</p>
        </div>
      </div>
      
      <div className="glass-card p-6">
        <div className="flex items-center justify-center flex-col gap-4 py-12">
          <BarChart3 className="h-16 w-16 text-muted-foreground" />
          <p className="text-lg text-muted-foreground">
            Progress tracking coming soon...
          </p>
        </div>
      </div>
    </div>
  );
}
