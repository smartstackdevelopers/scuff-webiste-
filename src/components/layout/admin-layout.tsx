"use client";

import * as React from "react";
import Link from "next/link";
import { AdminProvider, useAdmin } from "@/features/admin/hooks/use-admin";
import { CRMProvider } from "@/features/crm/hooks/use-crm";
import { FinanceProvider } from "@/features/finance/hooks/use-finance";
import { AdminSidebar } from "@/features/admin/components/admin-sidebar";
import { AdminHeader } from "@/features/admin/components/admin-header";
import { ShieldAlert, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { isSimulatedAdmin, setIsSimulatedAdmin } = useAdmin();

  // Close mobile drawer on Escape
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Desktop Fixed Left Sidebar */}
      <div className="hidden lg:block w-64 shrink-0 h-screen sticky top-0 border-r border-border/80 z-30">
        <AdminSidebar />
      </div>

      {/* Mobile Sidebar Overlay Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity animate-in fade-in"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Slide */}
          <div className="relative w-72 max-w-[80vw] bg-card h-full shadow-2xl z-10 animate-in slide-in-from-left duration-200">
            <AdminSidebar onItemClick={() => setMobileOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Administrative Column */}
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader
          mobileOpen={mobileOpen}
          onToggleMobile={() => setMobileOpen((prev) => !prev)}
        />

        {/* If user toggles simulated admin off, display auth warning */}
        {!isSimulatedAdmin ? (
          <div className="p-6 m-4 sm:m-6 lg:m-8 rounded-2xl bg-destructive/10 border border-destructive/20 text-center space-y-4">
            <ShieldAlert className="w-12 h-12 text-destructive mx-auto" />
            <h2 className="text-lg font-bold text-foreground">
              Administrator Privileges Required
            </h2>
            <p className="text-xs text-muted-foreground max-w-md mx-auto">
              You are currently viewing the admin console in unauthenticated / guest mode. Real production security enforces role authorization on the backend server.
            </p>
            <Button
              variant="default"
              size="sm"
              onClick={() => setIsSimulatedAdmin(true)}
              className="text-xs font-bold"
            >
              <ShieldCheck className="w-3.5 h-3.5 mr-1.5" />
              <span>Simulate Master Administrator Access</span>
            </Button>
          </div>
        ) : (
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto animate-in fade-in duration-300">
            {children}
          </main>
        )}

        {/* Admin Footer */}
        <footer className="py-4 px-6 border-t border-border/60 text-xs text-muted-foreground bg-card/40">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px]">
            <div className="flex items-center gap-1.5 font-semibold text-foreground">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>You Scuff We Buff Enterprise Platform • Studio Operations Engine</span>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <span>Notice: Demo Environment Active</span>
              <span>•</span>
              <Link href="/" className="hover:text-electric transition-colors">
                Public Gateway
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminProvider>
      <CRMProvider>
        <FinanceProvider>
          <AdminLayoutContent>{children}</AdminLayoutContent>
        </FinanceProvider>
      </CRMProvider>
    </AdminProvider>
  );
}
