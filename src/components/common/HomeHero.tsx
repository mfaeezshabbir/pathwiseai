import { AppLogo } from "@/components/common/AppLogo";
import Link from "next/link";

export function HomeHero() {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-[60vh] sm:min-h-[70vh] py-12 sm:py-20 px-4 sm:px-6 text-center glass-card border-b-4 border-indigo-300 dark:border-indigo-800 shadow-2xl rounded-2xl sm:rounded-3xl mb-8 sm:mb-14 overflow-hidden">
      {/* Decorative glowing background elements */}
      <div className="absolute top-[-60px] left-[-60px] w-40 h-40 sm:w-72 sm:h-72 bg-indigo-400 opacity-30 rounded-full blur-2xl sm:blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-40px] right-[-40px] w-56 h-56 sm:w-96 sm:h-96 bg-cyan-400 opacity-20 rounded-full blur-2xl sm:blur-3xl pointer-events-none" />
      <AppLogo size={70} className="mb-6 sm:mb-8 drop-shadow-lg" />
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold mb-4 sm:mb-6 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 via-fuchsia-500 to-cyan-500 dark:from-indigo-300 dark:via-fuchsia-400 dark:to-cyan-300 animate-pulse">
        Out-of-this-World AI Learning Roadmaps
      </h1>
      <p className="text-base sm:text-xl md:text-2xl text-gray-800 dark:text-gray-100 mb-6 sm:mb-10 max-w-xl sm:max-w-3xl mx-auto font-medium">
        Embark on a cosmic journey of knowledge with personalized learning
        paths, intelligent tutoring, and stellar resources powered by AI. Your
        universe of growth starts here!
      </p>
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center w-full max-w-xs sm:max-w-none mx-auto">
        <Link href="/roadmaps" className="w-full sm:w-auto">
          <button className="w-full sm:w-auto glass-card bg-gradient-to-r from-indigo-600 via-fuchsia-500 to-cyan-500 hover:from-indigo-700 hover:to-cyan-600 text-white font-bold px-6 sm:px-10 py-3 sm:py-4 rounded-xl shadow-lg transition-all text-lg sm:text-xl transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-300">
            🚀 View My Roadmaps
          </button>
        </Link>
        <Link href="/profile" className="w-full sm:w-auto">
          <button className="w-full sm:w-auto glass-card bg-white/30 dark:bg-[#23272f]/30 border-2 border-indigo-400 dark:border-indigo-300 text-indigo-700 dark:text-indigo-200 font-bold px-6 sm:px-10 py-3 sm:py-4 rounded-xl shadow-lg transition-all text-lg sm:text-xl hover:bg-indigo-50 dark:hover:bg-indigo-900 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-cyan-200">
            👤 Go to Profile
          </button>
        </Link>
      </div>
    </section>
  );
}
