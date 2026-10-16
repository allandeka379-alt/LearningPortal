// W1a: enterprise.resources-capabilities (ZIMSEC Business Enterprise Skills only; tagged automatically)
import { concept, P, table, sum, r2, money, chk } from "../lib.mjs";
import { mc } from "../tables/w1a-lib.mjs";

const buy = (price, upkeep, n) => price + upkeep * n;
concept("abus.enterprise.resources-capabilities", { file: "enterprise/resources-capabilities", keyPrefix: "enterprise.resources-capabilities" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which of the following is an **intangible** resource of an enterprise?",
    ok: ["Its registered brand name", "Correct: a brand is valuable but has no physical form."],
    bad: [["Its delivery van", "A van is a physical, tangible asset."], ["Its stock of finished goods", "Stock is a physical, tangible asset."], ["Its rented workshop building", "A building is a physical, tangible resource."]],
    explanation: "Brand names, skills, licences and goodwill are intangible; machines, buildings and stock are tangible.",
  });
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "What is a **capability** of an enterprise?",
    ok: ["What it can do well with all of the resources it has", "Correct: capability is an ability, such as fast delivery or reliable quality."],
    bad: [["A machine that it owns outright and uses daily", "Machines are resources, not abilities."], ["The money it has borrowed from a local bank", "Loans are finance, not abilities."], ["The land on which its premises now stand", "Land is a resource."]],
    explanation: "A capability is an ability that arises when resources are used well together.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which method of acquiring a machine is **most suitable** for an enterprise that needs it for only a few days each year?",
    ok: ["Hiring it only on the days it is needed", "Correct: hire avoids paying a large price for an asset used rarely."],
    bad: [["Buying it for cash straight away", "Buying ties up capital in an asset that is mostly idle."], ["Building a new one in its own workshop", "Building is costly and slow for rare use."], ["Paying for it to be operated for the full year", "A full year of operation is not needed for a few days' work."]],
    explanation: "For occasional use, hire is normally cheaper than buying.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "In a build-own-transfer arrangement, what happens at the end of the agreed period?",
    ok: ["Ownership of the facility passes to the client", "Correct: the developer transfers the facility once it has earned its return."],
    bad: [["The developer keeps the facility for ever", "That would not be a transfer arrangement."], ["The facility is demolished at the client's expense", "Demolition is not part of the arrangement."], ["The client must start paying the developer rent again", "The transfer ends the developer's rights to ownership."]],
    explanation: "The developer builds and owns the facility for a period, then transfers it.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A fictional bakery in Harare keeps its oven clean, services it regularly and shares a van with a neighbouring shop on days when its own van is not needed. Which feature of efficient use of resources does the sharing show?",
    ok: ["Sharing idle equipment", "Correct: sharing lets both enterprises use an asset more fully."],
    bad: [["Maintaining equipment to prolong its life", "Servicing the oven shows maintenance, not sharing."], ["Recycling waste packaging for reuse", "Nothing in the case concerns recycling."], ["Producing more than customers demand", "Overproduction is waste, not efficiency."]],
    hints: ["Which action is about using one asset for two businesses?"],
    explanation: "Sharing the van between two shops avoids idle time and unnecessary cost.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A fictional timber merchant in Mutare cuts only as many trees as she replants each year. This is an example of",
    ok: ["sustainable use of a resource", "Correct: resources are used no faster than they renew."],
    bad: [["a build-own-transfer agreement", "No facility is built and transferred."], ["hiring a tangible asset", "She is not hiring anything."], ["a core competence in finance", "The case concerns resource use, not a financial skill."]],
    hints: ["Think about whether the resource will last."],
    explanation: "Replanting as much as is cut allows the enterprise to carry on for the long term.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "Why can a capability give an enterprise a longer-lasting advantage than a tangible resource?",
    ok: ["Rivals can buy machines but not copy skill quickly", "Correct: capabilities are built over time and are hard to imitate."],
    bad: [["Capabilities can be bought in a day from any supplier", "Capabilities cannot simply be bought."], ["Tangible resources are never needed in business", "Enterprises need both resources and capabilities."], ["Capabilities do not depend on people or experience", "They arise from people's skills and experience."]],
    hints: ["Which of the two can a rival acquire quickly with money?"],
    explanation: "A rival can buy equipment, but trust and skill take time to build.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "A fictional contractor in Bulawayo is offered a BOOT agreement to build and operate a small solar plant for 15 years before handing it over. Which is the strongest argument **for** accepting?",
    ok: ["The client need not find all of the funds at once", "Correct: the developer funds construction and is repaid from the income over the period."],
    bad: [["The developer keeps all the profit for ever after", "Ownership transfers at the end."], ["There is no risk for the developer at all here", "The developer bears construction and operating risk."], ["The agreement never needs any written contract", "Such projects need detailed contracts."]],
    hints: ["Who pays for the construction?"],
    explanation: "The client avoids a large initial outlay because the developer finances the project.",
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A skilled workforce is an example of an intangible resource.",
    answer: true,
    explanation: "True. Skills have no physical form but are valuable resources of an enterprise.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Hiring an asset is always cheaper than buying it, whatever the length of use.",
    answer: false,
    explanation: "False. Hire is cheaper for short use, but after a number of years the total hire fees exceed the cost of buying.",
  });

  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each method of acquiring resources to its description.",
    pairs: [["Hire", "Pay a fee to use an asset for a limited period"], ["Purchase", "Pay the full price and own the asset"], ["Build-own-transfer", "A developer builds and owns a facility for an agreed period, then hands it over"], ["Build-own-operate-transfer", "A developer builds, owns and runs a facility during the agreed period, then hands it over"]],
    explanation: "Each method differs in who pays, who owns and who operates.",
  });

  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct word for each gap.",
    template: "A machine is a {{blank:a}} resource, whereas a reputation for quality is an {{blank:b}} resource.",
    blanks: [
      { id: "a", accepted: ["tangible"], choices: ["tangible", "intangible"] },
      { id: "b", accepted: ["intangible"], choices: ["tangible", "intangible"] },
    ],
    explanation: "Tangible resources are physical; intangible ones are not.",
  });

  const price = 4800, up = 200, hr = 1000;
  const be = price / (hr - up);
  chk(be, 6);
  b.num({
    d: 3, skill: "APPLICATION", kind: "years", dp: 1, value: be, calculator: true, wrong: [r2(price / hr), r2(price / (hr + up))],
    stem: "A fictional sewing business in Masvingo can buy a machine for US\\$4,800 with upkeep of US\\$200 a year, or hire an equivalent one for US\\$1,000 a year. After how many years of use does buying become cheaper than hiring? Give your answer in years to one decimal place.",
    hints: ["Set price + upkeep × n equal to hire × n."],
    explanation: "Buying costs 4,800 + 200n; hiring costs 1,000n. They are equal when 4,800 = 800n, so n = 6.0 years. After six years buying is cheaper. Using price ÷ hire gives 4.8 and ignores upkeep.",
  });
  const p2 = 3600, u2 = 150, h2 = 750;
  chk(h2 * 8 - buy(p2, u2, 8), 1200);
  b.num({
    d: 3, skill: "APPLICATION", kind: "money", value: h2 * 8 - buy(p2, u2, 8), calculator: true, wrong: [buy(p2, u2, 8), h2 * 8],
    stem: "A fictional welder in Bulawayo can buy a cutting machine for US\\$3,600 with upkeep of US\\$150 a year, or hire one for US\\$750 a year. Calculate how much would be saved over eight years by buying instead of hiring.",
    hints: ["Find the total cost of each method over eight years."],
    explanation: "Buying: 3,600 + 150 × 8 = 4,800. Hiring: 750 × 8 = 6,000. Saving = 6,000 − 4,800 = US\\$1,200.",
  });

  b.short({
    d: 2, skill: "RECALL",
    stem: "State **one** example of a tangible resource.",
    accepted: ["machine", "machinery", "building", "land", "vehicle", "stock", "equipment", "tools", "van", "premises", "inventory", "raw materials", "truck", "computer"],
    explanation: "Tangible resources are physical, such as land, buildings, machines, vehicles and stock.",
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why an enterprise needs both resources and capabilities.",
    points: ["Resources alone (machines, stock) produce nothing unless they are used skilfully", "Capabilities need resources to work on", "Together they allow the enterprise to produce goods that are of value to customers"],
    modelAnswer: "Machines and materials are idle unless people use them skilfully, so resources need capabilities. Equally, skills and know-how cannot produce goods without something to work on. Together they allow the enterprise to make products customers value.",
    hints: ["Think about what happens if one is missing."],
    explanation: "One point per mark.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "Tendai, a fictional builder in Gweru, needs a cement mixer for three weeks each year. Explain **two** reasons why hiring is more suitable for him than buying.",
    points: ["Hire is cheaper than buying for rare use", "Application: he would pay only for three weeks, not the whole price of the mixer", "Buying would tie up capital he could use for materials", "Application: the mixer would sit idle for most of the year, needing storage and upkeep"],
    modelAnswer: "Hire is cheaper for such short use, since he pays only for the three weeks needed rather than the whole price of a mixer. Buying would also tie up capital that he needs for cement and sand, and the mixer would stand idle for most of the year while still needing storage and upkeep.",
    hints: ["Link each reason to the three weeks of use."],
    explanation: "Two reasons, each developed.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Analyse how an enterprise's core competence in quality could help it to enter a new market.",
    points: ["A core competence is valued by customers and hard to copy", "The same skill can be applied to a new product", "Customers already trust the quality, so the new product is more likely to be accepted", "Lower marketing and learning costs compared with a new firm"],
    modelAnswer: "A core competence is a skill that customers value and rivals find hard to copy. The enterprise can apply it to a new product, and because customers already trust its quality they are more likely to try the new product. This lowers the cost of building a reputation compared with a new entrant.",
    hints: ["Follow the chain from competence to customer trust."],
    explanation: "A chain of cause and effect.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Outline **three** ways in which an enterprise can use its resources efficiently.",
    points: ["Avoid waste, for example by planning quantities", "Maintain machines and vehicles regularly", "Share or reuse equipment and materials"],
    modelAnswer: "It can avoid waste by planning quantities carefully, maintain machines so that they last, and share or reuse equipment and materials instead of buying new ones.",
    hints: ["Think of waste, maintenance and sharing."],
    explanation: "Any three correct ways.",
  });

  b.struct({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "A fictional enterprise: Chipo runs a small printing business in Mutare. She needs a printing press. She can buy it for US\\$7,500 with upkeep of US\\$250 a year, or hire an equivalent press for US\\$1,350 a year. She expects to need it for seven years.",
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: buy(7500, 250, 7), stem: "Calculate the total cost of buying the press and maintaining it for seven years.", wrong: [7500, 250 * 7], explanation: "7,500 + 250 × 7 = 7,500 + 1,750 = US\\$9,250." }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: 1350 * 7, stem: "Calculate the total cost of hiring the press for seven years.", wrong: [1350, 1350 * 6], explanation: "1,350 × 7 = US\\$9,450." }),
      P.manual({ label: "(c)", marks: 3, stem: "Advise Chipo whether to buy or hire, giving **one** reason.", points: ["Buying is slightly cheaper over seven years (9,250 against 9,450)", "Buying also gives her a press she owns afterwards", "But the difference is only US\\$200, so hire may be better if she lacks the capital or her demand is uncertain"], modelAnswer: "Buying costs US\\$9,250 against US\\$9,450 for hire, so it is US\\$200 cheaper over seven years and she would own the press. But the saving is small, so if she lacks capital or is unsure of demand, hiring is safer.", explanation: "Uses the figures to give a conditional recommendation." }),
    ],
    hints: ["Add the upkeep for each of the seven years."],
    explanation: "Buying US\\$9,250, hiring US\\$9,450.",
  });
  b.struct({
    d: 4, skill: "EVALUATION",
    stem: "A fictional enterprise: Farai's Fresh Foods in Harare supplies packed vegetables to hotels. The business owns a cold room and two vans. Its main advantage over rivals is that its staff pack vegetables to a standard the hotels trust and deliver before 6 a.m. A rival wants to copy it by buying more vans.",
    parts: [
      P.manual({ label: "(a)", marks: 3, stem: "Distinguish between a resource and a capability, using Farai's Fresh Foods as an example.", points: ["A resource is something the enterprise owns or controls, e.g. the cold room or vans", "A capability is what it can do with its resources, e.g. packing to a trusted standard and delivering before 6 a.m.", "Capabilities arise from using resources and skills well together"], modelAnswer: "A resource is something owned, such as the cold room and vans. A capability is what the enterprise can do with them, such as packing to a trusted standard and delivering before 6 a.m.", explanation: "Definitions with examples from the case." }),
      P.manual({ label: "(b)", marks: 6, stem: "Evaluate whether the rival can win Farai's customers simply by buying more vans.", points: ["Vans are tangible resources that can be copied", "The hotels trust Farai's packing standard and early delivery, which are capabilities", "Capabilities take time and training to build", "The rival may win some customers by offering lower prices or more flexible delivery", "Hotels may take a risk on a new supplier if the price is much lower", "Judgement and reason"], modelAnswer: "Vans can be bought by anyone, so they give little lasting advantage. Hotels value Farai's packing standard and early delivery, which come from skills and routines built over time. The rival could win some customers with lower prices, but hotels may stay with a supplier they trust. On balance, buying vans alone is unlikely to win the customers quickly; the rival would need to build similar capabilities as well.", hints: ["Compare what can be bought with what has to be built."], explanation: "Both sides and a reasoned conclusion." }),
    ],
    hints: ["Which of Farai's strengths can be bought?"],
    explanation: "Resources can be copied quickly; capabilities cannot.",
  });

  b.card("DEFINITION", "Resource", "Anything an enterprise owns or controls and uses to produce goods and services; tangible (physical) or intangible (not physical).");
  b.card("DEFINITION", "Capability", "What an enterprise can do by combining and using its resources well, e.g. fast delivery or reliable quality.");
  b.card("DEFINITION", "Core competence", "A skill or strength that customers value, rivals find hard to copy, and that can be used in more than one product or market.");
  b.card("FACT", "Tangible and intangible resources", "Tangible: land, buildings, machines, stock. Intangible: brand, skills, licences, goodwill.");
  b.card("CONCEPT", "Hire or purchase?", "Hire suits short-term or occasional use and low capital; purchase suits long, frequent use. Compare total cost over the expected years of use.");
  b.card("DEFINITION", "Build-own-transfer (BOT)", "A developer builds a facility, owns it and earns income for an agreed period, then transfers ownership to the client.");
  b.card("DEFINITION", "Build-own-operate-transfer (BOOT)", "As BOT, but the developer also operates the facility during the period before handing it over.");
  b.card("CONCEPT", "Efficient use of resources", "Avoid waste, maintain equipment, share assets and reuse materials.");
  b.card("CONCEPT", "Sustainable use of resources", "Using resources no faster than they renew so the enterprise can continue for the long term.");
});
