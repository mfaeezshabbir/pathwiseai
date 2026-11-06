import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="relative isolate flex min-h-[70vh] items-center justify-center px-4">
      <div className="bg-grid mask-fade-b absolute inset-0 -z-10" />
      <div className="max-w-md text-center">
        <span className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
          <Compass className="size-6" />
        </span>
        <p className="mt-6 font-mono text-sm text-primary">404</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">
          This path doesn&rsquo;t exist
        </h1>
        <p className="mt-3 text-muted-foreground">
          The page you&rsquo;re looking for was moved, deleted, or never
          existed.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-2 sm:flex-row">
          <Button asChild>
            <Link href="/">
              <ArrowLeft /> Back home
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/roadmaps/new">Create a roadmap</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
