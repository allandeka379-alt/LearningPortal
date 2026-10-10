// W2a: aphys.oscillations.damping-resonance — damping types, free and forced oscillations, resonance, effect of damping, examples.
import { concept, P, t, chk, sfStr, dpStr, pctUnc, ln, table } from "../lib.mjs";

const f0 = (k, m) => Math.sqrt(k / m) / (2 * Math.PI);
concept("aphys.oscillations.damping-resonance", { file: "oscillations/damping-resonance", keyPrefix: "oscillations.damping-resonance" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is meant by resonance?",
    options: [
      ["the large amplitude produced when the driving frequency equals the natural frequency", "Correct: condition and effect are both stated."],
      ["the gradual decrease in amplitude caused by resistive forces", "That is damping."],
      ["oscillation of a system at its natural frequency with no driving force", "That is a free oscillation."],
      ["the return of a system to equilibrium in the shortest time", "That describes critical damping."],
    ],
    answer: "A",
    explanation: "Resonance: maximum amplitude of a forced oscillation when the driving frequency equals the natural frequency.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which type of damping returns a displaced system to equilibrium in the shortest time without it oscillating?",
    options: [
      ["critical damping", "Correct: the definition of critical damping."],
      ["light damping", "A lightly damped system oscillates many times before stopping."],
      ["heavy damping", "Heavy damping prevents oscillation but returns the system more slowly."],
      ["no damping", "An undamped system oscillates for ever."],
    ],
    answer: "A",
    explanation: "Critical damping: quickest return without overshoot, used in vehicle suspensions.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "A mass-spring system with natural frequency 3.0 Hz is driven by a vibration generator at 5.0 Hz. In the steady state, at what frequency does the mass oscillate?",
    options: [
      ["5.0 Hz", "Correct: a forced oscillation follows the driving frequency."],
      ["3.0 Hz", "The natural frequency appears only in free oscillations or start-up motion."],
      ["8.0 Hz", "Frequencies do not add in a forced oscillation."],
      ["2.0 Hz", "The difference of the frequencies is not the steady-state frequency."],
    ],
    answer: "A",
    explanation: "In the steady state a forced oscillator oscillates at the driving frequency; its amplitude depends on how close this is to the natural frequency.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "The damping of a forced oscillator is increased. How does its resonance curve (amplitude against driving frequency) change?",
    options: [
      ["The peak becomes lower and broader, and occurs at a slightly lower frequency.", "Correct: all three changes."],
      ["The peak becomes higher and narrower at the same frequency.", "This is the effect of reducing damping."],
      ["The peak becomes lower and narrower at a higher frequency.", "Damping broadens the peak and moves it slightly lower in frequency."],
      ["The curve is unchanged, because the natural frequency is unchanged.", "The natural frequency hardly changes, but the amplitude near resonance falls."],
    ],
    answer: "A",
    explanation: "More damping removes more energy each cycle, so a smaller amplitude is reached at resonance; the response is spread over a wider range and peaks slightly below f₀.",
    hints: ["Think about how much energy builds up at resonance."],
  });
  {
    const r = 0.90;
    const lost = 1 - r * r;
    chk(lost, 0.19, 1e-12);
    b.mcq({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: "The amplitude of a lightly damped pendulum decreases by 10% in each oscillation. What percentage of its energy is lost in each oscillation?",
      options: [
        ["19%", "Correct: energy ∝ amplitude², and 0.90² = 0.81."],
        ["10%", "Energy is proportional to amplitude squared, not amplitude."],
        ["20%", "This doubles 10% rather than squaring the factor 0.90."],
        ["81%", "81% is the energy remaining, not the energy lost."],
      ],
      answer: "A",
      explanation: t`$E \propto x_0^2$: $E_{\text{new}}/E_{\text{old}} = 0.90^2 = 0.81$, so $1 - 0.81 = 0.19$, i.e. 19% is lost.`,
      hints: ["Energy is proportional to amplitude squared."],
    });
  }
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is an example of useful resonance?",
    options: [
      ["tuning a radio receiver to one station", "Correct: the tuned circuit resonates at the chosen station's frequency."],
      ["a footbridge swaying when people walk across in step", "This is harmful resonance."],
      ["a vehicle part rattling at a certain engine speed", "This is unwanted resonance."],
      ["a building shaking violently during an earthquake", "This is destructive resonance."],
    ],
    answer: "A",
    explanation: "Useful: radio tuning, microwave ovens, musical instruments, MRI. Harmful: bridges, buildings, machinery.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why are vehicle suspensions designed to be close to critically damped?",
    options: [
      ["So the body settles quickly after a bump, without bouncing.", "Correct: critical damping gives the fastest return without oscillation."],
      ["So the body keeps oscillating gently, giving a smooth ride.", "Continued oscillation is uncomfortable and reduces tyre grip."],
      ["So the suspension becomes rigid and does not move at all.", "A rigid suspension would transmit every bump to the passengers."],
      ["So the natural frequency of the suspension becomes very high.", "Damping hardly changes the natural frequency."],
    ],
    answer: "A",
    explanation: "Light damping would leave the car bouncing; heavy damping would make it slow to recover and harsh over repeated bumps.",
    hints: ["What happens after the car goes over a bump?"],
  });
  {
    const k = 3.6e4, m = 400, spacing = 9.0;
    const v = f0(k, m) * spacing;
    b.mcq({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: t`A truck suspension carries $400\ \text{kg}$ on a spring of constant $3.6 \times 10^{4}\ \text{N m}^{-1}$. A road has gentle humps $9.0\ \text{m}$ apart. At about what speed is resonance most likely?`,
      options: [
        [t`$${sfStr(v, 2)}\ \text{m s}^{-1}$`, "Correct: f₀ = (1/2π)√(k/m) = 1.51 Hz; v = f₀ × 9.0 m."],
        [t`$${sfStr(Math.sqrt(k / m) * spacing, 2)}\ \text{m s}^{-1}$`, "This uses ω = √(k/m) as the frequency, missing the 2π."],
        [t`$${sfStr(spacing / f0(k, m), 2)}\ \text{m s}^{-1}$`, "This divides the spacing by the frequency instead of multiplying."],
        [t`$${sfStr(f0(k, m), 2)}\ \text{m s}^{-1}$`, "This is the natural frequency in Hz, not a speed."],
      ],
      answer: "A",
      explanation: t`$f_0 = \dfrac{1}{2\pi}\sqrt{\dfrac{3.6 \times 10^{4}}{400}} = ${sfStr(f0(k, m), 3)}\ \text{Hz}$. Humps are met at $v/9.0$ per second, so $v = ${sfStr(f0(k, m), 3)} \times 9.0 = ${sfStr(v, 2)}\ \text{m s}^{-1}$.`,
      hints: ["How many humps per second are met at speed v?"],
    });
  }
  {
    const A0 = 12.0, r = 0.85, n = 6;
    b.num({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A lightly damped oscillator has amplitude $12.0\ \text{cm}$. Each oscillation, its amplitude falls to 0.85 of its previous value. Calculate the amplitude after 6 oscillations, in cm, to two significant figures.`,
      value: A0 * r ** n, sf: 2, unit: "cm", wrong: [A0 * (1 - n * 0.15), A0 * r * n],
      explanation: t`Multiply by 0.85 each cycle: $12.0 \times 0.85^{6} = ${sfStr(A0 * r ** n, 2)}\ \text{cm}$. Subtracting 15% of 12.0 cm six times would give ${sfStr(A0 * (1 - n * 0.15), 2)} cm; the decay is by a constant fraction, not a constant amount.`,
      hints: ["The same fraction is lost each cycle."],
    });
  }
  {
    const k = 250, m = 0.40;
    b.num({
      d: 2, skill: "APPLICATION", daily: true, calculator: true,
      stem: t`A $0.40\ \text{kg}$ mass hangs from a spring of spring constant $250\ \text{N m}^{-1}$. Calculate the driving frequency that would cause resonance, in Hz, to three significant figures.`,
      value: f0(k, m), unit: "Hz", wrong: [Math.sqrt(k / m), 2 * Math.PI * Math.sqrt(m / k)],
      explanation: t`Resonance at the natural frequency: $f_0 = \dfrac{1}{2\pi}\sqrt{\dfrac{k}{m}} = \dfrac{1}{2\pi}\sqrt{\dfrac{250}{0.40}} = ${sfStr(f0(k, m), 3)}\ \text{Hz}$. ${sfStr(Math.sqrt(k / m), 3)} is ω in rad s⁻¹, not f.`,
    });
  }
  {
    const l = 0.62, g = 9.81;
    const f = Math.sqrt(g / l) / (2 * Math.PI);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`In a Barton's pendulums demonstration, a heavy driving pendulum of length $0.62\ \text{m}$ swings from a horizontal string. Calculate the frequency at which it drives the light pendulums, in Hz, to three significant figures, and state which light pendulum swings with the largest amplitude.`,
      value: f, unit: "Hz", wrong: [Math.sqrt(g / l), 2 * Math.PI * Math.sqrt(l / g)],
      explanation: t`1. $T = 2\pi\sqrt{l/g} = 2\pi\sqrt{0.62/9.81} = ${sfStr(2 * Math.PI * Math.sqrt(l / g), 3)}\ \text{s}$.
2. $f = 1/T = ${sfStr(f, 3)}\ \text{Hz}$.
3. The light pendulum of the same length, $0.62\ \text{m}$, has the same natural frequency and resonates with the largest amplitude.`,
      hints: ["The driver's frequency is its own natural frequency."],
    });
  }
  {
    const E0 = 0.50, frac = 0.92, n = 10;
    const En = E0 * frac ** n;
    b.calc({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`A damped oscillator starts with $0.50\ \text{J}$ of energy and loses 8.0% of its remaining energy every cycle. Calculate the amplitude after 10 cycles as a fraction of the initial amplitude, to two significant figures.`,
      value: Math.sqrt(En / E0), sf: 2, wrong: [En / E0, 1 - 0.08 * n],
      explanation: t`1. Energy after 10 cycles $= 0.50 \times 0.92^{10} = ${sfStr(En, 3)}\ \text{J}$, a fraction $${sfStr(En / E0, 3)}$.
2. Amplitude $\propto \sqrt{E}$: fraction $= \sqrt{${sfStr(En / E0, 3)}} = ${sfStr(Math.sqrt(En / E0), 2)}$.
3. Forgetting the square root gives ${sfStr(En / E0, 2)}, the energy fraction.`,
      hints: ["Find the energy fraction first.", "Amplitude ∝ √E."],
    });
  }
  // Uncertainty/practical
  {
    const A = [8.0, 6.6, 5.4, 4.5, 3.7];
    const dA = 0.2;
    b.num({
      d: 3, skill: "ANALYSIS", calculator: true,
      stem: t`Rudo measures successive amplitudes of a damped pendulum with a metre rule behind it: ${A.map((x) => x.toFixed(1)).join(", ")} cm, each to $\pm 0.2\ \text{cm}$. Calculate the percentage uncertainty in the smallest amplitude, to two significant figures.`,
      value: pctUnc(dA, A[4]), sf: 2, unit: "%", wrong: [pctUnc(dA, A[0])],
      explanation: t`$\dfrac{0.2}{3.7} \times 100 = ${sfStr(pctUnc(dA, A[4]), 2)}\%$, against ${sfStr(pctUnc(dA, A[0]), 2)}% for the first reading: small amplitudes are least precise. Filming against a scale and reading frame by frame would reduce the uncertainty and parallax.`,
      hints: ["Percentage uncertainty = absolute ÷ value × 100."],
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Light damping reduces the amplitude of a free oscillation but has very little effect on its period.",
    answer: true,
    explanation: "True. Lightly damped oscillations occur at almost the natural frequency; only the amplitude decays.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A heavily damped system returns to equilibrium faster than a critically damped one.",
    answer: false,
    explanation: "False. Critical damping gives the fastest return without oscillation; heavy damping is slower.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each situation with the type of damping or oscillation.",
    pairs: [
      ["a pendulum swinging in air, slowly dying away", "light damping"],
      ["a car body settling after a bump without bouncing", "critical damping"],
      ["a pendulum released in thick oil, creeping back to the vertical", "heavy damping"],
      ["a child pushed on a swing once each swing", "forced oscillation at resonance"],
    ],
    explanation: "Light: decaying oscillations; critical: quickest return, no overshoot; heavy: slow return; pushing in time drives at the natural frequency.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the statements.",
    template: "Damping is caused by {{blank:a}} forces, which remove energy from the oscillator. A forced oscillation in the steady state has the frequency of the {{blank:b}}. Increasing the damping makes the resonance peak {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["resistive"], choices: ["resistive", "restoring", "driving"] },
      { id: "b", accepted: ["driver"], choices: ["driver", "natural oscillation", "damping force"] },
      { id: "c", accepted: ["lower and broader"], choices: ["lower and broader", "higher and narrower", "unchanged"] },
    ],
    explanation: "Resistive forces damp; forced oscillations follow the driver; more damping → lower, broader peak.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 2,
    stem: "Define resonance.",
    points: ["The amplitude of a forced oscillation becomes a maximum…", "…when the driving frequency equals the natural frequency of the system."],
    modelAnswer: "Resonance is the maximum amplitude of a forced oscillation, which occurs when the driving frequency equals the natural frequency of the oscillating system.",
    explanation: "Effect and condition.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the displacement-time graphs for a system released from the same displacement with (i) light damping, (ii) critical damping and (iii) heavy damping.",
    points: [
      "(i) Oscillations at about the natural period with amplitude decreasing gradually (by a constant fraction each cycle).",
      "(ii) Returns to zero displacement in the shortest time with no overshoot (no oscillation).",
      "(iii) Returns to zero with no oscillation, but more slowly than (ii).",
      "All start at the same displacement with zero gradient (released from rest).",
    ],
    modelAnswer: "All three start at the same displacement with zero velocity. With light damping the graph oscillates about zero with nearly the natural period and an amplitude that decays gradually. With critical damping it falls to zero in the shortest time without crossing the axis. With heavy damping it also does not cross the axis but approaches zero much more slowly.",
    explanation: "Shape of each graph and the comparison of return times.",
    hints: ["Which ones cross the time axis?"],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why the amplitude of a forced oscillation reaches a steady value rather than growing for ever, even at resonance.",
    points: [
      "The driver transfers energy to the oscillator each cycle (most efficiently at resonance).",
      "Damping removes energy each cycle, and the energy lost per cycle increases as the amplitude (and speed) increases.",
      "The amplitude stops growing when the energy lost per cycle equals the energy supplied per cycle.",
    ],
    modelAnswer: "Each cycle the driver supplies energy, while damping removes energy at a rate that grows with the amplitude. The amplitude increases until the energy lost per cycle equals the energy supplied per cycle; then it stays constant.",
    explanation: "Balance of energy supplied and energy dissipated.",
    hints: ["Compare energy in and energy out per cycle."],
  });
  // Practice structured: resonance curve data (14 marks)
  {
    const fs = [1.2, 2.2, 2.6, 3.0, 3.2, 3.4, 3.8, 4.6];
    const Al = [1.2, 2.1, 4.6, 9.8, 7.4, 4.2, 1.9, 0.9];
    const tab = table(["driving frequency / Hz", "amplitude / mm"], fs.map((f, i) => [f.toFixed(1), Al[i].toFixed(1)]));
    const m = 0.15;
    const fPeak = 3.0;
    const k = m * (2 * Math.PI * fPeak) ** 2;
    b.struct({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`A $0.15\ \text{kg}$ mass hangs from a spring attached to a vibration generator. Tatenda varies the driving frequency and records the amplitude of the mass.

${tab}`,
      parts: [
        P.num({ label: "(a)", marks: 1, stem: "State the driving frequency at which resonance occurs, in Hz.", value: fPeak, dp: 1, unit: "Hz", wrong: [3.2], explanation: "The largest amplitude, 9.8 mm, is at 3.0 Hz." }),
        P.num({ label: "(b)", marks: 3, stem: t`Assuming light damping, so that the resonant frequency equals the natural frequency, calculate the spring constant, in $\text{N m}^{-1}$, to two significant figures.`, value: k, sf: 2, unit: "N/m", wrong: [m * fPeak ** 2, m * 2 * Math.PI * fPeak], explanation: t`$f_0 = \dfrac{1}{2\pi}\sqrt{k/m} \Rightarrow k = m(2\pi f_0)^2 = 0.15 \times (2\pi \times 3.0)^2 = ${sfStr(k, 2)}\ \text{N m}^{-1}$.` }),
        P.manual({ label: "(c)", marks: 2, stem: "Describe the shape of the graph of amplitude against driving frequency.", points: ["Small amplitude at low frequency, rising to a sharp peak (9.8 mm) at 3.0 Hz.", "Falling again on the high-frequency side to below the low-frequency value (0.9 mm at 4.6 Hz)."], modelAnswer: "The amplitude is small at low frequencies, rises steeply to a peak of 9.8 mm at 3.0 Hz and falls again at higher frequencies, to less than its low-frequency value at 4.6 Hz." }),
        P.manual({ label: "(d)", marks: 3, stem: "A light card is fixed to the mass to increase air resistance and the experiment is repeated. Describe the new curve compared with the original.", points: ["The peak amplitude is smaller.", "The peak is broader (flatter).", "The peak is at a slightly lower frequency; far from resonance the amplitudes are almost unchanged."], modelAnswer: "With more damping the peak is lower and broader and occurs at a slightly lower frequency; well away from resonance the amplitudes are similar to before." }),
        P.manual({ label: "(e)", marks: 3, stem: "Suggest three improvements to the procedure for locating the resonant frequency more precisely.", points: ["Take more readings at smaller frequency steps (e.g. 0.05 Hz) between 2.6 Hz and 3.4 Hz.", "Wait for the amplitude to become steady after each change of frequency before measuring.", "Measure amplitude with a scale behind the mass at eye level / video the motion against a scale / repeat each reading."], modelAnswer: "Take readings every 0.05 Hz around 3 Hz, wait for the amplitude to settle after each change, and measure the amplitude from a video against a scale (or at eye level against a mirror scale), repeating readings." }),
        P.manual({ label: "(f)", marks: 2, stem: "State one safety precaution and one precaution to ensure the readings are valid.", points: ["Safety: clamp the stand firmly / keep clear of the oscillating mass, in case it detaches at large amplitude (start the generator at low amplitude).", "Validity: keep the generator's output amplitude constant throughout (same driving force)."], modelAnswer: "Clamp the stand so it cannot topple and keep clear of the mass in case it flies off at large amplitude; keep the signal generator's output amplitude the same for every reading." }),
      ],
      explanation: "Resonance at the peak; f₀ = (1/2π)√(k/m); damping lowers and broadens the peak.",
      hints: ["The resonant frequency is where the amplitude is largest.", "Rearrange f₀ = (1/2π)√(k/m) for k."],
    });
  }
  // Practice structured: footbridge (8 marks)
  {
    const fn = 1.8, step = 0.75;
    b.struct({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A new footbridge over a river has a natural frequency of vertical oscillation of $${fn}\ \text{Hz}$. People walking briskly take about two steps per second, each of length $${step}\ \text{m}$.`,
      parts: [
        P.manual({ label: "(a)", marks: 2, stem: "Explain why a large group walking in step could make the bridge oscillate with a large amplitude.", points: ["Their footsteps apply a periodic driving force at about 2 Hz, close to the bridge's natural frequency of 1.8 Hz.", "So resonance occurs: energy is transferred efficiently each cycle and the amplitude builds up."], modelAnswer: "Walking in step applies a periodic force at about 2 Hz, close to the natural frequency of 1.8 Hz, so the bridge resonates and absorbs energy each step, building a large amplitude." }),
        P.num({ label: "(b)", marks: 2, stem: t`Calculate the walking speed, in $\text{m s}^{-1}$, at which the step frequency equals the natural frequency.`, value: fn * step, unit: "m/s", wrong: [step / fn], explanation: t`$v = f \times \text{step length} = ${fn} \times ${step} = ${sfStr(fn * step, 3)}\ \text{m s}^{-1}$.` }),
        P.manual({ label: "(c)", marks: 2, stem: "Suggest two ways engineers could reduce the problem.", points: ["Add dampers (shock absorbers / tuned mass dampers) to remove energy and limit the amplitude.", "Stiffen the bridge (or change its mass) so the natural frequency is far from walking frequencies."], modelAnswer: "Fit dampers that dissipate energy and so limit the amplitude, or stiffen the structure so that its natural frequency is well above walking frequencies." }),
        P.manual({ label: "(d)", marks: 2, stem: "Soldiers are traditionally ordered to break step when crossing a bridge. Explain why.", points: ["Breaking step means the footsteps are no longer periodic/in phase…", "…so there is no single driving frequency to cause resonance; the forces partly cancel."], modelAnswer: "If the soldiers break step their footfalls are spread randomly in time, so there is no strong periodic driving force at one frequency and resonance cannot build up." }),
      ],
      explanation: "Periodic forcing near the natural frequency causes resonance; damping or a changed natural frequency reduces it.",
      hints: ["Compare the step frequency with 1.8 Hz."],
    });
  }

  b.card("DEFINITION", "**Damping**", "Loss of energy from an oscillating system due to resistive forces; amplitude decreases.");
  b.card("DEFINITION", "**Critical damping**", "Return to equilibrium in the shortest time without oscillating.");
  b.card("CONCEPT", "Light vs heavy damping", "Light: decaying oscillations at nearly the natural frequency. Heavy: no oscillation, slow return.");
  b.card("DEFINITION", "**Forced oscillation**", "Oscillation driven by a periodic external force; steady state at the driving frequency.");
  b.card("DEFINITION", "**Resonance**", "Maximum amplitude when the driving frequency equals the natural frequency.");
  b.card("CONCEPT", "Effect of damping on resonance", "Lower, broader peak at a slightly lower frequency.");
  b.card("FACT", "Useful resonance", "Radio tuning, microwave ovens, musical instruments, MRI.");
  b.card("FACT", "Harmful resonance", "Bridges, buildings in earthquakes, rattling vehicle and machine parts.");
  b.card("FORMULA", "Energy lost per cycle from amplitude ratio r", t`Fraction lost $= 1 - r^2$ (since $E \propto x_0^2$)`);
});
