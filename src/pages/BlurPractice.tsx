import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Timer, Send } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { sectionsData, PracticeItem, Subsection } from "@/data/sectionsData";
import { useToast } from "@/hooks/use-toast";

const BlurPractice = () => {
  const { topicId, subsectionId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [subsection, setSubsection] = useState<Subsection | null>(null);
  const [currentPrompt, setCurrentPrompt] = useState<PracticeItem | null>(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [keywordsFound, setKeywordsFound] = useState<string[]>([]);
  const [keywordsMissed, setKeywordsMissed] = useState<string[]>([]);
  const [timerEnabled, setTimerEnabled] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Find the subsection
    const topic = sectionsData.find((t) => t.id === topicId);
    if (topic) {
      const foundSubsection = topic.subsections.find((s) => s.id === subsectionId);
      setSubsection(foundSubsection || null);
      
      // Pick a random prompt
      if (foundSubsection && foundSubsection.practice_items.length > 0) {
        const randomIndex = Math.floor(Math.random() * foundSubsection.practice_items.length);
        setCurrentPrompt(foundSubsection.practice_items[randomIndex]);
      }
    }

    // Load timer preference from localStorage
    const timerPref = localStorage.getItem("timerEnabled");
    if (timerPref === "true") {
      setTimerEnabled(true);
    }

    // Autosave draft
    const savedDraft = localStorage.getItem(`blur-draft-${subsectionId}`);
    if (savedDraft) {
      setUserAnswer(savedDraft);
    }

    return () => {
      if (timerInterval) {
        clearInterval(timerInterval);
      }
    };
  }, [topicId, subsectionId]);

  useEffect(() => {
    // Autosave draft on change
    if (userAnswer) {
      localStorage.setItem(`blur-draft-${subsectionId}`, userAnswer);
    }
  }, [userAnswer, subsectionId]);

  useEffect(() => {
    if (timerEnabled && !showFeedback) {
      const interval = setInterval(() => {
        setTimeElapsed((prev) => prev + 1);
      }, 1000);
      setTimerInterval(interval);
      
      return () => clearInterval(interval);
    }
  }, [timerEnabled, showFeedback]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleSubmit = () => {
    if (!userAnswer.trim()) {
      toast({
        title: "Empty answer",
        description: "Please write something before submitting!",
        variant: "destructive"
      });
      return;
    }

    if (!subsection) return;

    // Question-specific keyword scoring
    const answerLower = userAnswer.toLowerCase();
    const found: string[] = [];
    const missed: string[] = [];

    // Use question-specific keywords if available, otherwise fall back to subsection keywords
    const keywordsToCheck = currentPrompt?.expected_keywords || subsection.canonical_keywords;

    keywordsToCheck.forEach((keyword) => {
      if (answerLower.includes(keyword.toLowerCase())) {
        found.push(keyword);
      } else {
        missed.push(keyword);
      }
    });

    setKeywordsFound(found);
    setKeywordsMissed(missed);
    setShowFeedback(true);

    // Stop timer
    if (timerInterval) {
      clearInterval(timerInterval);
    }

    // Clear draft
    localStorage.removeItem(`blur-draft-${subsectionId}`);
  };

  const handleTryAgain = () => {
    // Pick a different prompt
    if (subsection && subsection.practice_items.length > 1) {
      const otherPrompts = subsection.practice_items.filter((p) => p.id !== currentPrompt?.id);
      if (otherPrompts.length > 0) {
        const randomIndex = Math.floor(Math.random() * otherPrompts.length);
        setCurrentPrompt(otherPrompts[randomIndex]);
      }
    }
    
    setUserAnswer("");
    setShowFeedback(false);
    setKeywordsFound([]);
    setKeywordsMissed([]);
    setTimeElapsed(0);
  };

  if (!subsection || !currentPrompt) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8">
          <CardContent>
            <p className="text-muted-foreground">Practice not found</p>
            <Button onClick={() => navigate("/sections")} className="mt-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Topics
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Use question-specific keywords for scoring
  const totalKeywords = currentPrompt?.expected_keywords?.length || subsection.canonical_keywords.length;
  const coveragePercent = totalKeywords > 0
    ? Math.round((keywordsFound.length / totalKeywords) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Button variant="ghost" onClick={() => navigate(`/topic/${topicId}`)} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Topic
        </Button>

        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Blur Practice</h1>
          <p className="text-muted-foreground">{subsection.title}</p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <Badge variant={currentPrompt.type === "open" ? "default" : "secondary"}>
                {currentPrompt.type === "open" ? "Open-Ended" : "Short Answer"}
              </Badge>
              {timerEnabled && (
                <div className="flex items-center gap-2 text-sm">
                  <Timer className="h-4 w-4" />
                  <span className="font-mono">{formatTime(timeElapsed)}</span>
                </div>
              )}
            </div>
            <CardTitle className="text-xl mt-4">{currentPrompt.prompt_template}</CardTitle>
          </CardHeader>
          <CardContent>
            {!showFeedback ? (
              <div className="space-y-4">
                <Textarea
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Write everything you remember here..."
                  className="min-h-[300px] text-base"
                  disabled={showFeedback}
                />
                <Button onClick={handleSubmit} className="w-full">
                  <Send className="mr-2 h-4 w-4" />
                  Submit & Get Feedback
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="p-4 bg-muted rounded-lg">
                  <h3 className="font-semibold mb-2">Your Answer:</h3>
                  <p className="text-sm whitespace-pre-wrap">{userAnswer}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border-l-4 border-green-500">
                    <h3 className="font-semibold text-green-700 dark:text-green-400 mb-2">
                      ✅ Keywords Found ({keywordsFound.length})
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {keywordsFound.map((kw, idx) => (
                        <Badge key={idx} variant="outline" className="bg-green-100 dark:bg-green-900/30">
                          {kw}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg border-l-4 border-yellow-500">
                    <h3 className="font-semibold text-yellow-700 dark:text-yellow-400 mb-2">
                      ⚠️ Keywords Missed ({keywordsMissed.length})
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {keywordsMissed.map((kw, idx) => (
                        <Badge key={idx} variant="outline" className="bg-yellow-100 dark:bg-yellow-900/30">
                          {kw}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-primary/10 rounded-lg text-center">
                  <p className="text-sm text-muted-foreground mb-2">Coverage Score</p>
                  <p className="text-4xl font-bold text-primary mb-1">{coveragePercent}%</p>
                  <p className="text-xs text-muted-foreground">
                    {keywordsFound.length} out of {totalKeywords} key concepts for this question
                  </p>
                </div>

                <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border-l-4 border-blue-500">
                  <h3 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">💡 Tip</h3>
                  <p className="text-sm">
                    Review the missed keywords in the topic content, then try again with a different prompt!
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button onClick={handleTryAgain} className="flex-1">
                    Try Again (New Prompt)
                  </Button>
                  <Button variant="outline" onClick={() => navigate(`/topic/${topicId}`)} className="flex-1">
                    Back to Content
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BlurPractice;
