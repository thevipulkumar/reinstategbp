import { Fragment } from "react";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { CountUp } from "@/components/ui/CountUp";
import { method, type TextSegment } from "@/data/home";

function Segment({ segment }: { segment: TextSegment }) {
  if (segment.countUp) {
    return (
      <strong className="font-bold text-brand-dark">
        <CountUp to={segment.countUp.to} suffix={segment.countUp.suffix} />
      </strong>
    );
  }

  if (segment.emphasis) {
    return <strong className="font-bold">{segment.text}</strong>;
  }

  return <Fragment>{segment.text}</Fragment>;
}

/** §6.4 — full-width mint panel, centred text. */
export function MethodPanel() {
  return (
    <section className="section-y bg-surface">
      <Container>
        <Reveal className="rounded-card bg-mint px-6 py-14 text-center md:px-16 md:py-20">
          <h2 className="text-h2">{method.heading}</h2>

          <div className="mx-auto mt-7 max-w-[820px] space-y-6 text-body">
            {method.paragraphs.map((paragraph, index) => (
              <p key={index}>
                {paragraph.map((segment, segmentIndex) => (
                  <Segment key={segmentIndex} segment={segment} />
                ))}
              </p>
            ))}
          </div>

          <a
            href={method.ctaHref}
            className="btn-label mt-10 inline-flex items-center gap-2.5 rounded-button bg-brand px-7 py-4 text-white transition-[background-color,transform] duration-200 hover:-translate-y-0.5 hover:bg-brand-hover"
          >
            {method.ctaLabel}
            <ArrowRight aria-hidden="true" className="size-4" />
          </a>
        </Reveal>
      </Container>
    </section>
  );
}
