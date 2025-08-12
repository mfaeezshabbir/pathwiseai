import { AppCard } from "@/components/common/AppCard";

export function DeveloperSection() {
  return (
    <AppCard
      headerClass="items-center text-center"
      contentClass="flex flex-col items-center text-center gap-4"
    >
      <h2 className="mt-8 bg-gradient-to-r from-fuchsia-500 to-indigo-600 bg-clip-text text-center text-3xl font-bold text-transparent">
        Meet the Developer
      </h2>
      <div className="flex flex-col items-center">
        <img
          src="https://avatars.githubusercontent.com/u/74614920?v=4"
          alt="Developer Avatar"
          className="mx-auto mb-3 h-28 w-28 rounded-full border-4 border-indigo-400 shadow-xl transition-transform hover:scale-105 dark:border-indigo-700"
        />
        <p className="text-xl font-bold text-indigo-700 dark:text-indigo-300">
          M. Faeez Shabbir
        </p>
        <p className="text-base font-medium text-indigo-500 dark:text-indigo-400">
          Founder &amp; Solo Developer
        </p>
      </div>
      <p className="text-md max-w-lg text-muted-foreground">
        A passionate developer on a mission to make learning accessible and
        engaging for everyone.
        <blockquote className="mx-auto mt-2 max-w-xl italic text-muted-foreground">
          "I built PathwiseAI to solve my own learning struggles—fragmented
          resources, lack of structure, and no clear path. My goal is to empower
          others to learn efficiently and confidently."
        </blockquote>{" "}
      </p>
    </AppCard>
  );
}
