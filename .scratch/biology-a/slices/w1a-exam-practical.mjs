// W1a: practical microscopy item (ZIMSEC Paper 4 and Cambridge Paper 3 question 2 style): onion epidermis, graticule.
import { concept, P, t, chk, table, EXAM, checkExam, graticuleUnit, mean, magnification } from "../lib.mjs";

const A = (k) => `abio.${k}`;

concept(A("cells.slides-and-cells"), { file: "exam/w1a-practical", keyPrefix: "exam.w1a-practical" }, (b) => {
  const epu = graticuleUnit({ stageDivisions: 48, umPerStageDivision: 10, eyepieceDivisions: 50 });
  chk(epu, 9.6);
  const lens = [22, 25, 19, 24, 20];
  const mEpu = mean(lens);
  chk(mEpu, 22);
  const mUm = mEpu * epu;
  const drawn = 24 * epu;
  const drawMag = magnification(70, "mm", drawn, "µm");
  b.struct({
    skill: EXAM.PRACTICAL_MICROSCOPY.skill, secs: EXAM.PRACTICAL_MICROSCOPY.secs, examStyle: true, paper: "ZIMSEC P4 / Cambridge P3", d: 4, calculator: true,
    concepts: [A("cells.slides-and-cells"), A("cells.microscopy"), A("skills.biological-drawing")],
    stem: `Rudo made a temporary mount of onion epidermis stained with iodine solution and observed it with the ×10 objective lens.\n\nCalibration: with the ×10 objective, 50 eyepiece graticule divisions lined up exactly with 48 divisions of a stage micrometer. Each stage micrometer division is 0.01 mm.\n\nShe then measured the lengths of five cells in eyepiece divisions:\n\n${table(["Cell", "1", "2", "3", "4", "5"], [["Length / eyepiece divisions", ...lens.map(String)]])}\n\nThe cells were elongated, roughly rectangular and arranged in rows with their ends touching. Each had a thin layer of cytoplasm against the wall, a large clear vacuole, and a stained nucleus usually near one side wall.`,
    parts: checkExam(EXAM.PRACTICAL_MICROSCOPY, [
      P.num({ label: "(a)", marks: 1, stem: "Calculate the length of one eyepiece division in µm.", value: epu, unit: "µm", wrong: ["10.4", "0.0096"], explanation: "48 × 10 µm = 480 µm; 480 ÷ 50 = 9.6 µm. Dividing 50 by 48 and multiplying by 10 gives 10.4." }),
      P.num({ label: "(b)", marks: 1, stem: "Calculate the mean length of the five cells in eyepiece divisions.", value: mEpu, wrong: ["110"], explanation: "(22 + 25 + 19 + 24 + 20) ÷ 5 = 110 ÷ 5 = 22." }),
      P.num({ label: "(c)", marks: 2, stem: "Calculate the mean actual length of the cells in µm, to three significant figures.", value: mUm, sf: 3, unit: "µm", wrong: ["220", "0.211"], explanation: "22 × 9.6 = 211.2, which is 211 µm to three significant figures. Assuming one division is 10 µm (no calibration) gives 220; leaving the micrometer in mm gives 0.211." }),
      P.manual({
        label: "(d)", marks: 4, stem: "Rudo made a high-power drawing of three adjacent cells. Describe what a drawing that meets the practical-paper conventions would show.",
        points: ["Clear, sharp, continuous lines (pencil); no shading or colouring", "Cell walls drawn as double lines, with shared walls between adjacent cells; correct elongated shape and proportions of the three cells", "Only observable contents: nucleus (with nucleolus if seen) near the wall, thin layer of cytoplasm, vacuole not shaded; no structures not seen (no chloroplasts)", "Labels (cell wall, nucleus, cytoplasm, vacuole) with ruled label lines that touch the structure and do not cross; drawing large (fills most of the space)"],
        modelAnswer: "A large pencil drawing of three touching, elongated cells in correct proportion, with each cell wall drawn as a double line and shared walls between cells. Lines are sharp and unbroken, with no shading. Each cell shows a nucleus against a side wall and a thin layer of cytoplasm, the vacuole left unshaded; no chloroplasts are drawn because none were seen. Labels for cell wall, cytoplasm, nucleus and vacuole are joined by ruled lines that touch the structures and do not cross.",
      }),
      P.num({ label: "(e)", marks: 2, stem: "Cell 4 (24 eyepiece divisions) was drawn 70 mm long. Calculate the magnification of the drawing, to the nearest whole number.", value: drawMag, dp: 0, prefix: "×", wrong: ["0.33"], explanation: "Actual length = 24 × 9.6 = 230.4 µm; 70 mm = 70 000 µm; 70 000 ÷ 230.4 = 303.8, so ×304." }),
      P.manual({
        label: "(f)", marks: 3, stem: "Rudo also observed cheek cells stained with methylene blue. State **three** observable differences between the onion epidermal cells and the cheek cells that she could record in a table.",
        points: ["Onion: cell wall present (thick outline); cheek: no cell wall, only a thin membrane", "Onion: regular, elongated rectangular cells in rows; cheek: irregular, flattened, rounded cells, often separate or overlapping", "Onion: large vacuole with thin peripheral cytoplasm and nucleus at the side; cheek: no large vacuole, nucleus central (or onion much larger than cheek cells)"],
        modelAnswer: "\n\n| Feature | Onion epidermal cell | Cheek cell |\n|---|---|---|\n| Cell wall | Present | Absent |\n| Shape | Regular, elongated, in rows | Irregular, rounded, separate |\n| Vacuole and nucleus | Large vacuole; nucleus at the side | No large vacuole; nucleus central |",
      }),
      P.manual({
        label: "(g)", marks: 2, stem: "Explain why Rudo measured five cells and calculated a mean rather than measuring one cell.",
        points: ["Cells vary in length (19 to 25 divisions)", "A mean of several measurements is more representative / reliable, reducing the effect of one unusual cell"],
        modelAnswer: "The cells vary in length, from 19 to 25 divisions, so a single cell may not be typical; a mean of several cells gives a more representative and reliable estimate of cell length.",
      }),
    ]),
    explanation: "Calibrate first (9.6 µm per division at ×10), multiply the mean divisions by the calibration (211 µm), and use actual size for the drawing's magnification (×304). Drawings show only what is seen, with clear lines, double walls and ruled labels.",
    hints: ["One eyepiece division = (stage divisions × 10 µm) ÷ eyepiece divisions.", "Convert the drawing length to µm before dividing."],
  });
});
