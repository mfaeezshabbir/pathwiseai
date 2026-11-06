"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
import {
  BarChart3,
  CheckCircle2,
  ChevronRight,
  Lightbulb,
  Map as MapIcon,
  Plus,
  TrendingUp,
} from "lucide-react";

import {
  computeProgress,
  roadmapPercent,
  type SavedRoadmap,
} from "@/lib/roadmap";
import { useRequireAuth } from "@/hooks/use-require-auth";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/common/empty-state";
import { initials } from "@/components/layout/user-menu";
import { EditProfileDialog } from "@/components/profile/edit-profile-dialog";
import { ProgressChart } from "@/components/profile/progress-chart";

type ProjectIdeaGroup = {
  _id: string;
  moduleTitle: string;
  projectIdeas: string[];
  skills?: string[];
  createdAt?: string;
};

type Profile = {
  name: string;
  email: string;
  createdAt?: string | null;
  roadmaps: SavedRoadmap[];
  skills: string[];
  projectIdeas: ProjectIdeaGroup[];
};

function Panel({
  title,
  icon: Icon,
  action,
  children,
  className,
}: {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`rounded-2xl border bg-card ${className ?? ""}`}>
      <div className="flex items-center justify-between gap-4 border-b px-5 py-4">
        <h2 className="flex items-center gap-2 text-sm font-semibold">
          <Icon className="size-4 text-muted-foreground" /> {title}
        </h2>
        {action}
      </div>
      <div className="p-5">{children}</div>
    </section>
  );
}

