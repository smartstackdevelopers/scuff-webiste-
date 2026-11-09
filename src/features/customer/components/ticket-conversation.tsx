"use client";

import * as React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Send,
  Paperclip,
  CheckCircle2,
  Clock,
  AlertCircle,
  ShieldCheck,
  User,
} from "lucide-react";
import { useCustomer } from "../hooks/use-customer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface TicketConversationProps {
  ticketId: string;
}

export function TicketConversation({ ticketId }: TicketConversationProps) {
  const { tickets, replyTicket } = useCustomer();
  const [replyText, setReplyText] = React.useState("");

  const ticket = tickets.find((t) => t.id === ticketId);

  if (!ticket) {
    return (
      <div className="py-16 text-center space-y-4">
        <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto" />
        <h2 className="text-xl font-bold text-foreground">Ticket Not Found</h2>
        <p className="text-sm text-muted-foreground">
          The support ticket could not be found.
        </p>
        <Link
          href="/customer/support"
          className="inline-flex items-center gap-2 text-xs font-bold text-electric hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Support</span>
        </Link>
      </div>
    );
  }

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    replyTicket(ticket.id, replyText.trim());
    setReplyText("");
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border/70">
        <div className="flex items-center gap-3">
          <Link
            href="/customer/support"
            className="p-2 rounded-xl bg-secondary/80 hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Back to tickets"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs font-black text-electric bg-electric/10 px-2 py-0.5 rounded border border-electric/30">
                {ticket.ticketReference}
              </span>
              <Badge variant="electric" className="text-xs">
                {ticket.status === "open" ? (
                  <Clock className="w-3 h-3 mr-1" />
                ) : (
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                )}
                {ticket.statusLabel}
              </Badge>
              <span className="text-xs text-muted-foreground">
                • {ticket.categoryLabel}
              </span>
            </div>
            <h1 className="text-xl font-bold text-foreground mt-1">
              {ticket.subject}
            </h1>
          </div>
        </div>
      </div>

      {/* Messages Thread Container */}
      <div className="rounded-2xl bg-card border border-border/80 p-5 md:p-6 space-y-6 min-h-[360px] flex flex-col justify-between">
        <div className="space-y-4 overflow-y-auto max-h-[550px] pr-2">
          {ticket.messages.map((msg) => {
            const isCustomer = msg.sender === "customer";

            return (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-[85%] sm:max-w-[75%] ${
                  isCustomer ? "ml-auto flex-row-reverse" : "mr-auto"
                }`}
              >
                {/* Avatar */}
                <Avatar size="sm" className="shrink-0 mt-1">
                  <AvatarFallback
                    className={
                      isCustomer
                        ? "bg-electric text-black font-bold"
                        : "bg-charcoal-800 text-electric border border-electric/40"
                    }
                  >
                    {isCustomer ? <User className="w-3.5 h-3.5" /> : <ShieldCheck className="w-3.5 h-3.5" />}
                  </AvatarFallback>
                </Avatar>

                {/* Message Bubble */}
                <div className="space-y-1">
                  <div
                    className={`flex items-baseline gap-2 text-[10px] text-muted-foreground ${
                      isCustomer ? "justify-end" : "justify-start"
                    }`}
                  >
                    <span className="font-semibold text-foreground">
                      {isCustomer ? "You" : msg.senderName}
                    </span>
                    <span>{msg.timestamp}</span>
                  </div>

                  <div
                    className={`p-4 rounded-2xl text-xs leading-relaxed shadow-sm ${
                      isCustomer
                        ? "bg-electric/15 border border-electric/30 text-foreground rounded-tr-none"
                        : "bg-secondary border border-border/70 text-foreground rounded-tl-none"
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{msg.message}</p>

                    {msg.attachmentName && (
                      <div className="mt-2.5 pt-2 border-t border-border/50 flex items-center gap-1.5 text-[11px] text-electric">
                        <Paperclip className="w-3 h-3" />
                        <span>{msg.attachmentName}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Reply Box */}
        <form
          onSubmit={handleSend}
          className="pt-4 border-t border-border/60 space-y-3"
        >
          <Textarea
            rows={3}
            placeholder="Write your response to the detailing team..."
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            className="w-full text-xs"
          />

          <div className="flex items-center justify-between">
            <button
              type="button"
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => alert("Attachment preview: Upload simulated.")}
            >
              <Paperclip className="w-4 h-4" />
              <span>Attach photo or PDF</span>
            </button>

            <Button
              type="submit"
              variant="default"
              size="sm"
              disabled={!replyText.trim()}
              className="text-xs font-bold uppercase tracking-wider"
            >
              <span>Send Reply</span>
              <Send className="w-3.5 h-3.5 ml-1.5" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
