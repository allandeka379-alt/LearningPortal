/**
 * DEV-ONLY FAQ placeholders (`FaqItem.isDemo`, §50). They describe the development environment itself, so they can
 * never be mistaken for real marketing claims; production FAQ entries are written by admins in the CMS.
 */
export const DEMO_FAQ: readonly { question: string; answer: string; category: string; sortOrder: number }[] = [
  {
    question: "Is the content in this development environment real?",
    answer:
      "No. This environment runs on demo content written only for testing the platform. The demo syllabuses, questions, exam dates and prices are not official and are never loaded into production.",
    category: "general",
    sortOrder: 1,
  },
  {
    question: "Where do the practice questions in this environment come from?",
    answer:
      "Every demo question, lesson and flashcard was written from scratch for development. The platform never copies past examination papers, mark schemes or textbooks.",
    category: "general",
    sortOrder: 2,
  },
];
