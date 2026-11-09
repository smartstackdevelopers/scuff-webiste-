export type LeadStatus =
  | "new"
  | "contacted"
  | "interested"
  | "qualified"
  | "proposal_sent"
  | "negotiation"
  | "converted"
  | "lost";

export type LeadSource =
  | "website"
  | "google"
  | "facebook"
  | "instagram"
  | "whatsapp"
  | "phone_call"
  | "referral"
  | "walk_in"
  | "other";

export type CustomerType =
  | "individual"
  | "collector"
  | "corporate"
  | "dealership"
  | "vip";

export type LeadPriority = "low" | "medium" | "high" | "urgent";

export type FollowUpType = "phone" | "email" | "whatsapp" | "meeting" | "vehicle_viewing" | "other";

export type FollowUpStatus = "pending" | "completed" | "rescheduled" | "cancelled";

export type FollowUpPriority = "low" | "medium" | "high" | "urgent";

export type QuotationStatus =
  | "draft"
  | "sent"
  | "viewed"
  | "accepted"
  | "rejected"
  | "declined"
  | "expired";

export type CommissionPaymentStatus = "pending" | "approved" | "paid" | "cancelled";

export interface LeadActivity {
  id: string;
  leadId: string;
  title: string;
  description: string;
  timestamp: string;
  type?: "status_change" | "note_added" | "followup_scheduled" | "quote_sent" | "converted";
  actorName: string;
}

export interface LeadNote {
  id: string;
  leadId: string;
  text?: string;
  note?: string;
  authorName: string;
  createdAt: string;
}

export interface CRMLead {
  id: string;
  leadReference: string;
  customerName: string;
  email: string;
  phone: string;
  interestedService: string;
  serviceInterest?: string;
  serviceId?: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleYear?: string;
  vehicleRegistration?: string;
  vehicleColour?: string;
  vehicleCondition?: string;
  vehicleType: string;
  leadSource: LeadSource;
  source?: LeadSource;
  preferredContactMethod?: string;
  assignedSalespersonId: string;
  assignedSalespersonName: string;
  status: LeadStatus;
  statusLabel: string;
  estimatedValue: number;
  estimatedBudget?: number;
  currency: string;
  createdDate: string;
  lastContactedDate?: string;
  nextFollowUpDate?: string;
  customerType?: CustomerType;
  priority?: LeadPriority;
  notes?: string;
  activities?: LeadActivity[];
  notesList?: LeadNote[];
  convertedCustomerId?: string;
}

export interface FollowUpItem {
  id: string;
  leadId?: string;
  leadReference?: string;
  customerId?: string;
  customerName: string;
  clientName?: string;
  customerPhone?: string;
  clientPhone?: string;
  customerEmail?: string;
  clientEmail?: string;
  vehicleSummary?: string;
  assignedSalespersonId?: string;
  salespersonId?: string;
  assignedSalespersonName?: string;
  salespersonName?: string;
  followUpDate?: string;
  scheduledDate?: string;
  followUpTime?: string;
  scheduledTime?: string;
  type: FollowUpType;
  priority: FollowUpPriority;
  status: FollowUpStatus;
  description?: string;
  notes: string;
}

export interface Salesperson {
  id: string;
  employeeId: string;
  fullName: string;
  name?: string;
  email: string;
  phone: string;
  avatarUrl?: string;
  joiningDate: string;
  assignedLeadsCount: number;
  convertedLeadsCount: number;
  totalSalesValue: number;
  commissionRate: number; // Percentage, e.g. 10 for 10%
  active: boolean;
  isActive?: boolean;
  department: string;
  role?: string;
  monthlyTarget: number;
  currentMonthSales: number;
}

export interface QuotationLineItem {
  id: string;
  serviceId?: string;
  description: string;
  category?: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface Quotation {
  id: string;
  quotationNumber: string;
  leadId?: string;
  customerId?: string;
  customerName: string;
  clientName?: string;
  customerEmail: string;
  clientEmail?: string;
  customerPhone: string;
  clientPhone?: string;
  customerAddress?: string;
  clientAddress?: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleYear?: string;
  vehicleRegistration?: string;
  items: QuotationLineItem[];
  lineItems?: QuotationLineItem[];
  subtotal: number;
  discountType?: "fixed" | "percentage";
  discountValue?: number;
  discountAmount?: number;
  taxableAmount?: number;
  taxRate?: number; // e.g. 0.20 for 20% UK VAT
  taxAmount?: number;
  vatRate?: number;
  vatAmount?: number;
  grandTotal: number;
  totalAmount?: number;
  currency?: string;
  createdDate: string;
  validUntil: string;
  status: QuotationStatus;
  statusLabel?: string;
  salespersonId: string;
  salespersonName: string;
  terms?: string;
  notes?: string;
}

export interface CommissionRecord {
  id: string;
  salespersonId: string;
  salespersonName: string;
  bookingReference: string;
  quotationNumber?: string;
  customerName: string;
  clientName?: string;
  vehicleSummary?: string;
  totalSaleValue?: number;
  netEligibleValue?: number;
  saleAmount: number;
  commissionRate: number;
  rateApplied?: number;
  commissionAmount: number;
  currency?: string;
  commissionDate?: string;
  earnedDate?: string;
  paymentStatus: CommissionPaymentStatus;
  status?: CommissionPaymentStatus;
  approvedBy?: string;
  approvedDate?: string;
  paidDate?: string;
}

export interface CRMKPIData {
  totalLeads: number;
  newLeads: number;
  contactedLeads: number;
  interestedLeads: number;
  qualifiedLeads: number;
  convertedLeads: number;
  lostLeads: number;
  conversionRate: number;
  pendingFollowUps: number;
  followUpsDueToday: number;
  totalPipelineValue: number;
  activePipelineValue?: number;
  pipelineStageCounts: Record<LeadStatus, number>;
}
