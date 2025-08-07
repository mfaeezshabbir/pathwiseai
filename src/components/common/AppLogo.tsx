import Image from "next/image";
import React from "react";

export function AppLogo({
  size = 40,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <Image
      src="/assets/pathwiseai_logo.png"
      alt="PathwiseAI Logo"
      width={size}
      height={size}
      className={`rounded invert dark:invert-0 shadow ${className}`}
      priority
    />
  );
}
