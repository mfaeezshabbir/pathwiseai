import React, { useState } from "react";
import type {
  GenerateRoadmapOutput,
  RoadmapModule,
  RoadmapUnit,
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
import { BookOpen, ChevronRight, ChevronDown } from "lucide-react";

interface RoadmapTreeViewProps {
  roadmap: GenerateRoadmapOutput;
}

// Recursive node renderer for units/subtopics
function TreeNode({
  unit,
  onUnitClick,
}: {
  unit: RoadmapUnit;
  onUnitClick: (u: RoadmapUnit) => void;
}) {
  return (
    <div className="ml-6 mt-2 flex flex-col items-start">
      <Button
        variant="ghost"
        className="mb-1 text-left text-indigo-700 hover:bg-indigo-50"
        onClick={() => onUnitClick(unit)}
      >
        <ChevronRight className="mr-1 inline h-4 w-4" />
        {unit.title}
      </Button>
      {unit.subtopics && unit.subtopics.length > 0 && (
        <div className="ml-4 border-l-2 border-indigo-200 pl-2">
          {unit.subtopics.map((sub: RoadmapUnit, idx: number) => (
            <TreeNode key={idx} unit={sub} onUnitClick={onUnitClick} />
          ))}
        </div>
      )}
    </div>
  );
}

export function RoadmapTreeView({ roadmap }: RoadmapTreeViewProps) {
  const [openModule, setOpenModule] = useState<RoadmapModule | null>(null);
  const [openUnit, setOpenUnit] = useState<RoadmapUnit | null>(null);
  const [showModuleDialog, setShowModuleDialog] = useState(false);
  const [showUnitDialog, setShowUnitDialog] = useState(false);

  if (!roadmap || !roadmap.modules) return null;

  return (
    <div className="flex flex-col items-center gap-8 py-8">
      <h1 className="mb-4 text-3xl font-bold text-white">{roadmap.title}</h1>
      <div className="flex flex-wrap justify-center gap-8">
        {roadmap.modules.map((module, mIdx) => (
          <div key={mIdx} className="flex flex-col items-center">
            <Card
              className="cursor-pointer border-2 border-indigo-300 bg-white shadow-lg transition-transform hover:translate-y-0"
              onClick={() => {
                setOpenModule(module);
                setShowModuleDialog(true);
              }}
            >
              <CardHeader className="flex flex-col items-center">
                <CardTitle className="flex items-center gap-2 text-lg font-bold text-indigo-700">
                  <BookOpen className="h-5 w-5 text-indigo-500" />
                  {module.title}
                </CardTitle>
                {module.description && (
                  <CardDescription className="text-center text-sm text-muted-foreground">
                    {module.description}
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-2">
                  {module.units &&
                    module.units.map((unit, uIdx) => (
                      <TreeNode
                        key={uIdx}
                        unit={unit}
                        onUnitClick={(u) => {
                          setOpenUnit(u);
                          setShowUnitDialog(true);
                        }}
                      />
                    ))}
                </div>
              </CardContent>
            </Card>
            {/* Draw connectors visually (simple vertical line) */}
            {mIdx < roadmap.modules.length - 1 && (
              <div className="my-2 h-12 w-1 bg-indigo-200" />
            )}
          </div>
        ))}
      </div>
      {/* Module Dialog */}
      <Dialog
        open={showModuleDialog}
        onOpenChange={(v) => {
          if (!v) {
            setShowModuleDialog(false);
            setOpenModule(null);
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{openModule?.title}</DialogTitle>
            <DialogDescription>{openModule?.description}</DialogDescription>
          </DialogHeader>
          <div className="p-4">
            <h3 className="mb-2 text-lg font-semibold">Subtopics</h3>
            <ul className="space-y-2">
              {openModule?.units?.map((unit, i) => (
                <li key={i}>
                  <Button
                    variant="link"
                    className="text-indigo-600"
                    onClick={() => {
                      setOpenUnit(unit);
                      setShowUnitDialog(true);
                    }}
                  >
                    <ChevronRight className="mr-1 inline h-4 w-4" />
                    {unit.title}
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </DialogContent>
      </Dialog>
      {/* Unit Dialog */}
      <Dialog
        open={showUnitDialog}
        onOpenChange={(v) => {
          if (!v) {
            setShowUnitDialog(false);
            setOpenUnit(null);
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{openUnit?.title}</DialogTitle>
            <DialogDescription>{openUnit?.objective}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 p-4">
            <div>
              <h4 className="mb-1 font-semibold">Summary</h4>
              <p className="text-sm text-muted-foreground">
                {openUnit?.summary}
              </p>
            </div>
            <div>
              <h4 className="mb-1 font-semibold">Task</h4>
              <p className="text-sm text-muted-foreground">{openUnit?.task}</p>
            </div>
            <div>
              <h4 className="mb-1 font-semibold">Resources</h4>
              <ul className="list-disc space-y-1 pl-5">
                {openUnit?.resources?.map(
                  (
                    res: import("@/ai/flows/generate-roadmap").RoadmapResource,
                    i: number,
                  ) => (
                    <li key={i}>
                      <a
                        href={res.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:underline"
                      >
                        {res.title}
                      </a>
                      {res.description && (
                        <span className="ml-2 text-xs text-muted-foreground">
                          {res.description}
                        </span>
                      )}
                    </li>
                  ),
                )}
                {(!openUnit?.resources || openUnit.resources.length === 0) && (
                  <li className="text-xs text-muted-foreground">
                    No resources available.
                  </li>
                )}
              </ul>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
