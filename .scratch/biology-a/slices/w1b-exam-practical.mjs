// W1b: PRACTICAL_MICROSCOPY (ZIMSEC Paper 4 / Cambridge Paper 3 question 2 style): root tip squash and mitotic index.
import { concept, P, t, chk, EXAM, checkExam, graticuleUnit, magnification, mitoticIndex, dpStr, rnd } from "../lib.mjs";

const A = (k) => `abio.${k}`;

concept(A("division.mitosis"), { file: "exam/w1b-practical", keyPrefix: "exam.w1b-practical" }, (b) => {
  const epu = graticuleUnit({ stageDivisions: 10, umPerStageDivision: 10, eyepieceDivisions: 40 });
  chk(epu, 2.5);
  const cellEpu = 9;
  const cellUm = cellEpu * epu;
  chk(cellUm, 22.5);
  const drawn = 45; // mm
  const mag = magnification(drawn, "mm", cellUm, "µm");
  chk(mag, 2000);
  const inM = 9 + 4 + 2 + 3;
  const total = 150;
  const mi = mitoticIndex(inM, total);
  chk(mi, 0.12);

  b.struct({
    d: 4, examStyle: true, skill: EXAM.PRACTICAL_MICROSCOPY.skill, secs: EXAM.PRACTICAL_MICROSCOPY.secs, paper: "ZIMSEC P4 / Cambridge P3",
    concepts: [A("division.mitosis"), A("skills.biological-drawing")],
    stem: "Farai prepared a squash of an onion root tip stained with acetic orcein. At low power (×100) the slide shows a dome-shaped root cap of loosely arranged cells at the tip, then a region of small, closely packed, roughly square cells with large nuclei about 1-2 mm long, then a region of longer, narrower cells with smaller nuclei. At high power (×400), many cells in the region of small cells contain visible chromosomes.",
    parts: checkExam(EXAM.PRACTICAL_MICROSCOPY, [
      P.manual({
        label: "(a)", marks: 3, stem: "Describe the low-power plan diagram you would draw of the root tip.",
        points: [
          "Outlines of the regions only (root cap, zone of division, zone of elongation); no individual cells drawn",
          "Regions in correct proportions and positions, drawn with clear, continuous, sharp pencil lines (no shading)",
          "Labels with ruled label lines that do not cross, touching the region labelled",
        ],
        modelAnswer: "A large outline of the root tip showing three regions in their correct relative sizes: the dome-shaped root cap, the short zone of small dividing cells behind it and the zone of elongation. Only the boundaries of the regions are drawn, as sharp continuous pencil lines without shading or individual cells, and each region is labelled with a ruled line that touches it.",
      }),
      P.group({
        label: "(b)", stem: "At ×400, 10 divisions of a stage micrometer (each division 10 µm) lined up exactly with 40 divisions of the eyepiece graticule.",
        parts: [
          P.num({
            label: "(i)", marks: 2, stem: "Calculate the length of one eyepiece graticule division, in µm.",
            value: epu, unit: "µm", wrong: [4, 0.25],
            explanation: t`10 stage divisions $= 10 \times 10 = 100\ \mu\text{m}$. One eyepiece division $= 100 \div 40 = 2.5\ \mu\text{m}$. Inverting (40 ÷ 10) gives 4.`,
          }),
          P.num({
            label: "(ii)", marks: 1, stem: "A cell in the zone of division measures 9 eyepiece divisions long. Calculate its actual length in µm.",
            value: cellUm, unit: "µm", wrong: [9 * 10],
            explanation: t`$9 \times 2.5 = 22.5\ \mu\text{m}$.`,
          }),
        ],
      }),
      P.num({
        label: "(c)", marks: 2, stem: "Farai drew this cell 45 mm long. Calculate the magnification of the drawing.",
        value: mag, prefix: "×", wrong: [rnd(cellUm / 45000, 4), 45 / 22.5],
        explanation: t`Convert: $45\ \text{mm} = 45\,000\ \mu\text{m}$. Magnification $= 45\,000 \div 22.5 = \times ${mag}$. Forgetting to convert mm to µm gives 2.`,
      }),
      P.num({
        label: "(d)", marks: 2, stem: "In one field of view of the zone of division, Farai counted 150 cells: 9 in prophase, 4 in metaphase, 2 in anaphase, 3 in telophase and the rest in interphase. Calculate the mitotic index, as a decimal to two decimal places.",
        value: mi, dp: 2, wrong: [rnd(inM / (total - inM), 2)],
        explanation: t`Cells in mitosis $= 9 + 4 + 2 + 3 = 18$. Mitotic index $= 18 \div 150 = ${dpStr(mi, 2)}$. Dividing by the 132 interphase cells instead of all 150 gives ${dpStr(inM / (total - inM), 2)}.`,
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "Describe what your high-power drawing of three adjacent cells, one of them in anaphase, would show.",
        points: [
          "Correct cell shapes and relative sizes, with cell walls drawn as double lines shared between adjacent cells",
          "Only visible contents: nucleus with nucleolus in interphase cells; two groups of V-shaped chromosomes moving to opposite poles in the anaphase cell; no shading",
        ],
        modelAnswer: "Three roughly square cells of correct relative size, each with a cell wall drawn as a double line shared with its neighbours. The interphase cells show a large nucleus with a nucleolus; the anaphase cell shows two groups of V-shaped chromosomes near opposite ends. Clear single lines, no shading.",
      }),
      P.manual({
        label: "(f)", marks: 3, stem: "Prepare a table showing three observable differences between cells in the zone of division and cells in the zone of elongation.",
        points: [
          "A table with a column for each zone and a column (or rows) for the feature compared; each row gives both observations",
          "Size/shape: zone of division cells small and roughly square; elongation cells long and narrow",
          "Nucleus: large relative to cell / chromosomes visible in many cells in the zone of division; smaller nucleus, no chromosomes visible / vacuoles visible in the zone of elongation",
        ],
        modelAnswer: "\n\n| Feature | Zone of division | Zone of elongation |\n|---|---|---|\n| Cell shape | Small, roughly square | Long and narrow |\n| Nucleus size relative to cell | Large | Small |\n| Visible chromosomes | In many cells | None seen |",
      }),
    ]),
    explanation: "Plan diagrams show regions without cells; a calibrated graticule gives actual sizes; magnification = image ÷ actual (same units); mitotic index = dividing cells ÷ total.",
    hints: ["One eyepiece division = (stage divisions × 10 µm) ÷ eyepiece divisions.", "Convert the drawing length to µm before dividing."],
    calculator: true,
  });
});
