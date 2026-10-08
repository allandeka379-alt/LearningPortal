import Link from "next/link";
import { notFound } from "next/navigation";
import { ConfirmAction } from "@/components/admin/ConfirmAction";
import { AdminSection, KeyValueList, Timestamp } from "@/components/admin/DetailParts";
import { formatMoneyMinor } from "@/components/admin/format";
import { requireAdminPage } from "@/components/admin/guards";
import { ChecksList, ContentWorkflowPanel, RevisionHistory } from "@/components/admin/questions/ContentPanels";
import { ENTITLEMENT_FLAG_LABELS, ENTITLEMENT_LIMIT_LABELS, PDF_TYPE_LABELS } from "@/components/admin/questions/labels";
import { ScopeEditor } from "@/components/admin/questions/study-packs/ScopeEditor";
import { StudyPackDetailsForm, StudyPackPriceForm } from "@/components/admin/questions/study-packs/StudyPackForms";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Alert } from "@/components/ui/Alert";
import { Badge } from "@/components/ui/Badge";
import { DataTable } from "@/components/ui/DataTable";
import { DEFAULT_TIMEZONE } from "@/lib/config";
import { formatNumber } from "@/lib/format";
import { db } from "@/server/db";
import { isAppError } from "@/server/lib/errors";
import { instantToLocalDateTime } from "@/server/cms/announcements/schemas";
import { can, isFourEyesOn } from "@/server/cms/questions/context";
import { getCurriculumOptions, getMediaByIds, getMediaOptions, getSyllabusCatalogueOptions } from "@/server/cms/questions/lookups";
import { PDF_BLOCK_LABELS } from "@/server/cms/study-packs/core";
import { getCountryOptions, getStudyPackEditor } from "@/server/cms/study-packs/service";
import {
  approveStudyPackAction,
  archiveStudyPackAction,
  reopenStudyPackAction,
  createPriceAction,
  deleteStudyPackAction,
  discardStudyPackDraftAction,
  editPublishedStudyPackAction,
  publishStudyPackAction,
  requestStudyPackChangesAction,
  saveScopesAction,
  setPriceActiveAction,
  submitStudyPackAction,
  updateStudyPackAction,
} from "../actions";

export const metadata = { title: "Study pack" };

