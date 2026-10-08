import { notFound } from "next/navigation";
import { ConfirmAction } from "@/components/admin/ConfirmAction";
import { AdminSection, KeyValueList, Timestamp } from "@/components/admin/DetailParts";
import { requireAdminPage } from "@/components/admin/guards";
import { DemoBadge } from "@/components/admin/StatusBadge";
import { RichContent } from "@/components/content/RichContent";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Alert } from "@/components/ui/Alert";
import { Badge } from "@/components/ui/Badge";
import { getFaqItem, type FaqDetail } from "@/server/cms/faq/service";
import { isAppError } from "@/server/lib/errors";
import { faqCategoryLabel } from "@/server/marketing/faq";
import { AuditTrail } from "../../plans/_shared/AuditTrail";
import { FaqForm } from "../_components/FaqForm";
import { deleteFaqAction, publishFaqAction, unpublishFaqAction, updateFaqAction } from "../actions";

export const metadata = { title: "FAQ entry" };

/** /admin/faq/[id] — edit an FAQ entry with a preview rendered exactly as the public site renders it; publish state. */
export default async function FaqEntryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const actor = await requireAdminPage("content.publish", { next: `/admin/faq/${id}` });
  let item: FaqDetail;
  try {
    item = await getFaqItem(actor, id);
  } catch (error) {
    if (isAppError(error) && (error.code === "NOT_FOUND" || error.code === "VALIDATION")) notFound();
    throw error;
  }

  return (
    <Container size="wide">
      <PageHeader
        title={item.question}
        breadcrumbs={[{ label: "FAQ", href: "/admin/faq" }, { label: faqCategoryLabel(item.category) }]}
        description={
          <span className="flex flex-wrap items-center gap-2">
            {item.isPublished ? <Badge tone="success">Published</Badge> : <Badge appearance="outline">Not published</Badge>}
            {item.isDemo && <DemoBadge size="md" />}
            <span className="text-sm text-muted">
              {faqCategoryLabel(item.category)} · {item.locale}
            </span>
          </span>
        }
      />
      {item.isDemo && (
        <Alert tone="info" className="mb-4">
          Development placeholder: demo entries are never shown on the public site in production.
        </Alert>
      )}
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_24rem]">
        <div className="min-w-0 space-y-6">
          <AdminSection title="Edit">
            <FaqForm
              action={updateFaqAction}
              submitLabel="Save changes"
              hiddenFields={{ faqItemId: item.id, expectedUpdatedAt: item.updatedAt.toISOString() }}
              initial={{ question: item.question, answer: item.answer, category: item.category, locale: item.locale, sortOrder: item.sortOrder }}
            />
          </AdminSection>
          <AdminSection title="Preview" description="The saved answer as the public FAQ shows it.">
            {item.warnings.length > 0 && (
              <Alert tone="warning" title="Check the answer" className="mb-4">
                <ul className="list-disc space-y-1 pl-5">
                  {item.warnings.map((warning) => (
                    <li key={warning}>{warning}</li>
                  ))}
                </ul>
              </Alert>
            )}
            <h3 className="mb-2 text-base font-semibold text-text">{item.question}</h3>
            <RichContent html={item.answerHtml} />
          </AdminSection>
        </div>
        <div className="min-w-0 space-y-6">
          <AdminSection title="Publication">
            <div className="space-y-4">
              <KeyValueList
                columns={1}
                items={[
                  { label: "State", value: item.isPublished ? "Published" : "Not published" },
                  { label: "Published", value: item.publishedAt ? <Timestamp value={item.publishedAt} /> : null, hideWhenEmpty: true },
                  { label: "Order in category", value: String(item.sortOrder) },
                  { label: "Created", value: <Timestamp value={item.createdAt} /> },
                  { label: "Last saved", value: <Timestamp value={item.updatedAt} /> },
                ]}
              />
              {item.isPublished ? (
                <ConfirmAction
                  action={unpublishFaqAction}
                  fields={{ faqItemId: item.id }}
                  triggerLabel="Unpublish"
                  title="Unpublish this FAQ entry?"
                  description="It disappears from the public site within a few minutes. You can publish it again later."
                  confirmLabel="Unpublish"
                  reason={{ label: "Reason", hint: "Optional. Recorded in the audit log.", maxLength: 500 }}
                />
              ) : (
                <ConfirmAction
                  action={publishFaqAction}
                  fields={{ faqItemId: item.id }}
                  triggerLabel="Publish"
                  triggerVariant="primary"
                  title="Publish this FAQ entry?"
                  description="It appears on the public FAQ (and on /pricing or /schools for those categories) within a few minutes."
                  confirmLabel="Publish"
                />
              )}
            </div>
          </AdminSection>
          <AdminSection title="Delete">
            {item.isPublished ? (
              <p className="text-sm text-muted">Unpublish the entry before deleting it.</p>
            ) : (
              <ConfirmAction
                action={deleteFaqAction}
                fields={{ faqItemId: item.id }}
                triggerLabel="Delete entry"
                triggerVariant="danger"
                tone="danger"
                title="Delete this FAQ entry?"
                description="This cannot be undone. The audit log keeps a record that it existed."
                confirmLabel="Delete"
                reason={{ label: "Reason", hint: "Optional. Recorded in the audit log.", maxLength: 500 }}
              />
            )}
          </AdminSection>
          <AdminSection title="History">
            <AuditTrail entries={item.audit} entityType="FaqItem" entityId={item.id} />
          </AdminSection>
        </div>
      </div>
    </Container>
  );
}
