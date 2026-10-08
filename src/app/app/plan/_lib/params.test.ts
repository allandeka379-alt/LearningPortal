import { describe, expect, it } from "vitest";
import { planFormSubjectIds, requestedPlanSubjectIds } from "./params";

const MATHS = "0199a1b2-0000-7000-8000-000000000001";
const ENGLISH = "0199a1b2-0000-7000-8000-000000000002";
const SCIENCE = "0199a1b2-0000-7000-8000-000000000003";
const ENROLLED = [MATHS, ENGLISH, SCIENCE];

describe("requestedPlanSubjectIds", () => {
  it("keeps enrolled subjects from ?subjectIds=a,b in enrolment order", () => {
    expect(requestedPlanSubjectIds(`${SCIENCE},${MATHS}`, ENROLLED)).toEqual([MATHS, SCIENCE]);
    expect(requestedPlanSubjectIds([ENGLISH, `${ENGLISH}, ${MATHS.toUpperCase()}`], ENROLLED)).toEqual([MATHS, ENGLISH]);
  });

  it("ignores subjects the student does not study, and is null without a usable value", () => {
    expect(requestedPlanSubjectIds(`${MATHS},not-a-subject`, ENROLLED)).toEqual([MATHS]);
    expect(requestedPlanSubjectIds("0199a1b2-0000-7000-8000-00000000ffff", ENROLLED)).toBeNull();
    expect(requestedPlanSubjectIds(undefined, ENROLLED)).toBeNull();
    expect(requestedPlanSubjectIds(" , ", ENROLLED)).toBeNull();
  });
});

describe("planFormSubjectIds", () => {
  it("ticks the requested subjects for a new plan, else every subject", () => {
    expect(planFormSubjectIds({ enrolledSubjectIds: ENROLLED, planSubjectIds: null, requested: [ENGLISH] })).toEqual({ selected: [ENGLISH], addsSubjects: false });
    expect(planFormSubjectIds({ enrolledSubjectIds: ENROLLED, planSubjectIds: null, requested: null }).selected).toEqual(ENROLLED);
  });

  it("adds a requested subject an existing plan does not cover yet", () => {
    expect(planFormSubjectIds({ enrolledSubjectIds: ENROLLED, planSubjectIds: [MATHS], requested: [SCIENCE] })).toEqual({
      selected: [MATHS, SCIENCE],
      addsSubjects: true,
    });
    expect(planFormSubjectIds({ enrolledSubjectIds: ENROLLED, planSubjectIds: [MATHS], requested: [MATHS] })).toEqual({ selected: [MATHS], addsSubjects: false });
    expect(planFormSubjectIds({ enrolledSubjectIds: ENROLLED, planSubjectIds: [], requested: null }).selected).toEqual(ENROLLED);
  });
});
