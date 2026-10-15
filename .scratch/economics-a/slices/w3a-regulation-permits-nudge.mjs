// W3a: regulation, quotas, tradable permits, property rights and nudges (both boards; ZIMSEC Form 5, Cambridge A Level).
import { concept, P, chk, table, linearMarket } from "../lib.mjs";
import { mc, LV5, LV8, LV10 } from "../tables/w3a-kit.mjs";

concept("aecon.intervention.regulation-permits-nudge", { file: "intervention/regulation-permits-nudge", keyPrefix: "intervention.regulation-permits-nudge" }, (b) => {
  mc(b, [1, "RECALL"], "A tradable pollution permit allows its holder to",
    ["emit a stated quantity of a pollutant and sell the right to others", "Correct: permits are capped in total and can be traded."],
    [["produce an unlimited quantity of a good for sale in the market", "A permit limits pollution, not output without limit."], ["avoid all taxes on the firm's profit for as long as it holds it", "Permits have nothing to do with profit taxes."], ["set the price of the product that the firm makes and sells", "Permits are about emissions, not pricing."]],
    "A permit is a right to emit a set amount, and permits can be bought and sold.");

  mc(b, [2, "UNDERSTANDING"], "A production quota is best described as",
    ["a legal limit on quantity", "Correct: it fixes the quantity that may be produced or sold, not the price."],
    [["a tax on each unit sold, paid by the producer", "A tax changes price through costs; a quota limits quantity."], ["a minimum price set above the equilibrium price", "That is a price floor."], ["an agreement among firms to share their profits secretly", "That is collusion, not a legal quota."]],
    "A quota is a legal limit on quantity.", { daily: true });

  mc(b, [2, "UNDERSTANDING"], "Which is a nudge?",
    ["Enrolling workers in a pension scheme automatically, with the option to leave", "Correct: a default changes behaviour while keeping all choices open."],
    [["Banning the sale of a harmful product from all shops in the country", "A ban removes choice; it is not a nudge."], ["Doubling the tax on cigarettes so that they become more expensive", "A tax changes the price; it is not a nudge."], ["Fining firms that break the emission limits that apply to them", "A fine enforces a rule; it is not a nudge."]],
    "A nudge alters how a choice is presented, here through a default, without banning options.", { daily: true });

  mc(b, [2, "UNDERSTANDING"], "What is the main advantage of tradable permits over a uniform emission limit for every firm?",
    ["The same total reduction is reached at a lower total cost", "Correct: firms that can cut cheaply cut most."],
    [["Every firm is made to cut the same amount of pollution", "That describes a uniform limit, not trading."], ["No monitoring of any firm's emissions is needed by the authority", "Monitoring is needed in both systems."], ["The government no longer needs to set a cap on total emissions", "The cap is what makes the permit system work."]],
    "Trading shifts the cutting of emissions to firms with the lowest abatement costs.");

  mc(b, [3, "ANALYSIS"], "A binding quota is set on a good below the free market output. Which is a likely result?",
    ["A premium appears between the price consumers pay and the cost of the last unit", "Correct: the demand price at the quota is above the supply price."],
    [["The price falls and consumer surplus rises for all buyers in the market", "A lower quantity moves up the demand curve to a higher price."], ["Output rises above the free market level because firms expand", "A binding quota is below the market output."], ["There is no change in the price because the market still clears", "The market quantity is held back, so the price changes."]],
    "A quota below the equilibrium quantity pushes the demand price above the supply price and creates a welfare loss.", { hints: ["Compare the price consumers would pay at the quota with the cost of supplying that unit."] });

  mc(b, [3, "EVALUATION"], "Which is the strongest reason for choosing a legal ban instead of a tradable permit scheme for a highly toxic chemical?",
    ["Certainty of no release matters more than any saving in cost", "Correct: when harm is severe, certainty is the priority."],
    [["Permit prices are likely to change from year to year for firms", "That is a weakness of permits but not a reason for a ban on a toxic chemical."], ["Firms will usually find it cheaper to buy permits than to cut", "That is the aim of a permit system, not a case for a ban."], ["Government revenue from selling permits would be lower than from a tax", "Revenue is not the main concern when harm is severe."]],
    "A ban gives certainty that the dangerous activity stops; trading is suited to harms where cost-minimisation matters.", { hints: ["Think about the size of the harm and how certain the outcome must be."] });

  mc(b, [3, "UNDERSTANDING"], "Which of these is a problem that property rights may help to solve?",
    ["Over-use of an open-access fishery because no one owns it", "Correct: ownership gives an incentive to protect the resource."],
    [["A fall in the price of fish caused by a bumper catch in one season", "A price fall is not a market failure that rights correct."], ["A shortage of fishing boats because boat makers raise their prices", "That is a supply issue in the boat market."], ["A rise in the incomes of fishers after a successful season", "That is not a problem to be solved."]],
    "Without ownership each user ignores the effect on others; assigning rights creates an incentive to conserve.", { hints: ["Who has an incentive to protect a resource that nobody owns?"] });

  {
    const m = linearMarket({ a: 90, b: 0.5, c: 10, d: 0.5 });
    chk(m.quantity, 80); chk(m.price, 50);
    const pd = 90 - 0.5 * 60, ps = 10 + 0.5 * 60;
    chk(pd, 60); chk(ps, 40);
    const wl = 0.5 * (pd - ps) * (80 - 60); chk(wl, 200);
    b.num({ d: 3, skill: "APPLICATION", kind: "money", value: pd, calculator: true, hints: ["Put the quota into the demand equation."],
      stem: "A market has demand P = 90 − 0.5Q and supply P = 10 + 0.5Q (P in US\\$ per tonne, Q in tonnes a week). A quota limits sales to 60 tonnes a week. What price will consumers pay for the 60th tonne, in US\\$?",
      wrong: [50, 40, 30], explanation: "Consumers pay what the demand curve gives at 60 tonnes: 90 − 0.5 × 60 = US\\$60. (US\\$50 is the free market price; US\\$40 is the supply price at 60 tonnes.)" });
    b.calc({ d: 4, skill: "ANALYSIS", kind: "money", value: wl, calculator: true, hints: ["Find the equilibrium first.", "The welfare loss is a triangle: the gap between the demand and supply prices at the quota, times the lost output, halved."],
      stem: "Using the same market (demand P = 90 − 0.5Q, supply P = 10 + 0.5Q, quota 60 tonnes a week), calculate the weekly welfare loss caused by the quota, in US\\$.",
      wrong: [400, 100, 1200], explanation: "1. Free market: 90 − 0.5Q = 10 + 0.5Q, so Q = 80 and P = US\\$50.\n2. At the quota: demand price = US\\$60, supply price = US\\$40, a gap of US\\$20.\n3. Lost output = 80 − 60 = 20 tonnes.\n4. Welfare loss = ½ × 20 × 20 = US\\$200. (US\\$400 forgets the half; US\\$1,200 is the premium on the 60 tonnes sold, 20 × 60, which is largely a transfer.)" });
  }
  {
    // Two-firm permit calculation.
    const cost = { P: 6, Q: 15, R: 30 }; const cut = 20;
    const noTrade = (cost.P + cost.Q + cost.R) * cut; chk(noTrade, 1020);
    const trade = 50 * cost.P + 10 * cost.Q; chk(trade, 450);
    b.calc({ d: 4, skill: "APPLICATION", kind: "money", value: noTrade - trade, calculator: true, hints: ["Without trading each firm cuts the same amount.", "With trading the cheapest firms cut first, up to 50 tonnes each."],
      stem: "Three fictional firms each emit 50 tonnes of waste a year. The government wants total emissions cut to 90 tonnes, by issuing 30 permits to each firm. Cutting one tonne costs US\\$6 for firm P, US\\$15 for firm Q and US\\$30 for firm R, and each firm can cut up to 50 tonnes at that constant cost. Calculate the saving in total cutting cost if permits can be traded, compared with each firm cutting its own 20 tonnes, in US\\$.",
      wrong: [1020, 450, 1470], explanation: "1. Without trading: each cuts 20 tonnes: 20 × (6 + 15 + 30) = US\\$1,020.\n2. With trading, 60 tonnes must be cut. Firm P cuts 50 tonnes (50 × 6 = 300) and firm Q cuts 10 tonnes (10 × 15 = 150). Total = US\\$450.\n3. Saving = 1,020 − 450 = US\\$570." });
    b.num({ d: 3, skill: "ANALYSIS", kind: "money", value: 15, hints: ["The permit price equals the cost of cutting the last tonne."],
      stem: "In the same permit scheme, at what price (US\\$ a permit) will permits trade? Firm Q is the firm whose cutting cost sets the marginal tonne.",
      wrong: [6, 30, 10], explanation: "The last tonne is cut by firm Q at US\\$15. Firm P will sell permits at any price above US\\$6, firm R will buy at any price below US\\$30, and the market clears when the price equals the marginal cutting cost, US\\$15." });
  }

  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "Under a cap-and-trade scheme the total quantity of permits issued sets the maximum level of pollution.", answer: true,
    explanation: "True. The cap fixes the total emissions; trading only decides who emits." });
  b.tf({ d: 3, skill: "EVALUATION", hints: ["Can everybody be nudged into the same behaviour?"], stem: "A nudge is certain to change the behaviour of every consumer, so it is always better than a ban.", answer: false,
    explanation: "False. Nudges change behaviour only for some people, effects may be small, and they are weak where harm is large or the good is addictive." });

  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each policy with its description.",
    pairs: [["Production quota", "A legal limit on the quantity produced or sold"], ["Prohibition", "A complete ban on a good or activity"], ["Licence", "Permission to operate only for those who meet conditions"], ["Default option", "A choice that applies unless the person opts out"]],
    explanation: "Quotas limit quantity, prohibitions ban, licences restrict entry, and defaults are a type of nudge." });

  b.fib({ d: 2, skill: "UNDERSTANDING", stem: "Complete the sentences.",
    template: "A cap-and-trade scheme meets a fixed pollution target at the {{blank:a}} total cost, because the firms with the lowest {{blank:b}} costs cut the most.",
    blanks: [{ id: "a", accepted: ["lowest"], choices: ["lowest", "highest", "average"] }, { id: "b", accepted: ["abatement"], choices: ["abatement", "marketing", "labour"] }],
    explanation: "Trading moves pollution cutting to firms where it is cheapest." });

  b.short({ d: 2, skill: "RECALL", stem: "Name the approach in which the government removes rules that act as barriers to entry in order to increase competition.",
    accepted: ["deregulation", "deregulating", "liberalisation"], wrong: ["regulation"],
    explanation: "Deregulation removes or relaxes rules to open markets." });

  b.manualShort({ d: 2, skill: "RECALL", marks: 2, stem: "Define a nudge.",
    points: ["A feature of how a choice is presented (such as a default or framing).", "That predictably changes behaviour without banning options or changing prices significantly."],
    modelAnswer: "A nudge is a feature of the way a choice is presented, such as a default option or the framing of a message, that predictably changes behaviour without banning any option or changing prices much.",
    explanation: "One mark for the presentation of the choice and one for no ban or price change." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4, hints: ["Compare the cost of cutting pollution for different firms."],
    stem: "Explain why tradable pollution permits can reduce the cost of meeting an emission target.",
    points: ["The government sets a cap and issues permits equal to the cap.", "Firms differ in the cost of cutting pollution.", "Firms with low costs cut more and sell spare permits; firms with high costs buy permits instead of cutting.", "The same total reduction is achieved at lower total cost than if every firm had to cut the same amount."],
    modelAnswer: "The government sets a cap on total emissions and issues permits equal to it. Firms differ in their costs of cutting pollution, so low-cost firms cut more and sell their spare permits to high-cost firms, which prefer to buy a permit than to pay for expensive cuts. The same total reduction is therefore achieved at a lower total cost than if every firm had to cut by the same amount.",
    explanation: "Cap, differing costs, trading, lower total cost." });
  b.manualShort({ d: 4, skill: "EVALUATION", marks: 6, hints: ["Give strengths and weaknesses, then compare with another policy."],
    stem: "Assess the use of regulation (a legal emission limit for each firm) to reduce pollution.",
    points: ["Strength: it acts directly and gives certainty about the maximum pollution.", "Strength developed: it is suitable for serious harms, where a firm must not exceed a safe limit.", "Weakness: every firm faces the same limit, even though firms differ in the cost of cutting emissions, so the total cost is higher than necessary.", "Weakness: monitoring and enforcement cost money and may be weak.", "Weakness: firms have no incentive to cut below the limit.", "A justified judgement (for example that rules suit dangerous pollutants, while permits or taxes suit others)."],
    modelAnswer: "A legal limit acts directly and gives certainty that pollution will not exceed a set level, which is important for dangerous pollutants. However, it treats every firm alike even though firms differ in how costly it is for them to cut emissions, so the total cost is higher than necessary, and firms have no reason to do better than the limit. It also requires monitoring and enforcement, which may be weak. Overall, regulation is best for serious harms where certainty is vital, while permits or taxes may be better for less serious pollution where reducing cost matters.",
    explanation: "Strengths, weaknesses and a judgement linked to the type of pollution." });

  {
    const m = linearMarket({ a: 130, b: 1, c: 20, d: 1 });
    chk(m.quantity, 55); chk(m.price, 75);
    const q = 45, pd = 130 - q, ps = 20 + q; chk(pd, 85); chk(ps, 65);
    const wl = 0.5 * (pd - ps) * (55 - q); chk(wl, 100);
    const t1 = table(["Quantity of fish (tonnes a month)", "Price on the demand curve (US\\$ a tonne)", "Cost of the last tonne supplied (US\\$ a tonne)"], [[45, pd, ps], [55, 75, 75]]);
    b.struct({ d: 3, skill: "APPLICATION", examStyle: true, calculator: true, hints: ["Use the demand and supply equations at the quota.", "The welfare loss is a triangle."],
      stem: `**A fishing quota on a fictional lake (illustrative data)**\n\nFish stocks in a lake are falling. The demand for fish is P = 130 − Q and the supply is P = 20 + Q (P in US\\$ a tonne, Q in tonnes a month). The authority considers a quota of 45 tonnes a month.\n\n${t1}`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "plain", value: m.quantity, unit: "tonnes", stem: "Calculate the free market quantity, in tonnes a month.", wrong: [45, 75, 110], explanation: "130 − Q = 20 + Q, so 110 = 2Q and Q = 55 tonnes." }),
        P.num({ label: "(b)", marks: 2, kind: "money", value: pd - ps, stem: "Calculate the premium per tonne that appears at the quota (the gap between the price consumers will pay and the cost of the last tonne supplied), in US\\$.", wrong: [10, 40, 85], explanation: "At 45 tonnes: demand price 130 − 45 = US\\$85 and supply price 20 + 45 = US\\$65; the gap is US\\$20." }),
        P.num({ label: "(c)", marks: 2, kind: "money", value: wl, stem: "Calculate the welfare loss caused by the quota, in US\\$ a month.", wrong: [200, 20, 1000], explanation: "Lost output = 55 − 45 = 10 tonnes. Welfare loss = ½ × 20 × 10 = US\\$100." }),
        P.manual({ label: "(d)", marks: 4, stem: "Explain one benefit and one problem of using a quota to protect the fish stock.",
          points: ["Benefit: the quantity caught is limited, so the stock can recover or be sustained.", "Benefit developed: it gives certainty about the maximum catch.", "Problem: the price rises, so consumers pay more and fewer buy the fish.", "Problem developed: the gap between the price and the cost encourages illegal fishing."],
          modelAnswer: "A quota limits the catch to 45 tonnes a month, so the stock can recover and the maximum catch is certain. However, it raises the price and the gap of US\\$20 a tonne between the price and the cost of the last tonne encourages illegal fishing, so the quota must be enforced." }),
      ],
      explanation: "Market 55 tonnes; premium US\\$20; welfare loss US\\$100; quotas protect the stock but create a premium and an incentive to cheat." });
  }
  {
    const cost = { P: 6, Q: 15, R: 30 };
    const t1 = table(["Firm", "Emissions now (tonnes)", "Permits issued (tonnes)", "Cost of cutting 1 tonne (US\\$)"], [["P", 50, 30, cost.P], ["Q", 50, 30, cost.Q], ["R", 50, 30, cost.R]]);
    const trade = 50 * cost.P + 10 * cost.Q;
    const rPays = 20 * 15, rCuts = 20 * 30;
    chk(trade, 450); chk(rPays, 300); chk(rCuts, 600);
    b.struct({ d: 4, skill: "EVALUATION", examStyle: true, calculator: true, hints: ["Work out who cuts and who buys.", "Think about what a regulator needs to know."],
      stem: `**Tradable permits for waste (illustrative data)**\n\nThe environment authority of a fictional country wants three factories to cut their total waste from 150 to 90 tonnes a year, so it gives each factory 30 permits. Permits can be traded. Each factory can cut up to 50 tonnes at the constant cost per tonne shown.\n\n${t1}`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "money", value: trade, stem: "Calculate the total cost of cutting 60 tonnes with trading, in US\\$.", wrong: [1020, 570, 300], explanation: "Factory P cuts 50 tonnes (50 × 6 = 300) and factory Q cuts 10 tonnes (10 × 15 = 150): US\\$450." }),
        P.num({ label: "(b)", marks: 2, kind: "money", value: rCuts - rPays, stem: "Factory R emits 50 tonnes and holds 30 permits. If permits cost US\\$15 each, how much does it save by buying the 20 permits it needs, compared with cutting 20 tonnes itself, in US\\$?", wrong: [300, 600, 900], explanation: "Cutting 20 tonnes itself costs 20 × 30 = US\\$600; 20 permits cost 20 × 15 = US\\$300; the saving is US\\$300." }),
        P.manual({ label: "(c)", marks: 3, stem: "Explain why factory P is likely to sell permits.",
          points: ["Its cost of cutting waste (US\\$6 a tonne) is the lowest.", "At a permit price above US\\$6 it is cheaper for P to cut more than its share than to hold the permits.", "Selling spare permits earns revenue greater than the cost of the extra cutting."],
          modelAnswer: "Factory P has the lowest cost of cutting waste, US\\$6 a tonne. If a permit sells for more than US\\$6 it pays P to cut more than it has to and sell its spare permits, because the revenue exceeds the cost of cutting." }),
        P.manual({ label: "(d)", marks: 3, stem: "Evaluate one problem of using tradable permits in a country with a small and poorly funded environment authority.",
          points: ["The scheme depends on measuring each factory's emissions to check that the permits are held.", "With a poorly funded authority, monitoring may be weak and firms may cheat.", "A justified comment, for example that a simpler rule or tax may be needed until monitoring improves."],
          modelAnswer: "Permits only work if the authority can measure each factory's emissions and check that it holds enough permits. A small and poorly funded authority may be unable to monitor, so firms may cheat and the cap would not be met. A simpler rule, with a smaller number of large polluters inspected, may be more practical until monitoring improves." }),
      ],
      explanation: "Trading cost US\\$450 against US\\$1,020; R saves US\\$300; P sells; monitoring is a limit." });
  }

  b.ext({ d: 4, skill: "EVALUATION", marks: 10, hints: ["Compare the tools by certainty, cost and enforcement.", "Reach a judgement for the case."],
    stem: "Assess whether tradable pollution permits are a better way of controlling industrial pollution than a legal limit on emissions for each firm.",
    points: ["Permits fix the total pollution (the cap) and so do limits applied to each firm.", "Permits allow the cut to be made by the firms with the lowest abatement costs, so the total cost is lower.", "A uniform limit ignores differences in costs between firms.", "Permits give a continuing incentive to find cheaper ways of cutting emissions.", "Permits need good monitoring and an accurate cap; the permit price may be unstable.", "Free allocation of permits may favour existing firms and block new entrants.", "Permits may let pollution concentrate in one area (hot spots), a problem if local harm is serious.", "For highly dangerous pollutants a strict limit or ban may be preferred.", "Permits sold at auction raise revenue for the government, which a free limit does not.", "A justified judgement."],
    levels: LV10,
    modelAnswer: "Both a permit scheme and a legal limit can fix the total pollution, but tradable permits meet the target at a lower cost because firms that can cut emissions cheaply cut most and sell their spare permits, while a uniform limit forces every firm to cut by the same amount whatever its cost. Permits also give firms a lasting reason to find cheaper ways of cutting pollution, whereas under a limit there is no reward for doing better. However, permits need accurate monitoring and a well-chosen cap, the permit price may swing, free allocation can favour existing firms, and pollution may concentrate where the cheapest cutting is not near the people harmed. For dangerous pollutants a strict limit gives more certainty. Overall, permits are better for widespread pollutants where firms differ in their costs and monitoring is possible, while a limit or ban is better for highly toxic ones.",
    wordLimit: { min: 120, max: 350 },
    explanation: "Cost advantage of trading weighed against monitoring, fairness and local harm." });

  b.card("DEFINITION", "Define a **production quota**.", "A legal limit on the quantity that a firm, industry or country may produce or sell.");
  b.card("CONCEPT", "What is the main effect of a binding quota on price and output?", "Output falls below the market level and the price rises; the gap between the demand price and the supply price is a premium, and there is a welfare loss.");
  b.card("DEFINITION", "What is a **tradable pollution permit**?", "A permit to emit a set quantity of pollutant; the total is capped and permits can be bought and sold.");
  b.card("CONCEPT", "Why do tradable permits lower the cost of meeting a pollution target?", "Firms with low abatement costs cut most and sell permits to high-cost firms, so the cap is met at the lowest total cost.");
  b.card("DEFINITION", "Define **deregulation**.", "The removal or relaxation of rules, for example barriers to entry, to make markets more competitive.");
  b.card("CONCEPT", "How can **property rights** reduce an externality?", "Ownership gives an incentive to protect a resource and the right to bargain with those who harm it.");
  b.card("DEFINITION", "Define a **nudge**.", "A feature of how a choice is presented, such as a default or framing, that changes behaviour without banning options or changing prices much.");
  b.card("CONCEPT", "Give two limits of regulation as a policy.", "Costs of monitoring and enforcement, and the same rule for firms with different costs; no incentive to do better than the rule.");
  b.card("CONCEPT", "Give two limits of nudges.", "Effects can be small or short-lived; they are weak for addictive goods and large external costs; they may be seen as manipulation.");
});
