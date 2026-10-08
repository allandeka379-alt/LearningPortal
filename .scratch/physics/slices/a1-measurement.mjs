import { concept, P, t } from "../lib.mjs";

const steps = (...lines) => lines.join("\n");
const r = (x, n = 3) => Number(x.toPrecision(n));

// =====================================================================================================================
concept("phys.measurement.length-volume-time", {
  file: "measurement/length-volume-time",
  keyPrefix: "measurement.lvt",
  objectives: { cambridge: ["1.1.1", "1.1.2", "1.1.3"], zimsec: ["1.1.1"] },
}, (q) => {
  q.mcq({ d: 1, skill: "RECALL", applies: ["zimsec"],
    stem: "A learner needs the diameter of a thin copper wire, about $0.5\\ \\text{mm}$ across, as precisely as possible. Which instrument should she use?",
    options: [
      ["A metre rule", "A metre rule reads only to the nearest millimetre, which is bigger than the whole diameter."],
      ["A tape measure", "A tape measure is for long distances and reads to about a millimetre."],
      ["Vernier callipers", "Vernier callipers read to $0.1\\ \\text{mm}$: better than a rule, but not the most precise choice."],
      ["A micrometer screw gauge", "Correct: a micrometer reads to $0.01\\ \\text{mm}$, ideal for a thin wire."],
    ], answer: "D",
    explanation: "A micrometer screw gauge reads to $0.01\\ \\text{mm}$, so it gives the diameter of a thin wire most precisely." });

  q.mcq({ d: 1, skill: "RECALL",
    stem: "How should the volume of water in a measuring cylinder be read?",
    options: [
      ["From the top of the curved surface, looking down", "Looking down causes parallax, and for water the reading is taken at the bottom of the curve."],
      ["From the bottom of the meniscus, with the eye level with it", "Correct."],
      ["From the side of the cylinder where the water touches the glass", "The water creeps up the glass at the edges, so this reading is too high."],
      ["From the bottom of the meniscus, looking up from below", "Looking from below causes a parallax error."],
    ], answer: "B",
    explanation: "Read the bottom of the meniscus with your eye level with it to avoid parallax error." });

  const washers = 25, stack = 38;
  q.num({ d: 2, skill: "APPLICATION", daily: true,
    stem: t`A stack of ${washers} identical metal washers is $${stack}\ \text{mm}$ tall. What is the thickness of one washer?`,
    value: stack / washers, unit: "mm", wrong: [stack * washers, 25 / 38, 13],
    explanation: t`Measure many and divide: $\dfrac{38\ \text{mm}}{25} = 1.52\ \text{mm}$.`,
    workedSolution: steps(t`1. Thickness of one washer $= \dfrac{\text{height of stack}}{\text{number of washers}}$.`, t`2. $= \dfrac{38}{25} = 1.52\ \text{mm}$.`),
    hints: ["Divide the total height by the number of washers."] });

  q.num({ d: 2, skill: "APPLICATION", daily: true,
    stem: t`A pendulum makes 25 complete oscillations in $51.0\ \text{s}$. Calculate its period.`,
    value: 51.0 / 25, answer: "2.04", unit: "s", wrong: [25 / 51, 51, 1275],
    explanation: t`Period $= \dfrac{\text{total time}}{\text{number of oscillations}} = \dfrac{51.0}{25} = 2.04\ \text{s}$.`,
    workedSolution: steps(t`1. Period $T = \dfrac{51.0\ \text{s}}{25}$.`, t`2. $T = 2.04\ \text{s}$.`),
    hints: ["The period is the time for ONE oscillation."] });

  q.tf({ d: 1, skill: "UNDERSTANDING",
    stem: "A hand-operated stop-watch that displays hundredths of a second measures the time of one swing of a pendulum to within 0.01 s.",
    answer: false,
    feedbackFalse: "Right: the person's reaction time, about 0.2 to 0.3 s at each end, is far larger than the display's 0.01 s.",
    explanation: "Human reaction time (about 0.2 s to 0.3 s) limits a hand-operated stop-watch, whatever its display shows. Timing many swings and dividing reduces this error." });

  q.mcq({ d: 2, skill: "UNDERSTANDING",
    stem: "Why do learners time 20 oscillations of a pendulum instead of just one?",
    options: [
      ["The pendulum swings faster after many oscillations.", "The period stays the same; that is why timing many works."],
      ["It reduces the effect of reaction-time errors on the value of the period.", "Correct: the same reaction-time error is shared over 20 oscillations."],
      ["A stop-watch cannot measure a time as short as one second.", "It can display it, but reaction time makes a single reading unreliable."],
      ["It removes the need to repeat the experiment.", "Repeating and averaging is still good practice."],
    ], answer: "B",
    explanation: "The reaction-time error at the start and end is the same whether you time 1 or 20 oscillations, so dividing by 20 makes it 20 times smaller per oscillation." });

  q.num({ d: 2, skill: "APPLICATION", applies: ["zimsec"],
    stem: t`On a pair of Vernier callipers the Vernier zero lies just past $2.3\ \text{cm}$ on the main scale, and the 7th Vernier division lines up exactly with a main-scale mark. What is the reading?`,
    value: 2.37, answer: "2.37", unit: "cm", tol: 0.001, wrong: [2.3, 2.307, 9.3],
    explanation: t`Main scale $2.3\ \text{cm}$ plus Vernier $7 \times 0.01\ \text{cm} = 0.07\ \text{cm}$, so the reading is $2.37\ \text{cm}$.`,
    hints: ["Each Vernier division adds 0.1 mm = 0.01 cm."] });

  q.struct({ d: 3, skill: "APPLICATION", applies: ["zimsec"], examStyle: true,
    stem: t`A micrometer screw gauge reads $0.03\ \text{mm}$ when its jaws are closed with nothing between them. When a ball bearing is placed between the jaws, the sleeve shows $7.0\ \text{mm}$ and the thimble reads 36.`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "What is the reading on the micrometer with the ball bearing in place?", value: 7.36, answer: "7.36", unit: "mm", tol: 0.001, wrong: [7.036, 43],
        explanation: t`$7.0\ \text{mm} + 36 \times 0.01\ \text{mm} = 7.36\ \text{mm}$.` }),
      P.mcq({ label: "(b)", stem: "What is the name of the $0.03\\ \\text{mm}$ reading with the jaws closed?", options: [["A parallax error", "Parallax comes from the angle of viewing."], ["A zero error", "Correct."], ["A reaction-time error", "That affects timing."], ["A random error", "This error is the same every time, so it is systematic."]], answer: "B",
        explanation: "A reading when the true value is zero is a zero error." }),
      P.num({ label: "(c)", marks: 1, stem: "Calculate the true diameter of the ball bearing.", value: 7.33, answer: "7.33", unit: "mm", tol: 0.001, wrong: [7.39, 7.36],
        explanation: t`Subtract the zero error: $7.36 - 0.03 = 7.33\ \text{mm}$.` }),
    ],
    explanation: t`Reading $= 7.0 + 0.36 = 7.36\ \text{mm}$; the instrument already reads $0.03\ \text{mm}$ at zero, so the true diameter is $7.33\ \text{mm}$.`,
    hints: ["Each thimble division is 0.01 mm.", "A positive zero error must be subtracted."] });

  q.fib({ d: 2, skill: "RECALL",
    stem: "Complete the volume conversions.",
    template: "1 litre = {{blank:a}} cm³, and 1 ml = {{blank:b}} cm³.",
    blanks: [{ id: "a", input: "number", accepted: [1000], wrong: "100" }, { id: "b", input: "number", accepted: [1], wrong: "1000" }],
    explanation: t`$1\ \text{litre} = 1000\ \text{cm}^3$, and a millilitre is one thousandth of a litre, so $1\ \text{ml} = 1\ \text{cm}^3$.` });

  q.match({ d: 2, skill: "RECALL",
    stem: "Match each measurement with the most suitable instrument.",
    pairs: [
      ["The length of a laboratory bench", "Metre rule"],
      ["The volume of 40 ml of water", "Measuring cylinder"],
      ["The time for 10 swings of a pendulum", "Stop-watch"],
      ["The mass of a stone", "Balance"],
      ["The temperature of a cup of tea", "Thermometer"],
    ],
    explanation: "Each instrument measures one quantity: length (rule), volume of a liquid (measuring cylinder), time (stop-watch), mass (balance), temperature (thermometer)." });

  q.short({ d: 2, skill: "RECALL", daily: true,
    stem: "What name is given to the error caused by reading a scale with your eye not directly in line with the mark?",
    accepted: ["parallax", "parallax error"], wrong: ["zero error"],
    explanation: "Viewing a scale from an angle makes the pointer or liquid level appear against the wrong mark: a parallax error." });

  const runs = [15.2, 15.6, 15.4];
  const avg = runs.reduce((s, x) => s + x, 0) / runs.length;
  q.num({ d: 3, skill: "APPLICATION",
    stem: t`A learner times 10 oscillations of a pendulum three times: $15.2\ \text{s}$, $15.6\ \text{s}$ and $15.4\ \text{s}$. Calculate the period of the pendulum.`,
    value: r(avg / 10), answer: "1.54", unit: "s", wrong: [r(avg), 4.62, 0.513],
    explanation: t`Average time for 10 oscillations $= \dfrac{15.2 + 15.6 + 15.4}{3} = 15.4\ \text{s}$; period $= \dfrac{15.4}{10} = 1.54\ \text{s}$.`,
    workedSolution: steps(t`1. Mean of the three readings $= \dfrac{46.2}{3} = 15.4\ \text{s}$.`, t`2. Period $= \dfrac{15.4\ \text{s}}{10} = 1.54\ \text{s}$.`),
    hints: ["Average the three readings first.", "Then divide by the number of oscillations in each reading."] });

  q.mcq({ d: 2, skill: "UNDERSTANDING",
    stem: "When timing a swinging pendulum, why is it best to start and stop the watch as the bob passes the centre of its swing?",
    options: [
      ["The bob is moving fastest there, so the moment it passes is easiest to judge.", "Correct."],
      ["The bob stops there for a moment.", "The bob is momentarily at rest at the ends of the swing, not the centre."],
      ["The period is shorter at the centre.", "The period does not depend on where you time from."],
      ["It makes the pendulum swing for longer.", "Where you time from has no effect on the pendulum."],
    ], answer: "A",
    explanation: "At the centre the bob moves fastest, so the instant it passes a fixed marker is sharp. At the ends it slows and lingers, making the turning point hard to judge." });

  q.struct({ d: 4, skill: "APPLICATION", examStyle: true,
    stem: t`A learner wants to find the thickness of one sheet of paper in a book whose pages are numbered 1 to 300. Each sheet carries two page numbers. She has a $30\ \text{cm}$ ruler marked in millimetres.`,
    parts: [
      P.manual({ label: "(a)", marks: 3, stem: "Describe how she should measure the thickness of one sheet as accurately as possible with the ruler.",
        points: ["Squeezes the pages of the book together (excluding the covers) and measures the thickness of the whole block of pages with the ruler", "Counts the number of sheets: 300 pages make 150 sheets", "Divides the thickness of the block by the number of sheets (repeating and averaging if possible)"],
        explanation: "Measure many sheets together, count the sheets (not pages), and divide." }),
      P.num({ label: "(b)", marks: 2, stem: "The block of pages is $1.8\\ \\text{cm}$ thick. Calculate the thickness of one sheet in millimetres.", value: 0.12, answer: "0.12", unit: "mm", wrong: [0.06, 0.006, 0.012],
        explanation: t`$1.8\ \text{cm} = 18\ \text{mm}$; 300 pages are 150 sheets; $\dfrac{18}{150} = 0.12\ \text{mm}$.` }),
      P.mcq({ label: "(c)", stem: "Why can she not measure one sheet directly with the ruler?", options: [["The ruler's smallest division (1 mm) is much larger than the thickness of one sheet.", "Correct."], ["Paper is transparent.", "This does not stop a measurement."], ["The ruler has a zero error.", "A zero error can be corrected; the problem is the precision."], ["A sheet is too long.", "Its length is not the problem."]], answer: "A",
        explanation: "One sheet is about a tenth of a millimetre thick, far smaller than the ruler's 1 mm divisions." }),
    ],
    explanation: t`Measuring the block of 150 sheets ($18\ \text{mm}$) and dividing gives $0.12\ \text{mm}$ per sheet. A common trap is dividing by 300: pages are numbered on both sides of each sheet.`,
    hints: ["How many sheets carry pages 1 to 300?", "Convert 1.8 cm to millimetres first."] });

  q.tf({ d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Light gates connected to an electronic timer remove the reaction-time error of a hand-held stop-watch.",
    answer: true,
    explanation: "The timer starts and stops automatically when the object breaks the light beams, so no human reaction time is involved." });

  q.num({ d: 2, skill: "APPLICATION", daily: true,
    stem: t`A learner counts 50 drips from a leaking tap and finds they take $37.5\ \text{s}$. What is the time between one drip and the next?`,
    value: 37.5 / 50, answer: "0.75", unit: "s", wrong: [50 / 37.5, 37.5, 1875],
    explanation: t`$\dfrac{37.5\ \text{s}}{50} = 0.75\ \text{s}$ between drips.` });

  q.card("DEFINITION", "What is meant by the **precision** of an instrument?", "The smallest change it can show, set by its smallest scale division (a metre rule: 1 mm).");
  q.card("DEFINITION", "What is a **zero error**?", "A reading shown by an instrument when the true value is zero; it must be corrected for in every reading.");
  q.card("DEFINITION", "What is **parallax error**?", "An error caused by reading a scale with the eye not directly in line with the mark.");
  q.card("FACT", "How do you read a measuring cylinder containing water?", "At the bottom of the meniscus, with your eye level with it.");
  q.card("DEFINITION", "What is the **period** of a pendulum?", "The time for one complete oscillation (there and back).");
  q.card("CONCEPT", "How do you measure something too small or too quick to measure once?", "Measure many multiples together, then divide by the number of multiples.", "Example: time 20 oscillations, or measure a stack of washers.");
  q.card("FACT", "About how long is human reaction time with a stop-watch?", "About 0.2 s to 0.3 s at each start or stop.");
  q.card("FACT", "To what precision do Vernier callipers and a micrometer read?", "Vernier callipers: 0.1 mm. Micrometer screw gauge: 0.01 mm.", undefined, { applies: ["zimsec"] });
  q.card("CONCEPT", "Why are light gates better than a stop-watch?", "They start and stop the timer automatically, so there is no reaction-time error.");
  q.card("FACT", "How many cubic centimetres are in 1 litre?", "1000 cm³ (and 1 ml = 1 cm³).");
});

