export type AdminRole = "super_admin" | "master_detailer" | "service_advisor" | "technician";

export type AdminBookingStatus =
  | "pending"
  | "approved"
  | "in_progress"
  | "completed"
  | "cancelled"
  | "rejected";

export type CustomerStatus = "active" | "vip" | "inactive" | "flagged";

export type StaffRole =
  | "Master Detailer"
  | "Paint Correction Specialist"
  | "Interior Restoration Specialist"
  | "Apprentice Detailer"
  | "Mobile Dispatch Lead";

export type StaffWorkingStatus = "on_duty" | "in_studio" | "mobile_dispatch" | "off_duty";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  roleTitle: string;
  avatarUrl?: string;
  lastLogin: string;
}

export interface AdminBooking {
  id: string;
  reference: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  serviceId: string;
  serviceName: string;
  packageName?: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleYear: string;
  vehicleRegistration: string;
  vehicleCategory: string;
  appointmentDate: string; // YYYY-MM-DD
  appointmentTime: string; // e.g. 09:30 AM
  duration: string;
  amount: number;
  currency: string;
  status: AdminBookingStatus;
  statusLabel: string;
  locationType: "studio" | "mobile";
  locationAddress: string;
  assignedStaffId?: string;
  assignedStaffName?: string;
  internalNotes?: string;
  customerNotes?: string;
  createdDate: string;
}

export interface AdminCustomer {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postcode: string;
  status: CustomerStatus;
  totalBookings: number;
  totalSpent: number;
  lastBookingDate: string;
  registeredDate: string;
  vehiclesCount: number;
  notes?: string;
}

export interface AdminStaffMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: StaffRole;
  avatarUrl?: string;
  assignedServices: string[];
  workingStatus: StaffWorkingStatus;
  active: boolean;
  joinDate: string;
  rating: number;
  completedJobs: number;
  weeklyHours: number;
}

export interface AdminServiceItem {
  id: string;
  name: string;
  slug: string;
  category: "Paint Correction" | "Detailing" | "Ceramic Coating" | "SMART Repair" | "Specialist";
  tagline: string;
  description: string;
  startingPrice: number;
  currency: string;
  estimatedDuration: string;
  isActive: boolean;
  isPopular: boolean;
  imageUrl?: string;
}

export interface ActivityEvent {
  id: string;
  title: string;
  description: string;
  category: "booking" | "customer" | "service" | "staff" | "system";
  actorName: string;
  actorRole: string;
  timestamp: string;
  relativeTime: string;
  metadata?: Record<string, string>;
}

export type TimeRangeFilter = "today" | "7d" | "30d" | "this_month" | "custom";

export interface DashboardKPIData {
  totalBookings: number;
  totalBookingsChange: number;
  todayBookings: number;
  todayBookingsStudio: number;
  todayBookingsMobile: number;
  totalCustomers: number;
  totalCustomersChange: number;
  totalRevenue: number;
  totalRevenueChange: number;
  pendingBookings: number;
  completedServices: number;
  completedServicesRate: number;
  totalVisitors: number;
  totalVisitorsChange: number;
  outstandingPayments: number;
  outstandingPaymentsCount: number;
}

export interface AdminSettingsData {
  businessName: string;
  tradingName: string;
  vatNumber: string;
  companyRegistrationNumber: string;
  contactEmail: string;
  contactPhone: string;
  studioAddress: string;
  postcode: string;
  studioOpeningTime: string;
  studioClosingTime: string;
  mobileDispatchStartTime: string;
  mobileDispatchEndTime: string;
  weekendOperation: boolean;
  autoApproveKnownCustomers: boolean;
  depositPercentage: number;
  cancellationNoticeHours: number;
  adminNotificationEmail: string;
  smsDispatchAlerts: boolean;
  themePreference: "dark" | "light" | "system";
}
