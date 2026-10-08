// Slice G2b: ZIMSEC Paper 2 Section A (physical environment), rivers (1 × 25 marks).
import { concept, P, ZIM, geographyLevels } from "../lib.mjs";

const RES = "**Table 1: Mean monthly discharge at a gauging station on a fictional highveld river in Zimbabwe**\n\n| Month | J | F | M | A | M | J | J | A | S | O | N | D |\n|---|---|---|---|---|---|---|---|---|---|---|---|---|\n| Discharge (m³/s) | 46 | 57 | 39 | 15 | 6.5 | 3.7 | 2.6 | 1.9 | 1.2 | 1.4 | 8 | 27 |\n\n**Description of the river's lower course (fictional):** downstream of the gauging station the river winds across a wide, flat valley floor. On each bend one bank is a steep, bare cliff about 3 m high and the other is a gentle sandy slope. A horseshoe-shaped pool lies 400 m from the present channel, and low ridges of sand run along both banks. Villagers grow maize on the valley floor, and after heavy rain in February the river spreads over the fields.";

concept("geo.rivers.landforms-lower", { file: "exam/zim-p2-a-rivers", keyPrefix: "exam.zim-p2-a-rivers", applies: ZIM }, (b) => {
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, paper: "Paper 2", secs: 2250,
    concepts: ["geo.rivers.drainage-basin", "geo.rivers.processes", "geo.rivers.landforms-lower", "geo.rivers.flooding"],
    stem: `Study Table 1 and the description of the river's lower course.\n\n${RES}`,
    hints: ["Quote months and values from the table.", "For the last part, choose one real flood in Zimbabwe or elsewhere in Africa and give specific detail."],
    parts: [
      P.mcq({ label: "(a)", marks: 1, stem: "In which month is the mean discharge highest?", options: [
        ["February", "Correct: 57 m³/s."],
        ["January", "January has 46 m³/s, slightly lower than February."],
        ["December", "December has 27 m³/s; flow is still rising."],
        ["March", "March has 39 m³/s; flow is already falling."],
      ], answer: "A", explanation: "The peak is in February (57 m³/s), after soils have been saturated by the early rains." }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the range of mean monthly discharge.", value: 55.8, unit: "m³/s", tol: 0.05, answer: "55.8", wrong: [57, 58.2], explanation: "Range = highest − lowest = 57 − 1.2 = 55.8 m³/s." }),
      P.manual({ label: "(c)", marks: 3, stem: "Describe the seasonal pattern of discharge shown in Table 1.", points: [
        "High discharge from December to March, peaking in February (57 m³/s).",
        "Discharge falls sharply in April and May.",
        "Very low flow from June to October, lowest in September (1.2 m³/s), rising again from November.",
      ], explanation: "Describe the pattern with months and figures." }),
      P.manual({ label: "(d)", marks: 2, stem: "Explain why discharge is so low in September and October.", points: [
        "There is little or no rain in the cool and hot dry seasons (about April/May to October).",
        "High temperatures increase evaporation, and the river is fed only by small amounts of groundwater (base flow).",
      ], explanation: "No rain plus high evaporation; only base flow remains." }),
      P.short({ label: "(e)", marks: 1, stem: "Name the landform described as a horseshoe-shaped pool 400 m from the present channel.", accepted: ["oxbow lake", "ox-bow lake", "oxbow", "ox bow lake", "an oxbow lake", "mortlake", "cut-off", "cutoff lake"], wrong: ["plunge pool"], explanation: "A horseshoe-shaped lake away from the channel is an **oxbow lake**, a cut-off meander." }),
      P.manual({ label: "(f)", marks: 4, stem: "Explain the formation of the steep cliff and the gentle sandy slope found on each bend.", points: [
        "On the outside of the bend water is deepest and fastest.",
        "Lateral erosion by hydraulic action and abrasion undercuts the bank, which collapses to form a river cliff.",
        "On the inside of the bend water is shallow and slow, with less energy.",
        "Deposition of sand there builds a gentle slip-off slope.",
      ], explanation: "Two marks for the river cliff and two for the slip-off slope." }),
      P.manual({ label: "(g)", marks: 3, stem: "Describe **three** ways in which the river transports its load.", points: [
        "Traction: large stones rolled along the bed.",
        "Saltation: pebbles and sand bounced along the bed.",
        "Suspension: fine silt and clay carried within the water / Solution: minerals dissolved in the water.",
      ], explanation: "Any three of traction, saltation, suspension and solution, each described." }),
      P.manual({
        label: "(h)", marks: 9, type: "EXTENDED_RESPONSE",
        stem: "With reference to a named flood in Zimbabwe or elsewhere in Africa, explain the causes and effects of the flood and evaluate the measures used to reduce the effects of floods in the area.",
        points: [
          ["Named flood with place and date (e.g. Limpopo floods, Mozambique, 2000; Cyclone Idai, Chimanimani, 2019; Tokwe-Mukosi basin, 2014; Muzarabani).", 1],
          ["Natural cause explained (e.g. weeks of heavy rain then Cyclone Eline; saturated soils; steep slopes).", 1],
          ["Further cause explained (e.g. flat low-lying floodplain downstream of a shared basin / settlement on floodplains / deforestation).", 1],
          ["Social effects (e.g. deaths, people displaced, disease such as cholera).", 1],
          ["Economic effects (e.g. crops and livestock lost, roads and bridges destroyed).", 1],
          ["Environmental effects (e.g. soil erosion, landslides, fresh silt deposited).", 1],
          ["Measure 1 described and evaluated (e.g. early warning / evacuation and resettlement).", 1],
          ["Measure 2 described and evaluated (e.g. dams, levées, afforestation, raised houses).", 1],
          ["Overall judgement on how effective the measures have been.", 1],
        ],
        levels: geographyLevels(9),
        modelAnswer: "In February and March 2000 the lower Limpopo valley in Mozambique suffered severe floods. Weeks of exceptionally heavy rain from late January saturated the ground across southern Africa, and in late February Cyclone Eline brought more heavy rain over the upper basin. Because the Limpopo basin is shared by South Africa, Botswana, Zimbabwe and Mozambique, the floodwater from all of them reached the flat, low-lying lower valley, where many people lived and farmed on the fertile floodplain.\n\nThe effects were severe. Towns such as Chokwe and Xai-Xai were inundated and several hundred people died, about 700 by most estimates. Hundreds of thousands lost their homes, and thousands were stranded on roofs and in trees until helicopters rescued them. Crops and cattle were lost, roads and bridges were destroyed, and cholera and malaria cases rose. The floods also eroded farmland, although they left fresh silt on the floodplain.\n\nAfter the floods, Mozambique strengthened its disaster management institute and set up community early-warning systems along the river, using radios and local committees. These are cheap and help save lives, but they do not prevent damage to crops and homes. People were encouraged to resettle on higher ground; this reduces exposure, but many returned to the floodplain because the fertile land is their livelihood. Dams upstream can store some floodwater, but they may have to release water when full, and Mozambique depends on information from upstream countries.\n\nOverall, the measures have reduced loss of life more than they have reduced economic losses. Lasting success depends on cooperation between the countries that share the basin and on giving floodplain farmers safe places to live near their fields.",
        explanation: "Level 3 answers explain causes and effects with specific detail and evaluate at least two measures before reaching a judgement.",
      }),
    ],
    explanation: "ZIMSEC Paper 2 Section A style question on river regimes, landforms, processes and floods.",
  });
});
