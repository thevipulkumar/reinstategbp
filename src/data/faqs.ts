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

const TODO = "TODO: paste the answer copy for this question.";

/**
 * §6.8 — the eight homepage FAQs.
 *
 * Answers are placeholders pending the client's copy, except #8: §9 requires the
 * honest "we cannot guarantee reinstatement" position to stand, because the rest
 * of the site no longer promises a guarantee. Do not soften it.
 *
 * The accordion renders whatever is in `answer` / `bullets` / `answerAfterBullets`,
 * so replacing the strings below is the whole job — no component changes needed.
 */
export const homepageFaqs: FaqItem[] = [
  {
    question: "What leads to the suspension of a Google Business Profile?",
    answer: [TODO],
  },
  {
    question: "How long does it take to get my Google Business Profile reinstated?",
    answer: [TODO],
  },
  {
    question: "What documents are required for the reinstatement process?",
    answer: [TODO],
    bullets: [
      { title: "Proof of Business Operation", body: TODO },
      { title: "Legal Documentation", body: TODO },
      { title: "Photographic Evidence", body: TODO },
    ],
  },
  {
    question: "How does your team work with Google Support for profile reinstatement?",
    answer: [TODO],
  },
  {
    question: "Can I manage my Google Business Profile while it's suspended?",
    answer: [TODO],
  },
  {
    question: "How can I prevent future suspensions of my Google Business Profile?",
    answer: [TODO],
  },
  {
    question: "How often will I receive updates during the reinstatement process?",
    answer: [TODO],
  },
  {
    question: "Do you guarantee the reinstatement of my Google Business Profile?",
    answer: [
      "No — and we would be careful of anyone who does. Reinstatement decisions are made by Google alone, and no third party can commit to an outcome on Google's behalf.",
      "What we can commit to is the work: a thorough review of your profile and its suspension history, an appeal built on the evidence Google actually weighs, and direct follow-up with Google Support until your case reaches a decision. That approach is why the large majority of the profiles we take on are restored, most of them within 3 to 10 business days.",
      "If we review your case and believe reinstatement is unlikely, we will tell you before you pay us anything.",
    ],
  },
];
