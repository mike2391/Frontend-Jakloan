"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Check, ChevronLeft, ChevronRight, Home, Settings, Upload, User, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface Step {
  title: string;
  icon: LucideIcon;
  fields: Field[];
}

interface Field {
  id: string;
  label: string;
  type?: string;
  placeholder: string;
}

type FormValues = Record<string, string>;

function InputField({ field, value, onChange }: { field: Field; value: string; onChange: (value: string) => void }) {
  return (
    <div className="space-y-2 text-left">
      <label htmlFor={field.id} className="text-sm font-medium text-foreground">
        {field.label}
      </label>
      <input
        id={field.id}
        name={field.id}
        type={field.type ?? "text"}
        placeholder={field.placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required
        className="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
      />
    </div>
  );
}

const steps: Step[] = [
  {
    title: "Account",
    icon: User,
    fields: [
      { id: "full-name", label: "Full name", placeholder: "Your full name" },
      { id: "email", label: "Email address", type: "email", placeholder: "you@example.com" },
      { id: "phone", label: "Phone number", type: "tel", placeholder: "+62 812 3456 7890" },
      { id: "occupation", label: "Occupation", placeholder: "Your occupation" },
    ],
  },
  {
    title: "Profile",
    icon: Settings,
    fields: [
      { id: "property-type", label: "Property type", placeholder: "House, apartment, or shop" },
      { id: "location", label: "Property location", placeholder: "City or district" },
      { id: "monthly-income", label: "Monthly income", type: "number", placeholder: "IDR 0" },
      { id: "loan-amount", label: "Loan amount", type: "number", placeholder: "IDR 0" },
    ],
  },
  {
    title: "Upload",
    icon: Upload,
    fields: [
      { id: "identity-number", label: "Identity number", placeholder: "Your ID number" },
      { id: "document-type", label: "Document type", placeholder: "KTP, passport, or other" },
      { id: "document-name", label: "Document name", placeholder: "Name on the document" },
      { id: "document-number", label: "Document number", placeholder: "Document reference number" },
    ],
  },
  {
    title: "Done",
    icon: Home,
    fields: [
      { id: "approval-name", label: "Approval name", placeholder: "Your preferred name" },
      { id: "approval-email", label: "Approval email", type: "email", placeholder: "you@example.com" },
      { id: "contact-time", label: "Preferred contact time", placeholder: "Morning, afternoon, or evening" },
      { id: "additional-notes", label: "Additional notes", placeholder: "Anything else we should know" },
    ],
  },
];

export default function Stepper03() {
  const [activeStep, setActiveStep] = useState(0);
  const [formValues, setFormValues] = useState<FormValues>({});
  const prefersReducedMotion = useReducedMotion();

  const progress = activeStep / (steps.length - 1);

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => Math.max(0, prev - 1));
  };

  const handleFieldChange = (fieldId: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [fieldId]: value }));
  };

  return (
    <div className="mx-auto w-9/10 m-5">
      <div className="rounded-xl border border-border bg-background p-8 flex flex-col gap-8">
        <div className="relative">
          <div className="absolute top-5 h-0.5 bg-border" style={{ left: "12.5%", right: "12.5%" }} />
          <motion.div
            className="absolute top-5 h-0.5 bg-primary origin-left"
            style={{ left: "12.5%", right: "12.5%" }}
            initial={false}
            animate={{ scaleX: progress }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
          />
          <motion.span
            className="absolute size-2 rounded-full bg-primary"
            style={{ top: 21, x: "-50%", y: "-50%" }}
            initial={{ left: "12.5%" }}
            animate={{ left: `${12.5 + progress * 75}%` }}
            transition={{ type: "spring", stiffness: 160, damping: 24 }}
          />
          <div className="relative flex items-start justify-between">
            {steps.map((step, index) => {
              const isActive = index === activeStep;
              const isCompleted = index < activeStep;
              return (
                <div key={step.title} className="flex flex-1 flex-col items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveStep(index)}
                    aria-current={isActive ? "step" : undefined}
                    aria-label={`${step.title} step`}
                    className="group relative z-10 flex size-10 cursor-pointer items-center justify-center rounded-full transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background">
                    <span
                      className={cn(
                        "absolute inset-0 rounded-full transition-colors duration-300",
                        isCompleted || isActive ? "bg-primary" : "bg-muted group-hover:bg-muted/80",
                      )}
                    />
                    {isActive && !prefersReducedMotion && (
                      <motion.span
                        className="absolute inset-0 rounded-full ring-2 ring-primary/50"
                        initial={{ scale: 1, opacity: 1 }}
                        animate={{
                          scale: [1, 1.45, 1],
                          opacity: [1, 0.2, 1],
                        }}
                        transition={{
                          duration: 2.2,
                          repeat: Infinity,
                          repeatType: "mirror",
                          ease: "easeInOut",
                        }}
                      />
                    )}
                    <motion.div
                      className="relative flex items-center justify-center"
                      animate={{ scale: isActive ? 1.1 : 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 320,
                        damping: 18,
                      }}>
                      <AnimatePresence mode="wait" initial={false}>
                        {isCompleted ?
                          <motion.span
                            key="check"
                            initial={{ scale: 0, rotate: -90, opacity: 0 }}
                            animate={{ scale: 1, rotate: 0, opacity: 1 }}
                            exit={{ scale: 0, rotate: 90, opacity: 0 }}
                            transition={{
                              type: "spring",
                              stiffness: 400,
                              damping: 22,
                            }}
                            className="flex items-center justify-center text-teal-400">
                            <Check className="size-5" strokeWidth={3} />
                          </motion.span>
                        : <motion.span
                            key="icon"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{
                              type: "spring",
                              stiffness: 400,
                              damping: 22,
                            }}
                            className="flex items-center justify-center">
                            <step.icon className={cn("size-5", isActive ? "text-primary-foreground" : "text-muted-foreground")} />
                          </motion.span>
                        }
                      </AnimatePresence>
                    </motion.div>
                  </button>
                  <span
                    className={cn(
                      "text-xs font-medium transition-colors duration-300",
                      isActive || isCompleted ? "text-foreground" : "text-muted-foreground",
                    )}>
                    {step.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <form
          className="min-h-20 text-center"
          onSubmit={(event) => {
            event.preventDefault();
            handleNext();
          }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="space-y-1">
              <p className="text-lg font-semibold text-foreground">{steps[activeStep].title}</p>
              <div className="mt-6 grid gap-5 md:grid-cols-2">
                {steps[activeStep].fields.map((field) => (
                  <InputField
                    key={field.id}
                    field={field}
                    value={formValues[field.id] ?? ""}
                    onChange={(value) => handleFieldChange(field.id, value)}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
          <Separator className="my-8" />
          <div className="flex items-center justify-between">
            <Button type="button" variant="outline" onClick={handleBack} disabled={activeStep === 0} className="cursor-pointer">
              <ChevronLeft />
              Back
            </Button>
            <p className="text-sm text-muted-foreground">
              Step {activeStep + 1} of {steps.length}
            </p>
            <Button type="submit" disabled={activeStep === steps.length - 1} className="cursor-pointer">
              Continue
              <ChevronRight />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
