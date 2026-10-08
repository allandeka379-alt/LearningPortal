import "server-only";
import type { Metadata } from "next";
import { APP_NAME, APP_TAGLINE, TITLE_SEPARATOR } from "@/lib/config";
import { absoluteUrl } from "@/server/lib/env";

/**
 * Per-page metadata for the public site (§44 SEO): title, description, canonical URL on `APP_URL`, Open Graph and
 * Twitter cards. Every page shares the generated Open Graph image (`src/app/opengraph-image.tsx`, built with next/og);
 * it is listed explicitly because a page that sets `openGraph` would otherwise drop the image inherited from the layout
 * segment.
 */

/**
 * Path of the generated Open Graph image route. The route file MUST stay at the app root: inside a route group such as
 * `(marketing)` Next serves it at a hashed path (`/opengraph-image-<hash>`), and this explicit URL would 404.
 */
export const OG_IMAGE_PATH = "/opengraph-image";
export const OG_IMAGE_SIZE = { width: 1200, height: 630 } as const;
export const OG_IMAGE_ALT = `${APP_NAME}: ${APP_TAGLINE}`;

export interface MarketingMetadataInput {
  /** Page title; the root layout template appends `TITLE_SEPARATOR` + APP_NAME unless `absoluteTitle`. */
  title: string;
  description: string;
  /** App-relative canonical path, e.g. "/pricing". */
  path: string;
  /** Use the title as-is (the home page). */
  absoluteTitle?: boolean;
  /** Keep the page out of search indexes (e.g. draft legal templates). */
  noIndex?: boolean;
}

export function marketingMetadata({ title, description, path, absoluteTitle = false, noIndex = false }: MarketingMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const socialTitle = absoluteTitle ? title : `${title}${TITLE_SEPARATOR}${APP_NAME}`;
  const image = { url: OG_IMAGE_PATH, width: OG_IMAGE_SIZE.width, height: OG_IMAGE_SIZE.height, alt: OG_IMAGE_ALT };
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph: { type: "website", siteName: APP_NAME, locale: "en_ZW", url, title: socialTitle, description, images: [image] },
    twitter: { card: "summary_large_image", title: socialTitle, description, images: [image] },
    ...(noIndex ? { robots: { index: false, follow: true } } : {}),
  };
}
