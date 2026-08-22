import { NextResponse } from "next/server";
import { getMailer, type Mailer } from "@/lib/mailer";
import { FormspreeQuotaError, getFormspree } from "@/lib/formspree";
import { buildLeadPayload, getLeadWebhook } from "@/lib/lead-webhook";
import { MIN_FILL_MS, contactSchema, type ContactInput } from "@/lib/contact-schema";
import { checkRateLimit, clientIpFrom, consumeRateLimit } from "@/lib/rate-limit";
import { site } from "@/data/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// LEAD_TO_EMAIL is the documented name; CONTACT_EMAIL is kept so an
// environment already configured under the old name keeps working.
const CONTACT_EMAIL =
  process.env.LEAD_TO_EMAIL ?? process.env.CONTACT_EMAIL ?? "hello@reinstategbp.com";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

type SinkOutcome = { name: string; ok: boolean; error?: unknown };

/**
 * Last-resort capture. If a lead cannot be emailed we still write the whole
 * submission to the server log, so it can be recovered by grepping for
 * CONTACT_LEAD_UNDELIVERED rather than being lost silently. A visitor who
 * fills this form is the entire point of the site — losing one is worse than
 * any amount of log noise.
 */
function logUndeliveredLead(reason: string, data: ContactInput) {
  console.error(
    `[contact] LEAD NOT DELIVERED / CONTACT_LEAD_UNDELIVERED (${reason}) ` +
      JSON.stringify({
        receivedAt: new Date().toISOString(),
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        page: data.page ?? "unknown",
        message: data.message,
      }),
  );
}

