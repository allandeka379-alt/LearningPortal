// W4b: aphys.astro.redshift-hubble (Cambridge A Level only, 25.3) — redshift Δλ/λ ≈ Δf/f ≈ v/c, expanding Universe,
// Hubble's law v ≈ H0 d in SI units, the Big Bang, age ≈ 1/H0.
import { concept, P, t, sfStr, dpStr, sciTex, table, DATA, linFit } from "../lib.mjs";

const { c } = DATA;
const H0 = 2.2e-18;
const yr = 3.16e7;

concept("aphys.astro.redshift-hubble", { file: "astro/redshift-hubble", keyPrefix: "astro.redshift-hubble" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is meant by the redshift of light from a distant galaxy?",
    options: [
      ["The spectral lines are shifted to longer wavelengths than measured in the laboratory.", "Correct: the source is moving away."],
      ["The galaxy emits mostly red light.", "Redshift is a shift of all wavelengths, not the colour of the galaxy."],
      ["The spectral lines are shifted to shorter wavelengths than measured in the laboratory.", "That is a blueshift, from a source moving towards us."],
      ["The light is absorbed by red dust between the galaxies.", "Absorption changes the brightness, not the positions of the lines."],
    ],
    answer: "A",
    explanation: "Redshift: Δλ > 0 for every line, by the same fraction v/c.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which statement is Hubble's law?",
    options: [
      ["The recession speed of a distant galaxy is approximately proportional to its distance.", "Correct: v ≈ H₀d."],
      ["The recession speed of a galaxy is inversely proportional to its distance.", "Further galaxies recede faster, not slower."],
      ["All galaxies recede at the same speed.", "The speed increases in proportion to distance."],
      ["The redshift of a galaxy is proportional to its luminosity.", "Redshift depends on recession speed, not on luminosity."],
    ],
    answer: "A",
    explanation: "v ≈ H₀d.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "What is the SI unit of the Hubble constant?",
    options: [
      [t`$\text{s}^{-1}$`, "Correct: (m s⁻¹)/m."],
      [t`$\text{m s}^{-1}$`, "That is the unit of speed; H₀ is speed per unit distance."],
      [t`$\text{km s}^{-1}\ \text{Mpc}^{-1}$`, "This is a common unit, but it is not SI."],
      ["s", "1/H₀ has the unit of time, not H₀ itself."],
    ],
    answer: "A",
    explanation: t`$H_0 = v/d$: $\text{m s}^{-1}/\text{m} = \text{s}^{-1}$.`,
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which observation is the evidence that the Universe is expanding?",
    options: [
      ["Almost all distant galaxies are redshifted, the more distant ones by more.", "Correct: everything is receding, faster in proportion to distance."],
      ["A few nearby galaxies, such as Andromeda, are blueshifted and approaching.", "A few nearby galaxies approach us; this does not show expansion."],
      ["Distant galaxies look much fainter than nearby galaxies of a similar type.", "That follows from the inverse-square law, whether or not the Universe expands."],
      ["Stars of different temperatures have different colours.", "That is Wien's law, not evidence of expansion."],
    ],
    answer: "A",
    explanation: "Systematic redshift increasing with distance means the galaxies are all moving apart.",
    hints: ["What do the redshifts of galaxies have in common?"],
  });
  {
    const v = (c * (401.3 - 393.4)) / 393.4;
    b.mcq({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A calcium absorption line with a laboratory wavelength of $393.4\ \text{nm}$ appears at $401.3\ \text{nm}$ in the spectrum of a galaxy. What is the galaxy's speed of recession?`,
      options: [
        [t`$${sciTex(v, 2)}\ \text{m s}^{-1}$`, "Correct: v = c Δλ/λ = 3.00 × 10⁸ × 7.9/393.4."],
        [t`$${sciTex(c * (401.3 / 393.4), 2)}\ \text{m s}^{-1}$`, "This uses λ_obs/λ instead of Δλ/λ, giving a speed faster than light."],
        [t`$${sciTex((7.9e-9) * c, 2)}\ \text{m s}^{-1}$`, "This multiplies c by Δλ in metres without dividing by λ."],
        [t`$${sciTex((c * 393.4) / 7.9 / 1e6, 2)}\ \text{m s}^{-1}$`, "This divides by the fraction instead of multiplying."],
      ],
      answer: "A",
      explanation: t`$v = c\,\dfrac{\Delta\lambda}{\lambda} = 3.00 \times 10^{8} \times \dfrac{401.3 - 393.4}{393.4} = ${sciTex(v, 2)}\ \text{m s}^{-1}$.`,
      hints: ["Δλ/λ ≈ v/c."],
    });
  }
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "The spectral lines of a nearby galaxy are shifted to shorter wavelengths. What does this show?",
    options: [
      ["The galaxy is moving towards the Earth.", "Correct: a blueshift means approach."],
      ["The galaxy is moving away from the Earth.", "Recession gives a redshift (longer wavelengths)."],
      ["The galaxy is hotter than the Sun.", "Temperature changes the shape of the continuous spectrum, not the positions of lines."],
      ["The galaxy is further away than redshifted galaxies.", "A blueshift is seen only for some nearby galaxies."],
    ],
    answer: "A",
    explanation: "Blueshift: approaching source (for example the Andromeda galaxy).",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "New measurements give a larger value of the Hubble constant. How does this change the estimated age of the Universe?",
    options: [
      ["The estimate becomes smaller.", "Correct: age ≈ 1/H₀."],
      ["The estimate becomes larger.", "A larger H₀ means faster expansion, so less time to reach present distances."],
      ["The estimate is unchanged.", "The age estimate depends directly on H₀."],
      ["The age can no longer be estimated.", "1/H₀ still gives an estimate."],
    ],
    answer: "A",
    explanation: "t ≈ 1/H₀: larger H₀, smaller t.",
    hints: ["Age ≈ d/v = 1/H₀."],
  });
  {
    const frac = 0.015;
    b.mcq({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: "The frequency of a spectral line received from a galaxy is 1.5% lower than its laboratory value. What is the galaxy's speed of recession?",
      options: [
        [t`$${sciTex(frac * c, 2)}\ \text{m s}^{-1}$`, "Correct: Δf/f ≈ v/c, so v = 0.015 × 3.00 × 10⁸."],
        [t`$${sciTex(1.5 * c, 2)}\ \text{m s}^{-1}$`, "1.5% is 0.015, not 1.5; this would be faster than light."],
        [t`$${sciTex((frac * c) / 2, 2)}\ \text{m s}^{-1}$`, "There is no factor of one half: Δf/f ≈ v/c."],
        [t`$${sciTex(c / frac, 2)}\ \text{m s}^{-1}$`, "This divides c by the fraction."],
      ],
      answer: "A",
      explanation: t`$v = c\,\dfrac{\Delta f}{f} = 3.00 \times 10^{8} \times 0.015 = ${sciTex(frac * c, 2)}\ \text{m s}^{-1}$, away from the Earth.`,
      hints: ["Write 1.5% as a decimal."],
    });
  }
  b.num({
    d: 2, skill: "APPLICATION", calculator: true, daily: true,
    stem: t`The spectral lines from a galaxy show $\Delta\lambda/\lambda = 0.020$. Calculate its speed of recession, in $\text{m s}^{-1}$, to two significant figures.`,
    value: 0.02 * c, sf: 2, unit: "m/s", wrong: [c / 0.02, 0.02],
    explanation: t`$v = c\,\dfrac{\Delta\lambda}{\lambda} = 3.00 \times 10^{8} \times 0.020 = ${sciTex(0.02 * c, 2)}\ \text{m s}^{-1}$.`,
  });
  {
    const v = 1.1e7;
    b.num({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A galaxy recedes at $1.1 \times 10^{7}\ \text{m s}^{-1}$. Taking $H_0 = 2.2 \times 10^{-18}\ \text{s}^{-1}$, calculate its distance, in m, to two significant figures.`,
      value: v / H0, sf: 2, unit: "m", wrong: [v * H0, H0 / v],
      explanation: t`$d = \dfrac{v}{H_0} = \dfrac{1.1 \times 10^{7}}{2.2 \times 10^{-18}} = ${sciTex(v / H0, 2)}\ \text{m}$.`,
      hints: ["Rearrange v = H₀d."],
    });
  }
  {
    const lam = 486.1, v = 8.4e6;
    const obs = lam * (1 + v / c);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`The hydrogen-beta line has a laboratory wavelength of $486.1\ \text{nm}$. A galaxy recedes at $8.4 \times 10^{6}\ \text{m s}^{-1}$. Calculate the wavelength at which the line is observed, in nm, to four significant figures.`,
      value: obs, sf: 4, unit: "nm", wrong: [lam * (1 - v / c), lam * (v / c)],
      explanation: t`1. $\Delta\lambda = \lambda\dfrac{v}{c} = 486.1 \times \dfrac{8.4 \times 10^{6}}{3.00 \times 10^{8}} = ${sfStr(lam * (v / c), 3)}\ \text{nm}$.
2. Observed wavelength $= 486.1 + ${sfStr(lam * (v / c), 3)} = ${sfStr(obs, 4)}\ \text{nm}$ (longer: redshift).`,
      hints: ["Find Δλ, then add it."],
    });
  }
  {
    const v = (c * (413.0 - 393.4)) / 393.4;
    const d = v / H0;
    b.calc({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: t`A calcium line of laboratory wavelength $393.4\ \text{nm}$ is observed at $413.0\ \text{nm}$ in the spectrum of a distant galaxy. Taking $H_0 = 2.2 \times 10^{-18}\ \text{s}^{-1}$, calculate the distance to the galaxy, in m, to two significant figures.`,
      value: d, sf: 2, unit: "m", wrong: [v * H0, (c * (413.0 / 393.4)) / H0],
      explanation: t`1. $v = 3.00 \times 10^{8} \times \dfrac{19.6}{393.4} = ${sciTex(v, 3)}\ \text{m s}^{-1}$.
2. $d = \dfrac{v}{H_0} = \dfrac{${sciTex(v, 3)}}{2.2 \times 10^{-18}} = ${sciTex(d, 2)}\ \text{m}$.`,
      hints: ["Find v from the redshift, then use Hubble's law."],
    });
  }
  {
    const age = 1 / H0;
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`Taking $H_0 = 2.2 \times 10^{-18}\ \text{s}^{-1}$, estimate the age of the Universe in years, to two significant figures. (1 year $= 3.16 \times 10^{7}\ \text{s}$)`,
      value: age / yr, sf: 2, unit: "years", wrong: [age, H0 * yr],
      explanation: t`1. $t \approx \dfrac{1}{H_0} = \dfrac{1}{2.2 \times 10^{-18}} = ${sciTex(age, 2)}\ \text{s}$.
2. $\dfrac{${sciTex(age, 2)}}{3.16 \times 10^{7}} = ${sciTex(age / yr, 2)}$ years.`,
      hints: ["Age ≈ 1/H₀ in seconds, then convert."],
    });
  }
  {
    const H = 68e3 / 3.09e22;
    b.calc({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: t`Astronomers often quote $H_0$ as $68\ \text{km s}^{-1}$ per megaparsec. Given that 1 megaparsec $= 3.09 \times 10^{22}\ \text{m}$, express $H_0$ in SI units ($\text{s}^{-1}$), to three significant figures.`,
      value: H, unit: "s⁻¹", wrong: [68 / 3.09e22, 68e3 * 3.09e22],
      explanation: t`1. $68\ \text{km s}^{-1} = 6.8 \times 10^{4}\ \text{m s}^{-1}$.
2. $H_0 = \dfrac{6.8 \times 10^{4}}{3.09 \times 10^{22}} = ${sciTex(H, 3)}\ \text{s}^{-1}$. Forgetting to convert km to m gives a value 1000 times too small.`,
      hints: ["Convert km to m."],
    });
  }
  b.num({
    d: 4, skill: "EVALUATION", calculator: false,
    stem: "For one galaxy, the distance is known to within ±10% and the recession speed to within ±2%. Calculate the percentage uncertainty in the value of H₀ found from this galaxy alone, in %.",
    value: 12, unit: "%", wrong: [10, 8],
    explanation: "H₀ = v/d is a quotient, so the percentage uncertainties add: 2% + 10% = 12%. The distance dominates; using many galaxies and a best-fit line reduces the effect of random errors.",
    hints: ["For a quotient, add percentage uncertainties."],
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Distant galaxies all recede from the Earth because the Earth is at the centre of the expanding Universe.",
    answer: false,
    explanation: "False. An observer in any galaxy would see the same thing: all distant galaxies receding with speed proportional to distance. The expansion has no centre.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each term with its meaning.",
    pairs: [
      ["Redshift", "Spectral lines shifted to longer wavelengths by recession"],
      ["Blueshift", "Spectral lines shifted to shorter wavelengths by approach"],
      ["Hubble constant", "Recession speed per unit distance"],
      [t`$1/H_0$`, "An estimate of the age of the Universe"],
      ["Big Bang", "The Universe expanding from an extremely hot, dense state"],
    ],
    explanation: "Key ideas of observational cosmology.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the argument.",
    template: "Almost all distant galaxies show a {{blank:a}}, so they are moving away from us. Their speed is proportional to their {{blank:b}}, so the Universe is {{blank:c}}. In the past the galaxies were closer together, which supports the Big Bang theory.",
    blanks: [
      { id: "a", accepted: ["redshift"], choices: ["redshift", "blueshift"] },
      { id: "b", accepted: ["distance"], choices: ["distance", "luminosity", "temperature"] },
      { id: "c", accepted: ["expanding"], choices: ["expanding", "contracting", "static"] },
    ],
    explanation: "Redshift → recession; v ∝ d → expansion → Big Bang.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain how observations of the light from distant galaxies led to the conclusion that the Universe began with a Big Bang.",
    points: [
      "Spectral lines from almost all distant galaxies are redshifted, so the galaxies are moving away from us.",
      "The redshift (recession speed) is proportional to distance (Hubble's law, v ≈ H₀d).",
      "So the Universe is expanding: galaxies are all moving apart from one another, with no centre.",
      "Going back in time, the galaxies were closer together, so the Universe began from a very hot, dense state (the Big Bang) about 1/H₀ ago.",
    ],
    modelAnswer: "The spectral lines of almost all distant galaxies are shifted to longer wavelengths, so the galaxies are receding. Measurements show that the recession speed is roughly proportional to distance, v ≈ H₀d. This means that the Universe is expanding, every galaxy moving away from every other. Running the expansion backwards, the galaxies were closer together in the past, and all the matter was once in an extremely hot, dense state from which the Universe has been expanding: the Big Bang, about 1/H₀ ago.",
    explanation: "Redshift → recession → v ∝ d → expansion → common origin.",
    hints: ["Link each observation to the next step."],
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 3,
    stem: "Show that 1/H₀ gives an estimate of the age of the Universe, and state the assumption made.",
    points: [
      "A galaxy at distance d moving at constant speed v would have taken time t = d/v to travel from a common starting point.",
      "Hubble's law v = H₀d gives t = d/(H₀d) = 1/H₀, the same for every galaxy, so they all started together.",
      "Assumption: the speed of expansion has been constant (in fact it has changed), so 1/H₀ is only an estimate.",
    ],
    modelAnswer: "If a galaxy now at distance d has always moved at speed v, it left the common starting point a time t = d/v ago. Using v = H₀d, t = d/(H₀d) = 1/H₀, the same for every galaxy, so all would have been together 1/H₀ ago. This assumes the rate of expansion has been constant, which is not exactly true, so it is an estimate.",
    explanation: "t = d/v = 1/H₀ if the speed has been constant.",
    hints: ["Time = distance ÷ speed."],
  });

  // Practice structured: a Hubble diagram (12 marks)
  {
    const lam0 = 656.3;
    const ds = [0.8, 1.6, 2.5, 3.3, 4.4].map((x) => x * 1e24);
    const noise = [0.05, -0.08, 0.06, -0.04, 0.07];
    const obs = ds.map((d, i) => Math.round((lam0 * (1 + (H0 * d) / c) + noise[i]) * 10) / 10);
    const vs = obs.map((o) => (c * (o - lam0)) / lam0);
    const fit = linFit(ds, vs);
    const age = 1 / fit.m;
    b.struct({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`Tendai uses published data for five galaxies. Their distances were found from standard candles, and the hydrogen-alpha line (laboratory wavelength $656.3\ \text{nm}$) was observed at the wavelengths shown. (1 year $= 3.16 \times 10^{7}\ \text{s}$)

${table(["Galaxy", t`$d\,/\,10^{24}\ \text{m}$`, t`$\lambda_{\text{obs}}\,/\,\text{nm}$`], ds.map((d, i) => [String(i + 1), dpStr(d / 1e24, 1), dpStr(obs[i], 1)]))}`,
      parts: [
        P.num({ label: "(a)", marks: 2, stem: "Calculate the recession speed of galaxy 3, in m s⁻¹, to two significant figures.", value: vs[2], sf: 2, unit: "m/s", wrong: [(c * obs[2]) / lam0], explanation: t`$v = 3.00 \times 10^{8} \times \dfrac{${dpStr(obs[2], 1)} - 656.3}{656.3} = ${sciTex(vs[2], 2)}\ \text{m s}^{-1}$.` }),
        P.manual({ label: "(b)", marks: 1, stem: "State the graph Tendai should plot to test Hubble's law and how H₀ is found from it.", points: ["Plot v against d: a straight line through the origin supports Hubble's law; H₀ = gradient."], modelAnswer: "Plot recession speed v against distance d; if Hubble's law holds the points lie on a straight line through the origin and H₀ is its gradient." }),
        P.num({ label: "(c)", marks: 3, stem: "Calculate v for every galaxy, plot the graph and determine H₀ from the gradient of the best-fit line, in s⁻¹.", value: fit.m, tol: 0.15e-18, unit: "s⁻¹", wrong: [1 / fit.m], explanation: t`Speeds: ${vs.map((v) => sciTex(v, 2)).join(", ")} m s⁻¹. Best-fit gradient $\approx ${sciTex(fit.m, 2)}\ \text{s}^{-1}$.` }),
        P.num({ label: "(d)", marks: 2, stem: "Use your value of H₀ to estimate the age of the Universe, in s.", value: age, tol: 0.03e18, unit: "s", wrong: [fit.m], explanation: t`$t \approx \dfrac{1}{H_0} = \dfrac{1}{${sciTex(fit.m, 2)}} \approx ${sciTex(age, 2)}\ \text{s}$.` }),
        P.num({ label: "(e)", marks: 2, stem: "Express this age in years.", value: age / yr, tol: 0.1e10, unit: "years", wrong: [age], explanation: t`$\dfrac{${sciTex(age, 2)}}{3.16 \times 10^{7}} \approx ${sciTex(age / yr, 2)}$ years.` }),
        P.manual({ label: "(f)", marks: 2, stem: "Suggest why the points do not lie exactly on a straight line, and why 1/H₀ is only an estimate of the age.", points: [
          "Galaxies have their own random (peculiar) motions as well as the expansion / the distances from standard candles are uncertain.",
          "1/H₀ assumes the expansion rate has been constant, which it has not.",
        ], modelAnswer: "Each galaxy has its own random motion in addition to the expansion, and the standard-candle distances have uncertainties, so the points scatter. 1/H₀ assumes the expansion has always proceeded at the same rate, which is not true, so it only estimates the age." }),
      ],
      explanation: "v = cΔλ/λ for each galaxy; H₀ = gradient of v against d; age ≈ 1/H₀.",
      hints: ["Δλ = λ_obs − 656.3 nm.", "Gradient = Δv/Δd."],
    });
  }
  // Practice structured: one distant galaxy (8 marks)
  {
    const lam0 = 121.6, obs = 129.2;
    const v = (c * (obs - lam0)) / lam0;
    const d = v / H0;
    b.struct({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`An ultraviolet hydrogen line with a laboratory wavelength of $121.6\ \text{nm}$ is observed at $129.2\ \text{nm}$ in the spectrum of a quasar-hosting galaxy, measured by a telescope in orbit. Take $H_0 = 2.2 \times 10^{-18}\ \text{s}^{-1}$ and 1 light-year $= 9.46 \times 10^{15}\ \text{m}$.`,
      parts: [
        P.num({ label: "(a)", marks: 2, stem: "Calculate the galaxy's recession speed, in m s⁻¹, to two significant figures.", value: v, sf: 2, unit: "m/s", wrong: [(c * obs) / lam0], explanation: t`$v = 3.00 \times 10^{8} \times \dfrac{7.6}{121.6} = ${sciTex(v, 2)}\ \text{m s}^{-1}$.` }),
        P.num({ label: "(b)", marks: 2, stem: "Calculate its distance in light-years, to two significant figures.", value: d / 9.46e15, sf: 2, unit: "light-years", wrong: [d], explanation: t`$d = \dfrac{v}{H_0} = ${sciTex(d, 2)}\ \text{m} = ${sciTex(d / 9.46e15, 2)}$ light-years.` }),
        P.manual({ label: "(c)", marks: 2, stem: "Explain why this line must be observed from a telescope in orbit.", points: [
          "The line is in the ultraviolet (about 122-129 nm).",
          "Ultraviolet radiation of this wavelength is absorbed by the Earth's atmosphere, so it does not reach ground-based telescopes.",
        ], modelAnswer: "At about 122 to 129 nm the line is in the ultraviolet, which is absorbed by the Earth's atmosphere, so it can only be observed from above the atmosphere." }),
        P.manual({ label: "(d)", marks: 2, stem: "Explain why the formula Δλ/λ ≈ v/c may be used here, but would not be suitable for a galaxy whose lines are shifted to twice their laboratory wavelengths.", points: [
          "Here v/c ≈ 0.06, much less than 1, so the approximation is valid.",
          "A shift to twice the wavelength gives Δλ/λ = 1, i.e. v ≈ c: the formula is valid only for v ≪ c (a relativistic treatment is needed).",
        ], modelAnswer: "Here Δλ/λ is only about 0.06, so v is much less than c and the formula holds. If the wavelength doubled, Δλ/λ = 1 would imply v = c, where the simple formula, valid only for v much less than c, breaks down." }),
      ],
      explanation: "v = cΔλ/λ; d = v/H₀; the approximation needs v ≪ c.",
      hints: ["Δλ = 129.2 − 121.6 nm."],
    });
  }

  b.card("DEFINITION", "**Redshift**", "The increase in wavelength (decrease in frequency) of radiation from a receding source; spectral lines shift towards longer wavelengths.");
  b.card("FORMULA", "Redshift and speed", t`$\dfrac{\Delta\lambda}{\lambda} \approx \dfrac{\Delta f}{f} \approx \dfrac{v}{c}$ (for $v \ll c$)`);
  b.card("DEFINITION", "**Hubble's law**", "The recession speed of a distant galaxy is approximately proportional to its distance.");
  b.card("FORMULA", "Hubble's law", t`$v \approx H_0d$; $H_0 \approx 2 \times 10^{-18}\ \text{s}^{-1}$ (SI)`);
  b.card("CONCEPT", "Evidence for expansion", "Almost all distant galaxies are redshifted, and the redshift increases with distance.");
  b.card("CONCEPT", "No centre", "Every observer sees all distant galaxies receding with v ∝ d; the expansion has no centre.");
  b.card("CONCEPT", "The Big Bang", "Galaxies were closer in the past; the Universe began in an extremely hot, dense state and has been expanding since.");
  b.card("FORMULA", "Age of the Universe", t`$t \approx \dfrac{1}{H_0} \approx 4 \times 10^{17}\ \text{s} \approx 14$ billion years (assumes constant expansion rate)`);
  b.card("CONCEPT", "Blueshift", "Lines shifted to shorter wavelengths: the source is approaching (some nearby galaxies, e.g. Andromeda).");
});
