import { useState } from "react";
import { AppCard } from "@/components/common/AppCard";
import { EmptyState } from "@/components/common/EmptyState";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const MAX_VISIBLE = 3;

export function MyRoadmaps({ roadmaps }: { roadmaps: any[] }) {
  const [open, setOpen] = useState(false);

  const visibleRoadmaps = roadmaps.slice(0, MAX_VISIBLE);
  const hasMore = roadmaps.length > MAX_VISIBLE;

  return (
    <>
      <AppCard
        title="My Roadmaps"
        description="Your saved learning paths"
        contentClass="space-y-4"
        className="hover:translate-y-0"
      >
        {roadmaps.length === 0 && <EmptyState message="No roadmaps yet." />}
        {visibleRoadmaps.map((roadmap, index) => (
          <div
            key={index}
            className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-muted/50"
          >
            <div>
              <h3 className="font-semibold">{roadmap.title}</h3>
              <p className="text-sm text-muted-foreground">
                {roadmap.progress}% complete
              </p>
            </div>
            <Button variant="secondary" size="sm">
              Continue
            </Button>
          </div>
        ))}
        {hasMore && (
          <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
            Show all
          </Button>
        )}
      </AppCard>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>All Roadmaps</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {roadmaps.map((roadmap, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-muted/50"
              >
                <div>
                  <h3 className="font-semibold">{roadmap.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {roadmap.progress}% complete
                  </p>
                </div>
                <Button variant="secondary" size="sm">
                  Continue
                </Button>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
