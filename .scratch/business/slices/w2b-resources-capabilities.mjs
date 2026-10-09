// W2b: resources and capabilities of an enterprise (BES only).
import { concept, P, money } from "../lib.mjs";

const rentPm = 35, months = 18, buyPrice = 720;
const rentTotal = rentPm * months; // 630
const hpDeposit = 140, hpInst = 55, hpN = 12;
const hpTotal = hpDeposit + hpInst * hpN; // 800

concept("bus.environment.resources-capabilities", { file: "environment/resources-capabilities", keyPrefix: "environment.resources-capabilities" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which of these is a tangible resource?",
    options: [
      ["A borehole", "Correct: it is physical and can be touched."],
      ["The owner's knowledge of farming", "Knowledge is intangible."],
      ["A good reputation with customers", "Reputation is intangible."],
      ["Experience in managing workers", "Experience is intangible."],
    ],
    answer: "A",
    explanation: "**Tangible** resources are physical: land, water, buildings, equipment, stock and money.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which of these is an intangible resource?",
    options: [
      ["Expertise in repairing engines", "Correct: skills and expertise cannot be touched."],
      ["A set of spanners and a car jack", "Tools are tangible."],
      ["A rented workshop", "Premises are tangible."],
      ["Cash in the bank", "Money is a tangible resource."],
    ],
    answer: "A",
    explanation: "**Intangible** resources include knowledge, skills, expertise, reputation and goodwill.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What is a capability of an enterprise?",
    options: [
      ["Its ability to combine resources to do an activity well", "Correct: what the enterprise can do with what it has."],
      ["The total money invested by the owner", "That is capital, a resource."],
      ["The land and buildings on which the business operates", "Land is a resource, not a capability."],
      ["The number of people it employs", "That is a measure of size."],
    ],
    answer: "A",
    explanation: "A **capability** is the ability to use and combine resources effectively, such as producing quality goods on time.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "A tailoring enterprise has skilled tailors, modern sewing machines and reliable fabric suppliers. Which is its capability?",
    options: [
      ["Producing well-fitting school uniforms quickly", "Correct: the result of combining its resources."],
      ["The sewing machines", "Machines are a tangible resource."],
      ["The reliable suppliers of fabric it buys from", "Suppliers are a source of resources, not a capability."],
      ["The tailors' wages", "Wages are a cost."],
    ],
    answer: "A",
    explanation: "Combining skilled staff, machines and good suppliers gives the **capability** to produce uniforms quickly and well.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why should an enterpriser analyse resources before choosing a business opportunity?",
    options: [
      ["To choose an opportunity the available resources and skills suit", "Correct: matching the opportunity to resources reduces risk."],
      ["To avoid having to keep any records", "Records are needed regardless."],
      ["To guarantee that the business makes a profit in its first year", "Analysis reduces risk but cannot guarantee profit."],
      ["To avoid paying tax on the business", "Resource analysis has nothing to do with tax."],
    ],
    answer: "A",
    explanation: "Resource analysis shows what is available and what is missing, so the enterpriser picks an opportunity that fits and plans how to acquire the rest.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Sipho wants to test whether a car-wash business will succeed before investing heavily. Which way of acquiring a water pump best suits him?",
    options: [
      ["Renting the pump", "Correct: low commitment while he tests the market."],
      ["Buying a new pump outright with a large loan", "This commits a lot of money before he knows the business will work."],
      ["Building a factory to make pumps", "This is far beyond what a car wash needs."],
      ["Buying several pumps on hire purchase", "Several pumps commit him to many instalments too early."],
    ],
    answer: "A",
    hints: ["Which option commits the least money if the idea fails?"],
    explanation: "**Renting** suits an enterprise testing a market: low cost and no long-term commitment.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "Farai has land with a borehole; Chipo has horticulture skills. Which method lets them combine these resources in one enterprise?",
    options: [
      ["Forming a partnership", "Correct: partners pool resources and skills."],
      ["Hire purchase", "Hire purchase is a way of buying equipment."],
      ["Renting a market stall", "This gives a selling place, not combined resources."],
      ["Inheriting land", "Farai already has the land."],
    ],
    answer: "A",
    explanation: "A **partnership** lets people combine tangible and intangible resources.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which practice is an example of the sustainable use of resources by a timber enterprise?",
    options: [
      ["Planting new trees to replace those it cuts", "Correct: the forest is kept for the future."],
      ["Cutting trees faster to meet higher demand", "This uses up the forest."],
      ["Burning off-cuts in the open", "This wastes resources and pollutes."],
      ["Moving to a new forest when one is cleared", "This destroys forests one after another."],
    ],
    answer: "A",
    hints: ["Sustainable means the resource will still be there in the future."],
    explanation: "**Sustainable use** meets today's needs without destroying resources for the future: replanting keeps the forest productive.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "A good reputation is an intangible resource.",
    answer: true,
    explanation: "True. Reputation cannot be touched but helps the enterprise win and keep customers.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "An enterprise with many resources will always have strong capabilities.",
    answer: false,
    explanation: "False. Capabilities depend on how well resources are combined and used; idle or badly managed resources create no capability.",
  });
  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each way of acquiring a resource with its description.",
    pairs: [
      ["Hire purchase", "Deposit and instalments; owned after the last payment"],
      ["Leasing", "Regular payments to use an asset owned by someone else"],
      ["Partnership", "Combining resources with other people"],
      ["Training", "Developing skills and knowledge"],
    ],
    explanation: "Each method suits different situations and budgets.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentences.",
    template: "Land, buildings and machinery are {{blank:a}} resources. Skills and reputation are {{blank:b}} resources.",
    blanks: [
      { id: "a", accepted: ["tangible"], choices: ["tangible", "intangible"] },
      { id: "b", accepted: ["intangible"], choices: ["intangible", "tangible"] },
    ],
    explanation: "Physical resources are **tangible**; non-physical ones are **intangible**.",
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: true,
    stem: `Rudo can rent a grinding mill for ${money(rentPm)} a month, or buy one for ${money(buyPrice)}. She expects to use it for ${months} months. Calculate the total cost of renting for this period.`,
    kind: "money", value: rentTotal, wrong: [buyPrice, rentPm + months],
    explanation: `Renting: ${months} × ${money(rentPm)} = ${money(rentTotal)}, which is ${money(buyPrice - rentTotal)} less than buying for this period; but if she uses it for longer, buying becomes cheaper and she would own the mill.`,
  });
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `A welder can buy a welding machine on hire purchase with a deposit of ${money(hpDeposit)} and ${hpN} monthly instalments of ${money(hpInst)}. Calculate the total hire purchase price.`,
    kind: "money", value: hpTotal, wrong: [hpInst * hpN, hpDeposit + hpInst],
    hints: ["Total = deposit + (number of instalments × instalment)."],
    explanation: `Total = ${money(hpDeposit)} + ${hpN} × ${money(hpInst)} = ${money(hpDeposit)} + ${money(hpInst * hpN)} = ${money(hpTotal)}.`,
  });
  b.manualShort({
    d: 3, marks: 4, skill: "UNDERSTANDING",
    stem: "Explain **two** reasons why an enterprise should analyse its resources and capabilities.",
    points: [
      "Identify what is available and what is missing.",
      "So it can plan how to acquire missing resources / estimate finance needed.",
      "Choose suitable opportunities / use resources efficiently / persuade lenders / SWOT.",
      "Explains the second reason.",
    ],
    hints: ["Think about planning and choosing what to do."],
    modelAnswer: "Analysis shows what the enterprise already has and what it lacks, so it can plan how to obtain the missing resources and how much finance it needs. It also helps the enterprise choose activities that its resources and skills suit, so it is more likely to succeed.",
    explanation: "Reasons: identify gaps, choose opportunities, plan acquisition, use resources efficiently, support a business plan.",
  });
  b.manualShort({
    d: 3, marks: 4, skill: "APPLICATION",
    stem: "Suggest **two** ways a market gardener can use land and water sustainably. Explain each.",
    points: [
      "Drip irrigation / careful watering.",
      "Saves water so the borehole or river does not run dry.",
      "Crop rotation / contour ridges / composting / avoid polluting water.",
      "Explains how it protects the resource for the future.",
    ],
    hints: ["Think about saving water and protecting soil."],
    modelAnswer: "Drip irrigation delivers water to the roots, so less water is wasted and the borehole does not run dry. Crop rotation and contour ridges keep the soil fertile and stop it being washed away, so the land stays productive for future seasons.",
    explanation: "Sustainable use protects the resources the enterprise depends on.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, calculator: true, secs: 900,
    stem: `Tatenda plans to start a bakery in a growth point near Masvingo. He has completed a baking course and worked in a bakery for four years. He has ${money(1500)} in savings and his family will let him use a small building free of charge. He needs an oven, which costs ${money(2600)} to buy or can be leased for ${money(95)} a month.`,
    parts: [
      P.manual({
        label: "(a)", marks: 4,
        stem: "Identify **two** tangible and **two** intangible resources Tatenda has.",
        points: ["Tangible: savings / money.", "Tangible: the building.", "Intangible: baking skills / knowledge from the course.", "Intangible: four years' experience."],
        modelAnswer: "Tangible: his savings and the family building. Intangible: his baking skills from the course and his four years' experience in a bakery.",
      }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate how much more money Tatenda needs to buy the oven, using all his savings.", kind: "money", value: 2600 - 1500, wrong: [2600] }),
      P.manual({
        label: "(c)", marks: 6,
        stem: "Should Tatenda buy the oven with a loan or lease it? Justify your answer.",
        points: [
          "Buying: he owns the oven; no monthly rent in the long run.",
          "Buying: needs a loan with interest and repayments; uses all his savings, leaving nothing for flour and other costs.",
          "Leasing: low starting cost; keeps savings for stock and running costs.",
          "Leasing: monthly payments continue; may cost more over several years; he does not own it.",
          "Uses figures, e.g. lease payments over a period compared with the price.",
          "Justified recommendation.",
        ],
        modelAnswer: `Buying means Tatenda owns the oven and avoids monthly lease payments, but he would need a loan of ${money(2600 - 1500)} and would use all his savings, leaving nothing to buy flour, fuel and packaging. Leasing costs ${money(95)} a month, so over two years he would pay ${money(95 * 24)}, which is less than the price, though over a longer period buying would work out cheaper. As a new business, he should lease the oven, keep his savings for running costs, and buy an oven later once the bakery has proved it can make a profit.`,
      }),
    ],
    hints: ["(b) Price of oven − savings.", "(c) What else will his savings be needed for?"],
    explanation: `(a) Tangible: savings, building; intangible: skills, experience. (b) ${money(2600)} − ${money(1500)} = ${money(2600 - 1500)}. (c) A justified choice; leasing protects his cash at the start.`,
    workedSolution: `1. Shortfall = 2,600 − 1,500 = 1,100.\n2. Lease over two years = 24 × 95 = ${(95 * 24).toLocaleString("en-GB")}.`,
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, secs: 900,
    stem: "A village co-operative near Chinhoyi owns a small dam and communal land. Members want to start either a fish-farming project or a vegetable-growing project. Several members have grown vegetables for years; none has kept fish. A non-governmental organisation offers free training in fish farming.",
    parts: [
      P.manual({
        label: "(a)", marks: 4,
        stem: "Explain **two** ways the co-operative's resources and capabilities affect its choice of project.",
        points: [
          "Tangible: the dam provides water for either project.",
          "Explains: both projects need a reliable water supply.",
          "Intangible: members' vegetable-growing experience.",
          "Explains: they already have the capability for vegetables but not for fish.",
        ],
        modelAnswer: "The dam is a tangible resource that gives water for both fish and vegetables, so either project is possible. The members' experience in growing vegetables is an intangible resource: they already have the capability to grow vegetables well, but they have no skills in fish farming.",
      }),
      P.manual({
        label: "(b)", marks: 6,
        stem: "Which project should the co-operative choose? Justify your answer.",
        points: [
          "Vegetables: uses existing skills, lower risk, quicker returns.",
          "Vegetables: may face competition from many other growers.",
          "Fish: free training can build the missing capability; less local competition.",
          "Fish: risk of failure while learning; equipment and feed costs.",
          "Sustainability: protecting the dam's water quality in either project.",
          "Justified recommendation.",
        ],
        modelAnswer: "Vegetable growing uses the members' existing capability, so it is lower risk and can earn income in a few months, though many local farmers already grow vegetables. Fish farming could face less competition, and the free training would build the missing skills, but mistakes while learning could be costly. The co-operative should start with vegetables to earn income at once, while some members take the free training; once they have the skills, they can add fish farming, using the dam sustainably for both.",
      }),
    ],
    hints: ["(b) Which project matches what the members can already do well?"],
    explanation: "Resources and capabilities should guide the choice of project; missing capabilities can be acquired through training.",
  });
  b.card("DEFINITION", "**Tangible resources**?", "Physical resources: land, water, forests, buildings, machinery, vehicles, stock, money.");
  b.card("DEFINITION", "**Intangible resources**?", "Non-physical resources: knowledge, skills, expertise, experience, reputation, goodwill, contacts.");
  b.card("DEFINITION", "What is a **capability**?", "The ability of an enterprise to combine and use its resources to do an activity well.");
  b.card("CONCEPT", "Why analyse resources and capabilities?", "Identify gaps, choose suitable opportunities, plan acquisition, use resources efficiently, support a business plan, persuade lenders.");
  b.card("FACT", "Ways of acquiring resources?", "Buying, renting/leasing, hire purchase, loans, partnership or joint venture, inheritance, government allocation, training.");
  b.card("FACT", "Forms of ownership of resources?", "Individual, joint (partners, co-operatives), communal, state.");
  b.card("DEFINITION", "**Sustainable use** of resources?", "Meeting today's needs without destroying resources for the future (e.g. replanting, saving water).");
  b.card("CONCEPT", "Resource or capability: a sewing machine?", "Resource. Producing well-fitting uniforms on time is the capability.");
});
