"use client";

import * as React from "react";
import {
  AdminUser,
  AdminBooking,
  AdminCustomer,
  AdminStaffMember,
  AdminServiceItem,
  ActivityEvent,
  TimeRangeFilter,
  DashboardKPIData,
  AdminSettingsData,
} from "../types/admin";
import { MOCK_ADMIN_USER, DEFAULT_ADMIN_SETTINGS } from "../data/admin-data";
import { MOCK_ADMIN_BOOKINGS } from "../data/bookings";
import { MOCK_ADMIN_CUSTOMERS } from "../data/customers";
import { MOCK_ADMIN_STAFF } from "../data/staff";
import { MOCK_ADMIN_ACTIVITIES } from "../data/activities";
import {
  MOCK_ADMIN_SERVICES,
  MOCK_KPI_BY_RANGE,
} from "../data/analytics-data";

export interface AdminContextType {
  adminUser: AdminUser;
  isSimulatedAdmin: boolean;
  setIsSimulatedAdmin: (val: boolean) => void;
  settings: AdminSettingsData;
  updateSettings: (newSettings: Partial<AdminSettingsData>) => void;
  bookings: AdminBooking[];
  approveBooking: (id: string) => void;
  rejectBooking: (id: string) => void;
  startBooking: (id: string) => void;
  completeBooking: (id: string) => void;
  cancelBooking: (id: string) => void;
  addBooking: (newBooking: Omit<AdminBooking, "id" | "reference" | "createdDate" | "status" | "statusLabel">) => void;
  updateBooking: (id: string, updated: Partial<AdminBooking>) => void;
  customers: AdminCustomer[];
  addCustomer: (newCustomer: Omit<AdminCustomer, "id" | "registeredDate" | "totalBookings" | "totalSpent" | "lastBookingDate" | "vehiclesCount">) => void;
  updateCustomer: (id: string, updated: Partial<AdminCustomer>) => void;
  deleteCustomer: (id: string) => void;
  services: AdminServiceItem[];
  toggleServiceActive: (id: string) => void;
  addService: (newService: Omit<AdminServiceItem, "id">) => void;
  updateService: (id: string, updated: Partial<AdminServiceItem>) => void;
  deleteService: (id: string) => void;
  staff: AdminStaffMember[];
  toggleStaffActive: (id: string) => void;
  addStaff: (newStaff: Omit<AdminStaffMember, "id" | "joinDate" | "completedJobs" | "rating">) => void;
  updateStaff: (id: string, updated: Partial<AdminStaffMember>) => void;
  activities: ActivityEvent[];
  addActivity: (event: Omit<ActivityEvent, "id" | "timestamp" | "relativeTime">) => void;
  timeRange: TimeRangeFilter;
  setTimeRange: (range: TimeRangeFilter) => void;
  kpiData: DashboardKPIData;
}

