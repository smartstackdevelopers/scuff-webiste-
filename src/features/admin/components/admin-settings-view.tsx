"use client";

import * as React from "react";
import { useAdmin } from "../hooks/use-admin";
import { useTheme } from "next-themes";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Building2,
  Clock,
  CalendarCheck,
  Bell,
  Sun,
  Moon,
  Laptop,
  CheckCircle2,
} from "lucide-react";

export function AdminSettingsView() {
  const { settings, updateSettings } = useAdmin();
  const { theme, setTheme } = useTheme();

  const [savedSuccess, setSavedSuccess] = React.useState(false);

  // Form local state initialized with settings
  const [businessName, setBusinessName] = React.useState(settings.businessName);
  const [tradingName, setTradingName] = React.useState(settings.tradingName);
  const [vatNumber, setVatNumber] = React.useState(settings.vatNumber);
  const [companyRegistrationNumber, setCompanyRegistrationNumber] = React.useState(
    settings.companyRegistrationNumber
  );
  const [contactEmail, setContactEmail] = React.useState(settings.contactEmail);
  const [contactPhone, setContactPhone] = React.useState(settings.contactPhone);
  const [studioAddress, setStudioAddress] = React.useState(settings.studioAddress);
  const [postcode, setPostcode] = React.useState(settings.postcode);

  const [studioOpeningTime, setStudioOpeningTime] = React.useState(
    settings.studioOpeningTime
  );
  const [studioClosingTime, setStudioClosingTime] = React.useState(
    settings.studioClosingTime
  );
  const [weekendOperation, setWeekendOperation] = React.useState(
    settings.weekendOperation
  );

  const [depositPercentage, setDepositPercentage] = React.useState(
    settings.depositPercentage
  );
  const [autoApproveKnownCustomers, setAutoApproveKnownCustomers] = React.useState(
    settings.autoApproveKnownCustomers
  );
  const [cancellationNoticeHours, setCancellationNoticeHours] = React.useState(
    settings.cancellationNoticeHours
  );

  const [adminNotificationEmail, setAdminNotificationEmail] = React.useState(
    settings.adminNotificationEmail
  );
  const [smsDispatchAlerts, setSmsDispatchAlerts] = React.useState(
    settings.smsDispatchAlerts
  );

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      businessName,
      tradingName,
      vatNumber,
      companyRegistrationNumber,
      contactEmail,
      contactPhone,
      studioAddress,
      postcode,
      studioOpeningTime,
      studioClosingTime,
      weekendOperation,
      depositPercentage: Number(depositPercentage),
      autoApproveKnownCustomers,
      cancellationNoticeHours: Number(cancellationNoticeHours),
      adminNotificationEmail,
      smsDispatchAlerts,
    });

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-card border border-border/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">
              Business Operations Settings
            </h1>
            <Badge variant="outline" className="text-xs font-mono">
              Enterprise Control
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Configure studio company registrations, operating hours, dispatch settings, and notification alerts.
          </p>
        </div>

        {savedSuccess && (
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-500 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-xl animate-in fade-in">
            <CheckCircle2 className="w-4 h-4" />
            <span>Settings saved successfully</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Section 1: Business Profile */}
        <div className="p-6 rounded-2xl bg-card border border-border/80 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
            <Building2 className="w-4 h-4 text-electric" />
            <span>Company Legal & Registration Profile</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1.5">
                Registered Legal Entity Name
              </label>
              <Input
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1.5">
                Public Brand / Trading Name
              </label>
              <Input
                value={tradingName}
                onChange={(e) => setTradingName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1.5">
                UK VAT Registration Number
              </label>
              <Input
                value={vatNumber}
                onChange={(e) => setVatNumber(e.target.value)}
                className="font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1.5">
                Companies House Registration No.
              </label>
              <Input
                value={companyRegistrationNumber}
                onChange={(e) => setCompanyRegistrationNumber(e.target.value)}
                className="font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1.5">
                Operations Contact Email
              </label>
              <Input
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1.5">
                Operations Switchboard Phone
              </label>
              <Input
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1.5">
                Studio Address
              </label>
              <Input
                value={studioAddress}
                onChange={(e) => setStudioAddress(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1.5">
                Postcode
              </label>
              <Input
                value={postcode}
                onChange={(e) => setPostcode(e.target.value)}
                className="font-mono uppercase tracking-wider"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Operating Hours */}
        <div className="p-6 rounded-2xl bg-card border border-border/80 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
            <Clock className="w-4 h-4 text-electric" />
            <span>Studio Hours & Dispatch Schedule</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1.5">
                Studio Opening Time
              </label>
              <Input
                type="time"
                value={studioOpeningTime}
                onChange={(e) => setStudioOpeningTime(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1.5">
                Studio Closing Time
              </label>
              <Input
                type="time"
                value={studioClosingTime}
                onChange={(e) => setStudioClosingTime(e.target.value)}
              />
            </div>
          </div>

          <div className="pt-2">
            <Switch
              checked={weekendOperation}
              onChange={setWeekendOperation}
              label="Weekend Detailing Operations"
              description="Allow Saturday appointments and Sunday VIP emergency track-day prep."
            />
          </div>
        </div>

        {/* Section 3: Booking Policies */}
        <div className="p-6 rounded-2xl bg-card border border-border/80 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
            <CalendarCheck className="w-4 h-4 text-electric" />
            <span>Booking & Deposit Rules</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1.5">
                Standard Booking Deposit (%)
              </label>
              <Input
                type="number"
                min="0"
                max="100"
                value={depositPercentage}
                onChange={(e) => setDepositPercentage(Number(e.target.value))}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1.5">
                Cancellation Window (Hours)
              </label>
              <Input
                type="number"
                min="0"
                max="72"
                value={cancellationNoticeHours}
                onChange={(e) => setCancellationNoticeHours(Number(e.target.value))}
              />
            </div>
          </div>

          <div className="pt-2">
            <Switch
              checked={autoApproveKnownCustomers}
              onChange={setAutoApproveKnownCustomers}
              label="Auto-Approve Returning VIP Clients"
              description="Automatically confirm slot if customer has completed 3+ verified services."
            />
          </div>
        </div>

        {/* Section 4: Notifications & Dispatch Alerts */}
        <div className="p-6 rounded-2xl bg-card border border-border/80 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
            <Bell className="w-4 h-4 text-electric" />
            <span>Alerts & Communications</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1.5">
                Operations Alert Email
              </label>
              <Input
                type="email"
                value={adminNotificationEmail}
                onChange={(e) => setAdminNotificationEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="pt-2">
            <Switch
              checked={smsDispatchAlerts}
              onChange={setSmsDispatchAlerts}
              label="SMS Dispatch Alerts to Technicians"
              description="Dispatch mobile van coordinates automatically 1 hour prior to customer slot."
            />
          </div>
        </div>

        {/* Section 5: Theme Preference */}
        <div className="p-6 rounded-2xl bg-card border border-border/80 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
            <Sun className="w-4 h-4 text-electric" />
            <span>Interface Appearance</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() => setTheme("dark")}
              className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all text-xs font-bold ${
                theme === "dark"
                  ? "bg-secondary border-electric text-electric shadow-glow-sm"
                  : "bg-card border-border/70 text-muted-foreground hover:text-foreground"
              }`}
            >
              <Moon className="w-5 h-5" />
              <span>Dark Luxury (Recommended)</span>
            </button>

            <button
              type="button"
              onClick={() => setTheme("light")}
              className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all text-xs font-bold ${
                theme === "light"
                  ? "bg-secondary border-electric text-electric shadow-glow-sm"
                  : "bg-card border-border/70 text-muted-foreground hover:text-foreground"
              }`}
            >
              <Sun className="w-5 h-5" />
              <span>Light Studio</span>
            </button>

            <button
              type="button"
              onClick={() => setTheme("system")}
              className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all text-xs font-bold ${
                theme === "system"
                  ? "bg-secondary border-electric text-electric shadow-glow-sm"
                  : "bg-card border-border/70 text-muted-foreground hover:text-foreground"
              }`}
            >
              <Laptop className="w-5 h-5" />
              <span>System Default</span>
            </button>
          </div>
        </div>

        {/* Save Bar */}
        <div className="flex justify-end gap-3 pt-4">
          <Button
            type="submit"
            variant="default"
            size="default"
            className="font-bold text-xs uppercase tracking-wider"
          >
            Save All Operations Settings
          </Button>
        </div>
      </form>
    </div>
  );
}
