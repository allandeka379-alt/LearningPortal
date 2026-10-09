import { concept, P, t } from "../lib.mjs";

const r = (x, n = 3) => Number(x.toPrecision(n));
const Z = ["zimsec"];
const C = ["cambridge"];

// =====================================================================================================================
concept("phys.thermal.states-of-matter", {
  file: "thermal/states-of-matter",
  keyPrefix: "thermal.states",
  objectives: { cambridge: ["2.1.1.1", "2.1.1.2"], zimsec: ["7.1.1"] },
}, (q) => {
  q.mcq({ d: 1, skill: "RECALL",
    stem: "Which state of matter has a fixed volume but takes the shape of its container?",
    options: [["Solid", "A solid has a fixed shape too."], ["Liquid", "Correct."], ["Gas", "A gas has no fixed volume."], ["None of them", "Liquids behave this way."]],
    answer: "B", explanation: "A liquid has a fixed volume but flows to take the shape of its container." });

  q.mcq({ d: 1, skill: "RECALL",
    stem: "What is the change of state from gas to liquid called?",
    options: [["Evaporation", "That is liquid to gas."], ["Condensation", "Correct."], ["Melting", "That is solid to liquid."], ["Freezing", "That is liquid to solid."]],
    answer: "B", explanation: "Gas to liquid is condensation (condensing)." });

  q.match({ d: 2, skill: "RECALL",
    stem: "Match each change of state with its name.",
    pairs: [["Solid to liquid", "Melting"], ["Liquid to solid", "Freezing (solidifying)"], ["Liquid to gas", "Boiling or evaporating"], ["Gas to liquid", "Condensing"]],
    explanation: "Heating: melting, boiling/evaporating. Cooling: condensing, freezing." });

  q.tf({ d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Gases can be compressed much more easily than liquids.",
    answer: true, explanation: "Gas particles are far apart with lots of empty space between them; liquid particles are already touching." });

  q.mcq({ d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which property belongs to a gas but NOT to a liquid?",
    options: [["It can flow and take the shape of its container.", "Liquids also flow and take the shape of their container."], ["It fills the whole of any container it is put in.", "Correct."], ["It has a fixed volume, whatever its container.", "Only solids and liquids do."], ["It has a fixed shape, whatever its container.", "Only solids do."]],
    answer: "B", explanation: "A gas spreads out to fill any container; a liquid keeps its volume." });

  q.mcq({ d: 2, skill: "UNDERSTANDING",
    stem: "The white 'steam' seen above a boiling kettle is:",
    options: [["Water vapour, the invisible gas that leaves the boiling water", "Water vapour is invisible; what you see has condensed."], ["Tiny droplets of liquid water that have condensed in the cooler air", "Correct."], ["Smoke from dust burning on the hot element inside the kettle", "It is water, not smoke."], ["Air that has been heated by the kettle and glows faintly", "Hot air is invisible."]],
    answer: "B", explanation: "Water vapour is invisible; the white cloud is vapour that has condensed into tiny liquid droplets." });

  q.short({ d: 2, skill: "RECALL", applies: Z,
    stem: "What name is given to a change directly from solid to gas without melting?",
    accepted: ["sublimation", "subliming", "sublime"], wrong: ["evaporation"],
    explanation: "Sublimation, as shown by iodine or dry ice (solid carbon dioxide)." });

  q.mcq({ d: 3, skill: "ANALYSIS",
    stem: "Washing hung on a line dries on a warm day although the water never reaches 100 °C. Which change of state is happening?",
    options: [["Evaporation", "Correct: it happens at the surface at any temperature."], ["Boiling", "Boiling needs the boiling point."], ["Condensation", "That is gas to liquid."], ["Melting", "No solid is present."]],
    answer: "A", explanation: "Evaporation happens at the surface of a liquid at any temperature.",
    hints: ["Which change happens below the boiling point?"] });

  q.fib({ d: 2, skill: "RECALL",
    stem: "Complete the sentence.",
    template: "A solid has a fixed shape and a fixed {{blank:a}}; a gas has {{blank:b}} fixed shape or volume.",
    blanks: [{ id: "a", input: "select", choices: ["volume", "temperature", "colour"], accepted: ["volume"], wrong: "temperature" }, { id: "b", input: "select", choices: ["no", "a"], accepted: ["no"], wrong: "a" }],
    explanation: "Solids: fixed shape and volume. Gases: neither." });

  q.mcq({ d: 3, skill: "ANALYSIS",
    stem: "On a cold night, dew forms on grass. Which description is correct?",
    options: [["Water vapour in the air condenses on the cold grass.", "Correct."], ["The grass gives out water from its leaves, which then freezes.", "Dew is liquid, formed from the air."], ["A fine rain falls from a clear sky without clouds.", "Dew is not rain."], ["Ice that formed on the grass earlier melts.", "No ice is needed for dew."]],
    answer: "A", explanation: "Air cools against the cold grass; its water vapour condenses into liquid droplets.",
    hints: ["Where does the water come from?"] });

  q.card("DEFINITION", "Properties of a **solid**?", "Fixed shape and fixed volume; cannot flow; hardly compressible.");
  q.card("DEFINITION", "Properties of a **liquid**?", "Fixed volume, no fixed shape; flows; hardly compressible.");
  q.card("DEFINITION", "Properties of a **gas**?", "No fixed shape or volume; fills its container; flows; easily compressed.");
  q.card("VOCABULARY", "Name the four main changes of state.", "Melting, freezing (solidifying), boiling/evaporating, condensing.");
  q.card("CONCEPT", "Evaporation vs boiling?", "Evaporation: at the surface, any temperature. Boiling: throughout, at the boiling point.");
  q.card("VOCABULARY", "What is sublimation?", "A direct change from solid to gas (e.g. iodine, dry ice).", undefined, { applies: Z });
  q.card("CONCEPT", "Is the white 'steam' from a kettle a gas?", "No: it is tiny droplets of condensed liquid water; water vapour is invisible.");
});

