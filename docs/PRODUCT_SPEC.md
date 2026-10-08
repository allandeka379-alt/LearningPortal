# PRODUCT SPEC — Zimbabwe O-Level & A-Level Digital Study Platform

> Source: product brief supplied by the project owner (2026-10-05). This file is the source of truth for scope.
> Section numbers are referenced from code reviews, docs and tests (e.g. "§12 Mock exams").

Build a production-ready digital education platform for students studying ZIMSEC and Cambridge qualifications in Zimbabwe, covering O-Level and A-Level. This is NOT a simple website containing PDFs. Build a serious, scalable digital learning and examination-preparation platform that can eventually become the leading online study platform for Zimbabwean secondary students.

## 1. Product vision

A student can:

1. Select their examination board: ZIMSEC / Cambridge
2. Select level: O-Level / A-Level
3. Select subjects.
4. Select a topic.
5. Learn the topic through structured educational content.
6. Practice questions.
7. Receive instant marking and explanations.
8. Take timed tests.
9. Attempt mock examinations.
10. Track their progress.
11. Identify weak areas.
12. Receive a personalised study plan.
13. Ask an AI tutor questions.
14. Prepare for examinations using an intelligent question bank.

Works on desktop, laptop, tablet and mobile browser. Highly usable on slow internet connections. Mobile-first.

## 2. Core product structure

Hierarchy: EXAMINATION BOARD → LEVEL → SUBJECT → SYLLABUS → TOPIC → SUBTOPIC → LESSON → PRACTICE QUESTIONS → QUIZ → TEST → MOCK EXAM.

Example: ZIMSEC → O-Level → Mathematics → Algebra → Quadratic Equations → Solving Quadratics → Practice → Topic Test → Mock Exam. The same architecture must work for Cambridge.

Do NOT hard-code subjects. Subjects, syllabuses, topics, questions, lessons and examinations must be database-driven.

## 3. Curriculum support

Support BOTH ZIMSEC (O-Level and A-Level) and Cambridge International qualifications relevant to Zimbabwean students: Cambridge IGCSE, Cambridge International AS Level, Cambridge International A Level. Additional boards and qualifications can be added later.

Admin interface can create: examination board, qualification, subject, syllabus, topic, subtopic, learning objective, lesson, question, answer, explanation, exam, mock exam, study pack.

Do not assume ZIMSEC and Cambridge syllabuses have identical structures. Each curriculum must be independently configurable.

## 4. Subject system

All supported O-Level and A-Level subjects can be represented; schema not limited to a predefined list. Initial catalogue should accommodate:

- **Mathematics:** Mathematics, Additional Mathematics, Pure Mathematics, Statistics, Mechanics
- **Sciences:** Biology, Chemistry, Physics, Computer Science, Agriculture, Environmental subjects where applicable
- **Commercials:** Accounting, Business Studies, Economics, Commerce, Entrepreneurship where applicable
- **Humanities:** Geography, History, Sociology, Psychology, Religious Studies, Heritage Studies
- **Languages:** English Language, English Literature, French, Shona, Ndebele, other supported languages
- **Technical / Practical:** Technical Graphics, Design & Technology, Food & Nutrition, Art, Music, Physical Education, computer-related subjects

IMPORTANT: Do not fabricate syllabuses. The architecture supports the complete catalogue; actual curriculum content must be populated from authoritative syllabus information and properly licensed/original educational content.

## 5. Student onboarding

Beautiful onboarding. Student selects: Country (Zimbabwe); Examination board (ZIMSEC / Cambridge); Level (O-Level / A-Level); Year/form; Subjects (multiple); Target examination (e.g. November 2027); Current ability (Beginner / Intermediate / Advanced); Optional target grade (A / B / C / specific). The platform then generates a personalised dashboard.

## 6. Student dashboard

Shows: overall progress, subject progress, topics completed, topics remaining, weak topics, strong topics, current streak, questions attempted, accuracy, average score, mock exam scores, examination countdown, recommended study session, daily target, current study plan.

Example: "GOOD MORNING 👋 — Your exam is in: 126 DAYS — Today's target: 45 minutes — Recommended: Mathematics / Quadratic Equations / 20 questions; Chemistry / Organic Chemistry / Lesson 3; English / Comprehension / Practice Test".

## 7. Subject dashboard

