/**
 * Curriculum CATALOGUE seed data (structure only — no syllabus content).
 *
 * §4: "The architecture should support the complete catalogue, while actual curriculum content must be populated
 * from authoritative syllabus information." This file therefore only names boards, qualifications and subjects.
 * It never invents topics, syllabus wording, papers or grade thresholds.
 *
 * Verification policy:
 * - `verified: false` on every subject: the content team must confirm each entry (name, code, availability for the
 *   current exam year) against the board's official subject list before it is published to students.
 * - Cambridge syllabus codes are included where they are widely published; ZIMSEC codes are left null on purpose
 *   because they changed with the curriculum reforms and must be entered from the official ZIMSEC list.
 * - Grade bands are ESTIMATES for practice feedback only (official thresholds vary by paper and session).
 */

export type CatalogueCountry = { code: string; name: string; defaultTimezone: string; defaultCurrency: string };

export type CatalogueBoard = {
  slug: string;
  shortName: string;
  name: string;
  /** null = international board available in several countries */
  countryCode: string | null;
  availableInCountryCodes: string[];
  website: string;
  description: string;
};

export type CatalogueQualification = {
  boardSlug: string;
  slug: string;
  name: string;
  shortName: string;
  /** Cross-board grouping used by onboarding ("O-Level" groups ZIMSEC O-Level + Cambridge IGCSE). */
  levelKey: "o-level" | "a-level";
  levelName: string;
  /** Year/form labels shown in onboarding (§5). */
  yearLabels: string[];
  description: string;
};

export type CatalogueCategory = { slug: string; name: string; sortOrder: number };

export type CatalogueSubject = {
  qualificationSlug: string; // within the board
  boardSlug: string;
  slug: string;
  name: string;
  categorySlug: string;
  code: string | null;
  verified: false;
  note?: string;
};

export type CatalogueGradeBand = { grade: string; minPercent: number };
export type CatalogueGradeScheme = {
  boardSlug: string;
  qualificationSlug: string;
  name: string;
  passGrade: string;
  bands: CatalogueGradeBand[];
  isEstimate: true;
  note: string;
};

export type CatalogueExamSeries = {
  boardSlug: string;
  qualificationSlug: string;
  /** Series template; concrete ExamSession rows (with provisional dates) are created per year in the dev seed. */
  seriesCode: string;
  label: string;
  /** Typical month the written exams start — used only to create PROVISIONAL dev sessions. */
  typicalStartMonth: number;
  typicalEndMonth: number;
};

export const COUNTRIES: CatalogueCountry[] = [
  { code: "ZW", name: "Zimbabwe", defaultTimezone: "Africa/Harare", defaultCurrency: "USD" },
];

export const BOARDS: CatalogueBoard[] = [
  {
    slug: "zimsec",
    shortName: "ZIMSEC",
    name: "Zimbabwe School Examinations Council",
    countryCode: "ZW",
    availableInCountryCodes: ["ZW"],
    website: "https://www.zimsec.co.zw",
    description: "The national examinations board for Zimbabwe, setting O-Level and A-Level examinations.",
  },
  {
    slug: "cambridge",
    shortName: "Cambridge",
    name: "Cambridge International Education",
    countryCode: null,
    availableInCountryCodes: ["ZW"],
    website: "https://www.cambridgeinternational.org",
    description: "International qualifications including Cambridge IGCSE and Cambridge International AS & A Level.",
  },
];

export const QUALIFICATIONS: CatalogueQualification[] = [
  {
    boardSlug: "zimsec",
    slug: "o-level",
    name: "ZIMSEC Ordinary Level",
    shortName: "O-Level",
    levelKey: "o-level",
    levelName: "O-Level",
    yearLabels: ["Form 1", "Form 2", "Form 3", "Form 4"],
    description: "ZIMSEC O-Level, usually examined at the end of Form 4.",
  },
  {
    boardSlug: "zimsec",
    slug: "a-level",
    name: "ZIMSEC Advanced Level",
    shortName: "A-Level",
    levelKey: "a-level",
    levelName: "A-Level",
    yearLabels: ["Lower Sixth (Form 5)", "Upper Sixth (Form 6)"],
    description: "ZIMSEC A-Level, usually examined at the end of Upper Sixth.",
  },
  {
    boardSlug: "cambridge",
    slug: "igcse",
    name: "Cambridge IGCSE",
    shortName: "IGCSE",
    levelKey: "o-level",
    levelName: "O-Level / IGCSE",
    yearLabels: ["Year 9 / Form 3", "Year 10 / Form 3", "Year 11 / Form 4"],
    description: "Cambridge International General Certificate of Secondary Education.",
  },
  {
    boardSlug: "cambridge",
    slug: "a-level",
    name: "Cambridge International AS & A Level",
    shortName: "AS & A Level",
    levelKey: "a-level",
    levelName: "A-Level",
    yearLabels: ["AS (Year 12 / Lower Sixth)", "A Level (Year 13 / Upper Sixth)"],
    description:
      "Cambridge International AS Level and A Level. Most syllabuses cover both: AS is the first half of the full A Level.",
  },
];

