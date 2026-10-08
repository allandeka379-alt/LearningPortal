-- Content pipeline keys (docs/CONTENT_PIPELINE.md): `npm run content:import` upserts version-controlled content from
-- content/ by stable keys. Lesson / Question / Flashcard already carry externalRef; this adds the two missing keys.
--
-- Plain (non-concurrent) CREATE UNIQUE INDEX: this migration runs before launch while Topic and Assessment hold only
-- catalogue / demo rows, so the brief lock is harmless. Indexes added to populated tables after launch must use
-- CREATE INDEX CONCURRENTLY in their own single-statement migration (see 20261006102004_flashcard_review_new_daily_idx).

-- AlterTable
ALTER TABLE "Assessment" ADD COLUMN     "externalRef" TEXT;

-- AlterTable
ALTER TABLE "Topic" ADD COLUMN     "contentKey" VARCHAR(128);

-- CreateIndex
CREATE UNIQUE INDEX "Assessment_externalRef_key" ON "Assessment"("externalRef");

-- CreateIndex
CREATE UNIQUE INDEX "Topic_syllabusId_contentKey_key" ON "Topic"("syllabusId", "contentKey");

-- ===== Raw SQL (Prisma ignores CHECK constraints; no drift) =====

-- Purpose: Assessment draft-copy rules now match Lesson / Question / Flashcard: a draft copy never carries the
-- externalRef of its live row (the publish merge keeps the live row's key, so re-imports always find the live row).
-- Changed definition: DROP first, then re-add NOT VALID and VALIDATE (no long lock on a populated table).
ALTER TABLE "Assessment" DROP CONSTRAINT IF EXISTS "Assessment_draft_copy_chk";
ALTER TABLE "Assessment"
  ADD CONSTRAINT "Assessment_draft_copy_chk"
    CHECK ("draftOfId" IS NULL OR ("draftOfId" <> "id" AND "status" IN ('DRAFT', 'IN_REVIEW', 'APPROVED') AND "externalRef" IS NULL))
    NOT VALID;
ALTER TABLE "Assessment" VALIDATE CONSTRAINT "Assessment_draft_copy_chk";

-- Purpose: content keys are trimmed, non-blank identifiers (the importer looks them up by exact match).
ALTER TABLE "Topic"
  ADD CONSTRAINT "Topic_contentKey_chk" CHECK ("contentKey" IS NULL OR ("contentKey" ~ '^[a-z0-9][a-z0-9._/-]*$')) NOT VALID;
ALTER TABLE "Topic" VALIDATE CONSTRAINT "Topic_contentKey_chk";
