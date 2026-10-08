import { ChevronRight, Info } from "lucide-react";
import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { formatLocalDate } from "@/components/student/format";
import { AddSubjectButton } from "@/components/subjects/AddSubjectButton";
import { RemoveSubjectButton } from "@/components/subjects/RemoveSubjectButton";
import { SubjectTargetsForm } from "@/components/subjects/SubjectTargetsForm";
import { Alert } from "@/components/ui/Alert";
import { Badge } from "@/components/ui/Badge";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { getStudentTrack } from "@/server/accounts/student-settings";
import { requireOnboardedStudent } from "@/server/auth/guards";
import { getExamSessions, getGradeScheme, listSubjectsForQualification } from "@/server/curriculum";
import { listEnrollments } from "@/server/enrollment";
import { addSubjectAction, removeSubjectAction, updateTargetsAction } from "./actions";

export const metadata: Metadata = { title: "Manage subjects" };

/**
 * Manage enrolments (§5): add or remove subjects (removal is soft and keeps history), see the pinned syllabus version
 * of each (§26), and set per-subject targets (examination session for the §17 countdown, target grade). Subjects
 * come from the catalogue of the student's qualification; COMING_SOON subjects are listed but cannot be added (§50).
 */
export default async function ManageSubjectsPage() {
  const actor = await requireOnboardedStudent({ next: "/app/subjects/manage" });
  const [track, enrolments] = await Promise.all([getStudentTrack(actor), listEnrollments(actor, { includeDropped: true })]);
  const current = enrolments.filter((e) => e.status === "ACTIVE" || e.status === "PAUSED");
  const dropped = new Set(enrolments.filter((e) => e.status === "DROPPED").map((e) => e.subject.id));
  const enrolled = new Set(current.map((e) => e.subject.id));

  const qualificationIds = [...new Set(current.map((e) => e.subject.qualification.id))];
  const [catalogue, sessionLists, schemes] = await Promise.all([
    track.qualificationId ? listSubjectsForQualification(track.qualificationId) : Promise.resolve([]),
    Promise.all(qualificationIds.map((id) => getExamSessions(id))),
    Promise.all(qualificationIds.map((id) => getGradeScheme(id))),
  ]);
  const sessionsByQualification = new Map(qualificationIds.map((id, i) => [id, sessionLists[i] ?? []]));
  const schemeByQualification = new Map(qualificationIds.map((id, i) => [id, schemes[i] ?? null]));
  const trackLabel = [track.examBoardName, track.qualificationName, track.yearGroupName].filter(Boolean).join(" · ");

  return (
    <Container size="reading" className="space-y-8 pb-10">
      <PageHeader
        title="Manage subjects"
        eyebrow={trackLabel || undefined}
        breadcrumbs={[{ label: "Subjects", href: "/app/subjects" }, { label: "Manage" }]}
        description="Add or remove subjects and set the examination you are preparing for."
        className="pb-0"
      />

      <section aria-labelledby="current-subjects-title" className="space-y-3">
        <h2 id="current-subjects-title" className="text-lg font-semibold text-text">
          Your subjects
        </h2>
        {current.length === 0 ? (
          <p className="text-sm text-muted">You have no subjects yet. Add one below.</p>
        ) : (
          <ul className="space-y-3">
            {current.map((enrolment) => {
              const qualificationId = enrolment.subject.qualification.id;
              const sessions = sessionsByQualification.get(qualificationId) ?? [];
              const scheme = schemeByQualification.get(qualificationId) ?? null;
              const target = enrolment.targetExamSession;
              const showTargets = sessions.length > 0 || (scheme?.bands.length ?? 0) > 0;
              return (
                <li key={enrolment.id}>
                  <Card as="article">
                    <CardHeader
                      title={enrolment.subject.name}
                      description={`${enrolment.subject.qualification.name} · ${enrolment.syllabus.title} · version ${enrolment.syllabus.versionLabel}`}
                      action={
                        enrolment.status === "PAUSED" ? (
                          <Badge tone="neutral" size="sm">
                            Paused
                          </Badge>
                        ) : undefined
                      }
                    />
                    <CardBody className="space-y-4">
                      <dl className="grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
                        <div>
                          <dt className="text-muted">Target examination</dt>
                          <dd className="font-medium text-text">
                            {target ? `${target.name}${target.isProvisional ? " (provisional date)" : ""}, starts ${formatLocalDate(target.startsOn)}` : "Not set"}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-muted">Target grade</dt>
                          <dd className="font-medium text-text">{enrolment.targetGrade ?? "Not set"}</dd>
                        </div>
                      </dl>
                      {showTargets && (
                        <details className="group rounded-control border border-border">
                          <summary className="flex min-h-11 cursor-pointer list-none items-center gap-1 px-3 text-sm font-semibold text-primary [&::-webkit-details-marker]:hidden">
                            <ChevronRight aria-hidden="true" className="size-4 transition-transform group-open:rotate-90 motion-reduce:transition-none" />
                            Change targets
                          </summary>
                          <div className="border-t border-border p-3">
                            <SubjectTargetsForm
                              subjectId={enrolment.subject.id}
                              subjectName={enrolment.subject.name}
                              sessions={sessions.map((s) => ({
                                value: s.id,
                                label: `${s.name}${s.isProvisional ? " (provisional)" : ""} · starts ${formatLocalDate(s.startsOn, "medium")}`,
                              }))}
                              grades={scheme?.bands.map((b) => b.grade) ?? []}
                              current={{ targetExamSessionId: target?.id ?? null, targetGrade: enrolment.targetGrade }}
                              action={updateTargetsAction}
                            />
                            {scheme?.disclaimer && <p className="mt-3 text-xs text-muted">{scheme.disclaimer}</p>}
                          </div>
                        </details>
                      )}
                      <RemoveSubjectButton subjectId={enrolment.subject.id} subjectName={enrolment.subject.name} action={removeSubjectAction} />
                    </CardBody>
                  </Card>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <section aria-labelledby="add-subjects-title" className="space-y-3">
        <h2 id="add-subjects-title" className="text-lg font-semibold text-text">
          Add a subject
        </h2>
        {catalogue.length === 0 ? (
          <Alert tone="info" icon={<Info aria-hidden="true" />}>
            No subjects are available for your qualification yet. We add subjects as their content is verified.
          </Alert>
        ) : (
          catalogue.map((group) => (
            <Card as="section" key={group.category.id} aria-labelledby={`category-${group.category.id}`}>
              <CardHeader titleAs="h3" title={<span id={`category-${group.category.id}`}>{group.category.name}</span>} />
              <CardBody>
                <ul className="divide-y divide-border">
                  {group.subjects.map((subject) => (
                    <li key={subject.id} className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0">
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-text">{subject.name}</p>
                        {subject.officialCode && <p className="text-xs text-muted">Code {subject.officialCode}</p>}
                      </div>
                      {enrolled.has(subject.id) ? (
                        <Badge tone="primary" size="sm">
                          Added
                        </Badge>
                      ) : !subject.isEnrollable ? (
                        <Badge tone="neutral" size="sm">
                          Coming soon
                        </Badge>
                      ) : (
                        <AddSubjectButton
                          subjectId={subject.id}
                          subjectName={subject.name}
                          action={addSubjectAction}
                          label={dropped.has(subject.id) ? "Add back" : "Add"}
                        />
                      )}
                    </li>
                  ))}
                </ul>
              </CardBody>
            </Card>
          ))
        )}
      </section>
    </Container>
  );
}
