// W1a exam-format items: ZIMSEC Paper 1 section A structured questions (10 marks), EXAM.ZIM_STRUCT10
import { concept, P, EXAM, checkExam, ZIM, ZBS, table, sum, r2, money, chk } from "../lib.mjs";

const PAPER = "ZIMSEC Paper 1 section A";
const base = { examStyle: true, skill: EXAM.ZIM_STRUCT10.skill, secs: EXAM.ZIM_STRUCT10.secs };

concept("abus.structure.unincorporated", { file: "exam/w1a-struct", keyPrefix: "exam.w1a-struct" }, (b) => {
  // ------------------------------------------------------------------------------------------------------------------
  // Item 1: partnership profit sharing and conversion to a private company
  {
    const profit = 52500, mParts = 3, cParts = 2;
    const chari = r2((profit * cParts) / (mParts + cParts));
    chk(chari, 21000);
    const shares = 50000, price = 1.5;
    const raised = r2(shares * price);
    chk(raised, 75000);
    const chariShares = (shares * cParts) / (mParts + cParts);
    chk(chariShares, 20000, 0);
    b.struct({
      ...base, d: 3, calculator: true, applies: ZIM, paper: PAPER,
      concepts: ["abus.structure.unincorporated", "abus.structure.companies"],
      stem: `Tafara Moyo and Ruth Chari are partners in Moyo & Chari Traders, a hardware shop in Gweru (a fictional business). Their partnership agreement says that profits are shared in the ratio 3 : 2 (Moyo : Chari). The profit for last year was ${money(profit)}.\n\nThe partners plan to turn the business into a private limited company, Moyo & Chari (Pvt) Ltd. The company will issue ${shares.toLocaleString("en-GB")} ordinary shares at ${money(price)} each. The shares will be held in the same ratio, 3 : 2, as the profit shares.`,
      parts: checkExam(EXAM.ZIM_STRUCT10, [
        P.num({ label: "(a)", marks: 2, kind: "money", value: chari, stem: "Calculate Ruth Chari's share of last year's profit.", wrong: [r2(profit / 2), r2((profit * mParts) / 5)], explanation: "Total parts = 3 + 2 = 5. One part = 52,500 ÷ 5 = 10,500. Chari has 2 parts = US\\$21,000. Sharing equally (US\\$26,250) or giving Chari Moyo's share (US\\$31,500) ignores the 3 : 2 ratio." }),
        P.group({
          label: "(b)", stem: "The new company",
          parts: [
            P.num({ label: "(i)", marks: 2, kind: "money", value: raised, stem: "Calculate the money the company would raise if all the shares are issued.", wrong: [shares, r2(shares / price)], explanation: "50,000 × 1.50 = US\\$75,000." }),
            P.num({ label: "(ii)", marks: 2, kind: "units", value: chariShares, stem: "Calculate the number of shares Ruth Chari would hold.", wrong: [30000, 25000], explanation: "2 ÷ 5 × 50,000 = 20,000 shares. Moyo holds the other 30,000." }),
          ],
        }),
        P.manual({
          label: "(c)", marks: 4, stem: "Explain **two** benefits to the partners of changing to a private limited company.",
          points: ["Limited liability: the partners' personal property is protected if the business fails", "Development: they can lose no more than they have invested in shares, so a failed hardware shop would not cost them their homes", "Continuity or capital: the company continues if a partner leaves, or new shareholders can supply more capital", "Development: the company can issue more shares to raise money for stock or a second shop"],
          modelAnswer: "The partners would gain limited liability, so their personal property is protected if the business fails; they could lose only what they invested in shares, not their homes. The company would also have continuity and could raise more capital, because it can continue if one partner leaves and can issue more shares to pay for stock or a second shop.",
          explanation: "One mark for each benefit and one for its development.",
        }),
      ]),
      hints: ["Total parts first: 3 + 2.", "Money raised = number of shares × price."],
      explanation: "Chari US\\$21,000; US\\$75,000 raised; Chari holds 20,000 shares; benefits are limited liability and continuity or capital.",
    });
  }

  // ------------------------------------------------------------------------------------------------------------------
  // Item 2: SME problems (family tailoring business)
  {
    const rev = 84000, mat = 33600, wag = 24000, oth = 12000;
    const profit = r2(rev - mat - wag - oth);
    chk(profit, 14400);
    const margin = (profit / rev) * 100;
    chk(margin, 17.142857, 0.0001);
    b.struct({
      ...base, d: 3, calculator: true, applies: ZIM, paper: PAPER,
      concepts: ["abus.size.small-business"],
      stem: `Sibanda Tailoring is a fictional family business in Bulawayo that makes school uniforms. Last year it had the following results.\n\n` + table(["Item", "US\\$"], [["Revenue", rev], ["Materials", mat], ["Wages", wag], ["Other costs", oth]]) + `\n\nThe owner would like to buy a second machine and a van, but the bank has refused a loan because the business has no property to offer as security. A large clothing factory has begun to sell uniforms at lower prices.`,
      parts: checkExam(EXAM.ZIM_STRUCT10, [
        P.group({
          label: "(a)", stem: "Results",
          parts: [
            P.num({ label: "(i)", marks: 2, kind: "money", value: profit, stem: "Calculate the profit for the year.", wrong: [rev, r2(rev - mat)], explanation: "Total costs = 33,600 + 24,000 + 12,000 = 69,600. Profit = 84,000 − 69,600 = US\\$14,400." }),
            P.num({ label: "(ii)", marks: 2, kind: "pct", value: margin, stem: "Calculate the profit as a percentage of revenue (profit ÷ revenue × 100), to one decimal place.", wrong: [r2((profit / (mat + wag + oth)) * 100), 14.4], explanation: "14,400 ÷ 84,000 × 100 = 17.1%. Dividing by total costs gives 20.7%." }),
          ],
        }),
        P.manual({ label: "(b)", marks: 2, stem: "State **two** problems faced by Sibanda Tailoring.", points: ["Lack of finance: the bank has refused a loan for lack of security", "Competition from the large factory selling at lower prices"], modelAnswer: "The business cannot raise a bank loan because it has no security, and it faces competition from a large factory that sells uniforms at lower prices.", explanation: "One mark for each problem taken from the case." }),
        P.manual({
          label: "(c)", marks: 4, stem: "Discuss **two** ways in which Sibanda Tailoring could reduce its problems.",
          points: ["Apply to a microfinance lender or savings group, which may lend without property security", "Development: this could pay for the second machine so that output rises", "Compete on personal service, quality or flexibility rather than on price", "Development: schools and parents may pay more for well-fitted, delivered uniforms, which large factories do not offer"],
          modelAnswer: "The owner could apply to a microfinance lender or savings group, which may lend without property security, so the second machine could be bought and output increased. She could also compete on service and quality instead of price, for example by fitting and delivering uniforms to schools, which the large factory does not offer.",
          explanation: "One mark for each way and one for its development.",
        }),
      ]),
      hints: ["Total costs first.", "Profit margin = profit ÷ revenue × 100."],
      explanation: "Profit US\\$14,400 (17.1% of revenue); problems are finance and competition; solutions are microfinance and a service focus.",
    });
  }

  // ------------------------------------------------------------------------------------------------------------------
  // Item 3: business failure and cash (Business Studies only)
  {
    const open = 2400, rec = 6900;
    const pays = [["Wages", 4200], ["Materials", 3600], ["Rent", 800], ["Loan repayment", 1500]];
    const totalPay = sum(pays.map((p) => p[1]));
    chk(totalPay, 10100);
    const close = r2(open + rec - totalPay);
    chk(close, -800);
    b.struct({
      ...base, d: 3, calculator: true, applies: ZBS, paper: "ZIMSEC Business Studies Paper 1",
      concepts: ["abus.enterprise.success-failure"],
      stem: `Zuva Furniture is a fictional workshop in Mutare. In June its cash movements were as follows.\n\n` + table(["Item", "US\\$"], [["Cash at the bank on 1 June", open], ["Receipts from customers", rec], ...pays.map(([n, v]) => [`Payment: ${n}`, v])]) + `\n\nThe owner says that the business is making a profit but she cannot pay all her bills. Several customers are paying 60 days after delivery.`,
      parts: checkExam(EXAM.ZIM_STRUCT10, [
        P.group({
          label: "(a)", stem: "June cash",
          parts: [
            P.num({ label: "(i)", marks: 2, kind: "money", value: totalPay, stem: "Calculate the total payments made in June.", wrong: [rec, r2(totalPay - 1500)], explanation: "4,200 + 3,600 + 800 + 1,500 = US\\$10,100." }),
            P.num({ label: "(ii)", marks: 2, kind: "money", value: Math.abs(close), stem: "The bank account is overdrawn at the end of June. Calculate the amount of the overdraft.", wrong: [r2(totalPay - rec), close + 2 * 800 + 800], explanation: "Closing balance = 2,400 + 6,900 − 10,100 = −800, an overdraft of US\\$800. Ignoring the opening balance gives US\\$3,200." }),
          ],
        }),
        P.manual({ label: "(b)", marks: 2, stem: "State **two** causes of business failure other than poor cash management.", points: ["Over-expansion, weak management, competition, changes in the economy or law, or poor planning (first cause)", "A second different cause from the same list"], modelAnswer: "Over-expansion and competition from rival firms.", explanation: "Accept any two valid causes." }),
        P.manual({
          label: "(c)", marks: 4, stem: "Explain how poor cash management could cause Zuva Furniture to fail, and suggest **one** way of avoiding failure.",
          points: ["Customers pay 60 days after delivery while wages, materials and rent must be paid now", "Development: the business is overdrawn and may not be able to pay bills, so suppliers may refuse credit", "Suggestion: ask customers for a deposit or shorter credit terms, or prepare a cash flow forecast", "Development: this brings cash in earlier and reduces the overdraft"],
          modelAnswer: "Customers pay 60 days after delivery while wages, materials and rent are paid immediately. The business is overdrawn and may not be able to pay its bills, so suppliers may refuse credit and the workshop could close even though it is profitable. It could ask customers for a deposit or shorter credit terms, which would bring cash in earlier and reduce the overdraft.",
          explanation: "Cause with development, then a remedy with development.",
        }),
      ]),
      hints: ["Opening cash plus receipts less payments gives the closing balance."],
      explanation: "Payments US\\$10,100; overdraft US\\$800; cash timing is the cause; deposits or a forecast help.",
    });
  }

  // ------------------------------------------------------------------------------------------------------------------
  // Item 4: business plan (funding and break-even)
  {
    const items = [["Cold room", 3800], ["Two refrigerated display units", 2200], ["First stock of juice and ice cream", 1900], ["Licence and registration", 200], ["Working capital for two months", 1900]];
    const total = sum(items.map((i) => i[1]));
    chk(total, 10000);
    const price = 4, vc = 2.5, fixed = 1050;
    const be = fixed / (price - vc);
    chk(be, 700);
    b.struct({
      ...base, d: 3, calculator: true, applies: ZIM, paper: PAPER,
      concepts: ["abus.enterprise.business-plans"],
      stem: `Chipo is preparing a business plan for a fictional ice-cream and juice kiosk at a bus terminus in Masvingo. Her plan lists the start-up costs below. She expects to sell each serving for US\\$4.00. The variable cost is US\\$2.50 a serving and fixed costs are US\\$1,050 a month.\n\n` + table(["Start-up item", "US\\$"], items),
      parts: checkExam(EXAM.ZIM_STRUCT10, [
        P.group({
          label: "(a)", stem: "Figures from the plan",
          parts: [
            P.num({ label: "(i)", marks: 2, kind: "money", value: total, stem: "Calculate the total funding required to start the kiosk.", wrong: [r2(total - 1900), r2(total + 1050)], explanation: "3,800 + 2,200 + 1,900 + 200 + 1,900 = US\\$10,000." }),
            P.num({ label: "(ii)", marks: 2, kind: "units", value: be, stem: "Calculate the break-even output in servings a month.", wrong: [r2(fixed / price), r2(fixed / vc)], explanation: "Contribution = 4.00 − 2.50 = 1.50. Break-even = 1,050 ÷ 1.50 = 700 servings." }),
          ],
        }),
        P.manual({ label: "(b)", marks: 2, stem: "State **two** other sections that a business plan should contain.", points: ["Any one valid section, e.g. executive summary, marketing plan, operations plan", "A second valid section, e.g. human resources plan, objectives, cash flow forecast"], modelAnswer: "A marketing plan and a cash flow forecast.", explanation: "Accept two sections other than the start-up cost list." }),
        P.manual({
          label: "(c)", marks: 4, stem: "Explain **two** reasons why the bank would want to see this business plan before lending to Chipo.",
          points: ["It shows how the loan will be used and what the kiosk will earn", "Development: the bank can judge whether sales above 700 servings a month will cover costs and repayments", "A new business has no past accounts, so the plan is the only evidence", "Development: the bank can test whether the forecasts and market evidence are realistic and reduce its risk"],
          modelAnswer: "The plan shows how the loan will be used and what the kiosk is expected to earn, so the bank can judge whether sales above 700 servings a month will cover costs and repayments. A new business has no past accounts, so the plan is the only evidence the bank has and lets it test whether the forecasts are realistic and reduce its risk.",
          explanation: "Two reasons, each developed.",
        }),
      ]),
      hints: ["Add the five start-up items.", "Break-even = fixed costs ÷ contribution per serving."],
      explanation: "Funding US\\$10,000; break-even 700 servings; a lender needs evidence of repayment ability.",
    });
  }

  // ------------------------------------------------------------------------------------------------------------------
  // Item 5: measuring size and sectors
  {
    const mk = 1500000, s1 = 405000, e1 = 45, s2 = 255000, e2 = 10;
    const sh = (s1 / mk) * 100;
    chk(sh, 27, 0.0001);
    const spe = s2 / e2;
    chk(spe, 25500);
    b.struct({
      ...base, d: 4, calculator: true, applies: ZIM, paper: PAPER,
      concepts: ["abus.size.measuring", "abus.structure.sectors"],
      stem: `The table shows two fictional firms that sell cooking oil in a regional market worth US\\$1,500,000 a year.\n\n` + table(["", "Chengeta Foods", "Mazvita Oils"], [["Annual sales (US\\$)", s1, s2], ["Number of employees", e1, e2], ["Main activity", "Pressing and bottling sunflower oil in a factory", "Selling oil from a warehouse to shops"]], ["l", "r", "l"]),
      parts: checkExam(EXAM.ZIM_STRUCT10, [
        P.group({
          label: "(a)", stem: "Size of the firms",
          parts: [
            P.num({ label: "(i)", marks: 2, kind: "pct", value: sh, stem: "Calculate Chengeta Foods' market share, to one decimal place.", wrong: [r2((s1 / s2) * 100), r2((s1 / (mk - s1)) * 100)], explanation: "405,000 ÷ 1,500,000 × 100 = 27.0%." }),
            P.num({ label: "(ii)", marks: 2, kind: "money", value: spe, stem: "Calculate Mazvita Oils' sales per employee.", wrong: [r2(s2 * e2), r2(e2 / s2)], explanation: "255,000 ÷ 10 = US\\$25,500." }),
          ],
        }),
        P.fib({
          label: "(b)", marks: 2, stem: "Choose the sector for each firm.",
          template: "Chengeta Foods operates mainly in the {{blank:a}} sector and Mazvita Oils in the {{blank:b}} sector.",
          blanks: [
            { id: "a", accepted: ["secondary"], choices: ["primary", "secondary", "tertiary"] },
            { id: "b", accepted: ["tertiary"], choices: ["primary", "secondary", "tertiary"] },
          ],
          explanation: "Pressing and bottling oil is manufacturing (secondary); selling to shops is a distribution service (tertiary).",
        }),
        P.manual({
          label: "(c)", marks: 4, stem: "Explain why measuring size by the number of employees alone could be misleading when comparing these two firms.",
          points: ["Chengeta has 45 employees and Mazvita 10, so Chengeta looks over four times as large", "Development: sales per employee are US\\$9,000 for Chengeta (405,000 ÷ 45) against US\\$25,500 for Mazvita", "Mazvita sells a large amount with few staff, so it is larger than its employee count suggests", "Another measure such as sales or market share should also be used"],
          modelAnswer: "Chengeta has 45 employees and Mazvita only 10, so by employees Chengeta looks over four times as large. But Chengeta's sales per employee are US\\$9,000 (405,000 ÷ 45), against US\\$25,500 for Mazvita, so Mazvita sells a great deal with few staff and is larger than its employee count suggests. Sales or market share should be used as well.",
          explanation: "Sales per employee for Chengeta: 405,000 ÷ 45 = 9,000.",
        }),
      ]),
      hints: ["Market share = sales ÷ market sales × 100."],
      explanation: "Market share 27.0%; Mazvita US\\$25,500 per employee; manufacturing is secondary, selling is tertiary; employees alone mislead.",
    });
  }
});
