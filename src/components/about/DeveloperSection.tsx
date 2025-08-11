import { User } from "lucide-react";

export function DeveloperSection() {
  return (
    <div className="relative flex flex-col items-center overflow-hidden rounded-3xl bg-gradient-to-r from-fuchsia-100/60 via-white/80 to-indigo-100/60 p-10 shadow-xl dark:from-gray-900/60 dark:via-gray-950/80 dark:to-indigo-900/60">
      <div className="absolute -top-10 right-1/2 h-32 w-32 rounded-full bg-fuchsia-200/30 blur-2xl" />
      <div className="absolute -bottom-10 left-1/2 h-32 w-32 rounded-full bg-indigo-200/30 blur-2xl" />
      <div className="relative z-10 flex flex-col items-center text-center">
        <h2 className="mb-2 bg-gradient-to-r from-fuchsia-500 to-indigo-600 bg-clip-text text-3xl font-bold text-transparent">
          The Developer
        </h2>
        <img
          src="https://avatars.githubusercontent.com/u/74614920?v=4"
          alt="Developer Avatar"
          className="mx-auto mb-4 h-28 w-28 rounded-full border-4 border-indigo-300 shadow-lg dark:border-indigo-700"
        />
        <p className="text-lg font-semibold">M. Faeez Shabbir</p>
        <p className="text-base text-muted-foreground">
          Founder & Solo Developer
        </p>
        <p className="text-md mx-auto mt-4 max-w-xl italic text-muted-foreground">
          "I built PathwiseAI to solve my own learning struggles—fragmented
          resources, lack of structure, and no clear path. My goal is to empower
          others to learn efficiently and confidently."
        </p>
      </div>
    </div>
  );
}