Per subject: syllabus progress, topic progress, average score, questions completed, weakest topics, strongest topics, recent tests, recommended topics. Visual progress indicators. Example: Algebra 82%, Geometry 64%, Statistics 41%, Trigonometry 91%, Calculus 32% → "Your weakest area is Calculus."

## 8. Lesson system

Every lesson supports: rich text, mathematical notation, images, diagrams, tables, formulas, examples, worked solutions, key definitions, key facts, common mistakes, exam tips, practice questions. For maths and sciences use proper rendering (LaTeX/KaTeX). Do not render formulas as plain text when proper notation is possible.

## 9. Question bank

One of the most important parts. Every question has metadata: examination board, qualification, level, subject, topic, subtopic, question type, difficulty, marks, estimated time, year, paper, skill tested, learning objective.

Question types: multiple choice, true/false, short answer, numerical answer, structured question, essay, calculation, matching, fill in the blank, diagram labelling, extended response.

Supports both automatically marked and manually/AI-assisted marked questions.

## 10. Question practice engine

Student chooses subject, topic, number of questions, difficulty (e.g. 20 questions, medium, Algebra). System generates a practice session. After every question show: correct/incorrect, correct answer, explanation, why the answer is correct, relevant concept, optional "Study this topic".

## 11. Adaptive question engine

If a student repeatedly gets questions wrong in a topic: increase practice in that topic, reduce difficulty initially, explain the concept, recommend a lesson, re-test later. If they consistently perform well: increase difficulty, introduce examination-level questions. Track mastery per topic:

| Mastery | Band |
|---|---|
| 0–39% | Weak |
| 40–59% | Developing |
| 60–74% | Competent |
| 75–89% | Strong |
| 90–100% | Mastered |

## 12. Mock exams

Complete examination engine: topic tests, chapter tests, subject tests, timed examinations, mock examinations. Mock features: timer, question navigation, mark allocation, save progress, submit, automatic marking where possible, score, percentage, grade estimate, detailed analysis. After completion: "You scored 68%." Strong areas / weak areas / recommended study (e.g. Probability → Lesson 4; Statistics → Practice Test).

## 13. Examination mode

Realistic interface: exam instructions, time remaining, question numbering, mark allocation, navigation, flag question, review unanswered questions, submit exam. Support diagrams, graphs, equations, tables, extended written answers where applicable.

## 14. AI tutor

Knows the student's board, qualification, subject, current topic, performance, weak areas, learning history. Must NOT simply give answers. Default approach: 1) understand the question 2) explain the concept 3) break the problem into steps 4) give hints 5) encourage the student to solve it 6) reveal the full answer when appropriate 7) explain mistakes.

## 15. AI question solver

Students type or upload a question ("How do I solve this?"). Image uploads for maths/sciences where feasible. AI identifies the topic, explains the concept, solves step-by-step, shows formulas, explains reasoning, provides similar questions. Must distinguish "Teach me" from "Give me the answer". Educational integrity prioritised.

## 16. Personal study plan

Student enters exam date, subjects, target. System creates a weekly schedule (e.g. Monday: Mathematics 45 min, Physics 30 min; Tuesday: Chemistry 45 min …). Plan adapts dynamically to performance, remaining syllabus, time available, exam date, weak topics, previous study sessions.

## 17. Exam countdown

Every student sees "124 days until your examination", calculated automatically from their selected examination session.

## 18. Flashcards

Definitions, formulas, vocabulary, key concepts, dates, scientific facts. Spaced repetition with Again / Hard / Good / Easy. Automatic review scheduling.

## 19. Study streak

Gamification: daily streak, weekly goals, XP, badges, topic mastery, exam milestones. NOT childish — appropriate for teenagers and young adults.

## 20. Leaderboards

Optional competitive system: weekly questions, mock exam scores, study streak, subject mastery. Privacy controls: real name / first name / username / anonymous profile.

## 21. Parent account

Parents see: subjects, study time, progress, test results, weak areas, examination countdown, attendance/study activity. Do not expose private student AI conversations unless explicitly designed and consented to.

## 22. Teacher account

Create classes, add students, assign lessons, assign quizzes, create tests, view performance, identify weak topics, send announcements. Dashboard drill-down: class average → subject performance → topic performance → individual student performance.

## 23. School administration

Manage teachers, manage students, create classes, assign subjects, view school-wide performance, generate reports. Analytics: average score by subject, pass rate, topic performance, student engagement, teacher performance, examination readiness.

## 24. Digital study packs

