import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function AgreementSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>1. Agreement to Terms</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-muted-foreground">
        <p>
          By using our application, PathWise AI (the "Service"), you agree to be
          bound by these Terms of Service ("Terms"). If you do not agree to
          these Terms, do not use the Service.
        </p>
      </CardContent>
    </Card>
  );
}
