import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ChangesSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>5. Changes to Terms of Service</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-muted-foreground">
        <p>
          We reserve the right to update or change these Terms at any time.
          Continued use of the Service after changes constitutes acceptance of
          those changes.
        </p>
      </CardContent>
    </Card>
  );
}