export default function ProfilePage() {
  const { ready } = useRequireAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!ready) return;
    fetch("/api/user/profile")
      .then((r) => (r.ok ? r.json() : Promise.reject(r)))
      .then((d) => setProfile(d.userProfile))
      .catch(() => setFailed(true));
  }, [ready]);

  const stats = useMemo(() => {
    const roadmaps = profile?.roadmaps ?? [];
    const resourcesDone = roadmaps.reduce(
      (acc, r) => acc + computeProgress(r, r.progress).done,
      0,
    );
    const percents = roadmaps.map(roadmapPercent);
    return {
      roadmaps: roadmaps.length,
      completed: percents.filter((p) => p === 100).length,
      resourcesDone,
      average: roadmaps.length
        ? Math.round(percents.reduce((a, b) => a + b, 0) / roadmaps.length)
        : 0,
      ideas: (profile?.projectIdeas ?? []).reduce(
        (a, g) => a + (g.projectIdeas?.length ?? 0),
        0,
      ),
    };
  }, [profile]);

  if (failed) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <EmptyState
          icon={BarChart3}
          title="We couldn't load your profile"
          description="Please refresh the page to try again."
          action={
            <Button variant="outline" onClick={() => window.location.reload()}>
              Retry
            </Button>
          }
        />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="mx-auto max-w-6xl space-y-6 px-4 py-10 sm:px-6 sm:py-14">
        <Skeleton className="h-28 rounded-2xl" />
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {[0, 1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-24 rounded-2xl" />
          ))}
        </div>
        <Skeleton className="h-72 rounded-2xl" />
      </div>
    );
  }

  const chartData = profile.roadmaps
    .slice(0, 6)
    .map((r) => ({ title: r.title, percent: roadmapPercent(r) }));

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-10 sm:px-6 sm:py-14">
      {/* Identity */}
      <section className="flex flex-col gap-5 rounded-2xl border bg-card p-5 sm:flex-row sm:items-center sm:p-6">
        <Avatar className="size-16 border">
          <AvatarFallback className="bg-accent text-lg font-semibold text-accent-foreground">
            {initials(profile.name)}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-xl font-semibold tracking-tight">
            {profile.name}
          </h1>
          <p className="truncate text-sm text-muted-foreground">
            {profile.email}
            {profile.createdAt && (
              <> · Member since {format(new Date(profile.createdAt), "MMM yyyy")}</>
            )}
          </p>
        </div>
        <EditProfileDialog
          name={profile.name}
          email={profile.email}
          onSaved={(name) => setProfile((p) => (p ? { ...p, name } : p))}
        />
      </section>

      {/* Stats */}
      <dl className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[
          { label: "Roadmaps", value: stats.roadmaps, icon: MapIcon },
          { label: "Completed", value: stats.completed, icon: CheckCircle2 },
          { label: "Resources done", value: stats.resourcesDone, icon: TrendingUp },
          { label: "Project ideas", value: stats.ideas, icon: Lightbulb },
        ].map(({ label, value, icon: Icon }) => (
          <div key={label} className="rounded-2xl border bg-card p-4 sm:p-5">
            <dt className="flex items-center gap-2 text-sm text-muted-foreground">
              <Icon className="size-4" /> {label}
            </dt>
            <dd className="mt-2 text-2xl font-semibold tracking-tight tabular-nums">
              {value}
            </dd>
          </div>
        ))}
      </dl>

      {profile.roadmaps.length === 0 ? (
        <EmptyState
          icon={MapIcon}
          title="Your learning journey starts here"
          description="Generate a roadmap to start tracking progress and collecting project ideas."
          action={
            <Button asChild>
              <Link href="/roadmaps/new">
                <Plus /> Create a roadmap
              </Link>
            </Button>
          }
        />
      ) : (
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <Panel title="Progress by roadmap" icon={BarChart3}>
            <ProgressChart data={chartData} />
          </Panel>

          <Panel
            title="Recent roadmaps"
            icon={MapIcon}
            action={
              <Link
                href="/roadmaps"
                className="text-xs font-medium text-primary hover:underline"
              >
                View all
              </Link>
            }
          >
            <ul className="-my-2 divide-y">
              {profile.roadmaps.slice(0, 5).map((r) => {
                const pct = roadmapPercent(r);
                return (
                  <li key={r._id}>
                    <Link
                      href={`/roadmaps/${r._id}`}
                      className="group flex items-center gap-3 py-3"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium group-hover:text-primary">
                          {r.title}
                        </p>
                        <Progress value={pct} className="mt-2 h-1" />
                      </div>
                      <span className="w-9 text-right text-xs text-muted-foreground tabular-nums">
                        {pct}%
                      </span>
                      <ChevronRight className="size-4 text-muted-foreground" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </Panel>
        </div>
      )}

      {profile.skills.length > 0 && (
        <Panel title="Skills" icon={CheckCircle2}>
          <div className="flex flex-wrap gap-2">
            {profile.skills.map((s) => (
              <Badge key={s} variant="secondary">
                {s}
              </Badge>
            ))}
          </div>
        </Panel>
      )}

      <Panel title="Saved project ideas" icon={Lightbulb}>
        {profile.projectIdeas.length === 0 ? (
          <p className="py-6 text-center text-sm text-muted-foreground">
            Open a roadmap and use <strong>Project ideas</strong> on any module.
            Ideas you generate will be saved here.
          </p>
        ) : (
          <div className="grid gap-3 md:grid-cols-2">
            {profile.projectIdeas.map((group) => (
              <details key={group._id} className="group rounded-xl border">
                <summary className="flex cursor-pointer list-none items-center gap-3 p-4 [&::-webkit-details-marker]:hidden">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{group.moduleTitle}</p>
                    <p className="text-xs text-muted-foreground">
                      {group.projectIdeas.length} ideas
                      {group.createdAt &&
                        ` · ${format(new Date(group.createdAt), "MMM d, yyyy")}`}
                    </p>
                  </div>
                  <ChevronRight className="size-4 text-muted-foreground transition-transform group-open:rotate-90" />
                </summary>
                <ol className="space-y-2 border-t p-4 text-sm text-muted-foreground">
                  {group.projectIdeas.map((idea, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="font-mono text-xs text-primary">{i + 1}.</span>
                      {idea}
                    </li>
                  ))}
                </ol>
              </details>
            ))}
          </div>
        )}
      </Panel>
    </div>
  );
}
