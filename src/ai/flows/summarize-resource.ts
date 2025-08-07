"use server";

/**
 * @fileOverview An AI agent that summarizes learning resources.
 *
 * - summarizeResource - A function that summarizes a learning resource.
 * - SummarizeResourceInput - The input type for the summarizeResource function.
 * - SummarizeResourceOutput - The return type for the summarizeResource function.
 */

import { ai } from "@/ai/genkit";
import { z } from "genkit";

const SummarizeResourceInputSchema = z.object({
  resourceText: z
    .string()
    .describe("The full text content of the learning resource to summarize."),
});
export type SummarizeResourceInput = z.infer<
  typeof SummarizeResourceInputSchema
>;

const SummarizeResourceOutputSchema = z.object({
  summary: z.string().describe("A concise summary of the learning resource."),
  progress: z.string().describe("A short summary of the summary."),
});
export type SummarizeResourceOutput = z.infer<
  typeof SummarizeResourceOutputSchema
>;

export async function summarizeResource(
  input: SummarizeResourceInput,
): Promise<SummarizeResourceOutput> {
  return summarizeResourceFlow(input);
}

const prompt = ai.definePrompt({
  name: "summarizeResourcePrompt",
  input: { schema: SummarizeResourceInputSchema },
  output: { schema: SummarizeResourceOutputSchema },
  prompt: `You are an expert summarizer of learning resources.

  Please provide a concise and informative summary of the following learning resource.

  Resource Text: {{{resourceText}}}

  Summary:`, // Removed Handlebars `safeString` usage
});

const summarizeResourceFlow = ai.defineFlow(
  {
    name: "summarizeResourceFlow",
    inputSchema: SummarizeResourceInputSchema,
    outputSchema: SummarizeResourceOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return {
      ...output!,
      progress: "The AI has generated a summary of the learning resource.",
    };
  },
);
