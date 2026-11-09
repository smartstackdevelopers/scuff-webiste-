import * as React from "react";
import Link from "next/link";
import { Sparkles, Home, Calendar, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-electric/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-xl w-full text-center space-y-8 relative z-10">
        {/* Brand Emblem with 404 */}
        <div className="inline-flex items-center justify-center p-4 rounded-3xl bg-card border border-border/80 shadow-2xl relative">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-charcoal-900 border border-electric/40 flex items-center justify-center text-electric">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
            <span className="text-4xl font-extrabold font-mono tracking-tight text-foreground">
              404
            </span>
          </div>
        </div>

        {/* Text */}
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground font-serif tracking-tight">
            Off the Track — Bay Not Found
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto leading-relaxed">
            The vehicle profile, detailing package, or studio resource you are looking for does not exist or has been relocated to another detailing bay.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link href="/">
            <Button size="lg" className="bg-electric text-black hover:bg-electric/90 font-bold gap-2">
              <Home className="w-4 h-4" />
              <span>Return Home</span>
            </Button>
          </Link>

          <Link href="/pricing">
            <Button variant="outline" size="lg" className="gap-2">
              <Calendar className="w-4 h-4 text-electric" />
              <span>View Packages</span>
            </Button>
          </Link>

          <Link href="/contact">
            <Button variant="ghost" size="lg" className="gap-2 text-muted-foreground hover:text-foreground">
              <Phone className="w-4 h-4" />
              <span>Contact Studio</span>
            </Button>
          </Link>
        </div>

        {/* Helpful Shortcuts */}
        <div className="pt-8 border-t border-border/60 text-xs text-muted-foreground">
          <p className="mb-2 font-semibold uppercase tracking-wider text-[10px]">Popular Destinations</p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
            <Link href="/services" className="hover:text-electric transition-colors">Services Catalog</Link>
            <span>•</span>
            <Link href="/gallery" className="hover:text-electric transition-colors">Before & After Showcase</Link>
            <span>•</span>
            <Link href="/booking" className="hover:text-electric transition-colors">Online Booking</Link>
            <span>•</span>
            <Link href="/login" className="hover:text-electric transition-colors">Client Portal</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
