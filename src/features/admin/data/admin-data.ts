import { AdminUser, AdminSettingsData } from "../types/admin";

export const MOCK_ADMIN_USER: AdminUser = {
  id: "adm-001",
  name: "Alexander Vance",
  email: "alexander.vance@youscuffwebuff.co.uk",
  role: "super_admin",
  roleTitle: "Master Supervisor & Studio Director",
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop",
  lastLogin: "Today, 08:15 AM (London Studio IP)",
};

export const DEFAULT_ADMIN_SETTINGS: AdminSettingsData = {
  businessName: "You Scuff We Buff Limited",
  tradingName: "You Scuff We Buff - Luxury Vehicle Care",
  vatNumber: "GB 982 4510 82",
  companyRegistrationNumber: "14892011",
  contactEmail: "concierge@youscuffwebuff.co.uk",
  contactPhone: "+44 (0) 1494 558 920",
  studioAddress: "Unit 4, Premier Automotive Works, London Road",
  postcode: "HP11 1BB",
  studioOpeningTime: "08:00",
  studioClosingTime: "18:00",
  mobileDispatchStartTime: "08:30",
  mobileDispatchEndTime: "17:30",
  weekendOperation: true,
  autoApproveKnownCustomers: false,
  depositPercentage: 25,
  cancellationNoticeHours: 24,
  adminNotificationEmail: "operations@youscuffwebuff.co.uk",
  smsDispatchAlerts: true,
  themePreference: "dark",
};
