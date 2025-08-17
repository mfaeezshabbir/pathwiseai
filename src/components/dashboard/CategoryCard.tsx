import React from "react";
import type {
  RoadmapCategory,
  RoadmapSubtopic,
} from "@/ai/flows/generate-roadmap";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { BookOpen, ChevronRight, Code } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CategoryCard({
  category,
  onOpen,
}: {
  category: RoadmapCategory;
  onOpen: (c: RoadmapCategory) => void;
}) {
  return (
    <Card
      className="group transform cursor-pointer border-2 border-slate-200 bg-white transition-all duration-300 hover:-translate-y-2 hover:border-indigo-300 hover:shadow-xl"
      onClick={() => onOpen(category)}
    >
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3 text-xl font-bold transition-colors">
          <div className="rounded-lg bg-indigo-100 p-2 transition-colors group-hover:bg-indigo-200">
            <BookOpen className="h-6 w-6 text-indigo-600" />
          </div>
          {category.name}
        </CardTitle>
        <CardDescription className="leading-relaxed">
          {category.details}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {category.subtopics
            .slice(0, 3)
            .map((subtopic: RoadmapSubtopic, sIdx: number) => (
              <div key={sIdx} className="flex items-center gap-2 text-sm">
                <ChevronRight className="h-4 w-4 text-indigo-400" />
                <span className="truncate">{subtopic.name}</span>
              </div>
            ))}
          {category.subtopics.length > 3 && (
            <div className="text-xs font-medium">
              +{category.subtopics.length - 3} more topics
            </div>
          )}
          {category.projects.length > 0 && (
            <div className="border-t border-slate-100 pt-2">
              <div className="flex items-center gap-2 text-sm font-medium text-indigo-600">
                <Code className="h-4 w-4" />
                {category.projects.length} Project
                {category.projects.length > 1 ? "s" : ""}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
