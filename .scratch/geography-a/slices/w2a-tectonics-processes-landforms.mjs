// W2a: tectonics.processes-landforms (both boards; DEM detail is ZIMSEC). Numbers computed: scarp gradient, rift widening time,
// subduction dip angles (see tables/w2a-tectonics-processes-landforms.mjs for the lesson examples).
import { concept, P, geographyLevels, chk, rnd, gradient, ZIM } from "../lib.mjs";
import { mc, tbl } from "../tables/w2a-_q.mjs";

const gA = gradient(76, 200); // lesson-style scarp
chk(gA.percent, 38);
const yearsToWiden = (km, mmPerYear) => (km * 1e6) / mmPerYear;

// Struct 1: DEM profile
const XS = [0, 80, 160, 240, 320, 400, 480];
const HS = [980, 980, 976, 940, 905, 902, 902];
const PROFILE = tbl(["Distance along line (m)", "Height (m)"], XS.map((x, i) => [x, HS[i]]));
const throwS = chk(HS[0] - HS[5], 78);
const gS = gradient(HS[2] - HS[4], 160);
const gradS = rnd(gS.percent, 1, 44.4, "gradS");
// Struct 2: Benioff zone
const DIST = [90, 130, 170, 210];
const DEPTH = [54, 78, 102, 126];
const FOCI = tbl(["Distance from trench (km)", "Depth of earthquake focus (km)"], DIST.map((d, i) => [d, DEPTH[i]]));
const dip = gradient(DEPTH[3], DIST[3]);
const dipDeg = rnd(dip.angleDeg, 1, 31.0, "dip");

