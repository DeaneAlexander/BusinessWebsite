import type { Metadata } from "next";

import { TrackedLink } from "@/components/tracking/tracked-link";
import { portfolioItems } from "@/lib/site";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Review recent conversion-focused website and lead generation work for service businesses across home services, legal, and healthcare.",
};

export default function PortfolioPage() {
  return (
    <div className="container-shell py-20">
      <section className="space-y-6">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-700">Portfolio</p>
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
          Recent launches built to improve lead quality, trust, and booking intent.
        </h1>
        <p className="max-w-2xl text-lg leading-8 text-slate-600">
          Each engagement balances strategic messaging, conversion design, and practical CRM
          alignment so the site performs after launch.
        </p>
      </section>

      <section className="mt-12 grid gap-6">
        {portfolioItems.map((item, index) => (
          <article
            key={item.name}
            className="grid gap-8 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm lg:grid-cols-[0.75fr_1.25fr]"
          >
            <div className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                Project 0{index + 1}
              </p>
              <h2 className="text-3xl font-semibold tracking-tight text-slate-950">{item.name}</h2>
              <p className="text-sm font-medium text-cyan-700">{item.category}</p>
            </div>
            <div className="space-y-4">
              <p className="text-lg font-semibold text-slate-950">{item.result}</p>
              <p className="text-sm leading-8 text-slate-600">{item.description}</p>
              <p className="text-sm leading-7 text-slate-500">
                Deliverables included offer strategy, proof hierarchy, page architecture, and
                stronger handoff into intake and follow-up workflows.
              </p>
            </div>
          </article>
        ))}
      </section>

      <section className="mt-12 rounded-[2rem] bg-slate-950 px-8 py-10 text-white">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">Want similar results?</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Let&rsquo;s map the highest-leverage pages and CTA paths for your business.
            </h2>
          </div>
          <TrackedLink
            eventName="contact_cta_click"
            eventParams={{ cta_location: "portfolio_bottom_cta", cta_type: "contact" }}
            href="/contact"
            className="inline-flex items-center justify-center rounded-full bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
          >
            Request Proposal
          </TrackedLink>
        </div>
      </section>
    </div>
  );
}
