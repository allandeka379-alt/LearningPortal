// Slice W1a: organic production, hydroponics and GM crops (Cambridge only).
import { concept, P, dilution, grossMargin, pctChange, money, fmtNum, table, agricultureLevels } from "../lib.mjs";

const mix = dilution({ mlPerL: 5, tankL: 120 });

const org16 = grossMargin({ output: [["Organic cabbages", 3000, 0.9]], variable: [["All variable costs", 1250]] });

const yieldDrop = -pctChange(8000, 6800);

const CONV = { yield: 5000, price: 0.4, costs: 900 };
const ORG = { yield: 4000, price: 0.6, costs: 1100 };
const conv = grossMargin({ output: [["Conventional", CONV.yield, CONV.price]], variable: [["Variable costs", CONV.costs]] });
const org = grossMargin({ output: [["Organic", ORG.yield, ORG.price]], variable: [["Variable costs", ORG.costs]] });
const COMPARE = table(["Item", "Conventional plot", "Organic plot"], [
  ["Yield of carrots (kg)", fmtNum(CONV.yield), fmtNum(ORG.yield)],
  ["Assumed price per kg", money(CONV.price, 2), money(ORG.price, 2)],
  ["Variable costs", money(CONV.costs), money(ORG.costs)],
]);

const GMTRIAL = table(["Plot", "Maize yield (kg/ha)", "Insecticide sprays", "Seed cost per ha"], [
  ["Local hybrid, sprayed", "4,200", "3", money(90)],
  ["Bt hybrid, not sprayed", "4,900", "0", money(160)],
]);
const gmGain = 4900 - 4200;

