---
{
  "key": "transition.iron",
  "title": "Iron: extraction, ions, rusting and biochemistry",
  "summary": "Iron ores and the blast furnace, the colours and relative stability of iron(II) and iron(III), how pH and cyanide ligands change that stability, tests that distinguish Fe²⁺ and Fe³⁺, iron in haemoglobin and cytochromes, rusting as an electrochemical process and its prevention, and the uses of iron and steel.",
  "concepts": ["achem.transition.iron"],
  "estimatedMinutes": 50,
  "level": "core"
}
---
## Introduction

Iron is the metal of roofing sheets, reinforcing bars, ploughs, railway lines and the cast-iron pots used on every Zimbabwean stove. It is also the metal inside every red blood cell: without iron(II) in haemoglobin, oxygen could not be carried round the body, which is why clinics give iron tablets to people with anaemia.

This lesson links the industrial chemistry of iron (the blast furnace and rusting) with the solution chemistry of its two common ions and its role in living things. You should already know redox, E⦵ values, complex ions and ligand exchange, and the tests for cations with aqueous sodium hydroxide.

## Key definitions

:::definition{term="Rusting"}
The corrosion of iron or steel in the presence of both oxygen and water, forming hydrated iron(III) oxide, Fe₂O₃·xH₂O.
:::

:::definition{term="Sacrificial protection"}
Protection of iron by attaching or coating it with a more reactive metal (more negative E⦵), such as zinc or magnesium, which is oxidised in preference to the iron.
:::

:::definition{term="Haem"}
The iron-containing group in haemoglobin: an iron(II) ion held by four nitrogen atoms of a flat porphyrin ring, with a fifth bond to the protein and a sixth position that can bind an oxygen molecule.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Iron chemistry as a whole is ZIMSEC content (Form 6). Cambridge 9701 uses iron in transition element, E⦵ and catalysis questions (for example Fe²⁺/Fe³⁺ catalysing the iodide-peroxodisulfate reaction) but does not examine the blast furnace, rusting or haemoglobin here.
:::

## Ores and the blast furnace

Iron is extracted from oxide ores: **haematite** (Fe₂O₃) and **magnetite** (Fe₃O₄). Pure Fe₃O₄ contains 72.3% iron by mass (3 × 55.8 ÷ 231.4 × 100). The ore, coke and limestone are fed into the top of a blast furnace and hot air is blown in near the bottom.

| Zone / step | Equation | Purpose |
|---|---|---|
| coke burns in hot air | $\ce{C + O2 -> CO2}$ | strongly exothermic: heats the furnace |
| carbon dioxide reduced by coke | $\ce{CO2 + C -> 2CO}$ | makes the reducing agent |
| reduction of the ore | $\ce{Fe2O3 + 3CO -> 2Fe + 3CO2}$ | carbon monoxide reduces iron(III) oxide |
| limestone decomposes | $\ce{CaCO3 -> CaO + CO2}$ | forms a basic oxide |
| slag formation | $\ce{CaO + SiO2 -> CaSiO3}$ | removes acidic silica (sand) impurities as molten slag |

Molten iron (pig iron, about 4% carbon) and the less dense slag run off separately from the bottom. Pig iron is brittle; most is converted to **steel** by blowing oxygen through it to burn off most of the carbon, and then adding alloying metals (manganese, chromium, nickel, vanadium).

:::worked-solution[Example 1: iron from haematite]
An ore contains 80.0% Fe₂O₃ by mass. Calculate the maximum mass of iron obtainable from 1.00 tonne (1000 kg) of ore. (Ar: Fe 55.8, O 16.0)

1. Mass of Fe₂O₃ = 0.800 × 1000 kg = 800 kg.
2. Mr(Fe₂O₃) = 2(55.8) + 3(16.0) = 159.6; one Fe₂O₃ contains 2 × 55.8 = 111.6 of iron.
3. Mass of iron = 800 kg × 111.6 ÷ 159.6 = 559 kg (3 s.f.).
:::

