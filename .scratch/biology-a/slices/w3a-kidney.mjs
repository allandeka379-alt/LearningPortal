// W3a: the kidney, urine formation and osmoregulation (Cambridge only).
import { concept, P, t, chk, sfStr, dpStr, table } from "../lib.mjs";

concept("abio.homeostasis.kidney", { file: "homeostasis/kidney", keyPrefix: "homeostasis.kidney" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "In which region of the kidney are the glomeruli found?",
    options: [
      ["Cortex", "Correct: glomeruli and convoluted tubules are in the cortex."],
      ["Medulla", "The medulla contains loops of Henle and collecting ducts."],
      ["Renal pelvis", "The pelvis collects urine."],
      ["Ureter", "The ureter carries urine to the bladder."],
    ],
    answer: "A",
    explanation: "Glomeruli are in the **cortex**.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What causes the high hydrostatic pressure of blood in the glomerulus?",
    options: [
      ["The efferent arteriole is narrower than the afferent arteriole", "Correct: blood leaves more slowly than it arrives."],
      ["The afferent arteriole is narrower than the efferent arteriole", "This would lower the pressure."],
      ["The podocytes pump blood into the capsule", "Podocytes are not pumps."],
      ["Blood in the glomerulus has a higher water potential", "Water potential is not the cause of the pressure."],
    ],
    answer: "A",
    explanation: "A narrower **efferent** arteriole raises pressure.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which layer acts as the main filter that keeps large proteins in the blood during ultrafiltration?",
    options: [
      ["Basement membrane", "Correct: its mesh holds back large proteins."],
      ["Capillary endothelium", "Its pores are relatively large; they hold back cells."],
      ["Podocytes", "Their slits let filtrate into the capsule."],
      ["Wall of the proximal convoluted tubule", "Filtration happens before the PCT."],
    ],
    answer: "A",
    explanation: "The **basement membrane** is the main filter.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which feature of proximal convoluted tubule cells increases the surface area for reabsorption?",
    options: [
      ["Microvilli", "Correct: on the luminal surface."],
      ["Many mitochondria", "These supply ATP rather than area."],
      ["Tight junctions", "These stop leakage between cells."],
      ["A basement membrane", "This supports the cells."],
    ],
    answer: "A",
    explanation: "**Microvilli** increase the surface area.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "How is glucose taken up from the filtrate into the cells of the proximal convoluted tubule?",
    options: [
      ["By cotransport with sodium ions through carrier proteins", "Correct: Na⁺ diffuses in down its gradient, carrying glucose."],
      ["By simple diffusion through the phospholipid bilayer", "Glucose is too large and polar."],
      ["By osmosis with water", "Osmosis moves water, not glucose."],
      ["By endocytosis of vesicles of filtrate", "This is not the mechanism for glucose."],
    ],
    answer: "A",
    explanation: "**Cotransport with Na⁺**, maintained by Na⁺/K⁺ pumps in the basal membrane.",
    hints: ["Which ion is kept at a low concentration inside the cell?"],
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Where is ADH released into the blood?",
    options: [
      ["Posterior pituitary gland", "Correct: it is made in the hypothalamus and stored here."],
      ["Anterior pituitary gland", "The anterior pituitary releases other hormones."],
      ["Hypothalamus directly into the blood", "The hypothalamus makes ADH but the posterior pituitary releases it."],
      ["Collecting duct cells", "These are the target cells."],
    ],
    answer: "A",
    explanation: "ADH is released from the **posterior pituitary**.",
    hints: ["Made in one place, released from another."],
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Which change follows a rise in ADH concentration in the blood?",
    options: [
      ["More aquaporins in collecting duct membranes and a smaller volume of urine", "Correct: more water reabsorbed."],
      ["Fewer aquaporins in collecting duct membranes and more dilute urine", "This follows a fall in ADH."],
      ["More glucose reabsorbed in the proximal tubule", "ADH acts on the collecting duct, not on glucose transport."],
      ["Higher filtration pressure in the glomerulus", "ADH does not act on filtration pressure."],
    ],
    answer: "A",
    explanation: "ADH → **aquaporins** → more water reabsorbed → less, concentrated urine.",
    hints: ["What does antidiuretic mean?"],
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Glucose is found in the urine of a person with untreated diabetes. Which is the best explanation?",
    options: [
      ["The cotransporters for glucose become saturated", "Correct: the carriers become saturated."],
      ["Glucose is not filtered in healthy people", "Glucose is filtered in everyone."],
      ["The basement membrane is damaged and lets glucose through", "Glucose passes the basement membrane normally."],
      ["ADH stops glucose reabsorption in the collecting duct", "ADH does not affect glucose."],
    ],
    answer: "A",
    explanation: "Too much glucose **saturates** the cotransporters in the PCT.",
    hints: ["The number of carrier proteins is limited."],
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "ADH is made in the hypothalamus.",
    answer: true,
    explanation: "True. It is made in the hypothalamus and released from the posterior pituitary.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Red blood cells pass into the glomerular filtrate.",
    answer: false,
    explanation: "False. Blood cells are far too large to pass the endothelium and basement membrane.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each part of the nephron to its main function.",
    pairs: [
      ["Glomerulus and Bowman's capsule", "Ultrafiltration"],
      ["Proximal convoluted tubule", "Reabsorption of glucose and amino acids"],
      ["Loop of Henle", "Creating a low water potential in the medulla"],
      ["Collecting duct", "Water reabsorption controlled by ADH"],
    ],
    explanation: "Filtration → reabsorption → gradient → osmoregulation.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "Osmoreceptors in the {{blank:a}} detect a fall in blood water potential. More ADH is released, and vesicles containing {{blank:b}} fuse with the membrane of the {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["hypothalamus"], choices: ["hypothalamus", "medulla", "pancreas"] },
      { id: "b", accepted: ["aquaporins"], choices: ["aquaporins", "glucose carriers", "sodium pumps"] },
      { id: "c", accepted: ["collecting duct"], choices: ["collecting duct", "glomerulus", "Bowman's capsule"] },
    ],
    explanation: "Hypothalamus → ADH → aquaporins in the collecting duct.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the cells of the Bowman's capsule that have foot-like processes with filtration slits between them.",
    accepted: ["podocytes", "podocyte"],
    wrong: ["endothelial cells"],
    explanation: "**Podocytes.**",
  });

  const gfr = 125, urine = 1.5;
  const reab = ((gfr - urine) / gfr) * 100;
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "A person forms 125 cm³ of glomerular filtrate and 1.5 cm³ of urine per minute. Calculate the percentage of the filtrate that is reabsorbed, to three significant figures.",
    value: reab, sf: 3, unit: "%", wrong: [sfStr((urine / gfr) * 100, 3)],
    explanation: t`1. Reabsorbed $= 125 - 1.5 = 123.5$ cm³ min⁻¹.
2. Percentage $= \dfrac{123.5}{125} \times 100 = ${sfStr(reab, 3)}\%$.
3. ${sfStr((urine / gfr) * 100, 3)}% is the percentage leaving as urine.`,
    hints: ["Reabsorbed = filtrate − urine."],
  });
  const ureaF = 0.03, ureaU = 1.8;
  const factor = ureaU / ureaF;
  chk(factor, 60);
  b.num({
    d: 2, skill: "APPLICATION", calculator: true,
    stem: "The urea concentration is 0.03 g per 100 cm³ in the glomerular filtrate and 1.8 g per 100 cm³ in the urine. By how many times has urea been concentrated?",
    value: factor, wrong: [sfStr(ureaF / ureaU, 3)],
    explanation: t`$1.8 \div 0.03 = ${factor}$. Water has been reabsorbed while most urea remains.`,
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe how ultrafiltration takes place in the glomerulus.",
    points: [
      "Afferent arteriole wider than efferent, so high hydrostatic pressure in glomerular capillaries",
      "Fluid forced out through pores / fenestrations in capillary endothelium",
      "Basement membrane acts as a filter, retaining large proteins (and cells)",
      "Filtrate passes between podocytes (filtration slits) into the Bowman's capsule; contains water, glucose, urea, ions, amino acids",
    ],
    modelAnswer: "The afferent arteriole is wider than the efferent arteriole, so the blood in the glomerulus is at high hydrostatic pressure. This forces plasma out through the pores in the capillary endothelium and through the basement membrane, which holds back large proteins and blood cells. The filtrate passes through the slits between the podocytes into the Bowman's capsule. It contains water, glucose, amino acids, urea and ions.",
    explanation: "Pressure plus a three-layer filter.",
    hints: ["Start with why the pressure is high."],
  });
  b.manualShort({
    d: 4, skill: "UNDERSTANDING", marks: 5,
    stem: "Explain how glucose is reabsorbed in the proximal convoluted tubule, and how the cells are adapted for this.",
    points: [
      "Na⁺/K⁺ pumps in basal membrane actively transport Na⁺ out of PCT cells into the tissue fluid / blood, using ATP",
      "Low Na⁺ concentration inside the cell, so Na⁺ diffuses in from the filtrate through cotransporter proteins",
      "Each cotransporter carries glucose with Na⁺ (against the glucose gradient)",
      "Glucose leaves the cell by facilitated diffusion into the tissue fluid and blood",
      "Adaptations: microvilli (surface area), many mitochondria (ATP), many carrier proteins / close to capillaries",
    ],
    modelAnswer: "Sodium-potassium pumps in the basal membrane use ATP to actively transport sodium ions out of the PCT cell into the tissue fluid, keeping the sodium concentration in the cell low. Sodium ions then diffuse into the cell from the filtrate through cotransporter proteins, each carrying a glucose molecule with it, even against the glucose concentration gradient. Glucose then leaves the cell by facilitated diffusion into the tissue fluid and the blood. The cells have microvilli for a large surface area, many mitochondria to supply ATP and many carrier proteins, and lie close to blood capillaries.",
    explanation: "Indirect active transport driven by the Na⁺ gradient.",
    hints: ["Which step uses ATP directly?"],
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 3,
    stem: "Suggest why desert mammals have relatively longer loops of Henle than mammals living near water.",
    points: [
      "Longer loop builds a steeper gradient / lower water potential in the medulla",
      "More water can be reabsorbed by osmosis from the collecting duct",
      "So very concentrated urine is produced, conserving water",
    ],
    modelAnswer: "A longer loop of Henle can build up a steeper gradient, giving a lower water potential in the medulla. More water can then leave the collecting duct by osmosis, so the animal produces very concentrated urine and conserves water.",
    explanation: "Loop length → medullary gradient → urine concentration.",
    hints: ["What does the loop of Henle create in the medulla?"],
  });

  const rows = [["Protein", "7.50", "0", "0"], ["Glucose", "0.09", "0.09", "0"], ["Urea", "0.04", "0.04", "2.20"]];
  const uf = 2.2 / 0.04;
  b.struct({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: `The table shows illustrative concentrations of three substances in a healthy person.\n\n${table(["Substance", "Blood plasma / g per 100 cm³", "Filtrate in Bowman's capsule / g per 100 cm³", "Urine / g per 100 cm³"], rows)}`,
    parts: [
      P.manual({
        label: "(a)", marks: 2, stem: "Explain why protein is present in the plasma but not in the filtrate.",
        points: ["Protein molecules are too large", "Cannot pass through the basement membrane (filter)"],
        modelAnswer: "Plasma protein molecules are too large to pass through the basement membrane during ultrafiltration, so they stay in the blood.",
      }),
      P.manual({
        label: "(b)", marks: 2, stem: "Explain why glucose is present in the filtrate but not in the urine.",
        points: ["Glucose is small enough to be filtered", "All is reabsorbed in the PCT (by cotransport with Na⁺)"],
        modelAnswer: "Glucose molecules are small enough to be filtered, but all of the glucose is reabsorbed by cotransport in the proximal convoluted tubule.",
      }),
      P.num({
        label: "(c)", marks: 1, stem: "Calculate how many times more concentrated urea is in the urine than in the filtrate, to three significant figures.",
        value: uf, sf: 3, wrong: [sfStr(0.04 / 2.2, 3)],
        explanation: t`$2.20 \div 0.04 = ${sfStr(uf, 3)}$.`,
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Explain why urea becomes more concentrated along the nephron.",
        points: ["Most of the water is reabsorbed (PCT, collecting duct)", "Much less of the urea is reabsorbed, so the same mass is in a smaller volume"],
        modelAnswer: "About 99% of the water is reabsorbed along the nephron, but much less urea is reabsorbed, so the urea remaining is dissolved in a much smaller volume.",
      }),
      P.mcq({
        label: "(e)", stem: "In which part of the nephron is the water content of the urine finally adjusted to the body's needs?",
        options: [["Collecting duct", "Correct: under the control of ADH."], ["Bowman's capsule", "This is where filtrate forms."], ["Proximal convoluted tubule", "Water reabsorption here is not regulated by ADH."], ["Glomerulus", "This is the site of filtration."]],
        answer: "A", explanation: "ADH acts on the **collecting duct**.",
      }),
    ],
    explanation: "Filtration removes small molecules; reabsorption returns useful ones and water.",
    hints: ["Compare plasma with filtrate, then filtrate with urine."],
  });

  b.struct({
    d: 4, skill: "APPLICATION",
    stem: "Thandeka worked for several hours in a hot field without drinking. Her blood water potential fell.",
    parts: [
      P.manual({
        label: "(a)", marks: 2, stem: "Describe how the fall in water potential is detected and how the endocrine system responds.",
        points: ["Osmoreceptors in the hypothalamus lose water by osmosis / shrink", "Impulses to the posterior pituitary, which releases more ADH into the blood"],
        modelAnswer: "Osmoreceptors in the hypothalamus lose water by osmosis and shrink, sending nerve impulses to the posterior pituitary gland, which releases more ADH into the blood.",
      }),
      P.manual({
        label: "(b)", marks: 3, stem: "Explain how ADH reduces the loss of water in urine.",
        points: ["ADH binds to receptors on collecting duct cells (second messenger cAMP)", "Vesicles with aquaporins fuse with the luminal membrane, so the duct becomes more permeable to water", "More water moves by osmosis into the medulla (low water potential) and blood; small volume of concentrated urine"],
        modelAnswer: "ADH binds to receptors on collecting duct cells and, through cyclic AMP, causes vesicles containing aquaporins to fuse with the membrane facing the lumen. The duct becomes more permeable to water, so more water passes by osmosis into the low water potential tissue of the medulla and back into the blood, leaving a small volume of concentrated urine.",
      }),
      P.short({ label: "(c)", marks: 1, stem: "Name the type of control in which the response reduces the original stimulus.", accepted: ["negative feedback"], rejected: ["positive feedback"], wrong: ["positive feedback"], explanation: "**Negative feedback.**" }),
    ],
    explanation: "Osmoreceptors → ADH → aquaporins → water reabsorbed.",
    hints: ["Name the receptor, the gland and the target."],
  });

  b.card("DEFINITION", "Define **ultrafiltration**.", "High-pressure filtration in the glomerulus forcing water and small solutes into the Bowman's capsule, keeping cells and large proteins in the blood.");
  b.card("FACT", "Three layers of the filtration barrier", "Capillary endothelium (pores), basement membrane (main filter), podocytes (filtration slits).");
  b.card("CONCEPT", "Glucose reabsorption in the PCT", "Na⁺/K⁺ pump in basal membrane → low Na⁺ in cell → Na⁺ and glucose cotransported in → glucose diffuses out to blood.");
  b.card("FACT", "Adaptations of PCT cells", "Microvilli, many mitochondria, many cotransporters, tight junctions, close to capillaries.");
  b.card("CONCEPT", "Role of the loop of Henle", "Countercurrent multiplier: creates a low water potential in the medulla so water can leave the collecting duct.");
  b.card("CONCEPT", "ADH negative feedback", "Low blood ψ → osmoreceptors (hypothalamus) → ADH from posterior pituitary → aquaporins in collecting duct → more water reabsorbed.");
  b.card("FACT", "Where is ADH made and released?", "Made in the hypothalamus; released from the posterior pituitary.");
  b.card("FACT", "Nephron sequence", "Glomerulus → Bowman's capsule → PCT → loop of Henle → DCT → collecting duct.");
});
