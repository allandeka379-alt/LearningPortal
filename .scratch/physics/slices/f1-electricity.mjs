import { concept, P, t } from "../lib.mjs";

const Z = ["zimsec"];
const C = ["cambridge"];
const REL2 = { kind: "relative", amount: 0.02 };

// =====================================================================================================================
concept("phys.electricity.electrostatics", {
  file: "electricity/electrostatics",
  keyPrefix: "electricity.static",
  objectives: { cambridge: ["4.2.1.1", "4.2.1.2", "4.2.1.3", "4.2.1.4", "4.2.1.5", "4.2.1.6", "4.2.1.7", "4.2.1.8", "4.2.1.9", "4.2.1.10"], zimsec: ["11.1.1", "11.1.2", "11.1.3", "11.1.4", "11.1.5", "11.1.6"] },
}, (q) => {
  q.mcq({ d: 1, skill: "RECALL",
    stem: "Two balloons, both charged negatively, are held close together. What happens?",
    options: [["They repel each other.", "Correct: like charges repel."], ["They attract each other.", "Unlike charges attract; these are alike."], ["Nothing happens.", "Charged objects exert forces on each other."], ["They both become positive.", "Bringing them close does not change their charge."]],
    answer: "A", explanation: "Like charges repel, so two negatively charged balloons push each other apart." });

  q.mcq({ d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A polythene rod is rubbed with a woollen cloth and becomes negatively charged. What has happened?",
    options: [["Electrons have moved from the cloth to the rod.", "Correct."], ["Protons have moved from the rod to the cloth.", "Protons stay in the nuclei."], ["Electrons have moved from the rod to the cloth.", "Then the rod would be positive."], ["Positive charge has been created on the cloth.", "Charge is transferred, not created."]],
    answer: "A", explanation: "Only electrons move in charging by friction. The rod gained electrons (negative); the cloth lost them (positive)." });

  q.tf({ d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "An acetate rod that has been charged positively by rubbing has lost electrons.",
    answer: true, explanation: "An object becomes positive by losing electrons; positive charges (protons) do not move." });

  q.mcq({ d: 2, skill: "UNDERSTANDING",
    stem: "Why do metals conduct electricity while plastics do not?",
    options: [["Metals contain free electrons that can move through them.", "Correct."], ["Metals contain more protons.", "Protons cannot move through a solid."], ["Plastics have no electrons.", "All materials contain electrons; in plastics they are held tightly."], ["The positive ions in metals flow through the wire.", "The ions stay in place; electrons drift."]],
    answer: "A", explanation: "In a metal some electrons are free to drift between the atoms; in an insulator every electron is held tightly by its atom." });

  q.mcq({ d: 2, skill: "UNDERSTANDING",
    stem: "A charged rod is brought near a small object hanging from a thread. Which observation proves that the object is charged?",
    options: [["The object is repelled by the rod.", "Correct: only charged objects are repelled."], ["The object is attracted to the rod.", "A charged rod also attracts uncharged objects."], ["The object does not move.", "That suggests it is uncharged or too heavy."], ["The object swings towards the rod and touches it.", "Attraction does not prove the object was charged."]],
    answer: "A", explanation: "A charged rod attracts both oppositely charged and uncharged objects, so only repulsion proves the object is charged." });

  q.mcq({ d: 3, skill: "ANALYSIS",
    stem: "A negatively charged polythene rod attracts a light metal-coated ball hanging from a thread. What can you conclude about the ball?",
    options: [["It is either positively charged or uncharged.", "Correct."], ["It must be negatively charged, like the rod.", "Like charges would repel."], ["It must be positively charged, opposite to the rod.", "An uncharged ball would also be attracted."], ["It must be uncharged, with no charge at all.", "A positive ball would also be attracted."]],
    answer: "A", explanation: "Attraction happens between unlike charges and also between a charged object and an uncharged one, so the ball could be positive or uncharged.",
    hints: ["Which kinds of object does a charged rod attract?"] });

  q.fib({ d: 2, skill: "RECALL",
    stem: "Complete the rule.",
    template: "Like charges {{blank:a}}; unlike charges {{blank:b}}.",
    blanks: [
      { id: "a", input: "select", choices: ["attract", "repel"], accepted: ["repel"], wrong: "attract" },
      { id: "b", input: "select", choices: ["attract", "repel"], accepted: ["attract"], wrong: "repel" },
    ],
    explanation: "Like charges repel; unlike charges attract." });

  q.mcq({ d: 2, skill: "APPLICATION",
    stem: "On a dry winter day, a learner walks across a nylon carpet and then gets a small shock on touching a metal door handle. What causes the shock?",
    options: [["Charge built up on the learner by friction flows to earth.", "Correct."], ["The door handle is connected to the mains supply.", "It is not: the charge came from the learner."], ["The carpet stores electricity like a battery.", "The carpet is an insulator that charged the learner by friction."], ["The metal handle produces electricity.", "Metal conducts charge; it does not produce it."]],
    answer: "A", explanation: "Friction between shoes and carpet transfers electrons, charging the learner. Touching a conductor lets the charge flow away suddenly as a small spark." });

  q.short({ d: 1, skill: "RECALL", applies: C,
    stem: "State the unit of electric charge.",
    accepted: ["coulomb", "coulombs", "C", "the coulomb"], wrong: ["ampere"],
    explanation: "Charge is measured in coulombs (C)." });

  q.mcq({ d: 2, skill: "RECALL", applies: C,
    stem: "How is the direction of an electric field at a point defined?",
    options: [["As the direction of the force on a small positive charge placed there", "Correct."], ["As the direction of the force on a negative charge placed there", "The definition uses a positive charge."], ["As the direction in which electrons move", "Electrons move against the field."], ["Always from a negative charge to a positive charge", "Field lines point away from positive charge."]],
    answer: "A", explanation: "The field direction is the direction of the force on a positive test charge." });

  q.match({ d: 3, skill: "UNDERSTANDING", applies: C,
    stem: "Match each charge arrangement with its electric field pattern.",
    pairs: [["An isolated positive point charge", "Straight lines pointing radially outwards"], ["An isolated negative point charge", "Straight lines pointing radially inwards"], ["Two oppositely charged parallel plates", "Evenly spaced parallel lines from the positive to the negative plate"]],
    explanation: "Field lines point away from positive charges and towards negative ones; between parallel plates the field is uniform.",
    hints: ["Field lines show the direction of the force on a positive charge."] });

  q.mcq({ d: 3, skill: "APPLICATION", applies: Z,
    stem: "A metal sphere on an insulating stand is charged by induction using a negatively charged rod: the sphere is earthed while the rod is near, the earth is removed and then the rod is taken away. What is the final charge on the sphere?",
    options: [["Positive", "Correct: electrons were repelled to earth."], ["Negative", "Induction gives the opposite charge to the rod."], ["Zero", "Some electrons left through the earth connection."], ["It depends on the size of the sphere", "The sign is always opposite to the rod."]],
    answer: "A", explanation: "The negative rod repels free electrons in the sphere, which flow to earth; with the earth removed first, the sphere is left short of electrons, so positive.",
    hints: ["Which way do the sphere's free electrons move when the negative rod is near?"] });

  q.mcq({ d: 3, skill: "UNDERSTANDING", applies: Z,
    stem: "When charging a sphere by induction, why must the earth connection be removed before the charged rod is taken away?",
    options: [["Electrons would flow back from earth and cancel the charge.", "Correct."], ["Otherwise the rod would lose its charge to earth.", "The rod does not touch the sphere."], ["Otherwise the sphere would become negatively charged.", "It would become neutral."], ["To stop a spark jumping from the rod to the sphere.", "Not the reason."]],
    answer: "A", explanation: "While the sphere is still earthed, removing the rod lets electrons flow back, cancelling the induced charge.",
    hints: ["What holds the induced charge in place while the rod is near?"] });

  q.mcq({ d: 2, skill: "UNDERSTANDING", applies: Z,
    stem: "What does a lightning conductor on a tall building do?",
    options: [["It gives charge a low-resistance path to flow to earth.", "Correct."], ["It stores the charge from a lightning strike.", "It does not store charge."], ["It repels lightning away from the building.", "It does not repel lightning."], ["It insulates the building from the ground.", "It connects the building to the ground."]],
    answer: "A", explanation: "A pointed metal rod joined by a thick copper strip to an earth plate carries a strike's charge safely into the ground instead of through the building." });

  q.struct({ d: 3, skill: "APPLICATION", examStyle: true,
    stem: "A learner is given a copper strip, a plastic ruler, a glass rod and a graphite pencil lead, and asked to find out which are conductors.",
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "Describe a simple test the learner could use.",
        points: ["Connect each material in turn in series with a cell and a lamp (or an ammeter), using crocodile clips", "If the lamp lights (or the ammeter shows a current) the material is a conductor; if not, it is an insulator"] }),
      P.mcq({ label: "(b)", stem: "Which two materials would make the lamp light?", options: [["The copper strip and the graphite", "Correct: metals and graphite conduct."], ["The plastic ruler and the glass rod", "These are insulators."], ["The copper strip and the glass rod", "Glass is an insulator."], ["The graphite and the plastic ruler", "Plastic is an insulator."]], answer: "A",
        explanation: "Copper (a metal) and graphite contain charges free to move; plastic and glass do not." }),
      P.manual({ label: "(c)", marks: 2, stem: "Use the electron model to explain why copper conducts but plastic does not.",
        points: ["Copper has free electrons that can drift through it", "In plastic the electrons are held tightly by their atoms, so no charge can flow"] }),
    ],
    explanation: "A circuit test sorts conductors (lamp lights) from insulators; metals conduct because of free electrons.",
    hints: ["What happens to a lamp in a circuit with a gap filled by an insulator?"] });

  q.card("FACT", "Forces between charges?", "Like charges repel; unlike charges attract.");
  q.card("CONCEPT", "What happens in charging by friction?", "Electrons move from one material to the other: the one that gains electrons becomes negative, the other positive.");
  q.card("CONCEPT", "Why do metals conduct?", "They contain free electrons that can drift through the metal.");
  q.card("FACT", "The only sure test that an object is charged?", "It is repelled by a charged object.");
  q.card("DEFINITION", "What is an **electric field**?", "A region where a charge feels a force; its direction is the force on a positive charge.", undefined, { applies: C });
  q.card("FACT", "Unit of charge?", "The coulomb (C).", undefined, { applies: C });
  q.card("CONCEPT", "Charging a sphere by induction (negative rod)?", "Rod near; earth the sphere (electrons flow away); remove earth; remove rod: the sphere is positive.", undefined, { applies: Z });
  q.card("CONCEPT", "How does a lightning conductor work?", "It gives charge a low-resistance path through thick copper to earth, so a strike does not pass through the building.", undefined, { applies: Z });
});

