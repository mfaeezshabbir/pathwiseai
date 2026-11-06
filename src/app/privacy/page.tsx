import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="November 2026"
      sections={[
        {
          id: "introduction",
          title: "Introduction",
          body: (
            <>
              <p>
                Welcome to PathwiseAI (&ldquo;we&rdquo;, &ldquo;us&rdquo;,
                &ldquo;our&rdquo;). We are committed to protecting your privacy.
                This policy explains how we collect, use, disclose, and
                safeguard your information when you use our application.
              </p>
              <p>
                If you do not agree with the terms of this policy, please do not
                access the application.
              </p>
            </>
          ),
        },
        {
          id: "collection",
          title: "Information we collect",
          body: (
            <ul>
              <li>
                <strong>Personal data:</strong> information such as your name
                and email address that you voluntarily give us when you
                register.
              </li>
              <li>
                <strong>Learning data:</strong> roadmaps you generate, your
                preferences, and progress you record.
              </li>
              <li>
                <strong>Derivative data:</strong> information our servers
                automatically collect, such as IP address, browser type,
                operating system and usage data.
              </li>
            </ul>
          ),
        },
        {
          id: "use",
          title: "How we use your information",
          body: (
            <>
              <p>
                We use the information we collect to operate, maintain and
                improve our services, to communicate with you, and to comply
                with legal obligations. Specifically, we may use it to:
              </p>
              <ul>
                <li>Create and manage your account.</li>
                <li>Generate personalized learning roadmaps.</li>
                <li>Monitor usage and trends to improve your experience.</li>
                <li>Notify you of updates to the application.</li>
                <li>Provide and improve our AI features.</li>
              </ul>
            </>
          ),
        },
        {
          id: "contact",
          title: "Contact us",
          body: (
            <p>
              Questions or concerns about this policy? Email{" "}
              <a
                href="mailto:support@pathwiseai.com"
                className="font-medium text-foreground underline underline-offset-4"
              >
                support@pathwiseai.com
              </a>
              .
            </p>
          ),
        },
      ]}
    />
  );
}
