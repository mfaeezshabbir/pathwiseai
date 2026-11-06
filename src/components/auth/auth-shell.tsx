import { Check } from "lucide-react";
import { LogoMark } from "@/components/layout/logo";

const points = [
  "Roadmaps tailored to your level and schedule",
  "Curated docs, videos and hands-on projects",
  "Progress tracking and an AI tutor on call",
];

export function AuthShell({
  title,
  description,
  children,
  footer,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
  footer: React.ReactNode;
}) {
  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-4 py-10 sm:px-6 sm:py-16 lg:grid-cols-2 lg:gap-16">
      <aside className="relative isolate hidden overflow-hidden rounded-3xl bg-primary p-10 text-primary-foreground lg:flex lg:flex-col">
        <div className="bg-grid absolute inset-0 -z-10 opacity-50 [--grid-line:oklch(1_0_0/0.1)]" />
        <LogoMark className="size-10 [&_rect]:fill-primary-foreground/15" />
        <h2 className="mt-auto text-3xl font-semibold tracking-tight text-balance">
          Your next skill,{" "}
          <span className="font-display font-normal italic">mapped out.</span>
        </h2>
        <ul className="mt-6 space-y-3">
          {points.map((p) => (
            <li key={p} className="flex items-center gap-3 text-sm opacity-90">
              <span className="flex size-5 items-center justify-center rounded-full bg-primary-foreground/15">
                <Check className="size-3" />
              </span>
              {p}
            </li>
          ))}
        </ul>
      </aside>

      <div className="mx-auto flex w-full max-w-sm flex-col justify-center">
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        <p className="mt-1.5 text-sm text-muted-foreground">{description}</p>
        <div className="mt-8">{children}</div>
        <p className="mt-8 text-center text-sm text-muted-foreground">{footer}</p>
      </div>
    </div>
  );
}

export function FormError({ message }: { message: string }) {
  if (!message) return null;
  return (
    <p
      role="alert"
      className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive"
    >
      {message}
    </p>
  );
}
