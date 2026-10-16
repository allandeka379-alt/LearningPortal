import { table, chk, r2 } from "../lib.mjs";
const st = [["Farm (primary)", 0.12, 0.30], ["Mill (secondary)", 0.30, 0.50], ["Packing and shop (tertiary)", 0.50, 0.75]];
const rows = st.map(([n, i, p]) => [n, i.toFixed(2), p.toFixed(2), r2(p - i).toFixed(2)]);
console.log(table(["Stage", "Cost of bought-in inputs (US\$ per kg)", "Selling price (US\$ per kg)", "Value added (US\$ per kg)"], rows, ["l","r","r","r"]));
const tot = st.reduce((s, [, i, p]) => s + (p - i), 0); chk(tot, 0.63); chk(0.75 - 0.12, 0.63);
const raw = 150, dried = 120 * 6, proc = 330; chk(dried, 720); chk(dried - raw - proc, 240);
console.log(table(["Item", "US\$"], [["Sell 1 tonne of raw mangoes", raw], ["Sell 120 kg of dried mango at US\$6", dried], ["Extra revenue from processing", dried - raw], ["Processing costs (energy, packaging, labour)", proc], ["**Extra profit from beneficiation**", dried - raw - proc]]));
