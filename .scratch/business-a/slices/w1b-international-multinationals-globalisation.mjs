// W1b: international.multinationals-globalisation
import { concept, P, chk, money } from "../lib.mjs";
import { mc } from "../tables/w1b-lib.mjs";

concept("abus.international.multinationals-globalisation", { file: "international/multinationals-globalisation", keyPrefix: "international.multinationals-globalisation" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "A **multinational company** is a business that",
    ok: ["owns and controls operations in more than one country", "Correct: it has subsidiaries or branches abroad."],
    bad: [["sells its goods only to customers in its home country", "A firm with sales only at home is not multinational."], ["is owned by shareholders from many different countries", "Foreign shareholders do not make a firm multinational."], ["buys all of its raw materials from one overseas supplier", "Importing from one supplier does not mean owning operations abroad."]],
    explanation: "A multinational owns and controls operations in more than one country.",
  });
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "The sending of profit from a subsidiary in a host country back to the parent company is called",
    ok: ["profit repatriation", "Correct: profit is sent back to the home country."],
    bad: [["exchange control", "Exchange control limits the use of foreign currency."], ["import substitution", "Import substitution means replacing imports with local products."], ["transfer of shares", "A transfer of shares is a change in ownership, not a profit flow."]],
    explanation: "Repatriation of profit sends earnings back to the home country.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which is a **benefit** to a host country of an MNC setting up a factory?",
    ok: ["New jobs and training for local workers in the country", "Correct: MNCs create employment and spread skills."],
    bad: [["All profit stays in the country, whatever the owner decides", "Profit may be repatriated to the parent company."], ["Local firms in the same industry are protected from competition", "MNCs usually increase competition for local firms."], ["The country becomes less dependent on foreign firms", "An MNC can increase dependence on foreign firms."]],
    explanation: "Jobs, skills, technology and tax revenue are the usual benefits to a host country.",
  });
  mc(b, {
    d: 2, skill: "APPLICATION",
    stem: "A fictional foreign car maker builds a plant in Gweru to avoid the tariffs that it would pay on imported cars. This reason for becoming multinational is",
    ok: ["avoiding trade barriers by producing goods locally", "Correct: producing inside the market avoids the tariff."],
    bad: [["spreading risk across several economies", "Risk spreading is a different motive from avoiding tariffs."], ["taking advantage of lower exchange rates", "The case concerns tariffs, not exchange rates."], ["selling shares to the public for the first time", "The case is about production location."]],
    explanation: "Producing in the market avoids tariffs and quotas.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A fictional MNC pays its Zimbabwean workers less than it pays workers in its home country, and sends most of its profit home. Which criticism is **most closely supported** by these facts?",
    ok: ["It may take more out of the host country than it puts in", "Correct: low pay and profit repatriation limit local gain."],
    bad: [["It provides no jobs at all in the host country", "The case says it pays workers, so it provides jobs."], ["It has no competition in the host country", "The case says nothing about competition."], ["It pays more tax than any local business", "Nothing in the case concerns the amount of tax paid."]],
    hints: ["Which statement matches low pay and profit sent home?"],
    explanation: "Low pay plus repatriated profit suggests limited benefit to the host country.",
  });
  mc(b, {
    d: 3, skill: "ANALYSIS",
    stem: "A global soft drink brand changes the sweetness and bottle size of its product in each country. This is an example of",
    ok: ["adapting a global brand to local tastes", "Correct: it follows the \"think global, act local\" idea."],
    bad: [["ignoring differences in culture between countries", "Changing the product to suit countries recognises cultural differences."], ["using only the lowest price in every market", "Changing product features is not a pricing policy."], ["avoiding all competition in the local market", "Adapting the product does not remove competitors."]],
    hints: ["What does the firm change, and why?"],
    explanation: "Adapting products to local tastes is the 'act local' side of global marketing.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Which problem is an MNC **most likely** to face when a host country's currency loses value against the home currency?",
    ok: ["Profit sent home is worth less in the home currency", "Correct: a weaker host currency lowers the value of repatriated profit."],
    bad: [["Profit sent home is worth more in the home currency", "A weaker host currency lowers, not raises, the value."], ["Wages in the host country must be paid in the home currency", "Wages are normally paid in the local currency."], ["Customers in the host country stop buying goods altogether", "A currency change alone does not stop all buying."]],
    hints: ["Think about converting profit back into the home currency."],
    explanation: "When the host currency weakens, its profit converts into less home currency.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "Which is the **best-supported** judgement on whether MNCs benefit a developing country?",
    ok: ["They can help via jobs and technology, depending on tax and reinvestment", "Correct: it weighs benefits and says what decides the outcome."],
    bad: [["They always harm the country because they take all the profit away from it", "MNCs also create jobs, pay tax and spread skills."], ["They always help the country, whatever terms they manage to obtain", "Poor terms can limit the gains, so the claim is too absolute."], ["They have no effect on jobs, prices or local firms at all in practice", "MNCs have clear effects on jobs, prices and local firms."]],
    hints: ["Choose the answer that says what the outcome depends on."],
    explanation: "A convincing judgement weighs benefits and costs and names the conditions that determine the net effect.",
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Globalisation includes the movement of money, technology and ideas as well as goods across borders.",
    answer: true,
    explanation: "True. Globalisation links economies through trade, investment, finance, technology and culture.",
  });
  b.tf({
    d: 3, skill: "UNDERSTANDING",
    stem: "A host country always gains more from an MNC than the MNC gains from the host country.",
    answer: false,
    explanation: "False. The distribution of gains depends on the terms agreed, taxes, wages, reinvestment and the MNC's bargaining power; the host country may gain less than the MNC.",
    hints: ["Think about who bargains and on what terms."],
  });

  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each term to its meaning.",
    pairs: [["Home country", "The country where the MNC has its headquarters"], ["Host country", "A country in which the MNC operates a subsidiary"], ["Profit repatriation", "Sending profit earned abroad back to the parent company"], ["Globalisation", "The growing linkage of economies through trade, investment and technology"]],
    explanation: "Each term describes a feature of multinational activity.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct word for each gap.",
    template: "A firm that produces in the {{blank:a}} country, close to its customers, can avoid {{blank:b}} on imported goods.",
    blanks: [
      { id: "a", accepted: ["host"], choices: ["host", "home", "neutral"] },
      { id: "b", accepted: ["tariffs"], choices: ["tariffs", "profits", "wages"] },
    ],
    explanation: "Producing in the host country avoids tariffs and reduces transport costs.",
  });

  b.short({
    d: 2, skill: "RECALL", daily: true,
    stem: "State **one** reason why a firm becomes a multinational.",
    accepted: ["larger market", "bigger market", "lower costs", "cheaper labour", "avoid trade barriers", "avoid tariffs", "spread risk", "access to resources", "access to raw materials", "government incentives", "to be close to customers"],
    explanation: "Markets, lower costs, avoiding barriers, resources and spreading risk are the usual reasons.",
  });

  {
    const profit = 800000, tax = 30, rep = 60;
    const after = profit - (profit * tax) / 100;
    const sent = (after * rep) / 100;
    chk(sent, 336000, 1e-6);
    b.calc({
      d: 3, skill: "APPLICATION",
      stem: `The subsidiary of a fictional MNC earns a profit before tax of ${money(profit)}. The host country charges tax of ${tax}% (an assumed rate) and the parent company takes ${rep}% of the profit after tax. How much is sent to the parent company?`,
      kind: "money", value: sent, wrong: [(profit * rep) / 100, after - sent, (profit * tax) / 100],
      hints: ["Subtract the tax first, then take the share that is sent home."],
      explanation: `Tax = 30% of 800,000 = 240,000. Profit after tax = 560,000. Sent home = 60% of 560,000 = US\\$336,000. Taking 60% of the profit before tax gives US\\$480,000.`,
    });
  }
  {
    const wage = 4, hours = 2.5;
    const lab = wage * hours;
    chk(lab, 10, 1e-9);
    b.num({
      d: 2, skill: "APPLICATION", daily: true,
      stem: `In a fictional factory, a worker is paid ${money(wage)} an hour and takes ${hours} hours to make one unit. What is the labour cost of one unit?`,
      kind: "money", value: lab, wrong: [wage + hours, wage / hours],
      explanation: `Labour cost = 4 × 2.5 = US\\$10 per unit. Dividing the wage by the hours gives US\\$1.60, which is meaningless.`,
    });
  }
  {
    const homeCost = 12 * 1.5, abroad = 4 * 2 + 3;
    const saving = ((homeCost - abroad) / homeCost) * 100;
    chk(homeCost, 18, 1e-9);
    chk(abroad, 11, 1e-9);
    b.num({
      d: 4, skill: "ANALYSIS",
      stem: `A fictional firm can make a unit at home, where labour costs US\\$12 an hour and a unit takes 1.5 hours, or in a host country, where labour costs US\\$4 an hour and a unit takes 2 hours, but transport to the market adds US\\$3 a unit. By what percentage is the total cost per unit lower in the host country? Give your answer to one decimal place.`,
      kind: "pct", value: saving, wrong: [((18 - 8) / 18) * 100, (11 / 18) * 100],
      hints: ["Work out the cost per unit in each place first, including transport."],
      explanation: `Home: 12 × 1.5 = US\\$18. Host: 4 × 2 = 8, plus 3 transport = US\\$11. Saving = 7 ÷ 18 × 100 = 38.9%. Leaving out transport gives 55.6%.`,
    });
  }

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain why a government may offer incentives to attract an MNC.",
    points: ["To gain jobs and incomes for its citizens", "To gain new technology, skills and investment"],
    modelAnswer: "A government wants jobs and incomes for its citizens, and also the investment, technology and skills that an MNC brings.",
    explanation: "Two benefits sought by the host government.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "A fictional foreign supermarket chain opens in Mutare. Explain **two** effects on local shopkeepers.",
    points: ["Local shopkeepers lose customers to the chain's lower prices and wider range", "Application: small shops may lose sales and some may close", "Local shopkeepers may gain as suppliers or from new customers drawn into the area", "Application: they may sell to the chain or specialise in convenience"],
    modelAnswer: "Shopkeepers may lose customers to the chain's lower prices and wider range, so some small shops may close. Others could gain by supplying the chain or by specialising in convenience for people who live close by.",
    hints: ["Think about the competition effect and about opportunities."],
    explanation: "Two effects, one negative and one positive, each applied.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Analyse why a host-country government might require an MNC to buy materials from local suppliers.",
    points: ["Local purchasing keeps more of the money in the country", "Local suppliers gain orders and can expand", "Jobs are created beyond the MNC itself", "Local firms gain skills and standards, building the country's industry"],
    modelAnswer: "Buying locally keeps more of the MNC's spending inside the country, so local suppliers gain orders and can expand. This creates jobs beyond the MNC itself, and the suppliers learn skills and standards that strengthen local industry.",
    hints: ["Follow the spending through the economy."],
    explanation: "A chain from local purchases to industry development.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 5,
    stem: "Assess whether globalisation is beneficial to a small domestic firm.",
    points: ["Access to bigger markets and cheaper inputs", "Ideas and technology spread more easily", "Greater competition from foreign firms", "Small firms may lack the resources to compete", "Judgement with a reason or condition"],
    modelAnswer: "Globalisation gives small firms access to bigger markets, cheaper inputs and new ideas, but also brings competition from large foreign firms that a small firm may struggle to match. A small firm benefits if it finds a niche or serves customers in ways foreign firms cannot, but if it competes only on price it is likely to lose.",
    hints: ["Weigh opportunities against threats and say what the outcome depends on."],
    explanation: "Both sides and a conditional judgement.",
  });

  b.struct({
    d: 3, skill: "APPLICATION",
    stem: "A fictional business: Zambezi Textiles (a subsidiary of a foreign MNC) in Gweru earns a profit before tax of US\\$500,000. The host country charges tax of 20% (an assumed rate). The parent company takes 80% of profit after tax. The subsidiary employs 400 workers.",
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the tax paid to the host government.", kind: "money", value: (500000 * 20) / 100, wrong: [500000 * 0.8, 500000 - 100000 * 0.2], explanation: "20% of 500,000 = US\\$100,000." }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the profit repatriated to the parent company.", kind: "money", value: (400000 * 80) / 100, wrong: [500000 * 0.8, 100000 * 0.8], explanation: "Profit after tax = 500,000 − 100,000 = 400,000. 80% of 400,000 = US\\$320,000." }),
      P.manual({ label: "(c)", marks: 3, stem: "Explain **one** benefit of the subsidiary to Zimbabwe.", points: ["It provides jobs for 400 workers", "Application: wages are spent in local shops, supporting other businesses", "It pays tax of US\\$100,000 to the government"], modelAnswer: "It provides jobs for 400 workers whose wages are spent in local shops, supporting other businesses, and it pays US\\$100,000 in tax.", explanation: "A benefit applied with the figures." }),
      P.manual({ label: "(d)", marks: 2, stem: "State **two** conditions that the government might impose on the MNC.", points: ["Reinvest a share of profit in the country", "Train local staff or buy materials from local suppliers"], modelAnswer: "It might require the MNC to reinvest part of its profit and to train local staff or buy from local suppliers.", explanation: "Two sensible conditions." }),
    ],
    hints: ["Remember that repatriation is a share of profit after tax."],
    explanation: "Tax and repatriated profit are calculated and the effects on the host country are explained.",
  });
  b.struct({
    d: 5, skill: "EVALUATION",
    stem: "A fictional business: Rainbow Foods is a large MNC that wants to build a bottling plant in Zimbabwe. It promises 250 jobs, but local bottlers fear that they will lose customers. The government is considering a tax holiday of five years and a requirement that 40% of materials be bought locally. Rainbow says that it will build elsewhere if the conditions are too strict.",
    parts: [
      P.manual({ label: "(a)", marks: 3, stem: "Explain **one** reason why Rainbow Foods wants to build a plant in Zimbabwe.", points: ["To serve customers in the market directly and cut transport cost", "Application: avoids tariffs on imported bottled drinks", "May benefit from the tax holiday and lower labour cost"], modelAnswer: "Producing in Zimbabwe cuts transport costs and avoids tariffs on imported bottled drinks, and the five-year tax holiday would lower its costs further.", explanation: "A motive linked to the case." }),
      P.manual({ label: "(b)", marks: 3, stem: "Analyse the threat to local bottlers.", points: ["Rainbow's scale lowers its costs, allowing lower prices", "Customers may switch to the lower-priced or well-known brand", "Local bottlers' sales and jobs may fall"], modelAnswer: "Rainbow's scale lowers its costs and allows lower prices. Customers may switch to its well-known brand, so local bottlers lose sales and may cut jobs.", hints: ["Think about cost, price and customers."], explanation: "Competition leads to lost sales." }),
      P.manual({ label: "(c)", marks: 8, stem: "Evaluate whether the government should accept the investment on these terms.", points: ["Benefits: 250 jobs, technology, local purchases of 40% of materials", "Costs: tax holiday gives up revenue for five years", "Local firms at risk, but local sourcing helps suppliers", "Rainbow could leave, so conditions must not be too strict", "Alternative: shorter tax holiday or training requirements", ["A reasoned judgement", 2], ["A condition or time-frame", 1]], modelAnswer: "The plant would provide 250 jobs and new technology, and the 40% local sourcing rule would benefit suppliers. The tax holiday means the government gives up revenue for five years and local bottlers may lose customers. The government should accept the investment but could shorten the tax holiday or link it to training and job targets, since Rainbow can threaten to go elsewhere. The deal is worthwhile if the jobs and local purchases outweigh the lost tax and the local bottlers are helped to adapt, and it should be reviewed after the holiday ends.", hints: ["Weigh jobs and sourcing against lost tax and local competition, then give a condition."], explanation: "The terms are weighed and a conditional judgement made.", levels: [[1, 1, 3, "Lists benefits and costs without application."], [2, 4, 6, "Applies the case and weighs both sides."], [3, 7, 8, "A justified judgement with a condition."]] }),
    ],
    hints: ["Use the jobs, the tax holiday and the local content rule."],
    explanation: "The motive for investment, the threat to local firms and the terms of the deal are evaluated.",
  });

  b.card("DEFINITION", "Multinational company", "A business that owns and controls operations in more than one country, with a headquarters in the home country and subsidiaries in host countries.");
  b.card("FACT", "Why firms become multinational", "Bigger markets, lower costs, avoiding trade barriers, access to resources, spreading risk and government incentives.");
  b.card("CONCEPT", "Benefits of MNCs to a host country", "Jobs, skills and technology, tax revenue, investment, competition and export earnings.");
  b.card("CONCEPT", "Drawbacks of MNCs to a host country", "Profit repatriation, pressure on local firms, low-paid jobs, environmental harm and dependence on foreign firms.");
  b.card("DEFINITION", "Profit repatriation", "Sending profit earned in a host country back to the parent company in the home country.");
  b.card("FACT", "Problems MNCs face abroad", "Culture and language, unfamiliar laws, currency changes, political instability and managing distance.");
  b.card("DEFINITION", "Globalisation", "The increasing linking of economies through trade, investment, finance, technology and culture.");
  b.card("FACT", "Causes of globalisation", "Faster transport and communications, the internet, falling trade barriers, growth of MNCs and free movement of capital.");
  b.card("CONCEPT", "Think global, act local", "Use global brands and methods but adapt products, prices and promotion to local tastes and laws.");
});
