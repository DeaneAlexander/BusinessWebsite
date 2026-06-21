import Image from "next/image";
import Link from "next/link";

import { TrackedExternalLink } from "@/components/tracking/tracked-external-link";
import { navigation, siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.5fr_1fr_1fr] lg:px-8">
        <div className="space-y-4">
          <Link
            href="/"
            className="relative block h-24 w-full max-w-[220px] sm:h-28 sm:max-w-[260px]"
            aria-label={siteConfig.name}
          >
            <Image
              src="/Logo%20Fixed.jpg"
              alt={siteConfig.name}
              fill
              className="object-contain object-left"
            />
          </Link>
          <p className="max-w-xl text-sm leading-7 text-slate-600">
            Software development studio based in Antigua and Barbuda, building websites, Apps,
            Unreal Engine builds, and support systems for Caribbean businesses.
          </p>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-semibold text-slate-900">Navigation</p>
          <div className="flex flex-col gap-2">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-slate-600 transition hover:text-slate-950"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-semibold text-slate-900">Contact</p>
          <div className="flex flex-col gap-2 text-sm text-slate-600">
            <a href={`mailto:${siteConfig.email}`} className="break-all transition hover:text-slate-950">
              {siteConfig.email}
            </a>
            <a href={`tel:${siteConfig.phone}`} className="transition hover:text-slate-950">
              {siteConfig.phone}
            </a>
            <TrackedExternalLink
              eventName="whatsapp_click"
              eventParams={{ cta_location: "footer", cta_type: "whatsapp" }}
              href={siteConfig.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-slate-950"
            >
              Chat on WhatsApp
            </TrackedExternalLink>
            <p>{siteConfig.location}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
