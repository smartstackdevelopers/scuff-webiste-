"use client";

import * as React from "react";
import { useParams, Navigate } from "react-router-dom";
import {
  SERVICES_DATA,
  ServiceDetailHero,
  ServiceBenefits,
  ServiceIncluded,
  ServiceBeforeAfterViewer,
  ServiceFAQs,
  ServiceRelated,
  ServiceBookingBanner,
  ServiceAvailabilityPanel,
} from "@/features/services";

export default function ServiceDetailPage() {
  const { slug = "" } = useParams<{ slug: string }>();
  const service = SERVICES_DATA[slug];

  if (!service) {
    return <Navigate to="/404" replace />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <ServiceDetailHero service={service} />
      <ServiceAvailabilityPanel service={service} />
      <ServiceBenefits service={service} />
      <ServiceIncluded service={service} />
      <ServiceBeforeAfterViewer service={service} />
      <ServiceFAQs service={service} />
      <ServiceRelated service={service} />
      <ServiceBookingBanner service={service} />
    </div>
  );
}
