import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "lucide-react";

export function DeveloperSection() {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-2xl">
          <User className="h-8 w-8 text-primary" />
          The Developer
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-muted-foreground">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <img
            src="/assets/pathwiseai_logo.png"
            alt="Developer Avatar"
            className="w-24 h-24 rounded-full border-4 border-indigo-300 dark:border-indigo-700 shadow-lg"
          />
          <div>
            <p className="font-semibold">M. Faeze Shabbir</p>
            <p>Founder & Solo Developer</p>
            <p className="mt-2 text-sm">
              "I built PathwiseAI to solve my own learning struggles—fragmented
              resources, lack of structure, and no clear path. My goal is to
              empower others to learn efficiently and confidently."
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
