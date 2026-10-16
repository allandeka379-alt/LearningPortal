// W1b: international.trade-integration
import { concept, P, chk, money, ZIM } from "../lib.mjs";
import { mc } from "../tables/w1b-lib.mjs";

concept("abus.international.trade-integration", { file: "international/trade-integration", keyPrefix: "international.trade-integration" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "A **tariff** is",
    ok: ["a tax charged on goods that are imported", "Correct: it raises the cost of imports."],
    bad: [["a limit on the quantity of imports", "That describes a quota."], ["a total ban on trade with a country", "That describes an embargo."], ["a subsidy paid to exporters by the government", "That is an export subsidy, not a tariff."]],
    explanation: "A tariff is a tax charged on imports.",
  });
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "The value of a country's exports minus the value of its imports of goods is called the",
    ok: ["balance of trade", "Correct: it is the difference between goods exported and imported."],
    bad: [["rate of exchange", "The exchange rate is the price of one currency in another."], ["rate of inflation", "Inflation is the rate of rise in general prices."], ["balance sheet", "A balance sheet is a statement of assets and liabilities of a business."]],
    explanation: "The balance of trade is exports minus imports of goods.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which of these is a **quota**?",
    ok: ["A limit of 5,000 imported cars a year", "Correct: a quota limits the quantity of imports."],
    bad: [["A 20% tax on every imported car", "That is a tariff."], ["A ban on all cars from one particular country", "That is an embargo."], ["A rule that imported cars must pass a safety test", "That is a standard, not a quota."]],
    explanation: "A quota is a limit on the quantity of a good that may be imported.",
  });
  mc(b, {
    d: 2, skill: "APPLICATION",
    stem: "A fictional furniture exporter in Mutare finds that its sales to a neighbouring country rise after the two countries remove tariffs on furniture. What is the **main reason**?",
    ok: ["Its goods become cheaper for buyers there", "Correct: removing the tariff lowers the price paid."],
    bad: [["Its goods now cost more to produce at home", "Removing a tariff on exports does not raise production costs."], ["The neighbouring country has banned all other furniture", "The case describes lower tariffs, not a ban."], ["Customers there now have a lower income", "Lower incomes would reduce demand, not raise it."]],
    explanation: "Without tariffs the price in the importing country falls, so demand for the exports rises.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION", applies: ZIM,
    stem: "A fictional trader in Harare joins a regional trade group in which members charge no tariffs on each other's goods but each sets its own tariffs on outsiders. This arrangement is a",
    ok: ["free trade area", "Correct: no internal tariffs, with separate external tariffs."],
    bad: [["customs union", "A customs union has a common external tariff."], ["common market", "A common market also allows free movement of labour and capital."], ["economic union", "An economic union also has common economic policies."]],
    hints: ["Which arrangement has no common external tariff?"],
    explanation: "A free trade area removes internal tariffs while each member keeps its own external tariffs.",
  });
  mc(b, {
    d: 3, skill: "ANALYSIS",
    stem: "A fictional bakery imports flour. The government raises the tariff on imported flour. What is the **most likely** consequence?",
    ok: ["Its cost of flour rises, so it may raise bread prices", "Correct: higher input cost passes into prices."],
    bad: [["Its cost of flour falls, so it may lower bread prices", "A tariff raises, not lowers, the cost of imports."], ["Its cost of flour is unchanged, as tariffs affect only exporters", "Tariffs are paid by importers."], ["Its customers pay less tax on every loaf they buy", "A tariff on flour does not reduce tax on bread."]],
    hints: ["Who pays the tariff, and what happens to costs?"],
    explanation: "A tariff raises the cost of imported inputs, which tends to raise prices.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Which is a **drawback** for a small firm of joining a regional free trade area?",
    ok: ["Greater competition from firms in partner countries", "Correct: tariffs no longer protect it from members' goods."],
    bad: [["A smaller market in which to sell its products", "A free trade area enlarges the market."], ["Higher tariffs on goods bought from partner countries", "Tariffs between members fall or disappear."], ["No possibility of buying cheaper inputs from partners", "Cheaper inputs from partners are a benefit."]],
    hints: ["What happens to protection against partner firms?"],
    explanation: "Free trade increases competition from firms in the member states.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "Which is the **best-supported** judgement on whether a tariff on imported steel helps a country's firms?",
    ok: ["It protects steel makers but raises costs for firms that use steel", "Correct: it recognises who gains and who loses."],
    bad: [["It helps every firm in the country by lowering all prices", "A tariff raises prices of the protected good."], ["It harms steel makers because tariffs reduce their sales", "Tariffs normally protect domestic producers."], ["It has no effect on any firm in the country at all", "Tariffs change prices and costs, so they have effects."]],
    hints: ["Think about producers and users of steel."],
    explanation: "A tariff helps the protected producers but hurts those who use the good as an input.",
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "An embargo is a complete ban on trade with a particular country.",
    answer: true,
    explanation: "True. An embargo stops all (or specified) trade with another country, unlike a tariff or a quota which only limit it.",
  });
  b.tf({
    d: 3, skill: "UNDERSTANDING",
    stem: "Economic integration always benefits every firm in a member country.",
    answer: false,
    explanation: "False. Integration opens larger markets but also brings more competition; efficient firms gain, while weak firms may be forced out.",
    hints: ["Think about firms that were protected by tariffs."],
  });

  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each trade barrier to its description.",
    pairs: [["Tariff", "A tax on imported goods"], ["Quota", "A limit on the quantity that may be imported"], ["Embargo", "A ban on trade with a country"], ["Exchange control", "A limit on the foreign currency available to importers"]],
    explanation: "Each barrier works in a different way.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct word for each gap.",
    template: "{{blank:a}} are goods and services sold to other countries, while {{blank:b}} are goods and services bought from other countries.",
    blanks: [
      { id: "a", accepted: ["Exports"], choices: ["Exports", "Imports", "Quotas"] },
      { id: "b", accepted: ["imports"], choices: ["Exports", "imports", "Tariffs"] },
    ],
    explanation: "Exports are sold abroad; imports are bought from abroad.",
  });

  b.short({
    d: 2, skill: "RECALL", daily: true,
    stem: "State **one** benefit to a business of selling its goods in other countries.",
    accepted: ["bigger market", "larger market", "more customers", "economies of scale", "spread risk", "higher sales", "increased sales", "more profit", "wider market"],
    explanation: "Exporting gives a bigger market, economies of scale and spreads risk.",
  });

  {
    const price = 120, t = 12;
    const landed = (price * (100 + t)) / 100;
    chk(landed, 134.4, 1e-9);
    b.num({
      d: 2, skill: "APPLICATION", daily: true,
      stem: `A fictional retailer imports a printer for ${money(price)}. The government charges a tariff of ${t}% of the price. What is the cost to the retailer after the tariff?`,
      kind: "money", value: landed, wrong: [price + t, price * t / 100],
      explanation: `Tariff = 12% of 120 = US\\$14.40. Cost = 120 + 14.40 = US\\$134.40. Adding 12 as if it were dollars gives US\\$132.`,
    });
  }
  {
    const ex = 3600000, im = 2900000;
    const bal = ex - im;
    chk(bal, 700000, 1e-6);
    b.calc({
      d: 3, skill: "APPLICATION",
      stem: `In one year a fictional country exports goods worth ${money(ex)} and imports goods worth ${money(im)}. Calculate the balance of trade. Give a surplus as a positive number.`,
      kind: "money", value: bal, wrong: [im - ex, ex + im],
      hints: ["Balance of trade = exports − imports."],
      explanation: `3,600,000 − 2,900,000 = US\\$700,000, a surplus. Reversing the order gives −700,000, which would mean a deficit.`,
    });
  }
  {
    const units = 2500, price = 50, t = 8;
    const rev = (units * price * t) / 100;
    chk(rev, 10000, 1e-9);
    b.num({
      d: 3, skill: "APPLICATION",
      stem: `A government charges a tariff of ${t}% on a type of imported tool. ${units.toLocaleString("en-GB")} tools are imported in a year at ${money(price)} each before the tariff. How much tariff revenue does the government collect?`,
      kind: "money", value: rev, wrong: [units * t, units * price],
      hints: ["Find the total value of imports first."],
      explanation: `Value of imports = 2,500 × 50 = US\\$125,000. Tariff = 8% of 125,000 = US\\$10,000. Multiplying units by the rate gives 20,000, which is meaningless.`,
    });
  }

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Outline **one** way in which a quota may affect a firm that imports goods.",
    points: ["It limits the quantity the firm can bring in", "The firm may have to pay higher prices or lose sales because of shortages"],
    modelAnswer: "A quota limits how much the firm can import, so it may face shortages and have to pay higher prices or lose sales.",
    explanation: "The restriction and its effect.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "Chipo runs a fictional clothing factory in Gweru that exports to a neighbouring country. That country imposes a tariff on clothing. Explain **two** ways in which Chipo could respond.",
    points: ["Absorb the tariff by cutting profit margins to stay competitive", "Application: she keeps sales but earns less on each item", "Set up assembly or a joint venture inside the neighbouring country", "Application: the goods would then be made locally and avoid the tariff"],
    modelAnswer: "Chipo could absorb the tariff by cutting her margin so that her clothes keep their price, but she would earn less on each item. She could also set up assembly or a joint venture inside the neighbouring country so that the clothes are made there and avoid the tariff.",
    hints: ["Think about price, location and other markets."],
    explanation: "Two responses, each applied.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Analyse how membership of a regional trade group could affect a fictional farm-machinery manufacturer in Zimbabwe.",
    points: ["Tariffs on sales to member countries fall, so prices to buyers there fall", "Sales and economies of scale may rise", "Firms from members can sell in Zimbabwe without tariffs", "More competition may reduce sales or margins at home"],
    modelAnswer: "Lower tariffs on sales to member countries make its machines cheaper there, so sales and economies of scale may rise. But firms from member countries can also sell in Zimbabwe tariff-free, which may reduce its home sales and margins.",
    hints: ["Think about opportunities abroad and threats at home."],
    explanation: "Gains in exports and losses from competition.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 5,
    stem: "Assess whether a small firm should start exporting to a nearby country.",
    points: ["Larger market and economies of scale", "Spreads risk by relying on more than one economy", "Costs of transport, paperwork and meeting standards", "Currency and payment risks", "Judgement with a reason or condition"],
    modelAnswer: "Exporting gives access to a larger market and spreads risk. It also brings costs for transport, paperwork and standards, and risks over currency and payment. A small firm should start with a nearby market and a reliable distributor, and expand only when the first orders cover the extra costs.",
    hints: ["Weigh market gains against costs and risks, then add a condition."],
    explanation: "Both sides and a conditional judgement.",
  });

  b.struct({
    d: 3, skill: "APPLICATION",
    stem: "A fictional business: Tendai Tools (Harare) imports garden tools at US\\$25 each before tariff. The government imposes a tariff of 20%. Locally made tools sell at US\\$32. Tendai imports 4,000 tools a year.",
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the cost of one imported tool after the tariff.", kind: "money", value: (25 * 120) / 100, wrong: [25 + 20, 25 * 20], explanation: "Tariff = 20% of 25 = US\\$5, so cost = 25 + 5 = US\\$30." }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the total tariff paid by Tendai in a year.", kind: "money", value: 4000 * ((25 * 20) / 100), wrong: [4000 * 25, 4000 * 30], explanation: "Tariff per tool = US\\$5. Total = 4,000 × 5 = US\\$20,000." }),
      P.manual({ label: "(c)", marks: 3, stem: "Explain **one** reason why the government may have imposed the tariff.", points: ["To protect local tool makers from cheaper imports", "Application: locally made tools at US\\$32 could compete once the import cost is US\\$30", "It also raises tax revenue for the government"], modelAnswer: "The government wants to protect local tool makers from cheaper imports. With the tariff the imported tool costs US\\$30, close to the local price of US\\$32. It also raises tax revenue.", explanation: "Protection, with application, and revenue." }),
      P.manual({ label: "(d)", marks: 2, stem: "Suggest **one** way in which Tendai could respond.", points: ["Buy from local makers or a supplier in a country with a free trade agreement", "Pass the cost on to customers or accept a smaller margin"], modelAnswer: "He could buy from a supplier in a country with a free trade agreement, or pass part of the cost on to customers.", explanation: "A response with a reason." }),
    ],
    hints: ["The tariff is a percentage of the price before tariff."],
    explanation: "The tariff and its total are calculated, and the reasons for it and the firm's responses are explained.",
  });
  b.struct({
    d: 5, skill: "EVALUATION",
    stem: "A fictional business: Bulawayo Leather Goods makes bags and sells most of them in Zimbabwe. Two neighbouring countries have agreed with Zimbabwe to remove tariffs on leather goods within two years. Larger leather firms in one of the countries can produce at a lower cost, while the other country has a growing middle class that wants quality bags. Bulawayo Leather has only 30 workers and limited cash.",
    parts: [
      P.manual({ label: "(a)", marks: 3, stem: "Explain **one** opportunity for Bulawayo Leather from the new agreement.", points: ["Bags can be sold in the neighbouring markets without tariffs", "Application: the growing middle class wants quality bags", "More sales may allow economies of scale"], modelAnswer: "Bags can be sold tariff-free in the neighbouring markets. The country with a growing middle class wants quality bags, so sales could rise and allow economies of scale.", explanation: "Opportunity, applied, with a result." }),
      P.manual({ label: "(b)", marks: 3, stem: "Analyse **one** threat to Bulawayo Leather from the agreement.", points: ["Larger firms can sell in Zimbabwe without tariffs", "Their lower costs allow lower prices", "Bulawayo Leather may lose home customers"], modelAnswer: "Larger firms in the neighbouring country can now sell in Zimbabwe without tariffs, and their lower costs allow lower prices. Bulawayo Leather may lose its home customers.", hints: ["Think about who can now enter your home market."], explanation: "Threat from low-cost competitors." }),
      P.manual({ label: "(c)", marks: 8, stem: "Evaluate whether Bulawayo Leather should welcome the agreement.", points: ["Gains: bigger market, quality niche, possible economies of scale", "Losses: low-cost competitors at home", "Small size and limited cash make expansion and price competition difficult", "Strategy: focus on quality and a niche, rather than competing on price", "Time: two years to prepare", ["A reasoned judgement", 2], ["A condition or time-frame", 1]], modelAnswer: "The agreement gives the firm a bigger market and a chance to sell quality bags to a growing middle class. But larger rivals with lower costs can now enter Zimbabwe, and with 30 workers and limited cash Bulawayo Leather cannot compete on price. It should welcome the agreement if it focuses on quality and a niche market and uses the two years to prepare, but it should be cautious about expanding quickly without the cash to fund it.", hints: ["Weigh opportunity and threat for a small firm and end with a condition."], explanation: "Opportunity and threat weighed with a conditional judgement.", levels: [[1, 1, 3, "States an opportunity and a threat with little application."], [2, 4, 6, "Applies the case and weighs both sides."], [3, 7, 8, "A justified judgement with a condition."]] }),
    ],
    hints: ["Use size, cash and the two years in the case."],
    explanation: "An opportunity and a threat from the agreement are analysed and the overall impact is evaluated.",
  });

  b.card("DEFINITION", "Imports and exports", "Imports are goods and services bought from other countries; exports are goods and services sold to other countries.");
  b.card("FORMULA", "Balance of trade", "Balance of trade = value of exports − value of imports (of goods). A negative result is a deficit.");
  b.card("FACT", "Trade barriers", "Tariffs (tax on imports), quotas (quantity limits), embargoes (bans), standards and licences, and exchange controls.");
  b.card("CONCEPT", "Firm responses to trade barriers", "Raise prices or cut margins, change suppliers or products, produce locally or in a joint venture, or lobby the government.");
  b.card("FACT", "Levels of economic integration", "Preferential trade area, free trade area, customs union, common market, economic union.");
  b.card("CONCEPT", "Benefits of regional integration", "Bigger markets without tariffs, cheaper inputs, economies of scale, free movement of capital and sometimes labour.");
  b.card("CONCEPT", "Drawbacks of regional integration", "More competition from partner firms, loss of protection, border delays and unequal gains.");
  b.card("FACT", "Regional groups named in ZIMSEC", "SADC (Southern African Development Community), COMESA (Common Market for Eastern and Southern Africa), ECOWAS (Economic Community of West African States).", undefined, { applies: ZIM });
});
