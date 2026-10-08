import { permanentRedirect } from "next/navigation";
import { reviewPathFor } from "./paths";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

/**
 * `/teacher/marking` is an alias of the marking queue, whose route is `/teacher/review` (ARCHITECTURE §3.3). Keeps a
 * class filter; the queue page applies its own guard.
 */
export default async function TeacherMarkingAlias({ searchParams }: { searchParams: SearchParams }) {
  permanentRedirect(reviewPathFor(null, await searchParams));
}
