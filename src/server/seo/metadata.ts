import type { Metadata } from "next";

/**
 * `generateMetadata` shape shared by every public curriculum page (§44): an absolute, branded title, a meta
 * description, a canonical URL, Open Graph and Twitter cards. Paths are app-relative; the root layout's `metadataBase`
 * (APP_URL) makes them absolute. Pure.
 */

/** Open Graph locale of the public site (Zimbabwean English, matching `DEFAULT_LOCALE` en-ZW). */
export const OG_LOCALE = "en_ZW";

/** A social card image (the site-wide generated Open Graph image). */
export interface SocialImage {
  /** App-relative or absolute URL. */
  url: string;
  width: number;
  height: number;
  alt: string;
}

export interface PageMetadataInput {
  /** Full document title INCLUDING the brand suffix (see `withBrand`). */
  title: string;
  /** Title for social cards (no brand suffix needed: `og:site_name` carries it). */
  socialTitle: string;
  description: string;
  /** Canonical app-relative path, e.g. "/zimsec/o-level/mathematics". */
  path: string;
  appName: string;
  type?: "website" | "article";
  /** Thin or demo pages: keep them out of the index but let crawlers follow their links. */
  noIndex?: boolean;
  publishedTime?: Date | null;
  modifiedTime?: Date | null;
  /**
   * Social card image. Listed explicitly because a page that sets `openGraph` replaces (does not merge) the image a
   * parent segment would provide.
   */
  image?: SocialImage | null;
}

export function buildPageMetadata(input: PageMetadataInput): Metadata {
  const type = input.type ?? "website";
  const images = input.image ? [{ ...input.image }] : undefined;
  const common = {
    siteName: input.appName,
    title: input.socialTitle,
    description: input.description,
    url: input.path,
    locale: OG_LOCALE,
    ...(images ? { images } : {}),
  };
  const openGraph: NonNullable<Metadata["openGraph"]> =
    type === "article"
      ? {
          type: "article",
          ...common,
          ...(input.publishedTime ? { publishedTime: input.publishedTime.toISOString() } : {}),
          ...(input.modifiedTime ? { modifiedTime: input.modifiedTime.toISOString() } : {}),
        }
      : { type: "website", ...common };
  return {
    title: { absolute: input.title },
    description: input.description,
    alternates: { canonical: input.path },
    openGraph,
    twitter: images
      ? { card: "summary_large_image", title: input.socialTitle, description: input.description, images }
      : { card: "summary", title: input.socialTitle, description: input.description },
    ...(input.noIndex ? { robots: { index: false, follow: true } } : {}),
  };
}

/** Metadata for an unknown public URL (the page itself calls `notFound()`). */
export const NOT_FOUND_METADATA: Metadata = { title: "Page not found", robots: { index: false, follow: false } };
