import { describe, expect, it } from "vitest";
import { LOGIN_USERNAME_PATTERN } from "@/server/auth/identifiers";
import { passwordPolicyErrors } from "@/server/auth/password-policy";
import {
  asciiLetters,
  chunkRows,
  countOutcomes,
  csvCell,
  findDuplicateRosterRows,
  generateTemporaryPassword,
  invitationState,
  mapRosterHeaders,
  normalizeRosterHeader,
  personName,
  provisionedUsernameCandidate,
  rosterIdentityKey,
  schoolUsernamePrefix,
  seatUsage,
  toCsv,
  validateRosterRecord,
  TEMP_PASSWORD_ALPHABET,
} from "./core";

function sequence(values: number[]): (max: number) => number {
  let i = 0;
  return (max) => (values[i++ % values.length] ?? 0) % max;
}

describe("school-issued usernames", () => {
  it("builds a school prefix from the slug", () => {
    expect(schoolUsernamePrefix("harare-high-school")).toBe("hhs");
    expect(schoolUsernamePrefix("chisipite")).toBe("chis");
    expect(schoolUsernamePrefix("st-johns-college-borrowdale-harare-zw")).toBe("sjcbh");
    expect(schoolUsernamePrefix("x")).toMatch(/^[a-z0-9]{2}$/);
  });

  it("strips accents and non-letters from names", () => {
    expect(asciiLetters("Tafadzwa-Ruvímbo O'Neil")).toBe("tafadzwaruvimbooneil");
  });

  it("produces usernames that match the database CHECK", () => {
    const random = sequence([2, 7, 1, 9]);
    const name = provisionedUsernameCandidate("hhs", "Tendai", "Moyo", random);
    expect(name).toBe("hhs.tmoyo27");
    expect(LOGIN_USERNAME_PATTERN.test(name)).toBe(true);
    const long = provisionedUsernameCandidate("sjcbh", "Nokuthula", "Mhlanga-Ndlovu-Sibanda", random, 4);
    expect(long.length).toBeLessThanOrEqual(32);
    expect(LOGIN_USERNAME_PATTERN.test(long)).toBe(true);
    // A surname without Latin letters falls back to the first name.
    expect(provisionedUsernameCandidate("hhs", "Rudo", "—", random)).toMatch(/^hhs\.rudo\d{2}$/);
  });
});

describe("temporary passwords", () => {
  it("are three groups of four look-alike-free characters that pass the password policy", () => {
    const password = generateTemporaryPassword((max) => Math.floor(Math.random() * max));
    expect(password).toMatch(/^[a-z2-9]{4}-[a-z2-9]{4}-[a-z2-9]{4}$/);
    for (const char of password.replace(/-/g, "")) expect(TEMP_PASSWORD_ALPHABET).toContain(char);
    expect(password).not.toMatch(/[ilo01]/);
    expect(passwordPolicyErrors(password)).toEqual([]);
  });

  it("is never digits only", () => {
    const digitIndex = TEMP_PASSWORD_ALPHABET.indexOf("2");
    expect(generateTemporaryPassword(() => digitIndex)).toMatch(/[a-z]/);
  });
});

describe("roster headers", () => {
  it("normalises and maps known aliases, ignoring unknown columns", () => {
    expect(normalizeRosterHeader("Student No.")).toBe("student_no");
    const { columns, issues } = mapRosterHeaders(["First Name", "Surname", "Form", "Class", "Parent phone", "Favourite colour"]);
    expect(columns).toEqual({ firstName: 0, lastName: 1, form: 2, className: 3, parentPhone: 4 });
    expect(issues).toEqual([expect.objectContaining({ severity: "warning" })]);
  });

  it("requires first and last name columns", () => {
    const { issues } = mapRosterHeaders(["Name only", "Class"]);
    expect(issues.some((issue) => issue.severity === "error")).toBe(true);
  });
});

