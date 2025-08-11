import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ContactSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Us</CardTitle>
      </CardHeader>
      <CardContent className="text-muted-foreground">
        <p>
          If you have any questions or concerns about this Privacy Policy,
          please contact us at{" "}
          <a href="mailto:support@pathwiseai.com" className="underline">
            support@pathwiseai.com
          </a>
          .
        </p>
      </CardContent>
    </Card>
  );
}
