import { describe, expect, it } from "vitest";
import {
  DEFAULT_TIMEZONE,
  addDays,
  compareLocalDates,
  dateColumnFromLocalDate,
  daysBetween,
  daysUntil,
  eachLocalDate,
  formatLocalDate,
  isLocalDate,
  isValidTimeZone,
  isoWeekKey,
  isoWeekday,
  localDateFromDateColumn,
  localDateString,
  parseLocalDate,
  startOfLocalDay,
  startOfWeek,
  timeZoneOffsetMinutes,
} from "./dates";

describe("isLocalDate / parseLocalDate / formatLocalDate", () => {
  it("accepts real calendar dates only", () => {
    expect(isLocalDate("2026-10-05")).toBe(true);
    expect(isLocalDate("2024-02-29")).toBe(true);
    expect(isLocalDate("2026-02-29")).toBe(false);
    expect(isLocalDate("2026-13-01")).toBe(false);
    expect(isLocalDate("2026-1-5")).toBe(false);
    expect(isLocalDate("2026-10-05T00:00")).toBe(false);
    expect(isLocalDate(20261005)).toBe(false);
  });

  it("round-trips parts", () => {
    expect(parseLocalDate("2026-10-05")).toEqual({ year: 2026, month: 10, day: 5 });
    expect(formatLocalDate({ year: 2026, month: 1, day: 9 })).toBe("2026-01-09");
    expect(() => parseLocalDate("2026-02-30")).toThrow(RangeError);
    expect(() => formatLocalDate({ year: 2026, month: 2, day: 30 })).toThrow(RangeError);
  });
});

describe("localDateString", () => {
  it("defaults to Africa/Harare", () => {
    expect(DEFAULT_TIMEZONE).toBe("Africa/Harare");
  });

  it("switches day at local midnight in Harare (UTC+2), not at UTC midnight", () => {
    expect(localDateString(new Date("2026-10-04T21:59:59.999Z"))).toBe("2026-10-04");
    expect(localDateString(new Date("2026-10-04T22:00:00.000Z"))).toBe("2026-10-05");
    expect(localDateString(new Date("2026-10-05T21:59:59.999Z"))).toBe("2026-10-05");
  });

  it("works for other zones, including negative offsets and DST", () => {
    const instant = new Date("2026-10-05T03:30:00Z");
    expect(localDateString(instant, "UTC")).toBe("2026-10-05");
    expect(localDateString(instant, "America/New_York")).toBe("2026-10-04");
    expect(localDateString(instant, "Asia/Tokyo")).toBe("2026-10-05");
    expect(localDateString(instant.getTime(), "Pacific/Kiritimati")).toBe("2026-10-05");
  });

  it("throws on invalid instants and zones", () => {
    expect(() => localDateString(new Date(Number.NaN))).toThrow(RangeError);
    expect(() => localDateString(new Date(), "Mars/Olympus_Mons")).toThrow(RangeError);
    expect(isValidTimeZone("Africa/Harare")).toBe(true);
    expect(isValidTimeZone("Mars/Olympus_Mons")).toBe(false);
  });
});

