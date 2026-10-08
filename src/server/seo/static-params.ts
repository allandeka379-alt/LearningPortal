import "server-only";
import { logger } from "@/server/lib/logger";

/**
 * Runs a `generateStaticParams` loader, falling back to "no prebuilt pages" when the database is unreachable (e.g. a
 * build machine without DB access). The routes then render on first request and are cached by ISR, so a build never
 * fails, and never ships a partial catalogue, because of a transient database problem.
 */
export async function staticParamsOrEmpty<T>(route: string, load: () => Promise<T[]>): Promise<T[]> {
  try {
    return await load();
  } catch (error) {
    logger.error("seo.static_params.failed", { route, err: error });
    return [];
  }
}
