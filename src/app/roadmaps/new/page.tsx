"use client";

import { Suspense } from "react";
import { useRequireAuth } from "@/hooks/use-require-auth";
import { Skeleton } from "@/components/ui/skeleton";
import { GeneratorWizard } from "@/components/roadmap/generator-wizard";

function WizardSkeleton() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Skeleton className="h-7 w-full" />
      <Skeleton className="h-10 w-2/3" />
      <Skeleton className="h-12 w-full" />
      <div className="grid gap-3 sm:grid-cols-2">
        {[0, 1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-24 rounded-xl" />
        ))}
      </div>
    </div>
  );
}

export default function NewRoadmapPage() {
  const { ready } = useRequireAuth();

  return (
    <div className="relative isolate">
      <div className="bg-glow absolute inset-x-0 top-0 -z-10 h-80" />
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        {ready ? (
          <Suspense fallback={<WizardSkeleton />}>
            <GeneratorWizard />
          </Suspense>
        ) : (
          <WizardSkeleton />
        )}
      </div>
    </div>
  );
}
