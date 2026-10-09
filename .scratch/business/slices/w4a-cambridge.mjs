// W4a: Cambridge 0264 Paper 1 exam-format item: 1 × 20-mark question on stimulus material
// ((a) 2 + (b) 4 + (c) 6 + (d) 8). Mark split within parts is ours.
import { concept, P, f, money, fmt, sum, table, CAM } from "../lib.mjs";

concept("bus.finance.working-capital", { file: "exam/w4a-cambridge", keyPrefix: "exam.w4a-cambridge", applies: CAM }, (b) => {
  const ca = [["Inventory", 18600], ["Trade receivables", 9400], ["Cash", 2400]];
  const cl = [["Trade payables", 12800], ["Bank overdraft", 6300]];
  const tca = sum(ca.map((x) => x[1])), tcl = sum(cl.map((x) => x[1]));
  const wc = f.workingCapital(tca, tcl);
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 1350, calculator: true, paper: "Paper 1",
    concepts: ["bus.finance.working-capital", "bus.finance.need-for-finance", "bus.finance.sources"],
    stem: `Masvingo Furniture Makers (MFM) is a private limited company owned by three family members. It makes beds and wardrobes and sells to retailers, who are given 60 days' credit. Demand from a new chain of furniture shops means MFM needs a second workshop and new cutting machines costing ${money(45000)}. MFM's retained profit last year was ${money(11000)}. The directors do not want to lose control of the business.\n\n${table(["Item", "US\\$"], [...ca, ...cl], { title: "Extract from MFM's statement of financial position" })}`,
    parts: [
      P.fib({
        label: "(a)", marks: 2,
        stem: "Identify **two** internal sources of finance MFM could use.",
        template: "MFM could use its {{blank:a}} profit, or raise cash by the sale of {{blank:b}} it no longer needs.",
        blanks: [
          { id: "a", accepted: ["retained"], choices: ["retained", "gross", "forecast", "net"] },
          { id: "b", accepted: ["assets"], choices: ["assets", "shares", "debentures", "loans"] },
        ],
      }),
      P.num({
        label: "(b)", marks: 4, kind: "money", value: wc, type: "CALCULATION",
        stem: "Calculate MFM's working capital.",
        wrong: [tca, tca + tcl],
        explanation: `Current assets ${fmt(tca)} − current liabilities ${fmt(tcl)} = ${money(wc)}.`,
        workedSolution: `1. Working capital = current assets − current liabilities.\n2. Current assets = ${ca.map((x) => fmt(x[1])).join(" + ")} = ${fmt(tca)}.\n3. Current liabilities = ${cl.map((x) => fmt(x[1])).join(" + ")} = ${fmt(tcl)}.\n4. Working capital = ${fmt(tca)} − ${fmt(tcl)} = ${money(wc)}.`,
      }),
      P.manual({
        label: "(c)", marks: 6,
        stem: "Explain **two** reasons why MFM needs finance.",
        points: [
          "Reason 1: expansion: second workshop and machines (1)",
          `Applied: costs ${money(45000)}, far more than retained profit of ${money(11000)} (1)`,
          "Developed: needed before extra sales from the new chain arrive (1)",
          "Reason 2: working capital for more timber, wages and 60 days' credit to retailers (1)",
          `Applied: only ${money(ca[2][1])} cash and a ${money(cl[1][1])} overdraft already (1)`,
          "Developed: larger orders tie up more cash in inventory and receivables (1)",
        ],
        modelAnswer: `MFM needs finance to expand: the second workshop and cutting machines cost ${money(45000)}, far more than last year's retained profit of ${money(11000)}, and the money must be spent before the extra sales to the new furniture chain arrive. MFM also needs more working capital. Larger orders mean buying more timber and paying more wages, and because retailers take 60 days to pay, cash is tied up in inventory and trade receivables. MFM already has only ${money(ca[2][1])} in cash and an overdraft of ${money(cl[1][1])}, so it could not fund this from its current position.`,
      }),
      P.manual({
        label: "(d)", marks: 8, type: "EXTENDED_RESPONSE",
        stem: "Recommend whether MFM should finance the expansion with a long-term bank loan or by selling shares to a new investor. Justify your answer.",
        points: [
          "Bank loan: directors keep control, which they want (1)",
          "Bank loan: repayments spread over the life of the machines (1)",
          "Bank loan: but interest adds to costs; collateral needed; existing overdraft adds to risk (1)",
          "New shares: no interest or repayment, eases pressure on cash flow (1)",
          "New shares: but new owner shares profits and control, against the directors' wishes (1)",
          "New shares: private company can only sell to people it chooses, so finding an investor takes time (1)",
          "Uses working capital or retained profit evidence in the argument (1)",
          "Justified recommendation (1)",
        ],
        levels: [[3, 6, 8, "Well-developed, balanced arguments applied to MFM and its data, with a justified recommendation."], [2, 3, 5, "Some developed arguments applied to the case; limited judgement."], [1, 1, 2, "Simple points, little application, no judgement."]],
        modelAnswer: `A long-term bank loan would let the family directors keep full control, which they want, and repayments could be spread over the years the new machines are used. However, interest would add to MFM's costs, the bank may want collateral, and MFM already has an overdraft of ${money(cl[1][1])} and only ${money(ca[2][1])} in cash, so the bank will check that repayments are affordable. Selling shares to a new investor would bring in capital with no interest or repayments, easing pressure on cash flow, but the investor would share future profits and have a say in decisions, which the directors do not want; as a private limited company MFM must also find a suitable investor itself. Because the new chain gives MFM a secure flow of orders to repay a loan and the directors value control, I recommend a long-term bank loan, using some of the ${money(11000)} retained profit to reduce the amount borrowed, while keeping a close eye on working capital.`,
      }),
    ],
    explanation: `(a) Retained profit; sale of assets. (b) Working capital = ${fmt(tca)} − ${fmt(tcl)} = ${money(wc)}. (c) Expansion and working capital, applied to MFM. (d) Loan keeps control but adds interest; shares avoid interest but dilute control; justified recommendation.`,
    hints: ["(a) Internal sources come from within the business.", "(b) Use only current assets and current liabilities.", "(d) Remember the directors' aim."],
  });
});
