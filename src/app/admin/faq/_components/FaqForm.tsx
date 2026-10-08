import type { ReactNode } from "react";
import { ActionForm, AdminField } from "@/components/admin/ActionForm";
import type { AdminFormAction } from "@/components/admin/form-state";
import { FAQ_LIMITS, FAQ_SUGGESTED_CATEGORIES } from "@/server/cms/faq/schemas";

/** Create / edit form for one FAQ entry (Markdown answer; maths with $…$). Server-compatible. */
export function FaqForm({
  action,
  submitLabel,
  hiddenFields,
  initial = {},
  secondaryActions,
}: {
  action: AdminFormAction<unknown>;
  submitLabel: string;
  hiddenFields?: Readonly<Record<string, string>>;
  initial?: { question?: string; answer?: string; category?: string; locale?: string; sortOrder?: number };
  secondaryActions?: ReactNode;
}) {
  return (
    <ActionForm action={action} submitLabel={submitLabel} hiddenFields={hiddenFields} columns="two" successAs="toast" secondaryActions={secondaryActions}>
      <AdminField name="question" label="Question" required wide maxLength={FAQ_LIMITS.question} defaultValue={initial.question} />
      <AdminField
        name="answer"
        label="Answer"
        type="textarea"
        rows={10}
        required
        wide
        maxLength={FAQ_LIMITS.answer}
        defaultValue={initial.answer}
        hint="Markdown: **bold**, lists, [links](https://…) and maths between $ signs. Images are not shown in FAQ answers."
      />
      <AdminField
        name="category"
        label="Category"
        required
        maxLength={FAQ_LIMITS.category}
        defaultValue={initial.category ?? "general"}
        hint={`Group key, e.g. ${FAQ_SUGGESTED_CATEGORIES.join(", ")}. "general" also shows on the home page, "pricing" on /pricing and "schools" on /schools.`}
      />
      <AdminField name="locale" label="Language" maxLength={FAQ_LIMITS.locale} defaultValue={initial.locale ?? "en"} hint="en, sn (Shona), nd (Ndebele)…" />
      <AdminField
        name="sortOrder"
        label="Order"
        type="number"
        min={0}
        optional
        defaultValue={initial.sortOrder}
        hint="Lower numbers first within the category. Empty = last. You can also use the arrows on the list."
      />
    </ActionForm>
  );
}
