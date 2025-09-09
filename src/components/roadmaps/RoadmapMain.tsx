"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Brain,
  Rocket,
  Sparkles,
  Target,
  Clock,
  BookOpen,
  Code,
  Database,
  Smartphone,
  Globe,
  Cpu,
  TrendingUp,
  Loader2,
  Lightbulb,
  Users,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import type { GenerateRoadmapOutput } from "@/ai/flows/generate-roadmap";
import { toast } from "@/hooks/use-toast";

const formSchema = z.object({
  desiredSkill: z.string().min(2, "Please enter a skill you want to learn."),
  knowledgeLevel: z.string({
    required_error: "Please select your current knowledge level.",
  }),
  availableTime: z.string({
    required_error: "Please select your available time per week.",
  }),
  learningStyle: z.string({
    required_error: "Please select your preferred learning style.",
  }),
  specificGoals: z.string().optional(),
});

type RoadmapMainProps = {
  onRoadmapGenerated: (roadmap: GenerateRoadmapOutput) => void;
};

const skillCategories = [
  {
    name: "Frontend Development",
    icon: Globe,
    skills: ["React", "Vue.js", "Angular", "Next.js", "TypeScript"],
  },
  {
    name: "Backend Development",
    icon: Database,
    skills: ["Node.js", "Python", "Java", "Go", "Ruby"],
  },
  {
    name: "Mobile Development",
    icon: Smartphone,
    skills: ["React Native", "Flutter", "Swift", "Kotlin"],
  },
  {
    name: "Data Science",
    icon: TrendingUp,
    skills: ["Python", "R", "Machine Learning", "Data Analysis"],
  },
  {
    name: "DevOps & Cloud",
    icon: Cpu,
    skills: ["AWS", "Docker", "Kubernetes", "CI/CD", "Terraform"],
  },
  {
    name: "Design",
    icon: Sparkles,
    skills: ["UI/UX", "Figma", "Adobe Creative Suite", "Prototyping"],
  },
];

const knowledgeLevels = [
  {
    value: "beginner",
    label: "Beginner",
    description: "New to this field",
    color: "bg-green-500",
  },
  {
    value: "intermediate",
    label: "Intermediate",
    description: "Some experience",
    color: "bg-yellow-500",
  },
  {
    value: "advanced",
    label: "Advanced",
    description: "Significant experience",
    color: "bg-red-500",
  },
];

const timeCommitments = [
  {
    value: "1-3 hours",
    label: "1-3 hours",
    description: "Light commitment",
    icon: Clock,
  },
  {
    value: "4-6 hours",
    label: "4-6 hours",
    description: "Moderate pace",
    icon: Clock,
  },
  {
    value: "7-10 hours",
    label: "7-10 hours",
    description: "Dedicated learning",
    icon: Clock,
  },
  {
    value: "10+ hours",
    label: "10+ hours",
    description: "Intensive study",
    icon: Clock,
  },
];

const learningStyles = [
  {
    value: "video-first",
    label: "Video Learning",
    description: "Prefer video tutorials",
    icon: BookOpen,
  },
  {
    value: "hands-on coding",
    label: "Hands-on Practice",
    description: "Learn by building",
    icon: Code,
  },
  {
    value: "theory",
    label: "Theory First",
    description: "Understand concepts first",
    icon: Brain,
  },
  {
    value: "project-based",
    label: "Project-Based",
    description: "Real-world projects",
    icon: Rocket,
  },
];

