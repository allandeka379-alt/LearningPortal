// W1a: water.
import { concept, P, t, chk } from "../lib.mjs";

concept("abio.molecules.water", { file: "molecules/water", keyPrefix: "molecules.water" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Why is a water molecule described as polar?",
    options: [
      ["Its oxygen is slightly negative and its hydrogens slightly positive", "Correct: oxygen pulls the shared electrons towards itself, and the bent shape keeps the charges apart."],
      ["It contains ionic bonds between hydrogen and oxygen atoms", "The bonds within water are covalent, not ionic."],
      ["It is made of two different elements in a straight line", "Water is bent, and having two elements does not by itself make a molecule polar."],
      ["It carries an overall negative charge on the whole molecule", "Water is neutral overall; only the charge distribution is uneven."],
    ],
    answer: "A",
    explanation: "Oxygen is more electronegative than hydrogen, so the shared electrons are pulled towards it (δ−), leaving the hydrogens δ+. The bent shape means the molecule has a negative end and a positive end.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which property of water explains why sweating cools the skin?",
    options: [
      ["High latent heat of vaporisation", "Correct: evaporation absorbs a lot of energy from the skin."],
      ["High specific heat capacity", "This keeps temperatures stable; it is not the cooling effect of evaporation."],
      ["Maximum density at about 4 °C", "Density affects how ice forms on lakes, not cooling by sweat."],
      ["High surface tension", "Surface tension supports small animals on water; it does not cool the skin."],
    ],
    answer: "A",
    explanation: "Many hydrogen bonds must be broken for water to evaporate, so each gram of sweat that evaporates removes about 2.4 kJ of heat from the body.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why does sodium chloride dissolve in water?",
    options: [
      ["Water molecules surround the ions, δ− oxygens facing Na⁺ and δ+ hydrogens facing Cl⁻", "Correct: the polar water molecules attract and separate the ions."],
      ["Water molecules form covalent bonds with the sodium and chloride ions", "Water attracts ions; it does not form covalent bonds with them."],
      ["Sodium chloride is non-polar, like the hydrocarbon tails of lipids", "Sodium chloride is ionic, the opposite of non-polar."],
      ["The ions break the hydrogen bonds inside each water molecule", "There are no hydrogen bonds inside a water molecule; they are between molecules."],
    ],
    answer: "A",
    explanation: "Charged ions are attracted to the oppositely charged parts of water molecules, which cluster around and separate them, so the salt dissolves.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why does ice float on liquid water?",
    options: [
      ["Hydrogen bonds hold the molecules in an open lattice, so ice is less dense", "Correct: the open structure takes up more space than liquid water."],
      ["Ice contains trapped air bubbles that always make it lighter", "Ice floats even without air bubbles because of its lattice."],
      ["Water molecules in ice have lost their hydrogen bonds", "In ice every molecule is hydrogen-bonded to its neighbours."],
      ["Ice is warmer than the water underneath it", "Ice is colder; its density, not its temperature, makes it float."],
    ],
    answer: "A",
    explanation: "Water is densest at about 4 °C. On freezing, hydrogen bonds fix the molecules into an open lattice that is less dense, so ice forms on the surface and insulates the water below.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Which property of water most directly allows a continuous column of water to be pulled up the xylem of a tall tree?",
    options: [
      ["Cohesion between water molecules due to hydrogen bonding", "Correct: the hydrogen-bonded molecules hold together as the column is pulled."],
      ["High specific heat capacity, which keeps the column warm", "Temperature stability does not hold the column together."],
      ["Water's maximum density at about 4 °C", "Density is not what lets the column be pulled upwards."],
      ["Water's ability to act as a reactant in hydrolysis", "Hydrolysis uses water but does not move it up the xylem."],
    ],
    answer: "A",
    explanation: "Hydrogen bonds make water molecules cohere, so tension created by transpiration at the leaves pulls the whole column up; adhesion to xylem walls helps too.",
    hints: ["Which property holds water molecules together?"],
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "During one day, the air temperature over a dam near Masvingo varied by 18 °C but the water temperature varied by only 3 °C. Which explanation is correct?",
    options: [
      ["Water has a high specific heat capacity, so much energy changes its temperature little", "Correct: energy is used to break hydrogen bonds before molecules speed up."],
      ["Water has a low specific heat capacity, so it reflects most of the sun's energy", "Water's specific heat capacity is high, and the explanation concerns absorbed energy."],
      ["Water is a good solvent, so dissolved salts absorb the heat", "Solvent properties do not explain the small temperature change."],
      ["Water has a high surface tension, which stops heat entering", "Surface tension does not block the transfer of heat."],
    ],
    answer: "A",
    explanation: "About 4.2 J are needed to raise 1 g of water by 1 °C, much more than for air, so water bodies provide aquatic organisms with a thermally stable habitat.",
    hints: ["Which thermal property is about temperature change?"],
  });
  const heat = 150 * 2.4;
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "The latent heat of vaporisation of water at body temperature is about 2.4 kJ per gram. Calculate the heat, in kJ, removed from the body when 150 g of sweat evaporates.",
    value: heat, unit: "kJ",
    wrong: ["62.5", "0.016"],
    explanation: "150 × 2.4 = 360 kJ. Dividing instead of multiplying gives 62.5.",
  });
  const warm = (2000 * 4.2 * 3) / 1000;
  chk(warm, 25.2);
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "The specific heat capacity of water is about 4.2 J g⁻¹ °C⁻¹. Calculate the energy, in kJ, needed to raise the temperature of 2000 g of water by 3 °C.",
    value: warm, unit: "kJ",
    wrong: ["25200", "2.8"],
    explanation: t`1. Energy $= \text{mass} \times \text{specific heat capacity} \times \text{temperature change}$.
2. $2000 \times 4.2 \times 3 = 25\,200\ \text{J}$.
3. Convert to kJ: $25\,200 \div 1000 = 25.2\ \text{kJ}$.
4. Leaving the answer in J gives 25 200.`,
    hints: ["Multiply mass, specific heat capacity and temperature change.", "Convert J to kJ."],
  });
  const ratio = (100 * 2.4) / ((100 * 4.2 * 1) / 1000);
  b.num({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: "Using a latent heat of vaporisation of 2.4 kJ g⁻¹ and a specific heat capacity of 4.2 J g⁻¹ °C⁻¹, how many times more energy is needed to evaporate 100 g of water than to warm 100 g of water by 1 °C? Give your answer to three significant figures.",
    value: ratio, sf: 3,
    wrong: ["0.571", "0.00175"],
    explanation: "Evaporating: 100 × 2.4 = 240 kJ = 240 000 J. Warming by 1 °C: 100 × 4.2 = 420 J. Ratio = 240 000 ÷ 420 = 571 times. Forgetting to convert kJ to J gives 0.571.",
    hints: ["Put both energies in the same unit."],
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Hydrogen bonds form between the hydrogen atoms of one water molecule and the oxygen atom of another.",
    answer: true,
    explanation: "True. The δ+ hydrogen of one molecule is attracted to the δ− oxygen of a neighbouring molecule.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Water is a product of hydrolysis reactions.",
    answer: false,
    explanation: "False. Water is a **reactant** in hydrolysis (it is used to break bonds) and a **product** of condensation reactions and of aerobic respiration.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each property of water with a biological consequence.",
    pairs: [
      ["Solvent for polar and charged substances", "Transport of glucose and ions in blood plasma"],
      ["High specific heat capacity", "Stable temperatures in lakes and in cells"],
      ["High latent heat of vaporisation", "Cooling of leaves by transpiration"],
      ["Ice less dense than liquid water", "Ice insulates the water beneath it"],
      ["Cohesion", "Water pulled up the xylem in a continuous column"],
    ],
    explanation: "Each property follows from hydrogen bonding and has a particular biological benefit.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentences.",
    template: "In a water molecule the oxygen atom carries a slight {{blank:a}} charge. Water is most dense at about {{blank:b}} °C. Water is used as a reactant in {{blank:c}} reactions, which break large molecules into smaller ones.",
    blanks: [
      { id: "a", accepted: ["negative"], choices: ["negative", "positive"] },
      { id: "b", accepted: ["4"], choices: ["0", "4", "37", "100"] },
      { id: "c", accepted: ["hydrolysis"], choices: ["hydrolysis", "condensation", "oxidation", "denaturation"] },
    ],
    explanation: "Oxygen is δ−; maximum density at about 4 °C; hydrolysis uses water to break bonds.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the type of bond that forms between neighbouring water molecules.",
    accepted: ["hydrogen bond", "hydrogen bonds", "hydrogen", "H-bond", "H bonds"],
    wrong: ["covalent bond", "ionic bond"],
    explanation: "**Hydrogen bonds** form between molecules; the bonds within a molecule are covalent.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why water has a high specific heat capacity and why this is important to aquatic organisms.",
    points: [
      "Many hydrogen bonds between water molecules",
      "Much energy is needed to break them before molecules move faster / temperature rises",
      "So water bodies change temperature slowly, giving aquatic organisms a stable environment (enzymes stay near optimum)",
    ],
    modelAnswer: "Water molecules are held together by many hydrogen bonds, and much of the energy absorbed is used to break these before the molecules can move faster, so a lot of energy is needed to raise the temperature. Lakes and rivers therefore change temperature only slowly, giving aquatic organisms a stable environment in which their enzymes work near their optimum.",
    explanation: "Cause (hydrogen bonds) → property → consequence.",
    hints: ["Start from hydrogen bonding."],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "Elephants in Hwange National Park spray water and mud on their skin and flap their large ears on hot days. Suggest how the properties of water help elephants keep cool.",
    points: [
      "Evaporation of water from the skin removes heat",
      "Because water has a high latent heat of vaporisation (much energy needed to break hydrogen bonds)",
      "Ear flapping moves air over wet / well-supplied skin, increasing evaporation and heat loss",
      "High specific heat capacity of body water / blood means body temperature rises slowly, and blood carries heat to the ears (or wet mud keeps skin moist for longer)",
    ],
    modelAnswer: "As water evaporates from the elephant's skin it absorbs a large amount of heat, because water has a high latent heat of vaporisation: many hydrogen bonds must be broken for molecules to escape. Flapping the ears moves air across them, increasing evaporation and heat loss from blood flowing through them. The high specific heat capacity of the water in the body means its temperature rises only slowly, and mud keeps the skin wet for longer.",
    explanation: "A *suggest* item: link properties of water to the elephant's behaviour.",
    hints: ["Which property explains cooling by evaporation?"],
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 3,
    stem: "Describe the structure of a water molecule and explain how hydrogen bonds form between water molecules.",
    points: [
      "Two hydrogen atoms covalently bonded to one oxygen atom in a bent shape",
      "Oxygen attracts electrons more strongly, so oxygen δ− and hydrogens δ+ (polar)",
      "δ+ hydrogen of one molecule is attracted to the δ− oxygen of another: a hydrogen bond",
    ],
    modelAnswer: "A water molecule has two hydrogen atoms covalently bonded to an oxygen atom, in a bent shape. Oxygen pulls the shared electrons towards itself, so it is slightly negative and the hydrogens slightly positive. The δ+ hydrogen of one molecule is attracted to the δ− oxygen of a neighbouring molecule, forming a hydrogen bond.",
    explanation: "Structure → polarity → hydrogen bond.",
    hints: ["Why is the charge uneven?"],
  });
  b.struct({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: "Nyasha recorded the temperature of the air and of the water at 1 m depth in Lake Kariba every 3 hours for a day in October.\n\n| Time | 06:00 | 09:00 | 12:00 | 15:00 | 18:00 | 21:00 |\n|---|---|---|---|---|---|---|\n| Air temperature / °C | 21 | 28 | 34 | 37 | 30 | 25 |\n| Water temperature / °C | 27.0 | 27.4 | 28.1 | 28.6 | 28.4 | 28.0 |",
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "Calculate the range of the air temperature over the day, in °C.", value: 37 - 21, unit: "°C", wrong: ["37"], explanation: "37 − 21 = 16 °C." }),
      P.num({ label: "(b)", marks: 1, stem: "Calculate the range of the water temperature, in °C, to one decimal place.", value: 28.6 - 27.0, dp: 1, unit: "°C", wrong: ["28.6"], explanation: "28.6 − 27.0 = 1.6 °C." }),
      P.manual({ label: "(c)", marks: 3, stem: "Describe the differences between the two sets of data, quoting figures.", points: ["Air temperature varies much more (16 °C) than water (1.6 °C)", "Air peaks at 37 °C at 15:00; water rises more slowly to 28.6 °C at 15:00", "Water warmer than air at 06:00 (27.0 v 21 °C) / water cools more slowly in the evening (28.0 at 21:00 v air 25)"], modelAnswer: "The air temperature varied by 16 °C, ten times more than the water's 1.6 °C. Both peaked at 15:00, the air at 37 °C and the water at only 28.6 °C. At 06:00 the water (27.0 °C) was warmer than the air (21 °C), and in the evening the water cooled much more slowly (28.0 °C at 21:00, when the air was 25 °C)." }),
      P.manual({ label: "(d)", marks: 3, stem: "Explain the difference in terms of the properties of water.", points: ["Water has a high specific heat capacity", "Much energy needed to break hydrogen bonds before temperature rises (and released as they re-form when it cools)", "Evaporation at the surface also removes heat (latent heat of vaporisation)"], modelAnswer: "Water has a high specific heat capacity: much of the energy absorbed is used to break hydrogen bonds, so the temperature rises only slightly, and energy released as bonds re-form slows cooling. Evaporation from the surface also removes heat because of water's high latent heat of vaporisation." }),
    ],
    explanation: "Calculating ranges shows the scale of the difference; hydrogen bonding explains water's high specific heat capacity and stable temperature.",
    hints: ["Range = highest − lowest."],
  });

  b.struct({
    d: 3, skill: "APPLICATION",
    stem: "On a cold winter night in the Eastern Highlands, a thin layer of ice formed on the surface of a fish pond. The water beneath the ice stayed liquid and the fish survived.",
    parts: [
      P.mcq({ label: "(a)", marks: 1, stem: "Which property of water explains why the ice formed on top of the pond?", options: [["Ice is less dense than liquid water", "Correct: ice floats."], ["Water has a high latent heat of vaporisation", "This explains cooling by evaporation."], ["Water is a good solvent for ions", "Solvent action does not explain where ice forms."], ["Water shows strong cohesion in xylem", "Cohesion is not why ice floats."]], answer: "A", explanation: "Ice is less dense than liquid water, so it forms at the surface." }),
      P.manual({ label: "(b)", marks: 2, stem: "Explain why ice is less dense than liquid water.", points: ["On freezing, hydrogen bonds hold water molecules in a fixed open lattice", "So the molecules are further apart than in liquid water (maximum density at about 4 °C)"], modelAnswer: "As water freezes, hydrogen bonds fix the molecules into an open lattice in which they are further apart than in the liquid, so ice is less dense; liquid water is densest at about 4 °C." }),
      P.short({ label: "(c)", marks: 1, stem: "Name the type of bond between water molecules responsible for this property.", accepted: ["hydrogen bond", "hydrogen bonds", "hydrogen", "H-bond"], explanation: "Hydrogen bonds." }),
      P.manual({ label: "(d)", marks: 2, stem: "Explain how the ice layer and the properties of water helped the fish survive.", points: ["Ice insulates the water below, so it does not freeze", "High specific heat capacity means the water cools slowly, so the temperature stays stable"], modelAnswer: "The ice layer insulates the water beneath it so that it stays liquid, and because water has a high specific heat capacity it loses heat slowly, keeping the fish's environment stable." }),
    ],
    explanation: "Hydrogen bonding gives ice an open, less dense lattice, so ice floats and insulates; the high specific heat capacity keeps water temperature stable.",
    hints: ["Which is denser: ice or liquid water?"],
  });

  b.card("CONCEPT", "Why is water polar?", "Oxygen attracts electrons more (δ−) than hydrogen (δ+), and the molecule is bent.");
  b.card("DEFINITION", "Define **hydrogen bond** (in water).", "Weak attraction between the δ+ hydrogen of one water molecule and the δ− oxygen of another.");
  b.card("CONCEPT", "Importance of water as a solvent?", "Reactions occur in solution; transport in blood, xylem, phloem; excretion of urea.");
  b.card("FACT", "Specific heat capacity of water?", "About 4.2 J g⁻¹ °C⁻¹: water heats and cools slowly, giving stable temperatures.");
  b.card("FACT", "Latent heat of vaporisation of water?", "About 2.4 kJ g⁻¹ at body temperature; evaporation (sweat, transpiration) cools.");
  b.card("CONCEPT", "Why does ice float, and why does it matter?", "Hydrogen bonds form an open lattice, so ice is less dense; it insulates water below so organisms survive.");
  b.card("CONCEPT", "Cohesion in water?", "Hydrogen bonds hold molecules together, allowing water columns in xylem and surface tension.");
  b.card("FACT", "Water as a reactant?", "Hydrolysis reactions and photosynthesis (photolysis).");
  b.card("CONCEPT", "Water as a habitat (ZIMSEC)?", "Stable temperature, dissolved gases, light in upper layers and support for aquatic organisms.", undefined, { applies: ["zimsec"] });
});
