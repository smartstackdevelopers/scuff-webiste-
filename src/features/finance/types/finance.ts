export type PaymentMethod = "cash" | "bank_transfer" | "online";

export type PaymentStatus = "paid" | "pending" | "failed" | "partially_paid" | "refunded";

export type InvoiceStatus =
  | "draft"
  | "sent"
  | "paid"
  | "partially_paid"
  | "overdue"
  | "cancelled";

export type RefundStatus = "requested" | "approved" | "rejected" | "processed";

export interface InvoiceLineItem {
  id: string;
  description: string;
  category?: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface InvoicePaymentRecord {
  paymentId: string;
  reference: string;
  date: string;
  amount: number;
  method: PaymentMethod;
  notes?: string;
}

export interface AdminPayment {
  id: string;
  paymentReference: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  bookingReference: string;
  invoiceNumber: string;
  paymentDate: string; // YYYY-MM-DD
  paymentTime: string; // HH:MM
  paymentMethod: PaymentMethod;
  paymentMethodLabel: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  statusLabel: string;
  notes?: string;
  transactionReference?: string;
  isDeposit?: boolean;
  refundReference?: string;
}

export interface AdminInvoice {
  id: string;
  invoiceNumber: string;
  bookingReference: string;
  quotationReference?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress?: string;
  billingAddress?: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleYear: string;
  vehicleRegistration: string;
  vehicleReg?: string;
  vehicleColor?: string;
  issueDate: string;
  dueDate: string;
  items: InvoiceLineItem[];
  subtotal: number;
  discountType: "fixed" | "percentage";
  discountValue: number;
  discountAmount: number;
  taxableAmount: number;
  taxRate: number; // e.g. 20 for 20% UK VAT
  taxAmount: number;
  grandTotal: number;
  amountPaid: number;
  outstandingBalance: number;
  status: InvoiceStatus;
  statusLabel: string;
  currency: string;
  paymentTerms: string;
  notes?: string;
  paymentHistory: InvoicePaymentRecord[];
}

export interface AdminRefund {
  id: string;
  refundReference: string;
  paymentReference: string;
  paymentId: string;
  customerName: string;
  customerEmail: string;
  invoiceNumber: string;
  refundAmount: number;
  originalAmount: number;
  refundDate: string;
  refundReason: string;
  status: RefundStatus;
  statusLabel: string;
  currency: string;
  notes?: string;
  approvedBy?: string;
  approvedDate?: string;
}

export interface FinancialSummaryData {
  totalRevenue: number;
  totalPaymentsCollected: number;
  outstandingBalance: number;
  pendingPayments: number;
  totalRefunds: number;
  totalInvoices: number;
  paidInvoices: number;
  partiallyPaidInvoices: number;
  overdueInvoices: number;
  draftInvoices: number;
}
