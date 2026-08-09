export const about = {
  hero: {
    eyebrow: "About us",
    headline: { lead: "Know your", accent: "digital partner", tail: "" },
    subheadline:
      "Six years, one specialism: getting Google Business Profiles back online and keeping them there.",
  },
  story: {
    heading: "We do one thing, and we do it constantly",
    paragraphs: [
      "Reinstate GBP started inside a digital marketing agency, where suspended listings kept landing on our desk. Clients would arrive having already lost weeks to the reinstatement form — appealing, waiting, getting rejected, appealing again with the same case. The pattern repeated often enough that it stopped looking like bad luck and started looking like a process problem.",
      "So we built the process. What triggers a suspension in each category. What evidence a reviewer actually weighs. Which cases belong in the standard form and which need a different channel entirely. Six years of doing this daily has turned into a body of knowledge you cannot get from Google's documentation, because Google does not publish it.",
      "Today that is all we do. Suspensions, verifications, denied appeals and new listings — for florists, dentists, locksmiths, medical centres, tour operators and trades, across the US, the UK, Europe and India.",
    ],
  },
  values: {
    heading: "How we work",
    items: [
      {
        title: "We tell you if your case is weak",
        body: "If we review your profile and think reinstatement is unlikely, we say so before you pay us. We would rather lose the job than take money for an appeal that cannot land.",
      },
      {
        title: "We fix the profile before we appeal",
        body: "Filing an appeal while the violation is still live guarantees a rejection and burns an attempt. Corrections come first, in the right order — every time.",
      },
      {
        title: "You hear from us at every stage",
        body: "Submitted, escalated, responded to, decided. You get an update when something moves, not a monthly silence broken by a status request.",
      },
      {
        title: "We don't promise what isn't ours to promise",
        body: "Google makes the reinstatement decision. Anyone guaranteeing an outcome is guaranteeing something they don't control. We guarantee the work.",
      },
    ],
  },
  stats: [
    { value: "6+", label: "Years on GBP cases" },
    { value: "90%", label: "Restored in 3–10 business days" },
    { value: "7", label: "Brands featured on this page" },
  ],
} as const;
