import type {
  GenerateRoadmapOutput,
  RoadmapCategory,
  RoadmapProject,
  RoadmapResource,
  RoadmapSubtopic,
} from "@/lib/ai/schemas";

export type {
  GenerateRoadmapOutput,
  RoadmapCategory,
  RoadmapProject,
  RoadmapResource,
  RoadmapSubtopic,
};

/** Map of resource keys (see `resourceKey`) to completion state. */
export type ProgressMap = Record<string, boolean>;

/** A roadmap as stored in MongoDB and returned by the API. */
export type SavedRoadmap = GenerateRoadmapOutput & {
  _id: string;
  userId?: string;
  createdAt?: string;
  updatedAt?: string;
  progress?: ProgressMap;
  progressPercent?: number;
};

export function resourceKey(c: number, s: number, r: number) {
  return `${c}-${s}-${r}`;
}

export function countResources(roadmap: GenerateRoadmapOutput) {
  return (roadmap.categories ?? []).reduce(
    (acc, cat) =>
      acc +
      (cat.subtopics ?? []).reduce(
        (a: number, sub: RoadmapSubtopic) => a + (sub.resources?.length ?? 0),
        0,
      ),
    0,
  );
}

export function computeProgress(
  roadmap: GenerateRoadmapOutput,
  progress: ProgressMap = {},
) {
  const total = countResources(roadmap);
  const done = Object.values(progress).filter(Boolean).length;
  return {
    total,
    done: Math.min(done, total),
    percent: total === 0 ? 0 : Math.round((Math.min(done, total) / total) * 100),
  };
}

export function categoryProgress(
  category: RoadmapCategory,
  ci: number,
  progress: ProgressMap = {},
) {
  let total = 0;
  let done = 0;
  (category.subtopics ?? []).forEach((sub: RoadmapSubtopic, si: number) => {
    (sub.resources ?? []).forEach((_: RoadmapResource, ri: number) => {
      total++;
      if (progress[resourceKey(ci, si, ri)]) done++;
    });
  });
  return { total, done, percent: total === 0 ? 0 : Math.round((done / total) * 100) };
}

export function subtopicProgress(
  subtopic: RoadmapSubtopic,
  ci: number,
  si: number,
  progress: ProgressMap = {},
) {
  const total = subtopic.resources?.length ?? 0;
  let done = 0;
  for (let ri = 0; ri < total; ri++) {
    if (progress[resourceKey(ci, si, ri)]) done++;
  }
  return { total, done, complete: total > 0 && done === total };
}

/** Percent for list views: prefer the stored value, fall back to recomputing. */
export function roadmapPercent(roadmap: SavedRoadmap) {
  if (typeof roadmap.progressPercent === "number") return roadmap.progressPercent;
  return computeProgress(roadmap, roadmap.progress).percent;
}

export const difficultyStyles: Record<string, string> = {
  beginner:
    "border-success/30 bg-success/10 text-success dark:border-success/25",
  intermediate:
    "border-warning/40 bg-warning/15 text-[oklch(0.5_0.12_70)] dark:text-warning",
  advanced:
    "border-destructive/30 bg-destructive/10 text-destructive dark:border-destructive/25",
};

export function roadmapHref(skill: string) {
  return `/roadmaps/new?skill=${encodeURIComponent(skill)}`;
}
