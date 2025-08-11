import React from "react";
import type { GenerateRoadmapOutput } from "@/ai/flows/generate-roadmap";
import { RoadmapGenerator } from "@/components/dashboard/roadmap-generator";
import { RoadmapDisplay } from "@/components/dashboard/roadmap-display";

interface Props {
  roadmapData: GenerateRoadmapOutput | null;
  setRoadmapData: (data: GenerateRoadmapOutput | null) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  error: string | null;
  setError: (err: string | null) => void;
  onReset: () => void;
}

export function RoadmapGeneratorCard({
  roadmapData,
  setRoadmapData,
  isLoading,
  setIsLoading,
  error,
  setError,
  onReset,
}: Props) {
  return (
    <div className="rounded-2xl">
      {error && (
        <div className="mb-4 rounded bg-red-100 px-4 py-2 text-red-700 dark:bg-red-900 dark:text-red-200">
          {error}
        </div>
      )}
      {!roadmapData ? (
        <RoadmapGenerator
          onRoadmapGenerated={setRoadmapData}
          setIsLoading={setIsLoading}
          isLoading={isLoading}
        />
      ) : (
        <RoadmapDisplay roadmap={roadmapData} onReset={onReset} />
      )}
    </div>
  );
}
