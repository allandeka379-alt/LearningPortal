import { concept, P, t } from "../lib.mjs";

const r = (x, n = 3) => Number(x.toPrecision(n));
const Z = ["zimsec"];
const C = ["cambridge"];

// =====================================================================================================================
concept("phys.energy.stores-transfers", {
  file: "energy/stores-transfers",
  keyPrefix: "energy.stores",
  objectives: { cambridge: ["1.7.1.1", "1.7.1.2", "1.7.1.3"], zimsec: ["6.2.2", "6.2.3"] },
}, (q) => {
  q.mcq({ d: 1, skill: "RECALL",
    stem: "In which energy store is energy held in a stretched catapult?",
    options: [["Kinetic", "The catapult is not moving."], ["Elastic (strain)", "Correct."], ["Chemical (in the rubber)", "No chemical change."], ["Nuclear", "No change to nuclei."]],
    answer: "B", explanation: "A stretched or squashed object stores energy in its elastic (strain) store." });

  q.mcq({ d: 1, skill: "RECALL",
    stem: "Which of these is a way of TRANSFERRING energy rather than a store?",
    options: [["Kinetic", "A store."], ["Gravitational potential", "A store."], ["Heating", "Correct: a transfer."], ["Chemical", "A store."]],
    answer: "C", explanation: "Energy is transferred by forces doing work, electric currents, heating and waves; kinetic, chemical and gravitational potential are stores." });

  q.tf({ d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "When a cell phone battery goes 'flat', the energy that was stored in it has been destroyed.",
    answer: false, explanation: "Energy is never destroyed. It has been transferred (mostly by heating and by light and sound) to the surroundings." });

  q.num({ d: 2, skill: "APPLICATION", daily: true,
    stem: t`An electric fan is supplied with $1200\ \text{J}$ of energy. It transfers $840\ \text{J}$ usefully to the kinetic store of the moving air. How much energy is wasted?`,
    value: 360, unit: "J", wrong: [2040, 840, 1.43],
    explanation: t`Energy in = energy out: wasted $= 1200 - 840 = 360\ \text{J}$, mostly heating the motor and the surroundings.` });

  q.match({ d: 2, skill: "UNDERSTANDING",
    stem: "Match each object with the energy store that is increasing.",
    pairs: [["A bus speeding up", "Kinetic"], ["Water being pumped up into a tank on a tower", "Gravitational potential"], ["A pot of water being heated on a stove", "Internal (thermal)"], ["A battery being charged", "Chemical"]],
    explanation: "Moving objects: kinetic. Raised objects: gravitational potential. Hotter objects: internal. Charged batteries: chemical." });

  q.mcq({ d: 2, skill: "UNDERSTANDING",
    stem: "A solar panel charges a battery that later powers an LED lamp. Which sequence of stores and transfers is correct?",
    options: [["Nuclear → light → electrical → chemical → electrical → light", "Correct."], ["Chemical → kinetic → nuclear → electrical → light", "The Sun's energy comes from its nuclear store, and nothing here is kinetic."], ["Light → electrical → kinetic store of the battery → light", "A battery stores energy in its chemical store."], ["Nuclear → light → electrical store → thermal → light", "Electricity is a transfer, not a store, and the battery stores chemical energy."]],
    answer: "A", explanation: "Nuclear fusion in the Sun releases energy carried by light; the panel transfers it electrically to the battery's chemical store; later the current carries it to the lamp, which emits light." });

  q.struct({ d: 3, skill: "APPLICATION", examStyle: true,
    stem: "A learner drops a ball from a high window onto a concrete path below.",
    parts: [
      P.mcq({ label: "(a)", stem: "As the ball falls, which energy store decreases?", options: [["Gravitational potential", "Correct: it gets lower."], ["Kinetic store", "Kinetic increases as it speeds up."], ["Chemical store", "No chemical change."], ["Elastic potential", "It is not deformed while falling."]], answer: "A", explanation: "The ball loses height, so its gravitational potential energy decreases." }),
      P.mcq({ label: "(b)", stem: "At the moment the ball is most squashed against the path, most of its energy is in which store?", options: [["Elastic (strain)", "Correct."], ["Kinetic", "It is momentarily at rest."], ["Gravitational potential", "It is at its lowest point."], ["Nuclear", "No nuclear change."]], answer: "A", explanation: "Squashed, momentarily stopped: the energy is in the elastic store." }),
      P.manual({ label: "(c)", marks: 2, stem: "The ball does not bounce back to the height it was dropped from. Explain this, using the idea of conservation of energy.",
        points: ["Some energy is transferred to the surroundings by heating (and sound) during the fall and the bounce", "so less energy is in the ball's kinetic and gravitational potential stores; energy is not destroyed, it is spread into the surroundings"] }),
    ],
    explanation: "Gravitational potential → kinetic → elastic → kinetic → gravitational potential, with some energy dissipated by heating and sound at each stage, so the bounce is lower.",
    hints: ["Energy is conserved, but not all of it stays in the ball."] });

  q.mcq({ d: 3, skill: "ANALYSIS", applies: C,
    stem: "A Sankey diagram for a filament lamp has an input arrow 100 units wide. The light arrow is 10 units wide. How wide must the heating arrow be?",
    options: [["90 units", "Correct: outputs must add up to the input."], ["110 units", "Outputs cannot exceed the input."], ["10 units", "That would leave 80 units unaccounted for."], ["100 units", "Then the total output would be 110."]],
    answer: "A", explanation: "Energy is conserved, so the output arrows add up to the input: 100 − 10 = 90 units.",
    hints: ["The widths of the output arrows add up to the width of the input arrow."] });

  q.short({ d: 2, skill: "RECALL",
    stem: "State the principle of conservation of energy.",
    keywords: { all: ["energy"], any: ["cannot be created", "can not be created", "neither created nor destroyed", "not created or destroyed", "cannot be destroyed"], minAny: 1 },
    accepted: ["Energy cannot be created or destroyed, only transferred from one store to another."],
    wrong: ["energy is used up"],
    explanation: "Energy cannot be created or destroyed; it is only transferred from one store to another, so the total stays the same." });

  q.mcq({ d: 3, skill: "UNDERSTANDING",
    stem: "A car brakes to a stop on a level road. Where does its kinetic energy go?",
    options: [["Mostly to the thermal store of the brakes and surroundings", "Correct."], ["It is destroyed by friction between the brake pads and discs", "Energy cannot be destroyed; friction transfers it to thermal stores."], ["Into the car's gravitational potential store as it stops", "The road is level."], ["Back into the chemical store of the fuel in the tank", "Ordinary cars cannot do this."]],
    answer: "A", explanation: "Friction in the brakes does work, transferring the kinetic energy to the internal store of the brakes and surroundings (some as sound).",
    hints: ["What happens to the brakes when a car stops?"] });

  q.fib({ d: 2, skill: "RECALL",
    stem: "Complete the sentence.",
    template: "When a battery drives a current through a motor, energy is transferred from the battery's {{blank:a}} store to the motor's {{blank:b}} store.",
    blanks: [{ id: "a", input: "select", choices: ["chemical", "kinetic", "nuclear", "elastic"], accepted: ["chemical"], wrong: "kinetic" }, { id: "b", input: "select", choices: ["chemical", "kinetic", "nuclear", "elastic"], accepted: ["kinetic"], wrong: "chemical" }],
    explanation: "Chemical store of the battery → transferred electrically → kinetic store of the motor (plus some heating)." });

  q.struct({ d: 4, skill: "ANALYSIS", applies: C, examStyle: true,
    stem: "At a hydroelectric power station, water stored behind a dam falls through pipes to the turbines, which drive generators.",
    parts: [
      P.manual({ label: "(a)", marks: 3, stem: "Describe the energy transfers from the water behind the dam to the electricity leaving the station.",
        points: ["Gravitational potential energy of the water behind the dam is transferred to kinetic energy as it falls", "The moving water does work on the turbine, giving it kinetic energy", "The generator transfers the turbine's kinetic energy electrically to the grid"] }),
      P.num({ label: "(b)", marks: 2, stem: "Each second, water loses 500 MJ of gravitational potential energy and the station sends out 400 MJ of electrical energy. How much energy is wasted each second?", value: 100, unit: "MJ", wrong: [900, 400], explanation: "500 − 400 = 100 MJ each second, mostly by heating and sound." }),
    ],
    explanation: "GPE → KE of water → KE of turbine → electrical; the 100 MJ difference is dissipated by heating and sound.",
    hints: ["Follow the energy step by step.", "Energy in = useful out + wasted."] });

  q.card("FACT", "Name the seven energy stores.", "Kinetic, gravitational potential, chemical, elastic (strain), nuclear, electrostatic, internal (thermal).");
  q.card("FACT", "Name four ways energy is transferred.", "Mechanically (forces doing work), electrically (currents), by heating, by waves (light, sound).");
  q.card("CONCEPT", "State the principle of conservation of energy.", "Energy cannot be created or destroyed, only transferred between stores.");
  q.card("CONCEPT", "Where does wasted energy usually end up?", "In the internal (thermal) store of the surroundings, spread out (dissipated).");
  q.card("CONCEPT", "What does a Sankey diagram show?", "Energy transfers, with arrow widths proportional to the amounts of energy.", undefined, { applies: C });
  q.card("CONCEPT", "In what store is energy in food and fuel?", "The chemical store.");
  q.card("CONCEPT", "Is electricity an energy store?", "No: an electric current is a way of transferring energy.");
  q.card("CONCEPT", "Energy in = ?", "Useful energy out + wasted energy out.");
});

