import Link from "next/link";
import { APP_NAME, SUPPORT_EMAIL, SUPPORT_EMAIL_CONFIGURED } from "@/lib/config";
import type { LegalSection } from "./LegalDocument";

/**
 * DRAFT terms of use (template). Describes how the product actually works (one-off lifetime Full access since 2026-10-07, no free
 * tier since 2026-10-12, entitlements, AI features while switched off, school accounts) so counsel can review it; every commercial term in [square brackets] is a placeholder. Legal review
 * required before launch.
 */

const contact = SUPPORT_EMAIL_CONFIGURED ? SUPPORT_EMAIL : "[support contact email]";

export const TERMS_VERSION = "Draft 0.3 (October 2026)";

export const TERMS_SUMMARY = <>The rules for using {APP_NAME}: accounts, Full access and payments, content and acceptable use.</>;

export const TERMS_SECTIONS: readonly LegalSection[] = [
  {
    id: "agreement",
    heading: "About these terms",
    content: (
      <p>
        These terms are an agreement between you and <strong>[company legal name]</strong> (&ldquo;we&rdquo;) for the use of{" "}
        {APP_NAME}. By creating an account or using the service you accept them. Our{" "}
        <Link href="/legal/privacy">privacy notice</Link> explains how we handle personal information.
      </p>
    ),
  },
  {
    id: "accounts",
    heading: "Accounts",
    content: (
      <>
        <ul>
          <li>Keep your sign-in details private. You are responsible for activity on your account.</li>
          <li>Give accurate information about your board, level and subjects so the service works properly.</li>
          <li>
            If you are under 18, you need the permission of a parent or guardian to use {APP_NAME} [and, where the law
            requires it, their consent for particular features].
          </li>
          <li>One account per person. Do not share an account or sell access to it.</li>
        </ul>
      </>
    ),
  },
  {
    id: "plans",
    heading: "Full access and payments",
    content: (
      <>
        <p>
          An account on its own does not include access to lessons, practice or tests: these need Full access. What Full
          access includes and its price are shown on the{" "}
          <Link href="/pricing">pricing page</Link>. Prices are set per currency and may change; a change never affects
          access you have already bought.
        </p>
        <ul>
          <li>
            Full access is bought with <strong>one payment</strong>. It does not renew and nothing is charged again. It stays
            on the account it was bought for [for as long as we provide the service, subject to these terms].
          </li>
          <li>A parent or guardian may pay for a linked child; the access belongs to the child&apos;s account.</li>
          <li>
            Payments are processed by our payment provider (Paynow: EcoCash, OneMoney and cards). A payment counts once the
            provider confirms it.
          </li>
          <li>
            Refunds: [refund policy to be confirmed, including the position for mobile money payments]. A full refund ends
            the Full access it paid for.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "schools",
    heading: "School accounts",
    content: (
      <p>
        A school may give its students access under a separate agreement with us. Teachers can see the work and progress of
        students in their own classes. The school agreement covers seats, payment and the school&apos;s responsibilities [to be
        set out in the school agreement].
      </p>
    ),
  },
  {
    id: "ai",
    heading: "AI features",
    content: (
      <>
        <p>
          AI features (such as an AI tutor) are offered only when we announce them on the service. When available, the AI
          tutor is a study aid. It explains concepts and works through problems with you, and it can make mistakes. It
          is not a substitute for your teacher, the official syllabus or the examination board&apos;s instructions. Check
          anything important.
        </p>
        <ul>
          <li>Daily limits on AI use depend on your plan and may be adjusted to keep the service available to everyone.</li>
          <li>Do not use the AI tutor to cheat in assessed work or examinations, or to produce harmful content.</li>
          <li>Do not upload other people&apos;s personal information or material you have no right to share.</li>
        </ul>
      </>
    ),
  },
  {
    id: "content",
    heading: "Our content and yours",
    content: (
      <>
        <p>
          Lessons, questions, explanations, flashcards and mock exams are owned by us or our licensors. You may use them for
          your own study (and teachers for their classes), but you may not copy, sell, republish or scrape them.
        </p>
        <p>
          You keep ownership of what you write or upload. You allow us to store and process it to provide the service to you
          (for example, to mark an answer or let your teacher see an assignment).
        </p>
        <p>
          If you think content is wrong or infringes your rights, use &ldquo;Report a problem&rdquo; on the question or email{" "}
          <strong>{contact}</strong>.
        </p>
      </>
    ),
  },
  {
    id: "acceptable-use",
    heading: "Acceptable use",
    content: (
      <ul>
        <li>No attempts to break, overload or get around the security or limits of the service.</li>
        <li>No automated scraping or bulk downloading.</li>
        <li>No harassment, hateful content or impersonation, including on leaderboards and shared results.</li>
        <li>We may suspend an account that breaks these rules, telling you why unless the law or safety prevents it.</li>
      </ul>
    ),
  },
  {
    id: "results",
    heading: "No guarantee of results",
    content: (
      <p>
        We work hard to make {APP_NAME} accurate and useful, but we cannot guarantee any examination result. Grade estimates
        and study plans are guidance based on your activity on the platform. Lessons and questions are written and
        checked with care and keep improving; if you find a mistake, please tell us{SUPPORT_EMAIL_CONFIGURED ? ` at ${contact}` : ""} so
        we can correct it, and check anything important against your syllabus or with your teacher.
      </p>
    ),
  },
  {
    id: "liability",
    heading: "Liability",
    content: (
      <p>
        [Limitation of liability, consumer-protection carve-outs and service availability wording to be drafted by counsel
        under Zimbabwean law.]
      </p>
    ),
  },
  {
    id: "ending",
    heading: "Ending your account",
    content: (
      <p>
        You can delete your account at any time in your settings; deletion completes after a 14-day period in which you can
        change your mind. We may end or suspend access for serious or repeated breaches of these terms.
      </p>
    ),
  },
  {
    id: "law",
    heading: "Governing law and changes",
    content: (
      <>
        <p>These terms are governed by the laws of Zimbabwe. [Dispute resolution and jurisdiction to be confirmed.]</p>
        <p>
          We may update these terms. If a change is significant we will tell you before it takes effect. Questions:{" "}
          <strong>{contact}</strong>.
        </p>
      </>
    ),
  },
];
