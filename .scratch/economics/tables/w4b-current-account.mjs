// Tables for lessons/bop/current-account.md (W4b).
import { currentAccount, table, fmt, check } from "../lib.mjs";
const ca = currentAccount({ goods: [4200, 5100], services: [900, 1150], primary: [300, 850], secondary: [1400, 200] });
console.log(ca.md); console.log(ca.goods, ca.services, ca.primary, ca.secondary, ca.total);
check("tot", ca.total, -500);
// WE2: missing figure — find visible imports given balances.
const exportsG = 2600, services = -180, primary = -420, secondary = 650, total = -350;
const goodsBal = total - services - primary - secondary; const importsG = exportsG - goodsBal;
console.log("goodsBal", goodsBal, "imports", importsG);
const ca2 = currentAccount({ goods: [exportsG, importsG], services: [520, 700], primary: [80, 500], secondary: [700, 50] });
console.log(ca2.md, ca2.total); check("t2", ca2.total, total);
