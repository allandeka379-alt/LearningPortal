// Slice G2b: Cambridge IGCSE Paper 1 (Physical Geography), topic 1 Changing river environments (2 × 25 marks).
import { concept, P, CAM, geographyLevels } from "../lib.mjs";

const FIG1 = "**Fig. 1.1: Storm hydrographs for two fictional basins of similar size after the same storm**\n\n| Hours from start of storm | 0 | 5 | 10 | 15 | 20 | 25 | 30 | 35 | 40 |\n|---|---|---|---|---|---|---|---|---|---|\n| Rainfall in previous 5 hours (mm) | 3 | 19 | 7 | 0 | 0 | 0 | 0 | 0 | 0 |\n| Basin A discharge (m³/s): mainly forest on permeable sandstone | 2 | 2.4 | 3.5 | 6 | 9 | 10.5 | 8.5 | 6.5 | 4.5 |\n| Basin B discharge (m³/s): steep slopes, a growing town, granite | 2 | 4.5 | 13.5 | 19.5 | 11 | 6.8 | 4.8 | 3.9 | 3.1 |";

const FIG2 = "**Fig. 2.1: Channel measurements at four fictional sites downstream**\n\n| Site | Distance from source (km) | Width (m) | Mean depth (m) | Mean velocity (m/s) |\n|---|---|---|---|---|\n| 1 | 1 | 2.1 | 0.18 | 0.24 |\n| 2 | 6 | 3.8 | 0.28 | 0.31 |\n| 3 | 14 | 6.5 | 0.42 | 0.38 |\n| 4 | 25 | 9.2 | 0.60 | 0.45 |\n\n**Fig. 2.2: Notes from a field visit (fictional)**: near site 1 the river drops 8 m over a ledge of hard sandstone above weaker shale, into a deep pool. Below site 3 the river passes a town; downstream of a sewage outfall and a textile factory the water is cloudy and smells, and green algae cover the slower stretches.";

