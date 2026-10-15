import { currentAccount, termsOfTrade, table, chk, roundTo, pctChange } from "../lib.mjs";
// ZIM P2: Mbira
const ca = currentAccount({ goods:[3900,4650], services:[620,790], primary:[90,420], secondary:[1150,130] });
console.log(ca.md, ca.goods, ca.services, ca.goods+ca.services, ca.primary, ca.secondary, ca.total);
console.log(termsOfTrade(118,131), pctChange(20,26));
// CAM P2: Zandia
const cb = currentAccount({ goods:[5600,6350], services:[1450,1100], primary:[380,720], secondary:[900,160] });
console.log(cb.md, cb.goods, cb.services, cb.goods+cb.services, cb.primary, cb.secondary, cb.total);
console.log(termsOfTrade(124,112), termsOfTrade(112,124), pctChange(100, termsOfTrade(124,112)));
