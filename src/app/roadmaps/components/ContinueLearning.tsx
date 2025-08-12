import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen } from "lucide-react";
import React from "react";

interface Roadmap {
  id: string;
  title: string;
  description: string;
  progress: number;
  difficulty: string;
}

interface ContinueLearningProps {
  inProgressRoadmaps: Roadmap[];
}

export function ContinueLearning({
  inProgressRoadmaps,
}: ContinueLearningProps) {
  if (inProgressRoadmaps.length === 0) return null;
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          Continue Learning
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {inProgressRoadmaps.slice(0, 2).map((roadmap) => (
            <Card
              key={roadmap.id}
              className="cursor-pointer transition-shadow hover:shadow-lg"
            >
              <CardContent className="p-4">
                <div className="mb-3 flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{roadmap.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {roadmap.description}
                    </p>
                  </div>
                  <Badge variant="secondary">{roadmap.difficulty}</Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{roadmap.progress}%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-gray-200">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all"
                      style={{ width: `${roadmap.progress}%` }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
