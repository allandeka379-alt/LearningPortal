import { getEnv } from "@/server/lib/env";
import { countSitemapChunks, getSitemapChunk } from "@/server/seo/sitemap";
import { buildUrlsetXml, parseSitemapFileName, xmlResponse } from "@/server/seo/sitemap-xml";

/**
 * `/sitemap/<id>.xml` (§44): marketing pages + public curriculum pages, `lastModified` from the database, 45,000 URLs
 * per file. Every file is listed in `/sitemap.xml` and robots.txt. Prerendered and regenerated at most hourly (ISR).
 */
export const revalidate = 3600;

type Params = { file: string };

export async function generateStaticParams(): Promise<Params[]> {
  const count = await countSitemapChunks();
  return Array.from({ length: count }, (_, id) => ({ file: `${id}.xml` }));
}

export async function GET(_request: Request, { params }: { params: Promise<Params> }): Promise<Response> {
  const id = parseSitemapFileName((await params).file);
  const urls = id === null ? [] : await getSitemapChunk(id, getEnv().APP_URL);
  if (urls.length === 0) return new Response("Not found", { status: 404, headers: { "Content-Type": "text/plain; charset=utf-8" } });
  return xmlResponse(buildUrlsetXml(urls));
}