// =====================================================================================================================
concept("phys.energy.ke-gpe", {
  file: "energy/kinetic-potential",
  keyPrefix: "energy.kegpe",
  objectives: { cambridge: ["1.7.1.4", "1.7.1.5"], zimsec: ["6.2.4"] },
}, (q) => {
  q.mcq({ d: 1, skill: "RECALL",
    stem: "Which equation gives the kinetic energy of an object?",
    options: [["Ek = ½mv²", "Correct."], ["Ek = mv", "That is momentum."], ["Ek = mgh", "That is gravitational potential energy."], ["Ek = ½mv", "The speed must be squared."]],
    answer: "A", explanation: "Kinetic energy = ½ × mass × speed²." });

  q.num({ d: 2, skill: "APPLICATION", daily: true,
    stem: t`A $60\ \text{kg}$ cyclist rides at $5.0\ \text{m/s}$. Calculate her kinetic energy.`,
    value: 750, unit: "J", wrong: [150, 1500, 300],
    explanation: t`$E_k = \tfrac{1}{2} \times 60 \times 5.0^2 = 30 \times 25 = 750\ \text{J}$.` });

  q.num({ d: 2, skill: "APPLICATION", daily: true,
    stem: t`A $2.0\ \text{kg}$ brick is lifted $3.0\ \text{m}$ onto scaffolding. Taking $g = 9.8\ \text{N/kg}$, calculate the increase in its gravitational potential energy.`,
    value: 58.8, answer: "58.8", unit: "J", tol: 0.5, wrong: [6, 6.53, 5.88],
    explanation: t`$\Delta E_p = mg\Delta h = 2.0 \times 9.8 \times 3.0 = 58.8\ \text{J}$.` });

  q.mcq({ d: 2, skill: "UNDERSTANDING",
    stem: "A car doubles its speed. What happens to its kinetic energy?",
    options: [["It doubles, like the speed.", "Ek depends on v², not v."], ["It becomes four times as large.", "Correct: (2v)² = 4v²."], ["It becomes half as large.", "Kinetic energy increases when speed increases."], ["It stays the same as before.", "Kinetic energy depends on speed."]],
    answer: "B", explanation: "Ek ∝ v², so doubling v multiplies Ek by 4." });

  q.num({ d: 3, skill: "APPLICATION",
    stem: t`A ball of mass $0.20\ \text{kg}$ has $40\ \text{J}$ of kinetic energy. What is its speed?`,
    value: 20, unit: "m/s", wrong: [400, 200, 14.1],
    explanation: t`$v = \sqrt{\dfrac{2E_k}{m}} = \sqrt{\dfrac{80}{0.20}} = \sqrt{400} = 20\ \text{m/s}$.`,
    hints: ["Rearrange Ek = ½mv² to v² = 2Ek/m.", "Remember the square root."] });

  q.num({ d: 3, skill: "APPLICATION",
    stem: t`A stone is dropped from rest and falls $20\ \text{m}$. Ignoring air resistance and taking $g = 9.8\ \text{N/kg}$, how fast is it moving just before it lands?`,
    value: r(Math.sqrt(2 * 9.8 * 20)), unit: "m/s", wrong: [392, 196, 14],
    explanation: t`Loss of $E_p$ = gain of $E_k$: $v = \sqrt{2g\Delta h} = \sqrt{2 \times 9.8 \times 20} = \sqrt{392} = 19.8\ \text{m/s}$.`,
    hints: ["Set mgh equal to ½mv²; the mass cancels."] });

  q.struct({ d: 4, skill: "APPLICATION", examStyle: true,
    stem: t`A child of mass $30\ \text{kg}$ slides from rest down a playground slide whose top is $2.5\ \text{m}$ above the bottom. Take $g = 9.8\ \text{N/kg}$.`,
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the gravitational potential energy the child loses.", value: 735, unit: "J", wrong: [75, 294], explanation: t`$mgh = 30 \times 9.8 \times 2.5 = 735\ \text{J}$.` }),
      P.num({ label: "(b)", marks: 2, stem: "If there were no friction, what would her speed be at the bottom?", value: 7, answer: "7.0", unit: "m/s", wrong: [49, 24.5], explanation: t`$\tfrac{1}{2}(30)v^2 = 735$: $v^2 = 49$, $v = 7.0\ \text{m/s}$.` }),
      P.manual({ label: "(c)", marks: 2, stem: "Her actual speed at the bottom is 5.0 m/s. Explain why it is less than your answer to (b).",
        points: ["Friction between the child and the slide (and air resistance) does work against her motion", "so some of the gravitational potential energy is transferred to the internal (thermal) store of the slide, the child and the air instead of to kinetic energy"] }),
    ],
    explanation: "735 J of GPE would give 7.0 m/s without friction; friction and air resistance turn part of it into heating, so she reaches only 5.0 m/s.",
    hints: ["Loss of GPE = gain of KE if nothing is wasted.", "What else happens when you slide down a slide?"] });

  q.tf({ d: 2, skill: "UNDERSTANDING",
    stem: "Ignoring air resistance, a heavy stone and a light stone dropped from the same height hit the ground at the same speed.",
    answer: true, explanation: "mgh = ½mv² gives v = √(2gh): the mass cancels, so the speed does not depend on mass." });

  q.mcq({ d: 3, skill: "UNDERSTANDING",
    stem: "At which point in its swing does a pendulum bob have the most kinetic energy?",
    options: [["At the lowest point", "Correct: it moves fastest there."], ["At the highest point of each swing", "It is momentarily at rest there."], ["Halfway between lowest and highest", "It is still speeding up there on the way down."], ["Its kinetic energy is the same everywhere", "It changes during each swing."]],
    answer: "A", explanation: "At the bottom the bob has lost the most gravitational potential energy, so it has the most kinetic energy and moves fastest.",
    hints: ["Where is its gravitational potential energy least?"] });

  q.num({ d: 3, skill: "APPLICATION",
    stem: t`How high would a $0.40\ \text{kg}$ ball rise if it were thrown straight up with $19.6\ \text{J}$ of kinetic energy? Ignore air resistance and take $g = 9.8\ \text{N/kg}$.`,
    value: 5, answer: "5.0", unit: "m", wrong: [49, 0.2, 7.84],
    explanation: t`All the kinetic energy becomes gravitational potential energy: $h = \dfrac{19.6}{0.40 \times 9.8} = 5.0\ \text{m}$.`,
    hints: ["At the top, Ek has become Ep = mgh."] });

  q.fib({ d: 2, skill: "RECALL",
    stem: "Complete the equation for a change in gravitational potential energy.",
    template: "ΔEp = m × {{blank:a}} × Δh, where Δh is the change in {{blank:b}}.",
    blanks: [{ id: "a", input: "select", choices: ["g", "v", "a", "t"], accepted: ["g"], wrong: "v" }, { id: "b", input: "select", choices: ["height", "speed", "time", "mass"], accepted: ["height"], wrong: "speed" }],
    explanation: "ΔEp = mgΔh, with Δh the change in height." });

  q.num({ d: 4, skill: "ANALYSIS",
    stem: t`A $1200\ \text{kg}$ car slows from $20\ \text{m/s}$ to $10\ \text{m/s}$. How much kinetic energy does it lose?`,
    value: 180000, unit: "J", wrong: [60000, 240000, 12000],
    explanation: t`$E_k$ before $= \tfrac{1}{2}(1200)(20^2) = 240\,000\ \text{J}$; after $= \tfrac{1}{2}(1200)(10^2) = 60\,000\ \text{J}$; loss $= 180\,000\ \text{J}$.`,
    hints: ["Work out Ek before and after separately.", "Do not use (20 − 10)²."] });

  q.card("FORMULA", "Kinetic energy?", "Ek = ½mv² (in joules, with m in kg and v in m/s).");
  q.card("FORMULA", "Change in gravitational potential energy?", "ΔEp = mgΔh.");
  q.card("CONCEPT", "What happens to Ek if speed doubles?", "It becomes four times as large (Ek ∝ v²).");
  q.card("CONCEPT", "Speed after falling a height h from rest (no air resistance)?", "v = √(2gh); it does not depend on mass.");
  q.card("CONCEPT", "Energy changes in a swinging pendulum?", "Ep greatest at the top of each swing, Ek greatest at the bottom; slowly lost to heating.");
  q.card("CONCEPT", "Why do real falling objects land slower than calculated?", "Air resistance transfers some energy to the internal store of the air.");
});

