import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function CollectionSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Collection of Your Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-muted-foreground">
        <p>
          We may collect information about you in a variety of ways. The
          information we may collect via the Application includes:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Personal Data:</strong> Personally identifiable information,
            such as your name, email address, that you voluntarily give to us
            when you register with the Application.
          </li>
          <li>
            <strong>Derivative Data:</strong> Information our servers
            automatically collect when you access the Application, such as your
            IP address, your browser type, your operating system, your usage
            data, and device information.
          </li>
        </ul>
      </CardContent>
    </Card>
  );
}
