import { z } from "zod";
import { CONTENT_STATUSES, provenanceSchema, refineProvenance } from "../lessons/schemas";
import { MAX_CARD_SIDE_LENGTH } from "./paste";

/** Validation for platform flashcard authoring (§18 card types, §27 licensing). */

export const FLASHCARD_TYPES = ["DEFINITION", "FORMULA", "VOCABULARY", "CONCEPT", "DATE", "FACT"] as const;
export const FLASHCARD_ACCESS_TIERS = ["PREMIUM", "FREE", "PUBLIC"] as const;

const side = (label: string) =>
  z.preprocess(
    (value) => (typeof value === "string" ? value.replace(/\r\n/g, "\n").trim() : value ?? ""),
    z.string().min(1, `Write the ${label} of the card.`).max(MAX_CARD_SIDE_LENGTH, `Keep the ${label} under ${MAX_CARD_SIDE_LENGTH.toLocaleString("en")} characters.`),
  );

const optionalNotes = z.preprocess(
  (value) => (typeof value === "string" ? (value.trim() === "" ? null : value.replace(/\r\n/g, "\n").trim()) : value ?? null),
  z.string().max(MAX_CARD_SIDE_LENGTH, "Keep the notes shorter.").nullable(),
);

const optionalUuid = (message: string) =>
  z.preprocess((value) => (typeof value === "string" && value.trim() === "" ? null : value ?? null), z.uuid(message).nullable());

const uuidList = (max: number, message: string) =>
  z.preprocess(
    (value) => (value === undefined || value === null ? [] : Array.isArray(value) ? value.filter((v) => v !== "") : [value]),
    z.array(z.uuid("Choose valid items.")).max(max, message),
  );

const languageCode = z.preprocess(
  (v) => (typeof v === "string" && v.trim() !== "" ? v.trim() : "en"),
  z.string().regex(/^[a-z]{2,3}(-[A-Za-z0-9]{2,8})*$/, "Use a language code such as en, sn or nd.").max(10),
);

export const createFlashcardSchema = z
  .object({
    subjectId: z.uuid("Choose a subject."),
    cardType: z.enum(FLASHCARD_TYPES, { message: "Choose the card type." }),
    front: side("front"),
    back: side("back"),
    notes: optionalNotes,
    accessTier: z.enum(FLASHCARD_ACCESS_TIERS).default("PREMIUM"),
    languageCode,
    topicIds: uuidList(20, "Tag at most 20 topics."),
    primaryTopicId: optionalUuid("Choose the primary topic."),
  })
  .and(provenanceSchema)
  .superRefine((value, ctx) => {
    if (value.primaryTopicId && !value.topicIds.map((id) => id.toLowerCase()).includes(value.primaryTopicId.toLowerCase())) {
      ctx.addIssue({ code: "custom", path: ["primaryTopicId"], message: "The primary topic must be one of the tagged topics." });
    }
    refineProvenance(value, ctx);
  });

export const saveFlashcardSchema = z
  .object({
    id: z.uuid("Choose a valid flashcard."),
    expectedUpdatedAt: z.preprocess((v) => (v === "" ? undefined : v), z.iso.datetime({ offset: true }).optional()),
  })
  .and(createFlashcardSchema);

export type SaveFlashcardInput = z.infer<typeof saveFlashcardSchema>;

export const bulkFlashcardSchema = z
  .object({
    subjectId: z.uuid("Choose a subject."),
    cardType: z.enum(FLASHCARD_TYPES, { message: "Choose the card type." }),
    accessTier: z.enum(FLASHCARD_ACCESS_TIERS).default("PREMIUM"),
    languageCode,
    primaryTopicId: optionalUuid("Choose a topic."),
    text: z.string({ message: "Paste the cards." }).min(1, "Paste the cards.").max(1_000_000, "The paste is too long."),
    /** "preview" validates and renders without saving; "create" saves the drafts. */
    intent: z.enum(["preview", "create"]).default("preview"),
  })
  .and(provenanceSchema)
  .superRefine((value, ctx) => refineProvenance(value, ctx));

export const flashcardFilterSchema = z.object({
  q: z.string().trim().max(200).optional(),
  subjectId: z.uuid().optional(),
  syllabusId: z.uuid().optional(),
  topicId: z.uuid().optional(),
  status: z.enum(CONTENT_STATUSES).optional(),
  cardType: z.enum(FLASHCARD_TYPES).optional(),
  ai: z.enum(["yes", "no"]).optional(),
  authorId: z.uuid().optional(),
  cursor: z.string().max(500).optional(),
  limit: z.coerce.number().int().min(1).max(100).default(25),
});