// =====================================================================================================================
concept("phys.energy.work", {
  file: "energy/work",
  keyPrefix: "energy.work",
  objectives: { cambridge: ["1.7.2.1", "1.7.2.2"], zimsec: ["6.1.1", "6.1.2"] },
}, (q) => {
  q.mcq({ d: 1, skill: "RECALL",
    stem: "Work done is defined as:",
    options: [["force × distance moved in the direction of the force", "Correct."], ["force × time for which the force is acting on the object", "That is impulse (the change of momentum)."], ["mass × acceleration of the object being moved", "That is the resultant force."], ["energy transferred ÷ time taken to transfer it", "That is power."]],
    answer: "A", explanation: "W = Fd, with d the distance moved in the direction of the force." });

  q.num({ d: 2, skill: "APPLICATION", daily: true,
    stem: t`A learner drags a box $15\ \text{m}$ across the floor with a horizontal force of $60\ \text{N}$. How much work does she do?`,
    value: 900, unit: "J", wrong: [4, 75, 0.25],
    explanation: t`$W = Fd = 60 \times 15 = 900\ \text{J}$.` });

  q.num({ d: 2, skill: "APPLICATION", daily: true,
    stem: t`A crane does $36\,000\ \text{J}$ of work lifting a steel beam $12\ \text{m}$. What force did it exert?`,
    value: 3000, unit: "N", wrong: [432000, 0.00033, 36012],
    explanation: t`$F = \dfrac{W}{d} = \dfrac{36\,000}{12} = 3000\ \text{N}$.` });

  q.tf({ d: 2, skill: "UNDERSTANDING",
    stem: "A security guard who stands still holding a heavy bag for an hour does work on the bag.",
    answer: false, explanation: "The bag does not move, so the distance in the direction of the force is zero and no work is done on it (the guard tires because energy is wasted in the muscles)." });

  q.mcq({ d: 2, skill: "RECALL",
    stem: "What is the unit of work?",
    options: [["joule", "Correct."], ["watt", "Unit of power."], ["newton", "Unit of force."], ["pascal", "Unit of pressure."]],
    answer: "A", explanation: "Work is measured in joules: 1 J = 1 N m." });

  q.num({ d: 3, skill: "APPLICATION",
    stem: t`A farmer carries a $25\ \text{kg}$ bag of seed up a hill, rising $40\ \text{m}$ vertically. Taking $g = 9.8\ \text{N/kg}$, how much work does she do against gravity on the bag?`,
    value: 9800, unit: "J", wrong: [1000, 980, 245],
    explanation: t`Weight $= 25 \times 9.8 = 245\ \text{N}$; $W = 245 \times 40 = 9800\ \text{J}$.`,
    hints: ["Find the weight first.", "Use the vertical height, not the length of the path."] });

  q.mcq({ d: 3, skill: "UNDERSTANDING",
    stem: "A waiter carries a tray at a steady speed across a level floor. How much work does his upward supporting force do on the tray?",
    options: [["None, because the force is at right angles to the motion", "Correct."], ["A lot, because the tray is heavy and he walks far", "Weight does not matter here."], ["Work equal to the weight of the tray, in joules", "Work is force × distance moved in the direction of the force, not a force."], ["Work equal to the tray's weight × the distance he walks", "The distance moved is not in the direction of the force."]],
    answer: "A", explanation: "Work needs movement in the direction of the force; the upward force and horizontal motion are perpendicular, so no work is done.",
    hints: ["Is there any movement in the direction of the supporting force?"] });

  q.struct({ d: 3, skill: "APPLICATION", examStyle: true,
    stem: t`A woman pushes a loaded wheelbarrow $40\ \text{m}$ along a level path at a steady speed with a force of $120\ \text{N}$.`,
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the work she does.", value: 4800, unit: "J", wrong: [3, 160], explanation: t`$W = 120 \times 40 = 4800\ \text{J}$.` }),
      P.mcq({ label: "(b)", stem: "The wheelbarrow moves at a steady speed. Where does the energy she transfers go?", options: [["Mostly to heating, through friction and air resistance", "Correct: the kinetic energy is not increasing."], ["Into the wheelbarrow's kinetic store, which keeps increasing", "The speed is steady."], ["Into gravitational potential energy", "The path is level."], ["Nowhere: no work is done", "4800 J of work is done."]], answer: "A", explanation: "At steady speed on a level path, the work done against friction ends up heating the wheel, ground and air." }),
    ],
    explanation: "W = Fd = 4800 J; at steady speed on the level, that energy is dissipated by friction and air resistance.",
    hints: ["Work = force × distance."] });

  q.short({ d: 2, skill: "RECALL",
    stem: "Work done is equal to the amount of what that is transferred?",
    accepted: ["energy", "the energy", "energy transferred"], wrong: ["power", "force"],
    explanation: "Work done = energy transferred." });

  q.num({ d: 4, skill: "APPLICATION",
    stem: t`A box is pushed $8.0\ \text{m}$ up a smooth ramp with a force of $150\ \text{N}$ along the ramp. The box weighs $400\ \text{N}$ and is raised $2.5\ \text{m}$ vertically. How much of the work done is wasted?`,
    value: 200, unit: "J", wrong: [1000, 1200, 3200],
    explanation: t`Work done $= 150 \times 8.0 = 1200\ \text{J}$; useful work (gain in $E_p$) $= 400 \times 2.5 = 1000\ \text{J}$; wasted $= 200\ \text{J}$ (against friction).`,
    hints: ["Work in = force along the ramp × length of ramp.", "Useful work = weight × vertical height."] });

  q.match({ d: 2, skill: "UNDERSTANDING",
    stem: "Match each situation with whether work is done on the object.",
    pairs: [["Lifting a bucket from a well", "Yes: force and movement both upwards"], ["Holding a bucket still above the ground", "No: no movement"], ["Pushing against a solid wall", "No: the wall does not move"], ["A car engine pushing a car along a road", "Yes: force and movement in the same direction"]],
    explanation: "Work is done only when the object moves in the direction of the force." });

  q.card("DEFINITION", "Define **work done**.", "Force × distance moved in the direction of the force.");
  q.card("FORMULA", "Equation for work?", "W = Fd = ΔE.");
  q.card("FACT", "What is 1 joule?", "The work done when a 1 N force moves 1 m in its direction (1 J = 1 N m).");
  q.card("CONCEPT", "How are work and energy related?", "Work done = energy transferred.");
  q.card("CONCEPT", "When is no work done?", "When there is no movement in the direction of the force.");
  q.card("CONCEPT", "Work done lifting an object steadily?", "Weight × vertical height = gain in gravitational potential energy.");
});

