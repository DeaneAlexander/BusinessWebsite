import type { Metadata } from "next";

import { TrackedLink } from "@/components/tracking/tracked-link";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "ALX Digital's portfolio page is currently under construction.",
  openGraph: {
    title: "Portfolio | ALX Digital Incorporated",
    description:
      "ALX Digital's portfolio page is currently under construction.",
    url: "https://www.alxdigiinc.com/portfolio",
  },
  twitter: {
    title: "Portfolio | ALX Digital Incorporated",
    description:
      "ALX Digital's portfolio page is currently under construction.",
  },
};

export default function PortfolioPage() {
  return (
    <div className="container-shell py-16 sm:py-20">
      <section className="space-y-6">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-700">Portfolio</p>
        <h1 className="max-w-3xl text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
          Portfolio page under construction.
        </h1>
        <p className="max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
          A public portfolio is being prepared and will be added here once project material is ready
          for release.
        </p>
        <p className="max-w-3xl text-sm leading-7 text-slate-500">
          Until then, you can review qualifications or get in touch directly to discuss relevant
          experience, scope, and fit.
        </p>
      </section>

      <section className="mt-12 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
        <div className="max-w-4xl space-y-5">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-700">
            Coming Soon
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            Selected work examples will be published here.
          </h2>
          <p className="text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
            This section is reserved for released project examples, case material, and supporting
            context once publication-ready assets are available.
          </p>
        </div>

        <div className="mt-8 rounded-[1.5rem] bg-slate-50 p-6">
          <p className="text-sm leading-7 text-slate-600">
            If you want to discuss previous work, service fit, or project requirements before the
            portfolio goes live, use the links below.
          </p>
        </div>
      </section>

      <section className="mt-12 rounded-[2rem] bg-slate-950 px-5 py-8 text-white sm:px-8 sm:py-10">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">
              In the meantime
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Review qualifications or get in touch to discuss your project directly.
            </h2>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <TrackedLink
              eventName="qualifications_cta_click"
              eventParams={{ cta_location: "portfolio_bottom_cta", cta_type: "qualifications" }}
              href="/qualifications"
              className="inline-flex items-center justify-center rounded-full bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
            >
              View Qualifications
            </TrackedLink>
            <TrackedLink
              eventName="contact_cta_click"
              eventParams={{ cta_location: "portfolio_bottom_cta", cta_type: "contact" }}
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/5"
            >
              Request Proposal
            </TrackedLink>
          </div>
        </div>
      </section>
    </div>
  );
}
