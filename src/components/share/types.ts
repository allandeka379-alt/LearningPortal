import type { ActionResult } from "@/server/lib/errors";

/** Who appears on a share card (never a surname): nothing, first name only, or the public username. */
export type ShareNameChoice = "NONE" | "FIRST_NAME" | "USERNAME";

/** What a share button asks the server to share (validated again by the sharing service). */
export type ShareRequest =
  | { kind: "MOCK_SCORE" | "TEST_SCORE"; attemptId: string; nameMode?: ShareNameChoice }
  | { kind: "STREAK"; nameMode?: ShareNameChoice }
  | { kind: "MASTERY"; subjectId?: string; nameMode?: ShareNameChoice }
  | { kind: "ACHIEVEMENT"; achievementId: string; nameMode?: ShareNameChoice };

/** A created (or renewed) share link: shown once, because only its hash is stored. */
export interface ShareLinkData {
  shareId: string;
  url: string;
  headline: string;
  /** Prefilled message for WhatsApp / the native share sheet. */
  message: string;
  whatsappHref: string;
  /** ISO timestamp. */
  expiresAt: string;
}

export type CreateShareAction = (request: ShareRequest) => Promise<ActionResult<ShareLinkData>>;
export type RenewShareAction = (shareId: string) => Promise<ActionResult<ShareLinkData>>;
export type RevokeShareAction = (shareId: string) => Promise<ActionResult<{ message: string }>>;
