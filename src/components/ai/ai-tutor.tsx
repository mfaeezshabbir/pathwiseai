"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Bot, Loader2, Send, User, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  aiAssistantTutor,
  AIAssistantTutorOutput,
} from "@/ai/flows/ai-assistant-tutor";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

interface Message {
  role: "user" | "assistant";
  content: AIAssistantTutorOutput["answer"];
}

export function AITutor() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo(0, scrollAreaRef.current.scrollHeight);
    }
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: "user",
      content: [{ type: "text", text: input }],
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await aiAssistantTutor({ question: input });
      const assistantMessage: Message = {
        role: "assistant",
        content: response.answer,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Sorry, I encountered an error. Please try again.",
        variant: "destructive",
      });
      console.error("AI Tutor Error:", error);
      // remove the user message on error
      setMessages((prev) => prev.slice(0, prev.length - 1));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-background">
      <CardHeader className="border-b">
        <CardTitle className="flex items-center gap-2">
          <Bot />
          AI Assistant / Tutor
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden p-0">
        <ScrollArea className="h-full" ref={scrollAreaRef}>
          <div className="space-y-6 p-4 md:p-6">
            {messages.length === 0 && (
              <div className="text-center text-muted-foreground pt-10">
                <p>
                  Ask me anything about your roadmap, a concept, or a code
                  snippet!
                </p>
              </div>
            )}
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "flex items-start gap-3",
                  message.role === "user" ? "justify-end" : "justify-start",
                )}
              >
                {message.role === "assistant" && (
                  <Avatar className="h-8 w-8 border">
                    <AvatarFallback>AI</AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={cn(
                    "max-w-[80%] rounded-lg text-sm",
                    message.role === "user"
                      ? "bg-primary text-primary-foreground shadow-sm p-3"
                      : "space-y-2",
                  )}
                >
                  {message.content.map((part, partIndex) => {
                    if (part.type === "text") {
                      return (
                        <p
                          key={partIndex}
                          className={
                            message.role === "assistant"
                              ? "bg-card p-3 rounded-lg shadow-sm"
                              : ""
                          }
                        >
                          {part.text}
                        </p>
                      );
                    }
                    if (part.type === "roadmapSuggestion") {
                      return (
                        <div
                          key={partIndex}
                          className="bg-card p-3 rounded-lg shadow-sm flex items-center justify-between gap-4"
                        >
                          <p className="font-medium">Learn {part.suggestion}</p>
                          <Button asChild variant="secondary" size="sm">
                            <Link
                              href={`/?learn=${encodeURIComponent(part.suggestion)}`}
                            >
                              <Rocket className="mr-2 h-4 w-4" />
                              Generate Roadmap
                            </Link>
                          </Button>
                        </div>
                      );
                    }
                  })}
                </div>
                {message.role === "user" && (
                  <Avatar className="h-8 w-8 border">
                    <AvatarFallback>
                      <User />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex items-start gap-3 justify-start">
                <Avatar className="h-8 w-8 border">
                  <AvatarFallback>AI</AvatarFallback>
                </Avatar>
                <div className="bg-card rounded-lg p-3 text-sm shadow-sm">
                  <Loader2 className="h-5 w-5 animate-spin text-primary" />
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
      <div className="p-4 border-t">
        <form onSubmit={handleSendMessage} className="relative">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g., How do I start with web development?"
            disabled={isLoading}
            rows={1}
            className="pr-20 min-h-0 resize-none"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                handleSendMessage(e);
              }
            }}
          />
          <Button
            type="submit"
            size="icon"
            disabled={isLoading || !input.trim()}
            className="absolute top-1.5 right-2 h-8 w-16"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                Send <Send className="h-4 w-4 ml-2" />
              </>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
