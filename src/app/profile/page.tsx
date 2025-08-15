"use client";
import React, { useEffect, useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { ProfileSummary } from "@/components/profile/ProfileSummary";
import { Achievements } from "@/components/profile/Achievements";
import { LearningActivity } from "@/components/profile/LearningActivity";
import { ProjectsBuilt } from "@/components/profile/ProjectsBuilt";
import { MyRoadmaps } from "@/components/profile/MyRoadmaps";
import { SkillsList } from "@/components/profile/SkillsList";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const [userProfile, setUserProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      signIn();
      return;
    }
    const fetchProfile = async () => {
      setLoading(true);
      const res = await fetch(`/api/user/profile?email=${session.user?.email}`);
      const data = await res.json();
      setUserProfile(data.userProfile);
      setLoading(false);
    };
    fetchProfile();
  }, [session, status]);

  if (status === "loading" || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }
  if (!userProfile) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        No profile found.
      </div>
    );
  }

  const roadmapsStarted = userProfile.roadmaps?.length || 0;
  const modulesCompleted = userProfile.roadmaps?.reduce(
    (total: number, roadmap: any) => {
      return total + Math.floor(roadmap.modules * (roadmap.progress / 100));
    },
    0,
  );

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
