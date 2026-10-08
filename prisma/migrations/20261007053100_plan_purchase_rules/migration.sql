-- One-off plan purchases (owner decision 2026-10-07; docs/ARCHITECTURE.md §7.5): a Payment with purpose PLAN_PURCHASE
-- buys a ONE_OFF PlanPrice and is fulfilled as exactly one EntitlementGrant with source PURCHASE (planId + paymentId;
-- endsAt NULL = lifetime access). No Subscription is involved, so nothing renews, expires or reminds.
--
-- ===== Raw SQL only (Prisma ignores CHECK constraints, partial indexes and triggers; no drift) =====
-- Changed CHECK definitions: DROP first, then re-add NOT VALID and VALIDATE (no long lock on populated tables).
-- Plain (non-concurrent) CREATE UNIQUE INDEX: this runs before launch while EntitlementGrant holds only dev/test rows.
-- An index added to a populated table after launch must use CREATE INDEX CONCURRENTLY in its own single-statement
-- migration (see 20261006102004_flashcard_review_new_daily_idx).

-- Purpose: purpose-specific payment references (§32). A PLAN_PURCHASE names its plan price and the beneficiary student
-- and never a subscription or a study pack (its fulfilment is a grant, not a subscription period).
ALTER TABLE "Payment" DROP CONSTRAINT IF EXISTS "Payment_purpose_refs_chk";
ALTER TABLE "Payment"
  ADD CONSTRAINT "Payment_purpose_refs_chk" CHECK (
       ("purpose" = 'SUBSCRIPTION'  AND "subscriptionId" IS NOT NULL AND "studyPackId" IS NULL)
    OR ("purpose" = 'STUDY_PACK'    AND "studyPackId" IS NOT NULL AND "beneficiaryUserId" IS NOT NULL
                                    AND "subscriptionId" IS NULL)
    OR ("purpose" = 'SEATS'         AND "subscriptionId" IS NOT NULL AND "schoolId" IS NOT NULL AND "studyPackId" IS NULL)
    OR ("purpose" = 'PLAN_PURCHASE' AND "planPriceId" IS NOT NULL AND "beneficiaryUserId" IS NOT NULL
                                    AND "subscriptionId" IS NULL AND "studyPackId" IS NULL)) NOT VALID;
ALTER TABLE "Payment" VALIDATE CONSTRAINT "Payment_purpose_refs_chk";

-- Purpose: a PURCHASE grant belongs to a user and names the plan it unlocks and the payment that bought it (payments are
-- never deleted: users with payments are anonymised, so the paymentId link always survives).
ALTER TABLE "EntitlementGrant" DROP CONSTRAINT IF EXISTS "EntitlementGrant_purchase_chk";
ALTER TABLE "EntitlementGrant"
  ADD CONSTRAINT "EntitlementGrant_purchase_chk"
    CHECK ("source" <> 'PURCHASE' OR ("userId" IS NOT NULL AND "planId" IS NOT NULL AND "paymentId" IS NOT NULL)) NOT VALID;
ALTER TABLE "EntitlementGrant" VALIDATE CONSTRAINT "EntitlementGrant_purchase_chk";

-- Purpose: "already owned" enforced by the database: at most one unrevoked open-ended (lifetime) purchase per user and
-- plan, so two payments confirmed at the same moment (e.g. a student and a parent paying in parallel) can never both
-- become lifetime access; the fulfilment leaves the second one for staff to refund.
CREATE UNIQUE INDEX IF NOT EXISTS "EntitlementGrant_one_lifetime_purchase_idx" ON "EntitlementGrant" ("userId", "planId")
  WHERE "source" = 'PURCHASE' AND "revokedAt" IS NULL AND "endsAt" IS NULL;

-- Purpose (F14): a grant's billing links agree with each other: a paymentId names a SUCCESSFUL payment (checked when the
-- link is made) for the same beneficiary user / school and the same study pack; a PURCHASE grant names a PLAN_PURCHASE
-- payment for a price of the granted plan, and only PURCHASE grants name a PLAN_PURCHASE payment; a SCHOOL_SEAT grant is
-- funded by a SCHOOL-held subscription and goes to an ACTIVE student member of that school.
CREATE OR REPLACE FUNCTION entitlement_grant_link_guard() RETURNS trigger LANGUAGE plpgsql AS $$
DECLARE
  v_pay        record;
  v_new_link   boolean;
  v_sub_school uuid;
  v_price_plan uuid;
BEGIN
  IF NEW."paymentId" IS NOT NULL THEN
    IF TG_OP = 'INSERT' THEN
      v_new_link := true;
    ELSE
      v_new_link := NEW."paymentId" IS DISTINCT FROM OLD."paymentId";
    END IF;
    SELECT p."status"::text AS status, p."purpose"::text AS purpose, p."beneficiaryUserId", p."schoolId", p."studyPackId",
           p."planPriceId"
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
      IF (v_pay.purpose = 'PLAN_PURCHASE') <> (NEW."source"::text = 'PURCHASE') THEN
        RAISE EXCEPTION 'EntitlementGrant %: only a PURCHASE grant fulfils a plan purchase (payment %)', NEW."id", NEW."paymentId"
          USING ERRCODE = 'check_violation';
      END IF;
      IF v_pay.purpose = 'PLAN_PURCHASE' THEN
        SELECT pp."planId" INTO v_price_plan FROM "PlanPrice" pp WHERE pp."id" = v_pay."planPriceId";
        IF v_price_plan IS DISTINCT FROM NEW."planId" THEN
          RAISE EXCEPTION 'EntitlementGrant %: payment % bought a different plan', NEW."id", NEW."paymentId"
            USING ERRCODE = 'check_violation';
        END IF;
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
-- Purpose: re-attach the link guard, now also when planId changes (a PURCHASE grant's plan must stay the bought plan).
CREATE OR REPLACE TRIGGER "EntitlementGrant_link_guard"
  BEFORE INSERT OR UPDATE OF "paymentId", "subscriptionId", "userId", "schoolId", "studyPackId", "planId", "source" ON "EntitlementGrant"
  FOR EACH ROW EXECUTE FUNCTION entitlement_grant_link_guard();
