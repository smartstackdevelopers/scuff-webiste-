"use client";

import * as React from "react";
import {
  CreditCard,
  Gift,
  CheckCircle2,
  Copy,
  Sparkles,
  Send,
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

interface DigitalCard {
  id: string;
  code: string;
  balance: number;
  initialValue: number;
  expiryDate: string;
  sender: string;
  message: string;
}

export function CustomerGiftCardsView() {
  const [cards, setCards] = React.useState<DigitalCard[]>([
    {
      id: "gc-1",
      code: "BUFF-LUX-8821-X99",
      balance: 150,
      initialValue: 250,
      expiryDate: "31 Dec 2026",
      sender: "Marcus Vance",
      message: "Happy Birthday! Treat the 911 to the paint correction it deserves.",
    },
  ]);

  const [redeemInput, setRedeemInput] = React.useState("");
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  // Buy Gift Card Modal
  const [buyModalOpen, setBuyModalOpen] = React.useState(false);
  const [buyForm, setBuyForm] = React.useState({
    amount: 250,
    recipientName: "",
    recipientEmail: "",
    message: "",
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleCopy = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    showToast("Voucher code copied to clipboard!");
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleRedeemCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!redeemInput.trim()) return;

    if (redeemInput.toUpperCase().includes("BUFF")) {
      const newCard: DigitalCard = {
        id: `gc-${Date.now()}`,
        code: redeemInput.toUpperCase(),
        balance: 100,
        initialValue: 100,
        expiryDate: "31 Dec 2026",
        sender: "Executive Concierge",
        message: "Promotional Detailing Gift Card",
      };
      setCards((prev) => [newCard, ...prev]);
      setRedeemInput("");
      showToast("Gift card successfully linked to your wallet (£100 added)!");
    } else {
      showToast("Card code applied. £50 bonus credit registered.");
      setRedeemInput("");
    }
  };

  const handleBuyCard = (e: React.FormEvent) => {
    e.preventDefault();
    setBuyModalOpen(false);
    showToast(`Digital Gift Card for £${buyForm.amount} issued and dispatched to ${buyForm.recipientEmail}!`);
    setBuyForm({
      amount: 250,
      recipientName: "",
      recipientEmail: "",
      message: "",
    });
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-emerald-500 text-zinc-950 font-bold px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 border border-emerald-400 text-xs">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="electric" className="text-[10px] uppercase font-bold">
              Digital Wallet
            </Badge>
            <span className="text-muted-foreground text-xs font-mono">• Stored Value</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground font-serif tracking-tight mt-1">
            Detailing Gift Cards & Vouchers
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Manage your automotive gift cards, redeem codes, or gift a signature paint restoration to another vehicle owner.
          </p>
        </div>

        <Button
          onClick={() => setBuyModalOpen(true)}
          className="bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs gap-1.5 self-start sm:self-auto shadow-md shadow-amber-500/20"
        >
          <Gift className="w-4 h-4" />
          <span>Purchase Gift Card</span>
        </Button>
      </div>

      {/* Link / Redeem Code Banner */}
      <div className="bg-card border border-border/70 rounded-2xl p-5 shadow-sm">
        <form onSubmit={handleRedeemCode} className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Gift className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-400" />
            <Input
              placeholder="Enter 16-character gift card code (e.g. BUFF-LUX-9921-X99)..."
              value={redeemInput}
              onChange={(e) => setRedeemInput(e.target.value)}
              className="pl-10 text-xs font-mono bg-background"
            />
          </div>
          <Button type="submit" size="sm" className="w-full sm:w-auto bg-card border border-border hover:bg-muted text-xs">
            Link to Account
          </Button>
        </form>
      </div>

      {/* Cards List */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-foreground flex items-center gap-2">
          <CreditCard className="w-4 h-4 text-amber-400" />
          Active Gift Vouchers ({cards.length})
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cards.map((card) => (
            <div
              key={card.id}
              className="rounded-3xl bg-gradient-to-br from-charcoal-900 via-card to-charcoal-950 border border-amber-500/30 p-6 shadow-xl relative overflow-hidden flex flex-col justify-between space-y-6"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                    Master Detailing Gift Voucher
                  </span>
                  <h3 className="text-xl font-extrabold text-foreground font-mono mt-0.5">
                    £{card.balance.toFixed(2)}
                  </h3>
                  <span className="text-[10px] text-muted-foreground font-mono">
                    Initial Balance: £{card.initialValue.toFixed(2)}
                  </span>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
              </div>

              {card.message && (
                <p className="text-xs text-muted-foreground italic bg-background/50 p-3 rounded-xl border border-border/40">
                  &quot;{card.message}&quot; — <span className="font-semibold text-foreground">{card.sender}</span>
                </p>
              )}

              <div className="pt-2 border-t border-border/40 flex items-center justify-between text-xs">
                <div className="font-mono text-[11px] text-foreground font-bold tracking-wider">
                  {card.code}
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleCopy(card.id, card.code)}
                  className="h-7 text-xs text-amber-400 hover:text-amber-300 gap-1"
                >
                  {copiedId === card.id ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedId === card.id ? "Copied" : "Copy Code"}</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Buy Modal */}
      {buyModalOpen && (
        <Dialog open={buyModalOpen} onOpenChange={setBuyModalOpen}>
          <DialogContent size="default">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Gift className="w-5 h-5 text-amber-400" />
                Purchase Digital Gift Card
              </DialogTitle>
              <DialogDescription>
                Deliver a luxury vehicle paint correction or ceramic coating experience to a friend or family member.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleBuyCard} className="space-y-4 pt-2 text-xs">
              <div>
                <label className="block text-foreground font-semibold mb-1">Select Voucher Value</label>
                <div className="grid grid-cols-4 gap-2">
                  {[100, 250, 500, 1000].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setBuyForm({ ...buyForm, amount: amt })}
                      className={`py-2 rounded-xl font-bold font-mono text-xs border transition-all ${
                        buyForm.amount === amt
                          ? "bg-amber-500 text-zinc-950 border-amber-400 shadow-md"
                          : "bg-card border-border text-foreground hover:bg-muted"
                      }`}
                    >
                      £{amt}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-foreground font-semibold mb-1">Recipient Name *</label>
                <Input
                  required
                  placeholder="e.g. David Miller"
                  value={buyForm.recipientName}
                  onChange={(e) => setBuyForm({ ...buyForm, recipientName: e.target.value })}
                  className="bg-card text-xs"
                />
              </div>

              <div>
                <label className="block text-foreground font-semibold mb-1">Recipient Email *</label>
                <Input
                  type="email"
                  required
                  placeholder="david@example.co.uk"
                  value={buyForm.recipientEmail}
                  onChange={(e) => setBuyForm({ ...buyForm, recipientEmail: e.target.value })}
                  className="bg-card text-xs"
                />
              </div>

              <div>
                <label className="block text-foreground font-semibold mb-1">Personal Gift Message</label>
                <textarea
                  rows={2}
                  placeholder="Enjoy the ceramic coating on your new car!"
                  value={buyForm.message}
                  onChange={(e) => setBuyForm({ ...buyForm, message: e.target.value })}
                  className="w-full bg-card border border-border rounded-xl p-2.5 text-foreground text-xs resize-none focus:outline-none focus:border-amber-500"
                />
              </div>

              <DialogFooter className="pt-2">
                <Button type="button" variant="outline" size="sm" onClick={() => setBuyModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" size="sm" className="bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold gap-1.5">
                  <Send className="w-3.5 h-3.5" />
                  <span>Confirm & Issue (£{buyForm.amount})</span>
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
