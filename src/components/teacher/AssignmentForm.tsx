"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ActionForm, AdminField, useActionFormState } from "@/components/admin/ActionForm";
import { fieldErrorsFor, MULTI_VALUE_SEPARATOR, type AdminActionState, type AdminFormAction } from "@/components/admin/form-state";
import { Checkbox } from "@/components/ui/Checkbox";
import { Field } from "@/components/ui/Field";
import { RadioGroup } from "@/components/ui/RadioGroup";
import { Select } from "@/components/ui/Select";
import { DIFFICULTY_CHOICE_LABELS } from "./labels";

export interface AssignmentFormOptionsView {
  classId: string;
  /** The class subject (fixed) or null for a subject-less class. */
  classSubject: { id: string; name: string } | null;
  subjects: { id: string; label: string }[];
  /** Subject currently chosen (subject-less classes); its lessons / tests / topics are loaded. */
  subjectId: string | null;
  lessons: { id: string; title: string; estimatedMinutes: number }[];
  assessments: { id: string; title: string; kind: string; totalMarks: number; timeLimitMinutes: number | null; owner: "platform" | "school" | "tutor" }[];
  topics: { id: string; name: string; code: string | null; depth: number }[];
  students: { userId: string; name: string }[];
}

export interface AssignmentFormProps {
  options: AssignmentFormOptionsView;
  /** `datetime-local` defaults (teacher's wall clock). */
  defaults: { dueAt: string };
  /** Where "Choose another subject" navigates with `?subjectId=` (the page reloads its options). */
  basePath: string;
  action: AdminFormAction<unknown>;
}

type WorkType = "PRACTICE" | "ASSESSMENT" | "LESSON";

const TYPE_OPTIONS = [
  { value: "PRACTICE", label: "Practice", description: "Questions on chosen topics, at a difficulty you pick." },
  { value: "ASSESSMENT", label: "Test", description: "A published test, or one you made for your school or classes." },
  { value: "LESSON", label: "Lesson", description: "A lesson to read; it counts as done when finished." },
];

const OWNER_LABELS = { platform: "Platform tests", school: "Your school's tests", tutor: "Your own tests" } as const;

/** Indentation of nested topics (static classes for Tailwind). */
const DEPTH_INDENT = ["", "pl-5", "pl-10", "pl-14"] as const;

function submittedList(state: AdminActionState, name: string): string[] {
  const value = state?.values?.[name];
  return value ? value.split(MULTI_VALUE_SEPARATOR) : [];
}

