import { describe, expect, it } from "vitest";
import { generatePublicUsername, PUBLIC_USERNAME_PATTERN } from "./usernames";

describe("generatePublicUsername", () => {
  it("produces handles matching Profile_username_format_chk", () => {
    for (let i = 0; i < 200; i += 1) {
      const name = generatePublicUsername();
      expect(name).toMatch(PUBLIC_USERNAME_PATTERN);
      expect(name).toMatch(/^[a-z]+\d{3}$/);
    }
  });

  it("is deterministic with an injected random source and adds digits on retries", () => {
    const zero = () => 0;
    expect(generatePublicUsername(zero)).toBe("ablebaobab000");
    expect(generatePublicUsername(zero, 2)).toBe("ablebaobab00000");
    expect(generatePublicUsername(zero, 99)).toMatch(/^ablebaobab\d{9}$/);
  });
});
