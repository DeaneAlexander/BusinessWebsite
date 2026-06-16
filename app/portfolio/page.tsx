import type { Metadata } from "next";

import { TrackedLink } from "@/components/tracking/tracked-link";
import { founderCredentials } from "@/lib/site";

export const metadata: Metadata = {
  title: "Credentials",
  description:
    "Review ALX Digital's academic credentials, technical background, and formal qualifications.",
  openGraph: {
    title: "Credentials | ALX Digital Incorporated",
    description:
      "Review ALX Digital's academic credentials, technical background, and formal qualifications.",
    url: "https://www.alxdigiinc.com/portfolio",
  },
  twitter: {
    title: "Credentials | ALX Digital Incorporated",
    description:
      "Review ALX Digital's academic credentials, technical background, and formal qualifications.",
  },
};

export default function PortfolioPage() {
  return (
    <div className="container-shell py-16 sm:py-20">
      <section className="space-y-6">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-700">
          Credentials
        </p>
        <h1 className="max-w-3xl text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
          Formal academic background and professional qualifications.
        </h1>
        <p className="max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
          ALX Digital presents verifiable education credentials and academic distinction in place of
          fictional project examples or placeholder case studies.
        </p>
        <p className="max-w-3xl text-sm leading-7 text-slate-500">
          This page is intentionally structured as a professional background summary so prospective
          clients can review real qualifications, training, and academic achievements with clarity.
        </p>
      </section>

      <section className="mt-12 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
        <div className="max-w-4xl space-y-5">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-700">
            Education & Technical Background
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            Credentials presented in a straightforward, professional format.
          </h2>
          <p className="text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
            The following qualifications reflect formal education in computer science and
            documented academic performance. They serve as part of the trust foundation behind ALX
            Digital&apos;s work in websites, application delivery, and technical consulting.
          </p>
        </div>

        <dl className="mt-10 divide-y divide-slate-200 border-y border-slate-200">
          {founderCredentials.map((credential) => (
            <div
              key={credential.title}
              className="grid gap-3 py-6 md:grid-cols-[minmax(220px,0.7fr)_minmax(220px,0.9fr)_1fr] md:gap-6"
            >
              <dt className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-700">
                {credential.title}
              </dt>
              <dd className="text-lg font-semibold text-slate-950">{credential.detail}</dd>
              <dd className="text-sm leading-7 text-slate-600">{credential.note}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-8 max-w-4xl space-y-4 text-sm leading-7 text-slate-600">
          <p>
            Public client references and released case studies can be added separately as they
            become available for publication.
          </p>
          <p>
            Until then, this section keeps the presentation grounded in verified qualifications
            rather than illustrative or fictional portfolio entries.
          </p>
        </div>
      </section>

      <section className="mt-12 rounded-[2rem] bg-slate-950 px-5 py-8 text-white sm:px-8 sm:py-10">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">
              Discuss your project
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              If you need a capable technical partner, let&apos;s discuss your goals and scope.
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
