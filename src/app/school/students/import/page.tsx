import type { Metadata } from "next";
import { AdminSection } from "@/components/admin/DetailParts";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { RosterImport } from "@/components/school/RosterImport";
import { Alert } from "@/components/ui/Alert";
import { getEnv } from "@/server/lib/env";
import { defaultAcademicYear } from "@/server/teaching/core";
import { MAX_ROSTER_FILE_BYTES } from "@/server/schools/core";
import { requireSchoolPage, signInUrl } from "../../_lib/context";
import { commitRosterAction, validateRosterAction } from "./actions";

export const metadata: Metadata = { title: "Import students" };

/**
 * /school/students/import — roster import (§23): check a CSV / Excel class list (dry run), then import it to create
 * school accounts with one-time printable sign-in slips, place students in classes and enrol them in subjects.
 */
export default async function RosterImportPage() {
  const { school } = await requireSchoolPage("/school/students/import");
  return (
    <Container size="wide">
      <PageHeader
        title="Import students"
        breadcrumbs={[{ label: "Students", href: "/school/students" }, { label: "Import" }]}
        description="Upload a class list to create school accounts for students who don't have their own email or phone. Each student gets a school username and a temporary password on a printable slip."
      />
      <div className="space-y-6 pb-8">
        <Alert tone="info" title="How student details are used">
          We only keep what you import: names, form, class, student number and an optional parent phone (shared by siblings, used for
          sign-in reminders and consent only). A student&rsquo;s own email or phone is used only to find an account they already have:
          they get an invitation instead of a second account.
        </Alert>
        <AdminSection title="Class list">
          <RosterImport
            validateAction={validateRosterAction}
            commitAction={commitRosterAction}
            schoolName={school.name}
            signInUrl={signInUrl(getEnv().APP_URL)}
            defaultAcademicYear={defaultAcademicYear(new Date())}
            templateHref="/school/students/import/template"
            maxFileBytes={MAX_ROSTER_FILE_BYTES}
          />
        </AdminSection>
      </div>
    </Container>
  );
}
