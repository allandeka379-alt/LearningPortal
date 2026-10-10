// W4b: aphys.astro.luminosity-standard-candles (Cambridge A Level only, 25.1) — luminosity, radiant flux intensity,
// F = L/(4πd²), standard candles (Cepheids, type Ia supernovae), distances in SI units.
import { concept, P, t, sfStr, sciTex, fluxIntensity } from "../lib.mjs";

const ly = 9.46e15;
const Lsun = 3.83e26;
const dist = (L, F) => Math.sqrt(L / (4 * Math.PI * F));

concept("aphys.astro.luminosity-standard-candles", { file: "astro/luminosity-standard-candles", keyPrefix: "astro.luminosity-standard-candles" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is meant by the luminosity of a star?",
    options: [
      ["The total power of electromagnetic radiation it emits", "Correct: measured in watts."],
      ["The power it delivers to each square metre at the Earth", "That is the radiant flux intensity, which depends on distance."],
      ["How bright it appears in the night sky", "Apparent brightness depends on distance as well as luminosity."],
      ["The total energy it will radiate during its lifetime", "Luminosity is a power (energy per second), not a total energy."],
    ],
    answer: "A",
    explanation: "Luminosity L: total radiant power output of the star (W).",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which is the SI unit of radiant flux intensity?",
    options: [
      [t`$\text{W m}^{-2}$`, "Correct: power per unit area."],
      ["W", "The watt is the unit of luminosity (total power)."],
      [t`$\text{J m}^{-2}$`, "Energy per unit area leaves out 'per second'."],
      [t`$\text{W m}^{-1}$`, "Flux intensity is per unit area, so m⁻²."],
    ],
    answer: "A",
    explanation: t`$F = L/4\pi d^{2}$: watts divided by square metres.`,
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "An observer moves three times as far from a star. By what factor does the radiant flux intensity received change?",
    options: [
      ["It becomes one ninth.", "Correct: F ∝ 1/d², and 3² = 9."],
      ["It becomes one third.", "F falls with the square of the distance."],
      ["It becomes one twenty-seventh.", "The power spreads over an area ∝ d², not d³."],
      ["It does not change.", "The luminosity is unchanged, but the flux intensity falls with distance."],
    ],
    explanation: "Inverse-square law: F ∝ 1/d², so tripling d gives F/9.",
    answer: "A",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is a standard candle in astronomy?",
    options: [
      ["An object of known luminosity, used to find its distance from its measured flux", "Correct."],
      ["A star whose distance from the Earth has already been measured precisely", "It is the luminosity, not the distance, that is known in advance."],
      ["A star that has the same luminosity as the Sun", "Standard candles are usually far more luminous than the Sun."],
      ["Any star bright enough to be seen with the naked eye", "Apparent brightness alone does not give a distance."],
    ],
    answer: "A",
    explanation: "Known L + measured F → d = √(L/4πF).",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "How is a Cepheid variable star used to find the distance to a nearby galaxy?",
    options: [
      ["Its period of pulsation gives its luminosity; with the measured flux this gives its distance.", "Correct: the period-luminosity relation makes Cepheids standard candles."],
      ["Its period of pulsation gives its distance directly.", "The period gives the luminosity; the distance needs the flux as well."],
      ["Its colour gives its distance directly.", "Colour indicates temperature, not distance."],
      ["Its flux alone gives its distance, since all Cepheids are the same brightness.", "Cepheids differ in luminosity; their periods tell them apart."],
    ],
    answer: "A",
    explanation: "Period → L (period-luminosity relation); measure F; d = √(L/4πF).",
    hints: ["What does the period tell you about the star?"],
  });
  {
    const ratio = 25;
    b.mcq({
      d: 3, skill: "ANALYSIS",
      stem: "Two type Ia supernovae have the same peak luminosity. The peak flux intensity from the first is 25 times that from the second. What is the ratio of the distance of the second to the distance of the first?",
      options: [
        [String(Math.sqrt(ratio)), "Correct: d ∝ 1/√F, and √25 = 5."],
        [String(ratio), "The distance depends on the square root of the flux ratio."],
        [String(1 / Math.sqrt(ratio)), "The fainter supernova is further away, so the ratio is more than 1."],
        [String(ratio * ratio), "F ∝ 1/d², so d ∝ 1/√F, not 1/F²."],
      ],
      answer: "A",
      explanation: "Same L: F ∝ 1/d², so d₂/d₁ = √(F₁/F₂) = √25 = 5.",
      hints: ["Rearrange F = L/4πd² for d."],
    });
  }
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Dust between a standard candle and the Earth absorbs some of its light. If no correction is made, how does this affect the calculated distance?",
    options: [
      ["It is too large, because the measured flux intensity is too small.", "Correct: d = √(L/4πF) increases as F decreases."],
      ["It is too small, because the measured flux intensity is too small.", "A smaller F gives a larger d, not a smaller one."],
      ["It is unaffected, because the luminosity is known.", "The flux measurement is also needed and is reduced by absorption."],
      ["It is too large, because the luminosity is increased by the dust.", "Dust does not change the star's luminosity."],
    ],
    answer: "A",
    explanation: "Absorption reduces F; d ∝ 1/√F, so d is overestimated.",
    hints: ["How does d depend on F?"],
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which expression gives the distance d of a star of luminosity L from which a radiant flux intensity F is received?",
    options: [
      [t`$\sqrt{\dfrac{L}{4\pi F}}$`, "Correct: rearranging F = L/4πd²."],
      [t`$\dfrac{L}{4\pi F}$`, "This is d², not d."],
      [t`$\sqrt{\dfrac{4\pi F}{L}}$`, "This is 1/d: the fraction is upside down."],
      [t`$\sqrt{\dfrac{L}{\pi F}}$`, "The area of a sphere is 4πd², not πd²."],
    ],
    answer: "A",
    explanation: t`$d^{2} = \dfrac{L}{4\pi F}$, so $d = \sqrt{\dfrac{L}{4\pi F}}$; units: $\sqrt{\text{W}/(\text{W m}^{-2})} = \text{m}$.`,
    hints: ["Check that the units come out in metres."],
  });
  {
    const d = 2.28e11;
    b.num({
      d: 2, skill: "APPLICATION", calculator: true, daily: true,
      stem: t`The Sun has a luminosity of $3.83 \times 10^{26}\ \text{W}$. Calculate the radiant flux intensity at Mars, $2.28 \times 10^{11}\ \text{m}$ from the Sun, in $\text{W m}^{-2}$, to three significant figures.`,
      value: fluxIntensity(Lsun, d), unit: "W/m²", wrong: [Lsun / (Math.PI * d * d), Lsun / (4 * Math.PI * d)],
      explanation: t`$F = \dfrac{3.83 \times 10^{26}}{4\pi (2.28 \times 10^{11})^{2}} = ${sfStr(fluxIntensity(Lsun, d), 3)}\ \text{W m}^{-2}$.`,
    });
  }
  {
    const d = 4.0e17, F = 3.1e-9;
    const L = 4 * Math.PI * d * d * F;
    b.num({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A star $4.0 \times 10^{17}\ \text{m}$ from the Earth produces a radiant flux intensity of $3.1 \times 10^{-9}\ \text{W m}^{-2}$ at the Earth. Calculate its luminosity, in W, to two significant figures.`,
      value: L, sf: 2, unit: "W", wrong: [4 * Math.PI * d * F, F * d * d],
      explanation: t`$L = 4\pi d^{2}F = 4\pi \times (4.0 \times 10^{17})^{2} \times 3.1 \times 10^{-9} = ${sciTex(L, 2)}\ \text{W}$, about ${sfStr(L / Lsun, 2)} times the Sun's luminosity.`,
      hints: ["Rearrange for L = 4πd²F."],
    });
  }
  {
    const L = 5.6e28, F = 8.0e-10;
    const d = dist(L, F);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A star of luminosity $5.6 \times 10^{28}\ \text{W}$ gives a radiant flux intensity at the Earth of $8.0 \times 10^{-10}\ \text{W m}^{-2}$. Calculate its distance, in m, to two significant figures.`,
      value: d, sf: 2, unit: "m", wrong: [L / (4 * Math.PI * F), Math.sqrt(L / (Math.PI * F))],
      explanation: t`1. $d = \sqrt{\dfrac{L}{4\pi F}} = \sqrt{\dfrac{5.6 \times 10^{28}}{4\pi \times 8.0 \times 10^{-10}}}$.
2. $d = ${sciTex(d, 2)}\ \text{m}$. Forgetting the square root gives $d^{2}$.`,
      hints: ["d = √(L/4πF)."],
    });
  }
  {
    const L = 2.0e36, F = 4.5e-15;
    const d = dist(L, F);
    b.calc({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: t`A type Ia supernova in a distant galaxy reaches a peak luminosity of $2.0 \times 10^{36}\ \text{W}$. Its peak radiant flux intensity at the Earth is $4.5 \times 10^{-15}\ \text{W m}^{-2}$. Calculate the distance to the galaxy in light-years, to two significant figures. (1 light-year $= 9.46 \times 10^{15}\ \text{m}$)`,
      value: d / ly, sf: 2, unit: "light-years", wrong: [d, (d / ly) ** 2 / 1e8],
      explanation: t`1. $d = \sqrt{\dfrac{2.0 \times 10^{36}}{4\pi \times 4.5 \times 10^{-15}}} = ${sciTex(d, 2)}\ \text{m}$.
2. $\dfrac{${sciTex(d, 2)}}{9.46 \times 10^{15}} = ${sciTex(d / ly, 2)}$ light-years.`,
      hints: ["Work in metres, then convert."],
    });
  }
  {
    const L = 9.6e27;
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`The radiant flux intensity received from a star $3.5 \times 10^{17}\ \text{m}$ away is measured, giving its luminosity as $9.6 \times 10^{27}\ \text{W}$. Calculate its luminosity as a multiple of the Sun's luminosity ($3.83 \times 10^{26}\ \text{W}$), to three significant figures.`,
      value: L / Lsun, wrong: [Lsun / L],
      explanation: t`1. $\dfrac{L}{L_{\odot}} = \dfrac{9.6 \times 10^{27}}{3.83 \times 10^{26}}$.
2. $= ${sfStr(L / Lsun, 3)}$ times the Sun's luminosity (the distance is not needed once L is known).`,
      hints: ["Divide the two luminosities."],
    });
  }
  {
    const pL = 12, pF = 6;
    b.num({
      d: 4, skill: "EVALUATION", calculator: false,
      stem: "The luminosity of a standard candle is known to within ±12%, and its radiant flux intensity is measured to within ±6%. Calculate the percentage uncertainty in the distance found from d = √(L/4πF).",
      value: (pL + pF) / 2, unit: "%", wrong: [pL + pF, pL - pF],
      explanation: "d ∝ L^½ F^−½: percentage uncertainty = ½ × 12 + ½ × 6 = 9%. The square root halves each contribution.",
      hints: ["For a power ½, multiply the percentage uncertainty by ½."],
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Two stars that produce the same radiant flux intensity at the Earth must have the same luminosity.",
    answer: false,
    explanation: "False. F = L/4πd²: a more luminous star further away can give the same flux as a less luminous star nearby.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each quantity with its SI unit.",
    pairs: [
      ["Luminosity", "W"],
      ["Radiant flux intensity", t`$\text{W m}^{-2}$`],
      ["Distance to a galaxy (in calculations)", "m"],
      ["Area of the sphere over which power spreads", t`$\text{m}^{2}$`],
    ],
    explanation: "Use SI units in every calculation; light-years are for context only.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the statement about Cepheid variables.",
    template: "The {{blank:a}} of a Cepheid's pulsation is related to its luminosity: a longer period means a {{blank:b}} luminous star. Comparing its luminosity with the measured {{blank:c}} gives its distance.",
    blanks: [
      { id: "a", accepted: ["period"], choices: ["period", "colour", "radius"] },
      { id: "b", accepted: ["more"], choices: ["more", "less"] },
      { id: "c", accepted: ["radiant flux intensity"], choices: ["radiant flux intensity", "temperature", "redshift"] },
    ],
    explanation: "Period-luminosity relation; then d = √(L/4πF).",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe how a standard candle in a distant galaxy can be used to determine the distance to that galaxy.",
    points: [
      "Identify an object of known luminosity L in the galaxy (e.g. a type Ia supernova at peak, or a Cepheid whose period gives L).",
      "Measure the radiant flux intensity F received at the Earth (calibrated detector on a telescope).",
      "Use the inverse-square law F = L/4πd².",
      "Rearrange: d = √(L/4πF), assuming equal emission in all directions and no absorption.",
    ],
    modelAnswer: "Find an object in the galaxy whose luminosity L is known, such as a type Ia supernova at its peak or a Cepheid whose period gives its luminosity. Measure the radiant flux intensity F received at the Earth with a calibrated detector on a telescope. The inverse-square law F = L/4πd² then gives d = √(L/4πF), assuming the object radiates equally in all directions and none of the radiation is absorbed on the way.",
    explanation: "Known L, measured F, inverse-square law.",
    hints: ["What must be known and what must be measured?"],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: t`Explain why the radiant flux intensity at distance $d$ from a star of luminosity $L$ is $L/4\pi d^{2}$, stating the assumptions made.`,
    points: [
      "All the power L passes through a sphere of radius d centred on the star.",
      "The sphere's area is 4πd², so the power per unit area is L/4πd².",
      "Assumptions: the star radiates equally in all directions; no radiation is absorbed or scattered between star and observer.",
    ],
    modelAnswer: "All the power emitted by the star must pass through any sphere centred on it. A sphere of radius d has area 4πd², so if the power is spread evenly, the power per unit area is L/4πd². This assumes the star radiates equally in all directions and that no radiation is absorbed or scattered on the way.",
    explanation: "Power spread over a spherical surface.",
    hints: ["Think of a sphere around the star."],
  });

  // Practice structured: a Cepheid in a nearby galaxy (12 marks)
  {
    const L = 3.6e30, F = 1.9e-14;
    const d = dist(L, F);
    const dly = d / ly;
    const L2 = L / 5;
    b.struct({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: t`A Cepheid variable in a nearby galaxy has a period of 30 days. The period-luminosity relation shows that its mean luminosity is $3.6 \times 10^{30}\ \text{W}$. Its mean radiant flux intensity at the Earth is $1.9 \times 10^{-14}\ \text{W m}^{-2}$. (1 light-year $= 9.46 \times 10^{15}\ \text{m}$)`,
      parts: [
        P.manual({ label: "(a)", marks: 2, stem: "Define luminosity and radiant flux intensity.", points: [
          "Luminosity: total power of radiation emitted by the star (W).",
          "Radiant flux intensity: radiant power passing normally through unit area at a given distance (W m⁻²).",
        ], modelAnswer: "Luminosity is the total power of electromagnetic radiation emitted by the star. Radiant flux intensity is the radiant power passing normally through unit area at a given distance." }),
        P.num({ label: "(b)", marks: 2, stem: t`A telescope mirror of area $0.80\ \text{m}^2$ collects the Cepheid's radiation. Calculate the power it receives, in W, to two significant figures.`, value: F * 0.8, sf: 2, unit: "W", wrong: [F / 0.8], explanation: t`$P = FA = 1.9 \times 10^{-14} \times 0.80 = ${sciTex(F * 0.8, 2)}\ \text{W}$: a tiny power, which is why large mirrors and sensitive detectors are needed.` }),
        P.num({ label: "(c)", marks: 3, stem: "Calculate the distance to the galaxy, in m, to two significant figures.", value: d, sf: 2, unit: "m", wrong: [L / (4 * Math.PI * F)], explanation: t`$d = \sqrt{\dfrac{3.6 \times 10^{30}}{4\pi \times 1.9 \times 10^{-14}}} = ${sciTex(d, 2)}\ \text{m}$.` }),
        P.num({ label: "(d)", marks: 1, stem: "Express this distance in light-years, to two significant figures.", value: dly, sf: 2, unit: "light-years", wrong: [d * ly], explanation: t`$\dfrac{${sciTex(d, 2)}}{9.46 \times 10^{15}} = ${sciTex(dly, 2)}$ light-years.` }),
        P.num({ label: "(e)", marks: 2, stem: "A second Cepheid in the same galaxy has a shorter period, which shows it is one fifth as luminous. Calculate the radiant flux intensity received from it, in W m⁻², to two significant figures.", value: fluxIntensity(L2, d), sf: 2, unit: "W/m²", wrong: [F / 25, F / Math.sqrt(5)], explanation: t`Same distance, so $F \propto L$: $\dfrac{1.9 \times 10^{-14}}{5} = ${sciTex(fluxIntensity(L2, d), 2)}\ \text{W m}^{-2}$.` }),
        P.manual({ label: "(f)", marks: 2, stem: "State two assumptions made in calculating the distance.", points: [
          "The star radiates equally in all directions (isotropically).",
          "No radiation is absorbed or scattered by dust or gas between the star and the Earth (and the period-luminosity calibration is correct).",
        ], modelAnswer: "The star emits equally in all directions, and none of its radiation is absorbed or scattered by dust and gas on the way to the Earth." }),
      ],
      explanation: "Standard candle: known L, measured F, d = √(L/4πF).",
      hints: ["Use metres throughout.", "At the same distance, F ∝ L."],
    });
  }
  // Practice structured: sunlight on a solar panel (8 marks)
  {
    const d = 1.52e11;
    const F = fluxIntensity(Lsun, d);
    const A = 1.6, eff = 0.18, Fground = 950;
    b.struct({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A clinic near Gwanda runs a refrigerator from solar panels. The Sun's luminosity is $3.83 \times 10^{26}\ \text{W}$ and in early July the Earth is $1.52 \times 10^{11}\ \text{m}$ from the Sun. Each panel has an area of $1.6\ \text{m}^2$ and converts 18% of the radiation falling on it into electrical energy.`,
      parts: [
        P.num({ label: "(a)", marks: 2, stem: "Calculate the radiant flux intensity of sunlight just above the Earth's atmosphere in early July, in W m⁻², to three significant figures.", value: F, unit: "W/m²", wrong: [Lsun / (Math.PI * d * d)], explanation: t`$\dfrac{3.83 \times 10^{26}}{4\pi(1.52 \times 10^{11})^{2}} = ${sfStr(F, 3)}\ \text{W m}^{-2}$.` }),
        P.num({ label: "(b)", marks: 2, stem: "At midday the flux intensity at the ground, with the panel facing the Sun, is 950 W m⁻². Calculate the electrical power from one panel, in W, to two significant figures.", value: Fground * A * eff, sf: 2, unit: "W", wrong: [F * A * eff, Fground * A], explanation: t`$950 \times 1.6 \times 0.18 = ${sfStr(Fground * A * eff, 2)}\ \text{W}$.` }),
        P.manual({ label: "(c)", marks: 2, stem: "Suggest two reasons why the flux intensity at the ground is less than above the atmosphere.", points: [
          "Absorption and scattering of radiation by gases, water vapour, dust and cloud in the atmosphere.",
          "Longer path through the atmosphere when the Sun is not overhead / the panel not perpendicular to the rays.",
        ], modelAnswer: "Some radiation is absorbed and scattered by gases, water vapour, dust and clouds, and when the Sun is lower the rays pass through more atmosphere and strike the panel at an angle." }),
        P.num({ label: "(d)", marks: 2, stem: "The Earth-Sun distance varies by about ±1.7% during the year. Calculate the corresponding percentage variation in the flux intensity above the atmosphere, to two significant figures.", value: 3.4, sf: 2, unit: "%", wrong: [1.7], explanation: "F ∝ d⁻², so the percentage variation is 2 × 1.7% = 3.4%." }),
      ],
      explanation: "F = L/4πd²; electrical power = F × A × efficiency.",
      hints: ["F ∝ 1/d²."],
    });
  }

  b.card("DEFINITION", "**Luminosity**", "The total power of electromagnetic radiation emitted by a star (W).");
  b.card("DEFINITION", "**Radiant flux intensity**", t`The radiant power passing normally through unit area at a given distance ($\text{W m}^{-2}$).`);
  b.card("FORMULA", "Inverse-square law", t`$F = \dfrac{L}{4\pi d^{2}}$ and $d = \sqrt{\dfrac{L}{4\pi F}}$`);
  b.card("DEFINITION", "**Standard candle**", "An astronomical object of known luminosity, whose measured flux gives its distance.");
  b.card("FACT", "Cepheid variables", "Pulsating stars whose period is related to their luminosity (longer period, more luminous).");
  b.card("FACT", "Type Ia supernovae", "Exploding white dwarfs that all reach about the same peak luminosity; visible in very distant galaxies.");
  b.card("CONCEPT", "Assumptions in F = L/4πd²", "The star radiates equally in all directions; nothing absorbs the radiation on the way.");
  b.card("FACT", "Useful values", t`$L_{\odot} = 3.83 \times 10^{26}\ \text{W}$; Earth-Sun $1.50 \times 10^{11}\ \text{m}$; 1 light-year $= 9.46 \times 10^{15}\ \text{m}$.`);
  b.card("CONCEPT", "Dust and distance", "Absorption lowers the measured F, so the calculated distance is too large unless corrected.");
});
