import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TopicView } from "@/components/seo/views/TopicView";
import { NOT_FOUND_METADATA } from "@/server/seo/metadata";
import { topicMetadata } from "@/server/seo/page-seo";
import { getTopicPage } from "@/server/seo/pages";
import { siteContext } from "@/server/seo/site";
import { answerSampleQuestionAction } from "./actions";

/**
 * `/[board]/[qualification]/[subject]/[topic]`, e.g. `/zimsec/o-level/mathematics/quadratic-equations` (§44).
 * Topics are too many to prebuild: each renders on its first request and is then cached (ISR, refreshed hourly). The
 * practice sample is answered through a Server Action, so the page itself stays static.
 */
export const revalidate = 3600;

type Params = { board: string; qualification: string; subject: string; topic: string };
type Props = { params: Promise<Params> };

/** None prebuilt (ARCHITECTURE §3.4: "topic pages generated on first request, then cached"). */
export function generateStaticParams(): Params[] {
  return [];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await getTopicPage(await params);
  return data ? topicMetadata(data, siteContext()) : NOT_FOUND_METADATA;
}

export default async function TopicPage({ params }: Props) {
  const data = await getTopicPage(await params);
  if (!data) notFound();
  return <TopicView data={data} site={siteContext()} answerSample={answerSampleQuestionAction} />;
}
