import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Search, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Section {
  id: string;
  title: string;
  spec_tag: string;
  level: string;
  learning_objectives: string[];
}

const Sections = () => {
  const navigate = useNavigate();
  const [sections, setSections] = useState<Section[]>([]);
  const [filteredSections, setFilteredSections] = useState<Section[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [levelFilter, setLevelFilter] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/auth");
        return;
      }

      const { data } = await supabase
        .from("sections")
        .select("*")
        .order("spec_tag");

      if (data) {
        setSections(data);
        setFilteredSections(data);
      }
      setLoading(false);
    };

    checkAuth();
  }, [navigate]);

  useEffect(() => {
    let filtered = sections;

    if (searchQuery) {
      filtered = filtered.filter(
        (section) =>
          section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          section.spec_tag.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (levelFilter !== "all") {
      filtered = filtered.filter((section) => section.level === levelFilter);
    }

    setFilteredSections(filtered);
  }, [searchQuery, levelFilter, sections]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading sections...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Button variant="ghost" onClick={() => navigate("/dashboard")} className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
          <h1 className="text-4xl font-bold mb-2">Chemistry Sections</h1>
          <p className="text-muted-foreground">Browse and select topics to practice</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search sections..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={levelFilter} onValueChange={setLevelFilter}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Filter by level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="Foundation">Foundation</SelectItem>
              <SelectItem value="Higher">Higher</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredSections.map((section) => (
            <Card
              key={section.id}
              className="hover:shadow-lg transition-all cursor-pointer animate-fade-in hover:scale-[1.02]"
              onClick={() => navigate(`/section/${section.id}`)}
            >
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <Badge variant="outline" className="text-xs">
                    {section.spec_tag}
                  </Badge>
                  <Badge
                    variant={section.level === "Higher" ? "default" : "secondary"}
                    className="text-xs"
                  >
                    {section.level}
                  </Badge>
                </div>
                <CardTitle className="text-xl">{section.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  <span className="font-medium text-foreground">Learning Objectives:</span>
                  <ul className="mt-2 space-y-1">
                    {section.learning_objectives.slice(0, 2).map((obj, idx) => (
                      <li key={idx} className="text-sm flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>{obj}</span>
                      </li>
                    ))}
                    {section.learning_objectives.length > 2 && (
                      <li className="text-sm text-muted-foreground">
                        +{section.learning_objectives.length - 2} more...
                      </li>
                    )}
                  </ul>
                </CardDescription>
                <Button className="w-full mt-4">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Read Section
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredSections.length === 0 && (
          <Card className="text-center p-12">
            <CardContent>
              <p className="text-muted-foreground">No sections found matching your criteria.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Sections;
