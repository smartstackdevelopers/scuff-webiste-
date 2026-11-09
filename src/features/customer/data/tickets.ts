import { SupportTicket } from "../types/customer";

export const MOCK_SUPPORT_TICKETS: SupportTicket[] = [
  {
    id: "ticket-01",
    ticketReference: "TCK-1049",
    subject: "Additional PPF Stone Guard Inquiry for Porsche GT3",
    category: "service_inquiry",
    categoryLabel: "Service Inquiry",
    createdDate: "03 Nov 2026, 11:20",
    lastUpdated: "03 Nov 2026, 14:15",
    status: "in_progress",
    statusLabel: "In Progress",
    priority: "high",
    messages: [
      {
        id: "msg-01",
        sender: "customer",
        senderName: "Alexander Hamilton",
        message:
          "Hi team, for my upcoming Ceramic Coating booking (YSWB-8924) on the 18th of November, do you also install front-end Paint Protection Film (PPF) on the bonnet and mirrors prior to applying the 9H coating?",
        timestamp: "03 Nov 2026, 11:20",
      },
      {
        id: "msg-02",
        sender: "support",
        senderName: "Marcus (Head of Studio Bay)",
        avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
        message:
          "Good afternoon Alexander! Yes, we have an accredited SunTek & XPEL film plotter directly in our Mayfair bay. We can apply self-healing film to your bonnet, front wings, and wing mirrors before locking in the remainder of the car with our 9H ceramic shield. I will add the PPF options sheet to your booking file.",
        timestamp: "03 Nov 2026, 14:15",
        attachmentName: "GT3-Front-End-PPF-Options.pdf",
      },
    ],
  },
  {
    id: "ticket-02",
    ticketReference: "TCK-1021",
    subject: "VAT Invoice Copy for Corporate Account",
    category: "payment_question",
    categoryLabel: "Payment Question",
    createdDate: "15 Oct 2026, 09:30",
    lastUpdated: "15 Oct 2026, 10:05",
    status: "resolved",
    statusLabel: "Resolved",
    priority: "medium",
    messages: [
      {
        id: "msg-03",
        sender: "customer",
        senderName: "Alexander Hamilton",
        message:
          "Could you please issue a formal VAT breakdown invoice for booking YSWB-4081 with our company registration number included?",
        timestamp: "15 Oct 2026, 09:30",
      },
      {
        id: "msg-04",
        sender: "support",
        senderName: "Accounts Team",
        message:
          "Hi Alexander, your revised VAT invoice INV-2026-042 has been updated with your corporate details and is available directly in your Invoices tab for download.",
        timestamp: "15 Oct 2026, 10:05",
      },
    ],
  },
];
