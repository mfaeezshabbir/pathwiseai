"use client";
import { useState, useEffect } from "react";
import type {
  GenerateRoadmapOutput,
  RoadmapModule,
  RoadmapUnit,
  RoadmapResource,
} from "@/ai/flows/generate-roadmap";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { calculateProgress } from "@/components/roadmaps/display/utils";
import { RoadmapTreeView } from "./RoadmapTreeView";

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
        interface InitialResource extends RoadmapResource {
          completed: boolean;
        }

        interface InitialUnit extends Omit<RoadmapUnit, "resources"> {
          resources: InitialResource[];
        }

        interface InitialModule extends Omit<RoadmapModule, "units"> {
          units: InitialUnit[];
        }

        const initialState: InitialModule[] = roadmap.modules.map(
          (module): InitialModule => ({
            ...module,
            units: (module.units || []).map(
              (unit): InitialUnit => ({
                ...unit,
                resources: (unit.resources || []).map(
                  (resource: RoadmapResource): InitialResource => ({
                    ...resource,
                    completed: false,
                  }),
                ),
              }),
            ),
          }),
        );
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
      <div className="flex justify-end">
        <Button onClick={onReset} variant="outline">
          <RefreshCw className="mr-2 h-4 w-4" />
          Create New Roadmap
        </Button>
      </div>
      {/* Mindmap/Tree View */}
      <RoadmapTreeView roadmap={roadmap} />
    </div>
  );
}
