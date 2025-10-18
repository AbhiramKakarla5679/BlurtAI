import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface TimelineEvent {
  year: number;
  scientist: string;
  title: string;
  description: string;
  evidence: string;
  practiceQuestion: string;
}

const timelineEvents: TimelineEvent[] = [
  {
    year: 1817,
    scientist: "Dobereiner",
    title: "Law of Triads",
    description: "Johann Wolfgang Döbereiner identified triads of elements with similar chemical properties. In each triad, the atomic weight of the middle element was approximately the average of the other two.",
    evidence: "Examples: Li, Na, K (alkali metals) and Cl, Br, I (halogens) formed triads with predictable patterns.",
    practiceQuestion: "Explain what Dobereiner's triads were and give one example of a triad."
  },
  {
    year: 1864,
    scientist: "Newlands",
    title: "Law of Octaves",
    description: "John Newlands arranged elements by atomic weight and noticed that every eighth element had similar properties, like musical octaves.",
    evidence: "Pattern repeated for lighter elements but broke down for heavier ones. Not widely accepted at the time.",
    practiceQuestion: "Why was Newlands' Law of Octaves rejected by other scientists?"
  },
  {
    year: 1869,
    scientist: "Mendeleev",
    title: "Periodic Table with Gaps",
    description: "Dmitri Mendeleev arranged elements by atomic weight but left gaps for undiscovered elements. He predicted their properties based on surrounding elements.",
    evidence: "Predicted gallium (eka-aluminium) and germanium (eka-silicon). When discovered, their properties matched his predictions perfectly.",
    practiceQuestion: "Explain how Mendeleev used gaps to predict new elements and why this proved his model was correct."
  },
  {
    year: 1913,
    scientist: "Moseley",
    title: "Ordered by Atomic Number",
    description: "Henry Moseley discovered that elements should be arranged by atomic number (number of protons) rather than atomic weight.",
    evidence: "Solved inconsistencies in Mendeleev's table where some elements appeared out of order (e.g., tellurium and iodine).",
    practiceQuestion: "Why did Moseley's arrangement by atomic number fix the problems in Mendeleev's table?"
  },
  {
    year: 1932,
    scientist: "Chadwick",
    title: "Discovery of the Neutron",
    description: "James Chadwick discovered the neutron, completing our understanding of atomic structure.",
    evidence: "Explained why atoms with the same number of protons could have different masses (isotopes).",
    practiceQuestion: "How did Chadwick's discovery of the neutron explain the existence of isotopes?"
  }
];

const PeriodicTableTimeline = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentEvent = timelineEvents[currentIndex];

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : timelineEvents.length - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev < timelineEvents.length - 1 ? prev + 1 : 0));
  };

  return (
    <Card className="my-8 border-2 border-primary/20">
      <CardHeader>
        <CardTitle className="text-2xl">⚛️ Interactive Timeline: Development of the Periodic Table</CardTitle>
        <CardDescription>Click through key moments in scientific history</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Timeline Bar */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-primary/20 -translate-y-1/2" />
          
          {/* Timeline Points */}
          <div className="relative flex justify-between mb-8">
            {timelineEvents.map((event, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`relative z-10 w-12 h-12 rounded-full border-4 transition-all ${
                  index === currentIndex
                    ? "bg-primary border-primary scale-125"
                    : "bg-background border-primary/40 hover:border-primary"
                }`}
                title={`${event.year} - ${event.scientist}`}
              >
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-medium whitespace-nowrap">
                  {event.year}
                </span>
              </button>
            ))}
          </div>

          {/* Event Details */}
          <div className="mt-16 p-6 bg-accent/50 rounded-lg">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold text-primary">{currentEvent.year}</h3>
                <p className="text-lg font-semibold">{currentEvent.scientist}</p>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">Practice Question</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Practice Question - {currentEvent.scientist} ({currentEvent.year})</DialogTitle>
                  </DialogHeader>
                  <div className="p-4 bg-accent/50 rounded-lg">
                    <p className="text-sm font-medium">{currentEvent.practiceQuestion}</p>
                  </div>
                  <p className="text-sm text-muted-foreground mt-4">
                    Use this as a blurting prompt to test your understanding!
                  </p>
                </DialogContent>
              </Dialog>
            </div>

            <h4 className="text-xl font-semibold mb-2">{currentEvent.title}</h4>
            <p className="mb-4">{currentEvent.description}</p>
            
            <div className="p-4 bg-background/50 rounded-lg">
              <p className="text-sm font-medium mb-1">Evidence & Impact:</p>
              <p className="text-sm text-muted-foreground">{currentEvent.evidence}</p>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-6">
            <Button onClick={goToPrevious} variant="outline">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>
            <span className="text-sm text-muted-foreground self-center">
              {currentIndex + 1} of {timelineEvents.length}
            </span>
            <Button onClick={goToNext} variant="outline">
              Next
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PeriodicTableTimeline;