// =====================================================================================================================
concept("phys.energy.power", {
  file: "energy/power",
  keyPrefix: "energy.power",
  objectives: { cambridge: ["1.7.4.1"], zimsec: ["6.3.1", "6.3.3"] },
}, (q) => {
  q.mcq({ d: 1, skill: "RECALL",
    stem: "What is power?",
    options: [["Energy transferred per unit time", "Correct."], ["Force × distance moved by the force", "That is work done."], ["Force acting per unit area of surface", "That is pressure."], ["Energy transferred multiplied by time", "Power is energy divided by time."]],
    answer: "A", explanation: "Power = work done (or energy transferred) ÷ time taken." });

  q.mcq({ d: 1, skill: "RECALL",
    stem: "One watt is equal to:",
    options: [["1 joule per second", "Correct."], ["1 newton per metre", "Not power."], ["1 joule × 1 second", "Divide by time."], ["1 newton per second", "Not power."]],
    answer: "A", explanation: "1 W = 1 J/s." });

  q.num({ d: 2, skill: "APPLICATION", daily: true,
    stem: t`An electric iron transfers $36\,000\ \text{J}$ of energy in $30\ \text{s}$. What is its power?`,
    value: 1200, unit: "W", wrong: [1080000, 0.00083, 36030],
    explanation: t`$P = \dfrac{E}{t} = \dfrac{36\,000}{30} = 1200\ \text{W}$.` });

  q.num({ d: 2, skill: "APPLICATION", daily: true,
    stem: t`How much energy does a $60\ \text{W}$ lamp transfer in $5.0$ minutes?`,
    value: 18000, unit: "J", wrong: [300, 12, 0.2],
    explanation: t`$t = 5.0 \times 60 = 300\ \text{s}$; $E = Pt = 60 \times 300 = 18\,000\ \text{J}$.` });

  q.num({ d: 3, skill: "APPLICATION",
    stem: t`A borehole pump lifts $500\ \text{kg}$ of water through a height of $20\ \text{m}$ in $50\ \text{s}$. Taking $g = 9.8\ \text{N/kg}$, calculate its useful power output.`,
    value: 1960, unit: "W", wrong: [200, 98000, 10000],
    explanation: t`Work $= mgh = 500 \times 9.8 \times 20 = 98\,000\ \text{J}$; $P = \dfrac{98\,000}{50} = 1960\ \text{W}$.`,
    hints: ["Work done lifting = weight × height.", "Then divide by the time."] });

  q.struct({ d: 3, skill: "APPLICATION", examStyle: true,
    stem: t`Farai ($65\ \text{kg}$) runs up a flight of stairs $4.5\ \text{m}$ high in $5.2\ \text{s}$. Take $g = 9.8\ \text{N/kg}$.`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "Calculate his weight.", value: 637, unit: "N", wrong: [65, 6.63], explanation: t`$65 \times 9.8 = 637\ \text{N}$.` }),
      P.num({ label: "(b)", marks: 1, stem: "Calculate the work he does against gravity.", value: r(637 * 4.5), unit: "J", wrong: [292.5, 141.6], explanation: t`$637 \times 4.5 = 2866.5 \approx 2870\ \text{J}$.` }),
      P.num({ label: "(c)", marks: 2, stem: "Calculate his power.", value: r(637 * 4.5 / 5.2), unit: "W", wrong: [14906, 122.5], explanation: t`$\dfrac{2866.5}{5.2} = 551\ \text{W}$.` }),
    ],
    explanation: "Power = weight × height ÷ time = 637 × 4.5 ÷ 5.2 ≈ 551 W.",
    hints: ["Weight = mg.", "Power = work ÷ time."] });

  q.num({ d: 3, skill: "APPLICATION", applies: Z,
    stem: t`A tractor pulls a plough at a steady $1.5\ \text{m/s}$ with a force of $6000\ \text{N}$. Use $P = Fv$ to find its useful power.`,
    value: 9000, unit: "W", wrong: [4000, 6001.5, 0.00025],
    explanation: t`$P = Fv = 6000 \times 1.5 = 9000\ \text{W} = 9.0\ \text{kW}$.`,
    hints: ["P = force × speed."] });

  q.tf({ d: 2, skill: "UNDERSTANDING",
    stem: "Two learners of equal weight climb the same stairs; the one who takes less time develops more power.",
    answer: true, explanation: "They do the same work; doing it in less time means a greater rate of energy transfer, i.e. more power." });

  q.mcq({ d: 3, skill: "UNDERSTANDING",
    stem: "To measure your own power by running up stairs, which measurements are needed?",
    options: [["Your mass, the stairs' vertical height and the time taken", "Correct."], ["Your height, the number of steps and your running speed", "Your own height is not needed."], ["The length of the staircase and your mass only", "Time is needed for power."], ["Only the time taken to reach the top of the stairs", "The work done is also needed."]],
    answer: "A", explanation: "Power = work ÷ time = (weight × vertical height) ÷ time.",
    hints: ["Power = work ÷ time; what do you need to find the work?"] });

  q.num({ d: 4, skill: "ANALYSIS",
    stem: t`A $2.0\ \text{kW}$ kettle is switched on for $2.5$ minutes. How much energy does it transfer?`,
    value: 300000, unit: "J", wrong: [5000, 300, 5],
    explanation: t`$P = 2000\ \text{W}$, $t = 150\ \text{s}$: $E = Pt = 2000 \times 150 = 300\,000\ \text{J}$ (300 kJ).`,
    hints: ["Convert kW to W and minutes to seconds."] });

  q.fib({ d: 2, skill: "RECALL",
    stem: "Complete the conversions.",
    template: "1 kW = {{blank:a}} W, and 1 MW = {{blank:b}} W.",
    blanks: [{ id: "a", input: "number", accepted: ["1000"], wrong: "100" }, { id: "b", input: "number", accepted: ["1000000"], wrong: "1000" }],
    explanation: "kilo = 10³ and mega = 10⁶." });

  q.card("DEFINITION", "Define **power**.", "The work done, or energy transferred, per unit time.");
  q.card("FORMULA", "Equation for power?", "P = W/t = ΔE/t.");
  q.card("FACT", "What is 1 watt?", "1 joule per second.");
  q.card("FORMULA", "Power from force and speed?", "P = Fv.", undefined, { applies: Z });
  q.card("CONCEPT", "How do you measure your own power?", "Weight × vertical height of stairs ÷ time to climb them.");
  q.card("CONCEPT", "Energy vs power?", "Energy (J) is how much is transferred; power (W) is how fast.");
});

