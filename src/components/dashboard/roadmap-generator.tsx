"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Loader2, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { generateRoadmap } from "@/ai/flows/generate-roadmap";
import type { GenerateRoadmapOutput } from "@/ai/flows/generate-roadmap";
import { toast } from "@/hooks/use-toast";
import { useEffect } from "react";

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

  useEffect(() => {
    if (initialSkill) {
      form.setValue("desiredSkill", initialSkill);
    }
  }, [initialSkill]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const roadmapData = await generateRoadmap(values);
      onRoadmapGenerated(roadmapData);
    } catch (error) {
      console.error("Failed to generate roadmap:", error);
      toast({
        title: "Error Generating Roadmap",
        description: "There was an issue with the AI. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="max-w-3xl mx-auto border-2 border-primary/20 shadow-xl">
      <CardHeader className="text-center">
        <Rocket className="mx-auto h-12 w-12 text-primary mb-4 p-2 bg-primary/10 rounded-full" />
        <CardTitle className="text-3xl font-extrabold tracking-tight">
          Create Your Learning Path
        </CardTitle>
        <CardDescription className="text-lg">
          Tell us your goals, and we'll generate a personalized roadmap for you.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="desiredSkill"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">
                    What do you want to learn?
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Advanced React, Python for Data Science"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Be specific for the best results.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FormField
                control={form.control}
                name="knowledgeLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Knowledge Level</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">
                          Intermediate
                        </SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="availableTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Time per week</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="< 5 hours">&lt; 5 hours</SelectItem>
                        <SelectItem value="5-10 hours">5-10 hours</SelectItem>
                        <SelectItem value="10+ hours">10+ hours</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="learningStyle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Learning Style</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select style" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="video-first">Video-First</SelectItem>
                        <SelectItem value="hands-on coding">
                          Hands-on Coding
                        </SelectItem>
                        <SelectItem value="theory">Theory-focused</SelectItem>
                        <SelectItem value="project-based">
                          Project-Based
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              size="lg"
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Rocket className="mr-2 h-4 w-4" />
                  Generate My Roadmap
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
