
import { useState } from "react";
import { Language } from "@/types";

export default function WordFocus() {
  const [currentLanguage] = useState<Language>({
    id: "1",
    name: "Spanish",
    code: "es",
    flag: "🇪🇸"
  });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-1">Word Focus</h1>
          <p className="text-muted-foreground">Build your vocabulary in {currentLanguage.name}</p>
        </div>
      </div>
      
      <div className="glass-card p-6">
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">
            Word Focus content coming soon...
          </p>
        </div>
      </div>
    </div>
  );
}
