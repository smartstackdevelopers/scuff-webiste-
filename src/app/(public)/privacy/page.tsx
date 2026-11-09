import * as React from "react";
import Link from "next/link";
import { ShieldCheck, ArrowLeft, Lock } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { CinematicVideoHero } from "@/components/common/cinematic-video-hero";

export const metadata = {
  title: "Privacy & Data Protection Policy | You Scuff We Buff",
  description: "UK GDPR compliance, client vehicle record security, and booking data handling.",
};

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#07080A]">
      <CinematicVideoHero
        videoSrc="/videos/hero/03-car-drive.mp4"
        posterSrc="https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?q=80&w=2000&auto=format&fit=crop"
        badgeText="UK GDPR & Automotive Data Protection"
        badgeIcon={<ShieldCheck className="w-3.5 h-3.5" />}
        badgeVariant="electric"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Privacy Policy" },
        ]}
        title={
          <>
            PRIVACY & VEHICLE <br className="hidden sm:inline" />
            <span className="text-gradient-electric">DATA PROTECTION.</span>
          </>
        }
        subtitle="How we safeguard your personal information, vehicle diagnostics, high-resolution inspection imagery, and payment records."
        align="center"
        minHeightClass="min-h-[46vh] sm:min-h-[52vh]"
        metrics={[
          { label: "Compliance", value: "UK GDPR / DPA 2018", icon: <ShieldCheck className="w-4 h-4" /> },
          { label: "Data Security", value: "TLS 1.3 Encryption", icon: <Lock className="w-4 h-4" /> },
          { label: "Jurisdiction", value: "England & Wales", icon: <ShieldCheck className="w-4 h-4" /> },
        ]}
      />

      <div className="py-16 sm:py-24 space-y-12 bg-[#0C0F15]">
        <Container className="max-w-4xl">
          <div className="space-y-8 text-sm text-slate-300 leading-relaxed bg-surface-card p-6 sm:p-10 rounded-3xl border border-white/[0.08] shadow-luxury-dark">
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white font-display uppercase tracking-wider">1. Introduction & Commitment</h2>
              <p>
                At {siteConfig.name} (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;), we take your privacy and the confidentiality of your personal and automotive data with the utmost seriousness. This Privacy Policy outlines how we collect, store, process, and protect your information when using our website, booking our mobile detailing vans, or visiting our master detailing studio.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white font-display uppercase tracking-wider">2. Data We Collect</h2>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
                <li><strong>Contact Information:</strong> Full name, billing address, email address, and telephone number.</li>
                <li><strong>Automotive Specifications:</strong> Vehicle registration mark (VRM), make, model, paint code, factory finish type, and documented pre-existing scratch/scuff conditions.</li>
                <li><strong>Service & Diagnostic Records:</strong> Ultrasonic paint depth gauge readings, high-resolution before/after vehicle photography, and ceramic warranty registration numbers.</li>
                <li><strong>Transaction Data:</strong> Invoice records, payment confirmation tokens (processed securely via PCI-DSS compliant gateways; we never store raw card numbers).</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white font-display uppercase tracking-wider">3. Vehicle Photography & Showcase Usage</h2>
              <p>
                During inspection and detailing transformations, our technicians capture photographic records of your vehicle. For gallery showcase or promotional publishing, all vehicle registration plates and identifying owner marks are digitally anonymised and obscured unless explicit written authorization has been granted by the client.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white font-display uppercase tracking-wider">4. Data Security & Retention</h2>
              <p>
                All customer profiles and vehicle diagnostics are transmitted over TLS 1.3 encryption and stored in secure UK/EU data centers conforming to ISO 27001 standards. We retain maintenance records for up to 6 years to service 5-Year Ceramic Coating warranty validations.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white font-display uppercase tracking-wider">5. Your Legal Rights</h2>
              <p>
                Under the UK General Data Protection Regulation (UK GDPR), you retain the right to access, rectify, or request erasure of your personal data at any time. For all data subject inquiries, contact our Data Protection Officer at: <a href={`mailto:${siteConfig.contact.emailPlaceholder}`} className="text-primary hover:underline">{siteConfig.contact.emailPlaceholder}</a>.
              </p>
            </section>

            <div className="pt-6 border-t border-white/[0.08] flex items-center justify-between">
              <Link href="/">
                <Button variant="outline" size="sm" className="gap-2 border-white/[0.12] text-white">
                  <ArrowLeft className="w-4 h-4" />
                  <span>Return to Homepage</span>
                </Button>
              </Link>
              <Link href="/terms" className="text-xs text-primary font-bold hover:underline">
                View Terms of Service →
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