## Iron(II) and iron(III)

| Ion / compound | Colour | With NaOH(aq) | Other tests |
|---|---|---|---|
| $\ce{[Fe(H2O)6]^2+}$ | pale green | green precipitate of Fe(OH)₂, turning brown at the surface in air; insoluble in excess | dark blue precipitate with potassium hexacyanoferrate(III) |
| $\ce{[Fe(H2O)6]^3+}$ | yellow-brown (pale violet when pure; usually yellow-brown because of partial hydrolysis) | red-brown precipitate of Fe(OH)₃; insoluble in excess | deep red (blood-red) solution with potassium thiocyanate; dark blue precipitate with potassium hexacyanoferrate(II) |

The thiocyanate test is very sensitive: $\ce{[Fe(H2O)6]^3+ + SCN- -> [Fe(SCN)(H2O)5]^2+ + H2O}$ (ligand exchange, deep red).

**Relative stability.** Fe³⁺ (3d⁵, half-filled) is the more stable state in air. Iron(II) solutions are slowly oxidised by air, so they are made up fresh and kept acidified:

$$
\ce{4Fe^2+ + O2 + 4H+ -> 4Fe^3+ + 2H2O}\qquad E^\ominus_\text{cell} = 1.23 - 0.77 = +0.46\ \text{V}
$$

**Effect of pH.** In alkali the relevant couple is Fe(OH)₃/Fe(OH)₂ (E⦵ = −0.56 V) and the oxygen couple is O₂/OH⁻ (+0.40 V), so E⦵cell = 0.40 − (−0.56) = +0.96 V. Oxidation of iron(II) is much more favourable in alkali: that is why the green Fe(OH)₂ precipitate turns brown within minutes, while an acidified Fe²⁺ solution keeps for days.

**Effect of the cyanide ligand.** In $\ce{[Fe(CN)6]^3- + e- <=> [Fe(CN)6]^4-}$, E⦵ = +0.36 V, lower than +0.77 V for the aqua ions. Changing the ligands from water to cyanide makes iron(III) relatively more stable, so hexacyanoferrate(III) is a weaker oxidising agent than Fe³⁺(aq).

:::worked-solution[Example 2: does each iron(III) species oxidise iodide?]
Data (E⦵ / V): Fe³⁺/Fe²⁺ +0.77; [Fe(CN)₆]³⁻/[Fe(CN)₆]⁴⁻ +0.36; I₂/I⁻ +0.54. Predict whether Fe³⁺(aq) and [Fe(CN)₆]³⁻ oxidise iodide ions.

1. Fe³⁺(aq): E⦵cell = 0.77 − 0.54 = +0.23 V, positive, so feasible: $\ce{2Fe^3+ + 2I- -> 2Fe^2+ + I2}$ (a brown colour of iodine appears).
2. [Fe(CN)₆]³⁻: E⦵cell = 0.36 − 0.54 = −0.18 V, negative, so not feasible under standard conditions.
3. Conclusion: cyanide ligands lower the oxidising power of iron(III).
:::

## Iron in living things

- **Haemoglobin** in red blood cells contains four haem groups. Each has Fe²⁺ bonded to four nitrogen atoms of the porphyrin ring and to a nitrogen of the protein; the sixth site binds O₂ by a dative bond in the lungs and releases it in respiring tissues, where the oxygen concentration is lower. The bonding is reversible, and the iron stays +2.
- **Carbon monoxide poisoning:** CO is a ligand that binds to the same site far more strongly than oxygen and is released very slowly, so haemoglobin can no longer carry oxygen. Faulty braziers or charcoal stoves in closed rooms are a real danger for this reason.
- **Cytochromes** are haem proteins in the electron-transport chain of respiration. Their iron switches between Fe²⁺ and Fe³⁺, passing electrons along the chain.

## Rusting and its prevention

Rusting is electrochemical. On a wet iron surface, areas form tiny cells:

