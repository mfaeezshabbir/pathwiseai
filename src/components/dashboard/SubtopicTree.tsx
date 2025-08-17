import React from "react";
import type { RoadmapSubtopic } from "@/ai/flows/generate-roadmap";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

export default function SubtopicTree({
  subtopic,
  onOpen,
}: {
  subtopic: RoadmapSubtopic;
  onOpen: (s: RoadmapSubtopic) => void;
}) {
  return (
    <div className="ml-6 mt-2 flex flex-col items-start">
      <Button
        variant="ghost"
        className="mb-1 text-left"
        onClick={() => onOpen(subtopic)}
      >
        <ChevronRight className="mr-1 inline h-4 w-4" />
        {subtopic.name}
      </Button>
      {subtopic.subtopics && subtopic.subtopics.length > 0 && (
        <div className="ml-4 border-l-2 border-indigo-200 pl-2">
          {subtopic.subtopics.map((sub: RoadmapSubtopic, idx: number) => (
            <SubtopicTree key={idx} subtopic={sub} onOpen={onOpen} />
          ))}
        </div>
      )}
    </div>
  );
}