concept("agri.land.modern-production", { file: "land/modern-production", keyPrefix: "land.modern-production" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is **hydroponics**?",
    options: [
      ["Growing plants without soil, with roots in a nutrient solution", "Correct: the nutrients reach the roots dissolved in water."],
      ["Farming fish in ponds or tanks", "This is aquaculture."],
      ["Growing crops without synthetic fertilisers or pesticides", "This is organic production."],
      ["Watering field crops by flooding the furrows", "This is surface (furrow) irrigation, which still uses soil."],
    ],
    answer: "A",
    explanation: "In hydroponics, plants grow in a nutrient solution or in an inert medium such as gravel or coconut fibre that is fed with the solution.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which of these does an organic farmer use to supply nutrients to crops?",
    options: [
      ["Compost and animal manure", "Correct: organic farmers use organic sources of nutrients."],
      ["Ammonium nitrate top dressing", "This is a synthetic fertiliser, which organic farming does not allow."],
      ["A compound fertiliser at planting", "Compound fertilisers are manufactured; organic farming avoids them."],
      ["A systemic insecticide", "An insecticide controls pests; it does not supply nutrients, and synthetic ones are not allowed."],
    ],
    answer: "A",
    explanation: "Organic production feeds the soil with manure, compost, green manure and legumes in rotation.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Bt maize contains a gene that protects it against stem borers. Where does this gene come from?",
    options: [
      ["A soil bacterium", "Correct: the gene comes from Bacillus thuringiensis, a bacterium."],
      ["A wild relative of maize", "Genes from wild relatives can be added by selective breeding; the Bt gene is from a bacterium."],
      ["The stem borer itself", "The gene makes a protein toxic to the caterpillar; it does not come from the insect."],
      ["A fungus that attacks maize", "The source is a bacterium, not a fungus."],
    ],
    answer: "A",
    explanation: "Bt stands for *Bacillus thuringiensis*, a soil bacterium. Its gene makes the plant produce a protein that kills certain caterpillars that feed on it.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is an advantage of hydroponics over growing vegetables in soil?",
    options: [
      ["There are no soil-borne diseases or weeds", "Correct: without soil there are no soil-borne pathogens or weed seeds."],
      ["It needs no electricity or equipment", "Most systems need pumps, tanks and often a greenhouse."],
      ["Plants need no mineral nutrients", "Plants need all the usual nutrients, supplied in solution."],
      ["It is the cheapest way to grow maize", "Hydroponics is costly and suits high-value crops, not staple grains."],
    ],
    answer: "A",
    explanation: "Hydroponics avoids soil-borne diseases and weeds, controls nutrients exactly and saves water, but it is costly and technical.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is an argument **against** growing GM crops?",
    options: [
      ["Patented seed must usually be bought again every season", "Correct: farmers depend on seed companies and costs are high."],
      ["They can reduce the amount of insecticide sprayed", "This is an argument for GM crops."],
      ["They can be made more nutritious", "This is an argument for GM crops."],
      ["They may give higher yields where pests are serious", "This is an argument for GM crops."],
    ],
    answer: "A",
    explanation: "Arguments against include seed cost and patents, resistance in pests and weeds, gene flow to other plants, possible effects on non-target organisms and market rejection.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "An organic vegetable grower has a serious aphid problem. Which control method is allowed in organic production?",
    options: [
      ["Encouraging ladybirds, which eat aphids", "Correct: biological control by natural enemies is a key organic method."],
      ["Spraying a synthetic organophosphate insecticide", "Synthetic insecticides are not allowed in organic production."],
      ["Planting a herbicide-tolerant GM variety", "GM crops are not allowed in organic production, and herbicide tolerance does not control aphids."],
      ["Applying extra ammonium nitrate to outgrow the aphids", "Synthetic fertiliser is not allowed, and soft, nitrogen-rich growth attracts more aphids."],
    ],
    answer: "A",
    explanation: "Organic pest control uses natural enemies, resistant varieties, rotation, trap crops, hand-picking and approved natural sprays.",
    hints: ["Which option uses a living organism to control the pest?"],
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "In a recirculating hydroponic system, why can one diseased plant quickly cause losses across the whole unit?",
    options: [
      ["The shared nutrient solution carries the pathogen to every plant", "Correct: the same solution flows past every root."],
      ["The plants have no roots, so they cannot resist disease", "Hydroponic plants have roots; they grow in the solution."],
      ["The nutrient solution contains no water", "The solution is mostly water."],
      ["Soil-borne pests multiply rapidly in the channels", "There is no soil, so soil-borne pests are not the problem."],
    ],
    answer: "A",
    explanation: "Water-borne pathogens spread through recirculated solution, so hygiene, disinfection and quick removal of sick plants are essential.",
    hints: ["What do all the plants share?"],
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which statement correctly distinguishes a GM crop from a variety produced by selective breeding?",
    options: [
      ["GM inserts a gene that may come from an unrelated species", "Correct: genetic engineering can move genes between species that cannot interbreed."],
      ["Selective breeding is done only in laboratories", "Selective breeding crosses plants in the field or greenhouse."],
      ["GM crops are always hybrids", "Hybrids come from crossing two parent lines; GM is a separate technique."],
      ["Selective breeding changes no genes at all", "Selective breeding changes the combination of genes by crossing and selecting."],
    ],
    answer: "A",
    explanation: "Selective breeding combines genes from plants that can cross naturally. Genetic engineering transfers specific genes, even from bacteria or animals.",
    hints: ["Think about where the new gene can come from."],
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "An organic grower's yield is lower than a conventional neighbour's, yet her profit is higher. Which explanation is most likely?",
    options: [
      ["She receives a premium price for certified organic produce", "Correct: a higher price can more than make up for a lower yield."],
      ["Her variable costs are always zero", "Organic growers still pay for seed, labour, compost and certification."],
      ["Organic produce cannot be sold, so she saves on transport", "Organic produce is sold, often to special markets."],
      ["Lower yields always give higher profits", "Lower yields reduce income unless the price is higher."],
    ],
    answer: "A",
    explanation: "Profit depends on yield × price − costs. Certified organic produce often earns a premium that outweighs the lower yield and higher labour costs.",
    hints: ["Income = yield × price."],
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Organic farmers may use animal manure and compost to fertilise their crops.",
    answer: true,
    explanation: "True. Organic farming avoids synthetic fertilisers, not organic ones.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Plants grown hydroponically do not need mineral nutrients because they have no soil.",
    answer: false,
    explanation: "False. They need all the usual mineral nutrients (N, P, K, Ca, Mg, S and trace elements), which are dissolved in the nutrient solution.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each term with its description.",
    pairs: [
      ["Nutrient film technique", "A thin stream of nutrient solution flows past roots in sloping channels"],
      ["Bt crop", "Makes a protein that kills certain caterpillars"],
      ["Conversion period", "Time without synthetic inputs before produce can be sold as organic"],
      ["Green manure", "A crop grown and dug into the soil to add organic matter"],
    ],
    explanation: "NFT is a hydroponic system; Bt crops are GM; the conversion period and green manures belong to organic production.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct word for each blank.",
    template: "Before produce can be sold as organic, the farm must be inspected and {{blank:a}}. In a GM crop, a {{blank:b}} has been inserted by genetic engineering.",
    blanks: [
      { id: "a", accepted: ["certified"], choices: ["certified", "irrigated", "fumigated", "mechanised"] },
      { id: "b", accepted: ["gene"], choices: ["gene", "fertiliser", "hormone spray", "seed coating"] },
    ],
    explanation: "Organic produce must come from a certified farm. GM crops carry a gene inserted in the laboratory.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the technique in which a gene from one organism is inserted into the DNA of a crop.",
    accepted: ["genetic engineering", "genetic modification", "gene transfer", "genetic manipulation", "recombinant dna technology"],
    wrong: ["selective breeding", "hybridisation"],
    explanation: "Genetic engineering (genetic modification) produces GM crops.",
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "A hydroponic nutrient concentrate is used at 5 mL per litre of water. How many mL of concentrate are needed for a 120 L tank?",
    value: mix.concentrateMl, unit: "mL", wrong: [24, 0.6],
    explanation: `Concentrate = 5 mL/L × 120 L = ${mix.concentrateMl} mL (0.6 L). Dividing 120 by 5 gives 24, which is wrong.`,
  });
  b.calc({
    d: 3, skill: "APPLICATION",
    stem: "An organic grower harvests 3,000 kg of cabbages and sells them at an assumed US\\$0.90 per kg. Her variable costs are US\\$1,250. Calculate her gross margin in US\\$.",
    value: org16.grossMargin, prefix: "US$", wrong: [org16.grossOutput, org16.grossOutput + 1250],
    explanation: `Income = 3,000 × 0.90 = ${money(org16.grossOutput)}. Gross margin = ${money(org16.grossOutput)} − US\\$1,250 = ${money(org16.grossMargin)}.`,
    workedSolution: `1. Income = 3,000 × 0.90 = ${money(org16.grossOutput)}.\n2. Gross margin = income − variable costs = ${money(org16.grossOutput)} − US\\$1,250.\n3. = ${money(org16.grossMargin)}.`,
    hints: ["Income = yield × price.", "Gross margin = income − variable costs."],
  });
  b.calc({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: "When a farm converted to organic production, its potato yield fell from 8,000 kg to 6,800 kg per season. Calculate the percentage decrease in yield.",
    value: yieldDrop, unit: "%", wrong: [17.6, 85],
    explanation: `Decrease = 8,000 − 6,800 = 1,200 kg. Percentage decrease = 1,200 ÷ 8,000 × 100 = ${yieldDrop}%. (Dividing by 6,800 gives 17.6%, which uses the wrong base.)`,
    workedSolution: `1. Decrease = 8,000 − 6,800 = 1,200 kg.\n2. Percentage decrease = 1,200 ÷ 8,000 × 100.\n3. = ${yieldDrop}%.`,
    hints: ["Divide the decrease by the ORIGINAL yield."],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** advantages of hydroponics for a vegetable grower near a city.",
    points: [
      "No soil needed.",
      "So vegetables can be grown on poor land, small plots or rooftops close to the city market.",
      "Nutrients and water are controlled / recirculated / no soil-borne diseases or weeds.",
      "So yields are high and fast, water use is low, or less spraying and weeding is needed.",
    ],
    modelAnswer: "Hydroponics needs no soil, so the grower can produce on a small, poor-soil plot near the city where buyers are. The nutrient solution is controlled exactly and recirculated, so growth is fast, yields are high and little water is wasted.",
    explanation: "Each advantage needs a consequence for the grower.",
    hints: ["Think about land, water, nutrients and disease."],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "Explain **two** arguments against the growing of GM crops.",
    points: [
      "Pests or weeds may develop resistance.",
      "Because the same trait is used widely, resistant individuals survive and multiply, so the crop loses its advantage.",
      "Gene flow / seed cost and patents / market rejection / effects on non-target organisms.",
      "Explains: pollen carries the gene to other crops or wild relatives / farmers depend on companies and cannot save seed / exports to countries that reject GM may be lost / beneficial insects may be harmed.",
    ],
    modelAnswer: "Insects can become resistant to the Bt protein if Bt crops are grown everywhere, because resistant insects survive and breed. Seed is patented and expensive and must be bought each season, so poorer farmers depend on seed companies.",
    explanation: "Each argument needs an explanation of why it is a problem.",
    hints: ["Think about pests, the environment, seed and markets."],
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, calculator: true,
    stem: `A farmer compared two plots of carrots of the same size for one season.\n\n**Table 1**\n\n${COMPARE}`,
    hints: ["Income = yield × price.", "Gross margin = income − variable costs."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the gross margin of the conventional plot in US\\$.", prefix: "US$", value: conv.grossMargin, wrong: [conv.grossOutput], explanation: `Income = ${fmtNum(CONV.yield)} × ${CONV.price} = ${money(conv.grossOutput)}; margin = ${money(conv.grossOutput)} − ${money(CONV.costs)} = ${money(conv.grossMargin)}.` }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the gross margin of the organic plot in US\\$.", prefix: "US$", value: org.grossMargin, wrong: [org.grossOutput], explanation: `Income = ${fmtNum(ORG.yield)} × ${ORG.price} = ${money(org.grossOutput)}; margin = ${money(org.grossOutput)} − ${money(ORG.costs)} = ${money(org.grossMargin)}.` }),
      P.manual({ label: "(c)", marks: 2, stem: "Suggest **two** reasons why the organic plot had higher variable costs.", points: [
        "More labour for hand weeding, composting or hand pest control.",
        "Certification fees / buying compost or manure / biological control agents.",
      ], explanation: "Organic production replaces chemicals with labour and organic inputs, and requires certification." }),
      P.manual({ label: "(d)", marks: 2, stem: "Explain why the organic plot was more profitable despite its lower yield.", points: [
        "The organic carrots sold at a higher (premium) price.",
        `The extra income from the premium (${money(org.grossOutput)} against ${money(conv.grossOutput)}) outweighed the lower yield and higher costs.`,
      ], explanation: "Margin depends on price as well as yield and costs." }),
    ],
    explanation: `Conventional margin ${money(conv.grossMargin)}; organic margin ${money(org.grossMargin)}: the premium price outweighs the lower yield.`,
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    stem: `A district trial compared a locally used hybrid maize with a Bt hybrid in an area where stem borers are common (fictional results).\n\n**Table 2**\n\n${GMTRIAL}`,
    hints: ["Compare yields, sprays and seed costs.", "For (c), give arguments on both sides and a conclusion."],
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "Calculate the difference in yield between the two plots in kg/ha.", value: gmGain, unit: "kg/ha", wrong: [9100], explanation: `4,900 − 4,200 = ${gmGain} kg/ha.` }),
      P.manual({ label: "(b)", marks: 5, stem: "Using the data, explain the advantages and disadvantages of the Bt hybrid shown in the trial.", points: [
        "Higher yield (700 kg/ha more).",
        "Because the Bt protein controls stem borers, so fewer plants are damaged.",
        "No insecticide sprays were needed.",
        "Saving the cost of three sprays and reducing exposure of workers and natural enemies to chemicals.",
        "Disadvantage: seed costs US\\$70 more per ha (and must be bought each season).",
      ], explanation: "Use the figures in the table as evidence." }),
      P.manual({ label: "(c)", marks: 6, stem: "Discuss whether farmers in the district should be encouraged to grow Bt maize.", points: [
        "For: higher yields and food security where borers are serious.",
        "For: less insecticide, safer for farmers and the environment.",
        "Against: higher seed cost each season / dependence on patented seed.",
        "Against: stem borers may become resistant unless refuges of non-Bt maize are planted.",
        "Against: gene flow to non-GM maize; some buyers or importing countries reject GM grain; regulation may not permit it.",
        "Reasoned conclusion, e.g. worthwhile only if seed is affordable, the market accepts it, regulations allow it and resistance is managed.",
      ], levels: agricultureLevels(6), explanation: "A discussion weighs arguments for and against and reaches a justified conclusion." }),
    ],
    explanation: "The Bt hybrid gave more maize with no sprays but cost more; the wider decision depends on cost, markets, regulation and resistance management.",
  });

  b.card("DEFINITION", "Organic production", "Farming without synthetic fertilisers or pesticides, using manure, compost, rotation, legumes and biological control.");
  b.card("DEFINITION", "Hydroponics", "Growing plants without soil, roots in a nutrient solution or an inert medium fed with solution.");
  b.card("DEFINITION", "GM crop", "A crop whose DNA has been changed by genetic engineering, often with a gene from another species.");
  b.card("FACT", "What does the Bt gene make a crop produce?", "A protein (from the bacterium Bacillus thuringiensis) that kills certain caterpillars, e.g. stem borers and bollworms.");
  b.card("CONCEPT", "Arguments for GM crops", "Higher yields, less insecticide, better nutrition, possible drought or disease tolerance.");
  b.card("CONCEPT", "Arguments against GM crops", "Pest and weed resistance, gene flow, costly patented seed, non-target effects, market rejection.");
  b.card("CONCEPT", "Arguments for and against organic production", "For: no residues, healthier soil, premium prices. Against: lower yields, more labour, harder pest control, certification costs.");
  b.card("CONCEPT", "Disadvantages of hydroponics", "High cost, technical skill, dependence on electricity, rapid spread of water-borne disease.");
  b.card("DEFINITION", "Nutrient film technique (NFT)", "Hydroponic system in which a thin film of nutrient solution flows past roots in sloping channels and is recirculated.");
});
