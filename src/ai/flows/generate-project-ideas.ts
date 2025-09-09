"use server";

/**
 * @fileOverview A flow to generate project ideas based on learned skills.
 *
 * - generateProjectIdeas - A function that generates project ideas.
 * - GenerateProjectIdeasInput - The input type for the generateProjectIdeas function.
 * - GenerateProjectIdeasOutput - The return type for the generateProjectIdeas function.
 */

import { getAI } from "@/ai/genkit";
import { z } from "genkit";

const GenerateProjectIdeasInputSchema = z.object({
  skills: z
    .array(z.string())
    .describe("A list of skills the user has recently learned."),
  roadmapName: z.string().describe("The name of the learning roadmap."),
});
export type GenerateProjectIdeasInput = z.infer<
  typeof GenerateProjectIdeasInputSchema
>;

const GenerateProjectIdeasOutputSchema = z.object({
  projectIdeas: z.array(z.string()).describe("A list of project ideas."),
});
export type GenerateProjectIdeasOutput = z.infer<
  typeof GenerateProjectIdeasOutputSchema
>;

export async function generateProjectIdeas(
  input: GenerateProjectIdeasInput,
): Promise<GenerateProjectIdeasOutput> {
  const ai = getAI();

  const prompt = ai.definePrompt({
    name: "generateProjectIdeasPrompt",
    input: { schema: GenerateProjectIdeasInputSchema },
    output: { schema: GenerateProjectIdeasOutputSchema },
    prompt: `You are an AI project idea generator, specializing in coming up with interesting and creative project ideas based on a user's skills.

You will be provided with a list of skills that the user has learned, and the name of their roadmap.

You must return a list of diverse project ideas that would allow the user to practice the skills they have learned. The project ideas should be tailored to the skills and roadmap specified.

Skills: {{skills}}
Roadmap: {{roadmapName}}`,
  });

  const generateProjectIdeasFlow = ai.defineFlow(
    {
      name: "generateProjectIdeasFlow",
      inputSchema: GenerateProjectIdeasInputSchema,
      outputSchema: GenerateProjectIdeasOutputSchema,
    },
    async (input) => {
      const { output } = await prompt(input);
      return output!;
    },
  );

  return generateProjectIdeasFlow(input);
}
