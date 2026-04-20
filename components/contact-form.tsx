"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

import { trackEvent } from "@/components/tracking/events";
import { siteConfig } from "@/lib/site";

type ContactFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  website: string;
  service: string;
  budget: string;
  timeline: string;
  startDate: string;
  goals: string;
  source: string;
  consent: boolean;
};

type Web3FormsResponse = {
  success?: boolean;
  message?: string;
  body?: {
    message?: string;
  };
};

const serviceOptions = [
  "Web Development",
  "App Development",
  "Game Development",
  "Software Support",
  "Technical Consulting",
] as const;

const budgetOptionsByService: Record<(typeof serviceOptions)[number], string[]> = {
  "Web Development": [
    "Starter project - $1,800 / EC$4,860",
    "Standard project - $4,500 / EC$12,150",
    "Premium project - $9,500+ / EC$25,650+",
    "Basic maintenance - $150/mo / EC$405",
    "Standard maintenance - $350/mo / EC$945",
    "Premium maintenance - $650/mo / EC$1,755",
  ],
  "App Development": [
    "Starter MVP - $3,500 / EC$9,450",
    "Standard app - $8,000 / EC$21,600",
    "Premium app - $18,000+ / EC$48,600+",
    "Basic app support - $300/mo / EC$810",
    "Standard app support - $600/mo / EC$1,620",
    "Premium app support - $1,100/mo / EC$2,970",
  ],
  "Game Development": [
    "Prototype - $3,000 / EC$8,100",
    "Demo build - $8,500 / EC$22,950",
    "Full scope - $20,000+ / EC$54,000+",
    "Sprint retainer - $1,200/mo / EC$3,240",
    "Studio retainer - $2,500/mo / EC$6,750",
    "Full production - $4,500/mo / EC$12,150",
  ],
  "Software Support": [
    "Essential support - $200/mo / EC$540",
    "Business support - $450/mo / EC$1,215",
    "Enterprise support - $900/mo / EC$2,430",
  ],
  "Technical Consulting": [
    "Session - $175/hr / EC$472.50",
    "Audit - $950 / EC$2,565",
    "Strategy Sprint - $2,500 / EC$6,750",
    "Starter advisory - $400/mo / EC$1,080",
    "Growth advisory - $900/mo / EC$2,430",
    "Partner advisory - $1,800/mo / EC$4,860",
  ],
};

const budgetGuidanceByService: Record<(typeof serviceOptions)[number], string> = {
  "Web Development":
    "Fixed-price web projects start at $1,800, with optional monthly maintenance retainers from $150/mo.",
  "App Development":
    "App projects range from focused MVPs to full product builds, with support retainers available after launch.",
  "Game Development":
    "Unity game work covers prototypes, demo builds, and larger production scopes, plus monthly sprint retainers.",
  "Software Support":
    "Software Support is retainer-only and designed for existing systems that need fixes, monitoring, and priority response.",
  "Technical Consulting":
    "Choose ad hoc consulting, a fixed audit or strategy sprint, or an ongoing advisory retainer.",
};

const timelineOptionsByService: Record<(typeof serviceOptions)[number], string[]> = {
  "Web Development": ["Within 1 month", "1-2 months", "2-4 months", "Post-launch support only"],
  "App Development": ["Within 1 month", "2-3 months", "3-6 months", "Ongoing support only"],
  "Game Development": ["1-2 months", "3-6 months", "6-12 months", "Ongoing production support"],
  "Software Support": ["This month", "Next month", "Quarterly support plan", "Ongoing support"],
  "Technical Consulting": ["This week", "Within 1 month", "1-2 months", "Ongoing advisory"],
};

