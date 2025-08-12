"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Code, RefreshCw } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { generateProjectIdeas } from "@/ai/flows/generate-project-ideas";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function ProjectIdeasGenerator({
  moduleTitle,
  skills,
}: {
  moduleTitle: string;
  skills: string[];
}) {
  const [ideas, setIdeas] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      const result = await generateProjectIdeas({
        skills,
        roadmapName: moduleTitle,
      });
      setIdeas(result.projectIdeas);
    } catch (error) {
      toast({
        title: "Error generating project ideas",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="secondary" size="sm">
          <Code className="mr-2 h-4 w-4" /> Suggest Projects
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Project Ideas for: {moduleTitle}</AlertDialogTitle>
          <AlertDialogDescription>
            Based on the skills in this module, here are some project ideas to
            practice what you've learned.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <ScrollArea className="h-60">
          <div className="space-y-2 p-4">
            {ideas.length > 0 ? (
              <ul className="list-disc space-y-2 pl-5">
                {ideas.map((idea, i) => (
                  <li key={i}>{idea}</li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-muted-foreground">
                Click "Generate" to get project ideas.
              </p>
            )}
            {isLoading && (
              <p className="text-center text-muted-foreground">Generating...</p>
            )}
          </div>
        </ScrollArea>
        <AlertDialogFooter>
          <AlertDialogCancel>Close</AlertDialogCancel>
          <Button onClick={handleGenerate} disabled={isLoading}>
            <RefreshCw
              className={`mr-2 h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
            />{" "}
            Generate
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
