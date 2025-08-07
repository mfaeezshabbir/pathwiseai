"use server";

/**
 * @fileOverview A Genkit tool that allows the AI to suggest generating a roadmap for a specific skill.
 */

import { ai } from "@/ai/genkit";
import { z } from "zod";

export const suggestRoadmapTool = ai.defineTool(
  {
    name: "suggestRoadmapTool",
    description:
      "Use this tool to suggest that the user generate a learning roadmap for a specific skill or technology. This should be used when a user asks for learning recommendations.",
    inputSchema: z.object({
      suggestion: z
        .string()
        .describe(
          "The specific skill or technology for which a roadmap is being suggested. e.g., 'React', 'Data Science', 'Go'",
        ),
    }),
    outputSchema: z.object({
      type: z.literal("roadmapSuggestion"),
      suggestion: z.string(),
    }),
  },
  async (input) => {
    // This tool doesn't need to do any processing. It just structures the data
    // for the frontend so it can render a "Generate Roadmap" button.
    // The LLM's prompt is configured to use the output of this tool.
    return {
      type: "roadmapSuggestion",
      suggestion: input.suggestion,
    };
  },
);