// =====================================================================================================================
concept("phys.thermal.particle-model", {
  file: "thermal/particle-model",
  keyPrefix: "thermal.particles",
  objectives: { cambridge: ["2.1.2.1", "2.1.2.5"], zimsec: ["7.1.1", "7.1.2"] },
}, (q) => {
  q.mcq({ d: 1, skill: "RECALL",
    stem: "How are the particles arranged in a solid?",
    options: [["Close together in a regular pattern, vibrating about fixed positions", "Correct."], ["Far apart, moving randomly and quickly in all directions", "That is a gas."], ["Close together but free to slide past one another at random", "That is a liquid."], ["Far apart in a regular pattern, each vibrating about its own fixed point", "Solid particles are close together."]],
    answer: "A", explanation: "Solid particles are packed in a regular lattice and vibrate about fixed positions." });

  q.mcq({ d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What happens to the particles of a gas when it is heated?",
    options: [["They move faster on average.", "Correct: higher temperature means higher average kinetic energy."], ["They get bigger.", "Particles do not grow."], ["They stop moving.", "They speed up."], ["They turn into a liquid.", "Heating a gas does not condense it."]],
    answer: "A", explanation: "Temperature is linked to the average kinetic energy of the particles: heating makes them move faster." });

  q.num({ d: 2, skill: "RECALL", daily: true,
    stem: "What is absolute zero in degrees Celsius? (Give the whole-number value used at O-Level.)",
    value: -273, unit: "°C", wrong: [0, 273, -100],
    explanation: "Absolute zero is −273 °C (0 K), the lowest possible temperature, where particles have the least kinetic energy." });

  q.mcq({ d: 2, skill: "UNDERSTANDING",
    stem: "Smoke particles in a glass cell are viewed through a microscope. They move about randomly in tiny jerks. What causes this?",
    options: [["Collisions with fast-moving, invisible air molecules", "Correct: Brownian motion."], ["Convection currents in the air inside the cell", "The random jerky motion is not a steady current."], ["The smoke particles are alive and swim about.", "Smoke is not alive."], ["The light from the microscope pushes them about.", "Not the cause."]],
    answer: "A", explanation: "Air molecules hit each smoke particle unevenly from different sides, jostling it randomly: Brownian motion." });

  q.tf({ d: 2, skill: "UNDERSTANDING",
    stem: "In Brownian motion, the bright specks seen moving under the microscope are air molecules.",
    answer: false, explanation: "The specks are smoke particles, which are big enough to see; the air molecules hitting them are far too small to see." });

  q.match({ d: 2, skill: "UNDERSTANDING",
    stem: "Match each state with the motion of its particles.",
    pairs: [["Solid", "Vibrate about fixed positions"], ["Liquid", "Slide past each other while staying close"], ["Gas", "Move fast and randomly, far apart"]],
    explanation: "Particle motion increases from solid to liquid to gas." });

  q.mcq({ d: 3, skill: "ANALYSIS", applies: C,
    stem: "Why can light, fast-moving air molecules move much heavier smoke particles?",
    options: [["Many unequal collisions on different sides give a resultant push", "Correct."], ["Air molecules are heavier than the smoke particles they hit.", "They are much lighter."], ["The smoke particles are weightless, so any touch moves them.", "They have mass."], ["Air molecules attract the smoke particles strongly towards them.", "The cause is collisions."]],
    answer: "A", explanation: "Each collision is tiny, but there are enormous numbers, and at any moment more hit one side than another, so the particle jerks about.",
    hints: ["Think about the number of collisions per second."] });

  q.mcq({ d: 2, skill: "UNDERSTANDING", applies: Z,
    stem: "A few drops of perfume are sprayed at the front of a classroom. Soon the smell reaches the back. What process is this?",
    options: [["Diffusion", "Correct: random motion spreads the particles."], ["Condensation", "No change to liquid."], ["Brownian motion", "That is the jostling of visible particles."], ["Conduction", "That is energy transfer through materials."]],
    answer: "A", explanation: "Perfume particles spread from high to low concentration by their random motion: diffusion." });

  q.mcq({ d: 3, skill: "ANALYSIS",
    stem: "Why can a gas be compressed easily but a solid cannot?",
    options: [["Gas particles have empty space between them; solid particles touch.", "Correct."], ["Gas particles are smaller and softer, so they can be squeezed.", "Particle size is not the reason."], ["Gas particles do not move, so they can be pushed together.", "They move fast."], ["Solids have no particles, so there is nothing to squeeze.", "All matter is made of particles."]],
    answer: "A", explanation: "Compression pushes particles closer; only gases have large gaps to close.",
    hints: ["Compare the spacing of particles in each state."] });

  q.struct({ d: 3, skill: "UNDERSTANDING", examStyle: true,
    stem: "A learner places a crystal of potassium permanganate at the bottom of a beaker of still, cold water and watches it over an hour.",
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "Describe what she sees and name the process.",
        points: ["The purple colour slowly spreads through the water (from the crystal outwards)", "This is diffusion"] }),
      P.manual({ label: "(b)", marks: 2, stem: "Explain her observations using the particle model.",
        points: ["Water and permanganate particles move randomly and collide", "so permanganate particles spread from where they are concentrated to where they are not"] }),
      P.mcq({ label: "(c)", stem: "What would happen if the water were warm?", options: [["The colour would spread faster.", "Correct: particles move faster."], ["The colour would spread more slowly.", "Particles move faster when warm."], ["The colour would not spread.", "It still spreads."], ["The water would turn solid.", "No."]], answer: "A", explanation: "Higher temperature means faster particles, so diffusion is faster." }),
    ],
    explanation: "The colour spreads by diffusion, caused by the random motion of particles; warmer water speeds it up.",
    hints: ["Particles are always moving randomly."] });

  q.card("CONCEPT", "Particles in a solid?", "Close together, regular pattern, vibrate about fixed positions; strong forces.");
  q.card("CONCEPT", "Particles in a liquid?", "Close together, irregular, slide past each other.");
  q.card("CONCEPT", "Particles in a gas?", "Far apart, random arrangement, move fast in all directions; very weak forces.");
  q.card("CONCEPT", "How is temperature related to particles?", "Higher temperature = higher average kinetic energy of the particles.");
  q.card("FACT", "What is absolute zero?", "−273 °C (0 K): the lowest possible temperature; particles have least kinetic energy.");
  q.card("DEFINITION", "What is **Brownian motion**?", "Random jerky motion of microscopic particles (smoke, pollen) caused by collisions with fluid molecules.");
  q.card("DEFINITION", "What is **diffusion**?", "Spreading of particles from high to low concentration by random motion.", undefined, { applies: Z });
});

