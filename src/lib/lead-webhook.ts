import type { ContactInput } from "@/lib/contact-schema";

/**
 * Posts each lead to an arbitrary HTTPS endpoint, so submissions can land in a
 * spreadsheet or CRM as well as an inbox.
 *
 * Deliberately generic rather than an integration per vendor: one URL covers
 * Google Sheets (via an Apps Script web app), Zapier, Make, n8n, HubSpot,
 * Airtable and anything else that accepts a JSON POST. Swapping destination is
 * an environment change, not a deploy.
 */

export type LeadPayload = {
  receivedAt: string;
  form: "contact";
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phone: string;
  message: string;
};

export type LeadWebhook = {
  name: string;
  send(payload: LeadPayload): Promise<void>;
};

const TIMEOUT_MS = 10_000;

export function buildLeadPayload(data: ContactInput): LeadPayload {
  return {
    receivedAt: new Date().toISOString(),
    form: "contact",
    firstName: data.firstName,
    lastName: data.lastName,
    fullName: `${data.firstName} ${data.lastName}`,
    email: data.email,
    phone: data.phone,
    message: data.message,
  };
}

export function getLeadWebhook(): LeadWebhook | null {
  const url = process.env.LEAD_WEBHOOK_URL;
  if (!url) return null;

  return {
    name: "webhook",
    async send(payload) {
      // Same reasoning as the SMTP timeouts: a hanging endpoint must not leave
      // the visitor watching a spinner. AbortController is the only thing that
      // bounds fetch here — it has no timeout of its own.
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Optional shared secret so the endpoint can reject anything that
            // did not come from this site. A public webhook URL is otherwise
            // open to anyone who finds it.
            ...(process.env.LEAD_WEBHOOK_SECRET
              ? { "X-Webhook-Secret": process.env.LEAD_WEBHOOK_SECRET }
              : {}),
          },
          body: JSON.stringify(payload),
          signal: controller.signal,
          // Google Apps Script answers with a 302 to script.googleusercontent.com;
          // following it is what actually completes the write.
          redirect: "follow",
        });

        const text = (await response.text()).slice(0, 500);

        if (!response.ok) {
          throw new Error(`Webhook responded ${response.status}: ${text}`);
        }

        // Google Apps Script answers 200 to everything — a rejected secret, an
        // uncaught exception, a missing sheet all look identical at the HTTP
        // layer. So an explicit `{"ok": false}` in the body is treated as a
        // failure too; without this a wrong secret would silently discard every
        // lead while the site reported success. Endpoints that return no `ok`
        // field at all (Zapier, Make) are unaffected.
        try {
          const parsed = JSON.parse(text);
          if (parsed && typeof parsed === "object" && parsed.ok === false) {
            throw new Error(`Webhook reported failure: ${text}`);
          }
        } catch (error) {
          // Only rethrow our own signal — a non-JSON body is perfectly valid.
          if (error instanceof Error && error.message.startsWith("Webhook reported failure")) {
            throw error;
          }
        }
      } finally {
        clearTimeout(timer);
      }
    },
  };
}
