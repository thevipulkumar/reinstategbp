import type { FaqItem } from "./faqs";

export type Service = {
  slug: string;
  /** Short label for nav and footer. */
  navLabel: string;
  navDescription: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  hero: {
    eyebrow: string;
    headline: { lead: string; accent: string; tail: string };
    subheadline: string;
    ctaLabel: string;
  };
  overview: {
    heading: string;
    paragraphs: string[];
  };
  symptoms: {
    heading: string;
    intro: string;
    items: { title: string; body: string }[];
  };
  process: {
    heading: string;
    intro: string;
    steps: { title: string; body: string }[];
  };
  outcome: {
    heading: string;
    body: string;
  };
  faqs: FaqItem[];
};

export const services: Service[] = [
  /* ------------------------------------------------------------------------ */
  {
    slug: "gbp-suspension-reinstatement",
    navLabel: "GBP Suspension Reinstatement",
    navDescription: "Your listing vanished from Search and Maps. We get it back.",
    metaTitle: "Google Business Profile Suspension Reinstatement Service",
    metaDescription:
      "Suspended Google Business Profile? We build and file the appeal that gets listings reinstated — most restored in 3 to 10 business days. Talk to a GBP specialist today.",
    keywords: [
      "google business profile suspended",
      "gmb suspension reinstatement",
      "reinstate suspended google listing",
      "google my business suspended appeal",
      "business profile removed from google maps",
    ],
    hero: {
      eyebrow: "Suspension reinstatement",
      headline: {
        lead: "Your listing is suspended.",
        accent: "We get it reinstated",
        tail: "— fast.",
      },
      subheadline:
        "A suspension pulls your business off Google Search and Maps overnight. Every hour it stays down is a call you don't get. We handle the appeal end to end, so you can go back to running the business.",
      ctaLabel: "Reinstate Now",
    },
    overview: {
      heading: "What a suspension actually means",
      paragraphs: [
        "A suspension is Google's automated trust system deciding that something about your profile doesn't hold up. It is rarely a punishment for anything you did deliberately — most suspensions are triggered by a data mismatch, a category that reads as spam in your industry, or an edit made at the wrong moment.",
        "There are two kinds. A soft suspension leaves your listing visible but strips your ability to manage it. A hard suspension removes the profile from Search and Maps entirely, along with every review you have ever earned. The second is what most business owners are looking at when they find us.",
        "Either way, the fix is the same in shape: work out what tripped the system, assemble evidence that answers it directly, and put that in front of a reviewer in the form Google expects. Guesswork burns appeals — and every rejected appeal makes the next one harder.",
      ],
    },
    symptoms: {
      heading: "Why Google suspended you",
      intro:
        "In six years of reinstatements, almost every case we see traces back to one of these. Recognising yours is the first step in the appeal.",
      items: [
        {
          title: "Address that doesn't match how you trade",
          body: "A virtual office, a co-working desk, a PO box, or a residential address on a profile set to show its location. Google cross-references your address against its own data, and a mismatch reads as a fake listing.",
        },
        {
          title: "Business name stuffed with keywords",
          body: "Adding a service or a city to your legal name — \"Miller Plumbing Emergency 24/7 Chicago\" — is one of the fastest routes to a suspension. Your name on Google must match the name on your signage and paperwork.",
        },
        {
          title: "Too many edits at once",
          body: "Changing the name, address, category and phone number in a short window looks like a hijacked profile. Bulk edits after ownership changes are a very common trigger.",
        },
        {
          title: "A category Google treats as high-risk",
          body: "Locksmiths, towing, garage doors, addiction treatment, legal and home repair are policed far more aggressively than most. Legitimate businesses in these categories get caught constantly.",
        },
        {
          title: "Service-area setup that contradicts itself",
          body: "Listing a storefront address while also declaring a wide service area, or claiming a radius you can't plausibly serve, puts your profile in conflict with itself.",
        },
        {
          title: "Duplicate or overlapping listings",
          body: "An old profile from a previous owner, a second listing created by an agency, or a practitioner listing that overlaps the business listing will pull down the profile you actually use.",
        },
        {
          title: "Review activity that looks manufactured",
          body: "A sudden run of five-star reviews, reviews from accounts with no history, or an incentivised review campaign will flag the profile even when the reviews are from genuine customers.",
        },
      ],
    },
    process: {
      heading: "How we get your listing back",
      intro: "Three steps. You do the first one; we do the rest.",
      steps: [
        {
          title: "Consultation",
          body: "You fill in a short questionnaire about your business, your address setup and what changed before the suspension. That's the only work on your side. We start the same day it lands.",
        },
        {
          title: "Review and Strategy",
          body: "We audit the profile against Google's guidelines line by line, identify the specific violation the system flagged, and pull together the documentation that answers it — registration, utility bills, signage photographs, whatever your case calls for.",
        },
        {
          title: "Submission and Follow-Up",
          body: "We file the reinstatement request with the evidence attached, then stay on Google Support until a decision is made — escalating, clarifying and resubmitting where needed. You get an update at every stage.",
        },
      ],
    },
    outcome: {
      heading: "What reinstatement looks like",
      body: "Most profiles we take on are restored within 3 to 10 business days, with reviews, photos and ranking history intact. Once you're back, we'll tell you exactly which parts of your setup are still fragile — because a reinstated profile that gets suspended again in a month solves nothing.",
    },
    faqs: [
      {
        question: "Will I lose my reviews if my profile is reinstated?",
        answer: [
          "No. A reinstated profile comes back with its reviews, photos, posts and ranking history attached — it is the same profile, switched back on. That is exactly why appealing beats creating a replacement listing.",
          "Reviews are only lost when a suspended profile is deleted and rebuilt from scratch, which is why we almost never recommend that route.",
        ],
      },
      {
        question: "How many times can I appeal a suspension?",
        answer: [
          "There is no published hard limit, but appeals are not free attempts. Each rejected appeal makes the profile look worse to the review system, and repeated identical submissions tend to be closed quickly without a fresh look.",
          "This is why the first appeal matters most, and why filing one without knowing what triggered the suspension is a costly way to find out.",
        ],
      },
      {
        question: "Can I keep trading while my profile is suspended?",
        answer: [
          "Yes — your website, ads and every other channel are unaffected. What you lose is your presence in Google Maps and the local pack, which for most local businesses is a large share of inbound calls.",
        ],
      },
      {
        question: "My profile was suspended right after I updated my address. Why?",
        answer: [
          "Address changes are one of the most scrutinised edits on Google Business Profile, because they are the standard move in listing fraud. A legitimate relocation frequently trips the filter, particularly if the new address has been associated with another business.",
          "These cases usually reinstate cleanly, because the evidence is straightforward: a lease, a utility bill and signage photographs at the new location.",
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------------ */
  {
    slug: "gbp-verification",
    navLabel: "GBP Verification",
    navDescription: "Stuck in video verification, or waiting on a postcard that never came.",
    metaTitle: "Google Business Profile Verification Help — Video & Postcard",
    metaDescription:
      "Failed video verification? Postcard never arrived? Stuck in a verification loop? We get Google Business Profiles verified, including hard categories and service-area businesses.",
    keywords: [
      "google business profile verification failed",
      "gbp video verification help",
      "google verification postcard not received",
      "stuck in verification loop google business",
      "verify google business profile service area",
    ],
    hero: {
      eyebrow: "Verification",
      headline: {
        lead: "Verification keeps failing?",
        accent: "We get profiles verified",
        tail: "— including the hard ones.",
      },
      subheadline:
        "Video verification rejected without a reason. A postcard that never arrives. A verification option that has quietly disappeared from your dashboard. We know what each of these means and how to clear it.",
      ctaLabel: "Get Verified",
    },
    overview: {
      heading: "Verification is where most profiles quietly die",
      paragraphs: [
        "Verification used to be a postcard and a five-digit code. It is now a risk assessment, and Google has moved most categories to live video — recording your premises, your equipment, your signage and your proof of management in one unbroken take.",
        "The rules are strict and almost entirely undocumented. The video must be continuous. Your address must be legible on external signage or on a piece of mail at the location. Your tools, stock or workspace have to visibly match the category you selected. Miss one of these and the recording is rejected, usually with no explanation of which part failed.",
        "Service-area businesses, home-based businesses and anyone in a high-risk category get the strictest version of this process. Being genuine is not enough on its own — the recording has to prove it in the specific order a reviewer expects.",
      ],
    },
    symptoms: {
      heading: "Where verification goes wrong",
      intro:
        "If any of these describe your dashboard right now, the problem is usually fixable — but not by resubmitting the same thing again.",
      items: [
        {
          title: "Video verification rejected, no reason given",
          body: "By far the most common. The recording missed a required element — signage, address proof, or evidence you personally manage the business — and Google returns a bare rejection with nothing to act on.",
        },
        {
          title: "Postcard never arrived",
          body: "Postcards routinely fail for suite numbers, shared mailrooms and international addresses. There is a limit on how many you can request, and burning through them makes the profile look worse.",
        },
        {
          title: "No verification option appears at all",
          body: "The profile shows as unverified but offers no way to start. This usually means the listing has been flagged and the options have been withheld pending review — a different problem with a different fix.",
        },
        {
          title: "Stuck in the verification loop",
          body: "You verify, the profile goes live, and days later it drops back to unverified and asks again. This cycle points at a data conflict Google keeps re-detecting, and it will not resolve by repeating the process.",
        },
        {
          title: "Verified, then immediately suspended",
          body: "Verification passed and the suspension landed within hours. The recording satisfied the reviewer but something else on the profile — usually the name or the address setup — failed the automated check straight after.",
        },
        {
          title: "Home-based or service-area business",
          body: "You work from home or travel to customers, so there is no storefront to film. There is a correct way to verify these, and it is not the one the on-screen prompts suggest.",
        },
        {
          title: "You can't be there in person",
          body: "Video verification has to be recorded live at the business location by someone who can demonstrate management authority. Remote owners and multi-location operators need this planned properly in advance.",
        },
      ],
    },
    process: {
      heading: "How we get you verified",
      intro: "We prepare the submission before anything is filed, so the first attempt is the good one.",
      steps: [
        {
          title: "Consultation",
          body: "Tell us your category, your premises setup and exactly what has been tried so far. Which verification methods you have already burned through changes the strategy significantly.",
        },
        {
          title: "Review and Strategy",
          body: "We work out which verification route your profile should be on, then give you a shot-by-shot brief for the video: what to film, in what order, what has to be legible on camera, and what will get you rejected. Where documentation is the better route, we assemble that instead.",
        },
        {
          title: "Submission and Follow-Up",
          body: "We review your recording before it is submitted, file it, and follow up with Google Support if it stalls. If a rejection comes back, we diagnose the cause and prepare a corrected submission rather than resending the same one.",
        },
      ],
    },
    outcome: {
      heading: "What a verified profile gets you",
      body: "Verification is what puts you in the local pack and on Maps, and it unlocks reviews, messaging, posts and performance data. Once verified, we'll flag anything in your setup likely to trigger a re-verification request later, so you're not back here in three months.",
    },
    faqs: [
      {
        question: "How many times can I attempt video verification?",
        answer: [
          "Google does not publish a limit, but attempts are throttled in practice — after several rejections the option often disappears for a period, or the profile is routed to manual review.",
          "Because of that, preparing the recording properly before you film is worth far more than another quick attempt.",
        ],
      },
      {
        question: "What does the verification video need to show?",
        answer: [
          "In one continuous recording, without cuts: the outside of the location with street signage and a visible address, the surrounding street so the location can be placed, the inside of your workspace with the equipment or stock that matches your category, and proof you manage the business — keys, a till, back-office access, or branded documentation.",
          "The order matters and the shot has to stay unbroken. Stopping and restarting is one of the most common reasons a recording is rejected.",
        ],
      },
      {
        question: "I work from home. Can I still verify?",
        answer: [
          "Yes, but the profile has to be configured as a service-area business with the address hidden before you attempt it. Filming a residential address on a profile that displays its location is a reliable way to get rejected and flagged.",
          "Setting this up in the right order is most of the work in a home-based verification.",
        ],
      },
      {
        question: "My verification option disappeared. What does that mean?",
        answer: [
          "It usually means the profile has been flagged and Google has withheld verification pending an internal review — it is not a bug, and waiting rarely clears it.",
          "This is handled as a support case rather than a verification attempt, which is why resubmitting through the dashboard gets nowhere.",
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------------ */
  {
    slug: "appeal-denied",
    navLabel: "Denied Appeal Recovery",
    navDescription: "Your reinstatement request came back rejected. There is still a route.",
    metaTitle: "Google Business Profile Appeal Denied — Reinstatement Recovery",
    metaDescription:
      "Reinstatement request denied? A rejected appeal is not the end of the road. We rebuild denied cases with the evidence Google actually weighs and take them back through the right channel.",
    keywords: [
      "google business profile appeal denied",
      "gmb reinstatement request denied",
      "google business profile appeal rejected what next",
      "second appeal google business profile",
      "reinstatement appeal escalation",
    ],
    hero: {
      eyebrow: "Denied appeals",
      headline: {
        lead: "Appeal denied?",
        accent: "That is not the end",
        tail: "of the road.",
      },
      subheadline:
        "A rejection means the appeal didn't answer the objection — not that your business is finished on Google. We rebuild denied cases from the ground up and take them back through the right channel.",
      ctaLabel: "Reopen My Case",
    },
    overview: {
      heading: "Why appeals get denied",
      paragraphs: [
        "The reinstatement form is a narrow door. It asks you to state your case, and a reviewer decides in minutes whether what you submitted resolves the specific violation the system flagged. Most denials happen because the appeal answered a different question than the one being asked.",
        "The usual pattern: an owner explains that the business is real and has traded for fifteen years — all true, and all irrelevant if the flag was a keyword in the business name or an address that resolves to a mail-forwarding service. The reviewer sees an appeal that doesn't address the violation, and closes it.",
        "The second problem is compounding. Each denial is attached to the profile's history. Resubmitting the same appeal after a rejection is worse than not submitting at all — it reads as noise, gets closed faster, and pushes the case further from a genuine review.",
        "A denied appeal needs a different case, not a louder one. Sometimes it needs a different channel entirely.",
      ],
    },
    symptoms: {
      heading: "What we see in denied cases",
      intro:
        "If you have already been rejected once, one of these is almost certainly why.",
      items: [
        {
          title: "The appeal argued legitimacy, not compliance",
          body: "Years in business, tax records and a loyal customer base do not answer a guideline violation. The appeal has to address the specific rule the profile broke.",
        },
        {
          title: "The wrong violation was addressed",
          body: "Owners commonly fix the thing they assume was wrong. If the real trigger was a duplicate listing or a service-area conflict, an appeal about the address never reaches the actual objection.",
        },
        {
          title: "Evidence that doesn't prove what it needs to",
          body: "A certificate of incorporation proves a company exists. It says nothing about whether it operates at the address on the profile — which is usually the actual question.",
        },
        {
          title: "The violation was still live at submission",
          body: "Appealing while the keyword-stuffed name or the non-compliant address is still on the profile guarantees a denial. The violation has to be corrected before the appeal is filed, in the right order.",
        },
        {
          title: "Repeated identical resubmissions",
          body: "Three or four copies of the same appeal in a fortnight get auto-closed and mark the profile as a repeat filer, making a real review harder to obtain.",
        },
        {
          title: "Filed through the wrong channel",
          body: "Certain case types — bulk listings, chains, reseller-managed profiles, high-risk categories — are handled by different Google teams. The standard reinstatement form is the wrong door for them.",
        },
      ],
    },
    process: {
      heading: "How we recover a denied appeal",
      intro:
        "Denied cases need more forensic work up front than a first-time suspension, so the review stage is where most of the effort goes.",
      steps: [
        {
          title: "Consultation",
          body: "We need everything: the suspension notice, what you submitted, when you submitted it, and the exact wording that came back. The rejection language is the strongest signal we have about what the reviewer was actually looking at.",
        },
        {
          title: "Review and Strategy",
          body: "We reconstruct the case from scratch — identify the real violation, correct it on the profile first, then build an evidence package that speaks to that violation directly. Where the standard form is the wrong route, we identify the channel your case should go through instead.",
        },
        {
          title: "Submission and Follow-Up",
          body: "We file the rebuilt case, escalate where a case type warrants it, and pursue it through Google Support until you get a decision — not another silent close.",
        },
      ],
    },
    outcome: {
      heading: "Cases we take, and cases we don't",
      body: "Many denied appeals succeed on a properly rebuilt second attempt, and we've reinstated profiles that had already been rejected three or four times. But some cases genuinely are closed — repeat policy violations, or businesses that don't meet Google's eligibility rules at all. If yours is one of those, we'll tell you at the review stage rather than take your money for an appeal that cannot land.",
    },
    faqs: [
      {
        question: "How soon can I appeal again after a denial?",
        answer: [
          "There is no enforced waiting period, but filing immediately with an unchanged case is the worst option available. The profile's violation has to be corrected first, and the new appeal has to differ substantively from the one that was rejected.",
          "In practice the useful sequence is: fix the profile, let the corrections settle, then file a rebuilt case with fresh evidence.",
        ],
      },
      {
        question: "Does a denial mean the profile is gone permanently?",
        answer: [
          "Rarely. Most denials are procedural — the wrong evidence, the wrong violation addressed, or the wrong channel — rather than a final judgement on your business.",
          "Permanent removal is reserved for repeated policy breaches and businesses outside Google's eligibility rules, and it is normally stated in plain terms rather than left ambiguous.",
        ],
      },
      {
        question: "Should I just create a new listing instead?",
        answer: [
          "Almost never. A replacement listing starts with no reviews, no photos and no ranking history, and Google frequently detects it as an evasion of the suspension and removes it too — sometimes taking the new profile down within days.",
          "Recovering the original profile is nearly always the better outcome, and it is what we push for first.",
        ],
      },
      {
        question: "Can you tell me why my appeal was actually rejected?",
        answer: [
          "Usually, yes. Google's rejection wording is generic, but the combination of your category, address setup, edit history and the exact phrasing that came back narrows it down reliably. Diagnosing that correctly is the substance of the review stage.",
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------------ */
  {
    slug: "new-listing-creation",
    navLabel: "New Listing Creation",
    navDescription: "Set a new profile up correctly the first time, so it never gets flagged.",
    metaTitle: "New Google Business Profile Setup & Listing Creation Service",
    metaDescription:
      "Get a new Google Business Profile created, verified and optimised properly the first time — correct categories, compliant naming, and a setup built not to trigger a suspension.",
    keywords: [
      "create google business profile",
      "new gbp listing setup service",
      "add my business to google maps",
      "google business profile setup service",
      "second location google business profile",
    ],
    hero: {
      eyebrow: "New listings",
      headline: {
        lead: "A new profile,",
        accent: "set up right",
        tail: "the first time.",
      },
      subheadline:
        "Most suspensions we fix were built into the profile on day one — a keyword in the name, the wrong category, an address configured the wrong way. We create new listings that are correct from the start, then get them verified and live.",
      ctaLabel: "Create My Listing",
    },
    overview: {
      heading: "The setup decisions that decide everything later",
      paragraphs: [
        "Creating a Google Business Profile takes about ten minutes, which is exactly the problem. The choices made in those ten minutes — the exact business name, the primary category, whether the address is displayed or hidden, how the service area is drawn — determine both whether the profile survives Google's filters and what it ranks for.",
        "Getting them wrong is not a small cost. A profile that gets suspended in its first month may never verify cleanly again, and a badly chosen primary category can keep you out of the local pack for every search that matters to you, indefinitely.",
        "We build the profile properly, get it through verification, and populate it so it can actually compete — rather than leaving you a live but empty listing that ranks for nothing.",
      ],
    },
    symptoms: {
      heading: "When you need a listing built properly",
      intro: "These are the situations where a ten-minute DIY setup tends to cost the most.",
      items: [
        {
          title: "Opening a new business",
          body: "You are starting from nothing and want the profile right on the first attempt, with a category structure that competes from the day it goes live.",
        },
        {
          title: "Adding a second or third location",
          body: "Multi-location setups need consistent naming, correct location grouping and no overlap between profiles. Done casually, a new branch will cannibalise or suppress your existing listing.",
        },
        {
          title: "Relocating the business",
          body: "Moving is one of the highest-risk edits on Google Business Profile. Whether to move the existing profile or create a new one depends on the distance and the service area — and choosing wrong can cost your review history.",
        },
        {
          title: "A service-area business with no storefront",
          body: "Trades, mobile services and home-based businesses need the address hidden and the service area drawn deliberately. This is the single most common cause of first-month suspensions.",
        },
        {
          title: "A profile that was never claimed",
          body: "Google auto-generates listings from public data, so one may already exist for your business. Creating a second one alongside it produces a duplicate conflict that flags both.",
        },
        {
          title: "Taking over an existing business",
          body: "New ownership means the profile carries someone else's data, someone else's access and possibly an unresolved suspension. Transferring it needs to be done deliberately, not by editing everything at once.",
        },
        {
          title: "A high-risk category",
          body: "Locksmiths, towing, addiction services, legal and home repair are held to a stricter standard from the moment the profile is created. These need the documentation ready before you begin.",
        },
      ],
    },
    process: {
      heading: "How we build your listing",
      intro: "Same three steps — the work is front-loaded into getting the structure right.",
      steps: [
        {
          title: "Consultation",
          body: "We collect your legal business name, trading address, service area, hours and what you actually want to be found for. Then we check whether an unclaimed or duplicate listing already exists for you.",
        },
        {
          title: "Review and Strategy",
          body: "We select the primary and secondary categories against what your competitors rank for, settle the naming and address configuration to be compliant from day one, and prepare the verification evidence before the profile is created.",
        },
        {
          title: "Submission and Follow-Up",
          body: "We create the profile, take it through verification, and populate it — services, attributes, hours, description and photos — then confirm it is live and appearing in Maps.",
        },
      ],
    },
    outcome: {
      heading: "What you get at the end",
      body: "A verified, fully populated Google Business Profile that appears in Maps and the local pack, built on a structure that will not trip Google's filters. You get the login credentials and a short written summary of how it is configured and why — so any future edits don't undo the work.",
    },
    faqs: [
      {
        question: "How long does it take to get a new profile live?",
        answer: [
          "Creating and populating the profile takes a couple of days. Verification is the variable: video verification can clear in 48 hours, while postcards take one to two weeks and high-risk categories can take longer.",
          "We prepare everything in advance so verification is attempted once, properly, rather than repeatedly.",
        ],
      },
      {
        question: "Can I have more than one profile at the same address?",
        answer: [
          "Only in specific circumstances — genuinely distinct legal entities operating separately, or individual practitioners alongside a practice profile. Two profiles for the same business at one address is a duplicate, and Google will remove or merge them.",
          "Shared offices and multi-brand operators need this structured carefully before anything is created.",
        ],
      },
      {
        question: "Can I put my city or my main service in the business name?",
        answer: [
          "No. Your name on Google must match the name you actually trade under in the real world — on your signage, your invoices and your registration. Adding a location or a service to it is a direct guideline violation and one of the most common causes of suspension.",
          "The right way to rank for those terms is categories, services and your description, all of which we set up for you.",
        ],
      },
      {
        question: "I found a listing for my business I never created. What now?",
        answer: [
          "That is an auto-generated profile, built by Google from public data. You should claim it rather than create a new one — claiming preserves any reviews and history already attached to it.",
          "If someone else has claimed it, there is a formal ownership request process, and that is worth handling properly.",
        ],
      },
    ],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

export const serviceSlugs = services.map((service) => service.slug);
