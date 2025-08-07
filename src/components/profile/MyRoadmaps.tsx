import { AppCard } from '@/components/common/AppCard';
import { EmptyState } from '@/components/common/EmptyState';
import { Button } from '@/components/ui/button';

export function MyRoadmaps({ roadmaps }: { roadmaps: any[] }) {
  return (
    <AppCard title="My Roadmaps" description="Your saved learning paths" contentClass="space-y-4">
      {roadmaps.length === 0 && <EmptyState message="No roadmaps yet." />}
      {roadmaps.map((roadmap, index) => (
        <div key={index} className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors">
          <div>
            <h3 className="font-semibold">{roadmap.title}</h3>
            <p className="text-sm text-muted-foreground">{roadmap.progress}% complete</p>
          </div>
          <Button variant="secondary" size="sm">Continue</Button>
        </div>
      ))}
    </AppCard>
  );
}
