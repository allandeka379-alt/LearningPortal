import { concept, P, t } from "../lib.mjs";

const r = (x, n = 3) => Number(x.toPrecision(n));
const Z = ["zimsec"];
const C = ["cambridge"];

// =====================================================================================================================
concept("phys.thermal.changes-of-state", {
  file: "thermal/changes-of-state",
  keyPrefix: "thermal.changes",
  objectives: { cambridge: ["2.2.3.1", "2.2.3.4", "2.2.3.5"], zimsec: ["7.2.6", "7.2.7"] },
}, (q) => {
  q.mcq({ d: 1, skill: "RECALL",
    stem: "At standard atmospheric pressure, at what temperature does pure water boil?",
    options: [["0 °C", "That is the melting point of ice."], ["100 °C", "Correct."], ["37 °C", "That is body temperature."], ["273 °C", "No."]],
    answer: "B", explanation: "Pure water boils at 100 °C at standard atmospheric pressure." });

  q.mcq({ d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A pot of water is boiling on a stove. The heat is turned up. What happens to the temperature of the boiling water?",
    options: [["It stays at the boiling point; the water just boils faster.", "Correct."], ["It rises steadily.", "Boiling water stays at its boiling point."], ["It falls.", "Energy is still being supplied."], ["It rises to 200 °C.", "Water cannot be heated above its boiling point in an open pot."]],
    answer: "A", explanation: "While boiling, the extra energy turns more water into steam; the temperature stays at the boiling point." });

  q.mcq({ d: 2, skill: "UNDERSTANDING",
    stem: "Why does the temperature of ice stay at 0 °C while it melts, even though it is being heated?",
    options: [["The energy breaks the bonds between particles rather than making them move faster.", "Correct."], ["The ice loses energy to the room.", "It gains energy."], ["Thermometers cannot read inside ice.", "Not the reason."], ["Energy is destroyed during melting.", "Energy cannot be destroyed."]],
    answer: "A", explanation: "During a change of state, energy is used to overcome the forces between particles, so their kinetic energy (temperature) does not rise." });

  q.mcq({ d: 2, skill: "UNDERSTANDING",
    stem: "Why does sweating help to cool you down?",
    options: [["The most energetic water particles evaporate, lowering the average energy of those left on the skin.", "Correct."], ["Sweat is colder than the body when it comes out.", "Sweat starts at body temperature."], ["Sweat reflects sunlight.", "Not the reason."], ["Sweat stops blood flowing to the skin.", "No."]],
    answer: "A", explanation: "Evaporation removes the fastest particles, so the remaining liquid, and the skin under it, cools." });

  q.tf({ d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Evaporation can happen at any temperature, but boiling happens only at the boiling point.",
    answer: true, explanation: "Evaporation occurs at the surface at all temperatures; boiling occurs throughout the liquid at the boiling point." });

  q.mcq({ d: 3, skill: "ANALYSIS", applies: C, multiple: true,
    stem: "Select **all** the changes that make a puddle dry up faster.",
    options: [["A higher air temperature", "Faster."], ["A breeze blowing over it", "Faster."], ["Spreading the water over a larger area", "Faster."], ["Covering it with a lid", "Slower: vapour cannot escape."], ["Cooling the water", "Slower."], ["Making the puddle deeper and narrower", "Slower: smaller surface area."]],
    answer: ["A", "B", "C"], explanation: "Evaporation is faster with higher temperature, more surface area and moving air.",
    hints: ["Three factors affect the rate of evaporation."] });

  q.match({ d: 3, skill: "UNDERSTANDING", applies: C,
    stem: "Match each feature with boiling or evaporation.",
    pairs: [["Happens only at a fixed temperature", "Boiling"], ["Happens only at the surface", "Evaporation"], ["Bubbles of vapour form inside the liquid", "Boiling"], ["Cools the remaining liquid", "Evaporation"]],
    explanation: "Boiling: fixed temperature, throughout the liquid, bubbles. Evaporation: any temperature, surface only, cooling.",
    hints: ["Where in the liquid does each happen?"] });

  q.mcq({ d: 2, skill: "UNDERSTANDING", applies: Z,
    stem: "What effect does dissolving salt in water have on its boiling point?",
    options: [["It raises the boiling point.", "Correct: impurities raise the boiling point."], ["It lowers the boiling point.", "Impurities lower the melting point but raise the boiling point."], ["It has no effect.", "It does have an effect."], ["It makes water boil at 0 °C.", "No."]],
    answer: "A", explanation: "Impurities raise the boiling point (and lower the melting point)." });

  q.mcq({ d: 3, skill: "ANALYSIS", applies: Z,
    stem: "Water in an open pot boils at about 95 °C in a town high above sea level. Why?",
    options: [["The atmospheric pressure is lower, which lowers the boiling point.", "Correct."], ["The air is colder.", "Air temperature does not set the boiling point."], ["The water contains more salt.", "Salt would raise the boiling point."], ["Thermometers read low at altitude.", "Not the reason."]],
    answer: "A", explanation: "Boiling point depends on pressure; lower pressure at altitude means water boils below 100 °C.",
    hints: ["How does air pressure change with height?"] });

  q.struct({ d: 3, skill: "UNDERSTANDING", examStyle: true,
    stem: "A family keeps drinking water in an unglazed clay pot. The water inside stays several degrees cooler than the air.",
    parts: [
      P.manual({ label: "(a)", marks: 3, stem: "Explain, in terms of particles, why the water stays cool.",
        points: ["Water seeps through the porous clay and evaporates from the outside surface", "The most energetic water particles escape, so the average kinetic energy of those left falls", "Energy is taken from the pot and the water inside, so their temperature falls"] }),
      P.mcq({ label: "(b)", stem: "Where should the pot be placed to keep the water coolest?", options: [["In a shaded, breezy place", "Correct: moving air speeds evaporation; shade reduces heating."], ["In a closed cupboard", "Still, humid air slows evaporation."], ["In direct sunshine on a still day", "Sunlight heats it and there is no breeze."], ["Wrapped in plastic", "That stops evaporation."]], answer: "A", explanation: "Air movement increases evaporation, and shade avoids heating by sunlight." }),
    ],
    explanation: "Evaporation from the pot's surface removes the most energetic particles, cooling the pot and water; a breeze and shade help.",
    hints: ["Which particles leave a liquid first?"] });

  q.card("FACT", "Melting and boiling points of pure water?", "0 °C and 100 °C at standard atmospheric pressure.");
  q.card("CONCEPT", "Why does temperature stay constant while melting or boiling?", "Energy breaks bonds between particles instead of increasing their kinetic energy.");
  q.card("DEFINITION", "What is **evaporation**?", "The escape of the more energetic particles from a liquid's surface.");
  q.card("CONCEPT", "Why does evaporation cause cooling?", "The fastest particles leave, so the average kinetic energy of the rest falls.");
  q.card("FACT", "What speeds up evaporation?", "Higher temperature, larger surface area, moving air.", undefined, { applies: C });
  q.card("CONCEPT", "Boiling vs evaporation?", "Boiling: at the boiling point, throughout, bubbles. Evaporation: any temperature, surface only, cools.", undefined, { applies: C });
  q.card("FACT", "Effect of impurities on melting and boiling points?", "Impurities lower the melting point and raise the boiling point.", undefined, { applies: Z });
  q.card("FACT", "Effect of pressure on the boiling point?", "Higher pressure raises it; lower pressure (high altitude) lowers it.", undefined, { applies: Z });
});

