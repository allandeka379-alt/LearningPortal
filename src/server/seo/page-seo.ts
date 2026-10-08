import type { Metadata } from "next";
import type { GuidePage } from "./guides";
import { buildPageMetadata, type SocialImage } from "./metadata";
import type { BoardPageData, QualificationPageData, SubjectPageData, TopicPageData } from "./pages";
import { absoluteUrl, boardPath, qualificationPath, subjectPath } from "./routing";
import {
  articleJsonLd,
  boardOrganization,
  breadcrumbListJsonLd,
  collectionPageJsonLd,
  courseJsonLd,
  learningResourceJsonLd,
  siteOrganization,
  type JsonLd,
} from "./structured-data";
import {
  boardTitle,
  describeBoard,
  describeQualification,
  describeSubject,
  describeTopic,
  guideTitle,
  metaDescription,
  qualificationLabel,
  qualificationTitle,
  subjectTitle,
  topicTitle,
  withBrand,
} from "./text";

/**
 * Per-page SEO of the public curriculum routes: breadcrumbs (UI + BreadcrumbList), `generateMetadata` output and
 * JSON-LD, all derived from the loaded page data. Pure (the routes pass `APP_NAME` and `APP_URL`).
 */

export interface SiteContext {
  appName: string;
  /** Public origin without a trailing slash (`getEnv().APP_URL`). */
  appUrl: string;
  /** Site-wide social card image, when the site provides one. */
  image?: SocialImage | null;
}

/** One breadcrumb: `href` is app-relative; the last crumb is the current page. */
export interface PageCrumb {
  label: string;
  href: string;
}

const HOME: PageCrumb = { label: "Home", href: "/" };

/** UI breadcrumbs: every crumb links except the current page. */
export function toBreadcrumbItems(crumbs: readonly PageCrumb[]): { label: string; href?: string }[] {
  return crumbs.map((crumb, index) => (index === crumbs.length - 1 ? { label: crumb.label } : { label: crumb.label, href: crumb.href }));
}

function breadcrumbJsonLd(crumbs: readonly PageCrumb[], site: SiteContext): JsonLd {
  return breadcrumbListJsonLd(crumbs.map((crumb) => ({ name: crumb.label, url: absoluteUrl(site.appUrl, crumb.href) })));
}

// ---------------------------------------------------------------------------------------------------------------------
// Board
// ---------------------------------------------------------------------------------------------------------------------

export function boardCrumbs(data: BoardPageData): PageCrumb[] {
  return [HOME, { label: data.board.shortName, href: boardPath(data.board.slug) }];
}

function boardDescription(data: BoardPageData): string {
  const names = data.levels.flatMap((group) => group.qualifications.map((q) => q.label));
  return metaDescription(data.board.metaDescription, data.summaryText, describeBoard(data.board, names));
}

export function boardMetadata(data: BoardPageData, site: SiteContext): Metadata {
  const title = boardTitle(data.board);
  return buildPageMetadata({
    title: withBrand(title, site.appName),
    socialTitle: title,
    description: boardDescription(data),
    path: data.canonicalPath,
    appName: site.appName,
    image: site.image ?? null,
  });
}

export function boardJsonLd(data: BoardPageData, site: SiteContext): JsonLd[] {
  return [
    collectionPageJsonLd({
      name: boardTitle(data.board),
      description: boardDescription(data),
      url: absoluteUrl(site.appUrl, data.canonicalPath),
      about: boardOrganization(data.board),
      publisher: siteOrganization(site.appName, site.appUrl),
      items: data.levels.flatMap((group) => group.qualifications.map((q) => ({ name: q.label, url: absoluteUrl(site.appUrl, q.href) }))),
    }),
    breadcrumbJsonLd(boardCrumbs(data), site),
  ];
}

// ---------------------------------------------------------------------------------------------------------------------
// Qualification
// ---------------------------------------------------------------------------------------------------------------------

export function qualificationCrumbs(data: QualificationPageData): PageCrumb[] {
  const { board, qualification } = data.path;
  return [
    HOME,
    { label: board.shortName, href: boardPath(board.slug) },
    { label: qualification.shortName, href: qualificationPath(board.slug, qualification.slug) },
  ];
}

