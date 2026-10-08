import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GuideView } from "@/components/seo/views/GuideView";
import { getGeneralGuidePage } from "@/server/seo/guides";
import { NOT_FOUND_METADATA } from "@/server/seo/metadata";
import { guideMetadata } from "@/server/seo/page-seo";
import { siteContext } from "@/server/seo/site";

/**
 * `/guides/[slug]`: a general public guide or article (PUBLIC lesson with no board, qualification or subject; §44).
 * Board-scoped guides live under `/[board]/…/guides/[slug]`. Rendered on first request, cached hourly.
 */
export const revalidate = 3600;

type Params = { slug: string };
type Props = { params: Promise<Params> };

export function generateStaticParams(): Params[] {
  return [];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await getGeneralGuidePage((await params).slug);
  return data ? guideMetadata(data, siteContext()) : NOT_FOUND_METADATA;
}

export default async function GeneralGuidePage({ params }: Props) {
  const data = await getGeneralGuidePage((await params).slug);
  if (!data) notFound();
  return <GuideView data={data} site={siteContext()} />;
}
