import { Brain, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import React from "react";

interface HeroSectionProps {
  onCreate: () => void;
  onExplore: () => void;
  isLoading: boolean;
}

export function HeroSection({
  onCreate,
  onExplore,
  isLoading,
}: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-600 py-20 sm:py-28">
      {/* Glassy, blurred, layered background shapes */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-pink-400/30 blur-3xl" />
        <div className="absolute left-0 top-1/3 h-80 w-80 -translate-x-1/3 -translate-y-1/2 rounded-full bg-indigo-400/20 blur-2xl" />
        <div className="absolute bottom-0 right-0 h-72 w-72 translate-x-1/4 rounded-full bg-purple-400/20 blur-2xl" />
        <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" />
      </div>
      <div className="relative z-10 mx-auto max-w-4xl px-6">
        <div className="flex flex-col items-center rounded-3xl bg-white/10 p-10 text-center shadow-xl ring-1 ring-white/20 backdrop-blur-md sm:p-16">
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-gradient-to-br from-white/60 to-white/10 p-5 shadow-lg backdrop-blur-md">
              <Brain className="h-14 w-14 text-white drop-shadow-lg" />
            </div>
          </div>
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-white drop-shadow-lg sm:text-6xl">
            AI-Powered Learning
            <span className="block bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
              Roadmaps
            </span>
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg font-medium leading-8 text-indigo-100/90 sm:text-2xl">
            Create personalized learning paths tailored to your goals, skill
            level, and schedule.
            <br className="hidden sm:block" />
            <span className="text-white/80">
              Let AI guide your journey to mastery.
            </span>
          </p>
          <div className="mx-auto flex w-full max-w-md flex-col justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="w-full bg-white/90 font-bold text-indigo-700 shadow-md hover:bg-white sm:w-auto"
              onClick={onCreate}
              disabled={isLoading}
            >
              <Plus className="mr-2 h-5 w-5" />
              Create New Roadmap
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full border-white/40 font-bold text-white hover:bg-white/10 hover:text-yellow-200 sm:w-auto"
              onClick={onExplore}
            >
              <Search className="mr-2 h-5 w-5" />
              Explore Roadmaps
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