// =====================================================================================================================
concept("phys.thermal.gas-laws", {
  file: "thermal/gas-laws",
  keyPrefix: "thermal.gas",
  objectives: { cambridge: ["2.1.3.1", "2.1.3.2"], zimsec: ["7.1.3", "7.1.4"] },
}, (q) => {
  q.mcq({ d: 1, skill: "RECALL",
    stem: "What causes the pressure of a gas on the walls of its container?",
    options: [["Gas particles colliding with the walls", "Correct."], ["The weight of the container", "Not the cause."], ["Particles sticking to the walls of the container", "They bounce off."], ["Heat rising", "Not the cause."]],
    answer: "A", explanation: "Each collision pushes on the wall; billions of collisions produce the pressure." });

  q.num({ d: 2, skill: "APPLICATION", daily: true,
    stem: "Convert 35 °C into kelvin.",
    value: 308, unit: "K", wrong: [-238, 35, 238],
    explanation: "T (K) = θ (°C) + 273 = 35 + 273 = 308 K." });

  q.num({ d: 2, skill: "APPLICATION", daily: true,
    stem: "Convert 250 K into degrees Celsius.",
    value: -23, unit: "°C", wrong: [523, 23, -250],
    explanation: "θ = T − 273 = 250 − 273 = −23 °C." });

  q.mcq({ d: 2, skill: "UNDERSTANDING",
    stem: "A sealed can of gas is heated. Its volume cannot change. What happens to the pressure, and why?",
    options: [["It increases: faster particles hit the walls harder and more often.", "Correct."], ["It decreases: the particles spread out as they speed up.", "They cannot spread out; the volume is fixed."], ["It stays the same: the volume and the gas are both fixed.", "Temperature also affects pressure."], ["It increases: the particles get bigger and so fill more of the space inside.", "Particles do not grow."]],
    answer: "A", explanation: "Faster particles collide with the walls more frequently and with more force, so the pressure rises." });

  q.mcq({ d: 2, skill: "UNDERSTANDING",
    stem: "A gas is squashed into a smaller volume at constant temperature. Why does its pressure increase?",
    options: [["The particles hit each unit area of wall more often.", "Correct."], ["The particles move faster in the smaller space.", "At constant temperature their speed is unchanged."], ["The particles get heavier as they are squeezed.", "Their mass is unchanged."], ["There are more particles in the container now.", "The number of particles is fixed."]],
    answer: "A", explanation: "In a smaller space the same particles at the same speed hit the walls more often." });

  q.num({ d: 3, skill: "APPLICATION",
    stem: t`A fixed mass of gas has a volume of $600\ \text{cm}^3$ at a pressure of $100\ \text{kPa}$. At constant temperature it is compressed to $150\ \text{cm}^3$. What is its new pressure?`,
    value: 400, unit: "kPa", wrong: [25, 150, 900],
    explanation: t`$p_1V_1 = p_2V_2$: $100 \times 600 = p_2 \times 150$, so $p_2 = 400\ \text{kPa}$.`,
    hints: ["Use Boyle's law: p₁V₁ = p₂V₂."] });

  q.num({ d: 3, skill: "APPLICATION",
    stem: t`A bubble of air has a volume of $1.5\ \text{cm}^3$ at the bottom of a lake, where the pressure is $250\ \text{kPa}$. It rises to the surface, where the pressure is $100\ \text{kPa}$. If its temperature stays the same, what is its volume at the surface?`,
    value: 3.75, answer: "3.75", unit: "cm³", tol: 0.05, wrong: [0.6, 1.5, 375],
    explanation: t`$V_2 = \dfrac{p_1V_1}{p_2} = \dfrac{250 \times 1.5}{100} = 3.75\ \text{cm}^3$.`,
    hints: ["Lower pressure means a larger volume.", "Use p₁V₁ = p₂V₂."] });

  q.mcq({ d: 3, skill: "ANALYSIS",
    stem: "For a fixed mass of gas at constant temperature, which graph is a straight line through the origin?",
    options: [["p against 1/V", "Correct: p is proportional to 1/V."], ["p against V", "This is a curve."], ["V against T in °C", "Not through the origin, and not at constant temperature."], ["pV against V", "This is a horizontal line."]],
    answer: "A", explanation: "Boyle's law, pV = constant, means p ∝ 1/V: a straight line through the origin when p is plotted against 1/V.",
    hints: ["If pV = constant, then p = constant × (1/V)."] });

  q.num({ d: 3, skill: "APPLICATION", applies: Z,
    stem: t`A gas occupies $2.4\ \text{litres}$ at $27\ ^\circ\text{C}$. It is heated at constant pressure to $127\ ^\circ\text{C}$. Use Charles's law to find its new volume.`,
    value: 3.2, answer: "3.2", unit: undefined, wrong: [11.3, 1.8, 2.4],
    explanation: t`$T_1 = 300\ \text{K}$, $T_2 = 400\ \text{K}$; $V_2 = 2.4 \times \dfrac{400}{300} = 3.2\ \text{litres}$.`,
    hints: ["Convert both temperatures to kelvin first.", "V/T = constant."] });

  q.struct({ d: 4, skill: "APPLICATION", applies: Z, examStyle: true,
    stem: t`A fixed mass of gas has a volume of $500\ \text{cm}^3$ at a pressure of $100\ \text{kPa}$ and a temperature of $27\ ^\circ\text{C}$.`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "Express the temperature in kelvin.", value: 300, unit: "K", wrong: [27, 246], explanation: "27 + 273 = 300 K." }),
      P.num({ label: "(b)", marks: 3, stem: t`The gas is compressed to $250\ \text{cm}^3$ and heated to $177\ ^\circ\text{C}$. Calculate its new pressure.`, value: 300, unit: "kPa", wrong: [200, 1311], explanation: t`$T_2 = 450\ \text{K}$; $p_2 = \dfrac{p_1V_1T_2}{T_1V_2} = \dfrac{100 \times 500 \times 450}{300 \times 250} = 300\ \text{kPa}$.` }),
    ],
    explanation: "Use the equation of state p₁V₁/T₁ = p₂V₂/T₂ with temperatures in kelvin: 300 K and 450 K give p₂ = 300 kPa.",
    hints: ["Kelvin temperatures only.", "Rearrange p₁V₁/T₁ = p₂V₂/T₂ for p₂."] });

  q.tf({ d: 2, skill: "UNDERSTANDING",
    stem: "A tyre pumped up in the cool morning has a higher pressure after a long drive on a hot afternoon.",
    answer: true, explanation: "The air inside warms; its particles move faster and hit the tyre walls harder and more often, so the pressure rises (the volume changes very little)." });

  q.card("CONCEPT", "What causes gas pressure?", "Particles colliding with the container walls (force per unit area).");
  q.card("FORMULA", "Convert °C to kelvin?", "T (K) = θ (°C) + 273.");
  q.card("CONCEPT", "Heating a gas at constant volume?", "Pressure increases: faster particles hit the walls harder and more often.");
  q.card("CONCEPT", "Compressing a gas at constant temperature?", "Pressure increases: particles hit the walls more often.");
  q.card("FORMULA", "Boyle's law?", "pV = constant (fixed mass, constant temperature): p₁V₁ = p₂V₂.");
  q.card("FORMULA", "Charles's law?", "V/T = constant at constant pressure (T in kelvin).", undefined, { applies: Z });
  q.card("FORMULA", "Equation of state?", "p₁V₁/T₁ = p₂V₂/T₂ (T in kelvin).", undefined, { applies: Z });
});

