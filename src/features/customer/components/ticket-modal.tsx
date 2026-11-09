"use client";

import * as React from "react";
import { TicketCategory, TicketPriority } from "../types/customer";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LifeBuoy } from "lucide-react";

interface TicketModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: {
    subject: string;
    category: TicketCategory;
    categoryLabel: string;
    message: string;
    priority: TicketPriority;
  }) => void;
}

export function TicketModal({ open, onOpenChange, onSubmit }: TicketModalProps) {
  const [subject, setSubject] = React.useState("");
  const [category, setCategory] = React.useState<TicketCategory>("service_inquiry");
  const [priority, setPriority] = React.useState<TicketPriority>("medium");
  const [message, setMessage] = React.useState("");

  const categoryLabels: Record<TicketCategory, string> = {
    service_inquiry: "Service & Detailing Inquiry",
    booking_issue: "Booking Schedule & Adjustments",
    payment_question: "Billing, Invoices & Payments",
    general_support: "General Portal Support",
    other: "Other Inquiries",
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) return;

    onSubmit({
      subject: subject.trim(),
      category,
      categoryLabel: categoryLabels[category],
      priority,
      message: message.trim(),
    });

    setSubject("");
    setMessage("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent size="default">
        <DialogHeader>
          <div className="flex items-center gap-2 text-electric mb-1">
            <LifeBuoy className="w-5 h-5" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider">
              Concierge Helpdesk
            </span>
          </div>
          <DialogTitle>Open Support Ticket</DialogTitle>
          <DialogDescription>
            Have a question or need assistance with your booking? Our detailing specialists reply promptly.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          <div>
            <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1.5">
              Subject *
            </label>
            <Input
              placeholder="e.g. Question regarding ceramic coating curing time"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1.5">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as TicketCategory)}
                className="w-full px-3 py-2 rounded-xl bg-background border border-border text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-electric"
              >
                <option value="service_inquiry">Service & Detailing Inquiry</option>
                <option value="booking_issue">Booking Schedule & Adjustments</option>
                <option value="payment_question">Billing & Invoices</option>
                <option value="general_support">General Support</option>
                <option value="other">Other Inquiry</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1.5">
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as TicketPriority)}
                className="w-full px-3 py-2 rounded-xl bg-background border border-border text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-electric"
              >
                <option value="low">Low (Standard response)</option>
                <option value="medium">Medium (Priority response)</option>
                <option value="high">High (Urgent attention)</option>
                <option value="urgent">Urgent (Vehicle on premises)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1.5">
              Detailed Message *
            </label>
            <Textarea
              rows={4}
              placeholder="Describe your inquiry or vehicle requirements in detail..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="default" size="sm">
              Submit Ticket
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
