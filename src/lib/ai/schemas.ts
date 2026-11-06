import { z } from "zod";

// Shared by the server (structured output) and the client (types only).

export const RoadmapResourceSchema = z.object({
  type: z.enum(["video", "article", "doc", "course"]),
  title: z.string(),
  url: z.string().describe("A real, publicly reachable URL"),
});

export const RoadmapProjectSchema = z.object({
  title: z.string(),
  description: z.string(),
  difficulty: z.enum(["beginner", "intermediate", "advanced"]),
  tags: z.array(z.string()),
  saved: z.boolean().optional(),
});

// Two explicit levels instead of a recursive schema: recursive JSON schemas
// are rejected by several providers' structured-output modes.
const NestedSubtopicSchema = z.object({
  name: z.string(),
  details: z.string(),
});

export const RoadmapSubtopicSchema = z.object({
  name: z.string(),
  details: z.string().describe("One or two sentences on what to learn and why"),
  resources: z.array(RoadmapResourceSchema).optional(),
  projects: z.array(RoadmapProjectSchema).optional(),
  subtopics: z
    .array(NestedSubtopicSchema)
    .optional()
    .describe("Optional deeper-dive topics"),
});

export const RoadmapCategorySchema = z.object({
  name: z.string().describe("Module name"),
  details: z.string(),
  subtopics: z.array(RoadmapSubtopicSchema),
  projects: z.array(RoadmapProjectSchema),
});

export const RoadmapSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  prerequisites: z.array(z.string()).optional(),
  categories: z.array(RoadmapCategorySchema).describe("Ordered modules"),
  nextSteps: z.array(z.string()).optional(),
  relatedRoadmaps: z.array(z.string()).optional(),
});

export const RoadmapInputSchema = z.object({
  desiredSkill: z.string().trim().min(2).max(120),
  knowledgeLevel: z.string().max(40).default("beginner"),
  availableTime: z.string().max(40).default("4-6 hours"),
  learningStyle: z.string().max(60).optional(),
  specificGoals: z.string().max(500).optional(),
});

export const ProjectIdeasInputSchema = z.object({
  skills: z.array(z.string().max(120)).max(30).default([]),
  roadmapName: z.string().max(200),
});

export const ProjectIdeasSchema = z.object({
  projectIdeas: z
    .array(z.string())
    .describe("5-6 concise project ideas, one or two sentences each"),
});

export const TutorReplySchema = z.object({
  answer: z.string().describe("The reply to the learner, in plain text"),
  suggestions: z
    .array(z.string())
    .describe(
      "Skills or technologies to suggest generating a roadmap for. Empty unless the learner asks what or how to learn.",
    ),
});

export type RoadmapResource = z.infer<typeof RoadmapResourceSchema>;
export type RoadmapProject = z.infer<typeof RoadmapProjectSchema>;
export type RoadmapSubtopic = z.infer<typeof RoadmapSubtopicSchema>;
export type RoadmapCategory = z.infer<typeof RoadmapCategorySchema>;
export type GenerateRoadmapOutput = z.infer<typeof RoadmapSchema>;
export type GenerateRoadmapInput = z.infer<typeof RoadmapInputSchema>;
export type GenerateProjectIdeasOutput = z.infer<typeof ProjectIdeasSchema>;
export type TutorReply = z.infer<typeof TutorReplySchema>;
export type ChatTurn = { role: "user" | "assistant"; content: string };
