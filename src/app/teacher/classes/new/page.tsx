import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { CreateClassForm } from "@/components/teacher/CreateClassForm";
import { Card, CardBody } from "@/components/ui/Card";
import { requireRole } from "@/server/auth/guards";
import { getClassCreationOptions } from "@/server/teaching/classes";
import { defaultAcademicYear } from "@/server/teaching/core";
import { createClassAction } from "../actions";

export const metadata: Metadata = { title: "New class" };

/** Create a class (§22): in a school the teacher teaches at, or as an independent tutor. */
export default async function NewClassPage() {
  const actor = await requireRole("TEACHER", { next: "/teacher/classes/new" });
  const options = await getClassCreationOptions(actor);
  return (
    <Container size="reading" className="pb-10">
      <PageHeader
        breadcrumbs={[{ label: "Classes", href: "/teacher/classes" }, { label: "New class" }]}
        title="New class"
        description="After creating the class, share its join code or add students by email, phone number or school username."
      />
      <Card>
        <CardBody>
          <CreateClassForm options={options} defaultAcademicYear={defaultAcademicYear(new Date())} action={createClassAction} />
        </CardBody>
      </Card>
    </Container>
  );
}
