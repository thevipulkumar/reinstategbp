import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/ui/JsonLd";
import { PostCard } from "@/components/blog/PostCard";
import { getPostsForPage, getTotalPages } from "@/lib/blog";
import { breadcrumbSchema } from "@/lib/structured-data";
import { cn } from "@/lib/utils";

function pageHref(page: number) {
  return page === 1 ? "/blog" : `/blog/page/${page}`;
}

export function BlogIndex({ page }: { page: number }) {
  const posts = getPostsForPage(page);
  const totalPages = getTotalPages();

  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blog" },
    ...(page > 1 ? [{ name: `Page ${page}`, href: pageHref(page) }] : []),
  ];

  return (
    <>
      <PageHero
        eyebrow="Blog"
        headline={{
          lead: "Straight answers on",
          accent: "Google Business Profile",
          tail: "problems.",
        }}
        subheadline="Suspensions, verifications and denied appeals, explained by the people who work on them daily. No filler, no recycled Google help-centre text."
        crumbs={crumbs}
      />

      <Section tone="surface">
        {posts.length === 0 ? (
          <p className="text-body">No posts yet — check back shortly.</p>
        ) : (
          <ul className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, index) => (
              <Reveal as="li" key={post.slug} delay={(index % 3) * 70}>
                <PostCard post={post} />
              </Reveal>
            ))}
          </ul>
        )}

        {totalPages > 1 ? (
          <nav aria-label="Pagination" className="mt-14 flex items-center justify-center gap-2">
            {page > 1 ? (
              <Link
                href={pageHref(page - 1)}
                rel="prev"
                aria-label="Previous page"
                className="inline-flex size-11 items-center justify-center rounded-button border-2 border-brand-light text-brand-dark transition-colors hover:bg-mint"
              >
                <ChevronLeft aria-hidden="true" className="size-5" />
              </Link>
            ) : null}

            {Array.from({ length: totalPages }, (_, index) => index + 1).map((number) => (
              <Link
                key={number}
                href={pageHref(number)}
                aria-label={`Page ${number}`}
                aria-current={number === page ? "page" : undefined}
                className={cn(
                  "inline-flex size-11 items-center justify-center rounded-button text-[15px] font-semibold transition-colors",
                  number === page
                    ? "bg-brand text-white"
                    : "border-2 border-brand-light text-brand-dark hover:bg-mint",
                )}
              >
                {number}
              </Link>
            ))}

            {page < totalPages ? (
              <Link
                href={pageHref(page + 1)}
                rel="next"
                aria-label="Next page"
                className="inline-flex size-11 items-center justify-center rounded-button border-2 border-brand-light text-brand-dark transition-colors hover:bg-mint"
              >
                <ChevronRight aria-hidden="true" className="size-5" />
              </Link>
            ) : null}
          </nav>
        ) : null}
      </Section>

      <JsonLd data={breadcrumbSchema(crumbs)} />
    </>
  );
}
