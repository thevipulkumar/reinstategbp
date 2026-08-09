"use client";

import Image from "next/image";
import { useState } from "react";
import { Play } from "lucide-react";
import type { Testimonial } from "@/data/testimonials";
import { hasRealAttribution } from "@/data/testimonials";
import { cn } from "@/lib/utils";

/**
 * Click-to-load YouTube facade (§6.6).
 *
 * Nothing is requested from YouTube until the visitor clicks: only the static
 * thumbnail loads, and the iframe is injected on demand against
 * youtube-nocookie.com. The original site mounted eight live iframes on page
 * load, which is most of what its performance score cost.
 */
export function VideoCard({ testimonial }: { testimonial: Testimonial }) {
  const isShort = testimonial.orientation === "short";

  const [playing, setPlaying] = useState(false);
  // Shorts have no maxresdefault; `oardefault` is the variant that keeps their
  // 9:16 framing. Landscape videos use maxresdefault. `hqdefault` exists for
  // every video and backs both up if a variant is ever missing.
  const [thumbnail, setThumbnail] = useState(
    `https://img.youtube.com/vi/${testimonial.id}/${isShort ? "oardefault" : "maxresdefault"}.jpg`,
  );
  const showAttribution = hasRealAttribution(testimonial);
  const label = showAttribution
    ? `Play testimonial from ${testimonial.clientName}`
    : "Play customer testimonial";

  return (
    <figure>
      <div
        className={cn(
          "relative overflow-hidden rounded-image bg-navy",
          isShort ? "aspect-[9/16]" : "aspect-video",
        )}
      >
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${testimonial.id}?autoplay=1&rel=0`}
            title={label}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 size-full border-0"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={label}
            className="group absolute inset-0 size-full cursor-pointer"
          >
            <Image
              src={thumbnail}
              alt=""
              fill
              unoptimized
              loading="lazy"
              sizes={isShort ? "(min-width: 768px) 33vw, 100vw" : "(min-width: 768px) 50vw, 100vw"}
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              onError={() =>
                setThumbnail(`https://img.youtube.com/vi/${testimonial.id}/hqdefault.jpg`)
              }
            />
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-[rgba(0,0,0,0.15)] transition-colors group-hover:bg-[rgba(0,0,0,0.05)]"
            />
            <span
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-brand shadow-[0_8px_28px_rgba(0,0,0,0.3)] transition-transform duration-300 group-hover:scale-110"
            >
              <Play className="ml-0.5 size-7 fill-white text-white" />
            </span>
          </button>
        )}
      </div>

      {showAttribution ? (
        <figcaption className="mt-4">
          <span className="block text-[17px] font-semibold text-navy">
            {testimonial.clientName}
          </span>
          <span className="mt-0.5 block text-[14px] text-muted">{testimonial.businessType}</span>
        </figcaption>
      ) : null}
    </figure>
  );
}
