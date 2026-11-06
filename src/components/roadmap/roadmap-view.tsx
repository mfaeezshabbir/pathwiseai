"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  ChevronRight,
  CircleDot,
  Compass,
  Layers,
  ListChecks,
  Wrench,
} from "lucide-react";

import { cn } from "@/lib/utils";
import {
  categoryProgress,
  computeProgress,
  roadmapHref,
  subtopicProgress,
  type GenerateRoadmapOutput,
  type ProgressMap,
  type RoadmapCategory,
  type RoadmapSubtopic,
} from "@/lib/roadmap";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ProgressRing } from "@/components/common/progress-ring";
import { ProjectIdeasDialog } from "./project-ideas-dialog";
import { ProjectItem, SubtopicSheet, type OpenSubtopic } from "./subtopic-sheet";

function findNextUp(
  categories: RoadmapCategory[],
  progress: ProgressMap,
): OpenSubtopic | null {
  for (let ci = 0; ci < categories.length; ci++) {
    const subs = categories[ci].subtopics ?? [];
    for (let si = 0; si < subs.length; si++) {
      const p = subtopicProgress(subs[si], ci, si, progress);
      if (p.total > 0 && !p.complete) {
        return { subtopic: subs[si], ci, si, moduleName: categories[ci].name };
      }
    }
  }
  return null;
}

type Props = {
  roadmap: GenerateRoadmapOutput;
  /** Controlled progress. When omitted, progress is kept locally. */
  progress?: ProgressMap;
  onToggle?: (key: string) => void;
  headerActions?: React.ReactNode;
};

