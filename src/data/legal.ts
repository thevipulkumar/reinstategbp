import { site } from "./site";

export type LegalSection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
};

export type LegalDocument = {
  title: string;
  description: string;
  /** ISO date — rendered as "Last updated". */
  updated: string;
  intro: string[];
  sections: LegalSection[];
};

/**
 * Plain-language policies covering how this site actually behaves: a contact
 * form that emails a lead, and Google Tag Manager. Have a lawyer review before
 * launch — this is a starting point written to match the build, not legal advice.
 */
export const privacyPolicy: LegalDocument = {
  title: "Privacy Policy",
  description: `How ${site.name} collects, uses and protects the information you share with us.`,
  updated: "2026-08-09",
  intro: [
    `This policy explains what ${site.name} does with the information you give us through this website, and what we collect automatically when you visit. We have tried to write it in plain language rather than legal boilerplate.`,
    `If you have a question about anything here, email us at ${site.email} and we will answer it.`,
  ],
  sections: [
    {
      heading: "Information you give us",
      paragraphs: [
        "When you submit our contact form, we collect the details you enter: your first name, last name, email address, phone number and the message you write. We use these to respond to your enquiry and, if you become a client, to work on your case.",
      ],
      bullets: [
        "We do not sell your information, and we do not share it with third parties for marketing.",
        "We only contact you about the enquiry you made, unless you separately ask to hear from us.",
        "Where we act on your behalf with Google, we share only what your case requires.",
      ],
    },
    {
      heading: "Information collected automatically",
      paragraphs: [
        "This site uses Google Tag Manager, which loads Google Analytics. That collects standard analytics data — pages viewed, approximate location, device and browser type, and how you arrived at the site — so we can understand which pages are useful.",
        "We also record the IP address of contact form submissions, briefly, to rate-limit automated spam. It is not used for anything else.",
      ],
    },
    {
      heading: "Cookies",
      paragraphs: [
        "Cookies set by this site come from Google Tag Manager and Google Analytics. We do not use advertising cookies on this site.",
        "You can block or delete cookies through your browser settings. The site works normally without them.",
      ],
    },
    {
      heading: "Third parties we use",
      bullets: [
        "Resend — delivers contact form submissions to our inbox and sends your confirmation email.",
        "Google Tag Manager and Google Analytics — website analytics.",
        "Vercel — hosts this website and processes standard server request logs.",
        "YouTube — video testimonials load only after you click a thumbnail, and are embedded in privacy-enhanced mode.",
      ],
    },
    {
      heading: "How long we keep your data",
      paragraphs: [
        "Enquiries that do not become clients are deleted from our inbox within 24 months. Client case records are kept for as long as we are engaged and for six years afterwards, which covers our accounting and dispute-resolution obligations.",
      ],
    },
    {
      heading: "Your rights",
      paragraphs: [
        "You can ask us for a copy of the information we hold about you, ask us to correct it, or ask us to delete it. Depending on where you live you may have additional rights under the GDPR, the UK GDPR or the CCPA.",
      ],
      bullets: [
        `Email ${site.email} with your request.`,
        "We will respond within 30 days.",
        "We will not charge you for a reasonable request or treat you differently for making one.",
      ],
    },
    {
      heading: "Security",
      paragraphs: [
        "This site is served over HTTPS, and form submissions are transmitted encrypted. No system is perfectly secure, so please do not send passwords or Google account credentials through the contact form — we will never ask for them by email.",
      ],
    },
    {
      heading: "Children",
      paragraphs: [
        "This is a service for business owners. It is not directed at anyone under 16, and we do not knowingly collect information from children.",
      ],
    },
    {
      heading: "Changes to this policy",
      paragraphs: [
        "If we change how we handle your information, we will update this page and change the date at the top. Material changes will be flagged clearly rather than made quietly.",
      ],
    },
  ],
};

export const termsOfService: LegalDocument = {
  title: "Terms of Service",
  description: `The terms that apply when you use this website or engage ${site.name}.`,
  updated: "2026-08-09",
  intro: [
    `These terms apply to your use of this website and to any work ${site.name} carries out for you. Engaging us means you accept them.`,
  ],
  sections: [
    {
      heading: "What we do",
      paragraphs: [
        "We provide consultancy on Google Business Profile suspensions, verifications, denied appeals and new listing creation. We act on your behalf in preparing and submitting material to Google and in following up on your case.",
      ],
    },
    {
      heading: "What we are not",
      paragraphs: [
        `${site.name} is an independent service. We are not Google, we are not affiliated with, endorsed by or acting as an agent of Google LLC, and we have no special access to Google's systems.`,
        "Google, Google Business Profile, Google My Business and Google Maps are trademarks of Google LLC.",
      ],
    },
    {
      heading: "No guarantee of outcome",
      paragraphs: [
        "Reinstatement, verification and listing approval decisions are made solely by Google. We cannot and do not guarantee any particular outcome, timeframe or ranking.",
        "What we commit to is the work: a thorough review, a properly evidenced submission, and follow-up with Google until your case reaches a decision. Any statistics on this site describe past results and are not a promise about yours.",
      ],
    },
    {
      heading: "Your responsibilities",
      bullets: [
        "The information and documents you give us must be accurate and genuinely yours.",
        "You must have the authority to act for the business whose profile we are working on.",
        "You need to respond to requests for information promptly — cases stall without it.",
        "You must not ask us to submit anything false or misleading to Google. We will decline and end the engagement.",
      ],
    },
    {
      heading: "Fees and payment",
      paragraphs: [
        "Fees are agreed in writing before work begins and depend on the case. Payment terms are set out in that agreement.",
        "If we determine at the review stage that your case cannot realistically succeed, we will tell you before taking payment.",
      ],
    },
    {
      heading: "Limitation of liability",
      paragraphs: [
        "To the fullest extent permitted by law, our total liability arising from our services is limited to the fees you have paid us for the work in question.",
        "We are not liable for indirect or consequential losses, including lost revenue, lost customers or lost rankings resulting from a Google decision.",
      ],
    },
    {
      heading: "Website content",
      paragraphs: [
        "The content on this site is provided for general information and does not constitute legal or professional advice for your specific situation. We keep it accurate but cannot promise it is complete or current at every moment.",
        "Text, design and graphics on this site belong to us. Client logos and testimonials remain the property of their respective owners and are used with permission.",
      ],
    },
    {
      heading: "Ending the engagement",
      paragraphs: [
        "Either side can end an engagement in writing. Fees for work already carried out remain payable. We will return your documents and hand over anything relevant to your case.",
      ],
    },
    {
      heading: "Contact",
      paragraphs: [
        `Questions about these terms: email ${site.email} or call ${site.phoneDisplay}.`,
      ],
    },
  ],
};
