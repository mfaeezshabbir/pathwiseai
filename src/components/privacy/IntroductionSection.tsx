import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function IntroductionSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Introduction</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-muted-foreground">
        <p>
          Welcome to PathWise AI ("we", "us", "our"). We are committed to
          protecting your privacy. This Privacy Policy explains how we collect,
          use, disclose, and safeguard your information when you use our
          application.
        </p>
        <p>
          Please read this privacy policy carefully. If you do not agree with
          the terms of this privacy policy, please do not access the
          application.
        </p>
      </CardContent>
    </Card>
  );
}
