import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Submission {
  id: string;
  score: number | null;
  created_at: string;
  sections: {
    title: string;
    spec_tag: string;
  } | null;
}

const History = () => {
  const navigate = useNavigate();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/auth");
        return;
      }

      const { data } = await supabase
        .from("submissions")
        .select(`
          id,
          score,
          created_at,
          sections (
            title,
            spec_tag
          )
        `)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (data) {
        setSubmissions(data as Submission[]);
      }
      setLoading(false);
    };

    fetchHistory();
  }, [navigate]);

  const getScoreTrend = (currentIndex: number) => {
    if (currentIndex === submissions.length - 1) return null;

    const currentScore = submissions[currentIndex].score || 0;
    const previousScore = submissions[currentIndex + 1].score || 0;

    if (currentScore > previousScore) return "up";
    if (currentScore < previousScore) return "down";
    return "same";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading history...</div>
      </div>
    );
  }

  const averageScore =
    submissions.length > 0
      ? Math.round(
          submissions.reduce((acc, sub) => acc + (sub.score || 0), 0) / submissions.length
        )
      : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Button variant="ghost" onClick={() => navigate("/dashboard")} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Your Revision History</h1>
          <p className="text-muted-foreground">Track your progress and improvement over time</p>
        </div>

        {submissions.length > 0 && (
          <Card className="mb-6 animate-fade-in">
            <CardHeader>
              <CardTitle>Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-primary/10 rounded-lg">
                  <div className="text-3xl font-bold text-primary">{submissions.length}</div>
                  <div className="text-sm text-muted-foreground">Total Attempts</div>
                </div>
                <div className="text-center p-4 bg-secondary/10 rounded-lg">
                  <div className="text-3xl font-bold text-secondary">{averageScore}%</div>
                  <div className="text-sm text-muted-foreground">Average Score</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {submissions.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-muted-foreground mb-4">No submissions yet. Start practicing!</p>
              <Button onClick={() => navigate("/sections")}>Browse Sections</Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {submissions.map((submission, index) => {
              const trend = getScoreTrend(index);
              const score = submission.score || 0;

              return (
                <Card
                  key={submission.id}
                  className="hover:shadow-md transition-all cursor-pointer animate-fade-in hover:scale-[1.01]"
                  onClick={() => navigate(`/results/${submission.id}`)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline" className="text-xs">
                            {submission.sections?.spec_tag}
                          </Badge>
                          {trend === "up" && (
                            <Badge variant="default" className="bg-green-600 text-xs">
                              <TrendingUp className="h-3 w-3 mr-1" />
                              Improved
                            </Badge>
                          )}
                          {trend === "down" && (
                            <Badge variant="destructive" className="text-xs">
                              <TrendingDown className="h-3 w-3 mr-1" />
                              Lower
                            </Badge>
                          )}
                          {trend === "same" && (
                            <Badge variant="secondary" className="text-xs">
                              <Minus className="h-3 w-3 mr-1" />
                              Same
                            </Badge>
                          )}
                        </div>
                        <h3 className="font-semibold text-lg mb-1">
                          {submission.sections?.title || "Unknown Section"}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {new Date(submission.created_at).toLocaleString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <div
                          className={`text-4xl font-bold ${
                            score >= 70
                              ? "text-green-600"
                              : score >= 50
                              ? "text-yellow-600"
                              : "text-red-600"
                          }`}
                        >
                          {score}%
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
