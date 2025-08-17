"use client";
import { useState, useEffect } from "react";
import type { GenerateRoadmapOutput } from "@/ai/flows/generate-roadmap";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { calculateProgress } from "@/components/roadmaps/display/utils";
import { RoadmapTreeView } from "./RoadmapTreeView";

type RoadmapDisplayProps = {
  roadmap: GenerateRoadmapOutput;
  onReset: () => void;
};

export function RoadmapDisplay({ roadmap, onReset }: RoadmapDisplayProps) {
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    if (roadmap && (roadmap as any).categories) {
      if ((roadmap as any).categories.length === 0) {
        toast({
          title: "Could not parse roadmap",
          description:
            "The AI returned an empty roadmap. Please try generating it again.",
          variant: "destructive",
        });
        onReset();
      } else {
        const initialState = (roadmap as any).categories.map((cat: any) => ({
          ...cat,
          subtopics: (cat.subtopics || []).map((sub: any) => ({
            ...sub,
            resources: (sub.resources || []).map((r: any) => ({
              ...r,
              completed: false,
            })),
          })),
        }));
        setCategories(initialState);
      }
    }
  }, [roadmap, onReset]);

  const handleToggleResource = (
    categoryIndex: number,
    subIndex: number,
    resourceIndex: number,
  ) => {
    setCategories((prev) => {
      const next = JSON.parse(JSON.stringify(prev));
      const res =
        next[categoryIndex].subtopics[subIndex].resources[resourceIndex];
      res.completed = !res.completed;
      return next;
    });
  };

  const { progress, completedResources, totalResources } =
    calculateProgress(categories);

  if (!roadmap) return null;

  return (
    <div className="space-y-8">
      <div className="flex justify-end">
        <Button onClick={onReset} variant="outline">
          <RefreshCw className="mr-2 h-4 w-4" />
          Create New Roadmap
        </Button>
      </div>
      <RoadmapTreeView roadmap={roadmap} />
    </div>
  );
}
