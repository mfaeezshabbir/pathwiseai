import React from "react";
import Link from "next/link";

export function AppFooter() {
  return (
    <footer className="w-full px-4 md:px-12 py-8 border-t border-gray-200 dark:border-gray-800 bg-white/90 dark:bg-[#18181b]/90 text-center text-sm text-muted-foreground flex flex-col md:flex-row items-center justify-between gap-2">
      <span>
        &copy; {new Date().getFullYear()} PathwiseAI. All rights reserved.
      </span>
      <div className="flex gap-4 justify-center md:justify-end">
        <Link href="/privacy" className="hover:underline">
          Privacy Policy
        </Link>
        <Link href="/terms" className="hover:underline">
          Terms of Service
        </Link>
      </div>
    </footer>
  );
}
