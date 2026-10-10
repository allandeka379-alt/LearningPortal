// W1b: diffusion, facilitated diffusion and osmosis.
import { concept, P, t, pctChange, zeroCrossing, rnd, dpStr, chk, table } from "../lib.mjs";

concept("abio.membranes.diffusion-osmosis", { file: "membranes/diffusion-osmosis", keyPrefix: "membranes.diffusion-osmosis" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the water potential of pure water at atmospheric pressure?",
    options: [
      ["0 kPa", "Correct: pure water is the reference point and has the highest possible water potential."],
      ["100 kPa", "Water potential is not set at atmospheric pressure in kPa; pure water is defined as zero."],
      ["−100 kPa", "Negative values belong to solutions; pure water has none of the solute that lowers water potential."],
      ["1 kPa", "Pure water is the reference value, 0 kPa; positive values are not reached by unpressurised solutions."],
    ],
    answer: "A",
    explanation: "Pure water has $\\psi = 0$ kPa. Dissolving any solute lowers the water potential, so solutions have negative values.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Cell X has a water potential of −450 kPa and the adjacent cell Y has a water potential of −700 kPa. Which statement is correct?",
    options: [
      ["Water moves by osmosis from cell X to cell Y", "Correct: −450 kPa is higher (less negative) than −700 kPa, so water moves from X to Y."],
      ["Water moves by osmosis from cell Y to cell X", "This is from lower to higher water potential, the wrong direction."],
      ["Solutes move by osmosis from cell Y to cell X", "Osmosis is the movement of water, not solute."],
      ["There is no net movement because both values are negative", "Both values are negative but they differ, so there is a gradient."],
    ],
    answer: "A",
    explanation: "Water moves down the water potential gradient, from higher (less negative, −450 kPa) to lower (more negative, −700 kPa).",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Red blood cells are placed in a solution with a much higher water potential than their cytoplasm. What happens to them?",
    options: [
      ["They take in water by osmosis, swell and burst", "Correct: with no cell wall, the cells undergo lysis (haemolysis)."],
      ["They lose water by osmosis and become crenated", "Crenation happens in a solution with a lower water potential than the cells."],
      ["They take in water and become turgid without bursting", "Turgidity needs a cell wall to resist expansion; red blood cells have none."],
      ["They lose water and become plasmolysed", "Plasmolysis is the pulling away of a protoplast from a cell wall; it applies to plant cells."],
    ],
    answer: "A",
    explanation: "Water enters down the water potential gradient. An animal cell has no wall to resist expansion, so the membrane breaks: **lysis**.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is the main difference between facilitated diffusion and simple diffusion across a cell surface membrane?",
    options: [
      ["Facilitated diffusion needs specific channel or carrier proteins", "Correct: ions and polar molecules diffuse through specific proteins; both processes are passive."],
      ["Facilitated diffusion uses ATP from respiration", "Facilitated diffusion is passive; ATP use would make it active transport."],
      ["Facilitated diffusion moves substances against the gradient", "Both kinds of diffusion only move substances down their gradient."],
      ["Facilitated diffusion only moves non-polar molecules", "Non-polar molecules cross the bilayer by simple diffusion; proteins are needed for polar ones."],
    ],
    answer: "A",
    explanation: "Both are passive and down the gradient. Facilitated diffusion depends on **specific membrane proteins**, so it can carry ions and polar molecules and it can be saturated.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "The rate at which glucose entered red blood cells was measured at increasing external glucose concentrations. The rate rose and then levelled off. What is the best explanation for the levelling off?",
    options: [
      ["All the carrier proteins for glucose were working at their maximum rate", "Correct: facilitated diffusion is limited by the number of carrier proteins."],
      ["The cells had run out of ATP to pump glucose in", "Glucose enters red blood cells by facilitated diffusion, which does not use ATP."],
      ["The concentration gradient became shallower as the external concentration rose", "Raising the external concentration makes the gradient steeper, not shallower."],
      ["Glucose molecules became too large to pass through the bilayer", "The size of glucose does not change with concentration."],
    ],
    answer: "A",
    explanation: "Facilitated diffusion is limited by the number of **carrier proteins**. Once they are all occupied, a steeper gradient cannot increase the rate further, so the curve plateaus. Simple diffusion would keep rising.",
    hints: ["Which process does glucose use to enter red blood cells?", "What is present in limited numbers in the membrane?"],
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Onion epidermis cells were mounted in a sucrose solution and viewed with a light microscope. The protoplasts had shrunk and pulled away from the cell walls. What filled the space between the cell wall and the cell surface membrane?",
    options: [
      ["The sucrose solution", "Correct: the cellulose wall is fully permeable, so the external solution fills the gap."],
      ["Air", "The cells are mounted in liquid; the gap fills with the solution that passes through the wall."],
      ["Cell sap from the vacuole", "Sap is inside the tonoplast; the vacuole has shrunk inside the protoplast."],
      ["Pure water that left the cell", "Water that leaves mixes with the solution; the gap contains the sucrose solution."],
    ],
    answer: "A",
    explanation: "The cell wall is **fully permeable**, so when the protoplast shrinks (plasmolysis) the external sucrose solution flows into the space.",
    hints: ["Is the cellulose cell wall partially or fully permeable?"],
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which change would increase the rate of diffusion of oxygen across a gas exchange surface?",
    options: [
      ["Reducing the thickness of the exchange surface", "Correct: a shorter diffusion distance increases the rate."],
      ["Reducing the surface area of the exchange surface", "A smaller area lets fewer molecules cross at once, so the rate falls."],
      ["Reducing the concentration difference across the surface", "A shallower gradient lowers the net rate."],
      ["Reducing the temperature of the exchange surface", "Lower temperature means less kinetic energy and slower diffusion."],
    ],
    answer: "A",
    explanation: "Rate ∝ (surface area × concentration difference) ÷ thickness (Fick's law). A thinner surface shortens the diffusion distance.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Potato cylinders gained mass in a solution of −300 kPa and lost mass in a solution of −900 kPa. In a third solution they neither gained nor lost mass. Which water potential is possible for this third solution?",
    options: [
      ["−600 kPa", "Correct: the tissue's water potential must lie between −300 and −900 kPa, and so must the solution that causes no change."],
      ["−200 kPa", "In −200 kPa (higher than −300 kPa) the tissue would gain even more mass."],
      ["−1100 kPa", "In −1100 kPa (lower than −900 kPa) the tissue would lose mass."],
      ["0 kPa", "Pure water has the highest water potential; the tissue would gain mass."],
    ],
    answer: "A",
    explanation: "No change in mass means the solution's water potential equals the tissue's. Gain at −300 kPa means the tissue is below −300 kPa; loss at −900 kPa means it is above −900 kPa. Only −600 kPa lies in that range.",
    hints: ["Gaining mass means water moved in: was the solution's ψ higher or lower than the tissue's?"],
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A solution of −1200 kPa has a higher water potential than a solution of −800 kPa.",
    answer: false,
    explanation: "False. −800 kPa is closer to zero, so it is the higher water potential. The −1200 kPa solution is more concentrated.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Facilitated diffusion only moves substances down their concentration gradient.",
    answer: true,
    explanation: "True. It is a passive process; proteins provide a route, but the energy comes from the random motion of the particles.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each observation with the term that describes it.",
    pairs: [
      ["A red blood cell bursts in distilled water", "Lysis"],
      ["A red blood cell shrinks with a scalloped edge in salt solution", "Crenation"],
      ["A plant cell's protoplast pulls away from its wall", "Plasmolysis"],
      ["A plant cell's protoplast presses firmly against its wall", "Turgid"],
    ],
    explanation: "Animal cells lyse (gain water) or crenate (lose water). Plant cells become turgid (gain water) or plasmolysed (lose water, protoplast leaves the wall).",
  });
  b.fib({
    d: 2,
    stem: "Choose the correct words.",
    template: "Water moves by osmosis from a region of {{blank:a}} water potential to a region of {{blank:b}} water potential through a {{blank:c}} membrane.",
    blanks: [
      { id: "a", accepted: ["higher"], choices: ["higher", "lower"] },
      { id: "b", accepted: ["lower"], choices: ["higher", "lower"] },
      { id: "c", accepted: ["partially permeable"], choices: ["partially permeable", "fully permeable", "impermeable"] },
    ],
    explanation: "Osmosis: from higher (less negative) to lower (more negative) water potential through a partially permeable membrane.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the channel proteins that allow rapid movement of water across some cell membranes, such as those of the kidney collecting duct.",
    accepted: ["aquaporins", "aquaporin", "aquaporin channels"],
    wrong: ["porins", "carrier proteins"],
    explanation: "**Aquaporins** are water channels; their number in the membrane can be changed to adjust permeability to water.",
  });

  // Numerical: percentage change (new data, not the lesson's)
  const m0 = 4.25, m1 = 4.59;
  const pc = pctChange(m0, m1);
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: true,
    stem: "A beetroot cylinder had a mass of 4.25 g before and 4.59 g after 24 hours in a sucrose solution. Calculate the percentage change in mass. Give your answer to one decimal place, with a + sign for a gain.",
    value: pc, dp: 1, unit: "%",
    wrong: [rnd(((m1 - m0) / m1) * 100, 1), rnd(m1 - m0, 2)],
    explanation: t`Change $= 4.59 - 4.25 = +0.34$ g. Percentage change $= \dfrac{0.34}{4.25} \times 100 = +${dpStr(pc, 1)}\%$. Dividing by the final mass (4.59 g) instead of the initial mass gives the wrong answer.`,
  });

  // Serial dilution
  const stock = 1.0;
  const conc4 = stock / 2 ** 4;
  chk(conc4, 0.0625);
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`A student makes a serial dilution from a $1.0\ \text{mol dm}^{-3}$ sucrose stock solution. Each step mixes $10\ \text{cm}^3$ of the previous solution with $10\ \text{cm}^3$ of distilled water. What is the concentration after four dilution steps, in mol/dm³? Give your answer to three significant figures.`,
    value: conc4, sf: 3, unit: "mol/dm³",
    wrong: [stock / 4 / 2, stock / 2 ** 3],
    explanation: t`Each step halves the concentration: $1.0 \to 0.5 \to 0.25 \to 0.125 \to 0.0625\ \text{mol dm}^{-3}$. After four steps the concentration is $1.0 \div 2^{4} = 0.0625\ \text{mol dm}^{-3}$.`,
    hints: ["Equal volumes of solution and water halve the concentration.", "Count the steps carefully."],
  });

  // Zero crossing (different data from the lesson)
  const psi = [-320, -480, -640, -800, -960];
  const ch = [7.6, 3.9, 2.4, -1.2, -5.9];
  const z = zeroCrossing(psi, ch);
  b.calc({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: `Discs of carrot tissue were placed in solutions of known water potential.\n\n${table(["Water potential of solution / kPa", "Mean change in mass / %"], psi.map((p, i) => [`−${-p}`, (ch[i] > 0 ? "+" : "−") + Math.abs(ch[i]).toFixed(1)]))}\n\nAssuming a straight line between the two readings either side of zero, estimate the water potential of the carrot tissue in kPa. Give your answer to the nearest 10 kPa.`,
    value: z, tol: 10, unit: "kPa", answer: String(Math.round(z / 10) * 10),
    wrong: [-640, -800],
    explanation: t`1. The change in mass crosses zero between −640 kPa (+2.4%) and −800 kPa (−1.2%).
2. Fraction of the interval: $\dfrac{2.4}{2.4 + 1.2} = 0.667$.
3. Water potential $= -640 + 0.667 \times (-160) = ${Math.round(z)} \approx ${Math.round(z / 10) * 10}\ \text{kPa}$ to the nearest 10 kPa.
4. At this water potential there is no net gain or loss of water, so it equals the water potential of the tissue. Choosing −640 or −800 kPa ignores the interpolation.`,
    hints: ["Find where the percentage change goes from positive to negative.", "Interpolate in proportion to the sizes of the two changes."],
  });
  chk(Math.round(z), -747);

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why percentage change in mass, rather than change in mass, is calculated when comparing potato cylinders placed in different solutions.",
    points: [
      "The cylinders do not all have exactly the same starting mass",
      "Percentage change expresses the change relative to the starting mass",
      "So results from different cylinders can be compared fairly",
    ],
    modelAnswer: "The cylinders start with slightly different masses, and a larger cylinder would gain or lose more mass in grams. Percentage change expresses each change relative to that cylinder's starting mass, so the results can be compared fairly.",
    explanation: "Percentage change standardises for different starting masses.",
    hints: ["Would a large and a small cylinder gain the same mass in grams?"],
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 4,
    stem: "Compare simple diffusion and facilitated diffusion across a cell surface membrane.",
    points: [
      "Similarity: both are passive / do not use ATP",
      "Similarity: both move substances down their concentration gradient",
      "Difference: facilitated diffusion uses specific channel or carrier proteins; simple diffusion is through the bilayer",
      "Difference: facilitated diffusion moves ions / polar molecules and is saturable (limited by the number of proteins); simple diffusion moves small non-polar molecules and keeps increasing with gradient",
    ],
    modelAnswer: "Both are passive processes that move substances down a concentration gradient without ATP. Simple diffusion is through the phospholipid bilayer and suits small, non-polar molecules such as oxygen; facilitated diffusion uses specific channel or carrier proteins, so it carries ions and polar molecules such as glucose, and its rate levels off when all the proteins are in use.",
    explanation: "A *compare* answer needs similarities and differences, each stated for both processes.",
    hints: ["Give at least one similarity and one difference."],
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 3,
    stem: "Fertiliser spilled on the soil around a young tobacco plant made the soil water very concentrated, and the plant wilted. Explain why, using the term water potential.",
    points: [
      "Soil water now has a lower (more negative) water potential than the cell sap of the root cells",
      "Water leaves the root cells / is not taken up, by osmosis, down the water potential gradient",
      "Cells lose turgor / become flaccid (or plasmolysed), so the plant loses support and wilts",
    ],
    modelAnswer: "The dissolved fertiliser lowers the water potential of the soil water below that of the cell sap in the root hair cells. Water therefore moves out of the roots by osmosis instead of in. The cells of the plant lose water and turgor, become flaccid, and the plant wilts.",
    explanation: "Compare the water potentials, give the direction of osmosis, and link to turgor.",
    hints: ["Which has the lower water potential now: soil water or cell sap?"],
  });

  // Practice structured: onion epidermis plasmolysis
  const conc = [0.1, 0.25, 0.35, 0.45, 0.55, 0.7];
  const plasmo = [0, 2, 9, 24, 41, 50];
  const total = 50;
  const pct04 = (plasmo[3] / total) * 100;
  chk(pct04, 48);
  b.struct({
    d: 4, skill: "ANALYSIS",
    stem: `Nyasha mounted strips of red onion epidermis in sucrose solutions and, after 20 minutes, counted 50 cells in each strip, recording how many were plasmolysed.\n\n${table(["Sucrose concentration / mol dm⁻³", "Number of plasmolysed cells (out of 50)"], conc.map((c, i) => [c.toFixed(2), plasmo[i]]))}`,
    parts: [
      P.num({
        label: "(a)", marks: 1, stem: "Calculate the percentage of plasmolysed cells in 0.45 mol dm⁻³ sucrose.",
        value: pct04, unit: "%", wrong: [24],
        explanation: t`$\dfrac{24}{50} \times 100 = 48\%$.`,
      }),
      P.mcq({
        label: "(b)", stem: "Incipient plasmolysis is when 50% of cells are plasmolysed. Between which two concentrations does it occur?",
        options: [
          ["0.45 and 0.55 mol dm⁻³", "Correct: 48% at 0.45 and 82% at 0.55 mol dm⁻³."],
          ["0.35 and 0.45 mol dm⁻³", "At 0.45 mol dm⁻³ only 48% are plasmolysed, still below 50%."],
          ["0.55 and 0.70 mol dm⁻³", "At 0.55 mol dm⁻³ already 82% (41 of 50) are plasmolysed."],
          ["0.25 and 0.35 mol dm⁻³", "Only 4% and 18% are plasmolysed at these concentrations."],
        ],
        answer: "A",
        explanation: "48% at 0.45 and 82% at 0.55 mol dm⁻³, so 50% lies between them.",
      }),
      P.manual({
        label: "(c)", marks: 3, stem: "Explain why the number of plasmolysed cells increases as the sucrose concentration increases.",
        points: [
          "Higher sucrose concentration gives the solution a lower (more negative) water potential",
          "More water leaves the cells by osmosis, through the partially permeable membrane",
          "The protoplast shrinks and pulls away from the wall in more cells / cells vary in the water potential of their sap, so more cells pass the point of plasmolysis",
        ],
        modelAnswer: "As sucrose concentration rises, the water potential of the solution falls. More cells have a higher water potential than the solution, so water leaves them by osmosis through the cell surface membrane and tonoplast. Their protoplasts shrink and pull away from the walls. Because cells differ slightly in sap water potential, more and more pass the point of plasmolysis as concentration increases.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Suggest two variables Nyasha should standardise.",
        points: ["Time in the solution / temperature", "Source of epidermis (same onion, same scale leaf) or volume of solution or thickness of strip"],
        modelAnswer: "The time the strips spend in each solution and the temperature; also the source of the epidermis (same onion bulb) so the cells start with similar water potentials.",
      }),
      P.manual({
        label: "(e)", marks: 1, stem: "Suggest why red onion epidermis is used rather than white onion.",
        points: ["Coloured sap in the vacuole makes the shrinking protoplast / vacuole easy to see"],
        modelAnswer: "The red pigment in the vacuole shows clearly when the protoplast shrinks away from the wall.",
      }),
    ],
    explanation: "Higher sucrose concentration lowers external water potential, so more cells lose enough water to plasmolyse; incipient plasmolysis (50%) lies between 0.45 and 0.55 mol dm⁻³.",
    hints: ["50% of 50 cells is 25 cells.", "Does adding sucrose raise or lower water potential?"],
    calculator: true,
  });
  chk((plasmo[4] / total) * 100, 82);

  b.struct({
    d: 4, skill: "APPLICATION",
    stem: "A Visking tubing bag containing 0.5 mol dm⁻³ sucrose solution was attached to a capillary tube and placed in a beaker of distilled water. The level of liquid in the capillary tube was recorded every 5 minutes; it rose quickly at first, then more slowly.",
    parts: [
      P.short({
        label: "(a)", marks: 1, stem: "Name the process by which water entered the bag.",
        accepted: ["osmosis"],
        wrong: ["diffusion of sucrose", "active transport"],
        explanation: "Water moved into the bag by osmosis.",
      }),
      P.tf({
        label: "(b)", stem: "True or false: sucrose molecules moved out of the bag into the distilled water at the same time.",
        answer: false,
        explanation: "False. Sucrose molecules are too large to pass through the pores of Visking tubing, which is why it acts as a partially permeable membrane.",
      }),
      P.manual({
        label: "(c)", marks: 3, stem: "Explain why the liquid rose more slowly as time went on.",
        points: [
          "Water entering dilutes the sucrose solution, raising its water potential",
          "So the water potential gradient between the beaker and the bag becomes less steep",
          "The rising column of liquid exerts pressure (hydrostatic pressure) that opposes further entry of water",
        ],
        modelAnswer: "As water enters, the sucrose solution is diluted, so its water potential rises and the gradient between the distilled water and the bag becomes less steep. The column of liquid in the tube also pushes back on the bag. Both reduce the net rate of osmosis.",
      }),
      P.manual({
        label: "(d)", marks: 1, stem: "Describe a suitable control for this experiment.",
        points: ["An identical bag filled with distilled water (instead of sucrose) in distilled water"],
        modelAnswer: "An identical set-up in which the bag contains distilled water instead of sucrose solution.",
      }),
    ],
    explanation: "Osmosis into the bag slows as the gradient falls and the hydrostatic pressure rises.",
    hints: ["What happens to the concentration inside the bag as water enters?"],
  });

  b.card("DEFINITION", "Define **osmosis** (A-Level wording).", "Net movement of water molecules from a region of higher water potential to a region of lower water potential through a partially permeable membrane.");
  b.card("DEFINITION", "What is **water potential**?", "A measure of the tendency of water to move, in kPa; pure water = 0 kPa, solutions are negative.");
  b.card("DEFINITION", "Define **facilitated diffusion**.", "Passive diffusion of ions or polar molecules through specific channel or carrier proteins, down their concentration gradient.");
  b.card("CONCEPT", "Factors that increase the rate of diffusion", "Steeper concentration gradient, higher temperature, larger surface area, shorter distance, smaller or non-polar molecules.");
  b.card("CONCEPT", "Red blood cells in solutions of higher and lower ψ", "Higher ψ outside: water enters, cell bursts (lysis). Lower ψ outside: water leaves, cell shrinks (crenation).");
  b.card("DEFINITION", "What is **plasmolysis**?", "Loss of water from a plant cell so that the protoplast shrinks and pulls away from the cell wall.");
  b.card("CONCEPT", "Why does the rate of facilitated diffusion level off?", "The number of channel or carrier proteins is limited; when all are in use, a steeper gradient cannot raise the rate.");
  b.card("FORMULA", "Percentage change in mass", "(final mass − initial mass) ÷ initial mass × 100; keep the sign.");
  b.card("CONCEPT", "How do you find the water potential of a tissue?", "Plot % change in mass against ψ of the solutions; read ψ where the line crosses 0%.");
  b.card("FACT", "What are **aquaporins**?", "Channel proteins that let water cross membranes rapidly by osmosis.");
});