export const SUBJECT_CATEGORIES: CatalogueCategory[] = [
  { slug: "mathematics", name: "Mathematics", sortOrder: 1 },
  { slug: "sciences", name: "Sciences", sortOrder: 2 },
  { slug: "commercials", name: "Commercials", sortOrder: 3 },
  { slug: "humanities", name: "Humanities", sortOrder: 4 },
  { slug: "languages", name: "Languages", sortOrder: 5 },
  { slug: "technical-practical", name: "Technical & Practical", sortOrder: 6 },
];

type S = [slug: string, name: string, category: string, code: string | null, note?: string];

function subjects(boardSlug: string, qualificationSlug: string, rows: S[]): CatalogueSubject[] {
  return rows.map(([slug, name, categorySlug, code, note]) => ({
    boardSlug,
    qualificationSlug,
    slug,
    name,
    categorySlug,
    code,
    verified: false,
    ...(note ? { note } : {}),
  }));
}

const ZIMSEC_O: S[] = [
  ["mathematics", "Mathematics", "mathematics", null],
  ["additional-mathematics", "Additional Mathematics", "mathematics", null],
  ["statistics", "Statistics", "mathematics", null],
  ["combined-science", "Combined Science", "sciences", null],
  ["biology", "Biology", "sciences", null],
  ["chemistry", "Chemistry", "sciences", null],
  ["physics", "Physics", "sciences", null],
  ["computer-science", "Computer Science", "sciences", null],
  ["agriculture", "Agriculture", "sciences", null],
  ["accounting", "Principles of Accounting", "commercials", null],
  ["business-studies", "Business Enterprise and Skills", "commercials", null, "Confirm current ZIMSEC title."],
  ["economics", "Economics", "commercials", null],
  ["commerce", "Commerce", "commercials", null],
  ["geography", "Geography", "humanities", null],
  ["history", "History", "humanities", null],
  ["heritage-studies", "Heritage Studies", "humanities", null],
  ["religious-studies", "Family and Religious Studies", "humanities", null],
  ["sociology", "Sociology", "humanities", null, "Confirm availability at O-Level."],
  ["english-language", "English Language", "languages", null],
  ["english-literature", "Literature in English", "languages", null],
  ["shona", "Shona", "languages", null],
  ["ndebele", "Ndebele", "languages", null],
  ["french", "French", "languages", null],
  ["technical-graphics", "Technical Graphics", "technical-practical", null],
  ["design-technology", "Design and Technology", "technical-practical", null, "Confirm current ZIMSEC title."],
  ["food-nutrition", "Food Technology and Design", "technical-practical", null, "Confirm current ZIMSEC title."],
  ["art", "Art", "technical-practical", null],
  ["music", "Music", "technical-practical", null],
  ["physical-education", "Physical Education", "technical-practical", null],
];

