import { tempAtHeight, chk, rnd, table } from "../lib.mjs";
const T0=30, Td=18; const lcl=125*(T0-Td); const Tl=tempAtHeight(T0,lcl,10); console.log(lcl,Tl);
const T3000 = tempAtHeight(Tl, 3000-lcl, 5); console.log(T3000);
console.log(tempAtHeight(T0,3000,6.5), tempAtHeight(T0,3000,8));
// worked 2: layer ELR
const h=[0,1000,2000], t=[28,21,13]; console.log((t[0]-t[1]), (t[1]-t[2]), (t[0]-t[2])/2);