export function RoadmapView({ roadmap, progress: controlled, onToggle, headerActions }: Props) {
  const [local, setLocal] = useState<ProgressMap>({});
  const progress = controlled ?? local;
  const toggle =
    onToggle ??
    ((key: string) =>
      setLocal((p) => {
        const next = { ...p };
        if (next[key]) delete next[key];
        else next[key] = true;
        return next;
      }));

  const [target, setTarget] = useState<OpenSubtopic | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const categories: RoadmapCategory[] = roadmap.categories ?? [];
  const overall = computeProgress(roadmap, progress);
  const projectCount = categories.reduce((a, c) => a + (c.projects?.length ?? 0), 0);

  // First subtopic that still has unfinished resources
  const nextUp = findNextUp(categories, progress);

  const open = (t: OpenSubtopic) => {
    setTarget(t);
    setSheetOpen(true);
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <header className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0 max-w-3xl">
          <h1 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            {roadmap.title}
          </h1>
          {roadmap.description && (
            <p className="mt-3 text-pretty text-muted-foreground">
              {roadmap.description}
            </p>
          )}
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Layers className="size-4" /> {categories.length} modules
            </span>
            <span className="inline-flex items-center gap-1.5">
              <ListChecks className="size-4" /> {overall.total} resources
            </span>
            {projectCount > 0 && (
              <span className="inline-flex items-center gap-1.5">
                <Wrench className="size-4" /> {projectCount} projects
              </span>
            )}
          </div>
        </div>
        {headerActions && <div className="flex shrink-0 gap-2">{headerActions}</div>}
      </header>

      {roadmap.prerequisites && roadmap.prerequisites.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 rounded-xl border bg-secondary/40 px-4 py-3">
          <span className="mr-1 text-sm font-medium">Before you start:</span>
          {roadmap.prerequisites.map((p) => (
            <Badge key={p} variant="outline" className="bg-background font-normal">
              {p}
            </Badge>
          ))}
        </div>
      )}

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
        {/* Modules */}
        <ol className="relative space-y-4">
          <span
            aria-hidden
            className="absolute top-6 bottom-6 left-[19px] hidden w-px bg-border sm:block"
          />
          {categories.map((cat, ci) => {
            const cp = categoryProgress(cat, ci, progress);
            const complete = cp.total > 0 && cp.done === cp.total;
            return (
              <li key={ci} className="relative sm:pl-14">
                <span
                  className={cn(
                    "absolute top-5 left-0 z-10 hidden size-10 items-center justify-center rounded-full border-2 bg-background font-mono text-sm font-semibold sm:flex",
                    complete
                      ? "border-success bg-success text-white"
                      : cp.done > 0
                        ? "border-primary text-primary"
                        : "text-muted-foreground",
                  )}
                >
                  {complete ? <Check className="size-4" /> : ci + 1}
                </span>

                <article className="rounded-2xl border bg-card">
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <p className="text-xs font-medium text-muted-foreground sm:hidden">
                          Module {ci + 1}
                        </p>
                        <h2 className="text-lg font-semibold tracking-tight">
                          {cat.name}
                        </h2>
                        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                          {cat.details}
                        </p>
                      </div>
                      {cp.total > 0 && (
                        <span className="shrink-0 text-xs font-medium text-muted-foreground tabular-nums">
                          {cp.done}/{cp.total}
                        </span>
                      )}
                    </div>
                    {cp.total > 0 && (
                      <Progress value={cp.percent} className="mt-4 h-1" />
                    )}
                  </div>

                  <ul className="border-t">
                    {(cat.subtopics ?? []).map((sub: RoadmapSubtopic, si: number) => {
                      const sp = subtopicProgress(sub, ci, si, progress);
                      return (
                        <li key={si} className="border-b last:border-b-0">
                          <button
                            onClick={() => open({ subtopic: sub, ci, si, moduleName: cat.name })}
                            className="group flex w-full items-center gap-3 px-5 py-3 text-left transition-colors hover:bg-secondary/50 focus-visible:bg-secondary/50 focus-visible:outline-none"
                          >
                            <span
                              className={cn(
                                "flex size-5 shrink-0 items-center justify-center rounded-full border",
                                sp.complete && "border-success bg-success text-white",
                                !sp.complete && sp.done > 0 && "border-primary text-primary",
                              )}
                            >
                              {sp.complete ? (
                                <Check className="size-3" />
                              ) : sp.done > 0 ? (
                                <CircleDot className="size-3" />
                              ) : null}
                            </span>
                            <span className="min-w-0 flex-1">
                              <span
                                className={cn(
                                  "block truncate text-sm font-medium",
                                  sp.complete && "text-muted-foreground",
                                )}
                              >
                                {sub.name}
                              </span>
                            </span>
                            {sp.total > 0 && (
                              <span className="text-xs text-muted-foreground tabular-nums">
                                {sp.done}/{sp.total}
                              </span>
                            )}
                            <ChevronRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                          </button>
                        </li>
                      );
                    })}
                  </ul>

                  {(cat.projects?.length ?? 0) > 0 && (
                    <details className="group/proj border-t">
                      <summary className="flex cursor-pointer list-none items-center gap-2 px-5 py-3 text-sm font-medium text-muted-foreground hover:text-foreground [&::-webkit-details-marker]:hidden">
                        <Wrench className="size-4" />
                        {cat.projects.length} practice{" "}
                        {cat.projects.length === 1 ? "project" : "projects"}
                        <ChevronRight className="ml-auto size-4 transition-transform group-open/proj:rotate-90" />
                      </summary>
                      <ul className="space-y-2 px-5 pb-5">
                        {cat.projects.map((p, i) => (
                          <ProjectItem key={i} project={p} />
                        ))}
                      </ul>
                    </details>
                  )}

                  <div className="flex justify-end border-t px-3 py-2">
                    <ProjectIdeasDialog
                      moduleTitle={cat.name}
                      skills={(cat.subtopics ?? []).map((s: RoadmapSubtopic) => s.name)}
                    />
                  </div>
                </article>
              </li>
            );
          })}
        </ol>

        {/* Sidebar */}
        <aside className="space-y-4 lg:sticky lg:top-20 lg:self-start">
          <div className="rounded-2xl border bg-card p-5">
            <div className="flex items-center gap-4">
              <ProgressRing value={overall.percent} size={64} stroke={6} />
              <div>
                <p className="font-medium">
                  {overall.percent === 100 ? "Roadmap complete!" : "Your progress"}
                </p>
                <p className="text-sm text-muted-foreground tabular-nums">
                  {overall.done} of {overall.total} resources
                </p>
              </div>
            </div>
            {nextUp && (
              <Button className="mt-5 w-full justify-between" onClick={() => open(nextUp)}>
                <span className="truncate">
                  {overall.done === 0 ? "Start" : "Continue"}: {nextUp.subtopic.name}
                </span>
                <ArrowRight />
              </Button>
            )}
          </div>

          {roadmap.nextSteps && roadmap.nextSteps.length > 0 && (
            <div className="rounded-2xl border bg-card p-5">
              <h3 className="text-sm font-semibold">After this roadmap</h3>
              <ul className="mt-3 space-y-2.5">
                {roadmap.nextSteps.map((step, i) => (
                  <li key={i} className="flex gap-2 text-sm text-muted-foreground">
                    <ArrowRight className="mt-0.5 size-3.5 shrink-0 text-primary" />
                    {step}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {roadmap.relatedRoadmaps && roadmap.relatedRoadmaps.length > 0 && (
            <div className="rounded-2xl border bg-card p-5">
              <h3 className="flex items-center gap-2 text-sm font-semibold">
                <Compass className="size-4 text-primary" /> Related paths
              </h3>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {roadmap.relatedRoadmaps.map((r) => (
                  <Link
                    key={r}
                    href={roadmapHref(r)}
                    className="rounded-full border px-2.5 py-1 text-xs font-medium transition-colors hover:border-primary/40 hover:text-primary"
                  >
                    {r}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>

      <SubtopicSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        target={target}
        progress={progress}
        onToggle={toggle}
      />
    </div>
  );
}
