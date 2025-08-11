import React from "react";

interface Roadmap {
  title: string;
  progress: number;
  modules: number;
}

interface RoadmapListProps {
  roadmaps: Roadmap[];
}

export function RoadmapList({ roadmaps }: RoadmapListProps) {
  if (!roadmaps.length) {
    return (
      <div className="py-8 text-center text-muted-foreground">
        No saved roadmaps yet.
      </div>
    );
  }

  return (
    <ul className="space-y-4">
      {roadmaps.map((roadmap, idx) => (
        <li
          key={roadmap.title + idx}
          className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-[#232336]"
        >
          <div>
            <div className="text-lg font-semibold">{roadmap.title}</div>
            <div className="text-sm text-muted-foreground">
              {roadmap.modules} modules
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">{roadmap.progress}%</span>
            <div className="h-2 w-24 rounded bg-gray-200 dark:bg-gray-700">
              <div
                className="h-2 rounded bg-indigo-500"
                style={{ width: `${roadmap.progress}%` }}
              />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
