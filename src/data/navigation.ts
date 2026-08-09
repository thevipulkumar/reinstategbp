import { services } from "./services";

export type NavLink = {
  label: string;
  href: string;
  description?: string;
  children?: NavLink[];
};

export const primaryNav: NavLink[] = [
  {
    label: "Services",
    href: "/services/gbp-suspension-reinstatement",
    children: services.map((service) => ({
      label: service.navLabel,
      href: `/services/${service.slug}`,
      description: service.navDescription,
    })),
  },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export const footerServiceLinks: NavLink[] = services.map((service) => ({
  label: service.navLabel,
  href: `/services/${service.slug}`,
}));

export const legalNav: NavLink[] = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms" },
];
