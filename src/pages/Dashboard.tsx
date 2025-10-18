import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Clock, TrendingUp, LogOut, Settings as SettingsIcon, HelpCircle, Target, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

interface Profile {
  full_name: string | null;
}

interface RecentSubmission {
  id: string;
  score: number | null;
  created_at: string;
  sections: {
    title: string;
    id: string;
  } | null;
}

interface TopicRecommendation {
  topic: string;
  sectionId: string;
  avgScore: number;
  attempts: number;
  lastAttempt: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [recentScores, setRecentScores] = useState<RecentSubmission[]>([]);
  const [recommendations, setRecommendations] = useState<TopicRecommendation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate("/auth");
        return;
      }

      // Fetch profile
      const { data: profileData } = await supabase
        .from("profiles")
        .select("full_name")
        .eq("id", user.id)
        .single();

      if (profileData) {
        setProfile(profileData);
      }

      // Fetch recent submissions
      const { data: submissions } = await supabase
        .from("submissions")
        .select(`
          id,
          score,
          created_at,
          sections (
            title,
            id
          )
        `)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(5);

      if (submissions) {
        setRecentScores(submissions as RecentSubmission[]);
        
        // Calculate topic recommendations (weakest topics)
        const topicScores: { [topic: string]: { scores: number[]; sectionId: string; lastAttempt: string } } = {};
        
        submissions.forEach((sub) => {
          if (sub.sections && sub.score !== null) {
            const topic = sub.sections.title;
            if (!topicScores[topic]) {
              topicScores[topic] = { 
                scores: [], 
                sectionId: sub.sections.id,
                lastAttempt: sub.created_at 
              };
            }
            topicScores[topic].scores.push(sub.score);
            // Keep most recent attempt date
            if (new Date(sub.created_at) > new Date(topicScores[topic].lastAttempt)) {
              topicScores[topic].lastAttempt = sub.created_at;
            }
          }
        });

        const recs = Object.entries(topicScores)
          .map(([topic, data]) => ({
            topic,
            sectionId: data.sectionId,
            avgScore: Math.round(data.scores.reduce((a, b) => a + b, 0) / data.scores.length),
            attempts: data.scores.length,
            lastAttempt: data.lastAttempt
          }))
          .sort((a, b) => a.avgScore - b.avgScore)
          .slice(0, 3);
        
        setRecommendations(recs);
      }

      setLoading(false);
    };

    checkAuth();
  }, [navigate]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast.success("Signed out successfully");
    navigate("/auth");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2 animate-fade-in">
              Welcome back, {profile?.full_name || "Student"}! 👋
            </h1>
            <p className="text-muted-foreground">Ready to continue your chemistry revision?</p>
          </div>
          <Button variant="outline" onClick={handleSignOut}>
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8 animate-slide-up">
          <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate("/sections")}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                Browse Sections
              </CardTitle>
              <CardDescription>Explore chemistry topics</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">View All Sections</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-secondary" />
                Recent Activity
              </CardTitle>
              <CardDescription>Your latest attempts</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full" onClick={() => navigate("/history")}>
                View History
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate("/progress")}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-accent" />
                Progress
              </CardTitle>
              <CardDescription>Track your improvement</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">View Analytics</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate("/settings")}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <SettingsIcon className="h-5 w-5 text-muted-foreground" />
                Settings
              </CardTitle>
              <CardDescription>Preferences & profile</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">Manage Account</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate("/help")}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-muted-foreground" />
                Help & Guide
              </CardTitle>
              <CardDescription>How to use ChemBlur</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">Learn More</Button>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {recentScores.length > 0 && (
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest practice sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentScores.map((submission) => (
                    <div
                      key={submission.id}
                      className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors cursor-pointer"
                      onClick={() => navigate(`/results/${submission.id}`)}
                    >
                      <div className="flex-1">
                        <p className="font-medium text-sm">{submission.sections?.title || "Unknown"}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(submission.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      {submission.score !== null && (
                        <Badge variant={submission.score >= 70 ? "default" : "secondary"}>
                          {submission.score}%
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {recommendations.length > 0 && (
            <Card className="animate-fade-in border-orange-200 bg-orange-50/50 dark:border-orange-900 dark:bg-orange-950/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-orange-600" />
                  Topics to Review
                </CardTitle>
                <CardDescription>Practice these topics to improve</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recommendations.map((rec) => (
                    <div
                      key={rec.sectionId}
                      className="flex items-center justify-between p-3 bg-background rounded-lg hover:shadow-sm transition-shadow cursor-pointer"
                      onClick={() => navigate(`/blur-practice/${rec.sectionId}/0`)}
                    >
                      <div className="flex-1">
                        <p className="font-medium text-sm">{rec.topic}</p>
                        <p className="text-xs text-muted-foreground">
                          Average: {rec.avgScore}% • {rec.attempts} attempts
                        </p>
                      </div>
                      <Button size="sm" variant="outline">
                        Practice
                        <ArrowRight className="ml-2 h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
