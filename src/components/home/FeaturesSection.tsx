import { SectionHeader } from "@/components/common/SectionHeader";
import { AppCard } from "@/components/common/AppCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  Brain,
  Target,
  TrendingUp,
  BookOpen,
  MessageCircle,
  Trophy,
  ArrowRight,
  Zap,
  Users,
  Clock,
} from "lucide-react";
import Link from "next/link";

export function FeaturesSection() {
  return (
    <section className="mb-20">
      <SectionHeader
        title="Why PathwiseAI?"
        description="Unlock your learning potential with these powerful features."
        icon={<Sparkles className="h-8 w-8 animate-bounce text-indigo-400" />}
      />

      {/* Main Feature - Roadmaps */}
      <div className="mb-12">
        <Card className="relative overflow-hidden border-2 border-indigo-200 bg-gradient-to-br from-indigo-50 via-white to-purple-50 hover:translate-y-0 dark:border-indigo-700 dark:from-indigo-950/30 dark:via-gray-900 dark:to-purple-950/30">
          <div className="absolute right-4 top-4">
            <Badge className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
              ⭐ Main Feature
            </Badge>
          </div>
          <CardHeader className="pb-4">
            <div className="mb-2 flex items-center gap-3">
              <div className="rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 p-3 text-white">
                <Brain className="h-8 w-8" />
              </div>
              <div>
                <CardTitle className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-3xl font-bold text-transparent">
                  AI-Powered Learning Roadmaps
                </CardTitle>
                <p className="mt-1 text-lg text-muted-foreground">
                  Your personalized path to mastery, created by advanced AI
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid items-center gap-8 md:grid-cols-2">
              <div className="space-y-6">
                <p className="text-lg leading-relaxed">
                  Get custom learning paths that adapt to your skill level,
                  available time, and learning style. Our AI analyzes thousands
                  of learning resources to create the perfect roadmap just for
                  you.
                </p>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-indigo-500" />
                    <span className="text-sm font-medium">Personalized</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-purple-500" />
                    <span className="text-sm font-medium">Time-Optimized</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-pink-500" />
                    <span className="text-sm font-medium">Interactive</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-green-500" />
                    <span className="text-sm font-medium">Expert-Curated</span>
                  </div>
                </div>

                <Link href="/roadmaps">
                  <Button
                    size="lg"
                    className="mt-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                  >
                    <BookOpen className="mr-2 h-5 w-5" />
                    Create Your Roadmap
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>

              <div className="relative">
                <div className="flex h-64 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-100 to-purple-100 p-6 dark:from-indigo-900/30 dark:to-purple-900/30">
                  <div className="space-y-4 text-center">
                    <div className="text-6xl">🗺️</div>
                    <div className="space-y-2">
                      <div className="rounded-lg bg-white p-3 shadow-sm dark:bg-gray-800">
                        <div className="flex items-center gap-2 text-sm">
                          <div className="h-3 w-3 rounded-full bg-green-500"></div>
                          <span>Module 1: Foundations</span>
                        </div>
                      </div>
                      <div className="rounded-lg bg-white p-3 shadow-sm dark:bg-gray-800">
                        <div className="flex items-center gap-2 text-sm">
                          <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                          <span>Module 2: Practice</span>
                        </div>
                      </div>
                      <div className="rounded-lg bg-white p-3 shadow-sm dark:bg-gray-800">
                        <div className="flex items-center gap-2 text-sm">
                          <div className="h-3 w-3 rounded-full bg-gray-300"></div>
                          <span>Module 3: Advanced</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Secondary Features */}
      <div className="grid gap-8 md:grid-cols-3">
        <AppCard
          title="AI Tutoring"
          className="glass-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
        >
          <div className="space-y-4">
            <div className="mb-3 flex items-center gap-2">
              <MessageCircle className="h-6 w-6 text-blue-500" />
              <Badge variant="secondary">Interactive</Badge>
            </div>
            <p>
              Ask questions and get instant, clear explanations from your
              personal AI tutor—anytime you're stuck or need clarification.
            </p>
            <div className="text-sm text-muted-foreground">
              💬 24/7 availability • 🎯 Context-aware • 🔍 Deep explanations
            </div>
          </div>
        </AppCard>

        <AppCard
          title="Progress Tracking"
          className="glass-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
        >
          <div className="space-y-4">
            <div className="mb-3 flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-green-500" />
              <Badge variant="secondary">Analytics</Badge>
            </div>
            <p>
              Monitor your learning journey with detailed analytics, milestone
              achievements, and personalized insights.
            </p>
            <div className="text-sm text-muted-foreground">
              📊 Visual progress • 🏆 Achievements • 📈 Performance insights
            </div>
          </div>
        </AppCard>

        <AppCard
          title="Project-Based Learning"
          className="glass-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
        >
          <div className="space-y-4">
            <div className="mb-3 flex items-center gap-2">
              <Trophy className="h-6 w-6 text-purple-500" />
              <Badge variant="secondary">Hands-On</Badge>
            </div>
            <p>
              Build real projects and create a portfolio as you learn. Practice
              with industry-relevant challenges and examples.
            </p>
            <div className="text-sm text-muted-foreground">
              🛠️ Real projects • 📁 Portfolio building • 🌟 Industry-relevant
            </div>
          </div>
        </AppCard>
      </div>
    </section>
  );
}
