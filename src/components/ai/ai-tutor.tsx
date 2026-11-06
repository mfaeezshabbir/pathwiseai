"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { ArrowUp, Map as MapIcon, RotateCcw, Sparkles, X } from "lucide-react";
import { toast } from "sonner";

import { askTutor } from "@/app/actions/tutor";
import { cn } from "@/lib/utils";
import { roadmapHref } from "@/lib/roadmap";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from "@/components/ui/sheet";
import { LogoMark } from "@/components/layout/logo";

interface Message {
  role: "user" | "assistant";
  content: string;
  suggestions?: string[];
}

const starters = [
  "What should I learn to become a frontend developer?",
  "Explain React Server Components simply",
  "How do I get started with machine learning?",
  "What's the difference between SQL and NoSQL?",
];

function ThinkingDots() {
  return (
    <div className="flex items-center gap-1 px-1 py-2" aria-label="Thinking">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="bg-muted-foreground/60 size-1.5 animate-bounce rounded-full"
          style={{ animationDelay: `${i * 120}ms` }}
        />
      ))}
    </div>
  );
}

export function AITutor() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isLoading]);

  // Auto-grow the composer up to a sensible height
  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
  }, [input]);

  const send = async (text: string) => {
    const question = text.trim();
    if (!question || isLoading) return;

    const history: Message[] = [
      ...messages,
      { role: "user", content: question },
    ];
    setMessages(history);
    setInput("");
    setIsLoading(true);

    try {
      const reply = await askTutor(
        history.map(({ role, content }) => ({ role, content })),
      );
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: reply.answer,
          suggestions: reply.suggestions,
        },
      ]);
    } catch (error) {
      console.error("AI Tutor Error:", error);
      toast.error("The assistant couldn't answer", {
        description: "Please try again in a moment.",
      });
      setMessages((prev) => prev.slice(0, -1));
      setInput(question);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-3 border-b px-4 py-3">
        <LogoMark className="size-8" />
        <div className="min-w-0 flex-1">
          <SheetTitle className="text-sm">Pathwise Assistant</SheetTitle>
          <SheetDescription className="text-xs">
            Ask about concepts, code, or what to learn next
          </SheetDescription>
        </div>
        {messages.length > 0 && (
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setMessages([])}
            aria-label="Start a new conversation"
          >
            <RotateCcw />
          </Button>
        )}
        <SheetClose asChild>
          <Button variant="ghost" size="icon-sm" aria-label="Close assistant">
            <X />
          </Button>
        </SheetClose>
      </div>

      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-5"
        aria-live="polite"
      >
        {messages.length === 0 ? (
          <div className="flex h-full flex-col justify-end gap-6">
            <div className="space-y-2">
              <span className="bg-accent text-accent-foreground inline-flex size-10 items-center justify-center rounded-xl">
                <Sparkles className="size-5" />
              </span>
              <h3 className="text-lg font-semibold tracking-tight">
                How can I help you learn today?
              </h3>
              <p className="text-muted-foreground text-sm">
                I can explain topics, review code, and suggest roadmaps you can
                generate in one click.
              </p>
            </div>
            <div className="grid gap-2">
              {starters.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="bg-card hover:border-primary/40 hover:bg-accent/50 rounded-lg border px-3 py-2.5 text-left text-sm transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-5">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "animate-fade-up flex",
                  message.role === "user" ? "justify-end" : "justify-start",
                )}
              >
                <div
                  className={cn(
                    "max-w-[88%] space-y-2 text-sm leading-relaxed",
                    message.role === "user" &&
                      "bg-primary text-primary-foreground rounded-2xl rounded-br-md px-3.5 py-2.5",
                  )}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                  {message.suggestions?.map((suggestion) => (
                    <Link
                      key={suggestion}
                      href={roadmapHref(suggestion)}
                      className="group bg-card hover:border-primary/40 flex items-center gap-3 rounded-xl border px-3 py-2.5 transition-colors"
                    >
                      <span className="bg-accent text-accent-foreground flex size-8 items-center justify-center rounded-lg">
                        <MapIcon className="size-4" />
                      </span>
                      <span className="flex-1">
                        <span className="text-muted-foreground block text-xs">
                          Suggested roadmap
                        </span>
                        <span className="font-medium">{suggestion}</span>
                      </span>
                      <span className="text-primary text-xs font-medium opacity-0 transition-opacity group-hover:opacity-100">
                        Generate →
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
            {isLoading && <ThinkingDots />}
          </div>
        )}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="border-t p-3"
      >
        <div className="bg-background focus-within:border-ring focus-within:ring-ring/30 flex items-end gap-2 rounded-xl border p-1.5 focus-within:ring-[3px]">
          <label htmlFor="assistant-input" className="sr-only">
            Message the assistant
          </label>
          <textarea
            id="assistant-input"
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send(input);
              }
            }}
            rows={1}
            placeholder="Ask anything…"
            className="placeholder:text-muted-foreground max-h-40 min-h-9 flex-1 resize-none bg-transparent px-2 py-2 text-sm outline-none"
          />
          <Button
            type="submit"
            size="icon-sm"
            disabled={isLoading || !input.trim()}
            aria-label="Send message"
            className="rounded-lg"
          >
            <ArrowUp />
          </Button>
        </div>
        <p className="text-muted-foreground mt-2 px-1 text-[11px]">
          AI can make mistakes. Verify important information.
        </p>
      </form>
    </div>
  );
}

/** Floating button that opens the assistant. Only shown to signed-in users. */
export function AssistantLauncher() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "j") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!session) return null;

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className="shadow-primary/20 fixed right-4 bottom-4 z-40 h-11 gap-2 rounded-full px-4 shadow-lg sm:right-6 sm:bottom-6"
        aria-label="Open AI assistant"
      >
        <Sparkles />
        <span className="hidden sm:inline">Ask AI</span>
        <kbd className="border-primary-foreground/25 hidden rounded border px-1.5 font-mono text-[10px] opacity-75 lg:inline">
          Ctrl J
        </kbd>
      </Button>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="right"
          showCloseButton={false}
          className="w-full gap-0 p-0 sm:max-w-md"
        >
          <AITutor />
        </SheetContent>
      </Sheet>
    </>
  );
}
