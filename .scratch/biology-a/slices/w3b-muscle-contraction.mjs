// W3b: muscle contraction (Cambridge only, A Level).
import { concept, P, t, chk, table, rnd, actualSize, magnification, sfStr } from "../lib.mjs";

concept("abio.coordination.muscle-contraction", { file: "coordination/muscle-contraction", keyPrefix: "coordination.muscle-contraction" }, (b) => {
  const calc = (o) => b.calc({ ...o, workedSolution: o.workedSolution ?? o.explanation });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which part of a sarcomere contains actin filaments only?",
    options: [
      ["I band", "Correct: the light band either side of the Z line."],
      ["A band", "The A band contains myosin and overlapping actin."],
      ["H zone", "The H zone contains myosin only."],
      ["M line", "The M line holds myosin filaments together."],
    ],
    answer: "A",
    explanation: "The **I band** contains only thin (actin) filaments.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "To which protein do calcium ions bind to start contraction?",
    options: [
      ["Troponin", "Correct."],
      ["Tropomyosin", "Tropomyosin is moved by troponin; it does not bind Ca²⁺."],
      ["Myosin", "Myosin binds actin and ATP."],
      ["Actin", "Ca²⁺ does not bind directly to actin."],
    ],
    answer: "A",
    explanation: "Ca²⁺ binds to **troponin**, which changes shape and moves tropomyosin off the binding sites.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which part of a sarcomere stays the same length during contraction?",
    options: [
      ["A band", "Correct: it is the length of the myosin filaments."],
      ["I band", "The I band shortens as actin slides in."],
      ["H zone", "The H zone shortens or disappears."],
      ["Distance between Z lines", "The Z lines move closer together."],
    ],
    answer: "A",
    explanation: "The **A band** equals the myosin length, which does not change.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is the role of the T-tubules in a muscle fibre?",
    options: [
      ["They carry action potentials deep into the fibre", "Correct."],
      ["They store calcium ions until the fibre is stimulated", "That is the sarcoplasmic reticulum."],
      ["They release acetylcholine onto the myofibrils", "ACh is released by the motor neurone at the junction."],
      ["They supply ATP to the myosin heads", "ATP comes from mitochondria and creatine phosphate."],
    ],
    answer: "A",
    explanation: "T-tubules are infoldings of the sarcolemma that carry depolarisation to the sarcoplasmic reticulum throughout the fibre.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "At which step of the cross-bridge cycle is ATP required for the myosin head to detach from actin?",
    options: [
      ["After the power stroke, when ATP binds to the head", "Correct: ATP binding breaks the cross-bridge."],
      ["Before Ca²⁺ is released from the sarcoplasmic reticulum", "Ca²⁺ release is triggered by depolarisation."],
      ["When troponin changes shape and moves tropomyosin", "This is caused by calcium, not ATP."],
      ["When the myosin head first binds to actin", "Binding happens with ADP and Pi already on the head."],
    ],
    answer: "A",
    explanation: "A new ATP binding to the myosin head causes it to detach; hydrolysis then re-cocks the head.",
    hints: ["What happens in rigor mortis, when there is no ATP?"],
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A drug prevents calcium ions from being pumped back into the sarcoplasmic reticulum. What is the most likely effect?",
    options: [
      ["The muscle stays contracted and fails to relax", "Correct: binding sites on actin remain exposed."],
      ["The muscle cannot contract at all", "Ca²⁺ is still released; it is removal that is blocked."],
      ["The myosin heads cannot hydrolyse ATP", "ATPase activity is not affected."],
      ["Acetylcholine is no longer released at the neuromuscular junction", "The drug acts in the muscle fibre."],
    ],
    answer: "A",
    explanation: "Ca²⁺ stays bound to troponin, tropomyosin stays off the sites and cross-bridges keep forming, so the muscle cannot relax.",
    hints: ["What is needed for relaxation?"],
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "In a cross-section through the region of a sarcomere where filaments overlap, each thick filament is seen to be surrounded by",
    options: [
      ["six thin filaments in a hexagonal pattern", "Correct."],
      ["two thin filaments, one on each side of it", "The arrangement is hexagonal, not paired."],
      ["no thin filaments, only other thick filaments", "That would be a section through the H zone."],
      ["a ring of T-tubules and sarcoplasmic reticulum", "These surround whole myofibrils, not single filaments."],
    ],
    answer: "A",
    explanation: "In the overlap region each myosin filament is surrounded by six actin filaments.",
    hints: ["A section through the H zone shows only thick filaments."],
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Two electron micrographs of the same myofibril are compared. In the second, the H zone is absent and the I band is narrower, while the A band is unchanged. What does this show?",
    options: [
      ["The fibre is more contracted, with greater actin-myosin overlap", "Correct."],
      ["The myosin filaments have themselves shortened during the contraction", "The A band (myosin length) is unchanged."],
      ["The fibre has relaxed and been stretched", "Stretching would widen the H zone and I band."],
      ["The actin filaments have been broken down", "Actin is still present in the A band overlap."],
    ],
    answer: "A",
    explanation: "Narrower I band and no H zone mean actin has slid further into the A band: more contraction.",
    hints: ["Which band equals the myosin length?"],
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "During muscle contraction the actin and myosin filaments both become shorter.",
    answer: false,
    explanation: "False. The filaments slide past each other; their lengths do not change.",
  });
  b.tf({
    d: 2, skill: "RECALL", daily: true,
    stem: "The myosin head has ATPase activity.",
    answer: true,
    explanation: "True. The myosin head hydrolyses ATP, using the energy to return to its cocked position.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each protein or structure with its role in contraction.",
    pairs: [
      ["Troponin", "Binds calcium ions and changes shape"],
      ["Tropomyosin", "Covers myosin-binding sites on actin at rest"],
      ["Myosin head", "Forms cross-bridges and hydrolyses ATP"],
      ["Sarcoplasmic reticulum", "Stores and releases calcium ions"],
    ],
    explanation: "Troponin binds Ca²⁺; tropomyosin blocks sites; myosin forms cross-bridges; SR stores Ca²⁺.",
  });
  b.fib({
    d: 3,
    stem: "Choose the correct words.",
    template: "When a muscle contracts, the {{blank:a}} filaments slide towards the centre of the sarcomere. The I band and the {{blank:b}} become shorter, but the {{blank:c}} band stays the same length.",
    blanks: [
      { id: "a", accepted: ["actin"], choices: ["actin", "myosin", "tropomyosin"] },
      { id: "b", accepted: ["H zone"], choices: ["H zone", "M line", "Z line"] },
      { id: "c", accepted: ["A"], choices: ["A", "I", "H"] },
    ],
    explanation: "Actin slides in; I band and H zone shorten; A band constant.",
    hints: ["The A band is the length of the myosin filaments."],
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the repeating unit of a myofibril that lies between two Z lines.",
    accepted: ["sarcomere", "a sarcomere", "sarcomeres"],
    wrong: ["myofibril"],
    explanation: "The **sarcomere**.",
  });

  // Calculations: sarcomere length from a micrograph
  const img = 56, mag = 25000;
  const act = actualSize(img, "mm", mag);
  chk(act, 2.24);
  calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `An electron micrograph at a magnification of ×${mag.toLocaleString("en-GB")} shows a sarcomere measuring ${img} mm from Z line to Z line. Calculate the actual length of the sarcomere in µm. Give your answer to three significant figures.`,
    value: act, sf: 3, unit: "µm", wrong: [rnd(img / mag, 5), rnd(mag / img, 1)],
    explanation: t`1. Convert the image length to µm: $${img}\ \text{mm} = ${img * 1000}\ \text{µm}$.
2. Actual length $= \dfrac{${img * 1000}}{${mag}} = ${rnd(act, 2)}\\text{µm}$.
Forgetting to convert mm to µm gives 0.00224; dividing the magnification by the image length is the wrong way round.`,
    hints: ["Actual size = image size ÷ magnification.", "1 mm = 1000 µm."],
  });
  const relaxed = 2.5, contracted = 2.05;
  const pct = ((relaxed - contracted) / relaxed) * 100;
  chk(pct, 18);
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `A sarcomere is ${relaxed} µm long when relaxed and ${contracted} µm long when contracted. Calculate the percentage decrease in its length.`,
    value: pct, unit: "%", wrong: [rnd(((relaxed - contracted) / contracted) * 100, 0)],
    explanation: `(${relaxed} − ${contracted}) ÷ ${relaxed} × 100 = **${rnd(pct, 0)}%**. Dividing by the contracted length gives about 22%, which is wrong.`,
    hints: ["Divide the change by the original length."],
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 5,
    stem: "Explain the roles of calcium ions and ATP in the contraction of striated muscle.",
    points: [
      "Ca²⁺ released from the sarcoplasmic reticulum binds to troponin",
      "Troponin changes shape, moving tropomyosin away from the myosin-binding sites on actin",
      "Myosin heads bind to actin forming cross-bridges, then perform the power stroke pulling actin towards the M line",
      "ATP binds to the myosin head, causing it to detach from actin",
      "ATP is hydrolysed by myosin ATPase to re-cock the head / ATP used to pump Ca²⁺ back into the SR",
    ],
    modelAnswer: "When the fibre is stimulated, calcium ions are released from the sarcoplasmic reticulum and bind to troponin. Troponin changes shape and pulls tropomyosin away from the myosin-binding sites on the actin filaments. Myosin heads bind to the exposed sites, forming cross-bridges, then tilt in the power stroke, pulling the actin towards the centre of the sarcomere. ATP then binds to each myosin head, making it detach from actin, and the head hydrolyses the ATP to return to its cocked position, ready to bind again. ATP is also used to pump Ca²⁺ back into the SR so that the muscle can relax.",
    explanation: "Calcium uncovers the sites; ATP detaches and re-cocks the heads.",
    hints: ["Troponin, tropomyosin, cross-bridge, detachment, recovery."],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe how an action potential in a motor neurone leads to the release of calcium ions inside a muscle fibre.",
    points: [
      "ACh released at the neuromuscular junction binds to receptors on the sarcolemma",
      "Na⁺ channels open and the sarcolemma depolarises / action potential spreads along the sarcolemma",
      "Action potential travels down the T-tubules into the fibre",
      "Sarcoplasmic reticulum releases Ca²⁺ into the sarcoplasm",
    ],
    modelAnswer: "At the neuromuscular junction, acetylcholine is released and binds to receptors on the sarcolemma, opening sodium channels. The sarcolemma depolarises and an action potential spreads across it and down the T-tubules into the fibre. This causes the sarcoplasmic reticulum to release calcium ions into the sarcoplasm around the myofibrils.",
    explanation: "Junction → sarcolemma → T-tubules → SR.",
    hints: ["Follow the depolarisation inwards."],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 3,
    stem: "Explain why muscles become rigid a few hours after death (rigor mortis).",
    points: [
      "No respiration, so no ATP is made",
      "Ca²⁺ leaks from the SR / cannot be pumped back, so binding sites are exposed and cross-bridges form",
      "Without ATP the myosin heads cannot detach from actin, so the cross-bridges stay locked",
    ],
    modelAnswer: "After death respiration stops and no ATP is made. Calcium ions leak out of the sarcoplasmic reticulum and cannot be pumped back, so the binding sites on actin are exposed and myosin heads bind. Without ATP the heads cannot detach, so the cross-bridges remain locked and the muscle stays rigid.",
    explanation: "No ATP: no detachment.",
    hints: ["Which step needs ATP to break the cross-bridge?"],
  });

  // Practice structured: sarcomere data
  const states = ["Relaxed", "Partly contracted", "Fully contracted"];
  const sarc = [2.7, 2.3, 1.95];
  const aBand = 1.6;
  const iBand = sarc.map((s) => s - aBand);
  const actin = 1.02;
  const hZone = sarc.map((s) => Math.max(0, s - 2 * actin));
  chk(iBand[0], 1.1); chk(hZone[0], 0.66); chk(hZone[1], 0.26); chk(hZone[2], 0);
  const pctS = ((sarc[0] - sarc[2]) / sarc[0]) * 100;
  b.struct({
    d: 4, skill: "ANALYSIS",
    stem: `Measurements were taken from electron micrographs of a myofibril in three states. Each actin filament extends ${actin} µm from the Z line.\n\n${table(["State", "Sarcomere length / µm", "A band / µm", "I band / µm", "H zone / µm"], states.map((s, i) => [s, sarc[i].toFixed(2), aBand.toFixed(2), iBand[i].toFixed(2), i === 2 ? "absent" : hZone[i].toFixed(2)]))}`,
    parts: [
      P.num({
        label: "(a)", marks: 2, stem: "Calculate the percentage decrease in sarcomere length from relaxed to fully contracted. Give your answer to three significant figures.",
        value: pctS, sf: 3, unit: "%", wrong: [rnd(((sarc[0] - sarc[2]) / sarc[2]) * 100, 1)],
        explanation: t`$\dfrac{2.70 - 1.95}{2.70} \times 100 = ${sfStr(pctS, 3)}\%$.`,
      }),
      P.manual({
        label: "(b)", marks: 2, stem: "Explain why the A band does not change length.",
        points: [
          "The A band is the length of the myosin (thick) filaments",
          "Filaments do not shorten; they slide past each other",
        ],
        modelAnswer: "The A band corresponds to the full length of the myosin filaments. In contraction the filaments slide past each other but do not change length, so the A band stays 1.60 µm.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Explain why the H zone is absent when the muscle is fully contracted.",
        points: [
          "Actin filaments from each end have slid in until they meet / overlap in the centre",
          "Sarcomere (1.95 µm) is shorter than twice the actin length (2.04 µm), so no region has myosin only",
        ],
        modelAnswer: "The H zone is the region with myosin only. At 1.95 µm the sarcomere is shorter than the two actin filaments laid end to end (2 × 1.02 = 2.04 µm), so the actin filaments from both Z lines have met or overlapped in the centre and no myosin-only region remains.",
      }),
      P.num({
        label: "(d)", marks: 1, stem: "Calculate the H zone, in µm, when the sarcomere is 2.25 µm long. Give your answer to two decimal places.",
        value: 2.25 - 2 * actin, dp: 2, unit: "µm", wrong: [0.65],
        explanation: `H zone = 2.25 − (2 × ${actin}) = 0.21 µm. Subtracting the A band instead gives the I band (0.65 µm).`,
      }),
      P.manual({
        label: "(e)", marks: 1, stem: "Suggest why the force a muscle can produce is lower when its sarcomeres are greatly stretched.",
        points: ["Less overlap of actin and myosin, so fewer cross-bridges can form"],
        modelAnswer: "When stretched there is less overlap between actin and myosin, so fewer myosin heads can form cross-bridges and less force is produced.",
      }),
    ],
    explanation: "Sliding filaments: A band constant, I band and H zone shorten.",
    hints: ["H zone = sarcomere − 2 × actin length."],
    calculator: true,
  });

  b.struct({
    d: 4, skill: "APPLICATION",
    stem: "A muscle fibre was stimulated in a solution containing a substance that binds tightly to calcium ions, removing them from the sarcoplasm. Action potentials still passed along the sarcolemma and down the T-tubules.",
    parts: [
      P.mcq({
        label: "(a)", stem: "What would happen to the fibre when stimulated?",
        options: [
          ["It would not contract", "Correct: without Ca²⁺ the binding sites stay covered."],
          ["It would contract and fail to relax", "Lack of calcium prevents contraction."],
          ["It would contract more strongly than normal", "Calcium is needed for contraction."],
          ["Its A bands would shorten", "A bands never shorten."],
        ],
        answer: "A",
        explanation: "No free Ca²⁺ means troponin does not move tropomyosin, so no cross-bridges form.",
      }),
      P.manual({
        label: "(b)", marks: 3, stem: "Explain your answer.",
        points: [
          "Ca²⁺ cannot bind to troponin",
          "Tropomyosin stays over the myosin-binding sites on actin",
          "Myosin heads cannot form cross-bridges, so no power stroke / no sliding",
        ],
        modelAnswer: "With no free calcium ions, troponin cannot bind Ca²⁺ and does not change shape, so tropomyosin stays over the myosin-binding sites on actin. Myosin heads cannot attach, no cross-bridges or power strokes occur and the filaments do not slide.",
      }),
      P.short({
        label: "(c)", marks: 1, stem: "Name the organelle that normally releases calcium ions in the fibre.",
        accepted: ["sarcoplasmic reticulum", "SR", "the sarcoplasmic reticulum"],
        wrong: ["mitochondria"],
        explanation: "The sarcoplasmic reticulum.",
      }),
      P.manual({
        label: "(d)", marks: 1, stem: "State why many mitochondria are found between the myofibrils.",
        points: ["To supply ATP by aerobic respiration for cross-bridge cycling / pumping Ca²⁺"],
        modelAnswer: "They supply ATP by aerobic respiration for the myosin heads and for pumping calcium ions back into the SR.",
      }),
    ],
    explanation: "Calcium is the switch for contraction.",
    hints: ["What does calcium bind to?"],
  });

  b.card("DEFINITION", "Define **sarcomere**.", "The repeating contractile unit of a myofibril, from one Z line to the next.");
  b.card("CONCEPT", "Bands of a sarcomere", "I band: actin only. A band: length of myosin (with overlap). H zone: myosin only. Z line: anchors actin. M line: holds myosin.");
  b.card("CONCEPT", "Role of Ca²⁺ in contraction", "Released from the SR; binds troponin; troponin moves tropomyosin; myosin-binding sites on actin exposed.");
  b.card("CONCEPT", "Two uses of ATP at the myosin head", "Binding of ATP detaches the head from actin; hydrolysis of ATP re-cocks the head.");
  b.card("FACT", "What happens to the bands during contraction?", "Sarcomere, I band and H zone shorten; A band stays the same.");
  b.card("DEFINITION", "What are **T-tubules**?", "Infoldings of the sarcolemma that carry action potentials deep into the muscle fibre.");
  b.card("FACT", "Where are calcium ions stored in a muscle fibre?", "In the sarcoplasmic reticulum; pumped back in by active transport after contraction.");
  b.card("CONCEPT", "Why does rigor mortis occur?", "No ATP after death, so myosin heads cannot detach from actin; cross-bridges stay locked.");
  b.card("FORMULA", "Actual sarcomere length from a micrograph", "Actual size = image size ÷ magnification (convert mm to µm by × 1000).");
});