// =====================================================================================================================
concept("phys.energy.efficiency", {
  file: "energy/efficiency",
  keyPrefix: "energy.efficiency",
  objectives: { cambridge: ["1.7.3.3", "1.7.3.7"] },
}, (q) => {
  q.mcq({ d: 1, skill: "RECALL",
    stem: "Which equation gives the percentage efficiency of a device?",
    options: [["useful energy output ÷ total energy input × 100%", "Correct."], ["total energy input ÷ useful energy output × 100%", "Upside down."], ["wasted energy ÷ useful energy × 100%", "Not efficiency."], ["useful power × time", "That is useful energy."]],
    answer: "A", explanation: "Efficiency = useful output ÷ total input × 100%." });

  q.num({ d: 2, skill: "APPLICATION", daily: true,
    stem: t`A light bulb is supplied with $200\ \text{J}$ and gives out $50\ \text{J}$ as light. Calculate its efficiency.`,
    value: 25, unit: "%", wrong: [400, 150, 0.25],
    explanation: t`$\dfrac{50}{200} \times 100\% = 25\%$.` });

  q.num({ d: 2, skill: "APPLICATION", daily: true,
    stem: t`An electric motor has an input power of $800\ \text{W}$ and a useful output power of $680\ \text{W}$. What is its efficiency?`,
    value: 85, unit: "%", wrong: [118, 15, 0.85],
    explanation: t`$\dfrac{680}{800} \times 100\% = 85\%$.` });

  q.num({ d: 3, skill: "APPLICATION",
    stem: t`A generator is $90\%$ efficient. How much useful electrical energy does it give out for an input of $5000\ \text{J}$?`,
    value: 4500, unit: "J", wrong: [5556, 500, 450000],
    explanation: t`Useful output $= 0.90 \times 5000 = 4500\ \text{J}$.`,
    hints: ["Useful output = efficiency × input (as a decimal)."] });

  q.num({ d: 3, skill: "APPLICATION",
    stem: t`An LED bulb gives out $9.0\ \text{W}$ of light and is $60\%$ efficient. What is its input power?`,
    value: 15, unit: "W", wrong: [5.4, 540, 6.67],
    explanation: t`Input $= \dfrac{\text{useful output}}{\text{efficiency}} = \dfrac{9.0}{0.60} = 15\ \text{W}$.`,
    hints: ["Rearrange: input = output ÷ efficiency."] });

  q.mcq({ d: 2, skill: "UNDERSTANDING",
    stem: "Where does most of the wasted energy from a car engine go?",
    options: [["Heating the exhaust, the engine and the surroundings", "Correct: most of the fuel's energy ends up in thermal stores."], ["It is destroyed in the engine as the fuel burns", "Energy is never destroyed; it is transferred to thermal stores."], ["Back into the fuel tank as unburnt petrol vapour", "Wasted energy is not returned to the fuel."], ["Into the kinetic store that keeps the car moving", "That is the useful output, not the waste."]],
    answer: "A", explanation: "Most wasted energy is transferred by heating to the exhaust gases, cooling system and surroundings." });

  q.tf({ d: 2, skill: "UNDERSTANDING",
    stem: "A well-designed machine can be more than 100% efficient.",
    answer: false, explanation: "Useful output can never exceed total input, because energy cannot be created; real machines always waste some energy." });

  q.struct({ d: 4, skill: "ANALYSIS", examStyle: true,
    stem: t`A solar water-heating panel receives $1500\ \text{J}$ of energy from sunlight each second. The water in it gains $600\ \text{J}$ each second.`,
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the efficiency of the panel.", value: 40, unit: "%", wrong: [250, 60], explanation: t`$\dfrac{600}{1500} \times 100\% = 40\%$.` }),
      P.num({ label: "(b)", marks: 1, stem: "How much energy is wasted each second?", value: 900, unit: "J", wrong: [2100, 600], explanation: "1500 − 600 = 900 J each second." }),
      P.manual({ label: "(c)", marks: 2, stem: "Suggest two ways of making the panel more efficient.",
        points: ["Insulate the back and sides of the panel (and the pipes) so less energy is lost to the surroundings", "Use a dull black absorbing surface and a glass cover to trap the heat (reduce reflection and convection losses)"] }),
    ],
    explanation: "Efficiency = 600/1500 = 40%; 900 J is lost each second, reducible by insulation, a black absorber and a glass cover.",
    hints: ["Efficiency = useful ÷ input × 100%.", "Where could heat escape from the panel?"] });

  q.mcq({ d: 3, skill: "ANALYSIS",
    stem: "A family replaces a 60 W filament bulb with a 9 W LED bulb that gives the same amount of light. Why does this save money?",
    options: [["The LED wastes far less energy as heat for the same light.", "Correct."], ["The LED gives much more light, so fewer bulbs are needed.", "The stem says both bulbs give the same amount of light."], ["LEDs run on stored solar energy, not mains electricity.", "An LED bulb uses mains electricity: 9 W."], ["The filament bulb gives no useful light at all, only heat.", "It gives light, but most of its input energy heats the room."]],
    answer: "A", explanation: "Both give the same useful light output, but the LED needs far less input power, so less energy is paid for.",
    hints: ["Compare the input powers for the same useful output."] });

  q.short({ d: 2, skill: "RECALL",
    stem: "What word describes wasted energy that has spread out into the surroundings so it is no longer useful?",
    accepted: ["dissipated", "dissipation", "it is dissipated", "dissipated energy"], wrong: ["destroyed"],
    explanation: "Wasted energy is dissipated: spread out, usually heating the surroundings." });

  q.card("FORMULA", "Efficiency equation?", "Efficiency = useful output ÷ total input × 100% (energy or power).");
  q.card("CONCEPT", "Why can efficiency never exceed 100%?", "Energy cannot be created; useful output is never more than input.");
  q.card("CONCEPT", "Where does wasted energy usually go?", "Heating the surroundings: it is dissipated.");
  q.card("FACT", "How can efficiency be improved?", "Reduce friction (lubrication), reduce heat losses (insulation), use better designs (e.g. LEDs).");
  q.card("FORMULA", "Useful output from efficiency?", "Useful output = efficiency × input.");
});

