"use client";

import * as React from "react";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Truck,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { siteConfig } from "@/config/site";
import { CinematicVideoHero } from "@/components/common/cinematic-video-hero";

export default function ContactPage() {
  const [submitted, setSubmitted] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [form, setForm] = React.useState({
    fullName: "",
    phone: "",
    email: "",
    vehicle: "",
    service: "alloy-wheel-refurbishment",
    preferredContact: "phone",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#07080A]">
      {/* Real Photography Hero */}
      <CinematicVideoHero
        imageSrc="https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=2070&auto=format&fit=crop"
        imageAlt="Professional automotive workshop and customer service consultation"
        badgeText="MOBILE REPAIRS ACROSS BIRMINGHAM & THE WEST MIDLANDS"
        badgeIcon={<Sparkles className="w-3.5 h-3.5" />}
        badgeVariant="electric"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Contact Us" },
        ]}
        title={
          <>
            GET IN <br className="hidden sm:inline" />
            <span className="text-gradient-electric">TOUCH</span>
          </>
        }
        subtitle="Looking for help or have any questions? Whether you need professional alloy wheel refurbishment, diamond cutting repair, or dent and scratch SMART repairs, our friendly team is here to help. Contact You Scuff We Buff today for advice, free estimates and convenient mobile repair bookings across Birmingham and the West Midlands."
        align="center"
        minHeightClass="min-h-[58vh] sm:min-h-[66vh]"
        primaryCta={{
          label: "WhatsApp Photo Quote",
          href: `https://wa.me/${siteConfig.contact.whatsAppPlaceholder.number}?text=${encodeURIComponent(
            "Hi You Scuff We Buff, I would like a free repair quote. Here are details of my vehicle:"
          )}`,
          variant: "glow",
          icon: <MessageSquare className="w-4 h-4 mr-2" />,
        }}
        secondaryCta={{
          label: `Call ${siteConfig.contact.phone}`,
          href: `tel:${siteConfig.contact.phoneRaw}`,
          icon: <Phone className="w-4 h-4 mr-2" />,
        }}
        metrics={[
          { label: "Service Mode", value: "100% Mobile", icon: <Truck className="w-4 h-4" /> },
          { label: "Coverage", value: "West Midlands", icon: <MapPin className="w-4 h-4" /> },
          { label: "Quotes", value: "Free & Fast", icon: <CheckCircle2 className="w-4 h-4" /> },
        ]}
      />

      <div className="py-16 sm:py-24 space-y-16 bg-[#0C0F15]">
        <Container>
          {/* 2-Column Grid: Form & Business Details */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start max-w-7xl xl:max-w-[1440px] 2xl:max-w-[1560px] mx-auto">
            {/* Left Column: Interactive Form */}
            <div className="lg:col-span-7 bg-surface-card border border-white/[0.08] rounded-3xl p-6 sm:p-8 shadow-luxury-dark relative overflow-hidden">
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground font-display uppercase tracking-tight">
                    Thank You For Contacting Us
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto">
                    Thank you, <strong className="text-foreground">{form.fullName}</strong>. Our friendly team has received your enquiry regarding {form.vehicle || "your vehicle"} and will get back to you shortly via {form.preferredContact}.
                  </p>
                  <div className="pt-4 flex justify-center gap-3">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setSubmitted(false);
                        setForm({
                          fullName: "",
                          phone: "",
                          email: "",
                          vehicle: "",
                          service: "alloy-wheel-refurbishment",
                          preferredContact: "phone",
                          message: "",
                        });
                      }}
                    >
                      Send Another Message
                    </Button>
                    <a
                      href={`tel:${siteConfig.contact.phoneRaw}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Call {siteConfig.contact.phone}</span>
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div className="border-b border-border/40 pb-3 mb-4">
                    <h3 className="text-base font-bold text-foreground font-display uppercase tracking-wide">
                      Request a Free Quote
                    </h3>
                    <p className="text-muted-foreground text-[11px]">
                      Fill in your details below and our team will get in touch with an accurate estimate.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white font-semibold mb-1">Your Full Name *</label>
                      <Input
                        required
                        placeholder="e.g. John Smith"
                        value={form.fullName}
                        onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                        className="bg-surface-secondary border-white/[0.1] text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-white font-semibold mb-1">Phone Number *</label>
                      <Input
                        type="tel"
                        required
                        placeholder="e.g. 07123 456 789"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="bg-surface-secondary border-white/[0.1] text-xs text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white font-semibold mb-1">Email Address *</label>
                      <Input
                        type="email"
                        required
                        placeholder="e.g. john@example.co.uk"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="bg-surface-secondary border-white/[0.1] text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-white font-semibold mb-1">Vehicle Make & Model</label>
                      <Input
                        placeholder="e.g. BMW 3 Series, Audi A4, VW Golf"
                        value={form.vehicle}
                        onChange={(e) => setForm({ ...form, vehicle: e.target.value })}
                        className="bg-surface-secondary border-white/[0.1] text-xs text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white font-semibold mb-1">Required Service</label>
                      <select
                        value={form.service}
                        onChange={(e) => setForm({ ...form, service: e.target.value })}
                        className="w-full h-10 rounded-xl bg-surface-secondary border border-white/[0.1] px-3 text-xs text-white focus:outline-none focus:border-primary"
                      >
                        <option value="alloy-wheel-refurbishment">Alloy Wheel Refurbishment</option>
                        <option value="diamond-cutting">Diamond Cutting Repair</option>
                        <option value="smart-repairs">Dent & Scratch SMART Repair</option>
                        <option value="bumper-damage">Bumper Damage & Paint Scuff</option>
                        <option value="mobile-repairs">Mobile Alloy Wheel Repair</option>
                        <option value="other">Other / Multiple Repairs</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-white font-semibold mb-1">Preferred Contact Method</label>
                      <select
                        value={form.preferredContact}
                        onChange={(e) => setForm({ ...form, preferredContact: e.target.value })}
                        className="w-full h-10 rounded-xl bg-surface-secondary border border-white/[0.1] px-3 text-xs text-white focus:outline-none focus:border-primary"
                      >
                        <option value="phone">Phone Call</option>
                        <option value="whatsapp">WhatsApp</option>
                        <option value="email">Email</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-white font-semibold mb-1">
                      Message / Damage Description
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Please describe the damage (e.g. kerbed front passenger alloy, bumper corner scuff) or postcodes for mobile visit..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full rounded-2xl bg-surface-secondary border border-white/[0.1] p-3 text-xs text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={submitting}
                    variant="amber"
                    className="w-full py-6 text-sm rounded-xl gap-2 font-bold shadow-lg"
                  >
                    <Send className="w-4 h-4" />
                    <span>{submitting ? "Sending Your Request..." : "Request a Free Quote"}</span>
                  </Button>
                </form>
              )}
            </div>

            {/* Right Column: Business Contact & Hours */}
            <div className="lg:col-span-5 space-y-6">
              {/* Quick Contact Card */}
              <div className="bg-surface-card border border-white/[0.08] rounded-3xl p-6 space-y-6 shadow-luxury-dark">
                <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-white/[0.08] pb-3 font-display uppercase tracking-wider">
                  <Phone className="w-4 h-4 text-primary" />
                  Business Contact Details
                </h3>

                <div className="space-y-4 text-xs text-muted-foreground">
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20 text-primary shrink-0 mt-0.5">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Direct Telephone</p>
                      <a
                        href={`tel:${siteConfig.contact.phoneRaw}`}
                        className="text-white hover:text-primary font-bold text-sm block mt-0.5"
                      >
                        {siteConfig.contact.phone}
                      </a>
                      <p className="text-[11px] text-muted-foreground mt-0.5">Call our team directly for advice & bookings.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20 text-primary shrink-0 mt-0.5">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Email Enquiry</p>
                      <a
                        href={`mailto:${siteConfig.contact.email}`}
                        className="text-white hover:text-primary font-bold block mt-0.5"
                      >
                        {siteConfig.contact.email}
                      </a>
                      <p className="text-[11px] text-muted-foreground mt-0.5">Send damage photos and questions anytime.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20 text-primary shrink-0 mt-0.5">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Service Coverage</p>
                      <p className="text-white font-medium mt-0.5">
                        Mobile service across Birmingham, Solihull, Wolverhampton, Walsall, Dudley, Sandwell, Coventry & The Black Country.
                      </p>
                      <p className="text-[11px] text-emerald-400 font-semibold mt-0.5">
                        We travel directly to your home or workplace.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20 text-primary shrink-0 mt-0.5">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Opening Hours</p>
                      <p className="text-white font-medium mt-0.5">
                        Monday – Friday: 8:00 AM – 6:00 PM<br />
                        Saturday: 8:00 AM – 4:00 PM<br />
                        Sunday: Closed / By appointment only
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Instant WhatsApp Photo Estimate */}
              <div className="bg-gradient-to-br from-emerald-950/40 via-surface-card to-surface-card border border-emerald-500/30 rounded-3xl p-6 space-y-4 shadow-luxury-dark">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white font-display uppercase tracking-wider">
                      Instant WhatsApp Photo Quote
                    </h4>
                    <p className="text-[11px] text-slate-400">Send damage photos for a fast, free estimate</p>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  Snap clear photos of your damaged alloy wheels or bodywork scuffs and message them directly to us on WhatsApp for a quick price quote.
                </p>

                <a
                  href={`https://wa.me/${siteConfig.contact.whatsAppPlaceholder.number}?text=${encodeURIComponent(
                    "Hi You Scuff We Buff, here are photos of my vehicle damage for a repair quote:"
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold gap-2 text-xs py-5">
                    <MessageSquare className="w-4 h-4" />
                    <span>Send Photos via WhatsApp</span>
                  </Button>
                </a>
              </div>

              {/* Family-run guarantee */}
              <div className="p-4 rounded-2xl bg-surface-card border border-white/[0.08] flex items-center gap-3 text-xs text-slate-300">
                <ShieldCheck className="w-5 h-5 text-primary shrink-0" />
                <span>Family-run pride with skilled technicians, honest pricing, and high-quality finishes guaranteed.</span>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
