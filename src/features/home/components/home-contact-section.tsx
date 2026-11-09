"use client";

import * as React from "react";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageSquare,
  ShieldCheck,
  Send,
  Navigation,
  CheckCircle2,
  Truck,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

export function HomeContactSection() {
  const [quickMessage, setQuickMessage] = React.useState("");
  const [contactName, setContactName] = React.useState("");
  const [sentSuccess, setSentSuccess] = React.useState(false);

  const handleQuickSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !quickMessage.trim()) return;
    setSentSuccess(true);
    setTimeout(() => {
      setSentSuccess(false);
      setContactName("");
      setQuickMessage("");
    }, 4000);
  };

  return (
    <section
      id="contact-studio"
      className="py-20 md:py-28 relative overflow-hidden bg-surface-secondary border-t border-border/40"
    >
      <div className="absolute top-0 right-1/3 w-96 h-96 bg-primary/5 blur-[160px] pointer-events-none -z-10" />

      <Container>
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
          <div className="flex justify-center">
            <Badge variant="electric" dot>
              Mobile Service Coverage
            </Badge>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white">
            We Come Directly To Your Doorstep
          </h2>

          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            Need alloy wheel refurbishment, diamond cutting, or SMART scratch repairs? Contact our friendly family-run team today for advice, free estimates, and fast bookings across Birmingham and the West Midlands.
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Card 1: Mobile Operations & Channels (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-surface-card border border-white/[0.08] shadow-sm space-y-8">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-5">
                <div>
                  <h3 className="text-xl font-bold uppercase tracking-tight text-white font-display">
                    You Scuff We Buff
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Family-Run Mobile Alloy Wheel Repair & SMART Refurbishment
                  </p>
                </div>
                <Badge variant="success" size="sm" dot>
                  Mobile Units Active
                </Badge>
              </div>

              {/* 4 Info Blocks */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex items-start gap-3 p-4 rounded-2xl bg-surface-secondary border border-white/[0.06]">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-xs space-y-1">
                    <span className="font-bold text-white block">Service Coverage</span>
                    <p className="text-muted-foreground leading-relaxed">
                      Birmingham, Solihull, Wolverhampton, Walsall, Dudley, Sandwell, Coventry & Black Country
                    </p>
                    <span className="text-[11px] text-emerald-400 font-medium block pt-0.5">
                      100% Mobile Service
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-2xl bg-surface-secondary border border-white/[0.06]">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-xs space-y-1">
                    <span className="font-bold text-white block">Opening Hours</span>
                    <p className="text-muted-foreground">
                      Mon – Fri: 08:00 – 18:00
                    </p>
                    <p className="text-muted-foreground">
                      Saturday: 08:00 – 16:00
                    </p>
                    <span className="text-[11px] text-muted-foreground/80 block">
                      Sunday: Closed / By appointment
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-2xl bg-surface-secondary border border-white/[0.06]">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-xs space-y-1">
                    <span className="font-bold text-white block">Direct Telephone</span>
                    <a
                      href={`tel:${siteConfig.contact.phoneRaw}`}
                      className="text-white hover:text-primary transition-colors font-medium block"
                    >
                      {siteConfig.contact.phone}
                    </a>
                    <span className="text-[11px] text-muted-foreground">
                      Call our team directly for free advice & bookings
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-2xl bg-surface-secondary border border-white/[0.06]">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                    <MessageSquare className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div className="text-xs space-y-1">
                    <span className="font-bold text-white block">WhatsApp Photo Quote</span>
                    <a
                      href={siteConfig.links.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 hover:underline font-semibold block"
                    >
                      Send Photos for Free Quote &rarr;
                    </a>
                    <span className="text-[11px] text-muted-foreground">
                      Quick response with transparent pricing
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Note Action */}
            <form onSubmit={handleQuickSend} className="space-y-3 pt-2 border-t border-white/[0.08]">
              <span className="text-xs font-bold uppercase tracking-wider text-white block">
                Quick Message / Postcode Check
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-surface-secondary border border-white/[0.1] text-xs text-white focus:outline-none focus:border-primary"
                />
                <input
                  type="text"
                  required
                  placeholder="Your Postcode & Wheel / Scuff Issue"
                  value={quickMessage}
                  onChange={(e) => setQuickMessage(e.target.value)}
                  className="sm:col-span-2 px-3 py-2 rounded-xl bg-surface-secondary border border-white/[0.1] text-xs text-white focus:outline-none focus:border-primary"
                />
              </div>
              <div className="flex items-center justify-between">
                {sentSuccess ? (
                  <span className="text-xs text-primary flex items-center gap-1 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Message Sent! We will contact you shortly.
                  </span>
                ) : (
                  <span className="text-[11px] text-muted-foreground">
                    Friendly family service. No pressure, free advice.
                  </span>
                )}
                <Button type="submit" variant="default" size="xs" rightIcon={<Send className="w-3 h-3" />}>
                  Send
                </Button>
              </div>
            </form>
          </div>

          {/* Card 2: Interactive West Midlands Coverage Map (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-surface-card border border-white/[0.08] shadow-sm relative overflow-hidden">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-primary">
                  West Midlands Coverage
                </span>
                <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-primary" /> We Come To You
                </span>
              </div>

              {/* Styled Automotive Map Graphic Container */}
              <div className="relative h-64 sm:h-72 w-full rounded-2xl overflow-hidden border border-white/[0.1] bg-surface-secondary">
                {/* Stylized dark map mesh background */}
                <div className="absolute inset-0 bg-[#0B0E14] opacity-95">
                  {/* Grid Lines */}
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage:
                        "linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)",
                      backgroundSize: "28px 28px",
                    }}
                  />
                  {/* Stylized Road Arteries */}
                  <div className="absolute top-1/2 left-0 right-0 h-1.5 bg-white/10" />
                  <div className="absolute top-0 bottom-0 left-1/3 w-1.5 bg-white/10" />
                  <div className="absolute top-0 bottom-0 left-2/3 w-1 bg-white/5" />
                  <div className="absolute top-1/4 left-0 right-0 h-1 bg-white/5" />
                </div>

                {/* Birmingham Mobile Center Marker */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                  <div className="relative flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-primary/20 animate-ping absolute" />
                    <div className="w-10 h-10 rounded-full bg-primary/30 flex items-center justify-center border border-primary relative z-10 shadow-glow-neon">
                      <Truck className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="mt-2 px-3 py-1 rounded-lg bg-surface-card/95 border border-primary/40 text-[10px] font-bold text-white shadow-lg whitespace-nowrap">
                    Birmingham & West Midlands Mobile Service
                  </div>
                </div>

                {/* Mobile Van Transit Marker */}
                <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-xl bg-surface-card/90 border border-white/[0.1] text-[11px] text-muted-foreground flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Mobile Vans Active</span>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <h4 className="text-sm font-bold text-white">
                  Home & Workplace Convenience
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  No need to leave your car at a garage for days. Our fully equipped mobile repair units arrive at your home or workplace to complete wheel refurbishments and SMART repairs right on site.
                </p>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-3">
              <Link href="/contact" className="w-full sm:w-auto flex-1">
                <Button variant="outline" size="sm" className="w-full">
                  Contact Page
                </Button>
              </Link>
              <a
                href={siteConfig.links.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button variant="default" size="sm" className="w-full bg-emerald-600 hover:bg-emerald-500">
                  WhatsApp Us
                </Button>
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
