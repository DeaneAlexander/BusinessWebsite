import type { Metadata } from "next";

import { TrackedLink } from "@/components/tracking/tracked-link";
import { services, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore web development, app development, Unreal Engine game development, software support, and technical consulting services.",
};

const deliverySteps = [
  "Discovery and scope planning",
  "UX, architecture, and technical direction",
  "Build, development, or implementation sprint",
  "Launch support, optimization, and next-step roadmap",
];

type PricingTier = {
  tier: string;
  badge?: string;
  price: string;
  ec: string;
  details: string;
};

type PricingGroup = {
  service: string;
  fixedLabel: string;
  fixed: PricingTier[];
  retainerLabel: string;
  retainer: PricingTier[];
};

const pricing: PricingGroup[] = [
  {
    service: "Web Development",
    fixedLabel: "Fixed project (startup MVP to growth-ready site)",
    fixed: [
      { tier: "Starter", price: "$800-$1,500", ec: "EC$2,160-EC$4,050", details: "1-3 page MVP site, lead capture, mobile responsive, launch-ready in 7 days" },
      { tier: "Standard", badge: "★", price: "$2,500-$5,000", ec: "EC$6,750-EC$13,500", details: "8-12 page growth site, basic SEO, CMS, blog or updates section, 2 revisions" },
      { tier: "Premium", price: "$7,000+", ec: "EC$18,900+", details: "Custom product-facing build with advanced UX, integrations, auth or dashboard planning" },
    ],
    retainerLabel: "Maintenance retainer (post-launch support)",
    retainer: [
      { tier: "Basic", price: "$150/mo", ec: "EC$405", details: "Uptime monitoring, minor text/image updates" },
      { tier: "Standard", badge: "★", price: "$350/mo", ec: "EC$945", details: "Priority support, plugin/security updates, monthly report" },
      { tier: "Premium", price: "$650/mo", ec: "EC$1,755", details: "Dedicated support, feature additions, <24hr response" },
    ],
  },
  {
    service: "App Development",
    fixedLabel: "Fixed project (MVP to full product)",
    fixed: [
      { tier: "Starter", price: "$3,500", ec: "EC$9,450", details: "MVP: 3-5 screens, basic backend, one platform" },
      { tier: "Standard", badge: "★", price: "$8,000", ec: "EC$21,600", details: "Full app: auth, database, admin panel, iOS or Android" },
      { tier: "Premium", price: "$18,000+", ec: "EC$48,600+", details: "Cross-platform, third-party integrations, custom dashboard" },
    ],
    retainerLabel: "App support retainer (ongoing maintenance)",
    retainer: [
      { tier: "Basic", price: "$300/mo", ec: "EC$810", details: "Bug fixes, OS compatibility updates, monitoring" },
      { tier: "Standard", badge: "★", price: "$600/mo", ec: "EC$1,620", details: "Priority fixes, minor feature additions, monthly review" },
      { tier: "Premium", price: "$1,100/mo", ec: "EC$2,970", details: "Dedicated dev hours, roadmap execution, <24hr SLA" },
    ],
  },
  {
    service: "Game Development (Unreal Engine)",
    fixedLabel: "Fixed project (prototype to production)",
    fixed: [
      { tier: "Prototype", price: "$3,000", ec: "EC$8,100", details: "Core mechanic proof of concept, single scene" },
      { tier: "Demo Build", badge: "★", price: "$8,500", ec: "EC$22,950", details: "Playable level, UI, basic audio, investor-ready build" },
      { tier: "Full Scope", price: "$20,000+", ec: "EC$54,000+", details: "Multi-level, narrative, multiplayer or advanced systems" },
    ],
    retainerLabel: "Production retainer (ongoing dev sprints)",
    retainer: [
      { tier: "Sprint", price: "$1,200/mo", ec: "EC$3,240", details: "20 dev hours/month, milestone check-ins" },
      { tier: "Studio", badge: "★", price: "$2,500/mo", ec: "EC$6,750", details: "40 dev hours/month, design + build, bi-weekly demos" },
      { tier: "Full Production", price: "$4,500/mo", ec: "EC$12,150", details: "Dedicated full-time output, weekly delivery, IP included" },
    ],
  },
  {
    service: "Software Support",
    fixedLabel: "Retainer only (existing systems)",
    fixed: [],
    retainerLabel: "Support retainer",
    retainer: [
      { tier: "Essential", price: "$200/mo", ec: "EC$540", details: "Bug reports, <48hr response, 5 support hrs/month" },
      { tier: "Business", badge: "★", price: "$450/mo", ec: "EC$1,215", details: "Priority queue, 12 hrs/month, monthly health report" },
      { tier: "Enterprise", price: "$900/mo", ec: "EC$2,430", details: "Dedicated engineer, unlimited tickets, <4hr critical SLA" },
    ],
  },
  {
    service: "Technical Consulting",
    fixedLabel: "Fixed engagements (audits and strategy)",
    fixed: [
      { tier: "Session", price: "$175/hr", ec: "EC$472.50", details: "Ad hoc advisory, 1-2hr consultation blocks" },
      { tier: "Audit", badge: "★", price: "$950", ec: "EC$2,565", details: "Full digital audit: stack, UX, security, written report" },
      { tier: "Strategy Sprint", price: "$2,500", ec: "EC$6,750", details: "2-week deep engagement: roadmap, architecture, handoff doc" },
    ],
    retainerLabel: "Advisory retainer (ongoing guidance)",
    retainer: [
      { tier: "Starter", price: "$400/mo", ec: "EC$1,080", details: "4 hrs advisory, email Q&A, monthly check-in call" },
      { tier: "Growth", badge: "★", price: "$900/mo", ec: "EC$2,430", details: "10 hrs/month, roadmap stewardship, priority response" },
      { tier: "Partner", price: "$1,800/mo", ec: "EC$4,860", details: "Fractional CTO: unlimited advisory, board-level input" },
    ],
  },
] as const;

