import { redirect } from "next/navigation";

/** /admin/students/[id] → the shared user record (which asks for a reason before showing a student's data). */
export default async function AdminStudentRedirect({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  redirect(`/admin/users/${encodeURIComponent(id)}`);
}