// =====================================================================================================================
concept("phys.thermal.latent-heat", {
  file: "thermal/latent-heat",
  keyPrefix: "thermal.latent",
  objectives: { zimsec: ["7.2.10"] },
}, (q) => {
  q.mcq({ d: 1, skill: "RECALL", applies: Z,
    stem: "What is the specific latent heat of fusion?",
    options: [["The energy needed to melt 1 kg of a solid without a change in temperature", "Correct."], ["The energy needed to boil 1 kg of a liquid", "That is vaporisation."], ["The energy needed to raise 1 kg by 1 °C", "That is specific heat capacity."], ["The temperature at which a solid melts", "That is the melting point."]],
    answer: "A", explanation: "Specific latent heat of fusion: energy per kg to change solid to liquid at constant temperature." });

  q.num({ d: 2, skill: "APPLICATION", applies: Z, daily: true,
    stem: t`How much energy is needed to melt $2.0\ \text{kg}$ of ice at $0\ ^\circ\text{C}$? Take $l_f = 3.34 \times 10^{5}\ \text{J/kg}$.`,
    value: 668000, answer: "6.68e5", unit: "J", wrong: [167000, 334000, 2.26e6],
    explanation: t`$Q = ml_f = 2.0 \times 3.34 \times 10^{5} = 6.68 \times 10^{5}\ \text{J}$.` });

  q.num({ d: 2, skill: "APPLICATION", applies: Z, daily: true,
    stem: t`How much energy is needed to turn $0.30\ \text{kg}$ of boiling water into steam at $100\ ^\circ\text{C}$? Take $l_v = 2.26 \times 10^{6}\ \text{J/kg}$.`,
    value: 678000, answer: "6.78e5", unit: "J", wrong: [7.53e6, 100200, 2.26e6],
    explanation: t`$Q = ml_v = 0.30 \times 2.26 \times 10^{6} = 6.78 \times 10^{5}\ \text{J}$.` });

  q.num({ d: 3, skill: "APPLICATION", applies: Z,
    stem: t`A substance absorbs $45\,000\ \text{J}$ while $0.18\ \text{kg}$ of it melts, with no temperature change. Calculate its specific latent heat of fusion.`,
    value: 250000, answer: "2.5e5", unit: "J/kg", wrong: [8100, 0.000004, 45000],
    explanation: t`$l = \dfrac{Q}{m} = \dfrac{45\,000}{0.18} = 2.5 \times 10^{5}\ \text{J/kg}$.`,
    hints: ["Rearrange Q = ml."] });

  q.mcq({ d: 2, skill: "UNDERSTANDING", applies: Z,
    stem: "Why is a scald from steam at 100 °C worse than one from boiling water at 100 °C?",
    options: [["Steam gives out its latent heat of vaporisation as it condenses on the skin, as well as cooling down.", "Correct."], ["Steam is hotter than 100 °C.", "Both are at 100 °C here."], ["Water conducts heat better than steam.", "That would make water worse."], ["Steam contains more mass.", "Not the reason."]],
    answer: "A", explanation: "Condensing steam releases a large amount of latent heat onto the skin before it even starts cooling." });

  q.mcq({ d: 3, skill: "UNDERSTANDING", applies: Z,
    stem: "Why is the specific latent heat of vaporisation of water much larger than its specific latent heat of fusion?",
    options: [["Boiling separates the particles completely, which needs far more energy than loosening them in melting.", "Correct."], ["Steam is hotter than ice.", "Latent heat is not about temperature."], ["There is more water in steam.", "The comparison is per kg."], ["Melting releases energy.", "Melting absorbs energy."]],
    answer: "A", explanation: "In vaporisation the particles must be pulled completely apart (and push back the atmosphere), which takes much more energy than melting.",
    hints: ["Compare what happens to the particles in each change."] });

  q.struct({ d: 4, skill: "ANALYSIS", applies: Z, examStyle: true,
    stem: t`To measure the specific latent heat of vaporisation of water, a learner boils water on a balance with a $120\ \text{W}$ immersion heater. Once the water is boiling steadily, the mass falls by $0.040\ \text{kg}$ in $750\ \text{s}$.`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "Calculate the energy supplied by the heater in this time.", value: 90000, unit: "J", wrong: [6.25, 4.8], explanation: t`$E = Pt = 120 \times 750 = 90\,000\ \text{J}$.` }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the specific latent heat of vaporisation from these results.", value: 2250000, answer: "2.25e6", unit: "J/kg", wrong: [3600, 2.25e3], explanation: t`$l_v = \dfrac{90\,000}{0.040} = 2.25 \times 10^{6}\ \text{J/kg}$.` }),
      P.manual({ label: "(c)", marks: 1, stem: "Why does she wait until the water is boiling steadily before starting the measurements?",
        points: ["So that all the energy supplied goes into changing water to steam, not into raising its temperature"] }),
    ],
    explanation: "E = Pt = 90 000 J; l = E/m = 2.25 × 10⁶ J/kg. Timing starts at steady boiling so the energy only causes the change of state.",
    hints: ["Energy = power × time.", "l = Q ÷ m, with m the mass boiled away."] });

  q.mcq({ d: 3, skill: "ANALYSIS", applies: Z,
    stem: "In an experiment to find the specific latent heat of fusion of ice, a second funnel of ice without a heater is set up beside the first. Why?",
    options: [["To find how much ice is melted by energy from the room, so it can be subtracted", "Correct: it is a control."], ["To keep the heater cool", "Not its purpose."], ["To double the mass of water collected", "That would spoil the result."], ["To measure the room temperature", "A thermometer does that."]],
    answer: "A", explanation: "The control funnel shows the mass melted by the surroundings; subtracting it leaves the mass melted by the heater alone.",
    hints: ["What else, apart from the heater, could melt the ice?"] });

  q.struct({ d: 5, skill: "ANALYSIS", applies: Z, examStyle: true,
    stem: t`Calculate the total energy needed to turn $0.20\ \text{kg}$ of ice at $0\ ^\circ\text{C}$ into water at $30\ ^\circ\text{C}$. Use $l_f = 3.34 \times 10^{5}\ \text{J/kg}$ and $c_{\text{water}} = 4200\ \text{J/(kg}\ ^\circ\text{C)}$.`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "Energy to melt the ice.", value: 66800, unit: "J", wrong: [334000, 25200], explanation: t`$0.20 \times 3.34 \times 10^{5} = 66\,800\ \text{J}$.` }),
      P.num({ label: "(b)", marks: 1, stem: "Energy to warm the melted water to 30 °C.", value: 25200, unit: "J", wrong: [126000, 66800], explanation: t`$0.20 \times 4200 \times 30 = 25\,200\ \text{J}$.` }),
      P.num({ label: "(c)", marks: 1, stem: "Total energy.", value: 92000, unit: "J", wrong: [41600, 66800], explanation: t`$66\,800 + 25\,200 = 92\,000\ \text{J}$.` }),
    ],
    explanation: "Split the process: melting (ml_f = 66 800 J) then warming (mcΔθ = 25 200 J); total 92 000 J.",
    hints: ["Melting happens first, at 0 °C.", "Then the melted water warms up."] });

  q.tf({ d: 2, skill: "UNDERSTANDING", applies: Z,
    stem: "During melting, the energy supplied increases the kinetic energy of the particles.",
    answer: false, explanation: "The temperature stays constant, so the average kinetic energy does not increase; the energy weakens the bonds between particles." });

  q.card("DEFINITION", "Specific latent heat of fusion?", "Energy to change 1 kg of solid to liquid without a temperature change.", undefined, { applies: Z });
  q.card("DEFINITION", "Specific latent heat of vaporisation?", "Energy to change 1 kg of liquid to gas without a temperature change.", undefined, { applies: Z });
  q.card("FORMULA", "Latent heat equation?", "Q = ml.", undefined, { applies: Z });
  q.card("FACT", "Latent heats of water?", "Fusion 3.34 × 10⁵ J/kg; vaporisation 2.26 × 10⁶ J/kg.", undefined, { applies: Z });
  q.card("CONCEPT", "Why are steam scalds so bad?", "Condensing steam releases its large latent heat of vaporisation onto the skin.", undefined, { applies: Z });
  q.card("CONCEPT", "How is l_v measured?", "Boil water steadily on a balance with a heater; l = Pt ÷ mass boiled away.", undefined, { applies: Z });
  q.card("CONCEPT", "Why use a control funnel when measuring l_f?", "To subtract the ice melted by energy from the room.", undefined, { applies: Z });
});

