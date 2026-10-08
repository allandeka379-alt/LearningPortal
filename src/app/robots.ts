import type { MetadataRoute } from "next";
import { getEnv } from "@/server/lib/env";
import { buildRobots } from "@/server/seo/robots";
import { countSitemapChunks } from "@/server/seo/sitemap";

/** robots.txt (§44): public pages crawlable, private areas blocked, every sitemap file listed. Hourly ISR. */
export const revalidate = 3600;

export default async function robots(): Promise<MetadataRoute.Robots> {
  return buildRobots(getEnv().APP_URL, await countSitemapChunks());
}
