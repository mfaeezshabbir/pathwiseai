"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { ArrowUp, Map as MapIcon, RotateCcw, Sparkles, X } from "lucide-react";
import { toast } from "sonner";

import {
  aiAssistantTutor,
  type AIAssistantTutorOutput,
} from "@/ai/flows/ai-assistant-tutor";
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
  content: AIAssistantTutorOutput["answer"];
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
          className="size-1.5 animate-bounce rounded-full bg-muted-foreground/60"
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

    setMessages((prev) => [
      ...prev,
      { role: "user", content: [{ type: "text", text: question }] },
    ]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await aiAssistantTutor({ question });
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: response.answer },
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
              <span className="inline-flex size-10 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                <Sparkles className="size-5" />
              </span>
              <h3 className="text-lg font-semibold tracking-tight">
                How can I help you learn today?
              </h3>
              <p className="text-sm text-muted-foreground">
                I can explain topics, review code, and suggest roadmaps you can
                generate in one click.
              </p>
            </div>
            <div className="grid gap-2">
              {starters.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="rounded-lg border bg-card px-3 py-2.5 text-left text-sm transition-colors hover:border-primary/40 hover:bg-accent/50"
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
                  "flex animate-fade-up",
                  message.role === "user" ? "justify-end" : "justify-start",
                )}
              >
                <div
                  className={cn(
                    "max-w-[88%] space-y-2 text-sm leading-relaxed",
                    message.role === "user" &&
                      "rounded-2xl rounded-br-md bg-primary px-3.5 py-2.5 text-primary-foreground",
                  )}
                >
                  {message.content.map((part, i) => {
                    if (part.type === "text") {
                      return (
                        <p key={i} className="whitespace-pre-wrap">
                          {part.text}
                        </p>
                      );
                    }
                    return (
                      <Link
                        key={i}
                        href={roadmapHref(part.suggestion)}
                        className="group flex items-center gap-3 rounded-xl border bg-card px-3 py-2.5 transition-colors hover:border-primary/40"
                      >
                        <span className="flex size-8 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                          <MapIcon className="size-4" />
                        </span>
                        <span className="flex-1">
                          <span className="block text-xs text-muted-foreground">
                            Suggested roadmap
                          </span>
                          <span className="font-medium">{part.suggestion}</span>
                        </span>
                        <span className="text-xs font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                          Generate →
                        </span>
                      </Link>
                    );
                  })}
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
        <div className="flex items-end gap-2 rounded-xl border bg-background p-1.5 focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/30">
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
            className="max-h-40 min-h-9 flex-1 resize-none bg-transparent px-2 py-2 text-sm outline-none placeholder:text-muted-foreground"
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
        <p className="mt-2 px-1 text-[11px] text-muted-foreground">
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
        className="fixed right-4 bottom-4 z-40 h-11 gap-2 rounded-full px-4 shadow-lg shadow-primary/20 sm:right-6 sm:bottom-6"
        aria-label="Open AI assistant"
      >
        <Sparkles />
        <span className="hidden sm:inline">Ask AI</span>
        <kbd className="hidden rounded border border-primary-foreground/25 px-1.5 font-mono text-[10px] opacity-75 lg:inline">
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
