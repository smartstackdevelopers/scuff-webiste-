"use client";

import * as React from "react";
import {
  Award,
  Share2,
  Copy,
  CheckCircle2,
  Gift,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function CustomerLoyaltyView() {
  const [copied, setCopied] = React.useState(false);
  const [points, setPoints] = React.useState(2450);
  const [redeemedCode, setRedeemedCode] = React.useState<string | null>(null);

  const referralCode = "BUFF-VIP-ALISTAIR";
  const referralLink = `https://youscuffwebuff.co.uk/r/${referralCode}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleRedeemVoucher = (pts: number, value: number) => {
    if (points >= pts) {
      setPoints((prev) => prev - pts);
      setRedeemedCode(`LOYAL-${value}OFF-${Math.floor(1000 + Math.random() * 9000)}`);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <Badge variant="warning" className="text-[10px] uppercase font-bold">
            Detailing Guild Rewards
          </Badge>
          <span className="text-muted-foreground text-xs font-mono">• Tier Status: Gold Master</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground font-serif tracking-tight mt-1">
          Loyalty Points & Referral Perks
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
          Earn points on every machine compounding session, ceramic application, and peer recommendation.
        </p>
      </div>

      {/* Main Tier & Points Overview Card */}
      <div className="rounded-3xl bg-gradient-to-br from-charcoal-900 via-card to-charcoal-900 border border-amber-500/30 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold tracking-wide uppercase">
              <Award className="w-4 h-4" />
              <span>Current Available Balance</span>
            </div>
            <div className="flex items-baseline gap-3">
              <span className="text-4xl sm:text-6xl font-extrabold font-mono text-foreground tracking-tight">
                {points.toLocaleString()}
              </span>
              <span className="text-lg font-bold text-amber-400">PTS</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Equivalent to <strong className="text-emerald-400 font-mono">£{(points * 0.05).toFixed(2)}</strong> credit toward any paint correction or ceramic coating package.
            </p>
          </div>

          <div className="space-y-3 md:text-right">
            <Badge variant="electric" className="text-xs px-3 py-1 font-bold">
              Gold Master Tier
            </Badge>
            <p className="text-[11px] text-muted-foreground max-w-xs md:ml-auto">
              550 points until <strong className="text-foreground">Black Obsidian VIP</strong> (unlocks free annual ceramic inspection top-ups).
            </p>
            {/* Progress bar */}
            <div className="w-full md:w-56 h-2 rounded-full bg-secondary/80 overflow-hidden md:ml-auto">
              <div className="h-full rounded-full bg-gradient-to-r from-amber-500 to-amber-300" style={{ width: "81%" }} />
            </div>
          </div>
        </div>
      </div>

      {/* Redeemed Voucher Alert */}
      {redeemedCode && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <div>
              <p className="text-xs font-bold text-foreground">Discount Voucher Unlocked!</p>
              <p className="text-[11px] text-muted-foreground">
                Apply promo code <strong className="font-mono text-emerald-400">{redeemedCode}</strong> during online booking checkout.
              </p>
            </div>
          </div>
          <Button size="sm" variant="outline" onClick={() => setRedeemedCode(null)} className="text-xs">
            Dismiss
          </Button>
        </div>
      )}

      {/* 2-Column: Redeem Vouchers & Referral Program */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Redeem Points */}
        <div className="bg-card border border-border/70 rounded-2xl p-6 space-y-4 shadow-sm">
          <h2 className="text-base font-bold text-foreground flex items-center gap-2">
            <Gift className="w-4 h-4 text-amber-400" />
            Convert Points into Detailing Vouchers
          </h2>
          <p className="text-xs text-muted-foreground">
            Instantly convert accrued guild points into promotional booking credits.
          </p>

          <div className="space-y-3 pt-2">
            {[
              { pts: 500, value: 25, label: "£25 Detailing Credit" },
              { pts: 1000, value: 50, label: "£50 Paint Correction Credit" },
              { pts: 2000, value: 100, label: "£100 Ceramic Shield Credit" },
            ].map((v) => (
              <div key={v.value} className="p-3.5 rounded-xl bg-background/60 border border-border/50 flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-bold text-foreground">{v.label}</p>
                  <p className="text-[11px] font-mono text-muted-foreground">{v.pts} points required</p>
                </div>
                <Button
                  size="sm"
                  disabled={points < v.pts}
                  onClick={() => handleRedeemVoucher(v.pts, v.value)}
                  className="bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs"
                >
                  Redeem
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Share Referral Link */}
        <div className="bg-card border border-border/70 rounded-2xl p-6 space-y-4 shadow-sm">
          <h2 className="text-base font-bold text-foreground flex items-center gap-2">
            <Share2 className="w-4 h-4 text-electric" />
            Refer Fellow Collectors & Friends
          </h2>
          <p className="text-xs text-muted-foreground">
            Give a friend <strong className="text-foreground">£50 off</strong> their first studio or mobile package. You will automatically receive <strong className="text-amber-400">500 points (£25 value)</strong> upon job completion.
          </p>

          <div className="space-y-2 pt-2">
            <label className="text-xs font-semibold text-foreground">Your Exclusive Referral Link</label>
            <div className="flex items-center gap-2">
              <input
                readOnly
                value={referralLink}
                className="w-full bg-background border border-border rounded-xl px-3 py-2 text-xs font-mono text-foreground focus:outline-none"
              />
              <Button size="sm" onClick={handleCopy} className="bg-electric text-black font-bold text-xs shrink-0 gap-1.5">
                {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? "Copied" : "Copy"}</span>
              </Button>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-secondary/40 border border-border/40 text-[11px] text-muted-foreground space-y-1">
            <div className="flex items-center justify-between">
              <span>Friends Referred: <strong className="text-foreground">4</strong></span>
              <span>Points Earned: <strong className="text-emerald-400 font-mono">2,000 PTS</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* Points History Ledger */}
      <div className="bg-card border border-border/70 rounded-2xl p-6 space-y-4 shadow-sm">
        <h2 className="text-base font-bold text-foreground flex items-center gap-2">
          <Clock className="w-4 h-4 text-muted-foreground" />
          Recent Points Activity
        </h2>

        <div className="divide-y divide-border/40 text-xs">
          {[
            { date: "02 Feb 2026", desc: "Completed 5-Year Graphene Ceramic Package (Porsche 911)", pts: "+1,250 PTS", type: "earn" },
            { date: "18 Jan 2026", desc: "Peer Referral Reward (David M. — Aston Martin DB11)", pts: "+500 PTS", type: "earn" },
            { date: "05 Jan 2026", desc: "Redeemed £50 Detailing Voucher (VOUCHER-50OFF)", pts: "-1,000 PTS", type: "spend" },
            { date: "12 Dec 2025", desc: "Interior Leather Restoration & Fogging", pts: "+450 PTS", type: "earn" },
          ].map((item, i) => (
            <div key={i} className="py-3 flex items-center justify-between gap-4">
              <div>
                <p className="font-semibold text-foreground">{item.desc}</p>
                <p className="text-[10px] text-muted-foreground font-mono">{item.date}</p>
              </div>
              <span className={`font-mono font-bold ${item.type === "earn" ? "text-emerald-400" : "text-rose-400"}`}>
                {item.pts}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
