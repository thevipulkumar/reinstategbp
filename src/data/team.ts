export type TeamMember = {
  name: string;
  role: string;
  image: string;
  /** True while a real 150×150 headshot is still missing from the asset folder. */
  isPlaceholder?: boolean;
};

/**
 * §6.7. Roles carry two of the §9 corrections:
 *   "Client Commuication" → "Client Communication"
 *   "SE0" (with a zero)   → "SEO"
 */
export const team: TeamMember[] = [
  { name: "Tim", role: "Client Communication", image: "/images/team/tim.svg", isPlaceholder: true },
  {
    name: "Dilip",
    role: "GBP & Client Success",
    image: "/images/team/dilip.svg",
    isPlaceholder: true,
  },
  { name: "Sophie", role: "SEO", image: "/images/team/sophie.svg", isPlaceholder: true },
  {
    name: "Prakash",
    role: "Local SEO Expert",
    image: "/images/team/prakash.svg",
    isPlaceholder: true,
  },
];
