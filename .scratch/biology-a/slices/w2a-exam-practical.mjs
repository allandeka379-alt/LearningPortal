// W2a: PRACTICAL_MICROSCOPY items (ZIMSEC Paper 4 / Cambridge Paper 3 question 2 style), both boards:
// stem TS plan diagram, xerophyte leaf, artery and vein.
import { concept, P, t, chk, EXAM, checkExam, graticuleUnit, magnification, actualSize, mean, sfStr, dpStr } from "../lib.mjs";

const A = (k) => `abio.${k}`;
const micro = (b, o) =>
  b.struct({
    d: o.d ?? 4, examStyle: true, skill: EXAM.PRACTICAL_MICROSCOPY.skill, secs: EXAM.PRACTICAL_MICROSCOPY.secs, paper: "ZIMSEC P4 / Cambridge P3",
    concepts: o.concepts, stem: o.stem,
    parts: checkExam(EXAM.PRACTICAL_MICROSCOPY, o.parts),
    explanation: o.explanation, hints: o.hints, calculator: true,
  });

concept(A("plant-transport.tissues"), { file: "exam/w2a-practical", keyPrefix: "exam.w2a-practical" }, (b) => {
  // ---------------------------------------------------------------- M1: dicotyledonous stem TS
  const epu = graticuleUnit({ stageDivisions: 22, eyepieceDivisions: 40 });
  chk(epu, 5.5);
  const bundle = 34 * epu;
  chk(bundle, 187);
  const mag = magnification(56.1, "mm", bundle, "µm");
  chk(mag, 300);
  micro(b, {
    concepts: [A("plant-transport.tissues"), A("skills.biological-drawing")],
    stem: "A stained transverse section of a young sunflower stem is described. At low power (×40): a single outer layer of small cells covered by a thin cuticle; beneath it a narrow band of thick-cornered cells, then a wider region of large thin-walled cells; a ring of about twenty wedge-shaped vascular bundles; and a large central region of large thin-walled cells. In each bundle, an outer cap of thick-walled fibres lies outside a group of small thin-walled cells, then a narrow band of flattened cells, then a group of large, thick-walled cells with wide lumens towards the centre, stained red.",
    parts: [
      P.manual({
        label: "(a)", marks: 3, stem: "Describe the low-power plan diagram you would draw of a sector of this stem containing two vascular bundles.",
        points: [
          "Outlines of epidermis, cortex (with collenchyma band), vascular bundles and pith shown as regions; no individual cells",
          "Bundles drawn wedge-shaped in correct position and proportion, each divided into fibre cap, phloem, cambium and xylem (xylem towards centre)",
          "Sharp continuous lines, no shading, drawing large; ruled label lines touching the regions",
        ],
        modelAnswer: "A large outline of a sector of the stem showing the epidermis as a thin outer band, the cortex with its outer collenchyma band, two wedge-shaped vascular bundles and part of the pith, all in correct proportions. Each bundle is divided into regions for the fibre cap, phloem, cambium and xylem, with xylem towards the centre. No cells are drawn; lines are sharp and continuous with no shading, and labels use ruled lines.",
      }),
      P.group({
        label: "(b)", stem: "At ×100, 22 divisions of a stage micrometer (each division 10 µm) lined up with 40 eyepiece graticule divisions.",
        parts: [
          P.num({ label: "(i)", marks: 2, stem: "Calculate the length of one eyepiece division in µm.", value: epu, unit: "µm", wrong: [sfStr(40 / 22, 3), 0.55], explanation: t`$22 \times 10 = 220\ \mu\text{m}$; $220 \div 40 = 5.5\ \mu\text{m}$.` }),
          P.num({ label: "(ii)", marks: 1, stem: "One vascular bundle is 34 eyepiece divisions wide. Calculate its actual width in µm.", value: bundle, unit: "µm", wrong: [340], explanation: t`$34 \times 5.5 = 187\ \mu\text{m}$.` }),
        ],
      }),
      P.num({
        label: "(c)", marks: 2, stem: "In a student's plan diagram this bundle is drawn 56.1 mm wide. Calculate the magnification of the drawing.",
        value: mag, prefix: "×", wrong: [sfStr(56.1 / 187, 3), sfStr(187 / 56.1, 3)],
        explanation: t`$56.1\ \text{mm} = 56\,100\ \mu\text{m}$; $56\,100 \div 187 = \times 300$.`,
      }),
      P.short({ label: "(d)", marks: 1, stem: "Name the tissue made of large, thick-walled cells with wide lumens, stained red, towards the centre of each bundle.", accepted: ["xylem", "xylem vessels", "xylem tissue"], wrong: ["phloem"], explanation: "Lignified xylem vessels stain red (e.g. with safranin) and lie towards the centre." }),
      P.mcq({
        label: "(e)", stem: "Which tissue is the narrow band of flattened cells between the two groups in each bundle?",
        options: [["Cambium", "Correct: dividing cells between phloem and xylem."], ["Endodermis", "The endodermis surrounds the stele of a root."], ["Pericycle", "The pericycle is in roots, inside the endodermis."], ["Collenchyma", "Collenchyma is the thick-cornered band beneath the epidermis."]],
        answer: "A", explanation: "The **cambium** lies between phloem (outside) and xylem (inside).",
      }),
      P.manual({
        label: "(f)", marks: 2, stem: "Describe what your high-power drawing of three adjacent xylem vessels would show.",
        points: ["Three rounded / polygonal outlines of correct relative size, walls drawn as thick double lines (lignified), shared where they touch", "Empty lumens (no contents drawn); no shading; ruled labels"],
        modelAnswer: "Three rounded vessels of correct relative size with thick walls drawn as double lines, shared where neighbouring vessels touch, and empty lumens with nothing drawn inside; no shading and ruled labels.",
      }),
      P.manual({
        label: "(g)", marks: 3, stem: "A TS of a sunflower root is also provided. Describe a table showing three observable differences between the stem and root sections.",
        points: [
          "Table with headings: feature, stem, root (each row compares one feature)",
          "Vascular tissue in a ring of separate bundles (stem) / in one central stele (root)",
          "Central pith present (stem) / absent, xylem in centre (root); or xylem and phloem in same bundle (stem) / alternating radii (root); or endodermis not visible (stem) / visible (root)",
        ],
        modelAnswer: "\n\n| Feature | Stem | Root |\n|---|---|---|\n| Arrangement of vascular tissue | Ring of separate bundles | One central stele |\n| Centre of section | Pith of large cells | Xylem |\n| Position of phloem relative to xylem | Outside the xylem in the same bundle | Between the arms of the xylem |",
      }),
    ],
    explanation: "Plan diagrams show regions; calibrate the graticule, then actual size = divisions × value of one division; magnification = drawing ÷ actual.",
    hints: ["One eyepiece division = (stage divisions × 10 µm) ÷ eyepiece divisions.", "Convert the drawing length to µm."],
  });

  // ---------------------------------------------------------------- M2: xerophyte leaf (marram grass)
  const barMag = magnification(15, "mm", 200, "µm");
  chk(barMag, 75);
  const thick = actualSize(27, "mm", barMag, "µm");
  chk(thick, 360);
  const hairs = [36, 39, 37, 41, 37];
  const meanHairs = mean(hairs);
  chk(meanHairs, 38);
  micro(b, {
    concepts: [A("plant-transport.transpiration"), A("skills.biological-drawing")],
    stem: "A photomicrograph shows a transverse section of a rolled marram grass leaf, with a scale bar labelled 200 µm that is 15 mm long. The outer (lower) surface is smooth, with a thick cuticle and no stomata, and a layer of thick-walled fibres beneath it. The inner (upper) surface is folded into deep grooves separated by ridges; the grooves are lined with many hairs, and stomata lie at the bases of the grooves. Each ridge contains a vascular bundle surrounded by mesophyll. At the base of each groove are large, thin-walled cells.",
    parts: [
      P.manual({
        label: "(a)", marks: 3, stem: "Describe the low-power plan diagram you would draw of a part of this leaf showing three ridges.",
        points: [
          "Outline of the rolled leaf section showing the smooth outer surface and the grooved inner surface with ridges, in correct proportion",
          "Regions shown: outer epidermis with cuticle, fibre layer, mesophyll, vascular bundle in each ridge (outlines only, no cells)",
          "Hairs indicated only as a lining region / not as individual cells; sharp lines, no shading; ruled labels",
        ],
        modelAnswer: "A large outline of a part of the rolled leaf, with the smooth outer surface and three ridges separated by deep grooves on the inner surface. Inside it, regions for the outer epidermis and thick cuticle, the fibre layer, the mesophyll and a vascular bundle in each ridge are drawn as outlines in correct proportions, with no cells, no shading and ruled labels.",
      }),
      P.num({
        label: "(b)", marks: 2, stem: "Calculate the magnification of the photomicrograph from the scale bar.",
        value: barMag, prefix: "×", wrong: [sfStr(15 / 200, 3), sfStr(200 / 15, 3)],
        explanation: t`$15\ \text{mm} = 15\,000\ \mu\text{m}$; magnification $= 15\,000 \div 200 = \times 75$.`,
      }),
      P.num({
        label: "(c)", marks: 2, stem: "One ridge is 27 mm high on the photomicrograph. Calculate its actual height in µm.",
        value: thick, unit: "µm", wrong: [0.36, 2025],
        explanation: t`$27\,000 \div 75 = 360\ \mu\text{m}$ (or $27 \div 15 \times 200$).`,
      }),
      P.manual({
        label: "(d)", marks: 3, stem: "Explain how three features visible in this section reduce water loss.",
        points: [
          "Rolled leaf / grooves trap humid air, reducing the water vapour potential gradient",
          "Hairs trap still, moist air near the stomata / sunken stomata at the base of grooves are in humid air",
          "Thick cuticle and no stomata on the outer surface reduce evaporation from the exposed surface",
        ],
        modelAnswer: "Rolling traps humid air inside the leaf, so the water vapour potential gradient is small. The hairs hold still, moist air in the grooves, and the stomata are sunk at the bases of the grooves, where the air is humid. The exposed outer surface has a thick waxy cuticle and no stomata, so little water evaporates from it.",
      }),
      P.num({
        label: "(e)", marks: 1, stem: "Hairs were counted along one groove in five photomicrographs: 36, 39, 37, 41 and 37. Calculate the mean number of hairs per groove.",
        value: meanHairs, wrong: [190], explanation: t`$(36 + 39 + 37 + 41 + 37) \div 5 = 190 \div 5 = 38$.`,
      }),
      P.mcq({
        label: "(f)", stem: "What is the most likely role of the large, thin-walled cells at the base of each groove?",
        options: [["They lose turgor, so the leaf rolls up", "Correct: hinge cells."], ["They carry out most of the photosynthesis", "Photosynthesis is mainly in the mesophyll of the ridges."], ["They transport sucrose to the roots", "Sucrose moves in the phloem of the vascular bundles."], ["They secrete the waxy cuticle", "The cuticle is made by the epidermis on the outer surface."]],
        answer: "A", explanation: "These **hinge cells** lose water and turgor in dry air, so the leaf rolls up.",
      }),
      P.manual({
        label: "(g)", marks: 3, stem: "A TS of a maize leaf (a mesophyte) is also provided. Describe a table showing three observable differences between it and the marram grass leaf.",
        points: [
          "Table with feature, marram grass, maize columns; one feature per row",
          "Leaf rolled (marram) / flat (maize); cuticle thick (marram) / thin (maize)",
          "Stomata sunken in grooves, on inner surface only (marram) / on both surfaces, level with surface (maize); hairs many (marram) / few or none (maize)",
        ],
        modelAnswer: "\n\n| Feature | Marram grass | Maize |\n|---|---|---|\n| Shape of leaf | Rolled, with deep grooves | Flat |\n| Cuticle | Thick on the outer surface | Thin |\n| Stomata | Sunken in grooves on the inner surface only | Level with the surface, on both surfaces |",
      }),
    ],
    explanation: "Scale bar magnification = bar length on image ÷ length it represents; xerophytic features reduce the water vapour potential gradient or the exposed surface.",
    hints: ["Convert the scale bar length to µm."],
  });

  // ---------------------------------------------------------------- M3: artery and vein
  const epu3 = graticuleUnit({ stageDivisions: 12, eyepieceDivisions: 32 });
  chk(epu3, 3.75);
  const low = 4 * epu3; // low-power division (×10 objective) = 4 × high-power division (×40 objective)
  const artWall = 30 * low;
  chk(artWall, 450);
  const veinWall = 9 * low;
  chk(veinWall, 135);
  micro(b, {
    concepts: [A("mammal-transport.circulation-vessels"), A("skills.biological-drawing")],
    stem: "A slide shows transverse sections of an artery and a vein from the same region of a mammal. Vessel X has a thick wall with three layers: a thin, wavy inner layer, a thick middle layer of smooth muscle and elastic fibres, and an outer layer of connective tissue; its lumen is small and round. Vessel Y has a thin wall with the same three layers, the middle one thin; its lumen is large and irregular in outline. Some blood cells are visible in both lumens.",
    parts: [
      P.manual({
        label: "(a)", marks: 3, stem: "Describe the low-power plan diagram you would draw of vessel X.",
        points: [
          "Three concentric layers (tunica intima, media, externa) and the lumen drawn as outlines, no cells",
          "Correct proportions: thick media, thin wavy intima, small round lumen",
          "Sharp continuous lines, no shading; ruled label lines for each layer and the lumen",
        ],
        modelAnswer: "Three concentric rings for the thin, wavy tunica intima, the thick tunica media and the outer tunica externa, around a small round lumen, all in correct proportions, drawn with sharp continuous lines, no cells or shading, and ruled labels.",
      }),
      P.num({
        label: "(b)", marks: 1, stem: "At high power, 12 stage micrometer divisions (each 10 µm) lined up with 32 eyepiece divisions. Calculate the value of one eyepiece division at high power, in µm.",
        value: epu3, unit: "µm", wrong: [sfStr(32 / 12, 3), 0.375], explanation: t`$120 \div 32 = 3.75\ \mu\text{m}$.`,
      }),
      P.group({
        label: "(c)", stem: "The walls were measured at low power, where one eyepiece division is four times the high-power value.",
        parts: [
          P.num({ label: "(i)", marks: 1, stem: "The wall of X is 30 eyepiece divisions thick at low power. Calculate its actual thickness in µm.", value: artWall, unit: "µm", wrong: [112.5], explanation: t`One low-power division $= 4 \times 3.75 = 15\ \mu\text{m}$; $30 \times 15 = 450\ \mu\text{m}$.` }),
          P.num({ label: "(ii)", marks: 1, stem: "The wall of Y is 9 eyepiece divisions thick at low power. Calculate its actual thickness in µm.", value: veinWall, unit: "µm", wrong: [33.75], explanation: t`$9 \times 15 = 135\ \mu\text{m}$.` }),
          P.num({ label: "(iii)", marks: 1, stem: "Calculate how many times thicker the wall of X is than the wall of Y, to two significant figures.", value: artWall / veinWall, sf: 2, wrong: [sfStr(veinWall / artWall, 2)], explanation: t`$450 \div 135 = ${sfStr(artWall / veinWall, 3)} \approx ${sfStr(artWall / veinWall, 2)}$.` }),
        ],
      }),
      P.manual({
        label: "(d)", marks: 3, stem: "Describe a table showing three observable differences between X and Y.",
        points: [
          "Table with feature, X, Y columns",
          "Wall thickness: thick (X) / thin (Y); middle layer thick (X) / thin (Y)",
          "Lumen small and round (X) / large and irregular (Y); inner lining wavy / folded (X) / not folded (Y)",
        ],
        modelAnswer: "\n\n| Feature | X | Y |\n|---|---|---|\n| Thickness of wall | Thick | Thin |\n| Thickness of middle layer | Thick | Thin |\n| Lumen | Small and round | Large and irregular |",
      }),
      P.match({
        label: "(e)", stem: "Match each blood cell seen in the lumens to its description.",
        pairs: [["Red blood cell", "Small disc, pale centre, no nucleus"], ["Neutrophil", "Nucleus with several lobes"], ["Lymphocyte", "Large round nucleus filling most of the cell"]],
        extraRight: ["Kidney-shaped nucleus in the largest cell"],
        explanation: "Red cells lack nuclei; neutrophils have lobed nuclei; lymphocytes have large round nuclei; monocytes (the extra) have kidney-shaped nuclei.",
      }),
      P.manual({
        label: "(f)", marks: 2, stem: "Explain how the structure of the wall of X suits its function.",
        points: ["Thick wall with collagen withstands high blood pressure", "Elastic fibres stretch and recoil to smooth pressure surges / smooth muscle controls blood flow"],
        modelAnswer: "X is an artery: its thick wall, strengthened by collagen, withstands the high pressure of blood from the heart, while elastic fibres stretch and recoil to smooth the surges and smooth muscle controls the flow.",
      }),
    ],
    explanation: "Artery: thick wall, thick media, small round lumen; vein: thin wall, wide lumen. Calibrate the graticule at each magnification.",
    hints: ["Find the value of one eyepiece division before converting measurements."],
  });
});