export async function POST(request: Request) {
  // --- Rate limit ------------------------------------------------------------
  // Read-only here. The counter is incremented further down, only once a
  // submission has passed validation, so typos never lock a real lead out.
  const ip = clientIpFrom(request.headers);
  const limit = checkRateLimit(ip);

  if (!limit.ok) {
    return NextResponse.json(
      { ok: false, error: "Too many submissions. Please call us instead." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } },
    );
  }

  // --- Parse and re-validate server-side ------------------------------------
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Malformed request." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "Please check the highlighted fields.",
        fieldErrors: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  const data = parsed.data;

  // Valid submission — now it counts against the limit.
  consumeRateLimit(ip);

  // --- Spam gates -----------------------------------------------------------
  // Honeypot: the field is hidden from real users, so anything in it is a bot.
  // Timing: a human cannot complete five fields in under three seconds.
  // Both return a success shape so bots get no signal about what caught them.
  const trippedHoneypot = Boolean(data.website);
  const tooFast =
    typeof data.renderedAt === "number" &&
    Number.isFinite(data.renderedAt) &&
    Date.now() - data.renderedAt < MIN_FILL_MS;

  if (trippedHoneypot || tooFast) {
    return NextResponse.json({ ok: true });
  }

  // --- Deliver --------------------------------------------------------------
  const fullName = `${data.firstName} ${data.lastName}`;

  const mailer = getMailer();
  const webhook = getLeadWebhook();
  const formspree = getFormspree();

  const notification = `
    <h2 style="margin:0 0 16px">New enquiry from the website</h2>
    <table cellpadding="6" style="border-collapse:collapse;font-family:Helvetica,Arial,sans-serif;font-size:15px">
      <tr><td><strong>Name</strong></td><td>${escapeHtml(fullName)}</td></tr>
      <tr><td><strong>Email</strong></td><td>${escapeHtml(data.email)}</td></tr>
      <tr><td><strong>Phone</strong></td><td>${escapeHtml(data.phone)}</td></tr>
    </table>
    <h3 style="margin:24px 0 8px">Message</h3>
    <p style="white-space:pre-wrap;font-family:Helvetica,Arial,sans-serif;font-size:15px;line-height:1.6">${escapeHtml(
      data.message,
    )}</p>
  `;

  const autoresponse = `
    <div style="font-family:Helvetica,Arial,sans-serif;font-size:15px;line-height:1.6;color:#292929">
      <p>Hi ${escapeHtml(data.firstName)},</p>
      <p>Thanks for getting in touch with Reinstate GBP. We have your details and a specialist is
      reviewing your case now — you'll hear back from us, usually within one business day.</p>
      <p>If it's urgent, call us on <a href="${site.phoneHref}" style="color:#03744E">${
        site.phoneDisplay
      }</a> and we'll pick it up straight away.</p>
      <p style="margin-top:24px">— The Reinstate GBP team</p>
    </div>
  `;

  async function notifyByEmail(transport: Mailer): Promise<SinkOutcome> {
    try {
      await transport.send({
        to: CONTACT_EMAIL,
        replyTo: data.email,
        subject: `New enquiry from ${fullName}`,
        html: notification,
      });
      return { name: transport.name, ok: true };
    } catch (error) {
      return { name: transport.name, ok: false, error };
    }
  }

  /** Best effort, and deliberately independent of which channel took the lead. */
  async function sendAutoresponse(transport: Mailer) {
    try {
      await transport.send({
        to: data.email,
        subject: "We've received your enquiry — Reinstate GBP",
        html: autoresponse,
      });
    } catch (error) {
      console.error(`[contact] ${transport.name} autoresponder failed:`, error);
    }
  }

  if (!mailer && !webhook && !formspree) {
    if (process.env.NODE_ENV === "production") {
      console.error(
        "[contact] No delivery configured. Set FORMSPREE_PROJECT_ID + FORMSPREE_FORM_KEY, " +
          "or SMTP_HOST with SMTP_USER and SMTP_PASS, or LEAD_WEBHOOK_URL.",
      );
      logUndeliveredLead("no-sink", data);
      return NextResponse.json(
        { ok: false, error: "We couldn't send your message. Please call us." },
        { status: 500 },
      );
    }

    console.warn("[contact] No delivery configured. Submission logged instead of sent:", {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      message: data.message,
    });
    return NextResponse.json({ ok: true });
  }

  // The spreadsheet/CRM is a different destination, not an alternative one, so
  // it runs alongside rather than as part of the fallback chain.
  const webhookPromise = webhook
    ? webhook
        .send(buildLeadPayload(data))
        .then<SinkOutcome>(() => ({ name: webhook.name, ok: true }))
        .catch<SinkOutcome>((error) => ({ name: webhook.name, ok: false, error }))
    : null;

  // Notification chain, tried in order and stopped at the first success — both
  // routes land in the same inbox, so running them together would just send
  // every lead twice.
  const notifyOutcomes: SinkOutcome[] = [];

  if (formspree) {
    try {
      await formspree.send(data);
      notifyOutcomes.push({ name: formspree.name, ok: true });
    } catch (error) {
      if (error instanceof FormspreeQuotaError) {
        console.error(
          "[contact] FORMSPREE_QUOTA_REACHED — submissions are being refused until the plan " +
            "resets or is upgraded. Falling back to email.",
          error.message,
        );
      }
      notifyOutcomes.push({ name: formspree.name, ok: false, error });
    }
  }

  const notified = () => notifyOutcomes.some((outcome) => outcome.ok);

  if (!notified() && mailer) {
    notifyOutcomes.push(await notifyByEmail(mailer));
  }

  if (mailer) await sendAutoresponse(mailer);

  const webhookOutcome = webhookPromise ? await webhookPromise : null;
  const outcomes = [...notifyOutcomes, ...(webhookOutcome ? [webhookOutcome] : [])];

  for (const outcome of outcomes.filter((o) => !o.ok)) {
    console.error(`[contact] ${outcome.name} delivery failed:`, outcome.error);
  }

  const delivered = outcomes.filter((outcome) => outcome.ok);

  if (delivered.length === 0) {
    logUndeliveredLead(outcomes.map((outcome) => outcome.name).join("+") || "no-sink", data);
    return NextResponse.json(
      { ok: false, error: "We couldn't send your message. Please call us." },
      { status: 502 },
    );
  }

  const failedNames = outcomes.filter((o) => !o.ok).map((o) => o.name);
  if (failedNames.length > 0) {
    console.warn(
      `[contact] lead captured by ${delivered.map((o) => o.name).join(", ")}; ` +
        `${failedNames.join(", ")} failed`,
    );
  }

  return NextResponse.json({ ok: true });
}
