import { TrackedExternalLink } from "@/components/tracking/tracked-external-link";
import { siteConfig } from "@/lib/site";

function getCalendlyEmbedUrl(url: string) {
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}hide_gdpr_banner=1`;
}

export function CalendlyEmbed() {
  return (
    <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-6 py-5">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-700">
          Strategy Call
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
          Book a Strategy Call with ALX Digital
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
          Choose a time that works for you using the scheduler below.
        </p>
      </div>

      <div className="bg-slate-100/80 p-4 sm:p-6">
        <div className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-inner">
          <iframe
            title="Book a strategy call with ALX Digital"
            src={getCalendlyEmbedUrl(siteConfig.bookingUrl)}
            className="min-h-[760px] w-full border-0"
          />
        </div>
      </div>

      <div className="border-t border-slate-200 px-6 py-4">
        <p className="text-sm leading-7 text-slate-600">
          If you still see an unavailable calendar, it usually means the event is unpublished or no
          availability is set inside Calendly.
        </p>
      </div>
    </div>
  );
}
