import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Timer, Send, BookOpen, CheckCircle, ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { sectionsData, PracticeItem, Subsection } from "@/data/sectionsData";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import SectionContent from "@/components/SectionContent";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

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
  
  const [studySubsections, setStudySubsections] = useState<Subsection[]>([]);
  const [allPracticeItems, setAllPracticeItems] = useState<(PracticeItem & { subsectionTitle: string })[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentPrompt, setCurrentPrompt] = useState<(PracticeItem & { subsectionTitle: string }) | null>(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [showQuestionFeedback, setShowQuestionFeedback] = useState(false);
  const [keywordsFound, setKeywordsFound] = useState<string[]>([]);
  const [keywordsMissed, setKeywordsMissed] = useState<string[]>([]);
  const [personalizedFeedback, setPersonalizedFeedback] = useState<string[]>([]);
  const [timerEnabled, setTimerEnabled] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(null);
  const [showStudyContent, setShowStudyContent] = useState(true);
  const [questionResults, setQuestionResults] = useState<QuestionResult[]>([]);
  const [showFinalResults, setShowFinalResults] = useState(false);
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  useEffect(() => {
    // Find the topic and subsection
    const topic = sectionsData.find((t) => t.id === topicId);
    if (!topic) return;

    const targetSubsection = topic.subsections.find((s) => s.id === subsectionId);
    if (!targetSubsection) return;

    // Get study group - find all subsections in the same study group
    const studyGroup = targetSubsection.study_group;
    let subsectionsToStudy: Subsection[] = [];

    if (studyGroup) {
      // Find all subsections in this study group
      subsectionsToStudy = topic.subsections.filter((s) => s.study_group === studyGroup);
    } else {
      // If no study group, just use this subsection
      subsectionsToStudy = [targetSubsection];
    }

    setStudySubsections(subsectionsToStudy);
    
    // Auto-expand first section
    if (subsectionsToStudy.length > 0) {
      setExpandedSections([subsectionsToStudy[0].id]);
    }

    // Collect all practice items from these subsections and shuffle
    const allItems: (PracticeItem & { subsectionTitle: string })[] = [];
    subsectionsToStudy.forEach((subsection) => {
      subsection.practice_items.forEach((item) => {
        allItems.push({
          ...item,
          subsectionTitle: subsection.title
        });
      });
    });

    // Shuffle the questions for variety
    const shuffled = allItems.sort(() => Math.random() - 0.5);
    setAllPracticeItems(shuffled);

    if (shuffled.length > 0) {
      setCurrentPrompt(shuffled[0]);
    }

    // Load timer preference
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
    if (timerEnabled && !showQuestionFeedback && !showStudyContent && !showFinalResults) {
      const interval = setInterval(() => {
        setTimeElapsed((prev) => prev + 1);
      }, 1000);
      setTimerInterval(interval);
      
      return () => clearInterval(interval);
    }
  }, [timerEnabled, showQuestionFeedback, showStudyContent, showFinalResults]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const handleStartPractice = () => {
    setShowStudyContent(false);
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

    if (!currentPrompt) return;

    // Question-specific keyword scoring
    const answerLower = userAnswer.toLowerCase();
    const found: string[] = [];
    const missed: string[] = [];

    // Collect all canonical keywords from the study subsections
    const allKeywords = studySubsections.flatMap(s => s.canonical_keywords);
    const keywordsToCheck = currentPrompt.expected_keywords || allKeywords;

    keywordsToCheck.forEach((keyword) => {
      if (answerLower.includes(keyword.toLowerCase())) {
        found.push(keyword);
      } else {
        missed.push(keyword);
      }
    });

    // Generate personalized feedback
    const feedback: string[] = [];
    
    if (currentPrompt.feedback_guidance && currentPrompt.feedback_guidance.topic_coverage) {
      currentPrompt.feedback_guidance.topic_coverage.forEach((topicGuide) => {
        const topicKeywordsFound = topicGuide.required_keywords.filter(kw => 
          answerLower.includes(kw.toLowerCase())
        );
        
        const coveragePercent = topicKeywordsFound.length / topicGuide.required_keywords.length;
        
        if (coveragePercent === 0) {
          feedback.push(topicGuide.feedback_if_missing);
        } else if (coveragePercent < 0.7) {
          feedback.push(topicGuide.feedback_if_partial);
        }
      });
    }

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

    const result: QuestionResult = {
      questionIndex: currentQuestionIndex,
      prompt: currentPrompt.prompt_template,
      answer: userAnswer,
      keywordsFound: found,
      keywordsMissed: missed,
      score
    };
    setQuestionResults([...questionResults, result]);

    if (timerInterval) {
      clearInterval(timerInterval);
    }
  };

  const handleNextQuestion = () => {
    const nextIndex = currentQuestionIndex + 1;
    
    if (nextIndex < allPracticeItems.length) {
      setCurrentQuestionIndex(nextIndex);
      setCurrentPrompt(allPracticeItems[nextIndex]);
      setUserAnswer("");
      setShowQuestionFeedback(false);
      setKeywordsFound([]);
      setKeywordsMissed([]);
      setPersonalizedFeedback([]);
      setTimeElapsed(0);
    } else {
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

  if (studySubsections.length === 0 || !currentPrompt) {
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

  const allKeywords = studySubsections.flatMap(s => s.canonical_keywords);
  const totalKeywords = currentPrompt?.expected_keywords?.length || allKeywords.length;
  const coveragePercent = totalKeywords > 0
    ? Math.round((keywordsFound.length / totalKeywords) * 100)
    : 0;

  const progress = ((currentQuestionIndex + (showQuestionFeedback ? 1 : 0)) / allPracticeItems.length) * 100;

  // Study content screen
  if (showStudyContent) {
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
                <Badge variant="secondary">Study {studySubsections.length} Sections</Badge>
              </div>
              <CardTitle className="text-2xl">Review Before Blurting</CardTitle>
              <p className="text-sm text-muted-foreground">
                Read through these {studySubsections.length} related sections, then test your recall
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {studySubsections.map((subsection) => (
                <Card key={subsection.id} className="overflow-hidden">
                  <Collapsible
                    open={expandedSections.includes(subsection.id)}
                    onOpenChange={() => toggleSection(subsection.id)}
                  >
                    <CardHeader className="cursor-pointer hover:bg-accent/50 transition-colors py-3">
                      <CollapsibleTrigger asChild>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{subsection.title}</CardTitle>
                          <ChevronDown
                            className={`h-5 w-5 transition-transform ${
                              expandedSections.includes(subsection.id) ? "transform rotate-180" : ""
                            }`}
                          />
                        </div>
                      </CollapsibleTrigger>
                    </CardHeader>

                    <CollapsibleContent>
                      <CardContent className="pt-0">
                        <SectionContent html={subsection.content_html} />
                      </CardContent>
                    </CollapsibleContent>
                  </Collapsible>
                </Card>
              ))}

              <div className="p-6 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg border-l-4 border-primary">
                <h3 className="font-semibold text-lg mb-3">✍️ Ready to Blur?</h3>
                <p className="text-sm mb-4">
                  You'll answer <strong>{allPracticeItems.length} questions</strong> about these {studySubsections.length} sections. 
                  Each question will test different aspects of what you just studied.
                </p>
                <Button onClick={handleStartPractice} size="lg" className="w-full">
                  Start Blurting Practice →
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
              <CardTitle className="text-3xl mb-2">Practice Complete! 🎉</CardTitle>
              <p className="text-muted-foreground">
                {studySubsections.map(s => s.title).join(" & ")}
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-8 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-2">Overall Score</p>
                <p className="text-6xl font-bold text-primary mb-2">{overallScore}%</p>
                <p className="text-sm text-muted-foreground">
                  Completed {questionResults.length} of {allPracticeItems.length} questions
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
                      <span className="text-green-600">✓ {result.keywordsFound.length} key ideas</span>
                      <span className="text-yellow-600">⚠ {result.keywordsMissed.length} missed</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border-l-4 border-blue-500">
                <h3 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">💡 Next Steps</h3>
                <p className="text-sm mb-3">
                  {overallScore >= 80 
                    ? "Excellent work! You've mastered these sections. Ready for the next group?"
                    : overallScore >= 60
                    ? "Good effort! Review the missed key ideas and try another study group."
                    : "Review the sections again and retry to improve your score."}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button onClick={handleFinish} className="flex-1" size="lg">
                  Choose Next Section
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setShowFinalResults(false);
                    setShowStudyContent(true);
                    setCurrentQuestionIndex(0);
                    // Re-shuffle questions
                    const shuffled = allPracticeItems.sort(() => Math.random() - 0.5);
                    setAllPracticeItems(shuffled);
                    setCurrentPrompt(shuffled[0]);
                    setQuestionResults([]);
                    setTimeElapsed(0);
                  }} 
                  className="flex-1"
                >
                  Retry (New Questions)
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
              Question {currentQuestionIndex + 1} of {allPracticeItems.length}
            </h1>
            {timerEnabled && !showQuestionFeedback && (
              <div className="flex items-center gap-2 text-sm">
                <Timer className="h-4 w-4" />
                <span className="font-mono">{formatTime(timeElapsed)}</span>
              </div>
            )}
          </div>
          <Progress value={progress} className="h-2" />
          <p className="text-xs text-muted-foreground mt-2">{currentPrompt.subsectionTitle}</p>
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
                      ✅ Key Ideas Covered ({keywordsFound.length})
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
                      ⚠️ Key Ideas Missed ({keywordsMissed.length})
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
                  <p className="text-6xl font-bold text-primary mb-1">{coveragePercent}%</p>
                  <p className="text-xs text-muted-foreground">
                    {keywordsFound.length} out of {totalKeywords} key ideas covered
                  </p>
                </div>

                <Button onClick={handleNextQuestion} className="w-full" size="lg">
                  {currentQuestionIndex < allPracticeItems.length - 1 
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
