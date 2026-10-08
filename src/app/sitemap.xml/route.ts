import { getEnv } from "@/server/lib/env";
import { countSitemapChunks } from "@/server/seo/sitemap";
import { buildSitemapIndexXml, xmlResponse } from "@/server/seo/sitemap-xml";

/**
 * `/sitemap.xml` (§44, ARCHITECTURE §3.3): the sitemap index listing every `/sitemap/<id>.xml` file. Static, regenerated
 * at most hourly (ISR) like the files themselves.
 */
export const revalidate = 3600;

export async function GET(): Promise<Response> {
  return xmlResponse(buildSitemapIndexXml(getEnv().APP_URL, await countSitemapChunks()));
}
