import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { site } from "@/data/site";

/**
 * Fixed bottom bar below 768px (§7). The audience is stressed business owners
 * on a phone — the call action stays one thumb-press away on every page.
 * `pb-[env(safe-area-inset-bottom)]` keeps it clear of the iOS home indicator.
 */
export function MobileCtaBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-brand-light bg-white pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_24px_rgba(0,0,0,0.1)] md:hidden">
      <div className="grid grid-cols-2 gap-2 p-2.5">
        <a
          href={site.phoneHref}
          className="btn-label flex items-center justify-center gap-2 rounded-button border-2 border-brand-light py-3.5 text-brand-dark"
        >
          <Phone aria-hidden="true" className="size-4" />
          Call Now
        </a>
        <Link
          href="/#contact"
          className="btn-label flex items-center justify-center gap-2 rounded-button bg-brand-dark py-3.5 text-white"
        >
          Get Started
          <ArrowRight aria-hidden="true" className="size-4" />
        </Link>
      </div>
    </div>
  );
}
