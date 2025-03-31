
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Module } from "@/types";
import { Link } from "react-router-dom";

interface ContinueLearningCardProps {
  module: Module;
  className?: string;
}

export function ContinueLearningCard({ module, className }: ContinueLearningCardProps) {
  return (
    <Card className={cn("bg-spotify-darkgray border-white/5 hover-scale overflow-hidden", className)}>
      <CardHeader className="pb-2">
        <div className="flex items-start gap-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-md bg-primary/10 text-primary">
            <span className="text-2xl" dangerouslySetInnerHTML={{ __html: module.icon }} />
          </div>
          <div>
            <CardTitle className="text-md font-medium">{module.title}</CardTitle>
            <CardDescription className="text-xs text-muted-foreground mt-1">
              {module.description}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        {module.progress !== undefined && (
          <div className="space-y-1">
            <Progress value={module.progress} className="h-1" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Progress</span>
              <span>{Math.round(module.progress)}%</span>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-2">
        <Button asChild variant="ghost" className="w-full text-primary hover:bg-primary/10 hover:text-primary">
          <Link to={module.path}>
            Continue
            <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
