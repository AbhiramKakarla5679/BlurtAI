import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Timer, Play, Pause } from "lucide-react";

interface MemorizationTimerProps {
  duration: number; // in seconds
  onComplete: () => void;
}

export const MemorizationTimer = ({ duration, onComplete }: MemorizationTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!isRunning || isPaused) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, isPaused, onComplete]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((duration - timeLeft) / duration) * 100;

  if (!isRunning) {
    return (
      <Card className="border-primary">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Timer className="h-5 w-5" />
            Memorization Timer
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            You have {Math.floor(duration / 60)} minutes to study the content above.
            When you're ready, start the timer.
          </p>
          <Button onClick={() => setIsRunning(true)} size="lg" className="w-full">
            <Play className="mr-2 h-4 w-4" />
            Start Memorizing
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-primary">
      <CardContent className="pt-6 space-y-4">
        <div className="text-center">
          <div className="text-6xl font-bold font-mono mb-2">
            {formatTime(timeLeft)}
          </div>
          <p className="text-sm text-muted-foreground">Time remaining</p>
        </div>
        
        <Progress value={progress} className="h-2" />
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setIsPaused(!isPaused)}
            className="flex-1"
          >
            {isPaused ? (
              <>
                <Play className="mr-2 h-4 w-4" />
                Resume
              </>
            ) : (
              <>
                <Pause className="mr-2 h-4 w-4" />
                Pause
              </>
            )}
          </Button>
          <Button onClick={onComplete} className="flex-1">
            I'm Ready
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};