// =====================================================================================================================
concept("phys.electricity.cells", {
  file: "electricity/cells",
  keyPrefix: "electricity.cells",
  objectives: { zimsec: ["11.2.1", "11.2.3"] },
}, (q) => {
  q.mcq({ d: 1, skill: "RECALL", applies: Z,
    stem: "Which of these is a primary cell?",
    options: [["A zinc–carbon dry cell", "Correct: it cannot be recharged."], ["A lead–acid car battery", "That is a secondary cell."], ["A lithium-ion phone battery", "That is rechargeable."], ["A nickel–metal hydride cell", "That is rechargeable."]],
    answer: "A", explanation: "Primary cells, such as zinc–carbon and alkaline dry cells, cannot be recharged." });

  q.mcq({ d: 1, skill: "RECALL", applies: Z,
    stem: "What is the main advantage of a secondary cell over a primary cell?",
    options: [["It can be recharged and used many times.", "Correct."], ["It always has a larger e.m.f.", "Not always."], ["It is always lighter.", "Lead–acid cells are heavy."], ["It never runs down.", "It runs down and must be recharged."]],
    answer: "A", explanation: "A secondary cell can be recharged by driving a current through it in reverse." });

  q.tf({ d: 2, skill: "RECALL", applies: Z, daily: true,
    stem: "A primary dry cell can safely be recharged.",
    answer: false, explanation: "Primary cells cannot be recharged; trying can make them overheat, leak or burst." });

  q.num({ d: 2, skill: "APPLICATION", applies: Z, daily: true,
    stem: "A radio uses four 1.5 V cells connected in series. What is the total e.m.f.?",
    value: 6.0, answer: "6.0", unit: "V", wrong: [1.5, 0.375],
    explanation: t`The e.m.f.s of cells in series add: $4 \times 1.5 = 6.0\ \text{V}$.` });

  q.num({ d: 2, skill: "APPLICATION", applies: Z,
    stem: "A solar battery bank needs an e.m.f. of 24 V. How many 2.0 V lead–acid cells must be connected in series?",
    value: 12, wrong: [48, 6],
    explanation: t`Number of cells $= \dfrac{24}{2.0} = 12$.` });

  q.num({ d: 3, skill: "ANALYSIS", applies: Z,
    stem: "A learner connects five 1.5 V cells in series, but two of them are put in the wrong way round. What is the total e.m.f.?",
    value: 1.5, answer: "1.5", unit: "V", wrong: [7.5, 4.5],
    explanation: t`Three cells add and two oppose: $3 \times 1.5 - 2 \times 1.5 = 1.5\ \text{V}$.`,
    hints: ["A cell connected the wrong way round subtracts its e.m.f."] });

  q.mcq({ d: 2, skill: "RECALL", applies: Z,
    stem: "Which energy change takes place in a photovoltaic (solar) cell?",
    options: [["Light energy to electrical energy", "Correct."], ["Chemical energy to electrical energy", "That happens in a dry cell."], ["Thermal energy to electrical energy", "Not in a solar cell."], ["Electrical energy to light energy", "That is a lamp."]],
    answer: "A", explanation: "A solar cell converts light energy directly into electrical energy." });

  q.mcq({ d: 2, skill: "UNDERSTANDING", applies: Z,
    stem: "Why are the solar panels of a home system usually used together with rechargeable batteries?",
    options: [["Panels give nothing at night, so batteries store energy for later.", "Correct."], ["The panels need a battery's current to start them working.", "They work whenever light falls on them."], ["The batteries make the panels convert sunlight more efficiently.", "Batteries store energy; they do not change the panels' efficiency."], ["The batteries change the panels' d.c. output into a.c.", "That is the job of an inverter."]],
    answer: "A", explanation: "Batteries are charged by the panels during the day and supply the lights and phones at night or on cloudy days." });

  q.match({ d: 2, skill: "UNDERSTANDING", applies: Z,
    stem: "Match each source or process with its main energy change.",
    pairs: [["Dry cell supplying a torch", "Chemical to electrical"], ["Solar cell", "Light to electrical"], ["Generator", "Kinetic to electrical"], ["Charging a lead–acid battery", "Electrical to chemical"]],
    explanation: "Cells release chemical energy; solar cells use light; generators use kinetic energy; charging stores chemical energy." });

  q.mcq({ d: 2, skill: "UNDERSTANDING", applies: Z,
    stem: "How should a secondary cell be connected to a d.c. charger?",
    options: [["Positive to positive and negative to negative, driving current in reverse", "Correct."], ["Positive to negative and negative to positive, like cells in series", "This would discharge the cell through the charger."], ["Straight to the a.c. mains, with no charger in between", "Charging needs direct current."], ["Either way round, because a charger works in both directions", "The polarity matters."]],
    answer: "A", explanation: "The charger's slightly higher p.d. drives current backwards through the cell, reversing the chemical changes." });

  q.mcq({ d: 3, skill: "EVALUATION", applies: Z, multiple: true,
    stem: "Select **all** the safe practices with batteries.",
    options: [["Taking used car batteries to a recycling point", "Correct."], ["Charging lead–acid batteries in a well-ventilated place", "Correct: they give off gas."], ["Never connecting a wire straight across a cell's terminals", "Correct: a short circuit overheats it."], ["Burning old dry cells to get rid of them", "Dangerous: toxic fumes and bursting."], ["Recharging alkaline dry cells to save money", "Primary cells must not be recharged."], ["Carrying loose cells in a pocket with metal keys", "The keys can short-circuit the cells."]],
    answer: ["A", "B", "C"], explanation: "Recycle batteries, ventilate when charging and avoid short circuits; never burn or recharge primary cells.",
    hints: ["Think about heating, gas, acid and toxic metals."] });

  q.mcq({ d: 2, skill: "UNDERSTANDING", applies: Z,
    stem: "Why do cars use lead–acid batteries rather than dry cells?",
    options: [["They give the huge starter current and are recharged as the car runs.", "Correct."], ["They are lighter than dry cells of the same energy.", "They are heavy."], ["They contain no acid, so they are safer in a crash.", "They contain sulfuric acid."], ["They give the a.c. that the engine's spark plugs need.", "Batteries give d.c."]],
    answer: "A", explanation: "Lead–acid batteries deliver large currents and are rechargeable, so the car's generator keeps them charged." });

  q.struct({ d: 3, skill: "APPLICATION", applies: Z, examStyle: true,
    stem: "A rural clinic uses solar panels to charge a 48 V bank of lead–acid batteries, which runs LED lights and a vaccine fridge at night.",
    parts: [
      P.num({ label: "(a)", stem: "How many 2.0 V lead–acid cells are connected in series to give 48 V?", value: 24, wrong: [96],
        explanation: t`$\dfrac{48}{2.0} = 24$ cells.` }),
      P.manual({ label: "(b)", marks: 2, stem: "State two advantages of using solar panels at the clinic.",
        points: ["One advantage: sunlight is a free, renewable energy source", "A second advantage: it works without a grid connection or during power cuts, with no fuel cost or pollution"] }),
      P.mcq({ label: "(c)", stem: "Why must the battery room be well ventilated?", options: [["Gases given off while charging must not build up.", "Correct."], ["The batteries need fresh oxygen to work.", "Lead–acid batteries do not use oxygen from the air."], ["To cool the solar panels.", "The panels are outside."], ["To stop the acid freezing.", "Not a risk in a clinic."]], answer: "A",
        explanation: "Lead–acid batteries can give off gases while charging, so ventilation is needed." }),
    ],
    explanation: "Cells in series add: 24 × 2.0 V = 48 V. Solar energy is free and works off-grid; charging rooms need ventilation.",
    hints: ["The e.m.f.s of cells in series add."] });

  q.card("DEFINITION", "What is a **primary cell**?", "A cell that cannot be recharged, such as a zinc–carbon or alkaline dry cell (about 1.5 V).", undefined, { applies: Z });
  q.card("DEFINITION", "What is a **secondary cell**?", "A rechargeable cell, such as a lead–acid cell (about 2 V) or a lithium-ion cell.", undefined, { applies: Z });
  q.card("CONCEPT", "E.m.f. of cells in series?", "The e.m.f.s add; a cell connected the wrong way round subtracts.", undefined, { applies: Z });
  q.card("FACT", "What does a solar (photovoltaic) cell do?", "Converts light energy directly into electrical energy; usually used with rechargeable batteries.", undefined, { applies: Z });
  q.card("FACT", "How is a secondary cell recharged?", "Connected positive to positive to a slightly higher d.c. supply, driving current through it in reverse.", undefined, { applies: Z });
  q.card("FACT", "Safe battery disposal?", "Do not burn or bin them; recycle, because they contain toxic metals such as lead, cadmium and mercury.", undefined, { applies: Z });
});

