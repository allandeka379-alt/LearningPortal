// Slice G4b: unplanned urban settlements (ZIMSEC 7.11.4; Cambridge 7.2.2).
import { concept, P, ZIM, geographyLevels } from "../lib.mjs";

concept("geo.settlement.unplanned", { file: "settlement/unplanned", keyPrefix: "settlement.unplanned" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which is a typical characteristic of an unplanned settlement?",
    options: [
      ["Residents have no legal title to the land", "Correct: insecure tenure is a defining feature."],
      ["Every house has piped water and sewerage", "Unplanned settlements lack such services."],
      ["Large plots with gardens and swimming pools", "This describes low-density suburbs."],
      ["Wide tarred roads laid out by the council", "Roads are usually narrow, unpaved paths."],
    ],
    answer: "A",
    explanation: "Unplanned settlements lack permission, tenure and services.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is **in-situ upgrading**?",
    options: [
      ["Improving a settlement where it stands", "Correct: services are added without moving residents."],
      ["Moving residents to a new town", "That is relocation."],
      ["Demolishing all informal homes", "That is clearance."],
      ["Building high-rise offices on the site", "That is redevelopment for commercial use."],
    ],
    answer: "A",
    explanation: "Upgrading adds water, sanitation, roads and power in place.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why do many unplanned settlements develop on flood plains and wetlands?",
    options: [
      ["The land is unused because it is hazardous", "Correct: nobody else wants it, so people can occupy it."],
      ["The land has the best views in the city", "Views are not the reason."],
      ["The council has built services there", "Such areas are usually unserviced."],
      ["The land is the most expensive in town", "Hazardous land is cheap or unclaimed."],
    ],
    answer: "A",
    explanation: "Marginal, hazardous land is often the only land available to the poor.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which effect of unplanned settlements is **environmental**?",
    options: [
      ["Polluted streams", "Correct: this affects the natural environment."],
      ["A busy informal economy", "This is economic."],
      ["Fear of eviction", "This is social."],
      ["Strong community spirit", "This is social."],
    ],
    answer: "A",
    explanation: "Effects can be grouped as social, economic and environmental.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why does giving residents **security of tenure** often lead to better housing?",
    options: [
      ["Residents are willing to invest in homes they cannot lose", "Correct: security encourages improvement."],
      ["The council then builds every house for free", "Tenure does not mean free houses."],
      ["It forces all residents to move away", "Tenure lets residents stay."],
      ["It stops any new people arriving in the city", "It does not control migration."],
    ],
    answer: "A",
    explanation: "People improve homes when they are sure they will stay.",
  });
  b.mcq({
    d: 2, skill: "RECALL", applies: ZIM,
    stem: "Which settlement on the south-eastern edge of Harare grew largely without planning and has been the focus of regularisation and upgrading?",
    options: [
      ["Epworth", "Correct: it grew from a mission settlement into a large informal settlement."],
      ["Borrowdale", "Borrowdale is a planned low-density suburb."],
      ["Mount Pleasant", "Mount Pleasant is a planned low-density suburb."],
      ["Msasa", "Msasa is an industrial area."],
    ],
    answer: "A",
    explanation: "Epworth is Harare's best-known example of regularisation and upgrading.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    hints: ["What do formal building standards do to the price of a house?"],
    stem: "A city has strict building standards requiring brick houses with tiled roofs on large plots. How might this contribute to unplanned settlements?",
    options: [
      ["Legal houses become too expensive for poor families", "Correct: high standards price the poor out of formal housing."],
      ["It makes every family able to afford a house", "Higher standards raise costs."],
      ["It stops people migrating to the city", "Standards do not control migration."],
      ["It provides free land for all migrants", "Standards do not provide land."],
    ],
    answer: "A",
    explanation: "Unaffordable standards push the poor into informal housing.",
  });
  b.mcq({
    d: 3, skill: "EVALUATION",
    hints: ["What happens to people and livelihoods after each approach?"],
    stem: "Why is upgrading usually considered better than clearing an unplanned settlement?",
    options: [
      ["It keeps communities and livelihoods in place", "Correct: residents keep their homes, networks and businesses."],
      ["It costs nothing at all", "Upgrading needs funding."],
      ["It removes all residents from the city", "Upgrading keeps residents."],
      ["It needs no involvement from residents", "Upgrading works best with community participation."],
    ],
    answer: "A",
    explanation: "Clearance without alternatives moves the problem; upgrading improves conditions in place.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    hints: ["Which hazard is most linked to close-packed homes with open fires and no roads?"],
    stem: "In an unplanned settlement, homes are tightly packed, families cook on open fires and there are no roads. Which hazard is most increased?",
    options: [
      ["Fast-spreading fires", "Correct: close-packed homes and no access for fire engines."],
      ["Earth tremors", "Earthquakes and tremors are not caused by housing density."],
      ["Prolonged drought", "Drought is a climatic hazard."],
      ["Ground frost", "Frost is a weather hazard unrelated to layout."],
    ],
    answer: "A",
    explanation: "Density, open fires and poor access raise fire risk.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Many residents of unplanned settlements earn a living in the informal sector.",
    answer: true,
    explanation: "True. Vending, tailoring, carpentry and welding are common.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Mbare is an unplanned settlement because it is a crowded high-density suburb.",
    answer: false,
    explanation: "False. Mbare is a planned high-density suburb with council services; crowding alone does not make an area unplanned.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each improvement measure with what it does.",
    pairs: [
      ["Regularisation", "Gives residents legal tenure"],
      ["In-situ upgrading", "Adds services where people already live"],
      ["Site-and-service scheme", "Provides new serviced plots for self-building"],
      ["Microcredit", "Small loans to improve homes or start businesses"],
    ],
    explanation: "Each measure tackles a different problem.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentence.",
    template: "Informal settlements in Brazil are called {{blank:a}}. The legal right to stay on land without fear of eviction is called security of {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["favelas"], choices: ["favelas", "townships", "growth points", "kopjes"] },
      { id: "b", accepted: ["tenure"], choices: ["tenure", "service", "density", "situation"] },
    ],
    explanation: "Favelas are Brazilian informal settlements; tenure is the right to occupy.",
  });
  b.num({
    d: 2, skill: "APPLICATION",
    stem: "A fictional informal settlement has 3,600 residents sharing 24 water standpipes (fictional data). How many people share each standpipe on average?",
    value: 150, tol: 0,
    wrong: [86400, 0.0067],
    explanation: "3,600 ÷ 24 = 150 people per standpipe.",
  });
  b.calc({
    d: 3, skill: "APPLICATION", unit: "%",
    hints: ["Find the increase in households with toilets.", "Divide by the total households."],
    stem: "Before upgrading, 210 of 1,400 households in a fictional settlement had a toilet. After upgrading, 980 had one (fictional data). By how many percentage points did the share of households with a toilet rise?",
    value: 55, tol: 0.05,
    wrong: [366.7, 70],
    workedSolution: "1. Before: 210 ÷ 1,400 × 100 = 15%.\n2. After: 980 ÷ 1,400 × 100 = 70%.\n3. Rise = 70 − 15 = 55 percentage points.",
    explanation: "15% → 70%: a rise of 55 percentage points.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** causes of unplanned settlements in towns of developing countries.",
    points: [
      "Rapid rural-urban migration / natural increase means population grows faster than housing.",
      "Explains that the housing shortage leaves newcomers with nowhere legal to live.",
      "Poverty: many cannot afford formal rents, house prices or building standards.",
      "Explains that they therefore build cheaply on unused or hazardous land / weak planning control allows it.",
    ],
    modelAnswer: "Towns grow rapidly through migration and natural increase, faster than councils can build houses, so many newcomers have nowhere legal to live. Many are poor and cannot afford formal rents or the cost of building to council standards, so they build cheap shelters on unused land.",
    explanation: "Two causes, each explained.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    hints: ["Think about water, sanitation, overcrowding and fire."],
    stem: "Describe the social effects of living in an unplanned settlement.",
    points: [
      "Water-borne diseases (cholera, typhoid, diarrhoea) from unsafe water and poor sanitation.",
      "Overcrowding spreads respiratory diseases such as TB.",
      "Fire risk, crime and insecurity / fear of eviction.",
      "Positive: strong community spirit, self-help groups and churches.",
    ],
    modelAnswer: "Unsafe water and pit latrines lead to cholera and diarrhoea, and crowded rooms spread TB. Fires spread quickly and residents live in fear of eviction and crime. However, many settlements have strong community groups that help each other.",
    explanation: "Social effects concern people's health, safety and community.",
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 7,
    hints: ["Compare clearance, relocation, upgrading and regularisation.", "Use a named example."],
    stem: "With reference to a named example, evaluate the measures that can be used to improve unplanned settlements.",
    points: [
      "Names an example (e.g. Epworth, Harare) and describes its conditions.",
      "Clearance/demolition: removes unsafe structures but destroys homes and livelihoods; problem moves elsewhere (e.g. 2005 operation).",
      "In-situ upgrading: water, sanitation, roads in place; keeps communities; needs funding.",
      "Regularisation and tenure: encourages residents to invest; requires surveying and fair processes.",
      "Site-and-service / low-cost housing: legal homes; may be unaffordable or far from jobs.",
      "Community participation and savings groups improve success.",
      "Supported judgement on the most effective combination.",
    ],
    levels: geographyLevels(7),
    modelAnswer: "Epworth on the edge of Harare grew largely without planning, with many homes lacking piped water and sewerage. Clearance, as in Zimbabwe's 2005 operation, removes structures but destroys homes and livelihoods; a UN report estimated around 700,000 people were affected, and many simply moved elsewhere. In-situ upgrading, adding water points, drains and roads, improves health while keeping communities and businesses in place, but it needs sustained funding. Regularisation, surveying plots and giving residents tenure, encourages families to build better homes, and in Epworth community savings groups helped map the settlement and contribute. Site-and-service schemes give legal plots but may be too expensive for the poorest or too far from jobs. The most effective approach combines regularisation and upgrading with community participation, and relocation only from genuinely hazardous sites.",
    explanation: "Evaluate several measures and judge.",
  });
  b.struct({
    d: 3, skill: "ANALYSIS", secs: 600,
    stem: "Table 1 compares a fictional unplanned settlement (U) with a fictional planned high-density suburb (H) in the same city (fictional data).\n\n| Indicator | U | H |\n|---|---|---|\n| Homes with piped water (%) | 8 | 72 |\n| Homes using a pit latrine or open space (%) | 85 | 10 |\n| Homes with legal title or lease (%) | 5 | 90 |\n| Cases of diarrhoea per 1,000 children last year | 260 | 95 |",
    hints: ["Compare U with H for each indicator.", "Link services to health."],
    parts: [
      P.num({ label: "(a)", stem: "How many more cases of diarrhoea per 1,000 children were there in U than in H?", value: 165, wrong: [355, 2.7], explanation: "260 − 95 = 165." }),
      P.mcq({
        label: "(b)", stem: "Which indicator best explains the higher rate of diarrhoea in U?",
        options: [
          ["Homes using a pit latrine or open space", "Correct: poor sanitation spreads water-borne disease."],
          ["Homes with legal title or lease", "Tenure affects investment, not disease directly."],
          ["The number of children in each settlement", "The rate is already per 1,000 children."],
          ["The distance of each settlement from the CBD", "The table does not give distance."],
        ],
        answer: "A", explanation: "Sanitation (with water supply) is the direct cause.",
      }),
      P.manual({
        label: "(c)", marks: 3, stem: "Using Table 1, describe the differences in living conditions between U and H.",
        points: ["Piped water: 8% in U compared with 72% in H.", "Sanitation: 85% use pit latrines or open space in U against 10% in H.", "Tenure: 5% have title in U against 90% in H."],
        modelAnswer: "Only 8% of homes in U have piped water against 72% in H. In U 85% use pit latrines or open spaces, compared with 10% in H, and only 5% have legal title compared with 90% in H.",
        explanation: "Use figures for both settlements.",
      }),
      P.manual({
        label: "(d)", marks: 3, stem: "Suggest **three** measures that would improve conditions in U.",
        points: ["Install communal or household water points / piped water.", "Build toilets and sewers or ventilated pit latrines; drains.", "Regularise plots and give residents tenure / health education / microcredit."],
        modelAnswer: "The council could install standpipes and later piped water, build toilet blocks and drains, and survey the plots to give residents leases so they invest in their homes.",
        explanation: "Measures should match the problems in the data.",
      }),
    ],
    explanation: "This item practises comparing settlements with data.",
  });
  b.struct({
    d: 3, skill: "APPLICATION", secs: 420,
    stem: "Description of a fictional city: an unplanned settlement of about 9,000 people lies on the flood plain of a river 2 km from the main industrial area. Homes are made of timber and metal sheets; residents collect water from the river and from two boreholes.",
    hints: ["Think about why people chose this site and what risks it brings."],
    parts: [
      P.manual({
        label: "(a)", marks: 2, stem: "Suggest **two** reasons why the settlement grew at this site.",
        points: ["Close to the industrial area, so residents can walk to work.", "The flood plain was unused / unclaimed land, with water from the river."],
        modelAnswer: "It is only 2 km from the factories, so people can walk to work, and the flood plain was empty land that no one else wanted, with water nearby.",
        explanation: "Link site to jobs and land availability.",
      }),
      P.num({ label: "(b)", stem: "On average, how many people share each borehole?", value: 4500, wrong: [18000, 9000], explanation: "9,000 ÷ 2 = 4,500 people." }),
      P.manual({
        label: "(c)", marks: 3, stem: "Describe **three** risks to residents of living on this site.",
        points: ["Flooding destroys homes and belongings.", "River water is polluted, causing water-borne disease.", "Fire spreads through timber homes / eviction because the land is not theirs."],
        modelAnswer: "The river can flood and wash away homes. River water may be polluted, causing cholera and diarrhoea. Timber homes burn easily, and residents could be evicted.",
        explanation: "Three distinct risks.",
      }),
    ],
    explanation: "This item practises reasoning about the site and risks of unplanned settlements.",
  });

  b.card("DEFINITION", "Unplanned (informal) settlement", "Housing built without planning permission, usually without legal tenure or adequate services.");
  b.card("DEFINITION", "Security of tenure", "The legal right to stay on land or in a house without fear of eviction.");
  b.card("DEFINITION", "In-situ upgrading", "Improving an informal settlement in place: water, sanitation, roads, drains, electricity.");
  b.card("DEFINITION", "Regularisation", "Official recognition of an informal settlement and legal tenure for residents.");
  b.card("CONCEPT", "Where unplanned settlements develop", "City edges, river banks, flood plains, wetlands, steep slopes, beside railways and industry, near dumps, in backyards.");
  b.card("CONCEPT", "Causes of unplanned settlements", "Rapid urban growth, poverty, housing shortage, costly building standards, weak planning, need to live near work.");
  b.card("CONCEPT", "Effects of unplanned settlements", "Disease, fire, eviction risk, pollution, loss of wetlands; but affordable homes, informal enterprise and community spirit.");
  b.card("FACT", "Epworth, Harare", "Grew largely without planning on Harare's south-eastern edge; focus of regularisation and upgrading with community groups.", undefined, { applies: ZIM });
  b.card("CONCEPT", "Measures to improve unplanned settlements", "Upgrading, regularisation, site-and-service, low-cost and self-help housing, community savings, relocation only from hazardous sites.");
});
