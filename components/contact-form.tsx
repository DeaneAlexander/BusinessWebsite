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
  "Web Development": ["$300-$800", "$800-$2,000", "$2,000+"],
  "App Development": ["$1,500-$3,000", "$3,000-$5,000", "$5,000+"],
  "Game Development": ["$1,000-$2,000", "$2,000-$3,500", "$3,500+"],
  "Software Support": ["$200-$800 / mo", "$800-$1,500 / mo", "$1,500-$2,500 / mo", "$2,500+ / mo"],
  "Technical Consulting": ["$300-$800", "$800-$1,500", "$1,500+"],
};

const budgetGuidanceByService: Record<(typeof serviceOptions)[number], string> = {
  "Web Development": "Covers landing page refreshes up to multi-page business websites.",
  "App Development": "Fits MVP modules, internal features, and custom dashboard work.",
  "Game Development": "Fits smaller Unreal game development and interactive build scopes.",
  "Software Support": "Monthly support pricing is shown as a retainer range.",
  "Technical Consulting": "Best for discovery, architecture planning, and scoped technical guidance.",
};

const timelineOptionsByService: Record<(typeof serviceOptions)[number], string[]> = {
  "Web Development": ["Within 1 month", "1-2 months", "2-3 months"],
  "App Development": ["1-2 months", "2-3 months", "3-6 months"],
  "Game Development": ["3-6 months", "6-12 months", "1-2 years"],
  "Software Support": ["This month", "1-2 months", "Ongoing support"],
  "Technical Consulting": ["Within 1 month", "1-2 months", "2-3 months"],
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
