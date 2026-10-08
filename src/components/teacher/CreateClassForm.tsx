"use client";

import { useMemo, useState } from "react";
import { ActionForm, AdminField, useActionFormState } from "@/components/admin/ActionForm";
import { fieldErrorsFor, type AdminFormAction } from "@/components/admin/form-state";
import { Field } from "@/components/ui/Field";
import { Select } from "@/components/ui/Select";
import type { ClassCreationOptions } from "@/server/teaching/classes";

export interface CreateClassFormProps {
  options: ClassCreationOptions;
  defaultAcademicYear: string;
  action: AdminFormAction<unknown>;
}

const TUTOR = "";

function SchoolAndSubject({ options }: { options: ClassCreationOptions }) {
  const { state } = useActionFormState();
  const [schoolId, setSchoolId] = useState<string>(state?.values?.schoolId ?? options.schools[0]?.id ?? TUTOR);
  const subjects = useMemo(() => {
    const offered = options.schools.find((s) => s.id === schoolId)?.subjectIds ?? [];
    const list = offered.length > 0 ? options.subjects.filter((s) => offered.includes(s.id)) : options.subjects;
    return list.map((s) => ({ value: s.id, label: `${s.name} (${s.qualificationLabel})` }));
  }, [options, schoolId]);
  return (
    <>
      <Field
        label="School"
        hint={schoolId === TUTOR ? "An independent class: you invite the students and they can join with the code." : "Only teachers and students of this school can be added."}
        error={fieldErrorsFor(state, "schoolId")}
      >
        <Select name="schoolId" value={schoolId} onChange={(event) => setSchoolId(event.target.value)}>
          {options.schools.map((school) => (
            <option key={school.id} value={school.id}>
              {school.name}
            </option>
          ))}
          {options.canCreateTutorClass && <option value={TUTOR}>No school (independent tutor class)</option>}
        </Select>
      </Field>
      <Field
        label="Subject"
        optional
        hint="Teachers of the class see students' progress in this subject only. Leave it empty for a form or tutor group."
        error={fieldErrorsFor(state, "subjectId")}
      >
        <Select key={schoolId} name="subjectId" defaultValue={state?.values?.subjectId ?? ""} options={subjects} placeholder="No single subject" />
      </Field>
    </>
  );
}

/** "New class" form (§22): school or independent class, optional subject, academic year, join settings. */
export function CreateClassForm({ options, defaultAcademicYear, action }: CreateClassFormProps) {
  return (
    <ActionForm action={action} submitLabel="Create class" pendingLabel="Creating…">
      <AdminField name="name" label="Class name" required maxLength={120} placeholder="e.g. Form 4 Blue Mathematics" />
      <SchoolAndSubject options={options} />
      <AdminField name="academicYear" label="Academic year" required defaultValue={defaultAcademicYear} maxLength={16} hint="For example 2026 or 2026/27." />
      <AdminField name="description" label="Description" type="textarea" optional rows={3} maxLength={1000} />
      <AdminField
        name="joinRequiresApproval"
        label="Approve students who join with the code"
        type="checkbox"
        description="When on, students who enter the join code wait until you approve them."
      />
    </ActionForm>
  );
}
