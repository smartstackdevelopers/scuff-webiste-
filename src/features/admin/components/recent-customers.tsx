"use client";

import * as React from "react";
import Link from "next/link";
import { AdminCustomer } from "../types/admin";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Users, ArrowUpRight } from "lucide-react";

interface RecentCustomersProps {
  customers: AdminCustomer[];
}

export function RecentCustomers({ customers }: RecentCustomersProps) {
  const getStatusBadge = (status: AdminCustomer["status"]) => {
    switch (status) {
      case "vip":
        return (
          <Badge variant="electric" className="text-[10px] py-0">
            VIP Tier
          </Badge>
        );
      case "active":
        return (
          <Badge variant="success" className="text-[10px] py-0">
            Active
          </Badge>
        );
      default:
        return (
          <Badge variant="secondary" className="text-[10px] py-0">
            Standard
          </Badge>
        );
    }
  };

  return (
    <div className="p-5 sm:p-6 rounded-2xl bg-card border border-border/80 flex flex-col justify-between space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-border/60">
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-foreground flex items-center gap-1.5">
            <Users className="w-4 h-4 text-electric" />
            <span>Client Registry</span>
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Recent account registrations & vehicle profiles
          </p>
        </div>

        <Link
          href="/admin/customers"
          className="inline-flex items-center gap-1 text-xs font-bold text-electric hover:underline"
        >
          <span>All ({customers.length})</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Customer List */}
      <div className="space-y-3">
        {customers.slice(0, 4).map((c) => {
          const initials = c.fullName
            .split(" ")
            .map((n) => n[0])
            .join("")
            .slice(0, 2);

          return (
            <div
              key={c.id}
              className="p-3 rounded-xl bg-secondary/40 hover:bg-secondary/70 border border-border/60 transition-colors flex items-center justify-between gap-3 text-xs"
            >
              <div className="flex items-center gap-3 min-w-0">
                <Avatar size="sm">
                  <AvatarFallback className="text-[10px] bg-charcoal-800 text-electric border border-electric/30">
                    {initials}
                  </AvatarFallback>
                </Avatar>

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-foreground truncate">
                      {c.fullName}
                    </span>
                    {getStatusBadge(c.status)}
                  </div>
                  <span className="text-[11px] text-muted-foreground truncate block">
                    {c.email}
                  </span>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="font-mono font-bold text-foreground block">
                  £{c.totalSpent}
                </span>
                <span className="text-[10px] text-muted-foreground">
                  {c.totalBookings} Booking(s)
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="pt-2 border-t border-border/60">
        <Link
          href="/admin/customers"
          className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground text-xs font-semibold transition-colors"
        >
          <span>Manage All Customers</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
