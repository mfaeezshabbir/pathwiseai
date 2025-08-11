"use client";

import { AppCard } from "@/components/common/AppCard";
import React, { useRef, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollIndex, setScrollIndex] = useState(0);

  const cardWidth = 340; // min-w-[320px] + gap

  // Scroll to the current index
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: scrollIndex * cardWidth,
        behavior: "smooth",
      });
    }
  }, [scrollIndex]);

  // Auto-scroll every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setScrollIndex((prev) =>
        prev >= testimonials.length - 1 ? 0 : prev + 1,
      );
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const scrollLeft = () => {
    setScrollIndex((prev) => (prev <= 0 ? testimonials.length - 1 : prev - 1));
  };

  const scrollRight = () => {
    setScrollIndex((prev) => (prev >= testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="mb-16">
      <div className="relative">
        {/* Gradients */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-8" />
        <div className="pointer-events-none absolute right-10 top-0 z-10 h-full w-8" />
        {/* Scroll Buttons */}
        <button
          aria-label="Scroll left"
          onClick={scrollLeft}
          className="absolute -left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/80 p-1 shadow hover:bg-white dark:bg-[#23272f]/80"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          aria-label="Scroll right"
          onClick={scrollRight}
          className="absolute -right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/80 p-1 shadow hover:bg-white dark:bg-[#23272f]/80"
        >
          <ChevronRight size={24} />
        </button>
        {/* Scroller */}
        <div
          ref={scrollRef}
          className="scrollbar-thin scrollbar-thumb-indigo-300 scrollbar-track-transparent overflow-x-auto"
        >
          <div className="flex min-w-[600px] gap-6 px-1 py-2">
            {testimonials.map((t, i) => (
              <AppCard key={i} className="glass-card min-w-[320px] max-w-xs">
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
