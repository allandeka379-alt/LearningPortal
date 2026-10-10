// W4a: aphys.quantum.photoelectric — threshold frequency/wavelength, work function, hf = Φ + ½mv²max, stopping
// potential, intensity versus frequency, failure of the wave model, Ek max–f graphs.
import { concept, P, t, chk, DATA, sfStr, dpStr, sciTex, sciPlain, pctUnc, linFit, table } from "../lib.mjs";

const { h, c, e, me } = DATA;

concept("aphys.quantum.photoelectric", { file: "quantum/photoelectric", keyPrefix: "quantum.photoelectric" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is meant by the work function of a metal?",
    options: [
      ["the minimum energy needed to remove an electron from the surface of the metal", "Correct."],
      ["the maximum kinetic energy of the photoelectrons emitted from the metal", "That is hf − Φ, which depends on the frequency."],
      ["the minimum frequency of radiation that causes photoelectric emission", "That is the threshold frequency, f₀ = Φ/h."],
      ["the total energy needed to remove all the free electrons from the piece of metal", "It refers to one electron, the least tightly held."],
    ],
    answer: "A",
    explanation: "Φ is the minimum energy to free one electron from the surface.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Monochromatic light above the threshold frequency falls on a metal. Its intensity is doubled. Which statement is correct?",
    options: [
      ["More photoelectrons are emitted per second, with the same maximum kinetic energy.", "Correct: twice the photons per second, same energy each."],
      ["The maximum kinetic energy of each photoelectron emitted doubles.", "Each photon still has the same energy hf."],
      ["The threshold frequency of the metal surface falls to half its value.", "f₀ = Φ/h depends only on the metal."],
      ["Photoelectrons are emitted after a shorter time delay than before.", "Emission is already instantaneous."],
    ],
    answer: "A",
    explanation: "Doubling intensity doubles the photon rate, so the photocurrent doubles; E_k max = hf − Φ is unchanged.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which observation can NOT be explained by the wave model of light?",
    options: [
      ["No electrons are emitted below a certain frequency, however intense the light.", "Correct: waves of any frequency deliver energy at a rate set by intensity."],
      ["The number of photoelectrons emitted per second increases with the intensity of the light.", "A wave model would also predict more emission with more energy arriving."],
      ["Light passing through two narrow slits produces an interference pattern.", "Interference is evidence for the wave model."],
      ["Photoelectrons are negatively charged.", "This is about electrons, not about the nature of light."],
    ],
    answer: "A",
    explanation: "A wave model predicts emission at any frequency given enough intensity or time; a threshold frequency needs photons.",
  });
  {
    const phi = 2.1 * e, f0 = phi / h;
    b.mcq({
      d: 2, skill: "APPLICATION", daily: true, calculator: true,
      stem: t`Caesium has a work function of $2.1\ \text{eV}$. What is its threshold frequency?`,
      options: [
        [t`$${sciTex(f0, 2)}\ \text{Hz}$`, "Correct: f₀ = Φ/h with Φ in J."],
        [t`$${sciTex(2.1 / h, 2)}\ \text{Hz}$`, "The work function must be converted to joules."],
        [t`$${sciTex(c / f0, 2)}\ \text{Hz}$`, "This is the threshold wavelength in metres, not a frequency."],
        [t`$${sciTex(phi * h, 2)}\ \text{Hz}$`, "f₀ = Φ/h: divide by h."],
      ],
      answer: "A",
      explanation: t`$f_0 = \dfrac{\Phi}{h} = \dfrac{2.1 \times 1.60 \times 10^{-19}}{6.63 \times 10^{-34}} = ${sciTex(f0, 2)}\ \text{Hz}$.`,
    });
  }
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Graphs of maximum kinetic energy of photoelectrons against frequency are drawn for two different metals. How do the lines compare?",
    options: [
      ["They are parallel, with different intercepts on the frequency axis.", "Correct: gradient h for both; f₀ depends on Φ."],
      ["They have different gradients and pass through the same point on the frequency axis.", "The gradient is h for every metal."],
      ["They are the same line, because h is a universal constant.", "The work functions differ, so the intercepts differ."],
      ["They pass through the origin with gradients equal to the work functions.", "The lines cut the frequency axis at f₀, not at the origin."],
    ],
    answer: "A",
    explanation: "E_k max = hf − Φ: gradient h (same), intercept −Φ (different).",
    hints: ["Write E_k max = hf − Φ in the form y = mx + c."],
  });
  {
    const phi = 2.3, lam = 400e-9;
    const Ek = (h * c) / lam / e - phi;
    b.mcq({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`Light of wavelength $400\ \text{nm}$ falls on sodium, work function $2.3\ \text{eV}$. What is the stopping potential?`,
      options: [
        [t`$${sfStr(Ek, 2)}\ \text{V}$`, "Correct: (photon energy in eV) − Φ."],
        [t`$${sfStr((h * c) / lam / e, 2)}\ \text{V}$`, "The work function has not been subtracted."],
        [t`$${sfStr((h * c) / lam / e + phi, 2)}\ \text{V}$`, "Φ must be subtracted, not added."],
        [t`$${sfStr(phi, 2)}\ \text{V}$`, "This is the work function itself."],
      ],
      answer: "A",
      explanation: t`$hc/\lambda = ${sfStr((h * c) / lam / e, 3)}\ \text{eV}$; $E_{k\,\text{max}} = ${sfStr((h * c) / lam / e, 3)} - 2.3 = ${sfStr(Ek, 2)}\ \text{eV}$, so $V_s = ${sfStr(Ek, 2)}\ \text{V}$.`,
      hints: ["eV_s = hf − Φ."],
    });
  }
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why do photoelectrons emitted by monochromatic light have a range of kinetic energies up to a maximum?",
    options: [
      ["Electrons from below the surface lose extra energy on the way out.", "Correct: Φ is the minimum energy to escape, from the surface."],
      ["The photons in a monochromatic beam have a spread of different energies.", "Monochromatic: one frequency, so one photon energy."],
      ["Some of the electrons absorb two or more photons at the same time.", "One electron absorbs one photon."],
      ["The brighter parts of the beam give their electrons more energy each.", "Intensity does not change the energy per photon."],
    ],
    answer: "A",
    explanation: "Every photon gives hf; surface electrons need only Φ and leave with hf − Φ; deeper ones lose more, so they leave with less.",
    hints: ["Where in the metal do electrons need just Φ to escape?"],
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "The frequency of light falling on a photocell is increased while the power of the light is kept constant. Both frequencies are above the threshold. What happens?",
    options: [
      ["The maximum kinetic energy increases and the photocurrent decreases.", "Correct: more energy per photon, fewer photons per second."],
      ["The maximum kinetic energy increases and the photocurrent increases.", "Constant power with bigger photons means fewer photons per second."],
      ["The maximum kinetic energy is unchanged and the photocurrent decreases.", "Higher frequency gives each electron more energy."],
      ["Both are unchanged, because the power is constant.", "Power constant does not keep photon energy constant."],
    ],
    answer: "A",
    explanation: "E_k max = hf − Φ rises. Photon rate = P/(hf) falls, so (with the same emission probability per photon) the current falls.",
    hints: ["Photons per second = P/(hf)."],
  });
  // Numerical
  {
    const phi = 4.7, f = 1.5e15;
    const Ek = h * f - phi * e;
    b.num({
      d: 2, skill: "APPLICATION", daily: true, calculator: true,
      stem: t`Ultraviolet radiation of frequency $1.5 \times 10^{15}\ \text{Hz}$ falls on copper, work function $4.7\ \text{eV}$. Calculate the maximum kinetic energy of the photoelectrons, in J, to two significant figures.`,
      value: Ek, sf: 2, unit: "J", answer: sciPlain(Ek, 2), wrong: [h * f, h * f + phi * e],
      explanation: t`$hf = 6.63 \times 10^{-34} \times 1.5 \times 10^{15} = ${sciTex(h * f)}\ \text{J}$; $\Phi = 4.7 \times 1.60 \times 10^{-19} = ${sciTex(phi * e)}\ \text{J}$; $E_{k\,\text{max}} = ${sciTex(Ek, 2)}\ \text{J}$.`,
    });
  }
  {
    const phi = 2.9;
    const l0 = (h * c) / (phi * e);
    b.num({
      d: 2, skill: "APPLICATION", calculator: true,
      stem: t`Calculate the threshold wavelength for a metal of work function $2.9\ \text{eV}$, in nm, to two significant figures.`,
      value: l0 * 1e9, sf: 2, unit: "nm", wrong: [(h * c) / phi * 1e9],
      explanation: t`$\lambda_0 = \dfrac{hc}{\Phi} = \dfrac{6.63 \times 10^{-34} \times 3.00 \times 10^{8}}{2.9 \times 1.60 \times 10^{-19}} = ${sciTex(l0, 2)}\ \text{m} = ${sfStr(l0 * 1e9, 2)}\ \text{nm}$ (violet).`,
    });
  }
  {
    const lam = 250e-9, Vs = 1.6;
    const phi = (h * c) / lam / e - Vs;
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`When light of wavelength $250\ \text{nm}$ falls on a metal surface, the stopping potential is $1.6\ \text{V}$. Calculate the work function of the metal, in eV, to two significant figures.`,
      value: phi, sf: 2, unit: "eV", wrong: [(h * c) / lam / e + Vs, (h * c) / lam / e],
      explanation: t`1. Photon energy: $hc/\lambda = \dfrac{6.63 \times 10^{-34} \times 3.00 \times 10^{8}}{250 \times 10^{-9}} = ${sciTex((h * c) / lam)}\ \text{J} = ${sfStr((h * c) / lam / e, 3)}\ \text{eV}$.
2. $E_{k\,\text{max}} = eV_s = 1.6\ \text{eV}$.
3. $\Phi = hf - E_{k\,\text{max}} = ${sfStr((h * c) / lam / e, 3)} - 1.6 = ${sfStr(phi, 2)}\ \text{eV}$.`,
      hints: ["eV_s is the maximum kinetic energy in eV."],
    });
  }
  {
    const phi = 2.3, lam = 350e-9;
    const Ek = (h * c) / lam - phi * e;
    const v = Math.sqrt((2 * Ek) / me);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`Ultraviolet of wavelength $350\ \text{nm}$ falls on a sodium surface (work function $2.3\ \text{eV}$). Calculate the maximum speed of the photoelectrons, in $\text{m s}^{-1}$, to two significant figures.`,
      value: v, sf: 2, unit: "m/s", answer: sciPlain(v, 2), wrong: [Math.sqrt((2 * (h * c)) / lam / me), Math.sqrt(Ek / me)],
      explanation: t`1. $hc/\lambda = ${sciTex((h * c) / lam)}\ \text{J}$; $\Phi = 2.3 \times 1.60 \times 10^{-19} = ${sciTex(phi * e)}\ \text{J}$.
2. $E_{k\,\text{max}} = ${sciTex(Ek)}\ \text{J}$.
3. $v = \sqrt{2E_k/m_e} = \sqrt{2 \times ${sciTex(Ek)}/9.11 \times 10^{-31}} = ${sciTex(v, 2)}\ \text{m s}^{-1}$. Forgetting to subtract $\Phi$ gives too large a speed.`,
      hints: ["Subtract the work function before finding the speed."],
    });
  }
  {
    const P = 2.0e-3, lam = 254e-9, eff = 0.010;
    const N = (P * lam) / (h * c);
    const I = N * eff * e;
    b.calc({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`A mercury lamp delivers $2.0\ \text{mW}$ of ultraviolet radiation of wavelength $254\ \text{nm}$ to a zinc cathode. On average, one photon in every 100 releases a photoelectron. Calculate the maximum photoelectric current, in A, to two significant figures.`,
      value: I, sf: 2, unit: "A", answer: sciPlain(I, 2), wrong: [N * e, (P / e) * eff],
      explanation: t`1. Photon energy: $hc/\lambda = ${sciTex((h * c) / lam)}\ \text{J}$.
2. Photons per second: $N = P/E = 2.0 \times 10^{-3}/${sciTex((h * c) / lam)} = ${sciTex(N)}\ \text{s}^{-1}$.
3. Electrons per second: $N/100 = ${sciTex(N * eff)}\ \text{s}^{-1}$.
4. $I = (N/100)e = ${sciTex(I, 2)}\ \text{A}$. (Zinc's threshold wavelength is about 289 nm, so 254 nm does cause emission.)`,
      hints: ["Find photons per second first, then electrons per second."],
    });
  }
  {
    const V = 1.25, dV = 0.05, lam = 410, dlam = 5;
    const pct = pctUnc(dV, V);
    b.num({
      d: 3, skill: "EVALUATION", calculator: true,
      stem: t`A stopping potential is measured as $1.25 \pm 0.05\ \text{V}$ using light of wavelength $410 \pm 5\ \text{nm}$. Calculate the percentage uncertainty in the maximum kinetic energy of the photoelectrons, to one significant figure.`,
      value: pct, sf: 1, unit: "%", wrong: [pct + pctUnc(dlam, lam)],
      explanation: t`$E_{k\,\text{max}} = eV_s$, and $e$ is exact, so the percentage uncertainty is that of $V_s$: $0.05/1.25 \times 100 = ${sfStr(pct, 1)}\%$. The wavelength is not used to find $E_{k\,\text{max}}$ from $V_s$.`,
      hints: ["Which measured quantity does E_k max = eV_s depend on?"],
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "If the wavelength of the incident radiation is longer than the threshold wavelength, no photoelectrons are emitted, however intense the radiation.",
    answer: true,
    explanation: "True. Longer wavelength means lower frequency; each photon has less energy than Φ, and an electron cannot combine energy from several photons.",
  });
  b.match({
    d: 3, skill: "ANALYSIS",
    stem: t`Match each feature of the graph of $E_{k\,\text{max}}$ (y-axis, in J) against frequency $f$ (x-axis) with what it gives.`,
    pairs: [
      ["gradient", "the Planck constant h"],
      ["intercept on the frequency axis", "the threshold frequency f₀"],
      ["intercept on the energy axis (extrapolated)", "minus the work function, −Φ"],
    ],
    explanation: "E_k max = hf − Φ: gradient h, f-intercept Φ/h = f₀, y-intercept −Φ.",
    hints: ["Compare with y = mx + c."],
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete Einstein's explanation.",
    template: "Each photon gives all its energy to one {{blank:a}}. At least the {{blank:b}} is used to escape from the surface, and the rest becomes {{blank:c}} energy.",
    blanks: [
      { id: "a", accepted: ["electron"], choices: ["electron", "atom", "proton"] },
      { id: "b", accepted: ["work function"], choices: ["work function", "threshold frequency", "stopping potential"] },
      { id: "c", accepted: ["kinetic"], choices: ["kinetic", "potential", "thermal"] },
    ],
    explanation: "hf = Φ + ½mv²max.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 2,
    stem: "Define threshold frequency and state how it is related to the work function.",
    points: ["The minimum frequency of electromagnetic radiation that causes photoelectric emission from the metal (surface).", "hf₀ = Φ (f₀ = Φ/h)."],
    modelAnswer: "The threshold frequency is the minimum frequency of electromagnetic radiation that can release electrons from the surface of a particular metal; hf₀ = Φ.",
    explanation: "Photon energy at threshold equals the work function.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain, using the photon model, why the maximum kinetic energy of photoelectrons depends on the frequency of the light but not on its intensity, while the photoelectric current depends on the intensity.",
    points: [
      "One photon is absorbed by one electron, giving it all its energy hf.",
      "E_k max = hf − Φ, so it depends only on f (and the metal).",
      "Greater intensity (same f) means more photons per second but the same energy per photon, so E_k max is unchanged.",
      "More photons per second release more electrons per second, so the current is proportional to intensity.",
    ],
    modelAnswer: "Each photon interacts with a single electron and transfers all its energy hf. The most energetic electrons leave with hf − Φ, which depends only on the frequency. Increasing the intensity at the same frequency increases the number of photons arriving per second but not the energy of each, so the maximum kinetic energy is unchanged while more electrons are released per second, increasing the current in proportion.",
    explanation: "One photon, one electron.",
    hints: ["What does intensity change: the number of photons or their energy?"],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 3,
    stem: "State three observations of the photoelectric effect that the wave theory of light cannot explain, saying in each case what the wave theory predicts.",
    points: [
      "Threshold frequency: no emission below f₀ however intense the light; waves predict emission at any frequency if intense enough.",
      "E_k max independent of intensity; waves predict more intense light gives more energetic electrons.",
      "Emission is instantaneous even in dim light; waves predict a delay while energy builds up.",
    ],
    modelAnswer: "Below a threshold frequency there is no emission however bright the light, whereas a wave of any frequency should eventually supply enough energy. The maximum kinetic energy does not depend on intensity, whereas waves predict brighter light gives faster electrons. Emission starts immediately even with very dim light, whereas waves predict a time delay while each electron gathers enough energy.",
    explanation: "Threshold, intensity independence, no delay.",
    hints: ["Think about frequency, intensity and time."],
  });
  // Practice structured
  {
    const fs = [6.2, 6.7, 7.3, 7.8, 8.4, 8.9]; // ×10^14 Hz
    const noise = [0.02, -0.03, 0.01, 0.03, -0.02, 0.0];
    const phiT = 2.45;
    const Vs = fs.map((f, i) => Number(((h * f * 1e14) / e - phiT + noise[i]).toFixed(2)));
    const fit = linFit(fs.map((f) => f * 1e14), Vs);
    const hEst = fit.m * e;
    const phiEst = -fit.c;
    const f0Est = -fit.c / fit.m;
    b.struct({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`Rudo measures the stopping potential $V_s$ for a metal surface illuminated with light of different frequencies $f$:

${table([t`$f\,/\,10^{14}\ \text{Hz}$`, t`$V_s\,/\,\text{V}$`], fs.map((f, i) => [f.toFixed(1), Vs[i].toFixed(2)]))}`,
      parts: [
        P.manual({ label: "(a)", marks: 2, stem: t`Show that a graph of $V_s$ against $f$ should be a straight line, and state what its gradient and its intercept on the $V_s$ axis represent.`, points: [t`$eV_s = hf - \Phi \Rightarrow V_s = \dfrac{h}{e}f - \dfrac{\Phi}{e}$: the form $y = mx + c$.`, t`Gradient $= h/e$; intercept $= -\Phi/e$ (minus the work function in eV).`], modelAnswer: t`From $eV_s = hf - \Phi$, $V_s = (h/e)f - \Phi/e$, a straight line with gradient $h/e$ and $V_s$-intercept $-\Phi/e$.` }),
        P.num({ label: "(b)", marks: 2, stem: t`Determine the gradient of the best-fit line, in V s, to two significant figures.`, value: fit.m, sf: 2, tol: 0.15e-15, unit: "", answer: sciPlain(fit.m, 2), wrong: [fit.m * 1e14], explanation: t`Gradient $\approx ${sciTex(fit.m, 2)}\ \text{V s}$ (use points far apart on the line).` }),
        P.num({ label: "(c)", marks: 2, stem: "Use your gradient to determine the Planck constant, in J s, to two significant figures.", value: hEst, sf: 2, tol: 0.25e-34, unit: "", answer: sciPlain(hEst, 2), wrong: [fit.m / e], explanation: t`$h = e \times \text{gradient} = 1.60 \times 10^{-19} \times ${sciTex(fit.m, 2)} = ${sciTex(hEst, 2)}\ \text{J s}$.` }),
        P.num({ label: "(d)", marks: 2, stem: "Determine the work function of the metal, in eV, to two significant figures.", value: phiEst, sf: 2, tol: 0.12, unit: "eV", wrong: [fit.c], explanation: t`Extrapolating to $f = 0$: intercept $\approx ${dpStr(fit.c, 2)}\ \text{V}$, so $\Phi \approx ${dpStr(phiEst, 2)}\ \text{eV}$ (or $\Phi = hf - eV_s$ using a point on the line).` }),
        P.num({ label: "(e)", marks: 2, stem: t`Determine the threshold frequency, in units of $10^{14}\ \text{Hz}$, to two significant figures.`, value: f0Est / 1e14, sf: 2, tol: 0.2, wrong: [phiEst], explanation: t`Where the line cuts the $f$ axis: $f_0 \approx ${dpStr(f0Est / 1e14, 1)} \times 10^{14}\ \text{Hz}$.` }),
        P.manual({ label: "(f)", marks: 2, stem: "Suggest why the stopping potential is difficult to measure precisely, and one way to improve the measurement.", points: ["The current falls gradually towards zero (only a few of the fastest electrons reach the collector), so the exact p.d. at zero current is hard to judge.", "Use a very sensitive current meter (picoammeter or electrometer), screen the cell from stray light, and approach V_s slowly, repeating and averaging."], modelAnswer: "Only a few of the fastest electrons reach the collector near the stopping potential, so the current tails off gradually and the zero point is hard to judge; a very sensitive current meter is needed." }),
      ],
      explanation: "V_s = (h/e)f − Φ/e: gradient h/e, intercept −Φ/e, f-intercept f₀.",
      hints: ["Divide eV_s = hf − Φ by e."],
    });
    chk(Math.abs(hEst - h) < 0.4e-34 ? 1 : 0, 1);
  }
  {
    const phi = 4.3;
    const l0 = (h * c) / (phi * e);
    b.struct({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A clean zinc plate (work function $4.3\ \text{eV}$) is fixed to the cap of a negatively charged gold-leaf electroscope. The leaf collapses quickly when ultraviolet light from a lamp shines on the plate, but stays raised when a bright lamp emitting only visible light is used instead.`,
      parts: [
        P.num({ label: "(a)", marks: 2, stem: "Calculate the threshold wavelength of zinc, in nm, to two significant figures.", value: l0 * 1e9, sf: 2, unit: "nm", wrong: [((h * c) / phi) * 1e9], explanation: t`$\lambda_0 = hc/\Phi = \dfrac{6.63 \times 10^{-34} \times 3.00 \times 10^{8}}{4.3 \times 1.60 \times 10^{-19}} = ${sfStr(l0 * 1e9, 2)}\ \text{nm}$.` }),
        P.manual({ label: "(b)", marks: 2, stem: "Explain why the leaf collapses with ultraviolet light but not with the bright visible lamp.", points: ["Ultraviolet photons have energy greater than the work function (wavelength below the threshold), so photoelectrons are emitted and the plate loses its negative charge.", "Visible photons have energy less than 4.3 eV (wavelength above about 290 nm), so no electron can escape, however bright the lamp (one photon per electron)."], modelAnswer: "Each ultraviolet photon has more energy than the 4.3 eV work function, so electrons are emitted and the negative charge leaks away. Visible photons carry less than about 3.1 eV, below the work function, and since one photon is absorbed by one electron, no electrons escape however many photons arrive." }),
        P.manual({ label: "(c)", marks: 1, stem: "Suggest what would happen if the electroscope were positively charged at the start, and why.", points: ["The leaf would not collapse (or barely): any emitted photoelectrons are attracted back to the positive plate."], modelAnswer: "The leaf stays up: photoelectrons released are attracted back to the positively charged plate, so the charge does not change." }),
        P.manual({ label: "(d)", marks: 1, stem: "Suggest why the zinc plate must be cleaned with emery paper before the experiment.", points: ["An oxide (or dirt) layer on the surface has a higher work function / absorbs the ultraviolet, preventing emission."], modelAnswer: "Zinc oxide and dirt on the surface absorb ultraviolet and raise the effective work function; a freshly cleaned surface emits reliably." }),
      ],
      explanation: "Emission needs hf > Φ; one photon per electron, so brightness cannot make up for low frequency.",
      hints: ["Compare the photon energy with the work function."],
    });
  }
  b.card("DEFINITION", "**Work function Φ**", "The minimum energy needed to remove an electron from the surface of a metal.");
  b.card("DEFINITION", "**Threshold frequency f₀**", "The minimum frequency of radiation that causes photoelectric emission from a metal: hf₀ = Φ.");
  b.card("DEFINITION", "**Threshold wavelength λ₀**", "The maximum wavelength that causes photoelectric emission: λ₀ = hc/Φ.");
  b.card("FORMULA", "Einstein's photoelectric equation", t`$hf = \Phi + \tfrac{1}{2}mv^2_{\text{max}}$`);
  b.card("FORMULA", "Stopping potential", t`$eV_s = \tfrac{1}{2}mv^2_{\text{max}} = hf - \Phi$`);
  b.card("CONCEPT", "Intensity", "Higher intensity: more photons per second, more photoelectrons per second (larger current), same maximum kinetic energy.");
  b.card("CONCEPT", "Ek max–f graph", "Straight line: gradient h, f-intercept f₀, extrapolated E-intercept −Φ; parallel lines for different metals.");
  b.card("CONCEPT", "Wave model fails", "It cannot explain the threshold frequency, the independence of Ek max from intensity, or instantaneous emission.");
  b.card("FACT", "Typical work functions", "Caesium about 2.1 eV, sodium 2.3 eV, zinc 4.3 eV, copper 4.7 eV.");
});
