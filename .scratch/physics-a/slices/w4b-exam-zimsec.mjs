// W4b: ZIMSEC Paper 3 free-response items (format assumed, see BRIEF): op-amps and sensors; modulation and
// communication channels; logic systems and digital signals. All applies ZIM.
import { concept, P, t, chk, same, ZIM, EXAM, checkExam, sfStr, sciTex, lg } from "../lib.mjs";

const A = (k) => `aphys.${k}`;

concept(A("electronics.op-amp-amplifiers"), { file: "exam/w4b-zimsec", keyPrefix: "exam.w4b-zimsec", applies: ZIM }, (b) => {
  const plan = { examStyle: true, skill: EXAM.ZIM_P3_FREE.skill, secs: EXAM.ZIM_P3_FREE.secs, applies: EXAM.ZIM_P3_FREE.applies, paper: "ZIMSEC P3", calculator: true };

  // Z1: op-amps, feedback and a comparator.
  {
    const Vin = 0.024, target = 4.8, R1 = 1.0;
    const G = target / Vin;
    const Rf = (G - 1) * R1;
    const G2 = 1 + 200 / R1;
    const bw = 1.0e6 / G2 / 1000;
    const Vref = (10 * 27) / 60;
    const Rsw = (5.6 * (10 - Vref)) / Vref;
    const Vp5 = (10 * 5.6) / (9.1 + 5.6);
    const Rled = (10 - 1.9) / 0.02;
    chk(Vp5 < Vref ? 1 : 0, 1);
    b.struct({
      ...plan, d: 5,
      concepts: [A("electronics.op-amp-amplifiers"), A("electronics.op-amp-properties"), A("electronics.sensors-output-devices")],
      stem: t`Part 1: a load cell on a weighbridge gives an output from 0 to $24\ \text{mV}$, which must be amplified to 0 to $4.8\ \text{V}$ by a non-inverting amplifier with $R_1 = 1.0\ \text{k}\Omega$, using an op-amp with a gain-bandwidth product of $1.0\ \text{MHz}$.

Part 2: an overheat warning uses an op-amp comparator powered from $\pm 10\ \text{V}$ (saturating at $\pm 10\ \text{V}$). The inverting input is connected to the junction of a $33\ \text{k}\Omega$ resistor (to $+10\ \text{V}$) and a $27\ \text{k}\Omega$ resistor (to 0 V). The non-inverting input is connected to the junction of an NTC thermistor (to $+10\ \text{V}$) and a $5.6\ \text{k}\Omega$ resistor (to 0 V). A red LED and series resistor are connected from the output to 0 V.`,
      parts: checkExam(EXAM.ZIM_P3_FREE, [
        P.manual({ label: "(a)", marks: 5, stem: "State the properties of an ideal operational amplifier, and explain what is meant by negative feedback and two of its effects on an amplifier.", points: [
          "Infinite open-loop gain and infinite input resistance.",
          "Zero output resistance; infinite bandwidth and slew rate.",
          "Negative feedback: a fraction of the output is returned to the inverting input, opposing the change that produced it.",
          "Effect: gain reduced but stable and set by resistor values (independent of A₀).",
          "Effect: bandwidth increased (gain × bandwidth constant) / less distortion.",
        ], modelAnswer: "An ideal op-amp has infinite open-loop gain, infinite input resistance, zero output resistance, and infinite bandwidth and slew rate. Negative feedback means returning a fraction of the output voltage to the inverting input, so that it opposes the change that caused it. It reduces the gain, but makes it stable and fixed by resistor values instead of by A₀, and it increases the bandwidth, since gain × bandwidth is roughly constant, while also reducing distortion." }),
        P.manual({ label: "(b)", marks: 5, stem: t`Describe the circuit of a non-inverting amplifier and derive the expression $G = 1 + R_f/R_1$ for its gain.`, points: [
          "Input to the non-inverting input; R_f from output to inverting input; R₁ from inverting input to 0 V.",
          "No current enters the inverting input, so R_f and R₁ form a potential divider: V⁻ = V_out R₁/(R₁ + R_f).",
          "Very large A₀ and output not saturated, so V⁻ ≈ V⁺.",
          "V⁺ = V_in, so V_in = V_out R₁/(R₁ + R_f).",
          "G = V_out/V_in = (R₁ + R_f)/R₁ = 1 + R_f/R₁.",
        ], modelAnswer: "The input is applied to the non-inverting input. R_f connects the output to the inverting input and R₁ connects the inverting input to 0 V. Because no current enters the op-amp, R_f and R₁ form a potential divider across the output, so V⁻ = V_out R₁/(R₁ + R_f). The open-loop gain is very large and the output is not saturated, so V⁻ ≈ V⁺ = V_in. Hence V_in = V_out R₁/(R₁ + R_f) and G = (R₁ + R_f)/R₁ = 1 + R_f/R₁." }),
        P.group({ label: "(c)", stem: "For the load-cell amplifier in Part 1:", parts: [
          P.num({ label: "(i)", marks: 1, stem: "calculate the gain needed", value: G, wrong: [Vin / target], explanation: t`$\dfrac{4.8}{0.024} = ${G}$.` }),
          P.num({ label: "(ii)", marks: 2, stem: "calculate the value of R_f needed, in kΩ", value: Rf, unit: "kΩ", wrong: [G * R1], explanation: t`$R_f = (G - 1)R_1 = ${Rf}\ \text{k}\Omega$.` }),
          P.num({ label: "(iii)", marks: 2, stem: t`with the standard value $R_f = 200\ \text{k}\Omega$, estimate the bandwidth of the amplifier, in kHz, to two significant figures`, value: bw, sf: 2, unit: "kHz", wrong: [(1.0e6 * G2) / 1000], explanation: t`$G = 1 + 200 = ${G2}$; bandwidth $\approx \dfrac{1.0 \times 10^{6}}{${G2}} = ${sfStr(bw, 2)}\ \text{kHz}$.` }),
        ] }),
        P.group({ label: "(d)", stem: "For the comparator in Part 2:", parts: [
          P.num({ label: "(i)", marks: 2, stem: "calculate the thermistor resistance at which the output switches, in kΩ, to three significant figures", value: Rsw, unit: "kΩ", wrong: [(5.6 * Vref) / (10 - Vref)], explanation: t`$V^{-} = 10 \times \dfrac{27}{60} = ${sfStr(Vref, 2)}\ \text{V}$; switching when $10 \times \dfrac{5.6}{R + 5.6} = ${sfStr(Vref, 2)}$, so $R = 5.6 \times \dfrac{10 - 4.5}{4.5} = ${sfStr(Rsw, 3)}\ \text{k}\Omega$.` }),
          P.num({ label: "(ii)", marks: 1, stem: t`state the output voltage, in V, when the thermistor's resistance is $9.1\ \text{k}\Omega$`, value: -10, unit: "V", wrong: [10], explanation: t`$V^{+} = 10 \times \dfrac{5.6}{14.7} = ${sfStr(Vp5, 3)}\ \text{V} < 4.5\ \text{V}$, so the output is at $-10\ \text{V}$ (LED off).` }),
          P.num({ label: "(iii)", marks: 2, stem: "calculate the series resistance for an LED that needs 20 mA with 1.9 V across it, in Ω", value: Rled, unit: "Ω", wrong: [10 / 0.02], explanation: t`$R = \dfrac{10 - 1.9}{0.020} = ${sfStr(Rled, 3)}\ \Omega$.` }),
        ] }),
      ]),
      explanation: "Non-inverting gain 1 + R_f/R₁; gain × bandwidth ≈ constant; comparator switches when the divider voltages are equal.",
      hints: ["R_f = (G − 1)R₁.", "Find the reference voltage first."],
    });
  }

  // Z2: modulation and communication channels.
  {
    const fc = 909, fm = 4.5;
    const nLW = (279 - 153) / (2 * fm);
    const loss = 10 * lg(20 / 5.0e-14);
    const delay = 3.6e7 / 3.0e8;
    const net = -(6.0 * 3.0) + 20;
    const Pout = 2.5 * 10 ** (net / 10);
    same(nLW, 14);
    b.struct({
      ...plan, d: 4,
      concepts: [A("communication.modulation"), A("communication.channels-attenuation")],
      stem: t`Part 1: a medium-wave station broadcasts by amplitude modulation on a carrier of $909\ \text{kHz}$, with audio frequencies up to $4.5\ \text{kHz}$.

Part 2: a geostationary satellite $3.6 \times 10^{7}\ \text{m}$ above the equator transmits $20\ \text{W}$ on its downlink; a ground station directly below receives $5.0 \times 10^{-14}\ \text{W}$. The ground station is joined to an exchange by $3.0\ \text{km}$ of coaxial cable of attenuation $6.0\ \text{dB km}^{-1}$, followed by an amplifier of gain $20\ \text{dB}$.`,
      parts: checkExam(EXAM.ZIM_P3_FREE, [
        P.manual({ label: "(a)", marks: 5, stem: "Explain why information is transmitted on a carrier wave, and describe amplitude modulation and frequency modulation.", points: [
          "Audio-frequency waves have very long wavelengths, so aerials would be impractically long; a high-frequency carrier needs a short aerial.",
          "Each station uses a different carrier frequency so receivers can tune to one station without interference.",
          "AM: the amplitude of the carrier varies in synchrony with the signal's displacement.",
          "AM: the carrier frequency is constant.",
          "FM: the carrier frequency varies with the signal's displacement (deviation ∝ signal amplitude, rate = signal frequency) while the amplitude is constant.",
        ], modelAnswer: "Audio signals have wavelengths of many kilometres, so they would need impossibly long aerials, and if every station sent audio directly they would all interfere; giving each station its own high-frequency carrier solves both problems and lets a receiver tune to one station. In amplitude modulation the carrier's amplitude varies in step with the signal's displacement while its frequency stays constant. In frequency modulation the carrier's frequency varies in step with the signal, the size of the deviation depending on the signal amplitude and its rate on the signal frequency, while the carrier amplitude stays constant." }),
        P.manual({ label: "(b)", marks: 5, stem: "Describe how radio waves of different frequencies travel from transmitter to receiver, and explain why satellite links use microwaves with different uplink and downlink frequencies.", points: [
          "Surface (ground) waves, below about 3 MHz, follow the curvature of the Earth.",
          "Sky waves, about 3-30 MHz, are reflected by the ionosphere.",
          "Space waves, above about 30 MHz, pass through the ionosphere and travel in straight lines (line of sight).",
          "Satellites use microwaves because they pass through the ionosphere and can be focused into narrow beams by dishes.",
          "Uplink and downlink frequencies differ so the satellite's strong transmission does not swamp the very weak signal it receives.",
        ], modelAnswer: "Below about 3 MHz, surface waves follow the curvature of the Earth; between about 3 and 30 MHz, sky waves are reflected by the ionosphere; above about 30 MHz, space waves pass through the ionosphere in straight lines. Satellite links therefore use microwaves, which pass through the ionosphere and can be focused into narrow beams by dish aerials. The uplink and downlink use different frequencies so that the satellite's powerful transmission does not swamp the very weak signal it is receiving." }),
        P.group({ label: "(c)", stem: "For the AM station in Part 1, calculate:", parts: [
          P.num({ label: "(i)", marks: 1, stem: "the lowest frequency transmitted, in kHz", value: fc - fm, dp: 1, unit: "kHz", wrong: [fc - 2 * fm], explanation: t`$909 - 4.5 = ${fc - fm}\ \text{kHz}$.` }),
          P.num({ label: "(ii)", marks: 1, stem: "the highest frequency transmitted, in kHz", value: fc + fm, dp: 1, unit: "kHz", wrong: [fc + 2 * fm], explanation: t`$909 + 4.5 = ${fc + fm}\ \text{kHz}$.` }),
          P.num({ label: "(iii)", marks: 1, stem: "the bandwidth, in kHz", value: 2 * fm, unit: "kHz", wrong: [fm], explanation: t`$2 \times 4.5 = ${2 * fm}\ \text{kHz}$.` }),
          P.num({ label: "(iv)", marks: 2, stem: "the number of stations of this bandwidth that fit in a long-wave band from 153 kHz to 279 kHz", value: nLW, wrong: [(279 - 153) / fm], explanation: t`$\dfrac{279 - 153}{9.0} = ${nLW}$.` }),
        ] }),
        P.group({ label: "(d)", stem: "For the satellite link in Part 2, calculate:", parts: [
          P.num({ label: "(i)", marks: 2, stem: "the loss between the satellite and the ground station, in dB, to three significant figures", value: loss, unit: "dB", wrong: [20 / 5.0e-14], explanation: t`$10\lg\dfrac{20}{5.0 \times 10^{-14}} = ${sfStr(loss, 3)}\ \text{dB}$.` }),
          P.num({ label: "(ii)", marks: 1, stem: "the time for the signal to travel down from the satellite, in s", value: delay, unit: "s", wrong: [2 * delay], explanation: t`$\dfrac{3.6 \times 10^{7}}{3.0 \times 10^{8}} = ${delay}\ \text{s}$.` }),
          P.num({ label: "(iii)", marks: 2, stem: "the power leaving the amplifier when 2.5 mW enters the coaxial cable, in mW, to three significant figures", value: Pout, unit: "mW", wrong: [2.5 * 10 ** (-(6.0 * 3.0 + 20) / 10)], explanation: t`Cable loss $= 6.0 \times 3.0 = 18\ \text{dB}$; net change $= -18 + 20 = +2\ \text{dB}$; $P = 2.5 \times 10^{0.2} = ${sfStr(Pout, 3)}\ \text{mW}$.` }),
        ] }),
      ]),
      explanation: "AM side frequencies f_c ± f_m; dB losses and gains add.",
      hints: ["Bandwidth = 2f_m.", "Add the decibel changes, then undo the logarithm."],
    });
  }

  // Z3: logic systems and digital conversion.
  {
    const step = 0.4;
    const lvl = Math.round(3.3 / step);
    const code = lvl.toString(2).padStart(4, "0");
    same(code, "1000");
    const dac = parseInt("1011", 2) * step;
    const rate = 32000 * 14 * 2;
    const bits = rate * 180;
    b.struct({
      ...plan, d: 4,
      concepts: [A("electronics.logic-systems"), A("electronics.logic-gates"), A("communication.digital-signals")],
      stem: t`Part 1: a maize mill's motor must run only when the start switch is on, the safety guard is closed and the motor is not overheated.

Part 2: a 4-bit analogue-to-digital converter has levels $0.40\ \text{V}$ apart (0000 = 0 V, 1111 = 6.0 V) and rounds each sample to the nearest level. A music recorder samples each of two stereo channels 32 000 times per second with 14 bits per sample.`,
      parts: checkExam(EXAM.ZIM_P3_FREE, [
        P.manual({ label: "(a)", marks: 5, stem: "Define: (i) a logic gate, (ii) a truth table, (iii) a digital signal, (iv) sampling, (v) a bistable.", points: [
          "Logic gate: a circuit whose digital output depends only on the present states of its inputs according to a fixed rule.",
          "Truth table: a list of every combination of input states with the corresponding output.",
          "Digital signal: a signal with only discrete values (two levels, 1 and 0).",
          "Sampling: measuring an analogue signal at regular time intervals.",
          "Bistable: a circuit with two stable states that holds the state last set (a one-bit memory).",
        ], modelAnswer: "(i) A logic gate is a circuit whose digital output depends only on the present states of its inputs according to a fixed rule. (ii) A truth table lists every possible combination of inputs with the output for each. (iii) A digital signal takes only discrete values, in logic just 1 and 0. (iv) Sampling is measuring the value of an analogue signal at regular intervals of time. (v) A bistable is a circuit with two stable output states that stays in the state it was last set to, storing one bit." }),
        P.manual({ label: "(b)", marks: 5, stem: "Design the logic system for the maize mill motor in Part 1: define the inputs, give a Boolean expression, describe the gates, and explain how the overheating input and the output stage work.", points: [
          "Inputs: S = 1 start on, G = 1 guard closed, H = 1 overheated; output M = 1 motor runs.",
          t`$M = S \cdot G \cdot \overline{H}$.`,
          "H through a NOT gate; S, G and H̄ into a three-input AND gate (or two two-input AND gates).",
          "H from a thermistor on the motor in a potential divider feeding a comparator set (variable resistor) to switch at the safe temperature.",
          "Output drives a relay (with protective diode) that switches the motor's high-current supply.",
        ], modelAnswer: "Let S = 1 when the start switch is on, G = 1 when the guard is closed and H = 1 when the motor is overheated; M = 1 means the motor runs. Then M = S·G·H̄: H passes through a NOT gate, and S, G and H̄ go into an AND gate (or two two-input AND gates). H comes from a thermistor on the motor casing in a potential divider whose output goes to a comparator, with a variable resistor setting the switching temperature. The AND gate's output drives a relay, with a diode across its coil, which switches the motor's high-current supply." }),
        P.group({ label: "(c)", stem: "For the ADC in Part 2:", parts: [
          P.num({ label: "(i)", marks: 1, stem: "state the number of quantisation levels", value: 16, wrong: [15, 4], explanation: "2⁴ = 16." }),
          P.short({ label: "(ii)", marks: 2, stem: "write the code produced for a sample of 3.3 V", accepted: [code], explanation: t`$3.3/0.40 = 8.25$ → level 8 → ${code}.` }),
          P.num({ label: "(iii)", marks: 2, stem: "calculate the voltage that a matching DAC outputs for the code 1011, in V, to two significant figures", value: dac, sf: 2, unit: "V", wrong: [1011 * step], explanation: t`1011 = 8 + 2 + 1 = 11; $11 \times 0.40 = ${sfStr(dac, 2)}\ \text{V}$.` }),
        ] }),
        P.group({ label: "(d)", stem: "For the music recorder in Part 2:", parts: [
          P.num({ label: "(i)", marks: 2, stem: "calculate the total bit rate for both channels, in bits per second", value: rate, unit: "bit/s", wrong: [rate / 2], explanation: t`$32\,000 \times 14 \times 2 = ${rate}\ \text{bit s}^{-1}$.` }),
          P.num({ label: "(ii)", marks: 1, stem: "state the highest audio frequency it can record, in kHz", value: 16, unit: "kHz", wrong: [32], explanation: "Half the sampling rate: 32/2 = 16 kHz." }),
          P.num({ label: "(iii)", marks: 2, stem: "calculate the number of bits needed to store 3.0 minutes of music, to three significant figures", value: bits, wrong: [rate * 3], explanation: t`$${rate} \times 180 = ${sciTex(bits, 3)}$ bits.` }),
        ] }),
      ]),
      explanation: "M = S·G·H̄; ADC: level = sample/step, code in binary; bit rate = f_s × n × channels.",
      hints: ["n bits give 2ⁿ levels.", "Convert minutes to seconds."],
    });
  }
});
