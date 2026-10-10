// W2a: xylem and phloem, structure and distribution.
import { concept, P, t, chk, ZIM, table, actualSize, graticuleUnit, magnification, rnd, sfStr } from "../lib.mjs";

concept("abio.plant-transport.tissues", { file: "plant-transport/tissues", keyPrefix: "plant-transport.tissues" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which feature is found in mature xylem vessel elements but NOT in sieve tube elements?",
    options: [
      ["Walls thickened with lignin", "Correct: lignin strengthens and waterproofs vessel walls; sieve tube walls are cellulose only."],
      ["A cell surface membrane", "Sieve tube elements are living and have a membrane; dead vessel elements do not."],
      ["Perforated end walls called sieve plates", "Sieve plates belong to sieve tube elements; vessel elements lose their end walls completely."],
      ["Plasmodesmata linking them to companion cells", "Plasmodesmata connect sieve tube elements to companion cells."],
    ],
    answer: "A",
    explanation: "Xylem vessel walls are **lignified**. Sieve tube elements have cellulose walls, sieve plates and plasmodesmata to companion cells.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In a transverse section of a young dicotyledonous root, where is the xylem found?",
    options: [
      ["In the centre, often as a star shape", "Correct: the root stele has a central xylem core with phloem between its arms."],
      ["In a ring of bundles near the epidermis", "A ring of bundles is the arrangement in a dicotyledonous stem."],
      ["On the upper side of a midrib bundle", "This describes the leaf midrib."],
      ["Scattered through the whole cortex", "Scattered bundles describe a monocotyledonous stem, and never the cortex of a root."],
    ],
    answer: "A",
    explanation: "Root vascular tissue is in a central **stele**: xylem in the centre (star or cross shape), phloem between the arms, surrounded by pericycle and endodermis.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why do companion cells contain many mitochondria?",
    options: [
      ["To provide ATP for actively loading sucrose into sieve tubes", "Correct: loading uses proton pumps driven by ATP."],
      ["To make sucrose by photosynthesis for the sieve tube", "Mitochondria carry out respiration, not photosynthesis."],
      ["To strengthen the walls of the sieve tube with lignin", "Phloem sieve tubes are not lignified, and mitochondria do not make lignin."],
      ["To store water that is passed to the xylem", "Mitochondria do not store water; this is not their role."],
    ],
    answer: "A",
    explanation: "Companion cells respire aerobically to make **ATP**, used to pump protons out and load sucrose by cotransport.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A section is described as having a waxy epidermis, a ring of vascular bundles each with a strip of narrow, thin-walled cells between an outer group and an inner group of tissue, and a large central region of parenchyma. Which organ and which tissue lies in the outer group of each bundle?",
    options: [
      ["Dicotyledonous stem; phloem", "Correct: stem bundles in a ring, phloem outside, cambium between, xylem inside, central pith."],
      ["Dicotyledonous stem; xylem", "In a stem the xylem is on the inner side of each bundle."],
      ["Dicotyledonous root; phloem", "A root has a single central stele, not a ring of bundles around a pith."],
      ["Monocotyledonous stem; xylem", "Monocot stem bundles are scattered and have no cambium."],
    ],
    answer: "A",
    explanation: "A ring of bundles with cambium and a central pith is a **dicotyledonous stem**; phloem lies outside the cambium, xylem inside.",
    hints: ["The narrow cells between the two groups are cambium.", "Roots have one central stele."],
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Which feature of xylem vessels most directly prevents them collapsing inwards when water in them is under tension?",
    options: [
      ["Lignin in the walls", "Correct: lignin makes the walls rigid enough to resist the inward pull."],
      ["Pits in the side walls", "Pits are unlignified areas; they allow sideways movement, not strength."],
      ["No end walls between elements", "This makes a continuous tube but does not resist collapse."],
      ["No cytoplasm inside the lumen", "An empty lumen lowers resistance to flow but does not give strength."],
    ],
    answer: "A",
    explanation: "Water in xylem is pulled up under **tension** (negative pressure). Rigid **lignified** walls stop the vessels collapsing.",
    hints: ["Which feature gives strength?"],
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "In a vascular bundle of a leaf, where is the phloem positioned?",
    options: [
      ["Towards the lower epidermis", "Correct: in leaves, xylem is uppermost and phloem lies below it."],
      ["Towards the upper epidermis", "The xylem lies towards the upper surface."],
      ["In the centre of the xylem", "Phloem does not lie inside the xylem."],
      ["In the spongy mesophyll, apart from the xylem", "Xylem and phloem lie together in each bundle."],
    ],
    answer: "A",
    explanation: "Leaf veins are continuous with stem bundles, so the xylem (inner in the stem) faces the **upper** surface and the phloem the **lower** surface.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS", applies: ZIM,
    stem: "A TS of a maize stem shows many vascular bundles scattered throughout the ground tissue, none of them with cambium. How does this differ from a sunflower stem?",
    options: [
      ["Sunflower bundles form a ring and contain cambium", "Correct: the dicot sunflower has a ring of bundles with cambium between xylem and phloem."],
      ["Sunflower bundles are scattered and also lack cambium", "This describes the monocot maize stem, not sunflower."],
      ["Sunflower has a central star-shaped xylem core", "This is the arrangement in a dicotyledonous root."],
      ["Sunflower has phloem inside and xylem outside each bundle", "In dicot stem bundles phloem is outside the xylem."],
    ],
    answer: "A",
    explanation: "Maize is a monocotyledon: scattered bundles, no cambium. Sunflower is a dicotyledon: bundles in a **ring**, each with **cambium**.",
    hints: ["Compare monocotyledons and dicotyledons."],
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Mature sieve tube elements have no nucleus.",
    answer: true,
    explanation: "True. They lose the nucleus and most organelles; the companion cell supports them.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Pits in xylem vessel walls are areas where extra lignin has been deposited.",
    answer: false,
    explanation: "False. Pits are areas **without** lignin, allowing water and ions to pass sideways.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each structure to its function.",
    pairs: [
      ["Lignin in vessel walls", "Strength and waterproofing; stops collapse under tension"],
      ["Sieve plate", "Lets sap pass between sieve tube elements"],
      ["Plasmodesmata of companion cells", "Allow assimilates to pass into the sieve tube element"],
      ["Pits in vessel walls", "Allow water to move sideways between vessels"],
    ],
    explanation: "Each structural feature pairs with one function.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "Xylem vessel elements are {{blank:a}} at maturity and have no {{blank:b}}, so they form a continuous tube.",
    blanks: [
      { id: "a", accepted: ["dead"], choices: ["dead", "living", "nucleated", "dividing"] },
      { id: "b", accepted: ["end walls"], choices: ["end walls", "lignin", "pits", "side walls"] },
    ],
    explanation: "Vessel elements are dead and their end walls break down.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the layer of dividing cells found between the xylem and phloem in a vascular bundle of a dicotyledonous stem.",
    accepted: ["cambium", "vascular cambium", "the cambium", "fascicular cambium"],
    wrong: ["pericycle", "endodermis"],
    explanation: "The **cambium** lies between phloem and xylem in each stem bundle.",
  });

  // Magnification items (different numbers from the lesson)
  const w = actualSize(18, "mm", 450);
  chk(w, 40);
  b.num({
    d: 2, skill: "APPLICATION", calculator: true,
    stem: "On a photomicrograph at ×450, a xylem vessel is 18 mm wide. Calculate its actual width in µm.",
    value: w, unit: "µm", wrong: [0.04, 8100],
    explanation: t`$18\ \text{mm} = 18\,000\ \mu\text{m}$; $18\,000 \div 450 = 40\ \mu\text{m}$. Not converting gives 0.04; multiplying gives 8100.`,
  });
  const u = graticuleUnit({ stageDivisions: 20, eyepieceDivisions: 32 });
  const len = 14 * u;
  chk(len, 87.5);
  const mag = magnification(70, "mm", len, "µm");
  chk(mag, 800);
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "At high power, 20 stage micrometer divisions (each 10 µm) match 32 eyepiece graticule divisions. A companion cell measures 14 eyepiece divisions long. A student draws it 70 mm long. Calculate the magnification of the drawing.",
    value: mag, prefix: "×", wrong: [rnd(len / 70000, 5), 70 / 14],
    explanation: t`1. One eyepiece division $= (20 \times 10) \div 32 = ${u}\ \mu\text{m}$.
2. Actual length $= 14 \times ${u} = ${len}\ \mu\text{m}$.
3. Drawing length $= 70\ \text{mm} = 70\,000\ \mu\text{m}$.
4. Magnification $= 70\,000 \div ${len} = \times ${mag}$.`,
    hints: ["Calibrate the graticule first.", "Use the same unit for drawing and actual length."],
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain how the structure of a xylem vessel element is related to its function of transporting water.",
    points: [
      "No end walls / continuous tube, so water flows as an unbroken column",
      "Dead / no cytoplasm or organelles, so nothing obstructs flow",
      "Lignified walls give strength so vessels do not collapse under tension / waterproof",
      "Pits allow lateral movement of water to other vessels or cells (around blockages)",
    ],
    modelAnswer: "Vessel elements have no end walls, so they join into a continuous tube in which water moves as an unbroken column. They are dead and empty, so there is no cytoplasm to obstruct flow. Their walls are lignified, which makes them strong enough not to collapse under the tension of the transpiration pull and waterproof. Pits let water move sideways into neighbouring vessels and cells.",
    explanation: "Each mark pairs a feature with how it helps.",
    hints: ["Feature → function, four times."],
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Compare the structure of xylem vessel elements and phloem sieve tube elements. Give four differences.",
    points: [
      "Xylem dead / phloem living",
      "Xylem walls lignified / phloem walls cellulose only (not lignified)",
      "Xylem no end walls / phloem sieve plates (perforated end walls)",
      "Xylem no companion cells / phloem sieve tubes have companion cells (with plasmodesmata); or xylem has no cytoplasm / sieve tube has thin layer of cytoplasm",
    ],
    modelAnswer: "Vessel elements are dead, but sieve tube elements are living. Vessel walls are lignified; sieve tube walls are cellulose. Vessel elements have no end walls, whereas sieve tube elements have sieve plates. Vessel elements are empty, while sieve tube elements keep a thin layer of cytoplasm and are supported by companion cells.",
    explanation: "Each difference must state both tissues.",
    hints: ["Give both sides of each difference."],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 3,
    stem: "Suggest why the vascular tissue is in the centre of a root but in a ring near the outside of a stem.",
    points: [
      "A root is pulled (tension) as the shoot moves / anchors the plant: a central core resists pulling",
      "A stem bends in the wind: a ring of strong tissue near the outside resists bending",
      "Central stele in the root is close to the endodermis, controlling entry of water and ions / lignified xylem gives support where needed",
    ],
    modelAnswer: "Roots experience pulling forces as the shoot sways, and a central core of lignified tissue resists pulling like a rope. Stems bend in the wind, and a ring of strong tissue near the outside resists bending like a hollow tube. In the root the central stele also lies inside the endodermis, which controls what enters the xylem.",
    explanation: "Link each arrangement to the mechanical stress on the organ.",
    hints: ["Think about how a rope and a hollow pipe resist different forces."],
  });

  // Practice structured: tissue measurements
  const vessels = [36, 42, 30, 48, 39];
  const meanV = vessels.reduce((a, x) => a + x, 0) / vessels.length;
  chk(meanV, 39);
  const drawnWidth = 26; // mm
  const magV = magnification(drawnWidth, "mm", 39, "µm");
  b.struct({
    d: 4, skill: "ANALYSIS",
    stem: `Rudo measured the internal diameter of five xylem vessels in a TS of a bean stem using a calibrated eyepiece graticule.\n\n${table(["Vessel", "1", "2", "3", "4", "5"], [["Diameter / µm", ...vessels]])}`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "Calculate the mean diameter, in µm.", value: meanV, unit: "µm", wrong: [195], explanation: t`$(36 + 42 + 30 + 48 + 39) \div 5 = 195 \div 5 = 39\ \mu\text{m}$.` }),
      P.num({
        label: "(b)", marks: 2, stem: "Rudo drew a vessel of mean diameter 26 mm wide. Calculate the magnification of her drawing, to three significant figures.",
        value: magV, prefix: "×", sf: 3, wrong: [rnd(26 / 39, 3)],
        explanation: t`$26\ \text{mm} = 26\,000\ \mu\text{m}$; $26\,000 \div 39 = ${sfStr(magV, 4)} \approx \times ${sfStr(magV, 3)}$.`,
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Describe how Rudo's plan diagram of one vascular bundle should show the tissues.",
        points: ["Outlines of phloem (outside), cambium, xylem (inside) as regions, no individual cells", "Correct relative proportions; sharp continuous lines, no shading; ruled label lines"],
        modelAnswer: "The bundle would be drawn as a single outline divided into three regions: phloem on the outside, a thin band of cambium, and xylem towards the centre, in correct proportions, with no cells drawn, no shading and ruled label lines.",
      }),
      P.manual({
        label: "(d)", marks: 1, stem: "Suggest why measuring five vessels gives a more useful value than measuring one.",
        points: ["Vessels vary in size, so a mean of several is more representative / reduces the effect of an unusual vessel"],
        modelAnswer: "Vessel diameters vary, so the mean of five is more representative than one measurement.",
      }),
    ],
    explanation: "Mean of the five diameters; magnification = drawing size ÷ actual size in the same units; plan diagrams show regions only.",
    hints: ["Convert mm to µm before dividing."],
    calculator: true,
  });
  b.struct({
    d: 3, skill: "UNDERSTANDING",
    stem: "An electron micrograph of phloem in longitudinal section shows cell X: long, with a thin layer of cytoplasm, no nucleus and an end wall with many pores. Next to it is cell Y: narrow, with dense cytoplasm, a large nucleus, many mitochondria and many fine channels through the shared wall with X.",
    parts: [
      P.short({ label: "(a)", marks: 1, stem: "Name cell X.", accepted: ["sieve tube element", "sieve tube", "sieve element", "sieve tube member", "sieve tube cell"], wrong: ["companion cell"], explanation: "X is a sieve tube element." }),
      P.short({ label: "(b)", marks: 1, stem: "Name the fine channels through the wall between X and Y.", accepted: ["plasmodesmata", "plasmodesma", "plasmodesmatum"], wrong: ["pits", "sieve pores"], explanation: "Plasmodesmata are cytoplasmic connections through cell walls." }),
      P.manual({
        label: "(c)", marks: 2, stem: "Explain why cell X depends on cell Y.",
        points: ["X has no nucleus / few organelles, so cannot make its own proteins or much ATP", "Y supplies proteins / ATP / loads sucrose into X through plasmodesmata"],
        modelAnswer: "The sieve tube element has no nucleus and few organelles, so it cannot make proteins or much ATP for itself; the companion cell supplies these, and loads sucrose into it through the plasmodesmata.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Suggest the advantage to the sieve tube element of having few organelles and a sieve plate with many pores.",
        points: ["Few organelles: more space / less resistance to the flow of sap", "Sieve plate pores allow sap to flow from one element to the next (while keeping the wall supported)"],
        modelAnswer: "With few organelles there is more space and less resistance for sap to flow, and the pores of the sieve plate let sap pass from one element to the next.",
      }),
    ],
    explanation: "Sieve tube elements are adapted for mass flow; companion cells keep them alive and loaded.",
    hints: ["Which cell has the nucleus and mitochondria?"],
  });

  b.card("DEFINITION", "Define a **plan diagram**.", "A low-power drawing showing the outlines and relative proportions of tissues, with no individual cells drawn.");
  b.card("CONCEPT", "Arrangement of vascular tissue in a dicot **root**", "Central stele: xylem in the centre (star/cross), phloem between the arms; surrounded by pericycle and endodermis.");
  b.card("CONCEPT", "Arrangement of vascular tissue in a dicot **stem**", "Bundles in a ring near the outside; phloem outside, cambium between, xylem inside; central pith.");
  b.card("FACT", "Where is xylem in a leaf vein?", "On the upper side of the bundle; phloem below it.");
  b.card("CONCEPT", "Xylem vessel element: four adaptations", "Dead and empty; no end walls; lignified walls; pits.");
  b.card("CONCEPT", "Sieve tube element: adaptations", "Living, no nucleus, few organelles, sieve plates with pores, linked to a companion cell by plasmodesmata.");
  b.card("FACT", "Why do companion cells have many mitochondria?", "To make ATP for active loading of sucrose (proton pumps).");
  b.card("FORMULA", "Actual size", "Actual size = image size ÷ magnification (same units).");
  b.card("FACT", "Monocot stem (ZIMSEC comparison)", "Bundles scattered through ground tissue; no cambium.", undefined, { applies: ZIM });
});
