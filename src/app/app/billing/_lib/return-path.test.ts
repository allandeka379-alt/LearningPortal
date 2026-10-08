import { describe, expect, it } from "vitest";
import { CHECKOUT_RESULT_PATH } from "@/server/billing/checkout";
import { PARENT_PAYMENT_RESULT_PATH } from "@/server/family/billing";
import { resultPathForParties } from "./return-path";

const STUDENT = "11111111-1111-4111-8111-111111111111";
const PARENT = "22222222-2222-4222-8222-222222222222";

describe("resultPathForParties", () => {
  it("sends a student who paid for themselves to the student result page", () => {
    expect(resultPathForParties({ payerUserId: STUDENT, beneficiaryUserId: STUDENT })).toBe(CHECKOUT_RESULT_PATH);
  });

  it("sends a parent who paid for a child to the parent result page", () => {
    expect(resultPathForParties({ payerUserId: PARENT, beneficiaryUserId: STUDENT })).toBe(PARENT_PAYMENT_RESULT_PATH);
  });

  it("uses the parent page for the payer (or an anonymous caller), the student page for any other signed-in caller", () => {
    const parties = { payerUserId: PARENT, beneficiaryUserId: STUDENT };
    expect(resultPathForParties(parties, PARENT)).toBe(PARENT_PAYMENT_RESULT_PATH);
    expect(resultPathForParties(parties, null)).toBe(PARENT_PAYMENT_RESULT_PATH);
    expect(resultPathForParties(parties, STUDENT)).toBe(CHECKOUT_RESULT_PATH);
    expect(resultPathForParties(parties, "33333333-3333-4333-8333-333333333333")).toBe(CHECKOUT_RESULT_PATH);
    expect(resultPathForParties({ payerUserId: STUDENT, beneficiaryUserId: STUDENT }, STUDENT)).toBe(CHECKOUT_RESULT_PATH);
  });

  it("school payments (no beneficiary) and unknown payments use the student page, which reveals nothing to strangers", () => {
    expect(resultPathForParties({ payerUserId: PARENT, beneficiaryUserId: null })).toBe(CHECKOUT_RESULT_PATH);
    expect(resultPathForParties(null)).toBe(CHECKOUT_RESULT_PATH);
  });
});
