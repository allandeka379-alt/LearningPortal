// W1b: aphys.forces.density-pressure-upthrust — density, pressure, p = ρgh, upthrust, floating, hydrometers, manometers.
import { concept, P, t, chk, DATA, sfStr, dpStr, sciTex, sciPlain, pctUnc } from "../lib.mjs";

const g = DATA.g;
concept("aphys.forces.density-pressure-upthrust", { file: "forces/density-pressure-upthrust", keyPrefix: "forces.density-pressure-upthrust" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which statement defines pressure?",
    options: [
      ["The normal force acting per unit area of a surface", "Correct: p = F/A with F perpendicular to the surface."],
      ["The force acting on a surface multiplied by its area", "Pressure is force divided by area, not multiplied."],
      ["The weight of a fluid per unit volume", "This is ρg (weight per unit volume), not pressure."],
      ["The total force acting on a surface in any direction", "Pressure uses the perpendicular force per unit area."],
    ],
    answer: "A",
    explanation: "Pressure is the normal (perpendicular) force per unit area, in pascals (N m⁻²).",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is the pascal expressed in SI base units?",
    options: [
      [t`$\text{kg m}^{-1}\,\text{s}^{-2}$`, "Correct: N m⁻² = kg m s⁻² × m⁻²."],
      [t`$\text{kg m s}^{-2}$`, "This is the newton, not the pascal."],
      [t`$\text{kg m}^{-2}\,\text{s}^{-2}$`, "The newton already contains one metre; dividing by m² leaves m⁻¹."],
      [t`$\text{kg m}^{2}\,\text{s}^{-2}$`, "This is the joule (N m)."],
    ],
    answer: "A",
    explanation: t`$\text{Pa} = \text{N m}^{-2} = (\text{kg m s}^{-2})\,\text{m}^{-2} = \text{kg m}^{-1}\,\text{s}^{-2}$. Checking $\rho g h$: $\text{kg m}^{-3} \times \text{m s}^{-2} \times \text{m} = \text{kg m}^{-1}\,\text{s}^{-2}$, so the equation is homogeneous.`,
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Three containers with differently shaped sides (one wide at the top, one narrow at the top, one straight-sided) are filled with water to the same depth. How do the pressures due to the water at their bases compare?",
    options: [
      ["They are all equal.", "Correct: p = ρgh depends only on depth, density and g."],
      ["It is greatest in the container that holds the most water.", "The total weight differs, but the pressure at the base depends only on the depth."],
      ["It is greatest in the container that is narrowest at the top.", "The shape of the sides does not change ρgh."],
      ["It is greatest in the container with the largest base area.", "A larger area gives a larger force on the base, not a larger pressure."],
    ],
    answer: "A",
    explanation: "In the derivation of p = ρgh the area cancels, so only the vertical depth matters. The force on each base (pressure × base area) can still differ.",
  });
  {
    const rho = 1030, h = 25;
    const p = rho * g * h;
    b.mcq({
      d: 3, skill: "APPLICATION",
      stem: t`What is the pressure due to the sea water at a depth of $25\ \text{m}$? (Density of sea water $= 1030\ \text{kg m}^{-3}$.)`,
      options: [
        [t`$${sciTex(p)}\ \text{Pa}$`, "Correct: ρgh = 1030 × 9.81 × 25."],
        [t`$${sciTex(p + 1.01e5)}\ \text{Pa}$`, "This adds atmospheric pressure: it is the total pressure, not the pressure due to the water."],
        [t`$${sciTex(rho * h)}\ \text{Pa}$`, "This leaves out g."],
        [t`$${sciTex(1000 * g * h)}\ \text{Pa}$`, "This uses the density of fresh water."],
      ],
      answer: "A",
      explanation: t`$p = \rho g h = 1030 \times 9.81 \times 25 = ${sciTex(p)}\ \text{Pa}$. The total pressure would also include atmospheric pressure, giving $${sciTex(p + 1.01e5)}\ \text{Pa}$.`,
      hints: ["Use p = ρgh with the sea-water density."],
    });
  }
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "A solid steel ball is lowered deeper and deeper into a lake, staying fully submerged. What happens to the upthrust on it? (Treat water and steel as incompressible.)",
    options: [
      ["It stays the same.", "Correct: the pressures on the top and bottom both rise by the same amount, so their difference is unchanged."],
      ["It increases, because the pressure increases with depth.", "Both the top and the bottom pressures increase; the upthrust depends on their difference."],
      ["It decreases, because the water above pushes the ball down harder.", "The extra push on top is matched by an equal extra push underneath."],
      ["It increases until it equals the weight, and the ball then stops sinking.", "A steel ball is denser than water: the upthrust (ρ_water g V) is always less than its weight."],
    ],
    answer: "A",
    explanation: "Upthrust = ρ_fluid g V. With constant fluid density and constant displaced volume it does not depend on depth.",
    hints: ["Upthrust depends on a pressure difference."],
  });
  {
    const ri = 920, rw = 1000;
    b.mcq({
      d: 3, skill: "APPLICATION",
      stem: t`A block of ice (density $920\ \text{kg m}^{-3}$) floats in fresh water (density $1000\ \text{kg m}^{-3}$). What fraction of its volume is above the water surface?`,
      options: [
        ["0.08", "Correct: 0.92 is submerged, so 0.08 is above."],
        ["0.92", "This is the fraction submerged, not the fraction above."],
        ["0.09", "This is (1000 − 920)/920, using the wrong denominator."],
        ["1.09", "A fraction of the volume cannot exceed 1; this is 1000/920."],
      ],
      answer: "A",
      explanation: t`Floating: weight = upthrust, so $V_{\text{sub}}/V = \rho_{\text{ice}}/\rho_{\text{water}} = ${ri / rw}$. Fraction above $= 1 - ${ri / rw} = ${dpStr(1 - ri / rw, 2)}$.`,
      hints: ["Floating: upthrust = weight.", "The question asks for the part above the surface."],
    });
  }
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "A beaker of water stands on a top-pan balance. A metal block hanging from a spring balance is lowered until it is fully under water, without touching the beaker. Which statement is correct?",
    options: [
      ["The spring balance reading falls and the top-pan reading rises by the same amount.", "Correct: the water pushes up on the block (upthrust) and, by Newton's third law, the block pushes down on the water by the same amount."],
      ["The spring balance reading falls and the top-pan reading does not change.", "The upthrust has a third-law partner force on the water, which the top pan feels."],
      ["The spring balance reading does not change and the top-pan reading rises.", "The upthrust supports part of the block's weight, so the spring balance reads less."],
      ["Both readings fall by the weight of water displaced.", "The water is pushed down harder, so the top-pan reading rises, not falls."],
    ],
    answer: "A",
    explanation: "The water exerts an upthrust U on the block, so the spring balance reads W − U. The block exerts a downward force U on the water, so the top pan reads U more. Total supported by both is unchanged.",
    hints: ["What is the Newton's third law partner of the upthrust?"],
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: t`A block of mass $2.70\ \text{kg}$ has a volume of $1.00 \times 10^{-3}\ \text{m}^3$. Calculate its density, in $\text{kg m}^{-3}$.`,
    value: 2.7 / 1e-3, unit: "kg/m³", wrong: [2.7 * 1e-3],
    explanation: t`$\rho = m/V = 2.70 / (1.00 \times 10^{-3}) = 2700\ \text{kg m}^{-3}$ (aluminium).`,
  });
  {
    const p0 = 1.01e5, h = 3.5;
    const p = p0 + 1000 * g * h;
    b.num({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`Calculate the total pressure on the bottom of a swimming pool $3.5\ \text{m}$ deep. Take atmospheric pressure as $1.01 \times 10^{5}\ \text{Pa}$ and the density of water as $1000\ \text{kg m}^{-3}$. Give your answer in Pa to three significant figures.`,
      value: p, unit: "Pa", wrong: [1000 * g * h, p0 + 1000 * h],
      explanation: t`$p = p_0 + \rho g h = 1.01 \times 10^{5} + 1000 \times 9.81 \times 3.5 = ${sciTex(p)}\ \text{Pa}$. The water alone contributes $${sciTex(1000 * g * h)}\ \text{Pa}$.`,
      hints: ["Add atmospheric pressure to ρgh."],
    });
  }
  {
    const V = 4.0e-3;
    const U = 1000 * g * V;
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A submersible borehole pump has a volume of $4.0 \times 10^{-3}\ \text{m}^3$. Calculate the upthrust on it when it is fully submerged in water, in N, to three significant figures.`,
      value: U, unit: "N", wrong: [1000 * V, U / g],
      explanation: t`1. Upthrust = weight of water displaced $= \rho g V$.
2. $= 1000 \times 9.81 \times 4.0 \times 10^{-3} = ${sfStr(U, 3)}\ \text{N}$.
3. Forgetting $g$ gives the mass of water displaced (4.0 kg), not a force.`,
      hints: ["Archimedes: upthrust = weight of fluid displaced."],
    });
  }
  {
    const m = 0.54, rAl = 2700, rOil = 850;
    const V = m / rAl;
    const U = rOil * g * V, W = m * g;
    b.calc({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: t`An aluminium block of mass $0.540\ \text{kg}$ (density $2700\ \text{kg m}^{-3}$) hangs from a newton meter, fully immersed in oil of density $850\ \text{kg m}^{-3}$. Calculate the reading on the newton meter, in N, to three significant figures.`,
      value: W - U, unit: "N", wrong: [W - 1000 * g * V, W],
      explanation: t`1. Volume $V = m/\rho = 0.540/2700 = ${sciTex(V, 2)}\ \text{m}^3$.
2. Upthrust $= \rho_{\text{oil}} g V = 850 \times 9.81 \times ${sciTex(V, 2)} = ${sfStr(U, 3)}\ \text{N}$.
3. Weight $= 0.540 \times 9.81 = ${sfStr(W, 3)}\ \text{N}$.
4. Reading $= ${sfStr(W, 3)} - ${sfStr(U, 3)} = ${sfStr(W - U, 3)}\ \text{N}$. (Using the density of water for the oil gives $${sfStr(W - 1000 * g * V, 3)}\ \text{N}$.)`,
      hints: ["Find the volume from the mass and density of aluminium.", "Upthrust uses the density of the oil."],
    });
  }
  {
    const L = 12, Wd = 4.0, dm = 18000;
    const dd = dm / (1000 * L * Wd);
    chk(dd, 0.375, 1e-12);
    b.calc({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: t`A barge on a lake has vertical sides and a rectangular horizontal cross-section $12\ \text{m}$ long and $4.0\ \text{m}$ wide at the waterline. A load of $18$ tonnes ($1.8 \times 10^{4}\ \text{kg}$) is placed on it. By how much does it sink, in m? (Density of water $1000\ \text{kg m}^{-3}$.)`,
      value: dd, unit: "m", wrong: [dd * g, dm / (1000 * L)],
      explanation: t`1. Floating: the extra upthrust equals the extra weight, so $\rho g A\,\Delta d = \Delta m\,g$.
2. $g$ cancels: $\Delta d = \dfrac{\Delta m}{\rho A} = \dfrac{1.8 \times 10^{4}}{1000 \times 12 \times 4.0} = ${dd}\ \text{m}$.
3. The barge displaces an extra $18\ \text{m}^3$ of water, whose mass equals the load.`,
      hints: ["Extra upthrust = extra weight.", "Extra volume displaced = area × extra depth."],
    });
  }
  {
    const rHg = 13600, dh = 0.042;
    const p = rHg * g * dh;
    b.num({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A mercury manometer connected to a gas supply shows the mercury in the open arm $4.2\ \text{cm}$ higher than in the arm connected to the gas. Calculate the excess pressure of the gas above atmospheric pressure, in Pa, to three significant figures. (Density of mercury $= 13\,600\ \text{kg m}^{-3}$.)`,
      value: p, unit: "Pa", wrong: [rHg * g * 4.2, 1000 * g * dh],
      explanation: t`$\Delta p = \rho g \Delta h = 13\,600 \times 9.81 \times 0.042 = ${sfStr(p, 3)}\ \text{Pa}$. Using 4.2 instead of 0.042 m gives an answer 100 times too large.`,
      hints: ["Convert cm to m."],
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The upthrust on a fully submerged object depends on the density of the object.",
    answer: false,
    explanation: "False. Upthrust = ρ_fluid g V_displaced. A steel ball and a wooden ball of the same volume, both fully submerged, receive the same upthrust; whether they float depends on comparing it with their weights.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each device or structure with the principle it depends on.",
    pairs: [
      ["hydrometer", "floats lower in a less dense liquid to displace its own weight"],
      ["U-tube manometer", "height difference of liquid measures a pressure difference, ρgΔh"],
      ["dam wall thicker at the base", "pressure in the water increases with depth"],
      ["submarine taking water into its tanks", "average density increased above that of sea water, so it sinks"],
    ],
    explanation: "Each application follows from p = ρgh or from upthrust = weight of fluid displaced.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete Archimedes' principle.",
    template: "The upthrust on an object in a fluid is equal to the {{blank:a}} of the fluid {{blank:b}} by the object.",
    blanks: [
      { id: "a", accepted: ["weight"], choices: ["weight", "mass", "volume", "density"] },
      { id: "b", accepted: ["displaced"], choices: ["displaced", "absorbed", "heated", "compressed"] },
    ],
    explanation: "Upthrust = weight of fluid displaced = ρ_fluid g V.",
  });
  b.short({
    d: 1, skill: "RECALL",
    stem: "Give the name of the SI unit of pressure.",
    accepted: ["pascal", "pascals", "Pa"],
    wrong: ["newton"],
    explanation: "The **pascal** (Pa): 1 Pa = 1 N m⁻².",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: t`Show that the pressure due to a column of liquid of density $\rho$ and height $h$ is $\rho g h$.`,
    points: [
      t`Consider a column of cross-sectional area $A$: volume $= Ah$.`,
      t`Mass $= \rho A h$.`,
      t`Weight $= \rho A h g$.`,
      t`Pressure $= \text{weight}/A = \rho g h$ (the area cancels).`,
    ],
    modelAnswer: t`Take a vertical column of liquid of cross-sectional area $A$ and height $h$. Its volume is $Ah$, so its mass is $\rho A h$ and its weight is $\rho A h g$. This weight acts on the area $A$, so the pressure is $\rho A h g / A = \rho g h$.`,
    explanation: "Each step from volume to mass to weight to pressure earns a mark.",
    hints: ["Start with a column of area A."],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain, in terms of pressure, why an object immersed in water experiences an upward force.",
    points: [
      "Pressure in a fluid increases with depth.",
      "The lower surface of the object is deeper than the upper surface, so the pressure (and force) on it is greater.",
      "The upward force on the bottom exceeds the downward force on the top (side forces cancel), giving a resultant upward force: the upthrust.",
    ],
    modelAnswer: "Pressure in water increases with depth. The bottom of the object is deeper than its top, so the water pushes up on the bottom with a larger force than it pushes down on the top, while the horizontal forces on the sides cancel. The resultant is an upward force, the upthrust.",
    explanation: "Upthrust is the resultant of the pressure forces over the whole surface.",
    hints: ["Compare the pressure at the top and bottom faces."],
  });

  // Practice structured: density of a liquid from upthrust (12 marks)
  {
    const Wair = 4.62, Wwater = 2.98, Wliq = 3.21; // N, newton-meter readings for a brass weight
    const Uw = Wair - Wwater, Ul = Wair - Wliq;
    const rho = (Ul / Uw) * 1000;
    const dW = 0.02;
    const pctUw = pctUnc(2 * dW, Uw), pctUl = pctUnc(2 * dW, Ul);
    const pctRho = pctUw + pctUl;
    b.struct({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`Nyasha hangs a brass weight from a newton meter. It reads $${Wair}\ \text{N}$ in air, $${Wwater}\ \text{N}$ when the weight is fully immersed in water (density $1000\ \text{kg m}^{-3}$) and $${Wliq}\ \text{N}$ when it is fully immersed in cooking oil. Each reading has an uncertainty of $\pm ${dW}\ \text{N}$.`,
      parts: [
        P.num({ label: "(a)", marks: 1, stem: "Calculate the upthrust in water, in N.", value: Uw, dp: 2, unit: "N", wrong: [Wwater], explanation: t`$${Wair} - ${Wwater} = ${dpStr(Uw, 2)}\ \text{N}$.` }),
        P.num({ label: "(b)", marks: 2, stem: t`Calculate the volume of the brass weight, in $\text{m}^3$, to three significant figures.`, value: Uw / (1000 * g), unit: "m³", wrong: [Uw / 1000], explanation: t`$V = \dfrac{U}{\rho g} = \dfrac{${dpStr(Uw, 2)}}{1000 \times 9.81} = ${sciTex(Uw / (1000 * g))}\ \text{m}^3$.` }),
        P.num({ label: "(c)", marks: 2, stem: t`Show that the density of the oil is $\rho_{\text{oil}} = 1000 \times \dfrac{U_{\text{oil}}}{U_{\text{water}}}$ and calculate it, in $\text{kg m}^{-3}$, to three significant figures.`, value: rho, unit: "kg/m³", wrong: [1000 * (Wliq / Wwater)],
          explanation: t`The same volume is displaced each time, so $U \propto \rho_{\text{fluid}}$: $\rho_{\text{oil}} = 1000 \times \dfrac{${dpStr(Ul, 2)}}{${dpStr(Uw, 2)}} = ${sfStr(rho, 3)}\ \text{kg m}^{-3}$.` }),
        P.num({ label: "(d)", marks: 3, stem: t`Each upthrust is the difference of two readings. Calculate the percentage uncertainty in the density of the oil, to two significant figures.`, value: pctRho, sf: 2, unit: "%", wrong: [pctUnc(dW, Uw) + pctUnc(dW, Ul)],
          explanation: t`Absolute uncertainty in each upthrust $= 0.02 + 0.02 = 0.04\ \text{N}$ (uncertainties add for a difference). Percentages: $\dfrac{0.04}{${dpStr(Uw, 2)}} \times 100 = ${sfStr(pctUw, 2)}\%$ and $\dfrac{0.04}{${dpStr(Ul, 2)}} \times 100 = ${sfStr(pctUl, 2)}\%$; for the quotient add them: $${sfStr(pctRho, 2)}\%$.` }),
        P.manual({ label: "(e)", marks: 2, stem: "Explain why the percentage uncertainty is large even though each reading is precise to 0.02 N.", points: ["The upthrust is the small difference between two large, similar readings.", "The absolute uncertainties add for the difference, so the uncertainty is a large fraction of a small number."], modelAnswer: "Each upthrust is the difference between two similar readings, so it is small, while the absolute uncertainties of the two readings add. The uncertainty is therefore a large percentage of the upthrust." }),
        P.manual({ label: "(f)", marks: 2, stem: "Suggest two improvements to reduce the uncertainty.", points: ["Use a larger volume of object (bigger upthrust) / a less dense object so the upthrust is a bigger fraction of the reading.", "Use a more precise force sensor (e.g. a top-pan balance under the beaker reading the upthrust directly) / repeat readings and average."], modelAnswer: "Use an object with a larger volume so the upthrust is larger, and measure the upthrust directly with a top-pan balance under the beaker (which reads the extra downward force), repeating each reading and averaging." }),
      ],
      explanation: "The ratio of upthrusts for the same displaced volume equals the ratio of fluid densities. The difference of two readings carries a large percentage uncertainty.",
      hints: ["Upthrust = reading in air − reading in liquid.", "Uncertainties add for a difference; percentages add for a quotient."],
    });
  }
  // Practice structured: a hydrometer (8 marks)
  {
    const m = 0.024, A = 1.2e-4;
    const d1 = m / (1000 * A);
    const rhoL = 1250;
    const d2 = m / (rhoL * A);
    b.struct({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: t`A simple hydrometer is a uniform glass tube of mass $0.024\ \text{kg}$ and cross-sectional area $1.2 \times 10^{-4}\ \text{m}^2$, weighted at the bottom so that it floats upright.`,
      parts: [
        P.manual({ label: "(a)", marks: 1, stem: "State the condition for the hydrometer to float.", points: ["The upthrust equals its weight (weight of liquid displaced = weight of hydrometer)."], modelAnswer: "The upthrust on it equals its weight." }),
        P.num({ label: "(b)", marks: 2, stem: "Calculate the depth to which it sinks in water (density 1000 kg m⁻³), in m.", value: d1, unit: "m", wrong: [d1 * g], explanation: t`$\rho A d g = mg \Rightarrow d = \dfrac{m}{\rho A} = \dfrac{0.024}{1000 \times 1.2 \times 10^{-4}} = ${d1}\ \text{m}$.` }),
        P.num({ label: "(c)", marks: 2, stem: t`Calculate the depth to which it sinks in a sugar solution of density $${rhoL}\ \text{kg m}^{-3}$, in m.`, value: d2, unit: "m", wrong: [d1 * (rhoL / 1000)], explanation: t`$d = \dfrac{0.024}{${rhoL} \times 1.2 \times 10^{-4}} = ${d2}\ \text{m}$: it floats higher in the denser liquid.` }),
        P.manual({ label: "(d)", marks: 3, stem: "Explain why the density markings on a hydrometer stem are not equally spaced, and why a narrow stem makes it more sensitive.", points: ["The depth is inversely proportional to the density (d = m/ρA), not proportional.", "So equal steps in density give unequal steps in depth (the marks crowd together at higher densities).", "A smaller A gives a larger change in depth for a given change in density, so readings are easier to distinguish."], modelAnswer: "Since d = m/(ρA), the depth is inversely proportional to the density, so equal density steps give unequal changes in depth: the marks get closer together at high densities. A narrower stem (smaller A) gives a bigger change in depth for the same change in density, making the scale more sensitive." }),
      ],
      explanation: "A floating hydrometer displaces its own weight of liquid, so it sinks to a depth m/(ρA).",
      hints: ["Upthrust = ρ A d g.", "How does d depend on ρ?"],
    });
  }

  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Explain why a ship with a steel hull floats even though steel is much denser than water, and why it floats lower in the water when it is loaded.",
    points: [
      "The hull encloses a large volume of air, so the average density of the ship (total mass ÷ total volume) is less than that of water.",
      "It sinks until the weight of water displaced equals its weight (upthrust = weight), with part of the hull still above the surface.",
      "Loading increases the weight, so a larger upthrust is needed.",
      "So it must displace a larger volume of water and sinks lower; if the volume needed exceeds the hull's volume, it sinks.",
    ],
    modelAnswer: "The hull encloses air, so the ship's average density is less than water's. It settles until the water it displaces weighs as much as the ship, so upthrust equals weight with part of the hull above the surface. A load increases the weight, so a larger upthrust is needed; the ship sinks lower to displace more water, and would sink completely if it needed to displace more than its whole hull volume.",
    explanation: "Floating depends on average density and on displacing a weight of water equal to the ship's weight.",
    hints: ["Think about the average density of the whole ship.", "Floating: upthrust = weight."],
  });

  b.card("DEFINITION", "**Density**", "Mass per unit volume, ρ = m/V, in kg m⁻³.");
  b.card("DEFINITION", "**Pressure**", "Normal force per unit area, p = F/A, in Pa (N m⁻²).");
  b.card("FORMULA", "Pressure difference in a fluid", t`$\Delta p = \rho g \Delta h$; total pressure at depth $h$: $p_0 + \rho g h$.`);
  b.card("DEFINITION", "**Upthrust**", "The resultant upward force on an immersed object, caused by greater pressure on its lower surface than on its upper surface.");
  b.card("FORMULA", "Archimedes' principle", t`Upthrust $= \rho_{\text{fluid}} g V_{\text{displaced}}$ = weight of fluid displaced.`);
  b.card("CONCEPT", "Condition for floating", "Upthrust = weight; fraction immersed = ρ_object / ρ_fluid.");
  b.card("FACT", "Why does a hydrometer float lower in a less dense liquid?", "It must displace a larger volume to get an upthrust equal to its weight.");
  b.card("FORMULA", "Manometer reading", t`Excess pressure $= \rho g \Delta h$, where $\Delta h$ is the difference in liquid levels.`);
  b.card("CONCEPT", "Does upthrust on a submerged incompressible object change with depth?", "No: the top and bottom pressures increase equally, so their difference is unchanged.");
});
