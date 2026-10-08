import "server-only";
import { notFound } from "next/navigation";
import { isAppError } from "@/server/lib/errors";

/**
 * Runs a teacher-page read; a resource that does not exist or that the teacher may not see renders the 404 page
 * (existence is never disclosed, ARCHITECTURE §5.3). Other errors reach the route's error boundary.
 */
export async function orNotFound<T>(load: Promise<T>): Promise<T> {
  try {
    return await load;
  } catch (error) {
    if (isAppError(error) && (error.code === "NOT_FOUND" || error.code === "FORBIDDEN")) notFound();
    throw error;
  }
}
