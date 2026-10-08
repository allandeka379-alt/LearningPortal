import { describe, expect, it } from "vitest";
import { fieldErrorsOf, isSafeNavigation, paymentResultHref } from "./checkout-state";

describe("isSafeNavigation", () => {
  it("follows provider https pages and app-relative paths", () => {
    expect(isSafeNavigation("https://www.paynow.co.zw/payment/confirm/abc")).toBe(true);
    expect(isSafeNavigation("http://localhost:3000/dev/sandbox-checkout/1")).toBe(true);
    expect(isSafeNavigation("/app/billing/result?paymentId=1")).toBe(true);
  });

  it("never follows script URLs or protocol-relative / backslash tricks", () => {
    for (const url of ["javascript:alert(1)", "data:text/html,hi", "//evil.example/x", "/\\evil.example", "not a url", ""]) {
      expect(isSafeNavigation(url)).toBe(false);
    }
  });
});

describe("paymentResultHref / fieldErrorsOf", () => {
  it("builds the result page link", () => {
    expect(paymentResultHref("0f8fad5b-d9cb-469f-a165-70867728950e")).toBe("/app/billing/result?paymentId=0f8fad5b-d9cb-469f-a165-70867728950e");
  });

  it("reads field errors from a failed result only", () => {
    const failed = { ok: false as const, error: { code: "VALIDATION", message: "Check the form.", fieldErrors: { phone: ["Enter a number."] } } };
    expect(fieldErrorsOf(failed, "phone")).toEqual(["Enter a number."]);
    expect(fieldErrorsOf(failed, "methodId")).toBeUndefined();
    expect(fieldErrorsOf({ ok: true, data: null }, "phone")).toBeUndefined();
    expect(fieldErrorsOf(null, "phone")).toBeUndefined();
  });
});
