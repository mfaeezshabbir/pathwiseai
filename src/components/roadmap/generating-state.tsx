"use client";

import { useEffect, useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { LogoMark } from "@/components/layout/logo";

const phases = [
  "Mapping the core concepts",
  "Ordering topics from fundamentals to advanced",
  "Curating docs, videos and courses",
  "Designing hands-on projects",
  "Polishing your roadmap",
];

export function GeneratingState({ skill }: { skill: string }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setPhase((p) => Math.min(p + 1, phases.length - 1)),
      4500,
    );
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="mx-auto flex max-w-md flex-col items-center py-10 text-center"
      role="status"
      aria-live="polite"
    >
      <div className="relative">
        <span className="absolute inset-0 animate-ping rounded-2xl bg-primary/25" />
        <LogoMark className="relative size-14" />
      </div>
      <h2 className="mt-8 text-2xl font-semibold tracking-tight">
        Building your{" "}
        <span className="font-display font-normal text-primary italic">
          {skill}
        </span>{" "}
        roadmap
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">
        This usually takes 20–40 seconds. Hang tight.
      </p>

      <ol className="mt-10 w-full space-y-3 text-left">
        {phases.map((label, i) => {
          const done = i < phase;
          const active = i === phase;
          return (
            <li
              key={label}
              className={cn(
                "flex items-center gap-3 text-sm transition-opacity",
                !done && !active && "opacity-40",
              )}
            >
              <span
                className={cn(
                  "flex size-6 items-center justify-center rounded-full border",
                  done && "border-success bg-success text-white",
                  active && "border-primary text-primary",
                )}
              >
                {done ? (
                  <Check className="size-3.5" />
                ) : active ? (
                  <Loader2 className="size-3.5 animate-spin" />
                ) : null}
              </span>
              {label}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
