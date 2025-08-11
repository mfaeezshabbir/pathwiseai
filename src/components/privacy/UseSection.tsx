import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function UseSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Use of Your Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-muted-foreground">
        <p>
          We use the information we collect to operate, maintain, and improve
          our services, to communicate with you, and to comply with legal
          obligations.
        </p>
        <p>
          Having accurate information about you permits us to provide you with a
          smooth, efficient, and customized experience. Specifically, we may use
          information collected about you via the Application to:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Create and manage your account.</li>
          <li>Generate personalized learning roadmaps.</li>
          <li>
            Monitor and analyze usage and trends to improve your experience with
            the Application.
          </li>
          <li>Notify you of updates to the Application.</li>
          <li>Provide and improve our AI models.</li>
        </ul>
      </CardContent>
    </Card>
  );
}
