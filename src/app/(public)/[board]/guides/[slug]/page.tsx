import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GuideView } from "@/components/seo/views/GuideView";
import { getGuidePage } from "@/server/seo/guides";
import { NOT_FOUND_METADATA } from "@/server/seo/metadata";
import { guideMetadata } from "@/server/seo/page-seo";
import { siteContext } from "@/server/seo/site";

/** `/[board]/guides/[slug]`: a board-level public guide (PUBLIC lesson). Rendered on first request, cached hourly. */
export const revalidate = 3600;

type Params = { board: string; slug: string };
type Props = { params: Promise<Params> };

export function generateStaticParams(): Params[] {
  return [];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await getGuidePage(await params);
  return data ? guideMetadata(data, siteContext()) : NOT_FOUND_METADATA;
}

export default async function BoardGuidePage({ params }: Props) {
  const data = await getGuidePage(await params);
  if (!data) notFound();
  return <GuideView data={data} site={siteContext()} />;
}
