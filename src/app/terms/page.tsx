import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { termsOfService } from "@/data/legal";

export const metadata: Metadata = {
  title: termsOfService.title,
  description: termsOfService.description,
  alternates: { canonical: "/terms" },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return <LegalPage doc={termsOfService} href="/terms" />;
}
