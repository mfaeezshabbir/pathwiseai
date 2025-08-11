import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { AppNavbar } from "@/components/common/AppNavbar";
import { AppFooter } from "@/components/common/AppFooter";

import "./globals.css";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PathwiseAI",
  description:
    "PathwiseAI - Personalized AI-powered learning roadmaps and tutoring.",
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
      <body className="font-body antialiased min-h-screen bg-gradient-to-tr from-[#e0e7ff] via-white to-[#f0fdfa] dark:from-[#18181b] dark:via-[#23272f] dark:to-[#18181b] text-gray-900 dark:text-gray-100 flex flex-col max-w-[90%] mx-auto">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* Navbar */}
          <AppNavbar />

          {/* Main Content */}
          <main className="flex-1 w-full max-w-full mx-auto px-4 md:px-12 py-10">
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
