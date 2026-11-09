"use client";

import * as React from "react";
import Link from "next/link";
import {
  Calendar,
  Clock,
  Car,
  MapPin,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  Phone,
  Mail,
  User,
  ArrowRight,
  AlertCircle,
  Truck,
  Building,
  Home as HomeIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

const SERVICES_LIST = [
  { id: "alloy-wheel-refurbishment", name: "Alloy Wheel Refurbishment", price: "Free Quote" },
  { id: "diamond-cutting", name: "Diamond Cutting Repair", price: "Free Quote" },
  { id: "smart-repairs", name: "Dent & Scratch SMART Repair", price: "Free Quote" },
  { id: "bumper-damage", name: "Bumper Damage Repair", price: "Free Quote" },
  { id: "paint-scuff", name: "Paint Scuff Repair", price: "Free Quote" },
  { id: "mobile-repairs", name: "Mobile Alloy Wheel Repair (Full Set / Custom)", price: "Free Quote" },
];

export function HomeBookingSection() {
  const [service, setService] = React.useState(SERVICES_LIST[0].id);
  const [serviceLocation, setServiceLocation] = React.useState<"home" | "workplace">("home");
  const [customerName, setCustomerName] = React.useState("");
  const [customerEmail, setCustomerEmail] = React.useState("");
  const [customerPhone, setCustomerPhone] = React.useState("");
  const [postcode, setPostcode] = React.useState("");
  const [vehicleMakeModel, setVehicleMakeModel] = React.useState("");
  const [preferredDate, setPreferredDate] = React.useState("");
  const [notes, setNotes] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submittedRef, setSubmittedRef] = React.useState<string | null>(null);
  const [formError, setFormError] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!customerName.trim() || !customerPhone.trim() || !vehicleMakeModel.trim()) {
      setFormError("Please provide your name, phone number, and vehicle make/model.");
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      const ref = `YSWB-${Math.floor(100000 + Math.random() * 900000)}`;

      const bookingData = {
        reference: ref,
        service,
        serviceLocation,
        customerName,
        customerEmail,
        customerPhone,
        postcode,
        vehicleMakeModel,
        preferredDate: preferredDate || "Earliest Available",
        notes,
        createdAt: new Date().toISOString(),
        status: "confirmed",
      };

      try {
        const existing = JSON.parse(localStorage.getItem("yswb_recent_bookings") || "[]");
        existing.unshift(bookingData);
        localStorage.setItem("yswb_recent_bookings", JSON.stringify(existing.slice(0, 10)));
      } catch {
        // fallback
      }

      setSubmittedRef(ref);
    } catch {
      setFormError("An unexpected error occurred while submitting your request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="quick-booking"
      className="py-20 md:py-28 relative overflow-hidden bg-surface-secondary border-t border-border/40"
    >
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-amber-500/5 blur-[160px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-primary/5 blur-[140px] pointer-events-none -z-10" />

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Heading, Trust Badges, Info */}
          <div className="lg:col-span-5 space-y-7">
            <div className="space-y-3">
              <Badge variant="warning" dot>
                Online Quote & Mobile Booking
              </Badge>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white leading-tight">
                Request a Mobile Repair Quote
              </h2>
            </div>

            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              We make the repair process convenient and hassle-free. Select your service, tell us whether you prefer a visit to your home or workplace across Birmingham and the West Midlands, and our team will provide a fast, free estimate.
            </p>

            {/* 3 Trust Points */}
            <div className="space-y-3.5 pt-2">
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-surface-card border border-white/[0.08]">
                <ShieldCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white">
                    Free, No-Obligation Quotes
                  </h4>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Clear upfront pricing with no hidden charges or unexpected extras.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-surface-card border border-white/[0.08]">
                <Truck className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white">
                    We Come To Your Home or Workplace
                  </h4>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    No need to drop your car off. Our mobile team carries out the work right outside your door.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-surface-card border border-white/[0.08]">
                <Sparkles className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white">
                    High-Quality Durable Finishes
                  </h4>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    High-grade primers, factory-matched paints, and long-lasting clear coat protection.
                  </p>
                </div>
              </div>
            </div>

            {/* Direct Phone / WhatsApp Quick Strip */}
            <div className="p-4 rounded-2xl bg-surface-tertiary border border-white/[0.08] flex items-center justify-between">
              <div className="text-xs">
                <span className="font-bold text-white block">Prefer to speak directly?</span>
                <span className="text-muted-foreground">Call {siteConfig.contact.phone} or send photos on WhatsApp</span>
              </div>
              <a
                href={`tel:${siteConfig.contact.phoneRaw}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary text-black font-bold text-xs hover:bg-primary/90"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Now</span>
              </a>
            </div>
          </div>

          {/* Right Column: Embedded Interactive Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-3xl bg-surface-card border border-white/[0.1] shadow-luxury-dark relative">
              <AnimatePresence mode="wait">
                {submittedRef ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-10 text-center space-y-5"
                  >
                    <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto text-primary">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>

                    <div className="space-y-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-primary">
                        Quote Request Received
                      </span>
                      <h3 className="text-2xl font-black uppercase text-white font-display">
                        Thank You, {customerName}
                      </h3>
                      <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
                        Your quote reference is <strong className="text-primary font-mono">{submittedRef}</strong>.
                        Our team will contact you shortly via phone or WhatsApp to provide your estimate and arrange a convenient date.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-surface-secondary border border-white/[0.08] max-w-sm mx-auto text-left text-xs space-y-1.5">
                      <div className="flex justify-between text-muted-foreground">
                        <span>Vehicle:</span>
                        <span className="text-white font-medium">{vehicleMakeModel}</span>
                      </div>
                      <div className="flex justify-between text-muted-foreground">
                        <span>Location Preference:</span>
                        <span className="text-white font-medium capitalize">{serviceLocation} Visit ({postcode || "West Midlands"})</span>
                      </div>
                      <div className="flex justify-between text-muted-foreground">
                        <span>Preferred Date:</span>
                        <span className="text-white font-medium">{preferredDate || "Earliest Available"}</span>
                      </div>
                    </div>

                    <div className="pt-3 flex flex-wrap justify-center gap-3">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => {
                          setSubmittedRef(null);
                          setCustomerName("");
                          setCustomerPhone("");
                          setVehicleMakeModel("");
                        }}
                      >
                        Submit Another Request
                      </Button>
                      <a
                        href={siteConfig.links.whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs"
                      >
                        <span>Send Photos on WhatsApp</span>
                      </a>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <h3 className="text-xl font-bold uppercase text-white font-display tracking-tight">
                        Free Mobile Repair Quote
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        Fill in your details for a quick, no-obligation repair estimate.
                      </p>
                    </div>

                    {formError && (
                      <div className="p-3 rounded-xl bg-destructive/15 border border-destructive/30 text-destructive text-xs flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{formError}</span>
                      </div>
                    )}

                    {/* Home vs Workplace Toggle */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Where would you like us to visit?
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => setServiceLocation("home")}
                          className={`p-3 rounded-xl border text-xs font-bold transition-all text-left flex items-center gap-2.5 ${
                            serviceLocation === "home"
                              ? "bg-primary/10 border-primary text-white"
                              : "bg-surface-secondary border-white/[0.08] text-muted-foreground hover:text-white"
                          }`}
                        >
                          <HomeIcon className={`w-4 h-4 ${serviceLocation === "home" ? "text-primary" : "text-muted-foreground"}`} />
                          <div>
                            <span className="block font-bold">Home Visit</span>
                            <span className="text-[10px] text-muted-foreground font-normal">Driveway or Private Parking</span>
                          </div>
                        </button>

                        <button
                          type="button"
                          onClick={() => setServiceLocation("workplace")}
                          className={`p-3 rounded-xl border text-xs font-bold transition-all text-left flex items-center gap-2.5 ${
                            serviceLocation === "workplace"
                              ? "bg-primary/10 border-primary text-white"
                              : "bg-surface-secondary border-white/[0.08] text-muted-foreground hover:text-white"
                          }`}
                        >
                          <Building className={`w-4 h-4 ${serviceLocation === "workplace" ? "text-primary" : "text-muted-foreground"}`} />
                          <div>
                            <span className="block font-bold">Workplace Visit</span>
                            <span className="text-[10px] text-muted-foreground font-normal">Office / Company Car Park</span>
                          </div>
                        </button>
                      </div>
                    </div>

                    {/* Service Selection Dropdown */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Select Required Repair Service
                      </label>
                      <select
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-surface-secondary border border-white/[0.1] text-white text-xs sm:text-sm focus:outline-none focus:border-primary"
                      >
                        {SERVICES_LIST.map((s) => (
                          <option key={s.id} value={s.id} className="bg-[#121620] text-white">
                            {s.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Customer Info row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          Your Full Name *
                        </label>
                        <div className="relative">
                          <User className="w-4 h-4 text-muted-foreground absolute left-3 top-3" />
                          <input
                            type="text"
                            required
                            placeholder="e.g. John Smith"
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                            className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-surface-secondary border border-white/[0.1] text-white text-xs sm:text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          Phone Number *
                        </label>
                        <div className="relative">
                          <Phone className="w-4 h-4 text-muted-foreground absolute left-3 top-3" />
                          <input
                            type="tel"
                            required
                            placeholder="e.g. 07123 456 789"
                            value={customerPhone}
                            onChange={(e) => setCustomerPhone(e.target.value)}
                            className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-surface-secondary border border-white/[0.1] text-white text-xs sm:text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Email and Postcode */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          Email Address
                        </label>
                        <div className="relative">
                          <Mail className="w-4 h-4 text-muted-foreground absolute left-3 top-3" />
                          <input
                            type="email"
                            placeholder="e.g. john@example.co.uk"
                            value={customerEmail}
                            onChange={(e) => setCustomerEmail(e.target.value)}
                            className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-surface-secondary border border-white/[0.1] text-white text-xs sm:text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          Service Postcode (West Midlands)
                        </label>
                        <div className="relative">
                          <MapPin className="w-4 h-4 text-muted-foreground absolute left-3 top-3" />
                          <input
                            type="text"
                            placeholder="e.g. B1, B91, WV1, CV1"
                            value={postcode}
                            onChange={(e) => setPostcode(e.target.value)}
                            className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-surface-secondary border border-white/[0.1] text-white text-xs sm:text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Vehicle Make Model and Preferred Date */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          Vehicle Make & Model *
                        </label>
                        <div className="relative">
                          <Car className="w-4 h-4 text-muted-foreground absolute left-3 top-3" />
                          <input
                            type="text"
                            required
                            placeholder="e.g. BMW 3 Series, Audi A4, VW Golf"
                            value={vehicleMakeModel}
                            onChange={(e) => setVehicleMakeModel(e.target.value)}
                            className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-surface-secondary border border-white/[0.1] text-white text-xs sm:text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          Preferred Appointment Date
                        </label>
                        <div className="relative">
                          <Calendar className="w-4 h-4 text-muted-foreground absolute left-3 top-3" />
                          <input
                            type="date"
                            value={preferredDate}
                            onChange={(e) => setPreferredDate(e.target.value)}
                            className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-surface-secondary border border-white/[0.1] text-white text-xs sm:text-sm focus:outline-none focus:border-primary"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Notes / Damage details */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Damage Description
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Please describe the damage (e.g. 2 kerbed alloys, bumper corner scrape)..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl bg-surface-secondary border border-white/[0.1] text-white text-xs sm:text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      variant="amber"
                      className="w-full py-6 text-sm font-bold shadow-lg"
                    >
                      {isSubmitting ? "Submitting Your Quote..." : "Request Free Repair Quote"}
                    </Button>
                  </form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
