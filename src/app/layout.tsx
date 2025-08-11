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
      <body className="font-body antialiased min-h-screen bg-black text-gray-900 dark:text-gray-100 flex flex-col relative">
        {/* Light Sphere Grid Background */}
        <div
          className="absolute inset-0 z-0 dark:hidden"
          style={{
            background: "white",
            backgroundImage: `
              linear-gradient(to right, rgba(71,85,105,0.3) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(71,85,105,0.3) 1px, transparent 1px),
              radial-gradient(circle at 50% 50%, rgba(139,92,246,0.25) 0%, rgba(139,92,246,0.1) 40%, transparent 80%)
            `,
            backgroundSize: "32px 32px, 32px 32px, 100% 100%",
          }}
        />
        div
        {/* Dark Sphere Grid Background */}
        <div
          className="absolute inset-0 z-0 hidden dark:block"
          style={{
            background: "#020617",
            backgroundImage: `
              linear-gradient(to right, rgba(71,85,105,0.3) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(71,85,105,0.3) 1px, transparent 1px),
              radial-gradient(circle at 50% 50%, rgba(139,92,246,0.15) 0%, transparent 70%)
            `,
            backgroundSize: "32px 32px, 32px 32px, 100% 100%",
          }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* Navbar */}
          <AppNavbar />
          {/* Main Content */}
          <main className="flex-1 w-full max-w-[90rem] mx-auto px-4 md:px-12 py-10 relative z-10">
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
