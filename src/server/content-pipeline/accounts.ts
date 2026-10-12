import "server-only";
import type { Role } from "@/generated/prisma/client";
import { hasPermission } from "@/server/auth/permissions";
import type { CmsActor } from "@/server/cms/users/access";
import type { DbClient } from "@/server/db";
import { AUDIT_ACTIONS, auditInTx } from "@/server/lib/audit";
import { AppError } from "@/server/lib/errors";

/**
 * Who the content pipeline acts as (docs/CONTENT_PIPELINE.md "Accounts").
 *
 * AUTHOR — the account recorded as `createdById` of everything `content:import` writes. By default a dedicated system
 * account (`CONTENT_PIPELINE_AUTHOR_EMAIL`, default content-pipeline@system.invalid) with the CONTENT_EDITOR role and
 * no password: nobody can sign in as it (an `.invalid` address cannot receive a code). Being the author, it can NEVER
 * approve the content under four-eyes. `--author <email>` uses an existing editor's account instead.
 *
 * APPROVER — the human named with `--approver <email>` on `content:publish` (and optionally `content:import`, to
 * publish syllabus versions). Running the command with your address is your attestation that you reviewed the content
 * (§41). It must be an ACTIVE staff account with `content.review` + `content.publish`, and never the pipeline account.
 */

export const DEFAULT_PIPELINE_EMAIL = "content-pipeline@system.invalid";
const PIPELINE_DISPLAY_NAME = "Content pipeline";

export function pipelineEmail(): string {
  return (process.env.CONTENT_PIPELINE_AUTHOR_EMAIL ?? DEFAULT_PIPELINE_EMAIL).trim().toLowerCase();
}

export interface ResolvedAccount {
  actor: CmsActor & { roles: Role[] };
  email: string;
  /** True when this is the dedicated (password-less) pipeline account. */
  isSystem: boolean;
  created: boolean;
}

function toActor(user: { id: string; roles: Role[] }): CmsActor & { roles: Role[] } {
  return { kind: "user", userId: user.id, roles: user.roles };
}

/** The author account; creates the dedicated pipeline account on first use. */
export async function resolveAuthor(client: DbClient, email?: string | null): Promise<ResolvedAccount> {
  const wanted = (email ?? pipelineEmail()).trim().toLowerCase();
  const isSystem = wanted === pipelineEmail();
  const existing = await client.user.findUnique({ where: { emailNormalized: wanted }, select: { id: true, roles: true, status: true } });
  if (existing) {
    if (existing.status !== "ACTIVE") throw new AppError("FORBIDDEN", `The author account ${wanted} is not active.`);
    const actor = toActor(existing);
    if (!hasPermission(actor, "content.draft", "all") || !hasPermission(actor, "curriculum.manage")) {
      throw new AppError("FORBIDDEN", `The author account ${wanted} needs the CONTENT_EDITOR (or ADMIN) role.`);
    }
    return { actor, email: wanted, isSystem, created: false };
  }
  if (!isSystem) throw AppError.notFound(`No account with the email ${wanted}.`);
  const created = await client.user.create({
    data: {
      emailNormalized: wanted,
      roles: ["CONTENT_EDITOR"],
      status: "ACTIVE",
      profile: { create: { displayName: PIPELINE_DISPLAY_NAME, firstName: PIPELINE_DISPLAY_NAME } },
    },
    select: { id: true, roles: true },
  });
  await auditInTx(client, {
    actorUserId: null,
    action: AUDIT_ACTIONS.ROLE_GRANT,
    entityType: "User",
    entityId: created.id,
    targetUserId: created.id,
    after: { roles: ["CONTENT_EDITOR"] },
    metadata: { operation: "content.pipeline_account", note: "Password-less system author of imported content (cannot sign in or approve)." },
  });
  return { actor: toActor(created), email: wanted, isSystem: true, created: true };
}

