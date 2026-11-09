"use client";

import * as React from "react";
import {
  CustomerProfile,
  CustomerVehicle,
  CustomerBooking,
  CustomerInvoice,
  CustomerReview,
  SupportTicket,
  CustomerNotification,
  CustomerSettings,
  TicketCategory,
} from "../types/customer";
import { MOCK_CUSTOMER_PROFILE } from "../data/customer-data";
import { MOCK_CUSTOMER_BOOKINGS } from "../data/bookings";
import { MOCK_CUSTOMER_VEHICLES } from "../data/vehicles";
import { MOCK_CUSTOMER_INVOICES } from "../data/invoices";
import { MOCK_CUSTOMER_REVIEWS } from "../data/reviews";
import { MOCK_SUPPORT_TICKETS } from "../data/tickets";
import { MOCK_CUSTOMER_NOTIFICATIONS, MOCK_CUSTOMER_SETTINGS } from "../data/notifications";

export interface CustomerContextType {
  profile: CustomerProfile;
  updateProfile: (updated: Partial<CustomerProfile>) => void;
  bookings: CustomerBooking[];
  cancelBooking: (bookingId: string) => void;
  rescheduleBooking: (bookingId: string, newDate: string, newTime: string) => void;
  vehicles: CustomerVehicle[];
  addVehicle: (newVehicle: Omit<CustomerVehicle, "id">) => void;
  updateVehicle: (id: string, updated: Partial<CustomerVehicle>) => void;
  deleteVehicle: (id: string) => void;
  setDefaultVehicle: (id: string) => void;
  invoices: CustomerInvoice[];
  reviews: CustomerReview[];
  addReview: (newReview: Omit<CustomerReview, "id" | "reviewDate" | "status">) => void;
  deleteReview: (id: string) => void;
  tickets: SupportTicket[];
  createTicket: (data: {
    subject: string;
    category: TicketCategory;
    categoryLabel: string;
    message: string;
    priority: "low" | "medium" | "high" | "urgent";
  }) => string;
  replyTicket: (ticketId: string, replyMessage: string) => void;
  notifications: CustomerNotification[];
  unreadNotificationCount: number;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  deleteNotification: (id: string) => void;
  settings: CustomerSettings;
  updateSettings: (updated: Partial<CustomerSettings>) => void;
}

const CustomerContext = React.createContext<CustomerContextType | undefined>(undefined);

