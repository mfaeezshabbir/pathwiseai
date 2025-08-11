import { SectionHeader } from "@/components/common/SectionHeader";
import { AppCard } from "@/components/common/AppCard";
import { BookOpen } from "lucide-react";

export function HowItWorksSection() {
  return (
    <section className="mb-20">
      <SectionHeader
        title="How It Works"
        description="A simple, guided process to help you master any skill."
        icon={<BookOpen className="h-8 w-8 text-cyan-400 animate-spin-slow" />}
      />
      <div className="grid md:grid-cols-3 gap-8">
        <AppCard title="1. Set Your Goal" className="glass-card">
          <p>
            Tell us what you want to learn or achieve. The more details, the
            better your roadmap.
          </p>
        </AppCard>
        <AppCard title="2. Get Your Roadmap" className="glass-card">
          <p>
            Receive a personalized, interactive roadmap with curated resources
            and tasks.
          </p>
        </AppCard>
        <AppCard title="3. Learn & Track" className="glass-card">
          <p>
            Follow your roadmap, ask the AI for help, and track your progress as
            you go.
          </p>
        </AppCard>
      </div>
    </section>
  );
}
