# PathWise AI

PathWise AI is a personalized learning roadmap generator powered by AI. It helps users create tailored learning paths for any skill, track their progress, and stay motivated with gamified features and an AI tutor.

![PathWise AI Dashboard](https://placehold.co/800x400.png)

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

- **Framework:** [Next.js](https://nextjs.org/) (React)
- **Generative AI:** [Google AI & Genkit](https://firebase.google.com/docs/genkit)
- **UI:** [Tailwind CSS](https://tailwindcss.com/) & [ShadCN UI](https://ui.shadcn.com/)
- **Styling:** CSS-in-JS with Tailwind CSS
- **Language:** TypeScript

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

/home/user/studio/src

- Node.js (v18 or later recommended)
- npm, yarn, or pnpm

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/mfaeezshabbir/pathwise-ai.git
    cd pathwise-ai
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of your project and add your Google AI API key:
    ```env
    GOOGLE_API_KEY=your_google_api_key_here
    ```

### Running the Application

1.  **Start the development server:**
    This command starts the Next.js application.

    ```bash
    npm run dev
    ```

2.  **Start the Genkit AI server:**
    In a separate terminal, start the Genkit development server to enable the AI features.

    ```bash
    npm run genkit:dev
    ```

3.  **Open your browser:**
    Navigate to [http://localhost:9002](http://localhost:9002) to see the application in action.

## 📝 To-Do / Future Enhancements

Check out the `TASKS.md` file in the repository for a detailed list of backend and frontend tasks planned for this project, including database integration, live data fetching, and UI/UX improvements.
