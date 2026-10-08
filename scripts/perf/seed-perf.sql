-- =====================================================================================================================
-- Synthetic PERFORMANCE dataset (§38, docs/ARCHITECTURE.md §9). See scripts/perf/README.md for the full procedure.
--
-- Runs ONLY on a database whose name ends in "_perf", after `prisma migrate deploy`, the app-role grants and the
-- ALWAYS seed (`npm run db:seed`: catalogue, plans, settings, the "Original content" source). Set-based SQL only
-- (generate_series + joins); every CHECK constraint and trigger stays enabled and is satisfied by the data. Rows of
-- tables that have an `isDemo` flag are written with isDemo = true.
--
-- Shape (defaults; ~2 GB on disk including indexes, ~10 min on a 4-core laptop):
--   2 qualifications (ZIMSEC O-Level, Cambridge IGCSE) x 6 subjects, one CURRENT syllabus each, 2 papers,
--   10 TOPIC x 5 SUBTOPIC nodes per syllabus; 2,000 PUBLISHED platform questions (+400 drafts / in review),
--   600 published flashcards, one published 25-question mock exam per subject;
--   50 schools, 300 teachers, 300 classes, 20,000 students (16,000 in schools), 4,000 parents;
--   ~100k enrolments; ~1.1M QuestionAttempt rows in ~100k AssessmentAttempts over 90 days, with TopicMastery,
--   SubjectProgress, DailyActivity, LearnerStats, XpEvent and QuestionStats derived from those answers;
--   FlashcardState (5k students), LeaderboardEntry snapshots (13 weeks), AiUsageDaily, subscriptions and payments,
--   school seat grants, search documents and a job table with history.
--
-- Deterministic: pseudo-random values come from hashes of row keys (perf_seed.r), not random(), so two runs produce
-- the same shape (ids and timestamps differ: UUIDv7 ids, anchored at now()).
-- =====================================================================================================================

\set ON_ERROR_STOP on
SET client_min_messages = warning;
SET work_mem = '256MB';
SET maintenance_work_mem = '256MB';
SET TimeZone = 'UTC';

DO $$
BEGIN
  IF current_database() !~ '_perf$' THEN
    RAISE EXCEPTION 'seed-perf.sql only runs on a database named *_perf (this is %)', current_database();
  END IF;
  IF EXISTS (SELECT 1 FROM "User") THEN
    RAISE EXCEPTION 'database % already has users: create a fresh perf database (scripts/perf/README.md)', current_database();
  END IF;
  IF NOT EXISTS (SELECT 1 FROM "Subject") OR NOT EXISTS (SELECT 1 FROM "ContentSource" WHERE slug = 'original-content') THEN
    RAISE EXCEPTION 'run the ALWAYS seed first: DATABASE_URL=<perf app url> npm run db:seed';
  END IF;
  IF current_setting('app.environment', true) = 'production' THEN
    RAISE EXCEPTION 'refusing to write demo-flagged perf data into a production-configured database';
  END IF;
END
$$;

\echo [perf] 0. helpers
DROP SCHEMA IF EXISTS perf_seed CASCADE;
CREATE SCHEMA perf_seed;

-- Anchor: "now" of the dataset; the activity window is the 90 days before it.
CREATE TABLE perf_seed.cfg AS
SELECT date_trunc('minute', now()) AS anchor,
       date_trunc('minute', now()) - interval '90 days' AS t0,
       date_trunc('minute', now()) - interval '160 days' AS content_at,
       (date_trunc('minute', now()) AT TIME ZONE 'Africa/Harare')::date AS today;

-- Deterministic pseudo-random number in [0, 1) from a key and a stream number.
CREATE FUNCTION perf_seed.r(k bigint, s int) RETURNS float8
  LANGUAGE sql IMMUTABLE PARALLEL SAFE
  AS $$ SELECT (hashint8extended(k, s) & 281474976710655)::float8 / 281474976710656.0 $$;

