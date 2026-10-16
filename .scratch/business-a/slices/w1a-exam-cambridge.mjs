// W1a exam-format items: Cambridge AS (Papers 1 and 2): two 5-mark questions, one 30-mark data response, two 20-mark essays
import { concept, P, EXAM, checkExam, CAM, table, sum, r2, money, chk, pctChange } from "../lib.mjs";

const LV8 = [[1, 1, 3, "Limited knowledge; points are stated or only partly explained"], [2, 4, 6, "Good analysis; points explained and applied to the context"], [3, 7, 8, "Developed, accurate analysis with clear chains of reasoning applied to the context"]];
const LV12 = [[1, 1, 4, "Mostly assertion or description; one-sided; limited or no judgement"], [2, 5, 8, "Some balance and application; a judgement that is not fully supported"], [3, 9, 12, "Balanced arguments applied to the context and a supported judgement that considers conditions or time-frame"]];
const LV8E = [[1, 1, 2, "Assertion with little support; no judgement"], [2, 3, 5, "Arguments for and against, partly applied; judgement stated"], [3, 6, 8, "Balanced, applied arguments and a justified recommendation with a condition"]];

concept("abus.structure.franchise-jv-social", { file: "exam/w1a-cambridge", keyPrefix: "exam.w1a-cambridge", applies: CAM }, (b) => {
  const pc = (extra = {}) => ({ examStyle: true, applies: CAM, ...extra });

  // ------------------------------------------------------------------------------------------------------------------
  // Item 1: CAM_SHORT5 (franchise)
  {
    const rev = 92000, roy = r2(rev * 0.05);
    chk(roy, 4600);
    b.struct({
      ...pc({ d: 3, skill: EXAM.CAM_SHORT5.skill, secs: EXAM.CAM_SHORT5.secs, calculator: true, paper: "Cambridge Paper 1" }),
      concepts: ["abus.structure.franchise-jv-social"],
      stem: `A franchisee in Lusaka runs a fictional burger outlet. Last year its revenue was ${money(rev)}. The franchisor charges a royalty of 5% of revenue.`,
      parts: checkExam(EXAM.CAM_SHORT5, [
        P.num({ label: "(a)", marks: 2, kind: "money", value: roy, stem: "Calculate the royalty paid last year.", wrong: [r2(rev * 0.5), r2(rev / 0.05)], explanation: "5% × 92,000 = US\\$4,600." }),
        P.manual({ label: "(b)", marks: 3, stem: "Explain **one** benefit to the franchisee of trading under the franchisor's brand.", points: ["Customers already know and trust the brand", "Application: more customers are likely to enter the burger outlet from the start", "So sales may be higher and the risk of failure lower than for an unknown outlet"], modelAnswer: "Customers already know and trust the brand, so more of them are likely to enter the burger outlet from the start. Sales may therefore be higher and the risk of failure lower than for an unknown independent outlet.", explanation: "Benefit, application, consequence." }),
      ]),
      hints: ["Royalty = percentage × revenue."],
      explanation: "Royalty US\\$4,600; benefit is a known brand.",
    });
  }

  // ------------------------------------------------------------------------------------------------------------------
  // Item 2: CAM_SHORT5 (added value)
  {
    const price = 2.8, inputs = 1.65, units = 450;
    const av = r2((price - inputs) * units);
    chk(av, 517.5);
    b.struct({
      ...pc({ d: 3, skill: EXAM.CAM_SHORT5.skill, secs: EXAM.CAM_SHORT5.secs, calculator: true, paper: "Cambridge Paper 1" }),
      concepts: ["abus.enterprise.business-activity"],
      stem: `A fictional bakery in Harare sells a loaf for US\\$2.80. The bought-in materials and services in each loaf cost US\\$1.65. It sells ${units} loaves in a day.`,
      parts: checkExam(EXAM.CAM_SHORT5, [
        P.num({ label: "(a)", marks: 2, kind: "money", value: av, stem: "Calculate the total added value for the day.", wrong: [r2(price * units), r2(inputs * units)], explanation: "Added value per loaf = 2.80 − 1.65 = 1.15. Total = 1.15 × 450 = US\\$517.50." }),
        P.manual({ label: "(b)", marks: 3, stem: "Explain **one** way in which the bakery could increase its added value per loaf.", points: ["Raise the selling price by improving quality, packaging or branding", "Application: customers may accept a higher price for a wrapped, branded loaf", "If bought-in costs rise less than the price, the gap between price and cost widens"], modelAnswer: "The bakery could improve its packaging and brand so that customers accept a higher price for the loaf. If the higher price rises by more than the extra cost of the packaging, the gap between price and bought-in cost widens, so added value per loaf increases.", explanation: "Method, application, consequence." }),
      ]),
      hints: ["Added value per unit = selling price − bought-in cost."],
      explanation: "Added value US\\$517.50; a higher price through quality or branding raises added value.",
    });
  }

  // ------------------------------------------------------------------------------------------------------------------
  // Item 3: CAM_DATA30
  {
    const rev = [115000, 138000, 165600];
    const mk3 = 1380000, emp3 = 12;
    const share = (rev[2] / mk3) * 100;
    chk(share, 12, 0.0001);
    const gr = pctChange(rev[1], rev[2]);
    chk(gr, 20, 0.0001);
    const rpe = rev[2] / emp3;
    chk(rpe, 13800);
    const frRev = r2(rev[2] * 1.25), frCost = 170000, roy = r2(frRev * 0.06);
    chk(frRev, 207000);
    chk(roy, 12420);
    const frProfit = r2(frRev - frCost - roy);
    chk(frProfit, 24580);
    const curProfit = 24840;
    b.struct({
      ...pc({ d: 4, skill: EXAM.CAM_DATA30.skill, secs: EXAM.CAM_DATA30.secs, calculator: true, paper: "Cambridge Paper 2" }),
      concepts: ["abus.structure.sectors", "abus.structure.unincorporated", "abus.structure.franchise-jv-social", "abus.size.measuring", "abus.size.organic-growth"],
      stem: "Read the case study. Kopano Coffee is a fictional business.\n\n**Kopano Coffee, Gaborone.** Kopano Mogale roasts coffee beans and sells cups and bags of coffee from one café. She owns the business alone and has no other investors. She started it five years ago after leaving a job in a hotel, because she saw that few cafés in the city roasted their own coffee. Sales have grown each year, helped by a loyal group of regular customers and by word of mouth. Kopano employs 12 people and works long hours herself.\n\nA franchisor, Brew & Bite, has offered Kopano a franchise. She would pay an initial fee of US\\$30,000 and a royalty of 6% of revenue, and would have to buy her coffee from the franchisor and use its menu. Brew & Bite forecasts that revenue would rise by 25% in the first year. Kopano estimates that her costs before the royalty would then be US\\$170,000. She would have to borrow the initial fee from a bank, which would require her house as security.\n\n" + table(["", "Year 1", "Year 2", "Year 3"], [["Revenue (US\\$)", ...rev], ["Profit (US\\$)", 18000, 20700, curProfit]]) + `\n\nIn Year 3 the total sales of coffee shops in the city were ${money(mk3)}.`,
      parts: checkExam(EXAM.CAM_DATA30, [
        P.fib({
          label: "(a)", marks: 2, stem: "Identify Kopano Coffee's form of ownership and sector.",
          template: "Kopano Coffee is a {{blank:a}} and operates mainly in the {{blank:b}} sector.",
          blanks: [
            { id: "a", accepted: ["sole trader"], choices: ["sole trader", "partnership", "private limited company"] },
            { id: "b", accepted: ["tertiary"], choices: ["primary", "secondary", "tertiary"] },
          ],
          explanation: "Kopano owns the business alone, so it is a sole trader. Selling coffee to customers in a café is a service in the tertiary sector (the roasting is a small secondary activity).",
        }),
        P.group({
          label: "(b)", stem: "Calculations",
          parts: [
            P.num({ label: "(i)", marks: 2, kind: "pct", value: share, stem: "Calculate Kopano Coffee's market share in Year 3, to one decimal place.", wrong: [r2((rev[2] / mk3) * 10), r2((mk3 / rev[2]) * 100)], explanation: "165,600 ÷ 1,380,000 × 100 = 12.0%." }),
            P.num({ label: "(ii)", marks: 2, kind: "pct", value: gr, stem: "Calculate the percentage growth in revenue from Year 2 to Year 3, to one decimal place.", wrong: [r2(((rev[2] - rev[1]) / rev[2]) * 100), 27600], explanation: "(165,600 − 138,000) ÷ 138,000 × 100 = 20.0%." }),
            P.num({ label: "(iii)", marks: 2, kind: "money", value: rpe, stem: "Calculate revenue per employee in Year 3.", wrong: [r2(rev[2] * emp3), r2(emp3 / rev[2])], explanation: "165,600 ÷ 12 = US\\$13,800." }),
            P.num({ label: "(iv)", marks: 2, kind: "money", value: frProfit, stem: "Calculate the forecast annual profit under the franchise in the first year (ignoring the initial fee).", wrong: [r2(frRev - frCost), roy], explanation: "Revenue = 165,600 × 1.25 = 207,000. Royalty = 6% × 207,000 = 12,420. Profit = 207,000 − 170,000 − 12,420 = US\\$24,580." }),
          ],
        }),
        P.manual({
          label: "(c)", marks: 4, stem: "Explain **two** benefits to Kopano of accepting the franchise.",
          points: ["A well-known brand attracts customers", "Application: this could lift her revenue by the 25% that Brew & Bite forecasts", "Support and training from the franchisor", "Application: she could spend less of her own time on menus and methods, easing her long hours"],
          modelAnswer: "A well-known brand attracts customers, which could lift Kopano's revenue by the 25% that Brew & Bite forecasts. She would also receive support and training from the franchisor, so she could spend less of her own time on developing menus and methods, easing her long working hours.",
          explanation: "Two benefits, each developed using the case.",
        }),
        P.manual({
          label: "(d)", marks: 4, stem: "Analyse how being a sole trader affects Kopano's decision about borrowing the initial fee.",
          points: ["A sole trader has unlimited liability", "If the loan is not repaid, the bank can take her house, which it requires as security", "So the risk of the franchise falls on her personally", "This may make her more cautious about borrowing US\\$30,000"],
          modelAnswer: "A sole trader has unlimited liability. If Kopano cannot repay the loan for the fee, the bank can take her house, which it requires as security. The risk of the franchise therefore falls on her personally, which may make her cautious about borrowing US\\$30,000.",
          explanation: "A chain from liability to the decision.",
        }),
        P.manual({
          label: "(e)", marks: 4, stem: "Assess **one** disadvantage to Kopano of the franchise, using the data.",
          points: ["Profit would hardly rise, because the forecast profit of US\\$24,580 is below the Year 3 profit of US\\$24,840", "The royalty of US\\$12,420 and higher costs absorb the extra revenue", "Application: she would also pay an initial fee of US\\$30,000 and lose freedom over her coffee, so the benefit is uncertain", "Judgement: the disadvantage is serious in the first year, though a known brand might raise sales later"],
          modelAnswer: "The main disadvantage is that profit would hardly rise. The forecast profit of US\\$24,580 is below the Year 3 profit of US\\$24,840, because the royalty of US\\$12,420 and higher costs absorb the extra revenue. She would also pay a US\\$30,000 fee and lose freedom over her coffee. The disadvantage is serious in the first year, although a known brand might raise sales later.",
          explanation: "Uses the figures in (b)(iv).",
        }),
        P.manual({
          label: "(f)", marks: 8, type: "EXTENDED_RESPONSE", wordLimit: { max: 350 }, levels: LV8E,
          stem: "Evaluate whether Kopano should accept the franchise or continue to grow her own business.",
          points: ["Franchise: a brand name and support may raise revenue by 25%", "Franchise: lower risk of failure for the business as a whole", "Franchise: forecast profit of US\\$24,580 is slightly below the present US\\$24,840 in the first year", "Franchise: an initial fee of US\\$30,000 borrowed against her house adds personal risk", "Franchise: she loses control over her coffee supply and menu, which is her distinctive strength", "Own growth: revenue has grown 20% in a year without paying fees", "Own growth: she keeps all the profit and her independence, but growth depends on her own time and money", "Judgement and justification with a condition, e.g. continue to grow independently unless the franchise profit exceeds her own within a stated period"],
          modelAnswer: "The franchise could raise revenue by 25% through the Brew & Bite brand and give support, and it might lower the risk of failure. But the forecast profit of US\\$24,580 is slightly below her present profit of US\\$24,840, she would have to borrow US\\$30,000 against her house, and she would lose control of her coffee supply and menu, which is her distinctive strength. Her own business has already grown 20% in a year without any fees, and she keeps all the profit and her independence, although further growth depends on her own time and money. I would advise Kopano to continue to grow her own business for now, because the franchise adds personal risk without raising profit in the first year, and to reconsider only if Brew & Bite can show that profit would exceed her current level within two or three years.",
          explanation: "Both options evaluated with a conditional judgement.",
        }),
      ]),
      hints: ["Use Year 3 figures for market share.", "Franchise profit = revenue − costs − royalty."],
      explanation: "Sole trader, tertiary; share 12.0%; growth 20.0%; US\\$13,800 per employee; franchise profit US\\$24,580, slightly below current profit.",
    });
  }

  // ------------------------------------------------------------------------------------------------------------------
  // Item 4: CAM_ESSAY20 (ownership)
  b.struct({
    ...pc({ d: 4, skill: EXAM.CAM_ESSAY20.skill, secs: EXAM.CAM_ESSAY20.secs, paper: "Cambridge Paper 1" }),
    concepts: ["abus.structure.unincorporated", "abus.structure.companies", "abus.structure.franchise-jv-social"],
    stem: "Answer both parts of the question.",
    parts: checkExam(EXAM.CAM_ESSAY20, [
      P.manual({
        label: "(a)", marks: 8, type: "EXTENDED_RESPONSE", wordLimit: { max: 300 }, levels: LV8,
        stem: "Analyse **two** benefits to the owners of a business of limited liability.",
        points: ["Benefit 1: owners' personal property is protected from business debts", "Development: they can lose only the money they invested in shares", "Consequence: owners are more willing to take risks and start or expand a business", "Benefit 2: investors are more willing to buy shares", "Development: a company can raise more capital from many shareholders", "Consequence: it can expand faster than a sole trader limited by one person's savings", "Context or limit: lenders may still ask for personal guarantees", "Overall link: limited liability supports investment and growth"],
        modelAnswer: "Limited liability protects owners' personal property from the business's debts. If the company fails, shareholders can lose only the money they invested in shares, not their homes. This makes owners more willing to take risks and to start or expand a business, which can lead to growth and employment.\n\nA second benefit is that investors are more willing to buy shares. A company can raise more capital from many shareholders than a sole trader can from one person's savings, so it can expand faster. However, lenders may still ask the directors of a small company for personal guarantees, which limits the protection. Overall, limited liability supports investment and growth.",
        explanation: "Two benefits analysed with chains of reasoning.",
      }),
      P.manual({
        label: "(b)", marks: 12, type: "EXTENDED_RESPONSE", wordLimit: { max: 450 }, levels: LV12,
        stem: "A fictional entrepreneur plans to open a restaurant. She has US\\$10,000 and needs US\\$40,000. Evaluate whether she should operate as a sole trader, form a partnership, or form a private limited company.",
        points: ["Sole trader: full control and all profit, simple to start", "Sole trader: unlimited liability; US\\$10,000 of savings is far below the US\\$40,000 needed", "Sole trader: borrowing US\\$30,000 would put her home at risk", "Partnership: partners can supply capital and skills, sharing the workload", "Partnership: unlimited liability for all partners, and disagreements are possible", "Partnership: profit and control are shared", "Private limited company: limited liability protects her property", "Private company: shares can be sold to investors, raising capital without a loan", "Private company: more cost, paperwork and loss of control if investors join", "Criterion: the amount of capital and risk is the main factor", "Judgement with a clear recommendation", "Justification and condition, e.g. depends on the trust between partners, willingness to share control and the time-frame for growth"],
        modelAnswer: "As a sole trader she would keep all the profit and control, and set-up would be simple. But she has unlimited liability and has only US\\$10,000 of the US\\$40,000 needed, so borrowing US\\$30,000 would put her home at risk.\n\nA partnership would let her share the capital, skills and workload, but all partners have unlimited liability, profit and control are shared, and disagreements are possible. A private limited company would protect her personal property through limited liability and could raise capital by selling shares to investors without a loan, but it involves more cost and paperwork, and she would lose some control if investors join.\n\nThe main factors are the amount of capital needed and the risk to her property. On balance a private limited company is the most suitable, because the shortfall of US\\$30,000 is large and limited liability protects her; a partnership would be better if she can find a trusted partner with capital and wants a simpler structure, and a sole trader only if she can start smaller.",
        explanation: "Three forms evaluated against capital and risk with a justified conclusion.",
      }),
    ]),
    hints: ["Link each form to the amount of capital and the risk."],
    explanation: "(a) benefits of limited liability; (b) three forms judged against capital and risk.",
  });

  // ------------------------------------------------------------------------------------------------------------------
  // Item 5: CAM_ESSAY20 (growth)
  b.struct({
    ...pc({ d: 4, skill: EXAM.CAM_ESSAY20.skill, secs: EXAM.CAM_ESSAY20.secs, paper: "Cambridge Paper 1" }),
    concepts: ["abus.size.organic-growth", "abus.size.small-business", "abus.size.measuring"],
    stem: "Answer both parts of the question.",
    parts: checkExam(EXAM.CAM_ESSAY20, [
      P.manual({
        label: "(a)", marks: 8, type: "EXTENDED_RESPONSE", wordLimit: { max: 300 }, levels: LV8,
        stem: "Analyse **two** reasons why a business might want to grow.",
        points: ["Reason 1: economies of scale", "Development: bulk buying and spreading fixed costs over more output lower average cost", "Consequence: higher profit margin or the ability to cut prices", "Reason 2: greater market share and security", "Development: a larger share gives more influence over prices and customers", "Consequence: the business is less at risk from one competitor or customer", "Context or limit: growth can bring diseconomies of scale", "Overall link: growth is useful when it lowers costs and improves security"],
        modelAnswer: "One reason is economies of scale. As output rises, a business can buy materials in bulk and spread fixed costs over more units, so average cost falls. This gives a higher profit margin or the ability to cut prices and win more customers.\n\nA second reason is greater market share and security. A larger share gives more influence over prices and customers, and a larger business is less at risk if one competitor or customer changes behaviour. However, growth that is too fast can bring diseconomies of scale, such as poor communication. Growth is therefore useful when it lowers costs and improves security.",
        explanation: "Two reasons analysed with chains of reasoning.",
      }),
      P.manual({
        label: "(b)", marks: 12, type: "EXTENDED_RESPONSE", wordLimit: { max: 450 }, levels: LV12,
        stem: "A fictional family bakery in Bulawayo is profitable and has loyal customers. Its owners are considering opening three new branches in the next year, paid for by a bank loan. Evaluate whether rapid growth is the best strategy for the bakery.",
        points: ["Benefit: more branches could raise sales and market share", "Benefit: economies of scale from bulk buying", "Risk: a bank loan means repayments whatever sales are, raising the risk of failure", "Risk: overtrading, because stock and wages must be paid before new branches earn", "Risk: control and quality may suffer in new branches, damaging the loyal customers' trust", "Risk: management may be stretched, as owners cannot run everything", "Alternative: grow more slowly by opening one branch and paying from profit", "Alternative: staying small keeps personal service and low risk", "Criterion: the bakery's finance and management capacity", "Counter-argument: slower growth may let rivals take the market", "Judgement with a recommendation", "Justification with a condition or time-frame, e.g. open one branch first and expand further if it succeeds"],
        modelAnswer: "Rapid growth could raise sales and market share and bring economies of scale through bulk buying, which would increase the bakery's profit if demand is strong. But borrowing to open three branches means repayments whatever the sales, and the bakery could suffer overtrading, because stock and wages must be paid before the new branches earn. Quality and control may suffer in the new branches, which could damage the trust of the loyal customers, and the owners may not be able to manage everything.\n\nAn alternative is to open one branch and pay for it from profit, or to stay small and keep personal service and low risk, although slower growth may let rivals take the market. The key criterion is whether the bakery has the finance and management to cope. On balance rapid growth is not the best strategy now; the bakery should open one branch first and expand further only if that branch succeeds and the loan repayments are comfortably covered.",
        explanation: "Rapid growth weighed against slower options with a conditional recommendation.",
      }),
    ]),
    hints: ["Weigh the benefits of growth against the finance and management risks."],
    explanation: "(a) two reasons for growth; (b) rapid growth against slower options.",
  });
});
