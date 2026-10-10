// W4b: aphys.communication.channels-attenuation (ZIMSEC only) — wire pairs, coaxial cable, radio (surface, sky, space
// waves), microwave links, satellites, optical fibres; attenuation in dB, dB/km, signal-to-noise ratio; cellular network.
import { concept, P, t, chk, sfStr, dpStr, sciTex, lg, pctUnc, DATA } from "../lib.mjs";

const dB = (p1, p2) => 10 * lg(p1 / p2);

concept("aphys.communication.channels-attenuation", { file: "communication/channels-attenuation", keyPrefix: "communication.channels-attenuation" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Why does a coaxial cable pick up much less electrical interference than a pair of wires?",
    options: [
      ["Its braided outer conductor screens the central conductor.", "Correct: the earthed screen shields the core from external fields."],
      ["Its central conductor is made of glass.", "That is an optical fibre; a coaxial cable has a copper core."],
      ["It carries signals at a lower frequency.", "Coaxial cable carries higher frequencies than a wire pair."],
      ["Its plastic insulation is much thicker than that of an ordinary wire pair.", "Thicker insulation alone does not block interference; the conducting screen does."],
    ],
    answer: "A",
    explanation: "The braided screen surrounds the core, reducing interference and cross-talk.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "A signal is attenuated by 20 dB. By what factor has its power decreased?",
    options: [
      ["100", "Correct: 20 = 10 lg(ratio), so the ratio is 10²."],
      ["20", "Decibels are logarithmic: 20 dB is not a factor of 20."],
      ["2", "A factor of 2 is about 3 dB."],
      ["10", "A factor of 10 is 10 dB."],
    ],
    answer: "A",
    explanation: "10 lg(P₁/P₂) = 20 → P₁/P₂ = 10² = 100.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why are microwaves used for communication with satellites?",
    options: [
      ["They pass through the ionosphere and can be focused into narrow beams.", "Correct: space waves go straight through; dishes focus short wavelengths well."],
      ["They are reflected by the ionosphere, so they reach beyond the horizon.", "That is true of short waves (3-30 MHz), which could not reach the satellite."],
      ["They follow the curvature of the Earth's surface as ground waves.", "Surface waves are low-frequency (LW and MW)."],
      ["They travel faster than other radio waves.", "All electromagnetic waves travel at the same speed in a vacuum."],
    ],
    answer: "A",
    explanation: "Above about 30 MHz waves pass through the ionosphere; at GHz frequencies dishes give narrow, strong beams.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "What is the orbital period of a geostationary satellite?",
    options: [
      ["24 hours", "Correct: it matches the Earth's rotation, so it stays above one point."],
      ["12 hours", "A 12-hour orbit would move across the sky."],
      ["About 90 minutes", "This is typical of low (polar) orbits."],
      ["27 days", "This is about the Moon's orbital period."],
    ],
    answer: "A",
    explanation: "Period 24 h, equatorial orbit, west to east.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why does a communications satellite receive on one frequency (the uplink) and transmit on a different one (the downlink)?",
    options: [
      ["So that its powerful transmitted signal does not swamp the very weak signal it receives.", "Correct: different frequencies keep the two signals separate."],
      ["Because the ionosphere reflects the uplink frequency.", "Both frequencies are microwaves that pass through the ionosphere."],
      ["Because the satellite's orbital speed Doppler-shifts every received frequency by a large amount.", "A geostationary satellite has no motion relative to the ground station."],
      ["Because higher frequencies travel faster downwards.", "All frequencies travel at the same speed."],
    ],
    answer: "A",
    explanation: "The received signal is tiny; if the satellite transmitted on the same frequency, its own output would drown it.",
    hints: ["Compare the power transmitted with the power received."],
  });
  b.mcq({
    d: 3, skill: "EVALUATION",
    stem: "Why are polar-orbit satellites, rather than geostationary ones, used to photograph the whole of the Earth's surface in detail?",
    options: [
      ["They orbit much lower and, as the Earth turns beneath them, pass over every region.", "Correct: low height gives detail; polar orbits cover the whole globe."],
      ["They stay above one point, so a fixed camera can be used.", "That describes a geostationary satellite, which sees only one hemisphere-sized region."],
      ["They are much further from the Earth than geostationary satellites, so they see more of it at once.", "Polar satellites are much closer, which gives more detail."],
      ["They need no tracking by ground stations.", "Polar satellites move across the sky and must be tracked."],
    ],
    answer: "A",
    explanation: "Low polar orbits: high resolution and full coverage over many orbits.",
    hints: ["Think about height and coverage."],
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which statement about optical fibres compared with copper cables is correct?",
    options: [
      ["They have a larger bandwidth and are not affected by electromagnetic interference.", "Correct: light signals at very high frequency are immune to electrical interference."],
      ["They have a larger attenuation, so regenerators must be closer together.", "Fibres have a much lower attenuation, so regenerators are further apart."],
      ["They are easier to tap without detection, so they are less secure.", "Tapping a fibre is very difficult, so fibres are more secure."],
      ["They carry electric currents, so they need good insulation.", "Fibres carry light, not current."],
    ],
    answer: "A",
    explanation: "Fibres: huge bandwidth, low attenuation, no interference or cross-talk, secure, light.",
    hints: ["Fibres carry light, not electric current."],
  });
  {
    const net = 30 - 45;
    const frac = 10 ** (net / 10);
    b.mcq({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: "A signal passes through a cable section with a loss of 45 dB and then an amplifier with a gain of 30 dB. What fraction of the original power is left?",
      options: [
        [`${sfStr(frac * 100, 2)}%`, "Correct: net loss 15 dB, ratio 10^−1.5."],
        [`${sfStr((30 / 45) * 100, 2)}%`, "Decibels are not a simple ratio of powers."],
        ["15%", "15 is the net loss in decibels, not a percentage."],
        [`${sfStr(10 ** (-75 / 10) * 100, 2)}%`, "The gain should be subtracted from the loss, not added to it."],
      ],
      answer: "A",
      explanation: t`Net change $= -45 + 30 = -15\ \text{dB}$; fraction $= 10^{-1.5} = ${sfStr(frac, 2)}$, or $${sfStr(frac * 100, 2)}\%$.`,
      hints: ["Decibel gains and losses add."],
    });
  }
  b.num({
    d: 2, skill: "APPLICATION", calculator: true, daily: true,
    stem: t`A signal of $80\ \text{mW}$ enters a cable and $2.0\ \text{mW}$ leaves it. Calculate the attenuation, in dB, to three significant figures.`,
    value: dB(80, 2.0), unit: "dB", wrong: [80 / 2.0, 20 * lg(40)],
    explanation: t`$10\lg\!\left(\dfrac{80}{2.0}\right) = 10\lg 40 = ${sfStr(dB(80, 2.0), 3)}\ \text{dB}$. Using 20 lg is for voltage ratios.`,
  });
  {
    const L = 12, a = dB(40, 0.5) / L;
    b.num({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A $12\ \text{km}$ copper cable receives $40\ \text{mW}$ and delivers $0.50\ \text{mW}$. Calculate its attenuation per unit length, in $\text{dB km}^{-1}$, to three significant figures.`,
      value: a, unit: "dB/km", wrong: [(40 / 0.5) / L, dB(40, 0.5)],
      explanation: t`Loss $= 10\lg\dfrac{40}{0.50} = ${sfStr(dB(40, 0.5), 3)}\ \text{dB}$; per km $= \dfrac{${sfStr(dB(40, 0.5), 3)}}{12} = ${sfStr(a, 3)}\ \text{dB km}^{-1}$.`,
      hints: ["Find the total loss in dB first."],
    });
  }
  {
    const Pin = 2.5, a = 0.2, L = 85;
    const Pout = Pin * 10 ** (-(a * L) / 10);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`An optical fibre has an attenuation of $0.20\ \text{dB km}^{-1}$. A $2.5\ \text{mW}$ signal enters an $85\ \text{km}$ length. Calculate the output power, in mW, to three significant figures.`,
      value: Pout, unit: "mW", wrong: [Pin - a * L / 10, Pin / (a * L)],
      explanation: t`1. Loss $= 0.20 \times 85 = ${sfStr(a * L, 2)}\ \text{dB}$.
2. $\dfrac{P_{\text{in}}}{P_{\text{out}}} = 10^{${dpStr((a * L) / 10, 1)}} = ${sfStr(10 ** ((a * L) / 10), 3)}$.
3. $P_{\text{out}} = \dfrac{2.5}{${sfStr(10 ** ((a * L) / 10), 3)}} = ${sfStr(Pout, 3)}\ \text{mW}$.`,
      hints: ["Total dB = dB per km × length; then undo the logarithm."],
    });
  }
  {
    const S = 1.5e-6, N = 3.0e-9;
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`At a receiver the signal power is $1.5\ \mu\text{W}$ and the noise power is $3.0\ \text{nW}$. Calculate the signal-to-noise ratio, in dB, to three significant figures.`,
      value: dB(S, N), unit: "dB", wrong: [S / N, 10 * lg(S / 3.0e-6)],
      explanation: t`1. $\dfrac{S}{N} = \dfrac{1.5 \times 10^{-6}}{3.0 \times 10^{-9}} = ${sfStr(S / N, 3)}$.
2. In decibels: $10\lg ${sfStr(S / N, 3)} = ${sfStr(dB(S, N), 3)}\ \text{dB}$.`,
      hints: ["Convert both powers to watts."],
    });
  }
  {
    const Pin = 25e-3, a = 3.5, N = 2.0e-9, snr = 30;
    const Smin = N * 10 ** (snr / 10);
    const loss = dB(Pin, Smin);
    const L = loss / a;
    b.calc({
      d: 5, skill: "ANALYSIS", calculator: true,
      stem: t`A $25\ \text{mW}$ signal enters a cable of attenuation $3.5\ \text{dB km}^{-1}$. The noise power at the receiving end is $2.0\ \text{nW}$, and the signal-to-noise ratio there must be at least $30\ \text{dB}$. Calculate the maximum length of cable, in km, to three significant figures.`,
      value: L, unit: "km", wrong: [dB(Pin, N) / a, (dB(Pin, N) - snr) / a / 10],
      explanation: t`1. Minimum signal: $10\lg\dfrac{P}{2.0 \times 10^{-9}} = 30$, so $P = 2.0 \times 10^{-9} \times 10^{3} = ${sciTex(Smin, 2)}\ \text{W}$.
2. Allowed loss $= 10\lg\dfrac{25 \times 10^{-3}}{${sciTex(Smin, 2)}} = ${sfStr(loss, 3)}\ \text{dB}$.
3. Length $= \dfrac{${sfStr(loss, 3)}}{3.5} = ${sfStr(L, 3)}\ \text{km}$. Forgetting the 30 dB margin gives a length far too long.`,
      hints: ["Find the smallest acceptable signal power first."],
    });
  }
  {
    const Pin = 10.0, dPin = 0.1, Pout = 1.2, dPout = 0.05;
    const pct = pctUnc(dPin, Pin) + pctUnc(dPout, Pout);
    b.num({
      d: 4, skill: "EVALUATION", calculator: true,
      stem: t`To measure the loss in a length of cable, Nyasha measures the input power as $10.0 \pm 0.1\ \text{mW}$ and the output power as $1.20 \pm 0.05\ \text{mW}$. Calculate the percentage uncertainty in the power ratio $P_{\text{in}}/P_{\text{out}}$, in %, to two significant figures.`,
      value: pct, sf: 2, unit: "%", wrong: [pctUnc(dPout, Pout), pctUnc(dPin + dPout, Pin)],
      explanation: t`For a quotient, percentage uncertainties add: $\dfrac{0.1}{10.0} \times 100 + \dfrac{0.05}{1.20} \times 100 = ${sfStr(pctUnc(dPin, Pin), 2)} + ${sfStr(pctUnc(dPout, Pout), 2)} = ${sfStr(pct, 2)}\%$. The small output reading dominates; a longer cable would not help, but a more sensitive meter would.`,
      hints: ["Add the percentage uncertainties of the two powers."],
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "When a signal passes through several sections of cable in turn, the total loss in decibels is the sum of the losses of the sections.",
    answer: true,
    explanation: "True. Power ratios multiply, so their logarithms (decibels) add.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each channel with the property that best describes it.",
    pairs: [
      ["Twisted wire pair", "Cheap but low bandwidth, suffers cross-talk"],
      ["Coaxial cable", "Screened copper cable for higher frequencies"],
      ["Optical fibre", "Very large bandwidth, immune to electrical interference"],
      ["Microwave link", "Line-of-sight beams between dishes on towers"],
      ["Geostationary satellite", "Fixed dishes, delay of about a quarter of a second"],
    ],
    explanation: "Each channel has its own balance of bandwidth, noise, range and cost.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the description of radio-wave propagation.",
    template: "Below about 3 MHz, {{blank:a}} waves follow the curvature of the Earth. Between about 3 and 30 MHz, {{blank:b}} waves are reflected by the ionosphere. Above about 30 MHz, {{blank:c}} waves pass through the ionosphere in straight lines.",
    blanks: [
      { id: "a", accepted: ["surface"], choices: ["surface", "sky", "space"] },
      { id: "b", accepted: ["sky"], choices: ["surface", "sky", "space"] },
      { id: "c", accepted: ["space"], choices: ["surface", "sky", "space"] },
    ],
    explanation: "Surface (ground) waves, sky waves, space waves.",
  });
  b.manualShort({
    d: 3, skill: "EVALUATION", marks: 4,
    stem: "Give four advantages of optical fibres over coaxial cables for long-distance telephone and internet links.",
    points: [
      "Much larger bandwidth: many more channels / higher data rates.",
      "Much lower attenuation, so regenerators can be much further apart.",
      "No electromagnetic interference or cross-talk (light, not current) / more secure, hard to tap.",
      "Thinner and lighter, and made from cheap, plentiful raw material (glass from sand).",
    ],
    modelAnswer: "Optical fibres have a far larger bandwidth, so they carry many more calls and much higher data rates. Their attenuation is much lower, so regenerators can be tens of kilometres apart. They carry light rather than current, so they suffer no electrical interference or cross-talk and are very hard to tap. They are also thinner and lighter, and glass is made from cheap, plentiful raw materials.",
    explanation: "Bandwidth, attenuation, interference/security, size and cost.",
    hints: ["Think about bandwidth, attenuation, noise and cost."],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Outline how a mobile phone network allows a call to continue while the caller travels in a kombi from one town to another.",
    points: [
      "The area is divided into cells, each with a base station that communicates with phones by low-power radio (UHF/microwaves).",
      "Base stations are linked (by cable, fibre or microwave) to a mobile switching centre, a computer that connects calls.",
      "The switching centre monitors the signal strength and knows which cell the phone is in (the phone registers with its base station).",
      "As the phone moves into a new cell, the call is handed over to the new base station (and a new frequency) without interruption.",
    ],
    modelAnswer: "The country is divided into cells, each served by a base station that exchanges low-power radio signals with phones in that cell. Base stations are linked by cable, fibre or microwave links to a mobile switching centre, a computer that connects calls and keeps track of which cell each phone is in by monitoring signal strength. When the kombi moves into a neighbouring cell, the switching centre hands the call over to that cell's base station and a new frequency, so the call carries on.",
    explanation: "Cells, base stations, switching centre, handover.",
    hints: ["What happens at the boundary between two cells?"],
  });
  b.manualShort({
    d: 3, skill: "EVALUATION", marks: 3,
    stem: "Compare geostationary and polar-orbit satellites for communication, giving three differences.",
    points: [
      "Geostationary: 24 h equatorial orbit at about 36 000 km, stays above one point; polar: low orbit over the poles, moves across the sky.",
      "Geostationary: fixed dishes and continuous coverage of one region; polar: dishes must track and contact is only for part of each orbit, but the whole Earth is covered over time.",
      "Geostationary: noticeable delay (about 0.24 s) and weaker signals from the larger distance; polar: shorter delay, stronger signals.",
    ],
    modelAnswer: "A geostationary satellite orbits above the equator at about 36 000 km with a 24-hour period, so it stays over one point, whereas a polar satellite is in a low orbit over the poles and moves across the sky. A geostationary satellite can be used with fixed dishes and covers its region continuously, while a polar satellite must be tracked and is in view only part of the time, though over many orbits it passes over the whole Earth. The great height of a geostationary satellite gives a delay of about a quarter of a second and weaker signals, while a polar satellite's lower orbit gives a shorter delay and stronger signals.",
    explanation: "Height, coverage, tracking, delay.",
    hints: ["Compare height, coverage and tracking."],
  });

  // Practice structured: a long fibre route with regenerators (12 marks)
  {
    const L = 240, a = 0.3, Pin = 4.0e-3, Pmin = 2.0e-6;
    const total = a * L;
    const Pout = Pin * 10 ** (-total / 10);
    const maxLoss = dB(Pin, Pmin);
    const maxLen = maxLoss / a;
    const nReg = Math.ceil(L / maxLen) - 1;
    chk(nReg, 2);
    b.struct({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: t`A $240\ \text{km}$ optical-fibre route has an attenuation of $0.30\ \text{dB km}^{-1}$. Each transmitter (and each regenerator) sends $4.0\ \text{mW}$ into the fibre, and a receiver needs at least $2.0\ \mu\text{W}$ to recover the data reliably.`,
      parts: [
        P.num({ label: "(a)", marks: 2, stem: "Calculate the total loss along the whole route, in dB.", value: total, unit: "dB", wrong: [a], explanation: t`$0.30 \times 240 = ${sfStr(total, 2)}\ \text{dB}$.` }),
        P.num({ label: "(b)", marks: 2, stem: "Calculate the power that would reach the end without any regenerators, in W, to two significant figures.", value: Pout, sf: 2, unit: "W", wrong: [Pin / total], explanation: t`$4.0 \times 10^{-3} \times 10^{-7.2} = ${sciTex(Pout, 2)}\ \text{W}$, far below $2.0\ \mu\text{W}$.` }),
        P.num({ label: "(c)", marks: 2, stem: "Calculate the maximum length of fibre between regenerators, in km, to three significant figures.", value: maxLen, unit: "km", wrong: [maxLoss], explanation: t`Allowed loss $= 10\lg\dfrac{4.0 \times 10^{-3}}{2.0 \times 10^{-6}} = ${sfStr(maxLoss, 3)}\ \text{dB}$; length $= \dfrac{${sfStr(maxLoss, 3)}}{0.30} = ${sfStr(maxLen, 3)}\ \text{km}$.` }),
        P.num({ label: "(d)", marks: 2, stem: "Determine the minimum number of regenerators needed along the route.", value: nReg, wrong: [nReg + 1], explanation: t`$240/${sfStr(maxLen, 3)} = ${sfStr(L / maxLen, 3)}$, so at least 3 sections are needed, joined by ${nReg} regenerators (for example every 80 km).` }),
        P.manual({ label: "(e)", marks: 2, stem: "Explain why regenerators, rather than simple amplifiers, are used for digital data.", points: [
          "An amplifier boosts the noise along with the signal, so noise accumulates over many stages.",
          "A regenerator decides whether each pulse is a 1 or a 0 and sends out a new clean pulse, removing the noise.",
        ], modelAnswer: "An amplifier increases the noise as well as the signal, so noise builds up along the route. A regenerator reads each pulse as a 1 or a 0 and transmits a fresh, clean pulse, so the noise is removed at every regenerator." }),
        P.manual({ label: "(f)", marks: 2, stem: "A copper coaxial cable of attenuation 10 dB km⁻¹ was considered for the same route. Explain, with a calculation, why it was rejected.", points: [
          "Maximum section length = 33 dB / 10 dB km⁻¹ ≈ 3.3 km, so about 70 or more regenerators would be needed.",
          "(Also) lower bandwidth and electrical interference/cross-talk; the fibre needs only 2 regenerators.",
        ], modelAnswer: "With 10 dB per km, the allowed 33 dB loss is used up in about 3.3 km, so over 70 regenerators would be needed instead of 2. Coaxial cable also has a much smaller bandwidth and picks up electrical interference." }),
      ],
      explanation: "dB losses add along a fibre; the allowed loss fixes the regenerator spacing.",
      hints: ["Total loss = dB per km × length.", "Allowed loss = 10 lg(P_in/P_min)."],
    });
  }
  // Practice structured: a satellite television link (8 marks)
  {
    const h = 3.58e7;
    const delay = (2 * h) / DATA.c;
    const Ptx = 2.0e3, Prx = 3.2e-11;
    const loss = dB(Ptx, Prx);
    b.struct({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A television broadcaster in Harare sends programmes to a geostationary satellite $3.58 \times 10^{7}\ \text{m}$ above the equator, which retransmits them to homes with fixed dishes. The uplink transmitter power is $2.0\ \text{kW}$; the power picked up by the satellite's receiver is $3.2 \times 10^{-11}\ \text{W}$. Treat the satellite as directly overhead.`,
      parts: [
        P.num({ label: "(a)", marks: 2, stem: "Calculate the time for a signal to travel from the broadcaster to a home via the satellite, in s, to two significant figures.", value: delay, sf: 2, unit: "s", wrong: [h / DATA.c], explanation: t`$\dfrac{2 \times 3.58 \times 10^{7}}{3.00 \times 10^{8}} = ${sfStr(delay, 2)}\ \text{s}$.` }),
        P.num({ label: "(b)", marks: 2, stem: "Calculate the loss between the transmitter and the satellite's receiver, in dB, to three significant figures.", value: loss, unit: "dB", wrong: [Ptx / Prx], explanation: t`$10\lg\dfrac{2.0 \times 10^{3}}{3.2 \times 10^{-11}} = ${sfStr(loss, 3)}\ \text{dB}$.` }),
        P.manual({ label: "(c)", marks: 2, stem: "Explain why the satellite retransmits at a different frequency from the one it receives.", points: [
          "The received signal is extremely weak (about 10⁻¹¹ W) while the satellite transmits much more power.",
          "Different frequencies stop the strong downlink signal swamping/interfering with the weak uplink signal at the satellite's receiver.",
        ], modelAnswer: "The satellite receives only about 10⁻¹¹ W but transmits many watts. Using a different downlink frequency stops its own strong transmission from swamping the weak uplink signal at its receiver." }),
        P.manual({ label: "(d)", marks: 2, stem: "Explain why a geostationary satellite is used for television broadcasting.", points: [
          "It stays above the same point, so home dishes can be fixed (no tracking).",
          "It covers a large area continuously, 24 hours a day.",
        ], modelAnswer: "A geostationary satellite stays above the same point on the equator, so home dishes can be pointed once and fixed, and it covers a very large area continuously, all day." }),
      ],
      explanation: "Delay = 2h/c; loss = 10 lg(P_tx/P_rx); different up/down frequencies.",
      hints: ["The signal goes up and then down."],
    });
  }

  b.card("DEFINITION", "**Attenuation**", "The gradual loss of signal power as it travels along a channel.");
  b.card("FORMULA", "Decibels", t`$\text{dB} = 10\lg\!\left(\dfrac{P_1}{P_2}\right)$; 10 dB = factor 10, 20 dB = factor 100, 3 dB ≈ factor 2`);
  b.card("FORMULA", "Attenuation per unit length", t`$\dfrac{10\lg(P_{\text{in}}/P_{\text{out}})}{L}$ in $\text{dB km}^{-1}$`);
  b.card("DEFINITION", "**Signal-to-noise ratio**", "Signal power ÷ noise power at a point, usually in dB; a minimum value sets repeater spacing.");
  b.card("CONCEPT", "Cables compared", "Wire pair: cheap, low bandwidth, cross-talk. Coaxial: screened, more bandwidth. Fibre: huge bandwidth, very low attenuation, no interference, secure.");
  b.card("FACT", "Radio propagation", "Surface waves < 3 MHz; sky waves 3-30 MHz (ionosphere); space waves > 30 MHz (line of sight, satellites).");
  b.card("CONCEPT", "Geostationary v polar", "Geostationary: 24 h, equatorial, 36 000 km, fixed dishes, 0.24 s delay. Polar: low, over poles, tracked, whole-Earth coverage.");
  b.card("CONCEPT", "Uplink ≠ downlink frequency", "Stops the satellite's strong transmission swamping the very weak signal it receives.");
  b.card("CONCEPT", "Mobile phone network", "Cells with base stations; frequency reuse; mobile switching centre; handover between cells.");
});
