"use client";

import { useState } from "react";
import { ActionForm, AdminField, useActionFormState } from "@/components/admin/ActionForm";
import type { AdminFormAction } from "@/components/admin/form-state";
import { RadioGroup } from "@/components/ui/RadioGroup";

function WhenFields() {
  const { state } = useActionFormState();
  const [publish, setPublish] = useState(state?.values?.publish ?? "now");
  return (
    <div className="space-y-3">
      <RadioGroup
        legend="When"
        name="publish"
        value={publish}
        onValueChange={setPublish}
        orientation="horizontal"
        options={[
          { value: "now", label: "Send now" },
          { value: "schedule", label: "Schedule" },
        ]}
      />
      {publish === "schedule" && <AdminField name="publishAt" label="Send at" type="datetime-local" required />}
    </div>
  );
}

/** Class announcement (§22): title, markdown body (no images), pin, send now or later, optional end time. */
export function AnnouncementForm({ classId, action }: { classId: string; action: AdminFormAction<unknown> }) {
  return (
    <ActionForm action={action} hiddenFields={{ classId }} submitLabel="Send announcement" pendingLabel="Sending…" successAs="inline">
      <AdminField name="title" label="Title" required maxLength={200} />
      <AdminField name="body" label="Message" type="textarea" required rows={5} maxLength={5000} hint="Markdown and maths are supported. Students are notified in the app." />
      <AdminField name="pinned" label="Pin to the top of the class page" type="checkbox" />
      <WhenFields />
      <AdminField name="expiresAt" label="Stop showing it at" type="datetime-local" optional />
    </ActionForm>
  );
}
