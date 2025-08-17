import React from "react";
import type { RoadmapCategory } from "@/ai/flows/generate-roadmap";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Target, ChevronRight, Code, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function CategoryDialog({
  category,
  onOpenSubtopic,
}: {
  category: RoadmapCategory | null;
  onOpenSubtopic: (s: any) => void;
}) {
  if (!category) return null;
  return (
    <DialogContent className="max-h-[80vh] max-w-4xl overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-3 text-2xl font-bold">
          <div className="rounded-lg bg-indigo-100 p-2">
            <Target className="h-6 w-6 text-indigo-600" />
          </div>
          {category.name}
        </DialogTitle>
        <DialogDescription className="text-lg">
          {category.details}
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-6">
        <div>
          <h3 className="mb-4 flex items-center gap-2 text-xl font-semibold">
            <Target className="h-5 w-5 text-indigo-600" />
            Learning Topics
          </h3>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {category.subtopics.map((sub, i) => (
              <Button
                key={i}
                variant="outline"
                className="h-auto justify-start border-slate-200 p-4 text-left hover:border-indigo-300"
                onClick={() => onOpenSubtopic(sub)}
              >
                <div className="flex flex-col items-start gap-1">
                  <div className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-indigo-500" />
                    <span className="font-medium">{sub.name}</span>
                  </div>
                  <span className="w-full bg-red-400 text-xs">
                    {sub.details}
                  </span>
                </div>
              </Button>
            ))}
          </div>
        </div>
        {category.projects && category.projects.length > 0 && (
          <div>
            <h3 className="mb-4 flex items-center gap-2 text-xl font-semibold">
              <Code className="h-5 w-5 text-indigo-600" />
              Practical Projects
            </h3>
            <div className="space-y-4">
              {category.projects.map((proj, i) => (
                <div
                  key={i}
                  className="rounded-lg border border-slate-200 p-6 transition-shadow hover:shadow-md"
                >
                  <div className="mb-3 flex items-start justify-between gap-4">
                    <h4 className="text-lg font-semibold">{proj.title}</h4>
                    <Badge
                      className={`border-green-200 bg-green-100 font-medium text-green-700`}
                    >
                      {proj.difficulty}
                    </Badge>
                  </div>
                  <p className="mb-3 leading-relaxed">{proj.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {proj.tags.map((tag, tIdx) => (
                      <Badge
                        key={tIdx}
                        variant="outline"
                        className="border-slate-300 text-xs"
                      >
                        {tag}
                      </Badge>
                    ))}
                    {proj.saved && (
                      <Badge className="border-green-200 bg-green-100 text-green-700">
                        <CheckCircle className="mr-1 h-3 w-3" />
                        Saved
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </DialogContent>
  );
}
