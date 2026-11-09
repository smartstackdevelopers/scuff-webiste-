"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  X,
  ChevronDown,
  Calendar,
  User,
  Phone,
  Mail,
  ArrowRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { MAIN_NAV_ITEMS } from "@/constants/navigation";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/common/theme-toggle";
import { LanguageToggle } from "@/components/common/language-toggle";
import { BrandLogo } from "@/components/brand/brand-logo";
import { useLanguage } from "@/lib/i18n/language-context";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const pathname = usePathname();
  const { t } = useLanguage();
  const [servicesExpanded, setServicesExpanded] = React.useState(false);

  React.useEffect(() => {
    if (isOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [isOpen]);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-md"
            aria-hidden="true"
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
            className="fixed inset-y-0 right-0 w-full max-w-sm bg-card border-l border-border/80 p-6 flex flex-col justify-between overflow-y-auto shadow-luxury-dark"
          >
            <div>
              <div className="flex items-center justify-between pb-5 border-b border-border/70">
                <div onClick={onClose}>
                  <BrandLogo size="sm" href="/" />
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                  aria-label={t("commonClose")}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="py-6 space-y-1" aria-label="Mobile navigation">
                {MAIN_NAV_ITEMS.map((item) => {
                  const isActive =
                    item.href === "/"
                      ? pathname === "/"
                      : pathname === item.href ||
                        pathname.startsWith(`${item.href}/`);
                  const hasChildren = Boolean(
                    item.children && item.children.length > 0
                  );
                  const label = t(item.translationKey, item.title);

                  if (hasChildren) {
                    return (
                      <div key={item.href} className="space-y-1">
                        <div className="flex items-center gap-1">
                          <Link
                            href={item.href}
                            onClick={onClose}
                            className={cn(
                              "flex-1 px-3 py-2.5 rounded-xl text-base font-semibold transition-colors",
                              isActive
                                ? "text-electric bg-primary/10"
                                : "text-foreground hover:bg-secondary"
                            )}
                          >
                            {label}
                          </Link>
                          <button
                            type="button"
                            onClick={() =>
                              setServicesExpanded(!servicesExpanded)
                            }
                            className="p-2.5 rounded-xl text-muted-foreground hover:bg-secondary"
                            aria-expanded={servicesExpanded}
                            aria-label={`${label} submenu`}
                          >
                            <ChevronDown
                              className={cn(
                                "w-4 h-4 transition-transform duration-200",
                                servicesExpanded && "rotate-180"
                              )}
                            />
                          </button>
                        </div>

                        <AnimatePresence>
                          {servicesExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="pl-4 pr-1 py-1 space-y-1 overflow-hidden"
                            >
                              <Link
                                href="/services"
                                onClick={onClose}
                                className="block px-3 py-2 text-xs font-bold uppercase tracking-wider text-electric hover:underline"
                              >
                                {t("navViewAllServices")} →
                              </Link>
                              {item.children?.map((sub) => (
                                <Link
                                  key={sub.href}
                                  href={sub.href}
                                  onClick={onClose}
                                  className="block px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/70 transition-colors"
                                >
                                  <div className="flex items-center justify-between gap-2">
                                    <span>
                                      {t(sub.translationKey, sub.title)}
                                    </span>
                                    {sub.badge && (
                                      <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-electric/15 text-electric-cyan font-bold uppercase shrink-0">
                                        {sub.badge}
                                      </span>
                                    )}
                                  </div>
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
                      className={cn(
                        "flex items-center justify-between px-3 py-2.5 rounded-xl text-base font-semibold transition-colors",
                        isActive
                          ? "text-electric bg-primary/10 font-bold"
                          : "text-foreground hover:bg-secondary"
                      )}
                    >
                      <span>{label}</span>
                      <ArrowRight className="w-4 h-4 opacity-40" />
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="pt-6 border-t border-border/70 space-y-4">
              <div className="flex items-center justify-between px-1 gap-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {t("langToggle")}
                </span>
                <LanguageToggle />
              </div>

              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {t("themeToggle")}
                </span>
                <ThemeToggle />
              </div>

              <div className="space-y-2.5">
                <Link href="/booking" onClick={onClose} className="block w-full">
                  <Button
                    variant="glow"
                    size="lg"
                    className="w-full"
                    leftIcon={<Calendar className="w-4 h-4" />}
                  >
                    {t("navBookNow")}
                  </Button>
                </Link>

                <Link href="/login" onClick={onClose} className="block w-full">
                  <Button
                    variant="outline"
                    size="default"
                    className="w-full"
                    leftIcon={<User className="w-4 h-4" />}
                  >
                    {t("navLogin")}
                  </Button>
                </Link>
              </div>

              <div className="pt-2 text-xs text-muted-foreground space-y-1.5">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-electric shrink-0" />
                  <span>{siteConfig.contact.phonePlaceholder}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-electric shrink-0" />
                  <span className="truncate">
                    {siteConfig.contact.emailPlaceholder}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
