// W2b: economic rent, transfer earnings and quasi-rent (both boards; quasi-rent is ZIMSEC detail).
import { concept, P, ZIM, chk, table, triangleArea, tax } from "../lib.mjs";
import { mc, LV8 } from "../tables/w2b-kit.mjs";

concept("aecon.distribution.rent-transfer-earnings", { file: "distribution/rent-transfer-earnings", keyPrefix: "distribution.rent-transfer-earnings" }, (b) => {
  mc(b, [1, "RECALL"], "Transfer earnings are",
    ["the minimum payment needed to keep a factor in use", "Correct: the factor's opportunity cost."],
    [["the payment above what the factor needs to stay in use", "That is economic rent."],
     ["the profit earned by the entrepreneur in a year", "That is a different reward."],
     ["money transferred from one government to another", "That describes a transfer payment, not transfer earnings."]],
    "Transfer earnings are the opportunity cost of a factor: what it could earn in its next best use.");

  mc(b, [1, "RECALL"], "Economic rent is",
    ["the surplus a factor earns over transfer earnings", "Correct: payment minus transfer earnings."],
    [["the weekly payment a tenant makes to a landlord", "That is a price for using a property, not economic rent."],
     ["the minimum payment needed to keep a factor in use", "That is transfer earnings."],
     ["the reward to enterprise for taking risks", "That is profit."]],
    "Economic rent = actual payment − transfer earnings.");

  mc(b, [2, "UNDERSTANDING"], "If the supply of a factor is perfectly inelastic, its earnings are",
    ["entirely economic rent", "Correct: it has no other use, so transfer earnings are zero."],
    [["entirely transfer earnings", "That is the case with perfectly elastic supply."],
     ["half rent and half transfer earnings", "There is no such rule."],
     ["zero, because the factor cannot respond to price", "The factor is still paid; the payment is all rent."]],
    "With fixed supply the factor has no opportunity cost, so all of its payment is surplus.", { daily: true });

  mc(b, [2, "UNDERSTANDING"], "A factor in perfectly elastic supply to an occupation earns",
    ["only transfer earnings", "Correct: any lower payment loses all of the supply."],
    [["only economic rent", "Rent exists only if supply is not perfectly elastic."],
     ["both rent and transfer earnings in equal parts", "A horizontal supply curve leaves no area above it."],
     ["no payment at all", "It is paid its opportunity cost."]],
    "A horizontal supply curve leaves no area above it, so there is no economic rent.");

  mc(b, [3, "APPLICATION"], "A fictional musician earns US\\$20,000 a month. Her best alternative job pays US\\$7,000 a month. Her economic rent is",
    ["US\\$13,000", "Correct: 20,000 − 7,000."],
    [["US\\$7,000", "This is her transfer earnings."], ["US\\$20,000", "This is her total earnings."], ["US\\$27,000", "This adds the two figures instead of subtracting."]],
    "Economic rent = earnings − transfer earnings = 20,000 − 7,000 = US\\$13,000.", { hints: ["Subtract the best alternative from her earnings."] });

  mc(b, [3, "UNDERSTANDING"], "On a diagram of an upward-sloping supply curve and a market price, economic rent is represented by the area",
    ["above the supply curve and below the price", "Correct: the surplus over what suppliers would accept."],
    [["below the supply curve up to the quantity", "That is transfer earnings."],
     ["above the price and below the demand curve", "That is consumer surplus."],
     ["to the right of the equilibrium quantity", "No payment is made there."]],
    "Rent is the triangle between the price and the supply curve; transfer earnings lie under the supply curve.", { hints: ["Which area lies between the price and the supply curve?"] });

  mc(b, [3, "ANALYSIS"], "Demand for an occupation with perfectly inelastic supply rises. The effect is that",
    ["the wage and rent rise, with employment unchanged", "Correct: the extra demand only raises the surplus."],
    [["the wage and employment both rise together", "Employment cannot rise if supply is fixed."],
     ["the wage rises and transfer earnings also rise", "Transfer earnings stay at zero."],
     ["the wage falls and employment rises sharply", "Higher demand raises the wage."]],
    "With fixed supply, higher demand raises only the reward, which is all economic rent.", { hints: ["What can change when supply cannot?"] });

  mc(b, [4, "EVALUATION"], "A tax on a factor's economic rent will have little effect on the supply of the factor because",
    ["the factor still earns more than transfer earnings", "Correct: it stays in its use."],
    [["transfer earnings fall by the full amount of the tax", "Transfer earnings depend on alternatives, not on the tax."],
     ["the factor's supply becomes perfectly elastic", "A tax on rent does not change elasticity."],
     ["the tax is paid by consumers of the product", "The tax falls on the factor owner."]],
    "As long as the after-tax payment exceeds transfer earnings the factor stays in its use, so supply is unchanged.", { hints: ["Compare the after-tax payment with the opportunity cost."] });

  mc(b, [3, "UNDERSTANDING"], "Quasi-rent is best described as",
    ["a temporary surplus on a fixed asset", "Correct: it disappears as supply adjusts."],
    [["a permanent surplus on all kinds of land", "Quasi-rent is temporary."],
     ["the rent paid on a shop each month", "That is a price for use of premises."],
     ["a payment to a worker for overtime", "That is a wage."]],
    "Quasi-rent is revenue less variable costs on a factor fixed in the short run; it is competed away in the long run.", { applies: ZIM, hints: ["Which factor is fixed in the short run?"] });

  {
    const rent = triangleArea(150, 8 - 2);
    chk(rent, 450, 1e-9);
    b.calc({ d: 4, skill: "APPLICATION", calculator: true, kind: "plain", value: rent, unit: "US$ per hour", hints: ["Find employment from the supply curve, then use the triangle."],
      stem: "The supply of drivers to a fictional bus company is W = 2 + 0.04L, where W is the hourly wage in US\\$ and L is the number of drivers. The market wage is US\\$8 an hour. Calculate the total economic rent, in US\\$ per hour.",
      wrong: [750, 1200, 900],
      explanation: "1. Employment: 8 = 2 + 0.04L, so L = 150 drivers.\n2. Rent = ½ × (8 − 2) × 150 = US\\$450 an hour.\n3. Total pay = 8 × 150 = 1,200, so transfer earnings = 1,200 − 450 = 750. Using 750 or 1,200 confuses the other areas." });
    b.num({ d: 4, skill: "APPLICATION", calculator: true, kind: "pct", value: (750 / 1200) * 100, dp: 1, hints: ["Total pay minus rent gives transfer earnings."],
      stem: "Using the same supply curve (W = 2 + 0.04L) and a wage of US\\$8 an hour, what percentage of the drivers' total pay is transfer earnings? Give your answer to one decimal place.",
      wrong: [37.5, 62, 450],
      explanation: "Total pay = 8 × 150 = US\\$1,200 an hour. Rent is US\\$450, so transfer earnings = US\\$750. 750 ÷ 1,200 × 100 = 62.5%." });
  }
  {
    const q = 54 - 39;
    chk(q, 15, 0);
    b.num({ d: 3, skill: "APPLICATION", kind: "plain", value: q, unit: "US$ thousand", applies: ZIM, hints: ["Quasi-rent is revenue minus variable costs."],
      stem: "A fictional machine earns revenue of US\\$54 thousand a year. Variable costs of running it are US\\$39 thousand and the fixed costs are US\\$11 thousand. Calculate its quasi-rent, in US\\$ thousand.",
      wrong: [4, 43, 54],
      explanation: "Quasi-rent = revenue − variable costs = 54 − 39 = US\\$15 thousand. It covers the fixed costs of 11 and leaves 4 of surplus." });
  }

  b.tf({ d: 1, skill: "RECALL", stem: "Economic rent can be earned by labour as well as by land.", answer: true,
    explanation: "True. Any factor that earns more than its transfer earnings, such as a talented footballer, receives economic rent." });
  b.tf({ d: 3, skill: "ANALYSIS", hints: ["Compare the size of the surplus with the opportunity cost."], stem: "A footballer's earnings fall from US\\$50,000 to US\\$30,000 a month. Her best alternative job pays US\\$14,000. She is likely to stop playing.", answer: false,
    explanation: "False. Her earnings still exceed her transfer earnings, so she keeps playing; only the economic rent has fallen." });

  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each supply condition with its effect on earnings.",
    pairs: [["Perfectly inelastic supply", "All earnings are economic rent"], ["Perfectly elastic supply", "All earnings are transfer earnings"], ["Upward-sloping supply", "Earnings are part rent, part transfer earnings"], ["Fixed asset in the short run", "Earns quasi-rent that disappears in the long run"]],
    explanation: "The elasticity of supply decides the split between transfer earnings and rent." });

  b.fib({ d: 2, skill: "RECALL", stem: "Complete the sentence.",
    template: "Economic rent equals actual earnings minus {{blank:a}}, which are the factor's {{blank:b}} cost.",
    blanks: [{ id: "a", accepted: ["transfer earnings"], choices: ["transfer earnings", "profit", "tax"] }, { id: "b", accepted: ["opportunity"], choices: ["opportunity", "marginal", "fixed"] }],
    explanation: "Transfer earnings are the factor's opportunity cost." });

  b.short({ d: 2, skill: "RECALL", daily: true, stem: "What name is given to the minimum payment needed to keep a factor of production in its present use?",
    accepted: ["transfer earnings", "transfer earning"], wrong: ["economic rent"],
    explanation: "Transfer earnings are the factor's opportunity cost." });

  b.manualShort({ d: 2, skill: "RECALL", marks: 3, stem: "Distinguish between transfer earnings and economic rent.",
    points: ["Transfer earnings are the minimum payment needed to keep a factor in its present use (its opportunity cost).", "Economic rent is the payment above transfer earnings.", "Together they make up the factor's total earnings."],
    modelAnswer: "Transfer earnings are the minimum a factor must be paid to stay in its present use, equal to its opportunity cost. Economic rent is the surplus paid above that minimum. Total earnings are transfer earnings plus economic rent.",
    explanation: "One mark for each idea." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4, hints: ["Link the surplus to scarcity and alternatives."],
    stem: "Explain why a very talented footballer is likely to earn a high economic rent.",
    points: ["Her talent is scarce, so supply is highly inelastic.", "Few or no close substitutes exist for her skill, so demand for her services is high.", "Her next best occupation pays far less, so transfer earnings are low.", "Earnings far above that opportunity cost are economic rent."],
    modelAnswer: "Her talent is scarce and has no close substitutes, so the supply of such players is highly inelastic and clubs bid a high wage. Her next best job pays far less, so her transfer earnings are low. The large gap between her pay and her transfer earnings is economic rent.",
    explanation: "Scarcity, inelastic supply, low opportunity cost and the resulting surplus." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 4, hints: ["Compare the after-tax payment with the opportunity cost."],
    stem: "Analyse why a tax on economic rent may not reduce the supply of the factor.",
    points: ["Economic rent is a payment above transfer earnings.", "A tax reduces the payment but, if it stays above transfer earnings, the factor still earns more than in its next best use.", "The factor therefore stays in its present use.", "So supply, and output, do not fall; this contrasts with a tax on transfer earnings."],
    modelAnswer: "Economic rent is the surplus above transfer earnings. A tax lowers the factor's payment, but if the after-tax payment is still above transfer earnings the factor does better than in its next best use and stays where it is. Supply and output therefore do not fall, unlike a tax that cuts into transfer earnings.",
    explanation: "Surplus, after-tax payment, staying in use and no fall in supply." });

  {
    const w = [["Tendai", 3], ["Rudo", 4], ["Farai", 5], ["Chipo", 6], ["Nyasha", 7]];
    const tbl = table(["Worker", "Lowest hourly wage accepted (US\\$)"], w);
    const emp = w.filter(([, m]) => m <= 6);
    const te = emp.reduce((s, [, m]) => s + m, 0), rent = emp.reduce((s, [, m]) => s + (6 - m), 0), rent7 = w.reduce((s, [, m]) => s + (7 - m), 0);
    chk(te, 18, 0); chk(rent, 6, 0); chk(rent7, 10, 0);
    b.struct({ d: 3, skill: "APPLICATION", examStyle: true, hints: ["Everyone employed is paid the market wage.", "Rent for one worker = market wage − lowest wage accepted."],
      stem: `**Five fictional casual workers (illustrative data)**\n\nFive workers are willing to do a job in Mutare. The table shows the lowest hourly wage each would accept. The employer pays every worker the market wage, which is US\\$6 an hour, and workers who would accept less than this are employed.\n\n${tbl}`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "plain", value: te, unit: "US$ per hour", stem: "Calculate total transfer earnings of the workers employed, in US\\$ per hour.", wrong: [24, 6, 25], explanation: "Four workers are employed (Nyasha wants US\\$7). Transfer earnings = 3 + 4 + 5 + 6 = US\\$18." }),
        P.num({ label: "(b)", marks: 2, kind: "plain", value: rent, unit: "US$ per hour", stem: "Calculate total economic rent, in US\\$ per hour.", wrong: [18, 24, 3], explanation: "Total pay = 4 × 6 = 24. Rent = 24 − 18 = US\\$6 an hour (3 + 2 + 1 + 0)." }),
        P.mcq({ label: "(c)", marks: 1, stem: "Which worker earns the greatest economic rent?", options: [["Nyasha", "Not employed at US\\$6."], ["Chipo", "Her rent is zero."], ["Rudo", "Her rent is US\\$2."], ["Tendai", "Correct: rent of US\\$3 an hour."]], answer: "D", explanation: "Tendai would have accepted US\\$3 but is paid US\\$6." }),
        P.manual({ label: "(d)", marks: 3, stem: "The market wage rises to US\\$7 an hour. Explain what happens to total economic rent.",
          points: ["Nyasha is now employed, so five workers work.", "Each worker receives US\\$1 more, and Nyasha earns zero rent.", "Total rent rises from US\\$6 to US\\$10 an hour (4 + 3 + 2 + 1 + 0)."],
          modelAnswer: "At US\\$7 all five workers are employed. Each of the original four earns US\\$1 more than before, and Nyasha, who would accept exactly US\\$7, earns no rent. Total rent rises from US\\$6 to US\\$10 an hour (4 + 3 + 2 + 1 + 0)." }),
      ],
      explanation: "Transfer earnings US$18; rent US$6; at US$7 rent is US$10." });
  }
  {
    const taxDue = tax.banded(45000, [[20000, 0], [Infinity, 30]]);
    chk(taxDue, 7500, 1e-9);
    b.struct({ d: 4, skill: "ANALYSIS", examStyle: true, hints: ["Tax applies only to earnings above US\\$20,000.", "Compare the after-tax pay with the alternative job."],
      stem: "**A tax on star players (illustrative)**\n\nA fictional footballer in Zandia earns US\\$45,000 a month. Her best alternative job would pay US\\$9,000 a month. The government proposes a 30% tax on monthly earnings above US\\$20,000.",
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "money", value: 45000 - 9000, stem: "Calculate her economic rent before the tax, in US\\$ a month.", wrong: [9000, 45000, 54000], explanation: "45,000 − 9,000 = US\\$36,000." }),
        P.num({ label: "(b)", marks: 2, kind: "money", value: taxDue, stem: "Calculate the tax she would pay each month, in US\\$.", wrong: [13500, 10800, 2500], explanation: "Tax applies to 45,000 − 20,000 = 25,000; 30% of 25,000 = US\\$7,500." }),
        P.num({ label: "(c)", marks: 2, kind: "pct", value: (36000 / 45000) * 100, dp: 0, stem: "What percentage of her earnings is economic rent?", wrong: [20, 25, 36], explanation: "36,000 ÷ 45,000 × 100 = 80%." }),
        P.manual({ label: "(d)", marks: 3, stem: "Explain why she is likely to continue playing after the tax.",
          points: ["After tax she earns 45,000 − 7,500 = US\\$37,500.", "This is far above her best alternative earnings of US\\$9,000.", "So she still gains from playing; the tax removes only part of her rent."],
          modelAnswer: "After the tax she keeps US\\$37,500 a month, which is far more than the US\\$9,000 she could earn in her next best job. She is still much better off playing, so the tax takes only part of her economic rent and does not change her decision." }),
        P.manual({ label: "(e)", marks: 3, stem: "Evaluate whether a tax on economic rent is a good policy.",
          points: ["Advantage: raises revenue with little effect on the supply of the factor.", "Limitation: rent is hard to measure and alternatives such as working abroad may be mobile.", "Judgement: depends on how mobile and how scarce the factor is, and the rate of tax."],
          modelAnswer: "A tax on economic rent raises revenue without much effect on supply, because the factor still earns more than its alternative. But rent is hard to measure, and if the factor can easily move abroad, supply is more elastic than it looks and the tax could drive talent away. The tax is a good policy if the factor is scarce and immobile and the rate is moderate." }),
      ],
      explanation: "Rent US$36,000 (80% of earnings); tax US$7,500; she keeps playing because her after-tax pay is far above her alternative." });
  }

  b.ext({ d: 4, skill: "EVALUATION", marks: 8, hints: ["Use the idea of supply elasticity.", "Reach a judgement."],
    stem: "Assess whether governments should tax economic rent heavily.",
    points: ["Economic rent is a surplus above the minimum needed to keep the factor in use.", "A tax on rent leaves supply almost unchanged, so it raises revenue with little loss of output.", "It can reduce inequality because large rents often go to the highest earners.", "Rent is hard to measure because transfer earnings depend on alternatives.", "If the factor can move abroad the supply is more elastic and the tax can reduce supply.", "A very high tax may reduce effort, enterprise or investment.", "Political and administrative difficulties.", "A justified judgement depending on mobility, rate and scarcity."],
    levels: LV8,
    modelAnswer: "Economic rent is a surplus above what is needed to keep a factor in its use, so a tax on it can raise revenue without much reducing supply, and it can narrow inequality because large rents often go to top earners. However, rent is hard to measure because transfer earnings depend on the best alternative, which may include working abroad. If the factor is mobile, supply is more elastic than it appears and a heavy tax could drive it away. A very high rate may also weaken effort and enterprise. Overall, a moderate tax is justified where the factor is scarce and immobile, such as land or a unique natural resource, but a heavy tax on mobile talent is risky.",
    wordLimit: { min: 100, max: 300 },
    explanation: "Weigh limited supply response against measurement and mobility problems." });

  b.card("DEFINITION", "Define **transfer earnings**.", "The minimum payment needed to keep a factor in its present use: its opportunity cost (the earnings in its next best use).");
  b.card("DEFINITION", "Define **economic rent**.", "The surplus paid to a factor over its transfer earnings: actual payment minus transfer earnings.");
  b.card("FORMULA", "How is economic rent calculated?", "Economic rent = actual earnings − transfer earnings.");
  b.card("CONCEPT", "On a supply and demand diagram, where are rent and transfer earnings?", "Rent: the area above the supply curve and below the price. Transfer earnings: the area under the supply curve up to the quantity.");
  b.card("CONCEPT", "What if supply is **perfectly inelastic**?", "All of the factor's earnings are economic rent (transfer earnings are zero).");
  b.card("CONCEPT", "What if supply is **perfectly elastic**?", "All of the factor's earnings are transfer earnings; there is no economic rent.");
  b.card("DEFINITION", "Define **quasi-rent**.", "A temporary surplus on a factor fixed in the short run (revenue minus variable costs) that disappears in the long run.", "ZIMSEC detail", { applies: ZIM });
  b.card("CONCEPT", "Why may a tax on economic rent not reduce supply?", "The after-tax payment is still above the factor's transfer earnings, so it stays in its use.");
  b.card("CONCEPT", "Why is the rent earned by a top footballer high?", "Scarce talent with no close substitutes gives inelastic supply, while the next best job pays far less.");
});
