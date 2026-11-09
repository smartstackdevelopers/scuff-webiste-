"use client";

import * as React from "react";
import { useCustomer } from "../hooks/use-customer";
import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  Bell,
  Sun,
  Moon,
  Laptop,
  Shield,
  Download,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

export function SettingsView() {
  const { settings, updateSettings } = useCustomer();
  const { theme, setTheme } = useTheme();
  const [saveSuccess, setSaveSuccess] = React.useState(false);

  const handleToggle = (
    key:
      | "emailNotifications"
      | "smsNotifications"
      | "whatsappNotifications"
      | "promotionalOffers"
      | "dataSharing"
  ) => {
    updateSettings({ [key]: !settings[key] });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const handleExportData = () => {
    alert("Export requested. A secure JSON archive of your vehicle and service records has been prepared.");
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-card border border-border/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-foreground">
            Account Preferences & Settings
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Configure appointment dispatch notifications, theme interface, and vehicle privacy.
          </p>
        </div>

        {saveSuccess && (
          <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-500 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/30">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Preferences saved</span>
          </div>
        )}
      </div>

      {/* Notification Preferences */}
      <div className="p-6 rounded-2xl bg-card border border-border/80 space-y-5">
        <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
          <Bell className="w-4 h-4 text-electric" />
          <span>Notification Channels</span>
        </h3>

        <div className="divide-y divide-border/60 space-y-4 pt-1">
          <div className="flex items-center justify-between gap-4 pt-4 first:pt-0">
            <div>
              <span className="text-sm font-bold text-foreground block">
                Email Dispatch & PDF Invoices
              </span>
              <span className="text-xs text-muted-foreground">
                Receive booking confirmations, appointment reminders, and automated VAT invoices.
              </span>
            </div>
            <Switch
              checked={settings.emailNotifications}
              onChange={() => handleToggle("emailNotifications")}
            />
          </div>

          <div className="flex items-center justify-between gap-4 pt-4">
            <div>
              <span className="text-sm font-bold text-foreground block">
                SMS Appointment Alerts
              </span>
              <span className="text-xs text-muted-foreground">
                Get instant text alerts when our detailing technician is en route to your location.
              </span>
            </div>
            <Switch
              checked={settings.smsNotifications}
              onChange={() => handleToggle("smsNotifications")}
            />
          </div>

          <div className="flex items-center justify-between gap-4 pt-4">
            <div>
              <span className="text-sm font-bold text-foreground block">
                WhatsApp Live Detailing Updates
              </span>
              <span className="text-xs text-muted-foreground">
                Receive live photos and progress videos while your vehicle is on the detailing lift.
              </span>
            </div>
            <Switch
              checked={settings.whatsappNotifications}
              onChange={() => handleToggle("whatsappNotifications")}
            />
          </div>

          <div className="flex items-center justify-between gap-4 pt-4">
            <div>
              <span className="text-sm font-bold text-foreground block">
                Exclusive Member Deals & Seasonal Offers
              </span>
              <span className="text-xs text-muted-foreground">
                Receive occasional member-only discounts on ceramic coatings and seasonal paint protection.
              </span>
            </div>
            <Switch
              checked={settings.promotionalOffers}
              onChange={() => handleToggle("promotionalOffers")}
            />
          </div>
        </div>
      </div>

      {/* Interface Theme */}
      <div className="p-6 rounded-2xl bg-card border border-border/80 space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
          <Sun className="w-4 h-4 text-electric" />
          <span>Appearance & Color Theme</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            type="button"
            onClick={() => setTheme("dark")}
            className={`p-4 rounded-xl border flex flex-col items-center gap-2.5 transition-all text-xs font-bold ${
              theme === "dark"
                ? "bg-secondary border-electric text-electric shadow-glow-sm"
                : "bg-card border-border/70 text-muted-foreground hover:border-border hover:text-foreground"
            }`}
          >
            <Moon className="w-5 h-5" />
            <span>Dark Luxury (Recommended)</span>
          </button>

          <button
            type="button"
            onClick={() => setTheme("light")}
            className={`p-4 rounded-xl border flex flex-col items-center gap-2.5 transition-all text-xs font-bold ${
              theme === "light"
                ? "bg-secondary border-electric text-electric shadow-glow-sm"
                : "bg-card border-border/70 text-muted-foreground hover:border-border hover:text-foreground"
            }`}
          >
            <Sun className="w-5 h-5" />
            <span>Light Studio</span>
          </button>

          <button
            type="button"
            onClick={() => setTheme("system")}
            className={`p-4 rounded-xl border flex flex-col items-center gap-2.5 transition-all text-xs font-bold ${
              theme === "system"
                ? "bg-secondary border-electric text-electric shadow-glow-sm"
                : "bg-card border-border/70 text-muted-foreground hover:border-border hover:text-foreground"
            }`}
          >
            <Laptop className="w-5 h-5" />
            <span>System Default</span>
          </button>
        </div>
      </div>

      {/* Privacy & Account Management */}
      <div className="p-6 rounded-2xl bg-card border border-border/80 space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
          <Shield className="w-4 h-4 text-electric" />
          <span>Data Privacy & Portfolio Showcase</span>
        </h3>

        <div className="flex items-center justify-between gap-4 py-2">
          <div>
            <span className="text-sm font-bold text-foreground block">
              Vehicle Gallery Showcase Permission
            </span>
            <span className="text-xs text-muted-foreground">
              Allow high-res before/after photos of your vehicle to be featured in our public showcase (license plates always censored).
            </span>
          </div>
          <Switch
            checked={settings.dataSharing}
            onChange={() => handleToggle("dataSharing")}
          />
        </div>

        <div className="pt-4 border-t border-border/60 flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-foreground block">
              Personal Data Archive
            </span>
            <span className="text-[11px] text-muted-foreground">
              Download your complete booking history, invoices, and garage specs.
            </span>
          </div>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleExportData}
            className="text-xs"
          >
            <Download className="w-3.5 h-3.5 mr-1.5" />
            <span>Export Data</span>
          </Button>
        </div>

        <div className="pt-4 border-t border-destructive/20 flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-destructive block">
              Deactivate Account
            </span>
            <span className="text-[11px] text-muted-foreground">
              Permanently close your client portal account and delete saved garage profiles.
            </span>
          </div>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => alert("Please contact support to process account deactivation.")}
            className="text-xs text-destructive hover:bg-destructive/10"
          >
            <AlertTriangle className="w-3.5 h-3.5 mr-1.5" />
            <span>Close Account</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
