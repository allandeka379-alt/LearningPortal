import Link from "next/link";
import { APP_NAME } from "@/lib/config";
import type { LegalSection } from "./LegalDocument";

/**
 * DRAFT cookie notice (template). The list matches the cookies and browser storage the code actually sets (auth
 * cookies in src/server/auth/cookies.ts, display preferences in src/components/layout/preferences.ts, the school
 * selector, exam autosave, the service worker). Update it whenever a cookie is added. Legal review required.
 */

export const COOKIES_VERSION = "Draft 0.1 (October 2026)";

export const COOKIES_SUMMARY = <>The small files and browser storage {APP_NAME} uses, and why. We use no advertising or tracking cookies.</>;

export const COOKIES_SECTIONS: readonly LegalSection[] = [
  {
    id: "summary",
    heading: "In short",
    content: (
      <p>
        {APP_NAME} only uses cookies that are needed to sign you in, keep the service secure and remember the display
        settings you choose. There are no advertising cookies, no third-party analytics and no cross-site tracking, so we do
        not show a cookie consent banner. [Confirm with counsel that no consent banner is required for strictly necessary and
        preference cookies.]
      </p>
    ),
  },
  {
    id: "cookies-we-use",
    heading: "Cookies we set",
    content: (
      <table>
        <caption className="sr-only">Cookies we set: name, purpose and how long each lasts</caption>
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Purpose</th>
            <th scope="col">Lasts</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>__Host-dz_session</code> (<code>dz_session</code> in development)
            </td>
            <td>Keeps you signed in. Strictly necessary; not readable by scripts.</td>
            <td>Until you sign out or the session expires</td>
          </tr>
          <tr>
            <td>
              <code>__Host-dz_auth_flow</code>
            </td>
            <td>Remembers which email address is being verified during sign-up, sign-in or password reset.</td>
            <td>15 minutes</td>
          </tr>
          <tr>
            <td>
              <code>__Host-dz_oauth</code>
            </td>
            <td>Protects &ldquo;Sign in with Google&rdquo; against forgery.</td>
            <td>10 minutes</td>
          </tr>
          <tr>
            <td>
              <code>dz_theme</code>, <code>dz_font_scale</code>
            </td>
            <td>Remember your light or dark theme and text size.</td>
            <td>1 year</td>
          </tr>
          <tr>
            <td>
              <code>dz_school</code>
            </td>
            <td>For school administrators of more than one school: remembers which school is selected.</td>
            <td>180 days</td>
          </tr>
        </tbody>
      </table>
    ),
  },
  {
    id: "storage",
    heading: "Other storage on your device",
    content: (
      <ul>
        <li>
          <strong>Exam autosave:</strong> while you sit a timed exam, unsent answers are kept in your browser&apos;s local
          storage so a lost connection does not lose your work. They are removed once the server has them.
        </li>
        <li>
          <strong>Practice session notes:</strong> topic progress changes during a practice session are kept in session storage
          for that tab only.
        </li>
        <li>
          <strong>Offline copies:</strong> the app saves its pages and the lessons you open so they load quickly and work with a
          weak connection. Clearing your browser&apos;s site data removes them.
        </li>
      </ul>
    ),
  },
  {
    id: "third-parties",
    heading: "Payment pages",
    content: (
      <p>
        When you pay, you may be sent to a payment provider&apos;s page (for example Paynow). That page is run by the provider
        and may use its own cookies under its own policy.
      </p>
    ),
  },
  {
    id: "control",
    heading: "Your choices",
    content: (
      <p>
        You can delete cookies and site data in your browser settings at any time. If you block the session cookie you will
        not be able to sign in. Read more in our <Link href="/legal/privacy">privacy notice</Link>.
      </p>
    ),
  },
];
