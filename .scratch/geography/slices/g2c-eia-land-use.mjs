// Slice G2c: environmental impact assessment and land-use planning (ZIMSEC 7.8.4).
import { concept, P, geographyLevels } from "../lib.mjs";

const PLAN = "**Table 1: Proposed land use in a fictional 120 ha town extension (fictional data)**\n\n| Land use | Area (ha) |\n|---|---|\n| Residential | 66 |\n| Industrial | 18 |\n| Commercial (shops and offices) | 6 |\n| Roads | 15 |\n| Open space and wetland | 15 |\n\nIn the draft plan the industrial zone lies directly beside the wetland, upstream of the residential zone.";

const QUARRY = "**A proposed project (fictional):** a company plans to open a granite quarry on a hill 800 m east of a primary school and village. The prevailing wind blows from east to west. A stream that the village uses for water flows past the foot of the hill to a small dam. Blasting would take place several times a week, and lorries would use a new gravel road through village grazing land. The company says it would employ about 60 local people.";

concept("geo.environment.eia-land-use", { file: "environment/eia-land-use", keyPrefix: "environment.eia-land-use" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the **first** stage of an environmental impact assessment?",
    options: [
      ["Screening", "Correct: it decides whether a full EIA is needed."],
      ["Monitoring", "Monitoring takes place after the project has been approved and started."],
      ["Review and decision", "The review comes after the EIA report has been written."],
      ["Writing the EIA report", "The report summarises the findings near the end."],
    ],
    answer: "A",
    explanation: "Screening decides whether the project needs a full EIA; scoping then identifies the main issues to study.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the main purpose of an environmental impact assessment?",
    options: [
      ["To predict a project's effects before it is approved", "Correct: so that harm can be avoided or reduced."],
      ["To calculate the profit a new project will make for its owners", "Profit is studied in a business plan, not an EIA."],
      ["To repair damage after a project has closed", "Rehabilitation is planned in the EIA, but the EIA itself comes first."],
      ["To choose the workers for a new project", "Recruiting workers is not part of an EIA."],
    ],
    answer: "A",
    explanation: "An EIA is carried out **before** approval to predict impacts on the environment and people and to plan mitigation.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why is a **baseline study** carried out during an EIA?",
    options: [
      ["To record present conditions so later change can be measured", "Correct: it gives a starting point for comparison."],
      ["To decide whether the project needs an EIA", "That is screening."],
      ["To check that the approval conditions are met once work starts", "That is monitoring and auditing."],
      ["To tell the public that the project is approved", "Announcing a decision is not a baseline study."],
    ],
    answer: "A",
    explanation: "A baseline study records the present water quality, soils, vegetation, wildlife and land use. Without it, nobody can prove later what the project has changed.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "In Zimbabwe, which body reviews EIA reports and approves or rejects projects?",
    options: [
      ["The Environmental Management Agency", "Correct: EMA reviews EIAs under the Environmental Management Act."],
      ["The Zimbabwe National Water Authority", "ZINWA manages water resources."],
      ["The Forestry Commission", "The Forestry Commission manages forests."],
      ["The company that proposes the project", "The developer pays for the EIA but cannot approve its own project."],
    ],
    answer: "A",
    explanation: "The developer commissions the EIA; **EMA** reviews the report and decides, usually attaching conditions.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why do town plans often include a **buffer zone** of open land between an industrial area and a residential area?",
    options: [
      ["To reduce the noise, smoke and dust reaching homes", "Correct: distance and trees separate homes from pollution."],
      ["To give factories more space to dump their waste", "Buffer zones are not for dumping waste."],
      ["To make workers travel further to their jobs", "This is not a purpose; planners try to reduce travel."],
      ["To raise the price of land in the industrial area", "Land prices are not the purpose of buffer zones."],
    ],
    answer: "A",
    explanation: "A buffer zone of open space or trees separates incompatible land uses, protecting residents from pollution and accidents.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why is an EIA especially important for a **mining** project?",
    options: [
      ["Pits, waste dumps and polluted water can harm land for decades", "Correct: the EIA makes the company plan to prevent damage and rehabilitate the land."],
      ["Mining projects are always small and short-lived", "Many mines are large and last for decades."],
      ["Mines never affect nearby communities", "Mines often affect communities through dust, water and relocation."],
      ["An EIA guarantees that the mine will make a profit for its shareholders", "An EIA does not deal with profit."],
    ],
    answer: "A",
    explanation: "Mining changes land permanently. An EIA forces the developer to plan controls on dust, effluent and waste and to set out how the site will be rehabilitated when mining ends.",
    hints: ["Think about what is left behind when a mine closes."],
  });
  b.mcq({
    d: 3, skill: "EVALUATION",
    stem: "Which is a **weakness** of the EIA process?",
    options: [
      ["The developer pays for the report, which may play down impacts", "Correct: the consultant may be under pressure to please the client."],
      ["It allows affected communities to give their views at public meetings", "Public consultation is a strength, not a weakness."],
      ["It records the environment before a project begins", "The baseline study is a strength."],
      ["It proposes ways of reducing harmful impacts", "Mitigation is the main benefit of an EIA."],
    ],
    answer: "A",
    explanation: "Other weaknesses: EIAs can be slow and costly, consultation may be rushed, monitoring after approval is often weak, and illegal operators skip EIAs altogether.",
    hints: ["Who pays the consultant who writes the report?"],
  });
  b.mcq({
    d: 4, skill: "APPLICATION",
    stem: "After Cyclone Idai (2019), which action is the best example of **risk-informed** land-use planning in Chimanimani?",
    options: [
      ["Mapping hazard zones and not allocating stands near stream channels", "Correct: it keeps homes out of places likely to flood or slide."],
      ["Rebuilding houses on the same sites along the streams", "This repeats the exposure to the same hazard."],
      ["Allocating more stands on the steepest slopes to save flat land", "Steep slopes are prone to landslides in extreme rain."],
      ["Waiting for the next cyclone before making any plans", "Risk-informed planning acts before a disaster, not after."],
    ],
    answer: "A",
    explanation: "Risk-informed planning uses hazard maps to keep homes, schools and clinics out of floodways and unstable slopes.",
    hints: ["Which option reduces people's exposure to the hazard?"],
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "An environmental impact assessment is carried out after a project has been completed.",
    answer: false,
    explanation: "False. An EIA is carried out **before** a project is approved. Monitoring and auditing continue after it starts.",
  });
  b.tf({
    d: 2, skill: "RECALL", daily: true,
    stem: "In Zimbabwe, rural district councils plan land use in communal and resettlement areas.",
    answer: true,
    explanation: "True. Rural district councils decide where villages, arable land and grazing should go and protect wetlands and stream banks.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct stage for each description.",
    template: "Deciding whether a full EIA is needed is called {{blank:a}}. Identifying the main issues to study is called {{blank:b}}. Recording present conditions of water, soils and wildlife is the {{blank:c}} study.",
    blanks: [
      { id: "a", accepted: ["screening"], choices: ["screening", "scoping", "baseline", "monitoring"] },
      { id: "b", accepted: ["scoping"], choices: ["screening", "scoping", "baseline", "monitoring"] },
      { id: "c", accepted: ["baseline"], choices: ["screening", "scoping", "baseline", "monitoring"] },
    ],
    wrong: [["scoping", "monitoring", "screening"]],
    explanation: "Screening, then scoping, then the baseline study; monitoring comes after approval.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each land-use zone with a development that belongs in it.",
    pairs: [
      ["Residential", "High-density housing stands"],
      ["Industrial", "A food-processing factory"],
      ["Commercial", "Shops, banks and offices"],
      ["Recreational and conservation", "A park and a protected wetland"],
    ],
    explanation: "Zoning places compatible uses together and separates incompatible ones, for example factories from homes.",
  });
  b.calc({
    d: 3, skill: "APPLICATION",
    stem: "A fictional layout plan sets aside 18 ha for residential stands. Each stand measures 15 m by 25 m. How many stands can be laid out? (1 ha = 10,000 m²)",
    value: 480,
    wrong: [1200, 4.8],
    explanation: "Stand area = 15 × 25 = 375 m². Residential area = 18 × 10,000 = 180,000 m². Stands = 180,000 ÷ 375 = 480.",
    workedSolution: "1. Area of one stand = 15 m × 25 m = 375 m².\n2. Residential area = 18 ha × 10,000 = 180,000 m².\n3. Number of stands = 180,000 ÷ 375 = 480.",
    hints: ["Convert hectares to square metres first.", "Divide the total area by the area of one stand."],
  });
  b.num({
    d: 2, skill: "APPLICATION",
    stem: "A fictional town extension covers 80 ha, of which 12 ha are zoned for industry. What percentage of the extension is zoned for industry?",
    value: 15, unit: "%", tol: 0.1,
    wrong: [6.7, 85],
    explanation: "12 ÷ 80 × 100 = 15 %.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the Act that requires Zimbabwe's urban local authorities to prepare master plans and local plans.",
    accepted: ["Regional, Town and Country Planning Act", "Regional Town and Country Planning Act", "the Regional, Town and Country Planning Act", "Regional Town and Country Planning", "Town and Country Planning Act", "RTCPA"],
    wrong: ["Environmental Management Act"],
    explanation: "The **Regional, Town and Country Planning Act** (Chapter 29:12) provides for master plans, local plans and development permits.",
  });
  b.manualShort({
    d: 2, skill: "APPLICATION", marks: 3,
    stem: "Suggest **three** mitigation measures an EIA might require for a new quarry near a village.",
    points: [
      "Spraying roads and stockpiles with water / planting a tree belt to reduce dust.",
      "Limiting blasting to set hours with warnings, to reduce noise and danger.",
      "Silt traps or settling ponds to stop sediment reaching streams / fencing and backfilling pits when work ends.",
    ],
    modelAnswer: "The company could be required to spray roads with water and plant a belt of trees to reduce dust, to blast only at fixed times with warnings, and to build silt traps so that soil does not reach the village stream. Pits should be fenced and backfilled when the quarry closes.",
    explanation: "Each measure should match a specific impact.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain how land-use planning can be a strategy for sustainable environmental management.",
    points: [
      "Zoning keeps polluting industry away from homes and water sources (buffer zones).",
      "Wetlands, stream banks and steep slopes can be protected from building or cultivation.",
      "Hazard-prone land (floodplains, unstable slopes) is kept free of settlement, reducing disasters.",
      "Compact, planned settlements save farmland and reduce travel and energy use / land for food production is kept.",
    ],
    modelAnswer: "Zoning places factories away from homes and rivers, with buffer zones, so fewer people are exposed to pollution. Plans can protect wetlands, stream banks and steep slopes, which store water and prevent erosion. Keeping settlement off floodplains and unstable slopes reduces disaster losses. Compact, well-planned towns use less farmland and reduce the distances people travel.",
    explanation: "Each point links a planning tool to an environmental benefit.",
    hints: ["Think about pollution, wetlands, hazards and farmland."],
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 7,
    stem: "Evaluate the importance of environmental impact assessments for mining projects in Zimbabwe.",
    points: [
      ["Explains that EIAs are required under the Environmental Management Act and reviewed by EMA before mining starts.", 1],
      ["Importance: identifies impacts such as dust, effluent, siltation, loss of grazing or relocation of households.", 1],
      ["Importance: makes the company plan mitigation and rehabilitation of pits and dumps.", 1],
      ["Importance: public consultation gives communities a voice / protects health and livelihoods.", 1],
      ["Limitation: reports paid for by developers may play down impacts; consultation may be rushed.", 1],
      ["Limitation: monitoring after approval is weak; small-scale and illegal miners avoid EIAs.", 1],
      ["Overall judgement on importance with a suggested improvement.", 1],
    ],
    levels: geographyLevels(7),
    modelAnswer: "Under the Environmental Management Act, mining projects must have an EIA approved by EMA before work begins. The EIA identifies impacts such as dust from blasting and haul roads, effluent and silt reaching rivers, loss of grazing land and the need to relocate households or graves. It requires the company to plan mitigation, for example settling ponds, dust suppression and fencing, and to show how pits and waste dumps will be rehabilitated when mining ends. Public consultation lets communities and traditional leaders raise concerns and negotiate compensation.\n\nHowever, the process has weaknesses. The developer pays the consultant, so reports may understate impacts. Consultation meetings are sometimes held late or in a language and format that local people find hard to follow. After approval, EMA has limited staff to check that conditions are met, and the many small-scale and illegal gold miners never carry out an EIA at all, although they cause much of the damage to rivers.\n\nOverall, EIAs are very important because they are the main legal tool for preventing long-lasting damage from mining, but their value depends on independent review, genuine consultation and regular monitoring, which need more resources.",
    explanation: "Level 3 answers balance the benefits and limitations of EIA in mining and reach a judgement.",
    hints: ["Give benefits and weaknesses.", "Remember small-scale and illegal miners."],
  });
  b.struct({
    d: 3, skill: "ANALYSIS",
    stem: `Study Table 1.\n\n${PLAN}`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "Calculate the percentage of the extension zoned for residential use.", value: 55, unit: "%", tol: 0.1, wrong: [66], explanation: "66 ÷ 120 × 100 = 55 %." }),
      P.num({ label: "(b)", marks: 2, stem: "The data are to be shown on a pie chart. Calculate the angle of the sector for industrial land.", value: 54, unit: "°", tol: 0.1, wrong: [18, 15], explanation: "18 ÷ 120 × 360 = 54°." }),
      P.mcq({ label: "(c)", marks: 1, stem: "What is the main environmental risk of placing the industrial zone beside the wetland?", options: [
        ["Effluent and spills polluting the wetland and water downstream", "Correct: wetlands collect runoff from the land around them."],
        ["The wetland flooding the factories every day", "Wetlands may flood seasonally, but daily flooding is not the main risk described."],
        ["The wetland making the factories too cold and damp to work in", "Wetlands do not have this effect."],
        ["The factories drying up all the rain over the town", "Factories do not stop rainfall."],
      ], answer: "A", explanation: "Industry next to a wetland upstream of homes risks polluting the water that flows towards residents." }),
      P.manual({ label: "(d)", marks: 2, stem: "Suggest a better location for the industrial zone and give a reason.", points: [
        "Downstream of / away from the wetland and the residential zone (e.g. on the far side, near a main road or railway).",
        "Reason: effluent or smoke would not reach homes or the wetland / access for transport.",
      ], explanation: "A sensible location plus a linked reason." }),
      P.manual({ label: "(e)", marks: 2, stem: "Explain why the plan keeps the wetland as open space.", points: [
        "Wetlands store water, recharge groundwater and release it slowly in the dry season.",
        "They filter pollutants and silt / provide habitat; building on them causes flooding and cracked houses.",
      ], explanation: "Functions of wetlands and risks of building on them." }),
      P.manual({ label: "(f)", marks: 2, stem: "Suggest **two** challenges the council may face in carrying out this plan.", points: [
        "Illegal settlement or land invasions on the wetland or open space.",
        "Lack of funds or planners to service stands / corruption or political interference in allocating land.",
      ], explanation: "Implementation problems." }),
    ],
    hints: ["For a pie chart, multiply the fraction by 360°."],
    explanation: "Practice in interpreting a land-use plan.",
  });
  b.struct({
    d: 3, skill: "APPLICATION",
    stem: `Read the description of a proposed project.\n\n${QUARRY}`,
    parts: [
      P.mcq({ label: "(a)", marks: 1, stem: "At which stage of the EIA would the water quality of the stream be recorded before work starts?", options: [
        ["Baseline study", "Correct: it records present conditions."],
        ["Screening", "Screening decides if a full EIA is needed."],
        ["Monitoring", "Monitoring takes place after the quarry opens."],
        ["Review and decision", "This is when EMA decides on the report."],
      ], answer: "A", explanation: "The baseline study measures present conditions so later changes can be detected." }),
      P.manual({ label: "(b)", marks: 2, stem: "Using the description, identify **two** negative impacts the quarry could have on the village.", points: [
        "Dust blown west by the prevailing wind onto the school and village.",
        "Noise and vibration from blasting / silt polluting the stream and dam / loss of grazing land to the road.",
      ], explanation: "Impacts must be supported by the description." }),
      P.manual({ label: "(c)", marks: 2, stem: "Suggest a mitigation measure for each impact you identified in (b).", points: [
        "Matching measure for the first impact (e.g. water sprays, tree belt on the west side).",
        "Matching measure for the second impact (e.g. blasting at fixed hours, silt traps, compensation for grazing).",
      ], explanation: "Measures must match the impacts." }),
      P.manual({ label: "(d)", marks: 1, stem: "State **one** positive impact of the project.", points: [
        "Jobs for about 60 local people / income / a new road.",
      ], explanation: "Economic benefits." }),
      P.manual({ label: "(e)", marks: 2, stem: "Explain why public consultation is an important part of this EIA.", points: [
        "Villagers know local conditions (water use, graves, grazing) that consultants may miss.",
        "It gives them a voice and allows compensation and conditions to be agreed, reducing conflict.",
      ], explanation: "Local knowledge and fairness." }),
    ],
    hints: ["Use the wind direction and the stream in your answers."],
    explanation: "Practice in applying the EIA process to a proposed project.",
  });
  b.card("DEFINITION", "Environmental impact assessment (EIA)", "A study before a project is approved that predicts its effects and proposes ways to avoid, reduce or offset harm.");
  b.card("CONCEPT", "Stages of an EIA", "Screening → scoping → baseline study → impact prediction → mitigation and management plan → consultation → report → review and decision → monitoring.");
  b.card("DEFINITION", "Baseline study", "Records present environmental and social conditions so that later changes caused by a project can be measured.");
  b.card("DEFINITION", "Mitigation", "Actions that reduce harmful impacts, e.g. dust suppression, silt traps, replanting, compensation.");
  b.card("DEFINITION", "Land-use zoning", "Dividing land into zones (residential, industrial, commercial, recreational, conservation) with rules for each.");
  b.card("FACT", "Planning laws in Zimbabwe", "Regional, Town and Country Planning Act (master and local plans, development permits); rural district councils plan rural land.");
  b.card("CONCEPT", "Weaknesses of EIA", "Costly and slow, paid for by the developer, rushed consultation, weak monitoring, illegal operators avoid it.");
  b.card("DEFINITION", "Risk-informed land-use planning", "Planning that keeps homes and services out of hazard zones such as floodplains and unstable slopes, using hazard maps.");
  b.card("CONCEPT", "Challenges of land-use planning", "Rapid urban growth, illegal settlement on wetlands, few planners and funds, corruption, outdated plans.");
});
