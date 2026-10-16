// W1b exam-format items: Cambridge Papers 1-4 (two 5-mark questions, one data response, two 20-mark essays, two 8-mark, one 16-mark, one 12-mark)
import { concept, P, EXAM, checkExam, CAM, table, sum, r2, money, chk, pctChange } from "../lib.mjs";

const LV8 = [[1, 1, 3, "Limited knowledge; points are stated or only partly explained"], [2, 4, 6, "Good analysis; points explained and applied to the context"], [3, 7, 8, "Developed, accurate analysis with clear chains of reasoning applied to the context"]];
const LV12 = [[1, 1, 4, "Mostly assertion or description; one-sided; limited or no judgement"], [2, 5, 8, "Some balance and application; a judgement that is not fully supported"], [3, 9, 12, "Balanced arguments applied to the context and a supported judgement that considers conditions or time-frame"]];
const LV8E = [[1, 1, 2, "Assertion with little support; no judgement"], [2, 3, 5, "Arguments for and against, partly applied; judgement stated"], [3, 6, 8, "Balanced, applied arguments and a justified recommendation with a condition"]];
const LV6 = [[1, 1, 2, "Limited knowledge; points stated or only partly explained"], [2, 3, 4, "Points explained and applied to the context"], [3, 5, 6, "Developed, accurate analysis with clear chains of reasoning applied to the context"]];

