import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen } from "lucide-react";

export function MissionSection() {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-2xl">
          <BookOpen className="h-8 w-8 text-primary" />
          Our Mission
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-lg text-muted-foreground">
        <p>
          PathwiseAI exists to make learning accessible, engaging, and effective
          for everyone. With a clear path and the right tools, anyone can
          achieve their learning goals—no matter how ambitious.
        </p>
        <p>
          We’re passionate about lifelong learning and empowering individuals to
          take control of their educational journey. Whether you’re a beginner
          or an expert, PathwiseAI is your dedicated partner.
        </p>
      </CardContent>
    </Card>
  );
}
