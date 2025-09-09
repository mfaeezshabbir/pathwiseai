import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { AppNavbar } from "@/components/common/AppNavbar";
import { AppFooter } from "@/components/common/AppFooter";
import { Providers } from "./providers";

import "./globals.css";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PathwiseAI",
  description:
    "PathwiseAI - Personalized AI-powered learning roadmaps and tutoring.",
  icons: {
    icon: "/assets/pathwiseai_logo.png",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="relative flex min-h-screen flex-col bg-black font-body text-gray-900 antialiased dark:text-gray-100">
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
          <Providers>
            {/* Navbar */}
            <AppNavbar />
            {/* Main Content */}
            <main className="relative z-10 mx-auto w-full max-w-[90rem] flex-1 px-4 py-10 md:px-12">
              {children}
            </main>
            {/* Footer */}
            <AppFooter />
          </Providers>
          {/* Toaster for notifications */}
          <div className="fixed right-4 top-4 z-[9999]">
            <Toaster />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
