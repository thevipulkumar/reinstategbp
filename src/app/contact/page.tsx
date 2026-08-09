import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { JsonLd } from "@/components/ui/JsonLd";
import { ContactSection } from "@/components/contact/ContactSection";
import { FaqSection } from "@/components/FaqSection";
import { homepageFaqs } from "@/data/faqs";
import { contactPage, sharedHeadings } from "@/data/pages";
import { site } from "@/data/site";
import { breadcrumbSchema } from "@/lib/structured-data";

const title = "Contact Us — Talk to a GBP Reinstatement Specialist";
const description = `Tell us what happened to your Google Business Profile and we'll come back with a clear read on your case. Call ${site.phoneDisplay} or send us the details.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/contact" },
  openGraph: { title, description, url: "/contact", type: "website" },
  twitter: { title, description },
};

const crumbs = [
  { name: "Home", href: "/" },
  { name: "Contact", href: "/contact" },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow={contactPage.eyebrow}
        headline={contactPage.headline}
        subheadline={contactPage.subheadline}
        crumbs={crumbs}
      />

      <ContactSection heading={sharedHeadings.contact} />

      <FaqSection
        heading={contactPage.faqHeading}
        items={homepageFaqs.slice(0, 4)}
        withSchema={false}
      />

      <JsonLd data={breadcrumbSchema(crumbs)} />
    </>
  );
}
