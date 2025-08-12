"use client";
import { useState, useEffect } from "react";
import type {
  GenerateRoadmapOutput,
  RoadmapModule,
  RoadmapUnit,
  RoadmapResource,
} from "@/ai/flows/generate-roadmap";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Progress } from "@/components/ui/progress";
import {
  Book,
  Code,
  FileText,
  Globe,
  Youtube,
  RefreshCw,
  ArrowRight,
  CheckSquare,
  Target,
  BookOpenCheck,
  Puzzle,
  TrendingUp,
  BookOpen,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
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
import ProjectIdeasGenerator from "@/components/roadmaps/display/ProjectIdeasGenerator";
import {
  getIconForResource,
  calculateProgress,
  calculateModuleProgress,
  calculateUnitProgress,
} from "@/components/roadmaps/display/utils";

type RoadmapDisplayProps = {
  roadmap: GenerateRoadmapOutput;
  onReset: () => void;
};

// Add completed property to the types for state management
type ResourceWithState = RoadmapResource & { completed: boolean };
type UnitWithState = Omit<RoadmapUnit, "resources"> & {
  resources: ResourceWithState[];
};
type ModuleWithState = Omit<RoadmapModule, "units"> & {
  units: UnitWithState[];
};

export function RoadmapDisplay({ roadmap, onReset }: RoadmapDisplayProps) {
  const [modules, setModules] = useState<ModuleWithState[]>([]);

  useEffect(() => {
    // Initialize state with 'completed' property
    if (roadmap && roadmap.modules) {
      if (roadmap.modules.length === 0) {
        toast({
          title: "Could not parse roadmap",
          description:
            "The AI returned an empty roadmap. Please try generating it again.",
          variant: "destructive",
        });
        onReset();
      } else {
        const initialState = roadmap.modules.map((module) => ({
          ...module,
          units: (module.units || []).map((unit) => ({
            ...unit,
            resources: (unit.resources || []).map((resource) => ({
              ...resource,
              completed: false,
            })),
          })),
        }));
        setModules(initialState);
      }
    }
  }, [roadmap, onReset]);

  const handleToggleResource = (
    moduleIndex: number,
    unitIndex: number,
    resourceIndex: number,
  ) => {
    setModules((prevModules) => {
      const newModules = JSON.parse(JSON.stringify(prevModules)); // Deep copy
      const resource =
        newModules[moduleIndex].units[unitIndex].resources[resourceIndex];
      resource.completed = !resource.completed;
      return newModules;
    });
  };

  const { progress, completedResources, totalResources } =
    calculateProgress(modules);

  if (!roadmap) {
    return null;
  }

  return (
    <div className="space-y-8">
      {/* Enhanced Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-8 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight lg:text-4xl">
                {roadmap.title}
              </h1>
              <p className="max-w-3xl text-lg text-indigo-100">
                {roadmap.description}
              </p>
              <div className="flex items-center gap-4 text-sm">
                <span className="flex items-center gap-1 rounded-full bg-white/20 px-3 py-1">
                  <BookOpenCheck className="h-4 w-4" />
                  {modules.length} Modules
                </span>
                <span className="flex items-center gap-1 rounded-full bg-white/20 px-3 py-1">
                  <Target className="h-4 w-4" />
                  {totalResources} Resources
                </span>
              </div>
            </div>
            <Button
              onClick={onReset}
              variant="outline"
              className="self-start border-white/30 bg-white/10 text-white hover:bg-white/20 lg:self-center"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Create New Roadmap
            </Button>
          </div>
        </div>
      </div>

      {/* Progress Section */}
      <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-100 dark:border-green-800 dark:from-green-950/20 dark:to-emerald-950/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-300">
            <TrendingUp className="h-5 w-5" />
            Your Learning Progress
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Progress value={progress} className="h-4" />
          <div className="flex justify-between text-sm">
            <span className="font-medium text-green-600 dark:text-green-400">
              {completedResources} of {totalResources} items completed
            </span>
            <span className="font-bold text-green-700 dark:text-green-300">
              {Math.round(progress)}%
            </span>
          </div>
          {progress > 0 && (
            <div className="text-sm text-muted-foreground">
              {progress < 25 && "🌱 Just getting started! Keep going!"}
              {progress >= 25 && progress < 50 && "🌿 Making great progress!"}
              {progress >= 50 && progress < 75 && "🌳 You're doing amazing!"}
              {progress >= 75 &&
                progress < 100 &&
                "🎯 Almost there! You've got this!"}
              {progress === 100 &&
                "🎉 Congratulations! You've completed this roadmap!"}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Prerequisites and Next Steps */}
      {((roadmap.prerequisites && roadmap.prerequisites.length > 0) ||
        (roadmap.relatedRoadmaps && roadmap.relatedRoadmaps.length > 0)) && (
        <div className="grid gap-6 md:grid-cols-2">
          {roadmap.prerequisites && roadmap.prerequisites.length > 0 && (
            <Card className="border-orange-200 bg-gradient-to-br from-orange-50 to-yellow-100 dark:border-orange-800 dark:from-orange-950/20 dark:to-yellow-950/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-700 dark:text-orange-300">
                  <CheckSquare className="h-5 w-5" />
                  Prerequisites
                </CardTitle>
                <CardDescription>
                  Make sure you're familiar with these concepts before starting
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {roadmap.prerequisites.map((prereq, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckSquare className="mt-0.5 h-4 w-4 flex-shrink-0 text-orange-500" />
                      <span className="text-sm">{prereq}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {roadmap.relatedRoadmaps && roadmap.relatedRoadmaps.length > 0 && (
            <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-indigo-100 dark:border-purple-800 dark:from-purple-950/20 dark:to-indigo-950/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-700 dark:text-purple-300">
                  <ArrowRight className="h-5 w-5" />
                  Next Steps
                </CardTitle>
                <CardDescription>
                  Continue your learning journey with these advanced topics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {roadmap.relatedRoadmaps.map((related, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <ArrowRight className="mt-0.5 h-4 w-4 flex-shrink-0 text-purple-500" />
                      <span className="text-sm">{related}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Learning Modules */}
      <div className="space-y-6">
        <h2 className="flex items-center gap-2 text-2xl font-bold">
          <BookOpen className="h-6 w-6 text-indigo-500" />
          Learning Modules
        </h2>

        <div className="space-y-4">
          {modules.map((module, mIndex) => {
            const { moduleResources, moduleCompleted, moduleProgress } =
              calculateModuleProgress(module);
            return (
              <Card
                key={mIndex}
                className="overflow-hidden transition-all duration-300 hover:shadow-lg"
              >
                <CardHeader className="bg-gradient-to-r from-slate-50 to-gray-100 dark:from-slate-800 dark:to-gray-800">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div className="space-y-2">
                      <CardTitle className="flex items-center gap-2 text-xl">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500 text-sm font-bold text-white">
                          {mIndex + 1}
                        </div>
                        {module.title}
                      </CardTitle>
                      {module.description && (
                        <CardDescription className="text-base">
                          {module.description}
                        </CardDescription>
                      )}
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Progress
                            value={moduleProgress}
                            className="h-2 w-24"
                          />
                          <span className="font-medium">
                            {Math.round(moduleProgress)}%
                          </span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {(module.units || []).length} units
                        </span>
                      </div>
                    </div>
                    <ProjectIdeasGenerator
                      moduleTitle={module.title}
                      skills={(module.units || []).map((u) => u.title)}
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <Accordion
                    type="multiple"
                    className="w-full"
                    defaultValue={(module.units || []).map(
                      (_, u) => `unit-${mIndex}-${u}`,
                    )}
                  >
                    {(module.units || []).map((unit, uIndex) => {
                      const { unitResources, unitCompleted, unitProgress } =
                        calculateUnitProgress(unit);
                      return (
                        <AccordionItem
                          value={`unit-${mIndex}-${uIndex}`}
                          key={uIndex}
                          className="border-b last:border-b-0"
                        >
                          <AccordionTrigger className="px-6 py-4 transition-colors hover:bg-muted/50 hover:no-underline">
                            <div className="mr-4 flex w-full items-center justify-between">
                              <div className="flex items-center gap-3 text-left">
                                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-500 text-xs font-bold text-white">
                                  {uIndex + 1}
                                </div>
                                <span className="text-lg font-semibold">
                                  {unit.title}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Progress
                                  value={unitProgress}
                                  className="h-2 w-16"
                                />
                                <span className="min-w-[3rem] text-sm font-medium">
                                  {Math.round(unitProgress)}%
                                </span>
                              </div>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="px-6 pb-6">
                            {/* Unit Information */}
                            <div className="mb-6 grid gap-4 md:grid-cols-3">
                              <Card className="border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-950/20">
                                <div className="flex items-start gap-3">
                                  <Target className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-500" />
                                  <div>
                                    <h4 className="mb-1 font-semibold text-blue-700 dark:text-blue-300">
                                      Objective
                                    </h4>
                                    <p className="text-sm text-blue-600 dark:text-blue-400">
                                      {unit.objective}
                                    </p>
                                  </div>
                                </div>
                              </Card>

                              <Card className="border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-950/20">
                                <div className="flex items-start gap-3">
                                  <BookOpenCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                                  <div>
                                    <h4 className="mb-1 font-semibold text-green-700 dark:text-green-300">
                                      Key Concept
                                    </h4>
                                    <p className="text-sm text-green-600 dark:text-green-400">
                                      {unit.summary}
                                    </p>
                                  </div>
                                </div>
                              </Card>

                              <Card className="border-purple-200 bg-purple-50 p-4 dark:border-purple-800 dark:bg-purple-950/20">
                                <div className="flex items-start gap-3">
                                  <Puzzle className="mt-0.5 h-5 w-5 flex-shrink-0 text-purple-500" />
                                  <div>
                                    <h4 className="mb-1 font-semibold text-purple-700 dark:text-purple-300">
                                      Your Task
                                    </h4>
                                    <p className="text-sm text-purple-600 dark:text-purple-400">
                                      {unit.task}
                                    </p>
                                  </div>
                                </div>
                              </Card>
                            </div>

                            {/* Resources */}
                            <div className="space-y-3">
                              <h4 className="flex items-center gap-2 text-lg font-semibold">
                                <Book className="h-5 w-5 text-indigo-500" />
                                Learning Resources
                              </h4>

                              <div className="space-y-2">
                                {(unit.resources || []).map(
                                  (resource, rIndex) => (
                                    <Card
                                      key={rIndex}
                                      className={`p-4 transition-all duration-200 ${
                                        resource.completed
                                          ? "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/20"
                                          : "hover:bg-muted/50"
                                      }`}
                                    >
                                      <div className="flex items-start gap-3">
                                        <Checkbox
                                          id={`resource-${mIndex}-${uIndex}-${rIndex}`}
                                          checked={resource.completed}
                                          onCheckedChange={() =>
                                            handleToggleResource(
                                              mIndex,
                                              uIndex,
                                              rIndex,
                                            )
                                          }
                                          className="mt-1"
                                        />
                                        <label
                                          htmlFor={`resource-${mIndex}-${uIndex}-${rIndex}`}
                                          className="flex-1 cursor-pointer"
                                        >
                                          <div className="mb-1 flex items-center gap-2">
                                            {(() => {
                                              const iconType =
                                                getIconForResource(
                                                  resource.title,
                                                  resource.url,
                                                );
                                              switch (iconType) {
                                                case "youtube":
                                                  return (
                                                    <Youtube className="h-4 w-4 text-red-600" />
                                                  );
                                                case "filetext":
                                                  return (
                                                    <FileText className="h-4 w-4 text-blue-600" />
                                                  );
                                                case "code":
                                                  return (
                                                    <Code className="h-4 w-4 text-green-600" />
                                                  );
                                                case "globe":
                                                  return (
                                                    <Globe className="h-4 w-4" />
                                                  );
                                                default:
                                                  return (
                                                    <Book className="h-4 w-4" />
                                                  );
                                              }
                                            })()}
                                            <span
                                              className={`font-medium ${
                                                resource.completed
                                                  ? "text-muted-foreground line-through"
                                                  : ""
                                              }`}
                                            >
                                              {resource.title}
                                            </span>
                                          </div>
                                          {resource.description && (
                                            <p className="mb-2 text-sm text-muted-foreground">
                                              {resource.description}
                                            </p>
                                          )}
                                          {resource.url && (
                                            <a
                                              href={resource.url}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              className="inline-flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-800 hover:underline dark:text-indigo-400 dark:hover:text-indigo-300"
                                              onClick={(e) =>
                                                e.stopPropagation()
                                              }
                                            >
                                              <Globe className="h-3 w-3" />
                                              Open Resource
                                            </a>
                                          )}
                                        </label>
                                      </div>
                                    </Card>
                                  ),
                                )}
                                {(!unit.resources ||
                                  unit.resources.length === 0) && (
                                  <Card className="p-6 text-center">
                                    <p className="text-muted-foreground">
                                      No resources available for this unit.
                                    </p>
                                  </Card>
                                )}
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      );
                    })}
                  </Accordion>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
