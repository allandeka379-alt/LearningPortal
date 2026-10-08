import { getInitials } from "@/lib/format";
import { fixedImageAttributes, IMAGE_STYLE } from "@/lib/images";
import type { PublicTestimonial } from "@/server/marketing/testimonials";
import { Section } from "./Section";

/**
 * Testimonials (§45). Renders NOTHING when there are no published, consented testimonials (CLAUDE.md rule 6: never
 * invent social proof). Quotes are plain text from the CMS, escaped by React.
 */
export function Testimonials({ testimonials }: { testimonials: readonly PublicTestimonial[] }) {
  if (testimonials.length === 0) return null;
  return (
    <Section id="testimonials" eyebrow="In their words" title="What students and parents say">
      <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial) => (
          <li key={testimonial.id}>
            <figure className="flex h-full flex-col rounded-card border border-border bg-surface p-5 sm:p-6">
              <blockquote className="flex-1 text-base leading-relaxed text-text">
                <p>&ldquo;{testimonial.quote}&rdquo;</p>
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                {testimonial.photo ? (
                  // eslint-disable-next-line @next/next/no-img-element -- next/image markup without its client JS (src/lib/images.ts)
                  <img
                    {...fixedImageAttributes(testimonial.photo.src, 48)}
                    alt={testimonial.photo.alt}
                    style={IMAGE_STYLE}
                    className="size-12 shrink-0 rounded-full object-cover"
                  />
                ) : (
                  <span aria-hidden="true" className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary-soft font-semibold text-on-primary-soft">
                    {getInitials(testimonial.displayName)}
                  </span>
                )}
                <span className="min-w-0">
                  <span className="block font-semibold text-text">{testimonial.displayName}</span>
                  {testimonial.descriptor && <span className="block text-sm text-muted">{testimonial.descriptor}</span>}
                </span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </Section>
  );
}
