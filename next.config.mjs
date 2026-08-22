import createMDX from "@next/mdx";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";

/*
 * NEXT_PUBLIC_* variables are inlined into the client bundle at BUILD time —
 * they are not read at runtime. Setting one in the host's control panel and
 * restarting the app does nothing; it needs a rebuild. The failure is otherwise
 * completely invisible: no error, just silently absent analytics. So warn
 * loudly during a production build when one is missing.
 */
if (process.env.NODE_ENV === "production") {
  // Analytics is satisfied by either id, so it is checked as a pair rather
  // than requiring both.
  const requiredPublic = ["NEXT_PUBLIC_SITE_URL"];
  if (!process.env.NEXT_PUBLIC_GTM_ID && !process.env.NEXT_PUBLIC_GA_ID) {
    requiredPublic.push("NEXT_PUBLIC_GA_ID or NEXT_PUBLIC_GTM_ID");
  }
  const missing = requiredPublic.filter((name) => !process.env[name]);

  if (missing.length > 0) {
    console.warn(
      "\n\u001b[33m\u001b[1m  WARNING  \u001b[0m\u001b[33m " +
        `${missing.join(", ")} missing from this production build.\n` +
        "  These are inlined at build time, so setting them after the build and restarting\n" +
        "  will NOT take effect — you must rebuild.\u001b[0m\n",
    );
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "img.youtube.com", pathname: "/vi/**" },
    ],
  },
  async redirects() {
    // There is no /services index page; send stray hits to the main service.
    return [
      {
        source: "/services",
        destination: "/services/gbp-suspension-reinstatement",
        permanent: false,
      },
    ];
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkFrontmatter, remarkGfm],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);
