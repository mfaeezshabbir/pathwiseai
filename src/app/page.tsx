'use client';
import { useState } from 'react';
import type { GenerateRoadmapOutput } from '@/ai/flows/generate-roadmap';
import { RoadmapGenerator } from '@/components/dashboard/roadmap-generator';
import { RoadmapDisplay } from '@/components/dashboard/roadmap-display';
import { useSearchParams } from 'next/navigation';
import React from 'react';

function DashboardContent() {
  const searchParams = useSearchParams();
  const skillToLearn = searchParams.get('learn');
  
  const [roadmapData, setRoadmapData] = useState<GenerateRoadmapOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [initialSkill, setInitialSkill] = useState<string | null>(skillToLearn);

  const handleReset = () => {
    setRoadmapData(null);
    setInitialSkill(null);
    // Also clear the query param from URL without reloading
    window.history.pushState({}, '', '/');
  }

  React.useEffect(() => {
    setInitialSkill(skillToLearn);
  }, [skillToLearn]);

  return (
    <div className="w-full">
        {!roadmapData ? (
            <RoadmapGenerator 
                onRoadmapGenerated={setRoadmapData}
                setIsLoading={setIsLoading}
                isLoading={isLoading}
                initialSkill={initialSkill || ''}
            />
        ) : (
            <RoadmapDisplay roadmap={roadmapData} onReset={handleReset} />
        )}
    </div>
  );
}


export default function DashboardPage() {
    return (
        <React.Suspense fallback={<div>Loading...</div>}>
            <DashboardContent />
        </React.Suspense>
    )
}