"use client";

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (
      command: "event",
      eventName: string,
      params?: Record<string, string | number | boolean | undefined>,
    ) => void;
  }
}

type EventParams = Record<string, string | number | boolean | undefined>;

export function trackEvent(eventName: string, params: EventParams = {}) {
  if (typeof window === "undefined") {
    return;
  }

  window.gtag?.("event", eventName, params);
  window.dataLayer?.push({
    event: eventName,
    ...params,
  });
}
