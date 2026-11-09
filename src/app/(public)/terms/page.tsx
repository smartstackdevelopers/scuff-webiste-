import * as React from "react";
import Link from "next/link";
import { FileText, ArrowLeft, ShieldCheck, Scale, Award } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { CinematicVideoHero } from "@/components/common/cinematic-video-hero";

export const metadata = {
  title: "Terms & Conditions | You Scuff We Buff",
  description: "Standard automotive service agreement, booking conditions, and ceramic warranty terms.",
};

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground transition-colors duration-200">
      <CinematicVideoHero
        videoSrc="/videos/hero/03-car-drive.mp4"
        posterSrc="https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?q=80&w=2000&auto=format&fit=crop"
        badgeText="Standard Automotive Service Agreement"
        badgeIcon={<Scale className="w-3.5 h-3.5" />}
        badgeVariant="electric"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Terms & Conditions" },
        ]}
        title={
          <>
            TERMS & CONDITIONS OF <br className="hidden sm:inline" />
            <span className="text-gradient-electric">AUTOMOTIVE SERVICE.</span>
          </>
        }
        subtitle="Applicable to all UK studio detailing, SMART bumper repairs, CNC alloy refurbishments, and mobile van appointments."
        align="center"
        minHeightClass="min-h-[46vh] sm:min-h-[52vh]"
        metrics={[
          { label: "Motor Trade Cover", value: "£5,000,000", icon: <ShieldCheck className="w-4 h-4" /> },
          { label: "Cancellation Policy", value: "48h Notice", icon: <FileText className="w-4 h-4" /> },
          { label: "Coating Warranty", value: "Up to 5 Yrs", icon: <Award className="w-4 h-4" /> },
        ]}
      />

      <div className="py-16 sm:py-24 space-y-12 bg-surface-secondary border-t border-border transition-colors duration-200">
        <Container className="max-w-5xl xl:max-w-6xl">
          <div className="space-y-8 text-sm text-muted-foreground leading-relaxed bg-surface-card p-6 sm:p-10 rounded-3xl border border-border shadow-sm">
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-foreground font-display uppercase tracking-wider">1. Vehicle Pre-Inspection Protocol</h2>
              <p>
                Prior to commencing any wash, compounding, machine paint correction, or coating procedure, our certified technician conducts a thorough photographic and paint depth assessment. Any pre-existing stone chips, deep clear-coat scratches, bumper scuffs, or repainted panels will be formally documented.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-foreground font-display uppercase tracking-wider">2. Booking, Deposits & Rescheduling</h2>
              <ul className="list-disc pl-5 space-y-1.5 text-muted-foreground">
                <li>Bookings require an authorized payment card or booking deposit to secure technician bay time.</li>
                <li>Clients may reschedule without penalty up to 48 hours prior to the scheduled start time.</li>
                <li>Cancellations within 24 hours of mobile dispatch may incur a late cancellation fee to cover allocated travel and bay preparation costs.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-foreground font-display uppercase tracking-wider">3. Ceramic & Graphene Coating Warranty</h2>
              <p>
                Our 5-Year Ceramic Guarantee warrants against clear coat oxidation, UV paint fading, and premature degradation of the hydrophobic shield, provided that the vehicle is maintained according to our recommended safe wash procedures and receives an annual inspection check at our studio.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-foreground font-display uppercase tracking-wider">4. Liability & Motor Trade Insurance</h2>
              <p>
                {siteConfig.name} holds £5,000,000 comprehensive public liability and specialized motor trade insurance. In the extraordinary event of mechanical or cosmetic defect caused directly by our equipment or personnel, repairs will be remediated to factory specification by certified coachbuilders.
              </p>
            </section>

            <div className="pt-6 border-t border-border flex items-center justify-between">
              <Link href="/">
                <Button variant="outline" size="sm" className="gap-2 border-border text-foreground">
                  <ArrowLeft className="w-4 h-4" />
                  <span>Return to Homepage</span>
                </Button>
              </Link>
              <Link href="/privacy" className="text-xs text-primary font-bold hover:underline">
                View Privacy Policy →
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