export default function ServicesPage() {
  return (
    <div className="container-shell py-20">
      <section className="grid gap-10 rounded-[2rem] bg-slate-950 px-8 py-12 text-white lg:grid-cols-[1fr_0.9fr]">
        <div className="space-y-6">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">Services</p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Web, app, Unreal Engine, support, and consulting services built around real business needs.
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-slate-300">
            ALX Digital helps businesses in Antigua and Barbuda and across the Caribbean plan,
            build, refine, and support digital products ranging from websites and portals to
            internal tools, Unreal Engine projects, and technical delivery plans.
          </p>
          <p className="max-w-2xl text-sm leading-7 text-slate-400">
            Especially relevant for tourism and hospitality operators, education teams, service
            businesses, and organizations that need practical support after launch.
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

      <section className="pb-4">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-700">Pricing</p>
              <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                Fixed projects + retainers
              </h2>
              <p className="max-w-3xl text-sm leading-7 text-slate-600">
                Fixed-price packages for project work, with monthly retainers available for ongoing
                support and advisory. Prices are in USD; EC$ equivalents are estimated at a 2.70
                rate.
              </p>
            </div>
            <TrackedLink
              eventName="contact_cta_click"
              eventParams={{ cta_location: "services_pricing_header", cta_type: "contact" }}
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Request a Proposal
            </TrackedLink>
          </div>

          <div className="mt-10 grid gap-8">
            {pricing.map((group) => (
              <div key={group.service} className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6">
                <h3 className="text-2xl font-semibold text-slate-950">{group.service}</h3>

                {group.fixed.length ? (
                  <div className="mt-6">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-600">
                      {group.fixedLabel}
                    </p>
                    <div className="mt-4 grid gap-4 lg:grid-cols-3">
                      {group.fixed.map((item) => (
                        <article
                          key={`${group.service}-fixed-${item.tier}`}
                          className={`rounded-2xl p-5 shadow-sm transition ${
                            group.service === "Web Development" && item.tier === "Standard"
                              ? "border-2 border-cyan-400 bg-cyan-50 shadow-cyan-100"
                              : "bg-white"
                          }`}
                        >
                          {group.service === "Web Development" && item.tier === "Standard" ? (
                            <span className="mb-3 inline-flex rounded-full bg-cyan-500 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-950">
                              Most Popular
                            </span>
                          ) : null}
                          <div className="flex items-start justify-between gap-3">
                            <p className="text-lg font-semibold text-slate-950">
                              {item.tier} {item.badge ? <span className="text-cyan-700">{item.badge}</span> : null}
                            </p>
                            <p className="text-right text-sm font-semibold text-slate-950">
                              {item.price}
                              <span className="block text-xs font-medium text-slate-500">{item.ec}</span>
                            </p>
                          </div>
                          <p className="mt-3 text-sm leading-7 text-slate-600">{item.details}</p>
                        </article>
                      ))}
                    </div>
                  </div>
                ) : null}

                <div className={group.fixed.length ? "mt-8" : "mt-6"}>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-600">
                    {group.retainerLabel}
                  </p>
                  <div className="mt-4 grid gap-4 lg:grid-cols-3">
                    {group.retainer.map((item) => (
                      <article key={`${group.service}-retainer-${item.tier}`} className="rounded-2xl bg-white p-5 shadow-sm">
                        <div className="flex items-start justify-between gap-3">
                          <p className="text-lg font-semibold text-slate-950">
                            {item.tier} {item.badge ? <span className="text-cyan-700">{item.badge}</span> : null}
                          </p>
                          <p className="text-right text-sm font-semibold text-slate-950">
                            {item.price}
                            <span className="block text-xs font-medium text-slate-500">{item.ec}</span>
                          </p>
                        </div>
                        <p className="mt-3 text-sm leading-7 text-slate-600">{item.details}</p>
                      </article>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 grid gap-4 rounded-[1.5rem] bg-slate-950 p-6 text-white">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-200">Terms</p>
            <div className="grid gap-3 text-sm text-slate-200 md:grid-cols-2">
              <p className="rounded-2xl bg-white/5 px-4 py-3">
                50% deposit required to begin fixed projects. Remaining balance due on delivery.
              </p>
              <p className="rounded-2xl bg-white/5 px-4 py-3">
                Retainers are billed monthly in advance. A 10% discount applies when adding a
                retainer at project sign-off.
              </p>
              <p className="rounded-2xl bg-white/5 px-4 py-3">
                Education-sector clients receive a 15% discount. Custom pricing is available for
                NGOs and multi-service engagements.
              </p>
              <p className="rounded-2xl bg-white/5 px-4 py-3">
                Out-of-scope features are quoted at $175/hr. Change requests under 30 minutes are
                absorbed, with a change log maintained throughout delivery.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
