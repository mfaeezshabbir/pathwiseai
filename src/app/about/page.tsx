import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Target, User } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-4xl py-12 px-4 sm:px-6 lg:px-8">
      <div className="space-y-12">
        <header className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
            About PathWise AI
          </h1>
          <p className="mt-4 text-xl text-muted-foreground">
            Your personalized guide to mastering any skill.
          </p>
        </header>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <BookOpen className="h-8 w-8 text-primary" />
              Our Mission
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-lg text-muted-foreground">
            <p>
              At PathWise AI, our mission is to make learning accessible,
              engaging, and effective for everyone. We believe that with a clear
              path and the right tools, anyone can achieve their learning goals,
              no matter how ambitious. We're here to eliminate the guesswork and
              provide a structured, AI-powered roadmap to success.
            </p>
            <p>
              We're passionate about lifelong learning and empowering
              individuals to take control of their educational journey. Whether
              you're a beginner taking your first steps or an expert looking to
              expand your horizons, PathWise AI is your dedicated partner.
            </p>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <Target className="h-8 w-8 text-primary" />
                What I Do
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-muted-foreground">
              <p>
                <strong>AI-Powered Roadmaps:</strong> I use advanced AI to
                generate personalized learning paths tailored to your skills,
                goals, and available time.
              </p>
              <p>
                <strong>Interactive Learning:</strong> The roadmaps are more
                than just lists. They are interactive guides with summaries,
                tasks, and curated resources.
              </p>
              <p>
                <strong>AI Tutoring:</strong> Get unstuck and deepen your
                understanding with an AI assistant that can answer questions and
                explain complex topics.
              </p>
              <p>
                <strong>Gamified Progress:</strong> Stay motivated by tracking
                your progress, earning achievements, and building a portfolio of
                completed projects.
              </p>
            </CardContent>
          </Card>
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <User className="h-8 w-8 text-primary" />
                The Developer
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                PathWise AI was created by a dedicated solo developer who was
                tired of the fragmented and overwhelming nature of self-directed
                learning.
              </p>
              <p>
                I combined my expertise in software engineering and artificial
                intelligence to build the learning tool I always wished I had. I
                am committed to continuously improving the platform and adding
                new features to support our community of learners.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
