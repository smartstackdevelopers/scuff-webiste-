"use client";

import * as React from "react";
import Link from "next/link";
import {
  HelpCircle,
  Search,
  ChevronDown,
  Sparkles,
  Calendar,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  Phone,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { CinematicVideoHero } from "@/components/common/cinematic-video-hero";
import { siteConfig } from "@/config/site";

interface FAQItem {
  question: string;
  answer: string;
  category: "all" | "ceramic" | "paint" | "mobile" | "warranty";
}

const FAQS: FAQItem[] = [
  {
    category: "ceramic",
    question: "How long does a 9H Graphene or Ceramic Coating last on my vehicle?",
    answer:
      "Our accredited 9H Graphene and Ceramic systems are guaranteed for up to 5 years with regular scheduled maintenance. The coating creates a permanent chemical covalent bond with the factory clear coat, providing exceptional hydrophobicity, UV resistance, and chemical shielding against road salt and bird lime.",
  },
  {
    category: "ceramic",
    question: "Do I need paint correction before ceramic coating application?",
    answer:
      "Yes, paint correction is essential prior to applying any semi-permanent ceramic or graphene shield. Because the coating locks in the paint condition beneath it, all swirl marks, micro-marring, and oxidation must be machine-compounded and jeweled to optical perfection first.",
  },
  {
    category: "paint",
    question: "What is the difference between single-stage and multi-stage paint correction?",
    answer:
      "Single-stage correction uses a one-step polish and pad combination designed to remove 50–70% of light surface swirls and dramatically boost gloss. Multi-stage correction employs heavy cutting compounding followed by intermediate refinement and ultra-fine jewel polishing, removing up to 90–95% of defects without risking clear coat thickness.",
  },
  {
    category: "paint",
    question: "Can you remove deep key scratches and stone chips?",
    answer:
      "If a scratch has not penetrated completely through the clear coat into the primer or base metal (tested via our ultrasonic paint depth gauge), it can be wet-sanded and machine polished out. For deeper chips and bumper scuffs, our SMART spot repair service color-matches factory paint codes with undetectable blending.",
  },
  {
    category: "mobile",
    question: "What do I need to provide for a mobile detailing visit at my home or office?",
    answer:
      "Our bespoke mobile detailing vans are 100% self-sufficient, equipped with pure de-ionised water tanks, ultra-quiet Honda generators, commercial steam extractors, and pop-up vehicle canopies. We only require a safe, authorized parking spot adjacent to your vehicle.",
  },
  {
    category: "mobile",
    question: "What happens if it rains on the day of my mobile appointment?",
    answer:
      "For mobile appointments, light drizzle is shielded by our heavy-duty detailing gazebos. In the event of severe torrential rain or sub-zero freezing temperatures, we will either accommodate your vehicle in our temperature-controlled studio bay or reschedule without any cancellation fee.",
  },
  {
    category: "warranty",
    question: "What warranties and insurance guarantees are provided?",
    answer:
      "You Scuff We Buff is backed by £5,000,000 comprehensive automotive liability insurance covering high-value exotics and prestige vehicles in our care. All ceramic coating applications include official registered warranty documentation and annual inspection checks.",
  },
  {
    category: "warranty",
    question: "What is your cancellation and booking rescheduling policy?",
    answer:
      "We understand schedules change. You may reschedule or cancel your appointment free of charge up to 48 hours before your booking time via your online Customer Dashboard or by contacting our concierge team.",
  },
];

export default function FAQPage() {
  const [search, setSearch] = React.useState("");
  const [activeCategory, setActiveCategory] = React.useState<string>("all");
  const [openIndices, setOpenIndices] = React.useState<number[]>([0]);

  const toggleAccordion = (idx: number) => {
    setOpenIndices((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const filteredFaqs = FAQS.filter((faq) => {
    const matchesCategory = activeCategory === "all" || faq.category === activeCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(search.toLowerCase()) ||
      faq.answer.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground transition-colors duration-200">
      {/* Cinematic Video Hero */}
      <CinematicVideoHero
        videoSrc="/videos/hero/04-painting.mp4"
        posterSrc="https://images.unsplash.com/photo-1507136566006-cfc505b114fc?q=80&w=2070&auto=format&fit=crop"
        badgeText="Master Knowledge Base & Direct Guidance"
        badgeIcon={<HelpCircle className="w-3.5 h-3.5" />}
        badgeVariant="electric"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Frequently Asked Questions" },
        ]}
        title={
          <>
            EXPERTISE, CLARITY & <br className="hidden sm:inline" />
            <span className="text-gradient-electric">AUTOMOTIVE STANDARDS.</span>
          </>
        }
        subtitle="Transparent answers on ceramic longevity, paint depth safety, self-sufficient mobile requirements, and studio warranty certificates."
        align="center"
        minHeightClass="min-h-[58vh] sm:min-h-[66vh]"
        primaryCta={{
          label: "Book Service Bay",
          href: "/booking",
          variant: "amber",
          icon: <Calendar className="w-4 h-4 mr-2" />,
        }}
        secondaryCta={{
          label: "Ask a Master Technician",
          href: "/contact",
          icon: <Phone className="w-4 h-4 mr-2" />,
        }}
        metrics={[
          { label: "Public Liability", value: "£5M Cover", icon: <ShieldCheck className="w-4 h-4" /> },
          { label: "Coating Lifespan", value: "Up to 5 Yrs", icon: <Sparkles className="w-4 h-4" /> },
          { label: "Reschedule Notice", value: "48h Free", icon: <CheckCircle2 className="w-4 h-4" /> },
        ]}
      >
        {/* Search Input Box */}
        <div className="pt-4 max-w-xl xl:max-w-2xl mx-auto relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search questions (e.g. ceramic coating, rain, scratch)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-11 h-12 bg-card/90 text-foreground text-sm rounded-2xl border-border shadow-sm backdrop-blur-md focus:border-primary"
          />
        </div>
      </CinematicVideoHero>

      <div className="py-16 sm:py-24 space-y-12 bg-surface-secondary transition-colors duration-200">
        <Container>
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pb-6">
            {[
              { id: "all", label: "All Questions" },
              { id: "ceramic", label: "Ceramic & Graphene" },
              { id: "paint", label: "Paint Correction" },
              { id: "mobile", label: "Mobile Logistics" },
              { id: "warranty", label: "Warranties & Care" },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "px-4 py-2 rounded-xl text-xs font-semibold transition-all select-none border",
                  activeCategory === cat.id
                    ? "bg-primary text-black font-bold border-primary shadow-glow-sm"
                    : "bg-surface-card border-border text-muted-foreground hover:text-foreground hover:border-primary/40"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Accordion List */}
          <div className="max-w-4xl xl:max-w-5xl 2xl:max-w-6xl mx-auto space-y-4">
            {filteredFaqs.length === 0 ? (
              <div className="py-12 text-center text-muted-foreground bg-surface-card rounded-2xl border border-border p-8">
                <HelpCircle className="w-8 h-8 text-muted-foreground mx-auto mb-2 opacity-50" />
                <p className="text-sm">No matching questions found for &quot;{search}&quot;.</p>
                <button
                  onClick={() => {
                    setSearch("");
                    setActiveCategory("all");
                  }}
                  className="mt-3 text-xs text-primary font-bold hover:underline"
                >
                  Reset search filters
                </button>
              </div>
            ) : (
              filteredFaqs.map((faq, idx) => {
                const isOpen = openIndices.includes(idx);
                return (
                  <div
                    key={idx}
                    className="bg-surface-card border border-border rounded-2xl overflow-hidden transition-all duration-200 shadow-sm"
                  >
                    <button
                      type="button"
                      onClick={() => toggleAccordion(idx)}
                      className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-bold text-foreground text-sm sm:text-base hover:text-primary transition-colors focus:outline-none"
                    >
                      <span>{faq.question}</span>
                      <ChevronDown
                        className={cn(
                          "w-4 h-4 text-primary shrink-0 transition-transform duration-200",
                          isOpen && "rotate-180"
                        )}
                      />
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-muted-foreground leading-relaxed border-t border-border pt-4">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* Bottom Help Banner */}
          <div className="max-w-4xl xl:max-w-5xl 2xl:max-w-6xl mx-auto pt-8">
            <div className="p-6 rounded-3xl bg-surface-card border border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-sm">
              <div>
                <h4 className="text-sm font-bold text-foreground font-display uppercase tracking-wider">Have a bespoke vehicle enquiry?</h4>
                <p className="text-xs text-muted-foreground mt-0.5">Our detailing directors are available Monday to Saturday for consultations.</p>
              </div>
              <Link href="/contact">
                <Button size="sm" variant="glow" className="shrink-0 gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Contact Director</span>
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
