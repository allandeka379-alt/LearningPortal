import { describe, expect, it } from "vitest";
import { normaliseZimbabweMobile } from "@/server/billing/checkout";
import { isZimbabweMobile, toZimbabweE164 } from "./phone";

describe("toZimbabweE164", () => {
  it("accepts local, international and +263 forms, ignoring spaces, dashes, dots and brackets", () => {
    expect(toZimbabweE164("0771 234 567")).toBe("+263771234567");
    expect(toZimbabweE164("0712-345-678")).toBe("+263712345678");
    expect(toZimbabweE164("263 78 123 4567")).toBe("+263781234567");
    expect(toZimbabweE164("+263 (77) 123.4567")).toBe("+263771234567");
  });

  it("rejects landlines, foreign numbers, short or long numbers and empty input", () => {
    for (const input of ["0242 123 456", "+27 82 123 4567", "077123456", "07712345678", "", null, undefined, "phone"]) {
      expect(toZimbabweE164(input)).toBeNull();
      expect(isZimbabweMobile(input)).toBe(false);
    }
  });

  it("agrees with the server-side rule used by the checkout service", () => {
    for (const input of ["0771234567", "+263 71 234 5678", "263731234567", "0242123456", "+2637712345", "07 7123 4567"]) {
      expect(toZimbabweE164(input)).toBe(normaliseZimbabweMobile(input));
    }
  });
});