// =====================================================================================================================
concept("phys.electricity.current", {
  file: "electricity/current",
  keyPrefix: "electricity.current",
  objectives: { cambridge: ["4.2.2.1", "4.2.2.2", "4.2.2.3", "4.2.2.4", "4.2.2.5", "4.2.2.6"], zimsec: ["11.3.1", "11.3.2"] },
}, (q) => {
  q.mcq({ d: 1, skill: "RECALL",
    stem: "What is an electric current?",
    options: [["The rate of flow of electric charge", "Correct."], ["The energy given to each coulomb of charge", "That is e.m.f. or p.d."], ["The opposition to the flow of charge", "That is resistance."], ["The amount of charge stored in a cell", "Cells store chemical energy, not current."]],
    answer: "A", explanation: "Current is the rate of flow of charge, measured in amperes." });

  q.num({ d: 2, skill: "APPLICATION", daily: true,
    stem: "A charge of 45 C passes through a lamp in 18 s. What is the current?",
    value: 2.5, answer: "2.5", unit: "A", wrong: [810, 0.4],
    explanation: t`$I = \dfrac{Q}{t} = \dfrac{45}{18} = 2.5\ \text{A}$.` });

  q.num({ d: 2, skill: "APPLICATION",
    stem: "A current of 0.20 A flows through a torch bulb for 5.0 minutes. How much charge passes through the bulb?",
    value: 60, unit: "C", wrong: [1, 1500],
    explanation: t`$t = 5.0 \times 60 = 300\ \text{s}$, so $Q = It = 0.20 \times 300 = 60\ \text{C}$.` });

  q.num({ d: 3, skill: "ANALYSIS",
    stem: "How long does it take for 960 C of charge to flow through a heater that carries a current of 4.0 A?",
    value: 240, unit: "s", wrong: [3840, 0.0042],
    explanation: t`$t = \dfrac{Q}{I} = \dfrac{960}{4.0} = 240\ \text{s}$ (4.0 minutes).`,
    hints: [t`Rearrange $I = \dfrac{Q}{t}$ to make $t$ the subject.`] });

  q.mcq({ d: 2, skill: "UNDERSTANDING",
    stem: "A metal wire is connected across a cell. In which direction do the free electrons in the wire drift?",
    options: [["From the negative terminal round to the positive terminal", "Correct."], ["From the positive terminal round to the negative terminal", "That is the conventional current direction."], ["They vibrate on the spot without drifting at all", "They drift slowly along the wire."], ["Equally in both directions along the wire", "There is an overall drift one way."]],
    answer: "A", explanation: "Electrons are negative, so they are attracted towards the positive terminal: they flow from negative to positive, opposite to conventional current." });

  q.tf({ d: 2, skill: "RECALL", daily: true,
    stem: "Conventional current flows from the positive terminal of a cell, round the circuit, to the negative terminal.",
    answer: true, explanation: "Conventional current is from positive to negative; electrons actually move the other way." });

  q.mcq({ d: 2, skill: "RECALL",
    stem: "What is the difference between direct current and alternating current?",
    options: [["D.c. flows one way only; a.c. keeps reversing direction.", "Correct."], ["D.c. is always larger than a.c. from the same source.", "Size is not the difference."], ["A.c. comes only from batteries and solar cells.", "Batteries give d.c."], ["D.c. reverses direction 50 times every second.", "That describes the a.c. mains."]],
    answer: "A", explanation: "D.c. (from cells) flows in one direction; a.c. (from the mains, 50 Hz in Zimbabwe) reverses direction repeatedly." });

  q.mcq({ d: 1, skill: "RECALL",
    stem: "How should an ammeter be connected to measure the current through a lamp?",
    options: [["In series with the lamp", "Correct."], ["In parallel across the lamp", "That is how a voltmeter is connected."], ["Across the terminals of the cell only", "No."], ["Either way: it makes no difference", "It must be in series."]],
    answer: "A", explanation: "All the current through the lamp must also pass through the ammeter, so it is connected in series." });

  q.mcq({ d: 3, skill: "APPLICATION",
    stem: "A current of about 40 mA is expected. A digital meter has the ranges 20 A, 2 A, 200 mA and 20 mA. Which range gives the most precise reading without going off the scale?",
    options: [["200 mA", "Correct."], ["20 mA", "40 mA is over this range."], ["2 A", "It would work, but with fewer useful digits."], ["20 A", "Far too coarse."]],
    answer: "A", explanation: "Choose the smallest range that is still larger than the expected value: 200 mA.",
    hints: ["The range must be larger than 40 mA, but as small as possible."] });

  q.mcq({ d: 3, skill: "UNDERSTANDING",
    stem: "Electrons drift through a wire at only a fraction of a millimetre per second. Why does a lamp light almost as soon as it is switched on?",
    options: [["Free charges all round the circuit start moving at the same moment.", "Correct."], ["Electrons travel from the switch to the lamp at the speed of light.", "The electrons themselves drift slowly."], ["The switch stores charge until it is pressed.", "Switches do not store charge."], ["The current starts inside the lamp.", "The source drives charge round the whole circuit."]],
    answer: "A", explanation: "The wires are already full of free electrons; when the circuit is completed they all start drifting at once, including those in the lamp.",
    hints: ["Where are the free electrons before the switch is closed?"] });

  q.match({ d: 1, skill: "RECALL",
    stem: "Match each quantity with its SI unit.",
    pairs: [["Current", "Ampere"], ["Charge", "Coulomb"], ["Time", "Second"]],
    explanation: "Current: ampere (A). Charge: coulomb (C). Time: second (s)." });

  q.fib({ d: 2, skill: "RECALL",
    stem: "Complete the sentence.",
    template: "A current of one ampere is a flow of one {{blank:a}} of charge per {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["coulomb", "C"], wrong: "volt" },
      { id: "b", accepted: ["second", "s"], wrong: "hour" },
    ],
    explanation: "1 A = 1 C/s." });

  q.mcq({ d: 2, skill: "UNDERSTANDING",
    stem: "When reading an analogue ammeter, why should your eye be directly above the needle?",
    options: [["To avoid a parallax error", "Correct."], ["To avoid a zero error", "A zero error is checked before connecting the meter."], ["To protect the meter", "No."], ["To change the range", "No."]],
    answer: "A", explanation: "Viewing the needle at an angle makes it appear against the wrong point on the scale (parallax)." });

  q.struct({ d: 3, skill: "APPLICATION", examStyle: true,
    stem: "A cellphone battery is charged with a current of 1.2 A for 2.5 hours.",
    parts: [
      P.num({ label: "(a)", stem: "Convert the charging time into seconds.", value: 9000, unit: "s", wrong: [150],
        explanation: t`$2.5 \times 3600 = 9000\ \text{s}$.` }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the charge that flows into the battery.", value: 10800, unit: "C", wrong: [3, 180],
        explanation: t`$Q = It = 1.2 \times 9000 = 10\,800\ \text{C}$.` }),
      P.mcq({ label: "(c)", stem: "The charger is plugged into the a.c. mains. What type of current does it supply to the battery?", options: [["Direct current", "Correct: a battery is charged with d.c."], ["Alternating current", "A.c. would charge and discharge it alternately."], ["Either type", "Only d.c. charges a battery."], ["Neither: it supplies voltage only", "A current flows into the battery."]], answer: "A",
        explanation: "The charger converts the mains a.c. into d.c., which drives charge into the battery in one direction." }),
    ],
    explanation: "Convert hours to seconds, then Q = It; batteries are charged with direct current.",
    hints: ["1 hour = 3600 s."] });

  q.card("DEFINITION", "What is **electric current**?", "The rate of flow of charge; unit ampere (A).");
  q.card("FORMULA", "Current, charge and time?", t`$I = \dfrac{Q}{t}$ (A = C/s)`);
  q.card("CONCEPT", "How do metals conduct?", "Free electrons drift through the metal when a p.d. is applied.");
  q.card("FACT", "Conventional current vs electron flow?", "Conventional current: positive to negative. Electrons: negative to positive.", undefined, { applies: C });
  q.card("DEFINITION", "**d.c.** vs **a.c.**?", "D.c. flows one way (cells). A.c. keeps reversing (mains, 50 Hz).");
  q.card("FACT", "How is an ammeter connected?", "In series, positive terminal towards the positive of the supply, on a suitable range.");
});

// =====================================================================================================================
concept("phys.electricity.emf-pd", {
  file: "electricity/emf-pd",
  keyPrefix: "electricity.emf",
  objectives: { cambridge: ["4.2.3.1", "4.2.3.2", "4.2.3.3", "4.2.3.4", "4.2.3.5", "4.2.3.6", "4.2.3.7"], zimsec: ["11.2.1", "11.2.2", "11.3.2", "11.3.3"] },
}, (q) => {
  q.mcq({ d: 1, skill: "RECALL",
    stem: "Which unit is used for both e.m.f. and potential difference?",
    options: [["Volt", "Correct."], ["Ampere", "That is the unit of current."], ["Ohm", "That is the unit of resistance."], ["Joule", "That is the unit of energy."]],
    answer: "A", explanation: "E.m.f. and p.d. are both measured in volts (joules per coulomb)." });

  q.mcq({ d: 2, skill: "RECALL",
    stem: "Which statement defines the e.m.f. of a source?",
    options: [["Work done by the source moving unit charge round a circuit", "Correct."], ["The work done by unit charge passing through a component", "That defines potential difference."], ["The rate of flow of charge from the source", "That is current."], ["The total energy stored in the source", "E.m.f. is energy per unit charge."]],
    answer: "A", explanation: "E.m.f. is the work done by the source per unit charge moved round the complete circuit." });

  q.tf({ d: 2, skill: "RECALL", daily: true,
    stem: "One volt is equal to one joule per coulomb.",
    answer: true, explanation: t`$V = \dfrac{W}{Q}$, so $1\ \text{V} = 1\ \text{J/C}$.` });

  q.num({ d: 2, skill: "APPLICATION", daily: true,
    stem: "A 1.5 V cell drives 240 C of charge round a circuit. How much energy does it transfer to the charge?",
    value: 360, unit: "J", wrong: [160, 0.00625],
    explanation: t`$W = EQ = 1.5 \times 240 = 360\ \text{J}$.` });

  q.num({ d: 2, skill: "APPLICATION",
    stem: "A lamp has a p.d. of 6.0 V across it. How much energy does it transfer when 25 C of charge passes through it?",
    value: 150, unit: "J", wrong: [4.2, 0.24],
    explanation: t`$W = VQ = 6.0 \times 25 = 150\ \text{J}$.` });

  q.num({ d: 3, skill: "ANALYSIS",
    stem: "When 18 C of charge passes through a small motor, 108 J of energy is transferred. What is the p.d. across the motor?",
    value: 6.0, answer: "6.0", unit: "V", wrong: [1944, 0.17],
    explanation: t`$V = \dfrac{W}{Q} = \dfrac{108}{18} = 6.0\ \text{V}$.`,
    hints: [t`Use $V = \dfrac{W}{Q}$.`] });

  q.mcq({ d: 1, skill: "RECALL",
    stem: "How should a voltmeter be connected to measure the p.d. across a resistor?",
    options: [["In parallel, with one lead on each side of the resistor", "Correct."], ["In series with the resistor, next to it", "That is how an ammeter is connected."], ["In series with the cell, between it and the switch", "A voltmeter in series blocks the current; it must go across the resistor."], ["Anywhere in the circuit, as long as it is connected", "It must be across the resistor."]],
    answer: "A", explanation: "A voltmeter measures the p.d. between two points, so it is connected across (in parallel with) the component." });

  q.mcq({ d: 3, skill: "UNDERSTANDING",
    stem: "Which statement correctly compares e.m.f. and potential difference?",
    options: [["E.m.f.: energy given to each coulomb; p.d.: energy it transfers in a part.", "Correct."], ["E.m.f. is measured in amperes, while p.d. is measured in volts.", "Both are measured in volts."], ["E.m.f. applies to components, while p.d. applies to sources.", "It is the other way round."], ["E.m.f. and p.d. mean exactly the same thing in every circuit.", "They describe energy given to and taken from the charge."]],
    answer: "A", explanation: "A source does work on the charge (e.m.f.); in a component, the charge does work and transfers energy (p.d.).",
    hints: ["Is energy given to the charge or taken from it?"] });

  q.num({ d: 2, skill: "APPLICATION",
    stem: "A lamp and a resistor are connected in series to a 9.0 V battery. The p.d. across the lamp is 6.5 V. What is the p.d. across the resistor?",
    value: 2.5, answer: "2.5", unit: "V", wrong: [15.5, 6.5],
    explanation: t`The p.d.s in series add up to the e.m.f.: $9.0 - 6.5 = 2.5\ \text{V}$.` });

  q.mcq({ d: 2, skill: "UNDERSTANDING",
    stem: "A voltmeter is connected directly across a cell that is not connected to anything else. What does it read?",
    options: [["The e.m.f. of the cell", "Correct."], ["Zero", "There is a p.d. between the terminals."], ["The current from the cell", "A voltmeter measures p.d."], ["The resistance of the cell", "No."]],
    answer: "A", explanation: "With no current drawn, the p.d. between the terminals equals the cell's e.m.f." });

  q.fib({ d: 2, skill: "RECALL", applies: C,
    stem: "Complete the equation in words.",
    template: "1 volt = 1 {{blank:a}} per {{blank:b}}",
    blanks: [
      { id: "a", accepted: ["joule", "J"], wrong: "ampere" },
      { id: "b", accepted: ["coulomb", "C"], wrong: "second" },
    ],
    explanation: t`From $V = \dfrac{W}{Q}$: a volt is a joule per coulomb.` });

  q.match({ d: 2, skill: "RECALL",
    stem: "Match each quantity with its definition.",
    pairs: [["E.m.f.", "Work done by a source per unit charge around a complete circuit"], ["Potential difference", "Work done per unit charge passing through a component"], ["Current", "Charge passing a point per unit time"]],
    explanation: "E.m.f.: work per unit charge by the source. P.d.: work per unit charge in a component. Current: charge per second." });

  q.mcq({ d: 2, skill: "APPLICATION",
    stem: "A digital voltmeter has the ranges 200 V, 20 V, 2 V and 200 mV. Which range should be used to measure the p.d. across a 9 V battery?",
    options: [["20 V", "Correct: the smallest range above 9 V."], ["2 V", "9 V is over this range."], ["200 V", "Works, but gives fewer useful digits."], ["200 mV", "Far too small."]],
    answer: "A", explanation: "Use the smallest range larger than the expected reading." });

  q.struct({ d: 3, skill: "APPLICATION", applies: C, examStyle: true,
    stem: "A 12 V car battery drives a current of 4.0 A through a headlamp for 10 minutes.",
    parts: [
      P.num({ label: "(a)", stem: "Calculate the charge that passes through the headlamp.", value: 2400, unit: "C", wrong: [40],
        explanation: t`$Q = It = 4.0 \times 600 = 2400\ \text{C}$.` }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the energy transferred by the battery.", value: 28800, unit: "J", wrong: [200, 480],
        explanation: t`$W = EQ = 12 \times 2400 = 28\,800\ \text{J}$.` }),
      P.mcq({ label: "(c)", stem: "The p.d. across the headlamp is 11.4 V, slightly less than the battery's e.m.f. What is the best explanation?", options: [["Some energy per coulomb is transferred elsewhere, e.g. in the cables.", "Correct."], ["The headlamp creates a little extra energy of its own.", "Energy cannot be created."], ["Some of the current is used up before reaching the headlamp.", "Current is not used up."], ["The voltmeter adds a little energy to the circuit.", "A voltmeter takes a tiny current; it adds no energy."]], answer: "A",
        explanation: "The p.d.s around the circuit add up to the e.m.f.; a little is transferred in the cables and connections." }),
    ],
    explanation: "Q = It; W = EQ; the p.d.s in a circuit add up to the e.m.f.",
    hints: ["Convert 10 minutes into seconds."] });

  q.card("DEFINITION", "What is **e.m.f.**?", "The electrical work done by a source in moving unit charge around a complete circuit.");
  q.card("DEFINITION", "What is **potential difference**?", "The work done by unit charge passing through a component.");
  q.card("FORMULA", "E.m.f. and p.d. in terms of work and charge?", t`$E = \dfrac{W}{Q}$ and $V = \dfrac{W}{Q}$`, undefined, { applies: C });
  q.card("FACT", "What is a volt?", "One joule per coulomb.");
  q.card("FACT", "How is a voltmeter connected?", "In parallel (across) the component.");
  q.card("CONCEPT", "P.d.s in a series circuit?", "They add up to the e.m.f. of the source.");
});

