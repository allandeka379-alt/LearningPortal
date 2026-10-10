// W2a: achem.equilibria.dynamic-le-chatelier (both boards; ZIMSEC Form 5, Cambridge AS Level)
import { concept, P, t, ce, dpStr, rnd } from "../lib.mjs";

// Equilibrium percentage of AB3 for A2 + 3B2 <=> 2AB3 with a 1:3 feed (ideal gases, Kp from ΔH and ΔS, p in atm).
function yieldAB3(T, p, dH = -92000, dS = -194.5) {
  const Kp = Math.exp(-dH / (8.31 * T) + dS / 8.31);
  const f = (x) => { const tot = 4 - 2 * x; return ((2 * x) / tot) ** 2 / (((1 - x) / tot) * ((3 - 3 * x) / tot) ** 3 * p * p) - Kp; };
  let lo = 1e-9, hi = 1 - 1e-12;
  for (let i = 0; i < 200; i++) { const m = (lo + hi) / 2; if (f(m) > 0) hi = m; else lo = m; }
  const x = (lo + hi) / 2;
  return ((2 * x) / (4 - 2 * x)) * 100;
}

concept("achem.equilibria.dynamic-le-chatelier", { file: "equilibria/dynamic-le-chatelier", keyPrefix: "equilibria.dynamic-le-chatelier" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which statement describes a reversible reaction in dynamic equilibrium in a closed system?",
    options: [
      ["The forward and reverse reactions continue at equal rates.", "Correct: both reactions carry on, at the same rate, so concentrations stay constant."],
      ["The concentrations of reactants and products are equal to each other.", "The concentrations are constant, but they are almost never equal."],
      ["The forward and reverse reactions have both stopped completely.", "Nothing stops: that is why the equilibrium is called dynamic."],
      ["The rate of the forward reaction is greater than that of the reverse.", "If the forward rate were greater, product concentrations would still be rising."],
    ],
    answer: "A",
    explanation: "At dynamic equilibrium both reactions continue at the same rate, so the concentrations of all species stay constant (but are not usually equal).",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: t`The equilibrium $\ce{N2O4(g) <=> 2NO2(g)}$ is set up in a sealed syringe; $\ce{N2O4}$ is colourless and $\ce{NO2}$ is brown. The forward reaction is endothermic. Which change moves the position of equilibrium to the right?`,
    options: [
      ["Raising the temperature at constant pressure", "Correct: higher temperature favours the endothermic (forward) direction, so more brown NO₂ forms."],
      ["Pushing the plunger in to increase the pressure", "Higher pressure favours the side with fewer moles of gas, which is the left (1 mol against 2 mol)."],
      ["Cooling the syringe in iced water at constant pressure", "Cooling favours the exothermic (reverse) direction, moving the position to the left."],
      ["Adding a catalyst to the mixture of gases", "A catalyst speeds up both directions equally and does not move the position."],
    ],
    answer: "A",
    explanation: "Le Chatelier: a rise in temperature is opposed by the endothermic direction, here the forward reaction. Pressure would move the position to the side with fewer gas molecules (left).",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is the effect of adding a catalyst to a reaction mixture that has not yet reached equilibrium?",
    options: [
      ["Equilibrium is reached sooner, with the same composition.", "Correct: forward and reverse rates rise by the same factor, so only the time taken changes."],
      ["The equilibrium yield of products increases at the same temperature.", "A catalyst cannot change the position of equilibrium or the yield."],
      ["The forward reaction is speeded up but the reverse is not affected.", "The lower-energy pathway is available in both directions, so both are speeded up."],
      ["The value of the equilibrium constant increases because Ea falls.", "K depends only on temperature; a catalyst does not change it."],
    ],
    answer: "A",
    explanation: "A catalyst lowers the activation energy of the forward and reverse reactions equally, so equilibrium is reached faster but its position and K are unchanged.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: t`For $\ce{2SO2(g) + O2(g) <=> 2SO3(g)}$, ΔH = −197 kJ mol⁻¹. Which change alters the value of the equilibrium constant?`,
    options: [
      ["Raising the temperature from 450 °C to 550 °C", "Correct: temperature is the only one of these changes that alters K; for an exothermic reaction K falls as T rises."],
      ["Doubling the total pressure at constant temperature", "Pressure moves the position, but K is unchanged at constant temperature."],
      ["Removing sulfur trioxide as it forms at constant temperature", "Removing a product moves the position right, but K is unchanged."],
      ["Adding vanadium(V) oxide catalyst at constant temperature", "A catalyst changes neither the position nor K."],
    ],
    answer: "A",
    hints: ["Only one kind of change affects the constant itself."],
    explanation: "Changes in concentration and pressure (and catalysts) leave K unchanged; the system adjusts the concentrations until the ratio again equals K. A change in temperature changes K.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which statements about a system in dynamic equilibrium are correct?\n\n1. The equilibrium can be reached by starting from the reactants or from the products.\n2. Macroscopic properties such as colour and pressure stay constant.\n3. The system must be open so that energy can enter and leave.",
    options: [
      ["1 and 2 only", "Correct: statement 3 is wrong because the system must be closed (no matter enters or leaves; energy may)."],
      ["1, 2 and 3", "Statement 3 is false: an open system lets products escape, so equilibrium cannot be set up."],
      ["2 and 3 only", "Statement 1 is true and statement 3 is false."],
      ["1 only", "Statement 2 is also true: constant concentrations mean constant colour and pressure."],
    ],
    answer: "A",
    hints: ["What does a closed system keep in, and what may it exchange?"],
    explanation: "Equilibrium can be approached from either side, and constant concentrations give constant observable properties. A closed system keeps matter in; it may still exchange energy.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: t`For $\ce{CO(g) + 2H2(g) <=> CH3OH(g)}$, ΔH = −91 kJ mol⁻¹. Which changes would increase the equilibrium yield of methanol?\n\n1. Increasing the total pressure\n2. Decreasing the temperature\n3. Using a more active catalyst`,
    options: [
      ["1 and 2 only", "Correct: higher pressure favours the side with fewer moles of gas (1 against 3) and lower temperature favours the exothermic direction."],
      ["1, 2 and 3", "A catalyst does not change the equilibrium yield, so statement 3 is wrong."],
      ["2 and 3 only", "Statement 1 is correct and statement 3 is not."],
      ["1 only", "Statement 2 is also correct: the forward reaction is exothermic."],
    ],
    answer: "A",
    hints: ["Count moles of gas on each side.", "Which direction is exothermic?"],
    explanation: "Three moles of gas become one, so higher pressure moves the position right. The forward reaction is exothermic, so lower temperature also moves it right. A catalyst only changes how fast equilibrium is reached.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: t`Aqueous potassium chromate(VI) is yellow. It is in equilibrium with dichromate(VI) ions: $\ce{2CrO4^2-(aq) + 2H+(aq) <=> Cr2O7^2-(aq) + H2O(l)}$. Dilute sulfuric acid is added and then aqueous sodium hydroxide is added in excess. What colour changes are seen?`,
    options: [
      ["Yellow to orange, then orange back to yellow", "Correct: acid moves the position right (orange); hydroxide removes H⁺ and moves it back left (yellow)."],
      ["Yellow to orange, then orange to green", "Green would need chromium(III), which forms only by reduction; no redox happens here."],
      ["Orange to yellow, then yellow back to orange", "This reverses the effects: added H⁺ moves the position towards dichromate(VI)."],
      ["Yellow to green, then green back to yellow", "Chromium stays in oxidation state +6 throughout, so no green Cr³⁺ forms."],
    ],
    answer: "A",
    hints: ["Which side of the equation contains H⁺?"],
    explanation: "Adding H⁺ moves the position right (orange Cr₂O₇²⁻). OH⁻ reacts with H⁺ to form water, lowering [H⁺], so the position moves left (yellow CrO₄²⁻).",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: t`For $\ce{2SO2(g) + O2(g) <=> 2SO3(g)}$, ΔH is negative. Which single change increases both the rate of the forward reaction and the equilibrium yield of sulfur trioxide?`,
    options: [
      ["Increasing the total pressure", "Correct: higher concentrations of gas speed up the reaction, and the position moves to the side with fewer moles of gas (2 against 3)."],
      ["Increasing the temperature", "This increases the rate but lowers the yield, because the forward reaction is exothermic."],
      ["Adding a catalyst", "This increases the rate but has no effect on the equilibrium yield."],
      ["Decreasing the temperature", "This increases the yield but lowers the rate."],
    ],
    answer: "A",
    hints: ["Think about rate and position separately for each change."],
    explanation: "Raising the pressure increases the concentration of gas molecules (more frequent collisions, faster rate) and, by Le Chatelier, moves the position towards the 2 mol of SO₃(g). Temperature and catalysts cannot do both.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: t`Increasing the pressure on the equilibrium $\ce{H2(g) + I2(g) <=> 2HI(g)}$ moves the position of equilibrium to the right.`,
    answer: false,
    explanation: "False. There are 2 mol of gas on each side, so pressure has no effect on the position (it does increase both rates).",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "For a reaction whose forward direction is endothermic, the value of the equilibrium constant increases when the temperature is raised.",
    answer: true,
    explanation: "True. A rise in temperature moves the position in the endothermic direction, here towards the products, so the ratio of products to reactants at equilibrium (K) increases.",
  });
  b.match({
    d: 3, skill: "APPLICATION",
    stem: t`The equilibrium $\ce{N2(g) + O2(g) <=> 2NO(g)}$ has ΔH = +181 kJ mol⁻¹. Match each change with its effect on the position of equilibrium.`,
    pairs: [
      ["raising the temperature", "moves to the right"],
      ["adding more nitrogen monoxide", "moves to the left"],
      ["raising the total pressure", "no change: 2 mol of gas on each side"],
      ["adding a platinum catalyst", "no change: both rates rise equally"],
    ],
    hints: ["Count the moles of gas on each side before deciding about pressure."],
    explanation: "The forward reaction is endothermic, so heating moves the position right. Adding a product moves it left. Equal moles of gas mean pressure has no effect, and catalysts never move the position.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the statement of Le Chatelier's principle.",
    template: "If a change is made to the conditions of a system in dynamic {{blank:a}}, the position of equilibrium moves so as to {{blank:b}} the change.",
    blanks: [
      { id: "a", accepted: ["equilibrium"], choices: ["equilibrium", "motion", "solution"] },
      { id: "b", accepted: ["oppose"], choices: ["oppose", "increase", "repeat"] },
    ],
    explanation: "Le Chatelier's principle: the position of a dynamic equilibrium moves to oppose (reduce the effect of) a change in conditions.",
  });
  b.short({
    d: 2, skill: "APPLICATION",
    stem: t`State the only change in conditions that alters the value of the equilibrium constant for $\ce{N2(g) + 3H2(g) <=> 2NH3(g)}$.`,
    accepted: ["temperature", "changing the temperature", "a change in temperature", "change of temperature", "temp", "changing temperature"],
    wrong: ["pressure"],
    explanation: "Temperature. Pressure, concentration and catalysts change the position or the rate, but not K.",
  });
  b.short({
    d: 3, skill: "APPLICATION",
    stem: t`When a can of fizzy drink is opened, bubbles form. Name the gas whose dissolving equilibrium, $\ce{X(g) <=> X(aq)}$, moves to the left when the pressure above the drink falls.`,
    accepted: ["carbon dioxide", "CO2", "co₂", "carbon(IV) oxide"],
    wrong: ["oxygen"],
    hints: ["Which gas is dissolved under pressure to make drinks fizzy?"],
    explanation: "Carbon dioxide is dissolved under pressure. Lowering the pressure moves CO₂(g) ⇌ CO₂(aq) to the left (the side with gas), so CO₂ comes out of solution.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain why an equilibrium mixture is described as *dynamic*.",
    points: ["Both the forward and the reverse reactions are still taking place", "at the same rate, so the concentrations do not change (constant composition)"],
    modelAnswer: "The forward and reverse reactions do not stop; they continue at equal rates, so there is no overall change in the concentrations even though particles are still reacting.",
    explanation: "Dynamic means both reactions continue; equilibrium means the rates are equal.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: t`Calcium carbonate is heated strongly in two experiments: in an open crucible and in a sealed steel container. Explain why the decomposition, $\ce{CaCO3(s) <=> CaO(s) + CO2(g)}$, goes to completion in one experiment but reaches equilibrium in the other.`,
    points: [
      "In the open crucible carbon dioxide escapes (open system)",
      "so the reverse reaction cannot take place and all the CaCO₃ decomposes",
      "In the sealed container CO₂ is kept in a closed system, so the reverse reaction occurs and its rate rises until it equals the forward rate",
    ],
    modelAnswer: "In the open crucible the carbon dioxide escapes, so it cannot react with calcium oxide and the reverse reaction never happens: the decomposition goes to completion. In the sealed container the carbon dioxide stays in a closed system; as it builds up, the reverse reaction speeds up until the two rates are equal and a dynamic equilibrium is reached.",
    hints: ["What can leave an open system?"],
    explanation: "Equilibrium needs a closed system so that products are available to react back.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: t`For $\ce{2NO2(g) <=> N2O4(g)}$ (brown NO₂, colourless N₂O₄), the gas mixture in a sealed syringe becomes paler when it is cooled. When the plunger is pushed in quickly, the colour first darkens and then becomes paler. Explain both observations.`,
    points: [
      "Cooling moves the position right (towards N₂O₄), so the forward reaction must be exothermic",
      "Pushing the plunger in compresses the gas, so the concentration of NO₂ (molecules per unit volume) increases at once: darker",
      "The higher pressure is opposed by moving the position to the side with fewer moles of gas (1 mol N₂O₄ against 2 mol NO₂)",
      "so some brown NO₂ is converted to colourless N₂O₄ and the colour becomes paler (but not as pale as before compression)",
    ],
    modelAnswer: "On cooling the mixture goes paler, so the position moves towards colourless N₂O₄: the system opposes the fall in temperature by moving in the exothermic direction, so the forward reaction is exothermic. When the plunger is pushed in, the same molecules occupy a smaller volume, so the concentration of NO₂ rises immediately and the colour darkens. The system then opposes the increase in pressure by moving towards the side with fewer gas molecules (1 mol of N₂O₄ against 2 mol of NO₂), so the colour becomes paler again, although the new mixture is still darker than the original because its NO₂ concentration is higher.",
    hints: ["Separate the instant effect of squeezing the gas from the shift in position."],
    explanation: "Compression first raises every concentration; the shift in position follows.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2,
    stem: t`Hard water containing calcium hydrogencarbonate forms limescale when it is boiled in a kettle: $\ce{Ca(HCO3)2(aq) <=> CaCO3(s) + CO2(g) + H2O(l)}$. Explain, using Le Chatelier's principle, why boiling causes limescale to form.`,
    points: ["Boiling drives carbon dioxide out of the (open) kettle, removing a product", "so the position moves to the right to replace it, forming insoluble calcium carbonate (scale)"],
    modelAnswer: "Carbon dioxide is less soluble in hot water and escapes from the open kettle. Removing a product makes the position of equilibrium move to the right, so more insoluble calcium carbonate forms as limescale.",
    hints: ["What happens to the gas when water boils?"],
    explanation: "Removing a product moves the position towards the products.",
  });
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true,
    stem: t`When aqueous iron(III) chloride is mixed with aqueous potassium thiocyanate, a deep red complex ion forms:

$\ce{Fe^3+(aq) + SCN-(aq) <=> [FeSCN]^2+(aq)}$

The forward reaction is exothermic. Iron(III) ions are pale yellow and thiocyanate ions are colourless.`,
    parts: [
      P.mcq({ label: "(a)", marks: 1, stem: "A few crystals of potassium thiocyanate are dissolved in some of the equilibrium mixture. What is seen?", options: [
        ["The red colour becomes deeper.", "Correct: more SCN⁻ moves the position right, forming more red complex."],
        ["The red colour becomes paler.", "That would follow from removing SCN⁻, not adding it."],
        ["There is no change in colour.", "Adding a reactant always moves the position of a homogeneous equilibrium."],
        ["A red precipitate forms in the solution.", "The complex is soluble; the change is in the intensity of colour."],
      ], answer: "A", explanation: "Adding a reactant moves the position to the right." }),
      P.manual({ label: "(b)", marks: 2, stem: "Explain your answer to (a) using Le Chatelier's principle.", points: ["Adding SCN⁻ increases the concentration of a reactant", "so the position moves to the right to use up (oppose) some of the added SCN⁻, forming more [FeSCN]²⁺"], modelAnswer: "The concentration of SCN⁻ increases, so the system opposes the change by moving the position of equilibrium to the right, using up some of the thiocyanate and forming more of the red complex." }),
      P.fib({ label: "(c)", marks: 2, stem: "Another portion of the mixture is warmed.", template: "On warming, the red colour becomes {{blank:a}} and the value of the equilibrium constant {{blank:b}}.", blanks: [
        { id: "a", accepted: ["paler"], choices: ["paler", "deeper", "unchanged"] },
        { id: "b", accepted: ["decreases"], choices: ["decreases", "increases", "stays the same"] },
      ], explanation: "Raising the temperature favours the endothermic (reverse) direction: less complex, paler colour, smaller K." }),
      P.manual({ label: "(d)", marks: 2, stem: "Sodium fluoride solution is added to a third portion. Fluoride ions form a colourless complex with iron(III) ions. Suggest and explain what is seen.", points: ["The red colour becomes paler", "Fluoride removes Fe³⁺ (a reactant), so the position moves left to replace it and [FeSCN]²⁺ decomposes"], modelAnswer: "The solution becomes paler. Fluoride ions remove Fe³⁺ ions, lowering the concentration of a reactant, so the position of equilibrium moves to the left and some of the red complex breaks down." }),
      P.tf({ label: "(e)", marks: 1, stem: "Adding a catalyst would make the red colour deeper.", answer: false, explanation: "A catalyst does not change the position of equilibrium." }),
    ],
    hints: ["Decide which side each change favours.", "Exothermic forward means the reverse is endothermic."],
    explanation: "Adding SCN⁻ deepens the colour; warming makes it paler and lowers K; removing Fe³⁺ makes it paler; a catalyst has no effect on the colour.",
  });
  {
    const Ts = [600, 700, 800];
    const ps = [50, 100, 200];
    const y = Ts.map((T) => ps.map((p) => rnd(yieldAB3(T, p), 1)));
    const yUsed = y[1][1]; // 700 K, 100 atm, as displayed
    const conv = ((2 * (yUsed / 100)) / (1 + yUsed / 100)) * 100; // % of B2 converted (1:3 feed)
    const rows = Ts.map((T, i) => `| ${T} | ${y[i].map((v) => dpStr(v, 1)).join(" | ")} |`).join("\n");
    b.struct({
      d: 5, skill: "ANALYSIS", examStyle: true, calculator: true,
      stem: t`A gas-phase reaction is studied in a closed reactor: $\ce{A2(g) + 3B2(g) <=> 2AB3(g)}$. The reactants are mixed in the mole ratio 1 : 3. The table shows the percentage of $\ce{AB3}$ in the equilibrium mixture under different conditions.

| Temperature / K | 50 atm | 100 atm | 200 atm |
|---|---|---|---|
${rows}`,
      parts: [
        P.short({ label: "(a)", marks: 1, stem: "State whether the forward reaction is exothermic or endothermic.", accepted: ["exothermic", "it is exothermic", "exo"], wrong: ["endothermic"], explanation: "The percentage of AB₃ falls as the temperature rises." }),
        P.manual({ label: "(b)", marks: 2, stem: "Explain how the data support your answer to (a).", points: ["At each pressure the percentage of AB₃ decreases as the temperature increases", "A rise in temperature moves the position in the endothermic direction, here to the left, so the forward direction is exothermic"], modelAnswer: "At every pressure the percentage of AB₃ falls as the temperature rises. By Le Chatelier's principle a higher temperature favours the endothermic direction; since the position moves to the left, the reverse reaction is endothermic and the forward reaction is exothermic." }),
        P.short({ label: "(c)", marks: 1, stem: "State which side of the equation has fewer moles of gas: the left or the right.", accepted: ["right", "the right", "right-hand side", "right hand side", "products", "the products", "rhs"], wrong: ["left"], explanation: "4 mol of gas on the left, 2 mol on the right." }),
        P.manual({ label: "(d)", marks: 2, stem: "Explain why the percentage of AB₃ increases with pressure at constant temperature.", points: ["Increasing the pressure is opposed by moving the position to the side with fewer moles of gas", "The right-hand side has 2 mol of gas against 4 mol on the left, so more AB₃ forms"], modelAnswer: "The system opposes an increase in pressure by moving the position towards the side with fewer gas molecules. There are 2 mol of gas on the right and 4 mol on the left, so the position moves right and the percentage of AB₃ increases." }),
        P.mcq({ label: "(e)", marks: 1, stem: "A catalyst is added to the reactor at 700 K and 100 atm. What happens to the percentage of AB₃ at equilibrium?", options: [
          [`It stays at ${dpStr(yUsed, 1)}%.`, "Correct: a catalyst does not move the position of equilibrium."],
          [`It rises above ${dpStr(yUsed, 1)}%.`, "A catalyst does not increase the equilibrium yield."],
          [`It falls below ${dpStr(yUsed, 1)}%.`, "A catalyst does not reduce the yield either."],
          [`It becomes ${dpStr(y[0][1], 1)}%, the 600 K value.`, "The composition depends on temperature, not on the catalyst."],
        ], answer: "A", explanation: "Only the time taken to reach equilibrium changes." }),
        P.num({ label: "(f)", marks: 2, stem: `At 700 K and 100 atm the equilibrium mixture contains ${dpStr(yUsed, 1)}% AB₃ by moles. Starting from 1 mol of A₂ and 3 mol of B₂, the amount of AB₃ is 2x mol and the total amount of gas is (4 − 2x) mol. Calculate the percentage of the B₂ that has been converted (equal to 100x), to three significant figures.`, value: conv, sf: 3, unit: "%", wrong: [dpStr(yUsed, 1)], explanation: `Mole fraction 2x/(4 − 2x) = ${dpStr(yUsed / 100, 3)}, so x = 2(${dpStr(yUsed / 100, 3)}) ÷ (1 + ${dpStr(yUsed / 100, 3)}) and the conversion is ${dpStr(conv, 1)}%. The percentage of AB₃ in the mixture is not the same as the percentage of reactant converted.` }),
        P.manual({ label: "(g)", marks: 3, stem: "A manufacturer chooses to run the reaction at 700 K rather than 600 K. Suggest why, even though the equilibrium percentage of AB₃ is lower.", points: ["At 600 K the rate is too slow (fewer particles have energy at least equal to the activation energy)", "At 700 K equilibrium (or an acceptable conversion) is reached much faster, so more product is made per hour", "The temperature is a compromise between rate and equilibrium yield (unreacted gases can be recycled)"], modelAnswer: "At 600 K the yield at equilibrium is higher, but the reaction is very slow because few collisions have enough energy to overcome the activation energy. At 700 K the reaction is much faster, so more AB₃ is produced per hour even though the equilibrium percentage is lower; unreacted gases can be recycled. The temperature is therefore a compromise between rate and yield." }),
      ],
      hints: ["Read across a row for pressure, down a column for temperature.", "For (f), rearrange y = 2x/(4 − 2x) to x = 2y/(1 + y)."],
      explanation: `Exothermic forward reaction; fewer moles of gas on the right, so higher pressure raises the percentage of AB₃; a catalyst changes nothing at equilibrium; ${dpStr(conv, 1)}% of the B₂ is converted at 700 K and 100 atm; the operating temperature is a rate-yield compromise.`,
    });
  }
  b.card("DEFINITION", "Dynamic equilibrium", "In a closed system, the forward and reverse reactions continue at equal rates, so the concentrations of all species stay constant.");
  b.card("DEFINITION", "Le Chatelier's principle", "If the conditions of a system in dynamic equilibrium are changed, the position of equilibrium moves to oppose the change.");
  b.card("CONCEPT", "Effect of pressure", "Higher pressure moves the position to the side with fewer moles of gas; no effect if the numbers of moles of gas are equal.");
  b.card("CONCEPT", "Effect of temperature", "Higher temperature moves the position in the endothermic direction; lower temperature in the exothermic direction.");
  b.card("CONCEPT", "Effect of a catalyst", "Speeds up forward and reverse reactions equally: equilibrium reached sooner, no change in position, yield or K.");
  b.card("FACT", "What changes the value of K?", "Only temperature. Concentration and pressure change the position but not K.");
  b.card("FACT", "Chromate(VI) ⇌ dichromate(VI) colours", "CrO₄²⁻ is yellow, Cr₂O₇²⁻ is orange; adding acid gives orange, adding alkali gives yellow.");
  b.card("CONCEPT", "Why a closed system?", "Products must stay in contact with the reactants so the reverse reaction can occur; an open system lets gases escape.");
  b.card("FACT", "Fizzy drink equilibrium", "CO₂(g) ⇌ CO₂(aq): opening the bottle lowers the pressure, so CO₂ comes out of solution.");
});
