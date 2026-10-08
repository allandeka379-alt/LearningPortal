import { Alert } from "@/components/ui/Alert";
import type { AuthFormState } from "./form-state";

/**
 * Form-level result of an auth action: the error summary (field errors are shown next to their fields) or a
 * confirmation. Rendered after a submit, so it uses live-region roles (`alert` for errors, `status` for success).
 */
export function FormStatus({ state }: { state: AuthFormState }) {
  if (state === null) return null;
  if (!state.ok) {
    return (
      <Alert tone="danger" role="alert">
        {state.error.message}
      </Alert>
    );
  }
  if (state.data?.message) {
    return (
      <Alert tone="success" role="status">
        {state.data.message}
      </Alert>
    );
  }
  return null;
}
