import { HomeHero } from "@/components/common/HomeHero";
import { AppNavbar } from "@/components/common/AppNavbar";
import { AppFooter } from "@/components/common/AppFooter";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { CallToActionSection } from "@/components/home/CallToActionSection";

export default function HomePage() {
  return (
    <div className="relative min-h-screen flex flex-col overflow-x-hidden">
      <main className="flex-1 w-full mx-auto px-4 pb-16 z-10 relative">
        <div>
          <HomeHero />

          <FeaturesSection />
          <HowItWorksSection />
          <TestimonialsSection />
          <CallToActionSection />
        </div>
      </main>
    </div>
  );
}
