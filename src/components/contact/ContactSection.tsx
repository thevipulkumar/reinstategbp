import { Mail, Phone } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/contact/ContactForm";
import { contactSection } from "@/data/home";
import { site } from "@/data/site";

/** §6.9 — contact details left, form right. */
export function ContactSection({ heading = contactSection.heading }: { heading?: string }) {
  return (
    <Section id="contact" tone="white">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <h2 className="text-h2">{heading}</h2>
          <p className="mt-6 max-w-[460px] text-body">{contactSection.intro}</p>

          <div className="mt-10 space-y-6">
            <a
              href={site.phoneHref}
              className="group flex items-center gap-4"
              aria-label={`Call us on ${site.phoneDisplay}`}
            >
              <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-mint-field text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                <Phone aria-hidden="true" className="size-5" />
              </span>
              {/* Matched to the email below so the two read as one pair. */}
              <span className="text-[17px] font-medium text-body transition-colors group-hover:text-brand-dark">
                {site.phoneDisplay}
              </span>
            </a>

            <a href={`mailto:${site.email}`} className="group flex items-center gap-4">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-mint-field text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                <Mail aria-hidden="true" className="size-5" />
              </span>
              <span className="break-all text-[17px] font-medium text-body transition-colors group-hover:text-brand-dark">
                {site.email}
              </span>
            </a>
          </div>
        </Reveal>

        <Reveal delay={80} className="rounded-card bg-surface p-6 md:p-9">
          <ContactForm />
        </Reveal>
      </div>
    </Section>
  );
}
