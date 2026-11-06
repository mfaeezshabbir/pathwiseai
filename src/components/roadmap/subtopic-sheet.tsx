"use client";

import {
  BookOpen,
  Check,
  ExternalLink,
  FileText,
  GraduationCap,
  PlayCircle,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import {
  difficultyStyles,
  resourceKey,
  type ProgressMap,
  type RoadmapProject,
  type RoadmapResource,
  type RoadmapSubtopic,
} from "@/lib/roadmap";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const resourceIcons: Record<string, LucideIcon> = {
  video: PlayCircle,
  article: FileText,
  doc: BookOpen,
  course: GraduationCap,
};

function hostname(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export type OpenSubtopic = {
  subtopic: RoadmapSubtopic;
  ci: number;
  si: number;
  moduleName: string;
};

export function SubtopicSheet({
  open,
  onOpenChange,
  target,
  progress,
  onToggle,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  target: OpenSubtopic | null;
  progress: ProgressMap;
  onToggle: (key: string) => void;
}) {
  const sub = target?.subtopic;
  const resources: RoadmapResource[] = sub?.resources ?? [];
  const projects: RoadmapProject[] = sub?.projects ?? [];
  const nested: RoadmapSubtopic[] = sub?.subtopics ?? [];
  const done = target
    ? resources.filter((_, ri) => progress[resourceKey(target.ci, target.si, ri)])
        .length
    : 0;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full gap-0 overflow-y-auto sm:max-w-lg">
        {target && sub && (
          <>
            <SheetHeader className="border-b pb-5">
              <p className="text-xs font-medium text-primary">
                {target.moduleName}
              </p>
              <SheetTitle className="text-xl tracking-tight">{sub.name}</SheetTitle>
              <SheetDescription className="leading-relaxed">
                {sub.details}
              </SheetDescription>
            </SheetHeader>

            <div className="space-y-8 p-4">
              {resources.length > 0 && (
                <section>
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="text-sm font-semibold">Resources</h3>
                    <span className="text-xs text-muted-foreground tabular-nums">
                      {done}/{resources.length} done
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {resources.map((res, ri) => {
                      const key = resourceKey(target.ci, target.si, ri);
                      const checked = !!progress[key];
                      const Icon = resourceIcons[res.type] ?? ExternalLink;
                      return (
                        <li
                          key={key}
                          className={cn(
                            "flex items-start gap-3 rounded-xl border p-3 transition-colors",
                            checked && "border-success/30 bg-success/5",
                          )}
                        >
                          <Checkbox
                            id={key}
                            checked={checked}
                            onCheckedChange={() => onToggle(key)}
                            className="mt-0.5"
                            aria-label={`Mark "${res.title}" as done`}
                          />
                          <div className="min-w-0 flex-1">
                            <a
                              href={res.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={cn(
                                "group inline-flex items-start gap-1 text-sm font-medium hover:text-primary",
                                checked && "text-muted-foreground line-through",
                              )}
                            >
                              {res.title}
                              <ExternalLink className="mt-0.5 size-3 shrink-0 opacity-50 group-hover:opacity-100" />
                            </a>
                            <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                              <Icon className="size-3.5" />
                              <span className="capitalize">{res.type}</span>
                              <span aria-hidden>·</span>
                              <span className="truncate">{hostname(res.url)}</span>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </section>
              )}

              {projects.length > 0 && (
                <section>
                  <h3 className="mb-3 text-sm font-semibold">Practice projects</h3>
                  <ul className="space-y-2">
                    {projects.map((p, i) => (
                      <ProjectItem key={i} project={p} />
                    ))}
                  </ul>
                </section>
              )}

              {nested.length > 0 && (
                <section>
                  <h3 className="mb-3 text-sm font-semibold">Go deeper</h3>
                  <ul className="space-y-2">
                    {nested.map((n, i) => (
                      <li key={i} className="rounded-xl bg-secondary/60 p-3">
                        <p className="text-sm font-medium">{n.name}</p>
                        <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                          {n.details}
                        </p>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {resources.length === 0 && projects.length === 0 && (
                <p className="rounded-xl border border-dashed p-6 text-center text-sm text-muted-foreground">
                  No resources for this topic yet. Try asking the AI assistant
                  for recommendations.
                </p>
              )}
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

export function ProjectItem({ project }: { project: RoadmapProject }) {
  return (
    <li className="rounded-xl border p-3.5">
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-medium">{project.title}</p>
        <Badge
          variant="outline"
          className={cn("shrink-0 capitalize", difficultyStyles[project.difficulty])}
        >
          {project.difficulty}
        </Badge>
      </div>
      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
        {project.description}
      </p>
      {project.tags?.length > 0 && (
        <div className="mt-2.5 flex flex-wrap gap-1">
          {project.tags.map((t) => (
            <span
              key={t}
              className="rounded-md bg-secondary px-1.5 py-0.5 text-[11px] text-muted-foreground"
            >
              {t}
            </span>
          ))}
        </div>
      )}
      {project.saved && (
        <p className="mt-2 inline-flex items-center gap-1 text-xs text-success">
          <Check className="size-3" /> Saved
        </p>
      )}
    </li>
  );
}
