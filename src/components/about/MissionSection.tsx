import { BookOpen } from "lucide-react";

export function MissionSection() {
  return (
    <div className="relative flex flex-col items-center overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-100/60 via-white/80 to-fuchsia-100/60 p-10 shadow-xl dark:from-gray-900/60 dark:via-gray-950/80 dark:to-indigo-900/60">
      <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-indigo-200/30 blur-2xl" />
      <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-fuchsia-200/30 blur-2xl" />
      <div className="relative z-10 flex flex-col items-center text-center">
        <BookOpen className="mb-4 h-12 w-12 text-indigo-600 drop-shadow" />
        <h2 className="mb-2 bg-gradient-to-r from-indigo-600 to-fuchsia-500 bg-clip-text text-3xl font-bold text-transparent">
          Our Mission
        </h2>
        <p className="mb-2 max-w-2xl text-lg text-muted-foreground">
          PathwiseAI exists to make learning accessible, engaging, and effective
          for everyone. With a clear path and the right tools, anyone can
          achieve their learning goals—no matter how ambitious.
        </p>
        <p className="max-w-2xl text-lg text-muted-foreground">
          We’re passionate about lifelong learning and empowering individuals to
          take control of their educational journey. Whether you’re a beginner
          or an expert, PathwiseAI is your dedicated partner.
        </p>
      </div>
    </div>
  );
}
