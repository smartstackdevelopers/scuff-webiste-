import * as React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { ThemeProvider } from "@/components/common/theme-provider";
import { LanguageProvider } from "@/lib/i18n/language-context";
import { PublicLayout } from "@/components/layout/public-layout";
import { AdminLayout } from "@/components/layout/admin-layout";
import { CustomerLayout } from "@/components/layout/customer-layout";
import AuthLayout from "@/app/(auth)/layout";
import StaffLayout from "@/app/(staff)/layout";

// Public
import HomePage from "@/app/(public)/page";
import AboutPage from "@/app/(public)/about/page";
import ServicesPage from "@/app/(public)/services/page";
import ServiceDetailPage from "@/app/(public)/services/[slug]/page";
import CarPaintingPage from "@/app/(public)/car-painting/page";
import CarMaintenancePage from "@/app/(public)/car-maintenance/page";
import GalleryPage from "@/app/(public)/gallery/page";
import PricingPage from "@/app/(public)/pricing/page";
import BookingPage from "@/app/(public)/booking/page";
import ContactPage from "@/app/(public)/contact/page";
import FaqPage from "@/app/(public)/faq/page";
import DesignSystemPage from "@/app/(public)/design-system/page";
import TermsPage from "@/app/(public)/terms/page";
import PrivacyPage from "@/app/(public)/privacy/page";
import CookiesPage from "@/app/(public)/cookies/page";

// Auth
import LoginPage from "@/app/(auth)/login/page";
import RegisterPage from "@/app/(auth)/register/page";
import ForgotPasswordPage from "@/app/(auth)/forgot-password/page";

// Customer
import CustomerDashboard from "@/app/(customer)/customer/dashboard/page";
import CustomerBookings from "@/app/(customer)/customer/bookings/page";
import CustomerBookingDetail from "@/app/(customer)/customer/bookings/[id]/page";
import CustomerVehicles from "@/app/(customer)/customer/vehicles/page";
import CustomerInvoices from "@/app/(customer)/customer/invoices/page";
import CustomerReviews from "@/app/(customer)/customer/reviews/page";
import CustomerSupport from "@/app/(customer)/customer/support/page";
import CustomerSupportDetail from "@/app/(customer)/customer/support/[id]/page";
import CustomerNotifications from "@/app/(customer)/customer/notifications/page";
import CustomerProfile from "@/app/(customer)/customer/profile/page";
import CustomerSettings from "@/app/(customer)/customer/settings/page";
import CustomerLoyalty from "@/app/(customer)/customer/loyalty/page";
import CustomerGiftCards from "@/app/(customer)/customer/gift-cards/page";

// Admin
import AdminDashboard from "@/app/(admin)/admin/dashboard/page";
import AdminBookings from "@/app/(admin)/admin/bookings/page";
import AdminCustomers from "@/app/(admin)/admin/customers/page";
import AdminServices from "@/app/(admin)/admin/services/page";
import AdminStaff from "@/app/(admin)/admin/staff/page";
import AdminCalendar from "@/app/(admin)/admin/calendar/page";
import AdminActivities from "@/app/(admin)/admin/activities/page";
import AdminReports from "@/app/(admin)/admin/reports/page";
import AdminSettings from "@/app/(admin)/admin/settings/page";
import AdminAnalytics from "@/app/(admin)/admin/analytics/page";
import AdminCrm from "@/app/(admin)/admin/crm/page";
import AdminCrmLeads from "@/app/(admin)/admin/crm/leads/page";
import AdminCrmLeadDetail from "@/app/(admin)/admin/crm/leads/[id]/page";
import AdminCrmCustomers from "@/app/(admin)/admin/crm/customers/page";
import AdminCrmFollowUps from "@/app/(admin)/admin/crm/follow-ups/page";
import AdminCrmReports from "@/app/(admin)/admin/crm/reports/page";
import AdminSales from "@/app/(admin)/admin/sales/page";
import AdminSalespersons from "@/app/(admin)/admin/salespersons/page";
import AdminQuotations from "@/app/(admin)/admin/quotations/page";
import AdminQuotationDetail from "@/app/(admin)/admin/quotations/[id]/page";
import AdminCommissions from "@/app/(admin)/admin/commissions/page";
import AdminPayments from "@/app/(admin)/admin/payments/page";
import AdminPaymentDetail from "@/app/(admin)/admin/payments/[id]/page";
import AdminInvoices from "@/app/(admin)/admin/invoices/page";
import AdminInvoiceCreate from "@/app/(admin)/admin/invoices/create/page";
import AdminInvoiceDetail from "@/app/(admin)/admin/invoices/[id]/page";
import AdminRefunds from "@/app/(admin)/admin/refunds/page";
import AdminFinancialReports from "@/app/(admin)/admin/financial-reports/page";
import AdminReviews from "@/app/(admin)/admin/reviews/page";
import AdminSupport from "@/app/(admin)/admin/support/page";
import AdminCoupons from "@/app/(admin)/admin/coupons/page";
import AdminLoyalty from "@/app/(admin)/admin/loyalty/page";
import AdminGiftCards from "@/app/(admin)/admin/gift-cards/page";

// Staff
import StaffHome from "@/app/(staff)/staff/page";
import StaffJobs from "@/app/(staff)/staff/jobs/page";
import StaffJobDetail from "@/app/(staff)/staff/jobs/[id]/page";
import StaffProfile from "@/app/(staff)/staff/profile/page";

