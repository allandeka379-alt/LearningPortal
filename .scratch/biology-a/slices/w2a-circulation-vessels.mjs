// W2a: double circulation, blood vessels, blood cells, tissue fluid and lymph.
import { concept, P, t, chk, CAM, table, actualSize, magnification, dpStr, sfStr, rnd } from "../lib.mjs";

concept("abio.mammal-transport.circulation-vessels", { file: "mammal-transport/circulation-vessels", keyPrefix: "mammal-transport.circulation-vessels" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which blood vessel carries deoxygenated blood from the heart to the lungs?",
    options: [
      ["Pulmonary artery", "Correct: it leaves the right ventricle."],
      ["Pulmonary vein", "Pulmonary veins carry oxygenated blood from the lungs to the left atrium."],
      ["Aorta", "The aorta carries oxygenated blood from the left ventricle to the body."],
      ["Vena cava", "The venae cavae bring deoxygenated blood from the body to the right atrium."],
    ],
    answer: "A",
    explanation: "The **pulmonary artery** carries deoxygenated blood from the right ventricle to the lungs.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which feature of capillaries allows rapid exchange of substances with tissues?",
    options: [
      ["A wall only one flattened cell thick", "Correct: a very short diffusion distance."],
      ["A thick layer of smooth muscle around the lumen", "Capillaries have no muscle layer."],
      ["Valves along their length", "Valves are found in veins."],
      ["Many elastic fibres in the wall", "Elastic fibres are in artery walls."],
    ],
    answer: "A",
    explanation: "The capillary wall is a single layer of **endothelium**, giving a short diffusion distance.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is the main role of the elastic fibres in the wall of the aorta?",
    options: [
      ["They stretch at systole and recoil at diastole, smoothing blood flow", "Correct."],
      ["They contract actively, like heart muscle, to pump blood to the body", "Elastic fibres are not contractile; they recoil passively."],
      ["They prevent the backflow of blood into the ventricle", "The semilunar valve does this."],
      ["They allow oxygen to diffuse through the wall", "The aortic wall is thick; exchange happens in capillaries."],
    ],
    answer: "A",
    explanation: "Elastic fibres **stretch and recoil**, evening out pressure surges and keeping blood moving between beats.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "In a stained blood smear, a cell has a nucleus with three lobes joined by thin strands and granular cytoplasm. Which cell is it?",
    options: [
      ["Neutrophil", "Correct: a lobed nucleus is characteristic."],
      ["Lymphocyte", "A lymphocyte has a large round nucleus filling most of the cell."],
      ["Monocyte", "A monocyte has a large kidney-shaped nucleus."],
      ["Red blood cell", "Mature red blood cells have no nucleus."],
    ],
    answer: "A",
    explanation: "A **lobed nucleus** (two to five lobes) identifies a neutrophil.",
    hints: ["Which white cell has a multi-lobed nucleus?"],
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why is pressure in a vein too low to return blood to the heart without help?",
    options: [
      ["Pressure is lost in the narrow arterioles and capillaries", "Correct: the narrow vessels cause the steepest fall."],
      ["Veins actively pump blood away from the heart towards the tissues", "Veins do not pump, and blood in veins flows towards the heart."],
      ["The valves in veins block blood flow", "Valves prevent backflow; they do not cause low pressure."],
      ["Veins have thicker walls than arteries", "Veins have thinner walls."],
    ],
    answer: "A",
    explanation: "Friction in the narrow **arterioles and capillaries** lowers the pressure; skeletal muscle and valves help return blood.",
    hints: ["Where does the steepest pressure fall occur?"],
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING", applies: CAM,
    stem: "Which substance is normally present in plasma but almost absent from tissue fluid?",
    options: [
      ["Albumin", "Correct: they are too large to pass through the capillary wall."],
      ["Urea", "Urea is small and passes freely out into tissue fluid."],
      ["Oxygen", "Oxygen diffuses out readily; tissue fluid is mostly water."],
      ["Glucose", "Glucose and small ions pass freely into tissue fluid."],
    ],
    answer: "A",
    explanation: "Large **plasma proteins** such as albumin stay in the blood, lowering its water potential so some water returns at the venous end.",
    hints: ["What is too large to pass through the capillary wall?"],
  });
  b.mcq({
    d: 4, skill: "ANALYSIS", applies: CAM,
    stem: "A child with a severe protein deficiency has a low plasma protein concentration and swollen tissues. What is the best explanation?",
    options: [
      ["Less water returns to capillaries by osmosis, so tissue fluid accumulates", "Correct: plasma water potential is higher than normal."],
      ["Hydrostatic pressure in the capillaries falls, so more fluid is forced out", "Lower hydrostatic pressure would reduce fluid leaving."],
      ["Lymph vessels carry more fluid back to the tissues", "Lymph returns fluid to the blood, not to tissues."],
      ["Red blood cells leave the capillaries and swell the tissues", "Red cells do not leave capillaries."],
    ],
    answer: "A",
    explanation: "Fewer plasma proteins → plasma water potential less negative → **less water returns** by osmosis at the venous end → oedema.",
    hints: ["Plasma proteins affect the water potential of the blood."],
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Veins contain valves that prevent the backflow of blood.",
    answer: true,
    explanation: "True. Pocket valves close if blood starts to flow backwards.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In a double circulation, blood passes through the heart once in each complete circuit of the body.",
    answer: false,
    explanation: "False. Blood passes through the heart **twice**: once in the pulmonary and once in the systemic circulation.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each blood cell to its distinctive feature.",
    pairs: [
      ["Red blood cell", "Biconcave disc with no nucleus"],
      ["Neutrophil", "Lobed nucleus and granular cytoplasm"],
      ["Monocyte", "Largest white cell; kidney-shaped nucleus"],
      ["Lymphocyte", "Large round nucleus with a thin rim of cytoplasm"],
    ],
    explanation: "Nucleus shape is the key to identifying white cells.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct words.",
    template: "At the arterial end of a capillary, high {{blank:a}} pressure forces fluid out. Excess tissue fluid drains into {{blank:b}} vessels.",
    blanks: [
      { id: "a", accepted: ["hydrostatic"], choices: ["hydrostatic", "osmotic", "atmospheric", "root"] },
      { id: "b", accepted: ["lymph"], choices: ["lymph", "pulmonary", "coronary", "portal"] },
    ],
    explanation: "Hydrostatic pressure forms tissue fluid; excess becomes lymph.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the single layer of flattened cells that lines all blood vessels and forms the whole wall of a capillary.",
    accepted: ["endothelium", "the endothelium", "endothelial cells", "squamous endothelium", "tunica intima"],
    wrong: ["epithelium of the alveolus"],
    explanation: "The **endothelium** lines every vessel.",
  });

  // Micrograph measurements (different numbers from the lesson)
  const lumen = actualSize(31.5, "mm", 45);
  chk(lumen, 700);
  b.num({
    d: 2, skill: "APPLICATION", calculator: true,
    stem: "On a photomicrograph at ×45, the lumen of a vein is 31.5 mm across. Calculate its actual diameter in µm.",
    value: lumen, unit: "µm", wrong: [0.7, 1417.5],
    explanation: t`$31.5\ \text{mm} = 31\,500\ \mu\text{m}$; $31\,500 \div 45 = 700\ \mu\text{m}$. Not converting gives 0.7.`,
  });
  const rbc = 7.5;
  const img = 4.2; // mm on micrograph
  const mag = magnification(img, "mm", rbc, "µm");
  chk(mag, 560);
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "A red blood cell with an actual diameter of 7.5 µm measures 4.2 mm on an electron micrograph. Calculate the magnification of the micrograph.",
    value: mag, prefix: "×", wrong: [sfStr(rbc / 4200, 3), 0.56],
    explanation: t`1. Image size $= 4.2\ \text{mm} = 4200\ \mu\text{m}$.
2. Magnification $= \dfrac{\text{image}}{\text{actual}} = 4200 \div 7.5 = \times 560$.
3. Dividing 4.2 by 7.5 without converting gives 0.56.`,
    hints: ["Convert mm to µm.", "Magnification = image ÷ actual."],
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain how the structure of veins is related to their function.",
    points: [
      "Thin wall / little muscle and elastic tissue, because blood pressure is low",
      "Wide lumen reduces resistance to flow",
      "Valves prevent backflow of blood",
      "Veins lie between skeletal muscles, which squeeze them to push blood towards the heart",
    ],
    modelAnswer: "Blood in veins is at low pressure, so their walls are thin with little muscle or elastic tissue. A wide lumen reduces resistance to flow. Valves close if blood starts to flow backwards, and contracting skeletal muscles squeeze the veins, pushing blood towards the heart.",
    explanation: "Low pressure explains every vein feature.",
    hints: ["Start with the pressure in veins."],
  });
  b.manualShort({
    d: 4, skill: "UNDERSTANDING", marks: 4, applies: CAM,
    stem: "Explain how tissue fluid is formed and how most of it returns to the blood.",
    points: [
      "At the arterial end, hydrostatic pressure is high and forces water and small solutes out through capillary walls",
      "Plasma proteins (and cells) remain in the capillary, giving the blood a lower water potential",
      "At the venous end, hydrostatic pressure is lower, so water returns into the capillary by osmosis",
      "Excess tissue fluid drains into lymph capillaries and returns to the blood as lymph",
    ],
    modelAnswer: "At the arterial end of a capillary the hydrostatic pressure of the blood is high, so water and small solutes are forced out through the capillary wall. Plasma proteins are too large to leave, so the blood keeps a lower water potential than the tissue fluid. At the venous end the hydrostatic pressure has fallen, so water returns by osmosis. The excess fluid drains into lymph capillaries and is returned to the blood as lymph.",
    explanation: "Pressure out, osmosis back, lymph for the excess.",
    hints: ["Two opposing effects: pressure and the plasma proteins."],
  });
  b.manualShort({
    d: 3, skill: "EVALUATION", marks: 3,
    stem: "Suggest why a double circulation is an advantage to a large, active mammal.",
    points: [
      "Blood can be pumped to the body at high pressure after passing through the lungs",
      "So oxygen and glucose are delivered quickly to respiring tissues (high metabolic rate / endothermy)",
      "Lower pressure in the pulmonary circulation avoids damage to lung capillaries / fluid entering the alveoli",
    ],
    modelAnswer: "Blood returns to the heart after the lungs and is pumped out again at high pressure, so oxygenated blood reaches active tissues quickly to support a high metabolic rate. Meanwhile, the pulmonary circulation can run at a lower pressure, which protects the delicate lung capillaries and stops fluid being forced into the alveoli.",
    explanation: "High systemic pressure, low pulmonary pressure.",
    hints: ["Compare pressure needs of lungs and body."],
  });

  // Practice structured: artery and vein from a micrograph
  const aWall = actualSize(5.4, "mm", 30);
  const aLumen = actualSize(13.5, "mm", 30);
  const vWall = actualSize(1.2, "mm", 30);
  const vLumen = actualSize(24.0, "mm", 30);
  const ra = aLumen / aWall;
  const rv = vLumen / vWall;
  chk(aWall, 180);
  chk(vLumen, 800);
  b.struct({
    d: 4, skill: "ANALYSIS",
    stem: `A photomicrograph (×30) shows two vessels, P and Q, from the same TS of a limb.\n\n${table(["Vessel", "Wall thickness on image / mm", "Lumen diameter on image / mm", "Other observations"], [["P", "5.4", "13.5", "Round lumen; folded inner lining; thick middle layer"], ["Q", "1.2", "24.0", "Irregular, flattened outline; thin middle layer"]])}`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "Calculate the actual wall thickness of P, in µm.", value: aWall, unit: "µm", wrong: [0.18], explanation: t`$5400 \div 30 = 180\ \mu\text{m}$.` }),
      P.group({
        label: "(b)", stem: "Ratio of lumen diameter to wall thickness.",
        parts: [
          P.num({ label: "(i)", marks: 1, stem: "Calculate the ratio for P, to two significant figures.", value: ra, sf: 2, wrong: [rnd(aWall / aLumen, 2)], explanation: t`$13.5 \div 5.4 = ${sfStr(ra, 2)}$ (the magnification cancels).` }),
          P.num({ label: "(ii)", marks: 1, stem: "Calculate the ratio for Q.", value: rv, wrong: [0.05], explanation: t`$24.0 \div 1.2 = ${rv}$.` }),
        ],
      }),
      P.short({ label: "(c)", marks: 1, stem: "Identify vessel P.", accepted: ["artery", "an artery", "muscular artery", "a muscular artery"], wrong: ["vein"], explanation: "Thick wall, round lumen and folded endothelium identify an **artery**." }),
      P.manual({
        label: "(d)", marks: 3, stem: "Explain how the structure of P suits its function.",
        points: ["Thick wall with collagen withstands high pressure / does not burst", "Elastic fibres stretch and recoil to smooth pressure surges", "Smooth muscle contracts or relaxes to control blood flow to the organ (muscular artery)"],
        modelAnswer: "P is an artery carrying blood at high pressure. Its thick wall, strengthened by collagen, withstands that pressure; elastic fibres stretch and recoil to smooth the surges; and smooth muscle can contract or relax to control blood flow to the limb.",
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "Describe how a plan diagram of P would show its wall.",
        points: ["Three concentric layers (tunica intima, media, externa) drawn as outlines in correct proportions (media thickest)", "No cells drawn; no shading; labelled with ruled lines; lumen shown"],
        modelAnswer: "Three concentric rings for the intima, media and externa in correct proportions, the media being thickest, with the lumen in the centre; outlines only, no cells or shading, labelled with ruled lines.",
      }),
    ],
    explanation: "Arteries have thick walls and small lumen-to-wall ratios; veins the reverse.",
    hints: ["The magnification cancels in a ratio."],
    calculator: true,
  });
  chk(rv, 20);

  b.struct({
    d: 3, skill: "UNDERSTANDING",
    stem: "The blood flowing from the left ventricle to a leg muscle and back to the heart passes through five types of vessel.",
    parts: [
      P.fib({
        label: "(a)", stem: "Put the vessels in order.",
        template: "Left ventricle → {{blank:a}} → artery → {{blank:b}} → capillary → venule → vein → {{blank:c}} → right atrium",
        blanks: [
          { id: "a", accepted: ["aorta"], choices: ["aorta", "pulmonary artery", "vena cava", "pulmonary vein"] },
          { id: "b", accepted: ["arteriole"], choices: ["arteriole", "venule", "lymph vessel", "capillary"] },
          { id: "c", accepted: ["vena cava"], choices: ["vena cava", "aorta", "pulmonary vein", "pulmonary artery"] },
        ],
        explanation: "Aorta → artery → arteriole → capillary → venule → vein → inferior vena cava.",
      }),
      P.manual({
        label: "(b)", marks: 2, stem: "Explain why the arterioles supplying the leg muscles dilate during exercise.",
        points: ["Smooth muscle in arteriole walls relaxes, widening the lumen", "More blood flows to the muscle capillaries, delivering more oxygen and glucose / removing more CO₂"],
        modelAnswer: "The smooth muscle in the arteriole walls relaxes, widening the lumen, so more blood flows into the muscle capillaries, supplying more oxygen and glucose and removing carbon dioxide faster.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Explain why water is important as the main component of blood.",
        points: ["Solvent: dissolves and transports glucose, ions, urea, hormones, plasma proteins", "High specific heat capacity: carries / distributes heat around the body without large temperature changes"],
        modelAnswer: "Water is a good solvent, so glucose, ions, urea and hormones are carried dissolved in plasma, and its high specific heat capacity lets blood carry heat round the body without large changes in temperature.",
      }),
    ],
    explanation: "Arteries → arterioles → capillaries → venules → veins; water is the solvent and heat carrier.",
    hints: ["Arterioles are the control valves of capillary beds."],
  });

  b.card("DEFINITION", "Define a **double circulation**.", "Blood passes through the heart twice per complete circuit: pulmonary (to lungs) and systemic (to body).");
  b.card("CONCEPT", "Artery wall", "Thick; tunica media with elastic fibres and smooth muscle; collagen outer layer; withstands and smooths high pressure.");
  b.card("CONCEPT", "Vein structure", "Thin wall, wide lumen, valves; blood at low pressure helped by skeletal muscle.");
  b.card("CONCEPT", "Capillary structure", "Wall of endothelium only, lumen about 7-10 µm; short diffusion distance; leaky for tissue fluid.");
  b.card("FACT", "Identifying white blood cells", "Neutrophil: lobed nucleus. Monocyte: kidney-shaped nucleus, largest. Lymphocyte: large round nucleus.");
  b.card("DEFINITION", "Define **tissue fluid**.", "Fluid around cells formed from plasma forced out of capillaries by hydrostatic pressure; lacks cells and most plasma proteins.");
  b.card("CONCEPT", "Return of tissue fluid", "Venous end: lower hydrostatic pressure, plasma proteins lower blood ψ, water returns by osmosis; excess becomes lymph.", undefined, { applies: CAM });
  b.card("FACT", "Which vessel carries oxygenated blood to the heart?", "The pulmonary veins (lungs → left atrium).");
  b.card("FACT", "Main component of blood", "Water (plasma is about 90% water): solvent and carrier of heat.");
});
