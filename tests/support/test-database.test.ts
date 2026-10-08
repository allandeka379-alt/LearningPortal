import { describe, expect, it } from "vitest";
import { UnsafeTestDatabaseError, assertTestDatabaseUrl, databaseNameFromUrl } from "./test-database";

describe("databaseNameFromUrl", () => {
  it.each([
    ["postgresql://postgres@localhost:5433/zimstudy_test", "zimstudy_test"],
    ["postgres://u:p@db:5432/app_test?schema=public", "app_test"],
    ["postgresql://localhost/my%20db_test", "my db_test"],
    ["postgresql://localhost:5432/", null],
    ["mysql://localhost/app_test", null],
    ["not a url", null],
  ])("%s -> %s", (url, expected) => {
    expect(databaseNameFromUrl(url)).toBe(expected);
  });
});

describe("assertTestDatabaseUrl", () => {
  it("accepts *_test databases", () => {
    const url = "postgresql://postgres@localhost:5433/zimstudy_test";
    expect(assertTestDatabaseUrl(url)).toBe(url);
  });

  it.each([
    [undefined, /not set/],
    ["", /not set/],
    ["postgresql://postgres@localhost:5433/zimstudy", /does not end with "_test"/],
    ["postgresql://postgres@localhost:5433/zimstudy_test_backup", /does not end with "_test"/],
    ["postgresql://postgres@localhost:5433/", /not a valid/],
  ])("rejects %s", (url, message) => {
    expect(() => assertTestDatabaseUrl(url)).toThrow(UnsafeTestDatabaseError);
    expect(() => assertTestDatabaseUrl(url)).toThrow(message);
  });

  it("names the variable in the error", () => {
    expect(() => assertTestDatabaseUrl(undefined, "MY_URL")).toThrow(/MY_URL/);
  });
});
