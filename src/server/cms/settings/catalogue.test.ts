import { describe, expect, it } from "vitest";
import { RATE_LIMIT_PRESETS } from "@/server/lib/rate-limit";
import { RATE_LIMIT_LABELS, rateLimitPresetDefaults } from "./catalogue";

describe("rate-limit editor catalogue", () => {
  it("labels every preset the admin settings page lists (no raw preset names shown)", () => {
    const presets = Object.keys(rateLimitPresetDefaults());
    expect(presets.sort()).toEqual(Object.keys(RATE_LIMIT_PRESETS).sort());
    for (const name of presets) expect(RATE_LIMIT_LABELS[name], name).toMatch(/\S/);
    expect(Object.keys(RATE_LIMIT_LABELS).filter((name) => !(name in RATE_LIMIT_PRESETS))).toEqual([]);
  });
});
