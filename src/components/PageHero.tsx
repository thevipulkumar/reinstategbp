import Link from "next/link";
import { ArrowRight, ChevronRight, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SplitHeadline } from "@/components/SplitHeadline";
import { site } from "@/data/site";
import type { ReactNode } from "react";

export type Crumb = { name: string; href: string };

/**
 * Dark hero band for every page other than the homepage. Keeping every page's
 * first section dark is what lets the sticky header stay transparent at the top
 * of the document without a per-page flag.
 */
export function PageHero({
  eyebrow,
  headline,
  subheadline,
  ctaLabel,
  crumbs,
  children,
}: {
  eyebrow: string;
  headline: { lead: string; accent: string; tail?: string };
  subheadline?: string;
  ctaLabel?: string;
  crumbs?: Crumb[];
  children?: ReactNode;
}) {
  return (
    <section className="bg-navy text-white">
      <Container className="pb-16 pt-[128px] md:pb-24 md:pt-[184px]">
        {crumbs?.length ? (
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-1.5 text-[13px] text-white/60">
              {crumbs.map((crumb, index) => (
                <li key={`${index}-${crumb.href}`} className="flex items-center gap-1.5">
                  {index > 0 ? (
                    <ChevronRight aria-hidden="true" className="size-3.5 text-white/40" />
                  ) : null}
                  {index === crumbs.length - 1 ? (
                    <span aria-current="page" className="text-white/90">
                      {crumb.name}
                    </span>
                  ) : (
                    <Link href={crumb.href} className="transition-colors hover:text-white">
                      {crumb.name}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        ) : null}

        <p className="eyebrow text-brand-light!">{eyebrow}</p>

        <SplitHeadline
          lead={headline.lead}
          accent={headline.accent}
          tail={headline.tail}
          accentClassName="text-brand-light"
          className="mt-5 max-w-[900px] text-h2 text-white"
        />

        {subheadline ? (
          <p className="mt-6 max-w-[620px] text-[17px] leading-relaxed text-white/85">
            {subheadline}
          </p>
        ) : null}

        {ctaLabel ? (
          <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
            <Link
              href="#contact"
              className="btn-label inline-flex items-center justify-center gap-2.5 rounded-button bg-brand-dark px-7 py-4 text-white transition-[background-color,transform] duration-200 hover:-translate-y-0.5 hover:bg-brand"
            >
              {ctaLabel}
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
            <a
              href={site.phoneHref}
              className="btn-label inline-flex items-center justify-center gap-2.5 rounded-button border-2 border-white/40 px-7 py-3.5 text-white transition-colors hover:border-white hover:bg-white/10"
            >
              <Phone aria-hidden="true" className="size-4" />
              {site.phoneDisplay}
            </a>
          </div>
        ) : null}

        {children}
      </Container>
    </section>
  );
}
