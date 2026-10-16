import { table, chk } from "../lib.mjs";
const loan = 80000, r1 = 9, r2 = 11;
const i1 = loan * r1 / 100, i2 = loan * r2 / 100;
console.log(table(["Bank loan of US\$80,000", "Interest rate (%)", "Yearly interest (US\$)"], [["Before the rise", r1, i1], ["After the rise", r2, i2], ["Increase", r2 - r1, i2 - i1]]));
console.log("pct rise interest", ((i2 - i1) / i1) * 100);
// exchange: imports priced in rand
const randPrice = 36000, e1 = 18, e2 = 20;
console.log(randPrice / e1, randPrice / e2, (randPrice / e1) - (randPrice / e2));
// exporter: price US$ 500 per tonne -> rand
const usdPrice = 500;
console.log(usdPrice * e1, usdPrice * e2);
console.log(table(["Imported machine priced at R36,000", "Rand per US$1", "Cost in US$"], [["Before", e1, randPrice / e1], ["After the rand weakens", e2, randPrice / e2], ["Change", e2 - e1, randPrice / e2 - randPrice / e1]]));
