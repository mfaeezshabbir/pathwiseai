"use client";
import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { RoadmapDisplay } from "@/components/dashboard/roadmap-display";
import { Button } from "@/components/ui/button";

export default function RoadmapDetailPage() {
  const pathname = usePathname();
  const id = pathname?.split("/").pop();
  const [roadmap, setRoadmap] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    try {
      const key = `savedRoadmap:${id}`;
      const cached = sessionStorage.getItem(key);
      if (cached) {
        setRoadmap(JSON.parse(cached));
        setLoading(false);
        return;
      }
    } catch (e) {
      // ignore storage errors and fallback to fetch
    }

    fetch(`/api/roadmap/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setRoadmap(data.roadmap || null);
      })
      .catch((err) => {
        console.error("Failed to load roadmap:", err);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!roadmap) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="space-y-4 text-center">
          <p>No roadmap found.</p>
          <Button onClick={() => router.push("/roadmaps")}>
            Back to Roadmaps
          </Button>
        </div>
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="mb-4 text-2xl font-bold">
        {roadmap.title || "My Roadmap"}
      </h1>
      <RoadmapDisplay
        roadmap={roadmap}
        onReset={() => router.push("/roadmaps")}
      />
    </main>
  );
}
