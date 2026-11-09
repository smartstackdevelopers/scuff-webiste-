import { CustomerNotification, CustomerSettings } from "../types/customer";

export const MOCK_CUSTOMER_NOTIFICATIONS: CustomerNotification[] = [
  {
    id: "notif-01",
    title: "Appointment Confirmed",
    message: "Your Ceramic Coating appointment (YSWB-8924) has been scheduled for 18 Nov 2026 at 10:00 AM.",
    type: "booking_confirmation",
    timestamp: "2 hours ago",
    isRead: false,
    link: "/customer/bookings/booking-01",
  },
  {
    id: "notif-02",
    title: "Detailing In Progress",
    message: "Master Detailer Mark has commenced cutting compound Stage 1 on your BMW M3 (YSWB-6102).",
    type: "booking_update",
    timestamp: "5 hours ago",
    isRead: false,
    link: "/customer/bookings/booking-02",
  },
  {
    id: "notif-03",
    title: "Support Ticket Replied",
    message: "Marcus from the Studio Bay team replied to your ticket TCK-1049 (PPF Stone Guard Inquiry).",
    type: "support_reply",
    timestamp: "1 day ago",
    isRead: true,
    link: "/customer/support/ticket-01",
  },
  {
    id: "notif-04",
    title: "Invoice Generated",
    message: "Invoice INV-2026-089 for £480 has been prepared for your upcoming Porsche 911 GT3 booking.",
    type: "invoice_generated",
    timestamp: "3 days ago",
    isRead: true,
    link: "/customer/invoices",
  },
  {
    id: "notif-05",
    title: "Autumn Seasonal Offer",
    message: "Enjoy 15% off Winter Clearcoat Protection when scheduling your second vehicle with code DETAIL15.",
    type: "promotional_offer",
    timestamp: "5 days ago",
    isRead: true,
    link: "/pricing#deals",
  },
];

export const MOCK_CUSTOMER_SETTINGS: CustomerSettings = {
  theme: "dark",
  emailNotifications: true,
  smsNotifications: true,
  whatsappNotifications: true,
  promotionalOffers: false,
  language: "en",
  dataSharing: false,
};
