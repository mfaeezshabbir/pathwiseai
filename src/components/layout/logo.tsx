import Link from "next/link";
import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden="true"
      className={cn("size-7 shrink-0", className)}
    >
      <rect width="32" height="32" rx="9" className="fill-primary" />
      <path
        d="M9 22.5c0-3.5 2.6-5 5.5-5h3c2.9 0 5.5-1.5 5.5-5"
        fill="none"
        strokeWidth="2.4"
        strokeLinecap="round"
        className="stroke-primary-foreground/55"
      />
      <circle cx="9" cy="22.5" r="2.6" className="fill-primary-foreground" />
      <circle cx="23" cy="9.5" r="2.6" className="fill-primary-foreground" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        "flex items-center gap-2 rounded-md font-semibold tracking-tight focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none",
        className,
      )}
    >
      <LogoMark />
      <span className="text-[15px]">
        Pathwise<span className="text-primary">AI</span>
      </span>
    </Link>
  );
}
