import { mdTable, chk, round } from "../lib.mjs";
export const HDR = { tcp: 20, ip: 20, eth: 14 + 4 };
/** Splits `bytes` of application data into segments of at most `mss` payload bytes; returns rows */
export function encapsulate(bytes, mss = 1460) {
  const rows = []; let left = bytes, n = 1;
  while (left > 0) { const p = Math.min(mss, left); rows.push({ n, payload: p, segment: p + HDR.tcp, packet: p + HDR.tcp + HDR.ip, frame: p + HDR.tcp + HDR.ip + HDR.eth }); left -= p; n++; }
  return rows;
}
if (process.argv[1].endsWith("w2b-osi-tcpip-models.mjs")) {
  const r = encapsulate(4000);
  console.log(mdTable(["Segment","Data (bytes)","Segment (bytes)","Packet (bytes)","Frame (bytes)"], r.map(x=>[x.n,x.payload,x.segment,x.packet,x.frame])));
  const total = r.reduce((a,x)=>a+x.frame,0); console.log(total, total-4000, round((total-4000)/total*100,1));
}
