import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Compass, Hammer, MessagesSquare, Route } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "About" };

const pillars = [
  {
    icon: Route,
    title: "Structure over noise",
    body: "A clear sequence of what to learn, in what order, instead of an endless feed of tutorials.",
  },
  {
    icon: Compass,
    title: "Personal by default",
    body: "Your level, schedule and learning style shape every roadmap you generate.",
  },
  {
    icon: Hammer,
    title: "Learn by building",
    body: "Every module comes with projects, so knowledge turns into a portfolio.",
  },
  {
    icon: MessagesSquare,
    title: "Help when you're stuck",
    body: "An AI tutor that can explain concepts, review code and point you to your next step.",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-20">
      <section className="max-w-3xl">
        <p className="text-xs font-medium tracking-wide text-primary uppercase">
          About
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          We help self-learners find{" "}
          <span className="font-display font-normal text-primary italic">
            the path
          </span>
          , not just more content.
        </h1>
        <p className="mt-6 text-lg text-pretty text-muted-foreground">
          PathwiseAI empowers learners of every background to reach their
          goals through personalized, AI-generated roadmaps and hands-on
          projects. Whether you&rsquo;re starting out or levelling up, it guides
          you one milestone at a time.
        </p>
      </section>

      <section className="mt-16 grid gap-px overflow-hidden rounded-2xl border bg-border sm:grid-cols-2">
        {pillars.map(({ icon: Icon, title, body }) => (
          <div key={title} className="bg-card p-6 sm:p-8">
            <Icon className="size-5 text-primary" />
            <h2 className="mt-4 font-semibold">{title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {body}
            </p>
          </div>
        ))}
      </section>

      <section className="mt-16 grid items-center gap-8 rounded-2xl border bg-card p-6 sm:p-10 md:grid-cols-[auto_1fr]">
        <img
          src="https://avatars.githubusercontent.com/u/74614920?v=4"
          alt="M. Faeez Shabbir"
          width={112}
          height={112}
          className="size-24 rounded-2xl object-cover sm:size-28"
        />
        <div>
          <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
            Meet the developer
          </p>
          <p className="mt-1 text-xl font-semibold">M. Faeez Shabbir</p>
          <p className="text-sm text-muted-foreground">Founder & solo developer</p>
          <blockquote className="mt-4 border-l-2 border-primary pl-4 text-pretty text-muted-foreground">
            &ldquo;I built PathwiseAI to solve my own learning struggles:
            fragmented resources, no structure, and no clear path. My goal is to
            help others learn efficiently and confidently.&rdquo;
          </blockquote>
        </div>
      </section>

      <section className="mt-16 flex flex-col items-start justify-between gap-6 border-t pt-10 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">
            Ready to map your next skill?
          </h2>
          <p className="mt-1 text-muted-foreground">
            It takes less than a minute to get started.
          </p>
        </div>
        <Button asChild size="lg">
          <Link href="/roadmaps/new">
            Create a roadmap <ArrowRight />
          </Link>
        </Button>
      </section>
    </div>
  );
}
