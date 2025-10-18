import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ColorLegend = () => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-lg">📖 Color Code Guide</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded"></div>
            <span className="text-sm">Definitions & Headings</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span className="text-sm">Key Facts & Examples</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-teal-500 rounded"></div>
            <span className="text-sm">Examples & Worked Solutions</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-400 rounded"></div>
            <span className="text-sm">Exam Tips</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 rounded"></div>
            <span className="text-sm">Warnings & Safety</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-muted rounded"></div>
            <span className="text-sm">Tables & Data</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ColorLegend;
