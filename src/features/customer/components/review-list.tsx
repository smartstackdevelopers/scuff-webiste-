"use client";

import * as React from "react";
import { CustomerReview, CustomerBooking } from "../types/customer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MessageSquarePlus, Trash2, CheckCircle2 } from "lucide-react";
import { useCustomer } from "../hooks/use-customer";
import { ReviewModal } from "./review-modal";

interface ReviewListProps {
  reviews?: CustomerReview[];
  completedBookings?: CustomerBooking[];
  onAddReview?: (reviewData: {
    bookingReference: string;
    serviceName: string;
    vehicleName: string;
    rating: number;
    title: string;
    comment: string;
  }) => void;
  onDeleteReview?: (id: string) => void;
}

export function ReviewList({
  reviews: propReviews,
  completedBookings: propBookings,
  onAddReview: propAddReview,
  onDeleteReview: propDeleteReview,
}: ReviewListProps = {}) {
  const customer = useCustomer();
  const reviews = propReviews || customer.reviews;
  const completedBookings =
    propBookings ||
    customer.bookings.filter((b) => b.status === "completed");
  const onAddReview = propAddReview || customer.addReview;
  const onDeleteReview = propDeleteReview || customer.deleteReview;

  const [modalOpen, setModalOpen] = React.useState(false);

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
        ).toFixed(1)
      : "5.0";

  return (
    <div className="space-y-6">
      {/* Top Banner & Summary */}
      <div className="p-6 rounded-2xl bg-card border border-border/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex flex-col items-center justify-center text-amber-400">
            <span className="text-2xl font-black font-mono leading-none">
              {averageRating}
            </span>
            <div className="flex items-center gap-0.5 mt-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-base font-bold text-foreground">
              Your Detailing Testimonials
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              You have submitted {reviews.length} verified detailing reviews.
            </p>
          </div>
        </div>

        <Button
          variant="default"
          size="sm"
          onClick={() => setModalOpen(true)}
          className="text-xs font-bold uppercase tracking-wider"
        >
          <MessageSquarePlus className="w-4 h-4 mr-1.5" />
          <span>Write a Review</span>
        </Button>
      </div>

      {/* Reviews Grid */}
      {reviews.length === 0 ? (
        <div className="py-12 text-center rounded-2xl bg-card border border-border/80 space-y-3">
          <Star className="w-10 h-10 text-muted-foreground mx-auto" />
          <h4 className="text-sm font-bold text-foreground">No Reviews Yet</h4>
          <p className="text-xs text-muted-foreground max-w-sm mx-auto">
            Once you experience our detailing service, share your thoughts and photos here.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setModalOpen(true)}
            className="text-xs"
          >
            Leave Your First Review
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-5 rounded-2xl bg-card border border-border/80 flex flex-col justify-between space-y-4 hover:border-border transition-colors"
            >
              <div className="space-y-2.5">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={`w-4 h-4 ${
                          s <= rev.rating
                            ? "fill-amber-400 text-amber-400"
                            : "text-muted-foreground/30"
                        }`}
                      />
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge variant="success" className="text-[10px] py-0">
                      <CheckCircle2 className="w-2.5 h-2.5 mr-1" /> Verified
                    </Badge>
                    <button
                      type="button"
                      onClick={() => onDeleteReview(rev.id)}
                      className="p-1 rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                      aria-label="Delete review"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-foreground">
                    &ldquo;{rev.title}&rdquo;
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    {rev.comment}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-border/60 flex items-center justify-between text-[11px] text-muted-foreground">
                <div>
                  <span className="font-semibold text-foreground">
                    {rev.serviceName}
                  </span>
                  <span className="block text-[10px] text-muted-foreground">
                    {rev.vehicleName} • Ref: {rev.bookingReference}
                  </span>
                </div>
                <span>{rev.reviewDate}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Review Modal */}
      <ReviewModal
        completedBookings={completedBookings}
        open={modalOpen}
        onOpenChange={setModalOpen}
        onSubmitReview={onAddReview}
      />
    </div>
  );
}
