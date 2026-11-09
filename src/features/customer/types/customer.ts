export type BookingStatus =
  | "pending"
  | "confirmed"
  | "in-progress"
  | "completed"
  | "cancelled";

export type InvoiceStatus = "paid" | "pending" | "partially_paid" | "overdue";

export type TicketStatus =
  | "open"
  | "in_progress"
  | "waiting_response"
  | "resolved"
  | "closed";

export type TicketPriority = "low" | "medium" | "high" | "urgent";

export type TicketCategory =
  | "booking_issue"
  | "payment_question"
  | "service_inquiry"
  | "general_support"
  | "other";

export type NotificationType =
  | "booking_confirmation"
  | "appointment_reminder"
  | "booking_update"
  | "payment_reminder"
  | "invoice_generated"
  | "support_reply"
  | "promotional_offer";

export interface CustomerProfile {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  avatarUrl?: string;
  address?: string;
  memberSince: string;
  preferredContact: "phone" | "email" | "whatsapp";
}

export interface CustomerVehicle {
  id: string;
  make: string;
  model: string;
  year: string;
  category: "small" | "sedan" | "suv" | "large";
  registration: string;
  color?: string;
  isDefault: boolean;
  imageUrl?: string;
}

export interface BookingTimelineStage {
  label: string;
  description: string;
  timestamp?: string;
  isCompleted: boolean;
  isCurrent: boolean;
}

export interface CustomerBooking {
  id: string;
  reference: string;
  serviceId: string;
  serviceName: string;
  packageName?: string;
  vehicleId: string;
  vehicleName: string;
  vehicleCategory: string;
  appointmentDate: string; // YYYY-MM-DD
  appointmentTime: string; // e.g. 10:00 AM
  status: BookingStatus;
  statusLabel: string;
  estimatedPrice: number;
  currency: string;
  duration: string;
  addons: { id: string; title: string; price: number }[];
  customerNotes?: string;
  specialInstructions?: string;
  timeline: BookingTimelineStage[];
  addressType: "studio" | "mobile";
  locationSummary: string;
}

export interface CustomerInvoice {
  id: string;
  invoiceNumber: string;
  bookingReference: string;
  issueDate: string;
  dueDate: string;
  serviceName: string;
  vehicleName: string;
  subtotal: number;
  discount: number;
  totalAmount: number;
  paidAmount: number;
  outstandingBalance: number;
  status: InvoiceStatus;
  currency: string;
}

export interface CustomerReview {
  id: string;
  bookingReference: string;
  serviceName: string;
  vehicleName: string;
  rating: number; // 1 to 5
  title: string;
  comment: string;
  reviewDate: string;
  status: "published" | "pending";
}

export interface TicketMessage {
  id: string;
  sender: "customer" | "support";
  senderName: string;
  avatarUrl?: string;
  message: string;
  timestamp: string;
  attachmentName?: string;
}

export interface SupportTicket {
  id: string;
  ticketReference: string;
  subject: string;
  category: TicketCategory;
  categoryLabel: string;
  createdDate: string;
  lastUpdated: string;
  status: TicketStatus;
  statusLabel: string;
  priority: TicketPriority;
  messages: TicketMessage[];
}

export interface CustomerNotification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  timestamp: string;
  isRead: boolean;
  link?: string;
}

export interface CustomerSettings {
  theme: "dark" | "light" | "auto";
  emailNotifications: boolean;
  smsNotifications: boolean;
  whatsappNotifications: boolean;
  promotionalOffers: boolean;
  language: "en" | "ur";
  dataSharing: boolean;
}
