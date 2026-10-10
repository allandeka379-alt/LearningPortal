---
{
  "key": "electrochem.oxidation-numbers",
  "title": "Redox: oxidation numbers, oxidising and reducing agents",
  "summary": "Oxidation and reduction as electron transfer and as change in oxidation number, the rules for assigning oxidation numbers, oxidising and reducing agents, disproportionation, and how to write, combine and balance redox half-equations.",
  "concepts": ["achem.electrochem.oxidation-numbers"],
  "estimatedMinutes": 40,
  "freePreview": true,
  "level": "core"
}
---
## Introduction

Redox reactions are everywhere in Zimbabwean industry and daily life: iron is extracted by reduction of its ores, chlorine kills bacteria in Harare's water by oxidising them, and the platinum-group metals from the Great Dyke are valuable partly because they catalyse redox reactions in car exhausts. At A Level you need a bookkeeping system that works for every redox reaction, including those between molecules and complex ions where electron transfer is hard to see. That system is **oxidation numbers** (also called oxidation states).

You should already know that oxidation is loss of electrons and reduction is gain of electrons, and be able to write ionic equations.

## Key definitions

:::definition{term="Oxidation"}
Loss of electrons, or an increase in oxidation number.
:::

:::definition{term="Reduction"}
Gain of electrons, or a decrease in oxidation number.
:::

:::definition{term="Oxidation number"}
The charge an atom would have if all its bonds were fully ionic, with the shared electrons given to the more electronegative atom.
:::

:::definition{term="Oxidising agent"}
A species that accepts electrons from another species, so it oxidises that species and is itself reduced.
:::

:::definition{term="Reducing agent"}
A species that donates electrons to another species, so it reduces that species and is itself oxidised.
:::

:::definition{term="Disproportionation"}
A redox reaction in which the same element in one species is simultaneously oxidised and reduced.
:::

## Rules for oxidation numbers

Apply the rules in this order of priority:

1. An uncombined element has oxidation number 0 ($\ce{Cu}$, $\ce{O2}$, $\ce{S8}$).
2. A simple ion has an oxidation number equal to its charge ($\ce{Fe^3+}$ is +3, $\ce{Cl-}$ is −1).
3. The oxidation numbers in a neutral compound add up to 0; in an ion they add up to the charge of the ion.
4. Fluorine is always −1. Group 1 metals are +1, Group 2 metals are +2, aluminium is +3 in compounds.
5. Hydrogen is +1, except in metal hydrides such as $\ce{NaH}$ (−1).
6. Oxygen is −2, except in peroxides such as $\ce{H2O2}$ (−1) and in $\ce{OF2}$ (+2).
7. Chlorine is −1 in chlorides, but positive when combined with oxygen or fluorine.

:::worked-solution[Example 1: assigning oxidation numbers]
1. Manganese in $\ce{MnO4-}$: $x + 4(-2) = -1$, so $x = +7$ (manganate(VII)).
2. Chromium in $\ce{Cr2O7^2-}$: $2x + 7(-2) = -2$, so $x = +6$ (dichromate(VI)).
3. Sulfur in $\ce{S2O3^2-}$: $2x + 3(-2) = -2$, so $x = +2$.
4. Nitrogen in $\ce{NH4+}$: $x + 4(+1) = +1$, so $x = -3$.
:::

The Roman numeral in a name gives the oxidation number of the element before it: iron(III) chloride is $\ce{FeCl3}$, potassium manganate(VII) is $\ce{KMnO4}$, sodium chlorate(I) is $\ce{NaClO}$ and sodium chlorate(V) is $\ce{NaClO3}$.

## Oxidising and reducing agents

In $\ce{Zn(s) + Cu^2+(aq) -> Zn^2+(aq) + Cu(s)}$, zinc goes from 0 to +2 (oxidised) and copper from +2 to 0 (reduced). So $\ce{Cu^2+}$ is the **oxidising agent** and $\ce{Zn}$ is the **reducing agent**. The agent is always named as the species that is itself changed in the opposite way.

| Common oxidising agents (reduced form) | Common reducing agents (oxidised form) |
|---|---|
| $\ce{MnO4-}$ in acid ($\ce{Mn^2+}$) | $\ce{Fe^2+}$ ($\ce{Fe^3+}$) |
| $\ce{Cr2O7^2-}$ in acid ($\ce{Cr^3+}$) | $\ce{I-}$ ($\ce{I2}$) |
| $\ce{Cl2}$ ($\ce{Cl-}$) | $\ce{C2O4^2-}$, ethanedioate ($\ce{CO2}$) |
| $\ce{H2O2}$ ($\ce{H2O}$) | $\ce{S2O3^2-}$ ($\ce{S4O6^2-}$) |
| concentrated $\ce{HNO3}$ ($\ce{NO2}$) | $\ce{SO2}$ ($\ce{SO4^2-}$) |

