import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/ui/Section";
import { JsonLd } from "@/components/ui/JsonLd";
import { PostCard } from "@/components/blog/PostCard";
import { ContactSection } from "@/components/contact/ContactSection";
import { getAllPosts, getPost, getRelatedPosts } from "@/lib/blog";
import { articleSchema, breadcrumbSchema } from "@/lib/structured-data";
import { formatDate } from "@/lib/utils";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) return {};

  const canonical = `/blog/${post.slug}`;

  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    alternates: { canonical },
    openGraph: {
      title: post.title,
      description: post.description,
      url: canonical,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
      ...(post.image ? { images: [{ url: post.image }] } : {}),
    },
    twitter: { title: post.title, description: post.description },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) notFound();

  // Relative path rather than the @/ alias: the bundler needs a statically
  // analysable directory to build the module context from.
  const { default: Content } = await import(`../../../content/blog/${slug}.mdx`);

  const related = getRelatedPosts(slug);

  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blog" },
    { name: post.title, href: `/blog/${post.slug}` },
  ];

  return (
    <>
      <PageHero
        eyebrow={post.tags[0] ?? "Article"}
        headline={{ lead: post.title, accent: "", tail: "" }}
        crumbs={crumbs}
      >
        <p className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-[14px] text-white/70">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden="true">·</span>
          <span>{post.readingMinutes} min read</span>
          <span aria-hidden="true">·</span>
          <span>{post.author}</span>
        </p>
      </PageHero>

      <Section tone="white">
        <div className="mx-auto max-w-[760px]">
          {post.image ? (
            <Image
              src={post.image}
              alt={post.imageAlt ?? ""}
              width={840}
              height={472}
              priority
              sizes="(min-width: 768px) 760px, 100vw"
              className="mb-10 h-auto w-full rounded-image"
            />
          ) : null}

          <div className="prose-body">
            <Content />
          </div>

          {post.tags.length ? (
            <ul className="mt-12 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-button bg-mint-field px-3 py-1.5 text-[13px] font-medium text-brand-dark"
                >
                  {tag}
                </li>
              ))}
            </ul>
          ) : null}

          <Link
            href="/blog"
            className="btn-label mt-10 inline-flex items-center gap-2 text-brand-dark"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            All articles
          </Link>
        </div>
      </Section>

      {related.length ? (
        <Section tone="surface">
          <h2 className="text-h2">Related reading</h2>
          <ul className="mt-10 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {related.map((relatedPost) => (
              <li key={relatedPost.slug}>
                <PostCard post={relatedPost} />
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      <ContactSection heading="Suspended right now? Talk to a specialist." />

      <JsonLd data={[articleSchema(post), breadcrumbSchema(crumbs)]} />
    </>
  );
}
