import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function SkillsList({ skills }: { skills: string[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Skills</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <Badge key={index} variant={index < 4 ? "default" : "secondary"}>
            {skill}
          </Badge>
        ))}
      </CardContent>
    </Card>
  );
}
