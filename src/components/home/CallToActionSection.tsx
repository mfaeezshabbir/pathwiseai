import { SectionHeader } from "@/components/common/SectionHeader";
import { Target } from "lucide-react";

export function CallToActionSection() {
  return (
    <section className="p-4 sm:p-8 md:p-12 relative overflow-hidden rounded-lg">
      {/* Decorative background blobs */}
      <div className="absolute -top-10 -left-10 w-40 h-40 sm:w-64 sm:h-64 bg-gradient-to-br from-green-200 via-cyan-200 to-indigo-200 opacity-30 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="absolute -bottom-16 -right-16 w-48 h-48 sm:w-72 sm:h-72 bg-gradient-to-tr from-indigo-300 via-cyan-200 to-green-200 opacity-20 rounded-full blur-3xl pointer-events-none z-0" />

      <SectionHeader
        title="Ready to Take the Next Step?"
        description="Join PathwiseAI and advance your professional development with confidence."
        icon={
          <Target className="h-10 w-10 text-green-500 animate-bounce drop-shadow-lg" />
        }
      />

      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center z-10 relative mt-4">
        <a href="/roadmaps" tabIndex={-1} className="flex-1 min-w-[200px]">
          <button className="w-full glass-card px-6 sm:px-10 py-3 sm:py-4 text-base sm:text-lg font-semibold text-white bg-gradient-to-r from-indigo-700 via-cyan-600 to-green-500 hover:from-indigo-800 hover:to-green-600 shadow-2xl transition-all duration-300 hover:scale-105 border-none flex items-center justify-center gap-2 group">
            <span className="transition-transform group-hover:rotate-6">
              🚀
            </span>
            Create My Roadmap
          </button>
        </a>
        <a href="/about" tabIndex={-1} className="flex-1 min-w-[200px]">
          <button className="w-full glass-card px-6 sm:px-10 py-3 sm:py-4 text-base sm:text-lg font-semibold text-indigo-800 dark:text-indigo-200 border border-indigo-300 dark:border-indigo-500 bg-white/50 dark:bg-[#23272f]/50 shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 group">
            <span className="transition-transform group-hover:scale-110">
              ✨
            </span>
            Discover More
          </button>
        </a>
      </div>
    </section>
  );
}
