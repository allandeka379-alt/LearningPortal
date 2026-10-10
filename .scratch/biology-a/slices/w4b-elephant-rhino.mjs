// W4b: conservation in Zimbabwe: elephants, rhinos, EMA and CAMPFIRE (ZIMSEC only, Form 6).
import { concept, P, t, chk, table, pctChange, dpStr, sfStr } from "../lib.mjs";

concept("abio.conservation.elephant-rhino", { file: "conservation/elephant-rhino", keyPrefix: "conservation.elephant-rhino" }, (b) => {
  const calc = (o) => b.calc({ ...o, workedSolution: o.workedSolution ?? o.explanation });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the scientific name of the white rhinoceros?",
    options: [
      ["*Ceratotherium simum*", "Correct."],
      ["*Diceros bicornis*", "This is the black rhinoceros."],
      ["*Loxodonta africana*", "This is the African elephant."],
      ["*Hippopotamus amphibius*", "This is the hippopotamus."],
    ],
    answer: "A",
    explanation: "White rhino: *Ceratotherium simum*; black rhino: *Diceros bicornis*.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What is the main aim of the CAMPFIRE programme?",
    options: [
      ["To let communities benefit from wildlife so they conserve it", "Correct: community-based management."],
      ["To move all people out of areas where wildlife is found", "CAMPFIRE works with communities, not by removing them."],
      ["To ban hunting of every wild animal species in Zimbabwe", "CAMPFIRE income has often come from regulated hunting."],
      ["To regulate pollution from mines and factories across the country", "That is a role of EMA."],
    ],
    answer: "A",
    explanation: "CAMPFIRE shares income from wildlife (tourism, hunting) with communities, giving them an incentive to protect it.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which is a role of the Environmental Management Agency (EMA)?",
    options: [
      ["Reviewing environmental impact assessments", "Correct."],
      ["Setting the international rules on trade in ivory", "International trade is regulated through CITES."],
      ["Publishing the global Red List of threatened species", "That is the IUCN."],
      ["Sharing hunting revenue with rural district councils", "That is part of CAMPFIRE."],
    ],
    answer: "A",
    explanation: "EMA enforces environmental law, including impact assessments, pollution control and environmental education.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why is dehorning used to protect white rhinos?",
    options: [
      ["It removes the horn, so the rhino is less valuable to poachers", "Correct: reduces the incentive."],
      ["It stops the horn regrowing, so the rhino is protected for life", "The keratin horn regrows; dehorning must be repeated."],
      ["It makes the rhino more aggressive, so poachers keep away", "This is not the purpose."],
      ["It allows vets to fit radio collars more easily", "Collars are not fitted to horns."],
    ],
    answer: "A",
    explanation: "A dehorned rhino offers little reward to poachers; the horn regrows, so it is repeated every year or two.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why does the population of a large, slow-breeding mammal such as the elephant take a long time to recover after heavy poaching?",
    options: [
      ["Long gestation and long gaps between calves give a low birth rate", "Correct."],
      ["Elephants cannot breed until they have reached about 50 years of age", "Elephants mature far earlier than this."],
      ["Poached elephants are usually the young calves rather than the adults", "Poachers target adults with large tusks."],
      ["Elephants can only breed when they have been moved to a sanctuary", "Elephants breed in the wild."],
    ],
    answer: "A",
    explanation: "Gestation is about 22 months and calves come about every 4-5 years, so numbers rise slowly.",
    hints: ["Think about the birth rate."],
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Elephants in a park are concentrated near artificial water points in the dry season. Which effect is most likely near the water points?",
    options: [
      ["Woodland is damaged as trees are pushed over and debarked", "Correct: browsing pressure exceeds regrowth."],
      ["Woodland thickens because elephant dung fertilises the soil", "Damage outweighs any fertilising effect near water."],
      ["Species diversity of plants rises because of extra water", "Heavy use usually lowers plant diversity."],
      ["Grass cover increases because elephants avoid eating grass", "Elephants eat large amounts of grass."],
    ],
    answer: "A",
    explanation: "High elephant density exceeds the local carrying capacity; trees are broken, uprooted and debarked faster than they regrow.",
    hints: ["What happens when many large browsers stay in one area?"],
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Under CITES, what is the general rule for species listed on Appendix I?",
    options: [
      ["International commercial trade in them is not permitted", "Correct."],
      ["Trade is allowed with permits showing it does no harm", "This describes Appendix II."],
      ["Hunting them within their home country is always illegal", "CITES regulates international trade, not domestic hunting."],
      ["They are protected only inside national parks", "CITES is about trade between countries."],
    ],
    answer: "A",
    explanation: "Appendix I: species threatened with extinction; commercial international trade banned. Appendix II: trade controlled by permits.",
    hints: ["CITES is about trade between countries."],
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which argument is used by those who oppose any legal sale of stockpiled ivory?",
    options: [
      ["Legal ivory may raise demand and help launder illegal ivory", "Correct: concerns about laundering and demand."],
      ["Ivory from natural deaths has no value to buyers anywhere in the world", "Stockpiled ivory is valuable."],
      ["Money from sales could not legally be spent on any form of conservation", "Proponents propose using it for conservation."],
      ["Elephant populations in southern Africa are all far below carrying capacity", "This is not the argument used; some are locally high."],
    ],
    answer: "A",
    explanation: "Opponents argue that legal sales can increase demand and make illegal ivory harder to detect; supporters argue that sales of stockpiles could fund conservation.",
    hints: ["Think about what happens to demand and enforcement."],
  });

  b.tf({
    d: 1, skill: "RECALL",
    stem: "Rhino horn is made of keratin, the same protein found in hair and nails.",
    answer: true,
    explanation: "True. This is why it regrows after dehorning.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The white rhinoceros is mainly a browser that feeds on the leaves of shrubs.",
    answer: false,
    explanation: "False. The white rhino is a grazer with a wide, square lip; the black rhino is the browser with a hooked lip.",
  });

  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each organisation or agreement with its role.",
    pairs: [
      ["CITES", "Regulates international trade in wildlife products"],
      ["EMA", "Enforces environmental law and impact assessments"],
      ["CAMPFIRE", "Shares wildlife income with rural communities"],
      ["ZimParks", "Manages wildlife in national parks"],
    ],
    explanation: "CITES (international trade), EMA (environmental law), CAMPFIRE (community benefits), ZimParks (parks and wildlife).",
  });
  b.fib({
    d: 2,
    stem: "Choose the correct words.",
    template: "Moving rhinos from an area of high poaching risk to a guarded conservancy is called {{blank:a}}. It also helps to maintain {{blank:b}} diversity by mixing animals from different populations. The largest population that the habitat can support in the long term is its {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["translocation"], choices: ["translocation", "dehorning", "culling"] },
      { id: "b", accepted: ["genetic"], choices: ["genetic", "habitat", "species"] },
      { id: "c", accepted: ["carrying capacity"], choices: ["carrying capacity", "population density", "biomass"] },
    ],
    explanation: "Translocation; genetic diversity; carrying capacity.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Give the full name for which CITES is the abbreviation.",
    accepted: [
      "Convention on International Trade in Endangered Species of Wild Fauna and Flora",
      "Convention on International Trade in Endangered Species",
      "the Convention on International Trade in Endangered Species of Wild Fauna and Flora",
      "the Convention on International Trade in Endangered Species",
    ],
    wrong: ["Conservation of International Threatened Endangered Species"],
    explanation: "Convention on International Trade in Endangered Species of Wild Fauna and Flora.",
  });

  // Numerical: density (new data)
  const n = 2310, area = 1400;
  const dens = n / area;
  b.num({
    d: 2, skill: "APPLICATION",
    stem: `An illustrative aerial count found ${n} elephants in a wildlife area of ${area} km². Calculate the density of elephants in elephants per km², to two decimal places.`,
    value: dens, dp: 2, wrong: [Math.round((area / n) * 100) / 100],
    explanation: `${n} ÷ ${area} = ${dpStr(dens, 2)} elephants per km². Dividing area by number gives the area per elephant instead.`,
  });
  // Calculation: years to recover
  const r0 = 52, poached = 9;
  const rem = r0 - poached;
  const pc = pctChange(r0, rem);
  calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `An illustrative sanctuary held ${r0} white rhinos. In one year ${poached} were poached and no calves were born. Calculate the percentage decrease in the population. Give your answer to one decimal place.`,
    value: -pc, dp: 1, unit: "%", wrong: [Math.round((poached / rem) * 1000) / 10],
    explanation: t`1. Population after the losses $= ${r0} - ${poached} = ${rem}$.
2. Percentage decrease $= \dfrac{${poached}}{${r0}} \times 100 = ${dpStr(-pc, 1)}\%$.
3. Dividing by ${rem} instead of ${r0} gives ${dpStr((poached / rem) * 100, 1)}%, which uses the wrong base.`,
    hints: ["Use the starting population as the base."],
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain how the CAMPFIRE programme is intended to help conserve elephants in communal areas.",
    points: [
      "Communities (through rural district councils) are given authority over wildlife on their land",
      "Income from safari hunting quotas and tourism is shared with communities",
      "Money funds local projects / household income, so wildlife is seen as valuable rather than only a pest",
      "Communities therefore have an incentive to protect wildlife habitat, report poachers and tolerate some crop damage",
    ],
    modelAnswer: "CAMPFIRE gives rural district councils, on behalf of communities, authority over wildlife on communal land. Income from regulated safari hunting and photographic tourism is shared with the communities and used for schools, clinics, boreholes or cash dividends. Because elephants bring benefits, people see them as a resource rather than just a pest, so they have an incentive to keep wildlife habitat, report poachers and tolerate some crop damage.",
    explanation: "Benefits → incentive → protection.",
    hints: ["Why would a farmer protect an animal that eats his crops?"],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 5,
    stem: "Discuss the arguments for and against culling elephants in an area where their numbers exceed the carrying capacity of the habitat.",
    points: [
      "For: high densities destroy woodland, reducing habitat for other species / biodiversity",
      "For: reduces human-wildlife conflict and crop raiding / may provide meat and income for communities",
      "Against: ethical objections to killing intelligent, social animals; culling disrupts family groups",
      "Against: may harm tourism and the country's image; alternatives exist (translocation, closing water points, contraception, corridors)",
      "Balanced conclusion: decision should depend on monitoring data and alternatives considered first / numbers may fall naturally in drought",
    ],
    modelAnswer: "Supporters of culling argue that too many elephants destroy woodland, reducing habitat and food for other species and lowering biodiversity, and that fewer elephants means less crop raiding, while meat and income can benefit communities. Opponents argue that killing intelligent, social animals is unethical and disrupts family groups, that it may damage tourism and the country's reputation, and that alternatives such as translocation, closing some artificial water points, contraception and corridors to other areas exist. A balanced view is that decisions should be based on careful monitoring of both elephants and vegetation, with alternatives tried first.",
    explanation: "Arguments on both sides, attributed to groups, plus a conclusion.",
    hints: ["Consider the habitat, people, ethics and alternatives."],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Suggest three economic benefits to Zimbabwe of conserving elephants and rhinos.",
    points: [
      "Tourism brings foreign currency",
      "Jobs in lodges, as guides and rangers / income for local communities through CAMPFIRE",
      "Revenue from regulated trophy hunting or park fees funds conservation",
    ],
    modelAnswer: "Wildlife tourism earns foreign currency for the country. It provides jobs in lodges and as guides and rangers, and CAMPFIRE passes income to rural communities. Park fees and regulated hunting generate revenue that can be used for conservation.",
    explanation: "Tourism, employment and revenue.",
    hints: ["Who pays to see or hunt wildlife?"],
  });

  // Practice structured: illustrative elephant counts and crop damage
  const yr = [2011, 2014, 2017, 2020, 2023];
  const eles = [820, 905, 990, 1060, 1150];
  const raids = [34, 41, 57, 66, 79];
  b.struct({
    d: 4, skill: "ANALYSIS",
    stem: `Illustrative data for a wildlife area bordering farmland in the Zambezi valley.\n\n${table(["Year", ...yr.map(String)], [["Elephants counted", ...eles.map(String)], ["Crop-raiding incidents reported", ...raids.map(String)]])}`,
    parts: [
      P.num({
        label: "(a)", marks: 2, stem: "Calculate the percentage increase in elephants from 2011 to 2023. Give your answer to one decimal place.",
        value: pctChange(eles[0], eles[4]), dp: 1, unit: "%", wrong: [Math.round(pctChange(raids[0], raids[4]) * 10) / 10],
        explanation: `(${eles[4]} − ${eles[0]}) ÷ ${eles[0]} × 100 = ${dpStr(pctChange(eles[0], eles[4]), 1)}%.`,
      }),
      P.manual({
        label: "(b)", marks: 2, stem: "Describe the relationship between elephant numbers and crop raiding.",
        points: ["As elephant numbers increase (820 to 1150), crop-raiding incidents increase (34 to 79): positive correlation", "Raids increase proportionally faster than elephants (more than double, while elephants rose by about 40%)"],
        modelAnswer: "Both increase together: elephants rose from 820 to 1150 and raids from 34 to 79, a positive correlation. Raids more than doubled while elephants increased by about 40%, so raids rose proportionally faster.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Suggest why crop raiding increased faster than elephant numbers.",
        points: ["As numbers approach carrying capacity, food in the wildlife area becomes scarcer, so more elephants seek food on farms", "Farmland may have expanded towards the park boundary / drought reduced natural food"],
        modelAnswer: "As the population approaches the carrying capacity, natural food becomes scarce, so a greater proportion of elephants leave to feed on crops. Farmland may also have expanded closer to the boundary.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Suggest two measures that could reduce human-elephant conflict without killing elephants.",
        points: ["Fences (electric) / buffer crops such as chilli or beehive fences / early warning and guarding", "Land-use planning to keep fields away from corridors / translocation / compensation or CAMPFIRE income to offset losses"],
        modelAnswer: "Electric or beehive fences and chilli barriers can deter elephants from fields. Land-use planning can keep fields away from elephant corridors, and CAMPFIRE income or compensation can offset losses.",
      }),
    ],
    explanation: "Positive relationship; scarcity near carrying capacity; non-lethal measures.",
    hints: ["Compare the proportional increases."],
    calculator: true,
  });
  b.struct({
    d: 4, skill: "APPLICATION",
    stem: "A newspaper reports that a conservancy in the lowveld plans to dehorn all its rhinos, increase ranger patrols and translocate ten rhinos to a new sanctuary in another province.",
    parts: [
      P.manual({
        label: "(a)", marks: 2, stem: "Explain why dehorning must be repeated every one to two years.",
        points: ["Horn is keratin and regrows continuously", "Regrown horn again becomes valuable to poachers"],
        modelAnswer: "Rhino horn is made of keratin and grows continuously from its base, so after a year or two there is enough horn to attract poachers again.",
      }),
      P.manual({
        label: "(b)", marks: 3, stem: "Give three biological advantages of translocating ten rhinos to a new sanctuary.",
        points: ["Spreads the population so one poaching or disease event cannot kill all the rhinos", "Reduces density / competition for food in the conservancy, raising breeding rate", "Starts a new breeding population / allows gene flow when animals are moved between populations"],
        modelAnswer: "Splitting the population means a single disease outbreak or poaching gang cannot destroy all the rhinos. It reduces density and competition for grazing, which can increase breeding. It also starts a new breeding population and, when animals are moved between populations, maintains genetic diversity.",
      }),
      P.mcq({
        label: "(c)", stem: "Which organisation would review an environmental impact assessment if the new sanctuary required a large dam?",
        options: [
          ["The Environmental Management Agency", "Correct."],
          ["The CITES Secretariat in Geneva", "CITES regulates international trade."],
          ["The CAMPFIRE committee of the district", "CAMPFIRE manages community wildlife income."],
          ["The IUCN Red List authority", "IUCN assesses extinction risk of species."],
        ],
        answer: "A",
        explanation: "EMA reviews environmental impact assessments in Zimbabwe.",
      }),
    ],
    explanation: "Dehorning, translocation and EMA's role.",
    hints: ["What is horn made of?"],
  });

  b.card("FACT", "Scientific names: African elephant and white rhino", "*Loxodonta africana*; *Ceratotherium simum* (black rhino: *Diceros bicornis*).");
  b.card("DEFINITION", "What is CAMPFIRE?", "Communal Areas Management Programme for Indigenous Resources: communities manage and benefit from wildlife (tourism, hunting income).");
  b.card("FACT", "Roles of EMA", "Environmental impact assessments, pollution and waste regulation, monitoring, enforcement of environmental law, education.");
  b.card("CONCEPT", "CITES appendices", "Appendix I: commercial international trade banned. Appendix II: trade only with permits showing it is not harmful.");
  b.card("FACT", "Why dehorn rhinos?", "Removes the poachers' reward; horn is keratin and regrows, so it is repeated.");
  b.card("CONCEPT", "Threats to elephants and rhinos", "Poaching (ivory, horn), habitat loss, human-wildlife conflict, drought; slow breeding slows recovery.");
  b.card("CONCEPT", "Problems of elephant overpopulation", "Above carrying capacity, elephants destroy woodland, harming other species, and raid crops more often.");
  b.card("CONCEPT", "The ivory trade debate", "For sales: fund conservation from stockpiles. Against: may raise demand and help launder illegal ivory.");
  b.card("FACT", "Elephant and rhino breeding rates", "Elephant: gestation about 22 months, calf every 4-5 years. White rhino: about 16 months, calf every 2-3 years.");
});
