// Slice G2a: the Earth's structure, continental drift and moving plates (ZIMSEC and Cambridge).
import { concept, P, geographyLevels, CAM } from "../lib.mjs";

const RIDGE = "| Sample (fictional) | Distance from ridge axis (km) | Age of sea-floor basalt (million years) |\n|---|---|---|\n| 1 | 0 | 0 |\n| 2 | 60 | 2 |\n| 3 | 150 | 5 |\n| 4 | 240 | 8 |\n| 5 | 300 | 10 |";

concept("geo.tectonics.earth-structure-plates", { file: "tectonics/earth-structure-plates", keyPrefix: "tectonics.earth-structure-plates" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which layer of the Earth is **liquid**?",
    options: [
      ["The outer core", "Correct: liquid iron and nickel."],
      ["The inner core", "The inner core is solid because of enormous pressure."],
      ["The crust", "The crust is solid rock."],
      ["The lithosphere", "The lithosphere is the rigid outer shell."],
    ],
    answer: "A",
    explanation: "Only the **outer core** is liquid; its movement generates the Earth's magnetic field.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the **lithosphere**?",
    options: [
      ["The crust and the rigid uppermost mantle", "Correct: it is broken into plates."],
      ["The liquid layer around the inner core", "That is the outer core."],
      ["The weak, partly molten upper mantle", "That is the asthenosphere, below the lithosphere."],
      ["The layer of air surrounding the Earth", "That is the atmosphere."],
    ],
    answer: "A",
    explanation: "The **lithosphere** is rigid and about 100 km thick; plates are pieces of it.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "How does oceanic crust differ from continental crust?",
    options: [
      ["It is thinner and denser", "Correct: about 5-10 km of dense basalt."],
      ["It is thicker and less dense", "That describes continental crust."],
      ["It is older and made of granite", "Continental crust is older and granitic."],
      ["It is liquid and moves faster", "Both kinds of crust are solid."],
    ],
    answer: "A",
    explanation: "Oceanic crust is **thin (about 5-10 km), dense and young**; continental crust is thick, lighter and often very old.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which piece of evidence for continental drift is based on **fossils**?",
    options: [
      ["Mesosaurus remains in both South America and southern Africa", "Correct: a small freshwater reptile could not have crossed an ocean."],
      ["The coastlines of Africa and South America fit together", "That is the jigsaw-fit evidence."],
      ["Coal seams found beneath the ice in Antarctica", "Coal is evidence of a past climate, not a fossil distribution of one species."],
      ["Matching mountain belts on separated continents", "That is evidence from rocks and structures."],
    ],
    answer: "A",
    explanation: "The same fossils (*Mesosaurus*, *Glossopteris*) on continents now far apart suggest they were once joined.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "On which tectonic plate does Zimbabwe lie?",
    options: [
      ["The African plate", "Correct: near its middle, far from the main boundaries."],
      ["The Indo-Australian plate", "That plate carries India and Australia."],
      ["The Antarctic plate", "That plate lies far to the south."],
      ["The Arabian plate", "That plate carries the Arabian Peninsula."],
    ],
    answer: "A",
    explanation: "Zimbabwe sits within the **African plate**, which is why it has few strong earthquakes and no active volcanoes.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is **slab pull**?",
    options: [
      ["A sinking slab of cold lithosphere drags the plate", "Correct: thought by many scientists to be the main driving force."],
      ["Hot new lithosphere at a ridge slides away under gravity", "That is ridge push."],
      ["Rising hot mantle rock drags the plate from below", "That is the convection-current idea."],
      ["The Moon's gravity pulls the plates across the Earth", "Tides do not move plates."],
    ],
    answer: "A",
    explanation: "**Slab pull**: the weight of a sinking slab pulls the plate; **ridge push**: cooling lithosphere slides away from the ridge.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why did many scientists reject Wegener's theory when he first proposed it?",
    options: [
      ["He could not explain the force that moved the continents", "Correct: the mechanism came later with sea-floor spreading."],
      ["There was no fossil evidence linking the continents", "Wegener used fossil evidence such as Mesosaurus."],
      ["The coastlines of Africa and South America do not fit", "The fit is close, especially at the continental shelf edge."],
      ["Earthquakes did not occur in his time", "Earthquakes were well known; the problem was the mechanism."],
    ],
    answer: "A",
    explanation: "Without a mechanism the idea seemed impossible. Ocean-floor studies in the 1950s-60s showed sea-floor spreading, and plate tectonics followed.",
    hints: ["Wegener had plenty of evidence that continents had moved.", "What was missing was 'how'."],
  });
  b.mcq({
    d: 3, skill: "APPLICATION", applies: CAM,
    stem: "Which plate is being forced beneath the South American plate along the west coast of South America?",
    options: [
      ["The Nazca plate", "Correct: it subducts beneath South America, forming the Andes."],
      ["The African plate", "The African plate lies east of the Atlantic."],
      ["The Cocos plate", "The Cocos plate lies off Central America, further north."],
      ["The Caribbean plate", "The Caribbean plate lies north of South America."],
    ],
    answer: "A",
    explanation: "The oceanic **Nazca plate** moves east and sinks beneath the **South American plate**.",
    hints: ["It is a smaller oceanic plate in the eastern Pacific.", "It is named after a region of Peru."],
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "The Atlantic Ocean is widening at about 2.5 cm per year (approximate). How many years does it take to widen by 1 km?",
    value: 40000, unit: "years",
    wrong: [400, 2500],
    explanation: "1 km = 100,000 cm; 100,000 ÷ 2.5 = 40,000 years.",
    workedSolution: "1. Convert: 1 km = 1,000 m = 100,000 cm.\n2. Years = 100,000 ÷ 2.5 = 40,000 years.",
  });
  b.calc({
    d: 3, skill: "APPLICATION",
    stem: "A plate moves at 3 cm per year. How far, in kilometres, does it move in 50 million years?",
    value: 1500, unit: "km",
    wrong: [150, 15000],
    explanation: "3 × 50,000,000 = 150,000,000 cm = 1,500,000 m = 1,500 km.",
    workedSolution: "1. Distance = 3 cm × 50,000,000 = 150,000,000 cm.\n2. ÷ 100 = 1,500,000 m.\n3. ÷ 1,000 = 1,500 km.",
    hints: ["Multiply the rate by the time.", "There are 100,000 cm in 1 km."],
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the supercontinent that, according to Wegener, contained all the continents before they drifted apart.",
    accepted: ["Pangaea", "Pangea", "Pangaia"],
    wrong: ["Gondwana"],
    explanation: "**Pangaea**; it later split into Laurasia (north) and Gondwana (south).",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the description of the Earth's layers.",
    template: "The thin outer layer is the {{blank:a}}. Beneath it lies the thick {{blank:b}}, whose weak upper part, the {{blank:c}}, flows very slowly. At the centre is a liquid outer core and a solid {{blank:d}} core.",
    blanks: [
      { id: "a", accepted: ["crust"], wrong: "mantle" },
      { id: "b", accepted: ["mantle"], wrong: "core" },
      { id: "c", accepted: ["asthenosphere"], wrong: "lithosphere" },
      { id: "d", accepted: ["inner"], wrong: "outer" },
    ],
    explanation: "Crust, mantle (with the asthenosphere), outer core (liquid), inner core (solid).",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each layer to its description.",
    pairs: [
      ["Crust", "Thin solid outer layer; thicker under continents"],
      ["Asthenosphere", "Weak, partly molten upper mantle that flows slowly"],
      ["Outer core", "Liquid iron and nickel that creates the magnetic field"],
      ["Inner core", "Solid iron and nickel kept solid by huge pressure"],
    ],
    explanation: "Each layer differs in state and composition.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "True or false: the mantle is a layer of liquid magma on which the continents float.",
    answer: false,
    feedbackFalse: "Correct: the mantle is mostly solid rock; only the asthenosphere is weak and partly molten, flowing very slowly.",
    feedbackTrue: "The mantle is mostly solid. The asthenosphere can flow slowly because it is weak and partly molten, but it is not liquid.",
    explanation: "Magma forms only in particular places, such as beneath ridges, hot spots and subduction zones.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 3,
    stem: "Outline **three** pieces of evidence that support the theory of continental drift.",
    points: [
      "Jigsaw fit of coastlines, e.g. South America and Africa",
      "Matching fossils on separated continents, e.g. Mesosaurus / Glossopteris",
      "Matching rocks / mountain belts, or past-climate evidence such as glacial deposits in southern Africa or coal in Antarctica",
    ],
    modelAnswer: "The coastlines of South America and Africa fit together like a jigsaw. The same fossils, such as Mesosaurus, occur on both continents. Traces of ancient glaciers in southern Africa and India and coal in Antarctica show these lands were once at different latitudes.",
    explanation: "Three different types of evidence, each with an example.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain how convection currents in the mantle are thought to move tectonic plates.",
    points: [
      "Heat from the core (and radioactive decay) warms the lower mantle",
      "Hot, less dense rock rises slowly towards the lithosphere",
      "It spreads out sideways beneath the plates, dragging them along",
      "It cools, becomes denser and sinks, completing the circular current",
    ],
    modelAnswer: "Heat from the core warms rock in the lower mantle, which becomes less dense and rises slowly. Beneath the lithosphere it spreads sideways, dragging the plates above with it. As it cools it becomes denser and sinks again, forming a convection cell.",
    explanation: "Heating, rising, spreading, sinking.",
    hints: ["Start with the heat source.", "Describe the full loop."],
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 6,
    stem: "Evaluate the evidence for continental drift and explain why plate tectonics is now accepted.",
    points: [
      "Jigsaw fit (strong at shelf edge; coastlines alone could be coincidence)",
      "Fossil evidence (Mesosaurus, Glossopteris) on separated continents",
      "Rocks, mountain belts and past-climate evidence (glacial traces, Antarctic coal)",
      "Weakness: Wegener had no mechanism, so the theory was rejected at first",
      "Sea-floor evidence: young rock at ridges, older away; magnetic stripes; sea-floor spreading",
      "Judgement: evidence together is convincing; plate tectonics adds the mechanism (convection, ridge push, slab pull)",
    ],
    levels: geographyLevels(6),
    modelAnswer: "Wegener's evidence was varied. The fit of South America and Africa is striking, especially at the edge of the continental shelf, though on its own it might be chance. Stronger is the fossil evidence: Mesosaurus and Glossopteris occur on continents now separated by oceans. Matching rocks and mountain belts, glacial deposits in warm southern Africa and India, and coal in Antarctica all show the continents have moved. The weakness was that Wegener could not explain how, so the idea was rejected. Studies of the ocean floor then showed young rocks at mid-ocean ridges, older rocks further away and matching magnetic stripes, proving sea-floor spreading. Plate tectonics combined all this with a mechanism (mantle convection, ridge push and slab pull), and it also explains where earthquakes and volcanoes occur, so it is now accepted.",
    explanation: "Credit evaluation of each type of evidence and the role of sea-floor spreading.",
    hints: ["Which evidence is strongest?", "What did Wegener lack, and what supplied it?"],
  });
  b.struct({
    d: 3, skill: "ANALYSIS",
    stem: `Table 1 shows the age of sea-floor rock at different distances from a mid-ocean ridge (fictional data).\n\n${RIDGE}`,
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "Describe the relationship between distance from the ridge and the age of the rock.", points: [
        "Age increases with distance from the ridge (positive relationship)",
        "Uses data, e.g. 0 million years at the ridge, 10 million years at 300 km",
      ], modelAnswer: "The further from the ridge, the older the rock: 0 million years at the axis and 10 million years at 300 km.", explanation: "Relationship plus figures." }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the rate of spreading on this side of the ridge in km per million years.", value: 30, wrong: [10, 3000], explanation: "300 km ÷ 10 million years = 30 km per million years (each pair of samples gives the same rate)." }),
      P.num({ label: "(c)", marks: 1, stem: "Convert your answer to (b) into centimetres per year.", value: 3, wrong: [30, 0.3], explanation: "30 km = 3,000,000 cm; ÷ 1,000,000 years = 3 cm per year." }),
      P.manual({ label: "(d)", marks: 3, stem: "Explain how these results support the theory of plate tectonics.", points: [
        "New crust forms at the ridge from rising magma",
        "It moves away from the ridge as more crust is added (sea-floor spreading)",
        "So the plates on either side are moving apart / the sea floor is moving",
      ], modelAnswer: "The youngest rock is at the ridge, so new crust is created there from rising magma. Older rock lies further away because it has been carried outwards as new crust formed behind it. This shows the sea floor spreads and the plates move apart.", explanation: "Links data to sea-floor spreading." }),
    ],
    hints: ["Divide distance by age.", "1 km = 100,000 cm."],
    explanation: "Practice in using sea-floor data as evidence for plate movement.",
  });
  b.struct({
    d: 2, skill: "UNDERSTANDING",
    stem: "Read the description of a student's model of the Earth: a ball of radius 6.4 cm with a thin coating of paint, a thick layer of clay, a layer of runny syrup, and a marble at the centre.",
    parts: [
      P.short({ label: "(a)", marks: 1, stem: "Which layer of the Earth does the syrup represent?", accepted: ["outer core", "the outer core"], wrong: ["mantle"], explanation: "The syrup is liquid: the outer core." }),
      P.short({ label: "(b)", marks: 1, stem: "Which layer does the paint represent?", accepted: ["crust", "the crust"], wrong: ["lithosphere"], explanation: "The thin paint coating is the crust." }),
      P.num({ label: "(c)", marks: 2, type: "CALCULATION", stem: "The real Earth's radius is about 6,400 km and the model's radius is 6.4 cm. If continental crust is about 35 km thick, how thick (in mm) should the paint be?", value: 0.35, unit: "mm", tol: 0.005, wrong: [3.5, 35], explanation: "Scale: 6.4 cm represents 6,400 km, so 1 cm = 1,000 km and 1 mm = 100 km. 35 km ÷ 100 = 0.35 mm." }),
      P.manual({ label: "(d)", marks: 2, stem: "State **one** way the model is accurate and **one** way it is inaccurate.", points: [
        "Accurate: e.g. layers in the right order / a liquid layer around a solid centre / the crust is very thin",
        "Inaccurate: e.g. the mantle is not uniform clay and should flow slowly (asthenosphere) / the crust is not uniform in thickness / no plates shown",
      ], modelAnswer: "It is accurate in showing a thin crust, a thick mantle and a liquid outer core around a solid inner core. It is inaccurate because the crust is one even coat, not broken into plates of different thickness.", explanation: "One strength and one limitation." }),
    ],
    hints: ["Which layer is liquid?", "Work out how many kilometres 1 mm represents."],
    explanation: "Practice in describing the Earth's layers using a model.",
  });

  b.card("DEFINITION", "Lithosphere", "The rigid outer shell of the Earth (crust plus uppermost mantle), broken into tectonic plates.");
  b.card("DEFINITION", "Asthenosphere", "A weak, partly molten layer of the upper mantle beneath the lithosphere that flows very slowly.");
  b.card("CONCEPT", "Oceanic vs continental crust", "Oceanic: thin (about 5-10 km), dense, young basalt. Continental: thick (about 25-70 km), less dense, often very old.");
  b.card("FACT", "Earth's core", "Outer core: liquid iron and nickel (magnetic field). Inner core: solid iron and nickel, kept solid by enormous pressure.");
  b.card("DEFINITION", "Continental drift", "Wegener's theory that the continents were once joined in Pangaea and have drifted apart.");
  b.card("CONCEPT", "Evidence for continental drift", "Jigsaw fit, matching fossils (Mesosaurus, Glossopteris), matching rocks and mountains, past climates (glacial traces in southern Africa, coal in Antarctica).");
  b.card("CONCEPT", "What moves plates", "Mantle convection currents, ridge push (cooling lithosphere slides from ridges) and slab pull (sinking slabs drag plates).");
  b.card("FACT", "Seven large plates", "Pacific, North American, South American, Eurasian, African, Indo-Australian and Antarctic.");
  b.card("FACT", "Speed of plates", "About 1-10 cm a year, roughly as fast as fingernails grow.");
});
