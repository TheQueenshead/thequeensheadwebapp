import { Resend } from "resend";
import { site } from "@/data/site";
import { ConfigError, isLive } from "./guard";
import {
  enquiryTypes,
  fieldLabels,
  type EnquiryPayload,
} from "./enquiries";

/**
 * EMAIL SENDING (Resend)
 * ------------------------------------------------------------------
 * Set these in .env.local (and in Vercel → Project → Settings → Env):
 *   RESEND_API_KEY        — from resend.com
 *   ENQUIRY_TO_EMAIL      — the pub's inbox (can be comma-separated)
 *   ENQUIRY_FROM_EMAIL    — e.g. "The Queen's Head <enquiries@queensheadlittlebury.co.uk>"
 *                            (domain must be verified in Resend)
 *   RESEND_AUDIENCE_ID    — optional, for newsletter sign-ups
 *
 * Without RESEND_API_KEY the site runs in "demo mode": submissions are
 * logged to the server console and the visitor still sees a success
 * message, so the design can be reviewed before go-live.
 *
 * Demo mode is never allowed on the live site (see isLive in guard.ts):
 * there a missing setting or a failed send returns an error to the
 * visitor instead, so no booking is ever silently lost.
 */

const apiKey = process.env.RESEND_API_KEY;
const resend = apiKey ? new Resend(apiKey) : null;

const TO = (process.env.ENQUIRY_TO_EMAIL ?? site.email)
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);
const FROM =
  process.env.ENQUIRY_FROM_EMAIL ?? `${site.name} <onboarding@resend.dev>`;

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!,
  );

/** Refuse to run the live site on stand-in email settings. */
function requireLiveConfig(names: string[]) {
  const missing = names.filter((n) => !process.env[n]);
  if (missing.length) throw new ConfigError(`Missing env: ${missing.join(", ")}`);
}

/** Resend returns errors rather than throwing — turn them into exceptions. */
async function send(email: Parameters<Resend["emails"]["send"]>[0]) {
  const { error } = await resend!.emails.send(email);
  if (error) throw new Error(`Resend: ${error.name} — ${error.message}`);
}

function rows(payload: EnquiryPayload) {
  const base: [string, string][] = [
    ["Name", payload.name],
    ["Email", payload.email],
    ["Phone", payload.phone || "—"],
  ];
  const extra = Object.entries(payload.fields)
    .filter(([, v]) => v && v.trim())
    .map(([k, v]) => [fieldLabels[k] ?? k, v] as [string, string]);
  return [...base, ...extra];
}

function table(payload: EnquiryPayload) {
  return `<table cellpadding="8" style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px">
    ${rows(payload)
      .map(
        ([k, v]) =>
          `<tr><td style="border-bottom:1px solid #eee;color:#6b5f57;vertical-align:top"><strong>${escape(k)}</strong></td><td style="border-bottom:1px solid #eee;white-space:pre-wrap">${escape(v)}</td></tr>`,
      )
      .join("")}
  </table>`;
}

function wrap(title: string, body: string) {
  return `<!doctype html><html><body style="margin:0;background:#F8EEDF;padding:24px;font-family:Arial,sans-serif;color:#2a2321">
  <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:14px;overflow:hidden">
    <div style="background:#8E1616;color:#E8C999;padding:22px 28px;font-family:Georgia,serif;font-size:22px">${escape(site.name)}<div style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#E8C999;opacity:.85;margin-top:4px">Littlebury · Est. 14th Century</div></div>
    <div style="padding:28px"><h2 style="margin:0 0 14px;font-family:Georgia,serif;color:#000">${escape(title)}</h2>${body}</div>
    <div style="padding:16px 28px;background:#F8EEDF;font-size:12px;color:#6b5f57">${escape(site.legalName)} · ${escape(site.address.line1)}, ${escape(site.address.town)} ${escape(site.address.postcode)}${site.phone ? ` · ${escape(site.phone)}` : ""}</div>
  </div></body></html>`;
}

export async function sendEnquiry(payload: EnquiryPayload) {
  const meta = enquiryTypes[payload.type];
  const subject = meta.subject({ ...payload.fields, name: payload.name });

  if (isLive()) {
    requireLiveConfig(["RESEND_API_KEY", "ENQUIRY_TO_EMAIL", "ENQUIRY_FROM_EMAIL"]);
  }
  if (!resend) {
    console.info("[demo mode] Enquiry received (not emailed):", {
      subject,
      ...payload,
    });
    return { demo: true };
  }

  // 1. Notify the pub
  await send({
    from: FROM,
    to: TO,
    replyTo: payload.email,
    subject: `[Website] ${subject}`,
    html: wrap(
      meta.label,
      `<p style="margin:0 0 16px">A new ${meta.label.toLowerCase()} has come through the website. Reply to this email to respond directly to the customer.</p>${table(payload)}`,
    ),
  });

  // 2. Acknowledge to the customer. This goes to whatever address was
  // typed in, so it deliberately repeats nothing the visitor wrote (bar
  // their first name) — otherwise bots could use it to send their own
  // text to strangers from the pub's domain.
  await send({
    from: FROM,
    to: payload.email,
    replyTo: TO,
    subject: `We've received your ${meta.label.toLowerCase()} — ${site.name}`,
    html: wrap(
      `Thank you, ${payload.name.split(" ")[0].slice(0, 30)}`,
      `<p>We've received your ${meta.label.toLowerCase()} and one of the team will be in touch shortly to confirm.</p>
       <p style="color:#6b5f57;font-size:13px"><strong>Please note:</strong> this is an enquiry, not a confirmed booking. Nothing is reserved until we've replied.</p>
       ${site.phone ? `<p style="margin-top:20px">Need us sooner? Call <a href="${site.phoneHref}" style="color:#8E1616">${escape(site.phone)}</a>.</p>` : `<p style="margin-top:20px">Need us sooner? Just reply to this email.</p>`}`,
    ),
  });

  return { demo: false };
}

export async function addNewsletterContact(email: string, name?: string) {
  const audienceId = process.env.RESEND_AUDIENCE_ID;
  if (isLive()) requireLiveConfig(["RESEND_API_KEY", "RESEND_AUDIENCE_ID"]);
  if (!resend || !audienceId) {
    console.info("[demo mode] Newsletter sign-up (not stored):", { email, name });
    return { demo: true };
  }
  const [firstName, ...rest] = (name ?? "").trim().split(" ");
  const { error } = await resend.contacts.create({
    audienceId,
    email,
    firstName: firstName || undefined,
    lastName: rest.join(" ") || undefined,
    unsubscribed: false,
  });
  if (error) throw new Error(`Resend: ${error.name} — ${error.message}`);
  return { demo: false };
}
