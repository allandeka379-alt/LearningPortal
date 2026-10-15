import { currentAccount, fmt, chk } from "../lib.mjs";
const ca = currentAccount({ goods:[5200,6100], services:[900,1250], primary:[300,640], secondary:[1100,260] });
console.log(ca.md); console.log(ca.goods, ca.services, ca.primary, ca.secondary, ca.total, ca.goods+ca.services);
const ca2 = currentAccount({ goods:[4300,3900], services:[700,800], primary:[250,310], secondary:[400,90] });
console.log(ca2.md); console.log(ca2.goods, ca2.services, ca2.primary, ca2.secondary, ca2.total, ca2.goods+ca2.services);
