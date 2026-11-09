import * as React from "react";
import Link from "next/link";
import { Cookie, ArrowLeft, ShieldCheck, Database, Sliders } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { CinematicVideoHero } from "@/components/common/cinematic-video-hero";

export const metadata = {
  title: "Cookie Policy | You Scuff We Buff",
  description: "Information regarding cookie utilization, analytics telemetry, and session state persistence.",
};

export default function CookiesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground transition-colors duration-200">
      <CinematicVideoHero
        imageSrc="https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?q=80&w=2000&auto=format&fit=crop"
        imageAlt="Cookie policy and website preferences"
        badgeText="Digital Transparency & Session Security"
        badgeIcon={<Cookie className="w-3.5 h-3.5" />}
        badgeVariant="electric"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Cookie Policy" },
        ]}
        title={
          <>
            COOKIE POLICY & <br className="hidden sm:inline" />
            <span className="text-gradient-electric">SESSION TELEMETRY.</span>
          </>
        }
        subtitle="Transparent guidelines on how cookies, encrypted tokens, and local storage maintain your booking sessions and theme preferences."
        align="center"
        minHeightClass="min-h-[46vh] sm:min-h-[52vh]"
        metrics={[
          { label: "Essential Cookies", value: "Session Only", icon: <Database className="w-4 h-4" /> },
          { label: "Third-Party Trackers", value: "Zero Ad Tech", icon: <ShieldCheck className="w-4 h-4" /> },
          { label: "User Control", value: "Full Toggle", icon: <Sliders className="w-4 h-4" /> },
        ]}
      />

      <div className="py-16 sm:py-24 space-y-12 bg-surface-secondary border-t border-border transition-colors duration-200">
        <Container className="max-w-5xl xl:max-w-6xl">
          <div className="space-y-8 text-sm text-muted-foreground leading-relaxed bg-surface-card p-6 sm:p-10 rounded-3xl border border-border shadow-sm">
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-foreground font-display uppercase tracking-wider">1. What Are Cookies?</h2>
              <p>
                Cookies are small encrypted text tokens stored on your device when navigating digital web platforms. They assist our platform in remembering your authentication session, chosen vehicle in the booking wizard, and theme mode (dark/light).
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-foreground font-display uppercase tracking-wider">2. Categories of Cookies We Deploy</h2>
              <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                <li><strong>Strictly Necessary:</strong> Essential for secure account logins, CSRF token validation, and shopping cart persistence during detailing checkout.</li>
                <li><strong>Preferences & Customization:</strong> Memorizes whether you selected Dark Mode, Light Mode, or Auto System Theme, as well as preferred language (English or Urdu).</li>
                <li><strong>Performance & Telemetry:</strong> Anonymised visitor analytics tracking page latency and conversion flow without collecting identifying IP addresses.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-foreground font-display uppercase tracking-wider">3. Managing Your Preferences</h2>
              <p>
                You can adjust or disable non-essential cookies via your browser settings at any point. Note that disabling strictly necessary cookies may impair online booking functionality.
              </p>
            </section>

            <div className="pt-8 border-t border-border flex items-center justify-between">
              <Link href="/">
                <Button variant="outline" size="sm" className="gap-2 border-border text-foreground">
                  <ArrowLeft className="w-4 h-4" />
                  <span>Return Home</span>
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
