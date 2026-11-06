"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Brain,
  Check,
  Code2,
  Cpu,
  Database,
  Globe,
  Hammer,
  Palette,
  PlayCircle,
  Smartphone,
  Sparkles,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import type { GenerateRoadmapOutput } from "@/lib/roadmap";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { GeneratingState } from "./generating-state";
import { RoadmapView } from "./roadmap-view";

const categories: { name: string; icon: LucideIcon; skills: string[] }[] = [
  { name: "Frontend", icon: Globe, skills: ["React", "Next.js", "TypeScript", "Vue.js"] },
  { name: "Backend", icon: Database, skills: ["Node.js", "Python", "Go", "PostgreSQL"] },
  { name: "Mobile", icon: Smartphone, skills: ["React Native", "Flutter", "Swift", "Kotlin"] },
  { name: "Data & AI", icon: TrendingUp, skills: ["Machine Learning", "Data Analysis", "LLM Apps", "SQL"] },
  { name: "DevOps & Cloud", icon: Cpu, skills: ["Docker", "Kubernetes", "AWS", "CI/CD"] },
  { name: "Design", icon: Palette, skills: ["UI/UX Design", "Figma", "Design Systems"] },
];

const levels = [
  { value: "beginner", label: "Beginner", description: "New to this. Start from the fundamentals." },
  { value: "intermediate", label: "Intermediate", description: "I know the basics and want to go deeper." },
  { value: "advanced", label: "Advanced", description: "Experienced. Focus on expert topics." },
];

const times = [
  { value: "1-3 hours", label: "1–3 hrs", description: "Light" },
  { value: "4-6 hours", label: "4–6 hrs", description: "Steady" },
  { value: "7-10 hours", label: "7–10 hrs", description: "Focused" },
  { value: "10+ hours", label: "10+ hrs", description: "Intensive" },
];

const styles: { value: string; label: string; description: string; icon: LucideIcon }[] = [
  { value: "video-first", label: "Video", description: "Learn from tutorials and talks", icon: PlayCircle },
  { value: "hands-on coding", label: "Hands-on", description: "Learn by writing code", icon: Code2 },
  { value: "theory", label: "Theory first", description: "Understand concepts deeply", icon: Brain },
  { value: "project-based", label: "Project-based", description: "Build real things end to end", icon: Hammer },
];

const STEPS = ["Skill", "Level", "Time", "Style"] as const;

type Prefs = {
  desiredSkill: string;
  knowledgeLevel: string;
  availableTime: string;
  learningStyle: string;
  specificGoals: string;
};

function OptionCard({
  selected,
  onSelect,
  children,
  className,
}: {
  selected: boolean;
  onSelect: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      className={cn(
        "relative rounded-xl border bg-card p-4 text-left transition-all outline-none hover:border-primary/40 focus-visible:ring-[3px] focus-visible:ring-ring/40",
        selected && "border-primary bg-accent/50 ring-1 ring-primary",
        className,
      )}
    >
      {selected && (
        <span className="absolute top-3 right-3 flex size-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Check className="size-3" />
        </span>
      )}
      {children}
    </button>
  );
}

/** Re-mounts the wizard when the ?skill= param changes (e.g. from the assistant). */
export function GeneratorWizard() {
  const initialSkill = useSearchParams().get("skill") ?? "";
  return <Wizard key={initialSkill} initialSkill={initialSkill} />;
}

