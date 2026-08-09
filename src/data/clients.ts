export type ClientLogo = {
  name: string;
  src: string;
  width: number;
  height: number;
};

/** §6.2 trust strip. Rendered greyscale at 70% opacity, full colour on hover. */
export const clientLogos: ClientLogo[] = [
  { name: "PD Handy", src: "/logo/clients/pd-handy.svg", width: 380, height: 130 },
  { name: "Loyalty", src: "/logo/clients/loyalty.webp", width: 380, height: 130 },
  { name: "TV Workshop", src: "/logo/clients/tv-workshop.webp", width: 380, height: 130 },
  { name: "inspraGO", src: "/logo/clients/insprago.webp", width: 380, height: 130 },
  { name: "lativ", src: "/logo/clients/lativ.webp", width: 380, height: 130 },
  {
    name: "YASMED — Abris Medical Center",
    src: "/logo/clients/yasmed.webp",
    width: 380,
    height: 130,
  },
  { name: "Trek on India", src: "/logo/clients/trek-on-india.webp", width: 380, height: 130 },
];
