"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Rocket } from "lucide-react";

// filepath: /home/mfaeezshabbir/pp/pathwiseai/src/app/not-found.tsx

export default function NotFound() {
  return (
    <div className="flex h-[70vh] flex-col items-center justify-center px-4">
      <div className="flex flex-col items-center gap-4">
        <Rocket className="h-16 w-16 text-indigo-500" />
        <h1 className="text-4xl font-bold text-indigo-700 dark:text-indigo-300">
          404 – Page Not Found
        </h1>
        <p className="max-w-md text-center text-lg text-muted-foreground">
          Oops! The page you&apos;re looking for doesn&apos;t exist or has been
          moved.
        </p>
        <Button asChild className="mt-4">
          <Link href="/">Go back home</Link>
        </Button>
      </div>
    </div>
  );
}