function Wizard({ initialSkill }: { initialSkill: string }) {
  const router = useRouter();

  const [step, setStep] = useState(initialSkill ? 1 : 0);
  const [prefs, setPrefs] = useState<Prefs>({
    desiredSkill: initialSkill,
    knowledgeLevel: "",
    availableTime: "",
    learningStyle: "",
    specificGoals: "",
  });
  const [generating, setGenerating] = useState(false);
  const [draft, setDraft] = useState<GenerateRoadmapOutput | null>(null);

  const set = <K extends keyof Prefs>(key: K, value: Prefs[K]) =>
    setPrefs((p) => ({ ...p, [key]: value }));

  const canContinue = [
    prefs.desiredSkill.trim().length >= 2,
    !!prefs.knowledgeLevel,
    !!prefs.availableTime,
    !!prefs.learningStyle,
  ][step];

  const pickAndAdvance = <K extends keyof Prefs>(key: K, value: Prefs[K]) => {
    set(key, value);
    if (step < STEPS.length - 1) setTimeout(() => setStep((s) => s + 1), 160);
  };

  const generate = async () => {
    setGenerating(true);
    try {
      const res = await fetch("/api/roadmap/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(prefs),
      });
      if (!res.ok) throw new Error("generate failed");
      const roadmap: GenerateRoadmapOutput = await res.json();
      if (!roadmap?.categories?.length) throw new Error("empty roadmap");

      const saveRes = await fetch("/api/roadmap/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roadmap, preferences: prefs }),
      });
      if (saveRes.ok) {
        const { roadmap: saved } = await saveRes.json();
        try {
          sessionStorage.setItem(`savedRoadmap:${saved._id}`, JSON.stringify(saved));
        } catch {
          // storage is a cache only
        }
        toast.success("Your roadmap is ready");
        router.push(`/roadmaps/${saved._id}`);
        return;
      }
      toast.warning("Roadmap generated, but it couldn't be saved", {
        description: "Progress on this roadmap won't be kept.",
      });
      setDraft(roadmap);
      setGenerating(false);
    } catch (err) {
      console.error("Roadmap generation failed:", err);
      toast.error("We couldn't generate that roadmap", {
        description: "Please try again. Rephrasing the skill can help.",
      });
      setGenerating(false);
    }
  };

  if (draft) {
    return (
      <div className="space-y-6">
        <Button variant="ghost" size="sm" onClick={() => setDraft(null)}>
          <ArrowLeft /> Start over
        </Button>
        <RoadmapView roadmap={draft} />
      </div>
    );
  }

  if (generating) {
    return <GeneratingState skill={prefs.desiredSkill} />;
  }

  return (
    <div className="mx-auto max-w-3xl">
      {/* Stepper */}
      <ol className="mb-10 flex items-center gap-2" aria-label="Progress">
        {STEPS.map((label, i) => {
          const done = i < step;
          const current = i === step;
          return (
            <li key={label} className="flex flex-1 items-center gap-2">
              <button
                type="button"
                onClick={() => i < step && setStep(i)}
                disabled={i > step}
                aria-current={current ? "step" : undefined}
                className="flex items-center gap-2 disabled:cursor-default"
              >
                <span
                  className={cn(
                    "flex size-7 shrink-0 items-center justify-center rounded-full border text-xs font-semibold transition-colors",
                    done && "border-primary bg-primary text-primary-foreground",
                    current && "border-primary text-primary",
                    !done && !current && "text-muted-foreground",
                  )}
                >
                  {done ? <Check className="size-3.5" /> : i + 1}
                </span>
                <span
                  className={cn(
                    "hidden text-sm font-medium sm:inline",
                    current ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  {label}
                </span>
              </button>
              {i < STEPS.length - 1 && (
                <span
                  className={cn(
                    "h-px flex-1 transition-colors",
                    done ? "bg-primary" : "bg-border",
                  )}
                />
              )}
            </li>
          );
        })}
      </ol>

      <div key={step} className="animate-fade-up">
        {step === 0 && (
          <div className="space-y-8">
            <StepTitle
              title="What do you want to learn?"
              description="Type any skill, language or role, or pick a popular path below."
            />
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (canContinue) setStep(1);
              }}
              className="flex gap-2"
            >
              <Label htmlFor="skill" className="sr-only">
                Skill
              </Label>
              <Input
                id="skill"
                autoFocus
                value={prefs.desiredSkill}
                onChange={(e) => set("desiredSkill", e.target.value)}
                placeholder="e.g. TypeScript, Data Engineering, iOS Development"
                className="h-12 text-base"
                autoComplete="off"
              />
              <Button type="submit" size="lg" className="h-12" disabled={!canContinue}>
                Next <ArrowRight />
              </Button>
            </form>

            <div className="grid gap-3 sm:grid-cols-2">
              {categories.map(({ name, icon: Icon, skills }) => (
                <div key={name} className="rounded-xl border bg-card p-4">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Icon className="size-4 text-primary" />
                    {name}
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {skills.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => pickAndAdvance("desiredSkill", s)}
                        className={cn(
                          "rounded-full border px-2.5 py-1 text-xs font-medium transition-colors hover:border-primary/40 hover:text-primary",
                          prefs.desiredSkill === s &&
                            "border-primary bg-accent text-accent-foreground",
                        )}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-8">
            <StepTitle
              title={<>How familiar are you with <Em>{prefs.desiredSkill}</Em>?</>}
              description="We'll skip what you already know and pace the rest."
            />
            <div role="radiogroup" className="grid gap-3 sm:grid-cols-3">
              {levels.map((l, i) => (
                <OptionCard
                  key={l.value}
                  selected={prefs.knowledgeLevel === l.value}
                  onSelect={() => pickAndAdvance("knowledgeLevel", l.value)}
                >
                  <LevelBars level={i + 1} />
                  <div className="mt-4 font-medium">{l.label}</div>
                  <p className="mt-1 text-sm text-muted-foreground">{l.description}</p>
                </OptionCard>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-8">
            <StepTitle
              title="How much time can you give each week?"
              description="Be realistic. A steady pace beats an ambitious plan you abandon."
            />
            <div role="radiogroup" className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {times.map((t) => (
                <OptionCard
                  key={t.value}
                  selected={prefs.availableTime === t.value}
                  onSelect={() => pickAndAdvance("availableTime", t.value)}
                  className="text-center"
                >
                  <div className="text-xl font-semibold tracking-tight tabular-nums">
                    {t.label}
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{t.description}</p>
                </OptionCard>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-8">
            <StepTitle
              title="How do you like to learn?"
              description="We'll weight resources and projects toward your style."
            />
            <div role="radiogroup" className="grid gap-3 sm:grid-cols-2">
              {styles.map(({ value, label, description, icon: Icon }) => (
                <OptionCard
                  key={value}
                  selected={prefs.learningStyle === value}
                  onSelect={() => set("learningStyle", value)}
                  className="flex items-center gap-4"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary">
                    <Icon className="size-5 text-primary" />
                  </span>
                  <span>
                    <span className="block font-medium">{label}</span>
                    <span className="block text-sm text-muted-foreground">
                      {description}
                    </span>
                  </span>
                </OptionCard>
              ))}
            </div>
            <div className="space-y-2">
              <Label htmlFor="goals">
                Any specific goal?{" "}
                <span className="font-normal text-muted-foreground">(optional)</span>
              </Label>
              <Textarea
                id="goals"
                value={prefs.specificGoals}
                onChange={(e) => set("specificGoals", e.target.value)}
                placeholder="e.g. Land a junior frontend role, build a SaaS side project, pass an interview…"
                className="min-h-24"
                maxLength={500}
              />
            </div>
          </div>
        )}
      </div>

      <div className="mt-10 flex items-center justify-between border-t pt-6">
        <Button
          variant="ghost"
          onClick={() => setStep((s) => s - 1)}
          disabled={step === 0}
          className={cn(step === 0 && "invisible")}
        >
          <ArrowLeft /> Back
        </Button>
        {step < STEPS.length - 1 ? (
          <Button onClick={() => setStep((s) => s + 1)} disabled={!canContinue}>
            Continue <ArrowRight />
          </Button>
        ) : (
          <Button size="lg" onClick={generate} disabled={!canContinue}>
            <Sparkles /> Generate roadmap
          </Button>
        )}
      </div>
    </div>
  );
}

function StepTitle({
  title,
  description,
}: {
  title: React.ReactNode;
  description: string;
}) {
  return (
    <div>
      <h2 className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
        {title}
      </h2>
      <p className="mt-2 text-muted-foreground">{description}</p>
    </div>
  );
}

function Em({ children }: { children: React.ReactNode }) {
  return <span className="font-display font-normal text-primary italic">{children}</span>;
}

function LevelBars({ level }: { level: number }) {
  return (
    <span className="flex h-5 items-end gap-1" aria-hidden="true">
      {[1, 2, 3].map((n) => (
        <span
          key={n}
          className={cn(
            "w-1.5 rounded-full",
            n <= level ? "bg-primary" : "bg-border",
          )}
          style={{ height: `${n * 33}%` }}
        />
      ))}
    </span>
  );
}

