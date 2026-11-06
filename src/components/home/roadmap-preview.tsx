import { Check, Code2, FileText, PlayCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const modules = [
  { name: "Foundations", detail: "JSX, components & props", state: "done" },
  { name: "State & effects", detail: "Hooks, data flow, forms", state: "active" },
  { name: "Routing & data", detail: "Next.js App Router, fetching", state: "next" },
  { name: "Ship it", detail: "Testing, performance, deploy", state: "next" },
] as const;

/** Static, illustrative product preview shown on the landing page. */
export function RoadmapPreview() {
  return (
    <div className="relative" aria-hidden="true">
      <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-primary/10 blur-2xl" />
      <div className="rounded-2xl border bg-card p-5 shadow-xl shadow-primary/5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium text-muted-foreground">
              Your roadmap
            </p>
            <p className="mt-0.5 text-lg font-semibold tracking-tight">
              Modern React Developer
            </p>
          </div>
          <span className="rounded-full bg-accent px-2.5 py-1 text-xs font-medium text-accent-foreground">
            6 hrs / week
          </span>
        </div>

        <div className="mt-4">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Progress</span>
            <span className="font-medium text-foreground tabular-nums">38%</span>
          </div>
          <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-secondary">
            <div className="h-full w-[38%] rounded-full bg-primary" />
          </div>
        </div>

        <ol className="relative mt-6 space-y-1">
          <span className="absolute top-4 bottom-4 left-[15px] w-px bg-border" />
          {modules.map((m, i) => (
            <li
              key={m.name}
              className={cn(
                "relative flex items-center gap-3 rounded-xl px-0 py-2",
                m.state === "active" && "bg-accent/60 -mx-2 px-2",
              )}
            >
              <span
                className={cn(
                  "relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full border text-xs font-semibold",
                  m.state === "done" &&
                    "border-success/30 bg-success text-white",
                  m.state === "active" &&
                    "border-primary bg-primary text-primary-foreground",
                  m.state === "next" && "bg-card text-muted-foreground",
                )}
              >
                {m.state === "done" ? <Check className="size-4" /> : i + 1}
              </span>
              <div className="min-w-0">
                <p className="text-sm font-medium">{m.name}</p>
                <p className="truncate text-xs text-muted-foreground">
                  {m.detail}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-5 grid grid-cols-3 gap-2 border-t pt-4 text-xs">
          {[
            { icon: PlayCircle, label: "12 videos" },
            { icon: FileText, label: "18 docs" },
            { icon: Code2, label: "5 projects" },
          ].map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center justify-center gap-1.5 rounded-lg bg-secondary/70 py-2 text-muted-foreground"
            >
              <Icon className="size-3.5" />
              {label}
            </div>
          ))}
        </div>
      </div>

      <div className="absolute -bottom-5 -left-4 hidden rounded-xl border bg-card px-3.5 py-2.5 shadow-lg sm:block">
        <p className="text-[11px] text-muted-foreground">Up next</p>
        <p className="text-sm font-medium">Build a custom useFetch hook</p>
      </div>
    </div>
  );
}
