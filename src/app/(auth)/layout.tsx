import * as React from "react";
import Link from "next/link";
import { Sparkles, ArrowLeft, ShieldCheck } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/container";
import { ThemeToggle } from "@/components/common/theme-toggle";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-background text-foreground relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-gradient-to-b from-electric/15 to-transparent blur-3xl pointer-events-none -z-10" />

      {/* Top Header */}
      <header className="w-full py-6">
        <Container>
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>

            <Link href="/" className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-charcoal-900 border border-electric/40 text-electric-cyan">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="text-sm font-black tracking-wider uppercase text-foreground">
                {siteConfig.name}
              </span>
            </Link>

            <ThemeToggle />
          </div>
        </Container>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 my-auto">
        <div className="w-full max-w-md">{children}</div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-xs text-muted-foreground border-t border-border/40">
        <Container>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-electric" />
              <span>Encrypted SSL 256-Bit Authentication Bay</span>
            </span>
            <span>© {new Date().getFullYear()} {siteConfig.name}</span>
          </div>
        </Container>
      </footer>
    </div>
  );
}