Premium packs, e.g. "O-Level ZIMSEC Mathematics Complete Study Pack", "Cambridge IGCSE Chemistry Complete Study Pack", containing full syllabus, notes, topic lessons, practice questions, tests, mock exams, flashcards, exam tips, AI tutor access. Packs are dynamically generated from platform content, not downloadable PDFs. PDF export optional where licensing permits.

## 25. Content management system

Admin create/edit: boards, qualifications, subjects, syllabuses, topics, lessons, questions, answers, explanations, flashcards, mock exams, study plans, announcements. Bulk import (CSV/Excel/JSON where appropriate).

## 26. Content versioning

Every syllabus supports: version, effective date, archived version, current version. Do not overwrite historical curriculum data. A student studying an older syllabus retains access to the correct content.

## 27. Copyright / content protection

Do NOT scrape or illegally reproduce copyrighted textbooks, past papers, marking schemes or third-party materials. Build around original content, properly licensed material, publicly permissible information, official syllabus structures where legally usable, original practice questions. Every content item optionally has: source, author, copyright status, licence, publication date.

## 28. Search

Global search ("quadratic equations") returning lessons, questions, flashcards, mock exams, study packs. Search understands subject, topic, qualification, board.

## 29. Mobile-first design

Fast loading, low bandwidth, minimal unnecessary animations, responsive, large touch targets, offline caching where practical. Students can continue studying with intermittent connectivity.

## 30. WhatsApp integration

Architecture for future WhatsApp: "Give me today's study question." → question → student answers → system marks. "Explain photosynthesis." → concise AI explanation. Backend APIs designed so WhatsApp can be added without rebuilding the platform.

## 31. Subscriptions

Plans (prices NOT hard-coded; configurable from admin):

- **FREE:** limited lessons, limited questions, daily quiz, limited AI
- **STUDENT:** full subject access, unlimited practice, mock exams, flashcards, study plans, AI tutor
- **PREMIUM:** everything, advanced AI, personalised learning, advanced analytics
- **SCHOOL:** teacher dashboard, student management, assignments, school analytics

## 32. Payment architecture

Payment abstraction supporting multiple providers; not coupled to one. Future Zimbabwean and international providers. States: Pending, Successful, Failed, Refunded, Cancelled. Proper transaction records.

## 33. Authentication

Email, phone number, password, OTP, Google login where appropriate. Roles: STUDENT, PARENT, TEACHER, SCHOOL_ADMIN, CONTENT_EDITOR, ADMIN, SUPER_ADMIN. Proper RBAC.

## 34. Database architecture

Scalable relational database. At minimum model: User, Profile, Student, Parent, Teacher, School, Class, Enrollment, ExamBoard, Qualification, Syllabus, Subject, Topic, Subtopic, Lesson, LearningObjective, Question, Answer, QuestionAttempt, Quiz, QuizAttempt, MockExam, MockExamAttempt, Flashcard, FlashcardReview, StudyPlan, StudySession, Subscription, Payment, AIConversation, AIMessage, Achievement, Notification. Proper foreign keys and indexes. Not unnecessarily fragmented.

## 35. Analytics

Track DAU, MAU, questions attempted, average score, study time, retention, conversion to paid, most popular subjects, most difficult topics, AI usage, mock exam performance. Admin dashboard: users → active students → paid students → revenue → most popular subjects → most attempted topics → retention.

## 36. Admin dashboard

Sections: Dashboard, Users, Schools, Students, Teachers, Boards, Qualifications, Subjects, Syllabuses, Topics, Lessons, Questions, Exams, Study Packs, AI, Subscriptions, Payments, Analytics, Notifications, Settings.

## 37. Design

Premium modern ed-tech feel (quality reference: Khan Academy, Quizlet, Duolingo, Brilliant, Coursera — do NOT copy branding). Distinctive Zimbabwe/Africa-relevant identity, not amateurish or stereotypical. Avoid clutter, excessive gradients, cartoonish UI, too many colours, unnecessary animations. Prioritise typography, spacing, clear hierarchy, accessibility, speed, mobile usability.

## 38. Performance

Designed for 100,000+ students: horizontal scaling, DB indexing, caching, CDN, background jobs, rate limiting, API pagination, lazy loading, image optimisation. Don't prematurely over-engineer, but don't create architecture that cannot scale.

## 39. Security

