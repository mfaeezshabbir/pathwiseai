import React from "react";
import Link from "next/link";
import { Github, Linkedin, Twitter } from "lucide-react";
import { AppLogo } from "./AppLogo";

export function AppFooter() {
  return (
    <footer className="z-0 w-full border-t border-gray-200 bg-white px-4 py-10 text-sm text-muted-foreground dark:border-gray-800 dark:bg-[#020617] md:px-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex items-center gap-2">
          <AppLogo size={28} className="h-8 w-8" />
          <span className="font-semibold text-gray-900 dark:text-white">
            PathwiseAI
          </span>
        </div>
        <nav className="flex flex-wrap justify-center gap-6 md:justify-end">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <Link href="/about" className="hover:underline">
            About
          </Link>
          <Link href="/contact" className="hover:underline">
            Contact
          </Link>
          <Link href="/privacy" className="hover:underline">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:underline">
            Terms of Service
          </Link>
        </nav>
      </div>
      <div className="mx-auto mt-6 flex max-w-7xl flex-col items-center justify-between gap-2 border-t border-gray-100 pt-4 dark:border-gray-700 md:flex-row">
        <span>
          &copy; {new Date().getFullYear()} PathwiseAI. All rights reserved.
        </span>
        <div className="flex gap-4">
          <a
            href="https://linkedin.com/in/mfaeezshabbir/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover:text-blue-500"
          >
            <Linkedin />
          </a>
          <a
            href="https://github.com/mfaeezshabbir/pathwiseai"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hover:text-gray-900 dark:hover:text-white"
          >
            <Github />
          </a>
        </div>
      </div>
    </footer>
  );
}
