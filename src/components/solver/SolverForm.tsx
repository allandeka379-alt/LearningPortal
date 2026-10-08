"use client";

import { Camera, ImageUp, Phone, X } from "lucide-react";
import Link from "next/link";
import { startTransition, useActionState, useEffect, useId, useRef, useState, type FormEvent } from "react";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { buttonStyles } from "@/components/ui/button-styles";
import { Field } from "@/components/ui/Field";
import { RadioGroup } from "@/components/ui/RadioGroup";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { cn } from "@/lib/cn";
import type { ActionResult } from "@/server/lib/errors";
import type { SolveMode, SolverHelpline, SolverSubjectOption } from "@/server/solver/types";
import { ANSWER_MODE_NOTE, formatMegabytes, newRequestId, SOLVE_MODE_OPTIONS } from "./labels";
import { prepareQuestionPhoto } from "./photo";

/** What the solve Server Action returns: an error, or a safeguarding reply. A solved question redirects instead. */
export type SolveFormState = ActionResult<{ kind: "SAFEGUARD"; helplines: SolverHelpline[] }> | null;
export type SolveFormAction = (state: SolveFormState, formData: FormData) => Promise<SolveFormState>;

export interface SolverFormProps {
  action: SolveFormAction;
  /** The student's subjects (optional picker). */
  subjects: readonly SolverSubjectOption[];
  defaultSubjectId?: string | null;
  maxInputChars: number;
  maxImageBytes: number;
  /** The plan allows photo questions (aiImageUploads). */
  imageUploads: boolean;
  /** Server-generated id for the first submit (rendered into the no-JS form; replaced for a different question). */
  requestId: string;
  upgradeHref: string;
  /** Today's allowance is used up: the form is shown but cannot be sent. */
  blocked?: boolean;
}

const UPGRADE_CODES = new Set(["QUOTA_EXCEEDED", "ENTITLEMENT_REQUIRED"]);

/**
 * The question solver form (§15): type the question and/or photograph it (camera on phones via
 * `capture="environment"`, or a saved picture), optionally pick the subject, and choose "Teach me" (default) or
 * "Give me the answer". Works without JavaScript (plain multipart POST to the Server Action); with JavaScript the photo
 * is previewed and shrunk on the phone before upload, and a retry after a dropped connection reuses the request id so
 * it is not charged twice.
 */
