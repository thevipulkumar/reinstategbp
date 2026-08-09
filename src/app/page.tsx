import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { TrustStrip } from "@/components/home/TrustStrip";
import { ProblemSection } from "@/components/home/ProblemSection";
import { MethodPanel } from "@/components/home/MethodPanel";
import { ProcessSection } from "@/components/home/ProcessSection";
import { VideoTestimonials } from "@/components/home/VideoTestimonials";
import { TeamSection } from "@/components/home/TeamSection";
import { FaqSection } from "@/components/FaqSection";
import { ContactSection } from "@/components/contact/ContactSection";
import { faqSection } from "@/data/home";
import { homepageFaqs } from "@/data/faqs";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: `${site.name} — Get Your Suspended Google Business Profile Reinstated`,
  description: site.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <ProblemSection />
      <MethodPanel />
      <ProcessSection />
      <VideoTestimonials />
      <TeamSection />
      <FaqSection heading={faqSection.heading} items={homepageFaqs} />
      <ContactSection />
    </>
  );
}
