import type { Metadata } from "next";

import { ContactForm } from "@/components/contact-form";
import { TrackedExternalLink } from "@/components/tracking/tracked-external-link";
import { TrackedLink } from "@/components/tracking/tracked-link";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Request a proposal, share your goals, or book a strategy call for a conversion-focused Next.js website project.",
};

const prepList = [
  "Current website URL and core services",
  "Target locations or audience segments",
  "Monthly lead volume or traffic goals",
  "Project timeline, preferred start date, budget, and launch constraints",
];

export default function ContactPage() {
  return (
    <div className="container-shell py-20">
      <section className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="space-y-6">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-700">Contact</p>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            Tell us what you need and we&rsquo;ll map the fastest path to a better-performing site.
          </h1>
          <p className="text-lg leading-8 text-slate-600">
            The form captures the lead details a CRM or sales process actually needs, so we can
            respond with a scoped recommendation instead of generic follow-up.
          </p>
          <div className="rounded-[2rem] bg-slate-950 p-8 text-white">
            <p className="text-lg font-semibold">Prefer to book first?</p>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              Use the embedded scheduler below or open the full booking page if you want a dedicated
              booking experience before submitting the form.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <TrackedLink
                eventName="booking_cta_click"
                eventParams={{ cta_location: "contact_page", cta_type: "booking" }}
                href={siteConfig.bookingPagePath}
                className="inline-flex rounded-full bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
              >
                Open Full Booking Page
              </TrackedLink>
              <TrackedExternalLink
                eventName="whatsapp_click"
                eventParams={{ cta_location: "contact_page", cta_type: "whatsapp" }}
                href={siteConfig.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/5"
              >
                Message on WhatsApp
              </TrackedExternalLink>
            </div>
          </div>
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8">
            <p className="text-lg font-semibold text-slate-950">Helpful details to include</p>
            <ul className="mt-5 grid gap-3">
              {prepList.map((item) => (
                <li key={item} className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <ContactForm />
      </section>
    </div>
  );
}
