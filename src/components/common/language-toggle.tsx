"use client";

import * as React from "react";
import { Check, ChevronDown, Globe, Search } from "lucide-react";
import { LANGUAGES, useLanguage } from "@/lib/i18n/language-context";
import { getLanguageMeta, type Language } from "@/lib/i18n/languages";
import { cn } from "@/lib/utils";

interface LanguageToggleProps {
  className?: string;
  variant?: "pill" | "icon";
}

export function LanguageToggle({
  className,
  variant = "pill",
}: LanguageToggleProps) {
  const { language, setLanguage, t } = useLanguage();
  const [mounted, setMounted] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const rootRef = React.useRef<HTMLDivElement>(null);
  const searchRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => setMounted(true), []);

  React.useEffect(() => {
    if (!open) return;

    const onPointer = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery("");
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setQuery("");
      }
    };

    document.addEventListener("mousedown", onPointer);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  React.useEffect(() => {
    if (open) {
      const id = window.setTimeout(() => searchRef.current?.focus(), 40);
      return () => window.clearTimeout(id);
    }
  }, [open]);

  if (!mounted) {
    return (
      <div
        className={cn(
          "h-9 w-[4.5rem] rounded-xl bg-card/50 border border-border/70 animate-pulse",
          className
        )}
      />
    );
  }

  const current = getLanguageMeta(language);
  const filtered = LANGUAGES.filter((lang) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      lang.name.toLowerCase().includes(q) ||
      lang.nativeName.toLowerCase().includes(q) ||
      lang.code.toLowerCase().includes(q)
    );
  });

  const select = (code: Language) => {
    setLanguage(code);
    setOpen(false);
    setQuery("");
  };

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t("langToggle")}
        title={t("langToggle")}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-xl border transition-all duration-200 select-none",
          "border-electric/35 bg-card hover:border-electric hover:bg-electric/10",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric",
          open && "border-electric bg-electric/15 shadow-glow-sm",
          variant === "icon" ? "w-9 h-9 justify-center px-0" : "h-9 px-2.5"
        )}
      >
        <Globe className="w-3.5 h-3.5 text-electric shrink-0" />
        {variant !== "icon" && (
          <>
            <span className="text-[11px] font-bold uppercase tracking-wide text-foreground">
              {current.code}
            </span>
            <ChevronDown
              className={cn(
                "w-3.5 h-3.5 text-electric transition-transform",
                open && "rotate-180"
              )}
            />
          </>
        )}
      </button>

      {open && (
        <div
          role="listbox"
          aria-label={t("langToggle")}
          className="absolute right-0 top-full mt-2 z-[60] w-[min(18rem,calc(100vw-2rem))] rounded-2xl border border-electric/30 bg-card/95 backdrop-blur-xl shadow-luxury-dark overflow-hidden"
        >
          <div className="p-2 border-b border-border/70 bg-electric/5">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-electric" />
              <input
                ref={searchRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t("langSearch")}
                className="w-full h-9 rounded-xl border border-border/80 bg-background pl-8 pr-3 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-electric/60"
              />
            </div>
          </div>

          <div className="max-h-64 overflow-y-auto p-1.5">
            {filtered.length === 0 ? (
              <p className="px-3 py-4 text-xs text-muted-foreground text-center">
                No languages found
              </p>
            ) : (
              filtered.map((lang) => {
                const active = lang.code === language;
                return (
                  <button
                    key={lang.code}
                    type="button"
                    role="option"
                    aria-selected={active}
                    onClick={() => select(lang.code as Language)}
                    className={cn(
                      "w-full flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-left transition-colors",
                      active
                        ? "bg-electric/15 text-foreground"
                        : "hover:bg-secondary text-foreground"
                    )}
                  >
                    <span className="text-base leading-none" aria-hidden>
                      {lang.flag}
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="block text-xs font-semibold truncate">
                        {lang.nativeName}
                      </span>
                      <span className="block text-[10px] text-muted-foreground truncate">
                        {lang.name}
                      </span>
                    </span>
                    <span className="text-[10px] font-bold uppercase text-electric/80">
                      {lang.code}
                    </span>
                    {active && <Check className="w-3.5 h-3.5 text-electric shrink-0" />}
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
