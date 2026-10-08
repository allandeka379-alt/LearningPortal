import Link from "next/link";
import { APP_NAME, SUPPORT_EMAIL, SUPPORT_EMAIL_CONFIGURED } from "@/lib/config";
import type { LegalSection } from "./LegalDocument";

/**
 * DRAFT privacy notice (template). Structured around the principles of Zimbabwe's Cyber and Data Protection Act
 * [Chapter 12:07]: lawful and transparent processing for specified purposes, minimisation, accuracy, limited retention,
 * security, data subject rights, special care for children, and conditions on cross-border transfers. The facts about
 * what the platform does (cookies, retention periods, AI and payment processors) mirror docs/ARCHITECTURE.md §5.12–§5.13
 * and §6–§7. Legal review required before launch.
 */

const contact = SUPPORT_EMAIL_CONFIGURED ? SUPPORT_EMAIL : "[privacy contact email]";

export const PRIVACY_VERSION = "Draft 0.1 (October 2026)";

export const PRIVACY_SUMMARY = (
  <>
    How {APP_NAME} collects, uses, shares and protects personal information, including that of learners under 18, and the
    rights you have over it.
  </>
);

export const PRIVACY_SECTIONS: readonly LegalSection[] = [
  {
    id: "who-we-are",
    heading: "Who we are",
    content: (
      <>
        <p>
          {APP_NAME} is operated by <strong>[company legal name]</strong>, registered in Zimbabwe under number{" "}
          <strong>[registration number]</strong>, of <strong>[registered address]</strong> (&ldquo;we&rdquo;, &ldquo;us&rdquo;). We
          are the data controller for the personal information described in this notice.
        </p>
        <p>
          Data controller licence (Cyber and Data Protection Act [Chapter 12:07] and its regulations): <strong>[licence number, if
          required]</strong>. Data Protection Officer: <strong>[name and contact details]</strong>. You can reach us about privacy
          at <strong>{contact}</strong>.
        </p>
        <p>
          When a school gives its students access, the school decides how it uses the platform for its classes. For school
          accounts, [the school and {APP_NAME} each act as controller for their own purposes / the role of each party — to be
          confirmed in the school agreement].
        </p>
      </>
    ),
  },
  {
    id: "what-we-collect",
    heading: "What we collect",
    content: (
      <>
        <p>We collect only what we need to run the service:</p>
        <ul>
          <li>
            <strong>Account details:</strong> a display name (a surname is optional), an email address (or, for accounts a
            school creates, a username), a password (stored only as a one-way hash), and your role (student, parent, teacher
            or school administrator). A phone number is optional (for example for EcoCash or OneMoney payments): it is not used
            to sign in, and we do not send text messages to it.
          </li>
          <li>
            <strong>Study profile:</strong> country, examination board, level, form or year, subjects, target exam session,
            self-assessed ability and optional target grade.
          </li>
          <li>
            <strong>Learning activity:</strong> answers, marks, time spent, lessons opened, flashcard reviews, study plans,
            streaks and progress by topic.
          </li>
          <li>
            <strong>AI tutor conversations:</strong> the questions you ask and the tutor&apos;s replies, including photos of
            questions you upload.
          </li>
          <li>
            <strong>Payments:</strong> the plan, amount, currency, status and the payment provider&apos;s reference. We do not
            receive or store card numbers or mobile money PINs.
          </li>
          <li>
            <strong>Technical data:</strong> session identifiers, approximate request information such as IP address (used
            for security and rate limiting), and device and browser type.
          </li>
          <li>
            <strong>School enquiries:</strong> the school name and the contact details you give us in the &ldquo;Talk to
            us&rdquo; form.
          </li>
        </ul>
        <p>
          We do <strong>not</strong> ask for a date of birth, national ID number, home address, gender or photograph of you.
        </p>
      </>
    ),
  },
  {
    id: "how-we-use",
    heading: "How we use it, and our lawful basis",
    content: (
      <>
        <table>
          <caption className="sr-only">How we use your information, and the lawful basis for each use</caption>
          <thead>
            <tr>
              <th scope="col">Purpose</th>
              <th scope="col">Lawful basis</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Providing your account, lessons, practice, marking, mock exams, study plans and progress</td>
              <td>Performance of our agreement with you (or with your school)</td>
            </tr>
            <tr>
              <td>The AI tutor and AI marking of written answers</td>
              <td>Performance of our agreement; consent of a parent or guardian where required for a learner under 18</td>
            </tr>
            <tr>
              <td>Showing a parent their child&apos;s progress, and (only with the learner&apos;s consent) AI conversations</td>
              <td>Consent</td>
            </tr>
            <tr>
              <td>Taking payments and keeping financial records</td>
              <td>Performance of our agreement; legal obligation</td>
            </tr>
            <tr>
              <td>Keeping the service secure, preventing fraud and abuse, rate limiting</td>
              <td>Legitimate interests [to be confirmed against the Act]</td>
            </tr>
            <tr>
              <td>Improving content and features using aggregated, de-identified statistics</td>
              <td>Legitimate interests [to be confirmed against the Act]</td>
            </tr>
            <tr>
              <td>Service messages (verification codes, payment receipts, reminders you switch on)</td>
              <td>Performance of our agreement; consent for optional reminders</td>
            </tr>
          </tbody>
        </table>
        <p>We do not sell personal information and we do not use it for advertising. Where we rely on consent, you can withdraw it at any time in your settings or by contacting us.</p>
      </>
    ),
  },
  {
    id: "children",
    heading: "Learners under 18",
    content: (
      <>
        <p>
          The platform is built for secondary school learners, many of whom are under 18. We collect the minimum information needed,
          keep it out of public pages and logs, and never show a learner&apos;s surname, school or photograph on shareable
          results or leaderboards (leaderboards use an automatically generated username unless the learner chooses otherwise).
        </p>
        <p>
          Where the law requires the consent of a parent or guardian for a learner under 18, we ask for it before the
          relevant processing starts, and a parent or guardian can review, correct or withdraw it. [Age threshold, the exact
          consent requirements and verification method to be confirmed against the Act.]
        </p>
        <p>
          A learner&apos;s conversations with the AI tutor are private. They are never shown to teachers, and they are shown to
          a linked parent only if the learner has agreed.
        </p>
      </>
    ),
  },
  {
    id: "sharing",
    heading: "Who we share it with (processors)",
    content: (
      <>
        <p>We use carefully chosen service providers that process personal information on our behalf and under contract:</p>
        <ul>
          <li>
            <strong>Hosting and storage:</strong> [hosting provider and region], where the database, files and backups are kept.
          </li>
          <li>
            <strong>AI provider:</strong> Anthropic, PBC (United States), which generates tutor replies and AI-assisted marking.
            We send the question and a short learning summary (board, subject, topic, recent mistakes); we do not send names,
            schools or contact details. [Data retention settings of the AI account to be confirmed.]
          </li>
          <li>
            <strong>Payment provider:</strong> Paynow (Zimbabwe) for EcoCash, OneMoney and cards. It receives what it needs to
            take the payment.
          </li>
          <li>
            <strong>Email provider:</strong> [email provider], which delivers account emails: sign-up and sign-in codes,
            password resets, security notices and invitations.
          </li>
        </ul>
        <p>
          A school sees the progress and work of the students in its classes. A linked parent sees their own child&apos;s
          progress. We may disclose information where the law requires it.
        </p>
      </>
    ),
  },
  {
    id: "international-transfers",
    heading: "Transfers outside Zimbabwe",
    content: (
      <>
        <p>
          Some of our providers process data outside Zimbabwe: the AI provider in the United States, and [hosting location to be
          confirmed]. We transfer personal information abroad only as the Cyber and Data Protection Act allows, for example
          where the destination provides an adequate level of protection or with the authorisation of the Data Protection
          Authority, and we limit what is sent to what each provider needs. [Transfer mechanism and any authorisation to be
          confirmed.]
        </p>
      </>
    ),
  },
  {
    id: "retention",
    heading: "How long we keep it",
    content: (
      <>
        <table>
          <caption className="sr-only">How long we keep each kind of information</caption>
          <thead>
            <tr>
              <th scope="col">Information</th>
              <th scope="col">Kept for</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Expired sign-in sessions</td>
              <td>Deleted 30 days after they expire</td>
            </tr>
            <tr>
              <td>One-time verification codes</td>
              <td>Deleted 24 hours after they expire</td>
            </tr>
            <tr>
              <td>Photos uploaded to the AI tutor</td>
              <td>30 days</td>
            </tr>
            <tr>
              <td>AI tutor messages</td>
              <td>12 months, then the text is deleted</td>
            </tr>
            <tr>
              <td>Learning history (answers, marks, progress)</td>
              <td>While your account is open; anonymised when it is deleted</td>
            </tr>
            <tr>
              <td>Payment records</td>
              <td>[6 years, or the statutory accounting period — to be confirmed]</td>
            </tr>
            <tr>
              <td>Security audit logs</td>
              <td>2 years</td>
            </tr>
          </tbody>
        </table>
        <p>
          When you delete your account, there is a 14-day period in which you can change your mind. After that, your name,
          email address, phone number, AI conversations and uploads are deleted; your learning history is kept only in
          anonymised form for statistics.
        </p>
      </>
    ),
  },
  {
    id: "your-rights",
    heading: "Your rights",
    content: (
      <>
        <p>Subject to the Act, you (or a parent or guardian acting for a learner under 18) have the right to:</p>
        <ul>
          <li>be told how your personal information is used (this notice);</li>
          <li>get a copy of your personal information, including a download of your data;</li>
          <li>have inaccurate information corrected;</li>
          <li>have your information deleted, and delete your account;</li>
          <li>object to, or ask us to restrict, certain processing;</li>
          <li>withdraw consent at any time, without affecting processing that already took place;</li>
          <li>
            complain to the Data Protection Authority, the Postal and Telecommunications Regulatory Authority of Zimbabwe
            (POTRAZ).
          </li>
        </ul>
        <p>
          You can use most of these rights in your account settings. Otherwise contact us at <strong>{contact}</strong>; we
          will respond within [the period required by the Act].
        </p>
      </>
    ),
  },
  {
    id: "security",
    heading: "How we protect it",
    content: (
      <p>
        Passwords are stored with a modern one-way hashing algorithm, connections are encrypted, access is limited by role
        (a teacher only sees their own classes), staff access to sensitive records is logged, and personal details are kept
        out of system logs. No system is perfectly secure; if a breach affects your information we will notify you and the
        Authority as the law requires.
      </p>
    ),
  },
  {
    id: "cookies",
    heading: "Cookies",
    content: (
      <p>
        We use only the cookies needed to sign you in, keep the service secure and remember your display preferences. See the{" "}
        <Link href="/legal/cookies">cookie notice</Link>.
      </p>
    ),
  },
  {
    id: "changes",
    heading: "Changes to this notice",
    content: (
      <p>
        We will update this notice when our practices change and show the date of the latest version at the top. If a change
        is significant, we will tell you in the app before it takes effect.
      </p>
    ),
  },
];
