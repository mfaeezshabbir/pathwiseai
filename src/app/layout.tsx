import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { AppNavbar } from "@/components/common/AppNavbar";
import { AppFooter } from "@/components/common/AppFooter";

import "./globals.css";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PathwiseAI",
  description: "PathwiseAI - Personalized AI-powered learning roadmaps and tutoring.",
  icons: {
    icon: "/assets/pathwiseai_logo.png",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-body antialiased min-h-screen bg-gradient-to-tr from-[#e0e7ff] via-white to-[#f0fdfa] dark:from-[#18181b] dark:via-[#23272f] dark:to-[#18181b] text-gray-900 dark:text-gray-100 flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* Navbar */}
          <AppNavbar />

          {/* Hero Section */}
          <section className="w-full px-4 md:px-12 py-10 bg-gradient-to-r from-indigo-100 via-white to-cyan-100 dark:from-[#23272f] dark:via-[#18181b] dark:to-[#23272f] border-b border-gray-200 dark:border-gray-800 shadow-sm">
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight text-indigo-700 dark:text-indigo-300">
                  Personalized AI Learning Roadmaps
                </h1>
                <p className="text-lg md:text-xl text-gray-700 dark:text-gray-200 mb-6">
                  Unlock your potential with tailored learning paths, smart
                  tutoring, and actionable resources powered by AI.
                </p>
                <a
                  href="/profile"
                  className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg shadow transition-colors"
                >
                  Get Started
                </a>
              </div>
              <img
                src="/assets/pathwiseai_logo.png"
                alt="PathwiseAI"
                className="h-32 w-32 md:h-48 md:w-48 rounded-xl shadow-lg border-4 border-indigo-200 dark:border-indigo-900 bg-white dark:bg-[#23272f]"
              />
            </div>
          </section>

          {/* Main Content */}
          <main className="flex-1 w-full max-w-5xl mx-auto px-4 md:px-12 py-10">
            {children}
          </main>

          {/* Footer */}
          <AppFooter />

          {/* Toaster for notifications */}
          <div className="fixed z-[9999] top-4 right-4">
            <Toaster />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
