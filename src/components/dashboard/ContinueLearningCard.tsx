
import { Module } from "@/types";
import { Progress } from "@/components/ui/progress";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface ContinueLearningCardProps {
  module: Module;
}

export function ContinueLearningCard({ module }: ContinueLearningCardProps) {
  return (
    <Link
      to={module.path}
      className="glass-card rounded-lg p-4 flex flex-col hover:bg-white/5 transition-colors"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <span className="text-2xl mr-3">{module.icon}</span>
          <div>
            <h3 className="font-medium">{module.title}</h3>
            <p className="text-xs text-muted-foreground">{module.description}</p>
          </div>
        </div>
        <ArrowRight className="h-5 w-5 text-primary" />
      </div>

      <div className="mt-auto">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-muted-foreground">Progress</span>
          <span className="text-xs font-medium">{module.progress}%</span>
        </div>
        <Progress value={module.progress} className="h-1.5" />
      </div>
    </Link>
  );
}
