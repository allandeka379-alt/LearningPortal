// W3b: inclusive and sustainable economic growth (Cambridge A Level only).
import { concept, P, chk, table, fmt, growthRate, roundTo } from "../lib.mjs";
import { mc, LV8, LV6 } from "../tables/w3b-kit.mjs";

concept("aecon.macro.growth-inclusive-sustainable", { file: "macro/growth-inclusive-sustainable", keyPrefix: "macro.growth-inclusive-sustainable" }, (b) => {
  mc(b, [1, "RECALL"], "Sustainable economic growth is growth that",
    ["meets the needs of today without harming the ability of future generations to meet theirs", "Correct: this is the standard definition."],
    [["is faster than the growth rate of every other economy in the region over exactly the same period of time", "Sustainability is not about relative speed."],
     ["is based entirely on exports of unprocessed minerals and farm products from the country", "Raw exports may or may not be sustainable."],
     ["leaves total output at the same level in every year without any change at all", "Sustainable growth does not mean zero growth."]],
    "Sustainable growth does not compromise future production and well-being.");

  mc(b, [2, "UNDERSTANDING"], "Which of the following would suggest that growth in a fictional economy is inclusive?",
    ["The income of the poorest fifth of households grows faster than average income", "Correct: the poor gain a larger share of the increase."],
    [["The Gini coefficient rises while real GDP per head increases", "A rising Gini suggests that inequality is increasing."],
     ["Real GDP rises mainly because of one capital-intensive mine", "Concentrated growth may give little to the poor."],
     ["The share of total income received by the richest tenth increases", "That suggests the gains are going to the top."]],
    "Inclusive growth shares the benefits widely, so the poor gain at least as fast as others.", { daily: true });

  mc(b, [2, "UNDERSTANDING"], "Which of the following is an example of natural capital?",
    ["A forest that provides timber and helps to regulate water", "Correct: it is a stock of natural resources that provides inputs and services."],
    [["A tractor bought by a commercial farm for use in planting", "That is man-made physical capital."],
     ["The skills that a worker gains from a training programme", "That is human capital."],
     ["A road that links a mine to the nearest port", "That is infrastructure, man-made capital."]],
    "Natural capital is the stock of natural resources and ecosystems.");

  mc(b, [2, "UNDERSTANDING"], "Why might GDP overstate the sustainable growth of an economy that is extracting minerals?",
    ["It does not deduct resource depletion or environmental damage", "Correct: the loss of natural capital is not subtracted."],
    [["It counts only the output that is sold in the informal sector", "GDP is not limited to the informal sector."],
     ["It is always measured at constant prices, which hide the output", "Constant prices adjust for inflation but not for depletion."],
     ["It falls automatically whenever the pollution of the air increases", "GDP does not fall automatically when pollution rises."]],
    "GDP records the sale of minerals but not the loss of the mineral stock or the harm to the environment.", { daily: true });

  mc(b, [3, "ANALYSIS"], "A tax on household energy use to cut emissions might be regressive because",
    ["poorer households spend a higher proportion of their income on energy", "Correct: the tax takes a larger share of a poor household's income."],
    [["richer households pay no tax at all on the energy they consume at home", "Richer households also pay the tax."],
     ["the tax cannot affect the demand for energy by any household", "Higher prices normally reduce quantity demanded."],
     ["energy is an inferior good for all of the households in the economy", "Whether it is inferior varies, and this is not the reason."]],
    "A tax is regressive if it takes a larger share of income from the poor.", { hints: ["Compare the tax paid with income for rich and poor households."] });

  mc(b, [3, "ANALYSIS"], "Which policy is most likely to make growth more inclusive in a rural area?",
    ["Investment in rural roads and extension services for smallholder farmers", "Correct: it raises the productivity and market access of poorer households."],
    [["Expansion of a capital-intensive mine that employs very few local workers", "That may raise GDP but give few jobs to the poor."],
     ["A cut in the tax rate paid only by the highest-income households", "That favours high-income households."],
     ["Closure of the nearest school to cut government spending in the area", "That reduces the skills of the poor."]],
    "Inclusive growth raises the productivity and opportunities of the poor.", { hints: ["Which measure raises the incomes of poorer households?"] });

  mc(b, [3, "ANALYSIS"], "Why is climate change hard to tackle through the actions of a single country?",
    ["Each country gains from others' cuts while paying only for its own, so it may free-ride", "Correct: the benefit is shared but the cost is not."],
    [["Greenhouse gases are produced by only a few of the very largest economies", "Emissions come from many countries."],
     ["Cutting emissions never costs any country anything in lost output or jobs", "There are costs, which is why the problem arises."],
     ["Climate change affects only the countries that are producing most of the gases", "The damage is global."]],
    "A global externality creates an incentive to free-ride.", { hints: ["Who benefits when one country cuts emissions?"] });

  mc(b, [4, "EVALUATION"], "A government subsidises solar power for poor rural households. Which is the strongest argument that the policy can be both inclusive and sustainable?",
    ["It gives poor households energy and cuts the use of firewood and fuel", "Correct: it serves both aims."],
    [["It will raise GDP by more than any other policy the government could use", "No evidence supports this."],
     ["It means that the government will no longer need to collect any taxes", "A subsidy has to be paid for."],
     ["It increases the demand for non-renewable resources in all industries", "Solar power reduces the use of fossil fuels."]],
    "The policy improves the access of the poor to energy and reduces fuel use and emissions.", { hints: ["Which option links the poor and the environment?"] });

  {
    const y1 = [30, 60, 90, 140, 280], y2 = [36, 72, 108, 168, 336];
    const gp = growthRate(y1[0], y2[0]); chk(gp, 20, 1e-9);
    b.num({ d: 2, skill: "APPLICATION", kind: "pct", value: gp, dp: 1, unit: "%",
      stem: "In a fictional economy the average income of the poorest fifth of households rises from US\\$30 to US\\$36 a month. Calculate the percentage rise, to one decimal place.",
      wrong: [16.7, 6, 83.3], explanation: "Rise = (36 − 30) ÷ 30 × 100 = 20.0%. Dividing by the new income gives 16.7%." });
    const sh = (y1[4] / y1.reduce((a, b) => a + b, 0)) * 100; chk(roundTo(sh, 1), 46.7, 1e-9);
    b.num({ d: 2, skill: "APPLICATION", daily: true, kind: "pct", value: sh, dp: 1, unit: "%",
      stem: "Average monthly incomes per person of the five fifths of households, from poorest to richest, are US\\$30, US\\$60, US\\$90, US\\$140 and US\\$280. Calculate the share of the richest fifth in the total, to one decimal place.",
      wrong: [200, 28, 53.3], explanation: "Total = 30 + 60 + 90 + 140 + 280 = 600. Share = 280 ÷ 600 × 100 = 46.7%." });
    const gd = [8000, 8400], dep = [400, 520], dm = [200, 260];
    const adj = gd.map((x, i) => x - dep[i] - dm[i]); chk(adj[0], 7400); chk(adj[1], 7620);
    const ag = growthRate(adj[0], adj[1]); chk(roundTo(ag, 1), 3.0, 1e-9);
    b.calc({ d: 4, skill: "APPLICATION", calculator: true, kind: "pct", value: ag, dp: 1, unit: "%", hints: ["Deduct depletion and damage from GDP in each year first."],
      stem: "GDP of a fictional economy is US\\$8,000 million in year 1 and US\\$8,400 million in year 2. Resource depletion is US\\$400 million and US\\$520 million, and environmental damage US\\$200 million and US\\$260 million. Calculate the growth rate of GDP adjusted for depletion and damage, to one decimal place.",
      wrong: [5.0, 4.0, 2.0], explanation: "1. Adjusted output, year 1 = 8,000 − 400 − 200 = 7,400.\n2. Year 2 = 8,400 − 520 − 260 = 7,620.\n3. Growth = (7,620 − 7,400) ÷ 7,400 × 100 = 3.0%, compared with 5.0% for unadjusted GDP." });
  }

  b.tf({ d: 1, skill: "RECALL", stem: "Sustainable growth means that an economy must stop growing.", answer: false,
    explanation: "False. It means growth that does not undermine the future ability to produce and meet needs." });
  b.tf({ d: 3, skill: "UNDERSTANDING", hints: ["Does everybody gain in the same proportion?"], stem: "If the incomes of all income groups rise, growth must be inclusive.", answer: false,
    explanation: "False. Incomes may rise by very different proportions: if the rich gain much more than the poor, inequality rises and growth is not fully inclusive." });

  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each policy with its main purpose.",
    pairs: [["Carbon tax", "Makes polluters pay the external cost of emissions"], ["Tradable emission permits", "Caps total emissions while letting firms trade the right to emit"], ["Investment in schools and clinics in poor areas", "Raises the productivity and opportunities of poorer households"], ["Subsidy for solar panels", "Encourages the use of renewable energy"]],
    explanation: "Each policy targets either the environment or the inclusiveness of growth." });

  b.fib({ d: 2, skill: "UNDERSTANDING", stem: "Complete the sentences.",
    template: "A rise in the Gini coefficient suggests that income inequality has {{blank:a}}. Using up a stock of minerals is a loss of {{blank:b}} capital.",
    blanks: [{ id: "a", accepted: ["increased"], choices: ["increased", "decreased"] }, { id: "b", accepted: ["natural"], choices: ["natural", "human"] }],
    explanation: "A higher Gini means greater inequality; minerals are natural capital." });

  b.short({ d: 2, skill: "RECALL", stem: "Name the type of capital that includes minerals, forests, soils and water.",
    accepted: ["natural capital", "natural", "natural resources"], wrong: ["human capital"],
    explanation: "Natural capital is the stock of natural resources." });

  b.manualShort({ d: 2, skill: "RECALL", marks: 2, stem: "Define inclusive economic growth.",
    points: ["Economic growth whose benefits are widely shared across income groups and regions.", "Poorer households participate in and gain from the growth (through jobs and incomes)."],
    modelAnswer: "Inclusive growth is growth whose benefits are widely shared across income groups and regions, so that poorer households also gain through jobs and higher incomes.",
    explanation: "One mark each for the wide sharing and the gains of the poor." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4, hints: ["Costs of growth that are not recorded in GDP."],
    stem: "Explain two ways in which economic growth may harm the environment.",
    points: ["Growth increases the use of non-renewable resources, which are depleted.", "This reduces what is left for future generations.", "Growth increases pollution and emissions (for example from factories or coal burning).", "These are external costs that damage health, water or the climate."],
    modelAnswer: "Growth increases the extraction and use of non-renewable resources, so they are depleted and less is left for future generations. It also increases pollution and emissions, which impose external costs on health, water and the climate.",
    explanation: "Depletion and pollution, each with a developed consequence." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 5, hints: ["Use a chain from policy to price to demand to the outcome."],
    stem: "Analyse how a tax on carbon emissions might make growth more sustainable.",
    points: ["The tax raises the cost of producing with fossil fuels.", "Firms and consumers face the external cost, so it is internalised.", "The higher price reduces demand for carbon-intensive goods.", "Firms have an incentive to switch to cleaner technology.", "Emissions fall, reducing the damage to the climate and future generations."],
    modelAnswer: "The tax raises the cost of using fossil fuels, so producers and consumers pay for the external cost of emissions. The higher price reduces the quantity demanded of carbon-intensive goods and gives firms an incentive to switch to cleaner technology. Emissions fall, which reduces the damage to the climate and protects the ability of future generations to produce.",
    explanation: "Cost, internalisation, demand, technology, outcome." });

  {
    const y1 = [50, 80, 105, 155, 260], y2 = [55, 88, 121, 162, 274];
    const s1 = y1.reduce((a, b) => a + b, 0), s2 = y2.reduce((a, b) => a + b, 0);
    chk(s1, 650); chk(s2, 700);
    const gp = growthRate(y1[0], y2[0]); chk(gp, 10, 1e-9);
    const ga = growthRate(s1, s2); chk(roundTo(ga, 1), 7.7, 1e-9);
    const sr = (y2[4] / s2) * 100; chk(roundTo(sr, 1), 39.1, 1e-9);
    const names = ["Poorest 20%", "Second", "Middle", "Fourth", "Richest 20%"];
    const t1 = table(["Income group", "Year 1 (US\\$ per person per month)", "Year 6 (US\\$ per person per month)"], y1.map((a, i) => [names[i], a, y2[i]]), { align: ["l", "r", "r"] });
    b.struct({ d: 3, skill: "ANALYSIS", examStyle: true, calculator: true, hints: ["Share = group income ÷ total income × 100.", "In (d) compare the growth of the poorest group with that of the average."],
      stem: `**Income growth in Zandia (fictional, illustrative data)**\n\n${t1}`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "pct", value: gp, dp: 1, unit: "%", stem: "Calculate the percentage rise in the income of the poorest fifth, to one decimal place.", wrong: [9.1, 5, 55], explanation: "Rise = (55 − 50) ÷ 50 × 100 = 10.0%." }),
        P.num({ label: "(b)", marks: 2, kind: "pct", value: ga, dp: 1, unit: "%", stem: "Calculate the percentage rise in total income of the five groups, to one decimal place.", wrong: [50, 7.1, 10], explanation: "Total income rises from 650 to 700: (700 − 650) ÷ 650 × 100 = 7.7%." }),
        P.num({ label: "(c)", marks: 2, kind: "pct", value: sr, dp: 1, unit: "%", stem: "Calculate the share of the richest fifth in total income in year 6, to one decimal place.", wrong: [40, 39.9, 274], explanation: "Share = 274 ÷ 700 × 100 = 39.1%, down from 260 ÷ 650 × 100 = 40.0% in year 1." }),
        P.manual({ label: "(d)", marks: 4, stem: "Explain whether growth in Zandia was inclusive.",
          points: ["Incomes rose in every group.", "The income of the poorest fifth rose by 10.0%, faster than total income (7.7%).", "The share of the richest fifth fell (from 40.0% to 39.1%).", "So the gains were shared at least as widely as average growth, and inequality fell, which suggests that growth was inclusive."],
          modelAnswer: "Incomes rose in every group. The poorest fifth gained 10.0%, which is faster than the 7.7% growth of total income, and the share of the richest fifth fell from 40.0% to 39.1%. Inequality fell slightly, so the gains were shared at least as widely as the average, and growth was inclusive." }),
      ],
      explanation: "Poorest +10.0%; total +7.7%; richest share 39.1%; poor gained faster than average, so growth was inclusive." });
  }
  b.struct({ d: 4, skill: "EVALUATION", examStyle: true, hints: ["In (c) weigh jobs and income against environmental and health costs, and then conclude."],
    stem: "**A coal power station in Mbira (fictional)**\n\nMbira's government plans to expand a coal-fired power station. Supporters say that it will provide cheap electricity to factories, create jobs for 1,200 workers in a district with high unemployment and raise export earnings from surplus coal. Critics say that burning more coal will increase carbon emissions, raise respiratory illness in nearby villages and use up a resource that cannot be replaced. They propose investment in solar power instead, which would take longer to build and create fewer jobs at first.",
    parts: [
      P.manual({ label: "(a)", marks: 3, stem: "Explain why the expansion might raise GDP but still not be sustainable.",
        points: ["Electricity, jobs and coal exports increase measured output (GDP).", "Coal is non-renewable, so using it depletes natural capital.", "Emissions and illness impose costs that GDP does not record and that fall on future generations."],
        modelAnswer: "The expansion raises output through electricity, jobs and coal exports, so GDP rises. But coal is non-renewable, so the resource is depleted, and the emissions and illness are costs that GDP does not record and that fall partly on future generations." }),
      P.manual({ label: "(b)", marks: 3, stem: "Explain how a carbon tax might change the choice between coal and solar power.",
        points: ["A carbon tax raises the cost of electricity from coal.", "Solar power, which has no carbon emissions, becomes relatively cheaper.", "Producers and consumers switch towards solar power."],
        modelAnswer: "A carbon tax raises the cost of producing electricity from coal. Solar power emits no carbon, so it becomes relatively cheaper, and producers and consumers have an incentive to switch towards it." }),
      P.manual({ label: "(c)", marks: 6, type: "EXTENDED_RESPONSE", wordLimit: { min: 100, max: 250 }, levels: LV6,
        stem: "Assess whether Mbira should expand the coal power station or invest in solar power.",
        points: [["Coal: 1,200 jobs in a district with high unemployment, cheap electricity and export revenue (inclusive in the short run).", 2], "Coal: emissions and respiratory illness, depletion, and a cost to the poor villagers and the future.", "Solar: sustainable, with lower pollution.", "Solar: slower to build and fewer jobs at first; may need subsidies or finance.", "Judgement: depends on the weight given to the present against the future; a combination, with compensation or retraining, may be best."],
        modelAnswer: "The coal station provides 1,200 jobs in a district with high unemployment, cheap electricity for factories and export revenue, so it supports inclusive growth in the short run. But it adds emissions, causes illness in nearby villages, which are probably poor, and uses up a non-renewable resource. Solar power is more sustainable, but it takes longer to build and creates fewer jobs at first. The best choice depends on the weight given to the present against the future; a mix, with solar power as the main long-run source and retraining for coal workers, might balance the aims." }),
    ],
    explanation: "Jobs and income now against depletion and health costs; a carbon tax shifts relative costs; judgement on the time horizon." });

  b.ext({ d: 4, skill: "EVALUATION", marks: 8, hints: ["Find the links and the conflicts between the two aims."],
    stem: "Assess whether policies to make growth more sustainable are likely to conflict with policies to make it more inclusive.",
    points: ["Carbon taxes and the removal of fuel subsidies raise costs for poor households.", "Closing polluting industries removes jobs of poorer workers.", "Poor countries may give priority to current incomes.", "Some policies support both: clean energy for poor households, public transport, forestry management by communities.", "Revenue from environmental taxes can fund transfers or compensation to the poor.", "Environmental damage often hurts the poor most, so protection can be inclusive.", "Short run against long run.", "A justified judgement."],
    levels: LV8, wordLimit: { min: 100, max: 300 },
    modelAnswer: "There can be conflicts. A carbon tax or the removal of fuel subsidies raises the cost of energy and transport, which falls hardest on poor households, and closing a polluting mine removes jobs. A poor country may also give priority to raising current incomes over protecting the environment. However, the two aims often support each other. The poor frequently suffer most from pollution, drought and deforestation, so protecting the environment can be inclusive, and policies such as clean energy for rural households or community forestry serve both aims. The revenue from environmental taxes can fund transfers or retraining to compensate the poor. Overall, conflicts are strongest in the short run and where policies are badly designed; with compensation and a focus on policies that serve both aims, they can be reduced.",
    explanation: "Weigh short-run conflicts against complementarities and the role of compensation." });

  b.card("DEFINITION", "Define **inclusive growth**.", "Growth whose benefits are widely shared across income groups and regions, with the poor taking part and gaining.");
  b.card("DEFINITION", "Define **sustainable growth**.", "Growth that meets the needs of the present without reducing the ability of future generations to meet theirs.");
  b.card("DEFINITION", "What is **natural capital**?", "The stock of natural resources and ecosystems (minerals, forests, soils, water, the atmosphere) that supplies inputs and services.");
  b.card("CONCEPT", "How can you tell whether growth was inclusive?", "Compare the growth of the poorest groups with average growth, check income shares and whether the Gini coefficient rose or fell.");
  b.card("CONCEPT", "Why does GDP overstate sustainable growth?", "It does not deduct the depletion of natural resources or the damage to the environment.");
  b.card("CONCEPT", "Name four policies for sustainable growth.", "Carbon or pollution taxes, regulation, tradable permits and investment or subsidies for renewable energy.");
  b.card("CONCEPT", "Name policies that make growth more inclusive.", "Education and health spending, rural infrastructure, support for small producers and progressive taxes with transfers.");
  b.card("CONCEPT", "Why is a carbon tax possibly regressive?", "Poor households spend a larger share of income on energy, so the tax takes a larger share of their income.");
  b.card("CONCEPT", "Why is climate change a free-rider problem?", "Each country gains from others' cuts in emissions while bearing the cost of its own, so it has an incentive not to act.");
});
