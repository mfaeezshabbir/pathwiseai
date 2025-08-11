"use client";
import React, { useState } from "react";
import type { GenerateRoadmapOutput } from "@/ai/flows/generate-roadmap";
import { MyRoadmaps } from "@/components/profile/MyRoadmaps";
import { RoadmapGenerator } from "@/components/dashboard/roadmap-generator";
import { RoadmapDisplay } from "@/components/dashboard/roadmap-display";

// Example: Replace with real data fetching in production
const mockRoadmaps = [
  { title: "Advanced React and Next.js", progress: 75, modules: 15 },
  { title: "Python for Data Science", progress: 30, modules: 5 },
];

export default function RoadmapsPage() {
  // In a real app, fetch the user's roadmaps here
  const [roadmapData, setRoadmapData] = useState<GenerateRoadmapOutput | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleReset = () => {
    setRoadmapData(null);
  };

  return (
    <div className="mx-auto py-10 px-4 md:px-8 space-y-12">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight mb-2 text-indigo-700 dark:text-indigo-300">
          Roadmaps
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Create, view, and manage your personalized learning roadmaps. Start a
          new roadmap or continue where you left off.
        </p>
      </div>

      {/* Roadmap Generator or Display */}
      <div className="bg-white dark:bg-[#18181b] rounded-2xl shadow border border-gray-200 dark:border-gray-800 p-6">
        {!roadmapData ? (
          <RoadmapGenerator
            onRoadmapGenerated={setRoadmapData}
            setIsLoading={setIsLoading}
            isLoading={isLoading}
          />
        ) : (
          <RoadmapDisplay roadmap={roadmapData} onReset={handleReset} />
        )}
      </div>

      {/* My Saved Roadmaps */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Saved Roadmaps</h2>
        <MyRoadmaps roadmaps={mockRoadmaps} />
      </div>
    </div>
  );
}
