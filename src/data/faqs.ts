export type FaqBullet = {
  title: string;
  body?: string;
};

export type FaqItem = {
  question: string;
  /** One entry per paragraph. Rendered in order, above `bullets`. */
  answer: string[];
  /** Optional sub-list rendered after the paragraphs. */
  bullets?: FaqBullet[];
  /** Trailing paragraphs rendered after `bullets`. */
  answerAfterBullets?: string[];
};

/**
 * §6.8 — the eight homepage FAQs.
 *
 * Answer #8 deliberately states that reinstatement cannot be guaranteed. §9
 * requires that honest position to stand, because the rest of the site no
 * longer promises a guarantee. Do not soften it.
 */
export const homepageFaqs: FaqItem[] = [
  {
    question: "What leads to the suspension of a Google Business Profile?",
    answer: [
      "Google can suspend your business listing for various reasons. At Reinstate GBP, our experienced team carefully examines your case to determine the specific cause of the suspension. We then create a customised plan to get your profile reinstated. We understand the importance of your online presence and are committed to guiding you through Google's detailed policies to quickly and effectively restore your business listing.",
    ],
  },
  {
    question: "How long does it take to get my Google Business Profile reinstated?",
    answer: [
      "The time frame for reinstating a Google Business Profile can vary depending on the complexity of the suspension and Google's review process. It can take anywhere from a few days to several weeks. At Reinstate GBP, we use our knowledge and established communication channels with Google to expedite your reinstatement as quickly as possible. Our proactive approach ensures the fastest turnaround, knowing how crucial it is to minimize business downtime. We'll keep you updated throughout the process, so you're always informed of the status.",
    ],
  },
  {
    question: "What documents are required for the reinstatement process?",
    answer: [
      "The documentation needed for reinstatement depends on the cause of the suspension and the specific details of your business. Commonly required documents include:",
    ],
    bullets: [
      {
        title: "Proof of Business Operation",
        body: "Such as a business license, tax filings, utility bills, or lease agreements that confirm your business name and address.",
      },
      {
        title: "Legal Documentation",
        body: "Government-issued ID, business registration paperwork, or other legal documents proving your business's legitimacy.",
      },
      {
        title: "Photographic Evidence",
        body: "Photos of your storefront, signage displaying your business name and address, and interior shots showing your business in operation.",
      },
    ],
    answerAfterBullets: [
      "At Reinstate GBP, we guide you through gathering and submitting the correct documentation to build a strong appeal to Google. Our goal is to streamline the process, ensuring we present a compelling case on your behalf.",
    ],
  },
  {
    question: "How does your team work with Google Support for profile reinstatement?",
    answer: [
      "We engage with Google Support through established channels designed for handling business profile issues. Our team leverages direct support contacts, official appeal forms, and detailed document submissions to advocate for your business. We maintain thorough records of our communications and ensure that all correspondence with Google is professional and precise. This strategic approach helps us effectively navigate Google's support system, increasing the likelihood of a successful reinstatement.",
    ],
  },
  {
    question: "Can I manage my Google Business Profile while it's suspended?",
    answer: [
      "During suspension, your access to managing your profile through Google My Business will be limited. You may not be able to update business information or respond to reviews until the issue is resolved. Our team will advise you on what steps you can take during this period and work diligently to restore full access.",
    ],
  },
  {
    question: "How can I prevent future suspensions of my Google Business Profile?",
    answer: [
      "To avoid future suspensions, it's essential to comply with Google's guidelines, ensuring your business information is accurate and up-to-date. Properly managing reviews and avoiding practices that could be seen as manipulative or deceptive are key to staying in good standing. We offer ongoing advisory services to help ensure your profile remains compliant and protected against future issues.",
    ],
  },
  {
    question: "How often will I receive updates during the reinstatement process?",
    answer: [
      "We understand how important it is to stay informed. Typically, we provide weekly updates, though we can adjust the frequency based on your preferences and the specifics of your case. Our team is always available to answer any questions or concerns you may have between updates.",
    ],
  },
  {
    question: "Do you guarantee the reinstatement of my Google Business Profile?",
    answer: [
      "While we work diligently to secure a positive outcome, we cannot guarantee reinstatement due to the unique nature of each case and Google's discretion in making final decisions. However, our expertise, proven processes, and transparency ensure we present the strongest possible case for your reinstatement. We're proud of our high success rate and remain committed to providing honest and realistic expectations throughout the process.",
    ],
  },
];
