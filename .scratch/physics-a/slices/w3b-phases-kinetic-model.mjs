// W3b: aphys.matter.phases-kinetic-model (ZIMSEC only) — kinetic molecular model of solids, liquids and gases,
// intermolecular force and potential energy, density and spacing, melting, boiling, evaporation, Brownian motion.
import { concept, P, t, DATA, chk, sfStr, sciTex, table } from "../lib.mjs";

const { NA, k } = DATA;

concept("aphys.matter.phases-kinetic-model", { file: "matter/phases-kinetic-model", keyPrefix: "matter.phases-kinetic-model" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which statement correctly describes the molecules of a liquid?",
    options: [
      ["Closely packed in a random arrangement, vibrating and moving past one another", "Correct: liquid molecules are about as close as in a solid but have no fixed positions."],
      ["Closely packed in a regular arrangement, vibrating about fixed positions only", "That describes a crystalline solid."],
      ["Far apart in a random arrangement, moving freely between collisions", "That describes a gas; liquid densities are close to solid densities."],
      ["Far apart in a regular arrangement, with strong forces holding them in place", "No phase has widely spaced molecules in fixed regular positions."],
    ],
    answer: "A",
    explanation: "Liquid: close packing (similar density to the solid), short-range order only, molecules vibrate and slide past each other.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The intermolecular potential energy of a pair of molecules is plotted against their separation r. At the equilibrium separation r₀, which statement is correct?",
    options: [
      ["The potential energy is a minimum and the resultant force is zero.", "Correct: F = −dE/dr is zero where the curve has its minimum."],
      ["The potential energy is zero and the force is a maximum attraction.", "The potential energy is zero only at infinite separation."],
      ["The potential energy is a maximum and the force is repulsive.", "The curve has a minimum (a well), not a maximum, at r₀."],
      ["The potential energy is a minimum and the force is the largest attraction.", "The maximum attraction is at a separation larger than r₀, where the curve is steepest."],
    ],
    answer: "A",
    explanation: "Force is minus the gradient of the potential-energy curve; at the minimum the gradient, and so the force, is zero.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why is the specific latent heat of vaporisation of water much larger than its specific latent heat of fusion?",
    options: [
      ["Boiling separates the molecules completely and pushes back the atmosphere, while melting only loosens them.", "Correct: far more bonds are broken and work is done against atmospheric pressure."],
      ["The temperature of the water rises much more during boiling than during melting.", "The temperature is constant during both changes of phase."],
      ["The molecules of steam move more slowly than those of water at the same temperature.", "At the same temperature the mean kinetic energy is the same."],
      ["Melting increases the kinetic energy while boiling increases the potential energy.", "Both changes of phase increase potential energy at constant temperature."],
    ],
    answer: "A",
    explanation: "In melting, each molecule keeps most of its neighbours; in boiling it is separated from all of them, and the large volume increase means work is done against the atmosphere.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "In a Brownian motion experiment, smoke particles in air are viewed through a microscope. What do the observations show?",
    options: [
      ["Air molecules move randomly and rapidly, striking the smoke particles unevenly.", "Correct: the visible particles are pushed about by invisible moving molecules."],
      ["Smoke particles are attracted to one another and form clusters that move.", "Clustering is not observed; each particle moves on its own random path."],
      ["Air molecules can be seen moving in straight lines between collisions.", "Air molecules are far too small to be seen with an optical microscope."],
      ["Convection currents carry the smoke particles round the cell in a steady circulation.", "The motion is random and jerky, not a steady drift."],
    ],
    answer: "A",
    explanation: "Uneven bombardment by fast, randomly moving air molecules gives each smoke particle a randomly changing resultant force.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Under the same conditions, the Brownian motion of smaller smoke particles is observed. Then the air is warmed. How does the motion change in each case?",
    options: [
      ["Smaller particles: more vigorous. Warmer air: more vigorous.", "Correct: smaller mass gives larger accelerations from uneven impacts; faster molecules hit harder."],
      ["Smaller particles: less vigorous. Warmer air: more vigorous.", "A smaller particle has less inertia, so the same uneven impacts move it more."],
      ["Smaller particles: more vigorous. Warmer air: less vigorous.", "Warmer air has faster molecules, so the impacts are larger."],
      ["Smaller particles: less vigorous. Warmer air: less vigorous.", "Both changes increase the random motion."],
    ],
    answer: "A",
    explanation: "Impacts are less likely to balance on a small particle, and its small mass gives a large acceleration; at a higher temperature the molecules move faster.",
    hints: ["Think about mass and about the speed of the air molecules."],
  });
  {
    const rho1 = 1000, rho2 = 1.2;
    const ratio = Math.cbrt(rho1 / rho2);
    b.mcq({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`Water has density $1000\ \text{kg m}^{-3}$. A vapour formed from it has density $1.2\ \text{kg m}^{-3}$. Approximately how many times greater is the mean spacing of the molecules in the vapour than in the water?`,
      options: [
        [sfStr(ratio, 2), "Correct: spacing ∝ (volume per molecule)^(1/3) ∝ ρ^(−1/3)."],
        [String(Math.round(rho1 / rho2)), "This is the ratio of volumes per molecule, not of spacings."],
        [sfStr(Math.sqrt(rho1 / rho2), 2), "Spacing is the cube root of the volume per molecule, not the square root."],
        [sfStr(Math.log10(rho1 / rho2), 2), "There is no logarithm in this relationship."],
      ],
      answer: "A",
      explanation: t`Volume per molecule $\propto 1/\rho$, so the spacing ratio is $\sqrt[3]{1000/1.2} = ${sfStr(ratio, 2)}$.`,
      hints: ["Each molecule occupies a small cube of side d."],
    });
  }
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which solid is amorphous?",
    options: [
      ["Window glass", "Correct: glass has fixed but disordered particle positions."],
      ["Copper", "Metals are crystalline: their atoms form a regular lattice."],
      ["Quartz crystal", "Quartz is crystalline: a regular three-dimensional lattice."],
      ["Ice", "Ice is crystalline (a regular hexagonal arrangement)."],
    ],
    answer: "A",
    explanation: "Amorphous solids, like glass, lack long-range order and soften over a range of temperature.",
  });
  {
    const M = 0.032, rho = 1.43;
    const V = M / (rho * NA);
    b.num({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`Oxygen at $0\ ^\circ\text{C}$ and atmospheric pressure has density $1.43\ \text{kg m}^{-3}$ and molar mass $0.032\ \text{kg mol}^{-1}$. The Avogadro constant is $6.02 \times 10^{23}\ \text{mol}^{-1}$. Calculate the mean volume occupied by one molecule, in $\text{m}^3$, to three significant figures.`,
      value: V, unit: "m³", wrong: [M / (rho * NA) * 1000, rho / (M * NA)],
      explanation: t`1. Mass of one molecule $= M/N_A$.
2. $V = \dfrac{M}{\rho N_A} = \dfrac{0.032}{1.43 \times 6.02 \times 10^{23}} = ${sciTex(V)}\ \text{m}^3$.`,
      hints: ["Volume per molecule = (mass of one molecule) ÷ density."],
    });
  }
  {
    const M = 0.0635, rho = 8960;
    const d = Math.cbrt(M / (rho * NA));
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`Copper has density $8960\ \text{kg m}^{-3}$ and molar mass $0.0635\ \text{kg mol}^{-1}$. Treating each atom as occupying a cube, estimate the spacing of copper atoms, in m, to two significant figures.`,
      value: d, sf: 2, unit: "m", wrong: [M / (rho * NA), Math.sqrt(M / (rho * NA))],
      explanation: t`1. Volume per atom: $V = \dfrac{M}{\rho N_A} = \dfrac{0.0635}{8960 \times 6.02 \times 10^{23}} = ${sciTex(M / (rho * NA))}\ \text{m}^3$.
2. Spacing: $d = \sqrt[3]{V} = ${sciTex(d, 2)}\ \text{m}$.
3. Forgetting the cube root leaves a volume, not a length.`,
      hints: ["Find the volume per atom first, then take the cube root."],
    });
  }
  {
    const L = 1.37e6, M = 0.017;
    const E = (L * M) / NA;
    b.num({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`The specific latent heat of vaporisation of ammonia is $1.37 \times 10^{6}\ \text{J kg}^{-1}$ and its molar mass is $0.017\ \text{kg mol}^{-1}$. Calculate the energy needed to separate one molecule from the liquid, in eV, to two significant figures. ($e = 1.60 \times 10^{-19}\ \text{C}$)`,
      value: E / DATA.e, sf: 2, unit: "eV", wrong: [E, (L / NA) / DATA.e],
      explanation: t`1. Energy per mole $= 1.37 \times 10^{6} \times 0.017 = ${sciTex(L * M)}\ \text{J}$.
2. Per molecule $= ${sciTex(L * M)}/(6.02 \times 10^{23}) = ${sciTex(E)}\ \text{J}$.
3. In eV: $${sciTex(E)}/(1.60 \times 10^{-19}) = ${sfStr(E / DATA.e, 2)}\ \text{eV}$. Leaving out the molar mass gives the energy for $N_A$ kilograms' worth of molecules, which is meaningless.`,
      hints: ["Energy per mole = L × M; divide by N_A."],
    });
  }
  {
    const L = 8.5e5, M = 0.046, T = 351;
    const Em = (L * M) / NA;
    const ke = 1.5 * k * T;
    b.calc({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`Ethanol (molar mass $0.046\ \text{kg mol}^{-1}$, specific latent heat of vaporisation $8.5 \times 10^{5}\ \text{J kg}^{-1}$) boils at $351\ \text{K}$. Calculate the ratio of the energy needed to remove one molecule from the liquid to the mean translational kinetic energy $\tfrac{3}{2}kT$ of a molecule at the boiling point, to two significant figures. ($k = 1.38 \times 10^{-23}\ \text{J K}^{-1}$)`,
      value: Em / ke, sf: 2, wrong: [Em / (k * T), ke / Em],
      explanation: t`1. Energy per molecule $= \dfrac{LM}{N_A} = \dfrac{8.5 \times 10^{5} \times 0.046}{6.02 \times 10^{23}} = ${sciTex(Em)}\ \text{J}$.
2. $\tfrac{3}{2}kT = 1.5 \times 1.38 \times 10^{-23} \times 351 = ${sciTex(ke)}\ \text{J}$.
3. Ratio $= ${sfStr(Em / ke, 2)}$: only molecules with several times the mean energy can escape.`,
      hints: ["Find the energy per molecule from L and M.", "Then divide by 1.5kT."],
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "While a pure solid is melting at its melting point, the mean kinetic energy of its molecules stays constant.",
    answer: true,
    explanation: "True. The temperature is constant during melting; the energy supplied increases the molecules' potential energy.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each observation with its explanation in terms of molecules.",
    pairs: [
      ["Gases are easily compressed", "Molecules are far apart with mostly empty space between them"],
      ["Liquids flow but keep their volume", "Molecules stay close but can move past one another"],
      ["Wet washing dries faster in a wind", "Vapour molecules are carried away, so fewer return to the liquid"],
      ["A solid keeps its shape", "Molecules vibrate about fixed positions held by strong forces"],
    ],
    explanation: "Each property follows from spacing, arrangement and motion of the molecules.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the explanation of cooling by evaporation.",
    template: "Molecules in a liquid have a range of speeds. Only the {{blank:a}} energetic molecules near the surface can escape. The mean kinetic energy of the molecules left behind {{blank:b}}, so the temperature of the liquid {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["most"], choices: ["most", "least"] },
      { id: "b", accepted: ["decreases"], choices: ["decreases", "increases", "stays the same"] },
      { id: "c", accepted: ["falls"], choices: ["falls", "rises", "stays the same"] },
    ],
    explanation: "Losing the fastest molecules lowers the average kinetic energy, and temperature measures that average.",
  });
  b.short({
    d: 1, skill: "RECALL",
    stem: "Name the random, jerky motion of small visible particles suspended in a fluid, caused by molecular impacts.",
    accepted: ["Brownian motion", "Brownian movement"],
    explanation: "**Brownian motion**, first noticed with pollen grains in water.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe how the force between two molecules varies with their separation, as you would sketch it on a graph of force against separation, and relate it to the potential-energy curve.",
    points: [
      "At very small separations the force is large and repulsive (electron clouds overlap).",
      "The force falls to zero at the equilibrium separation r₀.",
      "Beyond r₀ the force is attractive, reaching a maximum attraction and then tending to zero at large separation.",
      "Force = −gradient of the potential-energy curve, so zero force at the potential-energy minimum (r₀) and maximum attraction where the potential-energy curve is steepest beyond r₀.",
    ],
    modelAnswer: "At very small separations the force is large and repulsive. It decreases rapidly and is zero at the equilibrium separation r₀. At larger separations it is attractive, rising to a maximum attraction and then falling towards zero as the separation becomes large. The force equals minus the gradient of the potential-energy curve, so it is zero at the potential-energy minimum, r₀, and the attraction is greatest where that curve is steepest beyond r₀.",
    explanation: "F = −dEp/dr links the two curves.",
    hints: ["Start at small separation and work outwards."],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Compare evaporation and boiling, giving four differences.",
    points: [
      "Evaporation occurs only at the surface; boiling occurs throughout the liquid (bubbles form inside).",
      "Evaporation happens at any temperature; boiling at a fixed temperature for a given pressure.",
      "Evaporation cools the remaining liquid; during boiling the temperature stays constant while energy is supplied.",
      "Evaporation rate depends on surface area, draught and humidity; the boiling point depends on the external pressure.",
    ],
    modelAnswer: "Evaporation takes place only at the surface, at any temperature, and cools the liquid left behind; its rate depends on surface area, temperature, draught and humidity. Boiling takes place throughout the liquid, with bubbles of vapour forming inside it, at a fixed temperature that depends on the external pressure, and the temperature stays constant while energy is supplied.",
    explanation: "Surface v. bulk; any temperature v. fixed temperature; cooling v. constant temperature; factors.",
    hints: ["Think about where, when and what happens to the temperature."],
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 3,
    stem: "Distinguish between crystalline, amorphous and polymeric solids, giving one example of each.",
    points: [
      "Crystalline: particles in a regular repeating 3-D lattice (long-range order), e.g. a metal, salt or quartz.",
      "Amorphous: particles in fixed but disordered positions (no long-range order), e.g. glass.",
      "Polymeric: very long chain molecules (tangled), e.g. rubber or polythene.",
    ],
    modelAnswer: "A crystalline solid such as copper has its particles arranged in a regular repeating lattice. An amorphous solid such as glass has fixed but disordered particle positions, with no long-range order. A polymeric solid such as rubber is made of very long chain molecules tangled together.",
    explanation: "Order (or its absence) and the type of molecule distinguish the three.",
  });

  // Practice structured: the clay water pot (12 marks)
  {
    const m = 4.0, rate = 0.15, L = 2.4e6, c = 4200;
    const Qh = rate * L; // energy removed per hour, J (per kg evaporated)
    const dT = Qh / (m * c);
    b.struct({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: t`Rudo keeps $4.0\ \text{kg}$ of water in a porous clay pot in the shade. Water seeps through the clay and evaporates from the outer surface at $0.15\ \text{kg}$ per hour. At the pot's temperature the specific latent heat of vaporisation of water is $2.4 \times 10^{6}\ \text{J kg}^{-1}$; the specific heat capacity of water is $4200\ \text{J kg}^{-1}\ \text{K}^{-1}$.`,
      parts: [
        P.manual({ label: "(a)", marks: 3, stem: "Explain, in terms of molecules, why evaporation cools the water in the pot.", points: ["Molecules have a range of kinetic energies.", "Only the most energetic molecules at the surface have enough energy to overcome the attraction of their neighbours and escape.", "The mean kinetic energy of the remaining molecules falls, so the temperature falls."], modelAnswer: "The water molecules have a spread of kinetic energies. Only the most energetic ones at the outer surface can overcome the attractive forces of their neighbours and escape. This lowers the mean kinetic energy of the molecules left behind, and since temperature depends on mean kinetic energy, the water cools." }),
        P.num({ label: "(b)", marks: 2, stem: "Calculate the energy removed from the pot by evaporation in one hour, in J, to two significant figures.", value: Qh, sf: 2, unit: "J", wrong: [L], explanation: t`$Q = mL = 0.15 \times 2.4 \times 10^{6} = ${sciTex(Qh, 2)}\ \text{J}$.` }),
        P.num({ label: "(c)", marks: 2, stem: "If no energy entered the pot from the surroundings, calculate the fall in temperature of the 4.0 kg of water in one hour, in K, to two significant figures.", value: dT, sf: 2, unit: "K", wrong: [Qh / c, Qh / (0.15 * c)], explanation: t`$\Delta\theta = \dfrac{Q}{mc} = \dfrac{${sciTex(Qh, 2)}}{4.0 \times 4200} = ${sfStr(dT, 2)}\ \text{K}$.` }),
        P.manual({ label: "(d)", marks: 2, stem: "In practice the water settles at a steady temperature a few degrees below the air temperature. Explain why.", points: ["As the water cools below the air temperature, energy flows into the pot from the warmer surroundings.", "A steady temperature is reached when the rate of energy gained from the surroundings equals the rate of energy removed by evaporation."], modelAnswer: "Once the water is cooler than the air, energy flows in from the surroundings, faster the bigger the temperature difference. The temperature becomes steady when the rate of energy gain equals the rate of energy loss by evaporation." }),
        P.manual({ label: "(e)", marks: 3, stem: "Suggest and explain three conditions that would make the pot cool its water more effectively.", points: ["Dry air (low humidity): fewer vapour molecules return to the surface, so the net evaporation rate is larger.", "A breeze / ventilation: carries vapour away from the surface, increasing the net evaporation rate.", "A larger wet surface area (or a more porous pot) or keeping it in the shade to reduce energy gained by radiation from the Sun."], modelAnswer: "Dry air lets more molecules escape without returning; a breeze removes the vapour near the surface, so evaporation continues quickly; and a larger wet outer area (or keeping the pot shaded so it gains less energy from sunlight) increases the net cooling." }),
      ],
      explanation: "Evaporation removes the most energetic molecules; Q = mL and Q = mcΔθ size the effect.",
      hints: ["Use Q = mL for the evaporated water.", "Use Q = mcΔθ for the water left in the pot."],
    });
    chk(Qh, 3.6e5, 1e-6);
  }
  // Practice structured: densities and spacings (8 marks)
  {
    const M = 0.028, rhoL = 808, rhoG = 1.25;
    const vL = M / (rhoL * NA), vG = M / (rhoG * NA);
    const dL = Math.cbrt(vL), dG = Math.cbrt(vG);
    b.struct({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`Nitrogen (molar mass $0.028\ \text{kg mol}^{-1}$) has these densities:

${table(["Phase", t`$\rho\,/\,\text{kg m}^{-3}$`], [["liquid at 77 K", "808"], ["gas at 273 K and atmospheric pressure", "1.25"]])}

The Avogadro constant is $6.02 \times 10^{23}\ \text{mol}^{-1}$.`,
      parts: [
        P.num({ label: "(a)", marks: 2, stem: t`Calculate the mean spacing of molecules in the liquid, in m, to two significant figures.`, value: dL, sf: 2, unit: "m", wrong: [vL], explanation: t`$V = \dfrac{0.028}{808 \times 6.02 \times 10^{23}} = ${sciTex(vL)}\ \text{m}^3$; $d = \sqrt[3]{V} = ${sciTex(dL, 2)}\ \text{m}$.` }),
        P.num({ label: "(b)", marks: 2, stem: t`Calculate the mean spacing of molecules in the gas, in m, to two significant figures.`, value: dG, sf: 2, unit: "m", wrong: [vG], explanation: t`$V = \dfrac{0.028}{1.25 \times 6.02 \times 10^{23}} = ${sciTex(vG)}\ \text{m}^3$; $d = ${sciTex(dG, 2)}\ \text{m}$.` }),
        P.num({ label: "(c)", marks: 1, stem: "Calculate the ratio of the gas spacing to the liquid spacing, to three significant figures.", value: dG / dL, sf: 3, wrong: [rhoL / rhoG], explanation: t`$\sqrt[3]{808/1.25} = ${sfStr(dG / dL, 3)}$.` }),
        P.manual({ label: "(d)", marks: 3, stem: "Use your answers to explain why a gas is easily compressed while a liquid is not, and why intermolecular forces can be neglected in the gas but not in the liquid.", points: ["In the liquid molecules are about one molecular diameter apart, so compressing them brings electron clouds together and strong repulsion resists it.", "In the gas the spacing is about ten times larger: mostly empty space, so the molecules can be pushed closer easily.", "Intermolecular forces fall off rapidly with separation, so at gas spacings they are negligible except during collisions, while in the liquid they are significant."], modelAnswer: "In the liquid the molecules are about one molecular diameter apart, so pushing them closer meets strong short-range repulsion. In the gas they are roughly ten times further apart, mostly empty space, so the gas compresses easily. Intermolecular forces fall rapidly with distance, so at gas spacings they are negligible except during collisions, whereas in the liquid they hold the molecules together." }),
      ],
      explanation: "Spacing ∝ (M/ρN_A)^(1/3); a density ratio of about 650 gives a spacing ratio of about 9.",
      hints: ["Volume per molecule = M/(ρN_A).", "Take the cube root for a spacing."],
    });
  }

  b.card("DEFINITION", "**Kinetic molecular model**", "Matter is made of molecules in continuous random motion, with forces between them that depend on their separation.");
  b.card("CONCEPT", "Spacing in the three phases", "Solids and liquids: about one molecular diameter apart (similar densities). Gases at room conditions: about ten diameters apart (density about 1/1000).");
  b.card("CONCEPT", "Force and potential energy against separation", "Repulsive at short range, zero at r₀, attractive beyond; potential energy is a minimum at r₀. F = −dEp/dr.");
  b.card("CONCEPT", "Why evaporation cools", "The most energetic surface molecules escape, so the mean kinetic energy (temperature) of the remaining liquid falls.");
  b.card("CONCEPT", "Evaporation v. boiling", "Evaporation: surface only, any temperature, cools. Boiling: throughout, fixed temperature for a given pressure.");
  b.card("CONCEPT", "Brownian motion", "Random jerky motion of visible particles caused by uneven bombardment by invisible, randomly moving molecules.");
  b.card("FORMULA", "Volume and spacing per molecule", t`$V = \dfrac{M}{\rho N_A}$, $d \approx \sqrt[3]{V}$`);
  b.card("FACT", "Changes of phase", "Melting and boiling increase molecular potential energy at constant temperature (constant mean kinetic energy).");
  b.card("CONCEPT", "Crystalline, amorphous, polymeric", "Regular lattice (metals, salt); disordered fixed positions (glass); long chain molecules (rubber, polythene).");
});
