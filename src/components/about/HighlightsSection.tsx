import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

export function HighlightsSection() {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-2xl">
          <Sparkles className="h-8 w-8 text-primary" />
          Highlights
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-muted-foreground">
        <ul className="list-disc pl-6 space-y-1">
          <li>AI-powered personalized learning roadmaps</li>
          <li>Instant AI tutoring and Q&A</li>
          <li>Progress tracking and achievements</li>
          <li>Curated resources and interactive tasks</li>
        </ul>
      </CardContent>
    </Card>
  );
}