// =====================================================================================================================
concept("phys.thermal.expansion", {
  file: "thermal/expansion",
  keyPrefix: "thermal.expansion",
  objectives: { cambridge: ["2.2.1.1", "2.2.1.2"], zimsec: ["7.2.1", "7.2.2"] },
}, (q) => {
  q.mcq({ d: 1, skill: "RECALL",
    stem: "For the same temperature rise, which expands the most?",
    options: [["A gas", "Correct."], ["A liquid", "Liquids expand less than gases."], ["A solid", "Solids expand least."], ["They all expand equally", "They differ greatly."]],
    answer: "A", explanation: "Gases expand most, then liquids, then solids." });

  q.mcq({ d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why are small gaps left between sections of a railway line?",
    options: [["To allow the rails to expand on hot days without buckling", "Correct."], ["To let rainwater drain away quickly from under the rails", "Not the main reason."], ["To make the wheels run more quietly over the rails", "The gaps make it noisier."], ["To save steel on very long stretches of track", "The saving is tiny."]],
    answer: "A", explanation: "Rails expand in hot weather; without gaps they would push against each other and buckle." });

  q.mcq({ d: 2, skill: "UNDERSTANDING",
    stem: "A bimetallic strip of brass and iron is heated and bends. Brass expands more than iron. Which metal is on the outside of the curve?",
    options: [["Brass", "Correct: the metal that expands more is on the outside."], ["Iron", "Iron expands less, so it is on the inside."], ["Neither: it bends randomly", "The bending is predictable."], ["Both equally", "They are on opposite sides."]],
    answer: "A", explanation: "The brass becomes longer than the iron, so the strip curves with brass on the outside." });

  q.tf({ d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "When a solid is heated, its particles get bigger, which is why it expands.",
    answer: false, explanation: "The particles stay the same size; they vibrate more and move slightly further apart." });

  q.mcq({ d: 3, skill: "ANALYSIS", applies: C,
    stem: "Why do gases expand much more than solids for the same rise in temperature?",
    options: [["The forces between gas particles are very weak, so they spread easily.", "Correct."], ["Gas particles grow bigger when heated, so they push each other further apart.", "Size is not the reason."], ["Solids do not have particles that can move further apart.", "They do."], ["Gas particles stop moving when heated, leaving bigger gaps.", "They speed up."]],
    answer: "A", explanation: "Strong forces hold solid particles together, limiting expansion; the very weak forces in a gas allow large expansion.",
    hints: ["Compare the forces between particles in each state."] });

  q.match({ d: 2, skill: "UNDERSTANDING",
    stem: "Match each object with how thermal expansion affects it.",
    pairs: [["Overhead power lines", "Sag more on hot days, so they are hung with slack"], ["Concrete road sections", "Gaps filled with soft material allow expansion"], ["Liquid-in-glass thermometer", "Liquid expands up the tube as temperature rises"], ["Fire alarm with a bimetallic strip", "Strip bends when hot and completes a circuit"]],
    explanation: "Expansion is a problem to design around (lines, roads) and also useful (thermometers, thermostats)." });

  q.mcq({ d: 3, skill: "UNDERSTANDING",
    stem: "A metal lid is stuck tightly on a glass jar. Why does holding the lid under hot water help to open it?",
    options: [["The metal lid expands more than the glass, so it loosens.", "Correct."], ["The glass expands more than the metal, so it slides free.", "Metals usually expand more than glass."], ["Hot water seeps in and lubricates the thread of the lid.", "Not the reason."], ["The air inside the jar contracts and pulls the lid free.", "Heating would make it expand, not contract."]],
    answer: "A", explanation: "The metal lid expands more than the glass jar for the same temperature rise, so the fit becomes looser.",
    hints: ["Which expands more, metal or glass?"] });

  q.mcq({ d: 2, skill: "UNDERSTANDING",
    stem: "Why can boiling water crack a thick glass tumbler?",
    options: [["The inside heats and expands before the outside, causing strain", "Correct."], ["Hot water is heavier and presses harder on the glass", "Not the reason."], ["Thick glass starts to soften and melt at about 100 °C", "Glass melts at a much higher temperature."], ["Hot water makes the glass contract quickly and pull itself apart", "It expands it."]],
    answer: "A", explanation: "Glass is a poor conductor, so the inner surface expands while the outer is still cool; the uneven expansion can crack it." });

  q.struct({ d: 3, skill: "APPLICATION", examStyle: true,
    stem: "A thermostat in an electric iron uses a bimetallic strip made of brass and invar (invar hardly expands at all).",
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "Explain why the strip bends when it is heated.",
        points: ["Brass expands more than invar for the same temperature rise", "Since the strips are joined, the strip must curve, with brass on the outside"] }),
      P.manual({ label: "(b)", marks: 2, stem: "Explain how the bending can switch the heater off at a set temperature.",
        points: ["As the strip heats and bends, it moves away from an electrical contact", "breaking the circuit so the heater switches off; when it cools it straightens and reconnects"] }),
    ],
    explanation: "Unequal expansion bends the strip, which opens the contact when hot and closes it again on cooling.",
    hints: ["Which metal expands more?"] });

  q.card("CONCEPT", "Which expands most: solids, liquids or gases?", "Gases most, then liquids, then solids.");
  q.card("CONCEPT", "Why does a solid expand when heated?", "Its particles vibrate more and move slightly further apart (they do not grow).");
  q.card("DEFINITION", "What is a **bimetallic strip**?", "Two different metals joined together; it bends when heated because they expand differently.");
  q.card("FACT", "Give three uses of thermal expansion.", "Thermometers, bimetallic thermostats, shrink-fitting metal rings or tyres.");
  q.card("FACT", "Give three problems caused by expansion.", "Buckling rails and bridges, sagging power lines, cracked glass.");
  q.card("CONCEPT", "Why do bridges have expansion joints?", "To let the bridge expand and contract with temperature without damage.");
});

