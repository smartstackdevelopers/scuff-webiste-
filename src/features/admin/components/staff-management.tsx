"use client";

import * as React from "react";
import { AdminStaffMember, StaffRole, StaffWorkingStatus } from "../types/admin";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Shield,
  UserPlus,
  Pencil,
  Star,
  Phone,
  Mail,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { useAdmin } from "../hooks/use-admin";

export function StaffManagement() {
  const { staff, toggleStaffActive, addStaff, updateStaff, services } = useAdmin();

  const [modalOpen, setModalOpen] = React.useState(false);
  const [editingStaff, setEditingStaff] = React.useState<AdminStaffMember | null>(null);

  // Form states
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [role, setRole] = React.useState<StaffRole>("Master Detailer");
  const [workingStatus, setWorkingStatus] =
    React.useState<StaffWorkingStatus>("on_duty");
  const [assignedServices, setAssignedServices] = React.useState<string[]>([]);
  const [weeklyHours, setWeeklyHours] = React.useState(40);
  const [avatarUrl, setAvatarUrl] = React.useState("");

  React.useEffect(() => {
    if (editingStaff) {
      setName(editingStaff.name);
      setEmail(editingStaff.email);
      setPhone(editingStaff.phone);
      setRole(editingStaff.role);
      setWorkingStatus(editingStaff.workingStatus);
      setAssignedServices(editingStaff.assignedServices);
      setWeeklyHours(editingStaff.weeklyHours);
      setAvatarUrl(editingStaff.avatarUrl || "");
    } else {
      setName("");
      setEmail("");
      setPhone("");
      setRole("Master Detailer");
      setWorkingStatus("on_duty");
      setAssignedServices(["ceramic-graphene-coating"]);
      setWeeklyHours(40);
      setAvatarUrl("");
    }
  }, [editingStaff, modalOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    const payload = {
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      role,
      avatarUrl: avatarUrl.trim() || undefined,
      assignedServices,
      workingStatus,
      weeklyHours: Number(weeklyHours) || 40,
      active: true,
    };

    if (editingStaff) {
      updateStaff(editingStaff.id, payload);
      setEditingStaff(null);
    } else {
      addStaff(payload);
      setModalOpen(false);
    }
  };

  const getStatusBadge = (status: StaffWorkingStatus) => {
    switch (status) {
      case "on_duty":
        return (
          <Badge variant="success" className="text-[10px]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1 animate-pulse" />
            On Duty
          </Badge>
        );
      case "in_studio":
        return (
          <Badge variant="electric" className="text-[10px]">
            Studio Bay
          </Badge>
        );
      case "mobile_dispatch":
        return (
          <Badge variant="warning" className="text-[10px]">
            Mobile Unit
          </Badge>
        );
      case "off_duty":
      default:
        return (
          <Badge variant="outline" className="text-[10px] text-muted-foreground">
            Off Duty
          </Badge>
        );
    }
  };

  const toggleServiceAssignment = (serviceId: string) => {
    setAssignedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((s) => s !== serviceId)
        : [...prev, serviceId]
    );
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-card border border-border/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">
              Detailing Specialists & Staff
            </h1>
            <Badge variant="outline" className="text-xs font-mono">
              {staff.length} Active Specialists
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Manage master technician profiles, mobile van operators, studio bay assignments, and weekly working capacities.
          </p>
        </div>

        <Button
          variant="default"
          size="sm"
          onClick={() => {
            setEditingStaff(null);
            setModalOpen(true);
          }}
          className="text-xs font-bold uppercase tracking-wider"
        >
          <UserPlus className="w-4 h-4 mr-1.5" />
          <span>Add Specialist</span>
        </Button>
      </div>

      {/* Staff Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {staff.map((member) => {
          const initials = member.name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .slice(0, 2);

          return (
            <div
              key={member.id}
              className={`p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between space-y-4 ${
                member.active
                  ? "bg-card border-border/80 hover:border-electric/50 hover:shadow-card-hover"
                  : "bg-card/50 border-border/40 opacity-60"
              }`}
            >
              {/* Header with Avatar & Status */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <Avatar size="lg">
                    <AvatarImage src={member.avatarUrl} alt={member.name} />
                    <AvatarFallback className="bg-charcoal-800 text-electric font-bold border border-electric/30">
                      {initials}
                    </AvatarFallback>
                  </Avatar>

                  <div>
                    <h3 className="text-base font-bold text-foreground">
                      {member.name}
                    </h3>
                    <p className="text-xs text-electric font-semibold">
                      {member.role}
                    </p>
                    <div className="mt-1 flex items-center gap-1 text-[11px] text-amber-400 font-bold">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span>{member.rating}</span>
                      <span className="text-muted-foreground font-normal">
                        ({member.completedJobs} jobs)
                      </span>
                    </div>
                  </div>
                </div>

                {getStatusBadge(member.workingStatus)}
              </div>

              {/* Contact & Hours Info */}
              <div className="space-y-1.5 text-xs text-muted-foreground p-3 rounded-xl bg-secondary/40 border border-border/60">
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-electric shrink-0" />
                  <span className="truncate">{member.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-electric shrink-0" />
                  <span>{member.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-electric shrink-0" />
                  <span>{member.weeklyHours}h / week target</span>
                </div>
              </div>

              {/* Assigned Services Pills */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">
                  Authorised Service Disciplines
                </span>
                <div className="flex flex-wrap gap-1">
                  {member.assignedServices.map((svcId) => {
                    const matchedSvc = services.find((s) => s.id === svcId);
                    return (
                      <span
                        key={svcId}
                        className="px-2 py-0.5 rounded-full bg-secondary text-foreground text-[10px] font-medium border border-border/60"
                      >
                        {matchedSvc?.name || svcId}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Footer Controls */}
              <div className="pt-3 border-t border-border/60 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Switch
                    checked={member.active}
                    onChange={() => toggleStaffActive(member.id)}
                    size="sm"
                  />
                  <span className="text-[11px] font-semibold text-muted-foreground">
                    {member.active ? "Active" : "Suspended"}
                  </span>
                </div>

                <Button
                  variant="ghost"
                  size="xs"
                  onClick={() => {
                    setEditingStaff(member);
                    setModalOpen(true);
                  }}
                  className="text-xs"
                >
                  <Pencil className="w-3.5 h-3.5 mr-1" />
                  <span>Edit Profile</span>
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Staff Add / Edit Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent size="default">
          <DialogHeader>
            <div className="flex items-center gap-2 text-electric mb-1">
              <Shield className="w-5 h-5" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider">
                {editingStaff ? "Edit Specialist Record" : "Register Specialist"}
              </span>
            </div>
            <DialogTitle>
              {editingStaff ? `Edit ${editingStaff.name}` : "Add Detailing Specialist"}
            </DialogTitle>
            <DialogDescription>
              Technicians can be allocated to studio bays, SMART repair jobs, or mobile detailing dispatches.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 py-2">
            <div>
              <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1.5">
                Specialist Full Name *
              </label>
              <Input
                placeholder="e.g. David Macallan"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1.5">
                  Email Address *
                </label>
                <Input
                  type="email"
                  placeholder="name@youscuffwebuff.co.uk"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1.5">
                  Mobile Phone
                </label>
                <Input
                  placeholder="+44 7700 900..."
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1.5">
                  Staff Role
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as StaffRole)}
                  className="w-full px-3 py-2 rounded-xl bg-background border border-border text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-electric"
                >
                  <option value="Master Detailer">Master Detailer</option>
                  <option value="Paint Correction Specialist">Paint Correction Specialist</option>
                  <option value="Interior Restoration Specialist">Interior Restoration Specialist</option>
                  <option value="Mobile Dispatch Lead">Mobile Dispatch Lead</option>
                  <option value="Apprentice Detailer">Apprentice Detailer</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1.5">
                  Working Status
                </label>
                <select
                  value={workingStatus}
                  onChange={(e) =>
                    setWorkingStatus(e.target.value as StaffWorkingStatus)
                  }
                  className="w-full px-3 py-2 rounded-xl bg-background border border-border text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-electric"
                >
                  <option value="on_duty">On Duty</option>
                  <option value="in_studio">In Studio Bay</option>
                  <option value="mobile_dispatch">Mobile Unit Dispatch</option>
                  <option value="off_duty">Off Duty</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1.5">
                  Target Weekly Hours
                </label>
                <Input
                  type="number"
                  min="10"
                  max="60"
                  value={weeklyHours}
                  onChange={(e) => setWeeklyHours(Number(e.target.value))}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1.5">
                  Avatar Photo URL
                </label>
                <Input
                  placeholder="https://..."
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                />
              </div>
            </div>

            {/* Service Assignments */}
            <div>
              <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-2">
                Assigned Service Competencies
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {services.map((svc) => {
                  const isChecked = assignedServices.includes(svc.id);
                  return (
                    <button
                      key={svc.id}
                      type="button"
                      onClick={() => toggleServiceAssignment(svc.id)}
                      className={`p-2.5 rounded-xl border text-left flex items-center justify-between transition-colors ${
                        isChecked
                          ? "bg-secondary border-electric text-foreground font-bold"
                          : "bg-background border-border/70 text-muted-foreground hover:bg-secondary/40"
                      }`}
                    >
                      <span>{svc.name}</span>
                      {isChecked && <CheckCircle2 className="w-3.5 h-3.5 text-electric" />}
                    </button>
                  );
                })}
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setModalOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" variant="default" size="sm" className="font-bold">
                {editingStaff ? "Save Specialist" : "Add Specialist"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
