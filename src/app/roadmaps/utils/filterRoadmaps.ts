// Utility for filtering roadmaps by search, category, and difficulty
export interface Roadmap {
  id: string;
  title: string;
  description: string;
  progress: number;
  modules: number;
  totalHours: number;
  difficulty: string;
  category: string;
  tags: string[];
  enrolled: number;
  rating: number;
  lastAccessed: string;
  estimatedCompletion: string;
  thumbnail: string;
}

export function filterRoadmaps(
  roadmaps: Roadmap[],
  searchQuery: string,
  selectedCategory: string,
  selectedDifficulty: string,
): Roadmap[] {
  let filtered = roadmaps;
  if (searchQuery) {
    filtered = filtered.filter(
      (roadmap: Roadmap) =>
        roadmap.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        roadmap.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        roadmap.tags.some((tag: string) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase()),
        ),
    );
  }
  if (selectedCategory !== "All") {
    filtered = filtered.filter(
      (roadmap: Roadmap) => roadmap.category === selectedCategory,
    );
  }
  if (selectedDifficulty !== "All") {
    filtered = filtered.filter(
      (roadmap: Roadmap) => roadmap.difficulty === selectedDifficulty,
    );
  }
  return filtered;
}
