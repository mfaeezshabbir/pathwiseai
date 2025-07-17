'use client';
import { useState, useEffect, useMemo } from 'react';
import type { GenerateRoadmapOutput, RoadmapModule, RoadmapUnit, RoadmapResource } from '@/ai/flows/generate-roadmap';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Progress } from '@/components/ui/progress';
import { Book, Code, FileText, Globe, Youtube, RefreshCw, Lightbulb, ArrowRight, CheckSquare, Target, BookOpenCheck, Puzzle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { generateProjectIdeas } from '@/ai/flows/generate-project-ideas';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '../ui/scroll-area';

type RoadmapDisplayProps = {
  roadmap: GenerateRoadmapOutput;
  onReset: () => void;
};

// Add completed property to the types for state management
type ResourceWithState = RoadmapResource & { completed: boolean };
type UnitWithState = Omit<RoadmapUnit, 'resources'> & { resources: ResourceWithState[] };
type ModuleWithState = Omit<RoadmapModule, 'units'> & { units: UnitWithState[] };

const getIconForResource = (title: string, url?: string) => {
    const lowerTitle = title.toLowerCase();
    if(url?.includes("youtube.com") || url?.includes("youtu.be")) return <Youtube className="h-4 w-4 text-red-600" />;
    if (lowerTitle.includes('video')) return <Youtube className="h-4 w-4 text-red-600" />;
    if (lowerTitle.includes('article') || lowerTitle.includes('blog') || lowerTitle.includes('docs')) return <FileText className="h-4 w-4 text-blue-600" />;
    if (lowerTitle.includes('project') || lowerTitle.includes('build')) return <Code className="h-4 w-4 text-green-600" />;
    if (url) return <Globe className="h-4 w-4" />
    return <Book className="h-4 w-4" />;
};

function ProjectIdeasGenerator({ moduleTitle, skills }: { moduleTitle: string; skills: string[] }) {
    const [ideas, setIdeas] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleGenerate = async () => {
        setIsLoading(true);
        try {
            const result = await generateProjectIdeas({ skills, roadmapName: moduleTitle });
            setIdeas(result.projectIdeas);
        } catch (error) {
            toast({
                title: 'Error generating project ideas',
                description: 'Please try again later.',
                variant: 'destructive',
            });
        } finally {
            setIsLoading(false);
        }
    }

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
                        Based on the skills in this module, here are some project ideas to practice what you've learned.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <ScrollArea className="h-60">
                <div className="p-4 space-y-2">
                    {ideas.length > 0 ? (
                        <ul className="list-disc pl-5 space-y-2">
                            {ideas.map((idea, i) => <li key={i}>{idea}</li>)}
                        </ul>
                    ) : (
                        <p className="text-muted-foreground text-center">Click "Generate" to get project ideas.</p>
                    )}
                     {isLoading && <p className="text-muted-foreground text-center">Generating...</p>}
                </div>
                </ScrollArea>
                <AlertDialogFooter>
                    <AlertDialogCancel>Close</AlertDialogCancel>
                    <Button onClick={handleGenerate} disabled={isLoading}>
                       <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} /> Generate
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export function RoadmapDisplay({ roadmap, onReset }: RoadmapDisplayProps) {
  const [modules, setModules] = useState<ModuleWithState[]>([]);

  useEffect(() => {
    // Initialize state with 'completed' property
    if (roadmap && roadmap.modules) {
       if(roadmap.modules.length === 0) {
        toast({
            title: "Could not parse roadmap",
            description: "The AI returned an empty roadmap. Please try generating it again.",
            variant: "destructive"
        })
        onReset();
      } else {
        const initialState = roadmap.modules.map(module => ({
            ...module,
            units: (module.units || []).map(unit => ({
            ...unit,
            resources: (unit.resources || []).map(resource => ({
                ...resource,
                completed: false,
            })),
            })),
        }));
        setModules(initialState);
      }
    }
  }, [roadmap, onReset]);

  const handleToggleResource = (moduleIndex: number, unitIndex: number, resourceIndex: number) => {
    setModules(prevModules => {
      const newModules = JSON.parse(JSON.stringify(prevModules)); // Deep copy
      const resource = newModules[moduleIndex].units[unitIndex].resources[resourceIndex];
      resource.completed = !resource.completed;
      return newModules;
    });
  };

  const { progress, completedResources, totalResources } = useMemo(() => {
    if (!modules) return { progress: 0, completedResources: 0, totalResources: 0 };
    let completed = 0;
    let total = 0;
    modules.forEach(module => {
      (module.units || []).forEach(unit => {
        total += (unit.resources || []).length;
        (unit.resources || []).forEach(resource => {
          if (resource.completed) completed++;
        });
      });
    });
    return { 
        progress: total === 0 ? 0 : (completed / total) * 100,
        completedResources: completed,
        totalResources: total
    };
  }, [modules]);

  if (!roadmap) {
    return null;
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
            <h1 className="text-3xl font-bold tracking-tight">{roadmap.title}</h1>
            <p className="text-muted-foreground">{roadmap.description}</p>
        </div>
        <Button onClick={onReset} variant="outline">
            <RefreshCw className="mr-2 h-4 w-4"/> Create New Roadmap
        </Button>
      </div>

       <div className="grid md:grid-cols-2 gap-4">
            {roadmap.prerequisites && roadmap.prerequisites.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><CheckSquare /> Prerequisites</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="list-disc pl-5 space-y-1">
                            {roadmap.prerequisites.map((prereq, i) => <li key={i}>{prereq}</li>)}
                        </ul>
                    </CardContent>
                </Card>
            )}
            {roadmap.relatedRoadmaps && roadmap.relatedRoadmaps.length > 0 && (
                <Card>
                    <CardHeader>
                         <CardTitle className="flex items-center gap-2"><ArrowRight /> Next Steps</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="list-disc pl-5 space-y-1">
                            {roadmap.relatedRoadmaps.map((related, i) => <li key={i}>{related}</li>)}
                        </ul>
                    </CardContent>
                </Card>
            )}
       </div>

       <Card>
        <CardHeader>
            <CardTitle>Your Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={progress} className="h-3" />
          <p className="text-sm text-muted-foreground mt-2">{completedResources} of {totalResources} items completed ({Math.round(progress)}%)</p>
        </CardContent>
      </Card>
      
      <div className="space-y-4">
        {modules.map((module, mIndex) => (
          <Card key={mIndex} className="overflow-hidden">
            <CardHeader>
              <div className="flex flex-row items-center justify-between">
                <CardTitle className="text-xl text-primary">{module.title}</CardTitle>
                <ProjectIdeasGenerator moduleTitle={module.title} skills={(module.units || []).map(u => u.title)} />
              </div>
              {module.description && <CardDescription>{module.description}</CardDescription>}
            </CardHeader>
            <CardContent>
              <Accordion type="multiple" className="w-full" defaultValue={(module.units || []).map((_,u) => `unit-${mIndex}-${u}`)}>
                {(module.units || []).map((unit, uIndex) => (
                  <AccordionItem value={`unit-${mIndex}-${uIndex}`} key={uIndex}>
                    <AccordionTrigger className="text-lg hover:no-underline font-semibold">
                      <div className="flex flex-col text-left">
                        <span>{unit.title}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pl-2 space-y-4">
                        <div className="space-y-3 pt-2">
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Target className="h-5 w-5 text-accent" />
                                <div>
                                    <h4 className="font-semibold text-foreground">Objective</h4>
                                    <p className="text-sm">{unit.objective}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <BookOpenCheck className="h-5 w-5 text-accent" />
                                <div>
                                    <h4 className="font-semibold text-foreground">Key Concept</h4>
                                    <p className="text-sm">{unit.summary}</p>
                                </div>
                            </div>
                             <div className="flex items-center gap-2 text-muted-foreground">
                                <Puzzle className="h-5 w-5 text-accent" />
                                <div>
                                    <h4 className="font-semibold text-foreground">Your Task</h4>
                                    <p className="text-sm">{unit.task}</p>
                                </div>
                            </div>
                        </div>

                      <h4 className="font-semibold text-foreground pt-2">Resources</h4>
                      <ul className="space-y-3">
                        {(unit.resources || []).map((resource, rIndex) => (
                          <li key={rIndex} className="flex items-start gap-3 rounded-md p-2 hover:bg-muted/50 transition-colors">
                            <Checkbox
                              id={`resource-${mIndex}-${uIndex}-${rIndex}`}
                              checked={resource.completed}
                              onCheckedChange={() => handleToggleResource(mIndex, uIndex, rIndex)}
                              className="mt-1"
                            />
                            <label htmlFor={`resource-${mIndex}-${uIndex}-${rIndex}`} className="flex-1 text-sm cursor-pointer">
                                <div className="flex items-center gap-2 font-medium">
                                    {getIconForResource(resource.title, resource.url)}
                                    <span className={resource.completed ? 'line-through text-muted-foreground' : ''}>
                                        {resource.title}
                                    </span>
                                </div>
                                {resource.description && <p className="text-xs text-muted-foreground ml-6">{resource.description}</p>}
                                {resource.url && (
                                    <a href={resource.url} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline break-all ml-6">
                                        {resource.url}
                                    </a>
                                )}
                            </label>
                          </li>
                        ))}
                         {(!unit.resources || unit.resources.length === 0) && (
                            <li className="text-sm text-muted-foreground text-center py-2">No resources for this unit.</li>
                        )}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
