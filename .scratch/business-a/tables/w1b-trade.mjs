import { table, chk } from "../lib.mjs";
const base = 200, tariff = 15, local = 240, units = 500;
const duty = base * tariff / 100, landed = base + duty;
chk(landed, 230, 1e-9);
console.log(table(["Imported solar panel (per panel)", "No tariff (US\$)", "With a 15% tariff (US\$)"], [["Price at the border", base, base], ["Tariff", 0, duty], ["Cost to the importer", base, landed], ["Price of a locally made panel", local, local], ["Gap in favour of the import", local - base, local - landed]]));
console.log("govt revenue on 500", units * duty);
const ex = 4200000, im = 5100000;
console.log(table(["Trade in goods in a year (fictional country)", "US\$"], [["Value of exports", ex], ["Value of imports", im], ["Trade balance (exports − imports)", ex - im]]));
// gains: exporter sells 3,000 units at US$12 into a free trade area; tariff 10% before
const price = 12, t = 10, q = 3000;
console.log(price * (1 + t / 100), price * (1 + t / 100) * q, price * q, price * q * t / 100);
