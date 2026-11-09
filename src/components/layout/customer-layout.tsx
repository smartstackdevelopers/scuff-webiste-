"use client";

import * as React from "react";
import { CustomerProvider, useCustomer } from "@/features/customer/hooks/use-customer";
import { CustomerSidebar } from "@/features/customer/components/customer-sidebar";
import { CustomerHeader } from "@/features/customer/components/customer-header";
import { siteConfig } from "@/config/site";
import { ShieldCheck } from "lucide-react";

function CustomerLayoutContent({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const { unreadNotificationCount } = useCustomer();

  // Close mobile drawer on ESC or navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Desktop Sticky Sidebar */}
      <div className="hidden lg:block w-64 shrink-0 h-screen sticky top-0 border-r border-border/70 z-30">
        <CustomerSidebar unreadCount={unreadNotificationCount} />
      </div>

      {/* Mobile Sidebar Overlay Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity animate-in fade-in"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Slide */}
          <div className="relative w-72 max-w-[80vw] bg-card h-full shadow-2xl z-10 animate-in slide-in-from-left duration-200">
            <CustomerSidebar
              unreadCount={unreadNotificationCount}
              onItemClick={() => setMobileMenuOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Right Column: Header + Main View + Portal Footer */}
      <div className="flex-1 flex flex-col min-w-0">
        <CustomerHeader
          unreadNotificationCount={unreadNotificationCount}
          mobileMenuOpen={mobileMenuOpen}
          onToggleMobileMenu={() => setMobileMenuOpen((prev) => !prev)}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto animate-in fade-in duration-300">
          {children}
        </main>

        <footer className="py-5 px-6 border-t border-border/60 text-xs text-muted-foreground bg-card/40">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-electric" />
              <span>
                {siteConfig.name} • Private Automotive Portal & Customer Hub
              </span>
            </div>
            <div className="flex items-center gap-4 text-[11px]">
              <span>Assistance: {siteConfig.contact.phonePlaceholder}</span>
              <span>•</span>
              <span>{siteConfig.contact.emailPlaceholder}</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export function CustomerLayout({ children }: { children: React.ReactNode }) {
  return (
    <CustomerProvider>
      <CustomerLayoutContent>{children}</CustomerLayoutContent>
    </CustomerProvider>
  );
}
