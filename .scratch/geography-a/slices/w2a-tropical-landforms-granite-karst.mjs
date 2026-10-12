// W2a: tropical.landforms-granite-karst (both boards; duricrust is ZIMSEC detail). Numbers computed: flank gradient, solution
// lowering time, density of depressions, regolith range, density ratio (see tables/w2a-tropical-landforms-granite-karst.mjs).
import { concept, P, geographyLevels, chk, rnd, gradient, range } from "../lib.mjs";
import { mc, tbl } from "../tables/w2a-_q.mjs";

// Struct 1: joint spacing and regolith depth
const JOINT = [0.2, 0.5, 1.0, 2.5, 6.0];
const REG = [38, 26, 15, 6, 1];
const JTAB = tbl(["Site", "Mean joint spacing (m)", "Depth of weathered regolith (m)"], JOINT.map((j, i) => ["ABCDE"[i], j, REG[i]]));
const regRange = chk(range(REG), 37);
// Struct 2: karst areas
const KTAB = tbl(["Area", "Closed depressions per km²", "Hill height (m)", "Form of the hills"],
  [["X", 5.2, "80-140", "Rounded or conical, joined in clusters"], ["Y", 0.4, "120-200", "Steep-sided, isolated, on a flat plain"], ["Z", 0.1, "under 10", "Low limestone pavement, no hills"]]);
const ratioXY = chk(5.2 / 0.4, 13, 1e-9);

