import { permanentRedirect } from "next/navigation";
import { reviewPathFor } from "../paths";

/** `/teacher/marking/<attemptId>` → `/teacher/review/<attemptId>` (see ../paths.ts). */
export default async function TeacherMarkingAttemptAlias({ params }: { params: Promise<{ attemptId: string }> }) {
  const { attemptId } = await params;
  permanentRedirect(reviewPathFor(attemptId));
}
