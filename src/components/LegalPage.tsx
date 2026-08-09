import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/ui/Section";
import { JsonLd } from "@/components/ui/JsonLd";
import type { LegalDocument } from "@/data/legal";
import { breadcrumbSchema } from "@/lib/structured-data";
import { legalPage } from "@/data/pages";
import { formatDate } from "@/lib/utils";

export function LegalPage({ doc, href }: { doc: LegalDocument; href: string }) {
  const crumbs = [
    { name: "Home", href: "/" },
    { name: doc.title, href },
  ];

  return (
    <>
      <PageHero
        eyebrow={legalPage.eyebrow}
        headline={{ lead: doc.title, accent: "", tail: "" }}
        subheadline={doc.description}
        crumbs={crumbs}
      />

      <Section tone="white">
        <div className="mx-auto max-w-[760px]">
          <p className="text-[14px] font-semibold uppercase tracking-wide text-muted">
            {legalPage.updatedPrefix} {formatDate(doc.updated)}
          </p>

          <div className="prose-body mt-8">
            {doc.intro.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}

            {doc.sections.map((section) => (
              <section key={section.heading}>
                <h2>{section.heading}</h2>
                {section.paragraphs?.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
                {section.bullets?.length ? (
                  <ul>
                    {section.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>
        </div>
      </Section>

      <JsonLd data={breadcrumbSchema(crumbs)} />
    </>
  );
}