// =====================================================================================================================
concept("phys.measurement.si-units", {
  file: "measurement/si-units",
  keyPrefix: "measurement.units",
  objectives: { zimsec: ["1.1.3", "1.1.4"] },
}, (q) => {
  q.mcq({ d: 1, skill: "RECALL",
    stem: "What is the SI base unit of mass?",
    options: [["gram", "The gram is a thousandth of the base unit."], ["kilogram", "Correct."], ["newton", "The newton is the unit of force."], ["pound", "The pound is not an SI unit."]],
    answer: "B", explanation: "The SI base unit of mass is the kilogram (kg)." });

  q.mcq({ d: 1, skill: "RECALL",
    stem: "Which of these is NOT an SI base unit?",
    options: [["metre", "A base unit (length)."], ["second", "A base unit (time)."], ["newton", "Correct: the newton is derived, 1 N = 1 kg m/s²."], ["ampere", "A base unit (electric current)."]],
    answer: "C", explanation: "The newton is a derived unit: $1\\ \\text{N} = 1\\ \\text{kg m/s}^2$." });

  q.num({ d: 2, skill: "APPLICATION", daily: true,
    stem: t`Convert $2.4\ \text{km}$ to metres.`,
    value: 2400, unit: "m", wrong: [240, 24000, 0.0024],
    explanation: t`$1\ \text{km} = 1000\ \text{m}$, so $2.4\ \text{km} = 2.4 \times 1000 = 2400\ \text{m}$.` });

  q.num({ d: 2, skill: "APPLICATION", daily: true,
    stem: t`A packet of sugar has a mass of $650\ \text{g}$. What is its mass in kilograms?`,
    value: 0.65, answer: "0.65", unit: "kg", tol: 0.001, wrong: [650000, 6.5, 65],
    explanation: t`$650\ \text{g} = 650 \times 10^{-3}\ \text{kg} = 0.65\ \text{kg}$.` });

  q.num({ d: 2, skill: "APPLICATION",
    stem: t`Convert a speed of $72\ \text{km/h}$ into metres per second.`,
    value: 20, unit: "m/s", wrong: [259.2, 72, 2],
    explanation: t`Divide by 3.6: $72 \div 3.6 = 20\ \text{m/s}$ (because $1\ \text{km/h} = \dfrac{1000\ \text{m}}{3600\ \text{s}}$).` });

  q.num({ d: 3, skill: "APPLICATION",
    stem: t`A classroom notice board has an area of $3.5\ \text{m}^2$. What is its area in $\text{cm}^2$?`,
    value: 35000, unit: "cm²", wrong: [350, 3500, 3500000],
    explanation: t`$1\ \text{m}^2 = 100 \times 100 = 10\,000\ \text{cm}^2$, so $3.5\ \text{m}^2 = 35\,000\ \text{cm}^2$.`,
    hints: ["1 m = 100 cm, so 1 m² = 100 × 100 cm²."] });

  q.num({ d: 3, skill: "APPLICATION",
    stem: t`A drinks can holds $250\ \text{cm}^3$. Express this volume in $\text{m}^3$.`,
    value: 0.00025, answer: "2.5e-4", unit: "m³", tol: 0.000001, wrong: [0.025, 2.5, 0.0025],
    explanation: t`$1\ \text{m}^3 = 10^6\ \text{cm}^3$, so $250\ \text{cm}^3 = 250 \times 10^{-6} = 2.5 \times 10^{-4}\ \text{m}^3$.`,
    hints: ["1 m³ = 100 × 100 × 100 cm³."] });

  q.mcq({ d: 3, skill: "ANALYSIS",
    stem: "Pressure is force per unit area. Which combination of base units is equivalent to the pascal?",
    hints: ["Write the newton in base units first, then divide by m²."],
    options: [["kg m s⁻²", "This is the newton (force), not pressure."], ["kg m⁻¹ s⁻²", "Correct: N/m² = (kg m s⁻²)/m² = kg m⁻¹ s⁻²."], ["kg m² s⁻²", "This is the joule."], ["kg m⁻²", "The seconds are missing."]],
    answer: "B", explanation: t`$1\ \text{Pa} = \dfrac{1\ \text{N}}{1\ \text{m}^2} = \dfrac{\text{kg m s}^{-2}}{\text{m}^2} = \text{kg m}^{-1}\ \text{s}^{-2}$.` });

  q.match({ d: 2, skill: "RECALL",
    stem: "Match each quantity with its SI unit.",
    pairs: [["Force", "newton (N)"], ["Energy", "joule (J)"], ["Power", "watt (W)"], ["Pressure", "pascal (Pa)"], ["Frequency", "hertz (Hz)"]],
    explanation: "Force: newton; energy: joule; power: watt; pressure: pascal; frequency: hertz." });

  q.fib({ d: 2, skill: "RECALL",
    stem: "Complete the prefix conversions.",
    template: "1 MW = {{blank:a}} W, and 1 mA = {{blank:b}} A.",
    blanks: [{ id: "a", input: "number", accepted: [1000000], wrong: "1000" }, { id: "b", input: "number", accepted: [0.001], wrong: "1000" }],
    explanation: t`Mega means $10^6$, so $1\ \text{MW} = 1\,000\,000\ \text{W}$; milli means $10^{-3}$, so $1\ \text{mA} = 0.001\ \text{A}$.` });

  q.short({ d: 3, skill: "APPLICATION",
    stem: t`Write $0.000\,45\ \text{m}$ in standard form.`,
    accepted: ["4.5 × 10^-4", "4.5 x 10^-4", "4.5 × 10^-4 m", "4.5 x 10^-4 m", "4.5e-4", "4.5 × 10⁻⁴", "4.5 × 10⁻⁴ m"],
    normalise: ["trim", "lowercase", "remove_whitespace"],
    wrong: ["45 × 10^-5", "4.5 × 10^4"],
    explanation: t`Move the decimal point 4 places to the right to get 4.5, so $0.000\,45 = 4.5 \times 10^{-4}\ \text{m}$.`,
    hints: ["Standard form is A × 10ⁿ with A between 1 and 10."] });

  q.mcq({ d: 3, skill: "ANALYSIS",
    stem: "Which equation has the same units on both sides?",
    hints: ["Write the units of each side of each equation."],
    options: [["speed = distance × time", "m × s is not m/s."], ["force = mass ÷ acceleration", "kg ÷ (m/s²) is not kg m/s²."], ["power = energy × time", "J × s is not J/s."], ["work done = force × distance", "Correct: N × m = J."]],
    answer: "D", explanation: "Work done = force × distance gives N m, which is the joule, the unit of work. The others are not homogeneous." });

  q.tf({ d: 2, skill: "RECALL", daily: true,
    stem: "The gram is the SI base unit of mass.",
    answer: false, explanation: "The SI base unit of mass is the kilogram; a gram is $10^{-3}$ kg." });

  q.num({ d: 3, skill: "APPLICATION",
    stem: t`A human hair is about $80\ \mu\text{m}$ thick. What is this in metres?`,
    hints: ["Micro means × 10⁻⁶."],
    value: 0.00008, answer: "8.0e-5", unit: "m", tol: 0.0000001, wrong: [0.08, 0.008, 0.0008],
    explanation: t`Micro means $10^{-6}$: $80 \times 10^{-6}\ \text{m} = 8.0 \times 10^{-5}\ \text{m}$.` });

  q.struct({ d: 3, skill: "UNDERSTANDING", examStyle: true,
    stem: "Derived units can be expressed in base units.",
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "Starting from work done = force × distance and force = mass × acceleration, show that $1\\ \\text{J} = 1\\ \\text{kg m}^2/\\text{s}^2$.",
        points: ["States 1 N = 1 kg m/s² from F = ma", "Multiplies by metres: 1 J = 1 N × 1 m = 1 kg m²/s²"],
        explanation: t`$1\ \text{J} = 1\ \text{N m} = (1\ \text{kg m/s}^2) \times 1\ \text{m} = 1\ \text{kg m}^2/\text{s}^2$.` }),
      P.mcq({ label: "(b)", stem: "Power is energy transferred per unit time. Which is the unit of power in base units?", options: [["kg m² s⁻³", "Correct: J/s = kg m² s⁻² ÷ s."], ["kg m² s⁻²", "This is the joule."], ["kg m s⁻²", "This is the newton."], ["kg m² s⁻¹", "Divide by s once more."]], answer: "A",
        explanation: t`$1\ \text{W} = 1\ \text{J/s} = \text{kg m}^2\ \text{s}^{-3}$.` }),
    ],
    explanation: "Replace each quantity by its unit in the defining equation, one step at a time.",
    hints: ["Write the unit of force in base units first."] });

  q.mcq({ d: 2, skill: "APPLICATION",
    stem: "A mobile network transmits at a frequency of 1.8 GHz. What is this frequency in hertz?",
    options: [["1.8 × 10³ Hz", "That would be kHz."], ["1.8 × 10⁶ Hz", "That would be MHz."], ["1.8 × 10⁹ Hz", "Correct: giga = 10⁹."], ["1.8 × 10¹² Hz", "That would be THz."]],
    answer: "C", explanation: "Giga means 10⁹, so 1.8 GHz = 1.8 × 10⁹ Hz." });

  q.card("FACT", "Name five SI base units.", "Kilogram (mass), metre (length), second (time), ampere (current), kelvin (temperature).", "The mole is also a base unit.");
  q.card("FACT", "What do the prefixes **kilo**, **mega** and **giga** mean?", "kilo × 10³, mega × 10⁶, giga × 10⁹.");
  q.card("FACT", "What do the prefixes **milli**, **micro** and **nano** mean?", "milli × 10⁻³, micro × 10⁻⁶, nano × 10⁻⁹.");
  q.card("FORMULA", "What is 1 newton in base units?", "1 N = 1 kg m/s².");
  q.card("FORMULA", "What is 1 joule in other units?", "1 J = 1 N m = 1 kg m²/s².");
  q.card("FORMULA", "What is 1 watt? What is 1 pascal?", "1 W = 1 J/s; 1 Pa = 1 N/m².");
  q.card("FACT", "How many cm² are in 1 m²? How many cm³ in 1 m³?", "1 m² = 10 000 cm²; 1 m³ = 1 000 000 cm³.");
  q.card("CONCEPT", "What is standard form?", "A number written as A × 10ⁿ with 1 ≤ A < 10, e.g. 3.0 × 10⁸.");
  q.card("CONCEPT", "What does it mean for an equation to be homogeneous?", "Both sides have the same units; if they do not, the equation is wrong.");
  q.card("CONCEPT", "How do you convert km/h to m/s?", "Divide by 3.6 (and multiply by 3.6 to go back).");
});

