
import { Module } from "@/types";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";

interface ContinueLearningCardProps {
  module: Module;
}

export function ContinueLearningCard({ module }: ContinueLearningCardProps) {
  return (
    <Link to={module.path} className="block">
      <div className="glass-card rounded-lg p-5 hover:bg-white/5 transition-colors">
        <div className="flex items-center gap-3 mb-3">
          <div className="bg-white/10 text-primary rounded-full w-10 h-10 flex items-center justify-center text-lg font-medium">
            {module.icon}
          </div>
          <div>
            <h3 className="font-medium">{module.title}</h3>
            <p className="text-xs text-muted-foreground">{module.description}</p>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between text-xs mb-1.5">
            <span className="text-muted-foreground">Progress</span>
            <span>{module.progress}%</span>
          </div>
          <Progress value={module.progress} className="h-1.5" />
        </div>
      </div>
    </Link>
  );
}
