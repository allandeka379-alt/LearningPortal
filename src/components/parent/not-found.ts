import "server-only";
import { notFound } from "next/navigation";
import { isAppError } from "@/server/lib/errors";

/**
 * Runs a page read and turns the services' NOT_FOUND (no ACTIVE link, another family's child, a malformed id) into the
 * area's 404 page. Everything else propagates to error.tsx.
 */
export async function orNotFound<T>(read: Promise<T>): Promise<T> {
  try {
    return await read;
  } catch (error) {
    if (isAppError(error) && error.code === "NOT_FOUND") notFound();
    throw error;
  }
}