concept("ageo.tropical.landforms-granite-karst", { file: "tropical/landforms-granite-karst", keyPrefix: "tropical.landforms-granite-karst" }, (b) => {
  mc(b, 1, "RECALL", "What is a **dwala (bornhardt)**?", [
    ["A large dome of massive granite or gneiss", "Correct: it rises abruptly from the surrounding plain."],
    ["A small pile of rounded boulders on a hilltop or slope", "That is a tor or a kopje."],
    ["A hard crust of iron oxides in tropical soil", "That is laterite, a type of duricrust."],
    ["A closed depression in a soluble limestone landscape", "That is a sinkhole or cockpit."],
  ], "A **bornhardt** (dwala in Ndebele, ruware in Shona) is a large dome of massive rock.");
  mc(b, 2, "UNDERSTANDING", "What is the main rock property that explains where granite landforms survive as hills?", [
    ["Widely spaced joints, which resist deep weathering", "Correct: massive rock lets little water in, so it weathers slowly."],
    ["A high concentration of calcium carbonate in the rock", "Granite has no significant calcium carbonate."],
    ["A very high proportion of clay minerals", "Clay forms where granite has already weathered."],
    ["A layered structure that dips steeply downslope", "Granite is typically massive rather than bedded."],
  ], "**Joint spacing** is the key control: closely jointed rock weathers deeply, massive rock stands out as a hill.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "What happens in stage 1 of the two-stage theory of bornhardt formation?", [
    ["Deep weathering below the surface along joints", "Correct: closely jointed rock is rotted to depth while massive rock remains fresh."],
    ["Stripping of the weathered layer by running water and wash", "That is stage 2."],
    ["Retreat of scarps leaving a widening gentle pediment", "That is the pediplanation theory."],
    ["Cooling of magma into a dome-shaped intrusion", "This is not a stage of the weathering and stripping theory."],
  ], "Stage 1 is **subsurface weathering**; stage 2 is **stripping** of the regolith.");
  mc(b, 2, "RECALL", "On which rock does karst form?", [
    ["Limestone, which is made of calcium carbonate", "Correct: carbonic acid dissolves it."],
    ["Granite, which is made of quartz and feldspar", "Granite is attacked by hydrolysis, not dissolved."],
    ["Basalt, which is made of iron-rich minerals", "Basalt does not dissolve to give karst."],
    ["Sandstone, which is made of cemented sand grains", "Quartz sandstone is very resistant to solution."],
  ], "Karst forms on soluble rock, mainly **limestone**.", { daily: true });
  mc(b, 3, "UNDERSTANDING", "Why is solution of limestone often rapid in the humid tropics?", [
    ["Heavy rain and soil rich in carbon dioxide", "Correct: water is plentiful and rich in carbonic acid."],
    ["Frequent frosts that open cracks in the limestone each night", "Frost is not typical of the humid tropics."],
    ["Strong winds that carry away loose limestone grains and dust", "Wind is not the main agent in karst."],
    ["Lack of any soil or vegetation above the limestone", "The humid tropics have dense vegetation and soil."],
  ], "Plenty of rain and abundant soil CO₂ from vegetation and decay make strong **carbonic acid**.", { hints: ["Think about water supply and where the acid comes from."] });
  mc(b, 3, "UNDERSTANDING", "Which process forms laterite?", [
    ["Leaching of silica, leaving iron and aluminium oxides", "Correct: wet-dry cycles harden the oxide-rich layer."],
    ["Evaporation of salty groundwater at the surface in a desert region", "That forms salt crusts or calcrete, not laterite."],
    ["Freezing and thawing of soil water on high mountains", "Laterite forms in the warm tropics."],
    ["Deposition of fine sediment by rivers on a floodplain", "That forms alluvium."],
  ], "In tropical soils with wet and dry seasons, silica and bases are **leached** and iron and aluminium oxides are left to harden.", { hints: ["Which substances are removed and which stay?"] });
  mc(b, 4, "ANALYSIS", "Which observation best supports the two-stage theory of formation of dwalas?", [
    ["Corestones in deep weathered granite next to the dome", "Correct: fresh cores in rotted rock show subsurface weathering before stripping."],
    ["A dome that is uniformly smooth with no joints at all", "Domes have joints; smoothness alone does not show how they formed."],
    ["A pediment at the foot of an actively retreating scarp", "This supports scarp retreat, rather than deep weathering."],
    ["Frost-shattered rock fragments on the dome's summit", "This shows present-day physical weathering, not how the dome formed."],
  ], "**Corestones** and deep regolith beside a dome show weathering below the surface followed by stripping.", { hints: ["Which evidence shows deep weathering before exposure?"] });

  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "Kopjes are generally much larger than bornhardts.", answer: false,
    feedbackFalse: "Correct: bornhardts are large domes; kopjes and tors are smaller piles of blocks.", feedbackTrue: "Not so: bornhardts are the largest of the three.",
    explanation: "Bornhardts are the largest granite inselbergs; kopjes and tors are smaller." });
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "Tower karst consists of isolated steep-sided limestone hills rising from a flat plain.", answer: true,
    feedbackTrue: "Correct: Guilin in China is a classic example.", feedbackFalse: "Not so: that is exactly the definition of tower karst.",
    explanation: "Tower karst: isolated, steep-sided towers on a flat plain." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each term to its meaning.",
    pairs: [
      ["Bornhardt", "A large dome of massive granite rising from a plain"],
      ["Tor", "A free-standing stack of rounded blocks"],
      ["Laterite", "A hard crust of iron and aluminium oxides in tropical soil"],
      ["Cockpit karst", "Closed star-shaped depressions among conical hills"],
      ["Tower karst", "Isolated steep-sided limestone towers on a plain"],
    ], explanation: "Match each tropical landform to its description." });
  b.fib({ d: 2, skill: "RECALL", stem: "Choose the correct term for each blank.",
    template: "The spacing of {{blank:a}} is the key control of granite landforms. Karst is formed mainly by {{blank:b}} of limestone by carbonic acid. A hard crust of iron oxides is called {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["joints"], choices: ["joints", "rivers", "glaciers"] },
      { id: "b", accepted: ["solution"], choices: ["solution", "freezing", "abrasion"] },
      { id: "c", accepted: ["laterite"], choices: ["laterite", "calcrete", "regolith"] },
    ], explanation: "Joints control granite weathering; solution forms karst; laterite is the iron-oxide crust." });
  b.short({ d: 2, skill: "RECALL", daily: true, stem: "Name the chemical weathering process in which carbonic acid dissolves limestone.",
    accepted: ["carbonation", "solution", "carbonation weathering"], explanation: "**Carbonation** dissolves calcium carbonate as soluble calcium hydrogencarbonate." });

  const gFlank = chk(gradient(165, 220).percent, 75);
  b.num({ d: 3, skill: "APPLICATION", calculator: true, unit: "%",
    stem: "The flank of a dwala rises 165 m over a horizontal distance of 220 m. Calculate the gradient as a percentage.",
    hints: ["Gradient = vertical ÷ horizontal × 100."],
    value: gFlank, wrong: [1.33, 36.9],
    explanation: "Gradient = 165 ÷ 220 = 0.75 = **75%**. The value 1.33 is 220 ÷ 165 (horizontal ÷ vertical)." });
  const lowering = chk((25 * 1000) / 50 * 1000, 500000);
  b.calc({ d: 3, skill: "APPLICATION", calculator: true, unit: "years",
    stem: "A limestone surface is lowered by solution at 50 mm per 1 000 years. Calculate how many years it takes to lower the surface by 25 m.",
    hints: ["Convert metres to millimetres.", "Divide by the rate per 1 000 years, then multiply by 1 000."],
    value: lowering, wrong: [500, 5000],
    explanation: "1. 25 m = 25 000 mm.\n2. Number of 1 000-year periods = 25 000 ÷ 50 = 500.\n3. Time = 500 × 1 000 = **500 000 years**. The value 500 forgets to multiply by 1 000." });
  const density = chk(63 / 18, 3.5);
  b.num({ d: 2, skill: "APPLICATION", calculator: true, daily: true,
    stem: "A survey of 18 km² of tropical limestone finds 63 closed depressions. Calculate the density of depressions per km² to 1 decimal place.",
    value: density, dp: 1, wrong: [0.29, 1134],
    explanation: "Density = 63 ÷ 18 = **3.5 per km²**. The value 0.29 is 18 ÷ 63." });

  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain the two-stage theory for the formation of a bornhardt.",
    hints: ["Stage 1 is below the surface; stage 2 is at the surface."],
    points: [
      "Stage 1: chemical weathering (hydrolysis) attacks the granite beneath the surface, along joints.",
      "Closely jointed rock is rotted to a great depth, while widely jointed, massive rock remains fresh as a core.",
      "Stage 2: the weathered regolith is stripped away by erosion, for example after uplift or a change of climate.",
      "The unweathered cores are left standing as domes, with rounded shapes made by weathering from the edges inwards.",
    ],
    modelAnswer: "In the first stage, water seeps down joints beneath the surface and chemical weathering rots the closely jointed granite to great depth, leaving massive blocks as fresh cores. In the second stage the weathered material is stripped away, for example after uplift, and the cores stand out as rounded domes.",
    explanation: "Subsurface weathering is followed by stripping." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why tower karst is often found on flat plains with thick sediment between the towers.",
    hints: ["Think about the water level on the plain and the base of the towers."],
    points: [
      "Solution attacks the base of limestone hills where water is concentrated at the level of the plain.",
      "The hills are undercut and reduced in number, leaving isolated steep-sided towers.",
      "Sediment from rivers and from the solution of the hills fills the plain between the towers.",
    ],
    modelAnswer: "Water collects at the level of the plain and dissolves the base of the limestone hills, undercutting them so that steep-sided towers are left isolated. The plain between the towers is covered by river sediment and the residue of the solution of the hills.",
    explanation: "Undercutting and burial of the plain give towers on a flat plain." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain how laterite (a duricrust) forms in a tropical climate.",
    hints: ["Think about which substances are removed and which remain."],
    points: [
      "Heavy seasonal rain leaches silica and other soluble bases from the soil.",
      "Iron and aluminium oxides, which are insoluble, are left behind and concentrate in the lower soil as a clay-rich layer.",
      "Water table fluctuation and wet-dry cycles bring the oxides together.",
      "On exposure to air and repeated drying the layer hardens irreversibly into a hard crust.",
    ],
    modelAnswer: "Heavy seasonal rain washes silica and soluble bases out of the soil, leaving iron and aluminium oxides, which are insoluble, to concentrate in a clay-rich layer. Wet and dry seasons bring them together, and when the layer is exposed to air and repeated drying it hardens irreversibly into laterite.",
    explanation: "Leaching leaves oxides which harden on exposure." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why surface rivers are rare in a karst landscape.",
    hints: ["Think about where the water goes."],
    points: [
      "Limestone is jointed and soluble, so rain soaks into joints rather than running over the surface.",
      "Solution has widened the joints into caves and shafts, and the water flows underground.",
      "Streams that start on other rocks disappear into sinkholes (swallow holes).",
    ],
    modelAnswer: "Rainwater soaks into the joints of limestone, which solution has enlarged into shafts and caves, so water flows underground. Streams that start on other rocks vanish into sinkholes.",
    explanation: "Karst drainage is underground." });

  b.struct({ d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `Boreholes beside a granite dome measured the depth of weathered regolith at five sites with different joint spacing (illustrative data, invented for this exercise).\n\n${JTAB}`,
    hints: ["Range = highest − lowest.", "Think about how water gets into rock."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the range of regolith depth, in metres.", value: regRange, unit: "m", wrong: [39, 1],
        explanation: "38 − 1 = 37 m." }),
      P.mcq({ label: "(b)", stem: "Which statement best describes the relationship?", options: [
        ["Closer joint spacing is linked with deeper regolith", "Correct: depth falls from 38 m to 1 m as spacing rises from 0.2 to 6.0 m."],
        ["Wider joint spacing is linked with deeper regolith", "The reverse is true."],
        ["Joint spacing has no relationship with regolith depth", "A clear negative relationship is shown."],
        ["Regolith depth is the same at every site", "The depths range from 1 to 38 m."],
      ], answer: "A", explanation: "There is a strong negative relationship." }),
      P.manual({ label: "(c)", marks: 2, stem: "Explain why closely jointed granite weathers more deeply.",
        points: [
          "Joints allow water, oxygen and acids to enter deep into the rock.",
          "More joints mean a larger surface area for chemical reactions such as hydrolysis.",
        ],
        modelAnswer: "Joints allow water to enter deep into the rock, and closely spaced joints give a much larger surface area for chemical weathering such as hydrolysis.",
        explanation: "Joints let reagents in and increase the surface area." }),
      P.manual({ label: "(d)", marks: 3, stem: "Use the data to explain how a dwala could be formed.",
        points: [
          "Closely jointed rock weathers deeply, while massive rock with wide joints (site E) weathers very little.",
          "If the regolith is later stripped away, the poorly weathered, widely jointed rock is left standing as a hill.",
          "This is the two-stage theory: subsurface weathering followed by stripping.",
        ],
        modelAnswer: "The data show that closely jointed granite is deeply weathered while widely jointed granite is hardly weathered. If the regolith is stripped away, the massive rock is left standing as a dome. This is the two-stage theory: weathering first, then stripping.",
        explanation: "Differential weathering explains the survival of domes." }),
    ], explanation: "Interpret joint-spacing data and link it to a theory." });

  b.struct({ d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `Three limestone areas were surveyed (illustrative data, invented for this exercise). Areas X and Y are in the humid tropics; area Z is in a cool, dry climate.\n\n${KTAB}`,
    hints: ["Ratio = larger value ÷ smaller value.", "Compare climates in (c)."],
    parts: [
      P.mcq({ label: "(a)", stem: "Which area is most likely to be tower karst?", options: [
        ["Area Y", "Correct: isolated, steep-sided towers on a flat plain."],
        ["Area X", "X has joined, rounded hills and many depressions (cockpit or cone karst)."],
        ["Area Z", "Z has a low pavement with no hills."],
        ["None of the areas", "The description of Y matches tower karst."],
      ], answer: "A", explanation: "Tower karst has isolated steep-sided towers on a plain." }),
      P.num({ label: "(b)", marks: 2, stem: "How many times greater is the density of depressions in area X than in area Y? Give a whole number.", value: ratioXY, wrong: [4.8, 0.08],
        explanation: "5.2 ÷ 0.4 = 13 times." }),
      P.manual({ label: "(c)", marks: 4, stem: "Explain why karst hills and depressions are much better developed in areas X and Y than in area Z.",
        points: [
          "Rainfall is much higher in the humid tropics, so more water is available for solution.",
          "Warm, wet soils with dense vegetation give high carbon dioxide levels, making carbonic acid stronger.",
          "Solution has had a long time to work on the limestone in a long-lasting warm, wet climate.",
          "In cool, dry area Z there is little water and less biological activity, so solution is slow and only low pavements form.",
        ],
        modelAnswer: "In areas X and Y heavy rainfall supplies plenty of water, and warm, wet soils under dense vegetation contain a lot of carbon dioxide, so the water is acidic and dissolves limestone quickly. The warm, wet climate has lasted a long time. Area Z is cool and dry, so little water is available and solution is slow, leaving only a low pavement.",
        explanation: "Water, acid and time explain the stronger development in the humid tropics." }),
      P.manual({ label: "(d)", marks: 5, stem: "Compare cone (cockpit) karst and tower karst.",
        points: [
          "Both are formed by solution of thick, jointed limestone in humid tropical climates.",
          "Cone karst has many rounded conical hills joined in clusters; tower karst has isolated, steep-sided towers.",
          "Cone karst has many closed depressions (cockpits) between the hills; tower karst has a flat floor between the towers.",
          "Tower karst is often seen as a later stage, with hills reduced and the plain covered in sediment.",
          "Examples: Jamaica's Cockpit Country (cockpit), and Guilin, China (tower).",
        ],
        modelAnswer: "Both are produced by solution of thick, jointed limestone in warm, wet climates. Cone karst has many rounded hills joined in clusters, with closed depressions between them, as in Jamaica's Cockpit Country. Tower karst has isolated, steep-sided towers rising from a flat, sediment-covered plain, as at Guilin in China, and it may be a later stage of development.",
        type: "EXTENDED_RESPONSE", wordLimit: { max: 250 },
        explanation: "Compare shape, setting and stage of development." }),
    ], explanation: "Identify the karst type, compare densities and explain the climate effect." });

  b.ext({ d: 4, skill: "EVALUATION", marks: 8,
    stem: "Assess the theories for the formation of bornhardts (dwalas).",
    hints: ["Cover at least two theories, evidence and limits.", "Reach a judgement."],
    points: [
      "Two-stage theory: deep subsurface weathering along joints, then stripping; supported by deep regolith and corestones beside domes.",
      "Limitation: it needs a way to strip the regolith (uplift, base-level fall or climate change), and the timing is hard to date.",
      "Scarp retreat (pediplanation): retreating scarps leave residual hills; supported by pediments and plains around inselbergs.",
      "Limitation: it does not explain domes found within uplands or the deep weathering beneath them.",
      "Pressure release: sheeting joints and exfoliation help to maintain and smooth the dome shape.",
      "Limitation: pressure release does not explain why some rock survives as a hill.",
      "Joint spacing is common to all the theories.",
      "Judgement: a combination, with the two-stage theory as the main explanation, is most convincing.",
    ],
    levels: geographyLevels(8),
    modelAnswer: "The two-stage theory says that chemical weathering rots closely jointed granite beneath the surface and leaves massive cores, which are exposed when the regolith is stripped away. It is supported by deep weathering and corestones beside domes, but it needs a cause for the stripping and is hard to date. The scarp-retreat theory explains inselbergs on plains with pediments, but it does not explain deep weathering. Pressure release explains the curved sheets on domes but not why they survive. All depend on joint spacing. I conclude that a combination is most convincing, with the two-stage theory as the main explanation.",
    wordLimit: { max: 300 }, explanation: "Weigh each theory against its evidence and limits." });

  b.card("DEFINITION", "Bornhardt (dwala, ruware)", "A large, steep-sided dome of massive granite or gneiss rising abruptly from a plain; an inselberg.");
  b.card("DEFINITION", "Kopje and tor", "Kopje: small hill of piled rounded blocks. Tor: free-standing stack of rounded blocks on a hilltop or slope. Both are smaller than bornhardts.");
  b.card("CONCEPT", "Two-stage theory of bornhardts", "Stage 1: deep chemical weathering along joints beneath the surface. Stage 2: stripping of the regolith exposes the unweathered massive cores as domes.");
  b.card("CONCEPT", "Other theories of inselbergs", "Scarp retreat (King's pediplanation) leaves residual hills on a pediplain; pressure release forms sheeting joints (exfoliation) on domes.");
  b.card("CONCEPT", "Joint spacing", "Close joints let water in and cause deep weathering; wide joints or massive rock resist and survive as hills. It is the control common to all theories.");
  b.card("DEFINITION", "Duricrust (laterite)", "A hard crust formed by concentration of minerals in soil; laterite is iron and aluminium oxides left after leaching of silica, hardened by wet-dry cycles.");
  b.card("DEFINITION", "Karst", "Landscape formed by solution of soluble rock (limestone) with caves, sinkholes, underground drainage and distinctive hills.");
  b.card("CONCEPT", "Tropical karst types", "Cockpit karst: star-shaped depressions among hills. Cone karst: many conical hills. Tower karst: isolated steep towers on a flat plain.");
  b.card("FACT", "Why tropical karst is strong", "Heavy rainfall and soil carbon dioxide from dense vegetation make strong carbonic acid, so solution along joints is rapid.");
});
