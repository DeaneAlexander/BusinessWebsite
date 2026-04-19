import { NextResponse } from "next/server";
import { Resend } from "resend";

import { siteConfig } from "@/lib/site";

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
  const resendApiKey = process.env.RESEND_API_KEY;
  const notificationEmail = process.env.LEAD_NOTIFICATION_EMAIL ?? siteConfig.email;
  const fromEmail = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";
  let notificationEmailSent = false;
  let notificationEmailFailed = false;
  let notificationErrorMessage: string | null = null;

  if (resendApiKey) {
    const resend = new Resend(resendApiKey);
    const emailResult = await resend.emails.send({
      from: fromEmail,
      to: notificationEmail,
      replyTo: lead.contact.email,
      subject: `New website lead from ${lead.contact.firstName} ${lead.contact.lastName}`,
      text: buildLeadNotificationText(lead),
      html: buildLeadNotificationHtml(lead),
    });

    if (emailResult.error) {
      console.error("Resend lead notification failed:", emailResult.error);
      notificationEmailFailed = true;
      notificationErrorMessage =
        typeof emailResult.error.message === "string"
          ? emailResult.error.message
          : "Unknown Resend error.";
    } else {
      notificationEmailSent = true;
    }
  } else {
    console.log("RESEND_API_KEY not configured. Skipping lead notification email.");
  }

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

  if (!notificationEmailSent && !crmWebhookUrl) {
    return NextResponse.json(
      {
        error: notificationEmailFailed
          ? `We received the inquiry, but the email notification failed. ${notificationErrorMessage ?? "Please check the Resend configuration."}`
          : "We received the inquiry, but email notifications are not configured yet.",
      },
      { status: 502 },
    );
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

function buildLeadNotificationText(lead: {
  submittedAt: string;
  contact: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    company: string;
    website: string;
  };
  qualification: {
    service: string;
    budget: string;
    timeline: string;
    startDate: string;
    goals: string;
    source: string;
  };
  attribution: {
    pageUrl: string;
    pagePath: string;
    referrer: string;
    userAgent: string;
  };
  consent: boolean;
}) {
  return [
    "New website lead received",
    "",
    `Submitted: ${lead.submittedAt}`,
    `Name: ${lead.contact.firstName} ${lead.contact.lastName}`,
    `Email: ${lead.contact.email}`,
    `Phone: ${lead.contact.phone}`,
    `Company: ${lead.contact.company}`,
    `Website: ${lead.contact.website || "Not provided"}`,
    `Service: ${lead.qualification.service || "Not provided"}`,
    `Budget: ${lead.qualification.budget || "Not provided"}`,
    `Timeline: ${lead.qualification.timeline || "Not provided"}`,
    `Start date: ${lead.qualification.startDate || "Not provided"}`,
    `Source: ${lead.qualification.source || "Not provided"}`,
    `Consent: ${lead.consent ? "Yes" : "No"}`,
    `Page URL: ${lead.attribution.pageUrl || "Not provided"}`,
    `Page path: ${lead.attribution.pagePath || "Not provided"}`,
    `Referrer: ${lead.attribution.referrer || "Not provided"}`,
    `User agent: ${lead.attribution.userAgent || "Not provided"}`,
    "",
    "Goals",
    lead.qualification.goals,
  ].join("\n");
}

function buildLeadNotificationHtml(lead: {
  submittedAt: string;
  contact: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    company: string;
    website: string;
  };
  qualification: {
    service: string;
    budget: string;
    timeline: string;
    startDate: string;
    goals: string;
    source: string;
  };
  attribution: {
    pageUrl: string;
    pagePath: string;
    referrer: string;
    userAgent: string;
  };
  consent: boolean;
}) {
  const rows = [
    ["Submitted", lead.submittedAt],
    ["Name", `${lead.contact.firstName} ${lead.contact.lastName}`],
    ["Email", lead.contact.email],
    ["Phone", lead.contact.phone],
    ["Company", lead.contact.company],
    ["Website", lead.contact.website || "Not provided"],
    ["Service", lead.qualification.service || "Not provided"],
    ["Budget", lead.qualification.budget || "Not provided"],
    ["Timeline", lead.qualification.timeline || "Not provided"],
    ["Start date", lead.qualification.startDate || "Not provided"],
    ["Source", lead.qualification.source || "Not provided"],
    ["Consent", lead.consent ? "Yes" : "No"],
    ["Page URL", lead.attribution.pageUrl || "Not provided"],
    ["Page path", lead.attribution.pagePath || "Not provided"],
    ["Referrer", lead.attribution.referrer || "Not provided"],
    ["User agent", lead.attribution.userAgent || "Not provided"],
  ];

  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #0f172a;">
      <h2 style="margin-bottom: 16px;">New website lead received</h2>
      <table style="border-collapse: collapse; width: 100%; max-width: 720px;">
        <tbody>
          ${rows
            .map(
              ([label, value]) => `
                <tr>
                  <td style="padding: 8px; border: 1px solid #e2e8f0; font-weight: 600; width: 180px;">${escapeHtml(label)}</td>
                  <td style="padding: 8px; border: 1px solid #e2e8f0;">${escapeHtml(value)}</td>
                </tr>`,
            )
            .join("")}
        </tbody>
      </table>
      <h3 style="margin: 24px 0 8px;">Goals</h3>
      <p style="white-space: pre-wrap; margin: 0;">${escapeHtml(lead.qualification.goals)}</p>
    </div>
  `;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
