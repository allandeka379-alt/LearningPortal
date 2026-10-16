import { table, chk, invest } from "../lib.mjs";
const rate = 5, manualH = 30, softH = 4, sub = 40, equip = 900;
const manual = rate * manualH * 12, soft = (rate * softH + sub) * 12, saving = manual - soft;
console.log(table(["Yearly cost of payroll", "Manual (US\$)", "Computerised (US\$)"], [["Clerk's time (US$5 an hour)".replace("US$5", "US\$5"), manual, rate * softH * 12], ["Software subscription (US\$40 a month)", 0, sub * 12], ["Total yearly cost", manual, soft], ["Yearly saving", "", saving]]));
console.log(manual, soft, saving, equip / saving, (equip / saving) * 12, invest.payback(equip, [saving, saving]));
