import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, CheckCircle2, XCircle, RotateCcw, Home } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface Submission {
  id: string;
  content: string;
  score: number | null;
  keywords_found: string[] | null;
  keywords_missed: string[] | null;
  created_at: string;
  sections: {
    id: string;
    title: string;
    spec_tag: string;
    learning_objectives: string[];
  } | null;
}

const Results = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [submission, setSubmission] = useState<Submission | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubmission = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/auth");
        return;
      }

      const { data } = await supabase
        .from("submissions")
        .select(`
          *,
          sections (
            id,
            title,
            spec_tag,
            learning_objectives
          )
        `)
        .eq("id", id)
        .single();

      if (data) {
        setSubmission(data as Submission);
      }
      setLoading(false);
    };

    fetchSubmission();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading results...</div>
      </div>
    );
  }

  if (!submission || !submission.sections) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card>
          <CardContent className="p-12">
            <p className="text-muted-foreground mb-4">Submission not found.</p>
            <Button onClick={() => navigate("/dashboard")}>Back to Dashboard</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const score = submission.score || 0;
  const scoreColor = score >= 70 ? "text-green-600" : score >= 50 ? "text-yellow-600" : "text-red-600";

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Button variant="ghost" onClick={() => navigate("/dashboard")} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>

        <Card className="mb-6 animate-fade-in text-center">
          <CardHeader>
            <Badge variant="outline" className="w-fit mx-auto mb-2">
              {submission.sections.spec_tag}
            </Badge>
            <CardTitle className="text-3xl mb-2">{submission.sections.title}</CardTitle>
            <CardDescription>
              Submitted on {new Date(submission.created_at).toLocaleString()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className={`text-7xl font-bold mb-4 ${scoreColor}`}>{score}%</div>
            <Progress value={score} className="h-3 mb-4" />
            <p className="text-muted-foreground">
              {score >= 70
                ? "Excellent work! You have a strong grasp of this topic."
                : score >= 50
                ? "Good effort! Review the missed concepts to improve further."
                : "Keep practicing! Focus on the key concepts you missed."}
            </p>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2 mb-6">
          {submission.keywords_found && submission.keywords_found.length > 0 && (
            <Card className="animate-slide-up">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-600">
                  <CheckCircle2 className="h-5 w-5" />
                  Keywords Found ({submission.keywords_found.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {submission.keywords_found.map((keyword, idx) => (
                    <Badge key={idx} variant="outline" className="border-green-600 text-green-600">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {submission.keywords_missed && submission.keywords_missed.length > 0 && (
            <Card className="animate-slide-up">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-600">
                  <XCircle className="h-5 w-5" />
                  Keywords Missed ({submission.keywords_missed.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {submission.keywords_missed.map((keyword, idx) => (
                    <Badge key={idx} variant="outline" className="border-red-600 text-red-600">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {submission.keywords_missed && submission.keywords_missed.length > 0 && (
          <Card className="mb-6 bg-muted/50 animate-fade-in">
            <CardHeader>
              <CardTitle>Review Suggestions</CardTitle>
              <CardDescription>Focus on these learning objectives:</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {submission.sections.learning_objectives.map((obj, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle>Your Answer</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-muted/50 p-6 rounded-lg whitespace-pre-wrap">
              {submission.content}
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4 mt-6">
          <Button
            variant="outline"
            size="lg"
            className="flex-1"
            onClick={() => navigate(`/blur/${submission.sections?.id}`)}
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Retry Exercise
          </Button>
          <Button
            size="lg"
            className="flex-1 bg-gradient-to-r from-primary to-secondary hover:opacity-90"
            onClick={() => navigate("/dashboard")}
          >
            <Home className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Results;
