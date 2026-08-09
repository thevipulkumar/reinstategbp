import Image from "next/image";
import { ArrowRight, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/Logo";
import { SplitHeadline } from "@/components/SplitHeadline";
import { hero } from "@/data/home";
import { site } from "@/data/site";

/**
 * §6.1. The image is the LCP element, so it is `priority` and unoptimised sizing
 * is avoided via `sizes="100vw"`. The overlay gradient keeps the white text
 * legible on the left while leaving the subject visible on the right.
 */
export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-navy">
      <Image
        src={hero.image.src}
        alt={hero.image.alt}
        fill
        priority
        fetchPriority="high"
        quality={68}
        sizes="100vw"
        className="-z-10 object-cover object-[70%_center]"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.35) 60%, rgba(0,0,0,0.15) 100%)",
        }}
      />
      {/* Mobile needs a heavier wash — the text sits over the whole frame. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[rgba(0,0,0,0.35)] md:hidden"
      />

      <Container className="relative pb-32 pt-[132px] md:pb-44 md:pt-[188px]">
        <div className="max-w-[640px] text-white">
          <Logo href={null} className="text-white" />

          <SplitHeadline
            lead={hero.headline.lead}
            accent={hero.headline.accent}
            tail={hero.headline.tail}
            accentClassName="text-brand"
            className="mt-8 text-hero text-white"
          />

          <p className="mt-6 max-w-[560px] text-[17px] leading-relaxed text-white/90">
            {hero.subheadline}
          </p>

          <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-8">
            <a
              href={hero.ctaHref}
              className="btn-label inline-flex items-center justify-center gap-2.5 rounded-button bg-brand-dark px-7 py-4 text-white transition-[background-color,transform] duration-200 hover:-translate-y-0.5 hover:bg-brand"
            >
              {hero.ctaLabel}
              <ArrowRight aria-hidden="true" className="size-4" />
            </a>

            <a
              href={site.phoneHref}
              className="group inline-flex items-center gap-3 text-white"
              aria-label={`Call us on ${site.phoneDisplay}`}
            >
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-white/15 transition-colors group-hover:bg-brand">
                <Phone aria-hidden="true" className="size-5" />
              </span>
              <span className="text-[clamp(1.25rem,3vw,28px)] font-semibold leading-none tracking-tight">
                {site.phoneDisplay}
              </span>
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
