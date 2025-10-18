import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, BookOpen, PlayCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { sectionsData, TopicSection, Subsection } from "@/data/sectionsData";
import SectionContent from "@/components/SectionContent";
import ColorLegend from "@/components/ColorLegend";
import PeriodicTableTimeline from "@/components/PeriodicTableTimeline";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const TopicView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [topic, setTopic] = useState<TopicSection | null>(null);
  const [openSections, setOpenSections] = useState<string[]>([]);

  useEffect(() => {
    const foundTopic = sectionsData.find((t) => t.id === id);
    setTopic(foundTopic || null);
    
    // Auto-open first subsection if ready
    if (foundTopic && foundTopic.status === "ready" && foundTopic.subsections.length > 0) {
      setOpenSections([foundTopic.subsections[0].id]);
    }
  }, [id]);

  const toggleSection = (sectionId: string) => {
    setOpenSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const startBlurPractice = (subsectionId: string) => {
    navigate(`/blur-practice/${id}/${subsectionId}`);
  };

  if (!topic) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8">
          <CardContent>
            <p className="text-muted-foreground">Topic not found</p>
            <Button onClick={() => navigate("/sections")} className="mt-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Topics
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Coming soon topics
  if (topic.status === "coming_soon") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <Button variant="ghost" onClick={() => navigate("/sections")} className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Topics
          </Button>

          <Card className="mt-8">
            <CardHeader className="text-center pb-4">
              <Badge variant="outline" className="w-fit mx-auto mb-4">
                Coming Soon
              </Badge>
              <CardTitle className="text-3xl mb-2">{topic.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-6 pt-4">
              <div className="p-8 bg-muted/50 rounded-lg">
                <p className="text-2xl font-semibold mb-2">Nothing here — please wait for update</p>
                <p className="text-muted-foreground">
                  This topic will be populated from your revision notes (PDFs) soon.
                </p>
                <p className="text-muted-foreground mt-2">
                  Use <span className="font-semibold text-primary">Atomic structure & periodic table</span> for practice now.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={() => navigate("/topic/atomic-structure")}>
                  <BookOpen className="mr-2 h-4 w-4" />
                  Go to Atomic Structure
                </Button>
                <Button variant="outline" onClick={() => navigate("/admin/import")}>
                  Import This Topic
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Ready topics
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Button variant="ghost" onClick={() => navigate("/sections")} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Topics
        </Button>

        <div className="mb-8">
          <Badge variant="default" className="mb-2">Ready to Practice</Badge>
          <h1 className="text-4xl font-bold mb-2">{topic.title}</h1>
          <p className="text-muted-foreground">
            {topic.subsections.length} subsections • Active recall blurting practice
          </p>
        </div>

        <ColorLegend />

        {/* Show timeline only for atomic structure topic */}
        {id === "atomic-structure" && <PeriodicTableTimeline />}

        {/* Notes Section - All content first */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">📚 Study Notes</h2>
          <div className="space-y-4">
            {topic.subsections.map((subsection: Subsection) => (
              <Card key={subsection.id} className="overflow-hidden">
                <Collapsible
                  open={openSections.includes(subsection.id)}
                  onOpenChange={() => toggleSection(subsection.id)}
                >
                  <CardHeader className="cursor-pointer hover:bg-accent/50 transition-colors">
                    <CollapsibleTrigger asChild>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xl">{subsection.title}</CardTitle>
                        <svg
                          className={`h-5 w-5 transition-transform ${
                            openSections.includes(subsection.id) ? "transform rotate-180" : ""
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
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
          </div>
        </div>

        {/* Practice Section - After all notes */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">✍️ Blurting Practice</h2>
          <div className="space-y-4">
            {topic.subsections.map((subsection: Subsection) => (
              <Card key={`practice-${subsection.id}`} className="overflow-hidden">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{subsection.title}</CardTitle>
                    <Badge variant="outline" className="text-xs">
                      {subsection.practice_items.length} practice items
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="p-4 bg-primary/5 rounded-lg border-l-4 border-primary">
                    <h4 className="font-semibold mb-2">🎯 Ready to test yourself?</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Practice active recall (blurting) with randomized prompts
                    </p>
                    <Button onClick={() => startBlurPractice(subsection.id)} className="w-full sm:w-auto">
                      <PlayCircle className="mr-2 h-4 w-4" />
                      Start Blur Practice
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicView;
