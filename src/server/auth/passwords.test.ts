import { hash, parseOptions, type Algorithm } from "@node-rs/argon2";
import { describe, expect, it } from "vitest";
import { ARGON2_PARAMS, hashPassword, passwordNeedsRehash, verifyDummyPassword, verifyPassword } from "./passwords";

describe("passwords (Argon2id)", () => {
  it("hashes with Argon2id and the OWASP parameters", async () => {
    const stored = await hashPassword("kudu river maths");
    expect(stored.startsWith("$argon2id$v=19$m=19456,t=2,p=1$")).toBe(true);
    const params = parseOptions(stored);
    expect(params.memoryCost).toBe(ARGON2_PARAMS.memoryCost);
    expect(params.timeCost).toBe(ARGON2_PARAMS.timeCost);
    expect(params.parallelism).toBe(ARGON2_PARAMS.parallelism);
    expect(passwordNeedsRehash(stored)).toBe(false);
  });

  it("verifies the right password and rejects a wrong one", async () => {
    const stored = await hashPassword("kudu river maths");
    expect(await verifyPassword(stored, "kudu river maths")).toEqual({ valid: true, needsRehash: false });
    expect(await verifyPassword(stored, "kudu river math")).toEqual({ valid: false, needsRehash: false });
    expect(await verifyPassword(stored, "")).toEqual({ valid: false, needsRehash: false });
  });

  it("normalises Unicode (NFKC) so composed and decomposed input verify the same", async () => {
    const stored = await hashPassword("café au lait");
    expect((await verifyPassword(stored, "café au lait")).valid).toBe(true);
  });

  it("reports needsRehash for hashes made with older parameters", async () => {
    const weak = await hash("kudu river maths", { memoryCost: 4096, timeCost: 1, parallelism: 1, algorithm: 2 as Algorithm });
    expect(passwordNeedsRehash(weak)).toBe(true);
    expect(await verifyPassword(weak, "kudu river maths")).toEqual({ valid: true, needsRehash: true });
    const argon2i = await hash("kudu river maths", { ...ARGON2_PARAMS, algorithm: 1 as Algorithm });
    expect(passwordNeedsRehash(argon2i)).toBe(true);
  });

  it("treats malformed hashes as a failed verification", async () => {
    expect(await verifyPassword("not-a-hash", "whatever")).toEqual({ valid: false, needsRehash: false });
    expect(passwordNeedsRehash("not-a-hash")).toBe(true);
  });

  it("dummy verification always fails", async () => {
    expect(await verifyDummyPassword("anything at all")).toBe(false);
    expect(await verifyDummyPassword("")).toBe(false);
  });
});
