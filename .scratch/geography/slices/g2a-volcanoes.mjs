// Slice G2a: volcanoes — types, features and hazards (ZIMSEC and Cambridge).
import { concept, P, geographyLevels } from "../lib.mjs";

const VOLCS = "| Volcano (fictional) | Height above surrounding land (m) | Base diameter (km) | Magma | Years since last eruption |\n|---|---|---|---|---|\n| Kora | 3,600 | 120 | Runny basalt | 2 |\n| Lemba | 2,400 | 12 | Thick, gas-rich | 140 |\n| Mosi | 300 | 1.2 | Gas-rich, fragments | about 9,000 |\n| Neta | 1,900 | 14 | Thick, gas-rich | over 50,000; no magma chamber detected |";

concept("geo.tectonics.volcanoes", { file: "tectonics/volcanoes", keyPrefix: "tectonics.volcanoes" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which type of volcano has **gentle slopes** and a very wide base, built by runny basalt lava?",
    options: [
      ["Shield volcano", "Correct: runny lava flows a long way before cooling."],
      ["Strato-volcano", "Strato-volcanoes are steep, built of ash and lava layers."],
      ["Cinder cone", "Cinder cones are small and steep, made of loose fragments."],
      ["Caldera", "A caldera is a collapsed summit basin, not a type of cone."],
    ],
    answer: "A",
    explanation: "**Shield volcanoes** (e.g. Mauna Loa) are broad and gentle because basalt lava is runny.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "The underground reservoir of molten rock beneath a volcano is the:",
    options: [
      ["magma chamber", "Correct: it feeds the vent."],
      ["crater", "The crater is the hollow at the summit."],
      ["secondary cone", "A secondary cone is a small cone on the flank."],
      ["lahar", "A lahar is a volcanic mudflow."],
    ],
    answer: "A",
    explanation: "Magma collects in the **magma chamber**, then rises up the vent to the crater.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A volcano that has not erupted for a long time but could erupt again is described as:",
    options: [
      ["dormant", "Correct: 'sleeping'."],
      ["active", "Active volcanoes have erupted recently."],
      ["extinct", "Extinct volcanoes are not expected to erupt again."],
      ["intrusive", "Intrusive refers to magma that cools underground."],
    ],
    answer: "A",
    explanation: "**Dormant** volcanoes, such as Kilimanjaro, are quiet but not dead.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which volcanic hazard is usually the **most deadly** because it moves very fast and is extremely hot?",
    options: [
      ["Pyroclastic flow", "Correct: it can exceed 100 km/h and several hundred °C."],
      ["Lava flow", "Most lava flows are slow enough for people to walk away."],
      ["Ash fall", "Ash fall is damaging but usually gives time to shelter."],
      ["Steam from fumaroles", "Fumaroles release steam locally and rarely kill."],
    ],
    answer: "A",
    explanation: "**Pyroclastic flows** give almost no warning; in AD 79 they killed many people at Pompeii and Herculaneum near Vesuvius.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "What is a **lahar**?",
    options: [
      ["A mudflow of volcanic ash and water", "Correct: it can travel far down river valleys."],
      ["A cloud of hot gas and ash", "That is a pyroclastic flow or ash cloud."],
      ["A sheet of magma between rock layers", "That is a sill."],
      ["A small cone of loose cinders", "That is a cinder cone."],
    ],
    answer: "A",
    explanation: "A **lahar** forms when ash mixes with rain, snowmelt or a crater lake; Armero (Colombia, 1985) was buried by lahars.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "A sheet of igneous rock that cuts **vertically across** the rock layers is a:",
    options: [
      ["dyke", "Correct: dykes cut across layers."],
      ["sill", "A sill lies horizontally between layers."],
      ["batholith", "A batholith is a huge dome-shaped mass, not a thin sheet."],
      ["laccolith", "A laccolith is a dome that pushes layers up."],
    ],
    answer: "A",
    explanation: "Dyke: cuts across. Sill: lies along the layers.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why are people living near strato-volcanoes often at greater risk than those near shield volcanoes?",
    options: [
      ["Viscous magma causes rare, explosive eruptions with pyroclastic flows", "Correct: long quiet periods are followed by violent eruptions."],
      ["Shield volcanoes never produce any lava flows at all", "Shield volcanoes produce many lava flows."],
      ["Strato-volcanoes are found only in very poor countries", "Strato-volcanoes occur in all kinds of countries, e.g. Japan and the USA."],
      ["Shield volcanoes are always extinct and safe to live on", "Many shield volcanoes, like Mauna Loa, are active."],
    ],
    answer: "A",
    explanation: "Gas trapped in viscous magma causes **explosive** eruptions; long quiet periods make people less prepared.",
    hints: ["Compare the magma.", "Which hazards do explosive eruptions produce?"],
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A volcano erupts at VEI 5. Approximately how much more material does it eject than a VEI 3 eruption?",
    options: [
      ["About 100 times more", "Correct: each step is about ten times, so two steps is about 100 times."],
      ["About 2 times more", "The scale is not linear; each step is about ten times."],
      ["About 20 times more", "Two steps of about ten times each gives 10 × 10, not 10 + 10."],
      ["About 1,000 times more", "That would be three steps of the scale."],
    ],
    answer: "A",
    explanation: "The **VEI** is logarithmic: each whole number is about 10 times more ejected material, so 5 − 3 = 2 steps = about 100 times.",
    hints: ["The VEI is a logarithmic scale.", "Count the steps between 3 and 5."],
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "A lava flow advances at 1.5 km per hour towards a village 6 km away. How many hours do the villagers have before it arrives?",
    value: 4, unit: "h",
    wrong: [9, 0.25],
    explanation: "Time = distance ÷ speed = 6 ÷ 1.5 = 4 hours.",
  });
  b.calc({
    d: 3, skill: "APPLICATION",
    stem: "A pyroclastic flow travels at 180 km per hour. How many **minutes** would it take to reach a town 9 km from the crater?",
    value: 3, unit: "min",
    wrong: [20, 0.05],
    explanation: "Time = 9 ÷ 180 = 0.05 hours; 0.05 × 60 = 3 minutes.",
    workedSolution: "1. Time in hours = 9 ÷ 180 = 0.05 h.\n2. Convert to minutes: 0.05 × 60 = 3 minutes.",
    hints: ["Time = distance ÷ speed.", "Multiply hours by 60 for minutes."],
  });
  b.calc({
    d: 4, skill: "ANALYSIS",
    stem: "A fictional strato-volcano rises 2,000 m above the surrounding plain and its base is 11 km in diameter. Assuming the summit is above the centre of the base, calculate the average gradient from base to summit as 1 in *n*. Give *n* to two decimal places.",
    value: 2.75, prefix: "1 in", tol: 0.005,
    wrong: [5.5, 0.36],
    explanation: "Horizontal distance = radius = 11 ÷ 2 = 5.5 km = 5,500 m. Gradient = 2,000 : 5,500 = 1 : 2.75, so 1 in 2.75.",
    workedSolution: "1. Radius = 11 ÷ 2 = 5.5 km = 5,500 m.\n2. Vertical rise = 2,000 m.\n3. 5,500 ÷ 2,000 = 2.75.\n4. Gradient = 1 in 2.75.",
    hints: ["The horizontal distance from base to summit is the radius, not the diameter.", "Use metres for both."],
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the large basin formed when the summit of a volcano collapses into an emptied magma chamber.",
    accepted: ["caldera", "a caldera"],
    wrong: ["crater"],
    explanation: "A **caldera** is much wider than a crater.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the sentences.",
    template: "Thick, sticky magma has a high {{blank:a}}, so gas is trapped and eruptions are {{blank:b}}. Runny {{blank:c}} magma lets gas escape and builds broad {{blank:d}} volcanoes.",
    blanks: [
      { id: "a", accepted: ["viscosity"], wrong: "temperature" },
      { id: "b", accepted: ["explosive", "violent"], wrong: "gentle" },
      { id: "c", accepted: ["basalt", "basaltic"], wrong: "granite" },
      { id: "d", accepted: ["shield"], wrong: "strato" },
    ],
    explanation: "Viscosity controls how gas escapes and so the style of eruption.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each volcano to its type or status.",
    pairs: [
      ["Mauna Loa (Hawaii)", "Active shield volcano"],
      ["Mount Fuji (Japan)", "Strato-volcano (composite cone)"],
      ["Parícutin (Mexico)", "Cinder cone"],
      ["Mount Kenya", "Extinct volcano"],
    ],
    explanation: "Learn one named example of each type and status.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "True or false: volcanic ash can affect places thousands of kilometres from the volcano.",
    answer: true,
    feedbackTrue: "Correct: in 2010 ash from Eyjafjallajökull (Iceland) closed much of Europe's airspace.",
    feedbackFalse: "Ash is carried by high-level winds; Icelandic ash in 2010 closed airspace across Europe.",
    explanation: "The **spread** of ash makes it a hazard far beyond the volcano.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe **two** benefits that volcanoes bring to people.",
    points: [
      "Fertile soils from weathered ash and lava",
      "e.g. coffee and bananas on Kilimanjaro's slopes / high crop yields",
      "Geothermal energy / tourism / minerals / building stone",
      "e.g. geothermal power at Olkaria (Kenya) or in Iceland / tourists climbing Kilimanjaro",
    ],
    modelAnswer: "Weathered ash and lava form fertile soils; on the slopes of Kilimanjaro farmers grow coffee and bananas. Hot rocks near volcanoes heat underground water that can drive turbines, as at Olkaria in Kenya, giving geothermal electricity.",
    explanation: "Two benefits, each with an example.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain why volcanoes form at destructive plate boundaries.",
    points: [
      "Denser oceanic plate is subducted beneath the other plate",
      "Water released from the sinking plate / friction and heat cause the mantle above to melt",
      "Magma is less dense and rises through cracks in the crust",
      "It erupts at the surface, building volcanoes (often explosive strato-volcanoes)",
    ],
    modelAnswer: "The denser oceanic plate is subducted. At depth, water released from it lowers the melting point of the mantle above, which melts to form magma. Being less dense, the magma rises through weaknesses in the crust and erupts, building explosive strato-volcanoes.",
    explanation: "Subduction, melting, rising, eruption.",
    hints: ["Start with which plate sinks.", "Why does magma rise?"],
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 7,
    stem: "\"Lava flows are the least dangerous volcanic hazard.\" How far do you agree? Refer to the speed, size, frequency and spread of different hazards.",
    points: [
      "Lava flows: usually slow (speed), narrow path (spread), so people can evacuate; but destroy property",
      "Exception: runny lava on steep slopes can move fast, e.g. Nyiragongo into Goma",
      "Pyroclastic flows: very fast and hot, little warning; most deadly",
      "Lahars: fast, travel far down valleys, e.g. Armero 1985",
      "Ash fall: wide spread, roof collapse, crops, aviation, e.g. Eyjafjallajökull 2010",
      "Gases: invisible, sudden, e.g. Lake Nyos 1986; size and frequency of eruptions affect preparedness",
      "Judgement: largely agree for loss of life, but lava can cause great economic loss",
    ],
    levels: geographyLevels(7),
    modelAnswer: "Lava flows usually move slowly and follow a narrow path, so people can walk away; they destroy buildings and farmland but rarely kill. Exceptions exist: runny lava from Nyiragongo has moved quickly into Goma. Other hazards are far deadlier. Pyroclastic flows travel at over 100 km/h at several hundred degrees, giving no time to escape. Lahars travel fast and far down valleys; in 1985 they buried Armero in Colombia, killing over 20,000 people. Ash spreads over huge areas, collapsing roofs, ruining crops and closing airspace, as Eyjafjallajökull did in 2010. Gases can kill silently, as at Lake Nyos in 1986. The size and frequency of eruptions also matter: rare, large eruptions catch people unprepared. I largely agree: lava is the least deadly hazard because of its speed and limited spread, but it can still cause heavy economic losses.",
    explanation: "Credit comparison of hazards using speed, size, frequency and spread, with examples.",
    hints: ["Compare lava with at least three other hazards.", "Use the four criteria in the question."],
  });
  b.struct({
    d: 3, skill: "ANALYSIS",
    stem: `Table 1 shows data for four fictional volcanoes.\n\n${VOLCS}`,
    parts: [
      P.short({ label: "(a)", marks: 1, stem: "Which volcano is most likely a shield volcano?", accepted: ["Kora"], wrong: ["Lemba"], explanation: "Kora: very wide base and runny basalt." }),
      P.short({ label: "(b)", marks: 1, stem: "Which volcano is most likely a cinder cone?", accepted: ["Mosi"], wrong: ["Neta"], explanation: "Mosi: small, made of fragments." }),
      P.mcq({ label: "(c)", marks: 1, stem: "Which volcano is most likely extinct?", options: [
        ["Neta", "Correct: no eruption for over 50,000 years and no magma chamber detected."],
        ["Kora", "Kora erupted 2 years ago; it is active."],
        ["Lemba", "Lemba erupted 140 years ago; it could erupt again."],
        ["Mosi", "Mosi has been quiet for about 9,000 years, but cinder cones can be part of active fields."],
      ], answer: "A", explanation: "No magma supply and no recent eruption suggest extinct." }),
      P.num({ label: "(d)", marks: 1, stem: "How many times wider is Kora's base than Lemba's?", value: 10, wrong: [1.5], explanation: "120 ÷ 12 = 10 times." }),
      P.manual({ label: "(e)", marks: 3, stem: "Suggest why Lemba is more dangerous to nearby people than Kora, even though Kora erupts more often.", points: [
        "Lemba has thick, gas-rich magma, so eruptions are explosive",
        "Explosive eruptions produce pyroclastic flows, ash fall and lahars that are fast and widespread",
        "Long gaps (140 years) mean people may be unprepared / have settled close by; Kora's frequent gentle lava flows are slow and familiar",
      ], modelAnswer: "Lemba's thick, gas-rich magma gives explosive eruptions with fast pyroclastic flows, heavy ash and lahars. Because it last erupted 140 years ago, people may have forgotten the danger and settled close by. Kora's frequent eruptions of runny lava are gentle and slow, so people can move away.", explanation: "Magma type, hazards, frequency and preparedness." }),
    ],
    hints: ["Shield = wide and basalt.", "Compare the type of magma and how often they erupt."],
    explanation: "Practice in classifying volcanoes and assessing risk from data.",
  });
  b.struct({
    d: 3, skill: "UNDERSTANDING",
    stem: "Read this description of a cross-section through a volcano (fictional). 'At a depth of about 6 km is a large body of molten rock. A pipe leads up from it to a hollow at the summit. The cone is built of alternating layers of ash and lava. Halfway down the eastern slope a smaller cone has formed over a side pipe. Below the volcano, a horizontal sheet of solid igneous rock lies between two sedimentary layers.'",
    parts: [
      P.short({ label: "(a)", marks: 1, stem: "Name the hollow at the summit.", accepted: ["crater", "a crater", "the crater"], wrong: ["caldera"], explanation: "A crater." }),
      P.short({ label: "(b)", marks: 1, stem: "Name the smaller cone on the eastern slope.", accepted: ["secondary cone", "parasitic cone", "a secondary cone", "a parasitic cone", "side cone", "subsidiary cone", "adventive cone"], wrong: ["cinder cone"], explanation: "A secondary (parasitic) cone." }),
      P.short({ label: "(c)", marks: 1, stem: "Name the horizontal sheet of igneous rock between the sedimentary layers.", accepted: ["sill", "a sill"], wrong: ["dyke"], explanation: "A sill lies along the layers." }),
      P.mcq({ label: "(d)", marks: 1, stem: "What type of volcano is described?", options: [
        ["Strato-volcano", "Correct: a composite cone of ash and lava layers."],
        ["Shield volcano", "Shield volcanoes are built almost entirely of lava flows."],
        ["Cinder cone", "Cinder cones are built of loose fragments, not alternating layers."],
        ["Fissure volcano", "Fissure eruptions come from long cracks, not a central cone."],
      ], answer: "A", explanation: "Alternating ash and lava layers define a composite cone." }),
      P.manual({ label: "(e)", marks: 2, stem: "Explain why the cone has alternating layers of ash and lava.", points: [
        "Explosive eruptions throw out ash and fragments that settle on the slopes",
        "Quieter eruptions (or later stages) produce lava flows that cover the ash, building layers over many eruptions",
      ], modelAnswer: "Explosive phases throw out ash that settles on the slopes; quieter phases produce lava that flows over it. Repeated over many eruptions, this builds alternating layers.", explanation: "Two eruption styles over time." }),
    ],
    hints: ["Crater versus caldera.", "Sill = sideways."],
    explanation: "Practice in naming volcano features from a described cross-section.",
  });

  b.card("DEFINITION", "Volcano", "An opening in the crust through which magma, gases and fragments erupt, and the landform built around it.");
  b.card("CONCEPT", "Strato-volcano", "Steep, tall cone of alternating ash and lava; viscous, gas-rich magma; explosive eruptions. E.g. Mount Fuji, Mount St Helens.");
  b.card("CONCEPT", "Shield volcano", "Broad, gently sloping volcano of runny basalt lava; frequent gentle eruptions. E.g. Mauna Loa (Hawaii).");
  b.card("CONCEPT", "Cinder cone", "Small, steep cone of loose cinders around one vent, often erupting only once. E.g. Parícutin (Mexico).");
  b.card("VOCABULARY", "Active, dormant, extinct", "Active: erupted recently, likely again. Dormant: quiet for a long time but could erupt. Extinct: not expected to erupt again.");
  b.card("DEFINITION", "Pyroclastic flow", "A fast (over 100 km/h), very hot avalanche of gas, ash and rock down a volcano's slopes; the deadliest hazard.");
  b.card("DEFINITION", "Lahar", "A volcanic mudflow of ash and water that travels fast down river valleys, e.g. Armero, Colombia, 1985.");
  b.card("FACT", "Volcanic Explosivity Index (VEI)", "A scale from 0 to 8 measuring the size of eruptions; each step is about ten times more ejected material.");
  b.card("VOCABULARY", "Dyke and sill", "Dyke: vertical sheet of igneous rock cutting across layers. Sill: horizontal sheet between layers.");
  b.card("CONCEPT", "Benefits of volcanoes", "Fertile soils, geothermal energy, minerals (sulphur, diamonds), tourism, new land and building stone.");
});
