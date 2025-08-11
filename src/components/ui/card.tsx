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
        // Glassmorphic card style
        "rounded-2xl border border-white/30 dark:border-indigo-900/40 bg-white/40 dark:bg-[#23272f]/40 backdrop-blur-lg shadow-xl transition-all duration-300",
        hoverable &&
          "hover:shadow-2xl hover:scale-[1.001] hover:-translate-y-0.5",
        clickable && "cursor-pointer",
        compact ? "p-2" : "p-6",
        className,
      )}
      tabIndex={clickable ? 0 : undefined}
      {...props}
    />
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
      "text-2xl font-bold leading-tight tracking-tight text-indigo-700 dark:text-indigo-200 drop-shadow-sm",
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
