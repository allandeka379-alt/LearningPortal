// W2a: Cambridge 0264 Paper 1 exam-format item: 1 × 20-mark question on stimulus material (four parts).
// Mark split within parts is ours.
import { concept, P, f, money, fmt, round, table, CAM } from "../lib.mjs";

concept("bus.organisation.limited-companies", { file: "exam/w2a-cambridge", keyPrefix: "exam.w2a-cambridge", applies: CAM }, (b) => {
  const rev24 = 96000, cost24 = 84000, rev25 = 128000, cost25 = 110080;
  const p24 = f.profit(rev24, cost24), p25 = f.profit(rev25, cost25);
  const pm25 = f.profitMargin(p25, rev25);
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 1350, calculator: true, paper: "Paper 1",
    concepts: ["bus.organisation.sole-traders-partnerships", "bus.organisation.limited-companies"],
    stem: `Sipho and Thandeka run SunLink, a partnership that installs solar systems for homes and shops in Gweru. Demand is growing fast. They want US\\$40,000 to buy a delivery truck and open a second branch. Four friends would invest if SunLink became a private limited company. Sipho is worried about losing control.\n\n${table(["", "2024 US\\$", "2025 US\\$"], [["Revenue", rev24, rev25], ["Total costs", cost24, cost25]], { title: "SunLink: selected financial information" })}`,
    parts: [
      P.fib({
        label: "(a)", marks: 2,
        stem: "Complete the sentences about SunLink as a partnership.",
        template: "The partners have {{blank:a}} liability for the debts of the business. The document in which they record how profits are shared is the partnership {{blank:b}}.",
        blanks: [
          { id: "a", accepted: ["unlimited"], choices: ["unlimited", "limited", "no", "corporate"] },
          { id: "b", accepted: ["deed"], choices: ["deed", "prospectus", "memorandum", "invoice"] },
        ],
      }),
      P.num({
        label: "(b)", marks: 4, kind: "pct", value: pm25, type: "CALCULATION",
        stem: "Calculate SunLink's profit margin for 2025 (to one decimal place).",
        wrong: [round((p25 / cost25) * 100, 1), round((p24 / rev24) * 100, 1)],
        explanation: `Profit = revenue − total costs = ${fmt(rev25)} − ${fmt(cost25)} = ${money(p25)}. Profit margin = profit ÷ revenue × 100 = ${fmt(p25)} ÷ ${fmt(rev25)} × 100 = ${round(pm25, 1)}%.`,
        workedSolution: `1. Profit = ${fmt(rev25)} − ${fmt(cost25)} = ${money(p25)}.
2. Profit margin = ${fmt(p25)} ÷ ${fmt(rev25)} × 100 = ${round(pm25, 1)}%.`,
      }),
      P.manual({
        label: "(c)", marks: 6,
        stem: "Explain **two** advantages to Sipho and Thandeka of SunLink becoming a private limited company.",
        points: [
          "Advantage 1: limited liability (1)",
          "Applied: personal assets protected while expanding with a truck and second branch (1)",
          "Developed: effect, e.g. they can take the risk of growth without risking their homes (1)",
          "Advantage 2: extra capital from the four friends (1)",
          "Applied: raises the US\\$40,000 without a bank loan and interest (1)",
          "Developed: effect, e.g. growth financed while demand is high / continuity and easier borrowing (1)",
        ],
      }),
      P.manual({
        label: "(d)", marks: 8, type: "EXTENDED_RESPONSE",
        stem: "Should Sipho and Thandeka change SunLink into a private limited company? Justify your answer.",
        points: [
          "For: limited liability protects them as the business takes on more risk (1)",
          "For: four investors provide the US\\$40,000 for growth (1)",
          "For: strong demand and rising profit support expansion (uses data) (1)",
          "Against: control shared; Sipho's concern if investors hold many shares (1)",
          "Against: profits shared with new shareholders as dividends (1)",
          "Against: formation costs and legal formalities; accounts less private (1)",
          "Keeps control by holding more than half the shares / alternative such as a loan (1)",
          "Justified recommendation (1)",
        ],
        levels: [[3, 6, 8, "Well-developed, balanced arguments applied to SunLink, with a justified recommendation."], [2, 3, 5, "Some developed arguments applied to the case; limited judgement."], [1, 1, 2, "Simple points, little application, no judgement."]],
        modelAnswer: "Becoming a private limited company would give Sipho and Thandeka limited liability, which matters as they borrow and buy a truck to expand, and the four friends would provide the US\\$40,000 without loan interest. Profit rose from US\\$12,000 in 2024 to US\\$17,920 in 2025, so the business is growing and expansion looks justified. However, they would have to share control and future profits with the new shareholders, and forming the company costs money and requires accounts to be filed. Sipho's worry about control can be managed if he and Thandeka keep more than half of the shares, so they can still elect the board. They should convert to a private limited company, issuing the friends a minority of the shares.",
      }),
    ],
    explanation: `Profit 2025 = ${money(p25)}; profit margin ${round(pm25, 1)}%. Conversion brings limited liability and capital but shares control and profit.`,
    hints: ["Profit = revenue − total costs.", "Profit margin = profit ÷ revenue × 100.", "In (d), consider control as well as finance."],
  });
});
