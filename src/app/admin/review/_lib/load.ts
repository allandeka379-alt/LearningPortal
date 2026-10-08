import "server-only";
import { notFound } from "next/navigation";
import { isAppError } from "@/server/lib/errors";

/**
 * Awaits a service read for a detail page and turns NOT_FOUND (and malformed ids, BAD_REQUEST) into the admin 404
 * page instead of the error boundary. Other errors propagate.
 */
export async function orNotFound<T>(promise: Promise<T>): Promise<T> {
  try {
    return await promise;
  } catch (error) {
    if (isAppError(error) && (error.code === "NOT_FOUND" || error.code === "BAD_REQUEST" || error.code === "VALIDATION")) notFound();
    throw error;
  }
}
