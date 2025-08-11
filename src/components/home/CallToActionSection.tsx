import { SectionHeader } from "@/components/common/SectionHeader";
import { Target } from "lucide-react";

export function CallToActionSection() {
  return (
    <section className="mb-8">
      <SectionHeader
        title="Ready to Start?"
        description="Join PathwiseAI and take control of your learning journey."
        icon={<Target className="h-8 w-8 text-green-400 animate-pulse" />}
      />
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a href="/roadmaps">
          <button className="glass-card px-8 py-3 text-lg font-semibold text-white bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-700 hover:to-cyan-600 shadow-xl transition-transform duration-300 hover:scale-105 border-none">
            🚀 Generate My Roadmap
          </button>
        </a>
        <a href="/about">
          <button className="glass-card px-8 py-3 text-lg font-semibold text-indigo-700 dark:text-indigo-300 border border-indigo-300 dark:border-indigo-500 bg-white/30 dark:bg-[#23272f]/30 shadow-xl transition-transform duration-300 hover:scale-105">
            Learn More
          </button>
        </a>
      </div>
    </section>
  );
}
