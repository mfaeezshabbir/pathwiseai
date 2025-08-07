import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { AppSidebar } from "@/components/common/AppSidebar";

import "./globals.css";
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          rel="shortcut icon"
          href="/assets/pathwiseai_logo.png"
          type="image/png"
        />
        <title>PathwiseAI</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="PathwiseAI - Personalized AI-powered learning roadmaps and tutoring."
        />
      </head>
      <body className="font-body antialiased min-h-screen bg-gradient-to-tr from-[#e0e7ff] via-white to-[#f0fdfa] dark:from-[#18181b] dark:via-[#23272f] dark:to-[#18181b] text-gray-900 dark:text-gray-100 flex">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* Sidebar Navigation */}
          <AppSidebar />

          {/* Main Layout */}
          <div className="flex flex-col flex-1 min-h-screen w-full md:ml-64">
            {/* Header (mobile) */}
            <header className="md:hidden w-full px-4 py-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-800 bg-white/90 dark:bg-[#18181b]/90 backdrop-blur z-20 shadow-sm">
              <div className="flex items-center gap-3">
                <img
                  src="/assets/pathwiseai_logo.png"
                  alt="PathwiseAI Logo"
                  className="h-8 w-8 rounded"
                />
                <span className="text-xl font-extrabold tracking-tight">
                  PathwiseAI
                </span>
              </div>
              <ThemeToggle />
            </header>

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
            <footer className="w-full px-4 md:px-12 py-8 border-t border-gray-200 dark:border-gray-800 bg-white/90 dark:bg-[#18181b]/90 text-center text-sm text-muted-foreground flex flex-col md:flex-row items-center justify-between gap-2">
              <span>
                &copy; {new Date().getFullYear()} PathwiseAI. All rights
                reserved.
              </span>
              <div className="flex gap-4 justify-center md:justify-end">
                <a href="/privacy" className="hover:underline">
                  Privacy Policy
                </a>
                <a href="/terms" className="hover:underline">
                  Terms of Service
                </a>
              </div>
            </footer>
          </div>

          {/* Toaster for notifications */}
          <div className="fixed z-[9999] top-4 right-4">
            <Toaster />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
