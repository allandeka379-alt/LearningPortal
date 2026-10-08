"use client";

import { ChevronRight, Plus } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState, useTransition, type FormEvent, type KeyboardEvent } from "react";
import type { AdminActionState } from "@/components/admin/form-state";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { Kbd } from "@/components/ui/Kbd";
import { Select, type SelectOption } from "@/components/ui/Select";
import { cn } from "@/lib/cn";
import { TopicKindBadge } from "./CurriculumBadges";
import { OutlineImportPanel } from "./OutlineImportPanel";
import { formObject, TopicDetailPanel } from "./TopicDetailPanel";
import type { TopicCommand } from "./topic-commands";
import { allNodes, ancestorsOf, expandableIds, findNode, siblingsOf, subtreeIds, treeKeyEffect, visibleRows, type EditorNode, type VisibleRow } from "./tree-model";

/**
 * Topic tree editor of one syllabus version (§3, §26). An accessible WAI-ARIA tree (roving focus; ↑ ↓ ← → Home End;
 * Enter opens a node) next to a detail panel with button-based structure editing (up/down, indent/outdent, move
 * under, add, delete) that works with touch and keyboard alike — no drag and drop. With the keyboard, Alt + arrows
 * move the focused node. Published versions open read-only (admins may correct wording).
 *
 * Every change is a server command (validated, permission-checked and audited); the page data refreshes after it.
 */

export interface TopicTreeEditorProps {
  syllabusId: string;
  versionLabel: string;
  editable: boolean;
  canCorrect: boolean;
  roots: EditorNode[];
  components: { id: string; code: string; name: string }[];
  sources: SelectOption[];
  runCommand: (command: TopicCommand) => Promise<AdminActionState>;
}

