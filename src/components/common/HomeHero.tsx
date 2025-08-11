import { AppLogo } from "@/components/common/AppLogo";
import Link from "next/link";

export function HomeHero() {
  return (
    <section className="min-h-[80vh] flex flex-col items-center justify-center px-4 mb-16 bg-transparent">
      <div className="flex flex-col items-center">
        <AppLogo size={80} className="mb-8" />
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-gray-900 dark:text-white mb-6 text-center">
          Discover AI-Created Learning Paths
        </h1>
      </div>
      <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-200 max-w-2xl mb-10 font-medium text-center">
        Explore personalized, AI-generated roadmaps and resources.
        <br />
        Let AI guide your journey—step by step—towards your goals.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
        <Link href="/roadmaps" className="w-full sm:w-auto">
          <button className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-4 rounded-2xl shadow text-lg sm:text-xl transition-all focus:outline-none focus:ring-2 focus:ring-indigo-300">
            🌟 Explore Roadmaps
          </button>
        </Link>
        {/* <Link href="/community" className="w-full sm:w-auto">
          <button className="w-full sm:w-auto bg-white dark:bg-gray-800 border border-indigo-300 text-indigo-700 dark:text-indigo-200 font-semibold px-8 py-4 rounded-2xl shadow text-lg sm:text-xl hover:bg-indigo-50 dark:hover:bg-gray-700 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-200">
            💬 Join Community
          </button>
        </Link> */}
      </div>
    </section>
  );
}
