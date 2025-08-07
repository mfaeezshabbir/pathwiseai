"use client";
import React, { useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { AppLogo } from "@/components/common/AppLogo";
import {
  BookOpenIcon,
  HomeIcon,
  InfoIcon,
  MenuIcon,
  SidebarCloseIcon,
  User,
} from "lucide-react";
import { Button } from "../ui/button";

// Remove Profile from navLinks
const navLinks = [
  { name: "Home", href: "/", icon: HomeIcon },
  { name: "About", href: "/about", icon: InfoIcon },
  { name: "Roadmaps", href: "/roadmaps", icon: BookOpenIcon },
];

// Profile avatar component
function ProfileAvatar() {
  // Replace with user image if available
  return (
    <Link href="/profile">
      <Button variant="outline" size="icon">
        <User />
      </Button>
    </Link>
  );
}

export function AppNavbar() {
  const pathname = usePathname?.() || "";
  const [open, setOpen] = useState(false);

  const NavLinks = (
    <nav className="flex flex-col md:flex-row gap-2 md:gap-4">
      {navLinks.map((link) => {
        const Icon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={`flex items-center gap-2 rounded-lg px-3 py-2 text-base font-medium transition-colors text-gray-700 dark:text-gray-200 hover:bg-indigo-100 dark:hover:bg-[#23272f] ${
              pathname === link.href
                ? "bg-indigo-100 dark:bg-[#23272f] font-bold"
                : ""
            }`}
            onClick={() => setOpen(false)}
          >
            <Icon className="h-5 w-5" />
            {link.name}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* Desktop Navbar */}
      <header className="hidden md:flex items-center justify-between w-full h-16 bg-white/90 dark:bg-[#18181b]/90 border-b border-gray-200 dark:border-gray-800 shadow-lg z-30 fixed top-0 left-0 px-8">
        <div className="flex items-center gap-3">
          <AppLogo size={40} className="h-10 w-10" />
          <span className="text-2xl font-extrabold tracking-tight">
            PathwiseAI
          </span>
        </div>
        {NavLinks}
        <div className="flex items-center gap-4">
          <span className="text-xs text-muted-foreground">
            AI-powered learning
          </span>
          <ThemeToggle />
          <ProfileAvatar />
        </div>
      </header>
      {/* Mobile Navbar */}
      <div className="md:hidden">
        <header className="flex items-center justify-between w-full h-16 bg-white/90 dark:bg-[#18181b]/90 border-b border-gray-200 dark:border-gray-800 shadow-lg z-30 fixed top-0 left-0 px-4">
          <div className="flex items-center gap-3">
            <AppLogo size={36} className="h-9 w-9" />
            <span className="text-xl font-extrabold tracking-tight">
              PathwiseAI
            </span>
          </div>
          <div className="flex items-center gap-2">
            <ProfileAvatar />
            <Button
              className="bg-white dark:bg-[#18181b] rounded-full p-2 shadow-md border border-gray-200 dark:border-gray-800"
              onClick={() => setOpen(true)}
              aria-label="Open navigation"
            >
              <MenuIcon className="h-6 w-6 text-gray-700 dark:text-gray-200" />
            </Button>
          </div>
        </header>
        {open && (
          <div className="fixed inset-0 z-50 flex flex-col">
            <div className="flex flex-col w-full bg-white/95 dark:bg-[#18181b]/95 border-b border-gray-200 dark:border-gray-800 shadow-lg animate-slide-down relative">
              <button
                className="absolute top-4 right-4 z-50 bg-white dark:bg-[#18181b] rounded-full p-1 border border-gray-200 dark:border-gray-800"
                onClick={() => setOpen(false)}
                aria-label="Close navigation"
              >
                <SidebarCloseIcon className="h-6 w-6 text-gray-700 dark:text-gray-200" />
              </button>
              <div className="flex flex-col gap-4 px-6 py-6 mt-8">
                {NavLinks}
                <div className="flex items-center justify-between mt-4">
                  <span className="text-xs text-muted-foreground">
                    AI-powered learning
                  </span>
                  <ThemeToggle />
                </div>
              </div>
            </div>
            <div
              className="flex-1 bg-black/30 dark:bg-black/60"
              onClick={() => setOpen(false)}
            />
          </div>
        )}
      </div>
      <style jsx global>{`
        @keyframes slide-down {
          from {
            transform: translateY(-100%);
          }
          to {
            transform: translateY(0);
          }
        }
        .animate-slide-down {
          animation: slide-down 0.2s ease;
        }
      `}</style>
      {/* Spacer for fixed navbar */}
      <div className="h-16" />
    </>
  );
}
