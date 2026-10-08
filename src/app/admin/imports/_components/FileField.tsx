"use client";

import { useState } from "react";
import { useActionFormState } from "@/components/admin/ActionForm";
import { fieldErrorsFor } from "@/components/admin/form-state";
import { Field } from "@/components/ui/Field";
import { cn } from "@/lib/cn";
import { controlStyles } from "@/components/ui/control-styles";

/**
 * File input for an import upload inside an `ActionForm`: accepts CSV, Excel (.xlsx) and JSON, refuses files over the
 * size cap before uploading (slow connections, §29), and shows server-side errors for `file`. The server still sniffs
 * the bytes; the `accept` list is only a convenience for the file picker.
 */
export function FileField({ maxBytes, label = "File", hint }: { maxBytes: number; label?: string; hint?: string }) {
  const { state } = useActionFormState();
  const [problem, setProblem] = useState<string | null>(null);
  const serverErrors = fieldErrorsFor(state, "file");
  const errors = problem ? [problem] : serverErrors;
  const maxMb = Math.round(maxBytes / 1024 / 1024);

  return (
    <Field label={label} hint={hint ?? `CSV, Excel (.xlsx) or JSON, up to ${maxMb} MB.`} error={errors} required className="md:col-span-2">
      {(control) => (
        <input
          {...control}
          type="file"
          name="file"
          accept=".csv,.xlsx,.json,text/csv,application/json,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          className={cn(controlStyles, "h-auto min-h-11 px-3 py-2 file:mr-3 file:rounded-md file:border-0 file:bg-subtle file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-text")}
          onChange={(event) => {
            const input = event.currentTarget;
            const file = input.files?.[0];
            const message = file && file.size > maxBytes ? `This file is ${(file.size / 1024 / 1024).toFixed(1)} MB. Split it into files of at most ${maxMb} MB.` : null;
            input.setCustomValidity(message ?? "");
            setProblem(message);
          }}
        />
      )}
    </Field>
  );
}
