-- One-off plan purchases (owner decision 2026-10-07: "Full access" for a single payment, no renewal; docs/ARCHITECTURE.md
-- §7.5). The new enum values have their own migration because Postgres refuses to use a value added by
-- ALTER TYPE ... ADD VALUE inside the transaction that added it; the constraints, index and trigger that name them
-- follow in 20261007053100_plan_purchase_rules.

-- AlterEnum
ALTER TYPE "EntitlementSource" ADD VALUE 'PURCHASE';

-- AlterEnum
ALTER TYPE "PaymentPurpose" ADD VALUE 'PLAN_PURCHASE';
