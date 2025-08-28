"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Loader2, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { GenerateRoadmapOutput } from "@/ai/flows/generate-roadmap";
import { toast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";

const formSchema = z.object({
  desiredSkill: z.string().min(2, {
    message: "Please enter a skill you want to learn.",
  }),
  knowledgeLevel: z.string({
    required_error: "Please select your current knowledge level.",
  }),
  availableTime: z.string({
    required_error: "Please select your available time per week.",
  }),
  learningStyle: z.string({
    required_error: "Please select your preferred learning style.",
  }),
});

type RoadmapGeneratorProps = {
  onRoadmapGenerated: (roadmap: GenerateRoadmapOutput) => void;
  setIsLoading: (isLoading: boolean) => void;
  isLoading: boolean;
  initialSkill?: string;
};

export function RoadmapGenerator({
  onRoadmapGenerated,
  setIsLoading,
  isLoading,
  initialSkill,
}: RoadmapGeneratorProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      desiredSkill: initialSkill || "",
    },
  });

  const [step, setStep] = useState(1);
  const [topic, setTopic] = useState("");
  const [goal, setGoal] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialSkill) {
      form.setValue("desiredSkill", initialSkill);
    }
  }, [initialSkill]);

  const handleNext = () => {
    if (step === 1 && !topic.trim()) {
      setError("Please enter a topic.");
      return;
    }
    if (step === 2 && !goal.trim()) {
      setError("Please enter your learning goal.");
      return;
    }
    setError(null);
    setStep(step + 1);
  };

  const handleBack = () => setStep(step - 1);

  // Store project ideas per module title
  const [moduleProjects, setModuleProjects] = useState<
    Record<string, string[]>
  >({});

  // Helper to link project ideas to a module
  const linkProjectsToModule = (moduleTitle: string, ideas: string[]) => {
    setModuleProjects((prev) => ({ ...prev, [moduleTitle]: ideas }));
  };

  const handleGenerate = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const values = {
        desiredSkill: topic,
        knowledgeLevel: "beginner",
        availableTime: "5",
        learningStyle: "any",
      };
      const res = await fetch("/api/roadmap/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("Failed to generate roadmap");
      const roadmapData: GenerateRoadmapOutput = await res.json();
      // Save roadmap to API with user ID and linked module projects if available
      const session = (await import("next-auth/react")).useSession?.();
      let userId = null;
      if (
        session &&
        session.data &&
        session.data.user &&
        session.data.user.id
      ) {
        userId = session.data.user.id;
      } else {
        userId = null;
      }
      if (userId) {
        await fetch("/api/roadmap/save", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId,
            roadmap: roadmapData,
            moduleProjects,
          }),
        });
      }
      onRoadmapGenerated(roadmapData);
    } catch (e) {
      setError("Failed to generate roadmap. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-xl bg-transparent">
      <CardHeader className="pb-2 text-center">
        <div className="flex flex-col items-center">
          <CardTitle className="mb-1 text-2xl font-bold tracking-tight">
            Create Your Learning Path
          </CardTitle>
          <CardDescription className="text-base text-muted-foreground">
            Tell us your goals, and we'll generate a personalized roadmap for
            you.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div>
          {/* Stepper */}
          <div className="mb-8 flex items-center justify-center gap-4">
            {[1, 2, 3].map((n, i) => (
              <div key={n} className="flex items-center">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full font-semibold transition-colors duration-200 ${
                    step >= n
                      ? "bg-indigo-600 text-white shadow"
                      : "bg-gray-200 text-gray-400 dark:bg-gray-700"
                  }`}
                >
                  {n}
                </div>
                {i < 2 && (
                  <div
                    className={`mx-1 h-1 w-8 rounded transition-colors duration-200 ${
                      step > n
                        ? "bg-indigo-600"
                        : "bg-gray-200 dark:bg-gray-700"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          {/* Error */}
          {error && (
            <div className="mb-4 rounded border border-red-300 bg-red-50 px-4 py-2 text-red-700 dark:border-red-800 dark:bg-red-900 dark:text-red-200">
              {error}
            </div>
          )}
          {/* Step 1 */}
          {step === 1 && (
            <div>
              <label className="mb-2 block font-medium text-gray-800 dark:text-gray-200">
                What topic do you want a roadmap for?
              </label>
              <input
                className="mb-6 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-base shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100 dark:border-gray-700 dark:bg-[#232336] dark:text-gray-100"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. React, Data Science, UI/UX Design"
                disabled={isLoading}
              />
              <div className="flex justify-end">
                <Button
                  className="px-8 py-2 text-base font-semibold"
                  onClick={handleNext}
                  disabled={isLoading}
                  variant="default"
                >
                  Next
                </Button>
              </div>
            </div>
          )}
          {/* Step 2 */}
          {step === 2 && (
            <div>
              <label className="mb-2 block font-medium text-gray-800 dark:text-gray-200">
                What is your learning goal?
              </label>
              <input
                className="mb-6 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-base shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100 dark:border-gray-700 dark:bg-[#232336] dark:text-gray-100"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                placeholder="e.g. Become job-ready, build a project, master the basics"
                disabled={isLoading}
              />
              <div className="flex justify-between">
                <Button
                  className="px-8 py-2 text-base font-semibold"
                  onClick={handleBack}
                  disabled={isLoading}
                  variant="secondary"
                >
                  Back
                </Button>
                <Button
                  className="px-8 py-2 text-base font-semibold"
                  onClick={handleNext}
                  disabled={isLoading}
                  variant="default"
                >
                  Next
                </Button>
              </div>
            </div>
          )}
          {/* Step 3 */}
          {step === 3 && (
            <div>
              <div className="mb-6 rounded-lg bg-gray-50 p-4 text-sm text-gray-700 dark:bg-[#232336] dark:text-gray-200">
                <div className="mb-1 font-semibold text-gray-900 dark:text-gray-100">
                  Review
                </div>
                <div>
                  <span className="font-medium">Topic:</span> {topic}
                  <br />
                  <span className="font-medium">Goal:</span> {goal}
                </div>
              </div>
              <div className="flex justify-between">
                <Button
                  className="px-8 py-2 text-base font-semibold"
                  onClick={handleBack}
                  disabled={isLoading}
                  variant="secondary"
                >
                  Back
                </Button>
                <Button
                  className="px-8 py-2 text-base font-semibold"
                  onClick={handleGenerate}
                  disabled={isLoading}
                  variant="default"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" /> Generating...
                    </span>
                  ) : (
                    "Generate Roadmap"
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </div>
  );
}
