// Utility functions for roadmap display
import {
  RoadmapModule,
  RoadmapUnit,
  RoadmapResource,
} from "@/ai/flows/generate-roadmap";

export const getIconForResource = (title: string, url?: string) => {
  const lowerTitle = title.toLowerCase();
  if (url?.includes("youtube.com") || url?.includes("youtu.be"))
    return "youtube";
  if (lowerTitle.includes("video")) return "youtube";
  if (
    lowerTitle.includes("article") ||
    lowerTitle.includes("blog") ||
    lowerTitle.includes("docs")
  )
    return "filetext";
  if (lowerTitle.includes("project") || lowerTitle.includes("build"))
    return "code";
  if (url) return "globe";
  return "book";
};

export function calculateProgress(modules: any[]) {
  let completed = 0;
  let total = 0;
  modules.forEach((module) => {
    (module.units || []).forEach((unit: any) => {
      total += (unit.resources || []).length;
      (unit.resources || []).forEach((resource: any) => {
        if (resource.completed) completed++;
      });
    });
  });
  return {
    progress: total === 0 ? 0 : (completed / total) * 100,
    completedResources: completed,
    totalResources: total,
  };
}

export function calculateModuleProgress(module: any) {
  const moduleResources = (module.units || []).reduce(
    (acc: number, unit: any) => acc + (unit.resources || []).length,
    0,
  );
  const moduleCompleted = (module.units || []).reduce(
    (acc: number, unit: any) =>
      acc + (unit.resources || []).filter((r: any) => r.completed).length,
    0,
  );
  return {
    moduleResources,
    moduleCompleted,
    moduleProgress:
      moduleResources === 0 ? 0 : (moduleCompleted / moduleResources) * 100,
  };
}

export function calculateUnitProgress(unit: any) {
  const unitResources = (unit.resources || []).length;
  const unitCompleted = (unit.resources || []).filter(
    (r: any) => r.completed,
  ).length;
  return {
    unitResources,
    unitCompleted,
    unitProgress:
      unitResources === 0 ? 0 : (unitCompleted / unitResources) * 100,
  };
}
