import { table, headed, r2, sum, check, U } from "./w4a-lib.mjs";
const ord = 300000, ordNom = 1, pref = 50000, prefRate = 6, ordDivPS = 0.08;
const prefDiv = r2(pref * prefRate / 100), ordDiv = r2(ord * ordDivPS);
console.log(table(["Dividend", `Calculation`, `${U}`], [["Preference dividend", "50,000 × US\$1 × 6%", prefDiv], ["Ordinary dividend", "300,000 shares × US\$0.08", ordDiv], ["**Total dividends**", "", r2(prefDiv + ordDiv)]]));
// Example 2: equity
const eq = [["Ordinary shares of US\$1 each, fully paid", 300000], ["6% preference shares of US\$1 each", 50000], ["General reserve", 40000], ["Retained earnings", 62500]];
const tot = sum(eq.map(x => x[1]));
console.log(headed("Masvingo Hardware Limited", "Statement of financial position (extract)", "at 31 December 2025", [["**Equity**", null, null], ...eq.map(([l, a], i) => [l, a, i === eq.length - 1 ? tot : null]), ["**Non-current liabilities**", null, null], ["8% debentures (repayable 2032)", null, 100000], ["", null, r2(tot + 100000)]], { checks: [["eq", tot, 452500]] }));
console.log(r2(100000 * 0.08));
// called-up example
console.log(table(["", `${U}`], [["Authorised: 1,000,000 ordinary shares of US\$0.50", 500000], ["Issued: 600,000 ordinary shares of US\$0.50", 300000], ["Called up: US\$0.40 per share", 240000], ["Paid up (calls received)", 236000], ["Calls in arrear", r2(240000 - 236000)]]));
