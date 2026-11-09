"use client";

import * as React from "react";
import {
  Gift,
  Plus,
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

interface AdminGiftCard {
  id: string;
  code: string;
  purchaserName: string;
  recipientName: string;
  recipientEmail: string;
  initialValue: number;
  balance: number;
  issuedDate: string;
  status: "active" | "redeemed" | "expired";
}

export function AdminGiftCardsView() {
  const [cards, setCards] = React.useState<AdminGiftCard[]>([
    {
      id: "gc-1",
      code: "BUFF-LUX-8821-X99",
      purchaserName: "Marcus Vance",
      recipientName: "Lord Alistair Vance",
      recipientEmail: "alistair@vance-holdings.co.uk",
      initialValue: 250,
      balance: 150,
      issuedDate: "15 Jan 2026",
      status: "active",
    },
    {
      id: "gc-2",
      code: "BUFF-CORP-4401-K12",
      purchaserName: "Bentley London Dealership",
      recipientName: "Jonathan Hayes",
      recipientEmail: "j.hayes@hayes-investments.com",
      initialValue: 500,
      balance: 500,
      issuedDate: "01 Feb 2026",
      status: "active",
    },
    {
      id: "gc-3",
      code: "BUFF-VIP-9910-Z04",
      purchaserName: "McLaren Club UK",
      recipientName: "David Miller",
      recipientEmail: "david@miller-racing.com",
      initialValue: 250,
      balance: 0,
      issuedDate: "10 Dec 2025",
      status: "redeemed",
    },
  ]);

  const [search, setSearch] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<string>("all");

  // Issue Voucher Modal
  const [issueModalOpen, setIssueModalOpen] = React.useState(false);
  const [issueForm, setIssueForm] = React.useState({
    purchaserName: "",
    recipientName: "",
    recipientEmail: "",
    amount: 250,
  });

  const [toastMessage, setToastMessage] = React.useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleIssueVoucher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!issueForm.purchaserName.trim() || !issueForm.recipientEmail.trim()) return;

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newCard: AdminGiftCard = {
      id: `gc-${Date.now()}`,
      code: `BUFF-CORP-${randomSuffix}-X${Math.floor(10 + Math.random() * 89)}`,
      purchaserName: issueForm.purchaserName,
      recipientName: issueForm.recipientName || issueForm.purchaserName,
      recipientEmail: issueForm.recipientEmail,
      initialValue: Number(issueForm.amount),
      balance: Number(issueForm.amount),
      issuedDate: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
      status: "active",
    };

    setCards((prev) => [newCard, ...prev]);
    setIssueModalOpen(false);
    showToast(`Voucher ${newCard.code} (£${newCard.balance}) successfully issued to ${newCard.recipientEmail}!`);
    setIssueForm({
      purchaserName: "",
      recipientName: "",
      recipientEmail: "",
      amount: 250,
    });
  };

  const filtered = cards.filter((c) => {
    const matchesSearch =
      c.code.toLowerCase().includes(search.toLowerCase()) ||
      c.purchaserName.toLowerCase().includes(search.toLowerCase()) ||
      c.recipientEmail.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalOutstanding = cards
    .filter((c) => c.status === "active")
    .reduce((sum, c) => sum + c.balance, 0);

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
              Voucher Ledger
            </span>
            <span className="text-muted-foreground text-xs font-mono">• Pre-paid Balances</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground font-serif tracking-tight mt-1">
            Gift Cards & Stored Value Management
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Issue corporate vouchers, audit customer balances, and track redemption utilization.
          </p>
        </div>

        <Button
          onClick={() => setIssueModalOpen(true)}
          className="bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs gap-1.5 self-start sm:self-auto shadow-md shadow-amber-500/20"
        >
          <Plus className="w-4 h-4" />
          <span>Issue Corporate Voucher</span>
        </Button>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-border/60 bg-card p-4 shadow-sm">
          <span className="text-xs text-muted-foreground">Total Cards Issued</span>
          <p className="mt-1 text-3xl font-extrabold font-mono text-foreground">{cards.length}</p>
          <p className="text-[11px] text-muted-foreground mt-1">Lifetime digital vouchers</p>
        </div>

        <div className="rounded-2xl border border-border/60 bg-card p-4 shadow-sm">
          <span className="text-xs text-muted-foreground">Outstanding Liability</span>
          <p className="mt-1 text-3xl font-extrabold font-mono text-amber-400">
            £{totalOutstanding.toFixed(2)}
          </p>
          <p className="text-[11px] text-muted-foreground mt-1">Unredeemed card balances</p>
        </div>

        <div className="rounded-2xl border border-border/60 bg-card p-4 shadow-sm">
          <span className="text-xs text-muted-foreground">Fully Redeemed</span>
          <p className="mt-1 text-3xl font-extrabold font-mono text-emerald-400">
            {cards.filter((c) => c.status === "redeemed").length}
          </p>
          <p className="text-[11px] text-muted-foreground mt-1">Completed bookings</p>
        </div>

        <div className="rounded-2xl border border-border/60 bg-card p-4 shadow-sm">
          <span className="text-xs text-muted-foreground">B2B Dealership Vouchers</span>
          <p className="mt-1 text-3xl font-extrabold font-mono text-cyan-400">£1,250</p>
          <p className="text-[11px] text-muted-foreground mt-1">Purchased by partners</p>
        </div>
      </div>

      {/* Filter bar */}
      <div className="p-4 rounded-2xl bg-card border border-border/70 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by voucher code, purchaser, or recipient email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 text-xs bg-background"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-background text-foreground border border-border rounded-xl text-xs px-3 py-2 focus:outline-none focus:border-amber-500"
        >
          <option value="all">All Card Statuses</option>
          <option value="active">Active (Available Balance)</option>
          <option value="redeemed">Fully Redeemed</option>
        </select>
      </div>

      {/* Cards Table */}
      <div className="bg-card border border-border/70 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-muted/40 text-muted-foreground font-semibold border-b border-border/50">
              <tr>
                <th className="py-3 px-4">Voucher Code</th>
                <th className="py-3 px-4">Purchaser / Sponsor</th>
                <th className="py-3 px-4">Recipient</th>
                <th className="py-3 px-4 text-right">Initial Value</th>
                <th className="py-3 px-4 text-right">Remaining Balance</th>
                <th className="py-3 px-4 text-center">Issued Date</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {filtered.map((c) => (
                <tr key={c.id} className="hover:bg-muted/10 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-amber-400 text-xs">{c.code}</td>
                  <td className="py-3 px-4 text-foreground font-medium">{c.purchaserName}</td>
                  <td className="py-3 px-4">
                    <p className="font-semibold text-foreground">{c.recipientName}</p>
                    <p className="text-[11px] text-muted-foreground">{c.recipientEmail}</p>
                  </td>
                  <td className="py-3 px-4 text-right font-mono text-muted-foreground">
                    £{c.initialValue.toFixed(2)}
                  </td>
                  <td className="py-3 px-4 text-right font-mono font-bold text-foreground">
                    £{c.balance.toFixed(2)}
                  </td>
                  <td className="py-3 px-4 text-center font-mono text-[11px] text-muted-foreground">
                    {c.issuedDate}
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
                      onClick={() => showToast(`Resent voucher activation code to ${c.recipientEmail}.`)}
                      className="h-7 text-xs"
                    >
                      Resend Email
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Issue Modal */}
      {issueModalOpen && (
        <Dialog open={issueModalOpen} onOpenChange={setIssueModalOpen}>
          <DialogContent size="default">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Gift className="w-5 h-5 text-amber-400" />
                Issue B2B / Corporate Detailing Voucher
              </DialogTitle>
              <DialogDescription>
                Generate an authenticated stored-balance voucher code for corporate partners or VIP gifts.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleIssueVoucher} className="space-y-4 pt-2 text-xs">
              <div>
                <label className="block text-foreground font-semibold mb-1">Purchaser / Sponsor Name *</label>
                <Input
                  required
                  placeholder="e.g. BMW Car Club or Midlands Fleet Services"
                  value={issueForm.purchaserName}
                  onChange={(e) => setIssueForm({ ...issueForm, purchaserName: e.target.value })}
                  className="bg-card text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-foreground font-semibold mb-1">Recipient Name</label>
                  <Input
                    placeholder="Recipient name"
                    value={issueForm.recipientName}
                    onChange={(e) => setIssueForm({ ...issueForm, recipientName: e.target.value })}
                    className="bg-card text-xs"
                  />
                </div>
                <div>
                  <label className="block text-foreground font-semibold mb-1">Recipient Email *</label>
                  <Input
                    type="email"
                    required
                    placeholder="recipient@example.com"
                    value={issueForm.recipientEmail}
                    onChange={(e) => setIssueForm({ ...issueForm, recipientEmail: e.target.value })}
                    className="bg-card text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-foreground font-semibold mb-1">Voucher Credit (£) *</label>
                <Input
                  type="number"
                  required
                  min={25}
                  value={issueForm.amount}
                  onChange={(e) => setIssueForm({ ...issueForm, amount: Number(e.target.value) })}
                  className="bg-card text-xs font-mono"
                />
              </div>

              <DialogFooter className="pt-2">
                <Button type="button" variant="outline" size="sm" onClick={() => setIssueModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" size="sm" className="bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold">
                  Generate & Activate Voucher
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
