import { IntroductionSection } from "@/components/privacy/IntroductionSection";
import { CollectionSection } from "@/components/privacy/CollectionSection";
import { UseSection } from "@/components/privacy/UseSection";
import { ContactSection } from "@/components/privacy/ContactSection";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function PrivacyPolicyPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Privacy Policy</h1>
        <p className="text-muted-foreground">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </header>
      <IntroductionSection />
      <CollectionSection />
      <UseSection />
      <ContactSection />
    </div>
  );
}
