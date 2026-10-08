import { describe, expect, it } from "vitest";
import { isAppError } from "@/server/lib/errors";
import { escapeHtml, renderEmailHtml } from "./email-content";
import { prepareSmsText, SMS_MAX_SEGMENTS, smsNetwork, toSmsRecipient } from "./sms";

describe("toSmsRecipient (E.164, Zimbabwe default)", () => {
  it("normalises the formats people type to +263 and names the network", () => {
    expect(toSmsRecipient("+263771234567")).toEqual({ e164: "+263771234567", network: "econet" });
    expect(toSmsRecipient("0781 234 567")).toEqual({ e164: "+263781234567", network: "econet" });
    expect(toSmsRecipient("263712345678")).toEqual({ e164: "+263712345678", network: "netone" });
    expect(toSmsRecipient("0731234567").network).toBe("telecel");
    expect(toSmsRecipient("+263 79 123 4567").network).toBe("zw-other");
    expect(toSmsRecipient("+27821234567")).toEqual({ e164: "+27821234567", network: "international" });
    expect(smsNetwork("+447700900123")).toBe("international");
  });

  it("refuses malformed numbers and Zimbabwean fixed lines", () => {
    for (const to of ["", "abc", "+2637712345", "+26377123456789", "+263242123456", "0242123456"]) {
      let caught: unknown = null;
      try {
        toSmsRecipient(to);
      } catch (error) {
        caught = error;
      }
      expect(isAppError(caught) && caught.code, to).toBe("BAD_REQUEST");
    }
  });
});

describe("prepareSmsText", () => {
  it("keeps plain OTP text in one GSM-7 segment", () => {
    const text = "Your sign-in code is 042917. It expires in 10 minutes. Never share this code with anyone.";
    expect(prepareSmsText(text)).toEqual({ text, encoding: "GSM-7", segments: 1, clipped: false });
  });

  it("maps typographic characters to GSM-7 instead of falling back to UCS-2", () => {
    const prepared = prepareSmsText("It’s time — “practice”… now");
    expect(prepared.text).toBe('It\'s time - "practice"... now');
    expect(prepared.encoding).toBe("GSM-7");
  });

  it("counts extension characters twice and multipart segments at 153 / 67", () => {
    expect(prepareSmsText("€".repeat(80)).segments).toBe(1); // 160 septets
    expect(prepareSmsText("€".repeat(81)).segments).toBe(2); // 162 septets
    expect(prepareSmsText("a".repeat(161)).segments).toBe(2);
    expect(prepareSmsText("a".repeat(307)).segments).toBe(3);
    const ucs2 = prepareSmsText(`Mhoro 👋 ${"a".repeat(70)}`);
    expect(ucs2.encoding).toBe("UCS-2");
    expect(ucs2.segments).toBe(2);
  });

  it("clips bodies longer than the segment cap", () => {
    const gsm = prepareSmsText("word ".repeat(400));
    expect(gsm.clipped).toBe(true);
    expect(gsm.segments).toBeLessThanOrEqual(SMS_MAX_SEGMENTS);
    expect(gsm.text.endsWith("...")).toBe(true);
    expect(gsm.text.length).toBeLessThanOrEqual(SMS_MAX_SEGMENTS * 153);

    const ucs2 = prepareSmsText("ñandú 🦉 ".repeat(200));
    expect(ucs2.clipped).toBe(true);
    expect(ucs2.encoding).toBe("UCS-2");
    expect(ucs2.text.length).toBeLessThanOrEqual(SMS_MAX_SEGMENTS * 67);
    expect(ucs2.segments).toBe(SMS_MAX_SEGMENTS);
  });
});

describe("renderEmailHtml", () => {
  it("escapes everything and only links http(s) URLs", () => {
    const html = renderEmailHtml('Line one\nLine <two>\n\njavascript:alert(1) "quoted" https://x.example/a?b=1&c=2, ok', { subject: "S <1>" });
    expect(html).toContain("<title>S &lt;1&gt;</title>");
    expect(html).toContain("Line one<br>Line &lt;two&gt;</p>");
    expect(html).toContain('<a href="https://x.example/a?b=1&amp;c=2">https://x.example/a?b=1&amp;c=2</a>, ok');
    expect(html).toContain("javascript:alert(1) &quot;quoted&quot;");
    expect(html).not.toContain('href="javascript');
    expect(escapeHtml(`<a href='x'>&</a>`)).toBe("&lt;a href=&#39;x&#39;&gt;&amp;&lt;/a&gt;");
  });
});
