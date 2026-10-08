-- #####################################################################################################################
-- SECTION A. TOP OF THE INITIAL MIGRATION (before any Prisma-generated statement)
-- #####################################################################################################################

-- Purpose: trigram operator classes. Prisma's own DDL needs it for "Question_stem_idx" and "SearchDocument_title_idx"
-- (gin_trgm_ops); raw indexes in section C use it too.
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- Purpose: IMMUTABLE text-search config picker for SearchDocument."searchVector" (section B): english stemming for
-- English rows, 'simple' for Shona/Ndebele/French, which have no Postgres stemmer. Must exist before CREATE TABLE
-- "SearchDocument".
CREATE OR REPLACE FUNCTION search_ts_config(lang text) RETURNS regconfig
  LANGUAGE sql IMMUTABLE PARALLEL SAFE
  AS $$ SELECT CASE WHEN left(lang, 2) = 'en' THEN 'english'::regconfig ELSE 'simple'::regconfig END $$;



-- ===== Prisma-generated DDL (SearchDocument.searchVector edited per SECTION B) =====

-- CreateEnum
CREATE TYPE "ContentStatus" AS ENUM ('DRAFT', 'IN_REVIEW', 'APPROVED', 'PUBLISHED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "QuestionType" AS ENUM ('MULTIPLE_CHOICE', 'TRUE_FALSE', 'SHORT_ANSWER', 'NUMERICAL', 'STRUCTURED', 'ESSAY', 'CALCULATION', 'MATCHING', 'FILL_IN_THE_BLANK', 'DIAGRAM_LABELLING', 'EXTENDED_RESPONSE');

-- CreateEnum
CREATE TYPE "MarkingMode" AS ENUM ('AUTO', 'AI_ASSISTED', 'MANUAL');

-- CreateEnum
CREATE TYPE "CatalogueStatus" AS ENUM ('HIDDEN', 'COMING_SOON', 'AVAILABLE', 'RETIRED');

-- CreateEnum
CREATE TYPE "SyllabusStatus" AS ENUM ('DRAFT', 'UPCOMING', 'CURRENT', 'SUPERSEDED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "TopicKind" AS ENUM ('SECTION', 'TOPIC', 'SUBTOPIC');

-- CreateEnum
CREATE TYPE "SyllabusComponentKind" AS ENUM ('WRITTEN', 'MULTIPLE_CHOICE', 'PRACTICAL', 'ALTERNATIVE_TO_PRACTICAL', 'COURSEWORK', 'ORAL', 'LISTENING', 'PROJECT');

-- CreateEnum
CREATE TYPE "CognitiveSkill" AS ENUM ('RECALL', 'UNDERSTANDING', 'APPLICATION', 'ANALYSIS', 'EVALUATION', 'CREATION');

-- CreateEnum
CREATE TYPE "ExamSessionStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'CANCELLED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "LessonKind" AS ENUM ('LESSON', 'REVISION_NOTES', 'WORKED_EXAMPLES', 'EXAM_TIPS', 'STUDY_GUIDE', 'ARTICLE');

-- CreateEnum
CREATE TYPE "FlashcardType" AS ENUM ('DEFINITION', 'FORMULA', 'VOCABULARY', 'CONCEPT', 'DATE', 'FACT');

-- CreateEnum
CREATE TYPE "AssessmentKind" AS ENUM ('QUIZ', 'TOPIC_TEST', 'CHAPTER_TEST', 'SUBJECT_TEST', 'MOCK_EXAM', 'DIAGNOSTIC', 'TIMED_EXAM');

-- CreateEnum
CREATE TYPE "AssessmentAssembly" AS ENUM ('FIXED', 'BLUEPRINT', 'ADAPTIVE');

-- CreateEnum
CREATE TYPE "AssessmentFeedbackTiming" AS ENUM ('IMMEDIATE', 'AFTER_SUBMIT', 'AFTER_CLOSE');

-- CreateEnum
CREATE TYPE "ContentAccessTier" AS ENUM ('PUBLIC', 'FREE', 'PREMIUM');

-- CreateEnum
CREATE TYPE "CopyrightStatus" AS ENUM ('OWNED', 'LICENSED', 'PUBLIC_DOMAIN', 'OPEN_LICENSE', 'UNVERIFIED');

-- CreateEnum
CREATE TYPE "ContentSourceType" AS ENUM ('ORIGINAL', 'LICENSED', 'PUBLIC_DOMAIN', 'OPEN_LICENSE', 'OFFICIAL_SYLLABUS', 'AI_GENERATED');

-- CreateEnum
CREATE TYPE "MediaPurpose" AS ENUM ('CONTENT_IMAGE', 'DIAGRAM', 'CONTENT_AUDIO', 'MARKETING_IMAGE', 'SCHOOL_LOGO', 'AVATAR', 'SOLVER_UPLOAD', 'IMPORT_FILE', 'ANSWER_ATTACHMENT', 'REPORT_EXPORT');

-- CreateEnum
CREATE TYPE "MediaVisibility" AS ENUM ('PUBLIC', 'AUTHENTICATED', 'PRIVATE', 'OWNER_ONLY');

-- CreateEnum
CREATE TYPE "MediaStatus" AS ENUM ('PENDING', 'READY', 'REJECTED', 'DELETED');

-- CreateEnum
CREATE TYPE "ContentEntityType" AS ENUM ('SUBJECT', 'SYLLABUS', 'TOPIC', 'LESSON', 'QUESTION', 'FLASHCARD', 'ASSESSMENT', 'STUDY_PACK', 'MEDIA_ASSET', 'STUDY_PLAN_TEMPLATE');

-- CreateEnum
CREATE TYPE "ContentFlagReason" AS ENUM ('INCORRECT_ANSWER', 'AMBIGUOUS', 'INCORRECT_MARKING', 'WRONG_TOPIC', 'WRONG_DIFFICULTY', 'TYPO_OR_FORMATTING', 'COPYRIGHT_CONCERN', 'OTHER');

-- CreateEnum
CREATE TYPE "ContentFlagStatus" AS ENUM ('OPEN', 'IN_PROGRESS', 'RESOLVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "ContentFlagSource" AS ENUM ('EDITOR', 'STUDENT', 'TEACHER', 'SYSTEM');

-- CreateEnum
CREATE TYPE "ContentImportFormat" AS ENUM ('CSV', 'XLSX', 'JSON');

-- CreateEnum
CREATE TYPE "ContentImportStatus" AS ENUM ('UPLOADED', 'VALIDATING', 'VALIDATED', 'IMPORTING', 'COMPLETED', 'FAILED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "MasteryBand" AS ENUM ('WEAK', 'DEVELOPING', 'COMPETENT', 'STRONG', 'MASTERED');

-- CreateEnum
CREATE TYPE "AttemptMode" AS ENUM ('PRACTICE', 'RETEST', 'LESSON_CHECK', 'DAILY_QUESTION', 'QUIZ', 'TOPIC_TEST', 'CHAPTER_TEST', 'SUBJECT_TEST', 'TIMED_EXAM', 'MOCK_EXAM', 'DIAGNOSTIC');

-- CreateEnum
CREATE TYPE "AttemptStatus" AS ENUM ('IN_PROGRESS', 'SUBMITTED', 'AWAITING_MARKING', 'MARKED', 'ABANDONED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "AttemptSubmitReason" AS ENUM ('STUDENT', 'TIME_EXPIRED', 'IDLE_TIMEOUT', 'ASSIGNMENT_CLOSED', 'SYSTEM');

-- CreateEnum
CREATE TYPE "ActivityChannel" AS ENUM ('WEB', 'WHATSAPP', 'API');

-- CreateEnum
CREATE TYPE "MarkingStatus" AS ENUM ('PENDING', 'AUTO_MARKED', 'AI_MARKED', 'TEACHER_MARKED', 'SELF_ASSESSED', 'NEEDS_REVIEW', 'UNANSWERED');

-- CreateEnum
CREATE TYPE "MarkingSource" AS ENUM ('AUTO', 'AI', 'TEACHER', 'REVIEWER', 'SELF');

-- CreateEnum
CREATE TYPE "EnrollmentStatus" AS ENUM ('ACTIVE', 'PAUSED', 'COMPLETED', 'DROPPED');

-- CreateEnum
CREATE TYPE "EnrollmentSource" AS ENUM ('SELF', 'SCHOOL', 'CLASS');

-- CreateEnum
CREATE TYPE "AbilityLevel" AS ENUM ('BEGINNER', 'INTERMEDIATE', 'ADVANCED');

-- CreateEnum
CREATE TYPE "LessonProgressStatus" AS ENUM ('IN_PROGRESS', 'COMPLETED');

-- CreateEnum
CREATE TYPE "FlashcardSrsState" AS ENUM ('NEW', 'LEARNING', 'REVIEW', 'RELEARNING');

-- CreateEnum
CREATE TYPE "FlashcardRating" AS ENUM ('AGAIN', 'HARD', 'GOOD', 'EASY');

-- CreateEnum
CREATE TYPE "StudyPlanStatus" AS ENUM ('ACTIVE', 'SUPERSEDED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "StudyActivityType" AS ENUM ('LESSON', 'PRACTICE', 'TEST', 'MOCK_EXAM', 'DIAGNOSTIC', 'FLASHCARDS', 'REVIEW', 'DAILY_QUESTION', 'AI_TUTOR');

-- CreateEnum
CREATE TYPE "StudyPlanItemReason" AS ENUM ('WEAK_TOPIC', 'NEW_TOPIC', 'SPACED_REVIEW', 'EXAM_PREPARATION', 'FLASHCARDS_DUE', 'CATCH_UP', 'DIAGNOSTIC', 'ASSIGNMENT_DUE', 'MAINTENANCE');

-- CreateEnum
CREATE TYPE "StudyPlanItemStatus" AS ENUM ('PENDING', 'DONE', 'PARTIAL', 'SKIPPED', 'MISSED');

-- CreateEnum
CREATE TYPE "XpReason" AS ENUM ('PRACTICE_COMPLETED', 'ASSESSMENT_COMPLETED', 'MOCK_EXAM_COMPLETED', 'DIAGNOSTIC_COMPLETED', 'DAILY_QUESTION_ANSWERED', 'LESSON_COMPLETED', 'FLASHCARD_SESSION_COMPLETED', 'DAILY_GOAL_MET', 'WEEKLY_GOAL_MET', 'STREAK_MILESTONE', 'TOPIC_MASTERED', 'ACHIEVEMENT_UNLOCKED', 'ASSIGNMENT_SUBMITTED', 'PLAN_ITEM_COMPLETED', 'ADJUSTMENT');

-- CreateEnum
CREATE TYPE "XpSourceType" AS ENUM ('ASSESSMENT_ATTEMPT', 'LESSON', 'STUDY_SESSION', 'DAILY_ACTIVITY', 'LEARNER_STATS', 'TOPIC', 'ACHIEVEMENT', 'ASSIGNMENT', 'STUDY_PLAN_ITEM', 'ADMIN');

-- CreateEnum
CREATE TYPE "AchievementCategory" AS ENUM ('STREAK', 'MASTERY', 'PRACTICE', 'EXAM', 'MILESTONE');

-- CreateEnum
CREATE TYPE "LeaderboardMetric" AS ENUM ('WEEKLY_XP', 'WEEKLY_QUESTIONS', 'STREAK', 'MOCK_AVERAGE', 'SUBJECT_MASTERY');

-- CreateEnum
CREATE TYPE "LeaderboardScope" AS ENUM ('GLOBAL', 'COUNTRY', 'SCHOOL', 'CLASS', 'SUBJECT');

-- CreateEnum
CREATE TYPE "AssignmentType" AS ENUM ('LESSON', 'ASSESSMENT', 'PRACTICE');

-- CreateEnum
CREATE TYPE "AssignmentStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'CLOSED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "AssignmentAiHelp" AS ENUM ('NONE', 'HINTS_ONLY', 'FULL');

-- CreateEnum
CREATE TYPE "AssignmentScorePolicy" AS ENUM ('FIRST', 'BEST', 'LATEST');

-- CreateEnum
CREATE TYPE "AssignmentProgressStatus" AS ENUM ('NOT_STARTED', 'IN_PROGRESS', 'SUBMITTED', 'LATE', 'MISSED', 'EXCUSED');

-- CreateEnum
CREATE TYPE "ShareableResultKind" AS ENUM ('MOCK_SCORE', 'TEST_SCORE', 'STREAK', 'MASTERY', 'ACHIEVEMENT');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('STUDENT', 'PARENT', 'TEACHER', 'SCHOOL_ADMIN', 'CONTENT_EDITOR', 'ADMIN', 'SUPER_ADMIN');

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ACTIVE', 'SUSPENDED', 'PENDING_DELETION', 'DELETED');

-- CreateEnum
CREATE TYPE "LeaderboardDisplay" AS ENUM ('REAL_NAME', 'FIRST_NAME', 'USERNAME', 'ANONYMOUS');

-- CreateEnum
CREATE TYPE "ThemePreference" AS ENUM ('SYSTEM', 'LIGHT', 'DARK');

-- CreateEnum
CREATE TYPE "FontScale" AS ENUM ('SMALL', 'DEFAULT', 'LARGE', 'EXTRA_LARGE');

-- CreateEnum
CREATE TYPE "OnboardingStep" AS ENUM ('COUNTRY', 'AGE_CHECK', 'EXAM_BOARD', 'LEVEL', 'YEAR_GROUP', 'SUBJECTS', 'TARGET_EXAM', 'ABILITY', 'TARGET_GRADE', 'DIAGNOSTIC_OFFER', 'COMPLETED');

-- CreateEnum
CREATE TYPE "GuardianConsentStatus" AS ENUM ('NOT_REQUIRED', 'PENDING', 'GRANTED', 'REFUSED', 'WITHDRAWN');

-- CreateEnum
CREATE TYPE "GuardianConsentMethod" AS ENUM ('PARENT_ACCOUNT', 'GUARDIAN_OTP', 'SCHOOL', 'OFFLINE_FORM');

-- CreateEnum
CREATE TYPE "ParentLinkStatus" AS ENUM ('PENDING', 'ACTIVE', 'DECLINED', 'REVOKED');

-- CreateEnum
CREATE TYPE "ParentLinkInitiator" AS ENUM ('PARENT', 'STUDENT', 'SCHOOL', 'ADMIN');

-- CreateEnum
CREATE TYPE "ParentLinkConsentBasis" AS ENUM ('STUDENT_CODE', 'STUDENT_APPROVAL', 'SCHOOL_RECORD', 'ADMIN_VERIFIED');

-- CreateEnum
CREATE TYPE "GuardianRelationship" AS ENUM ('PARENT', 'GUARDIAN', 'GRANDPARENT', 'SIBLING', 'OTHER_RELATIVE', 'SPONSOR', 'OTHER');

-- CreateEnum
CREATE TYPE "SessionKind" AS ENUM ('WEB', 'API', 'WHATSAPP');

-- CreateEnum
CREATE TYPE "AuthMethod" AS ENUM ('PASSWORD', 'OTP', 'GOOGLE', 'CHANNEL_LINK');

-- CreateEnum
CREATE TYPE "VerificationPurpose" AS ENUM ('EMAIL_VERIFY', 'PHONE_VERIFY', 'LOGIN_OTP', 'PASSWORD_RESET', 'PARENT_LINK', 'CHANNEL_LINK', 'STEP_UP', 'GUARDIAN_CONSENT');

-- CreateEnum
CREATE TYPE "VerificationChannel" AS ENUM ('EMAIL', 'SMS', 'WHATSAPP');

-- CreateEnum
CREATE TYPE "PrivacyRequestKind" AS ENUM ('EXPORT', 'DELETION');

-- CreateEnum
CREATE TYPE "PrivacyRequestStatus" AS ENUM ('REQUESTED', 'PROCESSING', 'COMPLETED', 'CANCELLED', 'FAILED');

-- CreateEnum
CREATE TYPE "SchoolType" AS ENUM ('GOVERNMENT', 'COUNCIL', 'MISSION', 'TRUST', 'PRIVATE', 'COMMUNITY', 'INTERNATIONAL', 'OTHER');

-- CreateEnum
CREATE TYPE "SchoolStatus" AS ENUM ('PENDING_VERIFICATION', 'ACTIVE', 'SUSPENDED', 'CLOSED');

-- CreateEnum
CREATE TYPE "SchoolMemberRole" AS ENUM ('SCHOOL_ADMIN', 'TEACHER', 'STUDENT');

-- CreateEnum
CREATE TYPE "SchoolMemberStatus" AS ENUM ('INVITED', 'REQUESTED', 'ACTIVE', 'REMOVED');

-- CreateEnum
CREATE TYPE "MembershipSource" AS ENUM ('JOIN_CODE', 'INVITE', 'ADDED_BY_STAFF', 'ROSTER_IMPORT', 'REQUEST');

-- CreateEnum
CREATE TYPE "ClassTeacherRole" AS ENUM ('LEAD', 'ASSISTANT');

-- CreateEnum
CREATE TYPE "SchoolReportStatus" AS ENUM ('QUEUED', 'GENERATING', 'READY', 'FAILED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "ClassMemberStatus" AS ENUM ('PENDING', 'ACTIVE', 'REMOVED');

-- CreateEnum
CREATE TYPE "InvitationKind" AS ENUM ('SCHOOL_MEMBER', 'CLASS_MEMBER', 'STAFF_ROLE');

-- CreateEnum
CREATE TYPE "AnnouncementScope" AS ENUM ('GLOBAL', 'SCHOOL', 'CLASS');

-- CreateEnum
CREATE TYPE "NotificationCategory" AS ENUM ('ACCOUNT', 'SECURITY', 'LEARNING', 'REMINDER', 'ASSIGNMENT', 'ANNOUNCEMENT', 'PARENT', 'BILLING', 'ACHIEVEMENT', 'SYSTEM');

-- CreateEnum
CREATE TYPE "NotificationChannel" AS ENUM ('IN_APP', 'EMAIL', 'SMS', 'PUSH', 'WHATSAPP');

-- CreateEnum
CREATE TYPE "ChannelType" AS ENUM ('WHATSAPP', 'SMS', 'TELEGRAM');

-- CreateEnum
CREATE TYPE "MessageDirection" AS ENUM ('INBOUND', 'OUTBOUND');

-- CreateEnum
CREATE TYPE "ChannelMessageStatus" AS ENUM ('RECEIVED', 'PROCESSED', 'IGNORED', 'QUEUED', 'SENT', 'DELIVERED', 'READ', 'FAILED');

-- CreateEnum
CREATE TYPE "ChannelContentClass" AS ENUM ('STANDARD', 'AI_PRIVATE', 'OTP');

-- CreateEnum
CREATE TYPE "ChannelConversationStateKind" AS ENUM ('IDLE', 'AWAITING_ANSWER', 'AWAITING_LINK_CODE', 'AWAITING_CONFIRMATION');

-- CreateEnum
CREATE TYPE "PlanAudience" AS ENUM ('INDIVIDUAL', 'SCHOOL');

-- CreateEnum
CREATE TYPE "BillingInterval" AS ENUM ('WEEK', 'MONTH', 'TERM', 'YEAR', 'ONE_OFF');

-- CreateEnum
CREATE TYPE "SubscriptionStatus" AS ENUM ('PENDING', 'TRIALING', 'ACTIVE', 'PAST_DUE', 'CANCELLED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "SubscriptionSource" AS ENUM ('CHECKOUT', 'ADMIN', 'SCHOOL_CONTRACT', 'PROMO');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'SUCCESSFUL', 'FAILED', 'REFUNDED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "PaymentPurpose" AS ENUM ('SUBSCRIPTION', 'STUDY_PACK', 'SEATS');

-- CreateEnum
CREATE TYPE "PaymentEventSource" AS ENUM ('WEBHOOK', 'POLL', 'RETURN_URL', 'MANUAL', 'RECONCILIATION');

-- CreateEnum
CREATE TYPE "EntitlementSource" AS ENUM ('STUDY_PACK', 'REFERRAL', 'PROMO', 'ADMIN', 'SCHOOL_SEAT', 'COMPENSATION');

-- CreateEnum
CREATE TYPE "PromoDiscountType" AS ENUM ('PERCENT', 'FIXED_AMOUNT', 'FREE_DAYS');

-- CreateEnum
CREATE TYPE "PromoRedemptionStatus" AS ENUM ('RESERVED', 'APPLIED', 'RELEASED');

-- CreateEnum
CREATE TYPE "ReferralStatus" AS ENUM ('PENDING', 'QUALIFIED', 'REWARDED', 'REJECTED');

-- CreateEnum
CREATE TYPE "AiConversationMode" AS ENUM ('TUTOR', 'SOLVER');

-- CreateEnum
CREATE TYPE "AiConversationStatus" AS ENUM ('ACTIVE', 'LOCKED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "AiMessageRole" AS ENUM ('USER', 'ASSISTANT');

-- CreateEnum
CREATE TYPE "AiIntent" AS ENUM ('TEACH', 'HINT', 'ANSWER', 'CHECK_WORK', 'EXPLAIN_CONCEPT', 'OFF_TOPIC', 'OTHER');

-- CreateEnum
CREATE TYPE "AiMessageStatus" AS ENUM ('COMPLETE', 'TRUNCATED', 'REFUSED', 'ABORTED', 'ERROR');

-- CreateEnum
CREATE TYPE "AiModelTier" AS ENUM ('FAST', 'STANDARD', 'DEEP');

-- CreateEnum
CREATE TYPE "AiFeature" AS ENUM ('TUTOR', 'SOLVER', 'MARKING', 'CONTENT_GEN', 'WHATSAPP');

-- CreateEnum
CREATE TYPE "AiGenerationKind" AS ENUM ('LESSON', 'QUESTIONS', 'MCQ', 'FLASHCARDS', 'EXPLANATION', 'HINTS', 'STUDY_PLAN');

-- CreateEnum
CREATE TYPE "AiGenerationStatus" AS ENUM ('QUEUED', 'RUNNING', 'COMPLETED', 'FAILED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "AuditActorKind" AS ENUM ('USER', 'SYSTEM');

-- CreateEnum
CREATE TYPE "JobStatus" AS ENUM ('PENDING', 'RUNNING', 'SUCCEEDED', 'FAILED', 'DEAD', 'CANCELLED');

-- CreateTable
CREATE TABLE "Country" (
    "id" UUID NOT NULL,
    "isoCode" CHAR(2) NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "defaultCurrency" CHAR(3) NOT NULL,
    "timezone" TEXT NOT NULL,
    "defaultLocale" VARCHAR(16) NOT NULL,
    "dialCode" VARCHAR(8),
    "catalogueStatus" "CatalogueStatus" NOT NULL DEFAULT 'HIDDEN',
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "Country_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExamBoard" (
    "id" UUID NOT NULL,
    "slug" TEXT NOT NULL,
    "code" VARCHAR(32) NOT NULL,
    "name" TEXT NOT NULL,
    "shortName" TEXT NOT NULL,
    "description" TEXT,
    "publicSummary" TEXT,
    "websiteUrl" TEXT,
    "homeCountryId" UUID,
    "logoMediaId" UUID,
    "catalogueStatus" "CatalogueStatus" NOT NULL DEFAULT 'HIDDEN',
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "metaTitle" TEXT,
    "metaDescription" TEXT,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "ExamBoard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExamBoardCountry" (
    "countryId" UUID NOT NULL,
    "examBoardId" UUID NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ExamBoardCountry_pkey" PRIMARY KEY ("countryId","examBoardId")
);

-- CreateTable
CREATE TABLE "QualificationLevel" (
    "id" UUID NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "shortName" VARCHAR(32),
    "description" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "QualificationLevel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Qualification" (
    "id" UUID NOT NULL,
    "examBoardId" UUID NOT NULL,
    "levelId" UUID NOT NULL,
    "slug" TEXT NOT NULL,
    "code" VARCHAR(32),
    "name" TEXT NOT NULL,
    "shortName" TEXT NOT NULL,
    "description" TEXT,
    "publicSummary" TEXT,
    "catalogueStatus" "CatalogueStatus" NOT NULL DEFAULT 'HIDDEN',
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "metaTitle" TEXT,
    "metaDescription" TEXT,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "Qualification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "YearGroup" (
    "id" UUID NOT NULL,
    "countryId" UUID NOT NULL,
    "code" VARCHAR(16) NOT NULL,
    "name" TEXT NOT NULL,
    "ordinal" INTEGER NOT NULL,
    "typicalLevelId" UUID,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "YearGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubjectCategory" (
    "id" UUID NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "iconKey" VARCHAR(64),
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "SubjectCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subject" (
    "id" UUID NOT NULL,
    "qualificationId" UUID NOT NULL,
    "categoryId" UUID NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "shortName" VARCHAR(64),
    "officialCode" VARCHAR(16),
    "description" TEXT,
    "publicSummary" TEXT,
    "metaTitle" TEXT,
    "metaDescription" TEXT,
    "languageCode" VARCHAR(10) NOT NULL DEFAULT 'en',
    "iconKey" VARCHAR(64),
    "catalogueStatus" "CatalogueStatus" NOT NULL DEFAULT 'HIDDEN',
    "isPublic" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "sourceId" UUID,
    "isDemo" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "Subject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Syllabus" (
    "id" UUID NOT NULL,
    "subjectId" UUID NOT NULL,
    "code" VARCHAR(16),
    "title" TEXT NOT NULL,
    "versionLabel" VARCHAR(64) NOT NULL,
    "status" "SyllabusStatus" NOT NULL DEFAULT 'DRAFT',
    "effectiveFrom" DATE NOT NULL,
    "effectiveTo" DATE,
    "supersedesId" UUID,
    "overview" TEXT,
    "assessmentOverview" TEXT,
    "officialDocumentUrl" TEXT,
    "gradeSchemeId" UUID,
    "sourceId" UUID,
    "copyrightStatus" "CopyrightStatus" NOT NULL DEFAULT 'UNVERIFIED',
    "sourceNotes" TEXT,
    "isDemo" BOOLEAN NOT NULL DEFAULT false,
    "createdById" UUID,
    "publishedById" UUID,
    "publishedAt" TIMESTAMPTZ(3),
    "archivedAt" TIMESTAMPTZ(3),
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "Syllabus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SyllabusComponent" (
    "id" UUID NOT NULL,
    "syllabusId" UUID NOT NULL,
    "code" VARCHAR(16) NOT NULL,
    "name" TEXT NOT NULL,
    "kind" "SyllabusComponentKind" NOT NULL DEFAULT 'WRITTEN',
    "description" TEXT,
    "durationMinutes" INTEGER,
    "maxMarks" INTEGER,
    "weightingPercent" DECIMAL(5,2),
    "calculatorAllowed" BOOLEAN,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "SyllabusComponent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SyllabusRoute" (
    "id" UUID NOT NULL,
    "syllabusId" UUID NOT NULL,
    "code" VARCHAR(16) NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "gradeSchemeId" UUID,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "SyllabusRoute_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SyllabusRouteComponent" (
    "routeId" UUID NOT NULL,
    "componentId" UUID NOT NULL,
    "isCompulsory" BOOLEAN NOT NULL DEFAULT true,
    "choiceGroup" VARCHAR(64),

    CONSTRAINT "SyllabusRouteComponent_pkey" PRIMARY KEY ("routeId","componentId")
);

-- CreateTable
CREATE TABLE "Topic" (
    "id" UUID NOT NULL,
    "syllabusId" UUID NOT NULL,
    "parentId" UUID,
    "originTopicId" UUID,
    "kind" "TopicKind" NOT NULL,
    "depth" INTEGER NOT NULL,
    "path" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "code" VARCHAR(32),
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "publicSummary" TEXT,
    "metaTitle" TEXT,
    "metaDescription" TEXT,
    "isPublic" BOOLEAN NOT NULL DEFAULT true,
    "isOptional" BOOLEAN NOT NULL DEFAULT false,
    "optionGroup" VARCHAR(64),
    "examYearFrom" INTEGER,
    "examYearTo" INTEGER,
    "estimatedStudyMinutes" INTEGER,
    "importId" UUID,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "Topic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TopicComponent" (
    "topicId" UUID NOT NULL,
    "componentId" UUID NOT NULL,

    CONSTRAINT "TopicComponent_pkey" PRIMARY KEY ("topicId","componentId")
);

-- CreateTable
CREATE TABLE "LearningObjective" (
    "id" UUID NOT NULL,
    "topicId" UUID NOT NULL,
    "originObjectiveId" UUID,
    "code" VARCHAR(32),
    "statement" TEXT NOT NULL,
    "cognitiveSkill" "CognitiveSkill",
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "LearningObjective_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GradeScheme" (
    "id" UUID NOT NULL,
    "qualificationId" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    "description" TEXT,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "isEstimate" BOOLEAN NOT NULL DEFAULT true,
    "disclaimer" TEXT,
    "sourceId" UUID,
    "sourceNote" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isDemo" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "GradeScheme_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GradeBand" (
    "id" UUID NOT NULL,
    "gradeSchemeId" UUID NOT NULL,
    "label" VARCHAR(8) NOT NULL,
    "minPercent" DECIMAL(5,2) NOT NULL,
    "sortOrder" INTEGER NOT NULL,
    "isPass" BOOLEAN NOT NULL,
    "description" TEXT,

    CONSTRAINT "GradeBand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExamSession" (
    "id" UUID NOT NULL,
    "qualificationId" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "seriesCode" VARCHAR(32) NOT NULL,
    "year" INTEGER NOT NULL,
    "startsOn" DATE NOT NULL,
    "endsOn" DATE NOT NULL,
    "isProvisional" BOOLEAN NOT NULL DEFAULT true,
    "confirmedAt" TIMESTAMPTZ(3),
    "confirmedById" UUID,
    "sourceUrl" TEXT,
    "status" "ExamSessionStatus" NOT NULL DEFAULT 'DRAFT',
    "notes" TEXT,
    "isDemo" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "ExamSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExamTimetableEntry" (
    "id" UUID NOT NULL,
    "examSessionId" UUID NOT NULL,
    "subjectId" UUID NOT NULL,
    "componentId" UUID,
    "label" TEXT,
    "startsAt" TIMESTAMPTZ(3) NOT NULL,
    "durationMinutes" INTEGER,
    "isProvisional" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "ExamTimetableEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContentSource" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "type" "ContentSourceType" NOT NULL,
    "publisher" TEXT,
    "url" TEXT,
    "licenceCode" VARCHAR(64),
    "licenceUrl" TEXT,
    "attributionText" TEXT,
    "requiresAttribution" BOOLEAN NOT NULL DEFAULT false,
    "permitsCommercialUse" BOOLEAN NOT NULL DEFAULT false,
    "permitsDerivatives" BOOLEAN NOT NULL DEFAULT false,
    "permitsPdfExport" BOOLEAN NOT NULL DEFAULT false,
    "agreementReference" TEXT,
    "validFrom" DATE,
    "validUntil" DATE,
    "notes" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isDemo" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "ContentSource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MediaAsset" (
    "id" UUID NOT NULL,
    "storageKey" TEXT NOT NULL,
    "mimeType" VARCHAR(127) NOT NULL,
    "byteSize" INTEGER NOT NULL,
    "width" INTEGER,
    "height" INTEGER,
    "durationMs" INTEGER,
    "checksumSha256" CHAR(64) NOT NULL,
    "originalFilename" TEXT,
    "altText" TEXT,
    "caption" TEXT,
    "longDescription" TEXT,
    "purpose" "MediaPurpose" NOT NULL,
    "visibility" "MediaVisibility" NOT NULL DEFAULT 'PRIVATE',
    "status" "MediaStatus" NOT NULL DEFAULT 'PENDING',
    "variants" JSONB,
    "blurDataUrl" TEXT,
    "uploadedById" UUID,
    "sourceId" UUID,
    "author" TEXT,
    "copyrightStatus" "CopyrightStatus" NOT NULL DEFAULT 'UNVERIFIED',
    "licenceCode" VARCHAR(64),
    "attribution" TEXT,
    "sourceUrl" TEXT,
    "isDemo" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMPTZ(3),
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "MediaAsset_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContentMediaUsage" (
    "entityType" "ContentEntityType" NOT NULL,
    "entityId" UUID NOT NULL,
    "mediaAssetId" UUID NOT NULL,
    "field" VARCHAR(64) NOT NULL DEFAULT '',
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ContentMediaUsage_pkey" PRIMARY KEY ("entityType","entityId","mediaAssetId","field")
);

-- CreateTable
CREATE TABLE "ContentImport" (
    "id" UUID NOT NULL,
    "entityType" "ContentEntityType" NOT NULL,
    "format" "ContentImportFormat" NOT NULL,
    "status" "ContentImportStatus" NOT NULL DEFAULT 'UPLOADED',
    "fileMediaId" UUID NOT NULL,
    "subjectId" UUID,
    "syllabusId" UUID,
    "options" JSONB,
    "totalRows" INTEGER NOT NULL DEFAULT 0,
    "validRows" INTEGER NOT NULL DEFAULT 0,
    "importedRows" INTEGER NOT NULL DEFAULT 0,
    "failedRows" INTEGER NOT NULL DEFAULT 0,
    "errors" JSONB,
    "createdById" UUID NOT NULL,
    "startedAt" TIMESTAMPTZ(3),
    "completedAt" TIMESTAMPTZ(3),
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "ContentImport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lesson" (
    "id" UUID NOT NULL,
    "subjectId" UUID,
    "qualificationId" UUID,
    "examBoardId" UUID,
    "kind" "LessonKind" NOT NULL DEFAULT 'LESSON',
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "summary" TEXT,
    "body" TEXT NOT NULL,
    "bodyHtml" TEXT,
    "renderVersion" INTEGER,
    "contentHash" CHAR(64),
    "languageCode" VARCHAR(10) NOT NULL DEFAULT 'en',
    "estimatedMinutes" INTEGER NOT NULL DEFAULT 10,
    "accessTier" "ContentAccessTier" NOT NULL DEFAULT 'PREMIUM',
    "metaTitle" TEXT,
    "metaDescription" TEXT,
    "externalRef" TEXT,
    "status" "ContentStatus" NOT NULL DEFAULT 'DRAFT',
    "revision" INTEGER NOT NULL DEFAULT 1,
    "draftOfId" UUID,
    "createdById" UUID,
    "reviewedById" UUID,
    "reviewedAt" TIMESTAMPTZ(3),
    "reviewNotes" TEXT,
    "approvedById" UUID,
    "approvedAt" TIMESTAMPTZ(3),
    "publishedAt" TIMESTAMPTZ(3),
    "archivedAt" TIMESTAMPTZ(3),
    "aiGenerated" BOOLEAN NOT NULL DEFAULT false,
    "generationJobId" UUID,
    "sourceId" UUID,
    "author" TEXT,
    "copyrightStatus" "CopyrightStatus" NOT NULL DEFAULT 'UNVERIFIED',
    "licenceCode" VARCHAR(64),
    "attribution" TEXT,
    "sourceUrl" TEXT,
    "publicationDate" DATE,
    "isDemo" BOOLEAN NOT NULL DEFAULT false,
    "importId" UUID,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "Lesson_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LessonTopic" (
    "lessonId" UUID NOT NULL,
    "topicId" UUID NOT NULL,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LessonTopic_pkey" PRIMARY KEY ("lessonId","topicId")
);

-- CreateTable
CREATE TABLE "LessonObjective" (
    "lessonId" UUID NOT NULL,
    "objectiveId" UUID NOT NULL,

    CONSTRAINT "LessonObjective_pkey" PRIMARY KEY ("lessonId","objectiveId")
);

-- CreateTable
CREATE TABLE "LessonQuestion" (
    "lessonId" UUID NOT NULL,
    "questionId" UUID NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "LessonQuestion_pkey" PRIMARY KEY ("lessonId","questionId")
);

-- CreateTable
CREATE TABLE "Question" (
    "id" UUID NOT NULL,
    "subjectId" UUID NOT NULL,
    "parentId" UUID,
    "partLabel" VARCHAR(16),
    "partOrder" INTEGER NOT NULL DEFAULT 0,
    "type" "QuestionType" NOT NULL,
    "markingMode" "MarkingMode" NOT NULL DEFAULT 'AUTO',
    "stem" TEXT NOT NULL,
    "payload" JSONB,
    "answerSpec" JSONB,
    "explanation" TEXT,
    "workedSolution" TEXT,
    "hints" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "conceptSummary" TEXT,
    "relatedLessonId" UUID,
    "difficulty" INTEGER NOT NULL,
    "marks" INTEGER NOT NULL,
    "estimatedSeconds" INTEGER,
    "year" INTEGER,
    "paperLabel" VARCHAR(32),
    "cognitiveSkill" "CognitiveSkill",
    "isExamStyle" BOOLEAN NOT NULL DEFAULT false,
    "isDailyEligible" BOOLEAN NOT NULL DEFAULT false,
    "calculatorAllowed" BOOLEAN,
    "accessTier" "ContentAccessTier" NOT NULL DEFAULT 'PREMIUM',
    "languageCode" VARCHAR(10) NOT NULL DEFAULT 'en',
    "renderedHtml" JSONB,
    "renderVersion" INTEGER,
    "schoolId" UUID,
    "ownerUserId" UUID,
    "externalRef" TEXT,
    "status" "ContentStatus" NOT NULL DEFAULT 'DRAFT',
    "revision" INTEGER NOT NULL DEFAULT 1,
    "draftOfId" UUID,
    "createdById" UUID,
    "reviewedById" UUID,
    "reviewedAt" TIMESTAMPTZ(3),
    "reviewNotes" TEXT,
    "approvedById" UUID,
    "approvedAt" TIMESTAMPTZ(3),
    "publishedAt" TIMESTAMPTZ(3),
    "archivedAt" TIMESTAMPTZ(3),
    "aiGenerated" BOOLEAN NOT NULL DEFAULT false,
    "generationJobId" UUID,
    "sourceId" UUID,
    "author" TEXT,
    "copyrightStatus" "CopyrightStatus" NOT NULL DEFAULT 'UNVERIFIED',
    "licenceCode" VARCHAR(64),
    "attribution" TEXT,
    "sourceUrl" TEXT,
    "publicationDate" DATE,
    "isDemo" BOOLEAN NOT NULL DEFAULT false,
    "importId" UUID,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionOption" (
    "id" UUID NOT NULL,
    "questionId" UUID NOT NULL,
    "key" VARCHAR(8) NOT NULL,
    "content" TEXT NOT NULL,
    "isCorrect" BOOLEAN NOT NULL DEFAULT false,
    "rationale" TEXT,
    "mediaAssetId" UUID,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "QuestionOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionTopic" (
    "questionId" UUID NOT NULL,
    "topicId" UUID NOT NULL,
    "syllabusId" UUID NOT NULL,
    "subjectId" UUID NOT NULL,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "isPlatform" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "QuestionTopic_pkey" PRIMARY KEY ("questionId","topicId")
);

-- CreateTable
CREATE TABLE "QuestionObjective" (
    "questionId" UUID NOT NULL,
    "objectiveId" UUID NOT NULL,

    CONSTRAINT "QuestionObjective_pkey" PRIMARY KEY ("questionId","objectiveId")
);

-- CreateTable
CREATE TABLE "Flashcard" (
    "id" UUID NOT NULL,
    "subjectId" UUID NOT NULL,
    "ownerUserId" UUID,
    "cardType" "FlashcardType" NOT NULL,
    "front" TEXT NOT NULL,
    "back" TEXT NOT NULL,
    "notes" TEXT,
    "languageCode" VARCHAR(10) NOT NULL DEFAULT 'en',
    "renderedHtml" JSONB,
    "renderVersion" INTEGER,
    "accessTier" "ContentAccessTier" NOT NULL DEFAULT 'PREMIUM',
    "externalRef" TEXT,
    "status" "ContentStatus" NOT NULL DEFAULT 'DRAFT',
    "revision" INTEGER NOT NULL DEFAULT 1,
    "draftOfId" UUID,
    "createdById" UUID,
    "reviewedById" UUID,
    "reviewedAt" TIMESTAMPTZ(3),
    "reviewNotes" TEXT,
    "approvedById" UUID,
    "approvedAt" TIMESTAMPTZ(3),
    "publishedAt" TIMESTAMPTZ(3),
    "archivedAt" TIMESTAMPTZ(3),
    "aiGenerated" BOOLEAN NOT NULL DEFAULT false,
    "generationJobId" UUID,
    "sourceId" UUID,
    "author" TEXT,
    "copyrightStatus" "CopyrightStatus" NOT NULL DEFAULT 'UNVERIFIED',
    "licenceCode" VARCHAR(64),
    "attribution" TEXT,
    "sourceUrl" TEXT,
    "publicationDate" DATE,
    "isDemo" BOOLEAN NOT NULL DEFAULT false,
    "importId" UUID,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "Flashcard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FlashcardTopic" (
    "flashcardId" UUID NOT NULL,
    "topicId" UUID NOT NULL,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FlashcardTopic_pkey" PRIMARY KEY ("flashcardId","topicId")
);

-- CreateTable
CREATE TABLE "Assessment" (
    "id" UUID NOT NULL,
    "kind" "AssessmentKind" NOT NULL,
    "assembly" "AssessmentAssembly" NOT NULL DEFAULT 'FIXED',
    "subjectId" UUID NOT NULL,
    "syllabusId" UUID,
    "routeId" UUID,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "instructions" TEXT,
    "timeLimitSeconds" INTEGER,
    "totalMarks" INTEGER NOT NULL,
    "gradeSchemeId" UUID,
    "feedbackTiming" "AssessmentFeedbackTiming" NOT NULL DEFAULT 'AFTER_SUBMIT',
    "shuffleQuestions" BOOLEAN NOT NULL DEFAULT false,
    "shuffleOptions" BOOLEAN NOT NULL DEFAULT false,
    "allowNavigation" BOOLEAN NOT NULL DEFAULT true,
    "maxAttempts" INTEGER,
    "accessTier" "ContentAccessTier" NOT NULL DEFAULT 'PREMIUM',
    "schoolId" UUID,
    "ownerUserId" UUID,
    "status" "ContentStatus" NOT NULL DEFAULT 'DRAFT',
    "revision" INTEGER NOT NULL DEFAULT 1,
    "draftOfId" UUID,
    "createdById" UUID,
    "reviewedById" UUID,
    "reviewedAt" TIMESTAMPTZ(3),
    "reviewNotes" TEXT,
    "approvedById" UUID,
    "approvedAt" TIMESTAMPTZ(3),
    "publishedAt" TIMESTAMPTZ(3),
    "archivedAt" TIMESTAMPTZ(3),
    "aiGenerated" BOOLEAN NOT NULL DEFAULT false,
    "generationJobId" UUID,
    "sourceId" UUID,
    "author" TEXT,
    "copyrightStatus" "CopyrightStatus" NOT NULL DEFAULT 'UNVERIFIED',
    "licenceCode" VARCHAR(64),
    "attribution" TEXT,
    "sourceUrl" TEXT,
    "publicationDate" DATE,
    "isDemo" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "Assessment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AssessmentTopic" (
    "assessmentId" UUID NOT NULL,
    "topicId" UUID NOT NULL,

    CONSTRAINT "AssessmentTopic_pkey" PRIMARY KEY ("assessmentId","topicId")
);

-- CreateTable
CREATE TABLE "AssessmentSection" (
    "id" UUID NOT NULL,
    "assessmentId" UUID NOT NULL,
    "componentId" UUID,
    "title" TEXT NOT NULL,
    "instructions" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "timeLimitSeconds" INTEGER,
    "answerCount" INTEGER,
    "marks" INTEGER,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "AssessmentSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AssessmentItem" (
    "id" UUID NOT NULL,
    "sectionId" UUID NOT NULL,
    "questionId" UUID NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "label" VARCHAR(16),
    "marks" INTEGER,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AssessmentItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AssessmentBlueprintRule" (
    "id" UUID NOT NULL,
    "sectionId" UUID NOT NULL,
    "topicId" UUID,
    "objectiveId" UUID,
    "includeSubtopics" BOOLEAN NOT NULL DEFAULT true,
    "questionType" "QuestionType",
    "cognitiveSkill" "CognitiveSkill",
    "difficultyMin" INTEGER NOT NULL DEFAULT 1,
    "difficultyMax" INTEGER NOT NULL DEFAULT 5,
    "questionCount" INTEGER NOT NULL,
    "marksPerQuestion" INTEGER,
    "examStyleOnly" BOOLEAN NOT NULL DEFAULT false,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "AssessmentBlueprintRule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudyPack" (
    "id" UUID NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT,
    "description" TEXT,
    "coverImageId" UUID,
    "entitlements" JSONB NOT NULL,
    "allowPdfExport" BOOLEAN NOT NULL DEFAULT false,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "metaTitle" TEXT,
    "metaDescription" TEXT,
    "status" "ContentStatus" NOT NULL DEFAULT 'DRAFT',
    "revision" INTEGER NOT NULL DEFAULT 1,
    "draftOfId" UUID,
    "createdById" UUID,
    "reviewedById" UUID,
    "reviewedAt" TIMESTAMPTZ(3),
    "reviewNotes" TEXT,
    "approvedById" UUID,
    "approvedAt" TIMESTAMPTZ(3),
    "publishedAt" TIMESTAMPTZ(3),
    "archivedAt" TIMESTAMPTZ(3),
    "aiGenerated" BOOLEAN NOT NULL DEFAULT false,
    "generationJobId" UUID,
    "isDemo" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "StudyPack_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudyPackScope" (
    "id" UUID NOT NULL,
    "studyPackId" UUID NOT NULL,
    "qualificationId" UUID,
    "subjectId" UUID,
    "syllabusId" UUID,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StudyPackScope_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudyPlanTemplate" (
    "id" UUID NOT NULL,
    "subjectId" UUID NOT NULL,
    "syllabusId" UUID NOT NULL,
    "routeId" UUID,
    "title" VARCHAR(200) NOT NULL,
    "slug" VARCHAR(120) NOT NULL,
    "description" TEXT,
    "durationWeeks" SMALLINT NOT NULL,
    "weeklyMinutes" SMALLINT,
    "accessTier" "ContentAccessTier" NOT NULL DEFAULT 'PREMIUM',
    "status" "ContentStatus" NOT NULL DEFAULT 'DRAFT',
    "revision" INTEGER NOT NULL DEFAULT 1,
    "draftOfId" UUID,
    "createdById" UUID,
    "reviewedById" UUID,
    "reviewedAt" TIMESTAMPTZ(3),
    "reviewNotes" TEXT,
    "approvedById" UUID,
    "approvedAt" TIMESTAMPTZ(3),
    "publishedAt" TIMESTAMPTZ(3),
    "archivedAt" TIMESTAMPTZ(3),
    "aiGenerated" BOOLEAN NOT NULL DEFAULT false,
    "generationJobId" UUID,
    "isDemo" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "StudyPlanTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudyPlanTemplateItem" (
    "id" UUID NOT NULL,
    "templateId" UUID NOT NULL,
    "weekNumber" SMALLINT NOT NULL,
    "dayOfWeek" SMALLINT,
    "sortOrder" SMALLINT NOT NULL,
    "activityType" "StudyActivityType" NOT NULL,
    "topicId" UUID,
    "lessonId" UUID,
    "assessmentId" UUID,
    "targetMinutes" SMALLINT NOT NULL,
    "targetQuestions" SMALLINT,
    "note" VARCHAR(500),
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "StudyPlanTemplateItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContentRevision" (
    "id" UUID NOT NULL,
    "entityType" "ContentEntityType" NOT NULL,
    "entityId" UUID NOT NULL,
    "revision" INTEGER NOT NULL,
    "schemaVersion" INTEGER NOT NULL DEFAULT 1,
    "snapshot" JSONB NOT NULL,
    "contentHash" CHAR(64) NOT NULL,
    "authorId" UUID,
    "approvedById" UUID,
    "changeNote" TEXT,
    "aiGenerated" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ContentRevision_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContentFlag" (
    "id" UUID NOT NULL,
    "entityType" "ContentEntityType" NOT NULL,
    "entityId" UUID NOT NULL,
    "revision" INTEGER,
    "reason" "ContentFlagReason" NOT NULL,
    "source" "ContentFlagSource" NOT NULL,
    "details" TEXT,
    "context" JSONB,
    "status" "ContentFlagStatus" NOT NULL DEFAULT 'OPEN',
    "flaggedById" UUID,
    "assignedToId" UUID,
    "resolvedById" UUID,
    "resolvedAt" TIMESTAMPTZ(3),
    "resolution" TEXT,
    "resolutionRevision" INTEGER,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "ContentFlag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SearchDocument" (
    "id" UUID NOT NULL,
    "entityType" "ContentEntityType" NOT NULL,
    "entityId" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT,
    "body" TEXT NOT NULL DEFAULT '',
    "keywords" TEXT NOT NULL DEFAULT '',
    "path" TEXT NOT NULL,
    "languageCode" VARCHAR(10) NOT NULL DEFAULT 'en',
    "accessTier" "ContentAccessTier" NOT NULL,
    "status" "ContentStatus" NOT NULL,
    "examBoardIds" UUID[] DEFAULT ARRAY[]::UUID[],
    "qualificationIds" UUID[] DEFAULT ARRAY[]::UUID[],
    "levelIds" UUID[] DEFAULT ARRAY[]::UUID[],
    "subjectIds" UUID[] DEFAULT ARRAY[]::UUID[],
    "syllabusIds" UUID[] DEFAULT ARRAY[]::UUID[],
    "topicIds" UUID[] DEFAULT ARRAY[]::UUID[],
    "rankBoost" INTEGER NOT NULL DEFAULT 0,
    "searchVector" tsvector GENERATED ALWAYS AS (((((setweight(to_tsvector(search_ts_config(("languageCode")::text), COALESCE(title, ''::text)), 'A'::"char") || setweight(to_tsvector('simple'::regconfig, COALESCE(title, ''::text)), 'A'::"char")) || setweight(to_tsvector(search_ts_config(("languageCode")::text), ((COALESCE(keywords, ''::text) || ' '::text) || COALESCE(subtitle, ''::text))), 'B'::"char")) || setweight(to_tsvector('simple'::regconfig, COALESCE(keywords, ''::text)), 'B'::"char")) || setweight(to_tsvector(search_ts_config(("languageCode")::text), COALESCE(body, ''::text)), 'C'::"char"))) STORED,
    "sourceUpdatedAt" TIMESTAMPTZ(3) NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "SearchDocument_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DailyQuestion" (
    "id" UUID NOT NULL,
    "date" DATE NOT NULL,
    "qualificationId" UUID NOT NULL,
    "subjectId" UUID,
    "questionId" UUID NOT NULL,
    "isAutoSelected" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DailyQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Testimonial" (
    "id" UUID NOT NULL,
    "displayName" TEXT NOT NULL,
    "descriptor" TEXT,
    "quote" TEXT NOT NULL,
    "photoMediaId" UUID,
    "userId" UUID,
    "consentRecordedAt" TIMESTAMPTZ(3) NOT NULL,
    "consentMethod" VARCHAR(64) NOT NULL,
    "consentEvidenceRef" TEXT,
    "consentRecordedById" UUID,
    "authorIsMinor" BOOLEAN NOT NULL DEFAULT false,
    "guardianConsentRecordedAt" TIMESTAMPTZ(3),
    "consentWithdrawnAt" TIMESTAMPTZ(3),
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "publishedAt" TIMESTAMPTZ(3),
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isDemo" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "Testimonial_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FaqItem" (
    "id" UUID NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "category" VARCHAR(64) NOT NULL,
    "locale" VARCHAR(16) NOT NULL DEFAULT 'en',
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "publishedAt" TIMESTAMPTZ(3),
    "isDemo" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "FaqItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubjectEnrollment" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "subjectId" UUID NOT NULL,
    "syllabusId" UUID NOT NULL,
    "routeId" UUID,
    "targetExamSessionId" UUID,
    "diagnosticAttemptId" UUID,
    "syllabusPinnedAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "diagnosticCompletedAt" TIMESTAMPTZ(3),
    "statusChangedAt" TIMESTAMPTZ(3),
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,
    "status" "EnrollmentStatus" NOT NULL DEFAULT 'ACTIVE',
    "enrolledVia" "EnrollmentSource" NOT NULL DEFAULT 'SELF',
    "abilityLevel" "AbilityLevel",
    "targetGrade" VARCHAR(8),
    "syllabusOptions" JSONB,

    CONSTRAINT "SubjectEnrollment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EnrollmentTopicChoice" (
    "enrollmentId" UUID NOT NULL,
    "topicId" UUID NOT NULL,
    "syllabusId" UUID NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EnrollmentTopicChoice_pkey" PRIMARY KEY ("enrollmentId","topicId")
);

-- CreateTable
CREATE TABLE "AssessmentAttempt" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "subjectId" UUID NOT NULL,
    "assessmentId" UUID,
    "topicId" UUID,
    "lessonId" UUID,
    "assignmentId" UUID,
    "dailyQuestionId" UUID,
    "startedAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deadlineAt" TIMESTAMPTZ(3),
    "lastSavedAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "submittedAt" TIMESTAMPTZ(3),
    "markedAt" TIMESTAMPTZ(3),
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,
    "assessmentRevision" INTEGER,
    "timeLimitSeconds" INTEGER,
    "timeSpentSeconds" INTEGER NOT NULL DEFAULT 0,
    "totalMarks" INTEGER,
    "marksAwarded" INTEGER,
    "mode" "AttemptMode" NOT NULL,
    "status" "AttemptStatus" NOT NULL DEFAULT 'IN_PROGRESS',
    "submitReason" "AttemptSubmitReason",
    "channel" "ActivityChannel" NOT NULL DEFAULT 'WEB',
    "attemptNumber" SMALLINT NOT NULL DEFAULT 1,
    "questionCount" SMALLINT NOT NULL DEFAULT 0,
    "answeredCount" SMALLINT NOT NULL DEFAULT 0,
    "correctCount" SMALLINT NOT NULL DEFAULT 0,
    "pendingReviewCount" SMALLINT NOT NULL DEFAULT 0,
    "lastPosition" SMALLINT,
    "percentage" DOUBLE PRECISION,
    "gradeEstimate" VARCHAR(8),
    "gradeSchemeId" UUID,
    "gradeIsPass" BOOLEAN,
    "lateSync" BOOLEAN NOT NULL DEFAULT false,
    "idempotencyKey" VARCHAR(64),
    "config" JSONB NOT NULL,
    "analysis" JSONB,

    CONSTRAINT "AssessmentAttempt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AssessmentAttemptSection" (
    "attemptId" UUID NOT NULL,
    "sectionNumber" SMALLINT NOT NULL,
    "title" VARCHAR(200) NOT NULL,
    "timeLimitSeconds" INTEGER,
    "answerCount" SMALLINT,
    "maxMarks" INTEGER,
    "startedAt" TIMESTAMPTZ(3),
    "deadlineAt" TIMESTAMPTZ(3),
    "submittedAt" TIMESTAMPTZ(3),
    "marksAwarded" INTEGER,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "AssessmentAttemptSection_pkey" PRIMARY KEY ("attemptId","sectionNumber")
);

-- CreateTable
CREATE TABLE "QuestionAttempt" (
    "attemptId" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "subjectId" UUID NOT NULL,
    "topicId" UUID NOT NULL,
    "questionId" UUID NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "answeredAt" TIMESTAMPTZ(3),
    "markedAt" TIMESTAMPTZ(3),
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,
    "questionRevision" INTEGER NOT NULL,
    "responseVersion" INTEGER NOT NULL DEFAULT 0,
    "timeSpentSeconds" INTEGER NOT NULL DEFAULT 0,
    "markingStatus" "MarkingStatus" NOT NULL DEFAULT 'PENDING',
    "position" SMALLINT NOT NULL,
    "sectionNumber" SMALLINT,
    "difficulty" SMALLINT NOT NULL,
    "marksAvailable" SMALLINT NOT NULL,
    "marksAwarded" SMALLINT,
    "hintsUsed" SMALLINT NOT NULL DEFAULT 0,
    "isCorrect" BOOLEAN,
    "flaggedForReview" BOOLEAN NOT NULL DEFAULT false,
    "isRepeat" BOOLEAN NOT NULL DEFAULT false,
    "isCounted" BOOLEAN NOT NULL DEFAULT true,
    "response" JSONB,
    "feedback" JSONB,

    CONSTRAINT "QuestionAttempt_pkey" PRIMARY KEY ("attemptId","position")
);

-- CreateTable
CREATE TABLE "QuestionAttemptMarking" (
    "id" UUID NOT NULL,
    "attemptId" UUID NOT NULL,
    "markedById" UUID,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "source" "MarkingSource" NOT NULL,
    "resultingStatus" "MarkingStatus" NOT NULL,
    "confidence" DOUBLE PRECISION,
    "position" SMALLINT NOT NULL,
    "marksAwarded" SMALLINT NOT NULL,
    "previousMarksAwarded" SMALLINT,
    "aiModel" VARCHAR(64),
    "promptVersion" VARCHAR(32),
    "reason" VARCHAR(500),
    "points" JSONB,
    "feedback" JSONB,

    CONSTRAINT "QuestionAttemptMarking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionAttemptAttachment" (
    "attemptId" UUID NOT NULL,
    "position" SMALLINT NOT NULL,
    "mediaAssetId" UUID NOT NULL,
    "sortOrder" SMALLINT NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "QuestionAttemptAttachment_pkey" PRIMARY KEY ("attemptId","position","mediaAssetId")
);

-- CreateTable
CREATE TABLE "TopicMastery" (
    "userId" UUID NOT NULL,
    "topicId" UUID NOT NULL,
    "subjectId" UUID NOT NULL,
    "syllabusId" UUID NOT NULL,
    "firstPracticedAt" TIMESTAMPTZ(3),
    "lastPracticedAt" TIMESTAMPTZ(3),
    "nextReviewAt" TIMESTAMPTZ(3),
    "remediationStartedAt" TIMESTAMPTZ(3),
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,
    "score" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "recentAccuracy" DOUBLE PRECISION,
    "questionsAttempted" INTEGER NOT NULL DEFAULT 0,
    "questionsCorrect" INTEGER NOT NULL DEFAULT 0,
    "marksAwarded" INTEGER NOT NULL DEFAULT 0,
    "marksAvailable" INTEGER NOT NULL DEFAULT 0,
    "band" "MasteryBand" NOT NULL DEFAULT 'WEAK',
    "topicKind" "TopicKind" NOT NULL,
    "topicDepth" SMALLINT NOT NULL DEFAULT 0,
    "currentDifficulty" SMALLINT NOT NULL DEFAULT 3,
    "consecutiveCorrect" SMALLINT NOT NULL DEFAULT 0,
    "consecutiveIncorrect" SMALLINT NOT NULL DEFAULT 0,
    "algorithmVersion" SMALLINT NOT NULL DEFAULT 1,
    "isLeaf" BOOLEAN NOT NULL DEFAULT true,
    "seededByDiagnostic" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "TopicMastery_pkey" PRIMARY KEY ("userId","topicId")
);

-- CreateTable
CREATE TABLE "SubjectProgress" (
    "userId" UUID NOT NULL,
    "subjectId" UUID NOT NULL,
    "lastActivityAt" TIMESTAMPTZ(3),
    "lastMockAt" TIMESTAMPTZ(3),
    "computedAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,
    "progressPercent" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "syllabusCoveragePercent" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "averageScorePercent" DOUBLE PRECISION,
    "lastMockPercent" DOUBLE PRECISION,
    "bestMockPercent" DOUBLE PRECISION,
    "averageMockPercent" DOUBLE PRECISION,
    "readinessPercent" DOUBLE PRECISION,
    "topicsTotal" INTEGER NOT NULL DEFAULT 0,
    "topicsStarted" INTEGER NOT NULL DEFAULT 0,
    "topicsCompleted" INTEGER NOT NULL DEFAULT 0,
    "topicsMastered" INTEGER NOT NULL DEFAULT 0,
    "weakTopicsCount" INTEGER NOT NULL DEFAULT 0,
    "lessonsTotal" INTEGER NOT NULL DEFAULT 0,
    "lessonsCompleted" INTEGER NOT NULL DEFAULT 0,
    "questionsAttempted" INTEGER NOT NULL DEFAULT 0,
    "questionsCorrect" INTEGER NOT NULL DEFAULT 0,
    "marksAwarded" INTEGER NOT NULL DEFAULT 0,
    "marksAvailable" INTEGER NOT NULL DEFAULT 0,
    "assessmentsCompleted" INTEGER NOT NULL DEFAULT 0,
    "mockExamsCompleted" INTEGER NOT NULL DEFAULT 0,
    "studySeconds" INTEGER NOT NULL DEFAULT 0,
    "predictedGrade" VARCHAR(8),
    "predictedPass" BOOLEAN,
    "recommendations" JSONB,

    CONSTRAINT "SubjectProgress_pkey" PRIMARY KEY ("userId","subjectId")
);

-- CreateTable
CREATE TABLE "QuestionStats" (
    "questionId" UUID NOT NULL,
    "lastAnsweredAt" TIMESTAMPTZ(3),
    "computedAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,
    "facility" DOUBLE PRECISION,
    "correctRate" DOUBLE PRECISION,
    "calibratedFacility" DOUBLE PRECISION,
    "avgTimeSeconds" DOUBLE PRECISION,
    "discrimination" DOUBLE PRECISION,
    "empiricalDifficulty" DOUBLE PRECISION,
    "presentedCount" INTEGER NOT NULL DEFAULT 0,
    "answeredCount" INTEGER NOT NULL DEFAULT 0,
    "correctCount" INTEGER NOT NULL DEFAULT 0,
    "partialCount" INTEGER NOT NULL DEFAULT 0,
    "unansweredCount" INTEGER NOT NULL DEFAULT 0,
    "calibrationCount" INTEGER NOT NULL DEFAULT 0,
    "calibrationCorrectCount" INTEGER NOT NULL DEFAULT 0,
    "needsReviewCount" INTEGER NOT NULL DEFAULT 0,
    "hintsUsedSum" INTEGER NOT NULL DEFAULT 0,
    "marksAwardedSum" BIGINT NOT NULL DEFAULT 0,
    "marksAvailableSum" BIGINT NOT NULL DEFAULT 0,
    "timeSpentSecondsSum" BIGINT NOT NULL DEFAULT 0,
    "suspectAnswerKey" BOOLEAN NOT NULL DEFAULT false,
    "optionCounts" JSONB,

    CONSTRAINT "QuestionStats_pkey" PRIMARY KEY ("questionId")
);

-- CreateTable
CREATE TABLE "LessonProgress" (
    "userId" UUID NOT NULL,
    "lessonId" UUID NOT NULL,
    "firstViewedAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastViewedAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMPTZ(3),
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,
    "timeSpentSeconds" INTEGER NOT NULL DEFAULT 0,
    "viewCount" INTEGER NOT NULL DEFAULT 1,
    "completedRevision" INTEGER,
    "status" "LessonProgressStatus" NOT NULL DEFAULT 'IN_PROGRESS',
    "progressPercent" SMALLINT NOT NULL DEFAULT 0,
    "resumeAnchor" VARCHAR(100),

    CONSTRAINT "LessonProgress_pkey" PRIMARY KEY ("userId","lessonId")
);

-- CreateTable
CREATE TABLE "FlashcardState" (
    "userId" UUID NOT NULL,
    "flashcardId" UUID NOT NULL,
    "subjectId" UUID NOT NULL,
    "dueAt" TIMESTAMPTZ(3) NOT NULL,
    "lastReviewedAt" TIMESTAMPTZ(3),
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,
    "easeFactor" DOUBLE PRECISION NOT NULL DEFAULT 2.5,
    "intervalDays" INTEGER NOT NULL DEFAULT 0,
    "repetitions" INTEGER NOT NULL DEFAULT 0,
    "lapses" INTEGER NOT NULL DEFAULT 0,
    "reviewCount" INTEGER NOT NULL DEFAULT 0,
    "state" "FlashcardSrsState" NOT NULL DEFAULT 'NEW',
    "lastRating" "FlashcardRating",
    "learningStep" SMALLINT NOT NULL DEFAULT 0,
    "isSuspended" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "FlashcardState_pkey" PRIMARY KEY ("userId","flashcardId")
);

-- CreateTable
CREATE TABLE "FlashcardReview" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "flashcardId" UUID NOT NULL,
    "reviewedAt" TIMESTAMPTZ(3) NOT NULL,
    "previousDueAt" TIMESTAMPTZ(3),
    "newDueAt" TIMESTAMPTZ(3) NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "previousEaseFactor" DOUBLE PRECISION NOT NULL,
    "newEaseFactor" DOUBLE PRECISION NOT NULL,
    "previousIntervalDays" INTEGER NOT NULL,
    "newIntervalDays" INTEGER NOT NULL,
    "durationMs" INTEGER,
    "rating" "FlashcardRating" NOT NULL,
    "previousState" "FlashcardSrsState" NOT NULL,
    "newState" "FlashcardSrsState" NOT NULL,
    "clientReviewId" VARCHAR(64),

    CONSTRAINT "FlashcardReview_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudyPlan" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "templateId" UUID,
    "startsOn" DATE NOT NULL,
    "examDate" DATE NOT NULL,
    "generatedAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastAdaptedAt" TIMESTAMPTZ(3),
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,
    "status" "StudyPlanStatus" NOT NULL DEFAULT 'ACTIVE',
    "adaptationCount" INTEGER NOT NULL DEFAULT 0,
    "dailyTargetMinutes" SMALLINT NOT NULL,
    "weeklyTargetMinutes" SMALLINT NOT NULL,
    "generatorVersion" VARCHAR(32) NOT NULL,
    "availability" JSONB NOT NULL,
    "inputs" JSONB NOT NULL,

    CONSTRAINT "StudyPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudyPlanItem" (
    "id" UUID NOT NULL,
    "planId" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "subjectId" UUID NOT NULL,
    "topicId" UUID,
    "lessonId" UUID,
    "assessmentId" UUID,
    "assignmentId" UUID,
    "date" DATE NOT NULL,
    "completedAt" TIMESTAMPTZ(3),
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,
    "completedSeconds" INTEGER NOT NULL DEFAULT 0,
    "activityType" "StudyActivityType" NOT NULL,
    "reason" "StudyPlanItemReason" NOT NULL,
    "status" "StudyPlanItemStatus" NOT NULL DEFAULT 'PENDING',
    "sortOrder" SMALLINT NOT NULL,
    "targetMinutes" SMALLINT NOT NULL,
    "targetQuestions" SMALLINT,
    "completedQuestions" SMALLINT NOT NULL DEFAULT 0,
    "generation" SMALLINT NOT NULL DEFAULT 0,
    "reasonData" JSONB,

    CONSTRAINT "StudyPlanItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudySession" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "subjectId" UUID,
    "topicId" UUID,
    "lessonId" UUID,
    "planItemId" UUID,
    "attemptId" UUID,
    "startedAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastActiveAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endedAt" TIMESTAMPTZ(3),
    "localDate" DATE NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,
    "durationSeconds" INTEGER NOT NULL DEFAULT 0,
    "activityType" "StudyActivityType" NOT NULL,
    "channel" "ActivityChannel" NOT NULL DEFAULT 'WEB',

    CONSTRAINT "StudySession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DailyActivity" (
    "userId" UUID NOT NULL,
    "date" DATE NOT NULL,
    "firstActivityAt" TIMESTAMPTZ(3),
    "lastActivityAt" TIMESTAMPTZ(3),
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,
    "studySeconds" INTEGER NOT NULL DEFAULT 0,
    "questionsAttempted" INTEGER NOT NULL DEFAULT 0,
    "questionsCorrect" INTEGER NOT NULL DEFAULT 0,
    "flashcardsReviewed" INTEGER NOT NULL DEFAULT 0,
    "xpEarned" INTEGER NOT NULL DEFAULT 0,
    "lessonsCompleted" SMALLINT NOT NULL DEFAULT 0,
    "assessmentsCompleted" SMALLINT NOT NULL DEFAULT 0,
    "targetMinutes" SMALLINT,
    "dailyGoalMet" BOOLEAN NOT NULL DEFAULT false,
    "streakCredited" BOOLEAN NOT NULL DEFAULT false,
    "streakFreezeUsed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "DailyActivity_pkey" PRIMARY KEY ("userId","date")
);

-- CreateTable
CREATE TABLE "LearnerStats" (
    "userId" UUID NOT NULL,
    "lastStreakDate" DATE,
    "streakStartDate" DATE,
    "firstActiveDate" DATE,
    "lastActiveDate" DATE,
    "weekStartDate" DATE,
    "lastActivityAt" TIMESTAMPTZ(3),
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,
    "totalXp" INTEGER NOT NULL DEFAULT 0,
    "currentStreak" INTEGER NOT NULL DEFAULT 0,
    "longestStreak" INTEGER NOT NULL DEFAULT 0,
    "streakFreezesUsedTotal" INTEGER NOT NULL DEFAULT 0,
    "weeklyGoalXp" INTEGER,
    "weekStudySeconds" INTEGER NOT NULL DEFAULT 0,
    "weekXp" INTEGER NOT NULL DEFAULT 0,
    "weekQuestions" INTEGER NOT NULL DEFAULT 0,
    "weeksGoalMetTotal" INTEGER NOT NULL DEFAULT 0,
    "totalQuestionsAttempted" INTEGER NOT NULL DEFAULT 0,
    "totalQuestionsCorrect" INTEGER NOT NULL DEFAULT 0,
    "totalStudySeconds" INTEGER NOT NULL DEFAULT 0,
    "lessonsCompleted" INTEGER NOT NULL DEFAULT 0,
    "assessmentsCompleted" INTEGER NOT NULL DEFAULT 0,
    "mockExamsCompleted" INTEGER NOT NULL DEFAULT 0,
    "flashcardsReviewed" INTEGER NOT NULL DEFAULT 0,
    "topicsMastered" INTEGER NOT NULL DEFAULT 0,
    "streakFreezesAvailable" SMALLINT NOT NULL DEFAULT 0,
    "dailyGoalMinutes" SMALLINT,
    "weeklyGoalMinutes" SMALLINT,
    "weeklyGoalStreak" SMALLINT NOT NULL DEFAULT 0,
    "weekGoalMet" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "LearnerStats_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "XpEvent" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "occurredAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "localDate" DATE NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "amount" INTEGER NOT NULL,
    "reason" "XpReason" NOT NULL,
    "sourceType" "XpSourceType" NOT NULL,
    "sourceId" VARCHAR(100) NOT NULL,

    CONSTRAINT "XpEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Achievement" (
    "id" UUID NOT NULL,
    "code" VARCHAR(64) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" VARCHAR(500) NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,
    "xpReward" INTEGER NOT NULL DEFAULT 0,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "category" "AchievementCategory" NOT NULL,
    "tier" SMALLINT NOT NULL DEFAULT 1,
    "iconKey" VARCHAR(64) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isSecret" BOOLEAN NOT NULL DEFAULT false,
    "isDemo" BOOLEAN NOT NULL DEFAULT false,
    "criteria" JSONB NOT NULL,

    CONSTRAINT "Achievement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserAchievement" (
    "userId" UUID NOT NULL,
    "achievementId" UUID NOT NULL,
    "unlockedAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "seenAt" TIMESTAMPTZ(3),
    "context" JSONB,

    CONSTRAINT "UserAchievement_pkey" PRIMARY KEY ("userId","achievementId")
);

-- CreateTable
CREATE TABLE "LeaderboardEntry" (
    "id" UUID NOT NULL,
    "scopeId" UUID,
    "userId" UUID NOT NULL,
    "computedAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "value" DOUBLE PRECISION NOT NULL,
    "rank" INTEGER,
    "previousRank" INTEGER,
    "metric" "LeaderboardMetric" NOT NULL,
    "scopeType" "LeaderboardScope" NOT NULL,
    "periodKey" VARCHAR(16) NOT NULL,

    CONSTRAINT "LeaderboardEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Assignment" (
    "id" UUID NOT NULL,
    "classId" UUID NOT NULL,
    "createdById" UUID NOT NULL,
    "subjectId" UUID NOT NULL,
    "lessonId" UUID,
    "assessmentId" UUID,
    "topicId" UUID,
    "publishedAt" TIMESTAMPTZ(3),
    "dueAt" TIMESTAMPTZ(3),
    "closesAt" TIMESTAMPTZ(3),
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,
    "assignedCount" INTEGER NOT NULL DEFAULT 0,
    "startedCount" INTEGER NOT NULL DEFAULT 0,
    "submittedCount" INTEGER NOT NULL DEFAULT 0,
    "averageScorePercent" DOUBLE PRECISION,
    "type" "AssignmentType" NOT NULL,
    "status" "AssignmentStatus" NOT NULL DEFAULT 'DRAFT',
    "aiHelp" "AssignmentAiHelp" NOT NULL DEFAULT 'HINTS_ONLY',
    "scorePolicy" "AssignmentScorePolicy" NOT NULL DEFAULT 'BEST',
    "maxAttempts" SMALLINT,
    "allowLateSubmission" BOOLEAN NOT NULL DEFAULT true,
    "title" VARCHAR(200) NOT NULL,
    "instructions" TEXT,
    "instructionsHtml" TEXT,
    "practiceConfig" JSONB,

    CONSTRAINT "Assignment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AssignmentProgress" (
    "assignmentId" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "attemptId" UUID,
    "startedAt" TIMESTAMPTZ(3),
    "submittedAt" TIMESTAMPTZ(3),
    "completedAt" TIMESTAMPTZ(3),
    "feedbackAt" TIMESTAMPTZ(3),
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,
    "scorePercent" DOUBLE PRECISION,
    "marksAwarded" INTEGER,
    "totalMarks" INTEGER,
    "status" "AssignmentProgressStatus" NOT NULL DEFAULT 'NOT_STARTED',
    "attemptsCount" SMALLINT NOT NULL DEFAULT 0,
    "progressPercent" SMALLINT NOT NULL DEFAULT 0,
    "teacherFeedback" VARCHAR(2000),

    CONSTRAINT "AssignmentProgress_pkey" PRIMARY KEY ("assignmentId","userId")
);

-- CreateTable
CREATE TABLE "ShareableResult" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "attemptId" UUID,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMPTZ(3) NOT NULL,
    "revokedAt" TIMESTAMPTZ(3),
    "lastViewedAt" TIMESTAMPTZ(3),
    "viewCount" INTEGER NOT NULL DEFAULT 0,
    "kind" "ShareableResultKind" NOT NULL,
    "tokenHash" CHAR(64) NOT NULL,
    "snapshot" JSONB NOT NULL,

    CONSTRAINT "ShareableResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "emailNormalized" VARCHAR(254),
    "phoneE164" VARCHAR(16),
    "loginUsername" VARCHAR(32),
    "contactPhoneE164" VARCHAR(16),
    "provisionedBySchoolId" UUID,
    "emailVerifiedAt" TIMESTAMPTZ(3),
    "phoneVerifiedAt" TIMESTAMPTZ(3),
    "passwordHash" TEXT,
    "passwordUpdatedAt" TIMESTAMPTZ(3),
    "roles" "Role"[] DEFAULT ARRAY[]::"Role"[],
    "status" "UserStatus" NOT NULL DEFAULT 'ACTIVE',
    "statusReason" VARCHAR(500),
    "statusChangedAt" TIMESTAMPTZ(3),
    "failedLoginCount" INTEGER NOT NULL DEFAULT 0,
    "lockedUntil" TIMESTAMPTZ(3),
    "lastLoginAt" TIMESTAMPTZ(3),
    "lastActiveAt" TIMESTAMPTZ(3),
    "signupChannel" "ActivityChannel" NOT NULL DEFAULT 'WEB',
    "isDemo" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMPTZ(3),
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "userId" UUID NOT NULL,
    "firstName" VARCHAR(100),
    "lastName" VARCHAR(100),
    "displayName" VARCHAR(100),
    "username" VARCHAR(30),
    "avatarAssetId" UUID,
    "countryId" UUID,
    "timezone" VARCHAR(64) NOT NULL DEFAULT 'Africa/Harare',
    "locale" VARCHAR(16) NOT NULL DEFAULT 'en',
    "preferredCurrency" CHAR(3),
    "birthYear" SMALLINT,
    "fontScale" "FontScale" NOT NULL DEFAULT 'DEFAULT',
    "reducedMotion" BOOLEAN,
    "highContrast" BOOLEAN NOT NULL DEFAULT false,
    "theme" "ThemePreference" NOT NULL DEFAULT 'SYSTEM',
    "dataSaver" BOOLEAN NOT NULL DEFAULT false,
    "offlineCacheEnabled" BOOLEAN NOT NULL DEFAULT true,
    "leaderboardOptIn" BOOLEAN NOT NULL DEFAULT false,
    "leaderboardDisplay" "LeaderboardDisplay" NOT NULL DEFAULT 'USERNAME',
    "marketingEmailOptInAt" TIMESTAMPTZ(3),
    "marketingSmsOptInAt" TIMESTAMPTZ(3),
    "marketingWhatsappOptInAt" TIMESTAMPTZ(3),
    "termsAcceptedAt" TIMESTAMPTZ(3),
    "termsVersion" VARCHAR(32),
    "privacyNoticeVersion" VARCHAR(32),
    "notificationPrefs" JSONB,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Student" (
    "userId" UUID NOT NULL,
    "countryId" UUID,
    "examBoardId" UUID,
    "qualificationId" UUID,
    "yearGroupId" UUID,
    "abilityLevel" "AbilityLevel",
    "targetGrade" VARCHAR(8),
    "targetExamSessionId" UUID,
    "schoolId" UUID,
    "declaredSchoolName" VARCHAR(200),
    "onboardingStep" "OnboardingStep" NOT NULL DEFAULT 'COUNTRY',
    "onboardingData" JSONB,
    "onboardingCompletedAt" TIMESTAMPTZ(3),
    "diagnosticCompletedAt" TIMESTAMPTZ(3),
    "diagnosticSkippedAt" TIMESTAMPTZ(3),
    "isMinor" BOOLEAN NOT NULL DEFAULT true,
    "guardianConsentStatus" "GuardianConsentStatus" NOT NULL DEFAULT 'PENDING',
    "guardianConsentAt" TIMESTAMPTZ(3),
    "guardianConsentMethod" "GuardianConsentMethod",
    "guardianConsentByUserId" UUID,
    "guardianConsentEvidenceRef" VARCHAR(255),
    "examExtraTimePercent" SMALLINT,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Parent" (
    "userId" UUID NOT NULL,
    "onboardingCompletedAt" TIMESTAMPTZ(3),
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "Parent_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Teacher" (
    "userId" UUID NOT NULL,
    "title" VARCHAR(32),
    "bio" VARCHAR(1000),
    "verifiedAt" TIMESTAMPTZ(3),
    "verifiedById" UUID,
    "onboardingCompletedAt" TIMESTAMPTZ(3),
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "Teacher_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "ParentStudentLink" (
    "id" UUID NOT NULL,
    "parentUserId" UUID,
    "studentUserId" UUID,
    "status" "ParentLinkStatus" NOT NULL DEFAULT 'PENDING',
    "relationship" "GuardianRelationship" NOT NULL DEFAULT 'PARENT',
    "initiatedBy" "ParentLinkInitiator" NOT NULL,
    "consentBasis" "ParentLinkConsentBasis",
    "inviteCodeHash" CHAR(64),
    "inviteExpiresAt" TIMESTAMPTZ(3),
    "studentConsentAt" TIMESTAMPTZ(3),
    "activatedAt" TIMESTAMPTZ(3),
    "canViewProgress" BOOLEAN NOT NULL DEFAULT true,
    "canViewStudyActivity" BOOLEAN NOT NULL DEFAULT true,
    "canViewTestResults" BOOLEAN NOT NULL DEFAULT true,
    "canViewAiConversations" BOOLEAN NOT NULL DEFAULT false,
    "aiConversationsConsentAt" TIMESTAMPTZ(3),
    "revokedAt" TIMESTAMPTZ(3),
    "revokedById" UUID,
    "revokeReason" VARCHAR(255),
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "ParentStudentLink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" UUID NOT NULL,
    "tokenHash" CHAR(64) NOT NULL,
    "userId" UUID NOT NULL,
    "kind" "SessionKind" NOT NULL DEFAULT 'WEB',
    "authMethod" "AuthMethod" NOT NULL,
    "label" VARCHAR(100),
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastSeenAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMPTZ(3) NOT NULL,
    "absoluteExpiresAt" TIMESTAMPTZ(3),
    "reauthenticatedAt" TIMESTAMPTZ(3),
    "revokedAt" TIMESTAMPTZ(3),
    "revokedReason" VARCHAR(64),
    "userAgent" VARCHAR(512),
    "ipHash" CHAR(64),

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OAuthAccount" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "provider" VARCHAR(32) NOT NULL,
    "providerAccountId" VARCHAR(255) NOT NULL,
    "emailNormalized" VARCHAR(254),
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "lastLoginAt" TIMESTAMPTZ(3),
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "OAuthAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationCode" (
    "id" UUID NOT NULL,
    "purpose" "VerificationPurpose" NOT NULL,
    "channel" "VerificationChannel" NOT NULL,
    "target" VARCHAR(254) NOT NULL,
    "userId" UUID,
    "codeHash" CHAR(64) NOT NULL,
    "attempts" SMALLINT NOT NULL DEFAULT 0,
    "maxAttempts" SMALLINT NOT NULL DEFAULT 5,
    "context" JSONB,
    "ipHash" CHAR(64),
    "expiresAt" TIMESTAMPTZ(3) NOT NULL,
    "consumedAt" TIMESTAMPTZ(3),
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VerificationCode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PrivacyRequest" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "requestedById" UUID,
    "kind" "PrivacyRequestKind" NOT NULL,
    "status" "PrivacyRequestStatus" NOT NULL DEFAULT 'REQUESTED',
    "scheduledFor" TIMESTAMPTZ(3) NOT NULL,
    "completedAt" TIMESTAMPTZ(3),
    "cancelledAt" TIMESTAMPTZ(3),
    "failureReason" VARCHAR(500),
    "exportStorageKey" VARCHAR(512),
    "exportExpiresAt" TIMESTAMPTZ(3),
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "PrivacyRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PushSubscription" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "endpoint" TEXT NOT NULL,
    "p256dh" VARCHAR(255) NOT NULL,
    "auth" VARCHAR(255) NOT NULL,
    "userAgent" VARCHAR(512),
    "lastUsedAt" TIMESTAMPTZ(3),
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PushSubscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "School" (
    "id" UUID NOT NULL,
    "name" VARCHAR(200) NOT NULL,
    "slug" VARCHAR(120) NOT NULL,
    "countryId" UUID NOT NULL,
    "region" VARCHAR(100),
    "district" VARCHAR(100),
    "town" VARCHAR(100),
    "type" "SchoolType" NOT NULL,
    "status" "SchoolStatus" NOT NULL DEFAULT 'PENDING_VERIFICATION',
    "officialCode" VARCHAR(32),
    "contactEmail" VARCHAR(254),
    "contactPhone" VARCHAR(16),
    "website" VARCHAR(255),
    "logoAssetId" UUID,
    "timezone" VARCHAR(64) NOT NULL DEFAULT 'Africa/Harare',
    "settings" JSONB,
    "verifiedAt" TIMESTAMPTZ(3),
    "verifiedById" UUID,
    "createdById" UUID,
    "isDemo" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "School_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SchoolMember" (
    "id" UUID NOT NULL,
    "schoolId" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "role" "SchoolMemberRole" NOT NULL,
    "status" "SchoolMemberStatus" NOT NULL DEFAULT 'INVITED',
    "source" "MembershipSource" NOT NULL DEFAULT 'ADDED_BY_STAFF',
    "studentNumber" VARCHAR(32),
    "invitedById" UUID,
    "invitedAt" TIMESTAMPTZ(3),
    "joinedAt" TIMESTAMPTZ(3),
    "removedAt" TIMESTAMPTZ(3),
    "removedById" UUID,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "SchoolMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SchoolSubject" (
    "id" UUID NOT NULL,
    "schoolId" UUID NOT NULL,
    "subjectId" UUID NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "SchoolSubject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Class" (
    "id" UUID NOT NULL,
    "schoolId" UUID,
    "name" VARCHAR(120) NOT NULL,
    "description" VARCHAR(1000),
    "subjectId" UUID,
    "qualificationId" UUID,
    "yearGroupId" UUID,
    "academicYear" VARCHAR(16) NOT NULL,
    "joinCode" VARCHAR(10),
    "joinRequiresApproval" BOOLEAN NOT NULL DEFAULT false,
    "createdById" UUID NOT NULL,
    "archivedAt" TIMESTAMPTZ(3),
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "Class_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClassTeacher" (
    "id" UUID NOT NULL,
    "classId" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "role" "ClassTeacherRole" NOT NULL DEFAULT 'LEAD',
    "addedAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "removedAt" TIMESTAMPTZ(3),
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "ClassTeacher_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClassMember" (
    "id" UUID NOT NULL,
    "classId" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "status" "ClassMemberStatus" NOT NULL DEFAULT 'ACTIVE',
    "source" "MembershipSource" NOT NULL DEFAULT 'JOIN_CODE',
    "joinedAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "removedAt" TIMESTAMPTZ(3),
    "removedById" UUID,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "ClassMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Invitation" (
    "id" UUID NOT NULL,
    "kind" "InvitationKind" NOT NULL,
    "schoolId" UUID,
    "classId" UUID,
    "schoolRole" "SchoolMemberRole",
    "platformRole" "Role",
    "channel" "VerificationChannel" NOT NULL,
    "target" VARCHAR(254),
    "tokenHash" CHAR(64) NOT NULL,
    "invitedById" UUID,
    "expiresAt" TIMESTAMPTZ(3) NOT NULL,
    "lastSentAt" TIMESTAMPTZ(3),
    "sendCount" SMALLINT NOT NULL DEFAULT 1,
    "acceptedAt" TIMESTAMPTZ(3),
    "acceptedByUserId" UUID,
    "revokedAt" TIMESTAMPTZ(3),
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "Invitation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Announcement" (
    "id" UUID NOT NULL,
    "scope" "AnnouncementScope" NOT NULL,
    "schoolId" UUID,
    "classId" UUID,
    "countryId" UUID,
    "authorId" UUID NOT NULL,
    "title" VARCHAR(200) NOT NULL,
    "body" TEXT NOT NULL,
    "bodyHtml" TEXT NOT NULL,
    "audienceRoles" "Role"[] DEFAULT ARRAY[]::"Role"[],
    "pinned" BOOLEAN NOT NULL DEFAULT false,
    "notify" BOOLEAN NOT NULL DEFAULT true,
    "publishedAt" TIMESTAMPTZ(3),
    "expiresAt" TIMESTAMPTZ(3),
    "fannedOutAt" TIMESTAMPTZ(3),
    "archivedAt" TIMESTAMPTZ(3),
    "isDemo" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "Announcement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "type" VARCHAR(64) NOT NULL,
    "category" "NotificationCategory" NOT NULL,
    "title" VARCHAR(200) NOT NULL,
    "body" VARCHAR(2000) NOT NULL,
    "data" JSONB,
    "channels" "NotificationChannel"[] DEFAULT ARRAY['IN_APP']::"NotificationChannel"[],
    "deliveries" JSONB,
    "dedupeKey" VARCHAR(128),
    "announcementId" UUID,
    "readAt" TIMESTAMPTZ(3),
    "expiresAt" TIMESTAMPTZ(3),
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SchoolReport" (
    "id" UUID NOT NULL,
    "schoolId" UUID NOT NULL,
    "kind" VARCHAR(64) NOT NULL,
    "periodStart" DATE NOT NULL,
    "periodEnd" DATE NOT NULL,
    "parameters" JSONB NOT NULL,
    "status" "SchoolReportStatus" NOT NULL DEFAULT 'QUEUED',
    "mediaAssetId" UUID,
    "requestedById" UUID,
    "jobId" UUID,
    "generatedAt" TIMESTAMPTZ(3),
    "expiresAt" TIMESTAMPTZ(3),
    "error" VARCHAR(1000),
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "SchoolReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Plan" (
    "id" UUID NOT NULL,
    "code" VARCHAR(32) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "tagline" VARCHAR(200),
    "description" TEXT,
    "highlights" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "audience" "PlanAudience" NOT NULL,
    "entitlements" JSONB NOT NULL,
    "trialDays" SMALLINT NOT NULL DEFAULT 0,
    "isPublic" BOOLEAN NOT NULL DEFAULT true,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isDemo" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "Plan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlanPrice" (
    "id" UUID NOT NULL,
    "planId" UUID,
    "studyPackId" UUID,
    "countryId" UUID,
    "currency" CHAR(3) NOT NULL,
    "amountMinor" INTEGER NOT NULL,
    "interval" "BillingInterval" NOT NULL,
    "intervalCount" SMALLINT NOT NULL DEFAULT 1,
    "periodDays" SMALLINT,
    "perSeat" BOOLEAN NOT NULL DEFAULT false,
    "minSeats" INTEGER,
    "label" VARCHAR(100),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "validFrom" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "validTo" TIMESTAMPTZ(3),
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isDemo" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "PlanPrice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subscription" (
    "id" UUID NOT NULL,
    "planId" UUID NOT NULL,
    "planPriceId" UUID,
    "holderUserId" UUID,
    "schoolId" UUID,
    "payerUserId" UUID,
    "status" "SubscriptionStatus" NOT NULL DEFAULT 'PENDING',
    "source" "SubscriptionSource" NOT NULL DEFAULT 'CHECKOUT',
    "seats" INTEGER,
    "startedAt" TIMESTAMPTZ(3),
    "currentPeriodStart" TIMESTAMPTZ(3),
    "currentPeriodEnd" TIMESTAMPTZ(3),
    "trialEndsAt" TIMESTAMPTZ(3),
    "cancelAtPeriodEnd" BOOLEAN NOT NULL DEFAULT false,
    "cancelledAt" TIMESTAMPTZ(3),
    "cancelReason" VARCHAR(500),
    "endedAt" TIMESTAMPTZ(3),
    "autoRenew" BOOLEAN NOT NULL DEFAULT false,
    "provider" VARCHAR(32),
    "providerSubscriptionRef" VARCHAR(255),
    "createdById" UUID,
    "notes" VARCHAR(2000),
    "metadata" JSONB,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" UUID NOT NULL,
    "purpose" "PaymentPurpose" NOT NULL,
    "status" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "provider" VARCHAR(32) NOT NULL,
    "method" VARCHAR(32),
    "providerReference" VARCHAR(255),
    "providerPollUrl" VARCHAR(1024),
    "payerUserId" UUID NOT NULL,
    "beneficiaryUserId" UUID,
    "schoolId" UUID,
    "subscriptionId" UUID,
    "studyPackId" UUID,
    "planPriceId" UUID,
    "promoCodeId" UUID,
    "amountMinor" INTEGER NOT NULL,
    "currency" CHAR(3) NOT NULL,
    "listAmountMinor" INTEGER,
    "discountMinor" INTEGER NOT NULL DEFAULT 0,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "idempotencyKey" VARCHAR(64) NOT NULL,
    "receiptNumber" VARCHAR(32),
    "servicePeriodStart" TIMESTAMPTZ(3),
    "servicePeriodEnd" TIMESTAMPTZ(3),
    "expiresAt" TIMESTAMPTZ(3),
    "paidAt" TIMESTAMPTZ(3),
    "failedAt" TIMESTAMPTZ(3),
    "cancelledAt" TIMESTAMPTZ(3),
    "fulfilledAt" TIMESTAMPTZ(3),
    "failureCode" VARCHAR(64),
    "failureReason" VARCHAR(500),
    "refundedAmountMinor" INTEGER NOT NULL DEFAULT 0,
    "refundedAt" TIMESTAMPTZ(3),
    "refundReason" VARCHAR(500),
    "refundedById" UUID,
    "payerFingerprint" CHAR(64),
    "metadata" JSONB,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaymentEvent" (
    "id" UUID NOT NULL,
    "paymentId" UUID,
    "provider" VARCHAR(32) NOT NULL,
    "providerEventId" VARCHAR(255) NOT NULL,
    "source" "PaymentEventSource" NOT NULL,
    "eventType" VARCHAR(64) NOT NULL,
    "providerStatus" VARCHAR(64),
    "mappedStatus" "PaymentStatus",
    "amountMinor" INTEGER,
    "currency" CHAR(3),
    "signatureValid" BOOLEAN NOT NULL,
    "payload" JSONB NOT NULL,
    "processedAt" TIMESTAMPTZ(3),
    "processingError" TEXT,
    "recordedById" UUID,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PaymentEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EntitlementGrant" (
    "id" UUID NOT NULL,
    "userId" UUID,
    "schoolId" UUID,
    "source" "EntitlementSource" NOT NULL,
    "planId" UUID,
    "studyPackId" UUID,
    "features" JSONB,
    "subscriptionId" UUID,
    "paymentId" UUID,
    "startsAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endsAt" TIMESTAMPTZ(3),
    "revokedAt" TIMESTAMPTZ(3),
    "revokedById" UUID,
    "revokeReason" VARCHAR(500),
    "grantedById" UUID,
    "reason" VARCHAR(500),
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "EntitlementGrant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PromoCode" (
    "id" UUID NOT NULL,
    "code" VARCHAR(32) NOT NULL,
    "description" VARCHAR(500),
    "discountType" "PromoDiscountType" NOT NULL,
    "percentOff" SMALLINT,
    "amountOffMinor" INTEGER,
    "currency" CHAR(3),
    "freeDays" SMALLINT,
    "grantPlanId" UUID,
    "audience" "PlanAudience",
    "appliesToStudyPacks" BOOLEAN NOT NULL DEFAULT false,
    "newCustomersOnly" BOOLEAN NOT NULL DEFAULT false,
    "maxRedemptions" INTEGER,
    "redeemedCount" INTEGER NOT NULL DEFAULT 0,
    "validFrom" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "validTo" TIMESTAMPTZ(3),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isDemo" BOOLEAN NOT NULL DEFAULT false,
    "createdById" UUID,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "PromoCode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PromoCodePlan" (
    "id" UUID NOT NULL,
    "promoCodeId" UUID NOT NULL,
    "planId" UUID NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PromoCodePlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PromoRedemption" (
    "id" UUID NOT NULL,
    "promoCodeId" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "status" "PromoRedemptionStatus" NOT NULL DEFAULT 'RESERVED',
    "paymentId" UUID,
    "grantId" UUID,
    "discountMinor" INTEGER,
    "currency" CHAR(3),
    "appliedAt" TIMESTAMPTZ(3),
    "releasedAt" TIMESTAMPTZ(3),
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "PromoRedemption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReferralCode" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "code" VARCHAR(32) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "disabledAt" TIMESTAMPTZ(3),
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "ReferralCode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Referral" (
    "id" UUID NOT NULL,
    "referralCodeId" UUID NOT NULL,
    "referrerUserId" UUID NOT NULL,
    "referredUserId" UUID NOT NULL,
    "status" "ReferralStatus" NOT NULL DEFAULT 'PENDING',
    "qualifyingPaymentId" UUID,
    "qualifiedAt" TIMESTAMPTZ(3),
    "rewardGrantId" UUID,
    "refereeRewardGrantId" UUID,
    "rewardedAt" TIMESTAMPTZ(3),
    "rejectedAt" TIMESTAMPTZ(3),
    "rejectReason" VARCHAR(64),
    "signupIpHash" CHAR(64),
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "Referral_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AiConversation" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "mode" "AiConversationMode" NOT NULL,
    "status" "AiConversationStatus" NOT NULL DEFAULT 'ACTIVE',
    "channel" "ActivityChannel" NOT NULL DEFAULT 'WEB',
    "subjectId" UUID,
    "topicId" UUID,
    "questionId" UUID,
    "assignmentId" UUID,
    "aiHelp" "AssignmentAiHelp",
    "title" VARCHAR(200),
    "modelTier" "AiModelTier",
    "model" VARCHAR(64),
    "promptVersion" VARCHAR(32),
    "contextSnapshot" JSONB,
    "summary" TEXT,
    "summarizedThrough" TIMESTAMPTZ(3),
    "messageCount" INTEGER NOT NULL DEFAULT 0,
    "userMessageCount" INTEGER NOT NULL DEFAULT 0,
    "inputTokens" INTEGER NOT NULL DEFAULT 0,
    "outputTokens" INTEGER NOT NULL DEFAULT 0,
    "cacheReadTokens" INTEGER NOT NULL DEFAULT 0,
    "cacheWriteTokens" INTEGER NOT NULL DEFAULT 0,
    "costMicros" INTEGER NOT NULL DEFAULT 0,
    "lastMessageAt" TIMESTAMPTZ(3),
    "archivedAt" TIMESTAMPTZ(3),
    "safetyFlaggedAt" TIMESTAMPTZ(3),
    "safetyCategory" VARCHAR(64),
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "AiConversation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AiMessage" (
    "id" UUID NOT NULL,
    "conversationId" UUID NOT NULL,
    "role" "AiMessageRole" NOT NULL,
    "status" "AiMessageStatus" NOT NULL DEFAULT 'COMPLETE',
    "intent" "AiIntent",
    "hintLevel" SMALLINT,
    "content" TEXT NOT NULL,
    "contentPurgedAt" TIMESTAMPTZ(3),
    "attachmentAssetId" UUID,
    "model" VARCHAR(64),
    "tier" "AiModelTier",
    "promptVersion" VARCHAR(32),
    "servedByFallback" BOOLEAN NOT NULL DEFAULT false,
    "inputTokens" INTEGER NOT NULL DEFAULT 0,
    "outputTokens" INTEGER NOT NULL DEFAULT 0,
    "cacheReadTokens" INTEGER NOT NULL DEFAULT 0,
    "cacheWriteTokens" INTEGER NOT NULL DEFAULT 0,
    "costMicros" INTEGER NOT NULL DEFAULT 0,
    "latencyMs" INTEGER,
    "stopReason" VARCHAR(32),
    "cached" BOOLEAN NOT NULL DEFAULT false,
    "cacheEntryId" UUID,
    "clientMessageId" VARCHAR(64),
    "userRating" SMALLINT,
    "ratedAt" TIMESTAMPTZ(3),
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AiMessage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AiUsageDaily" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "date" DATE NOT NULL,
    "feature" "AiFeature" NOT NULL,
    "requests" INTEGER NOT NULL DEFAULT 0,
    "reservedRequests" INTEGER NOT NULL DEFAULT 0,
    "cacheHits" INTEGER NOT NULL DEFAULT 0,
    "deepRequests" INTEGER NOT NULL DEFAULT 0,
    "images" INTEGER NOT NULL DEFAULT 0,
    "inputTokens" INTEGER NOT NULL DEFAULT 0,
    "outputTokens" INTEGER NOT NULL DEFAULT 0,
    "cacheReadTokens" INTEGER NOT NULL DEFAULT 0,
    "cacheWriteTokens" INTEGER NOT NULL DEFAULT 0,
    "costMicros" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "AiUsageDaily_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AiSpendDaily" (
    "date" DATE NOT NULL,
    "shard" SMALLINT NOT NULL,
    "costMicros" BIGINT NOT NULL DEFAULT 0,
    "requests" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "AiSpendDaily_pkey" PRIMARY KEY ("date","shard")
);

-- CreateTable
CREATE TABLE "AiResponseCache" (
    "id" UUID NOT NULL,
    "cacheKey" CHAR(64) NOT NULL,
    "feature" "AiFeature" NOT NULL,
    "model" VARCHAR(64) NOT NULL,
    "promptVersion" VARCHAR(32) NOT NULL,
    "subjectId" UUID,
    "response" TEXT NOT NULL,
    "inputTokens" INTEGER NOT NULL DEFAULT 0,
    "outputTokens" INTEGER NOT NULL DEFAULT 0,
    "costMicros" INTEGER NOT NULL DEFAULT 0,
    "hitCount" INTEGER NOT NULL DEFAULT 0,
    "lastHitAt" TIMESTAMPTZ(3),
    "expiresAt" TIMESTAMPTZ(3) NOT NULL,
    "invalidatedAt" TIMESTAMPTZ(3),
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AiResponseCache_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AiGenerationJob" (
    "id" UUID NOT NULL,
    "requestedById" UUID NOT NULL,
    "kind" "AiGenerationKind" NOT NULL,
    "status" "AiGenerationStatus" NOT NULL DEFAULT 'QUEUED',
    "syllabusId" UUID,
    "subjectId" UUID,
    "topicId" UUID,
    "params" JSONB NOT NULL,
    "itemsRequested" INTEGER,
    "itemsCreated" INTEGER NOT NULL DEFAULT 0,
    "model" VARCHAR(64),
    "tier" "AiModelTier",
    "promptVersion" VARCHAR(32),
    "providerBatchId" VARCHAR(128),
    "estimatedCostMicros" INTEGER,
    "inputTokens" INTEGER NOT NULL DEFAULT 0,
    "outputTokens" INTEGER NOT NULL DEFAULT 0,
    "cacheReadTokens" INTEGER NOT NULL DEFAULT 0,
    "cacheWriteTokens" INTEGER NOT NULL DEFAULT 0,
    "costMicros" INTEGER NOT NULL DEFAULT 0,
    "outputSummary" JSONB,
    "error" TEXT,
    "jobId" UUID,
    "startedAt" TIMESTAMPTZ(3),
    "completedAt" TIMESTAMPTZ(3),
    "cancelledAt" TIMESTAMPTZ(3),
    "cancelledById" UUID,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "AiGenerationJob_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChannelIdentity" (
    "id" UUID NOT NULL,
    "userId" UUID,
    "channel" "ChannelType" NOT NULL,
    "externalId" VARCHAR(64) NOT NULL,
    "verifiedAt" TIMESTAMPTZ(3),
    "linkedAt" TIMESTAMPTZ(3),
    "optedInAt" TIMESTAMPTZ(3),
    "optedOutAt" TIMESTAMPTZ(3),
    "lastInboundAt" TIMESTAMPTZ(3),
    "lastOutboundAt" TIMESTAMPTZ(3),
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "ChannelIdentity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChannelMessage" (
    "id" UUID NOT NULL,
    "identityId" UUID,
    "channel" "ChannelType" NOT NULL,
    "direction" "MessageDirection" NOT NULL,
    "status" "ChannelMessageStatus" NOT NULL,
    "contentClass" "ChannelContentClass" NOT NULL DEFAULT 'STANDARD',
    "aiMessageId" UUID,
    "externalMessageId" VARCHAR(128),
    "messageType" VARCHAR(32) NOT NULL DEFAULT 'text',
    "templateName" VARCHAR(128),
    "body" TEXT,
    "bodyPurgedAt" TIMESTAMPTZ(3),
    "payload" JSONB,
    "error" VARCHAR(1000),
    "pricingCategory" VARCHAR(32),
    "notificationId" UUID,
    "inReplyToId" UUID,
    "sentAt" TIMESTAMPTZ(3),
    "deliveredAt" TIMESTAMPTZ(3),
    "readAt" TIMESTAMPTZ(3),
    "failedAt" TIMESTAMPTZ(3),
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "ChannelMessage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChannelConversationState" (
    "identityId" UUID NOT NULL,
    "state" "ChannelConversationStateKind" NOT NULL DEFAULT 'IDLE',
    "pendingAttemptId" UUID,
    "pendingPosition" SMALLINT,
    "context" JSONB,
    "expiresAt" TIMESTAMPTZ(3),
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "ChannelConversationState_pkey" PRIMARY KEY ("identityId")
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" UUID NOT NULL,
    "actorUserId" UUID,
    "actorKind" "AuditActorKind" NOT NULL DEFAULT 'USER',
    "actorRoles" "Role"[] DEFAULT ARRAY[]::"Role"[],
    "action" VARCHAR(100) NOT NULL,
    "entityType" VARCHAR(64) NOT NULL,
    "entityId" VARCHAR(128),
    "schoolId" UUID,
    "targetUserId" UUID,
    "before" JSONB,
    "after" JSONB,
    "metadata" JSONB,
    "reason" VARCHAR(500),
    "requestId" VARCHAR(64),
    "ipHash" CHAR(64),
    "userAgent" VARCHAR(512),
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Job" (
    "id" UUID NOT NULL,
    "queue" VARCHAR(32) NOT NULL DEFAULT 'default',
    "type" VARCHAR(100) NOT NULL,
    "payload" JSONB NOT NULL DEFAULT '{}',
    "status" "JobStatus" NOT NULL DEFAULT 'PENDING',
    "priority" SMALLINT NOT NULL DEFAULT 0,
    "runAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "attempts" SMALLINT NOT NULL DEFAULT 0,
    "maxAttempts" SMALLINT NOT NULL DEFAULT 5,
    "lockedAt" TIMESTAMPTZ(3),
    "lockedBy" VARCHAR(128),
    "lastError" TEXT,
    "dedupeKey" VARCHAR(255),
    "result" JSONB,
    "completedAt" TIMESTAMPTZ(3),
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "Job_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RateLimitBucket" (
    "key" VARCHAR(255) NOT NULL,
    "windowStart" TIMESTAMPTZ(3) NOT NULL,
    "windowSeconds" INTEGER NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,
    "prevCount" INTEGER NOT NULL DEFAULT 0,
    "expiresAt" TIMESTAMPTZ(3) NOT NULL,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "RateLimitBucket_pkey" PRIMARY KEY ("key")
);

-- CreateTable
CREATE TABLE "Setting" (
    "key" VARCHAR(128) NOT NULL,
    "value" JSONB NOT NULL,
    "description" VARCHAR(500),
    "version" INTEGER NOT NULL DEFAULT 1,
    "updatedById" UUID,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "Setting_pkey" PRIMARY KEY ("key")
);

-- CreateTable
CREATE TABLE "DailyMetric" (
    "id" UUID NOT NULL,
    "date" DATE NOT NULL,
    "metric" VARCHAR(64) NOT NULL,
    "dimension" VARCHAR(128) NOT NULL DEFAULT '',
    "value" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "DailyMetric_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Country_isoCode_key" ON "Country"("isoCode");

-- CreateIndex
CREATE UNIQUE INDEX "Country_slug_key" ON "Country"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "ExamBoard_slug_key" ON "ExamBoard"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "ExamBoard_code_key" ON "ExamBoard"("code");

-- CreateIndex
CREATE INDEX "ExamBoard_homeCountryId_idx" ON "ExamBoard"("homeCountryId");

-- CreateIndex
CREATE INDEX "ExamBoard_logoMediaId_idx" ON "ExamBoard"("logoMediaId");

-- CreateIndex
CREATE INDEX "ExamBoardCountry_examBoardId_idx" ON "ExamBoardCountry"("examBoardId");

-- CreateIndex
CREATE UNIQUE INDEX "QualificationLevel_slug_key" ON "QualificationLevel"("slug");

-- CreateIndex
CREATE INDEX "Qualification_levelId_idx" ON "Qualification"("levelId");

-- CreateIndex
CREATE UNIQUE INDEX "Qualification_examBoardId_slug_key" ON "Qualification"("examBoardId", "slug");

-- CreateIndex
CREATE INDEX "YearGroup_typicalLevelId_idx" ON "YearGroup"("typicalLevelId");

-- CreateIndex
CREATE UNIQUE INDEX "YearGroup_countryId_code_key" ON "YearGroup"("countryId", "code");

-- CreateIndex
CREATE UNIQUE INDEX "SubjectCategory_slug_key" ON "SubjectCategory"("slug");

-- CreateIndex
CREATE INDEX "Subject_categoryId_idx" ON "Subject"("categoryId");

-- CreateIndex
CREATE INDEX "Subject_sourceId_idx" ON "Subject"("sourceId");

-- CreateIndex
CREATE UNIQUE INDEX "Subject_qualificationId_slug_key" ON "Subject"("qualificationId", "slug");

-- CreateIndex
CREATE INDEX "Syllabus_subjectId_status_effectiveFrom_idx" ON "Syllabus"("subjectId", "status", "effectiveFrom");

-- CreateIndex
CREATE INDEX "Syllabus_supersedesId_idx" ON "Syllabus"("supersedesId");

-- CreateIndex
CREATE INDEX "Syllabus_gradeSchemeId_idx" ON "Syllabus"("gradeSchemeId");

-- CreateIndex
CREATE INDEX "Syllabus_sourceId_idx" ON "Syllabus"("sourceId");

-- CreateIndex
CREATE INDEX "Syllabus_createdById_idx" ON "Syllabus"("createdById");

-- CreateIndex
CREATE INDEX "Syllabus_publishedById_idx" ON "Syllabus"("publishedById");

-- CreateIndex
CREATE UNIQUE INDEX "Syllabus_subjectId_versionLabel_key" ON "Syllabus"("subjectId", "versionLabel");

-- CreateIndex
CREATE UNIQUE INDEX "Syllabus_id_subjectId_key" ON "Syllabus"("id", "subjectId");

-- CreateIndex
CREATE UNIQUE INDEX "SyllabusComponent_syllabusId_code_key" ON "SyllabusComponent"("syllabusId", "code");

-- CreateIndex
CREATE INDEX "SyllabusRoute_gradeSchemeId_idx" ON "SyllabusRoute"("gradeSchemeId");

-- CreateIndex
CREATE UNIQUE INDEX "SyllabusRoute_syllabusId_code_key" ON "SyllabusRoute"("syllabusId", "code");

-- CreateIndex
CREATE UNIQUE INDEX "SyllabusRoute_id_syllabusId_key" ON "SyllabusRoute"("id", "syllabusId");

-- CreateIndex
CREATE INDEX "SyllabusRouteComponent_componentId_idx" ON "SyllabusRouteComponent"("componentId");

-- CreateIndex
CREATE INDEX "Topic_syllabusId_path_idx" ON "Topic"("syllabusId", "path");

-- CreateIndex
CREATE INDEX "Topic_parentId_sortOrder_idx" ON "Topic"("parentId", "sortOrder");

-- CreateIndex
CREATE INDEX "Topic_originTopicId_idx" ON "Topic"("originTopicId");

-- CreateIndex
CREATE INDEX "Topic_importId_idx" ON "Topic"("importId");

-- CreateIndex
CREATE UNIQUE INDEX "Topic_syllabusId_slug_key" ON "Topic"("syllabusId", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "Topic_id_syllabusId_key" ON "Topic"("id", "syllabusId");

-- CreateIndex
CREATE UNIQUE INDEX "Topic_id_syllabusId_kind_key" ON "Topic"("id", "syllabusId", "kind");

-- CreateIndex
CREATE INDEX "TopicComponent_componentId_idx" ON "TopicComponent"("componentId");

-- CreateIndex
CREATE INDEX "LearningObjective_topicId_sortOrder_idx" ON "LearningObjective"("topicId", "sortOrder");

-- CreateIndex
CREATE INDEX "LearningObjective_originObjectiveId_idx" ON "LearningObjective"("originObjectiveId");

-- CreateIndex
CREATE INDEX "GradeScheme_qualificationId_idx" ON "GradeScheme"("qualificationId");

-- CreateIndex
CREATE INDEX "GradeScheme_sourceId_idx" ON "GradeScheme"("sourceId");

-- CreateIndex
CREATE UNIQUE INDEX "GradeBand_gradeSchemeId_label_key" ON "GradeBand"("gradeSchemeId", "label");

-- CreateIndex
CREATE UNIQUE INDEX "GradeBand_gradeSchemeId_sortOrder_key" ON "GradeBand"("gradeSchemeId", "sortOrder");

-- CreateIndex
CREATE INDEX "ExamSession_status_startsOn_idx" ON "ExamSession"("status", "startsOn");

-- CreateIndex
CREATE INDEX "ExamSession_confirmedById_idx" ON "ExamSession"("confirmedById");

-- CreateIndex
CREATE UNIQUE INDEX "ExamSession_qualificationId_seriesCode_key" ON "ExamSession"("qualificationId", "seriesCode");

-- CreateIndex
CREATE INDEX "ExamTimetableEntry_examSessionId_startsAt_idx" ON "ExamTimetableEntry"("examSessionId", "startsAt");

-- CreateIndex
CREATE INDEX "ExamTimetableEntry_subjectId_startsAt_idx" ON "ExamTimetableEntry"("subjectId", "startsAt");

-- CreateIndex
CREATE INDEX "ExamTimetableEntry_componentId_idx" ON "ExamTimetableEntry"("componentId");

-- CreateIndex
CREATE UNIQUE INDEX "ContentSource_slug_key" ON "ContentSource"("slug");

-- CreateIndex
CREATE INDEX "ContentSource_type_isActive_idx" ON "ContentSource"("type", "isActive");

-- CreateIndex
CREATE UNIQUE INDEX "MediaAsset_storageKey_key" ON "MediaAsset"("storageKey");

-- CreateIndex
CREATE INDEX "MediaAsset_uploadedById_createdAt_idx" ON "MediaAsset"("uploadedById", "createdAt");

-- CreateIndex
CREATE INDEX "MediaAsset_purpose_status_createdAt_idx" ON "MediaAsset"("purpose", "status", "createdAt");

-- CreateIndex
CREATE INDEX "MediaAsset_checksumSha256_idx" ON "MediaAsset"("checksumSha256");

-- CreateIndex
CREATE INDEX "MediaAsset_sourceId_idx" ON "MediaAsset"("sourceId");

-- CreateIndex
CREATE INDEX "ContentMediaUsage_mediaAssetId_idx" ON "ContentMediaUsage"("mediaAssetId");

-- CreateIndex
CREATE INDEX "ContentImport_createdById_createdAt_idx" ON "ContentImport"("createdById", "createdAt");

-- CreateIndex
CREATE INDEX "ContentImport_status_createdAt_idx" ON "ContentImport"("status", "createdAt");

-- CreateIndex
CREATE INDEX "ContentImport_fileMediaId_idx" ON "ContentImport"("fileMediaId");

-- CreateIndex
CREATE INDEX "ContentImport_subjectId_idx" ON "ContentImport"("subjectId");

-- CreateIndex
CREATE INDEX "ContentImport_syllabusId_idx" ON "ContentImport"("syllabusId");

-- CreateIndex
CREATE UNIQUE INDEX "Lesson_externalRef_key" ON "Lesson"("externalRef");

-- CreateIndex
CREATE UNIQUE INDEX "Lesson_draftOfId_key" ON "Lesson"("draftOfId");

-- CreateIndex
CREATE INDEX "Lesson_subjectId_status_kind_idx" ON "Lesson"("subjectId", "status", "kind");

-- CreateIndex
CREATE INDEX "Lesson_qualificationId_status_kind_idx" ON "Lesson"("qualificationId", "status", "kind");

-- CreateIndex
CREATE INDEX "Lesson_examBoardId_status_kind_idx" ON "Lesson"("examBoardId", "status", "kind");

-- CreateIndex
CREATE INDEX "Lesson_status_updatedAt_idx" ON "Lesson"("status", "updatedAt");

-- CreateIndex
CREATE INDEX "Lesson_createdById_createdAt_idx" ON "Lesson"("createdById", "createdAt");

-- CreateIndex
CREATE INDEX "Lesson_reviewedById_idx" ON "Lesson"("reviewedById");

-- CreateIndex
CREATE INDEX "Lesson_approvedById_idx" ON "Lesson"("approvedById");

-- CreateIndex
CREATE INDEX "Lesson_generationJobId_idx" ON "Lesson"("generationJobId");

-- CreateIndex
CREATE INDEX "Lesson_sourceId_idx" ON "Lesson"("sourceId");

-- CreateIndex
CREATE INDEX "Lesson_importId_idx" ON "Lesson"("importId");

-- CreateIndex
CREATE INDEX "LessonTopic_topicId_sortOrder_idx" ON "LessonTopic"("topicId", "sortOrder");

-- CreateIndex
CREATE INDEX "LessonObjective_objectiveId_idx" ON "LessonObjective"("objectiveId");

-- CreateIndex
CREATE INDEX "LessonQuestion_questionId_idx" ON "LessonQuestion"("questionId");

-- CreateIndex
CREATE UNIQUE INDEX "Question_externalRef_key" ON "Question"("externalRef");

-- CreateIndex
CREATE UNIQUE INDEX "Question_draftOfId_key" ON "Question"("draftOfId");

-- CreateIndex
CREATE INDEX "Question_subjectId_status_difficulty_idx" ON "Question"("subjectId", "status", "difficulty");

-- CreateIndex
CREATE INDEX "Question_stem_idx" ON "Question" USING GIN ("stem" gin_trgm_ops);

-- CreateIndex
CREATE INDEX "Question_status_updatedAt_idx" ON "Question"("status", "updatedAt");

-- CreateIndex
CREATE INDEX "Question_parentId_partOrder_idx" ON "Question"("parentId", "partOrder");

-- CreateIndex
CREATE INDEX "Question_schoolId_status_idx" ON "Question"("schoolId", "status");

-- CreateIndex
CREATE INDEX "Question_ownerUserId_status_idx" ON "Question"("ownerUserId", "status");

-- CreateIndex
CREATE INDEX "Question_relatedLessonId_idx" ON "Question"("relatedLessonId");

-- CreateIndex
CREATE INDEX "Question_createdById_createdAt_idx" ON "Question"("createdById", "createdAt");

-- CreateIndex
CREATE INDEX "Question_reviewedById_idx" ON "Question"("reviewedById");

-- CreateIndex
CREATE INDEX "Question_approvedById_idx" ON "Question"("approvedById");

-- CreateIndex
CREATE INDEX "Question_generationJobId_idx" ON "Question"("generationJobId");

-- CreateIndex
CREATE INDEX "Question_sourceId_idx" ON "Question"("sourceId");

-- CreateIndex
CREATE INDEX "Question_importId_idx" ON "Question"("importId");

-- CreateIndex
CREATE INDEX "QuestionOption_mediaAssetId_idx" ON "QuestionOption"("mediaAssetId");

-- CreateIndex
CREATE UNIQUE INDEX "QuestionOption_questionId_key_key" ON "QuestionOption"("questionId", "key");

-- CreateIndex
CREATE INDEX "QuestionTopic_topicId_syllabusId_idx" ON "QuestionTopic"("topicId", "syllabusId");

-- CreateIndex
CREATE INDEX "QuestionTopic_syllabusId_subjectId_idx" ON "QuestionTopic"("syllabusId", "subjectId");

-- CreateIndex
CREATE INDEX "QuestionTopic_subjectId_idx" ON "QuestionTopic"("subjectId");

-- CreateIndex
CREATE INDEX "QuestionObjective_objectiveId_idx" ON "QuestionObjective"("objectiveId");

-- CreateIndex
CREATE UNIQUE INDEX "Flashcard_externalRef_key" ON "Flashcard"("externalRef");

-- CreateIndex
CREATE UNIQUE INDEX "Flashcard_draftOfId_key" ON "Flashcard"("draftOfId");

-- CreateIndex
CREATE INDEX "Flashcard_subjectId_status_cardType_idx" ON "Flashcard"("subjectId", "status", "cardType");

-- CreateIndex
CREATE INDEX "Flashcard_ownerUserId_subjectId_idx" ON "Flashcard"("ownerUserId", "subjectId");

-- CreateIndex
CREATE INDEX "Flashcard_status_updatedAt_idx" ON "Flashcard"("status", "updatedAt");

-- CreateIndex
CREATE INDEX "Flashcard_createdById_createdAt_idx" ON "Flashcard"("createdById", "createdAt");

-- CreateIndex
CREATE INDEX "Flashcard_reviewedById_idx" ON "Flashcard"("reviewedById");

-- CreateIndex
CREATE INDEX "Flashcard_approvedById_idx" ON "Flashcard"("approvedById");

-- CreateIndex
CREATE INDEX "Flashcard_generationJobId_idx" ON "Flashcard"("generationJobId");

-- CreateIndex
CREATE INDEX "Flashcard_sourceId_idx" ON "Flashcard"("sourceId");

-- CreateIndex
CREATE INDEX "Flashcard_importId_idx" ON "Flashcard"("importId");

-- CreateIndex
CREATE INDEX "FlashcardTopic_topicId_sortOrder_idx" ON "FlashcardTopic"("topicId", "sortOrder");

-- CreateIndex
CREATE UNIQUE INDEX "Assessment_draftOfId_key" ON "Assessment"("draftOfId");

-- CreateIndex
CREATE INDEX "Assessment_subjectId_kind_status_idx" ON "Assessment"("subjectId", "kind", "status");

-- CreateIndex
CREATE INDEX "Assessment_syllabusId_subjectId_idx" ON "Assessment"("syllabusId", "subjectId");

-- CreateIndex
CREATE INDEX "Assessment_routeId_idx" ON "Assessment"("routeId");

-- CreateIndex
CREATE INDEX "Assessment_gradeSchemeId_idx" ON "Assessment"("gradeSchemeId");

-- CreateIndex
CREATE INDEX "Assessment_schoolId_status_idx" ON "Assessment"("schoolId", "status");

-- CreateIndex
CREATE INDEX "Assessment_ownerUserId_status_idx" ON "Assessment"("ownerUserId", "status");

-- CreateIndex
CREATE INDEX "Assessment_status_updatedAt_idx" ON "Assessment"("status", "updatedAt");

-- CreateIndex
CREATE INDEX "Assessment_createdById_createdAt_idx" ON "Assessment"("createdById", "createdAt");

-- CreateIndex
CREATE INDEX "Assessment_reviewedById_idx" ON "Assessment"("reviewedById");

-- CreateIndex
CREATE INDEX "Assessment_approvedById_idx" ON "Assessment"("approvedById");

-- CreateIndex
CREATE INDEX "Assessment_generationJobId_idx" ON "Assessment"("generationJobId");

-- CreateIndex
CREATE INDEX "Assessment_sourceId_idx" ON "Assessment"("sourceId");

-- CreateIndex
CREATE INDEX "AssessmentTopic_topicId_idx" ON "AssessmentTopic"("topicId");

-- CreateIndex
CREATE INDEX "AssessmentSection_assessmentId_sortOrder_idx" ON "AssessmentSection"("assessmentId", "sortOrder");

-- CreateIndex
CREATE INDEX "AssessmentSection_componentId_idx" ON "AssessmentSection"("componentId");

-- CreateIndex
CREATE INDEX "AssessmentItem_questionId_idx" ON "AssessmentItem"("questionId");

-- CreateIndex
CREATE UNIQUE INDEX "AssessmentItem_sectionId_questionId_key" ON "AssessmentItem"("sectionId", "questionId");

-- CreateIndex
CREATE INDEX "AssessmentBlueprintRule_sectionId_sortOrder_idx" ON "AssessmentBlueprintRule"("sectionId", "sortOrder");

-- CreateIndex
CREATE INDEX "AssessmentBlueprintRule_topicId_idx" ON "AssessmentBlueprintRule"("topicId");

-- CreateIndex
CREATE INDEX "AssessmentBlueprintRule_objectiveId_idx" ON "AssessmentBlueprintRule"("objectiveId");

-- CreateIndex
CREATE UNIQUE INDEX "StudyPack_draftOfId_key" ON "StudyPack"("draftOfId");

-- CreateIndex
CREATE INDEX "StudyPack_status_sortOrder_idx" ON "StudyPack"("status", "sortOrder");

-- CreateIndex
CREATE INDEX "StudyPack_coverImageId_idx" ON "StudyPack"("coverImageId");

-- CreateIndex
CREATE INDEX "StudyPack_createdById_createdAt_idx" ON "StudyPack"("createdById", "createdAt");

-- CreateIndex
CREATE INDEX "StudyPack_reviewedById_idx" ON "StudyPack"("reviewedById");

-- CreateIndex
CREATE INDEX "StudyPack_approvedById_idx" ON "StudyPack"("approvedById");

-- CreateIndex
CREATE INDEX "StudyPack_generationJobId_idx" ON "StudyPack"("generationJobId");

-- CreateIndex
CREATE INDEX "StudyPackScope_studyPackId_idx" ON "StudyPackScope"("studyPackId");

-- CreateIndex
CREATE INDEX "StudyPackScope_qualificationId_idx" ON "StudyPackScope"("qualificationId");

-- CreateIndex
CREATE INDEX "StudyPackScope_subjectId_idx" ON "StudyPackScope"("subjectId");

-- CreateIndex
CREATE INDEX "StudyPackScope_syllabusId_idx" ON "StudyPackScope"("syllabusId");

-- CreateIndex
CREATE UNIQUE INDEX "StudyPlanTemplate_draftOfId_key" ON "StudyPlanTemplate"("draftOfId");

-- CreateIndex
CREATE INDEX "StudyPlanTemplate_subjectId_status_idx" ON "StudyPlanTemplate"("subjectId", "status");

-- CreateIndex
CREATE INDEX "StudyPlanTemplate_syllabusId_subjectId_idx" ON "StudyPlanTemplate"("syllabusId", "subjectId");

-- CreateIndex
CREATE INDEX "StudyPlanTemplate_routeId_idx" ON "StudyPlanTemplate"("routeId");

-- CreateIndex
CREATE INDEX "StudyPlanTemplate_status_updatedAt_idx" ON "StudyPlanTemplate"("status", "updatedAt");

-- CreateIndex
CREATE INDEX "StudyPlanTemplate_createdById_createdAt_idx" ON "StudyPlanTemplate"("createdById", "createdAt");

-- CreateIndex
CREATE INDEX "StudyPlanTemplate_reviewedById_idx" ON "StudyPlanTemplate"("reviewedById");

-- CreateIndex
CREATE INDEX "StudyPlanTemplate_approvedById_idx" ON "StudyPlanTemplate"("approvedById");

-- CreateIndex
CREATE INDEX "StudyPlanTemplate_generationJobId_idx" ON "StudyPlanTemplate"("generationJobId");

-- CreateIndex
CREATE INDEX "StudyPlanTemplateItem_topicId_idx" ON "StudyPlanTemplateItem"("topicId");

-- CreateIndex
CREATE INDEX "StudyPlanTemplateItem_lessonId_idx" ON "StudyPlanTemplateItem"("lessonId");

-- CreateIndex
CREATE INDEX "StudyPlanTemplateItem_assessmentId_idx" ON "StudyPlanTemplateItem"("assessmentId");

-- CreateIndex
CREATE UNIQUE INDEX "StudyPlanTemplateItem_templateId_weekNumber_sortOrder_key" ON "StudyPlanTemplateItem"("templateId", "weekNumber", "sortOrder");

-- CreateIndex
CREATE INDEX "ContentRevision_authorId_idx" ON "ContentRevision"("authorId");

-- CreateIndex
CREATE INDEX "ContentRevision_approvedById_idx" ON "ContentRevision"("approvedById");

-- CreateIndex
CREATE UNIQUE INDEX "ContentRevision_entityType_entityId_revision_key" ON "ContentRevision"("entityType", "entityId", "revision");

-- CreateIndex
CREATE INDEX "ContentFlag_entityType_entityId_status_idx" ON "ContentFlag"("entityType", "entityId", "status");

-- CreateIndex
CREATE INDEX "ContentFlag_status_createdAt_idx" ON "ContentFlag"("status", "createdAt");

-- CreateIndex
CREATE INDEX "ContentFlag_flaggedById_createdAt_idx" ON "ContentFlag"("flaggedById", "createdAt");

-- CreateIndex
CREATE INDEX "ContentFlag_assignedToId_status_idx" ON "ContentFlag"("assignedToId", "status");

-- CreateIndex
CREATE INDEX "ContentFlag_resolvedById_idx" ON "ContentFlag"("resolvedById");

-- CreateIndex
CREATE INDEX "SearchDocument_searchVector_idx" ON "SearchDocument" USING GIN ("searchVector");

-- CreateIndex
CREATE INDEX "SearchDocument_title_idx" ON "SearchDocument" USING GIN ("title" gin_trgm_ops);

-- CreateIndex
CREATE INDEX "SearchDocument_subjectIds_idx" ON "SearchDocument" USING GIN ("subjectIds");

-- CreateIndex
CREATE INDEX "SearchDocument_topicIds_idx" ON "SearchDocument" USING GIN ("topicIds");

-- CreateIndex
CREATE INDEX "SearchDocument_syllabusIds_idx" ON "SearchDocument" USING GIN ("syllabusIds");

-- CreateIndex
CREATE UNIQUE INDEX "SearchDocument_entityType_entityId_key" ON "SearchDocument"("entityType", "entityId");

-- CreateIndex
CREATE INDEX "DailyQuestion_qualificationId_date_idx" ON "DailyQuestion"("qualificationId", "date");

-- CreateIndex
CREATE INDEX "DailyQuestion_subjectId_date_idx" ON "DailyQuestion"("subjectId", "date");

-- CreateIndex
CREATE INDEX "DailyQuestion_questionId_idx" ON "DailyQuestion"("questionId");

-- CreateIndex
CREATE UNIQUE INDEX "DailyQuestion_date_qualificationId_subjectId_key" ON "DailyQuestion"("date", "qualificationId", "subjectId");

-- CreateIndex
CREATE INDEX "Testimonial_isPublished_sortOrder_idx" ON "Testimonial"("isPublished", "sortOrder");

-- CreateIndex
CREATE INDEX "Testimonial_photoMediaId_idx" ON "Testimonial"("photoMediaId");

-- CreateIndex
CREATE INDEX "Testimonial_userId_idx" ON "Testimonial"("userId");

-- CreateIndex
CREATE INDEX "Testimonial_consentRecordedById_idx" ON "Testimonial"("consentRecordedById");

-- CreateIndex
CREATE INDEX "FaqItem_isPublished_locale_category_sortOrder_idx" ON "FaqItem"("isPublished", "locale", "category", "sortOrder");

-- CreateIndex
CREATE UNIQUE INDEX "SubjectEnrollment_diagnosticAttemptId_key" ON "SubjectEnrollment"("diagnosticAttemptId");

-- CreateIndex
CREATE INDEX "SubjectEnrollment_subjectId_status_idx" ON "SubjectEnrollment"("subjectId", "status");

-- CreateIndex
CREATE INDEX "SubjectEnrollment_syllabusId_idx" ON "SubjectEnrollment"("syllabusId");

-- CreateIndex
CREATE INDEX "SubjectEnrollment_routeId_idx" ON "SubjectEnrollment"("routeId");

-- CreateIndex
CREATE INDEX "SubjectEnrollment_targetExamSessionId_idx" ON "SubjectEnrollment"("targetExamSessionId");

-- CreateIndex
CREATE UNIQUE INDEX "SubjectEnrollment_userId_subjectId_key" ON "SubjectEnrollment"("userId", "subjectId");

-- CreateIndex
CREATE UNIQUE INDEX "SubjectEnrollment_id_syllabusId_key" ON "SubjectEnrollment"("id", "syllabusId");

-- CreateIndex
CREATE INDEX "EnrollmentTopicChoice_topicId_syllabusId_idx" ON "EnrollmentTopicChoice"("topicId", "syllabusId");

-- CreateIndex
CREATE INDEX "AssessmentAttempt_userId_startedAt_idx" ON "AssessmentAttempt"("userId", "startedAt");

-- CreateIndex
CREATE INDEX "AssessmentAttempt_userId_subjectId_mode_startedAt_idx" ON "AssessmentAttempt"("userId", "subjectId", "mode", "startedAt");

-- CreateIndex
CREATE INDEX "AssessmentAttempt_subjectId_mode_submittedAt_idx" ON "AssessmentAttempt"("subjectId", "mode", "submittedAt");

-- CreateIndex
CREATE INDEX "AssessmentAttempt_assessmentId_userId_idx" ON "AssessmentAttempt"("assessmentId", "userId");

-- CreateIndex
CREATE INDEX "AssessmentAttempt_assignmentId_userId_idx" ON "AssessmentAttempt"("assignmentId", "userId");

-- CreateIndex
CREATE INDEX "AssessmentAttempt_topicId_idx" ON "AssessmentAttempt"("topicId");

-- CreateIndex
CREATE INDEX "AssessmentAttempt_lessonId_idx" ON "AssessmentAttempt"("lessonId");

-- CreateIndex
CREATE INDEX "AssessmentAttempt_gradeSchemeId_idx" ON "AssessmentAttempt"("gradeSchemeId");

-- CreateIndex
CREATE UNIQUE INDEX "AssessmentAttempt_id_userId_subjectId_key" ON "AssessmentAttempt"("id", "userId", "subjectId");

-- CreateIndex
CREATE UNIQUE INDEX "AssessmentAttempt_userId_idempotencyKey_key" ON "AssessmentAttempt"("userId", "idempotencyKey");

-- CreateIndex
CREATE UNIQUE INDEX "AssessmentAttempt_dailyQuestionId_userId_key" ON "AssessmentAttempt"("dailyQuestionId", "userId");

-- CreateIndex
CREATE INDEX "QuestionAttempt_userId_topicId_createdAt_idx" ON "QuestionAttempt"("userId", "topicId", "createdAt");

-- CreateIndex
CREATE INDEX "QuestionAttempt_questionId_createdAt_idx" ON "QuestionAttempt"("questionId", "createdAt");

-- CreateIndex
CREATE INDEX "QuestionAttempt_createdAt_idx" ON "QuestionAttempt" USING BRIN ("createdAt");

-- CreateIndex
CREATE INDEX "QuestionAttempt_markedAt_idx" ON "QuestionAttempt" USING BRIN ("markedAt");

-- CreateIndex
CREATE INDEX "QuestionAttemptMarking_attemptId_position_createdAt_idx" ON "QuestionAttemptMarking"("attemptId", "position", "createdAt");

-- CreateIndex
CREATE INDEX "QuestionAttemptMarking_markedById_createdAt_idx" ON "QuestionAttemptMarking"("markedById", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "QuestionAttemptAttachment_mediaAssetId_key" ON "QuestionAttemptAttachment"("mediaAssetId");

-- CreateIndex
CREATE INDEX "TopicMastery_userId_subjectId_syllabusId_topicKind_band_idx" ON "TopicMastery"("userId", "subjectId", "syllabusId", "topicKind", "band");

-- CreateIndex
CREATE INDEX "TopicMastery_syllabusId_topicId_band_idx" ON "TopicMastery"("syllabusId", "topicId", "band");

-- CreateIndex
CREATE INDEX "LessonProgress_lessonId_status_idx" ON "LessonProgress"("lessonId", "status");

-- CreateIndex
CREATE INDEX "FlashcardState_userId_subjectId_dueAt_idx" ON "FlashcardState"("userId", "subjectId", "dueAt");

-- CreateIndex
CREATE INDEX "FlashcardState_flashcardId_idx" ON "FlashcardState"("flashcardId");

-- CreateIndex
CREATE INDEX "FlashcardReview_userId_flashcardId_reviewedAt_idx" ON "FlashcardReview"("userId", "flashcardId", "reviewedAt");

-- CreateIndex
CREATE INDEX "FlashcardReview_reviewedAt_idx" ON "FlashcardReview" USING BRIN ("reviewedAt");

-- CreateIndex
CREATE UNIQUE INDEX "FlashcardReview_userId_clientReviewId_key" ON "FlashcardReview"("userId", "clientReviewId");

-- CreateIndex
CREATE INDEX "StudyPlan_userId_generatedAt_idx" ON "StudyPlan"("userId", "generatedAt");

-- CreateIndex
CREATE INDEX "StudyPlan_templateId_idx" ON "StudyPlan"("templateId");

-- CreateIndex
CREATE UNIQUE INDEX "StudyPlan_id_userId_key" ON "StudyPlan"("id", "userId");

-- CreateIndex
CREATE INDEX "StudyPlanItem_subjectId_idx" ON "StudyPlanItem"("subjectId");

-- CreateIndex
CREATE INDEX "StudyPlanItem_topicId_idx" ON "StudyPlanItem"("topicId");

-- CreateIndex
CREATE INDEX "StudyPlanItem_lessonId_idx" ON "StudyPlanItem"("lessonId");

-- CreateIndex
CREATE INDEX "StudyPlanItem_assessmentId_idx" ON "StudyPlanItem"("assessmentId");

-- CreateIndex
CREATE INDEX "StudyPlanItem_assignmentId_idx" ON "StudyPlanItem"("assignmentId");

-- CreateIndex
CREATE UNIQUE INDEX "StudyPlanItem_planId_date_sortOrder_key" ON "StudyPlanItem"("planId", "date", "sortOrder");

-- CreateIndex
CREATE INDEX "StudySession_userId_startedAt_idx" ON "StudySession"("userId", "startedAt");

-- CreateIndex
CREATE INDEX "StudySession_subjectId_startedAt_idx" ON "StudySession"("subjectId", "startedAt");

-- CreateIndex
CREATE INDEX "StudySession_topicId_idx" ON "StudySession"("topicId");

-- CreateIndex
CREATE INDEX "StudySession_lessonId_idx" ON "StudySession"("lessonId");

-- CreateIndex
CREATE INDEX "StudySession_planItemId_idx" ON "StudySession"("planItemId");

-- CreateIndex
CREATE INDEX "StudySession_attemptId_idx" ON "StudySession"("attemptId");

-- CreateIndex
CREATE INDEX "DailyActivity_date_idx" ON "DailyActivity"("date");

-- CreateIndex
CREATE INDEX "XpEvent_userId_occurredAt_idx" ON "XpEvent"("userId", "occurredAt");

-- CreateIndex
CREATE UNIQUE INDEX "XpEvent_userId_reason_sourceId_key" ON "XpEvent"("userId", "reason", "sourceId");

-- CreateIndex
CREATE UNIQUE INDEX "Achievement_code_key" ON "Achievement"("code");

-- CreateIndex
CREATE INDEX "UserAchievement_achievementId_unlockedAt_idx" ON "UserAchievement"("achievementId", "unlockedAt");

-- CreateIndex
CREATE INDEX "LeaderboardEntry_metric_periodKey_scopeType_scopeId_value_idx" ON "LeaderboardEntry"("metric", "periodKey", "scopeType", "scopeId", "value" DESC);

-- CreateIndex
CREATE INDEX "LeaderboardEntry_userId_periodKey_idx" ON "LeaderboardEntry"("userId", "periodKey");

-- CreateIndex
CREATE INDEX "Assignment_classId_status_dueAt_idx" ON "Assignment"("classId", "status", "dueAt");

-- CreateIndex
CREATE INDEX "Assignment_createdById_createdAt_idx" ON "Assignment"("createdById", "createdAt");

-- CreateIndex
CREATE INDEX "Assignment_subjectId_idx" ON "Assignment"("subjectId");

-- CreateIndex
CREATE INDEX "Assignment_lessonId_idx" ON "Assignment"("lessonId");

-- CreateIndex
CREATE INDEX "Assignment_assessmentId_idx" ON "Assignment"("assessmentId");

-- CreateIndex
CREATE INDEX "Assignment_topicId_idx" ON "Assignment"("topicId");

-- CreateIndex
CREATE UNIQUE INDEX "AssignmentProgress_attemptId_key" ON "AssignmentProgress"("attemptId");

-- CreateIndex
CREATE INDEX "AssignmentProgress_userId_status_idx" ON "AssignmentProgress"("userId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "ShareableResult_tokenHash_key" ON "ShareableResult"("tokenHash");

-- CreateIndex
CREATE INDEX "ShareableResult_userId_createdAt_idx" ON "ShareableResult"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "ShareableResult_attemptId_idx" ON "ShareableResult"("attemptId");

-- CreateIndex
CREATE UNIQUE INDEX "User_emailNormalized_key" ON "User"("emailNormalized");

-- CreateIndex
CREATE UNIQUE INDEX "User_phoneE164_key" ON "User"("phoneE164");

-- CreateIndex
CREATE UNIQUE INDEX "User_loginUsername_key" ON "User"("loginUsername");

-- CreateIndex
CREATE INDEX "User_status_createdAt_idx" ON "User"("status", "createdAt");

-- CreateIndex
CREATE INDEX "User_signupChannel_createdAt_idx" ON "User"("signupChannel", "createdAt");

-- CreateIndex
CREATE INDEX "User_contactPhoneE164_idx" ON "User"("contactPhoneE164");

-- CreateIndex
CREATE INDEX "User_provisionedBySchoolId_idx" ON "User"("provisionedBySchoolId");

-- CreateIndex
CREATE INDEX "User_roles_idx" ON "User" USING GIN ("roles");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_username_key" ON "Profile"("username");

-- CreateIndex
CREATE INDEX "Profile_avatarAssetId_idx" ON "Profile"("avatarAssetId");

-- CreateIndex
CREATE INDEX "Profile_countryId_idx" ON "Profile"("countryId");

-- CreateIndex
CREATE INDEX "Student_countryId_idx" ON "Student"("countryId");

-- CreateIndex
CREATE INDEX "Student_examBoardId_idx" ON "Student"("examBoardId");

-- CreateIndex
CREATE INDEX "Student_qualificationId_yearGroupId_idx" ON "Student"("qualificationId", "yearGroupId");

-- CreateIndex
CREATE INDEX "Student_yearGroupId_idx" ON "Student"("yearGroupId");

-- CreateIndex
CREATE INDEX "Student_targetExamSessionId_idx" ON "Student"("targetExamSessionId");

-- CreateIndex
CREATE INDEX "Student_schoolId_idx" ON "Student"("schoolId");

-- CreateIndex
CREATE INDEX "Student_guardianConsentByUserId_idx" ON "Student"("guardianConsentByUserId");

-- CreateIndex
CREATE INDEX "Teacher_verifiedById_idx" ON "Teacher"("verifiedById");

-- CreateIndex
CREATE UNIQUE INDEX "ParentStudentLink_inviteCodeHash_key" ON "ParentStudentLink"("inviteCodeHash");

-- CreateIndex
CREATE INDEX "ParentStudentLink_parentUserId_status_idx" ON "ParentStudentLink"("parentUserId", "status");

-- CreateIndex
CREATE INDEX "ParentStudentLink_studentUserId_status_idx" ON "ParentStudentLink"("studentUserId", "status");

-- CreateIndex
CREATE INDEX "ParentStudentLink_revokedById_idx" ON "ParentStudentLink"("revokedById");

-- CreateIndex
CREATE UNIQUE INDEX "Session_tokenHash_key" ON "Session"("tokenHash");

-- CreateIndex
CREATE INDEX "Session_userId_idx" ON "Session"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "OAuthAccount_provider_providerAccountId_key" ON "OAuthAccount"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "OAuthAccount_userId_provider_key" ON "OAuthAccount"("userId", "provider");

-- CreateIndex
CREATE INDEX "VerificationCode_target_purpose_createdAt_idx" ON "VerificationCode"("target", "purpose", "createdAt");

-- CreateIndex
CREATE INDEX "VerificationCode_userId_idx" ON "VerificationCode"("userId");

-- CreateIndex
CREATE INDEX "VerificationCode_expiresAt_idx" ON "VerificationCode"("expiresAt");

-- CreateIndex
CREATE INDEX "PrivacyRequest_userId_createdAt_idx" ON "PrivacyRequest"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "PrivacyRequest_status_scheduledFor_idx" ON "PrivacyRequest"("status", "scheduledFor");

-- CreateIndex
CREATE INDEX "PrivacyRequest_requestedById_idx" ON "PrivacyRequest"("requestedById");

-- CreateIndex
CREATE UNIQUE INDEX "PushSubscription_endpoint_key" ON "PushSubscription"("endpoint");

-- CreateIndex
CREATE INDEX "PushSubscription_userId_idx" ON "PushSubscription"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "School_slug_key" ON "School"("slug");

-- CreateIndex
CREATE INDEX "School_countryId_region_district_idx" ON "School"("countryId", "region", "district");

-- CreateIndex
CREATE INDEX "School_status_idx" ON "School"("status");

-- CreateIndex
CREATE INDEX "School_logoAssetId_idx" ON "School"("logoAssetId");

-- CreateIndex
CREATE INDEX "School_verifiedById_idx" ON "School"("verifiedById");

-- CreateIndex
CREATE INDEX "School_createdById_idx" ON "School"("createdById");

-- CreateIndex
CREATE UNIQUE INDEX "School_countryId_officialCode_key" ON "School"("countryId", "officialCode");

-- CreateIndex
CREATE INDEX "SchoolMember_userId_status_idx" ON "SchoolMember"("userId", "status");

-- CreateIndex
CREATE INDEX "SchoolMember_schoolId_role_status_idx" ON "SchoolMember"("schoolId", "role", "status");

-- CreateIndex
CREATE INDEX "SchoolMember_invitedById_idx" ON "SchoolMember"("invitedById");

-- CreateIndex
CREATE INDEX "SchoolMember_removedById_idx" ON "SchoolMember"("removedById");

-- CreateIndex
CREATE UNIQUE INDEX "SchoolMember_schoolId_userId_role_key" ON "SchoolMember"("schoolId", "userId", "role");

-- CreateIndex
CREATE UNIQUE INDEX "SchoolMember_schoolId_studentNumber_key" ON "SchoolMember"("schoolId", "studentNumber");

-- CreateIndex
CREATE INDEX "SchoolSubject_subjectId_idx" ON "SchoolSubject"("subjectId");

-- CreateIndex
CREATE UNIQUE INDEX "SchoolSubject_schoolId_subjectId_key" ON "SchoolSubject"("schoolId", "subjectId");

-- CreateIndex
CREATE UNIQUE INDEX "Class_joinCode_key" ON "Class"("joinCode");

-- CreateIndex
CREATE INDEX "Class_schoolId_academicYear_idx" ON "Class"("schoolId", "academicYear");

-- CreateIndex
CREATE INDEX "Class_createdById_idx" ON "Class"("createdById");

-- CreateIndex
CREATE INDEX "Class_subjectId_idx" ON "Class"("subjectId");

-- CreateIndex
CREATE INDEX "Class_qualificationId_idx" ON "Class"("qualificationId");

-- CreateIndex
CREATE INDEX "Class_yearGroupId_idx" ON "Class"("yearGroupId");

-- CreateIndex
CREATE INDEX "ClassTeacher_userId_removedAt_idx" ON "ClassTeacher"("userId", "removedAt");

-- CreateIndex
CREATE UNIQUE INDEX "ClassTeacher_classId_userId_key" ON "ClassTeacher"("classId", "userId");

-- CreateIndex
CREATE INDEX "ClassMember_userId_status_idx" ON "ClassMember"("userId", "status");

-- CreateIndex
CREATE INDEX "ClassMember_removedById_idx" ON "ClassMember"("removedById");

-- CreateIndex
CREATE UNIQUE INDEX "ClassMember_classId_userId_key" ON "ClassMember"("classId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "Invitation_tokenHash_key" ON "Invitation"("tokenHash");

-- CreateIndex
CREATE INDEX "Invitation_schoolId_createdAt_idx" ON "Invitation"("schoolId", "createdAt");

-- CreateIndex
CREATE INDEX "Invitation_classId_idx" ON "Invitation"("classId");

-- CreateIndex
CREATE INDEX "Invitation_target_kind_idx" ON "Invitation"("target", "kind");

-- CreateIndex
CREATE INDEX "Invitation_invitedById_idx" ON "Invitation"("invitedById");

-- CreateIndex
CREATE INDEX "Invitation_acceptedByUserId_idx" ON "Invitation"("acceptedByUserId");

-- CreateIndex
CREATE INDEX "Announcement_scope_publishedAt_idx" ON "Announcement"("scope", "publishedAt");

-- CreateIndex
CREATE INDEX "Announcement_schoolId_publishedAt_idx" ON "Announcement"("schoolId", "publishedAt");

-- CreateIndex
CREATE INDEX "Announcement_classId_publishedAt_idx" ON "Announcement"("classId", "publishedAt");

-- CreateIndex
CREATE INDEX "Announcement_authorId_createdAt_idx" ON "Announcement"("authorId", "createdAt");

-- CreateIndex
CREATE INDEX "Announcement_countryId_idx" ON "Announcement"("countryId");

-- CreateIndex
CREATE INDEX "Notification_userId_readAt_createdAt_idx" ON "Notification"("userId", "readAt", "createdAt");

-- CreateIndex
CREATE INDEX "Notification_userId_createdAt_idx" ON "Notification"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "Notification_announcementId_idx" ON "Notification"("announcementId");

-- CreateIndex
CREATE INDEX "Notification_createdAt_idx" ON "Notification" USING BRIN ("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "Notification_userId_dedupeKey_key" ON "Notification"("userId", "dedupeKey");

-- CreateIndex
CREATE INDEX "SchoolReport_schoolId_createdAt_idx" ON "SchoolReport"("schoolId", "createdAt");

-- CreateIndex
CREATE INDEX "SchoolReport_mediaAssetId_idx" ON "SchoolReport"("mediaAssetId");

-- CreateIndex
CREATE INDEX "SchoolReport_requestedById_idx" ON "SchoolReport"("requestedById");

-- CreateIndex
CREATE INDEX "SchoolReport_jobId_idx" ON "SchoolReport"("jobId");

-- CreateIndex
CREATE UNIQUE INDEX "Plan_code_key" ON "Plan"("code");

-- CreateIndex
CREATE INDEX "Plan_isActive_isPublic_audience_sortOrder_idx" ON "Plan"("isActive", "isPublic", "audience", "sortOrder");

-- CreateIndex
CREATE INDEX "PlanPrice_planId_isActive_currency_idx" ON "PlanPrice"("planId", "isActive", "currency");

-- CreateIndex
CREATE INDEX "PlanPrice_studyPackId_isActive_currency_idx" ON "PlanPrice"("studyPackId", "isActive", "currency");

-- CreateIndex
CREATE INDEX "PlanPrice_countryId_idx" ON "PlanPrice"("countryId");

-- CreateIndex
CREATE INDEX "Subscription_holderUserId_status_idx" ON "Subscription"("holderUserId", "status");

-- CreateIndex
CREATE INDEX "Subscription_schoolId_status_idx" ON "Subscription"("schoolId", "status");

-- CreateIndex
CREATE INDEX "Subscription_payerUserId_idx" ON "Subscription"("payerUserId");

-- CreateIndex
CREATE INDEX "Subscription_planId_status_idx" ON "Subscription"("planId", "status");

-- CreateIndex
CREATE INDEX "Subscription_planPriceId_idx" ON "Subscription"("planPriceId");

-- CreateIndex
CREATE INDEX "Subscription_status_currentPeriodEnd_idx" ON "Subscription"("status", "currentPeriodEnd");

-- CreateIndex
CREATE INDEX "Subscription_createdById_idx" ON "Subscription"("createdById");

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_provider_providerSubscriptionRef_key" ON "Subscription"("provider", "providerSubscriptionRef");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_receiptNumber_key" ON "Payment"("receiptNumber");

-- CreateIndex
CREATE INDEX "Payment_beneficiaryUserId_createdAt_idx" ON "Payment"("beneficiaryUserId", "createdAt");

-- CreateIndex
CREATE INDEX "Payment_schoolId_createdAt_idx" ON "Payment"("schoolId", "createdAt");

-- CreateIndex
CREATE INDEX "Payment_subscriptionId_createdAt_idx" ON "Payment"("subscriptionId", "createdAt");

-- CreateIndex
CREATE INDEX "Payment_studyPackId_idx" ON "Payment"("studyPackId");

-- CreateIndex
CREATE INDEX "Payment_planPriceId_idx" ON "Payment"("planPriceId");

-- CreateIndex
CREATE INDEX "Payment_promoCodeId_idx" ON "Payment"("promoCodeId");

-- CreateIndex
CREATE INDEX "Payment_refundedById_idx" ON "Payment"("refundedById");

-- CreateIndex
CREATE INDEX "Payment_status_createdAt_idx" ON "Payment"("status", "createdAt");

-- CreateIndex
CREATE INDEX "Payment_payerFingerprint_idx" ON "Payment"("payerFingerprint");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_payerUserId_idempotencyKey_key" ON "Payment"("payerUserId", "idempotencyKey");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_provider_providerReference_key" ON "Payment"("provider", "providerReference");

-- CreateIndex
CREATE INDEX "PaymentEvent_provider_providerEventId_idx" ON "PaymentEvent"("provider", "providerEventId");

-- CreateIndex
CREATE INDEX "PaymentEvent_paymentId_createdAt_idx" ON "PaymentEvent"("paymentId", "createdAt");

-- CreateIndex
CREATE INDEX "PaymentEvent_recordedById_idx" ON "PaymentEvent"("recordedById");

-- CreateIndex
CREATE INDEX "PaymentEvent_createdAt_idx" ON "PaymentEvent" USING BRIN ("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "EntitlementGrant_paymentId_key" ON "EntitlementGrant"("paymentId");

-- CreateIndex
CREATE INDEX "EntitlementGrant_userId_endsAt_idx" ON "EntitlementGrant"("userId", "endsAt");

-- CreateIndex
CREATE INDEX "EntitlementGrant_schoolId_endsAt_idx" ON "EntitlementGrant"("schoolId", "endsAt");

-- CreateIndex
CREATE INDEX "EntitlementGrant_subscriptionId_revokedAt_idx" ON "EntitlementGrant"("subscriptionId", "revokedAt");

-- CreateIndex
CREATE INDEX "EntitlementGrant_planId_idx" ON "EntitlementGrant"("planId");

-- CreateIndex
CREATE INDEX "EntitlementGrant_studyPackId_idx" ON "EntitlementGrant"("studyPackId");

-- CreateIndex
CREATE INDEX "EntitlementGrant_revokedById_idx" ON "EntitlementGrant"("revokedById");

-- CreateIndex
CREATE INDEX "EntitlementGrant_grantedById_idx" ON "EntitlementGrant"("grantedById");

-- CreateIndex
CREATE UNIQUE INDEX "PromoCode_code_key" ON "PromoCode"("code");

-- CreateIndex
CREATE INDEX "PromoCode_grantPlanId_idx" ON "PromoCode"("grantPlanId");

-- CreateIndex
CREATE INDEX "PromoCode_createdById_idx" ON "PromoCode"("createdById");

-- CreateIndex
CREATE INDEX "PromoCodePlan_planId_idx" ON "PromoCodePlan"("planId");

-- CreateIndex
CREATE UNIQUE INDEX "PromoCodePlan_promoCodeId_planId_key" ON "PromoCodePlan"("promoCodeId", "planId");

-- CreateIndex
CREATE UNIQUE INDEX "PromoRedemption_paymentId_key" ON "PromoRedemption"("paymentId");

-- CreateIndex
CREATE UNIQUE INDEX "PromoRedemption_grantId_key" ON "PromoRedemption"("grantId");

-- CreateIndex
CREATE INDEX "PromoRedemption_userId_idx" ON "PromoRedemption"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "PromoRedemption_promoCodeId_userId_key" ON "PromoRedemption"("promoCodeId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "ReferralCode_userId_key" ON "ReferralCode"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ReferralCode_code_key" ON "ReferralCode"("code");

-- CreateIndex
CREATE UNIQUE INDEX "ReferralCode_id_userId_key" ON "ReferralCode"("id", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "Referral_referredUserId_key" ON "Referral"("referredUserId");

-- CreateIndex
CREATE UNIQUE INDEX "Referral_rewardGrantId_key" ON "Referral"("rewardGrantId");

-- CreateIndex
CREATE UNIQUE INDEX "Referral_refereeRewardGrantId_key" ON "Referral"("refereeRewardGrantId");

-- CreateIndex
CREATE INDEX "Referral_referralCodeId_referrerUserId_idx" ON "Referral"("referralCodeId", "referrerUserId");

-- CreateIndex
CREATE INDEX "Referral_referrerUserId_status_createdAt_idx" ON "Referral"("referrerUserId", "status", "createdAt");

-- CreateIndex
CREATE INDEX "Referral_qualifyingPaymentId_idx" ON "Referral"("qualifyingPaymentId");

-- CreateIndex
CREATE INDEX "AiConversation_userId_status_lastMessageAt_idx" ON "AiConversation"("userId", "status", "lastMessageAt");

-- CreateIndex
CREATE INDEX "AiConversation_subjectId_idx" ON "AiConversation"("subjectId");

-- CreateIndex
CREATE INDEX "AiConversation_topicId_idx" ON "AiConversation"("topicId");

-- CreateIndex
CREATE INDEX "AiConversation_questionId_idx" ON "AiConversation"("questionId");

-- CreateIndex
CREATE INDEX "AiMessage_conversationId_createdAt_idx" ON "AiMessage"("conversationId", "createdAt");

-- CreateIndex
CREATE INDEX "AiMessage_createdAt_idx" ON "AiMessage" USING BRIN ("createdAt");

-- CreateIndex
CREATE INDEX "AiMessage_attachmentAssetId_idx" ON "AiMessage"("attachmentAssetId");

-- CreateIndex
CREATE UNIQUE INDEX "AiMessage_conversationId_clientMessageId_key" ON "AiMessage"("conversationId", "clientMessageId");

-- CreateIndex
CREATE INDEX "AiUsageDaily_date_feature_idx" ON "AiUsageDaily"("date", "feature");

-- CreateIndex
CREATE UNIQUE INDEX "AiUsageDaily_userId_date_feature_key" ON "AiUsageDaily"("userId", "date", "feature");

-- CreateIndex
CREATE UNIQUE INDEX "AiResponseCache_cacheKey_key" ON "AiResponseCache"("cacheKey");

-- CreateIndex
CREATE INDEX "AiResponseCache_expiresAt_idx" ON "AiResponseCache"("expiresAt");

-- CreateIndex
CREATE INDEX "AiResponseCache_subjectId_idx" ON "AiResponseCache"("subjectId");

-- CreateIndex
CREATE INDEX "AiGenerationJob_requestedById_createdAt_idx" ON "AiGenerationJob"("requestedById", "createdAt");

-- CreateIndex
CREATE INDEX "AiGenerationJob_status_createdAt_idx" ON "AiGenerationJob"("status", "createdAt");

-- CreateIndex
CREATE INDEX "AiGenerationJob_syllabusId_idx" ON "AiGenerationJob"("syllabusId");

-- CreateIndex
CREATE INDEX "AiGenerationJob_subjectId_idx" ON "AiGenerationJob"("subjectId");

-- CreateIndex
CREATE INDEX "AiGenerationJob_topicId_idx" ON "AiGenerationJob"("topicId");

-- CreateIndex
CREATE INDEX "AiGenerationJob_jobId_idx" ON "AiGenerationJob"("jobId");

-- CreateIndex
CREATE INDEX "AiGenerationJob_cancelledById_idx" ON "AiGenerationJob"("cancelledById");

-- CreateIndex
CREATE UNIQUE INDEX "ChannelIdentity_channel_externalId_key" ON "ChannelIdentity"("channel", "externalId");

-- CreateIndex
CREATE UNIQUE INDEX "ChannelIdentity_userId_channel_key" ON "ChannelIdentity"("userId", "channel");

-- CreateIndex
CREATE INDEX "ChannelMessage_identityId_createdAt_idx" ON "ChannelMessage"("identityId", "createdAt");

-- CreateIndex
CREATE INDEX "ChannelMessage_status_createdAt_idx" ON "ChannelMessage"("status", "createdAt");

-- CreateIndex
CREATE INDEX "ChannelMessage_notificationId_idx" ON "ChannelMessage"("notificationId");

-- CreateIndex
CREATE INDEX "ChannelMessage_inReplyToId_idx" ON "ChannelMessage"("inReplyToId");

-- CreateIndex
CREATE INDEX "ChannelMessage_createdAt_idx" ON "ChannelMessage" USING BRIN ("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "ChannelMessage_channel_externalMessageId_key" ON "ChannelMessage"("channel", "externalMessageId");

-- CreateIndex
CREATE INDEX "ChannelConversationState_pendingAttemptId_pendingPosition_idx" ON "ChannelConversationState"("pendingAttemptId", "pendingPosition");

-- CreateIndex
CREATE INDEX "AuditLog_entityType_entityId_createdAt_idx" ON "AuditLog"("entityType", "entityId", "createdAt");

-- CreateIndex
CREATE INDEX "AuditLog_actorUserId_createdAt_idx" ON "AuditLog"("actorUserId", "createdAt");

-- CreateIndex
CREATE INDEX "AuditLog_targetUserId_createdAt_idx" ON "AuditLog"("targetUserId", "createdAt");

-- CreateIndex
CREATE INDEX "AuditLog_schoolId_createdAt_idx" ON "AuditLog"("schoolId", "createdAt");

-- CreateIndex
CREATE INDEX "AuditLog_action_createdAt_idx" ON "AuditLog"("action", "createdAt");

-- CreateIndex
CREATE INDEX "AuditLog_createdAt_idx" ON "AuditLog" USING BRIN ("createdAt");

-- CreateIndex
CREATE INDEX "Job_status_queue_runAt_priority_idx" ON "Job"("status", "queue", "runAt", "priority");

-- CreateIndex
CREATE INDEX "Job_status_completedAt_idx" ON "Job"("status", "completedAt");

-- CreateIndex
CREATE INDEX "RateLimitBucket_expiresAt_idx" ON "RateLimitBucket"("expiresAt");

-- CreateIndex
CREATE INDEX "Setting_updatedById_idx" ON "Setting"("updatedById");

-- CreateIndex
CREATE INDEX "DailyMetric_metric_dimension_date_idx" ON "DailyMetric"("metric", "dimension", "date");

-- CreateIndex
CREATE UNIQUE INDEX "DailyMetric_date_metric_dimension_key" ON "DailyMetric"("date", "metric", "dimension");

-- AddForeignKey
ALTER TABLE "ExamBoard" ADD CONSTRAINT "ExamBoard_homeCountryId_fkey" FOREIGN KEY ("homeCountryId") REFERENCES "Country"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExamBoard" ADD CONSTRAINT "ExamBoard_logoMediaId_fkey" FOREIGN KEY ("logoMediaId") REFERENCES "MediaAsset"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExamBoardCountry" ADD CONSTRAINT "ExamBoardCountry_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExamBoardCountry" ADD CONSTRAINT "ExamBoardCountry_examBoardId_fkey" FOREIGN KEY ("examBoardId") REFERENCES "ExamBoard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Qualification" ADD CONSTRAINT "Qualification_examBoardId_fkey" FOREIGN KEY ("examBoardId") REFERENCES "ExamBoard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Qualification" ADD CONSTRAINT "Qualification_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "QualificationLevel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "YearGroup" ADD CONSTRAINT "YearGroup_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "YearGroup" ADD CONSTRAINT "YearGroup_typicalLevelId_fkey" FOREIGN KEY ("typicalLevelId") REFERENCES "QualificationLevel"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subject" ADD CONSTRAINT "Subject_qualificationId_fkey" FOREIGN KEY ("qualificationId") REFERENCES "Qualification"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subject" ADD CONSTRAINT "Subject_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "SubjectCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subject" ADD CONSTRAINT "Subject_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "ContentSource"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Syllabus" ADD CONSTRAINT "Syllabus_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Syllabus" ADD CONSTRAINT "Syllabus_supersedesId_fkey" FOREIGN KEY ("supersedesId") REFERENCES "Syllabus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Syllabus" ADD CONSTRAINT "Syllabus_gradeSchemeId_fkey" FOREIGN KEY ("gradeSchemeId") REFERENCES "GradeScheme"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Syllabus" ADD CONSTRAINT "Syllabus_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "ContentSource"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Syllabus" ADD CONSTRAINT "Syllabus_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Syllabus" ADD CONSTRAINT "Syllabus_publishedById_fkey" FOREIGN KEY ("publishedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SyllabusComponent" ADD CONSTRAINT "SyllabusComponent_syllabusId_fkey" FOREIGN KEY ("syllabusId") REFERENCES "Syllabus"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SyllabusRoute" ADD CONSTRAINT "SyllabusRoute_syllabusId_fkey" FOREIGN KEY ("syllabusId") REFERENCES "Syllabus"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SyllabusRoute" ADD CONSTRAINT "SyllabusRoute_gradeSchemeId_fkey" FOREIGN KEY ("gradeSchemeId") REFERENCES "GradeScheme"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SyllabusRouteComponent" ADD CONSTRAINT "SyllabusRouteComponent_routeId_fkey" FOREIGN KEY ("routeId") REFERENCES "SyllabusRoute"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SyllabusRouteComponent" ADD CONSTRAINT "SyllabusRouteComponent_componentId_fkey" FOREIGN KEY ("componentId") REFERENCES "SyllabusComponent"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Topic" ADD CONSTRAINT "Topic_syllabusId_fkey" FOREIGN KEY ("syllabusId") REFERENCES "Syllabus"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Topic" ADD CONSTRAINT "Topic_parentId_syllabusId_fkey" FOREIGN KEY ("parentId", "syllabusId") REFERENCES "Topic"("id", "syllabusId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Topic" ADD CONSTRAINT "Topic_originTopicId_fkey" FOREIGN KEY ("originTopicId") REFERENCES "Topic"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Topic" ADD CONSTRAINT "Topic_importId_fkey" FOREIGN KEY ("importId") REFERENCES "ContentImport"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TopicComponent" ADD CONSTRAINT "TopicComponent_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TopicComponent" ADD CONSTRAINT "TopicComponent_componentId_fkey" FOREIGN KEY ("componentId") REFERENCES "SyllabusComponent"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LearningObjective" ADD CONSTRAINT "LearningObjective_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LearningObjective" ADD CONSTRAINT "LearningObjective_originObjectiveId_fkey" FOREIGN KEY ("originObjectiveId") REFERENCES "LearningObjective"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GradeScheme" ADD CONSTRAINT "GradeScheme_qualificationId_fkey" FOREIGN KEY ("qualificationId") REFERENCES "Qualification"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GradeScheme" ADD CONSTRAINT "GradeScheme_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "ContentSource"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GradeBand" ADD CONSTRAINT "GradeBand_gradeSchemeId_fkey" FOREIGN KEY ("gradeSchemeId") REFERENCES "GradeScheme"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExamSession" ADD CONSTRAINT "ExamSession_qualificationId_fkey" FOREIGN KEY ("qualificationId") REFERENCES "Qualification"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExamSession" ADD CONSTRAINT "ExamSession_confirmedById_fkey" FOREIGN KEY ("confirmedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExamTimetableEntry" ADD CONSTRAINT "ExamTimetableEntry_examSessionId_fkey" FOREIGN KEY ("examSessionId") REFERENCES "ExamSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExamTimetableEntry" ADD CONSTRAINT "ExamTimetableEntry_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExamTimetableEntry" ADD CONSTRAINT "ExamTimetableEntry_componentId_fkey" FOREIGN KEY ("componentId") REFERENCES "SyllabusComponent"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MediaAsset" ADD CONSTRAINT "MediaAsset_uploadedById_fkey" FOREIGN KEY ("uploadedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MediaAsset" ADD CONSTRAINT "MediaAsset_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "ContentSource"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContentMediaUsage" ADD CONSTRAINT "ContentMediaUsage_mediaAssetId_fkey" FOREIGN KEY ("mediaAssetId") REFERENCES "MediaAsset"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContentImport" ADD CONSTRAINT "ContentImport_fileMediaId_fkey" FOREIGN KEY ("fileMediaId") REFERENCES "MediaAsset"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContentImport" ADD CONSTRAINT "ContentImport_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContentImport" ADD CONSTRAINT "ContentImport_syllabusId_fkey" FOREIGN KEY ("syllabusId") REFERENCES "Syllabus"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContentImport" ADD CONSTRAINT "ContentImport_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_qualificationId_fkey" FOREIGN KEY ("qualificationId") REFERENCES "Qualification"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_examBoardId_fkey" FOREIGN KEY ("examBoardId") REFERENCES "ExamBoard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_draftOfId_fkey" FOREIGN KEY ("draftOfId") REFERENCES "Lesson"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_reviewedById_fkey" FOREIGN KEY ("reviewedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_approvedById_fkey" FOREIGN KEY ("approvedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_generationJobId_fkey" FOREIGN KEY ("generationJobId") REFERENCES "AiGenerationJob"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "ContentSource"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_importId_fkey" FOREIGN KEY ("importId") REFERENCES "ContentImport"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LessonTopic" ADD CONSTRAINT "LessonTopic_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LessonTopic" ADD CONSTRAINT "LessonTopic_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LessonObjective" ADD CONSTRAINT "LessonObjective_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LessonObjective" ADD CONSTRAINT "LessonObjective_objectiveId_fkey" FOREIGN KEY ("objectiveId") REFERENCES "LearningObjective"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LessonQuestion" ADD CONSTRAINT "LessonQuestion_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LessonQuestion" ADD CONSTRAINT "LessonQuestion_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_draftOfId_fkey" FOREIGN KEY ("draftOfId") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_relatedLessonId_fkey" FOREIGN KEY ("relatedLessonId") REFERENCES "Lesson"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_ownerUserId_fkey" FOREIGN KEY ("ownerUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_reviewedById_fkey" FOREIGN KEY ("reviewedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_approvedById_fkey" FOREIGN KEY ("approvedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_generationJobId_fkey" FOREIGN KEY ("generationJobId") REFERENCES "AiGenerationJob"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "ContentSource"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_importId_fkey" FOREIGN KEY ("importId") REFERENCES "ContentImport"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionOption" ADD CONSTRAINT "QuestionOption_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionOption" ADD CONSTRAINT "QuestionOption_mediaAssetId_fkey" FOREIGN KEY ("mediaAssetId") REFERENCES "MediaAsset"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionTopic" ADD CONSTRAINT "QuestionTopic_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionTopic" ADD CONSTRAINT "QuestionTopic_topicId_syllabusId_fkey" FOREIGN KEY ("topicId", "syllabusId") REFERENCES "Topic"("id", "syllabusId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionTopic" ADD CONSTRAINT "QuestionTopic_syllabusId_subjectId_fkey" FOREIGN KEY ("syllabusId", "subjectId") REFERENCES "Syllabus"("id", "subjectId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionObjective" ADD CONSTRAINT "QuestionObjective_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionObjective" ADD CONSTRAINT "QuestionObjective_objectiveId_fkey" FOREIGN KEY ("objectiveId") REFERENCES "LearningObjective"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flashcard" ADD CONSTRAINT "Flashcard_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flashcard" ADD CONSTRAINT "Flashcard_ownerUserId_fkey" FOREIGN KEY ("ownerUserId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flashcard" ADD CONSTRAINT "Flashcard_draftOfId_fkey" FOREIGN KEY ("draftOfId") REFERENCES "Flashcard"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flashcard" ADD CONSTRAINT "Flashcard_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flashcard" ADD CONSTRAINT "Flashcard_reviewedById_fkey" FOREIGN KEY ("reviewedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flashcard" ADD CONSTRAINT "Flashcard_approvedById_fkey" FOREIGN KEY ("approvedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flashcard" ADD CONSTRAINT "Flashcard_generationJobId_fkey" FOREIGN KEY ("generationJobId") REFERENCES "AiGenerationJob"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flashcard" ADD CONSTRAINT "Flashcard_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "ContentSource"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flashcard" ADD CONSTRAINT "Flashcard_importId_fkey" FOREIGN KEY ("importId") REFERENCES "ContentImport"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FlashcardTopic" ADD CONSTRAINT "FlashcardTopic_flashcardId_fkey" FOREIGN KEY ("flashcardId") REFERENCES "Flashcard"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FlashcardTopic" ADD CONSTRAINT "FlashcardTopic_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assessment" ADD CONSTRAINT "Assessment_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assessment" ADD CONSTRAINT "Assessment_syllabusId_subjectId_fkey" FOREIGN KEY ("syllabusId", "subjectId") REFERENCES "Syllabus"("id", "subjectId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assessment" ADD CONSTRAINT "Assessment_routeId_syllabusId_fkey" FOREIGN KEY ("routeId", "syllabusId") REFERENCES "SyllabusRoute"("id", "syllabusId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assessment" ADD CONSTRAINT "Assessment_gradeSchemeId_fkey" FOREIGN KEY ("gradeSchemeId") REFERENCES "GradeScheme"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assessment" ADD CONSTRAINT "Assessment_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assessment" ADD CONSTRAINT "Assessment_ownerUserId_fkey" FOREIGN KEY ("ownerUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assessment" ADD CONSTRAINT "Assessment_draftOfId_fkey" FOREIGN KEY ("draftOfId") REFERENCES "Assessment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assessment" ADD CONSTRAINT "Assessment_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assessment" ADD CONSTRAINT "Assessment_reviewedById_fkey" FOREIGN KEY ("reviewedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assessment" ADD CONSTRAINT "Assessment_approvedById_fkey" FOREIGN KEY ("approvedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assessment" ADD CONSTRAINT "Assessment_generationJobId_fkey" FOREIGN KEY ("generationJobId") REFERENCES "AiGenerationJob"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assessment" ADD CONSTRAINT "Assessment_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "ContentSource"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssessmentTopic" ADD CONSTRAINT "AssessmentTopic_assessmentId_fkey" FOREIGN KEY ("assessmentId") REFERENCES "Assessment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssessmentTopic" ADD CONSTRAINT "AssessmentTopic_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssessmentSection" ADD CONSTRAINT "AssessmentSection_assessmentId_fkey" FOREIGN KEY ("assessmentId") REFERENCES "Assessment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssessmentSection" ADD CONSTRAINT "AssessmentSection_componentId_fkey" FOREIGN KEY ("componentId") REFERENCES "SyllabusComponent"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssessmentItem" ADD CONSTRAINT "AssessmentItem_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "AssessmentSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssessmentItem" ADD CONSTRAINT "AssessmentItem_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssessmentBlueprintRule" ADD CONSTRAINT "AssessmentBlueprintRule_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "AssessmentSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssessmentBlueprintRule" ADD CONSTRAINT "AssessmentBlueprintRule_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssessmentBlueprintRule" ADD CONSTRAINT "AssessmentBlueprintRule_objectiveId_fkey" FOREIGN KEY ("objectiveId") REFERENCES "LearningObjective"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudyPack" ADD CONSTRAINT "StudyPack_coverImageId_fkey" FOREIGN KEY ("coverImageId") REFERENCES "MediaAsset"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudyPack" ADD CONSTRAINT "StudyPack_draftOfId_fkey" FOREIGN KEY ("draftOfId") REFERENCES "StudyPack"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudyPack" ADD CONSTRAINT "StudyPack_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudyPack" ADD CONSTRAINT "StudyPack_reviewedById_fkey" FOREIGN KEY ("reviewedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudyPack" ADD CONSTRAINT "StudyPack_approvedById_fkey" FOREIGN KEY ("approvedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudyPack" ADD CONSTRAINT "StudyPack_generationJobId_fkey" FOREIGN KEY ("generationJobId") REFERENCES "AiGenerationJob"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudyPackScope" ADD CONSTRAINT "StudyPackScope_studyPackId_fkey" FOREIGN KEY ("studyPackId") REFERENCES "StudyPack"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudyPackScope" ADD CONSTRAINT "StudyPackScope_qualificationId_fkey" FOREIGN KEY ("qualificationId") REFERENCES "Qualification"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudyPackScope" ADD CONSTRAINT "StudyPackScope_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudyPackScope" ADD CONSTRAINT "StudyPackScope_syllabusId_fkey" FOREIGN KEY ("syllabusId") REFERENCES "Syllabus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudyPlanTemplate" ADD CONSTRAINT "StudyPlanTemplate_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudyPlanTemplate" ADD CONSTRAINT "StudyPlanTemplate_syllabusId_subjectId_fkey" FOREIGN KEY ("syllabusId", "subjectId") REFERENCES "Syllabus"("id", "subjectId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudyPlanTemplate" ADD CONSTRAINT "StudyPlanTemplate_routeId_syllabusId_fkey" FOREIGN KEY ("routeId", "syllabusId") REFERENCES "SyllabusRoute"("id", "syllabusId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudyPlanTemplate" ADD CONSTRAINT "StudyPlanTemplate_draftOfId_fkey" FOREIGN KEY ("draftOfId") REFERENCES "StudyPlanTemplate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudyPlanTemplate" ADD CONSTRAINT "StudyPlanTemplate_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudyPlanTemplate" ADD CONSTRAINT "StudyPlanTemplate_reviewedById_fkey" FOREIGN KEY ("reviewedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudyPlanTemplate" ADD CONSTRAINT "StudyPlanTemplate_approvedById_fkey" FOREIGN KEY ("approvedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudyPlanTemplate" ADD CONSTRAINT "StudyPlanTemplate_generationJobId_fkey" FOREIGN KEY ("generationJobId") REFERENCES "AiGenerationJob"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudyPlanTemplateItem" ADD CONSTRAINT "StudyPlanTemplateItem_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "StudyPlanTemplate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudyPlanTemplateItem" ADD CONSTRAINT "StudyPlanTemplateItem_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudyPlanTemplateItem" ADD CONSTRAINT "StudyPlanTemplateItem_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudyPlanTemplateItem" ADD CONSTRAINT "StudyPlanTemplateItem_assessmentId_fkey" FOREIGN KEY ("assessmentId") REFERENCES "Assessment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContentRevision" ADD CONSTRAINT "ContentRevision_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContentRevision" ADD CONSTRAINT "ContentRevision_approvedById_fkey" FOREIGN KEY ("approvedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContentFlag" ADD CONSTRAINT "ContentFlag_flaggedById_fkey" FOREIGN KEY ("flaggedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContentFlag" ADD CONSTRAINT "ContentFlag_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContentFlag" ADD CONSTRAINT "ContentFlag_resolvedById_fkey" FOREIGN KEY ("resolvedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyQuestion" ADD CONSTRAINT "DailyQuestion_qualificationId_fkey" FOREIGN KEY ("qualificationId") REFERENCES "Qualification"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyQuestion" ADD CONSTRAINT "DailyQuestion_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyQuestion" ADD CONSTRAINT "DailyQuestion_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Testimonial" ADD CONSTRAINT "Testimonial_photoMediaId_fkey" FOREIGN KEY ("photoMediaId") REFERENCES "MediaAsset"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Testimonial" ADD CONSTRAINT "Testimonial_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Testimonial" ADD CONSTRAINT "Testimonial_consentRecordedById_fkey" FOREIGN KEY ("consentRecordedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubjectEnrollment" ADD CONSTRAINT "SubjectEnrollment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubjectEnrollment" ADD CONSTRAINT "SubjectEnrollment_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubjectEnrollment" ADD CONSTRAINT "SubjectEnrollment_syllabusId_subjectId_fkey" FOREIGN KEY ("syllabusId", "subjectId") REFERENCES "Syllabus"("id", "subjectId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubjectEnrollment" ADD CONSTRAINT "SubjectEnrollment_routeId_syllabusId_fkey" FOREIGN KEY ("routeId", "syllabusId") REFERENCES "SyllabusRoute"("id", "syllabusId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubjectEnrollment" ADD CONSTRAINT "SubjectEnrollment_targetExamSessionId_fkey" FOREIGN KEY ("targetExamSessionId") REFERENCES "ExamSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubjectEnrollment" ADD CONSTRAINT "SubjectEnrollment_diagnosticAttemptId_fkey" FOREIGN KEY ("diagnosticAttemptId") REFERENCES "AssessmentAttempt"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EnrollmentTopicChoice" ADD CONSTRAINT "EnrollmentTopicChoice_enrollmentId_syllabusId_fkey" FOREIGN KEY ("enrollmentId", "syllabusId") REFERENCES "SubjectEnrollment"("id", "syllabusId") ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "EnrollmentTopicChoice" ADD CONSTRAINT "EnrollmentTopicChoice_topicId_syllabusId_fkey" FOREIGN KEY ("topicId", "syllabusId") REFERENCES "Topic"("id", "syllabusId") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "AssessmentAttempt" ADD CONSTRAINT "AssessmentAttempt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssessmentAttempt" ADD CONSTRAINT "AssessmentAttempt_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssessmentAttempt" ADD CONSTRAINT "AssessmentAttempt_assessmentId_fkey" FOREIGN KEY ("assessmentId") REFERENCES "Assessment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssessmentAttempt" ADD CONSTRAINT "AssessmentAttempt_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssessmentAttempt" ADD CONSTRAINT "AssessmentAttempt_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssessmentAttempt" ADD CONSTRAINT "AssessmentAttempt_dailyQuestionId_fkey" FOREIGN KEY ("dailyQuestionId") REFERENCES "DailyQuestion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssessmentAttempt" ADD CONSTRAINT "AssessmentAttempt_assignmentId_fkey" FOREIGN KEY ("assignmentId") REFERENCES "Assignment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssessmentAttempt" ADD CONSTRAINT "AssessmentAttempt_gradeSchemeId_fkey" FOREIGN KEY ("gradeSchemeId") REFERENCES "GradeScheme"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssessmentAttemptSection" ADD CONSTRAINT "AssessmentAttemptSection_attemptId_fkey" FOREIGN KEY ("attemptId") REFERENCES "AssessmentAttempt"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionAttempt" ADD CONSTRAINT "QuestionAttempt_attemptId_userId_subjectId_fkey" FOREIGN KEY ("attemptId", "userId", "subjectId") REFERENCES "AssessmentAttempt"("id", "userId", "subjectId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionAttempt" ADD CONSTRAINT "QuestionAttempt_attemptId_sectionNumber_fkey" FOREIGN KEY ("attemptId", "sectionNumber") REFERENCES "AssessmentAttemptSection"("attemptId", "sectionNumber") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionAttempt" ADD CONSTRAINT "QuestionAttempt_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionAttemptMarking" ADD CONSTRAINT "QuestionAttemptMarking_attemptId_position_fkey" FOREIGN KEY ("attemptId", "position") REFERENCES "QuestionAttempt"("attemptId", "position") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionAttemptMarking" ADD CONSTRAINT "QuestionAttemptMarking_markedById_fkey" FOREIGN KEY ("markedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionAttemptAttachment" ADD CONSTRAINT "QuestionAttemptAttachment_attemptId_position_fkey" FOREIGN KEY ("attemptId", "position") REFERENCES "QuestionAttempt"("attemptId", "position") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionAttemptAttachment" ADD CONSTRAINT "QuestionAttemptAttachment_mediaAssetId_fkey" FOREIGN KEY ("mediaAssetId") REFERENCES "MediaAsset"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TopicMastery" ADD CONSTRAINT "TopicMastery_userId_subjectId_fkey" FOREIGN KEY ("userId", "subjectId") REFERENCES "SubjectEnrollment"("userId", "subjectId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TopicMastery" ADD CONSTRAINT "TopicMastery_topicId_syllabusId_topicKind_fkey" FOREIGN KEY ("topicId", "syllabusId", "topicKind") REFERENCES "Topic"("id", "syllabusId", "kind") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TopicMastery" ADD CONSTRAINT "TopicMastery_syllabusId_subjectId_fkey" FOREIGN KEY ("syllabusId", "subjectId") REFERENCES "Syllabus"("id", "subjectId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubjectProgress" ADD CONSTRAINT "SubjectProgress_userId_subjectId_fkey" FOREIGN KEY ("userId", "subjectId") REFERENCES "SubjectEnrollment"("userId", "subjectId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionStats" ADD CONSTRAINT "QuestionStats_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LessonProgress" ADD CONSTRAINT "LessonProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LessonProgress" ADD CONSTRAINT "LessonProgress_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FlashcardState" ADD CONSTRAINT "FlashcardState_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FlashcardState" ADD CONSTRAINT "FlashcardState_flashcardId_fkey" FOREIGN KEY ("flashcardId") REFERENCES "Flashcard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FlashcardState" ADD CONSTRAINT "FlashcardState_userId_subjectId_fkey" FOREIGN KEY ("userId", "subjectId") REFERENCES "SubjectEnrollment"("userId", "subjectId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FlashcardReview" ADD CONSTRAINT "FlashcardReview_userId_flashcardId_fkey" FOREIGN KEY ("userId", "flashcardId") REFERENCES "FlashcardState"("userId", "flashcardId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudyPlan" ADD CONSTRAINT "StudyPlan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudyPlan" ADD CONSTRAINT "StudyPlan_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "StudyPlanTemplate"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudyPlanItem" ADD CONSTRAINT "StudyPlanItem_planId_userId_fkey" FOREIGN KEY ("planId", "userId") REFERENCES "StudyPlan"("id", "userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudyPlanItem" ADD CONSTRAINT "StudyPlanItem_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudyPlanItem" ADD CONSTRAINT "StudyPlanItem_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudyPlanItem" ADD CONSTRAINT "StudyPlanItem_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudyPlanItem" ADD CONSTRAINT "StudyPlanItem_assessmentId_fkey" FOREIGN KEY ("assessmentId") REFERENCES "Assessment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudyPlanItem" ADD CONSTRAINT "StudyPlanItem_assignmentId_fkey" FOREIGN KEY ("assignmentId") REFERENCES "Assignment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudySession" ADD CONSTRAINT "StudySession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudySession" ADD CONSTRAINT "StudySession_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudySession" ADD CONSTRAINT "StudySession_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudySession" ADD CONSTRAINT "StudySession_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudySession" ADD CONSTRAINT "StudySession_planItemId_fkey" FOREIGN KEY ("planItemId") REFERENCES "StudyPlanItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudySession" ADD CONSTRAINT "StudySession_attemptId_fkey" FOREIGN KEY ("attemptId") REFERENCES "AssessmentAttempt"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyActivity" ADD CONSTRAINT "DailyActivity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LearnerStats" ADD CONSTRAINT "LearnerStats_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "XpEvent" ADD CONSTRAINT "XpEvent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAchievement" ADD CONSTRAINT "UserAchievement_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAchievement" ADD CONSTRAINT "UserAchievement_achievementId_fkey" FOREIGN KEY ("achievementId") REFERENCES "Achievement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeaderboardEntry" ADD CONSTRAINT "LeaderboardEntry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_assessmentId_fkey" FOREIGN KEY ("assessmentId") REFERENCES "Assessment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssignmentProgress" ADD CONSTRAINT "AssignmentProgress_assignmentId_fkey" FOREIGN KEY ("assignmentId") REFERENCES "Assignment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssignmentProgress" ADD CONSTRAINT "AssignmentProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssignmentProgress" ADD CONSTRAINT "AssignmentProgress_attemptId_fkey" FOREIGN KEY ("attemptId") REFERENCES "AssessmentAttempt"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShareableResult" ADD CONSTRAINT "ShareableResult_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShareableResult" ADD CONSTRAINT "ShareableResult_attemptId_fkey" FOREIGN KEY ("attemptId") REFERENCES "AssessmentAttempt"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_provisionedBySchoolId_fkey" FOREIGN KEY ("provisionedBySchoolId") REFERENCES "School"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_avatarAssetId_fkey" FOREIGN KEY ("avatarAssetId") REFERENCES "MediaAsset"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_examBoardId_fkey" FOREIGN KEY ("examBoardId") REFERENCES "ExamBoard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_qualificationId_fkey" FOREIGN KEY ("qualificationId") REFERENCES "Qualification"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_yearGroupId_fkey" FOREIGN KEY ("yearGroupId") REFERENCES "YearGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_targetExamSessionId_fkey" FOREIGN KEY ("targetExamSessionId") REFERENCES "ExamSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_guardianConsentByUserId_fkey" FOREIGN KEY ("guardianConsentByUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Parent" ADD CONSTRAINT "Parent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Teacher" ADD CONSTRAINT "Teacher_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Teacher" ADD CONSTRAINT "Teacher_verifiedById_fkey" FOREIGN KEY ("verifiedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParentStudentLink" ADD CONSTRAINT "ParentStudentLink_parentUserId_fkey" FOREIGN KEY ("parentUserId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParentStudentLink" ADD CONSTRAINT "ParentStudentLink_studentUserId_fkey" FOREIGN KEY ("studentUserId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParentStudentLink" ADD CONSTRAINT "ParentStudentLink_revokedById_fkey" FOREIGN KEY ("revokedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OAuthAccount" ADD CONSTRAINT "OAuthAccount_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VerificationCode" ADD CONSTRAINT "VerificationCode_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrivacyRequest" ADD CONSTRAINT "PrivacyRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrivacyRequest" ADD CONSTRAINT "PrivacyRequest_requestedById_fkey" FOREIGN KEY ("requestedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PushSubscription" ADD CONSTRAINT "PushSubscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "School" ADD CONSTRAINT "School_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "School" ADD CONSTRAINT "School_logoAssetId_fkey" FOREIGN KEY ("logoAssetId") REFERENCES "MediaAsset"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "School" ADD CONSTRAINT "School_verifiedById_fkey" FOREIGN KEY ("verifiedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "School" ADD CONSTRAINT "School_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SchoolMember" ADD CONSTRAINT "SchoolMember_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SchoolMember" ADD CONSTRAINT "SchoolMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SchoolMember" ADD CONSTRAINT "SchoolMember_invitedById_fkey" FOREIGN KEY ("invitedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SchoolMember" ADD CONSTRAINT "SchoolMember_removedById_fkey" FOREIGN KEY ("removedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SchoolSubject" ADD CONSTRAINT "SchoolSubject_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SchoolSubject" ADD CONSTRAINT "SchoolSubject_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_qualificationId_fkey" FOREIGN KEY ("qualificationId") REFERENCES "Qualification"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_yearGroupId_fkey" FOREIGN KEY ("yearGroupId") REFERENCES "YearGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassTeacher" ADD CONSTRAINT "ClassTeacher_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassTeacher" ADD CONSTRAINT "ClassTeacher_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassMember" ADD CONSTRAINT "ClassMember_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassMember" ADD CONSTRAINT "ClassMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassMember" ADD CONSTRAINT "ClassMember_removedById_fkey" FOREIGN KEY ("removedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invitation" ADD CONSTRAINT "Invitation_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invitation" ADD CONSTRAINT "Invitation_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invitation" ADD CONSTRAINT "Invitation_invitedById_fkey" FOREIGN KEY ("invitedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invitation" ADD CONSTRAINT "Invitation_acceptedByUserId_fkey" FOREIGN KEY ("acceptedByUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Announcement" ADD CONSTRAINT "Announcement_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Announcement" ADD CONSTRAINT "Announcement_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Announcement" ADD CONSTRAINT "Announcement_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Announcement" ADD CONSTRAINT "Announcement_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_announcementId_fkey" FOREIGN KEY ("announcementId") REFERENCES "Announcement"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SchoolReport" ADD CONSTRAINT "SchoolReport_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SchoolReport" ADD CONSTRAINT "SchoolReport_mediaAssetId_fkey" FOREIGN KEY ("mediaAssetId") REFERENCES "MediaAsset"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SchoolReport" ADD CONSTRAINT "SchoolReport_requestedById_fkey" FOREIGN KEY ("requestedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SchoolReport" ADD CONSTRAINT "SchoolReport_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlanPrice" ADD CONSTRAINT "PlanPrice_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlanPrice" ADD CONSTRAINT "PlanPrice_studyPackId_fkey" FOREIGN KEY ("studyPackId") REFERENCES "StudyPack"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlanPrice" ADD CONSTRAINT "PlanPrice_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_planPriceId_fkey" FOREIGN KEY ("planPriceId") REFERENCES "PlanPrice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_holderUserId_fkey" FOREIGN KEY ("holderUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_payerUserId_fkey" FOREIGN KEY ("payerUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_payerUserId_fkey" FOREIGN KEY ("payerUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_beneficiaryUserId_fkey" FOREIGN KEY ("beneficiaryUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "Subscription"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_studyPackId_fkey" FOREIGN KEY ("studyPackId") REFERENCES "StudyPack"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_planPriceId_fkey" FOREIGN KEY ("planPriceId") REFERENCES "PlanPrice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_promoCodeId_fkey" FOREIGN KEY ("promoCodeId") REFERENCES "PromoCode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_refundedById_fkey" FOREIGN KEY ("refundedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentEvent" ADD CONSTRAINT "PaymentEvent_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "Payment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentEvent" ADD CONSTRAINT "PaymentEvent_recordedById_fkey" FOREIGN KEY ("recordedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EntitlementGrant" ADD CONSTRAINT "EntitlementGrant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EntitlementGrant" ADD CONSTRAINT "EntitlementGrant_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EntitlementGrant" ADD CONSTRAINT "EntitlementGrant_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EntitlementGrant" ADD CONSTRAINT "EntitlementGrant_studyPackId_fkey" FOREIGN KEY ("studyPackId") REFERENCES "StudyPack"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EntitlementGrant" ADD CONSTRAINT "EntitlementGrant_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "Subscription"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EntitlementGrant" ADD CONSTRAINT "EntitlementGrant_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "Payment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EntitlementGrant" ADD CONSTRAINT "EntitlementGrant_revokedById_fkey" FOREIGN KEY ("revokedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EntitlementGrant" ADD CONSTRAINT "EntitlementGrant_grantedById_fkey" FOREIGN KEY ("grantedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PromoCode" ADD CONSTRAINT "PromoCode_grantPlanId_fkey" FOREIGN KEY ("grantPlanId") REFERENCES "Plan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PromoCode" ADD CONSTRAINT "PromoCode_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PromoCodePlan" ADD CONSTRAINT "PromoCodePlan_promoCodeId_fkey" FOREIGN KEY ("promoCodeId") REFERENCES "PromoCode"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PromoCodePlan" ADD CONSTRAINT "PromoCodePlan_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PromoRedemption" ADD CONSTRAINT "PromoRedemption_promoCodeId_fkey" FOREIGN KEY ("promoCodeId") REFERENCES "PromoCode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PromoRedemption" ADD CONSTRAINT "PromoRedemption_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PromoRedemption" ADD CONSTRAINT "PromoRedemption_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "Payment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PromoRedemption" ADD CONSTRAINT "PromoRedemption_grantId_fkey" FOREIGN KEY ("grantId") REFERENCES "EntitlementGrant"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReferralCode" ADD CONSTRAINT "ReferralCode_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Referral" ADD CONSTRAINT "Referral_referralCodeId_referrerUserId_fkey" FOREIGN KEY ("referralCodeId", "referrerUserId") REFERENCES "ReferralCode"("id", "userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Referral" ADD CONSTRAINT "Referral_referrerUserId_fkey" FOREIGN KEY ("referrerUserId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Referral" ADD CONSTRAINT "Referral_referredUserId_fkey" FOREIGN KEY ("referredUserId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Referral" ADD CONSTRAINT "Referral_qualifyingPaymentId_fkey" FOREIGN KEY ("qualifyingPaymentId") REFERENCES "Payment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Referral" ADD CONSTRAINT "Referral_rewardGrantId_fkey" FOREIGN KEY ("rewardGrantId") REFERENCES "EntitlementGrant"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Referral" ADD CONSTRAINT "Referral_refereeRewardGrantId_fkey" FOREIGN KEY ("refereeRewardGrantId") REFERENCES "EntitlementGrant"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AiConversation" ADD CONSTRAINT "AiConversation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AiConversation" ADD CONSTRAINT "AiConversation_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AiConversation" ADD CONSTRAINT "AiConversation_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AiConversation" ADD CONSTRAINT "AiConversation_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AiMessage" ADD CONSTRAINT "AiMessage_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "AiConversation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AiMessage" ADD CONSTRAINT "AiMessage_attachmentAssetId_fkey" FOREIGN KEY ("attachmentAssetId") REFERENCES "MediaAsset"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AiUsageDaily" ADD CONSTRAINT "AiUsageDaily_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AiResponseCache" ADD CONSTRAINT "AiResponseCache_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AiGenerationJob" ADD CONSTRAINT "AiGenerationJob_requestedById_fkey" FOREIGN KEY ("requestedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AiGenerationJob" ADD CONSTRAINT "AiGenerationJob_cancelledById_fkey" FOREIGN KEY ("cancelledById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AiGenerationJob" ADD CONSTRAINT "AiGenerationJob_syllabusId_fkey" FOREIGN KEY ("syllabusId") REFERENCES "Syllabus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AiGenerationJob" ADD CONSTRAINT "AiGenerationJob_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AiGenerationJob" ADD CONSTRAINT "AiGenerationJob_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AiGenerationJob" ADD CONSTRAINT "AiGenerationJob_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChannelIdentity" ADD CONSTRAINT "ChannelIdentity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChannelMessage" ADD CONSTRAINT "ChannelMessage_identityId_fkey" FOREIGN KEY ("identityId") REFERENCES "ChannelIdentity"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChannelMessage" ADD CONSTRAINT "ChannelMessage_notificationId_fkey" FOREIGN KEY ("notificationId") REFERENCES "Notification"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChannelMessage" ADD CONSTRAINT "ChannelMessage_inReplyToId_fkey" FOREIGN KEY ("inReplyToId") REFERENCES "ChannelMessage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChannelConversationState" ADD CONSTRAINT "ChannelConversationState_identityId_fkey" FOREIGN KEY ("identityId") REFERENCES "ChannelIdentity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChannelConversationState" ADD CONSTRAINT "ChannelConversationState_pendingAttemptId_pendingPosition_fkey" FOREIGN KEY ("pendingAttemptId", "pendingPosition") REFERENCES "QuestionAttempt"("attemptId", "position") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_actorUserId_fkey" FOREIGN KEY ("actorUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_targetUserId_fkey" FOREIGN KEY ("targetUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Setting" ADD CONSTRAINT "Setting_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;


-- #####################################################################################################################
-- SECTION C. APPEND AFTER THE PRISMA-GENERATED DDL
-- #####################################################################################################################

-- =====================================================================================================================
-- C0. SHARED HELPER FUNCTIONS (first: SQL-language bodies are validated at creation time)
-- =====================================================================================================================

-- Purpose: a content row (as jsonb) is PLATFORM content when it has no private owner: Question/Assessment schoolId and
-- ownerUserId NULL, Flashcard ownerUserId NULL; Lesson/StudyPack/StudyPlanTemplate have neither column (always platform).
CREATE OR REPLACE FUNCTION content_is_platform(p_row jsonb) RETURNS boolean
  LANGUAGE sql IMMUTABLE PARALLEL SAFE
  AS $$ SELECT (p_row ->> 'schoolId') IS NULL AND (p_row ->> 'ownerUserId') IS NULL $$;

-- Purpose: root question of a structured-question part (parts nest at most two levels, e.g. (b)(i)); NULL in -> NULL.
CREATE OR REPLACE FUNCTION question_root_id(p_question_id uuid) RETURNS uuid
  LANGUAGE sql STABLE
  AS $$
    WITH RECURSIVE up AS (
      SELECT q."id", q."parentId", 0 AS depth FROM "Question" q WHERE q."id" = p_question_id
      UNION ALL
      SELECT q."id", q."parentId", up.depth + 1 FROM "Question" q JOIN up ON q."id" = up."parentId" WHERE up.depth < 8
    )
    SELECT up."id" FROM up WHERE up."parentId" IS NULL LIMIT 1
  $$;

-- Purpose: helper for the published-version guards; raises unless the syllabus version is still DRAFT (§26, rule 8).
-- FOR SHARE serialises a structural edit against a concurrent publish (UPDATE of the Syllabus row), so a topic insert
-- can never commit into a version that was published meanwhile (F12).
CREATE OR REPLACE FUNCTION curriculum_assert_syllabus_draft(p_syllabus_id uuid) RETURNS void LANGUAGE plpgsql AS $$
DECLARE
  v_status "SyllabusStatus";
BEGIN
  SELECT "status" INTO v_status FROM "Syllabus" WHERE "id" = p_syllabus_id FOR SHARE;
  -- v_status is NULL while the syllabus row itself is being cascade-deleted (only possible for DRAFT, see C1.4).
  IF v_status IS NOT NULL AND v_status <> 'DRAFT' THEN
    RAISE EXCEPTION 'Syllabus version % is % and its structure is immutable; create a new version', p_syllabus_id, v_status
      USING ERRCODE = 'restrict_violation';
  END IF;
END
$$;


-- =====================================================================================================================
-- C1. CURRICULUM & CONTENT
-- =====================================================================================================================

-- ---------------------------------------------------------------------------------------------------------------------
-- C1.1 Partial unique / partial / expression indexes
-- ---------------------------------------------------------------------------------------------------------------------
-- Purpose: exactly one CURRENT syllabus version per subject (§26); also resolves public URLs to the current version.
CREATE UNIQUE INDEX IF NOT EXISTS "Syllabus_subjectId_current_key" ON "Syllabus" ("subjectId") WHERE "status" = 'CURRENT';
-- Purpose: at most one default route (pre-selected in onboarding) per syllabus version.
CREATE UNIQUE INDEX IF NOT EXISTS "SyllabusRoute_syllabusId_default_key" ON "SyllabusRoute" ("syllabusId") WHERE "isDefault";
-- Purpose: at most one default grade scheme per qualification (grade-estimate fallback).
CREATE UNIQUE INDEX IF NOT EXISTS "GradeScheme_qualificationId_default_key" ON "GradeScheme" ("qualificationId") WHERE "isDefault";
-- Purpose: one primary topic per (question, syllabus version): the topic a question counts towards for mastery.
CREATE UNIQUE INDEX IF NOT EXISTS "QuestionTopic_questionId_syllabusId_primary_key"
  ON "QuestionTopic" ("questionId", "syllabusId") WHERE "isPrimary";
-- Purpose (F1): the STUDENT practice pool. Only platform-bank tags are in it, so a pool query through this index can
-- never return another school's or tutor's private question. Query: WHERE "syllabusId" = :pinned AND "topicId" IN (...)
-- AND "isPlatform".
CREATE INDEX IF NOT EXISTS "QuestionTopic_platform_pool_idx" ON "QuestionTopic" ("syllabusId", "topicId") WHERE "isPlatform";
-- Purpose: one primary (home) topic per lesson.
CREATE UNIQUE INDEX IF NOT EXISTS "LessonTopic_lessonId_primary_key" ON "LessonTopic" ("lessonId") WHERE "isPrimary";
-- Purpose: one primary (home) topic per flashcard.
CREATE UNIQUE INDEX IF NOT EXISTS "FlashcardTopic_flashcardId_primary_key" ON "FlashcardTopic" ("flashcardId") WHERE "isPrimary";
-- Purpose: lesson slugs unique per home subject among LIVE rows only (a draft copy repeats its live row's slug).
CREATE UNIQUE INDEX IF NOT EXISTS "Lesson_subjectId_slug_live_key" ON "Lesson" ("subjectId", "slug") WHERE "draftOfId" IS NULL;
-- Purpose (SC-13): subject-less public articles / study guides share one global slug space among live rows.
CREATE UNIQUE INDEX IF NOT EXISTS "Lesson_slug_subjectless_live_key" ON "Lesson" ("slug")
  WHERE "subjectId" IS NULL AND "draftOfId" IS NULL;
-- Purpose: study pack slugs unique among LIVE rows only; serves slug lookups.
CREATE UNIQUE INDEX IF NOT EXISTS "StudyPack_slug_live_key" ON "StudyPack" ("slug") WHERE "draftOfId" IS NULL;
-- Purpose (SC-01): study-plan template slugs unique per subject among LIVE rows only.
CREATE UNIQUE INDEX IF NOT EXISTS "StudyPlanTemplate_subjectId_slug_live_key" ON "StudyPlanTemplate" ("subjectId", "slug")
  WHERE "draftOfId" IS NULL;
-- Purpose: one open flag per (target, reporter, reason); repeated reports are merged by the service (§42).
CREATE UNIQUE INDEX IF NOT EXISTS "ContentFlag_open_per_reporter_key" ON "ContentFlag" ("entityType", "entityId", "flaggedById", "reason")
  WHERE "status" IN ('OPEN', 'IN_PROGRESS') AND "flaggedById" IS NOT NULL;
-- Purpose (m1): one open SYSTEM flag per (target, reason): the hourly QuestionStats job inserts with
-- ON CONFLICT DO NOTHING and can never flood the triage queue. (Not NULLS NOT DISTINCT on the index above: a user
-- erasure's SET NULL of flaggedById could then collide.)
CREATE UNIQUE INDEX IF NOT EXISTS "ContentFlag_open_system_key" ON "ContentFlag" ("entityType", "entityId", "reason")
  WHERE "source" = 'SYSTEM' AND "status" IN ('OPEN', 'IN_PROGRESS');
-- Purpose (non-unique): tiny index over eligible live root questions for the practice.dailyQuestionFill job (§46).
CREATE INDEX IF NOT EXISTS "Question_daily_pool_idx" ON "Question" ("subjectId")
  WHERE "isDailyEligible" AND "status" = 'PUBLISHED' AND "parentId" IS NULL;
-- Purpose (m6): near-duplicate detection for AI drafts and imports over PLATFORM flashcards only (pg_trgm similarity);
-- student-created personal cards never pay GIN maintenance.
CREATE INDEX IF NOT EXISTS "Flashcard_front_platform_trgm_idx" ON "Flashcard" USING GIN ("front" gin_trgm_ops)
  WHERE "ownerUserId" IS NULL;

-- ---------------------------------------------------------------------------------------------------------------------
-- C1.2 NULLS NOT DISTINCT unique
-- ---------------------------------------------------------------------------------------------------------------------
-- Purpose: one daily question per (date, qualification, subject-or-null); NULL subject = qualification-wide question.
-- Rebuilt under Prisma's own index name so Prisma still exposes the compound unique. Must run after Prisma's DDL.
DROP INDEX IF EXISTS "DailyQuestion_date_qualificationId_subjectId_key";
CREATE UNIQUE INDEX "DailyQuestion_date_qualificationId_subjectId_key"
  ON "DailyQuestion" ("date", "qualificationId", "subjectId") NULLS NOT DISTINCT;

-- ---------------------------------------------------------------------------------------------------------------------
-- C1.3 CHECK constraints: catalogue, syllabus versions, media, imports
-- ---------------------------------------------------------------------------------------------------------------------
-- Purpose: ISO-3166 alpha-2 country code and ISO-4217 default currency.
ALTER TABLE "Country"
  DROP CONSTRAINT IF EXISTS "Country_codes_chk",
  ADD CONSTRAINT "Country_codes_chk" CHECK ("isoCode" ~ '^[A-Z]{2}$' AND "defaultCurrency" ~ '^[A-Z]{3}$');
-- Purpose: year groups are ordered from 1.
ALTER TABLE "YearGroup"
  DROP CONSTRAINT IF EXISTS "YearGroup_ordinal_chk",
  ADD CONSTRAINT "YearGroup_ordinal_chk" CHECK ("ordinal" > 0);

-- Purpose: a syllabus version's effective window is a valid range.
ALTER TABLE "Syllabus"
  DROP CONSTRAINT IF EXISTS "Syllabus_effective_range_chk",
  ADD CONSTRAINT "Syllabus_effective_range_chk" CHECK ("effectiveTo" IS NULL OR "effectiveTo" > "effectiveFrom");
-- Purpose: every non-DRAFT syllabus version records when it was published.
ALTER TABLE "Syllabus"
  DROP CONSTRAINT IF EXISTS "Syllabus_published_at_chk",
  ADD CONSTRAINT "Syllabus_published_at_chk" CHECK ("status" = 'DRAFT' OR "publishedAt" IS NOT NULL);
-- Purpose: a version cannot supersede itself (lineage sanity).
ALTER TABLE "Syllabus"
  DROP CONSTRAINT IF EXISTS "Syllabus_not_self_superseding_chk",
  ADD CONSTRAINT "Syllabus_not_self_superseding_chk" CHECK ("supersedesId" IS NULL OR "supersedesId" <> "id");
-- Purpose (F11): the official topic structure is the most copyright-sensitive material and topics/objectives inherit
-- provenance from this row, so a version leaves DRAFT only with cleared copyright and a named source (§27).
ALTER TABLE "Syllabus"
  DROP CONSTRAINT IF EXISTS "Syllabus_copyright_chk",
  ADD CONSTRAINT "Syllabus_copyright_chk"
    CHECK ("status" = 'DRAFT' OR ("copyrightStatus" <> 'UNVERIFIED' AND "sourceId" IS NOT NULL));
-- Purpose: paper facts are positive; weighting is a percentage.
ALTER TABLE "SyllabusComponent"
  DROP CONSTRAINT IF EXISTS "SyllabusComponent_values_chk",
  ADD CONSTRAINT "SyllabusComponent_values_chk"
    CHECK (("durationMinutes" IS NULL OR "durationMinutes" > 0)
       AND ("maxMarks" IS NULL OR "maxMarks" > 0)
       AND ("weightingPercent" IS NULL OR ("weightingPercent" >= 0 AND "weightingPercent" <= 100)));

-- Purpose: roots (no parent) have depth 0 and only roots do.
ALTER TABLE "Topic"
  DROP CONSTRAINT IF EXISTS "Topic_depth_chk",
  ADD CONSTRAINT "Topic_depth_chk" CHECK ("depth" >= 0 AND (("parentId" IS NULL) = ("depth" = 0)));
-- Purpose: the materialised id path ends with the node's own id, and a root's path is exactly its id.
ALTER TABLE "Topic"
  DROP CONSTRAINT IF EXISTS "Topic_path_chk",
  ADD CONSTRAINT "Topic_path_chk" CHECK (right("path", 36) = "id"::text AND (("parentId" IS NULL) = ("path" = "id"::text)));
-- Purpose: a topic cannot be its own parent.
ALTER TABLE "Topic"
  DROP CONSTRAINT IF EXISTS "Topic_not_own_parent_chk",
  ADD CONSTRAINT "Topic_not_own_parent_chk" CHECK ("parentId" IS NULL OR "parentId" <> "id");
-- Purpose: valid exam-year window for set texts; positive study-time estimate (§16).
ALTER TABLE "Topic"
  DROP CONSTRAINT IF EXISTS "Topic_values_chk",
  ADD CONSTRAINT "Topic_values_chk"
    CHECK (("examYearFrom" IS NULL OR "examYearTo" IS NULL OR "examYearTo" >= "examYearFrom")
       AND ("estimatedStudyMinutes" IS NULL OR "estimatedStudyMinutes" > 0));

-- Purpose (SC-10): grade scheme versions count from 1.
ALTER TABLE "GradeScheme"
  DROP CONSTRAINT IF EXISTS "GradeScheme_version_chk",
  ADD CONSTRAINT "GradeScheme_version_chk" CHECK ("version" >= 1);
-- Purpose: grade band thresholds are percentages; ordering is non-negative.
ALTER TABLE "GradeBand"
  DROP CONSTRAINT IF EXISTS "GradeBand_values_chk",
  ADD CONSTRAINT "GradeBand_values_chk" CHECK ("minPercent" >= 0 AND "minPercent" <= 100 AND "sortOrder" >= 0);
-- Purpose: an exam session cannot end before it starts (§17 countdown).
ALTER TABLE "ExamSession"
  DROP CONSTRAINT IF EXISTS "ExamSession_dates_chk",
  ADD CONSTRAINT "ExamSession_dates_chk" CHECK ("endsOn" >= "startsOn");
-- Purpose: a non-provisional (confirmed) session records when it was confirmed.
ALTER TABLE "ExamSession"
  DROP CONSTRAINT IF EXISTS "ExamSession_confirmed_chk",
  ADD CONSTRAINT "ExamSession_confirmed_chk" CHECK ("isProvisional" OR "confirmedAt" IS NOT NULL);
-- Purpose: timetable paper durations are positive.
ALTER TABLE "ExamTimetableEntry"
  DROP CONSTRAINT IF EXISTS "ExamTimetableEntry_duration_chk",
  ADD CONSTRAINT "ExamTimetableEntry_duration_chk" CHECK ("durationMinutes" IS NULL OR "durationMinutes" > 0);

-- Purpose: licence validity window is a valid range (§27).
ALTER TABLE "ContentSource"
  DROP CONSTRAINT IF EXISTS "ContentSource_validity_chk",
  ADD CONSTRAINT "ContentSource_validity_chk" CHECK ("validFrom" IS NULL OR "validUntil" IS NULL OR "validUntil" >= "validFrom");
-- Purpose: sources that require attribution carry non-blank attribution text (§27).
ALTER TABLE "ContentSource"
  DROP CONSTRAINT IF EXISTS "ContentSource_attribution_chk",
  ADD CONSTRAINT "ContentSource_attribution_chk"
    CHECK (NOT "requiresAttribution" OR ("attributionText" IS NOT NULL AND btrim("attributionText") <> ''));

-- Purpose: content images and diagrams must have alt text (§43).
ALTER TABLE "MediaAsset"
  DROP CONSTRAINT IF EXISTS "MediaAsset_alt_text_chk",
  ADD CONSTRAINT "MediaAsset_alt_text_chk"
    CHECK ("purpose" NOT IN ('CONTENT_IMAGE', 'DIAGRAM') OR ("altText" IS NOT NULL AND btrim("altText") <> ''));
-- Purpose (F3, F10, SC-07, SC-14): user/private uploads are never public. Solver photos are part of the private AI
-- conversation (OWNER_ONLY: uploader, workers, audited break-glass); import files, answer attachments and school
-- report exports are PRIVATE (readers authorised by the owning service).
ALTER TABLE "MediaAsset"
  DROP CONSTRAINT IF EXISTS "MediaAsset_private_uploads_chk",
  ADD CONSTRAINT "MediaAsset_private_uploads_chk"
    CHECK (("purpose" <> 'SOLVER_UPLOAD' OR "visibility" = 'OWNER_ONLY')
       AND ("purpose" NOT IN ('IMPORT_FILE', 'ANSWER_ATTACHMENT', 'REPORT_EXPORT') OR "visibility" = 'PRIVATE'));
-- Purpose (F15): nothing world-readable (CDN, no auth) with unverified copyright; a school's own logo is exempt.
ALTER TABLE "MediaAsset"
  DROP CONSTRAINT IF EXISTS "MediaAsset_public_copyright_chk",
  ADD CONSTRAINT "MediaAsset_public_copyright_chk"
    CHECK ("visibility" <> 'PUBLIC' OR "copyrightStatus" <> 'UNVERIFIED' OR "purpose" = 'SCHOOL_LOGO');
-- Purpose (F15): a licensed file names its source; an open-licensed one names its source or licence (§27).
ALTER TABLE "MediaAsset"
  DROP CONSTRAINT IF EXISTS "MediaAsset_licence_chk",
  ADD CONSTRAINT "MediaAsset_licence_chk"
    CHECK (("copyrightStatus" <> 'LICENSED' OR "sourceId" IS NOT NULL)
       AND ("copyrightStatus" <> 'OPEN_LICENSE' OR "sourceId" IS NOT NULL OR "licenceCode" IS NOT NULL));
-- Purpose: sane sizes/dimensions and a lower-case hex sha256 checksum (dedupe).
ALTER TABLE "MediaAsset"
  DROP CONSTRAINT IF EXISTS "MediaAsset_values_chk",
  ADD CONSTRAINT "MediaAsset_values_chk"
    CHECK ("byteSize" >= 0 AND ("width" IS NULL OR "width" > 0) AND ("height" IS NULL OR "height" > 0)
       AND ("durationMs" IS NULL OR "durationMs" >= 0) AND "checksumSha256" ~ '^[0-9a-f]{64}$');
-- Purpose: status DELETED if and only if deletedAt is set.
ALTER TABLE "MediaAsset"
  DROP CONSTRAINT IF EXISTS "MediaAsset_deleted_chk",
  ADD CONSTRAINT "MediaAsset_deleted_chk" CHECK (("status" = 'DELETED') = ("deletedAt" IS NOT NULL));
-- Purpose: import row counters are non-negative.
ALTER TABLE "ContentImport"
  DROP CONSTRAINT IF EXISTS "ContentImport_counts_chk",
  ADD CONSTRAINT "ContentImport_counts_chk"
    CHECK ("totalRows" >= 0 AND "validRows" >= 0 AND "importedRows" >= 0 AND "failedRows" >= 0);

-- ---------------------------------------------------------------------------------------------------------------------
-- C1.3b CHECK constraints: content workflow (Lesson, Question, Flashcard, Assessment, StudyPack, StudyPlanTemplate)
--   *_draft_copy_chk          a draft copy is never PUBLISHED/ARCHIVED, never points at itself, never carries externalRef
--   *_published_at_chk        PUBLISHED => publishedAt; ARCHIVED => archivedAt
--   *_generation_job_chk      (F6) a row produced by an AI generation job is aiGenerated
--   *_ai_approval_chk         (F6) AI content APPROVED/PUBLISHED only with a human approver AND approval time (§41)
--   *_platform_approval_chk   (F6) PLATFORM content APPROVED/PUBLISHED only with an approval time (no unreviewed
--                             platform content); uses approvedAt, not the SetNull approver FK, so a user erasure can
--                             never violate it. Private (school/tutor/personal) rows and question parts are exempt.
--   *_copyright_chk           UNVERIFIED provenance can never be PUBLISHED (§27)
--   *_licence_chk             (F15) LICENSED => sourceId; OPEN_LICENSE => sourceId or licenceCode
-- ---------------------------------------------------------------------------------------------------------------------
-- Purpose (SC-13): a lesson has a home subject unless it is a public ARTICLE / STUDY_GUIDE; at most one scope column.
ALTER TABLE "Lesson"
  DROP CONSTRAINT IF EXISTS "Lesson_scope_chk",
  ADD CONSTRAINT "Lesson_scope_chk"
    CHECK (("subjectId" IS NOT NULL OR "kind" IN ('ARTICLE', 'STUDY_GUIDE'))
       AND num_nonnulls("subjectId", "qualificationId", "examBoardId") <= 1);
-- Purpose: Lesson draft-copy rules.
ALTER TABLE "Lesson"
  DROP CONSTRAINT IF EXISTS "Lesson_draft_copy_chk",
  ADD CONSTRAINT "Lesson_draft_copy_chk"
    CHECK ("draftOfId" IS NULL OR ("draftOfId" <> "id" AND "status" IN ('DRAFT', 'IN_REVIEW', 'APPROVED') AND "externalRef" IS NULL));
-- Purpose: Lesson workflow timestamps.
ALTER TABLE "Lesson"
  DROP CONSTRAINT IF EXISTS "Lesson_published_at_chk",
  ADD CONSTRAINT "Lesson_published_at_chk"
    CHECK (("status" <> 'PUBLISHED' OR "publishedAt" IS NOT NULL) AND ("status" <> 'ARCHIVED' OR "archivedAt" IS NOT NULL));
-- Purpose (F6): AI generation output is always flagged AI-generated.
ALTER TABLE "Lesson"
  DROP CONSTRAINT IF EXISTS "Lesson_generation_job_chk",
  ADD CONSTRAINT "Lesson_generation_job_chk" CHECK ("generationJobId" IS NULL OR "aiGenerated");
-- Purpose (F6): AI-drafted lessons need a human approver and approval time before APPROVED/PUBLISHED (§41).
ALTER TABLE "Lesson"
  DROP CONSTRAINT IF EXISTS "Lesson_ai_approval_chk",
  ADD CONSTRAINT "Lesson_ai_approval_chk"
    CHECK (NOT "aiGenerated" OR "status" NOT IN ('APPROVED', 'PUBLISHED') OR ("approvedById" IS NOT NULL AND "approvedAt" IS NOT NULL));
-- Purpose (F6): every approved/published lesson went through approval.
ALTER TABLE "Lesson"
  DROP CONSTRAINT IF EXISTS "Lesson_platform_approval_chk",
  ADD CONSTRAINT "Lesson_platform_approval_chk" CHECK ("status" NOT IN ('APPROVED', 'PUBLISHED') OR "approvedAt" IS NOT NULL);
-- Purpose: lessons with unverified copyright cannot be published (§27).
ALTER TABLE "Lesson"
  DROP CONSTRAINT IF EXISTS "Lesson_copyright_chk",
  ADD CONSTRAINT "Lesson_copyright_chk" CHECK ("status" <> 'PUBLISHED' OR "copyrightStatus" <> 'UNVERIFIED');
-- Purpose (F15): licence evidence for LICENSED / OPEN_LICENSE lessons.
ALTER TABLE "Lesson"
  DROP CONSTRAINT IF EXISTS "Lesson_licence_chk",
  ADD CONSTRAINT "Lesson_licence_chk"
    CHECK (("copyrightStatus" <> 'LICENSED' OR "sourceId" IS NOT NULL)
       AND ("copyrightStatus" <> 'OPEN_LICENSE' OR "sourceId" IS NOT NULL OR "licenceCode" IS NOT NULL));
-- Purpose: revision counter starts at 1; positive reading time.
ALTER TABLE "Lesson"
  DROP CONSTRAINT IF EXISTS "Lesson_values_chk",
  ADD CONSTRAINT "Lesson_values_chk" CHECK ("revision" >= 1 AND "estimatedMinutes" > 0);

-- Purpose (F1, SC-06): a question has at most one private owner (school OR tutor); private questions are never PUBLIC
-- and never daily-eligible (the daily question is broadcast to a whole qualification).
ALTER TABLE "Question"
  DROP CONSTRAINT IF EXISTS "Question_tenant_chk",
  ADD CONSTRAINT "Question_tenant_chk"
    CHECK (num_nonnulls("schoolId", "ownerUserId") <= 1
       AND (("schoolId" IS NULL AND "ownerUserId" IS NULL) OR ("accessTier" <> 'PUBLIC' AND NOT "isDailyEligible")));
-- Purpose: Question draft-copy rules.
ALTER TABLE "Question"
  DROP CONSTRAINT IF EXISTS "Question_draft_copy_chk",
  ADD CONSTRAINT "Question_draft_copy_chk"
    CHECK ("draftOfId" IS NULL OR ("draftOfId" <> "id" AND "status" IN ('DRAFT', 'IN_REVIEW', 'APPROVED') AND "externalRef" IS NULL));
-- Purpose: Question workflow timestamps.
ALTER TABLE "Question"
  DROP CONSTRAINT IF EXISTS "Question_published_at_chk",
  ADD CONSTRAINT "Question_published_at_chk"
    CHECK (("status" <> 'PUBLISHED' OR "publishedAt" IS NOT NULL) AND ("status" <> 'ARCHIVED' OR "archivedAt" IS NOT NULL));
-- Purpose (F6): AI generation output is always flagged AI-generated.
ALTER TABLE "Question"
  DROP CONSTRAINT IF EXISTS "Question_generation_job_chk",
  ADD CONSTRAINT "Question_generation_job_chk" CHECK ("generationJobId" IS NULL OR "aiGenerated");
-- Purpose (F6): AI-drafted questions need a human approver and approval time (§41). Parts are governed by their root.
ALTER TABLE "Question"
  DROP CONSTRAINT IF EXISTS "Question_ai_approval_chk",
  ADD CONSTRAINT "Question_ai_approval_chk"
    CHECK ("parentId" IS NOT NULL OR NOT "aiGenerated" OR "status" NOT IN ('APPROVED', 'PUBLISHED')
        OR ("approvedById" IS NOT NULL AND "approvedAt" IS NOT NULL));
-- Purpose (F6): approved/published PLATFORM root questions went through approval (school/tutor questions follow their
-- owner's workflow; parts follow the root).
ALTER TABLE "Question"
  DROP CONSTRAINT IF EXISTS "Question_platform_approval_chk",
  ADD CONSTRAINT "Question_platform_approval_chk"
    CHECK ("status" NOT IN ('APPROVED', 'PUBLISHED') OR "approvedAt" IS NOT NULL
        OR "schoolId" IS NOT NULL OR "ownerUserId" IS NOT NULL OR "parentId" IS NOT NULL);
-- Purpose: questions with unverified copyright cannot be published (§27).
ALTER TABLE "Question"
  DROP CONSTRAINT IF EXISTS "Question_copyright_chk",
  ADD CONSTRAINT "Question_copyright_chk" CHECK ("status" <> 'PUBLISHED' OR "copyrightStatus" <> 'UNVERIFIED');
-- Purpose (F15): licence evidence for LICENSED / OPEN_LICENSE questions.
ALTER TABLE "Question"
  DROP CONSTRAINT IF EXISTS "Question_licence_chk",
  ADD CONSTRAINT "Question_licence_chk"
    CHECK (("copyrightStatus" <> 'LICENSED' OR "sourceId" IS NOT NULL)
       AND ("copyrightStatus" <> 'OPEN_LICENSE' OR "sourceId" IS NOT NULL OR "licenceCode" IS NOT NULL));
-- Purpose: §9 metadata ranges: revision >= 1, difficulty 1-5, positive marks/time, plausible year.
ALTER TABLE "Question"
  DROP CONSTRAINT IF EXISTS "Question_values_chk",
  ADD CONSTRAINT "Question_values_chk"
    CHECK ("revision" >= 1 AND "difficulty" BETWEEN 1 AND 5 AND "marks" > 0
       AND ("estimatedSeconds" IS NULL OR "estimatedSeconds" > 0)
       AND ("year" IS NULL OR "year" BETWEEN 1900 AND 2100));
-- Purpose: structured-question parts have a partLabel exactly when they have a parent; no self-parent.
ALTER TABLE "Question"
  DROP CONSTRAINT IF EXISTS "Question_parts_chk",
  ADD CONSTRAINT "Question_parts_chk"
    CHECK ((("parentId" IS NULL) = ("partLabel" IS NULL)) AND ("parentId" IS NULL OR "parentId" <> "id"));
-- Purpose: a STRUCTURED root has no answer spec (its parts are marked individually).
ALTER TABLE "Question"
  DROP CONSTRAINT IF EXISTS "Question_structured_spec_chk",
  ADD CONSTRAINT "Question_structured_spec_chk" CHECK ("type" <> 'STRUCTURED' OR "answerSpec" IS NULL);
-- Purpose: MCQ option keys are non-blank (options are matched by key across revisions).
ALTER TABLE "QuestionOption"
  DROP CONSTRAINT IF EXISTS "QuestionOption_key_chk",
  ADD CONSTRAINT "QuestionOption_key_chk" CHECK (btrim("key") <> '');

-- Purpose: Flashcard draft-copy rules; personal cards never have draft copies.
ALTER TABLE "Flashcard"
  DROP CONSTRAINT IF EXISTS "Flashcard_draft_copy_chk",
  ADD CONSTRAINT "Flashcard_draft_copy_chk"
    CHECK ("draftOfId" IS NULL OR ("draftOfId" <> "id" AND "status" IN ('DRAFT', 'IN_REVIEW', 'APPROVED')
                                   AND "externalRef" IS NULL AND "ownerUserId" IS NULL));
-- Purpose: Flashcard workflow timestamps.
ALTER TABLE "Flashcard"
  DROP CONSTRAINT IF EXISTS "Flashcard_published_at_chk",
  ADD CONSTRAINT "Flashcard_published_at_chk"
    CHECK (("status" <> 'PUBLISHED' OR "publishedAt" IS NOT NULL) AND ("status" <> 'ARCHIVED' OR "archivedAt" IS NOT NULL));
-- Purpose (F6): AI generation output is always flagged AI-generated.
ALTER TABLE "Flashcard"
  DROP CONSTRAINT IF EXISTS "Flashcard_generation_job_chk",
  ADD CONSTRAINT "Flashcard_generation_job_chk" CHECK ("generationJobId" IS NULL OR "aiGenerated");
-- Purpose (F6): AI-drafted platform flashcards need a human approver and time (§41); personal cards are exempt.
ALTER TABLE "Flashcard"
  DROP CONSTRAINT IF EXISTS "Flashcard_ai_approval_chk",
  ADD CONSTRAINT "Flashcard_ai_approval_chk"
    CHECK ("ownerUserId" IS NOT NULL OR NOT "aiGenerated" OR "status" NOT IN ('APPROVED', 'PUBLISHED')
        OR ("approvedById" IS NOT NULL AND "approvedAt" IS NOT NULL));
-- Purpose (F6): approved/published platform flashcards went through approval; personal cards are exempt.
ALTER TABLE "Flashcard"
  DROP CONSTRAINT IF EXISTS "Flashcard_platform_approval_chk",
  ADD CONSTRAINT "Flashcard_platform_approval_chk"
    CHECK ("ownerUserId" IS NOT NULL OR "status" NOT IN ('APPROVED', 'PUBLISHED') OR "approvedAt" IS NOT NULL);
-- Purpose: platform flashcards with unverified copyright cannot be published (§27); personal cards are exempt.
ALTER TABLE "Flashcard"
  DROP CONSTRAINT IF EXISTS "Flashcard_copyright_chk",
  ADD CONSTRAINT "Flashcard_copyright_chk"
    CHECK ("ownerUserId" IS NOT NULL OR "status" <> 'PUBLISHED' OR "copyrightStatus" <> 'UNVERIFIED');
-- Purpose (F15): licence evidence for LICENSED / OPEN_LICENSE platform flashcards.
ALTER TABLE "Flashcard"
  DROP CONSTRAINT IF EXISTS "Flashcard_licence_chk",
  ADD CONSTRAINT "Flashcard_licence_chk"
    CHECK ("ownerUserId" IS NOT NULL
        OR (("copyrightStatus" <> 'LICENSED' OR "sourceId" IS NOT NULL)
            AND ("copyrightStatus" <> 'OPEN_LICENSE' OR "sourceId" IS NOT NULL OR "licenceCode" IS NOT NULL)));
-- Purpose: personal cards are never PUBLIC and never imported.
ALTER TABLE "Flashcard"
  DROP CONSTRAINT IF EXISTS "Flashcard_personal_chk",
  ADD CONSTRAINT "Flashcard_personal_chk" CHECK ("ownerUserId" IS NULL OR ("accessTier" <> 'PUBLIC' AND "externalRef" IS NULL));
-- Purpose: revision counter starts at 1.
ALTER TABLE "Flashcard"
  DROP CONSTRAINT IF EXISTS "Flashcard_revision_chk",
  ADD CONSTRAINT "Flashcard_revision_chk" CHECK ("revision" >= 1);

-- Purpose: Assessment draft-copy rules.
ALTER TABLE "Assessment"
  DROP CONSTRAINT IF EXISTS "Assessment_draft_copy_chk",
  ADD CONSTRAINT "Assessment_draft_copy_chk"
    CHECK ("draftOfId" IS NULL OR ("draftOfId" <> "id" AND "status" IN ('DRAFT', 'IN_REVIEW', 'APPROVED')));
-- Purpose: Assessment workflow timestamps.
ALTER TABLE "Assessment"
  DROP CONSTRAINT IF EXISTS "Assessment_published_at_chk",
  ADD CONSTRAINT "Assessment_published_at_chk"
    CHECK (("status" <> 'PUBLISHED' OR "publishedAt" IS NOT NULL) AND ("status" <> 'ARCHIVED' OR "archivedAt" IS NOT NULL));
-- Purpose (F6): AI generation output is always flagged AI-generated.
ALTER TABLE "Assessment"
  DROP CONSTRAINT IF EXISTS "Assessment_generation_job_chk",
  ADD CONSTRAINT "Assessment_generation_job_chk" CHECK ("generationJobId" IS NULL OR "aiGenerated");
-- Purpose (F6): AI-drafted assessments need a human approver and approval time (§41).
ALTER TABLE "Assessment"
  DROP CONSTRAINT IF EXISTS "Assessment_ai_approval_chk",
  ADD CONSTRAINT "Assessment_ai_approval_chk"
    CHECK (NOT "aiGenerated" OR "status" NOT IN ('APPROVED', 'PUBLISHED') OR ("approvedById" IS NOT NULL AND "approvedAt" IS NOT NULL));
-- Purpose (F6): approved/published platform assessments went through approval (school/tutor tests are exempt).
ALTER TABLE "Assessment"
  DROP CONSTRAINT IF EXISTS "Assessment_platform_approval_chk",
  ADD CONSTRAINT "Assessment_platform_approval_chk"
    CHECK ("status" NOT IN ('APPROVED', 'PUBLISHED') OR "approvedAt" IS NOT NULL
        OR "schoolId" IS NOT NULL OR "ownerUserId" IS NOT NULL);
-- Purpose: assessments with unverified copyright cannot be published (§27).
ALTER TABLE "Assessment"
  DROP CONSTRAINT IF EXISTS "Assessment_copyright_chk",
  ADD CONSTRAINT "Assessment_copyright_chk" CHECK ("status" <> 'PUBLISHED' OR "copyrightStatus" <> 'UNVERIFIED');
-- Purpose (F15): licence evidence for LICENSED / OPEN_LICENSE assessments.
ALTER TABLE "Assessment"
  DROP CONSTRAINT IF EXISTS "Assessment_licence_chk",
  ADD CONSTRAINT "Assessment_licence_chk"
    CHECK (("copyrightStatus" <> 'LICENSED' OR "sourceId" IS NOT NULL)
       AND ("copyrightStatus" <> 'OPEN_LICENSE' OR "sourceId" IS NOT NULL OR "licenceCode" IS NOT NULL));
-- Purpose: positive totals, time limit and attempt cap; revision >= 1.
ALTER TABLE "Assessment"
  DROP CONSTRAINT IF EXISTS "Assessment_values_chk",
  ADD CONSTRAINT "Assessment_values_chk"
    CHECK ("revision" >= 1 AND "totalMarks" > 0
       AND ("timeLimitSeconds" IS NULL OR "timeLimitSeconds" > 0)
       AND ("maxAttempts" IS NULL OR "maxAttempts" > 0));
-- Purpose: mocks are built from a syllabus version; a route needs its version (m7: the composite route FK is not
-- checked while syllabusId is NULL, MATCH SIMPLE); adaptive tests forbid free navigation; at most one private owner,
-- and private (school/tutor) tests are never PUBLIC (F1, SC-06).
ALTER TABLE "Assessment"
  DROP CONSTRAINT IF EXISTS "Assessment_rules_chk",
  ADD CONSTRAINT "Assessment_rules_chk"
    CHECK (("kind" <> 'MOCK_EXAM' OR "syllabusId" IS NOT NULL)
       AND ("routeId" IS NULL OR "syllabusId" IS NOT NULL)
       AND ("assembly" <> 'ADAPTIVE' OR NOT "allowNavigation")
       AND num_nonnulls("schoolId", "ownerUserId") <= 1
       AND (("schoolId" IS NULL AND "ownerUserId" IS NULL) OR "accessTier" <> 'PUBLIC'));
-- Purpose: section time limit, "answer any N" count and marks are sane; an "answer any N" section states its maximum
-- marks, which is what it contributes to the attempt total (SC-02).
ALTER TABLE "AssessmentSection"
  DROP CONSTRAINT IF EXISTS "AssessmentSection_values_chk",
  ADD CONSTRAINT "AssessmentSection_values_chk"
    CHECK (("timeLimitSeconds" IS NULL OR "timeLimitSeconds" > 0)
       AND ("answerCount" IS NULL OR ("answerCount" > 0 AND "marks" IS NOT NULL))
       AND ("marks" IS NULL OR "marks" >= 0));
-- Purpose: item marks override is positive.
ALTER TABLE "AssessmentItem"
  DROP CONSTRAINT IF EXISTS "AssessmentItem_marks_chk",
  ADD CONSTRAINT "AssessmentItem_marks_chk" CHECK ("marks" IS NULL OR "marks" > 0);
-- Purpose: blueprint difficulty window within 1-5; positive counts and marks.
ALTER TABLE "AssessmentBlueprintRule"
  DROP CONSTRAINT IF EXISTS "AssessmentBlueprintRule_values_chk",
  ADD CONSTRAINT "AssessmentBlueprintRule_values_chk"
    CHECK ("difficultyMin" >= 1 AND "difficultyMax" <= 5 AND "difficultyMin" <= "difficultyMax"
       AND "questionCount" > 0 AND ("marksPerQuestion" IS NULL OR "marksPerQuestion" > 0));

-- Purpose: StudyPack draft-copy rules.
ALTER TABLE "StudyPack"
  DROP CONSTRAINT IF EXISTS "StudyPack_draft_copy_chk",
  ADD CONSTRAINT "StudyPack_draft_copy_chk"
    CHECK ("draftOfId" IS NULL OR ("draftOfId" <> "id" AND "status" IN ('DRAFT', 'IN_REVIEW', 'APPROVED')));
-- Purpose: StudyPack workflow timestamps.
ALTER TABLE "StudyPack"
  DROP CONSTRAINT IF EXISTS "StudyPack_published_at_chk",
  ADD CONSTRAINT "StudyPack_published_at_chk"
    CHECK (("status" <> 'PUBLISHED' OR "publishedAt" IS NOT NULL) AND ("status" <> 'ARCHIVED' OR "archivedAt" IS NOT NULL));
-- Purpose (F6): AI generation output is always flagged AI-generated.
ALTER TABLE "StudyPack"
  DROP CONSTRAINT IF EXISTS "StudyPack_generation_job_chk",
  ADD CONSTRAINT "StudyPack_generation_job_chk" CHECK ("generationJobId" IS NULL OR "aiGenerated");
-- Purpose (F6): AI-drafted packs need a human approver and approval time (§41).
ALTER TABLE "StudyPack"
  DROP CONSTRAINT IF EXISTS "StudyPack_ai_approval_chk",
  ADD CONSTRAINT "StudyPack_ai_approval_chk"
    CHECK (NOT "aiGenerated" OR "status" NOT IN ('APPROVED', 'PUBLISHED') OR ("approvedById" IS NOT NULL AND "approvedAt" IS NOT NULL));
-- Purpose (F6): approved/published packs went through approval.
ALTER TABLE "StudyPack"
  DROP CONSTRAINT IF EXISTS "StudyPack_platform_approval_chk",
  ADD CONSTRAINT "StudyPack_platform_approval_chk" CHECK ("status" NOT IN ('APPROVED', 'PUBLISHED') OR "approvedAt" IS NOT NULL);
-- Purpose: revision counter starts at 1.
ALTER TABLE "StudyPack"
  DROP CONSTRAINT IF EXISTS "StudyPack_revision_chk",
  ADD CONSTRAINT "StudyPack_revision_chk" CHECK ("revision" >= 1);
-- Purpose: each pack scope row targets exactly one of qualification / subject / syllabus version (§24).
ALTER TABLE "StudyPackScope"
  DROP CONSTRAINT IF EXISTS "StudyPackScope_exactly_one_chk",
  ADD CONSTRAINT "StudyPackScope_exactly_one_chk" CHECK (num_nonnulls("qualificationId", "subjectId", "syllabusId") = 1);

-- Purpose (SC-01): StudyPlanTemplate draft-copy rules.
ALTER TABLE "StudyPlanTemplate"
  DROP CONSTRAINT IF EXISTS "StudyPlanTemplate_draft_copy_chk",
  ADD CONSTRAINT "StudyPlanTemplate_draft_copy_chk"
    CHECK ("draftOfId" IS NULL OR ("draftOfId" <> "id" AND "status" IN ('DRAFT', 'IN_REVIEW', 'APPROVED')));
-- Purpose (SC-01): StudyPlanTemplate workflow timestamps.
ALTER TABLE "StudyPlanTemplate"
  DROP CONSTRAINT IF EXISTS "StudyPlanTemplate_published_at_chk",
  ADD CONSTRAINT "StudyPlanTemplate_published_at_chk"
    CHECK (("status" <> 'PUBLISHED' OR "publishedAt" IS NOT NULL) AND ("status" <> 'ARCHIVED' OR "archivedAt" IS NOT NULL));
-- Purpose (SC-01, F6): AI generation output is always flagged AI-generated.
ALTER TABLE "StudyPlanTemplate"
  DROP CONSTRAINT IF EXISTS "StudyPlanTemplate_generation_job_chk",
  ADD CONSTRAINT "StudyPlanTemplate_generation_job_chk" CHECK ("generationJobId" IS NULL OR "aiGenerated");
-- Purpose (SC-01, F6): AI-drafted templates (§41 "study plans") need a human approver and approval time.
ALTER TABLE "StudyPlanTemplate"
  DROP CONSTRAINT IF EXISTS "StudyPlanTemplate_ai_approval_chk",
  ADD CONSTRAINT "StudyPlanTemplate_ai_approval_chk"
    CHECK (NOT "aiGenerated" OR "status" NOT IN ('APPROVED', 'PUBLISHED') OR ("approvedById" IS NOT NULL AND "approvedAt" IS NOT NULL));
-- Purpose (SC-01, F6): approved/published templates went through approval.
ALTER TABLE "StudyPlanTemplate"
  DROP CONSTRAINT IF EXISTS "StudyPlanTemplate_platform_approval_chk",
  ADD CONSTRAINT "StudyPlanTemplate_platform_approval_chk" CHECK ("status" NOT IN ('APPROVED', 'PUBLISHED') OR "approvedAt" IS NOT NULL);
-- Purpose (SC-01): revision >= 1; positive length and weekly minutes.
ALTER TABLE "StudyPlanTemplate"
  DROP CONSTRAINT IF EXISTS "StudyPlanTemplate_values_chk",
  ADD CONSTRAINT "StudyPlanTemplate_values_chk"
    CHECK ("revision" >= 1 AND "durationWeeks" BETWEEN 1 AND 156 AND ("weeklyMinutes" IS NULL OR "weeklyMinutes" BETWEEN 1 AND 10080)
       AND btrim("title") <> '');
-- Purpose (SC-01): template slots: week from 1, ISO weekday 1-7 or any day, no DAILY_QUESTION / AI_TUTOR slots, a
-- LESSON slot names a lesson or topic, positive targets.
ALTER TABLE "StudyPlanTemplateItem"
  DROP CONSTRAINT IF EXISTS "StudyPlanTemplateItem_values_chk",
  ADD CONSTRAINT "StudyPlanTemplateItem_values_chk"
    CHECK ("weekNumber" >= 1 AND ("dayOfWeek" IS NULL OR "dayOfWeek" BETWEEN 1 AND 7) AND "sortOrder" >= 0
       AND "targetMinutes" BETWEEN 1 AND 1440 AND ("targetQuestions" IS NULL OR "targetQuestions" > 0)
       AND "activityType" NOT IN ('DAILY_QUESTION', 'AI_TUTOR')
       AND ("activityType" <> 'LESSON' OR "lessonId" IS NOT NULL OR "topicId" IS NOT NULL));

-- Purpose: revision snapshots carry a valid revision, schema version and sha256 content hash.
ALTER TABLE "ContentRevision"
  DROP CONSTRAINT IF EXISTS "ContentRevision_values_chk",
  ADD CONSTRAINT "ContentRevision_values_chk"
    CHECK ("revision" >= 1 AND "schemaVersion" >= 1 AND "contentHash" ~ '^[0-9a-f]{64}$');
-- Purpose: resolved/rejected flags record when (§42).
ALTER TABLE "ContentFlag"
  DROP CONSTRAINT IF EXISTS "ContentFlag_resolution_chk",
  ADD CONSTRAINT "ContentFlag_resolution_chk" CHECK ("status" NOT IN ('RESOLVED', 'REJECTED') OR "resolvedAt" IS NOT NULL);
-- Purpose (F6): the search index holds PUBLISHED content only (an indexer bug can never expose a draft).
ALTER TABLE "SearchDocument"
  DROP CONSTRAINT IF EXISTS "SearchDocument_status_chk",
  ADD CONSTRAINT "SearchDocument_status_chk" CHECK ("status" = 'PUBLISHED');
-- Purpose: a testimonial is published only with consent not withdrawn, and guardian consent for minors (§45, rule 6).
ALTER TABLE "Testimonial"
  DROP CONSTRAINT IF EXISTS "Testimonial_publish_chk",
  ADD CONSTRAINT "Testimonial_publish_chk"
    CHECK (NOT "isPublished" OR ("publishedAt" IS NOT NULL AND "consentWithdrawnAt" IS NULL
       AND (NOT "authorIsMinor" OR "guardianConsentRecordedAt" IS NOT NULL)));
-- Purpose (F9): the quote is non-blank while consent stands; it may (must, by the service) be erased once consent is
-- withdrawn or the author's account is deleted.
ALTER TABLE "Testimonial"
  DROP CONSTRAINT IF EXISTS "Testimonial_quote_chk",
  ADD CONSTRAINT "Testimonial_quote_chk" CHECK ("consentWithdrawnAt" IS NOT NULL OR btrim("quote") <> '');
-- Purpose (F16, rule 6): a demo testimonial can never be published.
ALTER TABLE "Testimonial"
  DROP CONSTRAINT IF EXISTS "Testimonial_demo_chk",
  ADD CONSTRAINT "Testimonial_demo_chk" CHECK (NOT ("isDemo" AND "isPublished"));
-- Purpose: published FAQ items record when.
ALTER TABLE "FaqItem"
  DROP CONSTRAINT IF EXISTS "FaqItem_publish_chk",
  ADD CONSTRAINT "FaqItem_publish_chk" CHECK (NOT "isPublished" OR "publishedAt" IS NOT NULL);

-- ---------------------------------------------------------------------------------------------------------------------
-- C1.4 Curriculum triggers: append-only revisions, published syllabus versions, grade bands
-- ---------------------------------------------------------------------------------------------------------------------
-- Purpose (F8): ContentRevision snapshots are append-only (§26). The only UPDATE allowed is the FK-driven SET NULL of
-- authorId / approvedById, and only once that user row is really gone (an application UPDATE can no longer erase who
-- authored or approved AI content, §41).
CREATE OR REPLACE FUNCTION content_revision_append_only() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  IF TG_OP = 'UPDATE'
     AND (to_jsonb(NEW) - 'authorId' - 'approvedById') = (to_jsonb(OLD) - 'authorId' - 'approvedById')
     AND (NEW."authorId" IS NOT DISTINCT FROM OLD."authorId"
          OR (NEW."authorId" IS NULL AND NOT EXISTS (SELECT 1 FROM "User" u WHERE u."id" = OLD."authorId")))
     AND (NEW."approvedById" IS NOT DISTINCT FROM OLD."approvedById"
          OR (NEW."approvedById" IS NULL AND NOT EXISTS (SELECT 1 FROM "User" u WHERE u."id" = OLD."approvedById"))) THEN
    RETURN NEW;
  END IF;
  RAISE EXCEPTION 'ContentRevision rows are immutable (% on revision %)', TG_OP, OLD."id"
    USING ERRCODE = 'restrict_violation';
END
$$;
-- Purpose: attach the append-only guard to ContentRevision.
CREATE OR REPLACE TRIGGER "ContentRevision_append_only"
  BEFORE UPDATE OR DELETE ON "ContentRevision"
  FOR EACH ROW EXECUTE FUNCTION content_revision_append_only();

-- Purpose: a published syllabus version cannot be deleted, cannot return to DRAFT, and its identity/lineage is frozen.
CREATE OR REPLACE FUNCTION syllabus_guard_published() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  IF TG_OP = 'DELETE' THEN
    IF OLD."status" <> 'DRAFT' THEN
      RAISE EXCEPTION 'Published syllabus version % cannot be deleted; archive it', OLD."id" USING ERRCODE = 'restrict_violation';
    END IF;
    RETURN OLD;
  END IF;
  IF OLD."status" <> 'DRAFT' THEN
    IF NEW."status" = 'DRAFT' THEN
      RAISE EXCEPTION 'Published syllabus version % cannot return to DRAFT', OLD."id" USING ERRCODE = 'restrict_violation';
    END IF;
    IF (NEW."subjectId", NEW."versionLabel", NEW."code", NEW."supersedesId")
       IS DISTINCT FROM (OLD."subjectId", OLD."versionLabel", OLD."code", OLD."supersedesId") THEN
      RAISE EXCEPTION 'Identity of published syllabus version % is immutable', OLD."id" USING ERRCODE = 'restrict_violation';
    END IF;
  END IF;
  RETURN NEW;
END
$$;
-- Purpose: attach the published-version guard to Syllabus.
CREATE OR REPLACE TRIGGER "Syllabus_guard_published"
  BEFORE UPDATE OR DELETE ON "Syllabus"
  FOR EACH ROW EXECUTE FUNCTION syllabus_guard_published();

-- Purpose: no topic insert/delete/structural change in a published version. Editorial columns (name, description,
-- publicSummary, metaTitle, metaDescription, isPublic, estimatedStudyMinutes, originTopicId, importId) may change.
CREATE OR REPLACE FUNCTION topic_guard_published() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    PERFORM curriculum_assert_syllabus_draft(NEW."syllabusId");
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    PERFORM curriculum_assert_syllabus_draft(OLD."syllabusId");
    RETURN OLD;
  END IF;
  IF (NEW."syllabusId", NEW."parentId", NEW."kind", NEW."depth", NEW."path", NEW."sortOrder", NEW."code", NEW."slug",
      NEW."isOptional", NEW."optionGroup", NEW."examYearFrom", NEW."examYearTo")
     IS DISTINCT FROM
     (OLD."syllabusId", OLD."parentId", OLD."kind", OLD."depth", OLD."path", OLD."sortOrder", OLD."code", OLD."slug",
      OLD."isOptional", OLD."optionGroup", OLD."examYearFrom", OLD."examYearTo") THEN
    PERFORM curriculum_assert_syllabus_draft(OLD."syllabusId");
    PERFORM curriculum_assert_syllabus_draft(NEW."syllabusId");
  END IF;
  RETURN NEW;
END
$$;
-- Purpose: attach the topic guard.
CREATE OR REPLACE TRIGGER "Topic_guard_published"
  BEFORE INSERT OR UPDATE OR DELETE ON "Topic"
  FOR EACH ROW EXECUTE FUNCTION topic_guard_published();

-- Purpose: no objective insert/delete/move/re-code in a published version (statement wording may be corrected).
CREATE OR REPLACE FUNCTION objective_guard_published() RETURNS trigger LANGUAGE plpgsql AS $$
DECLARE
  v_syllabus uuid;
BEGIN
  IF TG_OP = 'UPDATE'
     AND (NEW."topicId", NEW."code", NEW."sortOrder") IS NOT DISTINCT FROM (OLD."topicId", OLD."code", OLD."sortOrder") THEN
    RETURN NEW;
  END IF;
  IF TG_OP <> 'INSERT' THEN
    SELECT "syllabusId" INTO v_syllabus FROM "Topic" WHERE "id" = OLD."topicId";
    PERFORM curriculum_assert_syllabus_draft(v_syllabus);
  END IF;
  IF TG_OP <> 'DELETE' THEN
    SELECT "syllabusId" INTO v_syllabus FROM "Topic" WHERE "id" = NEW."topicId";
    PERFORM curriculum_assert_syllabus_draft(v_syllabus);
    RETURN NEW;
  END IF;
  RETURN OLD;
END
$$;
-- Purpose: attach the objective guard.
CREATE OR REPLACE TRIGGER "LearningObjective_guard_published"
  BEFORE INSERT OR UPDATE OR DELETE ON "LearningObjective"
  FOR EACH ROW EXECUTE FUNCTION objective_guard_published();

-- Purpose: SyllabusComponent / SyllabusRoute: no insert/delete/re-code in a published version. Component facts
-- (kind, duration, marks, weighting, calculator) are frozen too; names/descriptions/grade-scheme links may change.
CREATE OR REPLACE FUNCTION syllabus_child_guard_published() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  IF TG_OP = 'DELETE' THEN
    PERFORM curriculum_assert_syllabus_draft(OLD."syllabusId");
    RETURN OLD;
  ELSIF TG_OP = 'INSERT' THEN
    PERFORM curriculum_assert_syllabus_draft(NEW."syllabusId");
    RETURN NEW;
  END IF;
  IF NEW."syllabusId" <> OLD."syllabusId" OR NEW."code" <> OLD."code"
     OR (TG_TABLE_NAME = 'SyllabusComponent'
         AND (to_jsonb(NEW) - ARRAY['name', 'description', 'sortOrder', 'updatedAt'])
             <> (to_jsonb(OLD) - ARRAY['name', 'description', 'sortOrder', 'updatedAt'])) THEN
    PERFORM curriculum_assert_syllabus_draft(OLD."syllabusId");
    PERFORM curriculum_assert_syllabus_draft(NEW."syllabusId");
  END IF;
  RETURN NEW;
END
$$;
-- Purpose: attach the child guard to SyllabusComponent (papers).
CREATE OR REPLACE TRIGGER "SyllabusComponent_guard_published"
  BEFORE INSERT OR UPDATE OR DELETE ON "SyllabusComponent"
  FOR EACH ROW EXECUTE FUNCTION syllabus_child_guard_published();
-- Purpose: attach the child guard to SyllabusRoute (awards). Also keeps SubjectEnrollment.routeId targets stable.
CREATE OR REPLACE TRIGGER "SyllabusRoute_guard_published"
  BEFORE INSERT OR UPDATE OR DELETE ON "SyllabusRoute"
  FOR EACH ROW EXECUTE FUNCTION syllabus_child_guard_published();

-- Purpose: TopicComponent join rows cannot change in a published version.
CREATE OR REPLACE FUNCTION topic_component_guard_published() RETURNS trigger LANGUAGE plpgsql AS $$
DECLARE
  v_syllabus uuid;
BEGIN
  SELECT "syllabusId" INTO v_syllabus FROM "Topic"
   WHERE "id" = CASE WHEN TG_OP = 'DELETE' THEN OLD."topicId" ELSE NEW."topicId" END;
  PERFORM curriculum_assert_syllabus_draft(v_syllabus);
  IF TG_OP = 'DELETE' THEN RETURN OLD; END IF;
  RETURN NEW;
END
$$;
-- Purpose: attach the TopicComponent guard.
CREATE OR REPLACE TRIGGER "TopicComponent_guard_published"
  BEFORE INSERT OR UPDATE OR DELETE ON "TopicComponent"
  FOR EACH ROW EXECUTE FUNCTION topic_component_guard_published();

-- Purpose: SyllabusRouteComponent join rows cannot change in a published version.
CREATE OR REPLACE FUNCTION route_component_guard_published() RETURNS trigger LANGUAGE plpgsql AS $$
DECLARE
  v_syllabus uuid;
BEGIN
  SELECT "syllabusId" INTO v_syllabus FROM "SyllabusRoute"
   WHERE "id" = CASE WHEN TG_OP = 'DELETE' THEN OLD."routeId" ELSE NEW."routeId" END;
  PERFORM curriculum_assert_syllabus_draft(v_syllabus);
  IF TG_OP = 'DELETE' THEN RETURN OLD; END IF;
  RETURN NEW;
END
$$;
-- Purpose: attach the SyllabusRouteComponent guard.
CREATE OR REPLACE TRIGGER "SyllabusRouteComponent_guard_published"
  BEFORE INSERT OR UPDATE OR DELETE ON "SyllabusRouteComponent"
  FOR EACH ROW EXECUTE FUNCTION route_component_guard_published();

-- Purpose (SC-10, F17): grade boundaries are versioned by immutability: once any attempt's grade estimate used a
-- scheme, its bands can no longer be inserted, changed or deleted (a change = a new GradeScheme row, version + 1), so
-- stored grade estimates and pass flags always reproduce. Uses the AssessmentAttempt(gradeSchemeId) FK index.
CREATE OR REPLACE FUNCTION grade_band_freeze_used() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  IF TG_OP <> 'INSERT' THEN
    IF EXISTS (SELECT 1 FROM "AssessmentAttempt" a WHERE a."gradeSchemeId" = OLD."gradeSchemeId") THEN
      RAISE EXCEPTION 'GradeScheme % is used by attempts; its bands are frozen (create a new scheme version)', OLD."gradeSchemeId"
        USING ERRCODE = 'restrict_violation';
    END IF;
  END IF;
  IF TG_OP <> 'DELETE' THEN
    IF EXISTS (SELECT 1 FROM "AssessmentAttempt" a WHERE a."gradeSchemeId" = NEW."gradeSchemeId") THEN
      RAISE EXCEPTION 'GradeScheme % is used by attempts; its bands are frozen (create a new scheme version)', NEW."gradeSchemeId"
        USING ERRCODE = 'restrict_violation';
    END IF;
    RETURN NEW;
  END IF;
  RETURN OLD;
END
$$;
-- Purpose: attach the band freeze.
CREATE OR REPLACE TRIGGER "GradeBand_freeze_used"
  BEFORE INSERT OR UPDATE OR DELETE ON "GradeBand"
  FOR EACH ROW EXECUTE FUNCTION grade_band_freeze_used();

-- Purpose (F12): a PUBLISHED assessment or study-plan template never references a DRAFT (editable) syllabus version.
CREATE OR REPLACE FUNCTION published_requires_published_syllabus() RETURNS trigger LANGUAGE plpgsql AS $$
DECLARE
  v_status "SyllabusStatus";
BEGIN
  IF NEW."status" = 'PUBLISHED' AND NEW."syllabusId" IS NOT NULL THEN
    SELECT "status" INTO v_status FROM "Syllabus" WHERE "id" = NEW."syllabusId" FOR SHARE;
    IF v_status = 'DRAFT' THEN
      RAISE EXCEPTION '% % cannot be PUBLISHED against DRAFT syllabus version %', TG_TABLE_NAME, NEW."id", NEW."syllabusId"
        USING ERRCODE = 'restrict_violation';
    END IF;
  END IF;
  RETURN NEW;
END
$$;
-- Purpose: attach to Assessment (mocks are built from a version's papers).
CREATE OR REPLACE TRIGGER "Assessment_published_syllabus"
  BEFORE INSERT OR UPDATE OF "status", "syllabusId" ON "Assessment"
  FOR EACH ROW EXECUTE FUNCTION published_requires_published_syllabus();
-- Purpose: attach to StudyPlanTemplate (its topics belong to the version).
CREATE OR REPLACE TRIGGER "StudyPlanTemplate_published_syllabus"
  BEFORE INSERT OR UPDATE OF "status", "syllabusId" ON "StudyPlanTemplate"
  FOR EACH ROW EXECUTE FUNCTION published_requires_published_syllabus();

-- ---------------------------------------------------------------------------------------------------------------------
-- C1.5 Content workflow, revisions and immutability (F5, F6; §26, §41, §42, rule 7)
-- Tables: Lesson, Question, Flashcard, Assessment, StudyPack, StudyPlanTemplate. Personal flashcards are exempt.
-- ---------------------------------------------------------------------------------------------------------------------
-- Purpose (F6, F5.4): the editorial workflow cannot be bypassed:
--   (a) aiGenerated never flips back to false (AI provenance is permanent; the publish merge ORs it);
--   (b) AI-generated rows (except personal flashcards) and imported rows are inserted as DRAFT;
--   (c) PLATFORM rows move only DRAFT -> IN_REVIEW -> APPROVED -> PUBLISHED -> ARCHIVED, back to DRAFT from IN_REVIEW /
--       APPROVED / ARCHIVED (PUBLISHED -> DRAFT is refused: edit through a draft copy instead);
--   (d) with app.four_eyes = 'on' (database default in production, section D) the approver of a platform root row is
--       not its creator ("the last author cannot approve", ARCHITECTURE §5.3).
-- School/tutor-owned questions and tests follow their owner's lighter workflow (a, b only).
CREATE OR REPLACE FUNCTION content_workflow_guard() RETURNS trigger LANGUAGE plpgsql AS $$
DECLARE
  v_new      jsonb   := to_jsonb(NEW);
  v_platform boolean := content_is_platform(v_new);
  v_personal boolean := TG_TABLE_NAME = 'Flashcard' AND (v_new ->> 'ownerUserId') IS NOT NULL;
  v_part     boolean := TG_TABLE_NAME = 'Question' AND (v_new ->> 'parentId') IS NOT NULL;
BEGIN
  IF TG_OP = 'INSERT' THEN
    IF NEW."aiGenerated" AND NEW."status" <> 'DRAFT' AND NOT v_personal THEN
      RAISE EXCEPTION '% %: AI-generated content must be inserted as DRAFT (§41)', TG_TABLE_NAME, NEW."id"
        USING ERRCODE = 'check_violation';
    END IF;
    IF (v_new ->> 'importId') IS NOT NULL AND NEW."status" <> 'DRAFT' THEN
      RAISE EXCEPTION '% %: imported content must be inserted as DRAFT (§25)', TG_TABLE_NAME, NEW."id"
        USING ERRCODE = 'check_violation';
    END IF;
    RETURN NEW;
  END IF;
  IF OLD."aiGenerated" AND NOT NEW."aiGenerated" THEN
    RAISE EXCEPTION '% %: aiGenerated cannot be cleared (§41)', TG_TABLE_NAME, NEW."id" USING ERRCODE = 'check_violation';
  END IF;
  IF NEW."status" IS DISTINCT FROM OLD."status" AND v_platform AND NOT (
       (OLD."status" = 'DRAFT'     AND NEW."status" = 'IN_REVIEW')
    OR (OLD."status" = 'IN_REVIEW' AND NEW."status" IN ('DRAFT', 'APPROVED'))
    OR (OLD."status" = 'APPROVED'  AND NEW."status" IN ('DRAFT', 'PUBLISHED'))
    OR (OLD."status" = 'PUBLISHED' AND NEW."status" = 'ARCHIVED')
    OR (OLD."status" = 'ARCHIVED'  AND NEW."status" = 'DRAFT')) THEN
    RAISE EXCEPTION '% %: illegal workflow transition % -> % (§42)', TG_TABLE_NAME, NEW."id", OLD."status", NEW."status"
      USING ERRCODE = 'check_violation';
  END IF;
  IF NEW."status" = 'APPROVED' AND OLD."status" IS DISTINCT FROM 'APPROVED' AND v_platform AND NOT v_part
     AND current_setting('app.four_eyes', true) = 'on'
     AND (NEW."approvedById" IS NULL OR NEW."approvedById" = NEW."createdById") THEN
    RAISE EXCEPTION '% %: the approver must be a different person from the author (four-eyes)', TG_TABLE_NAME, NEW."id"
      USING ERRCODE = 'check_violation';
  END IF;
  RETURN NEW;
END
$$;
-- Purpose: attach the workflow guard to every workflow table.
CREATE OR REPLACE TRIGGER "Lesson_workflow_guard" BEFORE INSERT OR UPDATE ON "Lesson"
  FOR EACH ROW EXECUTE FUNCTION content_workflow_guard();
CREATE OR REPLACE TRIGGER "Question_workflow_guard" BEFORE INSERT OR UPDATE ON "Question"
  FOR EACH ROW EXECUTE FUNCTION content_workflow_guard();
CREATE OR REPLACE TRIGGER "Flashcard_workflow_guard" BEFORE INSERT OR UPDATE ON "Flashcard"
  FOR EACH ROW EXECUTE FUNCTION content_workflow_guard();
CREATE OR REPLACE TRIGGER "Assessment_workflow_guard" BEFORE INSERT OR UPDATE ON "Assessment"
  FOR EACH ROW EXECUTE FUNCTION content_workflow_guard();
CREATE OR REPLACE TRIGGER "StudyPack_workflow_guard" BEFORE INSERT OR UPDATE ON "StudyPack"
  FOR EACH ROW EXECUTE FUNCTION content_workflow_guard();
CREATE OR REPLACE TRIGGER "StudyPlanTemplate_workflow_guard" BEFORE INSERT OR UPDATE ON "StudyPlanTemplate"
  FOR EACH ROW EXECUTE FUNCTION content_workflow_guard();

-- Purpose (F5): what students saw at revision N never changes. The trigger arguments are the CONTENT columns of the
-- table (render caches such as bodyHtml/renderedHtml/renderVersion/contentHash and commercial columns stay editable):
--   * revision only stays or advances by exactly 1;
--   * a PUBLISHED row whose content changes and stays PUBLISHED must advance its revision (the publish merge);
--   * archiving must not change content;
--   * re-opening a PUBLISHED/ARCHIVED row for editing (any non-published status) starts revision + 1.
-- Combined with <T>_revision_snapshot below, every (id, revision) seen by a student has exactly one snapshot.
CREATE OR REPLACE FUNCTION content_published_immutable() RETURNS trigger LANGUAGE plpgsql AS $$
DECLARE
  v_old     jsonb   := to_jsonb(OLD);
  v_new     jsonb   := to_jsonb(NEW);
  v_col     text;
  v_changed boolean := false;
BEGIN
  IF TG_TABLE_NAME = 'Flashcard' AND (v_new ->> 'ownerUserId') IS NOT NULL THEN
    RETURN NEW;  -- personal cards: private to their owner, no revisions
  END IF;
  IF NEW."revision" < OLD."revision" OR NEW."revision" > OLD."revision" + 1 THEN
    RAISE EXCEPTION '% %: revision may only stay at % or advance to %', TG_TABLE_NAME, NEW."id", OLD."revision", OLD."revision" + 1
      USING ERRCODE = 'check_violation';
  END IF;
  FOREACH v_col IN ARRAY TG_ARGV LOOP
    IF (v_new -> v_col) IS DISTINCT FROM (v_old -> v_col) THEN
      v_changed := true;
      EXIT;
    END IF;
  END LOOP;
  IF OLD."status" = 'PUBLISHED' AND NEW."status" = 'PUBLISHED' AND v_changed AND NEW."revision" <> OLD."revision" + 1 THEN
    RAISE EXCEPTION '% %: published content changed without a new revision (§26, §42)', TG_TABLE_NAME, NEW."id"
      USING ERRCODE = 'check_violation';
  ELSIF OLD."status" = 'PUBLISHED' AND NEW."status" = 'ARCHIVED' AND v_changed THEN
    RAISE EXCEPTION '% %: archiving must not change content', TG_TABLE_NAME, NEW."id" USING ERRCODE = 'check_violation';
  ELSIF OLD."status" IN ('PUBLISHED', 'ARCHIVED') AND NEW."status" IN ('DRAFT', 'IN_REVIEW', 'APPROVED')
        AND NEW."revision" <> OLD."revision" + 1 THEN
    RAISE EXCEPTION '% %: re-opening published content must start revision %', TG_TABLE_NAME, NEW."id", OLD."revision" + 1
      USING ERRCODE = 'check_violation';
  END IF;
  RETURN NEW;
END
$$;
-- Purpose: attach the immutability guard with each table's content columns.
CREATE OR REPLACE TRIGGER "Lesson_published_immutable" BEFORE UPDATE ON "Lesson"
  FOR EACH ROW EXECUTE FUNCTION content_published_immutable('title', 'summary', 'body', 'kind');
CREATE OR REPLACE TRIGGER "Question_published_immutable" BEFORE UPDATE ON "Question"
  FOR EACH ROW EXECUTE FUNCTION content_published_immutable(
    'type', 'markingMode', 'stem', 'payload', 'answerSpec', 'explanation', 'workedSolution', 'hints', 'conceptSummary',
    'difficulty', 'marks', 'parentId', 'partLabel', 'partOrder');
CREATE OR REPLACE TRIGGER "Flashcard_published_immutable" BEFORE UPDATE ON "Flashcard"
  FOR EACH ROW EXECUTE FUNCTION content_published_immutable('front', 'back', 'notes', 'cardType');
CREATE OR REPLACE TRIGGER "Assessment_published_immutable" BEFORE UPDATE ON "Assessment"
  FOR EACH ROW EXECUTE FUNCTION content_published_immutable(
    'kind', 'assembly', 'syllabusId', 'routeId', 'instructions', 'timeLimitSeconds', 'totalMarks', 'gradeSchemeId',
    'feedbackTiming', 'shuffleQuestions', 'shuffleOptions', 'allowNavigation');
CREATE OR REPLACE TRIGGER "StudyPack_published_immutable" BEFORE UPDATE ON "StudyPack"
  FOR EACH ROW EXECUTE FUNCTION content_published_immutable('entitlements');
CREATE OR REPLACE TRIGGER "StudyPlanTemplate_published_immutable" BEFORE UPDATE ON "StudyPlanTemplate"
  FOR EACH ROW EXECUTE FUNCTION content_published_immutable('syllabusId', 'routeId', 'durationWeeks', 'weeklyMinutes');

-- Purpose (F5): a live PUBLISHED row always has the ContentRevision snapshot of its current revision. Checked at
-- COMMIT (deferred), so the publish transaction can update the row first and insert the snapshot after it; the check
-- re-reads the row so later changes in the same transaction are judged on the final state.
CREATE OR REPLACE FUNCTION assert_revision_snapshot() RETURNS trigger LANGUAGE plpgsql AS $$
DECLARE
  v_status   text;
  v_revision int;
BEGIN
  EXECUTE format('SELECT "status"::text, "revision" FROM %I WHERE "id" = $1', TG_TABLE_NAME)
    INTO v_status, v_revision USING NEW."id";
  IF v_status IS DISTINCT FROM 'PUBLISHED' THEN
    RETURN NULL;  -- deleted or no longer published by commit time
  END IF;
  IF NOT EXISTS (SELECT 1 FROM "ContentRevision" r
                  WHERE r."entityType" = TG_ARGV[0]::"ContentEntityType" AND r."entityId" = NEW."id"
                    AND r."revision" = v_revision) THEN
    RAISE EXCEPTION '% % is PUBLISHED at revision % without its ContentRevision snapshot (§26, §42)',
      TG_TABLE_NAME, NEW."id", v_revision USING ERRCODE = 'integrity_constraint_violation';
  END IF;
  RETURN NULL;
END
$$;
-- Purpose: attach the deferred snapshot check (live root rows only; parts and personal cards excluded).
DROP TRIGGER IF EXISTS "Lesson_revision_snapshot" ON "Lesson";
CREATE CONSTRAINT TRIGGER "Lesson_revision_snapshot" AFTER INSERT OR UPDATE OF "status", "revision" ON "Lesson"
  DEFERRABLE INITIALLY DEFERRED FOR EACH ROW
  WHEN (NEW."status" = 'PUBLISHED' AND NEW."draftOfId" IS NULL)
  EXECUTE FUNCTION assert_revision_snapshot('LESSON');
DROP TRIGGER IF EXISTS "Question_revision_snapshot" ON "Question";
CREATE CONSTRAINT TRIGGER "Question_revision_snapshot" AFTER INSERT OR UPDATE OF "status", "revision" ON "Question"
  DEFERRABLE INITIALLY DEFERRED FOR EACH ROW
  WHEN (NEW."status" = 'PUBLISHED' AND NEW."draftOfId" IS NULL AND NEW."parentId" IS NULL)
  EXECUTE FUNCTION assert_revision_snapshot('QUESTION');
DROP TRIGGER IF EXISTS "Flashcard_revision_snapshot" ON "Flashcard";
CREATE CONSTRAINT TRIGGER "Flashcard_revision_snapshot" AFTER INSERT OR UPDATE OF "status", "revision" ON "Flashcard"
  DEFERRABLE INITIALLY DEFERRED FOR EACH ROW
  WHEN (NEW."status" = 'PUBLISHED' AND NEW."draftOfId" IS NULL AND NEW."ownerUserId" IS NULL)
  EXECUTE FUNCTION assert_revision_snapshot('FLASHCARD');
DROP TRIGGER IF EXISTS "Assessment_revision_snapshot" ON "Assessment";
CREATE CONSTRAINT TRIGGER "Assessment_revision_snapshot" AFTER INSERT OR UPDATE OF "status", "revision" ON "Assessment"
  DEFERRABLE INITIALLY DEFERRED FOR EACH ROW
  WHEN (NEW."status" = 'PUBLISHED' AND NEW."draftOfId" IS NULL)
  EXECUTE FUNCTION assert_revision_snapshot('ASSESSMENT');
DROP TRIGGER IF EXISTS "StudyPack_revision_snapshot" ON "StudyPack";
CREATE CONSTRAINT TRIGGER "StudyPack_revision_snapshot" AFTER INSERT OR UPDATE OF "status", "revision" ON "StudyPack"
  DEFERRABLE INITIALLY DEFERRED FOR EACH ROW
  WHEN (NEW."status" = 'PUBLISHED' AND NEW."draftOfId" IS NULL)
  EXECUTE FUNCTION assert_revision_snapshot('STUDY_PACK');
DROP TRIGGER IF EXISTS "StudyPlanTemplate_revision_snapshot" ON "StudyPlanTemplate";
CREATE CONSTRAINT TRIGGER "StudyPlanTemplate_revision_snapshot" AFTER INSERT OR UPDATE OF "status", "revision" ON "StudyPlanTemplate"
  DEFERRABLE INITIALLY DEFERRED FOR EACH ROW
  WHEN (NEW."status" = 'PUBLISHED' AND NEW."draftOfId" IS NULL)
  EXECUTE FUNCTION assert_revision_snapshot('STUDY_PLAN_TEMPLATE');

-- Purpose (F5.3): children that define what a student sees or is graded on (MCQ options = answer keys, structured
-- parts, lesson practice questions, assessment sections/items/rules, study-pack scopes, plan-template slots) change
-- under a PUBLISHED root only inside that root's publish transaction, which sets
-- set_config('app.content_publish', <root id>, true). Tags (QuestionTopic, LessonTopic, ...) are metadata and stay
-- editable, so a new syllabus version can be tagged without a new revision.
CREATE OR REPLACE FUNCTION content_child_root(p_table text, p_row jsonb, OUT root_table text, OUT root_id uuid)
  LANGUAGE plpgsql STABLE AS $$
BEGIN
  CASE p_table
    WHEN 'QuestionOption' THEN
      root_table := 'Question'; root_id := question_root_id((p_row ->> 'questionId')::uuid);
    WHEN 'Question' THEN
      root_table := 'Question'; root_id := question_root_id((p_row ->> 'parentId')::uuid);
    WHEN 'LessonQuestion' THEN
      root_table := 'Lesson'; root_id := (p_row ->> 'lessonId')::uuid;
    WHEN 'AssessmentSection' THEN
      root_table := 'Assessment'; root_id := (p_row ->> 'assessmentId')::uuid;
    WHEN 'AssessmentItem', 'AssessmentBlueprintRule' THEN
      root_table := 'Assessment';
      SELECT s."assessmentId" INTO root_id FROM "AssessmentSection" s WHERE s."id" = (p_row ->> 'sectionId')::uuid;
    WHEN 'StudyPackScope' THEN
      root_table := 'StudyPack'; root_id := (p_row ->> 'studyPackId')::uuid;
    WHEN 'StudyPlanTemplateItem' THEN
      root_table := 'StudyPlanTemplate'; root_id := (p_row ->> 'templateId')::uuid;
    ELSE
      RAISE EXCEPTION 'content_child_root: unsupported table %', p_table;
  END CASE;
END
$$;
-- Purpose: the guard itself (checks the OLD and the NEW parent, so moving a child between roots is covered too).
CREATE OR REPLACE FUNCTION content_child_guard() RETURNS trigger LANGUAGE plpgsql AS $$
DECLARE
  v_rows   jsonb[];
  v_row    jsonb;
  v_root   record;
  v_status text;
BEGIN
  IF TG_OP IN ('UPDATE', 'DELETE') THEN v_rows := array_append(v_rows, to_jsonb(OLD)); END IF;
  IF TG_OP IN ('INSERT', 'UPDATE') THEN v_rows := array_append(v_rows, to_jsonb(NEW)); END IF;
  FOREACH v_row IN ARRAY v_rows LOOP
    -- On "Question" only PART rows are children; roots are covered by content_published_immutable.
    IF TG_TABLE_NAME = 'Question' AND (v_row ->> 'parentId') IS NULL THEN CONTINUE; END IF;
    SELECT * INTO v_root FROM content_child_root(TG_TABLE_NAME, v_row);
    IF v_root.root_id IS NULL THEN CONTINUE; END IF;  -- root being deleted / FK will report a bad reference
    EXECUTE format('SELECT "status"::text FROM %I WHERE "id" = $1', v_root.root_table) INTO v_status USING v_root.root_id;
    IF v_status = 'PUBLISHED' AND current_setting('app.content_publish', true) IS DISTINCT FROM v_root.root_id::text THEN
      RAISE EXCEPTION '% row of PUBLISHED % % changes only inside its publish transaction (create a draft copy)',
        TG_TABLE_NAME, v_root.root_table, v_root.root_id USING ERRCODE = 'check_violation';
    END IF;
  END LOOP;
  IF TG_OP = 'DELETE' THEN RETURN OLD; END IF;
  RETURN NEW;
END
$$;
-- Purpose: attach the child guard (Question: only part rows and only their content columns, so status mirroring and
-- re-rendering of parts stay possible).
CREATE OR REPLACE TRIGGER "QuestionOption_child_guard" BEFORE INSERT OR UPDATE OR DELETE ON "QuestionOption"
  FOR EACH ROW EXECUTE FUNCTION content_child_guard();
CREATE OR REPLACE TRIGGER "Question_part_child_guard"
  BEFORE INSERT OR DELETE OR UPDATE OF "parentId", "partLabel", "partOrder", "type", "markingMode", "stem", "payload",
    "answerSpec", "explanation", "workedSolution", "hints", "conceptSummary", "difficulty", "marks" ON "Question"
  FOR EACH ROW EXECUTE FUNCTION content_child_guard();
CREATE OR REPLACE TRIGGER "LessonQuestion_child_guard" BEFORE INSERT OR UPDATE OR DELETE ON "LessonQuestion"
  FOR EACH ROW EXECUTE FUNCTION content_child_guard();
CREATE OR REPLACE TRIGGER "AssessmentSection_child_guard" BEFORE INSERT OR UPDATE OR DELETE ON "AssessmentSection"
  FOR EACH ROW EXECUTE FUNCTION content_child_guard();
CREATE OR REPLACE TRIGGER "AssessmentItem_child_guard" BEFORE INSERT OR UPDATE OR DELETE ON "AssessmentItem"
  FOR EACH ROW EXECUTE FUNCTION content_child_guard();
CREATE OR REPLACE TRIGGER "AssessmentBlueprintRule_child_guard" BEFORE INSERT OR UPDATE OR DELETE ON "AssessmentBlueprintRule"
  FOR EACH ROW EXECUTE FUNCTION content_child_guard();
CREATE OR REPLACE TRIGGER "StudyPackScope_child_guard" BEFORE INSERT OR UPDATE OR DELETE ON "StudyPackScope"
  FOR EACH ROW EXECUTE FUNCTION content_child_guard();
CREATE OR REPLACE TRIGGER "StudyPlanTemplateItem_child_guard" BEFORE INSERT OR UPDATE OR DELETE ON "StudyPlanTemplateItem"
  FOR EACH ROW EXECUTE FUNCTION content_child_guard();


-- =====================================================================================================================
-- C2. LEARNING & ENGAGEMENT
-- =====================================================================================================================

-- ---------------------------------------------------------------------------------------------------------------------
-- C2.1 Partial unique indexes
-- ---------------------------------------------------------------------------------------------------------------------
-- Purpose: exactly one ACTIVE study plan per user (§16).
CREATE UNIQUE INDEX IF NOT EXISTS "StudyPlan_one_active_per_user_key"
  ON "StudyPlan" ("userId") WHERE ("status" = 'ACTIVE');
-- Purpose: at most one open attempt per (user, assessment); a double start from two tabs/devices resumes the same attempt.
CREATE UNIQUE INDEX IF NOT EXISTS "AssessmentAttempt_one_open_per_assessment_key"
  ON "AssessmentAttempt" ("userId", "assessmentId")
  WHERE ("status" = 'IN_PROGRESS' AND "assessmentId" IS NOT NULL);
-- Purpose: leaderboard natural key for GLOBAL rows (scopeId NULL, which a plain unique would not deduplicate). Also the
-- ON CONFLICT target of the hourly score upsert.
CREATE UNIQUE INDEX IF NOT EXISTS "LeaderboardEntry_global_user_key"
  ON "LeaderboardEntry" ("metric", "periodKey", "scopeType", "userId") WHERE ("scopeId" IS NULL);
-- Purpose: leaderboard natural key for scoped rows (country/school/class/subject).
CREATE UNIQUE INDEX IF NOT EXISTS "LeaderboardEntry_scoped_user_key"
  ON "LeaderboardEntry" ("metric", "periodKey", "scopeType", "scopeId", "userId") WHERE ("scopeId" IS NOT NULL);

-- ---------------------------------------------------------------------------------------------------------------------
-- C2.2 Partial (non-unique) indexes
-- RULE: no index or index predicate on AssessmentAttempt may reference lastSavedAt, timeSpentSeconds, questionCount,
-- lastPosition or updatedAt: they change on every answer save, and an index on them makes every save non-HOT
-- (measured on PG 18.3: 0 of 1,000 autosaves HOT with such an index; 392 of 1,000 without, in a tight loop).
-- ---------------------------------------------------------------------------------------------------------------------
-- Purpose: resume a student's open attempts; disable the tutor during a timed attempt.
CREATE INDEX IF NOT EXISTS "AssessmentAttempt_open_by_user_idx"
  ON "AssessmentAttempt" ("userId", "startedAt") WHERE ("status" = 'IN_PROGRESS');
-- Purpose: auto-submit sweep for timed attempts past their overall deadline (§12 timer).
CREATE INDEX IF NOT EXISTS "AssessmentAttempt_open_deadline_idx"
  ON "AssessmentAttempt" ("deadlineAt") WHERE ("status" = 'IN_PROGRESS' AND "deadlineAt" IS NOT NULL);
-- Purpose (M1): idle-close sweep for untimed attempts, keyed on the IMMUTABLE startedAt so answer saves stay HOT.
-- Sweep: WHERE "status" = 'IN_PROGRESS' AND "deadlineAt" IS NULL AND "startedAt" < :cutoff AND "lastSavedAt" < :cutoff
-- (correct because lastSavedAt >= startedAt, AssessmentAttempt_timestamps_chk; the open set is small).
CREATE INDEX IF NOT EXISTS "AssessmentAttempt_open_idle_idx"
  ON "AssessmentAttempt" ("startedAt") WHERE ("status" = 'IN_PROGRESS' AND "deadlineAt" IS NULL);
-- Purpose: marking recovery for attempts stuck in SUBMITTED / AWAITING_MARKING.
CREATE INDEX IF NOT EXISTS "AssessmentAttempt_marking_queue_idx"
  ON "AssessmentAttempt" ("submittedAt") WHERE ("status" IN ('SUBMITTED', 'AWAITING_MARKING'));
-- Purpose: content-team review queue of attempts with provisional marks. Deliberately on the attempt, not on
-- QuestionAttempt."markingStatus", so marking updates on the hot table stay HOT.
CREATE INDEX IF NOT EXISTS "AssessmentAttempt_pending_review_idx"
  ON "AssessmentAttempt" ("submittedAt") WHERE ("pendingReviewCount" > 0);
-- Purpose (SC-03): per-paper auto-submit sweep: open sections past their own deadline.
CREATE INDEX IF NOT EXISTS "AssessmentAttemptSection_open_deadline_idx"
  ON "AssessmentAttemptSection" ("deadlineAt") WHERE ("submittedAt" IS NULL AND "deadlineAt" IS NOT NULL);
-- Purpose: nightly MISSED sweep of pending plan items.
CREATE INDEX IF NOT EXISTS "StudyPlanItem_pending_by_date_idx"
  ON "StudyPlanItem" ("date") WHERE ("status" = 'PENDING');
-- Purpose: suspect-answer-key list for quality control (§42).
CREATE INDEX IF NOT EXISTS "QuestionStats_suspect_idx"
  ON "QuestionStats" ("updatedAt") WHERE ("suspectAnswerKey" = true);
-- Purpose: due reminders / auto-close of published assignments.
CREATE INDEX IF NOT EXISTS "Assignment_published_due_idx"
  ON "Assignment" ("dueAt") WHERE ("status" = 'PUBLISHED' AND "dueAt" IS NOT NULL);

-- ---------------------------------------------------------------------------------------------------------------------
-- C2.3 CHECK constraints
-- ---------------------------------------------------------------------------------------------------------------------
-- Purpose: a recorded diagnostic attempt implies the diagnostic completion time (§52).
ALTER TABLE "SubjectEnrollment"
  DROP CONSTRAINT IF EXISTS "SubjectEnrollment_diagnostic_chk",
  ADD CONSTRAINT "SubjectEnrollment_diagnostic_chk" CHECK ("diagnosticAttemptId" IS NULL OR "diagnosticCompletedAt" IS NOT NULL);

-- Purpose: attempt invariants (§12, §13): server-authoritative timer (overall limit and deadline set together;
-- required for TIMED_EXAM; a MOCK_EXAM may instead be timed per paper, see C2.6); which modes need an assessment, a
-- daily question or a lesson; an assessment-backed attempt records the revision it used (F5); submitted/marked states
-- carry their timestamps and totals; marks, percentage, counters and timestamps are consistent; a grade estimate
-- names its scheme and pass flag (SC-10).
ALTER TABLE "AssessmentAttempt"
  DROP CONSTRAINT IF EXISTS "AssessmentAttempt_timer_chk",
  ADD CONSTRAINT "AssessmentAttempt_timer_chk"
    CHECK (("timeLimitSeconds" IS NULL) = ("deadlineAt" IS NULL)
       AND ("timeLimitSeconds" IS NULL OR "timeLimitSeconds" > 0)
       AND ("deadlineAt" IS NULL OR "deadlineAt" > "startedAt")),
  DROP CONSTRAINT IF EXISTS "AssessmentAttempt_timed_mode_chk",
  ADD CONSTRAINT "AssessmentAttempt_timed_mode_chk"
    CHECK ("mode" <> 'TIMED_EXAM' OR "deadlineAt" IS NOT NULL),
  DROP CONSTRAINT IF EXISTS "AssessmentAttempt_assessment_mode_chk",
  ADD CONSTRAINT "AssessmentAttempt_assessment_mode_chk"
    CHECK (("mode" IN ('QUIZ', 'TOPIC_TEST', 'CHAPTER_TEST', 'SUBJECT_TEST', 'MOCK_EXAM') AND "assessmentId" IS NOT NULL)
        OR ("mode" IN ('PRACTICE', 'RETEST', 'LESSON_CHECK', 'DAILY_QUESTION') AND "assessmentId" IS NULL)
        OR  "mode" IN ('TIMED_EXAM', 'DIAGNOSTIC')),
  DROP CONSTRAINT IF EXISTS "AssessmentAttempt_assessment_revision_chk",
  ADD CONSTRAINT "AssessmentAttempt_assessment_revision_chk"
    CHECK ((("assessmentId" IS NULL) = ("assessmentRevision" IS NULL))
       AND ("assessmentRevision" IS NULL OR "assessmentRevision" >= 1)),
  DROP CONSTRAINT IF EXISTS "AssessmentAttempt_daily_question_chk",
  ADD CONSTRAINT "AssessmentAttempt_daily_question_chk"
    CHECK (("mode" = 'DAILY_QUESTION') = ("dailyQuestionId" IS NOT NULL)),
  DROP CONSTRAINT IF EXISTS "AssessmentAttempt_lesson_check_chk",
  ADD CONSTRAINT "AssessmentAttempt_lesson_check_chk"
    CHECK ("mode" <> 'LESSON_CHECK' OR "lessonId" IS NOT NULL),
  DROP CONSTRAINT IF EXISTS "AssessmentAttempt_submitted_chk",
  ADD CONSTRAINT "AssessmentAttempt_submitted_chk"
    CHECK ("status" IN ('IN_PROGRESS', 'ABANDONED', 'EXPIRED')
        OR ("submittedAt" IS NOT NULL AND "submitReason" IS NOT NULL)),
  DROP CONSTRAINT IF EXISTS "AssessmentAttempt_marked_chk",
  ADD CONSTRAINT "AssessmentAttempt_marked_chk"
    CHECK ("status" <> 'MARKED' OR ("markedAt" IS NOT NULL AND "totalMarks" IS NOT NULL AND "marksAwarded" IS NOT NULL)),
  DROP CONSTRAINT IF EXISTS "AssessmentAttempt_marks_chk",
  ADD CONSTRAINT "AssessmentAttempt_marks_chk"
    CHECK (("totalMarks" IS NULL OR "totalMarks" >= 0)
       AND ("marksAwarded" IS NULL OR ("marksAwarded" >= 0 AND "totalMarks" IS NOT NULL AND "marksAwarded" <= "totalMarks"))),
  DROP CONSTRAINT IF EXISTS "AssessmentAttempt_percentage_chk",
  ADD CONSTRAINT "AssessmentAttempt_percentage_chk"
    CHECK ("percentage" IS NULL OR "percentage" BETWEEN 0 AND 100),
  DROP CONSTRAINT IF EXISTS "AssessmentAttempt_grade_chk",
  ADD CONSTRAINT "AssessmentAttempt_grade_chk"
    CHECK ((("gradeEstimate" IS NULL) = ("gradeSchemeId" IS NULL)) AND (("gradeEstimate" IS NULL) = ("gradeIsPass" IS NULL))),
  DROP CONSTRAINT IF EXISTS "AssessmentAttempt_counters_chk",
  ADD CONSTRAINT "AssessmentAttempt_counters_chk"
    CHECK ("attemptNumber" >= 1 AND "questionCount" >= 0
       AND "answeredCount" BETWEEN 0 AND "questionCount" AND "correctCount" BETWEEN 0 AND "answeredCount"
       AND "pendingReviewCount" >= 0 AND "timeSpentSeconds" >= 0
       AND ("lastPosition" IS NULL OR "lastPosition" >= 1)),
  DROP CONSTRAINT IF EXISTS "AssessmentAttempt_timestamps_chk",
  ADD CONSTRAINT "AssessmentAttempt_timestamps_chk"
    CHECK ("lastSavedAt" >= "startedAt"
       AND ("submittedAt" IS NULL OR "submittedAt" >= "startedAt")
       AND ("markedAt" IS NULL OR "submittedAt" IS NULL OR "markedAt" >= "submittedAt"));

-- Purpose (SC-03): per-paper timer and marks: a section deadline needs its start and limit and lies after the start;
-- an "answer any N" section states its maximum; counted marks stay within it.
ALTER TABLE "AssessmentAttemptSection"
  DROP CONSTRAINT IF EXISTS "AssessmentAttemptSection_values_chk",
  ADD CONSTRAINT "AssessmentAttemptSection_values_chk"
    CHECK ("sectionNumber" >= 1
       AND ("timeLimitSeconds" IS NULL OR "timeLimitSeconds" > 0)
       AND ("answerCount" IS NULL OR ("answerCount" > 0 AND "maxMarks" IS NOT NULL))
       AND ("maxMarks" IS NULL OR "maxMarks" >= 0)
       AND ("marksAwarded" IS NULL OR ("marksAwarded" >= 0 AND ("maxMarks" IS NULL OR "marksAwarded" <= "maxMarks")))),
  DROP CONSTRAINT IF EXISTS "AssessmentAttemptSection_timer_chk",
  ADD CONSTRAINT "AssessmentAttemptSection_timer_chk"
    CHECK (("deadlineAt" IS NULL OR ("startedAt" IS NOT NULL AND "timeLimitSeconds" IS NOT NULL AND "deadlineAt" > "startedAt"))
       AND ("submittedAt" IS NULL OR ("startedAt" IS NOT NULL AND "submittedAt" >= "startedAt")));

-- Purpose: per-answer invariants (§9, §13): numbering from 1, difficulty 1-5, marks within availability, marking status
-- consistent with marksAwarded/isCorrect/markedAt, isCorrect means full marks, UNANSWERED has no response and 0 marks,
-- revisions from 1 (F5); only a marked or unanswered answer in a section can be left out of the score (SC-02).
ALTER TABLE "QuestionAttempt"
  DROP CONSTRAINT IF EXISTS "QuestionAttempt_position_chk",
  ADD CONSTRAINT "QuestionAttempt_position_chk"
    CHECK ("position" >= 1 AND ("sectionNumber" IS NULL OR "sectionNumber" >= 1)),
  DROP CONSTRAINT IF EXISTS "QuestionAttempt_difficulty_chk",
  ADD CONSTRAINT "QuestionAttempt_difficulty_chk"
    CHECK ("difficulty" BETWEEN 1 AND 5),
  DROP CONSTRAINT IF EXISTS "QuestionAttempt_marks_chk",
  ADD CONSTRAINT "QuestionAttempt_marks_chk"
    CHECK ("marksAvailable" >= 0 AND ("marksAwarded" IS NULL OR "marksAwarded" BETWEEN 0 AND "marksAvailable")),
  DROP CONSTRAINT IF EXISTS "QuestionAttempt_marking_state_chk",
  ADD CONSTRAINT "QuestionAttempt_marking_state_chk"
    CHECK ((("markingStatus" = 'PENDING') = ("marksAwarded" IS NULL))
       AND (("markingStatus" = 'PENDING') = ("isCorrect" IS NULL))
       AND ("markingStatus" = 'PENDING' OR "markedAt" IS NOT NULL)),
  DROP CONSTRAINT IF EXISTS "QuestionAttempt_is_correct_chk",
  ADD CONSTRAINT "QuestionAttempt_is_correct_chk"
    CHECK ("isCorrect" IS NULL OR "isCorrect" = ("marksAwarded" = "marksAvailable")),
  DROP CONSTRAINT IF EXISTS "QuestionAttempt_unanswered_chk",
  ADD CONSTRAINT "QuestionAttempt_unanswered_chk"
    CHECK ("markingStatus" <> 'UNANSWERED' OR ("response" IS NULL AND "marksAwarded" = 0)),
  DROP CONSTRAINT IF EXISTS "QuestionAttempt_counted_chk",
  ADD CONSTRAINT "QuestionAttempt_counted_chk"
    CHECK ("isCounted" OR ("sectionNumber" IS NOT NULL AND ("marksAwarded" IS NOT NULL OR "response" IS NULL))),
  DROP CONSTRAINT IF EXISTS "QuestionAttempt_counters_chk",
  ADD CONSTRAINT "QuestionAttempt_counters_chk"
    CHECK ("hintsUsed" >= 0 AND "timeSpentSeconds" >= 0 AND "responseVersion" >= 0 AND "questionRevision" >= 1);

-- Purpose: marking-log invariants: non-negative marks, AI marks carry model/prompt/confidence (0-1), only teacher or
-- reviewer rows name a marker, and a marking never results in PENDING/UNANSWERED.
ALTER TABLE "QuestionAttemptMarking"
  DROP CONSTRAINT IF EXISTS "QuestionAttemptMarking_marks_chk",
  ADD CONSTRAINT "QuestionAttemptMarking_marks_chk"
    CHECK ("marksAwarded" >= 0 AND ("previousMarksAwarded" IS NULL OR "previousMarksAwarded" >= 0)),
  DROP CONSTRAINT IF EXISTS "QuestionAttemptMarking_confidence_chk",
  ADD CONSTRAINT "QuestionAttemptMarking_confidence_chk"
    CHECK ("confidence" IS NULL OR "confidence" BETWEEN 0 AND 1),
  DROP CONSTRAINT IF EXISTS "QuestionAttemptMarking_ai_chk",
  ADD CONSTRAINT "QuestionAttemptMarking_ai_chk"
    CHECK ("source" <> 'AI' OR ("aiModel" IS NOT NULL AND "promptVersion" IS NOT NULL AND "confidence" IS NOT NULL)),
  DROP CONSTRAINT IF EXISTS "QuestionAttemptMarking_marker_chk",
  ADD CONSTRAINT "QuestionAttemptMarking_marker_chk"
    CHECK ("source" IN ('TEACHER', 'REVIEWER') OR "markedById" IS NULL),
  DROP CONSTRAINT IF EXISTS "QuestionAttemptMarking_status_chk",
  ADD CONSTRAINT "QuestionAttemptMarking_status_chk"
    CHECK ("resultingStatus" NOT IN ('PENDING', 'UNANSWERED'));
-- Purpose (SC-07, F10): attachment order is non-negative.
ALTER TABLE "QuestionAttemptAttachment"
  DROP CONSTRAINT IF EXISTS "QuestionAttemptAttachment_values_chk",
  ADD CONSTRAINT "QuestionAttemptAttachment_values_chk" CHECK ("sortOrder" >= 0);

-- Purpose: mastery score 0-100 and the stored band always matches the §11 thresholds; adaptive state in range.
ALTER TABLE "TopicMastery"
  DROP CONSTRAINT IF EXISTS "TopicMastery_score_chk",
  ADD CONSTRAINT "TopicMastery_score_chk"
    CHECK ("score" >= 0 AND "score" <= 100),
  DROP CONSTRAINT IF EXISTS "TopicMastery_band_chk",
  ADD CONSTRAINT "TopicMastery_band_chk"
    CHECK ("band" = (CASE WHEN "score" >= 90 THEN 'MASTERED'
                          WHEN "score" >= 75 THEN 'STRONG'
                          WHEN "score" >= 60 THEN 'COMPETENT'
                          WHEN "score" >= 40 THEN 'DEVELOPING'
                          ELSE 'WEAK' END)::"MasteryBand"),
  DROP CONSTRAINT IF EXISTS "TopicMastery_difficulty_chk",
  ADD CONSTRAINT "TopicMastery_difficulty_chk"
    CHECK ("currentDifficulty" BETWEEN 1 AND 5),
  DROP CONSTRAINT IF EXISTS "TopicMastery_evidence_chk",
  ADD CONSTRAINT "TopicMastery_evidence_chk"
    CHECK ("questionsAttempted" >= 0 AND "questionsCorrect" BETWEEN 0 AND "questionsAttempted"
       AND "marksAvailable" >= 0 AND "marksAwarded" BETWEEN 0 AND "marksAvailable"
       AND "consecutiveCorrect" >= 0 AND "consecutiveIncorrect" >= 0 AND "topicDepth" >= 0
       AND "algorithmVersion" >= 1),
  DROP CONSTRAINT IF EXISTS "TopicMastery_recent_accuracy_chk",
  ADD CONSTRAINT "TopicMastery_recent_accuracy_chk"
    CHECK ("recentAccuracy" IS NULL OR "recentAccuracy" BETWEEN 0 AND 1);

-- Purpose: subject rollup percentages within 0-100 and counters mutually consistent (§6, §7 dashboards).
ALTER TABLE "SubjectProgress"
  DROP CONSTRAINT IF EXISTS "SubjectProgress_percent_chk",
  ADD CONSTRAINT "SubjectProgress_percent_chk"
    CHECK ("progressPercent" BETWEEN 0 AND 100 AND "syllabusCoveragePercent" BETWEEN 0 AND 100
       AND ("averageScorePercent" IS NULL OR "averageScorePercent" BETWEEN 0 AND 100)
       AND ("lastMockPercent" IS NULL OR "lastMockPercent" BETWEEN 0 AND 100)
       AND ("bestMockPercent" IS NULL OR "bestMockPercent" BETWEEN 0 AND 100)
       AND ("averageMockPercent" IS NULL OR "averageMockPercent" BETWEEN 0 AND 100)
       AND ("readinessPercent" IS NULL OR "readinessPercent" BETWEEN 0 AND 100)),
  DROP CONSTRAINT IF EXISTS "SubjectProgress_counts_chk",
  ADD CONSTRAINT "SubjectProgress_counts_chk"
    CHECK ("topicsTotal" >= 0 AND "topicsStarted" BETWEEN 0 AND "topicsTotal"
       AND "topicsCompleted" BETWEEN 0 AND "topicsStarted" AND "topicsMastered" BETWEEN 0 AND "topicsCompleted"
       AND "weakTopicsCount" BETWEEN 0 AND "topicsStarted"
       AND "lessonsTotal" >= 0 AND "lessonsCompleted" BETWEEN 0 AND "lessonsTotal"
       AND "questionsAttempted" >= 0 AND "questionsCorrect" BETWEEN 0 AND "questionsAttempted"
       AND "marksAvailable" >= 0 AND "marksAwarded" BETWEEN 0 AND "marksAvailable"
       AND "assessmentsCompleted" >= 0 AND "mockExamsCompleted" BETWEEN 0 AND "assessmentsCompleted"
       AND "studySeconds" >= 0);

-- Purpose: question calibration counters consistent and rates within their ranges (§42 quality signals).
ALTER TABLE "QuestionStats"
  DROP CONSTRAINT IF EXISTS "QuestionStats_counts_chk",
  ADD CONSTRAINT "QuestionStats_counts_chk"
    CHECK ("presentedCount" >= 0 AND "answeredCount" >= 0 AND "unansweredCount" >= 0
       AND "correctCount" >= 0 AND "partialCount" >= 0 AND "correctCount" + "partialCount" <= "answeredCount"
       AND "calibrationCount" BETWEEN 0 AND "answeredCount"
       AND "calibrationCorrectCount" BETWEEN 0 AND "calibrationCount"
       AND "needsReviewCount" >= 0 AND "hintsUsedSum" >= 0 AND "timeSpentSecondsSum" >= 0
       AND "marksAwardedSum" BETWEEN 0 AND "marksAvailableSum"),
  DROP CONSTRAINT IF EXISTS "QuestionStats_rates_chk",
  ADD CONSTRAINT "QuestionStats_rates_chk"
    CHECK (("facility" IS NULL OR "facility" BETWEEN 0 AND 1)
       AND ("correctRate" IS NULL OR "correctRate" BETWEEN 0 AND 1)
       AND ("calibratedFacility" IS NULL OR "calibratedFacility" BETWEEN 0 AND 1)
       AND ("discrimination" IS NULL OR "discrimination" BETWEEN -1 AND 1)
       AND ("empiricalDifficulty" IS NULL OR "empiricalDifficulty" BETWEEN 1 AND 5)
       AND ("avgTimeSeconds" IS NULL OR "avgTimeSeconds" >= 0));

-- Purpose: lesson progress values in range; COMPLETED if and only if completedAt is set.
ALTER TABLE "LessonProgress"
  DROP CONSTRAINT IF EXISTS "LessonProgress_values_chk",
  ADD CONSTRAINT "LessonProgress_values_chk"
    CHECK ("progressPercent" BETWEEN 0 AND 100 AND "timeSpentSeconds" >= 0 AND "viewCount" >= 1
       AND "lastViewedAt" >= "firstViewedAt"),
  DROP CONSTRAINT IF EXISTS "LessonProgress_completed_chk",
  ADD CONSTRAINT "LessonProgress_completed_chk"
    CHECK (("status" = 'COMPLETED') = ("completedAt" IS NOT NULL));

-- Purpose: SM-2 style scheduling state in range (ease >= 1.3); a NEW card has never been reviewed (§18).
ALTER TABLE "FlashcardState"
  DROP CONSTRAINT IF EXISTS "FlashcardState_values_chk",
  ADD CONSTRAINT "FlashcardState_values_chk"
    CHECK ("easeFactor" >= 1.3 AND "intervalDays" >= 0 AND "repetitions" >= 0 AND "lapses" >= 0
       AND "reviewCount" >= 0 AND "learningStep" >= 0),
  DROP CONSTRAINT IF EXISTS "FlashcardState_new_chk",
  ADD CONSTRAINT "FlashcardState_new_chk"
    CHECK ("state" <> 'NEW' OR ("reviewCount" = 0 AND "lastReviewedAt" IS NULL));

-- Purpose: review log values in range; next due is after the review; client clock at most 5 minutes ahead.
ALTER TABLE "FlashcardReview"
  DROP CONSTRAINT IF EXISTS "FlashcardReview_values_chk",
  ADD CONSTRAINT "FlashcardReview_values_chk"
    CHECK ("previousEaseFactor" >= 1.3 AND "newEaseFactor" >= 1.3
       AND "previousIntervalDays" >= 0 AND "newIntervalDays" >= 0
       AND ("durationMs" IS NULL OR "durationMs" >= 0)
       AND "newDueAt" >= "reviewedAt" AND "reviewedAt" <= "createdAt" + interval '5 minutes');

-- Purpose: plan dates and targets in range (§16).
ALTER TABLE "StudyPlan"
  DROP CONSTRAINT IF EXISTS "StudyPlan_values_chk",
  ADD CONSTRAINT "StudyPlan_values_chk"
    CHECK ("examDate" >= "startsOn" AND "dailyTargetMinutes" BETWEEN 0 AND 1440
       AND "weeklyTargetMinutes" BETWEEN 0 AND 10080 AND "adaptationCount" >= 0);

-- Purpose: plan items never schedule DAILY_QUESTION/AI_TUTOR; a LESSON item names a lesson or topic; values in range;
-- DONE items record completion.
ALTER TABLE "StudyPlanItem"
  DROP CONSTRAINT IF EXISTS "StudyPlanItem_activity_chk",
  ADD CONSTRAINT "StudyPlanItem_activity_chk"
    CHECK ("activityType" NOT IN ('DAILY_QUESTION', 'AI_TUTOR')),
  DROP CONSTRAINT IF EXISTS "StudyPlanItem_lesson_target_chk",
  ADD CONSTRAINT "StudyPlanItem_lesson_target_chk"
    CHECK ("activityType" <> 'LESSON' OR "lessonId" IS NOT NULL OR "topicId" IS NOT NULL),
  DROP CONSTRAINT IF EXISTS "StudyPlanItem_values_chk",
  ADD CONSTRAINT "StudyPlanItem_values_chk"
    CHECK ("sortOrder" >= 0 AND "targetMinutes" BETWEEN 0 AND 1440
       AND ("targetQuestions" IS NULL OR "targetQuestions" > 0)
       AND "completedSeconds" >= 0 AND "completedQuestions" >= 0 AND "generation" >= 0),
  DROP CONSTRAINT IF EXISTS "StudyPlanItem_done_chk",
  ADD CONSTRAINT "StudyPlanItem_done_chk"
    CHECK ("status" <> 'DONE' OR "completedAt" IS NOT NULL);

-- Purpose: session timestamps ordered; active time never exceeds the wall-clock span (+60 s heartbeat slack).
ALTER TABLE "StudySession"
  DROP CONSTRAINT IF EXISTS "StudySession_times_chk",
  ADD CONSTRAINT "StudySession_times_chk"
    CHECK ("lastActiveAt" >= "startedAt" AND ("endedAt" IS NULL OR "endedAt" >= "lastActiveAt")),
  DROP CONSTRAINT IF EXISTS "StudySession_duration_chk",
  ADD CONSTRAINT "StudySession_duration_chk"
    CHECK ("durationSeconds" >= 0
       AND "durationSeconds" <= EXTRACT(EPOCH FROM ("lastActiveAt" - "startedAt")) + 60);

-- Purpose: per-day counters in range (a local day is at most 25 h); a streak freeze only on a credited day (§19).
ALTER TABLE "DailyActivity"
  DROP CONSTRAINT IF EXISTS "DailyActivity_counters_chk",
  ADD CONSTRAINT "DailyActivity_counters_chk"
    CHECK ("studySeconds" BETWEEN 0 AND 90000
       AND "questionsAttempted" >= 0 AND "questionsCorrect" BETWEEN 0 AND "questionsAttempted"
       AND "flashcardsReviewed" >= 0 AND "xpEarned" >= 0 AND "lessonsCompleted" >= 0
       AND "assessmentsCompleted" >= 0
       AND ("targetMinutes" IS NULL OR "targetMinutes" BETWEEN 0 AND 1440)),
  DROP CONSTRAINT IF EXISTS "DailyActivity_freeze_chk",
  ADD CONSTRAINT "DailyActivity_freeze_chk"
    CHECK (NOT "streakFreezeUsed" OR "streakCredited");

-- Purpose: streak/XP counters consistent; daily and weekly goals in range. LearnerStats."dailyGoalMinutes" is the single
-- owner of the student's daily goal.
ALTER TABLE "LearnerStats"
  DROP CONSTRAINT IF EXISTS "LearnerStats_streak_chk",
  ADD CONSTRAINT "LearnerStats_streak_chk"
    CHECK ("currentStreak" >= 0 AND "longestStreak" >= "currentStreak"
       AND "streakFreezesAvailable" >= 0 AND "streakFreezesUsedTotal" >= 0 AND "weeklyGoalStreak" >= 0),
  DROP CONSTRAINT IF EXISTS "LearnerStats_counters_chk",
  ADD CONSTRAINT "LearnerStats_counters_chk"
    CHECK ("totalXp" >= 0 AND "weekXp" >= 0 AND "weekStudySeconds" >= 0 AND "weekQuestions" >= 0
       AND "weeksGoalMetTotal" >= 0 AND "totalQuestionsAttempted" >= 0
       AND "totalQuestionsCorrect" BETWEEN 0 AND "totalQuestionsAttempted"
       AND "totalStudySeconds" >= 0 AND "lessonsCompleted" >= 0 AND "assessmentsCompleted" >= 0
       AND "mockExamsCompleted" BETWEEN 0 AND "assessmentsCompleted"
       AND "flashcardsReviewed" >= 0 AND "topicsMastered" >= 0
       AND ("dailyGoalMinutes" IS NULL OR "dailyGoalMinutes" BETWEEN 1 AND 1440)
       AND ("weeklyGoalMinutes" IS NULL OR "weeklyGoalMinutes" BETWEEN 1 AND 10080)
       AND ("weeklyGoalXp" IS NULL OR "weeklyGoalXp" >= 1));

-- Purpose: XP ledger rows are never zero; only ADJUSTMENT may be negative.
ALTER TABLE "XpEvent"
  DROP CONSTRAINT IF EXISTS "XpEvent_amount_chk",
  ADD CONSTRAINT "XpEvent_amount_chk"
    CHECK ("amount" <> 0 AND ("reason" = 'ADJUSTMENT' OR "amount" > 0));

-- Purpose: badge definitions: non-negative XP reward, tier 1-3, UPPER_SNAKE code.
ALTER TABLE "Achievement"
  DROP CONSTRAINT IF EXISTS "Achievement_values_chk",
  ADD CONSTRAINT "Achievement_values_chk"
    CHECK ("xpReward" >= 0 AND "tier" BETWEEN 1 AND 3 AND "code" ~ '^[A-Z][A-Z0-9_]*$');

-- Purpose: GLOBAL boards have no scopeId (and only they); final ranks from 1 when written (M2: ranks are written only
-- at the weekly close); period key is ISO week, month or LIVE (§20).
ALTER TABLE "LeaderboardEntry"
  DROP CONSTRAINT IF EXISTS "LeaderboardEntry_scope_chk",
  ADD CONSTRAINT "LeaderboardEntry_scope_chk"
    CHECK (("scopeType" = 'GLOBAL') = ("scopeId" IS NULL)),
  DROP CONSTRAINT IF EXISTS "LeaderboardEntry_rank_chk",
  ADD CONSTRAINT "LeaderboardEntry_rank_chk"
    CHECK (("rank" IS NULL OR "rank" >= 1) AND ("previousRank" IS NULL OR "previousRank" >= 1)),
  DROP CONSTRAINT IF EXISTS "LeaderboardEntry_period_chk",
  ADD CONSTRAINT "LeaderboardEntry_period_chk"
    CHECK ("periodKey" ~ '^([0-9]{4}-W[0-9]{2}|[0-9]{4}-[0-9]{2}|LIVE)$');

-- Purpose: an assignment names the target matching its type; published rows have publishedAt; due/close dates ordered;
-- counters consistent; non-empty title (§22).
ALTER TABLE "Assignment"
  DROP CONSTRAINT IF EXISTS "Assignment_target_chk",
  ADD CONSTRAINT "Assignment_target_chk"
    CHECK (("type" <> 'LESSON' OR "lessonId" IS NOT NULL)
       AND ("type" <> 'ASSESSMENT' OR "assessmentId" IS NOT NULL)
       AND ("type" <> 'PRACTICE' OR "practiceConfig" IS NOT NULL)),
  DROP CONSTRAINT IF EXISTS "Assignment_published_chk",
  ADD CONSTRAINT "Assignment_published_chk"
    CHECK ("status" = 'DRAFT' OR "publishedAt" IS NOT NULL),
  DROP CONSTRAINT IF EXISTS "Assignment_dates_chk",
  ADD CONSTRAINT "Assignment_dates_chk"
    CHECK (("dueAt" IS NULL OR "publishedAt" IS NULL OR "dueAt" >= "publishedAt")
       AND ("closesAt" IS NULL OR "dueAt" IS NULL OR "closesAt" >= "dueAt")),
  DROP CONSTRAINT IF EXISTS "Assignment_values_chk",
  ADD CONSTRAINT "Assignment_values_chk"
    CHECK (("maxAttempts" IS NULL OR "maxAttempts" >= 1)
       AND "assignedCount" >= 0 AND "startedCount" BETWEEN 0 AND "assignedCount"
       AND "submittedCount" BETWEEN 0 AND "assignedCount"
       AND ("averageScorePercent" IS NULL OR "averageScorePercent" BETWEEN 0 AND 100)
       AND char_length("title") > 0);

-- Purpose: per-student assignment values in range; SUBMITTED/LATE rows record submission time.
ALTER TABLE "AssignmentProgress"
  DROP CONSTRAINT IF EXISTS "AssignmentProgress_values_chk",
  ADD CONSTRAINT "AssignmentProgress_values_chk"
    CHECK (("scorePercent" IS NULL OR "scorePercent" BETWEEN 0 AND 100)
       AND "progressPercent" BETWEEN 0 AND 100 AND "attemptsCount" >= 0
       AND ("marksAwarded" IS NULL OR ("marksAwarded" >= 0 AND "totalMarks" IS NOT NULL AND "marksAwarded" <= "totalMarks"))),
  DROP CONSTRAINT IF EXISTS "AssignmentProgress_submitted_chk",
  ADD CONSTRAINT "AssignmentProgress_submitted_chk"
    CHECK ("status" NOT IN ('SUBMITTED', 'LATE') OR "submittedAt" IS NOT NULL);

-- Purpose (F18, F9): only the SHA-256 hex of the share token is stored; every share expires within one year (§46).
ALTER TABLE "ShareableResult"
  DROP CONSTRAINT IF EXISTS "ShareableResult_values_chk",
  ADD CONSTRAINT "ShareableResult_values_chk"
    CHECK ("viewCount" >= 0 AND "tokenHash" ~ '^[0-9a-f]{64}$'
       AND "expiresAt" > "createdAt" AND "expiresAt" <= "createdAt" + interval '1 year');

-- ---------------------------------------------------------------------------------------------------------------------
-- C2.4 Storage parameters for hot-update tables: room for HOT updates, more eager autovacuum.
-- ---------------------------------------------------------------------------------------------------------------------
-- Purpose: QuestionAttempt (600k-1M rows/day; autosave + marking updates).
ALTER TABLE "QuestionAttempt"   SET (fillfactor = 90, autovacuum_vacuum_scale_factor = 0.02, autovacuum_analyze_scale_factor = 0.01);
-- Purpose: AssessmentAttempt (lastSavedAt on every answer; HOT thanks to the M1 rule).
ALTER TABLE "AssessmentAttempt" SET (fillfactor = 90);
-- Purpose: TopicMastery (leaf row upserted per answer).
ALTER TABLE "TopicMastery"      SET (fillfactor = 80, autovacuum_vacuum_scale_factor = 0.05);
-- Purpose: DailyActivity (counter increments per answer and heartbeat).
ALTER TABLE "DailyActivity"     SET (fillfactor = 80, autovacuum_vacuum_scale_factor = 0.05);
-- Purpose: StudySession (heartbeat every ~60 s).
ALTER TABLE "StudySession"      SET (fillfactor = 85, autovacuum_vacuum_scale_factor = 0.05);
-- Purpose: SubjectProgress (rewritten after every attempt).
ALTER TABLE "SubjectProgress"   SET (fillfactor = 80);
-- Purpose: LearnerStats (updated at attempt close and by debounced jobs).
ALTER TABLE "LearnerStats"      SET (fillfactor = 80);
-- Purpose: FlashcardState (updated on every review).
ALTER TABLE "FlashcardState"    SET (fillfactor = 90);
-- Purpose: LeaderboardEntry (changed scores upserted hourly).
ALTER TABLE "LeaderboardEntry"  SET (fillfactor = 85, autovacuum_vacuum_scale_factor = 0.05);
-- Purpose: AiSpendDaily (16 hot counter rows per day).
ALTER TABLE "AiSpendDaily"      SET (fillfactor = 50);

-- ---------------------------------------------------------------------------------------------------------------------
-- C2.5 Helper function
-- ---------------------------------------------------------------------------------------------------------------------
-- Purpose: lower-bound UUIDv7 for a timestamp (first 48 bits = Unix ms), used for the RANGE("attemptId") partitioning
-- of QuestionAttempt (ARCHITECTURE §4.14) and for time-bounded queries that prune by id. Harmless to create now.
CREATE OR REPLACE FUNCTION uuidv7_floor(ts timestamptz) RETURNS uuid
  LANGUAGE sql IMMUTABLE STRICT PARALLEL SAFE
  AS $$ SELECT (lpad(to_hex(floor(extract(epoch FROM ts) * 1000)::bigint), 12, '0') || '00000000000000000000')::uuid $$;

-- ---------------------------------------------------------------------------------------------------------------------
-- C2.6 Learning triggers
-- ---------------------------------------------------------------------------------------------------------------------
-- Purpose (F12, §26): an enrolment pins only a PUBLISHED version: never a DRAFT (still editable), never newly an
-- ARCHIVED one; a version move (UPDATE of syllabusId) must restamp syllabusPinnedAt (the explicit move flow, audited).
CREATE OR REPLACE FUNCTION subject_enrollment_pin_guard() RETURNS trigger LANGUAGE plpgsql AS $$
DECLARE
  v_status "SyllabusStatus";
BEGIN
  IF TG_OP = 'UPDATE' THEN
    IF NEW."syllabusId" = OLD."syllabusId" THEN
      RETURN NEW;
    END IF;
    IF NEW."syllabusPinnedAt" <= OLD."syllabusPinnedAt" THEN
      RAISE EXCEPTION 'SubjectEnrollment %: a syllabus version move must advance syllabusPinnedAt', NEW."id"
        USING ERRCODE = 'check_violation';
    END IF;
  END IF;
  SELECT "status" INTO v_status FROM "Syllabus" WHERE "id" = NEW."syllabusId" FOR SHARE;
  IF v_status = 'DRAFT' THEN
    RAISE EXCEPTION 'SubjectEnrollment %: cannot pin DRAFT syllabus version %', NEW."id", NEW."syllabusId"
      USING ERRCODE = 'check_violation';
  ELSIF v_status = 'ARCHIVED' THEN
    RAISE EXCEPTION 'SubjectEnrollment %: ARCHIVED syllabus version % takes no new enrolments', NEW."id", NEW."syllabusId"
      USING ERRCODE = 'check_violation';
  END IF;
  RETURN NEW;
END
$$;
-- Purpose: attach the pin guard.
CREATE OR REPLACE TRIGGER "SubjectEnrollment_pin_guard"
  BEFORE INSERT OR UPDATE OF "syllabusId" ON "SubjectEnrollment"
  FOR EACH ROW EXECUTE FUNCTION subject_enrollment_pin_guard();

-- Purpose (SC-03): a MOCK_EXAM attempt without an overall deadline is timed per paper: at commit it must have sections
-- and every section must carry its own time limit (server-authoritative per-paper deadlines).
CREATE OR REPLACE FUNCTION assessment_attempt_section_timer_check() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM "AssessmentAttempt" a WHERE a."id" = NEW."id") THEN
    RETURN NULL;  -- deleted in the same transaction
  END IF;
  IF NOT EXISTS (SELECT 1 FROM "AssessmentAttemptSection" s WHERE s."attemptId" = NEW."id")
     OR EXISTS (SELECT 1 FROM "AssessmentAttemptSection" s WHERE s."attemptId" = NEW."id" AND s."timeLimitSeconds" IS NULL) THEN
    RAISE EXCEPTION 'MOCK_EXAM attempt % has no overall deadline, so every section needs its own time limit (§12)', NEW."id"
      USING ERRCODE = 'check_violation';
  END IF;
  RETURN NULL;
END
$$;
-- Purpose: attach as a deferred constraint trigger (sections are inserted after the attempt row).
DROP TRIGGER IF EXISTS "AssessmentAttempt_section_timer" ON "AssessmentAttempt";
CREATE CONSTRAINT TRIGGER "AssessmentAttempt_section_timer" AFTER INSERT ON "AssessmentAttempt"
  DEFERRABLE INITIALLY DEFERRED FOR EACH ROW
  WHEN (NEW."mode" = 'MOCK_EXAM' AND NEW."deadlineAt" IS NULL)
  EXECUTE FUNCTION assessment_attempt_section_timer_check();


-- =====================================================================================================================
-- C3. PLATFORM
-- =====================================================================================================================

-- ---------------------------------------------------------------------------------------------------------------------
-- C3.1 Identity & accounts
-- ---------------------------------------------------------------------------------------------------------------------
-- Purpose: account identifiers (§33, §39; SC-08): an email, a phone, or a username WITH a password is required unless
-- DELETED; normalised email, E.164 phones, lower-case username; verification timestamps need the identifier;
-- SCHOOL_ADMIN is never a platform role (it is per school); DELETED <=> deletedAt, and a DELETED row is unidentifiable.
ALTER TABLE "User"
  DROP CONSTRAINT IF EXISTS "User_contact_required_chk",
  ADD CONSTRAINT "User_contact_required_chk"
    CHECK ("status" = 'DELETED' OR "emailNormalized" IS NOT NULL OR "phoneE164" IS NOT NULL
        OR ("loginUsername" IS NOT NULL AND "passwordHash" IS NOT NULL)),
  DROP CONSTRAINT IF EXISTS "User_email_normalized_chk",
  ADD CONSTRAINT "User_email_normalized_chk"
    CHECK ("emailNormalized" IS NULL OR ("emailNormalized" = lower(btrim("emailNormalized"))
                                         AND "emailNormalized" ~ '^[^@[:space:]]+@[^@[:space:]]+$')),
  DROP CONSTRAINT IF EXISTS "User_phone_e164_chk",
  ADD CONSTRAINT "User_phone_e164_chk"
    CHECK (("phoneE164" IS NULL OR "phoneE164" ~ '^\+[1-9][0-9]{6,14}$')
       AND ("contactPhoneE164" IS NULL OR "contactPhoneE164" ~ '^\+[1-9][0-9]{6,14}$')),
  DROP CONSTRAINT IF EXISTS "User_login_username_chk",
  ADD CONSTRAINT "User_login_username_chk"
    CHECK ("loginUsername" IS NULL OR "loginUsername" ~ '^[a-z0-9][a-z0-9._-]{2,31}$'),
  DROP CONSTRAINT IF EXISTS "User_email_verified_chk",
  ADD CONSTRAINT "User_email_verified_chk" CHECK ("emailVerifiedAt" IS NULL OR "emailNormalized" IS NOT NULL),
  DROP CONSTRAINT IF EXISTS "User_phone_verified_chk",
  ADD CONSTRAINT "User_phone_verified_chk" CHECK ("phoneVerifiedAt" IS NULL OR "phoneE164" IS NOT NULL),
  DROP CONSTRAINT IF EXISTS "User_no_school_admin_role_chk",
  ADD CONSTRAINT "User_no_school_admin_role_chk" CHECK (NOT ('SCHOOL_ADMIN'::"Role" = ANY ("roles"))),
  DROP CONSTRAINT IF EXISTS "User_deleted_chk",
  ADD CONSTRAINT "User_deleted_chk" CHECK (("status" = 'DELETED') = ("deletedAt" IS NOT NULL)),
  DROP CONSTRAINT IF EXISTS "User_deleted_anonymised_chk",
  ADD CONSTRAINT "User_deleted_anonymised_chk"
    CHECK ("status" <> 'DELETED' OR ("emailNormalized" IS NULL AND "phoneE164" IS NULL AND "passwordHash" IS NULL
                                     AND "loginUsername" IS NULL AND "contactPhoneE164" IS NULL)),
  DROP CONSTRAINT IF EXISTS "User_failed_login_chk",
  ADD CONSTRAINT "User_failed_login_chk" CHECK ("failedLoginCount" >= 0);

-- Purpose: profile formats (username, birth year, currency) and an opted-in USERNAME leaderboard display needs a
-- username (§20).
ALTER TABLE "Profile"
  DROP CONSTRAINT IF EXISTS "Profile_username_format_chk",
  ADD CONSTRAINT "Profile_username_format_chk" CHECK ("username" IS NULL OR "username" ~ '^[a-z0-9_]{3,30}$'),
  DROP CONSTRAINT IF EXISTS "Profile_birth_year_chk",
  ADD CONSTRAINT "Profile_birth_year_chk" CHECK ("birthYear" IS NULL OR "birthYear" BETWEEN 1900 AND 2100),
  DROP CONSTRAINT IF EXISTS "Profile_currency_chk",
  ADD CONSTRAINT "Profile_currency_chk" CHECK ("preferredCurrency" IS NULL OR "preferredCurrency" ~ '^[A-Z]{3}$'),
  DROP CONSTRAINT IF EXISTS "Profile_leaderboard_username_chk",
  ADD CONSTRAINT "Profile_leaderboard_username_chk"
    CHECK (NOT "leaderboardOptIn" OR "leaderboardDisplay" <> 'USERNAME' OR "username" IS NOT NULL);
-- Purpose: admin "Users" search by name (staff only, typo tolerant); expression GIN trigram index (needs pg_trgm).
CREATE INDEX IF NOT EXISTS "Profile_name_trgm_idx" ON "Profile"
  USING GIN ((lower(coalesce("firstName", '') || ' ' || coalesce("lastName", ''))) gin_trgm_ops);

-- Purpose: onboarding completion requires the core track (§5); minor <=> consent required; GRANTED consent records
-- when and how; target grade non-blank; exam extra time 1-100 % (SC-12, §43).
ALTER TABLE "Student"
  DROP CONSTRAINT IF EXISTS "Student_onboarding_complete_chk",
  ADD CONSTRAINT "Student_onboarding_complete_chk"
    CHECK ("onboardingCompletedAt" IS NULL OR ("onboardingStep" = 'COMPLETED' AND "countryId" IS NOT NULL
                                               AND "examBoardId" IS NOT NULL AND "qualificationId" IS NOT NULL)),
  DROP CONSTRAINT IF EXISTS "Student_minor_consent_chk",
  ADD CONSTRAINT "Student_minor_consent_chk"
    CHECK (("isMinor" AND "guardianConsentStatus" <> 'NOT_REQUIRED')
        OR (NOT "isMinor" AND "guardianConsentStatus" = 'NOT_REQUIRED')),
  DROP CONSTRAINT IF EXISTS "Student_consent_granted_chk",
  ADD CONSTRAINT "Student_consent_granted_chk"
    CHECK ("guardianConsentStatus" <> 'GRANTED' OR ("guardianConsentAt" IS NOT NULL AND "guardianConsentMethod" IS NOT NULL)),
  DROP CONSTRAINT IF EXISTS "Student_target_grade_chk",
  ADD CONSTRAINT "Student_target_grade_chk" CHECK ("targetGrade" IS NULL OR btrim("targetGrade") <> ''),
  DROP CONSTRAINT IF EXISTS "Student_extra_time_chk",
  ADD CONSTRAINT "Student_extra_time_chk" CHECK ("examExtraTimePercent" IS NULL OR "examExtraTimePercent" BETWEEN 1 AND 100);

-- Purpose (F4): guardian consent "by a linked parent account" must name a parent with an ACTIVE link to this student at
-- the moment it is granted. A trigger rather than a CHECK, so the FK-driven SET NULL of guardianConsentByUserId during
-- the parent's erasure (status/method unchanged) still works.
CREATE OR REPLACE FUNCTION student_guardian_consent_guard() RETURNS trigger LANGUAGE plpgsql AS $$
DECLARE
  v_check boolean;
BEGIN
  IF NEW."guardianConsentStatus" <> 'GRANTED' OR NEW."guardianConsentMethod" IS DISTINCT FROM 'PARENT_ACCOUNT' THEN
    RETURN NEW;
  END IF;
  IF TG_OP = 'INSERT' THEN
    v_check := true;
  ELSE
    v_check := NEW."guardianConsentStatus" IS DISTINCT FROM OLD."guardianConsentStatus"
            OR NEW."guardianConsentMethod" IS DISTINCT FROM OLD."guardianConsentMethod"
            OR (NEW."guardianConsentByUserId" IS NOT NULL
                AND NEW."guardianConsentByUserId" IS DISTINCT FROM OLD."guardianConsentByUserId");
  END IF;
  IF v_check AND (NEW."guardianConsentByUserId" IS NULL OR NOT EXISTS (
       SELECT 1 FROM "ParentStudentLink" l
        WHERE l."parentUserId" = NEW."guardianConsentByUserId" AND l."studentUserId" = NEW."userId"
          AND l."status" = 'ACTIVE')) THEN
    RAISE EXCEPTION 'Student %: PARENT_ACCOUNT consent needs an ACTIVE parent link from the consenting user', NEW."userId"
      USING ERRCODE = 'check_violation';
  END IF;
  RETURN NEW;
END
$$;
-- Purpose: attach the consent guard.
CREATE OR REPLACE TRIGGER "Student_guardian_consent_guard"
  BEFORE INSERT OR UPDATE OF "guardianConsentStatus", "guardianConsentMethod", "guardianConsentByUserId" ON "Student"
  FOR EACH ROW EXECUTE FUNCTION student_guardian_consent_guard();

-- Purpose (§21, F4): parent-student link episodes: at least one side, never self; ACTIVE needs both sides, activation
-- time and a consent basis, plus student consent unless the basis is a school record / staff verification; consent
-- timestamps belong to THIS episode; AI-conversation access only with separate, later, explicit student consent on an
-- ACTIVE link whose basis is the student's own consent; revocation timestamped; invite hash only on a PENDING link.
ALTER TABLE "ParentStudentLink"
  DROP CONSTRAINT IF EXISTS "ParentStudentLink_side_chk",
  ADD CONSTRAINT "ParentStudentLink_side_chk" CHECK (num_nonnulls("parentUserId", "studentUserId") >= 1),
  DROP CONSTRAINT IF EXISTS "ParentStudentLink_distinct_chk",
  ADD CONSTRAINT "ParentStudentLink_distinct_chk" CHECK ("parentUserId" IS DISTINCT FROM "studentUserId"),
  DROP CONSTRAINT IF EXISTS "ParentStudentLink_active_chk",
  ADD CONSTRAINT "ParentStudentLink_active_chk"
    CHECK ("status" <> 'ACTIVE' OR ("parentUserId" IS NOT NULL AND "studentUserId" IS NOT NULL AND "activatedAt" IS NOT NULL
                                    AND "consentBasis" IS NOT NULL
                                    AND ("studentConsentAt" IS NOT NULL OR "consentBasis" IN ('SCHOOL_RECORD', 'ADMIN_VERIFIED')))),
  DROP CONSTRAINT IF EXISTS "ParentStudentLink_consent_time_chk",
  ADD CONSTRAINT "ParentStudentLink_consent_time_chk"
    CHECK (("studentConsentAt" IS NULL OR "studentConsentAt" >= "createdAt")
       AND ("aiConversationsConsentAt" IS NULL
            OR ("studentConsentAt" IS NOT NULL AND "aiConversationsConsentAt" >= "studentConsentAt"))),
  DROP CONSTRAINT IF EXISTS "ParentStudentLink_ai_consent_chk",
  ADD CONSTRAINT "ParentStudentLink_ai_consent_chk"
    CHECK (NOT "canViewAiConversations" OR ("aiConversationsConsentAt" IS NOT NULL AND "status" = 'ACTIVE'
                                            AND "consentBasis" IN ('STUDENT_CODE', 'STUDENT_APPROVAL'))),
  DROP CONSTRAINT IF EXISTS "ParentStudentLink_revoked_chk",
  ADD CONSTRAINT "ParentStudentLink_revoked_chk" CHECK ("status" <> 'REVOKED' OR "revokedAt" IS NOT NULL),
  DROP CONSTRAINT IF EXISTS "ParentStudentLink_invite_chk",
  ADD CONSTRAINT "ParentStudentLink_invite_chk"
    CHECK ("inviteCodeHash" IS NULL OR ("inviteExpiresAt" IS NOT NULL AND "status" = 'PENDING'
                                         AND "inviteCodeHash" ~ '^[0-9a-f]{64}$'));
-- Purpose (F4): at most one OPEN (pending or active) episode per known parent-student pair; re-linking after a
-- revoke/decline inserts a new row. (Pending invites with a NULL side are distinct by default.)
CREATE UNIQUE INDEX IF NOT EXISTS "ParentStudentLink_open_pair_key" ON "ParentStudentLink" ("parentUserId", "studentUserId")
  WHERE "status" IN ('PENDING', 'ACTIVE');
-- Purpose (F4): REVOKED and DECLINED are terminal, so consent given in an earlier episode can never re-activate a link.
CREATE OR REPLACE FUNCTION parent_link_terminal_guard() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  IF OLD."status" IN ('REVOKED', 'DECLINED') AND NEW."status" IS DISTINCT FROM OLD."status" THEN
    RAISE EXCEPTION 'ParentStudentLink % is % (terminal); re-linking creates a new link', OLD."id", OLD."status"
      USING ERRCODE = 'check_violation';
  END IF;
  RETURN NEW;
END
$$;
-- Purpose: attach the terminal-state guard.
CREATE OR REPLACE TRIGGER "ParentStudentLink_terminal_guard"
  BEFORE UPDATE OF "status" ON "ParentStudentLink"
  FOR EACH ROW EXECUTE FUNCTION parent_link_terminal_guard();

-- Purpose: sessions store only a SHA-256 hex token hash; expiries after creation (§39).
ALTER TABLE "Session"
  DROP CONSTRAINT IF EXISTS "Session_token_hash_chk",
  ADD CONSTRAINT "Session_token_hash_chk" CHECK ("tokenHash" ~ '^[0-9a-f]{64}$'),
  DROP CONSTRAINT IF EXISTS "Session_expiry_chk",
  ADD CONSTRAINT "Session_expiry_chk"
    CHECK ("expiresAt" > "createdAt" AND ("absoluteExpiresAt" IS NULL OR "absoluteExpiresAt" > "createdAt"));

-- Purpose: OTP codes: bounded attempts, hashed code only, expiry after creation.
ALTER TABLE "VerificationCode"
  DROP CONSTRAINT IF EXISTS "VerificationCode_attempts_chk",
  ADD CONSTRAINT "VerificationCode_attempts_chk"
    CHECK ("attempts" >= 0 AND "maxAttempts" >= 1 AND "attempts" <= "maxAttempts"),
  DROP CONSTRAINT IF EXISTS "VerificationCode_hash_chk",
  ADD CONSTRAINT "VerificationCode_hash_chk" CHECK ("codeHash" ~ '^[0-9a-f]{64}$'),
  DROP CONSTRAINT IF EXISTS "VerificationCode_expiry_chk",
  ADD CONSTRAINT "VerificationCode_expiry_chk" CHECK ("expiresAt" > "createdAt");

-- Purpose: privacy requests: terminal states timestamped; only EXPORT requests carry an export file.
ALTER TABLE "PrivacyRequest"
  DROP CONSTRAINT IF EXISTS "PrivacyRequest_completed_chk",
  ADD CONSTRAINT "PrivacyRequest_completed_chk" CHECK ("status" <> 'COMPLETED' OR "completedAt" IS NOT NULL),
  DROP CONSTRAINT IF EXISTS "PrivacyRequest_cancelled_chk",
  ADD CONSTRAINT "PrivacyRequest_cancelled_chk" CHECK ("status" <> 'CANCELLED' OR "cancelledAt" IS NOT NULL),
  DROP CONSTRAINT IF EXISTS "PrivacyRequest_export_chk",
  ADD CONSTRAINT "PrivacyRequest_export_chk" CHECK ("exportStorageKey" IS NULL OR "kind" = 'EXPORT');
-- Purpose: at most one open deletion request per user.
CREATE UNIQUE INDEX IF NOT EXISTS "PrivacyRequest_one_open_deletion_idx" ON "PrivacyRequest" ("userId")
  WHERE "kind" = 'DELETION' AND "status" IN ('REQUESTED', 'PROCESSING');

-- ---------------------------------------------------------------------------------------------------------------------
-- C3.2 Organisations
-- ---------------------------------------------------------------------------------------------------------------------
-- Purpose: school slug format, normalised contact email, E.164 phone; ACTIVE schools are verified.
ALTER TABLE "School"
  DROP CONSTRAINT IF EXISTS "School_slug_chk",
  ADD CONSTRAINT "School_slug_chk" CHECK ("slug" ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  DROP CONSTRAINT IF EXISTS "School_contact_email_chk",
  ADD CONSTRAINT "School_contact_email_chk" CHECK ("contactEmail" IS NULL OR "contactEmail" = lower(btrim("contactEmail"))),
  DROP CONSTRAINT IF EXISTS "School_contact_phone_chk",
  ADD CONSTRAINT "School_contact_phone_chk" CHECK ("contactPhone" IS NULL OR "contactPhone" ~ '^\+[1-9][0-9]{6,14}$'),
  DROP CONSTRAINT IF EXISTS "School_verified_chk",
  ADD CONSTRAINT "School_verified_chk" CHECK ("status" <> 'ACTIVE' OR "verifiedAt" IS NOT NULL);
-- Purpose: school picker in onboarding / admin search (typo tolerant); expression GIN trigram index.
CREATE INDEX IF NOT EXISTS "School_name_trgm_idx" ON "School" USING GIN (lower("name") gin_trgm_ops);

-- Purpose: student numbers only on STUDENT memberships; ACTIVE and REMOVED states timestamped.
ALTER TABLE "SchoolMember"
  DROP CONSTRAINT IF EXISTS "SchoolMember_student_number_chk",
  ADD CONSTRAINT "SchoolMember_student_number_chk" CHECK ("studentNumber" IS NULL OR "role" = 'STUDENT'),
  DROP CONSTRAINT IF EXISTS "SchoolMember_active_chk",
  ADD CONSTRAINT "SchoolMember_active_chk" CHECK ("status" <> 'ACTIVE' OR "joinedAt" IS NOT NULL),
  DROP CONSTRAINT IF EXISTS "SchoolMember_removed_chk",
  ADD CONSTRAINT "SchoolMember_removed_chk" CHECK ("status" <> 'REMOVED' OR "removedAt" IS NOT NULL);
-- Purpose (F13): removing a school membership ends the access it carried, in the same transaction: a removed teacher
-- (with no other ACTIVE teaching membership in that school) stops teaching the school's classes; a removed student
-- leaves the school's classes.
CREATE OR REPLACE FUNCTION school_member_removal_cascade() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  IF NEW."role" IN ('TEACHER', 'SCHOOL_ADMIN') THEN
    IF NOT EXISTS (SELECT 1 FROM "SchoolMember" m
                    WHERE m."schoolId" = NEW."schoolId" AND m."userId" = NEW."userId" AND m."id" <> NEW."id"
                      AND m."role" IN ('TEACHER', 'SCHOOL_ADMIN') AND m."status" = 'ACTIVE') THEN
      UPDATE "ClassTeacher" ct SET "removedAt" = now(), "updatedAt" = now()
       WHERE ct."userId" = NEW."userId" AND ct."removedAt" IS NULL
         AND ct."classId" IN (SELECT c."id" FROM "Class" c WHERE c."schoolId" = NEW."schoolId");
    END IF;
  ELSIF NEW."role" = 'STUDENT' THEN
    UPDATE "ClassMember" cm SET "status" = 'REMOVED', "removedAt" = now(), "updatedAt" = now()
     WHERE cm."userId" = NEW."userId" AND cm."status" <> 'REMOVED'
       AND cm."classId" IN (SELECT c."id" FROM "Class" c WHERE c."schoolId" = NEW."schoolId");
  END IF;
  RETURN NULL;
END
$$;
-- Purpose: attach the removal cascade to the ACTIVE/INVITED/REQUESTED -> REMOVED transition.
CREATE OR REPLACE TRIGGER "SchoolMember_removal_cascade"
  AFTER UPDATE OF "status" ON "SchoolMember"
  FOR EACH ROW WHEN (NEW."status" = 'REMOVED' AND OLD."status" <> 'REMOVED')
  EXECUTE FUNCTION school_member_removal_cascade();

-- Purpose: class join-code format; non-blank class name.
ALTER TABLE "Class"
  DROP CONSTRAINT IF EXISTS "Class_join_code_chk",
  ADD CONSTRAINT "Class_join_code_chk" CHECK ("joinCode" IS NULL OR "joinCode" ~ '^[A-Z0-9]{6,10}$'),
  DROP CONSTRAINT IF EXISTS "Class_name_chk",
  ADD CONSTRAINT "Class_name_chk" CHECK (btrim("name") <> '');
-- Purpose (F13, F1): a class never changes tenant: a school class cannot be moved into another school (with its
-- members, assignments and results), and a tutor class cannot be moved into a school (its tutor-owned tests would
-- become cross-tenant).
CREATE OR REPLACE FUNCTION class_school_immutable() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  IF NEW."schoolId" IS DISTINCT FROM OLD."schoolId" THEN
    RAISE EXCEPTION 'Class %: schoolId is fixed at creation (create a new class instead)', OLD."id"
      USING ERRCODE = 'check_violation';
  END IF;
  RETURN NEW;
END
$$;
-- Purpose: attach the tenant immutability guard.
CREATE OR REPLACE TRIGGER "Class_school_immutable"
  BEFORE UPDATE OF "schoolId" ON "Class"
  FOR EACH ROW EXECUTE FUNCTION class_school_immutable();

-- Purpose: at most one current LEAD teacher per class.
CREATE UNIQUE INDEX IF NOT EXISTS "ClassTeacher_one_lead_idx" ON "ClassTeacher" ("classId")
  WHERE "role" = 'LEAD' AND "removedAt" IS NULL;
-- Purpose (F13): a current teacher of a SCHOOL class holds an ACTIVE TEACHER or SCHOOL_ADMIN membership of that school
-- (tutor classes have no school and are exempt).
CREATE OR REPLACE FUNCTION class_teacher_membership_guard() RETURNS trigger LANGUAGE plpgsql AS $$
DECLARE
  v_school uuid;
BEGIN
  IF NEW."removedAt" IS NOT NULL THEN
    RETURN NEW;
  END IF;
  SELECT c."schoolId" INTO v_school FROM "Class" c WHERE c."id" = NEW."classId";
  IF v_school IS NULL THEN
    RETURN NEW;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM "SchoolMember" m
                  WHERE m."schoolId" = v_school AND m."userId" = NEW."userId"
                    AND m."role" IN ('TEACHER', 'SCHOOL_ADMIN') AND m."status" = 'ACTIVE') THEN
    RAISE EXCEPTION 'User % is not an ACTIVE teacher of school % and cannot teach class %', NEW."userId", v_school, NEW."classId"
      USING ERRCODE = 'check_violation';
  END IF;
  RETURN NEW;
END
$$;
-- Purpose: attach the membership guard.
CREATE OR REPLACE TRIGGER "ClassTeacher_membership_guard"
  BEFORE INSERT OR UPDATE OF "removedAt", "userId", "classId" ON "ClassTeacher"
  FOR EACH ROW EXECUTE FUNCTION class_teacher_membership_guard();

-- Purpose: REMOVED class memberships are timestamped.
ALTER TABLE "ClassMember"
  DROP CONSTRAINT IF EXISTS "ClassMember_removed_chk",
  ADD CONSTRAINT "ClassMember_removed_chk" CHECK ("status" <> 'REMOVED' OR "removedAt" IS NOT NULL);

-- Purpose: invitation kind decides exactly which references/roles are set; staff invites never grant SCHOOL_ADMIN,
-- STUDENT or PARENT; hashed token only; accepted and revoked are exclusive; send count from 1.
ALTER TABLE "Invitation"
  DROP CONSTRAINT IF EXISTS "Invitation_kind_chk",
  ADD CONSTRAINT "Invitation_kind_chk" CHECK (
       ("kind" = 'SCHOOL_MEMBER' AND "schoolId" IS NOT NULL AND "schoolRole" IS NOT NULL
                                  AND "classId" IS NULL AND "platformRole" IS NULL)
    OR ("kind" = 'CLASS_MEMBER'  AND "classId" IS NOT NULL AND "schoolRole" IS NULL AND "platformRole" IS NULL)
    OR ("kind" = 'STAFF_ROLE'    AND "platformRole" IS NOT NULL AND "schoolId" IS NULL AND "classId" IS NULL
                                  AND "schoolRole" IS NULL)),
  DROP CONSTRAINT IF EXISTS "Invitation_platform_role_chk",
  ADD CONSTRAINT "Invitation_platform_role_chk"
    CHECK ("platformRole" IS NULL OR "platformRole" IN ('TEACHER', 'CONTENT_EDITOR', 'ADMIN', 'SUPER_ADMIN')),
  DROP CONSTRAINT IF EXISTS "Invitation_token_hash_chk",
  ADD CONSTRAINT "Invitation_token_hash_chk" CHECK ("tokenHash" ~ '^[0-9a-f]{64}$'),
  DROP CONSTRAINT IF EXISTS "Invitation_state_chk",
  ADD CONSTRAINT "Invitation_state_chk" CHECK ("acceptedAt" IS NULL OR "revokedAt" IS NULL),
  DROP CONSTRAINT IF EXISTS "Invitation_send_count_chk",
  ADD CONSTRAINT "Invitation_send_count_chk" CHECK ("sendCount" >= 1);

-- Purpose: announcement scope sets exactly the matching reference; country narrowing only for GLOBAL; no SCHOOL_ADMIN
-- audience on CLASS scope; expiry after publication (§22).
ALTER TABLE "Announcement"
  DROP CONSTRAINT IF EXISTS "Announcement_scope_chk",
  ADD CONSTRAINT "Announcement_scope_chk" CHECK (
       ("scope" = 'GLOBAL' AND "schoolId" IS NULL AND "classId" IS NULL)
    OR ("scope" = 'SCHOOL' AND "schoolId" IS NOT NULL AND "classId" IS NULL)
    OR ("scope" = 'CLASS'  AND "classId" IS NOT NULL AND "schoolId" IS NULL)),
  DROP CONSTRAINT IF EXISTS "Announcement_country_chk",
  ADD CONSTRAINT "Announcement_country_chk" CHECK ("countryId" IS NULL OR "scope" = 'GLOBAL'),
  DROP CONSTRAINT IF EXISTS "Announcement_audience_chk",
  ADD CONSTRAINT "Announcement_audience_chk" CHECK (NOT ('SCHOOL_ADMIN'::"Role" = ANY ("audienceRoles")) OR "scope" <> 'CLASS'),
  DROP CONSTRAINT IF EXISTS "Announcement_window_chk",
  ADD CONSTRAINT "Announcement_window_chk"
    CHECK ("expiresAt" IS NULL OR "publishedAt" IS NULL OR "expiresAt" > "publishedAt");

-- Purpose (SC-14): a report period is a valid range; a READY report has its file and generation time; non-blank kind.
ALTER TABLE "SchoolReport"
  DROP CONSTRAINT IF EXISTS "SchoolReport_values_chk",
  ADD CONSTRAINT "SchoolReport_values_chk"
    CHECK ("periodEnd" >= "periodStart" AND btrim("kind") <> ''
       AND ("status" <> 'READY' OR ("mediaAssetId" IS NOT NULL AND "generatedAt" IS NOT NULL)));

-- ---------------------------------------------------------------------------------------------------------------------
-- C3.3 Billing
-- ---------------------------------------------------------------------------------------------------------------------
-- Purpose: plan code format; non-negative trial; the default (FREE fallback) plan is active and INDIVIDUAL (§31).
ALTER TABLE "Plan"
  DROP CONSTRAINT IF EXISTS "Plan_code_chk",
  ADD CONSTRAINT "Plan_code_chk" CHECK ("code" ~ '^[A-Z][A-Z0-9_]{1,31}$'),
  DROP CONSTRAINT IF EXISTS "Plan_trial_days_chk",
  ADD CONSTRAINT "Plan_trial_days_chk" CHECK ("trialDays" >= 0),
  DROP CONSTRAINT IF EXISTS "Plan_default_chk",
  ADD CONSTRAINT "Plan_default_chk" CHECK (NOT "isDefault" OR ("isActive" AND "audience" = 'INDIVIDUAL'));
-- Purpose: at most one default plan in the whole table (expression + partial unique index).
CREATE UNIQUE INDEX IF NOT EXISTS "Plan_single_default_idx" ON "Plan" ((true)) WHERE "isDefault";

-- Purpose: a price targets a plan XOR a study pack; non-negative minor-unit amount; ISO currency; valid interval data;
-- study-pack prices are ONE_OFF and not per seat; seat minimums only on per-seat prices; valid window (§31, §53).
ALTER TABLE "PlanPrice"
  DROP CONSTRAINT IF EXISTS "PlanPrice_target_xor_chk",
  ADD CONSTRAINT "PlanPrice_target_xor_chk" CHECK (num_nonnulls("planId", "studyPackId") = 1),
  DROP CONSTRAINT IF EXISTS "PlanPrice_amount_chk",
  ADD CONSTRAINT "PlanPrice_amount_chk" CHECK ("amountMinor" >= 0),
  DROP CONSTRAINT IF EXISTS "PlanPrice_currency_chk",
  ADD CONSTRAINT "PlanPrice_currency_chk" CHECK ("currency" ~ '^[A-Z]{3}$'),
  DROP CONSTRAINT IF EXISTS "PlanPrice_interval_count_chk",
  ADD CONSTRAINT "PlanPrice_interval_count_chk" CHECK ("intervalCount" >= 1),
  DROP CONSTRAINT IF EXISTS "PlanPrice_period_days_chk",
  ADD CONSTRAINT "PlanPrice_period_days_chk"
    CHECK (("periodDays" IS NULL OR "periodDays" > 0) AND ("interval" <> 'TERM' OR "periodDays" IS NOT NULL)),
  DROP CONSTRAINT IF EXISTS "PlanPrice_study_pack_chk",
  ADD CONSTRAINT "PlanPrice_study_pack_chk" CHECK ("studyPackId" IS NULL OR ("interval" = 'ONE_OFF' AND NOT "perSeat")),
  DROP CONSTRAINT IF EXISTS "PlanPrice_seats_chk",
  ADD CONSTRAINT "PlanPrice_seats_chk" CHECK ("minSeats" IS NULL OR ("perSeat" AND "minSeats" >= 1)),
  DROP CONSTRAINT IF EXISTS "PlanPrice_window_chk",
  ADD CONSTRAINT "PlanPrice_window_chk" CHECK ("validTo" IS NULL OR "validTo" > "validFrom");
-- Purpose: prices are never edited in place: every price-defining column is frozen (isActive, validTo, label, sortOrder
-- and isDemo stay editable). Changing a price = insert a new row and deactivate the old one.
CREATE OR REPLACE FUNCTION "PlanPrice_immutable"() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  IF (NEW."planId", NEW."studyPackId", NEW."countryId", NEW."currency", NEW."amountMinor", NEW."interval",
      NEW."intervalCount", NEW."periodDays", NEW."perSeat", NEW."minSeats", NEW."validFrom")
     IS DISTINCT FROM
     (OLD."planId", OLD."studyPackId", OLD."countryId", OLD."currency", OLD."amountMinor", OLD."interval",
      OLD."intervalCount", OLD."periodDays", OLD."perSeat", OLD."minSeats", OLD."validFrom") THEN
    RAISE EXCEPTION 'PlanPrice % is immutable; create a new price row', OLD."id" USING ERRCODE = 'check_violation';
  END IF;
  RETURN NEW;
END
$$;
-- Purpose: attach the price immutability guard.
CREATE OR REPLACE TRIGGER "PlanPrice_immutable_trg" BEFORE UPDATE ON "PlanPrice"
  FOR EACH ROW EXECUTE FUNCTION "PlanPrice_immutable"();

-- Purpose: subscription holder is a user XOR a school (B2C vs B2B, §53); seats exactly for school subscriptions;
-- period ordering; live states have a period; TRIALING/CANCELLED/ended states timestamped; provider ref needs provider.
ALTER TABLE "Subscription"
  DROP CONSTRAINT IF EXISTS "Subscription_holder_xor_chk",
  ADD CONSTRAINT "Subscription_holder_xor_chk" CHECK (num_nonnulls("holderUserId", "schoolId") = 1),
  DROP CONSTRAINT IF EXISTS "Subscription_seats_chk",
  ADD CONSTRAINT "Subscription_seats_chk"
    CHECK (("schoolId" IS NOT NULL AND "seats" IS NOT NULL AND "seats" > 0) OR ("schoolId" IS NULL AND "seats" IS NULL)),
  DROP CONSTRAINT IF EXISTS "Subscription_period_chk",
  ADD CONSTRAINT "Subscription_period_chk"
    CHECK ("currentPeriodEnd" IS NULL OR "currentPeriodStart" IS NULL OR "currentPeriodEnd" > "currentPeriodStart"),
  DROP CONSTRAINT IF EXISTS "Subscription_live_period_chk",
  ADD CONSTRAINT "Subscription_live_period_chk"
    CHECK ("status" NOT IN ('ACTIVE', 'PAST_DUE') OR ("currentPeriodStart" IS NOT NULL AND "currentPeriodEnd" IS NOT NULL)),
  DROP CONSTRAINT IF EXISTS "Subscription_trial_chk",
  ADD CONSTRAINT "Subscription_trial_chk" CHECK ("status" <> 'TRIALING' OR "trialEndsAt" IS NOT NULL),
  DROP CONSTRAINT IF EXISTS "Subscription_cancelled_chk",
  ADD CONSTRAINT "Subscription_cancelled_chk" CHECK ("status" <> 'CANCELLED' OR "cancelledAt" IS NOT NULL),
  DROP CONSTRAINT IF EXISTS "Subscription_ended_chk",
  ADD CONSTRAINT "Subscription_ended_chk" CHECK ("status" NOT IN ('CANCELLED', 'EXPIRED') OR "endedAt" IS NOT NULL),
  DROP CONSTRAINT IF EXISTS "Subscription_provider_ref_chk",
  ADD CONSTRAINT "Subscription_provider_ref_chk" CHECK ("providerSubscriptionRef" IS NULL OR "provider" IS NOT NULL);
-- Purpose: one live (TRIALING/ACTIVE/PAST_DUE) subscription per user; a PENDING checkout may coexist.
CREATE UNIQUE INDEX IF NOT EXISTS "Subscription_one_live_per_user_idx" ON "Subscription" ("holderUserId")
  WHERE "holderUserId" IS NOT NULL AND "status" IN ('TRIALING', 'ACTIVE', 'PAST_DUE');
-- Purpose: one live subscription per school.
CREATE UNIQUE INDEX IF NOT EXISTS "Subscription_one_live_per_school_idx" ON "Subscription" ("schoolId")
  WHERE "schoolId" IS NOT NULL AND "status" IN ('TRIALING', 'ACTIVE', 'PAST_DUE');
-- Purpose (F14): the plan's audience matches the holder type (INDIVIDUAL plans for users, SCHOOL plans for schools).
CREATE OR REPLACE FUNCTION subscription_audience_guard() RETURNS trigger LANGUAGE plpgsql AS $$
DECLARE
  v_audience "PlanAudience";
BEGIN
  SELECT p."audience" INTO v_audience FROM "Plan" p WHERE p."id" = NEW."planId";
  IF v_audience IS DISTINCT FROM (CASE WHEN NEW."holderUserId" IS NOT NULL THEN 'INDIVIDUAL' ELSE 'SCHOOL' END)::"PlanAudience" THEN
    RAISE EXCEPTION 'Subscription %: plan % (audience %) does not match the holder type', NEW."id", NEW."planId", v_audience
      USING ERRCODE = 'check_violation';
  END IF;
  RETURN NEW;
END
$$;
-- Purpose: attach the audience guard.
CREATE OR REPLACE TRIGGER "Subscription_audience_guard"
  BEFORE INSERT OR UPDATE OF "planId", "holderUserId", "schoolId" ON "Subscription"
  FOR EACH ROW EXECUTE FUNCTION subscription_audience_guard();

-- Purpose: payment records (§32): positive minor-unit amount (a 100% discount is a FREE_DAYS grant, never a zero
-- payment), ISO currency, list = amount + discount, quantity >= 1, beneficiary user XOR school, purpose-specific
-- references, refund bounds, each state carries its timestamp, fulfilment only after success, valid service period.
ALTER TABLE "Payment"
  DROP CONSTRAINT IF EXISTS "Payment_amount_chk",
  ADD CONSTRAINT "Payment_amount_chk" CHECK ("amountMinor" > 0),
  DROP CONSTRAINT IF EXISTS "Payment_currency_chk",
  ADD CONSTRAINT "Payment_currency_chk" CHECK ("currency" ~ '^[A-Z]{3}$'),
  DROP CONSTRAINT IF EXISTS "Payment_discount_chk",
  ADD CONSTRAINT "Payment_discount_chk"
    CHECK ("discountMinor" >= 0 AND ("listAmountMinor" IS NULL OR "listAmountMinor" = "amountMinor" + "discountMinor")),
  DROP CONSTRAINT IF EXISTS "Payment_quantity_chk",
  ADD CONSTRAINT "Payment_quantity_chk" CHECK ("quantity" >= 1),
  DROP CONSTRAINT IF EXISTS "Payment_beneficiary_xor_chk",
  ADD CONSTRAINT "Payment_beneficiary_xor_chk" CHECK (num_nonnulls("beneficiaryUserId", "schoolId") = 1),
  DROP CONSTRAINT IF EXISTS "Payment_purpose_refs_chk",
  ADD CONSTRAINT "Payment_purpose_refs_chk" CHECK (
       ("purpose" = 'SUBSCRIPTION' AND "subscriptionId" IS NOT NULL AND "studyPackId" IS NULL)
    OR ("purpose" = 'STUDY_PACK'   AND "studyPackId" IS NOT NULL AND "beneficiaryUserId" IS NOT NULL
                                   AND "subscriptionId" IS NULL)
    OR ("purpose" = 'SEATS'        AND "subscriptionId" IS NOT NULL AND "schoolId" IS NOT NULL AND "studyPackId" IS NULL)),
  DROP CONSTRAINT IF EXISTS "Payment_refund_amount_chk",
  ADD CONSTRAINT "Payment_refund_amount_chk" CHECK ("refundedAmountMinor" >= 0 AND "refundedAmountMinor" <= "amountMinor"),
  DROP CONSTRAINT IF EXISTS "Payment_paid_chk",
  ADD CONSTRAINT "Payment_paid_chk" CHECK ("status" NOT IN ('SUCCESSFUL', 'REFUNDED') OR "paidAt" IS NOT NULL),
  DROP CONSTRAINT IF EXISTS "Payment_refunded_chk",
  ADD CONSTRAINT "Payment_refunded_chk"
    CHECK ("status" <> 'REFUNDED' OR ("refundedAt" IS NOT NULL AND "refundedAmountMinor" = "amountMinor")),
  DROP CONSTRAINT IF EXISTS "Payment_partial_refund_chk",
  ADD CONSTRAINT "Payment_partial_refund_chk" CHECK ("refundedAmountMinor" = 0 OR "status" IN ('SUCCESSFUL', 'REFUNDED')),
  DROP CONSTRAINT IF EXISTS "Payment_failed_chk",
  ADD CONSTRAINT "Payment_failed_chk" CHECK ("status" <> 'FAILED' OR "failedAt" IS NOT NULL),
  DROP CONSTRAINT IF EXISTS "Payment_cancelled_chk",
  ADD CONSTRAINT "Payment_cancelled_chk" CHECK ("status" <> 'CANCELLED' OR "cancelledAt" IS NOT NULL),
  DROP CONSTRAINT IF EXISTS "Payment_fulfilled_chk",
  ADD CONSTRAINT "Payment_fulfilled_chk" CHECK ("fulfilledAt" IS NULL OR "status" IN ('SUCCESSFUL', 'REFUNDED')),
  DROP CONSTRAINT IF EXISTS "Payment_service_period_chk",
  ADD CONSTRAINT "Payment_service_period_chk"
    CHECK ("servicePeriodEnd" IS NULL OR ("servicePeriodStart" IS NOT NULL AND "servicePeriodEnd" > "servicePeriodStart"));
-- Purpose: payments.reconcile polls PENDING payments per provider, oldest first.
CREATE INDEX IF NOT EXISTS "Payment_pending_reconcile_idx" ON "Payment" ("provider", "createdAt") WHERE "status" = 'PENDING';
-- Purpose: revenue rollups by paid day (§35).
CREATE INDEX IF NOT EXISTS "Payment_paid_at_idx" ON "Payment" ("paidAt") WHERE "paidAt" IS NOT NULL;
-- Purpose (§32, F7): money and party columns are frozen after insert; fulfilment, payment time, receipt number,
-- service period and payer fingerprint are write-once (the double-fulfilment guard for SUBSCRIPTION payments, which
-- have no unique grant row, is enforced here, not only in the service); refunds only accumulate; the state machine is
-- enforced as defence in depth (PENDING -> any; FAILED/CANCELLED -> SUCCESSFUL when a late verified "paid" arrives;
-- SUCCESSFUL -> REFUNDED).
CREATE OR REPLACE FUNCTION "Payment_guard"() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  IF (NEW."purpose", NEW."provider", NEW."payerUserId", NEW."beneficiaryUserId", NEW."schoolId", NEW."subscriptionId",
      NEW."studyPackId", NEW."planPriceId", NEW."promoCodeId", NEW."amountMinor", NEW."currency", NEW."listAmountMinor",
      NEW."discountMinor", NEW."quantity", NEW."idempotencyKey")
     IS DISTINCT FROM
     (OLD."purpose", OLD."provider", OLD."payerUserId", OLD."beneficiaryUserId", OLD."schoolId", OLD."subscriptionId",
      OLD."studyPackId", OLD."planPriceId", OLD."promoCodeId", OLD."amountMinor", OLD."currency", OLD."listAmountMinor",
      OLD."discountMinor", OLD."quantity", OLD."idempotencyKey") THEN
    RAISE EXCEPTION 'Payment % amount/parties are immutable', OLD."id" USING ERRCODE = 'check_violation';
  END IF;
  IF (OLD."fulfilledAt" IS NOT NULL AND NEW."fulfilledAt" IS DISTINCT FROM OLD."fulfilledAt")
     OR (OLD."paidAt" IS NOT NULL AND NEW."paidAt" IS DISTINCT FROM OLD."paidAt")
     OR (OLD."receiptNumber" IS NOT NULL AND NEW."receiptNumber" IS DISTINCT FROM OLD."receiptNumber")
     OR (OLD."servicePeriodStart" IS NOT NULL AND NEW."servicePeriodStart" IS DISTINCT FROM OLD."servicePeriodStart")
     OR (OLD."servicePeriodEnd" IS NOT NULL AND NEW."servicePeriodEnd" IS DISTINCT FROM OLD."servicePeriodEnd")
     OR (OLD."payerFingerprint" IS NOT NULL AND NEW."payerFingerprint" IS DISTINCT FROM OLD."payerFingerprint") THEN
    RAISE EXCEPTION 'Payment %: fulfilment, payment, receipt and service-period fields are write-once', OLD."id"
      USING ERRCODE = 'check_violation';
  END IF;
  IF NEW."refundedAmountMinor" < OLD."refundedAmountMinor" THEN
    RAISE EXCEPTION 'Payment %: refundedAmountMinor cannot decrease', OLD."id" USING ERRCODE = 'check_violation';
  END IF;
  IF NEW."status" <> OLD."status" AND NOT (
       OLD."status" = 'PENDING'
    OR (OLD."status" IN ('FAILED', 'CANCELLED') AND NEW."status" = 'SUCCESSFUL')  -- late verified "paid" wins
    OR (OLD."status" = 'SUCCESSFUL' AND NEW."status" = 'REFUNDED')) THEN
    RAISE EXCEPTION 'Payment % illegal transition % -> %', OLD."id", OLD."status", NEW."status"
      USING ERRCODE = 'check_violation';
  END IF;
  RETURN NEW;
END
$$;
-- Purpose: attach the payment guard.
CREATE OR REPLACE TRIGGER "Payment_guard_trg" BEFORE UPDATE ON "Payment" FOR EACH ROW EXECUTE FUNCTION "Payment_guard"();
-- Purpose (F14): a subscription payment extends the subscription of the same beneficiary (user or school); a payment
-- for user X can never extend user Y's subscription. Insert-time only: these columns are frozen by Payment_guard.
CREATE OR REPLACE FUNCTION payment_subscription_guard() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  IF NEW."subscriptionId" IS NOT NULL AND NOT EXISTS (
       SELECT 1 FROM "Subscription" s
        WHERE s."id" = NEW."subscriptionId"
          AND s."holderUserId" IS NOT DISTINCT FROM NEW."beneficiaryUserId"
          AND s."schoolId" IS NOT DISTINCT FROM NEW."schoolId") THEN
    RAISE EXCEPTION 'Payment %: subscription % belongs to a different beneficiary', NEW."id", NEW."subscriptionId"
      USING ERRCODE = 'check_violation';
  END IF;
  RETURN NEW;
END
$$;
-- Purpose: attach the subscription-ownership guard.
CREATE OR REPLACE TRIGGER "Payment_subscription_guard" BEFORE INSERT ON "Payment"
  FOR EACH ROW EXECUTE FUNCTION payment_subscription_guard();

-- Purpose: provider event currencies are ISO codes.
ALTER TABLE "PaymentEvent"
  DROP CONSTRAINT IF EXISTS "PaymentEvent_currency_chk",
  ADD CONSTRAINT "PaymentEvent_currency_chk" CHECK ("currency" IS NULL OR "currency" ~ '^[A-Z]{3}$');
-- Purpose (F7): idempotency among AUTHENTIC events only. An unsigned forgery with a guessed (synthetic Paynow) id is
-- stored for investigation but can never claim the key, so the genuine signed webhook / server poll is never dropped.
-- Insert with ON CONFLICT ("provider", "providerEventId") WHERE "signatureValid" DO NOTHING.
CREATE UNIQUE INDEX IF NOT EXISTS "PaymentEvent_provider_event_valid_key" ON "PaymentEvent" ("provider", "providerEventId")
  WHERE "signatureValid";
-- Purpose: worker queue of signature-verified events not yet processed.
CREATE INDEX IF NOT EXISTS "PaymentEvent_unprocessed_idx" ON "PaymentEvent" ("createdAt") WHERE "processedAt" IS NULL AND "signatureValid";
-- Purpose (F7, §32 "proper transaction records"): PaymentEvent is append-only. UPDATE may only set processedAt and
-- paymentId once (NULL -> value), change processingError, and null recordedById after that staff user row is really
-- gone (FK SET NULL). DELETE only by the retention purge (SET LOCAL app.payment_retention_purge = 'on', rows > 6 years).
CREATE OR REPLACE FUNCTION payment_event_append_only() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  IF TG_OP = 'DELETE' THEN
    IF current_setting('app.payment_retention_purge', true) = 'on' AND OLD."createdAt" < now() - interval '6 years' THEN
      RETURN OLD;
    END IF;
    RAISE EXCEPTION 'PaymentEvent is append-only (DELETE refused)' USING ERRCODE = 'insufficient_privilege';
  END IF;
  IF (to_jsonb(NEW) - 'processedAt' - 'processingError' - 'paymentId' - 'recordedById')
       = (to_jsonb(OLD) - 'processedAt' - 'processingError' - 'paymentId' - 'recordedById')
     AND (OLD."processedAt" IS NULL OR NEW."processedAt" IS NOT DISTINCT FROM OLD."processedAt")
     AND (OLD."paymentId" IS NULL OR NEW."paymentId" IS NOT DISTINCT FROM OLD."paymentId")
     AND (NEW."recordedById" IS NOT DISTINCT FROM OLD."recordedById"
          OR (NEW."recordedById" IS NULL AND NOT EXISTS (SELECT 1 FROM "User" u WHERE u."id" = OLD."recordedById"))) THEN
    RETURN NEW;
  END IF;
  RAISE EXCEPTION 'PaymentEvent % is append-only (UPDATE refused)', OLD."id" USING ERRCODE = 'insufficient_privilege';
END
$$;
-- Purpose: attach the append-only guard.
CREATE OR REPLACE TRIGGER "PaymentEvent_append_only" BEFORE UPDATE OR DELETE ON "PaymentEvent"
  FOR EACH ROW EXECUTE FUNCTION payment_event_append_only();

-- Purpose: grants are held by a user XOR a school, grant something (plan, pack or features), have a valid window;
-- STUDY_PACK grants name the pack; SCHOOL_SEAT grants (and only they) link the funding subscription and a user;
-- staff-issued free access (ADMIN, COMPENSATION) is attributed and justified (F14).
ALTER TABLE "EntitlementGrant"
  DROP CONSTRAINT IF EXISTS "EntitlementGrant_holder_xor_chk",
  ADD CONSTRAINT "EntitlementGrant_holder_xor_chk" CHECK (num_nonnulls("userId", "schoolId") = 1),
  DROP CONSTRAINT IF EXISTS "EntitlementGrant_what_chk",
  ADD CONSTRAINT "EntitlementGrant_what_chk" CHECK (num_nonnulls("planId", "studyPackId", "features") >= 1),
  DROP CONSTRAINT IF EXISTS "EntitlementGrant_window_chk",
  ADD CONSTRAINT "EntitlementGrant_window_chk" CHECK ("endsAt" IS NULL OR "endsAt" > "startsAt"),
  DROP CONSTRAINT IF EXISTS "EntitlementGrant_study_pack_chk",
  ADD CONSTRAINT "EntitlementGrant_study_pack_chk" CHECK ("source" <> 'STUDY_PACK' OR "studyPackId" IS NOT NULL),
  DROP CONSTRAINT IF EXISTS "EntitlementGrant_seat_chk",
  ADD CONSTRAINT "EntitlementGrant_seat_chk"
    CHECK ((("source" = 'SCHOOL_SEAT') = ("subscriptionId" IS NOT NULL)) AND ("source" <> 'SCHOOL_SEAT' OR "userId" IS NOT NULL)),
  DROP CONSTRAINT IF EXISTS "EntitlementGrant_staff_chk",
  ADD CONSTRAINT "EntitlementGrant_staff_chk"
    CHECK ("source" NOT IN ('ADMIN', 'COMPENSATION')
        OR ("grantedById" IS NOT NULL AND "reason" IS NOT NULL AND btrim("reason") <> ''));
-- Purpose: one active seat per student per school subscription (the seat cap itself is checked by the service under
-- SELECT ... FOR UPDATE on the subscription).
CREATE UNIQUE INDEX IF NOT EXISTS "EntitlementGrant_one_active_seat_idx" ON "EntitlementGrant" ("subscriptionId", "userId")
  WHERE "source" = 'SCHOOL_SEAT' AND "revokedAt" IS NULL;
-- Purpose (F14): a grant's billing links agree with each other: a paymentId names a SUCCESSFUL payment (checked when the
-- link is made) for the same beneficiary user / school and the same study pack; a SCHOOL_SEAT grant is funded by a
-- SCHOOL-held subscription and goes to an ACTIVE student member of that school.
CREATE OR REPLACE FUNCTION entitlement_grant_link_guard() RETURNS trigger LANGUAGE plpgsql AS $$
DECLARE
  v_pay        record;
  v_new_link   boolean;
  v_sub_school uuid;
BEGIN
  IF NEW."paymentId" IS NOT NULL THEN
    IF TG_OP = 'INSERT' THEN
      v_new_link := true;
    ELSE
      v_new_link := NEW."paymentId" IS DISTINCT FROM OLD."paymentId";
    END IF;
    SELECT p."status"::text AS status, p."beneficiaryUserId", p."schoolId", p."studyPackId"
      INTO v_pay FROM "Payment" p WHERE p."id" = NEW."paymentId";
    IF FOUND THEN
      IF v_new_link AND v_pay.status <> 'SUCCESSFUL' THEN
        RAISE EXCEPTION 'EntitlementGrant %: payment % is % (must be SUCCESSFUL)', NEW."id", NEW."paymentId", v_pay.status
          USING ERRCODE = 'check_violation';
      END IF;
      IF v_pay."beneficiaryUserId" IS DISTINCT FROM NEW."userId" OR v_pay."schoolId" IS DISTINCT FROM NEW."schoolId"
         OR (NEW."studyPackId" IS NOT NULL AND v_pay."studyPackId" IS DISTINCT FROM NEW."studyPackId") THEN
        RAISE EXCEPTION 'EntitlementGrant %: payment % was for a different beneficiary or study pack', NEW."id", NEW."paymentId"
          USING ERRCODE = 'check_violation';
      END IF;
    END IF;
  END IF;
  IF NEW."source" = 'SCHOOL_SEAT' THEN
    SELECT s."schoolId" INTO v_sub_school FROM "Subscription" s WHERE s."id" = NEW."subscriptionId";
    IF v_sub_school IS NULL THEN
      RAISE EXCEPTION 'EntitlementGrant %: a SCHOOL_SEAT must be funded by a school subscription', NEW."id"
        USING ERRCODE = 'check_violation';
    END IF;
    IF NOT EXISTS (SELECT 1 FROM "SchoolMember" m
                    WHERE m."schoolId" = v_sub_school AND m."userId" = NEW."userId"
                      AND m."role" = 'STUDENT' AND m."status" = 'ACTIVE') THEN
      RAISE EXCEPTION 'EntitlementGrant %: user % is not an ACTIVE student of school %', NEW."id", NEW."userId", v_sub_school
        USING ERRCODE = 'check_violation';
    END IF;
  END IF;
  RETURN NEW;
END
$$;
-- Purpose: attach the link guard.
CREATE OR REPLACE TRIGGER "EntitlementGrant_link_guard"
  BEFORE INSERT OR UPDATE OF "paymentId", "subscriptionId", "userId", "schoolId", "studyPackId", "source" ON "EntitlementGrant"
  FOR EACH ROW EXECUTE FUNCTION entitlement_grant_link_guard();

-- Purpose: promo code format; discount fields consistent with discount type (m2: PERCENT stops at 99 because a Payment is
-- never zero; a full discount is a FREE_DAYS grant); ISO currency; redemption cap; valid window.
ALTER TABLE "PromoCode"
  DROP CONSTRAINT IF EXISTS "PromoCode_code_chk",
  ADD CONSTRAINT "PromoCode_code_chk" CHECK ("code" ~ '^[A-Z0-9][A-Z0-9_-]{2,31}$'),
  DROP CONSTRAINT IF EXISTS "PromoCode_discount_chk",
  ADD CONSTRAINT "PromoCode_discount_chk" CHECK (
       ("discountType" = 'PERCENT' AND "percentOff" BETWEEN 1 AND 99 AND "amountOffMinor" IS NULL AND "freeDays" IS NULL)
    OR ("discountType" = 'FIXED_AMOUNT' AND "amountOffMinor" > 0 AND "currency" IS NOT NULL
                                        AND "percentOff" IS NULL AND "freeDays" IS NULL)
    OR ("discountType" = 'FREE_DAYS' AND "freeDays" > 0 AND "grantPlanId" IS NOT NULL
                                     AND "percentOff" IS NULL AND "amountOffMinor" IS NULL)),
  DROP CONSTRAINT IF EXISTS "PromoCode_currency_chk",
  ADD CONSTRAINT "PromoCode_currency_chk" CHECK ("currency" IS NULL OR "currency" ~ '^[A-Z]{3}$'),
  DROP CONSTRAINT IF EXISTS "PromoCode_redemptions_chk",
  ADD CONSTRAINT "PromoCode_redemptions_chk"
    CHECK ("redeemedCount" >= 0 AND ("maxRedemptions" IS NULL OR ("maxRedemptions" > 0 AND "redeemedCount" <= "maxRedemptions"))),
  DROP CONSTRAINT IF EXISTS "PromoCode_window_chk",
  ADD CONSTRAINT "PromoCode_window_chk" CHECK ("validTo" IS NULL OR "validTo" > "validFrom");

-- Purpose: redemption lifecycle states are timestamped.
ALTER TABLE "PromoRedemption"
  DROP CONSTRAINT IF EXISTS "PromoRedemption_applied_chk",
  ADD CONSTRAINT "PromoRedemption_applied_chk" CHECK ("status" <> 'APPLIED' OR "appliedAt" IS NOT NULL),
  DROP CONSTRAINT IF EXISTS "PromoRedemption_released_chk",
  ADD CONSTRAINT "PromoRedemption_released_chk" CHECK ("status" <> 'RELEASED' OR "releasedAt" IS NOT NULL);

-- Purpose: referral code format (§46).
ALTER TABLE "ReferralCode"
  DROP CONSTRAINT IF EXISTS "ReferralCode_code_chk",
  ADD CONSTRAINT "ReferralCode_code_chk" CHECK ("code" ~ '^[A-Z0-9]{4,32}$');

-- Purpose: no self-referral; referral lifecycle states are timestamped (§46).
ALTER TABLE "Referral"
  DROP CONSTRAINT IF EXISTS "Referral_not_self_chk",
  ADD CONSTRAINT "Referral_not_self_chk" CHECK ("referrerUserId" <> "referredUserId"),
  DROP CONSTRAINT IF EXISTS "Referral_qualified_chk",
  ADD CONSTRAINT "Referral_qualified_chk" CHECK ("status" NOT IN ('QUALIFIED', 'REWARDED') OR "qualifiedAt" IS NOT NULL),
  DROP CONSTRAINT IF EXISTS "Referral_rewarded_chk",
  ADD CONSTRAINT "Referral_rewarded_chk" CHECK ("status" <> 'REWARDED' OR "rewardedAt" IS NOT NULL),
  DROP CONSTRAINT IF EXISTS "Referral_rejected_chk",
  ADD CONSTRAINT "Referral_rejected_chk" CHECK ("status" <> 'REJECTED' OR "rejectedAt" IS NOT NULL);

-- ---------------------------------------------------------------------------------------------------------------------
-- C3.4 AI
-- ---------------------------------------------------------------------------------------------------------------------
-- Purpose: conversation counters and metering are non-negative; user turns never exceed all turns (§40).
ALTER TABLE "AiConversation"
  DROP CONSTRAINT IF EXISTS "AiConversation_counters_chk",
  ADD CONSTRAINT "AiConversation_counters_chk"
    CHECK ("messageCount" >= 0 AND "userMessageCount" >= 0 AND "userMessageCount" <= "messageCount"
           AND "inputTokens" >= 0 AND "outputTokens" >= 0 AND "cacheReadTokens" >= 0 AND "cacheWriteTokens" >= 0
           AND "costMicros" >= 0);

-- Purpose: message metering non-negative; hint ladder 0-4 (§14); ratings are +1/-1 on assistant messages only.
ALTER TABLE "AiMessage"
  DROP CONSTRAINT IF EXISTS "AiMessage_counters_chk",
  ADD CONSTRAINT "AiMessage_counters_chk"
    CHECK ("inputTokens" >= 0 AND "outputTokens" >= 0 AND "cacheReadTokens" >= 0 AND "cacheWriteTokens" >= 0
           AND "costMicros" >= 0 AND ("latencyMs" IS NULL OR "latencyMs" >= 0)),
  DROP CONSTRAINT IF EXISTS "AiMessage_hint_level_chk",
  ADD CONSTRAINT "AiMessage_hint_level_chk" CHECK ("hintLevel" IS NULL OR "hintLevel" BETWEEN 0 AND 4),
  DROP CONSTRAINT IF EXISTS "AiMessage_rating_chk",
  ADD CONSTRAINT "AiMessage_rating_chk"
    CHECK ("userRating" IS NULL OR ("userRating" IN (-1, 1) AND "role" = 'ASSISTANT'));

-- Purpose: daily quota ledger counters are non-negative (§40).
ALTER TABLE "AiUsageDaily"
  DROP CONSTRAINT IF EXISTS "AiUsageDaily_counters_chk",
  ADD CONSTRAINT "AiUsageDaily_counters_chk"
    CHECK ("requests" >= 0 AND "reservedRequests" >= 0 AND "cacheHits" >= 0 AND "deepRequests" >= 0 AND "images" >= 0
           AND "inputTokens" >= 0 AND "outputTokens" >= 0 AND "cacheReadTokens" >= 0 AND "cacheWriteTokens" >= 0
           AND "costMicros" >= 0);

-- Purpose (m3): global spend counter shards 0-15, non-negative totals.
ALTER TABLE "AiSpendDaily"
  DROP CONSTRAINT IF EXISTS "AiSpendDaily_values_chk",
  ADD CONSTRAINT "AiSpendDaily_values_chk" CHECK ("shard" BETWEEN 0 AND 15 AND "costMicros" >= 0 AND "requests" >= 0);

-- Purpose: response-cache key is a sha256 hex digest; counters non-negative.
ALTER TABLE "AiResponseCache"
  DROP CONSTRAINT IF EXISTS "AiResponseCache_key_chk",
  ADD CONSTRAINT "AiResponseCache_key_chk" CHECK ("cacheKey" ~ '^[0-9a-f]{64}$'),
  DROP CONSTRAINT IF EXISTS "AiResponseCache_counters_chk",
  ADD CONSTRAINT "AiResponseCache_counters_chk" CHECK ("hitCount" >= 0 AND "costMicros" >= 0);

-- Purpose: generation jobs have at least one curriculum scope; terminal states timestamped; counters sane (§41).
ALTER TABLE "AiGenerationJob"
  DROP CONSTRAINT IF EXISTS "AiGenerationJob_scope_chk",
  ADD CONSTRAINT "AiGenerationJob_scope_chk" CHECK (num_nonnulls("syllabusId", "subjectId", "topicId") >= 1),
  DROP CONSTRAINT IF EXISTS "AiGenerationJob_completed_chk",
  ADD CONSTRAINT "AiGenerationJob_completed_chk" CHECK ("status" <> 'COMPLETED' OR "completedAt" IS NOT NULL),
  DROP CONSTRAINT IF EXISTS "AiGenerationJob_cancelled_chk",
  ADD CONSTRAINT "AiGenerationJob_cancelled_chk" CHECK ("status" <> 'CANCELLED' OR "cancelledAt" IS NOT NULL),
  DROP CONSTRAINT IF EXISTS "AiGenerationJob_counters_chk",
  ADD CONSTRAINT "AiGenerationJob_counters_chk"
    CHECK ("itemsCreated" >= 0 AND ("itemsRequested" IS NULL OR "itemsRequested" > 0) AND "costMicros" >= 0
           AND "inputTokens" >= 0 AND "outputTokens" >= 0);

-- Purpose (F2; §21, ARCHITECTURE §5.2 "never"): ROW LEVEL SECURITY makes AI conversations private in the DATABASE, not
-- only in services. FORCE applies it to the table owner too (only superusers / BYPASSRLS roles skip it: the app role
-- must be neither, section D). Readers: the owner (app.user_id), a parent on an ACTIVE link with the student's separate
-- AI consent (app.ai_scope = 'parent'; the platform switch privacy.parentAiAccess.enabled is checked by the service),
-- workers ('system') and audited break-glass ('break_glass', read only). Writers: the owner and workers. Foreign-key
-- checks and cascades bypass RLS, so Restrict/Cascade behave as before. Any other query (a careless include from
-- Subject / Topic / Question, an admin or teacher screen) simply sees no rows.
ALTER TABLE "AiConversation" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "AiConversation" FORCE ROW LEVEL SECURITY;
-- Purpose: read access to conversations.
DROP POLICY IF EXISTS "AiConversation_read" ON "AiConversation";
CREATE POLICY "AiConversation_read" ON "AiConversation" FOR SELECT
  USING ("userId" = NULLIF(current_setting('app.user_id', true), '')::uuid
         OR current_setting('app.ai_scope', true) IN ('system', 'break_glass')
         OR (current_setting('app.ai_scope', true) = 'parent' AND EXISTS (
               SELECT 1 FROM "ParentStudentLink" l
                WHERE l."parentUserId" = NULLIF(current_setting('app.user_id', true), '')::uuid
                  AND l."studentUserId" = "AiConversation"."userId"
                  AND l."status" = 'ACTIVE' AND l."canViewAiConversations")));
-- Purpose: only the owner (or a worker) creates conversations.
DROP POLICY IF EXISTS "AiConversation_insert" ON "AiConversation";
CREATE POLICY "AiConversation_insert" ON "AiConversation" FOR INSERT
  WITH CHECK ("userId" = NULLIF(current_setting('app.user_id', true), '')::uuid
              OR current_setting('app.ai_scope', true) = 'system');
-- Purpose: only the owner (or a worker) updates conversations.
DROP POLICY IF EXISTS "AiConversation_update" ON "AiConversation";
CREATE POLICY "AiConversation_update" ON "AiConversation" FOR UPDATE
  USING ("userId" = NULLIF(current_setting('app.user_id', true), '')::uuid
         OR current_setting('app.ai_scope', true) = 'system')
  WITH CHECK ("userId" = NULLIF(current_setting('app.user_id', true), '')::uuid
              OR current_setting('app.ai_scope', true) = 'system');
-- Purpose: only the owner (or a worker, e.g. account deletion) deletes conversations.
DROP POLICY IF EXISTS "AiConversation_delete" ON "AiConversation";
CREATE POLICY "AiConversation_delete" ON "AiConversation" FOR DELETE
  USING ("userId" = NULLIF(current_setting('app.user_id', true), '')::uuid
         OR current_setting('app.ai_scope', true) = 'system');

ALTER TABLE "AiMessage" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "AiMessage" FORCE ROW LEVEL SECURITY;
-- Purpose: a message is readable exactly when its conversation is (the subquery is itself subject to the policy above).
DROP POLICY IF EXISTS "AiMessage_read" ON "AiMessage";
CREATE POLICY "AiMessage_read" ON "AiMessage" FOR SELECT
  USING (EXISTS (SELECT 1 FROM "AiConversation" c WHERE c."id" = "AiMessage"."conversationId"));
-- Purpose: messages are written by the conversation owner or a worker (metering, the 12-month content purge, deletion).
DROP POLICY IF EXISTS "AiMessage_write" ON "AiMessage";
CREATE POLICY "AiMessage_write" ON "AiMessage" FOR ALL
  USING (EXISTS (SELECT 1 FROM "AiConversation" c
                  WHERE c."id" = "AiMessage"."conversationId"
                    AND (c."userId" = NULLIF(current_setting('app.user_id', true), '')::uuid
                         OR current_setting('app.ai_scope', true) = 'system')))
  WITH CHECK (EXISTS (SELECT 1 FROM "AiConversation" c
                       WHERE c."id" = "AiMessage"."conversationId"
                         AND (c."userId" = NULLIF(current_setting('app.user_id', true), '')::uuid
                              OR current_setting('app.ai_scope', true) = 'system')));

-- ---------------------------------------------------------------------------------------------------------------------
-- C3.5 Channels
-- ---------------------------------------------------------------------------------------------------------------------
-- Purpose: a verified channel identity is linked to a user; WhatsApp/SMS ids are E.164 (§30).
ALTER TABLE "ChannelIdentity"
  DROP CONSTRAINT IF EXISTS "ChannelIdentity_verified_chk",
  ADD CONSTRAINT "ChannelIdentity_verified_chk" CHECK ("verifiedAt" IS NULL OR "userId" IS NOT NULL),
  DROP CONSTRAINT IF EXISTS "ChannelIdentity_phone_chk",
  ADD CONSTRAINT "ChannelIdentity_phone_chk"
    CHECK ("channel" NOT IN ('WHATSAPP', 'SMS') OR "externalId" ~ '^\+[1-9][0-9]{6,14}$');

-- Purpose: inbound messages carry the provider message id (webhook dedupe); status values match the direction;
-- (F3) AI tutoring text and OTP codes never sit in this support-visible table: non-STANDARD rows have no body and no
-- payload, and only AI_PRIVATE rows point at an AiMessage.
ALTER TABLE "ChannelMessage"
  DROP CONSTRAINT IF EXISTS "ChannelMessage_inbound_id_chk",
  ADD CONSTRAINT "ChannelMessage_inbound_id_chk" CHECK ("direction" <> 'INBOUND' OR "externalMessageId" IS NOT NULL),
  DROP CONSTRAINT IF EXISTS "ChannelMessage_status_direction_chk",
  ADD CONSTRAINT "ChannelMessage_status_direction_chk" CHECK (
       ("direction" = 'INBOUND'  AND "status" IN ('RECEIVED', 'PROCESSED', 'IGNORED', 'FAILED'))
    OR ("direction" = 'OUTBOUND' AND "status" IN ('QUEUED', 'SENT', 'DELIVERED', 'READ', 'FAILED'))),
  DROP CONSTRAINT IF EXISTS "ChannelMessage_content_class_chk",
  ADD CONSTRAINT "ChannelMessage_content_class_chk"
    CHECK (("contentClass" = 'STANDARD' OR ("body" IS NULL AND "payload" IS NULL))
       AND ("aiMessageId" IS NULL OR "contentClass" = 'AI_PRIVATE'));

-- Purpose (M5): the awaited answer slot is a pair, both set or both NULL (its single composite FK's ON DELETE SET NULL
-- clears both together, so an erasure cascade can never leave half a reference). Deliberately no
-- "AWAITING_ANSWER => slot" CHECK: that would block the same cascades; the service treats an AWAITING_ANSWER state
-- without a slot as IDLE.
ALTER TABLE "ChannelConversationState"
  DROP CONSTRAINT IF EXISTS "ChannelConversationState_pending_chk",
  ADD CONSTRAINT "ChannelConversationState_pending_chk"
    CHECK ((("pendingAttemptId" IS NULL) = ("pendingPosition" IS NULL))
       AND ("pendingPosition" IS NULL OR "pendingPosition" >= 1));

-- ---------------------------------------------------------------------------------------------------------------------
-- C3.6 Infrastructure
-- ---------------------------------------------------------------------------------------------------------------------
-- Purpose (§39, F8): AuditLog is append-only. Primary control is privileges (section D, REQUIRED); this trigger refuses
-- UPDATE/DELETE except (a) the FK-driven SET NULL of targetUserId / schoolId once that user / school row is really gone
-- (the actor reference is Restrict and can never be nulled) and (b) the retention purge, run as the maintenance role
-- with SET LOCAL app.audit_retention_purge = 'on', for rows older than 2 years (6 years for payment-related entities,
-- ARCHITECTURE §5.13).
CREATE OR REPLACE FUNCTION "AuditLog_append_only"() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  IF TG_OP = 'DELETE' THEN
    -- (The CASE is parenthesised: PL/pgSQL ends an IF condition at the first THEN outside parentheses.)
    IF current_setting('app.audit_retention_purge', true) = 'on'
       AND OLD."createdAt" < now() - (CASE WHEN OLD."entityType" IN ('Payment', 'PaymentEvent', 'Subscription',
                                                                      'EntitlementGrant', 'PlanPrice', 'PromoCode')
                                           THEN interval '6 years' ELSE interval '2 years' END) THEN
      RETURN OLD;
    END IF;
    RAISE EXCEPTION 'AuditLog is append-only (DELETE refused)' USING ERRCODE = 'insufficient_privilege';
  END IF;
  IF (to_jsonb(NEW) - 'targetUserId' - 'schoolId') = (to_jsonb(OLD) - 'targetUserId' - 'schoolId')
     AND (NEW."targetUserId" IS NOT DISTINCT FROM OLD."targetUserId"
          OR (NEW."targetUserId" IS NULL AND NOT EXISTS (SELECT 1 FROM "User" u WHERE u."id" = OLD."targetUserId")))
     AND (NEW."schoolId" IS NOT DISTINCT FROM OLD."schoolId"
          OR (NEW."schoolId" IS NULL AND NOT EXISTS (SELECT 1 FROM "School" s WHERE s."id" = OLD."schoolId"))) THEN
    RETURN NEW;
  END IF;
  RAISE EXCEPTION 'AuditLog is append-only (UPDATE refused)' USING ERRCODE = 'insufficient_privilege';
END
$$;
-- Purpose: attach the append-only guard to AuditLog.
CREATE OR REPLACE TRIGGER "AuditLog_append_only_trg" BEFORE UPDATE OR DELETE ON "AuditLog"
  FOR EACH ROW EXECUTE FUNCTION "AuditLog_append_only"();
-- Purpose (F8): break-glass reads of AI conversations and admin views of a student's record name the actor and a
-- non-blank reason.
ALTER TABLE "AuditLog"
  DROP CONSTRAINT IF EXISTS "AuditLog_reason_chk",
  ADD CONSTRAINT "AuditLog_reason_chk"
    CHECK ("action" NOT IN ('ai_conversation.break_glass', 'student.view')
        OR ("reason" IS NOT NULL AND btrim("reason") <> '' AND "actorUserId" IS NOT NULL));

-- Purpose: job dedupe while PENDING only (a follow-up may be queued while one RUNS, so debounced rollups never miss
-- changes). Enqueue: INSERT ... ON CONFLICT ("dedupeKey") WHERE "dedupeKey" IS NOT NULL AND "status" = 'PENDING' DO NOTHING.
CREATE UNIQUE INDEX IF NOT EXISTS "Job_dedupeKey_pending_key" ON "Job" ("dedupeKey") WHERE "dedupeKey" IS NOT NULL AND "status" = 'PENDING';
-- Purpose: hot claim path: WHERE queue = $1 AND status = 'PENDING' AND "runAt" <= now() ORDER BY priority, "runAt"
-- LIMIT n FOR UPDATE SKIP LOCKED.
CREATE INDEX IF NOT EXISTS "Job_claim_idx" ON "Job" ("queue", "priority", "runAt") WHERE "status" = 'PENDING';
-- Purpose: lease reclaim of RUNNING jobs whose lockedAt is older than the lease.
CREATE INDEX IF NOT EXISTS "Job_lease_idx" ON "Job" ("lockedAt") WHERE "status" = 'RUNNING';
-- Purpose: bounded attempts; RUNNING jobs hold a lock; finished jobs are timestamped.
ALTER TABLE "Job"
  DROP CONSTRAINT IF EXISTS "Job_attempts_chk",
  ADD CONSTRAINT "Job_attempts_chk" CHECK ("attempts" >= 0 AND "maxAttempts" >= 1 AND "attempts" <= "maxAttempts"),
  DROP CONSTRAINT IF EXISTS "Job_running_chk",
  ADD CONSTRAINT "Job_running_chk" CHECK ("status" <> 'RUNNING' OR ("lockedAt" IS NOT NULL AND "lockedBy" IS NOT NULL)),
  DROP CONSTRAINT IF EXISTS "Job_finished_chk",
  ADD CONSTRAINT "Job_finished_chk"
    CHECK ("status" NOT IN ('SUCCEEDED', 'FAILED', 'DEAD', 'CANCELLED') OR "completedAt" IS NOT NULL);
-- Purpose: queue table churns (small live set): eager autovacuum.
ALTER TABLE "Job" SET (autovacuum_vacuum_scale_factor = 0.01);
-- Purpose: wake idle workers (LISTEN job_enqueued; payload = queue). Postgres collapses identical notifications in one
-- transaction, so bulk fan-out inserts send one per queue.
CREATE OR REPLACE FUNCTION "Job_notify"() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  PERFORM pg_notify('job_enqueued', NEW."queue");
  RETURN NULL;
END
$$;
-- Purpose: attach the enqueue notification to PENDING inserts.
CREATE OR REPLACE TRIGGER "Job_notify_trg" AFTER INSERT ON "Job"
  FOR EACH ROW WHEN (NEW."status" = 'PENDING') EXECUTE FUNCTION "Job_notify"();

-- Purpose: rate-limit counters non-negative with a positive window; expiry after window start (§39).
ALTER TABLE "RateLimitBucket"
  DROP CONSTRAINT IF EXISTS "RateLimitBucket_counts_chk",
  ADD CONSTRAINT "RateLimitBucket_counts_chk" CHECK ("count" >= 0 AND "prevCount" >= 0 AND "windowSeconds" > 0),
  DROP CONSTRAINT IF EXISTS "RateLimitBucket_expiry_chk",
  ADD CONSTRAINT "RateLimitBucket_expiry_chk" CHECK ("expiresAt" > "windowStart");

-- Purpose: dotted setting keys; optimistic-concurrency version from 1.
ALTER TABLE "Setting"
  DROP CONSTRAINT IF EXISTS "Setting_key_chk",
  ADD CONSTRAINT "Setting_key_chk" CHECK ("key" ~ '^[A-Za-z0-9_]+(\.[A-Za-z0-9_]+)*$'),
  DROP CONSTRAINT IF EXISTS "Setting_version_chk",
  ADD CONSTRAINT "Setting_version_chk" CHECK ("version" >= 1);

-- Purpose: dotted lower-case metric names (§35).
ALTER TABLE "DailyMetric"
  DROP CONSTRAINT IF EXISTS "DailyMetric_metric_chk",
  ADD CONSTRAINT "DailyMetric_metric_chk" CHECK ("metric" ~ '^[a-z0-9_]+(\.[a-zA-Z0-9_]+)*$');

-- ---------------------------------------------------------------------------------------------------------------------
-- C3.7 Cross-slice track consistency. Triggers rather than composite FKs, so no extra uniques are needed on
-- curriculum tables.
-- ---------------------------------------------------------------------------------------------------------------------
-- Purpose: a student's onboarding track is coherent (§5): qualification offered by the board, target exam session of
-- that qualification, year group of that country.
CREATE OR REPLACE FUNCTION "Student_track_consistency"() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  IF NEW."qualificationId" IS NOT NULL AND NEW."examBoardId" IS NOT NULL AND NOT EXISTS (
       SELECT 1 FROM "Qualification" q WHERE q."id" = NEW."qualificationId" AND q."examBoardId" = NEW."examBoardId") THEN
    RAISE EXCEPTION 'Student %: qualification % is not offered by exam board %', NEW."userId", NEW."qualificationId",
      NEW."examBoardId" USING ERRCODE = 'foreign_key_violation';
  END IF;
  IF NEW."targetExamSessionId" IS NOT NULL AND NEW."qualificationId" IS NOT NULL AND NOT EXISTS (
       SELECT 1 FROM "ExamSession" s WHERE s."id" = NEW."targetExamSessionId" AND s."qualificationId" = NEW."qualificationId") THEN
    RAISE EXCEPTION 'Student %: exam session % is not a session of qualification %', NEW."userId",
      NEW."targetExamSessionId", NEW."qualificationId" USING ERRCODE = 'foreign_key_violation';
  END IF;
  IF NEW."yearGroupId" IS NOT NULL AND NEW."countryId" IS NOT NULL AND NOT EXISTS (
       SELECT 1 FROM "YearGroup" y WHERE y."id" = NEW."yearGroupId" AND y."countryId" = NEW."countryId") THEN
    RAISE EXCEPTION 'Student %: year group % does not belong to country %', NEW."userId", NEW."yearGroupId",
      NEW."countryId" USING ERRCODE = 'foreign_key_violation';
  END IF;
  RETURN NEW;
END
$$;
-- Purpose: attach the student track check to inserts and to updates of the track columns.
CREATE OR REPLACE TRIGGER "Student_track_consistency_trg"
  BEFORE INSERT OR UPDATE OF "countryId", "examBoardId", "qualificationId", "targetExamSessionId", "yearGroupId"
  ON "Student" FOR EACH ROW EXECUTE FUNCTION "Student_track_consistency"();

-- Purpose: a class's subject belongs to the class's qualification (§22, §23).
CREATE OR REPLACE FUNCTION "Class_track_consistency"() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  IF NEW."subjectId" IS NOT NULL AND NEW."qualificationId" IS NOT NULL AND NOT EXISTS (
       SELECT 1 FROM "Subject" s WHERE s."id" = NEW."subjectId" AND s."qualificationId" = NEW."qualificationId") THEN
    RAISE EXCEPTION 'Class %: subject % does not belong to qualification %', NEW."id", NEW."subjectId",
      NEW."qualificationId" USING ERRCODE = 'foreign_key_violation';
  END IF;
  RETURN NEW;
END
$$;
-- Purpose: attach the class track check to inserts and to updates of subject/qualification.
CREATE OR REPLACE TRIGGER "Class_track_consistency_trg"
  BEFORE INSERT OR UPDATE OF "subjectId", "qualificationId"
  ON "Class" FOR EACH ROW EXECUTE FUNCTION "Class_track_consistency"();


-- =====================================================================================================================
-- C4. CROSS-SLICE INTEGRITY: content tenancy (F1, SC-06) and demo-data guard (F16)
-- =====================================================================================================================

-- ---------------------------------------------------------------------------------------------------------------------
-- C4.1 Content tenancy. Tenants: PLATFORM (no owner), SCHOOL (schoolId) and TUTOR (ownerUserId). Rules:
--   * a question's / assessment's tenant is fixed at insert, and structured-question parts share their root's tenant;
--   * QuestionTopic."isPlatform" is derived from the question's tenant (never written by the application);
--   * containers may reference only platform content or content of their own tenant:
--       AssessmentItem -> Question            same tenant as the item's assessment, or platform
--       LessonQuestion / DailyQuestion -> Question                        platform only (lessons/daily are platform)
--       StudyPlanTemplateItem -> Assessment                               platform only (templates are platform)
--       Assignment -> Assessment   platform; or the class's school's test; or (school-less tutor class) a test owned
--                                  by the assigning teacher.
-- ---------------------------------------------------------------------------------------------------------------------
-- Purpose: tenant immutability (Question, Assessment) and part/root tenant equality (Question).
CREATE OR REPLACE FUNCTION content_tenant_immutable() RETURNS trigger LANGUAGE plpgsql AS $$
DECLARE
  v_root_school uuid;
  v_root_owner  uuid;
BEGIN
  IF TG_OP = 'UPDATE' AND (NEW."schoolId", NEW."ownerUserId") IS DISTINCT FROM (OLD."schoolId", OLD."ownerUserId") THEN
    RAISE EXCEPTION '% %: the owning tenant (schoolId / ownerUserId) is fixed at insert', TG_TABLE_NAME, OLD."id"
      USING ERRCODE = 'check_violation';
  END IF;
  IF TG_TABLE_NAME = 'Question' THEN
    IF NEW."parentId" IS NOT NULL THEN
      SELECT p."schoolId", p."ownerUserId" INTO v_root_school, v_root_owner FROM "Question" p WHERE p."id" = NEW."parentId";
      IF FOUND AND (NEW."schoolId", NEW."ownerUserId") IS DISTINCT FROM (v_root_school, v_root_owner) THEN
        RAISE EXCEPTION 'Question part % must have the same owner as its parent %', NEW."id", NEW."parentId"
          USING ERRCODE = 'check_violation';
      END IF;
    END IF;
  END IF;
  RETURN NEW;
END
$$;
-- Purpose: attach to Question (tenant columns and parent).
CREATE OR REPLACE TRIGGER "Question_tenant_guard"
  BEFORE INSERT OR UPDATE OF "schoolId", "ownerUserId", "parentId" ON "Question"
  FOR EACH ROW EXECUTE FUNCTION content_tenant_immutable();
-- Purpose: attach to Assessment (tenant columns).
CREATE OR REPLACE TRIGGER "Assessment_tenant_guard"
  BEFORE UPDATE OF "schoolId", "ownerUserId" ON "Assessment"
  FOR EACH ROW EXECUTE FUNCTION content_tenant_immutable();

-- Purpose: QuestionTopic."isPlatform" mirrors the (immutable) tenant of its question, so the student practice pool index
-- (QuestionTopic_platform_pool_idx) can only ever contain platform-bank questions.
CREATE OR REPLACE FUNCTION question_topic_set_platform() RETURNS trigger LANGUAGE plpgsql AS $$
DECLARE
  v_platform boolean;
BEGIN
  SELECT (q."schoolId" IS NULL AND q."ownerUserId" IS NULL) INTO v_platform FROM "Question" q WHERE q."id" = NEW."questionId";
  NEW."isPlatform" := COALESCE(v_platform, false);
  RETURN NEW;
END
$$;
-- Purpose: attach the derivation (any value the application sends is overwritten).
CREATE OR REPLACE TRIGGER "QuestionTopic_set_platform"
  BEFORE INSERT OR UPDATE OF "questionId", "isPlatform" ON "QuestionTopic"
  FOR EACH ROW EXECUTE FUNCTION question_topic_set_platform();

-- Purpose: cross-tenant reference guard for every container of questions / assessments.
CREATE OR REPLACE FUNCTION content_tenant_guard() RETURNS trigger LANGUAGE plpgsql AS $$
DECLARE
  v_ref_school   uuid;
  v_ref_owner    uuid;
  v_box_school   uuid;
  v_box_owner    uuid;
  v_class_school uuid;
BEGIN
  IF TG_TABLE_NAME IN ('AssessmentItem', 'LessonQuestion', 'DailyQuestion') THEN
    SELECT q."schoolId", q."ownerUserId" INTO v_ref_school, v_ref_owner FROM "Question" q WHERE q."id" = NEW."questionId";
    IF v_ref_school IS NULL AND v_ref_owner IS NULL THEN
      RETURN NEW;  -- platform question (or missing: the FK reports it)
    END IF;
    IF TG_TABLE_NAME = 'AssessmentItem' THEN
      SELECT a."schoolId", a."ownerUserId" INTO v_box_school, v_box_owner
        FROM "AssessmentSection" s JOIN "Assessment" a ON a."id" = s."assessmentId"
       WHERE s."id" = NEW."sectionId";
      IF (v_ref_school IS NOT NULL AND v_ref_school = v_box_school)
         OR (v_ref_owner IS NOT NULL AND v_ref_owner = v_box_owner) THEN
        RETURN NEW;
      END IF;
    END IF;
    RAISE EXCEPTION '%: question % is private to another owner (school %, tutor %)', TG_TABLE_NAME, NEW."questionId",
      v_ref_school, v_ref_owner USING ERRCODE = 'check_violation';
  ELSIF TG_TABLE_NAME = 'StudyPlanTemplateItem' THEN
    IF NEW."assessmentId" IS NULL THEN
      RETURN NEW;
    END IF;
    SELECT a."schoolId", a."ownerUserId" INTO v_ref_school, v_ref_owner FROM "Assessment" a WHERE a."id" = NEW."assessmentId";
    IF v_ref_school IS NULL AND v_ref_owner IS NULL THEN
      RETURN NEW;
    END IF;
    RAISE EXCEPTION 'StudyPlanTemplateItem: assessment % is private; templates use platform assessments only', NEW."assessmentId"
      USING ERRCODE = 'check_violation';
  ELSIF TG_TABLE_NAME = 'Assignment' THEN
    IF NEW."assessmentId" IS NULL THEN
      RETURN NEW;
    END IF;
    SELECT a."schoolId", a."ownerUserId" INTO v_ref_school, v_ref_owner FROM "Assessment" a WHERE a."id" = NEW."assessmentId";
    IF v_ref_school IS NULL AND v_ref_owner IS NULL THEN
      RETURN NEW;
    END IF;
    SELECT c."schoolId" INTO v_class_school FROM "Class" c WHERE c."id" = NEW."classId";
    IF v_ref_school IS NOT NULL AND v_ref_school = v_class_school THEN
      RETURN NEW;
    END IF;
    IF v_ref_owner IS NOT NULL AND v_class_school IS NULL AND v_ref_owner = NEW."createdById" THEN
      RETURN NEW;
    END IF;
    RAISE EXCEPTION 'Assignment: assessment % belongs to another school / tutor than class %', NEW."assessmentId", NEW."classId"
      USING ERRCODE = 'check_violation';
  END IF;
  RETURN NEW;
END
$$;
-- Purpose: attach the tenant guard to every container.
CREATE OR REPLACE TRIGGER "AssessmentItem_tenant_guard"
  BEFORE INSERT OR UPDATE OF "questionId", "sectionId" ON "AssessmentItem"
  FOR EACH ROW EXECUTE FUNCTION content_tenant_guard();
CREATE OR REPLACE TRIGGER "LessonQuestion_tenant_guard"
  BEFORE INSERT OR UPDATE OF "questionId" ON "LessonQuestion"
  FOR EACH ROW EXECUTE FUNCTION content_tenant_guard();
CREATE OR REPLACE TRIGGER "DailyQuestion_tenant_guard"
  BEFORE INSERT OR UPDATE OF "questionId" ON "DailyQuestion"
  FOR EACH ROW EXECUTE FUNCTION content_tenant_guard();
CREATE OR REPLACE TRIGGER "StudyPlanTemplateItem_tenant_guard"
  BEFORE INSERT OR UPDATE OF "assessmentId" ON "StudyPlanTemplateItem"
  FOR EACH ROW EXECUTE FUNCTION content_tenant_guard();
CREATE OR REPLACE TRIGGER "Assignment_tenant_guard"
  BEFORE INSERT OR UPDATE OF "assessmentId", "classId", "createdById" ON "Assignment"
  FOR EACH ROW EXECUTE FUNCTION content_tenant_guard();

-- ---------------------------------------------------------------------------------------------------------------------
-- C4.2 Demo data never reaches production (F16; §50, rule 6). With the database default app.environment = 'production'
-- (section D) any write of isDemo = true fails, so a dev seed run against the wrong database aborts instead of
-- publishing fake exam dates, prices, testimonials or accounts.
-- ---------------------------------------------------------------------------------------------------------------------
-- Purpose: the guard function.
CREATE OR REPLACE FUNCTION forbid_demo_in_production() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  IF NEW."isDemo" AND current_setting('app.environment', true) = 'production' THEN
    RAISE EXCEPTION 'Demo data (%."isDemo" = true) cannot be written in production (§50, rule 6)', TG_TABLE_NAME
      USING ERRCODE = 'check_violation';
  END IF;
  RETURN NEW;
END
$$;
-- Purpose: attach the guard to every table that has an isDemo column.
DO $$
DECLARE
  t text;
BEGIN
  FOREACH t IN ARRAY ARRAY['Subject', 'Syllabus', 'ExamSession', 'GradeScheme', 'ContentSource', 'MediaAsset', 'Lesson',
                           'Question', 'Flashcard', 'Assessment', 'StudyPack', 'StudyPlanTemplate', 'Testimonial',
                           'FaqItem', 'Achievement', 'User', 'School', 'Announcement', 'Plan', 'PlanPrice', 'PromoCode'] LOOP
    EXECUTE format('CREATE OR REPLACE TRIGGER %I BEFORE INSERT OR UPDATE OF "isDemo" ON %I '
                   'FOR EACH ROW WHEN (NEW."isDemo") EXECUTE FUNCTION forbid_demo_in_production()',
                   t || '_no_demo_in_production', t);
  END LOOP;
END
$$;


