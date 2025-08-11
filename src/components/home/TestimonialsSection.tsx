import { SectionHeader } from "@/components/common/SectionHeader";
import { TestimonialsScroller } from "@/components/common/TestimonialsScroller";
import { User } from "lucide-react";

export function TestimonialsSection() {
  return (
    <section className="mb-20">
      <SectionHeader
        title="What Learners Say"
        description="Hear from people who’ve used PathwiseAI to reach their goals."
        icon={<User className="h-8 w-8 text-pink-400 animate-pulse" />}
      />
      <TestimonialsScroller />
    </section>
  );
}
