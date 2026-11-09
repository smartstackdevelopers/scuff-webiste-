import * as React from "react";
import { ReviewList } from "@/features/customer";

export const metadata = {
  title: "My Reviews & Feedback | You Scuff We Buff",
  description:
    "Review your past detailing services, rate paint correction results, and share your experience.",
};

export default function CustomerReviewsPage() {
  return <ReviewList />;
}
