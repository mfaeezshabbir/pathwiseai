import React, { useState } from "react";
import type {
  GenerateRoadmapOutput,
  RoadmapCategory,
  RoadmapSubtopic,
  RoadmapProject,
  RoadmapResource,
} from "@/ai/flows/generate-roadmap";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  ChevronRight,
  ExternalLink,
  CheckCircle,
  Target,
  Lightbulb,
  ArrowRight,
  PlayCircle,
  FileText,
  GraduationCap,
  Code,
} from "lucide-react";

interface RoadmapTreeViewProps {
  roadmap: GenerateRoadmapOutput;
}

export function RoadmapTreeView({ roadmap }: RoadmapTreeViewProps) {
  const [openCategory, setOpenCategory] = useState<RoadmapCategory | null>(
    null,
  );
  const [openSubtopic, setOpenSubtopic] = useState<RoadmapSubtopic | null>(
    null,
  );
  const [showCategoryDialog, setShowCategoryDialog] = useState(false);
  const [showSubtopicDialog, setShowSubtopicDialog] = useState(false);

  if (!roadmap || !roadmap.categories) return null;

  const getResourceIcon = (type: string) => {
    switch (type) {
      case "video":
        return <PlayCircle className="h-4 w-4" />;
      case "article":
        return <FileText className="h-4 w-4" />;
      case "doc":
        return <BookOpen className="h-4 w-4" />;
      case "course":
        return <GraduationCap className="h-4 w-4" />;
      default:
        return <ExternalLink className="h-4 w-4" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-100 text-green-700 border-green-200";
      case "intermediate":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "advanced":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="min-h-screenpy-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold">{roadmap.title}</h1>
          {roadmap.description && (
            <p className="mx-auto mb-8 max-w-3xl text-lg">
              {roadmap.description}
            </p>
          )}

          {/* Prerequisites */}
          {roadmap.prerequisites && roadmap.prerequisites.length > 0 && (
            <Card className="mb-8 p-8 hover:translate-y-0">
              <div className="mb-4 flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-blue-800">
                  Prerequisites
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {roadmap.prerequisites.map((prereq, idx) => (
                  <Badge
                    key={idx}
                    variant="secondary"
                    className="cursor-pointer border-blue-200 bg-blue-100 text-blue-700 hover:bg-blue-200"
                  >
                    {prereq}
                  </Badge>
                ))}
              </div>
            </Card>
          )}
        </div>

        {/* Categories Grid */}
        <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {roadmap.categories.map((category, idx) => (
            <Card
              key={idx}
              className="group transform cursor-pointer border-2 border-slate-200 bg-white transition-all duration-300 hover:translate-y-1 hover:border-indigo-300 hover:shadow-xl"
              onClick={() => {
                setOpenCategory(category);
                setShowCategoryDialog(true);
              }}
            >
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-xl font-bold transition-colors group-hover:text-indigo-700">
                  <div className="rounded-lg bg-indigo-100 p-2 transition-colors group-hover:bg-indigo-900">
                    <BookOpen className="h-6 w-6 text-indigo-600" />
                  </div>
                  {category.name}
                </CardTitle>
                <CardDescription className="leading-relaxed">
                  {category.details}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {category.subtopics.slice(0, 3).map((subtopic, sIdx) => (
                    <div key={sIdx} className="flex items-center gap-2 text-sm">
                      <ChevronRight className="h-4 w-4 text-indigo-400" />
                      <span className="truncate">{subtopic.name}</span>
                    </div>
                  ))}
                  {category.subtopics.length > 3 && (
                    <div className="text-xs font-medium">
                      +{category.subtopics.length - 3} more topics
                    </div>
                  )}
                  {category.projects.length > 0 && (
                    <div className="border-t border-slate-100 pt-2">
                      <div className="flex items-center gap-2 text-sm font-medium text-indigo-600">
                        <Code className="h-4 w-4" />
                        {category.projects.length} Project
                        {category.projects.length > 1 ? "s" : ""}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Next Steps */}
        {roadmap.nextSteps && roadmap.nextSteps.length > 0 && (
          <Card className="mb-8 p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-lg p-2">
                <Target className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-2xl font-bold text-indigo-800">
                What's Next?
              </h3>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {roadmap.nextSteps.map((step, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 rounded-lg border border-indigo-100 bg-white p-4"
                >
                  <ArrowRight className="h-5 w-5 flex-shrink-0 text-indigo-500" />
                  <span className=" ">{step}</span>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Related Roadmaps */}
        {roadmap.relatedRoadmaps && roadmap.relatedRoadmaps.length > 0 && (
          <Card className="p-8 hover:translate-y-0">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-lg bg-slate-200/20 p-2">
                <Lightbulb className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold">Related Learning Paths</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {roadmap.relatedRoadmaps.map((related, idx) => (
                <Badge
                  key={idx}
                  variant="outline"
                  className="cursor-pointer border-slate-300 px-4 py-2 text-sm transition-colors hover:border-primary hover:text-primary"
                >
                  {related}
                </Badge>
              ))}
            </div>
          </Card>
        )}
      </div>

      {/* Category Dialog */}
      <Dialog
        open={showCategoryDialog}
        onOpenChange={(v) => {
          if (!v) {
            setShowCategoryDialog(false);
            setOpenCategory(null);
          }
        }}
      >
        <DialogContent className="max-h-[80vh] max-w-4xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 text-2xl font-bold">
              <div className="rounded-lg bg-indigo-100 p-2">
                <BookOpen className="h-6 w-6 text-indigo-600" />
              </div>
              {openCategory?.name}
            </DialogTitle>
            <DialogDescription className="text-lg">
              {openCategory?.details}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-8">
            {/* Subtopics */}
            <div>
              <h3 className="mb-6 flex items-center gap-2 text-xl font-bold">
                <Target className="h-5 w-5 text-indigo-600" />
                Learning Topics
              </h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {openCategory?.subtopics?.map((sub, i) => (
                  <Button
                    key={i}
                    variant="ghost"
                    className="h-auto w-full justify-start rounded-xl border border-slate-100 p-5 text-left shadow-sm transition-all hover:border-indigo-300"
                    onClick={() => {
                      setOpenSubtopic(sub);
                      setShowSubtopicDialog(true);
                    }}
                  >
                    <div className="flex w-full flex-col items-start gap-2">
                      <div className="flex items-center gap-2">
                        <ChevronRight className="h-4 w-4 text-indigo-500" />
                        <span className="font-semibold">{sub.name}</span>
                      </div>
                      <span className="line-clamp-2 w-full text-xs text-slate-400">
                        {sub.details}
                      </span>
                    </div>
                  </Button>
                ))}
              </div>
            </div>

            {/* Projects */}
            {openCategory?.projects && openCategory.projects.length > 0 && (
              <div>
                <h3 className="mb-4 flex items-center gap-2 text-xl font-semibold">
                  <Code className="h-5 w-5 text-indigo-600" />
                  Practical Projects
                </h3>
                <div className="space-y-4">
                  {openCategory.projects.map((proj, i) => (
                    <div
                      key={i}
                      className="rounded-lg border border-slate-200 p-6 transition-shadow hover:shadow-md"
                    >
                      <div className="mb-3 flex items-start justify-between gap-4">
                        <h4 className="text-lg font-semibold">{proj.title}</h4>
                        <Badge
                          className={`${getDifficultyColor(proj.difficulty)} font-medium`}
                        >
                          {proj.difficulty}
                        </Badge>
                      </div>
                      <p className="mb-3 leading-relaxed">{proj.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {proj.tags.map((tag, tIdx) => (
                          <Badge
                            key={tIdx}
                            variant="outline"
                            className="border-slate-300 text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                        {proj.saved && (
                          <Badge className="border-green-200 bg-green-100 text-green-700">
                            <CheckCircle className="mr-1 h-3 w-3" />
                            Saved
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Subtopic Dialog */}
      <Dialog
        open={showSubtopicDialog}
        onOpenChange={(v) => {
          if (!v) {
            setShowSubtopicDialog(false);
            setOpenSubtopic(null);
          }
        }}
      >
        <DialogContent className="max-h-[80vh] max-w-3xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              {openSubtopic?.name}
            </DialogTitle>
            <DialogDescription className="text-lg">
              {openSubtopic?.details}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            {/* Resources */}
            {openSubtopic?.resources && openSubtopic.resources.length > 0 && (
              <div>
                <h4 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                  <BookOpen className="h-5 w-5 text-indigo-600" />
                  Learning Resources
                </h4>
                <div className="space-y-3">
                  {openSubtopic.resources.map(
                    (res: RoadmapResource, i: number) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 rounded-lg border border-slate-200 p-3 transition-colors hover:border-slate-500"
                      >
                        <div className="rounded border border-slate-200 bg-white/20 p-2">
                          {getResourceIcon(res.type)}
                        </div>
                        <div className="flex-1">
                          <a
                            href={res.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 font-medium text-indigo-600 hover:text-indigo-700 hover:underline"
                          >
                            {res.title}
                            <ExternalLink className="h-3 w-3" />
                          </a>
                          <div className="mt-1 flex items-center gap-2">
                            <Badge
                              variant="outline"
                              className="text-xs capitalize"
                            >
                              {res.type}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </div>
            )}

            {/* Projects */}
            {openSubtopic?.projects && openSubtopic.projects.length > 0 && (
              <div>
                <h4 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                  <Code className="h-5 w-5 text-indigo-600" />
                  Practice Projects
                </h4>
                <div className="space-y-4">
                  {openSubtopic.projects.map(
                    (proj: RoadmapProject, i: number) => (
                      <div
                        key={i}
                        className="rounded-lg border border-slate-200 p-4"
                      >
                        <div className="mb-2 flex items-start justify-between gap-4">
                          <h5 className="font-semibold">{proj.title}</h5>
                          <Badge
                            className={`${getDifficultyColor(proj.difficulty)} text-xs`}
                          >
                            {proj.difficulty}
                          </Badge>
                        </div>
                        <p className="mb-3 text-sm">{proj.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {proj.tags.map((tag, tIdx) => (
                            <Badge
                              key={tIdx}
                              variant="outline"
                              className="border-slate-300 text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                          {proj.saved && (
                            <Badge className="border-green-200 bg-green-100 text-xs text-green-700">
                              <CheckCircle className="mr-1 h-3 w-3" />
                              Saved
                            </Badge>
                          )}
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
