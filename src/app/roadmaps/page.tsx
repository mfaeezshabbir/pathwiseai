"use client";
import React, { useState, useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import { filterRoadmaps } from "./utils/filterRoadmaps";
import type { GenerateRoadmapOutput } from "@/ai/flows/generate-roadmap";
import { RoadmapGeneratorCard } from "@/components/roadmaps/RoadmapGeneratorCard";
import { RoadmapListCard } from "@/components/roadmaps/RoadmapListCard";
import { RoadmapMain } from "@/components/roadmaps/RoadmapMain";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { HeroSection } from "./components/HeroSection";
import { QuickStats } from "./components/QuickStats";
import { ContinueLearning } from "./components/ContinueLearning";
import { QuickActions } from "./components/QuickActions";
import { RoadmapsGridList } from "./components/RoadmapsGridList";
import {
  Brain,
  Grid3X3,
  List,
  Plus,
  Search,
  Target,
  TrendingUp,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function RoadmapsPage() {
  const { data: session, status } = useSession();

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
      thumbnail:
        "http://localhost:9002/_next/image?url=%2Fassets%2Fpathwiseai_logo.png&w=48&q=75",
    },
    // ...rest of mockRoadmaps...
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

  useEffect(() => {
    if (status !== "loading" && !session) signIn();
  }, [session, status]);

  // Filter roadmaps based on search and filters
  useEffect(() => {
    setFilteredRoadmaps(
      filterRoadmaps(
        mockRoadmaps,
        searchQuery,
        selectedCategory,
        selectedDifficulty,
      ),
    );
  }, [searchQuery, selectedCategory, selectedDifficulty]);

  if (status === "loading" || !session) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  // Only signed-in users can generate roadmaps or view this page
  // ...existing UI code below...

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
    <div className="min-h-screen">
      {/* Hero Section */}
      {/* <HeroSection
        onCreate={handleNewRoadmap}
        onExplore={() => setActiveTab("explore")}
        isLoading={isLoading}
      /> */}

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
            <QuickStats
              inProgress={inProgressRoadmaps.length}
              completed={completedRoadmaps.length}
              totalHours={mockRoadmaps.reduce(
                (acc, r) => acc + r.totalHours,
                0,
              )}
            />

            {/* Continue Learning Section */}
            <ContinueLearning inProgressRoadmaps={inProgressRoadmaps} />

            {/* Quick Actions */}
            <QuickActions
              onCreate={handleNewRoadmap}
              onExplore={() => setActiveTab("explore")}
              onAnalytics={() => setActiveTab("analytics")}
            />
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
            <RoadmapsGridList roadmaps={filteredRoadmaps} viewMode={viewMode} />
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
