"use client";

import * as React from "react";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Sparkles,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { BrandLogo } from "@/components/brand/brand-logo";
import { siteConfig } from "@/config/site";
import {
  MAIN_NAV_ITEMS,
  FOOTER_SERVICES,
  FOOTER_LEGAL,
} from "@/constants/navigation";
import { useLanguage } from "@/lib/i18n/language-context";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <footer className="w-full border-t border-white/[0.08] bg-[#07080A] text-foreground transition-colors duration-200">
      <Container>
        <div className="py-14 md:py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          <div className="space-y-4">
            <BrandLogo size="md" />

            <div className="text-xs uppercase tracking-wider text-primary font-bold">
              Mobile Alloy Wheel Repair & Refurbishment
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              {siteConfig.description}
            </p>

            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/25 text-primary text-xs font-semibold">
              <Sparkles className="w-4 h-4 shrink-0" />
              <span>Family-Run & Mobile Across the West Midlands</span>
            </div>

            <div className="pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2.5">
                Follow Our Work
              </span>
              <div className="flex items-center gap-2.5">
                <a
                  href={siteConfig.links.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-secondary/80 border border-border/80 text-slate-400 hover:text-primary hover:border-primary/40 transition-colors"
                  aria-label="You Scuff We Buff on Instagram"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a
                  href={siteConfig.links.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-secondary/80 border border-border/80 text-slate-400 hover:text-primary hover:border-primary/40 transition-colors"
                  aria-label="You Scuff We Buff on TikTok"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white border-b border-white/[0.08] pb-2">
              Quick Navigation
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-300">
              {MAIN_NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="hover:text-primary transition-colors hover:underline underline-offset-4"
                  >
                    {t(item.translationKey, item.title)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white border-b border-white/[0.08] pb-2">
              Specialist Services
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-300">
              {FOOTER_SERVICES.map((serv) => (
                <li key={serv.href}>
                  <Link
                    href={serv.href}
                    className="hover:text-primary transition-colors hover:underline underline-offset-4"
                  >
                    {t(serv.translationKey, serv.title)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white border-b border-white/[0.08] pb-2">
              Contact & Coverage
            </h4>
            <div className="space-y-3 text-sm text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span className="leading-snug text-xs">
                  Birmingham, Solihull, Wolverhampton, Walsall, Dudley, Sandwell, Coventry & West Midlands
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <a
                  href={siteConfig.contact.phoneTel}
                  className="font-bold text-white hover:text-primary transition-colors"
                >
                  {siteConfig.contact.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <a
                  href={siteConfig.contact.emailMailto}
                  className="truncate text-slate-300 hover:text-primary transition-colors"
                >
                  {siteConfig.contact.email}
                </a>
              </div>
              <div className="flex items-start gap-2.5 pt-1">
                <Clock className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span className="text-xs leading-relaxed text-slate-400">
                  {siteConfig.contact.businessHoursPlaceholder}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/[0.08] py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © {currentYear} {siteConfig.name}. Family-Run Mobile Alloy Wheel Repair & SMART Repairs.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            {FOOTER_LEGAL.map((legal) => (
              <Link
                key={legal.href}
                href={legal.href}
                className="hover:text-primary transition-colors hover:underline"
              >
                {t(legal.translationKey, legal.title)}
              </Link>
            ))}
          </div>

          <p className="text-[11px] tracking-wide uppercase text-slate-500">
            Birmingham & West Midlands Mobile Service
          </p>
        </div>
      </Container>
    </footer>
  );
}