export function CustomerProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = React.useState<CustomerProfile>(MOCK_CUSTOMER_PROFILE);
  const [bookings, setBookings] = React.useState<CustomerBooking[]>(MOCK_CUSTOMER_BOOKINGS);
  const [vehicles, setVehicles] = React.useState<CustomerVehicle[]>(MOCK_CUSTOMER_VEHICLES);
  const [invoices] = React.useState<CustomerInvoice[]>(MOCK_CUSTOMER_INVOICES);
  const [reviews, setReviews] = React.useState<CustomerReview[]>(MOCK_CUSTOMER_REVIEWS);
  const [tickets, setTickets] = React.useState<SupportTicket[]>(MOCK_SUPPORT_TICKETS);
  const [notifications, setNotifications] = React.useState<CustomerNotification[]>(
    MOCK_CUSTOMER_NOTIFICATIONS
  );
  const [settings, setSettings] = React.useState<CustomerSettings>(MOCK_CUSTOMER_SETTINGS);

  // Unread notification count
  const unreadNotificationCount = notifications.filter((n) => !n.isRead).length;

  // Profile actions
  const updateProfile = (updated: Partial<CustomerProfile>) => {
    setProfile((prev) => ({ ...prev, ...updated }));
  };

  // Vehicle actions
  const addVehicle = (newVehicle: Omit<CustomerVehicle, "id">) => {
    const id = `veh-${Date.now()}`;
    const vehicleWithId: CustomerVehicle = { ...newVehicle, id };

    setVehicles((prev) => {
      if (vehicleWithId.isDefault) {
        return [...prev.map((v) => ({ ...v, isDefault: false })), vehicleWithId];
      }
      return [...prev, vehicleWithId];
    });
  };

  const updateVehicle = (id: string, updated: Partial<CustomerVehicle>) => {
    setVehicles((prev) =>
      prev.map((v) => {
        if (v.id === id) {
          return { ...v, ...updated };
        }
        if (updated.isDefault) {
          return { ...v, isDefault: false };
        }
        return v;
      })
    );
  };

  const deleteVehicle = (id: string) => {
    setVehicles((prev) => prev.filter((v) => v.id !== id));
  };

  const setDefaultVehicle = (id: string) => {
    setVehicles((prev) =>
      prev.map((v) => ({
        ...v,
        isDefault: v.id === id,
      }))
    );
  };

  // Booking actions
  const cancelBooking = (bookingId: string) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === bookingId
          ? {
              ...b,
              status: "cancelled",
              statusLabel: "Cancelled",
              timeline: [
                ...b.timeline,
                {
                  label: "Booking Cancelled",
                  description: "Cancelled via customer portal",
                  timestamp: "Just now",
                  isCompleted: true,
                  isCurrent: true,
                },
              ],
            }
          : b
      )
    );
  };

  const rescheduleBooking = (bookingId: string, newDate: string, newTime: string) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === bookingId
          ? {
              ...b,
              appointmentDate: newDate,
              appointmentTime: newTime,
              timeline: [
                ...b.timeline,
                {
                  label: "Booking Rescheduled",
                  description: `Rescheduled to ${newDate} at ${newTime}`,
                  timestamp: "Just now",
                  isCompleted: true,
                  isCurrent: true,
                },
              ],
            }
          : b
      )
    );
  };

  // Reviews actions
  const addReview = (newReview: Omit<CustomerReview, "id" | "reviewDate" | "status">) => {
    const reviewWithMeta: CustomerReview = {
      ...newReview,
      id: `rev-${Date.now()}`,
      reviewDate: new Date().toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      status: "published",
    };
    setReviews((prev) => [reviewWithMeta, ...prev]);
  };

  const deleteReview = (id: string) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
  };

  // Support ticket actions
  const createTicket = ({
    subject,
    category,
    categoryLabel,
    message,
    priority,
  }: {
    subject: string;
    category: TicketCategory;
    categoryLabel: string;
    message: string;
    priority: "low" | "medium" | "high" | "urgent";
  }) => {
    const id = `ticket-${Date.now()}`;
    const reference = `TCK-${Math.floor(1000 + Math.random() * 9000)}`;

    const newTicket: SupportTicket = {
      id,
      ticketReference: reference,
      subject,
      category,
      categoryLabel,
      createdDate: "Just now",
      lastUpdated: "Just now",
      status: "open",
      statusLabel: "Open",
      priority,
      messages: [
        {
          id: `msg-${Date.now()}`,
          sender: "customer",
          senderName: profile.fullName,
          message,
          timestamp: "Just now",
        },
      ],
    };

    setTickets((prev) => [newTicket, ...prev]);
    return id;
  };

  const replyTicket = (ticketId: string, replyMessage: string) => {
    setTickets((prev) =>
      prev.map((t) => {
        if (t.id === ticketId) {
          return {
            ...t,
            lastUpdated: "Just now",
            messages: [
              ...t.messages,
              {
                id: `msg-${Date.now()}`,
                sender: "customer",
                senderName: profile.fullName,
                message: replyMessage,
                timestamp: "Just now",
              },
            ],
          };
        }
        return t;
      })
    );
  };

  // Notification actions
  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  // Settings actions
  const updateSettings = (updated: Partial<CustomerSettings>) => {
    setSettings((prev) => ({ ...prev, ...updated }));
  };

  const value: CustomerContextType = {
    profile,
    updateProfile,
    bookings,
    cancelBooking,
    rescheduleBooking,
    vehicles,
    addVehicle,
    updateVehicle,
    deleteVehicle,
    setDefaultVehicle,
    invoices,
    reviews,
    addReview,
    deleteReview,
    tickets,
    createTicket,
    replyTicket,
    notifications,
    unreadNotificationCount,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    deleteNotification,
    settings,
    updateSettings,
  };

  return <CustomerContext.Provider value={value}>{children}</CustomerContext.Provider>;
}

export function useCustomer() {
  const context = React.useContext(CustomerContext);
  if (!context) {
    throw new Error("useCustomer must be used within a CustomerProvider");
  }
  return context;
}
