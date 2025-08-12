import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function SkillsList({ skills }: { skills: string[] }) {
  return (
    <Card className="border-2 border-primary/30 shadow-lg hover:translate-y-0">
      <CardHeader className="rounded-t-lg bg-primary/10">
        <CardTitle className="text-lg tracking-wide text-primary">
          Skills
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex flex-wrap gap-3">
          {skills.length === 0 ? (
            <span className="italic text-muted-foreground">
              No skills listed.
            </span>
          ) : (
            skills.map((skill, index) => (
              <Badge
                key={skill}
                variant={index < 6 ? "default" : "secondary"}
                className={`flex h-10 w-32 items-center justify-center rounded-lg text-base shadow-sm ${
                  index < 6
                    ? "bg-primary/80 text-white"
                    : "bg-muted text-primary"
                }`}
              >
                {skill}
              </Badge>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
