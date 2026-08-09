export type TeamMember = {
  name: string;
  role: string;
  image: string;
};

/**
 * §6.7. Roles carry two of the §9 corrections:
 *   "Client Commuication" → "Client Communication"
 *   "SE0" (with a zero)   → "SEO"
 *
 * Headshots are 300×300 WebP, displayed as 140px rounded squares. Replace a
 * file at the same path to swap someone's photo; keep them square so the
 * `object-cover` crop stays predictable.
 */
export const team: TeamMember[] = [
  { name: "Tim", role: "Client Communication", image: "/images/team/tim.webp" },
  { name: "Dilip", role: "GBP & Client Success", image: "/images/team/dilip.webp" },
  { name: "Sophie", role: "SEO", image: "/images/team/sophie.webp" },
  { name: "Prakash", role: "Local SEO Expert", image: "/images/team/prakash.webp" },
];
