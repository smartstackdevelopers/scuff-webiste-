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
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const SERVICES_LIST = [
  { id: "alloy-wheel-refurbishment", name: "Alloy Wheel Refurbishment (Diamond Cut / Powder)", price: "From £75" },
  { id: "smart-repairs", name: "SMART Bumper Scuff & Scratch Repair", price: "From £120" },
  { id: "paint-correction", name: "Multi-Stage Paint Correction & Gloss Restoration", price: "From £280" },
  { id: "ceramic-coating", name: "9H Ceramic & Graphene Coating (5-Year)", price: "From £450" },
  { id: "interior-detailing", name: "Deep Interior Steam Sanitization & Leather Care", price: "From £95" },
  { id: "mobile-repairs", name: "Mobile Van Service (Home or Workplace Visit)", price: "Quote Assessed" },
];

export function HomeBookingSection() {
  const [service, setService] = React.useState(SERVICES_LIST[0].id);
  const [serviceLocation, setServiceLocation] = React.useState<"studio" | "mobile">("mobile");
  const [customerName, setCustomerName] = React.useState("");
  const [customerEmail, setCustomerEmail] = React.useState("");
  const [customerPhone, setCustomerPhone] = React.useState("");
  const [vehicleMakeModel, setVehicleMakeModel] = React.useState("");
  const [vehicleReg, setVehicleReg] = React.useState("");
  const [preferredDate, setPreferredDate] = React.useState("");
  const [preferredTime, setPreferredTime] = React.useState("morning");
  const [notes, setNotes] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submittedRef, setSubmittedRef] = React.useState<string | null>(null);
  const [formError, setFormError] = React.useState<string | null>(null);

  // Set default minimum date to tomorrow
  const minDate = React.useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split("T")[0];
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!customerName.trim() || !customerPhone.trim() || !vehicleMakeModel.trim()) {
      setFormError("Please provide your name, phone number, and vehicle make/model.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate real dispatch preparation
      await new Promise((resolve) => setTimeout(resolve, 900));
      const ref = `YSWB-${Math.floor(100000 + Math.random() * 900000)}`;

      // Save to local storage for persistence across portal
      const bookingData = {
        reference: ref,
        service,
        serviceLocation,
        customerName,
        customerEmail,
        customerPhone,
        vehicleMakeModel,
        vehicleReg,
        preferredDate: preferredDate || "Earliest Available",
        preferredTime,
        notes,
        createdAt: new Date().toISOString(),
        status: "confirmed",
      };

      try {
        const existing = JSON.parse(localStorage.getItem("yswb_recent_bookings") || "[]");
        existing.unshift(bookingData);
        localStorage.setItem("yswb_recent_bookings", JSON.stringify(existing.slice(0, 10)));
      } catch {
        // local storage fallback
      }

      setSubmittedRef(ref);
    } catch {
      setFormError("An unexpected error occurred while reserving your slot. Please try again.");
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
                Online Booking & Estimate
              </Badge>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white leading-tight">
                Reserve Your Appointment or Request an Estimate
              </h2>
            </div>

            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              Skip phone queues. Choose your required service, indicate whether you prefer our
              dedicated studio cleanroom bay or our fully equipped mobile van at your doorstep,
              and our dispatch coordinator will lock in your slot.
            </p>

            {/* 3 Trust Points */}
            <div className="space-y-3.5 pt-2">
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-surface-card border border-white/[0.08]">
                <ShieldCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white">
                    Zero Upfront Deposit Required
                  </h4>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Pay upon completion once you inspect the workmanship with our technician.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-surface-card border border-white/[0.08]">
                <MapPin className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white">
                    Fully Self-Sufficient Mobile Fleet
                  </h4>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Our vans bring their own onboard power and filtered soft water. No plugs needed.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-surface-card border border-white/[0.08]">
                <Sparkles className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white">
                    Lifetime Workmanship Guarantee
                  </h4>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Paint and SMART clearcoats are fully backed against peeling, fading, and flaking.
                  </p>
                </div>
              </div>
            </div>

            {/* Deep Multi-Step Wizard Link */}
            <div className="pt-2 p-4 rounded-2xl bg-surface-tertiary border border-white/[0.08] flex items-center justify-between">
              <div className="text-xs">
                <span className="font-bold text-white block">Need comprehensive package comparison?</span>
                <span className="text-muted-foreground">Use our interactive multi-step booking wizard</span>
              </div>
              <Link href="/booking">
                <Button variant="outline" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                  Open Wizard
                </Button>
              </Link>
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
                        Booking Confirmed
                      </span>
                      <h3 className="text-2xl font-black uppercase text-white font-display">
                        Appointment Slot Reserved
                      </h3>
                      <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
                        Thank you <strong className="text-white">{customerName}</strong>. Your reference
                        number is <strong className="text-primary font-mono">{submittedRef}</strong>.
                        Our UK dispatch technician will reach out via WhatsApp/phone to confirm the exact bay or arrival window.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-surface-secondary border border-white/[0.08] max-w-sm mx-auto text-left text-xs space-y-1.5">
                      <div className="flex justify-between text-muted-foreground">
                        <span>Vehicle:</span>
                        <span className="text-white font-medium">{vehicleMakeModel} ({vehicleReg || "N/A"})</span>
                      </div>
                      <div className="flex justify-between text-muted-foreground">
                        <span>Location Mode:</span>
                        <span className="text-white font-medium capitalize">{serviceLocation}</span>
                      </div>
                      <div className="flex justify-between text-muted-foreground">
                        <span>Requested Date:</span>
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
                        Submit Another Inquiry
                      </Button>
                      <Link href="/customer/dashboard">
                        <Button variant="default" size="sm">
                          View Customer Dashboard
                        </Button>
                      </Link>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <h3 className="text-xl font-bold uppercase text-white font-display tracking-tight">
                        Instant Booking Form
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        Fill in your details below to lock in an appointment or mobile van visit.
                      </p>
                    </div>

                    {formError && (
                      <div className="p-3 rounded-xl bg-destructive/15 border border-destructive/30 text-destructive text-xs flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{formError}</span>
                      </div>
                    )}

                    {/* Studio vs Mobile Toggle */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Service Location Option
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => setServiceLocation("mobile")}
                          className={`p-3 rounded-xl border text-xs font-bold transition-all text-left flex items-center gap-2.5 ${
                            serviceLocation === "mobile"
                              ? "bg-primary/10 border-primary text-white"
                              : "bg-surface-secondary border-white/[0.08] text-muted-foreground hover:text-white"
                          }`}
                        >
                          <MapPin className={`w-4 h-4 ${serviceLocation === "mobile" ? "text-primary" : "text-muted-foreground"}`} />
                          <div>
                            <span className="block font-bold">Mobile Van Service</span>
                            <span className="text-[10px] text-muted-foreground font-normal">At Your Home or Office</span>
                          </div>
                        </button>

                        <button
                          type="button"
                          onClick={() => setServiceLocation("studio")}
                          className={`p-3 rounded-xl border text-xs font-bold transition-all text-left flex items-center gap-2.5 ${
                            serviceLocation === "studio"
                              ? "bg-primary/10 border-primary text-white"
                              : "bg-surface-secondary border-white/[0.08] text-muted-foreground hover:text-white"
                          }`}
                        >
                          <Car className={`w-4 h-4 ${serviceLocation === "studio" ? "text-primary" : "text-muted-foreground"}`} />
                          <div>
                            <span className="block font-bold">Studio Lighting Bay</span>
                            <span className="text-[10px] text-muted-foreground font-normal">Dedicated Cleanroom</span>
                          </div>
                        </button>
                      </div>
                    </div>

                    {/* Service Selection Dropdown */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Select Primary Service
                      </label>
                      <select
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-surface-secondary border border-white/[0.1] text-white text-xs sm:text-sm focus:outline-none focus:border-primary"
                      >
                        {SERVICES_LIST.map((s) => (
                          <option key={s.id} value={s.id} className="bg-[#121620] text-white">
                            {s.name} ({s.price})
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
                            placeholder="e.g. James Harrison"
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
                            placeholder="e.g. 07700 900123"
                            value={customerPhone}
                            onChange={(e) => setCustomerPhone(e.target.value)}
                            className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-surface-secondary border border-white/[0.1] text-white text-xs sm:text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Vehicle details row */}
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
                            placeholder="e.g. BMW M3 Competition"
                            value={vehicleMakeModel}
                            onChange={(e) => setVehicleMakeModel(e.target.value)}
                            className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-surface-secondary border border-white/[0.1] text-white text-xs sm:text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          Vehicle Reg (UK Plate)
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. BU77 SCU"
                          value={vehicleReg}
                          onChange={(e) => setVehicleReg(e.target.value.toUpperCase())}
                          className="w-full px-3.5 py-2 rounded-xl bg-surface-secondary border border-white/[0.1] text-white text-xs sm:text-sm uppercase placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary tracking-wider"
                        />
                      </div>
                    </div>

                    {/* Date and Time preference row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          Preferred Appointment Date
                        </label>
                        <div className="relative">
                          <Calendar className="w-4 h-4 text-muted-foreground absolute left-3 top-3" />
                          <input
                            type="date"
                            min={minDate}
                            value={preferredDate}
                            onChange={(e) => setPreferredDate(e.target.value)}
                            className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-surface-secondary border border-white/[0.1] text-white text-xs sm:text-sm focus:outline-none focus:border-primary"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          Preferred Time Window
                        </label>
                        <select
                          value={preferredTime}
                          onChange={(e) => setPreferredTime(e.target.value)}
                          className="w-full px-3.5 py-2 rounded-xl bg-surface-secondary border border-white/[0.1] text-white text-xs sm:text-sm focus:outline-none focus:border-primary"
                        >
                          <option value="morning">Morning (08:30 - 12:00)</option>
                          <option value="afternoon">Afternoon (12:30 - 16:30)</option>
                          <option value="flexible">Flexible / Any Available</option>
                        </select>
                      </div>
                    </div>

                    {/* Submit CTA button with warm amber/gold styling accent */}
                    <div className="pt-2">
                      <Button
                        type="submit"
                        variant="amber"
                        size="lg"
                        isLoading={isSubmitting}
                        className="w-full shadow-lg"
                        rightIcon={<Calendar className="w-4 h-4" />}
                      >
                        Confirm Appointment Booking
                      </Button>
                      <p className="text-[11px] text-muted-foreground text-center mt-2">
                        No payment taken now • Instant reservation • Confirmed within 30 mins
                      </p>
                    </div>
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
