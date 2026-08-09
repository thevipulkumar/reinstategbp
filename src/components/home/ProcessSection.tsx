import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { process } from "@/data/home";

/** §6.5 — image left, numbered steps right. */
export function ProcessSection() {
  return (
    <Section tone="white">
      <Reveal>
        <h2 className="text-h2">{process.heading}</h2>
      </Reveal>

      <div className="mt-12 grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <Image
            src={process.image.src}
            alt={process.image.alt}
            width={process.image.width}
            height={process.image.height}
            quality={90}
            sizes="(min-width: 1024px) 540px, 100vw"
            className="h-auto w-full rounded-image object-cover"
          />
        </Reveal>

        <ol className="space-y-9">
          {process.steps.map((step, index) => (
            <Reveal as="li" key={step.title} delay={index * 80} className="flex gap-5">
              <span
                aria-hidden="true"
                className="flex size-11 shrink-0 items-center justify-center rounded-full bg-mint text-[18px] font-bold text-brand-dark"
              >
                {index + 1}
              </span>
              <div>
                <h3 className="text-h3 text-brand">{step.title}</h3>
                <p className="mt-2 text-body">{step.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </Section>
  );
}
