import { TrackedExternalLink } from "@/components/tracking/tracked-external-link";
import { TrackedLink } from "@/components/tracking/tracked-link";
import {
  marketContext,
  marketKpis,
  portfolioItems,
  proofStats,
  services,
  siteConfig,
  testimonials,
} from "@/lib/site";

const sectorFocus = [
  {
    name: "Tourism and Hospitality",
    description:
      "Websites, booking journeys, guest-facing tools, and support systems for hotels, villas, tours, and service operators.",
  },
  {
    name: "Education",
    description:
      "Clearer digital experiences for schools, training providers, and education teams that need easier communication and stronger operations.",
  },
  {
    name: "Service Businesses",
    description:
      "Practical websites, lead capture, and internal workflows for SMEs that need to look credible and respond faster.",
  },
  {
    name: "Internal Product Teams",
    description:
      "App builds, Unreal Engine interactive work, and technical consulting for teams that need scoped execution without unnecessary overhead.",
  },
] as const;

export default function HomePage() {
  return (
    <div>
      <section className="hero-grid overflow-hidden bg-slate-950 text-white">
        <div className="container-shell grid gap-14 py-24 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:py-28">
          <div className="space-y-8">
            <div className="inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200">
              Digital products and support systems for Antigua and the wider Caribbean
            </div>
            <div className="space-y-6">
              <h1 className="max-w-3xl text-5xl font-semibold tracking-tight sm:text-6xl">
                Websites, apps, Unreal Engine builds, and support systems your team can actually use.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-300">
                {siteConfig.name} helps businesses in Antigua and Barbuda and across the Caribbean
                plan, build, and support digital products that improve customer journeys, daily
                operations, and long-term growth.
              </p>
              <p className="max-w-2xl text-base leading-7 text-slate-400">
                Especially relevant for tourism and hospitality operators, education teams, service
                businesses, and organizations that need a practical delivery partner instead of
                generic agency language.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <TrackedLink
                eventName="contact_cta_click"
                eventParams={{ cta_location: "home_hero", cta_type: "contact" }}
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
              >
                Get a Tailored Proposal
              </TrackedLink>
              <TrackedLink
                eventName="booking_cta_click"
                eventParams={{ cta_location: "home_hero", cta_type: "booking" }}
                href={siteConfig.bookingPagePath}
                className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/5"
              >
                Book a Strategy Call
              </TrackedLink>
              <TrackedExternalLink
                eventName="whatsapp_click"
                eventParams={{ cta_location: "home_hero", cta_type: "whatsapp" }}
                href={siteConfig.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/5"
              >
                WhatsApp Us
              </TrackedExternalLink>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {proofStats.map((stat) => (
                <div key={stat.label} className="rounded-3xl border border-white/10 bg-white/5 p-5">
                  <p className="text-2xl font-semibold text-white">{stat.value}</p>
                  <p className="mt-2 text-sm text-slate-300">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="section-card rounded-[2rem] p-8 text-slate-950 shadow-2xl shadow-cyan-950/20">
            <div className="space-y-8">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
                  Why teams hire us
                </p>
                <h2 className="mt-4 text-3xl font-semibold tracking-tight">
                  Clear technical thinking, stronger customer journeys, and systems staff can
                  actually use.
                </h2>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {services.map((service) => (
                  <div key={service.name} className="rounded-3xl border border-slate-200 p-5">
                    <p className="font-semibold">{service.name}</p>
                    <p className="mt-2 text-sm leading-7 text-slate-600">{service.summary}</p>
                  </div>
                ))}
              </div>
              <TrackedLink
                eventName="services_cta_click"
                eventParams={{ cta_location: "home_services_panel", cta_type: "services" }}
                href="/services"
                className="inline-flex items-center text-sm font-semibold text-slate-950 transition hover:text-cyan-700"
              >
                Explore services
              </TrackedLink>
            </div>
          </div>
        </div>
      </section>

      <section className="container-shell py-20">
        <div className="space-y-6">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-700">
              Sector focus
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Built for hospitality, education, and service operators that need local context and
              practical delivery.
            </h2>
            <p className="max-w-3xl text-sm leading-7 text-slate-600">
              ALX Digital is positioned for Caribbean businesses that need credible digital
              execution, not recycled templates. That includes tourism and hospitality brands,
              education organizations, SMEs, and teams that need support after launch.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {sectorFocus.map((sector) => (
              <article key={sector.name} className="section-card rounded-3xl p-6">
                <p className="text-lg font-semibold text-slate-950">{sector.name}</p>
                <p className="mt-3 text-sm leading-7 text-slate-600">{sector.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="container-shell py-20">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-700">
              Full service mix
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              From launch work to ongoing support, the offer now reflects the full ALX Digital
              service suite.
            </h2>
            <p className="text-sm leading-7 text-slate-600">
              Web development, app development, Unreal Engine game work, software support, and
              technical consulting are all visible here so cautious teams can enter at the level
              that fits their current need.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {services.map((service) => (
              <div key={service.name} className="section-card rounded-3xl p-6">
                <p className="text-lg font-semibold text-slate-950">{service.name}</p>
                <p className="mt-3 text-sm leading-7 text-slate-600">{service.summary}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-100 py-20">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-700">
              Caribbean context
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              {marketContext.heading}
            </h2>
            <p className="text-sm leading-7 text-slate-600">
              In Antigua, growth usually comes from being known, trusted, and easy to reach, not
              from chasing scale for its own sake. These KPIs reflect the kind of disciplined,
              relationship-driven business development that fits a Caribbean market.
            </p>
            <p className="text-sm italic text-slate-500">{marketContext.source}</p>
            <TrackedLink
              eventName="case_study_cta_click"
              eventParams={{ cta_location: "home_market_context", cta_type: "case_study" }}
              href="/case-study"
              className="inline-flex items-center text-sm font-semibold text-slate-950 transition hover:text-cyan-700"
            >
              Read the full case study
            </TrackedLink>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {marketKpis.slice(0, 4).map((row) => (
              <article
                key={row.metric}
                className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
                  {row.metric}
                </p>
                <p className="mt-3 inline-flex rounded-full bg-cyan-100 px-3 py-1 text-2xl font-semibold text-cyan-800">
                  {row.target}
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-600">{row.rationale}</p>
                <p className="mt-4 text-sm font-medium text-slate-950">{row.cadence} review</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container-shell space-y-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-700">Selected work</p>
              <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                Selected work across websites, apps, support systems, and interactive product
                builds.
              </h2>
            </div>
            <TrackedLink
              eventName="portfolio_cta_click"
              eventParams={{ cta_location: "home_portfolio_header", cta_type: "portfolio" }}
              href="/portfolio"
              className="text-sm font-semibold text-slate-950 transition hover:text-cyan-700"
            >
              View project examples
            </TrackedLink>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {portfolioItems.map((item) => (
              <article key={item.name} className="rounded-[2rem] border border-slate-200 p-6 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                  {item.category}
                </p>
                <h3 className="mt-4 text-2xl font-semibold text-slate-950">{item.name}</h3>
                <p className="mt-3 text-sm font-medium text-cyan-700">{item.result}</p>
                <p className="mt-4 text-sm leading-7 text-slate-600">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="container-shell py-20">
        <div className="grid gap-6 lg:grid-cols-2">
          {testimonials.map((testimonial) => (
            <blockquote key={testimonial.author} className="rounded-[2rem] bg-slate-950 p-8 text-white">
              <p className="text-xl leading-9 text-slate-100">&ldquo;{testimonial.quote}&rdquo;</p>
              <footer className="mt-6">
                <p className="font-semibold">{testimonial.author}</p>
                <p className="text-sm text-slate-300">{testimonial.role}</p>
              </footer>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="container-shell pb-8">
        <div className="rounded-[2rem] bg-cyan-400 px-8 py-10 text-slate-950">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-700">Next step</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                Ready for a digital partner that fits how your business actually operates?
              </h2>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <TrackedLink
                eventName="case_study_cta_click"
                eventParams={{ cta_location: "home_bottom_cta", cta_type: "case_study" }}
                href="/case-study"
                className="inline-flex items-center justify-center rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Read Case Study
              </TrackedLink>
              <TrackedLink
                eventName="contact_cta_click"
                eventParams={{ cta_location: "home_bottom_cta", cta_type: "contact" }}
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border border-slate-950/15 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-white/40"
              >
                Start Your Project
              </TrackedLink>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
