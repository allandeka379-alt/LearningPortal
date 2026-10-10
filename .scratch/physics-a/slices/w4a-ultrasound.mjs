// W4a: aphys.medical.ultrasound (Cambridge only, A Level) — piezoelectric transducers, pulse-echo, Z = ρc,
// intensity reflection coefficient, coupling gel, attenuation I = I₀e^(−μx), depth from echo time.
import { concept, P, t, chk, DATA, sfStr, dpStr, sciTex, sciPlain, pctUnc, reflectionCoeff, attenuate, linFit, ln, table } from "../lib.mjs";

concept("aphys.medical.ultrasound", { file: "medical/ultrasound", keyPrefix: "medical.ultrasound" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the piezoelectric effect?",
    options: [
      ["the production of a p.d. across a crystal when it is mechanically stressed", "Correct (and the converse: a p.d. changes its shape)."],
      ["the reflection of ultrasound at a boundary between two media", "Reflection depends on acoustic impedance, not on piezoelectricity."],
      ["the heating of a crystal when an alternating current is passed through it for some time", "This is just resistive heating."],
      ["the emission of electrons from a crystal when ultrasound falls on it", "Ultrasound does not eject electrons."],
    ],
    answer: "A",
    explanation: "Stress produces a p.d. (detection); a p.d. produces a change of shape (generation).",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why is a gel applied between an ultrasound transducer and the patient's skin?",
    options: [
      ["To exclude air, so that very little ultrasound is reflected at the skin.", "Correct: air has a tiny Z compared with skin."],
      ["To cool the skin, which is heated by the ultrasound.", "Diagnostic ultrasound causes negligible heating."],
      ["To absorb unwanted echoes from inside the body.", "The gel transmits ultrasound; it does not absorb echoes."],
      ["To increase the frequency of the ultrasound that enters the patient's body through the skin.", "Frequency is set by the transducer, not the gel."],
    ],
    answer: "A",
    explanation: "Without gel, the air gap's impedance mismatch reflects about 99.9% of the intensity; the gel matches the skin's impedance.",
  });
  {
    const rho = 1040, c = 1570;
    b.mcq({
      d: 2, skill: "APPLICATION", daily: true, calculator: true,
      stem: t`Blood has a density of $1040\ \text{kg m}^{-3}$ and the speed of sound in it is $1570\ \text{m s}^{-1}$. What is its specific acoustic impedance?`,
      options: [
        [t`$${sciTex(rho * c)}\ \text{kg m}^{-2}\ \text{s}^{-1}$`, "Correct: Z = ρc."],
        [t`$${sfStr(c / rho, 3)}\ \text{kg m}^{-2}\ \text{s}^{-1}$`, "Z is the product, not the ratio, of c and ρ."],
        [t`$${sfStr(rho / c, 3)}\ \text{kg m}^{-2}\ \text{s}^{-1}$`, "Z is ρ multiplied by c."],
        [t`$${sciTex(rho * c * c)}\ \text{kg m}^{-2}\ \text{s}^{-1}$`, "This is ρc², not ρc."],
      ],
      answer: "A",
      explanation: t`$Z = \rho c = 1040 \times 1570 = ${sciTex(rho * c)}\ \text{kg m}^{-2}\ \text{s}^{-1}$.`,
    });
  }
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which pair of media gives the largest intensity reflection coefficient at their boundary?",
    options: [
      ["air and soft tissue", "Correct: the largest impedance mismatch (about 4 × 10² against 1.6 × 10⁶)."],
      ["fat and muscle", "Their impedances are similar, so little is reflected."],
      ["blood and soft tissue", "Almost identical impedances."],
      ["coupling gel and skin", "The gel is chosen to match the skin."],
    ],
    answer: "A",
    explanation: "I_R/I₀ depends on (Z₁ − Z₂)²/(Z₁ + Z₂)², largest when the impedances are most different.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "How is the same piezoelectric transducer able both to send and to receive ultrasound pulses?",
    options: [
      ["It emits a short pulse, then acts as a receiver, producing a p.d. when echoes deform the crystal.", "Correct."],
      ["It emits continuously and filters out its own signal to leave the echoes.", "Pulse-echo needs separate emission and listening periods."],
      ["Half the crystal emits while the other half receives.", "One crystal does both, at different times."],
      ["The returning echoes reverse the current in the crystal, which then switches it back to emitting mode.", "Echoes produce a small p.d.; they do not switch the mode."],
    ],
    answer: "A",
    explanation: "Pulse, then listen: the reverse piezoelectric effect generates, the direct effect detects.",
    hints: ["The pulses are short and the gaps between them are long."],
  });
  {
    const tEcho = 104e-6, c = 1540;
    b.mcq({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`An echo is received $104\ \mu\text{s}$ after a pulse is emitted into soft tissue, where the speed of sound is $1540\ \text{m s}^{-1}$. How deep is the reflecting boundary?`,
      options: [
        [t`$${sfStr((c * tEcho * 100) / 2, 3)}\ \text{cm}$`, "Correct: d = ct/2."],
        [t`$${sfStr(c * tEcho * 100, 3)}\ \text{cm}$`, "This is the total distance there and back."],
        [t`$${sfStr((c * tEcho * 100) / 4, 3)}\ \text{cm}$`, "Divide the round trip by 2, not 4."],
        [t`$${sfStr(((330 * tEcho) / 2) * 100, 3)}\ \text{cm}$`, "330 m s⁻¹ is the speed of sound in air, not tissue."],
      ],
      answer: "A",
      explanation: t`$d = \dfrac{ct}{2} = \dfrac{1540 \times 104 \times 10^{-6}}{2} = ${sfStr((c * tEcho) / 2, 3)}\ \text{m}$.`,
      hints: ["The pulse goes to the boundary and back."],
    });
  }
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why is a higher ultrasound frequency used to image structures close to the skin than to image deep organs?",
    options: [
      ["Higher frequencies give finer detail but are attenuated more, so they do not penetrate as far.", "Correct: a trade-off between resolution and depth."],
      ["Higher frequencies travel faster, so their echoes return sooner.", "The speed in tissue is nearly independent of frequency."],
      ["Higher frequencies are reflected less at tissue boundaries, so more of each pulse reaches the shallow organs.", "Reflection depends on impedances, not frequency."],
      ["Lower frequencies cannot be produced by small transducers.", "Transducer size is not the reason."],
    ],
    answer: "A",
    explanation: "Shorter wavelength resolves smaller details, but μ increases with frequency, limiting depth.",
    hints: ["Think about wavelength and about attenuation."],
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "An ultrasound beam passes from muscle into bone. Which statement explains why structures behind bone are hard to image?",
    options: [
      ["A large fraction is reflected at the boundary and bone attenuates strongly, so little reaches beyond it.", "Correct: impedance mismatch plus high attenuation."],
      ["Bone has a lower acoustic impedance than muscle, so the ultrasound speeds up inside it and its energy is lost to the surroundings.", "Bone has a much higher impedance."],
      ["Ultrasound cannot travel through solids.", "Sound travels well through solids; the problem is reflection and attenuation."],
      ["The echoes from behind bone return too quickly to be detected.", "Echoes from deeper structures take longer, not less time."],
    ],
    answer: "A",
    explanation: "Muscle-bone reflects about 40% of the intensity and bone attenuates strongly, casting an acoustic shadow.",
    hints: ["Compare the impedances of muscle and bone."],
  });
  // Numerical
  {
    const Z1 = 1.35e6, Z2 = 1.62e6; // fat, kidney
    const R = reflectionCoeff(Z1, Z2);
    b.num({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`Fat has an acoustic impedance of $1.35 \times 10^{6}\ \text{kg m}^{-2}\ \text{s}^{-1}$ and kidney tissue $1.62 \times 10^{6}\ \text{kg m}^{-2}\ \text{s}^{-1}$. Calculate the intensity reflection coefficient at the boundary, to two significant figures.`,
      value: R, sf: 2, answer: sciPlain(R, 2), wrong: [(Z2 - Z1) / (Z1 + Z2), (Z1 - Z2) ** 2 / (Z1 * Z2)],
      explanation: t`$\dfrac{I_R}{I_0} = \dfrac{(1.62 - 1.35)^2}{(1.62 + 1.35)^2} = \dfrac{0.0729}{8.82} = ${sciTex(R, 2)}$. Forgetting to square gives the amplitude ratio, not the intensity ratio.`,
      hints: ["Square both the difference and the sum."],
    });
  }
  {
    const mu = 70, x = 0.030;
    const f = attenuate(1, mu, x);
    b.num({
      d: 2, skill: "APPLICATION", daily: true, calculator: true,
      stem: t`Ultrasound of a certain frequency has an attenuation coefficient of $70\ \text{m}^{-1}$ in muscle. Calculate the fraction of the intensity remaining after it has travelled $3.0\ \text{cm}$ through muscle, to two significant figures.`,
      value: f, sf: 2, wrong: [attenuate(1, mu, 3.0), 1 - mu * x],
      explanation: t`$I/I_0 = e^{-\mu x} = e^{-70 \times 0.030} = e^{-2.1} = ${sfStr(f, 2)}$. Leaving $x$ in cm gives a meaningless tiny value.`,
    });
  }
  {
    const Ia = 0.50, Ib = 0.20, x = 0.025;
    const mu = Math.log(Ia / Ib) / x;
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`An ultrasound beam's intensity falls from $0.50\ \text{W m}^{-2}$ to $0.20\ \text{W m}^{-2}$ in passing through $2.5\ \text{cm}$ of tissue. Calculate the attenuation coefficient, in $\text{m}^{-1}$, to two significant figures.`,
      value: mu, sf: 2, unit: "m⁻¹", wrong: [Math.log10(Ia / Ib) / x, Math.log(Ia / Ib) / 2.5],
      explanation: t`1. $I = I_0e^{-\mu x} \Rightarrow \mu = \dfrac{\ln(I_0/I)}{x}$.
2. $\mu = \dfrac{\ln(0.50/0.20)}{0.025} = \dfrac{${dpStr(Math.log(Ia / Ib), 3)}}{0.025} = ${sfStr(mu, 2)}\ \text{m}^{-1}$.
3. Using lg instead of ln, or x in cm, are the usual errors.`,
      hints: ["Take natural logs."],
    });
  }
  {
    const mu = 55, d = 0.040, Rb = 0.012; // boundary reflection coefficient
    const frac = attenuate(1, mu, 2 * d) * Rb;
    b.calc({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`A pulse enters soft tissue (attenuation coefficient $55\ \text{m}^{-1}$) and is reflected at a boundary $4.0\ \text{cm}$ below the skin, where the intensity reflection coefficient is $0.012$. Calculate the intensity of the echo arriving back at the skin as a fraction of the intensity that entered, to two significant figures. Assume no other losses.`,
      value: frac, sf: 2, answer: sciPlain(frac, 2), wrong: [attenuate(1, mu, d) * Rb, attenuate(1, mu, 2 * d)],
      explanation: t`1. The pulse travels $4.0\ \text{cm}$ down and $4.0\ \text{cm}$ back: $x = 0.080\ \text{m}$.
2. Attenuation over the round trip: $e^{-55 \times 0.080} = ${sfStr(attenuate(1, mu, 2 * d), 3)}$.
3. Fraction returning $= 0.012 \times ${sfStr(attenuate(1, mu, 2 * d), 3)} = ${sciTex(frac, 2)}$. This is why the scanner amplifies late (deep) echoes more.`,
      hints: ["The pulse is attenuated on the way down and on the way back."],
    });
  }
  {
    const t1 = 42e-6, t2 = 97e-6, c = 1540;
    const thick = (c * (t2 - t1)) / 2;
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`In an A-scan of an eye, echoes from the front and back of the lens arrive $42\ \mu\text{s}$ and $97\ \mu\text{s}$ after the pulse. Taking the speed of sound as $1540\ \text{m s}^{-1}$, calculate the thickness of the lens, in mm, to two significant figures.`,
      value: thick * 1000, sf: 2, unit: "mm", wrong: [c * (t2 - t1) * 1000, ((c * t2) / 2) * 1000],
      explanation: t`1. Time difference $= 97 - 42 = 55\ \mu\text{s}$ for the extra round trip through the lens.
2. Thickness $= \dfrac{1540 \times 55 \times 10^{-6}}{2} = ${sfStr(thick * 1000, 2)}\ \text{mm}$. (Sound travels faster in the lens than in watery tissue, so this is an estimate.)`,
      hints: ["Use the difference between the two echo times."],
    });
  }
  {
    const t0 = 64, dt = 2, c = 1540, dc = 20;
    const pct = pctUnc(dt, t0) + pctUnc(dc, c);
    b.num({
      d: 3, skill: "EVALUATION", calculator: true,
      stem: t`The depth of a boundary is found from $d = ct/2$ with $t = 64 \pm 2\ \mu\text{s}$ and $c = 1540 \pm 20\ \text{m s}^{-1}$. Calculate the percentage uncertainty in $d$, to two significant figures.`,
      value: pct, sf: 2, unit: "%", wrong: [pctUnc(dt, t0)],
      explanation: t`$\%d = \%t + \%c = \dfrac{2}{64} \times 100 + \dfrac{20}{1540} \times 100 = ${sfStr(pctUnc(dt, t0), 2)} + ${sfStr(pctUnc(dc, c), 2)} = ${sfStr(pct, 2)}\%$ (the factor ½ is exact).`,
      hints: ["Percentage uncertainties add for a product."],
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Ultrasound is preferred to X-rays for routine imaging of a fetus because, at diagnostic intensities, it is not ionising.",
    answer: true,
    explanation: "True. Ultrasound is a mechanical wave and does not ionise atoms, so it carries no known risk at diagnostic intensities.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each quantity with its unit.",
    pairs: [
      ["specific acoustic impedance", "kg m⁻² s⁻¹"],
      ["attenuation coefficient", "m⁻¹"],
      ["intensity", "W m⁻²"],
      ["intensity reflection coefficient", "no unit"],
    ],
    explanation: "Z = ρc: kg m⁻³ × m s⁻¹; μ in m⁻¹; intensity in W m⁻²; I_R/I₀ is a ratio.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the statements.",
    template: "Ultrasound is produced when an alternating {{blank:a}} is applied to a piezoelectric crystal, making it vibrate at its {{blank:b}} frequency. The fraction of intensity reflected at a boundary depends on the difference in acoustic {{blank:c}} of the two media.",
    blanks: [
      { id: "a", accepted: ["potential difference"], choices: ["potential difference", "magnetic field", "temperature"] },
      { id: "b", accepted: ["resonant"], choices: ["resonant", "threshold", "fundamental"] },
      { id: "c", accepted: ["impedance"], choices: ["impedance", "density", "attenuation"] },
    ],
    explanation: "Alternating p.d. → vibration at resonance; reflection depends on Z₁ and Z₂.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain how a piezoelectric transducer is used to produce an ultrasound image of a boundary inside the body.",
    points: [
      "An alternating p.d. (at the crystal's resonant frequency) makes the crystal vibrate, emitting a short pulse of ultrasound into the body (through gel).",
      "The pulse is partly reflected at boundaries between tissues with different acoustic impedances.",
      "The returning echo makes the crystal vibrate, producing a p.d. that is amplified and detected (the transducer acts as a receiver between pulses).",
      "The time delay gives the depth (d = ct/2) and the echo strength gives information about the boundary; sweeping the beam builds an image (B-scan).",
    ],
    modelAnswer: "An alternating p.d. at the crystal's resonant frequency makes it vibrate and send a short ultrasound pulse into the body through a coupling gel. At each boundary between tissues of different acoustic impedance part of the pulse is reflected. Between pulses the transducer listens: an echo deforms the crystal, producing a small p.d. that is amplified. The delay gives the depth of the boundary, d = ct/2, and its size gives information about the boundary; sweeping the beam across the body builds a two-dimensional image.",
    explanation: "Generate, reflect, detect, time.",
    hints: ["Describe both uses of the crystal."],
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 3,
    stem: "Explain, with reference to acoustic impedance, why almost no ultrasound enters the body if the gel is not used.",
    points: [
      "Without gel, air is trapped between the transducer and the skin.",
      "Air's acoustic impedance (about 400 kg m⁻² s⁻¹) is very much smaller than that of skin (about 1.6 × 10⁶).",
      "So the intensity reflection coefficient is almost 1 (about 0.999): nearly all the ultrasound is reflected at the air-skin boundary.",
    ],
    modelAnswer: "Without gel there is a layer of air between the probe and the skin. The impedance of air is about four thousand times smaller than that of skin, so (Z₁ − Z₂)²/(Z₁ + Z₂)² is about 0.999 and almost all the ultrasound is reflected at the boundary.",
    explanation: "Large mismatch, near-total reflection.",
    hints: ["Compare Z for air and for skin."],
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 2,
    stem: "Define specific acoustic impedance and state how the intensity reflected at a boundary depends on it.",
    points: ["Z = density × speed of sound in the medium (ρc).", "The larger the difference between the impedances of the two media, the larger the fraction reflected: I_R/I₀ = (Z₁ − Z₂)²/(Z₁ + Z₂)²."],
    modelAnswer: "Specific acoustic impedance is the product of the density of a medium and the speed of sound in it, Z = ρc. The fraction of intensity reflected at a boundary is (Z₁ − Z₂)²/(Z₁ + Z₂)², so it is large when the impedances are very different.",
    explanation: "Z = ρc.",
  });
  // Practice structured
  {
    const xs = [0.5, 1.0, 1.5, 2.0, 2.5, 3.0]; // cm
    const mu = 62; // m^-1
    const noise = [0.004, -0.006, 0.005, -0.003, 0.002, -0.002];
    const I = xs.map((x, i) => Number((attenuate(1, mu, x / 100) + noise[i]).toFixed(3)));
    const y = I.map(ln);
    const fit = linFit(xs.map((x) => x / 100), y);
    const row = 2;
    b.struct({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`Thandeka measures the fraction $I/I_0$ of ultrasound intensity transmitted through slabs of a tissue-mimicking gel of different thickness $x$:

${table([t`$x\,/\,\text{cm}$`, t`$I/I_0$`, t`$\ln(I/I_0)$`], xs.map((x, i) => [dpStr(x, 1), dpStr(I[i], 3), i === row ? "" : dpStr(y[i], 3)]))}`,
      parts: [
        P.num({ label: "(a)", marks: 1, stem: "Calculate the missing value of ln(I/I₀), to three decimal places. Include the sign.", value: y[row], dp: 3, wrong: [Math.log10(I[row])], explanation: t`$\ln ${dpStr(I[row], 3)} = ${dpStr(y[row], 3)}$.` }),
        P.manual({ label: "(b)", marks: 2, stem: "Explain why a graph of ln(I/I₀) against x should be a straight line through the origin, and how μ is found from it.", points: [t`$I = I_0e^{-\mu x} \Rightarrow \ln(I/I_0) = -\mu x$: the form $y = mx$.`, t`Gradient $= -\mu$ (with $x$ in m, $\mu$ in $\text{m}^{-1}$).`], modelAnswer: t`Since $I/I_0 = e^{-\mu x}$, $\ln(I/I_0) = -\mu x$, a straight line through the origin with gradient $-\mu$.` }),
        P.num({ label: "(c)", marks: 2, stem: t`Determine the attenuation coefficient $\mu$, in $\text{m}^{-1}$, to two significant figures.`, value: -fit.m, sf: 2, tol: 4, unit: "m⁻¹", wrong: [-fit.m / 100], explanation: t`Gradient (with $x$ in m) $\approx ${sfStr(fit.m, 2)}\ \text{m}^{-1}$, so $\mu \approx ${sfStr(-fit.m, 2)}\ \text{m}^{-1}$.` }),
        P.num({ label: "(d)", marks: 1, stem: "Use your value of μ to calculate the thickness of gel that halves the intensity, in cm, to two significant figures.", value: (Math.log(2) / -fit.m) * 100, sf: 2, tol: 0.08, unit: "cm", wrong: [(0.5 / -fit.m) * 100], explanation: t`$x_{1/2} = \ln 2/\mu \approx 0.693/${sfStr(-fit.m, 2)} = ${sfStr((Math.log(2) / -fit.m) * 100, 2)}\ \text{cm}$.` }),
        P.manual({ label: "(e)", marks: 2, stem: "Suggest two precautions to make the readings reliable.", points: ["Use gel between the transducers and each slab (no air gaps), and the same pressure/contact each time.", "Keep the frequency, transducer separation/alignment and output constant; repeat each reading and average."], modelAnswer: "Couple the transducers to each slab with gel so there is no air, using the same contact pressure, and keep the frequency, alignment and output power the same; repeat and average each reading." }),
      ],
      explanation: "ln(I/I₀) = −μx: gradient −μ; half-thickness ln 2/μ.",
      hints: ["Take natural logs of I = I₀e^(−μx)."],
    });
    chk(Math.abs(-fit.m - mu) < 5 ? 1 : 0, 1);
  }
  {
    const Zf = 1.38e6, Zm = 1.70e6, Zb = 7.80e6;
    const Rfm = reflectionCoeff(Zf, Zm), Rmb = reflectionCoeff(Zm, Zb);
    b.struct({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`An ultrasound pulse passes through a layer of fat into muscle and then meets bone. Acoustic impedances (in $\text{kg m}^{-2}\ \text{s}^{-1}$): fat $1.38 \times 10^{6}$, muscle $1.70 \times 10^{6}$, bone $7.80 \times 10^{6}$. Ignore attenuation.`,
      parts: [
        P.num({ label: "(a)", marks: 2, stem: "Calculate the fraction of the incident intensity reflected at the fat-muscle boundary, to two significant figures.", value: Rfm, sf: 2, answer: sciPlain(Rfm, 2), wrong: [(Zm - Zf) / (Zm + Zf)], explanation: t`$\dfrac{(1.70 - 1.38)^2}{(1.70 + 1.38)^2} = ${sciTex(Rfm, 2)}$.` }),
        P.num({ label: "(b)", marks: 2, stem: "Calculate the fraction reflected at the muscle-bone boundary, to two significant figures.", value: Rmb, sf: 2, wrong: [(Zb - Zm) / (Zb + Zm)], explanation: t`$\dfrac{(7.80 - 1.70)^2}{(7.80 + 1.70)^2} = ${sfStr(Rmb, 2)}$.` }),
        P.manual({ label: "(c)", marks: 2, stem: "Use your answers to explain why ultrasound gives clear images of soft-tissue boundaries but cannot image the inside of bones well.", points: ["Soft-tissue boundaries reflect only a small fraction (about 1%), so most of the pulse continues to deeper boundaries and produces echoes from each.", "At bone about 40% is reflected (and bone attenuates strongly), so little ultrasound enters the bone and structures behind it are in shadow."], modelAnswer: t`Only about ${sfStr(Rfm * 100, 1)}% is reflected at a fat-muscle boundary, so most of the pulse travels on and every deeper soft-tissue boundary returns an echo. At bone about ${sfStr(Rmb * 100, 2)}% is reflected, and bone also absorbs strongly, so little ultrasound penetrates it.` }),
      ],
      explanation: "I_R/I₀ = (Z₁ − Z₂)²/(Z₁ + Z₂)²; small mismatches allow deep imaging.",
      hints: ["The powers of ten cancel."],
    });
  }
  b.card("DEFINITION", "**Piezoelectric effect**", "A p.d. appears across certain crystals when stressed; conversely, a p.d. changes their shape.");
  b.card("DEFINITION", "**Specific acoustic impedance**", "Z = ρc, the product of density and the speed of sound in the medium (kg m⁻² s⁻¹).");
  b.card("FORMULA", "Intensity reflection coefficient", t`$\dfrac{I_R}{I_0} = \dfrac{(Z_1 - Z_2)^2}{(Z_1 + Z_2)^2}$`);
  b.card("FORMULA", "Attenuation", t`$I = I_0e^{-\mu x}$`);
  b.card("FORMULA", "Depth from echo time", t`$d = \dfrac{ct}{2}$`);
  b.card("CONCEPT", "Coupling gel", "Excludes air; air-skin impedance mismatch would reflect about 99.9% of the intensity.");
  b.card("CONCEPT", "Transducer as emitter and receiver", "Alternating p.d. → crystal vibrates → pulse; echo deforms crystal → p.d. detected.");
  b.card("CONCEPT", "Choosing frequency", "Higher frequency: finer detail, more attenuation (shallow imaging); lower frequency: deeper penetration.");
  b.card("FACT", "Speed of sound in soft tissue", "About 1540 m s⁻¹.");
});
