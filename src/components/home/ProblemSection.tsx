import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { problem } from "@/data/home";

/** §6.3 — text left, image right. */
export function ProblemSection() {
  return (
    <Section tone="white" className="pt-20 md:pt-28">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <h2 className="text-h2">{problem.heading}</h2>
          <p className="mt-6 max-w-[560px] text-body">{problem.body}</p>

          <a
            href={problem.ctaHref}
            className="btn-label mt-9 inline-flex items-center gap-2.5 rounded-button bg-brand px-7 py-4 text-white transition-[background-color,transform] duration-200 hover:-translate-y-0.5 hover:bg-brand-hover"
          >
            {problem.ctaLabel}
            <ArrowRight aria-hidden="true" className="size-4" />
          </a>
        </Reveal>

        <Reveal delay={80}>
          <Image
            src={problem.image.src}
            alt={problem.image.alt}
            width={problem.image.width}
            height={problem.image.height}
            sizes="(min-width: 1024px) 540px, 100vw"
            className="h-auto w-full rounded-image object-cover"
          />
        </Reveal>
      </div>
    </Section>
  );
}
