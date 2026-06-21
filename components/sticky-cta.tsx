"use client";

import { useState } from "react";

import { siteConfig } from "@/lib/site";
import { TrackedExternalLink } from "@/components/tracking/tracked-external-link";
import { TrackedLink } from "@/components/tracking/tracked-link";

export function StickyCta() {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) {
    return (
      <div className="pointer-events-none fixed inset-x-0 bottom-4 z-50 px-4">
        <div className="mx-auto flex max-w-5xl justify-end">
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="pointer-events-auto inline-flex items-center justify-center rounded-full border border-white/10 bg-slate-950 px-4 py-3 text-sm font-semibold text-white shadow-2xl shadow-slate-950/30 transition hover:border-white/20 hover:bg-slate-900"
          >
            Need help?
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-50 px-4">
      <div className="pointer-events-auto mx-auto flex max-w-5xl flex-col gap-3 rounded-2xl border border-white/10 bg-slate-950 px-4 py-4 shadow-2xl shadow-slate-950/30 sm:flex-row sm:items-center sm:justify-between sm:px-5">
        <div>
          <p className="text-sm font-semibold text-white">
            Need help with a website, app, support issue, or technical scope?
          </p>
          <p className="text-sm text-slate-300">
            On phone, WhatsApp is usually the fastest way to start. You can also send a brief or
            book a call.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <TrackedExternalLink
            eventName="whatsapp_click"
            eventParams={{ cta_location: "sticky_bar", cta_type: "whatsapp" }}
            href={siteConfig.whatsappUrl}
            target="_blank"
            rel="noreferrer"
            onClick={() => setIsOpen(false)}
            className="inline-flex w-full items-center justify-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-slate-100 sm:w-auto"
          >
            WhatsApp
          </TrackedExternalLink>
          <TrackedLink
            eventName="contact_cta_click"
            eventParams={{ cta_location: "sticky_bar", cta_type: "contact" }}
            href="/contact"
            onClick={() => setIsOpen(false)}
            className="inline-flex w-full items-center justify-center rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/5 sm:w-auto"
          >
            Send Brief
          </TrackedLink>
          <TrackedLink
            eventName="booking_cta_click"
            eventParams={{ cta_location: "sticky_bar", cta_type: "booking" }}
            href={siteConfig.bookingPagePath}
            onClick={() => setIsOpen(false)}
            className="inline-flex w-full items-center justify-center rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/5 sm:w-auto"
          >
            Book Call
          </TrackedLink>
        </div>
      </div>
    </div>
  );
}
