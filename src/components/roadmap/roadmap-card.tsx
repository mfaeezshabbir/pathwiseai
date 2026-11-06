import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { ArrowUpRight, Layers } from "lucide-react";

import { roadmapPercent, type SavedRoadmap } from "@/lib/roadmap";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

const statusStyles = {
  Completed: "bg-success/10 text-success",
  "In progress": "bg-accent text-accent-foreground",
  "Not started": "bg-secondary text-muted-foreground",
} as const;

export function RoadmapCard({ roadmap }: { roadmap: SavedRoadmap }) {
  const percent = roadmapPercent(roadmap);
  const modules = roadmap.categories?.length ?? 0;
  const when = roadmap.updatedAt ?? roadmap.createdAt;
  const status: keyof typeof statusStyles =
    percent === 100 ? "Completed" : percent > 0 ? "In progress" : "Not started";

  return (
    <Link
      href={`/roadmaps/${roadmap._id}`}
      className="group flex flex-col rounded-2xl border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md hover:shadow-primary/5 focus-visible:ring-[3px] focus-visible:ring-ring/40 focus-visible:outline-none"
    >
      <div className="flex items-start justify-between gap-3">
        <span
          className={cn(
            "rounded-full px-2 py-0.5 text-[11px] font-medium",
            statusStyles[status],
          )}
        >
          {status}
        </span>
        <ArrowUpRight className="size-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
      </div>
      <h3 className="mt-3 line-clamp-2 font-semibold tracking-tight">
        {roadmap.title}
      </h3>
      {roadmap.description && (
        <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">
          {roadmap.description}
        </p>
      )}
      <div className="mt-auto pt-5">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Layers className="size-3.5" /> {modules} modules
          </span>
          <span className="font-medium text-foreground tabular-nums">{percent}%</span>
        </div>
        <Progress value={percent} className="mt-2 h-1.5" />
        {when && (
          <p className="mt-3 text-xs text-muted-foreground">
            Updated {formatDistanceToNow(new Date(when), { addSuffix: true })}
          </p>
        )}
      </div>
    </Link>
  );
}
