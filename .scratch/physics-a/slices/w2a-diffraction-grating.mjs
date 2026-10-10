// W2a: aphys.superposition.diffraction-grating — d sin θ = nλ, lines per mm, maximum order, sharpness, measuring λ, white-light spectra.
import { concept, P, t, chk, sfStr, dpStr, sciTex, deg, rad, pctUnc } from "../lib.mjs";

const asinD = (x) => deg(Math.asin(x));
concept("aphys.superposition.diffraction-grating", { file: "superposition/diffraction-grating", keyPrefix: "superposition.diffraction-grating" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: t`In the grating equation $d\sin\theta = n\lambda$, what does $d$ represent?`,
    options: [
      ["the distance between the centres of adjacent slits", "Correct: d is the grating spacing."],
      ["the width of each slit", "Slit width affects brightness, not the positions of the maxima in this equation."],
      ["the distance from the grating to the screen", "Screen distance does not appear in the grating equation."],
      ["the number of lines per metre", "d is the reciprocal of the number of lines per metre."],
    ],
    answer: "A",
    explanation: "d = grating spacing = 1/N, where N is the number of lines per metre.",
  });
  {
    const N = 250;
    const d = 1e-3 / N;
    b.mcq({
      d: 2, skill: "APPLICATION", daily: true,
      stem: "A grating has 250 lines per millimetre. What is its grating spacing?",
      options: [
        [t`$4.0 \times 10^{-6}\ \text{m}$`, "Correct: 1 mm ÷ 250 = 4.0 × 10⁻³ mm = 4.0 × 10⁻⁶ m."],
        [t`$4.0 \times 10^{-3}\ \text{m}$`, "This is 1/250 without converting millimetres to metres."],
        [t`$2.5 \times 10^{-4}\ \text{m}$`, "This takes the spacing as 250 × 10⁻⁶ m, multiplying instead of dividing."],
        [t`$4.0 \times 10^{-9}\ \text{m}$`, "This converts with 10⁻⁶ instead of 10⁻³ for millimetres."],
      ],
      answer: "A",
      explanation: t`$d = \dfrac{1}{250 \times 10^{3}\ \text{m}^{-1}} = ${sciTex(d, 2)}\ \text{m}$.`,
    });
  }
  {
    const d = 1e-3 / 400, lam = 650e-9;
    const nmax = Math.floor(d / lam);
    chk(nmax, 3);
    b.mcq({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`Red light of wavelength $650\ \text{nm}$ falls normally on a grating with 400 lines per mm. What is the highest order of maximum that can be observed?`,
      options: [
        ["3", "Correct: d/λ = 2.5 × 10⁻⁶ / 6.5 × 10⁻⁷ = 3.8, rounded down."],
        ["4", "3.8 must be rounded down: a fourth order would need sin θ > 1."],
        ["7", "Seven is the total number of maxima (3 each side plus the centre), not the highest order."],
        ["2", "The third order is possible because 3λ = 1.95 µm is less than d = 2.5 µm."],
      ],
      answer: "A",
      explanation: t`$n \le d/\lambda = \dfrac{2.5 \times 10^{-6}}{650 \times 10^{-9}} = ${dpStr(d / lam, 2)}$, so $n_{\max} = ${nmax}$.`,
      hints: ["sin θ cannot exceed 1."],
    });
  }
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why are the maxima produced by a diffraction grating much sharper than the bright fringes from a double slit?",
    options: [
      ["Just off a maximum, waves from the many slits cancel.", "Correct: many slits give near-total cancellation just off each maximum."],
      ["The slits of a grating are wider, so less diffraction occurs.", "Grating slits are very narrow; sharpness comes from the number of slits."],
      ["A grating is used with a laser, but a double slit is not.", "Both can be used with a laser; the difference is the number of slits."],
      ["The grating changes the wavelength of the light to a single value.", "A grating does not change the wavelength."],
    ],
    answer: "A",
    explanation: "With N slits, light from slits far apart gets out of step after a very small change in angle, so intensity drops to almost zero just beside each maximum.",
  });
  {
    const d = 1e-3 / 300, th = 10.2;
    const lam = d * Math.sin(rad(th));
    b.mcq({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`Light falls normally on a grating with 300 lines per mm. The first-order maxima are at $${th}^\circ$ either side of the centre. What is the wavelength?`,
      options: [
        [`${sfStr(lam * 1e9, 3)} nm`, "Correct: λ = d sin θ = 3.33 × 10⁻⁶ × sin 10.2°."],
        [`${sfStr(d * Math.sin(rad(2 * th)) * 1e9, 3)} nm`, "This uses 20.4°, the angle between the two first orders."],
        [`${sfStr((d * Math.sin(rad(th))) / 2 * 1e9, 3)} nm`, "This halves the answer, as if this were the second order."],
        [`${sfStr(d * Math.cos(rad(th)) * 1e9, 3)} nm`, "This uses cos θ instead of sin θ."],
      ],
      answer: "A",
      explanation: t`$d = 1/(3.00 \times 10^{5}) = 3.33 \times 10^{-6}\ \text{m}$; $\lambda = 3.33 \times 10^{-6} \times \sin ${th}^\circ = ${sfStr(lam * 1e9, 3)}\ \text{nm}$.`,
      hints: ["θ is measured from the central maximum."],
    });
  }
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "White light falls on a diffraction grating. Which statement about the first-order spectrum is correct?",
    options: [
      ["Violet is nearest the central maximum and red is furthest from it.", "Correct: sin θ ∝ λ, and violet has the shortest wavelength."],
      ["Red is nearest the central maximum and violet is furthest from it.", "This is the order for dispersion by a glass prism, which is the reverse."],
      ["All colours are at the same angle, so the first order is white.", "Only the zero order is white; each wavelength has its own angle."],
      ["The central maximum is coloured and the first order is white.", "The central (zero-order) maximum is white because every wavelength goes straight through."],
    ],
    answer: "A",
    explanation: "sin θ = nλ/d: shorter wavelengths are diffracted through smaller angles.",
    hints: ["Which wavelength gives the smallest sin θ?"],
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "White light (380 nm to 750 nm) falls on a grating. Which pair of orders always overlap, whatever the grating spacing?",
    options: [
      ["the second and third orders", "Correct: 2 × 750 nm = 1500 nm exceeds 3 × 380 nm = 1140 nm."],
      ["the first and second orders", "1 × 750 = 750 nm is less than 2 × 380 = 760 nm, so these do not overlap."],
      ["the zero and first orders", "The zero order is a single white line at θ = 0, separate from the first-order spectrum."],
      ["No orders overlap for a fine enough grating.", "Overlap depends on nλ only, so it does not depend on d."],
    ],
    answer: "A",
    explanation: "Orders overlap when the largest nλ of one exceeds the smallest (n + 1)λ of the next: 1500 nm > 1140 nm for n = 2.",
    hints: ["Compare nλ for red with (n + 1)λ for violet."],
  });
  {
    const d = 1e-3 / 450, lam = 486e-9;
    b.num({
      d: 2, skill: "APPLICATION", daily: true, calculator: true,
      stem: t`Light of wavelength $486\ \text{nm}$ falls normally on a grating with 450 lines per mm. Calculate the angle of the first-order maximum, in degrees, to three significant figures.`,
      value: asinD(lam / d), unit: "°", wrong: [asinD((lam * 450) / 1)],
      explanation: t`$d = 1/(4.50 \times 10^{5}) = ${sciTex(d)}\ \text{m}$; $\sin\theta = \dfrac{486 \times 10^{-9}}{${sciTex(d)}} = ${dpStr(lam / d, 4)}$; $\theta = ${sfStr(asinD(lam / d), 3)}^\circ$.`,
    });
  }
  {
    const d = 1e-3 / 600, lam = 632.8e-9, n = 2;
    b.num({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`Laser light of wavelength $632.8\ \text{nm}$ is incident normally on a grating with 600 lines per mm. Calculate the angle of the second-order maximum, in degrees, to three significant figures.`,
      value: asinD((n * lam) / d), unit: "°", wrong: [asinD(lam / d), 2 * asinD(lam / d)],
      explanation: t`$\sin\theta_2 = \dfrac{2 \times 632.8 \times 10^{-9}}{1.667 \times 10^{-6}} = ${dpStr((n * lam) / d, 4)}$, so $\theta_2 = ${sfStr(asinD((n * lam) / d), 3)}^\circ$. Doubling the first-order angle gives a wrong answer because θ is not proportional to n.`,
      hints: ["sin θ, not θ, is proportional to n."],
    });
  }
  {
    const th = 24.6, n = 1, lam = 5.9e-7;
    const d = (n * lam) / Math.sin(rad(th));
    const N = 1 / d / 1000;
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`Light of wavelength $590\ \text{nm}$ produces a first-order maximum at $24.6^\circ$ from a grating. Calculate the number of lines per millimetre on the grating, to three significant figures.`,
      value: N, unit: "lines/mm", wrong: [1 / d, N * 2],
      explanation: t`1. $d = \dfrac{n\lambda}{\sin\theta} = \dfrac{590 \times 10^{-9}}{\sin 24.6^\circ} = ${sciTex(d)}\ \text{m}$.
2. Lines per metre $= 1/d = ${sciTex(1 / d)}$; lines per mm $= ${sfStr(N, 3)}$.`,
      hints: ["Find d first; the number of lines per metre is 1/d."],
    });
  }
  {
    const d = 1e-3 / 300, L = 1.200, y = 0.236;
    const th = deg(Math.atan(y / L));
    const lam = d * Math.sin(rad(th));
    b.calc({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`A laser beam passes normally through a grating with 300 lines per mm onto a screen $1.200\ \text{m}$ away. The first-order spots are each $23.6\ \text{cm}$ from the central spot. Calculate the wavelength of the laser light, in nm, to three significant figures.`,
      value: lam * 1e9, unit: "nm", wrong: [d * Math.tan(rad(th)) * 1e9, d * Math.sin(rad(th)) * 1e9 * 2],
      explanation: t`1. $\tan\theta = \dfrac{0.236}{1.200}$, so $\theta = ${sfStr(th, 3)}^\circ$.
2. $d = 1/(3.00 \times 10^{5}) = 3.33 \times 10^{-6}\ \text{m}$.
3. $\lambda = d\sin\theta = 3.33 \times 10^{-6} \times \sin ${sfStr(th, 3)}^\circ = ${sfStr(lam * 1e9, 3)}\ \text{nm}$.
4. Using $\tan\theta$ in place of $\sin\theta$ (the small-angle shortcut) gives ${sfStr(d * Math.tan(rad(th)) * 1e9, 3)} nm, about 2% too large.`,
      hints: ["Find θ from tan θ = y/L, then use d sin θ = nλ."],
    });
  }
  // Uncertainty
  {
    const th = 30.0, dth = 0.5, d = 1e-3 / 600;
    const lam = d * Math.sin(rad(th));
    const hi = d * Math.sin(rad(th + dth)), lo = d * Math.sin(rad(th - dth));
    const pct = pctUnc((hi - lo) / 2, lam);
    b.num({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`With a grating of 600 lines per mm, a first-order angle is measured as $(30.0 \pm 0.5)^\circ$. By calculating λ at $29.5^\circ$ and at $30.5^\circ$, find the percentage uncertainty in λ, to two significant figures.`,
      value: pct, sf: 2, unit: "%", wrong: [pctUnc(dth, th)],
      explanation: t`$\lambda(30.5^\circ) = ${sfStr(hi * 1e9, 4)}\ \text{nm}$, $\lambda(29.5^\circ) = ${sfStr(lo * 1e9, 4)}\ \text{nm}$; half the difference $= ${sfStr(((hi - lo) / 2) * 1e9, 3)}\ \text{nm}$ on $${sfStr(lam * 1e9, 4)}\ \text{nm}$, i.e. $${sfStr(pct, 2)}\%$. It is not the ${sfStr(pctUnc(dth, th), 2)}% uncertainty in the angle, because λ depends on sin θ.`,
      hints: ["Find λ at both ends of the range of the angle."],
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A grating with more lines per millimetre spreads the orders of a spectrum through larger angles.",
    answer: true,
    explanation: "True. More lines per mm means a smaller d, so sin θ = nλ/d is larger for each order.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "If the first-order maximum is at 20°, the second-order maximum is at 40°.",
    answer: false,
    explanation: "False. sin θ, not θ, is proportional to n: sin θ₂ = 2 sin 20° = 0.684, so θ₂ = 43.2°.",
  });
  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each number of lines per mm with the grating spacing.",
    pairs: [
      ["100 lines per mm", "1.0 × 10⁻⁵ m"],
      ["200 lines per mm", "5.0 × 10⁻⁶ m"],
      ["500 lines per mm", "2.0 × 10⁻⁶ m"],
      ["800 lines per mm", "1.25 × 10⁻⁶ m"],
    ],
    explanation: "d = 1/(N per mm × 10³) m.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the statements.",
    template: "The grating equation is d sin θ = {{blank:a}}. The angle θ is measured from the {{blank:b}} maximum. Compared with double-slit fringes, grating maxima are sharper and {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["nλ"], choices: ["nλ", "λ/n", "nd"] },
      { id: "b", accepted: ["zero-order"], choices: ["zero-order", "first-order", "last"] },
      { id: "c", accepted: ["brighter"], choices: ["brighter", "dimmer", "closer together"] },
    ],
    explanation: "d sin θ = nλ; θ from the straight-through (zero-order) direction; sharper, brighter, more widely spaced maxima.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: t`Explain why the grating produces a bright maximum in a direction where $d\sin\theta = n\lambda$.`,
    points: [
      t`The path difference between light from adjacent slits in direction θ is $d\sin\theta$.`,
      "When this equals nλ, light from adjacent slits arrives in phase…",
      "…and so light from every slit arrives in phase: constructive interference of all the waves gives a bright maximum.",
    ],
    modelAnswer: "In direction θ the path difference between adjacent slits is d sin θ. If d sin θ = nλ, light from neighbouring slits is in phase, and since each pair of neighbours has the same path difference, light from all the slits is in phase, interfering constructively to give a bright maximum.",
    explanation: "Path difference between adjacent slits, in phase, all slits in phase.",
    hints: ["What is the path difference between neighbouring slits?"],
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 2,
    stem: "State two advantages of a diffraction grating over a double slit for measuring the wavelength of light.",
    points: ["The maxima are much sharper (narrower), so their positions/angles can be measured more precisely.", "The maxima are brighter and at larger angles (more widely spaced), so the angle has a smaller percentage uncertainty."],
    modelAnswer: "Grating maxima are much sharper, so their positions can be located precisely, and they are brighter and spread through larger angles, so the angles are measured with a smaller percentage uncertainty.",
    explanation: "Sharpness and brightness/large angles.",
  });
  b.manualShort({
    d: 3, skill: "EVALUATION", marks: 4,
    stem: "Describe how to determine the wavelength of a laser using a diffraction grating of known lines per millimetre, a screen and a metre rule.",
    points: [
      "Shine the laser normally through the grating onto a screen; measure the grating-screen distance L.",
      "Measure the distance between the two first-order (or higher-order) spots on either side and halve it to get y.",
      "θ = tan⁻¹(y/L); d = 1/(lines per metre); λ = d sin θ / n.",
      "Repeat for higher orders / different L and average; never look into the beam.",
    ],
    modelAnswer: "Set the grating perpendicular to the laser beam with a screen about 1 m away and measure L. Measure the distance between the two first-order spots and halve it to give y. Calculate θ = tan⁻¹(y/L), d from the lines per metre, and λ = d sin θ. Repeat with the second order and with other values of L and average. Never look into the beam.",
    explanation: "Arrangement, measuring y across both sides, finding θ, d and λ, repeats and safety.",
    hints: ["Measuring between the two first-order spots avoids locating the centre exactly."],
  });
  // Practice structured: sodium and maximum order (12 marks)
  {
    const N = 360, d = 1e-3 / N, l1 = 589.0e-9, l2 = 589.6e-9;
    const n = 2;
    const t1 = asinD((n * l1) / d), t2 = asinD((n * l2) / d);
    b.struct({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: t`Sodium light contains two close wavelengths, $589.0\ \text{nm}$ and $589.6\ \text{nm}$. It falls normally on a grating with ${N} lines per mm.`,
      parts: [
        P.num({ label: "(a)", marks: 1, stem: "Calculate the grating spacing, in m, to three significant figures.", value: d, unit: "m", wrong: [1 / N], explanation: t`$d = 1/(${N} \times 10^{3}) = ${sciTex(d)}\ \text{m}$.` }),
        P.num({ label: "(b)", marks: 2, stem: "Calculate the angle of the second-order maximum for 589.0 nm, in degrees, to four significant figures.", value: t1, sf: 4, unit: "°", wrong: [asinD(l1 / d)], explanation: t`$\sin\theta = \dfrac{2 \times 589.0 \times 10^{-9}}{${sciTex(d, 4)}} = ${dpStr((n * l1) / d, 5)}$; $\theta = ${sfStr(t1, 4)}^\circ$.` }),
        P.num({ label: "(c)", marks: 2, stem: "Calculate the angular separation of the two second-order lines, in degrees, to two significant figures.", value: t2 - t1, sf: 2, unit: "°", wrong: [asinD(l2 / d) - asinD(l1 / d)], explanation: t`$\theta(589.6) = ${sfStr(t2, 5)}^\circ$; difference $= ${sfStr(t2 - t1, 2)}^\circ$. Higher orders separate the lines more.` }),
        P.num({ label: "(d)", marks: 2, stem: "Determine the highest order observable for 589.0 nm.", value: Math.floor(d / l1), wrong: [Math.ceil(d / l1)], explanation: t`$d/\lambda = ${dpStr(d / l1, 2)}$, so the highest order is $${Math.floor(d / l1)}$.` }),
        P.manual({ label: "(e)", marks: 3, stem: "Explain why a grating with many lines is better than a double slit for showing that sodium light contains two separate wavelengths.", points: ["Grating maxima are very sharp (narrow), so two close angles appear as separate lines.", "Grating maxima are bright, so higher orders (with larger separation) can be seen.", "Double-slit fringes are broad and closely spaced, so the two wavelengths would overlap and look like one fringe."], modelAnswer: "The grating's many slits give very sharp, bright maxima at large angles, so two lines differing by 0.6 nm appear separately, especially in higher orders. Double-slit fringes are broad and closely spaced, so the two wavelengths would merge into one fringe." }),
        P.manual({ label: "(f)", marks: 2, stem: "Suggest why the second order is used rather than the first.", points: ["The angular separation of the two lines is larger in the second order.", "So the lines are easier to resolve/measure (the percentage uncertainty in the separation is smaller)."], modelAnswer: "The two lines are further apart in angle in the second order, so they are easier to separate and the measured difference has a smaller percentage uncertainty." }),
      ],
      explanation: "d sin θ = nλ; higher orders spread close wavelengths further apart.",
      hints: ["Convert 300 lines per mm to lines per metre.", "Round the highest order down."],
    });
  }
  // Practice structured: CD as a reflection grating (8 marks)
  {
    const d = 1.6e-6, lam = 532e-9;
    const nmax = Math.floor(d / lam);
    b.struct({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`The tracks on a CD are $1.6\ \mu\text{m}$ apart, so the disc acts as a reflection grating. A green laser of wavelength $532\ \text{nm}$ is shone perpendicularly onto it and the reflected maxima are observed. Assume $d\sin\theta = n\lambda$ applies.`,
      parts: [
        P.num({ label: "(a)", marks: 2, stem: "Calculate the angle of the first-order maximum, in degrees, to three significant figures.", value: asinD(lam / d), unit: "°", wrong: [deg(lam / d)], explanation: t`$\sin\theta = \dfrac{532 \times 10^{-9}}{1.6 \times 10^{-6}} = ${dpStr(lam / d, 4)}$; $\theta = ${sfStr(asinD(lam / d), 3)}^\circ$.` }),
        P.num({ label: "(b)", marks: 2, stem: "Determine the highest order observed.", value: nmax, wrong: [nmax + 1], explanation: t`$d/\lambda = ${dpStr(d / lam, 2)}$, so $n_{\max} = ${nmax}$.` }),
        P.num({ label: "(c)", marks: 2, stem: "Calculate the total number of reflected maxima, counting both sides and the central one.", value: 2 * nmax + 1, wrong: [nmax], explanation: t`$2 \times ${nmax} + 1 = ${2 * nmax + 1}$.` }),
        P.manual({ label: "(d)", marks: 2, stem: "A DVD has tracks closer together than a CD. State and explain how the first-order angle changes for the same laser.", points: ["The angle increases.", "d is smaller, so sin θ = λ/d is larger."], modelAnswer: "The first-order angle is larger, because a smaller track spacing d gives a larger sin θ = λ/d." }),
      ],
      explanation: "A CD's tracks act like grating lines with d = 1.6 µm.",
      hints: ["sin θ cannot exceed 1."],
    });
  }

  b.card("FORMULA", "Diffraction grating", t`$d\sin\theta = n\lambda$`);
  b.card("FORMULA", "Grating spacing", t`$d = 1/N$, with $N$ in lines per metre (lines per mm × 10³)`);
  b.card("FACT", "Highest order", t`Largest whole number $n \le d/\lambda$ (round down)`);
  b.card("CONCEPT", "Why grating maxima are sharp", "Many slits: just off a maximum, waves from distant slits cancel.");
  b.card("CONCEPT", "White-light spectra", "Zero order white; each order a spectrum, violet innermost, red outermost.");
  b.card("FACT", "Overlapping orders", "Second and third orders always overlap: 2 × 700 nm > 3 × 400 nm.");
  b.card("CONCEPT", "Angle from a screen", t`$\tan\theta = y/L$; then $\lambda = d\sin\theta/n$ (no small-angle approximation)`);
  b.card("DEFINITION", "**Diffraction grating**", "A plate with many equally spaced, parallel narrow slits producing sharp interference maxima.");
});
