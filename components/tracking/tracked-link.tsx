"use client";

import type { ComponentPropsWithoutRef, MouseEvent } from "react";
import Link from "next/link";

import { trackEvent } from "@/components/tracking/events";

type TrackedLinkProps = ComponentPropsWithoutRef<typeof Link> & {
  eventName: string;
  eventParams?: Record<string, string | number | boolean | undefined>;
};

export function TrackedLink({
  eventName,
  eventParams,
  onClick,
  ...props
}: TrackedLinkProps) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    trackEvent(eventName, eventParams);
    onClick?.(event);
  }

  return <Link {...props} onClick={handleClick} />;
}
