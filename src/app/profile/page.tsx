"use client";
import React from "react";
import { Trophy, Award, Rocket } from "lucide-react";
import { ProfileSummary } from "@/components/profile/ProfileSummary";
import { AppNavbar } from "@/components/common/AppNavbar";
import { Achievements } from "@/components/profile/Achievements";
import { LearningActivity } from "@/components/profile/LearningActivity";
import { ProjectsBuilt } from "@/components/profile/ProjectsBuilt";
import { MyRoadmaps } from "@/components/profile/MyRoadmaps";
import { SkillsList } from "@/components/profile/SkillsList";

// Mock data for the profile page
const userProfile = {
  name: "Alex Doe",
  email: "alex.doe@example.com",
  avatarUrl: "https://placehold.co/100x100.png",
  roadmaps: [
    { title: "Advanced React and Next.js", progress: 75, modules: 15 },
    { title: "Python for Data Science", progress: 30, modules: 5 },
    { title: "Full-Stack Development", progress: 50, modules: 10 },
    { title: "Machine Learning Basics", progress: 20, modules: 8 },
    { title: "Docker and DevOps", progress: 40, modules: 6 },
  ],
  skills: [
    "React",
    "Next.js",
    "TypeScript",
    "Python",
    "Pandas",
    "SQL",
    "Docker",
    "PostgreSQL",
    "JavaScript",
    "CSS",
    "HTML",
    "jQuery",
    "Node.js",
    "Express.js",
    "Fastify",
    "GraphQL",
  ],
  rank: "Pro Learner",
  activity: [
    { month: "Jan", modules: 4 },
    { month: "Feb", modules: 6 },
    { month: "Mar", modules: 10 },
    { month: "Apr", modules: 5 },
    { month: "May", modules: 8 },
    { month: "Jun", modules: 7 },
  ],
  projects: [
    {
      title: "Personal Portfolio Website",
      description:
        "A responsive portfolio site built with Next.js to showcase my projects and skills.",
      repoUrl: "https://github.com/example/portfolio",
      techStack: ["Next.js", "React", "Tailwind CSS"],
    },
    {
      title: "Data Analysis Dashboard",
      description:
        "An interactive dashboard for visualizing sales data using Pandas and Matplotlib.",
      repoUrl: "https://github.com/example/dashboard",
      techStack: ["Python", "Pandas", "Flask"],
    },
  ],
  achievements: [
    {
      icon: Trophy,
      title: "Roadmap Conqueror",
      description: "Completed a full learning roadmap.",
    },
    {
      icon: Award,
      title: "Century Club",
      description: "Completed 100 learning units.",
    },
    {
      icon: Rocket,
      title: "Project Launcher",
      description: "Finished and deployed a project.",
    },
  ],
};

export default function ProfilePage() {
  const roadmapsStarted = userProfile.roadmaps.length;
  const modulesCompleted = userProfile.roadmaps.reduce((total, roadmap) => {
    return total + Math.floor(roadmap.modules * (roadmap.progress / 100));
  }, 0);

  return (
    <div className="min-h-screen">
      <main className="mx-auto max-w-full px-4 py-8 md:px-8">
        <p className="mb-2 text-lg text-muted-foreground">
          Welcome back! Here’s your learning dashboard.
        </p>
        <div className="flex flex-col gap-5">
          {/* Hero Header */}
          <ProfileSummary
            user={userProfile}
            stats={{ roadmapsStarted, modulesCompleted }}
            userProfile={userProfile}
          />
          <div className="grid w-full gap-4 md:grid-cols-2">
            <LearningActivity activity={userProfile.activity} />
            <Achievements achievements={userProfile.achievements} />
          </div>
          <SkillsList skills={userProfile.skills} />
          {/* Dashboard Grid */}
          <MyRoadmaps roadmaps={userProfile.roadmaps} />
          {/* Projects Section */}
          <ProjectsBuilt projects={userProfile.projects} />
        </div>
      </main>
    </div>
  );
}
