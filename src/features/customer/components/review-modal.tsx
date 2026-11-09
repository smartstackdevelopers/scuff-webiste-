"use client";

import * as React from "react";
import { CustomerBooking } from "../types/customer";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Star, CheckCircle2 } from "lucide-react";

interface ReviewModalProps {
  completedBookings: CustomerBooking[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmitReview: (reviewData: {
    bookingReference: string;
    serviceName: string;
    vehicleName: string;
    rating: number;
    title: string;
    comment: string;
  }) => void;
}

export function ReviewModal({
  completedBookings,
  open,
  onOpenChange,
  onSubmitReview,
}: ReviewModalProps) {
  const [selectedBookingRef, setSelectedBookingRef] = React.useState("");
  const [rating, setRating] = React.useState(5);
  const [hoverRating, setHoverRating] = React.useState<number | null>(null);
  const [title, setTitle] = React.useState("");
  const [comment, setComment] = React.useState("");
  const [isSuccess, setIsSuccess] = React.useState(false);

  React.useEffect(() => {
    if (completedBookings.length > 0 && !selectedBookingRef) {
      setSelectedBookingRef(completedBookings[0].reference);
    }
  }, [completedBookings, selectedBookingRef]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !comment.trim()) return;

    const matchedBooking = completedBookings.find(
      (b) => b.reference === selectedBookingRef
    );

    onSubmitReview({
      bookingReference: selectedBookingRef || "YSWB-GENERAL",
      serviceName: matchedBooking?.serviceName || "Full Detailing Service",
      vehicleName: matchedBooking?.vehicleName || "Registered Vehicle",
      rating,
      title: title.trim(),
      comment: comment.trim(),
    });

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setTitle("");
      setComment("");
      onOpenChange(false);
    }, 700);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent size="default">
        <DialogHeader>
          <div className="flex items-center gap-2 text-amber-400 mb-1">
            <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider">
              Client Feedback
            </span>
          </div>
          <DialogTitle>Share Your Detailing Experience</DialogTitle>
          <DialogDescription>
            Your review helps us maintain our standard of automotive luxury and guides fellow car enthusiasts.
          </DialogDescription>
        </DialogHeader>

        {isSuccess ? (
          <div className="py-8 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto animate-bounce" />
            <h4 className="text-base font-bold text-foreground">
              Thank You for Your Feedback!
            </h4>
            <p className="text-xs text-muted-foreground">
              Your review has been submitted and published to your customer profile.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 py-2">
            {/* Booking Selector */}
            <div>
              <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1.5">
                Select Completed Service
              </label>
              <select
                value={selectedBookingRef}
                onChange={(e) => setSelectedBookingRef(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-background border border-border text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-electric"
              >
                {completedBookings.map((b) => (
                  <option key={b.id} value={b.reference}>
                    {b.reference} — {b.serviceName} ({b.vehicleName})
                  </option>
                ))}
                {completedBookings.length === 0 && (
                  <option value="YSWB-GEN">General Detailing Experience</option>
                )}
              </select>
            </div>

            {/* Interactive Star Rating */}
            <div>
              <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-2">
                Overall Satisfaction Rating *
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => {
                  const currentDisplay = hoverRating ?? rating;
                  const filled = star <= currentDisplay;

                  return (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(null)}
                      onClick={() => setRating(star)}
                      className="p-1 text-muted-foreground hover:scale-110 transition-transform focus:outline-none"
                      aria-label={`Rate ${star} stars`}
                    >
                      <Star
                        className={`w-7 h-7 ${
                          filled
                            ? "fill-amber-400 text-amber-400"
                            : "text-muted-foreground/40"
                        }`}
                      />
                    </button>
                  );
                })}
                <span className="ml-2 text-xs font-bold text-foreground font-mono">
                  {rating} of 5 Stars
                </span>
              </div>
            </div>

            {/* Review Title */}
            <div>
              <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1.5">
                Review Headline *
              </label>
              <Input
                placeholder="e.g. Flawless ceramic coating and mirror gloss!"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            {/* Comment */}
            <div>
              <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1.5">
                Detailed Review *
              </label>
              <Textarea
                rows={4}
                placeholder="Tell us about the paint finish, interior detailing, communication, and overall professionalism..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
              />
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit" variant="default" size="sm">
                Submit Review
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
