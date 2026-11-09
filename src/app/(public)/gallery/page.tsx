import * as React from "react";
import type { Metadata } from "next";
import {
  GalleryHero,
  TransformationShowcase,
  GalleryGrid,
  GalleryStats,
  GalleryCTA,
} from "@/features/gallery";

export const metadata: Metadata = {
  title: "Vehicle Transformation Gallery | You Scuff We Buff",
  description:
    "Explore our automotive detailing gallery and interactive before & after transformations across paint correction, ceramic coatings, and interior restorations.",
  openGraph: {
    title: "Vehicle Transformation Gallery | You Scuff We Buff",
    description:
      "Precision vehicle detailing, paint correction, and ceramic coating transformations in the UK.",
    url: "/gallery",
  },
};

export default function GalleryPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <GalleryHero />
      <TransformationShowcase />
      <GalleryGrid />
      <GalleryStats />
      <GalleryCTA />
    </div>
  );
}
