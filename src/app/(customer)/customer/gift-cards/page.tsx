import * as React from "react";
import { CustomerGiftCardsView } from "@/features/customer/components/gift-cards-view";

export const metadata = {
  title: "Gift Cards & Detailing Vouchers | Customer Portal",
  description: "View active stored balance cards, redeem detailing vouchers, or purchase gift vouchers for other drivers.",
};

export default function CustomerGiftCardsPage() {
  return <CustomerGiftCardsView />;
}
