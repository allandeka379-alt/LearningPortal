// W1b: active transport, endocytosis and exocytosis.
import { concept, P, t, chk, table, rnd, dpStr, pctChange } from "../lib.mjs";

concept("abio.membranes.active-transport-bulk", { file: "membranes/active-transport-bulk", keyPrefix: "membranes.active-transport-bulk" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "During one cycle of the sodium-potassium pump, which ions are moved and in which direction?",
    options: [
      ["Three Na⁺ out of the cell and two K⁺ into the cell", "Correct: 3 Na⁺ out and 2 K⁺ in for each ATP hydrolysed."],
      ["Two Na⁺ out of the cell and three K⁺ into the cell", "The numbers are reversed: three sodium ions leave and two potassium ions enter."],
      ["Three K⁺ out of the cell and two Na⁺ into the cell", "The directions are reversed: sodium is pumped out and potassium in."],
      ["Three Na⁺ and two K⁺ both out of the cell", "Potassium is pumped into the cell, keeping its concentration high inside."],
    ],
    answer: "A",
    explanation: "Each cycle of the Na⁺/K⁺ pump hydrolyses one ATP and moves **3 Na⁺ out** and **2 K⁺ in**, against their concentration gradients.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "How does ATP enable a carrier protein to move an ion against its concentration gradient?",
    options: [
      ["Hydrolysis of ATP changes the shape of the carrier protein", "Correct: phosphorylation of the carrier changes its conformation so the binding site opens to the other side."],
      ["ATP binds to the ion and makes it diffuse more rapidly", "ATP acts on the carrier protein, not on the ion being moved."],
      ["ATP opens a water-filled pore through the phospholipid bilayer", "Water-filled pores are channel proteins used in facilitated diffusion, a passive process."],
      ["ATP dissolves part of the bilayer so the ion can pass", "ATP does not dissolve membranes; a lipid solvent such as ethanol would."],
    ],
    answer: "A",
    explanation: "ATP is hydrolysed and the carrier is phosphorylated, which **changes its shape** so the bound ion is released on the other side.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which process is used by a macrophage to take in a bacterium?",
    options: [
      ["Phagocytosis", "Correct: endocytosis of a solid particle into a phagocytic vacuole."],
      ["Pinocytosis", "Pinocytosis takes in fluid and dissolved substances in small vesicles, not whole cells."],
      ["Exocytosis", "Exocytosis releases material from a cell; it does not bring it in."],
      ["Facilitated diffusion", "A bacterium is far too large to pass through a membrane protein."],
    ],
    answer: "A",
    explanation: "Phagocytosis is a form of endocytosis in which the membrane surrounds a solid particle, such as a bacterium, forming a phagocytic vacuole that fuses with lysosomes.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which organelle packages proteins into vesicles that are released from the cell by exocytosis?",
    options: [
      ["Golgi body", "Correct: the Golgi body modifies and packages proteins into secretory vesicles."],
      ["Lysosome", "Lysosomes are vesicles of hydrolytic enzymes that act inside the cell."],
      ["Mitochondrion", "Mitochondria supply ATP but do not package proteins."],
      ["Smooth endoplasmic reticulum", "Smooth ER makes lipids and steroids; secreted proteins come from rough ER and are packaged by the Golgi body."],
    ],
    answer: "A",
    explanation: "Proteins made on rough ER are carried in vesicles to the **Golgi body**, which modifies and packages them into secretory vesicles that fuse with the cell surface membrane.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Cyanide inhibits aerobic respiration. When cyanide was added to a solution containing carrot discs, the uptake of nitrate ions almost stopped, but the uptake of oxygen-18-labelled water continued. What does this show?",
    options: [
      ["Nitrate uptake is active, but water uptake is passive", "Correct: only nitrate uptake depends on ATP from respiration."],
      ["Both nitrate and water are taken up by active transport", "Water uptake continued without ATP, so it is passive (osmosis)."],
      ["Cyanide damages the phospholipid bilayer", "If the bilayer were damaged, water movement would also be disrupted and the cells would leak."],
      ["Nitrate ions are taken up by osmosis", "Osmosis refers only to water; nitrate ions use carrier proteins."],
    ],
    answer: "A",
    explanation: "Cyanide stops aerobic respiration, so little ATP is made. Nitrate uptake needs ATP and stops (**active transport**); water continues to enter by osmosis, which is passive.",
    hints: ["What does cyanide prevent the cells from making?"],
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Cells lining the small intestine absorb glucose with sodium ions through a co-transporter protein, even when the glucose concentration inside the cell is higher than in the gut. What directly provides the gradient that drives this?",
    options: [
      ["A low sodium concentration inside the cell, kept low by the Na⁺/K⁺ pump", "Correct: Na⁺ diffuses into the cell down its gradient through the co-transporter, carrying glucose with it."],
      ["A high glucose concentration inside the cell made by respiration", "A high glucose concentration inside would oppose glucose uptake."],
      ["A high potassium concentration in the lumen of the small intestine", "The co-transporter uses the sodium gradient, not potassium."],
      ["Osmosis of water from the lumen into the epithelial cells", "Water follows solutes; it does not drive glucose uptake."],
    ],
    answer: "A",
    explanation: "The Na⁺/K⁺ pump on the blood side keeps Na⁺ low inside the cell. Na⁺ diffuses in from the lumen through the co-transporter, and glucose moves with it against its own gradient: **indirect** active transport.",
    hints: ["Which ion is kept at low concentration inside cells by the pump?"],
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which observation, on its own, provides the strongest evidence that an ion is taken into root cells by active transport rather than by facilitated diffusion?",
    options: [
      ["The ion reaches a higher concentration inside the cells than outside", "Correct: only active transport can move an ion against its gradient; facilitated diffusion stops at equal concentrations."],
      ["The rate of uptake levels off at high external concentrations", "Saturation shows carrier proteins are involved, but carriers are used in both processes."],
      ["Uptake increases as the temperature rises from 10 °C to 25 °C", "Diffusion also speeds up with temperature, so this does not separate the two."],
      ["Only one type of ion is taken up through each protein", "Both channel and carrier proteins are specific, so specificity does not prove active transport."],
    ],
    answer: "A",
    explanation: "Saturation, specificity and temperature effects fit both processes. **Accumulation against a concentration gradient** is only possible with an energy input, so it is the decisive evidence.",
    hints: ["Which observation would be impossible for a passive process?"],
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Exocytosis and endocytosis both require ATP.",
    answer: true,
    explanation: "True. Moving the membrane and vesicles uses the cytoskeleton, which needs ATP.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Active transport can move ions through channel proteins without the help of carrier proteins.",
    answer: false,
    explanation: "False. Active transport uses carrier proteins (pumps) that change shape when ATP is hydrolysed. Channel proteins allow only passive facilitated diffusion.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each example with the transport process it uses.",
    pairs: [
      ["Release of insulin from β cells of the pancreas", "Exocytosis"],
      ["Uptake of droplets of tissue fluid in small vesicles", "Pinocytosis"],
      ["Uptake of potassium ions by root hair cells from dilute soil water", "Active transport"],
      ["Entry of glucose into red blood cells from plasma", "Facilitated diffusion"],
    ],
    explanation: "Hormone secretion is exocytosis; fluid uptake in vesicles is pinocytosis; ion uptake against a gradient is active transport; glucose enters red blood cells down its gradient through carriers (facilitated diffusion).",
  });
  b.fib({
    d: 2,
    stem: "Choose the correct words.",
    template: "In exocytosis, secretory vesicles from the {{blank:a}} move along {{blank:b}} to the cell surface membrane and {{blank:c}} with it, releasing their contents.",
    blanks: [
      { id: "a", accepted: ["Golgi body"], choices: ["Golgi body", "nucleus", "lysosome", "mitochondrion"] },
      { id: "b", accepted: ["microtubules"], choices: ["microtubules", "plasmodesmata", "centromeres"] },
      { id: "c", accepted: ["fuse"], choices: ["fuse", "dissolve", "react"] },
    ],
    explanation: "Golgi vesicles are carried along microtubules and fuse with the cell surface membrane, releasing their contents outside.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the form of endocytosis in which a cell takes in liquid containing dissolved substances.",
    accepted: ["pinocytosis"],
    wrong: ["phagocytosis"],
    explanation: "**Pinocytosis** (\"cell drinking\") takes in fluid in small vesicles; phagocytosis takes in solid particles.",
  });

  // Numerical: pump stoichiometry
  const atp = 240;
  const na = 3 * atp;
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "In a short period, the sodium-potassium pumps in a small area of membrane hydrolyse 240 molecules of ATP. How many sodium ions are pumped out of the cell?",
    value: na,
    wrong: [2 * atp, atp],
    explanation: `Each ATP moves 3 Na⁺ out (and 2 K⁺ in), so ${atp} ATP move 3 × ${atp} = ${na} Na⁺ out. ${2 * atp} would be the number of K⁺ moved in.`,
  });
  chk(na, 720);

  // Numerical: rate of uptake from data
  const tm = [0, 30, 60, 90, 120];
  const up = [0, 18, 35, 51, 66];
  const rate = (up[4] - up[1]) / (tm[4] - tm[1]);
  b.calc({
    d: 3, skill: "ANALYSIS", calculator: true,
    stem: `The table shows the total phosphate taken up by beetroot discs in aerated solution.\n\n${table(["Time / min", ...tm.map(String)], [["Phosphate uptake / arbitrary units", ...up.map(String)]])}\n\nCalculate the mean rate of uptake between 30 and 120 minutes, in arbitrary units per minute. Give your answer to two decimal places.`,
    value: rate, dp: 2, unit: "arbitrary units",
    wrong: [rnd(up[4] / tm[4], 2), rnd((up[4] - up[1]) / tm[4], 2)],
    explanation: t`1. Uptake between 30 and 120 min $= 66 - 18 = 48$ units.
2. Time interval $= 120 - 30 = 90$ min.
3. Mean rate $= 48 \div 90 = ${dpStr(rate, 2)}$ units per minute.
4. Using the whole 120 minutes (66 ÷ 120) answers a different question.`,
    hints: ["Rate = change in uptake ÷ change in time."],
  });

  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 4,
    stem: "Describe how a carrier protein moves a potassium ion into a cell by active transport.",
    points: [
      "The K⁺ binds to a specific binding site on the carrier protein (on the outside)",
      "ATP is hydrolysed to ADP and Pi / the carrier is phosphorylated",
      "The carrier protein changes shape so the binding site faces the inside / cytoplasm",
      "K⁺ is released inside; the carrier returns to its original shape (against the concentration gradient)",
    ],
    modelAnswer: "A potassium ion binds to a specific site on the carrier protein facing the outside of the cell. ATP is hydrolysed to ADP and phosphate, which phosphorylates the carrier and changes its shape so the binding site opens to the cytoplasm. The ion is released inside, against its concentration gradient, and the carrier returns to its original shape when the phosphate is removed.",
    explanation: "Binding, ATP hydrolysis, shape change, release.",
    hints: ["Four steps: bind, ATP, shape change, release."],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Describe how a neutrophil destroys a bacterium by phagocytosis.",
    points: [
      "The cell surface membrane extends / folds around the bacterium (after recognising it)",
      "The membrane fuses to enclose the bacterium in a phagocytic vacuole (vesicle)",
      "Lysosomes fuse with the vacuole and release hydrolytic enzymes that digest the bacterium",
    ],
    modelAnswer: "The neutrophil's membrane flows around the bacterium and fuses, enclosing it in a phagocytic vacuole. Lysosomes then fuse with the vacuole and release hydrolytic enzymes, which digest the bacterium.",
    explanation: "Engulf, enclose, digest by lysosomal enzymes.",
    hints: ["Which organelle supplies digestive enzymes inside the cell?"],
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 3,
    stem: "Waterlogged soil contains very little oxygen. Suggest why maize plants growing in waterlogged fields may show signs of mineral deficiency even when the soil contains enough minerals.",
    points: [
      "Root cells cannot carry out (enough) aerobic respiration without oxygen",
      "Little ATP is produced",
      "Active transport / active uptake of mineral ions (such as nitrate, potassium) by root hair cells is reduced, so ions are not taken up against the gradient",
    ],
    modelAnswer: "Without oxygen, root cells cannot respire aerobically, so they make little ATP. Mineral ions such as nitrate and potassium are taken up from dilute soil water by active transport, which needs ATP, so uptake falls and the plant shows deficiency symptoms.",
    explanation: "Oxygen → aerobic respiration → ATP → active uptake of ions.",
    hints: ["Mineral ions are usually more concentrated inside root cells than in soil water."],
  });

  // Practice structured: K+ uptake at different temperatures (original data)
  const temps = [5, 15, 25, 35, 45];
  const kUp = [4, 11, 23, 30, 6];
  const pc2535 = pctChange(kUp[2], kUp[3]);
  b.struct({
    d: 4, skill: "ANALYSIS",
    stem: `Chipo measured the uptake of potassium ions by barley roots in aerated solutions over 1 hour at different temperatures.\n\n${table(["Temperature / °C", ...temps.map(String)], [["K⁺ uptake / µmol per g of root", ...kUp.map(String)]])}`,
    parts: [
      P.num({
        label: "(a)", marks: 2, stem: "Calculate the percentage increase in uptake between 25 °C and 35 °C. Give your answer to the nearest whole number.",
        value: pc2535, dp: 0, unit: "%", wrong: [Math.round(pctChange(kUp[3], kUp[2]))],
        explanation: t`$\dfrac{30 - 23}{23} \times 100 = ${Math.round(pc2535)}\%$.`,
      }),
      P.manual({
        label: "(b)", marks: 3, stem: "Explain the increase in uptake between 5 °C and 35 °C.",
        points: [
          "Higher temperature increases the rate of respiration (enzymes have more kinetic energy)",
          "More ATP is available for active transport",
          "Carrier proteins / molecules move faster, so more ions are moved per minute",
        ],
        modelAnswer: "As temperature rises, the enzymes of respiration work faster because molecules have more kinetic energy, so more ATP is made. More ATP is available to the carrier proteins, which also change shape faster, so uptake by active transport increases.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Explain the sharp fall in uptake at 45 °C.",
        points: ["Carrier proteins / respiratory enzymes are denatured (tertiary structure / binding site altered)", "So less ATP is made and fewer carriers can bind and move ions"],
        modelAnswer: "At 45 °C the carrier proteins and respiratory enzymes start to denature, so their shapes change. Less ATP is made and fewer carriers can bind potassium ions, so uptake falls sharply.",
      }),
      P.mcq({
        label: "(d)", stem: "Chipo repeated the experiment at 25 °C with nitrogen bubbled through the solution instead of air. Which result is most likely?",
        options: [
          ["Uptake much lower than 23 µmol per g", "Correct: without oxygen there is little ATP for active transport."],
          ["Uptake about 23 µmol per g, unchanged", "Nitrogen removes oxygen, which affects aerobic respiration and ATP supply."],
          ["Uptake much higher than 23 µmol per g", "Nothing in the change would increase ATP supply."],
          ["Uptake about 30 µmol per g, as at 35 °C", "The temperature was 25 °C; removing oxygen lowers uptake."],
        ],
        answer: "A",
        explanation: "Without oxygen, aerobic respiration stops, so little ATP is available and active uptake falls.",
      }),
    ],
    explanation: "Uptake rises with temperature (more respiration and ATP) to an optimum, then falls as proteins denature; removing oxygen reduces it.",
    hints: ["Link temperature to the rate of respiration and to the state of proteins."],
    calculator: true,
  });

  b.struct({
    d: 4, skill: "UNDERSTANDING",
    stem: "A pancreatic acinar cell makes and secretes the enzyme amylase.",
    parts: [
      P.short({
        label: "(a)", marks: 1, stem: "Name the process by which amylase leaves the cell.",
        accepted: ["exocytosis"],
        wrong: ["endocytosis", "active transport"],
        explanation: "Amylase is released by exocytosis.",
      }),
      P.manual({
        label: "(b)", marks: 3, stem: "Describe the pathway of amylase from its site of synthesis to its release from the cell.",
        points: [
          "Made on ribosomes of the rough endoplasmic reticulum (and enters the RER)",
          "Carried in vesicles to the Golgi body, where it is modified and packaged into secretory vesicles",
          "Vesicles move to and fuse with the cell surface membrane, releasing amylase",
        ],
        modelAnswer: "Amylase is made on ribosomes on the rough endoplasmic reticulum and passes into the RER. It is carried in vesicles to the Golgi body, which modifies it and packages it into secretory vesicles. These move along microtubules to the cell surface membrane, fuse with it and release the enzyme.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Explain why amylase cannot leave the cell through a carrier protein.",
        points: ["Amylase is a large (protein) molecule", "Too large to fit a carrier protein binding site / carriers move only small specific ions or molecules"],
        modelAnswer: "Amylase is a large protein, far too large to bind and pass through a carrier protein, which carries only small, specific ions or molecules.",
      }),
    ],
    explanation: "Secreted proteins travel RER → Golgi → secretory vesicle → exocytosis, because they are too large for membrane proteins.",
    hints: ["Proteins for secretion are made on which kind of ER?"],
  });

  b.card("DEFINITION", "Define **active transport**.", "Movement of ions or molecules against their concentration gradient through specific carrier proteins, using ATP.");
  b.card("FACT", "Sodium-potassium pump: what moves per ATP?", "3 Na⁺ out and 2 K⁺ in, both against their gradients.");
  b.card("CONCEPT", "How does ATP drive a carrier protein?", "ATP hydrolysis phosphorylates the carrier, changing its shape so the binding site opens to the other side.");
  b.card("DEFINITION", "**Endocytosis** versus **exocytosis**", "Endocytosis: membrane folds in to form a vesicle (into the cell). Exocytosis: vesicle fuses with the membrane (out of the cell).");
  b.card("DEFINITION", "**Phagocytosis** versus **pinocytosis**", "Phagocytosis: endocytosis of solid particles (bacteria). Pinocytosis: endocytosis of fluid in small vesicles.");
  b.card("CONCEPT", "Evidence that ion uptake is active", "Accumulation against the gradient; stopped by cyanide or lack of oxygen; falls sharply at high temperature.");
  b.card("CONCEPT", "What is **co-transport** in the small intestine?", "Na⁺ diffuses into the cell down its gradient (kept by the Na⁺/K⁺ pump) through a protein that carries glucose with it.");
  b.card("FACT", "Which processes need ATP?", "Active transport, endocytosis and exocytosis; diffusion, facilitated diffusion and osmosis are passive.");
  b.card("FACT", "Give three examples of exocytosis.", "Digestive enzymes from pancreatic cells, insulin from β cells, neurotransmitter from presynaptic neurones.");
});
