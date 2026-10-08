import { Archive, CircleCheck, CircleX, Rocket, Trash2 } from "lucide-react";
import { AdminField } from "@/components/admin/ActionForm";
import { ConfirmAction } from "@/components/admin/ConfirmAction";
import type { AdminFormAction } from "@/components/admin/form-state";
import { RadioGroup } from "@/components/ui/RadioGroup";
import { ActionFieldErrors, FormDialog } from "./FormDialog";

/**
 * Lifecycle controls of one syllabus version (§26): publish a draft (as CURRENT or UPCOMING), make an upcoming or
 * superseded version current, archive, delete a draft — each behind a confirmation that spells out the consequences.
 * The publish checklist mirrors the database rules (§27: cleared copyright and a named source). Server component.
 */

export interface VersionLifecycleProps {
  id: string;
  status: string;
  versionLabel: string;
  permissions: { canPublish: boolean; canMakeCurrent: boolean; canArchive: boolean; canDelete: boolean };
  /** field → problems for publishing (empty = ready). */
  publishProblems: Readonly<Record<string, readonly string[]>>;
  publishBlockedByFourEyes: boolean;
  canDraft: boolean;
  currentVersionLabel: string | null;
  pinnedEnrollments: number;
  effectiveFromInFuture: boolean;
  actions: {
    publish: AdminFormAction<unknown>;
    makeCurrent: AdminFormAction<unknown>;
    archive: AdminFormAction<unknown>;
    deleteDraft: AdminFormAction<unknown>;
  };
}

const CHECKLIST: readonly { key: string; label: string }[] = [
  { key: "copyrightStatus", label: "Copyright cleared (not unverified)" },
  { key: "sourceId", label: "Source of the structure recorded" },
  { key: "effectiveTo", label: "Effective dates are a valid range" },
  { key: "_form", label: "Draft with at least one topic" },
];

export function VersionLifecycle(props: VersionLifecycleProps) {
  const { id, status, permissions, publishProblems, actions } = props;
  const isDraft = status === "DRAFT";
  const ready = Object.keys(publishProblems).length === 0;
  const previous = props.currentVersionLabel;

  return (
    <div className="space-y-4">
      {isDraft && (
        <>
          <ul className="space-y-1.5 text-sm" aria-label="Publish checklist">
            {CHECKLIST.map((item) => {
              const problems = publishProblems[item.key];
              return (
                <li key={item.key} className="flex items-start gap-2">
                  {problems ? (
                    <CircleX aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-danger-text" />
                  ) : (
                    <CircleCheck aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-success-text" />
                  )}
                  <span>
                    <span className="sr-only">{problems ? "Not done: " : "Done: "}</span>
                    {item.label}
                    {problems && <span className="block text-muted">{problems.join(" ")}</span>}
                  </span>
                </li>
              );
            })}
          </ul>
          {!permissions.canPublish && <p className="text-sm text-muted">An admin publishes syllabus versions. Ask an admin to review this draft.</p>}
          {permissions.canPublish && props.publishBlockedByFourEyes && (
            <p className="text-sm text-warning-text">You created this draft, so another admin must publish it (four-eyes rule).</p>
          )}
        </>
      )}

      <div className="flex flex-wrap gap-2">
        {isDraft && permissions.canPublish && (
          <FormDialog
            action={actions.publish}
            hiddenFields={{ id }}
            triggerLabel="Publish version"
            triggerVariant="primary"
            triggerSize="md"
            triggerIcon={<Rocket aria-hidden="true" />}
            disabled={!ready || props.publishBlockedByFourEyes}
            title={`Publish ${props.versionLabel}?`}
            description="Publishing freezes the topic tree, objectives, papers and routes. Later changes need a new version."
            submitLabel="Publish"
            pendingLabel="Publishing…"
          >
            <RadioGroup
              legend="Publish as"
              name="mode"
              defaultValue={props.effectiveFromInFuture ? "UPCOMING" : "CURRENT"}
              options={[
                {
                  value: "CURRENT",
                  label: "Current version",
                  description: previous
                    ? `New enrolments get this version. "${previous}" stops being current; students on it keep it.`
                    : "New enrolments get this version.",
                },
                { value: "UPCOMING", label: "Upcoming version", description: "Published for a future start date; the current version stays the default." },
              ]}
              className="md:col-span-2"
            />
            {previous && (
              <AdminField
                name="archivePrevious"
                label={`Archive "${previous}" instead of keeping it as superseded`}
                type="checkbox"
                description="Archived versions take no new enrolments. Choose this only when the old syllabus is no longer examined."
                wide
              />
            )}
            <ActionFieldErrors names={["mode", "copyrightStatus", "sourceId", "effectiveTo", "_form"]} />
          </FormDialog>
        )}

        {permissions.canMakeCurrent && (
          <FormDialog
            action={actions.makeCurrent}
            hiddenFields={{ id }}
            triggerLabel="Make current"
            triggerVariant="primary"
            triggerSize="md"
            title={`Make ${props.versionLabel} the current version?`}
            description="New enrolments will get this version. Students stay on the version they enrolled in."
            submitLabel="Make current"
          >
            {previous ? (
              <AdminField
                name="archivePrevious"
                label={`Archive "${previous}" instead of keeping it as superseded`}
                type="checkbox"
                description="Only when the old syllabus is no longer examined."
                wide
              />
            ) : (
              <p className="text-sm text-muted md:col-span-2">No version is current right now.</p>
            )}
          </FormDialog>
        )}

        {permissions.canArchive && (
          <ConfirmAction
            action={actions.archive}
            fields={{ id }}
            triggerLabel="Archive"
            triggerIcon={<Archive aria-hidden="true" />}
            triggerSize="md"
            title={`Archive ${props.versionLabel}?`}
            description="An archived version takes no new enrolments."
            confirmLabel="Archive version"
            tone="danger"
          >
            {props.pinnedEnrollments > 0
              ? `${props.pinnedEnrollments} enrolled students are on this version. They keep their topics and content.`
              : "No students are enrolled on this version."}
          </ConfirmAction>
        )}

        {isDraft && permissions.canDelete && (
          <ConfirmAction
            action={actions.deleteDraft}
            fields={{ id }}
            triggerLabel="Delete draft"
            triggerIcon={<Trash2 aria-hidden="true" />}
            triggerSize="md"
            triggerVariant="ghost"
            title={`Delete the draft ${props.versionLabel}?`}
            description="This removes the draft with its topics, objectives, papers and routes. It cannot be undone."
            confirmLabel="Delete draft"
            tone="danger"
          >
            Drafts with content tagged to them cannot be deleted; remove those tags first.
          </ConfirmAction>
        )}
      </div>
      {!isDraft && !permissions.canMakeCurrent && !permissions.canArchive && (
        <p className="text-sm text-muted">
          {status === "CURRENT"
            ? "This is the current version. To replace it, create a new version, then publish it as current."
            : status === "ARCHIVED"
              ? "Archived versions are kept read-only so enrolled students keep their history."
              : "Only an admin can change the status of a published version."}
        </p>
      )}
    </div>
  );
}
