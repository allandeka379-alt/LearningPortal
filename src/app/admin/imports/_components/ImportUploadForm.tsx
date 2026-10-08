"use client";

import { useMemo, useState, type ReactNode } from "react";
import { ActionForm } from "@/components/admin/ActionForm";
import { UploadProgressBar } from "@/components/admin/editor/MediaForms";
import type { AdminFormAction } from "@/components/admin/form-state";
import { streamedUploadAction, type UploadProgress } from "@/components/admin/streamed-upload";

interface ImportUploadResult {
  id: string;
  status: string;
  duplicates: number;
  href: string;
}

/**
 * The import upload form (§25): posts the file and its source / licence fields to the streamed upload route
 * (`POST /api/v1/uploads?purpose=import`, up to 20 MB) with upload progress, then opens the dry-run report. The fields
 * are passed in as children by the server page.
 */
export function ImportUploadForm({ hiddenFields, children }: { hiddenFields: Readonly<Record<string, string>>; children: ReactNode }) {
  const [progress, setProgress] = useState<UploadProgress | null>(null);
  const action = useMemo(
    () =>
      streamedUploadAction<ImportUploadResult>(
        "import",
        (data) => ({
          message:
            data.status === "VALIDATING"
              ? "Uploaded. The file is being checked in the background."
              : data.duplicates > 0
                ? "Uploaded and checked. This exact file was uploaded before: see the warning."
                : "Uploaded and checked. Review the report before importing.",
          redirectTo: data.href,
        }),
        setProgress,
      ) as AdminFormAction<unknown>,
    [],
  );
  return (
    <ActionForm action={action} submitLabel="Upload and check" pendingLabel="Uploading and checking…" hiddenFields={hiddenFields} columns="two">
      {children}
      <UploadProgressBar progress={progress} className="md:col-span-2" />
    </ActionForm>
  );
}
