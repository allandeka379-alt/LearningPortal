// W3a: homeostasis in plants: stomata and guard cells (Cambridge only).
import { concept, P, t, chk, sfStr, dpStr, table, mean } from "../lib.mjs";

concept("abio.homeostasis.stomata", { file: "homeostasis/stomata", keyPrefix: "homeostasis.stomata" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which organelle is found in guard cells but not in most other cells of the leaf epidermis?",
    options: [
      ["Chloroplast", "Correct: guard cells contain chloroplasts."],
      ["Nucleus", "All living epidermal cells have a nucleus."],
      ["Mitochondrion", "All living epidermal cells have mitochondria."],
      ["Ribosome", "Ribosomes are in all living cells."],
    ],
    answer: "A",
    explanation: "Guard cells have **chloroplasts**.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which ions enter guard cells, lowering their water potential, when stomata open?",
    options: [
      ["Potassium ions", "Correct: K⁺ diffuses in through channels."],
      ["Sodium ions", "Sodium is not the main ion in stomatal opening."],
      ["Calcium ions", "Ca²⁺ is involved in closing, as a second messenger."],
      ["Hydrogen ions (protons)", "H⁺ ions are pumped out, not in."],
    ],
    answer: "A",
    explanation: "**K⁺** enters, lowering the water potential.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Under which condition do stomata of most plants normally close?",
    options: [
      ["Darkness", "Correct: no photosynthesis, so no need for CO₂ uptake."],
      ["Bright light with plenty of soil water", "Stomata open in these conditions."],
      ["Low CO₂ concentration inside the leaf", "Low internal CO₂ promotes opening."],
      ["Early morning sunlight", "Stomata open after dawn."],
    ],
    answer: "A",
    explanation: "Stomata close in **darkness**.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "What is the role of ATP in the opening of stomata?",
    options: [
      ["It powers proton pumps that move H⁺ out of guard cells", "Correct: this starts the process."],
      ["It powers pumps that move water into guard cells", "Water moves by osmosis, not pumping."],
      ["It is used to synthesise cellulose for the inner wall", "Wall structure is not made each time a stoma opens."],
      ["It breaks down abscisic acid in the guard cells", "This is not the role described."],
    ],
    answer: "A",
    explanation: "**Proton pumps** use ATP.",
    hints: ["Which step is active transport?"],
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Why do guard cells curve apart when they become turgid?",
    options: [
      ["The inner wall is thicker and less elastic than the outer wall", "Correct: uneven thickening makes the cells bow outwards."],
      ["The outer wall is thicker and less elastic than the inner wall", "The thick wall is on the pore side."],
      ["The cells shrink when they gain water", "Cells swell when they gain water."],
      ["The cytoskeleton pushes the cells together", "This is not the mechanism."],
    ],
    answer: "A",
    explanation: "The **thicker inner wall** stretches less, so the cells bow apart.",
    hints: ["Which side of each guard cell stretches more?"],
  });
  b.mcq({
    d: 3, skill: "RECALL",
    stem: "Which substance acts as a second messenger in guard cells when abscisic acid causes stomatal closure?",
    options: [
      ["Calcium ions", "Correct."],
      ["Cyclic AMP", "cAMP is the second messenger of glucagon in liver cells."],
      ["Potassium ions", "K⁺ leaves the cells as a result."],
      ["Glucagon", "Glucagon is a mammalian hormone."],
    ],
    answer: "A",
    explanation: "**Ca²⁺** is the second messenger for ABA.",
    hints: ["A divalent ion."],
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "A plant is sprayed with a chemical that inhibits proton pumps in guard cell membranes. What effect is expected in the morning light?",
    options: [
      ["Stomata stay closed, reducing CO₂ uptake and water loss", "Correct: without proton pumping K⁺ does not enter."],
      ["Stomata open wider, so transpiration increases", "Opening needs the pumps."],
      ["Stomata open normally but close at night", "Opening would be prevented."],
      ["Guard cells take in more water by osmosis", "Their water potential is not lowered."],
    ],
    answer: "A",
    explanation: "No proton pumping → no K⁺ uptake → no osmosis → **stomata stay closed**.",
    hints: ["Follow the chain from the pump to the pore."],
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which statement best describes the cost to a plant of closing its stomata during water stress?",
    options: [
      ["Water loss falls but photosynthesis slows because less CO₂ enters", "Correct: a trade-off."],
      ["Water loss rises and photosynthesis also rises", "Closing reduces water loss."],
      ["Water loss stops completely and photosynthesis is unaffected", "Some water is still lost through the cuticle, and CO₂ uptake falls."],
      ["Photosynthesis rises because oxygen cannot escape", "Accumulated oxygen would not raise the rate."],
    ],
    answer: "A",
    explanation: "Closing saves water at the cost of **CO₂ uptake**.",
    hints: ["What else passes through stomata besides water vapour?"],
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Abscisic acid causes stomata to close when a plant is short of water.",
    answer: true,
    explanation: "True. ABA triggers ion and water loss from guard cells.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Stomata open when guard cells lose water and become flaccid.",
    answer: false,
    explanation: "False. Stomata **open** when guard cells **gain** water and become turgid.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each feature of a guard cell to its role in stomatal movement.",
    pairs: [
      ["Thick inner cell wall", "Makes the cell bow outwards when turgid"],
      ["Proton pumps", "Actively move H⁺ out using ATP"],
      ["Potassium channels", "Allow K⁺ to diffuse in"],
      ["Radial cellulose microfibrils", "Stop the cell widening, so it lengthens"],
    ],
    explanation: "Structure explains the change in shape.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "When K⁺ ions enter guard cells, their water potential {{blank:a}}, water enters by {{blank:b}} and the cells become {{blank:c}}, opening the stoma.",
    blanks: [
      { id: "a", accepted: ["falls"], choices: ["falls", "rises", "stays the same"] },
      { id: "b", accepted: ["osmosis"], choices: ["osmosis", "active transport", "cotransport"] },
      { id: "c", accepted: ["turgid"], choices: ["turgid", "flaccid", "plasmolysed"] },
    ],
    explanation: "Lower ψ → osmosis → turgid.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the plant growth regulator that causes stomata to close during drought.",
    accepted: ["abscisic acid", "ABA"],
    wrong: ["auxin"],
    explanation: "**Abscisic acid** (ABA).",
  });

  const counts = [18, 21, 20, 19, 22];
  const m = mean(counts);
  chk(m, 20);
  const r = 0.25;
  const area = Math.PI * r * r;
  const dens = m / area;
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "Stomata were counted in five fields of view of a leaf impression: 18, 21, 20, 19 and 22. Each field of view is a circle of radius 0.25 mm. Calculate the stomatal density, in stomata per mm², to three significant figures.",
    value: dens, sf: 3, wrong: [sfStr(m / (Math.PI * 0.5 * 0.5), 3), sfStr(m / (2 * Math.PI * r), 3)],
    explanation: t`1. Mean $= 100 \div 5 = 20$.
2. Area $= \pi \times 0.25^2 = ${sfStr(area, 4)}$ mm².
3. Density $= 20 \div ${sfStr(area, 4)} = ${sfStr(dens, 3)}$ per mm².
4. Using 0.5 mm (the diameter) as the radius gives ${sfStr(m / (Math.PI * 0.5 * 0.5), 3)}.`,
    hints: ["Area of a circle = πr²."],
  });
  const ap = [10.0, 6.0];
  const pc = ((ap[1] - ap[0]) / ap[0]) * 100;
  chk(pc, -40);
  b.num({
    d: 2, skill: "APPLICATION", calculator: true,
    stem: "The mean stomatal aperture of bean leaves was 10.0 µm in mid-morning and 6.0 µm in the early afternoon of a hot day. Calculate the percentage change. Include the sign.",
    value: pc, unit: "%", wrong: [40, sfStr(-4 / 6 * 100, 3)],
    explanation: t`$\dfrac{6.0 - 10.0}{10.0} \times 100 = ${pc}\%$.`,
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 5,
    stem: "Explain how stomata open in the light.",
    points: [
      "ATP-powered proton pumps actively transport H⁺ out of guard cells",
      "Inside becomes more negative, so (voltage-gated) K⁺ channels open and K⁺ diffuses in (with anions / malate formed)",
      "Water potential of guard cells falls",
      "Water enters by osmosis from neighbouring cells, so guard cells become turgid",
      "Thick inner walls / radial microfibrils make the cells bow apart, opening the pore",
    ],
    modelAnswer: "In light, proton pumps use ATP to actively transport hydrogen ions out of the guard cells. The inside of the cells becomes more negative, so potassium channels open and potassium ions diffuse in, together with anions, and malate is made. The water potential of the guard cells falls, so water enters by osmosis from neighbouring epidermal cells and the guard cells become turgid. Because the inner walls are thicker and the microfibrils are arranged in hoops, the cells lengthen and bow apart, opening the stoma.",
    explanation: "Pump → K⁺ → ψ falls → osmosis → shape change.",
    hints: ["Start with the active step."],
  });
  b.manualShort({
    d: 4, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe how abscisic acid causes stomata to close.",
    points: [
      "ABA (made in roots / leaves when water is short) binds to receptors on guard cell membranes",
      "Ca²⁺ enters the cytoplasm (from outside and the vacuole); acts as a second messenger",
      "Proton pumps inhibited; anions and K⁺ leave the guard cells",
      "Water potential rises, water leaves by osmosis, guard cells become flaccid and the pore closes",
    ],
    modelAnswer: "When the plant is short of water, ABA is produced and binds to receptors on the guard cell membranes. Calcium ions then enter the cytoplasm and act as a second messenger. They inhibit the proton pumps and open channels that let anions and potassium ions leave the guard cells. The water potential of the guard cells rises, water leaves by osmosis, the cells become flaccid and the stoma closes.",
    explanation: "ABA → receptor → Ca²⁺ → ions out → water out.",
    hints: ["Which ion is the second messenger?"],
  });
  b.manualShort({
    d: 3, skill: "EVALUATION", marks: 3,
    stem: "Explain why the control of stomatal aperture is described as homeostasis in plants.",
    points: [
      "Keeps the water content / turgor of leaf cells within limits (prevents wilting)",
      "While allowing enough CO₂ in for photosynthesis",
      "Responds to changes in conditions (light, CO₂, water supply) and reverses them, like negative feedback (e.g. water stress → ABA → closure → less water lost)",
    ],
    modelAnswer: "Adjusting stomatal aperture keeps the water content and turgor of leaf cells within limits, preventing wilting, while still letting in enough carbon dioxide for photosynthesis. Stomata respond to changes such as water shortage by closing, which reduces further water loss: a negative feedback response that keeps conditions inside the leaf steady.",
    explanation: "A response that counteracts a change.",
    hints: ["What is kept steady, and how?"],
  });

  const time = ["05:00", "07:00", "09:00", "11:00", "13:00", "15:00", "17:00", "19:00"];
  const apr = [0.6, 3.0, 7.0, 9.0, 4.5, 5.5, 3.0, 0.8];
  const rise = (apr[2] - apr[1]) / 2;
  b.struct({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: `Farai measured the mean width of stomata on bean leaves on a hot, sunny day.\n\n${table(["Time of day", ...time], [["Mean stomatal aperture / µm", ...apr.map((x) => x.toFixed(1))]])}`,
    parts: [
      P.num({
        label: "(a)", marks: 1, stem: "Calculate the mean rate of opening between 07:00 and 09:00, in µm per hour.",
        value: rise, dp: 2, wrong: [4.0],
        explanation: t`$(7.0 - 3.0) \div 2 = ${dpStr(rise, 2)}$ µm per hour.`,
      }),
      P.manual({
        label: "(b)", marks: 2, stem: "Describe the pattern of stomatal opening during the day.",
        points: ["Almost closed at night (0.6 µm), open rapidly after dawn to a maximum of 9.0 µm at 11:00", "Partly close to 4.5 µm at 13:00, reopen slightly (5.5 µm at 15:00), almost closed by 19:00"],
        modelAnswer: "Stomata are almost closed at 05:00 (0.6 µm), open quickly to a maximum of 9.0 µm at 11:00, partly close to 4.5 µm at 13:00, reopen to 5.5 µm at 15:00 and are almost closed again by 19:00 (0.8 µm).",
      }),
      P.manual({
        label: "(c)", marks: 3, stem: "Suggest an explanation for the change between 11:00 and 13:00.",
        points: ["Hottest / driest part of the day, high transpiration; water lost faster than taken up (water stress)", "Abscisic acid produced / released, acting on guard cells", "K⁺ and water leave guard cells, which become flaccid, so stomata partly close and reduce water loss"],
        modelAnswer: "In the hottest, driest part of the day, water is lost by transpiration faster than it is taken up, so the plant is water-stressed. Abscisic acid is produced and acts on the guard cells, causing potassium ions and then water to leave them, so they become flaccid and the stomata partly close, reducing water loss.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Explain one disadvantage to the plant of the change between 11:00 and 13:00.",
        points: ["Less CO₂ diffuses into the leaf", "So the rate of photosynthesis falls (less carbohydrate made / growth)"],
        modelAnswer: "Narrower stomata let less carbon dioxide diffuse into the leaf, so the rate of photosynthesis falls just when light intensity is highest.",
      }),
    ],
    explanation: "Stomata balance CO₂ uptake against water loss.",
    hints: ["Rate = change ÷ time.", "What happens in the hottest part of the day?"],
  });

  b.struct({
    d: 3, skill: "UNDERSTANDING",
    stem: "An electron micrograph of a pair of guard cells in surface view shows two kidney-shaped cells, each with chloroplasts, a large vacuole and a cell wall that is much thicker on the side next to the pore.",
    parts: [
      P.manual({
        label: "(a)", marks: 2, stem: "Explain how the uneven thickening of the cell wall helps the stoma to open.",
        points: ["Thin outer wall stretches more than the thick inner wall when the cell is turgid", "So the cells curve / bow outwards, pulling apart at the pore"],
        modelAnswer: "When the guard cells swell, the thin outer walls stretch more than the thick inner walls, so the cells curve outwards and the pore between them opens.",
      }),
      P.manual({
        label: "(b)", marks: 2, stem: "Suggest two roles of the chloroplasts in guard cells.",
        points: ["Make ATP (photophosphorylation) for proton pumps", "Store / break down starch to malate, lowering water potential (or detect light / photosynthesis lowers internal CO₂)"],
        modelAnswer: "They make ATP in the light for the proton pumps, and starch stored in them can be converted to malate, which helps lower the water potential of the guard cells.",
      }),
      P.short({ label: "(c)", marks: 1, stem: "Name the process by which water enters the guard cells.", accepted: ["osmosis"], wrong: ["diffusion"], explanation: "**Osmosis.**" }),
      P.tf({ label: "(d)", stem: "True or false: the large vacuole of a guard cell gains water when the stoma opens.", answer: true, explanation: "True; the vacuole swells as water enters." }),
    ],
    explanation: "Guard cell structure explains how they change shape.",
    hints: ["Which wall stretches more?"],
  });

  b.card("CONCEPT", "Stomatal compromise", "Open stomata let CO₂ in for photosynthesis but let water vapour out.");
  b.card("FACT", "Structure of guard cells", "Kidney-shaped, chloroplasts, thick inner wall, radial microfibrils, many proton pumps and K⁺ channels.");
  b.card("CONCEPT", "Stomatal opening", "Proton pumps (ATP) → K⁺ in → ψ falls → water in by osmosis → turgid → bow apart.");
  b.card("CONCEPT", "Stomatal closing", "K⁺ and anions out → ψ rises → water out → flaccid → pore closes.");
  b.card("DEFINITION", "Define **abscisic acid**.", "Plant growth regulator produced in water stress that closes stomata.");
  b.card("FACT", "Second messenger in ABA signalling", "Calcium ions (Ca²⁺) in the guard cell cytoplasm.");
  b.card("FACT", "When do stomata open and close?", "Open: light, low internal CO₂. Close: dark, high CO₂, water stress (ABA).");
  b.card("FACT", "Daily rhythm of stomata", "Open after dawn, may partly close at midday in water stress, close in the evening; an internal clock helps time it.");
});
