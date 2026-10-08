"use client";

import { useMemo, useEffect, useState } from "react";
import { Field } from "@/components/ui/Field";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { ActionForm, AdminField, useActionFormState } from "../ActionForm";
import { fieldErrorsFor, type AdminFormAction } from "../form-state";
import { progressText, streamedUploadAction, type UploadProgress } from "../streamed-upload";
import { MediaThumb } from "./MediaThumb";
import { COPYRIGHT_OPTIONS, PURPOSE_OPTIONS, VISIBILITY_OPTIONS } from "./options";
import type { Choice } from "./types";

/**
 * Media library forms (§27 licensing, §43 alt text): upload with a local preview and upload progress, and metadata
 * editing. Uploads go to the streamed route (`POST /api/v1/uploads?purpose=media`), which sniffs the real file type,
 * strips metadata, re-encodes and enforces the 10 MB cap (ARCHITECTURE §3.11) while reading; the check here only saves
 * a slow upload that would be refused anyway.
 */

export const MAX_FORM_UPLOAD_BYTES = 10 * 1024 * 1024;
const ACCEPT = "image/png,image/jpeg,image/webp,image/avif";

export interface MediaMetadataValues {
  altText: string | null;
  caption: string | null;
  longDescription: string | null;
  visibility: string;
  copyrightStatus: string;
  sourceId: string | null;
  licenceCode: string | null;
  attribution: string | null;
  author: string | null;
  sourceUrl: string | null;
}

function MetadataFields({ values, sources }: { values: MediaMetadataValues; sources: readonly Choice[] }) {
  return (
    <>
      <AdminField
        name="altText"
        label="Description (alt text)"
        type="textarea"
        rows={2}
        required
        wide
        maxLength={1000}
        defaultValue={values.altText}
        hint="What the image shows for the learning point: the labels, the trend, the values that matter. Not “diagram” or a file name."
      />
      <AdminField name="caption" label="Caption" defaultValue={values.caption} optional maxLength={1000} wide />
      <AdminField
        name="longDescription"
        label="Long description"
        type="textarea"
        rows={3}
        defaultValue={values.longDescription}
        optional
        wide
        maxLength={10000}
        hint="For complex graphs and diagrams: a fuller explanation for screen-reader users."
      />
      <AdminField name="visibility" label="Who can load it" type="select" options={VISIBILITY_OPTIONS} defaultValue={values.visibility} />
      <AdminField name="copyrightStatus" label="Copyright status" type="select" options={COPYRIGHT_OPTIONS} defaultValue={values.copyrightStatus} hint="Upload only your own, licensed or public-domain images." />
      <AdminField name="sourceId" label="Content source" type="select" options={sources} placeholder="None" defaultValue={values.sourceId} optional />
      <AdminField name="author" label="Author / creator" defaultValue={values.author} optional maxLength={200} />
      <AdminField name="licenceCode" label="Licence" defaultValue={values.licenceCode} optional maxLength={64} mono placeholder="CC-BY-4.0" />
      <AdminField name="sourceUrl" label="Source link" type="url" defaultValue={values.sourceUrl} optional maxLength={2000} />
      <AdminField name="attribution" label="Attribution text" type="textarea" rows={2} defaultValue={values.attribution} optional maxLength={1000} wide />
    </>
  );
}

function FileField() {
  const { state } = useActionFormState();
  const [preview, setPreview] = useState<{ url: string; name: string } | null>(null);
  const [tooBig, setTooBig] = useState(false);
  useEffect(() => () => (preview ? URL.revokeObjectURL(preview.url) : undefined), [preview]);
  const errors = [...(fieldErrorsFor(state, "file") ?? []), ...(tooBig ? ["This file is larger than 10 MB. Compress it or reduce its dimensions first."] : [])];
  return (
    <Field label="Image file" hint="PNG, JPEG, WebP or AVIF, up to 10 MB. Location data and other metadata are removed." error={errors.length ? errors : undefined} className="md:col-span-2">
      {(control) => (
        <div className="space-y-3">
          <input
            {...control}
            type="file"
            name="file"
            accept={ACCEPT}
            required
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (preview) URL.revokeObjectURL(preview.url);
              if (!file) {
                setPreview(null);
                setTooBig(false);
                return;
              }
              const big = file.size > MAX_FORM_UPLOAD_BYTES;
              setTooBig(big);
              if (big) {
                event.target.value = "";
                setPreview(null);
                return;
              }
              setPreview({ url: URL.createObjectURL(file), name: file.name });
            }}
            className="block w-full text-sm text-text file:mr-3 file:min-h-11 file:rounded-control file:border-0 file:bg-primary-soft file:px-4 file:font-semibold file:text-on-primary-soft"
          />
          {preview && (
            <div className="flex h-40 w-full max-w-xs items-center justify-center overflow-hidden rounded-control border border-border bg-subtle">
              <MediaThumb src={preview.url} alt={`Selected file ${preview.name}`} width={null} height={null} />
            </div>
          )}
        </div>
      )}
    </Field>
  );
}

interface MediaUploadResult {
  id: string;
  duplicateOf: string | null;
  href: string;
}

/** Upload progress for the file being sent (announced politely; hidden when idle). */
export function UploadProgressBar({ progress, className }: { progress: UploadProgress | null; className?: string }) {
  if (!progress) return null;
  const percent = progress.total ? Math.min(100, Math.round((progress.loaded / progress.total) * 100)) : null;
  return (
    <div className={className} aria-live="polite">
      <ProgressBar label="Uploading" value={percent} max={100} valueText={progressText(progress)} size="sm" />
    </div>
  );
}

export function MediaUploadForm({ sources }: { sources: readonly Choice[] }) {
  const [progress, setProgress] = useState<UploadProgress | null>(null);
  const action = useMemo(
    () =>
      streamedUploadAction<MediaUploadResult>(
        "media",
        (data) => ({
          message: data.duplicateOf ? "Uploaded. The same image was already in the library: consider reusing it." : "Uploaded.",
          redirectTo: data.href,
        }),
        setProgress,
      ) as AdminFormAction<unknown>,
    [],
  );
  return (
    <ActionForm action={action} submitLabel="Upload" pendingLabel="Uploading…" columns="two">
      <FileField />
      <UploadProgressBar progress={progress} className="md:col-span-2" />
      <AdminField name="purpose" label="Kind" type="select" options={PURPOSE_OPTIONS} defaultValue="CONTENT_IMAGE" />
      <MetadataFields
        values={{ altText: null, caption: null, longDescription: null, visibility: "AUTHENTICATED", copyrightStatus: "UNVERIFIED", sourceId: null, licenceCode: null, attribution: null, author: null, sourceUrl: null }}
        sources={sources}
      />
    </ActionForm>
  );
}

export function MediaMetadataForm({ action, id, values, sources }: { action: AdminFormAction<unknown>; id: string; values: MediaMetadataValues; sources: readonly Choice[] }) {
  return (
    <ActionForm action={action} submitLabel="Save details" columns="two" hiddenFields={{ id }} successAs="toast">
      <MetadataFields values={values} sources={sources} />
    </ActionForm>
  );
}
