
import React from "react";
import { Language } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { availableLanguages } from "@/types";
import { Languages } from "lucide-react";

interface LanguageSelectorProps {
  currentLanguage: Language;
  onLanguageChange: (languageId: string) => void;
}

export function LanguageSelector({ 
  currentLanguage, 
  onLanguageChange 
}: LanguageSelectorProps) {
  return (
    <div className="flex items-center gap-2">
      <Languages className="h-4 w-4 text-muted-foreground" />
      <div className="text-sm text-muted-foreground">Translate to:</div>
      <Select 
        value={currentLanguage.id} 
        onValueChange={onLanguageChange}
      >
        <SelectTrigger className="w-[140px] h-9 bg-background/50 backdrop-blur-sm">
          <SelectValue>
            <span className="flex items-center">
              <span className="mr-2">{currentLanguage.flag}</span> {currentLanguage.name}
            </span>
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {availableLanguages.map((language) => (
            <SelectItem key={language.id} value={language.id}>
              <span className="flex items-center">
                <span className="mr-2">{language.flag}</span> {language.name}
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