## Writing half-equations

A half-equation shows one species gaining or losing electrons. To balance one in acidic solution:

1. Balance the atoms of the element that changes oxidation number.
2. Balance oxygen by adding $\ce{H2O}$.
3. Balance hydrogen by adding $\ce{H+}$.
4. Balance charge by adding electrons to the more positive side.
5. Check that atoms and charges balance.

:::worked-solution[Example 2: manganate(VII) and iron(II)]
1. $\ce{MnO4- -> Mn^2+}$: Mn is balanced.
2. Add water for oxygen: $\ce{MnO4- -> Mn^2+ + 4H2O}$.
3. Add $\ce{H+}$: $\ce{MnO4- + 8H+ -> Mn^2+ + 4H2O}$.
4. Charge: left $-1 + 8 = +7$, right $+2$; add 5 electrons to the left: $\ce{MnO4- + 8H+ + 5e- -> Mn^2+ + 4H2O}$. (Mn changes from +7 to +2: five electrons, which checks.)
5. Iron: $\ce{Fe^2+ -> Fe^3+ + e-}$. Multiply by 5 so the electrons cancel, then add:

$$
\ce{MnO4- + 8H+ + 5Fe^2+ -> Mn^2+ + 5Fe^3+ + 4H2O}
$$

Check charge: left $-1 + 8 + 10 = +17$; right $+2 + 15 = +17$.
:::

## Balancing with oxidation-number changes

For a full equation, the total increase in oxidation number must equal the total decrease.

:::worked-solution[Example 3: copper and concentrated nitric acid]
Unbalanced: $\ce{Cu + HNO3 -> Cu(NO3)2 + NO2 + H2O}$.

1. Copper: 0 → +2, an increase of 2.
2. Nitrogen that becomes $\ce{NO2}$: +5 → +4, a decrease of 1. So two $\ce{NO2}$ are formed for each Cu.
3. Two more $\ce{HNO3}$ are needed to supply the nitrate ions in $\ce{Cu(NO3)2}$ (their N stays at +5): $\ce{Cu + 4HNO3 -> Cu(NO3)2 + 2NO2 + 2H2O}$.
4. Check H: 4 = 4. O: 12 = 6 + 4 + 2. Balanced.
:::

## Disproportionation

:::example{title="Example 4: chlorine and cold dilute alkali"}
$\ce{Cl2 + 2NaOH -> NaCl + NaClO + H2O}$. Chlorine starts at 0. In $\ce{NaCl}$ it is −1 (reduced) and in $\ce{NaClO}$ it is +1 (oxidised). The same element is both oxidised and reduced, so this is disproportionation. This reaction makes household bleach (sodium chlorate(I)).
:::

Copper(I) ions disproportionate in water: $\ce{2Cu+(aq) -> Cu(s) + Cu^2+(aq)}$, with copper going from +1 to 0 and to +2.

## Common mistakes

:::mistake{title="Naming the agent the wrong way round"}
The oxidising agent is the species that is reduced. In $\ce{Zn + Cu^2+}$, the oxidising agent is $\ce{Cu^2+}$, not zinc.
:::

:::mistake{title="Electrons on the wrong side"}
A reduction half-equation has electrons on the left; an oxidation half-equation has them on the right. Check by comparing total charges.
:::

:::mistake{title="Giving oxidation numbers per molecule"}
In $\ce{Cr2O7^2-}$ each Cr is +6; the two chromium atoms together contribute +12.
:::

:::mistake{title="Writing 7+ instead of +7"}
Oxidation numbers are written with the sign first (+7, −2); ionic charges with the sign after (2+).
:::

## Exam tips

:::exam-tip{title="Which papers"}
ZIMSEC Papers 1-3 and Cambridge Papers 1 and 2 (AS). Oxidation numbers are also needed in electrode potentials, transition elements and redox titrations later in the course.
:::

:::exam-tip{title="Command words"}
*Deduce* an oxidation number: show the sum. *Identify* the oxidising agent: name the species, then say what happens to its oxidation number. *Construct* an equation from half-equations: multiply so electrons cancel, then cancel any $\ce{H+}$ or $\ce{H2O}$ on both sides. *Explain* why a reaction is disproportionation: one element, two oxidation numbers, one up and one down.
:::

## Summary

:::summary
- Oxidation: electron loss or oxidation-number increase; reduction: electron gain or decrease.
- Oxidation numbers follow priority rules: F −1, Group 1 +1, Group 2 +2, H +1, O −2, with exceptions.
- The oxidising agent is reduced; the reducing agent is oxidised.
- Balance half-equations: element, O with H₂O, H with H⁺, charge with electrons; combine so electrons cancel.
- Disproportionation: one element both oxidised and reduced, e.g. Cl₂ in cold alkali.
:::
