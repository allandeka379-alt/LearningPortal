/**
 * Confirmation copy after an invitation is created or sent again (school admin, platform admin). Pure and isomorphic.
 * The service always returns the invitation link; this text says whether the platform delivered it (by email: account
 * email is always sent; by SMS only while SMS is switched on) or whether the inviter should share the link shown
 * under the form (owner decision 2026-10-07: email-based accounts, no SMS).
 */

export interface InvitationDeliveryView {
  sentTo: string;
  delivered: boolean;
  channel: "sms" | "email";
  notSentReason: "sms_switched_off" | "failed" | null;
}

/** e.g. "Invitation emailed to te***@example.com. … You can also share the link below." */
export function invitationDeliveryMessage(result: InvitationDeliveryView, joins: string): string {
  if (result.delivered) {
    const how = result.channel === "sms" ? `sent by SMS to ${result.sentTo}` : `emailed to ${result.sentTo}`;
    return `Invitation ${how}. ${joins} You can also share the link below.`;
  }
  if (result.notSentReason === "sms_switched_off") {
    return `Invitation created for ${result.sentTo}. We don't send text messages, so share the link below with them (for example on WhatsApp or in person). ${joins}`;
  }
  return `Invitation saved, but the message to ${result.sentTo} could not be delivered. Share the link below, or try "Send again" later. ${joins}`;
}

/** Hint under the "who to invite" field of the invitation forms (`smsEnabled`: `features.sms`). */
export function inviteContactHint(smsEnabled: boolean): string {
  return smsEnabled
    ? "We email the link to an email address, or text it to a mobile number. The link is also shown here to share."
    : "We email the link to an email address. For a mobile number, share the link yourself: we don't send text messages.";
}
