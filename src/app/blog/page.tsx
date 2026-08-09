import type { Metadata } from "next";
import { BlogIndex } from "@/components/blog/BlogIndex";

const title = "Google Business Profile Blog — Suspensions, Verification & Appeals";
const description =
  "Practical guides on Google Business Profile suspensions, video verification and denied reinstatement appeals, written by the specialists who handle them daily.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/blog", types: { "application/rss+xml": "/rss.xml" } },
  openGraph: { title, description, url: "/blog", type: "website" },
  twitter: { title, description },
};

export default function BlogPage() {
  return <BlogIndex page={1} />;
}