function TypeSpecificFields({ type, options }: { type: WorkType; options: AssignmentFormOptionsView }) {
  const { state } = useActionFormState();
  const [targeted, setTargeted] = useState(submittedList(state, "studentIds").length > 0);
  const chosenTopics = new Set(submittedList(state, "topicIds"));
  const chosenStudents = new Set(submittedList(state, "studentIds"));

  if (type === "LESSON") {
    return options.lessons.length === 0 ? (
      <p className="text-sm text-muted">No published lessons for this subject yet.</p>
    ) : (
      <AdminField
        name="lessonId"
        label="Lesson"
        type="select"
        required
        placeholder="Choose a lesson"
        options={options.lessons.map((l) => ({ value: l.id, label: `${l.title} (${l.estimatedMinutes} min)` }))}
      />
    );
  }

  if (type === "ASSESSMENT") {
    const groups = (["school", "tutor", "platform"] as const).map((owner) => ({ owner, items: options.assessments.filter((a) => a.owner === owner) })).filter((g) => g.items.length > 0);
    return (
      <div className="space-y-2">
        {groups.length === 0 ? (
          <p className="text-sm text-muted">No published tests for this subject yet.</p>
        ) : (
          <Field label="Test" required error={fieldErrorsFor(state, "assessmentId")}>
            <Select name="assessmentId" required defaultValue={state?.values?.assessmentId ?? ""} placeholder="Choose a test">
              {groups.map((group) => (
                <optgroup key={group.owner} label={OWNER_LABELS[group.owner]}>
                  {group.items.map((a) => (
                    <option key={a.id} value={a.id}>
                      {`${a.title} · ${a.totalMarks} marks${a.timeLimitMinutes ? ` · ${a.timeLimitMinutes} min` : ""}`}
                    </option>
                  ))}
                </optgroup>
              ))}
            </Select>
          </Field>
        )}
        <p className="text-sm text-muted">
          Want your own questions? <Link href="/teacher/assessments/new" className="font-semibold text-primary underline-offset-4 hover:underline">Create a test</Link>.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <fieldset className="min-w-0">
        <legend className="text-sm font-medium text-text">Topics</legend>
        <p className="mb-2 text-sm text-muted">Questions come from the chosen topics and their sub-topics.</p>
        {options.topics.length === 0 ? (
          <p className="text-sm text-muted">This subject has no published syllabus topics yet.</p>
        ) : (
          <div className="max-h-72 overflow-y-auto rounded-card border border-border px-3">
            {options.topics.map((topic) => (
              <Checkbox
                key={topic.id}
                name="topicIds"
                value={topic.id}
                defaultChecked={chosenTopics.has(topic.id)}
                label={topic.code ? `${topic.code} ${topic.name}` : topic.name}
                className={DEPTH_INDENT[Math.min(topic.depth, 3)]}
              />
            ))}
          </div>
        )}
        {fieldErrorsFor(state, "topicIds") && (
          <p className="mt-1 text-sm text-danger-text" role="alert">
            {fieldErrorsFor(state, "topicIds")?.join(" ")}
          </p>
        )}
      </fieldset>
      <div className="grid gap-4 md:grid-cols-3">
        <AdminField name="questionCount" label="Questions" type="number" required defaultValue={10} min={1} max={60} />
        <AdminField
          name="difficulty"
          label="Difficulty"
          type="select"
          defaultValue="ADAPTIVE"
          options={Object.entries(DIFFICULTY_CHOICE_LABELS).map(([value, label]) => ({ value, label }))}
        />
        <AdminField name="timeLimitMinutes" label="Time limit (minutes)" type="number" optional min={5} max={240} hint="Timed work shows answers after handing in." />
      </div>
      {options.students.length > 0 && (
        <div className="space-y-2">
          <Checkbox label="Only for some students" checked={targeted} onChange={(event) => setTargeted(event.target.checked)} description="Students who join later don't get targeted practice." />
          {targeted && (
            <fieldset className="min-w-0 rounded-card border border-border px-3">
              <legend className="sr-only">Students</legend>
              {options.students.map((student) => (
                <Checkbox key={student.userId} name="studentIds" value={student.userId} defaultChecked={chosenStudents.has(student.userId)} label={student.name} />
              ))}
            </fieldset>
          )}
        </div>
      )}
    </div>
  );
}

function PublishFields() {
  const { state } = useActionFormState();
  const [publish, setPublish] = useState(state?.values?.publish ?? "now");
  return (
    <div className="space-y-3 md:col-span-2">
      <RadioGroup
        legend="When"
        name="publish"
        value={publish}
        onValueChange={setPublish}
        orientation="horizontal"
        options={[
          { value: "now", label: "Publish now" },
          { value: "schedule", label: "Schedule" },
          { value: "draft", label: "Save as draft" },
        ]}
      />
      {publish === "schedule" && <AdminField name="publishAt" label="Publish at" type="datetime-local" required />}
    </div>
  );
}

/**
 * Set work for a class (§22): practice (topics, count, difficulty, optional time limit and target students), a test
 * or a lesson, with title, instructions, due date, closing time, attempts and when it is published. Validation
 * happens on the server; errors appear next to their fields.
 */
export function AssignmentForm({ options, defaults, basePath, action }: AssignmentFormProps) {
  const router = useRouter();
  const [type, setType] = useState<WorkType>("PRACTICE");
  const subjectChosen = options.classSubject !== null || options.subjectId !== null;

  return (
    <div className="space-y-6">
      {options.classSubject === null && (
        <Field label="Subject" hint="This class has no single subject: choose the subject of this work.">
          <Select
            value={options.subjectId ?? ""}
            onChange={(event) => router.replace(event.target.value ? `${basePath}?subjectId=${event.target.value}` : basePath)}
            placeholder="Choose a subject"
            options={options.subjects.map((s) => ({ value: s.id, label: s.label }))}
          />
        </Field>
      )}
      {subjectChosen && (
        <ActionForm
          action={action}
          hiddenFields={{ classId: options.classId, ...(options.subjectId ? { subjectId: options.subjectId } : {}) }}
          submitLabel="Set work"
          pendingLabel="Saving…"
          columns="two"
        >
          <div className="md:col-span-2">
            <RadioGroup legend="What to set" name="type" value={type} onValueChange={(value) => setType(value as WorkType)} appearance="card" options={TYPE_OPTIONS} />
          </div>
          <AdminField name="title" label="Title" required maxLength={200} wide placeholder="e.g. Quadratic equations practice" />
          <div className="md:col-span-2">
            <TypeSpecificFields type={type} options={options} />
          </div>
          <AdminField name="instructions" label="Instructions" type="textarea" optional rows={4} maxLength={10_000} wide hint="Markdown and maths ($x^2$) are supported. No images." />
          <AdminField name="dueAt" label="Due" type="datetime-local" defaultValue={defaults.dueAt} hint="Your local time." />
          <AdminField name="closesAt" label="Close submissions at" type="datetime-local" optional hint="After this, nothing can be handed in." />
          <AdminField name="allowLateSubmission" label="Accept late work" type="checkbox" defaultChecked description="Handed-in work after the due date is flagged as late." />
          {type !== "LESSON" && (
            <>
              <AdminField name="maxAttempts" label="Attempts allowed" type="number" optional min={1} max={20} hint="Leave empty for no limit." />
              <AdminField
                name="scorePolicy"
                label="Score that counts"
                type="select"
                defaultValue="BEST"
                options={[
                  { value: "BEST", label: "Best attempt" },
                  { value: "LATEST", label: "Latest attempt" },
                  { value: "FIRST", label: "First attempt" },
                ]}
              />
            </>
          )}
          <PublishFields />
        </ActionForm>
      )}
    </div>
  );
}
