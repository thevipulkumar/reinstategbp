import { Minus, Plus } from "lucide-react";
import type { FaqItem } from "@/data/faqs";

/**
 * §6.8. Built on <details>/<summary>, so it opens, closes and is keyboard
 * navigable with JavaScript disabled. No `name` attribute, so multiple items can
 * be open at once.
 */
export function FaqAccordion({ items }: { items: FaqItem[] }) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <details key={item.question} className="faq-item group">
          <summary className="flex items-start gap-4 rounded-button bg-brand px-5 py-4 text-white transition-colors hover:bg-brand-hover">
            <span
              aria-hidden="true"
              className="mt-0.5 flex size-6 shrink-0 items-center justify-center"
            >
              <Plus className="faq-icon-plus size-5" />
              <Minus className="faq-icon-minus size-5" />
            </span>
            <span className="text-[17px] font-semibold leading-snug">{item.question}</span>
          </summary>

          <div className="rounded-b-button bg-white px-5 py-6 text-body md:px-[60px]">
            {item.answer.map((paragraph, index) => (
              <p key={index} className={index > 0 ? "mt-4" : undefined}>
                {paragraph}
              </p>
            ))}

            {item.bullets?.length ? (
              <ul className="mt-5 space-y-3">
                {item.bullets.map((bullet) => (
                  <li key={bullet.title} className="flex gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-2.5 size-1.5 shrink-0 rounded-full bg-brand"
                    />
                    <span>
                      <strong className="font-bold text-ink">{bullet.title}</strong>
                      {bullet.body ? ` — ${bullet.body}` : null}
                    </span>
                  </li>
                ))}
              </ul>
            ) : null}

            {item.answerAfterBullets?.map((paragraph, index) => (
              <p key={index} className="mt-4">
                {paragraph}
              </p>
            ))}
          </div>
        </details>
      ))}
    </div>
  );
}