// =====================================================================================================================
concept("phys.electricity.resistance", {
  file: "electricity/resistance",
  keyPrefix: "electricity.resistance",
  objectives: { cambridge: ["4.2.4.1", "4.2.4.2", "4.2.4.3", "4.2.4.4", "4.2.4.5"], zimsec: ["11.3.4", "11.3.5", "11.3.6", "11.3.7"] },
}, (q) => {
  q.mcq({ d: 1, skill: "RECALL",
    stem: "What is the unit of resistance?",
    options: [["Ohm", "Correct."], ["Volt", "That is the unit of p.d."], ["Ampere", "That is the unit of current."], ["Watt", "That is the unit of power."]],
    answer: "A", explanation: "Resistance is measured in ohms (Ω); 1 Ω = 1 V/A." });

  q.num({ d: 2, skill: "APPLICATION", daily: true,
    stem: "A p.d. of 6.0 V across a resistor drives a current of 0.25 A through it. Calculate its resistance.",
    value: 24, unit: "Ω", wrong: [1.5, 0.042],
    explanation: t`$R = \dfrac{V}{I} = \dfrac{6.0}{0.25} = 24\ \Omega$.` });

  q.num({ d: 2, skill: "APPLICATION",
    stem: "A current of 0.20 A flows through a 47 Ω resistor. Calculate the p.d. across it.",
    value: 9.4, answer: "9.4", unit: "V", wrong: [235, 0.0043],
    explanation: t`$V = IR = 0.20 \times 47 = 9.4\ \text{V}$.` });

  q.num({ d: 3, skill: "APPLICATION",
    stem: "A 1.2 kΩ resistor is connected to a 9.0 V battery. Calculate the current in milliamperes.",
    value: 7.5, answer: "7.5", unit: "mA", wrong: [0.0075, 10800],
    explanation: t`$I = \dfrac{V}{R} = \dfrac{9.0}{1200} = 0.0075\ \text{A} = 7.5\ \text{mA}$.`,
    hints: ["Convert kΩ to Ω first: 1 kΩ = 1000 Ω.", "1 A = 1000 mA."] });

  q.mcq({ d: 2, skill: "RECALL",
    stem: "Which statement is Ohm's law?",
    options: [["Current in a metal conductor ∝ p.d., at constant temperature.", "Correct."], ["Resistance equals p.d. multiplied by current.", "R = V/I, not V × I."], ["Current in any component is inversely proportional to p.d.", "Doubling the p.d. across a resistor doubles the current."], ["The p.d. across a conductor equals the current through it.", "They are different quantities: V = IR."]],
    answer: "A", explanation: "Ohm's law: I ∝ V for a metallic conductor at constant temperature." });

  q.mcq({ d: 2, skill: "UNDERSTANDING",
    stem: "Which component has a current–voltage graph that is a straight line through the origin?",
    options: [["A fixed resistor at constant temperature", "Correct."], ["A filament lamp that warms up", "Its graph curves as it heats up."], ["A diode in forward bias", "It conducts in one direction only."], ["A thermistor being warmed", "Its resistance changes with temperature."]],
    answer: "A", explanation: "A fixed resistor at constant temperature obeys Ohm's law: current is proportional to p.d." });

  q.mcq({ d: 3, skill: "UNDERSTANDING",
    stem: "Why does the current–voltage graph for a filament lamp become less steep as the p.d. increases?",
    options: [["The filament gets hotter, so its resistance increases.", "Correct."], ["The filament's resistance decreases as it heats up.", "Its resistance increases."], ["The current is used up in the filament.", "Current is not used up."], ["The lamp obeys Ohm's law.", "A curved graph shows it does not."]],
    answer: "A", explanation: "A larger current heats the filament more; its resistance rises, so the current increases less for each extra volt.",
    hints: ["What happens to the temperature of the filament as the current increases?"] });

  q.mcq({ d: 2, skill: "UNDERSTANDING",
    stem: "What does the current–voltage graph for a diode show?",
    options: [["Current flows easily in one direction only.", "Correct."], ["Current flows equally well in both directions.", "That is a resistor."], ["Its resistance increases as it heats up.", "That is a filament lamp."], ["Current flows only in the reverse direction.", "It flows in the forward direction."]],
    answer: "A", explanation: "Above a small forward p.d. a diode conducts easily; in reverse almost no current flows." });

  q.mcq({ d: 2, skill: "UNDERSTANDING",
    stem: "A wire is replaced by one of the same metal and thickness but twice as long. What happens to the resistance?",
    options: [["It doubles.", "Correct: resistance is proportional to length."], ["It halves.", "A longer wire has more resistance."], ["It becomes four times as large.", "Only doubling the length."], ["It stays the same.", "Length affects resistance."]],
    answer: "A", explanation: "Resistance is proportional to length, so doubling the length doubles the resistance." });

  q.num({ d: 3, skill: "ANALYSIS",
    stem: "A copper wire has a resistance of 0.80 Ω. What is the resistance of a wire of the same copper and the same length but with four times the cross-sectional area?",
    value: 0.2, answer: "0.20", unit: "Ω", wrong: [3.2, 0.4],
    explanation: t`Resistance is inversely proportional to area: $\dfrac{0.80}{4} = 0.20\ \Omega$.`,
    hints: ["A thicker wire has less resistance."] });

  q.mcq({ d: 3, skill: "ANALYSIS",
    stem: "Wire Y has twice the diameter of wire X. They are made of the same metal and have the same length. How does the resistance of Y compare with that of X?",
    options: [["It is one quarter of X's resistance.", "Correct: twice the diameter gives four times the area."], ["It is half of X's resistance.", "Area depends on diameter squared."], ["It is twice X's resistance.", "A thicker wire has less resistance."], ["It is four times X's resistance.", "A thicker wire has less resistance."]],
    answer: "A", explanation: "Doubling the diameter multiplies the cross-sectional area by 4, so the resistance is divided by 4.",
    hints: ["How does the area of a circle depend on its diameter?"] });

  q.num({ d: 4, skill: "APPLICATION", applies: Z,
    stem: t`Constantan has a resistivity of $4.9 \times 10^{-7}\ \Omega\,\text{m}$. Calculate the resistance of a $3.0\ \text{m}$ length of constantan wire with a cross-sectional area of $0.20\ \text{mm}^2$.`,
    value: 7.35, answer: "7.35", tol: 0.06, unit: "Ω", wrong: [7.35e-6, 0.0735],
    explanation: t`$A = 0.20 \times 10^{-6} = 2.0 \times 10^{-7}\ \text{m}^2$. $R = \dfrac{\rho L}{A} = \dfrac{4.9 \times 10^{-7} \times 3.0}{2.0 \times 10^{-7}} = 7.35\ \Omega \approx 7.4\ \Omega$.`,
    hints: [t`Convert the area: $1\ \text{mm}^2 = 1 \times 10^{-6}\ \text{m}^2$.`, t`Use $R = \dfrac{\rho L}{A}$.`] });

  q.tf({ d: 2, skill: "UNDERSTANDING",
    stem: "A thermistor obeys Ohm's law as its temperature changes.",
    answer: false, explanation: "A thermistor's resistance changes with temperature, so its current is not proportional to the p.d." });

  q.struct({ d: 3, skill: "APPLICATION", examStyle: true,
    stem: "A learner measures the resistance of a length of resistance wire. The readings are: p.d. 1.0 V, 2.0 V, 3.0 V and 4.0 V; current 0.21 A, 0.40 A, 0.61 A and 0.80 A.",
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "State how the ammeter and the voltmeter were connected.",
        points: ["The ammeter in series with the wire", "The voltmeter in parallel across the wire"] }),
      P.num({ label: "(b)", marks: 2, stem: "Use the reading at 4.0 V to calculate the resistance of the wire.", value: 5.0, answer: "5.0", unit: "Ω", wrong: [3.2, 0.2],
        explanation: t`$R = \dfrac{V}{I} = \dfrac{4.0}{0.80} = 5.0\ \Omega$.` }),
      P.mcq({ label: "(c)", stem: "How do the readings show that the wire obeys Ohm's law?", options: [["Doubling the p.d. (very nearly) doubles the current.", "Correct."], ["The current decreases as the p.d. increases.", "It increases."], ["The current is the same for every value of p.d.", "It changes."], ["The p.d. is always larger than the current.", "That proves nothing."]], answer: "A",
        explanation: "V/I is about 5 Ω for every reading, so I ∝ V." }),
      P.mcq({ label: "(d)", stem: "Why should the current be switched off between readings?", options: [["So the wire does not heat up and change its resistance", "Correct."], ["To reset the ammeter to zero between readings", "Not needed."], ["Because the voltmeter needs time to cool down", "The voltmeter does not heat up noticeably."], ["To avoid parallax errors when reading the scales", "Not related."]], answer: "A",
        explanation: "Heating raises the wire's resistance; switching off keeps its temperature steady." }),
    ],
    explanation: "Ammeter in series, voltmeter in parallel; R = V/I = 5.0 Ω; a constant V/I shows Ohm's law is obeyed.",
    hints: [t`Use $R = \dfrac{V}{I}$.`] });

  q.card("FORMULA", "Resistance?", t`$R = \dfrac{V}{I}$ (ohms, Ω)`);
  q.card("DEFINITION", "**Ohm's law**?", "Current through a metallic conductor is proportional to the p.d. across it, at constant temperature.");
  q.card("CONCEPT", "Shapes of I–V graphs?", "Resistor: straight line through origin. Filament lamp: curve flattening (resistance rises). Diode: current in one direction only.");
  q.card("CONCEPT", "Why is a filament lamp non-ohmic?", "As the current increases it gets hotter and its resistance increases.");
  q.card("FACT", "Effect of length and thickness on a wire's resistance?", "Longer wire: more resistance (∝ L). Thicker wire: less resistance (∝ 1/A).");
  q.card("FORMULA", "Resistance and resistivity?", t`$R = \dfrac{\rho L}{A}$`, undefined, { applies: Z });
  q.card("FACT", "How do you measure resistance?", "Ammeter in series, voltmeter in parallel, vary the current, R = V/I (or the gradient of V against I).");
});

