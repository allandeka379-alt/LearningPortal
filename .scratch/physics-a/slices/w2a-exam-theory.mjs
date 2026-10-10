// W2a: THEORY10 exam-format items. 4 AS (progressive waves, stationary waves, interference/grating — both boards;
// Doppler — Cambridge only) + 2 A (s.h.m. with energy; damping and resonance — both boards).
import { concept, P, t, CAM, DATA, EXAM, checkExam, sfStr, dpStr, sciTex, deg, dopplerSource } from "../lib.mjs";

const A = (k) => `aphys.${k}`;
const g = DATA.g;

concept(A("waves.progressive-waves"), { file: "exam/w2a-theory", keyPrefix: "exam.w2a-theory" }, (b) => {
  const plan = { examStyle: true, skill: EXAM.THEORY10.skill, secs: EXAM.THEORY10.secs, calculator: true };

  // T1 (AS): sound, CRO, phase difference, inverse square.
  {
    const tb = 0.25e-3, divs = 3.2, v = 340;
    const f = 1 / (tb * divs), lam = v / f, dx = 0.068;
    const A1 = 6.0, r1 = 1.5, r2 = 6.0;
    b.struct({
      ...plan, d: 3, paper: "ZIMSEC P2 / Cambridge P2",
      concepts: [A("waves.progressive-waves"), A("waves.transverse-longitudinal")],
      stem: t`A small loudspeaker emits a steady note. A microphone $1.5\ \text{m}$ away is connected to a CRO with the time-base set at $0.25\ \text{ms div}^{-1}$. One complete cycle of the trace occupies $3.2$ divisions and the trace has an amplitude of $6.0$ divisions. The speed of sound is $${v}\ \text{m s}^{-1}$.`,
      parts: checkExam(EXAM.THEORY10, [
        P.manual({ label: "(a)", marks: 2, stem: "Sound is a longitudinal wave. State what is meant by a longitudinal wave and how it differs from a transverse wave.", points: ["Longitudinal: the particles oscillate parallel to the direction of energy transfer (travel).", "Transverse: the oscillations are perpendicular to the direction of energy transfer."], modelAnswer: "In a longitudinal wave the particles of the medium oscillate parallel to the direction in which the wave transfers energy; in a transverse wave they oscillate at right angles to it." }),
        P.num({ label: "(b)", marks: 2, stem: "Calculate the frequency of the sound, in Hz.", value: f, unit: "Hz", wrong: [1 / (divs * 0.25)], explanation: t`$T = 3.2 \times 0.25\ \text{ms} = 8.0 \times 10^{-4}\ \text{s}$; $f = 1/T = ${f}\ \text{Hz}$.` }),
        P.num({ label: "(c)", marks: 1, stem: "Calculate the wavelength of the sound, in m.", value: lam, unit: "m", wrong: [f / v], explanation: t`$\lambda = v/f = ${v}/${f} = ${lam}\ \text{m}$.` }),
        P.num({ label: "(d)", marks: 2, stem: t`Calculate the phase difference, in rad, between the oscillations of two air layers $${dx}\ \text{m}$ apart along the direction of travel, to three significant figures.`, value: (dx / lam) * 2 * Math.PI, unit: "rad", wrong: [(dx / lam) * 360], explanation: t`$\dfrac{${dx}}{${lam}} = ${dx / lam}$ of a cycle; $\phi = ${dx / lam} \times 2\pi = ${sfStr((dx / lam) * 2 * Math.PI, 3)}\ \text{rad}$ ($\pi/2$).` }),
        P.num({ label: "(e)", marks: 2, stem: t`The microphone is moved to $${r2.toFixed(1)}\ \text{m}$ from the loudspeaker with the CRO settings unchanged. Assuming the loudspeaker acts as a point source and the trace amplitude is proportional to the sound amplitude, calculate the new trace amplitude, in divisions.`, value: (A1 * r1) / r2, wrong: [A1 * (r1 / r2) ** 2], explanation: t`$I \propto 1/r^2$ and $I \propto A^2$, so $A \propto 1/r$: $6.0 \times \dfrac{1.5}{6.0} = ${(A1 * r1) / r2}$ divisions. Using $1/r^2$ for the amplitude gives ${dpStr(A1 * (r1 / r2) ** 2, 2)}, which applies to the intensity.` }),
        P.manual({ label: "(f)", marks: 1, stem: "Suggest one reason why the measured amplitude at 6.0 m may differ from your answer to (e).", points: ["Reflections from walls/floor add to the sound, or absorption by the air reduces it, or the loudspeaker is directional (not a point source)."], modelAnswer: "Sound reflected from the walls and floor also reaches the microphone, so the amplitude may be larger than predicted (or the loudspeaker is directional rather than a point source)." }),
      ]),
      explanation: "T from divisions × time-base; v = fλ; φ = 2πΔx/λ; amplitude ∝ 1/r for a point source.",
      hints: ["Period = number of divisions × time-base.", "Intensity ∝ amplitude² and ∝ 1/r²."],
    });
  }

  // T2 (AS): stationary waves on a string.
  {
    const L = 1.20, f = 150, loops = 4;
    const lam = (2 * L) / loops, v = f * lam, f1 = v / (2 * L);
    b.struct({
      ...plan, d: 3, paper: "ZIMSEC P2 / Cambridge P2",
      concepts: [A("superposition.stationary-waves"), A("waves.progressive-waves")],
      stem: t`A string is stretched between a vibration generator and a fixed pulley $1.20\ \text{m}$ away; both ends behave as nodes. At a frequency of $150\ \text{Hz}$ a stationary wave with four loops forms on the string.`,
      parts: checkExam(EXAM.THEORY10, [
        P.manual({ label: "(a)", marks: 2, stem: "Explain how the stationary wave is formed.", points: ["The wave travelling along the string is reflected at the pulley (fixed end).", "The incident and reflected waves (same frequency and speed, opposite directions) superpose to form nodes and antinodes."], modelAnswer: "Waves travelling along the string reflect at the pulley. The incident and reflected waves, of the same frequency and speed but travelling in opposite directions, superpose to give a fixed pattern of nodes and antinodes." }),
        P.num({ label: "(b)", marks: 1, stem: "Calculate the wavelength, in m.", value: lam, unit: "m", wrong: [L / loops], explanation: t`Four loops $= 2\lambda = 1.20\ \text{m}$, so $\lambda = ${lam}\ \text{m}$.` }),
        P.num({ label: "(c)", marks: 2, stem: t`Calculate the speed of the waves on the string, in $\text{m s}^{-1}$.`, value: v, unit: "m/s", wrong: [f * (L / loops)], explanation: t`$v = f\lambda = 150 \times ${lam} = ${v}\ \text{m s}^{-1}$.` }),
        P.num({ label: "(d)", marks: 2, stem: "Calculate the lowest frequency at which a stationary wave forms on this string, in Hz.", value: f1, unit: "Hz", wrong: [f / 2], explanation: t`One loop: $\lambda = 2.40\ \text{m}$; $f_1 = ${v}/2.40 = ${f1}\ \text{Hz}$ (or $150/4$).` }),
        P.num({ label: "(e)", marks: 1, stem: "State the phase difference, in degrees, between the oscillations of two points in adjacent loops.", value: 180, unit: "°", wrong: [90], explanation: "Adjacent loops move in antiphase: 180°." }),
        P.manual({ label: "(f)", marks: 2, stem: "State two ways in which the stationary wave differs from a progressive wave on the same string.", points: ["Amplitude varies along a stationary wave (zero at nodes, maximum at antinodes); it is constant along a progressive wave.", "No net energy transfer along a stationary wave / points between adjacent nodes are in phase (phase varies continuously along a progressive wave)."], modelAnswer: "In the stationary wave the amplitude varies from zero at the nodes to a maximum at the antinodes, whereas it is the same everywhere on a progressive wave; and the stationary wave transfers no net energy along the string, whereas a progressive wave does." }),
      ]),
      explanation: "n loops = nλ/2; v = fλ; f₁ = v/2L.",
      hints: ["Each loop is half a wavelength.", "The fundamental has one loop."],
    });
  }

  // T3 (AS): double slit then grating.
  {
    const a = 0.45e-3, D = 2.10, span = 23.6e-3, n = 8;
    const x = span / n, lam = (a * x) / D;
    const d = 1e-3 / 500;
    const th = deg(Math.asin(lam / d));
    b.struct({
      ...plan, d: 4, paper: "ZIMSEC P2 / Cambridge P2",
      concepts: [A("superposition.two-source-interference"), A("superposition.diffraction"), A("superposition.diffraction-grating")],
      stem: t`Light from a laser passes through two narrow parallel slits $0.45\ \text{mm}$ apart. Interference fringes are seen on a screen $2.10\ \text{m}$ from the slits; the distance across eight fringe spacings is $23.6\ \text{mm}$.`,
      parts: checkExam(EXAM.THEORY10, [
        P.manual({ label: "(a)", marks: 2, stem: "Explain why the slits must be narrow and why they act as coherent sources.", points: ["Narrow slits make the light diffract (spread) so that the beams from the two slits overlap.", "Both slits are illuminated by the same wavefront from one laser, so the waves leaving them have a constant phase difference."], modelAnswer: "The slits must be narrow so that light diffracts at each one and the two beams overlap on the screen. They are coherent because both are lit by the same wavefront from one source, so their waves keep a constant phase difference." }),
        P.num({ label: "(b)", marks: 1, stem: "Calculate the fringe separation, in mm.", value: x * 1000, unit: "mm", wrong: [(span / (n + 1)) * 1000], explanation: t`$x = 23.6/8 = ${dpStr(x * 1000, 3)}\ \text{mm}$.` }),
        P.num({ label: "(c)", marks: 2, stem: "Calculate the wavelength of the light, in nm, to three significant figures.", value: lam * 1e9, unit: "nm", wrong: [((x * D) / a) * 1e9], explanation: t`$\lambda = \dfrac{ax}{D} = \dfrac{0.45 \times 10^{-3} \times ${dpStr(x * 1000, 3)} \times 10^{-3}}{2.10} = ${sfStr(lam * 1e9, 3)}\ \text{nm}$.` }),
        P.num({ label: "(d)", marks: 2, stem: "The double slit is replaced by a grating with 500 lines per mm. Calculate the angle of the first-order maximum, in degrees, to three significant figures.", value: th, unit: "°", wrong: [deg(lam / d) * 2], explanation: t`$d = 2.00 \times 10^{-6}\ \text{m}$; $\sin\theta = \dfrac{${sfStr(lam * 1e9, 3)} \times 10^{-9}}{2.00 \times 10^{-6}} = ${dpStr(lam / d, 4)}$; $\theta = ${sfStr(th, 3)}^\circ$.` }),
        P.num({ label: "(e)", marks: 1, stem: "Determine the highest order of maximum produced by the grating.", value: Math.floor(d / lam), wrong: [Math.ceil(d / lam)], explanation: t`$d/\lambda = ${dpStr(d / lam, 2)}$, so the highest order is $${Math.floor(d / lam)}$.` }),
        P.manual({ label: "(f)", marks: 2, stem: "Explain why the grating gives a more precise value of the wavelength than the double slit.", points: ["The grating maxima are much sharper/narrower (and brighter), so their positions can be located precisely.", "They are at large angles (widely spaced), so the percentage uncertainty in the angle is small."], modelAnswer: "The many slits of the grating give very sharp, bright maxima that can be located precisely, and they occur at large angles, so the angle is measured with a much smaller percentage uncertainty than the few-millimetre fringe spacing." }),
      ]),
      explanation: "λ = ax/D for the double slit; d sin θ = nλ for the grating.",
      hints: ["Eight spacings, not eight fringes.", "Round the highest order down."],
    });
  }

  // T5 (A): mass-spring s.h.m. and energy.
  {
    const k = 40, m = 0.25, x0 = 0.035, x = 0.020;
    const w = Math.sqrt(k / m), T = (2 * Math.PI) / w;
    const E = 0.5 * k * x0 * x0, Ek = 0.5 * k * (x0 * x0 - x * x);
    b.struct({
      ...plan, d: 4, paper: "ZIMSEC P2 / Cambridge P4",
      concepts: [A("oscillations.shm"), A("oscillations.shm-energy")],
      stem: t`A trolley of mass $0.25\ \text{kg}$ is attached between two springs on a horizontal track. The combined spring constant is $40\ \text{N m}^{-1}$. The trolley is displaced $3.5\ \text{cm}$ and released, and performs simple harmonic motion. Friction is negligible.`,
      parts: checkExam(EXAM.THEORY10, [
        P.manual({ label: "(a)", marks: 2, stem: "Define simple harmonic motion.", points: ["The acceleration is (directly) proportional to the displacement from a fixed point (equilibrium)…", "…and is always directed towards that point (opposite to the displacement)."], modelAnswer: "Simple harmonic motion is motion in which the acceleration is proportional to the displacement from a fixed point and always directed towards that point." }),
        P.num({ label: "(b)", marks: 2, stem: "Calculate the period of the oscillations, in s, to three significant figures.", value: T, unit: "s", wrong: [2 * Math.PI * Math.sqrt(k / m)], explanation: t`$\omega = \sqrt{k/m} = \sqrt{40/0.25} = ${sfStr(w, 3)}\ \text{rad s}^{-1}$; $T = 2\pi/\omega = ${sfStr(T, 3)}\ \text{s}$.` }),
        P.num({ label: "(c)", marks: 2, stem: t`Calculate the maximum speed of the trolley, in $\text{m s}^{-1}$, to three significant figures.`, value: w * x0, unit: "m/s", wrong: [w * w * x0], explanation: t`$v_0 = \omega x_0 = ${sfStr(w, 4)} \times 0.035 = ${sfStr(w * x0, 3)}\ \text{m s}^{-1}$.` }),
        P.num({ label: "(d)", marks: 2, stem: "Calculate the total energy of the oscillation, in J, to three significant figures.", value: E, unit: "J", wrong: [k * x0 * x0], explanation: t`$E = \tfrac{1}{2}m\omega^2x_0^2 = \tfrac{1}{2}kx_0^2 = \tfrac{1}{2} \times 40 \times 0.035^2 = ${sfStr(E, 3)}\ \text{J}$.` }),
        P.num({ label: "(e)", marks: 1, stem: "Calculate the kinetic energy when the displacement is 2.0 cm, in J, to three significant figures.", value: Ek, unit: "J", wrong: [0.5 * k * x * x], explanation: t`$E_k = \tfrac{1}{2}k(x_0^2 - x^2) = 20(0.035^2 - 0.020^2) = ${sfStr(Ek, 3)}\ \text{J}$.` }),
        P.manual({ label: "(f)", marks: 1, stem: "Describe the graph of the trolley's acceleration against its displacement.", points: [t`A straight line through the origin with negative gradient ($-\omega^2 = -160\ \text{s}^{-2}$), from $x = -3.5$ cm to $+3.5$ cm.`], modelAnswer: "A straight line through the origin with a negative gradient of −160 s⁻², extending from −3.5 cm to +3.5 cm." }),
      ]),
      explanation: "ω² = k/m; v₀ = ωx₀; E = ½kx₀²; Eₖ = ½k(x₀² − x²).",
      hints: ["For a spring, mω² = k.", "Total energy = elastic energy at maximum displacement."],
    });
  }

  // T6 (A): damping and resonance of a pendulum.
  {
    const l = 0.70, A0 = 15.0, A4 = 9.6, n = 4;
    const f0 = Math.sqrt(g / l) / (2 * Math.PI);
    const r = (A4 / A0) ** (1 / n);
    b.struct({
      ...plan, d: 4, paper: "ZIMSEC P2 / Cambridge P4",
      concepts: [A("oscillations.damping-resonance"), A("oscillations.shm")],
      stem: t`A pendulum of length $0.70\ \text{m}$ swings with a small amplitude in air. Its amplitude falls from $15.0\ \text{cm}$ to $9.6\ \text{cm}$ in four complete oscillations. Later, the top of the pendulum is moved to and fro horizontally by a motor whose frequency can be varied.`,
      parts: checkExam(EXAM.THEORY10, [
        P.manual({ label: "(a)", marks: 2, stem: "Distinguish between free oscillations and forced oscillations.", points: ["Free: the system oscillates at its natural frequency with no periodic external (driving) force after being started.", "Forced: a periodic driving force acts, and the system oscillates at the driving frequency."], modelAnswer: "A free oscillation occurs when a system is displaced and left to oscillate at its natural frequency with no periodic force acting; a forced oscillation is driven by a periodic external force and takes place at the driving frequency." }),
        P.num({ label: "(b)", marks: 2, stem: "Calculate the natural frequency of the pendulum, in Hz, to three significant figures.", value: f0, unit: "Hz", wrong: [Math.sqrt(g / l)], explanation: t`$f_0 = \dfrac{1}{2\pi}\sqrt{\dfrac{g}{l}} = \dfrac{1}{2\pi}\sqrt{\dfrac{9.81}{0.70}} = ${sfStr(f0, 3)}\ \text{Hz}$.` }),
        P.num({ label: "(c)", marks: 2, stem: "Assuming the amplitude falls by the same fraction each oscillation, calculate that fraction (amplitude after one oscillation ÷ amplitude before), to three significant figures.", value: r, wrong: [1 - (1 - A4 / A0) / n], explanation: t`$r^4 = 9.6/15.0 = 0.64$, so $r = 0.64^{1/4} = ${sfStr(r, 3)}$. Dividing the 36% fall by four (giving 0.910) assumes a constant amount, not a constant fraction.` }),
        P.num({ label: "(d)", marks: 1, stem: "Calculate the percentage of the initial energy that remains after the four oscillations, to three significant figures.", value: 100 * (A4 / A0) ** 2, unit: "%", wrong: [100 * (A4 / A0)], explanation: t`$E \propto x_0^2$: $(9.6/15.0)^2 = 0.64^2 = ${dpStr((A4 / A0) ** 2, 4)}$, i.e. $${sfStr(100 * (A4 / A0) ** 2, 3)}\%$.` }),
        P.manual({ label: "(e)", marks: 3, stem: "The motor frequency is slowly increased from 0.2 Hz to 1.2 Hz. Describe how the amplitude of the pendulum changes, and how the result would differ if the bob were replaced by a light card of the same size (more air resistance).", points: ["The amplitude is small at low frequency, rises to a maximum (resonance) when the driving frequency is about 0.60 Hz (the natural frequency), then falls.", "With the card the damping is greater, so the maximum amplitude is smaller…", "…and the peak is broader, occurring at a slightly lower frequency."], modelAnswer: "The amplitude starts small, rises to a maximum when the driving frequency equals the natural frequency of about 0.60 Hz (resonance), and falls again at higher frequencies. With the light card the damping is larger, so the resonance peak is lower and broader and shifts slightly to a lower frequency." }),
      ]),
      explanation: "f₀ = (1/2π)√(g/l); amplitude decays by a constant fraction; E ∝ x₀²; damping lowers and broadens the resonance peak.",
      hints: ["The amplitude is multiplied by the same factor every oscillation.", "Energy ∝ amplitude²."],
    });
  }

  // T4 (AS, Cambridge only): the Doppler effect.
  {
    const fs = 560, v = 340, vs = 30;
    const fa = dopplerSource(fs, v, vs, true), fr = dopplerSource(fs, v, vs, false);
    b.struct({
      ...plan, d: 3, paper: "Cambridge P2", applies: CAM,
      concepts: [A("waves.doppler")],
      stem: t`A train sounds a horn of frequency $560\ \text{Hz}$ as it travels at a constant $${vs}\ \text{m s}^{-1}$ along a straight track. Thandeka stands still beside the track. The speed of sound is $340\ \text{m s}^{-1}$.`,
      parts: checkExam(EXAM.THEORY10, [
        P.manual({ label: "(a)", marks: 2, stem: "Explain, in terms of wavefronts, why the frequency Thandeka hears is higher than 560 Hz while the train approaches.", points: ["Each wavefront is emitted from a point closer to Thandeka, so the wavefronts ahead of the train are closer together (shorter wavelength).", "The speed of sound is unchanged, so more wavefronts reach her per second: higher frequency (f = v/λ)."], modelAnswer: "The train moves towards Thandeka between emitting successive wavefronts, so the wavefronts ahead of it are bunched together and the wavelength is shorter. Sound still travels at 340 m s⁻¹, so the wavefronts arrive more often and she hears a higher frequency." }),
        P.num({ label: "(b)", marks: 2, stem: "Calculate the frequency she hears as the train approaches, in Hz, to three significant figures.", value: fa, unit: "Hz", wrong: [fr], explanation: t`$f_o = \dfrac{560 \times 340}{340 - ${vs}} = ${sfStr(fa, 3)}\ \text{Hz}$.` }),
        P.num({ label: "(c)", marks: 2, stem: "Calculate the frequency she hears after the train has passed, in Hz, to three significant figures.", value: fr, unit: "Hz", wrong: [fa], explanation: t`$f_o = \dfrac{560 \times 340}{340 + ${vs}} = ${sfStr(fr, 3)}\ \text{Hz}$.` }),
        P.num({ label: "(d)", marks: 2, stem: "Calculate the wavelength of the sound reaching her while the train approaches, in m, to three significant figures.", value: (v - vs) / fs, unit: "m", wrong: [v / fs], explanation: t`$\lambda' = \dfrac{v - v_s}{f_s} = \dfrac{${v - vs}}{560} = ${sfStr((v - vs) / fs, 3)}\ \text{m}$ (check: $340/${sfStr(fa, 4)}$).` }),
        P.num({ label: "(e)", marks: 1, stem: "She stands 20 m from the track. State the frequency she hears at the instant the train is closest to her, in Hz.", value: fs, unit: "Hz", wrong: [Math.round(fa)], explanation: "At closest approach the train's velocity is perpendicular to the line joining it to her, so there is no component towards her and no shift: 560 Hz." }),
        P.manual({ label: "(f)", marks: 1, stem: "Explain why the pitch she hears falls smoothly rather than suddenly as the train passes.", points: ["The component of the train's velocity along the line to her decreases gradually to zero and then reverses, so the shift changes gradually."], modelAnswer: "Because she is not on the track, the component of the train's velocity towards her falls gradually to zero and then becomes a velocity away from her, so the frequency changes smoothly." }),
      ]),
      explanation: "f₀ = fₛv/(v ∓ vₛ); λ' = (v − vₛ)/fₛ ahead of the source; only the velocity component along the line of sight matters.",
      hints: ["Approaching: v − vₛ.", "At closest approach, what is the velocity component towards her?"],
    });
  }
});