concept("ageo.tectonics.processes-landforms", { file: "tectonics/processes-landforms", keyPrefix: "tectonics.processes-landforms" }, (b) => {
  mc(b, 1, "RECALL", "Which type of stress produces **normal faults** and rift valleys?", [
    ["Tension, which pulls the crust apart", "Correct: normal faults form when the crust is stretched."],
    ["Compression, which squeezes the crust together", "Compression produces folds and reverse or thrust faults."],
    ["Shear, which makes blocks slide sideways past each other", "Shear produces strike-slip (transform) faults."],
    ["Erosion, which wears the surface away over time", "Erosion is not a tectonic stress, and rift valleys are made by faulting."],
  ], "Normal faults form under **tension**; the block above the fault plane drops.");
  mc(b, 2, "UNDERSTANDING", "What is a **rift valley**?", [
    ["A block of crust that has dropped between two faults", "Correct: a graben formed by stretching of the crust."],
    ["A valley cut by a river along the line of a joint in the rock", "A river may follow a rift valley, but faulting makes it."],
    ["A valley carved by a glacier that has since melted away", "Rift valleys are not glacial features."],
    ["A gap between two volcanoes that have grown towards each other", "A rift valley is made by dropping, not by volcano growth."],
  ], "A rift valley is a **graben**: a down-dropped block between faults.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "Which landform is typical where an oceanic plate is subducted beneath another oceanic plate?", [
    ["A volcanic island arc beside an ocean trench", "Correct: magma rises above the sinking slab to build a curved chain of volcanic islands."],
    ["A mid-ocean ridge with basalt lava flows beneath the sea", "A ridge forms where plates move apart."],
    ["A high fold mountain range with a snow-covered summit", "Fold mountains are typical of collision and oceanic-continental boundaries."],
    ["A fault scarp along a long linear rift in the continent", "Scarps and rifts are linked with tension in continents."],
  ], "Oceanic-oceanic convergence produces a **trench and a volcanic island arc**, such as the Mariana Islands.", { daily: true });
  mc(b, 2, "RECALL", "Which type of volcano has steep sides and erupts explosively?", [
    ["Composite volcano", "Correct: thick, sticky, silica-rich magma traps gas and erupts explosively at subduction zones."],
    ["Shield volcano", "Shield volcanoes have gentle slopes and runny basalt lava."],
    ["Fissure volcano", "Fissure eruptions are mostly effusive basalt flows from long cracks."],
    ["Dormant volcano", "Dormant describes activity, not the type or shape of volcano."],
  ], "**Composite volcanoes** have steep cones of alternating ash and lava and erupt explosively.");
  mc(b, 3, "APPLICATION", "Why are there very few active volcanoes in the Himalaya, although it is a zone of intense folding and earthquakes?", [
    ["Two continental plates collide, so little oceanic crust is subducted to melt", "Correct: without a sinking oceanic slab, little magma forms; the crust is shortened and thickened."],
    ["The mountains are too young for any magma to have formed beneath them", "The collision began about 50 million years ago, so age is not the reason."],
    ["The plates are moving apart, so magma has already left the region", "The plates are moving together, not apart, at a collision boundary."],
    ["The mountains lie on a conservative boundary where plates only slide", "India and Eurasia are colliding, not sliding past each other."],
  ], "At a **collision** boundary neither plate subducts, so there is no sinking slab to release water and form magma; crust is shortened by folding and thrusting.",
  { hints: ["Magma forms above a subducting oceanic slab."] });
  mc(b, 3, "ANALYSIS", "Earthquake foci get steadily deeper with distance from an ocean trench. What does this pattern show?", [
    ["The plate descends at an angle beneath the overriding plate", "Correct: the foci mark the sinking slab (the Benioff zone)."],
    ["The two plates are sliding past each other on a vertical fault", "At a transform boundary foci are shallow along a vertical fault."],
    ["New crust is being made along a line of rising magma", "At divergent boundaries, earthquakes are shallow."],
    ["The crust is being stretched on both sides of the trench", "Stretching produces shallow earthquakes near the surface."],
  ], "Deepening foci away from the trench trace the **descending slab**, showing subduction.", { hints: ["What kind of surface would earthquakes follow?"] });
  mc(b, 4, "ANALYSIS", "A student claims that the Andes and the Himalaya formed in exactly the same way. Which statement best corrects the claim?", [
    ["The Andes lie above a subducting oceanic plate, so they have many volcanoes", "Correct: Andean volcanoes form from melting above the Nazca slab, while the Himalaya formed by collision."],
    ["The Andes formed by tension and the Himalaya by compression", "Both are compressional; neither is a rift."],
    ["The Himalaya are made of volcanic rock and the Andes are not", "The Himalaya are mainly folded sedimentary and metamorphic rock."],
    ["The Andes are older than the continents they lie on", "The continents are far older than the mountain ranges."],
  ], "The Andes: oceanic-continental subduction with a trench, volcanoes and folding. The Himalaya: continent-continent collision with few volcanoes.",
  { hints: ["Compare which plates meet at each range."] });

  b.tf({ d: 1, skill: "RECALL", stem: "An anticline is an upward arch in rock layers.", answer: true,
    feedbackTrue: "Correct: an anticline is an upfold; a syncline is a downfold.", feedbackFalse: "Not so: an upward arch is an anticline.",
    explanation: "An **anticline** is an arch (upfold) and a **syncline** is a trough (downfold)." });
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "A horst is a block of crust that has dropped between two normal faults.", answer: false,
    feedbackFalse: "Correct: a horst is the block left standing; the dropped block is a graben.", feedbackTrue: "Not so: that describes a graben.",
    explanation: "A **graben** drops between faults and forms a rift valley; a **horst** is left standing." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each landform to the process that forms it.",
    pairs: [
      ["Rift valley", "Tension and normal faulting of a stretched continental crust"],
      ["Ocean trench", "Subduction of a dense oceanic plate"],
      ["Fold mountains", "Compression and folding at a convergent or collision boundary"],
      ["Mid-ocean ridge", "Magma rising and cooling where plates move apart"],
    ],
    extraRight: ["Chemical weathering of limestone"],
    explanation: "Each landform is linked to the plate movement and stress that form it." });
  b.fib({ d: 2, skill: "RECALL", stem: "Choose the correct term for each blank.",
    template: "A block of crust dropped between two normal faults is a {{blank:a}}. Where an oceanic plate sinks under another oceanic plate, a curved chain of volcanoes called an {{blank:b}} forms. A zone of earthquake foci dipping under a continent is the {{blank:c}} zone.",
    blanks: [
      { id: "a", accepted: ["graben"], choices: ["graben", "horst", "nappe"] },
      { id: "b", accepted: ["island arc"], choices: ["island arc", "mid-ocean ridge", "rift valley"] },
      { id: "c", accepted: ["Benioff"], choices: ["Benioff", "Mohorovičić", "Gutenberg"] },
    ], explanation: "A graben is a dropped block; an island arc forms above an oceanic-oceanic subduction zone; the Benioff zone traces the descending slab." });
  b.short({ d: 2, skill: "RECALL", daily: true, stem: "Name the zone of earthquake foci that slopes down beneath a continent at a subduction zone.",
    accepted: ["Benioff zone", "Wadati-Benioff zone", "Benioff"], explanation: "The **Benioff (Wadati-Benioff) zone** is the sloping plane of earthquakes along the sinking slab." });

  const g1 = chk(gradient(54, 120).percent, 45);
  b.num({ d: 3, skill: "APPLICATION", calculator: true, unit: "%",
    stem: "On a profile across a fault scarp the ground falls from 750 m to 696 m over a horizontal distance of 120 m. Calculate the gradient of the scarp as a percentage.",
    hints: ["Gradient = vertical drop ÷ horizontal distance."],
    value: g1, wrong: [2.22, 5.4],
    explanation: "Drop = 750 − 696 = 54 m. Gradient = 54 ÷ 120 = 0.45 = **45%**. The value 2.22 is 120 ÷ 54 (horizontal ÷ vertical)." });
  b.calc({ d: 3, skill: "APPLICATION", calculator: true, unit: "years",
    stem: "A continental rift is widening by 8 mm per year. Calculate how many years it takes to widen by 1 km. (1 km = 1 000 000 mm.)",
    hints: ["Convert 1 km to millimetres, then divide by the rate."],
    value: yearsToWiden(1, 8), wrong: [8000, 125],
    explanation: "1. 1 km = 1 000 000 mm.\n2. Time = 1 000 000 ÷ 8 = **125 000 years**.\n3. The value 125 forgets the three zeros (125 thousand years)." });

  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain how a rift valley forms.",
    hints: ["Start with the direction of plate movement and the stress it causes."],
    points: [
      "Plate movement pulls the crust apart (tension), so the crust is stretched.",
      "The stretched crust thins and fractures along normal faults.",
      "The central block between the faults drops down relative to the sides (a graben).",
      "Magma may rise through the thinned crust, producing volcanoes along the rift.",
    ],
    modelAnswer: "Where plates move apart the crust is stretched and thinned. It breaks along normal faults and the block between two faults drops to form a steep-sided rift valley. Magma may rise through the weak crust, giving volcanoes along the valley, as in the East African Rift.",
    explanation: "Tension, faulting and subsidence of a central block form a rift valley." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain how fold mountains form at a collision boundary.",
    hints: ["Describe the movement, then what happens to the rocks."],
    points: [
      "Two continental plates move towards each other, and neither is dense enough to subduct.",
      "Sediments that built up between them are squeezed by compression.",
      "The rocks are folded (anticlines and syncline) and broken by thrust faults.",
      "The crust is shortened and thickened, and uplifted to form high mountains such as the Himalaya.",
    ],
    modelAnswer: "When two continental plates collide neither subducts. Compression squeezes the sediments between them into folds and breaks them along thrust faults. The crust shortens and thickens and is pushed up to form fold mountains, as the Himalaya formed when India met Eurasia.",
    explanation: "Collision causes compression, folding, thrusting and uplift." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why a chain of volcanic islands forms where one oceanic plate is subducted under another.",
    hints: ["Think about what the sinking plate releases."],
    points: [
      "The sinking oceanic slab releases water as it descends.",
      "The water lowers the melting point of the mantle above, and magma forms.",
      "The magma rises through the overriding plate and erupts on the sea floor, building up composite volcanoes into an arc of islands.",
    ],
    modelAnswer: "As the subducting oceanic plate sinks it releases water, which lowers the melting point of the mantle above it. Magma forms, rises and erupts through the overriding plate to build a curved chain of volcanoes that rise above the sea as an island arc.",
    explanation: "Water from the slab causes melting, giving a chain of volcanoes." });
  b.manualShort({ d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Describe how a mid-ocean ridge is formed.",
    points: [
      "Two oceanic plates move apart at a divergent boundary.",
      "Magma rises from the mantle to fill the gap and cools to form new basalt crust.",
      "The new crust is hot and buoyant, so a chain of underwater mountains stands about 2-3 km above the ocean floor.",
    ],
    modelAnswer: "Two oceanic plates move apart and magma rises to fill the gap. It cools to form basalt, adding new crust. The hot, buoyant new crust makes the ridge stand 2-3 km higher than the ocean floor around it.",
    explanation: "Mid-ocean ridges are built by rising and cooling magma at divergent boundaries." });

  b.struct({ d: 4, skill: "ANALYSIS", examStyle: true, applies: ZIM,
    stem: `A digital elevation model of an area in a rift basin gives the following heights along a line across a fault (data invented for this exercise):\n\n${PROFILE}`,
    hints: ["Throw = height of the high surface − height of the low surface.", "The scarp is the steep part between 160 m and 320 m."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the throw of the fault, using the heights at 0 m and 400 m, in metres.", value: throwS, unit: "m", wrong: [71, 3],
        explanation: "980 − 902 = 78 m." }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the gradient of the scarp between 160 m and 320 m, as a percentage to 1 decimal place.", value: gradS, dp: 1, unit: "%", wrong: [2.25, 71],
        explanation: "Drop = 976 − 905 = 71 m. Gradient = 71 ÷ 160 = 0.444 = 44.4%." }),
      P.mcq({ label: "(c)", stem: "Which type of fault is most likely?", options: [
        ["A normal fault, formed by tension", "Correct: the low side is the downthrown block in a stretched rift."],
        ["A reverse fault, formed by compression", "Reverse faults form in compression and push one block up over the other."],
        ["A strike-slip fault, formed by shear", "Strike-slip faults move horizontally and give little height difference."],
        ["A thrust fault, formed by collision", "Thrusts form at collision boundaries."],
      ], answer: "A", explanation: "A rift basin is a stretched region, so normal faults are expected." }),
      P.manual({ label: "(d)", marks: 3, stem: "Explain how a DEM can be used to study a fault scarp.",
        points: [
          "A DEM stores the height of each cell, so profiles across the scarp can be extracted to measure throw.",
          "Slope can be calculated for each cell from the height differences to find the steepest part (the scarp).",
          "Shaded relief or 3D views from the DEM show the scarp's length and direction and help to map the fault.",
        ],
        modelAnswer: "A DEM stores heights in a grid, so a profile across the scarp gives its throw and gradient. Slope can be calculated for every cell to find the steepest zone, and shaded-relief images show the length and direction of the scarp so the fault can be mapped.",
        explanation: "DEMs let us measure and map landforms." }),
    ], explanation: "Calculate throw and gradient from a DEM profile and use them to identify the fault." });

  b.struct({ d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `Earthquake foci were recorded beneath the coast of an oceanic-continental convergent boundary (illustrative data):\n\n${FOCI}`,
    hints: ["Dip angle = tan⁻¹(depth ÷ horizontal distance).", "In (d) cover both boundary types."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the angle of dip of the descending plate between the trench and the focus at 210 km, to 1 decimal place, in degrees.", value: dipDeg, dp: 1, unit: "°", wrong: [0.6, 59],
        explanation: "tan⁻¹(126 ÷ 210) = tan⁻¹(0.6) = 31.0°. The value 59° is the angle from the vertical." }),
      P.mcq({ label: "(b)", stem: "What do the data show?", options: [
        ["The depth of earthquakes increases away from the trench", "Correct: depth rises from 54 km at 90 km to 126 km at 210 km."],
        ["The depth of earthquakes decreases away from the trench", "The depths increase."],
        ["All of the earthquakes occur at the same depth", "The depths range from 54 to 126 km."],
        ["The earthquakes are all shallower than 30 km", "The shallowest recorded is 54 km."],
      ], answer: "A", explanation: "Depth increases steadily with distance from the trench." }),
      P.manual({ label: "(c)", marks: 4, stem: "Explain why composite volcanoes form on the continent above the descending plate.",
        points: [
          "At about 100 km depth the descending oceanic plate releases water.",
          "The water lowers the melting point of the mantle above the slab.",
          "Magma forms, is less dense than the surrounding rock and rises through the crust.",
          "Repeated explosive eruptions of the thick magma build steep composite volcanoes.",
        ],
        modelAnswer: "The sinking oceanic plate releases water at depth. This lowers the melting point of the mantle above, so magma forms. The magma is lighter than the rock around it and rises through the crust to erupt. Repeated eruptions of the thick magma build steep composite volcanoes.",
        explanation: "Water from the slab causes melting, and the magma rises." }),
      P.manual({ label: "(d)", marks: 5, stem: "Compare the landforms formed where an oceanic plate meets a continental plate with those where it meets another oceanic plate.",
        points: [
          "In both cases a trench forms where the denser oceanic plate is subducted.",
          "In both cases subduction produces volcanoes from melting above the slab.",
          "Oceanic-continental: volcanoes form on the continent as a chain of composite volcanoes.",
          "Oceanic-continental: the continental edge is squeezed into fold mountains such as the Andes.",
          "Oceanic-oceanic: volcanoes rise from the sea floor into a curved volcanic island arc, and there are no fold mountains on a continent.",
        ],
        modelAnswer: "Both boundaries have a trench where the dense oceanic plate sinks, and both have volcanoes formed from magma above the slab. Where the oceanic plate meets a continent the volcanoes form on the continent and the margin is folded into mountains such as the Andes. Where it meets another oceanic plate the volcanoes form an island arc in the sea, such as the Marianas, without continental fold mountains.",
        explanation: "Similarities: trench and volcanoes. Differences: location of volcanoes and fold mountains." }),
    ], explanation: "Interpret subduction-zone data and compare boundaries." });

  b.ext({ d: 4, skill: "EVALUATION", marks: 8,
    stem: "Assess the importance of plate boundaries in explaining the global distribution of volcanoes.",
    hints: ["Cover each boundary type and the exceptions.", "Reach a judgement."],
    points: [
      "Most volcanoes lie along plate boundaries, shown by the Pacific Ring of Fire around subduction zones.",
      "Subduction zones produce many composite volcanoes because water from the slab causes melting.",
      "Divergent boundaries produce basalt volcanoes along ridges and rifts, as in Iceland and the East African Rift.",
      "Collision boundaries have few volcanoes; conservative boundaries have none, so not all boundaries have volcanoes.",
      "Hot spots such as Hawaii produce volcanoes in the middle of plates, away from boundaries.",
      "Hot spot chains record plate movement over a fixed plume.",
      "Local factors (the type of magma, the thickness of crust) affect the type of volcano but not its position.",
      "Judgement: boundaries explain most volcanoes, but not all of them, and not at every boundary type.",
    ],
    levels: geographyLevels(8),
    modelAnswer: "Most of the world's active volcanoes lie along plate boundaries, so boundaries are the main explanation. Subduction zones, such as those that form the Pacific Ring of Fire, have many explosive composite volcanoes because water released from the slab causes melting. Divergent boundaries also have volcanoes, such as the basalt volcanoes of Iceland and the East African Rift, but collision boundaries have few and conservative boundaries have none. Hot spots such as Hawaii form volcanoes in the middle of plates, so boundaries cannot explain all of the distribution. I conclude that the type of boundary is the most important single factor, but it must be combined with hot spots to explain the whole distribution.",
    wordLimit: { max: 300 }, explanation: "Judge how far boundaries account for the pattern and what they cannot explain." });

  b.card("DEFINITION", "Fault", "A fracture in rock along which the sides have moved. Normal faults form in tension, reverse and thrust faults in compression, and strike-slip faults in shear.");
  b.card("DEFINITION", "Rift valley (graben)", "A long, steep-sided valley formed where a block of crust has dropped between two normal faults as the crust is stretched, as in the East African Rift.");
  b.card("CONCEPT", "Features of oceanic-continental convergence", "Ocean trench, Benioff-zone earthquakes, composite volcanoes and fold mountains (for example the Andes).");
  b.card("CONCEPT", "Features of oceanic-oceanic convergence", "Ocean trench and a curved chain of volcanoes forming a volcanic island arc (for example the Mariana Islands).");
  b.card("CONCEPT", "Features of continental collision", "Crust is shortened and thickened by folding and thrust faulting to form high fold mountains (the Himalaya); very few volcanoes.");
  b.card("DEFINITION", "Anticline and syncline", "An anticline is an arch (upfold) in rock layers; a syncline is a trough (downfold).");
  b.card("CONCEPT", "Composite and shield volcanoes", "Composite: steep, explosive, subduction zones. Shield: broad and gentle, runny basalt, divergent boundaries and hot spots.");
  b.card("FORMULA", "Gradient of a scarp", "Gradient (%) = vertical drop ÷ horizontal distance × 100; angle = tan⁻¹(vertical ÷ horizontal).");
  b.card("FACT", "East African Rift", "A continental divergent boundary running thousands of kilometres from Afar towards Mozambique, with eastern and western branches, rift lakes and volcanoes.");
});
