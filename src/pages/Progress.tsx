import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, TrendingUp, Target, Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Stats {
  totalAttempts: number;
  averageScore: number;
  topicScores: { [topic: string]: { avg: number; count: number } };
  recentImprovement: number;
}

interface Submission {
  score: number | null;
  sections: {
    title: string;
    spec_tag: string;
  } | null;
}

const Progress = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<Stats>({
    totalAttempts: 0,
    averageScore: 0,
    topicScores: {},
    recentImprovement: 0,
  });

  useEffect(() => {
    fetchProgress();
  }, []);

  const fetchProgress = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      navigate("/auth");
      return;
    }

    const { data: submissions } = await supabase
      .from("submissions")
      .select(`
        score,
        sections (
          title,
          spec_tag
        )
      `)
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (submissions) {
      const typedSubmissions = submissions as Submission[];
      const totalAttempts = typedSubmissions.length;
      const averageScore = totalAttempts > 0
        ? Math.round(typedSubmissions.reduce((acc, s) => acc + (s.score || 0), 0) / totalAttempts)
        : 0;

      // Calculate per-topic averages
      const topicScores: { [topic: string]: { scores: number[]; count: number } } = {};
      typedSubmissions.forEach((sub) => {
        if (sub.sections && sub.score !== null) {
          const topic = sub.sections.title;
          if (!topicScores[topic]) {
            topicScores[topic] = { scores: [], count: 0 };
          }
          topicScores[topic].scores.push(sub.score);
          topicScores[topic].count++;
        }
      });

      const formattedTopicScores: { [topic: string]: { avg: number; count: number } } = {};
      Object.entries(topicScores).forEach(([topic, data]) => {
        formattedTopicScores[topic] = {
          avg: Math.round(data.scores.reduce((a, b) => a + b, 0) / data.scores.length),
          count: data.count,
        };
      });

      // Calculate recent improvement (last 5 vs previous 5)
      let recentImprovement = 0;
      if (totalAttempts >= 10) {
        const recent5 = typedSubmissions.slice(0, 5).reduce((acc, s) => acc + (s.score || 0), 0) / 5;
        const previous5 = typedSubmissions.slice(5, 10).reduce((acc, s) => acc + (s.score || 0), 0) / 5;
        recentImprovement = Math.round(recent5 - previous5);
      }

      setStats({
        totalAttempts,
        averageScore,
        topicScores: formattedTopicScores,
        recentImprovement,
      });
    }

    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading progress...</div>
      </div>
    );
  }

  const sortedTopics = Object.entries(stats.topicScores).sort(([, a], [, b]) => a.avg - b.avg);
  const weakestTopics = sortedTopics.slice(0, 3);
  const strongestTopics = sortedTopics.slice(-3).reverse();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Button variant="ghost" onClick={() => navigate("/dashboard")} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Progress Dashboard</h1>
          <p className="text-muted-foreground">Track your improvement and identify areas to focus on</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Total Attempts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">{stats.totalAttempts}</div>
              <p className="text-sm text-muted-foreground mt-2">Practice sessions completed</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-secondary" />
                Average Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">{stats.averageScore}%</div>
              <p className="text-sm text-muted-foreground mt-2">Overall performance</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-accent" />
                Recent Trend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-4xl font-bold ${stats.recentImprovement >= 0 ? "text-green-600" : "text-red-600"}`}>
                {stats.recentImprovement > 0 ? "+" : ""}{stats.recentImprovement}%
              </div>
              <p className="text-sm text-muted-foreground mt-2">Last 5 vs previous 5</p>
            </CardContent>
          </Card>
        </div>

        {weakestTopics.length > 0 && (
          <Card className="mb-6 border-red-200 bg-red-50/50 dark:border-red-900 dark:bg-red-950/20">
            <CardHeader>
              <CardTitle className="text-red-700 dark:text-red-400">Areas to Focus On</CardTitle>
              <CardDescription>Topics where you could use more practice</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {weakestTopics.map(([topic, data]) => (
                  <div key={topic} className="flex items-center justify-between p-4 bg-background rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-semibold">{topic}</h3>
                      <p className="text-sm text-muted-foreground">{data.count} attempts</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-2xl font-bold text-red-600">{data.avg}%</div>
                      <Button size="sm" onClick={() => navigate("/sections")}>
                        Practice
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {strongestTopics.length > 0 && (
          <Card className="border-green-200 bg-green-50/50 dark:border-green-900 dark:bg-green-950/20">
            <CardHeader>
              <CardTitle className="text-green-700 dark:text-green-400">Your Strengths</CardTitle>
              <CardDescription>Topics you've mastered well</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {strongestTopics.map(([topic, data]) => (
                  <div key={topic} className="flex items-center justify-between p-4 bg-background rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-semibold">{topic}</h3>
                      <p className="text-sm text-muted-foreground">{data.count} attempts</p>
                    </div>
                    <Badge variant="default" className="text-lg px-4 py-2 bg-green-600">
                      {data.avg}%
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {stats.totalAttempts === 0 && (
          <Card className="text-center p-12">
            <CardContent>
              <p className="text-muted-foreground mb-4">No attempts yet. Start practicing to see your progress!</p>
              <Button onClick={() => navigate("/sections")}>Browse Sections</Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Progress;
