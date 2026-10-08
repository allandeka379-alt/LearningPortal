import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { QualificationView } from "@/components/seo/views/QualificationView";
import { NOT_FOUND_METADATA } from "@/server/seo/metadata";
import { qualificationMetadata } from "@/server/seo/page-seo";
import { getQualificationPage, listQualificationParams } from "@/server/seo/pages";
import { siteContext } from "@/server/seo/site";
import { staticParamsOrEmpty } from "@/server/seo/static-params";

/** `/[board]/[qualification]`, e.g. `/zimsec/o-level`, `/cambridge/igcse`: subjects by category (§44). */
export const revalidate = 3600;

type Props = { params: Promise<{ board: string; qualification: string }> };

export function generateStaticParams(): Promise<{ board: string; qualification: string }[]> {
  return staticParamsOrEmpty("/[board]/[qualification]", listQualificationParams);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { board, qualification } = await params;
  const data = await getQualificationPage(board, qualification);
  return data ? qualificationMetadata(data, siteContext()) : NOT_FOUND_METADATA;
}

export default async function QualificationPage({ params }: Props) {
  const { board, qualification } = await params;
  const data = await getQualificationPage(board, qualification);
  if (!data) notFound();
  return <QualificationView data={data} site={siteContext()} />;
}
