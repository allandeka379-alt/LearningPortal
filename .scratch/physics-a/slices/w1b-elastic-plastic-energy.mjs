// W1b: aphys.solids.elastic-plastic-energy — elastic/plastic deformation, area under F-x graph, ½Fx = ½kx², ½σε (ZIM), hysteresis.
import { concept, P, t, chk, ZIM, sfStr, dpStr, sciTex, pctUnc, table } from "../lib.mjs";

concept("aphys.solids.elastic-plastic-energy", { file: "solids/elastic-plastic-energy", keyPrefix: "solids.elastic-plastic-energy" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is meant by elastic deformation?",
    options: [
      ["A change of shape that is reversed when the load is removed", "Correct: the object returns to its original length."],
      ["A change of shape in which extension is proportional to load", "That describes Hooke's law; a material can be elastic without being proportional (rubber)."],
      ["A change of shape that remains after the load is removed", "That is plastic deformation."],
      ["A change of shape that stores no energy", "Elastic deformation stores energy, which is recovered on unloading."],
    ],
    answer: "A",
    explanation: "Elastic: returns to the original shape when unloaded. Plastic: permanent change. The elastic limit separates them.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What does the area under a force-extension graph represent?",
    options: [
      ["the work done in stretching the object", "Correct: area = ∫F dx = work done."],
      ["the spring constant of the object", "The spring constant is the gradient, not the area."],
      ["the Young modulus of the material", "The Young modulus is the gradient of a stress-strain graph."],
      ["the power needed to stretch the object", "Power would need a time; the area is an energy."],
    ],
    answer: "A",
    explanation: "Force × extension has the unit N m = J. The area under the graph is the work done, stored as elastic potential energy if the deformation is elastic.",
  });
  {
    const k = 400, x = 0.05;
    const E = 0.5 * k * x * x;
    chk(E, 0.5, 1e-12);
    b.mcq({
      d: 3, skill: "APPLICATION",
      stem: t`A spring of spring constant $400\ \text{N m}^{-1}$ is stretched by $5.0\ \text{cm}$, within its limit of proportionality. How much elastic potential energy does it store?`,
      options: [
        ["0.50 J", "Correct: ½ × 400 × 0.050²."],
        ["1.0 J", "This is kx², missing the ½."],
        ["10 J", "This is ½kx, not ½kx²."],
        ["5000 J", "This uses x in cm instead of metres."],
      ],
      answer: "A",
      explanation: t`$E_P = \tfrac{1}{2}kx^2 = \tfrac{1}{2} \times 400 \times 0.050^2 = ${E}\ \text{J}$.`,
      hints: ["Convert 5.0 cm to metres before squaring."],
    });
  }
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "A copper wire is loaded beyond its elastic limit and then the load is removed. Which describes the unloading part of its force-extension graph?",
    options: [
      ["a straight line parallel to the initial loading line, reaching zero force at a positive extension", "Correct: the bonds relax with the original stiffness, but the slipped layers leave a permanent extension."],
      ["the same curve as the loading curve, followed in reverse back to the origin", "That happens only within the elastic limit."],
      ["a straight line from the maximum load directly back to the origin, so all the energy is recovered", "The wire does not return to its original length after plastic deformation."],
      ["a horizontal line at the maximum load until the extension is zero", "The force falls as the load is removed; it does not stay at its maximum."],
    ],
    answer: "A",
    explanation: "On unloading, the atomic bonds shorten elastically (same gradient as the original straight region), but the permanent slip remains, so the line meets the extension axis at the permanent extension.",
    hints: ["After plastic deformation, does the wire return to its original length?"],
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "A rubber band is stretched and released; its unloading curve lies below its loading curve. What does the area enclosed between the two curves represent?",
    options: [
      ["energy transferred to thermal energy in the rubber during the cycle", "Correct: this is hysteresis; the band warms up."],
      ["the elastic potential energy stored when the band is fully stretched", "That is the area under the loading curve."],
      ["the energy given back by the band as it contracts", "That is the area under the unloading curve."],
      ["the permanent extension of the band", "An area on a force-extension graph is an energy, not an extension."],
    ],
    answer: "A",
    explanation: "Work done on the band = area under loading curve; work done by the band = area under unloading curve; the difference (the loop) is dissipated as thermal energy.",
    hints: ["Compare the work done on the band with the work it gives back."],
  });
  {
    const F = 12, x = 3e-3;
    b.mcq({
      d: 4, skill: "APPLICATION",
      stem: t`A metal wire extends by $3.0\ \text{mm}$ under a load of $12\ \text{N}$; the force-extension graph is a straight line through the origin up to this point. How much strain energy is stored?`,
      options: [
        [t`$1.8 \times 10^{-2}\ \text{J}$`, "Correct: ½ × 12 × 3.0 × 10⁻³."],
        [t`$3.6 \times 10^{-2}\ \text{J}$`, "This is Fx, missing the ½."],
        ["18 J", "This leaves the extension in mm."],
        [t`$2.0 \times 10^{-3}\ \text{J}$`, "This divides the extension by the force."],
      ],
      answer: "A",
      explanation: t`$E_P = \tfrac{1}{2}Fx = \tfrac{1}{2} \times 12 \times 3.0 \times 10^{-3} = ${sciTex(0.5 * F * x, 2)}\ \text{J}$.`,
      hints: ["The graph is a triangle.", "Convert mm to m."],
    });
  }
  b.mcq({
    d: 4, skill: "ANALYSIS", applies: ZIM,
    stem: t`A wire is under a tensile stress $\sigma$ and strain $\varepsilon$, within the limit of proportionality. Which expression gives the elastic energy stored per unit volume?`,
    options: [
      [t`$\tfrac{1}{2}\sigma\varepsilon$`, t`Correct: $\tfrac{1}{2}Fx / (AL) = \tfrac{1}{2}(F/A)(x/L)$.`],
      [t`$\sigma\varepsilon$`, "This misses the ½ from the triangle under the graph."],
      [t`$\tfrac{1}{2}\sigma/\varepsilon$`, t`$\sigma/\varepsilon$ is the Young modulus, not an energy density.`],
      [t`$\tfrac{1}{2}E\varepsilon$`, t`$E\varepsilon = \sigma$, so this is half the stress, not an energy per volume.`],
    ],
    answer: "A",
    explanation: t`Energy $= \tfrac{1}{2}Fx$; volume $= AL$. Energy per unit volume $= \tfrac{1}{2}\dfrac{F}{A}\dfrac{x}{L} = \tfrac{1}{2}\sigma\varepsilon$ (also $= \tfrac{1}{2}E\varepsilon^2$). Unit: $\text{J m}^{-3}$.`,
    hints: ["Divide ½Fx by the volume AL."],
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: true,
    stem: t`A spring of spring constant $150\ \text{N m}^{-1}$ is compressed by $0.12\ \text{m}$. Calculate the elastic potential energy stored, in J, to three significant figures.`,
    value: 0.5 * 150 * 0.12 ** 2, unit: "J", wrong: [150 * 0.12 ** 2, 0.5 * 150 * 0.12],
    explanation: t`$E_P = \tfrac{1}{2}kx^2 = \tfrac{1}{2} \times 150 \times 0.12^2 = ${sfStr(0.5 * 150 * 0.0144, 3)}\ \text{J}$. The same formula applies to a compression.`,
  });
  {
    const E = 0.45, m = 0.015;
    const v = Math.sqrt((2 * E) / m);
    b.num({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A catapult stores $0.45\ \text{J}$ of elastic potential energy. Assuming all of it is transferred to a $15\ \text{g}$ stone, calculate the stone's launch speed, in $\text{m s}^{-1}$, to three significant figures.`,
      value: v, unit: "m/s", wrong: [Math.sqrt(E / m), Math.sqrt((2 * E) / 15)],
      explanation: t`$\tfrac{1}{2}mv^2 = 0.45 \Rightarrow v = \sqrt{\dfrac{2 \times 0.45}{0.015}} = ${sfStr(v, 3)}\ \text{m s}^{-1}$.`,
      hints: ["Elastic energy becomes kinetic energy.", "Convert 15 g to kg."],
    });
  }
  {
    const m = 0.8, v = 1.5, k = 360;
    const x = v * Math.sqrt(m / k);
    b.calc({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: t`A $0.80\ \text{kg}$ trolley moving at $1.5\ \text{m s}^{-1}$ runs into a buffer spring of spring constant $360\ \text{N m}^{-1}$ and is brought to rest. Assuming no energy is dissipated and the spring obeys Hooke's law, calculate the maximum compression of the spring, in m, to three significant figures.`,
      value: x, unit: "m", wrong: [(m * v * v) / k, (0.5 * m * v * v) / k],
      explanation: t`1. Kinetic energy $= \tfrac{1}{2} \times 0.80 \times 1.5^2 = ${0.5 * m * v * v}\ \text{J}$.
2. At maximum compression this is all stored: $\tfrac{1}{2}kx^2 = ${0.5 * m * v * v}$.
3. $x = \sqrt{\dfrac{2 \times ${0.5 * m * v * v}}{360}} = ${sfStr(x, 3)}\ \text{m}$.
4. Forgetting the square root gives $x^2$, not $x$.`,
      hints: ["Kinetic energy = elastic energy at maximum compression.", "Solve ½kx² = ½mv² for x."],
    });
  }
  {
    const s = 2.4e8, e = 1.2e-3;
    b.calc({
      d: 3, skill: "APPLICATION", applies: ZIM, calculator: true,
      stem: t`A steel tie-bar is under a stress of $2.4 \times 10^{8}\ \text{Pa}$ and a strain of $1.2 \times 10^{-3}$, within its limit of proportionality. Calculate the elastic energy stored per unit volume, in $\text{J m}^{-3}$.`,
      value: 0.5 * s * e, wrong: [s * e, (0.5 * s) / e],
      explanation: t`1. Energy per unit volume $= \tfrac{1}{2}\sigma\varepsilon$.
2. $= \tfrac{1}{2} \times 2.4 \times 10^{8} \times 1.2 \times 10^{-3} = ${sciTex(0.5 * s * e, 3)}\ \text{J m}^{-3}$.`,
      hints: ["Use ½ × stress × strain."],
    });
  }
  {
    const squares = 46, perSquare = 0.5 * 1e-3; // 0.5 N by 1 mm
    b.num({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`The force-extension graph for a rubber cord is curved. When it is plotted on graph paper, each small square represents $0.50\ \text{N}$ (vertically) by $1.0\ \text{mm}$ (horizontally). The area under the loading curve is estimated as ${squares} squares. Calculate the work done in stretching the cord, in J, to two significant figures.`,
      value: squares * perSquare, sf: 2, unit: "J", wrong: [squares * 0.5, squares * perSquare * 0.5],
      explanation: t`One square $= 0.50\ \text{N} \times 1.0 \times 10^{-3}\ \text{m} = 5.0 \times 10^{-4}\ \text{J}$. Work done $= ${squares} \times 5.0 \times 10^{-4} = ${sfStr(squares * perSquare, 2)}\ \text{J}$. There is no ½: counting squares already gives the area.`,
      hints: ["Find the energy one square represents."],
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A rubber band that shows hysteresis has been plastically deformed.",
    answer: false,
    explanation: "False. The band returns to (almost) its original length, so the deformation is elastic. Hysteresis means some energy is dissipated as thermal energy on each cycle.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "The formula Ep = ½kx² is valid only up to the limit of proportionality.",
    answer: true,
    explanation: "True. It comes from the triangular area under a straight-line graph. Beyond the limit the energy is still the area under the graph, but that area is not ½kx².",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each term with its description.",
    pairs: [
      ["elastic limit", "largest load after which the material still returns to its original length"],
      ["plastic deformation", "permanent change of shape that remains when the load is removed"],
      ["strain energy", "energy stored because of a change of shape"],
      ["hysteresis", "energy dissipated in a loading-unloading cycle, shown by a loop on the graph"],
    ],
    explanation: "These terms describe how a material behaves when loaded and unloaded.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The work done in stretching a spring is the {{blank:a}} under its force-extension graph. Within the limit of proportionality this equals {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["area"], choices: ["area", "gradient", "intercept"] },
      { id: "b", accepted: ["½Fx"], choices: ["½Fx", "Fx", "F/x"] },
    ],
    explanation: "Area under the graph = work done; a triangle gives ½Fx = ½kx².",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the effect in which the unloading curve of rubber lies below its loading curve, so that energy is dissipated in each cycle.",
    accepted: ["hysteresis", "elastic hysteresis"],
    explanation: "**Hysteresis**: the loop area is the energy transferred to thermal energy per cycle.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 3,
    stem: t`Show that the elastic potential energy stored in a spring of spring constant $k$ stretched by $x$ (within the limit of proportionality) is $\tfrac{1}{2}kx^2$.`,
    points: [
      "Work done = area under the force-extension graph, which is a straight line through the origin.",
      t`The area is a triangle: $\tfrac{1}{2} \times F \times x$.`,
      t`Using $F = kx$: $E_P = \tfrac{1}{2}(kx)x = \tfrac{1}{2}kx^2$.`,
    ],
    modelAnswer: t`The energy stored equals the work done, which is the area under the force-extension graph. Within the limit of proportionality the graph is a straight line through the origin, so the area is a triangle, $\tfrac{1}{2}Fx$. Since $F = kx$, $E_P = \tfrac{1}{2}kx \cdot x = \tfrac{1}{2}kx^2$.`,
    explanation: "Area of a triangle under a straight-line graph, then Hooke's law.",
    hints: ["What shape is the area under the graph?"],
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "A metal wire is loaded well beyond its elastic limit and then unloaded. Describe the force-extension graph for loading and unloading, and explain what the areas on it represent.",
    points: [
      "Loading: straight line through the origin, then a curve of decreasing gradient beyond the limit of proportionality / elastic limit.",
      "Unloading: straight line parallel to the initial straight region, meeting the extension axis at a positive extension (the permanent extension).",
      "Area under the loading curve = total work done on the wire.",
      "Area under the unloading line = energy recovered; the area between the curves = energy dissipated (thermal) in the plastic deformation.",
    ],
    modelAnswer: "On loading the graph is straight from the origin, then curves with a smaller gradient past the elastic limit. On unloading it follows a straight line parallel to the original straight part and reaches zero force at a positive extension, the permanent extension. The area under the loading curve is the total work done; the triangle under the unloading line is the energy given back; the area between them is the energy dissipated as thermal energy in deforming the wire plastically.",
    explanation: "Two marks for the shape, two for interpreting the areas.",
    hints: ["Is the unloading line parallel to the loading line?"],
  });

  // Practice structured: elastic cord, non-linear graph (12 marks)
  {
    const x = [0, 0.05, 0.10, 0.15, 0.20, 0.25]; // m
    const F = [0, 3.0, 5.0, 6.6, 8.4, 10.8]; // N
    let W = 0;
    for (let i = 1; i < x.length; i++) W += 0.5 * (F[i] + F[i - 1]) * (x[i] - x[i - 1]);
    const m = 0.050;
    const v = Math.sqrt((2 * W) / m);
    const tab = table([t`$x\,/\,\text{m}$`, t`$F\,/\,\text{N}$`], x.map((v2, i) => [v2.toFixed(2), F[i].toFixed(1)]));
    b.struct({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`Farai measures the tension $F$ in an elastic cord used to launch a $50\ \text{g}$ model glider, at several extensions $x$.

${tab}`,
      parts: [
        P.manual({ label: "(a)", marks: 2, stem: "Describe the shape of the force-extension graph and state whether the cord obeys Hooke's law.", points: ["A curve through the origin: steep at first, less steep in the middle, then steeper again (gradient not constant).", "Not proportional (F/x is not constant), so it does not obey Hooke's law."], modelAnswer: "The graph passes through the origin but is curved: its gradient falls and then rises again, so F is not proportional to x and the cord does not obey Hooke's law." }),
        P.num({ label: "(b)", marks: 3, stem: "Estimate the work done in stretching the cord to 0.25 m, by splitting the area under the graph into trapezia, in J, to three significant figures.", value: W, unit: "J", wrong: [0.5 * F[5] * 0.25],
          explanation: t`Sum of trapezia $\tfrac{1}{2}(F_1 + F_2)\Delta x$ with $\Delta x = 0.05\ \text{m}$: $0.05 \times (\tfrac{1}{2}(0 + 3.0) + \tfrac{1}{2}(3.0 + 5.0) + \dots) = ${sfStr(W, 3)}\ \text{J}$. Using $\tfrac{1}{2}Fx$ assumes a straight line and underestimates it.` }),
        P.num({ label: "(c)", marks: 2, stem: t`Calculate the maximum launch speed of the glider if all this energy became its kinetic energy, in $\text{m s}^{-1}$, to three significant figures.`, value: v, unit: "m/s", wrong: [Math.sqrt(W / m)], explanation: t`$v = \sqrt{2W/m} = \sqrt{2 \times ${sfStr(W, 3)} / 0.050} = ${sfStr(v, 3)}\ \text{m s}^{-1}$.` }),
        P.num({ label: "(d)", marks: 2, stem: t`Each force reading is uncertain by $\pm 0.3\ \text{N}$. Calculate the percentage uncertainty in the force at the largest extension, to two significant figures.`, value: pctUnc(0.3, F[5]), sf: 2, unit: "%", wrong: [0.3], explanation: t`$\dfrac{0.3}{${F[5]}} \times 100 = ${sfStr(pctUnc(0.3, F[5]), 2)}\%$.` }),
        P.manual({ label: "(e)", marks: 2, stem: "The measured launch speed is lower than in (c). Give two reasons.", points: ["Hysteresis in the cord: less energy is returned on contraction than was stored (dissipated as thermal energy).", "The cord's own mass gains kinetic energy / air resistance and friction on the launch rail."], modelAnswer: "Elastic cords show hysteresis, so less energy is given back than was put in; also the cord itself moves and gains kinetic energy, and air resistance acts on the glider." }),
        P.manual({ label: "(f)", marks: 1, stem: "State one safety precaution when stretching the cord.", points: ["Wear eye protection / never stretch the cord towards anyone's face (it may snap or slip)."], modelAnswer: "Wear safety goggles and keep the stretched cord pointing away from people in case it slips or snaps." }),
      ],
      explanation: "For a non-linear graph, the work done is the area found by trapezia or counting squares, not ½Fx.",
      hints: ["Add the areas of the trapezia between successive readings."],
    });
  }
  // Practice structured: loading and unloading a copper wire (8 marks)
  {
    const Fmax = 40, xmax = 6.0e-3, xperm = 4.4e-3, Wload = 0.172;
    const Wback = 0.5 * Fmax * (xmax - xperm);
    b.struct({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`A copper wire is loaded to $${Fmax}\ \text{N}$, at which its extension is $${xmax * 1000}.0\ \text{mm}$, and then unloaded. After unloading its extension is $${xperm * 1000}\ \text{mm}$. The area under the loading curve represents $${Wload}\ \text{J}$.`,
      parts: [
        P.manual({ label: "(a)", marks: 2, stem: "Explain why the wire does not return to its original length.", points: ["The wire was loaded beyond its elastic limit.", "Layers of atoms slipped past one another (plastic deformation), and they stay in their new positions when the load is removed."], modelAnswer: "The load took the wire beyond its elastic limit, so layers of atoms slid over one another; these new positions remain when the load is removed, leaving a permanent extension." }),
        P.num({ label: "(b)", marks: 2, stem: "The unloading line is straight. Calculate the energy released during unloading, in J.", value: Wback, unit: "J", wrong: [0.5 * Fmax * xmax], explanation: t`Unloading triangle: $\tfrac{1}{2} \times 40 \times (6.0 - 4.4) \times 10^{-3} = ${sfStr(Wback, 2)}\ \text{J}$.` }),
        P.num({ label: "(c)", marks: 2, stem: "Calculate the energy dissipated in the wire, in J, to two significant figures.", value: Wload - Wback, sf: 2, unit: "J", wrong: [Wload], explanation: t`$${Wload} - ${sfStr(Wback, 2)} = ${sfStr(Wload - Wback, 2)}\ \text{J}$, transferred to thermal energy as the atoms rearranged.` }),
        P.manual({ label: "(d)", marks: 2, stem: "Describe how the gradient of the unloading line compares with the initial loading line, and explain why.", points: ["The gradients are equal (the lines are parallel).", "Unloading involves only the elastic shortening of the interatomic bonds, which have the same stiffness as at the start."], modelAnswer: "The unloading line is parallel to the initial straight part of the loading curve, because the shortening on unloading is the elastic relaxation of bonds with the same stiffness as before." }),
      ],
      explanation: "Beyond the elastic limit, only the elastic part of the energy is recovered on unloading; the rest is dissipated.",
      hints: ["The recovered energy is a triangle under the unloading line."],
    });
  }

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain, in terms of the atoms in a metal, the difference between elastic and plastic deformation.",
    points: [
      "Elastic: the atoms are pulled slightly apart (bonds stretched) but keep the same neighbours.",
      "When the load is removed the bonds pull the atoms back to their original positions, so the metal returns to its original length.",
      "Plastic: beyond the elastic limit, layers (planes) of atoms slide over one another to new positions, which remain when the load is removed (permanent extension).",
    ],
    modelAnswer: "In elastic deformation the bonds between atoms are stretched slightly but the atoms keep their neighbours, so when the load is removed the bonds pull them back and the metal regains its length. In plastic deformation, beyond the elastic limit, planes of atoms slip past one another into new positions, and these remain when the load is removed, giving a permanent extension.",
    explanation: "Elastic: bonds stretch and recover. Plastic: planes of atoms slip permanently.",
    hints: ["What happens to the bonds, and what happens to the layers of atoms?"],
  });

  b.card("DEFINITION", "**Elastic deformation**", "A change of shape reversed when the load is removed.");
  b.card("DEFINITION", "**Plastic deformation**", "A change of shape that remains (permanent extension) when the load is removed.");
  b.card("DEFINITION", "**Elastic limit**", "The maximum load or stress from which a material still returns to its original length.");
  b.card("FORMULA", "Elastic potential energy (within the limit of proportionality)", t`$E_P = \tfrac{1}{2}Fx = \tfrac{1}{2}kx^2$`);
  b.card("CONCEPT", "Work done stretching a material", "The area under its force-extension graph (any shape).");
  b.card("FORMULA", "Energy per unit volume (ZIMSEC detail)", t`$\tfrac{1}{2}\sigma\varepsilon$, in $\text{J m}^{-3}$`, undefined, { applies: ZIM });
  b.card("CONCEPT", "Unloading a metal beyond its elastic limit", "Straight line parallel to the loading line, meeting the extension axis at the permanent extension.");
  b.card("CONCEPT", "Hysteresis in rubber", "Unloading curve below loading curve; loop area = energy dissipated as thermal energy per cycle.");
});
