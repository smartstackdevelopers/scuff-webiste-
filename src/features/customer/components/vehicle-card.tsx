"use client";

import * as React from "react";
import Link from "next/link";
import {
  Car,
  CheckCircle,
  MoreVertical,
  Calendar,
  Pencil,
  Trash2,
  Sparkles,
} from "lucide-react";
import { CustomerVehicle } from "../types/customer";
import { Badge } from "@/components/ui/badge";

interface VehicleCardProps {
  vehicle: CustomerVehicle;
  onEdit: (vehicle: CustomerVehicle) => void;
  onDelete: (vehicle: CustomerVehicle) => void;
  onSetDefault: (vehicleId: string) => void;
}

export function VehicleCard({
  vehicle,
  onEdit,
  onDelete,
  onSetDefault,
}: VehicleCardProps) {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  React.useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
      return () => document.removeEventListener("mousedown", handleOutsideClick);
    }
  }, [menuOpen]);

  const getCategoryLabel = (cat: CustomerVehicle["category"]) => {
    switch (cat) {
      case "small":
        return "Compact / Hatch";
      case "sedan":
        return "Executive Saloon / Coupe";
      case "suv":
        return "Mid-Size SUV / Crossover";
      case "large":
        return "Full-Size 4x4 / Luxury Estate";
      default:
        return "Standard Vehicle";
    }
  };

  return (
    <div className="relative group rounded-2xl bg-card border border-border/80 p-5 md:p-6 transition-all duration-300 hover:border-electric/50 hover:shadow-card-hover flex flex-col justify-between">
      {/* Top Header: Category & Options Menu */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="text-[10px] font-semibold uppercase tracking-wider">
            {getCategoryLabel(vehicle.category)}
          </Badge>
          {vehicle.isDefault && (
            <Badge variant="electric" className="text-[10px] py-0.5">
              Default Vehicle
            </Badge>
          )}
        </div>

        {/* 3-dots Menu */}
        <div className="relative" ref={menuRef}>
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            aria-label="Vehicle options"
          >
            <MoreVertical className="w-4 h-4" />
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-1 w-44 rounded-xl bg-card border border-border/80 shadow-xl p-1.5 z-20 space-y-1">
              {!vehicle.isDefault && (
                <button
                  type="button"
                  onClick={() => {
                    onSetDefault(vehicle.id);
                    setMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs rounded-lg hover:bg-secondary text-foreground text-left"
                >
                  <CheckCircle className="w-3.5 h-3.5 text-electric" />
                  <span>Set as Default</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => {
                  onEdit(vehicle);
                  setMenuOpen(false);
                }}
                className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs rounded-lg hover:bg-secondary text-foreground text-left"
              >
                <Pencil className="w-3.5 h-3.5 text-muted-foreground" />
                <span>Edit Details</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  onDelete(vehicle);
                  setMenuOpen(false);
                }}
                className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs rounded-lg hover:bg-destructive/10 text-destructive text-left"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Remove Vehicle</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Vehicle Details */}
      <div className="my-4 space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-electric group-hover:scale-105 transition-transform">
            <Car className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-foreground">
              {vehicle.year} {vehicle.make} {vehicle.model}
            </h3>
            {vehicle.color && (
              <span className="text-xs text-muted-foreground flex items-center gap-1.5 mt-0.5">
                <span className="w-2.5 h-2.5 rounded-full border border-border bg-foreground/60 inline-block" />
                <span>{vehicle.color}</span>
              </span>
            )}
          </div>
        </div>

        {/* UK Registration Plate Replica */}
        <div className="pt-2">
          <div className="inline-flex items-center rounded border-2 border-black bg-gradient-to-r from-amber-300 via-amber-400 to-amber-300 px-3 py-1 text-black shadow-sm font-mono text-xs tracking-widest font-black select-none">
            <span className="mr-2 text-[9px] font-sans font-bold bg-blue-700 text-white px-1 py-0.5 rounded-xs leading-none">
              UK
            </span>
            <span>{vehicle.registration.toUpperCase()}</span>
          </div>
        </div>
      </div>

      {/* Card Footer: Quick Actions */}
      <div className="pt-3 border-t border-border/60 flex items-center justify-between gap-2">
        <Link
          href={`/booking?vehicleId=${vehicle.id}`}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-electric hover:underline"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Book Detailing</span>
        </Link>

        <span className="text-[11px] text-muted-foreground flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-electric" />
          <span>Care Profile Active</span>
        </span>
      </div>
    </div>
  );
}