// =====================================================================================================================
concept("phys.electricity.energy-power", {
  file: "electricity/energy-power",
  keyPrefix: "electricity.power",
  objectives: { cambridge: ["4.2.5.1", "4.2.5.2", "4.2.5.3", "4.2.5.4"], zimsec: ["11.5.1", "11.5.2"] },
}, (q) => {
  q.mcq({ d: 1, skill: "RECALL",
    stem: "What is the unit of power?",
    options: [["Watt", "Correct."], ["Joule", "That is the unit of energy."], ["Kilowatt-hour", "That is a unit of energy."], ["Volt", "That is the unit of p.d."]],
    answer: "A", explanation: "Power is measured in watts; 1 W = 1 J/s." });

  q.num({ d: 2, skill: "APPLICATION", daily: true,
    stem: "A 12 V car headlamp takes a current of 5.0 A. What is its power?",
    value: 60, unit: "W", wrong: [2.4, 0.42],
    explanation: t`$P = IV = 5.0 \times 12 = 60\ \text{W}$.` });

  q.num({ d: 2, skill: "APPLICATION",
    stem: "A television connected to a 230 V supply takes a current of 0.50 A. Calculate its power.",
    value: 115, unit: "W", wrong: [460, 0.0022],
    explanation: t`$P = IV = 0.50 \times 230 = 115\ \text{W}$.` });

  q.num({ d: 3, skill: "ANALYSIS",
    stem: "A 2.4 kW heater is designed for a 240 V supply. Calculate the current it takes.",
    value: 10, unit: "A", wrong: [0.1, 576],
    explanation: t`$I = \dfrac{P}{V} = \dfrac{2400}{240} = 10\ \text{A}$.`,
    hints: ["Convert kW to W first.", t`Rearrange $P = IV$.`] });

  q.calc({ d: 3, skill: "APPLICATION",
    stem: "A 60 W lamp is switched on for 2.0 hours. Calculate the energy it transfers, in joules.",
    value: 432000, unit: "J", wrong: [120, 7200],
    explanation: t`$t = 2.0 \times 3600 = 7200\ \text{s}$, so $E = Pt = 60 \times 7200 = 432\,000\ \text{J}$.`,
    hints: ["Convert the time to seconds.", "E = Pt"] });

  q.num({ d: 2, skill: "APPLICATION",
    stem: "A 3.0 kW geyser is switched on for 1.5 hours. How much energy does it use, in kilowatt-hours?",
    value: 4.5, answer: "4.5", unit: "kW h", wrong: [4500, 2],
    explanation: t`Energy $= 3.0\ \text{kW} \times 1.5\ \text{h} = 4.5\ \text{kW h}$.` });

  q.num({ d: 3, skill: "APPLICATION",
    stem: t`A 1.2 kW heater is used for 5 hours a day for 30 days. Electricity costs \$0.09 per kW h. Calculate the cost, in dollars.`,
    value: 16.2, answer: "16.20", tol: 0.01, prefix: "$", wrong: [16200, 0.54],
    explanation: t`Energy $= 1.2 \times 5 \times 30 = 180\ \text{kW h}$. Cost $= 180 \times 0.09$ = \$16.20.`,
    hints: ["Energy (kW h) = power (kW) × time (h).", "Then multiply by the price per kW h."] });

  q.num({ d: 3, skill: "APPLICATION",
    stem: t`An electricity meter reads 12 845 kW h at the start of a month and 13 107 kW h at the end. Electricity costs \$0.11 per kW h. What is the cost of the electricity used, in dollars?`,
    value: 28.82, answer: "28.82", tol: 0.01, prefix: "$", wrong: [2882, 1441.8],
    explanation: t`Energy used $= 13\,107 - 12\,845 = 262\ \text{kW h}$. Cost $= 262 \times 0.11$ = \$28.82.`,
    hints: ["Subtract the readings to find the energy used."] });

  q.mcq({ d: 1, skill: "RECALL",
    stem: "Which appliance transfers electrical energy mainly into kinetic energy?",
    options: [["An electric fan", "Correct: its motor turns the blades."], ["A kettle", "Mainly thermal energy."], ["A lamp", "Mainly light and thermal energy."], ["A radio", "Mainly sound."]],
    answer: "A", explanation: "A fan's motor transfers electrical energy to the kinetic energy of the blades and air." });

  q.match({ d: 2, skill: "UNDERSTANDING",
    stem: "Match each household appliance with its main useful energy output.",
    pairs: [["Electric iron", "Thermal energy"], ["Borehole pump", "Kinetic energy"], ["LED lamp", "Light"], ["Loudspeaker", "Sound"]],
    explanation: "Iron: heating. Pump: motion. LED: light. Loudspeaker: sound." });

  q.tf({ d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The kilowatt-hour is a unit of power.",
    answer: false, explanation: "The kilowatt-hour is a unit of energy: the energy used by a 1 kW appliance in one hour." });

  q.num({ d: 2, skill: "APPLICATION",
    stem: "Convert 2.5 kW h into joules.",
    value: 9.0e6, answer: "9.0e6", tol: REL2, unit: "J", wrong: [9000, 2500],
    explanation: t`$1\ \text{kW h} = 3.6 \times 10^{6}\ \text{J}$, so $2.5 \times 3.6 \times 10^{6} = 9.0 \times 10^{6}\ \text{J}$.` });

  q.mcq({ d: 2, skill: "UNDERSTANDING",
    stem: "A cell lights a lamp. Where does the energy transferred by the cell end up?",
    options: [["Mostly in the surroundings, as light and thermal energy", "Correct."], ["Stored in the connecting wires of the circuit", "Wires do not store energy."], ["Back in the cell's chemical store, ready to reuse", "The cell's chemical store is used up."], ["It is destroyed in the lamp's hot filament", "Energy cannot be destroyed."]],
    answer: "A", explanation: "Circuits transfer energy from the source to the components and then to the surroundings." });

  q.struct({ d: 3, skill: "APPLICATION", examStyle: true,
    stem: "An electric stove has four plates rated 1.5 kW each and an oven rated 2.0 kW. It is connected to a 230 V supply.",
    parts: [
      P.num({ label: "(a)", stem: "Calculate the total power when all four plates and the oven are on.", value: 8.0, answer: "8.0", unit: "kW", wrong: [3.5],
        explanation: t`$4 \times 1.5 + 2.0 = 8.0\ \text{kW}$.` }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the current taken from the supply when everything is on.", value: 8000 / 230, unit: "A", wrong: [0.035, 1840000],
        explanation: t`$I = \dfrac{P}{V} = \dfrac{8000}{230} = 35\ \text{A}$.` }),
      P.mcq({ label: "(c)", stem: "Why is a stove given its own circuit with thick cables?", options: [["It draws a large current that would overheat thin cables.", "Correct."], ["It needs a.c., while other circuits carry d.c.", "All household circuits are a.c."], ["Thick cables carry the energy faster, so it cooks faster.", "The plates' power is fixed; thick cables only stop overheating."], ["Because its metal case is earthed through the cable.", "Not the reason."]], answer: "A",
        explanation: "A large current heats a cable; thick cables have low resistance, so they stay cool." }),
    ],
    explanation: "Add the powers; I = P/V; large currents need thick cables.",
    hints: ["Convert kW to W before using I = P/V."] });

  q.card("FORMULA", "Electrical power?", t`$P = IV$ (watts)`);
  q.card("FORMULA", "Electrical energy?", t`$E = IVt = Pt$ (joules)`);
  q.card("DEFINITION", "What is a **kilowatt-hour**?", t`The energy used by a 1 kW appliance in 1 hour: $3.6 \times 10^{6}\ \text{J}$.`);
  q.card("CONCEPT", "How do you calculate the cost of electricity?", "Energy (kW h) = power (kW) × time (h); cost = energy × price per kW h.");
  q.card("CONCEPT", "Watt vs kilowatt-hour?", "Watt: unit of power (rate). Kilowatt-hour: unit of energy (what you pay for).");
  q.card("FACT", "Which appliances use the most energy at home?", "Heating appliances (geysers, stoves, kettles, irons), because they have high power ratings.", undefined, { applies: Z });
});

