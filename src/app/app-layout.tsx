'use client';
import type { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, Bot, LayoutDashboard, Menu, User, FileText, ShieldCheck, FileBadge } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { AITutor } from '@/components/ai/ai-tutor';
import { ThemeToggle } from '@/components/theme-toggle';

const navItems = [
    { href: '/', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/profile', label: 'Profile', icon: User },
];

const footerNavItems = [
    { href: '/about', label: 'About', icon: FileBadge },
    { href: '/privacy', label: 'Privacy', icon: ShieldCheck },
    { href: '/terms', label: 'Terms', icon: FileText },
];

function NavContent() {
    const pathname = usePathname();
    return (
        <nav className="grid items-start px-4 text-sm font-medium">
            {navItems.map((item) => (
                <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                        pathname === item.href ? 'bg-muted text-primary' : 'text-muted-foreground'
                    }`}
                >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                </Link>
            ))}
        </nav>
    );
}

function FooterNavContent() {
    const pathname = usePathname();
    return (
        <nav className="grid items-start px-4 text-sm font-medium">
            {footerNavItems.map((item) => (
                <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                        pathname === item.href ? 'bg-muted text-primary' : 'text-muted-foreground'
                    }`}
                >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                </Link>
            ))}
        </nav>
    );
}


function AITutorWrapper() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button className="w-full justify-start mt-4" variant="secondary">
                    <Bot className="mr-2 h-4 w-4" />
                    AI Assistant
                </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:max-w-xl p-0">
                <AITutor />
            </SheetContent>
        </Sheet>
    );
}

export function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-card lg:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-[60px] items-center border-b px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <BookOpen className="h-6 w-6 text-primary" />
              <span className="">PathWise AI</span>
            </Link>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <NavContent />
          </div>
          <div className="mt-auto p-4 space-y-4">
              <FooterNavContent />
              <AITutorWrapper />
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-card px-6">
           <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="shrink-0 lg:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0">
              <div className="flex h-full max-h-screen flex-col gap-2">
                <div className="flex h-[60px] items-center border-b px-6">
                  <Link href="/" className="flex items-center gap-2 font-semibold">
                    <BookOpen className="h-6 w-6 text-primary" />
                    <span className="">PathWise AI</span>
                  </Link>
                </div>
                <div className="flex-1 overflow-auto py-2">
                  <NavContent />
                </div>
                 <div className="mt-auto p-4 space-y-4">
                    <FooterNavContent />
                    <AITutorWrapper />
                </div>
              </div>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            {/* Can add search bar here if needed */}
          </div>
          <ThemeToggle />
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          {children}
          <footer className="mt-auto pt-8">
            <div className="flex justify-center items-center gap-4 text-sm text-muted-foreground">
                <Link href="/about" className="hover:text-primary">About</Link>
                <Link href="/privacy" className="hover:text-primary">Privacy Policy</Link>
                <Link href="/terms" className="hover:text-primary">Terms of Service</Link>
            </div>
            <p className="text-center text-xs text-muted-foreground mt-2">&copy; {new Date().getFullYear()} PathWise AI. All Rights Reserved.</p>
          </footer>
        </main>
      </div>
    </div>
  );
}
