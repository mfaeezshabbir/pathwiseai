import { SectionHeader } from "@/components/common/SectionHeader";
import { Target } from "lucide-react";

export function CallToActionSection() {
  return (
    <section className="relative overflow-hidden rounded-lg p-4 sm:p-8 md:p-12">
      {/* Decorative background blobs */}
      <div className="pointer-events-none absolute -left-10 -top-10 z-0 h-40 w-40 rounded-full bg-gradient-to-br from-green-200 via-cyan-200 to-indigo-200 opacity-30 blur-3xl sm:h-64 sm:w-64" />
      <div className="pointer-events-none absolute -bottom-16 -right-16 z-0 h-48 w-48 rounded-full bg-gradient-to-tr from-indigo-300 via-cyan-200 to-green-200 opacity-20 blur-3xl sm:h-72 sm:w-72" />

      <SectionHeader
        title="Ready to Take the Next Step?"
        description="Join PathwiseAI and advance your professional development with confidence."
        icon={
          <Target className="h-10 w-10 animate-bounce text-green-500 drop-shadow-lg" />
        }
      />

      <div className="relative z-10 mt-4 flex flex-col justify-center gap-4 sm:flex-row sm:gap-6">
        <a href="/roadmaps" tabIndex={-1} className="min-w-[200px] flex-1">
          <button className="glass-card group flex w-full items-center justify-center gap-2 border-none bg-gradient-to-r from-indigo-700 via-cyan-600 to-green-500 px-6 py-3 text-base font-semibold text-white shadow-2xl transition-all duration-300 ease-in-out hover:from-indigo-800 hover:to-green-600 sm:px-10 sm:py-4 sm:text-lg">
            <span className="transition-transform group-hover:rotate-6">
              🚀
            </span>
            Create My Roadmap
          </button>
        </a>
        <a href="/about" tabIndex={-1} className="min-w-[200px] flex-1">
          <button className="glass-card group flex w-full items-center justify-center gap-2 border border-indigo-300 bg-white/50 px-6 py-3 text-base font-semibold text-indigo-800 shadow-xl transition-all duration-300 dark:border-indigo-500 dark:bg-[#23272f]/50 dark:text-indigo-200 sm:px-10 sm:py-4 sm:text-lg">
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
