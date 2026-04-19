import { NextResponse } from "next/server";

type ContactPayload = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  company?: string;
  website?: string;
  service?: string;
  budget?: string;
  timeline?: string;
  startDate?: string;
  goals?: string;
  source?: string;
  consent?: boolean;
  pageUrl?: string;
  pagePath?: string;
};

export async function POST(request: Request) {
  const payload = (await request.json()) as ContactPayload;

  if (
    !payload.firstName ||
    !payload.lastName ||
    !payload.email ||
    !payload.phone ||
    !payload.company ||
    !payload.goals ||
    !payload.consent
  ) {
    return NextResponse.json(
      { error: "Missing required fields. Please complete the form and try again." },
      { status: 400 },
    );
  }

  const lead = {
    eventType: "website_lead_created",
    submittedAt: new Date().toISOString(),
    contact: {
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
      phone: payload.phone,
      company: payload.company,
      website: payload.website ?? "",
    },
    qualification: {
      service: payload.service ?? "",
      budget: payload.budget ?? "",
      timeline: payload.timeline ?? "",
      startDate: payload.startDate ?? "",
      goals: payload.goals,
      source: payload.source ?? "",
    },
    attribution: {
      pageUrl: payload.pageUrl ?? "",
      pagePath: payload.pagePath ?? "",
      referrer: request.headers.get("referer") ?? "",
      userAgent: request.headers.get("user-agent") ?? "",
    },
    consent: payload.consent,
  };

  const crmWebhookUrl = process.env.CRM_WEBHOOK_URL;
  const autoResponseWebhookUrl = process.env.AUTO_RESPONSE_WEBHOOK_URL;

  const crmResponse = crmWebhookUrl ? await postJson(crmWebhookUrl, lead) : null;

  if (crmResponse && !crmResponse.ok) {
    return NextResponse.json(
      { error: "We received the inquiry, but CRM forwarding failed. Please try again." },
      { status: 502 },
    );
  }

  if (!crmWebhookUrl) {
    console.log("CRM_WEBHOOK_URL not configured. Lead payload:", lead);
  }

  let autoResponseSent = false;

  if (autoResponseWebhookUrl) {
    const autoResponsePayload = {
      eventType: "website_lead_autoresponse",
      submittedAt: lead.submittedAt,
      recipient: {
        email: lead.contact.email,
        firstName: lead.contact.firstName,
        lastName: lead.contact.lastName,
      },
      company: lead.contact.company,
      service: lead.qualification.service,
      timeline: lead.qualification.timeline,
      startDate: lead.qualification.startDate,
      pageUrl: lead.attribution.pageUrl,
    };

    const autoResponseResult = await postJson(autoResponseWebhookUrl, autoResponsePayload);

    if (autoResponseResult?.ok) {
      autoResponseSent = true;
    } else {
      console.error("AUTO_RESPONSE_WEBHOOK_URL request failed.");
    }
  }

  return NextResponse.json({
    message: autoResponseSent
      ? "Thanks. Your project brief has been received and a confirmation has been sent."
      : "Thanks. Your project brief has been received.",
  });
}

async function postJson(url: string, payload: unknown) {
  try {
    return await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  } catch (error) {
    console.error(`Webhook request failed for ${url}:`, error);
    return null;
  }
}
