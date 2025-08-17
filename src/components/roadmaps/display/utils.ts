// Utility functions for roadmap display (adapted to categories/subtopics/resources)
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

export function calculateProgress(categories: any[]) {
  let completed = 0;
  let total = 0;
  categories.forEach((cat) => {
    (cat.subtopics || []).forEach((sub: any) => {
      total += (sub.resources || []).length;
      (sub.resources || []).forEach((res: any) => {
        if (res.completed) completed++;
      });
    });
  });
  return {
    progress: total === 0 ? 0 : (completed / total) * 100,
    completedResources: completed,
    totalResources: total,
  };
}

export function calculateCategoryProgress(category: any) {
  const categoryResources = (category.subtopics || []).reduce(
    (acc: number, sub: any) => acc + (sub.resources || []).length,
    0,
  );
  const categoryCompleted = (category.subtopics || []).reduce(
    (acc: number, sub: any) =>
      acc + (sub.resources || []).filter((r: any) => r.completed).length,
    0,
  );
  return {
    categoryResources,
    categoryCompleted,
    categoryProgress:
      categoryResources === 0
        ? 0
        : (categoryCompleted / categoryResources) * 100,
  };
}

export function calculateSubtopicProgress(subtopic: any) {
  const subResources = (subtopic.resources || []).length;
  const subCompleted = (subtopic.resources || []).filter(
    (r: any) => r.completed,
  ).length;
  return {
    subResources,
    subCompleted,
    subProgress: subResources === 0 ? 0 : (subCompleted / subResources) * 100,
  };
}
