"use client";

import * as React from "react";
import Link from "next/link";
import {
  ChevronDown,
  Sparkles,
  Car,
  Wrench,
  ShieldCheck,
  Zap,
  PlusCircle,
  ArrowRight,
  PaintBucket,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { NavItem } from "@/types";
import { useLanguage } from "@/lib/i18n/language-context";
import { cn } from "@/lib/utils";

interface ServicesDropdownProps {
  item: NavItem;
  isActive: boolean;
  label?: string;
  onNavigate?: () => void;
}

export function ServicesDropdown({
  item,
  isActive,
  label,
  onNavigate,
}: ServicesDropdownProps) {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const getIcon = (iconName?: string) => {
    switch (iconName) {
      case "PaintBucket":
        return <PaintBucket className="w-4 h-4 text-electric" />;
      case "Sparkles":
        return <Sparkles className="w-4 h-4 text-electric" />;
      case "Car":
        return <Car className="w-4 h-4 text-electric" />;
      case "Wrench":
        return <Wrench className="w-4 h-4 text-electric" />;
      case "ShieldCheck":
        return <ShieldCheck className="w-4 h-4 text-electric-cyan" />;
      case "Zap":
        return <Zap className="w-4 h-4 text-amber-500" />;
      case "PlusCircle":
        return <PlusCircle className="w-4 h-4 text-muted-foreground" />;
      default:
        return <Wrench className="w-4 h-4 text-electric" />;
    }
  };

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setIsOpen(false), 160);
  };

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleKeyDown);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const title = label ?? t(item.translationKey, item.title);

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="inline-flex items-center">
        <Link
          href={item.href}
          className={cn(
            "inline-flex items-center px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-l-lg select-none",
            isActive || isOpen
              ? "text-foreground font-semibold"
              : "text-muted-foreground hover:text-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric"
          )}
        >
          {title}
        </Link>
        <button
          type="button"
          onClick={() => setIsOpen((v) => !v)}
          aria-expanded={isOpen}
          aria-haspopup="true"
          aria-label={`${title} menu`}
          className={cn(
            "inline-flex items-center justify-center h-9 w-7 -ml-1 rounded-r-lg transition-colors",
            isActive || isOpen
              ? "text-foreground"
              : "text-muted-foreground hover:text-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric"
          )}
        >
          <ChevronDown
            className={cn(
              "w-3.5 h-3.5 transition-transform duration-200",
              isOpen && "rotate-180 text-electric"
            )}
          />
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute left-1/2 -translate-x-1/2 top-full mt-1.5 w-[min(580px,calc(100vw-2rem))] rounded-2xl border border-border dark:border-primary/30 bg-white dark:bg-[#0B0E14] p-4 shadow-2xl z-50 text-foreground"
          >
            <div className="flex items-center justify-between pb-3 mb-2 border-b border-border/60 px-2">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                {t("navServicesMenu")}
              </span>
              <Link
                href="/services"
                onClick={() => {
                  setIsOpen(false);
                  onNavigate?.();
                }}
                className="text-xs font-semibold text-electric hover:underline flex items-center gap-1"
              >
                <span>{t("navViewAllServices")}</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {item.children?.map((sub) => (
                <Link
                  key={sub.href}
                  href={sub.href}
                  onClick={() => {
                    setIsOpen(false);
                    onNavigate?.();
                  }}
                  className="flex items-start gap-3 p-2.5 rounded-xl transition-all duration-150 hover:bg-secondary/70 group"
                >
                  <div className="p-2 rounded-lg bg-secondary border border-border/70 shrink-0 group-hover:border-electric/40 transition-colors">
                    {getIcon(sub.iconName)}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-foreground group-hover:text-electric transition-colors leading-tight truncate">
                        {t(sub.translationKey, sub.title)}
                      </span>
                      {sub.badge && (
                        <span className="px-1.5 py-0.5 text-[9px] font-bold rounded-full bg-electric/15 text-electric-cyan border border-electric/30 uppercase tracking-wider shrink-0">
                          {sub.badge}
                        </span>
                      )}
                    </div>
                    {sub.description && (
                      <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5 leading-snug">
                        {sub.description}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-3 pt-3 border-t border-border/60 px-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-primary/5 -mx-2 -mb-2 p-3 rounded-b-xl">
              <span className="text-xs text-muted-foreground font-medium">
                {t("navBespokeQuote")}
              </span>
              <Link
                href="/contact"
                onClick={() => {
                  setIsOpen(false);
                  onNavigate?.();
                }}
                className="text-xs font-bold text-foreground hover:text-electric transition-colors"
              >
                {t("navContactTechs")}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
