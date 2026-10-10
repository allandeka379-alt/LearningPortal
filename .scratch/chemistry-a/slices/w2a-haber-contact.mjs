// W2a: achem.equilibria.haber-contact (both boards; ZIMSEC Form 5 applied, Cambridge AS Level)
import { concept, P, t, ce, Mr, AR, moles, VM_RTP, molesFromSolution, sfStr, dpStr, rnd, chk } from "../lib.mjs";

// Equilibrium conversion of SO2 (%) for a 2:1 SO2:O2 feed at total pressure p (atm), Kp from ΔH and ΔS.
function contactConversion(T, p = 1, dH = -197000, dS = -186) {
  const Kp = Math.exp(-dH / (8.31 * T) + dS / 8.31);
  const f = (a) => { const tot = 3 - a; return ((2 * a) / tot) ** 2 / (((2 - 2 * a) / tot) ** 2 * ((1 - a) / tot) * p) - Kp; };
  let lo = 1e-9, hi = 1 - 1e-12;
  for (let i = 0; i < 200; i++) { const m = (lo + hi) / 2; if (f(m) > 0) hi = m; else lo = m; }
  return ((lo + hi) / 2) * 100;
}

concept("achem.equilibria.haber-contact", { file: "equilibria/haber-contact", keyPrefix: "equilibria.haber-contact" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which catalyst is used in the Haber process?",
    options: [
      ["iron", "Correct: an iron catalyst speeds up the reaction between nitrogen and hydrogen."],
      ["vanadium(V) oxide", "This is the catalyst for the Contact process."],
      ["platinum and rhodium", "These are used in catalytic converters and in making nitric acid, not in the Haber process."],
      ["nickel", "Nickel catalyses the hydrogenation of alkenes, for example in making margarine."],
    ],
    answer: "A",
    explanation: "The Haber process uses an iron catalyst; the Contact process uses vanadium(V) oxide.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: t`Why is the Contact process step $\ce{2SO2(g) + O2(g) <=> 2SO3(g)}$ carried out at only about 1–2 atm?`,
    options: [
      ["The equilibrium already lies far to the right, so high pressure would add cost for little gain.", "Correct: the conversion is already very high at low pressure."],
      ["Higher pressure would move the position of equilibrium to the left, towards SO₂ and O₂.", "Higher pressure favours the side with fewer moles of gas, the right (2 mol against 3 mol)."],
      ["Sulfur trioxide decomposes at pressures above 2 atm.", "There is no such decomposition limit; this is an invented reason."],
      ["The vanadium(V) oxide catalyst works only at atmospheric pressure.", "The catalyst choice does not set the pressure; the reason is economic."],
    ],
    answer: "A",
    explanation: "High pressure would increase the yield slightly, but the yield is already high, so the extra cost of compressors and thick-walled plant is not justified.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "In the final stage of the Contact process, sulfur trioxide is absorbed in concentrated sulfuric acid rather than in water. Why?",
    options: [
      ["Its reaction with water is so exothermic that a fine mist of acid droplets forms.", "Correct: the mist is hard to condense and escapes, so oleum is made first."],
      ["Sulfur trioxide does not react with water at all at room temperature.", "It reacts very vigorously with water; that is the problem."],
      ["Concentrated sulfuric acid catalyses the conversion of SO₂ to SO₃.", "The catalyst is vanadium(V) oxide; absorption happens after conversion."],
      ["Water would turn the sulfur trioxide back into sulfur dioxide.", "Water does not reduce SO₃; it forms sulfuric acid."],
    ],
    answer: "A",
    explanation: "SO₃ + H₂SO₄ → H₂S₂O₇ (oleum), which is then diluted: H₂S₂O₇ + H₂O → 2H₂SO₄. Direct absorption in water makes an acid mist.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Ammonia is prepared in the laboratory by heating ammonium chloride with calcium hydroxide. Which substance is used to dry the gas?",
    options: [
      ["calcium oxide", "Correct: calcium oxide is basic and does not react with ammonia."],
      ["concentrated sulfuric acid", "Ammonia is a base and reacts with sulfuric acid to form ammonium sulfate."],
      ["anhydrous calcium chloride", "Calcium chloride absorbs ammonia, forming a complex."],
      ["phosphorus(V) oxide", "This is an acidic oxide, which reacts with the alkaline ammonia."],
    ],
    answer: "A",
    hints: ["Ammonia is a base; the drying agent must not react with it."],
    explanation: "Ammonia is dried with calcium oxide (quicklime). Acidic drying agents and calcium chloride react with or absorb it.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which statements about the conditions in the Haber process are correct?\n\n1. A temperature lower than 400 °C would give a higher equilibrium yield of ammonia.\n2. A pressure much higher than 200 atm would increase the equilibrium yield but is too expensive.\n3. The iron catalyst increases the percentage of ammonia in the equilibrium mixture.",
    options: [
      ["1 and 2 only", "Correct: the reaction is exothermic and reduces the moles of gas; the catalyst does not change the yield."],
      ["1, 2 and 3", "Statement 3 is false: catalysts do not move the position of equilibrium."],
      ["2 and 3 only", "Statement 1 is true and statement 3 is false."],
      ["1 only", "Statement 2 is also true: higher pressure raises the yield, but the cost of plant and energy rises steeply."],
    ],
    answer: "A",
    hints: ["Separate effects on yield from effects on rate."],
    explanation: "Lower temperature and higher pressure both favour ammonia at equilibrium; the chosen values are compromises with rate and cost. The catalyst only speeds things up.",
  });
  b.mcq({
    d: 3, skill: "RECALL",
    stem: "Which statements describe major uses of sulfuric acid?\n\n1. Making fertilisers such as ammonium sulfate and superphosphate\n2. As the electrolyte in lead-acid car batteries\n3. Making detergents",
    options: [
      ["1, 2 and 3", "Correct: all three are major uses of sulfuric acid."],
      ["1 and 2 only", "Sulfuric acid is also used to make detergents (sulfonation)."],
      ["2 and 3 only", "Fertiliser manufacture is the largest single use."],
      ["1 only", "Batteries and detergents are also important uses."],
    ],
    answer: "A",
    hints: ["Think of farming, cars and cleaning products."],
    explanation: "Sulfuric acid is used for fertilisers, battery acid, detergents, paints and pigments, and throughout the chemical industry.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "In the Haber process, the gas mixture leaving the converter is cooled and the unreacted nitrogen and hydrogen are returned to the converter. What is the main benefit of this?",
    options: [
      ["Nearly all of the nitrogen and hydrogen is eventually converted to ammonia.", "Correct: recycling makes up for the low conversion in each pass."],
      ["The equilibrium constant for the reaction is increased.", "Kc depends only on temperature, not on recycling."],
      ["The position of equilibrium in the converter moves to the left.", "Removing ammonia and adding fresh reactants moves it to the right, if anything."],
      ["The iron catalyst is regenerated after each pass.", "A catalyst is not used up, so it does not need regenerating by recycling gases."],
    ],
    answer: "A",
    hints: ["Only a small fraction reacts in one pass."],
    explanation: "Only a small fraction of the feed reacts in each pass, so recycling the unreacted gases gives a high overall conversion and saves raw materials.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: t`In the Contact process, air is used in slight excess for $\ce{2SO2(g) + O2(g) <=> 2SO3(g)}$. Which is the best explanation?`,
    options: [
      ["Extra oxygen moves the position right, converting more of the costlier sulfur dioxide.", "Correct: increasing [O₂] moves the position right; air is free, SO₂ costs money to make."],
      ["Extra oxygen increases the value of Kp, so more sulfur trioxide forms.", "Adding a reactant does not change Kp; it moves the position."],
      ["Extra oxygen cools the converter and so increases the yield.", "Cooling is not the reason; the excess changes concentration."],
      ["Extra oxygen is needed to keep the catalyst in its +5 oxidation state at all times.", "The catalyst is regenerated in the cycle; the excess is about yield and cost."],
    ],
    answer: "A",
    hints: ["Which reactant is cheaper?"],
    explanation: "By Le Chatelier, more O₂ moves the position to the right. Air is free, so a slight excess makes better use of the sulfur dioxide.",
  });
  {
    const n = 0.6 / VM_RTP;
    const m = n * Mr("NH4Cl");
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`Ammonia is made by heating ammonium chloride with excess calcium hydroxide: $\ce{2NH4Cl(s) + Ca(OH)2(s) -> CaCl2(s) + 2NH3(g) + 2H2O(g)}$. Calculate the mass of ammonium chloride, in g, needed to make 600 cm³ of ammonia at room conditions, to three significant figures. (Ar: H 1.0, N 14.0, Cl 35.5; molar gas volume 24.0 dm³ mol⁻¹)`,
      value: m, sf: 3, unit: "g",
      wrong: [sfStr(m / 2, 3), sfStr(600 / 24 * Mr("NH4Cl"), 3)],
      hints: ["Convert 600 cm³ to dm³ before dividing by 24.0.", "What is the NH₄Cl : NH₃ ratio?"],
      explanation: `1. n(NH₃) = 0.600 ÷ 24.0 = ${sfStr(n, 3)} mol.\n2. NH₄Cl : NH₃ = 2 : 2 = 1 : 1, so n(NH₄Cl) = ${sfStr(n, 3)} mol.\n3. Mr(NH₄Cl) = ${dpStr(Mr("NH4Cl"), 1)}; mass = ${sfStr(n, 3)} × ${dpStr(Mr("NH4Cl"), 1)} = ${sfStr(m, 3)} g.\n4. Halving the amount (misreading the ratio) gives ${sfStr(m / 2, 3)} g; using 600 instead of 0.600 dm³ gives ${sfStr(600 / 24 * Mr("NH4Cl"), 3)} g.`,
    });
  }
  {
    const pct = ((2 * AR.N) / Mr("CO(NH2)2")) * 100;
    b.num({
      d: 2, skill: "APPLICATION", calculator: true, daily: true,
      stem: t`Urea, $\ce{CO(NH2)2}$, is made from ammonia and is used as a fertiliser. Calculate the percentage by mass of nitrogen in urea, to three significant figures. (Ar: H 1.0, C 12.0, N 14.0, O 16.0)`,
      value: pct, sf: 3, unit: "%",
      wrong: [sfStr((AR.N / Mr("CO(NH2)2")) * 100, 3)],
      explanation: `Mr(urea) = 12.0 + 16.0 + 2(14.0 + 2.0) = ${dpStr(Mr("CO(NH2)2"), 1)}; % N = 28.0 ÷ ${dpStr(Mr("CO(NH2)2"), 1)} × 100 = ${sfStr(pct, 3)}%. Counting only one nitrogen atom gives ${sfStr((AR.N / Mr("CO(NH2)2")) * 100, 3)}%.`,
    });
  }
  {
    const m = (3.0 / 3 / 2.0) * 2 * 17.0;
    chk(m, 17, 1e-9, "NH3 tonnes");
    b.num({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`Calculate the maximum mass of ammonia, in tonnes, that could be made from 3.00 tonnes of hydrogen in the Haber process, $\ce{N2 + 3H2 <=> 2NH3}$, if all the hydrogen were converted. (Ar: H 1.0, N 14.0)`,
      value: m, sf: 3, unit: "tonnes",
      wrong: [sfStr((3.0 / 2.0) * 17.0, 3)],
      hints: ["Use the mole ratio 3 H₂ : 2 NH₃; tonnes behave like grams in the ratio."],
      explanation: `1. Moles in "tonne-moles": H₂ = 3.00 ÷ 2.0 = 1.50.\n2. NH₃ = 1.50 × 2/3 = 1.00.\n3. Mass = 1.00 × 17.0 = ${sfStr(m, 3)} tonnes. Ignoring the 3 : 2 ratio gives ${sfStr((3.0 / 2.0) * 17.0, 3)} tonnes. In practice recycling is needed because only part reacts per pass.`,
    });
  }
  {
    const n = moles(8.0, AR.S);
    const v = n * VM_RTP;
    b.num({
      d: 2, skill: "APPLICATION", calculator: true,
      stem: t`Sulfur burns in air with a blue flame: $\ce{S(s) + O2(g) -> SO2(g)}$. Calculate the volume of sulfur dioxide, in dm³ at room conditions, formed when 8.00 g of sulfur burns completely, to three significant figures. (Ar: S 32.1; molar gas volume 24.0 dm³ mol⁻¹)`,
      value: v, sf: 3, unit: "dm³",
      wrong: [sfStr((8.0 / Mr("SO2")) * VM_RTP, 3)],
      explanation: `n(S) = 8.00 ÷ 32.1 = ${sfStr(n, 3)} mol = n(SO₂); V = ${sfStr(n, 3)} × 24.0 = ${sfStr(v, 3)} dm³. Dividing 8.00 by Mr(SO₂) instead of Ar(S) gives ${sfStr((8.0 / Mr("SO2")) * VM_RTP, 3)} dm³.`,
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Raising the temperature in the Haber process increases both the rate of reaction and the equilibrium yield of ammonia.",
    answer: false,
    explanation: "False. The rate increases, but the forward reaction is exothermic, so the equilibrium yield decreases.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "In the Haber process, nitrogen is obtained from the air and hydrogen mainly from natural gas.",
    answer: true,
    explanation: "True: nitrogen from (fractional distillation of liquid) air; hydrogen by steam reforming of methane, or by electrolysis of water.",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Match each feature of the industrial processes with its main reason.",
    pairs: [
      ["Haber: about 200 atm", "fewer moles of gas on the right, balanced against plant cost"],
      ["Contact: about 1–2 atm", "conversion already high without compression"],
      ["Both: about 400–450 °C", "compromise between rate and equilibrium yield"],
      ["Haber: ammonia cooled and liquefied", "removes product so gases can be recycled"],
    ],
    hints: ["Think about yield, rate and cost for each."],
    explanation: "Pressures and temperatures are compromises; liquefying ammonia separates it from unreacted gases, which are recycled.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the description of the Contact process.",
    template: "Sulfur dioxide and oxygen react over a {{blank:a}} catalyst at about 400–450 °C. The sulfur trioxide is absorbed in concentrated sulfuric acid to form {{blank:b}}, which is then diluted with water.",
    blanks: [
      { id: "a", accepted: ["vanadium(V) oxide"], choices: ["vanadium(V) oxide", "iron", "nickel", "platinum"] },
      { id: "b", accepted: ["oleum"], choices: ["oleum", "brine", "slaked lime"] },
    ],
    explanation: "V₂O₅ catalyses 2SO₂ + O₂ ⇌ 2SO₃; SO₃ + H₂SO₄ → H₂S₂O₇ (oleum).",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Give the formula of oleum.",
    accepted: ["H2S2O7", "H₂S₂O₇"],
    normalise: ["trim", "collapse_whitespace"],
    wrong: ["H2SO4"],
    explanation: "Oleum (fuming sulfuric acid) is H₂S₂O₇.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: t`Explain why a pressure of about 200 atm is chosen for the Haber process, $\ce{N2(g) + 3H2(g) <=> 2NH3(g)}$.`,
    points: [
      "Higher pressure moves the position to the right because there are fewer moles of gas on the right (2 against 4)",
      "so the equilibrium yield of ammonia increases",
      "Higher pressure also increases the rate (more frequent collisions)",
      "but very high pressures need expensive thick-walled equipment and compressors (and are more hazardous), so about 200 atm is a compromise",
    ],
    modelAnswer: "There are 4 mol of gas on the left and 2 mol on the right, so a high pressure moves the position of equilibrium to the right and increases the yield. It also increases the concentration of gas molecules and so the rate. However, generating and containing very high pressures needs costly compressors and thick-walled plant and increases the risk of leaks, so about 200 atm is a compromise between yield, rate, cost and safety.",
    hints: ["Mention yield, rate and cost."],
    explanation: "A full answer covers equilibrium, rate and the economic or safety limit.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 3,
    stem: "Ammonia gas made in the laboratory is collected by upward delivery (downward displacement of air), not over water. Explain both parts of this choice, and give one safety precaution.",
    points: ["Ammonia is less dense than air, so it rises and displaces air downwards", "Ammonia is very soluble in water, so it cannot be collected over water", "Work in a fume cupboard (ammonia is toxic and irritating) or wear eye protection"],
    modelAnswer: "Ammonia is less dense than air, so it collects at the top of an inverted gas jar, pushing air out below. It is extremely soluble in water, so collecting it over water would lose most of it. It is toxic and irritates the eyes and lungs, so the preparation is done in a fume cupboard with eye protection.",
    hints: ["Think about density and solubility."],
    explanation: "Collection method follows from density and solubility.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 3,
    stem: "A student suggests running the Contact process at 200 °C to increase the yield of sulfur trioxide. Evaluate this suggestion.",
    points: ["The forward reaction is exothermic, so a lower temperature would increase the equilibrium yield", "but the rate would be very slow (too few molecules with energy ≥ Ea; the catalyst works poorly at low temperature)", "so less SO₃ would be made per hour: the suggestion is not economic; 400–450 °C is a better compromise"],
    modelAnswer: "The student is right that the equilibrium yield would be higher, because the forward reaction is exothermic. But at 200 °C very few collisions have enough energy to react, even with the catalyst, so equilibrium would be approached far too slowly. The plant would make less sulfur trioxide per hour, so the suggestion is not sensible; about 400–450 °C balances rate and yield.",
    hints: ["Consider yield and rate separately."],
    explanation: "Yield favours low temperature; rate favours high temperature.",
  });
  // Structured: Contact process data
  {
    const Ts = [700, 800, 900, 1000];
    const conv = Ts.map((T) => rnd(contactConversion(T), 1));
    const c700 = conv[1];
    const mSO3 = 1.0 * (c700 / 100) * (Mr("SO3") / Mr("SO2"));
    b.struct({
      d: 5, skill: "ANALYSIS", examStyle: true, calculator: true,
      stem: t`The table shows calculated equilibrium conversions of sulfur dioxide into sulfur trioxide for a 2 : 1 mixture of $\ce{SO2}$ and $\ce{O2}$ at 1 atm:

$\ce{2SO2(g) + O2(g) <=> 2SO3(g)}$

| Temperature / K | ${Ts.join(" | ")} |
|---|---|---|---|---|
| SO₂ converted at equilibrium / % | ${conv.map((c) => dpStr(c, 1)).join(" | ")} |`,
      parts: [
        P.short({ label: "(a)", marks: 1, stem: "Use the data to state whether the forward reaction is exothermic or endothermic.", accepted: ["exothermic", "it is exothermic"], wrong: ["endothermic"], explanation: "Conversion falls as temperature rises." }),
        P.manual({ label: "(b)", marks: 2, stem: "Explain your answer to (a).", points: ["The conversion decreases as the temperature increases", "Higher temperature moves the position in the endothermic direction; here that is to the left, so the forward reaction is exothermic"], modelAnswer: "As the temperature rises the percentage converted falls, so the position moves to the left. A rise in temperature favours the endothermic direction, so the reverse reaction is endothermic and the forward reaction exothermic." }),
        P.num({ label: "(c)", marks: 2, stem: `Calculate the mass of sulfur trioxide, in tonnes, formed from 1.00 tonne of sulfur dioxide at 800 K if the conversion shown in the table is reached. (Mr: SO₂ 64.1, SO₃ 80.1)`, value: mSO3, sf: 3, unit: "tonnes", wrong: [sfStr(c700 / 100, 3)], explanation: `SO₂ converted = ${dpStr(c700 / 100, 3)} t; SO₂ : SO₃ = 1 : 1 in moles, so mass of SO₃ = ${dpStr(c700 / 100, 3)} × 80.1/64.1 = ${sfStr(mSO3, 3)} t.` }),
        P.mcq({ label: "(d)", marks: 1, stem: "What would be the effect of increasing the pressure to 10 atm at 800 K?", options: [
          ["The conversion would increase slightly.", "Correct: 3 mol of gas become 2 mol, so higher pressure moves the position right."],
          ["The conversion would decrease slightly.", "Higher pressure favours the side with fewer moles of gas, the products."],
          ["The conversion would not change.", "The moles of gas differ on the two sides, so pressure has an effect."],
          ["Kp would increase, so the conversion would rise.", "Kp is unchanged at constant temperature."],
        ], answer: "A", explanation: "Fewer moles of gas on the right." }),
        P.manual({ label: "(e)", marks: 3, stem: "The process is operated at about 400–450 °C with a vanadium(V) oxide catalyst. Explain why this temperature is chosen rather than a lower one.", points: ["A lower temperature would give a higher equilibrium conversion (forward reaction exothermic)", "but the rate would be too slow (fewer molecules with energy ≥ Ea; catalyst less effective)", "400–450 °C with the catalyst gives a high conversion at an economic rate: a compromise"], modelAnswer: "A lower temperature would increase the equilibrium conversion because the reaction is exothermic. However, the rate would be much slower because fewer molecules would have the activation energy, even with the catalyst. At about 400–450 °C with V₂O₅ the conversion is still high and equilibrium is reached quickly, so this is a compromise." }),
        P.group({ label: "(f)", stem: "Sulfur trioxide is converted into sulfuric acid.", parts: [
          P.short({ label: "(i)", marks: 1, stem: "Give the formula of the substance formed when SO₃ is absorbed in concentrated sulfuric acid.", accepted: ["H2S2O7", "H₂S₂O₇"], normalise: ["trim", "collapse_whitespace"], wrong: ["H2SO4"], explanation: "Oleum, H₂S₂O₇." }),
          P.manual({ label: "(ii)", marks: 1, stem: "State why SO₃ is not absorbed directly in water.", points: ["The reaction is very exothermic and produces a mist of sulfuric acid droplets that is hard to condense"], modelAnswer: "The reaction with water is so exothermic that it forms an acid mist that escapes." }),
        ] }),
        P.mcq({ label: "(g)", marks: 1, stem: "What is the effect of the catalyst on the conversions shown in the table?", options: [
          ["None: it only makes equilibrium arrive sooner.", "Correct: catalysts do not change the position of equilibrium."],
          ["It raises every conversion by the same amount.", "A catalyst cannot change an equilibrium conversion."],
          ["It raises the conversion only at the lower temperatures.", "The equilibrium position is the same with or without a catalyst."],
          ["It lowers the conversion at the higher temperatures.", "Catalysts never reduce the equilibrium yield."],
        ], answer: "A", explanation: "Calculated equilibrium values are unaffected by a catalyst." }),
      ],
      hints: ["Read the trend in the table.", "The SO₂ : SO₃ mole ratio is 1 : 1."],
      explanation: `The forward reaction is exothermic; at 800 K ${dpStr(c700, 1)}% conversion gives ${sfStr(mSO3, 3)} t of SO₃ per tonne of SO₂; higher pressure slightly increases conversion; the temperature is a compromise; SO₃ is absorbed as oleum.`,
    });
  }
  // Structured: laboratory preparation of ammonium sulfate
  {
    const nNH3 = molesFromSolution(25.0, 1.6);
    const nAcid = nNH3 / 2;
    const vAcid = (nAcid / 0.8) * 1000;
    const mSalt = nAcid * Mr("(NH4)2SO4");
    b.struct({
      d: 4, skill: "APPLICATION", examStyle: true, calculator: true,
      stem: t`Nyasha prepares crystals of ammonium sulfate fertiliser. She titrates 25.0 cm³ of 1.60 mol dm⁻³ aqueous ammonia with 0.800 mol dm⁻³ sulfuric acid using methyl orange, then repeats the titration with the same volumes but without indicator, and evaporates the solution:

$\ce{2NH3(aq) + H2SO4(aq) -> (NH4)2SO4(aq)}$

(Ar: H 1.0, N 14.0, O 16.0, S 32.1)`,
      parts: [
        P.num({ label: "(a)", marks: 1, stem: "Calculate the amount, in mol, of ammonia in 25.0 cm³ of the solution.", value: nNH3, sf: 3, unit: "mol", explanation: `25.0/1000 × 1.60 = ${sfStr(nNH3, 3)} mol.` }),
        P.num({ label: "(b)", marks: 2, stem: "Calculate the volume, in cm³, of sulfuric acid needed to neutralise the ammonia.", value: vAcid, sf: 3, unit: "cm³", wrong: [sfStr(vAcid * 2, 3)], explanation: `n(H₂SO₄) = ${sfStr(nNH3, 3)}/2 = ${sfStr(nAcid, 3)} mol; V = ${sfStr(nAcid, 3)}/0.800 × 1000 = ${sfStr(vAcid, 3)} cm³. Ignoring the 2 : 1 ratio gives ${sfStr(vAcid * 2, 3)} cm³.` }),
        P.num({ label: "(c)", marks: 2, stem: "Calculate the maximum mass, in g, of ammonium sulfate that could be obtained.", value: mSalt, sf: 3, unit: "g", wrong: [sfStr(nNH3 * Mr("(NH4)2SO4"), 3)], explanation: `n((NH₄)₂SO₄) = ${sfStr(nAcid, 3)} mol; Mr = ${dpStr(Mr("(NH4)2SO4"), 1)}; mass = ${sfStr(mSalt, 3)} g.` }),
        P.manual({ label: "(d)", marks: 2, stem: "Explain why the titration is repeated without the indicator, and why the solution is evaporated only until crystals start to form.", points: ["Without indicator the crystals are not contaminated (coloured) by methyl orange", "Evaporating only to the crystallisation point and cooling gives well-formed crystals (and avoids decomposing the salt / spitting)"], modelAnswer: "The indicator would contaminate the product, so the known volumes are mixed again without it. The solution is heated only until crystals start to appear and then left to cool, so that pure, well-formed crystals grow and the ammonium sulfate is not overheated or lost by spitting." }),
        P.manual({ label: "(e)", marks: 1, stem: "State one safety precaution for this preparation.", points: ["Wear eye protection (sulfuric acid and ammonia are corrosive/irritant), or work in a well-ventilated area or fume cupboard because of ammonia fumes"], modelAnswer: "Wear eye protection, because both solutions are irritant or corrosive." }),
      ],
      hints: ["Use the 2 : 1 mole ratio of NH₃ to H₂SO₄."],
      explanation: `n(NH₃) = ${sfStr(nNH3, 3)} mol; ${sfStr(vAcid, 3)} cm³ of acid; at most ${sfStr(mSalt, 3)} g of ammonium sulfate.`,
    });
  }
  b.card("FACT", "Haber process conditions", "N₂ + 3H₂ ⇌ 2NH₃ (ΔH = −92 kJ mol⁻¹): iron catalyst, about 200 atm, about 400–450 °C; ammonia liquefied out, gases recycled.");
  b.card("FACT", "Contact process conditions", "2SO₂ + O₂ ⇌ 2SO₃ (ΔH = −197 kJ mol⁻¹): V₂O₅ catalyst, about 1–2 atm, about 400–450 °C, slight excess of air.");
  b.card("FACT", "Absorbing SO₃", "SO₃ + H₂SO₄ → H₂S₂O₇ (oleum); H₂S₂O₇ + H₂O → 2H₂SO₄. Not into water: acid mist forms.");
  b.card("CONCEPT", "Why 400–450 °C?", "Lower temperature gives a higher yield (exothermic) but too slow a rate: a compromise.");
  b.card("CONCEPT", "Why only 1–2 atm in the Contact process?", "The equilibrium already lies far to the right; compression would cost more than it gains.");
  b.card("FACT", "Sources of N₂ and H₂", "N₂ from air (fractional distillation of liquid air); H₂ from steam reforming of methane (CH₄ + H₂O → CO + 3H₂) or electrolysis of water.");
  b.card("FACT", "Uses of ammonia", "Fertilisers (ammonium nitrate, ammonium sulfate, urea), nitric acid, explosives.");
  b.card("FACT", "Uses of sulfuric acid", "Fertilisers, detergents, car batteries, paints and pigments, chemical industry.");
  b.card("FACT", "Laboratory ammonia", "Heat NH₄Cl with Ca(OH)₂; dry with CaO; collect by upward delivery; turns damp red litmus blue.");
});
