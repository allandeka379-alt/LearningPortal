"use client";

import { useState } from "react";
import { RadioGroup } from "@/components/ui/RadioGroup";
import { ActionForm, AdminCheckboxGroup, AdminField } from "../ActionForm";
import type { AdminFormAction } from "../form-state";

/**
 * Create / edit form for announcements (§22, §36 Notifications). Client component only because the visible fields
 * follow the chosen scope (country for platform-wide, school for a school, class for a class) and publish mode; the
 * Server Action and service validate everything again.
 */

type Scope = "GLOBAL" | "SCHOOL" | "CLASS";
type PublishMode = "draft" | "now" | "schedule";

const AUDIENCE: Record<Scope, { value: string; label: string }[]> = {
  GLOBAL: [
    { value: "STUDENT", label: "Students" },
    { value: "PARENT", label: "Parents" },
    { value: "TEACHER", label: "Teachers" },
    { value: "SCHOOL_ADMIN", label: "School admins" },
    { value: "CONTENT_EDITOR", label: "Content editors" },
    { value: "ADMIN", label: "Admins" },
    { value: "SUPER_ADMIN", label: "Super admins" },
  ],
  SCHOOL: [
    { value: "STUDENT", label: "Students" },
    { value: "TEACHER", label: "Teachers" },
    { value: "SCHOOL_ADMIN", label: "School admins" },
    { value: "PARENT", label: "Parents of its students" },
  ],
  CLASS: [
    { value: "STUDENT", label: "Students" },
    { value: "TEACHER", label: "Teachers" },
    { value: "PARENT", label: "Parents of its students" },
  ],
};

const EVERYONE_HINT: Record<Scope, string> = {
  GLOBAL: "Leave all unticked to reach every active account (in the chosen country, if any).",
  SCHOOL: "Leave all unticked to reach every active member of the school. Parents are included only when ticked.",
  CLASS: "Leave all unticked to reach the class's students and teachers. Parents are included only when ticked.",
};

export interface AnnouncementFormValues {
  scope?: Scope;
  schoolRef?: string | null;
  classRef?: string | null;
  countryId?: string | null;
  title?: string;
  body?: string;
  audienceRoles?: readonly string[];
  pinned?: boolean;
  notify?: boolean;
  publish?: PublishMode;
  publishAt?: string | null;
  expiresAt?: string | null;
}

export function AnnouncementForm({
  action,
  countries,
  values = {},
  announcementId,
  submitLabel,
}: {
  action: AdminFormAction<unknown>;
  countries: readonly { id: string; name: string }[];
  values?: AnnouncementFormValues;
  announcementId?: string;
  submitLabel: string;
}) {
  const [scope, setScope] = useState<Scope>(values.scope ?? "GLOBAL");
  const [publish, setPublish] = useState<PublishMode>(values.publish ?? "draft");

  return (
    <ActionForm
      action={action}
      hiddenFields={announcementId ? { announcementId } : undefined}
      submitLabel={publish === "now" ? "Publish now" : publish === "schedule" ? "Schedule" : submitLabel}
      columns="two"
      successAs={announcementId ? "inline" : "toast"}
    >
      <div className="md:col-span-2">
        <RadioGroup
          name="scope"
          legend="Who is it for?"
          value={scope}
          onValueChange={(value) => setScope(value as Scope)}
          options={[
            { value: "GLOBAL", label: "Platform-wide", description: "All users, optionally one country" },
            { value: "SCHOOL", label: "One school", description: "Members of a school" },
            { value: "CLASS", label: "One class", description: "A class's students and teachers" },
          ]}
          appearance="card"
          orientation="horizontal"
        />
      </div>
      {scope === "GLOBAL" && (
        <AdminField
          name="countryId"
          label="Country"
          type="select"
          optional
          placeholder="All countries"
          options={countries.map((country) => ({ value: country.id, label: country.name }))}
          defaultValue={values.countryId}
        />
      )}
      {scope === "SCHOOL" && (
        <AdminField name="schoolRef" label="School" required hint="The school's URL slug (shown on its page) or id." defaultValue={values.schoolRef} mono />
      )}
      {scope === "CLASS" && (
        <AdminField name="classRef" label="Class" required hint="The class join code or id." defaultValue={values.classRef} mono />
      )}
      <AdminCheckboxGroup key={scope} name="audienceRoles" legend="Audience" options={AUDIENCE[scope]} defaultValues={values.audienceRoles ?? []} hint={EVERYONE_HINT[scope]} wide />
      <AdminField name="title" label="Title" required maxLength={200} defaultValue={values.title} wide />
      <AdminField
        name="body"
        label="Message"
        type="textarea"
        rows={8}
        required
        maxLength={10_000}
        defaultValue={values.body}
        hint="Markdown: **bold**, _italic_, lists and links. No images. Notifications show the plain text."
        wide
        mono
      />
      <div className="md:col-span-2">
        <RadioGroup
          name="publish"
          legend="When"
          value={publish}
          onValueChange={(value) => setPublish(value as PublishMode)}
          orientation="horizontal"
          options={[
            { value: "draft", label: "Save as draft" },
            { value: "now", label: "Publish now" },
            { value: "schedule", label: "Schedule" },
          ]}
        />
      </div>
      {publish === "schedule" && (
        <AdminField name="publishAt" label="Publish at (Harare time)" type="datetime-local" required defaultValue={values.publishAt} />
      )}
      <AdminField name="expiresAt" label="Stop showing at (Harare time)" type="datetime-local" optional defaultValue={values.expiresAt} />
      <AdminField name="pinned" label="Pin to the top of feeds" type="checkbox" defaultChecked={values.pinned ?? false} />
      <AdminField
        name="notify"
        label="Also send outside the app"
        type="checkbox"
        defaultChecked={values.notify ?? true}
        description="Recorded with the announcement. Email and text-message delivery happen only while those channels are switched on (Settings, Optional features), and then follow each person's preferences; otherwise it stays in the in-app inbox."
      />
    </ActionForm>
  );
}