1. At anodic areas (often where there is less oxygen, under a water drop), iron is oxidised: $\ce{Fe -> Fe^2+ + 2e-}$.
2. Electrons flow through the metal to cathodic areas at the edge of the drop, where oxygen is reduced: $\ce{O2 + 2H2O + 4e- -> 4OH-}$.
3. Fe²⁺ and OH⁻ meet in the water: $\ce{Fe^2+ + 2OH- -> Fe(OH)2}$, which oxygen oxidises to Fe(OH)₃, which loses water to give rust, Fe₂O₃·xH₂O.

E⦵cell = 0.40 − (−0.44) = +0.84 V. Salt water conducts better and speeds rusting; so does acid rain.

| Method | How it works | Example |
|---|---|---|
| barrier | keeps out water and oxygen | paint, grease, plastic coating, tin plating of food cans |
| galvanising | zinc coating: a barrier, and sacrificial if scratched (E⦵ Zn²⁺/Zn = −0.76 V, more negative than −0.44 V) | roofing sheets, buckets, fencing wire |
| sacrificial blocks | magnesium or zinc blocks bolted to the iron corrode instead | ships' hulls, buried pipelines |
| alloying | chromium forms a protective oxide layer | stainless steel |

A scratched tin can rusts faster than bare iron, because tin (E⦵ = −0.14 V) is less reactive than iron and the iron becomes the anode.

**Uses of iron and steel:** cast iron for engine blocks and pots; mild steel for roofing, car bodies and reinforcing bars; stainless steel for cutlery and medical tools; iron as the catalyst in the Haber process.

## Common mistakes

:::mistake{title="Mixing up the hexacyanoferrate tests"}
Fe²⁺ gives a dark blue precipitate with hexacyanoferrate(III); Fe³⁺ gives one with hexacyanoferrate(II). Thiocyanate gives a deep red colour only with Fe³⁺.
:::

:::mistake{title="Saying haemoglobin contains iron(III)"}
Oxygen is carried by Fe²⁺. If the iron is oxidised to Fe³⁺ the protein can no longer carry oxygen.
:::

:::mistake{title="Thinking any metal coating is sacrificial"}
Only a metal with a more negative E⦵ than iron (zinc, magnesium) protects iron sacrificially. Tin protects only while the coating is unbroken.
:::

## Exam tips

:::exam-tip{title="Which papers"}
ZIMSEC Paper 1, Paper 2 and Paper 3 Section D (Applied Chemistry: extraction, rusting, biochemistry); Paper 4 (tests for Fe²⁺ and Fe³⁺, iron(II) titrations).
:::

:::exam-tip{title="Command words"}
*Describe* a test with the reagent and the colour and state of the product. *Explain* the effect of pH or cyanide on stability by quoting and comparing E⦵ values. *Explain* rusting with both half-equations and say where each occurs. *Explain* carbon monoxide poisoning in terms of ligand binding.
:::

## Summary

:::summary
- Blast furnace: coke burns, CO₂ + C → 2CO, Fe₂O₃ + 3CO → 2Fe + 3CO₂; limestone removes silica as CaSiO₃ slag.
- Fe²⁺ pale green, Fe(OH)₂ green (browns in air); Fe³⁺ yellow-brown, Fe(OH)₃ red-brown; thiocyanate deep red with Fe³⁺; hexacyanoferrate(III) dark blue with Fe²⁺.
- Air oxidises Fe²⁺ (E⦵cell = +0.46 V in acid, +0.96 V in alkali); cyanide ligands lower E⦵ to +0.36 V, stabilising iron(III).
- Haemoglobin carries O₂ on Fe²⁺; CO binds far more strongly; cytochromes transfer electrons via Fe²⁺/Fe³⁺.
- Rusting: Fe → Fe²⁺ + 2e⁻ and O₂ + 2H₂O + 4e⁻ → 4OH⁻; prevented by barriers, galvanising, sacrificial metals and alloying.
:::