// =====================================================================================================================
concept("phys.thermal.thermometers", {
  file: "thermal/thermometers",
  keyPrefix: "thermal.thermometers",
  objectives: { zimsec: ["7.2.3", "7.2.4", "7.2.5"] },
}, (q) => {
  q.mcq({ d: 1, skill: "RECALL", applies: Z,
    stem: "What is the lower fixed point of the Celsius scale?",
    options: [["The temperature of pure melting ice, 0 °C", "Correct."], ["The temperature of the human body", "Not a fixed point."], ["The steam point of pure boiling water, 100 °C", "That is the upper fixed point."], ["Absolute zero", "Not used as a fixed point here."]],
    answer: "A", explanation: "The ice point, pure melting ice, defines 0 °C." });

  q.mcq({ d: 2, skill: "UNDERSTANDING", applies: Z, daily: true,
    stem: "Which change makes a liquid-in-glass thermometer more sensitive?",
    options: [["A narrower bore (tube)", "Correct: the same expansion gives a longer movement."], ["A smaller bulb", "A larger bulb is more sensitive."], ["A thicker glass wall", "That slows its response."], ["A shorter tube", "Not the factor."]],
    answer: "A", explanation: "A narrower bore (and a larger bulb) makes the liquid move further for each degree." });

  q.num({ d: 3, skill: "APPLICATION", applies: Z,
    stem: t`An uncalibrated thermometer has a liquid column $3.0\ \text{cm}$ long at the ice point and $28.0\ \text{cm}$ long at the steam point. What temperature does a column of $13.0\ \text{cm}$ show?`,
    value: 40, unit: "°C", wrong: [52, 46.4, 10],
    explanation: t`$100\ ^\circ\text{C}$ is $25.0\ \text{cm}$, so $1\ \text{cm} = 4\ ^\circ\text{C}$. Rise above the ice point $= 13.0 - 3.0 = 10.0\ \text{cm}$, so $\theta = 40\ ^\circ\text{C}$.`,
    hints: ["Find how many °C each cm represents.", "Measure from the ice-point length, not from zero."] });

  q.mcq({ d: 2, skill: "UNDERSTANDING", applies: Z,
    stem: "Why does a clinical thermometer have a constriction (narrow kink) just above the bulb?",
    options: [["So the liquid thread stays put after it is taken from the patient", "Correct."], ["To make it more sensitive to small changes in the patient's temperature", "Sensitivity comes from the narrow bore."], ["To stop the liquid expanding past the top of the scale", "It does not stop expansion."], ["To make the range of temperatures it can measure wider", "The range is deliberately small."]],
    answer: "A", explanation: "The constriction breaks the thread when the liquid contracts, so the highest reading can be read later." });

  q.mcq({ d: 3, skill: "EVALUATION", applies: Z,
    stem: "Which thermometer is best for measuring the temperature inside a furnace at about 1000 °C?",
    options: [["A thermocouple", "Correct: very wide range."], ["A mercury-in-glass thermometer", "Mercury boils at 357 °C and glass would soften."], ["An alcohol thermometer", "Alcohol boils at about 78 °C."], ["A clinical thermometer", "Range only about 35–42 °C."]],
    answer: "A", explanation: "Thermocouples have a very wide range and can withstand high temperatures.",
    hints: ["Compare the range of each thermometer."] });

  q.mcq({ d: 2, skill: "UNDERSTANDING", applies: Z,
    stem: "Why is alcohol, not mercury, used in thermometers for very cold places?",
    options: [["Alcohol freezes at a much lower temperature than mercury.", "Correct."], ["Alcohol is easier to see in the cold because it is dyed.", "It is dyed, but that is not the reason."], ["Alcohol boils at a higher temperature than mercury does.", "It boils lower."], ["Mercury expands too much in very cold weather.", "Not the reason."]],
    answer: "A", explanation: "Mercury freezes at −39 °C; alcohol stays liquid down to about −115 °C." });

  q.match({ d: 2, skill: "UNDERSTANDING", applies: Z,
    stem: "Match each thermometer with its thermometric property.",
    pairs: [["Liquid-in-glass thermometer", "Length of a liquid column"], ["Thermocouple", "Voltage produced at a junction of two metals"], ["Resistance thermometer", "Electrical resistance of a wire"], ["Constant-volume gas thermometer", "Pressure of a gas"]],
    explanation: "Each thermometer uses a property that changes steadily with temperature." });

  q.short({ d: 2, skill: "RECALL", applies: Z,
    stem: "What name is given to a physical property that changes with temperature and can be used to measure it?",
    accepted: ["thermometric property", "a thermometric property"], wrong: ["fixed point"],
    explanation: "It is a thermometric property, for example the length of a liquid column." });

  q.tf({ d: 2, skill: "UNDERSTANDING", applies: Z,
    stem: "A thermocouple responds quickly to temperature changes because its junction is very small.",
    answer: true, explanation: "The tiny junction has very little mass to heat or cool, so it reaches the surrounding temperature quickly." });

  q.struct({ d: 3, skill: "UNDERSTANDING", applies: Z, examStyle: true,
    stem: "A learner is asked to mark a scale on an unmarked mercury-in-glass thermometer.",
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "Describe how she marks the two fixed points.",
        points: ["Places the bulb in pure melting ice and marks the mercury level as 0 °C (ice point)", "Places the bulb in steam above pure boiling water at standard pressure and marks the level as 100 °C (steam point)"] }),
      P.manual({ label: "(b)", marks: 1, stem: "How does she complete the scale?",
        points: ["Divides the distance between the two marks into 100 equal divisions (degrees)"] }),
    ],
    explanation: "Mark the ice and steam points, then divide the gap into 100 equal degrees.",
    hints: ["What two reproducible temperatures are used?"] });

  q.card("FACT", "What are the two fixed points of the Celsius scale?", "Ice point 0 °C (pure melting ice) and steam point 100 °C (steam at standard pressure).", undefined, { applies: Z });
  q.card("DEFINITION", "What is a **thermometric property**?", "A measurable property that changes with temperature (e.g. length of a liquid column, resistance, emf).", undefined, { applies: Z });
  q.card("CONCEPT", "What makes a liquid-in-glass thermometer sensitive?", "A large bulb and a narrow bore.", undefined, { applies: Z });
  q.card("CONCEPT", "Why does a clinical thermometer have a constriction?", "It stops the liquid falling back, so the maximum reading stays.", undefined, { applies: Z });
  q.card("FACT", "Advantages of a thermocouple?", "Very wide range, quick response, small; but it needs a voltmeter.", undefined, { applies: Z });
  q.card("FACT", "Mercury or alcohol for very cold places?", "Alcohol: it freezes at about −115 °C; mercury freezes at −39 °C.", undefined, { applies: Z });
});

