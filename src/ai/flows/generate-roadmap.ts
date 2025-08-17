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

// Roadmap.sh-style schemas
const RoadmapResourceSchema = z.object({
  type: z.enum(["video", "article", "doc", "course"]),
  title: z.string(),
  url: z.string(),
});
export type RoadmapResource = z.infer<typeof RoadmapResourceSchema>;

const RoadmapProjectSchema = z.object({
  title: z.string(),
  description: z.string(),
  difficulty: z.enum(["beginner", "intermediate", "advanced"]),
  tags: z.array(z.string()),
  saved: z.boolean().optional(),
});
export type RoadmapProject = z.infer<typeof RoadmapProjectSchema>;

// Recursive subtopic schema
const RoadmapSubtopicSchema: z.ZodType<any> = z.lazy(() =>
  z.object({
    name: z.string(),
    details: z.string(),
    subtopics: z.array(RoadmapSubtopicSchema).optional(),
    resources: z.array(RoadmapResourceSchema).optional(),
    projects: z.array(RoadmapProjectSchema).optional(),
  }),
);
export type RoadmapSubtopic = z.infer<typeof RoadmapSubtopicSchema>;

const RoadmapCategorySchema = z.object({
  name: z.string(),
  details: z.string(),
  subtopics: z.array(RoadmapSubtopicSchema),
  projects: z.array(RoadmapProjectSchema),
});
export type RoadmapCategory = z.infer<typeof RoadmapCategorySchema>;

const GenerateRoadmapOutputSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  prerequisites: z.array(z.string()).optional(),
  categories: z.array(RoadmapCategorySchema),
  nextSteps: z.array(z.string()).optional(),
  relatedRoadmaps: z.array(z.string()).optional(),
});
export type GenerateRoadmapOutput = z.infer<typeof GenerateRoadmapOutputSchema>;

const GenerateRoadmapInputSchema = z.object({
  desiredSkill: z.string(),
  knowledgeLevel: z.string(),
  availableTime: z.string(),
  learningStyle: z.string().optional(),
});
export type GenerateRoadmapInput = z.infer<typeof GenerateRoadmapInputSchema>;

export async function generateRoadmap(
  input: GenerateRoadmapInput,
): Promise<GenerateRoadmapOutput> {
  return generateRoadmapFlow(input);
}

const prompt = ai.definePrompt({
  name: "generateRoadmapPrompt",
  input: { schema: GenerateRoadmapInputSchema },
  output: { schema: GenerateRoadmapOutputSchema },
  prompt: `You are a professional roadmap generator creating comprehensive learning paths for developers and tech professionals. Create a detailed, industry-standard roadmap based on the user's input.

**User Requirements:**
- Desired Skill: {{{desiredSkill}}}
- Current Level: {{{knowledgeLevel}}}
- Time Available: {{{availableTime}}} per week
- Learning Style: {{{learningStyle}}}

**Quality Standards:**
1. **Professional Content**: Use industry-standard terminology and current best practices
2. **Real Resources**: Include actual URLs to high-quality learning materials (MDN, official docs, reputable courses)
3. **Practical Projects**: Design hands-on projects that build real-world skills
4. **Progressive Difficulty**: Ensure logical progression from basic to advanced concepts
5. **Comprehensive Coverage**: Include all essential topics for the skill area
6. **Current Technology**: Focus on modern, relevant tools and frameworks

**Resource Guidelines:**
- Prioritize official documentation and well-known educational platforms
- Include a mix of free and premium resources
- Ensure URLs are valid and lead to quality content
- Use recent resources (prefer content from last 2-3 years)

**Project Guidelines:**
- Each project should solve a real problem or demonstrate a key concept
- Include clear learning objectives for each project
- Progress from simple tutorials to complex, portfolio-worthy applications
- Tag projects with relevant technologies and skills

Generate a comprehensive roadmap with title, description, prerequisites, categories with subtopics, projects, next steps, and related roadmaps. Make it professional and actionable.`,
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
