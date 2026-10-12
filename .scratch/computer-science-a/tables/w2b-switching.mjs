import { chk, mdTable, ipToInt } from "../lib.mjs";
export const HDR = 20, TRL = 4;
export function packetise(bytes, payload) {
  const rows = []; let left = bytes, n = 1;
  while (left > 0) { const p = Math.min(payload, left); rows.push({ n, payload: p, size: p + HDR + TRL }); left -= p; n++; }
  return rows;
}
/** routing-table lookup: table rows [network, prefix, nextHop] without overlaps; falls back to default */
export function lookup(table, dest, def = "default gateway") {
  for (const [net, pre, hop] of table) { const size = 2 ** (32 - pre); if (Math.floor(ipToInt(dest) / size) * size === ipToInt(net)) return hop; }
  return def;
}
if (process.argv[1].endsWith("w2b-switching.mjs")) {
  const r = packetise(4500, 1000);
  console.log(mdTable(["Packet","Payload (bytes)","Size with header and trailer (bytes)"], r.map(x=>[x.n,x.payload,x.size])), r.reduce((a,x)=>a+x.size,0));
  const t = [["172.16.8.0",24,"Router B"],["192.168.40.0",24,"Router C"],["10.0.0.0",8,"Router D"]];
  console.log(lookup(t,"172.16.8.9"), lookup(t,"8.8.8.8"), lookup(t,"10.200.1.1"));
  console.log(64*600, 64*600*0.4);
}
