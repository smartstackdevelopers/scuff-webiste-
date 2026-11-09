"use client";

import * as React from "react";
import { CustomerVehicle } from "../types/customer";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Car, Trash2 } from "lucide-react";

interface VehicleModalProps {
  vehicleToEdit: CustomerVehicle | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (vehicleData: Omit<CustomerVehicle, "id">) => void;
}

export function VehicleModal({
  vehicleToEdit,
  open,
  onOpenChange,
  onSave,
}: VehicleModalProps) {
  const isEditing = !!vehicleToEdit;

  const [make, setMake] = React.useState("");
  const [model, setModel] = React.useState("");
  const [year, setYear] = React.useState("2024");
  const [registration, setRegistration] = React.useState("");
  const [color, setColor] = React.useState("");
  const [category, setCategory] = React.useState<CustomerVehicle["category"]>("sedan");
  const [isDefault, setIsDefault] = React.useState(false);

  React.useEffect(() => {
    if (vehicleToEdit) {
      setMake(vehicleToEdit.make);
      setModel(vehicleToEdit.model);
      setYear(vehicleToEdit.year);
      setRegistration(vehicleToEdit.registration);
      setColor(vehicleToEdit.color || "");
      setCategory(vehicleToEdit.category);
      setIsDefault(vehicleToEdit.isDefault);
    } else {
      setMake("");
      setModel("");
      setYear(new Date().getFullYear().toString());
      setRegistration("");
      setColor("");
      setCategory("sedan");
      setIsDefault(false);
    }
  }, [vehicleToEdit, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!make.trim() || !model.trim() || !registration.trim()) return;

    onSave({
      make: make.trim(),
      model: model.trim(),
      year: year.trim(),
      registration: registration.trim().toUpperCase(),
      color: color.trim() || undefined,
      category,
      isDefault,
    });

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent size="default">
        <DialogHeader>
          <div className="flex items-center gap-2 text-electric mb-1">
            <Car className="w-5 h-5" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider">
              {isEditing ? "Edit Vehicle" : "Add Vehicle to Garage"}
            </span>
          </div>
          <DialogTitle>
            {isEditing ? `Edit ${vehicleToEdit.make} ${vehicleToEdit.model}` : "Register New Vehicle"}
          </DialogTitle>
          <DialogDescription>
            Saved vehicles auto-populate during booking checkout with custom-tailored detailing packages.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1.5">
                Vehicle Make *
              </label>
              <Input
                placeholder="e.g. Porsche, BMW, Mercedes"
                value={make}
                onChange={(e) => setMake(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1.5">
                Model *
              </label>
              <Input
                placeholder="e.g. 911 GT3, M3 Competition"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1.5">
                Model Year
              </label>
              <Input
                type="number"
                min="1950"
                max="2030"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1.5">
                UK Registration Plate *
              </label>
              <Input
                placeholder="e.g. YS26 WBF"
                value={registration}
                onChange={(e) => setRegistration(e.target.value)}
                className="font-mono uppercase tracking-wider"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1.5">
                Exterior Color / Paint Finish
              </label>
              <Input
                placeholder="e.g. Shark Blue, Matte Carbon"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1.5">
                Vehicle Size Category
              </label>
              <select
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value as CustomerVehicle["category"])
                }
                className="w-full px-3 py-2 rounded-xl bg-background border border-border text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-electric"
              >
                <option value="small">Compact / Hatchback</option>
                <option value="sedan">Executive Saloon / Coupé</option>
                <option value="suv">Mid-Size SUV / Crossover</option>
                <option value="large">Full-Size SUV / 4x4 / Luxury Estate</option>
              </select>
            </div>
          </div>

          <div className="pt-2">
            <Checkbox
              id="isDefaultVehicle"
              checked={isDefault}
              onChange={(e) => setIsDefault(e.target.checked)}
              label="Set as default vehicle for instant bookings"
              description="This vehicle will automatically be preselected in future detailing requests."
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
            <Button type="submit" variant="default" size="sm">
              {isEditing ? "Save Changes" : "Add Vehicle"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

interface DeleteVehicleModalProps {
  vehicle: CustomerVehicle | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export function DeleteVehicleModal({
  vehicle,
  open,
  onOpenChange,
  onConfirm,
}: DeleteVehicleModalProps) {
  if (!vehicle) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent size="sm">
        <DialogHeader>
          <div className="flex items-center gap-2 text-destructive mb-1">
            <Trash2 className="w-5 h-5" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider">
              Confirm Deletion
            </span>
          </div>
          <DialogTitle>Remove Vehicle</DialogTitle>
          <DialogDescription>
            Are you sure you want to remove this {vehicle.year} {vehicle.make} {vehicle.model} ({vehicle.registration}) from your garage profile?
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
            Delete Vehicle
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
