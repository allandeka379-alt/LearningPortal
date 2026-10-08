// Slice G2a: plate boundaries and the distribution of earthquakes and volcanoes (ZIMSEC and Cambridge).
import { concept, P, geographyLevels } from "../lib.mjs";

const QUAKES = "| Boundary type | Earthquakes of magnitude 6 or more | Active volcanoes |\n|---|---|---|\n| Destructive (including ocean-ocean) | 128 | 41 |\n| Collision | 24 | 1 |\n| Conservative | 20 | 0 |\n| Constructive | 22 | 8 |\n| Not at a boundary (e.g. hot spots) | 6 | 2 |";

const CHAIN = "| Island (fictional) | Distance from the active volcano (km) | Age of oldest lava (million years) |\n|---|---|---|\n| Ana | 0 | 0.4 |\n| Bela | 180 | 2.6 |\n| Coro | 420 | 5.6 |\n| Duna | 640 | 8.4 |";

concept("geo.tectonics.plate-boundaries", { file: "tectonics/plate-boundaries", keyPrefix: "tectonics.plate-boundaries" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "At a **constructive** plate boundary, the plates:",
    options: [
      ["move apart", "Correct: magma rises to fill the gap and forms new crust."],
      ["move towards each other", "That happens at destructive and collision boundaries."],
      ["slide past each other", "That happens at conservative boundaries."],
      ["stay still while the mantle moves", "Plates move at every boundary."],
    ],
    answer: "A",
    explanation: "Constructive (divergent) boundaries create new crust as plates separate, e.g. the Mid-Atlantic Ridge.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which landform is formed where two **continental** plates collide?",
    options: [
      ["Fold mountains", "Correct: e.g. the Himalayas."],
      ["A mid-ocean ridge", "Ridges form where plates move apart under the ocean."],
      ["An island arc", "Island arcs form where two oceanic plates converge."],
      ["A hot-spot island chain", "Hot-spot chains form inside plates, e.g. Hawaii."],
    ],
    answer: "A",
    explanation: "Continental crust is too light to sink far, so it crumples into **fold mountains** such as the Himalayas.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why is the oceanic plate subducted when it meets a continental plate?",
    options: [
      ["It is denser than the continental plate", "Correct: the denser plate sinks into the mantle."],
      ["It is thicker than the continental plate", "Oceanic crust is thinner, not thicker."],
      ["It moves faster than the continental plate", "Speed does not decide which plate sinks."],
      ["It is hotter than the continental plate", "Old oceanic lithosphere is cold, which makes it dense."],
    ],
    answer: "A",
    explanation: "Oceanic lithosphere is **denser**, so it sinks beneath lighter continental lithosphere.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which boundary type has strong earthquakes but **no** volcanoes?",
    options: [
      ["Conservative", "Correct: plates slide past; no magma is produced."],
      ["Constructive", "Constructive boundaries have gentle basalt eruptions."],
      ["Destructive (ocean-continent)", "These have explosive volcanoes."],
      ["Destructive (ocean-ocean)", "These form volcanic island arcs."],
    ],
    answer: "A",
    explanation: "At a **conservative** boundary such as the San Andreas Fault no crust is made or destroyed, so there is no magma.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which pair of plates meets at the San Andreas Fault?",
    options: [
      ["Pacific and North American", "Correct: they slide past each other."],
      ["Nazca and South American", "These meet along the west coast of South America."],
      ["Indo-Australian and Eurasian", "These collide to form the Himalayas."],
      ["African and South American", "These are separated by the Mid-Atlantic Ridge."],
    ],
    answer: "A",
    explanation: "The San Andreas Fault is a conservative boundary between the **Pacific** and **North American** plates.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "How do volcanoes form at a hot spot such as Hawaii?",
    options: [
      ["A plume of hot mantle rises under the middle of a plate", "Correct: the plate moves over it, leaving a chain of volcanoes."],
      ["Two oceanic plates collide and one is subducted", "That forms island arcs such as Japan."],
      ["Two plates slide past each other along a fault", "No magma forms at conservative boundaries."],
      ["Continental crust is crumpled and thickened", "That forms fold mountains."],
    ],
    answer: "A",
    explanation: "Hawaii lies far from any boundary, over a **hot spot**; the islands get older away from the active volcano.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why do volcanoes at destructive boundaries usually erupt more **explosively** than those at constructive boundaries?",
    options: [
      ["Their magma is thick and gas-rich, so pressure builds until it is released violently", "Correct: viscous magma traps gas."],
      ["Their magma is runny basalt that flows out easily and continuously", "Runny basalt gives gentle eruptions, typical of constructive boundaries."],
      ["They lie under deep ocean water, which makes the eruptions stronger", "Most destructive-boundary volcanoes are on land or islands; water depth is not the main cause."],
      ["The plates move apart faster there, opening very wide cracks", "Plates move together at destructive boundaries."],
    ],
    answer: "A",
    explanation: "Melting above the subducted plate gives **viscous, gas-rich magma**; gas cannot escape easily, so pressure builds.",
    hints: ["Compare the type of magma at each boundary.", "What happens to gas in thick magma?"],
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A region has deep earthquakes, a deep ocean trench offshore, fold mountains and explosive volcanoes. Which boundary is it most likely to be?",
    options: [
      ["Oceanic plate subducting beneath a continental plate", "Correct: the trench, deep earthquakes and volcanoes all point to subduction."],
      ["Two continental plates colliding and crumpling upwards", "Collision zones have no trench and few volcanoes."],
      ["Two plates sliding past each other", "Conservative boundaries have no volcanoes or trench."],
      ["Two plates moving apart under an ocean", "Constructive boundaries have shallow earthquakes and a ridge, not a trench."],
    ],
    answer: "A",
    explanation: "Trench + deep earthquakes + fold mountains + explosive volcanoes = **ocean-continent destructive boundary**, as in the Andes.",
    hints: ["Which boundary has a trench?", "Deep earthquakes follow a sinking plate."],
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "In a fictional sample of 250 strong earthquakes, 170 occurred at destructive plate boundaries. What percentage is this?",
    value: 68, unit: "%",
    wrong: [170, 32],
    explanation: "170 ÷ 250 × 100 = 68 %.",
  });
  b.calc({
    d: 4, skill: "ANALYSIS",
    stem: "In a fictional hot-spot chain, the active volcano sits over the hot spot and an extinct island 630 km away has lava 7.0 million years old. Calculate the average speed of the plate in centimetres per year (give the number only).",
    value: 9,
    wrong: [90, 4.41],
    explanation: "630 ÷ 7.0 = 90 km per million years = 9,000,000 cm ÷ 1,000,000 years = 9 cm per year.",
    workedSolution: "1. Distance = 630 km; time = 7.0 million years.\n2. Speed = 630 ÷ 7.0 = 90 km per million years.\n3. 90 km = 9,000,000 cm, so 9,000,000 ÷ 1,000,000 = 9 cm per year.",
    hints: ["Find the distance and the difference in age.", "1 km = 100,000 cm."],
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the process by which one plate sinks beneath another into the mantle.",
    accepted: ["subduction", "subducting", "subducted"],
    wrong: ["convection"],
    explanation: "**Subduction**, which forms a trench and melts the sinking plate.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the examples.",
    template: "The Andes formed where the {{blank:a}} plate is subducted beneath the South American plate. The Himalayas formed where the Indo-Australian plate collides with the {{blank:b}} plate. The Mid-Atlantic Ridge is a {{blank:c}} boundary.",
    blanks: [
      { id: "a", accepted: ["Nazca"], wrong: "Pacific" },
      { id: "b", accepted: ["Eurasian", "Eurasia"], wrong: "African" },
      { id: "c", accepted: ["constructive", "divergent"], wrong: "conservative" },
    ],
    explanation: "Nazca under South America; India into Eurasia; the Atlantic ridge is constructive.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each boundary type to a named example.",
    pairs: [
      ["Constructive", "East African Rift Valley"],
      ["Destructive (ocean-continent)", "Andes"],
      ["Collision", "Himalayas"],
      ["Conservative", "San Andreas Fault"],
    ],
    explanation: "One named example per boundary type is essential for exams.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "True or false: most of the world's active volcanoes lie around the Pacific Ocean.",
    answer: true,
    feedbackTrue: "Correct: the Pacific 'Ring of Fire' is a chain of destructive boundaries.",
    feedbackFalse: "The Pacific 'Ring of Fire' of destructive boundaries contains most of the world's active volcanoes.",
    explanation: "The Ring of Fire runs from New Zealand through Indonesia, Japan and Alaska to the Andes.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Describe the world distribution of earthquakes.",
    points: [
      "Found in narrow belts / along plate boundaries",
      "Around the edge of the Pacific (Ring of Fire), e.g. Japan, Chile",
      "Another named belt, e.g. Mediterranean to the Himalayas / along the Mid-Atlantic Ridge / East Africa",
    ],
    modelAnswer: "Earthquakes occur in narrow belts along plate boundaries. The largest belt circles the Pacific Ocean, through Japan, Indonesia and Chile. Another runs from the Mediterranean through Iran to the Himalayas, and a narrow line follows the Mid-Atlantic Ridge.",
    explanation: "Pattern plus named belts.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain why there are earthquakes but no volcanoes at a conservative plate boundary.",
    points: [
      "Plates slide past each other (in the same or opposite directions)",
      "They lock together by friction, stress builds, then they jerk free, causing earthquakes",
      "No crust is created or destroyed / no subduction",
      "So no magma is produced to supply volcanoes",
    ],
    modelAnswer: "The plates slide past each other. Friction locks them, stress builds up, and when it is released the plates jerk, causing an earthquake. As no plate is subducted and no gap opens, no rock melts, so there is no magma for volcanoes.",
    explanation: "Movement, friction and stress, no subduction, no magma.",
    hints: ["What do the plates do?", "Where does magma come from at other boundaries?"],
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 7,
    stem: "\"Plate boundaries explain the location of all earthquakes and volcanoes.\" How far do you agree?",
    points: [
      "Most earthquakes occur along boundaries (Ring of Fire, Alpine-Himalayan belt, mid-ocean ridges)",
      "Destructive boundaries: subduction gives earthquakes and explosive volcanoes, e.g. Andes, Japan",
      "Constructive boundaries: rifting gives small earthquakes and basalt volcanoes, e.g. Iceland, East African Rift",
      "Collision and conservative: earthquakes but few/no volcanoes, e.g. Himalayas, San Andreas",
      "Exceptions: hot-spot volcanoes inside plates, e.g. Hawaii",
      "Exceptions: earthquakes away from boundaries, e.g. on old faults within plates, or caused by people (reservoirs, mining)",
      "Judgement: boundaries explain the great majority, but not all",
    ],
    levels: geographyLevels(7),
    modelAnswer: "Most earthquakes and volcanoes do occur along plate boundaries. Around the Pacific, oceanic plates are subducted, producing strong earthquakes and explosive volcanoes in the Andes and Japan. At constructive boundaries such as Iceland and the East African Rift, plates separate and basalt magma rises, giving gentle eruptions and small earthquakes. Collision zones such as the Himalayas and conservative boundaries such as the San Andreas Fault have powerful earthquakes but no volcanoes. However, the statement is not entirely true. Hawaii lies in the middle of the Pacific plate, above a hot spot. Some earthquakes occur on old faults within plates, and some are triggered by people: earthquakes followed the filling of Lake Kariba in the 1960s, and deep mining causes tremors. So I largely agree: boundaries explain the great majority, but hot spots and intraplate earthquakes are exceptions.",
    explanation: "Credit explanation by boundary type and the use of exceptions in the judgement.",
    hints: ["Go through each boundary type.", "Think of Hawaii and earthquakes inside plates."],
  });
  b.struct({
    d: 3, skill: "ANALYSIS",
    stem: `Table 1 shows the location of a sample of 200 strong earthquakes and 52 active volcanoes (fictional data).\n\n${QUAKES}`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "What percentage of the active volcanoes are at destructive boundaries? Give your answer to one decimal place.", value: 78.8, unit: "%", tol: 0.05, answer: "78.8", wrong: [41], explanation: "41 ÷ 52 × 100 = 78.8 %." }),
      P.num({ label: "(b)", marks: 1, stem: "How many of the earthquakes occurred at boundaries where plates move together (destructive and collision)?", value: 152, wrong: [128], explanation: "128 + 24 = 152." }),
      P.manual({ label: "(c)", marks: 2, stem: "Explain why there are no active volcanoes at conservative boundaries.", points: [
        "No subduction / no crust destroyed or created",
        "So no rock melts and no magma is formed",
      ], modelAnswer: "Plates slide past each other with no subduction or separation, so no rock melts and there is no magma.", explanation: "No magma source." }),
      P.manual({ label: "(d)", marks: 3, stem: "Explain why destructive boundaries have more strong earthquakes than constructive boundaries.", points: [
        "Plates push together and one is forced down: great friction and stress",
        "Stress builds over large areas and is released suddenly in powerful earthquakes, some deep",
        "At constructive boundaries plates move apart with less friction, so earthquakes are smaller and shallow",
      ], modelAnswer: "At destructive boundaries a plate is forced beneath another, so friction locks them and huge stress builds before it is released as strong earthquakes at many depths. At constructive boundaries the plates pull apart, so less stress builds and earthquakes are shallow and usually small.", explanation: "Compare stress at the two boundaries." }),
    ],
    hints: ["Divide the part by the whole.", "Where is magma produced?"],
    explanation: "Practice in interpreting the distribution of tectonic activity by boundary type.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS",
    stem: `Table 2 shows a fictional chain of hot-spot islands in an ocean.\n\n${CHAIN}`,
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "Describe the relationship between distance from the active volcano and age.", points: [
        "The further from the active volcano, the older the island (positive relationship)",
        "Uses data, e.g. Ana 0 km, 0.4 million years; Duna 640 km, 8.4 million years",
      ], modelAnswer: "Age increases with distance: Ana, at the active volcano, is 0.4 million years old, while Duna, 640 km away, is 8.4 million years old.", explanation: "Relationship and data." }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the plate speed between Bela and Coro in km per million years.", value: 80, wrong: [75, 161.5], explanation: "Distance 420 − 180 = 240 km; time 5.6 − 2.6 = 3.0 million years; 240 ÷ 3 = 80 km per million years." }),
      P.mcq({ label: "(c)", marks: 1, stem: "Which island is most likely to be extinct and most eroded?", options: [
        ["Duna", "Correct: oldest and furthest from the hot spot."],
        ["Ana", "Ana is over the hot spot and still active."],
        ["Bela", "Bela is younger than Coro and Duna."],
        ["Coro", "Coro is younger and closer to the hot spot than Duna."],
      ], answer: "A", explanation: "Islands are carried away from the plume, become extinct and are eroded over time." }),
      P.manual({ label: "(d)", marks: 3, stem: "Explain how a chain of islands like this forms.", points: [
        "A fixed plume of hot mantle (hot spot) lies beneath the plate",
        "Magma rises and builds a volcano on the plate above it",
        "The plate moves on, carrying the volcano away so it becomes extinct, and a new volcano forms over the hot spot",
      ], modelAnswer: "A plume of hot mantle stays fixed beneath the moving plate. Magma rising from it builds a volcano. As the plate moves, the volcano is carried away from its magma supply and becomes extinct, while a new volcano forms above the hot spot, so a chain of islands of increasing age forms.", explanation: "Fixed plume, moving plate." }),
    ],
    hints: ["Use differences in distance and age.", "Which island has moved furthest from the plume?"],
    explanation: "Practice in using hot-spot data to show plate movement.",
  });

  b.card("DEFINITION", "Subduction", "The sinking of a denser oceanic plate beneath another plate into the mantle, where it melts.");
  b.card("CONCEPT", "Constructive boundary", "Plates move apart; magma rises to form new crust; ridges and rift valleys; small shallow earthquakes and gentle eruptions. E.g. Mid-Atlantic Ridge, East African Rift.");
  b.card("CONCEPT", "Destructive boundary", "Oceanic plate subducted; trench, fold mountains or island arcs; strong earthquakes and explosive volcanoes. E.g. Nazca and South American plates (Andes).");
  b.card("CONCEPT", "Collision boundary", "Two continental plates push together and crumple into fold mountains; strong earthquakes, few or no volcanoes. E.g. Himalayas.");
  b.card("CONCEPT", "Conservative boundary", "Plates slide past each other; crust neither made nor destroyed; earthquakes but no volcanoes. E.g. San Andreas Fault.");
  b.card("DEFINITION", "Hot spot", "A plume of hot mantle rock beneath a plate, away from boundaries, forming a chain of volcanoes as the plate moves. E.g. Hawaii.");
  b.card("VOCABULARY", "Ring of Fire", "The belt of destructive boundaries around the Pacific Ocean with most of the world's active volcanoes and strongest earthquakes.");
  b.card("CONCEPT", "Plate movement and climate", "Continents drift through latitudes, mountains alter winds and rain, new seaways change ocean currents, and eruptions release ash and gases.");
});
