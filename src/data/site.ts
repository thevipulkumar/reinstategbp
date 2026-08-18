/**
 * Global site constants. Everything here is safe to edit without touching a
 * component.
 */

/**
 * Every number the business answers, in priority order.
 *
 * `phones[0]` is the primary, and is what single-slot calls to action use — the
 * hero, the mobile sticky bar, the inner-page hero and the form's error
 * fallback — where offering two numbers would only add a decision. The full
 * list renders wherever contact details are given as a directory: the footer
 * and the contact section.
 *
 * `region` is the ISO country code; `label` is what a visitor reads.
 */
const phones = [
  {
    region: "US",
    label: "United States",
    display: "+1669-202-2367",
    href: "tel:+16692022367",
  },
  {
    region: "AU",
    label: "Australia",
    display: "+61 485 039 513",
    href: "tel:+61485039513",
  },
] as const;

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

  phones,

  /** Aliases of the primary number, so single-slot usages stay readable. */
  phoneDisplay: phones[0].display,
  phoneHref: phones[0].href,

  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://reinstategbp.com",

  yearsExperience: 6,
  foundingYear: 2019,

  social: {
    youtube: "https://www.youtube.com/@reinstategbp",
  },
} as const;

export const primaryPhone = phones[0];

export const ogImage = {
  url: "/logo/reinstate-gbp-logo.png",
  width: 500,
  height: 500,
  alt: "Reinstate GBP — Google Business Profile reinstatement specialists",
} as const;
