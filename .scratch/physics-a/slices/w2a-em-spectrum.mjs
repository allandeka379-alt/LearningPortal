// W2a: aphys.waves.em-spectrum — common properties, regions and wavelength orders, sources/detectors/uses, c = fλ.
import { concept, P, t, chk, DATA, sfStr, sciTex, sciPlain, pctUnc } from "../lib.mjs";

const c = DATA.c;
concept("aphys.waves.em-spectrum", { file: "waves/em-spectrum", keyPrefix: "waves.em-spectrum" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which list shows regions of the electromagnetic spectrum in order of increasing wavelength?",
    options: [
      ["X-rays, ultraviolet, infrared, microwaves", "Correct: wavelength increases from X-rays to microwaves."],
      ["microwaves, infrared, ultraviolet, X-rays", "This is the order of decreasing wavelength (increasing frequency)."],
      ["ultraviolet, X-rays, infrared, microwaves", "X-rays have shorter wavelengths than ultraviolet, so they come first."],
      ["X-rays, infrared, ultraviolet, microwaves", "Ultraviolet (beyond violet) has a shorter wavelength than infrared (below red)."],
    ],
    answer: "A",
    explanation: "Increasing wavelength: gamma, X-ray, ultraviolet, visible, infrared, microwave, radio.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "Which is the approximate wavelength of X-rays used in medical imaging?",
    options: [
      [t`$10^{-11}\ \text{m}$`, "Correct: X-rays lie roughly between 10⁻¹³ m and 10⁻⁸ m."],
      [t`$10^{-7}\ \text{m}$`, "This is near the ultraviolet/visible boundary."],
      [t`$10^{-4}\ \text{m}$`, "This is in the infrared region."],
      [t`$10^{-2}\ \text{m}$`, "This is a microwave wavelength."],
    ],
    answer: "A",
    explanation: "Medical X-rays have wavelengths of order 10⁻¹¹ m (about 0.01 nm to 0.1 nm).",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which property is the same for gamma rays and radio waves travelling in a vacuum?",
    options: [
      ["speed", "Correct: all electromagnetic waves travel at 3.00 × 10⁸ m s⁻¹ in a vacuum."],
      ["frequency", "Gamma rays have frequencies about 10¹⁵ times higher than radio waves."],
      ["wavelength", "Gamma rays have far shorter wavelengths than radio waves."],
      ["ability to ionise atoms", "Gamma rays are ionising; radio waves are not."],
    ],
    answer: "A",
    explanation: "In free space every electromagnetic wave has speed c; frequency and wavelength differ (c = fλ).",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which pair correctly matches a region of the spectrum with a typical detector?",
    options: [
      ["infrared — thermopile", "Correct: a thermopile responds to the heating effect of infrared."],
      ["radio waves — Geiger-Müller tube", "A G-M tube detects ionising radiation such as gamma rays; radio waves need an aerial."],
      ["gamma rays — aerial and tuned circuit", "An aerial detects radio waves; gamma rays need a G-M tube or scintillator."],
      ["ultraviolet — magnetron", "A magnetron is a source of microwaves, not a detector of ultraviolet."],
    ],
    answer: "A",
    explanation: "Thermopile — infrared; aerial — radio; G-M tube — gamma; fluorescent material or film — ultraviolet.",
  });
  {
    const f = 5.0e14;
    const lam = c / f;
    chk(lam, 6.0e-7, 1e-20);
    b.mcq({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`Electromagnetic radiation has frequency $5.0 \times 10^{14}\ \text{Hz}$. In which region of the spectrum is it?`,
      options: [
        ["visible light", "Correct: λ = 3.00 × 10⁸ / 5.0 × 10¹⁴ = 600 nm, within 400-700 nm."],
        ["ultraviolet", "Ultraviolet has wavelengths below 400 nm; this radiation is 600 nm."],
        ["infrared", "Infrared starts above about 700 nm; 600 nm is shorter."],
        ["microwaves", "Microwaves have wavelengths of millimetres to centimetres."],
      ],
      answer: "A",
      explanation: t`$\lambda = c/f = \dfrac{3.00 \times 10^{8}}{5.0 \times 10^{14}} = ${sciTex(lam, 2)}\ \text{m} = 600\ \text{nm}$: orange visible light.`,
      hints: ["Find the wavelength and compare it with 400-700 nm."],
    });
  }
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "An X-ray and a gamma ray have exactly the same wavelength. Which statement is correct?",
    options: [
      ["They differ only in how they were produced.", "Correct: identical wavelengths mean identical radiation; the name records the origin (electrons or nuclei)."],
      ["The gamma ray travels faster in a vacuum.", "Both travel at c in a vacuum."],
      ["The gamma ray has a higher frequency.", "Equal wavelengths and equal speeds give equal frequencies."],
      ["The X-ray cannot ionise atoms.", "X-rays are ionising, just like gamma rays."],
    ],
    answer: "A",
    explanation: "The X-ray and gamma-ray ranges overlap; within the overlap they are distinguished only by their source.",
    hints: ["Use c = fλ: what is fixed if λ and c are the same?"],
  });
  {
    const f = 2.45e9;
    const lam = c / f;
    b.mcq({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A microwave oven operates at $2.45\ \text{GHz}$. What is the wavelength of the microwaves in air?`,
      options: [
        [`${sfStr(lam * 100, 3)} cm`, "Correct: λ = 3.00 × 10⁸ / 2.45 × 10⁹ = 0.122 m."],
        [`${sfStr(c / 2.45e6, 3)} m`, "This treats GHz as 10⁶ Hz instead of 10⁹ Hz."],
        [`${sfStr((c / f) * 1000, 3)} cm`, "This converts metres to centimetres by multiplying by 1000 instead of 100."],
        [`${sfStr((f / c) * 100, 3)} cm`, "This inverts the equation, using f/c."],
      ],
      answer: "A",
      explanation: t`$\lambda = \dfrac{3.00 \times 10^{8}}{2.45 \times 10^{9}} = ${sfStr(lam, 3)}\ \text{m} = ${sfStr(lam * 100, 3)}\ \text{cm}$.`,
      hints: ["1 GHz = 10⁹ Hz."],
    });
  }
  {
    const lam = 1.5e3;
    b.num({
      d: 2, skill: "APPLICATION", daily: true, calculator: true,
      stem: t`A long-wave radio transmitter broadcasts with wavelength $1.5\ \text{km}$. Calculate its frequency, in kHz.`,
      value: c / lam / 1000, unit: "kHz", wrong: [c / 1.5 / 1000, c / lam],
      explanation: t`$f = c/\lambda = \dfrac{3.00 \times 10^{8}}{1.5 \times 10^{3}} = 2.0 \times 10^{5}\ \text{Hz} = ${c / lam / 1000}\ \text{kHz}$.`,
    });
  }
  {
    const lam = 254e-9;
    b.num({
      d: 2, skill: "APPLICATION", calculator: true,
      stem: t`A germicidal ultraviolet lamp emits radiation of wavelength $254\ \text{nm}$. Calculate its frequency, in Hz, to three significant figures.`,
      value: c / lam, unit: "Hz", wrong: [c / 254, c / 254e-6],
      explanation: t`$f = \dfrac{3.00 \times 10^{8}}{254 \times 10^{-9}} = ${sciTex(c / lam)}\ \text{Hz}$. Forgetting to convert nm gives a frequency 10⁹ times too small.`,
    });
  }
  {
    const d = 4.5e3, tEcho = (2 * d) / c;
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`An airport radar sends a microwave pulse to an aircraft $4.5\ \text{km}$ away and detects the reflected pulse. Calculate the time between sending and receiving the pulse, in µs.`,
      value: tEcho * 1e6, unit: "µs", wrong: [(d / c) * 1e6],
      explanation: t`1. The pulse travels to the aircraft and back: $2 \times 4.5 \times 10^{3} = 9.0 \times 10^{3}\ \text{m}$.
2. $t = \dfrac{9.0 \times 10^{3}}{3.00 \times 10^{8}} = 3.0 \times 10^{-5}\ \text{s} = ${tEcho * 1e6}\ \mu\text{s}$.
3. Forgetting the return journey gives half this time.`,
      hints: ["The pulse makes a round trip."],
    });
  }
  {
    const lam = c / 9.0e8;
    b.num({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A mobile phone transmits at $900\ \text{MHz}$. Its aerial is designed to be one quarter of the wavelength long. Calculate the aerial length, in cm, to three significant figures.`,
      value: (lam / 4) * 100, unit: "cm", wrong: [lam * 100, (lam / 2) * 100],
      explanation: t`$\lambda = \dfrac{3.00 \times 10^{8}}{9.00 \times 10^{8}} = ${sfStr(lam, 3)}\ \text{m}$; a quarter of this is $${sfStr(lam / 4, 3)}\ \text{m} = ${sfStr((lam / 4) * 100, 3)}\ \text{cm}$.`,
      hints: ["Find λ first, then divide by four."],
    });
  }
  // Uncertainty item
  {
    const f = 10.5e9, df = 0.2e9;
    b.num({
      d: 3, skill: "ANALYSIS", calculator: true,
      stem: t`The frequency of a microwave source is quoted as $(10.5 \pm 0.2)\ \text{GHz}$. The speed $c$ is taken as exact. Calculate the percentage uncertainty in the wavelength calculated from $\lambda = c/f$, to two significant figures.`,
      value: pctUnc(df, f), sf: 2, unit: "%", wrong: [pctUnc(df, f) * 2],
      explanation: t`For a quotient the percentage uncertainties add; $c$ is exact, so $\%\Delta\lambda = \%\Delta f = \dfrac{0.2}{10.5} \times 100 = ${sfStr(pctUnc(df, f), 2)}\%$.`,
      hints: ["What happens to the percentage uncertainty when you take a reciprocal?"],
    });
  }
  b.tf({
    d: 1, skill: "RECALL",
    stem: "All electromagnetic waves are transverse.",
    answer: true,
    explanation: "True. They consist of electric and magnetic field oscillations perpendicular to the direction of travel, so they can all be polarised.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Infrared radiation has a higher frequency than ultraviolet radiation.",
    answer: false,
    explanation: "False. Infrared has a longer wavelength than visible light and ultraviolet a shorter one, so ultraviolet has the higher frequency.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each region of the electromagnetic spectrum with an approximate wavelength.",
    pairs: [
      ["gamma rays", "10⁻¹² m"],
      ["ultraviolet", "10⁻⁸ m"],
      ["infrared", "10⁻⁵ m"],
      ["microwaves", "10⁻² m"],
      ["radio waves", "10³ m"],
    ],
    explanation: "Orders of magnitude: γ ~10⁻¹² m, UV ~10⁻⁸ m, IR ~10⁻⁵ m, microwaves ~10⁻² m, radio ~1 m to 10³ m and more.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the statements.",
    template: "Visible light has wavelengths from about {{blank:a}} nm to 700 nm. In free space every electromagnetic wave travels at {{blank:b}} × 10⁸ m s⁻¹. The region used for thermal imaging is {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["400"], input: "number", tolerance: 0 },
      { id: "b", accepted: ["3.00", "3", "3.0"], input: "number", tolerance: 0.005 },
      { id: "c", accepted: ["infrared"], choices: ["infrared", "ultraviolet", "microwaves"] },
    ],
    wrong: [["700", "300", "ultraviolet"]],
    explanation: "Visible 400-700 nm; c = 3.00 × 10⁸ m s⁻¹; thermal imaging uses infrared.",
  });
  b.short({
    d: 1, skill: "RECALL",
    stem: "Name the region of the electromagnetic spectrum, between visible light and X-rays, that causes sunburn.",
    accepted: ["ultraviolet", "UV", "ultra-violet", "ultraviolet radiation"],
    wrong: ["infrared"],
    explanation: "**Ultraviolet** lies between visible light and X-rays and is ionising enough to damage skin cells.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 3,
    stem: "State three properties that are common to all electromagnetic waves.",
    points: ["They are transverse (can be polarised).", "They travel at the same speed, 3.00 × 10⁸ m s⁻¹, in free space (a vacuum).", "They need no medium / can travel through a vacuum (or: they all show reflection, refraction, diffraction and interference / transfer energy)."],
    modelAnswer: "They are all transverse waves, they all travel at 3.00 × 10⁸ m s⁻¹ in a vacuum, and they need no medium to travel through.",
    explanation: "Any three correct common properties.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why X-rays are used to image bones while radio waves are not, referring to wavelength and to the interaction of each radiation with the body.",
    points: [
      "X-rays have very short wavelengths (about 10⁻¹¹ m) and high frequency/energy, so they pass through soft tissue but are absorbed more by dense bone, giving contrast.",
      "Radio waves have long wavelengths (metres) and pass through the body with little difference between bone and tissue, so they give no useful shadow image.",
      "A long wavelength also diffracts round small structures, so it cannot resolve detail of millimetre size; the short wavelength of X-rays can.",
    ],
    modelAnswer: "X-rays have wavelengths of about 10⁻¹¹ m. They pass through soft tissue but are absorbed strongly by dense bone, so a shadow image of the bone forms. Radio waves have wavelengths of metres; they pass through tissue and bone alike and, being so long, diffract round small structures, so they cannot show millimetre detail.",
    explanation: "Link wavelength to absorption contrast and to the scale of detail that can be resolved.",
    hints: ["Consider absorption and the size of the detail compared with the wavelength."],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "For microwaves and for gamma rays, state one typical source and one use.",
    points: ["Microwave source: a magnetron / a mobile phone or transmitter circuit (oscillator).", "Microwave use: mobile phones, satellite communication, radar or cooking.", "Gamma-ray source: radioactive nuclei (e.g. cobalt-60).", "Gamma-ray use: radiotherapy (killing cancer cells), sterilising medical equipment or food, or medical tracers."],
    modelAnswer: "Microwaves are produced by a magnetron or by the transmitter circuit in a phone and are used for mobile-phone and satellite links and for cooking. Gamma rays are emitted by radioactive nuclei such as cobalt-60 and are used in radiotherapy and to sterilise surgical instruments.",
    explanation: "One source and one use for each region.",
    hints: ["Gamma rays come from the nucleus."],
  });
  // Practice structured: satellite television link (6 marks)
  {
    const f = 12e9, d = 3.6e7;
    b.struct({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A satellite television signal of frequency $12\ \text{GHz}$ travels $3.6 \times 10^{7}\ \text{m}$ from a geostationary satellite to a dish on a house in Mutare.`,
      parts: [
        P.num({ label: "(a)", marks: 2, stem: "Calculate the wavelength of the signal, in m.", value: c / f, unit: "m", wrong: [c / 12e6], explanation: t`$\lambda = \dfrac{3.00 \times 10^{8}}{12 \times 10^{9}} = ${c / f}\ \text{m}$ (2.5 cm, a microwave).` }),
        P.num({ label: "(b)", marks: 2, stem: "Calculate the time taken for the signal to reach the dish, in s, to two significant figures.", value: d / c, sf: 2, unit: "s", wrong: [(2 * d) / c], explanation: t`$t = \dfrac{3.6 \times 10^{7}}{3.00 \times 10^{8}} = ${d / c}\ \text{s}$ (one way only).` }),
        P.manual({ label: "(c)", marks: 2, stem: "Suggest two reasons why microwaves rather than long radio waves are used for this link.", points: ["Microwaves pass through the ionosphere/atmosphere to and from space (long radio waves are reflected by the ionosphere).", "Their short wavelength allows a narrow beam from a small dish (little diffraction) / higher frequency carries more information (bandwidth)."], modelAnswer: "Microwaves pass through the ionosphere, which reflects long radio waves, and their short wavelength means a small dish can send or receive a narrow, well-directed beam with little diffraction spreading; the high frequency also carries more channels." }),
      ],
      explanation: "λ = c/f; time = distance ÷ c; microwaves penetrate the ionosphere and can be beamed.",
      hints: ["Convert GHz to Hz.", "The signal travels at c."],
    });
  }
  // Practice structured: spectrum data (8 marks)
  {
    const lams = { A: 2.0e-11, B: 5.5e-7, C: 3.0e-2 };
    const fA = c / lams.A, fC = c / lams.C;
    b.struct({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`Three electromagnetic radiations have wavelengths in free space of: P, $2.0 \times 10^{-11}\ \text{m}$; Q, $5.5 \times 10^{-7}\ \text{m}$; R, $3.0 \times 10^{-2}\ \text{m}$.`,
      parts: [
        P.short({ label: "(a)", marks: 1, stem: "Name the region of the spectrum of radiation Q.", accepted: ["visible", "visible light", "light"], wrong: ["ultraviolet"], explanation: "550 nm is green visible light." }),
        P.short({ label: "(b)", marks: 1, stem: "Name the region of the spectrum of radiation R.", accepted: ["microwave", "microwaves"], wrong: ["radio"], explanation: "3.0 cm lies between 10⁻³ m and 10⁻¹ m: microwaves." }),
        P.num({ label: "(c)", marks: 2, stem: "Calculate the frequency of P, in Hz, to two significant figures.", value: fA, sf: 2, unit: "Hz", wrong: [lams.A / c], explanation: t`$f = c/\lambda = \dfrac{3.00 \times 10^{8}}{2.0 \times 10^{-11}} = ${sciTex(fA, 2)}\ \text{Hz}$.` }),
        P.num({ label: "(d)", marks: 2, stem: "Calculate the ratio (frequency of P) ÷ (frequency of R), to two significant figures.", value: fA / fC, sf: 2, wrong: [fC / fA], answer: sciPlain(fA / fC, 2), explanation: t`Frequency ∝ 1/λ, so the ratio is $\dfrac{3.0 \times 10^{-2}}{2.0 \times 10^{-11}} = ${sciTex(fA / fC, 2)}$.` }),
        P.manual({ label: "(e)", marks: 2, stem: "P could be called an X-ray or a gamma ray. Explain why both names are possible and how the correct name is decided.", points: ["The X-ray and gamma-ray wavelength ranges overlap, and at 2.0 × 10⁻¹¹ m both are possible.", "The name depends on the origin: gamma rays come from nuclei (radioactive decay), X-rays from electrons (striking a target / changing energy level)."], modelAnswer: "The two ranges overlap at about 10⁻¹¹ m, so the wavelength alone cannot decide. The radiation is a gamma ray if it was emitted by a nucleus and an X-ray if it was produced by electrons, for example when fast electrons strike a metal target." }),
      ],
      explanation: "Identify regions from orders of magnitude; f = c/λ.",
      hints: ["Compare each wavelength with the ranges you learnt.", "Frequency is inversely proportional to wavelength."],
    });
  }

  b.card("FACT", "Speed of EM waves in free space", t`$c = 3.00 \times 10^{8}\ \text{m s}^{-1}$ for every region`);
  b.card("FACT", "Order of increasing wavelength", "gamma, X-ray, ultraviolet, visible, infrared, microwave, radio");
  b.card("FACT", "Visible range", "About 400 nm (violet) to 700 nm (red).");
  b.card("FACT", "Orders of magnitude of wavelength", "γ 10⁻¹² m, X 10⁻¹⁰ m, UV 10⁻⁸ m, visible 5 × 10⁻⁷ m, IR 10⁻⁵ m, microwave 10⁻² m, radio 1 m to 10³ m");
  b.card("CONCEPT", "X-ray or gamma ray?", "Overlapping ranges; named by origin: X-rays from electrons, gamma rays from nuclei.");
  b.card("DEFINITION", "**Electromagnetic wave**", "Transverse wave of oscillating electric and magnetic fields, perpendicular to each other and to the direction of travel; needs no medium.");
  b.card("FACT", "Ionising regions", "Ultraviolet, X-rays and gamma rays.");
  b.card("FORMULA", "Frequency from wavelength", t`$f = c/\lambda$ (convert nm, µm, MHz, GHz first)`);
});
