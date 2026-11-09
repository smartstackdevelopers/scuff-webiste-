"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Quotation, QuotationStatus } from "../types/crm";
import { useCrm } from "../hooks/use-crm";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  FileText,
  Plus,
  Search,
  Eye,
  Pencil,
  Copy,
  Trash2,
  Download,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { QuotationBuilderModal } from "./quotation-builder-modal";
import { exportToCsv } from "../lib/crm-calculations";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

export function QuotationTable() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const prefillLeadId = searchParams.get("newLead");
  const prefillEmail = searchParams.get("email");

  const {
    quotations,
    duplicateQuotation,
    deleteQuotation,
  } = useCrm();

  const [search, setSearch] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<string>("all");
  const [modalOpen, setModalOpen] = React.useState(!!prefillLeadId || !!prefillEmail);
  const [editingQuotation, setEditingQuotation] = React.useState<Quotation | null>(null);
  const [deletingQuotation, setDeletingQuotation] = React.useState<Quotation | null>(null);

  const [page, setPage] = React.useState(1);
  const itemsPerPage = 8;

  // Aggregate Metrics
  const totalQuotations = quotations.length;
  const acceptedValue = quotations
    .filter((q) => q.status === "accepted")
    .reduce((sum, q) => sum + (q.grandTotal ?? q.totalAmount ?? 0), 0);
  const pendingValue = quotations
    .filter((q) => q.status === "sent" || q.status === "viewed")
    .reduce((sum, q) => sum + (q.grandTotal ?? q.totalAmount ?? 0), 0);
  const acceptanceRate =
    totalQuotations > 0
      ? Math.round((quotations.filter((q) => q.status === "accepted").length / totalQuotations) * 100)
      : 0;

  // Filter list
  const filteredQuotations = quotations.filter((q) => {
    const client = q.customerName || q.clientName || "";
    const email = q.customerEmail || q.clientEmail || "";

    const matchSearch =
      q.quotationNumber.toLowerCase().includes(search.toLowerCase()) ||
      client.toLowerCase().includes(search.toLowerCase()) ||
      email.toLowerCase().includes(search.toLowerCase()) ||
      q.vehicleMake.toLowerCase().includes(search.toLowerCase()) ||
      q.vehicleModel.toLowerCase().includes(search.toLowerCase());

    if (!matchSearch) return false;

    if (statusFilter !== "all" && q.status !== statusFilter) return false;

    return true;
  });

  const totalPages = Math.ceil(filteredQuotations.length / itemsPerPage) || 1;
  const paginatedList = filteredQuotations.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const getStatusBadge = (status: QuotationStatus) => {
    switch (status) {
      case "draft":
        return <Badge variant="secondary" className="text-xs">Draft</Badge>;
      case "sent":
        return <Badge variant="secondary" className="bg-blue-500/10 text-blue-400 border-blue-500/20 text-xs">Sent</Badge>;
      case "viewed":
        return <Badge variant="warning" className="text-xs">Viewed by Client</Badge>;
      case "accepted":
        return <Badge variant="success" className="text-xs">Accepted</Badge>;
      case "declined":
      case "rejected":
        return <Badge variant="destructive" className="text-xs">Declined</Badge>;
      case "expired":
        return <Badge variant="outline" className="text-xs text-muted-foreground">Expired</Badge>;
    }
  };

  const handleExportCsv = () => {
    const csvData = filteredQuotations.map((q) => ({
      QuotationNumber: q.quotationNumber,
      Client: q.customerName || q.clientName || "Client",
      Email: q.customerEmail || q.clientEmail || "",
      Phone: q.customerPhone || q.clientPhone || "",
      Vehicle: `${q.vehicleYear || "2024"} ${q.vehicleMake} ${q.vehicleModel}`,
      Registration: q.vehicleRegistration || "N/A",
      Salesperson: q.salespersonName,
      Status: q.status,
      CreatedDate: q.createdDate,
      ValidUntil: q.validUntil,
      Subtotal: q.subtotal,
      Discount: q.discountAmount || 0,
      VATAmount: q.taxAmount ?? q.vatAmount ?? 0,
      TotalAmount: q.grandTotal ?? q.totalAmount ?? 0,
    }));
    exportToCsv(csvData, `you-scuff-we-buff-quotations-${new Date().toISOString().split("T")[0]}`);
  };

  const handleDuplicate = (id: string) => {
    const newId = duplicateQuotation(id);
    router.push(`/admin/quotations/${newId}`);
  };

  const handleDeleteConfirm = () => {
    if (deletingQuotation) {
      deleteQuotation(deletingQuotation.id);
      setDeletingQuotation(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground font-serif">
            Bespoke Quotations & Proposals
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Create itemized detailing estimates, automated 20% UK VAT invoicing, and track client approvals.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleExportCsv}>
            <Download className="mr-1.5 h-4 w-4" />
            Export CSV
          </Button>
          <Button
            size="sm"
            onClick={() => {
              setEditingQuotation(null);
              setModalOpen(true);
            }}
          >
            <Plus className="mr-1.5 h-4 w-4" />
            Create Quotation
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-xl border border-border/40 bg-card p-4">
          <span className="text-xs text-muted-foreground">Total Proposals</span>
          <p className="mt-1 text-2xl font-bold text-foreground font-mono">{totalQuotations}</p>
        </div>
        <div className="rounded-xl border border-border/40 bg-card p-4">
          <span className="text-xs text-muted-foreground">Accepted Value (Gross)</span>
          <p className="mt-1 text-2xl font-bold text-emerald-400 font-mono">
            £{acceptedValue.toLocaleString("en-GB", { minimumFractionDigits: 0 })}
          </p>
        </div>
        <div className="rounded-xl border border-border/40 bg-card p-4">
          <span className="text-xs text-muted-foreground">Pending Decisions</span>
          <p className="mt-1 text-2xl font-bold text-blue-400 font-mono">
            £{pendingValue.toLocaleString("en-GB", { minimumFractionDigits: 0 })}
          </p>
        </div>
        <div className="rounded-xl border border-border/40 bg-card p-4">
          <span className="text-xs text-muted-foreground">Win Rate</span>
          <p className="mt-1 text-2xl font-bold text-foreground font-mono">{acceptanceRate}%</p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search quotation #, client, vehicle..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 text-xs"
          />
        </div>

        <div className="w-full sm:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full sm:w-48 text-xs rounded-lg border border-border/40 bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="all">All Statuses</option>
            <option value="draft">Draft</option>
            <option value="sent">Sent</option>
            <option value="viewed">Viewed</option>
            <option value="accepted">Accepted</option>
            <option value="declined">Declined</option>
            <option value="expired">Expired</option>
          </select>
        </div>
      </div>

      {/* Quotations Table */}
      <div className="rounded-xl border border-border/40 bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border/40 bg-muted/30 text-left text-muted-foreground font-medium">
                <th className="py-3 px-4">Proposal Ref</th>
                <th className="py-3 px-4">Client & Contact</th>
                <th className="py-3 px-4">Vehicle Specification</th>
                <th className="py-3 px-4">Sales Advisor</th>
                <th className="py-3 px-4 text-right">Amount (Inc. VAT)</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Valid Until</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/20">
              {paginatedList.length > 0 ? (
                paginatedList.map((q) => {
                  const client = q.customerName || q.clientName || "Client";
                  const phone = q.customerPhone || q.clientPhone;
                  const total = q.grandTotal ?? q.totalAmount ?? 0;

                  return (
                    <tr key={q.id} className="hover:bg-muted/20 transition-colors">
                      {/* Proposal Ref */}
                      <td className="py-3 px-4">
                        <Link
                          href={`/admin/quotations/${q.id}`}
                          className="font-mono font-bold text-primary hover:underline block"
                        >
                          {q.quotationNumber}
                        </Link>
                        <span className="text-[10px] text-muted-foreground">
                          Issued {q.createdDate}
                        </span>
                      </td>

                      {/* Client */}
                      <td className="py-3 px-4">
                        <span className="font-semibold text-foreground block">
                          {client}
                        </span>
                        {phone && (
                          <span className="text-[11px] text-muted-foreground">
                            {phone}
                          </span>
                        )}
                      </td>

                      {/* Vehicle */}
                      <td className="py-3 px-4">
                        <span className="text-foreground block">
                          {q.vehicleYear} {q.vehicleMake} {q.vehicleModel}
                        </span>
                        {q.vehicleRegistration && (
                          <span className="font-mono text-[10px] bg-muted/60 px-1.5 py-0.5 rounded border border-border/30">
                            {q.vehicleRegistration}
                          </span>
                        )}
                      </td>

                      {/* Advisor */}
                      <td className="py-3 px-4 text-muted-foreground">
                        {q.salespersonName}
                      </td>

                      {/* Amount */}
                      <td className="py-3 px-4 text-right font-mono">
                        <span className="font-bold text-foreground text-sm block">
                          £{total.toLocaleString("en-GB", { minimumFractionDigits: 2 })}
                        </span>
                        <span className="text-[10px] text-muted-foreground">
                          Ex. VAT: £{q.subtotal.toLocaleString("en-GB", { minimumFractionDigits: 2 })}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1.5">
                          {getStatusBadge(q.status)}
                        </div>
                      </td>

                      {/* Valid Until */}
                      <td className="py-3 px-4 text-muted-foreground font-mono">
                        {q.validUntil}
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Link href={`/admin/quotations/${q.id}`}>
                            <Button size="icon" variant="ghost" className="h-7 w-7 text-muted-foreground hover:text-foreground">
                              <Eye className="h-3.5 w-3.5" />
                            </Button>
                          </Link>

                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-7 w-7 text-muted-foreground hover:text-foreground"
                            onClick={() => {
                              setEditingQuotation(q);
                              setModalOpen(true);
                            }}
                          >
                            <Pencil className="h-3.5 w-3.5" />
                          </Button>

                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-7 w-7 text-muted-foreground hover:text-foreground"
                            title="Duplicate Proposal"
                            onClick={() => handleDuplicate(q.id)}
                          >
                            <Copy className="h-3.5 w-3.5" />
                          </Button>

                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-7 w-7 text-red-400 hover:text-red-300 hover:bg-red-500/10"
                            onClick={() => setDeletingQuotation(q)}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-muted-foreground">
                    <FileText className="mx-auto h-8 w-8 text-muted-foreground/50 mb-2" />
                    No quotations found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between p-3 border-t border-border/40 text-xs">
            <span className="text-muted-foreground">
              Showing {(page - 1) * itemsPerPage + 1} to{" "}
              {Math.min(page * itemsPerPage, filteredQuotations.length)} of{" "}
              {filteredQuotations.length} quotations
            </span>
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="icon"
                className="h-7 w-7"
                disabled={page <= 1}
                onClick={() => setPage(page - 1)}
              >
                <ChevronLeft className="h-3.5 w-3.5" />
              </Button>
              <span className="px-2 font-mono text-muted-foreground">
                Page {page} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="icon"
                className="h-7 w-7"
                disabled={page >= totalPages}
                onClick={() => setPage(page + 1)}
              >
                <ChevronRight className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Builder Modal */}
      <QuotationBuilderModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        initialData={editingQuotation}
        prefillLeadId={prefillLeadId}
        prefillEmail={prefillEmail}
      />

      {/* Delete Confirmation Modal */}
      <Dialog
        open={!!deletingQuotation}
        onOpenChange={(open) => !open && setDeletingQuotation(null)}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Quotation</DialogTitle>
            <DialogDescription>
              Are you sure you want to permanently remove quotation{" "}
              <strong className="text-foreground">{deletingQuotation?.quotationNumber}</strong> for {deletingQuotation?.customerName || deletingQuotation?.clientName}?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeletingQuotation(null)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteConfirm}
            >
              Delete Permanently
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
