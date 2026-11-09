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
    email: "",
    phone: "",
    vehicle: "",
    serviceInterest: "paint_correction",
    locationType: "studio",
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
      {/* Cinematic Automotive Video Hero */}
      <CinematicVideoHero
        videoSrc="/videos/hero/01-wheel-intro.mp4"
        posterSrc="https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=2000&auto=format&fit=crop"
        badgeText="Master Technician Consultations & Rapid Quotes"
        badgeIcon={<Sparkles className="w-3.5 h-3.5" />}
        badgeVariant="electric"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Contact & Studio Location" },
        ]}
        title={
          <>
            CONNECT WITH OUR <br className="hidden sm:inline" />
            <span className="text-gradient-electric">DETAILING STUDIO.</span>
          </>
        }
        subtitle="Whether booking an in-person paint inspection at our Unit 4 Falcon Park clean bay, requesting mobile van dispatch to your residence, or sending vehicle scuff photos via WhatsApp for an immediate diagnostic."
        align="center"
        minHeightClass="min-h-[58vh] sm:min-h-[66vh]"
        primaryCta={{
          label: "WhatsApp Photo Quote",
          href: `https://wa.me/${siteConfig.contact.whatsAppPlaceholder.number}?text=${encodeURIComponent(
            siteConfig.contact.whatsAppPlaceholder.prefilledMessage
          )}`,
          variant: "glow",
          icon: <MessageSquare className="w-4 h-4 mr-2" />,
        }}
        secondaryCta={{
          label: `Call ${siteConfig.contact.phonePlaceholder}`,
          href: `tel:${siteConfig.contact.phonePlaceholder}`,
          icon: <Phone className="w-4 h-4 mr-2" />,
        }}
        metrics={[
          { label: "Response Time", value: "Under 2 Hours", icon: <Clock className="w-4 h-4" /> },
          { label: "Mobile Dispatch", value: "UK-Wide Fleet", icon: <CheckCircle2 className="w-4 h-4" /> },
          { label: "Studio Bay", value: "Unit 4 Falcon Park", icon: <MapPin className="w-4 h-4" /> },
        ]}
      />

      <div className="py-16 sm:py-24 space-y-16 bg-[#0C0F15]">
        <Container>
          {/* 2-Column Grid: Form & Studio Details */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start max-w-6xl mx-auto">
            {/* Left Column: Interactive Form */}
            <div className="lg:col-span-7 bg-surface-card border border-white/[0.08] rounded-3xl p-6 sm:p-8 shadow-luxury-dark relative overflow-hidden">
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground font-display uppercase tracking-tight">
                    Consultation Request Dispatched
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto">
                    Thank you, <strong className="text-foreground">{form.fullName}</strong>. A detailing advisor has received your vehicle specs ({form.vehicle}) and will contact you via {form.phone} within 2 business hours.
                  </p>
                  <div className="pt-4 flex justify-center gap-3">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setSubmitted(false);
                        setForm({
                          fullName: "",
                          email: "",
                          phone: "",
                          vehicle: "",
                          serviceInterest: "paint_correction",
                          locationType: "studio",
                          message: "",
                        });
                      }}
                    >
                      Submit Another Inquiry
                    </Button>
                    <Link href="/pricing">
                      <Button size="sm" className="bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold">
                        Explore Package Rates
                      </Button>
                    </Link>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div className="border-b border-border/40 pb-3 mb-4">
                    <h3 className="text-base font-bold text-foreground">Vehicle & Service Directive</h3>
                    <p className="text-muted-foreground text-[11px]">
                      Fill in your details for a tailored estimate and paint assessment.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white font-semibold mb-1">Your Full Name *</label>
                      <Input
                        required
                        placeholder="e.g. Lord Alistair Vance"
                        value={form.fullName}
                        onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                        className="bg-surface-secondary border-white/[0.1] text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-white font-semibold mb-1">Email Address *</label>
                      <Input
                        type="email"
                        required
                        placeholder="alistair@example.co.uk"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="bg-surface-secondary border-white/[0.1] text-xs text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white font-semibold mb-1">Telephone / Mobile *</label>
                      <Input
                        type="tel"
                        required
                        placeholder="+44 7911 123456"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="bg-surface-secondary border-white/[0.1] text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-white font-semibold mb-1">Vehicle Make & Model *</label>
                      <Input
                        required
                        placeholder="e.g. Porsche 911 GT3 (992) or Range Rover"
                        value={form.vehicle}
                        onChange={(e) => setForm({ ...form, vehicle: e.target.value })}
                        className="bg-surface-secondary border-white/[0.1] text-xs text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white font-semibold mb-1">Primary Interest</label>
                      <select
                        value={form.serviceInterest}
                        onChange={(e) => setForm({ ...form, serviceInterest: e.target.value })}
                        className="w-full h-10 rounded-xl bg-surface-secondary border border-white/[0.1] px-3 text-xs text-white focus:outline-none focus:border-primary"
                      >
                        <option value="ceramic_coating">9H Graphene & Ceramic Shield</option>
                        <option value="paint_correction">Multi-Stage Machine Paint Correction</option>
                        <option value="scuff_repair">SMART Bumper Scuff & Scratch Repair</option>
                        <option value="interior_restoration">Interior Deep Extraction & Leather Care</option>
                        <option value="full_detail">Comprehensive Studio Signature Detail</option>
                        <option value="fleet_concierge">Corporate / Exotic Fleet Detailing</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-white font-semibold mb-1">Service Location</label>
                      <select
                        value={form.locationType}
                        onChange={(e) => setForm({ ...form, locationType: e.target.value })}
                        className="w-full h-10 rounded-xl bg-surface-secondary border border-white/[0.1] px-3 text-xs text-white focus:outline-none focus:border-primary"
                      >
                        <option value="studio">Master Detailing Studio Bay (London HQ)</option>
                        <option value="mobile">Self-Sufficient Mobile Detailing Van Visit</option>
                        <option value="collection">Bespoke Covered Transporter Collection</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-white font-semibold mb-1">
                      Specific Damage, Scuffs, or Detailing Requirements
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Provide details on swirl marks, bumper scuffs, ceramic preferences, or ideal appointment dates..."
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
                    <span>{submitting ? "Transmitting Vehicle Specs..." : "Request Detailing Consultation"}</span>
                  </Button>
                </form>
              )}
            </div>

            {/* Right Column: Studio Information & Direct WhatsApp */}
            <div className="lg:col-span-5 space-y-6">
              {/* Quick Contact Card */}
              <div className="bg-surface-card border border-white/[0.08] rounded-3xl p-6 space-y-6 shadow-luxury-dark">
                <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-white/[0.08] pb-3 font-display uppercase tracking-wider">
                  <MapPin className="w-4 h-4 text-primary" />
                  Master Studio Detailing Bay
                </h3>

                <div className="space-y-4 text-xs text-muted-foreground">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-secondary/80 text-foreground shrink-0 mt-0.5">
                      <MapPin className="w-4 h-4 text-amber-400" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Studio Location</p>
                      <p>{siteConfig.contact.addressPlaceholder}</p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">High-security gated facility with 24/7 CCTV.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-secondary/80 text-foreground shrink-0 mt-0.5">
                      <Phone className="w-4 h-4 text-amber-400" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Telephone Concierge</p>
                      <a href={`tel:${siteConfig.contact.phonePlaceholder}`} className="hover:text-amber-400 font-mono">
                        {siteConfig.contact.phonePlaceholder}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-secondary/80 text-foreground shrink-0 mt-0.5">
                      <Mail className="w-4 h-4 text-amber-400" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Direct Email</p>
                      <a href={`mailto:${siteConfig.contact.emailPlaceholder}`} className="hover:text-amber-400">
                        {siteConfig.contact.emailPlaceholder}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-secondary/80 text-foreground shrink-0 mt-0.5">
                      <Clock className="w-4 h-4 text-amber-400" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Operating Hours</p>
                      <p>{siteConfig.contact.businessHoursPlaceholder}</p>
                      <p className="text-[11px] text-amber-400 font-semibold mt-0.5">Weekend studio bookings by prior arrangement.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Concierge Card */}
              <div className="bg-gradient-to-br from-emerald-950/40 via-surface-card to-surface-card border border-emerald-500/30 rounded-3xl p-6 space-y-4 shadow-luxury-dark">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white font-display uppercase tracking-wider">Instant WhatsApp Photo Estimate</h4>
                    <p className="text-[11px] text-slate-400">Send vehicle damage photos for rapid diagnostic</p>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  Photograph your scuff, scratch, or swirl marks in natural light and send them directly to our Master Technician on WhatsApp for an immediate diagnostic and quote.
                </p>

                <a
                  href={`https://wa.me/${siteConfig.contact.whatsAppPlaceholder.number}?text=${encodeURIComponent(
                    siteConfig.contact.whatsAppPlaceholder.prefilledMessage
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold gap-2 text-xs py-5">
                    <MessageSquare className="w-4 h-4" />
                    <span>Launch WhatsApp Chat</span>
                  </Button>
                </a>
              </div>

              {/* Guarantee badge */}
              <div className="p-4 rounded-2xl bg-surface-card border border-white/[0.08] flex items-center gap-3 text-xs text-slate-400">
                <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0" />
                <span>Full £5M Public & Motor Trade Liability Insurance covering all prestige and supercar marques.</span>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
