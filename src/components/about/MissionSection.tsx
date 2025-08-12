import { BookOpen } from "lucide-react";
import { AppCard } from "@/components/common/AppCard";

export function MissionSection() {
  return (
    <AppCard
      headerClass="items-center text-center"
      contentClass="flex flex-col items-center text-center"
    >
      <h2 className="my-8 bg-gradient-to-r from-fuchsia-500 to-indigo-600 bg-clip-text text-center text-3xl font-bold text-transparent">
        Our Mission
      </h2>
      <p className="mb-2 max-w-2xl text-lg text-muted-foreground">
        PathwiseAI empowers learners of all backgrounds to achieve their goals
        through personalized, AI-generated learning roadmaps and hands-on
        project experiences.
      </p>
      <p className="mb-2 max-w-2xl text-lg text-muted-foreground">
        Our mission is to make education accessible, engaging, and effective by
        providing intuitive tools, progress tracking, achievements, and a
        supportive community. Whether you’re starting out or advancing your
        expertise, PathwiseAI guides you every step of the way.
      </p>
      <p className="max-w-2xl text-lg text-muted-foreground">
        Join us to unlock your potential, build real-world projects, and
        celebrate your learning journey—one milestone at a time.
      </p>
    </AppCard>
  );
}
