export type Testimonial = {
  /** YouTube video ID. */
  id: string;
  url: string;
  orientation: "short" | "landscape";
  /** TODO: client to supply — the real name shown under the video. */
  clientName: string;
  /** TODO: client to supply — e.g. "Dental clinic, Austin TX". */
  businessType: string;
};

/**
 * §6.6. Nothing loads from YouTube until a visitor clicks a thumbnail.
 *
 * `clientName` and `businessType` are intentionally TODO placeholders. Fill them
 * in and the card UI picks them up with no code change — a real name and
 * business type under each video measurably increases trust.
 */
export const testimonials: Testimonial[] = [
  {
    id: "69_etiFKk7k",
    url: "https://youtube.com/shorts/69_etiFKk7k",
    orientation: "short",
    clientName: "TODO: client name",
    businessType: "TODO: business type",
  },
  {
    id: "D4Fo-aBWNR4",
    url: "https://youtube.com/shorts/D4Fo-aBWNR4",
    orientation: "short",
    clientName: "TODO: client name",
    businessType: "TODO: business type",
  },
  {
    id: "bRjflWqlpmY",
    url: "https://youtube.com/shorts/bRjflWqlpmY",
    orientation: "short",
    clientName: "TODO: client name",
    businessType: "TODO: business type",
  },
  {
    id: "HQB7Eei3_LM",
    url: "https://youtu.be/HQB7Eei3_LM",
    orientation: "landscape",
    clientName: "TODO: client name",
    businessType: "TODO: business type",
  },
  {
    id: "a7DFHmJQCeE",
    url: "https://youtu.be/a7DFHmJQCeE",
    orientation: "landscape",
    clientName: "TODO: client name",
    businessType: "TODO: business type",
  },
  {
    id: "zc8oVko5H7Q",
    url: "https://youtu.be/zc8oVko5H7Q",
    orientation: "landscape",
    clientName: "TODO: client name",
    businessType: "TODO: business type",
  },
  {
    id: "XQfShwpgP-c",
    url: "https://youtu.be/XQfShwpgP-c",
    orientation: "landscape",
    clientName: "TODO: client name",
    businessType: "TODO: business type",
  },
];

export const shortTestimonials = testimonials.filter((t) => t.orientation === "short");
export const landscapeTestimonials = testimonials.filter((t) => t.orientation === "landscape");

/** True once the placeholders above have been replaced with real details. */
export function hasRealAttribution(testimonial: Testimonial): boolean {
  return !testimonial.clientName.startsWith("TODO");
}
