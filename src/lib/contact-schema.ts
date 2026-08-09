import { z } from "zod";

/**
 * Single source of truth for contact form validation. Imported by the client
 * form (react-hook-form resolver) and re-run server-side in the API route —
 * client validation is a convenience, never a trust boundary.
 */
export const contactSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, "Please enter your first name")
    .max(60, "That's longer than we can store"),
  lastName: z
    .string()
    .trim()
    .min(1, "Please enter your last name")
    .max(60, "That's longer than we can store"),
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email address")
    .email("That doesn't look like a valid email address")
    .max(160, "That's longer than we can store"),
  phone: z
    .string()
    .trim()
    .min(7, "Please enter a phone number we can reach you on")
    .max(32, "That's longer than a phone number should be")
    .regex(/^[+()\-.\s\d]+$/, "Please use digits, spaces and + ( ) - only"),
  message: z
    .string()
    .trim()
    .min(10, "Tell us a little more — at least a sentence")
    .max(4000, "Please keep this under 4000 characters"),

  /**
   * Honeypot. Real users never see this field, so anything in it is a bot.
   *
   * Deliberately permissive: if the schema rejected a filled honeypot, the bot
   * would get a 400 naming the field that caught it. Instead the value is
   * accepted here and the API route silently returns success without sending.
   */
  website: z.string().max(200).optional(),

  /** Client timestamp (ms) of when the form was rendered. */
  renderedAt: z.coerce.number().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;

/** A human takes at least this long to fill the form in. */
export const MIN_FILL_MS = 3000;
