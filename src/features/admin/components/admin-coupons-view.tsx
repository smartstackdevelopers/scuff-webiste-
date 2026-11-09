"use client";

import * as React from "react";
import {
  Tag,
  Plus,
  CheckCircle2,
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

interface CouponItem {
  id: string;
  code: string;
  description: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  minSpend: number;
  timesUsed: number;
  maxUses: number;
  expiryDate: string;
  status: "active" | "paused";
}

export function AdminCouponsView() {
  const [coupons, setCoupons] = React.useState<CouponItem[]>([
    {
      id: "c-1",
      code: "SPRING50",
      description: "£50 Off Any Multi-Stage Paint Correction or Full Studio Detail",
      discountType: "fixed",
      discountValue: 50,
      minSpend: 250,
      timesUsed: 18,
      maxUses: 50,
      expiryDate: "30 Apr 2026",
      status: "active",
    },
    {
      id: "c-2",
      code: "CERAMIC10",
      description: "10% Discount on 5-Year Certified Graphene Ceramic Shield",
      discountType: "percentage",
      discountValue: 10,
      minSpend: 600,
      timesUsed: 9,
      maxUses: 30,
      expiryDate: "31 May 2026",
      status: "active",
    },
    {
      id: "c-3",
      code: "VIPREFERRAL",
      description: "£25 Welcome Credit for Verified Peer Referrals",
      discountType: "fixed",
      discountValue: 25,
      minSpend: 150,
      timesUsed: 42,
      maxUses: 100,
      expiryDate: "31 Dec 2026",
      status: "active",
    },
    {
      id: "c-4",
      code: "WINTERDEFENCE",
      description: "Complimentary Underbody Salt Flush on Signature Wash",
      discountType: "fixed",
      discountValue: 35,
      minSpend: 120,
      timesUsed: 50,
      maxUses: 50,
      expiryDate: "28 Feb 2026",
      status: "paused",
    },
  ]);

  const [modalOpen, setModalOpen] = React.useState(false);
  const [form, setForm] = React.useState({
    code: "",
    description: "",
    discountType: "fixed" as "fixed" | "percentage",
    discountValue: 50,
    minSpend: 200,
    maxUses: 50,
    expiryDate: "2026-12-31",
  });

  const [toastMessage, setToastMessage] = React.useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleToggleStatus = (id: string) => {
    setCoupons((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, status: c.status === "active" ? "paused" : "active" } : c
      )
    );
    showToast("Coupon status updated.");
  };

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.code.trim()) return;

    const newCoupon: CouponItem = {
      id: `c-${Date.now()}`,
      code: form.code.toUpperCase().trim(),
      description: form.description || "Promotional Discount Code",
      discountType: form.discountType,
      discountValue: Number(form.discountValue),
      minSpend: Number(form.minSpend),
      timesUsed: 0,
      maxUses: Number(form.maxUses),
      expiryDate: form.expiryDate,
      status: "active",
    };

    setCoupons((prev) => [newCoupon, ...prev]);
    setModalOpen(false);
    showToast(`Coupon code ${newCoupon.code} created and activated!`);
    setForm({
      code: "",
      description: "",
      discountType: "fixed",
      discountValue: 50,
      minSpend: 200,
      maxUses: 50,
      expiryDate: "2026-12-31",
    });
  };

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
              Promotions Engine
            </span>
            <span className="text-muted-foreground text-xs font-mono">• Discounts & Vouchers</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground font-serif tracking-tight mt-1">
            Coupons, Seasonal Offers & Promo Codes
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Configure discount vouchers, campaign promo codes, and redemption thresholds for checkout.
          </p>
        </div>

        <Button
          onClick={() => setModalOpen(true)}
          className="bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs gap-1.5 self-start sm:self-auto shadow-md shadow-amber-500/20"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Coupon</span>
        </Button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-border/60 bg-card p-4 shadow-sm">
          <span className="text-xs text-muted-foreground">Active Campaigns</span>
          <p className="mt-1 text-3xl font-extrabold font-mono text-emerald-400">
            {coupons.filter((c) => c.status === "active").length}
          </p>
          <p className="text-[11px] text-muted-foreground mt-1">Live checkout codes</p>
        </div>

        <div className="rounded-2xl border border-border/60 bg-card p-4 shadow-sm">
          <span className="text-xs text-muted-foreground">Total Redemptions</span>
          <p className="mt-1 text-3xl font-extrabold font-mono text-amber-400">
            {coupons.reduce((sum, c) => sum + c.timesUsed, 0)}
          </p>
          <p className="text-[11px] text-muted-foreground mt-1">Applied across bookings</p>
        </div>

        <div className="rounded-2xl border border-border/60 bg-card p-4 shadow-sm">
          <span className="text-xs text-muted-foreground">Redeemed Discount Volume</span>
          <p className="mt-1 text-3xl font-extrabold font-mono text-foreground">£3,420</p>
          <p className="text-[11px] text-muted-foreground mt-1">Customer savings generated</p>
        </div>

        <div className="rounded-2xl border border-border/60 bg-card p-4 shadow-sm">
          <span className="text-xs text-muted-foreground">Incremental Booking Lift</span>
          <p className="mt-1 text-3xl font-extrabold font-mono text-cyan-400">+28%</p>
          <p className="text-[11px] text-muted-foreground mt-1">Higher conversion with vouchers</p>
        </div>
      </div>

      {/* Coupons Table */}
      <div className="bg-card border border-border/70 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-muted/40 text-muted-foreground font-semibold border-b border-border/50">
              <tr>
                <th className="py-3 px-4">Coupon Code</th>
                <th className="py-3 px-4">Campaign Description</th>
                <th className="py-3 px-4">Discount</th>
                <th className="py-3 px-4 text-center">Min Spend</th>
                <th className="py-3 px-4 text-center">Usage Progress</th>
                <th className="py-3 px-4 text-center">Expiry</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {coupons.map((c) => (
                <tr key={c.id} className="hover:bg-muted/10 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-amber-400 text-sm">{c.code}</td>
                  <td className="py-3 px-4 max-w-xs truncate text-foreground font-medium">
                    {c.description}
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-foreground">
                    {c.discountType === "fixed" ? `£${c.discountValue} OFF` : `${c.discountValue}% OFF`}
                  </td>
                  <td className="py-3 px-4 text-center font-mono">£{c.minSpend}</td>
                  <td className="py-3 px-4 text-center">
                    <span className="font-mono text-foreground font-bold">{c.timesUsed}</span>
                    <span className="text-muted-foreground"> / {c.maxUses}</span>
                  </td>
                  <td className="py-3 px-4 text-center font-mono text-[11px] text-muted-foreground">
                    {c.expiryDate}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <Badge variant={c.status === "active" ? "success" : "secondary"} className="text-[10px]">
                      {c.status}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleToggleStatus(c.id)}
                      className="h-7 text-xs"
                    >
                      {c.status === "active" ? "Pause Code" : "Activate"}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Coupon Modal */}
      {modalOpen && (
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
          <DialogContent size="default">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Tag className="w-5 h-5 text-amber-400" />
                Create New Promotional Coupon
              </DialogTitle>
              <DialogDescription>
                Define code strings, discount percentages, and redemption limits for online checkout.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleCreateCoupon} className="space-y-4 pt-2 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-foreground font-semibold mb-1">Coupon Code *</label>
                  <Input
                    required
                    placeholder="e.g. SUMMERGLOSS"
                    value={form.code}
                    onChange={(e) => setForm({ ...form, code: e.target.value })}
                    className="bg-card text-xs font-mono uppercase"
                  />
                </div>
                <div>
                  <label className="block text-foreground font-semibold mb-1">Discount Type</label>
                  <select
                    value={form.discountType}
                    onChange={(e) => setForm({ ...form, discountType: e.target.value as any })}
                    className="w-full bg-card border border-border rounded-xl px-3 py-2 text-foreground focus:outline-none focus:border-amber-500 text-xs"
                  >
                    <option value="fixed">Fixed Cash Amount (£ OFF)</option>
                    <option value="percentage">Percentage Discount (% OFF)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-foreground font-semibold mb-1">
                    Value {form.discountType === "fixed" ? "(£)" : "(%)"} *
                  </label>
                  <Input
                    type="number"
                    required
                    min={1}
                    value={form.discountValue}
                    onChange={(e) => setForm({ ...form, discountValue: Number(e.target.value) })}
                    className="bg-card text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block text-foreground font-semibold mb-1">Min Spend (£)</label>
                  <Input
                    type="number"
                    min={0}
                    value={form.minSpend}
                    onChange={(e) => setForm({ ...form, minSpend: Number(e.target.value) })}
                    className="bg-card text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block text-foreground font-semibold mb-1">Usage Limit</label>
                  <Input
                    type="number"
                    min={1}
                    value={form.maxUses}
                    onChange={(e) => setForm({ ...form, maxUses: Number(e.target.value) })}
                    className="bg-card text-xs font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-foreground font-semibold mb-1">Expiry Date</label>
                <Input
                  type="date"
                  value={form.expiryDate}
                  onChange={(e) => setForm({ ...form, expiryDate: e.target.value })}
                  className="bg-card text-xs"
                />
              </div>

              <div>
                <label className="block text-foreground font-semibold mb-1">Description / Campaign Label</label>
                <textarea
                  rows={2}
                  placeholder="e.g. £50 off 5-Year Ceramic Coating for club members"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full bg-card border border-border rounded-xl p-2.5 text-foreground text-xs resize-none focus:outline-none focus:border-amber-500"
                />
              </div>

              <DialogFooter className="pt-2">
                <Button type="button" variant="outline" size="sm" onClick={() => setModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" size="sm" className="bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold">
                  Deploy Promo Code
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
