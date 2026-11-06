"use client";

import { useState } from "react";
import { Lightbulb, RefreshCw, Sparkles } from "lucide-react";
import { toast } from "sonner";

import type { GenerateProjectIdeasOutput } from "@/lib/ai/schemas";
import { readApiError } from "@/lib/api-error";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function ProjectIdeasDialog({
  moduleTitle,
  skills,
}: {
  moduleTitle: string;
  skills: string[];
}) {
  const [ideas, setIdeas] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/ai/project-ideas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skills, roadmapName: moduleTitle }),
      });
      if (!res.ok) {
        const { message } = await readApiError(res, "Please try again in a moment.");
        toast.error("Couldn't generate project ideas", { description: message });
        return;
      }
      const result: GenerateProjectIdeasOutput = await res.json();
      setIdeas(result.projectIdeas);
      // Best-effort save so ideas show up on the profile page
      fetch("/api/project/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectIdeas: result.projectIdeas,
          moduleTitle,
          skills,
        }),
      }).catch(() => {});
    } catch {
      toast.error("Couldn't generate project ideas", {
        description: "Please try again in a moment.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      onOpenChange={(open) => {
        if (open && ideas.length === 0 && !loading) generate();
      }}
    >
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="text-primary hover:text-primary">
          <Lightbulb /> Project ideas
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="size-4 text-primary" />
            Project ideas
          </DialogTitle>
          <DialogDescription>
            Hands-on ideas to practice <strong>{moduleTitle}</strong>.
          </DialogDescription>
        </DialogHeader>

        <div className="max-h-[50vh] overflow-y-auto">
          {loading ? (
            <div className="space-y-2">
              {[0, 1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-14 w-full rounded-xl" />
              ))}
            </div>
          ) : ideas.length > 0 ? (
            <ol className="space-y-2">
              {ideas.map((idea, i) => (
                <li
                  key={i}
                  className="flex gap-3 rounded-xl border p-3 text-sm leading-relaxed"
                >
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-semibold text-accent-foreground">
                    {i + 1}
                  </span>
                  {idea}
                </li>
              ))}
            </ol>
          ) : (
            <p className="py-8 text-center text-sm text-muted-foreground">
              No ideas yet.
            </p>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={generate} disabled={loading}>
            <RefreshCw className={loading ? "animate-spin" : ""} />
            {ideas.length ? "Regenerate" : "Generate"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
