import { AppLogo } from '@/components/common/AppLogo';
import Link from 'next/link';

export function HomeHero() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[60vh] py-16 px-4 text-center bg-gradient-to-br from-indigo-100 via-white to-cyan-100 dark:from-[#23272f] dark:via-[#18181b] dark:to-[#23272f] border-b border-gray-200 dark:border-gray-800 shadow-sm rounded-2xl mb-10">
      <AppLogo size={90} className="mb-6" />
      <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight text-indigo-700 dark:text-indigo-300">
        Personalized AI Learning Roadmaps
      </h1>
      <p className="text-lg md:text-xl text-gray-700 dark:text-gray-200 mb-8 max-w-2xl mx-auto">
        Unlock your potential with tailored learning paths, smart tutoring, and actionable resources powered by AI.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/roadmaps">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-3 rounded-lg shadow transition-colors text-lg">
            View My Roadmaps
          </button>
        </Link>
        <Link href="/profile">
          <button className="bg-white dark:bg-[#23272f] border border-indigo-600 dark:border-indigo-300 text-indigo-700 dark:text-indigo-300 font-semibold px-8 py-3 rounded-lg shadow transition-colors text-lg">
            Go to Profile
          </button>
        </Link>
      </div>
    </section>
  );
}
