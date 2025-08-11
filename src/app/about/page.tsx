import { MissionSection } from "@/components/about/MissionSection";
import { HighlightsSection } from "@/components/about/HighlightsSection";
import { WhatWeDoSection } from "@/components/about/WhatWeDoSection";
import { DeveloperSection } from "@/components/about/DeveloperSection";

export default function AboutPage() {
  return (
    <main className="relative min-h-screen w-full">
      <section className="relative z-10 flex flex-col items-center justify-center px-4 py-20 sm:px-8">
        <div className="max-w-3xl text-center">
          <h1 className="mb-4 bg-gradient-to-r from-indigo-600 via-fuchsia-500 to-pink-500 bg-clip-text text-5xl font-extrabold tracking-tight text-transparent drop-shadow-lg">
            About PathwiseAI
          </h1>
          <p className="mt-4 text-2xl font-medium text-muted-foreground">
            Your personalized AI-powered guide to mastering any skill.
          </p>
        </div>
      </section>

      <section className="relative z-10 mx-auto px-4 py-12">
        <MissionSection />
      </section>

      <section className="relative z-10 mx-auto px-4 py-12">
        <HighlightsSection />
      </section>

      <section className="relative z-10 mx-auto px-4 py-12">
        <WhatWeDoSection />
      </section>

      <section className="relative z-10 mx-auto px-4 py-12">
        <DeveloperSection />
      </section>
    </main>
  );
}
