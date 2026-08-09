import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { privacyPolicy } from "@/data/legal";

export const metadata: Metadata = {
  title: privacyPolicy.title,
  description: privacyPolicy.description,
  alternates: { canonical: "/privacy-policy" },
  robots: { index: true, follow: true },
};

export default function PrivacyPolicyPage() {
  return <LegalPage doc={privacyPolicy} href="/privacy-policy" />;
}
