import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target } from "lucide-react";

export function WhatWeDoSection() {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-2xl">
          <Target className="h-8 w-8 text-primary" />
          What We Do
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-muted-foreground">
        <p>
          <strong>AI-Powered Roadmaps:</strong> Personalized learning paths
          tailored to your skills, goals, and schedule.
        </p>
        <p>
          <strong>Interactive Learning:</strong> Roadmaps are interactive guides
          with summaries, tasks, and curated resources.
        </p>
        <p>
          <strong>AI Tutoring:</strong> Get unstuck and deepen your
          understanding with an AI assistant.
        </p>
        <p>
          <strong>Gamified Progress:</strong> Track your progress, earn
          achievements, and build a portfolio of completed projects.
        </p>
      </CardContent>
    </Card>
  );
}
