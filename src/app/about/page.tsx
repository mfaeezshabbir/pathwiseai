import { MissionSection } from "@/components/about/MissionSection";
import { HighlightsSection } from "@/components/about/HighlightsSection";
import { WhatWeDoSection } from "@/components/about/WhatWeDoSection";
import { DeveloperSection } from "@/components/about/DeveloperSection";

export default function AboutPage() {
  return (
    <div className="mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="space-y-12">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
            About PathwiseAI
          </h1>
          <p className="mt-4 text-xl text-muted-foreground">
            Your personalized AI-powered guide to mastering any skill.
          </p>
        </header>

        <MissionSection />
        <HighlightsSection />
        <WhatWeDoSection />
        <DeveloperSection />
      </div>
    </div>
  );
}
