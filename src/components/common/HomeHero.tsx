import { AppLogo } from "@/components/common/AppLogo";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Sparkles, ArrowRight, Brain, Target } from "lucide-react";

export function HomeHero() {
  return (
    <section className="relative mb-16 flex min-h-[80vh] flex-col items-center justify-center overflow-hidden bg-transparent px-4">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-1/4 h-72 w-72 rounded-full bg-indigo-300/20 blur-3xl"></div>
        <div className="absolute right-1/4 top-1/2 h-80 w-96 rounded-full bg-purple-300/20 blur-3xl"></div>
      </div>

      <div className="mx-auto flex max-w-4xl flex-col items-center">
        {/* Badge */}
        <div className="mb-8 flex flex-col items-center">
          <Badge className="bg-gradient-to-r from-indigo-500 to-purple-500 px-4 py-2 text-sm font-semibold text-white">
            <Sparkles className="mr-2 h-4 w-4" />
            AI-Powered Learning Platform
          </Badge>
        </div>

        {/* Main Heading */}
        <h1 className="mb-6 text-center text-4xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white sm:text-6xl lg:text-7xl">
          Master Any Skill with
          <span className="block bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            AI-Generated Roadmaps
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mb-10 max-w-3xl text-center text-lg font-medium leading-relaxed text-gray-700 dark:text-gray-200 sm:text-xl lg:text-2xl">
          Get personalized learning paths tailored to your goals, skill level,
          and schedule.
          <br />
          <span className="font-semibold text-indigo-600 dark:text-indigo-400">
            Start your journey today
          </span>{" "}
          and let AI guide you to success.
        </p>

        {/* Feature highlights */}
        <div className="mb-10 flex flex-wrap justify-center gap-4">
          <div className="flex items-center gap-2 rounded-full bg-white/50 px-4 py-2 backdrop-blur-sm dark:bg-gray-800/50">
            <Brain className="h-5 w-5 text-indigo-500" />
            <span className="text-sm font-medium">AI-Powered</span>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-white/50 px-4 py-2 backdrop-blur-sm dark:bg-gray-800/50">
            <Target className="h-5 w-5 text-purple-500" />
            <span className="text-sm font-medium">Personalized</span>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-white/50 px-4 py-2 backdrop-blur-sm dark:bg-gray-800/50">
            <Sparkles className="h-5 w-5 text-pink-500" />
            <span className="text-sm font-medium">Interactive</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex w-full flex-col justify-center gap-4 sm:w-auto sm:flex-row">
          <Link href="/roadmaps" className="w-full sm:w-auto">
            <Button
              size="lg"
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-6 text-lg shadow-lg transition-all duration-300 hover:from-indigo-700 hover:to-purple-700 hover:shadow-xl sm:w-auto"
            >
              <Sparkles className="mr-2 h-5 w-5" />
              Create Your Roadmap
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>

          <Link href="/roadmaps?tab=explore" className="w-full sm:w-auto">
            <Button
              variant="outline"
              size="lg"
              className="w-full border-2 border-indigo-300 px-8 py-6 text-lg transition-all duration-300 hover:bg-indigo-50 dark:border-indigo-600 dark:hover:bg-indigo-950/20 sm:w-auto"
            >
              Browse Examples
            </Button>
          </Link>
        </div>

        {/* Social Proof */}
        <div className="mt-12 text-center">
          <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
            Trusted by learners worldwide
          </p>
          <div className="flex items-center justify-center gap-8 text-xs text-gray-500 dark:text-gray-500">
            <div className="text-center">
              <div className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                1000+
              </div>
              <div>Roadmaps Created</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-purple-600 dark:text-purple-400">
                50+
              </div>
              <div>Skills Covered</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-pink-600 dark:text-pink-400">
                95%
              </div>
              <div>Success Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
