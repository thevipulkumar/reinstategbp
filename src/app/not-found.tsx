import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { notFoundPage } from "@/data/pages";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <PageHero
        eyebrow={notFoundPage.eyebrow}
        headline={notFoundPage.headline}
        subheadline={notFoundPage.subheadline}
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
          <ButtonLink href="/">{notFoundPage.homeLabel}</ButtonLink>
        </div>
      </Section>
    </>
  );
}
