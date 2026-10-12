import { chk, mdTable } from "../lib.mjs";
const links = (n) => n * (n - 1) / 2;
export { links };
if (process.argv[1].endsWith("w2b-topologies-media.mjs")) {
  console.log(mdTable(["Devices", "Links in a full mesh", "Cable ports on each device"], [4,5,6,8,10].map((n)=>[n, links(n), n-1])));
  const d=[3,5,6,8,9,11,12,14]; const star=d.reduce((a,b)=>a+b,0); console.log("star",star, "bus", 20+8*1);
  chk(links(6),15);
}
