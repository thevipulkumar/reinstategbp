import { NextResponse } from "next/server";
import { Resend } from "resend";
import { MIN_FILL_MS, contactSchema, type ContactInput } from "@/lib/contact-schema";
import { clientIpFrom, rateLimit } from "@/lib/rate-limit";
import { site } from "@/data/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const CONTACT_EMAIL = process.env.CONTACT_EMAIL ?? "hello@reinstategbp.com";
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? "Reinstate GBP <onboarding@resend.dev>";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Last-resort capture. If a lead cannot be emailed we still write the whole
 * submission to the server log, so it can be recovered by grepping for
 * CONTACT_LEAD_UNDELIVERED rather than being lost silently. A visitor who
 * fills this form is the entire point of the site — losing one is worse than
 * any amount of log noise.
 */
function logUndeliveredLead(reason: string, data: ContactInput) {
  console.error(
    `[contact] CONTACT_LEAD_UNDELIVERED (${reason}) ` +
      JSON.stringify({
        receivedAt: new Date().toISOString(),
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        message: data.message,
      }),
  );
}

export async function POST(request: Request) {
  // --- Rate limit before doing any work -------------------------------------
  const ip = clientIpFrom(request.headers);
  const limit = rateLimit(ip);

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

  if (!process.env.RESEND_API_KEY) {
    if (process.env.NODE_ENV === "production") {
      console.error("[contact] RESEND_API_KEY is not set — cannot send email.");
      logUndeliveredLead("no-api-key", data);
      return NextResponse.json(
        { ok: false, error: "We couldn't send your message. Please call us." },
        { status: 500 },
      );
    }

    console.warn("[contact] RESEND_API_KEY not set. Submission logged instead of sent:", {
      ...data,
      website: undefined,
      renderedAt: undefined,
    });
    return NextResponse.json({ ok: true });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

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

  try {
    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: [CONTACT_EMAIL],
      replyTo: data.email,
      subject: `New GBP enquiry — ${fullName}`,
      html: notification,
    });

    if (result.error) {
      console.error("[contact] Resend rejected the notification:", result.error);
      logUndeliveredLead("resend-rejected", data);
      return NextResponse.json(
        { ok: false, error: "We couldn't send your message. Please call us." },
        { status: 502 },
      );
    }
  } catch (error) {
    console.error("[contact] Failed to send notification:", error);
    logUndeliveredLead("send-threw", data);
    return NextResponse.json(
      { ok: false, error: "We couldn't send your message. Please call us." },
      { status: 502 },
    );
  }

  // The lead is safely delivered by this point. A failed autoresponder is worth
  // logging but must not turn a captured lead into an error for the visitor.
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: [data.email],
      subject: "We've received your enquiry — Reinstate GBP",
      html: autoresponse,
    });
  } catch (error) {
    console.error("[contact] Autoresponder failed:", error);
  }

  return NextResponse.json({ ok: true });
}
