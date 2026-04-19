import type { Metadata } from "next";

import { TrackedLink } from "@/components/tracking/tracked-link";
import { caseStudy, marketContext, marketKpis } from "@/lib/site";

export const metadata: Metadata = {
  title: "Case Study",
  description:
    "See how ALX Digital framed website and booking strategy around Antigua's market realities, trust signals, and qualified outreach goals.",
};

export default function CaseStudyPage() {
  return (
    <div className="container-shell py-20">
      <section className="rounded-[2rem] bg-white p-8 shadow-sm sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-700">Case Study</p>
        <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
          How {caseStudy.client} aligned its website and booking flow to fit an Antigua-sized market.
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
          Industry: {caseStudy.industry}. In Antigua, business is built on reputation, referrals,
          and making it easy for the right people to take action, so this engagement focused on
          clearer positioning, smoother booking, and a digital presence that felt credible from the
          first visit.
        </p>
      </section>

      <section className="mt-10 grid gap-6 lg:grid-cols-3">
        <article className="section-card rounded-[2rem] p-7 lg:col-span-1">
          <p className="text-lg font-semibold text-slate-950">The challenge</p>
          <p className="mt-4 text-sm leading-8 text-slate-600">{caseStudy.challenge}</p>
        </article>

        <article className="section-card rounded-[2rem] p-7 lg:col-span-1">
          <p className="text-lg font-semibold text-slate-950">The solution</p>
          <ul className="mt-4 grid gap-3 text-sm leading-7 text-slate-600">
            {caseStudy.solution.map((item) => (
              <li key={item} className="rounded-2xl bg-white px-4 py-3">
                {item}
              </li>
            ))}
          </ul>
        </article>

        <article className="rounded-[2rem] bg-slate-950 p-7 text-white lg:col-span-1">
          <p className="text-lg font-semibold">Outcomes</p>
          <ul className="mt-4 grid gap-3">
            {caseStudy.outcomes.map((item) => (
              <li key={item} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">
                {item}
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section className="mt-12 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
        <div className="max-w-5xl space-y-5">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-700">
            Informational Context
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            {marketContext.heading}
          </h2>
          <p className="text-lg leading-8 text-slate-700">{marketContext.summary}</p>
          <p className="text-sm italic text-slate-500">{marketContext.source}</p>
        </div>

        <div className="mt-8 overflow-hidden rounded-[1.5rem] border border-slate-800 bg-slate-950 shadow-xl shadow-slate-950/15">
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse text-left">
              <thead className="bg-slate-900 text-white">
                <tr>
                  <th className="border-b border-white/10 px-5 py-4 text-sm font-semibold text-cyan-300">KPI</th>
                  <th className="border-b border-white/10 px-5 py-4 text-sm font-semibold text-cyan-300">Target</th>
                  <th className="border-b border-white/10 px-5 py-4 text-sm font-semibold text-cyan-300">
                    Why It Matters Here
                  </th>
                  <th className="border-b border-white/10 px-5 py-4 text-sm font-semibold text-cyan-300">
                    Review Cadence
                  </th>
                </tr>
              </thead>
              <tbody className="bg-slate-950">
                {marketKpis.map((row, index) => (
                  <tr
                    key={row.metric}
                    className={
                      index < marketKpis.length - 1
                        ? "border-b border-white/10 even:bg-white/[0.03]"
                        : "even:bg-white/[0.03]"
                    }
                  >
                    <td className="px-5 py-5 align-top text-sm font-semibold text-white">
                      {row.metric}
                    </td>
                    <td className="px-5 py-5 align-top text-sm font-medium text-slate-950">
                      <span className="inline-flex rounded-full bg-cyan-300 px-3 py-1 font-semibold text-slate-950">
                        {row.target}
                      </span>
                    </td>
                    <td className="px-5 py-5 align-top text-sm leading-7 text-slate-300">
                      {row.rationale}
                    </td>
                    <td className="px-5 py-5 align-top text-sm text-slate-200">{row.cadence}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="mt-12 rounded-[2rem] bg-cyan-400 px-8 py-10 text-slate-950">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-700">Your next win</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Want a site that tells sales which leads are serious before the first call?
            </h2>
          </div>
          <TrackedLink
            eventName="contact_cta_click"
            eventParams={{ cta_location: "case_study_bottom_cta", cta_type: "contact" }}
            href="/contact"
            className="inline-flex items-center justify-center rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Talk About Your Project
          </TrackedLink>
        </div>
      </section>
    </div>
  );
}
