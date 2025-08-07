"use server";
/**
 * @fileOverview An AI assistant/tutor that can answer questions, explain concepts,
 * and provide code generation and debugging support using RAG to fetch information.
 *
 * - aiAssistantTutor - A function that handles the AI assistant/tutor process.
 * - AIAssistantTutorInput - The input type for the aiAssistantTutor function.
 * - AIAssistantTutorOutput - The return type for the aiAssistantTutor function.
 */

import { ai } from "@/ai/genkit";
import { z } from "genkit";
import { suggestRoadmapTool } from "./suggest-roadmap";

const AIAssistantTutorInputSchema = z.object({
  question: z
    .string()
    .describe("The question the user is asking the AI assistant."),
});
export type AIAssistantTutorInput = z.infer<typeof AIAssistantTutorInputSchema>;

const ContentPartSchema = z.union([
  z.object({
    type: z.literal("text"),
    text: z.string(),
  }),
  z.object({
    type: z.literal("roadmapSuggestion"),
    suggestion: z
      .string()
      .describe(
        "The specific skill or technology for which a roadmap is being suggested. e.g., 'React', 'Data Science', 'Go'",
      ),
  }),
]);

const AIAssistantTutorOutputSchema = z.object({
  answer: z
    .array(ContentPartSchema)
    .describe(
      "The AI's response, which can be a mix of text and tool outputs like roadmap suggestions.",
    ),
});
export type AIAssistantTutorOutput = z.infer<
  typeof AIAssistantTutorOutputSchema
>;

export async function aiAssistantTutor(
  input: AIAssistantTutorInput,
): Promise<AIAssistantTutorOutput> {
  return aiAssistantTutorFlow(input);
}

const prompt = ai.definePrompt({
  name: "aiAssistantTutorPrompt",
  input: { schema: AIAssistantTutorInputSchema },
  output: { schema: AIAssistantTutorOutputSchema },
  tools: [suggestRoadmapTool],
  prompt: `You are an AI assistant and expert learning tutor. Your goal is to provide clear, helpful answers to user questions.

- If the user asks for learning advice, recommendations on what to learn, or how to start with a new technology (e.g., "what should I learn for web dev?", "teach me python"), you MUST use the \`suggestRoadmapTool\` to suggest technologies they can generate a roadmap for.
- For each distinct technology or skill you recommend, call the \`suggestRoadmapTool\` tool. For example, if you suggest learning HTML, CSS, and JavaScript, you should call the tool three times, once for each.
- You can and should interleave your text explanations with these tool calls to create a rich, interactive response.
- For all other questions, answer them directly and conversationally.

User Question:
{{question}}`,
});

const aiAssistantTutorFlow = ai.defineFlow(
  {
    name: "aiAssistantTutorFlow",
    inputSchema: AIAssistantTutorInputSchema,
    outputSchema: AIAssistantTutorOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);

    // The model output now directly matches our desired schema if it uses the tool correctly.
    if (output) {
      return output;
    }

    // Fallback for when the model doesn't use the tool and just returns text.
    return {
      answer: [
        {
          type: "text",
          text: "An unexpected error occurred. Please try again.",
        },
      ],
    };
  },
);
