import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SubjectView } from "@/components/seo/views/SubjectView";
import { NOT_FOUND_METADATA } from "@/server/seo/metadata";
import { subjectMetadata } from "@/server/seo/page-seo";
import { getSubjectPage, listSubjectParams } from "@/server/seo/pages";
import { siteContext } from "@/server/seo/site";
import { staticParamsOrEmpty } from "@/server/seo/static-params";

/**
 * `/[board]/[qualification]/[subject]`, e.g. `/zimsec/o-level/mathematics` (§44): syllabus outline, topics, exam
 * sessions, free samples and calls to action. Prebuilt for every listed public subject, refreshed hourly.
 */
export const revalidate = 3600;

type Params = { board: string; qualification: string; subject: string };
type Props = { params: Promise<Params> };

export function generateStaticParams(): Promise<Params[]> {
  return staticParamsOrEmpty("/[board]/[qualification]/[subject]", listSubjectParams);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await getSubjectPage(await params);
  return data ? subjectMetadata(data, siteContext()) : NOT_FOUND_METADATA;
}

export default async function SubjectPage({ params }: Props) {
  const data = await getSubjectPage(await params);
  if (!data) notFound();
  return <SubjectView data={data} site={siteContext()} />;
}
