import { randomUUID } from "node:crypto";
import { describe, expect, it } from "vitest";
import { createSession, currentSessionCookieName } from "@/server/auth/sessions";
import { testMeta } from "@/server/auth/testing";
import { getEnv } from "@/server/lib/env";
import { createCurriculumChain, createStudent } from "../../../../../tests/factories/index";
import { createEnrollment } from "../../../../../tests/factories/learning";
import { GET } from "./route";

/**
 * GET /app/search/open: resolves where a search result opens for the signed-in student (pinned syllabus version,
 * enrolment) and never redirects off-site. Real services and database; the session comes from the request cookie.
 */

const APP = () => getEnv().APP_URL;

async function studentWithSession(options: { enrolled: boolean }) {
  const chain = await createCurriculumChain({ topicCount: 1, subtopicsPerTopic: 1, lessonsPerTopic: 1 });
  const { user } = await createStudent({
    student: { isMinor: false, countryId: chain.country.id, examBoardId: chain.examBoard.id, qualificationId: chain.qualification.id, onboardingCompleted: true },
  });
  if (options.enrolled) await createEnrollment(user.id, { subjectId: chain.subject.id, syllabusId: chain.syllabus.id });
  const { token } = await createSession(user.id, "WEB", testMeta(), { authMethod: "PASSWORD", roles: ["STUDENT"] });
  return { chain, cookie: `${currentSessionCookieName()}=${token}` };
}

function open(query: string, cookie?: string): Promise<Response> {
  return GET(new Request(`http://localhost:3000/app/search/open${query}`, { headers: cookie ? { cookie } : {} }));
}

function location(response: Response): string {
  expect(response.status).toBe(303);
  return response.headers.get("location") ?? "";
}

describe("GET /app/search/open", () => {
  it("opens topics, subjects and lessons inside the app for an enrolled student", async () => {
    const { chain, cookie } = await studentWithSession({ enrolled: true });
    const topic = chain.topics[0];
    const lesson = chain.lessons[0];
    if (!topic || !lesson) throw new Error("fixture incomplete");

    expect(location(await open(`?type=TOPIC&id=${topic.id}&fallback=/public/topic`, cookie))).toBe(
      `${APP()}/app/subjects/${chain.subject.id}/topics/${topic.id}`,
    );
    expect(location(await open(`?type=SUBJECT&id=${chain.subject.id}&fallback=/public/subject`, cookie))).toBe(`${APP()}/app/subjects/${chain.subject.id}`);
    expect(location(await open(`?type=LESSON&id=${lesson.id}&fallback=/guides/x`, cookie))).toBe(`${APP()}/app/lessons/${lesson.id}`);
  });

  it("falls back to the public page (or to adding subjects) when the student is not enrolled", async () => {
    const { chain, cookie } = await studentWithSession({ enrolled: false });
    const topic = chain.topics[0];
    const lesson = chain.lessons[0];
    if (!topic || !lesson) throw new Error("fixture incomplete");
    expect(location(await open(`?type=TOPIC&id=${topic.id}&fallback=/zb/o-level/maths/algebra`, cookie))).toBe(`${APP()}/zb/o-level/maths/algebra`);
    // A non-public subject is indexed with an app path that would 404 for a non-enrolled student.
    expect(location(await open(`?type=SUBJECT&id=${chain.subject.id}&fallback=/app/subjects/${chain.subject.id}`, cookie))).toBe(
      `${APP()}/app/subjects/manage`,
    );
    expect(location(await open(`?type=LESSON&id=${lesson.id}&fallback=/guides/how-to-revise`, cookie))).toBe(`${APP()}/guides/how-to-revise`);
    expect(location(await open(`?type=TOPIC&id=${randomUUID()}`, cookie))).toBe(`${APP()}/app/subjects/manage`);
  });

  it("never redirects off-site, and sends bad links back to search", async () => {
    const { chain, cookie } = await studentWithSession({ enrolled: false });
    const topic = chain.topics[0];
    if (!topic) throw new Error("fixture incomplete");
    expect(location(await open(`?type=TOPIC&id=${topic.id}&fallback=//evil.example/x`, cookie))).toBe(`${APP()}/app/subjects/manage`);
    expect(location(await open(`?type=TOPIC&id=${topic.id}&fallback=https://evil.example`, cookie))).toBe(`${APP()}/app/subjects/manage`);
    expect(location(await open(`?type=QUESTION&id=${topic.id}`, cookie))).toBe(`${APP()}/app/search`);
    expect(location(await open(`?type=TOPIC&id=nope`, cookie))).toBe(`${APP()}/app/search`);
  });

  it("asks anonymous visitors to sign in first and comes back here", async () => {
    const id = randomUUID();
    const target = new URL(location(await open(`?type=TOPIC&id=${id}`)));
    expect(target.pathname).toBe("/login");
    expect(target.searchParams.get("next")).toBe(`/app/search/open?type=TOPIC&id=${id}`);
  });
});
