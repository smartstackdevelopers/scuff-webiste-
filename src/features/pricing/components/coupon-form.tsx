"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tag, CheckCircle2, AlertCircle, X, Loader2, ArrowRight } from "lucide-react";
import { Coupon, CouponValidationResult } from "../types/pricing";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { validateCoupon } from "../lib/pricing-calculations";
import { DEMO_AVAILABLE_COUPONS } from "../data/coupons";

interface CouponFormProps {
  currentSubtotal: number;
  appliedCoupon: Coupon | null;
  onApplyCoupon: (coupon: Coupon, discountAmount: number) => void;
  onRemoveCoupon: () => void;
}

export function CouponForm({
  currentSubtotal,
  appliedCoupon,
  onApplyCoupon,
  onRemoveCoupon,
}: CouponFormProps) {
  const [inputCode, setInputCode] = React.useState<string>("");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [feedback, setFeedback] = React.useState<CouponValidationResult | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode.trim()) return;

    setIsLoading(true);
    setFeedback(null);

    // Simulate realistic asynchronous network request (400ms)
    setTimeout(() => {
      const result = validateCoupon(inputCode, currentSubtotal);
      setIsLoading(false);
      setFeedback(result);

      if (result.isValid && result.coupon) {
        onApplyCoupon(result.coupon, result.discountAmount);
      }
    }, 400);
  };

  const handleQuickApply = (code: string) => {
    setInputCode(code);
    setIsLoading(true);
    setFeedback(null);

    setTimeout(() => {
      const result = validateCoupon(code, currentSubtotal);
      setIsLoading(false);
      setFeedback(result);

      if (result.isValid && result.coupon) {
        onApplyCoupon(result.coupon, result.discountAmount);
      }
    }, 300);
  };

  const handleRemove = () => {
    onRemoveCoupon();
    setFeedback(null);
    setInputCode("");
  };

  return (
    <div className="space-y-4">
      {appliedCoupon ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between gap-3"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-foreground flex items-center gap-2">
                <span>Code Applied:</span>
                <code className="text-emerald-400 font-mono text-xs uppercase px-1.5 py-0.5 rounded bg-emerald-950/40">
                  {appliedCoupon.code}
                </code>
              </p>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                {appliedCoupon.description}
              </p>
            </div>
          </div>

          <Button
            type="button"
            size="xs"
            variant="ghost"
            onClick={handleRemove}
            className="text-xs text-muted-foreground hover:text-destructive shrink-0"
          >
            <X className="w-3.5 h-3.5 mr-1" />
            Remove
          </Button>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              <Input
                type="text"
                value={inputCode}
                onChange={(e) => {
                  setInputCode(e.target.value.toUpperCase());
                  if (feedback) setFeedback(null);
                }}
                placeholder="Enter promo code (e.g. DETAIL15)"
                className="pl-9 font-mono uppercase text-xs sm:text-sm h-10"
                disabled={isLoading}
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading || !inputCode.trim()}
              size="sm"
              variant="default"
              className="bg-electric text-black hover:bg-electric/90 text-xs font-bold h-10 px-4 shrink-0"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin mr-1" />
                  Checking...
                </>
              ) : (
                <>
                  Apply
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </>
              )}
            </Button>
          </div>

          {/* Validation Feedback Banner */}
          <AnimatePresence>
            {feedback && !feedback.isValid && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="p-3 rounded-lg bg-destructive/10 border border-destructive/30 text-xs text-destructive flex items-center gap-2"
              >
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{feedback.message}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Demo Available Codes Quick-Pills */}
          <div className="pt-1">
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground block mb-1.5 font-semibold">
              Available Demo Coupons (Click to test):
            </span>
            <div className="flex flex-wrap gap-1.5">
              {DEMO_AVAILABLE_COUPONS.map((coupon) => (
                <button
                  key={coupon.code}
                  type="button"
                  onClick={() => handleQuickApply(coupon.code)}
                  className="px-2 py-0.5 rounded text-[11px] font-mono bg-muted border border-border/70 hover:border-electric/50 text-foreground/80 hover:text-electric transition-colors"
                >
                  {coupon.code} ({coupon.discountType === "percentage" ? `${coupon.discountValue}%` : `£${coupon.discountValue}`})
                </button>
              ))}
            </div>
          </div>
        </form>
      )}

      {/* Simulation Notice */}
      <p className="text-[10px] text-muted-foreground italic">
        * Frontend simulation only. Real cryptographic coupon validation and usage limits are verified on the backend during checkout.
      </p>
    </div>
  );
}