export function SolverForm({
  action,
  subjects,
  defaultSubjectId = null,
  maxInputChars,
  maxImageBytes,
  imageUploads,
  requestId,
  upgradeHref,
  blocked = false,
}: SolverFormProps) {
  const [state, formAction, pending] = useActionState(action, null);
  const [text, setText] = useState("");
  const [mode, setMode] = useState<SolveMode>("TEACH");
  const [photo, setPhoto] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const previewRef = useRef<string | null>(null);
  const [localError, setLocalError] = useState<{ field: "text" | "photo"; message: string } | null>(null);
  const [preparing, setPreparing] = useState(false);
  const [currentRequestId, setCurrentRequestId] = useState(requestId);
  const lastFingerprint = useRef<string | null>(null);
  const cameraRef = useRef<HTMLInputElement>(null);
  const galleryRef = useRef<HTMLInputElement>(null);
  const textareaId = useId();
  const photoHintId = useId();

  // Release the last preview's object URL when the form goes away.
  useEffect(
    () => () => {
      if (previewRef.current) URL.revokeObjectURL(previewRef.current);
    },
    [],
  );

  /** Sets (or clears) the photo with a local preview, releasing the previous preview. */
  function replacePhoto(next: File | null): void {
    if (previewRef.current) URL.revokeObjectURL(previewRef.current);
    const url = next && typeof URL.createObjectURL === "function" ? URL.createObjectURL(next) : null;
    previewRef.current = url;
    setPreviewUrl(url);
    setPhoto(next);
  }

  const serverFieldErrors = state && !state.ok ? state.error.fieldErrors : undefined;
  const textError = localError?.field === "text" ? localError.message : serverFieldErrors?.text;
  const photoError = localError?.field === "photo" ? localError.message : serverFieldErrors?.photo;
  const subjectError = serverFieldErrors?.subjectId;
  const formError = state && !state.ok && !serverFieldErrors?.text && !serverFieldErrors?.photo ? state.error : null;
  const safeguard = state?.ok ? state.data : null;
  const busy = pending || preparing;

  function choosePhoto(source: "camera" | "gallery", file: File | undefined): void {
    setLocalError(null);
    // One photo per question: picking from one input clears the other.
    const other = source === "camera" ? galleryRef.current : cameraRef.current;
    if (other) other.value = "";
    if (!file || file.size === 0) {
      replacePhoto(null);
      return;
    }
    if (!file.type.startsWith("image/") && file.type !== "") {
      setLocalError({ field: "photo", message: "Please choose a photo (JPEG, PNG or WebP)." });
      replacePhoto(null);
      return;
    }
    replacePhoto(file);
  }

  function removePhoto(): void {
    replacePhoto(null);
    setLocalError(null);
    if (cameraRef.current) cameraRef.current.value = "";
    if (galleryRef.current) galleryRef.current.value = "";
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    if (busy || blocked) return;
    const form = event.currentTarget;
    setLocalError(null);
    if (text.trim().length === 0 && !photo) {
      setLocalError({ field: "text", message: "Type your question or add a photo of it." });
      document.getElementById(textareaId)?.focus();
      return;
    }
    const formData = new FormData(form);
    formData.delete("photo");
    if (photo) {
      setPreparing(true);
      const prepared = await prepareQuestionPhoto(photo);
      setPreparing(false);
      if (prepared.size > maxImageBytes) {
        setLocalError({ field: "photo", message: `This photo is too large (maximum ${formatMegabytes(maxImageBytes)}).` });
        return;
      }
      formData.set("photo", prepared, prepared.name);
    }
    // Same question again (a retry after a dropped connection): same id, so it opens the stored answer instead of
    // being charged twice. A different question gets a new id.
    const fingerprint = [mode, String(formData.get("subjectId") ?? ""), text.trim(), photo ? `${photo.name}:${photo.size}:${photo.lastModified}` : ""].join("|");
    let id = currentRequestId;
    if (lastFingerprint.current !== null && lastFingerprint.current !== fingerprint) {
      id = newRequestId();
      setCurrentRequestId(id);
    }
    lastFingerprint.current = fingerprint;
    formData.set("clientRequestId", id);
    startTransition(() => formAction(formData));
  }

  return (
    <form action={formAction} onSubmit={onSubmit} className="space-y-5" aria-label="Ask the question solver" noValidate>
      <input type="hidden" name="clientRequestId" value={currentRequestId} />

      {safeguard && <SafeguardPanel helplines={safeguard.helplines} />}

      <Field
        label="Your question"
        id={textareaId}
        hint={imageUploads ? "Type or paste the whole question, including any numbers and units. You can add a photo instead." : "Type or paste the whole question, including any numbers and units."}
        error={textError ?? null}
      >
        <Textarea
          name="text"
          rows={5}
          maxLength={maxInputChars}
          value={text}
          onChange={(event) => {
            setText(event.currentTarget.value);
            if (localError?.field === "text") setLocalError(null);
          }}
          autoComplete="off"
          spellCheck
        />
      </Field>
      {text.length > maxInputChars * 0.8 && (
        <p className="-mt-3 text-right text-xs text-muted">
          {text.length} / {maxInputChars}
        </p>
      )}

      {imageUploads ? (
        <fieldset className="min-w-0 space-y-2" aria-describedby={photoHintId}>
          <legend className="mb-1 text-sm font-medium text-text">
            Photo of the question <span className="font-normal text-muted">(optional)</span>
          </legend>
          <p id={photoHintId} className="text-sm text-muted">
            Make sure the whole question is in the picture and the writing is sharp. Up to {formatMegabytes(maxImageBytes)}.
          </p>
          {photo ? (
            <div className="flex items-start gap-3 rounded-card border border-border bg-subtle p-3">
              {previewUrl && (
                // eslint-disable-next-line @next/next/no-img-element -- local object URL preview, not a served asset
                <img src={previewUrl} alt="Preview of your question photo" className="max-h-40 w-auto max-w-[60%] rounded-control object-contain" />
              )}
              <div className="min-w-0 flex-1 space-y-2">
                <p className="text-sm break-words text-text">{photo.name || "Photo"}</p>
                <Button type="button" variant="outline" size="md" iconStart={<X aria-hidden="true" />} onClick={removePhoto}>
                  Remove photo
                </Button>
              </div>
            </div>
          ) : (
          <div className="flex flex-wrap gap-2">
            <label className={cn(buttonStyles({ variant: "outline" }), "cursor-pointer has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-focus")}>
              <Camera aria-hidden="true" />
              Take a photo
              <input
                ref={cameraRef}
                type="file"
                name="photo"
                accept="image/*"
                capture="environment"
                className="sr-only"
                onChange={(event) => choosePhoto("camera", event.currentTarget.files?.[0])}
              />
            </label>
            <label className={cn(buttonStyles({ variant: "outline" }), "cursor-pointer has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-focus")}>
              <ImageUp aria-hidden="true" />
              Upload a photo
              <input
                ref={galleryRef}
                type="file"
                name="photo"
                accept="image/*"
                className="sr-only"
                onChange={(event) => choosePhoto("gallery", event.currentTarget.files?.[0])}
              />
            </label>
          </div>
          )}
          {photoError && (
            <p role="alert" className="text-sm text-danger-text">
              {Array.isArray(photoError) ? photoError.join(" ") : photoError}
            </p>
          )}
        </fieldset>
      ) : (
        <p className="text-sm text-muted">
          Photo questions aren&apos;t included in your plan.{" "}
          <Link href={upgradeHref} className="text-primary underline">
            See plans
          </Link>
        </p>
      )}

      {subjects.length > 0 && (
        <Field label="Subject" optional hint="Helps match the question to your syllabus topics." error={subjectError ?? null}>
          <Select
            name="subjectId"
            defaultValue={defaultSubjectId ?? ""}
            placeholder="Not sure"
            options={subjects.map((subject) => ({ value: subject.subjectId, label: `${subject.name} (${subject.qualification})` }))}
          />
        </Field>
      )}

      <RadioGroup
        legend="How should we help?"
        name="mode"
        appearance="card"
        value={mode}
        onValueChange={(value) => setMode(value === "ANSWER" ? "ANSWER" : "TEACH")}
        options={SOLVE_MODE_OPTIONS.map((option) => ({ value: option.mode, label: option.label, description: option.description }))}
      />
      {mode === "ANSWER" && <p className="text-sm text-muted">{ANSWER_MODE_NOTE}</p>}

      <div className="space-y-2">
        <Button type="submit" size="lg" loading={busy} loadingText={preparing ? "Preparing photo…" : "Working it out…"} disabled={blocked} fullWidth className="sm:w-auto">
          {mode === "ANSWER" ? "Show the worked answer" : "Help me solve it"}
        </Button>
        <p aria-live="polite" role="status" className="min-h-5 text-sm text-muted">
          {pending ? "Working it out. This can take up to a minute." : ""}
        </p>
      </div>

      {formError && (
        <Alert
          role="alert"
          tone={UPGRADE_CODES.has(formError.code) ? "accent" : "danger"}
          title={formError.message}
          action={
            UPGRADE_CODES.has(formError.code) ? (
              <Link href={upgradeHref} className={buttonStyles({ variant: "accent" })}>
                See plans
              </Link>
            ) : undefined
          }
        />
      )}
    </form>
  );
}

