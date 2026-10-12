import "server-only";
import { getMarketingCatalogue, type MarketingCatalogue } from "./catalogue";
import { listPublishedFaqs, type PublicFaqItem } from "./faq";
import { getContentStats, getMarketingForms } from "./learning";
import type { ContentStats, MarketingForm } from "./learning-core";
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
  /** School years (Form 3 to Upper Sixth) with their level and stage. */
  forms: MarketingForm[];
  /** Real published-content counts (hidden on the page while there is no content). */
  stats: ContentStats;
}

/** Everything the home page (§45) renders, loaded in parallel. Runs at build / revalidation time, not per visitor. */
export async function getHomePageData(now: Date = new Date()): Promise<HomePageData> {
  const [catalogue, pricing, testimonials, generalFaqs, stats] = await Promise.all([
    getMarketingCatalogue(),
    getPricingData(now),
    listPublishedTestimonials(6),
    listPublishedFaqs({ categories: HOME_FAQ_CATEGORIES, limit: HOME_FAQ_LIMIT }),
    getContentStats(),
  ]);
  // No "general" entries yet: fall back to whatever is published, so real FAQ content is never hidden.
  const [faqs, forms] = await Promise.all([
    generalFaqs.length > 0 ? generalFaqs : listPublishedFaqs({ limit: HOME_FAQ_LIMIT }),
    getMarketingForms(catalogue.levels),
  ]);
  return { catalogue, pricing, testimonials, faqs, forms, stats };
}