describe("roster rows", () => {
  it("cleans and normalises a valid row", () => {
    const { value, issues } = validateRosterRecord(2, {
      firstName: "  Tendai ",
      lastName: "Moyo",
      form: "Form 3",
      className: "3B",
      parentPhone: "077 123 4567",
      studentNumber: "HHS/2026/001",
      subjects: "Mathematics; English Language,Biology",
    });
    expect(issues).toEqual([]);
    expect(value).toEqual({
      row: 2,
      firstName: "Tendai",
      lastName: "Moyo",
      form: "Form 3",
      className: "3B",
      email: null,
      phone: null,
      parentPhone: "+263771234567",
      studentNumber: "HHS/2026/001",
      subjects: ["Mathematics", "English Language", "Biology"],
    });
  });

  it("reports missing names, bad contacts and bad numbers as errors", () => {
    const { issues } = validateRosterRecord(5, { firstName: "", lastName: "M0yo", email: "not-an-email", parentPhone: "12", studentNumber: "#1" });
    const fields = issues.filter((issue) => issue.severity === "error").map((issue) => issue.field);
    expect(fields).toEqual(expect.arrayContaining(["firstName", "lastName", "email", "parentPhone", "studentNumber"]));
    expect(issues.every((issue) => issue.row === 5)).toBe(true);
  });

  it("uses the email when both email and phone are given", () => {
    const { value, issues } = validateRosterRecord(3, { firstName: "Rudo", lastName: "Ncube", email: "Rudo@Example.com", phone: "0771234567" });
    expect(value.email).toBe("rudo@example.com");
    expect(value.phone).toBeNull();
    expect(issues).toEqual([expect.objectContaining({ severity: "warning", field: "phone" })]);
  });

  it("finds duplicates by number, contact, or name + class", () => {
    const base = { form: null, email: null, phone: null, parentPhone: null, subjects: [] };
    const rows = [
      { ...base, row: 2, firstName: "Tendai", lastName: "Moyo", className: "3B", studentNumber: null },
      { ...base, row: 3, firstName: "tendai", lastName: "MOYO", className: "3b", studentNumber: null },
      { ...base, row: 4, firstName: "Tendai", lastName: "Moyo", className: "3C", studentNumber: null },
      { ...base, row: 5, firstName: "A", lastName: "B", className: null, studentNumber: "S1" },
      { ...base, row: 6, firstName: "C", lastName: "D", className: null, studentNumber: "s1" },
    ];
    const issues = findDuplicateRosterRows(rows);
    expect(issues.map((issue) => issue.row)).toEqual([3, 6]);
    expect(rosterIdentityKey(rows[0]!)).toBe(rosterIdentityKey(rows[1]!));
  });
});

describe("CSV", () => {
  it("quotes, escapes and neutralises formulas", () => {
    expect(csvCell('He said "hi", then left')).toBe('"He said ""hi"", then left"');
    expect(csvCell("=HYPERLINK(1)")).toBe("'=HYPERLINK(1)");
    expect(csvCell("@cmd")).toBe("'@cmd");
    expect(csvCell(-5)).toBe("-5");
    expect(csvCell(null)).toBe("");
    const csv = toCsv(["A", "B"], [["x", 1], ["line\nbreak", null]]);
    expect(csv.startsWith("﻿A,B\r\n")).toBe(true);
    expect(csv).toContain('"line\nbreak",');
  });
});

describe("helpers", () => {
  it("computes seat usage honestly", () => {
    expect(seatUsage({ seats: 100, allocated: 40, activeStudents: 55 })).toEqual({ purchased: 100, allocated: 40, available: 60, studentsWithoutSeat: 15, usedPercent: 40 });
    expect(seatUsage({ seats: null, allocated: 0, activeStudents: 3 }).usedPercent).toBeNull();
  });

  it("derives invitation state", () => {
    const now = new Date("2026-10-05T10:00:00Z");
    const future = new Date("2026-10-10T00:00:00Z");
    expect(invitationState({ acceptedAt: null, revokedAt: null, expiresAt: future }, now)).toBe("PENDING");
    expect(invitationState({ acceptedAt: now, revokedAt: null, expiresAt: future }, now)).toBe("ACCEPTED");
    expect(invitationState({ acceptedAt: null, revokedAt: now, expiresAt: future }, now)).toBe("REVOKED");
    expect(invitationState({ acceptedAt: null, revokedAt: null, expiresAt: now }, now)).toBe("EXPIRED");
  });

  it("names people without contact details and counts outcomes", () => {
    expect(personName({ firstName: "Tendai", lastName: "Moyo", displayName: "T" })).toBe("Tendai Moyo");
    expect(personName({ displayName: "Teacher T" })).toBe("Teacher T");
    expect(personName(null, "Student")).toBe("Student");
    expect(countOutcomes(["create", "create", "skip"])).toEqual({ create: 2, invite: 0, existing: 0, skip: 1, error: 0 });
    expect(chunkRows([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
  });
});
