// W4b: THEORY10 exam-format items. 4 ZIM (op-amp amplifier; logic control system; AM and FM; digital link over
// optical fibre) with applies ZIM, paper ZIMSEC P2; 2 CAM (stellar radius; PET) with applies CAM, paper Cambridge P4.
import { concept, P, t, chk, same, ZIM, CAM, DATA, EXAM, checkExam, sfStr, dpStr, sciTex, lg } from "../lib.mjs";

const A = (k) => `aphys.${k}`;
const { me, c, e, h, sigma } = DATA;

concept(A("electronics.op-amp-amplifiers"), { file: "exam/w4b-theory", keyPrefix: "exam.w4b-theory" }, (b) => {
  const plan = { examStyle: true, skill: EXAM.THEORY10.skill, secs: EXAM.THEORY10.secs, calculator: true };

  // T1 (ZIM): an inverting amplifier for a microphone signal.
  {
    const Rin = 3.9, Rf = 56, Vsat = 13.5, Vin = 0.45;
    const G = -Rf / Rin;
    const Vout = G * Vin;
    const vmax = Vsat / -G;
    b.struct({
      ...plan, d: 3, paper: "ZIMSEC P2", applies: ZIM,
      concepts: [A("electronics.op-amp-amplifiers"), A("electronics.op-amp-properties")],
      stem: t`An inverting amplifier for a microphone signal uses an op-amp powered from $\pm 15\ \text{V}$; its output saturates at $\pm 13.5\ \text{V}$. The input resistor is $3.9\ \text{k}\Omega$ and the feedback resistor is $56\ \text{k}\Omega$.`,
      parts: checkExam(EXAM.THEORY10, [
        P.manual({ label: "(a)", marks: 2, stem: "State two properties of an ideal op-amp and, for each, why it matters in this amplifier.", points: [
          "Infinite open-loop gain: V⁺ ≈ V⁻, so the inverting input is a virtual earth and the gain is set by the resistors only.",
          "Infinite input resistance: no current enters the inputs, so the current in R_in equals that in R_f (or zero output resistance: the output voltage does not depend on the load).",
        ], modelAnswer: "Its open-loop gain is infinite, so V⁺ and V⁻ are equal and the inverting input is a virtual earth, making the gain depend only on the resistors. Its input resistance is infinite, so no current enters the op-amp and the current in the input resistor all flows through the feedback resistor." }),
        P.num({ label: "(b)", marks: 1, stem: "Calculate the voltage gain, to three significant figures.", value: G, wrong: [-G], explanation: t`$G = -\dfrac{56}{3.9} = ${sfStr(G, 3).replace("-", "−")}$.` }),
        P.num({ label: "(c)", marks: 2, stem: t`Calculate the output voltage for an input of $+0.45\ \text{V}$, in V, to three significant figures.`, value: Vout, unit: "V", wrong: [-Vout, (1 + Rf / Rin) * Vin], explanation: t`$V_{\text{out}} = ${sfStr(G, 3).replace("-", "−")} \times 0.45 = ${sfStr(Vout, 3).replace("-", "−")}\ \text{V}$ (within the saturation limits).` }),
        P.num({ label: "(d)", marks: 2, stem: "Calculate the largest input voltage that can be amplified without the output saturating, in V, to three significant figures.", value: vmax, unit: "V", wrong: [15 / -G, Vsat * -G], explanation: t`$\dfrac{13.5}{${sfStr(-G, 3)}} = ${sfStr(vmax, 3)}\ \text{V}$.` }),
        P.manual({ label: "(e)", marks: 2, stem: "Explain why the inverting input is called a virtual earth.", points: [
          "The non-inverting input is at 0 V and the open-loop gain is very large, so V⁺ − V⁻ = V_out/A₀ ≈ 0.",
          "So the inverting input is held at (almost) 0 V by the feedback, although it is not connected to 0 V.",
        ], modelAnswer: "The non-inverting input is at 0 V, and with a very large open-loop gain the difference between the inputs, V_out/A₀, is tiny, so the inverting input sits at almost 0 V. It is held there by the feedback, not by a connection to 0 V." }),
        P.mcq({ label: "(f)", marks: 1, stem: "A sinusoidal input of peak 1.2 V is applied. Which describes the output?", options: [
          ["An inverted wave with its peaks clipped at ±13.5 V", "Correct: 1.2 V exceeds the largest unclipped input."],
          ["An inverted sine wave of peak 17 V", "The output cannot exceed the saturation voltage."],
          ["A sine wave in phase with the input, of peak 13.5 V", "The inverting amplifier's output is in antiphase and is clipped."],
          ["A constant output of −13.5 V", "The output follows the input except near the peaks."],
        ], answer: "A", explanation: t`$${sfStr(-G, 3)} \times 1.2 = ${sfStr(-G * 1.2, 3)}\ \text{V}$ would exceed 13.5 V, so the peaks are clipped.` }),
      ]),
      explanation: "G = −R_f/R_in; saturation limits the output; the inverting input is a virtual earth.",
      hints: ["Check every output against ±13.5 V.", "Use the two ideal-op-amp assumptions."],
    });
  }

  // T2 (ZIM): an irrigation controller using a sensor and logic gates.
  {
    const rows = [[0, 0], [0, 1], [1, 0], [1, 1]];
    const q = rows.map(([d, r]) => d & (1 - r));
    same(q, [0, 0, 1, 0]);
    const Rled = (5.0 - 2.0) / 0.010;
    b.struct({
      ...plan, d: 3, paper: "ZIMSEC P2", applies: ZIM,
      concepts: [A("electronics.logic-systems"), A("electronics.logic-gates"), A("electronics.sensors-output-devices")],
      stem: "A garden irrigation pump P near Chinhoyi must run when the soil is dry, but not while it is raining. A moisture sensor stage gives D = 1 when the soil is dry; a rain sensor stage gives R = 1 when it is raining. Both stages use a sensor in a potential divider feeding a comparator. The logic output (5.0 V for logic 1) drives an LED indicator and, through a relay, the pump.",
      parts: checkExam(EXAM.THEORY10, [
        P.manual({ label: "(a)", marks: 2, stem: "Explain how a sensor in a potential divider and a comparator can give a logic output that switches at a chosen level.", points: [
          "The sensor's resistance changes with the quantity, so the divider output voltage changes.",
          "The comparator compares this with a reference voltage (set with a variable resistor) and its output switches between two levels when the divider voltage crosses the reference.",
        ], modelAnswer: "The sensor's resistance changes with the quantity being sensed, so the potential divider's output voltage changes. A comparator compares this voltage with a reference set by a variable resistor, and its output switches from one level to the other when the divider voltage crosses the reference, giving logic 0 or 1." }),
        P.fib({
          label: "(b)", stem: "Complete the truth table for the pump P.",
          template: "DR = 00: P = {{blank:a}}; DR = 01: P = {{blank:b}}; DR = 10: P = {{blank:c}}; DR = 11: P = {{blank:d}}.",
          blanks: ["a", "b", "c", "d"].map((id, i) => ({ id, accepted: [String(q[i])], choices: ["0", "1"] })),
          explanation: "P = 1 only when the soil is dry (D = 1) and it is not raining (R = 0).",
        }),
        P.mcq({ label: "(c)", marks: 1, stem: "Which arrangement of gates gives P?", options: [
          ["R through a NOT gate, then its output and D into an AND gate", "Correct: P = D · R̄."],
          ["D and R both into a single two-input NOR gate", "NOR gives 1 only for D = R = 0: the pump would run only when the soil is wet."],
          ["D and R into an AND gate", "This runs the pump only when it is raining."],
          ["D through a NOT gate, then its output and R into an AND gate", "This gives D̄·R: the pump would run when the soil is wet and it is raining."],
        ], answer: "A", explanation: "'Dry and not raining' → D AND (NOT R)." }),
        P.num({ label: "(d)", marks: 2, stem: "The indicator LED needs 10 mA with 2.0 V across it. Calculate the resistance needed in series with it, in Ω.", value: Rled, unit: "Ω", wrong: [5.0 / 0.01], explanation: t`$R = \dfrac{5.0 - 2.0}{0.010} = ${Rled}\ \Omega$.` }),
        P.manual({ label: "(e)", marks: 1, stem: "Explain why a relay is needed to switch the pump.", points: ["The logic output can supply only a few milliamperes; the relay lets this small current switch the pump's large current in a separate (mains) circuit, isolating the electronics."], modelAnswer: "The logic output gives only a few milliamperes, while the pump needs a large current from its own supply; the relay lets the small current switch the pump circuit and keeps the two circuits isolated." }),
      ]),
      explanation: "P = D·R̄; sensors give logic inputs through comparators; LED resistor and relay at the output.",
      hints: ["'Not raining' means R̄."],
    });
  }

  // T3 (ZIM): an AM station and an FM station.
  {
    const fc = 702, fm = 4.0, band = 360;
    const k = 60 / 2.4;
    b.struct({
      ...plan, d: 3, paper: "ZIMSEC P2", applies: ZIM,
      concepts: [A("communication.modulation")],
      stem: t`A medium-wave AM station broadcasts on a carrier of $702\ \text{kHz}$ with audio frequencies up to $4.0\ \text{kHz}$. A VHF FM station's carrier frequency deviates by $60\ \text{kHz}$ when its input signal has a peak of $2.4\ \text{V}$.`,
      parts: checkExam(EXAM.THEORY10, [
        P.manual({ label: "(a)", marks: 1, stem: "State what is meant by amplitude modulation.", points: ["The amplitude of the carrier wave is varied in synchrony with the displacement of the information signal (carrier frequency constant)."], modelAnswer: "The amplitude of the carrier varies in step with the instantaneous value of the signal, while the carrier frequency stays constant." }),
        P.group({ label: "(b)", stem: "For a 4.0 kHz audio tone, calculate:", parts: [
          P.num({ label: "(i)", marks: 1, stem: "the lower side frequency, in kHz", value: fc - fm, unit: "kHz", wrong: [fc - 2 * fm], explanation: t`$702 - 4.0 = ${fc - fm}\ \text{kHz}$.` }),
          P.num({ label: "(ii)", marks: 1, stem: "the upper side frequency, in kHz", value: fc + fm, unit: "kHz", wrong: [fc + 2 * fm], explanation: t`$702 + 4.0 = ${fc + fm}\ \text{kHz}$.` }),
        ] }),
        P.num({ label: "(c)", marks: 2, stem: "Calculate how many such AM stations could share a waveband 360 kHz wide without overlapping.", value: band / (2 * fm), wrong: [band / fm], explanation: t`Bandwidth $= 2 \times 4.0 = 8.0\ \text{kHz}$; $\dfrac{360}{8.0} = ${band / (2 * fm)}$ stations.` }),
        P.num({ label: "(d)", marks: 2, stem: "Calculate the frequency deviation of the FM transmitter per volt of signal, in kHz V⁻¹.", value: k, wrong: [60 * 2.4], explanation: t`$\dfrac{60}{2.4} = ${k}\ \text{kHz V}^{-1}$; doubling the signal amplitude would double the deviation.` }),
        P.manual({ label: "(e)", marks: 2, stem: "Explain why FM reception is less noisy than AM reception.", points: [
          "Noise (electrical interference) mainly adds to the amplitude of the received wave.",
          "In FM the information is in the frequency, so the receiver can limit/ignore amplitude variations; in AM the amplitude carries the signal, so noise is heard.",
        ], modelAnswer: "Electrical noise mostly alters the amplitude of the received wave. In AM the amplitude carries the information, so the noise is reproduced; in FM the information is in the frequency, so the receiver can remove amplitude variations and the noise with them." }),
        P.manual({ label: "(f)", marks: 1, stem: "State one disadvantage of FM compared with AM.", points: [
          "Much larger bandwidth per station (fewer stations per waveband) / shorter range (VHF line of sight) / more complex, expensive equipment.",
        ], modelAnswer: "FM needs a much larger bandwidth for each station, so fewer stations fit into a waveband." }),
      ]),
      explanation: "AM: side frequencies f_c ± f_m, bandwidth 2f_m. FM: deviation ∝ signal amplitude.",
      hints: ["Bandwidth = 2f_m."],
    });
  }

  // T4 (ZIM): digitising speech and sending it along an optical fibre.
  {
    const fs = 9600, n = 12;
    const Pin = 1.8, a = 0.35, L = 40;
    const Pout = Pin * 10 ** (-(a * L) / 10);
    const maxLen = (10 * lg(1.8e-3 / 5.0e-7)) / a;
    b.struct({
      ...plan, d: 4, paper: "ZIMSEC P2", applies: ZIM,
      concepts: [A("communication.digital-signals"), A("communication.channels-attenuation")],
      stem: t`A telephone link digitises speech by sampling it 9600 times per second with 12 bits per sample, and sends it along an optical fibre of attenuation $0.35\ \text{dB km}^{-1}$. The transmitter launches $1.8\ \text{mW}$ into the fibre.`,
      parts: checkExam(EXAM.THEORY10, [
        P.num({ label: "(a)", marks: 1, stem: "Calculate the number of quantisation levels.", value: 2 ** n, wrong: [n * 2], explanation: t`$2^{12} = ${2 ** n}$.` }),
        P.num({ label: "(b)", marks: 2, stem: "Calculate the bit rate, in bits per second.", value: fs * n, unit: "bit/s", wrong: [fs], explanation: t`$9600 \times 12 = ${fs * n}\ \text{bit s}^{-1}$.` }),
        P.num({ label: "(c)", marks: 1, stem: "State the highest audio frequency that this sampling rate can reproduce, in Hz.", value: fs / 2, unit: "Hz", wrong: [fs], explanation: t`$f_{\max} = f_{\text{s}}/2 = ${fs / 2}\ \text{Hz}$.` }),
        P.num({ label: "(d)", marks: 2, stem: "Calculate the power reaching the end of a 40 km length of fibre, in mW, to three significant figures.", value: Pout, unit: "mW", wrong: [Pin - (a * L) / 10], explanation: t`Loss $= 0.35 \times 40 = 14\ \text{dB}$; $P = 1.8 \times 10^{-1.4} = ${sfStr(Pout, 3)}\ \text{mW}$.` }),
        P.num({ label: "(e)", marks: 2, stem: t`The receiver needs at least $0.50\ \mu\text{W}$. Calculate the maximum length of fibre between regenerators, in km, to three significant figures.`, value: maxLen, unit: "km", wrong: [(1.8e-3 / 5.0e-7) / a], explanation: t`Allowed loss $= 10\lg\dfrac{1.8 \times 10^{-3}}{5.0 \times 10^{-7}} = ${sfStr(maxLen * a, 3)}\ \text{dB}$; length $= \dfrac{${sfStr(maxLen * a, 3)}}{0.35} = ${sfStr(maxLen, 3)}\ \text{km}$.` }),
        P.manual({ label: "(f)", marks: 2, stem: "Explain why the signal is regenerated rather than simply amplified at intervals along the route.", points: [
          "Amplifiers boost the noise picked up as well as the signal, so noise builds up.",
          "A regenerator recognises each pulse as 1 or 0 and sends a new clean pulse, removing the noise.",
        ], modelAnswer: "An amplifier boosts the noise along with the signal, so noise accumulates along the route. A regenerator decides whether each pulse is a 1 or a 0 and transmits a fresh, clean pulse, so the noise is removed." }),
      ]),
      explanation: "Levels 2ⁿ; bit rate f_s × n; dB losses add; regeneration removes noise.",
      hints: ["dB loss = attenuation per km × length.", "f_s ≥ 2 f_max."],
    });
  }

  // T5 (CAM): the radius of a yellow-white star.
  {
    const W = 2.9e-3, lam = 4.5e-7, F = 6.2e-10, d = 2.2e17;
    const T = W / lam;
    const L = 4 * Math.PI * d * d * F;
    const r = Math.sqrt(L / (4 * Math.PI * sigma * T ** 4));
    b.struct({
      ...plan, d: 4, paper: "Cambridge P4", applies: CAM,
      concepts: [A("astro.stellar-radii"), A("astro.luminosity-standard-candles")],
      stem: t`The spectrum of a star peaks at a wavelength of $450\ \text{nm}$. The radiant flux intensity received from it at the Earth is $6.2 \times 10^{-10}\ \text{W m}^{-2}$, and its distance is $2.2 \times 10^{17}\ \text{m}$. Wien's displacement constant is $2.9 \times 10^{-3}\ \text{m K}$.`,
      parts: checkExam(EXAM.THEORY10, [
        P.manual({ label: "(a)", marks: 1, stem: "Define the luminosity of a star.", points: ["The total power of electromagnetic radiation emitted by the star."], modelAnswer: "Luminosity is the total power of electromagnetic radiation emitted by a star." }),
        P.num({ label: "(b)", marks: 2, stem: "Calculate the surface temperature of the star, in K, to two significant figures.", value: T, sf: 2, unit: "K", wrong: [W / 450], explanation: t`$T = \dfrac{2.9 \times 10^{-3}}{4.5 \times 10^{-7}} = ${sfStr(T, 2)}\ \text{K}$.` }),
        P.num({ label: "(c)", marks: 2, stem: "Calculate the luminosity of the star, in W, to two significant figures.", value: L, sf: 2, unit: "W", wrong: [F * d * d, Math.PI * d * d * F], explanation: t`$L = 4\pi d^{2}F = 4\pi(2.2 \times 10^{17})^{2} \times 6.2 \times 10^{-10} = ${sciTex(L, 2)}\ \text{W}$.` }),
        P.num({ label: "(d)", marks: 3, stem: "Calculate the radius of the star, in m, to two significant figures.", value: r, sf: 2, unit: "m", wrong: [r * r, Math.sqrt(L / (Math.PI * sigma * T ** 4))], explanation: t`$r = \sqrt{\dfrac{L}{4\pi\sigma T^{4}}} = \sqrt{\dfrac{${sciTex(L, 2)}}{4\pi \times 5.67 \times 10^{-8} \times ${sfStr(T, 3)}^{4}}} = ${sciTex(r, 2)}\ \text{m}$.` }),
        P.manual({ label: "(e)", marks: 2, stem: "This star and the Sun have similar luminosities. Using your answers, explain how their sizes compare.", points: [
          "The star is hotter than the Sun (about 6400 K against 5800 K), so each square metre radiates more (σT⁴).",
          "With similar L, L ∝ r²T⁴ means the hotter star must be smaller than the Sun (r ∝ 1/T²).",
        ], modelAnswer: "The star is hotter than the Sun, so each square metre of its surface radiates more power. Since L = 4πσr²T⁴ and the luminosities are similar, the hotter star must have a smaller surface area, so it is somewhat smaller than the Sun (r ∝ 1/T² for equal L)." }),
      ]),
      explanation: "Wien gives T; L = 4πd²F; Stefan-Boltzmann gives r.",
      hints: ["Find T, then L, then r = √(L/4πσT⁴)."],
    });
    chk(T > 6000 ? 1 : 0, 1);
  }

  // T6 (CAM): PET scanning.
  {
    const Eg = me * c * c;
    const lam = (h * c) / Eg;
    const dt = 0.6e-9;
    const x = (c * dt) / 2;
    b.struct({
      ...plan, d: 4, paper: "Cambridge P4", applies: CAM,
      concepts: [A("medical.pet")],
      stem: "A hospital PET scanner is used to locate a tumour. The patient is injected with a glucose-like compound containing a β⁺-emitting isotope, and lies inside a ring of gamma-ray detectors.",
      parts: checkExam(EXAM.THEORY10, [
        P.manual({ label: "(a)", marks: 2, stem: "Explain what is meant by a tracer and why the isotope must emit β⁺ particles.", points: [
          "A tracer is a substance containing radioactive nuclei introduced into the body and absorbed by the tissue being studied.",
          "β⁺ particles (positrons) annihilate with electrons, producing gamma photons that leave the body and can be detected.",
        ], modelAnswer: "A tracer is a compound containing radioactive nuclei which is put into the body and absorbed by the tissue being studied. The isotope must emit positrons, which annihilate with electrons to produce gamma photons that escape from the body to the detectors." }),
        P.num({ label: "(b)", marks: 2, stem: "Calculate the energy of each photon produced when a positron and an electron annihilate at rest, in MeV, to three significant figures.", value: Eg / e / 1e6, unit: "MeV", wrong: [(2 * Eg) / e / 1e6], explanation: t`$m_ec^2 = ${sciTex(Eg)}\ \text{J} = ${sfStr(Eg / e / 1e6, 3)}\ \text{MeV}$.` }),
        P.num({ label: "(c)", marks: 2, stem: "Calculate the wavelength of each photon, in pm, to three significant figures.", value: lam * 1e12, unit: "pm", wrong: [((h * c) / (2 * Eg)) * 1e12], explanation: t`$\lambda = \dfrac{hc}{E} = \dfrac{6.63 \times 10^{-34} \times 3.00 \times 10^{8}}{${sciTex(Eg)}} = ${sfStr(lam * 1e12, 3)}\ \text{pm}$.` }),
        P.manual({ label: "(d)", marks: 2, stem: "Explain why the two photons travel in opposite directions.", points: [
          "The positron and electron are (almost) at rest, so the total momentum before annihilation is zero.",
          "Momentum is conserved, so the photons' momenta must be equal and opposite: they move in opposite directions.",
        ], modelAnswer: "Before annihilation the total momentum is almost zero. Momentum is conserved, so the two photons must have equal and opposite momenta and therefore travel in opposite directions." }),
        P.num({ label: "(e)", marks: 2, stem: t`For one annihilation, the photons reach two opposite detectors $0.60\ \text{ns}$ apart. Calculate how far the annihilation was from the midpoint of the line joining the detectors, in cm.`, value: x * 100, unit: "cm", wrong: [c * dt * 100], explanation: t`$x = \dfrac{c\Delta t}{2} = \dfrac{3.00 \times 10^{8} \times 0.60 \times 10^{-9}}{2} = ${sfStr(x * 100, 2)}\ \text{cm}$.` }),
      ]),
      explanation: "Tracer with a β⁺ emitter; annihilation gives two 0.51 MeV photons back to back; x = cΔt/2.",
      hints: ["Each photon has energy m_e c².", "The path difference is 2x."],
    });
  }
});
