import { AppCard } from "@/components/common/AppCard";
import React from "react";

const testimonials = [
  {
    text: "PathwiseAI made it so easy to break down my learning into manageable steps. The AI tutor is a lifesaver!",
    author: "Alex, Web Developer",
  },
  {
    text: "I love the personalized approach. I finally feel like I’m making real progress and not just jumping between random tutorials.",
    author: "Priya, Data Scientist",
  },
  {
    text: "The roadmap generator is pure magic. I never felt lost or overwhelmed—just clear next steps.",
    author: "Samir, Student",
  },
  {
    text: "Tracking my progress and earning badges keeps me motivated. Highly recommend!",
    author: "Emily, Product Manager",
  },
];

export function TestimonialsScroller() {
  return (
    <div className="mb-16">
      <div className="relative">
        <div className="absolute left-0 top-0 h-full w-8 bg-gradient-to-r from-white/80 dark:from-[#23272f]/80 to-transparent pointer-events-none z-10" />
        <div className="absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-white/80 dark:from-[#23272f]/80 to-transparent pointer-events-none z-10" />
        <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-indigo-300 scrollbar-track-transparent">
          <div className="flex gap-6 min-w-[600px] py-2 px-1">
            {testimonials.map((t, i) => (
              <AppCard key={i} className="min-w-[320px] max-w-xs glass-card">
                <p className="italic">{`“${t.text}”`}</p>
                <div className="mt-4 text-right font-semibold">
                  — {t.author}
                </div>
              </AppCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