// =====================================================================================================================
concept("phys.thermal.conduction", {
  file: "thermal/conduction",
  keyPrefix: "thermal.conduction",
  objectives: { cambridge: ["2.3.1.1", "2.3.1.2"], zimsec: ["7.3.1"] },
}, (q) => {
  q.mcq({ d: 1, skill: "RECALL",
    stem: "Which of these is the best thermal conductor?",
    options: [["Copper", "Correct: metals are good conductors."], ["Wood", "An insulator."], ["Plastic", "An insulator."], ["Air", "A very poor conductor."]],
    answer: "A", explanation: "Metals such as copper are good thermal conductors." });

  q.mcq({ d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A metal bench and a wooden bench have been in the same shade all day. Why does the metal one feel colder to touch?",
    options: [["Metal conducts energy away from your hand faster.", "Correct."], ["The metal is at a lower temperature.", "Both are at the same temperature."], ["Wood produces heat.", "Wood does not produce heat."], ["Metal reflects body heat.", "Not the reason."]],
    answer: "A", explanation: "Both are at the same temperature; the metal is a better conductor, so it takes energy from your hand faster." });

  q.mcq({ d: 2, skill: "UNDERSTANDING",
    stem: "Why do cooking pots have metal bases but plastic or wooden handles?",
    options: [["Metal conducts energy to the food; plastic and wood are insulators, so the handles stay cool.", "Correct."], ["Plastic is a better conductor than metal.", "It is a worse conductor."], ["Metal handles would melt.", "Not the reason."], ["Wooden handles conduct energy to the food.", "They are insulators."]],
    answer: "A", explanation: "The metal base conducts energy well into the food; insulating handles protect the cook's hand." });

  q.tf({ d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In conduction, the material itself moves to carry the energy from the hot end to the cold end.",
    answer: false, explanation: "In conduction the material stays in place; energy is passed from particle to particle. Movement of the material carrying energy is convection." });

  q.mcq({ d: 3, skill: "ANALYSIS", applies: C,
    stem: "Why are metals much better thermal conductors than non-metals?",
    options: [["Metals contain free electrons that carry energy quickly through the metal.", "Correct."], ["Metal atoms do not vibrate.", "They vibrate too."], ["Metals have a lower density.", "Not the reason; many are dense."], ["Non-metals have no particles.", "They do."]],
    answer: "A", explanation: "As well as lattice vibrations, metals have free (delocalised) electrons that move quickly and transfer energy in collisions.",
    hints: ["What do metals contain that non-metals do not?"] });

  q.mcq({ d: 3, skill: "UNDERSTANDING", applies: C,
    stem: "Why are gases very poor thermal conductors?",
    options: [["Their particles are far apart, so collisions that pass energy along are rare.", "Correct."], ["Gas particles do not move.", "They move fast."], ["Gases are too hot.", "Not the reason."], ["Gases contain free electrons.", "They do not."]],
    answer: "A", explanation: "With particles far apart, energy is passed on only in occasional collisions.",
    hints: ["Think about the spacing of gas particles."] });

  q.struct({ d: 3, skill: "EVALUATION", examStyle: true,
    stem: "A learner compares how well copper, aluminium and iron conduct. She fixes a rod of each metal into the side of a tank of hot water, with a drawing pin stuck to the far end of each rod with wax.",
    parts: [
      P.mcq({ label: "(a)", stem: "Which pin is likely to fall first?", options: [["The one on the copper rod", "Correct: copper is the best conductor of the three."], ["The one on the iron rod", "Iron is the poorest of the three."], ["The one on the aluminium rod", "Aluminium is good, but copper is better."], ["They all fall together", "They conduct differently."]], answer: "A", explanation: "Copper conducts best, so its wax melts first." }),
      P.manual({ label: "(b)", marks: 2, stem: "State two things she must keep the same for a fair test.",
        points: ["The rods have the same length and thickness (diameter)", "The wax blobs/pins are the same size and the rods start at the same temperature, all in the same hot water"] }),
    ],
    explanation: "The best conductor melts its wax first; a fair test controls the rods' dimensions, the wax and the heat source.",
    hints: ["Which variables could affect how quickly the wax melts?"] });

  q.mcq({ d: 2, skill: "UNDERSTANDING",
    stem: "Why do woollen jumpers and blankets keep people warm?",
    options: [["They trap air, which is a poor conductor.", "Correct."], ["Wool produces heat.", "Wool does not produce energy."], ["Wool is a good conductor.", "It is a poor conductor."], ["Wool reflects cold.", "Cold is not reflected."]],
    answer: "A", explanation: "Wool fibres trap still air, a very poor conductor, so energy escapes from the body slowly." });

  q.short({ d: 2, skill: "RECALL",
    stem: "What name is given to a material that conducts thermal energy badly?",
    accepted: ["insulator", "an insulator", "thermal insulator", "a thermal insulator", "bad conductor", "poor conductor"], wrong: ["conductor"],
    explanation: "A thermal insulator, such as wood, plastic, wool or trapped air." });

  q.card("DEFINITION", "What is **conduction**?", "Transfer of thermal energy through a material without the material moving.");
  q.card("FACT", "Good and poor thermal conductors?", "Good: metals. Poor (insulators): wood, plastic, wool, air.");
  q.card("CONCEPT", "How does conduction happen in all solids?", "Particles vibrate more and pass energy to neighbours (lattice vibrations).", undefined, { applies: C });
  q.card("CONCEPT", "Why are metals good conductors?", "Free electrons carry energy quickly through the metal.", undefined, { applies: C });
  q.card("CONCEPT", "Why are gases poor conductors?", "Their particles are far apart, so energy is rarely passed on.", undefined, { applies: C });
  q.card("CONCEPT", "Why does trapped air insulate well?", "Air conducts poorly and, when trapped, cannot carry energy by convection.");
  q.card("CONCEPT", "Why does metal feel colder than wood at the same temperature?", "Metal conducts energy away from your hand faster.");
});

