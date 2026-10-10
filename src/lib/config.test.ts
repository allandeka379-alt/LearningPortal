import { afterEach, describe, expect, it, vi } from "vitest";

async function loadConfig() {
  vi.resetModules();
  return import("./config");
}

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("public config", () => {
  it("falls back to the placeholder brand and support address", async () => {
    vi.stubEnv("NEXT_PUBLIC_APP_NAME", "");
    vi.stubEnv("NEXT_PUBLIC_SUPPORT_EMAIL", "  ");
    const config = await loadConfig();
    expect(config.APP_NAME).toBe("BvunzoHub");
    expect(config.SUPPORT_EMAIL).toBe("support@example.com");
    expect(config.SUPPORT_EMAIL_CONFIGURED).toBe(false);
  });

  it("reads NEXT_PUBLIC_* overrides", async () => {
    vi.stubEnv("NEXT_PUBLIC_APP_NAME", " Zuva ");
    vi.stubEnv("NEXT_PUBLIC_SUPPORT_EMAIL", "help@zuva.example");
    const config = await loadConfig();
    expect(config.APP_NAME).toBe("Zuva");
    expect(config.SUPPORT_EMAIL).toBe("help@zuva.example");
    expect(config.SUPPORT_EMAIL_CONFIGURED).toBe(true);
  });

  it("exposes the regional defaults", async () => {
    const config = await loadConfig();
    expect(config.APP_TAGLINE).toBe("Master Your Exams.");
    expect(config.DEFAULT_TIMEZONE).toBe("Africa/Harare");
    expect(config.DEFAULT_LOCALE).toBe("en-ZW");
    expect(config.DEFAULT_COUNTRY_CODE).toBe("ZW");
    expect(new Intl.DateTimeFormat(config.DEFAULT_LOCALE, { timeZone: config.DEFAULT_TIMEZONE }).resolvedOptions().timeZone).toBe(
      "Africa/Harare",
    );
  });
});
