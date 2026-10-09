// W3b: location and relocation (BES, CAM).
import { concept, P, CAM, BES, money, table, check } from "../lib.mjs";

// Site comparison (question figures).
const siteRows = [["Rent", 900, 450], ["Transport of raw materials", 300, 750], ["Wages", 1400, 1250]];
const tA = siteRows.reduce((s, r) => s + r[1], 0); // 2600
const tB = siteRows.reduce((s, r) => s + r[2], 0); // 2450
check("tA", tA, 2600);
check("tB", tB, 2450);
const siteTbl = table(["Monthly cost US\\$", "Site X (Gweru)", "Site Y (Kwekwe)"], [...siteRows, ["Total", tA, tB]]);
// Relocation saving.
const oldRent = 3500, newRent = 2100, extraTrans = 650, moveCost = 9000;
const netMonthly = oldRent - newRent - extraTrans; // 750
const months = moveCost / netMonthly; // 12
// Simple annual.
const monthlyDiff = 320;

concept("bus.operations.location", { file: "operations/location", keyPrefix: "operations.location" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is relocation?",
    options: [
      ["Moving a business from one location to another", "Correct."],
      ["Opening a new business for the very first time", "That is starting a business."],
      ["Closing a business permanently", "That is closure."],
      ["Selling a business to a new owner", "That is a change of ownership."],
    ],
    answer: "A",
    explanation: "**Relocation** means moving all or part of a business to a new site.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why is a sugar mill usually located close to the sugar-cane fields?",
    options: [
      ["Cane is bulky and heavy, so transporting it far is costly", "Correct: sugar milling is bulk-reducing."],
      ["Customers buy sugar at the mill gate", "Most sugar is sold through distributors and shops."],
      ["Sugar is more fragile than cane", "Sugar is easier to transport than cane."],
      ["Mills need to be in city centres to attract passing footfall", "Footfall matters for retailers, not mills."],
    ],
    answer: "A",
    explanation: "In a **bulk-reducing** industry, raw materials are heavier than the product, so the business locates near them.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "A soft-drinks bottling plant is usually located near its market. Why?",
    options: [
      ["The finished drinks are heavier and bulkier than the raw materials", "Correct: a bulk-increasing industry."],
      ["Water for the drinks is only available in large cities", "Water is available in many places."],
      ["Bottling needs no workers", "Bottling plants employ workers."],
      ["Customers must visit the factory itself to buy their drinks", "Drinks are distributed to shops."],
    ],
    answer: "A",
    explanation: "Adding water and bottles makes the product heavier and bulkier, so it is cheaper to make it near customers.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which factor is usually most important for the location of a retail clothing shop?",
    options: [
      ["Being where many customers pass", "Correct: shops depend on footfall."],
      ["Being close to cotton farms", "Raw materials matter little to a retailer."],
      ["Having a large supply of water", "Water is not a key need for a shop."],
      ["Being far away from all competitors", "Clothing shops often cluster so customers can compare."],
    ],
    answer: "A",
    explanation: "Service businesses such as shops locate where customers are: high footfall.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A mining company closes its offices in a small town after the mine's ore runs out. What is the main reason for this relocation?",
    options: [
      ["Raw materials have been exhausted", "Correct: depletion of raw materials."],
      ["The government has offered incentives in the town", "Incentives would encourage staying."],
      ["The market for the ore has grown", "Growth would not cause closure."],
      ["Wages in the town have fallen", "Lower wages would not cause closure."],
    ],
    answer: "A",
    hints: ["What does a mine depend on?"],
    explanation: "Businesses relocate when raw materials run out, markets change, costs rise, disasters strike or government policy changes.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS", applies: CAM,
    stem: "Why might a manufacturer choose to build a factory inside a trading bloc rather than export to it?",
    options: [
      ["To avoid tariffs on goods sold within the bloc", "Correct: producing inside avoids import duties."],
      ["Because exchange rates do not exist inside a bloc", "Currencies may still differ."],
      ["Because wages are always lower inside trading blocs", "Wages vary; this is not always true."],
      ["To avoid paying any taxes at all", "Factories inside the bloc still pay taxes."],
    ],
    answer: "A",
    hints: ["Think about import duties."],
    explanation: "Locating inside a trading bloc lets a firm sell to member countries without tariffs and closer to customers.",
  });
  b.mcq({
    d: 3, skill: "EVALUATION",
    stem: "A bakery is choosing between a cheap site far from town and an expensive site in a busy shopping centre. Which is the best basis for the decision?",
    options: [
      ["Compare expected extra revenue at the busy site with its extra costs", "Correct: profit, not cost alone, decides."],
      ["Always choose the cheapest site", "A cheap site may have few customers."],
      ["Always choose the busiest site", "The extra rent may exceed the extra sales."],
      ["Choose whichever site is nearest the owner's home, to save travelling time", "Convenience alone ignores costs and sales."],
    ],
    answer: "A",
    hints: ["What matters: costs, revenue, or both?"],
    explanation: "Weigh extra revenue from customers against extra costs, then consider qualitative factors.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Government incentives such as tax relief can influence where a business locates.",
    answer: true,
    explanation: "True. Governments may encourage firms to locate in certain areas.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Moving to a site with lower rent always increases a business's profit.",
    answer: false,
    explanation: "False. The new site may have higher transport costs, fewer customers or one-off moving costs.",
  });
  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each business with the factor most important to its location.",
    pairs: [
      ["A sawmill", "Nearness to forests (raw materials)"],
      ["A fast-food outlet", "Many customers passing (footfall)"],
      ["A large steel works", "Reliable power and transport for heavy goods"],
      ["An online clothing business", "Good internet connection and delivery links"],
    ],
    explanation: "Each business type has a dominant location factor.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentences.",
    template: "An industry whose raw materials are heavier than its products is a bulk-{{blank:a}} industry and usually locates near its raw materials. An industry whose products are bulkier than its raw materials locates near its {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["reducing"], choices: ["reducing", "increasing"] },
      { id: "b", accepted: ["market", "markets", "customers"], wrong: "suppliers" },
    ],
    explanation: "Bulk-reducing → near raw materials; bulk-increasing → near the market.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "State the term for the number of people who pass or enter a shop's location.",
    accepted: ["footfall", "foot fall", "foot traffic"],
    wrong: ["market share"],
    explanation: "**Footfall** is vital for retail and service locations.",
  });
  b.num({
    d: 2, skill: "APPLICATION", calculator: true,
    stem: `Site P is ${money(monthlyDiff)} a month cheaper to run than Site Q. Calculate the saving over a year.`,
    kind: "money", value: monthlyDiff * 12, wrong: [monthlyDiff, monthlyDiff * 52],
    explanation: `${money(monthlyDiff)} × 12 = ${money(monthlyDiff * 12)}.`,
  });
  b.calc({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: `A printing firm pays rent of ${money(oldRent)} a month in Harare. A site in Norton would cost ${money(newRent)} a month, but delivery costs would rise by ${money(extraTrans)} a month. Moving would cost ${money(moveCost)}. Calculate how many months it would take for the net savings to cover the cost of moving.`,
    kind: "plain", value: months, wrong: [moveCost / (oldRent - newRent), moveCost / oldRent],
    hints: ["Find the net saving each month first."],
    explanation: `Net saving = ${money(oldRent)} − ${money(newRent)} − ${money(extraTrans)} = ${money(netMonthly)} a month. ${money(moveCost)} ÷ ${money(netMonthly)} = ${months} months.`,
    workedSolution: `1. Rent saving = ${oldRent} − ${newRent} = ${oldRent - newRent}.\n2. Net saving = ${oldRent - newRent} − ${extraTrans} = ${netMonthly} a month.\n3. Months to cover moving cost = ${moveCost} ÷ ${netMonthly} = ${months}.`,
  });
  b.manualShort({
    d: 3, marks: 4, skill: "ANALYSIS",
    stem: "Explain **two** reasons why a business might relocate.",
    points: [
      "Reason 1, e.g. raw materials exhausted / market moved or declined.",
      "Explained: costs rise or sales fall at the old site.",
      "Reason 2, e.g. rising rent or costs / natural disaster / government policy / need to expand.",
      "Explained: new site cheaper, safer, has incentives or more space.",
    ],
    hints: ["Think about raw materials, customers, costs and space."],
    modelAnswer: "A business may relocate because its customers have moved, for example to new suburbs, so sales at the old site fall. It may also relocate because the old site is too small to expand, while a new site offers space for more machines.",
    explanation: "Relocation reasons: raw materials, markets, costs, disasters, government policy, expansion.",
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 840, calculator: true,
    stem: `Tendai's company makes cement blocks and wants to open a second plant. It needs sand and cement (heavy inputs) and sells mainly to builders in growing towns. Two sites are being considered.\n\n${siteTbl}\n\nSite X is in an industrial area close to a large new housing project. Site Y is close to a sand quarry but 60 km from most customers.`,
    parts: [
      P.num({
        label: "(a)", marks: 2, stem: "Calculate the difference in total monthly costs between the two sites.",
        kind: "money", value: tA - tB, wrong: [siteRows[0][1] - siteRows[0][2], tA],
        explanation: `${money(tA)} − ${money(tB)} = ${money(tA - tB)} (Site Y is cheaper).`,
      }),
      P.manual({
        label: "(b)", marks: 4, stem: "Explain **two** factors, other than the costs in the table, that Tendai should consider.",
        points: ["Factor 1, e.g. distance to customers / cost of delivering heavy blocks to builders.", "Explained: blocks are heavy, so delivery costs and time matter (not in table).", "Factor 2, e.g. availability of skilled labour / power and water / security / room to expand.", "Explained and applied to a block-making plant."],
      }),
      P.manual({
        label: "(c)", marks: 6, stem: "Recommend which site Tendai should choose. Justify your answer.",
        points: [`Uses data: Site Y cheaper by ${money(tA - tB)} a month.`, "Site Y: near sand (heavy input), lower rent and wages.", "Site X: near the housing project, so delivery of heavy blocks cheaper and faster, more sales.", "Recognises that both the inputs and the blocks are heavy, so nearness to customers matters as much as nearness to sand.", "Considers missing data, e.g. delivery costs to customers not in the table.", "Justified recommendation."],
        modelAnswer: `Site Y is cheaper by ${money(tA - tB)} a month and is close to the sand quarry. However, the table does not include the cost of delivering heavy blocks to customers 60 km away, which could easily exceed that saving, and being near the housing project at Site X brings more orders and faster service. Since blocks are as heavy as the sand and cement used, and builders want quick delivery, Tendai should choose Site X, unless delivery from Site Y can be shown to cost less than about ${money(tA - tB)} a month.`,
      }),
    ],
    hints: ["(a) Subtract the two totals.", "(c) What costs are missing from the table?"],
    explanation: `(a) ${money(tA - tB)}. (b) Delivery to customers, labour, power, security, space. (c) A justified choice; Site X likely because of nearness to customers.`,
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, secs: 840, applies: BES,
    stem: "Rudo runs a dressmaking enterprise from a room at her home in a residential suburb of Masvingo. Orders have grown and she now employs three machinists. The local council has warned her that the noise and customers' cars are against suburb rules. She can rent a small shop in the town centre near the bus terminus or a unit in the light industrial area.",
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "Identify **two** reasons why Rudo needs to relocate.", points: ["Council rules / government policy (noise, residential area).", "Growth: business has outgrown the home room / needs space for staff."] }),
      P.manual({
        label: "(b)", marks: 4, stem: "Explain **two** advantages of the town-centre shop for Rudo's enterprise.",
        points: ["Near the bus terminus: high footfall.", "So more walk-in customers / new orders.", "Easy for customers and staff to reach by public transport.", "So more convenient fittings and collections; may attract staff."],
      }),
      P.manual({
        label: "(c)", marks: 6, stem: "Evaluate which site Rudo should choose.",
        points: ["Town centre: footfall, visibility, access; but higher rent, possibly smaller space.", "Industrial unit: cheaper, more space for machines, noise acceptable; but few passing customers.", "Nature of business: dressmaking needs fittings and walk-in orders.", "Costs vs extra revenue.", "Other factors: security, power supply, parking.", "Justified recommendation."],
        modelAnswer: "The town-centre shop near the bus terminus would bring many passing customers and is easy to reach for fittings, but rent is higher and space may be tight for three machinists. The industrial unit is cheaper and roomier, and noise is acceptable there, but few customers pass by. Because dressmaking depends on customers coming in for fittings and new orders, the town-centre shop is likely to earn enough extra revenue to cover the higher rent, so Rudo should choose it, provided it has space for her machines and a reliable power supply.",
      }),
    ],
    hints: ["(a) Look at the council warning and the growth.", "(c) Dressmaking customers need to visit."],
    explanation: "Relocation driven by regulation and growth; a service-type business usually benefits from footfall.",
  });
  b.card("DEFINITION", "Relocation?", "Moving all or part of a business from one location to another.");
  b.card("FACT", "Location factors for manufacturing?", "Raw materials, market, transport, labour, power and water, land, government policy, related firms, climate.");
  b.card("CONCEPT", "Location factors for services?", "Nearness to customers and footfall, rent, competitors, convenience, security and access; online firms need internet.");
  b.card("CONCEPT", "Bulk-reducing vs bulk-increasing?", "Bulk-reducing (sugar milling, ore processing): near raw materials. Bulk-increasing (drinks, furniture): near the market.");
  b.card("CONCEPT", "Why businesses relocate?", "Raw materials exhausted, market declines or moves, rising costs, natural disasters, government policy, need to expand.");
  b.card("CONCEPT", "Choosing a country to operate in?", "Costs, markets and trading blocs, government and stability, skills and infrastructure, currency, laws and culture.", "Cambridge 0264.", { applies: CAM });
  b.card("CONCEPT", "Costs of relocating?", "Moving equipment, lost production, staff payments or loss of skilled staff, lost customers.");
  b.card("CONCEPT", "How to recommend a site?", "Compare costs and expected revenue using the data, add qualitative factors, then justify a choice.");
});
