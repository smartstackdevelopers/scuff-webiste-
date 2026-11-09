"use client";

import * as React from "react";
import Link from "next/link";
import {
  Bell,
  Calendar,
  FileText,
  LifeBuoy,
  Sparkles,
  Check,
  CheckCheck,
  Trash2,
  ChevronRight,
} from "lucide-react";
import { useCustomer } from "../hooks/use-customer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CustomerNotification } from "../types/customer";

export function NotificationsView() {
  const {
    notifications,
    unreadNotificationCount,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    deleteNotification,
  } = useCustomer();

  const [activeTab, setActiveTab] = React.useState<string>("all");

  const getIcon = (type: CustomerNotification["type"]) => {
    switch (type) {
      case "booking_confirmation":
      case "appointment_reminder":
      case "booking_update":
        return <Calendar className="w-4 h-4 text-electric" />;
      case "invoice_generated":
      case "payment_reminder":
        return <FileText className="w-4 h-4 text-emerald-500" />;
      case "support_reply":
        return <LifeBuoy className="w-4 h-4 text-amber-500" />;
      case "promotional_offer":
        return <Sparkles className="w-4 h-4 text-purple-400" />;
      default:
        return <Bell className="w-4 h-4 text-electric" />;
    }
  };

  const filteredNotifications = notifications.filter((item) => {
    if (activeTab === "all") return true;
    if (activeTab === "unread") return !item.isRead;
    if (activeTab === "bookings")
      return item.type.includes("booking") || item.type.includes("appointment");
    if (activeTab === "invoices")
      return item.type.includes("invoice") || item.type.includes("payment");
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-card border border-border/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-foreground">
              Notification Center
            </h2>
            {unreadNotificationCount > 0 && (
              <Badge variant="electric" className="text-xs">
                {unreadNotificationCount} New
              </Badge>
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Real-time updates regarding detailing stages, invoices, and concierge communications.
          </p>
        </div>

        {unreadNotificationCount > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={markAllNotificationsAsRead}
            className="text-xs font-semibold"
          >
            <CheckCheck className="w-4 h-4 mr-1.5 text-electric" />
            <span>Mark All as Read</span>
          </Button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        {[
          { key: "all", label: "All Notifications" },
          { key: "unread", label: "Unread Only" },
          { key: "bookings", label: "Bookings" },
          { key: "invoices", label: "Invoices & Payments" },
        ].map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all ${
              activeTab === tab.key
                ? "bg-electric text-black font-bold shadow-glow-sm"
                : "bg-card border border-border/70 text-muted-foreground hover:text-foreground hover:bg-secondary"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      {filteredNotifications.length === 0 ? (
        <div className="py-12 text-center rounded-2xl bg-card border border-border/80 space-y-2">
          <Bell className="w-10 h-10 text-muted-foreground mx-auto" />
          <h4 className="text-sm font-bold text-foreground">No Notifications</h4>
          <p className="text-xs text-muted-foreground">
            You are completely caught up. There are no notifications in this view.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredNotifications.map((notif) => (
            <div
              key={notif.id}
              className={`p-4 sm:p-5 rounded-2xl border transition-all duration-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                notif.isRead
                  ? "bg-card/70 border-border/60 text-muted-foreground"
                  : "bg-card border-electric/40 shadow-sm"
              }`}
            >
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center shrink-0 mt-0.5">
                  {getIcon(notif.type)}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3
                      className={`text-sm font-bold ${
                        notif.isRead ? "text-foreground" : "text-foreground"
                      }`}
                    >
                      {notif.title}
                    </h3>
                    {!notif.isRead && (
                      <span className="w-2 h-2 rounded-full bg-electric shrink-0" />
                    )}
                  </div>

                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {notif.message}
                  </p>

                  <span className="inline-block text-[10px] text-muted-foreground/80 font-mono">
                    {notif.timestamp}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                {notif.link && (
                  <Link
                    href={notif.link}
                    onClick={() => markNotificationAsRead(notif.id)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-secondary hover:bg-secondary/80 text-foreground text-xs font-semibold transition-colors"
                  >
                    <span>View</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                )}

                {!notif.isRead && (
                  <button
                    type="button"
                    onClick={() => markNotificationAsRead(notif.id)}
                    className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                    title="Mark as read"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => deleteNotification(notif.id)}
                  className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                  title="Delete notification"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
