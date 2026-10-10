// W2a: ZIMSEC Paper 3 free-response items (format assumed, see BRIEF): progressive waves, superposition, s.h.m.
import { concept, P, t, ZIM, DATA, EXAM, checkExam, sfStr, dpStr, sciTex, deg } from "../lib.mjs";

const A = (k) => `aphys.${k}`;
const g = DATA.g;

concept(A("waves.progressive-waves"), { file: "exam/w2a-zimsec", keyPrefix: "exam.w2a-zimsec", applies: ZIM }, (b) => {
  const plan = { examStyle: true, skill: EXAM.ZIM_P3_FREE.skill, secs: EXAM.ZIM_P3_FREE.secs, applies: EXAM.ZIM_P3_FREE.applies, paper: "ZIMSEC P3", calculator: true };

  // Z1: progressive waves and intensity.
  {
    const Pw = 0.75, f = 680, v = 340, dx = 0.375, r1 = 3.0;
    const lam = v / f, I1 = Pw / (4 * Math.PI * r1 * r1);
    b.struct({
      ...plan, d: 4,
      concepts: [A("waves.progressive-waves"), A("waves.transverse-longitudinal")],
      stem: t`A small loudspeaker on a pole at a Bulawayo sports ground emits a steady note of frequency $${f}\ \text{Hz}$ with an acoustic power of $${Pw}\ \text{W}$, spreading equally in all directions. The speed of sound in air is $${v}\ \text{m s}^{-1}$. Ignore reflections and absorption.`,
      parts: checkExam(EXAM.ZIM_P3_FREE, [
        P.manual({ label: "(a)", marks: 5, stem: "Define: (i) a progressive wave, (ii) wavelength, (iii) frequency, (iv) phase difference and (v) intensity.", points: [
          "Progressive wave: a wave that transfers energy from one place to another without net transfer of the medium.",
          "Wavelength: the distance between two adjacent points on the wave oscillating in phase.",
          "Frequency: the number of complete oscillations per unit time.",
          "Phase difference: the fraction of a cycle by which one oscillation leads or lags another, expressed as an angle (degrees or radians).",
          "Intensity: power transmitted per unit area perpendicular to the direction of travel.",
        ], modelAnswer: "A progressive wave transfers energy without any net transfer of the medium. The wavelength is the distance between adjacent points oscillating in phase. Frequency is the number of oscillations per unit time. Phase difference is the fraction of a cycle between two oscillations, as an angle. Intensity is the power per unit area perpendicular to the direction of propagation." }),
        P.manual({ label: "(b)", marks: 5, stem: t`Derive $v = f\lambda$. Explain why, for a point source, the intensity is inversely proportional to the square of the distance, and why the amplitude is then inversely proportional to the distance.`, points: [
          "In one period T the wave travels one wavelength λ.",
          t`$v = \lambda/T$ and $f = 1/T$, so $v = f\lambda$.`,
          t`The power P spreads over a sphere of area $4\pi r^2$, so $I = P/4\pi r^2 \propto 1/r^2$.`,
          "Intensity is proportional to amplitude squared (energy of oscillation ∝ amplitude²).",
          t`So $A^2 \propto 1/r^2$, giving $A \propto 1/r$.`,
        ], modelAnswer: t`In one period the wave advances one wavelength, so $v = \lambda/T = f\lambda$. The source's power spreads over a sphere of area $4\pi r^2$, so $I = P/4\pi r^2$, which is proportional to $1/r^2$. Because $I \propto A^2$, $A^2 \propto 1/r^2$ and $A \propto 1/r$.` }),
        P.group({ label: "(c)", stem: "For the sound from the loudspeaker, calculate:", parts: [
          P.num({ label: "(i)", marks: 1, stem: "the wavelength, in m", value: lam, unit: "m", wrong: [f / v], explanation: t`$\lambda = ${v}/${f} = ${lam}\ \text{m}$.` }),
          P.num({ label: "(ii)", marks: 2, stem: t`the phase difference, in rad, between two points $${dx}\ \text{m}$ apart along a line from the loudspeaker, to three significant figures`, value: (dx / lam) * 2 * Math.PI, unit: "rad", wrong: [(dx / lam) * 360], explanation: t`$\dfrac{${dx}}{${lam}} = ${dx / lam}$ of a cycle; $\phi = ${dx / lam} \times 2\pi = ${sfStr((dx / lam) * 2 * Math.PI, 3)}\ \text{rad}$ ($3\pi/2$).` }),
          P.num({ label: "(iii)", marks: 2, stem: "the period, in ms, to three significant figures", value: 1000 / f, unit: "ms", wrong: [1 / f], explanation: t`$T = 1/f = 1/${f} = ${sfStr(1 / f, 3)}\ \text{s} = ${sfStr(1000 / f, 3)}\ \text{ms}$.` }),
        ] }),
        P.group({ label: "(d)", stem: "Calculate:", parts: [
          P.num({ label: "(i)", marks: 2, stem: t`the intensity at $${r1.toFixed(1)}\ \text{m}$ from the loudspeaker, in $\text{W m}^{-2}$, to three significant figures`, value: I1, unit: "W/m²", wrong: [Pw / (Math.PI * r1 * r1)], explanation: t`$I = \dfrac{${Pw}}{4\pi \times ${r1.toFixed(1)}^2} = ${sciTex(I1)}\ \text{W m}^{-2}$.` }),
          P.num({ label: "(ii)", marks: 1, stem: t`the distance, in m, at which the intensity is $\tfrac{1}{25}$ of its value at $${r1.toFixed(1)}\ \text{m}$`, value: r1 * 5, unit: "m", wrong: [r1 * 25], explanation: t`$I \propto 1/r^2$: one twenty-fifth needs $r$ five times larger, $${r1 * 5}\ \text{m}$.` }),
          P.num({ label: "(iii)", marks: 2, stem: t`the ratio (amplitude at $${r1.toFixed(1)}\ \text{m}$) ÷ (amplitude at the distance in (ii))`, value: 5, wrong: [25], explanation: t`$A \propto 1/r$, so the ratio is $${r1 * 5}/${r1.toFixed(1)} = 5$; 25 is the intensity ratio.` }),
        ] }),
      ]),
      explanation: "v = fλ; φ = 2πΔx/λ; I = P/4πr²; A ∝ 1/r.",
      hints: ["The power spreads over a sphere of area 4πr².", "Intensity ∝ amplitude²."],
    });
  }

  // Z2: superposition — resonance tube and diffraction grating.
  {
    const f = 480, l1 = 0.172, l2 = 0.528;
    const lam = 2 * (l2 - l1), v = f * lam, e = lam / 4 - l1;
    const d = 1e-3 / 500, ly = 590e-9, lv = 410e-9;
    const ty = deg(Math.asin(ly / d)), tv = deg(Math.asin(lv / d));
    b.struct({
      ...plan, d: 5,
      concepts: [A("superposition.stationary-waves"), A("superposition.diffraction-grating"), A("superposition.two-source-interference")],
      stem: t`Part 1: a tuning fork of frequency $${f}\ \text{Hz}$ is held over a vertical tube whose lower end is closed by water. As the water level is lowered, loud resonances are first heard at air-column lengths of $${(l1 * 100).toFixed(1)}\ \text{cm}$ and $${(l2 * 100).toFixed(1)}\ \text{cm}$. Part 2: light containing wavelengths of $590\ \text{nm}$ and $410\ \text{nm}$ falls normally on a diffraction grating with 500 lines per mm.`,
      parts: checkExam(EXAM.ZIM_P3_FREE, [
        P.manual({ label: "(a)", marks: 5, stem: "State the principle of superposition, and explain what is meant by (i) coherent sources, (ii) path difference, (iii) a node and (iv) an antinode.", points: [
          "Superposition: where waves meet, the resultant displacement is the (vector) sum of the individual displacements.",
          "Coherent sources: constant phase difference (same frequency).",
          "Path difference: difference in distances travelled by two waves from their sources to a point.",
          "Node: point on a stationary wave of zero amplitude.",
          "Antinode: point on a stationary wave of maximum amplitude.",
        ], modelAnswer: "When waves meet, the resultant displacement at a point is the sum of the individual displacements. Coherent sources have a constant phase difference. Path difference is the difference in the distances travelled by two waves to a point. A node is a point of zero amplitude on a stationary wave; an antinode is a point of maximum amplitude." }),
        P.manual({ label: "(b)", marks: 5, stem: "Explain how the stationary wave forms in the air column of Part 1, why the first resonance occurs at a quarter wavelength, and why the difference between the two resonance lengths gives half a wavelength even though the antinode is slightly above the open end.", points: [
          "Sound from the fork travels down the tube and reflects at the water surface; incident and reflected waves (same frequency) superpose to give a stationary wave.",
          "The water surface is a displacement node (air cannot move) and the open end is (close to) an antinode.",
          "Node to adjacent antinode is λ/4, so the shortest resonating column is about λ/4.",
          "The next resonance has one more node-antinode pair: length ≈ 3λ/4, so successive lengths differ by λ/2.",
          "The end correction (antinode a small distance e above the top) adds the same e to both lengths, so it cancels in the difference.",
        ], modelAnswer: "Sound reflected at the water surface superposes with the incident sound to form a stationary wave. The water surface is a displacement node and the open end is approximately an antinode, so the shortest resonating length is about λ/4. The next resonance adds half a wavelength, giving about 3λ/4. Both lengths are short of the true values by the same end correction e, because the antinode lies slightly above the tube, so e cancels when the lengths are subtracted, leaving λ/2." }),
        P.group({ label: "(c)", stem: "For Part 1, calculate:", parts: [
          P.num({ label: "(i)", marks: 2, stem: "the wavelength of the sound, in m", value: lam, unit: "m", wrong: [l2 - l1, 4 * l1], explanation: t`$\lambda/2 = ${l2} - ${l1} = ${dpStr(l2 - l1, 3)}\ \text{m}$, so $\lambda = ${dpStr(lam, 3)}\ \text{m}$.` }),
          P.num({ label: "(ii)", marks: 2, stem: t`the speed of sound, in $\text{m s}^{-1}$, to three significant figures`, value: v, unit: "m/s", wrong: [f * 4 * l1], explanation: t`$v = f\lambda = ${f} \times ${dpStr(lam, 3)} = ${sfStr(v, 3)}\ \text{m s}^{-1}$.` }),
          P.num({ label: "(iii)", marks: 1, stem: "the end correction, in mm", value: e * 1000, tol: 0.05, unit: "mm", wrong: [l1 * 1000], explanation: t`$e = \lambda/4 - l_1 = ${dpStr(lam / 4, 3)} - ${l1} = ${dpStr(e, 3)}\ \text{m} = ${dpStr(e * 1000, 1)}\ \text{mm}$.` }),
        ] }),
        P.group({ label: "(d)", stem: "For Part 2, calculate:", parts: [
          P.num({ label: "(i)", marks: 2, stem: "the angle of the first-order maximum for 590 nm, in degrees, to three significant figures", value: ty, unit: "°", wrong: [deg(ly / 2e-3)], explanation: t`$d = 2.00 \times 10^{-6}\ \text{m}$; $\sin\theta = \dfrac{590 \times 10^{-9}}{2.00 \times 10^{-6}} = 0.295$; $\theta = ${sfStr(ty, 3)}^\circ$.` }),
          P.num({ label: "(ii)", marks: 1, stem: "the highest order observed for 590 nm", value: Math.floor(d / ly), wrong: [Math.ceil(d / ly)], explanation: t`$d/\lambda = ${dpStr(d / ly, 2)}$; highest order $${Math.floor(d / ly)}$.` }),
          P.num({ label: "(iii)", marks: 2, stem: "the angle between the two first-order lines, in degrees, to three significant figures", value: ty - tv, unit: "°", wrong: [deg((ly - lv) / d)], explanation: t`$\theta_{410} = \sin^{-1}(0.205) = ${sfStr(tv, 3)}^\circ$; separation $= ${sfStr(ty, 4)} - ${sfStr(tv, 4)} = ${sfStr(ty - tv, 3)}^\circ$.` }),
        ] }),
      ]),
      explanation: "Resonance tube: successive lengths differ by λ/2 and the end correction cancels; grating: d sin θ = nλ.",
      hints: ["Subtract the two resonance lengths.", "Convert lines per mm to a spacing in metres."],
    });
  }

  // Z3: s.h.m. of a mass on a spring, energy and damping.
  {
    const m = 0.50, ext = 0.125, x0 = 0.045, x = 0.030;
    const k = (m * g) / ext, w = Math.sqrt(k / m), T = (2 * Math.PI) / w;
    const E = 0.5 * k * x0 * x0;
    b.struct({
      ...plan, d: 4,
      concepts: [A("oscillations.shm"), A("oscillations.shm-energy"), A("oscillations.damping-resonance")],
      stem: t`A $0.50\ \text{kg}$ mass hangs from a spring, which it extends by $12.5\ \text{cm}$. The mass is pulled down a further $4.5\ \text{cm}$ and released, and oscillates vertically with simple harmonic motion. Take $g = 9.81\ \text{m s}^{-2}$.`,
      parts: checkExam(EXAM.ZIM_P3_FREE, [
        P.manual({ label: "(a)", marks: 4, stem: "Define (i) simple harmonic motion, (ii) amplitude and (iii) angular frequency.", points: [
          "S.h.m.: acceleration directly proportional to displacement from a fixed point…",
          "…and always directed towards that point.",
          "Amplitude: the maximum displacement from the equilibrium position.",
          t`Angular frequency: $2\pi \times$ frequency ($\omega = 2\pi f = 2\pi/T$).`,
        ], modelAnswer: "Simple harmonic motion is motion in which the acceleration is proportional to the displacement from a fixed point and always directed towards that point. The amplitude is the maximum displacement from equilibrium. The angular frequency is 2π times the frequency, ω = 2π/T." }),
        P.manual({ label: "(b)", marks: 6, stem: t`Show that the mass performs s.h.m. with $\omega^2 = k/m$, and show that its total energy is $\tfrac{1}{2}m\omega^2x_0^2$.`, points: [
          "At equilibrium the spring tension balances the weight: ke = mg (e = static extension).",
          t`At displacement $x$ below equilibrium the tension is $k(e + x)$, so the resultant (upward) force is $k(e + x) - mg = kx$, i.e. $F = -kx$.`,
          t`$a = -\dfrac{k}{m}x$: acceleration ∝ displacement, directed towards equilibrium, so s.h.m. with $\omega^2 = k/m$.`,
          t`Maximum speed (at equilibrium) $v_0 = \omega x_0$.`,
          "At equilibrium the energy of the oscillation is all kinetic (the potential energy measured from equilibrium is zero).",
          t`$E = \tfrac{1}{2}mv_0^2 = \tfrac{1}{2}m\omega^2x_0^2$, constant in the absence of damping.`,
        ], modelAnswer: t`At equilibrium $ke = mg$. Displaced a further $x$, the tension is $k(e + x)$, so the resultant force is $-kx$ (towards equilibrium), and $a = -(k/m)x$: s.h.m. with $\omega^2 = k/m$. The maximum speed is $\omega x_0$ at the equilibrium position, where all the oscillation energy is kinetic, so $E = \tfrac{1}{2}m(\omega x_0)^2 = \tfrac{1}{2}m\omega^2x_0^2$.` }),
        P.group({ label: "(c)", stem: "Calculate, to three significant figures:", parts: [
          P.num({ label: "(i)", marks: 1, stem: t`the spring constant, in $\text{N m}^{-1}$`, value: k, unit: "N/m", wrong: [m / ext], explanation: t`$k = \dfrac{mg}{e} = \dfrac{0.50 \times 9.81}{0.125} = ${sfStr(k, 3)}\ \text{N m}^{-1}$.` }),
          P.num({ label: "(ii)", marks: 2, stem: "the period, in s", value: T, unit: "s", wrong: [2 * Math.PI * Math.sqrt(k / m)], explanation: t`$T = 2\pi\sqrt{m/k} = 2\pi\sqrt{0.50/${sfStr(k, 4)}} = ${sfStr(T, 3)}\ \text{s}$ (the same as $2\pi\sqrt{e/g}$).` }),
          P.num({ label: "(iii)", marks: 2, stem: t`the maximum speed, in $\text{m s}^{-1}$`, value: w * x0, unit: "m/s", wrong: [w * w * x0], explanation: t`$\omega = 2\pi/T = ${sfStr(w, 3)}\ \text{rad s}^{-1}$; $v_0 = \omega x_0 = ${sfStr(w * x0, 3)}\ \text{m s}^{-1}$.` }),
        ] }),
        P.group({ label: "(d)", stem: "Calculate:", parts: [
          P.num({ label: "(i)", marks: 2, stem: "the total energy of the oscillation, in J, to three significant figures", value: E, unit: "J", wrong: [k * x0 * x0], explanation: t`$E = \tfrac{1}{2}kx_0^2 = \tfrac{1}{2} \times ${sfStr(k, 4)} \times 0.045^2 = ${sfStr(E, 3)}\ \text{J}$.` }),
          P.num({ label: "(ii)", marks: 2, stem: t`the speed when the displacement is $3.0\ \text{cm}$, in $\text{m s}^{-1}$, to three significant figures`, value: w * Math.sqrt(x0 * x0 - x * x), unit: "m/s", wrong: [w * (x0 - x)], explanation: t`$v = \omega\sqrt{x_0^2 - x^2} = ${sfStr(w, 4)}\sqrt{0.045^2 - 0.030^2} = ${sfStr(w * Math.sqrt(x0 * x0 - x * x), 3)}\ \text{m s}^{-1}$.` }),
          P.num({ label: "(iii)", marks: 1, stem: "air resistance later halves the amplitude; calculate the fraction of the original energy that remains", value: 0.25, wrong: [0.5], explanation: t`$E \propto x_0^2$: $(\tfrac{1}{2})^2 = 0.25$.` }),
        ] }),
      ]),
      explanation: "ke = mg gives k; ω² = k/m; v₀ = ωx₀; E = ½kx₀²; E ∝ x₀².",
      hints: ["Use the static extension to find k.", "Energy is proportional to amplitude squared."],
    });
  }
});
