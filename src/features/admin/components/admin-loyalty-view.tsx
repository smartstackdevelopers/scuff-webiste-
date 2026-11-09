"use client";

import * as React from "react";
import {
  Award,
  CheckCircle2,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

interface LoyaltyMember {
  id: string;
  name: string;
  email: string;
  tier: "Silver" | "Gold" | "Black Obsidian";
  points: number;
  referralsMade: number;
  totalSpent: number;
  joinedDate: string;
}

export function AdminLoyaltyView() {
  const [members, setMembers] = React.useState<LoyaltyMember[]>([
    {
      id: "mem-1",
      name: "Lord Alistair Vance",
      email: "alistair@vance-holdings.co.uk",
      tier: "Black Obsidian",
      points: 4850,
      referralsMade: 6,
      totalSpent: 4250,
      joinedDate: "12 Jan 2026",
    },
    {
      id: "mem-2",
      name: "Sophia Sterling",
      email: "sophia@sterling-realty.co.uk",
      tier: "Gold",
      points: 2450,
      referralsMade: 4,
      totalSpent: 1850,
      joinedDate: "05 Feb 2026",
    },
    {
      id: "mem-3",
      name: "Charles Kensington",
      email: "charles@kensington-partners.co.uk",
      tier: "Gold",
      points: 1950,
      referralsMade: 2,
      totalSpent: 1400,
      joinedDate: "18 Feb 2026",
    },
    {
      id: "mem-4",
      name: "David Miller",
      email: "david@miller-racing.com",
      tier: "Silver",
      points: 750,
      referralsMade: 1,
      totalSpent: 650,
      joinedDate: "01 Mar 2026",
    },
  ]);

  const [search, setSearch] = React.useState("");
  const [tierFilter, setTierFilter] = React.useState<string>("all");

  // Adjust Points Modal
  const [adjustingMember, setAdjustingMember] = React.useState<LoyaltyMember | null>(null);
  const [adjustmentAmount, setAdjustmentAmount] = React.useState(250);
  const [adjustmentReason, setAdjustmentReason] = React.useState("");
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleApplyAdjustment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adjustingMember) return;

    setMembers((prev) =>
      prev.map((m) =>
        m.id === adjustingMember.id
          ? { ...m, points: Math.max(0, m.points + Number(adjustmentAmount)) }
          : m
      )
    );

    showToast(`Adjusted points for ${adjustingMember.name} by ${adjustmentAmount > 0 ? "+" : ""}${adjustmentAmount} PTS.`);
    setAdjustingMember(null);
    setAdjustmentReason("");
  };

  const filtered = members.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase());
    const matchesTier = tierFilter === "all" || m.tier === tierFilter;
    return matchesSearch && matchesTier;
  });

  const totalPointsCirculating = members.reduce((sum, m) => sum + m.points, 0);

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-emerald-500 text-zinc-950 font-bold px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 border border-emerald-400 text-xs">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/40 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/30">
              Retention & VIP Growth
            </span>
            <span className="text-muted-foreground text-xs font-mono">• Detailing Guild</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground font-serif tracking-tight mt-1">
            Loyalty Guild & Referral Management
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Audit customer rewards, manage VIP tier thresholds, and award goodwill bonus points.
          </p>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-border/60 bg-card p-4 shadow-sm">
          <span className="text-xs text-muted-foreground">Active Guild Members</span>
          <p className="mt-1 text-3xl font-extrabold font-mono text-foreground">{members.length}</p>
          <p className="text-[11px] text-muted-foreground mt-1">Verified vehicle owners</p>
        </div>

        <div className="rounded-2xl border border-border/60 bg-card p-4 shadow-sm">
          <span className="text-xs text-muted-foreground">Circulating Guild Points</span>
          <p className="mt-1 text-3xl font-extrabold font-mono text-amber-400">
            {totalPointsCirculating.toLocaleString()} PTS
          </p>
          <p className="text-[11px] text-muted-foreground mt-1">
            Liability value: £{(totalPointsCirculating * 0.05).toFixed(2)}
          </p>
        </div>

        <div className="rounded-2xl border border-border/60 bg-card p-4 shadow-sm">
          <span className="text-xs text-muted-foreground">Peer Referrals Completed</span>
          <p className="mt-1 text-3xl font-extrabold font-mono text-emerald-400">
            {members.reduce((sum, m) => sum + m.referralsMade, 0)}
          </p>
          <p className="text-[11px] text-muted-foreground mt-1">High-value client acquisitions</p>
        </div>

        <div className="rounded-2xl border border-border/60 bg-card p-4 shadow-sm">
          <span className="text-xs text-muted-foreground">Referral Pipeline Value</span>
          <p className="mt-1 text-3xl font-extrabold font-mono text-cyan-400">£8,150</p>
          <p className="text-[11px] text-muted-foreground mt-1">Won customer bookings</p>
        </div>
      </div>

      {/* Filter bar */}
      <div className="p-4 rounded-2xl bg-card border border-border/70 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search member by client name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 text-xs bg-background"
          />
        </div>

        <select
          value={tierFilter}
          onChange={(e) => setTierFilter(e.target.value)}
          className="bg-background text-foreground border border-border rounded-xl text-xs px-3 py-2 focus:outline-none focus:border-amber-500"
        >
          <option value="all">All Tiers</option>
          <option value="Black Obsidian">Black Obsidian VIP</option>
          <option value="Gold">Gold Master</option>
          <option value="Silver">Silver Apprentice</option>
        </select>
      </div>

      {/* Member Balances Table */}
      <div className="bg-card border border-border/70 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-muted/40 text-muted-foreground font-semibold border-b border-border/50">
              <tr>
                <th className="py-3 px-4">Member Name</th>
                <th className="py-3 px-4">Guild Tier</th>
                <th className="py-3 px-4 text-right">Points Balance</th>
                <th className="py-3 px-4 text-center">Referrals</th>
                <th className="py-3 px-4 text-right">Lifetime Detailing</th>
                <th className="py-3 px-4 text-center">Member Since</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {filtered.map((m) => (
                <tr key={m.id} className="hover:bg-muted/10 transition-colors">
                  <td className="py-3 px-4">
                    <p className="font-semibold text-foreground">{m.name}</p>
                    <p className="text-[11px] text-muted-foreground">{m.email}</p>
                  </td>
                  <td className="py-3 px-4">
                    <Badge
                      variant={
                        m.tier === "Black Obsidian"
                          ? "electric"
                          : m.tier === "Gold"
                          ? "warning"
                          : "secondary"
                      }
                      className="text-[10px]"
                    >
                      {m.tier}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-right font-mono font-bold text-amber-400 text-sm">
                    {m.points.toLocaleString()} PTS
                  </td>
                  <td className="py-3 px-4 text-center font-mono font-bold text-foreground">
                    {m.referralsMade}
                  </td>
                  <td className="py-3 px-4 text-right font-mono font-semibold text-foreground">
                    £{m.totalSpent.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-center font-mono text-[11px] text-muted-foreground">
                    {m.joinedDate}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Button
                      size="sm"
                      onClick={() => setAdjustingMember(m)}
                      className="bg-card border border-border hover:bg-muted text-xs h-7"
                    >
                      Adjust Points
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Adjust Points Modal */}
      {adjustingMember && (
        <Dialog open={!!adjustingMember} onOpenChange={(open) => !open && setAdjustingMember(null)}>
          <DialogContent size="default">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" />
                Adjust Guild Points for {adjustingMember.name}
              </DialogTitle>
              <DialogDescription>
                Current balance: <strong className="text-amber-400 font-mono">{adjustingMember.points} PTS</strong>
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleApplyAdjustment} className="space-y-4 pt-2 text-xs">
              <div>
                <label className="block text-foreground font-semibold mb-1">
                  Point Adjustment (+ for bonus credit, - to deduct)
                </label>
                <Input
                  type="number"
                  required
                  value={adjustmentAmount}
                  onChange={(e) => setAdjustmentAmount(Number(e.target.value))}
                  className="bg-card text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-foreground font-semibold mb-1">Adjustment Reason / Directive *</label>
                <textarea
                  rows={2}
                  required
                  placeholder="e.g. Complimentary compensation for weather reschedule, or concierge referral bonus..."
                  value={adjustmentReason}
                  onChange={(e) => setAdjustmentReason(e.target.value)}
                  className="w-full bg-card border border-border rounded-xl p-2.5 text-foreground text-xs resize-none focus:outline-none focus:border-amber-500"
                />
              </div>

              <DialogFooter className="pt-2">
                <Button type="button" variant="outline" size="sm" onClick={() => setAdjustingMember(null)}>
                  Cancel
                </Button>
                <Button type="submit" size="sm" className="bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold">
                  Confirm Balance Adjustment
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
