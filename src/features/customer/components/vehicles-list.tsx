"use client";

import * as React from "react";
import { useCustomer } from "../hooks/use-customer";
import { CustomerVehicle } from "../types/customer";
import { VehicleCard } from "./vehicle-card";
import { VehicleModal, DeleteVehicleModal } from "./vehicle-modal";
import { Button } from "@/components/ui/button";
import { Car, Plus } from "lucide-react";

export function VehiclesList() {
  const {
    vehicles,
    addVehicle,
    updateVehicle,
    deleteVehicle,
    setDefaultVehicle,
  } = useCustomer();

  const [addModalOpen, setAddModalOpen] = React.useState(false);
  const [vehicleToEdit, setVehicleToEdit] = React.useState<CustomerVehicle | null>(
    null
  );
  const [vehicleToDelete, setVehicleToDelete] = React.useState<CustomerVehicle | null>(
    null
  );

  const handleSaveVehicle = (vehicleData: Omit<CustomerVehicle, "id">) => {
    if (vehicleToEdit) {
      updateVehicle(vehicleToEdit.id, vehicleData);
      setVehicleToEdit(null);
    } else {
      addVehicle(vehicleData);
      setAddModalOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-card border border-border/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">
              My Garage
            </h1>
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-secondary text-foreground">
              {vehicles.length} Saved
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Manage your registered automobiles for instant one-click booking and tailored paint correction specifications.
          </p>
        </div>

        <Button
          variant="default"
          size="sm"
          onClick={() => {
            setVehicleToEdit(null);
            setAddModalOpen(true);
          }}
          className="text-xs font-bold uppercase tracking-wider"
        >
          <Plus className="w-4 h-4 mr-1.5" />
          <span>Add Vehicle</span>
        </Button>
      </div>

      {/* Vehicles Grid */}
      {vehicles.length === 0 ? (
        <div className="py-16 text-center rounded-2xl bg-card border border-border/80 space-y-3">
          <Car className="w-12 h-12 text-muted-foreground mx-auto" />
          <h3 className="text-base font-bold text-foreground">Garage is Empty</h3>
          <p className="text-xs text-muted-foreground max-w-sm mx-auto">
            You haven&apos;t added any vehicles to your profile yet. Add your car to enable expedited booking.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setVehicleToEdit(null);
              setAddModalOpen(true);
            }}
            className="text-xs"
          >
            Register First Vehicle
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {vehicles.map((v) => (
            <VehicleCard
              key={v.id}
              vehicle={v}
              onEdit={(veh) => {
                setVehicleToEdit(veh);
                setAddModalOpen(true);
              }}
              onDelete={(veh) => setVehicleToDelete(veh)}
              onSetDefault={(id) => setDefaultVehicle(id)}
            />
          ))}
        </div>
      )}

      {/* Add / Edit Vehicle Modal */}
      <VehicleModal
        vehicleToEdit={vehicleToEdit}
        open={addModalOpen}
        onOpenChange={(open) => {
          setAddModalOpen(open);
          if (!open) setVehicleToEdit(null);
        }}
        onSave={handleSaveVehicle}
      />

      {/* Delete Vehicle Modal */}
      <DeleteVehicleModal
        vehicle={vehicleToDelete}
        open={!!vehicleToDelete}
        onOpenChange={(open) => !open && setVehicleToDelete(null)}
        onConfirm={() => {
          if (vehicleToDelete) {
            deleteVehicle(vehicleToDelete.id);
            setVehicleToDelete(null);
          }
        }}
      />
    </div>
  );
}
