// Slice G4b: settlement types, site and situation, rural patterns, land-use laws, safe siting (ZIMSEC 7.11.1).
import { concept, P, geographyLevels } from "../lib.mjs";

concept("geo.settlement.types-site-patterns", { file: "settlement/types-site-patterns", keyPrefix: "settlement.types-site-patterns" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is meant by the **site** of a settlement?",
    options: [
      ["The actual land on which the settlement is built", "Correct: site describes the ground itself: relief, soil, drainage and water."],
      ["Its position in relation to routes and other places", "That is the situation of a settlement."],
      ["The area served by its shops and services", "That is the sphere of influence."],
      ["The number of people who live in the settlement", "That is population size, not site."],
    ],
    answer: "A",
    explanation: "Site = the land the settlement stands on; situation = its position relative to its surroundings.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which settlement pattern has homesteads spread out singly across farmland?",
    options: [
      ["Dispersed", "Correct: single homesteads separated by fields or grazing land."],
      ["Nucleated", "Nucleated homesteads are grouped closely together."],
      ["Linear", "Linear settlements form a line along a road, river or valley."],
      ["Planned grid", "A grid is a street layout found in towns, not a rural pattern."],
    ],
    answer: "A",
    explanation: "Dispersed = scattered single homesteads.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which statement describes the **situation** of a settlement?",
    options: [
      ["It lies where a main road crosses a railway", "Correct: this relates the settlement to routes around it."],
      ["It is built on a gentle, well-drained slope", "This describes the land itself, which is site."],
      ["It stands on fertile red soils", "Soil on the spot is a site factor."],
      ["It is next to a spring that supplies water", "A water source on the spot is a site factor."],
    ],
    answer: "A",
    explanation: "Situation is about links with routes, resources and other settlements.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Homesteads in a communal area are grouped closely round the only borehole. Which pattern is this, and why?",
    options: [
      ["Nucleated, because families share one water source", "Correct: a single water point draws homesteads together."],
      ["Linear, because families share one water source", "A linear pattern follows a road or river in a line."],
      ["Dispersed, because water is found everywhere", "Water is found at only one point here."],
      ["Dispersed, because families share one water source", "Sharing one water point produces clustering, not scattering."],
    ],
    answer: "A",
    explanation: "A shared, limited water supply produces a nucleated pattern.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which pattern is most typical of large commercial farms and ranches?",
    options: [
      ["Dispersed", "Correct: each farmhouse stands on its own large holding."],
      ["Nucleated", "Clustering is unlikely where each farm covers a large area."],
      ["Linear", "Farmhouses on large farms are not usually lined along one road."],
      ["Ribbon development", "Ribbon development is another name for linear settlement."],
    ],
    answer: "A",
    explanation: "Large landholdings keep homesteads far apart.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why did many settlements in the past choose hilltop sites?",
    options: [
      ["They were easier to defend", "Correct: height gave a view of attackers and was hard to climb."],
      ["They had the deepest, most fertile soils", "Hilltops usually have thin soils."],
      ["They were closest to river water", "Rivers are found in valleys, not on hilltops."],
      ["They were protected from all winds", "Hilltops are exposed to wind."],
    ],
    answer: "A",
    explanation: "Defence was a key site factor in the past.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    hints: ["Which factor explains growth, not just the original choice of site?"],
    stem: "Two villages have similar sites. One has grown into a busy town, the other has not. Which factor most likely explains the difference?",
    options: [
      ["The town is at a junction of main roads", "Correct: a route centre attracts trade, services and people."],
      ["The town has a spring for water", "Both villages have similar sites, so water does not explain the difference."],
      ["The town is on gently sloping land", "Slope is a site factor, which is similar in both."],
      ["The town's soils are slightly more fertile", "Soils alone rarely turn a village into a town."],
    ],
    answer: "A",
    explanation: "Situation, such as being a route centre, explains why some settlements grow.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    hints: ["Think about which hazard each site faces."],
    stem: "A council is choosing a site for new houses. Which site is safest?",
    options: [
      ["A gentle slope above the highest flood level", "Correct: it avoids both flooding and landslides."],
      ["A flat flood plain beside the river, close to water", "Flood plains are flooded during heavy rain."],
      ["A steep slope with deep, loose soil and good views", "Saturated deep soil on steep slopes can slide, as in Cyclone Idai."],
      ["A drained vlei close to the town centre", "Vleis (wetlands) flood and are protected by law."],
    ],
    answer: "A",
    explanation: "Safe sites avoid flood plains, steep unstable slopes and wetlands.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    hints: ["Match the hazard to the building feature."],
    stem: "Which building feature best protects a house against **strong winds** during a tropical cyclone?",
    options: [
      ["Roof sheets bolted and tied firmly to the walls", "Correct: secure roofs are not lifted off by strong winds."],
      ["A floor raised on a concrete platform", "Raised floors protect against flooding, not wind."],
      ["A retaining wall behind the house", "Retaining walls protect against landslides."],
      ["Wide storm drains along the street", "Drains help with floodwater, not wind."],
    ],
    answer: "A",
    explanation: "Each resilient feature targets a particular hazard.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Urban settlements usually offer more services than rural settlements.",
    answer: true,
    explanation: "True. Towns have hospitals, banks, colleges and many shops; rural areas have few services.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A settlement built along a road in a narrow valley is likely to have a dispersed pattern.",
    answer: false,
    explanation: "False. A narrow valley floor and a road produce a linear pattern.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each site factor with the advantage it gives a settlement.",
    pairs: [
      ["Wet-point site", "Reliable water from a spring, river or groundwater"],
      ["Dry-point site", "Raised, well-drained land above flooding"],
      ["Hilltop site", "Easier defence against attack"],
      ["Gentle slope", "Easy building and good drainage"],
    ],
    explanation: "Different site factors meet different needs.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct word for each gap.",
    template: "A settlement whose buildings form a line along a road has a {{blank:a}} pattern. The area served by a settlement's shops and services is its sphere of {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["linear"], choices: ["linear", "nucleated", "dispersed", "radial"] },
      { id: "b", accepted: ["influence"], choices: ["influence", "situation", "hierarchy", "density"] },
    ],
    explanation: "Linear settlements follow lines of communication; the sphere of influence is the area a settlement serves.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the Zimbabwean Act that requires an environmental impact assessment before major projects.",
    accepted: ["Environmental Management Act", "the Environmental Management Act", "EMA", "Environmental Management Act Chapter 20:27"],
    wrong: ["Communal Land Act"],
    explanation: "The Environmental Management Act requires EIAs and protects wetlands and river banks.",
  });
  b.num({
    d: 2, skill: "APPLICATION", unit: "km",
    stem: "On a fictional 1:50 000 map, a village is 6 cm from the nearest business centre. What is the real distance in kilometres?",
    value: 3, tol: 0,
    wrong: [30, 0.3],
    explanation: "1 cm represents 0.5 km, so 6 × 0.5 = 3 km.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Describe **three** differences between rural and urban settlements.",
    points: [
      "Size: rural settlements are small, urban settlements large.",
      "Activities: rural mainly primary (farming); urban mainly secondary and tertiary.",
      "Services/density: rural have few services and low density; urban have many services and high density.",
    ],
    modelAnswer: "Rural settlements are small homesteads and villages, while towns are large. Rural people mainly farm, while urban people work in factories, shops and offices. Towns have many services such as hospitals and banks and buildings close together; villages have few services and homesteads spread out.",
    explanation: "Each difference should compare both types.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    hints: ["Think of water, defence, social ties and planning."],
    stem: "Explain why rural settlements in some communal areas of Zimbabwe have a nucleated pattern.",
    points: [
      "Shared water supply: homesteads cluster round a borehole, well or spring.",
      "Services such as a school, clinic, business centre or grinding mill attract homesteads.",
      "Kinship and social ties: extended families live close together / near the headman's homestead.",
      "Land-use planning (villages kept off arable and grazing land) / limited flat land / defence in the past.",
    ],
    modelAnswer: "Where water comes from one borehole, families build close to it. Schools, clinics and business centres also draw homesteads together, and extended families like to live near each other and the headman. Planning has also placed homes in villages so that arable land and grazing land are kept separate.",
    explanation: "Each reason should explain why people cluster.",
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 6,
    hints: ["Consider where people should build and how they should build.", "Use Cyclone Idai as an example."],
    stem: "With reference to a named disaster in Zimbabwe, discuss how the siting and design of settlements can reduce the impact of natural hazards.",
    points: [
      "Names the disaster: Cyclone Idai, March 2019, Chimanimani and Chipinge.",
      "Describes the damage: homes on steep slopes and near rivers destroyed by landslides and floods.",
      "Siting: avoid flood plains, river banks, steep unstable slopes and wetlands; use hazard maps and EIAs.",
      "Design: strong foundations, raised floors, roofs tied down, bridges and culverts sized for floods, good drains.",
      "Slope protection, evacuation routes, shelters and early warning save lives.",
      "Judgement: resilient design costs more and safe land may be scarce, but it reduces deaths and rebuilding costs.",
    ],
    levels: geographyLevels(6),
    modelAnswer: "Cyclone Idai struck Chimanimani and Chipinge in March 2019. Extreme rain caused floods and landslides that destroyed homes built close to rivers and on steep slopes. Settlements are safer if they avoid flood plains, river banks, wetlands and steep slopes with deep soils, and councils can use hazard maps and environmental impact assessments before allowing building. Design also matters: strong foundations, raised floors, firmly fixed roofs, bridges and culverts large enough for floods and good storm drains reduce damage, while terraces, retaining walls and trees stabilise slopes. Early warnings, evacuation routes and shelters on high ground save lives. These measures cost more and safe land is not always available, but they are cheaper than rebuilding after a disaster and they save lives.",
    explanation: "Combine safe siting with resilient design and reach a judgement.",
  });
  b.struct({
    d: 3, skill: "ANALYSIS", secs: 600,
    stem: "Map extract (fictional area): scale 1:50 000, grid squares 1 km, contour interval 20 m. Each cell lists the features in that square.\n\n| N \\ E | 21 | 22 | 23 |\n|---|---|---|---|\n| 48 | Steep hill, spot height 1426 m at 215 485; 2 huts | 1 hut; dense contours | 1 hut |\n| 47 | 16 huts clustered round a borehole at 217 474; school at 214 472 | 1 hut; gentle slope | Main road runs W-E; 11 huts along the road |\n| 46 | River flows W-E; marsh along the banks | Bridge at 226 465; store at 227 466 | Main road continues E; 1 hut |",
    hints: ["The four-figure reference uses the south-west corner of the square.", "Look at what each group of huts is close to."],
    parts: [
      P.short({
        label: "(a)", stem: "Give the four-figure grid reference of the square with the nucleated settlement.",
        accepted: ["2147", "21 47"], wrong: ["2148"],
        explanation: "The cluster of 16 huts round the borehole is in the square east of line 21 and north of line 47: 2147.",
      }),
      P.mcq({
        label: "(b)", stem: "Which pattern is shown in square 2347?",
        options: [
          ["Linear", "Correct: the huts line the main road."],
          ["Nucleated", "The huts are in a line, not a cluster."],
          ["Dispersed", "Eleven huts along one road are not scattered."],
          ["Isolated", "Isolated means a single homestead."],
        ],
        answer: "A", explanation: "Huts along a road form a linear pattern.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Suggest **two** reasons why few people live in square 2146.",
        points: ["Marshy ground along the river is wet and floods.", "Wet ground breeds mosquitoes / is hard to build on and is a protected wetland."],
        modelAnswer: "The marsh along the river floods and is too wet to build on, and stagnant water breeds mosquitoes.",
        explanation: "Link the evidence (marsh, river) to reasons.",
      }),
      P.manual({
        label: "(d)", marks: 3, stem: "Explain how the site and situation of the settlement in square 2147 have attracted people.",
        points: ["Site: the borehole supplies water.", "Site: the land is gentler than the steep hill to the north / above the marsh.", "Situation: the school is close by / the bridge and store to the south-east give access to the road and goods."],
        modelAnswer: "People cluster round the borehole, which provides water, on land that is above the marsh but not as steep as the hill. The school is next door and the bridge and store are close, linking the village to the main road.",
        explanation: "Separate site (the ground) from situation (links).",
      }),
    ],
    explanation: "This item practises reading settlement patterns and site factors from a map grid.",
  });
  b.struct({
    d: 3, skill: "APPLICATION", secs: 480,
    stem: "Table 1 shows the services found in five fictional settlements in a district (fictional data).\n\n| Settlement | Population | Number of different services |\n|---|---|---|\n| P | 420 | 3 |\n| Q | 2,600 | 11 |\n| R | 180 | 1 |\n| S | 14,500 | 34 |\n| T | 950 | 6 |",
    hints: ["Order the settlements by population and by services."],
    parts: [
      P.mcq({
        label: "(a)", stem: "Which settlement is at the top of the district's settlement hierarchy?",
        options: [
          ["S", "Correct: it has the largest population and the most services."],
          ["Q", "Q is second in size and services."],
          ["T", "T is mid-ranked."],
          ["R", "R is the smallest, at the bottom of the hierarchy."],
        ],
        answer: "A", explanation: "The settlement with most people and services is at the top.",
      }),
      P.num({ label: "(b)", stem: "How many more services does S have than Q?", value: 23, wrong: [45, 11], explanation: "34 − 11 = 23." }),
      P.manual({
        label: "(c)", marks: 3, stem: "Describe the relationship between population and number of services shown in Table 1, and suggest a reason for it.",
        points: ["As population increases, the number of services increases (positive relationship).", "Uses figures, e.g. R 180 people and 1 service; S 14,500 people and 34 services.", "Reason: larger settlements have more customers (a larger threshold population) to support more services."],
        modelAnswer: "Larger settlements have more services: R with 180 people has 1 service, while S with 14,500 people has 34. This is because more people provide enough customers to support more shops and services.",
        explanation: "Describe the trend with data, then explain it.",
      }),
    ],
    explanation: "This item practises the settlement hierarchy using data.",
  });

  b.card("DEFINITION", "Site", "The actual land a settlement is built on: relief, soil, drainage, water supply.");
  b.card("DEFINITION", "Situation", "The position of a settlement relative to its surroundings: routes, resources, rivers and other settlements.");
  b.card("CONCEPT", "Site factors", "Water supply, gentle relief, fertile soil, defence, building materials and fuel, shelter, freedom from floods and disease.");
  b.card("VOCABULARY", "Nucleated pattern", "Homesteads grouped closely together, e.g. round a borehole, school or business centre.");
  b.card("VOCABULARY", "Dispersed pattern", "Single homesteads scattered across farmland, typical of large farms and ranches.");
  b.card("VOCABULARY", "Linear pattern", "Buildings in a line along a road, railway, river, valley floor or ridge.");
  b.card("DEFINITION", "Settlement hierarchy", "Ranking of settlements by size and number of services, from homestead to capital city.");
  b.card("FACT", "Land-use laws in Zimbabwe", "Regional, Town and Country Planning Act; Urban Councils Act; Rural District Councils Act; Communal Land Act; Environmental Management Act.");
  b.card("CONCEPT", "Disaster-resilient infrastructure", "Strong foundations, raised floors, roofs tied down, large culverts and drains, slope protection, evacuation routes and early warning.");
});
