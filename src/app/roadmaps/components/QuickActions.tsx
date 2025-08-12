import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Sparkles, Plus, Search, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import React from "react";

interface QuickActionsProps {
  onCreate: () => void;
  onExplore: () => void;
  onAnalytics: () => void;
}

export function QuickActions({
  onCreate,
  onExplore,
  onAnalytics,
}: QuickActionsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Button
            variant="outline"
            className="flex h-auto flex-col items-center gap-2 p-4"
            onClick={onCreate}
          >
            <Plus className="h-8 w-8" />
            <span>Create New Roadmap</span>
          </Button>
          <Button
            variant="outline"
            className="flex h-auto flex-col items-center gap-2 p-4"
            onClick={onExplore}
          >
            <Search className="h-8 w-8" />
            <span>Browse Templates</span>
          </Button>
          <Button
            variant="outline"
            className="flex h-auto flex-col items-center gap-2 p-4"
            onClick={onAnalytics}
          >
            <TrendingUp className="h-8 w-8" />
            <span>View Progress</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
