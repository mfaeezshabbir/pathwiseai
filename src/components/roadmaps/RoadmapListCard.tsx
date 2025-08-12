import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Search,
  Clock,
  Users,
  Star,
  Play,
  MoreVertical,
  BookOpen,
  Target,
  TrendingUp,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Roadmap {
  id?: string;
  title: string;
  description?: string;
  progress: number;
  modules: number;
  totalHours?: number;
  difficulty?: string;
  category?: string;
  tags?: string[];
  enrolled?: number;
  rating?: number;
  lastAccessed?: string;
  estimatedCompletion?: string;
}

interface Props {
  roadmaps: Roadmap[];
}

export function RoadmapListCard({ roadmaps }: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("recent");

  const filteredRoadmaps = roadmaps.filter(
    (roadmap) =>
      roadmap.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      roadmap.description?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const inProgressRoadmaps = filteredRoadmaps.filter(
    (r) => r.progress > 0 && r.progress < 100,
  );
  const completedRoadmaps = filteredRoadmaps.filter((r) => r.progress === 100);
  const notStartedRoadmaps = filteredRoadmaps.filter((r) => r.progress === 0);

  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-500";
      case "Intermediate":
        return "bg-yellow-500";
      case "Advanced":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const RoadmapCard = ({ roadmap }: { roadmap: Roadmap }) => (
    <Card className="group cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="min-w-0 flex-1">
              <h3 className="truncate text-lg font-semibold transition-colors group-hover:text-indigo-600">
                {roadmap.title}
              </h3>
              {roadmap.description && (
                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                  {roadmap.description}
                </p>
              )}
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Edit Roadmap</DropdownMenuItem>
                <DropdownMenuItem>Share</DropdownMenuItem>
                <DropdownMenuItem>Export</DropdownMenuItem>
                <DropdownMenuItem className="text-red-600">
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Meta Information */}
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <BookOpen className="h-3 w-3" />
              {roadmap.modules} modules
            </span>
            {roadmap.totalHours && (
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {roadmap.totalHours}h
              </span>
            )}
            {roadmap.difficulty && (
              <Badge variant="outline" className="text-xs">
                {roadmap.difficulty}
              </Badge>
            )}
          </div>

          {/* Tags */}
          {roadmap.tags && roadmap.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {roadmap.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {roadmap.tags.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{roadmap.tags.length - 3}
                </Badge>
              )}
            </div>
          )}

          {/* Progress */}
          {roadmap.progress > 0 && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium">{roadmap.progress}%</span>
              </div>
              <Progress value={roadmap.progress} className="h-2" />
              {roadmap.estimatedCompletion && roadmap.progress < 100 && (
                <p className="text-xs text-muted-foreground">
                  Est. completion: {roadmap.estimatedCompletion}
                </p>
              )}
            </div>
          )}

          {/* Action Button */}
          <Button
            className="w-full"
            variant={roadmap.progress > 0 ? "default" : "outline"}
            size="sm"
          >
            <Play className="mr-2 h-4 w-4" />
            {roadmap.progress === 0
              ? "Start Learning"
              : roadmap.progress === 100
                ? "Review"
                : "Continue"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header and Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            My Roadmaps
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
              <Input
                placeholder="Search roadmaps..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-md border bg-background px-3 py-2 text-sm"
            >
              <option value="recent">Recent</option>
              <option value="progress">Progress</option>
              <option value="alphabetical">A-Z</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Stats Overview */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {inProgressRoadmaps.length}
            </div>
            <div className="text-sm text-muted-foreground">In Progress</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {completedRoadmaps.length}
            </div>
            <div className="text-sm text-muted-foreground">Completed</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-gray-600">
              {notStartedRoadmaps.length}
            </div>
            <div className="text-sm text-muted-foreground">Not Started</div>
          </CardContent>
        </Card>
      </div>

      {/* Continue Learning Section */}
      {inProgressRoadmaps.length > 0 && (
        <div className="space-y-4">
          <h3 className="flex items-center gap-2 text-lg font-semibold">
            <Play className="h-5 w-5 text-indigo-500" />
            Continue Learning
          </h3>
          <div className="space-y-3">
            {inProgressRoadmaps.slice(0, 2).map((roadmap, index) => (
              <RoadmapCard key={roadmap.id || index} roadmap={roadmap} />
            ))}
          </div>
        </div>
      )}

      {/* All Roadmaps */}
      <div className="space-y-4">
        <h3 className="flex items-center gap-2 text-lg font-semibold">
          <BookOpen className="h-5 w-5 text-purple-500" />
          All Roadmaps
        </h3>

        {filteredRoadmaps.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              {searchQuery ? (
                <div>
                  <Search className="mx-auto mb-4 h-12 w-12 opacity-50" />
                  <p>No roadmaps found matching "{searchQuery}"</p>
                </div>
              ) : (
                <div>
                  <BookOpen className="mx-auto mb-4 h-12 w-12 opacity-50" />
                  <p>No roadmaps yet.</p>
                  <p className="mt-2 text-sm">
                    Create your first learning roadmap to get started!
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {filteredRoadmaps.map((roadmap, index) => (
              <RoadmapCard key={roadmap.id || index} roadmap={roadmap} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
