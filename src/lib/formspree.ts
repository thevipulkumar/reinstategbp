import type { ContactInput } from "@/lib/contact-schema";

/**
 * Submits leads to Formspree, which adds a dashboard, spam filtering and
 * submission history on top of plain email.
 *
 * Formspree has two form styles and they use different endpoints:
 *
 *   dashboard form -> https://formspree.io/f/<hashid>
 *   project form   -> https://formspree.io/p/<projectId>/f/<formKey>
 *
 * A project form has no hashid at all, which is the usual reason people hunt
 * for one that does not exist. Both are supported here.
 */

const TIMEOUT_MS = 10_000;

export class FormspreeQuotaError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "FormspreeQuotaError";
  }
}

export type FormspreeSubmitter = {
  name: string;
  endpoint: string;
  send(data: ContactInput): Promise<void>;
};

function resolveEndpoint(): string | null {
  const projectId = process.env.FORMSPREE_PROJECT_ID;
  const formKey = process.env.FORMSPREE_FORM_KEY;
  if (projectId && formKey) {
    return `https://formspree.io/p/${projectId}/f/${formKey}`;
  }

  // Dashboard style. Accepts a bare hashid or a full URL pasted from the UI.
  const formId = process.env.FORMSPREE_FORM_ID;
  if (formId) {
    return formId.startsWith("http") ? formId : `https://formspree.io/f/${formId}`;
  }

  return null;
}

export function getFormspree(): FormspreeSubmitter | null {
  const endpoint = resolveEndpoint();
  if (!endpoint) return null;

  return {
    name: "formspree",
    endpoint,
    async send(data) {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Without this Formspree redirects to its own thank-you page
            // instead of returning JSON, which is useless from a server.
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: `${data.firstName} ${data.lastName}`,
            email: data.email,
            phone: data.phone,
            message: data.message,
            // Sets the reply target on Formspree's notification email.
            _replyto: data.email,
          }),
          signal: controller.signal,
        });

        const text = (await response.text()).slice(0, 500);

        if (response.ok) return;

        // The free plan caps monthly submissions. This is the one failure that
        // appears without warning on a working integration, mid-month, while
        // advertising is running — and the fix is a plan change, not code. It
        // is worth being able to grep for on its own.
        const looksLikeQuota =
          response.status === 429 || /quota|limit|plan|upgrade/i.test(text);

        if (looksLikeQuota) {
          throw new FormspreeQuotaError(
            `Formspree quota or plan limit reached (${response.status}): ${text}`,
          );
        }

        throw new Error(`Formspree responded ${response.status}: ${text}`);
      } finally {
        clearTimeout(timer);
      }
    },
  };
}
