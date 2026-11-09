"use client";

import * as React from "react";
import {
  Star,
  CheckCircle2,
  XCircle,
  MessageSquare,
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

interface ReviewItem {
  id: string;
  customerName: string;
  vehicle: string;
  service: string;
  rating: number;
  date: string;
  comment: string;
  status: "published" | "pending" | "hidden";
  technicianName: string;
  studioReply?: string;
}

export function AdminReviewsView() {
  const [reviews, setReviews] = React.useState<ReviewItem[]>([
    {
      id: "rev-1",
      customerName: "Lord Alistair Vance",
      vehicle: "Porsche 911 GT3 (992)",
      service: "Signature Full Vehicle Detail",
      rating: 5,
      date: "04 Nov 2026",
      comment:
        "Picked up the GT3 following a track session at Silverstone. All rubber tyre marbles, track bug splatter, and brake dust were completely eradicated without adding a single swirl scratch.",
      status: "published",
      technicianName: "Marcus Vance",
      studioReply: "Thank you Lord Vance! It was an absolute honour preparing your GT3 for the upcoming track weekend.",
    },
    {
      id: "rev-2",
      customerName: "Sophia Sterling",
      vehicle: "Range Rover Autobiography",
      service: "Interior Deep Steam Extraction",
      rating: 5,
      date: "01 Nov 2026",
      comment:
        "Years of dog hair, spilled drinks, and dull leather were completely transformed. The technician was punctual, polite, and walked me through every finished surface.",
      status: "published",
      technicianName: "David Henderson",
    },
    {
      id: "rev-3",
      customerName: "Charles Kensington",
      vehicle: "Bentley Continental GT",
      service: "5-Year 9H Ceramic Shield",
      rating: 5,
      date: "28 Oct 2026",
      comment:
        "The hydrophobic water beading on the paintwork is extraordinary. Road salt washes off with a simple rinse. Well worth the investment.",
      status: "published",
      technicianName: "Marcus Vance",
    },
    {
      id: "rev-4",
      customerName: "Emma Watson",
      vehicle: "Aston Martin DB11",
      service: "SMART Bumper Scuff Repair",
      rating: 4,
      date: "25 Oct 2026",
      comment:
        "Car park scrape blended seamlessly into the factory silver metallic paint. Took slightly longer than quoted but the cosmetic finish is flawless.",
      status: "pending",
      technicianName: "Jordan Smith",
    },
  ]);

  const [search, setSearch] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<string>("all");
  const [ratingFilter, setRatingFilter] = React.useState<string>("all");

  // Reply Modal
  const [replyingReview, setReplyingReview] = React.useState<ReviewItem | null>(null);
  const [replyText, setReplyText] = React.useState("");
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleApprove = (id: string) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "published" as const } : r))
    );
    showToast("Review approved and published to website showcase.");
  };

  const handleHide = (id: string) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "hidden" as const } : r))
    );
    showToast("Review hidden from public view.");
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyingReview || !replyText.trim()) return;

    setReviews((prev) =>
      prev.map((r) =>
        r.id === replyingReview.id ? { ...r, studioReply: replyText.trim() } : r
      )
    );
    setReplyingReview(null);
    setReplyText("");
    showToast("Studio response published.");
  };

  const filtered = reviews.filter((r) => {
    const matchesSearch =
      r.customerName.toLowerCase().includes(search.toLowerCase()) ||
      r.vehicle.toLowerCase().includes(search.toLowerCase()) ||
      r.comment.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || r.status === statusFilter;
    const matchesRating = ratingFilter === "all" || r.rating.toString() === ratingFilter;
    return matchesSearch && matchesStatus && matchesRating;
  });

  const avgRating = (
    reviews.reduce((acc, r) => acc + r.rating, 0) / (reviews.length || 1)
  ).toFixed(1);

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
              Reputation HQ
            </span>
            <span className="text-muted-foreground text-xs font-mono">• Customer Feedback</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground font-serif tracking-tight mt-1">
            Verified Reviews & Client Feedback
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Monitor client satisfaction, moderate ratings, and draft official studio responses.
          </p>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-border/60 bg-card p-4 shadow-sm">
          <span className="text-xs text-muted-foreground">Average Rating</span>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold font-mono text-amber-400">{avgRating}</span>
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>
          </div>
          <p className="text-[11px] text-muted-foreground mt-1">Based on {reviews.length} reviews</p>
        </div>

        <div className="rounded-2xl border border-border/60 bg-card p-4 shadow-sm">
          <span className="text-xs text-muted-foreground">Published Live</span>
          <p className="mt-1 text-3xl font-extrabold font-mono text-emerald-400">
            {reviews.filter((r) => r.status === "published").length}
          </p>
          <p className="text-[11px] text-muted-foreground mt-1">Visible on public showcase</p>
        </div>

        <div className="rounded-2xl border border-border/60 bg-card p-4 shadow-sm">
          <span className="text-xs text-muted-foreground">Pending Review</span>
          <p className="mt-1 text-3xl font-extrabold font-mono text-amber-400">
            {reviews.filter((r) => r.status === "pending").length}
          </p>
          <p className="text-[11px] text-muted-foreground mt-1">Awaiting moderation</p>
        </div>

        <div className="rounded-2xl border border-border/60 bg-card p-4 shadow-sm">
          <span className="text-xs text-muted-foreground">Technician Recognition</span>
          <p className="mt-1 text-3xl font-extrabold font-mono text-foreground">100%</p>
          <p className="text-[11px] text-muted-foreground mt-1">All verified technicians rated 4★+</p>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="p-4 rounded-2xl bg-card border border-border/70 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by client, vehicle, or review comment..."
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
          <option value="all">All Moderation States</option>
          <option value="published">Published</option>
          <option value="pending">Pending Moderation</option>
          <option value="hidden">Hidden</option>
        </select>

        <select
          value={ratingFilter}
          onChange={(e) => setRatingFilter(e.target.value)}
          className="bg-background text-foreground border border-border rounded-xl text-xs px-3 py-2 focus:outline-none focus:border-amber-500"
        >
          <option value="all">All Star Ratings</option>
          <option value="5">5 Stars Only</option>
          <option value="4">4 Stars Only</option>
          <option value="3">3 Stars Only</option>
        </select>
      </div>

      {/* Reviews Table / List */}
      <div className="space-y-4">
        {filtered.map((rev) => (
          <div
            key={rev.id}
            className="rounded-2xl border border-border/70 bg-card p-5 space-y-4 hover:border-amber-500/30 transition-all shadow-sm"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center font-bold text-xs text-foreground">
                  {rev.customerName.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-foreground">{rev.customerName}</span>
                    <span className="text-xs text-muted-foreground">• {rev.vehicle}</span>
                    <Badge
                      variant={
                        rev.status === "published"
                          ? "success"
                          : rev.status === "pending"
                          ? "warning"
                          : "destructive"
                      }
                      className="text-[10px]"
                    >
                      {rev.status}
                    </Badge>
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    {rev.service} • Assigned: <strong className="text-foreground">{rev.technicianName}</strong>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-center">
                <div className="flex text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="text-xs font-mono text-muted-foreground">{rev.date}</span>
              </div>
            </div>

            <p className="text-xs text-foreground/90 leading-relaxed bg-background/50 p-3 rounded-xl border border-border/40">
              &quot;{rev.comment}&quot;
            </p>

            {rev.studioReply && (
              <div className="ml-4 pl-3 border-l-2 border-amber-500/50 space-y-1 text-xs">
                <span className="font-bold text-amber-400 text-[11px]">Studio Response:</span>
                <p className="text-muted-foreground">{rev.studioReply}</p>
              </div>
            )}

            <div className="flex items-center justify-end gap-2 pt-1 border-t border-border/40">
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setReplyingReview(rev);
                  setReplyText(rev.studioReply || "");
                }}
                className="h-8 text-xs gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>{rev.studioReply ? "Edit Reply" : "Reply as Studio"}</span>
              </Button>

              {rev.status === "pending" && (
                <Button
                  size="sm"
                  onClick={() => handleApprove(rev.id)}
                  className="h-8 text-xs bg-emerald-600 hover:bg-emerald-500 text-white font-bold gap-1"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Publish</span>
                </Button>
              )}

              {rev.status === "published" && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleHide(rev.id)}
                  className="h-8 text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 gap-1"
                >
                  <XCircle className="w-3.5 h-3.5" />
                  <span>Hide Review</span>
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Reply Modal */}
      {replyingReview && (
        <Dialog open={!!replyingReview} onOpenChange={(open) => !open && setReplyingReview(null)}>
          <DialogContent size="default">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-amber-400" />
                Draft Studio Response
              </DialogTitle>
              <DialogDescription>
                Reply publicly to {replyingReview.customerName}&apos;s verified feedback for their {replyingReview.vehicle}.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSendReply} className="space-y-4 pt-2 text-xs">
              <div className="p-3 rounded-xl bg-secondary/50 text-muted-foreground italic border border-border/40">
                &quot;{replyingReview.comment}&quot;
              </div>

              <div>
                <label className="block text-foreground font-semibold mb-1">Official Response Message</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Thank you for trusting You Scuff We Buff with your vehicle..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="w-full bg-card border border-border rounded-xl p-3 text-foreground text-xs resize-none focus:outline-none focus:border-amber-500"
                />
              </div>

              <DialogFooter className="pt-2">
                <Button type="button" variant="outline" size="sm" onClick={() => setReplyingReview(null)}>
                  Cancel
                </Button>
                <Button type="submit" size="sm" className="bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold">
                  Publish Response
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