concept("geo.rivers.flooding", { file: "exam/cam-p1-rivers", keyPrefix: "exam.cam-p1-rivers", applies: CAM }, (b) => {
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, paper: "Paper 1", secs: 2250,
    concepts: ["geo.rivers.drainage-basin", "geo.rivers.landforms-lower", "geo.rivers.flooding"],
    stem: `Study Fig. 1.1, which shows storm hydrographs for two basins.\n\n${FIG1}`,
    hints: ["Lag time is measured from the peak rainfall to the peak discharge.", "For the extended answer, choose a named river and give specific detail on causes, impacts and management."],
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "State the peak discharge of basin B.", value: 19.5, unit: "m³/s", tol: 0.05, answer: "19.5", wrong: [10.5], explanation: "19.5 m³/s at 15 hours." }),
      P.num({ label: "(b)", marks: 1, stem: "Calculate the lag time of basin A in hours.", value: 20, unit: "h", wrong: [25], explanation: "Peak rainfall at 5 h; peak discharge at 25 h; 25 − 5 = 20 hours." }),
      P.num({ label: "(c)", marks: 1, stem: "Calculate the lag time of basin B in hours.", value: 10, unit: "h", wrong: [15], explanation: "Peak discharge at 15 h; 15 − 5 = 10 hours." }),
      P.manual({ label: "(d)", marks: 3, stem: "Compare the hydrographs of basin A and basin B.", points: [
        "B has a higher peak discharge (19.5 against 10.5 m³/s).",
        "B has a shorter lag time (10 h against 20 h).",
        "B has steeper rising and falling limbs / returns towards base flow sooner.",
      ], explanation: "Comparative statements with data." }),
      P.manual({ label: "(e)", marks: 4, stem: "Explain the differences between the two hydrographs.", points: [
        "Forest in A intercepts rain and roots increase infiltration, slowing water.",
        "Permeable sandstone in A allows percolation and slow groundwater flow.",
        "Steep slopes and impermeable granite in B cause rapid overland flow.",
        "Roofs, roads and drains in B's town carry water quickly to the river.",
      ], explanation: "Credit explanations linked to the basin characteristics." }),
      P.manual({ label: "(f)", marks: 4, stem: "Explain the formation of levées.", points: [
        "In a flood the river overflows its banks onto the floodplain.",
        "Velocity falls immediately beside the channel because of friction / shallower water.",
        "The coarsest, heaviest material is deposited first, close to the channel; finer silt is carried further.",
        "Repeated floods build up these deposits into raised banks (levées).",
      ], explanation: "Four stages in sequence." }),
      P.manual({ label: "(g)", marks: 4, stem: "Describe the opportunities that rivers provide for people.", points: [
        "Water supply for homes, industry and irrigation.",
        "Fertile alluvial soils and flat land on floodplains for farming and building.",
        "Energy (hydro-electric power) and fishing.",
        "Transport routes and tourism or recreation.",
      ], explanation: "Four distinct opportunities." }),
      P.manual({
        label: "(h)", marks: 7, type: "EXTENDED_RESPONSE",
        stem: "For a named river, describe the causes, impacts and management of a flood.",
        points: [
          ["Named river, place and date (e.g. Limpopo, Mozambique, February-March 2000).", 1],
          ["Physical causes specific (e.g. weeks of heavy rain, saturated ground, Cyclone Eline).", 1],
          ["Further cause (e.g. flat low-lying lower valley downstream of a shared basin; settlement on the floodplain).", 1],
          ["Social impacts with detail (e.g. about 700 deaths, hundreds of thousands homeless, cholera).", 1],
          ["Economic/environmental impacts (e.g. Chokwe and Xai-Xai flooded, roads and bridges cut, crops and cattle lost).", 1],
          ["Management during/after the flood (e.g. helicopter rescues, aid, early warning, resettlement).", 1],
          ["Specific, place-based detail throughout and some evaluation of management.", 1],
        ],
        levels: geographyLevels(7),
        modelAnswer: "In February and March 2000 the River Limpopo flooded its lower valley in southern Mozambique, an LIC. Weeks of exceptionally heavy rain from late January had saturated the ground across the region, and in late February Cyclone Eline brought further heavy rain over the upper basin, which is shared with South Africa, Botswana and Zimbabwe. All this water reached the flat, low-lying floodplain in Mozambique, where many people lived and farmed.\n\nThe towns of Chokwe and Xai-Xai were flooded. Several hundred people died, about 700 by most estimates, and hundreds of thousands were made homeless. Roads, bridges and the main north-south road link were cut, crops and cattle were lost, and cholera and malaria increased in crowded camps.\n\nDuring the flood, thousands of people stranded on roofs and in trees were rescued by helicopters, many from the South African Air Force, and international aid provided food, shelter and medicine. Afterwards Mozambique strengthened its disaster management institute and community early-warning systems along the river and encouraged people to resettle on higher ground. Warnings have helped save lives in later floods, but many farmers returned to the fertile floodplain, so damage to crops and homes remains high.",
        explanation: "Level 3 answers give specific, located detail on causes, impacts and management.",
      }),
    ],
    explanation: "Cambridge Paper 1 style question on hydrographs, levées, river opportunities and a flood example.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, paper: "Paper 1", secs: 2250,
    concepts: ["geo.rivers.drainage-basin", "geo.rivers.processes", "geo.rivers.landforms-upper", "geo.rivers.pollution"],
    stem: `Study Fig. 2.1 and Fig. 2.2.\n\n${FIG2}`,
    hints: ["Discharge = width × mean depth × mean velocity.", "For the extended answer, choose a named polluted river and evaluate its management."],
    parts: [
      P.num({ type: "CALCULATION", label: "(a)", marks: 2, stem: "Calculate the discharge at site 3. Give your answer to two decimal places.", value: 1.0374, unit: "m³/s", tol: 0.006, answer: "1.04", wrong: [2.73, 7.3], explanation: "Area = 6.5 × 0.42 = 2.73 m²; discharge = 2.73 × 0.38 = 1.04 m³/s.", workedSolution: "1. Cross-sectional area = 6.5 × 0.42 = 2.73 m².\n2. Discharge = 2.73 × 0.38 = 1.0374 m³/s.\n3. To two decimal places: 1.04 m³/s." }),
      P.mcq({ label: "(b)", marks: 1, stem: "Which statement about Fig. 2.1 agrees with the Bradshaw model?", options: [
        ["Velocity increases downstream", "Correct: from 0.24 to 0.45 m/s."],
        ["Depth decreases downstream", "Depth increases from 0.18 to 0.60 m."],
        ["Width stays the same downstream", "Width increases from 2.1 to 9.2 m."],
        ["Velocity is highest at the source", "Velocity is lowest at site 1."],
      ], answer: "A", explanation: "Width, depth and velocity all increase downstream, as the Bradshaw model predicts." }),
      P.manual({ label: "(c)", marks: 2, stem: "Explain why velocity increases downstream although the gradient becomes gentler.", points: [
        "Downstream the channel is deeper and smoother (less bed roughness), so proportionally less water is in contact with the bed and banks.",
        "Less energy is lost to friction, so the flow is more efficient and faster.",
      ], explanation: "Channel efficiency and friction." }),
      P.manual({ label: "(d)", marks: 4, stem: "Using Fig. 2.2, explain how the waterfall near site 1 has formed and how it will change.", points: [
        "Weaker shale below the hard sandstone is eroded faster, forming a step.",
        "Falling water erodes a plunge pool by hydraulic action and abrasion.",
        "The shale is undercut, leaving an overhang of sandstone which collapses.",
        "The waterfall retreats upstream, leaving a gorge.",
      ], explanation: "Four stages including future retreat." }),
      P.manual({ label: "(e)", marks: 3, stem: "Describe **three** processes by which a river erodes its channel.", points: [
        "Hydraulic action: force of water and compressed air in cracks breaks off rock.",
        "Abrasion: load scraped along the bed and banks wears them away.",
        "Solution: acidic water dissolves soluble rock.",
      ], explanation: "Three processes described (attrition wears the load, not the channel)." }),
      P.manual({ label: "(f)", marks: 3, stem: "Using Fig. 2.2, suggest the causes of the pollution below site 3 and explain the growth of algae.", points: [
        "Untreated or partly treated sewage from the outfall.",
        "Effluent (dyes, chemicals) from the textile factory makes the water cloudy.",
        "Nutrients (nitrates, phosphates) from sewage and detergents cause algal growth (eutrophication).",
      ], explanation: "Credit causes from the resource and the nutrient explanation." }),
      P.manual({ label: "(g)", marks: 3, stem: "Describe the impacts of this pollution on people and on the river ecosystem.", points: [
        "People: water-borne disease (cholera, diarrhoea) if the water is used for drinking or washing.",
        "Ecosystem: decomposition of algae uses up oxygen, so fish and invertebrates die.",
        "Other: toxic chemicals enter food chains / higher water treatment costs / loss of fishing or tourism.",
      ], explanation: "Impacts on people and ecosystems." }),
      P.manual({
        label: "(h)", marks: 7, type: "EXTENDED_RESPONSE",
        stem: "For a named river, describe the causes and impacts of pollution and evaluate how it has been managed.",
        points: [
          ["Named river and country with specific places (e.g. Ganges, India: Kanpur, Varanasi).", 1],
          ["Specific cause 1 (e.g. untreated sewage from growing cities).", 1],
          ["Specific cause 2 (e.g. chromium from Kanpur tanneries; farm run-off; cremations).", 1],
          ["Impacts on people (e.g. faecal bacteria above bathing limits; diarrhoea, typhoid).", 1],
          ["Impacts on ecosystems (e.g. heavy metals in fish; river dolphin threatened).", 1],
          ["Management described (e.g. Ganga Action Plan 1985; Namami Gange 2014: treatment plants, monitoring industry).", 1],
          ["Evaluation with judgement (e.g. some improvement but treatment capacity still lags; enforcement difficult).", 1],
        ],
        levels: geographyLevels(7),
        modelAnswer: "The River Ganges in India flows about 2,500 km from the Himalayas to the Bay of Bengal and is sacred to Hindus. Its biggest source of pollution is untreated or partly treated sewage from cities such as Kanpur and Varanasi, because sewage treatment has not kept pace with population growth. Leather tanneries at Kanpur discharge chromium, and fertiliser and pesticide run-off, solid waste and cremations add further pollution.\n\nIn many stretches faecal bacteria are far above safe bathing limits, so people who bathe in or drink the water suffer diarrhoeal diseases and typhoid. Heavy metals accumulate in fish and enter the food chain, and the endangered Ganges river dolphin is threatened.\n\nThe Ganga Action Plan from 1985 built treatment plants, but capacity was too small and many did not operate reliably, so it had limited success. The Namami Gange programme from 2014 has funded many more treatment plants, monitoring of polluting industries and river-front clean-ups, and water quality has improved in some places. However, sewage generation still outpaces treatment and small industries are hard to regulate. Management has been partly successful but needs sustained funding, enforcement and public participation.",
        explanation: "Level 3 answers give specific located causes and impacts and evaluate named management.",
      }),
    ],
    explanation: "Cambridge Paper 1 style question on channel characteristics, river processes and landforms, and river pollution.",
  });
});