// =====================================================================================================================
concept("phys.electricity.circuit-diagrams", {
  file: "electricity/circuit-diagrams",
  keyPrefix: "electricity.diagrams",
  objectives: { cambridge: ["4.3.1.1", "4.3.1.2"], zimsec: ["11.4.1", "11.4.2"] },
}, (q) => {
  q.mcq({ d: 1, skill: "RECALL",
    stem: "Which component is shown in circuit diagrams by a circle with a cross inside?",
    options: [["A lamp", "Correct."], ["An ammeter", "A circle with A inside."], ["A motor", "A circle with M inside."], ["A voltmeter", "A circle with V inside."]],
    answer: "A", explanation: "A lamp is drawn as a circle containing a cross." });

  q.mcq({ d: 1, skill: "RECALL",
    stem: "In the circuit symbol for a cell, what does the longer, thinner line represent?",
    options: [["The positive terminal", "Correct."], ["The negative terminal", "That is the short, thick line."], ["A switch", "No."], ["The direction of electron flow", "No."]],
    answer: "A", explanation: "The long thin line is the positive terminal; the short thick line is the negative terminal." });

  q.mcq({ d: 2, skill: "RECALL",
    stem: "Which component's resistance decreases when the light falling on it gets brighter?",
    options: [["A light-dependent resistor", "Correct."], ["A thermistor (NTC)", "It responds to temperature."], ["A fuse in the circuit", "A fuse's resistance does not depend on light."], ["A silicon diode", "A diode's resistance depends on the direction of the current, not on light."]],
    answer: "A", explanation: "An LDR's resistance falls as the light intensity rises." });

  q.match({ d: 2, skill: "RECALL",
    stem: "Match each symbol description with the component.",
    pairs: [["A circle with V inside", "Voltmeter"], ["A rectangle with a diagonal arrow through it", "Variable resistor"], ["A small rectangle with a line along its length", "Fuse"], ["A circle with M inside", "Motor"]],
    explanation: "V in a circle: voltmeter. Arrow through a resistor: variable resistor. Line through a rectangle: fuse. M in a circle: motor." });

  q.mcq({ d: 1, skill: "RECALL",
    stem: "Which component protects a circuit by melting when the current becomes too large?",
    options: [["A fuse", "Correct."], ["A fixed resistor", "No."], ["A thermistor", "No."], ["A relay", "A relay is a magnetically operated switch."]],
    answer: "A", explanation: "A fuse contains a thin wire that melts if the current exceeds its rating." });

  q.mcq({ d: 2, skill: "APPLICATION", daily: true,
    stem: "A learner wants to measure the current through a lamp and the p.d. across it. How should the meters be connected?",
    options: [["Ammeter in series; voltmeter in parallel across the lamp", "Correct."], ["Both meters in series with the lamp and the cell", "The voltmeter must be in parallel."], ["Both meters in parallel across the lamp", "The ammeter must be in series."], ["Ammeter in parallel across the lamp; voltmeter in series", "This is the wrong way round."]],
    answer: "A", explanation: "Ammeters go in series; voltmeters go in parallel." });

  q.tf({ d: 2, skill: "RECALL",
    stem: "In a circuit diagram, a solid dot where two wires meet shows that they are joined.",
    answer: true, explanation: "A junction is shown by a solid dot." });

  q.mcq({ d: 3, skill: "ANALYSIS",
    stem: "A cell, a switch, a lamp and a buzzer are all connected in one loop. The lamp's filament breaks. What happens to the buzzer?",
    options: [["It stops, because the only current path is broken.", "Correct."], ["It gets louder, because it now takes all the energy.", "No current can flow in a broken single loop."], ["It carries on as before, using the cell's energy.", "In a single loop the circuit is now incomplete."], ["It buzzes more quietly, sharing less energy.", "With the loop broken there is no current at all."]],
    answer: "A", explanation: "All the components are in series, so a break anywhere stops the current everywhere.",
    hints: ["Is there any other path for the current?"] });

  q.mcq({ d: 2, skill: "RECALL", applies: C,
    stem: "What does a diode do in a circuit?",
    options: [["It lets current flow in one direction only.", "Correct."], ["It stores charge.", "No."], ["It increases the p.d.", "No."], ["It keeps the current at a fixed value.", "No."]],
    answer: "A", explanation: "A diode conducts when forward biased and has a very high resistance in reverse." });

  q.mcq({ d: 3, skill: "ANALYSIS", applies: C,
    stem: "An LED and a suitable resistor are connected in series to a battery, but the LED does not light. The LED and battery are known to work. What is the most likely reason?",
    options: [["The LED is the wrong way round (reverse biased).", "Correct."], ["LEDs only light up when they are given a.c.", "LEDs work on d.c."], ["The resistor is in series with the LED.", "A series resistor is needed to protect the LED."], ["LEDs need a strong magnetic field to light.", "An LED needs current in its forward direction, not a magnetic field."]],
    answer: "A", explanation: "An LED conducts and lights only when forward biased; reversed, almost no current flows.",
    hints: ["A diode conducts in one direction only."] });

  q.mcq({ d: 2, skill: "UNDERSTANDING", applies: C,
    stem: "Why is a resistor connected in series with an LED?",
    options: [["To limit the current so the LED is not damaged", "Correct."], ["To increase the current through the LED", "It reduces it."], ["To make the LED reverse biased", "The resistor does not change the LED's direction."], ["To make the LED flash on and off", "A plain resistor gives a steady current."]],
    answer: "A", explanation: "Without a series resistor the forward current could be large enough to destroy the LED." });

  q.short({ d: 1, skill: "RECALL",
    stem: "Name the component whose resistance falls as its temperature rises.",
    accepted: ["thermistor", "a thermistor", "NTC thermistor", "an NTC thermistor"], wrong: ["LDR"],
    explanation: "An NTC thermistor's resistance decreases as its temperature increases." });

  q.fib({ d: 2, skill: "RECALL",
    stem: "Complete the sentence.",
    template: "Ammeters are connected in {{blank:a}}; voltmeters are connected in {{blank:b}}.",
    blanks: [
      { id: "a", input: "select", choices: ["series", "parallel"], accepted: ["series"], wrong: "parallel" },
      { id: "b", input: "select", choices: ["series", "parallel"], accepted: ["parallel"], wrong: "series" },
    ],
    explanation: "Ammeters in series (the current passes through them); voltmeters in parallel (across the component)." });

  q.struct({ d: 3, skill: "APPLICATION", examStyle: true,
    stem: "A learner builds a circuit so that a small heater, powered by a 12 V battery, can be switched on and off and its current measured.",
    parts: [
      P.manual({ label: "(a)", marks: 3, stem: "Describe how the components should be connected.",
        points: ["The battery, switch, heater and ammeter are connected in one series loop", "The ammeter is in series so that the whole heater current passes through it", "The switch is in the same loop, so opening it breaks the circuit"] }),
      P.mcq({ label: "(b)", stem: "A voltmeter is added to measure the p.d. across the heater. Where is it connected?", options: [["Across the heater's two terminals", "Correct."], ["In series between the battery and the switch", "A voltmeter is not connected in series."], ["Across the ammeter", "That would measure the tiny p.d. across the ammeter."], ["Across the switch", "That reads zero when the switch is closed."]], answer: "A",
        explanation: "A voltmeter is connected in parallel with the component whose p.d. it measures." }),
      P.mcq({ label: "(c)", stem: "Which description matches the circuit symbol for a heater?", options: [["A rectangle split into sections by lines", "Correct."], ["A circle with a cross drawn inside", "That is a lamp."], ["A circle with the letter M inside", "That is a motor."], ["A triangle pointing at a short bar", "That is a diode."]], answer: "A",
        explanation: "The heater symbol is a rectangle divided into sections." }),
    ],
    explanation: "Series loop with the ammeter; voltmeter across the heater; heater symbol is a divided rectangle.",
    hints: ["Which meter goes in series, and which in parallel?"] });

  q.card("FACT", "Cell symbol: which line is positive?", "The long thin line is positive; the short thick line is negative.");
  q.card("FACT", "Symbol for a lamp?", "A circle with a cross inside.");
  q.card("FACT", "Thermistor vs LDR?", "Thermistor: resistance falls as temperature rises. LDR: resistance falls as light increases.");
  q.card("FACT", "What does a fuse do?", "Its thin wire melts and breaks the circuit if the current is too large.");
  q.card("CONCEPT", "Diode and LED?", "Conduct in one direction only (forward bias); an LED needs a series resistor to limit the current.", undefined, { applies: C });
  q.card("CONCEPT", "When does current flow?", "Only in a complete circuit: an unbroken loop from one terminal of the source back to the other.");
});

// =====================================================================================================================
concept("phys.electricity.series-parallel", {
  file: "electricity/series-parallel",
  keyPrefix: "electricity.circuits",
  objectives: { cambridge: ["4.3.2.1", "4.3.2.2", "4.3.2.3", "4.3.2.4", "4.3.2.5", "4.3.2.6", "4.3.2.7", "4.3.2.8", "4.3.2.9", "4.3.2.10"], zimsec: ["11.3.3", "11.4.3", "11.4.4"] },
}, (q) => {
  q.mcq({ d: 1, skill: "RECALL",
    stem: "How does the current compare at different points in a series circuit?",
    options: [["It is the same everywhere.", "Correct."], ["It is largest next to the positive terminal.", "No."], ["It decreases after each component.", "Current is not used up."], ["It is zero after the last lamp.", "No."]],
    answer: "A", explanation: "In a series circuit there is only one path, so the current is the same at every point." });

  q.num({ d: 2, skill: "APPLICATION", daily: true,
    stem: "Resistors of 5.0 Ω, 10 Ω and 15 Ω are connected in series. What is their combined resistance?",
    value: 30, unit: "Ω", wrong: [2.7, 10],
    explanation: t`In series the resistances add: $5.0 + 10 + 15 = 30\ \Omega$.` });

  q.num({ d: 2, skill: "APPLICATION",
    stem: "Four 1.2 V rechargeable cells are connected in series, all the same way round. What is their combined e.m.f.?",
    value: 4.8, answer: "4.8", unit: "V", wrong: [1.2, 0.3],
    explanation: t`$4 \times 1.2 = 4.8\ \text{V}$.` });

  q.calc({ d: 3, skill: "APPLICATION",
    stem: "A 10 Ω resistor and a 15 Ω resistor are connected in series to a 5.0 V supply. Calculate the current.",
    value: 0.2, answer: "0.20", unit: "A", wrong: [0.83, 125],
    explanation: t`$R = 10 + 15 = 25\ \Omega$, so $I = \dfrac{V}{R} = \dfrac{5.0}{25} = 0.20\ \text{A}$.`,
    hints: ["First find the total resistance."] });

  q.num({ d: 3, skill: "APPLICATION",
    stem: "A 12 Ω resistor and a 4.0 Ω resistor are connected in parallel. Calculate their combined resistance.",
    value: 3.0, answer: "3.0", unit: "Ω", wrong: [16, 8],
    explanation: t`$\dfrac{1}{R} = \dfrac{1}{12} + \dfrac{1}{4.0} = \dfrac{1}{12} + \dfrac{3}{12} = \dfrac{4}{12}$, so $R = 3.0\ \Omega$.`,
    hints: [t`Use $\dfrac{1}{R} = \dfrac{1}{R_1} + \dfrac{1}{R_2}$, then invert.`] });

  q.num({ d: 4, skill: "ANALYSIS",
    stem: "A 20 Ω resistor and a 30 Ω resistor are connected in parallel across a 6.0 V supply. Calculate the current from the supply.",
    value: 0.5, answer: "0.50", unit: "A", wrong: [0.12, 0.2],
    explanation: t`Each branch has 6.0 V across it: $I_1 = \dfrac{6.0}{20} = 0.30\ \text{A}$ and $I_2 = \dfrac{6.0}{30} = 0.20\ \text{A}$. Supply current $= 0.30 + 0.20 = 0.50\ \text{A}$.`,
    hints: ["Each branch has the full 6.0 V across it.", "Add the branch currents."] });

  q.mcq({ d: 2, skill: "UNDERSTANDING",
    stem: "Two resistors are connected in parallel. How does their combined resistance compare with the resistance of each one?",
    options: [["It is less than either resistor.", "Correct."], ["It is more than either resistor.", "That is true in series."], ["It is between the two values.", "It is less than the smaller one."], ["It equals their sum.", "That is series."]],
    answer: "A", explanation: "A parallel branch gives the current an extra path, so the combined resistance is less than the smallest resistor." });

  q.num({ d: 2, skill: "APPLICATION",
    stem: "A current of 2.4 A flows into a junction, where the circuit splits into two branches. One branch carries 0.9 A. What is the current in the other branch?",
    value: 1.5, answer: "1.5", unit: "A", wrong: [3.3, 0.9],
    explanation: t`Current in = current out: $2.4 - 0.9 = 1.5\ \text{A}$.` });

  q.mcq({ d: 3, skill: "UNDERSTANDING", applies: C,
    stem: "Why is the total current flowing into a junction equal to the total current flowing out?",
    options: [["Charge is conserved: it cannot pile up at the junction.", "Correct."], ["Energy is conserved at the junction, so current is too.", "The rule is about charge."], ["The branches always have equal resistance to the current.", "Not needed."], ["The p.d. is the same in each branch of the junction.", "That is a different rule."]],
    answer: "A", explanation: "The junction rule follows from the conservation of charge.",
    hints: ["What is current a flow of?"] });

  q.mcq({ d: 3, skill: "UNDERSTANDING", multiple: true,
    stem: "Select **all** the reasons why the lamps in a house are connected in parallel.",
    options: [["Each lamp gets the full mains p.d.", "Correct."], ["Each lamp can be switched on and off by itself.", "Correct."], ["If one lamp fails, the others stay on.", "Correct."], ["The total resistance is larger.", "In parallel it is smaller."], ["Less current is taken from the mains in total.", "Parallel branches add current."], ["Each lamp needs no switch.", "Each lamp has its own switch."]],
    answer: ["A", "B", "C"], explanation: "Parallel wiring gives every lamp the full p.d., independent switching and independence from failures.",
    hints: ["Think about the p.d., switching and what happens when a lamp blows."] });

  q.num({ d: 2, skill: "APPLICATION",
    stem: "Three identical lamps are connected in series to a 9.0 V battery. What is the p.d. across each lamp?",
    value: 3.0, answer: "3.0", unit: "V", wrong: [9, 27],
    explanation: "The 9.0 V is shared equally between three identical lamps: 3.0 V each." });

  q.mcq({ d: 3, skill: "ANALYSIS",
    stem: "Two identical lamps are connected in parallel to a battery. A third identical lamp is added in parallel. What happens to the current from the battery?",
    options: [["It increases.", "Correct: an extra branch adds its own current."], ["It decreases.", "Adding a parallel branch lowers the total resistance."], ["It stays the same.", "The new branch draws extra current."], ["It becomes zero.", "No."]],
    answer: "A", explanation: "Each branch has the full battery p.d.; adding a branch lowers the total resistance and adds another branch current.",
    hints: ["What happens to the combined resistance when a parallel branch is added?"] });

  q.tf({ d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In a parallel circuit, the current from the source is larger than the current in any one branch.",
    answer: true, explanation: "The source current is the sum of the branch currents." });

  q.fib({ d: 2, skill: "RECALL",
    stem: "Complete the sentence.",
    template: "In a series circuit the {{blank:a}} is the same everywhere; in a parallel circuit the {{blank:b}} across each branch is the same.",
    blanks: [
      { id: "a", input: "select", choices: ["current", "p.d."], accepted: ["current"], wrong: "p.d." },
      { id: "b", input: "select", choices: ["current", "p.d."], accepted: ["p.d."], wrong: "current" },
    ],
    explanation: "Series: same current, p.d.s add. Parallel: same p.d., currents add." });

  q.struct({ d: 4, skill: "ANALYSIS", examStyle: true,
    stem: "A 7.0 Ω resistor is connected in series with a parallel pair of resistors (10 Ω and 15 Ω), across a 3.9 V supply.",
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the combined resistance of the parallel pair.", value: 6.0, answer: "6.0", unit: "Ω", wrong: [25],
        explanation: t`$\dfrac{1}{R} = \dfrac{1}{10} + \dfrac{1}{15} = \dfrac{5}{30}$, so $R = 6.0\ \Omega$.` }),
      P.num({ label: "(b)", stem: "Calculate the total resistance of the circuit.", value: 13, unit: "Ω", wrong: [32],
        explanation: t`$7.0 + 6.0 = 13\ \Omega$.` }),
      P.num({ label: "(c)", stem: "Calculate the current from the supply.", value: 0.3, answer: "0.30", unit: "A", wrong: [3.33],
        explanation: t`$I = \dfrac{3.9}{13} = 0.30\ \text{A}$.` }),
      P.num({ label: "(d)", marks: 2, stem: "Calculate the current in the 10 Ω resistor.", value: 0.18, answer: "0.18", unit: "A", wrong: [0.3, 0.39],
        explanation: t`P.d. across the pair $= 0.30 \times 6.0 = 1.8\ \text{V}$, so $I = \dfrac{1.8}{10} = 0.18\ \text{A}$.` }),
    ],
    explanation: "Combine the parallel pair first, add the series resistor, find the supply current, then the p.d. across the pair and the branch current.",
    hints: ["Work from the parallel pair outwards.", "The p.d. across the pair is the supply current times the pair's resistance."] });

  q.card("FACT", "Rules for a series circuit?", "Same current everywhere; p.d.s add up to the supply; resistances add.");
  q.card("FACT", "Rules for a parallel circuit?", "Same p.d. across each branch; branch currents add up to the supply current.");
  q.card("FORMULA", "Resistors in series?", t`$R = R_1 + R_2 + \dots$`);
  q.card("FORMULA", "Two resistors in parallel?", t`$\dfrac{1}{R} = \dfrac{1}{R_1} + \dfrac{1}{R_2}$ (less than either)`);
  q.card("CONCEPT", "Why does current in = current out at a junction?", "Charge is conserved.", undefined, { applies: C });
  q.card("CONCEPT", "Why are house lamps in parallel?", "Full mains p.d. for each; independent switching; one failure does not affect the others.");
  q.card("CONCEPT", "Adding another branch in parallel?", "Total resistance falls, so the supply current rises.");
});

