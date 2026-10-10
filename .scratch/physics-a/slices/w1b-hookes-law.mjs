// W1b: aphys.solids.hookes-law — load, extension, Hooke's law, spring constant, graphs; springs in series/parallel (ZIM).
import { concept, P, t, chk, ZIM, DATA, sfStr, dpStr, linFit, pctUnc, table } from "../lib.mjs";

const g = DATA.g;
concept("aphys.solids.hookes-law", { file: "solids/hookes-law", keyPrefix: "solids.hookes-law" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which is a complete statement of Hooke's law?",
    options: [
      ["The extension is directly proportional to the load, provided the limit of proportionality is not exceeded.", "Correct: both the proportionality and its limit are stated."],
      ["The extension is directly proportional to the load for all loads.", "Every material stops obeying the law beyond its limit of proportionality."],
      ["The length is directly proportional to the load, provided the elastic limit is not exceeded.", "It is the extension, not the length, that is proportional to the load."],
      ["The load is inversely proportional to the extension, up to the breaking point.", "Load and extension increase together; the relationship is direct proportion."],
    ],
    answer: "A",
    explanation: "Hooke's law: F = kx, extension ∝ load, valid only up to the limit of proportionality.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is the unit of the spring constant in SI base units?",
    options: [
      [t`$\text{kg s}^{-2}$`, "Correct: N m⁻¹ = kg m s⁻² ÷ m."],
      [t`$\text{kg m s}^{-2}$`, "This is the newton; k is newtons per metre."],
      [t`$\text{kg m}^2\,\text{s}^{-2}$`, "This is the joule."],
      [t`$\text{kg m}^{-1}\,\text{s}^{-2}$`, "This is the pascal, the unit of stress, not of k."],
    ],
    answer: "A",
    explanation: t`$k = F/x$: $\text{N m}^{-1} = \text{kg m s}^{-2}\,\text{m}^{-1} = \text{kg s}^{-2}$.`,
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "Which material has a force-extension graph that is curved from the start, so that it does not obey Hooke's law at all?",
    options: [
      ["rubber", "Correct: rubber is easy to stretch at first, then becomes stiffer; the graph is curved throughout."],
      ["a steel spring", "A steel spring is linear over a wide range."],
      ["a copper wire", "Copper is linear for small extensions, then deforms plastically."],
      ["a steel wire", "Steel wire is linear (and very stiff) up to its limit of proportionality."],
    ],
    answer: "A",
    explanation: "Rubber molecules uncoil when first stretched (easy), then the bonds themselves stretch (stiff), giving a curve with no straight region.",
  });
  {
    const F1 = 1.5, x1 = 3.6, F2 = 4.0;
    const x2 = (F2 / F1) * x1;
    chk(x2, 9.6, 1e-9);
    b.mcq({
      d: 3, skill: "APPLICATION",
      stem: t`A spring extends by $${x1}\ \text{cm}$ under a load of $${F1}\ \text{N}$. Assuming the limit of proportionality is not exceeded, what is its extension under a load of $${F2.toFixed(1)}\ \text{N}$?`,
      options: [
        [`${dpStr(x2, 1)} cm`, `Correct: extension ∝ load, so ${x1} × ${F2.toFixed(1)}/${F1}.`],
        [`${dpStr((x1 * F1) / F2, 1)} cm`, "This inverts the ratio of the loads."],
        [`${dpStr(x1 + (F2 - F1), 1)} cm`, "This adds 2.5 to the extension because the load rose by 2.5 N."],
        [`${dpStr(F2 / (x1 / F1), 1)} cm`, `This takes k as ${x1}/${F1} = ${dpStr(x1 / F1, 1)} N per cm, the wrong way round.`],
      ],
      answer: "A",
      explanation: t`$k = ${F1}/${x1} = ${dpStr(F1 / x1, 3)}\ \text{N cm}^{-1}$; $x = ${F2.toFixed(1)}/${dpStr(F1 / x1, 3)} = ${dpStr(x2, 1)}\ \text{cm}$.`,
      hints: ["Find the force per cm of extension first."],
    });
  }
  {
    const L0 = 12.0, k = 25, F = 1.5;
    const L = L0 + (F / k) * 100;
    chk(L, 18);
    b.mcq({
      d: 3, skill: "APPLICATION",
      stem: t`A spring of natural length $12.0\ \text{cm}$ has spring constant $25\ \text{N m}^{-1}$. A load of $1.5\ \text{N}$ hangs from it. What is its new length?`,
      options: [
        ["18.0 cm", "Correct: extension = 1.5/25 = 0.060 m = 6.0 cm, added to 12.0 cm."],
        ["6.0 cm", "This is the extension, not the new length."],
        ["12.1 cm", "This adds 0.06 as if it were in cm; the extension 0.060 m is 6.0 cm."],
        ["37.5 cm", "This multiplies the load by k instead of dividing."],
      ],
      answer: "A",
      explanation: t`$x = F/k = 1.5/25 = 0.060\ \text{m} = 6.0\ \text{cm}$; new length $= 12.0 + 6.0 = ${L}\ \text{cm}$.`,
      hints: ["Find the extension in metres, then convert.", "Add the extension to the natural length."],
    });
  }
  b.mcq({
    d: 3, skill: "UNDERSTANDING", applies: ZIM,
    stem: "A load stretches a single spring by x. Two springs identical to it are joined end to end (in series) and the same load hangs from the lower one. What is the total extension?",
    options: [
      ["2x", "Correct: each spring carries the full load and extends by x."],
      ["x/2", "This is the extension for two springs side by side (in parallel)."],
      ["x", "Each spring stretches by x, so the total is twice as much."],
      ["4x", "Each spring carries the same load as the single spring, not twice it."],
    ],
    answer: "A",
    explanation: "In series the load passes through each spring, so each extends x and the total is 2x; the combined spring constant is k/2.",
    hints: ["What force does each spring in the chain carry?"],
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "A force-extension graph (force on the y-axis) for a metal wire is straight to point L, then curves so that its gradient becomes smaller. Which statement is correct?",
    options: [
      ["Beyond L the wire extends more for each extra newton than it did before L.", "Correct: a smaller gradient means less force per unit extension, so a larger extension per newton."],
      ["Beyond L the wire becomes stiffer.", "A smaller gradient of F against x means the wire is less stiff."],
      ["L is the breaking point of the wire.", "L is the limit of proportionality; the wire breaks much later."],
      ["The spring constant beyond L is larger than before L, so the wire is harder to stretch.", "Beyond L there is no constant k, and the local gradient is smaller."],
    ],
    answer: "A",
    explanation: "Gradient of F against x is the stiffness. Past the limit of proportionality the gradient falls, so each extra newton produces more extension than before.",
    hints: ["What does the gradient of force against extension represent?"],
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: t`A spring extends by $3.2\ \text{cm}$ when a force of $8.0\ \text{N}$ is applied. Calculate its spring constant, in $\text{N m}^{-1}$.`,
    value: 8 / 0.032, unit: "N/m", wrong: [8 / 3.2, 8 * 0.032],
    explanation: t`$k = F/x = 8.0 / 0.032 = ${8 / 0.032}\ \text{N m}^{-1}$. Using 3.2 cm without converting gives 2.5, which would be in N cm⁻¹.`,
  });
  {
    const m = 0.25, k = 45;
    b.num({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A $250\ \text{g}$ mass hangs at rest from a spring of spring constant $${k}\ \text{N m}^{-1}$. Calculate the extension, in m, to three significant figures.`,
      value: (m * g) / k, unit: "m", wrong: [m / k, (250 * g) / k],
      explanation: t`Load $= mg = 0.250 \times 9.81 = ${sfStr(m * g, 3)}\ \text{N}$; $x = ${sfStr(m * g, 3)}/45 = ${sfStr((m * g) / k, 3)}\ \text{m}$. The load is a weight, so multiply by g.`,
      hints: ["The load is the weight of the mass."],
    });
  }
  {
    const k1 = 80, k2 = 120, F = 30;
    b.calc({
      d: 3, skill: "APPLICATION", applies: ZIM, calculator: true,
      stem: t`Two springs of spring constants $80\ \text{N m}^{-1}$ and $120\ \text{N m}^{-1}$ hang side by side (in parallel) and are joined at the bottom by a light bar that stays horizontal. A load of $30\ \text{N}$ hangs from the bar. Calculate the extension, in m.`,
      value: F / (k1 + k2), unit: "m", wrong: [F / ((k1 * k2) / (k1 + k2)), F / k1],
      explanation: t`1. In parallel the constants add: $k = 80 + 120 = 200\ \text{N m}^{-1}$.
2. $x = F/k = 30/200 = ${F / (k1 + k2)}\ \text{m}$.
3. The stiffer spring carries more of the load ($120 \times 0.15 = 18\ \text{N}$) and the other $12\ \text{N}$.`,
      hints: ["For springs in parallel the spring constants add."],
    });
    const ks = (k1 * k2) / (k1 + k2);
    b.calc({
      d: 4, skill: "APPLICATION", applies: ZIM, calculator: true,
      stem: t`The same two springs ($80\ \text{N m}^{-1}$ and $120\ \text{N m}^{-1}$) are now joined end to end (in series) and support a load of $6.0\ \text{N}$. Calculate the total extension, in m, to three significant figures.`,
      value: 6 / ks, unit: "m", wrong: [6 / (k1 + k2), 6 / k1],
      explanation: t`1. In series: $\dfrac{1}{k} = \dfrac{1}{80} + \dfrac{1}{120}$, so $k = ${ks}\ \text{N m}^{-1}$.
2. $x = 6.0/${ks} = ${sfStr(6 / ks, 3)}\ \text{m}$.
3. Check: each spring carries $6.0\ \text{N}$: $6.0/80 + 6.0/120 = 0.075 + 0.050 = 0.125\ \text{m}$.`,
      hints: ["In series each spring carries the full load.", "Add the separate extensions."],
    });
  }
  {
    const F = [0, 0.4, 0.8, 1.2, 1.6, 2.0];
    const x = [0, 1.5, 3.3, 4.7, 6.5, 7.9]; // mm
    const fit = linFit(x.map((v) => v / 1000), F);
    const tab = table([t`$F\,/\,\text{N}$`, t`$x\,/\,\text{mm}$`], F.map((f, i) => [f.toFixed(1), x[i].toFixed(1)]));
    b.num({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`Loads are added to a stiff spring and its extension is measured.

${tab}

Plot $F$ against $x$ in your working and determine the spring constant from the gradient of the best-fit line, in $\text{N m}^{-1}$, to two significant figures.`,
      value: fit.m, tol: 10, unit: "N/m", wrong: [1 / fit.m, fit.m / 1000],
      explanation: t`The points lie close to a straight line through the origin. Gradient $\approx \dfrac{${F[5].toFixed(1)}}{${x[5] / 1000}} = ${sfStr(F[5] / (x[5] / 1000), 3)}\ \text{N m}^{-1}$ from the last point on a good line (a least-squares line gives $${sfStr(fit.m, 3)}\ \text{N m}^{-1}$). Convert mm to m before dividing.`,
      hints: ["Convert the extensions to metres.", "Use a large triangle on the best-fit line."],
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In a spring experiment, each extension is measured from the length at the previous load.",
    answer: false,
    explanation: "False. Every extension is measured from the original (unloaded) length; otherwise you record only the increase for each step, not the total extension.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", applies: ZIM,
    stem: "Two identical springs side by side (in parallel) are stiffer than one spring alone.",
    answer: true,
    explanation: "True. They share the load, so each extends half as much: the combined spring constant is 2k.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each material with the description of its force-extension graph.",
    pairs: [
      ["steel spring", "straight through the origin over a large extension, then curving"],
      ["copper wire", "very steep straight line for a tiny extension, then large extension at nearly constant force"],
      ["rubber band", "curved from the start; unloading curve below the loading curve"],
      ["polythene strip", "short straight region, then stretches a great deal and does not recover"],
    ],
    explanation: "Springs obey Hooke's law widely; metals over small strains before plastic flow; rubber never; polythene deforms plastically.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct terms.",
    template: "The point beyond which load and extension are no longer proportional is the {{blank:a}}. The force per unit extension is the {{blank:b}}, measured in {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["limit of proportionality"], choices: ["limit of proportionality", "breaking point", "yield point"] },
      { id: "b", accepted: ["spring constant"], choices: ["spring constant", "Young modulus", "tensile strain"] },
      { id: "c", accepted: ["N m⁻¹"], choices: ["N m⁻¹", "N m", "Pa"] },
    ],
    explanation: "Limit of proportionality: end of the straight region. k = F/x in N m⁻¹.",
  });
  b.short({
    d: 1, skill: "RECALL",
    stem: "What name is given to the increase in length of a spring from its original length when it is loaded?",
    accepted: ["extension", "the extension"],
    wrong: ["length"],
    explanation: "The **extension** = loaded length − original length.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 2,
    stem: "State Hooke's law.",
    points: ["The extension (of a spring or wire) is directly proportional to the load / force applied…", "…provided the limit of proportionality is not exceeded."],
    modelAnswer: "The extension of a spring is directly proportional to the load applied, provided the limit of proportionality is not exceeded.",
    explanation: "The condition is the second marking point.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "Describe how you would determine the spring constant of a spring in the laboratory, including how you would make the measurements accurate and safe.",
    points: [
      "Hang the spring from a clamp with a vertical metre rule beside it and a pointer on the bottom; record the original length (pointer reading).",
      "Add known masses in equal steps (e.g. 100 g), recording the pointer reading each time; extension = reading − original reading; load = mg.",
      "Read at eye level (avoid parallax) / take readings while unloading too and average / check the spring returns to its original length.",
      "Plot load against extension; k = gradient of the straight part. Safety: goggles / do not overload (keep feet clear of falling masses).",
    ],
    modelAnswer: "Clamp the spring with a metre rule held vertically beside it and a pointer fixed to its lower end, and record the unloaded reading. Add 100 g masses one at a time, recording the pointer reading each time at eye level; the extension is the reading minus the original reading and the load is mg. Repeat while unloading and average. Plot load against extension; the spring constant is the gradient of the straight region. Wear goggles in case the spring flies off and keep feet clear of the masses.",
    explanation: "A method, accuracy precautions, the analysis and safety each earn credit.",
    hints: ["Think about how you measure the extension accurately."],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Compare the force-extension graph of a steel spring with that of a single straight steel wire of the same length, and explain the difference.",
    points: [
      "Both are straight lines through the origin at first (both obey Hooke's law).",
      "The wire's graph is far steeper (much larger k) / the wire's extension is tiny for the same load.",
      "In the spring the wire is coiled, so a load mainly bends and twists the coils rather than stretching the steel, giving a large extension.",
    ],
    modelAnswer: "Both graphs start as straight lines through the origin. The straight wire is far stiffer, so its graph is much steeper and its extensions are tiny. In a spring the steel is coiled, so the load bends and twists the coils instead of directly stretching the metal, which allows a large extension for a small force.",
    explanation: "Same material, different geometry: geometry changes stiffness.",
    hints: ["What happens to the steel in a coil when it is loaded?"],
  });

  // Practice structured: spring extension data with uncertainty (12 marks)
  {
    const m = [0, 100, 200, 300, 400, 500, 600]; // g
    const L = [182, 207, 231, 257, 281, 306, 345]; // mm
    const F = m.map((v) => (v / 1000) * g);
    const x = L.map((l) => l - L[0]);
    const fit = linFit(x.slice(0, 6).map((v) => v / 1000), F.slice(0, 6));
    const tab = table(["Mass / g", "Pointer reading / mm"], m.map((v, i) => [String(v), String(L[i])]));
    b.struct({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`Rudo hangs masses from a spring and reads a pointer against a vertical millimetre scale.

${tab}`,
      parts: [
        P.group({ label: "(a)", stem: "For the 300 g load, calculate:", parts: [
          P.num({ label: "(i)", marks: 1, stem: "the load, in N, to three significant figures", value: F[3], unit: "N", wrong: [0.3], explanation: t`$0.300 \times 9.81 = ${sfStr(F[3], 3)}\ \text{N}$.` }),
          P.num({ label: "(ii)", marks: 1, stem: "the extension, in mm", value: x[3], unit: "mm", wrong: [L[3]], explanation: t`$${L[3]} - ${L[0]} = ${x[3]}\ \text{mm}$, measured from the unloaded reading.` }),
        ] }),
        P.manual({ label: "(b)", marks: 2, stem: "Describe the graph of load against extension you would expect from these results.", points: ["A straight line through the origin for loads up to about 4.9 N (500 g).", "The 600 g point lies above the line in extension (to the right): the limit of proportionality has been exceeded between 500 g and 600 g."], modelAnswer: "The first six points lie on a straight line through the origin. The 600 g point has a much larger extension than the line predicts, so the limit of proportionality lies between 500 g and 600 g." }),
        P.num({ label: "(c)", marks: 3, stem: t`Use the straight region to determine the spring constant, in $\text{N m}^{-1}$, to three significant figures.`, value: fit.m, tol: 1.5, unit: "N/m", wrong: [fit.m / 1000],
          explanation: t`Gradient of $F$ against $x$ (in m) for 0–500 g: about $${sfStr(fit.m, 3)}\ \text{N m}^{-1}$ (for example $\dfrac{4.905}{0.124} = ${sfStr(4.905 / 0.124, 3)}\ \text{N m}^{-1}$).` }),
        P.num({ label: "(d)", marks: 2, stem: t`Each pointer reading is uncertain by $\pm 1\ \text{mm}$. Calculate the percentage uncertainty in the extension for the 500 g load, to two significant figures.`, value: pctUnc(2, x[5]), sf: 2, unit: "%", wrong: [pctUnc(1, x[5])],
          explanation: t`The extension is a difference of two readings, so $\Delta x = 1 + 1 = 2\ \text{mm}$; $\dfrac{2}{${x[5]}} \times 100 = ${sfStr(pctUnc(2, x[5]), 2)}\%$.` }),
        P.manual({ label: "(e)", marks: 2, stem: "Suggest two ways to make the extension readings more reliable.", points: ["Read the pointer at eye level (perpendicular to the scale) to avoid parallax / use a set square.", "Wait for the spring to stop oscillating before reading; repeat while unloading and average (or use smaller load steps)."], modelAnswer: "Read the pointer at eye level, using a set square against the scale, wait for oscillations to die away before each reading, and take readings while unloading as well, averaging the two." }),
        P.manual({ label: "(f)", marks: 1, stem: "State one safety precaution.", points: ["Wear goggles (spring/masses may fly off) or keep feet clear / use a sand tray below the masses."], modelAnswer: "Wear safety goggles in case the spring slips off, and keep feet away from below the masses." }),
      ],
      explanation: "Load = mg; extension from the unloaded reading; k from the gradient of the straight region.",
      hints: ["Extension = reading − 182 mm.", "Use only the straight region for the gradient."],
    });
  }
  // Practice structured: suspension springs in parallel (ZIMSEC detail, 8 marks)
  {
    const kOne = 3.5e4, n = 4, mCar = 1200, mLoad = 280;
    const k = n * kOne;
    const dx = (mLoad * g) / k;
    b.struct({
      d: 4, skill: "APPLICATION", applies: ZIM, calculator: true,
      stem: t`A light truck rests on four identical suspension springs, one at each wheel, each with spring constant $${sfStr(kOne / 1e4, 2)} \times 10^{4}\ \text{N m}^{-1}$. Treat the springs as sharing the load equally (in parallel).`,
      parts: [
        P.num({ label: "(a)", marks: 2, stem: t`Calculate the combined spring constant of the four springs, in $\text{N m}^{-1}$.`, value: k, unit: "N/m", wrong: [kOne / n], explanation: t`In parallel the constants add: $4 \times ${sfStr(kOne / 1e4, 2)} \times 10^{4} = ${sfStr(k / 1e5, 2)} \times 10^{5}\ \text{N m}^{-1}$.` }),
        P.num({ label: "(b)", marks: 3, stem: t`Four people of total mass $${mLoad}\ \text{kg}$ get in. Calculate how far the body of the truck sinks, in m, to three significant figures.`, value: dx, unit: "m", wrong: [(mLoad * g) / kOne, mLoad / k], explanation: t`Extra load $= ${mLoad} \times 9.81 = ${sfStr(mLoad * g, 4)}\ \text{N}$; compression $= ${sfStr(mLoad * g, 4)} / ${sfStr(k / 1e5, 2)} \times 10^{5} = ${sfStr(dx, 3)}\ \text{m}$.` }),
        P.manual({ label: "(c)", marks: 1, stem: "State the assumption you made about the springs.", points: ["They obey Hooke's law (stay below the limit of proportionality) and share the load equally."], modelAnswer: "The springs obey Hooke's law over this compression and share the extra load equally." }),
        P.manual({ label: "(d)", marks: 2, stem: t`The truck's own mass is $${mCar}\ \text{kg}$. Explain why the springs are already compressed before anyone gets in, and why the answer to (b) does not depend on this.`, points: ["The weight of the truck body already compresses the springs.", "Within the Hooke's law region the extra compression depends only on the extra load (F = kx is linear), not on the starting compression."], modelAnswer: "The truck's own weight already compresses the springs. Because they obey Hooke's law, the extra compression is proportional only to the extra load, whatever the starting compression." }),
      ],
      explanation: "Springs in parallel add their constants; extra compression = extra load ÷ combined k.",
      hints: ["Four springs side by side: add the spring constants."],
    });
  }

  b.card("DEFINITION", "**Hooke's law**", "Extension is directly proportional to load, provided the limit of proportionality is not exceeded.");
  b.card("DEFINITION", "**Limit of proportionality**", "The point beyond which extension is no longer proportional to load.");
  b.card("FORMULA", "Spring constant", t`$k = F/x$, in $\text{N m}^{-1}$ (gradient of $F$ against $x$)`);
  b.card("DEFINITION", "**Extension**", "Increase in length from the original, unloaded length.");
  b.card("CONCEPT", "Force-extension graph of rubber", "Curved from the start (does not obey Hooke's law); unloading curve lies below the loading curve.");
  b.card("CONCEPT", "Tensile vs compressive force", "Tensile forces stretch an object; compressive forces squash it.");
  b.card("FORMULA", "Springs in series (ZIMSEC detail)", t`$\dfrac{1}{k} = \dfrac{1}{k_1} + \dfrac{1}{k_2}$`, undefined, { applies: ZIM });
  b.card("FORMULA", "Springs in parallel (ZIMSEC detail)", t`$k = k_1 + k_2$`, undefined, { applies: ZIM });
  b.card("FACT", "Gradient of extension (y) against load (x)?", "1/k, the reciprocal of the spring constant.");
});
