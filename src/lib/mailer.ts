import { Resend } from "resend";
import nodemailer from "nodemailer";

/**
 * Email delivery for the contact form, with two interchangeable transports.
 *
 * Whichever set of credentials the operator can get hold of first wins:
 *
 *   RESEND_API_KEY            -> Resend's HTTP API
 *   SMTP_HOST + SMTP_USER/PASS -> plain SMTP through an existing mailbox
 *
 * Resend takes precedence when both are configured. SMTP exists because the
 * site is hosted somewhere that already provides mailboxes for the domain, so
 * it needs no third-party signup and no DNS verification — which is often the
 * difference between the form working today and working next week.
 */

export type MailMessage = {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
};

export type Mailer = {
  /** Identifies the transport in logs. */
  name: string;
  /** Resolves on success, throws on any failure. */
  send(message: MailMessage): Promise<void>;
};

/** Sender address. SMTP falls back to the mailbox doing the authenticating. */
function fromAddress(): string {
  return (
    process.env.MAIL_FROM ??
    process.env.RESEND_FROM_EMAIL ??
    process.env.SMTP_USER ??
    "Reinstate GBP <onboarding@resend.dev>"
  );
}

function resendMailer(apiKey: string): Mailer {
  const resend = new Resend(apiKey);

  return {
    name: "resend",
    async send(message) {
      const result = await resend.emails.send({
        from: fromAddress(),
        to: [message.to],
        replyTo: message.replyTo,
        subject: message.subject,
        html: message.html,
      });

      // The SDK reports delivery failures in the payload rather than throwing,
      // so this has to be converted into one for the caller to handle uniformly.
      if (result.error) {
        throw new Error(`Resend rejected the message: ${JSON.stringify(result.error)}`);
      }
    },
  };
}

function smtpMailer(): Mailer {
  const port = Number(process.env.SMTP_PORT ?? 587);

  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    // Implicit TLS on 465; STARTTLS on 587 and everything else.
    secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : port === 465,
    auth: process.env.SMTP_USER
      ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
      : undefined,
  });

  return {
    name: "smtp",
    async send(message) {
      await transport.sendMail({
        from: fromAddress(),
        to: message.to,
        replyTo: message.replyTo,
        subject: message.subject,
        html: message.html,
      });
    },
  };
}

/** Returns null when nothing is configured, so the caller can capture the lead. */
export function getMailer(): Mailer | null {
  if (process.env.RESEND_API_KEY) return resendMailer(process.env.RESEND_API_KEY);
  if (process.env.SMTP_HOST) return smtpMailer();
  return null;
}

/** Names the transport that would be used, for diagnostics. */
export function configuredTransport(): "resend" | "smtp" | "none" {
  if (process.env.RESEND_API_KEY) return "resend";
  if (process.env.SMTP_HOST) return "smtp";
  return "none";
}
