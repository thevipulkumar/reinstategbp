/**
 * Copy for the pages that aren't the homepage or a service page — plus the
 * shared section headings those pages reuse. Kept here so no editable string
 * lives inside a component (§11).
 */

export const contactPage = {
  eyebrow: "Contact",
  headline: { lead: "Tell us what happened", accent: "to your listing", tail: "" },
  subheadline:
    "Send us the details and a specialist will review your case — usually the same business day. If it's urgent, call and we'll pick it up straight away.",
  faqHeading: "Before you get in touch",
} as const;

export const blogPage = {
  eyebrow: "Blog",
  headline: {
    lead: "Straight answers on",
    accent: "Google Business Profile",
    tail: "problems.",
  },
  subheadline:
    "Suspensions, verifications and denied appeals, explained by the people who work on them daily. No filler, no recycled Google help-centre text.",
  emptyState: "No posts yet — check back shortly.",
  relatedHeading: "Related reading",
  allArticlesLabel: "All articles",
  fallbackEyebrow: "Article",
  postContactHeading: "Suspended right now? Talk to a specialist.",
} as const;

export const legalPage = {
  eyebrow: "Legal",
  updatedPrefix: "Last updated",
} as const;

export const notFoundPage = {
  eyebrow: "404",
  headline: { lead: "We couldn't find", accent: "that page", tail: "" },
  subheadline:
    "The link may be out of date, or the page may have moved. Here's where most people are heading.",
  homeLabel: "Back to the homepage",
} as const;

/** Headings shared by sections that appear on more than one page. */
export const sharedHeadings = {
  contact: "Speak to our Experts",
  testimonials: "Hear from the Business Owners",
  /** `%s` is replaced with the service name. */
  serviceFaq: (serviceName: string) => `${serviceName} — questions we get asked`,
} as const;
