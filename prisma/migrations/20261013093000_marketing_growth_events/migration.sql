-- Public growth events for first-party analytics: visits, CTA/link clicks, signup clicks and checkout clicks.
-- The table intentionally stores no raw IPs, raw user-agent strings, form values or full referrer URLs.

CREATE TABLE "MarketingEvent" (
  "id" uuid NOT NULL,
  "type" varchar(32) NOT NULL,
  "path" varchar(300) NOT NULL,
  "target" varchar(300),
  "referrerHost" varchar(160),
  "utmSource" varchar(80),
  "utmMedium" varchar(80),
  "utmCampaign" varchar(120),
  "utmTerm" varchar(120),
  "utmContent" varchar(120),
  "userId" uuid,
  "anonymousIdHash" char(64),
  "ipHash" char(64),
  "userAgentHash" char(64),
  "createdAt" timestamptz(3) NOT NULL DEFAULT now(),
  CONSTRAINT "MarketingEvent_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "MarketingEvent_type_chk" CHECK ("type" IN ('PAGE_VIEW', 'CLICK', 'SIGNUP_CLICK', 'CHECKOUT_CLICK')),
  CONSTRAINT "MarketingEvent_path_chk" CHECK ("path" LIKE '/%' AND "path" NOT LIKE '//%')
);

ALTER TABLE "MarketingEvent"
  ADD CONSTRAINT "MarketingEvent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

CREATE INDEX "MarketingEvent_createdAt_idx" ON "MarketingEvent" USING brin ("createdAt");
CREATE INDEX "MarketingEvent_type_createdAt_idx" ON "MarketingEvent" ("type", "createdAt");
CREATE INDEX "MarketingEvent_path_createdAt_idx" ON "MarketingEvent" ("path", "createdAt");
CREATE INDEX "MarketingEvent_target_createdAt_idx" ON "MarketingEvent" ("target", "createdAt");
CREATE INDEX "MarketingEvent_userId_createdAt_idx" ON "MarketingEvent" ("userId", "createdAt");
