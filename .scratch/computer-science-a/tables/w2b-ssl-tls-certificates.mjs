import { createHash } from "node:crypto";
import { mdTable } from "../lib.mjs";
export const digest = (msg, n = 8) => createHash("sha256").update(msg, "utf8").digest("hex").slice(0, n);
/** certificate check: cert { domain, issuer, notBefore, notAfter } against visited domain, date, trusted list */
export function certCheck(cert, visited, today, trusted) {
  const d = (x) => new Date(x + "T00:00:00Z").getTime();
  const reasons = [];
  if (d(today) < d(cert.notBefore)) reasons.push("not valid yet");
  if (d(today) > d(cert.notAfter)) reasons.push("expired");
  if (cert.domain !== visited) reasons.push("domain name does not match");
  if (!trusted.includes(cert.issuer)) reasons.push("issuer not trusted");
  return reasons;
}
if (process.argv[1].endsWith("w2b-ssl-tls-certificates.mjs")) {
  for (const m of ["Pay US$20 to Rudo", "Pay US$200 to Rudo", "Pay US$20 to Rudo."]) console.log(m, digest(m));
  const trusted = ["Zimbabwe Test CA"];
  const rows = [
    [{domain:"www.safepay.example",issuer:"Zimbabwe Test CA",notBefore:"2026-01-10",notAfter:"2027-01-10"},"www.safepay.example","2026-10-10"],
    [{domain:"www.safepay.example",issuer:"Zimbabwe Test CA",notBefore:"2025-01-10",notAfter:"2026-01-10"},"www.safepay.example","2026-10-10"],
    [{domain:"www.safepay.example",issuer:"Zimbabwe Test CA",notBefore:"2026-01-10",notAfter:"2027-01-10"},"www.safepay-login.example","2026-10-10"],
    [{domain:"www.safepay.example",issuer:"Self-made",notBefore:"2026-01-10",notAfter:"2027-01-10"},"www.safepay.example","2026-10-10"],
  ];
  for (const [c,v,t] of rows) console.log(JSON.stringify(certCheck(c,v,t,trusted)));
}
