"use client";
import React, { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
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

interface NavLink {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  featured?: boolean;
}

// Remove Profile from navLinks
const navLinks: NavLink[] = [
  { name: "Home", href: "/", icon: HomeIcon },
  { name: "Roadmaps", href: "/roadmaps", icon: BookOpenIcon, featured: true },
  { name: "About", href: "/about", icon: InfoIcon },
];

// Profile dropdown menu component
function ProfileDropdown() {
  const { data: session } = useSession();
  const userName = session?.user?.name || "Profile";
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <User />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuItem asChild>
          <Link href="/profile">Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => signOut({ callbackUrl: "/auth/signin" })}
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function AppNavbar() {
  const pathname = usePathname?.() || "";
  const [open, setOpen] = useState(false);

  const NavLinks = (
    <nav className="flex flex-col gap-2 md:flex-row md:gap-4">
      {navLinks.map((link) => {
        const Icon = link.icon;
        const isActive = pathname === link.href;
        const isFeatured = link.featured;

        return (
          <Link
            key={link.name}
            href={link.href}
            className={`relative flex items-center gap-2 rounded-lg px-3 py-2 text-base font-medium transition-all duration-300 ${
              isActive
                ? isFeatured
                  ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg"
                  : "bg-indigo-100 font-bold text-gray-900 dark:bg-[#23272f] dark:text-gray-100"
                : isFeatured
                  ? "border border-indigo-200 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 hover:from-indigo-200 hover:to-purple-200 dark:border-indigo-700 dark:from-indigo-900/30 dark:to-purple-900/30 dark:text-indigo-300 dark:hover:from-indigo-900/50 dark:hover:to-purple-900/50"
                  : "text-gray-700 hover:bg-indigo-100 dark:text-gray-200 dark:hover:bg-[#23272f]"
            }`}
            onClick={() => setOpen(false)}
          >
            <Icon
              className={`h-5 w-5 ${isFeatured && !isActive ? "text-indigo-600 dark:text-indigo-400" : ""}`}
            />
            {link.name}
            {isFeatured && (
              <span className="rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 px-1.5 py-0.5 text-xs font-bold text-white">
                NEW
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* Desktop Navbar */}
      <header className="fixed left-0 top-0 z-30 hidden h-16 w-full items-center justify-between border-b border-gray-200 bg-white px-8 shadow-lg dark:border-gray-800 dark:bg-[#020617] md:flex">
        <Link href="/" className="flex items-center gap-2">
          <AppLogo size={40} className="h-10 w-10" />
          <span className="text-2xl font-extrabold tracking-tight">
            PathwiseAI
          </span>
        </Link>
        {NavLinks}
        <div className="flex items-center gap-4">
          <span className="text-xs text-muted-foreground">
            AI-powered learning
          </span>
          <ThemeToggle />
          <ProfileDropdown />
        </div>
      </header>
      {/* Mobile Navbar */}
      <div className="md:hidden">
        <header className="fixed left-0 top-0 z-30 flex h-16 w-full items-center justify-between border-b border-gray-200 bg-white px-4 shadow-lg dark:border-gray-800 dark:bg-[#020617]">
          <Link href="/" className="flex items-center gap-3">
            <AppLogo size={36} className="h-9 w-9" />
            <span className="text-xl font-extrabold tracking-tight">
              PathwiseAI
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <ProfileDropdown />
            <Button
              className="rounded-full border border-gray-200 bg-white p-2 shadow-md dark:border-gray-800 dark:bg-[#020617]"
              onClick={() => setOpen(true)}
              aria-label="Open navigation"
            >
              <MenuIcon className="h-6 w-6 text-gray-700 dark:text-gray-200" />
            </Button>
          </div>
        </header>
        {open && (
          <div className="fixed inset-0 z-50 flex flex-col">
            <div className="animate-slide-down relative flex w-full flex-col border-b border-gray-200 bg-white/95 shadow-lg dark:border-gray-800 dark:bg-[#020617]/95">
              <button
                className="absolute right-4 top-4 z-50 rounded-full border border-gray-200 bg-white p-1 dark:border-gray-800 dark:bg-[#020617]"
                onClick={() => setOpen(false)}
                aria-label="Close navigation"
              >
                <SidebarCloseIcon className="h-6 w-6 text-gray-700 dark:text-gray-200" />
              </button>
              <div className="mt-8 flex flex-col gap-4 px-6 py-6">
                {NavLinks}
                <div className="mt-4 flex items-center justify-between">
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
