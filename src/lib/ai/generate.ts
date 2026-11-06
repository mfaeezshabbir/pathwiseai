import "server-only";

import { generateText, Output } from "ai";
import { getModel } from "./model";
import {
  ProjectIdeasSchema,
  RoadmapSchema,
  TutorReplySchema,
  type ChatTurn,
  type GenerateProjectIdeasOutput,
  type GenerateRoadmapInput,
  type GenerateRoadmapOutput,
  type TutorReply,
} from "./schemas";

const ROADMAP_SYSTEM = `You are an expert curriculum designer who builds learning roadmaps for developers and tech professionals.

Quality standards:
- Order modules from fundamentals to advanced, so each builds on the last.
- Use current, industry-standard tools, terminology and best practices.
- Prefer official documentation and well-known platforms (MDN, official docs, reputable courses). Only include URLs you are confident exist.
- Mix free and paid resources, favoring recent content.
- Give every module hands-on projects that solve real problems, progressing from guided exercises to portfolio-worthy work, tagged with the technologies they practice.
- Fit the scope to the learner's level and weekly time budget.`;

export async function generateRoadmap(
  input: GenerateRoadmapInput,
): Promise<GenerateRoadmapOutput> {
  const { output } = await generateText({
    model: getModel(),
    system: ROADMAP_SYSTEM,
    output: Output.object({ schema: RoadmapSchema }),
    prompt: [
      `Create a learning roadmap for: ${input.desiredSkill}`,
      `Current level: ${input.knowledgeLevel}`,
      `Time available: ${input.availableTime} per week`,
      input.learningStyle ? `Preferred learning style: ${input.learningStyle}` : null,
      input.specificGoals ? `Specific goals: ${input.specificGoals}` : null,
      "Include a title, short description, prerequisites, 4-8 modules with subtopics, resources and projects, next steps, and related roadmaps.",
    ]
      .filter(Boolean)
      .join("\n"),
  });
  return output;
}

export async function generateProjectIdeas(input: {
  skills: string[];
  roadmapName: string;
}): Promise<GenerateProjectIdeasOutput> {
  const { output } = await generateText({
    model: getModel(),
    system:
      "You suggest creative, practical project ideas that help learners practice specific skills. Ideas should be varied in scope and concrete enough to start on today.",
    output: Output.object({ schema: ProjectIdeasSchema }),
    prompt: `Module: ${input.roadmapName}\nSkills covered: ${input.skills.join(", ") || "(not specified)"}\n\nSuggest project ideas that practice these skills.`,
  });
  return output;
}

const TUTOR_SYSTEM = `You are Pathwise Assistant, a friendly expert tutor for people learning tech skills.
- Answer clearly and concisely. Use short paragraphs or simple lists, and include small code snippets when helpful.
- When the learner asks what to learn, how to start, or for recommendations, list each recommended skill or technology in "suggestions" so they can generate a roadmap for it with one click.
- Otherwise leave "suggestions" empty.`;

export async function tutorReply(history: ChatTurn[]): Promise<TutorReply> {
  const { output } = await generateText({
    model: getModel(),
    system: TUTOR_SYSTEM,
    output: Output.object({ schema: TutorReplySchema }),
    messages: history.map((m) => ({ role: m.role, content: m.content })),
  });
  return output;
}