export function ContactForm() {
  const [serverMessage, setServerMessage] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const web3FormsAccessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    defaultValues: {
      service: serviceOptions[0],
      budget: budgetOptionsByService["Web Development"][0],
      timeline: timelineOptionsByService["Web Development"][0],
      startDate: "",
      source: "Google search",
      consent: false,
    },
  });

  const selectedService = watch("service");
  const budgetOptions = useMemo(
    () => budgetOptionsByService[(selectedService as (typeof serviceOptions)[number]) ?? "Web Development"],
    [selectedService],
  );
  const timelineOptions = useMemo(
    () => timelineOptionsByService[(selectedService as (typeof serviceOptions)[number]) ?? "Web Development"],
    [selectedService],
  );

  useEffect(() => {
    setValue("budget", budgetOptions[0], { shouldDirty: true });
    setValue("timeline", timelineOptions[0], { shouldDirty: true });
  }, [budgetOptions, setValue, timelineOptions]);

  const onSubmit = handleSubmit(async (values) => {
    setServerMessage(null);
    setServerError(null);

    if (!web3FormsAccessKey) {
      setServerError(
        "Contact form is not configured yet. Add NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY to enable email delivery.",
      );
      return;
    }

    const submission = {
      access_key: web3FormsAccessKey,
      subject: `New project brief from ${siteConfig.name}`,
      from_name: siteConfig.name,
      replyto: values.email,
      botcheck: "",
      name: `${values.firstName} ${values.lastName}`,
      email: values.email,
      phone: values.phone,
      company: values.company,
      website: values.website,
      service: values.service,
      budget: values.budget,
      timeline: values.timeline,
      startDate: values.startDate,
      goals: values.goals,
      source: values.source,
      consent: values.consent ? "Yes" : "No",
      pageUrl: window.location.href,
      pagePath: window.location.pathname,
    };

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(submission),
    });

    const payload = (await response.json()) as Web3FormsResponse;
    const responseMessage = payload.message ?? payload.body?.message;

    if (!response.ok || !payload.success) {
      setServerError(responseMessage ?? "Something went wrong. Please try again.");
      return;
    }

    trackEvent("contact_form_submit", {
      form_location: "contact_page",
      service_interest: values.service,
      budget_range: values.budget,
    });
    trackEvent("generate_lead", {
      form_location: "contact_page",
      service_interest: values.service,
    });

    setServerMessage(responseMessage ?? "Thanks. We will be in touch shortly.");
    reset();
  });

  return (
    <form onSubmit={onSubmit} className="grid gap-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/60">
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="First name" error={errors.firstName?.message}>
          <input
            {...register("firstName", { required: "First name is required." })}
            className={inputClasses}
            placeholder="Jordan"
          />
        </Field>
        <Field label="Last name" error={errors.lastName?.message}>
          <input
            {...register("lastName", { required: "Last name is required." })}
            className={inputClasses}
            placeholder="Lee"
          />
        </Field>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Work email" error={errors.email?.message}>
          <input
            {...register("email", {
              required: "Email is required.",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Enter a valid email address.",
              },
            })}
            type="email"
            className={inputClasses}
            placeholder="jordan@company.com"
          />
        </Field>
        <Field label="Phone" error={errors.phone?.message}>
          <input
            {...register("phone", { required: "Phone number is required." })}
            className={inputClasses}
            placeholder="(555) 123-4567"
          />
        </Field>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Company" error={errors.company?.message}>
          <input
            {...register("company", { required: "Company name is required." })}
            className={inputClasses}
            placeholder="Acme Services"
          />
        </Field>
        <Field label="Website">
          <input {...register("website")} className={inputClasses} placeholder="https://example.com" />
        </Field>
      </div>

      <div className="grid gap-3">
        <div className="grid gap-5 md:grid-cols-[1.35fr_1fr_1fr]">
          <Field label="Service interest">
            <select {...register("service")} className={`${inputClasses} truncate`}>
              {serviceOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Budget range">
            <select {...register("budget")} className={`${inputClasses} truncate`}>
              {budgetOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Project timeline">
            <select {...register("timeline")} className={`${inputClasses} truncate`}>
              {timelineOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </Field>
        </div>
        <p className="text-sm text-slate-500">
          {
            budgetGuidanceByService[
              (selectedService as (typeof serviceOptions)[number]) ?? "Web Development"
            ]
          }
        </p>
        <p className="text-xs leading-6 text-slate-500">
          Fixed projects start with a 50% deposit. Retainers are billed monthly in advance. Change
          requests outside the agreed scope are quoted separately at $175/hr.
        </p>
        <div className="grid gap-5 md:max-w-sm">
          <Field label="Preferred start date">
            <input {...register("startDate")} type="date" className={inputClasses} />
          </Field>
        </div>
      </div>

      <Field label="Primary goals" error={errors.goals?.message}>
        <textarea
          {...register("goals", { required: "A short project summary helps us prepare." })}
          className={`${inputClasses} min-h-32`}
          placeholder="Tell us what you sell, who you want to attract, and what needs to improve."
        />
      </Field>

      <Field label="How did you hear about us?">
        <select {...register("source")} className={inputClasses}>
          <option>Google search</option>
          <option>Referral</option>
          <option>LinkedIn</option>
          <option>Newsletter</option>
          <option>Podcast</option>
        </select>
      </Field>

      <label className="flex items-start gap-3 rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
        <input
          {...register("consent", { required: "Please confirm consent before submitting." })}
          type="checkbox"
          className="mt-1 h-4 w-4 rounded border-slate-300 text-cyan-500 focus:ring-cyan-500"
        />
        <span>
          I consent to being contacted about this project inquiry and understand my details may be
          stored in a CRM or sales workflow.
        </span>
      </label>
      {errors.consent?.message ? <p className="text-sm text-rose-600">{errors.consent.message}</p> : null}

      <div className="flex flex-col gap-3 border-t border-slate-200 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Sending..." : "Send Project Brief"}
        </button>
        {serverMessage ? <p className="text-sm text-emerald-600">{serverMessage}</p> : null}
        {serverError ? <p className="text-sm text-rose-600">{serverError}</p> : null}
      </div>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="grid gap-2 text-sm font-medium text-slate-900">
      <span>{label}</span>
      {children}
      {error ? <span className="text-sm font-normal text-rose-600">{error}</span> : null}
    </label>
  );
}

const inputClasses =
  "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100";
