"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Bot,
  User,
  RefreshCw,
  Loader2,
  X,
  SendHorizonal,
} from "lucide-react";
import QuickreplyIcon from "@mui/icons-material/Quickreply";

// Responsive hook
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

export default function Chatbot() {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<
    { role: "user" | "ai"; content: string }[]
  >([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const personalizedPrompt =
    "You are the official support assistant for Skillpix, a skill development platform that helps students learn, practice, collaborate on real-world projects, manage them through an integrated PLM tool, and gain exposure to prototyping, certifications, hackathons, IPOs, and patents. Your role is to strictly assist with educational and Skillpix-related queries only. You should provide clear, helpful, and factual answers to questions about Skillpix’s services, learning content, project tools, platform usage, and career-oriented guidance within the platform’s ecosystem. Do not respond to personal, political, religious, or unrelated casual questions. If a question falls outside your scope, respond politely: “I’m here to help you with learning and Skillpix-related queries. Please ask a relevant question.”";

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const MAX_HISTORY_LENGTH = 10;
  const MAX_MESSAGES = 10;

  const faqs = [
    "How do I start a new project?",
    "What is SolidWorks?",
    "How can I improve my coding skills?",
    "What are the best practices for 3D design?",
  ];

  const shouldShowFaqs = inputMessage === "" && messages.length === 0;

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    setError(null);
    const userMessage = { role: "user" as const, content: inputMessage };
    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    try {
      const recentMessages = messages
        .slice(-MAX_HISTORY_LENGTH)
        .map((msg) => `${msg.role}: ${msg.content}`)
        .join("\n");
      const prompt = `${personalizedPrompt}\n${recentMessages}\nuser: ${inputMessage}`;

      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch response");
      }

      const data = await response.json();
      setMessages((prev) => [...prev, { role: "ai", content: data.response }]);
    } catch (error) {
      setError("Something went wrong. Please try again. Error: " + error);
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content: "Sorry, I encountered an error. Please try again.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleNewChat = () => {
    setMessages([]);
    setError(null);
  };

  const handleFaqClick = (faq: string) => {
    setInputMessage(faq);
    setTimeout(() => handleSendMessage(), 0);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputMessage(e.target.value);
    setError(null);
  };

  const parseMessageText = (text: string) => {
    const parts = text.split(/\*\*(.*?)\*\*/g);
    return parts.map((part, index) =>
      index % 2 === 0 ? (
        part
      ) : (
        <strong key={index} className="font-semibold">
          {part}
        </strong>
      )
    );
  };

  const ChatContent = (
    <>
      <div className="flex-1 flex flex-col gap-y-3 overflow-y-auto px-4 bg-background min-h-[300px] max-h-[50vh] transition-all">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex w-full ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`flex items-end gap-2 max-w-[80%] ${
                message.role === "user" ? "flex-row-reverse" : ""
              }`}
            >
              <Avatar className="h-8 w-8 border-none shadow-sm">
                <AvatarFallback
                  className={
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }
                >
                  {message.role === "user" ? (
                    <User className="h-4 w-4" />
                  ) : (
                    <Bot className="h-4 w-4" />
                  )}
                </AvatarFallback>
              </Avatar>
              <div
                className={`rounded-2xl px-4 py-2 text-sm whitespace-pre-line shadow-sm transition-all ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground animate-in fade-in slide-in-from-right-4"
                    : "bg-muted text-foreground animate-in fade-in slide-in-from-left-4"
                }`}
              >
                {parseMessageText(message.content)}
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start w-full">
            <div className="flex items-end gap-2 max-w-[80%] animate-pulse">
              <Avatar className="h-8 w-8 border-none shadow-sm">
                <AvatarFallback className="bg-muted text-muted-foreground">
                  <Bot className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div className="rounded-2xl px-4 py-2 bg-muted flex items-center gap-2 shadow-sm">
                <Loader2 className="animate-spin h-4 w-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  Bot is typing…
                </span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="px-4 pt-2 pb-4 border-t bg-background">
        {shouldShowFaqs && (
          <div className="mb-4 flex gap-2 overflow-x-auto">
            {faqs.map((faq, index) => (
              <button
                key={index}
                className="cursor-pointer bg-muted text-foreground px-3 py-1 rounded-lg border hover:bg-primary/10 text-xs transition-colors"
                onClick={() => handleFaqClick(faq)}
              >
                {faq}
              </button>
            ))}
          </div>
        )}
        <div className="mb-2 text-xs text-muted-foreground">
          Messages left:{" "}
          {MAX_MESSAGES - messages.filter((msg) => msg.role === "user").length}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex gap-2"
        >
          <Input
            value={inputMessage}
            onChange={handleInputChange}
            placeholder="Type your message…"
            className="flex-1 text-sm"
            disabled={
              isTyping ||
              messages.filter((msg) => msg.role === "user").length >=
                MAX_MESSAGES
            }
            aria-label="Message input"
            autoComplete="off"
          />
          <Button
            type="submit"
            size="icon"
            variant="default"
            disabled={
              isTyping ||
              !inputMessage.trim() ||
              messages.filter((msg) => msg.role === "user").length >=
                MAX_MESSAGES
            }
            aria-label="Send message"
          >
            {isTyping ? (
              <Loader2 className="animate-spin h-4 w-4" />
            ) : (
              <SendHorizonal className="h-4 w-4" />
            )}
          </Button>
        </form>
        {error && <div className="text-destructive text-xs mt-2">{error}</div>}
        {messages.filter((msg) => msg.role === "user").length >=
          MAX_MESSAGES && (
          <div className="text-destructive text-xs mt-2">
            Limit reached, please refresh the chat.
          </div>
        )}
      </div>
    </>
  );

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-4">
      {isMobile ? (
        <Sheet open={isOpen} onOpenChange={setIsOpen} modal={false}>
          <SheetTrigger asChild>
            <Button
              size="icon"
              variant="default"
              className="h-10 w-10 shadow-xl hover:shadow-2xl bg-primary hover:bg-primary/90 text-primary-foreground"
              aria-label="Open chat"
            >
              <QuickreplyIcon fontSize="small" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="bottom"
            hideClose
            className="max-w-full w-full p-0 rounded-t-2xl border bg-background shadow-2xl animate-in fade-in slide-in-from-bottom-8 duration-300"
          >
            <SheetHeader className="flex flex-row items-center justify-between px-4 pt-4 pb-2 border-b">
              <SheetTitle className="text-lg font-semibold text-primary">
                Skillpix Support
              </SheetTitle>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleNewChat}
                  aria-label="New chat"
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
                <SheetClose asChild>
                  <Button variant="ghost" size="icon" aria-label="Close chat">
                    <X className="h-4 w-4" />
                  </Button>
                </SheetClose>
              </div>
            </SheetHeader>
            {ChatContent}
          </SheetContent>
        </Sheet>
      ) : (
        <Dialog open={isOpen} onOpenChange={setIsOpen} modal={false}>
          <DialogTrigger asChild>
            <Button
              size="icon"
              variant="default"
              className="h-10 w-10 shadow-xl hover:shadow-2xl bg-primary hover:bg-primary/90 text-primary-foreground"
              aria-label="Open chat"
            >
              <QuickreplyIcon fontSize="small" />
            </Button>
          </DialogTrigger>
          <DialogContent
            hideClose
            className="max-w-md w-full p-0 animate-in fade-in slide-in-from-bottom-8 duration-300"
          >
            <DialogHeader className="flex flex-row items-center justify-between px-4 pt-4 pb-2 border-b">
              <DialogTitle className="text-lg font-semibold text-primary">
                Skillpix Support
              </DialogTitle>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleNewChat}
                  aria-label="New chat"
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
                <DialogClose asChild>
                  <Button variant="ghost" size="icon" aria-label="Close chat">
                    <X className="h-4 w-4" />
                  </Button>
                </DialogClose>
              </div>
            </DialogHeader>
            {ChatContent}
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
