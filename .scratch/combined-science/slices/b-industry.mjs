import { concept, P, t } from "../lib.mjs";

const O = (...codes) => codes.map((c) => `zimsec/o-level/combined-science:${c}`);
const BUTTER = O("7.2.4.1.1");
const OIL = O("7.2.4.1.2");

// =====================================================================================================================
concept("cs.industry.peanut-processing", {
  file: "industry/peanut-processing",
  keyPrefix: "industry.peanut",
}, (q) => {
  q.mcq({ d: 1, skill: "RECALL", objectives: BUTTER,
    stem: "In which order are these processes carried out when making peanut butter?",
    options: [
      ["Shelling, roasting, grinding, packaging", "Correct."],
      ["Roasting, shelling, packaging, grinding", "The pods are shelled first, and the product is packaged last."],
      ["Grinding, shelling, roasting, packaging", "The kernels must be shelled and roasted before grinding."],
      ["Shelling, grinding, roasting, packaging", "The kernels are roasted before they are ground."],
    ],
    answer: "A", explanation: "The pods are shelled, the kernels sorted and roasted, the skins removed, the kernels ground into a paste and the paste packaged." });

  q.mcq({ d: 1, skill: "RECALL", objectives: BUTTER,
    stem: "What is meant by value addition?",
    options: [
      ["Processing a raw product into a product of higher value", "Correct: for example, turning groundnuts into peanut butter."],
      ["Selling a raw product at the highest possible price", "Value addition changes the product itself."],
      ["Adding salt to a product to make it heavier", "Salt is added for flavour, and this is not the meaning of value addition."],
      ["Growing more of a crop on the same land", "That is increasing the yield, not adding value."],
    ],
    answer: "A", explanation: "Value addition is processing a raw product into one that is worth more, keeps longer and creates work, such as making peanut butter from groundnuts." });

  q.short({ d: 2, skill: "RECALL", daily: true, objectives: BUTTER,
    stem: "What term describes processing a raw product, such as groundnuts, into a product of higher value, such as peanut butter?",
    accepted: ["value addition", "adding value", "value adding", "value-addition"], wrong: ["harvesting"],
    explanation: "Value addition." });

  q.mcq({ d: 2, skill: "UNDERSTANDING", daily: true, objectives: BUTTER,
    stem: "Why are shelled groundnuts roasted before they are ground into peanut butter?",
    options: [
      ["To develop flavour, dry the nuts and loosen the skins", "Correct."],
      ["To soften the kernels so that they need no grinding", "Roasting dries the kernels and makes them brittle; they still have to be ground."],
      ["To drive the oil out so the butter is not greasy", "The oil stays in the kernels and gives peanut butter its smooth texture."],
      ["To destroy any aflatoxins in mouldy kernels", "Roasting does not reliably destroy aflatoxins, which is why mouldy kernels are sorted out first."],
    ],
    answer: "A", explanation: "Roasting develops the roasted flavour and brown colour, drives off moisture so the nuts grind easily and keep well, loosens the skins and kills many microorganisms." });

  q.mcq({ d: 2, skill: "RECALL", objectives: BUTTER,
    stem: "Which piece of equipment is used to separate loosened skins from roasted groundnut kernels?",
    options: [
      ["A winnowing basket", "Correct: the light skins are blown away in a breeze."],
      ["A mortar and pestle", "This is used for grinding."],
      ["A groundnut sheller", "This removes the pods, not the thin skins."],
      ["A screw press", "This is used to press oil out of peanut butter."],
    ],
    answer: "A", explanation: "In a winnowing basket the light skins are blown away while the heavier kernels fall back." });

  q.mcq({ d: 2, skill: "UNDERSTANDING", objectives: BUTTER,
    stem: "A worker tosses a mixture of groundnut kernels and pieces of shell in a winnowing basket in a breeze. Why does this separate them?",
    options: [
      ["Light shell pieces blow away; heavier kernels fall back.", "Correct."],
      ["Heavier kernels blow away; light shell pieces fall back.", "The breeze carries away the lighter pieces, not the heavier ones."],
      ["Shells stick to the basket while kernels are tossed out.", "Nothing makes the shells stick: the separation depends on how heavy the pieces are."],
      ["Kernels fall through the gaps in the basket's weave.", "A winnowing basket is tightly woven; the breeze does the separating."],
    ],
    answer: "A", explanation: "Winnowing separates materials by how easily they are carried by moving air: light shells and skins are blown aside, heavier kernels drop straight back." });

  q.mcq({ d: 3, skill: "UNDERSTANDING", objectives: BUTTER,
    stem: "Why must mouldy groundnut kernels be removed before roasting?",
    options: [
      ["They may contain aflatoxins, which roasting does not fully destroy.", "Correct."],
      ["Mould makes the kernels too hard to grind smoothly.", "The danger is the poison in mouldy kernels, not their texture."],
      ["Mouldy kernels give off smoke that taints the batch.", "The real danger is aflatoxin, a poison that can damage the liver."],
      ["Mould spores would grow again inside the sealed jars.", "Roasting kills the mould itself; the problem is the poison it has already made."],
    ],
    answer: "A", explanation: "Moulds on damp or damaged groundnuts can make aflatoxins, which damage the liver. Roasting does not remove them completely, so the kernels must be sorted out before processing.",
    hints: ["Does heating always make a poisonous substance safe?"] });

  q.tf({ d: 2, skill: "UNDERSTANDING", daily: true, objectives: BUTTER,
    stem: "Roasting groundnuts is a physical change.",
    answer: false,
    explanation: "False. Roasting forms new substances that give the brown colour and roasted flavour, and it cannot be reversed, so it is a chemical change." });

  q.tf({ d: 2, skill: "UNDERSTANDING", objectives: BUTTER,
    stem: "Grinding roasted groundnuts into peanut butter is a physical change.",
    answer: true,
    explanation: "True. Grinding breaks the kernels into small particles and releases their oil, but no new substance is formed." });

  q.mcq({ d: 2, skill: "UNDERSTANDING", multiple: true, objectives: BUTTER,
    stem: "Peanut butter is sealed in airtight jars. Which of these are reasons for this? Select all that apply.",
    options: [
      ["To keep out oxygen, which makes the oil go rancid", "Correct."],
      ["To keep out moisture, so that moulds cannot grow", "Correct."],
      ["To keep out dust and insects", "Correct."],
      ["To make the peanut butter heavier", "Sealing a jar does not change the mass of the peanut butter."],
      ["To make the oil separate out faster", "Sealing does not speed up oil separation."],
      ["To add protein to the peanut butter", "Packaging adds nothing to the food."],
    ],
    answer: ["A", "B", "C"],
    explanation: "Airtight packaging keeps out the oxygen that makes oil rancid, the moisture that lets moulds grow, and dust and insects." });

  q.match({ d: 2, skill: "UNDERSTANDING", objectives: BUTTER,
    stem: "Match each stage of making peanut butter with its purpose.",
    pairs: [
      ["Shelling", "Removes the kernels from the pods"],
      ["Sorting", "Removes stones and mouldy or damaged kernels"],
      ["Roasting", "Develops flavour and colour and loosens the skins"],
      ["Grinding", "Breaks the kernels into a paste and releases the oil"],
      ["Packaging", "Keeps the product clean and fresh"],
    ],
    explanation: "Each stage has one main job: shell, sort, roast, grind, pack." });

  q.num({ d: 2, skill: "APPLICATION", daily: true, objectives: BUTTER,
    stem: "A farmer shells 50 kg of groundnuts in their pods and obtains 34 kg of kernels. What percentage of the mass of the pods is kernel?",
    value: 68, unit: "%", wrong: [147, 32, 16],
    explanation: "Shelling percentage = 34 ÷ 50 × 100% = 68%." });

  q.num({ d: 3, skill: "APPLICATION", objectives: BUTTER,
    stem: "A club makes 15 kg of peanut butter and fills it into jars that each hold 250 g. How many jars can it fill?",
    value: 60, wrong: [6, 3750, 16.7],
    explanation: "15 kg = 15 000 g, and 15 000 ÷ 250 = 60 jars.",
    hints: ["Convert kilograms to grams first: 1 kg = 1000 g."] });

  q.struct({ d: 4, skill: "APPLICATION", examStyle: true, objectives: BUTTER,
    stem: t`A school club buys $30\ \text{kg}$ of shelled groundnuts at \$1.20 per kilogram. It spends \$9.00 on firewood and salt, and \$0.35 on each of the 70 jars it fills. It sells all 70 jars at \$1.50 each.`,
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the total cost of making the peanut butter, in dollars.", value: 69.5, answer: "69.50", tol: 0.01, prefix: "$", wrong: [45, 36],
        explanation: t`Groundnuts: $30 \times 1.20$ = \$36.00. Jars: $70 \times 0.35$ = \$24.50. Total: 36.00 + 9.00 + 24.50 = \$69.50.` }),
      P.num({ label: "(b)", marks: 1, stem: "Calculate the income from selling the jars, in dollars.", value: 105, answer: "105.00", tol: 0.01, prefix: "$", wrong: [1.5, 70],
        explanation: t`$70 \times 1.50$ = \$105.00.` }),
      P.num({ label: "(c)", marks: 1, stem: "Calculate the profit, in dollars.", value: 35.5, answer: "35.50", tol: 0.01, prefix: "$", wrong: [174.5, 69.5],
        explanation: t`Profit = income − total cost = 105.00 − 69.50 = \$35.50.` }),
    ],
    explanation: t`Total cost = \$36.00 (nuts) + \$9.00 (firewood and salt) + \$24.50 (jars) = \$69.50. Income = \$105.00. Profit = \$35.50.`,
    hints: ["Add up every cost: groundnuts, firewood and salt, and jars.", "Profit = income − total cost."] });

  q.mcq({ d: 2, skill: "UNDERSTANDING", objectives: OIL,
    stem: "A jar of peanut butter without stabiliser is left standing for several weeks, and a layer of oil collects on top. Why does the oil rise to the top?",
    options: [
      ["The oil is less dense than the solid particles.", "Correct."],
      ["The oil evaporates and condenses on the surface.", "The oil does not evaporate at room temperature."],
      ["The oil is denser than the solid particles.", "A denser liquid would sink, not rise."],
      ["Air in the jar pulls the oil upwards.", "Air does not pull the oil up; the less dense oil floats."],
    ],
    answer: "A", explanation: "The oil is less dense than the crushed solids, so it slowly separates and floats to the top." });

  q.mcq({ d: 3, skill: "UNDERSTANDING", objectives: OIL,
    stem: "Why is peanut butter warmed slightly before it is pressed to extract oil?",
    options: [
      ["Warm oil is runnier, so it flows out through the cloth more easily.", "Correct."],
      ["Warming turns some of the protein in the paste into oil.", "Heating does not change protein into oil; it only makes the oil runnier."],
      ["Warming destroys any aflatoxins left in the paste.", "Gentle warming does not destroy aflatoxins; that is why mouldy kernels are removed."],
      ["Warm paste sets harder, so it is easier to squeeze.", "Warming makes the paste and oil softer, not harder."],
    ],
    answer: "A", explanation: "Oil flows more easily when warm (it is less viscous), so more of it is squeezed out through the cloth in the same time.",
    hints: ["Think about how cooking oil pours on a cold morning compared with a hot day."] });

  q.mcq({ d: 2, skill: "RECALL", objectives: OIL,
    stem: "After oil has been pressed out of peanut butter, a solid is left in the cloth bag. What is it called, and what is it mainly used for?",
    options: [
      ["Groundnut cake, used as a protein-rich animal feed", "Correct."],
      ["Groundnut shells, burnt as fuel in the roaster", "The shells were removed before grinding, so they are not in the bag."],
      ["Slag, crushed and used as road-building material", "Slag is a waste product of the blast furnace, not of oil pressing."],
      ["Hardened groundnut fat, sold as margarine", "Margarine is made from oil; the solid left in the bag is the protein-rich cake."],
    ],
    answer: "A", explanation: "The solid left is groundnut cake. It is rich in protein and is used in animal feed and as food." });

  q.mcq({ d: 3, skill: "APPLICATION", objectives: OIL,
    stem: "Which use of peanut oil depends on a chemical reaction between the oil and an alkali such as sodium hydroxide?",
    options: [
      ["Making soap", "Correct: oils and fats react with alkalis to form soap."],
      ["Frying food", "Frying uses the oil to transfer heat."],
      ["Burning in a lamp", "This is combustion with oxygen, not a reaction with an alkali."],
      ["Rubbing on the skin as a lotion", "No reaction with an alkali takes place."],
    ],
    answer: "A", explanation: "Boiling an oil with an alkali such as sodium hydroxide makes soap (saponification).",
    hints: ["Which product in the chemistry syllabus is made from oils or fats and an alkali?"] });

  q.num({ d: 3, skill: "APPLICATION", objectives: OIL,
    stem: "A processor presses 8.0 kg of peanut butter and collects 1.8 kg of oil. What percentage of the mass of the peanut butter was obtained as oil?",
    value: 22.5, unit: "%", wrong: [444, 77.5, 14.4],
    explanation: "Percentage = 1.8 ÷ 8.0 × 100% = 22.5%.",
    hints: ["Percentage = mass of oil ÷ mass of peanut butter × 100%."] });

  q.struct({ d: 4, skill: "UNDERSTANDING", examStyle: true, objectives: BUTTER,
    stem: "A women's co-operative in Mutoko wants to make peanut butter from its groundnut harvest.",
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Outline the stages in making peanut butter from groundnuts in their pods.",
        points: ["Shell the pods (by hand or with a sheller) and winnow away the shells", "Sort out stones and mouldy or damaged kernels", "Roast the kernels until golden-brown, then cool them and rub off and winnow away the skins", "Grind the kernels into a paste (adding a little salt) and package it in clean, airtight, labelled jars"] }),
      P.manual({ label: "(b)", marks: 2, stem: "Name two pieces of equipment that could be used to grind the roasted kernels.",
        points: ["Peanut butter making machine (mill), or grinding stone (guyo/imbokodo)", "Mortar and pestle, or the other item from the first point"] }),
      P.manual({ label: "(c)", marks: 1, stem: "Give one reason why the workers should cover their hair and wash their hands.",
        points: ["To stop hair, dirt or pathogens getting into the food (food hygiene)"] }),
    ],
    explanation: "Shell, winnow, sort, roast, cool and remove skins, grind with salt, then package airtight with a label. Grinding equipment: machine, grinding stone, mortar and pestle. Hygiene stops contamination.",
    hints: ["Start from the pods and end with the jar on the shelf.", "Think of both modern and traditional grinding equipment."] });

  q.struct({ d: 4, skill: "UNDERSTANDING", examStyle: true, objectives: OIL,
    stem: "The co-operative also wants to sell peanut oil.",
    parts: [
      P.manual({ label: "(a)", marks: 3, stem: "Outline how oil can be obtained by pressing peanut butter.",
        points: ["Warm the peanut butter slightly so the oil flows easily", "Put it in a strong cloth bag in a (screw or lever) press", "Squeeze: oil passes through the cloth into a container and the solid cake stays in the bag"] }),
      P.manual({ label: "(b)", marks: 1, stem: "The oil collected is cloudy. Suggest how clear oil can be obtained from it.",
        points: ["Leave it to stand so solid particles settle, then decant (pour off) or filter the clear oil"] }),
      P.manual({ label: "(c)", marks: 2, stem: "State two uses of peanut oil.",
        points: ["Cooking or frying, or making margarine", "Making soap, or skin creams and hair oils, or lamp fuel"] }),
      P.manual({ label: "(d)", marks: 1, stem: "State one use of the solid left after pressing.",
        points: ["Animal feed (it is rich in protein), or food"] }),
    ],
    explanation: "Warm, bag and press the peanut butter; let the oil settle and decant or filter it. The oil is used for cooking, margarine, soap and cosmetics; the cake is used as animal feed.",
    hints: ["The cloth bag acts like a filter.", "How are fine solids removed from a liquid in the chemistry laboratory?"] });

  q.card("FACT", "Stages in making peanut butter", "Shelling, sorting, roasting, removing skins, grinding, packaging.");
  q.card("FACT", "What is value addition?", "Processing a raw product (groundnuts) into a product of higher value (peanut butter, oil).");
  q.card("CONCEPT", "Why are groundnuts roasted?", "To develop flavour and colour, drive off moisture, loosen the skins and kill microorganisms.");
  q.card("CONCEPT", "Why sort out mouldy kernels?", "They may contain aflatoxins (liver poisons), which roasting does not destroy completely.");
  q.card("FACT", "Equipment for making peanut butter", "Sheller, winnowing basket, roaster, peanut butter making machine, grinding stone (guyo/imbokodo), mortar and pestle.");
  q.card("CONCEPT", "Why package peanut butter airtight?", "To keep out oxygen (rancid oil), moisture (moulds), dust and insects.");
  q.card("FACT", "How is oil obtained from peanut butter?", "Warm it, press it in a cloth bag; oil runs through the cloth; let it settle and decant or filter it.");
  q.card("FACT", "Uses of peanut oil", "Cooking and frying, margarine, soap, skin creams and hair oils, lamp fuel.");
  q.card("CONCEPT", "Physical and chemical changes in peanut processing", "Shelling, grinding and pressing are physical changes; roasting and oil going rancid are chemical changes.");
});
