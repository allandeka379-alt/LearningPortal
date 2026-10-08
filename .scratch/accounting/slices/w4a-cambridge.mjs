// W4a: Cambridge 0452 Paper 2 exam-format items (20 marks): limited company equity; partnership appropriation and
// current accounts. Both end with an advise/evaluate part.
import { concept, P, money, r2, sum, check, CAM } from "../lib.mjs";
import { appropriation, columnar, soce, headed, table, fmt, U } from "../tables/w4a-lib.mjs";

concept("acc.companies.financial-statements", { file: "exam/w4a-cambridge", keyPrefix: "exam.w4a-cambridge", applies: CAM }, (b) => {
  // ------------------------------------------------------------------ 1. Limited company: profit, statement of changes in equity, equity
  {
    const pfo = 118400, deb = 70000, debRate = 9, debMonths = 9, debPaid = 3150;
    const debInt = r2(deb * debRate / 100 * debMonths / 12);
    const owing = r2(debInt - debPaid);
    const profit = r2(pfo - debInt);
    const nom = 0.25;
    const open = [350000, 52000, 74300];
    const oldShares = r2(open[0] / nom), newShares = 320000;
    const issue = r2(newShares * nom);
    const finalDiv = r2(oldShares * 0.045), interim = r2((oldShares + newShares) * 0.025);
    const divs = r2(finalDiv + interim);
    const tr = 30000;
    const s = soce("Harare Printers Limited", ["Ordinary share capital", "General reserve", "Retained earnings"], open, [["Issue of ordinary shares", [issue, null, null]], ["Profit for the year", [null, null, profit]], ["Dividends paid", [null, null, -divs]], ["Transfer to general reserve", [null, tr, -tr]]]);
    check("owing", owing, 1575);
    b.struct({
      d: 5, secs: 1260, examStyle: true, skill: "ANALYSIS", calculator: true,
      concepts: ["acc.companies.financial-statements", "acc.companies.share-capital"],
      stem: `Harare Printers Limited prepares its financial statements to 31 December. At 1 January 2025 its equity was:\n\n${table(["", U], [["Ordinary shares of US\\$0.25 each, fully paid", open[0]], ["General reserve", open[1]], ["Retained earnings", open[2]]])}\n\nThe following information is available for the year ended 31 December 2025:\n\n1. The profit from operations was ${money(pfo)}.\n2. On 1 April 2025 the company issued ${money(deb)} of ${debRate}% debentures, repayable in 2035. Debenture interest of ${money(debPaid)} was paid during the year; no other interest has been recorded.\n3. On 1 July 2025, 320,000 ordinary shares of US\\$0.25 each were issued at par for cash.\n4. In April 2025 the final dividend for 2024 of US\\$0.045 per share was paid. In October 2025 an interim dividend of US\\$0.025 per share was paid.\n5. The directors transferred ${money(tr)} to the general reserve.`,
      parts: [
        P.num({ label: "(a)", marks: 3, kind: "money", value: profit, wrong: [r2(pfo - deb * debRate / 100), r2(pfo - debPaid)], stem: "Calculate the profit for the year.", explanation: `Debentures were in issue for 9 months: ${fmt(deb)} × ${debRate}% × 9/12 = ${fmt(debInt)} (of which ${fmt(owing)} is owing). Profit for the year = ${fmt(pfo)} − ${fmt(debInt)} = ${fmt(profit)}. A full year's interest gives ${fmt(r2(pfo - deb * debRate / 100))}; deducting only the interest paid gives ${fmt(r2(pfo - debPaid))}.` }),
        P.num({ label: "(b)", marks: 3, kind: "money", value: divs, wrong: [r2((oldShares + newShares) * 0.07), r2(oldShares * 0.07)], stem: "Calculate the total dividends paid during 2025.", explanation: `Final: ${oldShares.toLocaleString("en-GB")} shares × 0.045 = ${fmt(finalDiv)} (paid before the new issue). Interim: ${(oldShares + newShares).toLocaleString("en-GB")} shares × 0.025 = ${fmt(interim)}. Total ${fmt(divs)}.` }),
        P.manual({ label: "(c)", marks: 6, type: "EXTENDED_RESPONSE", stem: "Prepare the statement of changes in equity for the year ended 31 December 2025.", points: ["Heading; columns for share capital, general reserve, retained earnings and total; opening balances", `Share issue ${fmt(issue)}`, `Profit for the year ${fmt(profit)} (own figure)`, `Dividends paid (${fmt(divs)}) (own figure)`, `Transfer ${fmt(tr)} into the general reserve and out of retained earnings`, `Closing balances ${fmt(s.closing[0])}, ${fmt(s.closing[1])}, ${fmt(s.closing[2])}`], modelAnswer: s.md, explanation: "Each change is entered in its own column; the transfer nets to nil." }),
        P.num({ label: "(d)", marks: 2, kind: "money", value: s.closing[2], wrong: [r2(s.closing[2] + tr)], stem: "State the retained earnings at 31 December 2025.", explanation: `${fmt(open[2])} + ${fmt(profit)} − ${fmt(divs)} − ${fmt(tr)} = ${fmt(s.closing[2])}.` }),
        P.num({ label: "(e)", marks: 3, kind: "money", value: s.totalClose, wrong: [r2(s.totalClose + deb), r2(s.totalClose - tr)], stem: "Calculate the total equity at 31 December 2025.", explanation: `${fmt(s.closing[0])} + ${fmt(s.closing[1])} + ${fmt(s.closing[2])} = ${fmt(s.totalClose)}. The debentures (${fmt(deb)}) are a non-current liability, not equity.` }),
        P.manual({ label: "(f)", marks: 3, stem: "A shareholder argues that the company should have paid the US\\$30,000 transferred to the general reserve as an extra dividend. Evaluate this view and give a conclusion.", points: ["For: shareholders would receive more income now", "Against: retaining profit funds growth / replacement of printing machines / reduces the need to borrow, and the company now has debenture interest to meet", "Justified conclusion, e.g. the transfer is sensible because the company is expanding and has new debt; shareholders may gain later through higher profits"], modelAnswer: "Paying the US\\$30,000 out would increase shareholders' income this year. However, the company has just taken on debentures and expanded its share capital, so keeping profits strengthens it, helps finance new equipment and lowers the need for more borrowing. On balance the transfer is sensible, as it should lead to higher profits and dividends in future.", hints: ["Weigh income now against the company's needs."], explanation: "Evaluation weighs current dividends against financial strength and growth." }),
      ],
      hints: ["Debenture interest runs only from the date of issue.", "Each dividend is paid on the shares in issue on its payment date."],
      explanation: `Model answer:\n\n${s.md}\n\nDebenture interest owing of ${fmt(owing)} is a current liability (other payables).`,
    });
  }

  // ------------------------------------------------------------------ 2. Partnership: appropriation account and current accounts, with evaluation
  {
    const partners = ["Thandeka", "Sipho"];
    const capOpen = [42000, 26000], extra = 8000; // Sipho introduced 8,000 on 1 October 2025
    const iocRate = 8;
    const ioc = [r2(capOpen[0] * iocRate / 100), r2(capOpen[1] * iocRate / 100 + extra * iocRate / 100 * 3 / 12)];
    const profit = 39280;
    const sal = [7500, 0];
    const a = appropriation({ name: "Thandeka and Sipho", partners, profit, ioc, salary: sal, ratio: [1, 1] });
    const draws = [18450, 24300];
    const c = columnar("Current accounts", partners, [["31 Dec 2025", "Drawings", draws]], [["1 Jan 2025", "Balance b/d", [1680, 940]], ["31 Dec 2025", "Interest on capital", ioc], ["31 Dec 2025", "Salary", [7500, null]], ["31 Dec 2025", "Share of profit", a.shares]]);
    check("sipho debit", c.closing[1] < 0, true);
    const capClose = [capOpen[0], r2(capOpen[1] + extra)];
    const totalPartners = r2(sum(capClose) + sum(c.closing));
    const ext = headed("Thandeka and Sipho", "Statement of financial position (extract)", "at 31 December 2025", [["**Capital accounts**", null, null], ["Thandeka", capClose[0], null], ["Sipho", capClose[1], sum(capClose)], ["**Current accounts**", null, null], ["Thandeka", c.closing[0], null], ["Sipho", c.closing[1], sum(c.closing)], ["", null, totalPartners]], { checks: [["tot", totalPartners, sum(capClose) + sum(c.closing)]] });
    b.struct({
      d: 5, secs: 1260, examStyle: true, skill: "ANALYSIS", calculator: true,
      concepts: ["acc.partnerships.appropriation", "acc.partnerships.capital-current-accounts", "acc.partnerships.formation"],
      stem: `Thandeka and Sipho run a building materials business in Gweru. Their partnership agreement provides for:\n\n- interest on capital at ${iocRate}% per annum;\n- a salary for Thandeka of ${money(7500)} per annum;\n- profits and losses shared equally.\n\nAt 1 January 2025 their capital accounts were Thandeka ${money(capOpen[0])} and Sipho ${money(capOpen[1])}. On 1 October 2025 Sipho paid a further ${money(extra)} of capital into the business bank account. Their current accounts at 1 January 2025 had credit balances of Thandeka ${money(1680)} and Sipho ${money(940)}.\n\nThe profit for the year ended 31 December 2025 was ${money(profit)}. Drawings were Thandeka ${money(draws[0])} and Sipho ${money(draws[1])}.`,
      parts: [
        P.num({ label: "(a)", marks: 3, kind: "money", value: ioc[1], wrong: [r2((capOpen[1] + extra) * iocRate / 100), r2(capOpen[1] * iocRate / 100)], stem: "Calculate Sipho's interest on capital for the year.", explanation: `${fmt(capOpen[1])} × 8% = ${fmt(r2(capOpen[1] * 0.08))}; ${fmt(extra)} × 8% × 3/12 = ${fmt(r2(extra * 0.08 / 4))}; total ${fmt(ioc[1])}. A full year on ${fmt(capOpen[1] + extra)} gives ${fmt(r2((capOpen[1] + extra) * 0.08))}.` }),
        P.num({ label: "(b)", marks: 2, kind: "money", value: a.residual, wrong: [r2(profit - a.iocTot)], stem: "Calculate the residual profit.", explanation: `${fmt(profit)} − interest on capital ${fmt(a.iocTot)} − salary ${fmt(7500)} = ${fmt(a.residual)}.` }),
        P.manual({ label: "(c)", marks: 5, type: "EXTENDED_RESPONSE", stem: "Prepare the appropriation account for the year ended 31 December 2025.", points: ["Heading and profit for the year", `Interest on capital: Thandeka ${fmt(ioc[0])}, Sipho ${fmt(ioc[1])} (own figure)`, `Salary: Thandeka ${fmt(7500)}`, `Residual profit ${fmt(a.residual)} (own figure)`, `Equal shares of ${fmt(a.shares[0])} each`], modelAnswer: a.md, explanation: "Interest and salary first, then equal shares." }),
        P.fib({ label: "(d)", marks: 4, stem: "Complete the current account balances at 31 December 2025 (amounts without commas or brackets).", template: "Thandeka: US\\$ {{blank:t}} credit. Sipho: US\\$ {{blank:s}} debit.", blanks: [{ id: "t", accepted: [String(c.closing[0])], marks: 2, normalise: ["trim", "strip_punctuation"] }, { id: "s", accepted: [String(-c.closing[1])], marks: 2, normalise: ["trim", "strip_punctuation"] }], explanation: `Thandeka: 1,680 + ${fmt(ioc[0])} + 7,500 + ${fmt(a.shares[0])} − ${fmt(draws[0])} = ${fmt(c.closing[0])} credit. Sipho: 940 + ${fmt(ioc[1])} + ${fmt(a.shares[1])} − ${fmt(draws[1])} = (${fmt(-c.closing[1])}), a debit balance.\n\n${c.md}` }),
        P.num({ label: "(e)", marks: 3, kind: "money", value: totalPartners, wrong: [r2(sum(capClose) + c.closing[0] - c.closing[1]), r2(sum(capOpen) + sum(c.closing))], stem: "Calculate the total of the partners' capital and current accounts in the statement of financial position at 31 December 2025.", explanation: `Capitals ${fmt(capClose[0])} + ${fmt(capClose[1])} = ${fmt(sum(capClose))}; current accounts ${fmt(c.closing[0])} − ${fmt(-c.closing[1])} = ${fmt(sum(c.closing))}; total ${fmt(totalPartners)}. Adding Sipho's debit balance gives ${fmt(r2(sum(capClose) + c.closing[0] - c.closing[1]))}.` }),
        P.manual({ label: "(f)", marks: 3, stem: "Thandeka suggests adding interest on drawings at 10% per annum to the agreement from 2026. Advise Sipho whether he should agree. Justify your answer.", points: ["Interest on drawings would be charged to Sipho, who draws more and already has a debit current account balance", "But it would discourage over-drawing, protect the firm's cash / working capital and be fairer to Thandeka", "Justified conclusion, e.g. agree, since his drawings exceed his share of profit, but negotiate the rate / timing"], modelAnswer: "Sipho would pay more than Thandeka because he draws more, and his current account is already in debit. However, his drawings exceed his share of profit, which drains the firm's cash, so a charge on drawings is fair and would protect working capital. He should agree, perhaps negotiating a lower rate, and reduce his drawings.", hints: ["Look at Sipho's current account balance."], explanation: "Advice should use the figures: Sipho's debit balance shows over-drawing." }),
      ],
      hints: ["Interest on capital introduced part-way through the year is for the months it was in the business.", "With fixed capitals, the extra capital goes to Sipho's capital account, not his current account."],
      explanation: `Model answers:\n\n${a.md}\n\n${c.md}\n\n${ext}`,
    });
  }
});
