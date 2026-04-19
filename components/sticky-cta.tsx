import { siteConfig } from "@/lib/site";
import { TrackedExternalLink } from "@/components/tracking/tracked-external-link";
import { TrackedLink } from "@/components/tracking/tracked-link";

export function StickyCta() {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-50 px-4">
      <div className="pointer-events-auto mx-auto flex max-w-5xl flex-col gap-3 rounded-2xl border border-white/10 bg-slate-950 px-5 py-4 shadow-2xl shadow-slate-950/30 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-white">
            Need help building, improving, or supporting a digital product?
          </p>
          <p className="text-sm text-slate-300">
            Book a strategy call or send your website, app, game, or consulting scope.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <TrackedLink
            eventName="contact_cta_click"
            eventParams={{ cta_location: "sticky_bar", cta_type: "contact" }}
            href="/contact"
            className="inline-flex items-center justify-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
          >
            Start Project
          </TrackedLink>
          <TrackedExternalLink
            eventName="whatsapp_click"
            eventParams={{ cta_location: "sticky_bar", cta_type: "whatsapp" }}
            href={siteConfig.whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/5"
          >
            WhatsApp
          </TrackedExternalLink>
          <TrackedLink
            eventName="booking_cta_click"
            eventParams={{ cta_location: "sticky_bar", cta_type: "booking" }}
            href={siteConfig.bookingPagePath}
            className="inline-flex items-center justify-center rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/5"
          >
            Book a Strategy Call
          </TrackedLink>
        </div>
      </div>
    </div>
  );
}
