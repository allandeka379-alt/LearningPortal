/**
 * DEV database state for the chemistry-o family: syllabus versions of the two biology subjects and pipeline items by
 * status. Run: npx tsx --conditions=react-server .scratch/bio-assemble/db-state.ts
 */
import path from "node:path";
import { config } from "dotenv";

config({ path: path.join(process.cwd(), ".env"), quiet: true });
process.env.LOG_LEVEL ??= "error";

const REF = "content:chemistry-o:";

async function main(): Promise<void> {
  const { db } = await import("@/server/db");
  const subjects = await db.subject.findMany({
    where: { slug: "chemistry", qualification: { slug: { in: ["o-level", "igcse"] }, examBoard: { slug: { in: ["zimsec", "cambridge"] } } } },
    select: {
      id: true,
      name: true,
      catalogueStatus: true,
      qualification: { select: { slug: true, examBoard: { select: { slug: true } } } },
      syllabi: { select: { id: true, versionLabel: true, status: true, effectiveFrom: true, _count: { select: { topics: true } } } },
    },
  });
  for (const s of subjects) {
    console.log(`${s.qualification.examBoard.slug}/${s.qualification.slug}/chemistry  ${s.name}  catalogue=${s.catalogueStatus}`);
    for (const v of s.syllabi) console.log(`   version ${v.versionLabel} ${v.status} from ${v.effectiveFrom?.toISOString().slice(0, 10)} topics=${v._count.topics}`);
  }
  const by = async (label: string, rows: { status: string }[]) => {
    const counts: Record<string, number> = {};
    for (const r of rows) counts[r.status] = (counts[r.status] ?? 0) + 1;
    console.log(`${label}: ${rows.length} ${JSON.stringify(counts)}`);
  };
  await by("questions", await db.question.findMany({ where: { externalRef: { startsWith: REF }, parentId: null }, select: { status: true } }));
  await by("lessons", await db.lesson.findMany({ where: { externalRef: { startsWith: REF } }, select: { status: true } }));
  await by("flashcards", await db.flashcard.findMany({ where: { externalRef: { startsWith: REF } }, select: { status: true } }));
  await by("assessments", await db.assessment.findMany({ where: { externalRef: { startsWith: REF } }, select: { status: true } }));
  await db.$disconnect();
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