-- UUIDv7 whose timestamp part is `t` (time-ordered ids for historical rows, like the application's ids).
CREATE FUNCTION perf_seed.uid(t timestamptz) RETURNS uuid
  LANGUAGE sql VOLATILE
  AS $$ SELECT uuidv7(t - clock_timestamp()) $$;

CREATE FUNCTION perf_seed.sha(j jsonb) RETURNS text
  LANGUAGE sql IMMUTABLE
  AS $$ SELECT encode(sha256(convert_to(j::text, 'UTF8')), 'hex') $$;

-- Mastery band for a score (§11 thresholds; mirrors the TopicMastery_band_chk CHECK).
CREATE FUNCTION perf_seed.band(score float8) RETURNS "MasteryBand"
  LANGUAGE sql IMMUTABLE
  AS $$ SELECT (CASE WHEN score >= 90 THEN 'MASTERED' WHEN score >= 75 THEN 'STRONG' WHEN score >= 60 THEN 'COMPETENT'
                     WHEN score >= 40 THEN 'DEVELOPING' ELSE 'WEAK' END)::"MasteryBand" $$;

CREATE TABLE perf_seed.names_first(i int PRIMARY KEY, v text);
INSERT INTO perf_seed.names_first
SELECT ordinality - 1, v FROM unnest(ARRAY['Tatenda','Rutendo','Tinashe','Nyasha','Farai','Chipo','Tafadzwa','Kudakwashe',
  'Ruvimbo','Takudzwa','Thandiwe','Sipho','Nokuthula','Blessing','Precious','Tendai','Munashe','Anesu','Vimbai',
  'Simbarashe','Ropafadzo','Panashe','Mufaro','Kundai','Ngonidzashe','Thabo','Lindiwe','Tanaka','Shamiso','Fadzai'])
  WITH ORDINALITY AS t(v, ordinality);
CREATE TABLE perf_seed.names_last(i int PRIMARY KEY, v text);
INSERT INTO perf_seed.names_last
SELECT ordinality - 1, v FROM unnest(ARRAY['Moyo','Ncube','Dube','Sibanda','Mpofu','Chikwanha','Mutasa','Chirwa',
  'Ndlovu','Marufu','Gumbo','Zhou','Mhlanga','Banda','Phiri','Mapfumo','Musonza','Nyathi','Chinembiri','Mukanya',
  'Hove','Makoni','Shumba','Tshuma','Mudzingwa'])
  WITH ORDINALITY AS t(v, ordinality);

-- =====================================================================================================================
\echo [perf] 1. curriculum: qualifications, subjects, syllabi, papers, topic trees, exam sessions
-- =====================================================================================================================

CREATE TABLE perf_seed.subj AS
WITH wanted(board_slug, qual_slug, subj_slug, k) AS (
  VALUES ('zimsec', 'o-level', 'mathematics', 1), ('zimsec', 'o-level', 'physics', 2), ('zimsec', 'o-level', 'chemistry', 3),
         ('zimsec', 'o-level', 'biology', 4), ('zimsec', 'o-level', 'english-language', 5), ('zimsec', 'o-level', 'geography', 6),
         ('cambridge', 'igcse', 'mathematics', 1), ('cambridge', 'igcse', 'physics', 2), ('cambridge', 'igcse', 'chemistry', 3),
         ('cambridge', 'igcse', 'biology', 4), ('cambridge', 'igcse', 'english-language', 5), ('cambridge', 'igcse', 'geography', 6))
SELECT (row_number() OVER (ORDER BY w.board_slug DESC, w.k))::int AS n,
       w.k,
       CASE WHEN w.board_slug = 'zimsec' THEN 1 ELSE 2 END AS qi,
       s.id AS subject_id, s.name AS subject_name, q.id AS qual_id, q."examBoardId" AS board_id,
       NULL::uuid AS syllabus_id, NULL::uuid AS grade_scheme_id
FROM wanted w
JOIN "ExamBoard" b ON b.slug = w.board_slug
JOIN "Qualification" q ON q."examBoardId" = b.id AND q.slug = w.qual_slug
JOIN "Subject" s ON s."qualificationId" = q.id AND s.slug = w.subj_slug;

DO $$ BEGIN
  IF (SELECT count(*) FROM perf_seed.subj) <> 12 THEN RAISE EXCEPTION 'catalogue is missing some perf subjects'; END IF;
END $$;

UPDATE perf_seed.subj s SET grade_scheme_id = g.id
FROM "GradeScheme" g WHERE g."qualificationId" = s.qual_id AND g."isDefault";

CREATE TABLE perf_seed.qual AS
SELECT DISTINCT qi, qual_id, board_id, grade_scheme_id FROM perf_seed.subj;

UPDATE "Qualification" SET "catalogueStatus" = 'AVAILABLE', "updatedAt" = now() WHERE id IN (SELECT qual_id FROM perf_seed.qual);
UPDATE "Subject" SET "catalogueStatus" = 'AVAILABLE', "sourceId" = (SELECT id FROM "ContentSource" WHERE slug = 'original-content'),
       "updatedAt" = now()
WHERE id IN (SELECT subject_id FROM perf_seed.subj);

-- Staff: authors / approvers (four-eyes), admins.
CREATE TABLE perf_seed.staff AS
SELECT v.k, v.role, v.email, v.first, perf_seed.uid((SELECT content_at FROM perf_seed.cfg) - interval '30 days' + v.k * interval '1 hour') AS id
FROM (VALUES (1, 'SUPER_ADMIN', 'perf.superadmin@example.test', 'Super'),
             (2, 'ADMIN', 'perf.admin@example.test', 'Admin'),
             (3, 'CONTENT_EDITOR', 'perf.author@example.test', 'Author'),
             (4, 'CONTENT_EDITOR', 'perf.approver@example.test', 'Approver')) AS v(k, role, email, first);

INSERT INTO "User" (id, "emailNormalized", "emailVerifiedAt", "passwordHash", "passwordUpdatedAt", roles, status, "isDemo",
                    "createdAt", "updatedAt")
SELECT s.id, s.email, c.content_at - interval '30 days', '$argon2id$v=19$m=19456,t=2,p=1$cGVyZnNlZWQ$cGVyZnNlZWRwZXJmc2VlZA',
       c.content_at - interval '30 days', ARRAY[s.role]::"Role"[], 'ACTIVE', true, c.content_at - interval '30 days',
       c.content_at - interval '30 days'
FROM perf_seed.staff s CROSS JOIN perf_seed.cfg c;
INSERT INTO "Profile" ("userId", "firstName", "lastName", "displayName", "countryId", "createdAt", "updatedAt")
SELECT s.id, s.first, 'Staff', s.first || ' (perf)', (SELECT id FROM "Country" WHERE "isoCode" = 'ZW'), now(), now()
FROM perf_seed.staff s;

-- Syllabi: inserted as DRAFT (structure is only writable while DRAFT), published as CURRENT below.
UPDATE perf_seed.subj s SET syllabus_id = perf_seed.uid(c.content_at + s.n * interval '1 minute') FROM perf_seed.cfg c;

INSERT INTO "Syllabus" (id, "subjectId", code, title, "versionLabel", status, "effectiveFrom", "gradeSchemeId", "sourceId",
                        "copyrightStatus", "sourceNotes", "isDemo", "createdById", "createdAt", "updatedAt")
SELECT s.syllabus_id, s.subject_id, 'PERF' || s.n, s.subject_name || ' (perf syllabus)', '2026', 'DRAFT', DATE '2026-01-01',
       s.grade_scheme_id, (SELECT id FROM "ContentSource" WHERE slug = 'original-content'), 'OWNED',
       'Synthetic performance-test structure (scripts/perf).', true, (SELECT id FROM perf_seed.staff WHERE k = 3),
       c.content_at, c.content_at
FROM perf_seed.subj s CROSS JOIN perf_seed.cfg c;

CREATE TABLE perf_seed.component AS
SELECT s.n, p.p, perf_seed.uid(c.content_at + s.n * interval '1 minute' + p.p * interval '1 second') AS id
FROM perf_seed.subj s CROSS JOIN generate_series(1, 2) AS p(p) CROSS JOIN perf_seed.cfg c;

INSERT INTO "SyllabusComponent" (id, "syllabusId", code, name, kind, "durationMinutes", "maxMarks", "weightingPercent",
                                 "calculatorAllowed", "sortOrder", "createdAt", "updatedAt")
SELECT cp.id, s.syllabus_id, 'P' || cp.p, 'Paper ' || cp.p,
       (CASE WHEN cp.p = 1 THEN 'MULTIPLE_CHOICE' ELSE 'WRITTEN' END)::"SyllabusComponentKind",
       CASE WHEN cp.p = 1 THEN 60 ELSE 150 END, CASE WHEN cp.p = 1 THEN 40 ELSE 100 END,
       CASE WHEN cp.p = 1 THEN 30 ELSE 70 END, cp.p = 2, cp.p, now(), now()
FROM perf_seed.component cp JOIN perf_seed.subj s ON s.n = cp.n;

-- Topic trees: 10 TOPIC roots (depth 0) x 5 SUBTOPIC leaves (depth 1) per syllabus. l = 0 is the root itself.
CREATE TABLE perf_seed.topic_names(k int, r int, name text, PRIMARY KEY (k, r));
INSERT INTO perf_seed.topic_names
SELECT k, ordinality, v
FROM (VALUES
  (1, ARRAY['Number','Algebra','Functions and graphs','Geometry','Mensuration','Trigonometry','Vectors and matrices','Transformations','Statistics','Probability']),
  (2, ARRAY['Measurement','Kinematics','Forces and motion','Energy','Thermal physics','Waves','Light','Electricity','Magnetism','Atomic physics']),
  (3, ARRAY['Particulate nature of matter','Atomic structure','Chemical bonding','Stoichiometry','Electrochemistry','Energetics','Rates of reaction','Acids and bases','Metals','Organic chemistry']),
  (4, ARRAY['Cells','Biological molecules','Enzymes','Nutrition','Transport','Respiration','Excretion','Coordination','Reproduction','Ecology']),
  (5, ARRAY['Reading comprehension','Summary writing','Narrative writing','Descriptive writing','Argumentative writing','Letter writing','Grammar','Vocabulary','Punctuation','Directed writing']),
  (6, ARRAY['Map work','Weather and climate','Ecosystems','Rivers','Population','Settlement','Agriculture','Mining','Industry','Tourism'])
) AS t(k, names), unnest(t.names) WITH ORDINALITY AS u(v, ordinality);

CREATE TABLE perf_seed.topic AS
SELECT s.n, r.r, l.l,
       perf_seed.uid(c.content_at + s.n * interval '1 minute' + (r.r * 10 + l.l) * interval '10 ms') AS id,
       NULL::uuid AS parent_id,
       tn.name || CASE l.l WHEN 0 THEN '' WHEN 1 THEN ': key concepts' WHEN 2 THEN ': methods and techniques'
                           WHEN 3 THEN ': applications' WHEN 4 THEN ': problem solving' ELSE ': exam practice' END AS name
FROM perf_seed.subj s
CROSS JOIN generate_series(1, 10) AS r(r)
CROSS JOIN generate_series(0, 5) AS l(l)
CROSS JOIN perf_seed.cfg c
JOIN perf_seed.topic_names tn ON tn.k = s.k AND tn.r = r.r;
UPDATE perf_seed.topic t SET parent_id = p.id FROM perf_seed.topic p WHERE t.l > 0 AND p.n = t.n AND p.r = t.r AND p.l = 0;
CREATE UNIQUE INDEX ON perf_seed.topic (n, r, l);
CREATE UNIQUE INDEX ON perf_seed.topic (id);

INSERT INTO "Topic" (id, "syllabusId", "parentId", kind, depth, path, "sortOrder", code, name, slug, description, "isPublic",
                     "estimatedStudyMinutes", "createdAt", "updatedAt")
SELECT t.id, s.syllabus_id, t.parent_id,
       (CASE WHEN t.l = 0 THEN 'TOPIC' ELSE 'SUBTOPIC' END)::"TopicKind",
       CASE WHEN t.l = 0 THEN 0 ELSE 1 END,
       CASE WHEN t.l = 0 THEN t.id::text ELSE t.parent_id::text || '/' || t.id::text END,
       CASE WHEN t.l = 0 THEN t.r ELSE t.l END,
       CASE WHEN t.l = 0 THEN t.r::text ELSE t.r || '.' || t.l END,
       t.name,
       'topic-' || t.r || CASE WHEN t.l = 0 THEN '' ELSE '-' || t.l END,
       'Synthetic topic for performance testing: ' || t.name || '.',
       true, CASE WHEN t.l = 0 THEN NULL ELSE 45 + (t.l * 15) END, c.content_at, c.content_at
FROM perf_seed.topic t JOIN perf_seed.subj s ON s.n = t.n CROSS JOIN perf_seed.cfg c
ORDER BY t.l, t.n, t.r;

-- Leaves are examined on paper 2; roots 1-5 also on paper 1.
INSERT INTO "TopicComponent" ("topicId", "componentId")
SELECT t.id, cp.id FROM perf_seed.topic t JOIN perf_seed.component cp ON cp.n = t.n
WHERE t.l > 0 AND (cp.p = 2 OR t.r <= 5);

UPDATE "Syllabus" sy SET status = 'CURRENT', "publishedAt" = c.content_at + interval '1 day',
       "publishedById" = (SELECT id FROM perf_seed.staff WHERE k = 4), "updatedAt" = c.content_at + interval '1 day'
FROM perf_seed.cfg c WHERE sy.id IN (SELECT syllabus_id FROM perf_seed.subj);

-- Target exam sessions (provisional dates; one per qualification).
CREATE TABLE perf_seed.session AS
SELECT q.qi, perf_seed.uid((SELECT content_at FROM perf_seed.cfg) + q.qi * interval '1 second') AS id
FROM perf_seed.qual q;
INSERT INTO "ExamSession" (id, "qualificationId", name, "seriesCode", year, "startsOn", "endsOn", "isProvisional", status,
                           notes, "isDemo", "createdAt", "updatedAt")
SELECT es.id, q.qual_id,
       CASE WHEN q.qi = 1 THEN 'November 2026 (perf)' ELSE 'May/June 2027 (perf)' END,
       CASE WHEN q.qi = 1 THEN 'PERF-NOV-2026' ELSE 'PERF-MJ-2027' END,
       CASE WHEN q.qi = 1 THEN 2026 ELSE 2027 END,
       CASE WHEN q.qi = 1 THEN DATE '2026-10-26' ELSE DATE '2027-04-26' END,
       CASE WHEN q.qi = 1 THEN DATE '2026-12-04' ELSE DATE '2027-06-11' END,
       true, 'PUBLISHED', 'Synthetic performance-test session.', true, now(), now()
FROM perf_seed.session es JOIN perf_seed.qual q ON q.qi = es.qi;

-- =====================================================================================================================
\echo [perf] 2. content: questions (+options, topic tags, revisions), flashcards, mock exams
-- =====================================================================================================================

-- k <= 2000: published; 2001..2300 DRAFT; 2301..2400 IN_REVIEW (admin queues).
CREATE TABLE perf_seed.q AS
SELECT k,
       1 + (k - 1) % 12 AS n,
       1 + ((k - 1) / 12) % 10 AS r,
       1 + ((k - 1) / 120) % 5 AS l,
       CASE WHEN perf_seed.r(k, 1) < 0.8 THEN 'MULTIPLE_CHOICE' ELSE 'TRUE_FALSE' END AS qtype,
       LEAST(5, GREATEST(1, 1 + floor(perf_seed.r(k, 2) * 2.2 + perf_seed.r(k, 3) * 2.8)::int)) AS difficulty,
       CASE WHEN perf_seed.r(k, 4) < 0.2 THEN 2 ELSE 1 END AS marks,
       (ARRAY['A','B','C','D'])[1 + floor(perf_seed.r(k, 5) * 4)::int] AS correct_key,
       perf_seed.r(k, 6) < 0.5 AS tf_correct,
       CASE WHEN k <= 2000 THEN 'PUBLISHED' WHEN k <= 2300 THEN 'DRAFT' ELSE 'IN_REVIEW' END AS final_status,
       perf_seed.uid((SELECT content_at FROM perf_seed.cfg) + interval '2 days' + k * interval '1 minute') AS id
FROM generate_series(1, 2400) AS k;
-- Drafts get the 'marks' of the published shape too; MCQ wrong option = the next key.
CREATE UNIQUE INDEX ON perf_seed.q (k);
CREATE UNIQUE INDEX ON perf_seed.q (id);

INSERT INTO "Question" (id, "subjectId", type, "markingMode", stem, payload, "answerSpec", explanation, hints, difficulty, marks,
                        "estimatedSeconds", "cognitiveSkill", "isExamStyle", "isDailyEligible", "calculatorAllowed", "accessTier",
                        status, revision, "createdById", "sourceId", author, "copyrightStatus", "isDemo", "createdAt", "updatedAt")
SELECT q.id, s.subject_id, q.qtype::"QuestionType", 'AUTO',
       'Question ' || q.k || ' on ' || t.name || ': which statement best describes the ' ||
         (ARRAY['definition','main idea','correct method','key relationship','most likely outcome'])[1 + q.k % 5] ||
         ' in this ' || lower(s.subject_name) || ' context?',
       CASE WHEN q.qtype = 'MULTIPLE_CHOICE' THEN '{"selectMode":"single","shuffleOptions":false}'::jsonb
            ELSE '{"statementStyle":"true_false"}'::jsonb END,
       CASE WHEN q.qtype = 'MULTIPLE_CHOICE' THEN '{"scoring":"all_or_nothing"}'::jsonb
            ELSE jsonb_build_object('correct', q.tf_correct) END,
       'Worked explanation for question ' || q.k || ' (' || t.name || ').',
       ARRAY['Re-read the key terms in the stem.'],
       q.difficulty, q.marks, 45 + q.difficulty * 15,
       (ARRAY['RECALL','UNDERSTANDING','APPLICATION','ANALYSIS'])[1 + q.k % 4]::"CognitiveSkill",
       perf_seed.r(q.k, 7) < 0.3, perf_seed.r(q.k, 8) < 0.1, CASE WHEN s.k IN (1, 2, 3) THEN true ELSE NULL END,
       (CASE WHEN perf_seed.r(q.k, 9) < 0.05 THEN 'PUBLIC' WHEN perf_seed.r(q.k, 9) < 0.45 THEN 'FREE' ELSE 'PREMIUM' END)::"ContentAccessTier",
       'DRAFT', 1, (SELECT id FROM perf_seed.staff WHERE k = 3), (SELECT id FROM "ContentSource" WHERE slug = 'original-content'),
       'Perf content team', 'OWNED', true,
       c.content_at + interval '2 days' + q.k * interval '1 minute', c.content_at + interval '2 days' + q.k * interval '1 minute'
FROM perf_seed.q q
JOIN perf_seed.subj s ON s.n = q.n
JOIN perf_seed.topic t ON t.n = q.n AND t.r = q.r AND t.l = q.l
CROSS JOIN perf_seed.cfg c;

INSERT INTO "QuestionOption" (id, "questionId", key, content, "isCorrect", rationale, "sortOrder", "createdAt", "updatedAt")
SELECT perf_seed.uid(c.content_at + interval '2 days' + q.k * interval '1 minute' + o.i * interval '1 ms'), q.id, o.key,
       'Option ' || o.key || ' for question ' || q.k, o.key = q.correct_key,
       CASE WHEN o.key = q.correct_key THEN 'This is the correct statement.' ELSE 'A common misconception.' END, o.i, now(), now()
FROM perf_seed.q q
CROSS JOIN LATERAL (VALUES (1, 'A'), (2, 'B'), (3, 'C'), (4, 'D')) AS o(i, key)
CROSS JOIN perf_seed.cfg c
WHERE q.qtype = 'MULTIPLE_CHOICE';

-- Primary tag on the leaf; a secondary tag on the parent TOPIC for a third of the questions.
INSERT INTO "QuestionTopic" ("questionId", "topicId", "syllabusId", "subjectId", "isPrimary", "createdAt")
SELECT q.id, t.id, s.syllabus_id, s.subject_id, true, now()
FROM perf_seed.q q JOIN perf_seed.subj s ON s.n = q.n JOIN perf_seed.topic t ON t.n = q.n AND t.r = q.r AND t.l = q.l
UNION ALL
SELECT q.id, t.id, s.syllabus_id, s.subject_id, false, now()
FROM perf_seed.q q JOIN perf_seed.subj s ON s.n = q.n JOIN perf_seed.topic t ON t.n = q.n AND t.r = q.r AND t.l = 0
WHERE q.k % 3 = 0;

BEGIN;
-- Workflow DRAFT -> IN_REVIEW -> APPROVED -> PUBLISHED (the workflow trigger allows only these steps), with the revision
-- snapshot in the same transaction (deferred Question_revision_snapshot trigger checks it at COMMIT).
UPDATE "Question" SET status = 'IN_REVIEW', "updatedAt" = "createdAt" + interval '1 day'
WHERE id IN (SELECT id FROM perf_seed.q WHERE final_status IN ('PUBLISHED', 'IN_REVIEW'));
UPDATE "Question" SET status = 'APPROVED', "reviewedById" = (SELECT id FROM perf_seed.staff WHERE k = 4),
       "reviewedAt" = "createdAt" + interval '2 days', "approvedById" = (SELECT id FROM perf_seed.staff WHERE k = 4),
       "approvedAt" = "createdAt" + interval '2 days', "updatedAt" = "createdAt" + interval '2 days'
WHERE id IN (SELECT id FROM perf_seed.q WHERE final_status = 'PUBLISHED');
UPDATE "Question" SET status = 'PUBLISHED', "publishedAt" = "createdAt" + interval '3 days', "updatedAt" = "createdAt" + interval '3 days'
WHERE id IN (SELECT id FROM perf_seed.q WHERE final_status = 'PUBLISHED');
INSERT INTO "ContentRevision" (id, "entityType", "entityId", revision, "schemaVersion", snapshot, "contentHash", "authorId",
                               "approvedById", "changeNote", "createdAt")
SELECT perf_seed.uid(x."publishedAt"), 'QUESTION', x.id, 1, 1, x.snap, perf_seed.sha(x.snap), x."createdById", x."approvedById",
       'Initial publication (perf seed)', x."publishedAt"
FROM (
  SELECT qq.id, qq."publishedAt", qq."createdById", qq."approvedById",
         jsonb_build_object('id', qq.id, 'type', qq.type, 'stem', qq.stem, 'payload', qq.payload, 'answerSpec', qq."answerSpec",
                            'difficulty', qq.difficulty, 'marks', qq.marks,
                            'options', (SELECT jsonb_agg(jsonb_build_object('key', o.key, 'content', o.content, 'isCorrect', o."isCorrect") ORDER BY o."sortOrder")
                                        FROM "QuestionOption" o WHERE o."questionId" = qq.id)) AS snap
  FROM "Question" qq WHERE qq.status = 'PUBLISHED' AND qq.id IN (SELECT id FROM perf_seed.q)
) x;
COMMIT;

-- Flashcards: 50 per subject (10 per TOPIC), published directly with their snapshot.
CREATE TABLE perf_seed.fc AS
SELECT s.n, f.f, 1 + (f.f - 1) / 5 AS r, 1 + (f.f - 1) % 5 AS l,
       perf_seed.uid((SELECT content_at FROM perf_seed.cfg) + interval '5 days' + (s.n * 100 + f.f) * interval '1 second') AS id
FROM perf_seed.subj s CROSS JOIN generate_series(1, 50) AS f(f);
CREATE UNIQUE INDEX ON perf_seed.fc (n, f);

BEGIN;
INSERT INTO "Flashcard" (id, "subjectId", "cardType", front, back, "accessTier", status, revision, "createdById", "approvedById",
                         "approvedAt", "publishedAt", "sourceId", "copyrightStatus", "isDemo", "createdAt", "updatedAt")
SELECT fc.id, s.subject_id, (ARRAY['DEFINITION','FORMULA','CONCEPT','FACT'])[1 + fc.f % 4]::"FlashcardType",
       'Card ' || fc.f || ': ' || t.name, 'Answer side of card ' || fc.f || ' for ' || t.name || '.',
       (CASE WHEN fc.f % 3 = 0 THEN 'FREE' ELSE 'PREMIUM' END)::"ContentAccessTier", 'PUBLISHED', 1,
       (SELECT id FROM perf_seed.staff WHERE k = 3), (SELECT id FROM perf_seed.staff WHERE k = 4),
       c.content_at + interval '6 days', c.content_at + interval '7 days',
       (SELECT id FROM "ContentSource" WHERE slug = 'original-content'), 'OWNED', true,
       c.content_at + interval '5 days', c.content_at + interval '7 days'
FROM perf_seed.fc fc JOIN perf_seed.subj s ON s.n = fc.n JOIN perf_seed.topic t ON t.n = fc.n AND t.r = fc.r AND t.l = fc.l
CROSS JOIN perf_seed.cfg c;
INSERT INTO "ContentRevision" (id, "entityType", "entityId", revision, snapshot, "contentHash", "authorId", "approvedById", "createdAt")
SELECT perf_seed.uid(f."publishedAt"), 'FLASHCARD', f.id, 1, x.snap, perf_seed.sha(x.snap), f."createdById", f."approvedById", f."publishedAt"
FROM "Flashcard" f
CROSS JOIN LATERAL (SELECT jsonb_build_object('id', f.id, 'front', f.front, 'back', f.back, 'cardType', f."cardType") AS snap) x
WHERE f.id IN (SELECT id FROM perf_seed.fc);
COMMIT;
INSERT INTO "FlashcardTopic" ("flashcardId", "topicId", "isPrimary", "sortOrder", "createdAt")
SELECT fc.id, t.id, true, fc.f, now()
FROM perf_seed.fc fc JOIN perf_seed.topic t ON t.n = fc.n AND t.r = fc.r AND t.l = fc.l;

-- Mock exams: one FIXED 25-question MOCK_EXAM per subject (paper 1: 15 items, paper 2: 10 items), 2 h overall limit.
CREATE TABLE perf_seed.mock AS
SELECT s.n, perf_seed.uid((SELECT content_at FROM perf_seed.cfg) + interval '8 days' + s.n * interval '1 second') AS id
FROM perf_seed.subj s;
CREATE TABLE perf_seed.mock_section AS
SELECT m.n, p.p, perf_seed.uid((SELECT content_at FROM perf_seed.cfg) + interval '8 days' + (m.n * 10 + p.p) * interval '10 ms') AS id
FROM perf_seed.mock m CROSS JOIN generate_series(1, 2) AS p(p);
-- Items: 25 of the subject's published questions (hash sample, so every TOPIC is represented), positions 1..25.
CREATE TABLE perf_seed.mock_item AS
SELECT x.n, x.pos, CASE WHEN x.pos <= 15 THEN 1 ELSE 2 END AS p, x.k, x.qid, x.marks
FROM (
  SELECT y.n, y.k, y.qid, y.marks, row_number() OVER (PARTITION BY y.n ORDER BY y.r, y.l, y.k)::int AS pos
  FROM (
    SELECT q.n, q.k, q.id AS qid, q.marks, q.r, q.l, row_number() OVER (PARTITION BY q.n ORDER BY perf_seed.r(q.k, 50)) AS pick
    FROM perf_seed.q q WHERE q.final_status = 'PUBLISHED'
  ) y WHERE y.pick <= 25
) x;
CREATE UNIQUE INDEX ON perf_seed.mock_item (n, pos);

BEGIN;
INSERT INTO "Assessment" (id, kind, assembly, "subjectId", "syllabusId", title, description, instructions, "timeLimitSeconds",
                          "totalMarks", "gradeSchemeId", "feedbackTiming", "allowNavigation", "accessTier", status, revision,
                          "createdById", "sourceId", "copyrightStatus", "isDemo", "createdAt", "updatedAt")
SELECT m.id, 'MOCK_EXAM', 'FIXED', s.subject_id, s.syllabus_id, s.subject_name || ' mock exam 1 (perf)',
       'Full mock under exam conditions.', 'Answer all questions.', 7200,
       (SELECT sum(i.marks) FROM perf_seed.mock_item i WHERE i.n = m.n), s.grade_scheme_id, 'AFTER_SUBMIT', true, 'PREMIUM',
       'DRAFT', 1, (SELECT id FROM perf_seed.staff WHERE k = 3), (SELECT id FROM "ContentSource" WHERE slug = 'original-content'),
       'OWNED', true, c.content_at + interval '8 days', c.content_at + interval '8 days'
FROM perf_seed.mock m JOIN perf_seed.subj s ON s.n = m.n CROSS JOIN perf_seed.cfg c;
INSERT INTO "AssessmentSection" (id, "assessmentId", "componentId", title, "sortOrder", marks, "createdAt", "updatedAt")
SELECT ms.id, m.id, cp.id, 'Paper ' || ms.p, ms.p, (SELECT sum(i.marks) FROM perf_seed.mock_item i WHERE i.n = ms.n AND i.p = ms.p), now(), now()
FROM perf_seed.mock_section ms JOIN perf_seed.mock m ON m.n = ms.n JOIN perf_seed.component cp ON cp.n = ms.n AND cp.p = ms.p;
INSERT INTO "AssessmentItem" (id, "sectionId", "questionId", "sortOrder", label, "createdAt")
SELECT perf_seed.uid(now()), ms.id, i.qid, i.pos, i.pos::text, now()
FROM perf_seed.mock_item i JOIN perf_seed.mock_section ms ON ms.n = i.n AND ms.p = i.p;
UPDATE "Assessment" SET status = 'IN_REVIEW', "updatedAt" = "createdAt" + interval '1 hour' WHERE id IN (SELECT id FROM perf_seed.mock);
UPDATE "Assessment" SET status = 'APPROVED', "approvedById" = (SELECT id FROM perf_seed.staff WHERE k = 4),
       "approvedAt" = "createdAt" + interval '2 hours', "updatedAt" = "createdAt" + interval '2 hours'
WHERE id IN (SELECT id FROM perf_seed.mock);
UPDATE "Assessment" SET status = 'PUBLISHED', "publishedAt" = "createdAt" + interval '3 hours', "updatedAt" = "createdAt" + interval '3 hours'
WHERE id IN (SELECT id FROM perf_seed.mock);
INSERT INTO "ContentRevision" (id, "entityType", "entityId", revision, snapshot, "contentHash", "authorId", "approvedById", "createdAt")
SELECT perf_seed.uid(a."publishedAt"), 'ASSESSMENT', a.id, 1, x.snap, perf_seed.sha(x.snap), a."createdById", a."approvedById", a."publishedAt"
FROM "Assessment" a
CROSS JOIN LATERAL (
  SELECT jsonb_build_object('id', a.id, 'title', a.title, 'kind', a.kind, 'timeLimitSeconds', a."timeLimitSeconds",
           'sections', (SELECT jsonb_agg(jsonb_build_object('id', se.id, 'title', se.title,
                          'items', (SELECT jsonb_agg(jsonb_build_object('questionId', it."questionId", 'sortOrder', it."sortOrder") ORDER BY it."sortOrder")
                                    FROM "AssessmentItem" it WHERE it."sectionId" = se.id)) ORDER BY se."sortOrder")
                        FROM "AssessmentSection" se WHERE se."assessmentId" = a.id)) AS snap
) x
WHERE a.id IN (SELECT id FROM perf_seed.mock);
COMMIT;

ANALYZE perf_seed.subj; ANALYZE perf_seed.qual; ANALYZE perf_seed.staff; ANALYZE perf_seed.component; ANALYZE perf_seed.topic;
ANALYZE perf_seed.q; ANALYZE perf_seed.fc; ANALYZE perf_seed.mock; ANALYZE perf_seed.mock_section; ANALYZE perf_seed.mock_item;

-- =====================================================================================================================
\echo [perf] 3. people: schools, school admins, teachers, classes, students, parents, enrolments, memberships
-- =====================================================================================================================

CREATE TABLE perf_seed.school AS
SELECT j, CASE WHEN j % 2 = 1 THEN 1 ELSE 2 END AS qi,
       perf_seed.uid((SELECT content_at FROM perf_seed.cfg) + interval '10 days' + j * interval '1 hour') AS id,
       (ARRAY['Harare','Bulawayo','Manicaland','Mashonaland East','Mashonaland West','Mashonaland Central','Masvingo',
              'Matabeleland North','Matabeleland South','Midlands'])[1 + j % 10] AS region,
       (ARRAY['Harare','Bulawayo','Mutare','Marondera','Chinhoyi','Bindura','Masvingo','Hwange','Gwanda','Gweru',
              'Kwekwe','Kadoma','Chitungwiza','Rusape','Zvishavane'])[1 + j % 15] AS town
FROM generate_series(1, 50) AS j;

INSERT INTO "School" (id, name, slug, "countryId", region, district, town, type, status, "officialCode", "contactEmail", timezone,
                      "verifiedAt", "verifiedById", "createdById", "isDemo", "createdAt", "updatedAt")
SELECT sc.id, sc.town || ' ' || (ARRAY['High','Secondary','Academy','College','Christian College'])[1 + sc.j % 5] || ' School ' || sc.j,
       'perf-school-' || sc.j, (SELECT id FROM "Country" WHERE "isoCode" = 'ZW'), sc.region, sc.town, sc.town,
       (ARRAY['GOVERNMENT','MISSION','TRUST','PRIVATE','COUNCIL'])[1 + sc.j % 5]::"SchoolType", 'ACTIVE', 'PERF' || lpad(sc.j::text, 4, '0'),
       'office' || sc.j || '@perf-school.example.test', 'Africa/Harare', c.content_at + interval '11 days',
       (SELECT id FROM perf_seed.staff WHERE k = 1), (SELECT id FROM perf_seed.staff WHERE k = 2), true,
       c.content_at + interval '10 days', c.content_at + interval '11 days'
FROM perf_seed.school sc CROSS JOIN perf_seed.cfg c;

-- All perf users, numbered: students 1..20000, parents 100001.., teachers 200001.., school admins 300001..
CREATE TABLE perf_seed.u AS
SELECT s AS u, 'STUDENT' AS kind,
       CASE WHEN perf_seed.r(s, 101) < 0.85
            THEN c.anchor - interval '160 days' + perf_seed.r(s, 108) * interval '69 days'
            ELSE c.t0 + perf_seed.r(s, 108) * interval '88 days' END AS created_at
FROM generate_series(1, 20000) AS s CROSS JOIN perf_seed.cfg c
UNION ALL
SELECT 100000 + p, 'PARENT', c.anchor - interval '150 days' + perf_seed.r(p, 109) * interval '120 days'
FROM generate_series(1, 4000) AS p CROSS JOIN perf_seed.cfg c
UNION ALL
SELECT 200000 + t, 'TEACHER', c.content_at + interval '12 days' + t * interval '1 minute'
FROM generate_series(1, 300) AS t CROSS JOIN perf_seed.cfg c
UNION ALL
SELECT 300000 + a, 'SCHOOL_ADMIN', c.content_at + interval '11 days' + a * interval '1 minute'
FROM generate_series(1, 50) AS a CROSS JOIN perf_seed.cfg c;
ALTER TABLE perf_seed.u ADD COLUMN id uuid;
UPDATE perf_seed.u SET id = perf_seed.uid(created_at);
CREATE UNIQUE INDEX ON perf_seed.u (u);
CREATE UNIQUE INDEX ON perf_seed.u (id);
ANALYZE perf_seed.u; ANALYZE perf_seed.school;

INSERT INTO "User" (id, "emailNormalized", "phoneE164", "emailVerifiedAt", "passwordHash", "passwordUpdatedAt", roles, status,
                    "lastLoginAt", "lastActiveAt", "signupChannel", "isDemo", "createdAt", "updatedAt")
SELECT u.id,
       CASE u.kind WHEN 'STUDENT' THEN 'perf.s' || u.u WHEN 'PARENT' THEN 'perf.p' || (u.u - 100000)
                   WHEN 'TEACHER' THEN 'perf.t' || (u.u - 200000) ELSE 'perf.a' || (u.u - 300000) END || '@example.test',
       CASE WHEN perf_seed.r(u.u, 110) < 0.3 THEN '+2637' || lpad(u.u::text, 8, '0') END,
       u.created_at + interval '5 minutes',
       '$argon2id$v=19$m=19456,t=2,p=1$cGVyZnNlZWQ$cGVyZnNlZWRwZXJmc2VlZA', u.created_at,
       (CASE u.kind WHEN 'STUDENT' THEN '{STUDENT}' WHEN 'PARENT' THEN '{PARENT}' WHEN 'TEACHER' THEN '{TEACHER}' ELSE '{}' END)::"Role"[],
       'ACTIVE', c.anchor - perf_seed.r(u.u, 111) * interval '20 days', c.anchor - perf_seed.r(u.u, 111) * interval '20 days',
       (CASE WHEN perf_seed.r(u.u, 112) < 0.1 THEN 'WHATSAPP' ELSE 'WEB' END)::"ActivityChannel", true, u.created_at, u.created_at
FROM perf_seed.u u CROSS JOIN perf_seed.cfg c;

INSERT INTO "Profile" ("userId", "firstName", "lastName", "displayName", username, "countryId", timezone, "leaderboardOptIn",
                       "termsAcceptedAt", "termsVersion", "privacyNoticeVersion", "createdAt", "updatedAt")
SELECT u.id, nf.v, nl.v, nf.v || ' ' || left(nl.v, 1) || '.', 'perf_u' || u.u, (SELECT id FROM "Country" WHERE "isoCode" = 'ZW'),
       'Africa/Harare', u.kind = 'STUDENT' AND perf_seed.r(u.u, 105) < 0.3, u.created_at, '2026-01', '2026-01', u.created_at, u.created_at
FROM perf_seed.u u
JOIN perf_seed.names_first nf ON nf.i = (hashint4(u.u) & 2147483647) % 30
JOIN perf_seed.names_last nl ON nl.i = (hashint4(u.u + 7919) & 2147483647) % 25;

-- School staff memberships, Teacher and Parent rows.
INSERT INTO "SchoolMember" (id, "schoolId", "userId", role, status, source, "joinedAt", "createdAt", "updatedAt")
SELECT perf_seed.uid(u.created_at), sc.id, u.id, 'SCHOOL_ADMIN'::"SchoolMemberRole", 'ACTIVE'::"SchoolMemberStatus", 'ADDED_BY_STAFF'::"MembershipSource", u.created_at, u.created_at, u.created_at
FROM perf_seed.u u JOIN perf_seed.school sc ON sc.j = u.u - 300000 WHERE u.kind = 'SCHOOL_ADMIN'
UNION ALL
SELECT perf_seed.uid(u.created_at), sc.id, u.id, 'TEACHER', 'ACTIVE', 'INVITE', u.created_at, u.created_at, u.created_at
FROM perf_seed.u u JOIN perf_seed.school sc ON sc.j = 1 + (u.u - 200001) / 6 WHERE u.kind = 'TEACHER';
INSERT INTO "Teacher" ("userId", title, "onboardingCompletedAt", "createdAt", "updatedAt")
SELECT u.id, (ARRAY['Mr','Mrs','Ms','Dr'])[1 + u.u % 4], u.created_at + interval '1 hour', u.created_at, u.created_at
FROM perf_seed.u u WHERE u.kind = 'TEACHER';
INSERT INTO "Parent" ("userId", "onboardingCompletedAt", "createdAt", "updatedAt")
SELECT u.id, u.created_at + interval '10 minutes', u.created_at, u.created_at FROM perf_seed.u u WHERE u.kind = 'PARENT';

-- Classes: 6 per school, one per subject of the school's qualification, led by teacher slot c.
CREATE TABLE perf_seed.class AS
SELECT sc.j, c.c, sc.qi, (sc.qi - 1) * 6 + c.c AS n,
       perf_seed.uid((SELECT content_at FROM perf_seed.cfg) + interval '13 days' + (sc.j * 10 + c.c) * interval '1 minute') AS id,
       (SELECT id FROM perf_seed.u WHERE u = 200000 + (sc.j - 1) * 6 + c.c) AS teacher_id
FROM perf_seed.school sc CROSS JOIN generate_series(1, 6) AS c(c);
CREATE UNIQUE INDEX ON perf_seed.class (j, c);
ANALYZE perf_seed.class;

INSERT INTO "Class" (id, "schoolId", name, "subjectId", "qualificationId", "yearGroupId", "academicYear", "joinCode", "createdById",
                     "createdAt", "updatedAt")
SELECT cl.id, sc.id, 'Form 4 ' || s.subject_name, s.subject_id, s.qual_id,
       (SELECT y.id FROM "YearGroup" y JOIN "Country" co ON co.id = y."countryId" WHERE co."isoCode" = 'ZW' AND y.code = 'F4'),
       '2026', 'PF' || lpad((cl.j * 10 + cl.c)::text, 4, '0'), cl.teacher_id, cf.content_at + interval '13 days', cf.content_at + interval '13 days'
FROM perf_seed.class cl JOIN perf_seed.school sc ON sc.j = cl.j JOIN perf_seed.subj s ON s.n = cl.n CROSS JOIN perf_seed.cfg cf;
INSERT INTO "ClassTeacher" (id, "classId", "userId", role, "addedAt", "createdAt", "updatedAt")
SELECT perf_seed.uid(now()), cl.id, cl.teacher_id, 'LEAD', now(), now(), now() FROM perf_seed.class cl;

-- Students.
CREATE TABLE perf_seed.stu AS
SELECT u.u AS s, u.id, u.created_at,
       CASE WHEN u.u <= 16000 THEN 1 + (u.u - 1) % 50 END AS j,
       CASE WHEN u.u <= 16000 THEN CASE WHEN (1 + (u.u - 1) % 50) % 2 = 1 THEN 1 ELSE 2 END
            WHEN perf_seed.r(u.u, 102) < 0.65 THEN 1 ELSE 2 END AS qi,
       CASE WHEN perf_seed.r(u.u, 103) < 0.7 THEN 'F4' ELSE 'F3' END AS year_code,
       0.30 + 0.55 * perf_seed.r(u.u, 104) AS ability,
       4 + floor(perf_seed.r(u.u, 107) * 3)::int AS nsubj,
       perf_seed.r(u.u, 120) < 0.75 AS active,
       1 + floor(-ln(1 - perf_seed.r(u.u, 121)) * 6)::int AS sessions,
       greatest((SELECT t0 FROM perf_seed.cfg), u.created_at + interval '1 day') AS window_start
FROM perf_seed.u u WHERE u.kind = 'STUDENT';
CREATE UNIQUE INDEX ON perf_seed.stu (s);
CREATE UNIQUE INDEX ON perf_seed.stu (id);
ANALYZE perf_seed.stu;

INSERT INTO "Student" ("userId", "countryId", "examBoardId", "qualificationId", "yearGroupId", "abilityLevel", "targetGrade",
                       "targetExamSessionId", "schoolId", "onboardingStep", "onboardingCompletedAt", "diagnosticSkippedAt", "isMinor",
                       "guardianConsentStatus", "guardianConsentAt", "guardianConsentMethod", "createdAt", "updatedAt")
SELECT st.id, co.id, q.board_id, q.qual_id, y.id,
       (CASE WHEN st.ability < 0.5 THEN 'BEGINNER' WHEN st.ability < 0.7 THEN 'INTERMEDIATE' ELSE 'ADVANCED' END)::"AbilityLevel",
       CASE WHEN st.qi = 1 THEN (ARRAY['A','B','C'])[1 + st.s % 3] ELSE (ARRAY['A*','A','B','C'])[1 + st.s % 4] END,
       es.id, sc.id, 'COMPLETED', st.created_at + interval '10 minutes', st.created_at + interval '11 minutes', true,
       (CASE WHEN st.j IS NOT NULL OR perf_seed.r(st.s, 122) < 0.6 THEN 'GRANTED' ELSE 'PENDING' END)::"GuardianConsentStatus",
       CASE WHEN st.j IS NOT NULL OR perf_seed.r(st.s, 122) < 0.6 THEN st.created_at + interval '1 hour' END,
       (CASE WHEN st.j IS NOT NULL THEN 'SCHOOL' WHEN perf_seed.r(st.s, 122) < 0.6 THEN 'OFFLINE_FORM' END)::"GuardianConsentMethod",
       st.created_at, st.created_at + interval '10 minutes'
FROM perf_seed.stu st
JOIN perf_seed.qual q ON q.qi = st.qi
JOIN perf_seed.session es ON es.qi = st.qi
JOIN "Country" co ON co."isoCode" = 'ZW'
JOIN "YearGroup" y ON y."countryId" = co.id AND y.code = st.year_code
LEFT JOIN perf_seed.school sc ON sc.j = st.j;

INSERT INTO "SchoolMember" (id, "schoolId", "userId", role, status, source, "studentNumber", "joinedAt", "createdAt", "updatedAt")
SELECT perf_seed.uid(st.created_at), sc.id, st.id, 'STUDENT', 'ACTIVE', 'ROSTER_IMPORT', 'S' || lpad(st.s::text, 6, '0'),
       st.created_at, st.created_at, st.created_at
FROM perf_seed.stu st JOIN perf_seed.school sc ON sc.j = st.j;

-- Enrolments: 4-6 of the qualification's 6 subjects (mathematics and English first), pinned to the CURRENT syllabus.
CREATE TABLE perf_seed.enr AS
SELECT x.s, x.n, x.k, x.rank, st.id AS user_id, s.subject_id, s.syllabus_id, st.created_at + interval '15 minutes' AS created_at,
       perf_seed.uid(st.created_at + interval '15 minutes' + x.rank * interval '1 second') AS id
FROM (
  SELECT st.s, (st.qi - 1) * 6 + k.k AS n, k.k,
         row_number() OVER (PARTITION BY st.s ORDER BY (k.k IN (1, 5)) DESC, perf_seed.r(st.s * 16 + k.k, 106))::int AS rank,
         st.nsubj
  FROM perf_seed.stu st CROSS JOIN generate_series(1, 6) AS k(k)
) x
JOIN perf_seed.stu st ON st.s = x.s
JOIN perf_seed.subj s ON s.n = x.n
WHERE x.rank <= x.nsubj;
CREATE UNIQUE INDEX ON perf_seed.enr (s, rank);
CREATE UNIQUE INDEX ON perf_seed.enr (s, n);
ANALYZE perf_seed.enr;

INSERT INTO "SubjectEnrollment" (id, "userId", "subjectId", "syllabusId", "targetExamSessionId", "syllabusPinnedAt", "createdAt",
                                 "updatedAt", status, "enrolledVia", "abilityLevel", "targetGrade")
SELECT e.id, e.user_id, e.subject_id, e.syllabus_id, es.id, e.created_at, e.created_at, e.created_at, 'ACTIVE',
       (CASE WHEN st.j IS NOT NULL THEN 'SCHOOL' ELSE 'SELF' END)::"EnrollmentSource",
       (CASE WHEN st.ability < 0.5 THEN 'BEGINNER' WHEN st.ability < 0.7 THEN 'INTERMEDIATE' ELSE 'ADVANCED' END)::"AbilityLevel",
       CASE WHEN st.qi = 1 THEN 'B' ELSE 'A' END
FROM perf_seed.enr e JOIN perf_seed.stu st ON st.s = e.s JOIN perf_seed.session es ON es.qi = st.qi;

-- Class membership: school students join the classes of their first 3 enrolled subjects (~160 per class).
INSERT INTO "ClassMember" (id, "classId", "userId", status, source, "joinedAt", "createdAt", "updatedAt")
SELECT perf_seed.uid(e.created_at + interval '1 day'), cl.id, e.user_id, 'ACTIVE', 'ADDED_BY_STAFF', e.created_at + interval '1 day',
       e.created_at + interval '1 day', e.created_at + interval '1 day'
FROM perf_seed.enr e JOIN perf_seed.stu st ON st.s = e.s JOIN perf_seed.class cl ON cl.j = st.j AND cl.c = e.k
WHERE st.j IS NOT NULL AND e.rank <= 3;

-- Parents: parent p links to student 1 + 5(p-1) and, for even p, the next student too (6,000 ACTIVE links).
CREATE TABLE perf_seed.link AS
SELECT x.p, x.s, pu.id AS parent_id, su.id AS student_id, greatest(pu.created_at, su.created_at) + interval '2 hours' AS at
FROM (
  SELECT p, 1 + 5 * (p - 1) AS s FROM generate_series(1, 4000) AS p
  UNION ALL
  SELECT p, 2 + 5 * (p - 1) FROM generate_series(2, 4000, 2) AS p
) x
JOIN perf_seed.u pu ON pu.u = 100000 + x.p
JOIN perf_seed.u su ON su.u = x.s;
ANALYZE perf_seed.link;
INSERT INTO "ParentStudentLink" (id, "parentUserId", "studentUserId", status, relationship, "initiatedBy", "consentBasis",
                                 "studentConsentAt", "activatedAt", "createdAt", "updatedAt")
SELECT perf_seed.uid(l.at), l.parent_id, l.student_id, 'ACTIVE', (ARRAY['PARENT','PARENT','GUARDIAN'])[1 + l.p % 3]::"GuardianRelationship",
       'PARENT', 'STUDENT_CODE', l.at + interval '1 hour', l.at + interval '1 hour', l.at, l.at + interval '1 hour'
FROM perf_seed.link l;

-- =====================================================================================================================
\echo [perf] 4. billing: prices, school contracts + seat grants, individual subscriptions and payments
-- =====================================================================================================================

CREATE TABLE perf_seed.price AS
SELECT v.key, v.plan_code, perf_seed.uid((SELECT content_at FROM perf_seed.cfg) + v.i * interval '1 second') AS id, v.interval_,
       v.amount, v.period_days, v.per_seat
FROM (VALUES (1, 'STUDENT_MONTH', 'STUDENT', 'MONTH', 300, NULL::int, false),
             (2, 'STUDENT_TERM', 'STUDENT', 'TERM', 800, 91, false),
             (3, 'PREMIUM_MONTH', 'PREMIUM', 'MONTH', 600, NULL, false),
             (4, 'SCHOOL_TERM', 'SCHOOL', 'TERM', 250, 91, true)) AS v(i, key, plan_code, interval_, amount, period_days, per_seat);
INSERT INTO "PlanPrice" (id, "planId", "countryId", currency, "amountMinor", "interval", "periodDays", "perSeat", "minSeats", label,
                         "isActive", "validFrom", "isDemo", "createdAt", "updatedAt")
SELECT pr.id, pl.id, (SELECT id FROM "Country" WHERE "isoCode" = 'ZW'), 'USD', pr.amount, pr.interval_::"BillingInterval",
       pr.period_days, pr.per_seat, CASE WHEN pr.per_seat THEN 50 END, pr.key, true, c.content_at, true, c.content_at, c.content_at
FROM perf_seed.price pr JOIN "Plan" pl ON pl.code = pr.plan_code CROSS JOIN perf_seed.cfg c;

-- Schools: one ACTIVE SCHOOL contract each (400 seats, 91-day terms), two SEATS payments, a seat grant per school student.
CREATE TABLE perf_seed.school_sub AS
SELECT sc.j, sc.id AS school_id, perf_seed.uid(c.anchor - interval '100 days' + sc.j * interval '1 minute') AS id,
       c.anchor - interval '100 days' + sc.j * interval '1 minute' AS started_at
FROM perf_seed.school sc CROSS JOIN perf_seed.cfg c;
ANALYZE perf_seed.school_sub; ANALYZE perf_seed.price;
INSERT INTO "Subscription" (id, "planId", "planPriceId", "schoolId", "payerUserId", status, source, seats, "startedAt",
                            "currentPeriodStart", "currentPeriodEnd", "autoRenew", provider, "createdById", "createdAt", "updatedAt")
SELECT ss.id, (SELECT id FROM "Plan" WHERE code = 'SCHOOL'), (SELECT id FROM perf_seed.price WHERE key = 'SCHOOL_TERM'), ss.school_id,
       (SELECT id FROM perf_seed.u WHERE u = 300000 + ss.j), 'ACTIVE', 'SCHOOL_CONTRACT', 400, ss.started_at,
       ss.started_at + interval '91 days', ss.started_at + interval '182 days',
       true, 'paynow', (SELECT id FROM perf_seed.staff WHERE k = 2), ss.started_at, ss.started_at + interval '91 days'
FROM perf_seed.school_sub ss;

INSERT INTO "EntitlementGrant" (id, "userId", source, "planId", "subscriptionId", "startsAt", "createdAt", "updatedAt")
SELECT perf_seed.uid(greatest(st.created_at, ss.started_at)), st.id, 'SCHOOL_SEAT', (SELECT id FROM "Plan" WHERE code = 'SCHOOL'), ss.id,
       greatest(st.created_at, ss.started_at), greatest(st.created_at, ss.started_at), greatest(st.created_at, ss.started_at)
FROM perf_seed.stu st JOIN perf_seed.school_sub ss ON ss.j = st.j;

-- Individual subscriptions: 60% of the 4,000 students outside schools (STUDENT plan) plus 400 school students (PREMIUM).
CREATE TABLE perf_seed.isub AS
SELECT row_number() OVER (ORDER BY st.s)::int AS i, st.s, st.id AS holder_id,
       coalesce((SELECT l.parent_id FROM perf_seed.link l WHERE l.s = st.s ORDER BY l.p LIMIT 1), st.id) AS payer_id,
       CASE WHEN st.j IS NOT NULL THEN 'PREMIUM_MONTH' WHEN perf_seed.r(st.s, 130) < 0.7 THEN 'STUDENT_MONTH' ELSE 'STUDENT_TERM' END AS price_key,
       CASE WHEN perf_seed.r(st.s, 131) < 0.6 THEN 'ACTIVE' WHEN perf_seed.r(st.s, 131) < 0.9 THEN 'EXPIRED' ELSE 'CANCELLED' END AS status,
       least(c.anchor - interval '1 day',
             greatest(st.created_at + interval '1 day', c.anchor - interval '120 days') + perf_seed.r(st.s, 132) * interval '30 days') AS started_at
FROM perf_seed.stu st CROSS JOIN perf_seed.cfg c
WHERE (st.j IS NULL AND perf_seed.r(st.s, 133) < 0.6) OR (st.j IS NOT NULL AND st.s % 40 = 0);
ALTER TABLE perf_seed.isub ADD COLUMN id uuid, ADD COLUMN periods int, ADD COLUMN period_days int;
UPDATE perf_seed.isub SET id = perf_seed.uid(started_at), period_days = CASE WHEN price_key = 'STUDENT_TERM' THEN 91 ELSE 30 END;
-- A subscription still in its first period cannot have ended yet.
UPDATE perf_seed.isub i SET status = 'ACTIVE' FROM perf_seed.cfg c
WHERE i.status <> 'ACTIVE' AND i.started_at > c.anchor - i.period_days * interval '1 day';
-- Paid periods so far; EXPIRED / CANCELLED subscriptions ended before the anchor.
UPDATE perf_seed.isub i SET periods = CASE WHEN i.status = 'ACTIVE'
                                           THEN 1 + floor(extract(epoch FROM c.anchor - i.started_at) / (i.period_days * 86400))::int
                                           ELSE greatest(1, floor(extract(epoch FROM c.anchor - i.started_at) / (i.period_days * 86400))::int) END
FROM perf_seed.cfg c;
ANALYZE perf_seed.isub;

INSERT INTO "Subscription" (id, "planId", "planPriceId", "holderUserId", "payerUserId", status, source, "startedAt", "currentPeriodStart",
                            "currentPeriodEnd", "cancelledAt", "endedAt", "autoRenew", provider, "createdAt", "updatedAt")
SELECT i.id, pl.id, pr.id, i.holder_id, i.payer_id, i.status::"SubscriptionStatus", 'CHECKOUT', i.started_at,
       i.started_at + (i.periods - 1) * i.period_days * interval '1 day', i.started_at + i.periods * i.period_days * interval '1 day',
       CASE WHEN i.status = 'CANCELLED' THEN i.started_at + (i.periods * i.period_days - 3) * interval '1 day' END,
       CASE WHEN i.status IN ('CANCELLED', 'EXPIRED') THEN i.started_at + i.periods * i.period_days * interval '1 day' END,
       false, CASE WHEN i.i % 10 < 7 THEN 'paynow' ELSE 'stripe' END, i.started_at,
       i.started_at + (i.periods - 1) * i.period_days * interval '1 day'
FROM perf_seed.isub i JOIN perf_seed.price pr ON pr.key = i.price_key JOIN "Plan" pl ON pl.code = pr.plan_code;

-- Payments: one SUCCESSFUL (2% later REFUNDED) payment per paid period, plus failed / cancelled / pending attempts.
CREATE TABLE perf_seed.pay AS
SELECT row_number() OVER (ORDER BY x.sub_id, x.period, x.variant)::int AS i, x.*
FROM (
  SELECT i.id AS sub_id, i.holder_id, i.payer_id, pr.id AS price_id, pr.amount, g.period, 0 AS variant,
         i.started_at + g.period * i.period_days * interval '1 day' - interval '10 minutes' AS created_at,
         i.started_at + g.period * i.period_days * interval '1 day' AS period_start, i.period_days,
         CASE WHEN perf_seed.r(i.i * 100 + g.period, 140) < 0.02 THEN 'REFUNDED' ELSE 'SUCCESSFUL' END AS status
  FROM perf_seed.isub i JOIN perf_seed.price pr ON pr.key = i.price_key
  CROSS JOIN LATERAL generate_series(0, i.periods - 1) AS g(period)
  UNION ALL
  SELECT i.id, i.holder_id, i.payer_id, pr.id, pr.amount, g.period, 1,
         i.started_at + g.period * i.period_days * interval '1 day' - interval '40 minutes', NULL, i.period_days,
         CASE WHEN perf_seed.r(i.i * 100 + g.period, 141) < 0.55 THEN 'FAILED'
              WHEN perf_seed.r(i.i * 100 + g.period, 141) < 0.85 THEN 'CANCELLED' ELSE 'PENDING' END
  FROM perf_seed.isub i JOIN perf_seed.price pr ON pr.key = i.price_key
  CROSS JOIN LATERAL generate_series(0, i.periods - 1) AS g(period)
  WHERE perf_seed.r(i.i * 100 + g.period, 142) < 0.3
) x;
INSERT INTO "Payment" (id, purpose, status, provider, method, "providerReference", "payerUserId", "beneficiaryUserId", "subscriptionId",
                       "planPriceId", "amountMinor", currency, "listAmountMinor", "discountMinor", "idempotencyKey", "receiptNumber",
                       "servicePeriodStart", "servicePeriodEnd", "expiresAt", "paidAt", "failedAt", "cancelledAt", "fulfilledAt",
                       "failureCode", "failureReason", "refundedAmountMinor", "refundedAt", "refundReason", "refundedById",
                       "createdAt", "updatedAt")
SELECT perf_seed.uid(p.created_at), 'SUBSCRIPTION', p.status::"PaymentStatus",
       CASE WHEN p.i % 10 < 7 THEN 'paynow' ELSE 'stripe' END,
       CASE WHEN p.i % 10 < 7 THEN (ARRAY['ecocash','onemoney','innbucks'])[1 + p.i % 3] ELSE 'card' END,
       'perf-' || p.i, p.payer_id, p.holder_id, p.sub_id, p.price_id, p.amount, 'USD', p.amount, 0, 'perf-pay-' || p.i,
       CASE WHEN p.status IN ('SUCCESSFUL', 'REFUNDED') THEN 'R-PERF-' || lpad(p.i::text, 7, '0') END,
       CASE WHEN p.status IN ('SUCCESSFUL', 'REFUNDED') THEN p.period_start END,
       CASE WHEN p.status IN ('SUCCESSFUL', 'REFUNDED') THEN p.period_start + p.period_days * interval '1 day' END,
       p.created_at + interval '30 minutes',
       CASE WHEN p.status IN ('SUCCESSFUL', 'REFUNDED') THEN p.created_at + interval '2 minutes' END,
       CASE WHEN p.status = 'FAILED' THEN p.created_at + interval '3 minutes' END,
       CASE WHEN p.status = 'CANCELLED' THEN p.created_at + interval '30 minutes' END,
       CASE WHEN p.status IN ('SUCCESSFUL', 'REFUNDED') THEN p.created_at + interval '2 minutes' END,
       CASE WHEN p.status = 'FAILED' THEN 'INSUFFICIENT_FUNDS' END, CASE WHEN p.status = 'FAILED' THEN 'Insufficient funds' END,
       CASE WHEN p.status = 'REFUNDED' THEN p.amount ELSE 0 END,
       CASE WHEN p.status = 'REFUNDED' THEN p.created_at + interval '2 days' END,
       CASE WHEN p.status = 'REFUNDED' THEN 'Duplicate payment' END,
       CASE WHEN p.status = 'REFUNDED' THEN (SELECT id FROM perf_seed.staff WHERE k = 2) END,
       p.created_at, p.created_at + interval '3 minutes'
FROM perf_seed.pay p;

INSERT INTO "Payment" (id, purpose, status, provider, method, "providerReference", "payerUserId", "schoolId", "subscriptionId",
                       "planPriceId", "amountMinor", currency, quantity, "idempotencyKey", "receiptNumber", "servicePeriodStart",
                       "servicePeriodEnd", "paidAt", "fulfilledAt", "createdAt", "updatedAt")
SELECT perf_seed.uid(ss.started_at + g.t * interval '91 days'), 'SEATS', 'SUCCESSFUL', 'paynow', 'bank_transfer',
       'perf-seat-' || ss.j || '-' || g.t, (SELECT id FROM perf_seed.u WHERE u = 300000 + ss.j), ss.school_id, ss.id,
       (SELECT id FROM perf_seed.price WHERE key = 'SCHOOL_TERM'), 250 * 400, 'USD', 400, 'perf-seat-' || ss.j || '-' || g.t,
       'R-PERF-S' || lpad((ss.j * 10 + g.t)::text, 5, '0'), ss.started_at + g.t * interval '91 days',
       ss.started_at + (g.t + 1) * interval '91 days', ss.started_at + g.t * interval '91 days',
       ss.started_at + g.t * interval '91 days', ss.started_at + g.t * interval '91 days', ss.started_at + g.t * interval '91 days'
FROM perf_seed.school_sub ss CROSS JOIN generate_series(0, 1) AS g(t);

-- =====================================================================================================================
\echo [perf] 5. activity: ~100k assessment attempts and ~1.1M answers over 90 days
-- =====================================================================================================================

-- Question pools per (subject, TOPIC root) and per subject (root 0), as positions 1..cnt.
CREATE TABLE perf_seed.pool AS
SELECT q.n, q.r AS root, row_number() OVER (PARTITION BY q.n, q.r ORDER BY q.k)::int AS idx, q.k
FROM perf_seed.q q WHERE q.final_status = 'PUBLISHED'
UNION ALL
SELECT q.n, 0, row_number() OVER (PARTITION BY q.n ORDER BY perf_seed.r(q.k, 60))::int, q.k
FROM perf_seed.q q WHERE q.final_status = 'PUBLISHED';
CREATE UNIQUE INDEX ON perf_seed.pool (n, root, idx);
CREATE TABLE perf_seed.pool_n AS SELECT n, root, count(*)::int AS cnt FROM perf_seed.pool GROUP BY n, root;
CREATE UNIQUE INDEX ON perf_seed.pool_n (n, root);
ANALYZE perf_seed.pool; ANALYZE perf_seed.pool_n;

CREATE TABLE perf_seed.qf AS
SELECT q.k, q.id, q.n, q.qtype, q.difficulty, q.marks, q.correct_key, q.tf_correct, t.id AS topic_id
FROM perf_seed.q q JOIN perf_seed.topic t ON t.n = q.n AND t.r = q.r AND t.l = q.l
WHERE q.final_status = 'PUBLISHED';
CREATE UNIQUE INDEX ON perf_seed.qf (k);
ANALYZE perf_seed.qf;

-- Attempt plan. Closed practice sessions (5-15 questions, 70% focused on one TOPIC), 15% of active students sit 1-3
-- mocks, ~2% have an open practice session and ~0.4% an exam in progress right now.
CREATE UNLOGGED TABLE perf_seed.att_plan AS
SELECT st.s, g.a AS seq, 'PRACTICE' AS mode, false AS is_open FROM perf_seed.stu st
CROSS JOIN LATERAL generate_series(1, st.sessions) AS g(a) WHERE st.active
UNION ALL
SELECT st.s, 500 + g.a, 'MOCK_EXAM', false FROM perf_seed.stu st
CROSS JOIN LATERAL generate_series(1, 1 + floor(perf_seed.r(st.s, 222) * 3)::int) AS g(a)
WHERE st.active AND perf_seed.r(st.s, 221) < 0.15
UNION ALL
SELECT st.s, 900, 'PRACTICE', true FROM perf_seed.stu st WHERE st.active AND perf_seed.r(st.s, 230) < 0.02
UNION ALL
SELECT st.s, 950, 'MOCK_EXAM', true FROM perf_seed.stu st WHERE st.active AND perf_seed.r(st.s, 231) < 0.004;
ANALYZE perf_seed.att_plan;

CREATE UNLOGGED TABLE perf_seed.att AS
SELECT y.*,
       CASE WHEN y.mode = 'MOCK_EXAM' THEN 25 WHEN y.status = 'MARKED' THEN y.size ELSE y.answered + 1 END AS presented,
       perf_seed.uid(y.started_at) AS att_id,
       greatest(0.0, least(1.0, extract(epoch FROM y.started_at - c.t0) / (90 * 86400.0))) AS progress
FROM (
  SELECT x.*,
         CASE WHEN x.mode = 'MOCK_EXAM' AND x.status = 'IN_PROGRESS' THEN floor(perf_seed.r(x.key, 211) * 20)::int
              WHEN x.mode = 'MOCK_EXAM' THEN 25
              WHEN x.status = 'MARKED' THEN x.size
              WHEN x.status = 'ABANDONED' THEN x.size / 2
              ELSE least(x.size - 1, 1 + floor(perf_seed.r(x.key, 211) * 5)::int) END AS answered
  FROM (
    SELECT (row_number() OVER (ORDER BY p.s, p.seq))::bigint AS att_no, p.s, p.seq, p.mode, p.is_open,
           (p.s::bigint * 1000 + p.seq) AS key,
           e.n, e.subject_id, e.syllabus_id, st.id AS user_id, st.qi,
           CASE WHEN p.mode = 'MOCK_EXAM' THEN 25 ELSE (ARRAY[5, 10, 10, 15])[1 + floor(perf_seed.r(p.s::bigint * 1000 + p.seq, 205) * 4)::int] END AS size,
           CASE WHEN p.mode = 'MOCK_EXAM' THEN NULL
                WHEN perf_seed.r(p.s::bigint * 1000 + p.seq, 206) < 0.7 THEN 1 + floor(perf_seed.r(p.s::bigint * 1000 + p.seq, 207) * 10)::int
                ELSE 0 END AS root,
           floor(perf_seed.r(p.s::bigint * 1000 + p.seq, 208) * 1000)::int AS start_idx,
           CASE WHEN p.is_open THEN 'IN_PROGRESS'
                WHEN p.mode = 'PRACTICE' AND perf_seed.r(p.s::bigint * 1000 + p.seq, 209) < 0.02 THEN 'ABANDONED'
                ELSE 'MARKED' END AS status,
           CASE WHEN p.is_open AND p.mode = 'MOCK_EXAM' THEN c.anchor - (50 + perf_seed.r(p.s, 232) * 40) * interval '1 minute'
                WHEN p.is_open THEN c.anchor - (15 + perf_seed.r(p.s, 233) * 165) * interval '1 minute'
                ELSE greatest(st.created_at + interval '1 hour', t.started_at - CASE WHEN t.started_at > c.anchor - interval '2 hours' THEN interval '1 day' ELSE interval '0' END)
           END AS started_at,
           (CASE WHEN perf_seed.r(p.s::bigint * 1000 + p.seq, 212) < 0.12 THEN 'API' WHEN perf_seed.r(p.s::bigint * 1000 + p.seq, 212) < 0.15 THEN 'WHATSAPP' ELSE 'WEB' END) AS channel
    FROM perf_seed.att_plan p
    JOIN perf_seed.stu st ON st.s = p.s
    JOIN perf_seed.enr e ON e.s = p.s AND e.rank = 1 + floor(perf_seed.r(p.s::bigint * 1000 + p.seq, 201) * st.nsubj)::int
    CROSS JOIN perf_seed.cfg c
    CROSS JOIN LATERAL (
      SELECT date_trunc('day', st.window_start + perf_seed.r(p.s::bigint * 1000 + p.seq, 202) * (c.anchor - st.window_start - interval '2 hours'))
             + (14 + floor(perf_seed.r(p.s::bigint * 1000 + p.seq, 203) * 8)) * interval '1 hour'
             + perf_seed.r(p.s::bigint * 1000 + p.seq, 204) * interval '59 minutes' AS started_at
    ) t
  ) x
) y CROSS JOIN perf_seed.cfg c;
-- A WhatsApp session is practice only; one open mock per (student, assessment) is guaranteed by construction (seq 950).
UPDATE perf_seed.att SET channel = 'WEB' WHERE mode = 'MOCK_EXAM' AND channel = 'WHATSAPP';
CREATE UNIQUE INDEX ON perf_seed.att (att_no);
ANALYZE perf_seed.att;

-- Answers (one row per presented slot). Exam modes create all 25 slots at start; practice slots appear as presented.
CREATE UNLOGGED TABLE perf_seed.qa AS
SELECT z.*,
       CASE WHEN z.mode = 'MOCK_EXAM' THEN z.started_at
            ELSE z.started_at + (coalesce(sum(z.time_spent) OVER w, 0) - z.time_spent + (z.pos - 1) * 4) * interval '1 second' END AS created_at,
       CASE WHEN z.state = 'ANSWERED'
            THEN z.started_at + (coalesce(sum(z.time_spent) OVER w, 0) + (z.pos - 1) * 4) * interval '1 second' END AS answered_at
FROM (
  SELECT a.att_no, a.att_id, a.mode, a.status AS att_status, a.started_at, p.pos, a.user_id, a.subject_id, a.n,
         qf.id AS question_id, qf.topic_id, qf.qtype, qf.difficulty, qf.marks, qf.correct_key, qf.tf_correct,
         ss.state,
         perf_seed.r(a.att_no * 64 + p.pos, 301) <
           least(0.97, greatest(0.05, st.ability - 0.08 * (qf.difficulty - 3) + 0.10 * a.progress - 0.05)) AS correct,
         CASE WHEN ss.state = 'ANSWERED'
              THEN 15 + floor(perf_seed.r(a.att_no * 64 + p.pos, 303) * (30 + qf.difficulty * 15))::int ELSE 0 END AS time_spent,
         perf_seed.r(a.att_no * 64 + p.pos, 304) < 0.04 AS used_hint
  FROM perf_seed.att a
  JOIN perf_seed.stu st ON st.s = a.s
  CROSS JOIN LATERAL generate_series(1, a.presented) AS p(pos)
  LEFT JOIN perf_seed.pool_n pn ON pn.n = a.n AND pn.root = a.root
  LEFT JOIN perf_seed.pool pl ON pl.n = a.n AND pl.root = a.root AND pl.idx = ((a.start_idx + p.pos - 1) % pn.cnt) + 1
  LEFT JOIN perf_seed.mock_item mi ON a.mode = 'MOCK_EXAM' AND mi.n = a.n AND mi.pos = p.pos
  JOIN perf_seed.qf qf ON qf.k = coalesce(mi.k, pl.k)
  CROSS JOIN LATERAL (
    SELECT CASE WHEN a.mode = 'MOCK_EXAM' AND p.pos > a.answered THEN 'PENDING'
                WHEN a.mode = 'MOCK_EXAM' AND a.status = 'MARKED' AND perf_seed.r(a.att_no * 64 + p.pos, 302) < 0.05 THEN 'UNANSWERED'
                WHEN p.pos <= a.answered THEN 'ANSWERED'
                ELSE 'PENDING' END AS state
  ) ss
) z
WINDOW w AS (PARTITION BY z.att_no ORDER BY z.pos ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW);
-- An unanswered mock slot spent no time; correctness only counts for answered slots.
UPDATE perf_seed.qa SET correct = false WHERE state <> 'ANSWERED';
ANALYZE perf_seed.qa;

-- Per-attempt aggregates.
CREATE UNLOGGED TABLE perf_seed.att_agg AS
SELECT q.att_no,
       count(*) FILTER (WHERE q.state = 'ANSWERED')::int AS answered_cnt,
       count(*) FILTER (WHERE q.state = 'ANSWERED' AND q.correct)::int AS correct_cnt,
       sum(q.marks) FILTER (WHERE q.state <> 'PENDING')::int AS total_marks,
       sum(CASE WHEN q.state = 'ANSWERED' AND q.correct THEN q.marks ELSE 0 END)::int AS awarded,
       sum(q.marks) FILTER (WHERE q.pos <= 15)::int AS p1_max, sum(q.marks) FILTER (WHERE q.pos > 15)::int AS p2_max,
       sum(CASE WHEN q.state = 'ANSWERED' AND q.correct AND q.pos <= 15 THEN q.marks ELSE 0 END)::int AS p1_awarded,
       sum(CASE WHEN q.state = 'ANSWERED' AND q.correct AND q.pos > 15 THEN q.marks ELSE 0 END)::int AS p2_awarded,
       max(q.pos) FILTER (WHERE q.state = 'ANSWERED') AS last_pos,
       max(q.answered_at) AS last_answer,
       sum(q.time_spent)::int AS time_spent
FROM perf_seed.qa q GROUP BY q.att_no;
CREATE UNIQUE INDEX ON perf_seed.att_agg (att_no);
ANALYZE perf_seed.att_agg;

ALTER TABLE perf_seed.att ADD COLUMN submitted_at timestamptz, ADD COLUMN percentage float8, ADD COLUMN grade text,
  ADD COLUMN grade_pass boolean, ADD COLUMN attempt_number int;
UPDATE perf_seed.att a SET submitted_at = CASE WHEN a.status = 'MARKED' THEN coalesce(g.last_answer, a.started_at) + interval '20 seconds' END,
       percentage = CASE WHEN a.status = 'MARKED' AND g.total_marks > 0 THEN round((100.0 * g.awarded / g.total_marks)::numeric, 1)::float8 END
FROM perf_seed.att_agg g WHERE g.att_no = a.att_no;
UPDATE perf_seed.att a SET (grade, grade_pass) = (
  SELECT gb.label, gb."isPass" FROM "GradeBand" gb JOIN perf_seed.qual q ON gb."gradeSchemeId" = q.grade_scheme_id
  WHERE q.qi = a.qi AND gb."minPercent" <= a.percentage ORDER BY gb."minPercent" DESC LIMIT 1)
WHERE a.mode = 'MOCK_EXAM' AND a.status = 'MARKED';
UPDATE perf_seed.att a SET attempt_number = x.rn
FROM (SELECT att_no, row_number() OVER (PARTITION BY s, n ORDER BY started_at)::int AS rn FROM perf_seed.att WHERE mode = 'MOCK_EXAM') x
WHERE x.att_no = a.att_no;

INSERT INTO "AssessmentAttempt" (id, "userId", "subjectId", "assessmentId", "topicId", "startedAt", "deadlineAt", "lastSavedAt",
                                 "submittedAt", "markedAt", "createdAt", "updatedAt", "assessmentRevision", "timeLimitSeconds",
                                 "timeSpentSeconds", "totalMarks", "marksAwarded", mode, status, "submitReason", channel,
                                 "attemptNumber", "questionCount", "answeredCount", "correctCount", "pendingReviewCount",
                                 "lastPosition", percentage, "gradeEstimate", "gradeSchemeId", "gradeIsPass", config)
SELECT a.att_id, a.user_id, a.subject_id, m.id, rt.id, a.started_at,
       CASE WHEN a.mode = 'MOCK_EXAM' THEN a.started_at + interval '2 hours' END,
       coalesce(a.submitted_at, g.last_answer, a.started_at),
       a.submitted_at, a.submitted_at, a.started_at, coalesce(a.submitted_at, g.last_answer, a.started_at),
       CASE WHEN a.mode = 'MOCK_EXAM' THEN 1 END, CASE WHEN a.mode = 'MOCK_EXAM' THEN 7200 END,
       g.time_spent,
       CASE WHEN a.status = 'MARKED' THEN g.total_marks END, CASE WHEN a.status = 'MARKED' THEN g.awarded END,
       a.mode::"AttemptMode", a.status::"AttemptStatus", CASE WHEN a.status = 'MARKED' THEN 'STUDENT'::"AttemptSubmitReason" END,
       a.channel::"ActivityChannel", coalesce(a.attempt_number, 1), a.size, g.answered_cnt, g.correct_cnt, 0, g.last_pos,
       a.percentage, a.grade, CASE WHEN a.grade IS NOT NULL THEN q.grade_scheme_id END, a.grade_pass,
       CASE WHEN a.mode = 'MOCK_EXAM'
            THEN jsonb_build_object('questionCount', 25, 'feedback', 'ON_SUBMIT', 'origin', 'BUILDER', 'seed', 'perf-' || a.att_no, 'answerAnyPolicy', 'BEST')
            WHEN a.root > 0
            THEN jsonb_build_object('questionCount', a.size, 'topicIds', jsonb_build_array(rt.id), 'includeSubtopics', true,
                                    'feedback', 'IMMEDIATE', 'origin', 'BUILDER', 'seed', 'perf-' || a.att_no, 'answerAnyPolicy', 'BEST')
            ELSE jsonb_build_object('questionCount', a.size, 'feedback', 'IMMEDIATE', 'origin', 'BUILDER', 'seed', 'perf-' || a.att_no,
                                    'answerAnyPolicy', 'BEST') END
FROM perf_seed.att a
JOIN perf_seed.att_agg g ON g.att_no = a.att_no
JOIN perf_seed.qual q ON q.qi = a.qi
LEFT JOIN perf_seed.mock m ON a.mode = 'MOCK_EXAM' AND m.n = a.n
LEFT JOIN perf_seed.topic rt ON a.root > 0 AND rt.n = a.n AND rt.r = a.root AND rt.l = 0
ORDER BY a.started_at;

INSERT INTO "AssessmentAttemptSection" ("attemptId", "sectionNumber", title, "maxMarks", "startedAt", "submittedAt", "marksAwarded",
                                        "createdAt", "updatedAt")
SELECT a.att_id, s.p, 'Paper ' || s.p, CASE WHEN s.p = 1 THEN g.p1_max ELSE g.p2_max END, a.started_at, a.submitted_at,
       CASE WHEN a.status = 'MARKED' THEN CASE WHEN s.p = 1 THEN g.p1_awarded ELSE g.p2_awarded END END,
       a.started_at, coalesce(a.submitted_at, a.started_at)
FROM perf_seed.att a JOIN perf_seed.att_agg g ON g.att_no = a.att_no CROSS JOIN generate_series(1, 2) AS s(p)
WHERE a.mode = 'MOCK_EXAM';

INSERT INTO "QuestionAttempt" ("attemptId", "userId", "subjectId", "topicId", "questionId", "createdAt", "answeredAt", "markedAt",
                               "updatedAt", "questionRevision", "responseVersion", "timeSpentSeconds", "markingStatus", position,
                               "sectionNumber", difficulty, "marksAvailable", "marksAwarded", "hintsUsed", "isCorrect", "isCounted",
                               response)
SELECT q.att_id, q.user_id, q.subject_id, q.topic_id, q.question_id, q.created_at, q.answered_at,
       CASE q.state WHEN 'ANSWERED' THEN q.answered_at WHEN 'UNANSWERED' THEN a.submitted_at END,
       coalesce(CASE q.state WHEN 'ANSWERED' THEN q.answered_at WHEN 'UNANSWERED' THEN a.submitted_at END, q.created_at),
       1, CASE WHEN q.state = 'ANSWERED' THEN 1 ELSE 0 END, q.time_spent,
       (CASE q.state WHEN 'ANSWERED' THEN 'AUTO_MARKED' WHEN 'UNANSWERED' THEN 'UNANSWERED' ELSE 'PENDING' END)::"MarkingStatus",
       q.pos, CASE WHEN q.mode = 'MOCK_EXAM' THEN CASE WHEN q.pos <= 15 THEN 1 ELSE 2 END END,
       q.difficulty, q.marks,
       CASE q.state WHEN 'ANSWERED' THEN CASE WHEN q.correct THEN q.marks ELSE 0 END WHEN 'UNANSWERED' THEN 0 END,
       CASE WHEN q.used_hint AND q.state = 'ANSWERED' THEN 1 ELSE 0 END,
       CASE q.state WHEN 'ANSWERED' THEN q.correct WHEN 'UNANSWERED' THEN false END,
       true,
       CASE WHEN q.state <> 'ANSWERED' THEN NULL
            WHEN q.qtype = 'MULTIPLE_CHOICE'
            THEN jsonb_build_object('type', 'MULTIPLE_CHOICE', 'optionKeys',
                   jsonb_build_array(CASE WHEN q.correct THEN q.correct_key ELSE chr(65 + ((ascii(q.correct_key) - 64) % 4)) END))
            ELSE jsonb_build_object('type', 'TRUE_FALSE', 'value', CASE WHEN q.correct THEN q.tf_correct ELSE NOT q.tf_correct END) END
FROM perf_seed.qa q JOIN perf_seed.att a ON a.att_no = q.att_no
ORDER BY q.created_at, q.att_no, q.pos;

-- =====================================================================================================================
\echo [perf] 6. read models derived from the answers: TopicMastery, SubjectProgress, XpEvent, DailyActivity, LearnerStats, QuestionStats
-- =====================================================================================================================

-- Leaf (SUBTOPIC) evidence per student. Score = smoothed marks ratio, so one lucky answer is not "mastered".
CREATE UNLOGGED TABLE perf_seed.leaf AS
SELECT q.user_id, q.topic_id, t.n, t.r, s.subject_id, s.syllabus_id,
       count(*)::int AS attempted, count(*) FILTER (WHERE q.correct)::int AS correct,
       sum(CASE WHEN q.correct THEN q.marks ELSE 0 END)::int AS m_aw, sum(q.marks)::int AS m_av,
       min(q.answered_at) AS first_at, max(q.answered_at) AS last_at,
       (array_agg(q.correct ORDER BY q.answered_at DESC))[1] AS last_correct
FROM perf_seed.qa q JOIN perf_seed.topic t ON t.id = q.topic_id JOIN perf_seed.subj s ON s.n = t.n
WHERE q.state = 'ANSWERED'
GROUP BY q.user_id, q.topic_id, t.n, t.r, s.subject_id, s.syllabus_id;
ALTER TABLE perf_seed.leaf ADD COLUMN score float8;
UPDATE perf_seed.leaf SET score = round((100.0 * (m_aw + 0.5) / (m_av + 1.0))::numeric, 1)::float8;
CREATE INDEX ON perf_seed.leaf (user_id, subject_id);
ANALYZE perf_seed.leaf;

INSERT INTO "TopicMastery" ("userId", "topicId", "subjectId", "syllabusId", "firstPracticedAt", "lastPracticedAt", "nextReviewAt",
                            "remediationStartedAt", "createdAt", "updatedAt", score, "recentAccuracy", "questionsAttempted",
                            "questionsCorrect", "marksAwarded", "marksAvailable", band, "topicKind", "topicDepth", "currentDifficulty",
                            "consecutiveCorrect", "consecutiveIncorrect", "isLeaf")
SELECT l.user_id, l.topic_id, l.subject_id, l.syllabus_id, l.first_at, l.last_at,
       l.last_at + CASE perf_seed.band(l.score) WHEN 'WEAK' THEN interval '1 day' WHEN 'DEVELOPING' THEN interval '2 days'
                                               WHEN 'COMPETENT' THEN interval '4 days' WHEN 'STRONG' THEN interval '7 days'
                                               ELSE interval '14 days' END,
       CASE WHEN perf_seed.band(l.score) = 'WEAK' AND l.attempted >= 3 THEN l.last_at END,
       l.first_at, l.last_at, l.score, round(l.correct::numeric / l.attempted, 3)::float8, l.attempted, l.correct, l.m_aw, l.m_av,
       perf_seed.band(l.score), 'SUBTOPIC', 1, least(5, 1 + floor(l.score / 25))::int,
       CASE WHEN l.last_correct THEN 1 ELSE 0 END, CASE WHEN l.last_correct THEN 0 ELSE 1 END, true
FROM perf_seed.leaf l
ORDER BY l.first_at;

-- Ancestor (TOPIC) rows: evidence-weighted mean of the leaves (progress.rollupSubject shape).
INSERT INTO "TopicMastery" ("userId", "topicId", "subjectId", "syllabusId", "firstPracticedAt", "lastPracticedAt", "createdAt", "updatedAt",
                            score, "recentAccuracy", "questionsAttempted", "questionsCorrect", "marksAwarded", "marksAvailable", band,
                            "topicKind", "topicDepth", "currentDifficulty", "isLeaf")
SELECT x.user_id, rt.id, x.subject_id, x.syllabus_id, x.first_at, x.last_at, x.first_at, x.last_at, x.score, x.acc, x.attempted, x.correct,
       x.m_aw, x.m_av, perf_seed.band(x.score), 'TOPIC', 0, least(5, 1 + floor(x.score / 25))::int, false
FROM (
  SELECT l.user_id, l.n, l.r, l.subject_id, l.syllabus_id, min(l.first_at) AS first_at, max(l.last_at) AS last_at,
         round((sum(l.score * l.attempted) / sum(l.attempted))::numeric, 1)::float8 AS score,
         round(sum(l.correct)::numeric / sum(l.attempted), 3)::float8 AS acc,
         sum(l.attempted)::int AS attempted, sum(l.correct)::int AS correct, sum(l.m_aw)::int AS m_aw, sum(l.m_av)::int AS m_av
  FROM perf_seed.leaf l GROUP BY l.user_id, l.n, l.r, l.subject_id, l.syllabus_id
) x JOIN perf_seed.topic rt ON rt.n = x.n AND rt.r = x.r AND rt.l = 0
ORDER BY x.first_at;

-- Per (student, subject) assessment facts.
CREATE UNLOGGED TABLE perf_seed.subj_att AS
SELECT a.user_id, a.subject_id, a.qi,
       count(*) FILTER (WHERE a.status = 'MARKED')::int AS assessments,
       count(*) FILTER (WHERE a.status = 'MARKED' AND a.mode = 'MOCK_EXAM')::int AS mocks,
       avg(a.percentage) FILTER (WHERE a.status = 'MARKED') AS avg_pct,
       (array_agg(a.percentage ORDER BY a.submitted_at DESC) FILTER (WHERE a.status = 'MARKED' AND a.mode = 'MOCK_EXAM'))[1] AS last_mock,
       max(a.percentage) FILTER (WHERE a.status = 'MARKED' AND a.mode = 'MOCK_EXAM') AS best_mock,
       avg(a.percentage) FILTER (WHERE a.status = 'MARKED' AND a.mode = 'MOCK_EXAM') AS avg_mock,
       max(a.submitted_at) FILTER (WHERE a.status = 'MARKED' AND a.mode = 'MOCK_EXAM') AS last_mock_at,
       sum(g.time_spent)::int AS study_secs, max(g.last_answer) AS last_at
FROM perf_seed.att a JOIN perf_seed.att_agg g ON g.att_no = a.att_no
GROUP BY a.user_id, a.subject_id, a.qi;
CREATE UNIQUE INDEX ON perf_seed.subj_att (user_id, subject_id);
ANALYZE perf_seed.subj_att;

INSERT INTO "SubjectProgress" ("userId", "subjectId", "lastActivityAt", "lastMockAt", "computedAt", "createdAt", "updatedAt",
                               "progressPercent", "syllabusCoveragePercent", "averageScorePercent", "lastMockPercent", "bestMockPercent",
                               "averageMockPercent", "readinessPercent", "topicsTotal", "topicsStarted", "topicsCompleted", "topicsMastered",
                               "weakTopicsCount", "questionsAttempted", "questionsCorrect", "marksAwarded", "marksAvailable",
                               "assessmentsCompleted", "mockExamsCompleted", "studySeconds", "predictedGrade", "predictedPass",
                               recommendations)
SELECT e.user_id, e.subject_id, sa.last_at, sa.last_mock_at,
       coalesce(sa.last_at, e.created_at) + interval '30 seconds', e.created_at, coalesce(sa.last_at, e.created_at) + interval '30 seconds',
       coalesce(round((lf.score_sum / 50.0)::numeric, 1)::float8, 0),
       round((100.0 * coalesce(lf.started, 0) / 50)::numeric, 1)::float8,
       round(sa.avg_pct::numeric, 1)::float8, sa.last_mock, sa.best_mock, round(sa.avg_mock::numeric, 1)::float8,
       CASE WHEN sa.mocks > 0 THEN round((0.6 * sa.avg_mock + 0.4 * coalesce(lf.score_sum / 50.0, 0))::numeric, 1)::float8 END,
       50, coalesce(lf.started, 0), coalesce(lf.completed, 0), coalesce(lf.mastered, 0), coalesce(lf.weak, 0),
       coalesce(lf.attempted, 0), coalesce(lf.correct, 0), coalesce(lf.m_aw, 0), coalesce(lf.m_av, 0),
       coalesce(sa.assessments, 0), coalesce(sa.mocks, 0), coalesce(sa.study_secs, 0),
       pg.label, pg."isPass",
       rec.recs
FROM perf_seed.enr e
LEFT JOIN perf_seed.subj_att sa ON sa.user_id = e.user_id AND sa.subject_id = e.subject_id
LEFT JOIN (
  SELECT l.user_id, l.subject_id, sum(l.score) AS score_sum, count(*)::int AS started,
         count(*) FILTER (WHERE l.score >= 60)::int AS completed, count(*) FILTER (WHERE l.score >= 90)::int AS mastered,
         count(*) FILTER (WHERE l.score < 60)::int AS weak,
         sum(l.attempted)::int AS attempted, sum(l.correct)::int AS correct, sum(l.m_aw)::int AS m_aw, sum(l.m_av)::int AS m_av
  FROM perf_seed.leaf l GROUP BY l.user_id, l.subject_id
) lf ON lf.user_id = e.user_id AND lf.subject_id = e.subject_id
LEFT JOIN LATERAL (
  SELECT gb.label, gb."isPass" FROM "GradeBand" gb JOIN perf_seed.subj s ON s.subject_id = e.subject_id
  WHERE gb."gradeSchemeId" = s.grade_scheme_id AND sa.assessments >= 3 AND gb."minPercent" <= coalesce(sa.avg_mock, sa.avg_pct)
  ORDER BY gb."minPercent" DESC LIMIT 1
) pg ON true
LEFT JOIN LATERAL (
  SELECT jsonb_agg(jsonb_build_object('kind', 'PRACTICE', 'topicId', w.topic_id, 'questionCount', 10,
                                      'reason', 'Your scores in this topic are below 60%.') ORDER BY w.score) AS recs
  FROM (SELECT l.topic_id, l.score FROM perf_seed.leaf l WHERE l.user_id = e.user_id AND l.subject_id = e.subject_id AND l.score < 60
        ORDER BY l.score LIMIT 2) w
) rec ON true;

-- XP: one event per marked attempt; DAILY_GOAL_MET per day with >= 30 minutes of answering.
CREATE UNLOGGED TABLE perf_seed.day AS
SELECT coalesce(x.user_id, y.user_id) AS user_id, coalesce(x.d, y.d) AS d, coalesce(x.qa, 0) AS qa, coalesce(x.qc, 0) AS qc,
       coalesce(x.secs, 0) AS secs, coalesce(y.done, 0) AS done,
       least(x.first_at, y.first_at) AS first_at, greatest(x.last_at, y.last_at) AS last_at
FROM (
  SELECT q.user_id, (q.answered_at AT TIME ZONE 'Africa/Harare')::date AS d, count(*)::int AS qa,
         count(*) FILTER (WHERE q.correct)::int AS qc, sum(q.time_spent)::int AS secs, min(q.answered_at) AS first_at,
         max(q.answered_at) AS last_at
  FROM perf_seed.qa q WHERE q.state = 'ANSWERED' GROUP BY 1, 2
) x
FULL JOIN (
  SELECT a.user_id, (a.submitted_at AT TIME ZONE 'Africa/Harare')::date AS d, count(*)::int AS done, min(a.submitted_at) AS first_at,
         max(a.submitted_at) AS last_at
  FROM perf_seed.att a WHERE a.status = 'MARKED' GROUP BY 1, 2
) y ON y.user_id = x.user_id AND y.d = x.d;
CREATE UNIQUE INDEX ON perf_seed.day (user_id, d);
ANALYZE perf_seed.day;

CREATE UNLOGGED TABLE perf_seed.xp AS
SELECT a.user_id, a.submitted_at AS occurred_at, (a.submitted_at AT TIME ZONE 'Africa/Harare')::date AS local_date,
       CASE WHEN a.mode = 'MOCK_EXAM' THEN 25 + 2 * g.correct_cnt ELSE 5 + 2 * g.correct_cnt END AS amount,
       CASE WHEN a.mode = 'MOCK_EXAM' THEN 'MOCK_EXAM_COMPLETED' ELSE 'PRACTICE_COMPLETED' END AS reason,
       'ASSESSMENT_ATTEMPT' AS source_type, a.att_id::text AS source_id
FROM perf_seed.att a JOIN perf_seed.att_agg g ON g.att_no = a.att_no WHERE a.status = 'MARKED'
UNION ALL
SELECT d.user_id, d.last_at, d.d, 15, 'DAILY_GOAL_MET', 'DAILY_ACTIVITY', d.d::text
FROM perf_seed.day d WHERE d.secs >= 1800;
ANALYZE perf_seed.xp;

INSERT INTO "XpEvent" (id, "userId", "occurredAt", "localDate", "createdAt", amount, reason, "sourceType", "sourceId")
SELECT perf_seed.uid(x.occurred_at), x.user_id, x.occurred_at, x.local_date, x.occurred_at, x.amount, x.reason::"XpReason",
       x.source_type::"XpSourceType", x.source_id
FROM perf_seed.xp x ORDER BY x.occurred_at;

INSERT INTO "DailyActivity" ("userId", date, "firstActivityAt", "lastActivityAt", "createdAt", "updatedAt", "studySeconds",
                             "questionsAttempted", "questionsCorrect", "xpEarned", "assessmentsCompleted", "targetMinutes",
                             "dailyGoalMet", "streakCredited")
SELECT d.user_id, d.d, d.first_at, d.last_at, d.first_at, d.last_at, least(90000, d.secs), d.qa, d.qc,
       coalesce(xd.amount, 0)::int,
       least(d.done, 32767), 30, d.secs >= 1800, true
FROM perf_seed.day d
LEFT JOIN (SELECT user_id, local_date, sum(amount) AS amount FROM perf_seed.xp GROUP BY 1, 2) xd ON xd.user_id = d.user_id AND xd.local_date = d.d
ORDER BY d.d, d.user_id;

-- Streak islands (consecutive local dates).
CREATE UNLOGGED TABLE perf_seed.island AS
SELECT user_id, min(d) AS start_d, max(d) AS end_d, count(*)::int AS len
FROM (SELECT user_id, d, d - (row_number() OVER (PARTITION BY user_id ORDER BY d))::int AS grp FROM perf_seed.day) x
GROUP BY user_id, grp;
ANALYZE perf_seed.island;

INSERT INTO "LearnerStats" ("userId", "lastStreakDate", "streakStartDate", "firstActiveDate", "lastActiveDate", "weekStartDate",
                            "lastActivityAt", "createdAt", "updatedAt", "totalXp", "currentStreak", "longestStreak", "weekStudySeconds",
                            "weekXp", "weekQuestions", "totalQuestionsAttempted", "totalQuestionsCorrect", "totalStudySeconds",
                            "assessmentsCompleted", "mockExamsCompleted", "topicsMastered", "streakFreezesAvailable", "dailyGoalMinutes")
SELECT st.id, ds.last_d, cur.start_d, ds.first_d, ds.last_d, date_trunc('week', c.today)::date, ds.last_at, st.created_at,
       coalesce(ds.last_at, st.created_at),
       coalesce(xs.total, 0), coalesce(cur.len, 0), coalesce(lng.len, 0), coalesce(wk.secs, 0), coalesce(xs.week, 0), coalesce(wk.qa, 0),
       coalesce(ds.qa, 0), coalesce(ds.qc, 0), coalesce(ds.secs, 0), coalesce(sa.assessments, 0), coalesce(sa.mocks, 0),
       coalesce(tm.mastered, 0), (st.s % 3)::smallint, CASE WHEN st.s % 2 = 0 THEN 30 END
FROM perf_seed.stu st
CROSS JOIN perf_seed.cfg c
LEFT JOIN (SELECT user_id, min(d) AS first_d, max(d) AS last_d, max(last_at) AS last_at, sum(qa)::int AS qa, sum(qc)::int AS qc,
                  sum(least(secs, 90000))::int AS secs FROM perf_seed.day GROUP BY user_id) ds ON ds.user_id = st.id
LEFT JOIN (SELECT user_id, sum(secs)::int AS secs, sum(qa)::int AS qa FROM perf_seed.day, perf_seed.cfg cc
           WHERE d >= date_trunc('week', cc.today)::date GROUP BY user_id) wk ON wk.user_id = st.id
LEFT JOIN (SELECT user_id, sum(amount)::int AS total,
                  (sum(amount) FILTER (WHERE local_date >= date_trunc('week', (SELECT today FROM perf_seed.cfg))::date))::int AS week
           FROM perf_seed.xp GROUP BY user_id) xs ON xs.user_id = st.id
LEFT JOIN perf_seed.island cur ON cur.user_id = st.id AND cur.end_d >= c.today - 1
LEFT JOIN (SELECT user_id, max(len) AS len FROM perf_seed.island GROUP BY user_id) lng ON lng.user_id = st.id
LEFT JOIN (SELECT user_id, sum(assessments)::int AS assessments, sum(mocks)::int AS mocks FROM perf_seed.subj_att GROUP BY user_id) sa
       ON sa.user_id = st.id
LEFT JOIN (SELECT user_id, count(*)::int AS mastered FROM perf_seed.leaf WHERE score >= 90 GROUP BY user_id) tm ON tm.user_id = st.id;

-- Question calibration stats (questions.statsRollup shape).
INSERT INTO "QuestionStats" ("questionId", "lastAnsweredAt", "computedAt", "updatedAt", facility, "correctRate", "calibratedFacility",
                             "avgTimeSeconds", "empiricalDifficulty", "presentedCount", "answeredCount", "correctCount",
                             "unansweredCount", "calibrationCount", "calibrationCorrectCount", "hintsUsedSum", "marksAwardedSum",
                             "marksAvailableSum", "timeSpentSecondsSum")
SELECT x.question_id, x.last_at, c.anchor - interval '30 minutes', c.anchor - interval '30 minutes',
       x.correct::float8 / nullif(x.answered, 0), x.correct::float8 / nullif(x.answered, 0),
       (x.correct + 2)::float8 / (x.answered + 4), x.secs::float8 / nullif(x.answered, 0),
       CASE WHEN x.answered > 0 THEN 1 + 4 * (1 - x.correct::float8 / x.answered) END,
       x.presented, x.answered, x.correct, x.unanswered, x.answered, x.correct, x.hints, x.m_aw, x.m_av, x.secs
FROM (
  SELECT q.question_id, max(q.answered_at) AS last_at, count(*)::int AS presented,
         count(*) FILTER (WHERE q.state = 'ANSWERED')::int AS answered,
         count(*) FILTER (WHERE q.state = 'ANSWERED' AND q.correct)::int AS correct,
         count(*) FILTER (WHERE q.state = 'UNANSWERED')::int AS unanswered,
         count(*) FILTER (WHERE q.state = 'ANSWERED' AND q.used_hint)::int AS hints,
         sum(CASE WHEN q.state = 'ANSWERED' AND q.correct THEN q.marks ELSE 0 END)::bigint AS m_aw,
         sum(CASE WHEN q.state IN ('ANSWERED', 'UNANSWERED') THEN q.marks ELSE 0 END)::bigint AS m_av,
         sum(q.time_spent)::bigint AS secs
  FROM perf_seed.qa q GROUP BY q.question_id
) x CROSS JOIN perf_seed.cfg c;

-- =====================================================================================================================
\echo [perf] 7. flashcard scheduling, leaderboard snapshots, AI usage, search documents, job history
-- =====================================================================================================================

-- FlashcardState: every 4th student studies 20 cards in each of their first two subjects (~50k states).
INSERT INTO "FlashcardState" ("userId", "flashcardId", "subjectId", "dueAt", "lastReviewedAt", "createdAt", "updatedAt", "easeFactor",
                              "intervalDays", repetitions, lapses, "reviewCount", state, "lastRating", "learningStep")
SELECT y.user_id, y.card_id, y.subject_id,
       CASE WHEN y.state = 'NEW' THEN y.created_at + interval '1 day'
            WHEN y.state = 'REVIEW' THEN y.last_rev + y.interval_days * interval '1 day'
            ELSE y.last_rev + interval '10 minutes' END,
       y.last_rev, y.created_at, coalesce(y.last_rev, y.created_at),
       round((1.3 + perf_seed.r(y.key, 504) * 1.5)::numeric, 2)::float8, y.interval_days,
       CASE WHEN y.state = 'REVIEW' THEN 1 + floor(perf_seed.r(y.key, 505) * 6)::int ELSE 0 END,
       CASE WHEN y.state IN ('REVIEW', 'RELEARNING') THEN floor(perf_seed.r(y.key, 506) * 3)::int ELSE 0 END,
       y.reviews, y.state::"FlashcardSrsState",
       CASE WHEN y.state <> 'NEW' THEN (ARRAY['AGAIN','HARD','GOOD','EASY'])[1 + floor(perf_seed.r(y.key, 507) * 4)::int]::"FlashcardRating" END,
       CASE WHEN y.state IN ('LEARNING', 'RELEARNING') THEN 1 ELSE 0 END
FROM (
  SELECT x.*,
         CASE WHEN x.state = 'NEW' THEN 0 ELSE 1 + floor(perf_seed.r(x.key, 502) * 12)::int END AS reviews,
         CASE WHEN x.state = 'NEW' THEN NULL
              ELSE greatest(x.created_at + interval '1 hour', c.anchor - perf_seed.r(x.key, 503) * interval '40 days') END AS last_rev,
         CASE WHEN x.state = 'REVIEW' THEN 1 + floor(perf_seed.r(x.key, 508) * 30)::int ELSE 0 END AS interval_days
  FROM (
    SELECT e.user_id, e.subject_id, fc.id AS card_id, e.created_at + interval '2 days' AS created_at,
           (e.s::bigint * 1000 + e.rank * 50 + i.i) AS key,
           CASE WHEN perf_seed.r(e.s::bigint * 1000 + e.rank * 50 + i.i, 501) < 0.3 THEN 'NEW'
                WHEN perf_seed.r(e.s::bigint * 1000 + e.rank * 50 + i.i, 501) < 0.4 THEN 'LEARNING'
                WHEN perf_seed.r(e.s::bigint * 1000 + e.rank * 50 + i.i, 501) < 0.45 THEN 'RELEARNING'
                ELSE 'REVIEW' END AS state
    FROM perf_seed.enr e
    CROSS JOIN generate_series(0, 19) AS i(i)
    JOIN perf_seed.fc fc ON fc.n = e.n AND fc.f = 1 + ((e.s + 2 * i.i) % 50)
    WHERE e.s % 4 = 0 AND e.rank <= 2
  ) x CROSS JOIN perf_seed.cfg c
) y;

-- LeaderboardEntry snapshots for opted-in students (gamification.leaderboardSnapshot shape): WEEKLY_XP / WEEKLY_QUESTIONS
-- per ISO week of the window (final ranks on closed weeks), STREAK and SUBJECT_MASTERY "LIVE", MOCK_AVERAGE per month.
CREATE UNLOGGED TABLE perf_seed.lb_user AS
SELECT st.s, st.id AS user_id, sc.id AS school_id
FROM perf_seed.stu st JOIN "Profile" p ON p."userId" = st.id AND p."leaderboardOptIn" LEFT JOIN perf_seed.school sc ON sc.j = st.j;
CREATE UNIQUE INDEX ON perf_seed.lb_user (user_id);
ANALYZE perf_seed.lb_user;

CREATE UNLOGGED TABLE perf_seed.lb_scope AS
SELECT user_id, 'GLOBAL' AS scope_type, NULL::uuid AS scope_id FROM perf_seed.lb_user
UNION ALL SELECT user_id, 'COUNTRY', (SELECT id FROM "Country" WHERE "isoCode" = 'ZW') FROM perf_seed.lb_user
UNION ALL SELECT user_id, 'SCHOOL', school_id FROM perf_seed.lb_user WHERE school_id IS NOT NULL
UNION ALL SELECT u.user_id, 'CLASS', cm."classId" FROM perf_seed.lb_user u JOIN "ClassMember" cm ON cm."userId" = u.user_id AND cm.status = 'ACTIVE';
ANALYZE perf_seed.lb_scope;

CREATE UNLOGGED TABLE perf_seed.lb_val AS
SELECT x.user_id, 'WEEKLY_XP' AS metric, to_char(x.local_date, 'IYYY-"W"IW') AS period, sum(x.amount)::float8 AS value
FROM perf_seed.xp x JOIN perf_seed.lb_user u ON u.user_id = x.user_id GROUP BY 1, 3
UNION ALL
SELECT d.user_id, 'WEEKLY_QUESTIONS', to_char(d.d, 'IYYY-"W"IW'), sum(d.qa)::float8
FROM perf_seed.day d JOIN perf_seed.lb_user u ON u.user_id = d.user_id WHERE d.qa > 0 GROUP BY 1, 3
UNION ALL
SELECT ls."userId", 'STREAK', 'LIVE', ls."currentStreak"::float8
FROM "LearnerStats" ls JOIN perf_seed.lb_user u ON u.user_id = ls."userId" WHERE ls."currentStreak" > 0
UNION ALL
SELECT a.user_id, 'MOCK_AVERAGE', to_char(a.submitted_at AT TIME ZONE 'Africa/Harare', 'YYYY-MM'), round(avg(a.percentage)::numeric, 1)::float8
FROM perf_seed.att a JOIN perf_seed.lb_user u ON u.user_id = a.user_id
WHERE a.mode = 'MOCK_EXAM' AND a.status = 'MARKED' GROUP BY 1, 3 HAVING count(*) >= 2;
ANALYZE perf_seed.lb_val;

INSERT INTO "LeaderboardEntry" (id, "scopeId", "userId", "computedAt", value, rank, metric, "scopeType", "periodKey")
SELECT perf_seed.uid(c.anchor - interval '1 hour'), z."scopeId", z."userId", c.anchor - interval '1 hour', z.value, z.rank,
       z.metric::"LeaderboardMetric", z.scope_type::"LeaderboardScope", z.period
FROM (
  SELECT v.user_id AS "userId", s.scope_id AS "scopeId", s.scope_type, v.metric, v.period, v.value,
         CASE WHEN v.metric IN ('WEEKLY_XP', 'WEEKLY_QUESTIONS') AND v.period <> to_char((SELECT today FROM perf_seed.cfg), 'IYYY-"W"IW')
              THEN dense_rank() OVER (PARTITION BY v.metric, v.period, s.scope_type, s.scope_id ORDER BY v.value DESC)::int END AS rank
  FROM perf_seed.lb_val v JOIN perf_seed.lb_scope s ON s.user_id = v.user_id
) z CROSS JOIN perf_seed.cfg c;

-- SUBJECT_MASTERY (LIVE): subject-wide and per class teaching that subject.
INSERT INTO "LeaderboardEntry" (id, "scopeId", "userId", "computedAt", value, metric, "scopeType", "periodKey")
SELECT perf_seed.uid(c.anchor - interval '1 hour'), sp."subjectId", sp."userId", c.anchor - interval '1 hour', sp."progressPercent",
       'SUBJECT_MASTERY'::"LeaderboardMetric", 'SUBJECT'::"LeaderboardScope", 'LIVE'
FROM "SubjectProgress" sp JOIN perf_seed.lb_user u ON u.user_id = sp."userId" CROSS JOIN perf_seed.cfg c
WHERE sp."progressPercent" > 0
UNION ALL
SELECT perf_seed.uid(c.anchor - interval '1 hour'), cm."classId", sp."userId", c.anchor - interval '1 hour', sp."progressPercent",
       'SUBJECT_MASTERY'::"LeaderboardMetric", 'CLASS'::"LeaderboardScope", 'LIVE'
FROM "SubjectProgress" sp JOIN perf_seed.lb_user u ON u.user_id = sp."userId"
JOIN "ClassMember" cm ON cm."userId" = sp."userId" AND cm.status = 'ACTIVE'
JOIN "Class" cl ON cl.id = cm."classId" AND cl."subjectId" = sp."subjectId"
CROSS JOIN perf_seed.cfg c
WHERE sp."progressPercent" > 0;

-- AiUsageDaily: every 7th active student uses the tutor on ~12% of days and the solver on ~4%.
INSERT INTO "AiUsageDaily" (id, "userId", date, feature, requests, "reservedRequests", "cacheHits", "deepRequests", images, "inputTokens",
                            "outputTokens", "cacheReadTokens", "cacheWriteTokens", "costMicros", "createdAt", "updatedAt")
SELECT perf_seed.uid(t.at), st.id, t.d, f.feature::"AiFeature", t.req, 0, floor(t.req * 0.2)::int, 0,
       CASE WHEN f.feature = 'SOLVER' THEN t.req ELSE 0 END, t.req * 1800, t.req * 450, t.req * 900, t.req * 120,
       t.req * CASE WHEN f.feature = 'SOLVER' THEN 9000 ELSE 2500 END, t.at, t.at + interval '2 hours'
FROM perf_seed.stu st
CROSS JOIN generate_series(0, 89) AS g(i)
CROSS JOIN (VALUES ('TUTOR', 0.12, 601), ('SOLVER', 0.04, 602)) AS f(feature, p, stream)
CROSS JOIN perf_seed.cfg c
CROSS JOIN LATERAL (
  SELECT c.today - g.i AS d,
         ((c.today - g.i)::timestamp + interval '17 hours') AT TIME ZONE 'Africa/Harare' AS at,
         1 + floor(perf_seed.r(st.s::bigint * 1000 + g.i, f.stream + 10) * 15)::int AS req
) t
WHERE st.active AND st.s % 7 = 0 AND perf_seed.r(st.s::bigint * 1000 + g.i, f.stream) < f.p
  AND t.at < c.anchor AND t.d >= (st.created_at AT TIME ZONE 'Africa/Harare')::date;

-- Search documents for the published content (search/documents.ts shapes, simplified bodies).
INSERT INTO "SearchDocument" (id, "entityType", "entityId", title, subtitle, body, keywords, path, "languageCode", "accessTier", status,
                              "examBoardIds", "qualificationIds", "levelIds", "subjectIds", "syllabusIds", "topicIds", "rankBoost",
                              "sourceUpdatedAt", "createdAt", "updatedAt")
SELECT perf_seed.uid(now()), 'TOPIC'::"ContentEntityType", t.id, t.name, s.subject_name, 'Synthetic topic for performance testing: ' || t.name || '.',
       '', '/app/subjects/' || s.subject_id || '/topics/' || t.id, 'en', 'PUBLIC'::"ContentAccessTier", 'PUBLISHED'::"ContentStatus",
       ARRAY[s.board_id], ARRAY[s.qual_id], ARRAY[ql."levelId"], ARRAY[s.subject_id], ARRAY[s.syllabus_id],
       CASE WHEN t.parent_id IS NULL THEN ARRAY[t.id] ELSE ARRAY[t.parent_id, t.id] END, CASE WHEN t.l = 0 THEN 2 ELSE 1 END,
       now(), now(), now()
FROM perf_seed.topic t JOIN perf_seed.subj s ON s.n = t.n JOIN "Qualification" ql ON ql.id = s.qual_id
UNION ALL
SELECT perf_seed.uid(now()), 'QUESTION'::"ContentEntityType", qq.id, left(qq.stem, 120), s.subject_name, qq.stem || ' ' || coalesce(qq.explanation, ''), '',
       '/app/practice?questionId=' || qq.id, 'en', qq."accessTier", 'PUBLISHED',
       ARRAY[s.board_id], ARRAY[s.qual_id], ARRAY[ql."levelId"], ARRAY[s.subject_id], ARRAY[s.syllabus_id],
       ARRAY[t.parent_id, t.id], 0, qq."publishedAt", now(), now()
FROM perf_seed.q q JOIN "Question" qq ON qq.id = q.id JOIN perf_seed.subj s ON s.n = q.n JOIN "Qualification" ql ON ql.id = s.qual_id
JOIN perf_seed.topic t ON t.n = q.n AND t.r = q.r AND t.l = q.l
WHERE q.final_status = 'PUBLISHED'
UNION ALL
SELECT perf_seed.uid(now()), 'FLASHCARD'::"ContentEntityType", f.id, f.front, s.subject_name, f.back, '', '/app/flashcards?cardId=' || f.id, 'en',
       f."accessTier", 'PUBLISHED', ARRAY[s.board_id], ARRAY[s.qual_id], ARRAY[ql."levelId"], ARRAY[s.subject_id], ARRAY[s.syllabus_id],
       ARRAY[t.parent_id, t.id], 0, f."publishedAt", now(), now()
FROM perf_seed.fc fc JOIN "Flashcard" f ON f.id = fc.id JOIN perf_seed.subj s ON s.n = fc.n JOIN "Qualification" ql ON ql.id = s.qual_id
JOIN perf_seed.topic t ON t.n = fc.n AND t.r = fc.r AND t.l = fc.l
UNION ALL
SELECT perf_seed.uid(now()), 'ASSESSMENT'::"ContentEntityType", a.id, a.title, s.subject_name, coalesce(a.description, ''), 'mock exam paper',
       '/app/exams/' || a.id, 'en', a."accessTier", 'PUBLISHED', ARRAY[s.board_id], ARRAY[s.qual_id], ARRAY[ql."levelId"],
       ARRAY[s.subject_id], ARRAY[s.syllabus_id], ARRAY[]::uuid[], 1, a."publishedAt", now(), now()
FROM perf_seed.mock m JOIN "Assessment" a ON a.id = m.id JOIN perf_seed.subj s ON s.n = m.n JOIN "Qualification" ql ON ql.id = s.qual_id;

-- Job table: 7 days of finished history (the retention window), a due backlog, scheduled work and a few leases.
INSERT INTO "Job" (id, queue, type, payload, status, priority, "runAt", attempts, "maxAttempts", "lockedAt", "lockedBy", "lastError",
                   "dedupeKey", result, "completedAt", "createdAt", "updatedAt")
SELECT perf_seed.uid(j.run_at), j.queue, j.type, jsonb_build_object('perf', j.i), j.status::"JobStatus", j.priority, j.run_at,
       CASE WHEN j.status = 'PENDING' THEN 0 WHEN j.status IN ('FAILED', 'DEAD') THEN 5 ELSE 1 END, 5,
       CASE WHEN j.status IN ('RUNNING', 'SUCCEEDED', 'FAILED', 'DEAD') THEN j.run_at + interval '1 second' END,
       CASE WHEN j.status IN ('RUNNING', 'SUCCEEDED', 'FAILED', 'DEAD') THEN 'perf-worker-' || (j.i % 4) END,
       CASE WHEN j.status IN ('FAILED', 'DEAD') THEN 'Error: synthetic failure' END,
       CASE WHEN j.status = 'PENDING' AND j.i % 3 = 0 THEN 'perf:' || j.type || ':' || j.i END,
       CASE WHEN j.status = 'SUCCEEDED' THEN '{"ok":true}'::jsonb END,
       CASE WHEN j.status IN ('SUCCEEDED', 'FAILED', 'DEAD', 'CANCELLED') THEN j.run_at + interval '3 seconds' END,
       j.run_at - interval '1 second', j.run_at + interval '3 seconds'
FROM (
  SELECT g.i, k.queue, k.type, k.priority,
         CASE WHEN g.i <= 120000 THEN c.anchor - perf_seed.r(g.i, 701) * interval '7 days'
              WHEN g.i <= 120400 THEN c.anchor - perf_seed.r(g.i, 701) * interval '3 minutes'
              WHEN g.i <= 120700 THEN c.anchor + perf_seed.r(g.i, 701) * interval '1 day'
              ELSE c.anchor - interval '2 minutes' END AS run_at,
         CASE WHEN g.i > 120700 THEN 'RUNNING'
              WHEN g.i > 120000 THEN 'PENDING'
              WHEN perf_seed.r(g.i, 702) < 0.015 THEN 'FAILED'
              WHEN perf_seed.r(g.i, 702) < 0.02 THEN 'DEAD'
              WHEN perf_seed.r(g.i, 702) < 0.03 THEN 'CANCELLED'
              ELSE 'SUCCEEDED' END AS status
  FROM generate_series(1, 120708) AS g(i)
  CROSS JOIN perf_seed.cfg c
  CROSS JOIN LATERAL (
    SELECT * FROM (VALUES
      (0.25, 'rollups', 'progress.rollupSubject', 0), (0.32, 'rollups', 'questions.statsRollup', 0),
      (0.36, 'rollups', 'gamification.leaderboardSnapshot', 0), (0.40, 'rollups', 'analytics.dailyMetrics', 0),
      (0.55, 'default', 'exams.autoSubmit', 0), (0.62, 'default', 'studyplan.adapt', 1),
      (0.80, 'notifications', 'notifications.send', 0), (0.84, 'notifications', 'notifications.digest', 1),
      (0.92, 'search', 'search.index', 2), (0.96, 'payments', 'payments.reconcile', 0), (1.01, 'ai', 'ai.mark', 0)
    ) AS v(upto, queue, type, priority)
    WHERE v.upto > perf_seed.r(g.i, 703) ORDER BY v.upto LIMIT 1
  ) k
) j;

-- =====================================================================================================================
\echo [perf] 8. clean up helpers, refresh statistics
-- =====================================================================================================================
DROP SCHEMA perf_seed CASCADE;
VACUUM (ANALYZE);

SELECT 'User' AS "table", count(*) FROM "User" UNION ALL
SELECT 'SubjectEnrollment', count(*) FROM "SubjectEnrollment" UNION ALL
SELECT 'Question (published)', count(*) FROM "Question" WHERE status = 'PUBLISHED' UNION ALL
SELECT 'AssessmentAttempt', count(*) FROM "AssessmentAttempt" UNION ALL
SELECT 'QuestionAttempt', count(*) FROM "QuestionAttempt" UNION ALL
SELECT 'TopicMastery', count(*) FROM "TopicMastery" UNION ALL
SELECT 'SubjectProgress', count(*) FROM "SubjectProgress" UNION ALL
SELECT 'DailyActivity', count(*) FROM "DailyActivity" UNION ALL
SELECT 'XpEvent', count(*) FROM "XpEvent" UNION ALL
SELECT 'FlashcardState', count(*) FROM "FlashcardState" UNION ALL
SELECT 'LeaderboardEntry', count(*) FROM "LeaderboardEntry" UNION ALL
SELECT 'AiUsageDaily', count(*) FROM "AiUsageDaily" UNION ALL
SELECT 'Payment', count(*) FROM "Payment" UNION ALL
SELECT 'Job', count(*) FROM "Job" UNION ALL
SELECT 'database size (MB)', pg_database_size(current_database()) / 1048576;
