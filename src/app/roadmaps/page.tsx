"use client";
import React, { useState } from "react";
import type { GenerateRoadmapOutput } from "@/ai/flows/generate-roadmap";
import { RoadmapSidebar } from "@/components/roadmaps/RoadmapSidebar";
import { RoadmapGeneratorCard } from "@/components/roadmaps/RoadmapGeneratorCard";
import { RoadmapListCard } from "@/components/roadmaps/RoadmapListCard";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Example: Replace with real data fetching in production
const mockRoadmaps = [
  { title: "Advanced React and Next.js", progress: 75, modules: 15 },
  { title: "Python for Data Science", progress: 30, modules: 5 },
];

export default function RoadmapsPage() {
  const [roadmapData, setRoadmapData] = useState<GenerateRoadmapOutput | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const handleReset = () => setRoadmapData(null);

  const handleNewRoadmap = () => {
    setRoadmapData(null);
    setOpen(true);
  };

  const handleRoadmapGenerated = (data: GenerateRoadmapOutput | null) => {
    setRoadmapData(data);
    setOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50 dark:from-[#18181b] dark:to-[#232336]">
      {/* Sidebar */}

      {/* Main Content */}
      <main className="flex flex-1 flex-col gap-8 px-6 py-10 md:px-16">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-indigo-700 dark:text-indigo-300">
              Roadmaps
            </h1>
            <p className="mt-2 max-w-2xl text-lg text-muted-foreground">
              Create, view, and manage your personalized learning roadmaps.
            </p>
          </div>
          <button
            className="rounded-lg bg-indigo-600 px-6 py-3 text-white shadow transition hover:bg-indigo-700"
            onClick={handleNewRoadmap}
            disabled={isLoading}
          >
            + New Roadmap
          </button>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Generator/Display Card */}
          <div className="flex-1">
            {roadmapData ? (
              <RoadmapGeneratorCard
                roadmapData={roadmapData}
                setRoadmapData={setRoadmapData}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                error={error}
                setError={setError}
                onReset={handleReset}
              />
            ) : (
              <div className="flex h-full items-center justify-center text-muted-foreground">
                No roadmap selected. Click "New Roadmap" to create one.
              </div>
            )}
          </div>
          {/* Saved Roadmaps Card */}
          <div className="w-full lg:w-[420px]">
            <RoadmapListCard roadmaps={mockRoadmaps} />
          </div>
        </div>
      </main>
      {/* Roadmap Generator Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl">
          <RoadmapGeneratorCard
            roadmapData={null}
            setRoadmapData={handleRoadmapGenerated}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            error={error}
            setError={setError}
            onReset={() => setOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
