"use client";
import React, { useState, useEffect } from "react";
import type { GenerateRoadmapOutput } from "@/ai/flows/generate-roadmap";
import { RoadmapGeneratorCard } from "@/components/roadmaps/RoadmapGeneratorCard";
import { RoadmapListCard } from "@/components/roadmaps/RoadmapListCard";
import { RoadmapMain } from "@/components/roadmaps/RoadmapMain";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Brain,
  BookOpen,
  Target,
  TrendingUp,
  Sparkles,
  Plus,
  Filter,
  Search,
  Grid3X3,
  List,
  Clock,
  Users,
  Star,
  Zap,
} from "lucide-react";
import { Input } from "@/components/ui/input";

// Enhanced mock data with more comprehensive information
const mockRoadmaps = [
  {
    id: "1",
    title: "Advanced React and Next.js",
    description:
      "Master modern React patterns, Next.js 14, and full-stack development",
    progress: 75,
    modules: 15,
    totalHours: 120,
    difficulty: "Advanced",
    category: "Frontend",
    tags: ["React", "Next.js", "TypeScript", "Full-stack"],
    enrolled: 1250,
    rating: 4.8,
    lastAccessed: "2 days ago",
    estimatedCompletion: "3 weeks",
    thumbnail: "/api/placeholder/300/200",
  },
  {
    id: "2",
    title: "Python for Data Science",
    description:
      "Complete data science journey from pandas to machine learning",
    progress: 30,
    modules: 12,
    totalHours: 80,
    difficulty: "Intermediate",
    category: "Data Science",
    tags: ["Python", "Pandas", "NumPy", "Machine Learning"],
    enrolled: 890,
    rating: 4.9,
    lastAccessed: "1 week ago",
    estimatedCompletion: "6 weeks",
    thumbnail: "/api/placeholder/300/200",
  },
  {
    id: "3",
    title: "Full-Stack Web Development",
    description: "End-to-end web development with modern technologies",
    progress: 0,
    modules: 20,
    totalHours: 200,
    difficulty: "Beginner",
    category: "Full-stack",
    tags: ["HTML", "CSS", "JavaScript", "Node.js", "MongoDB"],
    enrolled: 2100,
    rating: 4.7,
    lastAccessed: "Never",
    estimatedCompletion: "12 weeks",
    thumbnail: "/api/placeholder/300/200",
  },
];

const categories = [
  "All",
  "Frontend",
  "Backend",
  "Data Science",
  "Mobile",
  "DevOps",
  "AI/ML",
];
const difficulties = ["All", "Beginner", "Intermediate", "Advanced"];

