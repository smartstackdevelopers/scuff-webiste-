export type JobStatus =
  | "scheduled"
  | "in_progress"
  | "paint_curing"
  | "quality_checked"
  | "completed";

export interface JobChecklistItem {
  id: string;
  task: string;
  completed: boolean;
}

export interface TechnicianJob {
  id: string;
  jobReference: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleRegistration: string;
  vehicleColour: string;
  paintCode?: string;
  serviceName: string;
  scheduledDate: string;
  scheduledTime: string;
  estimatedDuration: string;
  bayNumber: string;
  status: JobStatus;
  checklist: JobChecklistItem[];
  beforePhotos: string[];
  afterPhotos: string[];
  technicianNotes?: string;
}
