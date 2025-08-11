import { AgreementSection } from "@/components/terms/AgreementSection";
import { UseSection } from "@/components/terms/UseSection";
import { IPSection } from "@/components/terms/IPSection";
import { DisclaimerSection } from "@/components/terms/DisclaimerSection";
import { ChangesSection } from "@/components/terms/ChangesSection";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function TermsOfServicePage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Terms of Service</h1>
        <p className="text-muted-foreground">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </header>

      <AgreementSection />
      <UseSection />
      <IPSection />
      <DisclaimerSection />
      <ChangesSection />
    </div>
  );
}
