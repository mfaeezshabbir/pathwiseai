import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PrivacyPolicyPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Privacy Policy</h1>
        <p className="text-muted-foreground">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Introduction</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p>
            Welcome to PathWise AI ("we", "us", "our"). We are committed to
            protecting your privacy. This Privacy Policy explains how we
            collect, use, disclose, and safeguard your information when you use
            our application.
          </p>
          <p>
            Please read this privacy policy carefully. If you do not agree with
            the terms of this privacy policy, please do not access the
            application.
          </p>
        </CardContent>
      </Card>

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
              <strong>Personal Data:</strong> Personally identifiable
              information, such as your name, email address, that you
              voluntarily give to us when you register with the Application.
            </li>
            <li>
              <strong>Derivative Data:</strong> Information our servers
              automatically collect when you access the Application, such as
              your IP address, your browser type, your operating system, your
              access times, and the pages you have viewed directly before and
              after accessing the Application.
            </li>
            <li>
              <strong>Generated Content:</strong> We collect the inputs you
              provide to our AI models (e.g., desired skills, knowledge level)
              and the roadmaps generated for you to provide and improve the
              service.
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Use of Your Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p>
            Having accurate information about you permits us to provide you with
            a smooth, efficient, and customized experience. Specifically, we may
            use information collected about you via the Application to:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Create and manage your account.</li>
            <li>Generate personalized learning roadmaps.</li>
            <li>
              Monitor and analyze usage and trends to improve your experience
              with the Application.
            </li>
            <li>Notify you of updates to the Application.</li>
            <li>Provide and improve our AI models.</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contact Us</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground">
          <p>
            If you have questions or comments about this Privacy Policy, please
            contact us at: privacy@pathwise.ai
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
