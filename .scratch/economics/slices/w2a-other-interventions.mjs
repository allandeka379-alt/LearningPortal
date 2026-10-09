// W2a: econ.markets.other-interventions — regulation, quotas, direct provision, nationalisation, privatisation.
import { concept, P, table, pct, pctChange, money, check, CAM } from "../lib.mjs";

const LV = (m) => {
  const a = Math.round(m / 3), c = Math.round((2 * m) / 3);
  return [[1, 1, a, "Simple points, little explanation."], [2, a + 1, c, "Some analysis of both sides or one side well developed, limited conclusion."], [3, c + 1, m, "Two-sided analysis, developed, with a justified conclusion."]];
};

concept("econ.markets.other-interventions", { file: "markets/other-interventions", keyPrefix: "markets.other-interventions" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is meant by **privatisation**?",
    options: [
      ["The transfer of a firm from public ownership to private ownership", "Correct: for example by selling its shares to investors."],
      ["The transfer of a firm from private ownership to public ownership", "This is nationalisation."],
      ["The setting of rules that private firms must obey by law", "This is regulation."],
      ["The supply of a service by the government, paid for from taxes", "This is direct provision."],
    ],
    answer: "A",
    explanation: "Privatisation moves a firm out of state ownership into the private sector.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "A government sets a maximum tonnage of timber that may be cut in a forest each year. This is an example of",
    options: [
      ["a quota.", "Correct: a legal limit on the quantity extracted."],
      ["a subsidy.", "A subsidy is a payment to producers."],
      ["nationalisation.", "Nationalisation is a change of ownership."],
      ["a maximum price.", "A maximum price limits the price, not the quantity."],
    ],
    answer: "A",
    explanation: "A quota limits the quantity produced, extracted or imported in a period.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why do governments usually provide street lighting directly rather than leave it to the market?",
    options: [
      ["It is a public good, so private firms cannot charge users for it", "Correct: non-excludability creates a free-rider problem, so the market does not provide it."],
      ["It is a demerit good, so it would be over-consumed in a market", "Street lighting is not harmful; it is a public good."],
      ["Private firms are not allowed to produce electricity", "Firms can produce electricity; the problem is charging for lighting."],
      ["It has external costs that make it too expensive to produce", "Lighting has benefits for everyone; the problem is that users cannot be made to pay."],
    ],
    answer: "A",
    explanation: "Street lighting is non-excludable and non-rival: people can benefit without paying, so a profit-seeking firm will not supply it. The state provides it from taxes.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is the most likely reason for a government to **nationalise** an electricity grid?",
    options: [
      ["It is a natural monopoly, and state ownership can keep its prices fair to users", "Correct: one network is cheapest, so the state may own it to stop monopoly pricing."],
      ["Competition among many grids would make electricity too cheap", "Building several grids would waste resources; this is not the reason."],
      ["State ownership always makes firms more efficient than private ownership does", "State firms often lack the profit motive; efficiency is not guaranteed."],
      ["Nationalisation raises money from selling the firm's shares", "Selling shares raises money in privatisation, not nationalisation."],
    ],
    answer: "A",
    explanation: "A single grid is the cheapest way to supply electricity (a natural monopoly). Public ownership is one way to stop such a monopoly charging high prices.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A state-owned railway is privatised and becomes the only private rail operator. Which is the main risk for consumers?",
    options: [
      ["Fares rise because the private owner faces no competition", "Correct: a public monopoly has become a private monopoly that seeks profit."],
      ["The railway receives larger subsidies from taxpayers", "Privatisation usually reduces the government's support."],
      ["The railway invests too much in new trains and lines", "Over-investment is not the main risk from a profit-seeking monopoly."],
      ["The government earns more profit from the railway each year", "After privatisation, the profits go to private owners."],
    ],
    answer: "A",
    hints: ["Has competition increased after the sale?"],
    explanation: "Without competition, a private monopoly can raise prices or cut unprofitable services. This is why privatised monopolies are usually regulated.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A government fines factories that release more than a set amount of smoke. Which is a **disadvantage** of this regulation?",
    options: [
      ["Firms may pollute anyway if fines are small or inspections are rare", "Correct: regulation depends on enforcement."],
      ["It raises the price of the factories' goods to consumers in the area", "Higher costs may raise prices, but that reflects the external cost and is not the main weakness here."],
      ["It reduces the amount of smoke released into the air", "This is the aim of the regulation, an advantage."],
      ["It gives the government revenue from fines", "Revenue from fines is usually listed as an advantage."],
    ],
    answer: "A",
    hints: ["What must the government do to make a rule work?"],
    explanation: "Regulation works only if breaking it is detected and punished. Enforcement is costly, and small fines may simply be paid as a cost of doing business.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", applies: CAM,
    stem: "Which term does the Cambridge syllabus use for firms owned and controlled by the government?",
    options: [
      ["Public sector firms", "Correct: Cambridge uses 'public sector firms'; ZIMSEC uses 'public corporations' or 'parastatals'."],
      ["Public limited companies", "A public limited company is privately owned; its shares are sold to the public."],
      ["Multinational companies", "These operate in more than one country and are usually private."],
      ["Private sector firms", "These are owned by individuals and shareholders, not the state."],
    ],
    answer: "A",
    explanation: "A public sector firm is owned by the state. Do not confuse it with a public limited company (plc), which is a private firm.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which situation gives the **strongest** case for direct provision by the government rather than a subsidy to private firms?",
    options: [
      ["National defence, from which no one can be excluded once it is provided", "Correct: a pure public good is not provided by the market at all, so a subsidy to sellers cannot work."],
      ["Bread, which nearly every household buys every day", "Bread is a private good that markets supply well."],
      ["Mobile phone airtime, sold by several competing networks across the country", "Competitive markets already supply airtime."],
      ["School uniforms, which parents can buy in many shops", "Uniforms are private goods; a subsidy or grant would be enough."],
    ],
    answer: "A",
    hints: ["Which good would no firm supply, however much it was subsidised per unit sold?"],
    explanation: "A pure public good is non-excludable, so firms cannot sell it: there are no sales to subsidise. The state must provide it and fund it from taxes.",
  });
  const qPct = pctChange(12400, 9300);
  check("quota", qPct, -25);
  b.num({
    d: 2, skill: "APPLICATION", kind: "pct", value: Math.abs(qPct), daily: true,
    stem: "A fictional government cuts the annual fishing quota for a lake from 12,400 tonnes to 9,300 tonnes. Calculate the percentage fall in the quota. Give your answer to one decimal place.",
    wrong: [((12400 - 9300) / 9300) * 100],
    explanation: `Fall = 12,400 − 9,300 = 3,100 tonnes; 3,100 ÷ 12,400 × 100 = **${pct(Math.abs(qPct), 1)}**. Dividing by the new quota (9,300) gives ${pct(((12400 - 9300) / 9300) * 100, 1)}, the wrong base.`,
  });
  const share = 9300 * 0.18;
  b.num({
    d: 3, skill: "APPLICATION", kind: "plain", value: share,
    stem: "A lake's total fishing quota of 9,300 tonnes a year is shared among licensed companies. One company holds 18% of the quota. How many tonnes a year may it catch?",
    wrong: [9300 / 18, 12400 * 0.18],
    hints: ["18% of the total quota."],
    explanation: `0.18 × 9,300 = **${share.toLocaleString("en-GB")} tonnes** a year.`,
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Nationalisation is the transfer of a firm from private to public ownership.",
    answer: true,
    explanation: "True. Privatisation is the reverse.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A ban on a harmful product removes all consumption of it, so it cannot fail.",
    answer: false,
    explanation: "False. Bans can create illegal (black) markets, and they need enforcement. Regulation can fail like any intervention.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each market failure with the intervention most often used to correct it.",
    pairs: [
      ["Public good such as a lighthouse", "Direct provision paid for from taxes"],
      ["Over-fishing of a lake", "A quota on the annual catch"],
      ["Factory smoke harming local residents", "Regulation limiting emissions"],
      ["A single water-pipe network run for profit", "Nationalisation or price regulation of the monopoly"],
    ],
    explanation: "Public goods → direct provision; over-use of a resource → quota; pollution → regulation; natural monopoly → public ownership or regulation.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct words.",
    template: "Selling a state-owned airline to private shareholders is {{blank:a}}. A law requiring helmets for motorcyclists is {{blank:b}}. Government-run clinics offering free treatment are an example of {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["privatisation"], choices: ["privatisation", "nationalisation", "regulation", "direct provision"] },
      { id: "b", accepted: ["regulation"], choices: ["privatisation", "nationalisation", "regulation", "direct provision"] },
      { id: "c", accepted: ["direct provision"], choices: ["privatisation", "nationalisation", "regulation", "direct provision"] },
    ],
    wrong: [["nationalisation", "direct provision", "regulation"]],
    explanation: "Selling to private owners = privatisation; a legal rule = regulation; the state supplying the service = direct provision.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** advantages of privatising a loss-making state-owned company.",
    points: [
      "Identifies the profit motive / competition.",
      "Explains that private owners have an incentive to cut costs and improve service, so efficiency rises.",
      "Identifies the sale raising revenue / ending losses paid by taxpayers.",
      "Explains that the government gains money from the sale and no longer covers losses, freeing funds for other uses.",
    ],
    modelAnswer: "First, private owners are driven by profit, so they have an incentive to cut waste, invest and improve the service, making the company more efficient. Second, the government earns money from selling the shares and no longer has to pay for the company's losses, so taxpayers' money can be used for schools or hospitals instead.",
    hints: ["Think about incentives and about the government's budget."],
    explanation: "Each advantage: identify (1) and explain (1).",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain **two** disadvantages of the government providing health care free at the point of use.",
    points: [
      "Identifies the cost to taxpayers / opportunity cost.",
      "Explains that the money must come from taxes or borrowing, or other spending is cut.",
      "Identifies over-use / queues or inefficiency.",
      "Explains that at a zero price demand is high, causing long waits; without competition providers may be inefficient.",
    ],
    modelAnswer: "First, free health care is expensive: it must be paid for by higher taxes or borrowing, or by cutting other spending such as roads, which is an opportunity cost. Second, at a zero price people use the service more, so clinics become crowded and waiting times are long; and with no competition or profit motive, public providers may have little pressure to be efficient.",
    hints: ["Who pays? What happens to demand at a zero price?"],
    explanation: "Each disadvantage: identify (1) and explain (1).",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 6,
    stem: "A government wants to reduce air pollution from old minibuses. Compare regulation (a ban on vehicles that fail an emissions test) with an indirect tax on diesel. Which would you recommend?",
    points: [
      "Regulation: directly removes the worst polluters from the road.",
      "Regulation: needs testing stations and inspectors; operators may bribe or ignore the rules; may cut transport services.",
      "Tax: raises the cost of diesel so operators use less fuel / have an incentive to buy cleaner vehicles; raises revenue.",
      "Tax: demand for diesel is inelastic, so pollution may fall little; raises fares for passengers (regressive).",
      "Makes a clear recommendation.",
      "Justifies the recommendation with a reason (for example regulation targets the worst vehicles, perhaps combined with a tax).",
    ],
    modelAnswer: "A ban on minibuses that fail an emissions test targets the dirtiest vehicles directly, so pollution falls quickly, but it needs testing stations and honest inspectors, and if many minibuses are banned commuters may lose transport. A tax on diesel makes every operator pay more for pollution and raises revenue, but demand for diesel is inelastic, so fuel use and pollution may fall little, while fares rise for poor passengers. I would recommend regulation, because the problem comes mainly from old vehicles that the test can identify, perhaps with part of any fuel-tax revenue used to help operators replace old buses.",
    hints: ["For each: how does it reduce pollution, and what can go wrong?"],
    explanation: "Compare directness and enforcement of regulation with incentives, revenue and inelastic demand under a tax, then recommend.",
  });

  // Structured 1: a fishing quota, with a data table.
  const yrs = [2021, 2022, 2023, 2024, 2025];
  const catchT = [15800, 16300, 16900, 13200, 13200], stock = [61000, 54500, 47200, 49100, 52300];
  check("quota catch", catchT[3], 13200);
  check("catch fall", catchT[2] - catchT[3], 3700);
  const T = table(["Year", "Total catch (tonnes)", "Estimated fish stock (tonnes)"], yrs.map((y, i) => [String(y), catchT[i], stock[i]]));
  const stockFall = pctChange(stock[0], stock[2]);
  const stockRise = pctChange(stock[2], stock[4]);
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 12, calculator: true,
    stem: `The table shows the total catch of fish and the estimated fish stock in a fictional lake. In 2024 the government introduced a quota limiting the total catch to 13,200 tonnes a year.\n\n${T}`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "pct", value: Math.abs(stockFall), stem: "Calculate the percentage fall in the estimated fish stock between 2021 and 2023. Give your answer to one decimal place.", wrong: [Math.abs(pctChange(stock[2], stock[0]))], explanation: `(${stock[0].toLocaleString("en-GB")} − ${stock[2].toLocaleString("en-GB")}) ÷ ${stock[0].toLocaleString("en-GB")} × 100 = ${pct(Math.abs(stockFall), 1)}.` }),
      P.num({ label: "(b)", marks: 2, kind: "pct", value: stockRise, stem: "Calculate the percentage rise in the estimated fish stock between 2023 and 2025. Give your answer to one decimal place.", wrong: [pctChange(stock[4], stock[2]) * -1], explanation: `(${stock[4].toLocaleString("en-GB")} − ${stock[2].toLocaleString("en-GB")}) ÷ ${stock[2].toLocaleString("en-GB")} × 100 = ${pct(stockRise, 1)}.` }),
      P.manual({
        label: "(c)", marks: 2,
        stem: "Explain why, without a quota, fishing companies over-fish a lake.",
        points: [
          "Each company ignores the effect of its own catch on the stock left for other companies and for the future (an external cost).",
          "No one owns the fish until they are caught, so each company has an incentive to catch as much as possible now.",
        ],
        modelAnswer: "No one owns the fish in the lake until they are caught, so each company tries to catch as much as it can before others do. Each one ignores the effect of its catch on the stock left for others and for the future, so together they take more than the lake can replace.",
        explanation: "Common resource, external cost on others and the future.",
      }),
      P.manual({
        label: "(d)", marks: 6, levels: LV(6),
        stem: "Using the data, discuss whether the quota has been a success.",
        points: [
          `Evidence for: the stock fell every year before 2024 but has risen since, by ${pct(stockRise, 1)} between 2023 and 2025.`,
          "For: a recovering stock allows fishing to continue in future (sustainability), protecting jobs and food supply in the long run.",
          "Against: the catch fell from 16,900 to 13,200 tonnes, so incomes, jobs and fish supply fell in the short run; fish prices may rise.",
          "Against / limitation: the data are estimates; other factors (rainfall, lake level) may explain the recovery; illegal fishing may not be recorded.",
          "Against: enforcement costs; small fishers may be squeezed out.",
          "Justified conclusion.",
        ],
        modelAnswer: `Before the quota the stock fell every year, by ${pct(Math.abs(stockFall), 1)} between 2021 and 2023, while the catch kept rising. Since the quota the stock has risen by ${pct(stockRise, 1)}, which suggests the lake is recovering and fishing can continue for many years, protecting jobs in the long run. However, the catch fell by 3,700 tonnes a year, which cut fishers' incomes and the supply of fish, so prices may have risen. The figures are only estimates, the recovery could partly be due to good rains, and illegal catches are not recorded, so we cannot be sure. On balance the quota appears to be working, but the government should keep monitoring the stock and enforcing the limit.`,
        explanation: "Use the trend in stock before and after 2024, weigh the short-run cost of a smaller catch, note the limits of the data, and conclude.",
      }),
    ],
    hints: ["Percentage change = change ÷ original value × 100.", "Compare the years before and after the quota."],
    explanation: `The stock fell ${pct(Math.abs(stockFall), 1)} (2021-2023) and rose ${pct(stockRise, 1)} (2023-2025) after the quota; a balanced answer weighs recovery against the lower catch.`,
  });

  // Structured 2: nationalisation versus privatisation of a bus company.
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, marks: 8,
    stem: "A fictional country's only national airline is state-owned. It has made losses for several years, and the government has paid US\\$38 million a year to keep it flying. An investor has offered to buy the airline.",
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: 38 * 4, stem: "If the losses continue at the same rate, how much (in US\\$ million) will the government pay over the next four years?", wrong: [38], explanation: `38 × 4 = US\\$${38 * 4} million.` }),
      P.manual({
        label: "(b)", marks: 6, levels: LV(6),
        stem: "Discuss whether the government should privatise the airline.",
        points: [
          "For: ends the yearly cost to taxpayers (US\\$38 million) and raises money from the sale.",
          "For: profit motive and private capital can make the airline more efficient and better run.",
          "Against: the new owner may cut unprofitable routes (for example to tourist or remote destinations) that matter to the economy.",
          "Against: job losses; if it is the only airline on some routes, fares may rise; a strategic asset may pass to a foreign owner.",
          "Alternative or condition: privatise with regulation / route obligations, or open the market to competition.",
          "Justified conclusion.",
        ],
        modelAnswer: "Privatisation would save taxpayers US\\$38 million a year, money that could go to schools or clinics, and the sale itself would raise revenue. A private owner, driven by profit and able to raise its own capital, may cut waste and improve the service. However, the owner may drop loss-making routes that bring tourists or link remote areas, cut jobs, and, if it faces little competition, raise fares. The country may also want to keep control of a strategic transport link. On balance, privatisation is sensible given the continued losses, provided the government regulates fares and service standards and allows other airlines to compete.",
        explanation: "Weigh savings and efficiency against lost routes, jobs and monopoly pricing; conclude with conditions.",
      }),
    ],
    hints: ["What does the government gain and lose by selling?"],
    explanation: "Privatisation ends the subsidy and may raise efficiency, but risks monopoly pricing and lost routes; regulation and competition are common conditions.",
  });
  check("air", 38 * 4, 152);
  void money;

  b.card("DEFINITION", "Define **regulation**.", "Rules and laws, backed by penalties, that control what firms and consumers may do (for example pollution limits, safety standards, bans).");
  b.card("DEFINITION", "Define a **quota** (as a response to market failure).", "A legal limit on the quantity that may be produced, extracted, caught or imported in a period.");
  b.card("DEFINITION", "Define **direct provision**.", "The government supplies a good or service itself, usually free or below cost, paid for from taxes.");
  b.card("DEFINITION", "Nationalisation versus privatisation?", "Nationalisation: private → public ownership. Privatisation: public → private ownership.");
  b.card("CONCEPT", "Which interventions match which market failures?", "Public goods → direct provision; pollution → regulation or tax; over-use of resources → quotas; natural monopoly → nationalisation or regulation.");
  b.card("CONCEPT", "Two disadvantages of regulation?", "Costly to enforce; firms may ignore weak rules; same rule for all firms; can create illegal markets.");
  b.card("CONCEPT", "Main risk of privatising a natural monopoly?", "It becomes a private monopoly that may raise prices or cut services, so it usually needs regulating.");
  b.card("FACT", "What is a public sector firm (public corporation, parastatal)?", "A firm owned and controlled by the government.");
  b.card("CONCEPT", "What is government failure?", "When a government intervention makes resource allocation worse or fails to correct the market failure (for example poor enforcement, inefficiency).");
});
