// W4a: aphys.quantum.photons — photon model, E = hf = hc/λ, the electronvolt, p = E/c, photons per second, LED
// estimate of h (practical link).
import { concept, P, t, chk, DATA, sfStr, dpStr, sciTex, sciPlain, pctUnc, linFit, table, photonEnergy, JtoeV } from "../lib.mjs";

const { h, c, e } = DATA;

concept("aphys.quantum.photons", { file: "quantum/photons", keyPrefix: "quantum.photons" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is a photon?",
    options: [
      ["a quantum of electromagnetic energy", "Correct: a discrete packet of energy hf."],
      ["a particle of light with a rest mass of about 1 u", "Photons have no rest mass."],
      ["an electron emitted when light falls on a metal", "That is a photoelectron."],
      ["the smallest charge carried by light", "Photons are uncharged."],
    ],
    answer: "A",
    explanation: "A photon is a quantum of electromagnetic radiation, with energy E = hf.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which unit is equivalent to the unit of the Planck constant?",
    options: [
      ["J s", "Correct: h = E/f, so J ÷ s⁻¹ = J s."],
      [t`$\text{J s}^{-1}$`, "This is the watt; h = E/f, and dividing by Hz multiplies by s."],
      [t`$\text{J Hz}$`, "h = E/f: joules divided by hertz, not multiplied."],
      [t`$\text{kg m s}^{-1}$`, "This is the unit of momentum; h also equals pλ, which gives kg m² s⁻¹."],
    ],
    answer: "A",
    explanation: "h = E/f: J/Hz = J s (equivalently kg m² s⁻¹).",
  });
  {
    const E = photonEnergy(500e-9);
    b.mcq({
      d: 2, skill: "APPLICATION", daily: true, calculator: true,
      stem: t`What is the energy of a photon of wavelength $500\ \text{nm}$?`,
      options: [
        [t`$${sciTex(E)}\ \text{J}$`, "Correct: hc/λ."],
        [t`$${sciTex((h * c) / 500)}\ \text{J}$`, "The wavelength was left in nm; convert to metres."],
        [t`$${sciTex(h / 500e-9)}\ \text{J}$`, "h/λ is the photon's momentum, not its energy."],
        [t`$${sciTex(h * 500e-9 * c)}\ \text{J}$`, "E = hc/λ: divide by λ."],
      ],
      answer: "A",
      explanation: t`$E = \dfrac{hc}{\lambda} = \dfrac{6.63 \times 10^{-34} \times 3.00 \times 10^{8}}{500 \times 10^{-9}} = ${sciTex(E)}\ \text{J}$ (${sfStr(JtoeV(E), 3)} eV).`,
    });
  }
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "The intensity of a monochromatic light beam is doubled without changing its wavelength. What happens?",
    options: [
      ["The number of photons per second doubles; the energy of each photon is unchanged.", "Correct."],
      ["The energy of each photon doubles; the number per second is unchanged.", "Photon energy depends only on frequency."],
      ["Both the number of photons per second and the energy of each photon double.", "Only the number changes."],
      ["The frequency of the photons doubles.", "The wavelength, and so the frequency, is unchanged."],
    ],
    answer: "A",
    explanation: "Intensity ∝ (photons per second per unit area) × hf; with f fixed, the photon rate doubles.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`A photon has an energy of $2.5\ \text{eV}$. What is its wavelength?`,
    options: [
      [t`$${sciTex((h * c) / (2.5 * e))}\ \text{m}$`, "Correct: λ = hc/E with E in joules."],
      [t`$${sciTex((h * c) / 2.5)}\ \text{m}$`, "The energy must be converted from eV to J first."],
      [t`$${sciTex(h / (2.5 * e))}\ \text{m}$`, "The speed of light is missing: λ = hc/E."],
      [t`$${sciTex((h * c) / (2.5 / e))}\ \text{m}$`, "Multiply eV by 1.60 × 10⁻¹⁹ to get joules; do not divide."],
    ],
    answer: "A",
    explanation: t`$E = 2.5 \times 1.60 \times 10^{-19} = 4.0 \times 10^{-19}\ \text{J}$; $\lambda = hc/E = ${sciTex((h * c) / (2.5 * e))}\ \text{m} = ${sfStr(((h * c) / (2.5 * e)) * 1e9, 3)}\ \text{nm}$.`,
    hints: ["Convert eV to J first."],
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A graph is plotted of photon energy E (y-axis) against frequency f (x-axis) for electromagnetic radiation. What is the gradient?",
    options: [
      ["h", "Correct: E = hf, a straight line through the origin."],
      ["hc", "hc is the gradient of E against 1/λ."],
      ["c", "c relates f and λ, not E and f."],
      ["1/h", "That would be the gradient of f against E."],
    ],
    answer: "A",
    explanation: "E = hf: gradient h, through the origin.",
    hints: ["Compare E = hf with y = mx."],
  });
  {
    const l1 = 400e-9, l2 = 800e-9;
    b.mcq({
      d: 3, skill: "APPLICATION",
      stem: "Two lamps emit the same power. Lamp X emits light of wavelength 400 nm and lamp Y emits infrared of wavelength 800 nm. What is the ratio (photons emitted per second by Y) ÷ (photons emitted per second by X)?",
      options: [
        ["2", "Correct: each Y photon has half the energy, so twice as many are needed."],
        ["0.5", "Longer wavelength means lower photon energy, so more photons."],
        ["4", "N ∝ λ, not λ²."],
        ["1", "Equal power does not mean equal numbers of photons."],
      ],
      answer: "A",
      explanation: t`$N = P\lambda/(hc)$, so $N_Y/N_X = ${l2 * 1e9}/${l1 * 1e9} = 2$.`,
      hints: ["N = P/E and E ∝ 1/λ."],
    });
  }
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "A beam of light falls on a perfectly reflecting mirror at normal incidence instead of on a perfectly absorbing black surface. How does the force on the surface change?",
    options: [
      ["It doubles, because each photon's momentum is reversed rather than removed.", "Correct: change of momentum 2p per photon instead of p."],
      ["It halves, because the mirror sends the energy back.", "Reflection reverses the momentum, giving a larger change."],
      ["It is unchanged, because the same number of photons arrive at the surface each second.", "The momentum change per photon is doubled."],
      ["It becomes zero, because photons are not absorbed.", "A reflected photon still changes momentum."],
    ],
    answer: "A",
    explanation: "Absorbed: Δp = p per photon. Reflected: p to −p, Δp = 2p. Force = rate of change of momentum doubles.",
    hints: ["Compare the change in momentum per photon."],
  });
  // Numerical
  {
    const E = 3.6 * e;
    const f = E / h;
    b.num({
      d: 2, skill: "APPLICATION", daily: true, calculator: true,
      stem: t`Calculate the frequency of a photon of energy $3.6\ \text{eV}$, in Hz, to two significant figures.`,
      value: f, sf: 2, unit: "Hz", answer: sciPlain(f, 2), wrong: [3.6 / h],
      explanation: t`$E = 3.6 \times 1.60 \times 10^{-19} = ${sciTex(E, 3)}\ \text{J}$; $f = E/h = ${sciTex(f, 2)}\ \text{Hz}$.`,
    });
  }
  {
    const P = 60e-3, l = 940e-9;
    const N = (P * l) / (h * c);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`An infrared LED in a television remote control emits $60\ \text{mW}$ at a wavelength of $940\ \text{nm}$ while it is on. Calculate the number of photons emitted per second, to three significant figures.`,
      value: N, answer: sciPlain(N), wrong: [P / (h * (c / 940)), (60 * l) / (h * c)],
      explanation: t`1. $E = hc/\lambda = \dfrac{6.63 \times 10^{-34} \times 3.00 \times 10^{8}}{940 \times 10^{-9}} = ${sciTex(photonEnergy(l))}\ \text{J}$.
2. $N = P/E = \dfrac{60 \times 10^{-3}}{${sciTex(photonEnergy(l))}} = ${sciTex(N)}\ \text{s}^{-1}$.
3. Using 60 instead of $60 \times 10^{-3}$ W gives a value 1000 times too large.`,
      hints: ["Find the energy of one photon first."],
    });
  }
  {
    const l = 1.3e-10;
    const p = h / l;
    b.num({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`Calculate the momentum of an X-ray photon of wavelength $0.13\ \text{nm}$, in N s, to three significant figures.`,
      value: p, unit: "N s", answer: sciPlain(p), wrong: [(h * c) / l, h * l],
      explanation: t`$p = h/\lambda = 6.63 \times 10^{-34}/1.3 \times 10^{-10} = ${sciTex(p)}\ \text{N s}$. Using $hc/\lambda$ gives the energy, not the momentum.`,
      hints: ["p = h/λ."],
    });
  }
  {
    const I = 0.90e3, A = 3.2;
    const F = (I * A) / c;
    b.calc({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`Sunlight of intensity $0.90\ \text{kW m}^{-2}$ falls at normal incidence on a black solar collector panel of area $3.2\ \text{m}^2$ on a roof in Bulawayo. Assuming all the light is absorbed, calculate the force exerted on the panel by the light, in N, to two significant figures.`,
      value: F, sf: 2, unit: "N", answer: sciPlain(F, 2), wrong: [(2 * I * A) / c, I * A * c],
      explanation: t`1. Power absorbed $P = IA = 0.90 \times 10^{3} \times 3.2 = ${sciTex(I * A, 2)}\ \text{W}$.
2. Momentum delivered per second $= P/c$ (each photon delivers $E/c$).
3. $F = ${sciTex(I * A, 2)}/3.00 \times 10^{8} = ${sciTex(F, 2)}\ \text{N}$. A perfect reflector would feel twice this.`,
      hints: ["Force = rate of change of momentum = P/c for absorption."],
    });
  }
  {
    const E = 1.2e-15;
    const eV = JtoeV(E);
    b.num({
      d: 2, skill: "APPLICATION", calculator: true,
      stem: t`An X-ray photon has energy $1.2 \times 10^{-15}\ \text{J}$. Express this in keV, to two significant figures.`,
      value: eV / 1000, sf: 2, unit: "keV", wrong: [(E * e) / 1000, eV],
      explanation: t`$E = 1.2 \times 10^{-15}/1.60 \times 10^{-19} = ${sfStr(eV, 2)}\ \text{eV} = ${sfStr(eV / 1000, 2)}\ \text{keV}$.`,
    });
  }
  {
    const l = 656, dl = 2;
    b.num({
      d: 3, skill: "EVALUATION", calculator: true,
      stem: t`The wavelength of a spectral line is measured as $656 \pm 2\ \text{nm}$. What is the percentage uncertainty in the photon energy calculated from it, to one significant figure? ($h$ and $c$ may be taken as exact.)`,
      value: pctUnc(dl, l), sf: 1, unit: "%", wrong: [2 * pctUnc(dl, l)],
      explanation: t`$E = hc/\lambda$, so the percentage uncertainty in $E$ equals that in $\lambda$: $2/656 \times 100 = ${sfStr(pctUnc(dl, l), 1)}\%$ (dividing by a quantity does not change its percentage uncertainty).`,
      hints: ["A quantity raised to the power −1 contributes its percentage uncertainty once."],
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A photon of ultraviolet radiation has more energy than a photon of red light.",
    answer: true,
    explanation: "True. Ultraviolet has a higher frequency (shorter wavelength), and E = hf.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each quantity with its unit.",
    pairs: [
      ["Planck constant", "J s"],
      ["photon momentum", "N s"],
      ["photon energy", "eV"],
      ["photon emission rate", "s⁻¹"],
    ],
    explanation: "h in J s; p in N s (kg m s⁻¹); E in J or eV; photons per second in s⁻¹.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the statements.",
    template: "The energy of a photon is proportional to the {{blank:a}} of the radiation and inversely proportional to its {{blank:b}}. One electronvolt is the energy gained by an electron moving through a potential difference of one {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["frequency"], choices: ["frequency", "intensity", "amplitude"] },
      { id: "b", accepted: ["wavelength"], choices: ["wavelength", "speed", "intensity"] },
      { id: "c", accepted: ["volt"], choices: ["volt", "joule", "ampere"] },
    ],
    explanation: "E = hf = hc/λ; 1 eV = 1.60 × 10⁻¹⁹ J.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 2,
    stem: "Define the electronvolt and state its value in joules.",
    points: [
      "The energy transferred to (gained by) an electron when it moves through a potential difference of 1 V.",
      "1 eV = 1.60 × 10⁻¹⁹ J.",
    ],
    modelAnswer: "One electronvolt is the energy gained by an electron accelerated through a potential difference of one volt; it equals 1.60 × 10⁻¹⁹ J.",
    explanation: "W = QV with Q = e and V = 1 V.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "A red lamp and a blue lamp each emit 1.0 W of light. Explain which lamp emits more photons per second.",
    points: [
      "Red light has a longer wavelength (lower frequency) than blue light.",
      "So each red photon has less energy (E = hf = hc/λ).",
      "For the same power (energy per second), the red lamp must emit more photons per second (N = P/E).",
    ],
    modelAnswer: "Red light has a lower frequency than blue, so each red photon carries less energy, since E = hf. Both lamps deliver the same energy per second, so the red lamp must emit more photons each second.",
    explanation: "N = P/(hf).",
    hints: ["Compare the energy of one photon of each colour."],
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 3,
    stem: t`Show that a photon of wavelength $\lambda$ nanometres has an energy of about $1240/\lambda$ electronvolts.`,
    points: [
      t`$E = hc/(\lambda \times 10^{-9})$ in J, with $hc = 6.63 \times 10^{-34} \times 3.00 \times 10^{8} = 1.989 \times 10^{-25}\ \text{J m}$.`,
      t`In eV: divide by $1.60 \times 10^{-19}$: $E = \dfrac{1.989 \times 10^{-25}}{1.60 \times 10^{-19} \times 10^{-9}\lambda}$.`,
      t`$= 1243/\lambda \approx 1240/\lambda$ eV.`,
    ],
    modelAnswer: t`$E = hc/\lambda$ with $\lambda$ in metres $= \lambda_{\text{nm}} \times 10^{-9}$. $hc = 1.989 \times 10^{-25}\ \text{J m}$. Dividing by $1.60 \times 10^{-19}$ to convert to eV gives $E = 1.989 \times 10^{-25}/(1.60 \times 10^{-28}\lambda_{\text{nm}}) = 1243/\lambda_{\text{nm}} \approx 1240/\lambda_{\text{nm}}$ eV.`,
    explanation: "hc/e = 1.24 × 10⁻⁶ V m.",
    hints: ["Work out hc first."],
  });
  // Practice structured: LED estimate of h
  {
    const lams = [940, 660, 595, 525, 470]; // nm
    const Vth = [1.30, 1.84, 2.09, 2.38, 2.62]; // V, threshold voltages (realistic scatter)
    const x = lams.map((l) => 1 / (l * 1e-9));
    const fit = linFit(x, Vth);
    const hEst = (fit.m * e) / c;
    const row = 2;
    b.struct({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`Farai estimates the Planck constant using LEDs. For each LED he increases the p.d. from zero and records the threshold p.d. $V$ at which it just begins to emit light. He assumes that at threshold the energy $eV$ given to each electron equals the energy $hc/\lambda$ of each photon emitted.

${table([t`$\lambda\,/\,\text{nm}$`, t`$V\,/\,\text{V}$`, t`$\lambda^{-1}\,/\,10^{6}\ \text{m}^{-1}$`], lams.map((l, i) => [l, Vth[i].toFixed(2), i === row ? "" : dpStr(x[i] / 1e6, 2)]))}`,
      parts: [
        P.num({ label: "(a)", marks: 1, stem: t`Calculate the missing value of $\lambda^{-1}$, in units of $10^{6}\ \text{m}^{-1}$, to two decimal places.`, value: x[row] / 1e6, dp: 2, wrong: [1 / lams[row]], explanation: t`$1/(595 \times 10^{-9}) = ${dpStr(x[row] / 1e6, 2)} \times 10^{6}\ \text{m}^{-1}$.` }),
        P.manual({ label: "(b)", marks: 2, stem: t`Show that a graph of $V$ against $\lambda^{-1}$ should be a straight line through the origin, and state what the gradient represents.`, points: [t`$eV = hc/\lambda \Rightarrow V = \dfrac{hc}{e}\cdot\dfrac{1}{\lambda}$: the form $y = mx$.`, t`Gradient $= hc/e$.`], modelAnswer: t`From $eV = hc/\lambda$, $V = (hc/e)(1/\lambda)$, which has the form $y = mx$: a straight line through the origin of gradient $hc/e$.` }),
        P.num({ label: "(c)", marks: 2, stem: t`The best-fit line of $V$ against $\lambda^{-1}$ has the gradient found from these data. Determine the gradient, in V m, to two significant figures.`, value: fit.m, sf: 2, tol: 0.06e-6, unit: "", answer: sciPlain(fit.m, 2), wrong: [fit.m * 1e6], explanation: t`Using points far apart on the line: gradient $\approx ${sciTex(fit.m, 2)}\ \text{V m}$.` }),
        P.num({ label: "(d)", marks: 2, stem: "Use your gradient to determine a value of h, in J s, to two significant figures.", value: hEst, sf: 2, tol: 0.25e-34, unit: "", answer: sciPlain(hEst, 2), wrong: [fit.m / c], explanation: t`$h = \dfrac{\text{gradient} \times e}{c} = \dfrac{${sciTex(fit.m, 2)} \times 1.60 \times 10^{-19}}{3.00 \times 10^{8}} = ${sciTex(hEst, 2)}\ \text{J s}$.` }),
        P.manual({ label: "(e)", marks: 1, stem: "Suggest one reason why the value of h found this way differs from the accepted value.", points: ["The 'threshold' is hard to judge by eye (the LED glows faintly before it is seen) / LEDs emit a spread of wavelengths, not one / some energy is lost in the LED's resistance, so eV is not exactly hc/λ."], modelAnswer: "The moment at which the LED starts to glow is judged by eye and is uncertain; viewing it through a tube in a darkened room would help. LEDs also emit a band of wavelengths, not a single value." }),
      ],
      explanation: "eV = hc/λ: V against 1/λ has gradient hc/e, so h = gradient × e/c.",
      hints: ["Rearrange eV = hc/λ into y = mx."],
    });
  }
  {
    const lam = 550e-9, Pin = 120, area = 0.75;
    const I = Pin / area;
    const E = (h * c) / lam;
    const N = Pin / E;
    const F = Pin / c;
    b.struct({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A solar panel on a roof in Gweru has an area of $0.75\ \text{m}^2$. On a clear day it receives $120\ \text{W}$ of sunlight at normal incidence. For simplicity, treat all the light as having a wavelength of $550\ \text{nm}$.`,
      parts: [
        P.num({ label: "(a)", marks: 1, stem: t`Calculate the intensity of the sunlight on the panel, in $\text{W m}^{-2}$, to three significant figures.`, value: I, unit: "W/m²", wrong: [Pin * area], explanation: t`$I = P/A = 120/0.75 = ${sfStr(I, 3)}\ \text{W m}^{-2}$.` }),
        P.num({ label: "(b)", marks: 2, stem: "Calculate the number of photons arriving at the panel per second, to three significant figures.", value: N, answer: sciPlain(N), wrong: [Pin / (h * (c / 550))], explanation: t`$E = hc/\lambda = ${sciTex(E)}\ \text{J}$; $N = P/E = 120/${sciTex(E)} = ${sciTex(N)}\ \text{s}^{-1}$.` }),
        P.num({ label: "(c)", marks: 2, stem: "Assuming all the light is absorbed, calculate the force exerted on the panel by the light, in N, to three significant figures.", value: F, unit: "N", answer: sciPlain(F), wrong: [2 * F], explanation: t`Momentum delivered per second $= P/c = 120/3.00 \times 10^{8} = ${sciTex(F)}\ \text{N}$ (equivalently $N \times h/\lambda$).` }),
        P.manual({ label: "(d)", marks: 1, stem: "Suggest why treating the sunlight as a single wavelength gives only an estimate of the number of photons.", points: ["Sunlight contains a range of wavelengths (infrared to ultraviolet), each with a different photon energy, so the true photon rate differs from P/(hc/λ) for one λ."], modelAnswer: "Sunlight has a broad spectrum of wavelengths, and each wavelength has a different photon energy, so a single 550 nm value only approximates the average photon energy." }),
      ],
      explanation: "I = P/A; N = P/(hc/λ); absorbed beam: F = P/c.",
      hints: ["Find the energy of one photon first."],
    });
  }
  b.card("DEFINITION", "**Photon**", "A quantum (discrete packet) of electromagnetic energy, of energy hf.");
  b.card("FORMULA", "Photon energy", t`$E = hf = \dfrac{hc}{\lambda}$`);
  b.card("FORMULA", "Photon momentum", t`$p = \dfrac{E}{c} = \dfrac{h}{\lambda}$`);
  b.card("FORMULA", "Photons per second", t`$N = \dfrac{P}{hf} = \dfrac{P\lambda}{hc}$`);
  b.card("DEFINITION", "**Electronvolt**", "The energy gained by an electron moving through a p.d. of 1 V: 1.60 × 10⁻¹⁹ J.");
  b.card("FACT", "Planck constant", "h = 6.63 × 10⁻³⁴ J s.");
  b.card("CONCEPT", "Intensity versus frequency", "Intensity sets the number of photons per second; frequency sets the energy of each photon.");
  b.card("FACT", "Visible photon energies", "About 1.8 eV (red, 700 nm) to 3.1 eV (violet, 400 nm).");
  b.card("CONCEPT", "Radiation pressure", "An absorbed beam of power P exerts force P/c; a perfect reflector feels 2P/c.");
});