// =====================================================================================================================
concept("phys.energy.resources", {
  file: "energy/resources",
  keyPrefix: "energy.resources",
  objectives: { cambridge: ["1.7.3.1", "1.7.3.2"], zimsec: ["6.2.2"] },
}, (q) => {
  q.mcq({ d: 1, skill: "RECALL",
    stem: "Which energy resource is renewable?",
    options: [["Coal", "Non-renewable."], ["Natural gas", "Non-renewable."], ["Wind", "Correct."], ["Uranium", "Non-renewable."]],
    answer: "C", explanation: "Wind is replaced naturally and will not run out." });

  q.mcq({ d: 1, skill: "RECALL", multiple: true,
    stem: "Select **all** the non-renewable energy resources.",
    options: [["Oil", "Non-renewable."], ["Solar", "Renewable."], ["Coal", "Non-renewable."], ["Hydroelectric", "Renewable."], ["Nuclear fuel (uranium)", "Non-renewable."], ["Biogas", "Renewable."]],
    answer: ["A", "C", "E"], explanation: "Fossil fuels and uranium will run out; solar, hydroelectric and biogas are renewable." });

  q.mcq({ d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In a coal-fired power station, what turns the turbines?",
    options: [["High-pressure steam", "Correct."], ["Falling water", "That is hydroelectric."], ["Wind", "That is a wind turbine."], ["Burning coal directly pushes the blades", "The coal heats water to make steam."]],
    answer: "A", explanation: "Burning coal heats water into steam, which spins the turbines that drive the generators." });

  q.tf({ d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Solar cells use a turbine to generate electricity.",
    answer: false, explanation: "Solar cells transfer light energy directly to electrical energy, with no moving parts." });

  q.mcq({ d: 2, skill: "UNDERSTANDING",
    stem: "What is the main disadvantage of hydroelectric power in a country with frequent droughts?",
    options: [["Output falls when rainfall is low and the dam level drops.", "Correct."], ["It produces a lot of smoke and carbon dioxide while running.", "Hydroelectric stations burn nothing while running."], ["It is non-renewable, so the water will eventually run out.", "Rain refills the dam: it is renewable."], ["It cannot be switched on quickly when demand rises.", "Hydro turbines can start within minutes."]],
    answer: "A", explanation: "Hydroelectric output depends on the water stored behind the dam, which depends on rainfall." });

  q.match({ d: 2, skill: "UNDERSTANDING",
    stem: "Match each resource with a disadvantage.",
    pairs: [["Coal", "Releases carbon dioxide and sulfur dioxide"], ["Wind", "No output when the air is still"], ["Solar cells", "No output at night"], ["Nuclear fission", "Produces long-lived radioactive waste"]],
    explanation: "Every resource has drawbacks: pollution, unreliability or hazardous waste." });

  q.mcq({ d: 3, skill: "EVALUATION",
    stem: "A remote rural clinic far from the national grid needs electricity for lights and a vaccine fridge. Which is the most suitable choice?",
    options: [["Solar panels with batteries", "Correct: sunny climate, no fuel to deliver, batteries cover the night."], ["A new coal power station", "Far too large and costly."], ["A tidal generator", "Zimbabwe is landlocked."], ["A nuclear reactor", "Far too large, costly and hazardous."]],
    answer: "A", explanation: "Solar power suits small, remote sites with plenty of sunshine; batteries store energy for the night.",
    hints: ["Think about scale, availability and cost of fuel delivery."] });

  q.mcq({ d: 3, skill: "UNDERSTANDING", applies: C,
    stem: "Which energy resource does NOT get its energy from the Sun?",
    options: [["Geothermal", "Correct: from hot rocks inside the Earth."], ["Wind", "Winds are driven by the Sun's heating."], ["Coal", "Made from ancient plants that grew using sunlight."], ["Hydroelectric", "The Sun drives the water cycle that fills dams."]],
    answer: "A", explanation: "Geothermal, nuclear and tidal energy do not come from the Sun; most other resources do.",
    hints: ["Which resource comes from inside the Earth?"] });

  q.short({ d: 2, skill: "RECALL", applies: C,
    stem: "By what nuclear process does the Sun release its energy?",
    accepted: ["nuclear fusion", "fusion"], wrong: ["fission", "nuclear fission"],
    explanation: "The Sun releases energy by nuclear fusion, joining hydrogen nuclei to make helium." });

  q.struct({ d: 4, skill: "EVALUATION", examStyle: true,
    stem: "A country gets most of its electricity from a coal-fired station and a large hydroelectric dam.",
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "Give one advantage of the coal-fired station compared with the dam.",
        points: ["It is reliable: it can generate whatever the rainfall", "Its output can be kept high or increased on demand while coal is available"] }),
      P.manual({ label: "(b)", marks: 2, stem: "Give two environmental disadvantages of the coal-fired station.",
        points: ["Burning coal releases carbon dioxide, a greenhouse gas linked to global warming", "It releases sulfur dioxide (acid rain), smoke and ash, and coal is non-renewable"] }),
      P.mcq({ label: "(c)", stem: "Which energy store does the water behind the dam provide?", options: [["Gravitational potential", "Correct."], ["Chemical store", "The water is not a fuel."], ["Nuclear store", "No nuclear change."], ["Elastic potential", "The water is not stretched."]], answer: "A", explanation: "Water held at a height has gravitational potential energy." }),
    ],
    explanation: "Coal is reliable but polluting and non-renewable; hydroelectric power is renewable and clean but depends on rainfall.",
    hints: ["Think about reliability versus environmental impact."] });

  q.mcq({ d: 2, skill: "RECALL",
    stem: "What is a biofuel?",
    options: [["A fuel made from recently living material, e.g. wood or ethanol", "Correct."], ["A fuel made from coal, which formed from ancient plants", "Coal is a fossil fuel, formed over millions of years."], ["Any fuel that gives off no carbon dioxide at all when it is burned", "Biofuels do release carbon dioxide when they burn."], ["A fuel such as uranium that is used in nuclear reactors", "That is nuclear fuel."]],
    answer: "A", explanation: "Biofuels come from plants or animal waste: wood, ethanol, biogas." });

  q.card("DEFINITION", "What is a **renewable** resource?", "One that is replaced naturally as fast as it is used (sun, wind, water, biofuels).");
  q.card("DEFINITION", "What is a **non-renewable** resource?", "One that will run out: coal, oil, gas, uranium.");
  q.card("CONCEPT", "How does a thermal power station work?", "Fuel heats water to steam → steam turns a turbine → turbine drives a generator.");
  q.card("CONCEPT", "How does a hydroelectric station work?", "Water from a dam falls through turbines that drive generators (GPE → KE → electrical).");
  q.card("FACT", "Main drawback of solar cells?", "No output at night and less on cloudy days; batteries are needed.");
  q.card("FACT", "Main drawback of hydroelectric power in droughts?", "Output falls when dam levels drop.");
  q.card("CONCEPT", "Which resources do not come from the Sun?", "Geothermal, nuclear and tidal.", undefined, { applies: C });
  q.card("FACT", "How does the Sun release energy?", "By nuclear fusion of hydrogen into helium.", undefined, { applies: C });
});

