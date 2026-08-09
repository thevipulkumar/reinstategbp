import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { clientLogos } from "@/data/clients";
import { trustStrip } from "@/data/home";

/**
 * §6.2. The negative top margin pulls the card up over the bottom edge of the
 * hero image — a signature detail of the original design. Sits above the hero
 * in stacking order via z-10.
 */
export function TrustStrip() {
  return (
    <div className="relative z-10 -mt-20 md:-mt-24">
      <Container>
        <div className="rounded-strip bg-white px-6 py-8 shadow-[0_18px_60px_rgba(0,0,0,0.1)] md:px-12 md:py-10">
          <h2 className="eyebrow text-center">{trustStrip.eyebrow}</h2>

          <ul className="mt-7 grid grid-cols-2 items-center justify-items-center gap-x-6 gap-y-7 sm:grid-cols-4 lg:grid-cols-7">
            {clientLogos.map((logo) => (
              <li key={logo.name} className="flex w-full items-center justify-center">
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={logo.width}
                  height={logo.height}
                  // The rendered box is ~123px wide (42px tall, 380:130 source).
                  // Asking for viewport-relative widths here fetches 3x the
                  // pixels needed, right behind the LCP image in the queue.
                  sizes="130px"
                  className="h-[42px] w-auto max-w-full object-contain opacity-70 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
                />
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </div>
  );
}
