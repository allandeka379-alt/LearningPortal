import { describe, expect, it, vi } from "vitest";
import type { DbClient } from "@/server/db";
import type { CmsActor } from "@/server/cms/users/access";
import { getCurriculumOptions } from "./lookups";

const editor: CmsActor = { kind: "user", userId: "01a10000-0000-7000-8000-000000000001", roles: ["CONTENT_EDITOR"] };
const LISTED = "01a10000-0000-7000-8000-0000000000aa";
const SELECTED = "01a10000-0000-7000-8000-0000000000bb";

function subjectRow(id: string, name: string) {
  return { id, name, qualificationId: "q1", qualification: { shortName: "O Level", examBoardId: "b1", examBoard: { shortName: "ZIMSEC" } } };
}

/** A client whose bounded subject list holds only LISTED (as when the catalogue is larger than the bound). */
function stubClient() {
  const subjectFindMany = vi.fn(async (args: { where?: { id?: { in: string[] } } }) =>
    args.where?.id ? args.where.id.in.filter((id) => id === SELECTED).map((id) => subjectRow(id, "Selected")) : [subjectRow(LISTED, "Listed")],
  );
  const client = {
    examBoard: { findMany: vi.fn(async () => []) },
    qualification: { findMany: vi.fn(async () => []) },
    subject: { findMany: subjectFindMany },
  } as unknown as DbClient;
  return { client, subjectFindMany };
}

describe("getCurriculumOptions", () => {
  it("always includes a selected subject that falls outside the bounded list", async () => {
    const { client, subjectFindMany } = stubClient();
    const options = await getCurriculumOptions(editor, { selectedSubjectIds: [SELECTED], client });
    expect(options.subjects.map((s) => s.value)).toEqual([LISTED, SELECTED]);
    expect(options.subjects[1]).toMatchObject({ label: "Selected (ZIMSEC O Level)", qualificationId: "q1", boardId: "b1" });
    expect(subjectFindMany).toHaveBeenCalledTimes(2);
  });

  it("does not query again for listed, missing or malformed selections", async () => {
    const { client, subjectFindMany } = stubClient();
    const options = await getCurriculumOptions(editor, { selectedSubjectIds: [LISTED, null, undefined, "not-a-uuid"], client });
    expect(options.subjects.map((s) => s.value)).toEqual([LISTED]);
    expect(subjectFindMany).toHaveBeenCalledTimes(1);
  });

  it("refuses actors who cannot draft content", async () => {
    const { client } = stubClient();
    await expect(getCurriculumOptions({ ...editor, roles: ["STUDENT"] }, { client })).rejects.toMatchObject({ code: "FORBIDDEN" });
  });
});
