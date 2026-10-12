import { redirect } from "next/navigation";

/**
 * "Learn" is the course library, served at /app/subjects (the tab keeps that URL so course, topic and lesson
 * breadcrumbs, notification links and saved offline pages stay valid). /app/learn is the friendly alias.
 */
export default function LearnAliasPage(): never {
  redirect("/app/subjects");
}
