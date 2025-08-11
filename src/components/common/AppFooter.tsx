import React from "react";
import Link from "next/link";
import { Github, Linkedin, Twitter } from "lucide-react";
import { AppLogo } from "./AppLogo";

export function AppFooter() {
  return (
    <footer className="w-full z-50 px-4 md:px-12 py-10 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-[#020617] text-sm text-muted-foreground">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <AppLogo size={28} className="h-8 w-8" />
          <span className="font-semibold text-gray-900 dark:text-white">
            PathwiseAI
          </span>
        </div>
        <nav className="flex flex-wrap gap-6 justify-center md:justify-end">
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
      <div className="max-w-7xl mx-auto mt-6 flex flex-col md:flex-row items-center justify-between gap-2 border-t border-gray-100 dark:border-gray-700 pt-4">
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
