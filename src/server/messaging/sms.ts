import "server-only";
import { DEFAULT_CALLING_CODE, normalizePhone } from "@/server/auth/identifiers";
import { AppError } from "@/server/lib/errors";

/**
 * SMS helpers shared by the SMS adapters (pure): E.164 recipients with Zimbabwe (+263) as the default country, the
 * mobile network behind a Zimbabwean number (for logs and per-network delivery monitoring: Econet, NetOne, Telecel),
 * and GSM-7 friendly bodies (a single curly quote or em dash switches a message to UCS-2, which more than halves the
 * characters per paid segment).
 */

export type SmsNetwork = "econet" | "netone" | "telecel" | "zw-other" | "international";

export interface SmsRecipient {
  /** E.164, e.g. `+263771234567`. */
  e164: string;
  /** Network for logs / metrics (never the number). */
  network: SmsNetwork;
}

/**
 * Zimbabwean mobile prefixes (national significant number). VERIFY with the regulator (POTRAZ) numbering plan before
 * go-live; only used for logging, never to refuse a number.
 */
const ZW_MOBILE_PREFIXES: ReadonlyArray<readonly [string, SmsNetwork]> = [
  ["71", "netone"],
  ["73", "telecel"],
  ["77", "econet"],
  ["78", "econet"],
];

/** The network behind an E.164 number (Zimbabwe only; others are `international`). */
export function smsNetwork(e164: string): SmsNetwork {
  const zw = `+${DEFAULT_CALLING_CODE}`;
  if (!e164.startsWith(zw)) return "international";
  const nsn = e164.slice(zw.length);
  for (const [prefix, network] of ZW_MOBILE_PREFIXES) if (nsn.startsWith(prefix)) return network;
  return "zw-other";
}

/**
 * Normalises an SMS recipient to E.164 (national Zimbabwean formats such as `0771 234 567` are accepted) and refuses
 * numbers that cannot receive SMS: malformed numbers and Zimbabwean fixed lines (mobile numbers start with 7).
 *
 * @throws AppError BAD_REQUEST
 */
export function toSmsRecipient(to: string): SmsRecipient {
  const e164 = normalizePhone(to);
  if (e164 === null) throw new AppError("BAD_REQUEST", "That number can't receive text messages.");
  const zw = `+${DEFAULT_CALLING_CODE}`;
  if (e164.startsWith(zw) && !e164.slice(zw.length).startsWith("7")) {
    throw new AppError("BAD_REQUEST", "That number can't receive text messages. Use a mobile number.");
  }
  return { e164, network: smsNetwork(e164) };
}

/** GSM 03.38 basic character set (one septet each). */
const GSM7_BASIC = new Set(
  "@£$¥èéùìòÇ\nØø\rÅåΔ_ΦΓΛΩΠΨΣΘΞÆæßÉ !\"#¤%&'()*+,-./0123456789:;<=>?¡ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÑÜ§¿abcdefghijklmnopqrstuvwxyzäöñüà",
);
/** GSM 03.38 extension table (two septets each: escape + character). */
const GSM7_EXTENDED = new Set("^{}\\[~]|€\f");

/** Typographic characters people paste that have plain GSM-7 equivalents. */
const GSM7_REPLACEMENTS: ReadonlyArray<readonly [RegExp, string]> = [
  [/[‘’‚‛′´`]/g, "'"],
  [/[“”„‟″«»]/g, '"'],
  [/[‐‑‒–—―−]/g, "-"],
  [/…/g, "..."],
  [/[      ]/g, " "],
  [/[​‌‍⁠﻿]/g, ""],
  [/[•·]/g, "*"],
  [/\t/g, " "],
];

/** Hard cap on segments per SMS (cost control). Longer bodies are clipped. */
export const SMS_MAX_SEGMENTS = 6;

export interface PreparedSms {
  text: string;
  encoding: "GSM-7" | "UCS-2";
  segments: number;
  /** True when the body was cut to {@link SMS_MAX_SEGMENTS}. */
  clipped: boolean;
}

function gsm7Length(text: string): number | null {
  let septets = 0;
  for (const char of text) {
    if (GSM7_BASIC.has(char)) septets += 1;
    else if (GSM7_EXTENDED.has(char)) septets += 2;
    else return null;
  }
  return septets;
}

function segmentsFor(units: number, encoding: PreparedSms["encoding"]): number {
  const [single, multi] = encoding === "GSM-7" ? [160, 153] : [70, 67];
  if (units <= single) return 1;
  return Math.ceil(units / multi);
}

/**
 * Prepares an SMS body: typographic characters mapped to GSM-7, whitespace trimmed, encoding and segment count
 * computed, and the body clipped (with "...") to {@link SMS_MAX_SEGMENTS}. Pure.
 */
export function prepareSmsText(input: string): PreparedSms {
  let text = input.normalize("NFC");
  for (const [pattern, replacement] of GSM7_REPLACEMENTS) text = text.replace(pattern, replacement);
  text = text.replace(/[ ]{2,}/g, " ").trim();
  const septets = gsm7Length(text);
  const encoding: PreparedSms["encoding"] = septets === null ? "UCS-2" : "GSM-7";
  // UCS-2 segments count UTF-16 code units (an emoji is two).
  const units = septets ?? text.length;
  const max = encoding === "GSM-7" ? SMS_MAX_SEGMENTS * 153 : SMS_MAX_SEGMENTS * 67;
  if (units <= max) return { text, encoding, segments: segmentsFor(units, encoding), clipped: false };

  // Clip by whole code points until it fits with room for the ellipsis.
  const measure = (value: string): number => (encoding === "GSM-7" ? (gsm7Length(value) ?? value.length) : value.length);
  const chars = [...text];
  // Every character costs at least one unit, so nothing past `max` characters can fit.
  if (chars.length > max) chars.length = max;
  let clippedText = chars.join("");
  while (chars.length > 0 && measure(clippedText) > max - 3) {
    chars.pop();
    clippedText = chars.join("");
  }
  clippedText = `${clippedText.trimEnd()}...`;
  return { text: clippedText, encoding, segments: segmentsFor(measure(clippedText), encoding), clipped: true };
}