// =====================================================================================================================
concept("phys.measurement.scalars-vectors", {
  file: "measurement/scalars-vectors",
  keyPrefix: "measurement.vectors",
  objectives: { cambridge: ["1.1.4", "1.1.7"], zimsec: ["1.2.1", "1.2.2"] },
}, (q) => {
  q.mcq({ d: 1, skill: "RECALL",
    stem: "Which of these quantities is a vector?",
    options: [["speed", "Speed has no direction: a scalar."], ["mass", "A scalar."], ["velocity", "Correct: speed in a given direction."], ["energy", "A scalar."]],
    answer: "C", explanation: "Velocity has magnitude and direction, so it is a vector." });

  q.mcq({ d: 1, skill: "RECALL",
    stem: "Which of these quantities is a scalar?",
    options: [["force", "A vector."], ["temperature", "Correct: it has size only."], ["acceleration", "A vector."], ["displacement", "A vector."]],
    answer: "B", explanation: "Temperature has magnitude only, so it is a scalar." });

  q.mcq({ d: 2, skill: "RECALL", multiple: true,
    stem: "Select **all** the vector quantities.",
    options: [["momentum", "Vector."], ["distance", "Scalar."], ["weight", "Vector: it is a force."], ["time", "Scalar."], ["gravitational field strength", "Vector."], ["speed", "Scalar: speed has no direction."]],
    answer: ["A", "C", "E"],
    explanation: "Momentum, weight (a force) and gravitational field strength all have direction; distance and time do not." });

  q.tf({ d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Weight is a scalar quantity because it is measured in newtons.",
    answer: false, explanation: "Weight is a force, and every force acts in a direction (downwards for weight), so weight is a vector." });

  q.num({ d: 2, skill: "APPLICATION", daily: true,
    stem: t`Two learners push a stalled car in the same direction with forces of $140\ \text{N}$ and $90\ \text{N}$. What is the resultant force?`,
    value: 230, unit: "N", wrong: [50, 166, 12600],
    explanation: t`Forces in the same direction add: $140 + 90 = 230\ \text{N}$ in that direction.` });

  q.num({ d: 2, skill: "APPLICATION",
    stem: t`In a tug of war one team pulls east with $1400\ \text{N}$ and the other pulls west with $1250\ \text{N}$. What is the size of the resultant force?`,
    value: 150, unit: "N", wrong: [2650, 1325, 1875],
    explanation: t`Opposite forces subtract: $1400 - 1250 = 150\ \text{N}$, towards the east (the larger force).` });

  q.num({ d: 3, skill: "APPLICATION", daily: true,
    stem: t`Two forces of $5.0\ \text{N}$ and $12\ \text{N}$ act on a point at right angles to each other. Calculate the size of the resultant force.`,
    value: 13, unit: "N", wrong: [17, 7, 60],
    explanation: t`At right angles: $\sqrt{5.0^2 + 12^2} = \sqrt{169} = 13\ \text{N}$.`,
    hints: ["Use Pythagoras' theorem."] });

  q.num({ d: 3, skill: "APPLICATION",
    stem: t`A force of $5.0\ \text{N}$ acts due east and a force of $12\ \text{N}$ acts due north on the same object. Calculate the angle between the resultant and due east.`,
    hints: ["Use tan θ = opposite ÷ adjacent, with east as the adjacent side."],
    value: r(Math.atan(12 / 5) * 180 / Math.PI), unit: "°", tol: 0.5, wrong: [22.6, 45],
    explanation: t`$\tan\theta = \dfrac{12}{5.0}$, so $\theta = \tan^{-1}(2.4) = 67.4^\circ$ north of east.`,
    workedSolution: steps(t`1. Opposite (north) $= 12\ \text{N}$, adjacent (east) $= 5.0\ \text{N}$.`, t`2. $\tan\theta = 12/5.0 = 2.4$.`, t`3. $\theta = 67.4^\circ$ north of east.`) });

  q.struct({ d: 4, skill: "APPLICATION", examStyle: true,
    stem: t`An aircraft heads due north with an airspeed of $70\ \text{m/s}$. A wind blows due east at $15\ \text{m/s}$.`,
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the resultant speed of the aircraft relative to the ground.", value: r(Math.hypot(70, 15)), unit: "m/s", wrong: [85, 55],
        explanation: t`$\sqrt{70^2 + 15^2} = \sqrt{5125} = 71.6\ \text{m/s}$.` }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the angle between the aircraft's actual path and due north.", value: r(Math.atan(15 / 70) * 180 / Math.PI), unit: "°", tol: 0.5, wrong: [77.9, 45],
        explanation: t`$\tan\theta = \dfrac{15}{70}$, so $\theta = 12.1^\circ$ east of north.` }),
    ],
    explanation: t`The velocities are at right angles: resultant $= \sqrt{70^2 + 15^2} = 71.6\ \text{m/s}$ at $\tan^{-1}(15/70) = 12.1^\circ$ east of north.`,
    hints: ["Sketch the two velocities nose to tail.", "The angle from north uses tan θ = east ÷ north."] });

  q.mcq({ d: 2, skill: "APPLICATION",
    stem: "Forces of 6 N and 8 N act at right angles. What is the size of the resultant?",
    options: [["2 N", "This would be for opposite directions."], ["10 N", "Correct: √(36 + 64) = 10 N."], ["14 N", "This would be for the same direction."], ["48 N", "Forces are not multiplied."]],
    answer: "B", explanation: "√(6² + 8²) = √100 = 10 N." });

  q.fib({ d: 1, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "Speed is a {{blank:a}} quantity, and velocity is a {{blank:b}} quantity.",
    blanks: [{ id: "a", input: "select", choices: ["scalar", "vector"], accepted: ["scalar"], wrong: "vector" }, { id: "b", input: "select", choices: ["scalar", "vector"], accepted: ["vector"], wrong: "scalar" }],
    explanation: "Speed has size only (scalar); velocity is speed in a given direction (vector)." });

  q.short({ d: 2, skill: "RECALL",
    stem: "What name is given to the single force that has the same effect as two or more forces acting together?",
    accepted: ["resultant", "resultant force", "the resultant", "net force"], wrong: ["component"],
    explanation: "The resultant (net) force replaces all the forces acting together." });

  q.mcq({ d: 3, skill: "UNDERSTANDING",
    stem: "A girl walks 30 m north and then 30 m south along the same path. What is her displacement from the start?",
    hints: ["Displacement compares where she finishes with where she started."],
    options: [["0 m", "Correct: she is back where she started."], ["30 m north", "She came back."], ["60 m", "This is the distance walked, not the displacement."], ["42 m north-east", "The walks are along one line."]],
    answer: "A", explanation: "Displacement is the straight-line change in position with direction. She returns to the start, so her displacement is zero, although the distance walked is 60 m." });

  q.struct({ d: 4, skill: "APPLICATION", examStyle: true,
    stem: t`Two ropes pull a log: one with $40\ \text{N}$ due east and the other with $30\ \text{N}$ due north. A learner finds the resultant by scale drawing.`,
    hints: ["Draw the arrows nose to tail.","Check your drawing with Pythagoras."],
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "Describe how she draws the vector diagram.",
        points: ["Chooses a suitable scale (e.g. 1 cm to 5 N) and draws the 40 N arrow east to scale", "Draws the 30 N arrow north from the head of the first and joins tail to head to give the resultant, measuring its length and angle"] }),
      P.num({ label: "(b)", marks: 1, stem: "What size should the resultant be?", value: 50, unit: "N", wrong: [70, 10],
        explanation: t`$\sqrt{40^2 + 30^2} = 50\ \text{N}$.` }),
      P.num({ label: "(c)", marks: 1, stem: "What angle does the resultant make with due east?", value: r(Math.atan(30 / 40) * 180 / Math.PI), unit: "°", tol: 0.5, wrong: [53.1, 45],
        explanation: t`$\tan\theta = 30/40$, $\theta = 36.9^\circ$ north of east.` }),
    ],
    explanation: t`Nose-to-tail scale drawing; the resultant is $50\ \text{N}$ at $36.9^\circ$ north of east.` });

  q.tf({ d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Two forces of 3 N and 4 N acting on the same object can have a resultant of 1 N.",
    answer: true, explanation: "If they act in opposite directions along one line, the resultant is 4 − 3 = 1 N. The resultant can be anything from 1 N to 7 N depending on the angle." });

  q.mcq({ d: 3, skill: "APPLICATION",
    stem: "A swimmer aims straight across a river, swimming at 1.2 m/s relative to the water. The river flows at 0.50 m/s. What is her speed relative to the bank?",
    hints: ["The two velocities are at right angles: use Pythagoras."],
    options: [["0.70 m/s", "Subtracting is only for opposite directions."], ["1.3 m/s", "Correct: √(1.2² + 0.50²) = 1.3 m/s."], ["1.7 m/s", "Adding is only for the same direction."], ["0.60 m/s", "Velocities are not multiplied."]],
    answer: "B", explanation: "The two velocities are at right angles: √(1.44 + 0.25) = √1.69 = 1.3 m/s." });

  q.card("DEFINITION", "What is a **scalar**?", "A quantity with magnitude (size) only, e.g. mass, speed, energy.");
  q.card("DEFINITION", "What is a **vector**?", "A quantity with magnitude and direction, e.g. force, velocity, momentum.");
  q.card("FACT", "Name four vector quantities.", "Displacement, velocity, acceleration, force (also weight, momentum, field strength).");
  q.card("FACT", "Name four scalar quantities.", "Distance, speed, time, mass (also energy, temperature).");
  q.card("DEFINITION", "What is a **resultant**?", "The single vector with the same effect as two or more vectors acting together.");
  q.card("CONCEPT", "How do you add two vectors along the same line?", "Add if they point the same way; subtract if opposite; the resultant points the way of the larger.");
  q.card("FORMULA", "Resultant of two perpendicular vectors a and b?", "Magnitude √(a² + b²); angle from tan θ = opposite ÷ adjacent.");
  q.card("CONCEPT", "What does 'nose to tail' mean in a vector diagram?", "Draw the second arrow starting where the first ends; the resultant joins the tail of the first to the head of the second.");
  q.card("CONCEPT", "What is the difference between distance and displacement?", "Distance is the path length (scalar); displacement is the straight-line change in position with direction (vector).");
});

