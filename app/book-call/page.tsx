import type { Metadata } from "next";

import { CalendlyEmbed } from "@/components/calendly-embed";
import { TrackedExternalLink } from "@/components/tracking/tracked-external-link";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book a Call",
  description:
    "Book a strategy call with ALX Digital Incorporated to discuss your website, app, or consulting project.",
};

export default function BookCallPage() {
  return (
    <div className="container-shell py-20">
      <section className="mb-10 rounded-[2rem] bg-slate-950 px-8 py-10 text-white">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">
          Book a Call
        </p>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
          Reserve a strategy call and let&rsquo;s map the next best move for your business.
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">
          Use the scheduler below to book time with ALX Digital. If you prefer, you can also reach
          out on WhatsApp before booking.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <TrackedExternalLink
            eventName="whatsapp_click"
            eventParams={{ cta_location: "book_call_hero", cta_type: "whatsapp" }}
            href={siteConfig.whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/5"
          >
            Message on WhatsApp
          </TrackedExternalLink>
        </div>
      </section>

      <CalendlyEmbed />
    </div>
  );
}
