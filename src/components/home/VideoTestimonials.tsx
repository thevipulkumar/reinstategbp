import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/ui/JsonLd";
import { VideoCard } from "@/components/home/VideoCard";
import { videoSection } from "@/data/home";
import { hasRealAttribution, landscapeTestimonials, shortTestimonials, testimonials } from "@/data/testimonials";
import { videoSchema } from "@/lib/structured-data";

/** §6.6 — shorts in a row of three, landscape videos in a 2×2 grid. */
export function VideoTestimonials({
  heading = videoSection.heading,
  /** Only the homepage claims the VideoObject markup, to avoid duplicating it. */
  withSchema = true,
}: {
  heading?: string;
  withSchema?: boolean;
} = {}) {
  const schema = testimonials.map((testimonial) =>
    videoSchema({
      id: testimonial.id,
      name: hasRealAttribution(testimonial)
        ? `${testimonial.clientName} — Google Business Profile reinstatement testimonial`
        : "Google Business Profile reinstatement testimonial",
      description: hasRealAttribution(testimonial)
        ? `${testimonial.clientName} (${testimonial.businessType}) on getting their suspended Google Business Profile reinstated by Reinstate GBP.`
        : "A business owner describes getting their suspended Google Business Profile reinstated by Reinstate GBP.",
    }),
  );

  return (
    <Section tone="surface">
      <Reveal>
        <h2 className="text-h2 text-center">{heading}</h2>
      </Reveal>

      <div className="mx-auto mt-12 grid max-w-[860px] gap-6 sm:grid-cols-3">
        {shortTestimonials.map((testimonial, index) => (
          <Reveal key={testimonial.id} delay={index * 80}>
            <VideoCard testimonial={testimonial} />
          </Reveal>
        ))}
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2 md:gap-8">
        {landscapeTestimonials.map((testimonial, index) => (
          <Reveal key={testimonial.id} delay={index * 60}>
            <VideoCard testimonial={testimonial} />
          </Reveal>
        ))}
      </div>

      {withSchema ? <JsonLd data={schema} /> : null}
    </Section>
  );
}
