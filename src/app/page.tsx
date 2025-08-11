import { HomeHero } from "@/components/common/HomeHero";
import { AppNavbar } from "@/components/common/AppNavbar";
import { AppFooter } from "@/components/common/AppFooter";
import { SectionHeader } from "@/components/common/SectionHeader";
import { AppCard } from "@/components/common/AppCard";
import { TestimonialsScroller } from "@/components/common/TestimonialsScroller";
import { BookOpen, Sparkles, User, Target } from "lucide-react";

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
    <div className="relative min-h-screen flex flex-col overflow-x-hidden">
      <StarBackground />
      <AppNavbar />
      <main className="flex-1 w-full mx-auto px-4 pt-8 pb-16 z-10 relative">
        <HomeHero />

        {/* Features Section */}
        <SectionHeader
          title="Why PathwiseAI?"
          description="Unlock your learning potential with these powerful features."
          icon={<Sparkles className="h-8 w-8 text-indigo-400 animate-bounce" />}
        />
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <AppCard
            title="Personalized Roadmaps"
            className="shadow-xl bg-white/60 dark:bg-[#23272f]/60 backdrop-blur-lg hover:scale-105 transition-transform duration-300"
          >
            <p>
              Get AI-generated, step-by-step learning paths tailored to your
              goals, skills, and schedule.
            </p>
          </AppCard>
          <AppCard
            title="AI Tutoring"
            className="shadow-xl bg-white/60 dark:bg-[#23272f]/60 backdrop-blur-lg hover:scale-105 transition-transform duration-300"
          >
            <p>
              Ask questions and get instant, clear explanations from your
              personal AI tutor—anytime you’re stuck.
            </p>
          </AppCard>
          <AppCard
            title="Progress & Achievements"
            className="shadow-xl bg-white/60 dark:bg-[#23272f]/60 backdrop-blur-lg hover:scale-105 transition-transform duration-300"
          >
            <p>
              Track your progress, earn badges, and build a portfolio of
              completed projects as you learn.
            </p>
          </AppCard>
        </div>

        {/* How It Works Section */}
        <SectionHeader
          title="How It Works"
          description="A simple, guided process to help you master any skill."
          icon={
            <BookOpen className="h-8 w-8 text-cyan-400 animate-spin-slow" />
          }
        />
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <AppCard
            title="1. Set Your Goal"
            className="shadow-lg bg-white/60 dark:bg-[#23272f]/60 backdrop-blur-lg hover:scale-105 transition-transform duration-300"
          >
            <p>
              Tell us what you want to learn or achieve. The more details, the
              better your roadmap.
            </p>
          </AppCard>
          <AppCard
            title="2. Get Your Roadmap"
            className="shadow-lg bg-white/60 dark:bg-[#23272f]/60 backdrop-blur-lg hover:scale-105 transition-transform duration-300"
          >
            <p>
              Receive a personalized, interactive roadmap with curated resources
              and tasks.
            </p>
          </AppCard>
          <AppCard
            title="3. Learn & Track"
            className="shadow-lg bg-white/60 dark:bg-[#23272f]/60 backdrop-blur-lg hover:scale-105 transition-transform duration-300"
          >
            <p>
              Follow your roadmap, ask the AI for help, and track your progress
              as you go.
            </p>
          </AppCard>
        </div>

        {/* Testimonials Section */}
        <SectionHeader
          title="What Learners Say"
          description="Hear from people who’ve used PathwiseAI to reach their goals."
          icon={<User className="h-8 w-8 text-pink-400 animate-pulse" />}
        />
        {/* Testimonials Scrollable Section */}
        <TestimonialsScroller />

        {/* Call to Action Section */}
        <SectionHeader
          title="Ready to Start?"
          description="Join PathwiseAI and take control of your learning journey."
          icon={<Target className="h-8 w-8 text-green-400 animate-pulse" />}
        />
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <a href="/roadmaps">
            <button className="bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-700 hover:to-cyan-600 text-white font-semibold px-8 py-3 rounded-lg shadow-xl text-lg transition-transform duration-300 hover:scale-105">
              🚀 Generate My Roadmap
            </button>
          </a>
          <a href="/about">
            <button className="bg-white/80 dark:bg-[#23272f]/80 border border-indigo-600 dark:border-indigo-300 text-indigo-700 dark:text-indigo-300 font-semibold px-8 py-3 rounded-lg shadow-xl text-lg transition-transform duration-300 hover:scale-105">
              Learn More
            </button>
          </a>
        </div>
      </main>
    </div>
  );
}

// Add this to your global CSS for slow spin animation
// .animate-spin-slow { animation: spin 4s linear infinite; }
