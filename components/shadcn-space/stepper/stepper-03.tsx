"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { ArrowRight, Check, ChevronLeft, ChevronRight, Home, Settings, Upload, User, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";

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
  required?: boolean;
  options?: string[];
}

type FormValues = Record<string, string>;

function InputField({ field, value, onChange }: { field: Field; value: string; onChange: (value: string) => void }) {
  const inputClassName =
    "flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20";

  return (
    <div className="space-y-2 text-left">
      <label htmlFor={field.id} className="text-sm font-medium text-foreground">
        {field.label}
        {field.required && <span className="text-red-500"> *</span>}
      </label>
      {field.options ?
        <select
          id={field.id}
          name={field.id}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          required={field.required === true}
          className={inputClassName}>
          <option value="" disabled>
            {field.placeholder}
          </option>
          {field.options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      : <input
          id={field.id}
          name={field.id}
          type={field.type ?? "text"}
          placeholder={field.placeholder}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          required={field.required === true}
          className={inputClassName}
        />
      }
    </div>
  );
}

const steps: Step[] = [
  {
    title: "Profil Nasabah",
    icon: User,
    fields: [
      {
        id: "occupation",
        label: "Pekerjaan",
        placeholder: "Pilih pekerjaan",
        required: true,
        options: ["Karyawan swasta", "Wirausaha", "BUMN", "BUMD", "Pekerja lepas", "Pekerja kontrak", "Tidak bekerja"],
      },
      {
        id: "partner-occupation",
        label: "Pekerjaan pasangan",
        placeholder: "Pilih pekerjaan pasangan",
        required: false,
        options: ["Karyawan swasta", "Wirausaha", "BUMN", "BUMD", "Pekerja lepas", "Pekerja kontrak", "Tidak bekerja"],
      },
      { id: "monthly-income", label: "Penghasilan bulanan", type: "number", placeholder: "Rp. 0", required: true },
      { id: "partner-monthly-income", label: "Penghasilan bulanan pasangan", type: "number", placeholder: "Rp. 0" },
      { id: "marital-status", label: "Status", placeholder: "Pilih status", required: true, options: ["Lajang", "Menikah", "Duda", "Janda"] },
      { id: "monthly-expenses", label: "Pengeluaran bulanan", type: "number", placeholder: "Rp. 0", required: true },
    ],
  },
  {
    title: "Properti",
    icon: Settings,
    fields: [
      {
        id: "property-type",
        label: "Jenis Properti",
        placeholder: "Pilih jenis properti",
        required: false,
        options: ["Rumah", "Apartemen", "Ruko"],
      },
      { id: "land-area", label: "Luas Tanah", type: "number", placeholder: "m2", required: true },
      {
        id: "property-location",
        label: "Lokasi properti",
        placeholder: "Pilih lokasi properti",
        required: true,
        options: [
          "Jakarta Selatan",
          "Jakarta Pusat",
          "Jakarta Timur",
          "Jakarta Barat",
          "Jakarta Utara",
          "Bekasi",
          "Cikarang",
          "Depok",
          "Tangerang Selatan",
          "Tangerang",
        ],
      },
      { id: "building-area", label: "Luas bangunan", type: "number", placeholder: "m2", required: false },
      { id: "property-price", label: "Harga properti", type: "number", placeholder: "Rp.0", required: true },
      {
        id: "property-status",
        label: "Status properti",
        placeholder: "Pilih status properti",
        required: true,
        options: ["Baru", "Bekas"],
      },
    ],
  },
  {
    title: "Data Credit",
    icon: Upload,
    fields: [],
  },
  {
    title: "Suku Bunga",
    icon: Home,
    fields: [],
  },
];

const inputClassName =
  "flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-60";

const fixedRateByPeriod: Record<string, string> = {
  "1 tahun": "4",
  "2 tahun": "5",
  "3 tahun": "5.75",
  "4 tahun": "6.5",
  "5 tahun": "7.25",
};

export default function Stepper03() {
  const [activeStep, setActiveStep] = useState(0);
  const [formValues, setFormValues] = useState<FormValues>({
    "interest-type": "fixed",
    "interest-period": "tahunan",
    "fixed-rate": "10",
    "floating-rate": "9.1",
    "fixed-period": "1 tahun",
    "floating-scenario": "1 tahun",
  });
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

  const propertyPrice = Number(formValues["property-price"] ?? 0);
  const downPaymentPercentage = Number(formValues["down-payment-percentage"] ?? 20);
  const downPayment = propertyPrice * (downPaymentPercentage / 100);
  const loanAmount = propertyPrice - downPayment;
  const formatCurrency = (value: number) => `Rp. ${new Intl.NumberFormat("id-ID").format(value)}`;

  const interestType = formValues["interest-type"] ?? "fixed";
  const fixedPeriod = formValues["fixed-period"] ?? "1 tahun";
  const fixedToFloatingRate = fixedRateByPeriod[fixedPeriod] ?? fixedRateByPeriod["1 tahun"];

  const renderCreditStep = () => (
    <div className="space-y-8 text-left">
      <div className="space-y-2">
        <h1 className="text-base font-semibold text-foreground">Harga property</h1>
        <div className="rounded-md border border-border bg-muted/40 px-3 py-2 text-sm text-foreground">{formatCurrency(propertyPrice)}</div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-base font-semibold text-foreground">DP (Down Payment)</h1>
          <span className="text-sm font-medium text-primary">{downPaymentPercentage}%</span>
        </div>
        <Slider
          value={[downPaymentPercentage]}
          min={0}
          max={95}
          step={1}
          onValueChange={([value]) => handleFieldChange("down-payment-percentage", String(value ?? 0))}
          aria-label="Persentase down payment"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>0%</span>
          <span>95%</span>
        </div>
        <div className="rounded-md border border-border bg-muted/40 px-3 py-2 text-sm text-foreground">{formatCurrency(downPayment)}</div>
      </div>

      <div className="space-y-2">
        <h1 className="text-base font-semibold text-foreground">Jumlah pinjaman</h1>
        <div className="rounded-md border border-border bg-muted/40 px-3 py-2 text-sm text-foreground">{formatCurrency(loanAmount)}</div>
      </div>

      <div className="space-y-2">
        <label htmlFor="tenor" className="text-sm font-medium text-foreground">
          Tenor
        </label>
        <select
          id="tenor"
          name="tenor"
          value={formValues.tenor ?? ""}
          onChange={(event) => handleFieldChange("tenor", event.target.value)}
          className="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20">
          <option value="" disabled>
            Pilih tenor
          </option>
          {[5, 10, 15, 20, 25].map((tenor) => (
            <option key={tenor} value={tenor}>
              {tenor} tahun
            </option>
          ))}
        </select>
      </div>
    </div>
  );

  const renderInterestStep = () => (
    <div className="grid gap-5 text-left md:grid-cols-2">
      <div className="space-y-2">
        <label htmlFor="interest-type" className="text-sm font-medium text-foreground">
          Jenis suku bunga
        </label>
        <select
          id="interest-type"
          name="interest-type"
          value={interestType}
          onChange={(event) => handleFieldChange("interest-type", event.target.value)}
          className={inputClassName}>
          <option value="fixed">Fixed</option>
          <option value="floating">Floating</option>
          <option value="fixed-floating">Fixed -&gt; Floating</option>
        </select>
        {interestType === "fixed-floating" && (
          <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
            Fixed <ArrowRight className="size-3" aria-hidden="true" /> Floating
          </div>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="interest-period" className="text-sm font-medium text-foreground">
          Periode suku bunga
        </label>
        <select id="interest-period" name="interest-period" value="tahunan" disabled className={inputClassName}>
          <option value="tahunan">Tahunan</option>
        </select>
      </div>

      {interestType === "fixed" && (
        <div className="space-y-2">
          <label htmlFor="fixed-rate" className="text-sm font-medium text-foreground">
            Suku bunga fixed
          </label>
          <div className="relative">
            <select id="fixed-rate" name="fixed-rate" value="10" disabled className={inputClassName}>
              <option value="10">10%</option>
            </select>
          </div>
        </div>
      )}

      {interestType === "floating" && (
        <div className="space-y-2">
          <label htmlFor="floating-rate" className="text-sm font-medium text-foreground">
            Suku bunga floating
          </label>
          <select id="floating-rate" name="floating-rate" value="9.1" disabled className={inputClassName}>
            <option value="9.1">9.1%</option>
          </select>
        </div>
      )}

      {interestType === "fixed-floating" && (
        <>
          <div className="space-y-2">
            <label htmlFor="fixed-period" className="text-sm font-medium text-foreground">
              Masa fixed rate
            </label>
            <select
              id="fixed-period"
              name="fixed-period"
              value={fixedPeriod}
              onChange={(event) => handleFieldChange("fixed-period", event.target.value)}
              className={inputClassName}>
              {Object.keys(fixedRateByPeriod).map((period) => (
                <option key={period} value={period}>
                  {period}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="fixed-rate-transition" className="text-sm font-medium text-foreground">
              Suku bunga fixed
            </label>
            <div className="relative">
              <input
                id="fixed-rate-transition"
                name="fixed-rate-transition"
                type="number"
                value={fixedToFloatingRate}
                disabled
                className={inputClassName}
              />
              <span className="absolute inset-y-0 right-3 flex items-center text-sm text-muted-foreground">%</span>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="floating-rate-transition" className="text-sm font-medium text-foreground">
              Suku bunga floating
            </label>
            <div className="relative">
              <input id="floating-rate-transition" name="floating-rate-transition" type="number" value="9.1" disabled className={inputClassName} />
              <span className="absolute inset-y-0 right-3 flex items-center text-sm text-muted-foreground">%</span>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="floating-scenario" className="text-sm font-medium text-foreground">
              Skenario kenaikan suku bunga
            </label>
            <select
              id="floating-scenario"
              name="floating-scenario"
              value={formValues["floating-scenario"] ?? "1 tahun"}
              onChange={(event) => handleFieldChange("floating-scenario", event.target.value)}
              className={inputClassName}>
              {Object.keys(fixedRateByPeriod).map((period) => (
                <option key={period} value={period}>
                  {period}
                </option>
              ))}
            </select>
          </div>
        </>
      )}
    </div>
  );

  return (
    <div className="mx-auto w-9/10 m-5 mt-12">
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
              {activeStep === 2 ?
                <div className="mt-6">{renderCreditStep()}</div>
              : activeStep === 3 ?
                <div className="mt-6">{renderInterestStep()}</div>
              : <div className="mt-6 grid gap-5 md:grid-cols-2">
                  {steps[activeStep].fields.map((field) => (
                    <InputField
                      key={field.id}
                      field={field}
                      value={formValues[field.id] ?? ""}
                      onChange={(value) => handleFieldChange(field.id, value)}
                    />
                  ))}
                </div>
              }
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
