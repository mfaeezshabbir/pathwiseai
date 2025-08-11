import React from "react";

interface Roadmap {
  title: string;
  progress: number;
  modules: number;
}

interface Props {
  roadmaps: Roadmap[];
}

export function RoadmapListCard({ roadmaps }: Props) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-800 dark:bg-[#232336]">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold">Saved Roadmaps</h2>
        <input
          type="text"
          placeholder="Search..."
          className="rounded border border-gray-300 px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:border-gray-700 dark:bg-[#18181b]"
          disabled
        />
      </div>
      <ul className="space-y-4">
        {roadmaps.length === 0 ? (
          <li className="py-8 text-center text-muted-foreground">
            No saved roadmaps yet.
          </li>
        ) : (
          roadmaps.map((roadmap, idx) => (
            <li
              key={roadmap.title + idx}
              className="flex items-center justify-between rounded-lg border border-gray-100 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-[#232336]"
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
          ))
        )}
      </ul>
    </div>
  );
}
