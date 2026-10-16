// W1a exam-format items: ZIMSEC data response (25), case study (30) and essays (25 each)
import { concept, P, EXAM, checkExam, ZIM, ZBS, ZBE, table, sum, r2, rd, money, chk, pctChange } from "../lib.mjs";

const LV10 = [[1, 1, 3, "Limited, mostly generic description with little accurate detail"], [2, 4, 7, "Several accurate features described, some with development or an example"], [3, 8, 10, "Wide, accurate and well-developed description of the topic with relevant examples"]];
const LV15 = [[1, 1, 5, "Mostly description or assertion; one side only; no judgement"], [2, 6, 10, "Both sides developed, some application to the situation; judgement stated but weakly supported"], [3, 11, 15, "Balanced, well-developed arguments applied to the situation and a justified judgement that depends on stated conditions"]];

concept("abus.structure.companies", { file: "exam/w1a-zimsec", keyPrefix: "exam.w1a-zimsec" }, (b) => {
  // ------------------------------------------------------------------------------------------------------------------
  // Item 1: ZIM_DATA25 (Business Studies Paper 2 section A): Dube Furniture
  {
    const yr = [
      { y: "Year 1", sales: 310000, profit: 32550, emp: 31, mkt: 1480000 },
      { y: "Year 2", sales: 342000, profit: 30780, emp: 34, mkt: 1520000 },
      { y: "Year 3", sales: 372000, profit: 29760, emp: 38, mkt: 1550000 },
    ];
    const growth = pctChange(yr[0].sales, yr[2].sales);
    chk(growth, 20, 0.0001);
    const share3 = (yr[2].sales / yr[2].mkt) * 100;
    chk(share3, 24, 0.0001);
    const spe3 = yr[2].sales / yr[2].emp;
    chk(spe3, 9789.4737, 0.001);
    const m1 = (yr[0].profit / yr[0].sales) * 100;
    const m3 = (yr[2].profit / yr[2].sales) * 100;
    chk(m1, 10.5, 0.0001);
    chk(m3, 8, 0.0001);
    const data = table(["", "Year 1", "Year 2", "Year 3"], [
      ["Sales (US\\$)", ...yr.map((r) => r.sales)],
      ["Profit for the year (US\\$)", ...yr.map((r) => r.profit)],
      ["Number of employees", ...yr.map((r) => r.emp)],
      ["Total sales in the regional furniture market (US\\$)", ...yr.map((r) => r.mkt)],
    ]);
    b.struct({
      examStyle: true, d: 4, skill: EXAM.ZIM_DATA25.skill, secs: EXAM.ZIM_DATA25.secs, calculator: true, applies: ZBS, paper: "ZIMSEC BS Paper 2 section A",
      concepts: ["abus.structure.companies", "abus.size.measuring", "abus.size.small-business", "abus.structure.sectors"],
      stem: "Read the extract and study the data. Dube Furniture (Pvt) Ltd is a fictional business.\n\n**Dube Furniture (Pvt) Ltd, Mutare.** Mr Dube started the business ten years ago as a sole trader, making beds and wardrobes from timber. Four years ago he formed a private limited company, owned by himself and two relatives, so that his house would not be at risk when he borrowed to buy machines. The company makes furniture in a small factory and sells it to shops and directly to households in the region. Sales and the number of workers have risen each year, but timber prices have increased and a large importer has cut prices, so Dube Furniture has had to keep its own prices low. The directors now have two choices for a new cutting machine costing US\\$60,000: borrow the money from a bank, or sell a 30% share of the company to an outside investor.\n\n" + data,
      parts: checkExam(EXAM.ZIM_DATA25, [
        P.group({
          label: "(a)", stem: "Size and sector",
          parts: [
            P.mcq({ label: "(i)", marks: 1, stem: "In which sector does Dube Furniture mainly operate?", options: [["Secondary", "Correct: it manufactures furniture from timber."], ["Primary", "Primary firms grow or extract natural resources."], ["Tertiary", "Tertiary firms provide services."], ["Quaternary", "Quaternary firms deal in knowledge and information."]], answer: "A", explanation: "Making goods from raw materials is secondary activity." }),
            P.num({ label: "(ii)", marks: 2, kind: "pct", value: growth, stem: "Calculate the percentage growth in sales from Year 1 to Year 3, to one decimal place.", wrong: [r2(((yr[2].sales - yr[0].sales) / yr[2].sales) * 100), 62000], explanation: "(372,000 − 310,000) ÷ 310,000 × 100 = 20.0%." }),
            P.num({ label: "(iii)", marks: 2, kind: "pct", value: share3, stem: "Calculate Dube Furniture's market share in Year 3, to one decimal place.", wrong: [r2((yr[2].sales / yr[0].mkt) * 100), r2((yr[2].mkt / yr[2].sales) * 100)], explanation: "372,000 ÷ 1,550,000 × 100 = 24.0%." }),
            P.num({ label: "(iv)", marks: 2, kind: "money", dp: 0, tol: 0.5, value: spe3, stem: "Calculate sales per employee in Year 3, to the nearest dollar.", wrong: [r2(yr[2].sales * yr[2].emp), r2(yr[0].sales / yr[0].emp)], explanation: "372,000 ÷ 38 = 9,789.47, so US\\$9,789 to the nearest dollar." }),
          ],
        }),
        P.group({
          label: "(b)", stem: "Profit",
          parts: [
            P.num({ label: "(i)", marks: 2, kind: "pct", value: m1, stem: "Calculate the profit as a percentage of sales (profit ÷ sales × 100) in Year 1, to one decimal place.", wrong: [r2((yr[0].profit / yr[0].mkt) * 100), 32.55], explanation: "32,550 ÷ 310,000 × 100 = 10.5%." }),
            P.num({ label: "(ii)", marks: 2, kind: "pct", value: m3, stem: "Calculate the same percentage for Year 3, to one decimal place.", wrong: [r2((yr[2].profit / yr[2].mkt) * 100), 29.76], explanation: "29,760 ÷ 372,000 × 100 = 8.0%." }),
            P.mcq({ label: "(iii)", marks: 1, stem: "Which statement best describes the trend in Dube Furniture's results?", options: [["Sales and profit have both risen every year", "Profit has fallen each year."], ["Sales have risen but profit has fallen", "Correct: sales rose from US\\$310,000 to US\\$372,000 while profit fell from US\\$32,550 to US\\$29,760."], ["Sales and profit have both fallen every year", "Sales have risen each year."], ["Sales have fallen but profit has risen", "Sales have risen, not fallen."]], answer: "B", explanation: "Sales are up 20.0% but profit is down, so the profit margin has fallen from 10.5% to 8.0%." }),
          ],
        }),
        P.group({
          label: "(c)", stem: "Ownership",
          parts: [
            P.fib({
              label: "(i)", marks: 2, stem: "Complete the sentence about the shareholders of Dube Furniture (Pvt) Ltd.",
              template: "The shareholders of a private limited company have {{blank:a}} liability, so they can lose no more than the money they have {{blank:b}}.",
              blanks: [
                { id: "a", accepted: ["limited"], choices: ["limited", "unlimited"] },
                { id: "b", accepted: ["invested"], choices: ["borrowed", "invested", "earned"] },
              ],
              explanation: "Limited liability protects personal property; the loss is limited to the amount invested.",
            }),
            P.manual({ label: "(ii)", marks: 2, stem: "Explain why Mr Dube formed a company instead of continuing as a sole trader.", points: ["As a sole trader he had unlimited liability, so his house would be at risk when he borrowed", "As a company, the shareholders' liability is limited to their investment, which protects his house"], modelAnswer: "As a sole trader Mr Dube had unlimited liability and could lose his house if the business failed. As a private limited company, his liability is limited to his investment, so he can borrow without risking his home.", explanation: "Liability before and after." }),
          ],
        }),
        P.manual({
          label: "(d)", marks: 4, stem: "Analyse **two** reasons why Dube Furniture's profit has fallen although its sales have risen.",
          points: ["Timber prices have increased, so costs have risen", "Development: if costs rise faster than sales, profit falls (profit as a percentage of sales has fallen from 10.5% to 8.0%)", "A large importer has cut prices, so Dube has had to keep its prices low", "Development: lower prices reduce the profit earned on each piece of furniture even when more is sold"],
          modelAnswer: "Timber prices have risen, so costs have increased; if costs rise faster than sales, profit falls, which is why profit as a percentage of sales has fallen from 10.5% to 8.0%. A large importer has also cut prices, so Dube has had to keep its prices low, which reduces the profit on each piece of furniture even though more is sold.",
          explanation: "Two reasons, each developed using the data.",
        }),
        P.manual({
          label: "(e)", marks: 5, stem: "Advise the directors whether to finance the new machine by a bank loan or by selling 30% of the company to an outside investor. Justify your answer.",
          points: ["Bank loan: the owners keep full control and all the profit", "Bank loan: interest and repayments must be paid even though profit is falling", "Investor: no repayments and risk is shared", "Investor: the family owners lose 30% of the control and profit", "Judgement with a reason supported by the data, e.g. falling profit margin makes fixed repayments risky, so the investor may be safer if the family accepts losing some control"],
          modelAnswer: "A bank loan would let the family keep full control and all the profit, but interest and repayments would have to be paid even though the profit margin has fallen from 10.5% to 8.0%, which is risky. An investor would remove the need for repayments and share the risk, but the family would lose 30% of the control and of future profit. Because profit is falling, I would advise selling the 30% share, provided the family can accept an outsider's say in decisions; if control matters most, a smaller loan could be used instead.",
          explanation: "A reasoned recommendation using the data.",
        }),
      ]),
      hints: ["Percentage growth = increase ÷ original × 100.", "Market share = sales ÷ market sales × 100."],
      explanation: "Secondary sector; sales growth 20.0%; market share 24.0%; US\\$9,789 per employee; margin down from 10.5% to 8.0%; limited liability; costs and price competition; investor or loan weighed.",
    });
  }

  // ------------------------------------------------------------------------------------------------------------------
  // Item 2: ZIM_CASE30 (Paper 1 section B): Ncube Mushrooms
  {
    const costs = [["Two new growing sheds", 6400], ["Shelving and trays", 2300], ["First batch of spawn and substrate", 2600], ["Licence", 180], ["Working capital", 2520]];
    const total = sum(costs.map((c) => c[1]));
    chk(total, 14000);
    const own = 6500, loan = r2(total - own);
    chk(loan, 7500);
    const price = 4.8, vc = 2.4, fixed = 960;
    const be = fixed / (price - vc);
    chk(be, 400);
    const planned = 650;
    const mos = ((planned - be) / planned) * 100;
    chk(mos, 38.4615, 0.001);
    const mk = 495000, sales = 99000, last = 81000;
    const share = (sales / mk) * 100;
    chk(share, 20, 0.0001);
    const gr = pctChange(last, sales);
    chk(gr, 22.2222, 0.001);
    b.struct({
      examStyle: true, d: 4, skill: EXAM.ZIM_CASE30.skill, secs: EXAM.ZIM_CASE30.secs, calculator: true, applies: ZIM, paper: "ZIMSEC Paper 1 section B",
      concepts: ["abus.enterprise.business-plans", "abus.size.small-business", "abus.structure.unincorporated", "abus.size.measuring", "abus.structure.sectors"],
      stem: "Read the case study (a fictional business) and answer all the questions.\n\n**Ncube Mushrooms, Gweru.** Thandeka Ncube grows oyster mushrooms in two small sheds behind her house and sells them fresh to restaurants and supermarkets. She is a sole trader and employs three part-time workers. Last year her sales were US\\$99,000 compared with US\\$81,000 the year before, in a regional mushroom market worth US\\$495,000 a year. A large farm in another province has begun to sell in the same market at lower prices.\n\nThandeka wants to build two more sheds. Her business plan gives the start-up costs below. She has US\\$6,500 of her own money. The bank will lend the rest only if she offers her house as security. She expects to sell each kilogram for US\\$4.80, the variable cost is US\\$2.40 a kilogram and fixed costs are US\\$960 a month. She forecasts sales of 650 kg a month. Her cousin Sipho has offered to join her as a partner, put in US\\$7,500 and share profits equally.\n\n" + table(["Start-up cost for the expansion", "US\\$"], costs),
      parts: checkExam(EXAM.ZIM_CASE30, [
        P.group({
          label: "(a)", stem: "Business activity and ownership",
          parts: [
            P.mcq({ label: "(i)", marks: 1, stem: "In which sector is the growing of mushrooms?", options: [["Primary", "Correct: growing is a primary activity."], ["Secondary", "Secondary firms manufacture goods."], ["Tertiary", "Tertiary firms provide services."], ["Quaternary", "Quaternary firms deal in knowledge."]], answer: "A", explanation: "Growing crops is primary production." }),
            P.mcq({ label: "(ii)", marks: 1, stem: "What kind of liability does Thandeka have for the debts of her business?", options: [["Unlimited liability", "Correct: as a sole trader she is personally liable."], ["Limited liability", "Limited liability belongs to company shareholders."], ["No liability", "The owner is liable for debts."], ["Liability shared with her customers", "Customers are not liable for the owner's debts."]], answer: "A", explanation: "A sole trader has unlimited liability." }),
            P.fib({
              label: "(iii)", marks: 2, stem: "Complete the sentence about a sole trader.",
              template: "A sole trader keeps all the {{blank:a}} but has {{blank:b}} liability for debts.",
              blanks: [
                { id: "a", accepted: ["profit"], choices: ["profit", "debts", "shares"] },
                { id: "b", accepted: ["unlimited"], choices: ["limited", "unlimited"] },
              ],
              explanation: "The owner receives all the profit but is personally liable without limit.",
            }),
          ],
        }),
        P.group({
          label: "(b)", stem: "Business plan figures",
          parts: [
            P.num({ label: "(i)", marks: 2, kind: "money", value: total, stem: "Calculate the total funding required for the expansion.", wrong: [r2(total - 2520), r2(total - 180)], explanation: "6,400 + 2,300 + 2,600 + 180 + 2,520 = US\\$14,000." }),
            P.num({ label: "(ii)", marks: 2, kind: "money", value: loan, stem: "Calculate the amount Thandeka would need to borrow if she uses only her own money and a bank loan.", wrong: [total, own], explanation: "14,000 − 6,500 = US\\$7,500." }),
            P.num({ label: "(iii)", marks: 2, kind: "plain", unit: "kg", value: be, stem: "Calculate the monthly break-even output in kilograms.", wrong: [r2(fixed / price), r2(fixed / vc)], explanation: "Contribution = 4.80 − 2.40 = 2.40. Break-even = 960 ÷ 2.40 = 400 kg." }),
            P.num({ label: "(iv)", marks: 2, kind: "pct", value: mos, stem: "Calculate the margin of safety as a percentage of forecast sales (650 kg), to one decimal place.", wrong: [r2(((planned - be) / be) * 100), 250], explanation: "(650 − 400) ÷ 650 × 100 = 38.5%. Dividing by break-even output gives 62.5%." }),
          ],
        }),
        P.group({
          label: "(c)", stem: "Size and growth",
          parts: [
            P.num({ label: "(i)", marks: 2, kind: "pct", value: share, stem: "Calculate Ncube Mushrooms' market share last year, to one decimal place.", wrong: [r2((mk / sales) * 100), r2((last / mk) * 100)], explanation: "99,000 ÷ 495,000 × 100 = 20.0%." }),
            P.num({ label: "(ii)", marks: 2, kind: "pct", value: gr, stem: "Calculate the percentage growth in sales over last year, to one decimal place.", wrong: [r2(((sales - last) / sales) * 100), 18000], explanation: "(99,000 − 81,000) ÷ 81,000 × 100 = 22.2%." }),
          ],
        }),
        P.manual({
          label: "(d)", marks: 4, stem: "Explain **two** problems that Ncube Mushrooms is likely to face as a small business.",
          points: ["Finance: the bank will lend only against her house, so she cannot expand without risking her home", "Development: she cannot buy the extra sheds without the money, so growth is slowed", "Competition: a large farm sells at lower prices", "Development: large farms can buy inputs in bulk and have lower costs, so she may lose customers or have to cut her price"],
          modelAnswer: "Finance is a problem: the bank will lend only if she offers her house, so she cannot expand without risking her home, and her growth is slowed. A large farm is selling at lower prices; large farms buy inputs in bulk and have lower costs, so Thandeka may lose customers or have to cut her price.",
          explanation: "Two problems, each developed.",
        }),
        P.manual({
          label: "(e)", marks: 4, stem: "Explain why the bank would want to see Thandeka's business plan before it lends to her.",
          points: ["The plan shows how the loan will be used and what the expansion will cost", "Development: the bank can see that total funding is US\\$14,000", "The cash flow forecast and break-even show whether the loan could be repaid", "Development: the break-even output is 400 kg against a forecast of 650 kg, a margin of safety of 38.5%, which lowers the bank's risk"],
          modelAnswer: "The plan shows how the loan will be used, since the expansion needs US\\$14,000 in total. The break-even and forecast figures show whether the loan can be repaid: break-even is 400 kg a month against a forecast of 650 kg, a margin of safety of 38.5%, which lowers the bank's risk of not being repaid.",
          explanation: "Uses the figures in the plan.",
        }),
        P.manual({
          label: "(f)", marks: 6, stem: "Advise Thandeka whether she should borrow from the bank as a sole trader or take Sipho as a partner. Justify your answer.",
          points: ["Bank loan: she keeps control and all the profit", "Bank loan: her house is at risk if the expansion fails (unlimited liability)", "Partner: Sipho provides the US\\$7,500 so no loan is needed", "Partner: profits are shared equally and decisions must be shared", "Partner: Sipho would also have unlimited liability and disagreements are possible, so a written agreement is needed", "Judgement and reason, e.g. choose the partnership with a written agreement because it protects her house, if she is willing to share control"],
          modelAnswer: "A bank loan lets Thandeka keep control and all the profit, but she would have to put up her house, and as a sole trader she would be personally liable if the expansion failed. A partnership with Sipho avoids the loan because he provides US\\$7,500, but profits and decisions would be shared equally and disagreements are possible; Sipho would also have unlimited liability. I would advise the partnership with a written agreement on duties, profit shares and what happens if a partner leaves, because it protects her house and the forecast margin of safety shows the expansion should be profitable; if she is unwilling to share control, she should borrow a smaller amount and expand more slowly.",
          explanation: "Both options judged with a conditional recommendation.",
        }),
      ]),
      hints: ["Add the start-up costs before finding the loan.", "Break-even = fixed costs ÷ contribution per kilogram."],
      explanation: "Funding US\\$14,000; loan US\\$7,500; break-even 400 kg; margin of safety 38.5%; market share 20.0%; sales growth 22.2%; problems of finance and competition; partnership or loan weighed.",
    });
  }

  // ------------------------------------------------------------------------------------------------------------------
  // Item 3: ZIM_ESSAY25: private limited companies and conversion
  b.struct({
    examStyle: true, d: 4, skill: EXAM.ZIM_ESSAY25.skill, secs: EXAM.ZIM_ESSAY25.secs, applies: ZIM, paper: "ZIMSEC Paper 2 section B",
    concepts: ["abus.structure.companies", "abus.structure.unincorporated"],
    stem: "Answer both parts of the question.",
    parts: checkExam(EXAM.ZIM_ESSAY25, [
      P.manual({
        label: "(a)", marks: 10, type: "EXTENDED_RESPONSE", wordLimit: { max: 400 }, levels: LV10,
        stem: "Describe the main features of a private limited company.",
        points: ["It is a separate legal person from its owners", "It can own property and make contracts in its own name", "Ownership is divided into shares held by shareholders", "Shareholders have limited liability: they can lose only what they invested", "Their personal property cannot be claimed for the company's debts", "Shares are sold privately and cannot be offered to the general public", "Share transfer usually needs the agreement of the other owners", "Directors, elected by the shareholders, run the company", "The company continues if a shareholder dies or sells shares (continuity)", "Profits are shared as dividends according to the number of shares held; the accounts are filed, with less disclosure than for a public company"],
        modelAnswer: "A private limited company is a separate legal person from its owners. It can own property and make contracts in its own name, and it can sue or be sued. Ownership is divided into shares, and the owners are shareholders. Their liability is limited: if the company fails, they lose only the money they invested, and their personal property cannot be claimed for the company's debts. This makes people more willing to invest.\n\nThe shares of a private company are sold privately and cannot be offered to the general public, and a shareholder who wants to sell usually needs the agreement of the other owners. The shareholders elect directors to run the company on their behalf, so in a small company the owners and directors are often the same people. The company has continuity: it carries on if a shareholder dies or sells shares. Profits are paid to shareholders as dividends in proportion to the shares they hold. A private company must file its accounts, but it has to disclose less than a public company.",
        explanation: "One mark for each accurate feature, developed.",
      }),
      P.manual({
        label: "(b)", marks: 15, type: "EXTENDED_RESPONSE", wordLimit: { max: 650 }, levels: LV15,
        stem: "Discuss whether a successful sole trader should convert the business into a private limited company.",
        points: ["Limited liability protects the owner's personal property if the business fails", "This encourages the owner to take risks and to borrow for growth", "A company can raise capital by selling shares to investors", "Capital from shares needs no repayments and may allow expansion without a bank loan", "A company has continuity and a separate identity, so it can continue if the owner dies or retires", "Lenders and customers may see a company as more established", "Against: registration and legal costs are greater", "Against: accounts must be filed, so there is less privacy", "Against: more rules to follow on meetings, records and directors' duties", "Against: if outside shareholders are admitted, the owner loses some control and shares profit", "Against: lenders may still ask for personal guarantees, reducing the benefit of limited liability", "Application: the benefit is greater when the business is growing, borrowing or holds large stock", "Application: the move is less worthwhile for a small, low-risk business that needs no new capital", "Judgement stated clearly", "Justification: the decision depends on the size of the risk, the capital needed and the owner's willingness to share control"],
        modelAnswer: "A sole trader has unlimited liability, so if the business fails the owner's house and savings can be used to pay its debts. Converting to a private limited company gives limited liability: the owner could lose only what was invested in shares. This protection encourages the owner to take risks and to borrow for growth. A company can also raise capital by selling shares to investors, which does not have to be repaid like a loan and may allow expansion without a bank loan. A company has continuity, because it carries on if the owner dies or retires, and lenders and customers may see it as more established.\n\nHowever, there are costs. Registration and legal costs are greater, accounts must be filed so there is less privacy, and there are more rules on records and directors' duties. If outside shareholders are admitted, the owner loses some control and must share profit. Lenders may also ask for personal guarantees, which reduces the benefit of limited liability.\n\nThe benefit is greatest when the business is growing, borrowing heavily or carrying a lot of stock, so that the risk of large debts is real. For a small, low-risk business that needs no new capital, the extra cost and formality may not be worth it. On balance, a successful sole trader who wants to expand and borrow should convert, provided the owner can accept sharing some control and the extra costs; a stable business with little debt may stay as it is.",
        explanation: "Level descriptors apply: both sides, application and a justified judgement.",
      }),
    ]),
    hints: ["Describe features in (a); in (b) give both sides and a judgement."],
    explanation: "(a) features of a private limited company; (b) discussion of limited liability and capital against cost and loss of control.",
  });

  // ------------------------------------------------------------------------------------------------------------------
  // Item 4: ZIM_ESSAY25 (Business Enterprise Skills): the enterpriser and constraints
  b.struct({
    examStyle: true, d: 4, skill: EXAM.ZIM_ESSAY25.skill, secs: EXAM.ZIM_ESSAY25.secs, applies: ZBE, paper: "ZIMSEC BES Paper 2",
    concepts: ["abus.enterprise.entrepreneurs", "abus.enterprise.ventures-risks"],
    stem: "Answer both parts of the question.",
    parts: checkExam(EXAM.ZIM_ESSAY25, [
      P.manual({
        label: "(a)", marks: 10, type: "EXTENDED_RESPONSE", wordLimit: { max: 400 }, levels: LV10,
        stem: "Describe the characteristics of a successful enterpriser.",
        points: ["Shows initiative: spots opportunities and acts on them", "Willing to take calculated risks", "Creative and innovative: finds new or better ways to meet needs", "Determined and resilient: continues after failures", "Self-confident: believes in the idea and persuades others", "Organised and a good planner", "Honest and ethical in dealing with customers and suppliers", "Good with money: controls costs and records", "A leader who can motivate workers", "Willing to learn: from mistakes, training and customers"],
        modelAnswer: "A successful enterpriser shows initiative: she spots an opportunity, such as a need that local people cannot meet, and acts on it. She is willing to take calculated risks, investing time and money in an uncertain venture, but she plans carefully to keep the risk manageable. She is creative and innovative, looking for new or better ways to meet needs, and she is determined and resilient, carrying on after setbacks such as a failed crop or a lost customer.\n\nShe is self-confident, so she can persuade lenders, suppliers and customers. She is organised and a good planner, and she is good with money, controlling costs and keeping records. She is honest and ethical with customers and suppliers, which builds trust and repeat business. She leads and motivates the people who work for her, and she is willing to learn from mistakes, training and customers.",
        explanation: "One mark for each accurate characteristic, developed.",
      }),
      P.manual({
        label: "(b)", marks: 15, type: "EXTENDED_RESPONSE", wordLimit: { max: 650 }, levels: LV15,
        stem: "Discuss whether the constraints on enterprises make enterprising not worthwhile.",
        points: ["Political constraints: changing policies on land, taxes and trade reduce confidence", "Legal constraints: licences, registration and health rules add cost and delay", "Economic constraints: high costs of power and transport, inflation and weak demand reduce profit", "Social constraints: community attitudes, customs and crime can limit what a venture can do", "Ecological constraints: limits on water and land use and the need to avoid pollution", "These constraints can make some ventures unprofitable or force owners to give up", "For: they affect smaller enterprisers more, who have fewer resources to cope", "Against: enterprise still creates income and jobs even under constraints", "Against: some constraints protect customers, workers and the environment, and improve the quality of the venture", "Against: enterprisers can adapt by starting small, choosing a different venture or joining groups", "Application: for example a vendor who must meet health rules can sell on safety and quality", "Application: the benefits are greater where demand is strong and inputs are available locally", "Judgement stated clearly", "Justification: depends on the size of the constraint and the strength of the opportunity", "Conclusion that links the judgement to the enterpriser's own qualities"],
        modelAnswer: "Enterprises face several constraints. Politically, changing policies on land, taxes and trade reduce confidence. Legally, licences, registration and health rules add cost and delay. Economically, high power and transport costs, inflation and weak demand reduce profit. Socially, community attitudes and crime can limit what a venture can do, and ecologically, limits on water and land use and the need to avoid pollution can restrict the size of an enterprise. Together these can make some ventures unprofitable and force owners to give up, and they affect small enterprisers most because they have few resources to absorb extra costs.\n\nHowever, enterprising can still be worthwhile. Enterprise creates income and jobs even under constraints, and some constraints protect customers, workers and the environment and improve the quality of the venture. For example, a food vendor who must meet health rules can sell on safety and quality. Enterprisers can also adapt by starting small, choosing a different venture or joining groups to share costs.\n\nOn balance, constraints do not make enterprising pointless, but they make it more demanding. Enterprising is worthwhile where demand is strong, inputs are available locally and the enterpriser has the qualities to adapt; where a constraint is severe and the opportunity is weak, a different venture would be wiser.",
        explanation: "Level descriptors apply: both sides, application and a justified judgement.",
      }),
    ]),
    hints: ["Cover each type of constraint, then weigh them against the benefits of enterprising."],
    explanation: "(a) characteristics of an enterpriser; (b) discussion of constraints against the value of enterprising.",
  });
});
