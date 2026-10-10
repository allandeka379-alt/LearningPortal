import { table } from "../lib.mjs";
const sp = [["$\ce{^{23}_{11}Na}$",23,11,0],["$\ce{^{23}_{11}Na+}$",23,11,1],["$\ce{^{37}_{17}Cl-}$",37,17,-1],["$\ce{^{56}_{26}Fe^3+}$",56,26,3],["$\ce{^{16}_{8}O^2-}$",16,8,-2]];
console.log(table(["Species","Protons","Neutrons","Electrons"], sp.map(([s,A,Z,q])=>[s,Z,A-Z,Z-q])));
// lesson worked example: 81Br- and 79Br
for (const [A,Z,q] of [[81,35,-1],[79,35,0],[52,24,3]]) console.log(A,Z,q,"p",Z,"n",A-Z,"e",Z-q);