/** /admin/study-packs/[id] — details, what the pack covers and unlocks, PDF licensing check, prices and workflow. */
export default async function StudyPackDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const actor = await requireAdminPage("content.draft", { next: `/admin/study-packs/${id}` });
  let view;
  try {
    view = await getStudyPackEditor(actor, id);
  } catch (error) {
    if (isAppError(error) && error.code === "NOT_FOUND") notFound();
    throw error;
  }
  const canPrice = can(actor, "billing.manage");
  const [recentCovers, currentCover, curriculum, syllabi, countries, fourEyes] = await Promise.all([
    getMediaOptions(["MARKETING_IMAGE"]),
    view.meta.coverImageId ? getMediaByIds([view.meta.coverImageId]) : Promise.resolve([]),
    getCurriculumOptions(actor),
    getSyllabusCatalogueOptions(),
    canPrice ? getCountryOptions(db) : Promise.resolve([]),
    isFourEyesOn(),
  ]);
  const covers = [...currentCover.filter((c) => !recentCovers.some((r) => r.value === c.value)), ...recentCovers];
  const blocked = Object.keys(view.checks.errors).length > 0;
  const unlocked = [
    view.entitlements.lessonAccess === "ALL" ? "Every lesson in scope" : null,
    ...ENTITLEMENT_FLAG_LABELS.filter(({ key }) => view.entitlements[key] === true).map(({ label }) => label),
    ...ENTITLEMENT_LIMIT_LABELS.filter(({ key }) => view.entitlements[key] !== 0).map(({ key, label, unit }) => {
      const value = view.entitlements[key];
      return value === null ? `${label}: unlimited` : `${label}: ${String(value)} ${unit}`;
    }),
  ].filter((v): v is string => v !== null);

  return (
    <Container size="wide">
      <PageHeader
        title={view.meta.title}
        eyebrow={`Study pack · ${view.meta.slug}`}
        breadcrumbs={[{ label: "Study packs", href: "/admin/study-packs" }, { label: view.draftOf ? "Edit" : view.meta.title }]}
      />
      <div className="grid gap-6 pb-10 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="min-w-0 space-y-6">
          {view.entitlementsInvalid && (
            <Alert tone="danger" title="The stored entitlements are not valid">
              Saving the details rewrites them from the choices below.
            </Alert>
          )}
          <AdminSection title="Details and what the pack unlocks" description={view.editable ? undefined : "Read-only outside Draft. Published packs change through “Edit”."}>
            {view.editable ? (
              <StudyPackDetailsForm
                action={updateStudyPackAction}
                submitLabel="Save details"
                hiddenFields={{ id: view.id, version: view.version }}
                values={view.meta}
                covers={covers}
                entitlements={view.entitlements}
                pdfCheck={view.pdfCheck}
              />
            ) : (
              <div className="space-y-4">
                <KeyValueList
                  items={[
                    { label: "Subtitle", value: view.meta.subtitle ?? null },
                    { label: "Featured", value: view.meta.isFeatured ? "Yes" : "No" },
                    { label: "PDF export", value: view.meta.allowPdfExport ? "Offered" : "Off" },
                    { label: "Cover", value: view.cover?.alt ?? (view.cover ? "Set" : null) },
                  ]}
                />
                <div>
                  <h3 className="text-sm font-semibold text-text">Unlocks</h3>
                  {unlocked.length === 0 ? <p className="text-sm text-muted">Nothing yet.</p> : <ul className="mt-1 list-inside list-disc text-sm text-text">{unlocked.map((u) => <li key={u}>{u}</li>)}</ul>}
                </div>
              </div>
            )}
          </AdminSection>

          <AdminSection title="What the pack covers" description="Students who buy the pack get the features above for content in these scopes, always the current published content.">
            <ScopeEditor
              key={view.version}
              packId={view.id}
              version={view.version}
              initial={view.scopes}
              editable={view.editable}
              targets={{ qualifications: curriculum.qualifications, subjects: curriculum.subjects, syllabi }}
              saveAction={saveScopesAction}
            />
          </AdminSection>

          <AdminSection title="PDF export licensing" description="§24 / §27: PDF export may only be offered when every included item's licence permits it.">
            {view.pdfCheck.emptyScope ? (
              <p className="text-sm text-muted">Add scope rules to check the included content.</p>
            ) : (
              <div className="space-y-3">
                <p className={view.pdfCheck.allowed ? "text-sm text-success-text" : "text-sm text-warning-text"}>
                  {view.pdfCheck.total === 0
                    ? "The scope includes no published content yet."
                    : view.pdfCheck.allowed
                      ? `All ${formatNumber(view.pdfCheck.total)} included items permit PDF export.`
                      : `${formatNumber(view.pdfCheck.blocked)} of ${formatNumber(view.pdfCheck.total)} included items do not permit PDF export.`}
                </p>
                <ul className="space-y-3">
                  {view.pdfCheck.byType.map((type) => (
                    <li key={type.type} className="text-sm">
                      <span className="font-medium text-text">{PDF_TYPE_LABELS[type.type]}</span>: {formatNumber(type.total)} included
                      {type.blocked > 0 ? <Badge size="sm" tone="warning" className="ml-2">{formatNumber(type.blocked)} blocked</Badge> : null}
                      {type.examples.length > 0 && (
                        <ul className="mt-1 space-y-0.5 pl-4 text-muted">
                          {type.examples.map((example) => (
                            <li key={example.id}>
                              {type.type === "QUESTION" ? (
                                <Link href={`/admin/questions/${example.id}`} className="underline underline-offset-2">{example.title || example.id}</Link>
                              ) : type.type === "ASSESSMENT" ? (
                                <Link href={`/admin/exams/${example.id}`} className="underline underline-offset-2">{example.title || example.id}</Link>
                              ) : (
                                <span>{example.title || example.id}</span>
                              )}{" "}
                              — {PDF_BLOCK_LABELS[example.reason]}
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </AdminSection>

          <AdminSection
            title="Prices"
            description={canPrice ? "One-off prices per currency (and optionally country). A price is never edited: add a new one and withdraw the old." : "Prices are managed by administrators."}
            flush
          >
            {view.draftOf && <p className="px-4 pb-3 text-sm text-muted sm:px-6">Prices belong to the live pack and apply to every revision.</p>}
            <DataTable
              caption="Prices"
              rows={view.prices}
              rowKey={(row) => row.id}
              empty={<p className="px-4 py-6 text-sm text-muted sm:px-6">No price yet: the pack cannot be bought.</p>}
              columns={[
                {
                  key: "amount",
                  header: "Price",
                  primary: true,
                  cell: (row) => (
                    <span>
                      <span className="font-semibold text-text">{formatMoneyMinor(row.amountMinor, row.currency)}</span>
                      <span className="block text-xs text-muted">
                        {row.label ?? "No label"} · {row.periodDays ? `${row.periodDays} days access` : "no expiry"} · {row.country ?? "every country"}
                      </span>
                    </span>
                  ),
                },
                {
                  key: "window",
                  header: "Available",
                  hideOnMobile: true,
                  cell: (row) => (
                    <span className="text-sm">
                      <Timestamp value={row.validFrom} />
                      {row.validTo ? (
                        <>
                          {" "}
                          to <Timestamp value={row.validTo} />
                        </>
                      ) : (
                        " onwards"
                      )}
                    </span>
                  ),
                },
                { key: "payments", header: "Payments", align: "end", hideOnMobile: true, cell: (row) => formatNumber(row.paymentCount) },
                {
                  key: "state",
                  header: "State",
                  cell: (row) =>
                    canPrice ? (
                      <ConfirmAction
                        action={setPriceActiveAction}
                        fields={{
                          priceId: row.id,
                          studyPackId: view.liveId,
                          isActive: row.isActive ? "false" : "true",
                          label: row.label ?? "",
                          sortOrder: String(row.sortOrder),
                          validTo: row.validTo ? instantToLocalDateTime(row.validTo, DEFAULT_TIMEZONE) : "",
                        }}
                        triggerLabel={row.isActive ? "Withdraw" : "Offer again"}
                        tone={row.isActive ? "danger" : "primary"}
                        title={row.isActive ? "Withdraw this price?" : "Offer this price again?"}
                        description={row.isActive ? "Buyers can no longer choose it. Past payments keep pointing at it." : "Buyers can choose it again within its availability window."}
                        confirmLabel={row.isActive ? "Withdraw price" : "Offer price"}
                      />
                    ) : (
                      <Badge size="sm" tone={row.isActive ? "success" : "neutral"}>
                        {row.isActive ? "Offered" : "Withdrawn"}
                      </Badge>
                    ),
                },
              ]}
            />
            {canPrice && (
              <div className="border-t border-border px-4 py-4 sm:px-6">
                <h3 className="mb-3 text-sm font-semibold text-text">Add a price</h3>
                <StudyPackPriceForm action={createPriceAction} studyPackId={view.liveId} countries={countries} />
              </div>
            )}
          </AdminSection>
        </div>

        <aside className="space-y-6" aria-label="Review and history">
          <ContentWorkflowPanel
            id={view.id}
            status={view.status}
            revision={view.revision}
            aiGenerated={view.aiGenerated}
            isDemo={view.isDemo}
            draftOf={view.draftOf}
            pendingDraft={view.pendingDraft}
            workflow={view.workflow}
            isOwnWork={view.workflow.createdById === actor.userId}
            fourEyes={fourEyes}
            blocked={blocked}
            itemLabel="this study pack"
            basePath="/admin/study-packs"
            neverPublished={view.workflow.publishedAt === null && view.revision === 1 && view.prices.length === 0}
            actions={{
              submit: can(actor, "content.draft") ? submitStudyPackAction : undefined,
              requestChanges: can(actor, "content.review") ? requestStudyPackChangesAction : undefined,
              approve: can(actor, "content.review") ? approveStudyPackAction : undefined,
              publish: can(actor, "content.publish") ? publishStudyPackAction : undefined,
              archive: can(actor, "content.archive") ? archiveStudyPackAction : undefined,
              reopen: can(actor, "content.archive") ? reopenStudyPackAction : undefined,
            }}
            editAction={editPublishedStudyPackAction}
            discardAction={discardStudyPackDraftAction}
            deleteAction={deleteStudyPackAction}
            extra={<p className="text-sm text-muted">{view.grants === 0 ? "Not bought or granted yet." : `${formatNumber(view.grants)} access grants so far.`}</p>}
          />
          <ChecksList errors={view.checks.errors} warnings={view.checks.warnings} />
          <RevisionHistory revisions={view.revisions} />
        </aside>
      </div>
    </Container>
  );
}
