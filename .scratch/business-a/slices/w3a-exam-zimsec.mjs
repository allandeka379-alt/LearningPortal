// W3a exam-format items: ZIMSEC data response (25), case study (30) and two essays (25)
import { concept, P, EXAM, checkExam, ZIM, ZBS, table, money, chk, elasticity, market, pctChange, r2 } from "../lib.mjs";
import { pmc, LV10, LV15 } from "../tables/w3a-lib.mjs";

concept("abus.marketing.markets", { file: "exam/w3a-zimsec", keyPrefix: "exam.w3a-zimsec" }, (b) => {
  const pc = (extra = {}) => ({ examStyle: true, ...extra });

  // ------------------------------------------------------------------------------------------------------------------
  // Item 1: ZIM_DATA25 (Business Studies Paper 2 section A)
  {
    const m24 = 2400000, m25 = 2640000, k24 = 288000, k25 = 303600;
    const s24 = market.share(k24, m24), s25 = market.share(k25, m25);
    chk(s24, 12, 1e-9);
    chk(s25, 11.5, 1e-9);
    const mg = market.growth(m24, m25);
    chk(mg, 10, 1e-9);
    const pe = elasticity.promotional(1200, 1440, 8000, 8640);
    chk(pe, 0.4, 1e-9);
    const extraC = (8640 - 8000) * 0.9;
    chk(extraC, 576, 1e-6);
    const net = extraC - (1440 - 1200);
    chk(net, 336, 1e-6);
    b.struct({
      ...pc({ d: 5, skill: EXAM.ZIM_DATA25.skill, secs: EXAM.ZIM_DATA25.secs, applies: ZBS, paper: "ZIMSEC Paper 2 section A" }),
      concepts: ["abus.marketing.markets", "abus.marketing.elasticity", "abus.research.purposes-methods", "abus.research.data-analysis", "abus.marketing.product-development"],
      stem: "Read the data. Kuda Dairy is a fictional business in Bulawayo that makes milk and yoghurt and sells them to shops and households.\n\nKuda Dairy's sales have risen, but the owner is worried that rival dairies are growing faster. She is considering developing a lactose-free yoghurt, and asked 200 customers in her own shop whether they would buy one.\n\n**Table 1: Dairy products market in Bulawayo**\n\n" +
        table(["", "2024 (US\\$)", "2025 (US\\$)"], [["Total market sales", m24, m25], ["Kuda Dairy sales", k24, k25]]) +
        "\n\n**Table 2: Yoghurt promotion (per month)**\n\n" + table(["", "Before", "After"], [["Promotional spending (US\\$)", 1200, 1440], ["Yoghurt sold (cups)", 8000, 8640]]) +
        "\n\nContribution is US\\$0.90 on each cup of yoghurt.\n\n**Table 3: Survey of 200 customers in Kuda Dairy's shop: Would you buy a lactose-free yoghurt?**\n\n" + table(["Answer", "Number"], [["Yes", 56], ["No", 104], ["Not sure", 40]]) +
        "\n\nDeveloping the lactose-free yoghurt would cost US\\$18,000 and take about eight months.",
      parts: checkExam(EXAM.ZIM_DATA25, [
        P.group({
          label: "(a)", stem: "Market share",
          parts: [
            P.num({ label: "(i)", marks: 2, kind: "pct", value: s24, stem: "Calculate Kuda Dairy's market share in 2024.", wrong: [r2(k24 / m25 * 100), 7.7], explanation: "288,000 ÷ 2,400,000 × 100 = 12.0%." }),
            P.num({ label: "(ii)", marks: 2, kind: "pct", value: s25, stem: "Calculate Kuda Dairy's market share in 2025, to one decimal place.", wrong: [12, 8], explanation: "303,600 ÷ 2,640,000 × 100 = 11.5%." }),
          ],
        }),
        P.group({
          label: "(b)", stem: "Market growth",
          parts: [
            P.num({ label: "(i)", marks: 2, kind: "pct", value: mg, stem: "Calculate the growth of the whole market from 2024 to 2025, to one decimal place.", wrong: [r2(pctChange(k24, k25)), 9.1], explanation: "(2,640,000 − 2,400,000) ÷ 2,400,000 × 100 = 10.0%. Kuda's own sales grew by 5.4%." }),
            pmc(P, {
              label: "(ii)", marks: 1, stem: "Which statement explains the fall in Kuda Dairy's market share?",
              ok: ["The market grew faster than Kuda's sales", "Correct: Kuda's sales grew by 5.4% and the market by 10.0%."],
              bad: [["Kuda's sales fell during the year", "Kuda's sales rose from US\\$288,000 to US\\$303,600."], ["The market shrank during the year", "Market sales rose by 10%."], ["Kuda's sales grew faster than the market", "The market grew more quickly."]],
              explanation: "Share falls when the market grows faster than the firm.",
            }),
          ],
        }),
        P.group({
          label: "(c)", stem: "Promotion of yoghurt",
          parts: [
            P.num({ label: "(i)", marks: 2, kind: "index", dp: 1, value: pe, stem: "Calculate the promotional elasticity of demand for yoghurt, to one decimal place.", wrong: [2.5, 0.08], explanation: "Promotion: +240 ÷ 1,200 × 100 = +20%. Sales: +640 ÷ 8,000 × 100 = +8%. Promotional elasticity = 8 ÷ 20 = 0.4." }),
            P.num({ label: "(ii)", marks: 2, kind: "money", value: net, stem: "Calculate the extra contribution from the additional yoghurt minus the extra promotional spending, per month.", wrong: [576, 240], explanation: "Extra cups = 640. Extra contribution = 640 × 0.90 = US\\$576. Extra spending = US\\$240. Net gain = US\\$336." }),
          ],
        }),
        P.manual({
          label: "(d)", marks: 4, stem: "Explain **two** reasons why a falling market share in a growing market is a concern for Kuda Dairy.",
          points: ["Rivals are winning customers faster than Kuda Dairy", "Application: Kuda's sales grew by 5.4% while the market grew by 10.0%", "Lower share can reduce economies of scale and bargaining power with suppliers and shops", "If the trend continues, sales growth and profit will fall behind"],
          modelAnswer: "Rivals are winning customers faster than Kuda Dairy: its sales grew by 5.4% while the market grew by 10.0%. A falling share can also reduce economies of scale and bargaining power with suppliers and shops, so if the trend continues, sales growth and profit will fall behind.",
          explanation: "Two reasons, applied to the figures.",
        }),
        P.manual({
          label: "(e)", marks: 4, stem: "Analyse the reliability of the survey results in Table 3.",
          points: ["The 200 customers were asked in Kuda's own shop", "They are existing customers, so may not represent non-customers or the whole market", "28% said yes but 20% were not sure, so demand is uncertain", "People who say they would buy may not do so; intentions are not sales"],
          modelAnswer: "The 200 customers were asked in Kuda's own shop, so they are existing customers and may not represent non-customers or the whole market. Only 28% said yes and 20% were not sure, so demand is uncertain, and people who say they would buy may not actually do so.",
          explanation: "Sample bias and stated intentions.",
        }),
        P.manual({
          label: "(f)", marks: 6, type: "EXTENDED_RESPONSE", wordLimit: { max: 300 }, levels: [[1, 1, 2, "Lists points with little use of the data; no recommendation"], [2, 3, 4, "Uses the data and gives some balance; a recommendation not fully supported"], [3, 5, 6, "Balanced use of the data and a justified recommendation with a condition"]],
          stem: "Recommend whether Kuda Dairy should spend US\\$18,000 on developing the lactose-free yoghurt. Justify your answer using the data.",
          points: ["For: a new product could help win back market share", "For: 28% of those asked said yes, a reasonable base of interest", "For: the extra promotion of yoghurt earned a net gain of US\\$336 a month, so yoghurt marketing can be profitable", "Against: US\\$18,000 and eight months is a large commitment; the survey is biased and 20% are not sure", "Against: intentions may not become sales", "Recommendation with a reason or condition, e.g. test with a small trial batch first"],
          modelAnswer: "Kuda Dairy should proceed cautiously. A new product could help win back market share, 28% of those asked said they would buy, and promotion of yoghurt has already earned a net gain of US\\$336 a month. However, US\\$18,000 and eight months is a large commitment, the survey was taken in the firm's own shop and 20% were not sure, and intentions often do not become sales. I recommend a small trial batch to measure real demand before committing the full US\\$18,000.",
          explanation: "A justified recommendation based on the data.",
        }),
      ]),
      hints: ["Share = sales ÷ market × 100; elasticity = % change in sales ÷ % change in promotion."],
      explanation: "Shares 13.0% and 12.5%; market growth 10.0%; promotional elasticity 0.4; net gain US\\$336; cautious trial recommended.",
    });
  }

  // ------------------------------------------------------------------------------------------------------------------
  // Item 2: ZIM_CASE30 (Business Studies Paper 1 section B)
  {
    const m25 = 4600000, m26 = 5060000, t25 = 552000, t26 = 566720;
    const share26 = market.share(t26, m26);
    chk(share26, 11.2, 1e-9);
    const mg = market.growth(m25, m26);
    chk(mg, 10, 1e-9);
    const ped = elasticity.price(260, 286, 440, 374);
    chk(ped, -1.5, 1e-9);
    const dRev = 286 * 374 - 260 * 440;
    chk(dRev, -7436, 1e-6);
    b.struct({
      ...pc({ d: 5, skill: EXAM.ZIM_CASE30.skill, secs: EXAM.ZIM_CASE30.secs, applies: ZBS, paper: "ZIMSEC Paper 1 section B" }),
      concepts: ["abus.marketing.markets", "abus.marketing.segmentation-niche", "abus.marketing.elasticity", "abus.marketing.product-development", "abus.communication.channels-barriers"],
      stem: "Read the case study. Tafara Furniture is a fictional business in Gweru.\n\nTafara Furniture makes beds, wardrobes and tables in a workshop with 22 employees. The owner, Mrs Moyo, sells mainly to young couples through a showroom. Hotels and lodges also order furniture, but each order is negotiated separately and she has not studied what these customers want. Last year she raised the price of a standard bed. Sales of beds fell but the showroom stayed busy, and she is not sure whether the rise was wise.\n\nCommunication is a problem. The showroom staff promise delivery dates without asking the workshop, and the workshop learns of changes to orders only when the carpenters arrive in the morning. Two customers have cancelled as a result.\n\nMrs Moyo is considering a new range of school desks and chairs. A study of the market would cost US\\$1,800 and developing the range US\\$26,000. The school market is served by two large manufacturers in Harare.\n\n**Market data for furniture in Gweru**\n\n" +
        table(["", "2025 (US\\$)", "2026 (US\\$)"], [["Total market sales", m25, m26], ["Tafara Furniture sales", t25, t26]]) +
        "\n\n**Standard bed**\n\n" + table(["", "Before price rise", "After price rise"], [["Price (US\\$)", 260, 286], ["Beds sold a year", 440, 374]]),
      parts: checkExam(EXAM.ZIM_CASE30, [
        P.group({
          label: "(a)", stem: "Market share and growth",
          parts: [
            P.num({ label: "(i)", marks: 2, kind: "pct", value: share26, stem: "Calculate Tafara Furniture's market share in 2026, to one decimal place.", wrong: [12, 10.9], explanation: "566,720 ÷ 5,060,000 × 100 = 11.2%." }),
            P.num({ label: "(ii)", marks: 2, kind: "pct", value: mg, stem: "Calculate the growth of the market from 2025 to 2026, to one decimal place.", wrong: [r2(pctChange(t25, t26)), 9.1], explanation: "(5,060,000 − 4,600,000) ÷ 4,600,000 × 100 = 10.0%." }),
          ],
        }),
        P.manual({
          label: "(b)", marks: 4, stem: "Explain **two** ways in which market segmentation could help Tafara Furniture.",
          points: ["It could separate young couples from hotels and lodges, which have different needs", "Application: couples want single beds and showroom service; hotels want bulk orders and quotations", "Each segment could be given a suitable product, price and promotion", "Application: bulk discounts and personal visits for hotels; credit terms for couples"],
          modelAnswer: "Segmentation would separate young couples from hotels and lodges, which have different needs: couples want a showroom and credit terms, and hotels want bulk orders and quotations. Each segment could then be given a suitable product, price and promotion, such as bulk discounts and personal visits for hotels.",
          explanation: "Two ways, applied to the two segments.",
        }),
        P.group({
          label: "(c)", stem: "The price rise on the standard bed",
          parts: [
            P.num({ label: "(i)", marks: 2, kind: "index", dp: 1, value: ped, stem: "Calculate the price elasticity of demand for the standard bed, to one decimal place, including the sign.", wrong: [-0.67, 1.5], explanation: "Price: +26 ÷ 260 × 100 = +10%. Quantity: −66 ÷ 440 × 100 = −15%. PED = −15 ÷ 10 = −1.5." }),
            P.num({ label: "(ii)", marks: 2, kind: "money", value: -dRev, stem: "Calculate the fall in annual revenue from beds (give a positive amount).", wrong: [dRev, 26 * 374], explanation: "Before: 260 × 440 = US\\$114,400. After: 286 × 374 = US\\$106,964. Fall = US\\$7,436." }),
            P.manual({ label: "(iii)", marks: 2, stem: "Advise Mrs Moyo on whether the price rise was wise.", points: ["Demand is elastic (−1.5, size above 1), so the rise reduced revenue", "The rise was not wise for revenue; she should consider reducing the price or adding value"], modelAnswer: "Demand is elastic (the size is above 1), so the price rise reduced revenue by US\\$7,436. It was not wise for revenue; she should consider a lower price or add value to justify the higher price.", explanation: "Elastic demand: a price rise lowers revenue." }),
          ],
        }),
        P.manual({
          label: "(d)", marks: 4, stem: "Analyse the effect on Tafara Furniture's workshop (operations) and finances of developing the school furniture range.",
          points: ["Development costs US\\$26,000, which uses cash and may need a loan", "Application: the business is small, with 22 employees, so cash is limited", "The workshop would need new designs and perhaps new machines or training", "So there is a risk of delays to existing orders and extra costs if sales are lower than hoped"],
          modelAnswer: "Developing the range costs US\\$26,000, which uses cash and may need a loan, and Tafara is a small business with 22 employees. The workshop would need new designs and perhaps new machines or training, which risks delays to existing orders and extra costs if sales are lower than hoped.",
          explanation: "Finance and operations effects of a new range.",
        }),
        P.manual({
          label: "(e)", marks: 4, stem: "Explain **two** ways in which communication between the showroom and the workshop could be improved.",
          points: ["Hold a short daily meeting between showroom staff and the workshop supervisor", "Application: delivery dates are agreed before they are promised to customers", "Use a shared order sheet or group message for changes to orders", "Application: carpenters learn of changes in time, so fewer orders are cancelled"],
          modelAnswer: "A short daily meeting between showroom staff and the workshop supervisor would let delivery dates be agreed before they are promised to customers. A shared order sheet or group message for changes would mean carpenters learn of changes in time, so fewer orders are cancelled.",
          explanation: "Two improvements, each applied.",
        }),
        P.manual({
          label: "(f)", marks: 8, type: "EXTENDED_RESPONSE", wordLimit: { max: 350 }, levels: [[1, 1, 3, "Lists points about the range with little use of the case; no judgement"], [2, 4, 6, "Applies the case with some balance; a recommendation that is not fully supported"], [3, 7, 8, "Balanced, case-based discussion and a justified recommendation with a condition"]],
          stem: "Evaluate whether Mrs Moyo should develop the school furniture range.",
          points: ["For: the market is growing by 10% and Tafara's share is falling, so a new product could help", "For: a new segment reduces dependence on couples and hotels", "For: the research study costs only US\\$1,800", "Against: development costs US\\$26,000, large for a small firm", "Against: two large manufacturers serve schools and may compete on price", "Against: current communication problems might spoil delivery to schools", "Judgement: do the US\\$1,800 study first", "Reason or condition: proceed only if the study shows enough demand and communication is improved"],
          modelAnswer: "The market is growing by 10% while Tafara's share has fallen to 11.2%, so a new product could win growth, and a school segment would reduce the firm's dependence on couples and hotels. The US\\$1,800 research study is cheap. However, development costs US\\$26,000, which is large for a firm with 22 employees, two large manufacturers already serve schools and may cut prices, and current communication problems could spoil deliveries to schools. Mrs Moyo should do the US\\$1,800 study first and proceed only if it shows enough demand and she has fixed the communication problem.",
          explanation: "A balanced evaluation of a new range using the case figures.",
        }),
      ]),
      hints: ["Percentage changes are measured on the original value."],
      explanation: "Share 11.2%, market growth 10.0%, PED −1.5 and a revenue fall of US\\$7,436; a study first is recommended.",
    });
  }

  // ------------------------------------------------------------------------------------------------------------------
  // Item 3: ZIM_ESSAY25 (market research)
  b.struct({
    ...pc({ d: 4, skill: EXAM.ZIM_ESSAY25.skill, secs: EXAM.ZIM_ESSAY25.secs, applies: ZIM, paper: "ZIMSEC Paper 2 section B" }),
    concepts: ["abus.research.purposes-methods"],
    stem: "Answer both parts of the question.",
    parts: checkExam(EXAM.ZIM_ESSAY25, [
      P.manual({
        label: "(a)", marks: 10, type: "EXTENDED_RESPONSE", wordLimit: { max: 400 }, levels: LV10,
        stem: "Describe **three** methods of primary market research that a business may use.",
        points: ["Questionnaires: standard questions asked of many people", "Questionnaires can be paper, telephone or online, and give numerical results", "A weakness: low response rates or shallow answers", "Interviews: a trained interviewer asks questions face to face or by phone", "Interviews allow explanation and probing of reasons", "A weakness: they cost more and take longer, and interviewer bias is possible", "Focus groups: a small group discusses a product led by a moderator", "They give rich opinions and ideas", "A weakness: the group is small and may not be representative", "Observation or document review may be added; a good researcher chooses by purpose and cost"],
        modelAnswer: "Questionnaires are sets of standard questions asked of many people on paper, by telephone or online. They are cheap per person and give numerical results that are easy to compare, but response rates can be low and the answers shallow.\n\nInterviews are conducted by a trained interviewer face to face or by phone. The interviewer can explain questions and probe for reasons, but interviews cost more and take longer, and the interviewer may bias the answers.\n\nFocus groups bring together a small group to discuss a product under a moderator. They give rich opinions and new ideas, but the group is small and may not represent the market. Observation, such as counting customers, can be added. A business should choose the method that suits its purpose, budget and time.",
        explanation: "Three methods described with a strength and a weakness each.",
      }),
      P.manual({
        label: "(b)", marks: 15, type: "EXTENDED_RESPONSE", wordLimit: { max: 600 }, levels: LV15,
        stem: "Discuss whether a small firm planning to open a second shop should rely on secondary research only.",
        points: ["Secondary research is cheap and quick, which suits a small firm", "It is available immediately, such as government statistics and trade information", "It can show trends in population, incomes and the size of the market", "It may cover the whole country or area, giving wide coverage", "But it was collected for another purpose, so may not answer the firm's question", "It may be out of date", "Competitors can also use it, so it gives no advantage", "It cannot tell the firm what local customers think of its products", "Primary research is specific to the problem and up to date", "But it is costly, slow and needs skill, and the sample may be biased", "Small firms can use low-cost primary methods, such as short surveys and observation", "The risk of opening a second shop is high, so the cost of research is small by comparison", "Combine secondary data first with a small primary study", "The best choice depends on the cost of the shop, the data available and the firm's budget", "Judgement: secondary research alone is not enough for a major decision, but it is a good starting point"],
        modelAnswer: "Secondary research is cheap and quick, which suits a small firm. Government statistics and trade information are available at once, and they can show trends in population, incomes and the size of the market over a wide area.\n\nHowever, secondary data was collected for another purpose and may not answer the firm's question. It may be out of date, competitors can use it too, and it cannot show what local customers think of the firm's products.\n\nPrimary research is specific to the problem and up to date, but it is costly, slow and needs skill, and a poor sample can bias the results. A small firm can use low-cost methods such as a short survey of customers at the first shop and counting passers-by near the new site.\n\nOpening a second shop is a large and risky decision, so the cost of a small primary study is small compared with the risk of choosing a poor site. Secondary research alone is therefore not enough for this decision, though it is a good and cheap starting point. The best approach is to use secondary data to narrow the choice and then a small primary study to check the local market.",
        explanation: "Secondary research weighed against primary research for a major decision, with a justified conclusion.",
      }),
    ]),
    hints: ["Describe each method and give a strength and a weakness; then weigh cost against risk."],
    explanation: "(a) three primary methods; (b) a balanced discussion of secondary-only research with a judgement.",
  });

  // ------------------------------------------------------------------------------------------------------------------
  // Item 4: ZIM_ESSAY25 (segmentation and niche marketing)
  b.struct({
    ...pc({ d: 5, skill: EXAM.ZIM_ESSAY25.skill, secs: EXAM.ZIM_ESSAY25.secs, applies: ZIM, paper: "ZIMSEC Paper 2 section B" }),
    concepts: ["abus.marketing.segmentation-niche", "abus.mix.product"],
    stem: "Answer both parts of the question.",
    parts: checkExam(EXAM.ZIM_ESSAY25, [
      P.manual({
        label: "(a)", marks: 10, type: "EXTENDED_RESPONSE", wordLimit: { max: 400 }, levels: LV10,
        stem: "Explain how a business may segment its market and the benefits of doing so.",
        points: ["Segmentation divides a market into groups with similar needs", "Geographic: by place, such as urban and rural customers", "Demographic: by age, sex, income or occupation", "Psychographic: by lifestyle, values and attitudes", "Behavioural: by how often and why customers buy, or their loyalty", "Benefit: the mix fits the needs of each group more closely", "Benefit: promotion is targeted, so less money is wasted", "Benefit: unmet needs and niches can be found", "Benefit: customer satisfaction and loyalty may rise", "Cost to note: research and several mixes cost more"],
        modelAnswer: "Segmentation divides a market into groups of customers with similar needs. A business may segment geographically, for example urban and rural customers; demographically, by age, sex, income or occupation; psychographically, by lifestyle and attitudes; or by behaviour, such as how often customers buy and how loyal they are.\n\nThe main benefit is that the marketing mix fits each group more closely, so customers are more satisfied and more loyal. Promotion can be targeted at the groups most likely to buy, which wastes less money, and the business may discover unmet needs and niches that rivals have ignored. However, research and several different mixes cost more, so the business must weigh the benefit against the cost.",
        explanation: "Four bases of segmentation and the benefits, with a note on cost.",
      }),
      P.manual({
        label: "(b)", marks: 15, type: "EXTENDED_RESPONSE", wordLimit: { max: 600 }, levels: LV15,
        stem: "Discuss whether a small bakery should follow a niche strategy rather than mass marketing.",
        points: ["A small bakery lacks the scale to compete on price with large bakeries", "Mass marketing needs high output, wide distribution and heavy promotion", "A niche gives fewer rivals and less price competition", "Customers in a niche may pay higher prices, giving better margins", "Niche products, such as health bread, build loyalty and word of mouth", "Promotion can be targeted, which is cheaper", "But the niche market is small, which limits sales and growth", "The bakery depends on one group; if tastes change, sales fall", "A large bakery may copy the product and use its scale to undercut it", "Specialist ingredients and skills may be costly", "A middle path: keep a core product and add a niche range", "Local word of mouth can promote a niche bakery at very low cost", "The bakery should test willingness to pay with market research before it commits", "The decision depends on the local market size, the owner's resources and rivals", "Judgement: a niche is probably the better choice for a small firm, but only if the segment is large enough and the product is hard to copy"],
        modelAnswer: "A small bakery lacks the scale to compete on price with large bakeries, and mass marketing needs high output, wide distribution and heavy promotion. A niche, such as health bread, means fewer rivals and less price competition. Customers in a niche may pay higher prices, giving better margins, and they tend to be loyal and recommend the bakery to others. Promotion can be targeted, which is cheaper.\n\nHowever, the niche market is small, which limits sales and growth, and the bakery depends on one group of customers. If tastes change its sales fall, and a large bakery could copy the product and use its scale to undercut it. Specialist ingredients and skills may also be costly.\n\nA middle path is to keep a core product and add a niche range. Overall, a niche is probably the better choice for a small firm, but only if the segment is large enough in the local market and the product is hard to copy; otherwise the bakery should keep a wider range.",
        explanation: "A niche strategy weighed against mass marketing for a small firm, with a conditional judgement.",
      }),
    ]),
    hints: ["List the bases and benefits in (a); in (b) weigh scale and price competition against size of the niche."],
    explanation: "(a) bases and benefits of segmentation; (b) niche against mass marketing for a small bakery.",
  });
});