function qualificationDescription(data: QualificationPageData): string {
  const { qualification } = data.path;
  return metaDescription(qualification.metaDescription, data.summaryText, describeQualification(data.label));
}

export function qualificationMetadata(data: QualificationPageData, site: SiteContext): Metadata {
  const title = qualificationTitle(data.label, data.path.qualification);
  return buildPageMetadata({
    title: withBrand(title, site.appName),
    socialTitle: title,
    description: qualificationDescription(data),
    path: data.canonicalPath,
    appName: site.appName,
    image: site.image ?? null,
  });
}

export function qualificationJsonLd(data: QualificationPageData, site: SiteContext): JsonLd[] {
  return [
    collectionPageJsonLd({
      name: qualificationTitle(data.label, data.path.qualification),
      description: qualificationDescription(data),
      url: absoluteUrl(site.appUrl, data.canonicalPath),
      about: boardOrganization(data.path.board),
      publisher: siteOrganization(site.appName, site.appUrl),
      items: data.categories.flatMap((group) => group.subjects.map((s) => ({ name: `${data.label} ${s.name}`, url: absoluteUrl(site.appUrl, s.href) }))),
    }),
    breadcrumbJsonLd(qualificationCrumbs(data), site),
  ];
}

// ---------------------------------------------------------------------------------------------------------------------
// Subject
// ---------------------------------------------------------------------------------------------------------------------

export function subjectCrumbs(data: Pick<SubjectPageData, "path">): PageCrumb[] {
  const { board, qualification, subject } = data.path;
  return [
    HOME,
    { label: board.shortName, href: boardPath(board.slug) },
    { label: qualification.shortName, href: qualificationPath(board.slug, qualification.slug) },
    { label: subject.name, href: subjectPath(board.slug, qualification.slug, subject.slug) },
  ];
}

function subjectDescription(data: SubjectPageData): string {
  const { subject } = data.path;
  return metaDescription(subject.metaDescription, data.summaryText, describeSubject(data.label, subject));
}

/** Subjects without a published syllabus version yet are honest but thin "coming soon" pages: noindex, follow. */
export function isSubjectIndexable(data: SubjectPageData): boolean {
  return data.path.syllabus !== null && !data.path.syllabus.isDemo;
}

export function subjectMetadata(data: SubjectPageData, site: SiteContext): Metadata {
  const title = subjectTitle(data.label, data.path.subject);
  return buildPageMetadata({
    title: withBrand(title, site.appName),
    socialTitle: title,
    description: subjectDescription(data),
    path: data.canonicalPath,
    appName: site.appName,
    image: site.image ?? null,
    noIndex: !isSubjectIndexable(data),
  });
}

export function subjectJsonLd(data: SubjectPageData, site: SiteContext): JsonLd[] {
  const { board, subject, syllabus } = data.path;
  return [
    courseJsonLd({
      name: data.fullName,
      description: subjectDescription(data),
      url: absoluteUrl(site.appUrl, data.canonicalPath),
      provider: siteOrganization(site.appName, site.appUrl),
      courseCode: syllabus?.code ?? subject.officialCode,
      educationalLevel: data.label,
      inLanguage: subject.languageCode,
      teaches: data.topicNames,
      about: boardOrganization(board),
    }),
    breadcrumbJsonLd(subjectCrumbs(data), site),
  ];
}

// ---------------------------------------------------------------------------------------------------------------------
// Topic
// ---------------------------------------------------------------------------------------------------------------------

export function topicCrumbs(data: TopicPageData): PageCrumb[] {
  return [
    ...subjectCrumbs(data),
    ...data.ancestors.map((ancestor) => ({ label: ancestor.name, href: ancestor.href })),
    { label: data.path.topic.topic.name, href: data.canonicalPath },
  ];
}

function topicDescription(data: TopicPageData): string {
  const { topic } = data.path.topic;
  return metaDescription(topic.metaDescription, data.summaryText, describeTopic(data.label, data.path.subject.name, topic.name));
}