const ZIMSEC_A: S[] = [
  ["pure-mathematics", "Pure Mathematics", "mathematics", null],
  ["further-mathematics", "Further Mathematics", "mathematics", null],
  ["statistics", "Statistics", "mathematics", null],
  ["mechanics", "Mechanics", "mathematics", null, "Confirm whether examined as a separate subject or a component."],
  ["biology", "Biology", "sciences", null],
  ["chemistry", "Chemistry", "sciences", null],
  ["physics", "Physics", "sciences", null],
  ["computer-science", "Computer Science", "sciences", null],
  ["agriculture", "Agriculture", "sciences", null],
  ["accounting", "Accounting", "commercials", null],
  ["business-studies", "Business Studies", "commercials", null, "Confirm current ZIMSEC title."],
  ["business-enterprise-skills", "Business Enterprise and Skills", "commercials", null, "Confirm current ZIMSEC title."],
  ["economics", "Economics", "commercials", null],
  ["geography", "Geography", "humanities", null],
  ["history", "History", "humanities", null],
  ["sociology", "Sociology", "humanities", null],
  ["religious-studies", "Family and Religious Studies", "humanities", null],
  ["heritage-studies", "Heritage Studies", "humanities", null, "Confirm availability at A-Level."],
  ["english-literature", "Literature in English", "languages", null],
  ["shona", "Shona", "languages", null],
  ["ndebele", "Ndebele", "languages", null],
  ["french", "French", "languages", null],
  ["technical-graphics", "Technical Graphics", "technical-practical", null],
  ["design-technology", "Design and Technology", "technical-practical", null],
  ["food-nutrition", "Food Science", "technical-practical", null, "Confirm current ZIMSEC title."],
  ["art", "Art", "technical-practical", null],
  ["music", "Music", "technical-practical", null],
  ["physical-education", "Sport Science", "technical-practical", null, "Confirm current ZIMSEC title."],
];

const CAMBRIDGE_IGCSE: S[] = [
  ["mathematics", "Mathematics", "mathematics", "0580"],
  ["additional-mathematics", "Additional Mathematics", "mathematics", "0606"],
  ["biology", "Biology", "sciences", "0610"],
  ["chemistry", "Chemistry", "sciences", "0620"],
  ["physics", "Physics", "sciences", "0625"],
  ["computer-science", "Computer Science", "sciences", "0478"],
  ["ict", "Information and Communication Technology", "sciences", "0417"],
  ["agriculture", "Agriculture", "sciences", "0600"],
  ["environmental-management", "Environmental Management", "sciences", "0680"],
  ["accounting", "Accounting", "commercials", "0452"],
  ["business-studies", "Business Studies", "commercials", "0450"],
  ["economics", "Economics", "commercials", "0455"],
  ["enterprise", "Enterprise", "commercials", "0454"],
  ["geography", "Geography", "humanities", "0460"],
  ["history", "History", "humanities", "0470"],
  ["sociology", "Sociology", "humanities", "0495"],
  ["religious-studies", "Religious Studies", "humanities", "0490"],
  ["english-language", "English – First Language", "languages", "0500"],
  ["english-second-language", "English as a Second Language", "languages", "0510"],
  ["english-literature", "Literature in English", "languages", "0475"],
  ["french", "French – Foreign Language", "languages", "0520"],
  ["design-technology", "Design and Technology", "technical-practical", "0445"],
  ["food-nutrition", "Food and Nutrition", "technical-practical", "0648"],
  ["art", "Art and Design", "technical-practical", "0400"],
  ["music", "Music", "technical-practical", "0410"],
  ["physical-education", "Physical Education", "technical-practical", "0413"],
];

const CAMBRIDGE_A: S[] = [
  [
    "mathematics",
    "Mathematics",
    "mathematics",
    "9709",
    "Covers Pure Mathematics, Mechanics and Probability & Statistics components.",
  ],
  ["further-mathematics", "Further Mathematics", "mathematics", "9231"],
  ["biology", "Biology", "sciences", "9700"],
  ["chemistry", "Chemistry", "sciences", "9701"],
  ["physics", "Physics", "sciences", "9702"],
  ["computer-science", "Computer Science", "sciences", "9618"],
  ["information-technology", "Information Technology", "sciences", "9626"],
  ["environmental-management", "Environmental Management", "sciences", "8291", "AS Level only."],
  ["accounting", "Accounting", "commercials", "9706"],
  ["business", "Business", "commercials", "9609"],
  ["economics", "Economics", "commercials", "9708"],
  ["geography", "Geography", "humanities", "9696"],
  ["history", "History", "humanities", "9489"],
  ["sociology", "Sociology", "humanities", "9699"],
  ["psychology", "Psychology", "humanities", "9990"],
  ["divinity", "Divinity", "humanities", "9011"],
  ["english-language", "English Language", "languages", "9093"],
  ["english-literature", "Literature in English", "languages", "9695"],
  ["french", "French Language & Literature", "languages", "9898"],
  ["design-technology", "Design and Technology", "technical-practical", "9705"],
  ["art", "Art and Design", "technical-practical", "9479"],
  ["music", "Music", "technical-practical", "9483"],
  ["physical-education", "Physical Education", "technical-practical", "9396"],
];

