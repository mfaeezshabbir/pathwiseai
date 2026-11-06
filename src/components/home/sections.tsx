import Link from "next/link";
import {
  ArrowRight,
  BookOpenCheck,
  Gauge,
  Lightbulb,
  ListChecks,
  MessagesSquare,
  Route,
} from "lucide-react";
import { Button } from "@/components/ui/button";

function SectionIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="text-xs font-medium tracking-wide text-primary uppercase">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-pretty text-muted-foreground">{description}</p>
    </div>
  );
}

const features = [
  {
    icon: Route,
    title: "Roadmaps built for you",
    body: "Your current level, weekly time budget and learning style shape every path, so you never start from a generic syllabus.",
    className: "md:col-span-2",
  },
  {
    icon: BookOpenCheck,
    title: "Curated resources",
    body: "Official docs, quality articles, videos and courses, grouped by topic.",
  },
  {
    icon: ListChecks,
    title: "Track every step",
    body: "Check off resources as you go. Progress is saved and summarized per module.",
  },
  {
    icon: Lightbulb,
    title: "Project ideas on demand",
    body: "Turn any module into hands-on projects that cement what you learned.",
  },
  {
    icon: MessagesSquare,
    title: "An AI tutor that knows context",
    body: "Stuck on a concept or a bug? Ask the assistant from anywhere in the app. It can even suggest your next roadmap.",
  },
];

export function Features() {
  return (
    <section id="features" className="scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionIntro
          eyebrow="Features"
          title="Everything you need to go from zero to shipped"
          description="PathwiseAI replaces a dozen open tabs with one structured, trackable plan."
        />
        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {features.map(({ icon: Icon, title, body, className }) => (
            <div
              key={title}
              className={`group rounded-2xl border bg-card p-6 transition-colors hover:border-primary/30 ${className ?? ""}`}
            >
              <span className="flex size-10 items-center justify-center rounded-xl bg-accent text-accent-foreground transition-transform group-hover:-translate-y-0.5">
                <Icon className="size-5" />
              </span>
              <h3 className="mt-5 font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const steps = [
  {
    title: "Pick a skill",
    body: "Anything from React to data engineering. Type it or choose a popular path.",
  },
  {
    title: "Tune it to you",
    body: "Share your level, weekly hours and how you like to learn. Takes 20 seconds.",
  },
  {
    title: "Learn & track",
    body: "Work through modules, check off resources, and build the suggested projects.",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="scroll-mt-20 border-y bg-secondary/40 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionIntro
          eyebrow="How it works"
          title="From idea to plan in under a minute"
          description="No courses to buy and no syllabus to decode. Just a clear sequence of what to learn next."
        />
        <ol className="mt-14 grid gap-6 md:grid-cols-3">
          {steps.map((step, i) => (
            <li key={step.title} className="relative">
              <div className="flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-full border-2 border-primary/30 bg-background font-mono text-sm font-semibold text-primary">
                  {i + 1}
                </span>
                {i < steps.length - 1 && (
                  <span className="hidden h-px flex-1 bg-border md:block" />
                )}
              </div>
              <h3 className="mt-5 font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function CallToAction() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative isolate overflow-hidden rounded-3xl bg-primary px-6 py-14 text-center text-primary-foreground sm:px-12 sm:py-20">
          <div className="bg-grid absolute inset-0 -z-10 opacity-40 [--grid-line:oklch(1_0_0/0.12)]" />
          <Gauge className="mx-auto size-8 opacity-80" />
          <h2 className="mx-auto mt-5 max-w-xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Stop collecting tutorials.{" "}
            <span className="font-display font-normal italic">
              Start making progress.
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-md opacity-80">
            Create your first roadmap for free and see exactly what to learn
            next.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
            >
              <Link href="/roadmaps/new">
                Create my roadmap <ArrowRight />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="ghost"
              className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              <Link href="/about">Learn more</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
