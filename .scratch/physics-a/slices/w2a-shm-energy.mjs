// W2a: aphys.oscillations.shm-energy — interchange of Ek and Ep, E = ½mω²x₀², energy against x and t.
import { concept, P, t, chk, sfStr, dpStr, sciTex, sciPlain, pctUnc, fracUnc, table } from "../lib.mjs";

const E_ = (m, w, x0) => 0.5 * m * w * w * x0 * x0;
concept("aphys.oscillations.shm-energy", { file: "oscillations/shm-energy", keyPrefix: "oscillations.shm-energy" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "For an undamped simple harmonic oscillator, where is the kinetic energy greatest?",
    options: [
      ["at the equilibrium position", "Correct: the speed is greatest there."],
      ["at maximum displacement", "Here the oscillator is momentarily at rest: kinetic energy is zero."],
      ["halfway between equilibrium and maximum displacement", "Kinetic energy is still rising towards its maximum here."],
      ["It is the same everywhere.", "The total energy is constant, but the kinetic energy varies."],
    ],
    answer: "A",
    explanation: "Ek = ½mω²(x₀² − x²) is greatest at x = 0.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The amplitude of an undamped simple harmonic oscillator is doubled, with no change to its mass or frequency. What happens to its total energy?",
    options: [
      ["It is multiplied by 4.", "Correct: E ∝ x₀²."],
      ["It is multiplied by 2.", "Energy depends on amplitude squared, not on amplitude."],
      ["It stays the same, because the period is unchanged.", "The period is unchanged, but the energy depends on amplitude."],
      [t`It is multiplied by $\sqrt{2}$.`, "This would be the amplitude change for doubled energy, the reverse relationship."],
    ],
    answer: "A",
    explanation: t`$E = \tfrac{1}{2}m\omega^2x_0^2$; doubling $x_0$ multiplies $E$ by 4.`,
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A simple harmonic oscillator has total energy E. What is its potential energy when its displacement is half the amplitude?",
    options: [
      [t`$E/4$`, "Correct: Ep ∝ x², and (½)² = ¼."],
      [t`$E/2$`, "Potential energy is not proportional to x; it goes as x²."],
      [t`$3E/4$`, "This is the kinetic energy at that displacement."],
      [t`$E/\sqrt{2}$`, "Square roots appear in the displacement where the energies are equal, not here."],
    ],
    answer: "A",
    explanation: t`$E_p = \tfrac{1}{2}m\omega^2x^2 = E(x/x_0)^2 = E/4$; the remaining $3E/4$ is kinetic.`,
    hints: ["Write Eₚ as a fraction of E."],
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "At what displacement are the kinetic and potential energies of a simple harmonic oscillator of amplitude x₀ equal?",
    options: [
      [t`$x_0/\sqrt{2}$`, "Correct: Ep = E/2 when x² = x₀²/2."],
      [t`$x_0/2$`, "At x₀/2 the potential energy is only E/4."],
      [t`$x_0/4$`, "At x₀/4 the potential energy is only E/16."],
      [t`$x_0/\sqrt{3}$`, "At x₀/√3 the potential energy is E/3, not E/2."],
    ],
    answer: "A",
    explanation: t`$\tfrac{1}{2}m\omega^2x^2 = \tfrac{1}{2}\left(\tfrac{1}{2}m\omega^2x_0^2\right) \Rightarrow x = x_0/\sqrt{2} \approx 0.71x_0$.`,
    hints: ["Set Eₚ = E/2."],
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "An oscillator performs s.h.m. with period T. What is the period of the variation of its kinetic energy with time?",
    options: [
      [t`$T/2$`, "Correct: the speed is maximum twice per cycle, once in each direction."],
      [t`$T$`, "Kinetic energy depends on v², which repeats every half cycle."],
      [t`$2T$`, "Kinetic energy varies faster than the displacement, not more slowly."],
      [t`$T/4$`, "From maximum to zero takes T/4, but a full cycle of Eₖ takes T/2."],
    ],
    answer: "A",
    explanation: t`$E_k = E\cos^2\omega t = \tfrac{1}{2}E(1 + \cos 2\omega t)$: frequency $2f$, period $T/2$.`,
    hints: ["How many times per oscillation is the speed a maximum?"],
  });
  {
    const m = 0.25, w = 8.0, x0 = 0.05;
    const E = E_(m, w, x0);
    chk(E, 0.02, 1e-12);
    b.mcq({
      d: 2, skill: "APPLICATION", calculator: true,
      stem: t`A $0.25\ \text{kg}$ mass oscillates with angular frequency $8.0\ \text{rad s}^{-1}$ and amplitude $5.0\ \text{cm}$. What is its total energy?`,
      options: [
        ["0.020 J", "Correct: ½ × 0.25 × 64 × 0.0025."],
        ["200 J", "This uses the amplitude in cm instead of m."],
        ["0.040 J", "This omits the factor ½."],
        ["0.0025 J", "This uses ω instead of ω²."],
      ],
      answer: "A",
      explanation: t`$E = \tfrac{1}{2}m\omega^2x_0^2 = \tfrac{1}{2} \times 0.25 \times 8.0^2 \times 0.050^2 = ${E}\ \text{J}$.`,
    });
  }
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A graph shows potential energy (y-axis) against displacement (x-axis) for an undamped simple harmonic oscillator. Which description is correct?",
    options: [
      ["a U-shaped parabola with its minimum at x = 0", "Correct: Eₚ = ½mω²x², equal to the total energy at ±x₀."],
      ["a straight line through the origin with a positive gradient", "Eₚ depends on x², not on x."],
      ["an inverted parabola with its maximum at x = 0", "That is the kinetic energy graph."],
      ["a horizontal line at the total energy", "That is the total energy graph."],
    ],
    answer: "A",
    explanation: "Eₚ ∝ x²: a U-shaped parabola through the origin; Eₖ is the inverted parabola; the total is a horizontal line.",
    hints: ["Eₚ = ½mω²x²."],
  });
  b.mcq({
    d: 4, skill: "APPLICATION", calculator: true,
    stem: "Two identical masses on identical springs oscillate. Oscillator P has twice the amplitude of oscillator Q. What is the ratio (maximum speed of P) ÷ (maximum speed of Q)?",
    options: [
      ["2", "Correct: same ω, and v₀ = ωx₀ ∝ x₀."],
      ["4", "This is the ratio of their energies, not of their speeds."],
      [t`$\sqrt{2}$`, "This would be the speed ratio if the energy ratio were 2."],
      ["1", "The periods are the same, but the maximum speeds are not."],
    ],
    answer: "A",
    explanation: "Identical systems have the same ω. v₀ = ωx₀, so doubling x₀ doubles v₀ (and quadruples E = ½mv₀²).",
    hints: ["Which quantity is the same for both?"],
  });
  {
    const m = 0.60, w = 4.5, x0 = 0.12;
    b.num({
      d: 2, skill: "APPLICATION", daily: true, calculator: true,
      stem: t`A $0.60\ \text{kg}$ trolley oscillates with s.h.m. of angular frequency $4.5\ \text{rad s}^{-1}$ and amplitude $0.12\ \text{m}$. Calculate its total energy, in J, to three significant figures.`,
      value: E_(m, w, x0), unit: "J", wrong: [0.5 * m * w * x0 * x0, m * w * w * x0 * x0],
      explanation: t`$E = \tfrac{1}{2} \times 0.60 \times 4.5^2 \times 0.12^2 = ${sfStr(E_(m, w, x0), 3)}\ \text{J}$.`,
    });
  }
  {
    const m = 0.75, w = 3.6, x0 = 0.15, x = 0.09;
    const Ek = 0.5 * m * w * w * (x0 * x0 - x * x);
    b.num({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A $0.75\ \text{kg}$ mass oscillates with s.h.m. of angular frequency $3.6\ \text{rad s}^{-1}$ and amplitude $0.15\ \text{m}$. Calculate its kinetic energy when its displacement is $0.090\ \text{m}$, in J, to three significant figures.`,
      value: Ek, unit: "J", wrong: [0.5 * m * w * w * x * x, 0.5 * m * w * w * (x0 - x) ** 2],
      explanation: t`$E_k = \tfrac{1}{2}m\omega^2(x_0^2 - x^2) = \tfrac{1}{2} \times 0.75 \times 3.6^2 \times (0.0225 - 0.0081) = ${sfStr(Ek, 3)}\ \text{J}$. The other ${sfStr(0.5 * m * w * w * x * x, 3)} J is potential energy.`,
      hints: ["Eₖ = ½mω²(x₀² − x²)."],
    });
  }
  {
    const k = 120, m = 0.30, x0 = 0.040;
    const v0 = x0 * Math.sqrt(k / m);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A $0.30\ \text{kg}$ mass on a spring of spring constant $120\ \text{N m}^{-1}$ is pulled $4.0\ \text{cm}$ from equilibrium and released. Using energy, calculate its maximum speed, in $\text{m s}^{-1}$, to three significant figures.`,
      value: v0, unit: "m/s", wrong: [x0 * (k / m), Math.sqrt((k * x0 * x0) / m) / Math.SQRT2],
      explanation: t`1. Energy stored at release: $E = \tfrac{1}{2}kx_0^2 = \tfrac{1}{2} \times 120 \times 0.040^2 = ${sfStr(0.5 * k * x0 * x0, 3)}\ \text{J}$.
2. At equilibrium it is all kinetic: $\tfrac{1}{2}mv_0^2 = ${sfStr(0.5 * k * x0 * x0, 3)}$, so $v_0 = \sqrt{\dfrac{2 \times ${sfStr(0.5 * k * x0 * x0, 3)}}{0.30}} = ${sfStr(v0, 3)}\ \text{m s}^{-1}$.
3. Check: $\omega = \sqrt{k/m} = 20\ \text{rad s}^{-1}$ and $\omega x_0 = ${sfStr(v0, 3)}\ \text{m s}^{-1}$.`,
      hints: ["The elastic energy at release becomes kinetic energy at equilibrium."],
    });
  }
  {
    const m = 1.2, f = 0.80, E = 0.35;
    const w = 2 * Math.PI * f;
    const x0 = Math.sqrt((2 * E) / (m * w * w));
    b.calc({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: t`A $1.2\ \text{kg}$ mass oscillates with s.h.m. at $0.80\ \text{Hz}$ with total energy $0.35\ \text{J}$. Calculate the amplitude, in m, to three significant figures.`,
      value: x0, unit: "m", wrong: [Math.sqrt((2 * E) / (m * f * f)), (2 * E) / (m * w * w)],
      explanation: t`1. $\omega = 2\pi \times 0.80 = ${sfStr(w, 3)}\ \text{rad s}^{-1}$.
2. $x_0 = \sqrt{\dfrac{2E}{m\omega^2}} = \sqrt{\dfrac{0.70}{1.2 \times ${sfStr(w * w, 4)}}} = ${sfStr(x0, 3)}\ \text{m}$.
3. Using $f$ in place of $\omega$ gives ${sfStr(Math.sqrt((2 * E) / (m * f * f)), 3)} m, $2\pi$ times too large.`,
      hints: ["Rearrange E = ½mω²x₀².", "Convert f to ω."],
    });
  }
  // Uncertainty
  {
    const pw = 1.5, px = 2.0;
    b.num({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`In an experiment the energy of an oscillator is calculated from $E = \tfrac{1}{2}m\omega^2x_0^2$. The mass is known to $\pm 0.5\%$, $\omega$ to $\pm 1.5\%$ and the amplitude to $\pm 2.0\%$. Calculate the percentage uncertainty in $E$.`,
      value: 0.5 + 2 * pw + 2 * px, unit: "%", wrong: [0.5 + pw + px, 2 * (0.5 + pw + px)],
      explanation: t`Powers multiply the percentage uncertainties: $0.5 + 2(1.5) + 2(2.0) = ${0.5 + 2 * pw + 2 * px}\%$. The amplitude contributes most, so it is the measurement to improve first.`,
      hints: ["For a squared quantity, double its percentage uncertainty."],
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "For an undamped oscillator, the sum of the kinetic and potential energies is the same at every point of the motion.",
    answer: true,
    explanation: "True. With no resistive forces no energy leaves the system, so Eₖ + Eₚ = ½mω²x₀² throughout.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "At maximum displacement, an oscillator in s.h.m. has maximum kinetic energy.",
    answer: false,
    explanation: "False. At maximum displacement it is momentarily at rest: kinetic energy zero, potential energy maximum.",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Match each graph for an undamped simple harmonic oscillator with its shape.",
    pairs: [
      ["kinetic energy against displacement", "inverted parabola, maximum at x = 0"],
      ["potential energy against displacement", "parabola, minimum at x = 0"],
      ["total energy against displacement", "horizontal straight line"],
      ["kinetic energy against time", "cos²-shaped curve repeating every T/2"],
    ],
    explanation: "Eₖ = ½mω²(x₀² − x²); Eₚ = ½mω²x²; E constant; Eₖ = E cos²ωt.",
    hints: ["Use the energy equations."],
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the statements about an undamped oscillator.",
    template: "At the equilibrium position the energy is all {{blank:a}}. At maximum displacement it is all {{blank:b}}. The total energy is proportional to the square of the {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["kinetic"], choices: ["kinetic", "potential"] },
      { id: "b", accepted: ["potential"], choices: ["potential", "kinetic"] },
      { id: "c", accepted: ["amplitude"], choices: ["amplitude", "period", "mass"] },
    ],
    explanation: "Kinetic at the centre, potential at the extremes; E ∝ x₀².",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: t`Show that the total energy of a simple harmonic oscillator of mass $m$, angular frequency $\omega$ and amplitude $x_0$ is $\tfrac{1}{2}m\omega^2x_0^2$.`,
    points: [
      "At the equilibrium position the potential energy is zero, so the total energy equals the kinetic energy there.",
      t`The speed there is the maximum speed $v_0 = \omega x_0$.`,
      t`$E = \tfrac{1}{2}mv_0^2 = \tfrac{1}{2}m\omega^2x_0^2$ (constant because no energy is lost).`,
    ],
    modelAnswer: "At x = 0 the potential energy is zero, so all the energy is kinetic. The speed there is the maximum, v₀ = ωx₀. So E = ½mv₀² = ½mω²x₀², and this total stays constant in undamped motion.",
    explanation: "Equilibrium: all kinetic; v₀ = ωx₀; substitute.",
    hints: ["Where is all the energy kinetic?"],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the energy changes of a child on a playground swing during one complete oscillation, starting at one end of the swing. Assume no energy is lost.",
    points: [
      "At the end (maximum displacement) the child is momentarily at rest: all the energy is gravitational potential energy.",
      "Moving towards the lowest point, potential energy is converted to kinetic energy; at the lowest point kinetic energy is maximum.",
      "Rising to the other end, kinetic energy is converted back to potential energy, maximum again at the other end.",
      "The sequence then reverses back to the start; the total energy stays constant, and Eₖ peaks twice per oscillation.",
    ],
    modelAnswer: "At the start the child is at rest at the highest point, with only gravitational potential energy. Swinging down, potential energy becomes kinetic, which is greatest at the bottom. Rising to the other end, kinetic energy turns back into potential energy, and the child stops again. The return swing repeats the changes; the total energy is constant and the kinetic energy reaches its maximum twice per complete oscillation.",
    explanation: "Positions of maximum Eₚ and Eₖ, the conversions, constant total and twice per cycle.",
    hints: ["Where is the child moving fastest?"],
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 3,
    stem: "Describe the graphs of kinetic energy and potential energy against time for one oscillation of an undamped oscillator that starts at its equilibrium position.",
    points: [
      "Kinetic energy starts at its maximum E and falls to zero at T/4, rising to E at T/2 (a cos² shape).",
      "Potential energy starts at zero, rises to E at T/4 and returns to zero at T/2 (a sin² shape); both repeat every T/2.",
      "The curves are mirror images crossing at E/2, and their sum is constant at E; neither is ever negative.",
    ],
    modelAnswer: "Eₖ starts at E, falls to 0 at T/4 and returns to E at T/2; Eₚ starts at 0, rises to E at T/4 and falls to 0 at T/2. Both repeat every half period, never go negative, cross at E/2 and always add to E.",
    explanation: "cos² and sin² curves of period T/2 summing to E.",
    hints: ["The speed is maximum at equilibrium."],
  });
  // Practice structured: energy data (12 marks)
  {
    const m = 0.40, k = 32, x0 = 0.090;
    const w = Math.sqrt(k / m), E = 0.5 * k * x0 * x0;
    const xs = [0.03, 0.06, 0.09];
    const tab = table([t`$x\,/\,\text{m}$`, t`$E_p\,/\,\text{J}$`], xs.map((x) => [dpStr(x, 2), sfStr(0.5 * k * x * x, 3) === "0" ? "0" : dpStr(0.5 * k * x * x, 4)]));
    b.struct({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: t`A $0.40\ \text{kg}$ mass on a horizontal spring ($k = 32\ \text{N m}^{-1}$) oscillates on a frictionless track with amplitude $9.0\ \text{cm}$. The table gives the elastic potential energy at several displacements.

${tab}`,
      parts: [
        P.num({ label: "(a)", marks: 2, stem: t`Calculate the angular frequency, in $\text{rad s}^{-1}$.`, value: w, unit: "rad/s", wrong: [k / m], explanation: t`$\omega = \sqrt{k/m} = \sqrt{32/0.40} = ${sfStr(w, 3)}\ \text{rad s}^{-1}$.` }),
        P.num({ label: "(b)", marks: 2, stem: "Calculate the total energy of the oscillator, in J, to three significant figures.", value: E, unit: "J", wrong: [k * x0 * x0], explanation: t`$E = \tfrac{1}{2}m\omega^2x_0^2 = \tfrac{1}{2}kx_0^2 = \tfrac{1}{2} \times 32 \times 0.090^2 = ${sfStr(E, 3)}\ \text{J}$, the value of $E_p$ at $x = 0.09\ \text{m}$.` }),
        P.num({ label: "(c)", marks: 2, stem: "Calculate the kinetic energy at x = 0.030 m, in J, to three significant figures.", value: E - 0.5 * k * 0.03 ** 2, unit: "J", wrong: [0.5 * k * 0.03 ** 2], explanation: t`$E_k = E - E_p = ${sfStr(E, 3)} - ${dpStr(0.5 * k * 0.03 ** 2, 4)} = ${sfStr(E - 0.5 * k * 0.03 ** 2, 3)}\ \text{J}$.` }),
        P.num({ label: "(d)", marks: 2, stem: t`Calculate the speed at $x = 0.030\ \text{m}$, in $\text{m s}^{-1}$, to three significant figures.`, value: Math.sqrt((2 * (E - 0.5 * k * 0.03 ** 2)) / m), unit: "m/s", wrong: [(2 * (E - 0.5 * k * 0.03 ** 2)) / m], explanation: t`$v = \sqrt{2E_k/m} = ${sfStr(Math.sqrt((2 * (E - 0.5 * k * 0.03 ** 2)) / m), 3)}\ \text{m s}^{-1}$ (check: $\omega\sqrt{x_0^2 - x^2} = ${sfStr(w, 3)}\sqrt{0.0081 - 0.0009}$).` }),
        P.manual({ label: "(e)", marks: 2, stem: "Describe the graph of kinetic energy against displacement on the same axes as the potential energy.", points: ["An inverted parabola with maximum value (0.130 J) at x = 0.", "Falling to zero at x = ±0.090 m; at every x, Eₖ + Eₚ = 0.130 J (the curves cross at x = ±0.064 m)."], modelAnswer: "An inverted parabola, maximum 0.130 J at x = 0 and zero at x = ±0.090 m; it is the potential-energy curve reflected so that the two always add to 0.130 J, crossing at x = ±0.064 m." }),
        P.manual({ label: "(f)", marks: 2, stem: "In practice the track has a little friction. State and explain the effect on the total energy and the amplitude over many oscillations.", points: ["Friction does work against the motion, transferring energy to thermal energy, so the total energy decreases.", "Because E ∝ x₀², the amplitude decreases too (the oscillation is damped); the period is almost unchanged."], modelAnswer: "Friction transfers energy out of the oscillator as heat, so the total energy falls with time; since E is proportional to x₀², the amplitude gradually decreases, while the period stays nearly the same." }),
      ],
      explanation: "E = ½kx₀² = ½mω²x₀²; Eₖ = E − Eₚ.",
      hints: ["ω² = k/m.", "Total energy = Eₚ at maximum displacement."],
    });
  }
  // Practice structured: energy and time (6 marks)
  {
    const T = 1.2, E = 0.080;
    b.struct({
      d: 3, skill: "ANALYSIS", calculator: true,
      stem: t`An undamped oscillator of period $1.2\ \text{s}$ has total energy $0.090\ \text{J}$. It passes through its equilibrium position at $t = 0$.`,
      parts: [
        P.num({ label: "(a)", marks: 1, stem: "Calculate the period of the variation of its kinetic energy, in s.", value: T / 2, unit: "s", wrong: [T], explanation: t`Kinetic energy repeats every half oscillation: $${T / 2}\ \text{s}$.` }),
        P.num({ label: "(b)", marks: 2, stem: t`Calculate its potential energy at $t = 0.10\ \text{s}$, in J, to two significant figures.`, value: E * Math.sin(((2 * Math.PI) / T) * 0.1) ** 2, sf: 2, unit: "J", wrong: [E * Math.sin(((2 * Math.PI) / T) * 0.1)], explanation: t`$E_p = E\sin^2\omega t$ with $\omega t = \dfrac{2\pi}{1.2} \times 0.10 = \dfrac{\pi}{6}$: $0.090 \times 0.5^2 = ${sfStr(E * Math.sin(((2 * Math.PI) / T) * 0.1) ** 2, 2)}\ \text{J}$.` }),
        P.num({ label: "(c)", marks: 1, stem: "Calculate the earliest time after t = 0 at which the kinetic and potential energies are equal, in s.", value: T / 8, unit: "s", wrong: [T / 4], explanation: t`Equal when $\sin^2\omega t = \tfrac{1}{2}$, i.e. $\omega t = \pi/4$, $t = T/8 = ${T / 8}\ \text{s}$.` }),
        P.manual({ label: "(d)", marks: 2, stem: "Explain why the kinetic energy never becomes negative, although the velocity does.", points: ["Kinetic energy depends on v² (½mv²).", "v² is positive (or zero) whether the velocity is positive or negative."], modelAnswer: "Kinetic energy is ½mv², which depends on the square of the velocity, so it is positive for motion in either direction and zero only when v = 0." }),
      ],
      explanation: "Eₚ = E sin²ωt and Eₖ = E cos²ωt for an oscillator passing equilibrium at t = 0.",
      hints: ["Eₚ = E sin²ωt when x = x₀ sin ωt."],
    });
  }

  b.card("FORMULA", "Total energy in s.h.m.", t`$E = \tfrac{1}{2}m\omega^2x_0^2$`);
  b.card("FORMULA", "Kinetic energy at displacement x", t`$E_k = \tfrac{1}{2}m\omega^2(x_0^2 - x^2)$`);
  b.card("FORMULA", "Potential energy at displacement x", t`$E_p = \tfrac{1}{2}m\omega^2x^2$ (= ½kx² for a spring)`);
  b.card("FACT", "Energy and amplitude", "E ∝ x₀²: double the amplitude, four times the energy.");
  b.card("FACT", "Where Eₖ = Eₚ", t`At $x = \pm x_0/\sqrt{2} \approx \pm 0.71x_0$`);
  b.card("CONCEPT", "Energy against time", "Eₖ and Eₚ vary as cos² and sin², with period T/2 (frequency 2f).");
  b.card("CONCEPT", "Energy against displacement", "Eₚ: parabola; Eₖ: inverted parabola; total: horizontal line.");
  b.card("CONCEPT", "Undamped oscillation", "Total energy and amplitude constant; no resistive forces.");
});
