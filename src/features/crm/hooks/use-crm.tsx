"use client";

import * as React from "react";
import {
  CRMLead,
  FollowUpItem,
  Salesperson,
  Quotation,
  CommissionRecord,
  CRMKPIData,
  LeadStatus,
  QuotationStatus,
} from "../types/crm";
import { MOCK_CRM_LEADS } from "../data/leads";
import { MOCK_FOLLOW_UPS } from "../data/follow-ups";
import { MOCK_SALESPERSONS } from "../data/salespersons";
import { MOCK_QUOTATIONS } from "../data/quotations";
import { MOCK_COMMISSIONS } from "../data/commissions";
import { useAdmin } from "@/features/admin";

export interface CRMContextType {
  leads: CRMLead[];
  addLead: (newLead: Omit<CRMLead, "id" | "leadReference" | "createdDate" | "statusLabel" | "activities" | "notesList">) => string;
  updateLead: (id: string, updated: Partial<CRMLead>) => void;
  deleteLead: (id: string) => void;
  changeLeadStatus: (id: string, newStatus: LeadStatus) => void;
  bulkUpdateLeadStatus: (leadIds: string[], newStatus: LeadStatus) => void;
  assignSalespersonToLead: (leadId: string, spId: string, spName: string) => void;
  bulkAssignSalesperson: (leadIds: string[], spId: string, spName: string) => void;
  addLeadNote: (leadId: string, noteText: string, authorName?: string) => void;
  convertLeadToCustomer: (leadId: string) => string | null;

  followUps: FollowUpItem[];
  addFollowUp: (item: Omit<FollowUpItem, "id">) => void;
  updateFollowUp: (id: string, updated: Partial<FollowUpItem>) => void;
  deleteFollowUp: (id: string) => void;
  completeFollowUp: (id: string) => void;
  rescheduleFollowUp: (id: string, newDate: string, newTime: string) => void;

  salespersons: Salesperson[];
  addSalesperson: (data: Omit<Salesperson, "id" | "employeeId" | "joiningDate" | "assignedLeadsCount" | "convertedLeadsCount" | "totalSalesValue" | "currentMonthSales">) => void;
  updateSalesperson: (id: string, data: Partial<Salesperson>) => void;
  toggleSalespersonActive: (id: string) => void;

  quotations: Quotation[];
  addQuotation: (data: Omit<Quotation, "id" | "quotationNumber" | "createdDate" | "statusLabel">) => string;
  updateQuotation: (id: string, data: Partial<Quotation>) => void;
  duplicateQuotation: (id: string) => string;
  deleteQuotation: (id: string) => void;
  changeQuotationStatus: (id: string, newStatus: QuotationStatus) => void;

  commissions: CommissionRecord[];
  approveCommission: (id: string) => void;
  payCommission: (id: string) => void;
  addCommission: (data: Omit<CommissionRecord, "id">) => boolean;

  crmKpi: CRMKPIData;
}

const CRMContext = React.createContext<CRMContextType | undefined>(undefined);

