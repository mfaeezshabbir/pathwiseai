import { genkit } from "genkit";
import { googleAI } from "@genkit-ai/googleai";
import { config } from "dotenv";

// Delay reading environment variables and initializing genkit until runtime
let _ai: ReturnType<typeof genkit> | null = null;

export function getAI() {
  if (_ai) return _ai;
  // load env vars at runtime
  config();
  _ai = genkit({
    plugins: [googleAI()],
    model: process.env.GENKIT_MODEL || "googleai/gemini-1.5-flash-latest",
  });
  return _ai;
}
