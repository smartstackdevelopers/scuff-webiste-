"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, RotateCcw } from "lucide-react";
import { useBooking } from "../hooks/use-booking";
import { BookingHero } from "./booking-hero";
import { BookingProgress } from "./booking-progress";
import { BookingSidebar } from "./booking-sidebar";
import { BookingConfirmation } from "./booking-confirmation";
import { Step1ServiceSelection } from "./steps/step1-service-selection";
import { Step2DateSelection } from "./steps/step2-date-selection";
import { Step3TimeSelection } from "./steps/step3-time-selection";
import { Step4CustomerDetails } from "./steps/step4-customer-details";
import { Step5ReviewConfirm } from "./steps/step5-review-confirm";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export function BookingWizard() {
  const {
    state,
    isHydrated,
    validationErrors,
    setStep,
    nextStep,
    prevStep,
    selectService,
    selectPackage,
    toggleAddon,
    selectDate,
    selectTimeSlot,
    updateCustomerField,
    setTermsAccepted,
    confirmBooking,
    resetBooking,
  } = useBooking();

  // Scroll to top of wizard on step change
  const wizardTopRef = React.useRef<HTMLDivElement>(null);

  const handleNext = () => {
    if (state.step === 5) {
      const ok = confirmBooking();
      if (ok && wizardTopRef.current) {
        wizardTopRef.current.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      const ok = nextStep();
      if (ok && wizardTopRef.current) {
        wizardTopRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handlePrev = () => {
    prevStep();
    if (wizardTopRef.current) {
      wizardTopRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (!isHydrated) {
    return (
      <div className="py-24 text-center space-y-3">
        <div className="w-8 h-8 rounded-full border-2 border-electric border-t-transparent animate-spin mx-auto" />
        <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
          Loading Booking System...
        </p>
      </div>
    );
  }

  // If booking is confirmed, display confirmation screen
  if (state.isConfirmed) {
    return (
      <div className="min-h-screen bg-surface-secondary">
        <BookingHero />
        <Container className="py-12">
          <BookingConfirmation state={state} onReset={resetBooking} />
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-secondary flex flex-col" ref={wizardTopRef}>
      <BookingHero />

      <Container className="py-10 flex-1">
        {/* Progress Bar */}
        <div className="mb-10">
          <BookingProgress currentStep={state.step} onStepClick={setStep} />
        </div>

        {/* Wizard Layout: Steps (7 cols) + Sticky Sidebar (5 cols) on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Active Wizard Step Form */}
          <div className="lg:col-span-8 space-y-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={state.step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {state.step === 1 && (
                  <Step1ServiceSelection
                    state={state}
                    onSelectService={selectService}
                    onSelectPackage={selectPackage}
                    onToggleAddon={toggleAddon}
                    errorMessage={validationErrors.service}
                  />
                )}

                {state.step === 2 && (
                  <Step2DateSelection
                    selectedDate={state.appointmentDate}
                    onSelectDate={selectDate}
                    errorMessage={validationErrors.date}
                  />
                )}

                {state.step === 3 && (
                  <Step3TimeSelection
                    selectedDate={state.appointmentDate}
                    selectedTimeSlot={state.timeSlot}
                    onSelectTimeSlot={selectTimeSlot}
                    errorMessage={validationErrors.time}
                  />
                )}

                {state.step === 4 && (
                  <Step4CustomerDetails
                    customer={state.customer}
                    onUpdateField={updateCustomerField}
                    errors={validationErrors}
                  />
                )}

                {state.step === 5 && (
                  <Step5ReviewConfirm
                    state={state}
                    onGoToStep={setStep}
                    onSetTermsAccepted={setTermsAccepted}
                    errorMessage={validationErrors.terms}
                  />
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons Controls */}
            <div className="pt-6 border-t border-border/50 flex flex-wrap items-center justify-between gap-4">
              <div>
                {state.step > 1 ? (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handlePrev}
                    leftIcon={<ArrowLeft className="w-4 h-4" />}
                  >
                    Previous Step
                  </Button>
                ) : (
                  <button
                    type="button"
                    onClick={resetBooking}
                    className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1.5 p-2"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Reset Choices
                  </button>
                )}
              </div>

              <div className="flex items-center gap-3">
                <Button
                  type="button"
                  variant="glow"
                  size="lg"
                  onClick={handleNext}
                  className="font-bold uppercase tracking-wider"
                >
                  {state.step === 5 ? (
                    <>
                      <Check className="w-4 h-4 mr-1.5 stroke-[3]" />
                      Confirm Reservation
                    </>
                  ) : (
                    <>
                      Continue to Step 0{state.step + 1}
                      <ArrowRight className="w-4 h-4 ml-1.5" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>

          {/* Sticky / Mobile Sidebar Summary */}
          <div className="lg:col-span-4">
            <BookingSidebar state={state} />
          </div>
        </div>
      </Container>
    </div>
  );
}