export default function RoadmapsPage() {
  const [roadmapData, setRoadmapData] = useState<GenerateRoadmapOutput | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [filteredRoadmaps, setFilteredRoadmaps] = useState(mockRoadmaps);

  // Filter roadmaps based on search and filters
  useEffect(() => {
    let filtered = mockRoadmaps;

    if (searchQuery) {
      filtered = filtered.filter(
        (roadmap) =>
          roadmap.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          roadmap.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          roadmap.tags.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase()),
          ),
      );
    }

    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (roadmap) => roadmap.category === selectedCategory,
      );
    }

    if (selectedDifficulty !== "All") {
      filtered = filtered.filter(
        (roadmap) => roadmap.difficulty === selectedDifficulty,
      );
    }

    setFilteredRoadmaps(filtered);
  }, [searchQuery, selectedCategory, selectedDifficulty]);

  const handleReset = () => setRoadmapData(null);

  const handleNewRoadmap = () => {
    setRoadmapData(null);
    setOpen(true);
  };

  const handleRoadmapGenerated = (data: GenerateRoadmapOutput | null) => {
    setRoadmapData(data);
    setOpen(false);
  };

  const inProgressRoadmaps = filteredRoadmaps.filter(
    (r) => r.progress > 0 && r.progress < 100,
  );
  const completedRoadmaps = filteredRoadmaps.filter((r) => r.progress === 100);
  const notStartedRoadmaps = filteredRoadmaps.filter((r) => r.progress === 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 dark:from-[#0f0f23] dark:via-[#18181b] dark:to-[#1e1b4b]/20">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative mx-auto max-w-7xl px-6 py-16 sm:py-24">
          <div className="text-center">
            <div className="mb-6 flex justify-center">
              <div className="rounded-full bg-white/20 p-4 backdrop-blur-sm">
                <Brain className="h-12 w-12" />
              </div>
            </div>
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-6xl">
              AI-Powered Learning
              <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Roadmaps
              </span>
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-xl leading-8 text-indigo-100">
              Create personalized learning paths tailored to your goals, skill
              level, and schedule. Let AI guide your journey to mastery.
            </p>
            <div className="flex justify-center gap-4">
              <Button
                size="lg"
                className="bg-white text-indigo-600 hover:bg-gray-100"
                onClick={handleNewRoadmap}
                disabled={isLoading}
              >
                <Plus className="mr-2 h-5 w-5" />
                Create New Roadmap
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10"
                onClick={() => setActiveTab("explore")}
              >
                <Search className="mr-2 h-5 w-5" />
                Explore Roadmaps
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-6 py-12">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mx-auto mb-8 grid w-full grid-cols-4 lg:w-[600px]">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="explore" className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              Explore
            </TabsTrigger>
            <TabsTrigger value="create" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Create
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Analytics
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-8">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-100 dark:border-blue-800 dark:from-blue-950/50 dark:to-indigo-950/50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                        In Progress
                      </p>
                      <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                        {inProgressRoadmaps.length}
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
                        {completedRoadmaps.length}
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
                        {mockRoadmaps.reduce((acc, r) => acc + r.totalHours, 0)}
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

            {/* Continue Learning Section */}
            {inProgressRoadmaps.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Continue Learning
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {inProgressRoadmaps.slice(0, 2).map((roadmap) => (
                      <Card
                        key={roadmap.id}
                        className="cursor-pointer transition-shadow hover:shadow-lg"
                      >
                        <CardContent className="p-4">
                          <div className="mb-3 flex items-start justify-between">
                            <div>
                              <h3 className="text-lg font-semibold">
                                {roadmap.title}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                {roadmap.description}
                              </p>
                            </div>
                            <Badge variant="secondary">
                              {roadmap.difficulty}
                            </Badge>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Progress</span>
                              <span>{roadmap.progress}%</span>
                            </div>
                            <div className="h-2 w-full rounded-full bg-gray-200">
                              <div
                                className="h-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all"
                                style={{ width: `${roadmap.progress}%` }}
                              ></div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Quick Actions */}
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
                    onClick={handleNewRoadmap}
                  >
                    <Plus className="h-8 w-8" />
                    <span>Create New Roadmap</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="flex h-auto flex-col items-center gap-2 p-4"
                    onClick={() => setActiveTab("explore")}
                  >
                    <Search className="h-8 w-8" />
                    <span>Browse Templates</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="flex h-auto flex-col items-center gap-2 p-4"
                    onClick={() => setActiveTab("analytics")}
                  >
                    <TrendingUp className="h-8 w-8" />
                    <span>View Progress</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Explore Tab */}
          <TabsContent value="explore" className="space-y-6">
            {/* Search and Filters */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col gap-4 lg:flex-row">
                  <div className="flex-1">
                    <Input
                      placeholder="Search roadmaps, technologies, or topics..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="rounded-md border bg-background px-3 py-2"
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                    <select
                      value={selectedDifficulty}
                      onChange={(e) => setSelectedDifficulty(e.target.value)}
                      className="rounded-md border bg-background px-3 py-2"
                    >
                      {difficulties.map((diff) => (
                        <option key={diff} value={diff}>
                          {diff}
                        </option>
                      ))}
                    </select>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setViewMode(viewMode === "grid" ? "list" : "grid")
                      }
                    >
                      {viewMode === "grid" ? (
                        <List className="h-4 w-4" />
                      ) : (
                        <Grid3X3 className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Roadmaps Grid/List */}
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
                  : "space-y-4"
              }
            >
              {filteredRoadmaps.map((roadmap) => (
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
                          <Badge
                            key={tag}
                            variant="outline"
                            className="text-xs"
                          >
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
          </TabsContent>

          {/* Create Tab */}
          <TabsContent value="create">
            {roadmapData ? (
              <RoadmapGeneratorCard
                roadmapData={roadmapData}
                setRoadmapData={setRoadmapData}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                error={error}
                setError={setError}
                onReset={handleReset}
              />
            ) : (
              <RoadmapMain onRoadmapGenerated={setRoadmapData} />
            )}
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Learning Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="py-12 text-center text-muted-foreground">
                  <TrendingUp className="mx-auto mb-4 h-12 w-12 opacity-50" />
                  <p>Detailed analytics and progress tracking coming soon!</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Roadmap Generator Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              Create Your Learning Roadmap
            </DialogTitle>
          </DialogHeader>
          <RoadmapGeneratorCard
            roadmapData={null}
            setRoadmapData={handleRoadmapGenerated}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            error={error}
            setError={setError}
            onReset={() => setOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