describe("timeZoneOffsetMinutes / startOfLocalDay", () => {
  it("reports CAT as +120 all year (no DST)", () => {
    expect(timeZoneOffsetMinutes(new Date("2026-01-15T12:00:00Z"), "Africa/Harare")).toBe(120);
    expect(timeZoneOffsetMinutes(new Date("2026-07-15T12:00:00Z"), "Africa/Harare")).toBe(120);
  });

  it("tracks DST offsets generically", () => {
    expect(timeZoneOffsetMinutes(new Date("2026-01-15T12:00:00Z"), "Europe/London")).toBe(0);
    expect(timeZoneOffsetMinutes(new Date("2026-07-15T12:00:00Z"), "Europe/London")).toBe(60);
    expect(timeZoneOffsetMinutes(new Date("2026-07-15T12:00:00Z"), "America/New_York")).toBe(-240);
    expect(timeZoneOffsetMinutes(new Date("2026-07-15T12:00:00Z"), "Asia/Kolkata")).toBe(330);
  });

  it("returns local midnight as an instant", () => {
    expect(startOfLocalDay("2026-10-05").toISOString()).toBe("2026-10-04T22:00:00.000Z");
    expect(startOfLocalDay("2026-10-05", "UTC").toISOString()).toBe("2026-10-05T00:00:00.000Z");
    expect(startOfLocalDay("2026-07-01", "America/New_York").toISOString()).toBe("2026-07-01T04:00:00.000Z");
    // Day of the US spring-forward transition (02:00 → 03:00): midnight still exists at UTC-5.
    expect(startOfLocalDay("2026-03-08", "America/New_York").toISOString()).toBe("2026-03-08T05:00:00.000Z");
    // Day after the transition is already on UTC-4.
    expect(startOfLocalDay("2026-03-09", "America/New_York").toISOString()).toBe("2026-03-09T04:00:00.000Z");
  });

  it("handles zones whose DST gap starts at midnight (first instant of the day is 01:00)", () => {
    // Cuba springs forward at 00:00 → 01:00 on 2024-03-10.
    const start = startOfLocalDay("2024-03-10", "America/Havana");
    expect(localDateString(start, "America/Havana")).toBe("2024-03-10");
    expect(localDateString(start.getTime() - 1, "America/Havana")).toBe("2024-03-09");
  });

  it("is consistent with localDateString for every day of a year in several zones", () => {
    for (const zone of ["Africa/Harare", "Europe/London", "America/New_York", "Australia/Lord_Howe"]) {
      for (const day of eachLocalDate("2026-01-01", 365)) {
        const start = startOfLocalDay(day, zone);
        expect(localDateString(start, zone)).toBe(day);
        expect(localDateString(start.getTime() - 1, zone)).toBe(addDays(day, -1));
      }
    }
  });
});

describe("DATE column helpers", () => {
  it("never shifts the day, whatever the zone", () => {
    const column = new Date("2027-11-01T00:00:00.000Z");
    expect(localDateFromDateColumn(column)).toBe("2027-11-01");
    expect(dateColumnFromLocalDate("2027-11-01").toISOString()).toBe("2027-11-01T00:00:00.000Z");
    // Contrast: treating it as an instant in a negative-offset zone gives the previous day.
    expect(localDateString(column, "America/New_York")).toBe("2027-10-31");
  });
});

describe("calendar arithmetic", () => {
  it("daysBetween is signed and crosses month/year/leap boundaries", () => {
    expect(daysBetween("2026-10-05", "2026-10-07")).toBe(2);
    expect(daysBetween("2026-10-07", "2026-10-05")).toBe(-2);
    expect(daysBetween("2026-12-31", "2027-01-01")).toBe(1);
    expect(daysBetween("2024-02-28", "2024-03-01")).toBe(2);
    expect(daysBetween("2026-02-28", "2026-03-01")).toBe(1);
    expect(daysBetween("2026-10-05", "2026-10-05")).toBe(0);
  });

  it("is unaffected by DST transitions (pure calendar arithmetic)", () => {
    expect(daysBetween("2026-03-28", "2026-03-30")).toBe(2); // EU spring-forward weekend
    expect(addDays("2026-10-24", 2)).toBe("2026-10-26");
  });

  it("addDays moves forwards and backwards and rejects fractions", () => {
    expect(addDays("2026-10-05", 1)).toBe("2026-10-06");
    expect(addDays("2026-10-05", -5)).toBe("2026-09-30");
    expect(addDays("2026-12-31", 1)).toBe("2027-01-01");
    expect(addDays("2024-02-28", 1)).toBe("2024-02-29");
    expect(addDays("2026-10-05", 0)).toBe("2026-10-05");
    expect(() => addDays("2026-10-05", 0.5)).toThrow(RangeError);
  });

  it("compareLocalDates orders chronologically", () => {
    expect(compareLocalDates("2026-10-05", "2026-10-06")).toBe(-1);
    expect(compareLocalDates("2026-10-06", "2026-10-05")).toBe(1);
    expect(compareLocalDates("2026-10-05", "2026-10-05")).toBe(0);
  });

  it("eachLocalDate lists consecutive days", () => {
    expect(eachLocalDate("2026-12-30", 4)).toEqual(["2026-12-30", "2026-12-31", "2027-01-01", "2027-01-02"]);
    expect(eachLocalDate("2026-12-30", 0)).toEqual([]);
    expect(() => eachLocalDate("2026-12-30", -1)).toThrow(RangeError);
  });
});

