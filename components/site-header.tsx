"use client";

import { useState } from "react";

import Image from "next/image";
import Link from "next/link";

import { TrackedExternalLink } from "@/components/tracking/tracked-external-link";
import { TrackedLink } from "@/components/tracking/tracked-link";
import { navigation, siteConfig } from "@/lib/site";

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="relative sticky top-0 z-40 border-b border-white/10 bg-slate-950/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center gap-3 px-4 py-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="relative block h-12 w-[132px] shrink-0 overflow-hidden sm:h-14 sm:w-[170px]"
          aria-label={siteConfig.name}
        >
          <Image
            src="/Logo%20Fixed.jpg"
            alt={siteConfig.name}
            fill
            priority
            className="object-contain object-center scale-[1.85]"
          />
        </Link>

        <nav className="hidden items-center gap-7 whitespace-nowrap lg:ml-20 lg:flex lg:pr-10">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-slate-300 transition hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 sm:gap-4 lg:pl-4">
          <div className="static lg:hidden">
            <button
              type="button"
              onClick={() => setIsMenuOpen((current) => !current)}
              aria-expanded={isMenuOpen}
              aria-label="Toggle navigation menu"
              className="inline-flex list-none items-center justify-center rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-white transition hover:border-white/30 hover:bg-white/5"
            >
              Menu
            </button>
            {isMenuOpen ? (
              <div className="absolute inset-x-4 top-[calc(100%+0.75rem)] z-50 rounded-[1.75rem] border border-white/10 bg-slate-950 p-4 shadow-2xl shadow-slate-950/40 sm:inset-x-6">
              <nav className="grid gap-2">
                {navigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="rounded-2xl border border-white/10 px-4 py-3 text-sm font-medium text-slate-200 transition hover:border-white/20 hover:bg-white/5 hover:text-white"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              <div className="mt-4 grid gap-3 border-t border-white/10 pt-4 sm:grid-cols-2">
                <TrackedLink
                  eventName="contact_cta_click"
                  eventParams={{ cta_location: "mobile_menu", cta_type: "contact" }}
                  href="/contact"
                  onClick={() => setIsMenuOpen(false)}
                  className="inline-flex items-center justify-center rounded-full bg-white px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
                >
                  Get Proposal
                </TrackedLink>
                <TrackedExternalLink
                  eventName="whatsapp_click"
                  eventParams={{ cta_location: "mobile_menu", cta_type: "whatsapp" }}
                  href={siteConfig.whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setIsMenuOpen(false)}
                  className="inline-flex items-center justify-center rounded-full border border-white/15 px-4 py-3 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/5"
                >
                  WhatsApp
                </TrackedExternalLink>
              </div>
              </div>
            ) : null}
          </div>
          <TrackedLink
            eventName="contact_cta_click"
            eventParams={{ cta_location: "header", cta_type: "contact" }}
            href="/contact"
            className="hidden rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-white transition hover:border-white/30 hover:bg-white/5 sm:inline-flex"
          >
            Get Proposal
          </TrackedLink>
          <TrackedLink
            eventName="booking_cta_click"
            eventParams={{ cta_location: "header", cta_type: "booking" }}
            href={siteConfig.bookingPagePath}
            className="inline-flex rounded-full bg-cyan-400 px-3 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 sm:px-4"
          >
            <span className="sm:hidden">Book Call</span>
            <span className="hidden sm:inline">Book with ALX Digital</span>
          </TrackedLink>
        </div>
      </div>
    </header>
  );
}
