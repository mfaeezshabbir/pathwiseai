"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Check, Loader2, Map as MapIcon, Trash2 } from "lucide-react";
import { toast } from "sonner";

import type { ProgressMap, SavedRoadmap } from "@/lib/roadmap";
import { useRequireAuth } from "@/hooks/use-require-auth";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { EmptyState } from "@/components/common/empty-state";
import { RoadmapView } from "@/components/roadmap/roadmap-view";

type SaveState = "idle" | "saving" | "saved";

export default function RoadmapDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { ready } = useRequireAuth();

  const [roadmap, setRoadmap] = useState<SavedRoadmap | null>(null);
  const [progress, setProgress] = useState<ProgressMap>({});
  const [status, setStatus] = useState<"loading" | "ready" | "missing">("loading");
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!id || !ready) return;
    const key = `savedRoadmap:${id}`;
    try {
      const cached = sessionStorage.getItem(key);
      if (cached) {
        const parsed: SavedRoadmap = JSON.parse(cached);
        // Hydrate instantly from the client-only cache while the fresh copy loads
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setRoadmap(parsed);
        setProgress(parsed.progress ?? {});
        setStatus("ready");
      }
    } catch {
      // cache is best-effort
    }

    fetch(`/api/roadmap/${id}`)
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then(({ roadmap }: { roadmap: SavedRoadmap }) => {
        setRoadmap(roadmap);
        setProgress(roadmap.progress ?? {});
        setStatus("ready");
        try {
          sessionStorage.setItem(key, JSON.stringify(roadmap));
        } catch {}
      })
      .catch(() => setStatus((s) => (s === "ready" ? s : "missing")));
  }, [id, ready]);

  const persist = useCallback(
    (next: ProgressMap) => {
      setSaveState("saving");
      if (saveTimer.current) clearTimeout(saveTimer.current);
      saveTimer.current = setTimeout(async () => {
        try {
          const res = await fetch(`/api/roadmap/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ progress: next }),
          });
          if (!res.ok) throw new Error();
          setSaveState("saved");
          setRoadmap((r) => {
            if (!r) return r;
            const updated = { ...r, progress: next };
            try {
              sessionStorage.setItem(`savedRoadmap:${id}`, JSON.stringify(updated));
            } catch {}
            return updated;
          });
        } catch {
          setSaveState("idle");
          toast.error("Couldn't save your progress", {
            description: "We'll retry the next time you check something off.",
          });
        }
      }, 600);
    },
    [id],
  );

  useEffect(() => () => {
    if (saveTimer.current) clearTimeout(saveTimer.current);
  }, []);

  const toggle = (key: string) => {
    const next = { ...progress };
    if (next[key]) delete next[key];
    else next[key] = true;
    setProgress(next);
    persist(next);
  };

  const remove = async () => {
    const res = await fetch(`/api/roadmap/${id}`, { method: "DELETE" });
    if (res.ok) {
      try {
        sessionStorage.removeItem(`savedRoadmap:${id}`);
      } catch {}
      toast.success("Roadmap deleted");
      router.push("/roadmaps");
    } else {
      toast.error("Couldn't delete this roadmap");
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <div className="mb-8 flex items-center justify-between gap-4">
        <Button asChild variant="ghost" size="sm" className="-ml-2.5">
          <Link href="/roadmaps">
            <ArrowLeft /> All roadmaps
          </Link>
        </Button>
        {status === "ready" && (
          <span
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground"
            aria-live="polite"
          >
            {saveState === "saving" && (
              <>
                <Loader2 className="size-3.5 animate-spin" /> Saving…
              </>
            )}
            {saveState === "saved" && (
              <>
                <Check className="size-3.5 text-success" /> Progress saved
              </>
            )}
          </span>
        )}
      </div>

      {status === "loading" && (
        <div className="space-y-6">
          <Skeleton className="h-10 w-2/3" />
          <Skeleton className="h-5 w-1/2" />
          <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
            <div className="space-y-4">
              {[0, 1, 2].map((i) => (
                <Skeleton key={i} className="h-56 rounded-2xl" />
              ))}
            </div>
            <Skeleton className="h-40 rounded-2xl" />
          </div>
        </div>
      )}

      {status === "missing" && (
        <EmptyState
          icon={MapIcon}
          title="Roadmap not found"
          description="It may have been deleted, or it belongs to another account."
          action={
            <Button asChild>
              <Link href="/roadmaps">Back to my roadmaps</Link>
            </Button>
          }
        />
      )}

      {status === "ready" && roadmap && (
        <RoadmapView
          roadmap={roadmap}
          progress={progress}
          onToggle={toggle}
          headerActions={
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Trash2 /> Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete this roadmap?</AlertDialogTitle>
                  <AlertDialogDescription>
                    &ldquo;{roadmap.title}&rdquo; and its progress will be
                    permanently removed. This can&rsquo;t be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={remove}
                    className="bg-destructive text-white hover:bg-destructive/90"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          }
        />
      )}
    </div>
  );
}