// =====================================================================================================================
concept("phys.electricity.potential-divider", {
  file: "electricity/potential-divider",
  keyPrefix: "electricity.divider",
  objectives: { cambridge: ["4.3.3.1", "4.3.3.2", "4.3.3.3"], zimsec: ["14.4.3", "14.4.4"] },
}, (q) => {
  q.mcq({ d: 1, skill: "RECALL",
    stem: "How does the resistance of an NTC thermistor change as it gets hotter?",
    options: [["It decreases.", "Correct."], ["It increases.", "That is the opposite."], ["It stays the same.", "It changes with temperature."], ["It drops to zero.", "It decreases but not to zero."]],
    answer: "A", explanation: "An NTC thermistor's resistance falls as its temperature rises." });

  q.mcq({ d: 1, skill: "RECALL",
    stem: "How does the resistance of a light-dependent resistor change as the light on it gets brighter?",
    options: [["It decreases.", "Correct."], ["It increases.", "It is highest in the dark."], ["It stays the same.", "It depends on light."], ["It becomes infinite.", "No."]],
    answer: "A", explanation: "An LDR has a high resistance in the dark and a low resistance in bright light." });

  q.num({ d: 2, skill: "APPLICATION", daily: true,
    stem: "Two equal resistors are connected in series across a 6.0 V supply. What is the p.d. across each resistor?",
    value: 3.0, answer: "3.0", unit: "V", wrong: [6, 12],
    explanation: "Equal resistors share the p.d. equally: 6.0 ÷ 2 = 3.0 V." });

  q.num({ d: 3, skill: "APPLICATION", applies: C,
    stem: "Resistors of 3.0 kΩ and 9.0 kΩ are connected in series across a 12 V supply. Calculate the p.d. across the 9.0 kΩ resistor.",
    value: 9.0, answer: "9.0", unit: "V", wrong: [3, 4],
    explanation: t`The p.d.s are in the ratio $3.0 : 9.0 = 1 : 3$, so the 9.0 kΩ resistor has $\dfrac{3}{4} \times 12 = 9.0\ \text{V}$.`,
    hints: ["The p.d. is shared in the ratio of the resistances.", "The two p.d.s must add up to 12 V."] });

  q.num({ d: 3, skill: "ANALYSIS", applies: C,
    stem: "In a potential divider, a 10 kΩ resistor has 2.0 V across it and a second resistor has 3.0 V across it. Calculate the resistance of the second resistor in kΩ.",
    value: 15, unit: "kΩ", wrong: [6.7, 5],
    explanation: t`$\dfrac{R_1}{R_2} = \dfrac{V_1}{V_2}$, so $R_2 = 10 \times \dfrac{3.0}{2.0} = 15\ \text{k}\Omega$.`,
    hints: [t`Use $\dfrac{R_1}{R_2} = \dfrac{V_1}{V_2}$.`] });

  q.mcq({ d: 2, skill: "UNDERSTANDING",
    stem: "The same current flows through several resistors in series. Which resistor has the largest p.d. across it?",
    options: [["The one with the largest resistance", "Correct: V = IR."], ["The one with the smallest resistance", "No: smaller R gives smaller V."], ["They all have the same p.d.", "Only if their resistances are equal."], ["The one nearest the positive terminal", "Position does not matter."]],
    answer: "A", explanation: "For a fixed current, V = IR, so the larger the resistance, the larger the p.d." });

  q.mcq({ d: 3, skill: "ANALYSIS",
    stem: "A thermistor and a fixed resistor are connected in series across a supply. The output p.d. is taken across the fixed resistor. The temperature rises. What happens to the output p.d.?",
    options: [["It increases.", "Correct."], ["It decreases.", "The thermistor's share falls, so the fixed resistor's share rises."], ["It stays the same.", "The thermistor's resistance changes."], ["It becomes zero.", "No."]],
    answer: "A", explanation: "Hotter → thermistor resistance falls → it takes a smaller share of the p.d. → the fixed resistor's p.d. (the output) rises.",
    hints: ["What happens to the thermistor's resistance, and so to its share of the p.d.?"] });

  q.mcq({ d: 3, skill: "ANALYSIS",
    stem: "An LDR and a fixed resistor are connected in series across a supply. The output p.d. is taken across the LDR. It gets darker. What happens to the output p.d.?",
    options: [["It increases.", "Correct."], ["It decreases.", "In the dark the LDR's resistance rises."], ["It stays the same.", "The LDR's resistance changes."], ["It becomes zero.", "No."]],
    answer: "A", explanation: "Darker → LDR resistance rises → it takes a larger share of the supply p.d. → the output across it rises.",
    hints: ["Is the LDR's resistance high or low in the dark?"] });

  q.mcq({ d: 2, skill: "UNDERSTANDING",
    stem: "What is the advantage of using a potentiometer (variable potential divider) to control the p.d. across a lamp, instead of a variable resistor in series?",
    options: [["The p.d. can be varied from zero up to the full supply p.d.", "Correct."], ["It uses no energy at all, unlike a variable resistor.", "It does use some energy."], ["It gives a larger current than the supply alone can.", "It cannot give more current than the supply."], ["It has no resistance, so nothing is wasted.", "It is a resistance track."]],
    answer: "A", explanation: "A potentiometer's slider can select any output from zero up to the supply p.d.; a series variable resistor cannot reduce the p.d. to zero." });

  q.tf({ d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In a potential divider made of two equal resistors, the p.d. across one resistor is half the supply p.d.",
    answer: true, explanation: "Equal resistances share the p.d. equally." });

  q.match({ d: 2, skill: "RECALL",
    stem: "Match each input component with what changes its output.",
    pairs: [["Thermistor", "Temperature"], ["Light-dependent resistor", "Light intensity"], ["Potentiometer", "Position of the sliding contact"]],
    explanation: "Thermistor: temperature. LDR: light. Potentiometer: slider position." });

  q.fib({ d: 2, skill: "RECALL", applies: C,
    stem: "Complete the sentence.",
    template: "Two resistors in series share the supply p.d. in the ratio of their {{blank:a}}.",
    blanks: [{ id: "a", accepted: ["resistances", "resistance"], wrong: "currents" }],
    explanation: t`$\dfrac{V_1}{V_2} = \dfrac{R_1}{R_2}$.` });

  q.struct({ d: 3, skill: "APPLICATION", applies: C, examStyle: true,
    stem: "An automatic night light uses an LDR in series with a 4.7 kΩ resistor across a 12 V supply. The lamp circuit switches on when the p.d. across the LDR rises above 8.0 V.",
    parts: [
      P.mcq({ label: "(a)", stem: "In bright daylight, is the p.d. across the LDR high or low?", options: [["Low, because the LDR's resistance is low", "Correct."], ["High, because the LDR's resistance is low", "A low resistance takes a small share."], ["High, because the LDR's resistance is high", "In bright light its resistance is low."], ["Exactly half of 12 V", "Only if its resistance were 4.7 kΩ."]], answer: "A",
        explanation: "In bright light the LDR's resistance is low, so it takes only a small share of the 12 V." }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the resistance of the LDR when the p.d. across it is exactly 8.0 V.", value: 9.4, answer: "9.4", unit: "kΩ", wrong: [2.35, 6.27],
        explanation: t`The fixed resistor has $12 - 8.0 = 4.0\ \text{V}$. $R_{\text{LDR}} = 4.7 \times \dfrac{8.0}{4.0} = 9.4\ \text{k}\Omega$.` }),
      P.manual({ label: "(c)", marks: 2, stem: "Explain why the light switches on as it gets dark.",
        points: ["As the light fades, the LDR's resistance increases", "so the LDR takes a larger share of the supply p.d.; when this rises above 8.0 V the lamp circuit switches on"] }),
    ],
    explanation: "The LDR's share of the p.d. rises in the dark; R_LDR/R_fixed = V_LDR/V_fixed.",
    hints: ["Find the p.d. across the fixed resistor first."] });

  q.card("DEFINITION", "What is a **potential divider**?", "Resistors in series across a supply, giving an output p.d. that is a fraction of the supply.");
  q.card("FORMULA", "Potential divider ratio?", t`$\dfrac{R_1}{R_2} = \dfrac{V_1}{V_2}$`, undefined, { applies: C });
  q.card("FACT", "How does an NTC thermistor behave?", "Its resistance falls as its temperature rises.");
  q.card("FACT", "How does an LDR behave?", "Its resistance falls as the light gets brighter (high in the dark).");
  q.card("CONCEPT", "Variable potential divider (potentiometer)?", "Gives any output p.d. from zero up to the full supply p.d.");
  q.card("CONCEPT", "How to reason about a sensor circuit?", "Condition changes → sensor resistance changes → its share of the p.d. changes → output changes.");
});

