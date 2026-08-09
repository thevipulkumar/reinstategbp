import type { Metadata, Viewport } from "next";
import { Space_Grotesk } from "next/font/google";
import { GoogleTagManager } from "@next/third-parties/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileCtaBar } from "@/components/layout/MobileCtaBar";
import { JsonLd } from "@/components/ui/JsonLd";
import { localBusinessSchema, organizationSchema, websiteSchema } from "@/lib/structured-data";
import { ogImage, site } from "@/data/site";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Get Your Suspended Google Business Profile Reinstated`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_US",
    url: site.url,
    title: `${site.name} — Get Your Suspended Google Business Profile Reinstated`,
    description: site.description,
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Get Your Suspended Google Business Profile Reinstated`,
    description: site.description,
    images: [ogImage.url],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  icons: {
    icon: [{ url: "/logo/reinstate-gbp-logo.png", type: "image/png" }],
    apple: [{ url: "/logo/reinstate-gbp-logo.png" }],
  },
  formatDetection: { telephone: true, email: true, address: false },
};

export const viewport: Viewport = {
  themeColor: "#049564",
  width: "device-width",
  initialScale: 1,
};

const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning: the inline script below adds a `js` class to
    // <html> before React hydrates, which is a deliberate server/client
    // difference on this element only.
    <html lang="en" className={spaceGrotesk.variable} suppressHydrationWarning>
      <head>
        {/*
          Marks the document as JS-capable before first paint, which is what gates
          the scroll-reveal transitions. Without JS the `.reveal` rules never
          apply and content renders fully visible.
        */}
        <script
          dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }}
        />
      </head>
      {gtmId ? <GoogleTagManager gtmId={gtmId} /> : null}
      <body className="pb-[72px] md:pb-0">
        <a
          href="#main"
          className="btn-label sr-only rounded-button focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-brand focus:px-5 focus:py-3 focus:text-white"
        >
          Skip to content
        </a>

        <Header />
        <main id="main">{children}</main>
        <Footer />
        <MobileCtaBar />

        <JsonLd data={[organizationSchema(), websiteSchema(), localBusinessSchema()]} />
      </body>
    </html>
  );
}
