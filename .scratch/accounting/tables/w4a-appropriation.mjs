import { appropriation, headed, r2, sum, check } from "./w4a-lib.mjs";
// Example 1: Tatenda and Nyasha, transport, Masvingo
const capT = 40000, capN = 25000;
const e1 = appropriation({ name: "T & N Transport", partners: ["Tatenda", "Nyasha"], profit: 31620, iod: [360, 240], ioc: [r2(capT * 0.06), r2(capN * 0.06)], salary: [0, 4800], ratio: [3, 2] });
console.log(e1.md); console.log(e1.residual, e1.shares, e1.credits);
// Example 2: loan interest + residual loss
const draft = 14250, loanInt = r2(10000 * 0.08);
const profit = r2(draft - loanInt);
console.log(headed("Chipo and Sipho Hardware", "Income statement (extract)", "for the year ended 31 December 2025", [["Profit before interest on partner's loan", null, draft], ["Less: Interest on loan: Sipho (8% × 10,000)", null, -loanInt], ["**Profit for the year**", null, profit]], { checks: [["p", profit, draft - loanInt]] }));
const e2 = appropriation({ name: "Chipo and Sipho Hardware", partners: ["Chipo", "Sipho"], profit, ioc: [3000, 2000], salary: [6000, 4000], ratio: [1, 1] });
console.log(e2.md); console.log(e2.residual, e2.shares, e2.credits, sum(e2.credits));
