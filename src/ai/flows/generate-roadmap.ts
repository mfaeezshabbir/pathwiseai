"use server";

/**
 * @fileOverview Generates a personalized learning roadmap based on user input.
 *
 * - generateRoadmap - A function that generates the learning roadmap.
 * - GenerateRoadmapInput - The input type for the generateRoadmap function.
 * - GenerateRoadmapOutput - The return type for the generateRoadmap function.
 */

import { ai } from "@/ai/genkit";
import { z } from "genkit";

const GenerateRoadmapInputSchema = z.object({
  desiredSkill: z.string().describe("The skill the user wants to learn."),
  knowledgeLevel: z
    .string()
    .describe(
      "The user's current knowledge level (e.g., beginner, intermediate, advanced).",
    ),
  availableTime: z
    .string()
    .describe(
      "The amount of time the user has available per week (e.g., 5 hours, 10 hours).",
    ),
  learningStyle: z
    .string()
    .optional()
    .describe(
      "The preferred learning style of the user (e.g., video-first, hands-on coding, theory, project-based).",
    ),
});
export type GenerateRoadmapInput = z.infer<typeof GenerateRoadmapInputSchema>;

const RoadmapResourceSchema = z.object({
  title: z.string().describe("The title of the learning resource."),
  url: z
    .string()
    .optional()
    .describe(
      "The URL for the learning resource. This should be a real, valid URL if available.",
    ),
  description: z
    .string()
    .optional()
    .describe("A brief, one-sentence description of the resource."),
});
export type RoadmapResource = z.infer<typeof RoadmapResourceSchema>;

const RoadmapUnitSchema: z.ZodType<any> = z.lazy(() =>
  z.object({
    title: z
      .string()
      .describe("The title of the unit, which is a sub-topic within a module."),
    objective: z
      .string()
      .describe(
        "A clear, one-sentence learning objective for this unit. Example: 'Understand how Docker networking works'",
      ),
    summary: z
      .string()
      .describe(
        "A mini AI-generated summary or concept breakdown for the unit's topic.",
      ),
    task: z
      .string()
      .describe(
        "A hands-on task or quiz to test understanding. Example: 'Run your first container and expose a port.'",
      ),
    resources: z
      .array(RoadmapResourceSchema)
      .describe(
        "A list of curated learning resources (docs, videos, blogs) for this unit.",
      ),
    projects: z
      .array(z.string())
      .optional()
      .describe(
        "A list of context-specific, progressively challenging project ideas for this unit.",
      ),
    subtopics: z
      .array(RoadmapUnitSchema)
      .optional()
      .describe(
        "A list of subtopics (units) for this unit, for deeper tree structure.",
      ),
  }),
);
export type RoadmapUnit = z.infer<typeof RoadmapUnitSchema>;

const RoadmapModuleSchema = z.object({
  title: z
    .string()
    .describe(
      "The title of the module, which is a major topic in the roadmap.",
    ),
  description: z
    .string()
    .optional()
    .describe("A brief, one-sentence description of what this module covers."),
  units: z
    .array(RoadmapUnitSchema)
    .describe("A list of units within this module."),
});
export type RoadmapModule = z.infer<typeof RoadmapModuleSchema>;

const GenerateRoadmapOutputSchema = z.object({
  title: z
    .string()
    .describe("The main title of the generated learning roadmap."),
  description: z
    .string()
    .describe(
      "A short, encouraging description of the roadmap and what the user will learn.",
    ),
  prerequisites: z
    .array(z.string())
    .optional()
    .describe(
      "A list of prerequisite skills or topics the user should be familiar with.",
    ),
  modules: z
    .array(RoadmapModuleSchema)
    .describe("The list of modules that make up the core of the roadmap."),
  relatedRoadmaps: z
    .array(z.string())
    .optional()
    .describe(
      "A list of suggestions for other related skills or roadmaps the user might want to explore next.",
    ),
});
export type GenerateRoadmapOutput = z.infer<typeof GenerateRoadmapOutputSchema>;

export async function generateRoadmap(
  input: GenerateRoadmapInput,
): Promise<GenerateRoadmapOutput> {
  return generateRoadmapFlow(input);
}

const prompt = ai.definePrompt({
  name: "generateRoadmapPrompt",
  input: { schema: GenerateRoadmapInputSchema },
  output: { schema: GenerateRoadmapOutputSchema },
  prompt: `You are an expert learning roadmap generator, inspired by the detailed and structured guides on roadmap.sh and modern mindmap/tree-based learning systems. Your task is to create a comprehensive, hierarchical, and personalized learning roadmap based on the user's input. The roadmap must be highly structured, visually tree-like, and provide a clear, actionable path for the user.

**User Input:**
- Desired Skill/Topic: {{{desiredSkill}}}
- Current Knowledge Level: {{{knowledgeLevel}}}
- Time Commitment: {{{availableTime}}} per week
- Preferred Learning Style: {{{learningStyle}}}

**Your Task:**
Generate a roadmap as a JSON object that follows the specified output schema precisely.

1.  **Overall Roadmap:**
  *   Create a clear and motivating \`title\` for the entire roadmap.
  *   Write a concise \`description\` of what the user will learn.
  *   List any \`prerequisites\` skills or knowledge required.
  *   Suggest \`relatedRoadmaps\` for further learning.

2.  **Hierarchical Modular Structure:**
  *   Break down the main topic into logical, high-level **modules**. Each module represents a major concept (e.g., "Docker Basics", "Data Types in Python").
  *   For each module, provide a clear \`title\` and a \`description\`.
  *   For each module, list all relevant subtopics as **units**. If a unit can be further broken down, use the \`subtopics\` field to create a deeper tree (e.g., "Data Types" → int, float, str, list, tuple, dict, set, bool).

3.  **Granular Units and Subtopics:**
  *   Within each module and unit, create smaller, focused **units** and **subtopics** as needed for a true tree structure.
  *   For each unit and subtopic, you MUST provide:
    *   A \`title\`.
    *   A clear, one-sentence learning \`objective\`.
    *   A brief \`summary\` or concept breakdown.
    *   A hands-on \`task\` or a simple quiz question.
    *   A list of curated \`resources\`.
    *   A list of context-specific, progressively challenging \`projects\` (from beginner to advanced, relevant to the topic/module).

4.  **Curated Resources:**
  *   For each resource, include a \`title\`, a valid \`url\` (if you can find a real, relevant one), and a brief \`description\`.

**Important:**
- The roadmap must be a tree, not a flat list. Use the \`subtopics\` field for deeper breakdowns.
- Projects must be context-specific and increase in challenge as the user progresses through the roadmap.
- The final output must be a single, valid JSON object matching the defined schema. Ensure the structure is logical, progressive, and visually tree-like, guiding the user from foundational concepts to more advanced topics.`,
});

const generateRoadmapFlow = ai.defineFlow(
  {
    name: "generateRoadmapFlow",
    inputSchema: GenerateRoadmapInputSchema,
    outputSchema: GenerateRoadmapOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  },
);
