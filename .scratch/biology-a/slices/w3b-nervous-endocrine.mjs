// W3b: communication systems, nervous and endocrine (both boards; Cambridge A Level only).
import { concept, P, t, chk, table, rnd } from "../lib.mjs";

concept("abio.coordination.nervous-endocrine", { file: "coordination/nervous-endocrine", keyPrefix: "coordination.nervous-endocrine" }, (b) => {
  const calc = (o) => b.calc({ ...o, workedSolution: o.workedSolution ?? o.explanation });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which statement describes an endocrine gland?",
    options: [
      ["A ductless gland that secretes hormones into the blood", "Correct: endocrine glands have no ducts; hormones enter capillaries."],
      ["A gland that secretes enzymes through a duct into the gut", "That describes an exocrine gland, such as the salivary glands."],
      ["A gland that releases neurotransmitter into a synaptic cleft", "Neurotransmitter is released by neurones at synapses, not by glands."],
      ["A gland whose secretions act only on the cells that made them", "Hormones are carried in the blood to target cells elsewhere."],
    ],
    answer: "A",
    explanation: "An **endocrine gland** is ductless and secretes hormones straight into the blood, which carries them to target cells.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Insulin reaches almost every cell in the body, but only some cells respond to it. Why?",
    options: [
      ["Only some cells have receptors complementary to insulin", "Correct: target cells carry specific receptor proteins."],
      ["Insulin is broken down before it reaches most cells", "Insulin circulates in the blood to all tissues."],
      ["Only some cells have mitochondria to supply the energy", "Almost all body cells have mitochondria; that is not the reason."],
      ["Insulin can only pass through the walls of liver capillaries", "Insulin leaves capillaries in many tissues."],
    ],
    answer: "A",
    explanation: "Hormones reach all cells, but only **target cells** with specific, complementary receptors bind the hormone and respond.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which row correctly matches a hormone with the cells that secrete it?",
    options: [
      ["Glucagon: alpha cells of the islets of Langerhans", "Correct."],
      ["Insulin: alpha cells of the islets of Langerhans", "Insulin is secreted by beta cells."],
      ["ADH: anterior pituitary gland", "ADH is released from the posterior pituitary."],
      ["Glucagon: cells lining the kidney's collecting duct", "Collecting-duct cells are targets of ADH; they secrete neither hormone."],
    ],
    answer: "A",
    explanation: "Glucagon comes from **alpha cells** and insulin from **beta cells** of the islets of Langerhans; ADH is released from the **posterior** pituitary.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which feature is typical of nervous control but NOT of endocrine control?",
    options: [
      ["Responses are localised to the cells a neurone connects with", "Correct: impulses go to precise places."],
      ["The signal is detected by specific receptor proteins", "Both systems use specific receptors (neurotransmitter and hormone receptors)."],
      ["The response is usually long-lasting", "Long-lasting effects are typical of hormones."],
      ["The signal is carried in the blood plasma", "Hormones, not impulses, travel in plasma."],
    ],
    answer: "A",
    explanation: "Nervous responses are **rapid, short-lived and localised**; hormonal responses are slower, longer-lasting and often widespread. Both use specific receptors.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Where is the cell body of a sensory neurone in a spinal reflex arc?",
    options: [
      ["In the dorsal root ganglion", "Correct: just outside the spinal cord."],
      ["In the grey matter of the spinal cord", "Cell bodies of motor and relay neurones are in the grey matter."],
      ["In the white matter of the spinal cord", "White matter is mainly myelinated axons, not cell bodies."],
      ["Next to the receptor in the skin", "The cell body is part way along the neurone, in the ganglion."],
    ],
    answer: "A",
    explanation: "The sensory neurone's cell body sits in the **dorsal root ganglion**; motor neurone cell bodies are in the grey matter.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "An electron micrograph shows a neurone cell body packed with rough endoplasmic reticulum, Golgi bodies and mitochondria. What is the best explanation for this?",
    options: [
      ["The cell makes a lot of protein and neurotransmitter and needs much ATP", "Correct: RER and Golgi make and package proteins; mitochondria supply ATP."],
      ["The cell is dividing rapidly by mitosis to replace damaged or dead neurones", "Mature neurones do not usually divide."],
      ["The cell stores large amounts of glycogen for use by the axon", "RER and Golgi are not glycogen stores."],
      ["The cell secretes myelin to insulate its own axon", "Myelin is made by Schwann cells, not by the neurone."],
    ],
    answer: "A",
    explanation: "Cell bodies synthesise proteins (RER), package them (Golgi), and need ATP (mitochondria) for active transport and making neurotransmitter.",
    hints: ["What does rough ER make?"],
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A stretched tendon causes a muscle to contract in a reflex in which the sensory neurone synapses directly with the motor neurone. Compared with a reflex that includes a relay neurone, this reflex has",
    options: [
      ["fewer synapses, so a shorter delay before the response", "Correct: each synapse adds a delay."],
      ["more synapses, so a slower and more controlled response", "Removing the relay neurone removes a synapse."],
      ["no synapses, so the impulse never stops travelling", "There is still one synapse between the two neurones."],
      ["the same number of synapses but a longer pathway", "A relay neurone adds an extra synapse; without it there is one fewer."],
    ],
    answer: "A",
    explanation: "One synapse instead of two means less synaptic delay, so the knee-jerk type of reflex is faster.",
    hints: ["Count the synapses in each pathway."],
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Damage to the ventral root of a spinal nerve would most likely cause",
    options: [
      ["loss of movement in the muscles it supplies, with sensation intact", "Correct: the ventral root carries motor neurone axons."],
      ["loss of sensation in the area of skin it supplies, with movement intact", "Sensory fibres enter through the dorsal root."],
      ["loss of both sensation and movement in the whole body", "Only the area supplied by that nerve would be affected."],
      ["faster reflexes because fewer impulses reach the brain", "Reflexes in that area would fail, not speed up."],
    ],
    answer: "A",
    explanation: "Motor neurones leave the spinal cord in the **ventral root**, so damage there stops impulses reaching effectors; sensory fibres in the dorsal root are unaffected.",
    hints: ["Which root carries motor neurones?"],
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "The myelin sheath is formed by Schwann cells wrapped around the axon.",
    answer: true,
    explanation: "True. Schwann cells wind their membranes many times around the axon, leaving gaps called nodes of Ranvier.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Hormones are carried by the blood only to their target organs.",
    answer: false,
    explanation: "False. Hormones travel in the blood to all parts of the body; only target cells with specific receptors respond.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each part of a neurone with its function.",
    pairs: [
      ["Dendrites", "Receive impulses from other neurones"],
      ["Axon", "Carries impulses away from the cell body"],
      ["Myelin sheath", "Insulates the axon and speeds conduction"],
      ["Cell body", "Contains the nucleus and makes proteins"],
    ],
    explanation: "Dendrites receive; the axon carries impulses away; myelin insulates; the cell body is the metabolic centre.",
  });
  b.fib({
    d: 2,
    stem: "Choose the correct words.",
    template: "In a reflex arc, the {{blank:a}} neurone carries impulses from the receptor to the spinal cord. A {{blank:b}} neurone in the grey matter links it to a {{blank:c}} neurone, which carries impulses to the effector.",
    blanks: [
      { id: "a", accepted: ["sensory"], choices: ["sensory", "relay", "motor"] },
      { id: "b", accepted: ["relay"], choices: ["sensory", "relay", "motor"] },
      { id: "c", accepted: ["motor"], choices: ["sensory", "relay", "motor"] },
    ],
    explanation: "Receptor → sensory → relay → motor → effector.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the gaps in the myelin sheath where the axon membrane is exposed.",
    accepted: ["nodes of Ranvier", "node of Ranvier", "nodes of ranvier", "Ranvier nodes", "nodes"],
    wrong: ["synapses", "Schwann cells"],
    explanation: "The gaps are **nodes of Ranvier**.",
  });

  // Numerical: time for a reflex (conduction plus synaptic delays)
  const lenS = 0.75, lenM = 0.85, speed = 50, synDelay = 0.6, nSyn = 2;
  const condMs = ((lenS + lenM) / speed) * 1000;
  const total = condMs + nSyn * synDelay;
  chk(condMs, 32);
  chk(total, 33.2);
  calc({
    d: 4, skill: "APPLICATION", calculator: true,
    stem: `In a withdrawal reflex, the sensory neurone is ${lenS} m long and the motor neurone is ${lenM} m long; the relay neurone is so short that its length can be ignored. Both long neurones conduct at ${speed} m s⁻¹, and each of the ${nSyn} synapses delays the impulse by ${synDelay} ms. Calculate the time, in ms, from the start of the sensory impulse to the arrival of the motor impulse at the muscle. Give your answer to one decimal place.`,
    value: total, dp: 1, unit: "ms",
    wrong: [condMs, rnd((lenS + lenM) / speed, 3)],
    explanation: t`1. Total length of fast neurone: $${lenS} + ${lenM} = ${lenS + lenM}\ \text{m}$.
2. Conduction time $= \dfrac{${lenS + lenM}}{${speed}} = ${(lenS + lenM) / speed}\ \text{s} = ${condMs}\ \text{ms}$.
3. Synaptic delay $= ${nSyn} \times ${synDelay} = ${rnd(nSyn * synDelay, 1)}\ \text{ms}$.
4. Total $= ${condMs} + ${rnd(nSyn * synDelay, 1)} = ${total.toFixed(1)}\ \text{ms}$.
Leaving out the synapses gives 32 ms; forgetting to convert seconds to milliseconds gives 0.032.`,
    hints: ["Time = distance ÷ speed; convert seconds to milliseconds.", "Add the delay at each synapse."],
  });
  b.num({
    d: 2, skill: "APPLICATION",
    stem: "How many synapses does an impulse cross between the receptor's sensory neurone and the effector in a reflex arc made of a sensory, a relay and a motor neurone? (Count only synapses between neurones.)",
    value: 2, wrong: [3, 1],
    explanation: "Sensory → relay is one synapse; relay → motor is the second: **2** synapses. (The neuromuscular junction at the effector is not counted here.)",
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why large multicellular animals need communication systems.",
    points: [
      "Most cells are far from the surface / not in contact with the external environment",
      "Cells are specialised, so the activities of different tissues and organs must be coordinated",
      "To respond to changes in the external environment and to keep the internal environment constant (homeostasis)",
    ],
    modelAnswer: "In a large animal most cells are far from the surface and cannot detect outside changes themselves. Cells are specialised for different jobs, so the activities of organs must be coordinated. Communication lets the animal detect stimuli and respond to them, and keeps the internal environment within narrow limits by homeostasis.",
    explanation: "Distance from surface, specialisation, responding and homeostasis.",
    hints: ["Think about specialisation and homeostasis."],
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Compare the way information is transmitted in the nervous system and the endocrine system. Give four matched points.",
    points: [
      "Nervous: electrical impulses (with chemical synapses) whereas endocrine: chemical hormones",
      "Nervous: along neurones whereas endocrine: in the blood",
      "Nervous: very rapid whereas endocrine: slower",
      "Nervous: short-lived and localised whereas endocrine: longer-lasting and often widespread",
    ],
    modelAnswer: "Nervous information is carried as electrical impulses, with chemical transmission at synapses, whereas the endocrine system uses chemical hormones. Impulses travel along neurones to precise places, whereas hormones are carried in the blood to the whole body. Nervous transmission is very rapid, whereas hormonal responses take longer. Nervous responses are usually short-lived and localised, whereas hormonal effects last longer and can be widespread.",
    explanation: "Each point must compare both systems.",
    hints: ["Use 'whereas' to make each point a comparison."],
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 3,
    stem: "Describe how a motor neurone differs in structure from a sensory neurone in a spinal reflex arc.",
    points: [
      "Motor neurone cell body is in the grey matter of the CNS / at one end; sensory cell body is in the dorsal root ganglion / part way along",
      "Motor neurone has many dendrites on the cell body; sensory neurone has a long dendron from the receptor",
      "Motor neurone has a long axon to the effector; sensory neurone has a short axon into the spinal cord",
    ],
    modelAnswer: "The motor neurone's cell body is at one end, in the grey matter of the spinal cord, and carries many dendrites; a long axon runs to the effector. The sensory neurone's cell body lies part way along the neurone, in the dorsal root ganglion, with a long dendron from the receptor and a short axon into the spinal cord.",
    explanation: "Position of the cell body and the lengths of the fibres differ.",
    hints: ["Where is each cell body?"],
  });

  // Practice structured: a hormone and a reflex compared
  const times = [0, 15, 30, 45, 60, 75, 90];
  const urine = [1.2, 1.1, 0.6, 0.4, 0.4, 0.5, 0.6];
  b.struct({
    d: 4, skill: "ANALYSIS",
    stem: `Farai did not drink for several hours on a hot day. His urine output was then measured every 15 minutes.\n\n${table(["Time / min", ...times.map(String)], [["Urine output / cm³ per min", ...urine.map((u) => u.toFixed(1))]])}`,
    parts: [
      P.short({
        label: "(a)", marks: 1, stem: "Name the hormone most likely to cause the fall in urine output.",
        accepted: ["ADH", "antidiuretic hormone", "anti-diuretic hormone", "vasopressin"],
        wrong: ["insulin", "glucagon"],
        explanation: "ADH increases water reabsorption in the collecting ducts.",
      }),
      P.mcq({
        label: "(b)", stem: "Which gland releases this hormone into the blood?",
        options: [
          ["Posterior pituitary gland", "Correct."],
          ["Anterior pituitary gland", "The anterior pituitary releases other hormones, such as FSH and LH."],
          ["Islets of Langerhans in the pancreas", "These secrete insulin and glucagon."],
          ["Adrenal glands above the kidneys", "The adrenal medulla secretes adrenaline."],
        ],
        answer: "A",
        explanation: "ADH is made in the hypothalamus and released from the posterior pituitary.",
      }),
      P.num({
        label: "(c)", marks: 1, stem: "Calculate the percentage decrease in urine output between 0 and 45 minutes. Give your answer to the nearest whole number.",
        value: ((urine[0] - urine[3]) / urine[0]) * 100, dp: 0, unit: "%",
        wrong: [rnd(((urine[0] - urine[3]) / urine[3]) * 100, 0)],
        explanation: t`$\dfrac{1.2 - 0.4}{1.2} \times 100 = 66.7 \approx 67\%$. Dividing by the final value (0.4) gives 200%, which is wrong.`,
      }),
      P.manual({
        label: "(d)", marks: 3, stem: "Use the data to explain why this response is an example of endocrine rather than nervous control.",
        points: [
          "The response is slow: output takes about 30-45 min to fall to its lowest value",
          "It lasts a long time: output stays low / is still below the start at 90 min",
          "A hormone is carried in the blood to target cells (collecting ducts), which takes time; nervous responses take milliseconds",
        ],
        modelAnswer: "Urine output fell slowly, reaching its lowest value of 0.4 cm³ per min only after about 45 minutes, and it stayed low until the end at 90 minutes. This slow, long-lasting change fits a hormone carried in the blood to the collecting duct cells; a nervous response would take a fraction of a second and be brief.",
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "Suggest why the output began to rise again after 60 minutes.",
        points: [
          "Less ADH released / ADH broken down or removed from the blood",
          "Because the water potential of the blood had risen back towards normal (negative feedback)",
        ],
        modelAnswer: "As water was conserved, the water potential of the blood rose back towards normal, so less ADH was released and the ADH already in the blood was broken down; less water was reabsorbed and urine output rose (negative feedback).",
      }),
    ],
    explanation: "ADH from the posterior pituitary reduces urine output slowly and for a long time: typical endocrine control.",
    hints: ["Look at how long the change takes and how long it lasts."],
    calculator: true,
  });

  b.struct({
    d: 3, skill: "UNDERSTANDING",
    stem: "Chipo accidentally touches a hot iron and pulls her hand away before she feels any pain.",
    parts: [
      P.short({
        label: "(a)", marks: 1, stem: "Name the type of response.",
        accepted: ["reflex", "reflex action", "a reflex", "spinal reflex", "withdrawal reflex", "reflex response"],
        wrong: ["voluntary action"],
        explanation: "A rapid automatic response is a reflex action.",
      }),
      P.short({
        label: "(b)", marks: 1, stem: "Name the effector in this response.",
        accepted: ["biceps", "biceps muscle", "the biceps", "muscle", "arm muscle", "flexor muscle"],
        wrong: ["skin", "spinal cord"],
        explanation: "The biceps (a muscle) contracts to bend the arm.",
      }),
      P.manual({
        label: "(c)", marks: 3, stem: "Describe the pathway taken by impulses from the receptor to the effector.",
        points: [
          "Receptors in the skin are stimulated; impulses travel along a sensory neurone to the spinal cord (via the dorsal root)",
          "Sensory neurone synapses with a relay neurone in the grey matter",
          "Relay neurone synapses with a motor neurone, which carries impulses (via the ventral root) to the muscle",
        ],
        modelAnswer: "Heat stimulates receptors in the skin, and impulses travel along a sensory neurone through the dorsal root into the spinal cord. In the grey matter the sensory neurone synapses with a relay neurone, which synapses with a motor neurone. The motor neurone carries impulses out through the ventral root to the biceps, which contracts.",
      }),
      P.manual({
        label: "(d)", marks: 1, stem: "Explain why she pulls her hand away before she feels pain.",
        points: ["The reflex pathway passes through the spinal cord only; impulses to the brain (for conscious pain) arrive later / travel further"],
        modelAnswer: "The response is coordinated in the spinal cord, so the muscle contracts before impulses sent up the cord reach the brain and pain is felt.",
      }),
    ],
    explanation: "A spinal reflex arc: receptor, sensory, relay, motor neurone, effector; the brain is informed afterwards.",
    hints: ["Which part of the CNS coordinates the response?"],
  });

  b.card("DEFINITION", "Define **hormone**.", "A chemical messenger secreted by an endocrine gland into the blood, acting on target cells with specific receptors.");
  b.card("DEFINITION", "What is a **target cell**?", "A cell with specific receptors for a hormone, so it responds when the hormone binds.");
  b.card("FACT", "Which cells secrete insulin and glucagon?", "Insulin: beta cells; glucagon: alpha cells; both in the islets of Langerhans of the pancreas.");
  b.card("FACT", "Where is ADH released and what is its target?", "Released from the posterior pituitary (made in the hypothalamus); targets collecting duct cells in the kidney.");
  b.card("CONCEPT", "Nervous versus endocrine control (four contrasts)", "Electrical vs chemical; neurones vs blood; fast vs slow; short and localised vs long-lasting and widespread.");
  b.card("CONCEPT", "Order of a reflex arc", "Receptor → sensory neurone → relay neurone (CNS) → motor neurone → effector.");
  b.card("FACT", "Where are the cell bodies of sensory and motor neurones in a spinal reflex?", "Sensory: dorsal root ganglion. Motor: grey matter of the spinal cord.");
  b.card("DEFINITION", "What are **nodes of Ranvier**?", "Gaps in the myelin sheath where the axon membrane is exposed.");
  b.card("DEFINITION", "Define **reflex action**.", "A rapid, automatic response to a stimulus, not involving conscious thought, via a reflex arc.");
});
