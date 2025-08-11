import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Target, User, Sparkles } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="space-y-12">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
            About PathwiseAI
          </h1>
          <p className="mt-4 text-xl text-muted-foreground">
            Your personalized AI-powered guide to mastering any skill.
          </p>
        </header>

        {/* Mission Section */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <BookOpen className="h-8 w-8 text-primary" />
              Our Mission
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-lg text-muted-foreground">
            <p>
              PathwiseAI exists to make learning accessible, engaging, and
              effective for everyone. With a clear path and the right tools,
              anyone can achieve their learning goals—no matter how ambitious.
            </p>
            <p>
              We’re passionate about lifelong learning and empowering
              individuals to take control of their educational journey. Whether
              you’re a beginner or an expert, PathwiseAI is your dedicated
              partner.
            </p>
          </CardContent>
        </Card>

        {/* Highlights/Timeline Section */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <Sparkles className="h-8 w-8 text-primary" />
              Highlights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-muted-foreground">
            <ul className="list-disc pl-6 space-y-1">
              <li>
                🚀 Launched with AI-generated, step-by-step learning roadmaps
              </li>
              <li>🤖 Integrated AI tutoring for instant, clear explanations</li>
              <li>🏆 Gamified progress tracking and achievements</li>
              <li>📚 Curated resources and interactive guides</li>
              <li>🌱 Continuously evolving with user feedback</li>
            </ul>
          </CardContent>
        </Card>

        {/* What We Do Section */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <Target className="h-8 w-8 text-primary" />
              What We Do
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-muted-foreground">
            <p>
              <strong>AI-Powered Roadmaps:</strong> Personalized learning paths
              tailored to your skills, goals, and schedule.
            </p>
            <p>
              <strong>Interactive Learning:</strong> Roadmaps are interactive
              guides with summaries, tasks, and curated resources.
            </p>
            <p>
              <strong>AI Tutoring:</strong> Get unstuck and deepen your
              understanding with an AI assistant.
            </p>
            <p>
              <strong>Gamified Progress:</strong> Track your progress, earn
              achievements, and build a portfolio of completed projects.
            </p>
          </CardContent>
        </Card>

        {/* Developer Section */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <User className="h-8 w-8 text-primary" />
              The Developer
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <img
                src="/assets/pathwiseai_logo.png"
                alt="Developer Avatar"
                className="w-24 h-24 rounded-full border-4 border-indigo-300 dark:border-indigo-700 shadow-lg"
              />
              <div>
                <p className="font-semibold">M. Faeze Shabbir</p>
                <p>Founder & Solo Developer</p>
                <p className="mt-2 text-sm">
                  "I built PathwiseAI to solve my own learning
                  struggles—fragmented resources, lack of structure, and no
                  clear path. My goal is to empower others to learn efficiently
                  and confidently."
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
