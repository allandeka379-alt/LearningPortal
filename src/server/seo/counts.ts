import "server-only";
import { db } from "@/server/db";

/**
 * Real content counts for the "What you get" blocks of public pages (CLAUDE.md rule 6: computed from the database,
 * never invented). Counts cover PUBLISHED, live platform content of every access tier: they describe what the
 * platform offers, and no content is shown with them.
 */

export interface SyllabusContentCounts {
  lessons: number;
  questions: number;
  flashcards: number;
  mockExams: number;
  topicTests: number;
}

/** Content tagged to a syllabus version (the subject's CURRENT version on public pages). Five counts in parallel. */
export async function countSyllabusContent(syllabusId: string, subjectId: string): Promise<SyllabusContentCounts> {
  const platformAssessment = { status: "PUBLISHED", draftOfId: null, schoolId: null, ownerUserId: null, subjectId } as const;
  const [lessons, questions, flashcards, mockExams, topicTests] = await Promise.all([
    db.lesson.count({ where: { status: "PUBLISHED", draftOfId: null, topics: { some: { topic: { syllabusId } } } } }),
    db.question.count({
      where: { status: "PUBLISHED", draftOfId: null, parentId: null, schoolId: null, ownerUserId: null, topics: { some: { syllabusId } } },
    }),
    db.flashcard.count({ where: { status: "PUBLISHED", draftOfId: null, ownerUserId: null, topics: { some: { topic: { syllabusId } } } } }),
    db.assessment.count({ where: { ...platformAssessment, kind: "MOCK_EXAM", syllabusId } }),
    db.assessment.count({
      where: { ...platformAssessment, kind: { in: ["TOPIC_TEST", "CHAPTER_TEST"] }, OR: [{ syllabusId }, { syllabusId: null }] },
    }),
  ]);
  return { lessons, questions, flashcards, mockExams, topicTests };
}

export interface TopicContentCounts {
  lessons: number;
  questions: number;
}

/** Lessons and practice questions tagged to a topic or any node below it (`topicIds` = the subtree). */
export async function countTopicContent(syllabusId: string, topicIds: readonly string[]): Promise<TopicContentCounts> {
  if (topicIds.length === 0) return { lessons: 0, questions: 0 };
  const ids = [...topicIds];
  const [lessons, questions] = await Promise.all([
    db.lesson.count({ where: { status: "PUBLISHED", draftOfId: null, topics: { some: { topicId: { in: ids } } } } }),
    db.question.count({
      where: {
        status: "PUBLISHED",
        draftOfId: null,
        parentId: null,
        schoolId: null,
        ownerUserId: null,
        topics: { some: { syllabusId, topicId: { in: ids } } },
      },
    }),
  ]);
  return { lessons, questions };
}
