// W2a: aphys.waves.doppler (Cambridge only) — wavefront explanation, f_o = f_s v/(v ± v_s), moving source, stationary observer.
import { concept, P, t, chk, sfStr, dpStr, pctUnc, dopplerSource } from "../lib.mjs";

concept("aphys.waves.doppler", { file: "waves/doppler", keyPrefix: "waves.doppler" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "A source of sound moves towards a stationary observer. Compared with the source frequency, what does the observer hear?",
    options: [
      ["a higher frequency, because the wavefronts arrive closer together", "Correct: the wavelength ahead of the source is shortened."],
      ["a lower frequency, because the waves are stretched out", "Waves are stretched behind a moving source, not ahead of it."],
      ["the same frequency, but louder", "Loudness changes with distance, but the pitch changes too."],
      ["a higher frequency, because the sound travels faster", "The speed of sound is set by the air, not by the motion of the source."],
    ],
    answer: "A",
    explanation: "Ahead of a moving source the wavefronts are bunched, the wavelength is shorter and, at the same wave speed, the observed frequency is higher.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A siren moves away from a stationary listener at constant speed. Which quantity, measured by the listener, is the same as it would be for a stationary siren?",
    options: [
      ["the speed of the sound waves", "Correct: the speed depends only on the air."],
      ["the wavelength of the sound", "The wavelength behind the source is longer."],
      ["the frequency of the sound", "The observed frequency is lower than the source frequency."],
      ["the period of the received sound", "The period is 1/f₀, so it is longer than for a stationary siren."],
    ],
    answer: "A",
    explanation: "Only the wave speed is unchanged; wavelength, frequency and period all change.",
  });
  {
    const fs = 600, v = 330, vs = 30;
    const fo = dopplerSource(fs, v, vs, true);
    chk(fo, 660);
    b.mcq({
      d: 2, skill: "APPLICATION",
      stem: t`A source of frequency $600\ \text{Hz}$ moves directly towards a stationary observer at $30\ \text{m s}^{-1}$. The speed of sound is $330\ \text{m s}^{-1}$. What frequency does the observer hear?`,
      options: [
        ["660 Hz", "Correct: 600 × 330/(330 − 30) = 660 Hz."],
        ["550 Hz", "This uses v + vₛ, the formula for a receding source."],
        ["655 Hz", "This multiplies by (v + vₛ)/v, which is not the Doppler formula for a moving source."],
        ["545 Hz", "This multiplies by (v − vₛ)/v, which inverts the correct factor."],
      ],
      answer: "A",
      explanation: t`$f_o = \dfrac{f_s v}{v - v_s} = \dfrac{600 \times 330}{300} = ${fo}\ \text{Hz}$.`,
    });
  }
  {
    const v = 340, fs = 850, vs = 34;
    const lam = (v - vs) / fs;
    chk(lam, 0.36);
    b.mcq({
      d: 3, skill: "APPLICATION",
      stem: t`A source of frequency $850\ \text{Hz}$ moves at $34\ \text{m s}^{-1}$ through air in which sound travels at $340\ \text{m s}^{-1}$. What is the wavelength of the sound directly ahead of the source?`,
      options: [
        ["0.36 m", "Correct: λ = (v − vₛ)/fₛ = 306/850."],
        ["0.40 m", "This is the wavelength for a stationary source, 340/850."],
        ["0.44 m", "This is the wavelength behind the source, (340 + 34)/850."],
        ["0.04 m", "This divides only the source speed by the frequency."],
      ],
      answer: "A",
      explanation: t`In one period the source moves $v_sT$ towards the previous wavefront, so $\lambda = \dfrac{v - v_s}{f_s} = \dfrac{306}{850} = ${lam}\ \text{m}$.`,
      hints: ["How far apart are successive wavefronts ahead of the source?"],
    });
  }
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A whistle is whirled in a horizontal circle at constant speed. A stationary listener stands some distance away, level with the circle. How does the frequency heard change during one revolution?",
    options: [
      ["It rises above and falls below the whistle frequency once each revolution.", "Correct: the whistle moves towards the listener for half the circle and away for the other half."],
      ["It stays constant, because the speed of the whistle is constant.", "The component of velocity towards the listener changes direction, so the frequency changes."],
      ["It is always above the whistle frequency, because the whistle keeps moving.", "When the whistle moves away from the listener the frequency is lower."],
      ["It changes only in loudness, not in frequency.", "The changing velocity component along the line of sight changes the pitch."],
    ],
    answer: "A",
    explanation: "Only the velocity component along the line to the listener matters; it is towards the listener for part of each revolution and away for another part.",
    hints: ["Consider the component of the whistle's velocity along the line to the listener."],
  });
  {
    const fs = 1200, v = 340, vs = 40;
    const fa = dopplerSource(fs, v, vs, true), fr = dopplerSource(fs, v, vs, false);
    b.mcq({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: t`A motorbike's horn has frequency $1200\ \text{Hz}$. The motorbike passes a stationary marshal at $40\ \text{m s}^{-1}$. The speed of sound is $340\ \text{m s}^{-1}$. What is the change in the frequency heard as the motorbike passes?`,
      options: [
        [`${sfStr(fa - fr, 3)} Hz`, "Correct: f(approach) − f(recede) = 1360 − 1074 Hz."],
        [`${sfStr(fa - fs, 3)} Hz`, "This is only the rise above the horn frequency during the approach."],
        [`${sfStr(2 * (fs - fr), 3)} Hz`, "This doubles the fall below 1200 Hz; the rise and fall are not equal."],
        [`${sfStr((2 * fs * vs) / v, 3)} Hz`, "This uses the approximation 2fₛvₛ/v, which is not accurate at this speed."],
      ],
      answer: "A",
      explanation: t`Approaching: $\dfrac{1200 \times 340}{300} = ${fa}\ \text{Hz}$. Receding: $\dfrac{1200 \times 340}{380} = ${sfStr(fr, 4)}\ \text{Hz}$. Change $= ${sfStr(fa - fr, 3)}\ \text{Hz}$.`,
      hints: ["Calculate the approaching and receding frequencies separately."],
    });
  }
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: t`In the equation $f_o = f_s v/(v - v_s)$, what happens to $f_o$ as the speed of an approaching source $v_s$ gets close to the speed of sound $v$?`,
    options: [
      ["It becomes very large, as wavefronts ahead crowd together.", "Correct: the denominator tends to zero, and the wavelength ahead tends to zero."],
      ["It levels off at twice the source frequency.", "That would be the result if the denominator fell to v/2, not towards zero."],
      ["It approaches the source frequency.", "The shift grows with the source speed; it does not vanish."],
      ["It falls to zero, because no sound can get ahead of the source.", "The formula gives a growing frequency, not a falling one."],
    ],
    answer: "A",
    explanation: "As vₛ → v the wavelength ahead (v − vₛ)/fₛ → 0, so f₀ grows without limit: the wavefronts pile up into a shock wave (sonic boom).",
    hints: ["Look at the denominator."],
  });
  {
    const fs = 750, v = 340, vs = 15;
    b.num({
      d: 2, skill: "APPLICATION", daily: true, calculator: true,
      stem: t`A kombi sounds its $750\ \text{Hz}$ horn while moving away from a stationary passenger at $15\ \text{m s}^{-1}$. The speed of sound is $340\ \text{m s}^{-1}$. Calculate the frequency the passenger hears, in Hz, to three significant figures.`,
      value: dopplerSource(fs, v, vs, false), unit: "Hz", wrong: [dopplerSource(fs, v, vs, true)],
      explanation: t`Receding: $f_o = \dfrac{750 \times 340}{340 + 15} = ${sfStr(dopplerSource(fs, v, vs, false), 3)}\ \text{Hz}$. Using $v - v_s$ gives ${sfStr(dopplerSource(fs, v, vs, true), 3)} Hz, a rise, which cannot be right for a receding source.`,
    });
  }
  {
    const fo = 1550, fs = 1450, v = 340;
    const vs = v * (1 - fs / fo);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A train whistle has frequency $1450\ \text{Hz}$. A stationary observer near the line hears $1550\ \text{Hz}$ as the train approaches. The speed of sound is $340\ \text{m s}^{-1}$. Calculate the speed of the train, in $\text{m s}^{-1}$, to three significant figures.`,
      value: vs, unit: "m/s", wrong: [v * (fo / fs - 1)],
      explanation: t`1. $f_o = \dfrac{f_s v}{v - v_s} \Rightarrow v - v_s = \dfrac{f_s v}{f_o}$.
2. $v - v_s = \dfrac{1450 \times 340}{1550} = ${sfStr((fs * v) / fo, 4)}\ \text{m s}^{-1}$.
3. $v_s = 340 - ${sfStr((fs * v) / fo, 4)} = ${sfStr(vs, 3)}\ \text{m s}^{-1}$.
4. The common slip $v(f_o/f_s - 1) = ${sfStr(v * (fo / fs - 1), 3)}\ \text{m s}^{-1}$ uses the moving-observer form, which does not apply.`,
      hints: ["Rearrange for v − vₛ first."],
    });
  }
  {
    const fa = 690, fr = 610, v = 340;
    const vs = (v * (fa - fr)) / (fa + fr);
    b.calc({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: t`As a police car passes a stationary pedestrian, the frequency of its siren heard by the pedestrian falls from $690\ \text{Hz}$ to $610\ \text{Hz}$. The speed of sound is $340\ \text{m s}^{-1}$. Calculate the speed of the car, in $\text{m s}^{-1}$, to three significant figures.`,
      value: vs, unit: "m/s", wrong: [(v * (fa - fr)) / fa],
      explanation: t`1. $f_s v = 690(340 - v_s) = 610(340 + v_s)$.
2. $690 \times 340 - 610 \times 340 = (690 + 610)v_s$, so $v_s = \dfrac{340 \times 80}{1300} = ${sfStr(vs, 3)}\ \text{m s}^{-1}$.
3. Check with the source frequency $f_s = 690(340 - v_s)/340 = ${sfStr((fa * (v - vs)) / v, 3)}\ \text{Hz}$, which lies between the two observed values.`,
      hints: ["Both observed frequencies come from the same source frequency.", "Eliminate fₛ."],
    });
  }
  {
    const fs = 2000, v = 340, vs = 20;
    const fo = dopplerSource(fs, v, vs, true);
    b.num({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A buzzer of frequency $2.00\ \text{kHz}$ is fixed to a toy car that moves straight towards a microphone at $20\ \text{m s}^{-1}$. The speed of sound is $340\ \text{m s}^{-1}$. Calculate the frequency received, in Hz, to three significant figures.`,
      value: fo, unit: "Hz", wrong: [dopplerSource(fs, v, vs, false), fs * (1 + vs / v)],
      explanation: t`$f_o = \dfrac{2000 \times 340}{340 - 20} = ${sfStr(fo, 3)}\ \text{Hz}$. The approximation $f_s(1 + v_s/v) = ${sfStr(fs * (1 + vs / v), 3)}\ \text{Hz}$ is close but not exact.`,
      hints: ["Approaching: use v − vₛ."],
    });
  }
  // Uncertainty
  {
    const fa = 1084, fr = 926, df = 3;
    const diff = fa - fr;
    b.num({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`In an experiment, a buzzer on a moving trolley passes a microphone. The frequencies recorded are $${fa}\ \text{Hz}$ approaching and $${fr}\ \text{Hz}$ receding, each with an uncertainty of $\pm ${df}\ \text{Hz}$. Calculate the percentage uncertainty in the frequency difference $f_\text{approach} - f_\text{recede}$, to two significant figures.`,
      value: pctUnc(2 * df, diff), sf: 2, unit: "%", wrong: [pctUnc(df, diff)],
      explanation: t`For a difference the absolute uncertainties add: $\pm ${2 * df}\ \text{Hz}$ on $${diff}\ \text{Hz}$, so $\dfrac{${2 * df}}{${diff}} \times 100 = ${sfStr(pctUnc(2 * df, diff), 2)}\%$. A small difference of two large readings has a large percentage uncertainty, so a fast-moving source gives a more reliable speed.`,
      hints: ["Absolute uncertainties add for a difference."],
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "For a source moving away from an observer, the observed wavelength is longer than the wavelength emitted by a stationary source of the same frequency.",
    answer: true,
    explanation: "True. Behind the source each wavefront is emitted further back, so λ' = (v + vₛ)/fₛ, which is longer than v/fₛ.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "As a train passes a stationary listener, the rise in frequency during the approach equals the fall in frequency during the recession.",
    answer: false,
    explanation: "False. f₀ = fₛv/(v ∓ vₛ) is not symmetrical: the rise above fₛ on approach is larger than the fall below it on recession.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each situation with the frequency the stationary observer hears.",
    pairs: [
      ["source approaching", t`$f_s v/(v - v_s)$, higher than $f_s$`],
      ["source receding", t`$f_s v/(v + v_s)$, lower than $f_s$`],
      ["source approaching at a greater speed", "a larger rise above the source frequency"],
      ["source moving across the line of sight at the instant of closest approach", t`$f_s$ (no velocity component towards the observer)`],
    ],
    explanation: "Only the component of the source's velocity along the line to the observer produces a shift.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "Ahead of a moving source the wavefronts are {{blank:a}} together, so the wavelength is {{blank:b}} and the observed frequency is {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["closer"], choices: ["closer", "further"] },
      { id: "b", accepted: ["shorter"], choices: ["shorter", "longer", "unchanged"] },
      { id: "c", accepted: ["higher"], choices: ["higher", "lower", "unchanged"] },
    ],
    explanation: "Bunched wavefronts → shorter λ → higher f (v unchanged).",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 2,
    stem: "State what is meant by the Doppler effect.",
    points: ["A change in the observed (received) frequency of a wave…", "…when the source and the observer move relative to each other (along the line joining them)."],
    modelAnswer: "The Doppler effect is the change in the observed frequency of a wave when there is relative motion between the source and the observer.",
    explanation: "Both the change in observed frequency and the relative motion are needed.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "A stationary source emits sound with circular wavefronts. Describe how the wavefront pattern changes when the source moves steadily to the right, and explain why an observer to the right hears a higher frequency.",
    points: [
      "Each wavefront is emitted from a point further to the right, so the circles are no longer concentric (centres move right).",
      "Wavefronts are closer together on the right (ahead) and further apart on the left (behind).",
      "The speed of sound in the air is unchanged, so the wavelength to the right is shorter, (v − vₛ)/fₛ.",
      "So more wavefronts arrive per second: f₀ = v/λ' is higher than fₛ.",
    ],
    modelAnswer: "Each new wavefront starts from a point further right, so the circles are not concentric: they are crowded together on the right and spaced out on the left. The waves still travel through the air at v, so on the right the shorter wavelength (v − vₛ)/fₛ means wavefronts arrive more often and the observed frequency v/λ' is higher.",
    explanation: "Wavefront diagram in words, then wavelength, then frequency at constant speed.",
    hints: ["Where is each wavefront centred?"],
  });
  b.manualShort({
    d: 3, skill: "EVALUATION", marks: 3,
    stem: "A student wants to check the Doppler formula using a buzzer fixed to a trolley that rolls past a microphone connected to a computer. Suggest three measurements or precautions needed.",
    points: [
      "Measure the buzzer's frequency with the trolley at rest (fₛ).",
      "Measure the trolley's speed as it passes (light gates / video with a scale) so that vₛ is known.",
      "Keep the trolley moving along the line towards (or away from) the microphone at constant speed / reduce echoes and background noise (record frequency from the trace or a spectrum, repeat runs).",
    ],
    modelAnswer: "Record the buzzer frequency with the trolley stationary; measure the trolley speed with light gates as it passes; arrange for it to move directly towards or away from the microphone at steady speed in a quiet room, and repeat runs to average the observed frequencies.",
    explanation: "fₛ, vₛ and f₀ must each be measured, under conditions matching the formula.",
    hints: ["Which quantities in the formula must you know?"],
  });
  // Practice structured: ambulance with data (12 marks)
  {
    const fs = 960, v = 340, vs = 28;
    const fa = dopplerSource(fs, v, vs, true), fr = dopplerSource(fs, v, vs, false);
    b.struct({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: t`An ambulance siren has frequency $960\ \text{Hz}$. The ambulance travels at $28\ \text{m s}^{-1}$ along a straight road past Farai, who is standing still at the roadside. The speed of sound is $340\ \text{m s}^{-1}$.`,
      parts: [
        P.num({ label: "(a)", marks: 1, stem: "Calculate the wavelength of the sound emitted by the siren if the ambulance were at rest, in m, to three significant figures.", value: v / fs, unit: "m", wrong: [fs / v], explanation: t`$\lambda = v/f = 340/960 = ${sfStr(v / fs, 3)}\ \text{m}$.` }),
        P.num({ label: "(b)", marks: 2, stem: "Calculate the wavelength of the sound travelling ahead of the moving ambulance, in m, to three significant figures.", value: (v - vs) / fs, unit: "m", wrong: [(v + vs) / fs], explanation: t`$\lambda' = (v - v_s)/f_s = 312/960 = ${sfStr((v - vs) / fs, 3)}\ \text{m}$.` }),
        P.num({ label: "(c)", marks: 2, stem: "Calculate the frequency Farai hears as the ambulance approaches, in Hz, to three significant figures.", value: fa, unit: "Hz", wrong: [fr], explanation: t`$f_o = \dfrac{960 \times 340}{312} = ${sfStr(fa, 3)}\ \text{Hz}$.` }),
        P.num({ label: "(d)", marks: 2, stem: "Calculate the frequency Farai hears after it has passed, in Hz, to three significant figures.", value: fr, unit: "Hz", wrong: [fa], explanation: t`$f_o = \dfrac{960 \times 340}{368} = ${sfStr(fr, 3)}\ \text{Hz}$.` }),
        P.manual({ label: "(e)", marks: 2, stem: "Describe how the frequency Farai hears changes during the few seconds when the ambulance is close to him.", points: ["It is constant (high) while the ambulance approaches along the road, and constant (low) after it has passed.", "It falls quickly but smoothly while the ambulance is passing, equal to 960 Hz at the moment of closest approach (velocity perpendicular to the line of sight)."], modelAnswer: "The pitch stays at the higher value while the ambulance is still approaching, then falls rapidly as it passes, being 960 Hz at the moment its velocity is perpendicular to the line joining it to Farai, and settles at the lower value as it moves away." }),
        P.manual({ label: "(f)", marks: 3, stem: "The driver of the ambulance hears the siren at 960 Hz throughout. Explain why, and explain why Farai's friend standing 50 m further along the road ahead hears the same higher frequency as Farai did.", points: ["The driver moves with the source, so there is no relative motion between source and listener: no Doppler shift.", "The shift depends only on the source velocity component towards the listener (and v), not on the distance.", "The friend is also ahead of the ambulance on its line of motion, so the wavelength reaching her is the same (v − vₛ)/fₛ; only the loudness is different."], modelAnswer: "The driver is moving with the siren, so there is no relative motion and no shift. The shifted frequency depends only on the source's velocity towards the listener and the speed of sound, not on distance; the friend is ahead of the ambulance on its line of travel, receives the same shortened wavelength and so hears the same frequency, though more quietly." }),
      ],
      explanation: "λ' = (v ∓ vₛ)/fₛ and f₀ = v/λ'; the shift depends on the velocity component towards the observer.",
      hints: ["The wave speed is 340 m s⁻¹ in every direction.", "Approaching: v − vₛ."],
    });
  }
  // Practice structured: finding speed and source frequency (8 marks)
  {
    const fa = 435, fr = 395, v = 340;
    const vs = (v * (fa - fr)) / (fa + fr), fs = (fa * (v - vs)) / v;
    b.struct({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`A truck sounds its horn continuously as it drives past a stationary microphone near Gweru. The frequency recorded is $${fa}\ \text{Hz}$ as it approaches and $${fr}\ \text{Hz}$ as it moves away. The speed of sound is $340\ \text{m s}^{-1}$.`,
      parts: [
        P.manual({ label: "(a)", marks: 2, stem: t`Show that $${fa}(340 - v_s) = ${fr}(340 + v_s)$, where $v_s$ is the speed of the truck.`, points: [t`Approaching: $f_s \times 340 = ${fa}(340 - v_s)$; receding: $f_s \times 340 = ${fr}(340 + v_s)$.`, "The horn frequency fₛ is the same in both, so the right-hand sides are equal."], modelAnswer: t`From $f_o = f_s v/(v \mp v_s)$: $340f_s = ${fa}(340 - v_s)$ and $340f_s = ${fr}(340 + v_s)$. Equating the two expressions for $340f_s$ gives the result.` }),
        P.num({ label: "(b)", marks: 2, stem: t`Calculate $v_s$, in $\text{m s}^{-1}$, to three significant figures.`, value: vs, unit: "m/s", wrong: [(v * (fa - fr)) / fa], explanation: t`$${fa} \times 340 - ${fr} \times 340 = ${fa + fr}v_s$, so $v_s = \dfrac{340 \times ${fa - fr}}{${fa + fr}} = ${sfStr(vs, 3)}\ \text{m s}^{-1}$.` }),
        P.num({ label: "(c)", marks: 2, stem: "Calculate the frequency of the horn, in Hz, to three significant figures.", value: fs, unit: "Hz", wrong: [(fa + fr) / 2], explanation: t`$f_s = \dfrac{${fa}(340 - ${sfStr(vs, 3)})}{340} = ${sfStr(fs, 3)}\ \text{Hz}$. The simple average ${(fa + fr) / 2} Hz is close but not exact.` }),
        P.manual({ label: "(d)", marks: 2, stem: "Suggest why the speed calculated is the speed of the truck relative to the air rather than relative to the road, and when the two would differ.", points: ["The speed of sound (340 m s⁻¹) is measured relative to the air, so the formula uses the source's speed through the air.", "If a wind blows along the road the air moves, so the truck's speed relative to the air differs from its speed relative to the road."], modelAnswer: "Sound travels at 340 m s⁻¹ relative to the air, so the calculation gives the truck's speed relative to the air; if there is a wind along the road, this differs from its road speed." }),
      ],
      explanation: "Eliminate fₛ between the approach and recession equations to find vₛ, then fₛ.",
      hints: ["Both equations contain the same fₛ."],
    });
  }

  b.card("DEFINITION", "**Doppler effect**", "The change in observed frequency when source and observer move relative to each other.");
  b.card("FORMULA", "Moving source, stationary observer", t`$f_o = \dfrac{f_s v}{v \pm v_s}$: minus approaching, plus receding`);
  b.card("CONCEPT", "Why the pitch rises on approach", "Wavefronts bunch ahead of the source, so λ is shorter; v is unchanged, so f₀ = v/λ is higher.");
  b.card("FORMULA", "Wavelength ahead of / behind a moving source", t`$\lambda' = (v - v_s)/f_s$ ahead; $(v + v_s)/f_s$ behind`);
  b.card("FACT", "What does not change", "The speed of sound relative to the air.");
  b.card("CONCEPT", "Source speed from two frequencies", t`$f_a(v - v_s) = f_r(v + v_s) \Rightarrow v_s = v\dfrac{f_a - f_r}{f_a + f_r}$`);
  b.card("FACT", "Syllabus scope", "Cambridge AS only; moving source, stationary observer only.");
  b.card("CONCEPT", "Closest approach", "When the source velocity is perpendicular to the line of sight, f₀ = fₛ.");
});
