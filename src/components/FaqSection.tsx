import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/ui/JsonLd";
import { FaqAccordion } from "@/components/FaqAccordion";
import type { FaqItem } from "@/data/faqs";
import { faqSchema } from "@/lib/structured-data";

export function FaqSection({
  heading,
  items,
  /** Emit FAQPage structured data. Only one page should claim a given question set. */
  withSchema = true,
}: {
  heading: string;
  items: FaqItem[];
  withSchema?: boolean;
}) {
  return (
    <Section id="faq" tone="mint-pale">
      <Reveal>
        <h2 className="text-h2 text-center">{heading}</h2>
      </Reveal>

      <Reveal className="mx-auto mt-12 max-w-[860px]">
        <FaqAccordion items={items} />
      </Reveal>

      {withSchema ? <JsonLd data={faqSchema(items)} /> : null}
    </Section>
  );
}