Secure authentication, password hashing, session management, RBAC, API authorization, input validation, rate limiting, CSRF protection, secure file uploads, SQL injection prevention, XSS prevention, audit logs. Student data is sensitive.

## 40. AI cost control

Usage limits, token tracking, model routing, caching, prompt optimisation, conversation limits, admin-configurable quotas. Cheaper models for simple tasks, stronger models for difficult reasoning. Don't send unnecessary context.

## 41. AI content generation for admins

Internal AI tool for authorised content editors to draft lesson explanations, practice questions, MCQs, flashcards, explanations, hints, study plans. AI content enters DRAFT → REVIEW → APPROVED → PUBLISHED. AI never auto-publishes educational content.

## 42. Question quality control

Statuses: Draft, Review, Approved, Published, Archived. Editors can flag: incorrect answer, ambiguous question, incorrect marking, wrong topic, wrong difficulty.

## 43. Accessibility

Keyboard navigation, screen readers, adjustable font size, good contrast, alt text, accessible forms.

## 44. SEO

Public pages that rank: /zimsec/o-level/mathematics, /cambridge/igcse/biology, /zimsec/a-level/chemistry. SEO metadata for subjects, topics, articles, study guides. Do not expose premium content simply for SEO.

## 45. Public website

Homepage message: "Master Your Exams." Supporting: "Complete ZIMSEC and Cambridge O-Level & A-Level study resources, practice questions, mock exams and AI-powered tutoring." Sections: Hero, How it works, ZIMSEC, Cambridge, O-Level, A-Level, Subjects, AI Tutor, Practice, Mock Exams, Schools, Pricing, Testimonials, FAQ, CTA.

## 46. Free acquisition strategy

Daily question, shareable results, study streaks, referral codes, referral rewards, free topic tests, free exam countdown, free diagnostic test. Share "I scored 82% in O-Level Mathematics." without exposing sensitive information.

## 47. Content strategy

Thousands of lessons, questions, explanations, flashcards, mock exams. Do NOT hard-code educational content into React components. All content from the database/CMS.

## 48. Technical requirements

Before significant code: inspect repo, determine stack, reusable components, DB architecture, auth, deployment config, design system, technical debt. Improve existing apps rather than replacing; explain before major architectural changes.

## 49. Development phases

1 Architecture audit · 2 Database & curriculum architecture · 3 Authentication & onboarding · 4 Student dashboard · 5 Subject/topic/lesson system · 6 Question bank · 7 Practice engine · 8 Mock exams · 9 AI tutor · 10 Study plans · 11 Flashcards/gamification · 12 Parent/teacher/school · 13 Subscriptions/payments · 14 Admin CMS · 15 Analytics · 16 WhatsApp architecture · 17 Performance/security hardening · 18 Production deployment.

## 50. Important development rule

DO NOT build a fake prototype that merely looks complete. Build functional features. If a feature cannot be fully implemented immediately, create the correct architecture and clearly identify what remains. Do not populate the system with fake statistics that appear real. Realistic seed/demo data only in development mode.

## 51. Testing

Tests for: authentication, authorization, onboarding, subject selection, question generation, question marking, exam timer, exam submission, score calculation, progress calculation, subscription access, AI usage limits, teacher permissions, parent permissions, admin permissions. Test mobile responsiveness and slow-network conditions.

## 52. Final product experience

Within minutes a student can: 1) create an account 2) select ZIMSEC or Cambridge 3) select O-Level or A-Level 4) select subjects 5) take a diagnostic test 6) receive a performance report 7) get a personalised study plan 8) start studying 9) practise questions 10) take a test 11) see weaknesses 12) ask the AI tutor 13) return the next day and continue. The journey must feel seamless.

## 53. Business objective

Markets: B2C (students/parents pay monthly/yearly), B2B (schools subscribe), B2B2C (schools provide access via institutional subscriptions). Future expansion: Zambia, Botswana, Malawi, South Africa, other African boards. Curriculum architecture must NOT assume Zimbabwe only. Scalable hierarchy: Country → Examination Board → Qualification → Syllabus → Subject → Topic.

## 54. First task

Inspect the repo; produce an architecture assessment (stack, reuse, missing infrastructure, database/curriculum/application architecture, phases, technical/copyright/AI-cost/scalability risks); then begin implementation and continue systematically. At every major milestone: run tests, fix errors, verify UI, DB integrity, mobile responsiveness, authorization, and that the application actually works. The goal is a production-quality platform, not a mockup.