/** Supportive reply with help contacts (Setting `safety.helplines`): shown instead of a solution. */
function SafeguardPanel({ helplines }: { helplines: readonly SolverHelpline[] }) {
  return (
    <div role="status" className="rounded-card border border-border bg-subtle p-4 text-sm">
      <p className="text-base font-semibold text-text">You don&apos;t have to deal with this alone</p>
      <p className="mt-1 text-muted">
        It sounds like things are hard right now. Please talk to someone you trust today: a parent, guardian, teacher or school
        counsellor can help.
      </p>
      {helplines.length > 0 && (
        <ul className="mt-3 space-y-2">
          {helplines.map((line) => (
            <li key={`${line.name}-${line.phone ?? line.url ?? ""}`} className="text-text">
              <span className="font-medium">{line.name}</span>
              {line.phone && (
                <a href={`tel:${line.phone.replace(/[^\d+]/g, "")}`} className="ml-2 inline-flex min-h-11 items-center gap-1 text-primary underline">
                  <Phone aria-hidden="true" className="size-4" />
                  {line.phone}
                </a>
              )}
              {line.url && (
                <a href={line.url} className="ml-2 text-primary underline" rel="noopener noreferrer" target="_blank">
                  Website
                </a>
              )}
              {line.description && <p className="text-muted">{line.description}</p>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