// =====================================================================================================================
concept("phys.thermal.convection", {
  file: "thermal/convection",
  keyPrefix: "thermal.convection",
  objectives: { cambridge: ["2.3.2.1", "2.3.2.2"], zimsec: ["7.3.2"] },
}, (q) => {
  q.mcq({ d: 1, skill: "RECALL",
    stem: "In which states of matter can convection happen?",
    options: [["Liquids and gases only", "Correct: they can flow."], ["Solids only", "Solids cannot flow."], ["Solids, liquids and gases", "Not in solids."], ["Gases only", "Liquids too."]],
    answer: "A", explanation: "Convection needs the material to flow, so it happens only in fluids (liquids and gases)." });

  q.mcq({ d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why does warm air rise?",
    options: [["It expands, becomes less dense and is pushed up by the denser cooler air.", "Correct."], ["Heat always rises.", "It is the warm, less dense air that rises."], ["Warm air has fewer particles in total.", "The same air expands."], ["Warm air is attracted by the Sun.", "Not the reason."]],
    answer: "A", explanation: "Heated air expands, so its density decreases; cooler, denser air sinks around it and pushes it upwards." });

  q.mcq({ d: 2, skill: "UNDERSTANDING",
    stem: "Why is the heating element of an electric kettle at the bottom?",
    options: [["Heated water rises, setting up a convection current that heats all the water.", "Correct."], ["So the element stays cool.", "Not the reason."], ["Because heat sinks.", "Warm water rises."], ["So that the water conducts the heat upwards.", "Water is a poor conductor; convection does the job."]],
    answer: "A", explanation: "Warm water rises from the element and cooler water sinks to be heated: convection circulates all the water." });

  q.tf({ d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "An air conditioner works best mounted high on a wall, because cool air sinks.",
    answer: true, explanation: "The cooled air is denser, so it sinks through the room, setting up a convection current." });

  q.struct({ d: 3, skill: "UNDERSTANDING", examStyle: true,
    stem: "A learner drops a crystal of potassium permanganate to the bottom of a beaker of water, near one side, and heats the beaker gently under that side.",
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "Describe what she sees.",
        points: ["A purple stream rises from above the crystal on the heated side", "It spreads across the top, sinks on the far side and returns along the bottom (a circulating current)"] }),
      P.manual({ label: "(b)", marks: 3, stem: "Explain her observations.",
        points: ["The water above the flame is heated and expands", "so it becomes less dense and rises", "cooler, denser water sinks to replace it, setting up a convection current"] }),
    ],
    explanation: "Heated water expands, becomes less dense and rises; cooler water sinks; the coloured stream traces the convection current.",
    hints: ["What happens to the density of water when it is heated?"] });

  q.mcq({ d: 3, skill: "ANALYSIS",
    stem: "Where should the cooling unit of an old-style refrigerator be placed, and why?",
    options: [["At the top: cooled air sinks, and warmer air rises to be cooled.", "Correct."], ["At the bottom: cold air rises.", "Cold air sinks."], ["In the middle: it does not matter.", "Position matters for convection."], ["Outside the fridge", "It must cool the inside."]],
    answer: "A", explanation: "Air cooled at the top becomes denser and sinks, while warmer air rises to the cooling unit: a convection current cools the whole interior.",
    hints: ["Does cold air rise or sink?"] });

  q.mcq({ d: 2, skill: "UNDERSTANDING",
    stem: "Why does a hot-air balloon rise?",
    options: [["The heated air inside is less dense than the cooler air outside.", "Correct."], ["Hot air is lighter because it has lost its particles.", "It has the same particles, spread out."], ["The burner pushes it up like a rocket.", "Not the main reason."], ["The balloon's fabric is lighter than air.", "Not the reason."]],
    answer: "A", explanation: "Air inside the balloon expands when heated; the balloon's average density falls below that of the surrounding air." });

  q.fib({ d: 2, skill: "RECALL",
    stem: "Complete the explanation of convection.",
    template: "When a fluid is heated it expands, becomes {{blank:a}} dense and {{blank:b}}.",
    blanks: [{ id: "a", input: "select", choices: ["less", "more"], accepted: ["less"], wrong: "more" }, { id: "b", input: "select", choices: ["rises", "sinks"], accepted: ["rises"], wrong: "sinks" }],
    explanation: "Heated fluid expands, becomes less dense and rises; cooler, denser fluid sinks." });

  q.card("DEFINITION", "What is **convection**?", "Energy transfer in a liquid or gas by the movement of the fluid itself, caused by density differences.");
  q.card("CONCEPT", "Why does heated fluid rise?", "It expands, becomes less dense, and is pushed up by denser fluid.");
  q.card("DEFINITION", "What is a **convection current**?", "The circulating flow of fluid set up by heating: warm fluid rises, cool fluid sinks.");
  q.card("CONCEPT", "Can convection happen in solids?", "No: solids cannot flow.");
  q.card("FACT", "Where are kettle elements and fridge cooling units placed?", "Kettle element at the bottom; fridge cooling unit at the top.");
  q.card("CONCEPT", "How can convection in water be shown?", "Heat water near a potassium permanganate crystal: the purple stream shows the current.");
});

