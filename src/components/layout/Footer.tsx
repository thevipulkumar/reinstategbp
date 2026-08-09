import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { Logo } from "@/components/Logo";
import { Container } from "@/components/ui/Container";
import { footerServiceLinks, legalNav, primaryNav } from "@/data/navigation";
import { site } from "@/data/site";

export function Footer() {
  const year = new Date().getFullYear();
  const companyLinks = primaryNav.filter((item) => !item.children);

  return (
    <footer className="bg-navy text-white">
      <Container className="py-14 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Logo href="/" className="text-white" />
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-white/70">
              {site.description}
            </p>
          </div>

          <nav aria-label="Services" className="md:col-span-3">
            <h2 className="eyebrow text-brand-light!">Services</h2>
            <ul className="mt-5 space-y-3">
              {footerServiceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[15px] text-white/80 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company" className="md:col-span-2">
            <h2 className="eyebrow text-brand-light!">Company</h2>
            <ul className="mt-5 space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[15px] text-white/80 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <h2 className="eyebrow text-brand-light!">Contact</h2>
            <ul className="mt-5 space-y-3">
              <li>
                <a
                  href={site.phoneHref}
                  className="flex items-start gap-2.5 text-[15px] text-white/80 transition-colors hover:text-white"
                >
                  <Phone aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand-light" />
                  {site.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="flex items-start gap-2.5 break-words text-[15px] text-white/80 transition-colors hover:text-white"
                >
                  <Mail aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand-light" />
                  {site.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/15 pt-8 text-[14px] text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName}. All rights reserved.
          </p>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {legalNav.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-colors hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-6 text-[13px] leading-relaxed text-white/65">
          {site.name} is an independent service and is not affiliated with, endorsed by, or acting
          as an agent of Google LLC. Google, Google Business Profile and Google Maps are trademarks
          of Google LLC.
        </p>
      </Container>
    </footer>
  );
}
