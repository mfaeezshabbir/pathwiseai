import React from "react";
import { Rocket } from "lucide-react";

export function RoadmapSidebar() {
  return (
    <aside className="hidden w-64 flex-col border-r border-gray-200 bg-white px-6 py-8 dark:border-gray-800 dark:bg-[#18181b] md:flex">
      <div className="mb-8 flex items-center gap-2">
        <Rocket className="text-indigo-600 dark:text-indigo-300" />
        <span className="text-xl font-bold text-indigo-700 dark:text-indigo-300">
          Pathwise
        </span>
      </div>
      <nav>
        <ul className="space-y-4">
          <li>
            <span className="font-semibold text-indigo-700 dark:text-indigo-300">
              My Roadmaps
            </span>
          </li>
          {/* Add navigation links or filters here */}
        </ul>
      </nav>
    </aside>
  );
}