describe("weeks", () => {
  it("isoWeekday is Monday-based", () => {
    expect(isoWeekday("2026-10-05")).toBe(1); // Monday
    expect(isoWeekday("2026-10-10")).toBe(6); // Saturday
    expect(isoWeekday("2026-10-11")).toBe(7); // Sunday
    expect(isoWeekday("1970-01-01")).toBe(4); // Thursday
    expect(isoWeekday("1969-12-29")).toBe(1); // before the epoch
  });

  it("startOfWeek returns the Monday on or before the date", () => {
    expect(startOfWeek("2026-10-05")).toBe("2026-10-05");
    expect(startOfWeek("2026-10-11")).toBe("2026-10-05");
    expect(startOfWeek("2026-10-12")).toBe("2026-10-12");
    expect(startOfWeek("2027-01-01")).toBe("2026-12-28");
  });

  it.each([
    ["2026-10-05", "2026-W41"],
    ["2026-10-11", "2026-W41"],
    ["2026-01-01", "2026-W01"],
    ["2025-12-29", "2026-W01"],
    ["2021-01-03", "2020-W53"],
    ["2020-12-31", "2020-W53"],
    ["2024-12-30", "2025-W01"],
    ["2027-01-01", "2026-W53"],
    ["2027-01-04", "2027-W01"],
  ])("isoWeekKey(%s) = %s", (date, key) => {
    expect(isoWeekKey(date)).toBe(key);
  });
});

describe("daysUntil (§17 exam countdown)", () => {
  const exam = "2027-02-06";

  it("counts whole local calendar days, independent of the time of day", () => {
    // 2026-10-05 00:01 and 23:59 in Harare.
    expect(daysUntil(exam, new Date("2026-10-04T22:01:00Z"))).toBe(124);
    expect(daysUntil(exam, new Date("2026-10-05T21:59:00Z"))).toBe(124);
    // One minute later it is 2026-10-06 in Harare (but still the 5th in UTC).
    expect(daysUntil(exam, new Date("2026-10-05T22:00:00Z"))).toBe(123);
  });

  it("is 1 the day before, 0 on exam day and negative afterwards", () => {
    expect(daysUntil(exam, new Date("2027-02-05T10:00:00Z"))).toBe(1);
    expect(daysUntil(exam, new Date("2027-02-06T05:00:00Z"))).toBe(0);
    expect(daysUntil(exam, new Date("2027-02-06T21:59:59Z"))).toBe(0);
    expect(daysUntil(exam, new Date("2027-02-07T10:00:00Z"))).toBe(-1);
  });

  it("respects the student's time zone", () => {
    const now = new Date("2026-10-05T23:30:00Z"); // 6th in Harare, 5th in New York
    expect(daysUntil("2026-10-10", now, "Africa/Harare")).toBe(4);
    expect(daysUntil("2026-10-10", now, "America/New_York")).toBe(5);
  });

  it("accepts an exam instant and converts it in the zone", () => {
    expect(daysUntil(new Date("2026-10-09T23:00:00Z"), new Date("2026-10-05T08:00:00Z"))).toBe(5); // 01:00 on the 10th CAT
  });

  it("rejects malformed exam dates", () => {
    expect(() => daysUntil("2027-02-30", new Date())).toThrow(RangeError);
  });
});
