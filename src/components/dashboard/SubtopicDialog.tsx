import React from "react";
import type {
  RoadmapSubtopic,
  RoadmapProject,
  RoadmapResource,
} from "@/ai/flows/generate-roadmap";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { BookOpen, Link, Play, Layers } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function SubtopicDialog({
  subtopic,
}: {
  subtopic: RoadmapSubtopic | null;
}) {
  if (!subtopic) return null;
  return (
    <DialogContent className="max-h-[80vh] max-w-3xl overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-3 text-2xl font-bold">
          <div className="rounded-lg bg-indigo-100 p-2">
            <Layers className="h-6 w-6 text-indigo-600" />
          </div>
          {subtopic.name}
        </DialogTitle>
        <DialogDescription className="text-lg">
          {subtopic.details}
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-6">
        {subtopic.resources && subtopic.resources.length > 0 && (
          <div>
            <h3 className="mb-4 flex items-center gap-2 text-xl font-semibold">
              <BookOpen className="h-5 w-5 text-indigo-600" />
              Recommended Resources
            </h3>
            <div className="space-y-3">
              {subtopic.resources.map((res: RoadmapResource, i: number) => (
                <div
                  key={i}
                  className="flex items-center justify-between gap-4 rounded-lg border p-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="rounded bg-indigo-50 p-2">
                      <Link className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div>
                      <div className="font-medium">{res.title}</div>
                      <div className="mt-1 w-72 truncate text-xs">
                        {res.url}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {res.type}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-indigo-600"
                    >
                      Open
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {subtopic.projects && subtopic.projects.length > 0 && (
          <div>
            <h3 className="mb-4 flex items-center gap-2 text-xl font-semibold">
              <Play className="h-5 w-5 text-indigo-600" />
              Practice Projects
            </h3>
            <div className="space-y-4">
              {subtopic.projects.map((proj: RoadmapProject, idx: number) => (
                <div key={idx} className="rounded-lg border bg-white p-5">
                  <div className="mb-2 flex items-center justify-between">
                    <h4 className="font-semibold">{proj.title}</h4>
                    <Badge className="border-amber-200 bg-amber-100 font-medium text-amber-700">
                      {proj.difficulty}
                    </Badge>
                  </div>
                  <p className=" ">{proj.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* If subtopic has nested subtopics, show them as related next steps */}
        {subtopic.subtopics && subtopic.subtopics.length > 0 && (
          <div>
            <h3 className="mb-3 text-lg font-semibold">Related Topics</h3>
            <div className="flex flex-col gap-2">
              {subtopic.subtopics.map((s: RoadmapSubtopic, i: number) => (
                <Button
                  key={i}
                  variant="ghost"
                  className="justify-start text-left"
                >
                  {s.name}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </DialogContent>
  );
}
