// W4b: aphys.astro.stellar-radii (Cambridge A Level only, 25.2) — Wien's displacement law, the Stefan-Boltzmann law
// L = 4πσr²T⁴, estimating stellar radii, comparing stars by temperature and size.
import { concept, P, t, chk, sfStr, sciTex, table, DATA, luminosity } from "../lib.mjs";

const W = 2.9e-3;
const { sigma } = DATA;
const radius = (L, T) => Math.sqrt(L / (4 * Math.PI * sigma * T ** 4));
const Lsun = 3.83e26, Rsun = 6.96e8;

concept("aphys.astro.stellar-radii", { file: "astro/stellar-radii", keyPrefix: "astro.stellar-radii" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which statement is Wien's displacement law?",
    options: [
      ["The wavelength of maximum emission of a black body is inversely proportional to its thermodynamic temperature.", "Correct: λ_max T = constant."],
      ["The power radiated per unit area of a black body is proportional to the fourth power of its temperature.", "That is the Stefan-Boltzmann law."],
      ["The wavelength of maximum emission of a black body is proportional to its thermodynamic temperature.", "Hotter bodies peak at shorter, not longer, wavelengths."],
      ["The radiant flux intensity from a star is inversely proportional to the square of its distance.", "That is the inverse-square law."],
    ],
    answer: "A",
    explanation: "Wien: λ_max ∝ 1/T.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "Star P has twice the surface temperature of star Q. What is the ratio of the peak wavelength of P to that of Q?",
    options: [
      ["0.5", "Correct: λ_max ∝ 1/T."],
      ["2", "A hotter star has a shorter peak wavelength."],
      ["0.0625", "This is 1/2⁴; the fourth power belongs to the Stefan-Boltzmann law."],
      ["16", "2⁴ applies to the power per unit area, not to the peak wavelength."],
    ],
    answer: "A",
    explanation: "λ_P/λ_Q = T_Q/T_P = 1/2.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which of these stars has the highest surface temperature?",
    options: [
      ["A blue-white star", "Correct: its spectrum peaks at the shortest wavelength."],
      ["A yellow star like the Sun", "The Sun (about 5800 K) is cooler than blue-white stars."],
      ["An orange star", "Orange stars are cooler than the Sun."],
      ["A red star", "Red stars are the coolest: their peak is in the infrared."],
    ],
    answer: "A",
    explanation: "Shorter λ_max means higher T (Wien's law).",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Two stars have the same luminosity. Star X has three times the surface temperature of star Y. What is the ratio of the radius of X to the radius of Y?",
    options: [
      ["1/9", "Correct: L ∝ r²T⁴ with L equal, so r ∝ 1/T² = 1/3²."],
      ["1/3", "The radius depends on 1/T², not 1/T."],
      ["1/81", "This is 1/T⁴; take the square root to find r."],
      ["9", "The hotter star must be smaller to have the same luminosity."],
    ],
    answer: "A",
    explanation: "r² ∝ L/T⁴; equal L gives r ∝ T⁻², so r_X/r_Y = 1/9.",
    hints: ["Rearrange L = 4πσr²T⁴ for r."],
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A star's surface temperature doubles while its radius stays the same. By what factor does its luminosity change?",
    options: [
      ["16", "Correct: L ∝ T⁴."],
      ["2", "The power radiated depends on T⁴, not T."],
      ["4", "This is T²; the Stefan-Boltzmann law has T⁴."],
      ["8", "This is T³."],
    ],
    answer: "A",
    explanation: "L = 4πσr²T⁴: 2⁴ = 16.",
    hints: ["Which power of T appears in the law?"],
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "What is the SI unit of the Stefan-Boltzmann constant σ?",
    options: [
      [t`$\text{W m}^{-2}\ \text{K}^{-4}$`, "Correct: σ = L/(4πr²T⁴)."],
      [t`$\text{W m}^{2}\ \text{K}^{4}$`, "σ multiplies r² and T⁴, so it must divide by them."],
      [t`$\text{m K}$`, "That is the unit of the Wien constant."],
      [t`$\text{J K}^{-1}$`, "That is the unit of the Boltzmann constant."],
    ],
    answer: "A",
    explanation: t`$\sigma = \dfrac{L}{4\pi r^{2}T^{4}}$: $\dfrac{\text{W}}{\text{m}^{2}\ \text{K}^{4}}$.`,
    hints: ["Rearrange L = 4πσr²T⁴ for σ."],
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "A star is much hotter than the Sun but has a much lower luminosity. What can be concluded?",
    options: [
      ["It is much smaller than the Sun.", "Correct: high T and low L require a small surface area (a white dwarf)."],
      ["It is much larger than the Sun.", "A large, hot star would be extremely luminous."],
      ["It is much further away than the Sun.", "Luminosity does not depend on distance; flux does."],
      ["It must not be a black body.", "The laws apply approximately; the conclusion is about its size."],
    ],
    answer: "A",
    explanation: "L = 4πσr²T⁴: large T⁴ with small L means r² is very small.",
    hints: ["Use L ∝ r²T⁴."],
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "The surface temperature of a star is known to within ±5% and its luminosity very precisely. What is the percentage uncertainty in its calculated radius?",
    options: [
      ["±10%", "Correct: r ∝ T⁻², so 2 × 5%."],
      ["±5%", "The temperature appears as T², so its uncertainty is doubled."],
      ["±20%", "T⁴ appears inside a square root, giving a factor of 2, not 4."],
      ["±2.5%", "The power is −2, so the uncertainty is multiplied by 2, not halved."],
    ],
    answer: "A",
    explanation: "r = √(L/4πσT⁴) ∝ T⁻²: percentage uncertainty = 2 × 5% = 10%.",
    hints: ["What power of T is r proportional to?"],
  });
  {
    const lam = 3.8e-7;
    b.num({
      d: 2, skill: "APPLICATION", calculator: true, daily: true,
      stem: t`The spectrum of a star peaks at $380\ \text{nm}$. Using Wien's law with $\lambda_{\max}T = 2.9 \times 10^{-3}\ \text{m K}$, calculate its surface temperature, in K, to three significant figures.`,
      value: W / lam, unit: "K", wrong: [W / 380, lam / W],
      explanation: t`$T = \dfrac{2.9 \times 10^{-3}}{3.8 \times 10^{-7}} = ${sfStr(W / lam, 3)}\ \text{K}$. Convert nm to m first.`,
    });
  }
  {
    const T = 9500;
    b.num({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A star has a surface temperature of $9500\ \text{K}$. Calculate the wavelength at which its spectrum peaks, in nm, to three significant figures. ($\lambda_{\max}T = 2.9 \times 10^{-3}\ \text{m K}$)`,
      value: (W / T) * 1e9, unit: "nm", wrong: [W * T, (W / T) * 1e6],
      explanation: t`$\lambda_{\max} = \dfrac{2.9 \times 10^{-3}}{9500} = ${sciTex(W / T)}\ \text{m} = ${sfStr((W / T) * 1e9, 3)}\ \text{nm}$, in the ultraviolet.`,
      hints: ["λ_max = constant / T."],
    });
  }
  {
    const r = 1.4e9, T = 8200;
    const L = luminosity(r, T);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A star has radius $1.4 \times 10^{9}\ \text{m}$ and surface temperature $8200\ \text{K}$. Calculate its luminosity, in W, to two significant figures.`,
      value: L, sf: 2, unit: "W", wrong: [Math.PI * r * r * sigma * T ** 4, 4 * Math.PI * r * r * sigma * T ** 2],
      explanation: t`1. $L = 4\pi\sigma r^{2}T^{4} = 4\pi \times 5.67 \times 10^{-8} \times (1.4 \times 10^{9})^{2} \times 8200^{4}$.
2. $L = ${sciTex(L, 2)}\ \text{W}$, about ${sfStr(L / Lsun, 2)} times the Sun's luminosity.`,
      hints: ["Surface area is 4πr²."],
    });
  }
  {
    const L = 5.4e27, lam = 4.1e-7;
    const T = W / lam;
    const r = radius(L, T);
    b.calc({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: t`A star of luminosity $5.4 \times 10^{27}\ \text{W}$ has a spectrum that peaks at $410\ \text{nm}$. Calculate its radius, in m, to two significant figures. ($\lambda_{\max}T = 2.9 \times 10^{-3}\ \text{m K}$)`,
      value: r, sf: 2, unit: "m", wrong: [radius(L, T) ** 2, Math.sqrt(L / (Math.PI * sigma * T ** 4))],
      explanation: t`1. $T = \dfrac{2.9 \times 10^{-3}}{4.1 \times 10^{-7}} = ${sfStr(T, 3)}\ \text{K}$.
2. $r = \sqrt{\dfrac{L}{4\pi\sigma T^{4}}} = \sqrt{\dfrac{5.4 \times 10^{27}}{4\pi \times 5.67 \times 10^{-8} \times ${sfStr(T, 3)}^{4}}} = ${sciTex(r, 2)}\ \text{m}$, about ${sfStr(r / Rsun, 2)} solar radii.`,
      hints: ["Find T from Wien's law first."],
    });
  }
  {
    const Lr = 40, Tr = 0.5;
    const rr = Math.sqrt(Lr) / Tr ** 2;
    b.calc({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: "Star X is 40 times as luminous as star Y, but its surface temperature is half that of Y. Calculate the ratio (radius of X)/(radius of Y), to three significant figures.",
      value: rr, wrong: [Math.sqrt(Lr) / Tr, Lr / Tr ** 4],
      explanation: t`1. $r \propto \dfrac{\sqrt{L}}{T^{2}}$.
2. $\dfrac{r_X}{r_Y} = \dfrac{\sqrt{40}}{0.5^{2}} = \dfrac{${sfStr(Math.sqrt(Lr), 3)}}{0.25} = ${sfStr(rr, 3)}$: X is a giant.`,
      hints: ["Write r in terms of L and T, then use ratios."],
    });
  }
  {
    const lam = 520, dlam = 20;
    const pT = (dlam / lam) * 100;
    b.num({
      d: 4, skill: "EVALUATION", calculator: true,
      stem: t`The peak of a star's spectrum is estimated as $520 \pm 20\ \text{nm}$. Its luminosity is known precisely. Calculate the percentage uncertainty in the radius found using Wien's law and the Stefan-Boltzmann law, in %, to two significant figures.`,
      value: 2 * pT, sf: 2, unit: "%", wrong: [pT, 4 * pT],
      explanation: t`$T \propto 1/\lambda_{\max}$, so $T$ has the same percentage uncertainty: $\dfrac{20}{520} \times 100 = ${sfStr(pT, 2)}\%$. $r \propto T^{-2}$, so $2 \times ${sfStr(pT, 2)} = ${sfStr(2 * pT, 2)}\%$.`,
      hints: ["r ∝ T⁻² and T ∝ 1/λ_max, so r ∝ λ_max²."],
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A cool red star can never be more luminous than a hot blue star.",
    answer: false,
    explanation: "False. L = 4πσr²T⁴: a cool star with a very large radius (a red giant or supergiant) can be far more luminous than a small hot star.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each comparison between two stars with the relationship that follows from L = 4πσr²T⁴.",
    pairs: [
      ["Equal luminosity", t`$r \propto 1/T^{2}$`],
      ["Equal radius", t`$L \propto T^{4}$`],
      ["Equal temperature", t`$L \propto r^{2}$`],
      ["Equal peak wavelength", "Equal surface temperature"],
    ],
    explanation: "Hold one quantity constant and read off the proportionality; equal λ_max means equal T by Wien's law.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the statements.",
    template: "As the temperature of a black body increases, the peak of its spectrum moves to {{blank:a}} wavelengths, and the total power it radiates per unit area is proportional to the {{blank:b}} power of its thermodynamic temperature.",
    blanks: [
      { id: "a", accepted: ["shorter"], choices: ["shorter", "longer"] },
      { id: "b", accepted: ["fourth"], choices: ["fourth", "second", "first"] },
    ],
    explanation: "Wien: λ_max ∝ 1/T; Stefan-Boltzmann: power per unit area ∝ T⁴.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe how the radius of a distant star can be estimated from observations.",
    points: [
      "Measure the spectrum and find the peak wavelength λ_max.",
      "Use Wien's law (λ_max T = constant) to find the surface temperature T.",
      "Find the luminosity L, e.g. from the measured flux F and the distance d (L = 4πd²F) or from a standard candle relation.",
      "Use the Stefan-Boltzmann law L = 4πσr²T⁴ to calculate r = √(L/4πσT⁴).",
    ],
    modelAnswer: "Record the star's spectrum and find the wavelength of peak intensity. Wien's law, λ_max T = 2.9 × 10⁻³ m K, then gives the surface temperature. Find the luminosity, for example from the measured radiant flux intensity and a known distance using L = 4πd²F. Finally rearrange the Stefan-Boltzmann law, L = 4πσr²T⁴, to give r = √(L/4πσT⁴).",
    explanation: "Spectrum → T; flux and distance → L; Stefan-Boltzmann → r.",
    hints: ["Which law gives T, and which gives r?"],
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 3,
    stem: "A red giant has a lower surface temperature than the Sun but is thousands of times more luminous. Explain how this is possible.",
    points: [
      "L = 4πσr²T⁴: luminosity depends on surface area as well as temperature.",
      "Lower T means each square metre radiates less (σT⁴ smaller).",
      "So the red giant must have a much larger radius / surface area, which more than makes up for this.",
    ],
    modelAnswer: "A star's luminosity is L = 4πσr²T⁴, so it depends on its surface area as well as its temperature. Being cooler, each square metre of the red giant radiates less than the Sun's surface, but its radius is so much larger that its enormous surface area more than makes up for this.",
    explanation: "Area beats temperature.",
    hints: ["Consider both factors in L = 4πσr²T⁴."],
  });

  // Practice structured: estimating a star's size from observations (12 marks)
  {
    const F = 2.4e-9, d = 8.5e17, lam = 6.5e-7;
    const L = 4 * Math.PI * d * d * F;
    const T = W / lam;
    const r = radius(L, T);
    b.struct({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: t`Rudo analyses observations of an orange star. Its radiant flux intensity at the Earth is $2.4 \times 10^{-9}\ \text{W m}^{-2}$, its distance is known to be $8.5 \times 10^{17}\ \text{m}$, and its spectrum peaks at $650\ \text{nm}$. ($\lambda_{\max}T = 2.9 \times 10^{-3}\ \text{m K}$; radius of the Sun $= 6.96 \times 10^{8}\ \text{m}$)`,
      parts: [
        P.manual({ label: "(a)", marks: 1, stem: "State Wien's displacement law.", points: ["The wavelength at which a black body emits maximum intensity is inversely proportional to its thermodynamic temperature."], modelAnswer: "The wavelength of maximum emission from a black body is inversely proportional to its thermodynamic temperature." }),
        P.num({ label: "(b)", marks: 2, stem: "Calculate the luminosity of the star, in W, to two significant figures.", value: L, sf: 2, unit: "W", wrong: [F * d * d], explanation: t`$L = 4\pi d^{2}F = 4\pi (8.5 \times 10^{17})^{2} \times 2.4 \times 10^{-9} = ${sciTex(L, 2)}\ \text{W}$.` }),
        P.num({ label: "(c)", marks: 2, stem: "Calculate its surface temperature, in K, to two significant figures.", value: T, sf: 2, unit: "K", wrong: [W / 650], explanation: t`$T = \dfrac{2.9 \times 10^{-3}}{6.5 \times 10^{-7}} = ${sfStr(T, 2)}\ \text{K}$.` }),
        P.num({ label: "(d)", marks: 3, stem: "Calculate its radius, in m, to two significant figures.", value: r, sf: 2, unit: "m", wrong: [r * r], explanation: t`$r = \sqrt{\dfrac{${sciTex(L, 2)}}{4\pi \times 5.67 \times 10^{-8} \times ${sfStr(T, 3)}^{4}}} = ${sciTex(r, 2)}\ \text{m}$.` }),
        P.num({ label: "(e)", marks: 1, stem: "Express the radius as a multiple of the Sun's radius, to two significant figures.", value: r / Rsun, sf: 2, wrong: [Rsun / r], explanation: t`$\dfrac{${sciTex(r, 2)}}{6.96 \times 10^{8}} = ${sfStr(r / Rsun, 2)}$.` }),
        P.manual({ label: "(f)", marks: 3, stem: "Explain why the star appears orange, and suggest two reasons why the radius calculated is only an estimate.", points: [
          "Its temperature (about 4500 K) is lower than the Sun's, so its peak (650 nm) is towards the red end of the visible spectrum; its light is weighted to orange-red.",
          "The star is not a perfect black body / absorption lines and the atmosphere distort the spectrum, so λ_max (and so T) is uncertain; r ∝ T⁻² doubles this uncertainty.",
          "The distance (and so L) is uncertain, and interstellar dust reduces F.",
        ], modelAnswer: "At about 4500 K the star is cooler than the Sun, so its spectrum peaks at 650 nm, near the red end of the visible spectrum, and it looks orange. The result is an estimate because the star is not a perfect black body, so λ_max and T are uncertain (and r ∝ T⁻² doubles that uncertainty), and because the distance and the measured flux, which may be reduced by dust, are uncertain too." }),
      ],
      explanation: "L from flux and distance; T from Wien; r from Stefan-Boltzmann.",
      hints: ["L = 4πd²F.", "r = √(L/4πσT⁴)."],
    });
    chk(T > 4400 && T < 4500 ? 1 : 0, 1);
  }
  // Practice structured: comparing three stars (8 marks)
  {
    const stars = [
      { name: "A", lam: 290, Lrel: 1.0 },
      { name: "B", lam: 580, Lrel: 1.0 },
      { name: "C", lam: 580, Lrel: 100 },
    ];
    const T = stars.map((s) => W / (s.lam * 1e-9));
    const rAB = Math.sqrt(stars[0].Lrel / stars[1].Lrel) * (T[1] / T[0]) ** 2;
    const rCB = Math.sqrt(stars[2].Lrel / stars[1].Lrel);
    b.struct({
      d: 3, skill: "ANALYSIS", calculator: true,
      stem: t`The table compares three stars. Luminosities are given relative to star B.

${table(["Star", t`$\lambda_{\max}\,/\,\text{nm}$`, "Relative luminosity"], stars.map((s) => [s.name, String(s.lam), String(s.Lrel)]))}`,
      parts: [
        P.num({ label: "(a)", marks: 2, stem: "Calculate the surface temperature of star A, in K. (λ_max T = 2.9 × 10⁻³ m K)", value: T[0], unit: "K", wrong: [W / 290], explanation: t`$T = \dfrac{2.9 \times 10^{-3}}{2.90 \times 10^{-7}} = ${sfStr(T[0], 3)}\ \text{K}$.` }),
        P.num({ label: "(b)", marks: 2, stem: "Calculate the ratio (radius of A)/(radius of B).", value: rAB, wrong: [T[1] / T[0], 1], explanation: t`Equal luminosity, so $r \propto 1/T^{2}$; $T_A = 2T_B$, so $r_A/r_B = 1/4 = ${sfStr(rAB, 3)}$.` }),
        P.num({ label: "(c)", marks: 2, stem: "Calculate the ratio (radius of C)/(radius of B).", value: rCB, wrong: [100], explanation: t`Equal temperature, so $L \propto r^{2}$: $r_C/r_B = \sqrt{100} = ${rCB}$.` }),
        P.manual({ label: "(d)", marks: 2, stem: "Suggest what type of star A and C might be, giving a reason for each.", points: [
          "A: hot but no more luminous than B, so small: a white dwarf (or small hot star).",
          "C: same temperature as B but 100 times as luminous, so 10 times larger: a giant.",
        ], modelAnswer: "A is twice as hot as B but no more luminous, so it must be small, like a white dwarf. C has the same temperature as B but is 100 times as luminous, so it has 10 times the radius: a giant." }),
      ],
      explanation: "Use ratios from L ∝ r²T⁴ and λ_max ∝ 1/T.",
      hints: ["Which quantity is the same for each pair?"],
    });
  }

  b.card("DEFINITION", "**Black body**", "An idealised object that absorbs all radiation and emits a continuous spectrum depending only on its temperature; stars are close to black bodies.");
  b.card("DEFINITION", "**Wien's displacement law**", "The peak wavelength of black-body emission is inversely proportional to the thermodynamic temperature.");
  b.card("FORMULA", "Wien's law", t`$\lambda_{\max}T \approx 2.9 \times 10^{-3}\ \text{m K}$`);
  b.card("FORMULA", "Stefan-Boltzmann law", t`$L = 4\pi\sigma r^{2}T^{4}$, $\sigma = 5.67 \times 10^{-8}\ \text{W m}^{-2}\ \text{K}^{-4}$`);
  b.card("FORMULA", "Radius of a star", t`$r = \sqrt{\dfrac{L}{4\pi\sigma T^{4}}}$`);
  b.card("CONCEPT", "Method for stellar radius", "Peak wavelength → T (Wien); flux and distance → L; Stefan-Boltzmann → r.");
  b.card("CONCEPT", "Comparing stars", "Equal L: r ∝ 1/T². Equal r: L ∝ T⁴. Equal T: L ∝ r².");
  b.card("FACT", "Star colours", "Red (coolest, about 3000 K) → orange → yellow (Sun, about 5800 K) → white → blue (hottest).");
  b.card("CONCEPT", "Giants and white dwarfs", "Cool but very luminous → huge radius (giant). Hot but faint → tiny radius (white dwarf).");
});
