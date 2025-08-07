"use client";
import React from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { AppLogo } from "@/components/common/AppLogo";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Profile", href: "/profile" },
  { name: "Roadmaps", href: "/" },
  { name: "Privacy", href: "/privacy" },
  { name: "Terms", href: "/terms" },
];

export function AppSidebar() {
  const pathname = usePathname?.() || "";
  return (
    <aside className="hidden md:flex flex-col w-64 h-screen bg-white/90 dark:bg-[#18181b]/90 border-r border-gray-200 dark:border-gray-800 shadow-lg z-30 fixed">
      <div className="flex items-center gap-3 px-8 py-6 border-b border-gray-200 dark:border-gray-800">
        <AppLogo size={40} className="h-10 w-10" />
        <span className="text-2xl font-extrabold tracking-tight">PathwiseAI</span>
      </div>
      <nav className="flex-1 flex flex-col gap-2 px-6 py-6">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className={`rounded-lg px-4 py-2 text-base font-medium transition-colors text-gray-700 dark:text-gray-200 hover:bg-indigo-100 dark:hover:bg-[#23272f] ${
              pathname === link.href
                ? "bg-indigo-100 dark:bg-[#23272f] font-bold"
                : ""
            }`}
          >
            {link.name}
          </Link>
        ))}
      </nav>
      <div className="px-6 pb-6 mt-auto flex items-center justify-between">
        <span className="text-xs text-muted-foreground">
          AI-powered learning
        </span>
        <ThemeToggle />
      </div>
    </aside>
  );
}
