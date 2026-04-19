"use client";

import type { ComponentPropsWithoutRef, MouseEvent } from "react";

import { trackEvent } from "@/components/tracking/events";

type TrackedExternalLinkProps = ComponentPropsWithoutRef<"a"> & {
  eventName: string;
  eventParams?: Record<string, string | number | boolean | undefined>;
};

export function TrackedExternalLink({
  eventName,
  eventParams,
  onClick,
  ...props
}: TrackedExternalLinkProps) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    trackEvent(eventName, eventParams);
    onClick?.(event);
  }

  return <a {...props} onClick={handleClick} />;
}
