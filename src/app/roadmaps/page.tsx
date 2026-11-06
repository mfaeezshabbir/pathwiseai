"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { CheckCircle2, Map as MapIcon, Plus, Search, Timer, TrendingUp } from "lucide-react";

import { roadmapPercent, type SavedRoadmap } from "@/lib/roadmap";
import { cn } from "@/lib/utils";
import { useRequireAuth } from "@/hooks/use-require-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { PageHeader } from "@/components/common/page-header";
import { EmptyState } from "@/components/common/empty-state";
import { RoadmapCard } from "@/components/roadmap/roadmap-card";

const filters = ["All", "In progress", "Not started", "Completed"] as const;
type Filter = (typeof filters)[number];

function matches(filter: Filter, percent: number) {
  if (filter === "In progress") return percent > 0 && percent < 100;
  if (filter === "Not started") return percent === 0;
  if (filter === "Completed") return percent === 100;
  return true;
}

export default function RoadmapsPage() {
  const { session, ready } = useRequireAuth();
  const [roadmaps, setRoadmaps] = useState<SavedRoadmap[] | null>(null);
  const [error, setError] = useState(false);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("All");

  useEffect(() => {
    if (!ready) return;
    fetch("/api/roadmap/save")
      .then((r) => (r.ok ? r.json() : Promise.reject(r)))
      .then((data) => setRoadmaps(data.roadmaps ?? []))
      .catch(() => {
        setError(true);
        setRoadmaps([]);
      });
  }, [ready]);

  const stats = useMemo(() => {
    const list = roadmaps ?? [];
    const percents = list.map(roadmapPercent);
    return {
      total: list.length,
      active: percents.filter((p) => p > 0 && p < 100).length,
      completed: percents.filter((p) => p === 100).length,
      average: list.length
        ? Math.round(percents.reduce((a, b) => a + b, 0) / list.length)
        : 0,
    };
  }, [roadmaps]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return (roadmaps ?? []).filter(
      (r) =>
        matches(filter, roadmapPercent(r)) &&
        (!q ||
          r.title.toLowerCase().includes(q) ||
          r.description?.toLowerCase().includes(q)),
    );
  }, [roadmaps, query, filter]);

  const firstName = session?.user?.name?.split(" ")[0];
  const loading = !ready || roadmaps === null;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <PageHeader
        eyebrow="Dashboard"
        title={firstName ? `Welcome back, ${firstName}` : "Your roadmaps"}
        description="Pick up where you left off, or start something new."
        actions={
          <Button asChild>
            <Link href="/roadmaps/new">
              <Plus /> New roadmap
            </Link>
          </Button>
        }
      />

      <dl className="mt-10 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[
          { label: "Roadmaps", value: stats.total, icon: MapIcon },
          { label: "In progress", value: stats.active, icon: Timer },
          { label: "Completed", value: stats.completed, icon: CheckCircle2 },
          { label: "Avg. progress", value: `${stats.average}%`, icon: TrendingUp },
        ].map(({ label, value, icon: Icon }) => (
          <div key={label} className="rounded-2xl border bg-card p-4 sm:p-5">
            <dt className="flex items-center gap-2 text-sm text-muted-foreground">
              <Icon className="size-4" /> {label}
            </dt>
            <dd className="mt-2 text-2xl font-semibold tracking-tight tabular-nums">
              {loading ? <Skeleton className="h-8 w-12" /> : value}
            </dd>
          </div>
        ))}
      </dl>

      {(loading || (roadmaps?.length ?? 0) > 0) && (
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div
            role="tablist"
            aria-label="Filter roadmaps"
            className="scrollbar-none -mx-4 flex gap-1 overflow-x-auto px-4 sm:mx-0 sm:px-0"
          >
            {filters.map((f) => (
              <button
                key={f}
                role="tab"
                aria-selected={filter === f}
                onClick={() => setFilter(f)}
                className={cn(
                  "shrink-0 rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
                  filter === f
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                )}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="relative sm:w-72">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search roadmaps"
              aria-label="Search roadmaps"
              className="pl-9"
            />
          </div>
        </div>
      )}

      <div className="mt-6">
        {loading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <Skeleton key={i} className="h-52 rounded-2xl" />
            ))}
          </div>
        ) : error ? (
          <EmptyState
            icon={MapIcon}
            title="We couldn't load your roadmaps"
            description="Check your connection and try again."
            action={
              <Button variant="outline" onClick={() => window.location.reload()}>
                Retry
              </Button>
            }
          />
        ) : roadmaps!.length === 0 ? (
          <EmptyState
            icon={MapIcon}
            title="No roadmaps yet"
            description="Generate your first personalized learning path. It takes less than a minute."
            action={
              <Button asChild>
                <Link href="/roadmaps/new">
                  <Plus /> Create your first roadmap
                </Link>
              </Button>
            }
          />
        ) : visible.length === 0 ? (
          <EmptyState
            icon={Search}
            title="No matching roadmaps"
            description="Try a different search or filter."
            action={
              <Button
                variant="outline"
                onClick={() => {
                  setQuery("");
                  setFilter("All");
                }}
              >
                Clear filters
              </Button>
            }
          />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((r) => (
              <RoadmapCard key={r._id} roadmap={r} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
