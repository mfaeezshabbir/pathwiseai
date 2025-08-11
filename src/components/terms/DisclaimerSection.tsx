import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function DisclaimerSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>4. Disclaimer of Warranties</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-muted-foreground">
        <p>
          The Service is provided on an "AS IS" and "AS AVAILABLE" basis. We
          make no warranties, expressed or implied, regarding the Service.
        </p>
      </CardContent>
    </Card>
  );
}
