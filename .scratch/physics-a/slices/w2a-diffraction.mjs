// W2a: aphys.superposition.diffraction — meaning, gap width vs wavelength, ripple tank, sound/light/microwaves, radio and hills.
import { concept, P, t, DATA, sfStr, dpStr, sciTex, pctUnc } from "../lib.mjs";

const c = DATA.c;
concept("aphys.superposition.diffraction", { file: "superposition/diffraction", keyPrefix: "superposition.diffraction" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is diffraction?",
    options: [
      ["the spreading of a wave as it passes through a gap or round an obstacle", "Correct: this is the definition."],
      ["the change in direction of a wave as it crosses into a medium where its speed is different", "That is refraction."],
      ["the bouncing of a wave off a barrier", "That is reflection."],
      ["the addition of two waves where they overlap", "That is superposition (interference)."],
    ],
    answer: "A",
    explanation: "Diffraction: spreading through a gap or round an edge, within one medium.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Plane water waves pass through a gap in a barrier in a ripple tank. Which change makes the waves spread out more beyond the gap?",
    options: [
      ["making the gap narrower, closer to the wavelength", "Correct: spreading increases as the gap approaches the wavelength."],
      ["making the gap wider", "A wider gap compared with λ gives less spreading."],
      ["increasing the frequency of the dipper", "A higher frequency gives a shorter wavelength and so less spreading."],
      ["increasing the amplitude of the dipper", "Amplitude does not affect the amount of diffraction."],
    ],
    answer: "A",
    explanation: "Diffraction depends on gap width compared with wavelength: narrower gap or longer wavelength → more spreading.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which quantity is the same for the waves before and after they diffract through a gap in a ripple tank of uniform depth?",
    options: [
      ["wavelength", "Correct: speed and frequency are unchanged, so the wavefront spacing is unchanged."],
      ["direction of travel of every part of the wave", "Diffraction changes the direction of the parts of the wave near the edges."],
      ["shape of the wavefronts", "Straight wavefronts become curved after a narrow gap."],
      ["energy per unit length of wavefront", "The energy spreads over a longer curved wavefront, so it falls."],
    ],
    answer: "A",
    explanation: "Same depth → same speed; same source → same frequency; so λ = v/f is unchanged.",
  });
  {
    const fLW = 225e3, fFM = 103e6;
    b.mcq({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: "A village lies in a valley behind a range of hills about 1 km across. Which explains why it receives a 225 kHz long-wave station but not a 103 MHz FM station from the same distant transmitter?",
      options: [
        [`Long waves (λ ≈ ${sfStr(c / fLW, 2)} m) diffract round the hills; FM waves (λ ≈ ${sfStr(c / fFM, 2)} m) do not.`, "Correct: diffraction is strong when λ is comparable with the obstacle."],
        ["The long waves travel faster than the FM waves, so they reach further into the valley.", "All radio waves travel at the same speed, 3.00 × 10⁸ m s⁻¹."],
        ["The FM waves are absorbed by the hills because their frequency is lower.", "103 MHz is the higher frequency, not the lower."],
        [`The FM waves (λ ≈ ${sfStr(c / fFM, 2)} m) diffract too much and spread their energy away from the valley.`, "Short waves diffract less, not more, round a 1 km obstacle."],
      ],
      answer: "A",
      explanation: t`$\lambda_{\text{LW}} = \dfrac{3.00 \times 10^{8}}{225 \times 10^{3}} \approx ${sfStr(c / fLW, 3)}\ \text{m}$; $\lambda_{\text{FM}} \approx ${sfStr(c / fFM, 2)}\ \text{m}$. Only the long wave is comparable with the hills.`,
      hints: ["Compare each wavelength with the size of the hills."],
    });
  }
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why can you hear a person talking in the next room through an open door but not see them?",
    options: [
      ["Sound wavelengths are similar to the door width; light wavelengths are far smaller.", "Correct: diffraction depends on wavelength compared with the gap."],
      ["Sound is longitudinal and can travel round corners, but transverse waves cannot diffract.", "Transverse waves such as water waves and light do diffract."],
      ["Sound reflects off the walls, but light is absorbed by them.", "Reflection helps a little, but the main effect is diffraction at the doorway."],
      ["Sound travels more slowly, so it has more time to spread.", "Diffraction depends on wavelength and gap size, not on wave speed."],
    ],
    answer: "A",
    explanation: "Speech has λ of about 0.3-3 m, similar to a doorway; light has λ of about 5 × 10⁻⁷ m.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Microwaves of wavelength 3 cm pass through a gap between two metal plates. A probe is moved along an arc beyond the gap. For which gap width is the signal detected over the widest range of angles?",
    options: [
      ["3 cm", "Correct: a gap about equal to the wavelength gives the greatest spreading."],
      ["30 cm", "A gap ten times the wavelength gives a narrow beam with little spreading."],
      ["15 cm", "Five wavelengths wide still gives only modest spreading."],
      ["9 cm", "Three wavelengths wide spreads less than one wavelength wide."],
    ],
    answer: "A",
    explanation: "Diffraction spreading is largest when the gap width is comparable with the wavelength.",
    hints: ["Compare each gap with 3 cm."],
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "In Young's double-slit experiment the slits must be narrow. What is the main reason?",
    options: [
      ["Each slit must diffract the light so that the beams from the two slits overlap.", "Correct: without diffraction the two beams would not meet and there would be no interference."],
      ["Narrow slits make the light from each slit monochromatic.", "Slit width does not change the wavelength of the light."],
      ["Narrow slits increase the intensity of the fringes.", "Narrower slits let through less light, so the fringes are dimmer."],
      ["Narrow slits make the two sources oscillate at different frequencies.", "Interference needs the same frequency (coherence), not different ones."],
    ],
    answer: "A",
    explanation: "Diffraction spreads each beam; the overlapping region is where the interference fringes form.",
    hints: ["What must happen for waves from the two slits to meet?"],
  });
  {
    const f = 6.0, lam = 2.5;
    b.num({
      d: 2, skill: "APPLICATION", daily: true,
      stem: t`In a ripple tank, a dipper vibrating at $6.0\ \text{Hz}$ produces wavefronts $2.5\ \text{cm}$ apart. Calculate the speed of the waves, in $\text{cm s}^{-1}$.`,
      value: f * lam, wrong: [lam / f],
      explanation: t`$v = f\lambda = 6.0 \times 2.5 = ${f * lam}\ \text{cm s}^{-1}$; the wavefront spacing is the wavelength.`,
    });
  }
  {
    const f = 40, v = 340;
    b.num({
      d: 2, skill: "APPLICATION", calculator: true,
      stem: t`A bass note of frequency $40\ \text{Hz}$ travels in air at $340\ \text{m s}^{-1}$. Calculate its wavelength, in m, and so explain why the bass from a passing kombi's sound system is heard round street corners.`,
      value: v / f, unit: "m", wrong: [f / v],
      explanation: t`$\lambda = 340/40 = ${v / f}\ \text{m}$, comparable with or larger than buildings and gaps between them, so the sound diffracts strongly round corners. Treble notes (short λ) diffract less, so the bass is heard more.`,
    });
  }
  {
    const f = 10.5e9, gap = 0.12;
    b.num({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`Microwaves of frequency $10.5\ \text{GHz}$ are directed at a gap $12\ \text{cm}$ wide. Calculate the ratio (gap width) ÷ (wavelength), to two significant figures.`,
      value: gap / (c / f), sf: 2, wrong: [(c / f) / gap],
      explanation: t`$\lambda = \dfrac{3.00 \times 10^{8}}{10.5 \times 10^{9}} = ${dpStr((c / f) * 100, 2)}\ \text{cm}$; ratio $= 12/${dpStr((c / f) * 100, 2)} = ${sfStr(gap / (c / f), 2)}$. The gap is about four wavelengths, so the beam spreads noticeably but less than through a gap of about one wavelength.`,
      hints: ["Find λ in the same unit as the gap."],
    });
  }
  {
    const n = 10, span = 0.168, f = 7.5;
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`On a strobe photograph of a ripple tank, $${n + 1}$ consecutive bright lines (wavefront crests) span $${span * 100}\ \text{cm}$ on the floor. The magnification of the shadow is negligible and the dipper vibrates at $7.5\ \text{Hz}$. Calculate the speed of the water waves, in $\text{m s}^{-1}$, to three significant figures.`,
      value: f * (span / n), unit: "m/s", wrong: [f * (span / (n + 1)), f * span],
      explanation: t`1. ${n + 1} crests span ${n} wavelengths: $\lambda = \dfrac{0.168}{${n}} = ${span / n}\ \text{m}$.
2. $v = f\lambda = 7.5 \times ${span / n} = ${sfStr(f * (span / n), 3)}\ \text{m s}^{-1}$.
3. Dividing by ${n + 1} counts lines rather than gaps.`,
      hints: ["How many wavelengths lie between 11 crests?"],
    });
  }
  // Uncertainty
  {
    const span = 16.8, du = 0.2, n = 10;
    b.num({
      d: 3, skill: "ANALYSIS", calculator: true,
      stem: t`In the ripple-tank measurement above, the span of ten wavelengths, $16.8\ \text{cm}$, is uncertain by $\pm 0.2\ \text{cm}$. Calculate the percentage uncertainty in the wavelength, to two significant figures, and compare it with that from measuring one wavelength of $1.68\ \text{cm}$ with the same $\pm 0.2\ \text{cm}$ uncertainty.`,
      value: pctUnc(du, span), sf: 2, unit: "%", wrong: [pctUnc(du, span / n)],
      explanation: t`Ten wavelengths: $\dfrac{0.2}{16.8} \times 100 = ${sfStr(pctUnc(du, span), 2)}\%$. One wavelength: $\dfrac{0.2}{1.68} \times 100 = ${sfStr(pctUnc(du, span / n), 2)}\%$, ten times larger. Measure across many wavefronts.`,
      hints: ["Dividing by 10 does not change the percentage uncertainty."],
    });
  }
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Light can be diffracted.",
    answer: true,
    explanation: "True. Light diffracts noticeably through gaps or round objects about a micrometre in size, such as fine slits or hairs.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "When water waves diffract through a gap, their wavelength increases.",
    answer: false,
    explanation: "False. Speed and frequency are unchanged in water of the same depth, so the wavelength is unchanged; only the shape and direction of the wavefronts change.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each situation with the amount of diffraction.",
    pairs: [
      ["light (500 nm) through a 1 m window", "negligible: a sharp shadow"],
      ["sound (0.7 m) through a 1 m doorway", "strong: heard round the corner"],
      ["water waves (2 cm) through a 2 cm gap", "very strong: almost semicircular wavefronts"],
      ["water waves (2 cm) through a 20 cm gap", "slight: mainly straight wavefronts with curved edges"],
    ],
    explanation: "Compare the gap with the wavelength in each case.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the statements.",
    template: "Diffraction is greatest when the gap width is about {{blank:a}} the wavelength. Diffraction does not change the wave's {{blank:b}}. Long-wave radio diffracts round hills better than FM because its wavelength is {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["equal to"], choices: ["equal to", "ten times", "a hundred times"] },
      { id: "b", accepted: ["wavelength"], choices: ["wavelength", "direction", "wavefront shape"] },
      { id: "c", accepted: ["longer"], choices: ["longer", "shorter", "the same"] },
    ],
    explanation: "Gap ≈ λ for maximum spreading; λ unchanged; longer λ diffracts more round large obstacles.",
  });
  b.short({
    d: 1, skill: "RECALL",
    stem: "Name the wave effect that allows the beams from the two slits in Young's experiment to overlap.",
    accepted: ["diffraction"],
    wrong: ["refraction"],
    explanation: "**Diffraction** at each slit spreads the light so that the two beams overlap and interfere.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 2,
    stem: "State what is meant by diffraction and the condition for it to be most noticeable.",
    points: ["Diffraction is the spreading of a wave as it passes through a gap or round the edge of an obstacle.", "It is most noticeable when the gap (or obstacle) is about the same size as the wavelength."],
    modelAnswer: "Diffraction is the spreading of a wave through a gap or round an obstacle; it is greatest when the gap or obstacle is of similar size to the wavelength.",
    explanation: "Definition plus the size condition.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe, in words, the patterns seen in a ripple tank when straight wavefronts pass through (i) a gap much wider than the wavelength and (ii) a gap about one wavelength wide.",
    points: [
      "(i) Wavefronts pass through mostly straight, with only slight curving at the edges.",
      "(i) A clear 'shadow' region with little wave motion behind the barrier on either side.",
      "(ii) Wavefronts emerge almost semicircular, spreading into the whole region behind the barrier.",
      "In both, the wavefront spacing (wavelength) is the same after the gap as before.",
    ],
    modelAnswer: "Through the wide gap the wavefronts carry on mostly straight, curving only slightly at their ends, leaving calm regions behind the barrier. Through the narrow gap the wavefronts spread out as nearly semicircles into the whole region beyond. In both cases the spacing of the wavefronts is unchanged.",
    explanation: "Shape and spread of wavefronts for each gap, plus constant wavelength.",
    hints: ["Describe the wavefront shapes and where the waves reach."],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why mobile-phone networks in hilly areas need many masts on high ground, while long-wave radio can be received over large areas from one transmitter.",
    points: [
      "Mobile-phone signals have short wavelengths (tens of centimetres), much smaller than hills.",
      "So they diffract very little round hills and need a line of sight between mast and phone.",
      "Long-wave radio has wavelengths of the order of a kilometre, comparable with hills, so it diffracts round them and reaches valleys.",
    ],
    modelAnswer: "Phone signals have wavelengths of about 0.2 m, tiny compared with hills, so they hardly diffract and need a direct line of sight; many masts on high ground are needed. Long-wave radio has wavelengths of about 1-2 km, comparable with hills, so it diffracts round them and covers valleys from one transmitter.",
    explanation: "Compare each wavelength with the size of the hills.",
    hints: ["Estimate each wavelength from its frequency."],
  });
  // Practice structured: ripple tank (8 marks)
  {
    const f = 5.0, lam = 0.024;
    b.struct({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A straight dipper vibrating at $5.0\ \text{Hz}$ makes plane waves in a ripple tank. The wavefronts are $2.4\ \text{cm}$ apart. The waves meet a barrier with a gap whose width can be changed.`,
      parts: [
        P.num({ label: "(a)", marks: 2, stem: t`Calculate the speed of the waves, in $\text{m s}^{-1}$.`, value: f * lam, unit: "m/s", wrong: [f * 2.4], explanation: t`$v = 5.0 \times 0.024 = ${f * lam}\ \text{m s}^{-1}$.` }),
        P.manual({ label: "(b)", marks: 2, stem: "The gap is set to 2.5 cm. Describe the waves beyond the gap.", points: ["They spread out strongly, with almost semicircular wavefronts (gap ≈ λ).", "The wavefronts are still 2.4 cm apart."], modelAnswer: "The waves spread out strongly into the region beyond the barrier as almost semicircular wavefronts, still 2.4 cm apart." }),
        P.num({ label: "(c)", marks: 2, stem: t`The dipper frequency is raised to $10\ \text{Hz}$ with the water depth unchanged. Calculate the new wavelength, in cm.`, value: (f * lam * 100) / 10, unit: "cm", wrong: [2.4 * 2], explanation: t`Speed unchanged: $\lambda = v/f = ${f * lam}/10 = ${(f * lam) / 10}\ \text{m} = ${(f * lam * 100) / 10}\ \text{cm}$.` }),
        P.manual({ label: "(d)", marks: 2, stem: "State and explain how the spreading beyond the 2.5 cm gap changes at 10 Hz.", points: ["The spreading decreases (less diffraction).", "The wavelength (1.2 cm) is now about half the gap width, so the gap is larger compared with λ."], modelAnswer: "The waves spread out less, because the wavelength has halved to 1.2 cm, so the gap is now about two wavelengths wide." }),
      ],
      explanation: "v = fλ; the depth fixes v; diffraction depends on gap ÷ wavelength.",
      hints: ["The water depth fixes the speed."],
    });
  }
  // Practice structured: doorway and loudspeaker (6 marks)
  {
    const v = 340, fLow = 200, fHigh = 8000;
    b.struct({
      d: 3, skill: "ANALYSIS", calculator: true,
      stem: t`Music plays in a school hall. Tendai stands outside, to one side of a doorway $0.85\ \text{m}$ wide, where he cannot see the loudspeaker. The speed of sound is $340\ \text{m s}^{-1}$.`,
      parts: [
        P.num({ label: "(a)", marks: 1, stem: "Calculate the wavelength of a 200 Hz note, in m.", value: v / fLow, unit: "m", wrong: [fLow / v], explanation: t`$\lambda = 340/200 = ${v / fLow}\ \text{m}$.` }),
        P.num({ label: "(b)", marks: 1, stem: "Calculate the wavelength of an 8000 Hz note, in m, to three significant figures.", value: v / fHigh, unit: "m", wrong: [v / 800], explanation: t`$\lambda = 340/8000 = ${sfStr(v / fHigh, 3)}\ \text{m}$.` }),
        P.manual({ label: "(c)", marks: 2, stem: "Explain why the music Tendai hears sounds dull (lacking high notes).", points: ["The 200 Hz wavelength (1.7 m) is comparable with/larger than the 0.85 m doorway, so low notes diffract strongly and reach him.", "The 8000 Hz wavelength (0.0425 m) is much smaller than the doorway, so high notes diffract little and mostly go straight on, missing him."], modelAnswer: t`Low notes have wavelengths of about ${v / fLow} m, larger than the doorway, so they spread round it to Tendai; high notes have wavelengths of about 4 cm, far smaller than the doorway, so they hardly diffract and miss him.` }),
        P.manual({ label: "(d)", marks: 2, stem: "Suggest two other reasons why some sound still reaches Tendai.", points: ["Reflection of sound from walls, floor and ceiling / objects outside the door.", "Sound transmitted through the walls (or through windows/gaps elsewhere)."], modelAnswer: "Sound also reaches him by reflection from walls and other surfaces, and by passing through the walls and other openings." }),
      ],
      explanation: "Compare each wavelength with the 0.85 m doorway.",
      hints: ["Which note has a wavelength comparable with the doorway?"],
    });
  }

  b.card("DEFINITION", "**Diffraction**", "The spreading of a wave through a gap or round an obstacle.");
  b.card("FACT", "When is diffraction greatest?", "When the gap or obstacle is about the same size as the wavelength.");
  b.card("FACT", "What diffraction does not change", "Wavelength, frequency and speed.");
  b.card("CONCEPT", "Sound vs light through a doorway", "Sound λ ~ 1 m diffracts; light λ ~ 5 × 10⁻⁷ m does not noticeably.");
  b.card("CONCEPT", "Radio and hills", "Long-wave λ ~ 1 km diffracts round hills; FM (~3 m) and phone (~0.2 m) signals need line of sight.");
  b.card("CONCEPT", "Why the slits in Young's experiment are narrow", "Diffraction at each slit makes the beams overlap so they can interfere.");
  b.card("CONCEPT", "Ripple tank, narrow gap", "Nearly semicircular wavefronts, same spacing as before.");
  b.card("FACT", "Diffraction vs refraction", "Diffraction: spreading at a gap/edge in one medium. Refraction: direction change from a change of speed.");
});
