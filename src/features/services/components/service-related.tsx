"use client";

import * as React from "react";
import { DetailedService } from "../types";
import { Container } from "@/components/ui/container";
import { ServiceCard } from "./service-card";
import { SERVICES_DATA } from "../data/services-content";

interface ServiceRelatedProps {
  service: DetailedService;
}

export function ServiceRelated({ service }: ServiceRelatedProps) {
  const relatedServices = service.relatedSlugs
    .map((slug) => SERVICES_DATA[slug])
    .filter(Boolean)
    .slice(0, 3);

  if (relatedServices.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-background border-t border-border/40 relative">
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-12 space-y-3">
          <span className="text-xs uppercase tracking-widest font-bold text-electric">
            Complementary Care
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-foreground">
            Other Services You May Need
          </h2>
          <p className="text-muted-foreground text-sm max-w-lg mx-auto">
            Enhance your vehicle preservation by pairing this treatment with our specialized detailing solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {relatedServices.map((relSvc) => (
            <ServiceCard key={relSvc.id} service={relSvc} />
          ))}
        </div>
      </Container>
    </section>
  );
}
