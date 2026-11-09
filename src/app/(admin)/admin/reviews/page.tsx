import * as React from "react";
import { AdminReviewsView } from "@/features/admin/components/admin-reviews-view";

export const metadata = {
  title: "Reviews & Reputation Moderation | Admin Portal",
  description: "Moderate verified client feedback, publish testimonials, and issue official studio responses.",
};

export default function AdminReviewsPage() {
  return <AdminReviewsView />;
}
