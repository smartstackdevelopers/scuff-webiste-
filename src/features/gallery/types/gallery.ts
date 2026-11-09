export type GalleryCategory =
  | "all"
  | "interior"
  | "exterior"
  | "correction"
  | "ceramic"
  | "full"
  | "transformation";

export interface GalleryCategoryOption {
  id: GalleryCategory;
  label: string;
  description?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  category: GalleryCategory;
  categoryLabel: string;
  imageUrl: string;
  alt: string;
  vehicleType?: string;
  serviceName?: string;
  completionDate?: string;
  aspectRatio?: "landscape" | "portrait" | "square";
  featured?: boolean;
}

export interface TransformationCase {
  id: string;
  title: string;
  vehicle: string;
  vehicleCategory: string;
  service: string;
  turnaround: string;
  beforeImage: string;
  beforeAlt: string;
  beforeLabel: string;
  beforeNotes: string;
  afterImage: string;
  afterAlt: string;
  afterLabel: string;
  afterNotes: string;
  summary: string;
}

export interface GalleryStat {
  label: string;
  value: string;
  description: string;
  iconName: string;
}
