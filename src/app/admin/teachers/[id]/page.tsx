import { redirect } from "next/navigation";

/** /admin/teachers/[id] → the shared user record. */
export default async function AdminTeacherRedirect({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  redirect(`/admin/users/${encodeURIComponent(id)}`);
}
