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
        // Modern glass-morphism card design
        "relative flex flex-col overflow-hidden rounded-2xl border border-white/20 bg-white/80 shadow-lg backdrop-blur-xl dark:border-gray-700/50 dark:bg-gray-900/80",
        // Subtle inner glow effect
        "before:pointer-events-none before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-white/20 before:to-transparent",
        hoverable &&
          "transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/10 dark:hover:shadow-indigo-400/10",
        clickable &&
          "cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:ring-offset-2",
        compact ? "p-2" : "p-0",
        className,
      )}
      tabIndex={clickable ? 0 : undefined}
      {...props}
    >
      {/* Subtle background decoration */}
      <div className="pointer-events-none absolute -right-4 -top-4 h-24 w-24 rounded-full bg-gradient-to-br from-indigo-400/10 to-purple-500/10 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-4 -left-4 h-32 w-32 rounded-full bg-gradient-to-tr from-pink-400/10 to-blue-500/10 blur-2xl" />

      {/* Content wrapper */}
      <div className="relative z-10 flex h-full w-full flex-col">
        {props.children}
      </div>
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
        noPadding ? "p-0" : "px-6 pb-4 pt-6",
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
      "text-xl font-semibold leading-tight tracking-tight text-gray-900 dark:text-white",
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
    className={cn("text-sm leading-relaxed text-muted-foreground", className)}
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
      className={cn("flex-1", noPadding ? "p-0" : "px-6 pb-6", className)}
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
        "flex items-center border-t border-gray-100 bg-gray-50/50 dark:border-gray-700/50 dark:bg-gray-800/50",
        noPadding ? "p-0" : "px-6 py-4",
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
