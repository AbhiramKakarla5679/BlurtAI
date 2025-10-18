import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowLeft, BookOpen, Brain, TrendingUp, Shield } from "lucide-react";

const Help = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Button variant="ghost" onClick={() => navigate("/dashboard")} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Help & Guide</h1>
          <p className="text-muted-foreground">Everything you need to know about using ChemBlur</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                Read Sections
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Browse chemistry topics and read the content carefully. Pay attention to key terms and concepts.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-secondary" />
                Blur Exercise
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                After reading, write everything you remember without looking back. This tests your recall.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-accent" />
                Track Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                View your scores and identify weak areas. Focus on topics where you need improvement.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-600" />
                Spaced Repetition
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Review recommendations are based on your performance to optimize long-term retention.
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="what-is-blurring">
                <AccordionTrigger>What is "blurring"?</AccordionTrigger>
                <AccordionContent>
                  Blurring is an active recall technique where you write down everything you remember about a topic
                  without looking at your notes. This strengthens memory and identifies gaps in your knowledge.
                  It's more effective than passive reading or highlighting.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="how-scoring-works">
                <AccordionTrigger>How does the scoring system work?</AccordionTrigger>
                <AccordionContent>
                  Your score is based on how many key concepts and keywords you include in your blur. Each section
                  has a list of important terms that should appear in a complete answer. The percentage shows what
                  portion of these keywords you included. Don't worry about perfect grammar - focus on demonstrating
                  your understanding of the concepts.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="how-often-practice">
                <AccordionTrigger>How often should I practice?</AccordionTrigger>
                <AccordionContent>
                  Consistency is key! Aim to blur at least one section per day. Use the spaced repetition
                  recommendations to review topics at optimal intervals. Focus more time on sections where you
                  scored below 70% - these need reinforcement.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="timer">
                <AccordionTrigger>Should I use the timer?</AccordionTrigger>
                <AccordionContent>
                  The timer is optional and can be disabled in settings. Some students find it motivating, while
                  others prefer to focus without time pressure. In the actual exam you'll be timed, so practicing
                  with the timer can help build speed and confidence.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="improve-score">
                <AccordionTrigger>How can I improve my scores?</AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Read the section thoroughly before attempting the blur</li>
                    <li>Pay special attention to bold terms and key concepts</li>
                    <li>Review your mistakes and the keywords you missed</li>
                    <li>Retry sections where you scored below 70%</li>
                    <li>Use the progress dashboard to identify weak topics</li>
                    <li>Practice regularly using spaced repetition</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="privacy">
                <AccordionTrigger>Is my data private?</AccordionTrigger>
                <AccordionContent>
                  Yes! Your submissions and personal information are stored securely and are only visible to you.
                  We never share your data with third parties. You can delete all your submissions at any time
                  from the settings page. Your data is encrypted in transit and at rest.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="foundation-vs-higher">
                <AccordionTrigger>What's the difference between Foundation and Higher?</AccordionTrigger>
                <AccordionContent>
                  Foundation and Higher refer to the two tiers of AQA GCSE Chemistry. Higher tier covers additional
                  content and expects deeper understanding. If you're not sure which tier you're taking, check with
                  your teacher. You can practice sections from both tiers - it's good to challenge yourself!
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Study Tips for Success</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">1. Active Recall is Key</h3>
                <p className="text-sm text-muted-foreground">
                  Blurring forces you to retrieve information from memory, which is proven to strengthen learning
                  more than re-reading notes.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">2. Embrace Mistakes</h3>
                <p className="text-sm text-muted-foreground">
                  Missing keywords shows you what to focus on. Review missed concepts immediately after each blur.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">3. Use Spaced Repetition</h3>
                <p className="text-sm text-muted-foreground">
                  Reviewing material at increasing intervals (e.g., 1 day, 3 days, 1 week, 2 weeks) is the most
                  efficient way to commit information to long-term memory.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">4. Practice Regularly</h3>
                <p className="text-sm text-muted-foreground">
                  Short daily sessions are more effective than long cramming sessions. Aim for 15-30 minutes per day.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Help;
