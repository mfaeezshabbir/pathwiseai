import { SectionHeader } from "@/components/common/SectionHeader";
import { Target, ArrowRight, Info } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CallToActionSection() {
  return (
    <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-50 via-cyan-50 to-green-50 p-6 shadow-lg dark:from-indigo-900/30 dark:via-cyan-900/20 dark:to-green-900/20 sm:p-12 md:p-16">
      {/* Decorative background blobs */}
      <div className="pointer-events-none absolute -left-20 -top-20 z-0 h-64 w-64 rounded-full bg-gradient-to-br from-green-200 via-cyan-200 to-indigo-200 opacity-30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 z-0 h-80 w-80 rounded-full bg-gradient-to-tr from-indigo-300 via-cyan-200 to-green-200 opacity-20 blur-3xl" />

      <div className="relative z-10 flex flex-col items-center gap-4 text-center">
        <div className="mb-2 flex items-center justify-center">
          <Target className="h-12 w-12 animate-bounce text-green-500 drop-shadow-lg" />
        </div>
        <SectionHeader
          title="Ready to Take the Next Step?"
          description="Join PathwiseAI and advance your professional development with confidence."
        />
      </div>

      <div className="relative z-10 mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-8">
        <Link href="/roadmaps" className="w-full sm:w-auto">
          <Button
            size="lg"
            className="w-full bg-gradient-to-r from-indigo-600 via-cyan-600 to-green-500 font-semibold text-white shadow-xl transition-all hover:from-indigo-700 hover:to-green-600 sm:w-auto"
          >
            <span className="mr-2 text-xl">🚀</span>
            Create My Roadmap
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
        <Link href="/about" className="w-full sm:w-auto">
          <Button
            variant="outline"
            size="lg"
            className="w-full border-indigo-300 bg-white/70 font-semibold text-indigo-800 shadow-md transition-all hover:bg-indigo-50 dark:border-indigo-500 dark:bg-[#23272f]/50 dark:text-indigo-200 dark:hover:bg-indigo-900/30 sm:w-auto"
          >
            <Info className="mr-2 h-5 w-5" />
            Discover More
          </Button>
        </Link>
      </div>
    </section>
  );
}