// =====================================================================================================================
concept("phys.electricity.mains-safety", {
  file: "electricity/mains-safety",
  keyPrefix: "electricity.mains",
  objectives: { cambridge: ["4.4.1", "4.4.2", "4.4.3", "4.4.4", "4.4.5"], zimsec: ["11.5.3", "11.5.4", "11.5.5"] },
}, (q) => {
  q.mcq({ d: 1, skill: "RECALL",
    stem: "What colour is the insulation on the live wire of a modern mains cable?",
    options: [["Brown", "Correct."], ["Blue", "That is the neutral wire."], ["Green and yellow", "That is the earth wire."], ["Black", "Not in the modern colour code."]],
    answer: "A", explanation: "Live: brown. Neutral: blue. Earth: green and yellow." });

  q.mcq({ d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why is the switch for an appliance placed in the live wire?",
    options: [["So that, when off, the appliance is cut off from the high voltage", "Correct."], ["So the switch lasts longer and sparks less", "Not the reason."], ["So that less current flows through it when it is on", "The switch does not reduce the current."], ["Because the neutral wire carries no current at all", "The neutral carries the current back."]],
    answer: "A", explanation: "With the switch in the live wire, opening it cuts the appliance off from the high voltage, making it safe to touch." });

  q.mcq({ d: 1, skill: "RECALL",
    stem: "What does a fuse do when the current through it becomes too large?",
    options: [["It melts and breaks the circuit.", "Correct."], ["It increases its resistance to slow the current.", "No."], ["It stores the extra charge.", "No."], ["It sends the current to earth.", "That is the earth wire's job in a fault."]],
    answer: "A", explanation: "The thin fuse wire heats up and melts, breaking the live connection." });

  q.num({ d: 2, skill: "APPLICATION",
    stem: "Calculate the normal working current of a 3.0 kW heater designed for a 240 V supply.",
    value: 12.5, answer: "12.5", unit: "A", wrong: [0.08, 720],
    explanation: t`$I = \dfrac{P}{V} = \dfrac{3000}{240} = 12.5\ \text{A}$.` });

  q.mcq({ d: 3, skill: "APPLICATION",
    stem: "A microwave oven is rated 960 W, 240 V. Fuses rated 3 A, 5 A and 13 A are available. Which fuse should be fitted?",
    options: [["5 A", "Correct: the normal current is 4.0 A."], ["3 A", "It would melt in normal use."], ["13 A", "Too high: it might not melt before the cable overheats."], ["No fuse is needed.", "Every plug must be fused."]],
    answer: "A", explanation: "I = P/V = 960/240 = 4.0 A; the smallest rating above this is 5 A.",
    hints: ["First calculate the normal current.", "Choose the smallest rating above it."] });

  q.mcq({ d: 2, skill: "UNDERSTANDING",
    stem: "Why must the metal case of an electric kettle be earthed?",
    options: [["A live case sends a large current to earth, which blows the fuse.", "Correct."], ["To stop static charge building up on the metal case", "Not the main reason."], ["To make the element heat the water faster and more evenly", "Earthing does not change the heating power."], ["So that the kettle uses less electricity for each boil", "Earthing does not change the energy used."]],
    answer: "A", explanation: "The earth wire gives fault current a low-resistance path; the large current blows the fuse and disconnects the kettle." });

  q.tf({ d: 2, skill: "RECALL", daily: true,
    stem: "A double-insulated hair dryer does not need an earth wire.",
    answer: true, explanation: "Its outer casing is an insulator and cannot become live, so it needs no earth wire." });

  q.mcq({ d: 3, skill: "UNDERSTANDING", applies: C,
    stem: "A double-insulated appliance has no earth wire. What is the purpose of the fuse in its plug?",
    options: [["To protect the cable from overheating if too much current flows", "Correct."], ["To earth the plastic casing of the appliance", "There is no earth connection."], ["It has no purpose and can safely be removed.", "It is still needed."], ["To stop shocks from the casing if a wire comes loose", "The insulated casing does that."]],
    answer: "A", explanation: "Even without an earth wire, a fault could draw too much current; the fuse protects the cable from overheating.",
    hints: ["What can still overheat if the current is too large?"] });

  q.mcq({ d: 3, skill: "EVALUATION", multiple: true,
    stem: "Select **all** the situations that are dangerous.",
    options: [["Using a hair dryer with wet hands", "Correct: water conducts."], ["Plugging several heaters into one extension lead", "Correct: overloading."], ["Using a cable with cracked insulation", "Correct: exposed wires."], ["Using a kettle with an earthed metal case", "Safe: earthing protects."], ["Fitting a fuse rated just above the normal current", "Safe: the correct choice."], ["Switching off at the socket before cleaning an appliance", "Safe practice."]],
    answer: ["A", "B", "C"], explanation: "Damp conditions, overloading and damaged insulation are mains hazards.",
    hints: ["Look for water, too much current and exposed wires."] });

  q.mcq({ d: 2, skill: "UNDERSTANDING",
    stem: "What is an advantage of a trip switch (circuit breaker) over a fuse?",
    options: [["It can be reset after the fault is fixed, and acts faster.", "Correct."], ["It works without any electricity in the circuit.", "It works by sensing the current in the circuit."], ["It never switches off, so appliances keep working.", "It switches off when the current is too large."], ["It must be replaced after every fault, like a fuse.", "That is a fuse."]],
    answer: "A", explanation: "A trip switch opens quickly when the current is too large and can simply be reset." });

  q.match({ d: 2, skill: "RECALL", applies: Z,
    stem: "Match each wire in a three-pin plug with its colour and terminal.",
    pairs: [["Live", "Brown, to the right-hand terminal through the fuse"], ["Neutral", "Blue, to the left-hand terminal"], ["Earth", "Green-and-yellow, to the top terminal"]],
    explanation: "With the back off and the earth pin at the top: live (brown) right via the fuse, neutral (blue) left, earth (green-and-yellow) top." });

  q.mcq({ d: 2, skill: "UNDERSTANDING", applies: Z,
    stem: "What is the purpose of the cable grip in a three-pin plug?",
    options: [["To grip the sheath so a tug cannot pull wires off the pins", "Correct."], ["To make the earth wire connect firmly to the earth pin", "The earth wire is screwed to its own terminal."], ["To hold the fuse firmly in place between its clips", "The fuse sits in its own holder."], ["To insulate the brass pins from the user's fingers", "The plug's plastic body and pin sleeves do that."]],
    answer: "A", explanation: "The grip clamps the outer sheath, so any tug is taken by the sheath, not the wire connections." });

  q.mcq({ d: 2, skill: "UNDERSTANDING",
    stem: "Why is it dangerous to plug many appliances into one socket with an adaptor?",
    options: [["The total current is large and can overheat the wiring.", "Correct."], ["It lowers the mains voltage at the socket to zero.", "The voltage stays at the mains value."], ["It makes all the appliances run too fast.", "Appliances run as usual; the wiring overheats."], ["It stops the fuse in the plug from working.", "The danger is overheating."]],
    answer: "A", explanation: "Overloading draws more current than the socket and cable are designed for, so they overheat." });

  q.struct({ d: 3, skill: "APPLICATION", examStyle: true,
    stem: "An electric iron with a metal soleplate is rated 1.2 kW, 220 V. Fuses rated 3 A, 5 A and 13 A are available.",
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the normal working current of the iron.", value: 1200 / 220, unit: "A", wrong: [0.18, 264000],
        explanation: t`$I = \dfrac{P}{V} = \dfrac{1200}{220} = 5.5\ \text{A}$.` }),
      P.mcq({ label: "(b)", stem: "Which fuse should be fitted?", options: [["13 A", "Correct: 5.5 A is more than 5 A."], ["5 A", "It would melt in normal use, because 5.5 A is more than 5 A."], ["3 A", "Far too small."], ["No fuse", "A fuse is always needed."]], answer: "A",
        explanation: "The smallest rating above 5.5 A is 13 A." }),
      P.manual({ label: "(c)", marks: 2, stem: "Explain how the earth wire protects the user if the live wire touches the metal soleplate.",
        points: ["A large current flows from the live wire through the soleplate and the earth wire to earth", "The fuse melts and disconnects the iron, so the soleplate is no longer live"] }),
    ],
    explanation: "I = P/V = 5.5 A, so a 13 A fuse; in a fault, earthing causes a large current that blows the fuse.",
    hints: ["Choose the smallest fuse rating that is above the normal current."] });

  q.card("FACT", "Mains wire colours?", "Live: brown. Neutral: blue. Earth: green-and-yellow.");
  q.card("CONCEPT", "Why are switches and fuses in the live wire?", "So that when they open, the appliance is disconnected from the high voltage.");
  q.card("CONCEPT", "How do you choose a fuse?", "Work out the normal current (I = P/V) and choose the smallest rating above it.");
  q.card("DEFINITION", "What is a **trip switch**?", "A switch that opens automatically when the current is too large; it can be reset.");
  q.card("CONCEPT", "How does earthing protect you?", "A fault makes a large current flow to earth, the fuse melts or the breaker trips, and the case is no longer live.");
  q.card("DEFINITION", "What is **double insulation**?", "An insulating outer casing and doubly insulated live parts, so no earth wire is needed; the fuse still protects the cable.");
  q.card("FACT", "Hazards of mains electricity?", "Damaged insulation, overheating cables, damp conditions, overloaded sockets and leads.");
  q.card("FACT", "Wiring a three-pin plug?", "Brown to right (via fuse), blue to left, green-and-yellow to top; cable grip on the outer sheath.", undefined, { applies: Z });
});
