import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function IPSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>3. Intellectual Property Rights</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-muted-foreground">
        <p>
          All content, features, and functionality of the Service are the
          exclusive property of PathWise AI and its licensors.
        </p>
      </CardContent>
    </Card>
  );
}
