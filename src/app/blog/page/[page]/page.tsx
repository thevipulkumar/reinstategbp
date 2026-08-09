import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogIndex } from "@/components/blog/BlogIndex";
import { getTotalPages } from "@/lib/blog";

export function generateStaticParams() {
  const total = getTotalPages();
  // Page 1 lives at /blog, so numbered pages start at 2.
  return Array.from({ length: Math.max(0, total - 1) }, (_, index) => ({
    page: String(index + 2),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ page: string }>;
}): Promise<Metadata> {
  const { page } = await params;
  const title = `Blog — Page ${page}`;

  return {
    title,
    description: "More guides on Google Business Profile suspensions, verification and appeals.",
    alternates: { canonical: `/blog/page/${page}` },
    robots: { index: false, follow: true },
  };
}

export default async function BlogPaginatedPage({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page } = await params;
  const pageNumber = Number(page);

  if (!Number.isInteger(pageNumber) || pageNumber < 2 || pageNumber > getTotalPages()) {
    notFound();
  }

  return <BlogIndex page={pageNumber} />;
}
