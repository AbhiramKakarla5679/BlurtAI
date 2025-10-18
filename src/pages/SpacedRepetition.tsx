import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Calendar, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface RecommendedSection {
  id: string;
  title: string;
  spec_tag: string;
  level: string;
  lastAttemptScore: number | null;
  lastAttemptDate: Date | null;
  attemptCount: number;
  priority: "high" | "medium" | "low";
}

const SpacedRepetition = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [recommendations, setRecommendations] = useState<RecommendedSection[]>([]);

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const fetchRecommendations = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      navigate("/auth");
      return;
    }

    // Get all sections
    const { data: sections } = await supabase
      .from("sections")
      .select("*");

    // Get user's submissions
    const { data: submissions } = await supabase
      .from("submissions")
      .select("section_id, score, created_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (sections && submissions) {
      const sectionMap = new Map<string, {
        lastScore: number | null;
        lastDate: Date | null;
        count: number;
      }>();

      // Build submission history per section
      submissions.forEach(sub => {
        if (!sectionMap.has(sub.section_id)) {
          sectionMap.set(sub.section_id, {
            lastScore: sub.score,
            lastDate: new Date(sub.created_at),
            count: 1,
          });
        } else {
          const existing = sectionMap.get(sub.section_id)!;
          existing.count++;
        }
      });

      // Calculate recommendations
      const recs: RecommendedSection[] = sections.map(section => {
        const history = sectionMap.get(section.id);
        const lastScore = history?.lastScore || null;
        const lastDate = history?.lastDate || null;
        const attemptCount = history?.count || 0;

        // Calculate priority based on score and recency
        let priority: "high" | "medium" | "low" = "medium";
        
        if (lastScore === null) {
          priority = "high"; // Never attempted
        } else if (lastScore < 60) {
          priority = "high"; // Struggled with this topic
        } else if (lastScore < 80) {
          priority = "medium"; // Needs reinforcement
        } else if (lastDate && (Date.now() - lastDate.getTime()) > 7 * 24 * 60 * 60 * 1000) {
          priority = "medium"; // Long time since last attempt
        } else {
          priority = "low"; // Recently done well
        }

        return {
          id: section.id,
          title: section.title,
          spec_tag: section.spec_tag,
          level: section.level,
          lastAttemptScore: lastScore,
          lastAttemptDate: lastDate,
          attemptCount,
          priority,
        };
      });

      // Sort by priority
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      recs.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

      setRecommendations(recs);
    }

    setLoading(false);
  };

  const handleMarkReviewed = (sectionId: string) => {
    toast.success("Marked as reviewed!");
    navigate(`/section/${sectionId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading recommendations...</div>
      </div>
    );
  }

  const highPriority = recommendations.filter(r => r.priority === "high");
  const mediumPriority = recommendations.filter(r => r.priority === "medium");
  const lowPriority = recommendations.filter(r => r.priority === "low");

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Button variant="ghost" onClick={() => navigate("/dashboard")} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 flex items-center gap-2">
            <Calendar className="h-8 w-8" />
            Review Schedule
          </h1>
          <p className="text-muted-foreground">
            Optimized spaced repetition recommendations based on your performance
          </p>
        </div>

        {highPriority.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-red-600 dark:text-red-400">
              High Priority Review
            </h2>
            <div className="space-y-4">
              {highPriority.map((rec) => (
                <Card key={rec.id} className="border-red-200 bg-red-50/50 dark:border-red-900 dark:bg-red-950/20">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline">{rec.spec_tag}</Badge>
                          <Badge variant={rec.level === "Higher" ? "default" : "secondary"}>
                            {rec.level}
                          </Badge>
                          <Badge variant="destructive">High Priority</Badge>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">{rec.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {rec.attemptCount === 0
                            ? "Never attempted"
                            : `Last score: ${rec.lastAttemptScore}% • ${rec.attemptCount} attempts`}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={() => handleMarkReviewed(rec.id)}>
                          Review Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {mediumPriority.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-yellow-600 dark:text-yellow-400">
              Medium Priority Review
            </h2>
            <div className="space-y-4">
              {mediumPriority.map((rec) => (
                <Card key={rec.id} className="border-yellow-200 bg-yellow-50/50 dark:border-yellow-900 dark:bg-yellow-950/20">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline">{rec.spec_tag}</Badge>
                          <Badge variant={rec.level === "Higher" ? "default" : "secondary"}>
                            {rec.level}
                          </Badge>
                        </div>
                        <h3 className="text-lg font-semibold mb-1">{rec.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          Last score: {rec.lastAttemptScore}% • {rec.attemptCount} attempts
                        </p>
                      </div>
                      <Button variant="outline" onClick={() => handleMarkReviewed(rec.id)}>
                        Review
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {lowPriority.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-green-600 dark:text-green-400">
              Well Practiced
            </h2>
            <div className="space-y-4">
              {lowPriority.slice(0, 5).map((rec) => (
                <Card key={rec.id} className="border-green-200 bg-green-50/50 dark:border-green-900 dark:bg-green-950/20">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline">{rec.spec_tag}</Badge>
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        </div>
                        <h3 className="text-lg font-semibold mb-1">{rec.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          Last score: {rec.lastAttemptScore}% • {rec.attemptCount} attempts
                        </p>
                      </div>
                      <Button variant="ghost" onClick={() => navigate(`/section/${rec.id}`)}>
                        View
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpacedRepetition;
