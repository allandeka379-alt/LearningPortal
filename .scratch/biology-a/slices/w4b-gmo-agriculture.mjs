// W4b: GMOs in agriculture: benefits and hazards (both boards; named examples Cambridge, ZIMSEC general).
import { concept, P, t, chk, table, pctChange, dpStr, mean, sfStr } from "../lib.mjs";

concept("abio.genetech.gmo-agriculture", { file: "genetech/gmo-agriculture", keyPrefix: "genetech.gmo-agriculture" }, (b) => {
  const calc = (o) => b.calc({ ...o, workedSolution: o.workedSolution ?? o.explanation });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "From which organism does the gene for the insecticidal protein in Bt cotton come?",
    options: [
      ["*Bacillus thuringiensis*", "Correct: a soil bacterium."],
      ["*Thermus aquaticus*", "This is the source of Taq polymerase."],
      ["*Escherichia coli*", "*E. coli* is used to make insulin, not Bt toxin."],
      ["*Rhizobium leguminosarum*", "This is a nitrogen-fixing bacterium."],
    ],
    answer: "A",
    explanation: "Bt stands for *Bacillus thuringiensis*.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why can farmers spray glyphosate over a field of herbicide-resistant soybean?",
    options: [
      ["Its enzyme is not inhibited by glyphosate", "Correct."],
      ["The soybean breaks down any insects that eat the weeds", "Unrelated to herbicide."],
      ["Glyphosate only kills plants that are not legumes", "Glyphosate kills nearly all plants."],
      ["The soybean produces its own herbicide to kill weeds", "It resists herbicide; it does not make one."],
    ],
    answer: "A",
    explanation: "A bacterial gene codes for a glyphosate-insensitive form of the enzyme, so the crop survives while weeds die.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "In GM salmon, what is the role of the promoter taken from another fish (ocean pout)?",
    options: [
      ["It keeps the hormone gene active all year", "Correct."],
      ["It codes for growth hormone in the salmon", "The hormone gene came from Chinook salmon."],
      ["It makes the salmon resistant to cold-water diseases", "Not its role."],
      ["It makes the salmon sterile so they cannot breed", "Sterility is achieved separately."],
    ],
    answer: "A",
    explanation: "The promoter is active even in cold water, so growth hormone is made continuously.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why is Bt toxin harmless to humans who wear cotton or eat products from Bt crops?",
    options: [
      ["Human gut cells lack its receptors", "Correct: specific receptors are needed."],
      ["It is destroyed when the cotton plant flowers", "It is present in the plant tissues."],
      ["It only works on plants, not on animals of any kind", "It kills insect larvae, which are animals."],
      ["It is a carbohydrate that humans digest as food", "It is a protein."],
    ],
    answer: "A",
    explanation: "The toxin is activated in alkaline insect guts and binds specific receptors absent from mammals.",
    hints: ["What does the toxin need to bind to?"],
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Why do farmers growing Bt cotton plant \"refuge\" areas of non-Bt cotton?",
    options: [
      ["To keep susceptible bollworms, slowing resistance", "Correct."],
      ["To give the bollworms a place to lay eggs away from people", "Not the reason."],
      ["To provide pollen that makes Bt cotton fertile", "Bt cotton is fertile."],
      ["To increase the amount of Bt toxin each plant makes", "Refuges do not change toxin production."],
    ],
    answer: "A",
    explanation: "Susceptible insects from refuges mate with any resistant survivors, diluting resistance alleles.",
    hints: ["Think about natural selection on the pest."],
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which is a hazard of growing herbicide-resistant crops close to wild relatives?",
    options: [
      ["The gene may spread to wild plants in pollen", "Correct: gene flow could create resistant weeds."],
      ["The crop will lose its resistance gene after one season", "Inserted genes are stably inherited."],
      ["The herbicide will make the crop poisonous to eat", "This is not the hazard described."],
      ["Wild relatives will stop producing seeds altogether", "No reason for this."],
    ],
    answer: "A",
    explanation: "Pollen carrying the transgene can fertilise related wild plants, producing herbicide-resistant hybrids.",
    hints: ["How do genes move between plants?"],
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which argument is used by critics who say GM crops may not reduce hunger among small-scale farmers?",
    options: [
      ["Patented seed may be too costly to buy every season", "Correct: economic access."],
      ["GM crops always yield less than traditional varieties", "Not generally true."],
      ["GM crops cannot be grown in tropical climates", "They are grown in many tropical countries."],
      ["GM crops contain no protein or carbohydrate", "They contain normal nutrients."],
    ],
    answer: "A",
    explanation: "Seed costs and licences that prevent saving seed may make GM crops unaffordable for poorer farmers.",
    hints: ["Think about cost and access."],
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "After many years of growing glyphosate-resistant crops and spraying only glyphosate, farmers find weeds that survive spraying. What is the best explanation?",
    options: [
      ["Repeated spraying selected weeds with alleles for resistance", "Correct: natural selection."],
      ["The weeds absorbed the resistance gene from the soil", "Plants do not take up genes from soil this way."],
      ["Glyphosate stimulated the weeds to make a new enzyme", "Mutations are not caused by the need."],
      ["The crop plants released their resistance protein into the weeds", "Proteins do not transfer between plants like this."],
    ],
    answer: "A",
    explanation: "A few weeds with resistance alleles survived each spray, reproduced, and became common.",
    hints: ["Who survives each spray?"],
  });

  b.tf({
    d: 1, skill: "RECALL",
    stem: "GM salmon are farmed as sterile females to reduce the risk of them breeding with wild salmon.",
    answer: true,
    explanation: "True. They are also kept in land-based tanks.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Herbicide-resistant soybean plants kill weeds by releasing a herbicide from their roots.",
    answer: false,
    explanation: "False. The crop is resistant to a herbicide that the farmer sprays; it does not make herbicide.",
  });

  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each GM organism with the gene inserted into it.",
    pairs: [
      ["GM salmon", "Growth hormone gene from Chinook salmon"],
      ["Herbicide-resistant soybean", "Bacterial gene for a glyphosate-insensitive enzyme"],
      ["Bt cotton", "Gene for a Cry toxin from a soil bacterium"],
    ],
    extraRight: ["Gene for human insulin"],
    explanation: "Each example adds a specific gene for a specific benefit.",
  });
  b.fib({
    d: 2,
    stem: "Choose the correct words.",
    template: "An organism containing a gene from a different species is described as {{blank:a}}. Movement of a transgene into wild relatives by pollination is called gene {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["transgenic"], choices: ["transgenic", "triploid", "homozygous"] },
      { id: "b", accepted: ["flow"], choices: ["flow", "therapy", "editing"] },
    ],
    explanation: "Transgenic; gene flow.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the type of chemical to which GM soybean has been made resistant.",
    accepted: ["herbicide", "a herbicide", "weedkiller", "glyphosate"],
    wrong: ["insecticide"],
    explanation: "A **herbicide** (glyphosate).",
  });

  // Numerical and calculation (new data)
  const c = [2.1, 1.8, 2.4, 2.0, 1.9], g = [2.6, 2.9, 2.5, 2.8, 2.6];
  const mc = mean(c), mg = mean(g);
  const pc = pctChange(mc, mg);
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `Yields of maize (tonnes per hectare) in five plots each of a conventional variety and a drought-tolerant GM variety in a dry season were:\n\nConventional: ${c.join(", ")}\n\nGM: ${g.join(", ")}\n\nCalculate the percentage difference between the mean yields, relative to the conventional mean. Give your answer to one decimal place.`,
    value: pc, dp: 1, unit: "%", wrong: [Math.round(-pctChange(mg, mc) * 10) / 10],
    explanation: `Means: conventional ${dpStr(mc, 2)}, GM ${dpStr(mg, 2)}. (${dpStr(mg, 2)} − ${dpStr(mc, 2)}) ÷ ${dpStr(mc, 2)} × 100 = ${dpStr(pc, 1)}%. Dividing by the GM mean gives ${dpStr(-pctChange(mg, mc), 1)}%.`,
    hints: ["Find both means, then divide the difference by the conventional mean."],
  });
  const s0 = 11, s1 = 4;
  calc({
    d: 3, skill: "APPLICATION",
    stem: `A cotton farmer sprayed insecticide ${s0} times per season before switching to Bt cotton, and ${s1} times afterwards. Calculate the percentage reduction in spraying, to one decimal place.`,
    value: -pctChange(s0, s1), dp: 1, unit: "%", wrong: [Math.round(((s0 - s1) / s1) * 1000) / 10],
    explanation: t`1. Reduction $= ${s0} - ${s1} = ${s0 - s1}$ sprays.
2. Percentage reduction $= \dfrac{${s0 - s1}}{${s0}} \times 100 = ${dpStr(-pctChange(s0, s1), 1)}\%$.
3. Dividing by ${s1} instead of ${s0} gives ${dpStr(((s0 - s1) / s1) * 100, 1)}%, which uses the wrong base.`,
    hints: ["Use the original number of sprays as the base."],
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain how GM salmon may help to meet the demand for food.",
    points: [
      "Growth hormone gene from Chinook salmon inserted",
      "With a promoter (from ocean pout) that keeps the gene active all year, including in cold water",
      "Fish make growth hormone continuously, so grow faster / reach market size in about half the time",
      "More fish produced per year / less food needed per kg, increasing food supply",
    ],
    modelAnswer: "A growth hormone gene from Chinook salmon was inserted into Atlantic salmon together with a promoter from the ocean pout that is active all year, even in cold water. The fish therefore make growth hormone continuously and reach market size in about half the normal time, using less feed per kilogram, so more fish can be produced each year.",
    explanation: "Gene, promoter, effect, food supply.",
    hints: ["What does the promoter change?"],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain how Bt cotton reduces crop losses and the use of insecticides.",
    points: [
      "Gene for Bt (Cry) toxin from *Bacillus thuringiensis* inserted with a promoter",
      "Cotton plant cells produce the toxin",
      "Bollworm larvae that eat the plant are killed (toxin binds receptors in their gut)",
      "Less damage to bolls so higher yield, and fewer insecticide sprays needed",
    ],
    modelAnswer: "The gene for a Cry toxin from *Bacillus thuringiensis* was inserted into cotton with a promoter, so the plant's cells make the toxin. When bollworm larvae eat the plant, the toxin binds to receptors in their gut and kills them. Less damage is done to the bolls, raising yield, and the farmer needs to spray far less insecticide.",
    explanation: "Gene → toxin → pest killed → yield up, sprays down.",
    hints: ["Who eats the toxin?"],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 6,
    stem: "Discuss the benefits and hazards of growing GM crops.",
    points: [
      "Benefit: higher yields from less weed competition or pest damage",
      "Benefit: fewer insecticide sprays (Bt crops), less harm to farmers and non-target insects",
      "Benefit: traits such as drought tolerance or improved nutrition (e.g. vitamin A precursor)",
      "Hazard: gene flow to wild relatives, e.g. herbicide-resistant weeds",
      "Hazard: evolution of resistance in pests or weeds; possible effects on non-target organisms",
      "Social: patented seed and dependence on seed companies / labelling and consumer choice / reduced crop diversity",
    ],
    modelAnswer: "GM crops can raise yields because herbicide-resistant varieties reduce weed competition and Bt varieties reduce pest damage. Bt crops need fewer insecticide sprays, protecting farmers' health and non-target insects, and other GM traits include drought tolerance and improved nutrition. However, transgenes may spread to wild relatives by cross-pollination, creating resistant weeds, and pests and weeds may evolve resistance. There may be effects on non-target species. Socially, patented seed can make farmers dependent on seed companies, consumers may want labelling, and replacing many traditional varieties with a few GM ones reduces genetic diversity.",
    explanation: "Three benefits, three hazards or concerns.",
    hints: ["Give both sides."],
  });

  // Practice structured
  const plots = ["Bt cotton", "Bt cotton + refuge", "Conventional cotton"];
  const res = [[0.2, 0.5, 1.4, 3.8], [0.2, 0.3, 0.4, 0.6]];
  b.struct({
    d: 4, skill: "ANALYSIS",
    stem: `Scientists measured the percentage of bollworm larvae able to survive on Bt cotton leaves, collected from two districts over four years. District A grew only Bt cotton; District B grew Bt cotton with refuges of conventional cotton.\n\n${table(["Year", "1", "2", "3", "4"], [["District A: survivors / %", ...res[0].map((x) => x.toFixed(1))], ["District B: survivors / %", ...res[1].map((x) => x.toFixed(1))]])}`,
    parts: [
      P.num({
        label: "(a)", marks: 1, stem: "How many times greater was the percentage of survivors in District A in year 4 than in year 1?",
        value: res[0][3] / res[0][0], wrong: [res[0][3] - res[0][0]],
        explanation: `${res[0][3]} ÷ ${res[0][0]} = ${sfStr(res[0][3] / res[0][0], 3)} times.`,
      }),
      P.manual({
        label: "(b)", marks: 3, stem: "Explain the change in District A.",
        points: ["Some larvae carry alleles for resistance to Bt toxin (from mutation)", "On Bt cotton only resistant larvae survive and reproduce: selection pressure", "Frequency of the resistance allele increases each generation, so more survivors"],
        modelAnswer: "A few bollworms carried alleles giving resistance to the Bt toxin. Because only Bt cotton was grown, susceptible larvae died and resistant ones survived and reproduced, passing on the allele. Its frequency increased each generation, so the percentage of survivors rose from 0.2% to 3.8%.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Explain why survival rose much less in District B.",
        points: ["Refuges keep a large population of susceptible bollworms", "Resistant survivors mate with susceptible moths, so offspring are mostly susceptible / resistance allele stays rare"],
        modelAnswer: "The refuges of conventional cotton support many susceptible bollworms. Resistant moths from the Bt fields are likely to mate with these, so most offspring are susceptible and the resistance allele remains rare.",
      }),
    ],
    explanation: "Selection for resistance and the refuge strategy.",
    hints: ["Which larvae survive on Bt cotton?"],
    calculator: true,
  });
  b.struct({
    d: 3, skill: "APPLICATION",
    stem: "A seed company proposes to sell herbicide-resistant maize to farmers in a country where wild relatives of maize do not occur.",
    parts: [
      P.manual({
        label: "(a)", marks: 2, stem: "Explain how herbicide-resistant maize could increase yield.",
        points: ["Herbicide can be sprayed over the growing crop, killing weeds but not the maize", "Less competition from weeds for light, water and mineral ions, so higher yield"],
        modelAnswer: "The farmer can spray herbicide over the growing maize, killing the weeds without harming the crop. With less competition for light, water and mineral ions, the maize grows better and yields more.",
      }),
      P.mcq({
        label: "(b)", stem: "Why does the absence of wild relatives reduce one hazard of this crop?",
        options: [
          ["The gene cannot pass to wild relatives in pollen", "Correct."],
          ["Weeds can never evolve herbicide resistance in such a country", "Weeds can still evolve resistance by selection."],
          ["Maize pollen cannot travel through the air", "Maize is wind-pollinated."],
          ["The herbicide will not affect any other plants", "It kills most plants."],
        ],
        answer: "A",
        explanation: "Gene flow needs sexually compatible relatives nearby.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Suggest two social or economic concerns that farmers might raise.",
        points: ["Seed is patented / must be bought each season; cost and dependence on the company", "Herbicide must also be bought / consumers or export markets may reject GM maize / labelling"],
        modelAnswer: "Farmers may worry that patented seed must be bought every season, making them dependent on the company, and that they must also buy the herbicide. Some consumers and export markets may not accept GM maize.",
      }),
    ],
    explanation: "Benefits, hazards and social issues of herbicide-resistant crops.",
    hints: ["What can the farmer now spray?"],
  });

  b.card("FACT", "GM salmon", "Chinook salmon growth hormone gene + ocean pout promoter: grows all year, market size in about half the time.");
  b.card("FACT", "Herbicide-resistant soybean", "Bacterial gene for a glyphosate-insensitive enzyme: herbicide kills weeds, not the crop.");
  b.card("FACT", "Bt cotton", "Cry toxin gene from *Bacillus thuringiensis*: kills bollworm larvae, fewer sprays.");
  b.card("DEFINITION", "Define **transgenic organism**.", "An organism containing a gene from a different species.");
  b.card("CONCEPT", "Benefits of GM crops", "Higher yields, fewer pesticide sprays, drought or disease tolerance, better nutrition.");
  b.card("CONCEPT", "Hazards of GM crops", "Gene flow to wild relatives, resistance in pests/weeds, non-target effects, seed dependence, less diversity.");
  b.card("CONCEPT", "Why plant refuges with Bt crops?", "Susceptible pests survive and mate with resistant ones, slowing the spread of resistance alleles.");
  b.card("CONCEPT", "Ethical and social issues of GM food", "Food security, farmers' rights and patents, labelling and consumer choice, animal welfare, regulation.");
});
