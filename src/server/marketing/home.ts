import "server-only";
import { getMarketingCatalogue, type MarketingCatalogue } from "./catalogue";
import { listPublishedFaqs, type PublicFaqItem } from "./faq";
import { getPricingData, type PricingData } from "./pricing";
import { listPublishedTestimonials, type PublicTestimonial } from "./testimonials";

/** FAQ entries shown on the home page (the rest live on /faq). */
export const HOME_FAQ_LIMIT = 6;
export const HOME_FAQ_CATEGORIES = ["general"] as const;

export interface HomePageData {
  catalogue: MarketingCatalogue;
  pricing: PricingData;
  /** Published, consented testimonials only; empty → the section is omitted. */
  testimonials: PublicTestimonial[];
  /** Published FAQ entries (general first); empty → the section is omitted. */
  faqs: PublicFaqItem[];
}

/** Everything the home page (§45) renders, loaded in parallel. Runs at build / revalidation time, not per visitor. */
export async function getHomePageData(now: Date = new Date()): Promise<HomePageData> {
  const [catalogue, pricing, testimonials, generalFaqs] = await Promise.all([
    getMarketingCatalogue(),
    getPricingData(now),
    listPublishedTestimonials(6),
    listPublishedFaqs({ categories: HOME_FAQ_CATEGORIES, limit: HOME_FAQ_LIMIT }),
  ]);
  // No "general" entries yet: fall back to whatever is published, so real FAQ content is never hidden.
  const faqs = generalFaqs.length > 0 ? generalFaqs : await listPublishedFaqs({ limit: HOME_FAQ_LIMIT });
  return { catalogue, pricing, testimonials, faqs };
}