export const SUBJECTS: CatalogueSubject[] = [
  ...subjects("zimsec", "o-level", ZIMSEC_O),
  ...subjects("zimsec", "a-level", ZIMSEC_A),
  ...subjects("cambridge", "igcse", CAMBRIDGE_IGCSE),
  ...subjects("cambridge", "a-level", CAMBRIDGE_A),
];

const ESTIMATE_NOTE =
  "Estimated bands used only to give practice feedback. They are not official thresholds, which vary by paper and session. Admins can edit them.";

export const GRADE_SCHEMES: CatalogueGradeScheme[] = [
  {
    boardSlug: "zimsec",
    qualificationSlug: "o-level",
    name: "ZIMSEC O-Level (estimated)",
    passGrade: "C",
    bands: [
      { grade: "A", minPercent: 75 },
      { grade: "B", minPercent: 65 },
      { grade: "C", minPercent: 50 },
      { grade: "D", minPercent: 40 },
      { grade: "E", minPercent: 30 },
      { grade: "U", minPercent: 0 },
    ],
    isEstimate: true,
    note: ESTIMATE_NOTE,
  },
  {
    boardSlug: "zimsec",
    qualificationSlug: "a-level",
    name: "ZIMSEC A-Level (estimated)",
    passGrade: "E",
    bands: [
      { grade: "A", minPercent: 75 },
      { grade: "B", minPercent: 65 },
      { grade: "C", minPercent: 55 },
      { grade: "D", minPercent: 45 },
      { grade: "E", minPercent: 40 },
      { grade: "O", minPercent: 30 },
      { grade: "F", minPercent: 0 },
    ],
    isEstimate: true,
    note: ESTIMATE_NOTE,
  },
  {
    boardSlug: "cambridge",
    qualificationSlug: "igcse",
    name: "Cambridge IGCSE A*–G (estimated)",
    passGrade: "C",
    bands: [
      { grade: "A*", minPercent: 90 },
      { grade: "A", minPercent: 80 },
      { grade: "B", minPercent: 70 },
      { grade: "C", minPercent: 60 },
      { grade: "D", minPercent: 50 },
      { grade: "E", minPercent: 40 },
      { grade: "F", minPercent: 30 },
      { grade: "G", minPercent: 20 },
      { grade: "U", minPercent: 0 },
    ],
    isEstimate: true,
    note: ESTIMATE_NOTE,
  },
  {
    boardSlug: "cambridge",
    qualificationSlug: "a-level",
    name: "Cambridge AS & A Level (estimated)",
    passGrade: "E",
    bands: [
      { grade: "A*", minPercent: 90 },
      { grade: "A", minPercent: 80 },
      { grade: "B", minPercent: 70 },
      { grade: "C", minPercent: 60 },
      { grade: "D", minPercent: 50 },
      { grade: "E", minPercent: 40 },
      { grade: "U", minPercent: 0 },
    ],
    isEstimate: true,
    note: ESTIMATE_NOTE,
  },
];

export const EXAM_SERIES: CatalogueExamSeries[] = [
  { boardSlug: "zimsec", qualificationSlug: "o-level", seriesCode: "NOV", label: "November", typicalStartMonth: 10, typicalEndMonth: 12 },
  { boardSlug: "zimsec", qualificationSlug: "o-level", seriesCode: "JUN", label: "June", typicalStartMonth: 6, typicalEndMonth: 6 },
  { boardSlug: "zimsec", qualificationSlug: "a-level", seriesCode: "NOV", label: "November", typicalStartMonth: 10, typicalEndMonth: 12 },
  { boardSlug: "cambridge", qualificationSlug: "igcse", seriesCode: "MJ", label: "May/June", typicalStartMonth: 4, typicalEndMonth: 6 },
  { boardSlug: "cambridge", qualificationSlug: "igcse", seriesCode: "ON", label: "October/November", typicalStartMonth: 10, typicalEndMonth: 11 },
  { boardSlug: "cambridge", qualificationSlug: "a-level", seriesCode: "MJ", label: "May/June", typicalStartMonth: 4, typicalEndMonth: 6 },
  { boardSlug: "cambridge", qualificationSlug: "a-level", seriesCode: "ON", label: "October/November", typicalStartMonth: 10, typicalEndMonth: 11 },
];
