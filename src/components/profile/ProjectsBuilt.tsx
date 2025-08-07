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
import React from "react";

export function ProjectsBuilt({ projects }: { projects: any[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Projects Built</CardTitle>
        <CardDescription>Showcase of your completed projects</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {projects.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <p>
              No projects built yet. Start learning to build something amazing!
            </p>
          </div>
        )}
        {projects.map((project, index) => (
          <React.Fragment key={index}>
            {index > 0 && <Separator />}
            <div className="flex flex-col sm:flex-row gap-6 pt-4">
              <div className="flex-grow">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-lg">{project.title}</h3>
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
                <p className="text-muted-foreground mt-1">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {project.techStack.map((tech: string) => (
                    <Badge key={tech} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </React.Fragment>
        ))}
      </CardContent>
    </Card>
  );
}