// =====================================================================================================================
concept("phys.thermal.specific-heat-capacity", {
  file: "thermal/specific-heat-capacity",
  keyPrefix: "thermal.shc",
  objectives: { cambridge: ["2.2.2.3", "2.2.2.4"], zimsec: ["7.2.8", "7.2.9"] },
}, (q) => {
  q.mcq({ d: 1, skill: "RECALL",
    stem: "What is specific heat capacity?",
    options: [["Energy to raise the temperature of 1 kg of a substance by 1 °C", "Correct."], ["Energy needed to melt 1 kg of the substance at its melting point", "That is latent heat of fusion."], ["The temperature reached by 1 kg of a substance when heated", "Not an energy."], ["The energy released when 1 kg of a fuel is burnt completely", "That is the energy content of a fuel."]],
    answer: "A", explanation: "c = energy per unit mass per unit temperature rise." });

  q.num({ d: 2, skill: "APPLICATION", daily: true,
    stem: t`How much energy is needed to heat $0.50\ \text{kg}$ of water from $25\ ^\circ\text{C}$ to $85\ ^\circ\text{C}$? The specific heat capacity of water is $4200\ \text{J/(kg}\ ^\circ\text{C)}$.`,
    value: 126000, unit: "J", wrong: [178500, 52500, 2100],
    explanation: t`$\Delta E = mc\Delta\theta = 0.50 \times 4200 \times 60 = 126\,000\ \text{J}$.` });

  q.num({ d: 3, skill: "APPLICATION",
    stem: t`A $2.5\ \text{kg}$ copper pot absorbs $19\,500\ \text{J}$ and its temperature rises by $20\ ^\circ\text{C}$. Calculate the specific heat capacity of copper.`,
    value: 390, unit: "J/(kg °C)", wrong: [975000, 2437.5, 0.0026],
    explanation: t`$c = \dfrac{\Delta E}{m\Delta\theta} = \dfrac{19\,500}{2.5 \times 20} = 390\ \text{J/(kg}\ ^\circ\text{C)}$.`,
    hints: ["c = ΔE ÷ (mΔθ)."] });

  q.num({ d: 3, skill: "APPLICATION",
    stem: t`$31\,500\ \text{J}$ of energy is given to $1.5\ \text{kg}$ of water ($c = 4200\ \text{J/(kg}\ ^\circ\text{C)}$). By how much does its temperature rise?`,
    value: 5, answer: "5.0", unit: "°C", wrong: [11.25, 0.2, 7.5],
    explanation: t`$\Delta\theta = \dfrac{\Delta E}{mc} = \dfrac{31\,500}{1.5 \times 4200} = 5.0\ ^\circ\text{C}$.`,
    hints: ["Rearrange ΔE = mcΔθ."] });

  q.mcq({ d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In the midday sun the sand on a lake shore becomes much hotter than the water. Why?",
    options: [["Sand has a much lower specific heat capacity than water.", "Correct."], ["Sand receives more sunlight than the water surface does.", "Both receive the same sunlight."], ["Water has a lower specific heat capacity than the sand.", "Water's is much higher."], ["Sand is a better conductor, so it collects more heat.", "Not the main reason."]],
    answer: "A", explanation: "The same energy raises the temperature of sand much more because sand needs less energy per kg per °C." });

  q.mcq({ d: 2, skill: "UNDERSTANDING", applies: C,
    stem: "What happens to the particles of an object when its temperature rises?",
    options: [["Their average kinetic energy increases.", "Correct."], ["They lose energy to their surroundings.", "They gain energy."], ["Their number increases as they split.", "The number of particles is fixed."], ["They become heavier as they gain energy.", "Their mass is unchanged."]],
    answer: "A", explanation: "A temperature rise means the particles move faster on average: their average kinetic energy increases." });

  q.struct({ d: 4, skill: "ANALYSIS", examStyle: true,
    stem: t`To measure the specific heat capacity of a $1.0\ \text{kg}$ aluminium block, a learner uses a $12\ \text{V}$ electric heater carrying $4.0\ \text{A}$. She heats the block for $5.0$ minutes and its temperature rises from $22\ ^\circ\text{C}$ to $38\ ^\circ\text{C}$.`,
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the energy supplied by the heater.", value: 14400, unit: "J", wrong: [240, 48], explanation: t`$E = IVt = 4.0 \times 12 \times 300 = 14\,400\ \text{J}$.` }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the specific heat capacity of aluminium from her results.", value: 900, unit: "J/(kg °C)", wrong: [379, 655], explanation: t`$c = \dfrac{14\,400}{1.0 \times 16} = 900\ \text{J/(kg}\ ^\circ\text{C)}$.` }),
      P.manual({ label: "(c)", marks: 2, stem: "Suggest why a value found this way is usually higher than the true value, and one way to reduce the error.",
        points: ["Some energy from the heater is lost to the surroundings, so not all of it heats the block (the energy per °C appears too large)", "Wrap the block in insulation (and add oil in the thermometer and heater holes for good thermal contact)"] }),
    ],
    explanation: "E = IVt = 14 400 J; temperature rise 16 °C; c = 14 400/(1.0 × 16) = 900 J/(kg °C). Heat losses make results too high; insulation reduces them.",
    hints: ["Change minutes to seconds.", "Δθ = 38 − 22."] });

  q.fib({ d: 2, skill: "RECALL",
    stem: "Complete the equation.",
    template: "Energy supplied = mass × {{blank:a}} × change in {{blank:b}}.",
    blanks: [{ id: "a", input: "select", choices: ["specific heat capacity", "density", "latent heat"], accepted: ["specific heat capacity"], wrong: "density" }, { id: "b", input: "select", choices: ["temperature", "volume", "mass"], accepted: ["temperature"], wrong: "volume" }],
    explanation: "ΔE = mcΔθ." });

  q.mcq({ d: 3, skill: "ANALYSIS",
    stem: "Why is water used in car cooling systems and hot-water bottles?",
    options: [["Its high specific heat capacity lets it carry a lot of energy per degree.", "Correct."], ["Its low specific heat capacity lets it heat up and cool quickly.", "It is high."], ["It boils at a low temperature, so it carries steam to the radiator.", "Not the reason."], ["It is a good electrical conductor, which helps carry the energy.", "Not relevant."]],
    answer: "A", explanation: "A high specific heat capacity means water can absorb or release lots of energy with only a small temperature change.",
    hints: ["Think about how much energy each kilogram can carry."] });

  q.num({ d: 4, skill: "ANALYSIS",
    stem: t`An electric kettle rated at $2000\ \text{W}$ heats $1.2\ \text{kg}$ of water from $20\ ^\circ\text{C}$ to $100\ ^\circ\text{C}$. Assuming no energy is lost, how long does this take? ($c = 4200\ \text{J/(kg}\ ^\circ\text{C)}$)`,
    value: 201.6, answer: "202", unit: "s", tol: 1, wrong: [252, 0.005, 403200],
    explanation: t`$\Delta E = 1.2 \times 4200 \times 80 = 403\,200\ \text{J}$; $t = \dfrac{403\,200}{2000} = 202\ \text{s}$ (about 3.4 minutes).`,
    hints: ["Find the energy needed with ΔE = mcΔθ.", "Then t = E ÷ P."] });

  q.card("DEFINITION", "Define **specific heat capacity**.", "The energy needed to raise the temperature of 1 kg of a substance by 1 °C.");
  q.card("FORMULA", "Specific heat capacity equation?", "ΔE = mcΔθ, so c = ΔE/(mΔθ).");
  q.card("FACT", "Specific heat capacity of water?", "4200 J/(kg °C), very high.");
  q.card("CONCEPT", "What does a temperature rise mean for the particles?", "An increase in their average kinetic energy.", undefined, { applies: C });
  q.card("CONCEPT", "How is the specific heat capacity of a block measured?", "Heat it with a heater (E = IVt), measure mass and temperature rise, use c = E/(mΔθ); insulate it.");
  q.card("CONCEPT", "Why are measured values of c usually too high?", "Energy lost to the surroundings is counted as if it heated the block.");
  q.card("CONCEPT", "Why does sand heat up faster than water?", "Sand has a much lower specific heat capacity.");
});