export function RoadmapMain({ onRoadmapGenerated }: RoadmapMainProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedSkill, setSelectedSkill] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      desiredSkill: "",
      knowledgeLevel: "",
      availableTime: "",
      learningStyle: "",
      specificGoals: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/roadmap/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("Failed to generate roadmap");
      const roadmap: GenerateRoadmapOutput = await res.json();
      // Attempt to save the generated roadmap for the signed-in user
      try {
        const userId = session?.user?.id ?? null;
        if (userId) {
          const saveRes = await fetch("/api/roadmap/save", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId, roadmap }),
          });
          if (saveRes.ok) {
            const saveJson = await saveRes.json();
            const savedRoadmap = saveJson.roadmap;
            const roadmapId =
              (savedRoadmap && (savedRoadmap._id || savedRoadmap.id)) ||
              saveJson.roadmapId ||
              saveJson.insertedId;
            if (savedRoadmap && roadmapId) {
              try {
                sessionStorage.setItem(
                  `savedRoadmap:${roadmapId}`,
                  JSON.stringify(savedRoadmap),
                );
              } catch (e) {
                // ignore
              }
              router.push(`/roadmaps/${roadmapId}`);
              return;
            }
          }
        }
      } catch (saveErr) {
        console.error("Failed to save roadmap:", saveErr);
      }

      onRoadmapGenerated(roadmap);
      toast({
        title: "🎉 Roadmap Created!",
        description: "Your personalized learning roadmap has been generated.",
      });
    } catch (error) {
      console.error("Error generating roadmap:", error);
      toast({
        title: "Error",
        description: "Failed to generate roadmap. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkillSelection = (skill: string) => {
    setSelectedSkill(skill);
    form.setValue("desiredSkill", skill);
    setStep(2);
  };

  if (step === 1) {
    return (
      <div className="space-y-8">
        {/* Header */}
        <div className="space-y-4 text-center">
          <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
            <Lightbulb className="h-8 w-8" />
          </div>
          <h2 className="text-3xl font-bold">What would you like to learn?</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Choose a skill or technology to get started. Our AI will create a
            personalized roadmap tailored to your goals.
          </p>
        </div>

        {/* Quick Skills */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Popular Skills
            </CardTitle>
            <CardDescription>
              Select from our most requested learning paths
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {[
                "React",
                "Python",
                "Machine Learning",
                "AWS",
                "Node.js",
                "TypeScript",
                "Docker",
                "Next.js",
              ].map((skill) => (
                <Button
                  key={skill}
                  variant="outline"
                  className="flex h-auto flex-col items-center gap-2 p-4 hover:border-indigo-300 hover:bg-indigo-50"
                  onClick={() => handleSkillSelection(skill)}
                >
                  <span className="font-medium">{skill}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Skill Categories */}
        <div className="space-y-6">
          <h3 className="text-center text-xl font-semibold">
            Browse by Category
          </h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {skillCategories.map((category) => {
              const Icon = category.icon;
              return (
                <Card
                  key={category.name}
                  className="transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <div className="rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 p-2 text-white">
                        <Icon className="h-5 w-5" />
                      </div>
                      {category.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-2">
                        {category.skills.map((skill) => (
                          <Badge
                            key={skill}
                            variant="secondary"
                            className="cursor-pointer transition-colors hover:bg-indigo-100 hover:text-indigo-700"
                            onClick={() => handleSkillSelection(skill)}
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Custom Skill Input */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              Custom Learning Goal
            </CardTitle>
            <CardDescription>
              Don't see what you're looking for? Enter any skill or technology
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3">
              <Input
                placeholder="e.g., Blockchain Development, iOS Development, DevOps..."
                value={selectedSkill}
                onChange={(e) => setSelectedSkill(e.target.value)}
                className="flex-1"
                onKeyPress={(e) => {
                  if (e.key === "Enter" && selectedSkill.trim()) {
                    handleSkillSelection(selectedSkill.trim());
                  }
                }}
              />
              <Button
                onClick={() =>
                  selectedSkill.trim() &&
                  handleSkillSelection(selectedSkill.trim())
                }
                disabled={!selectedSkill.trim()}
              >
                Continue
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Progress Header */}
      <div className="space-y-4 text-center">
        <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
          <Brain className="h-8 w-8" />
        </div>
        <h2 className="text-3xl font-bold">
          Customize Your {selectedSkill} Roadmap
        </h2>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          Tell us about your background and preferences to create the perfect
          learning path for you.
        </p>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Knowledge Level */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              What's your current level with {selectedSkill}?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {knowledgeLevels.map((level) => (
                <div
                  key={level.value}
                  className={`cursor-pointer rounded-lg border-2 p-4 transition-all ${
                    form.watch("knowledgeLevel") === level.value
                      ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-950"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => form.setValue("knowledgeLevel", level.value)}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-4 w-4 rounded-full ${level.color}`}
                    ></div>
                    <div>
                      <div className="font-medium">{level.label}</div>
                      <div className="text-sm text-muted-foreground">
                        {level.description}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Time Commitment */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              How much time can you dedicate per week?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              {timeCommitments.map((time) => {
                const Icon = time.icon;
                return (
                  <div
                    key={time.value}
                    className={`cursor-pointer rounded-lg border-2 p-4 transition-all ${
                      form.watch("availableTime") === time.value
                        ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-950"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => form.setValue("availableTime", time.value)}
                  >
                    <div className="space-y-2 text-center">
                      <Icon className="mx-auto h-6 w-6 text-indigo-500" />
                      <div className="font-medium">{time.label}</div>
                      <div className="text-sm text-muted-foreground">
                        {time.description}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Learning Style */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              How do you prefer to learn?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {learningStyles.map((style) => {
                const Icon = style.icon;
                return (
                  <div
                    key={style.value}
                    className={`cursor-pointer rounded-lg border-2 p-4 transition-all ${
                      form.watch("learningStyle") === style.value
                        ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-950"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => form.setValue("learningStyle", style.value)}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="h-6 w-6 text-indigo-500" />
                      <div>
                        <div className="font-medium">{style.label}</div>
                        <div className="text-sm text-muted-foreground">
                          {style.description}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Specific Goals */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Any specific goals or projects in mind? (Optional)
            </CardTitle>
            <CardDescription>
              This helps us tailor the roadmap to your objectives
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="e.g., Build a portfolio website, Get ready for job interviews, Create a mobile app..."
              value={form.watch("specificGoals") || ""}
              onChange={(e) => form.setValue("specificGoals", e.target.value)}
              className="min-h-[100px]"
            />
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-between gap-4">
          <Button type="button" variant="outline" onClick={() => setStep(1)}>
            Back
          </Button>
          <Button
            type="submit"
            size="lg"
            disabled={
              isLoading ||
              !form.watch("knowledgeLevel") ||
              !form.watch("availableTime") ||
              !form.watch("learningStyle")
            }
            className="min-w-[200px]"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Roadmap...
              </>
            ) : (
              <>
                <Rocket className="mr-2 h-4 w-4" />
                Create My Roadmap
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
