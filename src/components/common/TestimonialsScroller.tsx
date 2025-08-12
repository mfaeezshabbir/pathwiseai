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
  {
    text: "PathwiseAI transformed my learning experience. I can now focus on building projects that matter to me.",
    author: "Jordan, Software Engineer",
  },
];

export function TestimonialsScroller() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollIndex, setScrollIndex] = useState(0);

  const cardWidth = 360; // min-w-[340px] + gap

  // Scroll to the current index
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: scrollIndex * cardWidth,
        behavior: "smooth",
      });
    }
  }, [scrollIndex]);

  // Auto-scroll every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setScrollIndex((prev) =>
        prev >= testimonials.length - 1 ? 0 : prev + 1,
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const scrollLeft = () => {
    setScrollIndex((prev) => (prev <= 0 ? testimonials.length - 1 : prev - 1));
  };

  const scrollRight = () => {
    setScrollIndex((prev) => (prev >= testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="relative mx-auto w-full px-4 py-12">
      <div className="relative">
        {/* Gradient overlays for fade effect */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-[#F0F4F8] via-[#F0F4F8]/80 to-transparent dark:from-gray-900 dark:via-gray-900/80" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-[#F0F4F8] via-[#F0F4F8]/80 to-transparent dark:from-gray-900 dark:via-gray-900/80" />
        {/* Scroll Buttons */}
        <button
          aria-label="Scroll left"
          onClick={scrollLeft}
          className="absolute left-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-lg ring-1 ring-[#3F51B5]/10 transition hover:bg-[#7E57C2]/90 hover:text-white dark:bg-[#23272f]/90"
        >
          <ChevronLeft size={28} />
        </button>
        <button
          aria-label="Scroll right"
          onClick={scrollRight}
          className="absolute right-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-lg ring-1 ring-[#3F51B5]/10 transition hover:bg-[#7E57C2]/90 hover:text-white dark:bg-[#23272f]/90"
        >
          <ChevronRight size={28} />
        </button>
        {/* Scroller */}
        <div
          ref={scrollRef}
          className="scrollbar-thin scrollbar-thumb-indigo-300 scrollbar-track-transparent overflow-x-auto"
        >
          <div className="flex gap-8 px-2 py-4 transition-all duration-300">
            {testimonials.map((t, i) => (
              <AppCard
                key={i}
                className="min-w-[340px] max-w-xs border border-[#3F51B5]/10 bg-white/80 shadow-xl backdrop-blur-xl transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl dark:bg-gray-900/80"
              >
                <div className="flex h-full flex-col justify-between">
                  <p className="font-inter text-lg italic leading-relaxed text-gray-800 dark:text-gray-100">
                    “{t.text}”
                  </p>
                  <div className="mt-6 flex items-center justify-end gap-2">
                    <span className="block h-2 w-2 rounded-full bg-[#00BCD4]" />
                    <span className="font-inter text-sm font-semibold text-[#7E57C2]">
                      {t.author}
                    </span>
                  </div>
                </div>
              </AppCard>
            ))}
          </div>
        </div>
        {/* Dots indicator */}
        <div className="mt-6 flex justify-center gap-2">
          {testimonials.map((_, i) => (
            <span
              key={i}
              className={`h-2 w-6 rounded-full transition-all duration-300 ${
                i === scrollIndex
                  ? "bg-[#3F51B5] opacity-90"
                  : "bg-[#3F51B5]/30 opacity-50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
