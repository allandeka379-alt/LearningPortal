import { describe, expect, it } from "vitest";
import { catalogueHref, isUuid, parseCatalogueParams, parseStartOrigin } from "./params";

const SUBJECT = "0199a1b2-0000-7000-8000-000000000001";
const TOPIC = "0199A1B2-0000-7000-8000-000000000002";

describe("exams page params", () => {
  it("keeps valid ids and drops anything else", () => {
    expect(parseCatalogueParams({ subjectId: SUBJECT, topicId: TOPIC, cursor: "nope" })).toEqual({
      subjectId: SUBJECT,
      topicId: TOPIC.toLowerCase(),
      cursor: null,
    });
    expect(parseCatalogueParams({ subjectId: ["x", SUBJECT], topicId: " " })).toEqual({ subjectId: null, topicId: null, cursor: null });
    expect(parseCatalogueParams({})).toEqual({ subjectId: null, topicId: null, cursor: null });
  });

  it("reads the start origin with a safe default", () => {
    expect(parseStartOrigin({ origin: "plan_item" })).toBe("PLAN_ITEM");
    expect(parseStartOrigin({ origin: "RECOMMENDATION" })).toBe("RECOMMENDATION");
    expect(parseStartOrigin({ origin: "ADMIN" })).toBe("BUILDER");
    expect(parseStartOrigin({})).toBe("BUILDER");
  });

  it("builds filter links", () => {
    expect(catalogueHref({})).toBe("/app/exams");
    expect(catalogueHref({ subjectId: SUBJECT, cursor: null })).toBe(`/app/exams?subjectId=${SUBJECT}`);
    expect(catalogueHref({ subjectId: SUBJECT, topicId: "t", cursor: "c" })).toBe(`/app/exams?subjectId=${SUBJECT}&topicId=t&cursor=c`);
    expect(isUuid(SUBJECT)).toBe(true);
    expect(isUuid("../etc")).toBe(false);
  });
});