export function TopicTreeEditor({ syllabusId, versionLabel, editable, canCorrect, roots, components, sources, runCommand }: TopicTreeEditorProps) {
  const [expanded, setExpanded] = useState<Set<string>>(() => new Set(roots.filter((root) => root.children.length > 0).map((root) => root.id)));
  const [selectedId, setSelectedId] = useState<string | null>(roots[0]?.id ?? null);
  const [focusedId, setFocusedId] = useState<string | null>(roots[0]?.id ?? null);
  const [announcement, setAnnouncement] = useState<{ tone: "success" | "danger"; message: string } | null>(null);
  const [pending, startTransition] = useTransition();
  const itemRefs = useRef(new Map<string, HTMLLIElement>());
  const restoreFocus = useRef(false);

  const rows = useMemo(() => visibleRows(roots, expanded), [roots, expanded]);
  const registerItem = useCallback((id: string, element: HTMLLIElement | null) => {
    if (element) itemRefs.current.set(id, element);
    else itemRefs.current.delete(id);
  }, []);
  const selected = findNode(roots, selectedId) ?? null;
  const focusTarget = focusedId !== null && rows.some((row) => row.node.id === focusedId) ? focusedId : (rows[0]?.node.id ?? null);

  // Move DOM focus only when the user is navigating the tree (never on first render or after unrelated updates).
  useEffect(() => {
    if (!restoreFocus.current || focusTarget === null) return;
    restoreFocus.current = false;
    itemRefs.current.get(focusTarget)?.focus();
  }, [focusTarget, rows]);

  function run(command: TopicCommand): Promise<AdminActionState> {
    return new Promise((resolve) => {
      startTransition(async () => {
        const result = await runCommand(command);
        if (result === null) setAnnouncement(null);
        else if (!result.ok) {
          // Field errors are shown next to their fields by the forms; structure errors are announced here.
          const hasFieldErrors = result.error.fieldErrors && Object.keys(result.error.fieldErrors).some((key) => key !== "_form");
          setAnnouncement(hasFieldErrors ? null : { tone: "danger", message: result.error.fieldErrors?._form?.join(" ") ?? result.error.message });
        } else if (result.message) setAnnouncement({ tone: "success", message: result.message });
        else setAnnouncement(null);
        if (result?.ok && command.type === "delete") {
          const deleted = findNode(roots, command.input.id);
          setSelectedId(deleted?.parentId ?? null);
          setFocusedId(deleted?.parentId ?? null);
        }
        resolve(result);
      });
    });
  }

  /** Selects a node and reveals it (`parentId` is passed for a node the refreshed tree may not contain yet). */
  function select(id: string, parentId?: string) {
    setSelectedId(id);
    setFocusedId(id);
    setExpanded((current) => {
      const next = new Set(current);
      for (const ancestor of ancestorsOf(roots, id)) next.add(ancestor.id);
      if (parentId) next.add(parentId);
      return next;
    });
  }

  function onTreeKeyDown(event: KeyboardEvent<HTMLUListElement>) {
    if (focusTarget === null) return;
    if (event.altKey && editable && ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)) {
      event.preventDefault();
      restoreFocus.current = true;
      const id = focusTarget;
      if (event.key === "ArrowUp" || event.key === "ArrowDown") void run({ type: "move", syllabusId, input: { id, direction: event.key === "ArrowUp" ? "up" : "down" } });
      else void run({ type: "shift", syllabusId, input: { id, operation: event.key === "ArrowRight" ? "indent" : "outdent" } });
      return;
    }
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setSelectedId(focusTarget);
      return;
    }
    const effect = treeKeyEffect(rows, focusTarget, event.key, expanded);
    if (effect.kind === "none") return;
    event.preventDefault();
    restoreFocus.current = true;
    if (effect.kind === "focus") setFocusedId(effect.id);
    else if (effect.kind === "expand") setExpanded((current) => new Set(current).add(effect.id));
    else
      setExpanded((current) => {
        const next = new Set(current);
        next.delete(effect.id);
        return next;
      });
  }

  function toggle(id: string) {
    setExpanded((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const nodeCount = useMemo(() => allNodes(roots).length, [roots]);
  const siblings = selected ? siblingsOf(roots, selected.id) : [];
  const moveTargets = useMemo(() => {
    if (!selected) return [];
    const excluded = subtreeIds(selected);
    return allNodes(roots)
      .filter((node) => !excluded.has(node.id) && node.id !== selected.parentId)
      .map((node) => ({ id: node.id, label: `${"— ".repeat(node.depth)}${node.code ? `${node.code} ` : ""}${node.name}` }));
  }, [roots, selected]);

  return (
    <div className="space-y-6">
      <div role="status" aria-live="polite" className="sr-only">
        {announcement?.tone === "success" ? announcement.message : ""}
      </div>
      {announcement && (
        <Alert tone={announcement.tone === "success" ? "success" : "danger"} role={announcement.tone === "danger" ? "alert" : undefined} className="text-sm">
          {announcement.message}
        </Alert>
      )}

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
        <section aria-labelledby="tree-heading" className="min-w-0 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 id="tree-heading" className="text-lg font-semibold text-text">
              Topic tree <span className="text-sm font-normal text-muted">({nodeCount} nodes)</span>
            </h2>
            <div className="flex gap-1">
              <Button variant="ghost" onClick={() => setExpanded(new Set(expandableIds(roots)))}>
                Expand all
              </Button>
              <Button variant="ghost" onClick={() => setExpanded(new Set())}>
                Collapse all
              </Button>
            </div>
          </div>
          <p className="text-sm text-muted">
            Use <Kbd>↑</Kbd> <Kbd>↓</Kbd> to move between topics, <Kbd>←</Kbd> <Kbd>→</Kbd> to collapse or expand, <Kbd>Enter</Kbd> to open one
            {editable ? (
              <>
                , and <Kbd>Alt</Kbd> + arrows to reorder or indent it
              </>
            ) : null}
            .
          </p>
          {roots.length === 0 ? (
            <p className="rounded-card border border-dashed border-border p-6 text-center text-sm text-muted">
              {editable ? "This version has no topics yet. Add the first one below or paste an outline." : "This version has no topics."}
            </p>
          ) : (
            <ul role="tree" aria-label={`Topics of ${versionLabel}`} aria-busy={pending || undefined} onKeyDown={onTreeKeyDown} className="rounded-card border border-border bg-surface p-1">
              {roots.map((node, index) => (
                <TreeItem
                  key={node.id}
                  node={node}
                  row={rows.find((row) => row.node.id === node.id) ?? { node, level: 1, parentId: null, posInSet: index + 1, setSize: roots.length }}
                  rows={rows}
                  expanded={expanded}
                  selectedId={selectedId}
                  focusTarget={focusTarget}
                  registerItem={registerItem}
                  onSelect={select}
                  onToggle={toggle}
                  onFocusItem={setFocusedId}
                />
              ))}
            </ul>
          )}
          {editable && <AddTopLevelForm syllabusId={syllabusId} pending={pending} run={run} onCreated={select} />}
        </section>

        <section aria-label="Selected topic" className="min-w-0 rounded-card border border-border bg-surface p-4 sm:p-5">
          {selected ? (
            <TopicDetailPanel
              syllabusId={syllabusId}
              node={selected}
              path={ancestorsOf(roots, selected.id).map((ancestor) => ancestor.name)}
              isFirst={siblings[0]?.id === selected.id}
              isLast={siblings[siblings.length - 1]?.id === selected.id}
              editable={editable}
              canCorrect={canCorrect}
              components={components}
              moveTargets={moveTargets}
              pending={pending}
              run={run}
              onSelect={select}
            />
          ) : (
            <p className="text-sm text-muted">Choose a topic in the tree to see and edit its details.</p>
          )}
        </section>
      </div>

      {editable && (
        <details className="rounded-card border border-border bg-surface p-4 sm:p-5">
          <summary className="flex min-h-11 cursor-pointer items-center text-base font-semibold text-text">Paste an outline (bulk add)</summary>
          <div className="mt-4">
            <OutlineImportPanel syllabusId={syllabusId} target={selected ? { id: selected.id, name: selected.name } : null} sources={sources} run={run} pending={pending} />
          </div>
        </details>
      )}
    </div>
  );
}

function TreeItem({
  node,
  row,
  rows,
  expanded,
  selectedId,
  focusTarget,
  registerItem,
  onSelect,
  onToggle,
  onFocusItem,
}: {
  node: EditorNode;
  row: VisibleRow;
  rows: readonly VisibleRow[];
  expanded: ReadonlySet<string>;
  selectedId: string | null;
  focusTarget: string | null;
  registerItem: (id: string, element: HTMLLIElement | null) => void;
  onSelect: (id: string) => void;
  onToggle: (id: string) => void;
  onFocusItem: (id: string) => void;
}) {
  const hasChildren = node.children.length > 0;
  const isExpanded = hasChildren && expanded.has(node.id);
  const isSelected = node.id === selectedId;
  const labelId = `topic-label-${node.id}`;
  const tags = node.tags.questions + node.tags.lessons + node.tags.flashcards;
  return (
    <li
      role="treeitem"
      aria-level={row.level}
      aria-posinset={row.posInSet}
      aria-setsize={row.setSize}
      aria-expanded={hasChildren ? isExpanded : undefined}
      aria-selected={isSelected}
      aria-labelledby={labelId}
      tabIndex={node.id === focusTarget ? 0 : -1}
      ref={(element) => registerItem(node.id, element)}
      onFocus={(event) => {
        if (event.target === event.currentTarget) onFocusItem(node.id);
      }}
      onClick={(event) => {
        event.stopPropagation();
        onSelect(node.id);
      }}
      className="rounded-control outline-none focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-focus"
    >
      <div
        className={cn(
          "flex min-h-11 cursor-pointer items-center gap-1.5 rounded-control pr-2 text-sm",
          isSelected ? "bg-primary-soft text-on-primary-soft" : "hover:bg-subtle",
        )}
        style={{ paddingLeft: `${(row.level - 1) * 1.25}rem` }}
      >
        <span
          aria-hidden="true"
          onClick={(event) => {
            event.stopPropagation();
            if (hasChildren) onToggle(node.id);
          }}
          className={cn("flex size-11 shrink-0 items-center justify-center text-muted", !hasChildren && "invisible")}
        >
          <ChevronRight className={cn("size-4 transition-transform motion-reduce:transition-none", isExpanded && "rotate-90")} />
        </span>
        <span id={labelId} className="min-w-0 flex-1 truncate">
          {node.code && <span className="mr-1.5 font-mono text-muted">{node.code}</span>}
          {node.name}
          <span className="sr-only">, {node.kind.toLowerCase()}</span>
        </span>
        <span aria-hidden="true" className="hidden shrink-0 items-center gap-1.5 sm:flex">
          {node.kind !== "SUBTOPIC" && <TopicKindBadge kind={node.kind} />}
          {node.objectives.length > 0 && <span className="text-xs text-muted">{node.objectives.length} obj.</span>}
          {tags > 0 && <span className="text-xs text-muted">{tags} tags</span>}
        </span>
      </div>
      {isExpanded && (
        <ul role="group">
          {node.children.map((child) => (
            <TreeItem
              key={child.id}
              node={child}
              row={rows.find((candidate) => candidate.node.id === child.id) ?? { node: child, level: row.level + 1, parentId: node.id, posInSet: 1, setSize: node.children.length }}
              rows={rows}
              expanded={expanded}
              selectedId={selectedId}
              focusTarget={focusTarget}
              registerItem={registerItem}
              onSelect={onSelect}
              onToggle={onToggle}
              onFocusItem={onFocusItem}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

function AddTopLevelForm({ syllabusId, pending, run, onCreated }: { syllabusId: string; pending: boolean; run: (command: TopicCommand) => Promise<AdminActionState>; onCreated: (id: string) => void }) {
  const [state, setState] = useState<AdminActionState>(null);
  const [key, setKey] = useState(0);
  const errors = state && !state.ok ? (state.error.fieldErrors ?? {}) : {};
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = formObject(event.currentTarget);
    const result = await run({
      type: "add",
      syllabusId,
      input: { syllabusId, parentId: null, name: String(values.name ?? ""), code: String(values.code ?? "") || null, kind: String(values.kind ?? "TOPIC") },
    });
    setState(result);
    if (result?.ok) {
      setKey((value) => value + 1);
      const created = result.data as { id?: string } | undefined;
      if (created?.id) onCreated(created.id);
    }
  }
  return (
    <form key={key} onSubmit={submit} aria-label="Add a top-level topic" className="space-y-3 rounded-card border border-dashed border-border p-3">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
        <Field label="New top-level topic" error={errors.name} className="sm:flex-1">
          <Input name="name" required maxLength={200} />
        </Field>
        <Field label="Code" optional error={errors.code} className="sm:w-24">
          <Input name="code" maxLength={32} className="font-mono" />
        </Field>
        <Field label="Kind" className="sm:w-36">
          <Select
            name="kind"
            defaultValue="TOPIC"
            options={[
              { value: "TOPIC", label: "Topic" },
              { value: "SECTION", label: "Section" },
            ]}
          />
        </Field>
        <Button type="submit" variant="secondary" iconStart={<Plus aria-hidden="true" />} disabled={pending}>
          Add
        </Button>
      </div>
    </form>
  );
}
