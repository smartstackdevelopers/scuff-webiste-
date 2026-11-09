"use client";

import * as React from "react";
import Image from "next/image";
import { AdminServiceItem } from "../types/admin";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
  Wrench,
  Plus,
  Pencil,
  Trash2,
  Clock,
} from "lucide-react";
import { useAdmin } from "../hooks/use-admin";

export function ServiceManagement() {
  const { services, toggleServiceActive, addService, updateService, deleteService } =
    useAdmin();

  const [modalOpen, setModalOpen] = React.useState(false);
  const [editingService, setEditingService] = React.useState<AdminServiceItem | null>(
    null
  );
  const [deletingService, setDeletingService] = React.useState<AdminServiceItem | null>(
    null
  );

  // Form states
  const [name, setName] = React.useState("");
  const [category, setCategory] = React.useState<AdminServiceItem["category"]>("Detailing");
  const [tagline, setTagline] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [price, setPrice] = React.useState(150);
  const [duration, setDuration] = React.useState("3 – 5 Hours");
  const [imageUrl, setImageUrl] = React.useState("");
  const [isActive, setIsActive] = React.useState(true);
  const [isPopular, setIsPopular] = React.useState(false);

  React.useEffect(() => {
    if (editingService) {
      setName(editingService.name);
      setCategory(editingService.category);
      setTagline(editingService.tagline);
      setDescription(editingService.description);
      setPrice(editingService.startingPrice);
      setDuration(editingService.estimatedDuration);
      setImageUrl(editingService.imageUrl || "");
      setIsActive(editingService.isActive);
      setIsPopular(editingService.isPopular);
    } else {
      setName("");
      setCategory("Detailing");
      setTagline("");
      setDescription("");
      setPrice(150);
      setDuration("3 – 5 Hours");
      setImageUrl("");
      setIsActive(true);
      setIsPopular(false);
    }
  }, [editingService, modalOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const payload = {
      name: name.trim(),
      slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      category,
      tagline: tagline.trim(),
      description: description.trim(),
      startingPrice: Number(price) || 120,
      currency: "£",
      estimatedDuration: duration.trim(),
      isActive,
      isPopular,
      imageUrl: imageUrl.trim() || undefined,
    };

    if (editingService) {
      updateService(editingService.id, payload);
      setEditingService(null);
    } else {
      addService(payload);
      setModalOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-card border border-border/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">
              Services Catalog Management
            </h1>
            <Badge variant="outline" className="text-xs font-mono">
              {services.length} Packages
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Configure service tiers, base starting pricing, duration increments, and public website availability.
          </p>
        </div>

        <Button
          variant="default"
          size="sm"
          onClick={() => {
            setEditingService(null);
            setModalOpen(true);
          }}
          className="text-xs font-bold uppercase tracking-wider"
        >
          <Plus className="w-4 h-4 mr-1.5" />
          <span>Add New Service</span>
        </Button>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {services.map((svc) => (
          <div
            key={svc.id}
            className={`rounded-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden ${
              svc.isActive
                ? "bg-card border-border/80 hover:border-electric/50 hover:shadow-card-hover"
                : "bg-card/50 border-border/40 opacity-70"
            }`}
          >
            {/* Image Preview Banner */}
            <div className="relative h-40 w-full bg-secondary overflow-hidden">
              {svc.imageUrl ? (
                <Image
                  src={svc.imageUrl}
                  alt={svc.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  <Wrench className="w-8 h-8" />
                </div>
              )}

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />

              {/* Badges on image */}
              <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
                <Badge variant="secondary" className="text-[10px] backdrop-blur-md bg-card/80">
                  {svc.category}
                </Badge>
                {svc.isPopular && (
                  <Badge variant="electric" className="text-[10px]">
                    Featured Tier
                  </Badge>
                )}
              </div>

              <div className="absolute bottom-3 left-3 right-3 flex items-baseline justify-between z-10">
                <span className="font-mono text-xl font-black text-electric">
                  {svc.currency}{svc.startingPrice}
                </span>
                <span className="text-[11px] text-muted-foreground font-medium flex items-center gap-1">
                  <Clock className="w-3 h-3 text-electric" />
                  <span>{svc.estimatedDuration}</span>
                </span>
              </div>
            </div>

            {/* Service Details */}
            <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
              <div className="space-y-1.5">
                <h3 className="text-base font-bold text-foreground">
                  {svc.name}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                  {svc.tagline || svc.description}
                </p>
              </div>

              {/* Status & Action Bar */}
              <div className="pt-4 border-t border-border/60 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Switch
                    checked={svc.isActive}
                    onChange={() => toggleServiceActive(svc.id)}
                    size="sm"
                  />
                  <span className="text-[11px] font-semibold text-muted-foreground">
                    {svc.isActive ? "Available" : "Paused"}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="xs"
                    onClick={() => {
                      setEditingService(svc);
                      setModalOpen(true);
                    }}
                    className="text-xs"
                    title="Edit Service"
                  >
                    <Pencil className="w-3.5 h-3.5 text-muted-foreground" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="xs"
                    onClick={() => setDeletingService(svc)}
                    className="text-xs text-destructive hover:bg-destructive/10"
                    title="Delete Service"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Service Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent size="default">
          <DialogHeader>
            <div className="flex items-center gap-2 text-electric mb-1">
              <Wrench className="w-5 h-5" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider">
                {editingService ? "Edit Service Package" : "New Service Definition"}
              </span>
            </div>
            <DialogTitle>
              {editingService ? `Edit ${editingService.name}` : "Create Detailing Service"}
            </DialogTitle>
            <DialogDescription>
              Service packages will update immediately across the admin operations engine and public booking workflow.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 py-2">
            <div>
              <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1.5">
                Service Title *
              </label>
              <Input
                placeholder="e.g. 9H Ceramic & Graphene Coating"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1.5">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) =>
                    setCategory(e.target.value as AdminServiceItem["category"])
                  }
                  className="w-full px-3 py-2 rounded-xl bg-background border border-border text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-electric"
                >
                  <option value="Ceramic Coating">Ceramic Coating</option>
                  <option value="Paint Correction">Paint Correction</option>
                  <option value="Detailing">Detailing</option>
                  <option value="SMART Repair">SMART Repair</option>
                  <option value="Specialist">Specialist / Alloy</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1.5">
                  Starting Price (£) *
                </label>
                <Input
                  type="number"
                  min="0"
                  step="5"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1.5">
                  Estimated Duration
                </label>
                <Input
                  placeholder="e.g. 4 – 6 Hours"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1.5">
                  Image URL
                </label>
                <Input
                  placeholder="https://..."
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1.5">
                Tagline
              </label>
              <Input
                placeholder="Short luxury headline..."
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1.5">
                Full Description
              </label>
              <Textarea
                rows={3}
                placeholder="Detailed explanation of methodology, chemicals, and guarantees..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <Switch
                checked={isActive}
                onChange={setIsActive}
                label="Active for Booking"
                description="Make visible on public booking engine"
              />

              <Switch
                checked={isPopular}
                onChange={setIsPopular}
                label="Featured Package"
                description="Highlight with badge"
              />
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
                {editingService ? "Save Service" : "Add Service"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={!!deletingService} onOpenChange={(open) => !open && setDeletingService(null)}>
        <DialogContent size="sm">
          <DialogHeader>
            <div className="flex items-center gap-2 text-destructive mb-1">
              <Trash2 className="w-5 h-5" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider">
                Confirm Removal
              </span>
            </div>
            <DialogTitle>Delete Service Package</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove &ldquo;{deletingService?.name}&rdquo; from the active catalog?
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setDeletingService(null)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={() => {
                if (deletingService) {
                  deleteService(deletingService.id);
                  setDeletingService(null);
                }
              }}
            >
              Confirm Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
