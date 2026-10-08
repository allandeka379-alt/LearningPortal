import { describe, expect, it } from "vitest";
import { isAcceptablePassword, PASSWORD_POLICY_MESSAGES, passwordPolicyErrors } from "./password-policy";

describe("passwordPolicyErrors", () => {
  it("accepts a reasonable passphrase", () => {
    expect(passwordPolicyErrors("kudu river maths")).toEqual([]);
    expect(isAcceptablePassword("Granite-Baobab-42")).toBe(true);
  });

  it("enforces the length bounds (in code points, after NFKC)", () => {
    expect(passwordPolicyErrors("short1!")).toEqual([PASSWORD_POLICY_MESSAGES.tooShort]);
    expect(passwordPolicyErrors("a".repeat(129))).toEqual([PASSWORD_POLICY_MESSAGES.tooLong]);
    // 8 emoji are 16 UTF-16 units but 8 code points: long enough.
    expect(passwordPolicyErrors("🦒🦓🐘🦏🦁🐆🦛🐃")).toEqual([]);
    // 7 code points is too short even though it is 14 UTF-16 units.
    expect(passwordPolicyErrors("🦒🦓🐘🦏🦁🐆🦛")).toEqual([PASSWORD_POLICY_MESSAGES.tooShort]);
  });

  it("rejects digits-only passwords", () => {
    expect(passwordPolicyErrors("20261105")).toContain(PASSWORD_POLICY_MESSAGES.digitsOnly);
  });

  it("rejects the account's own identifiers", () => {
    expect(passwordPolicyErrors("Rudo.Moyo@Example.com", { email: "rudo.moyo@example.com" })).toContain(
      PASSWORD_POLICY_MESSAGES.matchesIdentifier,
    );
    expect(passwordPolicyErrors("rudo.moyo", { email: "rudo.moyo@example.com" })).toContain(
      PASSWORD_POLICY_MESSAGES.matchesIdentifier,
    );
    expect(passwordPolicyErrors("0771234567", { phone: "+263771234567" })).toContain(
      PASSWORD_POLICY_MESSAGES.matchesIdentifier,
    );
    expect(passwordPolicyErrors("+263771234567", { phone: "+263771234567" })).toContain(
      PASSWORD_POLICY_MESSAGES.matchesIdentifier,
    );
    expect(passwordPolicyErrors("hhs.rudo27", { username: "hhs.rudo27" })).toContain(
      PASSWORD_POLICY_MESSAGES.matchesIdentifier,
    );
  });

  it("rejects common and single-character passwords", () => {
    expect(passwordPolicyErrors("Password123")).toContain(PASSWORD_POLICY_MESSAGES.tooCommon);
    expect(passwordPolicyErrors("ZIMBABWE")).toContain(PASSWORD_POLICY_MESSAGES.tooCommon);
    expect(passwordPolicyErrors("zzzzzzzzzz")).toContain(PASSWORD_POLICY_MESSAGES.tooCommon);
  });

  it("has no composition rules", () => {
    expect(passwordPolicyErrors("all lower case words")).toEqual([]);
  });
});
