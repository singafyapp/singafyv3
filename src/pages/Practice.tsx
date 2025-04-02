
import { useState, useEffect } from "react";
import { Language, Song, PracticeExercise } from "@/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { MusicIcon, CheckCircle, XCircle, ChevronRight, Mic, Volume2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function Practice() {
  const [currentLanguage, setCurrentLanguage] = useState<Language>({
    id: "1",
    name: "Spanish",
    code: "es",
    flag: "🇪🇸"
  });
  
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [exercises, setExercises] = useState<PracticeExercise[]>([]);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Load selected song from local storage
    const savedSong = localStorage.getItem('selectedSong');
    if (savedSong) {
      const song: Song = JSON.parse(savedSong);
      setSelectedSong(song);
      setCurrentLanguage(song.language);
      
      // Generate practice exercises for this song
      generateExercises(song);
    }
  }, []);

  const generateExercises = (song: Song) => {
    // In a real app, you would fetch exercises from a server
    // Here we'll generate some mock exercises based on the song
    const mockExercises: PracticeExercise[] = [
      {
        id: "1",
        type: "multiple-choice",
        question: `What language is "${song.title}" by ${song.artist} in?`,
        options: ["English", song.language.name, "Italian", "French"],
        correctAnswer: song.language.name,
        songId: song.id
      },
      {
        id: "2",
        type: "fill-in-blank",
        question: `Complete this sentence: "${song.title}" was performed by _______.`,
        correctAnswer: song.artist,
        songId: song.id
      },
      {
        id: "3",
        type: "multiple-choice",
        question: "Which of these words would you likely hear in this song?",
        options: ["Hello", "Love", "Goodbye", "Dance"],
        correctAnswer: "Love",
        songId: song.id
      },
      {
        id: "4",
        type: "listening",
        question: "Listen to the clip and select what you hear:",
        options: ["Phrase 1", "Phrase 2", "Phrase 3", "Phrase 4"],
        correctAnswer: "Phrase 2",
        songId: song.id
      },
      {
        id: "5",
        type: "speaking",
        question: "Repeat the following phrase:",
        correctAnswer: "Sample phrase in " + song.language.name,
        songId: song.id
      }
    ];
    
    setExercises(mockExercises);
    setProgress(0);
  };

  const handleSubmitAnswer = () => {
    const currentExercise = exercises[currentExerciseIndex];
    
    if (!currentExercise) return;
    
    const correct = 
      currentExercise.type === "fill-in-blank" 
        ? userAnswer.toLowerCase() === currentExercise.correctAnswer.toLowerCase()
        : userAnswer === currentExercise.correctAnswer;
    
    setIsAnswerCorrect(correct);
    
    if (correct) {
      toast({
        title: "Correct!",
        description: "Great job!",
      });
    } else {
      toast({
        title: "Not quite right",
        description: `The correct answer was: ${currentExercise.correctAnswer}`,
        variant: "destructive",
      });
    }
  };

  const handleNextExercise = () => {
    if (currentExerciseIndex < exercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
      setUserAnswer("");
      setIsAnswerCorrect(null);
      setProgress(Math.round(((currentExerciseIndex + 1) / exercises.length) * 100));
    } else {
      // Practice complete
      toast({
        title: "Practice Complete!",
        description: "You've completed all exercises for this song.",
      });
      
      // Reset to start again
      setCurrentExerciseIndex(0);
      setUserAnswer("");
      setIsAnswerCorrect(null);
      setProgress(100);
    }
  };

  const currentExercise = exercises[currentExerciseIndex];

  if (!selectedSong) {
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-1">Practice Exercises</h1>
            <p className="text-muted-foreground">No song selected for practice</p>
          </div>
        </div>
        
        <div className="glass-card p-6 text-center">
          <MusicIcon className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-30" />
          <h2 className="text-xl font-medium mb-2">Select a song to practice</h2>
          <p className="text-muted-foreground mb-6">
            Browse songs or go to your favorites to select a song for practice exercises.
          </p>
          <div className="flex justify-center gap-4">
            <Button onClick={() => window.location.href = "/songs"}>
              Browse Songs
            </Button>
            <Button variant="outline" onClick={() => window.location.href = "/favorites"}>
              My Favorites
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-1">Practice Exercises</h1>
          <p className="text-muted-foreground">
            Test your knowledge of "{selectedSong.title}" in {currentLanguage.name}
          </p>
        </div>
      </div>
      
      {/* Progress bar */}
      <div className="w-full">
        <div className="flex justify-between text-sm mb-1">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>
      
      {/* Exercise card */}
      <Card className="bg-spotify-darkgray border-white/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="inline-block px-2 py-1 rounded bg-primary text-xs">{currentExerciseIndex + 1}/{exercises.length}</span>
            {currentExercise?.type === "multiple-choice" && "Multiple Choice"}
            {currentExercise?.type === "fill-in-blank" && "Fill in the Blank"}
            {currentExercise?.type === "listening" && "Listening Exercise"}
            {currentExercise?.type === "speaking" && "Speaking Exercise"}
          </CardTitle>
          <CardDescription>{currentExercise?.question}</CardDescription>
        </CardHeader>
        <CardContent>
          {currentExercise?.type === "multiple-choice" && (
            <RadioGroup value={userAnswer} onValueChange={setUserAnswer}>
              {currentExercise.options?.map((option, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <RadioGroupItem value={option} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`}>{option}</Label>
                </div>
              ))}
            </RadioGroup>
          )}
          
          {currentExercise?.type === "fill-in-blank" && (
            <Input
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Type your answer..."
              className="bg-spotify-lightgray border-none"
            />
          )}
          
          {currentExercise?.type === "listening" && (
            <div className="space-y-4">
              <Button className="w-full flex items-center gap-2">
                <Volume2 className="h-4 w-4" /> Play Audio
              </Button>
              <RadioGroup value={userAnswer} onValueChange={setUserAnswer}>
                {currentExercise.options?.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2 mb-2">
                    <RadioGroupItem value={option} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`}>{option}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}
          
          {currentExercise?.type === "speaking" && (
            <div className="space-y-4">
              <p className="text-center py-2 px-4 bg-spotify-lightgray rounded font-medium">
                "{currentExercise.correctAnswer}"
              </p>
              <Button className="w-full flex items-center gap-2">
                <Mic className="h-4 w-4" /> Record Your Voice
              </Button>
              <div className="text-center text-sm text-muted-foreground">
                Click to record yourself saying the phrase
              </div>
            </div>
          )}
          
          {isAnswerCorrect !== null && (
            <div className={`mt-4 p-3 rounded ${isAnswerCorrect ? 'bg-green-900/20 text-green-400' : 'bg-red-900/20 text-red-400'}`}>
              <div className="flex items-center gap-2">
                {isAnswerCorrect ? (
                  <>
                    <CheckCircle className="h-5 w-5" />
                    <span>Correct!</span>
                  </>
                ) : (
                  <>
                    <XCircle className="h-5 w-5" />
                    <span>Incorrect. The answer is: {currentExercise.correctAnswer}</span>
                  </>
                )}
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          {isAnswerCorrect === null ? (
            <Button 
              onClick={handleSubmitAnswer} 
              disabled={!userAnswer}
            >
              Check Answer
            </Button>
          ) : (
            <Button onClick={handleNextExercise}>
              {currentExerciseIndex < exercises.length - 1 ? (
                <>Next <ChevronRight className="h-4 w-4" /></>
              ) : (
                "Complete"
              )}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