// =====================================================================================================================
concept("phys.engines.four-stroke", {
  file: "engines/four-stroke",
  keyPrefix: "engines.fourstroke",
  objectives: { zimsec: ["8.1.1", "8.1.2", "8.1.4"] },
}, (q) => {
  q.mcq({ d: 1, skill: "RECALL", applies: Z,
    stem: "What is the correct order of the strokes in a four-stroke engine?",
    options: [["Induction, compression, power, exhaust", "Correct."], ["Compression, induction, exhaust, power", "Wrong order."], ["Power, induction, compression, exhaust", "Wrong order."], ["Induction, power, compression, exhaust", "Compression comes before power."]],
    answer: "A", explanation: "Induction (intake), compression, power, exhaust." });

  q.mcq({ d: 2, skill: "UNDERSTANDING", applies: Z, daily: true,
    stem: "During the compression stroke of a petrol engine, which valves are open?",
    options: [["Neither valve", "Correct: both are closed so the mixture can be compressed."], ["The inlet valve only", "That is the induction stroke."], ["The exhaust valve only", "That is the exhaust stroke."], ["Both valves", "The mixture would escape."]],
    answer: "A", explanation: "Both valves are closed during compression and power." });

  q.mcq({ d: 2, skill: "UNDERSTANDING", applies: Z,
    stem: "Which stroke is the only one that does useful work on the piston?",
    options: [["Power", "Correct."], ["Induction", "The piston is moved by the crankshaft."], ["Compression", "Work is done ON the gas."], ["Exhaust", "The piston pushes gases out."]],
    answer: "A", explanation: "In the power stroke the burning gases push the piston down; the other strokes are driven by the flywheel." });

  q.short({ d: 2, skill: "RECALL", applies: Z,
    stem: "In a petrol engine, what part produces the spark that ignites the fuel-air mixture?",
    accepted: ["spark plug", "the spark plug", "sparkplug"], wrong: ["carburettor"],
    explanation: "The spark plug ignites the compressed mixture at the start of the power stroke." });

  q.mcq({ d: 2, skill: "UNDERSTANDING", applies: Z,
    stem: "What is the job of the carburettor?",
    options: [["To mix petrol and air in the right proportions", "Correct."], ["To ignite the fuel", "That is the spark plug."], ["To cool the engine", "That is the radiator."], ["To turn up-and-down motion into rotation", "That is the crankshaft."]],
    answer: "A", explanation: "The carburettor mixes fuel and air for efficient burning." });

  q.tf({ d: 2, skill: "UNDERSTANDING", applies: Z, daily: true,
    stem: "A diesel engine needs a spark plug to ignite its fuel.",
    answer: false, explanation: "Diesel engines compress air so strongly that it becomes hot enough to ignite the injected diesel: compression ignition." });

  q.match({ d: 3, skill: "UNDERSTANDING", applies: Z,
    stem: "Match each stroke with what happens.",
    pairs: [["Induction", "Piston moves down; fuel-air mixture drawn in through the inlet valve"], ["Compression", "Piston moves up; mixture squashed with both valves closed"], ["Power", "Spark ignites the mixture; expanding gas pushes the piston down"], ["Exhaust", "Piston moves up; burnt gases pushed out through the exhaust valve"]],
    explanation: "The four strokes repeat in this order every two turns of the crankshaft.",
    hints: ["Two strokes have the piston moving down, two up."] });

  q.mcq({ d: 3, skill: "ANALYSIS", applies: Z,
    stem: "Why do car engines usually have four or more cylinders?",
    options: [["Power strokes come more often, so it runs smoother and stronger.", "Correct."], ["So that every stroke of each piston becomes a power stroke.", "Each cylinder still has one power stroke in four."], ["So that each cylinder burns less fuel and runs cooler.", "Not the main reason: smoothness and power are."], ["Because a single cylinder cannot hold a spark plug and valves.", "A single cylinder can have both, as in small motorcycle engines."]],
    answer: "A", explanation: "With several cylinders firing at different times there is an even series of power strokes: smoother running and more power.",
    hints: ["How often does a single cylinder produce a power stroke?"] });

  q.mcq({ d: 3, skill: "ANALYSIS", applies: Z,
    stem: "A car's air filter becomes blocked. What is the most likely result?",
    options: [["Incomplete combustion, producing black soot and carbon monoxide", "Correct: too little air."], ["The engine runs cooler and its exhaust becomes cleaner", "It runs worse."], ["Fuel economy improves because less air is drawn in", "Too little air wastes fuel: economy gets worse."], ["The spark plug stops sparking at once and the engine cuts out completely", "The spark plug is not affected directly."]],
    answer: "A", explanation: "Too little air for the fuel means incomplete burning: soot, carbon monoxide and wasted fuel.",
    hints: ["What does fuel need to burn completely?"] });

  q.struct({ d: 4, skill: "EVALUATION", applies: Z, examStyle: true,
    stem: "A transport company is choosing engines for its long-distance buses.",
    parts: [
      P.manual({ label: "(a)", marks: 3, stem: "Describe two differences between the operation of a petrol engine and a diesel engine.",
        points: ["Petrol engine draws in a fuel-air mixture; diesel draws in air only (fuel is injected later)", "Petrol ignites by a spark from a spark plug; diesel ignites by the heat of compression", "Diesel compresses the air much more (higher compression)"] }),
      P.manual({ label: "(b)", marks: 2, stem: "Suggest why diesel engines are chosen for the buses.",
        points: ["Diesel engines are more efficient, giving more kilometres per litre (better fuel economy)", "They are strong and durable, suiting heavy vehicles and long distances"] }),
    ],
    explanation: "Diesel engines draw in air only, ignite by compression and are more economical and robust, which suits heavy buses.",
    hints: ["Think about ignition and what is drawn in."] });

  q.mcq({ d: 2, skill: "UNDERSTANDING", applies: Z,
    stem: "What does the choke do when a cold petrol engine is started?",
    options: [["Cuts the air supply to give a richer, easier-to-light mixture", "Correct."], ["Cools the engine while it warms up after starting", "The choke does nothing to cool the engine."], ["Stops fuel reaching the cylinders until the engine is warm enough", "It enriches the mixture."], ["Opens the exhaust valve to clear out burnt gases", "That is the exhaust valve's job."]],
    answer: "A", explanation: "The choke restricts air so the mixture has more petrol, making a cold start easier." });

  q.card("FACT", "Four strokes in order?", "Induction, compression, power, exhaust.", undefined, { applies: Z });
  q.card("CONCEPT", "Which stroke does useful work?", "Only the power stroke; a flywheel carries the engine through the others.", undefined, { applies: Z });
  q.card("FACT", "Job of the carburettor?", "Mixes petrol and air in the right proportions.", undefined, { applies: Z });
  q.card("FACT", "What does the choke do?", "Reduces air for a richer mixture when starting a cold engine.", undefined, { applies: Z });
  q.card("CONCEPT", "How does a diesel engine ignite its fuel?", "By compression: air is squeezed until hot enough to ignite the injected diesel.", undefined, { applies: Z });
  q.card("CONCEPT", "Why have several cylinders?", "More frequent power strokes: smoother running and more power.", undefined, { applies: Z });
  q.card("CONCEPT", "What causes soot and carbon monoxide from an engine?", "Incomplete combustion from too little air (e.g. blocked air filter, over-used choke).", undefined, { applies: Z });
  q.card("FACT", "How is a vehicle's efficiency often measured?", "Fuel economy: kilometres per litre.", undefined, { applies: Z });
});

