import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Star, Grid3X3, List } from "lucide-react";
import React from "react";

interface Roadmap {
  id: string;
  title: string;
  description: string;
  progress: number;
  modules: number;
  totalHours: number;
  difficulty: string;
  category: string;
  tags: string[];
  enrolled: number;
  rating: number;
  lastAccessed: string;
  estimatedCompletion: string;
  thumbnail: string;
}

interface RoadmapsGridListProps {
  roadmaps: Roadmap[];
  viewMode: "grid" | "list";
}

export function RoadmapsGridList({
  roadmaps,
  viewMode,
}: RoadmapsGridListProps) {
  return (
    <div
      className={
        viewMode === "grid"
          ? "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          : "space-y-4"
      }
    >
      {roadmaps.map((roadmap) => (
        <Card
          key={roadmap.id}
          className="group cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
        >
          <CardContent className="p-0">
            <div className="flex aspect-video items-center justify-center rounded-t-lg bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/20 dark:to-purple-900/20">
              <div className="text-6xl opacity-20">
                {roadmap.category === "Frontend" && "⚛️"}
                {roadmap.category === "Data Science" && "📊"}
                {roadmap.category === "Full-stack" && "🌐"}
              </div>
            </div>
            <div className="space-y-4 p-6">
              <div className="space-y-2">
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-bold transition-colors group-hover:text-indigo-600">
                    {roadmap.title}
                  </h3>
                  <Badge
                    variant={
                      roadmap.difficulty === "Beginner"
                        ? "secondary"
                        : roadmap.difficulty === "Intermediate"
                          ? "default"
                          : "destructive"
                    }
                  >
                    {roadmap.difficulty}
                  </Badge>
                </div>
                <p className="line-clamp-2 text-sm text-muted-foreground">
                  {roadmap.description}
                </p>
              </div>
              <div className="flex flex-wrap gap-1">
                {roadmap.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {roadmap.tags.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{roadmap.tags.length - 3}
                  </Badge>
                )}
              </div>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {roadmap.totalHours}h
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {roadmap.enrolled}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    {roadmap.rating}
                  </span>
                </div>
              </div>
              {roadmap.progress > 0 && (
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>Progress</span>
                    <span>{roadmap.progress}%</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-gray-200">
                    <div
                      className="h-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
                      style={{ width: `${roadmap.progress}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
