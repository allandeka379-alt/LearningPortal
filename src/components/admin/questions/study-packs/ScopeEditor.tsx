"use client";

import { Plus, Save, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useRef, useState } from "react";
import type { AdminActionState, AdminFormAction } from "@/components/admin/form-state";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import { useToast } from "@/components/ui/Toast";
import type { Option } from "@/server/cms/questions/lookups";
import type { ScopeKind } from "@/server/cms/study-packs/schemas";
import type { StudyPackScopeView } from "@/server/cms/study-packs/service";
import { SelectInput } from "../editor/fields";

/**
 * Scope rules of a study pack (§24): every subject of a qualification, one subject (whichever syllabus version the
 * student is pinned to) or one syllabus version only. Saved as a whole list.
 */

const KIND_OPTIONS: { value: ScopeKind; label: string }[] = [
  { value: "QUALIFICATION", label: "Every subject of a qualification" },
  { value: "SUBJECT", label: "A subject (any syllabus version)" },
  { value: "SYLLABUS", label: "One syllabus version only" },
];

export interface ScopeTargets {
  qualifications: readonly Option[];
  subjects: readonly Option[];
  syllabi: readonly Option[];
}

export function ScopeEditor({
  packId,
  version,
  initial,
  targets,
  editable,
  saveAction,
}: {
  packId: string;
  version: string;
  initial: readonly StudyPackScopeView[];
  targets: ScopeTargets;
  editable: boolean;
  saveAction: AdminFormAction<{ pdfExportTurnedOff: boolean }>;
}) {
  const [scopes, setScopes] = useState<StudyPackScopeView[]>([...initial]);
  const [kind, setKind] = useState<ScopeKind>("SUBJECT");
  const [targetId, setTargetId] = useState("");
  const [dirty, setDirty] = useState(false);
  const [state, formAction, pending] = useActionState<AdminActionState<{ pdfExportTurnedOff: boolean }>, FormData>(saveAction, null);
  const router = useRouter();
  const { toast } = useToast();
  const handled = useRef<typeof state>(null);

  useEffect(() => {
    if (!state || handled.current === state || !state.ok) return;
    handled.current = state;
    toast({
      title: "Scope saved.",
      description: state.data.pdfExportTurnedOff ? "PDF export was switched off: some newly included items do not permit it." : undefined,
      tone: "success",
    });
    router.refresh();
  }, [state, toast, router]);

  const options = kind === "QUALIFICATION" ? targets.qualifications : kind === "SUBJECT" ? targets.subjects : targets.syllabi;
  const labelOf = (k: ScopeKind, id: string) => {
    const list = k === "QUALIFICATION" ? targets.qualifications : k === "SUBJECT" ? targets.subjects : targets.syllabi;
    const label = list.find((o) => o.value === id)?.label ?? id;
    return k === "QUALIFICATION" ? `Every subject of ${label}` : k === "SUBJECT" ? `${label}, any syllabus version` : `${label} only`;
  };
  const failure = state !== null && !state.ok ? state.error : null;

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="id" value={packId} />
      <input type="hidden" name="version" value={version} />
      <input type="hidden" name="scopes" value={JSON.stringify(scopes.map((s) => ({ kind: s.kind, targetId: s.targetId })))} />
      {failure && (
        <Alert tone="danger" role="alert">
          {Object.values(failure.fieldErrors ?? {}).flat().join(" ") || failure.message}
        </Alert>
      )}
      {scopes.length === 0 ? (
        <p className="text-sm text-muted">No scope yet: the pack unlocks nothing and cannot be sold.</p>
      ) : (
        <ul className="divide-y divide-border rounded-card border border-border">
          {scopes.map((scope, index) => (
            <li key={`${scope.kind}:${scope.targetId}`} className="flex items-center gap-3 px-3 py-2 text-sm">
              <span className="min-w-0 flex-1 text-text">{scope.label}</span>
              {editable && (
                <IconButton
                  icon={<Trash2 aria-hidden="true" />}
                  aria-label={`Remove ${scope.label}`}
                  size="sm"
                  onClick={() => {
                    setScopes(scopes.filter((_, i) => i !== index));
                    setDirty(true);
                  }}
                />
              )}
            </li>
          ))}
        </ul>
      )}
      {editable && (
        <>
          <div className="grid gap-3 md:grid-cols-[16rem_1fr_auto] md:items-end">
            <SelectInput label="Rule" value={kind} options={KIND_OPTIONS} onChange={(value) => { setKind(value as ScopeKind); setTargetId(""); }} />
            <SelectInput label="Covers" value={targetId} placeholder="Choose" options={options} onChange={setTargetId} />
            <Button
              type="button"
              variant="outline"
              iconStart={<Plus aria-hidden="true" />}
              disabled={!targetId || scopes.some((s) => s.kind === kind && s.targetId === targetId)}
              onClick={() => {
                setScopes([...scopes, { kind, targetId, label: labelOf(kind, targetId) }]);
                setTargetId("");
                setDirty(true);
              }}
            >
              Add rule
            </Button>
          </div>
          <div className="flex items-center gap-3">
            <Button type="submit" iconStart={<Save aria-hidden="true" />} loading={pending} loadingText="Saving…" disabled={!dirty}>
              Save scope
            </Button>
            {dirty && <span className="text-sm text-muted">Unsaved changes</span>}
          </div>
        </>
      )}
    </form>
  );
}
