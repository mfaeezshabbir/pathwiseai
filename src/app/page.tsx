import { HomeHero } from "@/components/common/HomeHero";
import { AppNavbar } from "@/components/common/AppNavbar";
import { AppFooter } from "@/components/common/AppFooter";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { CallToActionSection } from "@/components/home/CallToActionSection";

// Simple animated star background
function StarBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <div className="w-full h-full animate-pulse bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-200/30 via-transparent to-cyan-200/10" />
      {/* Add more layers or use a particles.js library for more complex effects */}
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="relative min-h-screen flex flex-col overflow-x-hidden bg-gradient-to-tr from-[#e0e7ff] via-white/80 to-[#f0fdfa] dark:from-[#18181b] dark:via-[#23272f]/80 dark:to-[#18181b]">
      <StarBackground />
      <AppNavbar />
      <main className="flex-1 w-full mx-auto px-4 pt-8 pb-16 z-10 relative">
        <div className="max-w-6xl mx-auto">
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

// Add this to your global CSS for slow spin animation
// .animate-spin-slow { animation: spin 4s linear infinite; }
