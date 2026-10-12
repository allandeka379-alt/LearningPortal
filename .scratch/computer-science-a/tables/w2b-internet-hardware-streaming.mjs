import { chk, mdTable } from "../lib.mjs";
export const dlSeconds = (megabytes, mbitPerSec) => (megabytes * 8) / mbitPerSec; // decimal MB, Mbit/s
if (process.argv[1].endsWith("w2b-internet-hardware-streaming.mjs")) {
  chk(dlSeconds(90, 12), 60);
  console.log("90MB@12", dlSeconds(90,12));
  const mb = 2.5 * 3600 / 8; chk(mb, 1125); console.log("stream 1h 2.5Mbit/s MB", mb);
  // buffer example
  const need = 4 * 600; const t = need / 3; console.log("needed Mbit", need, "time", t, "prebuffer", t-600);
  console.log(mdTable(["Rate (Mbit/s)","Time for 90 MB (s)"],[2,4,6,12,18].map(r=>[r,dlSeconds(90,r)])));
}
