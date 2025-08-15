import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";

function IdeaDetails({ idea }: { idea: any }) {
  return (
    <div>
      <div className="mb-3 flex items-center gap-3">
        <span className="text-lg font-semibold text-primary">
          {idea.moduleTitle}
        </span>
        {idea.skills &&
          idea.skills.map((skill: string) => (
            <Badge
              key={skill}
              variant="secondary"
              className="cursor-default text-xs"
            >
              {skill}
            </Badge>
          ))}
      </div>
      <div className="grid gap-4">
        {idea.projectIdeas.map((proj: string, i: number) => (
          <Card key={i} className="border-muted shadow hover:translate-y-0">
            <CardContent className="py-4 text-sm text-muted-foreground">
              {proj}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function ProjectIdeasGenerated({
  projectIdeas,
}: {
  projectIdeas: any[];
}) {
  const [open, setOpen] = useState(false);
  const [selectedIdea, setSelectedIdea] = useState<any>(null);

  if (!projectIdeas || projectIdeas.length === 0) {
    return (
      <section>
        <h2 className="mb-6 text-2xl font-bold text-primary">
          Project Ideas Generated
        </h2>
        <Card className="border-2 border-muted shadow-lg">
          <CardHeader className="rounded-t-lg bg-muted/50 pb-4">
            <CardTitle className="text-xl font-bold text-primary">
              Project Ideas Generated
            </CardTitle>
            <CardDescription className="text-base text-muted-foreground">
              Curated project ideas based on your modules and technologies.
            </CardDescription>
          </CardHeader>
          <CardContent className="py-12 text-center text-lg text-muted-foreground">
            <p>No project ideas generated yet.</p>
          </CardContent>
        </Card>
      </section>
    );
  }

  return (
    <Card className="hover:translate-y-0">
      <CardHeader className="mb-6 text-2xl font-bold text-primary">
        <CardTitle>Project Ideas Generated</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {projectIdeas.map((idea, idx) => (
          <Card
            key={idx}
            className="border-2 border-muted shadow-lg transition hover:translate-y-0 hover:cursor-pointer hover:shadow-xl"
            onClick={() => {
              setSelectedIdea(idea);
              setOpen(true);
            }}
            tabIndex={0}
            role="button"
            aria-label={`Show project idea details for ${idea.moduleTitle}`}
          >
            <CardHeader className="rounded-t-lg bg-muted/50">
              <CardTitle className="text-xl font-bold text-primary">
                {idea.moduleTitle}
              </CardTitle>
              <CardDescription className="text-base text-muted-foreground">
                Click to view project ideas and details.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 p-2">
                {idea.skills &&
                  idea.skills.map((skill: string) => (
                    <Badge key={skill} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </CardContent>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">
              Project Idea Details
            </DialogTitle>
          </DialogHeader>
          {selectedIdea && <IdeaDetails idea={selectedIdea} />}
        </DialogContent>
      </Dialog>
    </Card>
  );
}
