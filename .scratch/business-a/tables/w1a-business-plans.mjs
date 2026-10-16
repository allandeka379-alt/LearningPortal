import { table, chk, cvp, sum } from "../lib.mjs";
const items = [["Poultry house", 4500], ["Equipment (feeders, drinkers, heaters)", 2800], ["First batch of 500 chicks and feed", 3200], ["Licences and registration", 150], ["Working capital for the first two months", 1350]];
const total = sum(items.map((i) => i[1])); chk(total, 12000);
console.log(table(["Start-up item", "US\$"], [...items, ["Total funding required", total]]));
const own = 5000, loan = total - own; chk(loan, 7000);
const c = cvp({ price: 7.5, variable: 4.5, fixed: 900 });
chk(c.contribution, 3); chk(c.breakEvenUnits, 300);
console.log(c.table([0, 150, 300, 450, 600]));
chk(c.marginOfSafetyUnits(450), 150); chk(c.marginOfSafetyPct(450), 33.3333, 0.001);