import UnauthorizedPage from "@/app/unauthorized/page";
import NotFoundPage from "@/app/not-found";

function PublicShell() {
  return (
    <PublicLayout>
      <Outlet />
    </PublicLayout>
  );
}

function AdminShell() {
  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  );
}

function CustomerShell() {
  return (
    <CustomerLayout>
      <Outlet />
    </CustomerLayout>
  );
}

function AuthShell() {
  return (
    <AuthLayout>
      <Outlet />
    </AuthLayout>
  );
}

function StaffShell() {
  return (
    <StaffLayout>
      <Outlet />
    </StaffLayout>
  );
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col font-sans antialiased selection:bg-electric/25 selection:text-foreground">
      <ThemeProvider>
        <LanguageProvider>
          <Routes>
            <Route element={<PublicShell />}>
              <Route index element={<HomePage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="services" element={<ServicesPage />} />
              <Route path="services/:slug" element={<ServiceDetailPage />} />
              <Route path="car-painting" element={<CarPaintingPage />} />
              <Route path="car-maintenance" element={<CarMaintenancePage />} />
              <Route path="gallery" element={<GalleryPage />} />
              <Route path="pricing" element={<PricingPage />} />
              <Route path="booking" element={<BookingPage />} />
              <Route path="contact" element={<ContactPage />} />
              <Route path="faq" element={<FaqPage />} />
              <Route path="design-system" element={<DesignSystemPage />} />
              <Route path="terms" element={<TermsPage />} />
              <Route path="privacy" element={<PrivacyPage />} />
              <Route path="cookies" element={<CookiesPage />} />
            </Route>

            <Route element={<AuthShell />}>
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
              <Route path="forgot-password" element={<ForgotPasswordPage />} />
            </Route>

            <Route path="customer" element={<CustomerShell />}>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<CustomerDashboard />} />
              <Route path="bookings" element={<CustomerBookings />} />
              <Route path="bookings/:id" element={<CustomerBookingDetail />} />
              <Route path="vehicles" element={<CustomerVehicles />} />
              <Route path="invoices" element={<CustomerInvoices />} />
              <Route path="reviews" element={<CustomerReviews />} />
              <Route path="support" element={<CustomerSupport />} />
              <Route path="support/:id" element={<CustomerSupportDetail />} />
              <Route path="notifications" element={<CustomerNotifications />} />
              <Route path="profile" element={<CustomerProfile />} />
              <Route path="settings" element={<CustomerSettings />} />
              <Route path="loyalty" element={<CustomerLoyalty />} />
              <Route path="gift-cards" element={<CustomerGiftCards />} />
            </Route>

            <Route path="admin" element={<AdminShell />}>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="bookings" element={<AdminBookings />} />
              <Route path="customers" element={<AdminCustomers />} />
              <Route path="services" element={<AdminServices />} />
              <Route path="staff" element={<AdminStaff />} />
              <Route path="calendar" element={<AdminCalendar />} />
              <Route path="activities" element={<AdminActivities />} />
              <Route path="reports" element={<AdminReports />} />
              <Route path="settings" element={<AdminSettings />} />
              <Route path="analytics" element={<AdminAnalytics />} />
              <Route path="crm" element={<AdminCrm />} />
              <Route path="crm/leads" element={<AdminCrmLeads />} />
              <Route path="crm/leads/:id" element={<AdminCrmLeadDetail />} />
              <Route path="crm/customers" element={<AdminCrmCustomers />} />
              <Route path="crm/follow-ups" element={<AdminCrmFollowUps />} />
              <Route path="crm/reports" element={<AdminCrmReports />} />
              <Route path="sales" element={<AdminSales />} />
              <Route path="salespersons" element={<AdminSalespersons />} />
              <Route path="quotations" element={<AdminQuotations />} />
              <Route path="quotations/:id" element={<AdminQuotationDetail />} />
              <Route path="commissions" element={<AdminCommissions />} />
              <Route path="payments" element={<AdminPayments />} />
              <Route path="payments/:id" element={<AdminPaymentDetail />} />
              <Route path="invoices" element={<AdminInvoices />} />
              <Route path="invoices/create" element={<AdminInvoiceCreate />} />
              <Route path="invoices/:id" element={<AdminInvoiceDetail />} />
              <Route path="refunds" element={<AdminRefunds />} />
              <Route path="financial-reports" element={<AdminFinancialReports />} />
              <Route path="reviews" element={<AdminReviews />} />
              <Route path="support" element={<AdminSupport />} />
              <Route path="coupons" element={<AdminCoupons />} />
              <Route path="loyalty" element={<AdminLoyalty />} />
              <Route path="gift-cards" element={<AdminGiftCards />} />
            </Route>

            <Route path="staff" element={<StaffShell />}>
              <Route index element={<StaffHome />} />
              <Route path="jobs" element={<StaffJobs />} />
              <Route path="jobs/:id" element={<StaffJobDetail />} />
              <Route path="profile" element={<StaffProfile />} />
            </Route>

            <Route path="unauthorized" element={<UnauthorizedPage />} />
            <Route path="404" element={<NotFoundPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </LanguageProvider>
      </ThemeProvider>
    </div>
  );
}
