import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { after, connection } from "next/server";
import { cache } from "react";
import { PublicShareCard } from "@/components/share/PublicShareCard";
import { ButtonLink } from "@/components/ui/Button";
import { APP_NAME, APP_TAGLINE } from "@/lib/config";
import { getPublicShare, recordShareView } from "@/server/sharing/service";

type Params = Promise<{ token: string }>;

/** One lookup per request, shared by generateMetadata and the page. Always at request time (revocation is instant). */
const loadShare = cache(async (token: string) => {
  await connection();
  return getPublicShare(token);
});

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { token } = await params;
  const share = await loadShare(token);
  if (!share) return { title: "Link not available" };
  const description = `${share.snapshot.headline} on ${APP_NAME}.`;
  return {
    title: share.snapshot.headline,
    description,
    openGraph: { title: `${share.snapshot.headline}.`, description: `${APP_TAGLINE} Study on ${APP_NAME}.`, siteName: APP_NAME, type: "website" },
    twitter: { card: "summary_large_image", title: `${share.snapshot.headline}.`, description },
  };
}

/**
 * Public share card (§46): "I scored 82% in O-Level Mathematics." Shows only the snapshot the student chose to share
 * (no surname, school, contact details, answers or AI content), then invites the visitor to sign up. Revoked or
 * expired links are a 404. Not indexed (layout metadata).
 */
export default async function SharePage({ params }: { params: Params }) {
  const { token } = await params;
  const share = await loadShare(token);
  if (!share) notFound();
  after(() => recordShareView(token));

  return (
    <div className="space-y-6">
      <PublicShareCard kind={share.kind} snapshot={share.snapshot} />
      <section aria-labelledby="share-cta" className="space-y-3 rounded-card border border-border bg-surface p-6">
        <h2 id="share-cta" className="text-lg font-semibold text-text">
          {APP_TAGLINE}
        </h2>
        <p className="text-sm text-muted">
          {APP_NAME} helps ZIMSEC and Cambridge O-Level and A-Level students practise, track progress and prepare for exams.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <ButtonLink href="/register" size="lg">
            Start studying free
          </ButtonLink>
          <Link href="/login" className="inline-flex min-h-11 items-center text-sm font-semibold text-primary underline-offset-4 hover:underline">
            I already have an account
          </Link>
        </div>
      </section>
    </div>
  );
}
