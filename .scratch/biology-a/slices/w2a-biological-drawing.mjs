// W2a: biological drawing and microscope measurement in the practical papers.
import { concept, P, t, chk, table, graticuleUnit, magnification, actualSize, mean, sfStr, dpStr } from "../lib.mjs";

concept("abio.skills.biological-drawing", { file: "skills/biological-drawing", keyPrefix: "skills.biological-drawing" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which feature should a low-power plan diagram of a leaf section show?",
    options: [
      ["Outlines of the tissue layers only", "Correct."],
      ["Every cell of the palisade mesophyll", "Plan diagrams do not show individual cells."],
      ["Chloroplasts shaded in dark pencil", "No cells, organelles or shading in a plan."],
      ["Arrows pointing to each tissue", "Label lines are ruled lines without arrowheads."],
    ],
    answer: "A",
    explanation: "A plan shows **tissue outlines** in correct positions and proportions, with no cells.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "How should plant cell walls be drawn in a high-power drawing of adjacent cells?",
    options: [
      ["As double lines shared by neighbours", "Correct."],
      ["As single thin lines around each cell", "A single line does not show the wall's thickness."],
      ["As shaded bands of grey pencil", "Shading is never used."],
      ["As dotted lines", "Lines must be continuous."],
    ],
    answer: "A",
    explanation: "Plant cell walls are drawn as **double lines**; adjacent cells share the wall.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why must an eyepiece graticule be calibrated again when the objective lens is changed?",
    options: [
      ["Each division then covers a different actual length", "Correct: the specimen is magnified more, the graticule is not."],
      ["The graticule scale moves within the eyepiece", "The graticule stays fixed; the specimen's image size changes."],
      ["The stage micrometer divisions change size", "Stage micrometer divisions are fixed (e.g. 10 µm)."],
      ["The specimen shrinks at high power", "The specimen does not change size."],
    ],
    answer: "A",
    explanation: "The graticule is in the eyepiece and is not magnified by the objective, so each division covers a **different actual length** at each magnification.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Which pair of entries is suitable for one row of a table comparing two leaf sections?",
    options: [
      ["Stomata on upper surface: present | absent", "Correct: the same observable feature for both."],
      ["Stomata: present | thick cuticle", "Each row must compare the same feature."],
      ["Chloroplasts: carry out photosynthesis | carry out photosynthesis", "This is a function, not an observable difference."],
      ["Leaf: from a hot place | from a wet place", "Habitat is not observed on the slide."],
    ],
    answer: "A",
    explanation: "Each row compares the **same observable feature** in both specimens.",
    hints: ["Can you see it, and is it the same feature on both sides?"],
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A scale bar labelled 100 µm measures 25 mm on a photomicrograph. What is the magnification?",
    options: [
      ["×250", "Correct: 25 000 µm ÷ 100 µm."],
      ["×4", "This divides 100 by 25 without converting units."],
      ["×0.25", "This divides 25 mm by 100 µm without converting."],
      ["×2500", "Check the conversion: 25 mm = 25 000 µm, divided by 100 µm."],
    ],
    answer: "A",
    explanation: "Magnification $= 25\\,000\\ \\mu\\text{m} \\div 100\\ \\mu\\text{m} = \\times 250$.",
    hints: ["Convert the bar length to µm."],
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "A student's high-power drawing shows ribosomes and mitochondria in onion epidermis cells viewed with a light microscope at ×400. What is wrong with the drawing?",
    options: [
      ["It shows structures that cannot be seen at this magnification", "Correct: draw only what is visible."],
      ["It should show the cells as a plan diagram instead", "A high-power drawing of cells is acceptable if asked for."],
      ["Mitochondria are never found in onion cells", "Onion cells have mitochondria, but they are not resolved clearly here."],
      ["Ribosomes should be drawn larger than the nucleus", "Ribosomes are far too small to see with a light microscope."],
    ],
    answer: "A",
    explanation: "Drawings record **observable** features only; ribosomes are beyond the resolution of a light microscope.",
    hints: ["What is the rule about what to include?"],
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Label lines in a biological drawing should be ruled and should not have arrowheads.",
    answer: true,
    explanation: "True. They should touch the structure and not cross.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Shading should be used to show the darker-stained regions of a specimen in a plan diagram.",
    answer: false,
    explanation: "False. No shading is used in biological drawings.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each piece of equipment or term to its use.",
    pairs: [
      ["Stage micrometer", "Slide with a scale of known divisions"],
      ["Eyepiece graticule", "Scale in the eyepiece used to measure specimens"],
      ["Scale bar", "Line on an image representing a known actual length"],
      ["Plan diagram", "Low-power outline of tissues without cells"],
    ],
    explanation: "Tools and drawing types for measurement and recording.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct words.",
    template: "Drawings use a sharp {{blank:a}} with continuous lines and no {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["pencil"], choices: ["pencil", "pen", "felt-tip marker"] },
      { id: "b", accepted: ["shading"], choices: ["shading", "labels", "proportions"] },
    ],
    explanation: "Sharp pencil, continuous lines, no shading.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the slide with an engraved scale that is used to calibrate an eyepiece graticule.",
    accepted: ["stage micrometer", "a stage micrometer", "micrometer slide", "stage micrometre"],
    wrong: ["eyepiece graticule", "haemocytometer"],
    explanation: "The **stage micrometer** has divisions of known size, often 10 µm.",
  });

  // Calculations (different numbers from the lesson)
  const u = graticuleUnit({ stageDivisions: 18, eyepieceDivisions: 45 });
  chk(u, 4);
  b.num({
    d: 2, skill: "APPLICATION",
    stem: "At ×100, 18 stage micrometer divisions (each 10 µm) line up with 45 eyepiece divisions. Calculate the length of one eyepiece division in µm.",
    value: u, unit: "µm", wrong: [2.5, 0.4],
    explanation: t`$(18 \times 10) \div 45 = 180 \div 45 = 4\ \mu\text{m}$. Inverting gives 0.25 or 2.5.`,
  });
  const cell = 27 * u;
  const drawn = 54; // mm
  const mag = magnification(drawn, "mm", cell, "µm");
  chk(cell, 108);
  chk(mag, 500);
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "Using the same calibration (one eyepiece division = 4 µm), an epidermal cell measures 27 eyepiece divisions. A student draws it 54 mm long. Calculate the magnification of the drawing.",
    value: mag, prefix: "×", wrong: [2, sfStr(cell / 54000, 3)],
    explanation: t`1. Actual length $= 27 \times 4 = ${cell}\ \mu\text{m}$.
2. Drawing length $= 54\ \text{mm} = 54\,000\ \mu\text{m}$.
3. Magnification $= 54\,000 \div ${cell} = \times ${mag}$.
4. Using 54 without converting gives 0.5; 54 ÷ 27 gives 2.`,
    hints: ["Find the actual size in µm first."],
  });
  const sizeFromBar = actualSize(46, "mm", magnification(16, "mm", 40, "µm"));
  chk(sizeFromBar, 115);
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "A scale bar labelled 40 µm is 16 mm long on a photomicrograph. A xylem vessel element measures 46 mm long in the photomicrograph. Calculate its actual length in µm.",
    value: sizeFromBar, unit: "µm", wrong: [sfStr(46 * 16 / 40, 3), 1840],
    explanation: t`Magnification $= 16\,000 \div 40 = \times 400$. Actual length $= 46\,000 \div 400 = 115\ \mu\text{m}$ (or $46 \div 16 \times 40 = 115\ \mu\text{m}$).`,
    hints: ["Find the magnification from the scale bar."],
  });
  const counts = [31, 27, 34, 29, 30];
  const fieldArea = Math.PI * 0.25 ** 2;
  const dens = mean(counts) / fieldArea;
  b.num({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: t`Stomata were counted in five fields of view of a groundnut leaf epidermis: 31, 27, 34, 29 and 30. The diameter of the field of view was 0.50 mm. Calculate the mean number of stomata per mm², to three significant figures. (Area of a circle $= \pi r^2$.)`,
    value: dens, sf: 3, wrong: [sfStr(mean(counts) / (Math.PI * 0.5 ** 2), 3), sfStr(mean(counts) / 0.5, 3)],
    explanation: t`Mean $= 151 \div 5 = 30.2$. Radius $= 0.25$ mm; area $= \pi \times 0.25^2 = ${sfStr(fieldArea, 3)}\ \text{mm}^2$. Density $= 30.2 \div ${sfStr(fieldArea, 4)} = ${sfStr(dens, 3)}$ per mm². Using the diameter as the radius gives ${sfStr(mean(counts) / (Math.PI * 0.5 ** 2), 3)}.`,
    hints: ["Halve the diameter to get the radius."],
  });

  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "List four conventions you would follow when making a high-power drawing of three adjacent cells from a slide.",
    points: [
      "Draw only three cells, large, using most of the space",
      "Sharp pencil, clear continuous lines, no shading",
      "Correct shapes and relative sizes / contents in proportion; cell walls as double lines shared by neighbours",
      "Show only visible structures; ruled label lines touching the structure, not crossing, no arrowheads",
    ],
    modelAnswer: "I would draw just three adjacent cells, large, with a sharp pencil and continuous lines and no shading. Cell shapes, sizes and contents would be in proportion, with walls as double lines shared between neighbours. I would include only what I could see and label with ruled lines that touch the structure.",
    explanation: "Size, line quality, proportion, observable detail, labelling.",
    hints: ["Think about lines, size, content and labels."],
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 3,
    stem: "Describe how to calibrate an eyepiece graticule using a stage micrometer.",
    points: [
      "Place the stage micrometer on the stage and focus at the magnification to be used",
      "Line up the graticule and micrometer scales (rotate eyepiece) and find where divisions coincide",
      "Divide the length of the stage divisions (number × 10 µm) by the number of eyepiece divisions; recalibrate for each objective",
    ],
    modelAnswer: "Put the stage micrometer on the stage and focus on it with the objective that will be used. Rotate the eyepiece so the two scales lie side by side and find two points where lines coincide. Count the divisions on each: one eyepiece division equals the stage length (number of divisions × 10 µm) divided by the number of eyepiece divisions. Repeat for each objective.",
    explanation: "Calibrate at each magnification.",
    hints: ["Two scales, coincident lines, divide."],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 3,
    stem: "Suggest how a student could make an estimate of stomatal density more reliable.",
    points: [
      "Count several (at least five) fields of view chosen at random and calculate a mean",
      "Use several leaves / leaves of the same age and position from different plants",
      "Clear rule for stomata cut by the edge of the field (e.g. count only those on one half) / count each stoma once",
    ],
    modelAnswer: "Count at least five randomly chosen fields of view and take a mean, sample several leaves of the same age and position from different plants, and decide in advance how to count stomata lying across the edge of the field so that none is counted twice.",
    explanation: "More samples, replicates and clear counting rules.",
    hints: ["How many fields and leaves?"],
  });

  // Practice structured: comparing two specimens
  b.struct({
    d: 4, skill: "ANALYSIS",
    stem: "Two slides of leaf transverse sections are described.\n\nSlide K: a flat leaf with a thin cuticle, one row of long palisade cells, loosely packed spongy mesophyll with large air spaces, and stomata level with the surface on the lower epidermis.\n\nSlide L: a rolled leaf with a thick cuticle on the outer surface, deep grooves on the inner surface lined with hairs, and stomata sunk in the grooves; the outer surface has no stomata.",
    parts: [
      P.manual({
        label: "(a)", marks: 4, stem: "Describe a table you would draw to record three observable differences between K and L.",
        points: [
          "Three columns: feature, slide K, slide L (with headings)",
          "Cuticle: thin (K) / thick (L)",
          "Shape: flat (K) / rolled with grooves (L)",
          "Stomata: level with surface on lower epidermis (K) / sunken in grooves on inner surface, absent from outer surface (L); or hairs absent (K) / present (L)",
        ],
        modelAnswer: "\n\n| Feature | Slide K | Slide L |\n|---|---|---|\n| Cuticle | Thin | Thick on outer surface |\n| Leaf shape | Flat | Rolled, with deep grooves |\n| Position of stomata | Level with the surface, lower epidermis | Sunk in grooves on the inner surface |",
      }),
      P.short({ label: "(b)", marks: 1, stem: "Which slide is from a xerophyte?", accepted: ["L", "slide L"], wrong: ["K"], explanation: "L has rolled leaves, sunken stomata and hairs: xerophytic features." }),
      P.manual({
        label: "(c)", marks: 2, stem: "Describe a plan diagram you would draw of slide L.",
        points: ["Outline of the rolled leaf with the grooves, showing tissue regions (thick cuticle / epidermis, mesophyll, vascular bundles) in correct proportions", "No cells drawn, no shading, continuous lines, ruled labels"],
        modelAnswer: "A large outline of the rolled leaf showing its grooves, with regions for the epidermis and cuticle, the mesophyll and the vascular bundles in correct positions and proportions; no cells, no shading, continuous lines and ruled labels.",
      }),
      P.num({
        label: "(d)", marks: 1, stem: "On a photomicrograph of slide L at ×80, the leaf is 72 mm across. Calculate its actual width in mm.",
        value: actualSize(72, "mm", 80, "mm"), unit: "mm", wrong: [5760],
        explanation: t`$72 \div 80 = 0.9$ mm.`,
      }),
    ],
    explanation: "Compare observable features of the same kind; plan diagrams show regions only.",
    hints: ["One feature per row, both specimens."],
    calculator: true,
  });
  chk(actualSize(72, "mm", 80, "mm"), 0.9);

  const lens = [[21, 26, 23], [11, 12, 13]];
  const epuLow = 10;
  const meanA = mean(lens[0]) * epuLow;
  const meanB = mean(lens[1]) * epuLow;
  b.struct({
    d: 3, skill: "APPLICATION",
    stem: `Sipho measured three palisade cells (A) and three spongy mesophyll cells (B) at a magnification where one eyepiece division = 10 µm.\n\n${table(["Cell type", "Cell 1 / eyepiece divisions", "Cell 2 / eyepiece divisions", "Cell 3 / eyepiece divisions"], [["A (palisade)", ...lens[0]], ["B (spongy)", ...lens[1]]])}`,
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the mean length of a palisade cell in µm, to three significant figures.", value: meanA, sf: 3, unit: "µm", wrong: [sfStr(mean(lens[0]), 3)], explanation: t`Mean $= (22 + 25 + 24) \div 3 = ${sfStr(mean(lens[0]), 4)}$ divisions $\times 10 = ${sfStr(meanA, 3)}\ \mu\text{m}$.` }),
      P.num({ label: "(b)", marks: 1, stem: "Calculate how many times longer the mean palisade cell is than the mean spongy cell, to two significant figures.", value: meanA / meanB, sf: 2, wrong: [sfStr(meanB / meanA, 2)], explanation: t`$${sfStr(meanA, 3)} \div ${meanB} = ${sfStr(meanA / meanB, 2)}$.` }),
      P.manual({
        label: "(c)", marks: 2, stem: "Describe what your high-power drawing of two adjacent palisade cells would show.",
        points: ["Two elongated cells with walls as double lines shared between them, in correct proportion (length about twice width or more)", "Visible chloroplasts (many, near the walls) drawn as outlines; no shading"],
        modelAnswer: "Two tall, narrow cells side by side sharing a double-line wall, in correct proportions, with many chloroplasts drawn as small outlines near the walls and no shading.",
      }),
    ],
    explanation: "Convert eyepiece divisions to µm and compare means.",
    hints: ["Multiply the mean number of divisions by 10 µm."],
    calculator: true,
  });
  chk(meanB, 120);

  b.card("DEFINITION", "Define a **plan diagram**.", "Low-power outline of tissues in correct positions and proportions, with no cells drawn.");
  b.card("CONCEPT", "Drawing conventions", "Sharp pencil, continuous lines, no shading, large, correct proportions, ruled label lines without arrowheads.");
  b.card("FACT", "How are plant cell walls drawn at high power?", "As double lines shared between adjacent cells.");
  b.card("FORMULA", "Value of one eyepiece division", "(stage divisions × size of one stage division) ÷ eyepiece divisions.");
  b.card("FORMULA", "Magnification from a scale bar", "Length of the bar on the image ÷ actual length it represents (same units).");
  b.card("FACT", "Why recalibrate at each objective?", "The graticule is not magnified by the objective, so one division represents a different actual length.");
  b.card("CONCEPT", "Comparison tables", "Each row compares the same observable feature in both specimens.");
  b.card("CONCEPT", "Estimating density in a field of view", "Count in several random fields, divide the mean count by the field area (πr²).");
});
