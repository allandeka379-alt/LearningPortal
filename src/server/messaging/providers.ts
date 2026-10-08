import "server-only";
import { EMAIL_PROVIDERS, SMS_PROVIDERS, type EmailProviderName, type ServerEnv, type SmsProviderName } from "@/server/lib/env";
import { AppError } from "@/server/lib/errors";
import { ResendEmailDriver } from "./email-resend";
import type { HttpDriverOptions } from "./http";
import { AfricasTalkingSmsDriver } from "./sms-africastalking";
import { TwilioSmsDriver } from "./sms-twilio";
import type { ChannelName, MessagingChannel, OutboundMessage, SendResult } from "./types";

/**
 * Real email / SMS providers, selected by `EMAIL_PROVIDER` / `SMS_PROVIDER` (keys validated by `env.ts`):
 *
 * | Setting                       | Adapter                          | Keys                                                        |
 * |-------------------------------|----------------------------------|-------------------------------------------------------------|
 * | `EMAIL_PROVIDER=resend`       | ./email-resend.ts                | `RESEND_API_KEY`, `EMAIL_FROM` (+ optional `EMAIL_REPLY_TO`) |
 * | `SMS_PROVIDER=twilio`         | ./sms-twilio.ts                  | `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_FROM` or `TWILIO_MESSAGING_SERVICE_SID` |
 * | `SMS_PROVIDER=africastalking` | ./sms-africastalking.ts          | `AFRICASTALKING_USERNAME`, `AFRICASTALKING_API_KEY` (+ optional `AFRICASTALKING_SENDER_ID`) |
 *
 * All three are plain `fetch` adapters (no SDKs) behind {@link MessagingChannel}; shared timeout / error handling in
 * ./http.ts, SMS recipient + body handling in ./sms.ts. None has been exercised against the live service from this
 * repository: verify each against the provider's current documentation before go-live (docs/DEPLOYMENT.md §11).
 *
 * Adding a provider: implement {@link MessagingChannel} in this folder, add its name to `EMAIL_PROVIDERS` /
 * `SMS_PROVIDERS` and its required keys to the policy in `src/server/lib/env.ts`, and map it below.
 */

export function isEmailProviderName(name: string): name is EmailProviderName {
  return (EMAIL_PROVIDERS as readonly string[]).includes(name);
}

export function isSmsProviderName(name: string): name is SmsProviderName {
  return (SMS_PROVIDERS as readonly string[]).includes(name);
}

/** The email adapter named by `EMAIL_PROVIDER`, or `null` when it is not a real adapter or its keys are missing. */
export function emailProviderFromEnv(env: ServerEnv, options: HttpDriverOptions = {}): MessagingChannel | null {
  switch (env.EMAIL_PROVIDER) {
    case "resend":
      if (!env.RESEND_API_KEY || !env.EMAIL_FROM) return null;
      return new ResendEmailDriver({ apiKey: env.RESEND_API_KEY, from: env.EMAIL_FROM, replyTo: env.EMAIL_REPLY_TO }, options);
    default:
      return null;
  }
}

/** The SMS adapter named by `SMS_PROVIDER`, or `null` when it is not a real adapter or its keys are missing. */
export function smsProviderFromEnv(env: ServerEnv, options: HttpDriverOptions = {}): MessagingChannel | null {
  switch (env.SMS_PROVIDER) {
    case "twilio":
      if (!env.TWILIO_ACCOUNT_SID || !env.TWILIO_AUTH_TOKEN || (!env.TWILIO_FROM && !env.TWILIO_MESSAGING_SERVICE_SID)) return null;
      return new TwilioSmsDriver(
        {
          accountSid: env.TWILIO_ACCOUNT_SID,
          authToken: env.TWILIO_AUTH_TOKEN,
          from: env.TWILIO_FROM,
          messagingServiceSid: env.TWILIO_MESSAGING_SERVICE_SID,
        },
        options,
      );
    case "africastalking":
      if (!env.AFRICASTALKING_USERNAME || !env.AFRICASTALKING_API_KEY) return null;
      return new AfricasTalkingSmsDriver(
        { username: env.AFRICASTALKING_USERNAME, apiKey: env.AFRICASTALKING_API_KEY, senderId: env.AFRICASTALKING_SENDER_ID },
        options,
      );
    default:
      return null;
  }
}

/**
 * Placeholder selected when the environment names a provider that has no adapter (dev/test only: production refuses
 * unknown names at boot), or when a channel has no provider in production (WhatsApp without credentials). Every send
 * throws `AppError("INTERNAL")`, so a misconfiguration fails loudly instead of silently dropping OTPs.
 */
export class UnconfiguredProvider implements MessagingChannel {
  readonly channel: ChannelName;
  readonly driver: string;

  constructor(channel: ChannelName, driver: string) {
    this.channel = channel;
    this.driver = driver;
  }

  async send(message: OutboundMessage): Promise<SendResult> {
    void message;
    throw new AppError("INTERNAL", `The ${this.channel} provider "${this.driver}" is not configured.`, {
      details: { channel: this.channel, driver: this.driver },
    });
  }
}
