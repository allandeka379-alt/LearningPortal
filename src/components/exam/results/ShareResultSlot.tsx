import { ShareAttemptResult, type ShareAttemptResultProps } from "@/components/share/ShareAttemptResult";

/**
 * "Share result" next to the score headline (§46): the results page's slot, filled by the sharing module's
 * {@link ShareAttemptResult} (MOCK_SCORE / TEST_SCORE cards, opt-in, revocable, no personal data on the public page).
 * Renders nothing until the score is final, so no provisional score is ever shared.
 */
export function ShareResultSlot(props: ShareAttemptResultProps) {
  return <ShareAttemptResult {...props} />;
}
