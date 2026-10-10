// W1a: microscopes, magnification, resolution and graticule calibration.
import { concept, P, t, chk, sfStr, convert, magnification, actualSize, graticuleUnit } from "../lib.mjs";

concept("abio.cells.microscopy", { file: "cells/microscopy", keyPrefix: "cells.microscopy" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which statement defines the **resolution** of a microscope?",
    options: [
      ["The ability to distinguish two points close together as separate points", "Correct: resolution is about separating detail, not about size."],
      ["The number of times larger the image is than the real object", "This defines magnification, which can increase without any gain in detail."],
      ["The maximum magnification that the objective lens of the microscope can produce", "Magnification and resolution are different properties; a lens can magnify past its useful resolution."],
      ["The brightness and contrast of the image seen through the eyepiece", "Contrast helps visibility (stains increase it) but is not the definition of resolution."],
    ],
    answer: "A",
    explanation: "Resolution is the smallest separation at which two points can still be seen as two. Magnification only makes the image bigger; beyond the resolution limit it adds no detail (empty magnification).",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why does a transmission electron microscope have a much higher resolution than a light microscope?",
    options: [
      ["A beam of electrons has a much shorter wavelength than visible light", "Correct: resolution is limited to roughly half the wavelength of the radiation used."],
      ["Its electromagnetic lenses magnify the image many more times than glass lenses", "Higher magnification alone gives no extra detail; the gain comes from the shorter wavelength."],
      ["The specimen is stained with heavy-metal salts instead of dyes", "Staining increases contrast; it does not change the resolving power of the instrument."],
      ["The specimen is kept in a vacuum so that it cannot move about", "The vacuum stops air molecules scattering the electrons; it does not set the resolution limit."],
    ],
    answer: "A",
    explanation: "Two points closer together than about half the wavelength of the radiation cannot be distinguished. Electrons have wavelengths thousands of times shorter than light (about 400–700 nm), so the TEM resolves about 0.5 nm compared with about 200 nm for the light microscope.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which structure can be seen with a transmission electron microscope but **cannot** be resolved with a light microscope?",
    options: [
      ["A ribosome", "Correct: ribosomes are about 20–30 nm across, far below the light microscope's limit of about 200 nm."],
      ["A nucleus", "Nuclei are several µm across and are easily seen with a light microscope, especially when stained."],
      ["A chloroplast", "Chloroplasts are a few µm long and are visible as green discs with a light microscope."],
      ["A cell wall", "Plant cell walls are clearly visible with a light microscope, for example in onion epidermis."],
    ],
    answer: "A",
    explanation: "Structures smaller than about 200 nm (ribosomes, membranes, cristae, the detail of the Golgi body) need an electron microscope. Nuclei, chloroplasts, cell walls and large vacuoles are visible with a light microscope.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "A researcher wants a three-dimensional view of the surface of a pollen grain from a maize tassel. Which instrument is most suitable?",
    options: [
      ["A scanning electron microscope", "Correct: the SEM scans electrons across a metal-coated surface and gives a 3D surface image."],
      ["A transmission electron microscope", "The TEM passes electrons through a thin section and gives a flat 2D image of internal structure."],
      ["A light microscope at ×400", "A light microscope gives a 2D image with much lower resolution of the surface sculpturing."],
      ["A hand lens at ×10", "A hand lens magnifies far too little to show the detail of a pollen grain surface."],
    ],
    answer: "A",
    explanation: "The SEM is the instrument for surface shape in three dimensions (pollen walls, insect mouthparts, the surfaces of cells). The TEM shows internal ultrastructure in thin sections.",
  });
  const nm = convert(0.45, "µm", "nm");
  chk(nm, 450);
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "A bacterial flagellum is 0.45 µm long. What is this length in nanometres?",
    options: [
      ["450 nm", "Correct: 1 µm = 1000 nm, so 0.45 × 1000 = 450 nm."],
      ["45 nm", "This multiplies by 100 instead of 1000."],
      ["4500 nm", "This multiplies by 10 000 instead of 1000."],
      ["0.00045 nm", "This divides by 1000 instead of multiplying: nanometres are smaller units, so the number must get larger."],
    ],
    answer: "A",
    explanation: "Converting to a smaller unit makes the number larger: 1 µm = 1000 nm, so 0.45 µm = 450 nm.",
  });
  const u10 = graticuleUnit({ stageDivisions: 40, umPerStageDivision: 10, eyepieceDivisions: 40 });
  const u40 = u10 / 4;
  chk(u10, 10);
  chk(u40, 2.5);
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "With the ×10 objective, one eyepiece graticule division is worth 10 µm. The student changes to the ×40 objective and does not recalibrate. What is one division now worth, assuming the eyepiece is unchanged?",
    options: [
      ["2.5 µm", "Correct: the specimen is magnified four times more, so each division covers a quarter of the length."],
      ["40 µm", "The divisions cover less of the specimen at higher power, not more."],
      ["10 µm", "The graticule is in the eyepiece, so its divisions stay the same size while the specimen image gets larger."],
      ["0.25 µm", "This divides by 40 instead of by the change in magnification (×40 ÷ ×10 = 4)."],
    ],
    answer: "A",
    explanation: "Magnification rises by a factor of 40 ÷ 10 = 4, so each eyepiece division now covers 10 ÷ 4 = 2.5 µm of the specimen. In practice, always recalibrate with a stage micrometer rather than relying on this calculation.",
    hints: ["The graticule is inside the eyepiece; what gets bigger when you change objective?", "By what factor does the magnification change?"],
  });
  const a7 = actualSize(30, "mm", 12000, "µm");
  chk(a7, 2.5);
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "An electron micrograph at ×12 000 shows a chloroplast 30 mm long. What is the actual length of the chloroplast?",
    options: [
      ["2.5 µm", "Correct: 30 mm = 30 000 µm, and 30 000 ÷ 12 000 = 2.5 µm."],
      ["0.0025 µm", "This divides 30 by 12 000 without converting mm to µm, and then labels the result in µm."],
      ["400 µm", "This divides the magnification by the image size, inverting the formula."],
      ["360 000 µm", "This multiplies the image size by the magnification instead of dividing."],
    ],
    answer: "A",
    explanation: "Actual size = image size ÷ magnification, with the image size converted to µm first: 30 × 1000 = 30 000 µm; 30 000 ÷ 12 000 = 2.5 µm, a sensible length for a chloroplast.",
    hints: ["Convert the image length to µm first.", "Actual size = image size ÷ magnification."],
  });
  const m8 = magnification(45, "mm", 30, "µm");
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "A cheek cell has an actual diameter of 30 µm. In a student's drawing it is 45 mm across. Calculate the magnification of the drawing.",
    value: m8, prefix: "×",
    wrong: [String(45 / 30), String(30 / 45000)],
    explanation: "Convert 45 mm to 45 000 µm. Magnification = 45 000 ÷ 30 = ×1500. (Dividing 45 by 30 without converting gives 1.5; inverting gives 0.000667.)",
  });
  const a9 = actualSize(22, "mm", 2000, "µm");
  b.num({
    d: 2, skill: "APPLICATION",
    stem: "A photomicrograph at ×2000 shows a nucleus with a diameter of 22 mm. Calculate the actual diameter of the nucleus in µm.",
    value: a9, unit: "µm",
    wrong: [String(22 / 2000), String(22000 * 2000)],
    explanation: "22 mm = 22 000 µm; actual size = 22 000 ÷ 2000 = 11 µm. Forgetting to convert gives 0.011; multiplying instead of dividing gives 44 000 000.",
  });
  const mBar = magnification(25, "mm", 1, "µm");
  const a10 = actualSize(40, "mm", mBar, "µm");
  chk(mBar, 25000);
  chk(a10, 1.6);
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "An electron micrograph of a mitochondrion has a scale bar labelled 1 µm, which measures 25 mm. The mitochondrion measures 40 mm long on the same micrograph. Calculate its actual length in µm.",
    value: a10, unit: "µm",
    wrong: ["40", "0.625"],
    explanation: t`1. Magnification from the scale bar: $25\,000\ \mu\text{m} \div 1\ \mu\text{m} = \times 25\,000$.
2. Image length of the mitochondrion: $40\ \text{mm} = 40\,000\ \mu\text{m}$.
3. Actual length $= 40\,000 \div 25\,000 = 1.6\ \mu\text{m}$.
4. A quicker route: the mitochondrion is $40 \div 25 = 1.6$ times as long as the 1 µm bar. (0.625 comes from dividing the bar by the organelle.)`,
    hints: ["Use the scale bar to find the magnification first.", "Or compare the organelle's length directly with the bar's length."],
  });
  const u11 = graticuleUnit({ stageDivisions: 12, umPerStageDivision: 10, eyepieceDivisions: 40 });
  chk(u11, 3);
  const w11 = 23 * u11;
  b.calc({
    d: 4, skill: "APPLICATION", calculator: true,
    stem: "At one objective lens, 40 eyepiece graticule divisions line up exactly with 12 divisions of a stage micrometer. Each stage micrometer division is 0.01 mm. A guard cell measures 23 eyepiece divisions long at the same objective. Calculate its actual length in µm.",
    value: w11, unit: "µm",
    wrong: ["0.069", "76.7"],
    explanation: t`1. One stage division $= 0.01\ \text{mm} = 10\ \mu\text{m}$, so 12 stage divisions $= 120\ \mu\text{m}$.
2. One eyepiece division $= 120\ \mu\text{m} \div 40 = 3\ \mu\text{m}$.
3. Length of the guard cell $= 23 \times 3 = 69\ \mu\text{m}$.
4. Leaving the stage division in mm gives 0.069; dividing 40 by 12 instead of 12 by 40 gives a calibration of 3.33 and a length of 76.7.`,
    hints: ["Convert 0.01 mm to µm.", "One eyepiece division = total stage length ÷ number of eyepiece divisions."],
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Living cells can be observed moving and dividing with a transmission electron microscope.",
    answer: false,
    explanation: "False. The TEM needs a vacuum and ultra-thin, fixed, dehydrated and heavy-metal-stained sections, so the specimen is dead. Living processes such as mitosis in a root tip are watched with a light microscope.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Enlarging a light micrograph beyond the resolution limit of the light microscope shows no extra detail.",
    answer: true,
    explanation: "True. This is empty magnification: the image gets bigger, but points closer together than about 200 nm still appear as a single blur.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each microscope with the feature that applies only to it.",
    pairs: [
      ["Light microscope", "Can show living cells in colour"],
      ["Transmission electron microscope", "Electrons pass through an ultra-thin section"],
      ["Scanning electron microscope", "Electrons reflected from a metal-coated surface give a 3D image"],
    ],
    explanation: "Only the light microscope works with living specimens and natural or stain colours. The TEM sends electrons through a thin section (internal detail, 2D); the SEM scans the coated surface (surface detail, 3D).",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentences about units.",
    template: "One millimetre is equal to {{blank:a}} micrometres, and one micrometre is equal to {{blank:b}} nanometres. Cells are usually measured in {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["1000"], choices: ["10", "100", "1000", "1 000 000"] },
      { id: "b", accepted: ["1000"], choices: ["10", "100", "1000", "1 000 000"] },
      { id: "c", accepted: ["micrometres"], choices: ["millimetres", "micrometres", "nanometres", "centimetres"] },
    ],
    explanation: "1 mm = 1000 µm and 1 µm = 1000 nm. Most cells are 1–100 µm across, so the micrometre is the convenient unit; organelles such as ribosomes and membranes are measured in nm.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the slide with a scale of known length that is used to calibrate an eyepiece graticule.",
    accepted: ["stage micrometer", "stage micrometre", "a stage micrometer", "micrometer slide", "stage micrometer slide"],
    wrong: ["eyepiece graticule", "graticule"],
    explanation: "The **stage micrometer** is a slide engraved with a scale (often 1 mm in 100 divisions of 10 µm). The graticule in the eyepiece is lined up against it at each objective.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why the internal structure of a mitochondrion can be seen in a transmission electron micrograph but not with a light microscope.",
    points: [
      "Cristae / inner membrane / internal membranes are very thin or close together (a few nm apart; smaller than about 200 nm)",
      "Light has a long wavelength (about 400–700 nm), so the light microscope's resolution is only about 200 nm",
      "Electrons have a much shorter wavelength, so the TEM resolves points about 0.5 nm apart (higher resolution)",
    ],
    modelAnswer: "The cristae and membranes inside a mitochondrion are only a few nanometres thick and lie closer together than 200 nm. Light has a wavelength of about 400–700 nm, so a light microscope cannot resolve points closer than about 200 nm and the internal detail appears blurred. Electrons have a far shorter wavelength, so the TEM has a resolution of about 0.5 nm and can separate the membranes.",
    explanation: "The answer must link wavelength to resolution; saying only that the TEM 'magnifies more' earns no credit.",
    hints: ["What property of the radiation limits resolution?", "Compare the size of cristae with 200 nm."],
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "Describe how a student would calibrate an eyepiece graticule for the ×40 objective lens.",
    points: [
      "Place the stage micrometer on the stage and focus on it with the ×40 objective",
      "Rotate the eyepiece so the graticule scale lies parallel to / over the stage micrometer scale",
      "Line up two marks (for example both zeros) and count eyepiece divisions and stage divisions to a second point where marks coincide",
      "One eyepiece division = number of stage divisions × length of a stage division (e.g. 10 µm) ÷ number of eyepiece divisions",
    ],
    modelAnswer: "Put the stage micrometer on the stage and focus on its scale using the ×40 objective. Turn the eyepiece until the graticule scale lies along the micrometer scale. Line up the zero marks of both scales and find a point further along where two marks coincide exactly. Count the divisions on each scale between these points. Each eyepiece division = (number of stage divisions × 10 µm) ÷ number of eyepiece divisions.",
    explanation: "Calibration converts arbitrary eyepiece units into µm for one objective only; it must be repeated for every objective.",
    hints: ["Which slide has a scale of known length?", "Finish with the calculation for one eyepiece division."],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 3,
    stem: "Suggest **three** disadvantages of using an electron microscope rather than a light microscope to study cells in a school or hospital laboratory.",
    points: [
      "Specimens must be dead (vacuum, fixing) so living processes cannot be observed",
      "Preparation (fixing, dehydrating, heavy-metal staining, sectioning) is complex and may produce artefacts",
      "Very expensive to buy and run or large / not portable or needs a trained operator or images are black and white (only false colour)",
    ],
    modelAnswer: "The specimen has to be dead because it is placed in a vacuum, so movement or division of living cells cannot be seen. Preparation is long and complicated and can create artefacts that were not in the living cell. The instrument is very expensive, large and needs skilled operators, and it gives only black-and-white images.",
    explanation: "Any three distinct, valid disadvantages score; repeating the same idea in different words scores once.",
    hints: ["Think about the specimen, its preparation and the instrument itself."],
  });
  // Practice structured: scale bar, then mitochondrion and nucleus measurements
  const barMag = magnification(30, "mm", 2, "µm");
  chk(barMag, 15000);
  const nucA = actualSize(96, "mm", barMag, "µm");
  const mitoA = actualSize(18, "mm", barMag, "µm");
  chk(nucA, 6.4);
  chk(mitoA, 1.2);
  b.struct({
    d: 4, skill: "APPLICATION", calculator: true,
    stem: "An electron micrograph of a liver cell shows a nucleus, several mitochondria with cristae, and many dark granules about 25 nm across along membranes. A scale bar labelled 2 µm is 30 mm long. The nucleus measures 96 mm across and one mitochondrion is 18 mm long on the micrograph.",
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the magnification of the micrograph.", value: barMag, prefix: "×", wrong: ["15"], explanation: "30 mm = 30 000 µm; 30 000 ÷ 2 = ×15 000." }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the actual diameter of the nucleus in µm.", value: nucA, unit: "µm", wrong: ["0.0064"], explanation: "96 mm = 96 000 µm; 96 000 ÷ 15 000 = 6.4 µm." }),
      P.num({ label: "(c)", marks: 1, stem: "Calculate the actual length of the mitochondrion in µm.", value: mitoA, unit: "µm", wrong: ["0.0012"], explanation: "18 000 µm ÷ 15 000 = 1.2 µm." }),
      P.mcq({
        label: "(d)", marks: 1, stem: "The dark granules about 25 nm across along the membranes are most likely to be:",
        options: [["ribosomes", "Correct: ribosomes are about 20–30 nm and line the rough endoplasmic reticulum."], ["lysosomes", "Lysosomes are vesicles about 0.1–1 µm across, much larger."], ["centrioles", "Centrioles are hollow cylinders of microtubules about 500 nm long."], ["chloroplasts", "Liver cells have no chloroplasts, and chloroplasts are several µm long."]],
        answer: "A", explanation: "Granules of about 25 nm attached to membranes are ribosomes on rough ER.",
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "Explain why these granules would not be visible if the same cell were viewed with a light microscope.",
        points: ["Granules (25 nm) are smaller than / closer together than the resolution of the light microscope (about 200 nm)", "Because light has a long wavelength / resolution is limited by wavelength"],
        modelAnswer: "The ribosomes are about 25 nm across, well below the light microscope's resolution of about 200 nm, which is limited by the long wavelength of visible light, so they cannot be distinguished.",
      }),
    ],
    explanation: "Measure the scale bar to get the magnification, then use actual size = image ÷ magnification for each structure. The 25 nm granules are ribosomes, visible only because the TEM has a far higher resolution than the light microscope.",
    hints: ["Treat the scale bar like any object of known size.", "Keep every length in µm before dividing."],
  });
  const uS = graticuleUnit({ stageDivisions: 30, umPerStageDivision: 10, eyepieceDivisions: 100 });
  chk(uS, 3);
  const cellS = 28 * uS;
  const drawMag = magnification(63, "mm", cellS, "µm");
  b.struct({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "Farai calibrates an eyepiece graticule at high power: 100 eyepiece divisions are equal to 30 stage micrometer divisions, and each stage division is 10 µm. A root hair cell is 28 eyepiece divisions wide. Farai then draws the cell 63 mm wide.",
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "Calculate the length of one eyepiece division in µm.", value: uS, unit: "µm", wrong: ["3.33"], explanation: "30 × 10 µm = 300 µm; 300 ÷ 100 = 3 µm." }),
      P.num({ label: "(b)", marks: 1, stem: "Calculate the actual width of the cell in µm.", value: cellS, unit: "µm", wrong: ["28"], explanation: "28 × 3 = 84 µm." }),
      P.num({ label: "(c)", marks: 2, stem: "Calculate the magnification of Farai's drawing to the nearest whole number.", value: drawMag, dp: 0, prefix: "×", wrong: ["0.75"], explanation: t`63 mm = 63 000 µm; $63\,000 \div 84 = 750$, so ×750.` }),
      P.manual({ label: "(d)", marks: 2, stem: "Explain why Farai must recalibrate before measuring cells with the low-power objective.", points: ["The graticule is in the eyepiece, so its divisions do not change size when the objective is changed", "But the specimen image is magnified less at low power, so each division covers a larger actual length (the µm value of a division changes)"], modelAnswer: "The graticule scale stays the same size because it is in the eyepiece, but the specimen is magnified less with the low-power objective, so each division now represents a larger length of the specimen and the old value would give lengths that are too small." }),
    ],
    explanation: "Calibration value × number of divisions gives the actual size; the drawing's magnification is its width (in µm) ÷ the actual width. Calibrations apply to one objective only.",
    hints: ["One eyepiece division = total stage length ÷ eyepiece divisions.", "Convert the drawing width to µm."],
  });

  b.card("DEFINITION", "Define **magnification**.", "How many times larger the image is than the real object: image size ÷ actual size (no units, written ×400).");
  b.card("DEFINITION", "Define **resolution**.", "The ability to distinguish two points close together as separate points; the smaller the distance resolved, the more detail visible.");
  b.card("FORMULA", "Actual size from image size and magnification?", "Actual size = image size ÷ magnification (both lengths in the same unit).");
  b.card("FACT", "Approximate resolution of a light microscope and of a TEM?", "Light microscope about 200 nm; TEM about 0.5 nm (textbook values vary).", "Set by the wavelength of the radiation: light 400–700 nm, electrons far shorter.");
  b.card("FACT", "1 mm = ? µm = ? nm", "1 mm = 1000 µm = 1 000 000 nm (1 µm = 1000 nm).");
  b.card("CONCEPT", "Why does an electron microscope have higher resolution than a light microscope?", "Electrons have a much shorter wavelength than visible light, so points much closer together can be distinguished.");
  b.card("CONCEPT", "TEM or SEM: which gives a 3D surface view?", "SEM: electrons scanned over a metal-coated surface. The TEM passes electrons through a thin section and shows internal detail in 2D.");
  b.card("FORMULA", "Value of one eyepiece graticule division?", "(Number of stage divisions × length of one stage division) ÷ number of eyepiece divisions; recalibrate for each objective.");
  b.card("DEFINITION", "What is an **artefact** in microscopy?", "A structure or feature seen in a preparation that was not present in the living cell, caused by fixing, staining or sectioning.");
});
