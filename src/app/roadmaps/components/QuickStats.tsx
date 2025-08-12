import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Target, Clock, Zap } from "lucide-react";
import React from "react";

interface QuickStatsProps {
  inProgress: number;
  completed: number;
  totalHours: number;
}

export function QuickStats({
  inProgress,
  completed,
  totalHours,
}: QuickStatsProps) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-100 dark:border-blue-800 dark:from-blue-950/50 dark:to-indigo-950/50">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                In Progress
              </p>
              <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                {inProgress}
              </p>
            </div>
            <BookOpen className="h-8 w-8 text-blue-500" />
          </div>
        </CardContent>
      </Card>
      <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-100 dark:border-green-800 dark:from-green-950/50 dark:to-emerald-950/50">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600 dark:text-green-400">
                Completed
              </p>
              <p className="text-2xl font-bold text-green-900 dark:text-green-100">
                {completed}
              </p>
            </div>
            <Target className="h-8 w-8 text-green-500" />
          </div>
        </CardContent>
      </Card>
      <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-violet-100 dark:border-purple-800 dark:from-purple-950/50 dark:to-violet-950/50">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-600 dark:text-purple-400">
                Total Hours
              </p>
              <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">
                {totalHours}
              </p>
            </div>
            <Clock className="h-8 w-8 text-purple-500" />
          </div>
        </CardContent>
      </Card>
      <Card className="border-orange-200 bg-gradient-to-br from-orange-50 to-red-100 dark:border-orange-800 dark:from-orange-950/50 dark:to-red-950/50">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-orange-600 dark:text-orange-400">
                Streak
              </p>
              <p className="text-2xl font-bold text-orange-900 dark:text-orange-100">
                12 Days
              </p>
            </div>
            <Zap className="h-8 w-8 text-orange-500" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