// =====================================================================================================================
concept("phys.thermal.radiation", {
  file: "thermal/radiation",
  keyPrefix: "thermal.radiation",
  objectives: { cambridge: ["2.3.3.1", "2.3.3.2", "2.3.3.3"], zimsec: ["7.3.3"] },
}, (q) => {
  q.mcq({ d: 1, skill: "RECALL",
    stem: "Thermal radiation is which type of electromagnetic wave?",
    options: [["Infrared", "Correct."], ["Ultraviolet", "Not thermal radiation."], ["X-rays", "No."], ["Radio waves", "No."]],
    answer: "A", explanation: "Thermal radiation is infrared radiation." });

  q.mcq({ d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Energy from the Sun reaches the Earth through the vacuum of space. By which method?",
    options: [["Radiation", "Correct: it needs no medium."], ["Conduction", "Needs particles."], ["Convection", "Needs a fluid."], ["All three", "Only radiation crosses a vacuum."]],
    answer: "A", explanation: "Only radiation can travel through a vacuum, because it does not need particles." });

  q.mcq({ d: 2, skill: "RECALL",
    stem: "Which surface is the best emitter of infrared radiation?",
    options: [["Dull black", "Correct."], ["Shiny silver", "The poorest emitter."], ["Shiny white", "A poor emitter."], ["Dull white", "Not the best."]],
    answer: "A", explanation: "Dull black surfaces are the best emitters (and the best absorbers)." });

  q.tf({ d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A surface that is a good absorber of infrared radiation is also a good emitter.",
    answer: true, explanation: "Good absorbers are good emitters: dull black is best at both; shiny surfaces are poor at both." });

  q.mcq({ d: 2, skill: "UNDERSTANDING",
    stem: "Why are many houses in hot countries painted white?",
    options: [["White surfaces reflect radiation, so the house absorbs less energy from the Sun.", "Correct."], ["White paint conducts heat out.", "Not the reason."], ["White surfaces emit more radiation.", "They are poor emitters."], ["White paint is cheaper.", "Not the physics reason."]],
    answer: "A", explanation: "Light, shiny surfaces reflect most of the radiation and are poor absorbers, keeping the house cooler." });

  q.struct({ d: 3, skill: "EVALUATION", examStyle: true,
    stem: "A learner uses a Leslie's cube (a hollow metal cube with one dull black, one shiny black, one dull white and one shiny silver face) filled with hot water, and an infrared detector.",
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "Describe how she uses the apparatus to compare the faces as emitters.",
        points: ["Places the detector at the same distance from each face in turn", "Records the reading for each face (all faces are at the same temperature because the cube is full of hot water)"] }),
      P.mcq({ label: "(b)", stem: "Which face gives the highest reading?", options: [["Dull black", "Correct."], ["Shiny silver", "The lowest reading."], ["Dull white", "Lower than black."], ["Shiny black", "Lower than dull black."]], answer: "A", explanation: "Dull black is the best emitter." }),
    ],
    explanation: "With all faces at the same temperature and the detector at the same distance, the dull black face emits most and the shiny silver face least.",
    hints: ["What must be the same for each face?"] });

  q.mcq({ d: 3, skill: "ANALYSIS", applies: C,
    stem: "An object receives energy faster than it transfers energy away. What happens to it?",
    options: [["Its temperature rises until it emits energy as fast as it receives it.", "Correct."], ["Its temperature falls.", "It is gaining energy overall."], ["Its temperature stays the same.", "Only if the rates were equal."], ["It stops emitting radiation.", "It always emits."]],
    answer: "A", explanation: "Net energy gain raises the temperature; hotter objects emit more, so it warms until the rates balance.",
    hints: ["What happens to emission as an object gets hotter?"] });

  q.mcq({ d: 3, skill: "UNDERSTANDING", applies: C,
    stem: "Two identical cups of tea, one in a narrow mug and one spread out in a wide shallow dish, start at the same temperature. Which cools faster by radiation, and why?",
    options: [["The wide dish: a larger surface area emits radiation faster.", "Correct."], ["The narrow mug: it is taller.", "Height is not the factor."], ["Both the same: same temperature.", "Surface area also matters."], ["The narrow mug: smaller area emits more.", "Larger area emits more."]],
    answer: "A", explanation: "The rate of emission increases with surface area (and surface temperature).",
    hints: ["Which factor besides temperature affects the rate of emission?"] });

  q.mcq({ d: 3, skill: "ANALYSIS", applies: C,
    stem: "How do greenhouse gases such as carbon dioxide raise the Earth's average temperature?",
    options: [["They absorb some of the infrared emitted by the Earth's surface and re-emit some of it back towards the ground.", "Correct."], ["They produce heat by burning.", "They do not burn in the atmosphere."], ["They block sunlight from reaching the Earth.", "That would cool it."], ["They reflect cold away.", "Cold is not reflected."]],
    answer: "A", explanation: "Less infrared escapes to space, so the balance between incoming and outgoing radiation is reached at a higher temperature.",
    hints: ["Think about the balance between incoming and outgoing radiation."] });

  q.match({ d: 2, skill: "UNDERSTANDING",
    stem: "Match each surface with its radiation behaviour.",
    pairs: [["Dull black", "Best absorber and best emitter"], ["Shiny silver", "Best reflector, poorest emitter"], ["Shiny white", "Poor absorber, reflects well"]],
    explanation: "Dark, dull surfaces absorb and emit well; light, shiny surfaces reflect." });

  q.card("DEFINITION", "What is **thermal radiation**?", "Energy transfer by infrared electromagnetic waves; it needs no medium.");
  q.card("FACT", "Which objects emit thermal radiation?", "All objects; hotter objects emit more.");
  q.card("FACT", "Best emitter and absorber?", "Dull black surfaces.");
  q.card("FACT", "Best reflector?", "Shiny white or silver surfaces (also poorest emitters).");
  q.card("CONCEPT", "How does a Leslie's cube compare emitters?", "All faces at the same temperature; an infrared detector at the same distance from each face.");
  q.card("CONCEPT", "When is an object's temperature constant?", "When it transfers energy away as fast as it receives it.", undefined, { applies: C });
  q.card("FACT", "What affects the rate of emission?", "Surface temperature, surface area, and colour/texture.", undefined, { applies: C });
});

