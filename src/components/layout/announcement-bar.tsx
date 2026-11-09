"use client";

import * as React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/container";
import { useLanguage } from "@/lib/i18n/language-context";

export function AnnouncementBar() {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = React.useState(
    siteConfig.announcement.enabled
  );

  if (!isVisible || !siteConfig.announcement.enabled) {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="relative bg-surface-secondary dark:bg-gradient-to-r dark:from-[#0B0E14] dark:via-primary/20 dark:to-[#0B0E14] border-b border-border text-foreground py-1.5 sm:py-2 text-xs overflow-hidden z-40 select-none transition-colors duration-200"
        >
          <Container>
            <div className="flex items-center justify-between gap-1.5 sm:gap-4">
              <div className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2.5 text-center min-w-0 overflow-hidden">
                <span className="inline-flex items-center gap-1 px-1.5 sm:px-2 py-0.5 rounded-full bg-electric/20 text-electric-cyan text-[9px] sm:text-[10px] font-black uppercase tracking-wider shrink-0 border border-electric/30">
                  <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                  {t("announcementBadge")}
                </span>

                <span className="truncate text-muted-foreground font-medium text-[11px] sm:text-xs">
                  <span className="hidden sm:inline">{t("announcementText")}</span>
                  <span className="sm:hidden">{t("announcementMobile")}</span>
                </span>

                {siteConfig.announcement.ctaHref && (
                  <Link
                    href={siteConfig.announcement.ctaHref}
                    className="hidden xs:inline-flex items-center gap-1 font-bold text-foreground hover:text-electric transition-colors underline-offset-4 hover:underline shrink-0 text-[11px] sm:text-xs"
                  >
                    <span>{t("viewPackages")}</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                )}
              </div>

              <button
                type="button"
                onClick={() => setIsVisible(false)}
                className="text-muted-foreground hover:text-foreground p-1 rounded-md transition-colors shrink-0"
                aria-label={t("dismiss")}
              >
                <X className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </button>
            </div>
          </Container>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
