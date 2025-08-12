import * as React from "react";

import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
  clickable?: boolean;
  compact?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      hoverable = true,
      clickable = false,
      compact = false,
      ...props
    },
    ref,
  ) => (
    <div
      ref={ref}
      className={cn(
        // Gradient card style inspired by MissionSection
        "relative flex flex-col items-center overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-100/60 via-white/80 to-fuchsia-100/60 shadow-xl dark:from-gray-900/60 dark:via-gray-950/80 dark:to-indigo-900/60",
        hoverable &&
          "duration-300 hover:-translate-y-0.5 hover:scale-[1.001] hover:shadow-2xl",
        clickable && "cursor-pointer",
        compact ? "p-2" : "p-4",
        className,
      )}
      tabIndex={clickable ? 0 : undefined}
      {...props}
    >
      <div className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-indigo-200/30 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-fuchsia-200/30 blur-2xl" />
      <div className="relative z-10 w-full">{props.children}</div>
    </div>
  ),
);
Card.displayName = "Card";

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  noPadding?: boolean;
  align?: "left" | "center" | "right";
}
const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, noPadding = false, align = "left", ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex flex-col space-y-1.5",
        noPadding ? "p-0" : "p-6",
        align === "center" && "items-center text-center",
        align === "right" && "items-end text-right",
        className,
      )}
      {...props}
    />
  ),
);
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "mb-2 bg-gradient-to-r from-indigo-600 to-fuchsia-500 bg-clip-text text-3xl font-bold text-transparent",
      className,
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-base text-muted-foreground/90", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  noPadding?: boolean;
}
const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, noPadding = false, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(noPadding ? "p-0" : "p-6 pt-0", className)}
      {...props}
    />
  ),
);
CardContent.displayName = "CardContent";

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  noPadding?: boolean;
  align?: "left" | "center" | "right";
}
const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, noPadding = false, align = "left", ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex items-center",
        noPadding ? "p-0" : "p-6 pt-0",
        align === "center" && "justify-center text-center",
        align === "right" && "justify-end text-right",
        className,
      )}
      {...props}
    />
  ),
);
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
