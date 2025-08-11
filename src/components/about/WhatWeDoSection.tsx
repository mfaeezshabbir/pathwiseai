import {
  Target,
  Map,
  BookOpenCheck,
  MessageCircle,
  Trophy,
} from "lucide-react";

const steps = [
  {
    icon: <Map className="h-8 w-8 text-indigo-500" />,
    title: "AI-Powered Roadmaps",
    desc: "Personalized learning paths tailored to your skills, goals, and schedule.",
  },
  {
    icon: <BookOpenCheck className="h-8 w-8 text-fuchsia-500" />,
    title: "Interactive Learning",
    desc: "Roadmaps are interactive guides with summaries, tasks, and curated resources.",
  },
  {
    icon: <MessageCircle className="h-8 w-8 text-pink-500" />,
    title: "AI Tutoring",
    desc: "Get unstuck and deepen your understanding with an AI assistant.",
  },
  {
    icon: <Trophy className="h-8 w-8 text-indigo-400" />,
    title: "Gamified Progress",
    desc: "Track your progress, earn achievements, and build a portfolio of completed projects.",
  },
];

export function WhatWeDoSection() {
  return (
    <div className="relative flex flex-col items-center overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-50/60 via-white/80 to-fuchsia-50/60 p-6 shadow-xl dark:from-gray-900/60 dark:via-gray-950/80 dark:to-indigo-900/60 lg:flex-row lg:p-10">
      {/* Decorative blobs */}
      <div className="absolute -top-10 left-1/2 h-32 w-32 rounded-full bg-indigo-200/30 blur-2xl" />
      <div className="absolute -bottom-10 right-1/2 h-32 w-32 rounded-full bg-fuchsia-200/30 blur-2xl" />

      {/* Image on top for mobile, right for large screens */}
      <div className="mb-8 flex w-full items-center justify-center lg:order-2 lg:mb-0 lg:w-2/5 lg:pl-10">
        <img
          src="https://plus.unsplash.com/premium_photo-1694822449585-a2444c288b96?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="AI Learning Illustration"
          className="h-auto w-full max-w-md rounded-2xl shadow-lg"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex w-full flex-col items-center lg:order-1 lg:w-3/5">
        <h2 className="mb-8 bg-gradient-to-r from-indigo-600 to-fuchsia-500 bg-clip-text text-center text-3xl font-bold text-transparent">
          What We Do
        </h2>
        <div className="flex w-full flex-col items-center gap-8">
          {steps.map((step, i) => (
            <div
              key={i}
              className="flex w-full max-w-2xl flex-col items-center gap-4 rounded-xl bg-white/80 p-6 shadow-md dark:bg-gray-900/80 md:flex-row md:items-center"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-indigo-200 bg-white shadow-lg dark:border-indigo-700 dark:bg-gray-900">
                {step.icon}
              </span>
              <div className="text-center md:text-left">
                <h3 className="mb-1 text-xl font-semibold">{step.title}</h3>
                <p className="max-w-xl text-base text-muted-foreground">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
