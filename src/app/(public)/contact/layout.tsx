import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact You Scuff We Buff | Get a Repair Quote",
  description:
    "Contact You Scuff We Buff for professional mobile alloy wheel refurbishment, diamond cutting, and SMART scratch repairs across Birmingham and the West Midlands. Call 07448 661 691.",
  openGraph: {
    title: "Contact You Scuff We Buff | Get a Repair Quote",
    description:
      "Get a free mobile alloy wheel repair quote in Birmingham and the West Midlands. Call 07448 661 691 or message us on WhatsApp.",
    url: "/contact",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
