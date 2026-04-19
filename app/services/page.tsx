import type { Metadata } from "next";

import { TrackedLink } from "@/components/tracking/tracked-link";
import { services, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore web development, app development, game development, software support, and technical consulting services.",
};

const deliverySteps = [
  "Discovery and scope planning",
  "UX, architecture, and technical direction",
  "Build, development, or implementation sprint",
  "Launch support, optimization, and next-step roadmap",
];

export default function ServicesPage() {
  return (
    <div className="container-shell py-20">
      <section className="grid gap-10 rounded-[2rem] bg-slate-950 px-8 py-12 text-white lg:grid-cols-[1fr_0.9fr]">
        <div className="space-y-6">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">Services</p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Web, app, game, and support services built around real business needs.
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-slate-300">
            ALX Digital helps businesses plan, build, refine, and support digital products ranging
            from websites and portals to internal tools, game builds, and technical delivery plans.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <TrackedLink
              eventName="contact_cta_click"
              eventParams={{ cta_location: "services_hero", cta_type: "contact" }}
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
            >
              Request Proposal
            </TrackedLink>
            <TrackedLink
              eventName="booking_cta_click"
              eventParams={{ cta_location: "services_hero", cta_type: "booking" }}
              href={siteConfig.bookingPagePath}
              className="inline-flex items-center justify-center rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/5"
            >
              Book a Strategy Call
            </TrackedLink>
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8">
          <p className="text-lg font-semibold">Typical delivery workflow</p>
          <div className="mt-6 grid gap-4">
            {deliverySteps.map((step, index) => (
              <div key={step} className="rounded-3xl border border-white/10 bg-slate-900/60 p-5">
                <p className="text-sm font-semibold text-cyan-300">0{index + 1}</p>
                <p className="mt-2 font-medium text-white">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="grid gap-6 lg:grid-cols-2">
          {services.map((service) => (
            <article key={service.name} className="section-card rounded-[2rem] p-8">
              <p className="text-2xl font-semibold text-slate-950">{service.name}</p>
              <p className="mt-4 text-sm leading-8 text-slate-600">{service.summary}</p>
              <p className="mt-5 text-sm leading-7 text-slate-500">
                Designed for teams that need practical execution, clear technical thinking, and a
                partner who can move from planning into delivery without unnecessary overhead.
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
