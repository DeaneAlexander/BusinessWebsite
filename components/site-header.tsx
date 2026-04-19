import Image from "next/image";
import Link from "next/link";

import { TrackedLink } from "@/components/tracking/tracked-link";
import { navigation, siteConfig } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center px-6 py-4 lg:px-8">
        <Link
          href="/"
          className="relative block h-14 w-[170px] overflow-hidden"
          aria-label={siteConfig.name}
        >
          <Image
            src="/alx_digital_incorporated_logo_e844c186.png"
            alt={siteConfig.name}
            fill
            priority
            className="object-contain object-center scale-[1.85]"
          />
        </Link>

        <nav className="hidden items-center gap-7 whitespace-nowrap md:ml-14 md:flex lg:ml-20 lg:pr-10">
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

        <div className="ml-auto flex items-center gap-4 lg:pl-4">
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
            className="inline-flex rounded-full bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
          >
            Book with ALX Digital
          </TrackedLink>
        </div>
      </div>
    </header>
  );
}
