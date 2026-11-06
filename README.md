# PathWise AI

PathWise AI is a personalized learning roadmap generator powered by AI. It helps users create tailored learning paths for any skill, track their progress, and stay motivated with gamified features and an AI tutor.

<img width="1920" height="1200" alt="image" src="https://github.com/user-attachments/assets/94070ecf-bc5f-42c1-ab87-9549b780a2fe" />

## ✨ Features

- **AI-Powered Roadmap Generation:** Create custom learning paths based on desired skills, knowledge level, and time commitment.
- **Interactive Roadmap Display:** Track progress with checklists, view summaries, and get hands-on tasks for each learning unit.
- **AI Assistant & Tutor:** Get answers to questions, explanations of concepts, and code help from an integrated AI chat assistant.
- **Smart Suggestions:** The AI tutor can suggest relevant roadmaps directly in the chat.
- **Dynamic Profile Page:** Visualize your learning journey with stats, activity timelines, skill badges, and completed projects.
- **Gamification:** Earn achievements and badges to stay motivated.
- **Project Idea Generation:** Get AI-suggested project ideas based on the skills you've learned.
- **Light & Dark Mode:** Choose your preferred theme for a comfortable viewing experience.

## 🛠️ Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router, Turbopack) & React 19
- **Generative AI:** [Vercel AI SDK](https://ai-sdk.dev/) with Gemini by default, or any OpenAI-compatible provider
- **UI:** [Tailwind CSS v4](https://tailwindcss.com/) & [shadcn/ui](https://ui.shadcn.com/) (Radix UI)
- **Auth & data:** NextAuth (credentials) & MongoDB
- **Language:** TypeScript

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js 20.9+ (Next.js 16 requirement)
- Docker Desktop (for the local MongoDB)
- [MongoDB Compass](https://www.mongodb.com/products/compass) (optional, to browse the data)

### Setup

```bash
git clone https://github.com/mfaeezshabbir/pathwiseai.git
cd pathwiseai
npm install
cp .env.example .env      # then fill in GEMINI_API_KEY and NEXTAUTH_SECRET
npm run db:up             # start MongoDB in Docker
npm run db:seed           # create indexes + a local test user
npm run dev               # http://localhost:9002
```

The seeded test account (`test@pathwise.local`) is defined in `scripts/db-setup.mjs`. It's for local development only.

### Database scripts

| Command | What it does |
| --- | --- |
| `npm run db:up` | Start MongoDB 8 in Docker (data persists in a named volume) |
| `npm run db:down` | Stop the containers (data is kept) |
| `npm run db:logs` | Follow MongoDB logs |
| `npm run db:setup` | Ensure indexes and run data migrations (safe to re-run) |
| `npm run db:seed` | `db:setup` plus the local test user |
| `npm run db:compass` | Open MongoDB Compass connected to `MONGODB_URI` |

To connect Compass manually, paste the `MONGODB_URI` from your `.env` into a new connection.

### Running the whole stack in Docker

```bash
npm run docker:app        # builds the app image and starts app + MongoDB
```

The production build is served at [http://localhost:3000](http://localhost:3000). To wipe the local database, run `docker compose down -v`.

### Choosing an AI provider

Gemini is the default (`GEMINI_API_KEY`). To use any OpenAI-compatible API instead, such as OpenCode Zen, OpenRouter or a local Ollama, set these in `.env`:

```env
AI_PROVIDER=openai-compatible
AI_BASE_URL=https://your-provider.example/v1
AI_API_KEY=...
AI_MODEL=your-model-id
```

Roadmap generation relies on structured (JSON) output, so pick a model that supports it.

## 📝 To-Do / Future Enhancements

Check out the `TASKS.md` file in the repository for a detailed list of backend and frontend tasks planned for this project, including database integration, live data fetching, and UI/UX improvements.