// =====================================================================================================================
concept("phys.engines.fuels", {
  file: "engines/fuels",
  keyPrefix: "engines.fuels",
  objectives: { zimsec: ["fuels.1", "fuels.2", "fuels.3"] },
}, (q) => {
  q.mcq({ d: 1, skill: "RECALL", applies: Z,
    stem: "Which of these is a non-renewable fuel?",
    options: [["Paraffin", "Correct: made from petroleum."], ["Biogas", "Renewable."], ["Ethanol from sugar cane", "Renewable."], ["Wood from a replanted plantation", "Renewable if replanted."]],
    answer: "A", explanation: "Paraffin comes from petroleum, which will run out." });

  q.mcq({ d: 2, skill: "UNDERSTANDING", applies: Z, daily: true,
    stem: "Why is a charcoal brazier dangerous in a closed bedroom at night?",
    options: [["Incomplete burning makes carbon monoxide, an odourless poison.", "Correct."], ["It produces too much oxygen, which is harmful to breathe.", "Burning uses up oxygen; it does not produce it."], ["Burning charcoal gives off dangerous nuclear radiation.", "Charcoal is not radioactive."], ["It dries the air so much that sleepers become dehydrated.", "Dry air is uncomfortable, but the deadly danger is carbon monoxide."]],
    answer: "A", explanation: "With little fresh air, charcoal burns incompletely and fills the room with odourless, poisonous carbon monoxide." });

  q.tf({ d: 2, skill: "UNDERSTANDING", applies: Z,
    stem: "Wood is a renewable fuel only if trees are replanted at least as fast as they are cut down.",
    answer: true, explanation: "Without replanting, cutting trees for fuel causes deforestation and the resource is used up." });

  q.mcq({ d: 2, skill: "UNDERSTANDING", applies: Z,
    stem: "Which is an environmental effect of cutting down woodland for firewood and charcoal?",
    options: [["Soil erosion and silting of rivers and dams", "Correct."], ["More rainfall in the cleared areas", "Not a direct effect."], ["Cleaner air, because fewer trees decay", "Burning wood makes smoke; clearing woodland does not clean the air."], ["Lower carbon dioxide levels in the air", "Fewer trees take up less CO₂."]],
    answer: "A", explanation: "Without tree roots and cover, soil washes away into rivers and dams." });

  q.match({ d: 2, skill: "UNDERSTANDING", applies: Z,
    stem: "Match each pollutant with its effect.",
    pairs: [["Carbon dioxide", "Greenhouse gas linked to global warming"], ["Sulfur dioxide (from coal)", "Causes acid rain"], ["Carbon monoxide", "Poisonous gas from incomplete burning"], ["Soot and smoke", "Harms the lungs and blackens buildings"]],
    explanation: "Burning fuels releases several pollutants with different effects." });

  q.mcq({ d: 3, skill: "EVALUATION", applies: Z,
    stem: "Blending locally made ethanol with imported petrol has which economic advantage?",
    options: [["Less petrol has to be imported, saving foreign currency.", "Correct."], ["It makes the blended petrol fully renewable.", "Only the ethanol part is renewable; the petrol is still a fossil fuel."], ["It removes all air pollution from car exhausts.", "Burning ethanol still releases CO₂."], ["It lets engines run on less fuel for the same distance.", "Ethanol stores less energy per litre, so fuel use does not fall."]],
    answer: "A", explanation: "Each litre of local ethanol replaces imported petrol, saving foreign currency and supporting local jobs.",
    hints: ["Where does petrol come from?"] });

  q.mcq({ d: 2, skill: "UNDERSTANDING", applies: Z, multiple: true,
    stem: "Select **all** the safe ways of storing paraffin at home.",
    options: [["In a labelled, approved fuel container", "Safe."], ["Away from flames and heat", "Safe."], ["In an empty cool-drink bottle on the kitchen table", "Dangerous: children may drink it."], ["Out of reach of children", "Safe."], ["Next to the cooking fire for convenience", "Dangerous: fire risk."], ["In an unlabelled open bucket", "Dangerous: spills, fumes, confusion."]],
    answer: ["A", "B", "D"], explanation: "Fuels must be in labelled, approved, sealed containers, away from heat and children." });

  q.short({ d: 2, skill: "RECALL", applies: Z,
    stem: "Name the colourless, odourless, poisonous gas produced when fuels burn with too little air.",
    accepted: ["carbon monoxide", "CO"], wrong: ["carbon dioxide"],
    explanation: "Carbon monoxide (CO) comes from incomplete combustion." });

  q.struct({ d: 3, skill: "EVALUATION", applies: Z, examStyle: true,
    stem: "A rural school is considering a biogas digester that turns cattle dung from a nearby farm into cooking gas for the school kitchen, instead of using firewood.",
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "Give two environmental advantages of the biogas digester.",
        points: ["Fewer trees are cut, reducing deforestation and soil erosion", "It uses waste (dung) and leaves a fertiliser; it burns more cleanly than wood, with less smoke"] }),
      P.manual({ label: "(b)", marks: 1, stem: "Give one social advantage.",
        points: ["Less time spent collecting firewood and less smoke in the kitchen, improving health"] }),
    ],
    explanation: "Biogas is renewable, uses waste, reduces deforestation and smoke, and saves time collecting wood.",
    hints: ["Compare it with cutting and burning firewood."] });

  q.card("FACT", "Name three non-renewable fuels.", "Coal, petroleum products (petrol, diesel, paraffin), natural gas.", undefined, { applies: Z });
  q.card("FACT", "Name three renewable fuels.", "Wood (if replanted), biogas, ethanol.", undefined, { applies: Z });
  q.card("CONCEPT", "What is deforestation and why is it harmful?", "Cutting trees faster than they regrow; it causes soil erosion, silting and loss of habitat.", undefined, { applies: Z });
  q.card("CONCEPT", "Why is carbon monoxide dangerous?", "It is poisonous and has no colour or smell; it comes from incomplete combustion.", undefined, { applies: Z });
  q.card("FACT", "How should fuels be stored?", "In labelled, approved, sealed containers, away from flames and out of children's reach.", undefined, { applies: Z });
  q.card("FACT", "Which pollutant from coal causes acid rain?", "Sulfur dioxide.", undefined, { applies: Z });
});
