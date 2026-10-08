import { MULTI_VALUE_SEPARATOR, type AdminActionState, type AdminFormAction, type AdminFormValues } from "./form-state";

/**
 * Client side of the streamed upload route (`POST /api/v1/uploads?purpose=…`, src/app/api/v1/uploads/route.ts): files
 * larger than the Server Action body limit are posted directly as multipart with upload PROGRESS (XMLHttpRequest
 * reports request-body progress; fetch does not), and the JSON envelope is mapped onto the admin form state so
 * `ActionForm` shows field errors, the confirmation and the redirect exactly as for a Server Action.
 */

export type UploadPurpose = "media" | "import";

export interface UploadProgress {
  loaded: number;
  /** Null when the browser cannot tell the total size. */
  total: number | null;
}

interface UploadEnvelope<T> {
  data?: T;
  error?: { code: string; message: string; fieldErrors?: Record<string, string[]> };
}

/** POSTs `body` to the upload route, reporting progress; resolves with the HTTP status and parsed JSON (if any). */
export function postUpload<T>(purpose: UploadPurpose, body: FormData, onProgress?: (progress: UploadProgress) => void): Promise<{ status: number; envelope: UploadEnvelope<T> | null }> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `/api/v1/uploads?purpose=${encodeURIComponent(purpose)}`);
    xhr.setRequestHeader("accept", "application/json");
    xhr.upload.onprogress = (event) => onProgress?.({ loaded: event.loaded, total: event.lengthComputable ? event.total : null });
    xhr.onload = () => {
      let envelope: UploadEnvelope<T> | null = null;
      try {
        envelope = xhr.responseText ? (JSON.parse(xhr.responseText) as UploadEnvelope<T>) : null;
      } catch {
        envelope = null;
      }
      resolve({ status: xhr.status, envelope });
    };
    xhr.onerror = () => reject(new Error("network"));
    xhr.onabort = () => reject(new Error("aborted"));
    xhr.send(body);
  });
}

/** Non-secret text fields of the submitted form, so a failed upload re-fills them (the file input never can). */
function submittedValues(formData: FormData): AdminFormValues {
  const values: AdminFormValues = {};
  for (const [key, value] of formData.entries()) {
    if (typeof value !== "string" || key.startsWith("$ACTION") || /password|token|secret/i.test(key)) continue;
    const text = value.slice(0, 10_000);
    values[key] = key in values ? `${values[key]}${MULTI_VALUE_SEPARATOR}${text}` : text;
  }
  return values;
}

/**
 * An `ActionForm` action that uploads the form to the streamed route. `onSuccess` turns the route's `data` into the
 * confirmation message and the page to open next.
 */
export function streamedUploadAction<T>(
  purpose: UploadPurpose,
  onSuccess: (data: T) => { message: string; redirectTo?: string },
  onProgress?: (progress: UploadProgress | null) => void,
): AdminFormAction<T> {
  return async (_state, formData): Promise<AdminActionState<T>> => {
    onProgress?.({ loaded: 0, total: null });
    try {
      const { status, envelope } = await postUpload<T>(purpose, formData, (progress) => onProgress?.(progress));
      if (status >= 200 && status < 300 && envelope?.data !== undefined) {
        return { ok: true, data: envelope.data, ...onSuccess(envelope.data) };
      }
      const error = envelope?.error ?? { code: "INTERNAL", message: status === 413 ? "The file is too large." : "The upload failed. Please try again." };
      return { ok: false, error, values: submittedValues(formData) };
    } catch {
      return {
        ok: false,
        error: { code: "INTERNAL", message: "The upload was interrupted. Check your connection and try again." },
        values: submittedValues(formData),
      };
    } finally {
      onProgress?.(null);
    }
  };
}

/** "3.2 of 9.8 MB" style text for a progress bar. */
export function progressText(progress: UploadProgress): string {
  const mb = (bytes: number) => (bytes / 1024 / 1024).toFixed(1);
  return progress.total ? `${mb(progress.loaded)} of ${mb(progress.total)} MB uploaded` : `${mb(progress.loaded)} MB uploaded`;
}
