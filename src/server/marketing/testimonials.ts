import "server-only";
import { mediaSrc } from "@/server/content/service";
import { db, type DbClient } from "@/server/db";

/**
 * Testimonials for the marketing site (§45). CLAUDE.md rule 6: only REAL, consented, published rows are ever shown, and
 * the section is omitted when there are none. The database already enforces most of this (consent required, demo rows
 * can never be published, minors need guardian consent before publishing); the query and {@link isDisplayableTestimonial}
 * check it again so a schema change can never leak an unconsented quote.
 */

export interface PublicTestimonial {
  id: string;
  displayName: string;
  descriptor: string | null;
  quote: string;
  /** Only a PUBLIC, READY marketing image; otherwise null (initials are shown instead). */
  photo: { src: string; alt: string; width: number | null; height: number | null } | null;
}

/** The consent and publication fields that decide whether a testimonial may be displayed. */
export interface TestimonialConsentFields {
  isPublished: boolean;
  isDemo: boolean;
  quote: string;
  displayName: string;
  consentRecordedAt: Date | null;
  consentWithdrawnAt: Date | null;
  authorIsMinor: boolean;
  guardianConsentRecordedAt: Date | null;
}

/** True only for a published, non-demo row with recorded (and not withdrawn) consent, plus guardian consent for minors. */
export function isDisplayableTestimonial(row: TestimonialConsentFields): boolean {
  if (!row.isPublished || row.isDemo) return false;
  if (row.consentRecordedAt === null || row.consentWithdrawnAt !== null) return false;
  if (row.authorIsMinor && row.guardianConsentRecordedAt === null) return false;
  return row.quote.trim().length > 0 && row.displayName.trim().length > 0;
}

/** Published, consented testimonials in admin order (at most `limit`, default 6). */
export async function listPublishedTestimonials(limit = 6, client: DbClient = db): Promise<PublicTestimonial[]> {
  const take = Math.min(Math.max(1, Math.trunc(limit)), 24);
  const rows = await client.testimonial.findMany({
    where: {
      isPublished: true,
      isDemo: false,
      consentWithdrawnAt: null,
      OR: [{ authorIsMinor: false }, { guardianConsentRecordedAt: { not: null } }],
    },
    select: {
      id: true,
      displayName: true,
      descriptor: true,
      quote: true,
      isPublished: true,
      isDemo: true,
      consentRecordedAt: true,
      consentWithdrawnAt: true,
      authorIsMinor: true,
      guardianConsentRecordedAt: true,
      photo: {
        select: { storageKey: true, altText: true, width: true, height: true, status: true, visibility: true, deletedAt: true },
      },
    },
    orderBy: [{ sortOrder: "asc" }, { publishedAt: "desc" }],
    take,
  });
  return rows.filter(isDisplayableTestimonial).map((row) => {
    const photo = row.photo;
    const usablePhoto = photo && photo.status === "READY" && photo.visibility === "PUBLIC" && photo.deletedAt === null;
    return {
      id: row.id,
      displayName: row.displayName.trim(),
      descriptor: row.descriptor?.trim() || null,
      quote: row.quote.trim(),
      photo: usablePhoto
        ? { src: mediaSrc(photo.storageKey), alt: photo.altText?.trim() || `Photo of ${row.displayName.trim()}`, width: photo.width, height: photo.height }
        : null,
    };
  });
}
