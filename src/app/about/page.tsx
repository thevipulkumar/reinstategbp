import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/ui/JsonLd";
import { TeamSection } from "@/components/home/TeamSection";
import { ContactSection } from "@/components/contact/ContactSection";
import { about } from "@/data/about";
import { sharedHeadings } from "@/data/pages";
import { site } from "@/data/site";
import { breadcrumbSchema } from "@/lib/structured-data";

const title = `About ${site.name} — GBP Reinstatement Specialists`;
const description = `Six years of Google Business Profile reinstatements. Meet the team behind ${site.name} and how we work on suspended listings, verifications and denied appeals.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/about" },
  openGraph: { title, description, url: "/about", type: "website" },
  twitter: { title, description },
};

const crumbs = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow={about.hero.eyebrow}
        headline={about.hero.headline}
        subheadline={about.hero.subheadline}
        crumbs={crumbs}
      >
        <dl className="mt-12 grid max-w-[720px] grid-cols-3 gap-6">
          {about.stats.map((stat) => (
            <div key={stat.label}>
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="block text-[clamp(1.75rem,4vw,40px)] font-bold leading-none text-brand-light">
                  {stat.value}
                </span>
                <span className="mt-2 block text-[13px] leading-snug text-white/70">
                  {stat.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </PageHero>

      <Section tone="white">
        <div className="mx-auto max-w-[820px]">
          <Reveal>
            <h2 className="text-h2">{about.story.heading}</h2>
            <div className="mt-6 space-y-5 text-body">
              {about.story.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      <Section tone="surface">
        <Reveal>
          <h2 className="text-h2 text-center">{about.values.heading}</h2>
        </Reveal>

        <ul className="mt-12 grid gap-6 md:grid-cols-2">
          {about.values.items.map((item, index) => (
            <Reveal
              as="li"
              key={item.title}
              delay={(index % 2) * 70}
              className="rounded-card bg-white p-8 shadow-[0_2px_16px_rgba(0,0,0,0.04)]"
            >
              <h3 className="text-h3 text-brand">{item.title}</h3>
              <p className="mt-3 text-body">{item.body}</p>
            </Reveal>
          ))}
        </ul>
      </Section>

      <TeamSection />

      <ContactSection heading={sharedHeadings.contact} />

      <JsonLd data={breadcrumbSchema(crumbs)} />
    </>
  );
}
