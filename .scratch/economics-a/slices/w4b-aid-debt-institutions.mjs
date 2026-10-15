// W4b: international aid, external debt, the IMF and the World Bank (Cambridge A Level only).
import { concept, P, chk, table, debtServiceRatio, roundTo } from "../lib.mjs";
import { mc, LV8, LV6 } from "../tables/w4b-kit.mjs";

concept("aecon.dev.aid-debt-institutions", { file: "dev/aid-debt-institutions", keyPrefix: "dev.aid-debt-institutions" }, (b) => {
  mc(b, [2, "RECALL"], "Tied aid is aid that",
    ["must be spent on goods or services from the donor country", "Correct: the recipient's choice is limited."],
    [["is given only in the form of food", "That is food aid."],
     ["is channelled through an international organisation", "That is multilateral aid."],
     ["must be repaid at market rates of interest", "That would be a commercial loan."]],
    "Tied aid carries a condition about where the money is spent.", { daily: true });

  mc(b, [2, "RECALL"], "Multilateral aid is aid",
    ["channelled through an international body such as the World Bank", "Correct: donors pool funds."],
    [["given directly from one government to the government of another country", "That is bilateral aid."],
     ["given by private charities and church groups only", "That is NGO aid."],
     ["given only after natural disasters and wars", "Emergency aid is a type, not the definition."]],
    "Multilateral aid goes through an international body; bilateral aid is government to government.");

  mc(b, [2, "UNDERSTANDING"], "The main role of the International Monetary Fund is to",
    ["promote monetary cooperation and lend for payments problems", "Correct: macroeconomic stability."],
    [["finance long-term development projects such as roads and schools", "That is mainly the World Bank."],
     ["set import tariffs for all of its member countries", "That is not an IMF role."],
     ["grant emergency aid to countries hit by disasters", "It is not an emergency aid agency."]],
    "The IMF focuses on balance of payments and macroeconomic stability.", { daily: true });

  mc(b, [2, "UNDERSTANDING"], "The World Bank mainly provides",
    ["loans and advice for long-term development and poverty reduction", "Correct: development finance."],
    [["short-term loans to cover balance of payments gaps and currency problems", "That is the IMF."],
     ["a common currency for all of its member countries", "It does not provide a currency."],
     ["trade protection for the industries of member countries", "It does not."]],
    "The World Bank's focus is long-term development.");

  mc(b, [3, "ANALYSIS"], "A developing country's export earnings fall while its debt service payments are unchanged. The debt service ratio will",
    ["rise, leaving less foreign exchange for imports", "Correct: the same payment is a larger share of exports."],
    [["fall, because export earnings are now lower", "The ratio's denominator has fallen."],
     ["stay the same, because the debt itself is fixed", "The ratio depends on exports."],
     ["rise, because debt service has increased", "Debt service did not change."]],
    "Debt service ratio = debt service ÷ export earnings; a lower denominator raises it.", { hints: ["Which part of the ratio changed?"] });

  mc(b, [3, "ANALYSIS"], "A country has borrowed at variable interest rates. A rise in world interest rates will most likely",
    ["raise its debt service payments and ratio", "Correct: interest payments rise."],
    [["reduce its debt service payments and its debt ratio", "Higher rates raise interest costs."],
     ["have no effect, because debt is fixed in size", "Interest payments change."],
     ["raise its export earnings and its reserves", "No direct link."]],
    "Variable-rate debt costs more when rates rise.", { hints: ["How does the cost of variable-rate borrowing change?"] });

  mc(b, [4, "EVALUATION"], "Which is the strongest argument against attaching strict conditions to an IMF loan?",
    ["Spending cuts may fall on health and education and harm the poor", "Correct: the social cost."],
    [["Loans from the IMF always make a country's total external debt smaller", "Loans add to debt."],
     ["Conditions always reduce inflation to zero within a year", "That is not a feature."],
     ["Countries cannot choose to refuse the loan or its conditions", "They can choose."]],
    "Conditionality can impose short-run costs on vulnerable groups, though it aims at longer-term stability.", { hints: ["Who may be affected by cuts in public spending?"] });

  mc(b, [3, "ANALYSIS"], "Which is the most likely benefit of debt relief for a heavily indebted country?",
    ["More government revenue can be spent on health and education", "Correct: less is paid to creditors."],
    [["Export earnings will rise automatically", "Debt relief does not directly raise exports."],
     ["The country will no longer need any foreign exchange", "It still needs imports."],
     ["Creditors always gain", "They lose the repayments."]],
    "Cancelling part of the debt reduces debt service and frees revenue for other uses.", { hints: ["What happens to the payments made to creditors?"] });

  {
    const r = debtServiceRatio(420, 2100); chk(r, 20);
    b.num({ d: 2, skill: "APPLICATION", kind: "pct", value: r, unit: "%", daily: true,
      stem: "A country pays US\\$420 million in interest and repayments on its external debt in a year and earns US\\$2,100 million from exports. Calculate the debt service ratio, to one decimal place.",
      wrong: [5.0, 80, 17.5], explanation: "420 ÷ 2,100 × 100 = 20.0%." });
    const r2 = debtServiceRatio(420, 1575); chk(roundTo(r2, 1), 26.7);
    b.num({ d: 3, skill: "APPLICATION", kind: "pct", value: r2, unit: "%", hints: ["Use the new level of export earnings."],
      stem: "Debt service is US\\$420 million. Export earnings fall from US\\$2,100 million to US\\$1,575 million. Calculate the new debt service ratio, to one decimal place.",
      wrong: [20, 25, 3.75], explanation: "420 ÷ 1,575 × 100 = 26.7%." });
    const real = 50 / 1.25; chk(real, 40);
    b.num({ d: 3, skill: "APPLICATION", kind: "money", value: real, hints: ["Tied purchases cost 25% more than world prices."],
      stem: "A grant of US\\$50 million must be spent with the donor's suppliers, whose prices are 25% above world prices. Calculate the value of the equipment the grant buys, measured at world prices, in US\\$ million.",
      wrong: [62.5, 37.5, 12.5], explanation: "50 ÷ 1.25 = US\\$40 million. Multiplying by 1.25 would give US\\$62.5 million, which reverses the effect of the higher price." });
    const extra = 0.02 * 5000; chk(extra, 100);
    b.num({ d: 3, skill: "APPLICATION", kind: "plain", value: extra, unit: "US$ million", dp: 0, tol: 0.5, hints: ["Extra interest = loan × the rise in the rate in percentage points ÷ 100."],
      stem: "A country has a variable-rate loan of US\\$5,000 million. The interest rate rises by 2 percentage points. Calculate the rise in annual interest payments, in US\\$ million.",
      wrong: [10, 2, 250], explanation: "0.02 × 5,000 = US\\$100 million." });
  }

  b.tf({ d: 2, skill: "UNDERSTANDING", answer: false, stem: "Foreign aid always consists of grants that need not be repaid.",
    explanation: "Much aid is given as concessional loans, which must be repaid, although on easier terms than market loans." });

  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each form of aid with its description.",
    pairs: [["Bilateral aid", "Given directly from one government to another"], ["Multilateral aid", "Channelled through an international organisation"], ["Technical assistance", "Experts and training rather than money"], ["Emergency aid", "Relief after a disaster or conflict"]],
    explanation: "The forms differ by source and purpose." });

  b.fib({ d: 2, skill: "UNDERSTANDING", stem: "Complete the sentences.",
    template: "The debt service ratio is debt service divided by {{blank:a}} earnings, multiplied by 100. The {{blank:b}} lends mainly to deal with balance of payments problems.",
    blanks: [{ id: "a", accepted: ["export"], choices: ["export", "import", "tax"] }, { id: "b", accepted: ["IMF"], choices: ["IMF", "World Bank", "WTO"] }],
    explanation: "Debt service ÷ export earnings; the IMF lends for balance of payments problems." });

  b.short({ d: 2, skill: "RECALL", stem: "What name is given to the payments of interest and repayments of principal on external debt in a period?",
    accepted: ["debt service", "debt servicing", "the debt service"], wrong: ["debt relief"],
    explanation: "Debt service." });

  b.manualShort({ d: 2, skill: "RECALL", marks: 2, stem: "Distinguish between bilateral aid and multilateral aid.",
    points: ["Bilateral aid is given directly by one government to another", "Multilateral aid is channelled through an international organisation (such as the World Bank) using contributions from several donors"],
    modelAnswer: "Bilateral aid is given directly by one government to another. Multilateral aid is channelled through an international organisation, such as the World Bank, using contributions from several donors.",
    explanation: "Direct against pooled flows." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4, hints: ["Think about the amount spent on creditors."],
    stem: "Explain two consequences for a developing country of a high debt service ratio.",
    points: ["A large share of export earnings is paid to foreign creditors.", "So less foreign exchange is available to import fuel, machinery and other goods.", "Government revenue is used to pay interest and repayments.", "So less is available for spending on health, education and infrastructure (and it may need to borrow more)."],
    modelAnswer: "A large share of export earnings is paid to foreign creditors, so less foreign exchange is available to import fuel, machinery and other goods. The government must also use a large part of its revenue to pay interest and repayments, so less is available for spending on health, education and infrastructure, and it may have to borrow more.",
    explanation: "Foreign exchange and public spending." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 5, hints: ["Consider both the funds and the conditions."],
    stem: "Analyse one advantage and one disadvantage of a country accepting an IMF-supported programme.",
    points: ["The IMF provides finance when private lenders will not lend.", "This helps the country to cover its balance of payments deficit and avoid a sudden fall in imports.", "Policy conditions (reducing inflation, a sustainable budget) may restore stability and confidence.", "But conditions may require cuts in public spending that reduce growth and fall on the poor.", "The country may feel that its policy independence is limited."],
    modelAnswer: "An advantage is that the IMF provides finance when private lenders will not lend, so the country can cover its balance of payments deficit without a sudden fall in imports, and the policy conditions may restore stability and confidence. A disadvantage is that the conditions may require cuts in public spending that reduce growth and fall on the poor, and the country may feel that its policy independence is limited.",
    explanation: "Finance and stability against social cost and independence." });

  {
    const ds = 450, ex = 3000, ex2 = 2250;
    const r1 = debtServiceRatio(ds, ex), r2 = debtServiceRatio(ds, ex2); chk(r1, 15); chk(r2, 20);
    b.struct({ d: 3, skill: "APPLICATION", examStyle: true, calculator: true, hints: ["Debt service ratio = debt service ÷ export earnings × 100."],
      stem: "**Debt in Tamba (fictional, illustrative)**\n\nTamba pays US\\$450 million a year to service its external debt. Its export earnings are US\\$3,000 million. A fall in world demand then reduces export earnings by 25%. Debt service payments are unchanged. Tamba spends heavily on imports of fuel and medicines.",
      parts: [
        P.num({ label: "(a)", marks: 1, kind: "pct", value: r1, unit: "%", stem: "Calculate Tamba's debt service ratio before the fall in export earnings, to one decimal place.", wrong: [6.7, 85, 12.5], explanation: "450 ÷ 3,000 × 100 = 15.0%." }),
        P.num({ label: "(b)", marks: 2, kind: "pct", value: r2, unit: "%", stem: "Calculate the debt service ratio after the fall, to one decimal place.", wrong: [15, 18.8, 11.25], explanation: "Export earnings fall to 2,250; 450 ÷ 2,250 × 100 = 20.0%." }),
        P.manual({ label: "(c)", marks: 5, stem: "Explain two ways in which the rise in the debt service ratio may affect the economy of Tamba.",
          points: ["More of each dollar of export earnings goes to creditors.", "Less foreign exchange is available for imports of fuel and medicines.", "The exchange rate may come under pressure.", "The government may have to reduce spending on health and education or borrow more.", "Higher borrowing costs and reduced confidence of lenders."],
          modelAnswer: "A larger share of export earnings now goes to creditors, so less foreign exchange is available for essential imports such as fuel and medicines. The government may also have to cut spending on health and education or borrow more to meet its payments, and lenders' confidence may fall, raising borrowing costs." }),
      ],
      explanation: "Ratio rises from 15.0% to 20.0%; less foreign exchange for imports and less public spending." });
  }
  {
    const aid = 240, tied = 0.6 * aid; chk(roundTo(tied, 6), 144);
    const eff = 0.4 * aid + tied / 1.25; chk(roundTo(eff, 6), 211.2);
    b.struct({ d: 4, skill: "EVALUATION", examStyle: true, calculator: true, hints: ["Tied purchases are worth tied amount ÷ 1.25 at world prices.", "In (d) weigh benefits, tying and dependence."],
      stem: "**Aid to Kavala (fictional, illustrative)**\n\nKavala receives US\\$240 million of foreign aid in a year. 60% of the aid is tied to purchases from the donor's firms, whose prices are 25% above world prices; the rest can be spent freely. The aid funds a new rural health programme, a road and the purchase of equipment, but the government has reduced its own spending on clinics because the donor has promised support. The donor has also made its aid depend on trade policy changes.",
      parts: [
        P.num({ label: "(a)", marks: 1, kind: "money", value: tied, stem: "Calculate the amount of tied aid, in US\\$ million.", wrong: [96, 240, 60], explanation: "60% of 240 = US\\$144 million." }),
        P.num({ label: "(b)", marks: 3, type: "CALCULATION", kind: "plain", value: eff, unit: "US$ million", dp: 1, stem: "Calculate the value of the whole aid package measured at world prices, in US\\$ million to one decimal place.", wrong: [240, 211.2 + 28.8, 180], explanation: "Untied 96 + tied 144 ÷ 1.25 = 96 + 115.2 = US\\$211.2 million.", workedSolution: "1. Untied aid = 40% × 240 = 96.\n2. Tied aid is worth 144 ÷ 1.25 = 115.2 at world prices.\n3. Total = 96 + 115.2 = US\\$211.2 million." }),
        P.manual({ label: "(c)", marks: 2, stem: "State two reasons why a government might give aid.",
          points: ["Humanitarian concern or to promote development and reduce poverty.", "Political, strategic or commercial interests (for example creating markets for its firms)."],
          modelAnswer: "A government might give aid because of humanitarian concern or to promote development and reduce poverty. It might also have political, strategic or commercial interests, for example creating markets for its firms." }),
        P.manual({ label: "(d)", marks: 6, type: "EXTENDED_RESPONSE", wordLimit: { min: 100, max: 250 }, levels: LV6,
          stem: "Assess whether the aid is likely to benefit Kavala.",
          points: ["The aid funds health, roads and equipment that can raise health, productivity and growth.", "Tying reduces the real value by US\\$28.8 million (12%).", "The government's reduction in its own clinic spending offsets part of the benefit.", "Dependence on the donor and conditions on trade policy may limit independence.", "Benefits depend on how well projects are designed and maintained.", "Judgement."],
          modelAnswer: "The aid funds health, a road and equipment that can improve health, productivity and growth. However, tying means the package is worth only US\\$211.2 million at world prices, US\\$28.8 million (12%) less than its face value. The government's cut in its own spending on clinics offsets part of the benefit, and the donor's conditions on trade policy and Kavala's dependence on the donor limit its independence. Overall the aid is likely to bring benefits through the health programme and the road, but the gains would be greater if the aid were untied and the government maintained its own spending." }),
      ],
      explanation: "Tied aid US\\$144 million; value at world prices US\\$211.2 million; assess benefits against tying, offsetting cuts and dependence." });
  }

  b.ext({ d: 4, skill: "EVALUATION", marks: 8, hints: ["Consider the type of aid, how it is used and alternatives such as trade and investment."],
    stem: "Assess whether foreign aid is an effective way of promoting economic development.",
    points: ["Aid can fill the savings and foreign exchange gaps and fund infrastructure, health and education.", "Emergency and technical aid can save lives and transfer knowledge.", "Effects on growth in studies are mixed.", "Tied aid reduces value; conditions may limit independence.", "Aid may create dependence, discourage tax collection or be wasted through corruption.", "Trade and investment may be larger and more reliable flows.", "Effectiveness depends on design, governance and the recipient's own policies.", "A justified judgement."],
    levels: LV8, wordLimit: { min: 100, max: 300 },
    modelAnswer: "Aid can fill the gaps between a country's savings and investment needs and its foreign exchange needs, and fund infrastructure, health and education; emergency and technical aid can save lives and transfer knowledge. However, the evidence for its effect on growth is mixed. Tied aid reduces the real value of the assistance, conditions may limit independence, and aid can create dependence, reduce the incentive to collect taxes or be wasted through corruption. Trade and foreign investment are usually larger and more reliable flows. Overall aid is most effective when it is well designed, untied, targeted at health, education and infrastructure and supported by good governance and the recipient's own policies, and is less effective as a long-term substitute for them.",
    explanation: "Weigh funding and knowledge transfer against tying, dependence and mixed evidence." });

  b.card("DEFINITION", "Define **tied aid**.", "Aid that must be spent on goods or services from the donor country.");
  b.card("DEFINITION", "Distinguish bilateral from multilateral aid.", "Bilateral: government to government. Multilateral: through an international organisation.");
  b.card("FORMULA", "Debt service ratio?", "Debt service (interest + repayments) ÷ export earnings × 100.");
  b.card("CONCEPT", "Why does a fall in export earnings worsen the debt service ratio?", "The same debt service is a larger share of lower earnings.");
  b.card("CONCEPT", "Main role of the IMF?", "Promoting monetary cooperation and lending for balance of payments and macroeconomic problems, with policy conditions.");
  b.card("CONCEPT", "Main role of the World Bank?", "Long-term loans, grants and advice for development projects and poverty reduction.");
  b.card("CONCEPT", "Two possible problems of aid?", "Dependence on donors, tying that reduces its value, waste or corruption.");
  b.card("CONCEPT", "Remedies for heavy external debt?", "Rescheduling, debt relief, higher export earnings and better debt management.");
  b.card("CONCEPT", "Argument for and against IMF conditions?", "For: restores stability and confidence. Against: spending cuts can harm the poor and limit independence.");
});
