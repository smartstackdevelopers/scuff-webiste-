"use client";

import * as React from "react";
import { Salesperson } from "../types/crm";
import { useCrm } from "../hooks/use-crm";
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

interface SalespersonModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: Salesperson | null;
}

export function SalespersonModal({
  open,
  onOpenChange,
  initialData,
}: SalespersonModalProps) {
  const { addSalesperson, updateSalesperson } = useCrm();

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [role, setRole] = React.useState("Sales Advisor");
  const [commissionRate, setCommissionRate] = React.useState(7.5);
  const [monthlyTarget, setMonthlyTarget] = React.useState(25000);
  const [isActive, setIsActive] = React.useState(true);

  React.useEffect(() => {
    if (initialData) {
      setName(initialData.fullName || initialData.name || "");
      setEmail(initialData.email);
      setPhone(initialData.phone);
      setRole(initialData.department || initialData.role || "Sales Advisor");
      setCommissionRate(initialData.commissionRate);
      setMonthlyTarget(initialData.monthlyTarget);
      setIsActive(initialData.active ?? initialData.isActive ?? true);
    } else {
      setName("");
      setEmail("");
      setPhone("");
      setRole("Sales Advisor");
      setCommissionRate(7.5);
      setMonthlyTarget(25000);
      setIsActive(true);
    }
  }, [initialData, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (initialData) {
      updateSalesperson(initialData.id, {
        fullName: name,
        name,
        email,
        phone,
        department: role,
        role,
        commissionRate: Number(commissionRate),
        monthlyTarget: Number(monthlyTarget),
        active: isActive,
        isActive,
      });
    } else {
      addSalesperson({
        fullName: name,
        name,
        email,
        phone,
        department: role,
        role,
        commissionRate: Number(commissionRate),
        monthlyTarget: Number(monthlyTarget),
        active: isActive,
        isActive,
      });
    }

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Edit Sales Representative" : "Add Sales Representative"}
          </DialogTitle>
          <DialogDescription>
            Configure consultant contact information, monthly revenue targets, and commission structure.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          <div>
            <label className="text-xs font-medium text-foreground block mb-1">
              Full Name <span className="text-red-400">*</span>
            </label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Julian Thorne"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-foreground block mb-1">
                Email Address <span className="text-red-400">*</span>
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="julian@youscuffwebuff.co.uk"
                required
              />
            </div>
            <div>
              <label className="text-xs font-medium text-foreground block mb-1">
                Phone Number <span className="text-red-400">*</span>
              </label>
              <Input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+44 7700 900123"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-foreground block mb-1">
              Role / Department <span className="text-red-400">*</span>
            </label>
            <Input
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g. Senior Client Executive"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-foreground block mb-1">
                Commission Rate (%) <span className="text-red-400">*</span>
              </label>
              <Input
                type="number"
                step="0.5"
                min="0"
                max="50"
                value={commissionRate}
                onChange={(e) => setCommissionRate(parseFloat(e.target.value) || 0)}
                required
              />
            </div>
            <div>
              <label className="text-xs font-medium text-foreground block mb-1">
                Monthly Target (£) <span className="text-red-400">*</span>
              </label>
              <Input
                type="number"
                step="1000"
                min="0"
                value={monthlyTarget}
                onChange={(e) => setMonthlyTarget(parseInt(e.target.value) || 0)}
                required
              />
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="isActive"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
            />
            <label htmlFor="isActive" className="text-xs font-medium text-foreground cursor-pointer">
              Active Sales Representative (eligible to receive lead inquiries)
            </label>
          </div>

          <DialogFooter className="pt-3">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {initialData ? "Save Changes" : "Create Representative"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