/**
 * SYSTEM PUBLISHER (owner decision 2026-10-12: no human content review, no superuser needed to publish). `--approver
 * system` (or the publisher's own address) publishes as a dedicated password-less account, separate from the pipeline
 * author so the database's four-eyes rule (approver != creator) still holds. It has the ADMIN role because publishing
 * syllabus versions and opening subjects in the catalogue need `curriculum.manage`; nobody can sign in as it (no
 * password, an `.invalid` address cannot receive a code) and it is never SUPER_ADMIN.
 */
export const SYSTEM_APPROVER = "system";
export const DEFAULT_PUBLISHER_EMAIL = "content-publisher@system.invalid";
const PUBLISHER_DISPLAY_NAME = "Content publisher";

export function publisherEmail(): string {
  return (process.env.CONTENT_PUBLISHER_EMAIL ?? DEFAULT_PUBLISHER_EMAIL).trim().toLowerCase();
}

/** The system publisher account; created (ADMIN, password-less) on first use and audited. */
export async function resolveSystemPublisher(client: DbClient): Promise<ResolvedAccount> {
  const email = publisherEmail();
  if (email === pipelineEmail()) throw new AppError("FORBIDDEN", "The publisher account must differ from the pipeline author (four-eyes).");
  const existing = await client.user.findUnique({ where: { emailNormalized: email }, select: { id: true, roles: true, status: true, passwordHash: true } });
  if (existing) {
    if (existing.status !== "ACTIVE") throw new AppError("FORBIDDEN", `The publisher account ${email} is not active.`);
    if (existing.passwordHash) throw new AppError("FORBIDDEN", `The publisher account ${email} has a password: it must stay a system account.`);
    return { actor: toActor(existing), email, isSystem: true, created: false };
  }
  const created = await client.user.create({
    data: {
      emailNormalized: email,
      roles: ["ADMIN"],
      status: "ACTIVE",
      profile: { create: { displayName: PUBLISHER_DISPLAY_NAME, firstName: PUBLISHER_DISPLAY_NAME } },
    },
    select: { id: true, roles: true },
  });
  await auditInTx(client, {
    actorUserId: null,
    action: AUDIT_ACTIONS.ROLE_GRANT,
    entityType: "User",
    entityId: created.id,
    targetUserId: created.id,
    after: { roles: ["ADMIN"] },
    metadata: { operation: "content.publisher_account", note: "Password-less system approver of imported content (owner decision 2026-10-12: no human review). Cannot sign in." },
  });
  return { actor: toActor(created), email, isSystem: true, created: true };
}

/** The approver of `content:publish`: a staff account, or `system` for the system publisher (never the pipeline account). */
export async function resolveApprover(client: DbClient, email: string, options: { needAdmin?: boolean } = {}): Promise<ResolvedAccount> {
  const wanted = email.trim().toLowerCase();
  if (wanted === SYSTEM_APPROVER || wanted === publisherEmail()) return resolveSystemPublisher(client);
  if (wanted === pipelineEmail()) throw new AppError("FORBIDDEN", "The pipeline account cannot approve content: name the person who reviewed it.");
  const user = await client.user.findUnique({ where: { emailNormalized: wanted }, select: { id: true, roles: true, status: true } });
  if (!user) throw AppError.notFound(`No account with the email ${wanted}.`);
  if (user.status !== "ACTIVE") throw new AppError("FORBIDDEN", `The account ${wanted} is not active.`);
  const actor = toActor(user);
  if (!hasPermission(actor, "content.review", "all") || !hasPermission(actor, "content.publish", "all")) {
    throw new AppError("FORBIDDEN", `${wanted} may not approve and publish content (needs CONTENT_EDITOR, ADMIN or SUPER_ADMIN).`);
  }
  if (options.needAdmin && !hasPermission(actor, "curriculum.manage", "all")) {
    throw new AppError("FORBIDDEN", `${wanted} may not publish syllabus versions (needs ADMIN or SUPER_ADMIN).`);
  }
  return { actor, email: wanted, isSystem: false, created: false };
}

/** Whether the approver may publish syllabus versions and change the catalogue (ADMIN / SUPER_ADMIN). */
export function canPublishCurriculum(actor: CmsActor): boolean {
  return hasPermission(actor, "curriculum.manage", "all");
}
