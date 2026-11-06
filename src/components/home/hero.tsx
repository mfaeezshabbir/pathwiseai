"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Sparkles } from "lucide-react";

import { roadmapHref } from "@/lib/roadmap";
import { Button } from "@/components/ui/button";
import { RoadmapPreview } from "./roadmap-preview";

const popular = ["React", "Python", "Machine Learning", "System Design", "Rust"];

export function Hero() {
  const router = useRouter();
  const [skill, setSkill] = useState("");

  const go = (value: string) => {
    const v = value.trim();
    router.push(v ? roadmapHref(v) : "/roadmaps/new");
  };

  return (
    <section className="relative isolate overflow-hidden">
      <div className="bg-grid mask-fade-b absolute inset-0 -z-10" />
      <div className="bg-glow absolute inset-x-0 top-0 -z-10 h-[600px]" />

      <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 pt-14 pb-20 sm:px-6 sm:pt-20 lg:grid-cols-[1.1fr_1fr] lg:pt-24">
        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-1.5 rounded-full border bg-background/70 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
            <Sparkles className="size-3.5 text-primary" />
            AI-generated learning roadmaps
          </span>

          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            Learn anything,{" "}
            <span className="font-display font-normal text-primary italic">
              one clear step
            </span>{" "}
            at a time.
          </h1>

          <p className="mt-5 max-w-xl text-lg text-pretty text-muted-foreground">
            Tell PathwiseAI what you want to learn. Get a structured roadmap
            with curated resources and hands-on projects, tailored to your
            level and schedule.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              go(skill);
            }}
            className="mt-8 flex max-w-lg flex-col gap-2 rounded-2xl border bg-card p-2 shadow-sm focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/25 sm:flex-row"
          >
            <label htmlFor="hero-skill" className="sr-only">
              What do you want to learn?
            </label>
            <input
              id="hero-skill"
              value={skill}
              onChange={(e) => setSkill(e.target.value)}
              placeholder="What do you want to learn?"
              className="h-11 flex-1 bg-transparent px-3 text-base outline-none placeholder:text-muted-foreground"
              autoComplete="off"
            />
            <Button type="submit" size="lg" className="h-11 rounded-xl px-5">
              Build my roadmap
              <ArrowRight />
            </Button>
          </form>

          <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
            <span className="text-muted-foreground">Popular:</span>
            {popular.map((p) => (
              <button
                key={p}
                onClick={() => go(p)}
                className="rounded-full border bg-background/60 px-3 py-1 text-xs font-medium transition-colors hover:border-primary/40 hover:text-primary"
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <div
          className="animate-fade-up lg:pl-6"
          style={{ animationDelay: "120ms" }}
        >
          <RoadmapPreview />
        </div>
      </div>
    </section>
  );
}