// =====================================================================================================================
concept("phys.matter.density", {
  file: "measurement/density",
  keyPrefix: "matter.density",
  objectives: { cambridge: ["1.4.1", "1.4.2", "1.4.3"], zimsec: ["1.1.2"] },
}, (q) => {
  q.mcq({ d: 1, skill: "RECALL",
    stem: "Which equation defines density?",
    options: [["density = mass × volume", "Mass is divided, not multiplied."], ["density = mass ÷ volume", "Correct."], ["density = volume ÷ mass", "Upside down."], ["density = weight ÷ area", "That is pressure."]],
    answer: "B", explanation: "Density is mass per unit volume: ρ = m/V." });

  q.num({ d: 2, skill: "APPLICATION", daily: true,
    stem: t`A metal block measures $5.0\ \text{cm} \times 4.0\ \text{cm} \times 2.0\ \text{cm}$ and has a mass of $108\ \text{g}$. Calculate its density.`,
    value: 2.7, answer: "2.7", unit: "g/cm³", wrong: [4320, 0.37, 10.8],
    explanation: t`$V = 5.0 \times 4.0 \times 2.0 = 40\ \text{cm}^3$; $\rho = \dfrac{108}{40} = 2.7\ \text{g/cm}^3$ (the density of aluminium).`,
    workedSolution: steps(t`1. $V = 5.0 \times 4.0 \times 2.0 = 40\ \text{cm}^3$.`, t`2. $\rho = \dfrac{m}{V} = \dfrac{108\ \text{g}}{40\ \text{cm}^3} = 2.7\ \text{g/cm}^3$.`) });

  q.num({ d: 2, skill: "APPLICATION", daily: true,
    stem: t`Ethanol has a density of $0.79\ \text{g/cm}^3$. What is its density in $\text{kg/m}^3$?`,
    value: 790, unit: "kg/m³", wrong: [0.00079, 7.9, 79],
    explanation: t`$1\ \text{g/cm}^3 = 1000\ \text{kg/m}^3$, so $0.79\ \text{g/cm}^3 = 790\ \text{kg/m}^3$.` });

  q.num({ d: 3, skill: "APPLICATION",
    stem: t`Copper has a density of $8900\ \text{kg/m}^3$. What is the mass of a copper bar of volume $0.0025\ \text{m}^3$?`,
    value: 22.25, answer: "22", unit: "kg", wrong: [3560000, 0.00000028, 2225],
    explanation: t`$m = \rho V = 8900 \times 0.0025 = 22.25\ \text{kg}$, about $22\ \text{kg}$.`,
    hints: ["Rearrange ρ = m/V to m = ρV."] });

  q.num({ d: 3, skill: "APPLICATION",
    stem: t`Petrol has a density of $750\ \text{kg/m}^3$. What volume, in $\text{m}^3$, does $3.0\ \text{kg}$ of petrol occupy?`,
    hints: ["Rearrange ρ = m/V to V = m/ρ."],
    value: 0.004, answer: "0.004", unit: "m³", tol: 0.00005, wrong: [2250, 250, 0.4],
    explanation: t`$V = \dfrac{m}{\rho} = \dfrac{3.0}{750} = 0.0040\ \text{m}^3$ (4.0 litres).` });

  q.num({ d: 2, skill: "APPLICATION",
    stem: t`A brass key of mass $102\ \text{g}$ is lowered into a measuring cylinder of water. The water level rises from $35\ \text{cm}^3$ to $47\ \text{cm}^3$. Calculate the density of brass.`,
    value: 8.5, unit: "g/cm³", wrong: [2.17, 2.91, 1224],
    explanation: t`Volume of key $= 47 - 35 = 12\ \text{cm}^3$; $\rho = \dfrac{102}{12} = 8.5\ \text{g/cm}^3$.`,
    hints: ["The volume of the key is the rise in the water level."] });

  q.mcq({ d: 2, skill: "UNDERSTANDING",
    stem: "Water has a density of 1000 kg/m³. Which solid block will float on water?",
    options: [["Ice, 920 kg/m³", "Correct: less dense than water."], ["Aluminium, 2700 kg/m³", "Denser than water: it sinks."], ["Glass, 2500 kg/m³", "Denser than water: it sinks."], ["Ebony wood, 1200 kg/m³", "Denser than water: this wood sinks."]],
    answer: "A", explanation: "An object floats if its density is less than that of the liquid. Only ice (920 kg/m³) is less dense than water." });

  q.tf({ d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A large log floating in a dam weighs more than a small stone that sinks, so floating does not depend on mass.",
    answer: true, explanation: "Floating depends on density (mass per unit volume), not on mass alone. The log is less dense than water; the stone is denser." });

  q.mcq({ d: 3, skill: "APPLICATION",
    stem: "Paraffin (800 kg/m³), water (1000 kg/m³) and glycerol (1260 kg/m³) do not mix. They are poured into one tall jar. In what order do they settle, from top to bottom?",
    hints: ["The least dense liquid rises to the top."],
    options: [["paraffin, water, glycerol", "Correct: least dense on top."], ["glycerol, water, paraffin", "The densest liquid sinks to the bottom."], ["water, paraffin, glycerol", "Paraffin is less dense than water."], ["paraffin, glycerol, water", "Glycerol is denser than water."]],
    answer: "A", explanation: "Liquids that do not mix settle in order of density, the least dense on top: paraffin, then water, then glycerol." });

  q.struct({ d: 4, skill: "APPLICATION", examStyle: true,
    stem: t`To find the density of sea water, a learner measures an empty beaker as $85.6\ \text{g}$. She adds $40.0\ \text{cm}^3$ of sea water from a measuring cylinder and the beaker and water have a mass of $126.8\ \text{g}$.`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "Calculate the mass of the sea water.", value: 41.2, answer: "41.2", unit: "g", tol: 0.05, wrong: [126.8, 212.4] , explanation: t`$126.8 - 85.6 = 41.2\ \text{g}$.` }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the density of the sea water.", value: 1.03, answer: "1.03", unit: "g/cm³", tol: 0.005, wrong: [3.17, 0.97],
        explanation: t`$\rho = \dfrac{41.2}{40.0} = 1.03\ \text{g/cm}^3$.` }),
      P.manual({ label: "(c)", marks: 2, stem: "Cooking oil has a density of $0.93\\ \\text{g/cm}^3$ and does not mix with sea water. Explain what happens when oil is poured onto sea water.",
        points: ["The oil floats on top of the sea water", "because the oil is less dense than the sea water (0.93 < 1.03 g/cm³)"] }),
    ],
    explanation: t`Mass by difference: $41.2\ \text{g}$; density $= 41.2/40.0 = 1.03\ \text{g/cm}^3$. Oil, being less dense, floats on top.`,
    hints: ["The mass of the liquid is the difference between the two balance readings."] });

  q.mcq({ d: 2, skill: "RECALL",
    stem: "Which method finds the volume of an irregularly shaped stone?",
    options: [["Measure its length, width and height with a ruler", "This works only for regular shapes."], ["Lower it into water in a measuring cylinder and find the rise in level", "Correct: displacement."], ["Weigh it on a balance", "This gives its mass, not its volume."], ["Drop it from a height and time its fall", "This has nothing to do with volume."]],
    answer: "B", explanation: "The stone displaces its own volume of water, so the rise in level is its volume." });

  q.fib({ d: 1, skill: "RECALL",
    stem: "Complete the conversion.",
    template: "A density of 1 g/cm³ is equal to {{blank:a}} kg/m³.",
    blanks: [{ id: "a", input: "number", accepted: [1000], wrong: "100" }],
    explanation: "1 g/cm³ = 1000 kg/m³: a kilogram is 1000 g, and a cubic metre is 1 000 000 cm³." });

  q.struct({ d: 3, skill: "EVALUATION",
    stem: t`A trader sells a ring that he says is pure gold (density $19.3\ \text{g/cm}^3$). The ring has a mass of $9.5\ \text{g}$ and a volume of $0.50\ \text{cm}^3$.`,
    hints: ["Density = mass ÷ volume.","Compare your answer with 19.3 g/cm³."],
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "Calculate the density of the ring.", value: 19, unit: "g/cm³", tol: 0.05, wrong: [4.75, 0.053], explanation: t`$\dfrac{9.5}{0.50} = 19\ \text{g/cm}^3$.` }),
      P.mcq({ label: "(b)", stem: "Could the ring be pure gold?", options: [["Yes: its density is very close to that of gold.", "Correct: 19 g/cm³ agrees with 19.3 g/cm³ within the precision of the measurements."], ["No: gold is less dense than 19 g/cm³.", "Gold is 19.3 g/cm³."], ["No: rings are always alloys.", "This cannot be decided without the density."], ["It cannot be decided from density.", "Density is exactly how jewellers check it."]], answer: "A",
        explanation: "The measured density, 19 g/cm³, agrees with 19.3 g/cm³ to the precision of the measurements." }),
    ],
    explanation: "Density identifies the material: 9.5 g ÷ 0.50 cm³ = 19 g/cm³, consistent with gold." });

  q.mcq({ d: 3, skill: "UNDERSTANDING",
    stem: "A ship is made of steel (7800 kg/m³), yet it floats. Why?",
    hints: ["Think about what fills most of the inside of the hull."],
    options: [["Steel becomes less dense in water.", "The density of steel does not change."], ["The average density of the ship, including the air inside, is less than that of water.", "Correct."], ["The engines push it up.", "Engines push it forwards."], ["Sea water is denser than steel.", "Sea water is about 1030 kg/m³."]],
    answer: "B", explanation: "The hull encloses a large volume of air, so the whole ship's mass ÷ volume is less than the density of water." });

  const vol = 0.36 / 2500;
  q.num({ d: 4, skill: "APPLICATION",
    stem: t`A stone of mass $0.36\ \text{kg}$ and density $2500\ \text{kg/m}^3$ is lowered into a displacement (eureka) can filled to the spout. What volume of water, in $\text{cm}^3$, flows out of the spout?`,
    value: r(vol * 1e6), unit: "cm³", wrong: [900, 0.000144, 6944],
    explanation: t`$V = \dfrac{m}{\rho} = \dfrac{0.36}{2500} = 1.44 \times 10^{-4}\ \text{m}^3 = 144\ \text{cm}^3$, so $144\ \text{cm}^3$ of water overflows.`,
    hints: ["Find the stone's volume in m³ first.", "1 m³ = 1 000 000 cm³."] });

  q.struct({ d: 3, skill: "APPLICATION", examStyle: true,
    stem: t`A learner finds the density of an irregular piece of granite from a quarry near Mutoko.`,
    hints: ["The volume of the granite is the rise in the water level.","Density = mass ÷ volume."],
    parts: [
      P.manual({ label: "(a)", marks: 3, stem: "Describe how she finds the volume of the granite.",
        points: ["Part-fills a measuring cylinder with water and reads the level (bottom of the meniscus, eye level)", "Lowers the granite gently into the water on a thread so it is fully covered", "Reads the new level; the volume of granite is the difference between the two readings"] }),
      P.num({ label: "(b)", marks: 2, stem: t`The granite has a mass of $78\ \text{g}$ and its volume is $30\ \text{cm}^3$. Calculate its density.`, value: 2.6, unit: "g/cm³", wrong: [0.385, 2340], explanation: t`$\dfrac{78}{30} = 2.6\ \text{g/cm}^3$.` }),
    ],
    explanation: "Volume by displacement, mass on a balance, then density = mass ÷ volume." });

  q.card("DEFINITION", "Define **density**.", "Mass per unit volume of a substance.");
  q.card("FORMULA", "What is the equation for density?", "ρ = m / V (density = mass ÷ volume).");
  q.card("FACT", "What are the units of density?", "kg/m³ (SI) or g/cm³; 1 g/cm³ = 1000 kg/m³.");
  q.card("FACT", "What is the density of water?", "About 1000 kg/m³ (1.0 g/cm³).");
  q.card("CONCEPT", "How do you find the volume of an irregular solid that sinks?", "By displacement: the rise in water level in a measuring cylinder (or the water that overflows a eureka can).");
  q.card("CONCEPT", "How do you find the mass of a liquid?", "Weigh the empty container, add the liquid, weigh again, and subtract.");
  q.card("CONCEPT", "When does an object float in a liquid?", "When its density is less than the density of the liquid.");
  q.card("CONCEPT", "Two liquids that do not mix are poured together. Which floats?", "The less dense liquid floats on top.");
  q.card("CONCEPT", "Why does a steel ship float?", "Its average density (steel plus the air inside the hull) is less than that of water.");
});