concept("abus.size.mergers-takeovers", { file: "exam/w1b-cambridge", keyPrefix: "exam.w1b-cambridge", applies: CAM }, (b) => {
  const pc = (extra = {}) => ({ examStyle: true, applies: CAM, ...extra });

  // ------------------------------------------------------------------------------------------------------------------
  // Item 1: CAM_SHORT5 (mergers)
  {
    const market = 700000, a = 60000, bb = 45000;
    const share = ((a + bb) / market) * 100;
    chk(share, 15, 1e-9);
    b.struct({
      ...pc({ d: 3, skill: EXAM.CAM_SHORT5.skill, secs: EXAM.CAM_SHORT5.secs, calculator: true, paper: "Cambridge Paper 1" }),
      concepts: ["abus.size.mergers-takeovers"],
      stem: `Two fictional furniture manufacturers in Lusaka, with yearly revenue of ${money(a)} and ${money(bb)}, plan to merge. Together all furniture manufacturers in the city have revenue of ${money(market)} a year. The managers of the two firms have very different ways of working.`,
      parts: checkExam(EXAM.CAM_SHORT5, [
        P.num({ label: "(a)", marks: 2, kind: "pct", value: share, stem: "Calculate the market share of the merged firm. Give your answer as a percentage to one decimal place.", wrong: [(a / market) * 100, (bb / market) * 100], explanation: "Combined revenue = 60,000 + 45,000 = 105,000. Market share = 105,000 ÷ 700,000 × 100 = 15.0%." }),
        P.manual({
          label: "(b)", marks: 3, stem: "Explain **one** reason why the merger may fail to achieve its objectives.",
          points: ["Clash of cultures: managers have very different ways of working", "Staff may disagree, become demotivated or leave", "Productivity falls, so expected cost savings or sales are not achieved"],
          modelAnswer: "The managers' different ways of working may cause a clash of cultures. Staff may disagree with the new style, lose motivation or leave, so productivity falls and the expected cost savings or extra sales are not achieved.",
          explanation: "A reason, applied to the case, with a consequence.",
        }),
      ]),
      hints: ["Market share = firm's revenue ÷ market revenue × 100.", "Use the information about the managers."],
      explanation: "Merged market share 15.0%; a clash of cultures can stop the merger from reaching its objectives.",
    });
  }

  // ------------------------------------------------------------------------------------------------------------------
  // Item 2: CAM_SHORT5 (SMART objectives)
  {
    const rev = 85000, rise = 12;
    const target = (rev * (100 + rise)) / 100;
    chk(target, 95200, 1e-9);
    b.struct({
      ...pc({ d: 3, skill: EXAM.CAM_SHORT5.skill, secs: EXAM.CAM_SHORT5.secs, calculator: true, paper: "Cambridge Paper 1" }),
      concepts: ["abus.objectives.decisions-ethics"],
      stem: `A fictional bakery in Lusaka had revenue of ${money(rev)} last year. The owner sets an objective of increasing revenue by ${rise}% by the end of this year and plans to tell the bakers and delivery drivers about the objective at a staff meeting.`,
      parts: checkExam(EXAM.CAM_SHORT5, [
        P.num({ label: "(a)", marks: 2, kind: "money", value: target, stem: "Calculate the revenue target for this year.", wrong: [(rev * rise) / 100, rev + rise], explanation: "12% of 85,000 = 10,200. Target = 85,000 + 10,200 = US\\$95,200." }),
        P.manual({
          label: "(b)", marks: 3, stem: "Explain **one** reason why the owner should communicate the objective to the bakers and drivers.",
          points: ["Workers need to know what they are aiming for", "Bakers can plan how much bread to produce and drivers how many deliveries to make", "A shared target improves coordination and motivation, so the target is more likely to be met"],
          modelAnswer: "The bakers and drivers need to know what the bakery is aiming for. Bakers can plan how much bread to bake and drivers how many deliveries to make, and a shared target improves coordination and motivation, so the target is more likely to be met.",
          explanation: "A reason, applied to the bakery, with a result.",
        }),
      ]),
      hints: ["Find 12% of last year's revenue, then add it.", "Think about what each group of workers does."],
      explanation: "Target US\\$95,200; communicating objectives gives direction and motivation.",
    });
  }

  // ------------------------------------------------------------------------------------------------------------------
  // Item 3: CAM_DATA30 (a dairy considering a takeover)
  {
    const market = 8000000, mw = 1200000, kf = 400000;
    const s1 = (mw / market) * 100, s2 = ((mw + kf) / market) * 100;
    chk(s1, 15, 1e-9);
    chk(s2, 20, 1e-9);
    b.struct({
      ...pc({ d: 4, skill: EXAM.CAM_DATA30.skill, secs: EXAM.CAM_DATA30.secs, calculator: true, paper: "Cambridge Paper 2" }),
      concepts: ["abus.size.mergers-takeovers", "abus.objectives.aims-types", "abus.stakeholders.roles-influence"],
      stem:
        `Mwana Dairy is a fictional milk and yoghurt producer in Lusaka. Its mission is "to bring healthy dairy products to every home at a fair price". Its objective is to increase its share of the city's dairy market. The directors are considering a takeover of Kafue Cheese, a small producer of cheese. The directors of Kafue Cheese oppose the bid, and the local farmers who supply Kafue Cheese with milk fear that Mwana will switch to cheaper suppliers. A pressure group has asked Mwana to guarantee a fair price to farmers.\n\n` +
        table(["Last year", "Mwana Dairy", "Kafue Cheese", "Whole dairy market in Lusaka"], [["Revenue (US\\$)", mw, kf, market], ["Number of workers", 90, 32, ""]]) +
        `\n\nMwana's directors say that the takeover would allow a saving in overheads, but some of Kafue Cheese's workers fear redundancy.`,
      parts: checkExam(EXAM.CAM_DATA30, [
        P.mcq({ label: "(a)", marks: 2, stem: "Identify the type of integration and the type of takeover shown in the case.", options: [["Horizontal integration; hostile takeover", "Correct: both make dairy products and the target's directors oppose the bid."], ["Backward vertical integration; friendly takeover", "Kafue Cheese is not a supplier and its directors oppose the bid."], ["Forward vertical integration; hostile takeover", "Kafue Cheese is not a distributor, although the takeover is hostile."], ["Conglomerate integration; friendly takeover", "Both firms make dairy products and the bid is opposed."]], answer: "A", explanation: "Two dairy producers at the same stage joining is horizontal; the opposition of the target's directors makes it hostile." }),
        P.group({
          label: "(b)", stem: "Market share:",
          parts: [
            P.num({ label: "(i)", marks: 2, kind: "pct", value: s1, stem: "Calculate Mwana Dairy's current share of the Lusaka dairy market. Give your answer as a percentage to one decimal place.", wrong: [(kf / market) * 100, (mw / (market - mw)) * 100], explanation: "1,200,000 ÷ 8,000,000 × 100 = 15.0%." }),
            P.num({ label: "(ii)", marks: 2, kind: "pct", value: s2, stem: "Calculate the market share of the combined firm if the takeover succeeds. Give your answer as a percentage to one decimal place.", wrong: [(kf / market) * 100, ((mw + kf) / (market - kf)) * 100], explanation: "(1,200,000 + 400,000) ÷ 8,000,000 × 100 = 20.0%." }),
          ],
        }),
        P.manual({
          label: "(c)", marks: 4, stem: "Explain **one** reason why Mwana Dairy wants to take over Kafue Cheese.",
          points: ["To increase market share, which is its objective", "Application: the combined firm would hold 20.0% instead of 15.0% of the market", "To reduce costs through economies of scale or savings in overheads", "Application: lower cost per unit allows lower prices or higher profit"],
          modelAnswer: "Mwana's objective is to increase its market share, and the takeover would raise its share from 15.0% to 20.0%. It would also save overheads and gain economies of scale, so cost per unit would fall, allowing lower prices or higher profit.",
          explanation: "A reason, developed with the figures.",
        }),
        P.manual({
          label: "(d)", marks: 6, type: "EXTENDED_RESPONSE", wordLimit: { max: 220 }, levels: LV6, stem: "Analyse the possible effects of the takeover on the workers and on the farmers who supply Kafue Cheese.",
          points: ["Workers: some jobs duplicated and may be lost", "Application: Kafue Cheese's workers already fear redundancy", "Consequence: low morale or loss of skills may reduce quality and output", "Farmers: Mwana may switch to cheaper suppliers", "Application: the farmers fear a loss of orders", "Consequence: lower incomes for farmers, or pressure on them to cut prices"],
          modelAnswer: "Some of Kafue Cheese's jobs may be duplicated in Mwana's administration and could be lost, and the workers already fear redundancy. Low morale or the loss of skilled cheese makers could reduce quality and output. The farmers who supply Kafue Cheese are also at risk because Mwana may switch to cheaper suppliers. They could lose orders and income, or be pressured to cut their prices.",
          hints: ["Write a chain for each group, using the case."],
          explanation: "Two groups, each with an effect, an application and a consequence.",
        }),
        P.manual({
          label: "(e)", marks: 6, type: "EXTENDED_RESPONSE", wordLimit: { max: 220 }, levels: LV6, stem: "Assess why the takeover may not achieve Mwana Dairy's objectives.",
          points: ["Kafue Cheese's directors oppose the bid, so the integration may be difficult", "Application: key managers may leave, taking knowledge of the cheese business with them", "Mwana may overpay to win the bid", "Application: a premium over the share price must be recovered through higher profit", "Culture clash or diseconomies of scale could raise costs", "Judgement: the takeover is risky unless the price is fair and key people are kept"],
          modelAnswer: "Kafue Cheese's directors oppose the bid, so they may leave once it succeeds, taking their knowledge of cheese making with them. Mwana may also have to pay a premium over the share price to win, and this must be recovered through higher profit. If the two organisations clash in culture or the bigger firm becomes harder to manage, costs could rise instead of fall. The takeover is therefore risky for Mwana unless the price is fair and the key people are kept.",
          hints: ["Use the opposition of the directors and the idea of overpaying."],
          explanation: "Reasons for failure applied to the case and a judgement.",
        }),
        P.manual({
          label: "(f)", marks: 8, type: "EXTENDED_RESPONSE", wordLimit: { max: 300 }, levels: LV8E, stem: "Evaluate whether Mwana Dairy should go ahead with the takeover or form a joint venture with Kafue Cheese instead.",
          points: ["Takeover: full control and 20.0% market share, with possible savings", "Takeover: hostile, costly, risk of key staff leaving and of a premium", "Takeover: fear among workers and farmers; reaction of the pressure group", "Joint venture: shares cost and risk and keeps Kafue's skills and goodwill", "Joint venture: less control, shared profit, possible disagreements", "Joint venture: may not give the market share objective as quickly", "Stakeholders: farmers' fair price may protect the mission and reputation", ["Recommendation with a reason and a condition", 1]],
          modelAnswer: "A takeover would give Mwana full control and a 20.0% market share, with savings in overheads. But the bid is hostile, may require a premium, and key staff may leave. Workers and farmers would be anxious, and the pressure group could damage Mwana's reputation. A joint venture would share the cost and risk and keep Kafue's skills and goodwill, but Mwana would have less control and would share the profit, and it might reach its share objective more slowly. Given the opposition and the mission to be fair to farmers, a joint venture is probably better at first, provided the partners agree on how to run it. Mwana could revisit a takeover later if the joint venture succeeds and Kafue's directors agree.",
          hints: ["Compare the two options on control, cost, risk and stakeholders, then recommend with a condition."],
          explanation: "Takeover and joint venture compared with the case; a conditional recommendation.",
        }),
      ]),
      hints: ["Use the data table for the two market shares.", "Link each answer to the case."],
      explanation: "Horizontal, hostile; shares 15.0% and 20.0%; reasons for the takeover; effects on workers and farmers; reasons for failure; takeover against joint venture.",
    });
  }

  // ------------------------------------------------------------------------------------------------------------------
  // Item 4: CAM_ESSAY20 (AS: objectives and stakeholders)
  b.struct({
    ...pc({ d: 4, skill: EXAM.CAM_ESSAY20.skill, secs: EXAM.CAM_ESSAY20.secs, paper: "Cambridge Paper 1" }),
    concepts: ["abus.objectives.aims-types", "abus.stakeholders.roles-influence"],
    stem: "Answer both parts of the question.",
    parts: checkExam(EXAM.CAM_ESSAY20, [
      P.manual({
        label: "(a)", marks: 8, type: "EXTENDED_RESPONSE", wordLimit: { max: 300 }, levels: LV8,
        stem: "Analyse **two** reasons why the objectives of a business might change over time.",
        points: ["Reason 1: the business moves through stages, for example from survival to growth", "Development: a new firm must first cover its costs; once secure it can plan for profit or expansion", "Consequence: its targets, budgets and strategy change", "Reason 2: changes in the external environment, such as a recession or new competitor", "Development: demand falls or rivals cut prices, so growth targets may be unrealistic", "Consequence: the firm may switch to survival or cost-cutting objectives", "Link to the effect on workers and other stakeholders", "Link between the two reasons, for example how growth can attract new competitors"],
        modelAnswer: "One reason is that a business moves through stages. A new firm's first objective is survival, because it must cover its costs. Once it is secure it can aim at profit or growth, so its targets, budgets and strategy change.\n\nA second reason is a change in the external environment. If a recession reduces demand or a new competitor cuts prices, a growth objective may become unrealistic and the firm may switch to survival or cost-cutting. Each change in objective also affects workers and other stakeholders, who may need to be told about the new targets. Growth itself can attract new competitors, which may force a further change.",
        explanation: "Two reasons analysed with development and consequence.",
      }),
      P.manual({
        label: "(b)", marks: 12, type: "EXTENDED_RESPONSE", wordLimit: { max: 450 }, levels: LV12,
        stem: "A fictional hotel group in Livingstone is owned by many shareholders. The managers want to pay higher wages to retain staff, but the shareholders want higher dividends. Evaluate whether the hotel group should give priority to the interests of its shareholders.",
        points: ["Shareholders own the group and bear the risk, so they expect a return", "Without profit the group could not survive or raise more finance", "Shareholders can sell shares or replace directors if dissatisfied", "Higher dividends keep the share price high and the group attractive to investors", "Workers who leave raise recruitment and training costs and reduce service quality", "Satisfied staff give better service, which raises revenue and profit", "Wages are a cost that reduces profit available for dividends: a direct conflict", "Customers expect good service, so the quality of staff affects revenue", "Short-term versus long-term: low pay may save money now but harm the business later", "The group could compromise: a smaller pay rise and a smaller dividend increase", "Power of the stakeholders: shareholders have legal rights; staff can leave in a tight labour market", "Judgement and condition: depends on how many staff are leaving and how badly the dividend is needed"],
        modelAnswer: "Shareholders own the group and take the risk, so they expect a return. Without profit the group could not survive or raise finance, and dissatisfied shareholders can sell their shares or replace directors. Higher dividends also keep the share price high.\n\nHowever, if the group ignores staff, workers may leave. This raises recruitment and training costs and reduces the quality of service, which hotels depend on for repeat customers. Satisfied staff give better service, raising revenue and profit. Wages are a cost that reduces the profit available for dividends, so there is a direct conflict, but low pay saves money now and may cost more later. The group could compromise with a smaller pay rise and a smaller rise in dividends. Power matters too: shareholders have legal rights, while staff can leave if the labour market is tight.\n\nOverall, the group should not give shareholders automatic priority. If many staff are leaving and service is suffering, a pay rise protects the long-term profit that shareholders want. If staff turnover is low and the dividend is needed to keep investors, priority to shareholders may be reasonable for a short time. A compromise is most likely to protect both.",
        explanation: "Shareholders' claims weighed against staff and long-term profit, with a conditional judgement.",
      }),
    ]),
    hints: ["Part (a): two reasons, each with a development and a consequence.", "Part (b): argue for and against shareholder priority, then judge."],
    explanation: "(a) reasons for changing objectives; (b) shareholders compared with staff, with a conditional judgement.",
  });

  // ------------------------------------------------------------------------------------------------------------------
  // Item 5: CAM_ESSAY20 (A Level: law and CSR) with a case extract
  b.struct({
    ...pc({ d: 5, skill: EXAM.CAM_ESSAY20.skill, secs: EXAM.CAM_ESSAY20.secs, paper: "Cambridge Paper 4" }),
    concepts: ["abus.environment.political-legal", "abus.environment.social-environmental"],
    stem: "Case extract: Kalahari Leather is a fictional tannery and shoe maker in Gaborone. It employs 180 workers and sells shoes to shops in three countries. Its tanning process releases chemicals into a nearby river used by villagers for washing and fishing, and a pressure group has demanded that it install a treatment plant costing a large part of its yearly profit. At the same time the government plans to introduce a higher minimum wage and stricter pollution rules. Kalahari's directors know that a rival has already installed a treatment plant and now advertises its shoes as \"sustainably made\". Answer both parts of the question.",
    parts: checkExam(EXAM.CAM_ESSAY20, [
      P.manual({
        label: "(a)", marks: 8, type: "EXTENDED_RESPONSE", wordLimit: { max: 300 }, levels: LV8,
        stem: "Analyse **two** ways in which the government's new laws could affect Kalahari Leather.",
        points: ["Way 1: a higher minimum wage raises the wage bill", "Development: with 180 workers even a small rise adds a large yearly cost", "Consequence: profit falls unless prices rise, which may reduce demand", "Way 2: stricter pollution rules force the firm to change its process", "Development: it may have to install the treatment plant or pay fines", "Consequence: higher costs, or closure of the tannery if it fails to comply", "Compliance is a larger share of costs for a firm of this size", "Possible benefit: fair competition, as rivals must also comply"],
        modelAnswer: "A higher minimum wage raises the wage bill. With 180 workers even a small increase adds a large yearly cost, so profit falls unless the firm raises its prices, which could reduce demand for its shoes.\n\nStricter pollution rules would force Kalahari to change its process, perhaps by installing the treatment plant, or to pay fines. This raises costs, and a firm that fails to comply risks closure of its tannery. The cost is a large share of the firm's profit, but all rivals will have to comply as well, so competition becomes fairer.",
        explanation: "Two effects analysed with development and consequence.",
      }),
      P.manual({
        label: "(b)", marks: 12, type: "EXTENDED_RESPONSE", wordLimit: { max: 450 }, levels: LV12,
        stem: "Evaluate whether Kalahari Leather should install the treatment plant immediately.",
        points: ["Installing: avoids pollution, fines and conflict with villagers and the pressure group", "Installing: the rival already markets \"sustainably made\" shoes, so Kalahari risks losing customers", "Installing: complies with the coming rules before they are enforced", "Installing: may allow a premium price or access to shops that demand sustainable products", "Cost: a large part of yearly profit, which may strain cash flow", "Cost: higher prices may reduce sales, and the firm may need a loan", "Delaying: saves cash now, but the risk of fines, closure and reputational damage grows", "Alternative: phase the investment or use cheaper partial treatment while saving", "Stakeholders: villagers' health and the pressure group's campaign", "Stakeholders: shareholders and workers want the firm to survive and remain profitable", "Environmental audit would measure the harm and show the benefit", "Judgement and condition, such as installing now if finance can be arranged and sales are not harmed"],
        modelAnswer: "Installing the plant would stop the pollution and avoid fines and conflict with the villagers and the pressure group. The rival already advertises \"sustainably made\" shoes, so Kalahari risks losing customers if it does nothing, and it would comply with the new rules before they are enforced. Sustainable shoes may also earn a premium price and access to shops that insist on them.\n\nThe cost, however, is a large part of the firm's yearly profit and may strain its cash flow, and higher prices could reduce sales. Delaying saves cash but increases the risk of fines, closure and damage to the firm's reputation. A phased investment or partial treatment could spread the cost. Villagers' health and the campaign matter, but shareholders and workers also need the firm to survive.\n\nOverall, Kalahari should install the plant soon, because the risks of delay are likely to outweigh the savings. It should do so immediately only if it can arrange finance without damaging cash flow; otherwise a phased plan agreed with the pressure group and the authorities is the better choice.",
        explanation: "Costs and benefits of installing now weighed against delay, with a conditional judgement.",
      }),
    ]),
    hints: ["Part (a): two effects of the laws, each with a consequence.", "Part (b): weigh cost against risk and reputation, then recommend."],
    explanation: "(a) effects of the minimum wage and pollution rules; (b) whether to install the plant now.",
  });

  // ------------------------------------------------------------------------------------------------------------------
  // Item 6: CAM_P3_8 (interest rates)
  {
    const loan = 250000, r1 = 6, r2_ = 8;
    const i1 = (loan * r1) / 100, i2 = (loan * r2_) / 100;
    chk(i2 - i1, 5000, 1e-9);
    const g = pctChange(i1, i2);
    chk(g, 33.3333333333, 1e-6);
    b.struct({
      ...pc({ d: 4, skill: EXAM.CAM_P3_8.skill, secs: EXAM.CAM_P3_8.secs, calculator: true, paper: "Cambridge Paper 3" }),
      concepts: ["abus.environment.government-economy"],
      stem: `Case extract: Kafue Foods is a fictional food processor in Zambia. It has a variable-rate bank loan of ${money(loan)} which it used to buy a new canning line. The central bank has raised interest rates and the rate on the loan rises from ${r1}% to ${r2_}% a year. Kafue sells most of its cans to consumers who buy on credit and to supermarkets, and it plans to build a second line next year.`,
      parts: checkExam(EXAM.CAM_P3_8, [
        P.group({
          label: "(a)", stem: "Calculate:",
          parts: [
            P.num({ label: "(i)", marks: 2, kind: "money", value: i2 - i1, stem: "the increase in the yearly interest cost of the loan.", wrong: [i2, (loan * 2)], explanation: "Interest before = 6% of 250,000 = 15,000. After = 8% of 250,000 = 20,000. Increase = US\\$5,000." }),
            P.num({ label: "(ii)", marks: 2, kind: "pct", value: g, stem: "the percentage increase in the yearly interest cost, to one decimal place.", wrong: [((i2 - i1) / i2) * 100, 2], explanation: "5,000 ÷ 15,000 × 100 = 33.3%." }),
          ],
        }),
        P.manual({
          label: "(b)", marks: 4, stem: "Explain **two** ways in which the rise in interest rates could affect Kafue Foods' decisions.",
          points: ["Higher interest costs reduce profit", "Application: Kafue pays US\\$5,000 more a year, which may lead it to delay the second canning line", "Customers who buy on credit face higher repayments", "Application: consumers may cut spending on canned food, so Kafue may cut output or prices"],
          modelAnswer: "Kafue's interest cost rises by US\\$5,000 a year, which reduces its profit and may lead it to delay or cancel the second canning line. Higher rates also make credit dearer for customers, so consumers may cut spending on canned food and Kafue may have to reduce output or its prices.",
          explanation: "Two effects, each applied.",
        }),
      ]),
      hints: ["Interest = loan × rate ÷ 100.", "Percentage change = increase ÷ original × 100."],
      explanation: "Extra interest US\\$5,000 (33.3%); the rise lowers profit, may delay investment and may reduce customers' spending.",
    });
  }

  // ------------------------------------------------------------------------------------------------------------------
  // Item 7: CAM_P3_8 (minimum wage)
  {
    const workers = 30, w1 = 220, w2 = 260, profit = 60000;
    const extra = workers * (w2 - w1) * 12;
    chk(extra, 14400, 1e-9);
    const fall = (extra / profit) * 100;
    chk(fall, 24, 1e-9);
    b.struct({
      ...pc({ d: 4, skill: EXAM.CAM_P3_8.skill, secs: EXAM.CAM_P3_8.secs, calculator: true, paper: "Cambridge Paper 3" }),
      concepts: ["abus.environment.political-legal"],
      stem: `Case extract: Mphoeng Packaging is a fictional firm in Gaborone that employs ${workers} packers, all paid the legal minimum of ${money(w1)} a month. A change in employment law raises the minimum to ${money(w2)} a month from next year. The firm's yearly profit is ${money(profit)} and its customers are supermarkets that have said they will not accept a price rise of more than 2%.`,
      parts: checkExam(EXAM.CAM_P3_8, [
        P.group({
          label: "(a)", stem: "Calculate:",
          parts: [
            P.num({ label: "(i)", marks: 2, kind: "money", value: extra, stem: "the increase in the yearly wage bill.", wrong: [workers * (w2 - w1), (w2 - w1) * 12], explanation: "Rise per packer per month = US\\$40. Yearly rise = 30 × 40 × 12 = US\\$14,400." }),
            P.num({ label: "(ii)", marks: 2, kind: "pct", value: fall, stem: "the percentage by which profit falls if nothing else changes, to one decimal place.", wrong: [(extra / (profit - extra)) * 100, (extra / (workers * w1 * 12)) * 100], explanation: "14,400 ÷ 60,000 × 100 = 24.0%." }),
          ],
        }),
        P.manual({
          label: "(b)", marks: 4, stem: "Analyse **one** way in which Mphoeng Packaging could respond to the change in the law.",
          points: ["Improve productivity, for example with a machine or better packing methods", "Application: fewer packers or faster packing offsets the higher wage bill", "Result: lower cost per pack means the 2% price limit set by the supermarkets is easier to meet", "Constraint: the investment costs money, and profit may fall in the short run"],
          modelAnswer: "Mphoeng could improve productivity, for example by buying a packing machine. Fewer packers or faster packing would offset the higher wage bill, and a lower cost per pack makes it easier to stay within the 2% price rise the supermarkets will accept. The machine costs money, so profit may fall in the short run.",
          explanation: "A response developed with its effect and limit.",
        }),
      ]),
      hints: ["Yearly rise = workers × monthly rise × 12.", "Think about the supermarkets' limit on prices."],
      explanation: "Extra wage bill US\\$14,400, which cuts profit by 24.0%; the firm could raise productivity.",
    });
  }

  // ------------------------------------------------------------------------------------------------------------------
  // Item 8: CAM_P3_16 (multinational and the host country)
  {
    const profit = 1500000, tax = 28, send = 75;
    const taxAmt = (profit * tax) / 100;
    const after = profit - taxAmt;
    const sent = (after * send) / 100;
    chk(taxAmt, 420000, 1e-6);
    chk(sent, 810000, 1e-6);
    b.struct({
      ...pc({ d: 5, skill: EXAM.CAM_P3_16.skill, secs: EXAM.CAM_P3_16.secs, calculator: true, paper: "Cambridge Paper 3" }),
      concepts: ["abus.international.multinationals-globalisation"],
      stem: `Case extract: Savanna Mining Supplies is a fictional multinational company based in South Africa. It has opened a factory in Botswana that employs 240 local workers, buys 30% of its steel from local mills and sells drill parts to mines in four countries. The factory earned a profit before tax of ${money(profit)} last year. The Botswana government charges tax of ${tax}% on profit (an assumed rate) and the parent company takes ${send}% of the profit after tax. Local firms say they cannot compete with the factory, and the government is considering requiring the factory to buy more steel locally.`,
      parts: checkExam(EXAM.CAM_P3_16, [
        P.group({
          label: "(a)", stem: "Calculate:",
          parts: [
            P.num({ label: "(i)", marks: 2, kind: "money", value: taxAmt, stem: "the tax paid to the Botswana government.", wrong: [profit - taxAmt, (profit * send) / 100], explanation: "28% of 1,500,000 = US\\$420,000." }),
            P.num({ label: "(ii)", marks: 2, kind: "money", value: sent, stem: "the profit sent to the parent company.", wrong: [(profit * send) / 100, after - sent], explanation: "Profit after tax = 1,500,000 − 420,000 = 1,080,000. 75% of 1,080,000 = US\\$810,000." }),
          ],
        }),
        P.manual({
          label: "(b)", marks: 4, stem: "Analyse **one** benefit and **one** drawback of the factory for Botswana.",
          points: ["Benefit: jobs for 240 local workers, whose wages are spent locally", "Application: tax revenue of US\\$420,000 and purchases of steel from local mills", "Drawback: US\\$810,000 of profit leaves the country", "Application: local firms may lose sales to the factory and some may close"],
          modelAnswer: "A benefit is that the factory provides 240 jobs, whose wages are spent locally, and pays US\\$420,000 in tax and buys steel from local mills. A drawback is that US\\$810,000 of profit leaves the country, and local firms say they cannot compete with the factory, so some may lose sales and close.",
          explanation: "A benefit and a drawback, each applied.",
        }),
        P.manual({
          label: "(c)", marks: 8, type: "EXTENDED_RESPONSE", wordLimit: { max: 300 }, levels: LV8E,
          stem: "Evaluate whether the government of Botswana should require the factory to buy more of its steel from local mills.",
          points: ["For: more orders for local mills, so more jobs and incomes", "For: keeps more of the factory's spending in the country", "For: local mills may learn higher standards and grow", "Against: local steel may cost more or be of lower quality", "Against: higher costs may lead Savanna to reduce production or leave", "Against: the factory has other countries it could supply from", "Balance: a gradual requirement, perhaps with support for local mills to improve", ["Judgement with a reason or condition", 1]],
          modelAnswer: "A local-purchase requirement would give local mills more orders, so jobs and incomes would rise and more of the factory's spending would stay in Botswana. Local mills might also learn higher standards and grow. But local steel may cost more or be of lower quality, so Savanna's costs would rise and it might cut production or move to another country. A gradual requirement, combined with help for the mills to improve quality, would balance the risks. The government should introduce it gradually, because a sudden rule could drive the investment away, but if local steel meets the standard at a competitive price the requirement is worthwhile.",
          explanation: "Benefits and risks of the rule weighed, with a conditional judgement.",
        }),
      ]),
      hints: ["Profit after tax first, then the share sent home.", "In (c) consider cost, quality and the risk that the firm leaves."],
      explanation: "Tax US\\$420,000; profit sent home US\\$810,000; benefits and drawbacks for Botswana; evaluation of a local-purchase rule.",
    });
  }

  // ------------------------------------------------------------------------------------------------------------------
  // Item 9: CAM_P3_12 (technology and competitors) - extended response
  b.ext({
    ...pc({ d: 5, skill: EXAM.CAM_P3_12.skill, secs: EXAM.CAM_P3_12.secs, paper: "Cambridge Paper 3" }),
    concepts: ["abus.environment.technology-competitors"],
    marks: 12, wordLimit: { max: 450 }, levels: LV12,
    stem: "Case extract: Orapa Printing is a fictional firm in Gaborone with 60 workers that prints books and school materials for schools. A rival has bought a digital press and now offers lower prices and delivery within two days, and some of Orapa's school customers have placed smaller orders with it. Orapa's only paper supplier has also announced a price rise. The directors of Orapa are considering buying a digital press of their own, which would cost a large amount, require new skills and reduce the number of workers needed.\n\nEvaluate whether Orapa Printing should invest in a digital press.",
    points: ["For: lower unit costs and faster delivery would let it compete with the rival", "For: it could win back customers and win new ones, increasing revenue", "For: it may reduce the amount of paper wasted, easing the effect of the supplier's price rise", "For: the printing industry is changing, so delay could mean losing more customers", "Against: the cost is large and may strain cash flow or need a loan", "Against: the staff need new skills and training, and some jobs will go", "Against: redundancies may reduce morale and affect the remaining workers", "Against: the rival may respond by cutting prices further, so gains may be short-lived", "Alternative: improve service or quality, or find a second paper supplier", "Alternative: lease the press or share with another printer to limit cost and risk", "Judgement that states whether to invest", "A condition or time-frame supporting the judgement"],
    modelAnswer: "A digital press would lower Orapa's unit costs and allow faster delivery, so it could compete with the rival, win back customers and increase revenue. It might also reduce waste, easing the effect of the supplier's price rise, and since the industry is changing, delay could lose more customers.\n\nHowever, the press costs a large amount, which may strain cash flow or require a loan. Staff need new skills and some jobs will go, which could lower morale among those who remain. The rival may cut its prices again, so the gains may be short-lived. Alternatives include improving service and quality, finding a second paper supplier, or leasing the press or sharing it with another printer to limit cost and risk.\n\nOverall, Orapa should invest in a digital press because without it the firm is likely to continue to lose customers. It should do so only if it can finance the purchase without damaging cash flow, and if it trains staff and treats those who lose their jobs fairly. If the finance is not available, leasing or sharing a press is a sensible way to start.",
    hints: ["Weigh the benefits of the press against its cost and the effect on workers, consider the alternatives, then judge."],
    explanation: "Technology weighed against cost and alternatives, with a conditional judgement.",
  });
});
