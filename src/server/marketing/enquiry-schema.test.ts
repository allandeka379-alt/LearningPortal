import { describe, expect, it } from "vitest";
import { enquiryFromFormData, formatEnquiryText, isLikelyBot, schoolEnquirySchema } from "./enquiry-schema";

const VALID = {
  schoolName: "  Example High School ",
  contactName: "T. Moyo",
  email: "Head@Example.TEST ",
  consent: true,
};

describe("schoolEnquirySchema", () => {
  it("accepts a minimal enquiry, trimming and lower-casing the email", () => {
    const parsed = schoolEnquirySchema.parse(VALID);
    expect(parsed).toMatchObject({ schoolName: "Example High School", contactName: "T. Moyo", email: "head@example.test", boards: [] });
    expect(parsed.phone).toBeUndefined();
    expect(parsed.learners).toBeUndefined();
  });

  it("parses optional fields", () => {
    const parsed = schoolEnquirySchema.parse({
      ...VALID,
      role: "Head of Sciences",
      phone: "+263 77 123 4567",
      learners: "850",
      boards: ["ZIMSEC", "Cambridge", "ZIMSEC"],
      message: "We would like a pilot for Form 4.",
    });
    expect(parsed).toMatchObject({ role: "Head of Sciences", phone: "+263 77 123 4567", learners: 850, boards: ["ZIMSEC", "Cambridge"] });
  });

  it("reports field errors for missing or invalid fields", () => {
    const result = schoolEnquirySchema.safeParse({ schoolName: " ", contactName: "", email: "nope", phone: "12", learners: "many", consent: false });
    expect(result.success).toBe(false);
    const fields = new Set(result.error?.issues.map((issue) => String(issue.path[0])));
    expect(fields).toEqual(new Set(["schoolName", "contactName", "email", "phone", "learners", "consent"]));
  });

  it("rejects out-of-range learner counts and over-long text", () => {
    expect(schoolEnquirySchema.safeParse({ ...VALID, learners: "0" }).success).toBe(false);
    expect(schoolEnquirySchema.safeParse({ ...VALID, message: "x".repeat(2001) }).success).toBe(false);
  });
});

describe("enquiryFromFormData", () => {
  it("reads text fields, repeated board checkboxes and the consent box", () => {
    const form = new FormData();
    form.set("schoolName", "Example High");
    form.set("contactName", "T. Moyo");
    form.set("email", "head@example.test");
    form.append("boards", "ZIMSEC");
    form.append("boards", "Cambridge");
    form.set("consent", "on");
    form.set("website", "");
    const input = enquiryFromFormData(form);
    expect(input).toMatchObject({ schoolName: "Example High", boards: ["ZIMSEC", "Cambridge"], consent: true, website: "" });
    expect(schoolEnquirySchema.safeParse(input).success).toBe(true);
    form.delete("consent");
    expect(enquiryFromFormData(form).consent).toBe(false);
  });
});

describe("isLikelyBot / formatEnquiryText", () => {
  it("flags a filled honeypot", () => {
    expect(isLikelyBot({ website: "http://spam.test" })).toBe(true);
    expect(isLikelyBot({ website: "  " })).toBe(false);
    expect(isLikelyBot({})).toBe(false);
  });

  it("summarises the enquiry as plain text", () => {
    const text = formatEnquiryText(schoolEnquirySchema.parse({ ...VALID, learners: "120", boards: ["ZIMSEC"], message: "Hello" }), "SE-0000ABCD");
    expect(text).toContain("Reference: SE-0000ABCD");
    expect(text).toContain("School: Example High School");
    expect(text).toContain("Approximate learners: 120");
    expect(text).toContain("Examination boards: ZIMSEC");
    expect(text).toContain("Message:\nHello");
    expect(text).not.toContain("Phone:");
  });
});
