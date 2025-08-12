import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export function Achievements({ achievements }: { achievements: any[] }) {
  return (
    <Card className="hover:translate-y-0">
      <CardHeader>
        <CardTitle>Achievements</CardTitle>
        <CardDescription>Badges you've earned</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {achievements.length === 0 && (
          <div className="py-4 text-center text-muted-foreground">
            <p>No achievements yet.</p>
          </div>
        )}
        {achievements.map((achievement, index) => {
          const Icon = achievement.icon;
          return (
            <div key={index} className="flex items-center">
              <Icon className="mr-4 h-8 w-8 text-yellow-500" />
              <div>
                <p className="font-semibold">{achievement.title}</p>
                <p className="text-sm text-muted-foreground">
                  {achievement.description}
                </p>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
