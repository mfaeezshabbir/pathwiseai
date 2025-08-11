import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function UseSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>2. Use of the Service</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-muted-foreground">
        <p>
          You may use the Service only for lawful purposes and in accordance
          with these Terms. You agree not to use the Service:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            In any way that violates any applicable federal, state, local, or
            international law or regulation.
          </li>
          <li>
            To transmit, or procure the sending of, any advertising or
            promotional material, including any "junk mail," "chain letter,"
            "spam," or any other similar solicitation.
          </li>
          <li>
            To impersonate or attempt to impersonate the Company, a Company
            employee, another user, or any other person or entity.
          </li>
        </ul>
      </CardContent>
    </Card>
  );
}