export function topicMetadata(data: TopicPageData, site: SiteContext): Metadata {
  const { topic } = data.path.topic;
  const title = topicTitle(data.label, data.path.subject.name, topic);
  return buildPageMetadata({
    title: withBrand(title, site.appName),
    socialTitle: title,
    description: topicDescription(data),
    path: data.canonicalPath,
    appName: site.appName,
    image: site.image ?? null,
    noIndex: data.path.syllabus.isDemo,
  });
}

export function topicJsonLd(data: TopicPageData, site: SiteContext): JsonLd[] {
  const { topic } = data.path.topic;
  return [
    learningResourceJsonLd({
      name: topicTitle(data.label, data.path.subject.name, { name: topic.name, metaTitle: null }),
      description: topicDescription(data),
      url: absoluteUrl(site.appUrl, data.canonicalPath),
      educationalLevel: data.label,
      inLanguage: data.path.subject.languageCode,
      teaches: data.objectives.map((objective) => objective.statement),
      course: { name: data.fullName, url: absoluteUrl(site.appUrl, data.subjectHref) },
      publisher: siteOrganization(site.appName, site.appUrl),
    }),
    breadcrumbJsonLd(topicCrumbs(data), site),
  ];
}

// ---------------------------------------------------------------------------------------------------------------------
// Guide
// ---------------------------------------------------------------------------------------------------------------------

/** UI copy for a general guide's scope (no board, qualification or subject). */
export const GENERAL_GUIDE_SCOPE_LABEL = "Study skills";

/** "ZIMSEC O-Level Mathematics", "ZIMSEC O-Level", "ZIMSEC" or (general guide) "Study skills": where the guide lives. */
export function guideScopeLabel(data: GuidePage): string {
  if (!data.path) return GENERAL_GUIDE_SCOPE_LABEL;
  const { board, qualification, subject } = data.path;
  if (!qualification) return board.shortName;
  const label = qualificationLabel(board.shortName, qualification.shortName);
  return subject ? `${label} ${subject.name}` : label;
}

export function guideCrumbs(data: GuidePage): PageCrumb[] {
  if (!data.path) return [HOME, { label: data.lesson.title, href: data.canonicalPath }];
  const { board, qualification, subject } = data.path;
  const crumbs: PageCrumb[] = [HOME, { label: board.shortName, href: boardPath(board.slug) }];
  if (qualification) crumbs.push({ label: qualification.shortName, href: qualificationPath(board.slug, qualification.slug) });
  if (qualification && subject) crumbs.push({ label: subject.name, href: subjectPath(board.slug, qualification.slug, subject.slug) });
  crumbs.push({ label: data.lesson.title, href: data.canonicalPath });
  return crumbs;
}

function guideDescription(data: GuidePage): string {
  return metaDescription(data.lesson.metaDescription, data.lesson.summary, data.excerpt);
}

export function guideMetadata(data: GuidePage, site: SiteContext): Metadata {
  const title = guideTitle(guideScopeLabel(data), data.lesson);
  return buildPageMetadata({
    title: withBrand(title, site.appName),
    socialTitle: data.lesson.title,
    description: guideDescription(data),
    path: data.canonicalPath,
    appName: site.appName,
    image: site.image ?? null,
    type: "article",
    publishedTime: data.lesson.publishedAt,
    modifiedTime: data.lesson.updatedAt,
    noIndex: data.lesson.isDemo,
  });
}

export function guideJsonLd(data: GuidePage, site: SiteContext): JsonLd[] {
  return [
    articleJsonLd({
      headline: data.lesson.title,
      description: guideDescription(data),
      url: absoluteUrl(site.appUrl, data.canonicalPath),
      inLanguage: data.lesson.languageCode,
      publisher: siteOrganization(site.appName, site.appUrl),
      author: data.lesson.author,
      datePublished: data.lesson.publishedAt,
      dateModified: data.lesson.updatedAt,
    }),
    breadcrumbJsonLd(guideCrumbs(data), site),
  ];
}
