import { SectionHeader } from "@/components/common/SectionHeader";
import { AppCard } from "@/components/common/AppCard";
import { Sparkles } from "lucide-react";

export function FeaturesSection() {
  return (
    <section className="mb-20">
      <SectionHeader
        title="Why PathwiseAI?"
        description="Unlock your learning potential with these powerful features."
        icon={<Sparkles className="h-8 w-8 text-indigo-400 animate-bounce" />}
      />
      <div className="grid md:grid-cols-3 gap-8">
        <AppCard title="Personalized Roadmaps" className="glass-card">
          <p>
            Get AI-generated, step-by-step learning paths tailored to your
            goals, skills, and schedule.
          </p>
        </AppCard>
        <AppCard title="AI Tutoring" className="glass-card">
          <p>
            Ask questions and get instant, clear explanations from your personal
            AI tutor—anytime you’re stuck.
          </p>
        </AppCard>
        <AppCard title="Progress & Achievements" className="glass-card">
          <p>
            Track your progress, earn badges, and build a portfolio of completed
            projects as you learn.
          </p>
        </AppCard>
      </div>
    </section>
  );
}
