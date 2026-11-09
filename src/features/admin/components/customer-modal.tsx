"use client";

import * as React from "react";
import { AdminCustomer } from "../types/admin";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { User, Trash2 } from "lucide-react";

interface CustomerModalProps {
  customerToEdit: AdminCustomer | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postcode: string;
    status: AdminCustomer["status"];
    notes?: string;
  }) => void;
}

export function CustomerModal({
  customerToEdit,
  open,
  onOpenChange,
  onSave,
}: CustomerModalProps) {
  const isEditing = !!customerToEdit;

  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [city, setCity] = React.useState("London");
  const [postcode, setPostcode] = React.useState("");
  const [status, setStatus] = React.useState<AdminCustomer["status"]>("active");
  const [notes, setNotes] = React.useState("");

  React.useEffect(() => {
    if (customerToEdit) {
      setFullName(customerToEdit.fullName);
      setEmail(customerToEdit.email);
      setPhone(customerToEdit.phone);
      setAddress(customerToEdit.address);
      setCity(customerToEdit.city);
      setPostcode(customerToEdit.postcode);
      setStatus(customerToEdit.status);
      setNotes(customerToEdit.notes || "");
    } else {
      setFullName("");
      setEmail("");
      setPhone("");
      setAddress("");
      setCity("London");
      setPostcode("");
      setStatus("active");
      setNotes("");
    }
  }, [customerToEdit, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim()) return;

    onSave({
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      address: address.trim(),
      city: city.trim(),
      postcode: postcode.trim().toUpperCase(),
      status,
      notes: notes.trim() || undefined,
    });

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent size="default">
        <DialogHeader>
          <div className="flex items-center gap-2 text-electric mb-1">
            <User className="w-5 h-5" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider">
              {isEditing ? "Update Client Profile" : "Register New Client"}
            </span>
          </div>
          <DialogTitle>
            {isEditing ? `Edit ${customerToEdit.fullName}` : "Add Client Record"}
          </DialogTitle>
          <DialogDescription>
            Register vehicle owner profile, mobile detailing address, and concierge notes.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1.5">
                Full Name *
              </label>
              <Input
                placeholder="e.g. Lord James Kensington"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1.5">
                Email Address *
              </label>
              <Input
                type="email"
                placeholder="name@company.co.uk"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1.5">
                UK Contact Phone
              </label>
              <Input
                placeholder="+44 7700 900..."
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1.5">
                Customer Status
              </label>
              <select
                value={status}
                onChange={(e) =>
                  setStatus(e.target.value as AdminCustomer["status"])
                }
                className="w-full px-3 py-2 rounded-xl bg-background border border-border text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-electric"
              >
                <option value="active">Active Client</option>
                <option value="vip">VIP Private Client</option>
                <option value="inactive">Inactive</option>
                <option value="flagged">Flagged</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1.5">
              Service Address
            </label>
            <Input
              placeholder="e.g. 14 Belgrave Square, Knightsbridge"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1.5">
                Town / City
              </label>
              <Input
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1.5">
                Postcode
              </label>
              <Input
                placeholder="e.g. SW1X 8PH"
                value={postcode}
                onChange={(e) => setPostcode(e.target.value)}
                className="font-mono uppercase tracking-wider"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1.5">
              Concierge / Vehicle Notes
            </label>
            <Textarea
              rows={3}
              placeholder="e.g. Collects Porsche GT models, prefers carbon ceramic brake cleaners..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="default" size="sm" className="font-bold">
              {isEditing ? "Save Changes" : "Create Record"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

interface DeleteCustomerModalProps {
  customer: AdminCustomer | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export function DeleteCustomerModal({
  customer,
  open,
  onOpenChange,
  onConfirm,
}: DeleteCustomerModalProps) {
  if (!customer) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent size="sm">
        <DialogHeader>
          <div className="flex items-center gap-2 text-destructive mb-1">
            <Trash2 className="w-5 h-5" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider">
              Confirm Client Removal
            </span>
          </div>
          <DialogTitle>Delete Customer Record</DialogTitle>
          <DialogDescription>
            Are you sure you want to remove {customer.fullName} ({customer.email}) from the active operations database?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={() => {
              onConfirm();
              onOpenChange(false);
            }}
          >
            Delete Client
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