// =====================================================================================================================
concept("phys.thermal.transfer-applications", {
  file: "thermal/transfer-applications",
  keyPrefix: "thermal.applications",
  objectives: { cambridge: ["2.3.4.1"], zimsec: ["7.3.4", "7.3.5"] },
}, (q) => {
  q.mcq({ d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In a vacuum flask, what is the main purpose of the vacuum between the double walls?",
    options: [["To stop conduction and convection", "Correct: no particles."], ["To stop radiation", "Radiation crosses a vacuum; the silvering reduces it."], ["To make the flask lighter", "Not the purpose."], ["To keep the liquid from spilling", "Not the purpose."]],
    answer: "A", explanation: "With no particles in the gap, energy cannot be conducted or convected across it." });

  q.mcq({ d: 2, skill: "UNDERSTANDING",
    stem: "Why are the inner walls of a vacuum flask silvered?",
    options: [["To reduce energy transfer by radiation", "Correct: shiny surfaces are poor emitters and reflect radiation."], ["To stop convection", "The vacuum does that."], ["To make it look attractive", "Not the physics reason."], ["To conduct heat away", "That would make it worse."]],
    answer: "A", explanation: "Silvered surfaces are poor emitters and good reflectors of infrared, reducing radiation losses." });

  q.match({ d: 3, skill: "UNDERSTANDING",
    stem: "Match each feature of a vacuum flask with the energy transfer it reduces.",
    pairs: [["Vacuum between the walls", "Conduction and convection"], ["Silvered surfaces", "Radiation"], ["Insulating stopper", "Convection and evaporation through the top"], ["Insulating pads supporting the inner bottle", "Conduction to the outer case"]],
    explanation: "Each feature tackles a particular method of energy transfer.",
    hints: ["Which methods need particles?"] });

  q.mcq({ d: 2, skill: "UNDERSTANDING", applies: Z,
    stem: "Why is the collector panel of a solar water heater painted dull black?",
    options: [["Dull black is the best absorber of infrared radiation.", "Correct."], ["Black paint stops convection.", "Not the reason."], ["Black surfaces reflect sunlight onto the tank.", "They absorb it."], ["Black paint insulates the pipes.", "Not the reason."]],
    answer: "A", explanation: "A dull black surface absorbs the most radiation from the Sun." });

  q.mcq({ d: 3, skill: "ANALYSIS", applies: Z,
    stem: "In a solar water heater without a pump, why must the storage tank be placed above the collector panel?",
    options: [["Hot water rises by convection into the tank, and cooler water sinks back to the panel.", "Correct."], ["So the tank receives more sunlight.", "Not the main reason."], ["Hot water sinks.", "Hot water rises."], ["To make the system lighter.", "Not the reason."]],
    answer: "A", explanation: "The circulation depends on convection: heated, less dense water rises to the tank above.",
    hints: ["Does heated water rise or sink?"] });

  q.mcq({ d: 2, skill: "UNDERSTANDING",
    stem: "On a sunny afternoon by Lake Kariba, a breeze blows from the lake towards the land. Why?",
    options: [["The land heats up faster than the water; air over the land rises and cooler air from over the lake moves in.", "Correct: a lake (sea) breeze."], ["The water is hotter than the land.", "By day the land is hotter."], ["Wind always blows from water to land.", "At night it reverses."], ["The lake gives out cold radiation.", "Cold is not radiated."]],
    answer: "A", explanation: "Land has a lower specific heat capacity and warms faster; warm air rises over the land and air from over the water replaces it." });

  q.tf({ d: 2, skill: "UNDERSTANDING",
    stem: "At night the breeze often blows from the land towards a large lake.",
    answer: true, explanation: "At night the land cools faster than the water; air rises over the warmer water and air flows from the land: a land breeze." });

  q.struct({ d: 4, skill: "ANALYSIS", applies: C, examStyle: true,
    stem: "People sit around a wood fire on a cold evening.",
    parts: [
      P.manual({ label: "(a)", marks: 1, stem: "Explain how energy reaches the faces of people sitting beside (not above) the fire.",
        points: ["By (infrared) radiation from the flames and hot embers"] }),
      P.manual({ label: "(b)", marks: 2, stem: "Explain why smoke rises above the fire and fresh air flows in at the bottom.",
        points: ["Hot gases above the fire expand, become less dense and rise (convection)", "cooler, denser air flows in at the bottom to replace them"] }),
      P.manual({ label: "(c)", marks: 1, stem: "A metal poker is left with one end in the fire. Explain why the other end becomes hot.",
        points: ["Energy is conducted along the metal (by free electrons and vibrating particles) from the hot end to the cool end"] }),
    ],
    explanation: "Radiation warms people beside the fire; convection carries hot gases up and draws in fresh air; conduction heats the poker.",
    hints: ["One method for each part."] });

  q.mcq({ d: 3, skill: "ANALYSIS", applies: C,
    stem: "In a car's cooling system, how is energy carried from the engine to the radiator?",
    options: [["The hot water is pumped round, carrying the energy by (forced) convection", "Correct."], ["By radiation through the air", "Radiation is a small part."], ["By conduction along the rubber pipes", "Rubber is an insulator."], ["It is not carried; it is destroyed in the engine", "Energy cannot be destroyed."]],
    answer: "A", explanation: "Water heated by conduction in the engine is pumped to the radiator: the moving water carries the energy (forced convection).",
    hints: ["The water moves round the system."] });

  q.mcq({ d: 2, skill: "UNDERSTANDING",
    stem: "Why do thatched roofs keep huts cool in the day and warm at night?",
    options: [["The thatch traps air, which is a poor conductor.", "Correct."], ["Thatch is a good conductor.", "It is a poor conductor."], ["Thatch reflects all radiation.", "Not the main reason."], ["Thatch produces heat at night.", "It does not."]],
    answer: "A", explanation: "The many air pockets in thatch reduce conduction in both directions." });

  q.card("CONCEPT", "How does a vacuum flask reduce energy transfer?", "Vacuum: no conduction/convection. Silvering: less radiation. Stopper: less convection and evaporation.");
  q.card("CONCEPT", "Design of a solar water heater?", "Dull black collector, glass cover, insulated back, tank above the panel for convection.", undefined, { applies: Z });
  q.card("CONCEPT", "What causes a sea (or lake) breeze by day?", "Land warms faster; warm air rises over the land and cooler air from over the water moves in.");
  q.card("CONCEPT", "What causes a land breeze at night?", "Land cools faster; air rises over the warmer water and air flows from the land.");
  q.card("CONCEPT", "Which transfers happen around a fire?", "Radiation to people beside it, convection of hot gases upwards, conduction along a poker.", undefined, { applies: C });
  q.card("CONCEPT", "Why are cooking pans made of metal with plastic handles?", "Metal conducts energy to the food; plastic insulates the hand.");
});
