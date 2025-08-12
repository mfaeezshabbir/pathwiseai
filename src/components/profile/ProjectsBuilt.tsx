import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const MAX_VISIBLE = 3;

export function ProjectsBuilt({ projects }: { projects: any[] }) {
  const [open, setOpen] = useState(false);

  const visibleProjects = projects.slice(0, MAX_VISIBLE);
  const hasMore = projects.length > MAX_VISIBLE;

  const renderProject = (project: any, index: number) => (
    <React.Fragment key={index}>
      {index > 0 && <Separator />}
      <div className="flex flex-col gap-6 pt-4 sm:flex-row">
        <div className="flex-grow">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold">{project.title}</h3>
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="sm">
                  <Github className="mr-2 h-4 w-4" /> View on GitHub
                </Button>
              </a>
            )}
          </div>
          <p className="mt-1 text-muted-foreground">{project.description}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {project.techStack.map((tech: string) => (
              <Badge key={tech} variant="secondary">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </React.Fragment>
  );

  return (
    <>
      <Card className="hover:translate-y-0">
        <CardHeader>
          <CardTitle>Projects Built</CardTitle>
          <CardDescription>Showcase of your completed projects</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {projects.length === 0 && (
            <div className="py-8 text-center text-muted-foreground">
              <p>
                No projects built yet. Start learning to build something
                amazing!
              </p>
            </div>
          )}
          {visibleProjects.map(renderProject)}
          {hasMore && (
            <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
              Show all
            </Button>
          )}
        </CardContent>
      </Card>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>All Projects</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">{projects.map(renderProject)}</div>
        </DialogContent>
      </Dialog>
    </>
  );
}