const AdminContext = React.createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [adminUser] = React.useState<AdminUser>(MOCK_ADMIN_USER);
  const [isSimulatedAdmin, setIsSimulatedAdmin] = React.useState<boolean>(true);
  const [settings, setSettings] = React.useState<AdminSettingsData>(DEFAULT_ADMIN_SETTINGS);
  const [bookings, setBookings] = React.useState<AdminBooking[]>(MOCK_ADMIN_BOOKINGS);
  const [customers, setCustomers] = React.useState<AdminCustomer[]>(MOCK_ADMIN_CUSTOMERS);
  const [services, setServices] = React.useState<AdminServiceItem[]>(MOCK_ADMIN_SERVICES);
  const [staff, setStaff] = React.useState<AdminStaffMember[]>(MOCK_ADMIN_STAFF);
  const [activities, setActivities] = React.useState<ActivityEvent[]>(MOCK_ADMIN_ACTIVITIES);
  const [timeRange, setTimeRange] = React.useState<TimeRangeFilter>("this_month");

  const kpiData = MOCK_KPI_BY_RANGE[timeRange] || MOCK_KPI_BY_RANGE.this_month;

  const updateSettings = (newSettings: Partial<AdminSettingsData>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const addActivity = (event: Omit<ActivityEvent, "id" | "timestamp" | "relativeTime">) => {
    const newAct: ActivityEvent = {
      ...event,
      id: `act-${Date.now()}`,
      timestamp: new Date().toISOString().replace("T", " ").slice(0, 16),
      relativeTime: "Just now",
    };
    setActivities((prev) => [newAct, ...prev]);
  };

  // Booking actions
  const approveBooking = (id: string) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === id
          ? { ...b, status: "approved", statusLabel: "Approved" }
          : b
      )
    );
    const target = bookings.find((b) => b.id === id);
    if (target) {
      addActivity({
        title: "Booking Approved",
        description: `Booking ${target.reference} for ${target.customerName} approved.`,
        category: "booking",
        actorName: adminUser.name,
        actorRole: "Admin",
      });
    }
  };

  const rejectBooking = (id: string) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === id
          ? { ...b, status: "rejected", statusLabel: "Rejected" }
          : b
      )
    );
    const target = bookings.find((b) => b.id === id);
    if (target) {
      addActivity({
        title: "Booking Rejected",
        description: `Booking ${target.reference} for ${target.customerName} was rejected.`,
        category: "booking",
        actorName: adminUser.name,
        actorRole: "Admin",
      });
    }
  };

  const startBooking = (id: string) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === id
          ? { ...b, status: "in_progress", statusLabel: "In Progress" }
          : b
      )
    );
    const target = bookings.find((b) => b.id === id);
    if (target) {
      addActivity({
        title: "Service Started",
        description: `Detailing commenced for ${target.reference} (${target.vehicleMake} ${target.vehicleModel}).`,
        category: "service",
        actorName: adminUser.name,
        actorRole: "Admin",
      });
    }
  };

  const completeBooking = (id: string) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === id
          ? { ...b, status: "completed", statusLabel: "Completed" }
          : b
      )
    );
    const target = bookings.find((b) => b.id === id);
    if (target) {
      addActivity({
        title: "Service Completed",
        description: `Detailing finished for ${target.reference}. Quality check passed.`,
        category: "service",
        actorName: adminUser.name,
        actorRole: "Admin",
      });
    }
  };

  const cancelBooking = (id: string) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === id
          ? { ...b, status: "cancelled", statusLabel: "Cancelled" }
          : b
      )
    );
    const target = bookings.find((b) => b.id === id);
    if (target) {
      addActivity({
        title: "Booking Cancelled",
        description: `Appointment ${target.reference} marked cancelled in system.`,
        category: "booking",
        actorName: adminUser.name,
        actorRole: "Admin",
      });
    }
  };

  const addBooking = (
    newBooking: Omit<AdminBooking, "id" | "reference" | "createdDate" | "status" | "statusLabel">
  ) => {
    const id = `bk-${Date.now()}`;
    const reference = `YSWB-${Math.floor(1000 + Math.random() * 9000)}`;
    const createdDate = new Date().toISOString().replace("T", " ").slice(0, 16);

    const fullBooking: AdminBooking = {
      ...newBooking,
      id,
      reference,
      status: "pending",
      statusLabel: "Pending Approval",
      createdDate,
    };

    setBookings((prev) => [fullBooking, ...prev]);

    addActivity({
      title: "New Booking Created",
      description: `Manual booking ${reference} created for ${newBooking.customerName}.`,
      category: "booking",
      actorName: adminUser.name,
      actorRole: "Admin",
    });
  };

  const updateBooking = (id: string, updated: Partial<AdminBooking>) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, ...updated } : b))
    );
  };

  // Customer actions
  const addCustomer = (
    newCustomer: Omit<AdminCustomer, "id" | "registeredDate" | "totalBookings" | "totalSpent" | "lastBookingDate" | "vehiclesCount">
  ) => {
    const id = `cust-${Date.now()}`;
    const registeredDate = new Date().toISOString().split("T")[0];

    const fullCustomer: AdminCustomer = {
      ...newCustomer,
      id,
      registeredDate,
      totalBookings: 0,
      totalSpent: 0,
      lastBookingDate: "Never",
      vehiclesCount: 1,
    };

    setCustomers((prev) => [fullCustomer, ...prev]);

    addActivity({
      title: "Customer Added",
      description: `${newCustomer.fullName} registered in client database.`,
      category: "customer",
      actorName: adminUser.name,
      actorRole: "Admin",
    });
  };

  const updateCustomer = (id: string, updated: Partial<AdminCustomer>) => {
    setCustomers((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updated } : c))
    );
  };

  const deleteCustomer = (id: string) => {
    setCustomers((prev) => prev.filter((c) => c.id !== id));
  };

  // Service actions
  const toggleServiceActive = (id: string) => {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, isActive: !s.isActive } : s))
    );
  };

  const addService = (newService: Omit<AdminServiceItem, "id">) => {
    const id = `svc-${Date.now()}`;
    setServices((prev) => [...prev, { ...newService, id }]);

    addActivity({
      title: "Service Created",
      description: `Added "${newService.name}" to catalog.`,
      category: "service",
      actorName: adminUser.name,
      actorRole: "Admin",
    });
  };

  const updateService = (id: string, updated: Partial<AdminServiceItem>) => {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updated } : s))
    );
  };

  const deleteService = (id: string) => {
    setServices((prev) => prev.filter((s) => s.id !== id));
  };

  // Staff actions
  const toggleStaffActive = (id: string) => {
    setStaff((prev) =>
      prev.map((st) => (st.id === id ? { ...st, active: !st.active } : st))
    );
  };

  const addStaff = (
    newStaff: Omit<AdminStaffMember, "id" | "joinDate" | "completedJobs" | "rating">
  ) => {
    const id = `stf-${Date.now()}`;
    const joinDate = new Date().toISOString().split("T")[0];

    const fullStaff: AdminStaffMember = {
      ...newStaff,
      id,
      joinDate,
      completedJobs: 0,
      rating: 5.0,
    };

    setStaff((prev) => [...prev, fullStaff]);

    addActivity({
      title: "Staff Member Added",
      description: `${newStaff.name} joined as ${newStaff.role}.`,
      category: "staff",
      actorName: adminUser.name,
      actorRole: "Admin",
    });
  };

  const updateStaff = (id: string, updated: Partial<AdminStaffMember>) => {
    setStaff((prev) =>
      prev.map((st) => (st.id === id ? { ...st, ...updated } : st))
    );
  };

  const value: AdminContextType = {
    adminUser,
    isSimulatedAdmin,
    setIsSimulatedAdmin,
    settings,
    updateSettings,
    bookings,
    approveBooking,
    rejectBooking,
    startBooking,
    completeBooking,
    cancelBooking,
    addBooking,
    updateBooking,
    customers,
    addCustomer,
    updateCustomer,
    deleteCustomer,
    services,
    toggleServiceActive,
    addService,
    updateService,
    deleteService,
    staff,
    toggleStaffActive,
    addStaff,
    updateStaff,
    activities,
    addActivity,
    timeRange,
    setTimeRange,
    kpiData,
  };

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
}

export function useAdmin() {
  const context = React.useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
}
