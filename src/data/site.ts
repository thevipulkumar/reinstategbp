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
   * NOTE ON THE CONTACT ADDRESS
   * The brief lists two: `hello@reinstategbp.com` (§1, conversion actions) and
   * `reinstategbp@gmail.com` (§6.9, verbatim on-page copy). The verbatim copy
   * rule wins for anything visible, so that address is used site-wide — change
   * this one constant to switch every mailto: and every rendered address.
   * The inbox that *receives* form submissions is separate: CONTACT_EMAIL.
   */
  email: "reinstategbp@gmail.com",

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
