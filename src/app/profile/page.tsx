"use client";
import React from "react";
import { Trophy, Award, Rocket } from "lucide-react";
import { ProfileSummary } from "@/components/profile/ProfileSummary";
import { AppNavbar } from "@/components/common/AppNavbar";
import { Achievements } from "@/components/profile/Achievements";
import { PersonalInfoForm } from "@/components/profile/PersonalInfoForm";
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
    <div className="flex min-h-screen">
      <AppNavbar />
      <main className="flex-1 max-w-7xl mx-auto py-10 px-4 md:px-8 md:ml-64">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          {/* Profile Sidebar */}
          <div className="lg:col-span-1 flex flex-col gap-8">
            <ProfileSummary
              user={userProfile}
              stats={{ roadmapsStarted, modulesCompleted }}
            />
            <Achievements achievements={userProfile.achievements} />
          </div>
          {/* Main Content Area */}
          <div className="lg:col-span-3 flex flex-col gap-10">
            <div className="mb-2">
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2 text-indigo-700 dark:text-indigo-300">
                Welcome, {userProfile.name}!
              </h1>
              <p className="text-lg text-muted-foreground">
                Track your progress, manage your learning, and showcase your
                achievements.
              </p>
            </div>
            <PersonalInfoForm user={userProfile} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <LearningActivity activity={userProfile.activity} />
              <ProjectsBuilt projects={userProfile.projects} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <MyRoadmaps roadmaps={userProfile.roadmaps} />
              <SkillsList skills={userProfile.skills} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
