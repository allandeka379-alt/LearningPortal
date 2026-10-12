import { subnet, ipBinary, ipv6Abbrev, mdTable, chk, intToIp, ipToInt } from "../lib.mjs";
export const prefixTable = [24,25,26,27,28,29,30].map((p)=>{const s=subnet("10.0.0.0",p);return [`/${p}`,s.mask,s.addresses,s.hosts]});
if (process.argv[1].endsWith("w2b-ip-addressing.mjs")) {
  const s = subnet("192.168.14.77", 26);
  console.log(s, ipBinary("192.168.14.77"), ipBinary(s.mask), ipBinary(s.network));
  console.log(mdTable(["Subnet","Network address","First host","Last host","Broadcast"],[0,1,2,3].map(i=>{const x=subnet(intToIp(ipToInt("192.168.14.0")+i*64),26);return [i+1,x.network+"/26",x.first,x.last,x.broadcast]})));
  console.log(mdTable(["Prefix","Subnet mask","Addresses","Usable hosts"],prefixTable));
  console.log(ipv6Abbrev("2001:0db8:0000:0000:0a00:0000:0000:0001"), ipv6Abbrev("2001:0db8:0000:0000:0000:0000:0000:0001"), ipv6Abbrev("fe80:0000:0000:0000:0202:b3ff:fe1e:8329"));
  console.log(2**32, 2**128 === 3.402823669209385e38);
  // hosts for 50-computer needing subnet
  console.log(subnet("172.16.5.9",20));
}
