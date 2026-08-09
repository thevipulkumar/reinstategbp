/**
 * §6 — homepage copy, verbatim from the brief apart from the §9 corrections.
 *
 * Rich paragraphs are modelled as segment arrays so the emphasised statistics
 * (75%, 90%, "just 3 to 10 business days") stay in the data layer rather than
 * being hard-coded as <strong> inside a component.
 */

export type TextSegment = {
  text: string;
  emphasis?: boolean;
  /** Renders as an animated count-up on scroll. */
  countUp?: { to: number; suffix: string };
};

export const hero = {
  /** Three-colour split — §6.1. */
  headline: {
    lead: "Reinstate Your",
    accent: "Google Business Profile",
    tail: "with Ease.",
  },
  subheadline:
    "We help with Google Business suspensions, verifications, new listing creation, rejected or denied appeals, missing options, and cases where you're stuck in a loop",
  ctaLabel: "Reinstate Now",
  ctaHref: "#contact",
  image: {
    src: "/images/hero-business-owner.webp",
    alt: "A florist on the phone at her laptop, sorting out her Google Business Profile",
    width: 1920,
    height: 1080,
  },
} as const;

export const trustStrip = {
  eyebrow: "Top brands trust us",
} as const;

export const problem = {
  heading: "Is Your Google Listing Suspended or Appeal Denied?",
  /**
   * §9 correction: the original promised "a guaranteed solution", which
   * contradicts FAQ #8. Changed to "a proven solution".
   */
  body: "Dealing with Google Business Profile suspension can be frustrating and disruptive to your business. Google's system is actively working to combat fake and misleading listings, but don't worry – your business is safe and can be back online. With over 6 years of experience managing GMB profiles, we've successfully tackled these issues, offering business owners a proven solution and a seamless reinstatement process.",
  ctaLabel: "Make Live Now",
  ctaHref: "#contact",
  image: {
    src: "/images/google-listing-suspended.webp",
    alt: "A smiling shop owner holding a phone showing their live Google Business Profile",
    width: 1200,
    height: 960,
  },
} as const;

export const method = {
  heading: "How do we do it?",
  paragraphs: [
    [
      {
        text: "You can attempt to reinstate your Google Listing on your own for free, but it can be a lengthy process. If unsuccessful, it could take more than 30 days – or even longer. Plus, errors along the way could set you back another 10 days. In fact, ",
      },
      { text: "75%", emphasis: true, countUp: { to: 75, suffix: "%" } },
      { text: " of business owners don't succeed on their first try." },
    ],
    [
      { text: "Let us speed up your reinstatement. Most of our clients (" },
      { text: "90%", emphasis: true, countUp: { to: 90, suffix: "%" } },
      { text: ") have their listings restored in " },
      { text: "just 3 to 10 business days", emphasis: true },
      {
        text: ". We deliver results and are the perfect partner to help you get your Google Business Profile back on track.",
      },
    ],
  ] satisfies TextSegment[][],
  ctaLabel: "Reinstate Now",
  ctaHref: "#contact",
} as const;

export const process = {
  heading: "How We Get Started",
  image: {
    src: "/images/reinstatement-consultation.webp",
    alt: "Two shop owners reviewing their reinstatement case on a tablet",
    width: 1200,
    height: 675,
  },
  steps: [
    {
      title: "Consultation",
      body: "Sign up and fill out our easy questionnaire. Once completed, we'll immediately kick off the reinstatement process.",
    },
    {
      title: "Review and Strategy",
      body: "We'll conduct a detailed review of your case, profile, and documents, then craft a tailored strategy to ensure a smooth reinstatement.",
    },
    {
      title: "Submission and Follow-Up",
      body: "Our team handles the submission and communicates directly with Google to address any issues swiftly and effectively.",
    },
  ],
} as const;

export const videoSection = {
  heading: "Hear from the Business Owners",
} as const;

export const teamSection = {
  heading: "Know Your Digital Partner",
  body: "At Reinstate GBP, we're not just another service provider – we're your trusted partner in the digital world. With over 6 years of experience in digital marketing, our team is committed to helping your business thrive through personalized Google Business Profile management.",
} as const;

/** §9 correction: the original rendered this as "Frequetly Asked Questions". */
export const faqSection = {
  heading: "Frequently Asked Questions",
} as const;

export const contactSection = {
  heading: "Speak to our Experts",
  intro:
    "Tell us what happened to your listing and we'll come back to you with a clear read on your case — usually the same business day.",
  successHeading: "Thanks — we've got it.",
  successBody:
    "Your details are with our team. We'll review your case and reply, usually within one business day. If it's urgent, call us and we'll pick it up straight away.",
  errorBody:
    "Something went wrong sending your message. Please try again, or call us and we'll take your details over the phone.",
} as const;
