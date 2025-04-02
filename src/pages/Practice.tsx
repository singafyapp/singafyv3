
import { useState, useEffect, useRef } from "react";
import { Language, Song, PracticeExercise } from "@/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { MusicIcon, CheckCircle, XCircle, ChevronRight, Mic, Volume2, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { generateExercises } from "@/services/lyricService";

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
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element
    audioRef.current = new Audio();
    
    // Set up audio demo clips
    const demoClips = [
      "https://p.scdn.co/mp3-preview/8ed90a239874906f1bbcf13dd0ef5037dfa3d1ef",
      "https://p.scdn.co/mp3-preview/f7a1b8a270f310e43ced534327b198dabbf0a3bd",
      "https://p.scdn.co/mp3-preview/3eb16018c3908c33a95edce8f79a8113ddae824e"
    ];
    
    // Use a random clip for demo
    audioRef.current.src = demoClips[Math.floor(Math.random() * demoClips.length)];
    
    // Cleanup audio element on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);
  
  useEffect(() => {
    // Load selected song from local storage
    const savedSong = localStorage.getItem('selectedSong');
    if (savedSong) {
      const song: Song = JSON.parse(savedSong);
      setSelectedSong(song);
      setCurrentLanguage(song.language);
      
      // Generate practice exercises for this song
      const generatedExercises = generateExercises(song);
      setExercises(generatedExercises);
    }
  }, []);

  const handlePlayAudio = () => {
    if (audioRef.current) {
      if (isAudioPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(error => {
          console.error('Audio playback failed:', error);
          toast({
            title: "Playback Error",
            description: "Unable to play audio. Please try again.",
            variant: "destructive",
          });
        });
      }
      setIsAudioPlaying(!isAudioPlaying);
    }
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
        description: "Great job on that answer! 🎉",
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
      
      // Stop audio if playing
      if (isAudioPlaying && audioRef.current) {
        audioRef.current.pause();
        setIsAudioPlaying(false);
      }
    } else {
      // Practice complete
      toast({
        title: "Practice Complete!",
        description: "You've completed all exercises for this song. Well done! 🌟",
      });
      
      // Reset to start again
      setCurrentExerciseIndex(0);
      setUserAnswer("");
      setIsAnswerCorrect(null);
      setProgress(100);
    }
  };

  const handleStartRecording = () => {
    toast({
      title: "Recording Started",
      description: "Practice your pronunciation! (Demo functionality)",
    });
    
    // Simulate a recording and automatic checking
    setTimeout(() => {
      toast({
        title: "Excellent Pronunciation!",
        description: "Your accent is getting better! Keep practicing.",
      });
      setIsAnswerCorrect(true);
    }, 3000);
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
            Test your knowledge of "{selectedSong.title}" in {currentLanguage.name} {currentLanguage.flag}
          </p>
        </div>
      </div>
      
      {/* Song Card */}
      <div className="bg-spotify-darkgray border border-white/5 rounded-lg p-4 flex items-center gap-4">
        <img 
          src={selectedSong.albumCover} 
          alt={selectedSong.title}
          className="w-16 h-16 object-cover rounded"
        />
        <div>
          <h3 className="font-medium">{selectedSong.title}</h3>
          <p className="text-sm text-muted-foreground">{selectedSong.artist}</p>
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
            <div className="space-y-2">
              <Input
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Type your answer..."
                className="bg-spotify-lightgray border-none"
              />
              {currentExercise.hint && (
                <p className="text-sm text-muted-foreground italic">Hint: {currentExercise.hint}</p>
              )}
            </div>
          )}
          
          {currentExercise?.type === "listening" && (
            <div className="space-y-4">
              <Button 
                className="w-full flex items-center gap-2"
                onClick={handlePlayAudio}
              >
                {isAudioPlaying ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Stop Audio
                  </>
                ) : (
                  <>
                    <Volume2 className="h-4 w-4" /> Play Audio
                  </>
                )}
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
              <Button 
                className="w-full flex items-center gap-2"
                onClick={handleStartRecording}
              >
                <Mic className="h-4 w-4" /> Record Your Voice
              </Button>
              <div className="text-center text-sm text-muted-foreground">
                Click to record yourself saying the phrase
              </div>
              {currentExercise.hint && (
                <p className="text-sm text-muted-foreground italic text-center">
                  Tip: {currentExercise.hint}
                </p>
              )}
            </div>
          )}
          
          {isAnswerCorrect !== null && (
            <div className={`mt-4 p-3 rounded ${isAnswerCorrect ? 'bg-green-900/20 text-green-400' : 'bg-red-900/20 text-red-400'}`}>
              <div className="flex items-center gap-2">
                {isAnswerCorrect ? (
                  <>
                    <CheckCircle className="h-5 w-5" />
                    <span>Correct! Great job!</span>
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
