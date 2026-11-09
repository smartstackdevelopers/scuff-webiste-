"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calendar, User, Menu, Phone } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/common/theme-toggle";
import { LanguageToggle } from "@/components/common/language-toggle";
import { ServicesDropdown } from "@/components/layout/services-dropdown";
import { MobileNav } from "@/components/layout/mobile-nav";
import { BrandLogo } from "@/components/brand/brand-logo";
import { MAIN_NAV_ITEMS } from "@/constants/navigation";
import { siteConfig } from "@/config/site";
import { useLanguage } from "@/lib/i18n/language-context";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 15);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 w-full transition-all duration-300",
          isScrolled
            ? "bg-background/92 backdrop-blur-xl border-b border-border shadow-sm text-foreground"
            : "bg-background/80 backdrop-blur-md border-b border-border/70 text-foreground"
        )}
      >
        <Container>
          <div className="flex h-16 sm:h-20 items-center justify-between gap-2 sm:gap-4 min-w-0">
            <div className="shrink min-w-0 max-w-[150px] xs:max-w-[190px] sm:max-w-none">
              <BrandLogo size="md" />
            </div>

            <nav
              className="hidden lg:flex items-center gap-1 xl:gap-2"
              aria-label="Main Navigation"
            >
              {MAIN_NAV_ITEMS.map((item) => {
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname === item.href ||
                      pathname.startsWith(`${item.href}/`);

                const label = t(item.translationKey, item.title);

                if (item.children && item.children.length > 0) {
                  return (
                    <ServicesDropdown
                      key={item.href}
                      item={item}
                      isActive={isActive}
                      label={label}
                    />
                  );
                }

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "px-3 py-2 text-sm font-medium transition-colors duration-150 rounded-lg relative select-none",
                      isActive
                        ? "text-foreground font-semibold"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {label}
                    {isActive && (
                      <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-electric rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-1 xs:gap-1.5 sm:gap-2.5 shrink-0">
              <a
                href={siteConfig.contact.phoneTel}
                className="hidden xl:inline-flex items-center gap-2 px-3 py-1.5 text-xs font-bold text-foreground hover:text-primary transition-colors bg-secondary/60 border border-border hover:border-primary/40 rounded-xl"
              >
                <Phone className="w-3.5 h-3.5 text-primary" />
                <span>{siteConfig.contact.phone}</span>
              </a>

              <LanguageToggle />
              <ThemeToggle />

              <Link href="/booking" className="hidden sm:inline-flex">
                <Button
                  variant="glow"
                  size="default"
                  leftIcon={<Calendar className="w-4 h-4" />}
                >
                  {t("navBookNow")}
                </Button>
              </Link>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden flex items-center justify-center w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 rounded-xl bg-card border border-border/80 text-foreground hover:bg-secondary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric"
                aria-label="Open mobile navigation menu"
              >
                <Menu className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        </Container>
      </header>

      <MobileNav
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
}
