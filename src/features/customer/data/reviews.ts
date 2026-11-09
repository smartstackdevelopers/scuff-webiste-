import { CustomerReview } from "../types/customer";

export const MOCK_CUSTOMER_REVIEWS: CustomerReview[] = [
  {
    id: "rev-01",
    bookingReference: "YSWB-4081",
    serviceName: "Interior Deep Steam Extraction",
    vehicleName: "Range Rover Autobiography",
    rating: 5,
    title: "Completely revived our family SUV cabin!",
    comment:
      "Years of dog hair, spilled drinks, and dull leather were completely transformed. The technician was punctual, polite, and walked me through every finished surface. The OEM matte finish on the steering wheel feels like day one from Solihull.",
    reviewDate: "16 Oct 2026",
    status: "published",
  },
  {
    id: "rev-02",
    bookingReference: "YSWB-2933",
    serviceName: "Signature Full Vehicle Detail",
    vehicleName: "Porsche 911 GT3",
    rating: 5,
    title: "Master craftsmanship on track-driven paintwork",
    comment:
      "Picked up the GT3 following a weekend at the track. All rubber tyre marbles, bug splatter, and heavy brake dust were completely eradicated without adding a single swirl scratch. Exceptional attention to detail and outstanding mobile service.",
    reviewDate: "24 Aug 2026",
    status: "published",
  },
];
