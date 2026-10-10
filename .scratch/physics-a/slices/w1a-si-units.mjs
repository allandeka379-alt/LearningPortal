// W1a: measurement.si-units — base units, derived units, homogeneity, prefixes, estimates.
import { concept, P, t as raw, chk, sfStr, sciTex, sciPlain, pctUnc } from "../lib.mjs";

// String.raw keeps "\n" literally: turn \n (not followed by a lower-case letter, so \nu and \neq survive) into a newline.
const t = (s, ...v) => raw(s, ...v).replace(/\\n(?![a-z])/g, "\n");

const K = "aphys.measurement.si-units";

concept(K, { file: "measurement/si-units", keyPrefix: "measurement.si-units" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which of these is **not** an SI base unit?",
    options: [
      ["newton", "Correct: the newton is derived from F = ma, 1 N = 1 kg m s⁻²."],
      ["kelvin", "The kelvin is the base unit of thermodynamic temperature."],
      ["ampere", "The ampere is the base unit of electric current."],
      ["mole", "The mole is the base unit of amount of substance."],
    ],
    answer: "A",
    explanation: "The base units used in this course are the kilogram, metre, second, ampere, kelvin and mole. The newton, joule, watt, pascal, coulomb, volt and ohm are all derived units.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What is the joule expressed in SI base units?",
    options: [
      [t`$\text{kg m}^2\ \text{s}^{-2}$`, "Correct: J = N m = (kg m s⁻²)(m)."],
      [t`$\text{kg m s}^{-2}$`, "This is the newton; work also multiplies by a distance."],
      [t`$\text{kg m}^2\ \text{s}^{-3}$`, "This is the watt: a joule per second."],
      [t`$\text{kg m s}^{-1}$`, "This is the unit of momentum, mass times velocity."],
    ],
    answer: "A",
    explanation: t`Work $=$ force $\times$ distance, so $\text{J} = \text{N m} = \text{kg m s}^{-2} \times \text{m} = \text{kg m}^2\ \text{s}^{-2}$.`,
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is the pascal expressed in SI base units?",
    options: [
      [t`$\text{kg m}^{-1}\ \text{s}^{-2}$`, "Correct: Pa = N m⁻² = kg m s⁻² ÷ m²."],
      [t`$\text{kg m s}^{-2}$`, "This is the newton; pressure divides the force by an area."],
      [t`$\text{kg m}^{-2}\ \text{s}^{-2}$`, "Dividing kg m s⁻² by m² leaves m⁻¹, not m⁻²."],
      [t`$\text{kg m}^{3}\ \text{s}^{-2}$`, "This multiplies by the area instead of dividing by it."],
    ],
    answer: "A",
    explanation: t`$p = F/A$, so $\text{Pa} = \dfrac{\text{kg m s}^{-2}}{\text{m}^2} = \text{kg m}^{-1}\ \text{s}^{-2}$.`,
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: t`What is $1\ \text{mm}^2$ in $\text{m}^2$?`,
    options: [
      [t`$10^{-6}\ \text{m}^2$`, "Correct: (10⁻³ m)² = 10⁻⁶ m²."],
      [t`$10^{-3}\ \text{m}^2$`, "The prefix factor must be squared along with the metre."],
      [t`$10^{-9}\ \text{m}^2$`, "This cubes the factor, which is the rule for volumes (mm³)."],
      [t`$10^{-2}\ \text{m}^2$`, "This mixes up milli (10⁻³) with centi (10⁻²) and does not square."],
    ],
    answer: "A",
    explanation: t`$1\ \text{mm} = 10^{-3}\ \text{m}$, so $1\ \text{mm}^2 = (10^{-3})^2\ \text{m}^2 = 10^{-6}\ \text{m}^2$.`,
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: t`In these equations $s$ is displacement, $u$ and $v$ are velocities, $a$ is acceleration, $t$ is time, $F$ is force and $P$ is power. Which equation is **not** homogeneous?`,
    options: [
      [t`$v^2 = u^2 + 2a$`, "Correct: v² has units m² s⁻², but 2a has units m s⁻²."],
      [t`$s = ut + \tfrac{1}{2}at^2$`, "Every term has units of metres, so it is homogeneous."],
      [t`$v = u + at$`, "Every term has units m s⁻¹, so it is homogeneous."],
      [t`$P = Fv$`, "kg m s⁻² × m s⁻¹ = kg m² s⁻³, the watt, so it is homogeneous."],
    ],
    answer: "A",
    explanation: t`Reduce every term to base units. In $v^2 = u^2 + 2a$ the first two terms are $\text{m}^2\ \text{s}^{-2}$ but $2a$ is $\text{m s}^{-2}$: a distance is missing (the correct equation is $v^2 = u^2 + 2as$).`,
    hints: ["Work out the units of each term separately.", "The term that differs reveals the error."],
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: t`The air-resistance force on a fast-moving vehicle is modelled as $F = kv^2$, where $v$ is the speed. What are the SI base units of $k$?`,
    options: [
      [t`$\text{kg m}^{-1}$`, "Correct: k = F/v² = kg m s⁻² ÷ m² s⁻²."],
      [t`$\text{kg s}^{-1}$`, "This would be the unit for a force proportional to v, not v²."],
      [t`$\text{kg m}^{3}\ \text{s}^{-4}$`, "This multiplies by v² instead of dividing."],
      [t`$\text{kg m s}^{-2}$`, "This is the unit of F itself; k must cancel the units of v²."],
    ],
    answer: "A",
    explanation: t`$k = \dfrac{F}{v^2}$, so its units are $\dfrac{\text{kg m s}^{-2}}{(\text{m s}^{-1})^2} = \dfrac{\text{kg m s}^{-2}}{\text{m}^2\ \text{s}^{-2}} = \text{kg m}^{-1}$.`,
    hints: ["Make k the subject.", "Divide the base units of force by those of v²."],
  });
  {
    const ke = 0.5 * 70 * 10 ** 2;
    chk(ke, 3500);
    b.mcq({
      d: 3, skill: "APPLICATION",
      stem: "Which is the best estimate of the kinetic energy of an athlete sprinting at top speed in a 100 m race?",
      options: [
        [t`$10^{3}\ \text{J}$`, "Correct: ½ × 70 kg × (10 m s⁻¹)² = 3500 J, of order 10³ J."],
        [t`$10^{1}\ \text{J}$`, "Far too small: this is roughly the energy of a tennis ball thrown gently."],
        [t`$10^{5}\ \text{J}$`, "Too large: it would need a speed of about 50 m s⁻¹."],
        [t`$10^{7}\ \text{J}$`, "This is the order of the energy of a loaded truck at highway speed."],
      ],
      answer: "A",
      explanation: t`Take $m \approx 70\ \text{kg}$ and $v \approx 10\ \text{m s}^{-1}$ (a 10 s race): $E_k = \tfrac{1}{2}mv^2 = \tfrac{1}{2} \times 70 \times 10^2 = 3500\ \text{J}$, so about $10^{3}\ \text{J}$.`,
      hints: ["Estimate the mass of an athlete and the top speed (100 m in about 10 s)."],
    });
  }
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which quantity has no unit?",
    options: [
      ["strain", "Correct: strain is extension ÷ original length, a ratio of two lengths."],
      ["stress", "Stress is force per unit area, in pascals."],
      ["momentum", "Momentum is mass × velocity, in kg m s⁻¹ (or N s)."],
      ["density", "Density is mass per unit volume, in kg m⁻³."],
    ],
    answer: "A",
    explanation: "A ratio of two quantities with the same unit has no unit. Strain, refractive index and efficiency are examples.",
  });

  // Numerical items
  {
    const A = 0.35e-6;
    b.num({
      d: 2, skill: "APPLICATION", daily: true,
      stem: t`The cross-sectional area of a copper wire is $0.35\ \text{mm}^2$. Express this in $\text{m}^2$.`,
      value: A, sf: 2, unit: "m²", wrong: [0.35e-3, 0.35e-9],
      explanation: t`$1\ \text{mm}^2 = 10^{-6}\ \text{m}^2$, so $0.35\ \text{mm}^2 = 0.35 \times 10^{-6} = 3.5 \times 10^{-7}\ \text{m}^2$. Using $10^{-3}$ (not squaring the prefix) gives $3.5 \times 10^{-4}$.`,
    });
  }
  {
    const d = 0.5e-3;
    const A = (Math.PI * d ** 2) / 4;
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A wire has a diameter of $0.50\ \text{mm}$. Calculate its cross-sectional area in $\text{m}^2$, to two significant figures.`,
      value: A, sf: 2, unit: "m²", wrong: [Math.PI * d ** 2, (Math.PI * 0.5 ** 2) / 4],
      explanation: t`1. Convert: $d = 0.50 \times 10^{-3}\ \text{m}$, so $r = 0.25 \times 10^{-3}\ \text{m}$.\n2. $A = \pi r^2 = \pi (0.25 \times 10^{-3})^2$.\n3. $A = ${sciTex(A, 2)}\ \text{m}^2$.\n\nUsing the diameter as the radius gives $${sciTex(Math.PI * d ** 2, 2)}$ (four times too big); not converting gives $0.20$ (in $\text{mm}^2$).`,
      hints: ["Halve the diameter to get the radius.", "Convert mm to m before squaring."],
    });
  }
  {
    const E = 5.0e9 * 1e-6;
    chk(E, 5000, 1e-9);
    b.calc({
      d: 3, skill: "APPLICATION",
      stem: t`An engineering table gives the Young modulus of a timber as $5.0\ \text{GPa}$. Express this in $\text{N mm}^{-2}$.`,
      value: E, wrong: [5.0e9, 5.0e3 * 1e-3, 5.0e15],
      explanation: t`1. $5.0\ \text{GPa} = 5.0 \times 10^{9}\ \text{N m}^{-2}$.\n2. $1\ \text{m}^2 = 10^{6}\ \text{mm}^2$, so $1\ \text{N m}^{-2} = 10^{-6}\ \text{N mm}^{-2}$.\n3. $5.0 \times 10^{9} \times 10^{-6} = 5000\ \text{N mm}^{-2}$.\n\nMultiplying by $10^{6}$ instead of dividing gives $5.0 \times 10^{15}$.`,
      hints: ["1 Pa = 1 N m⁻².", "How many mm² are there in 1 m²?"],
    });
  }
  {
    const stack = 9.6; // mm for 100 sheets
    const one = (stack / 100) * 1e-3;
    b.num({
      d: 3, skill: "APPLICATION",
      stem: t`Thandeka measures the thickness of a stack of 100 sheets of paper as $9.6 \pm 0.5\ \text{mm}$ with a metre rule. Calculate the thickness of one sheet, in m.`,
      value: one, sf: 2, unit: "m", wrong: [stack / 100, stack * 1e-3],
      explanation: t`One sheet: $9.6/100 = 0.096\ \text{mm} = ${sciTex(one, 2)}\ \text{m}$, with uncertainty $0.5/100 = 0.005\ \text{mm}$. Measuring many sheets makes the percentage uncertainty (about ${sfStr(pctUnc(0.5, 9.6), 1)} %) far smaller than measuring one sheet with a rule would.`,
      hints: ["Divide by the number of sheets, then convert mm to m."],
    });
  }

  b.tf({
    d: 2, skill: "RECALL",
    stem: "The radian is one of the SI base units.",
    answer: false,
    explanation: "False. An angle in radians is arc length ÷ radius, a ratio of two lengths, so it has no base unit. The base units are kg, m, s, A, K, mol (and the candela).",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: t`$1\ \text{cm}^3$ is equal to $10^{-6}\ \text{m}^3$.`,
    answer: true,
    explanation: t`True: $1\ \text{cm} = 10^{-2}\ \text{m}$, so $1\ \text{cm}^3 = (10^{-2})^3\ \text{m}^3 = 10^{-6}\ \text{m}^3$.`,
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each quantity with its SI base units.",
    pairs: [
      ["force", t`$\text{kg m s}^{-2}$`],
      ["power", t`$\text{kg m}^2\ \text{s}^{-3}$`],
      ["charge", t`$\text{A s}$`],
      ["momentum", t`$\text{kg m s}^{-1}$`],
    ],
    explanation: t`$F = ma$; $P = W/t$ with $\text{J} = \text{kg m}^2\ \text{s}^{-2}$; $Q = It$; $p = mv$.`,
  });
  b.fib({
    d: 1, skill: "RECALL",
    stem: "Choose the prefixes.",
    template: "The prefix {{blank:a}} means multiplied by $10^{-6}$, and the prefix {{blank:b}} means multiplied by $10^{9}$.",
    blanks: [
      { id: "a", accepted: ["micro"], choices: ["micro", "milli", "nano"] },
      { id: "b", accepted: ["giga"], choices: ["giga", "mega", "tera"] },
    ],
    explanation: t`micro ($\mu$) $= 10^{-6}$, milli $= 10^{-3}$, nano $= 10^{-9}$; mega $= 10^{6}$, giga $= 10^{9}$, tera $= 10^{12}$.`,
  });
  b.short({
    d: 1, skill: "RECALL",
    stem: "Name the SI base unit of thermodynamic temperature.",
    accepted: ["kelvin", "K", "the kelvin"],
    rejected: [{ value: "degree Celsius", feedback: "The degree Celsius is a derived scale; the base unit is the kelvin." }],
    wrong: ["degree Celsius"],
    explanation: "The **kelvin** (K). Temperature differences of 1 K and 1 °C are equal, but the base unit is the kelvin.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 3,
    stem: t`Show that the ohm is equivalent to $\text{kg m}^2\ \text{s}^{-3}\ \text{A}^{-2}$.`,
    points: [
      t`$R = V/I$ and $V = W/Q$ (energy per unit charge) stated`,
      t`$\text{V} = \dfrac{\text{kg m}^2\ \text{s}^{-2}}{\text{A s}} = \text{kg m}^2\ \text{s}^{-3}\ \text{A}^{-1}$`,
      t`$\Omega = \text{V}/\text{A} = \text{kg m}^2\ \text{s}^{-3}\ \text{A}^{-2}$`,
    ],
    modelAnswer: t`$R = V/I$. The volt is a joule per coulomb: $\text{J} = \text{kg m}^2\ \text{s}^{-2}$ and $\text{C} = \text{A s}$, so $\text{V} = \text{kg m}^2\ \text{s}^{-3}\ \text{A}^{-1}$. Dividing by the ampere: $\Omega = \text{kg m}^2\ \text{s}^{-3}\ \text{A}^{-2}$.`,
    explanation: "Start from defining equations and replace each derived unit until only base units remain.",
    hints: ["Use R = V/I and V = W/Q."],
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 3,
    stem: t`The period of a simple pendulum is $T = 2\pi\sqrt{\dfrac{l}{g}}$, where $l$ is its length and $g$ the acceleration of free fall. Show that the equation is homogeneous.`,
    points: [
      t`Left-hand side: $T$ has units of s`,
      t`$l/g$ has units $\dfrac{\text{m}}{\text{m s}^{-2}} = \text{s}^2$, so $\sqrt{l/g}$ has units of s; $2\pi$ has no unit`,
      "Both sides have units of s, so the equation is homogeneous",
    ],
    modelAnswer: t`The left side is in seconds. On the right, $2\pi$ is a pure number and $\dfrac{l}{g}$ has units $\dfrac{\text{m}}{\text{m s}^{-2}} = \text{s}^2$, so its square root is in seconds. Both sides are in seconds: the equation is homogeneous.`,
    explanation: "Reduce each side to base units and state the conclusion.",
    hints: ["What are the units of l/g?"],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 2,
    stem: "A student finds that an equation she has derived is homogeneous and concludes that it must be correct. Explain why this conclusion is not justified.",
    points: [
      t`Pure numbers / dimensionless constants (such as $\tfrac{1}{2}$, 2 or $\pi$) have no units, so a wrong numerical factor is not detected`,
      "A term could be missing, or have the wrong sign, and the equation would still be homogeneous",
    ],
    modelAnswer: t`A unit check cannot detect numerical factors, because numbers such as $\tfrac{1}{2}$ or $2\pi$ have no units: $s = ut + at^2$ is homogeneous but wrong. A term with the right units could also be missing or have the wrong sign. Homogeneity is necessary for an equation to be correct, but not sufficient.`,
    explanation: "Homogeneity is a necessary test, not a sufficient one.",
    hints: ["Can a unit check tell ½ from 2?"],
  });

  // Practice structured 1: drag on a kombi (units, conversion, power).
  {
    const C = 0.5;
    const rho = 1.2;
    const A = 4.0;
    const v = (108 * 1000) / 3600;
    chk(v, 30);
    const F = 0.5 * C * rho * A * v ** 2;
    const Pk = (F * v) / 1000;
    b.struct({
      d: 4, skill: "APPLICATION", calculator: true, examStyle: true,
      stem: t`The drag force on a kombi moving through still air at speed $v$ is modelled by\n\n$$\nF = \tfrac{1}{2} C \rho A v^2\n$$\n\nwhere $\rho$ is the density of air, $A$ the frontal area of the vehicle and $C$ a drag coefficient. For this kombi $C = 0.50$ and $A = 4.0\ \text{m}^2$; take $\rho = 1.2\ \text{kg m}^{-3}$.`,
      parts: [
        P.manual({ label: "(a)", marks: 3, stem: "Show that $C$ has no unit.", points: [t`$C = \dfrac{2F}{\rho A v^2}$ (rearranged; the 2 has no unit)`, t`Units of $\rho A v^2$: $\text{kg m}^{-3} \times \text{m}^2 \times \text{m}^2\ \text{s}^{-2} = \text{kg m s}^{-2}$`, t`$F$ is also $\text{kg m s}^{-2}$, so they cancel and $C$ has no unit`], modelAnswer: t`$C = 2F/(\rho A v^2)$. The denominator has units $\text{kg m}^{-3} \times \text{m}^2 \times \text{m}^2\ \text{s}^{-2} = \text{kg m s}^{-2}$, the same as the newton. So $C$ is a ratio of two forces and has no unit.` }),
        P.mcq({ label: "(b)", stem: t`The kombi travels at $108\ \text{km h}^{-1}$. What is this speed in $\text{m s}^{-1}$?`, options: [["30", "Correct: 108 000 m ÷ 3600 s."], ["389", "This multiplies by 3.6 instead of dividing."], ["1.8", "This divides by 60 only (km per minute)."], ["108 000", "This converts km to m but not hours to seconds."]], answer: "A", explanation: t`$108\ \text{km h}^{-1} = \dfrac{108\,000\ \text{m}}{3600\ \text{s}} = 30\ \text{m s}^{-1}$.` }),
        P.num({ label: "(c)", marks: 2, stem: "Calculate the drag force at this speed, in N.", value: F, unit: "N", wrong: [C * rho * A * v ** 2, 0.5 * C * rho * A * 108 ** 2], explanation: t`$F = \tfrac{1}{2} \times 0.50 \times 1.2 \times 4.0 \times 30^2 = ${F}\ \text{N}$. Leaving out the $\tfrac{1}{2}$ doubles it; using 108 instead of 30 gives ${0.5 * C * rho * A * 108 ** 2} N.` }),
        P.num({ label: "(d)", marks: 2, stem: "Calculate the power needed to overcome this drag force, in kW, to three significant figures.", value: Pk, sf: 3, unit: "kW", wrong: [F * v, F / v / 1000], explanation: t`$P = Fv = ${F} \times 30 =${F * v}\ \text{W} = ${sfStr(Pk, 3)}\ \text{kW}$.` }),
      ],
      explanation: t`$C$ is dimensionless; at $30\ \text{m s}^{-1}$ the drag is $${F}\ \text{N}$ and the power to overcome it is $${sfStr(Pk, 3)}\ \text{kW}$.`,
      hints: ["Make C the subject and reduce each quantity to base units.", "Divide km h⁻¹ by 3.6.", "Power = force × velocity."],
    });
  }

  // Practice structured 2: wave speed on a guitar string (units, prefixes, uncertainty).
  {
    const d = 0.3e-3;
    const rho = 7.9e3;
    const mu = (rho * Math.PI * d ** 2) / 4;
    const T = 60;
    const v = Math.sqrt(T / mu);
    const L = 0.65;
    const f = v / (2 * L);
    const pd = pctUnc(0.01, 0.3);
    console.log("si struct mu", mu, "v", v, "f", f, "pd", pd);
    b.struct({
      d: 4, skill: "APPLICATION", calculator: true, examStyle: true,
      stem: t`The speed $v$ of a transverse wave on a stretched string is given by $v = \sqrt{\dfrac{T}{\mu}}$, where $T$ is the tension and $\mu$ the mass per unit length of the string. Farai has a steel guitar string of diameter $0.30\ \text{mm}$ (measured with a micrometer to $\pm 0.01\ \text{mm}$). The density of steel is $7.9\ \text{g cm}^{-3}$.`,
      parts: [
        P.manual({ label: "(a)", marks: 3, stem: t`State the SI base units of $\mu$, and show that $\sqrt{T/\mu}$ has the units of a speed.`, points: [t`$\mu$ in $\text{kg m}^{-1}$`, t`$T/\mu$: $\dfrac{\text{kg m s}^{-2}}{\text{kg m}^{-1}} = \text{m}^2\ \text{s}^{-2}$`, t`Square root gives $\text{m s}^{-1}$, the unit of speed`], modelAnswer: t`$\mu$ is mass per unit length, $\text{kg m}^{-1}$. Then $\dfrac{T}{\mu}$ has units $\dfrac{\text{kg m s}^{-2}}{\text{kg m}^{-1}} = \text{m}^2\ \text{s}^{-2}$, and its square root has units $\text{m s}^{-1}$, a speed.` }),
        P.num({ label: "(b)", marks: 2, stem: t`Show that $\mu$ is about $5.6 \times 10^{-4}\ \text{kg m}^{-1}$ by calculating it to three significant figures, in $\text{kg m}^{-1}$.`, value: mu, sf: 3, wrong: [(7.9 * Math.PI * d ** 2) / 4, rho * Math.PI * d ** 2], explanation: t`$\rho = 7.9 \times 10^{3}\ \text{kg m}^{-3}$; area $= \pi (0.15 \times 10^{-3})^2 = ${sciTex((Math.PI * d ** 2) / 4, 3)}\ \text{m}^2$; $\mu = \rho A = ${sciTex(mu, 3)}\ \text{kg m}^{-1}$. Leaving the density in $\text{g cm}^{-3}$ gives a value $10^{3}$ times too small.` }),
        P.num({ label: "(c)", marks: 2, stem: t`The tension is $60\ \text{N}$. Calculate the wave speed, in $\text{m s}^{-1}$.`, value: v, unit: "m/s", wrong: [T / mu], explanation: t`$v = \sqrt{60 / ${sciTex(mu, 3)}} = ${sfStr(v, 3)}\ \text{m s}^{-1}$. Forgetting the square root gives about $10^{5}$.` }),
        P.num({ label: "(d)", marks: 2, stem: t`The vibrating length is $0.65\ \text{m}$ and the fundamental frequency is $f = \dfrac{v}{2L}$. Calculate $f$ in Hz.`, value: f, unit: "Hz", wrong: [v / L], explanation: t`$f = \dfrac{${sfStr(v, 3)}}{2 \times 0.65} = ${sfStr(f, 3)}\ \text{Hz}$.` }),
        P.num({ label: "(e)", marks: 1, stem: t`Calculate the percentage uncertainty in $\mu$ due to the uncertainty in the diameter, to two significant figures.`, value: 2 * pd, sf: 2, unit: "%", wrong: [pd], explanation: t`$\%\,\Delta d = \dfrac{0.01}{0.30} \times 100 = ${sfStr(pd, 2)}\,\%$; $\mu \propto d^2$, so $\%\,\Delta\mu = ${sfStr(2 * pd, 2)}\,\%$.` }),
        P.manual({ label: "(f)", marks: 2, stem: "Explain why the diameter, rather than the length or tension, is likely to dominate the uncertainty in the calculated frequency.", points: ["The diameter is very small, so even ±0.01 mm is a large percentage (about 3 %), and it is squared in μ (about 7 %)", "The length (±1 mm in 650 mm) and tension have much smaller percentage uncertainties"], modelAnswer: "The diameter is only 0.30 mm, so the micrometer's ±0.01 mm is over 3 % of it, and μ depends on d², doubling this to about 7 %. A length of 650 mm measured to ±1 mm is uncertain by only about 0.2 %, so the diameter dominates." }),
      ],
      explanation: t`$\mu = ${sciTex(mu, 3)}\ \text{kg m}^{-1}$, $v = ${sfStr(v, 3)}\ \text{m s}^{-1}$, $f = ${sfStr(f, 3)}\ \text{Hz}$; the squared diameter dominates the uncertainty.`,
      hints: ["μ is the density times the cross-sectional area.", "Convert g cm⁻³ to kg m⁻³ (× 10³) and mm to m.", "For d², double the percentage uncertainty."],
    });
  }

  // Flashcards
  b.card("FACT", "The six SI base units used in A-Level physics", "kilogram (kg), metre (m), second (s), ampere (A), kelvin (K), mole (mol).");
  b.card("FORMULA", "The newton in base units", t`$\text{kg m s}^{-2}$ (from $F = ma$)`);
  b.card("FORMULA", "The joule and the watt in base units", t`$\text{J} = \text{kg m}^2\ \text{s}^{-2}$; $\text{W} = \text{kg m}^2\ \text{s}^{-3}$`);
  b.card("FORMULA", "The volt in base units", t`$\text{kg m}^2\ \text{s}^{-3}\ \text{A}^{-1}$ (from $V = W/Q$)`);
  b.card("DEFINITION", "Homogeneous equation", "An equation in which every term has the same base units.");
  b.card("CONCEPT", "Why does homogeneity not prove an equation correct?", "Pure numbers (½, 2, π) have no units, and a missing term or wrong sign is not detected by a unit check.");
  b.card("FACT", "Prefixes pico to tera", t`p $10^{-12}$, n $10^{-9}$, $\mu$ $10^{-6}$, m $10^{-3}$, c $10^{-2}$, k $10^{3}$, M $10^{6}$, G $10^{9}$, T $10^{12}$`);
  b.card("CONCEPT", "Converting mm² and cm³ to SI", t`Square or cube the prefix: $1\ \text{mm}^2 = 10^{-6}\ \text{m}^2$, $1\ \text{cm}^3 = 10^{-6}\ \text{m}^3$.`);
  b.card("FACT", "Useful estimates", t`Adult 70 kg; door 2 m; car 1000 kg; kettle 2 kW; air $1.2\ \text{kg m}^{-3}$; visible light about 500 nm.`);
});
