import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BoardView } from "@/components/seo/views/BoardView";
import { NOT_FOUND_METADATA } from "@/server/seo/metadata";
import { boardMetadata } from "@/server/seo/page-seo";
import { getBoardPage, listBoardParams } from "@/server/seo/pages";
import { siteContext } from "@/server/seo/site";
import { staticParamsOrEmpty } from "@/server/seo/static-params";

/** `/[board]`, e.g. `/zimsec`: qualifications offered (§44). Prebuilt for every listed board, refreshed hourly. */
export const revalidate = 3600;

type Props = { params: Promise<{ board: string }> };

export function generateStaticParams(): Promise<{ board: string }[]> {
  return staticParamsOrEmpty("/[board]", listBoardParams);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await getBoardPage((await params).board);
  return data ? boardMetadata(data, siteContext()) : NOT_FOUND_METADATA;
}

export default async function BoardPage({ params }: Props) {
  const data = await getBoardPage((await params).board);
  if (!data) notFound();
  return <BoardView data={data} site={siteContext()} />;
}
