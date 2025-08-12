import { Map, MessageCircle, Trophy, BookOpenCheck } from "lucide-react";
import { AppCard } from "@/components/common/AppCard";

const highlights = [
  {
    icon: <Map className="h-8 w-8 text-indigo-500" />,
    label: "AI-powered personalized learning roadmaps",
  },
  {
    icon: <MessageCircle className="h-8 w-8 text-fuchsia-500" />,
    label: "Instant AI tutoring and Q&A",
  },
  {
    icon: <Trophy className="h-8 w-8 text-pink-500" />,
    label: "Progress tracking and achievements",
  },
  {
    icon: <BookOpenCheck className="h-8 w-8 text-indigo-400" />,
    label: "Curated resources and interactive tasks",
  },
];

export function HighlightsSection() {
  return (
    <AppCard className="p-10" contentClass="p-0">
      <h2 className="mb-8 bg-gradient-to-r from-fuchsia-500 to-indigo-600 bg-clip-text text-center text-3xl font-bold text-transparent">
        Highlights
      </h2>
      <div className="flex flex-col items-center justify-center gap-8 md:flex-row">
        {highlights.map((h, i) => (
          <div
            key={i}
            className="flex max-w-xs flex-col items-center text-center"
          >
            <div className="mb-3">{h.icon}</div>
            <span className="text-lg font-medium text-muted-foreground">
              {h.label}
            </span>
          </div>
        ))}
      </div>
    </AppCard>
  );
}
