import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Timer, Send, BookOpen, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { sectionsData, PracticeItem, Subsection } from "@/data/sectionsData";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";

type QuestionResult = {
  questionIndex: number;
  prompt: string;
  answer: string;
  keywordsFound: string[];
  keywordsMissed: string[];
  score: number;
};

const BlurPractice = () => {
  const { topicId, subsectionId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [subsection, setSubsection] = useState<Subsection | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentPrompt, setCurrentPrompt] = useState<PracticeItem | null>(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [showQuestionFeedback, setShowQuestionFeedback] = useState(false);
  const [keywordsFound, setKeywordsFound] = useState<string[]>([]);
  const [keywordsMissed, setKeywordsMissed] = useState<string[]>([]);
  const [personalizedFeedback, setPersonalizedFeedback] = useState<string[]>([]);
  const [timerEnabled, setTimerEnabled] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(null);
  const [showIntro, setShowIntro] = useState(true);
  const [questionResults, setQuestionResults] = useState<QuestionResult[]>([]);
  const [showFinalResults, setShowFinalResults] = useState(false);

  useEffect(() => {
    // Find the subsection
    const topic = sectionsData.find((t) => t.id === topicId);
    if (topic) {
      const foundSubsection = topic.subsections.find((s) => s.id === subsectionId);
      setSubsection(foundSubsection || null);
      
      // Set first question
      if (foundSubsection && foundSubsection.practice_items.length > 0) {
        setCurrentPrompt(foundSubsection.practice_items[0]);
      }
    }

    // Load timer preference from localStorage
    const timerPref = localStorage.getItem("timerEnabled");
    if (timerPref === "true") {
      setTimerEnabled(true);
    }

    return () => {
      if (timerInterval) {
        clearInterval(timerInterval);
      }
    };
  }, [topicId, subsectionId]);

  useEffect(() => {
    if (timerEnabled && !showQuestionFeedback && !showIntro && !showFinalResults) {
      const interval = setInterval(() => {
        setTimeElapsed((prev) => prev + 1);
      }, 1000);
      setTimerInterval(interval);
      
      return () => clearInterval(interval);
    }
  }, [timerEnabled, showQuestionFeedback, showIntro, showFinalResults]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const extractBriefContent = (html: string) => {
    // Extract first subsection or first few paragraphs for preview
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const firstSubsection = doc.querySelector('.subsection');
    if (firstSubsection) {
      const heading = firstSubsection.querySelector('.subsection-heading')?.textContent || '';
      const definition = firstSubsection.querySelector('.definition-block')?.textContent || '';
      const keyFacts = firstSubsection.querySelector('.key-facts-block')?.textContent || '';
      return { heading, definition, keyFacts: keyFacts.substring(0, 300) + '...' };
    }
    return { heading: '', definition: '', keyFacts: '' };
  };

  const handleStartPractice = () => {
    setShowIntro(false);
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

    if (!subsection || !currentPrompt) return;

    // Question-specific keyword scoring
    const answerLower = userAnswer.toLowerCase();
    const found: string[] = [];
    const missed: string[] = [];

    const keywordsToCheck = currentPrompt.expected_keywords || subsection.canonical_keywords;

    keywordsToCheck.forEach((keyword) => {
      if (answerLower.includes(keyword.toLowerCase())) {
        found.push(keyword);
      } else {
        missed.push(keyword);
      }
    });

    // Generate personalized feedback based on topic coverage
    const feedback: string[] = [];
    
    if (currentPrompt.feedback_guidance && currentPrompt.feedback_guidance.topic_coverage) {
      currentPrompt.feedback_guidance.topic_coverage.forEach((topicGuide) => {
        const topicKeywordsFound = topicGuide.required_keywords.filter(kw => 
          answerLower.includes(kw.toLowerCase())
        );
        
        const coveragePercent = topicKeywordsFound.length / topicGuide.required_keywords.length;
        
        if (coveragePercent === 0) {
          // Missing entire topic
          feedback.push(topicGuide.feedback_if_missing);
        } else if (coveragePercent < 0.7) {
          // Partial coverage
          feedback.push(topicGuide.feedback_if_partial);
        }
        // If > 70% coverage, topic is good - no feedback needed
      });
    }

    // Add general encouragement if answer is strong
    if (found.length / keywordsToCheck.length >= 0.8) {
      feedback.unshift("✅ **Great work!** Your answer covers most of the key concepts comprehensively.");
    }

    const score = keywordsToCheck.length > 0
      ? Math.round((found.length / keywordsToCheck.length) * 100)
      : 0;

    setKeywordsFound(found);
    setKeywordsMissed(missed);
    setPersonalizedFeedback(feedback);
    setShowQuestionFeedback(true);

    // Save result
    const result: QuestionResult = {
      questionIndex: currentQuestionIndex,
      prompt: currentPrompt.prompt_template,
      answer: userAnswer,
      keywordsFound: found,
      keywordsMissed: missed,
      score
    };
    setQuestionResults([...questionResults, result]);

    // Stop timer
    if (timerInterval) {
      clearInterval(timerInterval);
    }
  };

  const handleNextQuestion = () => {
    if (!subsection) return;

    const nextIndex = currentQuestionIndex + 1;
    
    if (nextIndex < subsection.practice_items.length) {
      // Move to next question
      setCurrentQuestionIndex(nextIndex);
      setCurrentPrompt(subsection.practice_items[nextIndex]);
      setUserAnswer("");
      setShowQuestionFeedback(false);
      setKeywordsFound([]);
      setKeywordsMissed([]);
      setPersonalizedFeedback([]);
      setTimeElapsed(0);
    } else {
      // All questions completed - show final results
      setShowFinalResults(true);
    }
  };

  const getOverallScore = () => {
    if (questionResults.length === 0) return 0;
    const totalScore = questionResults.reduce((sum, result) => sum + result.score, 0);
    return Math.round(totalScore / questionResults.length);
  };

  const handleFinish = () => {
    navigate(`/topic/${topicId}`);
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

  const progress = ((currentQuestionIndex + (showQuestionFeedback ? 1 : 0)) / subsection.practice_items.length) * 100;

  // Intro screen with brief content
  if (showIntro) {
    const briefContent = extractBriefContent(subsection.content_html);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <Button variant="ghost" onClick={() => navigate(`/topic/${topicId}`)} className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Topic
          </Button>

          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="h-5 w-5 text-primary" />
                <Badge variant="secondary">Preview</Badge>
              </div>
              <CardTitle className="text-2xl">{subsection.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {briefContent.heading && (
                <div>
                  <h3 className="font-semibold text-lg mb-2">{briefContent.heading}</h3>
                  <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <p className="text-sm">{briefContent.definition}</p>
                  </div>
                </div>
              )}

              {briefContent.keyFacts && (
                <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                  <p className="text-sm">{briefContent.keyFacts}</p>
                </div>
              )}

              <div className="p-6 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg border-l-4 border-primary">
                <h3 className="font-semibold text-lg mb-3">📝 What's Next?</h3>
                <ul className="space-y-2 text-sm mb-4">
                  <li>✅ Answer <strong>{subsection.practice_items.length} blurting questions</strong></li>
                  <li>✅ Get instant feedback on each answer</li>
                  <li>✅ See your overall score at the end</li>
                  <li>✅ Identify areas to review</li>
                </ul>
                <Button onClick={handleStartPractice} size="lg" className="w-full">
                  Start Blurting Practice →
                </Button>
              </div>

              <div className="text-center">
                <Button variant="link" onClick={() => navigate(`/topic/${topicId}`)}>
                  View full notes first
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Final results screen
  if (showFinalResults) {
    const overallScore = getOverallScore();
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <Card className="mb-6">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <CheckCircle className="h-16 w-16 text-green-500" />
              </div>
              <CardTitle className="text-3xl mb-2">Subsection Complete! 🎉</CardTitle>
              <p className="text-muted-foreground">{subsection.title}</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-8 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-2">Overall Score</p>
                <p className="text-6xl font-bold text-primary mb-2">{overallScore}%</p>
                <p className="text-sm text-muted-foreground">
                  Completed {questionResults.length} of {subsection.practice_items.length} questions
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-lg">Question Breakdown:</h3>
                {questionResults.map((result, idx) => (
                  <div key={idx} className="p-4 bg-muted rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium text-sm">Question {idx + 1}</p>
                      <Badge variant={result.score >= 70 ? "default" : result.score >= 50 ? "secondary" : "destructive"}>
                        {result.score}%
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{result.prompt}</p>
                    <div className="flex gap-4 text-xs">
                      <span className="text-green-600">✓ {result.keywordsFound.length} found</span>
                      <span className="text-yellow-600">⚠ {result.keywordsMissed.length} missed</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border-l-4 border-blue-500">
                <h3 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">💡 Next Steps</h3>
                <p className="text-sm mb-3">
                  {overallScore >= 80 
                    ? "Excellent work! You've mastered this subsection. Ready for the next one?"
                    : overallScore >= 60
                    ? "Good effort! Review the missed keywords and try another subsection."
                    : "Review the full notes and try practicing again to improve your score."}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button onClick={handleFinish} className="flex-1" size="lg">
                  Choose Next Subsection
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setShowFinalResults(false);
                    setShowIntro(true);
                    setCurrentQuestionIndex(0);
                    setCurrentPrompt(subsection.practice_items[0]);
                    setQuestionResults([]);
                    setTimeElapsed(0);
                  }} 
                  className="flex-1"
                >
                  Retry This Subsection
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Question screen
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Button variant="ghost" onClick={() => navigate(`/topic/${topicId}`)} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Topic
        </Button>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl font-bold">
              Question {currentQuestionIndex + 1} of {subsection.practice_items.length}
            </h1>
            {timerEnabled && !showQuestionFeedback && (
              <div className="flex items-center gap-2 text-sm">
                <Timer className="h-4 w-4" />
                <span className="font-mono">{formatTime(timeElapsed)}</span>
              </div>
            )}
          </div>
          <Progress value={progress} className="h-2" />
          <p className="text-xs text-muted-foreground mt-2">{subsection.title}</p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Badge variant={currentPrompt.type === "open" ? "default" : "secondary"}>
                {currentPrompt.type === "open" ? "Open-Ended" : "Short Answer"}
              </Badge>
              <Badge variant="outline">{currentPrompt.difficulty}</Badge>
            </div>
            <CardTitle className="text-xl mt-4">{currentPrompt.prompt_template}</CardTitle>
          </CardHeader>
          <CardContent>
            {!showQuestionFeedback ? (
              <div className="space-y-4">
                <Textarea
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Write everything you remember here..."
                  className="min-h-[300px] text-base"
                  autoFocus
                />
                <Button onClick={handleSubmit} className="w-full" size="lg">
                  <Send className="mr-2 h-4 w-4" />
                  Submit Answer
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="p-4 bg-muted rounded-lg">
                  <h3 className="font-semibold mb-2">Your Answer:</h3>
                  <p className="text-sm whitespace-pre-wrap">{userAnswer}</p>
                </div>

                {/* Personalized Feedback Section */}
                {personalizedFeedback.length > 0 && (
                  <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border-l-4 border-blue-500">
                    <h3 className="font-semibold text-blue-700 dark:text-blue-400 mb-3 flex items-center gap-2">
                      💡 What to Add to Your Answer
                    </h3>
                    <div className="space-y-3">
                      {personalizedFeedback.map((feedback, idx) => (
                        <div key={idx} className="text-sm">
                          <p dangerouslySetInnerHTML={{ __html: feedback.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

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
                  <p className="text-sm text-muted-foreground mb-2">Question Score</p>
                  <p className="text-4xl font-bold text-primary mb-1">{coveragePercent}%</p>
                  <p className="text-xs text-muted-foreground">
                    {keywordsFound.length} out of {totalKeywords} key concepts for this question
                  </p>
                </div>

                <Button onClick={handleNextQuestion} className="w-full" size="lg">
                  {currentQuestionIndex < subsection.practice_items.length - 1 
                    ? "Next Question →" 
                    : "See Final Results →"}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BlurPractice;
