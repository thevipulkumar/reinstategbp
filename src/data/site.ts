/**
 * Global site constants. Everything here is safe to edit without touching a
 * component.
 */

export const site = {
  name: "Reinstate GBP",
  legalName: "Reinstate GBP",
  tagline: "Google Business Profile reinstatement specialists",
  description:
    "We get suspended Google Business Profiles reinstated. Suspensions, failed verifications, denied appeals and new listings — handled by specialists with 6+ years of GBP experience.",

  /**
   * The single public-facing address. Used by every rendered address and every
   * mailto: on the site — footer, contact section, legal pages and the
   * Organization structured data. Change it here and it changes everywhere.
   *
   * The inbox that *receives* form submissions is separate: CONTACT_EMAIL.
   */
  email: "hello@reinstategbp.com",

  /** Displayed exactly as written in the brief; `phoneHref` is the dialable form. */
  phoneDisplay: "+1669-202-2367",
  phoneHref: "tel:+16692022367",

  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://reinstategbp.com",

  yearsExperience: 6,
  foundingYear: 2019,

  social: {
    youtube: "https://www.youtube.com/@reinstategbp",
  },
} as const;

export const ogImage = {
  url: "/logo/reinstate-gbp-logo.png",
  width: 500,
  height: 500,
  alt: "Reinstate GBP — Google Business Profile reinstatement specialists",
} as const;
