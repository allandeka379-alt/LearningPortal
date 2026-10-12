import { mdTable, same } from "../lib.mjs";
export function urlParts(s) {
  const u = new URL(s);
  return { scheme: u.protocol.replace(":", ""), host: u.hostname, port: u.port, path: u.pathname, query: u.search.replace("?", ""), fragment: u.hash.replace("#", "") };
}
/** Resolver cache with TTL (seconds): returns rows for lookups at the given times. */
export function ttlSim(ttl, times) {
  let expires = -Infinity; const rows = [];
  for (const t of times) { if (t < expires) rows.push({ t, result: "answered from cache", remaining: expires - t }); else { expires = t + ttl; rows.push({ t, result: "full lookup", remaining: ttl }); } }
  return rows;
}
if (process.argv[1].endsWith("w2b-url-dns.mjs")) {
  const p = urlParts("https://www.kariba-fishing-supplies.co.zw:8443/catalogue/nets?type=gill&size=30#prices");
  console.log(p);
  const r = ttlSim(300, [0, 120, 400, 650]); console.log(r);
  console.log(mdTable(["Request at (s)", "Result"], r.map((x) => [x.t, x.result])), r.filter(x=>x.result==="full lookup").length);
}
