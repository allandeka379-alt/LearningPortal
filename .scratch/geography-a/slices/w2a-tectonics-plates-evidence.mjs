// W2a: tectonics.plates-evidence (both boards). Numbers computed: 480 km / 16 Ma = 30 mm/yr; 40 mm/yr x 25 Ma = 1000 km;
// ocean-floor table at 20 mm/yr (see tables/w2a-tectonics-plates-evidence.mjs for the lesson examples).
import { concept, P, geographyLevels, chk, rnd } from "../lib.mjs";
import { mc, tbl } from "../tables/w2a-_q.mjs";

// Spreading rate: 1 km per million years = 1 mm per year.
const rateFor = (km, ma) => (km * 1e6) / (ma * 1e6);
const DIST = [0, 60, 140, 220, 300, 420];
const AGE = DIST.map((d) => d / 20);
const AGETAB = tbl(["Site", "Distance from ridge axis (km)", "Age of basalt (million years)"], DIST.map((d, i) => ["ABCDEF"[i], d, AGE[i]]));
const rate20 = chk(rateFor(420, AGE[5]), 20);
const age500 = chk(500 / rate20, 25);

concept("ageo.tectonics.plates-evidence", { file: "tectonics/plates-evidence", keyPrefix: "tectonics.plates-evidence" }, (b) => {
  mc(b, 1, "RECALL", "What does the **lithosphere** consist of?", [
    ["The crust and the rigid uppermost mantle", "Correct: together they form the rigid shell that is broken into plates."],
    ["The crust alone, without any part of the mantle", "The lithosphere includes the top of the mantle as well as the crust."],
    ["The whole of the mantle down to the core", "Most of the mantle is the weaker asthenosphere and below; it is not the lithosphere."],
    ["The outer core and inner core together", "The cores lie far below and are not part of the plates."],
  ], "The lithosphere is **crust plus the rigid top of the mantle**; plates are made of lithosphere.");
  mc(b, 2, "UNDERSTANDING", "How does oceanic crust differ from continental crust?", [
    ["It is thinner, denser and younger", "Correct: about 5-10 km thick, basalt, about 3.0 g/cm³ and mostly under 200 million years old."],
    ["It is thicker, denser and older", "Oceanic crust is thinner and younger than continental crust."],
    ["It is thinner, lighter and older", "Oceanic crust is denser, and it is younger, because it is destroyed at trenches."],
    ["It is thicker, lighter and younger", "Continental crust is the thicker and lighter of the two."],
  ], "Oceanic crust is **thin, dense basalt** and young; continental crust is **thick, lighter** and old.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "Fossils of *Mesosaurus*, a freshwater reptile, occur only in southern Africa and eastern South America. What does this support?", [
    ["The two continents were once joined", "Correct: the reptile could not have crossed an ocean of salt water."],
    ["The reptile swam across the Atlantic", "A freshwater animal could not survive a wide salt-water ocean."],
    ["The two continents have always been far apart", "Then the same species could not live in both."],
    ["Africa and South America had different climates", "The same fossil in both suggests similar conditions and a land connection."],
  ], "Identical fossils on continents now separated by an ocean are evidence that the land masses were once joined.");
  mc(b, 3, "APPLICATION", "A survey finds a symmetrical pattern of magnetic stripes on either side of a mid-ocean ridge. What does it show?", [
    ["New crust forms at the ridge and moves away", "Correct: each reversal of the Earth's field is recorded in basalt that then moves away from the axis."],
    ["Old crust is being destroyed at the ridge", "Crust is destroyed at subduction zones, not at the ridge."],
    ["The ridge is a conservative plate boundary", "Conservative boundaries do not make crust or produce symmetrical stripes."],
    ["The continents have not moved for millions of years", "The pattern shows continuing movement, not a fixed position."],
  ], "Symmetrical stripes are the signature of **sea-floor spreading**: basalt records the field as it cools and then moves apart on both sides.",
  { hints: ["Think about where basalt is made and what happens to it afterwards."] });
  mc(b, 2, "RECALL", "Which force is usually judged to be the strongest driver of plate movement?", [
    ["Slab pull", "Correct: the cold, dense, sinking slab pulls the plate behind it."],
    ["Ridge push", "Ridge push is real but generally weaker than slab pull."],
    ["The pull of the Moon", "Tides do not move plates in any significant way."],
    ["Wind on the surface of the oceans", "Surface winds cannot move lithosphere."],
  ], "Most geologists regard **slab pull** as the largest force, with ridge push and mantle drag as smaller contributions.", { daily: true });
  mc(b, 3, "UNDERSTANDING", "Why does the age of the basalt on the ocean floor increase with distance from a mid-ocean ridge?", [
    ["It forms at the ridge, then moves away from it", "Correct: the further the rock is from the axis, the longer ago it formed."],
    ["Magma at the ridge is older than magma elsewhere", "Magma has no fixed age in this sense; the key is when the crust formed."],
    ["Rocks near trenches are heated and renewed", "Crust near trenches is being destroyed, not renewed."],
    ["Sediment buries and ages the rock", "Burial does not change the age at which the basalt formed."],
  ], "Rock formed at the ridge **moves away** as new basalt forms behind it, so age increases with distance.",
  { hints: ["Where is new crust formed?"] });
  mc(b, 4, "ANALYSIS", "Why is continental crust not subducted at a convergent boundary?", [
    ["Its low density makes it too buoyant to sink", "Correct: it is lighter than the mantle beneath, so it resists subduction and crumples instead."],
    ["It is too thin to bend under the stress", "Continental crust is thicker than oceanic crust."],
    ["It is too young to be recycled into the mantle", "Continental rocks are generally much older than the oceanic crust."],
    ["It contains no minerals that can melt", "Granitic rocks can melt; the issue is buoyancy."],
  ], "Continental crust (about 2.7 g/cm³) is less dense than the mantle, so it floats; denser oceanic crust (about 3.0 g/cm³) sinks.",
  { hints: ["Compare the density of the two kinds of crust."] });

  b.tf({ d: 1, skill: "RECALL", stem: "Plates move at speeds of a few centimetres a year.", answer: true,
    feedbackTrue: "Correct: typical rates are about 1-10 cm a year.", feedbackFalse: "Not so: plates move slowly, at about the rate at which fingernails grow.",
    explanation: "Plate speeds are a few centimetres a year: about 2-3 cm a year across the Mid-Atlantic Ridge and over 10 cm a year on the fastest parts of the East Pacific Rise." });
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "At a conservative (transform) boundary new crust is created as the plates slide past each other.", answer: false,
    feedbackFalse: "Correct: crust is neither created nor destroyed at conservative boundaries.", feedbackTrue: "Not so: crust is created only at divergent (constructive) boundaries.",
    explanation: "At a conservative boundary plates slide past one another; crust is not made or destroyed." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each plate boundary to an example.",
    pairs: [
      ["Divergent (constructive) boundary", "East African Rift"],
      ["Oceanic-continental convergent boundary", "Nazca plate and South America"],
      ["Collision boundary", "India and Eurasia"],
      ["Conservative (transform) boundary", "San Andreas Fault"],
    ],
    extraRight: ["Hawaii (a hot spot)"],
    explanation: "The Rift is stretching Africa apart; the Nazca plate subducts under South America; India and Eurasia collide to form the Himalaya; the San Andreas Fault is a transform boundary. Hawaii lies in the middle of a plate." });
  b.fib({ d: 2, skill: "RECALL", stem: "Choose the correct term for each blank.",
    template: "Plates move over the weak {{blank:a}}. The force exerted by a cold, dense, sinking slab is {{blank:b}}. Wegener called the single ancient super-continent {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["asthenosphere"], choices: ["asthenosphere", "inner core", "outer crust"] },
      { id: "b", accepted: ["slab pull"], choices: ["slab pull", "ridge push", "albedo"] },
      { id: "c", accepted: ["Pangaea"], choices: ["Pangaea", "Gondwana", "Laurasia"] },
    ], explanation: "Plates move over the asthenosphere; slab pull is the force from a sinking slab; Pangaea was the single super-continent." });
  b.short({ d: 1, skill: "RECALL", stem: "Name the super-continent that Wegener proposed existed about 250 million years ago.",
    accepted: ["Pangaea", "Pangea"], explanation: "Wegener named the single land mass **Pangaea** (meaning 'all land')." });

  const r1 = chk(rateFor(480, 16), 30);
  b.num({ d: 2, skill: "APPLICATION", calculator: true, unit: "mm/year", daily: true,
    stem: "Basalt on the ocean floor 480 km from a ridge axis is 16 million years old. Calculate the rate of spreading on that side of the ridge, in mm per year. (1 km per million years = 1 mm per year.)",
    value: r1, wrong: [7680, 0.03],
    explanation: "Rate = 480 km ÷ 16 million years = 30 km per million years = **30 mm per year**. The value 7 680 comes from multiplying instead of dividing." });
  const sep = chk((40 * 25e6) / 1e6, 1000);
  b.calc({ d: 3, skill: "APPLICATION", calculator: true, unit: "km",
    stem: "Two plates are moving apart at a combined rate of 40 mm per year. Calculate how far apart the two sides of the ridge will be after 25 million years, in km.",
    hints: ["Convert mm per year to km per million years first.", "40 mm per year = 40 km per million years."],
    value: sep, wrong: [1, 100],
    explanation: "1. 1 mm per year is 1 km per million years, so 40 mm per year = 40 km per million years.\n2. Distance = 40 × 25 = **1 000 km**.\n3. The value 1 km would result from forgetting that a million years is involved." });

  b.manualShort({ d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why the ocean floor is much younger than the continents.",
    points: [
      "New oceanic crust is made at mid-ocean ridges and moves away from them.",
      "Oceanic crust is dense, so it sinks (is subducted) at ocean trenches and is destroyed.",
      "Continental crust is light and buoyant, so it is not subducted and survives for billions of years.",
    ],
    modelAnswer: "New ocean floor forms at ridges and spreads outwards. Dense oceanic crust is subducted at trenches and recycled into the mantle, so none lasts longer than about 200 million years. Continental crust is less dense, so it is not subducted and keeps very old rocks.",
    explanation: "Oceanic crust is continually created and destroyed; continental crust is not subducted." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain how palaeomagnetism provides evidence for sea-floor spreading.",
    hints: ["Start with what happens to magnetic minerals in cooling basalt.", "Then describe the pattern either side of the ridge."],
    points: [
      "Magnetic minerals in basalt line up with the Earth's magnetic field as the lava cools and solidifies, recording its direction.",
      "The Earth's field has reversed many times, so rocks of different ages have normal or reversed polarity.",
      "Stripes of alternating polarity run parallel to the ridge and form a symmetrical pattern on both sides.",
      "This shows that new crust forms at the ridge and moves away equally on both sides, each stripe being older with distance.",
    ],
    modelAnswer: "As basalt cools at a ridge its magnetic minerals line up with the Earth's field. The field reverses from time to time, so the new crust records normal and reversed stripes. The same sequence appears on both sides of the ridge, which shows the crust is made at the ridge and moves away from it, with older stripes further away.",
    explanation: "Symmetrical polarity stripes record spreading." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain how the distribution of *Glossopteris* fossils supports continental drift.",
    hints: ["Name the continents where it is found.", "Consider whether the plant could have crossed an ocean."],
    points: [
      "Fossils of the same seed fern are found in southern Africa, South America, India, Australia and Antarctica.",
      "Its heavy seeds could not have been carried across wide oceans.",
      "So the continents must have been joined (as Gondwana) when the plant lived and moved apart afterwards.",
    ],
    modelAnswer: "The same fossil plant is found on continents that are now far apart. Its seeds could not have crossed wide oceans, so the continents must once have been joined and later drifted apart.",
    explanation: "Identical fossils on separated continents imply that the continents were once joined." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain how slab pull and ridge push move a plate.",
    hints: ["One force acts at the subduction zone, the other at the ridge."],
    points: [
      "Slab pull: at a subduction zone the cold oceanic plate is denser than the mantle and sinks.",
      "The sinking slab pulls the rest of the plate behind it (usually the stronger force).",
      "Ridge push: the ridge is raised above the ocean floor, so lithosphere slides down the slope away from it under gravity.",
      "This pushes the plate away from the ridge, helped by new crust forming at the axis.",
    ],
    modelAnswer: "At subduction zones the old, cold and dense oceanic plate sinks and pulls the rest of the plate with it (slab pull). At ridges, the elevated lithosphere slides down the slope of the asthenosphere, pushing the plate away from the ridge (ridge push). Slab pull is usually the stronger of the two.",
    explanation: "Slab pull and ridge push are gravity-driven forces." });

  b.struct({ d: 3, skill: "ANALYSIS", examStyle: true,
    stem: `A research ship drilled six sites along a line across a mid-ocean ridge and dated the basalt (illustrative data, invented for this exercise):\n\n${AGETAB}`,
    hints: ["Rate = distance ÷ age.", "In (c) use the rate you found."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the rate of spreading, in mm per year, using site F.", value: rate20, unit: "mm/year", wrong: [0.05, 200],
        explanation: "420 km ÷ 21 million years = 20 km per million years = 20 mm per year." }),
      P.mcq({ label: "(b)", stem: "Which statement describes the pattern in the table?", options: [
        ["Age increases steadily with distance", "Correct: each extra 20 km adds about one million years."],
        ["Age is the same at every site along the line", "The ages range from 0 to 21 million years."],
        ["Age decreases with distance from the ridge axis", "The reverse is true."],
        ["Age is greatest at the ridge itself", "Basalt at the ridge is youngest."],
      ], answer: "A", explanation: "The rock is oldest furthest from the ridge." }),
      P.num({ label: "(c)", marks: 1, stem: "Predict the age of basalt 500 km from the ridge axis, in millions of years.", value: age500, wrong: [10, 2500],
        explanation: "500 ÷ 20 = 25 million years." }),
      P.manual({ label: "(d)", marks: 4, stem: "Explain how the data support the idea of sea-floor spreading.",
        points: [
          "Age increases with distance from the ridge, so the youngest rock is at the axis.",
          "This is what is expected if new crust forms at the ridge and then moves away.",
          "The rate is the same for every site (20 mm per year), so spreading has been steady.",
          "Rocks are older further out, which would not happen if the sea floor were as old everywhere as the continents.",
        ],
        modelAnswer: "The basalt is youngest at the ridge (0 years) and older with distance, up to 21 million years at 420 km. That fits new crust forming at the ridge and moving away. All six sites give the same rate of 20 mm a year, so the spreading was steady.",
        explanation: "Age increasing with distance at a steady rate is the direct signature of spreading." }),
    ], explanation: "Calculate the rate, describe the pattern and link it to sea-floor spreading." });

  b.struct({ d: 4, skill: "APPLICATION", examStyle: true,
    stem: "The African plate is splitting along the East African Rift, forming the Nubian plate to the west and the Somali plate to the east, which are moving apart by a few millimetres a year. Zimbabwe lies in the interior of the Nubian plate, a long way from the Rift.",
    hints: ["Think about what happens to the crust under tension.", "Compare the stress at the two boundary types in (d)."],
    parts: [
      P.mcq({ label: "(a)", stem: "What type of plate boundary is the East African Rift?", options: [
        ["Divergent (constructive)", "Correct: the plates are moving apart and the crust is being stretched."],
        ["Convergent (destructive)", "The plates are not moving towards each other."],
        ["Collision", "Collision boundaries have two continental plates moving together."],
        ["Conservative (transform)", "Plates are not sliding past each other here."],
      ], answer: "A", explanation: "The Rift is a divergent boundary, at an early stage of continental break-up." }),
      P.manual({ label: "(b)", marks: 3, stem: "Describe the features you would expect to find along a continental rift.",
        points: [
          "Long, steep-sided valleys (rift valleys) bounded by faults.",
          "Volcanoes and lava flows along or near the rift.",
          "Frequent earthquakes, usually shallow.",
        ],
        modelAnswer: "A rift has a long, steep-sided valley bordered by faults, with volcanoes and lava flows along it, and shallow earthquakes as the crust is stretched.",
        explanation: "Stretching of the crust produces faults, a rift valley, volcanoes and earthquakes." }),
      P.manual({ label: "(c)", marks: 4, stem: "Explain why Zimbabwe has far fewer earthquakes than countries on plate boundaries.",
        points: [
          "Most earthquakes happen where plates move against each other at boundaries.",
          "Zimbabwe is in the interior of the Nubian plate, far from any boundary.",
          "The old, thick continental crust (the Zimbabwe Craton) is cold and stable and strain is small.",
          "Only small tremors occur on old faults or from slow movement, not from boundary collisions.",
        ],
        modelAnswer: "Earthquakes are concentrated at plate boundaries where plates stick and then slip. Zimbabwe is in the middle of the Nubian plate on an ancient, cold and stable craton, so there is little strain and only occasional small tremors.",
        explanation: "Zimbabwe is far from boundaries and sits on stable old crust." }),
      P.manual({ label: "(d)", marks: 4, stem: "Compare the East African Rift with the Andes, where the Nazca plate meets South America.",
        points: [
          "East African Rift: plates move apart (tension); Andes: the Nazca plate moves towards South America (compression).",
          "Rift: crust is stretched and thinned, with normal faulting and a valley; Andes: the denser oceanic plate is subducted under the continent.",
          "Rift: new crust or magma rises; Andes: the subducting plate melts to give volcanoes, and the crust is folded into mountains.",
          "Both have volcanoes and earthquakes, but the Andes have deep earthquakes along the subducting slab and an ocean trench offshore.",
        ],
        modelAnswer: "In the Rift plates move apart, so the crust is stretched and cracks along normal faults, leaving a valley and volcanoes where magma rises. In the Andes the oceanic Nazca plate moves towards South America and sinks beneath it, creating an offshore trench, melting that feeds volcanoes, folded mountains and deep earthquakes. Both are zones of volcanoes and earthquakes, but one is under tension and the other under compression.",
        explanation: "Compare tension and compression, and the resulting landforms." }),
    ], explanation: "Boundary types, features and the stability of Zimbabwe." });

  b.ext({ d: 4, skill: "EVALUATION", marks: 8,
    stem: "Evaluate the evidence that supports sea-floor spreading and continental drift. Which is the most convincing?",
    hints: ["Group the evidence (matching, fossils, rocks, climates, magnetism, ocean-floor age).", "Judge which evidence is hardest to explain in any other way."],
    points: [
      "The jigsaw fit of the continental shelves suggests that the continents were joined, but alone it could be a coincidence.",
      "Identical fossils (Mesosaurus, Glossopteris) on separated continents show past connections but could be explained by now-vanished land bridges.",
      "Matching rocks and mountain belts show that continents were adjacent, but do not show how they moved.",
      "Glacial deposits in warm places and coal in Antarctica show past climates that need the continents to have moved in latitude.",
      "Palaeomagnetic stripes symmetrical about ridges are very hard to explain without spreading.",
      "The age of ocean-floor basalt increasing with distance from ridges, with thicker sediment, gives a measurable rate.",
      "The ocean-floor evidence was found in the 1950s-60s with new technology, and gave a mechanism that Wegener lacked.",
      "Judgement: the ocean-floor evidence (magnetism and age) is the most convincing because it is quantitative and has no other explanation, while the older evidence supports it.",
    ],
    levels: geographyLevels(8),
    modelAnswer: "Early evidence for drift was suggestive but each item could be explained in another way. The jigsaw fit might be coincidence, and the same fossils on different continents could be explained by land bridges. Matching rocks and mountain belts, and glacial deposits in warm places with coal in Antarctica, are harder to explain unless continents have moved. However, the most convincing evidence came from the ocean floor in the 1950s and 1960s. Symmetrical magnetic stripes about the ridges and the increase in the age of basalt away from the ridge, at a measurable steady rate, show that new crust is made and moves away, and no land-bridge idea can explain it. This evidence also supplied the mechanism that Wegener lacked. I conclude that palaeomagnetism and the age of the ocean floor are the most convincing, while the fossils, rocks and climate evidence agree with them.",
    wordLimit: { max: 300 }, explanation: "Judge the strength of each line of evidence." });

  b.card("DEFINITION", "Lithosphere", "The rigid outer shell of the Earth (crust plus the uppermost mantle), about 100 km thick on average; it is broken into plates that move over the asthenosphere.");
  b.card("CONCEPT", "Continental and oceanic crust", "Continental: thick (about 35 km), lighter (about 2.7 g/cm³), very old, not subducted. Oceanic: thin (5-10 km), denser (about 3.0 g/cm³), young (under about 200 million years), subducted.");
  b.card("DEFINITION", "Sea-floor spreading", "New oceanic crust forms at a mid-ocean ridge and moves away on both sides; basalt is youngest at the axis and older with distance.");
  b.card("FORMULA", "Spreading rate", "Rate = distance from the ridge ÷ age of the rock. 1 km per million years = 1 mm per year.");
  b.card("CONCEPT", "Evidence for continental drift", "Jigsaw fit of the shelves, matching fossils (Mesosaurus, Glossopteris), matching rocks, past climates, palaeomagnetic stripes and the age of the ocean floor.");
  b.card("DEFINITION", "Slab pull", "The force of a cold, dense subducting slab sinking into the mantle and pulling the plate behind it: usually judged the strongest driver of plate movement.");
  b.card("DEFINITION", "Ridge push", "Gravity sliding of lithosphere down the slope away from the raised mid-ocean ridge, pushing the plate.");
  b.card("CONCEPT", "Plate boundary types", "Divergent (constructive): move apart. Convergent (destructive): move together, with subduction. Collision: continent meets continent. Conservative (transform): slide past each other.");
  b.card("FACT", "Where is Zimbabwe on the plate map?", "In the interior of the African (Nubian) plate, on an ancient craton, far from plate boundaries, so earthquakes and volcanoes are rare.");
});
