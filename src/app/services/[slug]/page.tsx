import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/ui/JsonLd";
import { FaqSection } from "@/components/FaqSection";
import { ContactSection } from "@/components/contact/ContactSection";
import { VideoTestimonials } from "@/components/home/VideoTestimonials";
import { getService, services } from "@/data/services";
import { breadcrumbSchema, serviceSchema } from "@/lib/structured-data";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) return {};

  const canonical = `/services/${service.slug}`;

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    keywords: [...service.keywords],
    alternates: { canonical },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: canonical,
      type: "website",
    },
    twitter: {
      title: service.metaTitle,
      description: service.metaDescription,
    },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) notFound();

  // No /services index page exists, so the trail goes straight from Home to the
  // service — an intermediate crumb pointing at this same URL would be a lie.
  const crumbs = [
    { name: "Home", href: "/" },
    { name: service.navLabel, href: `/services/${service.slug}` },
  ];

  return (
    <>
      <PageHero
        eyebrow={service.hero.eyebrow}
        headline={service.hero.headline}
        subheadline={service.hero.subheadline}
        ctaLabel={service.hero.ctaLabel}
        crumbs={crumbs}
      />

      {/* Overview */}
      <Section tone="white">
        <div className="mx-auto max-w-[820px]">
          <Reveal>
            <h2 className="text-h2">{service.overview.heading}</h2>
            <div className="mt-6 space-y-5 text-body">
              {service.overview.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Symptoms and causes */}
      <Section tone="surface">
        <Reveal className="mx-auto max-w-[760px] text-center">
          <h2 className="text-h2">{service.symptoms.heading}</h2>
          <p className="mt-5 text-body">{service.symptoms.intro}</p>
        </Reveal>

        <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {service.symptoms.items.map((item, index) => (
            <Reveal
              as="li"
              key={item.title}
              delay={(index % 3) * 70}
              className="rounded-card bg-white p-7 shadow-[0_2px_16px_rgba(0,0,0,0.04)]"
            >
              <CheckCircle2 aria-hidden="true" className="size-6 text-brand" />
              <h3 className="mt-4 text-[19px] font-semibold leading-snug">{item.title}</h3>
              <p className="mt-2.5 text-[15px] leading-relaxed text-body">{item.body}</p>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* Process */}
      <Section tone="white">
        <Reveal className="mx-auto max-w-[760px] text-center">
          <h2 className="text-h2">{service.process.heading}</h2>
          <p className="mt-5 text-body">{service.process.intro}</p>
        </Reveal>

        <ol className="mx-auto mt-12 grid max-w-[980px] gap-8 md:grid-cols-3">
          {service.process.steps.map((step, index) => (
            <Reveal as="li" key={step.title} delay={index * 80}>
              <span
                aria-hidden="true"
                className="flex size-11 items-center justify-center rounded-full bg-mint text-[18px] font-bold text-brand-dark"
              >
                {index + 1}
              </span>
              <h3 className="mt-5 text-h3 text-brand">{step.title}</h3>
              <p className="mt-2.5 text-body">{step.body}</p>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* Outcome */}
      <Section tone="white">
        <Reveal className="mx-auto max-w-[900px] rounded-card bg-mint px-6 py-12 text-center md:px-16 md:py-16">
          <h2 className="text-h2">{service.outcome.heading}</h2>
          <p className="mx-auto mt-5 max-w-[680px] text-body">{service.outcome.body}</p>
        </Reveal>
      </Section>

      <VideoTestimonials heading="Hear from the Business Owners" withSchema={false} />

      <FaqSection heading={`${service.navLabel} — questions we get asked`} items={service.faqs} />

      <ContactSection heading="Speak to our Experts" />

      <JsonLd data={[serviceSchema(service), breadcrumbSchema(crumbs)]} />
    </>
  );
}
