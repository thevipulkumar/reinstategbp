import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <PageHero
        eyebrow="404"
        headline={{ lead: "We couldn't find", accent: "that page", tail: "" }}
        subheadline="The link may be out of date, or the page may have moved. Here's where most people are heading."
      />

      <Section tone="white">
        <ul className="grid gap-4 md:grid-cols-2">
          {services.map((service) => (
            <li key={service.slug}>
              <ButtonLink
                href={`/services/${service.slug}`}
                variant="onDark"
                fullWidth
                className="justify-between"
              >
                {service.navLabel}
              </ButtonLink>
            </li>
          ))}
        </ul>

        <div className="mt-10">
          <ButtonLink href="/">Back to the homepage</ButtonLink>
        </div>
      </Section>
    </>
  );
}