export function CRMProvider({ children }: { children: React.ReactNode }) {
  const admin = useAdmin();

  const [leads, setLeads] = React.useState<CRMLead[]>(MOCK_CRM_LEADS);
  const [followUps, setFollowUps] = React.useState<FollowUpItem[]>(MOCK_FOLLOW_UPS);
  const [salespersons, setSalespersons] = React.useState<Salesperson[]>(MOCK_SALESPERSONS);
  const [quotations, setQuotations] = React.useState<Quotation[]>(MOCK_QUOTATIONS);
  const [commissions, setCommissions] = React.useState<CommissionRecord[]>(MOCK_COMMISSIONS);

  // Status mapping label helper
  const getLeadStatusLabel = (status: LeadStatus): string => {
    switch (status) {
      case "new":
        return "New Inquiry";
      case "contacted":
        return "Contacted";
      case "interested":
        return "Interested";
      case "qualified":
        return "Qualified Lead";
      case "proposal_sent":
        return "Proposal Sent";
      case "negotiation":
        return "In Negotiation";
      case "converted":
        return "Converted Client";
      case "lost":
        return "Lost Inquiry";
      default:
        return status;
    }
  };

  const getQuotationStatusLabel = (status: QuotationStatus): string => {
    switch (status) {
      case "draft":
        return "Draft";
      case "sent":
        return "Sent to Client";
      case "viewed":
        return "Viewed";
      case "accepted":
        return "Accepted & Approved";
      case "rejected":
        return "Declined";
      case "expired":
        return "Expired";
      default:
        return status;
    }
  };

  // Lead CRUD
  const addLead = (newLead: Omit<CRMLead, "id" | "leadReference" | "createdDate" | "statusLabel" | "activities" | "notesList">) => {
    const id = `lead-${Date.now()}`;
    const ref = `LEAD-2026-${Math.floor(100 + Math.random() * 900)}`;
    const createdDate = new Date().toISOString().split("T")[0];

    const lead: CRMLead = {
      ...newLead,
      id,
      leadReference: ref,
      statusLabel: getLeadStatusLabel(newLead.status),
      createdDate,
      activities: [
        {
          id: `act-${Date.now()}`,
          leadId: id,
          title: "Lead Created",
          description: `Inquiry registered by ${admin.adminUser.name}.`,
          timestamp: new Date().toISOString().replace("T", " ").slice(0, 16),
          type: "status_change",
          actorName: admin.adminUser.name,
        },
      ],
      notesList: newLead.notes
        ? [
            {
              id: `not-${Date.now()}`,
              leadId: id,
              text: newLead.notes,
              authorName: admin.adminUser.name,
              createdAt: createdDate,
            },
          ]
        : [],
    };

    setLeads((prev) => [lead, ...prev]);

    // Update salesperson count
    if (newLead.assignedSalespersonId) {
      setSalespersons((prev) =>
        prev.map((sp) =>
          sp.id === newLead.assignedSalespersonId
            ? { ...sp, assignedLeadsCount: sp.assignedLeadsCount + 1 }
            : sp
        )
      );
    }

    return id;
  };

  const updateLead = (id: string, updated: Partial<CRMLead>) => {
    setLeads((prev) =>
      prev.map((lead) => {
        if (lead.id !== id) return lead;
        const newStatus = updated.status || lead.status;
        return {
          ...lead,
          ...updated,
          status: newStatus,
          statusLabel: getLeadStatusLabel(newStatus),
        };
      })
    );
  };

  const deleteLead = (id: string) => {
    setLeads((prev) => prev.filter((l) => l.id !== id));
  };

  const changeLeadStatus = (id: string, newStatus: LeadStatus) => {
    setLeads((prev) =>
      prev.map((l) => {
        if (l.id !== id) return l;
        const activityItem = {
          id: `act-${Date.now()}`,
          leadId: id,
          title: "Status Changed",
          description: `Stage updated from "${l.statusLabel}" to "${getLeadStatusLabel(newStatus)}"`,
          timestamp: new Date().toISOString().replace("T", " ").slice(0, 16),
          type: "status_change" as const,
          actorName: admin.adminUser.name,
        };
        return {
          ...l,
          status: newStatus,
          statusLabel: getLeadStatusLabel(newStatus),
          activities: [activityItem, ...(l.activities || [])],
        };
      })
    );
  };

  const bulkUpdateLeadStatus = (leadIds: string[], newStatus: LeadStatus) => {
    setLeads((prev) =>
      prev.map((l) => {
        if (!leadIds.includes(l.id)) return l;
        const activityItem = {
          id: `act-${Date.now()}-${l.id}`,
          leadId: l.id,
          title: "Status Changed (Bulk)",
          description: `Stage updated to "${getLeadStatusLabel(newStatus)}" via bulk action.`,
          timestamp: new Date().toISOString().replace("T", " ").slice(0, 16),
          type: "status_change" as const,
          actorName: admin.adminUser.name,
        };
        return {
          ...l,
          status: newStatus,
          statusLabel: getLeadStatusLabel(newStatus),
          activities: [activityItem, ...(l.activities || [])],
        };
      })
    );
  };

  const assignSalespersonToLead = (leadId: string, spId: string, spName: string) => {
    setLeads((prev) =>
      prev.map((l) =>
        l.id === leadId
          ? {
              ...l,
              assignedSalespersonId: spId,
              assignedSalespersonName: spName,
            }
          : l
      )
    );
  };

  const bulkAssignSalesperson = (leadIds: string[], spId: string, spName: string) => {
    setLeads((prev) =>
      prev.map((l) =>
        leadIds.includes(l.id)
          ? {
              ...l,
              assignedSalespersonId: spId,
              assignedSalespersonName: spName,
            }
          : l
      )
    );
  };

  const addLeadNote = (leadId: string, noteText: string, authorName = admin.adminUser.name) => {
    const newNote = {
      id: `not-${Date.now()}`,
      leadId,
      text: noteText,
      authorName,
      createdAt: new Date().toISOString().replace("T", " ").slice(0, 16),
    };

    setLeads((prev) =>
      prev.map((l) =>
        l.id === leadId
          ? {
              ...l,
              notesList: [newNote, ...(l.notesList || [])],
            }
          : l
      )
    );
  };

  const convertLeadToCustomer = (leadId: string): string | null => {
    const targetLead = leads.find((l) => l.id === leadId);
    if (!targetLead) return null;

    // Check if customer already exists by email to prevent duplicate records
    const existing = admin.customers.find(
      (c) => c.email.toLowerCase() === targetLead.email.toLowerCase()
    );

    let customerId = existing?.id;

    if (!existing) {
      // Create new customer record in admin state
      customerId = `cust-${Date.now()}`;
      admin.addCustomer({
        fullName: targetLead.customerName,
        email: targetLead.email,
        phone: targetLead.phone,
        address: "Registered via CRM Conversion",
        city: "London",
        postcode: "HP11",
        status: "active",
        notes: `Converted from lead ${targetLead.leadReference} (${targetLead.vehicleMake} ${targetLead.vehicleModel})`,
      });
    }

    // Mark lead as converted and link customer id
    changeLeadStatus(leadId, "converted");
    setLeads((prev) =>
      prev.map((l) =>
        l.id === leadId ? { ...l, convertedCustomerId: customerId } : l
      )
    );

    // Update salesperson conversion count
    if (targetLead.assignedSalespersonId) {
      setSalespersons((prev) =>
        prev.map((sp) =>
          sp.id === targetLead.assignedSalespersonId
            ? {
                ...sp,
                convertedLeadsCount: sp.convertedLeadsCount + 1,
                totalSalesValue: sp.totalSalesValue + targetLead.estimatedValue,
              }
            : sp
        )
      );
    }

    return customerId || null;
  };

  // Follow-up actions
  const addFollowUp = (item: Omit<FollowUpItem, "id">) => {
    const id = `fup-${Date.now()}`;
    setFollowUps((prev) => [{ ...item, id }, ...prev]);
  };

  const updateFollowUp = (id: string, updated: Partial<FollowUpItem>) => {
    setFollowUps((prev) =>
      prev.map((f) => (f.id === id ? { ...f, ...updated } : f))
    );
  };

  const deleteFollowUp = (id: string) => {
    setFollowUps((prev) => prev.filter((f) => f.id !== id));
  };

  const completeFollowUp = (id: string) => {
    setFollowUps((prev) =>
      prev.map((f) => (f.id === id ? { ...f, status: "completed" } : f))
    );
  };

  const rescheduleFollowUp = (id: string, newDate: string, newTime: string) => {
    setFollowUps((prev) =>
      prev.map((f) =>
        f.id === id
          ? {
              ...f,
              followUpDate: newDate,
              followUpTime: newTime,
              status: "rescheduled",
            }
          : f
      )
    );
  };

  // Salesperson actions
  const addSalesperson = (
    data: Omit<
      Salesperson,
      | "id"
      | "employeeId"
      | "joiningDate"
      | "assignedLeadsCount"
      | "convertedLeadsCount"
      | "totalSalesValue"
      | "currentMonthSales"
    >
  ) => {
    const id = `sp-${Date.now()}`;
    const employeeId = `EMP-SALES-${Math.floor(10 + Math.random() * 90)}`;
    const joiningDate = new Date().toISOString().split("T")[0];

    const newSp: Salesperson = {
      ...data,
      id,
      employeeId,
      joiningDate,
      assignedLeadsCount: 0,
      convertedLeadsCount: 0,
      totalSalesValue: 0,
      currentMonthSales: 0,
    };

    setSalespersons((prev) => [...prev, newSp]);
  };

  const updateSalesperson = (id: string, data: Partial<Salesperson>) => {
    setSalespersons((prev) =>
      prev.map((sp) => (sp.id === id ? { ...sp, ...data } : sp))
    );
  };

  const toggleSalespersonActive = (id: string) => {
    setSalespersons((prev) =>
      prev.map((sp) => (sp.id === id ? { ...sp, active: !sp.active } : sp))
    );
  };

  // Quotation actions
  const addQuotation = (
    data: Omit<Quotation, "id" | "quotationNumber" | "createdDate" | "statusLabel">
  ) => {
    const id = `quo-${Date.now()}`;
    const quotationNumber = `QUO-2026-${Math.floor(100 + Math.random() * 900)}`;
    const createdDate = new Date().toISOString().split("T")[0];

    const newQuo: Quotation = {
      ...data,
      id,
      quotationNumber,
      createdDate,
      statusLabel: getQuotationStatusLabel(data.status),
    };

    setQuotations((prev) => [newQuo, ...prev]);
    return id;
  };

  const updateQuotation = (id: string, data: Partial<Quotation>) => {
    setQuotations((prev) =>
      prev.map((q) => {
        if (q.id !== id) return q;
        const newStatus = data.status || q.status;
        return {
          ...q,
          ...data,
          status: newStatus,
          statusLabel: getQuotationStatusLabel(newStatus),
        };
      })
    );
  };

  const duplicateQuotation = (id: string) => {
    const original = quotations.find((q) => q.id === id);
    if (!original) return "";

    const newId = `quo-${Date.now()}`;
    const newQuotationNumber = `QUO-2026-${Math.floor(100 + Math.random() * 900)}`;

    const duplicated: Quotation = {
      ...original,
      id: newId,
      quotationNumber: newQuotationNumber,
      createdDate: new Date().toISOString().split("T")[0],
      status: "draft",
      statusLabel: "Draft",
    };

    setQuotations((prev) => [duplicated, ...prev]);
    return newId;
  };

  const deleteQuotation = (id: string) => {
    setQuotations((prev) => prev.filter((q) => q.id !== id));
  };

  const changeQuotationStatus = (id: string, newStatus: QuotationStatus) => {
    setQuotations((prev) =>
      prev.map((q) =>
        q.id === id
          ? {
              ...q,
              status: newStatus,
              statusLabel: getQuotationStatusLabel(newStatus),
            }
          : q
      )
    );
  };

  // Commission actions
  const approveCommission = (id: string) => {
    setCommissions((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              paymentStatus: "approved",
              approvedBy: admin.adminUser.name,
            }
          : c
      )
    );
  };

  const payCommission = (id: string) => {
    const today = new Date().toISOString().split("T")[0];
    setCommissions((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              paymentStatus: "paid",
              paidDate: today,
            }
          : c
      )
    );
  };

  const addCommission = (data: Omit<CommissionRecord, "id">) => {
    // Check if commission already recorded for this booking reference
    const exists = commissions.some(
      (c) => c.bookingReference === data.bookingReference
    );
    if (exists) {
      return false; // Prevent duplicate commission
    }

    const id = `com-${Date.now()}`;
    setCommissions((prev) => [{ ...data, id }, ...prev]);
    return true;
  };

  // CRM KPI calculations
  const todayStr = new Date().toISOString().split("T")[0];
  const totalLeads = leads.length;
  const newLeads = leads.filter((l) => l.status === "new").length;
  const contactedLeads = leads.filter((l) => l.status === "contacted").length;
  const interestedLeads = leads.filter((l) => l.status === "interested").length;
  const qualifiedLeads = leads.filter((l) => l.status === "qualified").length;
  const convertedLeads = leads.filter((l) => l.status === "converted").length;
  const lostLeads = leads.filter((l) => l.status === "lost").length;
  const conversionRate =
    totalLeads > 0 ? Math.round((convertedLeads / totalLeads) * 100) : 0;
  const pendingFollowUps = followUps.filter((f) => f.status === "pending").length;
  const followUpsDueToday = followUps.filter(
    (f) =>
      f.status === "pending" &&
      (f.followUpDate === todayStr || f.scheduledDate === todayStr)
  ).length;

  const totalPipelineValue = leads
    .filter((l) => l.status !== "lost")
    .reduce((sum, l) => sum + (Number(l.estimatedValue) || 0), 0);

  const pipelineStageCounts: Record<LeadStatus, number> = {
    new: newLeads,
    contacted: contactedLeads,
    interested: interestedLeads,
    qualified: qualifiedLeads,
    proposal_sent: leads.filter((l) => l.status === "proposal_sent").length,
    negotiation: leads.filter((l) => l.status === "negotiation").length,
    converted: convertedLeads,
    lost: lostLeads,
  };

  const crmKpi: CRMKPIData = {
    totalLeads,
    newLeads,
    contactedLeads,
    interestedLeads,
    qualifiedLeads,
    convertedLeads,
    lostLeads,
    conversionRate,
    pendingFollowUps,
    followUpsDueToday,
    totalPipelineValue,
    pipelineStageCounts,
  };

  const value: CRMContextType = {
    leads,
    addLead,
    updateLead,
    deleteLead,
    changeLeadStatus,
    bulkUpdateLeadStatus,
    assignSalespersonToLead,
    bulkAssignSalesperson,
    addLeadNote,
    convertLeadToCustomer,
    followUps,
    addFollowUp,
    updateFollowUp,
    deleteFollowUp,
    completeFollowUp,
    rescheduleFollowUp,
    salespersons,
    addSalesperson,
    updateSalesperson,
    toggleSalespersonActive,
    quotations,
    addQuotation,
    updateQuotation,
    duplicateQuotation,
    deleteQuotation,
    changeQuotationStatus,
    commissions,
    approveCommission,
    payCommission,
    addCommission,
    crmKpi,
  };

  return <CRMContext.Provider value={value}>{children}</CRMContext.Provider>;
}

export function useCrm() {
  const context = React.useContext(CRMContext);
  if (!context) {
    throw new Error("useCrm must be used within a CRMProvider");
  }
  return context;
}
