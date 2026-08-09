import type { FaqItem } from "@/data/faqs";
import type { Post } from "@/lib/blog";
import type { Service } from "@/data/services";
import { ogImage, site } from "@/data/site";
import { absoluteUrl } from "@/lib/utils";

type Json = Record<string, unknown>;

const ORG_ID = `${site.url}/#organization`;
const SITE_ID = `${site.url}/#website`;

export function organizationSchema(): Json {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    logo: absoluteUrl(ogImage.url, site.url),
    image: absoluteUrl(ogImage.url, site.url),
    description: site.description,
    foundingDate: String(site.foundingYear),
    email: site.email,
    telephone: site.phoneDisplay,
    sameAs: [site.social.youtube],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: site.phoneDisplay,
        email: site.email,
        contactType: "customer support",
        availableLanguage: ["English"],
      },
    ],
  };
}

export function websiteSchema(): Json {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": SITE_ID,
    url: site.url,
    name: site.name,
    publisher: { "@id": ORG_ID },
  };
}

export function localBusinessSchema(): Json {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${site.url}/#localbusiness`,
    name: site.name,
    url: site.url,
    image: absoluteUrl(ogImage.url, site.url),
    description: site.description,
    telephone: site.phoneDisplay,
    email: site.email,
    priceRange: "$$",
    areaServed: [
      { "@type": "Country", name: "United States" },
      { "@type": "Country", name: "United Kingdom" },
      { "@type": "Country", name: "Canada" },
      { "@type": "Country", name: "Australia" },
      { "@type": "Country", name: "India" },
    ],
    knowsAbout: [
      "Google Business Profile suspension",
      "Google Business Profile verification",
      "Local SEO",
      "Google Maps listing reinstatement",
    ],
    parentOrganization: { "@id": ORG_ID },
  };
}

export function serviceSchema(service: Service): Json {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${site.url}/services/${service.slug}#service`,
    name: service.navLabel,
    serviceType: service.navLabel,
    description: service.metaDescription,
    url: `${site.url}/services/${service.slug}`,
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "Country", name: "United States" },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${service.navLabel} process`,
      itemListElement: service.process.steps.map((step, index) => ({
        "@type": "Offer",
        position: index + 1,
        name: step.title,
        description: step.body,
      })),
    },
  };
}

function faqAnswerText(item: FaqItem): string {
  const parts = [...item.answer];
  if (item.bullets) {
    parts.push(
      ...item.bullets.map((bullet) =>
        bullet.body ? `${bullet.title}: ${bullet.body}` : bullet.title,
      ),
    );
  }
  if (item.answerAfterBullets) parts.push(...item.answerAfterBullets);
  return parts.join(" ");
}

export function faqSchema(items: FaqItem[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faqAnswerText(item),
      },
    })),
  };
}

export function videoSchema(input: {
  id: string;
  name: string;
  description: string;
}): Json {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: input.name,
    description: input.description,
    thumbnailUrl: [`https://img.youtube.com/vi/${input.id}/maxresdefault.jpg`],
    uploadDate: `${site.foundingYear}-01-01`,
    embedUrl: `https://www.youtube-nocookie.com/embed/${input.id}`,
    contentUrl: `https://www.youtube.com/watch?v=${input.id}`,
    publisher: { "@id": ORG_ID },
  };
}

export function breadcrumbSchema(trail: { name: string; href: string }[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.href, site.url),
    })),
  };
}

export function articleSchema(post: Post): Json {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Organization", name: post.author, url: site.url },
    publisher: { "@id": ORG_ID },
    mainEntityOfPage: `${site.url}/blog/${post.slug}`,
    image: absoluteUrl(post.image ?? ogImage.url, site.url),
    wordCount: post.readingMinutes * 225,
  };
}
